/*******************************************************************************
 * Copyright (c) 2011, Daniel Murphy
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 	* Redistributions of source code must retain the above copyright notice,
 * 	  this list of conditions and the following disclaimer.
 * 	* Redistributions in binary form must reproduce the above copyright notice,
 * 	  this list of conditions and the following disclaimer in the documentation
 * 	  and/or other materials provided with the distribution.
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
 * ******************************************************************************/
class BlobTest extends Demo {
  /** Constructs a new BlobTest. */
  BlobTest() : super() { }

  /** Entrypoint. */
  static void main() {
    final blob = new BlobTest();
    blob.initialize();
    blob.initializeAnimation();
    blob.run();
  }

  void initialize() {
    Body ground;
    {
      PolygonShape sd = new PolygonShape();
      sd.setAsBox(50.0, 0.4);

      BodyDef bd = new BodyDef();
      bd.position.setCoords(0.0, 0.0);
      assert(world != null);
      ground = world.createBody(bd);
      bodies.add(ground);
      ground.createFixtureFromShape(sd);

      sd.setAsBoxWithCenterAndAngle(0.4, 50.0, new Vector(-10.0, 0.0), 0.0);
      ground.createFixtureFromShape(sd);
      sd.setAsBoxWithCenterAndAngle(0.4,50.0,new Vector(10.0,0.0), 0.0);
      ground.createFixtureFromShape(sd);
    }

    ConstantVolumeJointDef cvjd = new ConstantVolumeJointDef();

    num cx = 0.0;
    num cy = 10.0;
    num rx = 5.0;
    num ry = 5.0;
    int nBodies = 20;
    num bodyRadius = 0.5;
    for (int i = 0; i < nBodies; ++i) {
      num angle = MathBox.translateAndScale(i, 0, nBodies, 0, Math.PI * 2);
      BodyDef bd = new BodyDef();
      bd.fixedRotation = true;

      num x = cx + rx * Math.sin(angle);
      num y = cy + ry * Math.cos(angle);
      bd.position.setFrom(new Vector(x,y));
      bd.type = BodyType.DYNAMIC;
      Body body = world.createBody(bd);
      bodies.add(body);

      FixtureDef fd = new FixtureDef();
      CircleShape cd = new CircleShape();
      cd.radius = bodyRadius;
      fd.shape = cd;
      fd.density = 1.0;
      fd.filter.groupIndex = -2;
      body.createFixture(fd);
      cvjd.addBody(body);
    }

    cvjd.frequencyHz = 10.0;
    cvjd.dampingRatio = 1.0;
    world.createJoint(cvjd);

    BodyDef bd2 = new BodyDef();
    bd2.type = BodyType.DYNAMIC;
    PolygonShape psd = new PolygonShape();
    psd.setAsBoxWithCenterAndAngle(3.0,1.5,new Vector(cx,cy+15.0),0.0);
    bd2.position = new Vector(cx,cy+15.0);
    Body fallingBox = world.createBody(bd2);
    bodies.add(fallingBox);
    fallingBox.createFixtureFromShape(psd, 1.0);
  }

  void run() {
    animationScheduler.requestAnimationFrame((num time) {
      step(time);
    }, canvas);
  }
}