/*******************************************************************************
 * Copyright (c) 2011, Daniel Murphy
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/
/**
 * This joint is commonly used to simulate a soft body with a constant volume.
 * A constant volume joint can only be created with three or more bodies. The
 * area within a grouping of constant volume joints is kept constant, such that
 * the compression of one part of the area will be offset by the expansion of
 * other parts.
 */
class ConstantVolumeJoint extends Joint {
  List<Body> bodies;
  List<num> targetLengths;
  num targetVolume;

  List<Vector> normals;

  TimeStep step;

  num _impulse;

  World _world;

  List<DistanceJoint> distanceJoints;

  num frequencyHz;
  num dampingRatio;

  ConstantVolumeJoint(this._world, ConstantVolumeJointDef def) :
    super(def),
    _impulse = 0 {
    if (def.bodies.length <= 2) {
      throw new IllegalArgumentException(
          "You cannot create a constant volume joint with less than three "
          + "bodies.");
    }

    // Create a fixed size array with a capacity equal to the number of elements
    // in the growable array in the definition.
    bodies = new List.from(def.bodies);

    targetLengths = new List<num>(bodies.length);
    for (int i = 0; i < targetLengths.length; ++i) {
      final int next = (i == targetLengths.length - 1) ? 0 : i + 1;
      Vector temp = new Vector.copy(bodies[i].worldCenter);
      temp.subLocal(bodies[next].worldCenter);
      num dist = temp.length;
      targetLengths[i] = dist;
    }
    targetVolume = area;

    if (def.joints != null && def.joints.length != def.bodies.length) {
      throw new IllegalArgumentException(
          "Incorrect joint definition.  Joints have to correspond to "
          + "the bodies");
    }

    if (def.joints == null) {
      final djd = new DistanceJointDef();
      distanceJoints = new List<DistanceJoint>(bodies.length);
      for (int i = 0; i < targetLengths.length; ++i) {
        final int next = (i == targetLengths.length - 1) ? 0 : i + 1;
        djd.frequencyHz = def.frequencyHz;
        djd.dampingRatio = def.dampingRatio;
        djd.initialize(bodies[i], bodies[next], bodies[i].worldCenter,
            bodies[next].worldCenter);
        distanceJoints[i] = _world.createJoint(djd);
      }
    } else {
      distanceJoints = new List<DistanceJoint>(def.joints.length);
      distanceJoints.copyFrom(def.joints, 0, 0, def.joints.length);
    }

    frequencyHz = def.frequencyHz;
    dampingRatio = def.dampingRatio;

    normals = new List<Vector>(bodies.length);
    for (int i = 0; i < normals.length; ++i) {
      normals[i] = new Vector();
    }

    this.bodyA = bodies[0];
    this.bodyB = bodies[1];
    this.collideConnected = false;
  }

  void inflate(num factor) {
    targetVolume *= factor;
  }

  void destructor() {
    for (int i = 0; i < distanceJoints.length; ++i) {
      _world.destroyJoint(distanceJoints[i]);
    }
  }

  num get area() {
    num result = 0.0;
    result += bodies[bodies.length - 1].worldCenter.x * bodies[0].worldCenter.y
        - bodies[0].worldCenter.x * bodies[bodies.length - 1].worldCenter.y;
    for (int i = 0; i < bodies.length - 1; ++i) {
      result += bodies[i].worldCenter.x * bodies[i + 1].worldCenter.y
          - bodies[i + 1].worldCenter.x * bodies[i].worldCenter.y;
    }
    result *= .5;
    return result;
  }

  /**
   * Apply the position correction to the particles.
   */
  bool constrainEdges(TimeStep argStep) {
    num perimeter = 0.0;
    for (int i = 0; i < bodies.length; ++i) {
      final int next = (i == bodies.length - 1) ? 0 : i + 1;
      num dx = bodies[next].worldCenter.x - bodies[i].worldCenter.x;
      num dy = bodies[next].worldCenter.y - bodies[i].worldCenter.y;
      num dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < Settings.EPSILON) {
        dist = 1.0;
      }
      normals[i].x = dy / dist;
      normals[i].y = -dx / dist;
      perimeter += dist;
    }

    final delta = new Vector();

    num deltaArea = targetVolume - area;
    num toExtrude = 0.5 * deltaArea / perimeter; // relaxationFactor
    bool done = true;
    for (int i = 0; i < bodies.length; ++i) {
      final int next = (i == bodies.length - 1) ? 0 : i + 1;
      delta.setCoords(toExtrude * (normals[i].x + normals[next].x), toExtrude
          * (normals[i].y + normals[next].y));
      num norm = delta.length;
      if (norm > Settings.MAX_LINEAR_CORRECTION) {
        delta.mulLocal(Settings.MAX_LINEAR_CORRECTION / norm);
      }
      if (norm > Settings.LINEAR_SLOP) {
        done = false;
      }
      bodies[next].sweep.center.x += delta.x;
      bodies[next].sweep.center.y += delta.y;
      bodies[next].synchronizeTransform();
    }

    return done;
  }

  void initVelocityConstraints(TimeStep argStep) {
    step = argStep;

    final d = new List<Vector>(bodies.length);
    for (int i = 0; i < bodies.length; i++) {
      d[i] = new Vector();
    }

    for (int i = 0; i < bodies.length; ++i) {
      final int prev = (i == 0) ? bodies.length - 1 : i - 1;
      final int next = (i == bodies.length - 1) ? 0 : i + 1;
      d[i].setFrom(bodies[next].worldCenter);
      d[i].subLocal(bodies[prev].worldCenter);
    }

    if (step.warmStarting) {
      _impulse *= step.dtRatio;
      for (int i = 0; i < bodies.length; ++i) {
        bodies[i].linearVelocity.x += bodies[i].invMass * d[i].y *
            .5 * _impulse;
        bodies[i].linearVelocity.y += bodies[i].invMass * -d[i].x *
            .5 * _impulse;
      }
    } else {
      _impulse = 0.0;
    }
  }

  /**
   * Solves for the impact of this joint on the positions of the connected
   * bodies. Implements abstract method in [Joint].
   */
  bool solvePositionConstraints(num baumgarte) {
    return constrainEdges(step);
  }

  /**
   * Solves for the impact of this joint on the velocities of the connected
   * bodies. Implements abstract method in [Joint].
   */
  void solveVelocityConstraints(TimeStep argStep) {
    num crossMassSum = 0.0;
    num dotMassSum = 0.0;

    final d = new List<Vector>(bodies.length);
    for (int i = 0; i < bodies.length; i++) {
      d[i] = new Vector();
    }

    for (int i = 0; i < bodies.length; ++i) {
      final int prev = (i == 0) ? bodies.length - 1 : i - 1;
      final int next = (i == bodies.length - 1) ? 0 : i + 1;
      d[i].setFrom(bodies[next].worldCenter);
      d[i].subLocal(bodies[prev].worldCenter);
      dotMassSum += (d[i].lengthSquared) / bodies[i].mass;
      crossMassSum += Vector.crossVectors(bodies[i].linearVelocity, d[i]);
    }
    num lambda = -2.0 * crossMassSum / dotMassSum;
    _impulse += lambda;
    for (int i = 0; i < bodies.length; ++i) {
      bodies[i].linearVelocity.x += bodies[i].invMass * d[i].y * .5 * lambda;
      bodies[i].linearVelocity.y += bodies[i].invMass * -d[i].x * .5 * lambda;
    }
  }

  void getAnchorA(Vector argOut) {
    throw new NotImplementedException();
  }

  void getAnchorB(Vector argOut) {
    throw new NotImplementedException();
  }

  void getReactionForce(num inv_dt, Vector argOut) {
    throw new NotImplementedException();
  }

  num getReactionTorque(num inv_dt) {
    throw new NotImplementedException();
  }
}