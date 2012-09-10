function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.RuntimeOptions = {"":
 ["_arguments"],
 "super": "Object",
 get$arguments: function() {
  if (this._arguments == null)
    this._arguments = $.getRange($.RuntimeOptions__nativeArguments, 0, $.get$length($.RuntimeOptions__nativeArguments));
  return this._arguments;
}
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_next=", "_element?"],
 "super": "Object",
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 append$1: function(e) {
  $.DoubleLinkedQueueEntry$(e, $.getRuntimeTypeInfo(this).E)._link$2(this, this._next);
},
 prepend$1: function(e) {
  $.DoubleLinkedQueueEntry$(e, $.getRuntimeTypeInfo(this).E)._link$2(this._previous, this);
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 get$element: function() {
  return this._element;
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_element"],
 "super": "DoubleLinkedQueueEntry",
 remove$0: function() {
  throw $.captureStackTrace($.CTC1);
},
 get$element: function() {
  throw $.captureStackTrace($.CTC1);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 "super": "Object",
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 addFirst$1: function(value) {
  this._sentinel.append$1(value);
},
 add$1: function(value) {
  this.addLast$1(value);
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 map$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    other.addLast$1(f.call$1(entry.get$_element()));
    entry = nextEntry;
  }
  return other;
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$($.getRuntimeTypeInfo(this).E);
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 iterator$0: function() {
  return $._DoubleLinkedQueueIterator$(this._sentinel, $.getRuntimeTypeInfo(this).E);
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 DoubleLinkedQueue$0: function() {
  this._sentinel = $._DoubleLinkedQueueEntrySentinel$($.getRuntimeTypeInfo(this).E);
},
 is$Collection: true
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.StopwatchImplementation = {"":
 ["_start", "_stop"],
 "super": "Object",
 start$0: function() {
  if (this._start == null)
    this._start = $.Primitives_dateNow();
  else {
    if (this._stop == null)
      return;
    var t1 = $.Primitives_dateNow();
    var t2 = $.sub(this._stop, this._start);
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    this._start = t1 - t2;
    this._stop = null;
  }
},
 stop$0: function() {
  if (this._start == null || !(this._stop == null))
    return;
  this._stop = $.Primitives_dateNow();
},
 elapsed$0: function() {
  var t1 = this._start;
  if (t1 == null)
    return 0;
  var t2 = this._stop;
  if (t2 == null) {
    t1 = $.Primitives_dateNow();
    t2 = this._start;
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    t2 = t1 - t2;
    t1 = t2;
  } else
    t1 = $.sub(t2, t1);
  return t1;
},
 elapsedInMs$0: function() {
  var t1 = this.elapsed$0();
  if (typeof t1 !== 'number')
    return this.elapsedInMs$0$bailout(1, t1, 0);
  t1 *= 1000;
  var t3 = this.frequency$0();
  if (typeof t3 !== 'number')
    return this.elapsedInMs$0$bailout(2, t1, t3);
  return $.tdiv(t1, t3);
},
 elapsedInMs$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.elapsed$0();
    case 1:
      state = 0;
      t1 = $.mul(t1, 1000);
      var t3 = this.frequency$0();
    case 2:
      state = 0;
      return $.tdiv(t1, t3);
  }
},
 frequency$0: function() {
  return 1000;
},
 StopwatchImplementation$start$0: function() {
  this.start$0();
}
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 "super": "Object",
 get$length: function() {
  return this._length;
},
 isEmpty$0: function() {
  return this._length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 clear$0: function() {
  this._buffer = $.ListImplementation_List(null, 'String');
  this._length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.stringJoinUnchecked($.StringImplementation__toJsStringArray(this._buffer), '');
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 "super": "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
}
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 "super": "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
}
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 "super": "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
}
};

$$.NoMoreElementsException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
}
};

$$.EmptyQueueException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'EmptyQueueException';
}
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
}
};

$$.NotImplementedException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
}
};

$$.ExpectException = {"":
 ["message"],
 "super": "Object",
 toString$0: function() {
  return this.message;
}
};

$$.Object = {"":
 [],
 "super": "",
 toString$0: function() {
  return $.ObjectImplementation_toStringImpl(this);
},
 operator$eq$1: function(other) {
  return this === other;
}
};

$$.ListIterator = {"":
 ["i", "list"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
},
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); }
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.StringMatch = {"":
 ["_lib0_start", "str", "pattern"],
 "super": "Object",
 operator$index$1: function(g) {
  return this.group$1(g);
},
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
}
};

$$.BenchmarkRunner = {"":
 ["_solveLoops", "_steps", "_benchmarks", "_resultsWriter"],
 "super": "Object",
 setupBenchmarks$1: function(filter) {
  var t1 = this._solveLoops;
  var t2 = this._steps;
  var benchmarks = [$.BallDropBench$(t1, t2), $.BallCageBench$(t1, t2), $.CircleStressBench$(t1, t2), $.DominoPlatformBench$(t1, t2), $.DominoTowerBench$(t1, t2)];
  t1 = filter == null || $.isEmpty(filter) === true;
  if (t1)
    $.map(benchmarks, this.get$_addBenchmark());
  else
    $.map($.filter(benchmarks, new $.BenchmarkRunner_setupBenchmarks_anon($.map($.split(filter, ','), new $.BenchmarkRunner_setupBenchmarks_anon0()))), this.get$_addBenchmark());
},
 runBenchmarks$0: function() {
  for (var t1 = $.iterator(this._benchmarks), t2 = this._resultsWriter; t1.hasNext$0() === true;) {
    var t3 = t1.next$0();
    $.print('Running ' + $.S(t3.get$name()));
    $.clear(t2);
    t3.runBenchmark$1(t2);
    $.print($.S(t2) + '------------------------------------------------');
  }
},
 _addBenchmark$1: function(benchmark) {
  return this._benchmarks.push(benchmark);
},
 get$_addBenchmark: function() { return new $.BoundClosure(this, '_addBenchmark$1'); }
};

$$.Benchmark = {"":
 ["bodies?"],
 "super": "Object",
 resetWorld$0: function() {
  this.bodies = $.ListImplementation_List(null, 'Body');
  this.world = $.World$($.Vector$(0, -10), true, $.DefaultWorldPool$());
},
 _recordResults$4: function(time, resultsWriter, benchmarkIterations, steps) {
  if (typeof time !== 'number')
    return this._recordResults$4$bailout(1, time, resultsWriter, benchmarkIterations, steps);
  if (typeof steps !== 'number')
    return this._recordResults$4$bailout(1, time, resultsWriter, benchmarkIterations, steps);
  $.add$1(resultsWriter, this.get$name());
  $.add$1(resultsWriter, ' (' + $.S(steps) + ' steps, ' + $.S(benchmarkIterations) + ' solve loops) : ' + $.S(time) + ' ms');
  $.add$1(resultsWriter, '  (' + $.S(steps / (time / 1000)) + ' steps/second)');
  $.add$1(resultsWriter, '\n');
  $.add$1(resultsWriter, 'Checksum: ' + $.S(this.get$checksum()));
  $.add$1(resultsWriter, '\n\n');
},
 _recordResults$4$bailout: function(state, time, resultsWriter, benchmarkIterations, steps) {
  $.add$1(resultsWriter, this.get$name());
  $.add$1(resultsWriter, ' (' + $.S(steps) + ' steps, ' + $.S(benchmarkIterations) + ' solve loops) : ' + $.S(time) + ' ms');
  $.add$1(resultsWriter, '  (' + $.S($.div(steps, $.div(time, 1000))) + ' steps/second)');
  $.add$1(resultsWriter, '\n');
  $.add$1(resultsWriter, 'Checksum: ' + $.S(this.get$checksum()));
  $.add$1(resultsWriter, '\n\n');
},
 runBenchmark$1: function(resultsWriter) {
  for (var t1 = $.iterator(this._steps), t2 = this.solveLoops; t1.hasNext$0() === true;) {
    var t3 = t1.next$0();
    if (typeof t3 !== 'number')
      return this.runBenchmark$1$bailout(1, resultsWriter, t3, t2, t1);
    for (var t4 = $.iterator(t2); t4.hasNext$0() === true;) {
      var t5 = t4.next$0();
      this.initialize$0();
      var watch = $.StopwatchImplementation$start();
      for (var i = 0; i < t3; ++i)
        this.world.step$3(0.016666666666666666, t5, t5);
      watch.stop$0();
      this._recordResults$4(watch.elapsedInMs$0(), resultsWriter, t5, t3);
    }
  }
},
 runBenchmark$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var resultsWriter = env0;
      t3 = env1;
      t2 = env2;
      t1 = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.iterator(this._steps);
      var t2 = this.solveLoops;
    case 1:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(t1.hasNext$0() === true))
                break L0;
              var t3 = t1.next$0();
            case 1:
              state = 0;
              for (var t4 = $.iterator(t2); t4.hasNext$0() === true;) {
                var t5 = t4.next$0();
                this.initialize$0();
                var watch = $.StopwatchImplementation$start();
                for (var i = 0; $.ltB(i, t3); ++i)
                  this.world.step$3(0.016666666666666666, t5, t5);
                watch.stop$0();
                this._recordResults$4(watch.elapsedInMs$0(), resultsWriter, t5, t3);
              }
          }
  }
},
 get$checksum: function() {
  var positionSum = $.Vector$(0, 0);
  var velocitySum = $.Vector$(0, 0);
  for (var t1 = $.iterator(this.bodies); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    positionSum.addLocal$1(t2.get$position());
    velocitySum.addLocal$1(t2.get$linearVelocity());
  }
  return $.add($.add($.add(positionSum.x, positionSum.y), velocitySum.x), velocitySum.y);
},
 get$bodyCount: function() {
  return $.get$length(this.bodies);
}
};

$$.BallCageBench = {"":
 ["bodies", "world", "solveLoops", "_steps"],
 "super": "Benchmark",
 get$name: function() {
  return 'Ball Cage';
},
 initialize$0: function() {
  this.resetWorld$0();
  var circleShape = $.CircleShape$();
  circleShape.radius = 2;
  var circleFixtureDef = $.FixtureDef$();
  circleFixtureDef.shape = circleShape;
  circleFixtureDef.friction = 0.9;
  circleFixtureDef.restitution = 1;
  var circleBodyDef = $.BodyDef$();
  var t1 = circleShape.radius;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var borderLimitX = -20 + 20 * t1;
  var borderLimitY = -20 + 20 * t1;
  for (var i = 0; i < 10; ++i) {
    t1 = $.mul($.mul(circleShape.radius, 2), i);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var shiftX = -20 + t1;
    t1 = $.mul($.mul(circleShape.radius, 2), i);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var shiftY = -20 + t1;
    circleBodyDef.position = $.Vector$(shiftX, -20);
    var circleBody = this.world.createBody$1(circleBodyDef);
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
    circleBodyDef.position = $.Vector$(shiftX, borderLimitY);
    circleBody = this.world.createBody$1(circleBodyDef);
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
    circleBodyDef.position = $.Vector$(-20, shiftY);
    circleBody = this.world.createBody$1(circleBodyDef);
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
    circleBodyDef.position = $.Vector$(borderLimitX, shiftY);
    circleBody = this.world.createBody$1(circleBodyDef);
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
  }
  var bouncingCircle = $.CircleShape$();
  bouncingCircle.radius = 1;
  var activeFixtureDef = $.FixtureDef$();
  activeFixtureDef.restitution = 1;
  activeFixtureDef.density = 0.05;
  activeFixtureDef.shape = bouncingCircle;
  var activeBodyDef = $.BodyDef$();
  activeBodyDef.linearVelocity = $.Vector$(0, -20);
  activeBodyDef.position = $.Vector$(15, 15);
  activeBodyDef.type = 2;
  activeBodyDef.bullet = true;
  var activeBody = this.world.createBody$1(activeBodyDef);
  $.add$1(this.bodies, activeBody);
  activeBody.createFixture$1(activeFixtureDef);
}
};

$$.BallDropBench = {"":
 ["bodies", "world", "solveLoops", "_steps"],
 "super": "Benchmark",
 initialize$0: function() {
  this.resetWorld$0();
  var fd = $.FixtureDef$();
  var cd = $.CircleShape$();
  cd.radius = 1;
  fd.shape = cd;
  var bodyDef = $.BodyDef$();
  bodyDef.type = 2;
  bodyDef.position = $.Vector$(0, 0);
  var ballBody = this.world.createBody$1(bodyDef);
  ballBody.createFixture$1(fd);
  $.add$1(this.bodies, ballBody);
},
 get$name: function() {
  return 'Ball Drop';
}
};

$$.CircleStressBench = {"":
 ["_joint", "bodies", "world", "solveLoops", "_steps"],
 "super": "Benchmark",
 get$name: function() {
  return 'Circle Stress';
},
 initialize$0: function() {
  this.resetWorld$0();
  var bd = $.BodyDef$();
  var ground = this.world.createBody$1(bd);
  $.add$1(this.bodies, ground);
  var shape = $.PolygonShape$();
  shape.setAsEdge$2($.Vector$(-40.0, 0.0), $.Vector$(40.0, 0.0));
  ground.createFixtureFromShape$1(shape);
  var sd = $.PolygonShape$();
  sd.setAsBox$2(50.0, 10.0);
  bd = $.BodyDef$();
  bd.type = 0;
  bd.position = $.Vector$(0.0, -10.0);
  var b = this.world.createBody$1(bd);
  $.add$1(this.bodies, b);
  var fd = $.FixtureDef$();
  fd.shape = sd;
  fd.friction = 1.0;
  b.createFixture$1(fd);
  sd.setAsBox$2(3.0, 50.0);
  var wallDef = $.BodyDef$();
  wallDef.position = $.Vector$(45.0, 25.0);
  var rightWall = this.world.createBody$1(wallDef);
  $.add$1(this.bodies, rightWall);
  rightWall.createFixtureFromShape$1(sd);
  wallDef.position = $.Vector$(-45.0, 25.0);
  var leftWall = this.world.createBody$1(wallDef);
  $.add$1(this.bodies, leftWall);
  leftWall.createFixtureFromShape$1(sd);
  var cornerDef = $.BodyDef$();
  sd.setAsBox$2(20.0, 3.0);
  cornerDef.angle = -0.7853981633974483;
  cornerDef.position = $.Vector$(-35, 8.0);
  var myBod = this.world.createBody$1(cornerDef);
  $.add$1(this.bodies, myBod);
  myBod.createFixtureFromShape$1(sd);
  cornerDef.angle = 0.7853981633974483;
  cornerDef.position = $.Vector$(35, 8.0);
  myBod = this.world.createBody$1(cornerDef);
  $.add$1(this.bodies, myBod);
  myBod.createFixtureFromShape$1(sd);
  sd.setAsBox$2(50.0, 10.0);
  var topDef = $.BodyDef$();
  topDef.type = 0;
  topDef.angle = 0;
  topDef.position = $.Vector$(0.0, 75.0);
  var topBody = this.world.createBody$1(topDef);
  $.add$1(this.bodies, topBody);
  fd.shape = sd;
  fd.friction = 1.0;
  topBody.createFixture$1(fd);
  bd = $.BodyDef$();
  bd.type = 2;
  bd.position = $.Vector$(0.0, 10.0);
  var body = this.world.createBody$1(bd);
  $.add$1(this.bodies, body);
  for (var i = 0; i < 5; ++i) {
    fd = $.FixtureDef$();
    var cd = $.CircleShape$();
    cd.radius = 1.2;
    fd.shape = cd;
    fd.density = 25;
    fd.friction = 0.1;
    fd.restitution = 0.9;
    var t1 = $.toDouble(5);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var xPos = 6 * $.cos(6.283185307179586 * (i / t1));
    var t2 = $.toDouble(5);
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    var yPos = 6 * $.sin(6.283185307179586 * (i / t2));
    cd.position.setCoords$2(xPos, yPos);
    body.createFixture$1(fd);
  }
  body.set$bullet(false);
  var bodyDef = $.BodyDef$();
  var groundBody = this.world.createBody$1(bodyDef);
  var rjd = $.RevoluteJointDef$();
  rjd.initialize$3(body, groundBody, body.get$position());
  rjd.motorSpeed = 3.141592653589793;
  rjd.maxMotorTorque = 1000000.0;
  rjd.enableMotor = true;
  this._joint = this.world.createJoint$1(rjd);
  for (var j = 0; j < 8; ++j)
    for (yPos = 50 + j, i = 0; i < 20; ++i) {
      var circ = $.CircleShape$();
      var bod = $.BodyDef$();
      bod.type = 2;
      circ.radius = 1.0 + ($.mod(i, 2) === 0 ? 1.0 : -1.0) * 0.5 * 0.75;
      var fd2 = $.FixtureDef$();
      fd2.shape = circ;
      fd2.density = $.mul(circ.radius, 1.5);
      fd2.friction = 0.5;
      fd2.restitution = 0.7;
      bod.position = $.Vector$(-39 + 2 * i, yPos);
      var myBody = this.world.createBody$1(bod);
      $.add$1(this.bodies, myBody);
      myBody.createFixture$1(fd2);
    }
}
};

$$.DominoPlatformBench = {"":
 ["bodies", "world", "solveLoops", "_steps"],
 "super": "Benchmark",
 get$name: function() {
  return 'Domino Platforms';
},
 initialize$0: function() {
  this.resetWorld$0();
  var fd = $.FixtureDef$();
  var sd = $.PolygonShape$();
  sd.setAsBox$2(50.0, 10.0);
  fd.shape = sd;
  var bd = $.BodyDef$();
  bd.position = $.Vector$(0.0, -10.0);
  var body = this.world.createBody$1(bd);
  body.createFixture$1(fd);
  $.add$1(this.bodies, body);
  for (var i = 0; i < 4; ++i) {
    fd = $.FixtureDef$();
    sd = $.PolygonShape$();
    sd.setAsBox$2(15.0, 0.125);
    fd.shape = sd;
    bd = $.BodyDef$();
    bd.position = $.Vector$(0.0, 5 + 5 * i);
    body = this.world.createBody$1(bd);
    body.createFixture$1(fd);
    $.add$1(this.bodies, body);
  }
  fd = $.FixtureDef$();
  sd = $.PolygonShape$();
  sd.setAsBox$2(0.125, 2);
  fd.shape = sd;
  fd.density = 25.0;
  bd = $.BodyDef$();
  bd.type = 2;
  for (i = 0; i < 4; ++i)
    for (var t1 = 7.3 + 5 * i, t2 = i === 2, t3 = i === 3, j = 0; j < 25; ++j) {
      fd.friction = 0.5;
      bd.position = $.Vector$(-14.75 + j * 1.2291666666666667, t1);
      if (t2 && j === 0) {
        bd.angle = -0.1;
        var t4 = bd.position;
        t4.set$x($.add(t4.get$x(), 0.1));
      } else if (t3 && j === 24) {
        bd.angle = 0.1;
        t4 = bd.position;
        t4.set$x($.sub(t4.get$x(), 0.1));
      } else
        bd.angle = 0;
      var myBody = this.world.createBody$1(bd);
      myBody.createFixture$1(fd);
      $.add$1(this.bodies, myBody);
    }
}
};

$$.DominoTowerBench = {"":
 ["dominoDensity", "bodies", "world", "solveLoops", "_steps"],
 "super": "Benchmark",
 get$name: function() {
  return 'Domino Tower';
},
 makeDomino$4: function(x, y, horizontal, world_) {
  var sd = $.PolygonShape$();
  sd.setAsBox$2(0.1, 0.5);
  var fd = $.FixtureDef$();
  fd.shape = sd;
  fd.density = this.dominoDensity;
  var bd = $.BodyDef$();
  bd.type = 2;
  fd.friction = 0.1;
  fd.restitution = 0.65;
  bd.position = $.Vector$(x, y);
  bd.angle = horizontal ? 1.5707963267948966 : 0;
  var myBody = world_.createBody$1(bd);
  myBody.createFixture$1(fd);
  $.add$1(this.bodies, myBody);
},
 initialize$0: function() {
  this.resetWorld$0();
  var sd = $.PolygonShape$();
  sd.setAsBox$2(50.0, 10.0);
  var bd = $.BodyDef$();
  bd.position = $.Vector$(0.0, -10.0);
  var body = this.world.createBody$1(bd);
  body.createFixtureFromShape$1(sd);
  $.add$1(this.bodies, body);
  this.dominoDensity = 10;
  sd = $.PolygonShape$();
  sd.setAsBox$2(0.7, 0.7);
  var fd = $.FixtureDef$();
  fd.density = 35;
  bd = $.BodyDef$();
  bd.type = 2;
  fd.shape = sd;
  fd.friction = 0;
  fd.restitution = 0.85;
  bd.bullet = true;
  bd.position = $.Vector$(30, 50);
  var b = this.world.createBody$1(bd);
  $.add$1(this.bodies, b);
  b.createFixture$1(fd);
  b.set$linearVelocity($.Vector$(-25, -25));
  b.set$angularVelocity(6.7);
  fd.density = 25;
  bd.position = $.Vector$(-30, 25);
  b = this.world.createBody$1(bd);
  $.add$1(this.bodies, b);
  b.createFixture$1(fd);
  b.set$linearVelocity($.Vector$(35, -10));
  b.set$angularVelocity(-8.3);
  for (var currX = null, i = 0; i < 25; ++i) {
    currX = i * 1.5 * 1 - 18.75;
    this.makeDomino$4(currX, 0.5, false, this.world);
    this.makeDomino$4(currX, 1.1, true, this.world);
  }
  for (var j = 1, currX = 18.75; j < 25; ++j) {
    if (j > 3)
      this.dominoDensity = $.mul(this.dominoDensity, 0.8);
    var currY = 0.5 + 1.386 * j;
    for (var t1 = 25 - j, t2 = 1.5 * t1 / 2, t3 = currY - 0.2, t4 = t1 - 1, t5 = currY + 0.6, t6 = currY - 0.6, i = 0; i < t1; ++i) {
      currX = i * 1.5 * 1 - t2;
      this.dominoDensity = $.mul(this.dominoDensity, 2.5);
      if (i === 0)
        this.makeDomino$4(currX - 1.25 + 0.1, t3, false, this.world);
      if (i === t4)
        this.makeDomino$4(currX + 1.25 - 0.1, t3, false, this.world);
      this.dominoDensity = $.div(this.dominoDensity, 2.5);
      this.makeDomino$4(currX, currY, false, this.world);
      this.makeDomino$4(currX, t5, true, this.world);
      this.makeDomino$4(currX, t6, true, this.world);
    }
  }
}
};

$$.ContactFilter = {"":
 [],
 "super": "Object",
 shouldCollide$2: function(fixtureA, fixtureB) {
  var filterA = fixtureA.get$filter();
  var filterB = fixtureB.get$filter();
  var t1 = filterA.get$groupIndex();
  if (typeof t1 !== 'number')
    return this.shouldCollide$2$bailout(1, t1, filterA, filterB, 0);
  if (!(t1 === 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex())) {
    t1 = filterA.get$groupIndex();
    if (typeof t1 !== 'number')
      return this.shouldCollide$2$bailout(2, t1, 0, 0, 0);
    return t1 > 0;
  }
  t1 = filterA.get$maskBits();
  if (t1 !== (t1 | 0))
    return this.shouldCollide$2$bailout(3, t1, filterA, filterB, 0);
  var t3 = filterB.get$categoryBits();
  if (t3 !== (t3 | 0))
    return this.shouldCollide$2$bailout(4, t1, t3, filterA, filterB);
  if (!((t1 & t3) >>> 0 === 0)) {
    t1 = filterA.get$categoryBits();
    if (t1 !== (t1 | 0))
      return this.shouldCollide$2$bailout(5, t1, filterB, 0, 0);
    t3 = filterB.get$maskBits();
    if (t3 !== (t3 | 0))
      return this.shouldCollide$2$bailout(6, t1, t3, 0, 0);
    var t5 = !((t1 & t3) >>> 0 === 0);
    t1 = t5;
  } else
    t1 = false;
  return t1;
},
 shouldCollide$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      filterA = env1;
      filterB = env2;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      filterA = env1;
      filterB = env2;
      break;
    case 4:
      t1 = env0;
      t3 = env1;
      filterA = env2;
      filterB = env3;
      break;
    case 5:
      t1 = env0;
      filterB = env1;
      break;
    case 6:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var filterA = fixtureA.get$filter();
      var filterB = fixtureB.get$filter();
      var t1 = filterA.get$groupIndex();
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !$.eqB(t1, 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex()))
        switch (state) {
          case 0:
            t1 = filterA.get$groupIndex();
          case 2:
            state = 0;
            return $.gt(t1, 0);
        }
      t1 = filterA.get$maskBits();
    case 3:
      state = 0;
      var t3 = filterB.get$categoryBits();
    case 4:
      state = 0;
    default:
      if (state === 6 || state === 5 || state === 0 && !$.eqB($.and(t1, t3), 0))
        switch (state) {
          case 0:
            t1 = filterA.get$categoryBits();
          case 5:
            state = 0;
            t3 = filterB.get$maskBits();
          case 6:
            state = 0;
            var t5 = !$.eqB($.and(t1, t3), 0);
            t1 = t5;
        }
      else
        t1 = false;
      return t1;
  }
}
};

$$.ContactImpulse = {"":
 ["normalImpulses?", "tangentImpulses?"],
 "super": "Object"
};

$$.AxisAlignedBox = {"":
 ["lowerBound?", "upperBound?"],
 "super": "Object",
 setFromCombination$2: function(boxOne, boxTwo) {
  var t1 = $.min(boxOne.get$lowerBound().get$x(), boxTwo.get$lowerBound().get$x());
  var t2 = this.lowerBound;
  t2.set$x(t1);
  t2.set$y($.min(boxOne.get$lowerBound().get$y(), boxTwo.get$lowerBound().get$y()));
  t2 = $.max(boxOne.get$upperBound().get$x(), boxTwo.get$upperBound().get$x());
  t1 = this.upperBound;
  t1.set$x(t2);
  t1.set$y($.max(boxOne.get$upperBound().get$y(), boxTwo.get$upperBound().get$y()));
},
 get$center: function() {
  var c = $.Vector$copy(this.lowerBound);
  c.addLocal$1(this.upperBound);
  c.mulLocal$1(0.5);
  return c;
},
 contains$1: function(aabb) {
  var t1 = this.lowerBound;
  if ($.gtB(t1.get$x(), aabb.get$lowerBound().get$x()))
    if ($.gtB(t1.get$y(), aabb.get$lowerBound().get$y())) {
      t1 = this.upperBound;
      t1 = $.ltB(t1.get$y(), aabb.get$upperBound().get$y()) && $.ltB(t1.get$x(), aabb.get$upperBound().get$x());
    } else
      t1 = false;
  else
    t1 = false;
  return t1;
},
 setFrom$1: function(other) {
  this.lowerBound.setFrom$1(other.get$lowerBound());
  this.upperBound.setFrom$1(other.get$upperBound());
},
 toString$0: function() {
  return $.S(this.lowerBound) + ', ' + $.S(this.upperBound);
},
 AxisAlignedBox$2: function(lowerBound, upperBound) {
  if (this.lowerBound == null)
    this.lowerBound = $.Vector$(0, 0);
  if (this.upperBound == null)
    this.upperBound = $.Vector$(0, 0);
}
};

$$.Collision = {"":
 ["_pool", "cache", "input", "output", "results1", "results2", "incidentEdge?", "localTangent", "localNormal?", "planePoint", "tangent", "normal?", "normal1", "v11", "v12", "clipPoints1", "clipPoints2"],
 "super": "Object",
 testOverlap$4: function(shapeA, shapeB, transformA, transformB) {
  var t1 = this.input;
  t1.get$proxyA().setFromShape$1(shapeA);
  t1.get$proxyB().setFromShape$1(shapeB);
  t1.get$transformA().setFrom$1(transformA);
  t1.get$transformB().setFrom$1(transformB);
  t1.set$useRadii(true);
  var t2 = this.cache;
  t2.set$count(0);
  var t3 = this._pool.get$distance();
  var t4 = this.output;
  t3.distance$3(t4, t2, t1);
  return $.lt(t4.get$distance(), 0.000001192);
},
 collideCircles$5: function(manifold, circle1, xfA, circle2, xfB) {
  manifold.set$pointCount(0);
  var v = circle1.get$position();
  var pAy = $.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), v.get$y()));
  var pAx = $.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), v.get$y()));
  var v1 = circle2.get$position();
  var pBy = $.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v1.get$y()));
  var dx = $.sub($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v1.get$y())), pAx);
  var dy = $.sub(pBy, pAy);
  var distSqr = $.add($.mul(dx, dx), $.mul(dy, dy));
  var radius = $.add(circle1.get$radius(), circle2.get$radius());
  if ($.gtB(distSqr, $.mul(radius, radius)))
    return;
  manifold.set$type(0);
  manifold.get$localPoint().setFrom$1(circle1.get$position());
  manifold.get$localNormal().setZero$0();
  manifold.set$pointCount(1);
  $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle2.get$position());
  $.index(manifold.get$points(), 0).get$id().zero$0();
},
 collidePolygonAndCircle$5: function(manifold, polygon, xfA, circle, xfB) {
  manifold.set$pointCount(0);
  var v = circle.get$position();
  var cy = $.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y()));
  var v1x = $.sub($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())), xfA.get$position().get$x());
  var v1y = $.sub(cy, xfA.get$position().get$y());
  var b = xfA.get$rotation().get$col1();
  var b1 = xfA.get$rotation().get$col2();
  var cLocaly = $.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y()));
  if (typeof cLocaly !== 'number')
    return this.collidePolygonAndCircle$5$bailout(1, manifold, cLocaly, polygon, circle, v1x, v1y, b, 0);
  var cLocalx = $.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y()));
  if (typeof cLocalx !== 'number')
    return this.collidePolygonAndCircle$5$bailout(2, manifold, cLocaly, polygon, circle, cLocalx, 0, 0, 0);
  var radius = $.add(polygon.get$radius(), circle.get$radius());
  if (typeof radius !== 'number')
    return this.collidePolygonAndCircle$5$bailout(3, manifold, cLocaly, polygon, circle, cLocalx, radius, 0, 0);
  var vertexCount = polygon.get$vertexCount();
  if (typeof vertexCount !== 'number')
    return this.collidePolygonAndCircle$5$bailout(4, manifold, cLocaly, polygon, circle, cLocalx, radius, vertexCount, 0);
  var vertices = polygon.get$vertices();
  if (typeof vertices !== 'string' && (typeof vertices !== 'object' || vertices === null || vertices.constructor !== Array && !vertices.is$JavaScriptIndexingBehavior))
    return this.collidePolygonAndCircle$5$bailout(5, manifold, cLocaly, polygon, circle, vertices, cLocalx, radius, vertexCount);
  var normals = polygon.get$normals();
  if (typeof normals !== 'string' && (typeof normals !== 'object' || normals === null || normals.constructor !== Array && !normals.is$JavaScriptIndexingBehavior))
    return this.collidePolygonAndCircle$5$bailout(6, manifold, cLocaly, normals, circle, vertices, cLocalx, radius, vertexCount);
  for (var normalIndex = 0, i = 0, separation = 1e-12; i < vertexCount; ++i) {
    if (i < 0 || i >= vertices.length)
      throw $.ioore(i);
    var vertex = vertices[i];
    var t1 = vertex.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var tempx = cLocalx - t1;
    t1 = vertex.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var tempy = cLocaly - t1;
    if (i < 0 || i >= normals.length)
      throw $.ioore(i);
    var norm = normals[i];
    var s = $.add($.mul(norm.get$x(), tempx), $.mul(norm.get$y(), tempy));
    if ($.gtB(s, radius))
      return;
    if ($.gtB(s, separation)) {
      separation = s;
      normalIndex = i;
    }
  }
  var vertIndex2 = normalIndex + 1;
  vertIndex2 = vertIndex2 < vertexCount ? vertIndex2 : 0;
  t1 = vertices.length;
  if (normalIndex < 0 || normalIndex >= t1)
    throw $.ioore(normalIndex);
  var v1 = vertices[normalIndex];
  if (vertIndex2 < 0 || vertIndex2 >= t1)
    throw $.ioore(vertIndex2);
  var v2 = vertices[vertIndex2];
  if ($.ltB(separation, 1.192e-7)) {
    manifold.set$pointCount(1);
    manifold.set$type(1);
    if (normalIndex < 0 || normalIndex >= normals.length)
      throw $.ioore(normalIndex);
    norm = normals[normalIndex];
    t1 = norm.get$x();
    manifold.get$localNormal().set$x(t1);
    t1 = norm.get$y();
    manifold.get$localNormal().set$y(t1);
    t1 = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
    manifold.get$localPoint().set$x(t1);
    t1 = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
    manifold.get$localPoint().set$y(t1);
    var mpoint = $.index(manifold.get$points(), 0);
    t1 = circle.get$position().get$x();
    mpoint.get$localPoint().set$x(t1);
    t1 = circle.get$position().get$y();
    mpoint.get$localPoint().set$y(t1);
    mpoint.get$id().zero$0();
    return;
  }
  t1 = v1.get$x();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var tempX = cLocalx - t1;
  t1 = v1.get$y();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var tempY = cLocaly - t1;
  var temp2X = $.sub(v2.get$x(), v1.get$x());
  var temp2Y = $.sub(v2.get$y(), v1.get$y());
  if (typeof temp2X !== 'number')
    throw $.iae(temp2X);
  t1 = tempX * temp2X;
  if (typeof temp2Y !== 'number')
    throw $.iae(temp2Y);
  var u1 = t1 + tempY * temp2Y;
  t1 = v2.get$x();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var temp3X = cLocalx - t1;
  t1 = v2.get$y();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var temp3Y = cLocaly - t1;
  var temp4X = $.sub(v1.get$x(), v2.get$x());
  var temp4Y = $.sub(v1.get$y(), v2.get$y());
  if (typeof temp4X !== 'number')
    throw $.iae(temp4X);
  t1 = temp3X * temp4X;
  if (typeof temp4Y !== 'number')
    throw $.iae(temp4Y);
  var u2 = t1 + temp3Y * temp4Y;
  if (u1 <= 0) {
    t1 = v1.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var dx = cLocalx - t1;
    t1 = v1.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var dy = cLocaly - t1;
    if (dx * dx + dy * dy > radius * radius)
      return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = v1.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocalx - t1;
    manifold.get$localNormal().set$x(t1);
    t1 = v1.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocaly - t1;
    manifold.get$localNormal().set$y(t1);
    manifold.get$localNormal().normalize$0();
    manifold.get$localPoint().setFrom$1(v1);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  } else if (u2 <= 0.0) {
    t1 = v2.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    dx = cLocalx - t1;
    t1 = v2.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    dy = cLocaly - t1;
    if (dx * dx + dy * dy > radius * radius)
      return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = v2.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocalx - t1;
    manifold.get$localNormal().set$x(t1);
    t1 = v2.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocaly - t1;
    manifold.get$localNormal().set$y(t1);
    manifold.get$localNormal().normalize$0();
    manifold.get$localPoint().setFrom$1(v2);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  } else {
    var fcx = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
    var fcy = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
    if (typeof fcx !== 'number')
      throw $.iae(fcx);
    var tx = cLocalx - fcx;
    if (typeof fcy !== 'number')
      throw $.iae(fcy);
    var ty = cLocaly - fcy;
    if (normalIndex < 0 || normalIndex >= normals.length)
      throw $.ioore(normalIndex);
    norm = normals[normalIndex];
    t1 = norm.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = tx * t1;
    var t2 = norm.get$y();
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    if (t1 + ty * t2 > radius)
      return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = manifold.get$localNormal();
    if (normalIndex < 0 || normalIndex >= normals.length)
      throw $.ioore(normalIndex);
    t1.setFrom$1(normals[normalIndex]);
    manifold.get$localPoint().set$x(fcx);
    manifold.get$localPoint().set$y(fcy);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  }
},
 collidePolygonAndCircle$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var manifold = env0;
      cLocaly = env1;
      var polygon = env2;
      var circle = env3;
      v1x = env4;
      v1y = env5;
      b = env6;
      break;
    case 2:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      cLocalx = env4;
      break;
    case 3:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      cLocalx = env4;
      radius = env5;
      break;
    case 4:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      cLocalx = env4;
      radius = env5;
      vertexCount = env6;
      break;
    case 5:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      vertices = env4;
      cLocalx = env5;
      radius = env6;
      vertexCount = env7;
      break;
    case 6:
      manifold = env0;
      cLocaly = env1;
      normals = env2;
      circle = env3;
      vertices = env4;
      cLocalx = env5;
      radius = env6;
      vertexCount = env7;
      break;
  }
  switch (state) {
    case 0:
      manifold.set$pointCount(0);
      var v = circle.get$position();
      var cy = $.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y()));
      var v1x = $.sub($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())), xfA.get$position().get$x());
      var v1y = $.sub(cy, xfA.get$position().get$y());
      var b = xfA.get$rotation().get$col1();
      var b1 = xfA.get$rotation().get$col2();
      var cLocaly = $.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y()));
    case 1:
      state = 0;
      var cLocalx = $.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y()));
    case 2:
      state = 0;
      var radius = $.add(polygon.get$radius(), circle.get$radius());
    case 3:
      state = 0;
      var vertexCount = polygon.get$vertexCount();
    case 4:
      state = 0;
      var vertices = polygon.get$vertices();
    case 5:
      state = 0;
      var normals = polygon.get$normals();
    case 6:
      state = 0;
      for (var normalIndex = 0, i = 0, separation = 1e-12; $.ltB(i, vertexCount); ++i) {
        var vertex = $.index(vertices, i);
        var tempx = $.sub(cLocalx, vertex.get$x());
        var tempy = $.sub(cLocaly, vertex.get$y());
        var norm = $.index(normals, i);
        var s = $.add($.mul(norm.get$x(), tempx), $.mul(norm.get$y(), tempy));
        if ($.gtB(s, radius))
          return;
        if ($.gtB(s, separation)) {
          separation = s;
          normalIndex = i;
        }
      }
      var vertIndex2 = normalIndex + 1;
      vertIndex2 = $.ltB(vertIndex2, vertexCount) ? vertIndex2 : 0;
      var v1 = $.index(vertices, normalIndex);
      var v2 = $.index(vertices, vertIndex2);
      if ($.ltB(separation, 1.192e-7)) {
        manifold.set$pointCount(1);
        manifold.set$type(1);
        norm = $.index(normals, normalIndex);
        var t1 = norm.get$x();
        manifold.get$localNormal().set$x(t1);
        t1 = norm.get$y();
        manifold.get$localNormal().set$y(t1);
        t1 = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
        manifold.get$localPoint().set$x(t1);
        t1 = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
        manifold.get$localPoint().set$y(t1);
        var mpoint = $.index(manifold.get$points(), 0);
        t1 = circle.get$position().get$x();
        mpoint.get$localPoint().set$x(t1);
        t1 = circle.get$position().get$y();
        mpoint.get$localPoint().set$y(t1);
        mpoint.get$id().zero$0();
        return;
      }
      var tempX = $.sub(cLocalx, v1.get$x());
      var tempY = $.sub(cLocaly, v1.get$y());
      var temp2X = $.sub(v2.get$x(), v1.get$x());
      var temp2Y = $.sub(v2.get$y(), v1.get$y());
      var u1 = $.add($.mul(tempX, temp2X), $.mul(tempY, temp2Y));
      var temp3X = $.sub(cLocalx, v2.get$x());
      var temp3Y = $.sub(cLocaly, v2.get$y());
      var temp4X = $.sub(v1.get$x(), v2.get$x());
      var temp4Y = $.sub(v1.get$y(), v2.get$y());
      var u2 = $.add($.mul(temp3X, temp4X), $.mul(temp3Y, temp4Y));
      if ($.leB(u1, 0)) {
        var dx = $.sub(cLocalx, v1.get$x());
        var dy = $.sub(cLocaly, v1.get$y());
        if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius)))
          return;
        manifold.set$pointCount(1);
        manifold.set$type(1);
        t1 = $.sub(cLocalx, v1.get$x());
        manifold.get$localNormal().set$x(t1);
        t1 = $.sub(cLocaly, v1.get$y());
        manifold.get$localNormal().set$y(t1);
        manifold.get$localNormal().normalize$0();
        manifold.get$localPoint().setFrom$1(v1);
        $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
        $.index(manifold.get$points(), 0).get$id().zero$0();
      } else if ($.leB(u2, 0.0)) {
        dx = $.sub(cLocalx, v2.get$x());
        dy = $.sub(cLocaly, v2.get$y());
        if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius)))
          return;
        manifold.set$pointCount(1);
        manifold.set$type(1);
        t1 = $.sub(cLocalx, v2.get$x());
        manifold.get$localNormal().set$x(t1);
        t1 = $.sub(cLocaly, v2.get$y());
        manifold.get$localNormal().set$y(t1);
        manifold.get$localNormal().normalize$0();
        manifold.get$localPoint().setFrom$1(v2);
        $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
        $.index(manifold.get$points(), 0).get$id().zero$0();
      } else {
        var fcx = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
        var fcy = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
        var tx = $.sub(cLocalx, fcx);
        var ty = $.sub(cLocaly, fcy);
        norm = $.index(normals, normalIndex);
        if ($.gtB($.add($.mul(tx, norm.get$x()), $.mul(ty, norm.get$y())), radius))
          return;
        manifold.set$pointCount(1);
        manifold.set$type(1);
        manifold.get$localNormal().setFrom$1($.index(normals, normalIndex));
        manifold.get$localPoint().set$x(fcx);
        manifold.get$localPoint().set$y(fcy);
        $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
        $.index(manifold.get$points(), 0).get$id().zero$0();
      }
  }
},
 edgeSeparation$5: function(poly1, xf1, edge1, poly2, xf2) {
  poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  if (typeof vertices1 !== 'string' && (typeof vertices1 !== 'object' || vertices1 === null || vertices1.constructor !== Array && !vertices1.is$JavaScriptIndexingBehavior))
    return this.edgeSeparation$5$bailout(1, poly1, xf1, edge1, poly2, xf2, vertices1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var normals1 = poly1.get$normals();
  if (typeof normals1 !== 'string' && (typeof normals1 !== 'object' || normals1 === null || normals1.constructor !== Array && !normals1.is$JavaScriptIndexingBehavior))
    return this.edgeSeparation$5$bailout(2, xf1, edge1, poly2, xf2, vertices1, normals1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var count2 = poly2.get$vertexCount();
  if (typeof count2 !== 'number')
    return this.edgeSeparation$5$bailout(3, xf1, edge1, poly2, xf2, vertices1, normals1, count2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var vertices2 = poly2.get$vertices();
  if (typeof vertices2 !== 'string' && (typeof vertices2 !== 'object' || vertices2 === null || vertices2.constructor !== Array && !vertices2.is$JavaScriptIndexingBehavior))
    return this.edgeSeparation$5$bailout(4, xf1, edge1, xf2, vertices1, normals1, count2, vertices2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var R = xf1.get$rotation();
  if (edge1 !== (edge1 | 0))
    throw $.iae(edge1);
  if (edge1 < 0 || edge1 >= normals1.length)
    throw $.ioore(edge1);
  var v = normals1[edge1];
  var t5 = R.get$col1().get$y();
  if (typeof t5 !== 'number')
    return this.edgeSeparation$5$bailout(5, xf1, edge1, xf2, t5, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0, 0, 0);
  var t7 = v.get$x();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(6, xf1, edge1, t7, xf2, t5, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0, 0);
  t7 = t5 * t7;
  t5 = R.get$col2().get$y();
  if (typeof t5 !== 'number')
    return this.edgeSeparation$5$bailout(7, xf1, edge1, xf2, t7, t5, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0, 0);
  var t10 = v.get$y();
  if (typeof t10 !== 'number')
    return this.edgeSeparation$5$bailout(8, xf1, edge1, xf2, t7, t5, t10, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0);
  var normal1Worldy = t7 + t5 * t10;
  t7 = R.get$col1().get$x();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(9, xf1, edge1, xf2, vertices1, count2, vertices2, normal1Worldy, R, t7, v, 0, 0, 0, 0, 0, 0, 0);
  var t13 = v.get$x();
  if (typeof t13 !== 'number')
    return this.edgeSeparation$5$bailout(10, xf1, edge1, t13, xf2, vertices1, count2, vertices2, normal1Worldy, R, t7, v, 0, 0, 0, 0, 0, 0);
  t13 = t7 * t13;
  t7 = R.get$col2().get$x();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(11, t13, xf1, edge1, t7, xf2, vertices1, count2, vertices2, normal1Worldy, R, v, 0, 0, 0, 0, 0, 0);
  var t16 = v.get$y();
  if (typeof t16 !== 'number')
    return this.edgeSeparation$5$bailout(12, t13, xf1, edge1, t7, xf2, t16, vertices1, count2, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  var normal1Worldx = t13 + t7 * t16;
  var R1 = xf2.get$rotation();
  t13 = R1.get$col1().get$x();
  if (typeof t13 !== 'number')
    return this.edgeSeparation$5$bailout(13, t13, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  t13 = normal1Worldx * t13;
  var t19 = R1.get$col1().get$y();
  if (typeof t19 !== 'number')
    return this.edgeSeparation$5$bailout(14, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, t13, R, t19, normal1Worldy, 0, 0, 0, 0, 0);
  var normal1x = t13 + normal1Worldy * t19;
  t13 = R1.get$col2().get$x();
  if (typeof t13 !== 'number')
    return this.edgeSeparation$5$bailout(15, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, R, normal1x, t13, normal1Worldy, 0, 0, 0, 0, 0);
  t13 = normal1Worldx * t13;
  var t22 = R1.get$col2().get$y();
  if (typeof t22 !== 'number')
    return this.edgeSeparation$5$bailout(16, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, R, normal1x, t13, t22, normal1Worldy, 0, 0, 0, 0);
  var normal1y = t13 + normal1Worldy * t22;
  for (var minDot = 99999999999999.0, i = 0, index = 0; i < count2; ++i) {
    if (i < 0 || i >= vertices2.length)
      throw $.ioore(i);
    var a = vertices2[i];
    var t1 = a.get$x();
    if (typeof t1 !== 'number')
      return this.edgeSeparation$5$bailout(17, xf1, edge1, xf2, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y, a, t1);
    t1 *= normal1x;
    var t3 = a.get$y();
    if (typeof t3 !== 'number')
      return this.edgeSeparation$5$bailout(18, t1, t3, edge1, xf1, xf2, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y);
    var dot = t1 + t3 * normal1y;
    if (typeof dot !== 'number')
      return this.edgeSeparation$5$bailout(19, xf1, edge1, xf2, dot, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y, 0);
    if (dot < minDot) {
      index = i;
      minDot = dot;
    }
  }
  if (edge1 < 0 || edge1 >= vertices1.length)
    throw $.ioore(edge1);
  var v3 = vertices1[edge1];
  t1 = xf1.get$position().get$y();
  if (typeof t1 !== 'number')
    return this.edgeSeparation$5$bailout(20, index, xf1, xf2, normal1Worldx, R1, v3, vertices2, normal1Worldy, R, t1, 0, 0, 0, 0, 0, 0, 0);
  t3 = R.get$col1().get$y();
  if (typeof t3 !== 'number')
    return this.edgeSeparation$5$bailout(21, index, xf1, xf2, normal1Worldx, R1, v3, vertices2, normal1Worldy, R, t3, t1, 0, 0, 0, 0, 0, 0);
  t5 = v3.get$x();
  if (typeof t5 !== 'number')
    return this.edgeSeparation$5$bailout(22, xf1, xf2, normal1Worldx, R1, vertices2, R, index, v3, normal1Worldy, t1, t3, t5, 0, 0, 0, 0, 0);
  t1 += t3 * t5;
  t7 = R.get$col2().get$y();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(23, index, xf1, t1, xf2, t7, normal1Worldx, R1, v3, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  var t9 = v3.get$y();
  if (typeof t9 !== 'number')
    return this.edgeSeparation$5$bailout(24, xf1, t1, xf2, t7, t9, normal1Worldx, R1, vertices2, R, index, v3, normal1Worldy, 0, 0, 0, 0, 0);
  var v1y = t1 + t7 * t9;
  t1 = xf1.get$position().get$x();
  if (typeof t1 !== 'number')
    return this.edgeSeparation$5$bailout(25, index, xf2, normal1Worldx, R1, v3, v1y, vertices2, t1, R, normal1Worldy, 0, 0, 0, 0, 0, 0, 0);
  var t12 = R.get$col1().get$x();
  if (typeof t12 !== 'number')
    return this.edgeSeparation$5$bailout(26, index, normal1Worldy, xf2, normal1Worldx, R1, v3, v1y, vertices2, t1, R, t12, 0, 0, 0, 0, 0, 0);
  var t14 = v3.get$x();
  if (typeof t14 !== 'number')
    return this.edgeSeparation$5$bailout(27, xf2, normal1Worldx, R1, v1y, vertices2, t1, R, t12, t14, index, v3, normal1Worldy, 0, 0, 0, 0, 0);
  t1 += t12 * t14;
  t16 = R.get$col2().get$x();
  if (typeof t16 !== 'number')
    return this.edgeSeparation$5$bailout(28, index, t1, xf2, t16, normal1Worldx, R1, v1y, normal1Worldy, vertices2, v3, 0, 0, 0, 0, 0, 0, 0);
  var t18 = v3.get$y();
  if (typeof t18 !== 'number')
    return this.edgeSeparation$5$bailout(29, index, t1, xf2, t16, t18, normal1Worldx, R1, v1y, normal1Worldy, vertices2, 0, 0, 0, 0, 0, 0, 0);
  var v1x = t1 + t16 * t18;
  if (index < 0 || index >= vertices2.length)
    throw $.ioore(index);
  var v4 = vertices2[index];
  t1 = xf2.get$position().get$y();
  if (typeof t1 !== 'number')
    return this.edgeSeparation$5$bailout(30, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, v4, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t21 = R1.get$col1().get$y();
  if (typeof t21 !== 'number')
    return this.edgeSeparation$5$bailout(31, t21, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, v4, t1, 0, 0, 0, 0, 0, 0, 0, 0);
  var t23 = v4.get$x();
  if (typeof t23 !== 'number')
    return this.edgeSeparation$5$bailout(32, t21, t23, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, v4, t1, 0, 0, 0, 0, 0, 0, 0);
  t1 += t21 * t23;
  var t25 = R1.get$col2().get$y();
  if (typeof t25 !== 'number')
    return this.edgeSeparation$5$bailout(33, xf2, t1, normal1Worldx, R1, t25, v1y, normal1Worldy, v1x, v4, 0, 0, 0, 0, 0, 0, 0, 0);
  var t27 = v4.get$y();
  if (typeof t27 !== 'number')
    return this.edgeSeparation$5$bailout(34, xf2, t1, normal1Worldx, R1, t27, t25, v1y, normal1Worldy, v1x, v4, 0, 0, 0, 0, 0, 0, 0);
  var v2y = t1 + t25 * t27 - v1y;
  var t29 = xf2.get$position().get$x();
  if (typeof t29 !== 'number')
    return this.edgeSeparation$5$bailout(35, t29, normal1Worldx, R1, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t31 = R1.get$col1().get$x();
  if (typeof t31 !== 'number')
    return this.edgeSeparation$5$bailout(36, t29, t31, normal1Worldx, R1, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t33 = v4.get$x();
  if (typeof t33 !== 'number')
    return this.edgeSeparation$5$bailout(37, t29, t31, t33, normal1Worldx, R1, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0);
  t29 += t31 * t33;
  var t35 = R1.get$col2().get$x();
  if (typeof t35 !== 'number')
    return this.edgeSeparation$5$bailout(38, normal1Worldx, t29, t35, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t37 = v4.get$y();
  if (typeof t37 !== 'number')
    return this.edgeSeparation$5$bailout(39, normal1Worldx, t29, t35, v1x, normal1Worldy, t37, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  return (t29 + t35 * t37 - v1x) * normal1Worldx + v2y * normal1Worldy;
},
 edgeSeparation$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16) {
  switch (state) {
    case 1:
      var poly1 = env0;
      var xf1 = env1;
      var edge1 = env2;
      var poly2 = env3;
      var xf2 = env4;
      vertices1 = env5;
      break;
    case 2:
      xf1 = env0;
      edge1 = env1;
      poly2 = env2;
      xf2 = env3;
      vertices1 = env4;
      normals1 = env5;
      break;
    case 3:
      xf1 = env0;
      edge1 = env1;
      poly2 = env2;
      xf2 = env3;
      vertices1 = env4;
      normals1 = env5;
      count2 = env6;
      break;
    case 4:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      vertices1 = env3;
      normals1 = env4;
      count2 = env5;
      vertices2 = env6;
      break;
    case 5:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      t5 = env3;
      vertices1 = env4;
      count2 = env5;
      vertices2 = env6;
      R = env7;
      v = env8;
      break;
    case 6:
      xf1 = env0;
      edge1 = env1;
      t7 = env2;
      xf2 = env3;
      t5 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      v = env9;
      break;
    case 7:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      t7 = env3;
      t5 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      v = env9;
      break;
    case 8:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      t7 = env3;
      t5 = env4;
      t10 = env5;
      vertices1 = env6;
      count2 = env7;
      vertices2 = env8;
      R = env9;
      v = env10;
      break;
    case 9:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      vertices1 = env3;
      count2 = env4;
      vertices2 = env5;
      normal1Worldy = env6;
      R = env7;
      t7 = env8;
      v = env9;
      break;
    case 10:
      xf1 = env0;
      edge1 = env1;
      t13 = env2;
      xf2 = env3;
      vertices1 = env4;
      count2 = env5;
      vertices2 = env6;
      normal1Worldy = env7;
      R = env8;
      t7 = env9;
      v = env10;
      break;
    case 11:
      t13 = env0;
      xf1 = env1;
      edge1 = env2;
      t7 = env3;
      xf2 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      normal1Worldy = env8;
      R = env9;
      v = env10;
      break;
    case 12:
      t13 = env0;
      xf1 = env1;
      edge1 = env2;
      t7 = env3;
      xf2 = env4;
      t16 = env5;
      vertices1 = env6;
      count2 = env7;
      vertices2 = env8;
      normal1Worldy = env9;
      R = env10;
      break;
    case 13:
      t13 = env0;
      xf1 = env1;
      edge1 = env2;
      xf2 = env3;
      normal1Worldx = env4;
      R1 = env5;
      vertices1 = env6;
      count2 = env7;
      vertices2 = env8;
      normal1Worldy = env9;
      R = env10;
      break;
    case 14:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      t13 = env8;
      R = env9;
      t19 = env10;
      normal1Worldy = env11;
      break;
    case 15:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      normal1x = env9;
      t13 = env10;
      normal1Worldy = env11;
      break;
    case 16:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      normal1x = env9;
      t13 = env10;
      t22 = env11;
      normal1Worldy = env12;
      break;
    case 17:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      minDot = env4;
      R1 = env5;
      count2 = env6;
      i = env7;
      vertices2 = env8;
      R = env9;
      vertices1 = env10;
      index = env11;
      normal1x = env12;
      normal1Worldy = env13;
      normal1y = env14;
      a = env15;
      t1 = env16;
      break;
    case 18:
      t1 = env0;
      t3 = env1;
      edge1 = env2;
      xf1 = env3;
      xf2 = env4;
      normal1Worldx = env5;
      minDot = env6;
      R1 = env7;
      count2 = env8;
      i = env9;
      vertices2 = env10;
      R = env11;
      vertices1 = env12;
      index = env13;
      normal1x = env14;
      normal1Worldy = env15;
      normal1y = env16;
      break;
    case 19:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      dot = env3;
      normal1Worldx = env4;
      minDot = env5;
      R1 = env6;
      count2 = env7;
      i = env8;
      vertices2 = env9;
      R = env10;
      vertices1 = env11;
      index = env12;
      normal1x = env13;
      normal1Worldy = env14;
      normal1y = env15;
      break;
    case 20:
      index = env0;
      xf1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v3 = env5;
      vertices2 = env6;
      normal1Worldy = env7;
      R = env8;
      t1 = env9;
      break;
    case 21:
      index = env0;
      xf1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v3 = env5;
      vertices2 = env6;
      normal1Worldy = env7;
      R = env8;
      t3 = env9;
      t1 = env10;
      break;
    case 22:
      xf1 = env0;
      xf2 = env1;
      normal1Worldx = env2;
      R1 = env3;
      vertices2 = env4;
      R = env5;
      index = env6;
      v3 = env7;
      normal1Worldy = env8;
      t1 = env9;
      t3 = env10;
      t5 = env11;
      break;
    case 23:
      index = env0;
      xf1 = env1;
      t1 = env2;
      xf2 = env3;
      t7 = env4;
      normal1Worldx = env5;
      R1 = env6;
      v3 = env7;
      vertices2 = env8;
      normal1Worldy = env9;
      R = env10;
      break;
    case 24:
      xf1 = env0;
      t1 = env1;
      xf2 = env2;
      t7 = env3;
      t9 = env4;
      normal1Worldx = env5;
      R1 = env6;
      vertices2 = env7;
      R = env8;
      index = env9;
      v3 = env10;
      normal1Worldy = env11;
      break;
    case 25:
      index = env0;
      xf2 = env1;
      normal1Worldx = env2;
      R1 = env3;
      v3 = env4;
      v1y = env5;
      vertices2 = env6;
      t1 = env7;
      R = env8;
      normal1Worldy = env9;
      break;
    case 26:
      index = env0;
      normal1Worldy = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v3 = env5;
      v1y = env6;
      vertices2 = env7;
      t1 = env8;
      R = env9;
      t12 = env10;
      break;
    case 27:
      xf2 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1y = env3;
      vertices2 = env4;
      t1 = env5;
      R = env6;
      t12 = env7;
      t14 = env8;
      index = env9;
      v3 = env10;
      normal1Worldy = env11;
      break;
    case 28:
      index = env0;
      t1 = env1;
      xf2 = env2;
      t16 = env3;
      normal1Worldx = env4;
      R1 = env5;
      v1y = env6;
      normal1Worldy = env7;
      vertices2 = env8;
      v3 = env9;
      break;
    case 29:
      index = env0;
      t1 = env1;
      xf2 = env2;
      t16 = env3;
      t18 = env4;
      normal1Worldx = env5;
      R1 = env6;
      v1y = env7;
      normal1Worldy = env8;
      vertices2 = env9;
      break;
    case 30:
      xf2 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1y = env3;
      v1x = env4;
      normal1Worldy = env5;
      v4 = env6;
      t1 = env7;
      break;
    case 31:
      t21 = env0;
      xf2 = env1;
      normal1Worldx = env2;
      R1 = env3;
      v1y = env4;
      v1x = env5;
      normal1Worldy = env6;
      v4 = env7;
      t1 = env8;
      break;
    case 32:
      t21 = env0;
      t23 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v1y = env5;
      v1x = env6;
      normal1Worldy = env7;
      v4 = env8;
      t1 = env9;
      break;
    case 33:
      xf2 = env0;
      t1 = env1;
      normal1Worldx = env2;
      R1 = env3;
      t25 = env4;
      v1y = env5;
      normal1Worldy = env6;
      v1x = env7;
      v4 = env8;
      break;
    case 34:
      xf2 = env0;
      t1 = env1;
      normal1Worldx = env2;
      R1 = env3;
      t27 = env4;
      t25 = env5;
      v1y = env6;
      normal1Worldy = env7;
      v1x = env8;
      v4 = env9;
      break;
    case 35:
      t29 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1x = env3;
      normal1Worldy = env4;
      v4 = env5;
      v2y = env6;
      break;
    case 36:
      t29 = env0;
      t31 = env1;
      normal1Worldx = env2;
      R1 = env3;
      v1x = env4;
      normal1Worldy = env5;
      v4 = env6;
      v2y = env7;
      break;
    case 37:
      t29 = env0;
      t31 = env1;
      t33 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v1x = env5;
      normal1Worldy = env6;
      v4 = env7;
      v2y = env8;
      break;
    case 38:
      normal1Worldx = env0;
      t29 = env1;
      t35 = env2;
      v1x = env3;
      normal1Worldy = env4;
      v4 = env5;
      v2y = env6;
      break;
    case 39:
      normal1Worldx = env0;
      t29 = env1;
      t35 = env2;
      v1x = env3;
      normal1Worldy = env4;
      t37 = env5;
      v2y = env6;
      break;
  }
  switch (state) {
    case 0:
      poly1.get$vertexCount();
      var vertices1 = poly1.get$vertices();
    case 1:
      state = 0;
      var normals1 = poly1.get$normals();
    case 2:
      state = 0;
      var count2 = poly2.get$vertexCount();
    case 3:
      state = 0;
      var vertices2 = poly2.get$vertices();
    case 4:
      state = 0;
      var R = xf1.get$rotation();
      var v = $.index(normals1, edge1);
      var t5 = R.get$col1().get$y();
    case 5:
      state = 0;
      var t7 = v.get$x();
    case 6:
      state = 0;
      t7 = $.mul(t5, t7);
      t5 = R.get$col2().get$y();
    case 7:
      state = 0;
      var t10 = v.get$y();
    case 8:
      state = 0;
      var normal1Worldy = $.add(t7, $.mul(t5, t10));
      t7 = R.get$col1().get$x();
    case 9:
      state = 0;
      var t13 = v.get$x();
    case 10:
      state = 0;
      t13 = $.mul(t7, t13);
      t7 = R.get$col2().get$x();
    case 11:
      state = 0;
      var t16 = v.get$y();
    case 12:
      state = 0;
      var normal1Worldx = $.add(t13, $.mul(t7, t16));
      var R1 = xf2.get$rotation();
      t13 = R1.get$col1().get$x();
    case 13:
      state = 0;
      t13 = $.mul(normal1Worldx, t13);
      var t19 = R1.get$col1().get$y();
    case 14:
      state = 0;
      var normal1x = $.add(t13, $.mul(normal1Worldy, t19));
      t13 = R1.get$col2().get$x();
    case 15:
      state = 0;
      t13 = $.mul(normal1Worldx, t13);
      var t22 = R1.get$col2().get$y();
    case 16:
      state = 0;
      var normal1y = $.add(t13, $.mul(normal1Worldy, t22));
      var minDot = 99999999999999.0;
      var i = 0;
      var index = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, count2))
                break L0;
              var a = $.index(vertices2, i);
              var t1 = a.get$x();
            case 17:
              state = 0;
              t1 = $.mul(t1, normal1x);
              var t3 = a.get$y();
            case 18:
              state = 0;
              var dot = $.add(t1, $.mul(t3, normal1y));
            case 19:
              state = 0;
              if ($.ltB(dot, minDot)) {
                index = i;
                minDot = dot;
              }
              ++i;
          }
      var v3 = $.index(vertices1, edge1);
      t1 = xf1.get$position().get$y();
    case 20:
      state = 0;
      t3 = R.get$col1().get$y();
    case 21:
      state = 0;
      t5 = v3.get$x();
    case 22:
      state = 0;
      t1 = $.add(t1, $.mul(t3, t5));
      t7 = R.get$col2().get$y();
    case 23:
      state = 0;
      var t9 = v3.get$y();
    case 24:
      state = 0;
      var v1y = $.add(t1, $.mul(t7, t9));
      t1 = xf1.get$position().get$x();
    case 25:
      state = 0;
      var t12 = R.get$col1().get$x();
    case 26:
      state = 0;
      var t14 = v3.get$x();
    case 27:
      state = 0;
      t1 = $.add(t1, $.mul(t12, t14));
      t16 = R.get$col2().get$x();
    case 28:
      state = 0;
      var t18 = v3.get$y();
    case 29:
      state = 0;
      var v1x = $.add(t1, $.mul(t16, t18));
      var v4 = $.index(vertices2, index);
      t1 = xf2.get$position().get$y();
    case 30:
      state = 0;
      var t21 = R1.get$col1().get$y();
    case 31:
      state = 0;
      var t23 = v4.get$x();
    case 32:
      state = 0;
      t1 = $.add(t1, $.mul(t21, t23));
      var t25 = R1.get$col2().get$y();
    case 33:
      state = 0;
      var t27 = v4.get$y();
    case 34:
      state = 0;
      var v2y = $.sub($.add(t1, $.mul(t25, t27)), v1y);
      var t29 = xf2.get$position().get$x();
    case 35:
      state = 0;
      var t31 = R1.get$col1().get$x();
    case 36:
      state = 0;
      var t33 = v4.get$x();
    case 37:
      state = 0;
      t29 = $.add(t29, $.mul(t31, t33));
      var t35 = R1.get$col2().get$x();
    case 38:
      state = 0;
      var t37 = v4.get$y();
    case 39:
      state = 0;
      return $.add($.mul($.sub($.add(t29, $.mul(t35, t37)), v1x), normal1Worldx), $.mul(v2y, normal1Worldy));
  }
},
 findMaxSeparation$5: function(results, poly1, xf1, poly2, xf2) {
  var count1 = poly1.get$vertexCount();
  if (count1 !== (count1 | 0))
    return this.findMaxSeparation$5$bailout(1, results, poly1, xf1, poly2, xf2, count1, 0, 0, 0, 0, 0);
  var normals1 = poly1.get$normals();
  if (typeof normals1 !== 'string' && (typeof normals1 !== 'object' || normals1 === null || normals1.constructor !== Array && !normals1.is$JavaScriptIndexingBehavior))
    return this.findMaxSeparation$5$bailout(2, results, poly1, xf1, poly2, xf2, count1, normals1, 0, 0, 0, 0);
  var v = poly2.get$centroid();
  var predy = $.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y()));
  var predx = $.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y()));
  var v1 = poly1.get$centroid();
  var tempy = $.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y()));
  var dx = $.sub(predx, $.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())));
  var dy = $.sub(predy, tempy);
  var R = xf1.get$rotation();
  var dLocal1x = $.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y()));
  if (typeof dLocal1x !== 'number')
    return this.findMaxSeparation$5$bailout(3, results, dLocal1x, poly1, xf1, poly2, xf2, dy, count1, normals1, dx, R);
  var dLocal1y = $.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y()));
  if (typeof dLocal1y !== 'number')
    return this.findMaxSeparation$5$bailout(4, results, dLocal1x, poly1, xf1, poly2, xf2, count1, normals1, dLocal1y, 0, 0);
  for (var edge = 0, i = 0, maxDot = 1e-12, dot = null; i < count1; ++i) {
    if (i < 0 || i >= normals1.length)
      throw $.ioore(i);
    var norm = normals1[i];
    dot = $.add($.mul(norm.get$x(), dLocal1x), $.mul(norm.get$y(), dLocal1y));
    if ($.gtB(dot, maxDot)) {
      edge = i;
      maxDot = dot;
    }
  }
  var s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
  if (typeof s !== 'number')
    return this.findMaxSeparation$5$bailout(5, results, poly1, xf1, poly2, xf2, count1, s, edge, 0, 0, 0);
  var prevEdge = edge - 1;
  prevEdge = prevEdge >= 0 ? prevEdge : count1 - 1;
  var sPrev = this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2);
  var nextEdge = edge + 1;
  nextEdge = nextEdge < count1 ? nextEdge : 0;
  var sNext = this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2);
  if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
    var bestSeparation = sPrev;
    var bestEdge = prevEdge;
    var increment = -1;
  } else {
    if ($.gtB(sNext, s))
      ;
    else {
      results.set$edgeIndex(edge);
      results.set$separation(s);
      return;
    }
    bestSeparation = sNext;
    bestEdge = nextEdge;
    increment = 1;
  }
  if (typeof bestSeparation !== 'number')
    return this.findMaxSeparation$5$bailout(6, results, poly1, xf1, poly2, xf2, count1, bestEdge, bestSeparation, increment, s, edge);
  for (var t1 = increment === -1, edge0 = count1 - 1; true;) {
    if (t1) {
      edge = bestEdge - 1;
      edge = edge >= 0 ? edge : edge0;
    } else {
      edge = bestEdge + 1;
      edge = edge < count1 ? edge : 0;
    }
    s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
    if ($.gtB(s, bestSeparation))
      ;
    else
      break;
    bestSeparation = s;
    bestEdge = edge;
  }
  results.set$edgeIndex(bestEdge);
  results.set$separation(bestSeparation);
},
 findMaxSeparation$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var results = env0;
      var poly1 = env1;
      var xf1 = env2;
      var poly2 = env3;
      var xf2 = env4;
      count1 = env5;
      break;
    case 2:
      results = env0;
      poly1 = env1;
      xf1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      normals1 = env6;
      break;
    case 3:
      results = env0;
      dLocal1x = env1;
      poly1 = env2;
      xf1 = env3;
      poly2 = env4;
      xf2 = env5;
      dy = env6;
      count1 = env7;
      normals1 = env8;
      dx = env9;
      R = env10;
      break;
    case 4:
      results = env0;
      dLocal1x = env1;
      poly1 = env2;
      xf1 = env3;
      poly2 = env4;
      xf2 = env5;
      count1 = env6;
      normals1 = env7;
      dLocal1y = env8;
      break;
    case 5:
      results = env0;
      poly1 = env1;
      xf1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      s = env6;
      edge = env7;
      break;
    case 6:
      results = env0;
      poly1 = env1;
      xf1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      bestEdge = env6;
      bestSeparation = env7;
      increment = env8;
      s = env9;
      edge = env10;
      break;
  }
  switch (state) {
    case 0:
      var count1 = poly1.get$vertexCount();
    case 1:
      state = 0;
      var normals1 = poly1.get$normals();
    case 2:
      state = 0;
      var v = poly2.get$centroid();
      var predy = $.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y()));
      var predx = $.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y()));
      var v1 = poly1.get$centroid();
      var tempy = $.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y()));
      var dx = $.sub(predx, $.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())));
      var dy = $.sub(predy, tempy);
      var R = xf1.get$rotation();
      var dLocal1x = $.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y()));
    case 3:
      state = 0;
      var dLocal1y = $.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y()));
    case 4:
      state = 0;
      for (var edge = 0, i = 0, maxDot = 1e-12, dot = null; $.ltB(i, count1); ++i) {
        var norm = $.index(normals1, i);
        dot = $.add($.mul(norm.get$x(), dLocal1x), $.mul(norm.get$y(), dLocal1y));
        if ($.gtB(dot, maxDot)) {
          edge = i;
          maxDot = dot;
        }
      }
      var s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
    case 5:
      state = 0;
      var prevEdge = edge - 1;
      prevEdge = prevEdge >= 0 ? prevEdge : $.sub(count1, 1);
      var sPrev = this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2);
      var nextEdge = edge + 1;
      nextEdge = $.ltB(nextEdge, count1) ? nextEdge : 0;
      var sNext = this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2);
      if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
        var bestSeparation = sPrev;
        var bestEdge = prevEdge;
        var increment = -1;
      } else {
        if ($.gtB(sNext, s))
          ;
        else {
          results.set$edgeIndex(edge);
          results.set$separation(s);
          return;
        }
        bestSeparation = sNext;
        bestEdge = nextEdge;
        increment = 1;
      }
    case 6:
      state = 0;
      for (var t1 = increment === -1; true;) {
        if (t1)
          edge = $.geB($.sub(bestEdge, 1), 0) ? $.sub(bestEdge, 1) : $.sub(count1, 1);
        else
          edge = $.ltB($.add(bestEdge, 1), count1) ? $.add(bestEdge, 1) : 0;
        s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
        if ($.gtB(s, bestSeparation))
          ;
        else
          break;
        bestSeparation = s;
        bestEdge = edge;
      }
      results.set$edgeIndex(bestEdge);
      results.set$separation(bestSeparation);
  }
},
 findIncidentEdge$6: function(c, poly1, xf1, edge1, poly2, xf2) {
  poly1.get$vertexCount();
  var normals1 = poly1.get$normals();
  var count2 = poly2.get$vertexCount();
  if (typeof count2 !== 'number')
    return this.findIncidentEdge$6$bailout(1, c, xf1, edge1, poly2, xf2, normals1, count2, 0);
  var vertices2 = poly2.get$vertices();
  var normals2 = poly2.get$normals();
  if (typeof normals2 !== 'string' && (typeof normals2 !== 'object' || normals2 === null || normals2.constructor !== Array && !normals2.is$JavaScriptIndexingBehavior))
    return this.findIncidentEdge$6$bailout(2, c, xf1, edge1, xf2, normals1, count2, vertices2, normals2);
  var t3 = xf1.get$rotation();
  var t4 = $.index(normals1, edge1);
  var t5 = this.normal1;
  $.Matrix22_mulMatrixAndVectorToOut(t3, t4, t5);
  $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), t5, t5);
  for (var minDot = 99999999999999.0, i = 0, index = 0; i < count2; ++i) {
    if (i < 0 || i >= normals2.length)
      throw $.ioore(i);
    var t1 = normals2[i];
    var dot = $.add($.mul(t5.x, t1.get$x()), $.mul(t5.y, t1.get$y()));
    if ($.ltB(dot, minDot)) {
      index = i;
      minDot = dot;
    }
  }
  var i2 = index + 1;
  i2 = i2 < count2 ? i2 : 0;
  $.Transform_mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
  $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 0).get$id().get$features().set$incidentEdge(index);
  $.index(c, 0).get$id().get$features().set$incidentVertex(0);
  $.Transform_mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
  $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
  $.index(c, 1).get$id().get$features().set$incidentVertex(1);
},
 findIncidentEdge$6$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var c = env0;
      var xf1 = env1;
      var edge1 = env2;
      var poly2 = env3;
      var xf2 = env4;
      normals1 = env5;
      count2 = env6;
      break;
    case 2:
      c = env0;
      xf1 = env1;
      edge1 = env2;
      xf2 = env3;
      normals1 = env4;
      count2 = env5;
      vertices2 = env6;
      normals2 = env7;
      break;
  }
  switch (state) {
    case 0:
      poly1.get$vertexCount();
      var normals1 = poly1.get$normals();
      var count2 = poly2.get$vertexCount();
    case 1:
      state = 0;
      var vertices2 = poly2.get$vertices();
      var normals2 = poly2.get$normals();
    case 2:
      state = 0;
      var t3 = xf1.get$rotation();
      var t4 = $.index(normals1, edge1);
      var t5 = this.normal1;
      $.Matrix22_mulMatrixAndVectorToOut(t3, t4, t5);
      $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), t5, t5);
      for (var minDot = 99999999999999.0, i = 0, index = 0; $.ltB(i, count2); ++i) {
        var t1 = $.index(normals2, i);
        var dot = $.add($.mul(t5.get$x(), t1.get$x()), $.mul(t5.get$y(), t1.get$y()));
        if ($.ltB(dot, minDot)) {
          index = i;
          minDot = dot;
        }
      }
      var i2 = index + 1;
      i2 = $.ltB(i2, count2) ? i2 : 0;
      $.Transform_mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
      $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
      $.index(c, 0).get$id().get$features().set$incidentEdge(index);
      $.index(c, 0).get$id().get$features().set$incidentVertex(0);
      $.Transform_mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
      $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
      $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
      $.index(c, 1).get$id().get$features().set$incidentVertex(1);
  }
},
 collidePolygons$5: function(manifold, polyA, xfA, polyB, xfB) {
  manifold.set$pointCount(0);
  var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
  if (typeof totalRadius !== 'number')
    return this.collidePolygons$5$bailout(1, manifold, polyA, xfA, polyB, xfB, totalRadius, 0, 0, 0, 0, 0, 0);
  var t2 = this.results1;
  this.findMaxSeparation$5(t2, polyA, xfA, polyB, xfB);
  if ($.gtB(t2.separation, totalRadius))
    return;
  var t1 = this.results2;
  this.findMaxSeparation$5(t1, polyB, xfB, polyA, xfA);
  if ($.gtB(t1.separation, totalRadius))
    return;
  var t3 = t1.separation;
  var t4 = t2.separation;
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  if ($.gtB(t3, 0.98 * t4 + 0.001)) {
    var edge1 = t1.edgeIndex;
    manifold.set$type(2);
    var poly2 = polyA;
    var xf2 = xfA;
    var xf1 = xfB;
    var poly1 = polyB;
    var flip = 1;
  } else {
    edge1 = t2.edgeIndex;
    manifold.set$type(1);
    poly2 = polyB;
    xf2 = xfB;
    xf1 = xfA;
    poly1 = polyA;
    flip = 0;
  }
  t1 = this.incidentEdge;
  this.findIncidentEdge$6(t1, poly1, xf1, edge1, poly2, xf2);
  var count1 = poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  t2 = this.v11;
  t2.setFrom$1($.index(vertices1, edge1));
  var two = this.v12;
  two.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
  t3 = this.localTangent;
  t3.setFrom$1(two).subLocal$1(t2);
  t3.normalize$0();
  t4 = this.localNormal;
  $.Vector_crossVectorAndNumToOut(t3, 1, t4);
  var t5 = this.planePoint;
  t5.setFrom$1(t2).addLocal$1(two).mulLocal$1(0.5);
  var t6 = xf1.get$rotation();
  var one = this.tangent;
  $.Matrix22_mulMatrixAndVectorToOut(t6, t3, one);
  var one0 = this.normal;
  $.Vector_crossVectorAndNumToOut(one, 1, one0);
  $.Transform_mulToOut(xf1, t2, t2);
  $.Transform_mulToOut(xf1, two, two);
  var frontOffset = $.add($.mul(one0.x, t2.x), $.mul(one0.y, t2.y));
  if (typeof frontOffset !== 'number')
    return this.collidePolygons$5$bailout(2, xf2, manifold, t5, one, one0, frontOffset, totalRadius, t1, t2, two, flip, t4);
  var sideOffset1 = $.add($.neg($.add($.mul(one.x, t2.x), $.mul(one.y, t2.y))), totalRadius);
  var sideOffset2 = $.add($.add($.mul(one.x, two.x), $.mul(one.y, two.y)), totalRadius);
  one.negateLocal$0();
  t6 = this.clipPoints1;
  var np = $.Collision_clipSegmentToLine(t6, t1, one, sideOffset1);
  one.negateLocal$0();
  if (np < 2)
    return;
  t1 = this.clipPoints2;
  if ($.Collision_clipSegmentToLine(t1, t6, one, sideOffset2) < 2)
    return;
  manifold.get$localNormal().setFrom$1(t4);
  manifold.get$localPoint().setFrom$1(t5);
  for (var pointCount = 0, i = 0; i < 2; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    two = t1[i].get$v();
    if ($.leB($.sub($.add($.mul(one0.x, two.get$x()), $.mul(one0.y, two.get$y())), frontOffset), totalRadius)) {
      var cp = $.index(manifold.get$points(), pointCount);
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
      t2 = cp.get$id();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t2.setFrom$1(t1[i].get$id());
      cp.get$id().get$features().set$flip(flip);
      ++pointCount;
    }
    one = one0;
  }
  manifold.set$pointCount(pointCount);
},
 collidePolygons$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var manifold = env0;
      var polyA = env1;
      var xfA = env2;
      var polyB = env3;
      var xfB = env4;
      totalRadius = env5;
      break;
    case 2:
      xf2 = env0;
      manifold = env1;
      t5 = env2;
      one = env3;
      one0 = env4;
      frontOffset = env5;
      totalRadius = env6;
      t1 = env7;
      t2 = env8;
      two = env9;
      flip = env10;
      t4 = env11;
      break;
  }
  switch (state) {
    case 0:
      manifold.set$pointCount(0);
      var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
    case 1:
      state = 0;
      var t2 = this.results1;
      this.findMaxSeparation$5(t2, polyA, xfA, polyB, xfB);
      if ($.gtB(t2.get$separation(), totalRadius))
        return;
      var t1 = this.results2;
      this.findMaxSeparation$5(t1, polyB, xfB, polyA, xfA);
      if ($.gtB(t1.get$separation(), totalRadius))
        return;
      var t3 = t1.get$separation();
      var t4 = t2.get$separation();
      if (typeof t4 !== 'number')
        throw $.iae(t4);
      if ($.gtB(t3, 0.98 * t4 + 0.001)) {
        var edge1 = t1.get$edgeIndex();
        manifold.set$type(2);
        var poly2 = polyA;
        var xf2 = xfA;
        var xf1 = xfB;
        var poly1 = polyB;
        var flip = 1;
      } else {
        edge1 = t2.get$edgeIndex();
        manifold.set$type(1);
        poly2 = polyB;
        xf2 = xfB;
        xf1 = xfA;
        poly1 = polyA;
        flip = 0;
      }
      t1 = this.incidentEdge;
      this.findIncidentEdge$6(t1, poly1, xf1, edge1, poly2, xf2);
      var count1 = poly1.get$vertexCount();
      var vertices1 = poly1.get$vertices();
      t2 = this.v11;
      t2.setFrom$1($.index(vertices1, edge1));
      var two = this.v12;
      two.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
      t3 = this.localTangent;
      t3.setFrom$1(two).subLocal$1(t2);
      t3.normalize$0();
      t4 = this.localNormal;
      $.Vector_crossVectorAndNumToOut(t3, 1, t4);
      var t5 = this.planePoint;
      t5.setFrom$1(t2).addLocal$1(two).mulLocal$1(0.5);
      var t6 = xf1.get$rotation();
      var one = this.tangent;
      $.Matrix22_mulMatrixAndVectorToOut(t6, t3, one);
      var one0 = this.normal;
      $.Vector_crossVectorAndNumToOut(one, 1, one0);
      $.Transform_mulToOut(xf1, t2, t2);
      $.Transform_mulToOut(xf1, two, two);
      var frontOffset = $.add($.mul(one0.get$x(), t2.get$x()), $.mul(one0.get$y(), t2.get$y()));
    case 2:
      state = 0;
      var sideOffset1 = $.add($.neg($.add($.mul(one.get$x(), t2.get$x()), $.mul(one.get$y(), t2.get$y()))), totalRadius);
      var sideOffset2 = $.add($.add($.mul(one.get$x(), two.get$x()), $.mul(one.get$y(), two.get$y())), totalRadius);
      one.negateLocal$0();
      t6 = this.clipPoints1;
      var np = $.Collision_clipSegmentToLine(t6, t1, one, sideOffset1);
      one.negateLocal$0();
      if (np < 2)
        return;
      t1 = this.clipPoints2;
      if ($.Collision_clipSegmentToLine(t1, t6, one, sideOffset2) < 2)
        return;
      manifold.get$localNormal().setFrom$1(t4);
      manifold.get$localPoint().setFrom$1(t5);
      for (var pointCount = 0, i = 0; i < 2; ++i) {
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        two = t1[i].get$v();
        if ($.leB($.sub($.add($.mul(one0.get$x(), two.get$x()), $.mul(one0.get$y(), two.get$y())), frontOffset), totalRadius)) {
          var cp = $.index(manifold.get$points(), pointCount);
          if (i < 0 || i >= t1.length)
            throw $.ioore(i);
          $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
          t2 = cp.get$id();
          if (i < 0 || i >= t1.length)
            throw $.ioore(i);
          t2.setFrom$1(t1[i].get$id());
          cp.get$id().get$features().set$flip(flip);
          ++pointCount;
        }
        one = one0;
      }
      manifold.set$pointCount(pointCount);
  }
},
 Collision$_construct$1: function(pool) {
  var t1 = this.incidentEdge;
  $.indexSet(t1, 0, $.ClipVertex$());
  $.indexSet(t1, 1, $.ClipVertex$());
  t1 = this.clipPoints1;
  var t2 = $.ClipVertex$();
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0] = t2;
  t2 = $.ClipVertex$();
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1] = t2;
  t2 = this.clipPoints2;
  t1 = $.ClipVertex$();
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t2[0] = t1;
  t1 = $.ClipVertex$();
  if (1 < 0 || 1 >= t2.length)
    throw $.ioore(1);
  t2[1] = t1;
}
};

$$.ClipVertex = {"":
 ["v?", "id?"],
 "super": "Object",
 setFrom$1: function(cv) {
  this.v.setFrom$1(cv.get$v());
  this.id.setFrom$1(cv.get$id());
}
};

$$.EdgeResults = {"":
 ["separation=", "edgeIndex="],
 "super": "Object"
};

$$.ContactID = {"":
 ["features?"],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eq(other.get$features(), this.features);
},
 setFrom$1: function(other) {
  this.features.setFrom$1(other.get$features());
},
 isEqual$1: function(other) {
  return $.eq(other.get$features(), this.features);
},
 zero$0: function() {
  this.features.zero$0();
}
};

$$.Distance = {"":
 ["calls", "iters", "maxIters", "simplex", "saveA", "saveB", "closestPoint", "searchDirection", "temp", "normal?"],
 "super": "Object",
 distance$3: function(output, cache, input) {
  this.calls = $.add(this.calls, 1);
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  var transformA = input.get$transformA();
  var transformB = input.get$transformB();
  var t1 = this.simplex;
  t1.readCache$5(cache, proxyA, transformA, proxyB, transformB);
  var vertices = t1.get$vertices();
  var t2 = this.closestPoint;
  t1.getClosestPoint$1(t2);
  var distanceSqr1 = t2.get$lengthSquared();
  for (var t3 = this.saveA, t4 = this.saveB, t5 = this.searchDirection, t6 = this.temp, distanceSqr2 = distanceSqr1, iter = 0, saveCount = 0; $.ltB(iter, this.maxIters);) {
    saveCount = t1.get$count();
    for (var i = 0; $.ltB(i, saveCount); ++i) {
      $.indexSet(t3, i, $.index(vertices, i).get$indexA());
      $.indexSet(t4, i, $.index(vertices, i).get$indexB());
    }
    switch (t1.get$count()) {
      case 1:
        break;
      case 2:
        t1.solve2$0();
        break;
      case 3:
        t1.solve3$0();
        break;
      default:
    }
    if ($.eqB(t1.get$count(), 3))
      break;
    t1.getClosestPoint$1(t2);
    distanceSqr2 = t2.get$lengthSquared();
    t1.getSearchDirection$1(t5);
    if ($.ltB(t5.get$lengthSquared(), 1.4208639999999999e-14))
      break;
    var vertex = $.index(vertices, t1.get$count());
    $.Matrix22_mulTransMatrixAndVectorToOut(transformA.get$rotation(), t5.negateLocal$0(), t6);
    vertex.set$indexA(proxyA.getSupport$1(t6));
    $.Transform_mulToOut(transformA, $.index(proxyA.get$vertices(), vertex.get$indexA()), vertex.get$wA());
    $.Matrix22_mulTransMatrixAndVectorToOut(transformB.get$rotation(), t5.negateLocal$0(), t6);
    vertex.set$indexB(proxyB.getSupport$1(t6));
    $.Transform_mulToOut(transformB, $.index(proxyB.get$vertices(), vertex.get$indexB()), vertex.get$wB());
    vertex.get$w().setFrom$1(vertex.get$wB()).subLocal$1(vertex.get$wA());
    ++iter;
    this.iters = $.add(this.iters, 1);
    for (i = 0; duplicate = false, $.ltB(i, saveCount); ++i)
      if ($.eqB(vertex.get$indexA(), $.index(t3, i)) && $.eqB(vertex.get$indexB(), $.index(t4, i))) {
        var duplicate = true;
        break;
      }
    if (duplicate)
      break;
    t1.set$count($.add(t1.get$count(), 1));
    distanceSqr1 = distanceSqr2;
  }
  this.maxIters = $.max(this.maxIters, iter);
  t1.getWitnessPoints$2(output.get$pointA(), output.get$pointB());
  output.set$distance($.sqrt($.MathBox_distanceSquared(output.get$pointA(), output.get$pointB())));
  output.set$iterations(iter);
  t1.writeCache$1(cache);
  if (input.get$useRadii() === true) {
    var rA = proxyA.get$radius();
    var rB = proxyB.get$radius();
    if ($.gtB(output.get$distance(), $.add(rA, rB)) && $.gtB(output.get$distance(), 1.192e-7)) {
      output.set$distance($.sub(output.get$distance(), $.add(rA, rB)));
      t1 = this.normal;
      t1.setFrom$1(output.get$pointB()).subLocal$1(output.get$pointA());
      t1.normalize$0();
      t6.setFrom$1(t1).mulLocal$1(rA);
      output.get$pointA().addLocal$1(t6);
      t6.setFrom$1(t1).mulLocal$1(rB);
      output.get$pointB().subLocal$1(t6);
    } else {
      output.get$pointA().addLocal$1(output.get$pointB()).mulLocal$1(0.5);
      output.get$pointB().setFrom$1(output.get$pointA());
      output.set$distance(0.0);
    }
  }
},
 get$distance: function() { return new $.BoundClosure1(this, 'distance$3'); }
};

$$.DistanceInput = {"":
 ["proxyA=", "proxyB=", "transformA=", "transformB=", "useRadii="],
 "super": "Object"
};

$$.DistanceOutput = {"":
 ["pointA?", "pointB?", "distance=", "iterations!"],
 "super": "Object",
 distance$3: function(arg0, arg1, arg2) { return this.distance.call$3(arg0, arg1, arg2); }
};

$$.DistanceProxy = {"":
 ["vertices?", "count=", "radius="],
 "super": "Object",
 setFromShape$1: function(shape) {
  var t1 = shape.get$type();
  if (typeof t1 !== 'number')
    return this.setFromShape$1$bailout(1, shape, t1, 0, 0, 0);
  if (t1 === 0) {
    t1 = this.vertices;
    if (0 >= t1.length)
      throw $.ioore(0);
    t1[0].setFrom$1(shape.get$position());
    this.count = 1;
    this.radius = shape.get$radius();
  } else {
    t1 = shape.get$type();
    if (typeof t1 !== 'number')
      return this.setFromShape$1$bailout(2, shape, t1, 0, 0, 0);
    if (t1 === 1) {
      this.count = shape.get$vertexCount();
      this.radius = shape.get$radius();
      t1 = this.vertices;
      var i = 0;
      while (true) {
        var t2 = this.count;
        if (typeof t2 !== 'number')
          return this.setFromShape$1$bailout(3, shape, i, t1, t2, 0);
        if (!(i < t2))
          break;
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        t2 = t1[i];
        var t3 = shape.get$vertices();
        if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior))
          return this.setFromShape$1$bailout(4, shape, i, t1, t2, t3);
        if (i < 0 || i >= t3.length)
          throw $.ioore(i);
        t2.setFrom$1(t3[i]);
        ++i;
      }
    }
  }
},
 setFromShape$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var shape = env0;
      t1 = env1;
      break;
    case 2:
      shape = env0;
      t1 = env1;
      break;
    case 3:
      shape = env0;
      i = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 4:
      shape = env0;
      i = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = shape.get$type();
    case 1:
      state = 0;
    default:
      if (state === 0 && $.eqB(t1, 0)) {
        t1 = this.vertices;
        if (0 < 0 || 0 >= t1.length)
          throw $.ioore(0);
        t1[0].setFrom$1(shape.get$position());
        this.count = 1;
        this.radius = shape.get$radius();
      } else
        switch (state) {
          case 0:
            t1 = shape.get$type();
          case 2:
            state = 0;
          default:
            if (state === 4 || state === 3 || state === 0 && $.eqB(t1, 1))
              switch (state) {
                case 0:
                  this.count = shape.get$vertexCount();
                  this.radius = shape.get$radius();
                  t1 = this.vertices;
                  var i = 0;
                default:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          var t2 = this.count;
                        case 3:
                          state = 0;
                          if (!$.ltB(i, t2))
                            break L0;
                          if (i < 0 || i >= t1.length)
                            throw $.ioore(i);
                          t2 = t1[i];
                          var t3 = shape.get$vertices();
                        case 4:
                          state = 0;
                          t2.setFrom$1($.index(t3, i));
                          ++i;
                      }
              }
        }
  }
},
 getSupport$1: function(direction) {
  var t1 = this.vertices;
  if (0 >= t1.length)
    throw $.ioore(0);
  var one = t1[0];
  var t2 = one.get$x();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(1, direction, t2, one, t1, 0, 0, 0, 0, 0);
  var t4 = direction.get$x();
  if (typeof t4 !== 'number')
    return this.getSupport$1$bailout(2, direction, t2, t4, one, t1, 0, 0, 0, 0);
  t4 = t2 * t4;
  t2 = one.get$y();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(3, direction, t4, t2, one, t1, 0, 0, 0, 0);
  var t7 = direction.get$y();
  if (typeof t7 !== 'number')
    return this.getSupport$1$bailout(4, direction, one, t1, t4, t2, t7, 0, 0, 0);
  var bestValue = t4 + t2 * t7;
  var two = direction;
  var i = 1;
  var bestIndex = 0;
  while (true) {
    t2 = this.count;
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(5, direction, i, t1, bestIndex, bestValue, one, t2, two, 0);
    if (!(i < t2))
      break;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    one = t1[i];
    t2 = one.get$x();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(6, direction, i, one, bestIndex, bestValue, t1, t2, 0, 0);
    t4 = direction.get$x();
    if (typeof t4 !== 'number')
      return this.getSupport$1$bailout(7, direction, i, one, bestIndex, bestValue, t4, t2, t1, 0);
    t4 = t2 * t4;
    t2 = one.get$y();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(8, direction, i, one, bestIndex, bestValue, t1, t4, t2, 0);
    t7 = direction.get$y();
    if (typeof t7 !== 'number')
      return this.getSupport$1$bailout(9, direction, i, one, bestIndex, bestValue, t1, t4, t2, t7);
    var value = t4 + t2 * t7;
    if (value > bestValue) {
      bestValue = value;
      bestIndex = i;
    }
    two = direction;
    ++i;
  }
  return bestIndex;
},
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      var direction = env0;
      t2 = env1;
      one = env2;
      t1 = env3;
      break;
    case 2:
      direction = env0;
      t2 = env1;
      t4 = env2;
      one = env3;
      t1 = env4;
      break;
    case 3:
      direction = env0;
      t4 = env1;
      t2 = env2;
      one = env3;
      t1 = env4;
      break;
    case 4:
      direction = env0;
      one = env1;
      t1 = env2;
      t4 = env3;
      t2 = env4;
      t7 = env5;
      break;
    case 5:
      direction = env0;
      i = env1;
      t1 = env2;
      bestIndex = env3;
      bestValue = env4;
      one = env5;
      t2 = env6;
      two = env7;
      break;
    case 6:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t1 = env5;
      t2 = env6;
      break;
    case 7:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t4 = env5;
      t2 = env6;
      t1 = env7;
      break;
    case 8:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t1 = env5;
      t4 = env6;
      t2 = env7;
      break;
    case 9:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t1 = env5;
      t4 = env6;
      t2 = env7;
      t7 = env8;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.vertices;
      if (0 < 0 || 0 >= t1.length)
        throw $.ioore(0);
      var one = t1[0];
      var t2 = one.get$x();
    case 1:
      state = 0;
      var t4 = direction.get$x();
    case 2:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = one.get$y();
    case 3:
      state = 0;
      var t7 = direction.get$y();
    case 4:
      state = 0;
      var bestValue = $.add(t4, $.mul(t2, t7));
      var two = direction;
      var i = 1;
      var bestIndex = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              t2 = this.count;
            case 5:
              state = 0;
              if (!$.ltB(i, t2))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              one = t1[i];
              t2 = one.get$x();
            case 6:
              state = 0;
              t4 = direction.get$x();
            case 7:
              state = 0;
              t4 = $.mul(t2, t4);
              t2 = one.get$y();
            case 8:
              state = 0;
              t7 = direction.get$y();
            case 9:
              state = 0;
              var value = $.add(t4, $.mul(t2, t7));
              if ($.gtB(value, bestValue)) {
                bestValue = value;
                bestIndex = i;
              }
              two = direction;
              ++i;
          }
      return bestIndex;
  }
},
 DistanceProxy$0: function() {
  for (var t1 = this.vertices, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.Features = {"":
 ["referenceEdge=", "incidentEdge=", "incidentVertex=", "flip="],
 "super": "Object",
 setFrom$1: function(f) {
  this.referenceEdge = f.get$referenceEdge();
  this.incidentEdge = f.get$incidentEdge();
  this.incidentVertex = f.get$incidentVertex();
  this.flip = f.get$flip();
},
 operator$eq$1: function(other) {
  return $.eqB(this.referenceEdge, other.get$referenceEdge()) && $.eqB(this.incidentEdge, other.get$incidentEdge()) && $.eqB(this.incidentVertex, other.get$incidentVertex()) && $.eqB(this.flip, other.get$flip());
},
 toString$0: function() {
  return 'Features: (' + $.S(this.flip) + ', ' + $.S(this.incidentEdge) + ', ' + $.S(this.incidentVertex) + ' ' + $.S(this.referenceEdge) + ')';
},
 zero$0: function() {
  this.referenceEdge = 0;
  this.incidentEdge = 0;
  this.incidentVertex = 0;
  this.flip = 0;
}
};

$$.Manifold = {"":
 ["points?", "localNormal?", "localPoint?", "type=", "pointCount="],
 "super": "Object",
 setFrom$1: function(other) {
  for (var t1 = this.points, i = 0; $.ltB(i, other.get$pointCount()); ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i].setFrom$1($.index(other.get$points(), i));
  }
  this.type = other.get$type();
  this.localNormal.setFrom$1(other.get$localNormal());
  this.localPoint.setFrom$1(other.get$localPoint());
  this.pointCount = other.get$pointCount();
},
 Manifold$0: function() {
  for (var t1 = this.points, i = 0; i < 2; ++i) {
    var t2 = $.ManifoldPoint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.ManifoldPoint = {"":
 ["localPoint?", "normalImpulse=", "tangentImpulse=", "id?"],
 "super": "Object",
 setFrom$1: function(other) {
  this.localPoint.setFrom$1(other.get$localPoint());
  this.normalImpulse = other.get$normalImpulse();
  this.tangentImpulse = other.get$tangentImpulse();
  this.id.setFrom$1(other.get$id());
}
};

$$.Simplex = {"":
 ["v1", "v2", "v3", "vertices?", "count=", "e13", "e23", "e12", "case2", "case22", "case3", "case33"],
 "super": "Object",
 readCache$5: function(cache, proxyA, transformA, proxyB, transformB) {
  this.count = cache.get$count();
  for (var t1 = this.vertices, i = 0; $.ltB(i, this.count); ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var v = t1[i];
    v.set$indexA($.index(cache.get$indexA(), i));
    v.set$indexB($.index(cache.get$indexB(), i));
    var wALocal = $.index(proxyA.get$vertices(), v.get$indexA());
    var wBLocal = $.index(proxyB.get$vertices(), v.get$indexB());
    $.Transform_mulToOut(transformA, wALocal, v.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
    v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
    v.set$a(0.0);
  }
  if ($.gtB(this.count, 1)) {
    var metric1 = cache.get$metric();
    var metric2 = this.getMetric$0();
    if (typeof metric1 !== 'number')
      throw $.iae(metric1);
    if ($.ltB(metric2, 0.5 * metric1) || $.ltB(2.0 * metric1, metric2) || $.ltB(metric2, 1.192e-7))
      this.count = 0;
  }
  if ($.eqB(this.count, 0)) {
    if (0 < 0 || 0 >= t1.length)
      throw $.ioore(0);
    v = t1[0];
    v.set$indexA(0);
    v.set$indexB(0);
    wALocal = $.index(proxyA.get$vertices(), 0);
    wBLocal = $.index(proxyB.get$vertices(), 0);
    $.Transform_mulToOut(transformA, wALocal, v.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
    v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
    this.count = 1;
  }
},
 writeCache$1: function(cache) {
  cache.set$metric(this.getMetric$0());
  cache.set$count(this.count);
  for (var t1 = this.vertices, i = 0; $.ltB(i, this.count); ++i) {
    var t2 = cache.get$indexA();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    $.indexSet(t2, i, t1[i].get$indexA());
    t2 = cache.get$indexB();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    $.indexSet(t2, i, t1[i].get$indexB());
  }
},
 getSearchDirection$1: function(out) {
  switch (this.count) {
    case 1:
      out.setFrom$1(this.v1.get$w()).negateLocal$0();
      return;
    case 2:
      var t1 = this.e12;
      var t2 = t1.setFrom$1(this.v2.get$w());
      var t3 = this.v1;
      t2.subLocal$1(t3.get$w());
      out.setFrom$1(t3.get$w()).negateLocal$0();
      if ($.gtB($.sub($.mul(t1.get$x(), out.get$y()), $.mul(t1.get$y(), out.get$x())), 0)) {
        $.Vector_crossNumAndVectorToOut(1, t1, out);
        return;
      } else {
        $.Vector_crossVectorAndNumToOut(t1, 1, out);
        return;
      }
    default:
      out.setZero$0();
      return;
  }
},
 getClosestPoint$1: function(out) {
  switch (this.count) {
    case 0:
      out.setZero$0();
      return;
    case 1:
      out.setFrom$1(this.v1.get$w());
      return;
    case 2:
      var t1 = this.case22;
      var t2 = this.v2;
      t1.setFrom$1(t2.get$w()).mulLocal$1(t2.get$a());
      var t3 = this.case2;
      var t4 = this.v1;
      t3.setFrom$1(t4.get$w()).mulLocal$1(t4.get$a()).addLocal$1(t1);
      out.setFrom$1(t3);
      return;
    case 3:
      out.setZero$0();
      return;
    default:
      out.setZero$0();
      return;
  }
},
 getWitnessPoints$2: function(pA, pB) {
  switch (this.count) {
    case 0:
      break;
    case 1:
      var t1 = this.v1;
      pA.setFrom$1(t1.get$wA());
      pB.setFrom$1(t1.get$wB());
      break;
    case 2:
      t1 = this.case2;
      var t2 = this.v1;
      t1.setFrom$1(t2.get$wA()).mulLocal$1(t2.get$a());
      var t3 = this.v2;
      pA.setFrom$1(t3.get$wA()).mulLocal$1(t3.get$a()).addLocal$1(t1);
      t1.setFrom$1(t2.get$wB()).mulLocal$1(t2.get$a());
      pB.setFrom$1(t3.get$wB()).mulLocal$1(t3.get$a()).addLocal$1(t1);
      break;
    case 3:
      t1 = this.v1;
      pA.setFrom$1(t1.get$wA()).mulLocal$1(t1.get$a());
      t2 = this.case3;
      t3 = this.v2;
      t2.setFrom$1(t3.get$wA()).mulLocal$1(t3.get$a());
      var t4 = this.case33;
      var t5 = this.v3;
      t4.setFrom$1(t5.get$wA()).mulLocal$1(t5.get$a());
      pA.addLocal$1(t2).addLocal$1(t4);
      pB.setFrom$1(pA);
      break;
    default:
      break;
  }
},
 getMetric$0: function() {
  switch (this.count) {
    case 0:
      return 0.0;
    case 1:
      return 0.0;
    case 2:
      return $.sqrt($.MathBox_distanceSquared(this.v1.get$w(), this.v2.get$w()));
    case 3:
      var t1 = this.case3;
      var t2 = t1.setFrom$1(this.v2.get$w());
      var t3 = this.v1;
      t2.subLocal$1(t3.get$w());
      t2 = this.case33;
      t2.setFrom$1(this.v3.get$w()).subLocal$1(t3.get$w());
      return $.sub($.mul(t1.get$x(), t2.get$y()), $.mul(t1.get$y(), t2.get$x()));
    default:
      return 0.0;
  }
},
 solve2$0: function() {
  var t1 = this.v1;
  var w1 = t1.w;
  var t2 = this.v2;
  var w2 = t2.w;
  var t3 = this.e12;
  t3.setFrom$1(w2).subLocal$1(w1);
  var t4 = w1.get$x();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(1, w1, w2, t4, t1, t2, t3, 0);
  var t6 = t3.x;
  if (typeof t6 !== 'number')
    return this.solve2$0$bailout(2, w1, w2, t4, t1, t2, t3, t6);
  t6 = t4 * t6;
  t4 = w1.get$y();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(3, t3, w2, t1, t2, t6, t4, 0);
  var t9 = t3.y;
  if (typeof t9 !== 'number')
    return this.solve2$0$bailout(4, t9, t3, w2, t1, t2, t6, t4);
  var d12_2 = -(t6 + t4 * t9);
  if (d12_2 <= 0.0) {
    t1.a = 1.0;
    this.count = 1;
    return;
  }
  t4 = w2.get$x();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(5, t4, w2, d12_2, t1, t2, t3, 0);
  t6 = t3.x;
  if (typeof t6 !== 'number')
    return this.solve2$0$bailout(6, t4, w2, d12_2, t6, t1, t2, t3);
  t6 = t4 * t6;
  t4 = w2.get$y();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(7, d12_2, t6, t4, t1, t2, t3, 0);
  t3 = t3.y;
  if (typeof t3 !== 'number')
    return this.solve2$0$bailout(8, d12_2, t6, t4, t3, t1, t2, 0);
  var d12_1 = t6 + t4 * t3;
  if (d12_1 <= 0.0) {
    t2.a = 1.0;
    this.count = 1;
    t1.setFrom$1(t2);
    return;
  }
  var inv_d12 = 1.0 / (d12_1 + d12_2);
  t1.a = d12_1 * inv_d12;
  t2.a = d12_2 * inv_d12;
  this.count = 2;
},
 solve2$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      w1 = env0;
      w2 = env1;
      t4 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 2:
      w1 = env0;
      w2 = env1;
      t4 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t6 = env6;
      break;
    case 3:
      t3 = env0;
      w2 = env1;
      t1 = env2;
      t2 = env3;
      t6 = env4;
      t4 = env5;
      break;
    case 4:
      t9 = env0;
      t3 = env1;
      w2 = env2;
      t1 = env3;
      t2 = env4;
      t6 = env5;
      t4 = env6;
      break;
    case 5:
      t4 = env0;
      w2 = env1;
      d12_2 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 6:
      t4 = env0;
      w2 = env1;
      d12_2 = env2;
      t6 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      break;
    case 7:
      d12_2 = env0;
      t6 = env1;
      t4 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 8:
      d12_2 = env0;
      t6 = env1;
      t4 = env2;
      t3 = env3;
      t1 = env4;
      t2 = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.v1;
      var w1 = t1.get$w();
      var t2 = this.v2;
      var w2 = t2.get$w();
      var t3 = this.e12;
      t3.setFrom$1(w2).subLocal$1(w1);
      var t4 = w1.get$x();
    case 1:
      state = 0;
      var t6 = t3.get$x();
    case 2:
      state = 0;
      t6 = $.mul(t4, t6);
      t4 = w1.get$y();
    case 3:
      state = 0;
      var t9 = t3.get$y();
    case 4:
      state = 0;
      var d12_2 = $.neg($.add(t6, $.mul(t4, t9)));
      if ($.leB(d12_2, 0.0)) {
        t1.set$a(1.0);
        this.count = 1;
        return;
      }
      t4 = w2.get$x();
    case 5:
      state = 0;
      t6 = t3.get$x();
    case 6:
      state = 0;
      t6 = $.mul(t4, t6);
      t4 = w2.get$y();
    case 7:
      state = 0;
      t3 = t3.get$y();
    case 8:
      state = 0;
      var d12_1 = $.add(t6, $.mul(t4, t3));
      if ($.leB(d12_1, 0.0)) {
        t2.set$a(1.0);
        this.count = 1;
        t1.setFrom$1(t2);
        return;
      }
      t3 = $.add(d12_1, d12_2);
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      var inv_d12 = 1.0 / t3;
      t1.set$a($.mul(d12_1, inv_d12));
      t2.set$a($.mul(d12_2, inv_d12));
      this.count = 2;
  }
},
 solve3$0: function() {
  var t1 = this.v1;
  var w1 = t1.w;
  var t2 = this.v2;
  var w2 = t2.w;
  var t3 = this.v3;
  var w3 = t3.w;
  var t4 = this.e12;
  t4.setFrom$1(w2).subLocal$1(w1);
  var t5 = w1.get$x();
  if (typeof t5 !== 'number')
    return this.solve3$0$bailout(1, w1, t1, t2, t3, t4, w3, w2, t5, 0, 0, 0, 0, 0, 0, 0, 0);
  var t7 = t4.x;
  if (typeof t7 !== 'number')
    return this.solve3$0$bailout(2, w1, t1, t2, t3, t4, w3, w2, t5, t7, 0, 0, 0, 0, 0, 0, 0);
  t7 = t5 * t7;
  t5 = w1.get$y();
  if (typeof t5 !== 'number')
    return this.solve3$0$bailout(3, t7, t5, w1, t1, t2, t3, t4, w3, w2, 0, 0, 0, 0, 0, 0, 0);
  var t10 = t4.y;
  if (typeof t10 !== 'number')
    return this.solve3$0$bailout(4, t7, t5, t10, w1, t1, t2, t3, t4, w3, w2, 0, 0, 0, 0, 0, 0);
  var w1e12 = t7 + t5 * t10;
  t7 = w2.get$x();
  if (typeof t7 !== 'number')
    return this.solve3$0$bailout(5, w1, t1, t2, t3, t4, w1e12, w3, w2, t7, 0, 0, 0, 0, 0, 0, 0);
  var t13 = t4.x;
  if (typeof t13 !== 'number')
    return this.solve3$0$bailout(6, w1, t1, t2, t3, t4, w1e12, w3, w2, t13, t7, 0, 0, 0, 0, 0, 0);
  t13 = t7 * t13;
  t7 = w2.get$y();
  if (typeof t7 !== 'number')
    return this.solve3$0$bailout(7, w1, t1, t2, t3, t4, w1e12, w3, w2, t13, t7, 0, 0, 0, 0, 0, 0);
  var t16 = t4.y;
  if (typeof t16 !== 'number')
    return this.solve3$0$bailout(8, w1, t1, t2, t3, t4, w1e12, w3, w2, t13, t7, t16, 0, 0, 0, 0, 0);
  var w2e12 = t13 + t7 * t16;
  var d12_2 = -w1e12;
  t13 = this.e13;
  t13.setFrom$1(w3).subLocal$1(w1);
  var t18 = w1.get$x();
  if (typeof t18 !== 'number')
    return this.solve3$0$bailout(9, w2e12, d12_2, w1, t1, t2, t3, t4, t18, w3, w2, t13, 0, 0, 0, 0, 0);
  var t20 = t13.x;
  if (typeof t20 !== 'number')
    return this.solve3$0$bailout(10, w2e12, d12_2, w1, t1, t2, t3, t4, t18, w3, w2, t13, t20, 0, 0, 0, 0);
  t20 = t18 * t20;
  t18 = w1.get$y();
  if (typeof t18 !== 'number')
    return this.solve3$0$bailout(11, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, t18, t20, 0, 0, 0, 0);
  var t23 = t13.y;
  if (typeof t23 !== 'number')
    return this.solve3$0$bailout(12, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, t18, t20, t23, 0, 0, 0);
  var w1e13 = t20 + t18 * t23;
  t20 = w3.get$x();
  if (typeof t20 !== 'number')
    return this.solve3$0$bailout(13, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t20, 0, 0, 0, 0);
  var t26 = t13.x;
  if (typeof t26 !== 'number')
    return this.solve3$0$bailout(14, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t20, t26, 0, 0, 0);
  t26 = t20 * t26;
  t20 = w3.get$y();
  if (typeof t20 !== 'number')
    return this.solve3$0$bailout(15, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t26, t20, 0, 0, 0);
  var t29 = t13.y;
  if (typeof t29 !== 'number')
    return this.solve3$0$bailout(16, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t26, t20, t29, 0, 0);
  var w3e13 = t26 + t20 * t29;
  var d13_2 = -w1e13;
  t26 = this.e23;
  t26.setFrom$1(w3).subLocal$1(w2);
  var t31 = w2.get$x();
  if (typeof t31 !== 'number')
    return this.solve3$0$bailout(17, w2e12, d12_2, w1, t1, t2, t3, t4, t31, w3, w2, t13, t26, w3e13, d13_2, 0, 0);
  var t33 = t26.x;
  if (typeof t33 !== 'number')
    return this.solve3$0$bailout(18, w2e12, d12_2, w1, t1, t2, t3, t4, t31, w3, w2, t13, t26, t33, w3e13, d13_2, 0);
  t33 = t31 * t33;
  t31 = w2.get$y();
  if (typeof t31 !== 'number')
    return this.solve3$0$bailout(19, w2e12, d12_2, w1, t1, t2, t3, t4, t33, w3, w2, t13, t31, t26, w3e13, d13_2, 0);
  var t36 = t26.y;
  if (typeof t36 !== 'number')
    return this.solve3$0$bailout(20, w2e12, d12_2, w1, t1, t2, t3, t4, t33, w3, w2, t13, t31, t26, t36, w3e13, d13_2);
  var w2e23 = t33 + t31 * t36;
  t33 = w3.get$x();
  if (typeof t33 !== 'number')
    return this.solve3$0$bailout(21, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t26, t33, w3e13, d13_2, 0);
  var t39 = t26.x;
  if (typeof t39 !== 'number')
    return this.solve3$0$bailout(22, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t26, t33, t39, w3e13, d13_2);
  t39 = t33 * t39;
  t33 = w3.get$y();
  if (typeof t33 !== 'number')
    return this.solve3$0$bailout(23, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t26, t39, t33, w3e13, d13_2);
  t26 = t26.y;
  if (typeof t26 !== 'number')
    return this.solve3$0$bailout(24, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t39, t33, t26, w3e13, d13_2);
  var w3e23 = t39 + t33 * t26;
  var d23_2 = -w2e23;
  t39 = t4.x;
  if (typeof t39 !== 'number')
    return this.solve3$0$bailout(25, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w3e23, d23_2, w3e13, t39, d13_2, 0);
  var t44 = t13.y;
  if (typeof t44 !== 'number')
    return this.solve3$0$bailout(26, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w3e23, d23_2, w3e13, t44, d13_2, t39);
  t44 = t39 * t44;
  t4 = t4.y;
  if (typeof t4 !== 'number')
    return this.solve3$0$bailout(27, t4, w2e12, d12_2, w1, t1, t2, t3, w3, w2, t13, w3e23, d23_2, w3e13, d13_2, t44, 0);
  t13 = t13.x;
  if (typeof t13 !== 'number')
    return this.solve3$0$bailout(28, t4, w2e12, t13, d12_2, w1, t1, t2, t3, w3, w2, w3e23, d23_2, w3e13, d13_2, t44, 0);
  var n123 = t44 - t4 * t13;
  t44 = w2.get$x();
  if (typeof t44 !== 'number')
    return this.solve3$0$bailout(29, w2e12, d12_2, w1, t1, t2, t3, n123, t44, w3, w2, w3e23, d23_2, w3e13, d13_2, 0, 0);
  var t48 = w3.get$y();
  if (typeof t48 !== 'number')
    return this.solve3$0$bailout(30, w2e12, d12_2, w1, t1, t2, t3, n123, t44, w3, w2, t48, w3e23, d23_2, w3e13, d13_2, 0);
  t48 = t44 * t48;
  t44 = w2.get$y();
  if (typeof t44 !== 'number')
    return this.solve3$0$bailout(31, w2e12, d12_2, w1, t1, t2, t3, n123, t48, w3, w2, t44, w3e23, d23_2, w3e13, d13_2, 0);
  var t51 = w3.get$x();
  if (typeof t51 !== 'number')
    return this.solve3$0$bailout(32, w2e12, d12_2, w1, t1, t2, t3, n123, t48, w3, w2, t51, t44, w3e23, d23_2, w3e13, d13_2);
  var d123_1 = n123 * (t48 - t44 * t51);
  var t53 = w3.get$x();
  if (typeof t53 !== 'number')
    return this.solve3$0$bailout(33, w2e12, d12_2, w1, t1, t2, t3, n123, w3, w2, d123_1, t53, w3e23, d23_2, w3e13, d13_2, 0);
  var t55 = w1.get$y();
  if (typeof t55 !== 'number')
    return this.solve3$0$bailout(34, w2e12, d12_2, w1, t1, t2, t3, n123, w3, w2, d123_1, t53, t55, w3e23, d23_2, w3e13, d13_2);
  t55 = t53 * t55;
  t53 = w3.get$y();
  if (typeof t53 !== 'number')
    return this.solve3$0$bailout(35, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, t55, t53, w3e23, d23_2, w3e13, d13_2, 0);
  var t58 = w1.get$x();
  if (typeof t58 !== 'number')
    return this.solve3$0$bailout(36, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, t55, t53, w3e23, t58, d23_2, w3e13, d13_2);
  var d123_2 = n123 * (t55 - t53 * t58);
  var t60 = w1.get$x();
  if (typeof t60 !== 'number')
    return this.solve3$0$bailout(37, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, w3e23, d23_2, w3e13, d123_2, t60, d13_2, 0);
  var t62 = w2.get$y();
  if (typeof t62 !== 'number')
    return this.solve3$0$bailout(38, t62, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, w3e23, d23_2, w3e13, d123_2, t60, d13_2);
  t62 = t60 * t62;
  t60 = w1.get$y();
  if (typeof t60 !== 'number')
    return this.solve3$0$bailout(39, w2e12, t62, d12_2, t1, t2, t3, n123, w2, t60, d123_1, w3e23, d23_2, w3e13, d123_2, d13_2, 0);
  var t65 = w2.get$x();
  if (typeof t65 !== 'number')
    return this.solve3$0$bailout(40, w2e12, t62, d12_2, t65, t1, t2, t3, n123, t60, d123_1, w3e23, d23_2, w3e13, d123_2, d13_2, 0);
  var d123_3 = n123 * (t62 - t60 * t65);
  if (d12_2 <= 0.0 && d13_2 <= 0.0) {
    t1.a = 1.0;
    this.count = 1;
    return;
  }
  if (w2e12 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
    var inv_d12 = 1.0 / (w2e12 + d12_2);
    t1.a = w2e12 * inv_d12;
    t2.a = d12_2 * inv_d12;
    this.count = 2;
    return;
  }
  if (w3e13 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
    var inv_d13 = 1.0 / (w3e13 + d13_2);
    t1.a = w3e13 * inv_d13;
    t3.a = d13_2 * inv_d13;
    this.count = 2;
    t2.setFrom$1(t3);
    return;
  }
  if (w2e12 <= 0.0 && d23_2 <= 0.0) {
    t2.a = 1.0;
    this.count = 1;
    t1.setFrom$1(t2);
    return;
  }
  if (w3e13 <= 0.0 && w3e23 <= 0.0) {
    t3.a = 1.0;
    this.count = 1;
    t1.setFrom$1(t3);
    return;
  }
  if (w3e23 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
    var inv_d23 = 1.0 / (w3e23 + d23_2);
    t2.a = w3e23 * inv_d23;
    t3.a = d23_2 * inv_d23;
    this.count = 2;
    t1.setFrom$1(t3);
    return;
  }
  var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
  t1.a = d123_1 * inv_d123;
  t2.a = d123_2 * inv_d123;
  t3.a = d123_3 * inv_d123;
  this.count = 3;
},
 solve3$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15) {
  switch (state) {
    case 1:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w3 = env5;
      w2 = env6;
      t5 = env7;
      break;
    case 2:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w3 = env5;
      w2 = env6;
      t5 = env7;
      t7 = env8;
      break;
    case 3:
      t7 = env0;
      t5 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      break;
    case 4:
      t7 = env0;
      t5 = env1;
      t10 = env2;
      w1 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      t4 = env7;
      w3 = env8;
      w2 = env9;
      break;
    case 5:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t7 = env8;
      break;
    case 6:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t13 = env8;
      t7 = env9;
      break;
    case 7:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t13 = env8;
      t7 = env9;
      break;
    case 8:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t13 = env8;
      t7 = env9;
      t16 = env10;
      break;
    case 9:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t18 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      break;
    case 10:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t18 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t20 = env11;
      break;
    case 11:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      t18 = env10;
      t20 = env11;
      break;
    case 12:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      t18 = env10;
      t20 = env11;
      t23 = env12;
      break;
    case 13:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t20 = env11;
      break;
    case 14:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t20 = env11;
      t26 = env12;
      break;
    case 15:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t26 = env11;
      t20 = env12;
      break;
    case 16:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t26 = env11;
      t20 = env12;
      t29 = env13;
      break;
    case 17:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t31 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t26 = env11;
      w3e13 = env12;
      d13_2 = env13;
      break;
    case 18:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t31 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t26 = env11;
      t33 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 19:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t33 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t31 = env11;
      t26 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 20:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t33 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t31 = env11;
      t26 = env12;
      t36 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 21:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t26 = env11;
      t33 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 22:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t26 = env11;
      t33 = env12;
      t39 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 23:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t26 = env11;
      t39 = env12;
      t33 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 24:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t39 = env11;
      t33 = env12;
      t26 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 25:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      t39 = env13;
      d13_2 = env14;
      break;
    case 26:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      t44 = env13;
      d13_2 = env14;
      t39 = env15;
      break;
    case 27:
      t4 = env0;
      w2e12 = env1;
      d12_2 = env2;
      w1 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d13_2 = env13;
      t44 = env14;
      break;
    case 28:
      t4 = env0;
      w2e12 = env1;
      t13 = env2;
      d12_2 = env3;
      w1 = env4;
      t1 = env5;
      t2 = env6;
      t3 = env7;
      w3 = env8;
      w2 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d13_2 = env13;
      t44 = env14;
      break;
    case 29:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t44 = env7;
      w3 = env8;
      w2 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d13_2 = env13;
      break;
    case 30:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t44 = env7;
      w3 = env8;
      w2 = env9;
      t48 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 31:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t48 = env7;
      w3 = env8;
      w2 = env9;
      t44 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 32:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t48 = env7;
      w3 = env8;
      w2 = env9;
      t51 = env10;
      t44 = env11;
      w3e23 = env12;
      d23_2 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 33:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w3 = env7;
      w2 = env8;
      d123_1 = env9;
      t53 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 34:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w3 = env7;
      w2 = env8;
      d123_1 = env9;
      t53 = env10;
      t55 = env11;
      w3e23 = env12;
      d23_2 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 35:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      d123_1 = env8;
      t55 = env9;
      t53 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 36:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      d123_1 = env8;
      t55 = env9;
      t53 = env10;
      w3e23 = env11;
      t58 = env12;
      d23_2 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 37:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      d123_1 = env8;
      w3e23 = env9;
      d23_2 = env10;
      w3e13 = env11;
      d123_2 = env12;
      t60 = env13;
      d13_2 = env14;
      break;
    case 38:
      t62 = env0;
      w2e12 = env1;
      d12_2 = env2;
      w1 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      n123 = env7;
      w2 = env8;
      d123_1 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d123_2 = env13;
      t60 = env14;
      d13_2 = env15;
      break;
    case 39:
      w2e12 = env0;
      t62 = env1;
      d12_2 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      t60 = env8;
      d123_1 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d123_2 = env13;
      d13_2 = env14;
      break;
    case 40:
      w2e12 = env0;
      t62 = env1;
      d12_2 = env2;
      t65 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      n123 = env7;
      t60 = env8;
      d123_1 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d123_2 = env13;
      d13_2 = env14;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.v1;
      var w1 = t1.get$w();
      var t2 = this.v2;
      var w2 = t2.get$w();
      var t3 = this.v3;
      var w3 = t3.get$w();
      var t4 = this.e12;
      t4.setFrom$1(w2).subLocal$1(w1);
      var t5 = w1.get$x();
    case 1:
      state = 0;
      var t7 = t4.get$x();
    case 2:
      state = 0;
      t7 = $.mul(t5, t7);
      t5 = w1.get$y();
    case 3:
      state = 0;
      var t10 = t4.get$y();
    case 4:
      state = 0;
      var w1e12 = $.add(t7, $.mul(t5, t10));
      t7 = w2.get$x();
    case 5:
      state = 0;
      var t13 = t4.get$x();
    case 6:
      state = 0;
      t13 = $.mul(t7, t13);
      t7 = w2.get$y();
    case 7:
      state = 0;
      var t16 = t4.get$y();
    case 8:
      state = 0;
      var w2e12 = $.add(t13, $.mul(t7, t16));
      var d12_2 = $.neg(w1e12);
      t13 = this.e13;
      t13.setFrom$1(w3).subLocal$1(w1);
      var t18 = w1.get$x();
    case 9:
      state = 0;
      var t20 = t13.get$x();
    case 10:
      state = 0;
      t20 = $.mul(t18, t20);
      t18 = w1.get$y();
    case 11:
      state = 0;
      var t23 = t13.get$y();
    case 12:
      state = 0;
      var w1e13 = $.add(t20, $.mul(t18, t23));
      t20 = w3.get$x();
    case 13:
      state = 0;
      var t26 = t13.get$x();
    case 14:
      state = 0;
      t26 = $.mul(t20, t26);
      t20 = w3.get$y();
    case 15:
      state = 0;
      var t29 = t13.get$y();
    case 16:
      state = 0;
      var w3e13 = $.add(t26, $.mul(t20, t29));
      var d13_2 = $.neg(w1e13);
      t26 = this.e23;
      t26.setFrom$1(w3).subLocal$1(w2);
      var t31 = w2.get$x();
    case 17:
      state = 0;
      var t33 = t26.get$x();
    case 18:
      state = 0;
      t33 = $.mul(t31, t33);
      t31 = w2.get$y();
    case 19:
      state = 0;
      var t36 = t26.get$y();
    case 20:
      state = 0;
      var w2e23 = $.add(t33, $.mul(t31, t36));
      t33 = w3.get$x();
    case 21:
      state = 0;
      var t39 = t26.get$x();
    case 22:
      state = 0;
      t39 = $.mul(t33, t39);
      t33 = w3.get$y();
    case 23:
      state = 0;
      t26 = t26.get$y();
    case 24:
      state = 0;
      var w3e23 = $.add(t39, $.mul(t33, t26));
      var d23_2 = $.neg(w2e23);
      t39 = t4.get$x();
    case 25:
      state = 0;
      var t44 = t13.get$y();
    case 26:
      state = 0;
      t44 = $.mul(t39, t44);
      t4 = t4.get$y();
    case 27:
      state = 0;
      t13 = t13.get$x();
    case 28:
      state = 0;
      var n123 = $.sub(t44, $.mul(t4, t13));
      t44 = w2.get$x();
    case 29:
      state = 0;
      var t48 = w3.get$y();
    case 30:
      state = 0;
      t48 = $.mul(t44, t48);
      t44 = w2.get$y();
    case 31:
      state = 0;
      var t51 = w3.get$x();
    case 32:
      state = 0;
      var d123_1 = $.mul(n123, $.sub(t48, $.mul(t44, t51)));
      var t53 = w3.get$x();
    case 33:
      state = 0;
      var t55 = w1.get$y();
    case 34:
      state = 0;
      t55 = $.mul(t53, t55);
      t53 = w3.get$y();
    case 35:
      state = 0;
      var t58 = w1.get$x();
    case 36:
      state = 0;
      var d123_2 = $.mul(n123, $.sub(t55, $.mul(t53, t58)));
      var t60 = w1.get$x();
    case 37:
      state = 0;
      var t62 = w2.get$y();
    case 38:
      state = 0;
      t62 = $.mul(t60, t62);
      t60 = w1.get$y();
    case 39:
      state = 0;
      var t65 = w2.get$x();
    case 40:
      state = 0;
      var d123_3 = $.mul(n123, $.sub(t62, $.mul(t60, t65)));
      if ($.leB(d12_2, 0.0) && $.leB(d13_2, 0.0)) {
        t1.set$a(1.0);
        this.count = 1;
        return;
      }
      if ($.gtB(w2e12, 0.0) && $.gtB(d12_2, 0.0) && $.leB(d123_3, 0.0)) {
        t3 = $.add(w2e12, d12_2);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var inv_d12 = 1.0 / t3;
        t1.set$a($.mul(w2e12, inv_d12));
        t2.set$a($.mul(d12_2, inv_d12));
        this.count = 2;
        return;
      }
      if ($.gtB(w3e13, 0.0) && $.gtB(d13_2, 0.0) && $.leB(d123_2, 0.0)) {
        t4 = $.add(w3e13, d13_2);
        if (typeof t4 !== 'number')
          throw $.iae(t4);
        var inv_d13 = 1.0 / t4;
        t1.set$a($.mul(w3e13, inv_d13));
        t3.set$a($.mul(d13_2, inv_d13));
        this.count = 2;
        t2.setFrom$1(t3);
        return;
      }
      if ($.leB(w2e12, 0.0) && $.leB(d23_2, 0.0)) {
        t2.set$a(1.0);
        this.count = 1;
        t1.setFrom$1(t2);
        return;
      }
      if ($.leB(w3e13, 0.0) && $.leB(w3e23, 0.0)) {
        t3.set$a(1.0);
        this.count = 1;
        t1.setFrom$1(t3);
        return;
      }
      if ($.gtB(w3e23, 0.0) && $.gtB(d23_2, 0.0) && $.leB(d123_1, 0.0)) {
        t4 = $.add(w3e23, d23_2);
        if (typeof t4 !== 'number')
          throw $.iae(t4);
        var inv_d23 = 1.0 / t4;
        t2.set$a($.mul(w3e23, inv_d23));
        t3.set$a($.mul(d23_2, inv_d23));
        this.count = 2;
        t1.setFrom$1(t3);
        return;
      }
      t4 = $.add($.add(d123_1, d123_2), d123_3);
      if (typeof t4 !== 'number')
        throw $.iae(t4);
      var inv_d123 = 1.0 / t4;
      t1.set$a($.mul(d123_1, inv_d123));
      t2.set$a($.mul(d123_2, inv_d123));
      t3.set$a($.mul(d123_3, inv_d123));
      this.count = 3;
  }
},
 Simplex$0: function() {
  var t1 = this.vertices;
  var t2 = this.v1;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0] = t2;
  t2 = this.v2;
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1] = t2;
  t2 = this.v3;
  if (2 < 0 || 2 >= t1.length)
    throw $.ioore(2);
  t1[2] = t2;
}
};

$$.SimplexCache = {"":
 ["metric=", "count=", "indexA?", "indexB?"],
 "super": "Object",
 setFrom$1: function(sc) {
  var t1 = this.indexA;
  $.setRange$3(t1, 0, $.get$length(t1), sc.get$indexA());
  t1 = this.indexB;
  $.setRange$3(t1, 0, $.get$length(t1), sc.get$indexB());
  this.metric = sc.get$metric();
  this.count = sc.get$count();
},
 SimplexCache$0: function() {
  var t1 = this.indexA;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior)
    return this.SimplexCache$0$bailout(1, t1, 0);
  var t3 = this.indexB;
  if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior)
    return this.SimplexCache$0$bailout(2, t1, t3);
  var i = 0;
  for (; i < 3; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = 2147483647;
    if (i < 0 || i >= t3.length)
      throw $.ioore(i);
    t3[i] = 2147483647;
  }
},
 SimplexCache$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.indexA;
    case 1:
      state = 0;
      var t3 = this.indexB;
    case 2:
      state = 0;
      var i = 0;
      for (; i < 3; ++i) {
        $.indexSet(t1, i, 2147483647);
        $.indexSet(t3, i, 2147483647);
      }
  }
}
};

$$.SimplexVertex = {"":
 ["wA?", "wB?", "w?", "a=", "indexA=", "indexB="],
 "super": "Object",
 setFrom$1: function(sv) {
  this.wA.setFrom$1(sv.get$wA());
  this.wB.setFrom$1(sv.get$wB());
  this.w.setFrom$1(sv.get$w());
  this.a = sv.get$a();
  this.indexA = sv.get$indexA();
  this.indexB = sv.get$indexB();
},
 toString$0: function() {
  return 'wA: ' + $.S(this.wA) + ', wB: ' + $.S(this.wB) + ', w: ' + $.S(this.w);
}
};

$$.TimeOfImpact = {"":
 ["cache", "distanceInput", "xfA", "xfB", "distanceOutput", "fcn", "indexes", "sweepA?", "sweepB?", "pool"],
 "super": "Object",
 timeOfImpact$2: function(output, input) {
  var t1 = $.TimeOfImpact_toiCalls;
  if (typeof t1 !== 'number')
    return this.timeOfImpact$2$bailout(1, output, input, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.TimeOfImpact_toiCalls = t1 + 1;
  output.set$state(0);
  output.set$t(input.get$tMax());
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  var t3 = this.sweepA;
  t3.setFrom$1(input.get$sweepA());
  var t4 = this.sweepB;
  t4.setFrom$1(input.get$sweepB());
  t3.normalize$0();
  t4.normalize$0();
  var tMax = input.get$tMax();
  if (tMax !== (tMax | 0))
    return this.timeOfImpact$2$bailout(2, output, input, tMax, t3, t4, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t6 = proxyA.get$radius();
  if (typeof t6 !== 'number')
    return this.timeOfImpact$2$bailout(3, output, input, tMax, t6, t3, t4, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t8 = proxyB.get$radius();
  if (typeof t8 !== 'number')
    return this.timeOfImpact$2$bailout(4, output, input, tMax, t6, t8, t3, t4, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var target = $.max(0.005, t6 + t8 - 0.015);
  var t10 = this.cache;
  t10.count = 0;
  var t11 = input.get$proxyA();
  var t12 = this.distanceInput;
  t12.proxyA = t11;
  t12.proxyB = input.get$proxyB();
  t12.useRadii = false;
  for (var t1 = this.xfA, t2 = this.xfB, t5 = this.pool, t6 = this.distanceOutput, t7 = target + 0.00125, t8 = this.fcn, t9 = this.indexes, t11 = target - 0.00125, iter = 0, t13 = 0; true;) {
    t3.getTransform$2(t1, t13);
    t4.getTransform$2(t2, t13);
    t12.transformA = t1;
    t12.transformB = t2;
    t5.get$distance().distance$3(t6, t10, t12);
    var t14 = t6.distance;
    if (typeof t14 !== 'number')
      return this.timeOfImpact$2$bailout(5, output, t10, t4, t12, target, t1, t7, t2, proxyA, proxyB, t6, t5, t8, iter, tMax, t14, t9, t13, t11, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t14 <= 0) {
      output.set$state(2);
      output.set$t(0);
      break;
    }
    if (t14 < t7) {
      output.set$state(3);
      output.set$t(t13);
      break;
    }
    t8.initialize$6(t10, proxyA, t3, proxyB, t4, t13);
    for (var t20 = tMax, pushBackIter = 0; done = false, true;) {
      var s2 = t8.findMinSeparation$2(t9, t20);
      if (typeof s2 !== 'number')
        return this.timeOfImpact$2$bailout(7, output, t10, t12, target, pushBackIter, t1, t7, t2, t3, proxyA, s2, proxyB, t6, t5, t8, iter, tMax, t9, t13, t11, t4, t20, 0, 0, 0, 0, 0, 0, 0);
      if (s2 > t7) {
        output.set$state(4);
        output.set$t(tMax);
        var done = true;
        break;
      }
      if (s2 > t11) {
        t13 = t20;
        done = false;
        break;
      }
      t14 = t9.length;
      if (0 >= t14)
        throw $.ioore(0);
      var t15 = t9[0];
      if (1 >= t14)
        throw $.ioore(1);
      var s1 = t8.evaluate$3(t15, t9[1], t13);
      if (typeof s1 !== 'number')
        return this.timeOfImpact$2$bailout(8, output, t10, t12, target, pushBackIter, t1, t7, t2, s1, proxyA, s2, proxyB, t6, t5, t3, t8, iter, tMax, t9, t13, t11, t4, t20, 0, 0, 0, 0, 0, 0);
      if (s1 < t11) {
        output.set$state(1);
        output.set$t(t13);
        done = true;
        break;
      }
      if (s1 <= t7) {
        output.set$state(3);
        output.set$t(t13);
        done = true;
        break;
      }
      for (var a1 = t13, a2 = t20, rootIterCount = 0; true;) {
        var t = (rootIterCount & 1) === 1 ? a1 + (target - s1) * (a2 - a1) / (s2 - s1) : 0.5 * (a1 + a2);
        t14 = t9.length;
        if (0 >= t14)
          throw $.ioore(0);
        t15 = t9[0];
        if (1 >= t14)
          throw $.ioore(1);
        var s = t8.evaluate$3(t15, t9[1], t);
        if (typeof s !== 'number')
          return this.timeOfImpact$2$bailout(9, output, pushBackIter, rootIterCount, s2, a2, proxyA, a1, proxyB, s1, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t, t8, iter, t9, t13, s, t20, 0);
        t14 = $.abs(s - target);
        if (typeof t14 !== 'number')
          return this.timeOfImpact$2$bailout(10, output, t14, pushBackIter, rootIterCount, s2, a2, proxyA, a1, proxyB, s1, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t, t8, iter, t9, t13, s, t20);
        if (t14 < 0.00125) {
          t20 = t;
          break;
        }
        if (s > target) {
          s1 = s;
          a1 = t;
        } else {
          a2 = t;
          s2 = s;
        }
        if (a1 !== (a1 | 0))
          return this.timeOfImpact$2$bailout(11, output, pushBackIter, rootIterCount, proxyA, proxyB, s2, a2, a1, s1, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t8, iter, t9, t13, t20, 0, 0, 0);
        ++rootIterCount;
        t15 = $.TimeOfImpact_toiRootIters;
        if (typeof t15 !== 'number')
          return this.timeOfImpact$2$bailout(12, output, pushBackIter, proxyA, proxyB, s2, a2, a1, s1, rootIterCount, t15, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t8, iter, t9, t13, t20, 0, 0);
        $.TimeOfImpact_toiRootIters = t15 + 1;
        if (rootIterCount === 50)
          break;
      }
      if (t20 !== (t20 | 0))
        return this.timeOfImpact$2$bailout(13, output, t10, t12, pushBackIter, target, t1, t7, t2, proxyA, proxyB, rootIterCount, t6, t5, t20, t8, iter, tMax, t9, t13, t11, t4, t3, 0, 0, 0, 0, 0, 0, 0);
      $.TimeOfImpact_toiMaxRootIters = $.max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
      ++pushBackIter;
      if (pushBackIter === 8) {
        done = false;
        break;
      }
    }
    ++iter;
    t14 = $.TimeOfImpact_toiIters;
    if (typeof t14 !== 'number')
      return this.timeOfImpact$2$bailout(14, output, t13, t10, t12, target, t1, t7, iter, t14, t2, proxyA, proxyB, t5, t6, t4, t8, tMax, t9, t3, done, t11, 0, 0, 0, 0, 0, 0, 0, 0);
    $.TimeOfImpact_toiIters = t14 + 1;
    if (done)
      break;
    if (iter === 1000) {
      output.set$state(1);
      output.set$t(t13);
      break;
    }
  }
  $.TimeOfImpact_toiMaxIters = $.max($.TimeOfImpact_toiMaxIters, iter);
},
 timeOfImpact$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26, env27, env28) {
  switch (state) {
    case 1:
      var output = env0;
      var input = env1;
      t1 = env2;
      break;
    case 2:
      output = env0;
      input = env1;
      tMax = env2;
      t3 = env3;
      t4 = env4;
      proxyA = env5;
      proxyB = env6;
      break;
    case 3:
      output = env0;
      input = env1;
      tMax = env2;
      t6 = env3;
      t3 = env4;
      t4 = env5;
      proxyA = env6;
      proxyB = env7;
      break;
    case 4:
      output = env0;
      input = env1;
      tMax = env2;
      t6 = env3;
      t8 = env4;
      t3 = env5;
      t4 = env6;
      proxyA = env7;
      proxyB = env8;
      break;
    case 5:
      output = env0;
      t10 = env1;
      t4 = env2;
      t12 = env3;
      target = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      proxyA = env8;
      proxyB = env9;
      t6 = env10;
      t5 = env11;
      t8 = env12;
      iter = env13;
      tMax = env14;
      t14 = env15;
      t9 = env16;
      t13 = env17;
      t11 = env18;
      t3 = env19;
      break;
    case 6:
      output = env0;
      t10 = env1;
      t12 = env2;
      target = env3;
      t14 = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      proxyA = env8;
      proxyB = env9;
      t5 = env10;
      t6 = env11;
      t8 = env12;
      iter = env13;
      tMax = env14;
      t9 = env15;
      t13 = env16;
      t11 = env17;
      t4 = env18;
      t3 = env19;
      break;
    case 7:
      output = env0;
      t10 = env1;
      t12 = env2;
      target = env3;
      pushBackIter = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      t3 = env8;
      proxyA = env9;
      s2 = env10;
      proxyB = env11;
      t6 = env12;
      t5 = env13;
      t8 = env14;
      iter = env15;
      tMax = env16;
      t9 = env17;
      t13 = env18;
      t11 = env19;
      t4 = env20;
      t20 = env21;
      break;
    case 8:
      output = env0;
      t10 = env1;
      t12 = env2;
      target = env3;
      pushBackIter = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      s1 = env8;
      proxyA = env9;
      s2 = env10;
      proxyB = env11;
      t6 = env12;
      t5 = env13;
      t3 = env14;
      t8 = env15;
      iter = env16;
      tMax = env17;
      t9 = env18;
      t13 = env19;
      t11 = env20;
      t4 = env21;
      t20 = env22;
      break;
    case 9:
      output = env0;
      pushBackIter = env1;
      rootIterCount = env2;
      s2 = env3;
      a2 = env4;
      proxyA = env5;
      a1 = env6;
      proxyB = env7;
      s1 = env8;
      tMax = env9;
      t3 = env10;
      t11 = env11;
      t4 = env12;
      t10 = env13;
      t12 = env14;
      target = env15;
      t1 = env16;
      t7 = env17;
      t2 = env18;
      t5 = env19;
      t6 = env20;
      t = env21;
      t8 = env22;
      iter = env23;
      t9 = env24;
      t13 = env25;
      s = env26;
      t20 = env27;
      break;
    case 10:
      output = env0;
      t14 = env1;
      pushBackIter = env2;
      rootIterCount = env3;
      s2 = env4;
      a2 = env5;
      proxyA = env6;
      a1 = env7;
      proxyB = env8;
      s1 = env9;
      tMax = env10;
      t3 = env11;
      t11 = env12;
      t4 = env13;
      t10 = env14;
      t12 = env15;
      target = env16;
      t1 = env17;
      t7 = env18;
      t2 = env19;
      t5 = env20;
      t6 = env21;
      t = env22;
      t8 = env23;
      iter = env24;
      t9 = env25;
      t13 = env26;
      s = env27;
      t20 = env28;
      break;
    case 11:
      output = env0;
      pushBackIter = env1;
      rootIterCount = env2;
      proxyA = env3;
      proxyB = env4;
      s2 = env5;
      a2 = env6;
      a1 = env7;
      s1 = env8;
      tMax = env9;
      t3 = env10;
      t11 = env11;
      t4 = env12;
      t10 = env13;
      t12 = env14;
      target = env15;
      t1 = env16;
      t7 = env17;
      t2 = env18;
      t5 = env19;
      t6 = env20;
      t8 = env21;
      iter = env22;
      t9 = env23;
      t13 = env24;
      t20 = env25;
      break;
    case 12:
      output = env0;
      pushBackIter = env1;
      proxyA = env2;
      proxyB = env3;
      s2 = env4;
      a2 = env5;
      a1 = env6;
      s1 = env7;
      rootIterCount = env8;
      t15 = env9;
      tMax = env10;
      t3 = env11;
      t11 = env12;
      t4 = env13;
      t10 = env14;
      t12 = env15;
      target = env16;
      t1 = env17;
      t7 = env18;
      t2 = env19;
      t5 = env20;
      t6 = env21;
      t8 = env22;
      iter = env23;
      t9 = env24;
      t13 = env25;
      t20 = env26;
      break;
    case 13:
      output = env0;
      t10 = env1;
      t12 = env2;
      pushBackIter = env3;
      target = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      proxyA = env8;
      proxyB = env9;
      rootIterCount = env10;
      t6 = env11;
      t5 = env12;
      t20 = env13;
      t8 = env14;
      iter = env15;
      tMax = env16;
      t9 = env17;
      t13 = env18;
      t11 = env19;
      t4 = env20;
      t3 = env21;
      break;
    case 14:
      output = env0;
      t13 = env1;
      t10 = env2;
      t12 = env3;
      target = env4;
      t1 = env5;
      t7 = env6;
      iter = env7;
      t14 = env8;
      t2 = env9;
      proxyA = env10;
      proxyB = env11;
      t5 = env12;
      t6 = env13;
      t4 = env14;
      t8 = env15;
      tMax = env16;
      t9 = env17;
      t3 = env18;
      done = env19;
      t11 = env20;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.TimeOfImpact_toiCalls;
    case 1:
      state = 0;
      $.TimeOfImpact_toiCalls = $.add(t1, 1);
      output.set$state(0);
      output.set$t(input.get$tMax());
      var proxyA = input.get$proxyA();
      var proxyB = input.get$proxyB();
      var t3 = this.sweepA;
      t3.setFrom$1(input.get$sweepA());
      var t4 = this.sweepB;
      t4.setFrom$1(input.get$sweepB());
      t3.normalize$0();
      t4.normalize$0();
      var tMax = input.get$tMax();
    case 2:
      state = 0;
      var t6 = proxyA.get$radius();
    case 3:
      state = 0;
      var t8 = proxyB.get$radius();
    case 4:
      state = 0;
      var target = $.max(0.005, $.sub($.add(t6, t8), 0.015));
      var t10 = this.cache;
      t10.set$count(0);
      var t11 = input.get$proxyA();
      var t12 = this.distanceInput;
      t12.set$proxyA(t11);
      t12.set$proxyB(input.get$proxyB());
      t12.set$useRadii(false);
      t1 = this.xfA;
      var t2 = this.xfB;
      var t5 = this.pool;
      t6 = this.distanceOutput;
      var t7 = target + 0.00125;
      t8 = this.fcn;
      var t9 = this.indexes;
      t11 = target - 0.00125;
      var iter = 0;
      var t13 = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t3.getTransform$2(t1, t13);
              t4.getTransform$2(t2, t13);
              t12.set$transformA(t1);
              t12.set$transformB(t2);
              t5.get$distance().distance$3(t6, t10, t12);
              var t14 = t6.get$distance();
            case 5:
              state = 0;
              if ($.leB(t14, 0)) {
                output.set$state(2);
                output.set$t(0);
                break L0;
              }
              t14 = t6.get$distance();
            case 6:
              state = 0;
              if ($.ltB(t14, t7)) {
                output.set$state(3);
                output.set$t(t13);
                break L0;
              }
              t8.initialize$6(t10, proxyA, t3, proxyB, t4, t13);
              var t20 = tMax;
              var pushBackIter = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      var done = false;
                      if (!true)
                        break L1;
                      var s2 = t8.findMinSeparation$2(t9, t20);
                    case 7:
                      state = 0;
                      if ($.gtB(s2, t7)) {
                        output.set$state(4);
                        output.set$t(tMax);
                        done = true;
                        break L1;
                      }
                      if ($.gtB(s2, t11)) {
                        t13 = t20;
                        done = false;
                        break L1;
                      }
                      if (0 < 0 || 0 >= t9.length)
                        throw $.ioore(0);
                      t14 = t9[0];
                      if (1 < 0 || 1 >= t9.length)
                        throw $.ioore(1);
                      var s1 = t8.evaluate$3(t14, t9[1], t13);
                    case 8:
                      state = 0;
                      if ($.ltB(s1, t11)) {
                        output.set$state(1);
                        output.set$t(t13);
                        done = true;
                        break L1;
                      }
                      if ($.leB(s1, t7)) {
                        output.set$state(3);
                        output.set$t(t13);
                        done = true;
                        break L1;
                      }
                      var a1 = t13;
                      var a2 = t20;
                      var rootIterCount = 0;
                    default:
                      L2:
                        while (true)
                          switch (state) {
                            case 0:
                              if (!true)
                                break L2;
                              if ((rootIterCount & 1) === 1) {
                                if (typeof s1 !== 'number')
                                  throw $.iae(s1);
                                t14 = target - s1;
                                var t15 = $.sub(a2, a1);
                                if (typeof t15 !== 'number')
                                  throw $.iae(t15);
                                t15 = t14 * t15;
                                t14 = $.sub(s2, s1);
                                if (typeof t14 !== 'number')
                                  throw $.iae(t14);
                                var t = $.add(a1, t15 / t14);
                              } else {
                                t14 = $.add(a1, a2);
                                if (typeof t14 !== 'number')
                                  throw $.iae(t14);
                                t = 0.5 * t14;
                              }
                              if (0 < 0 || 0 >= t9.length)
                                throw $.ioore(0);
                              t14 = t9[0];
                              if (1 < 0 || 1 >= t9.length)
                                throw $.ioore(1);
                              var s = t8.evaluate$3(t14, t9[1], t);
                            case 9:
                              state = 0;
                              t14 = $.abs($.sub(s, target));
                            case 10:
                              state = 0;
                              if ($.ltB(t14, 0.00125)) {
                                t20 = t;
                                break L2;
                              }
                              if ($.gtB(s, target)) {
                                s1 = s;
                                a1 = t;
                              } else {
                                a2 = t;
                                s2 = s;
                              }
                            case 11:
                              state = 0;
                              ++rootIterCount;
                              t15 = $.TimeOfImpact_toiRootIters;
                            case 12:
                              state = 0;
                              $.TimeOfImpact_toiRootIters = $.add(t15, 1);
                              if (rootIterCount === 50)
                                break L2;
                          }
                    case 13:
                      state = 0;
                      $.TimeOfImpact_toiMaxRootIters = $.max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
                      ++pushBackIter;
                      if (pushBackIter === 8) {
                        done = false;
                        break L1;
                      }
                  }
              ++iter;
              t14 = $.TimeOfImpact_toiIters;
            case 14:
              state = 0;
              $.TimeOfImpact_toiIters = $.add(t14, 1);
              if (done)
                break L0;
              if (iter === 1000) {
                output.set$state(1);
                output.set$t(t13);
                break L0;
              }
          }
      $.TimeOfImpact_toiMaxIters = $.max($.TimeOfImpact_toiMaxIters, iter);
  }
},
 get$timeOfImpact: function() { return new $.BoundClosure2(this, 'timeOfImpact$2'); },
 TimeOfImpact$_construct$1: function(argPool) {
  var t1 = this.indexes;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0] = 0;
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1] = 0;
  $.TimeOfImpact_toiCalls = 0;
  $.TimeOfImpact_toiIters = 0;
  $.TimeOfImpact_toiMaxIters = 0;
  $.TimeOfImpact_toiRootIters = 0;
  $.TimeOfImpact_toiMaxRootIters = 0;
}
};

$$.SeparationFunction = {"":
 ["proxyA=", "proxyB=", "type=", "localPoint?", "axis", "sweepA?", "sweepB?", "localPointA", "localPointB", "pointA?", "pointB?", "localPointA1", "localPointA2", "normal?", "localPointB1", "localPointB2", "axisA", "axisB", "temp", "xfa", "xfb"],
 "super": "Object",
 initialize$6: function(cache, argProxyA, argSweepA, argProxyB, argSweepB, t1) {
  this.proxyA = argProxyA;
  this.proxyB = argProxyB;
  var count = cache.get$count();
  this.sweepA = argSweepA;
  this.sweepB = argSweepB;
  var t2 = this.sweepA;
  var t3 = this.xfa;
  t2.getTransform$2(t3, t1);
  t2 = this.sweepB;
  var t4 = this.xfb;
  t2.getTransform$2(t4, t1);
  if ($.eqB(count, 1)) {
    this.type = 0;
    t1 = this.localPointA;
    t1.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
    t2 = this.localPointB;
    t2.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
    var t5 = this.pointA;
    $.Transform_mulToOut(t3, t1, t5);
    t1 = this.pointB;
    $.Transform_mulToOut(t4, t2, t1);
    t2 = this.axis;
    t2.setFrom$1(t1).subLocal$1(t5);
    return t2.normalize$0();
  } else {
    t1 = $.eqB($.index(cache.get$indexA(), 0), $.index(cache.get$indexA(), 1));
    t2 = this.pointA;
    t5 = this.localPoint;
    var t6 = this.normal;
    var t7 = this.axis;
    var t8 = this.pointB;
    var t9 = this.temp;
    if (t1) {
      this.type = 2;
      t1 = this.localPointB1;
      t1.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
      var t10 = this.localPointB2;
      t10.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 1)));
      t9.setFrom$1(t10).subLocal$1(t1);
      $.Vector_crossVectorAndNumToOut(t9, 1, t7);
      t7.normalize$0();
      $.Matrix22_mulMatrixAndVectorToOut(t4.get$rotation(), t7, t6);
      t5.setFrom$1(t1);
      t5.addLocal$1(t10);
      t5.mulLocal$1(0.5);
      $.Transform_mulToOut(t4, t5, t8);
      t5 = this.localPointA;
      t5.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
      $.Transform_mulToOut(t3, t5, t2);
      t9.setFrom$1(t2);
      t9.subLocal$1(t8);
      var s = $.add($.mul(t9.get$x(), t6.get$x()), $.mul(t9.get$y(), t6.get$y()));
      if ($.ltB(s, 0.0)) {
        t7.negateLocal$0();
        s = $.neg(s);
      }
      return s;
    } else {
      this.type = 1;
      t1 = this.localPointA1;
      t1.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
      t10 = this.localPointA2;
      t10.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 1)));
      t9.setFrom$1(t10);
      t9.subLocal$1(t1);
      $.Vector_crossVectorAndNumToOut(t9, 1.0, t7);
      t7.normalize$0();
      $.Matrix22_mulMatrixAndVectorToOut(t3.get$rotation(), t7, t6);
      t5.setFrom$1(t1);
      t5.addLocal$1(t10);
      t5.mulLocal$1(0.5);
      $.Transform_mulToOut(t3, t5, t2);
      t5 = this.localPointB;
      t5.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
      $.Transform_mulToOut(t4, t5, t8);
      t9.setFrom$1(t8);
      t9.subLocal$1(t2);
      s = $.add($.mul(t9.get$x(), t6.get$x()), $.mul(t9.get$y(), t6.get$y()));
      if ($.ltB(s, 0.0)) {
        t7.negateLocal$0();
        s = $.neg(s);
      }
      return s;
    }
  }
},
 findMinSeparation$2: function(indexes, t) {
  var t1 = this.sweepA;
  var t2 = this.xfa;
  t1.getTransform$2(t2, t);
  t1 = this.sweepB;
  var t3 = this.xfb;
  t1.getTransform$2(t3, t);
  switch (this.type) {
    case 0:
      t1 = t2.get$rotation();
      var t4 = this.axis;
      var t5 = this.axisA;
      $.Matrix22_mulTransMatrixAndVectorToOut(t1, t4, t5);
      t1 = t3.get$rotation();
      var t6 = t4.negateLocal$0();
      var t7 = this.axisB;
      $.Matrix22_mulTransMatrixAndVectorToOut(t1, t6, t7);
      t4.negateLocal$0();
      $.indexSet(indexes, 0, this.proxyA.getSupport$1(t5));
      $.indexSet(indexes, 1, this.proxyB.getSupport$1(t7));
      t6 = this.localPointA;
      t6.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
      t1 = this.localPointB;
      t1.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
      var t8 = this.pointA;
      $.Transform_mulToOut(t2, t6, t8);
      t6 = this.pointB;
      $.Transform_mulToOut(t3, t1, t6);
      t8 = t6.subLocal$1(t8);
      return $.add($.mul(t8.get$x(), t4.get$x()), $.mul(t8.get$y(), t4.get$y()));
    case 1:
      t1 = t2.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointA;
      $.Transform_mulToOut(t2, t4, t1);
      t5.negateLocal$0();
      t4 = t3.get$rotation();
      t2 = this.axisB;
      $.Matrix22_mulTransMatrixAndVectorToOut(t4, t5, t2);
      t5.negateLocal$0();
      $.indexSet(indexes, 0, -1);
      $.indexSet(indexes, 1, this.proxyB.getSupport$1(t2));
      t4 = this.localPointB;
      t4.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
      t6 = this.pointB;
      $.Transform_mulToOut(t3, t4, t6);
      t1 = t6.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    case 2:
      t1 = t3.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointB;
      $.Transform_mulToOut(t3, t4, t1);
      t4 = t2.get$rotation();
      t3 = t5.negateLocal$0();
      t6 = this.axisA;
      $.Matrix22_mulTransMatrixAndVectorToOut(t4, t3, t6);
      t5.negateLocal$0();
      $.indexSet(indexes, 1, -1);
      $.indexSet(indexes, 0, this.proxyA.getSupport$1(t6));
      t3 = this.localPointA;
      t3.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
      t4 = this.pointA;
      $.Transform_mulToOut(t2, t3, t4);
      t1 = t4.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    default:
      $.indexSet(indexes, 0, -1);
      $.indexSet(indexes, 1, -1);
      return 0;
  }
},
 evaluate$3: function(indexA, indexB, t) {
  var t1 = this.sweepA;
  var t2 = this.xfa;
  t1.getTransform$2(t2, t);
  t1 = this.sweepB;
  var t3 = this.xfb;
  t1.getTransform$2(t3, t);
  switch (this.type) {
    case 0:
      t1 = t2.get$rotation();
      var t4 = this.axis;
      $.Matrix22_mulTransMatrixAndVectorToOut(t1, t4, this.axisA);
      $.Matrix22_mulTransMatrixAndVectorToOut(t3.get$rotation(), t4.negateLocal$0(), this.axisB);
      t4.negateLocal$0();
      t1 = this.localPointA;
      t1.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
      var t5 = this.localPointB;
      t5.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
      var t6 = this.pointA;
      $.Transform_mulToOut(t2, t1, t6);
      t1 = this.pointB;
      $.Transform_mulToOut(t3, t5, t1);
      t6 = t1.subLocal$1(t6);
      return $.add($.mul(t6.get$x(), t4.get$x()), $.mul(t6.get$y(), t4.get$y()));
    case 1:
      t1 = t2.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointA;
      $.Transform_mulToOut(t2, t4, t1);
      t5.negateLocal$0();
      $.Matrix22_mulTransMatrixAndVectorToOut(t3.get$rotation(), t5, this.axisB);
      t5.negateLocal$0();
      t4 = this.localPointB;
      t4.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
      t2 = this.pointB;
      $.Transform_mulToOut(t3, t4, t2);
      t1 = t2.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    case 2:
      t1 = t3.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointB;
      $.Transform_mulToOut(t3, t4, t1);
      $.Matrix22_mulTransMatrixAndVectorToOut(t2.get$rotation(), t5.negateLocal$0(), this.axisA);
      t5.negateLocal$0();
      t4 = this.localPointA;
      t4.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
      t3 = this.pointA;
      $.Transform_mulToOut(t2, t4, t3);
      t1 = t3.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    default:
      return 0;
  }
}
};

$$.TimeOfImpactInput = {"":
 ["proxyA?", "proxyB?", "sweepA?", "sweepB?", "tMax="],
 "super": "Object"
};

$$.TimeOfImpactOutput = {"":
 ["state=", "t="],
 "super": "Object"
};

$$.WorldManifold = {"":
 ["normal?", "points?", "pool3", "pool4"],
 "super": "Object",
 initialize$5: function(manifold, xfA, radiusA, xfB, radiusB) {
  switch (manifold.get$type()) {
    case 0:
      var pointA = this.pool3;
      var pointB = this.pool4;
      var t1 = this.normal;
      t1.set$x(1);
      t1.set$y(0);
      pointA.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      pointA.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      pointB.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      pointB.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      if ($.gtB($.MathBox_distanceSquared(pointA, pointB), 1.4208639999999999e-14)) {
        t1.set$x($.sub(pointB.get$x(), pointA.get$x()));
        t1.set$y($.sub(pointB.get$y(), pointA.get$y()));
        t1.normalize$0();
      }
      var cAx = $.add($.mul(t1.get$x(), radiusA), pointA.get$x());
      var cAy = $.add($.mul(t1.get$y(), radiusA), pointA.get$y());
      var cBx = $.add($.mul($.neg(t1.get$x()), radiusB), pointB.get$x());
      var cBy = $.add($.mul($.neg(t1.get$y()), radiusB), pointB.get$y());
      var t2 = $.mul($.add(cAx, cBx), 0.5);
      var t3 = this.points;
      $.index(t3, 0).set$x(t2);
      t2 = $.mul($.add(cAy, cBy), 0.5);
      $.index(t3, 0).set$y(t2);
      return;
    case 1:
      var planePoint = this.pool3;
      t1 = $.add($.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localNormal().get$y()));
      t2 = this.normal;
      t2.set$x(t1);
      t2.set$y($.add($.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localNormal().get$y())));
      planePoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      planePoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      var clipPoint = this.pool4;
      for (var t1 = this.points, i = 0; $.ltB(i, manifold.get$pointCount()); ++i) {
        clipPoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        var scalar = $.sub(radiusA, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), t2.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), t2.get$y())));
        cAx = $.add($.mul(t2.get$x(), scalar), clipPoint.get$x());
        cAy = $.add($.mul(t2.get$y(), scalar), clipPoint.get$y());
        cBx = $.add($.mul($.neg(t2.get$x()), radiusB), clipPoint.get$x());
        cBy = $.add($.mul($.neg(t2.get$y()), radiusB), clipPoint.get$y());
        t3 = $.mul($.add(cAx, cBx), 0.5);
        $.index(t1, i).set$x(t3);
        t3 = $.mul($.add(cAy, cBy), 0.5);
        $.index(t1, i).set$y(t3);
      }
      return;
    case 2:
      planePoint = this.pool3;
      var R = xfB.get$rotation();
      t1 = $.add($.mul(R.get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$x(), manifold.get$localNormal().get$y()));
      t2 = this.normal;
      t2.set$x(t1);
      t2.set$y($.add($.mul(R.get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$y(), manifold.get$localNormal().get$y())));
      var v = manifold.get$localPoint();
      planePoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())));
      planePoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
      clipPoint = this.pool4;
      for (t1 = this.points, i = 0; $.ltB(i, manifold.get$pointCount()); ++i) {
        clipPoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        scalar = $.sub(radiusB, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), t2.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), t2.get$y())));
        cBx = $.add($.mul(t2.get$x(), scalar), clipPoint.get$x());
        cBy = $.add($.mul(t2.get$y(), scalar), clipPoint.get$y());
        cAx = $.add($.mul($.neg(t2.get$x()), radiusA), clipPoint.get$x());
        cAy = $.add($.mul($.neg(t2.get$y()), radiusA), clipPoint.get$y());
        t3 = $.mul($.add(cAx, cBx), 0.5);
        $.index(t1, i).set$x(t3);
        t3 = $.mul($.add(cAy, cBy), 0.5);
        $.index(t1, i).set$y(t3);
      }
      t2.set$x($.neg(t2.get$x()));
      t2.set$y($.neg(t2.get$y()));
      break;
  }
},
 WorldManifold$0: function() {
  for (var t1 = this.points, i = 0; i < 2; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.BroadPhase = {"":
 ["_tree", "proxyCount", "moveBuffer", "_pairBuffer", "_pairCapacity", "_pairCount", "queryProxy"],
 "super": "Object",
 createProxy$2: function(box, userData) {
  var node = this._tree.createProxy$2(box, userData);
  this.proxyCount = this.proxyCount + 1;
  this._bufferMove$1(node);
  return node;
},
 moveProxy$3: function(proxy, box, displacement) {
  if (this._tree.moveProxy$3(proxy, box, displacement) === true)
    this._bufferMove$1(proxy);
},
 testOverlap$2: function(proxyA, proxyB) {
  return $.AxisAlignedBox_testOverlap(proxyA.get$box(), proxyB.get$box());
},
 updatePairs$1: function(callback) {
  this._pairCount = 0;
  for (var t1 = this._tree, i = 0; i < this.moveBuffer.length; ++i) {
    var t2 = this.moveBuffer;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    this.queryProxy = t2[i];
    t2 = this.queryProxy;
    if (t2 == null)
      continue;
    t1.query$2(this, t2.get$box());
  }
  this.moveBuffer = $.ListImplementation_List(null, 'DynamicTreeNode');
  var pairBuffer = $.ListImplementation_List$from($.getRange(this._pairBuffer, 0, this._pairCount));
  $.sort(pairBuffer, new $.BroadPhase_updatePairs_anon());
  $.setRange$3(this._pairBuffer, 0, this._pairCount, pairBuffer);
  for (i = 0; i < this._pairCount;) {
    t2 = this._pairBuffer;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    var primaryPair = t2[i];
    callback.addPair$2(primaryPair.get$proxyA().get$userData(), primaryPair.get$proxyB().get$userData());
    ++i;
    for (; i < this._pairCount;) {
      t2 = this._pairBuffer;
      if (i < 0 || i >= t2.length)
        throw $.ioore(i);
      var pair = t2[i];
      t2 = pair.get$proxyA();
      var t3 = primaryPair.get$proxyA();
      if (t2 == null ? t3 == null : t2 === t3) {
        t2 = pair.get$proxyB();
        t3 = primaryPair.get$proxyB();
        var t4 = !(t2 == null ? t3 == null : t2 === t3);
        t2 = t4;
      } else
        t2 = true;
      if (t2)
        break;
      ++i;
    }
  }
  t1.rebalance$1(4);
},
 treeCallback$1: function(proxy) {
  if ($.eqB(proxy, this.queryProxy))
    return true;
  if (this._pairCount === this._pairCapacity) {
    var oldBuffer = this._pairBuffer;
    this._pairCapacity = this._pairCapacity * 2;
    this._pairBuffer = $.ListImplementation_List(this._pairCapacity, 'Pair');
    for (var i = 0; i < oldBuffer.length; ++i) {
      var t1 = this._pairBuffer;
      if (i < 0 || i >= oldBuffer.length)
        throw $.ioore(i);
      var t2 = oldBuffer[i];
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
    for (i = oldBuffer.length; i < this._pairCapacity; ++i) {
      t1 = this._pairBuffer;
      t2 = $.Pair$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  t1 = $.ltB(proxy.get$key(), this.queryProxy.get$key());
  t2 = this._pairBuffer;
  var t3 = this._pairCount;
  if (t1) {
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    if (t3 < 0 || t3 >= t2.length)
      throw $.ioore(t3);
    t2[t3].set$proxyA(proxy);
    t1 = this.queryProxy;
    var t4 = this._pairBuffer;
    var t5 = this._pairCount;
    if (t5 !== (t5 | 0))
      throw $.iae(t5);
    if (t5 < 0 || t5 >= t4.length)
      throw $.ioore(t5);
    t4[t5].set$proxyB(t1);
  } else {
    t1 = this.queryProxy;
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    if (t3 < 0 || t3 >= t2.length)
      throw $.ioore(t3);
    t2[t3].set$proxyA(t1);
    t1 = this._pairBuffer;
    t4 = this._pairCount;
    if (t4 !== (t4 | 0))
      throw $.iae(t4);
    if (t4 < 0 || t4 >= t1.length)
      throw $.ioore(t4);
    t1[t4].set$proxyB(proxy);
  }
  this._pairCount = this._pairCount + 1;
  return true;
},
 query$2: function(callback, box) {
  this._tree.query$2(callback, box);
},
 _bufferMove$1: function(node) {
  this.moveBuffer.push(node);
},
 BroadPhase$0: function() {
  this.moveBuffer = $.ListImplementation_List(null, 'DynamicTreeNode');
  this._pairBuffer = $.ListImplementation_List(this._pairCapacity, 'Pair');
  for (var i = 0; i < this._pairCapacity; ++i) {
    var t1 = this._pairBuffer;
    var t2 = $.Pair$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.DynamicTree = {"":
 ["_root", "_nodeCount", "_lastLeaf", "_insertionCount", "_path", "_nodeStack", "_drawVectors", "_nodeCounter", "_tempVector", "_tempBox", "center?", "deltaOne", "deltaTwo"],
 "super": "Object",
 createProxy$2: function(box, userData) {
  var proxy = this._allocateNode$0();
  var t1 = $.sub(box.get$lowerBound().get$x(), 0.1);
  proxy.get$box().get$lowerBound().set$x(t1);
  t1 = $.sub(box.get$lowerBound().get$y(), 0.1);
  proxy.get$box().get$lowerBound().set$y(t1);
  t1 = $.add(box.get$upperBound().get$x(), 0.1);
  proxy.get$box().get$upperBound().set$x(t1);
  t1 = $.add(box.get$upperBound().get$y(), 0.1);
  proxy.get$box().get$upperBound().set$y(t1);
  proxy.set$userData(userData);
  this._insertLeaf$1(proxy);
  var iterationCount = $.shr(this._nodeCount, 4);
  var height = this.computeHeightFromRoot$0();
  if (typeof height !== 'number')
    return this.createProxy$2$bailout(1, height, proxy, iterationCount);
  var tryCount = 0;
  while (true) {
    if (!($.gtB(height, 64) && tryCount < 10))
      break;
    this.rebalance$1(iterationCount);
    height = this.computeHeightFromRoot$0();
    ++tryCount;
  }
  return proxy;
},
 createProxy$2$bailout: function(state, height, proxy, iterationCount) {
  var tryCount = 0;
  while (true) {
    if (!($.gtB(height, 64) && tryCount < 10))
      break;
    this.rebalance$1(iterationCount);
    height = this.computeHeightFromRoot$0();
    ++tryCount;
  }
  return proxy;
},
 moveProxy$3: function(argProxy, argBox, displacement) {
  if ($.contains$1(argProxy.get$box(), argBox) === true)
    return false;
  this._removeLeaf$1(argProxy);
  var t1 = argBox.get$lowerBound();
  t1.set$x($.sub(t1.get$x(), 0.1));
  t1 = argBox.get$lowerBound();
  t1.set$y($.sub(t1.get$y(), 0.1));
  t1 = argBox.get$upperBound();
  t1.set$x($.add(t1.get$x(), 0.1));
  t1 = argBox.get$upperBound();
  t1.set$y($.add(t1.get$y(), 0.1));
  t1 = this._tempVector;
  t1.setFrom$1(displacement);
  t1.mulLocal$1(2);
  if ($.ltB(t1.get$x(), 0)) {
    var t2 = argBox.get$lowerBound();
    t2.set$x($.add(t2.get$x(), t1.get$x()));
  } else {
    t2 = argBox.get$upperBound();
    t2.set$x($.add(t2.get$x(), t1.get$x()));
  }
  if ($.ltB(t1.get$y(), 0)) {
    t2 = argBox.get$lowerBound();
    t2.set$y($.add(t2.get$y(), t1.get$y()));
  } else {
    t2 = argBox.get$upperBound();
    t2.set$y($.add(t2.get$y(), t1.get$y()));
  }
  argProxy.get$box().setFrom$1(argBox);
  this._insertLeaf$1(argProxy);
  return true;
},
 _allocateNode$0: function() {
  var t1 = this._nodeStack;
  if ($.isEmpty(t1) === true)
    for (var i = 0; i < 6; ++i)
      t1.addFirst$1($.DynamicTreeNode$_construct());
  var node = t1.removeFirst$0();
  node.set$parent(null);
  node.set$childOne(null);
  node.set$childTwo(null);
  node.set$userData(null);
  node.set$key(this._nodeCounter);
  this._nodeCounter = this._nodeCounter + 1;
  this._nodeCount = this._nodeCount + 1;
  return node;
},
 query$2: function(callback, argBox) {
  this._query$4(callback, argBox, this._root, 1);
},
 _query$4: function(callback, argBox, node, count) {
  if (node == null)
    return true;
  if ($.AxisAlignedBox_testOverlap(argBox, node.get$box()))
    if (node.get$isLeaf() === true) {
      if (callback.treeCallback$1(node) !== true)
        return false;
    } else {
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childOne(), count) !== true)
          return false;
      }
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childTwo(), count) !== true)
          return false;
      }
    }
  return true;
},
 _insertLeaf$1: function(node) {
  var t1 = this._insertionCount;
  if (typeof t1 !== 'number')
    return this._insertLeaf$1$bailout(1, node, t1, 0, 0, 0, 0, 0, 0, 0);
  this._insertionCount = t1 + 1;
  if (this._root == null) {
    this._root = node;
    node.set$parent(null);
    return;
  }
  t1 = this.center;
  t1.setFrom$1(node.get$box().get$center());
  var sibling = this._root;
  if (sibling.get$isLeaf() !== true) {
    var t2 = this.deltaOne;
    var t3 = this.deltaTwo;
    var childOne = null;
    var childTwo = null;
    do {
      childOne = sibling.get$childOne();
      childTwo = sibling.get$childTwo();
      t2.setFrom$1(childOne.get$box().get$center());
      t3.setFrom$1(childTwo.get$box().get$center());
      t2.subLocal$1(t1).absLocal$0();
      t3.subLocal$1(t1).absLocal$0();
      var t4 = t2.x;
      if (typeof t4 !== 'number')
        return this._insertLeaf$1$bailout(2, node, t3, childOne, childTwo, t4, t1, t2, 0, 0);
      var t6 = t2.y;
      if (typeof t6 !== 'number')
        return this._insertLeaf$1$bailout(3, node, t3, childOne, childTwo, t4, t6, t1, t2, 0);
      var normOne = t4 + t6;
      t6 = t3.x;
      if (typeof t6 !== 'number')
        return this._insertLeaf$1$bailout(4, node, t6, t3, childOne, childTwo, t1, normOne, t2, 0);
      var t8 = t3.y;
      if (typeof t8 !== 'number')
        return this._insertLeaf$1$bailout(5, node, t6, t8, t3, childOne, childTwo, t1, normOne, t2);
      sibling = normOne < t6 + t8 ? childOne : childTwo;
      t4 = sibling.get$isLeaf();
      if (typeof t4 !== 'boolean')
        return this._insertLeaf$1$bailout(6, childTwo, sibling, t2, node, t4, t3, t1, childOne, 0);
    } while (!t4);
  }
  var node1 = sibling.get$parent();
  var node2 = this._allocateNode$0();
  node2.set$parent(node1);
  node2.set$userData(null);
  node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
  if (!(node1 == null)) {
    t1 = sibling.get$parent().get$childOne();
    if (t1 == null ? sibling == null : t1 === sibling)
      node1.set$childOne(node2);
    else
      node1.set$childTwo(node2);
    node2.set$childOne(sibling);
    node2.set$childTwo(node);
    sibling.set$parent(node2);
    node.set$parent(node2);
    do {
      if ($.contains$1(node1.get$box(), node2.get$box()) === true)
        break;
      node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
      var node10 = node1.get$parent();
      node2 = node1;
      node1 = node10;
    } while (!(node1 == null));
  } else {
    node2.set$childOne(sibling);
    node2.set$childTwo(node);
    sibling.set$parent(node2);
    node.set$parent(node2);
    this._root = node2;
  }
},
 _insertLeaf$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      var node = env0;
      t1 = env1;
      break;
    case 2:
      node = env0;
      t3 = env1;
      childOne = env2;
      childTwo = env3;
      t4 = env4;
      t1 = env5;
      t2 = env6;
      break;
    case 3:
      node = env0;
      t3 = env1;
      childOne = env2;
      childTwo = env3;
      t4 = env4;
      t6 = env5;
      t1 = env6;
      t2 = env7;
      break;
    case 4:
      node = env0;
      t6 = env1;
      t3 = env2;
      childOne = env3;
      childTwo = env4;
      t1 = env5;
      normOne = env6;
      t2 = env7;
      break;
    case 5:
      node = env0;
      t6 = env1;
      t8 = env2;
      t3 = env3;
      childOne = env4;
      childTwo = env5;
      t1 = env6;
      normOne = env7;
      t2 = env8;
      break;
    case 6:
      childTwo = env0;
      sibling = env1;
      t2 = env2;
      node = env3;
      t4 = env4;
      t3 = env5;
      t1 = env6;
      childOne = env7;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._insertionCount;
    case 1:
      state = 0;
      this._insertionCount = $.add(t1, 1);
      if (this._root == null) {
        this._root = node;
        node.set$parent(null);
        return;
      }
      t1 = this.center;
      t1.setFrom$1(node.get$box().get$center());
      var sibling = this._root;
    default:
      if (state === 6 || state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && sibling.get$isLeaf() !== true)
        switch (state) {
          case 0:
            var t2 = this.deltaOne;
            var t3 = this.deltaTwo;
            var childOne = null;
            var childTwo = null;
          default:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    childOne = sibling.get$childOne();
                    childTwo = sibling.get$childTwo();
                    t2.setFrom$1(childOne.get$box().get$center());
                    t3.setFrom$1(childTwo.get$box().get$center());
                    t2.subLocal$1(t1).absLocal$0();
                    t3.subLocal$1(t1).absLocal$0();
                    var t4 = t2.get$x();
                  case 2:
                    state = 0;
                    var t6 = t2.get$y();
                  case 3:
                    state = 0;
                    var normOne = $.add(t4, t6);
                    t6 = t3.get$x();
                  case 4:
                    state = 0;
                    var t8 = t3.get$y();
                  case 5:
                    state = 0;
                    sibling = $.ltB(normOne, $.add(t6, t8)) ? childOne : childTwo;
                    t4 = sibling.get$isLeaf();
                  case 6:
                    state = 0;
                    if (!$.eqB(t4, false))
                      break L0;
                }
        }
      var node1 = sibling.get$parent();
      var node2 = this._allocateNode$0();
      node2.set$parent(node1);
      node2.set$userData(null);
      node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
      if (!(node1 == null)) {
        t1 = sibling.get$parent().get$childOne();
        if (t1 == null ? sibling == null : t1 === sibling)
          node1.set$childOne(node2);
        else
          node1.set$childTwo(node2);
        node2.set$childOne(sibling);
        node2.set$childTwo(node);
        sibling.set$parent(node2);
        node.set$parent(node2);
        do {
          if ($.contains$1(node1.get$box(), node2.get$box()) === true)
            break;
          node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
          var node10 = node1.get$parent();
          node2 = node1;
          node1 = node10;
        } while (!(node1 == null));
      } else {
        node2.set$childOne(sibling);
        node2.set$childTwo(node);
        sibling.set$parent(node2);
        node.set$parent(node2);
        this._root = node2;
      }
  }
},
 _removeLeaf$1: function(argNode) {
  var t1 = this._root;
  if (argNode == null ? t1 == null : argNode === t1) {
    this._root = null;
    t1 = this._lastLeaf;
    if (t1 == null ? argNode == null : t1 === argNode)
      this._lastLeaf = null;
    return;
  }
  var node2 = argNode.get$parent();
  var node1 = node2.get$parent();
  t1 = node2.get$childOne();
  var sibling = (t1 == null ? argNode == null : t1 === argNode) ? node2.get$childTwo() : node2.get$childOne();
  if (!(node1 == null)) {
    t1 = node1.get$childOne();
    if (t1 == null ? node2 == null : t1 === node2)
      node1.set$childOne(sibling);
    else
      node1.set$childTwo(sibling);
    sibling.set$parent(node1);
    this._freeNode$1(node2);
    for (t1 = this._tempBox; !(node1 == null);) {
      t1.setFrom$1(node1.get$box());
      node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
      if ($.contains$1(t1, node1.get$box()) === true)
        break;
      node1 = node1.get$parent();
    }
  } else {
    this._root = sibling;
    sibling.set$parent(null);
    this._freeNode$1(node2);
  }
  t1 = this._lastLeaf;
  if (t1 == null ? argNode == null : t1 === argNode)
    this._lastLeaf = this._root;
},
 computeHeightFromRoot$0: function() {
  return this._computeHeight$1(this._root);
},
 _computeHeight$1: function(node) {
  if (node == null)
    return 0;
  return 1 + $.max(this._computeHeight$1(node.get$childOne()), this._computeHeight$1(node.get$childTwo()));
},
 rebalance$1: function(iterations) {
  if (typeof iterations !== 'number')
    return this.rebalance$1$bailout(1, iterations, 0, 0, 0, 0);
  if (this._root == null)
    return;
  for (var current = null, i = 0; i < iterations; ++i) {
    current = this._root;
    for (var bit = 0; current.get$isLeaf() !== true;) {
      var t1 = this._path;
      if (t1 !== (t1 | 0))
        return this.rebalance$1$bailout(2, iterations, i, t1, current, bit);
      current = ($.shr(t1, bit) & 1) === 0 ? current.get$childOne() : current.get$childTwo();
      var bit0 = bit + 1 & 31;
      bit = bit0;
    }
    t1 = this._path;
    if (typeof t1 !== 'number')
      return this.rebalance$1$bailout(3, iterations, i, t1, current, 0);
    this._path = t1 + 1;
    this._removeLeaf$1(current);
    this._insertLeaf$1(current);
  }
},
 rebalance$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var iterations = env0;
      break;
    case 2:
      iterations = env0;
      i = env1;
      t1 = env2;
      current = env3;
      bit = env4;
      break;
    case 3:
      iterations = env0;
      i = env1;
      t1 = env2;
      current = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (this._root == null)
        return;
      var current = null;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, iterations))
                break L0;
              current = this._root;
              var bit = 0;
            case 2:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(current.get$isLeaf() !== true))
                        break L1;
                      var t1 = this._path;
                    case 2:
                      state = 0;
                      current = $.eqB($.and($.shr(t1, bit), 1), 0) ? current.get$childOne() : current.get$childTwo();
                      var bit0 = bit + 1 & 31;
                      bit = bit0;
                  }
              t1 = this._path;
            case 3:
              state = 0;
              this._path = $.add(t1, 1);
              this._removeLeaf$1(current);
              this._insertLeaf$1(current);
              ++i;
          }
  }
},
 _freeNode$1: function(node) {
  this._nodeStack.addFirst$1(node);
  this._nodeCount = this._nodeCount - 1;
},
 DynamicTree$0: function() {
  for (var t1 = this._drawVectors, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.DynamicTreeNode = {"":
 ["box?", "parent=", "next=", "childOne=", "childTwo=", "userData=", "key="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 get$isLeaf: function() {
  return this.childOne == null;
},
 toString$0: function() {
  return $.toString(this.box);
}
};

$$.Pair = {"":
 ["proxyA=", "proxyB="],
 "super": "Object",
 compareTo$1: function(pair2) {
  if ($.ltB(this.proxyA.get$key(), pair2.get$proxyA().get$key()))
    return -1;
  if ($.eqB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) {
    if ($.ltB(this.proxyB.get$key(), pair2.get$proxyB().get$key()))
      var t1 = -1;
    else
      t1 = $.eqB(this.proxyB.get$key(), pair2.get$proxyB().get$key()) ? 0 : 1;
    return t1;
  }
  return 1;
}
};

$$.CircleShape = {"":
 ["position?", "type", "radius"],
 "super": "Shape",
 computeAxisAlignedBox$2: function(argBox, argTransform) {
  var p = $.Vector$(0, 0);
  $.Matrix22_mulMatrixAndVectorToOut(argTransform.get$rotation(), this.position, p);
  p.addLocal$1(argTransform.get$position());
  argBox.get$lowerBound().setCoords$2($.sub(p.x, this.radius), $.sub(p.y, this.radius));
  argBox.get$upperBound().setCoords$2($.add(p.x, this.radius), $.add(p.y, this.radius));
},
 clone$0: function() {
  return $.CircleShape$copy(this);
},
 computeMass$2: function(massData, density) {
  massData.set$mass($.mul($.mul($.mul(density, 3.141592653589793), this.radius), this.radius));
  var t1 = massData.get$center();
  var t2 = this.position;
  t1.setFrom$1(t2);
  t1 = massData.get$mass();
  var t3 = this.radius;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = 0.5 * t3 * t3;
  var t4 = $.add($.mul(t2.get$x(), t2.get$x()), $.mul(t2.get$y(), t2.get$y()));
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  massData.set$inertia($.mul(t1, t3 + t4));
}
};

$$.MassData = {"":
 ["mass=", "center?", "inertia="],
 "super": "Object",
 setFrom$1: function(md) {
  this.mass = md.get$mass();
  this.inertia = md.get$inertia();
  this.center.setFrom$1(md.get$center());
}
};

$$.PolygonShape = {"":
 ["centroid?", "vertices?", "normals?", "vertexCount?", "type", "radius"],
 "super": "Shape",
 getSupport$1: function(d) {
  var t1 = this.vertices;
  if (0 >= t1.length)
    throw $.ioore(0);
  var one = t1[0];
  var t2 = one.get$x();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(1, d, t2, one, t1, 0, 0, 0, 0, 0);
  var t4 = d.get$x();
  if (typeof t4 !== 'number')
    return this.getSupport$1$bailout(2, d, t2, t4, one, t1, 0, 0, 0, 0);
  t4 = t2 * t4;
  t2 = one.get$y();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(3, d, t4, t2, one, t1, 0, 0, 0, 0);
  var t7 = d.get$y();
  if (typeof t7 !== 'number')
    return this.getSupport$1$bailout(4, d, one, t1, t4, t2, t7, 0, 0, 0);
  var bestValue = t4 + t2 * t7;
  var two = d;
  var bestIndex = 0;
  var i = 1;
  while (true) {
    t2 = this.vertexCount;
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(5, d, t1, bestIndex, bestValue, one, i, two, t2, 0);
    if (!(i < t2))
      break;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    one = t1[i];
    t2 = one.get$x();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(6, d, one, bestIndex, bestValue, t1, i, t2, 0, 0);
    t4 = d.get$x();
    if (typeof t4 !== 'number')
      return this.getSupport$1$bailout(7, d, one, bestIndex, bestValue, t4, i, t1, t2, 0);
    t4 = t2 * t4;
    t2 = one.get$y();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(8, d, one, bestIndex, bestValue, t1, i, t4, t2, 0);
    t7 = d.get$y();
    if (typeof t7 !== 'number')
      return this.getSupport$1$bailout(9, d, one, bestIndex, bestValue, t1, i, t4, t2, t7);
    var value = t4 + t2 * t7;
    if (value > bestValue) {
      bestValue = value;
      bestIndex = i;
    }
    two = d;
    ++i;
  }
  return bestIndex;
},
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      var d = env0;
      t2 = env1;
      one = env2;
      t1 = env3;
      break;
    case 2:
      d = env0;
      t2 = env1;
      t4 = env2;
      one = env3;
      t1 = env4;
      break;
    case 3:
      d = env0;
      t4 = env1;
      t2 = env2;
      one = env3;
      t1 = env4;
      break;
    case 4:
      d = env0;
      one = env1;
      t1 = env2;
      t4 = env3;
      t2 = env4;
      t7 = env5;
      break;
    case 5:
      d = env0;
      t1 = env1;
      bestIndex = env2;
      bestValue = env3;
      one = env4;
      i = env5;
      two = env6;
      t2 = env7;
      break;
    case 6:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      break;
    case 7:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t4 = env4;
      i = env5;
      t1 = env6;
      t2 = env7;
      break;
    case 8:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t1 = env4;
      i = env5;
      t4 = env6;
      t2 = env7;
      break;
    case 9:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t1 = env4;
      i = env5;
      t4 = env6;
      t2 = env7;
      t7 = env8;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.vertices;
      if (0 < 0 || 0 >= t1.length)
        throw $.ioore(0);
      var one = t1[0];
      var t2 = one.get$x();
    case 1:
      state = 0;
      var t4 = d.get$x();
    case 2:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = one.get$y();
    case 3:
      state = 0;
      var t7 = d.get$y();
    case 4:
      state = 0;
      var bestValue = $.add(t4, $.mul(t2, t7));
      var two = d;
      var bestIndex = 0;
      var i = 1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              t2 = this.vertexCount;
            case 5:
              state = 0;
              if (!$.ltB(i, t2))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              one = t1[i];
              t2 = one.get$x();
            case 6:
              state = 0;
              t4 = d.get$x();
            case 7:
              state = 0;
              t4 = $.mul(t2, t4);
              t2 = one.get$y();
            case 8:
              state = 0;
              t7 = d.get$y();
            case 9:
              state = 0;
              var value = $.add(t4, $.mul(t2, t7));
              if ($.gtB(value, bestValue)) {
                bestValue = value;
                bestIndex = i;
              }
              two = d;
              ++i;
          }
      return bestIndex;
  }
},
 clone$0: function() {
  return $.PolygonShape$copy(this);
},
 setAsBox$2: function(hx, hy) {
  this.vertexCount = 4;
  var t1 = this.vertices;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  var t2 = t1[0];
  var t3 = -hx;
  var t4 = -hy;
  t2.setCoords$2(t3, t4);
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1].setCoords$2(hx, t4);
  if (2 < 0 || 2 >= t1.length)
    throw $.ioore(2);
  t1[2].setCoords$2(hx, hy);
  if (3 < 0 || 3 >= t1.length)
    throw $.ioore(3);
  t1[3].setCoords$2(t3, hy);
  t3 = this.normals;
  if (0 < 0 || 0 >= t3.length)
    throw $.ioore(0);
  t3[0].setCoords$2(0.0, -1.0);
  if (1 < 0 || 1 >= t3.length)
    throw $.ioore(1);
  t3[1].setCoords$2(1.0, 0.0);
  if (2 < 0 || 2 >= t3.length)
    throw $.ioore(2);
  t3[2].setCoords$2(0.0, 1.0);
  if (3 < 0 || 3 >= t3.length)
    throw $.ioore(3);
  t3[3].setCoords$2(-1.0, 0.0);
  this.centroid.setZero$0();
},
 setAsEdge$2: function(v1, v2) {
  this.vertexCount = 2;
  var t1 = this.vertices;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0].setFrom$1(v1);
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1].setFrom$1(v2);
  this.centroid.setFrom$1(v1).addLocal$1(v2).mulLocal$1(0.5);
  var t2 = this.normals;
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t2[0].setFrom$1(v2).subLocal$1(v1);
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  var t3 = t2[0];
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  $.Vector_crossVectorAndNumToOut(t3, 1, t2[0]);
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t2[0].normalize$0();
  if (1 < 0 || 1 >= t2.length)
    throw $.ioore(1);
  t3 = t2[1];
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t3.setFrom$1(t2[0]).negateLocal$0();
},
 computeAxisAlignedBox$2: function(argAabb, argXf) {
  var lower = $.Vector$(0, 0);
  var upper = $.Vector$(0, 0);
  var v = $.Vector$(0, 0);
  var t1 = this.vertices;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  $.Transform_mulToOut(argXf, t1[0], lower);
  upper.setFrom$1(lower);
  for (var i = 1; $.ltB(i, this.vertexCount); ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    $.Transform_mulToOut(argXf, t1[i], v);
    $.Vector_minToOut(lower, v, lower);
    $.Vector_maxToOut(upper, v, upper);
  }
  t1 = $.sub(lower.x, this.radius);
  argAabb.get$lowerBound().set$x(t1);
  t1 = $.sub(lower.y, this.radius);
  argAabb.get$lowerBound().set$y(t1);
  t1 = $.add(upper.x, this.radius);
  argAabb.get$upperBound().set$x(t1);
  t1 = $.add(upper.y, this.radius);
  argAabb.get$upperBound().set$y(t1);
},
 computeMass$2: function(massData, density) {
  if ($.eqB(this.vertexCount, 2)) {
    var t1 = massData.get$center();
    var t2 = this.vertices;
    if (0 < 0 || 0 >= t2.length)
      throw $.ioore(0);
    t1 = t1.setFrom$1(t2[0]);
    if (1 < 0 || 1 >= t2.length)
      throw $.ioore(1);
    t1.addLocal$1(t2[1]).mulLocal$1(0.5);
    massData.set$mass(0.0);
    massData.set$inertia(0.0);
    return;
  }
  var center = $.Vector$(0, 0);
  center.setZero$0();
  var pRef = $.Vector$(0, 0);
  pRef.setZero$0();
  var e1 = $.Vector$(0, 0);
  var e2 = $.Vector$(0, 0);
  for (var t1 = this.vertices, area = 0.0, I = 0.0, i = 0; $.ltB(i, this.vertexCount); ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var p2 = t1[i];
    t2 = i + 1;
    if ($.ltB(t2, this.vertexCount)) {
      if (t2 < 0 || t2 >= t1.length)
        throw $.ioore(t2);
      var p3 = t1[t2];
    } else {
      if (0 < 0 || 0 >= t1.length)
        throw $.ioore(0);
      p3 = t1[0];
    }
    e1.setFrom$1(p2);
    e1.subLocal$1(pRef);
    e2.setFrom$1(p3);
    e2.subLocal$1(pRef);
    var D = $.sub($.mul(e1.x, e2.y), $.mul(e1.y, e2.x));
    if (typeof D !== 'number')
      throw $.iae(D);
    var triangleArea = 0.5 * D;
    area += triangleArea;
    t2 = center.x;
    var t3 = triangleArea * 0.3333333333333333;
    var t4 = $.add($.add(pRef.x, p2.get$x()), p3.get$x());
    if (typeof t4 !== 'number')
      throw $.iae(t4);
    center.x = $.add(t2, t3 * t4);
    var t5 = center.y;
    var t6 = $.add($.add(pRef.y, p2.get$y()), p3.get$y());
    if (typeof t6 !== 'number')
      throw $.iae(t6);
    center.y = $.add(t5, t3 * t6);
    var px = pRef.x;
    var py = pRef.y;
    var ex1 = e1.x;
    var ey1 = e1.y;
    var ex2 = e2.x;
    var ey2 = e2.y;
    var t7 = $.add($.add($.mul(ex1, ex1), $.mul(ex2, ex1)), $.mul(ex2, ex2));
    if (typeof t7 !== 'number')
      throw $.iae(t7);
    t7 = 0.25 * t7;
    var t8 = $.add($.mul(px, ex1), $.mul(px, ex2));
    if (typeof t8 !== 'number')
      throw $.iae(t8);
    var t9 = 0.3333333333333333 * (t7 + t8);
    if (typeof px !== 'number')
      throw $.iae(px);
    var intx2 = t9 + 0.5 * px * px;
    t9 = $.add($.add($.mul(ey1, ey1), $.mul(ey2, ey1)), $.mul(ey2, ey2));
    if (typeof t9 !== 'number')
      throw $.iae(t9);
    t9 = 0.25 * t9;
    var t10 = $.add($.mul(py, ey1), $.mul(py, ey2));
    if (typeof t10 !== 'number')
      throw $.iae(t10);
    var t11 = 0.3333333333333333 * (t9 + t10);
    if (typeof py !== 'number')
      throw $.iae(py);
    I += D * (intx2 + (t11 + 0.5 * py * py));
  }
  massData.set$mass($.mul(density, area));
  center.mulLocal$1(1.0 / area);
  massData.get$center().setFrom$1(center);
  if (typeof density !== 'number')
    throw $.iae(density);
  massData.set$inertia(I * density);
},
 PolygonShape$copy$1: function(other) {
  for (var t1 = this.vertices, i = 0; $.ltB(i, $.get$length(other.get$vertices())); ++i) {
    var t2 = $.Vector$copy($.index(other.get$vertices(), i));
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  for (t1 = this.normals, i = 0; $.ltB(i, $.get$length(other.get$normals())); ++i) {
    t2 = $.Vector$copy($.index(other.get$normals(), i));
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
},
 PolygonShape$0: function() {
  for (var t1 = this.vertices, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  for (t1 = this.normals, i = 0; i < t1.length; ++i) {
    t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.Shape = {"":
 ["type=", "radius="],
 "super": "Object"
};

$$.Matrix22 = {"":
 ["col1?", "col2?"],
 "super": "Object",
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$Matrix22)
    var t1 = $.eqB(this.col1, other.col1) && $.eqB(this.col2, other.col2);
  else
    t1 = false;
  return t1;
},
 setAngle$1: function(angle) {
  var cosin = $.cos(angle);
  var sin = $.sin(angle);
  this.col1.setCoords$2(cosin, sin);
  this.col2.setCoords$2(-sin, cosin);
},
 setFrom$1: function(matrix) {
  this.col1.setFrom$1(matrix.get$col1());
  this.col2.setFrom$1(matrix.get$col2());
},
 invertLocal$0: function() {
  var t1 = this.col1;
  var a = t1.get$x();
  if (typeof a !== 'number')
    return this.invertLocal$0$bailout(1, a, t1, 0, 0, 0, 0);
  var t3 = this.col2;
  var b = t3.get$x();
  if (typeof b !== 'number')
    return this.invertLocal$0$bailout(2, a, t1, t3, b, 0, 0);
  var c = t1.get$y();
  if (typeof c !== 'number')
    return this.invertLocal$0$bailout(3, a, t1, t3, b, c, 0);
  var d = t3.get$y();
  if (typeof d !== 'number')
    return this.invertLocal$0$bailout(4, a, t1, t3, b, c, d);
  var det = a * d - b * c;
  if (!(det === 0))
    det = 1.0 / det;
  t1.set$x(det * d);
  var t2 = -det;
  t3.set$x(t2 * b);
  t1.set$y(t2 * c);
  t3.set$y(det * a);
  return this;
},
 invertLocal$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      a = env0;
      t1 = env1;
      break;
    case 2:
      a = env0;
      t1 = env1;
      t3 = env2;
      b = env3;
      break;
    case 3:
      a = env0;
      t1 = env1;
      t3 = env2;
      b = env3;
      c = env4;
      break;
    case 4:
      a = env0;
      t1 = env1;
      t3 = env2;
      b = env3;
      c = env4;
      d = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.col1;
      var a = t1.get$x();
    case 1:
      state = 0;
      var t3 = this.col2;
      var b = t3.get$x();
    case 2:
      state = 0;
      var c = t1.get$y();
    case 3:
      state = 0;
      var d = t3.get$y();
    case 4:
      state = 0;
      var det = $.sub($.mul(a, d), $.mul(b, c));
      if (!$.eqB(det, 0)) {
        if (typeof det !== 'number')
          throw $.iae(det);
        det = 1.0 / det;
      }
      t1.set$x($.mul(det, d));
      t3.set$x($.mul($.neg(det), b));
      t1.set$y($.mul($.neg(det), c));
      t3.set$y($.mul(det, a));
      return this;
  }
},
 addLocal$1: function(other) {
  var t1 = this.col1;
  var t2 = t1.get$x();
  if (typeof t2 !== 'number')
    return this.addLocal$1$bailout(1, other, t1, t2, 0);
  var t4 = other.get$col1().get$x();
  if (typeof t4 !== 'number')
    return this.addLocal$1$bailout(2, other, t1, t2, t4);
  t1.set$x(t2 + t4);
  var t6 = t1.get$y();
  if (typeof t6 !== 'number')
    return this.addLocal$1$bailout(3, other, t1, t6, 0);
  var t8 = other.get$col1().get$y();
  if (typeof t8 !== 'number')
    return this.addLocal$1$bailout(4, other, t1, t6, t8);
  t1.set$y(t6 + t8);
  t1 = this.col2;
  var t10 = t1.get$x();
  if (typeof t10 !== 'number')
    return this.addLocal$1$bailout(5, other, t10, t1, 0);
  var t12 = other.get$col2().get$x();
  if (typeof t12 !== 'number')
    return this.addLocal$1$bailout(6, other, t10, t1, t12);
  t1.set$x(t10 + t12);
  var t14 = t1.get$y();
  if (typeof t14 !== 'number')
    return this.addLocal$1$bailout(7, other, t14, t1, 0);
  var t16 = other.get$col2().get$y();
  if (typeof t16 !== 'number')
    return this.addLocal$1$bailout(8, t14, t1, t16, 0);
  t1.set$y(t14 + t16);
  return this;
},
 addLocal$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var other = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 2:
      other = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 3:
      other = env0;
      t1 = env1;
      t6 = env2;
      break;
    case 4:
      other = env0;
      t1 = env1;
      t6 = env2;
      t8 = env3;
      break;
    case 5:
      other = env0;
      t10 = env1;
      t1 = env2;
      break;
    case 6:
      other = env0;
      t10 = env1;
      t1 = env2;
      t12 = env3;
      break;
    case 7:
      other = env0;
      t14 = env1;
      t1 = env2;
      break;
    case 8:
      t14 = env0;
      t1 = env1;
      t16 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.col1;
      var t2 = t1.get$x();
    case 1:
      state = 0;
      var t4 = other.get$col1().get$x();
    case 2:
      state = 0;
      t1.set$x($.add(t2, t4));
      var t6 = t1.get$y();
    case 3:
      state = 0;
      var t8 = other.get$col1().get$y();
    case 4:
      state = 0;
      t1.set$y($.add(t6, t8));
      t1 = this.col2;
      var t10 = t1.get$x();
    case 5:
      state = 0;
      var t12 = other.get$col2().get$x();
    case 6:
      state = 0;
      t1.set$x($.add(t10, t12));
      var t14 = t1.get$y();
    case 7:
      state = 0;
      var t16 = other.get$col2().get$y();
    case 8:
      state = 0;
      t1.set$y($.add(t14, t16));
      return this;
  }
},
 solveToOut$2: function(b, out) {
  var t1 = this.col1;
  var a11 = t1.get$x();
  var t2 = this.col2;
  var a12 = t2.get$x();
  var a21 = t1.get$y();
  var a22 = t2.get$y();
  var det = $.sub($.mul(a11, a22), $.mul(a12, a21));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number')
      throw $.iae(det);
    det = 1.0 / det;
  }
  var tempy = $.mul(det, $.sub($.mul(a11, b.get$y()), $.mul(a21, b.get$x())));
  out.x = $.mul(det, $.sub($.mul(a22, b.get$x()), $.mul(a12, b.get$y())));
  out.y = tempy;
},
 toString$0: function() {
  return $.S(this.col1) + ', ' + $.S(this.col2);
},
 Matrix22$2: function(c1, c2) {
  if (c1 == null)
    c1 = $.Vector$(0, 0);
  if (c2 == null)
    c2 = $.Vector$(0, 0);
  this.col1 = c1;
  this.col2 = c2;
},
 is$Matrix22: true
};

$$.Matrix33 = {"":
 ["col1?", "col2?", "col3?"],
 "super": "Object",
 setZero$0: function() {
  this.col1.setZero$0();
  this.col2.setZero$0();
  this.col3.setZero$0();
},
 solve22ToOut$2: function(b, out) {
  var t1 = this.col1;
  var a11 = t1.get$x();
  var t2 = this.col2;
  var a12 = t2.get$x();
  var a21 = t1.get$y();
  var a22 = t2.get$y();
  var det = $.sub($.mul(a11, a22), $.mul(a12, a21));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number')
      throw $.iae(det);
    det = 1.0 / det;
  }
  out.x = $.mul(det, $.sub($.mul(a22, b.get$x()), $.mul(a12, b.get$y())));
  out.y = $.mul(det, $.sub($.mul(a11, b.get$y()), $.mul(a21, b.get$x())));
},
 solve33ToOut$2: function(b, out) {
  var t1 = this.col2;
  var t2 = this.col3;
  $.Vector3_crossToOut(t1, t2, out);
  var t3 = this.col1;
  var det = $.add($.add($.mul(t3.get$x(), out.x), $.mul(t3.get$y(), out.y)), $.mul(t3.get$z(), out.z));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number')
      throw $.iae(det);
    det = 1.0 / det;
  }
  $.Vector3_crossToOut(t1, t2, out);
  var x = $.mul(det, $.add($.add($.mul(b.get$x(), out.x), $.mul(b.get$y(), out.y)), $.mul(b.get$z(), out.z)));
  $.Vector3_crossToOut(b, t2, out);
  var y = $.mul(det, $.add($.add($.mul(t3.get$x(), out.x), $.mul(t3.get$y(), out.y)), $.mul(t3.get$z(), out.z)));
  $.Vector3_crossToOut(t1, b, out);
  var z = $.mul(det, $.add($.add($.mul(t3.get$x(), out.x), $.mul(t3.get$y(), out.y)), $.mul(t3.get$z(), out.z)));
  out.x = x;
  out.y = y;
  out.z = z;
}
};

$$.Sweep = {"":
 ["localCenter?", "centerZero?", "center?", "angleZero=", "angle="],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eqB(this.localCenter, other.get$localCenter()) && $.eqB(this.centerZero, other.get$centerZero()) && $.eqB(this.center, other.get$center()) && $.eqB(this.angleZero, other.get$angleZero()) && $.eqB(this.angle, other.get$angle());
},
 setFrom$1: function(other) {
  this.localCenter.setFrom$1(other.get$localCenter());
  this.centerZero.setFrom$1(other.get$centerZero());
  this.center.setFrom$1(other.get$center());
  this.angleZero = other.get$angleZero();
  this.angle = other.get$angle();
},
 normalize$0: function() {
  var t1 = $.floor($.div(this.angleZero, 6.283185307179586));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var d = 6.283185307179586 * t1;
  this.angleZero = $.sub(this.angleZero, d);
  this.angle = $.sub(this.angle, d);
},
 getTransform$2: function(xf, alpha) {
  if (typeof alpha !== 'number')
    throw $.iae(alpha);
  var t1 = 1.0 - alpha;
  var t2 = this.centerZero;
  var t3 = t2.x;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = t1 * t3;
  var t4 = this.center;
  var t5 = t4.x;
  if (typeof t5 !== 'number')
    throw $.iae(t5);
  t3 += alpha * t5;
  xf.get$position().set$x(t3);
  t2 = t2.y;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  t2 = t1 * t2;
  t4 = t4.y;
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  t2 += alpha * t4;
  xf.get$position().set$y(t2);
  t2 = xf.get$rotation();
  t3 = this.angleZero;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = t1 * t3;
  t1 = this.angle;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  t2.setAngle$1(t3 + alpha * t1);
  t2 = xf.get$position();
  var t6 = t2.get$x();
  if (typeof t6 !== 'number')
    return this.getTransform$2$bailout(1, xf, t2, t6, 0, 0, 0, 0);
  var t8 = xf.get$rotation().get$col1().get$x();
  if (typeof t8 !== 'number')
    return this.getTransform$2$bailout(2, xf, t8, t2, t6, 0, 0, 0);
  var t10 = this.localCenter;
  var t11 = t10.x;
  if (typeof t11 !== 'number')
    return this.getTransform$2$bailout(3, t10, xf, t8, t11, t2, t6, 0);
  t11 = t8 * t11;
  t8 = xf.get$rotation().get$col2().get$x();
  if (typeof t8 !== 'number')
    return this.getTransform$2$bailout(4, t10, xf, t11, t8, t2, t6, 0);
  var t14 = t10.y;
  if (typeof t14 !== 'number')
    return this.getTransform$2$bailout(5, t10, xf, t11, t8, t14, t2, t6);
  t2.set$x(t6 - (t11 + t8 * t14));
  t2 = xf.get$position();
  var t16 = t2.get$y();
  if (typeof t16 !== 'number')
    return this.getTransform$2$bailout(6, t10, xf, t2, t16, 0, 0, 0);
  var t18 = xf.get$rotation().get$col1().get$y();
  if (typeof t18 !== 'number')
    return this.getTransform$2$bailout(7, t10, xf, t2, t16, t18, 0, 0);
  var t20 = t10.x;
  if (typeof t20 !== 'number')
    return this.getTransform$2$bailout(8, t10, xf, t2, t16, t18, t20, 0);
  t20 = t18 * t20;
  t18 = xf.get$rotation().get$col2().get$y();
  if (typeof t18 !== 'number')
    return this.getTransform$2$bailout(9, t10, t2, t16, t20, t18, 0, 0);
  t10 = t10.y;
  if (typeof t10 !== 'number')
    return this.getTransform$2$bailout(10, t10, t2, t16, t20, t18, 0, 0);
  t2.set$y(t16 - (t20 + t18 * t10));
},
 getTransform$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var xf = env0;
      t2 = env1;
      t6 = env2;
      break;
    case 2:
      xf = env0;
      t8 = env1;
      t2 = env2;
      t6 = env3;
      break;
    case 3:
      t10 = env0;
      xf = env1;
      t8 = env2;
      t11 = env3;
      t2 = env4;
      t6 = env5;
      break;
    case 4:
      t10 = env0;
      xf = env1;
      t11 = env2;
      t8 = env3;
      t2 = env4;
      t6 = env5;
      break;
    case 5:
      t10 = env0;
      xf = env1;
      t11 = env2;
      t8 = env3;
      t14 = env4;
      t2 = env5;
      t6 = env6;
      break;
    case 6:
      t10 = env0;
      xf = env1;
      t2 = env2;
      t16 = env3;
      break;
    case 7:
      t10 = env0;
      xf = env1;
      t2 = env2;
      t16 = env3;
      t18 = env4;
      break;
    case 8:
      t10 = env0;
      xf = env1;
      t2 = env2;
      t16 = env3;
      t18 = env4;
      t20 = env5;
      break;
    case 9:
      t10 = env0;
      t2 = env1;
      t16 = env2;
      t20 = env3;
      t18 = env4;
      break;
    case 10:
      t10 = env0;
      t2 = env1;
      t16 = env2;
      t20 = env3;
      t18 = env4;
      break;
  }
  switch (state) {
    case 0:
      if (typeof alpha !== 'number')
        throw $.iae(alpha);
      var t1 = 1.0 - alpha;
      var t2 = this.centerZero;
      var t3 = t2.get$x();
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      t3 = t1 * t3;
      var t4 = this.center;
      var t5 = t4.get$x();
      if (typeof t5 !== 'number')
        throw $.iae(t5);
      t3 += alpha * t5;
      xf.get$position().set$x(t3);
      t2 = t2.get$y();
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      t2 = t1 * t2;
      t4 = t4.get$y();
      if (typeof t4 !== 'number')
        throw $.iae(t4);
      t2 += alpha * t4;
      xf.get$position().set$y(t2);
      t2 = xf.get$rotation();
      t3 = this.angleZero;
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      t3 = t1 * t3;
      t1 = this.angle;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      t2.setAngle$1(t3 + alpha * t1);
      t2 = xf.get$position();
      var t6 = t2.get$x();
    case 1:
      state = 0;
      var t8 = xf.get$rotation().get$col1().get$x();
    case 2:
      state = 0;
      var t10 = this.localCenter;
      var t11 = t10.get$x();
    case 3:
      state = 0;
      t11 = $.mul(t8, t11);
      t8 = xf.get$rotation().get$col2().get$x();
    case 4:
      state = 0;
      var t14 = t10.get$y();
    case 5:
      state = 0;
      t2.set$x($.sub(t6, $.add(t11, $.mul(t8, t14))));
      t2 = xf.get$position();
      var t16 = t2.get$y();
    case 6:
      state = 0;
      var t18 = xf.get$rotation().get$col1().get$y();
    case 7:
      state = 0;
      var t20 = t10.get$x();
    case 8:
      state = 0;
      t20 = $.mul(t18, t20);
      t18 = xf.get$rotation().get$col2().get$y();
    case 9:
      state = 0;
      t10 = t10.get$y();
    case 10:
      state = 0;
      t2.set$y($.sub(t16, $.add(t20, $.mul(t18, t10))));
  }
},
 advance$1: function(time) {
  if (typeof time !== 'number')
    throw $.iae(time);
  var t1 = 1 - time;
  var t2 = this.centerZero;
  var t3 = t2.get$x();
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = t1 * t3;
  var t4 = this.center;
  var t5 = t4.get$x();
  if (typeof t5 !== 'number')
    throw $.iae(t5);
  t2.set$x(t3 + time * t5);
  var t6 = t2.get$y();
  if (typeof t6 !== 'number')
    throw $.iae(t6);
  t6 = t1 * t6;
  t4 = t4.get$y();
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  t2.set$y(t6 + time * t4);
  t2 = this.angleZero;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  t2 = t1 * t2;
  t1 = this.angle;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  this.angleZero = t2 + time * t1;
}
};

$$.Transform = {"":
 ["position?", "rotation?"],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eqB(this.position, other.get$position()) && $.eqB(this.rotation, other.get$rotation());
},
 setFrom$1: function(other) {
  this.position.setFrom$1(other.get$position());
  this.rotation.setFrom$1(other.get$rotation());
}
};

$$.Vector = {"":
 ["x=", "y="],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eqB(this.x, other.get$x()) && $.eqB(this.y, other.get$y());
},
 addLocal$1: function(v) {
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.addLocal$1$bailout(1, v, t1, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number')
    return this.addLocal$1$bailout(2, v, t3, t1);
  this.x = t1 + t3;
  var t5 = this.y;
  if (typeof t5 !== 'number')
    return this.addLocal$1$bailout(3, v, t5, 0);
  var t7 = v.get$y();
  if (typeof t7 !== 'number')
    return this.addLocal$1$bailout(4, t5, t7, 0);
  this.y = t5 + t7;
  return this;
},
 addLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var v = env0;
      t1 = env1;
      break;
    case 2:
      v = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 3:
      v = env0;
      t5 = env1;
      break;
    case 4:
      t5 = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      var t3 = v.get$x();
    case 2:
      state = 0;
      this.x = $.add(t1, t3);
      var t5 = this.y;
    case 3:
      state = 0;
      var t7 = v.get$y();
    case 4:
      state = 0;
      this.y = $.add(t5, t7);
      return this;
  }
},
 subLocal$1: function(other) {
  this.x = $.sub(this.x, other.get$x());
  this.y = $.sub(this.y, other.get$y());
  return this;
},
 setCoords$2: function(xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
  return this;
},
 setFrom$1: function(v) {
  this.setCoords$2(v.get$x(), v.get$y());
  return this;
},
 mulLocal$1: function(d) {
  if (typeof d !== 'number')
    return this.mulLocal$1$bailout(1, d, 0);
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.mulLocal$1$bailout(2, d, t1);
  this.x = t1 * d;
  var t3 = this.y;
  if (typeof t3 !== 'number')
    return this.mulLocal$1$bailout(3, d, t3);
  this.y = t3 * d;
  return this;
},
 mulLocal$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var d = env0;
      break;
    case 2:
      d = env0;
      t1 = env1;
      break;
    case 3:
      d = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.x;
    case 2:
      state = 0;
      this.x = $.mul(t1, d);
      var t3 = this.y;
    case 3:
      state = 0;
      this.y = $.mul(t3, d);
      return this;
  }
},
 setZero$0: function() {
  this.setCoords$2(0, 0);
  return this;
},
 get$length: function() {
  return $.sqrt(this.get$lengthSquared());
},
 get$lengthSquared: function() {
  var t1 = this.x;
  t1 = $.mul(t1, t1);
  var t2 = this.y;
  return $.add(t1, $.mul(t2, t2));
},
 absLocal$0: function() {
  this.x = $.abs(this.x);
  this.y = $.abs(this.y);
},
 normalize$0: function() {
  var len = $.get$length(this);
  if ($.ltB(len, 1.192e-7))
    return 0;
  if (typeof len !== 'number')
    throw $.iae(len);
  var invLength = 1.0 / len;
  this.x = $.mul(this.x, invLength);
  this.y = $.mul(this.y, invLength);
  return len;
},
 negateLocal$0: function() {
  this.x = $.neg(this.x);
  this.y = $.neg(this.y);
  return this;
},
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ')';
}
};

$$.Vector3 = {"":
 ["x=", "y=", "z="],
 "super": "Object",
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$Vector3)
    var t1 = $.eqB(this.x, other.x) && $.eqB(this.y, other.y) && $.eqB(this.z, other.z);
  else
    t1 = false;
  return t1;
},
 setFrom$1: function(argVec) {
  this.x = argVec.get$x();
  this.y = argVec.get$y();
  this.z = argVec.get$z();
  return this;
},
 setCoords$3: function(argX, argY, argZ) {
  this.x = argX;
  this.y = argY;
  this.z = argZ;
  return this;
},
 addLocal$1: function(argVec) {
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.addLocal$1$bailout(1, argVec, t1, 0);
  var t3 = argVec.get$x();
  if (typeof t3 !== 'number')
    return this.addLocal$1$bailout(2, argVec, t1, t3);
  this.x = t1 + t3;
  var t5 = this.y;
  if (typeof t5 !== 'number')
    return this.addLocal$1$bailout(3, argVec, t5, 0);
  var t7 = argVec.get$y();
  if (typeof t7 !== 'number')
    return this.addLocal$1$bailout(4, argVec, t7, t5);
  this.y = t5 + t7;
  var t9 = this.z;
  if (typeof t9 !== 'number')
    return this.addLocal$1$bailout(5, t9, argVec, 0);
  var t11 = argVec.get$z();
  if (typeof t11 !== 'number')
    return this.addLocal$1$bailout(6, t9, t11, 0);
  this.z = t9 + t11;
  return this;
},
 addLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var argVec = env0;
      t1 = env1;
      break;
    case 2:
      argVec = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      argVec = env0;
      t5 = env1;
      break;
    case 4:
      argVec = env0;
      t7 = env1;
      t5 = env2;
      break;
    case 5:
      t9 = env0;
      argVec = env1;
      break;
    case 6:
      t9 = env0;
      t11 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      var t3 = argVec.get$x();
    case 2:
      state = 0;
      this.x = $.add(t1, t3);
      var t5 = this.y;
    case 3:
      state = 0;
      var t7 = argVec.get$y();
    case 4:
      state = 0;
      this.y = $.add(t5, t7);
      var t9 = this.z;
    case 5:
      state = 0;
      var t11 = argVec.get$z();
    case 6:
      state = 0;
      this.z = $.add(t9, t11);
      return this;
  }
},
 add$1: function(argVec) {
  return $.Vector3$($.add(this.x, argVec.get$x()), $.add(this.y, argVec.get$y()), $.add(this.z, argVec.get$z()));
},
 subLocal$1: function(argVec) {
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.subLocal$1$bailout(1, argVec, t1, 0);
  var t3 = argVec.get$x();
  if (typeof t3 !== 'number')
    return this.subLocal$1$bailout(2, argVec, t1, t3);
  this.x = t1 - t3;
  var t5 = this.y;
  if (typeof t5 !== 'number')
    return this.subLocal$1$bailout(3, argVec, t5, 0);
  var t7 = argVec.get$y();
  if (typeof t7 !== 'number')
    return this.subLocal$1$bailout(4, argVec, t7, t5);
  this.y = t5 - t7;
  var t9 = this.z;
  if (typeof t9 !== 'number')
    return this.subLocal$1$bailout(5, t9, argVec, 0);
  var t11 = argVec.get$z();
  if (typeof t11 !== 'number')
    return this.subLocal$1$bailout(6, t9, t11, 0);
  this.z = t9 - t11;
  return this;
},
 subLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var argVec = env0;
      t1 = env1;
      break;
    case 2:
      argVec = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      argVec = env0;
      t5 = env1;
      break;
    case 4:
      argVec = env0;
      t7 = env1;
      t5 = env2;
      break;
    case 5:
      t9 = env0;
      argVec = env1;
      break;
    case 6:
      t9 = env0;
      t11 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      var t3 = argVec.get$x();
    case 2:
      state = 0;
      this.x = $.sub(t1, t3);
      var t5 = this.y;
    case 3:
      state = 0;
      var t7 = argVec.get$y();
    case 4:
      state = 0;
      this.y = $.sub(t5, t7);
      var t9 = this.z;
    case 5:
      state = 0;
      var t11 = argVec.get$z();
    case 6:
      state = 0;
      this.z = $.sub(t9, t11);
      return this;
  }
},
 mulLocal$1: function(argScalar) {
  if (typeof argScalar !== 'number')
    return this.mulLocal$1$bailout(1, argScalar, 0);
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.mulLocal$1$bailout(2, argScalar, t1);
  this.x = t1 * argScalar;
  var t3 = this.y;
  if (typeof t3 !== 'number')
    return this.mulLocal$1$bailout(3, argScalar, t3);
  this.y = t3 * argScalar;
  var t5 = this.z;
  if (typeof t5 !== 'number')
    return this.mulLocal$1$bailout(4, argScalar, t5);
  this.z = t5 * argScalar;
  return this;
},
 mulLocal$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var argScalar = env0;
      break;
    case 2:
      argScalar = env0;
      t1 = env1;
      break;
    case 3:
      argScalar = env0;
      t3 = env1;
      break;
    case 4:
      argScalar = env0;
      t5 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.x;
    case 2:
      state = 0;
      this.x = $.mul(t1, argScalar);
      var t3 = this.y;
    case 3:
      state = 0;
      this.y = $.mul(t3, argScalar);
      var t5 = this.z;
    case 4:
      state = 0;
      this.z = $.mul(t5, argScalar);
      return this;
  }
},
 negateLocal$0: function() {
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.negateLocal$0$bailout(1, t1);
  this.x = -t1;
  var t3 = this.y;
  if (typeof t3 !== 'number')
    return this.negateLocal$0$bailout(2, t3);
  this.y = -t3;
  var t5 = this.z;
  if (typeof t5 !== 'number')
    return this.negateLocal$0$bailout(3, t5);
  this.z = -t5;
  return this;
},
 negateLocal$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      break;
    case 3:
      t5 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      this.x = $.neg(t1);
      var t3 = this.y;
    case 2:
      state = 0;
      this.y = $.neg(t3);
      var t5 = this.z;
    case 3:
      state = 0;
      this.z = $.neg(t5);
      return this;
  }
},
 setZero$0: function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
},
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ', ' + $.S(this.z) + ')';
},
 is$Vector3: true
};

$$.Body = {"":
 ["world", "flags=", "contactList=", "sleepTime=", "userData=", "_linearVelocity", "_angularVelocity", "mass=", "invMass?", "next=", "prev=", "fixtureList", "fixtureCount", "jointList=", "_force?", "_torque=", "_inertia", "invInertia?", "linearDamping?", "angularDamping?", "_type?", "islandIndex!", "originTransform?", "sweep?", "_fixDef", "_pmd", "_pxf", "oldCenter", "tempCenter"],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 createFixture$1: function(def) {
  var fixture = $.Fixture$();
  fixture.create$2(this, def);
  var t1 = this.flags;
  if (t1 !== (t1 | 0))
    return this.createFixture$1$bailout(1, t1, fixture, 0);
  if ((t1 & 32) === 32)
    fixture.createProxy$2(this.world.get$_contactManager().get$broadPhase(), this.originTransform);
  fixture.next = this.fixtureList;
  this.fixtureList = fixture;
  t1 = this.fixtureCount;
  if (typeof t1 !== 'number')
    return this.createFixture$1$bailout(2, t1, fixture, 0);
  this.fixtureCount = t1 + 1;
  fixture.body = this;
  t1 = fixture.density;
  if (typeof t1 !== 'number')
    return this.createFixture$1$bailout(3, t1, fixture, 0);
  if (t1 > 0.0)
    this.resetMassData$0();
  t1 = this.world;
  var t2 = t1.get$_flags();
  if (t2 !== (t2 | 0))
    return this.createFixture$1$bailout(4, t2, fixture, t1);
  t1.set$_flags((t2 | 1) >>> 0);
  return fixture;
},
 createFixture$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      fixture = env1;
      break;
    case 2:
      t1 = env0;
      fixture = env1;
      break;
    case 3:
      t1 = env0;
      fixture = env1;
      break;
    case 4:
      t2 = env0;
      fixture = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var fixture = $.Fixture$();
      fixture.create$2(this, def);
      var t1 = this.flags;
    case 1:
      state = 0;
      if ($.eqB($.and(t1, 32), 32))
        fixture.createProxy$2(this.world.get$_contactManager().get$broadPhase(), this.originTransform);
      fixture.next = this.fixtureList;
      this.fixtureList = fixture;
      t1 = this.fixtureCount;
    case 2:
      state = 0;
      this.fixtureCount = $.add(t1, 1);
      fixture.body = this;
      t1 = fixture.density;
    case 3:
      state = 0;
      if ($.gtB(t1, 0.0))
        this.resetMassData$0();
      t1 = this.world;
      var t2 = t1.get$_flags();
    case 4:
      state = 0;
      t1.set$_flags($.or(t2, 1));
      return fixture;
  }
},
 createFixtureFromShape$2: function(shape, density) {
  var t1 = this._fixDef;
  t1.set$shape(shape);
  t1.set$density(density);
  return this.createFixture$1(t1);
},
 createFixtureFromShape$1: function(shape) {
  return this.createFixtureFromShape$2(shape,0)
},
 get$position: function() {
  return this.originTransform.get$position();
},
 get$angle: function() {
  return this.sweep.get$angle();
},
 get$worldCenter: function() {
  return this.sweep.get$center();
},
 get$localCenter: function() {
  return this.sweep.get$localCenter();
},
 get$linearVelocity: function() {
  return this._linearVelocity;
},
 set$linearVelocity: function(v) {
  if ($.eqB(this._type, 0))
    return;
  if ($.gtB($.add($.mul(v.get$x(), v.get$x()), $.mul(v.get$y(), v.get$y())), 0.0))
    this.set$awake(true);
  this._linearVelocity.setFrom$1(v);
},
 get$angularVelocity: function() {
  return this._angularVelocity;
},
 set$angularVelocity: function(w) {
  if (!$.eqB(this._type, 0)) {
    if ($.gtB($.mul(w, w), 0))
      this.set$awake(true);
    this._angularVelocity = w;
  }
},
 get$inertia: function() {
  var t1 = this._inertia;
  var t2 = this.mass;
  var t3 = this.sweep;
  return $.add(t1, $.mul(t2, $.add($.mul(t3.get$localCenter().get$x(), t3.get$localCenter().get$x()), $.mul(t3.get$localCenter().get$y(), t3.get$localCenter().get$y()))));
},
 getMassData$1: function(data) {
  data.set$mass(this.mass);
  var lc = this.sweep.localCenter;
  var t1 = this._inertia;
  if (typeof t1 !== 'number')
    return this.getMassData$1$bailout(1, data, t1, lc, 0, 0);
  var t3 = this.mass;
  if (typeof t3 !== 'number')
    return this.getMassData$1$bailout(2, data, t1, t3, lc, 0);
  var t5 = lc.get$lengthSquared();
  if (typeof t5 !== 'number')
    return this.getMassData$1$bailout(3, data, t1, t3, t5, lc);
  data.set$inertia(t1 + t3 * t5);
  var t7 = lc.get$x();
  data.get$center().set$x(t7);
  t7 = lc.get$y();
  data.get$center().set$y(t7);
},
 getMassData$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var data = env0;
      t1 = env1;
      lc = env2;
      break;
    case 2:
      data = env0;
      t1 = env1;
      t3 = env2;
      lc = env3;
      break;
    case 3:
      data = env0;
      t1 = env1;
      t3 = env2;
      t5 = env3;
      lc = env4;
      break;
  }
  switch (state) {
    case 0:
      data.set$mass(this.mass);
      var lc = this.sweep.get$localCenter();
      var t1 = this._inertia;
    case 1:
      state = 0;
      var t3 = this.mass;
    case 2:
      state = 0;
      var t5 = lc.get$lengthSquared();
    case 3:
      state = 0;
      data.set$inertia($.add(t1, $.mul(t3, t5)));
      var t7 = lc.get$x();
      data.get$center().set$x(t7);
      t7 = lc.get$y();
      data.get$center().set$y(t7);
  }
},
 resetMassData$0: function() {
  this.mass = 0.0;
  this.invMass = 0.0;
  this._inertia = 0.0;
  this.invInertia = 0.0;
  var t1 = this.sweep;
  t1.get$localCenter().setZero$0();
  if ($.eqB(this._type, 0) || $.eqB(this._type, 1)) {
    var t2 = t1.get$center();
    var t3 = this.originTransform;
    t2.setFrom$1(t3.get$position());
    t1.get$centerZero().setFrom$1(t3.get$position());
    return;
  }
  t2 = this.tempCenter;
  t2.setZero$0();
  var massData = this._pmd;
  for (var f = this.fixtureList; !(f == null); f = f.get$next()) {
    if ($.eqB(f.get$density(), 0.0))
      continue;
    f.getMassData$1(massData);
    this.mass = $.add(this.mass, massData.get$mass());
    var temp = $.Vector$copy(massData.get$center());
    temp.mulLocal$1(massData.get$mass());
    t2.addLocal$1(temp);
    this._inertia = $.add(this._inertia, massData.get$inertia());
  }
  if ($.gtB(this.mass, 0.0)) {
    t3 = this.mass;
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    this.invMass = 1.0 / t3;
    t2.mulLocal$1(this.invMass);
  } else {
    this.mass = 1.0;
    this.invMass = 1.0;
  }
  if ($.gtB(this._inertia, 0.0) && $.eqB($.and(this.flags, 16), 0)) {
    this._inertia = $.sub(this._inertia, $.mul(this.mass, $.add($.mul(t2.get$x(), t2.get$x()), $.mul(t2.get$y(), t2.get$y()))));
    t3 = this._inertia;
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    this.invInertia = 1.0 / t3;
  } else {
    this._inertia = 0.0;
    this.invInertia = 0.0;
  }
  t3 = this.oldCenter;
  t3.setFrom$1(t1.get$center());
  t1.get$localCenter().setFrom$1(t2);
  $.Transform_mulToOut(this.originTransform, t1.get$localCenter(), t1.get$centerZero());
  t1.get$center().setFrom$1(t1.get$centerZero());
  temp = $.Vector$copy(t1.get$center());
  temp.subLocal$1(t3);
  $.Vector_crossNumAndVectorToOut(this._angularVelocity, temp, temp);
  this._linearVelocity.addLocal$1(temp);
},
 getWorldPoint$1: function(localPoint) {
  var v = $.Vector$(0, 0);
  this.getWorldPointToOut$2(localPoint, v);
  return v;
},
 getWorldPointToOut$2: function(localPoint, out) {
  $.Transform_mulToOut(this.originTransform, localPoint, out);
},
 getWorldVector$1: function(localVector) {
  var out = $.Vector$(0, 0);
  this.getWorldVectorToOut$2(localVector, out);
  return out;
},
 getWorldVectorToOut$2: function(localVector, out) {
  $.Matrix22_mulMatrixAndVectorToOut(this.originTransform.get$rotation(), localVector, out);
},
 getLocalPointToOut$2: function(worldPoint, out) {
  $.Transform_mulTransToOut(this.originTransform, worldPoint, out);
},
 getLocalPoint$1: function(worldPoint) {
  var out = $.Vector$(0, 0);
  this.getLocalPointToOut$2(worldPoint, out);
  return out;
},
 get$type: function() {
  return this._type;
},
 set$type: function(otherType) {
  if ($.eqB(this._type, otherType))
    return;
  this._type = otherType;
  this.resetMassData$0();
  if ($.eqB(this._type, 0)) {
    this._linearVelocity.setZero$0();
    this._angularVelocity = 0.0;
  }
  this.set$awake(true);
  this._force.setZero$0();
  this._torque = 0.0;
  for (var ce = this.contactList; !(ce == null); ce = ce.get$next())
    ce.get$contact().flagForFiltering$0();
},
 get$bullet: function() {
  return $.eq($.and(this.flags, 8), 8);
},
 set$bullet: function(flag) {
  var t1 = flag === true;
  var t2 = this.flags;
  if (t1)
    this.flags = $.or(t2, 8);
  else
    this.flags = $.and(t2, -9);
},
 set$awake: function(flag) {
  if (flag === true) {
    if ($.eqB($.and(this.flags, 2), 0)) {
      this.flags = $.or(this.flags, 2);
      this.sleepTime = 0.0;
    }
  } else {
    this.flags = $.and(this.flags, -3);
    this.sleepTime = 0.0;
    this._linearVelocity.setZero$0();
    this._angularVelocity = 0.0;
    this._force.setZero$0();
    this._torque = 0.0;
  }
},
 get$awake: function() {
  return $.eq($.and(this.flags, 2), 2);
},
 get$active: function() {
  return $.eq($.and(this.flags, 32), 32);
},
 get$fixedRotation: function() {
  return $.eq($.and(this.flags, 16), 16);
},
 synchronizeFixtures$0: function() {
  var xf1 = this._pxf;
  var t1 = xf1.get$rotation();
  var t2 = this.sweep;
  t1.setAngle$1(t2.get$angleZero());
  $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), t2.get$localCenter(), xf1.get$position());
  xf1.get$position().mulLocal$1(-1);
  xf1.get$position().addLocal$1(t2.get$centerZero());
  var broadPhase = this.world.get$_contactManager().get$broadPhase();
  for (var f = this.fixtureList, t1 = this.originTransform; !(f == null); f = f.get$next())
    f.synchronize$3(broadPhase, xf1, t1);
},
 synchronizeTransform$0: function() {
  var t1 = this.sweep;
  var c = $.cos(t1.angle);
  var s = $.sin(t1.angle);
  var t = this.originTransform;
  var r = t.rotation;
  var p = t.position;
  r.get$col1().set$x(c);
  var t2 = -s;
  r.get$col2().set$x(t2);
  r.get$col1().set$y(s);
  r.get$col2().set$y(c);
  t2 = r.get$col1().get$x();
  if (typeof t2 !== 'number')
    return this.synchronizeTransform$0$bailout(1, t2, r, p, t1, 0, 0);
  var t4 = t1.localCenter;
  var t5 = t4.get$x();
  if (typeof t5 !== 'number')
    return this.synchronizeTransform$0$bailout(2, t2, r, p, t5, t1, 0);
  t5 = t2 * t5;
  t2 = r.get$col2().get$x();
  if (typeof t2 !== 'number')
    return this.synchronizeTransform$0$bailout(3, t1, r, p, t5, t2, 0);
  var t8 = t4.get$y();
  if (typeof t8 !== 'number')
    return this.synchronizeTransform$0$bailout(4, t1, t8, r, p, t5, t2);
  var t10 = (t5 + t2 * t8) * -1;
  var t11 = t1.center;
  var t12 = t11.get$x();
  if (typeof t12 !== 'number')
    return this.synchronizeTransform$0$bailout(5, t1, r, p, t10, t12, 0);
  p.set$x(t10 + t12);
  var t14 = r.get$col1().get$y();
  if (typeof t14 !== 'number')
    return this.synchronizeTransform$0$bailout(6, r, t14, p, t1, 0, 0);
  var t16 = t4.get$x();
  if (typeof t16 !== 'number')
    return this.synchronizeTransform$0$bailout(7, t1, r, t14, p, t16, 0);
  t16 = t14 * t16;
  t14 = r.get$col2().get$y();
  if (typeof t14 !== 'number')
    return this.synchronizeTransform$0$bailout(8, t16, t14, p, t1, 0, 0);
  t4 = t4.get$y();
  if (typeof t4 !== 'number')
    return this.synchronizeTransform$0$bailout(9, t16, t14, p, t4, t1, 0);
  var t20 = (t16 + t14 * t4) * -1;
  t11 = t11.get$y();
  if (typeof t11 !== 'number')
    return this.synchronizeTransform$0$bailout(10, t11, p, t20, 0, 0, 0);
  p.set$y(t20 + t11);
},
 synchronizeTransform$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      t2 = env0;
      r = env1;
      p = env2;
      t1 = env3;
      break;
    case 2:
      t2 = env0;
      r = env1;
      p = env2;
      t4 = env3;
      t1 = env4;
      break;
    case 3:
      t1 = env0;
      r = env1;
      p = env2;
      t4 = env3;
      t2 = env4;
      break;
    case 4:
      t1 = env0;
      t7 = env1;
      r = env2;
      p = env3;
      t4 = env4;
      t2 = env5;
      break;
    case 5:
      t1 = env0;
      r = env1;
      p = env2;
      t9 = env3;
      t10 = env4;
      break;
    case 6:
      r = env0;
      t12 = env1;
      p = env2;
      t1 = env3;
      break;
    case 7:
      t1 = env0;
      r = env1;
      t12 = env2;
      p = env3;
      t14 = env4;
      break;
    case 8:
      t14 = env0;
      t12 = env1;
      p = env2;
      t1 = env3;
      break;
    case 9:
      t14 = env0;
      t12 = env1;
      p = env2;
      t17 = env3;
      t1 = env4;
      break;
    case 10:
      t20 = env0;
      p = env1;
      t19 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.sweep;
      var c = $.cos(t1.get$angle());
      var s = $.sin(t1.get$angle());
      var t = this.originTransform;
      var r = t.get$rotation();
      var p = t.get$position();
      r.get$col1().set$x(c);
      var t2 = -s;
      r.get$col2().set$x(t2);
      r.get$col1().set$y(s);
      r.get$col2().set$y(c);
      t2 = r.get$col1().get$x();
    case 1:
      state = 0;
      var t4 = t1.get$localCenter().get$x();
    case 2:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = r.get$col2().get$x();
    case 3:
      state = 0;
      var t7 = t1.get$localCenter().get$y();
    case 4:
      state = 0;
      var t9 = $.mul($.add(t4, $.mul(t2, t7)), -1);
      var t10 = t1.get$center().get$x();
    case 5:
      state = 0;
      p.set$x($.add(t9, t10));
      var t12 = r.get$col1().get$y();
    case 6:
      state = 0;
      var t14 = t1.get$localCenter().get$x();
    case 7:
      state = 0;
      t14 = $.mul(t12, t14);
      t12 = r.get$col2().get$y();
    case 8:
      state = 0;
      var t17 = t1.get$localCenter().get$y();
    case 9:
      state = 0;
      var t19 = $.mul($.add(t14, $.mul(t12, t17)), -1);
      var t20 = t1.get$center().get$y();
    case 10:
      state = 0;
      p.set$y($.add(t19, t20));
  }
},
 shouldCollide$1: function(other) {
  return !(!$.eqB(this._type, 2) && !$.eqB(other.get$_type(), 2));
},
 advance$1: function(t) {
  var t1 = this.sweep;
  t1.advance$1(t);
  t1.get$center().setFrom$1(t1.get$centerZero());
  t1.set$angle(t1.get$angleZero());
  this.synchronizeTransform$0();
},
 Body$2: function(bd, world) {
  if (bd.get$bullet() === true)
    this.flags = $.or(this.flags, 8);
  if (bd.get$fixedRotation() === true)
    this.flags = $.or(this.flags, 16);
  if (bd.get$allowSleep() === true)
    this.flags = $.or(this.flags, 4);
  if (bd.get$awake() === true)
    this.flags = $.or(this.flags, 2);
  if (bd.get$active() === true)
    this.flags = $.or(this.flags, 32);
  var t1 = this.originTransform;
  t1.get$position().setFrom$1(bd.get$position());
  t1.get$rotation().setAngle$1(bd.get$angle());
  var t2 = this.sweep;
  t2.get$localCenter().setZero$0();
  $.Transform_mulToOut(t1, t2.get$localCenter(), t2.get$centerZero());
  t2.get$center().setFrom$1(t2.get$centerZero());
  t2.set$angle(bd.get$angle());
  t2.set$angleZero(bd.get$angle());
  if ($.eqB(this._type, 2)) {
    this.mass = 1;
    this.invMass = 1;
  } else {
    this.mass = 0;
    this.invMass = 0;
  }
}
};

$$.BodyDef = {"":
 ["type=", "angle=", "userData=", "position?", "linearVelocity=", "angularVelocity=", "fixedRotation?", "isSleeping", "bullet=", "allowSleep?", "linearDamping?", "angularDamping?", "awake=", "active?"],
 "super": "Object"
};

$$.ContactManager = {"":
 ["broadPhase?", "contactList=", "contactCount?", "contactFilter", "contactListener?", "pool"],
 "super": "Object",
 addPair$2: function(fixtureA, fixtureB) {
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  if (bodyA == null ? bodyB == null : bodyA === bodyB)
    return;
  var edge = bodyB.get$contactList();
  for (; !(edge == null);) {
    if ($.eqB(edge.get$other(), bodyA)) {
      var fA = edge.get$contact().get$fixtureA();
      var fB = edge.get$contact().get$fixtureB();
      if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB))
        return;
      if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA))
        return;
    }
    edge = edge.get$next();
  }
  var t1 = bodyB.shouldCollide$1(bodyA);
  if (typeof t1 !== 'boolean')
    return this.addPair$2$bailout(1, fixtureA, fixtureB, t1);
  if (!t1)
    return;
  t1 = this.contactFilter;
  t1 = t1.shouldCollide$2(fixtureA, fixtureB);
  if (typeof t1 !== 'boolean')
    return this.addPair$2$bailout(2, fixtureA, fixtureB, t1);
  t1 = !t1;
  if (t1)
    return;
  var c = this.pool.popContact$2(fixtureA, fixtureB);
  fixtureA = c.get$fixtureA();
  fixtureB = c.get$fixtureB();
  bodyA = fixtureA.get$body();
  bodyB = fixtureB.get$body();
  c.set$prev(null);
  c.set$next(this.contactList);
  t1 = this.contactList;
  if (!(t1 == null))
    t1.set$prev(c);
  this.contactList = c;
  c.get$edge1().set$contact(c);
  c.get$edge1().set$other(bodyB);
  c.get$edge1().set$prev(null);
  t1 = bodyA.get$contactList();
  c.get$edge1().set$next(t1);
  if (!(bodyA.get$contactList() == null)) {
    t1 = c.get$edge1();
    bodyA.get$contactList().set$prev(t1);
  }
  bodyA.set$contactList(c.get$edge1());
  c.get$edge2().set$contact(c);
  c.get$edge2().set$other(bodyA);
  c.get$edge2().set$prev(null);
  t1 = bodyB.get$contactList();
  c.get$edge2().set$next(t1);
  if (!(bodyB.get$contactList() == null)) {
    t1 = c.get$edge2();
    bodyB.get$contactList().set$prev(t1);
  }
  bodyB.set$contactList(c.get$edge2());
  t1 = this.contactCount;
  if (typeof t1 !== 'number')
    return this.addPair$2$bailout(3, t1, 0, 0);
  this.contactCount = t1 + 1;
},
 addPair$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var fixtureA = env0;
      var fixtureB = env1;
      t1 = env2;
      break;
    case 2:
      fixtureA = env0;
      fixtureB = env1;
      t1 = env2;
      break;
    case 3:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var bodyA = fixtureA.get$body();
      var bodyB = fixtureB.get$body();
      if (bodyA == null ? bodyB == null : bodyA === bodyB)
        return;
      var edge = bodyB.get$contactList();
      for (; !(edge == null);) {
        if ($.eqB(edge.get$other(), bodyA)) {
          var fA = edge.get$contact().get$fixtureA();
          var fB = edge.get$contact().get$fixtureB();
          if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB))
            return;
          if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA))
            return;
        }
        edge = edge.get$next();
      }
      var t1 = bodyB.shouldCollide$1(bodyA);
    case 1:
      state = 0;
      if ($.eqB(t1, false))
        return;
      t1 = this.contactFilter;
    case 2:
      if (state === 2 || state === 0 && !(t1 === null))
        switch (state) {
          case 0:
            t1 = t1.shouldCollide$2(fixtureA, fixtureB);
          case 2:
            state = 0;
            t1 = $.eqB(t1, false);
        }
      else
        t1 = false;
      if (t1)
        return;
      var c = this.pool.popContact$2(fixtureA, fixtureB);
      fixtureA = c.get$fixtureA();
      fixtureB = c.get$fixtureB();
      bodyA = fixtureA.get$body();
      bodyB = fixtureB.get$body();
      c.set$prev(null);
      c.set$next(this.contactList);
      t1 = this.contactList;
      if (!(t1 == null))
        t1.set$prev(c);
      this.contactList = c;
      c.get$edge1().set$contact(c);
      c.get$edge1().set$other(bodyB);
      c.get$edge1().set$prev(null);
      t1 = bodyA.get$contactList();
      c.get$edge1().set$next(t1);
      if (!(bodyA.get$contactList() == null)) {
        t1 = c.get$edge1();
        bodyA.get$contactList().set$prev(t1);
      }
      bodyA.set$contactList(c.get$edge1());
      c.get$edge2().set$contact(c);
      c.get$edge2().set$other(bodyA);
      c.get$edge2().set$prev(null);
      t1 = bodyB.get$contactList();
      c.get$edge2().set$next(t1);
      if (!(bodyB.get$contactList() == null)) {
        t1 = c.get$edge2();
        bodyB.get$contactList().set$prev(t1);
      }
      bodyB.set$contactList(c.get$edge2());
      t1 = this.contactCount;
    case 3:
      state = 0;
      this.contactCount = $.add(t1, 1);
  }
},
 findNewContacts$0: function() {
  this.broadPhase.updatePairs$1(this);
},
 destroy$1: function(c) {
  var fixtureA = c.get$fixtureA();
  var fixtureB = c.get$fixtureB();
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  var t1 = this.contactListener;
  if (!(t1 == null) && c.get$touching() === true)
    t1.endContact$1(c);
  if (!(c.get$prev() == null)) {
    t1 = c.get$next();
    c.get$prev().set$next(t1);
  }
  if (!(c.get$next() == null)) {
    t1 = c.get$prev();
    c.get$next().set$prev(t1);
  }
  if ($.eqB(c, this.contactList))
    this.contactList = c.get$next();
  if (!(c.get$edge1().get$prev() == null)) {
    t1 = c.get$edge1().get$next();
    c.get$edge1().get$prev().set$next(t1);
  }
  if (!(c.get$edge1().get$next() == null)) {
    t1 = c.get$edge1().get$prev();
    c.get$edge1().get$next().set$prev(t1);
  }
  if ($.eqB(c.get$edge1(), bodyA.get$contactList()))
    bodyA.set$contactList(c.get$edge1().get$next());
  if (!(c.get$edge2().get$prev() == null)) {
    t1 = c.get$edge2().get$next();
    c.get$edge2().get$prev().set$next(t1);
  }
  if (!(c.get$edge2().get$next() == null)) {
    t1 = c.get$edge2().get$prev();
    c.get$edge2().get$next().set$prev(t1);
  }
  if ($.eqB(c.get$edge2(), bodyB.get$contactList()))
    bodyB.set$contactList(c.get$edge2().get$next());
  this.pool.pushContact$1(c);
  t1 = this.contactCount;
  if (typeof t1 !== 'number')
    return this.destroy$1$bailout(1, t1);
  this.contactCount = t1 - 1;
},
 destroy$1$bailout: function(state, t1) {
  this.contactCount = $.sub(t1, 1);
},
 collide$0: function() {
  var c = this.contactList;
  for (var t1 = this.contactFilter, t2 = !(t1 === null), t3 = this.broadPhase, t4 = this.contactListener; !(c == null);) {
    var fixtureA = c.get$fixtureA();
    var fixtureB = c.get$fixtureB();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    if ($.eqB(bodyA.get$awake(), false) && $.eqB(bodyB.get$awake(), false)) {
      c = c.get$next();
      continue;
    }
    if ($.eqB($.and(c.get$flags(), 8), 8)) {
      if ($.eqB(bodyB.shouldCollide$1(bodyA), false)) {
        var c0 = c.get$next();
        this.destroy$1(c);
        c = c0;
        continue;
      }
      if (t2 && $.eqB(t1.shouldCollide$2(fixtureA, fixtureB), false)) {
        c0 = c.get$next();
        this.destroy$1(c);
        c = c0;
        continue;
      }
      c.set$flags($.and(c.get$flags(), -9));
    }
    if ($.eqB(t3.testOverlap$2(fixtureA.get$proxy(), fixtureB.get$proxy()), false)) {
      c0 = c.get$next();
      this.destroy$1(c);
      c = c0;
      continue;
    }
    c.update$1(t4);
    c = c.get$next();
  }
}
};

$$.Filter = {"":
 ["categoryBits=", "maskBits=", "groupIndex="],
 "super": "Object",
 setFrom$1: function(other) {
  this.categoryBits = other.get$categoryBits();
  this.maskBits = other.get$maskBits();
  this.groupIndex = other.get$groupIndex();
}
};

$$.Fixture = {"":
 ["box?", "density=", "next=", "body?", "shape=", "friction=", "restitution=", "proxy?", "filter?", "isSensor?", "userData=", "_poolOne", "_poolTwo"],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 create$2: function(b, def) {
  this.userData = def.get$userData();
  this.friction = def.get$friction();
  this.restitution = def.get$restitution();
  this.body = b;
  this.next = null;
  this.filter.setFrom$1(def.get$filter());
  this.isSensor = def.get$isSensor();
  this.shape = def.get$shape().clone$0();
  this.density = def.get$density();
},
 createProxy$2: function(broadPhase, xf) {
  var t1 = this.shape;
  var t2 = this.box;
  t1.computeAxisAlignedBox$2(t2, xf);
  this.proxy = broadPhase.createProxy$2(t2, this);
},
 synchronize$3: function(broadPhase, transformOne, transformTwo) {
  if (this.proxy == null)
    return;
  var t1 = this.shape;
  var t2 = this._poolOne;
  t1.computeAxisAlignedBox$2(t2, transformOne);
  t1 = this.shape;
  var t3 = this._poolTwo;
  t1.computeAxisAlignedBox$2(t3, transformTwo);
  t1 = t2.lowerBound;
  var t4 = t1.get$x();
  if (typeof t4 !== 'number')
    return this.synchronize$3$bailout(1, broadPhase, transformOne, transformTwo, t4, t2, t3, 0, 0);
  var t6 = t3.lowerBound;
  var t7 = t6.get$x();
  if (typeof t7 !== 'number')
    return this.synchronize$3$bailout(2, broadPhase, transformOne, transformTwo, t4, t2, t7, t3, 0);
  t4 = t4 < t7 ? t1.get$x() : t6.get$x();
  var t5 = this.box;
  t7 = t5.lowerBound;
  t7.set$x(t4);
  t4 = t1.get$y();
  if (typeof t4 !== 'number')
    return this.synchronize$3$bailout(3, broadPhase, t5, transformTwo, transformOne, t2, t3, t4, 0);
  var t9 = t6.get$y();
  if (typeof t9 !== 'number')
    return this.synchronize$3$bailout(4, broadPhase, t5, transformTwo, transformOne, t9, t2, t3, t4);
  t7.set$y(t4 < t9 ? t1.get$y() : t6.get$y());
  t4 = t2.upperBound;
  t6 = t4.get$x();
  if (typeof t6 !== 'number')
    return this.synchronize$3$bailout(5, broadPhase, t5, transformTwo, transformOne, t6, t2, t3, 0);
  var t8 = t3.upperBound;
  t9 = t8.get$x();
  if (typeof t9 !== 'number')
    return this.synchronize$3$bailout(6, broadPhase, t5, transformTwo, transformOne, t6, t9, t2, t3);
  t6 = t6 > t9 ? t4.get$x() : t8.get$x();
  t7 = t5.upperBound;
  t7.set$x(t6);
  t6 = t4.get$y();
  if (typeof t6 !== 'number')
    return this.synchronize$3$bailout(7, broadPhase, t5, transformTwo, transformOne, t2, t3, t6, 0);
  var t10 = t8.get$y();
  if (typeof t10 !== 'number')
    return this.synchronize$3$bailout(8, broadPhase, t5, transformTwo, transformOne, t2, t3, t6, t10);
  t7.set$y(t6 > t10 ? t4.get$y() : t8.get$y());
  t2 = transformTwo.get$position().get$x();
  if (typeof t2 !== 'number')
    return this.synchronize$3$bailout(9, broadPhase, t5, t1, transformTwo, transformOne, t2, 0, 0);
  t4 = transformOne.get$position().get$x();
  if (typeof t4 !== 'number')
    return this.synchronize$3$bailout(10, broadPhase, t5, t1, transformTwo, transformOne, t4, t2, 0);
  t1.set$x(t2 - t4);
  t7 = transformTwo.get$position().get$y();
  if (typeof t7 !== 'number')
    return this.synchronize$3$bailout(11, broadPhase, t5, t1, t7, transformOne, 0, 0, 0);
  t9 = transformOne.get$position().get$y();
  if (typeof t9 !== 'number')
    return this.synchronize$3$bailout(12, broadPhase, t5, t1, t7, t9, 0, 0, 0);
  t1.set$y(t7 - t9);
  broadPhase.moveProxy$3(this.proxy, t5, t1);
},
 synchronize$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var broadPhase = env0;
      var transformOne = env1;
      var transformTwo = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 2:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t1 = env3;
      t2 = env4;
      t5 = env5;
      t3 = env6;
      break;
    case 3:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t2 = env4;
      t3 = env5;
      t1 = env6;
      break;
    case 4:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t6 = env4;
      t2 = env5;
      t3 = env6;
      t1 = env7;
      break;
    case 5:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      break;
    case 6:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t1 = env4;
      t6 = env5;
      t2 = env6;
      t3 = env7;
      break;
    case 7:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t2 = env4;
      t3 = env5;
      t1 = env6;
      break;
    case 8:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t2 = env4;
      t3 = env5;
      t1 = env6;
      t6 = env7;
      break;
    case 9:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      transformTwo = env3;
      transformOne = env4;
      t2 = env5;
      break;
    case 10:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      transformTwo = env3;
      transformOne = env4;
      t3 = env5;
      t2 = env6;
      break;
    case 11:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      t6 = env3;
      transformOne = env4;
      break;
    case 12:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      t6 = env3;
      t8 = env4;
      break;
  }
  switch (state) {
    case 0:
      if (this.proxy == null)
        return;
      var t1 = this.shape;
      var t2 = this._poolOne;
      t1.computeAxisAlignedBox$2(t2, transformOne);
      t1 = this.shape;
      var t3 = this._poolTwo;
      t1.computeAxisAlignedBox$2(t3, transformTwo);
      t1 = t2.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t5 = t3.get$lowerBound().get$x();
    case 2:
      state = 0;
      t1 = $.ltB(t1, t5) ? t2.get$lowerBound().get$x() : t3.get$lowerBound().get$x();
      var t4 = this.box;
      t4.get$lowerBound().set$x(t1);
      t1 = t2.get$lowerBound().get$y();
    case 3:
      state = 0;
      var t6 = t3.get$lowerBound().get$y();
    case 4:
      state = 0;
      t1 = $.ltB(t1, t6) ? t2.get$lowerBound().get$y() : t3.get$lowerBound().get$y();
      t4.get$lowerBound().set$y(t1);
      t1 = t2.get$upperBound().get$x();
    case 5:
      state = 0;
      t6 = t3.get$upperBound().get$x();
    case 6:
      state = 0;
      t1 = $.gtB(t1, t6) ? t2.get$upperBound().get$x() : t3.get$upperBound().get$x();
      t4.get$upperBound().set$x(t1);
      t1 = t2.get$upperBound().get$y();
    case 7:
      state = 0;
      t6 = t3.get$upperBound().get$y();
    case 8:
      state = 0;
      t1 = $.gtB(t1, t6) ? t2.get$upperBound().get$y() : t3.get$upperBound().get$y();
      t4.get$upperBound().set$y(t1);
      var disp = t2.get$lowerBound();
      t2 = transformTwo.get$position().get$x();
    case 9:
      state = 0;
      t3 = transformOne.get$position().get$x();
    case 10:
      state = 0;
      disp.set$x($.sub(t2, t3));
      t6 = transformTwo.get$position().get$y();
    case 11:
      state = 0;
      var t8 = transformOne.get$position().get$y();
    case 12:
      state = 0;
      disp.set$y($.sub(t6, t8));
      broadPhase.moveProxy$3(this.proxy, t4, disp);
  }
},
 getMassData$1: function(massData) {
  this.shape.computeMass$2(massData, this.density);
},
 get$type: function() {
  return this.shape.get$type();
}
};

$$.FixtureDef = {"":
 ["shape=", "userData=", "friction=", "restitution=", "density=", "isSensor?", "filter?"],
 "super": "Object",
 FixtureDef$0: function() {
  var t1 = this.filter;
  t1.set$categoryBits(1);
  t1.set$maskBits(65535);
  t1.set$groupIndex(0);
}
};

$$.Island = {"":
 ["listener", "bodies?", "contacts", "joints?", "positions", "velocities", "bodyCount?", "jointCount", "contactCount?", "bodyCapacity", "contactCapacity", "jointCapacity", "positionIterationCount", "_contactSolver", "_translation", "impulse"],
 "super": "Object",
 init$4: function(argBodyCapacity, argContactCapacity, argJointCapacity, argListener) {
  this.bodyCapacity = argBodyCapacity;
  this.contactCapacity = argContactCapacity;
  this.jointCapacity = argJointCapacity;
  this.bodyCount = 0;
  this.contactCount = 0;
  this.listener = argListener;
  var t1 = this.bodies;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1)))
    this.bodies = $.ListImplementation_List(this.bodyCapacity, 'Body');
  t1 = this.contacts;
  if (t1 == null || $.gtB(this.contactCapacity, $.get$length(t1)))
    this.contacts = $.ListImplementation_List(this.contactCapacity, 'Contact');
  t1 = this.joints;
  if (t1 == null || $.gtB(this.jointCapacity, $.get$length(t1)))
    this.joints = $.ListImplementation_List(this.jointCapacity, 'Joint');
  t1 = this.velocities;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
    var old = this.velocities;
    if (old == null)
      old = $.ListImplementation_List(0, 'Velocity');
    this.velocities = $.ListImplementation_List(this.bodyCapacity, 'Velocity');
    $.setRange$3(this.velocities, 0, $.get$length(old), old);
    var i = $.get$length(old);
    if (i !== (i | 0))
      return this.init$4$bailout(1, i);
    for (; $.ltB(i, $.get$length(this.velocities)); ++i)
      $.indexSet(this.velocities, i, $.Velocity$());
  }
  t1 = this.positions;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
    old = this.positions;
    if (old == null)
      old = $.ListImplementation_List(0, 'Position');
    this.positions = $.ListImplementation_List(this.bodyCapacity, 'Position');
    $.setRange$3(this.positions, 0, $.get$length(old), old);
    i = $.get$length(old);
    if (i !== (i | 0))
      return this.init$4$bailout(2, i);
    for (; $.ltB(i, $.get$length(this.positions)); ++i)
      $.indexSet(this.positions, i, $.Position$());
  }
},
 init$4$bailout: function(state, env0) {
  switch (state) {
    case 1:
      i = env0;
      break;
    case 2:
      i = env0;
      break;
  }
  switch (state) {
    case 0:
      this.bodyCapacity = argBodyCapacity;
      this.contactCapacity = argContactCapacity;
      this.jointCapacity = argJointCapacity;
      this.bodyCount = 0;
      this.contactCount = 0;
      this.listener = argListener;
      var t1 = this.bodies;
      if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1)))
        this.bodies = $.ListImplementation_List(this.bodyCapacity, 'Body');
      t1 = this.contacts;
      if (t1 == null || $.gtB(this.contactCapacity, $.get$length(t1)))
        this.contacts = $.ListImplementation_List(this.contactCapacity, 'Contact');
      t1 = this.joints;
      if (t1 == null || $.gtB(this.jointCapacity, $.get$length(t1)))
        this.joints = $.ListImplementation_List(this.jointCapacity, 'Joint');
      t1 = this.velocities;
    case 1:
      if (state === 1 || state === 0 && (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))))
        switch (state) {
          case 0:
            var old = this.velocities;
            if (old == null)
              old = $.ListImplementation_List(0, 'Velocity');
            this.velocities = $.ListImplementation_List(this.bodyCapacity, 'Velocity');
            $.setRange$3(this.velocities, 0, $.get$length(old), old);
            var i = $.get$length(old);
          case 1:
            state = 0;
            for (; $.ltB(i, $.get$length(this.velocities)); i = $.add(i, 1))
              $.indexSet(this.velocities, i, $.Velocity$());
        }
      t1 = this.positions;
    case 2:
      if (state === 2 || state === 0 && (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))))
        switch (state) {
          case 0:
            old = this.positions;
            if (old == null)
              old = $.ListImplementation_List(0, 'Position');
            this.positions = $.ListImplementation_List(this.bodyCapacity, 'Position');
            $.setRange$3(this.positions, 0, $.get$length(old), old);
            i = $.get$length(old);
          case 2:
            state = 0;
            for (; $.ltB(i, $.get$length(this.positions)); i = $.add(i, 1))
              $.indexSet(this.positions, i, $.Position$());
        }
  }
},
 clear$0: function() {
  this.bodyCount = 0;
  this.contactCount = 0;
  this.jointCount = 0;
},
 solve$3: function(step, gravity, allowSleep) {
  var i = 0;
  while (true) {
    var t1 = this.bodyCount;
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(1, step, gravity, allowSleep, t1, i, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    c$0: {
      t1 = this.bodies;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
        return this.solve$3$bailout(2, step, gravity, allowSleep, i, t1, 0, 0, 0, 0, 0, 0);
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      var b = t1[i];
      t1 = b.get$type();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(3, step, gravity, allowSleep, b, t1, i, 0, 0, 0, 0, 0);
      if (!(t1 === 2))
        break c$0;
      t1 = b.get$_force().get$x();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(4, step, gravity, allowSleep, t1, b, i, 0, 0, 0, 0, 0);
      var t3 = b.get$invMass();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(5, step, gravity, allowSleep, t1, t3, b, i, 0, 0, 0, 0);
      t3 = t1 * t3;
      t1 = gravity.get$x();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(6, step, gravity, allowSleep, b, t3, t1, i, 0, 0, 0, 0);
      t1 = t3 + t1;
      t3 = step.get$dt();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(7, step, gravity, allowSleep, b, i, t1, t3, 0, 0, 0, 0);
      t3 = t1 * t3;
      t1 = b.get$_force().get$y();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(8, step, gravity, allowSleep, t1, b, i, t3, 0, 0, 0, 0);
      var t8 = b.get$invMass();
      if (typeof t8 !== 'number')
        return this.solve$3$bailout(9, step, gravity, t8, t1, allowSleep, b, i, t3, 0, 0, 0);
      t8 = t1 * t8;
      t1 = gravity.get$y();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(10, step, gravity, allowSleep, t8, t1, b, i, t3, 0, 0, 0);
      t1 = t8 + t1;
      t8 = step.get$dt();
      if (typeof t8 !== 'number')
        return this.solve$3$bailout(11, step, gravity, allowSleep, t1, t8, b, i, t3, 0, 0, 0);
      var velocityDelta = $.Vector$(t3, t1 * t8);
      b.get$linearVelocity().addLocal$1(velocityDelta);
      t3 = b.get$angularVelocity();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(12, step, gravity, allowSleep, b, i, t3, 0, 0, 0, 0, 0);
      var t13 = step.get$dt();
      if (typeof t13 !== 'number')
        return this.solve$3$bailout(13, step, gravity, allowSleep, b, i, t3, t13, 0, 0, 0, 0);
      var t15 = b.get$invInertia();
      if (typeof t15 !== 'number')
        return this.solve$3$bailout(14, step, gravity, allowSleep, b, i, t3, t13, t15, 0, 0, 0);
      t15 = t13 * t15;
      t13 = b.get$_torque();
      if (typeof t13 !== 'number')
        return this.solve$3$bailout(15, step, t15, t13, allowSleep, gravity, b, i, t3, 0, 0, 0);
      b.set$angularVelocity(t3 + t15 * t13);
      var t18 = step.get$dt();
      if (typeof t18 !== 'number')
        return this.solve$3$bailout(16, step, gravity, allowSleep, b, t18, i, 0, 0, 0, 0, 0);
      var t20 = b.get$linearDamping();
      if (typeof t20 !== 'number')
        return this.solve$3$bailout(17, step, gravity, allowSleep, b, t18, t20, i, 0, 0, 0, 0);
      var a = 1.0 - t18 * t20;
      t1 = a < 1.0;
      if (0.0 > (t1 ? a : 1.0))
        var a1 = 0.0;
      else
        a1 = t1 ? a : 1.0;
      b.get$linearVelocity().mulLocal$1(a1);
      t1 = step.get$dt();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(18, step, gravity, allowSleep, b, t1, i, 0, 0, 0, 0, 0);
      t3 = b.get$angularDamping();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(19, step, gravity, allowSleep, b, t1, i, t3, 0, 0, 0, 0);
      var a2 = 1.0 - t1 * t3;
      var b1 = a2 < 1.0 ? a2 : 1.0;
      t1 = b.get$angularVelocity();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(20, step, gravity, allowSleep, b1, t1, b, i, 0, 0, 0, 0);
      b.set$angularVelocity(t1 * (0.0 > b1 ? 0.0 : b1));
    }
    ++i;
  }
  var i1 = -1;
  var i2 = 0;
  while (true) {
    t1 = this.contactCount;
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(21, step, allowSleep, i1, i2, t1, 0, 0, 0, 0, 0, 0);
    if (!(i2 < t1))
      break;
    t1 = this.contacts;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
      return this.solve$3$bailout(22, step, t1, allowSleep, i1, i2, 0, 0, 0, 0, 0, 0);
    if (i2 < 0 || i2 >= t1.length)
      throw $.ioore(i2);
    var fixtureA = t1[i2].get$fixtureA();
    t3 = this.contacts;
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior))
      return this.solve$3$bailout(23, step, t3, allowSleep, i1, fixtureA, i2, 0, 0, 0, 0, 0);
    if (i2 < 0 || i2 >= t3.length)
      throw $.ioore(i2);
    var fixtureB = t3[i2].get$fixtureB();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    t1 = bodyA.get$type();
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(24, step, allowSleep, i1, i2, bodyB, t1, 0, 0, 0, 0, 0);
    if (!(t1 === 0)) {
      t1 = bodyB.get$type();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(25, step, allowSleep, i1, t1, i2, 0, 0, 0, 0, 0, 0);
      var nonStatic = !(t1 === 0);
    } else
      nonStatic = false;
    if (nonStatic) {
      ++i1;
      t1 = this.contacts;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
        return this.solve$3$bailout(26, step, allowSleep, i1, t1, i2, 0, 0, 0, 0, 0, 0);
      if (i1 < 0 || i1 >= t1.length)
        throw $.ioore(i1);
      var temp = t1[i1];
      if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior)
        return this.solve$3$bailout(27, step, allowSleep, i1, temp, t1, i2, 0, 0, 0, 0, 0);
      var t4 = t1.length;
      if (i2 < 0 || i2 >= t4)
        throw $.ioore(i2);
      var t5 = t1[i2];
      if (i1 < 0 || i1 >= t4)
        throw $.ioore(i1);
      t1[i1] = t5;
      t5 = this.contacts;
      if (typeof t5 !== 'object' || t5 === null || (t5.constructor !== Array || !!t5.immutable$list) && !t5.is$JavaScriptIndexingBehavior)
        return this.solve$3$bailout(28, step, allowSleep, i1, temp, i2, t5, 0, 0, 0, 0, 0);
      if (i2 < 0 || i2 >= t5.length)
        throw $.ioore(i2);
      t5[i2] = temp;
    }
    ++i2;
  }
  var t2 = this._contactSolver;
  t2.init$3(this.contacts, t1, step.get$dtRatio());
  t2.warmStart$0();
  i = 0;
  while (true) {
    t1 = this.jointCount;
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(29, step, allowSleep, i, t2, t1, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    t1 = this.joints;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
      return this.solve$3$bailout(30, step, i, allowSleep, t2, t1, 0, 0, 0, 0, 0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i].initVelocityConstraints$1(step);
    ++i;
  }
  i = 0;
  while (true) {
    t1 = step.get$velocityIterations();
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(31, step, i, allowSleep, t1, t2, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    var j = 0;
    while (true) {
      t1 = this.jointCount;
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(32, step, i, t1, allowSleep, j, t2, 0, 0, 0, 0, 0);
      if (!(j < t1))
        break;
      t1 = this.joints;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
        return this.solve$3$bailout(33, step, i, allowSleep, t1, j, t2, 0, 0, 0, 0, 0);
      if (j < 0 || j >= t1.length)
        throw $.ioore(j);
      t1[j].solveVelocityConstraints$1(step);
      ++j;
    }
    t2.solveVelocityConstraints$0();
    ++i;
  }
  t2.storeImpulses$0();
  temp = $.Vector$(0, 0);
  t1 = this._translation;
  i = 0;
  while (true) {
    t3 = this.bodyCount;
    if (typeof t3 !== 'number')
      return this.solve$3$bailout(34, step, allowSleep, t3, t2, i, t1, temp, 0, 0, 0, 0);
    if (!(i < t3))
      break;
    c$0: {
      t3 = this.bodies;
      if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior))
        return this.solve$3$bailout(35, step, allowSleep, t3, t2, i, t1, temp, 0, 0, 0, 0);
      if (i < 0 || i >= t3.length)
        throw $.ioore(i);
      b = t3[i];
      t3 = b.get$type();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(36, step, allowSleep, b, t3, t2, i, t1, temp, 0, 0, 0);
      if (t3 === 0)
        break c$0;
      t1.setFrom$1(b.get$linearVelocity());
      t1.mulLocal$1(step.get$dt());
      t3 = t1.x;
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(37, step, allowSleep, b, t3, t2, i, t1, temp, 0, 0, 0);
      t3 *= t3;
      t5 = t1.y;
      if (typeof t5 !== 'number')
        return this.solve$3$bailout(39, step, allowSleep, b, t2, i, t1, t3, t5, temp, 0, 0);
      if (t3 + t5 * t5 > 4.0) {
        t3 = $.get$length(t1);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var ratio = 2.0 / t3;
        b.get$linearVelocity().mulLocal$1(ratio);
      }
      t3 = step.get$dt();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(41, step, t3, allowSleep, b, t2, i, t1, temp, 0, 0, 0);
      t5 = b.get$angularVelocity();
      if (typeof t5 !== 'number')
        return this.solve$3$bailout(42, step, t3, t5, allowSleep, b, t2, i, t1, temp, 0, 0);
      var rotation = t3 * t5;
      if (rotation * rotation > 2.4674011002723395) {
        t3 = $.abs(rotation);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        ratio = 1.5707963267948966 / t3;
        t3 = b.get$angularVelocity();
        if (typeof t3 !== 'number')
          return this.solve$3$bailout(43, step, ratio, t3, allowSleep, b, t2, i, t1, temp, 0, 0);
        b.set$angularVelocity(t3 * ratio);
      }
      b.get$sweep().get$centerZero().setFrom$1(b.get$sweep().get$center());
      t3 = b.get$sweep().get$angle();
      b.get$sweep().set$angleZero(t3);
      temp.setFrom$1(b.get$linearVelocity());
      temp.mulLocal$1(step.get$dt());
      b.get$sweep().get$center().addLocal$1(temp);
      t3 = b.get$sweep();
      t4 = t3.get$angle();
      if (typeof t4 !== 'number')
        return this.solve$3$bailout(44, step, allowSleep, b, t3, t4, i, t1, t2, temp, 0, 0);
      var t6 = step.get$dt();
      if (typeof t6 !== 'number')
        return this.solve$3$bailout(45, step, allowSleep, b, t3, t4, i, t6, t2, t1, temp, 0);
      t8 = b.get$angularVelocity();
      if (typeof t8 !== 'number')
        return this.solve$3$bailout(46, step, allowSleep, b, t3, t4, i, t6, t8, t1, temp, t2);
      t3.set$angle(t4 + t6 * t8);
      b.synchronizeTransform$0();
    }
    ++i;
  }
  i = 0;
  while (true) {
    t1 = step.get$positionIterations();
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(47, step, allowSleep, i, t2, t1, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    var contactsOkay = t2.solvePositionConstraints$1(0.2);
    j = 0;
    var jointsOkay = true;
    while (true) {
      t1 = this.jointCount;
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(48, step, allowSleep, t1, i, jointsOkay, t2, contactsOkay, j, 0, 0, 0);
      if (!(j < t1))
        break;
      t1 = this.joints;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
        return this.solve$3$bailout(49, step, allowSleep, t1, i, jointsOkay, t2, contactsOkay, j, 0, 0, 0);
      if (j < 0 || j >= t1.length)
        throw $.ioore(j);
      var jointOkay = t1[j].solvePositionConstraints$1(0.2);
      jointsOkay = jointsOkay && jointOkay === true;
      ++j;
    }
    if (contactsOkay === true && jointsOkay)
      break;
    ++i;
  }
  this.report$1(t2.constraints);
  if (allowSleep === true) {
    var minSleepTime = 99999999999999.0;
    i = 0;
    while (true) {
      t1 = this.bodyCount;
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(50, step, i, t1, minSleepTime, 0, 0, 0, 0, 0, 0, 0);
      if (!(i < t1))
        break;
      c$0: {
        t1 = this.bodies;
        if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
          return this.solve$3$bailout(51, step, i, t1, minSleepTime, 0, 0, 0, 0, 0, 0, 0);
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        b = t1[i];
        t1 = b.get$type();
        if (typeof t1 !== 'number')
          return this.solve$3$bailout(52, step, b, minSleepTime, t1, i, 0, 0, 0, 0, 0, 0);
        if (t1 === 0)
          break c$0;
        t1 = b.get$flags();
        if (t1 !== (t1 | 0))
          return this.solve$3$bailout(53, step, t1, b, minSleepTime, i, 0, 0, 0, 0, 0, 0);
        if ((t1 & 4) === 0) {
          b.set$sleepTime(0.0);
          minSleepTime = 0.0;
        }
        t1 = b.get$flags();
        if (t1 !== (t1 | 0))
          return this.solve$3$bailout(54, step, b, i, minSleepTime, t1, 0, 0, 0, 0, 0, 0);
        if (!((t1 & 4) === 0)) {
          t1 = b.get$angularVelocity();
          if (typeof t1 !== 'number')
            return this.solve$3$bailout(55, step, b, t1, i, minSleepTime, 0, 0, 0, 0, 0, 0);
          t3 = b.get$angularVelocity();
          if (typeof t3 !== 'number')
            return this.solve$3$bailout(56, step, b, t1, i, t3, minSleepTime, 0, 0, 0, 0, 0);
          if (!(t1 * t3 > 0.0012184696791468343)) {
            t1 = b.get$linearVelocity();
            t2 = b.get$linearVelocity();
            t3 = t1.get$x();
            if (typeof t3 !== 'number')
              return this.solve$3$bailout(57, step, t1, t2, t3, b, i, minSleepTime, 0, 0, 0, 0);
            t5 = t2.get$x();
            if (typeof t5 !== 'number')
              return this.solve$3$bailout(58, step, t1, t2, t3, t5, b, i, minSleepTime, 0, 0, 0);
            t5 = t3 * t5;
            t1 = t1.get$y();
            if (typeof t1 !== 'number')
              return this.solve$3$bailout(59, step, t2, b, t5, t1, i, minSleepTime, 0, 0, 0, 0);
            t2 = t2.get$y();
            if (typeof t2 !== 'number')
              return this.solve$3$bailout(60, step, b, t5, t1, i, t2, minSleepTime, 0, 0, 0, 0);
            t8 = t5 + t1 * t2 > 0.0001;
            t1 = t8;
          } else
            t1 = true;
        } else
          t1 = true;
        if (t1) {
          b.set$sleepTime(0.0);
          minSleepTime = 0.0;
        } else {
          t1 = b.get$sleepTime();
          if (typeof t1 !== 'number')
            return this.solve$3$bailout(61, step, b, i, minSleepTime, t1, 0, 0, 0, 0, 0, 0);
          t3 = step.get$dt();
          if (typeof t3 !== 'number')
            return this.solve$3$bailout(62, step, b, i, minSleepTime, t1, t3, 0, 0, 0, 0, 0);
          b.set$sleepTime(t1 + t3);
          minSleepTime = $.min(minSleepTime, b.get$sleepTime());
        }
      }
      ++i;
    }
    if (minSleepTime >= 0.5) {
      i = 0;
      while (true) {
        t1 = this.bodyCount;
        if (typeof t1 !== 'number')
          return this.solve$3$bailout(63, t1, i, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (!(i < t1))
          break;
        t1 = this.bodies;
        if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior))
          return this.solve$3$bailout(64, i, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        t1[i].set$awake(false);
        ++i;
      }
    }
  }
},
 solve$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var step = env0;
      var gravity = env1;
      var allowSleep = env2;
      t1 = env3;
      i = env4;
      break;
    case 2:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      i = env3;
      t1 = env4;
      break;
    case 3:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      break;
    case 4:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      b = env4;
      i = env5;
      break;
    case 5:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      t3 = env4;
      b = env5;
      i = env6;
      break;
    case 6:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t3 = env4;
      t1 = env5;
      i = env6;
      break;
    case 7:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t1 = env5;
      t3 = env6;
      break;
    case 8:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      b = env4;
      i = env5;
      t3 = env6;
      break;
    case 9:
      step = env0;
      gravity = env1;
      t8 = env2;
      t1 = env3;
      allowSleep = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 10:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t8 = env3;
      t1 = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 11:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      t8 = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 12:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t3 = env5;
      break;
    case 13:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t3 = env5;
      t13 = env6;
      break;
    case 14:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t3 = env5;
      t13 = env6;
      t15 = env7;
      break;
    case 15:
      step = env0;
      t15 = env1;
      t13 = env2;
      allowSleep = env3;
      gravity = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 16:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t18 = env4;
      i = env5;
      break;
    case 17:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t18 = env4;
      t20 = env5;
      i = env6;
      break;
    case 18:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      break;
    case 19:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      t3 = env6;
      break;
    case 20:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b1 = env3;
      t1 = env4;
      b = env5;
      i = env6;
      break;
    case 21:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      i2 = env3;
      t1 = env4;
      break;
    case 22:
      step = env0;
      t1 = env1;
      allowSleep = env2;
      i1 = env3;
      i2 = env4;
      break;
    case 23:
      step = env0;
      t3 = env1;
      allowSleep = env2;
      i1 = env3;
      fixtureA = env4;
      i2 = env5;
      break;
    case 24:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      i2 = env3;
      bodyB = env4;
      t1 = env5;
      break;
    case 25:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      t1 = env3;
      i2 = env4;
      break;
    case 26:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      t1 = env3;
      i2 = env4;
      break;
    case 27:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      temp = env3;
      t1 = env4;
      i2 = env5;
      break;
    case 28:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      temp = env3;
      i2 = env4;
      t1 = env5;
      break;
    case 29:
      step = env0;
      allowSleep = env1;
      i = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 30:
      step = env0;
      i = env1;
      allowSleep = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 31:
      step = env0;
      i = env1;
      allowSleep = env2;
      t2 = env3;
      t1 = env4;
      break;
    case 32:
      step = env0;
      i = env1;
      t2 = env2;
      allowSleep = env3;
      j = env4;
      t1 = env5;
      break;
    case 33:
      step = env0;
      i = env1;
      allowSleep = env2;
      t2 = env3;
      j = env4;
      t1 = env5;
      break;
    case 34:
      step = env0;
      allowSleep = env1;
      t3 = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      temp = env6;
      break;
    case 35:
      step = env0;
      allowSleep = env1;
      t3 = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      temp = env6;
      break;
    case 36:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      temp = env7;
      break;
    case 37:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      temp = env7;
      break;
    case 38:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t5 = env4;
      i = env5;
      t2 = env6;
      t1 = env7;
      temp = env8;
      break;
    case 39:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      t5 = env6;
      t3 = env7;
      temp = env8;
      break;
    case 40:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      t5 = env6;
      t8 = env7;
      temp = env8;
      t3 = env9;
      break;
    case 41:
      step = env0;
      t3 = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      temp = env7;
      break;
    case 42:
      step = env0;
      t3 = env1;
      t5 = env2;
      allowSleep = env3;
      b = env4;
      t1 = env5;
      i = env6;
      t2 = env7;
      temp = env8;
      break;
    case 43:
      step = env0;
      ratio = env1;
      t3 = env2;
      allowSleep = env3;
      b = env4;
      t1 = env5;
      i = env6;
      t2 = env7;
      temp = env8;
      break;
    case 44:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t4 = env4;
      i = env5;
      t2 = env6;
      t1 = env7;
      temp = env8;
      break;
    case 45:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t4 = env4;
      i = env5;
      t6 = env6;
      t1 = env7;
      t2 = env8;
      temp = env9;
      break;
    case 46:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t4 = env4;
      i = env5;
      t6 = env6;
      t8 = env7;
      t2 = env8;
      temp = env9;
      t1 = env10;
      break;
    case 47:
      step = env0;
      allowSleep = env1;
      i = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 48:
      step = env0;
      allowSleep = env1;
      t2 = env2;
      i = env3;
      jointsOkay = env4;
      t1 = env5;
      contactsOkay = env6;
      j = env7;
      break;
    case 49:
      step = env0;
      allowSleep = env1;
      t2 = env2;
      i = env3;
      jointsOkay = env4;
      t1 = env5;
      contactsOkay = env6;
      j = env7;
      break;
    case 50:
      step = env0;
      i = env1;
      t1 = env2;
      minSleepTime = env3;
      break;
    case 51:
      step = env0;
      i = env1;
      t1 = env2;
      minSleepTime = env3;
      break;
    case 52:
      step = env0;
      b = env1;
      minSleepTime = env2;
      t1 = env3;
      i = env4;
      break;
    case 53:
      step = env0;
      t1 = env1;
      b = env2;
      minSleepTime = env3;
      i = env4;
      break;
    case 54:
      step = env0;
      b = env1;
      i = env2;
      minSleepTime = env3;
      t1 = env4;
      break;
    case 55:
      step = env0;
      b = env1;
      t1 = env2;
      i = env3;
      minSleepTime = env4;
      break;
    case 56:
      step = env0;
      b = env1;
      t1 = env2;
      i = env3;
      t3 = env4;
      minSleepTime = env5;
      break;
    case 57:
      step = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      b = env4;
      i = env5;
      minSleepTime = env6;
      break;
    case 58:
      step = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t5 = env4;
      b = env5;
      i = env6;
      minSleepTime = env7;
      break;
    case 59:
      step = env0;
      t2 = env1;
      b = env2;
      t5 = env3;
      t1 = env4;
      i = env5;
      minSleepTime = env6;
      break;
    case 60:
      step = env0;
      b = env1;
      t5 = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      minSleepTime = env6;
      break;
    case 61:
      step = env0;
      b = env1;
      i = env2;
      minSleepTime = env3;
      t1 = env4;
      break;
    case 62:
      step = env0;
      b = env1;
      i = env2;
      minSleepTime = env3;
      t1 = env4;
      t3 = env5;
      break;
    case 63:
      t1 = env0;
      i = env1;
      break;
    case 64:
      i = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t1 = this.bodyCount;
            case 1:
              state = 0;
              if (!$.ltB(i, t1))
                break L0;
            default:
              c$0: {
                switch (state) {
                  case 0:
                    t1 = this.bodies;
                  case 2:
                    state = 0;
                    var b = $.index(t1, i);
                    t1 = b.get$type();
                  case 3:
                    state = 0;
                    if (!$.eqB(t1, 2))
                      break c$0;
                    t1 = b.get$_force().get$x();
                  case 4:
                    state = 0;
                    var t3 = b.get$invMass();
                  case 5:
                    state = 0;
                    t3 = $.mul(t1, t3);
                    t1 = gravity.get$x();
                  case 6:
                    state = 0;
                    t1 = $.add(t3, t1);
                    t3 = step.get$dt();
                  case 7:
                    state = 0;
                    t3 = $.mul(t1, t3);
                    t1 = b.get$_force().get$y();
                  case 8:
                    state = 0;
                    var t8 = b.get$invMass();
                  case 9:
                    state = 0;
                    t8 = $.mul(t1, t8);
                    t1 = gravity.get$y();
                  case 10:
                    state = 0;
                    t1 = $.add(t8, t1);
                    t8 = step.get$dt();
                  case 11:
                    state = 0;
                    var velocityDelta = $.Vector$(t3, $.mul(t1, t8));
                    b.get$linearVelocity().addLocal$1(velocityDelta);
                    t3 = b.get$angularVelocity();
                  case 12:
                    state = 0;
                    var t13 = step.get$dt();
                  case 13:
                    state = 0;
                    var t15 = b.get$invInertia();
                  case 14:
                    state = 0;
                    t15 = $.mul(t13, t15);
                    t13 = b.get$_torque();
                  case 15:
                    state = 0;
                    b.set$angularVelocity($.add(t3, $.mul(t15, t13)));
                    var t18 = step.get$dt();
                  case 16:
                    state = 0;
                    var t20 = b.get$linearDamping();
                  case 17:
                    state = 0;
                    t20 = $.mul(t18, t20);
                    if (typeof t20 !== 'number')
                      throw $.iae(t20);
                    var a = 1.0 - t20;
                    t1 = a < 1.0;
                    if (0.0 > (t1 ? a : 1.0))
                      var a1 = 0.0;
                    else
                      a1 = t1 ? a : 1.0;
                    b.get$linearVelocity().mulLocal$1(a1);
                    t1 = step.get$dt();
                  case 18:
                    state = 0;
                    t3 = b.get$angularDamping();
                  case 19:
                    state = 0;
                    t3 = $.mul(t1, t3);
                    if (typeof t3 !== 'number')
                      throw $.iae(t3);
                    var a2 = 1.0 - t3;
                    var b1 = a2 < 1.0 ? a2 : 1.0;
                    t1 = b.get$angularVelocity();
                  case 20:
                    state = 0;
                    b.set$angularVelocity($.mul(t1, 0.0 > b1 ? 0.0 : b1));
                }
              }
              ++i;
          }
      var i1 = -1;
      var i2 = 0;
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
      L1:
        while (true)
          switch (state) {
            case 0:
              t1 = this.contactCount;
            case 21:
              state = 0;
              if (!$.ltB(i2, t1))
                break L1;
              t1 = this.contacts;
            case 22:
              state = 0;
              var fixtureA = $.index(t1, i2).get$fixtureA();
              t3 = this.contacts;
            case 23:
              state = 0;
              var fixtureB = $.index(t3, i2).get$fixtureB();
              var bodyA = fixtureA.get$body();
              var bodyB = fixtureB.get$body();
              t1 = bodyA.get$type();
            case 24:
              state = 0;
            case 25:
              if (state === 25 || state === 0 && !$.eqB(t1, 0))
                switch (state) {
                  case 0:
                    t1 = bodyB.get$type();
                  case 25:
                    state = 0;
                    var nonStatic = !$.eqB(t1, 0);
                }
              else
                nonStatic = false;
            default:
              if (state === 28 || state === 27 || state === 26 || state === 0 && nonStatic)
                switch (state) {
                  case 0:
                    ++i1;
                    t1 = this.contacts;
                  case 26:
                    state = 0;
                    var temp = $.index(t1, i1);
                    t1 = this.contacts;
                  case 27:
                    state = 0;
                    $.indexSet(t1, i1, $.index(t1, i2));
                    t1 = this.contacts;
                  case 28:
                    state = 0;
                    $.indexSet(t1, i2, temp);
                }
              ++i2;
          }
      t1 = this._contactSolver;
      t1.init$3(this.contacts, this.contactCount, step.get$dtRatio());
      t1.warmStart$0();
      i = 0;
    case 29:
    case 30:
      L2:
        while (true)
          switch (state) {
            case 0:
              var t2 = this.jointCount;
            case 29:
              state = 0;
              if (!$.ltB(i, t2))
                break L2;
              t2 = this.joints;
            case 30:
              state = 0;
              $.index(t2, i).initVelocityConstraints$1(step);
              ++i;
          }
      i = 0;
    case 31:
    case 32:
    case 33:
      L3:
        while (true)
          switch (state) {
            case 0:
              t2 = step.get$velocityIterations();
            case 31:
              state = 0;
              if (!$.ltB(i, t2))
                break L3;
              var j = 0;
            default:
              L4:
                while (true)
                  switch (state) {
                    case 0:
                      t2 = this.jointCount;
                    case 32:
                      state = 0;
                      if (!$.ltB(j, t2))
                        break L4;
                      t2 = this.joints;
                    case 33:
                      state = 0;
                      $.index(t2, j).solveVelocityConstraints$1(step);
                      ++j;
                  }
              t1.solveVelocityConstraints$0();
              ++i;
          }
      t1.storeImpulses$0();
      temp = $.Vector$(0, 0);
      t2 = this._translation;
      i = 0;
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
      L5:
        while (true)
          switch (state) {
            case 0:
              t3 = this.bodyCount;
            case 34:
              state = 0;
              if (!$.ltB(i, t3))
                break L5;
            default:
              c$0: {
                switch (state) {
                  case 0:
                    t3 = this.bodies;
                  case 35:
                    state = 0;
                    b = $.index(t3, i);
                    t3 = b.get$type();
                  case 36:
                    state = 0;
                    if ($.eqB(t3, 0))
                      break c$0;
                    t2.setFrom$1(b.get$linearVelocity());
                    t2.mulLocal$1(step.get$dt());
                    t3 = t2.get$x();
                  case 37:
                    state = 0;
                    var t5 = t2.get$x();
                  case 38:
                    state = 0;
                    t5 = $.mul(t3, t5);
                    t3 = t2.get$y();
                  case 39:
                    state = 0;
                    t8 = t2.get$y();
                  case 40:
                    state = 0;
                    if ($.gtB($.add(t5, $.mul(t3, t8)), 4.0)) {
                      t3 = $.get$length(t2);
                      if (typeof t3 !== 'number')
                        throw $.iae(t3);
                      var ratio = 2.0 / t3;
                      b.get$linearVelocity().mulLocal$1(ratio);
                    }
                    t3 = step.get$dt();
                  case 41:
                    state = 0;
                    t5 = b.get$angularVelocity();
                  case 42:
                    state = 0;
                    var rotation = $.mul(t3, t5);
                  case 43:
                    if (state === 43 || state === 0 && $.gtB($.mul(rotation, rotation), 2.4674011002723395))
                      switch (state) {
                        case 0:
                          t3 = $.abs(rotation);
                          if (typeof t3 !== 'number')
                            throw $.iae(t3);
                          ratio = 1.5707963267948966 / t3;
                          t3 = b.get$angularVelocity();
                        case 43:
                          state = 0;
                          b.set$angularVelocity($.mul(t3, ratio));
                      }
                    b.get$sweep().get$centerZero().setFrom$1(b.get$sweep().get$center());
                    t3 = b.get$sweep().get$angle();
                    b.get$sweep().set$angleZero(t3);
                    temp.setFrom$1(b.get$linearVelocity());
                    temp.mulLocal$1(step.get$dt());
                    b.get$sweep().get$center().addLocal$1(temp);
                    t3 = b.get$sweep();
                    var t4 = t3.get$angle();
                  case 44:
                    state = 0;
                    var t6 = step.get$dt();
                  case 45:
                    state = 0;
                    t8 = b.get$angularVelocity();
                  case 46:
                    state = 0;
                    t3.set$angle($.add(t4, $.mul(t6, t8)));
                    b.synchronizeTransform$0();
                }
              }
              ++i;
          }
      i = 0;
    case 47:
    case 48:
    case 49:
      L6:
        while (true)
          switch (state) {
            case 0:
              t2 = step.get$positionIterations();
            case 47:
              state = 0;
              if (!$.ltB(i, t2))
                break L6;
              var contactsOkay = t1.solvePositionConstraints$1(0.2);
              j = 0;
              var jointsOkay = true;
            default:
              L7:
                while (true)
                  switch (state) {
                    case 0:
                      t2 = this.jointCount;
                    case 48:
                      state = 0;
                      if (!$.ltB(j, t2))
                        break L7;
                      t2 = this.joints;
                    case 49:
                      state = 0;
                      var jointOkay = $.index(t2, j).solvePositionConstraints$1(0.2);
                      jointsOkay = jointsOkay && jointOkay === true;
                      ++j;
                  }
              if (contactsOkay === true && jointsOkay)
                break L6;
              ++i;
          }
      this.report$1(t1.get$constraints());
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
      if (state === 64 || state === 63 || state === 62 || state === 61 || state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 0 && allowSleep === true)
        switch (state) {
          case 0:
            var minSleepTime = 99999999999999.0;
            i = 0;
          default:
            L8:
              while (true)
                switch (state) {
                  case 0:
                    t1 = this.bodyCount;
                  case 50:
                    state = 0;
                    if (!$.ltB(i, t1))
                      break L8;
                  default:
                    c$0: {
                      switch (state) {
                        case 0:
                          t1 = this.bodies;
                        case 51:
                          state = 0;
                          b = $.index(t1, i);
                          t1 = b.get$type();
                        case 52:
                          state = 0;
                          if ($.eqB(t1, 0))
                            break c$0;
                          t1 = b.get$flags();
                        case 53:
                          state = 0;
                          if ($.eqB($.and(t1, 4), 0)) {
                            b.set$sleepTime(0.0);
                            minSleepTime = 0.0;
                          }
                          t1 = b.get$flags();
                        case 54:
                          state = 0;
                        default:
                          if (state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 55 || state === 0 && !$.eqB($.and(t1, 4), 0))
                            switch (state) {
                              case 0:
                                t1 = b.get$angularVelocity();
                              case 55:
                                state = 0;
                                t3 = b.get$angularVelocity();
                              case 56:
                                state = 0;
                              default:
                                if (state === 60 || state === 59 || state === 58 || state === 57 || state === 0 && !$.gtB($.mul(t1, t3), 0.0012184696791468343))
                                  switch (state) {
                                    case 0:
                                      t1 = b.get$linearVelocity();
                                      t2 = b.get$linearVelocity();
                                      t3 = t1.get$x();
                                    case 57:
                                      state = 0;
                                      t5 = t2.get$x();
                                    case 58:
                                      state = 0;
                                      t5 = $.mul(t3, t5);
                                      t1 = t1.get$y();
                                    case 59:
                                      state = 0;
                                      t2 = t2.get$y();
                                    case 60:
                                      state = 0;
                                      t8 = $.gtB($.add(t5, $.mul(t1, t2)), 0.0001);
                                      t1 = t8;
                                  }
                                else
                                  t1 = true;
                            }
                          else
                            t1 = true;
                        case 61:
                        case 62:
                          if (state === 0 && t1) {
                            b.set$sleepTime(0.0);
                            minSleepTime = 0.0;
                          } else
                            switch (state) {
                              case 0:
                                t1 = b.get$sleepTime();
                              case 61:
                                state = 0;
                                t3 = step.get$dt();
                              case 62:
                                state = 0;
                                b.set$sleepTime($.add(t1, t3));
                                minSleepTime = $.min(minSleepTime, b.get$sleepTime());
                            }
                      }
                    }
                    ++i;
                }
          case 63:
          case 64:
            if (state === 64 || state === 63 || state === 0 && minSleepTime >= 0.5)
              switch (state) {
                case 0:
                  i = 0;
                default:
                  L9:
                    while (true)
                      switch (state) {
                        case 0:
                          t1 = this.bodyCount;
                        case 63:
                          state = 0;
                          if (!$.ltB(i, t1))
                            break L9;
                          t1 = this.bodies;
                        case 64:
                          state = 0;
                          $.index(t1, i).set$awake(false);
                          ++i;
                      }
              }
        }
  }
},
 addBody$1: function(body) {
  body.set$islandIndex(this.bodyCount);
  var t1 = this.bodies;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior)
    return this.addBody$1$bailout(1, body, t1, 0);
  var t3 = this.bodyCount;
  if (typeof t3 !== 'number')
    return this.addBody$1$bailout(2, body, t1, t3);
  this.bodyCount = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  t1[t3] = body;
},
 addBody$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var body = env0;
      t1 = env1;
      break;
    case 2:
      body = env0;
      t1 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      body.set$islandIndex(this.bodyCount);
      var t1 = this.bodies;
    case 1:
      state = 0;
      var t3 = this.bodyCount;
    case 2:
      state = 0;
      this.bodyCount = $.add(t3, 1);
      $.indexSet(t1, t3, body);
  }
},
 addContact$1: function(contact) {
  var t1 = this.contacts;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior)
    return this.addContact$1$bailout(1, contact, t1, 0);
  var t3 = this.contactCount;
  if (typeof t3 !== 'number')
    return this.addContact$1$bailout(2, contact, t1, t3);
  this.contactCount = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  t1[t3] = contact;
},
 addContact$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var contact = env0;
      t1 = env1;
      break;
    case 2:
      contact = env0;
      t1 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.contacts;
    case 1:
      state = 0;
      var t3 = this.contactCount;
    case 2:
      state = 0;
      this.contactCount = $.add(t3, 1);
      $.indexSet(t1, t3, contact);
  }
},
 addJoint$1: function(joint) {
  var t1 = this.joints;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior)
    return this.addJoint$1$bailout(1, joint, t1, 0);
  var t3 = this.jointCount;
  if (typeof t3 !== 'number')
    return this.addJoint$1$bailout(2, joint, t1, t3);
  this.jointCount = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  t1[t3] = joint;
},
 addJoint$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var joint = env0;
      t1 = env1;
      break;
    case 2:
      joint = env0;
      t1 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.joints;
    case 1:
      state = 0;
      var t3 = this.jointCount;
    case 2:
      state = 0;
      this.jointCount = $.add(t3, 1);
      $.indexSet(t1, t3, joint);
  }
},
 report$1: function(constraints) {
  if (typeof constraints !== 'string' && (typeof constraints !== 'object' || constraints === null || constraints.constructor !== Array && !constraints.is$JavaScriptIndexingBehavior))
    return this.report$1$bailout(1, constraints);
  if (this.listener == null)
    return;
  for (var t1 = this.impulse, t2 = t1.normalImpulses, t3 = t1.tangentImpulses, i = 0; $.ltB(i, this.contactCount); ++i) {
    var c = $.index(this.contacts, i);
    if (i < 0 || i >= constraints.length)
      throw $.ioore(i);
    var cc = constraints[i];
    for (var j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
      $.indexSet(t2, j, $.index(cc.get$points(), j).get$normalImpulse());
      $.indexSet(t3, j, $.index(cc.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, t1);
  }
},
 report$1$bailout: function(state, constraints) {
  if (this.listener == null)
    return;
  for (var t1 = this.impulse, i = 0; $.ltB(i, this.contactCount); ++i) {
    var c = $.index(this.contacts, i);
    var cc = $.index(constraints, i);
    for (var j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
      $.indexSet(t1.get$normalImpulses(), j, $.index(cc.get$points(), j).get$normalImpulse());
      $.indexSet(t1.get$tangentImpulses(), j, $.index(cc.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, t1);
  }
}
};

$$.Position = {"":
 ["x=", "a="],
 "super": "Object",
 Position$0: function() {
  this.x = $.Vector$(0, 0);
  this.a = 0;
}
};

$$.Velocity = {"":
 ["v?", "a="],
 "super": "Object",
 Velocity$0: function() {
  this.v = $.Vector$(0, 0);
  this.a = 0;
}
};

$$.TimeStep = {"":
 ["dt=", "inv_dt=", "dtRatio=", "velocityIterations=", "positionIterations=", "warmStarting="],
 "super": "Object"
};

$$.World = {"":
 ["_flags=", "_contactManager?", "_bodyList", "_jointList", "_bodyCount", "_jointCount", "_gravity", "_allowSleep", "_debugDraw", "_fixtureDestructionListener", "_jointDestructionListener", "_pool", "_inverseTimestep", "_warmStarting", "_continuousPhysics", "_contactStacks", "center?", "axis", "timestep", "cA", "cB", "wqwrapper", "toiInput", "toiOutput", "backup", "toiSolver", "contacts", "island", "stack"],
 "super": "Object",
 _addType$3: function(creatorStack, type1, type2) {
  var register = $.ContactRegister$();
  register.creator = creatorStack;
  register.primary = true;
  var t1 = this._contactStacks;
  if (type1 < 0 || type1 >= t1.length)
    throw $.ioore(type1);
  $.indexSet(t1[type1], type2, register);
  if (!(type1 === type2)) {
    var register2 = $.ContactRegister$();
    register2.creator = creatorStack;
    register2.primary = false;
    if (type2 < 0 || type2 >= t1.length)
      throw $.ioore(type2);
    $.indexSet(t1[type2], type1, register2);
  }
},
 _initializeRegisters$0: function() {
  var t1 = this._pool;
  this._addType$3(t1.getCircleContactStack$0(), 0, 0);
  this._addType$3(t1.getPolyCircleContactStack$0(), 1, 0);
  this._addType$3(t1.getPolyContactStack$0(), 1, 1);
},
 popContact$2: function(fixtureA, fixtureB) {
  var type1 = fixtureA.get$type();
  var type2 = fixtureB.get$type();
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0))
    throw $.iae(type1);
  if (type1 < 0 || type1 >= t1.length)
    throw $.ioore(type1);
  var reg = $.index(t1[type1], type2);
  var creator = reg.get$creator();
  if (!(creator == null)) {
    if ($.isEmpty(creator) === true)
      creator = this._getFreshContactStack$2(type1, type2);
    if (reg.get$primary() === true) {
      var c = creator.removeFirst$0();
      c.init$2(fixtureA, fixtureB);
      return c;
    } else {
      c = creator.removeFirst$0();
      c.init$2(fixtureB, fixtureA);
      return c;
    }
  } else
    return;
},
 _getFreshContactStack$2: function(type1, type2) {
  if ($.eqB(type1, 0) && $.eqB(type2, 0))
    return this._pool.getCircleContactStack$0();
  else {
    var t1 = $.eqB(type1, 1) && $.eqB(type2, 1);
    var t2 = this._pool;
    if (t1)
      return t2.getPolyContactStack$0();
    else
      return t2.getPolyCircleContactStack$0();
  }
},
 pushContact$1: function(contact) {
  if ($.gtB(contact.get$manifold().get$pointCount(), 0)) {
    contact.get$fixtureA().get$body().set$awake(true);
    contact.get$fixtureB().get$body().set$awake(true);
  }
  var type1 = contact.get$fixtureA().get$type();
  var type2 = contact.get$fixtureB().get$type();
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0))
    throw $.iae(type1);
  if (type1 < 0 || type1 >= t1.length)
    throw $.ioore(type1);
  $.index(t1[type1], type2).get$creator().addFirst$1(contact);
},
 get$contactListener: function() {
  return this._contactManager.get$contactListener();
},
 createBody$1: function(def) {
  if (this.get$locked() === true)
    return;
  var b = $.Body$(def, this);
  b.prev = null;
  b.next = this._bodyList;
  var t1 = this._bodyList;
  if (!(t1 == null))
    t1.set$prev(b);
  this._bodyList = b;
  this._bodyCount = this._bodyCount + 1;
  return b;
},
 createJoint$1: function(def) {
  if (this.get$locked() === true)
    return;
  var j = $.Joint_Joint$create(this, def);
  j.set$_prev(null);
  j.set$_lib_next(this._jointList);
  var t1 = this._jointList;
  if (!(t1 == null))
    t1.set$_prev(j);
  this._jointList = j;
  t1 = this._jointCount;
  if (typeof t1 !== 'number')
    return this.createJoint$1$bailout(1, def, j, t1, 0);
  this._jointCount = t1 + 1;
  j.get$edgeA().set$joint(j);
  var t3 = j.get$bodyB();
  j.get$edgeA().set$other(t3);
  j.get$edgeA().set$prev(null);
  t3 = j.get$bodyA().get$jointList();
  j.get$edgeA().set$next(t3);
  if (!(j.get$bodyA().get$jointList() == null)) {
    t1 = j.get$edgeA();
    j.get$bodyA().get$jointList().set$prev(t1);
  }
  t1 = j.get$edgeA();
  j.get$bodyA().set$jointList(t1);
  j.get$edgeB().set$joint(j);
  t1 = j.get$bodyA();
  j.get$edgeB().set$other(t1);
  j.get$edgeB().set$prev(null);
  t1 = j.get$bodyB().get$jointList();
  j.get$edgeB().set$next(t1);
  if (!(j.get$bodyB().get$jointList() == null)) {
    t1 = j.get$edgeB();
    j.get$bodyB().get$jointList().set$prev(t1);
  }
  t1 = j.get$edgeB();
  j.get$bodyB().set$jointList(t1);
  var bodyA = def.get$bodyA();
  var bodyB = def.get$bodyB();
  t1 = def.get$collideConnected();
  if (typeof t1 !== 'boolean')
    return this.createJoint$1$bailout(2, bodyA, j, bodyB, t1);
  if (!t1) {
    var edge = bodyB.get$contactList();
    for (; !(edge == null);) {
      if ($.eqB(edge.get$other(), bodyA))
        edge.get$contact().flagForFiltering$0();
      edge = edge.get$next();
    }
  }
  return j;
},
 createJoint$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var def = env0;
      j = env1;
      t1 = env2;
      break;
    case 2:
      bodyA = env0;
      j = env1;
      bodyB = env2;
      t1 = env3;
      break;
  }
  switch (state) {
    case 0:
      if (this.get$locked() === true)
        return;
      var j = $.Joint_Joint$create(this, def);
      j.set$_prev(null);
      j.set$_lib_next(this._jointList);
      var t1 = this._jointList;
      if (!(t1 == null))
        t1.set$_prev(j);
      this._jointList = j;
      t1 = this._jointCount;
    case 1:
      state = 0;
      this._jointCount = $.add(t1, 1);
      j.get$edgeA().set$joint(j);
      var t3 = j.get$bodyB();
      j.get$edgeA().set$other(t3);
      j.get$edgeA().set$prev(null);
      t3 = j.get$bodyA().get$jointList();
      j.get$edgeA().set$next(t3);
      if (!(j.get$bodyA().get$jointList() == null)) {
        t1 = j.get$edgeA();
        j.get$bodyA().get$jointList().set$prev(t1);
      }
      t1 = j.get$edgeA();
      j.get$bodyA().set$jointList(t1);
      j.get$edgeB().set$joint(j);
      t1 = j.get$bodyA();
      j.get$edgeB().set$other(t1);
      j.get$edgeB().set$prev(null);
      t1 = j.get$bodyB().get$jointList();
      j.get$edgeB().set$next(t1);
      if (!(j.get$bodyB().get$jointList() == null)) {
        t1 = j.get$edgeB();
        j.get$bodyB().get$jointList().set$prev(t1);
      }
      t1 = j.get$edgeB();
      j.get$bodyB().set$jointList(t1);
      var bodyA = def.get$bodyA();
      var bodyB = def.get$bodyB();
      t1 = def.get$collideConnected();
    case 2:
      state = 0;
      if ($.eqB(t1, false)) {
        var edge = bodyB.get$contactList();
        for (; !(edge == null);) {
          if ($.eqB(edge.get$other(), bodyA))
            edge.get$contact().flagForFiltering$0();
          edge = edge.get$next();
        }
      }
      return j;
  }
},
 step$3: function(dt, velocityIterations, positionIterations) {
  var t1 = this._flags;
  if (t1 !== (t1 | 0))
    return this.step$3$bailout(1, dt, velocityIterations, positionIterations, t1);
  if ((t1 & 1) === 1) {
    this._contactManager.findNewContacts$0();
    t1 = this._flags;
    if (t1 !== (t1 | 0))
      return this.step$3$bailout(2, dt, velocityIterations, positionIterations, t1);
    this._flags = (t1 & -2) >>> 0;
  }
  t1 = this._flags;
  if (t1 !== (t1 | 0))
    return this.step$3$bailout(3, dt, velocityIterations, positionIterations, t1);
  this._flags = (t1 | 2) >>> 0;
  var t3 = this.timestep;
  t3.dt = dt;
  t3.velocityIterations = velocityIterations;
  t3.positionIterations = positionIterations;
  if (dt > 0.0)
    t3.inv_dt = 1.0 / dt;
  else
    t3.inv_dt = 0.0;
  t1 = this._inverseTimestep;
  if (typeof t1 !== 'number')
    return this.step$3$bailout(4, dt, t1, t3, 0);
  t3.dtRatio = t1 * dt;
  t3.warmStarting = this._warmStarting;
  this._contactManager.collide$0();
  t1 = t3.dt;
  if (typeof t1 !== 'number')
    return this.step$3$bailout(5, t3, t1, 0, 0);
  if (t1 > 0.0)
    this.solve$1(t3);
  if (this._continuousPhysics) {
    t1 = t3.dt;
    if (typeof t1 !== 'number')
      return this.step$3$bailout(6, t3, t1, 0, 0);
    t1 = t1 > 0.0;
  } else
    t1 = false;
  if (t1)
    this.solveTimeOfImpact$0();
  t1 = t3.dt;
  if (typeof t1 !== 'number')
    return this.step$3$bailout(7, t3, t1, 0, 0);
  if (t1 > 0.0)
    this._inverseTimestep = t3.inv_dt;
  t1 = this._flags;
  if (t1 !== (t1 | 0))
    return this.step$3$bailout(8, t1, 0, 0, 0);
  if ((t1 & 4) === 4)
    this.clearForces$0();
  t1 = this._flags;
  if (t1 !== (t1 | 0))
    return this.step$3$bailout(9, t1, 0, 0, 0);
  this._flags = (t1 & -3) >>> 0;
},
 step$3$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var dt = env0;
      var velocityIterations = env1;
      var positionIterations = env2;
      t1 = env3;
      break;
    case 2:
      dt = env0;
      velocityIterations = env1;
      positionIterations = env2;
      t1 = env3;
      break;
    case 3:
      dt = env0;
      velocityIterations = env1;
      positionIterations = env2;
      t1 = env3;
      break;
    case 4:
      dt = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 5:
      t3 = env0;
      t1 = env1;
      break;
    case 6:
      t3 = env0;
      t1 = env1;
      break;
    case 7:
      t3 = env0;
      t1 = env1;
      break;
    case 8:
      t1 = env0;
      break;
    case 9:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._flags;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && $.eqB($.and(t1, 1), 1))
        switch (state) {
          case 0:
            this._contactManager.findNewContacts$0();
            t1 = this._flags;
          case 2:
            state = 0;
            this._flags = $.and(t1, -2);
        }
      t1 = this._flags;
    case 3:
      state = 0;
      this._flags = $.or(t1, 2);
      var t3 = this.timestep;
      t3.set$dt(dt);
      t3.set$velocityIterations(velocityIterations);
      t3.set$positionIterations(positionIterations);
      if (dt > 0.0)
        t3.set$inv_dt(1.0 / dt);
      else
        t3.set$inv_dt(0.0);
      t1 = this._inverseTimestep;
    case 4:
      state = 0;
      t3.set$dtRatio($.mul(t1, dt));
      t3.set$warmStarting(this._warmStarting);
      this._contactManager.collide$0();
      t1 = t3.get$dt();
    case 5:
      state = 0;
      if ($.gtB(t1, 0.0))
        this.solve$1(t3);
    case 6:
      if (state === 6 || state === 0 && this._continuousPhysics === true)
        switch (state) {
          case 0:
            t1 = t3.get$dt();
          case 6:
            state = 0;
            t1 = $.gtB(t1, 0.0);
        }
      else
        t1 = false;
      if (t1)
        this.solveTimeOfImpact$0();
      t1 = t3.get$dt();
    case 7:
      state = 0;
      if ($.gtB(t1, 0.0))
        this._inverseTimestep = t3.get$inv_dt();
      t1 = this._flags;
    case 8:
      state = 0;
      if ($.eqB($.and(t1, 4), 4))
        this.clearForces$0();
      t1 = this._flags;
    case 9:
      state = 0;
      this._flags = $.and(t1, -3);
  }
},
 clearForces$0: function() {
  for (var body = this._bodyList; !(body == null); body = body.get$next()) {
    body.get$_force().setZero$0();
    body.set$_torque(0.0);
  }
},
 get$contactList: function() {
  return this._contactManager.get$contactList();
},
 get$contactCount: function() {
  return this._contactManager.get$contactCount();
},
 get$locked: function() {
  return $.eq($.and(this._flags, 2), 2);
},
 get$jointList: function() {
  return this._jointList;
},
 solve$1: function(timeStep) {
  var t1 = this.island;
  var t2 = this._bodyCount;
  var t3 = this._contactManager;
  t1.init$4(t2, t3.get$contactCount(), this._jointCount, t3.get$contactListener());
  for (var b = this._bodyList; !(b == null); b = b.get$next())
    b.set$flags($.and(b.get$flags(), -2));
  for (var c = t3.get$contactList(); !(c == null); c = c.get$next())
    c.set$flags($.and(c.get$flags(), -2));
  for (var j = this.get$jointList(); !(j == null); j = j.get$_lib_next())
    j.set$islandFlag(false);
  var stackSize = this._bodyCount;
  if (this.stack.length < stackSize)
    this.stack = $.ListImplementation_List(stackSize, 'Body');
  for (var seed = this._bodyList, t2 = this._gravity, t4 = this._allowSleep; !(seed == null); seed = seed.get$next()) {
    if ($.eqB($.and(seed.get$flags(), 1), 1))
      continue;
    if ($.eqB(seed.get$awake(), false) || $.eqB(seed.get$active(), false))
      continue;
    if ($.eqB(seed.get$type(), 0))
      continue;
    $.clear(t1);
    var t5 = this.stack;
    if (0 < 0 || 0 >= t5.length)
      throw $.ioore(0);
    t5[0] = seed;
    seed.set$flags($.or(seed.get$flags(), 1));
    for (var stackCount = 1; stackCount > 0;) {
      t5 = this.stack;
      --stackCount;
      if (stackCount < 0 || stackCount >= t5.length)
        throw $.ioore(stackCount);
      b = t5[stackCount];
      t1.addBody$1(b);
      b.set$awake(true);
      if ($.eqB(b.get$type(), 0))
        continue;
      for (var ce = b.get$contactList(); !(ce == null); ce = ce.get$next()) {
        var contact = ce.get$contact();
        if ($.eqB($.and(contact.get$flags(), 1), 1))
          continue;
        if ($.eqB(contact.get$enabled(), false) || $.eqB(contact.get$touching(), false))
          continue;
        var sensorA = contact.get$fixtureA().get$isSensor();
        var sensorB = contact.get$fixtureB().get$isSensor();
        if (sensorA === true || sensorB === true)
          continue;
        t1.addContact$1(contact);
        contact.set$flags($.or(contact.get$flags(), 1));
        var other = ce.get$other();
        if ($.eqB($.and(other.get$flags(), 1), 1))
          continue;
        t5 = this.stack;
        var stackCount0 = stackCount + 1;
        if (stackCount < 0 || stackCount >= t5.length)
          throw $.ioore(stackCount);
        t5[stackCount] = other;
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
      for (var je = b.get$jointList(); !(je == null); je = je.get$next()) {
        if ($.eqB(je.get$joint().get$islandFlag(), true))
          continue;
        other = je.get$other();
        if ($.eqB(other.get$active(), false))
          continue;
        t1.addJoint$1(je.get$joint());
        je.get$joint().set$islandFlag(true);
        if ($.eqB($.and(other.get$flags(), 1), 1))
          continue;
        t5 = this.stack;
        stackCount0 = stackCount + 1;
        if (stackCount < 0 || stackCount >= t5.length)
          throw $.ioore(stackCount);
        t5[stackCount] = other;
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
    }
    t1.solve$3(timeStep, t2, t4);
    for (var i = 0; $.ltB(i, t1.get$bodyCount()); ++i) {
      b = $.index(t1.get$bodies(), i);
      if ($.eqB(b.get$type(), 0))
        b.set$flags($.and(b.get$flags(), -2));
    }
  }
  for (b = this._bodyList; !(b == null); b = b.get$next()) {
    if ($.eqB($.and(b.get$flags(), 1), 0))
      continue;
    if ($.eqB(b.get$type(), 0))
      continue;
    b.synchronizeFixtures$0();
  }
  t3.findNewContacts$0();
},
 solveTimeOfImpact$0: function() {
  for (var c = this._contactManager.get$contactList(); !(c == null); c = c.get$next()) {
    c.set$flags($.or(c.get$flags(), 4));
    c.set$toiCount(0);
  }
  for (var body = this._bodyList; !(body == null); body = body.get$next())
    if ($.eqB($.and(body.get$flags(), 1), 0) || $.eqB(body.get$type(), 1) || $.eqB(body.get$type(), 0))
      body.set$flags($.or(body.get$flags(), 64));
    else
      body.set$flags($.and(body.get$flags(), -65));
  for (body = this._bodyList; !(body == null); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 64), 64))
      continue;
    if ($.eqB(body.get$bullet(), true))
      continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
  for (body = this._bodyList; !(body == null); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 64), 64))
      continue;
    if ($.eqB(body.get$bullet(), false))
      continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
},
 solveTimeOfImpactGivenBody$1: function(body) {
  var bullet = body.get$bullet();
  if (typeof bullet !== 'boolean')
    return this.solveTimeOfImpactGivenBody$1$bailout(1, body, bullet, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t2 = this.toiInput;
  var t3 = this._pool;
  var t4 = this.toiOutput;
  var t5 = t2.proxyA;
  var t6 = t2.proxyB;
  var t7 = t2.sweepA;
  var t8 = t2.sweepB;
  var iter = 0;
  var toiContact = null;
  var toi = 1.0;
  var toiOther = null;
  var count = null;
  var found = null;
  do {
    for (var ce = body.get$contactList(), count = 0, found = false; !(ce == null); ce = ce.get$next()) {
      if ($.eqB(ce.get$contact(), toiContact))
        continue;
      var other = ce.get$other();
      var type = other.get$type();
      if (typeof type !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(2, found, body, bullet, iter, other, t2, type, t3, t4, toiContact, toi, toiOther, ce, count, 0);
      if (bullet) {
        var t1 = other.get$flags();
        if (t1 !== (t1 | 0))
          return this.solveTimeOfImpactGivenBody$1$bailout(3, found, body, bullet, iter, other, t2, type, t3, t4, t1, toiContact, toi, toiOther, ce, count);
        if ((t1 & 64) === 0)
          continue;
        if (!(type === 0)) {
          t1 = ce.get$contact().get$flags();
          if (t1 !== (t1 | 0))
            return this.solveTimeOfImpactGivenBody$1$bailout(4, found, body, bullet, iter, t1, other, t2, t3, t4, toiContact, toi, toiOther, ce, count, 0);
          var t10 = !((t1 & 16) === 0);
          t1 = t10;
        } else
          t1 = false;
        if (t1)
          continue;
      } else if (type === 2)
        continue;
      var contact = ce.get$contact();
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(5, found, body, bullet, contact, iter, t1, other, t2, t3, t4, toiContact, toi, toiOther, ce, count);
      if (!t1)
        continue;
      t1 = contact.get$toiCount();
      if (typeof t1 !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(6, found, body, bullet, contact, iter, other, t2, t1, t3, t4, toiContact, toi, toiOther, ce, count);
      if (t1 > 10)
        continue;
      var fixtureA = contact.get$fixtureA();
      var fixtureB = contact.get$fixtureB();
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
        continue;
      var bodyA = fixtureA.get$body();
      var bodyB = fixtureB.get$body();
      t5.setFromShape$1(fixtureA.get$shape());
      t6.setFromShape$1(fixtureB.get$shape());
      t7.setFrom$1(bodyA.get$sweep());
      t8.setFrom$1(bodyB.get$sweep());
      t2.tMax = toi;
      t3.get$timeOfImpact().timeOfImpact$2(t4, t2);
      t1 = t4.state;
      if (typeof t1 !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(7, found, body, bullet, contact, t1, iter, other, t2, t3, t4, toiContact, toi, toiOther, ce, count);
      if (t1 === 3) {
        t1 = t4.t;
        if (typeof t1 !== 'number')
          return this.solveTimeOfImpactGivenBody$1$bailout(8, found, body, bullet, contact, iter, t1, other, t2, t3, t4, toiContact, toi, toiOther, ce, count);
        t1 = t1 < toi;
      } else
        t1 = false;
      if (t1) {
        toi = t4.t;
        if (typeof toi !== 'number')
          return this.solveTimeOfImpactGivenBody$1$bailout(9, body, other, t2, bullet, contact, iter, toi, t3, t4, ce, count, 0, 0, 0, 0);
        toiContact = contact;
        toiOther = other;
        found = true;
      }
      ++count;
    }
    ++iter;
  } while (found === true && $.gtB(count, 1) && iter < 50);
  if (toiContact == null) {
    body.advance$1(1.0);
    return;
  }
  t1 = this.backup;
  t1.setFrom$1(body.get$sweep());
  body.advance$1(toi);
  t2 = this._contactManager;
  t3 = t2.contactListener;
  toiContact.update$1(t3);
  t4 = toiContact.get$enabled();
  if (typeof t4 !== 'boolean')
    return this.solveTimeOfImpactGivenBody$1$bailout(10, body, t1, t2, t4, toiContact, toiOther, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!t4) {
    body.get$sweep().setFrom$1(t1);
    this.solveTimeOfImpactGivenBody$1(body);
  }
  t1 = toiContact.get$toiCount();
  if (typeof t1 !== 'number')
    return this.solveTimeOfImpactGivenBody$1$bailout(11, body, toiContact, t2, t1, toiOther, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  toiContact.set$toiCount(t1 + 1);
  t1 = this.contacts;
  if (t1.length < 32)
    this.contacts = $.ListImplementation_List(32, 'Contact');
  ce = body.get$contactList();
  count = 0;
  while (true) {
    if (!(!(ce == null) && count < 32))
      break;
    c$0: {
      type = ce.get$other().get$type();
      if (typeof type !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(12, body, t2, type, ce, toiContact, count, toiOther, 0, 0, 0, 0, 0, 0, 0, 0);
      if (type === 2)
        break c$0;
      contact = ce.get$contact();
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(13, body, count, toiOther, t2, ce, toiContact, contact, t1, 0, 0, 0, 0, 0, 0, 0);
      if (!t1)
        break c$0;
      fixtureA = contact.get$fixtureA();
      fixtureB = contact.get$fixtureB();
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
        break c$0;
      if (!$.eqB(contact, toiContact))
        contact.update$1(t3);
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(14, body, toiContact, t1, t2, ce, contact, count, toiOther, 0, 0, 0, 0, 0, 0, 0);
      if (!t1)
        break c$0;
      t1 = contact.get$touching();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(15, body, toiOther, toiContact, t2, ce, t1, contact, count, 0, 0, 0, 0, 0, 0, 0);
      if (!t1)
        break c$0;
      t1 = this.contacts;
      if (count < 0 || count >= t1.length)
        throw $.ioore(count);
      t1[count] = contact;
      ++count;
    }
    ce = ce.get$next();
  }
  t1 = this.toiSolver;
  t1.initialize$3(this.contacts, count, body);
  for (var i = 0; i < 20; ++i)
    if (t1.solve$1(0.75) === true)
      break;
  t1 = toiOther.get$type();
  if (typeof t1 !== 'number')
    return this.solveTimeOfImpactGivenBody$1$bailout(16, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!(t1 === 0)) {
    t1 = toiContact.get$flags();
    if (t1 !== (t1 | 0))
      return this.solveTimeOfImpactGivenBody$1$bailout(17, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    toiContact.set$flags((t1 | 16) >>> 0);
  }
},
 solveTimeOfImpactGivenBody$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14) {
  switch (state) {
    case 1:
      var body = env0;
      bullet = env1;
      break;
    case 2:
      found = env0;
      body = env1;
      bullet = env2;
      iter = env3;
      other = env4;
      t2 = env5;
      type = env6;
      t3 = env7;
      t4 = env8;
      toiContact = env9;
      toi = env10;
      toiOther = env11;
      ce = env12;
      count = env13;
      break;
    case 3:
      found = env0;
      body = env1;
      bullet = env2;
      iter = env3;
      other = env4;
      t2 = env5;
      type = env6;
      t3 = env7;
      t4 = env8;
      t1 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 4:
      found = env0;
      body = env1;
      bullet = env2;
      iter = env3;
      t1 = env4;
      other = env5;
      t2 = env6;
      t3 = env7;
      t4 = env8;
      toiContact = env9;
      toi = env10;
      toiOther = env11;
      ce = env12;
      count = env13;
      break;
    case 5:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      t1 = env5;
      other = env6;
      t2 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 6:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      other = env5;
      t2 = env6;
      t1 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 7:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      t1 = env4;
      iter = env5;
      other = env6;
      t2 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 8:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      t1 = env5;
      other = env6;
      t2 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 9:
      body = env0;
      other = env1;
      t2 = env2;
      bullet = env3;
      contact = env4;
      iter = env5;
      toi = env6;
      t3 = env7;
      t4 = env8;
      ce = env9;
      count = env10;
      break;
    case 10:
      body = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      toiContact = env4;
      toiOther = env5;
      break;
    case 11:
      body = env0;
      toiContact = env1;
      t2 = env2;
      t1 = env3;
      toiOther = env4;
      break;
    case 12:
      body = env0;
      t2 = env1;
      type = env2;
      ce = env3;
      toiContact = env4;
      count = env5;
      toiOther = env6;
      break;
    case 13:
      body = env0;
      count = env1;
      toiOther = env2;
      t2 = env3;
      ce = env4;
      toiContact = env5;
      contact = env6;
      t1 = env7;
      break;
    case 14:
      body = env0;
      toiContact = env1;
      t1 = env2;
      t2 = env3;
      ce = env4;
      contact = env5;
      count = env6;
      toiOther = env7;
      break;
    case 15:
      body = env0;
      toiOther = env1;
      toiContact = env2;
      t2 = env3;
      ce = env4;
      t1 = env5;
      contact = env6;
      count = env7;
      break;
    case 16:
      t1 = env0;
      toiContact = env1;
      break;
    case 17:
      t1 = env0;
      toiContact = env1;
      break;
  }
  switch (state) {
    case 0:
      var bullet = body.get$bullet();
    case 1:
      state = 0;
      var t2 = this.toiInput;
      var t3 = this._pool;
      var t4 = this.toiOutput;
      var iter = 0;
      var toiContact = null;
      var toi = 1.0;
      var toiOther = null;
      var count = null;
      var found = null;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var ce = body.get$contactList();
              count = 0;
              found = false;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!!(ce == null))
                        break L1;
                    default:
                      c$1: {
                        switch (state) {
                          case 0:
                            if ($.eqB(ce.get$contact(), toiContact))
                              break c$1;
                            var other = ce.get$other();
                            var type = other.get$type();
                          case 2:
                            state = 0;
                          default:
                            if (state === 4 || state === 3 || state === 0 && $.eqB(bullet, true))
                              switch (state) {
                                case 0:
                                  var t1 = other.get$flags();
                                case 3:
                                  state = 0;
                                  if ($.eqB($.and(t1, 64), 0))
                                    break c$1;
                                case 4:
                                  if (state === 4 || state === 0 && !$.eqB(type, 0))
                                    switch (state) {
                                      case 0:
                                        t1 = ce.get$contact().get$flags();
                                      case 4:
                                        state = 0;
                                        var t6 = !$.eqB($.and(t1, 16), 0);
                                        t1 = t6;
                                    }
                                  else
                                    t1 = false;
                                  if (t1)
                                    break c$1;
                              }
                            else if ($.eqB(type, 2))
                              break c$1;
                            var contact = ce.get$contact();
                            t1 = contact.get$enabled();
                          case 5:
                            state = 0;
                            if ($.eqB(t1, false))
                              break c$1;
                            t1 = contact.get$toiCount();
                          case 6:
                            state = 0;
                            if ($.gtB(t1, 10))
                              break c$1;
                            var fixtureA = contact.get$fixtureA();
                            var fixtureB = contact.get$fixtureB();
                            if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
                              break c$1;
                            var bodyA = fixtureA.get$body();
                            var bodyB = fixtureB.get$body();
                            t2.get$proxyA().setFromShape$1(fixtureA.get$shape());
                            t2.get$proxyB().setFromShape$1(fixtureB.get$shape());
                            t2.get$sweepA().setFrom$1(bodyA.get$sweep());
                            t2.get$sweepB().setFrom$1(bodyB.get$sweep());
                            t2.set$tMax(toi);
                            t3.get$timeOfImpact().timeOfImpact$2(t4, t2);
                            t1 = t4.get$state();
                          case 7:
                            state = 0;
                          case 8:
                            if (state === 8 || state === 0 && $.eqB(t1, 3))
                              switch (state) {
                                case 0:
                                  t1 = t4.get$t();
                                case 8:
                                  state = 0;
                                  t1 = $.ltB(t1, toi);
                              }
                            else
                              t1 = false;
                          case 9:
                            if (state === 9 || state === 0 && t1)
                              switch (state) {
                                case 0:
                                  toi = t4.get$t();
                                case 9:
                                  state = 0;
                                  toiContact = contact;
                                  toiOther = other;
                                  found = true;
                              }
                            ++count;
                        }
                      }
                      ce = ce.get$next();
                  }
              ++iter;
              if (!(found === true && $.gtB(count, 1) && iter < 50))
                break L0;
          }
      if (toiContact == null) {
        body.advance$1(1.0);
        return;
      }
      t1 = this.backup;
      t1.setFrom$1(body.get$sweep());
      body.advance$1(toi);
      t2 = this._contactManager;
      toiContact.update$1(t2.get$contactListener());
      t3 = toiContact.get$enabled();
    case 10:
      state = 0;
      if ($.eqB(t3, false)) {
        body.get$sweep().setFrom$1(t1);
        this.solveTimeOfImpactGivenBody$1(body);
      }
      t1 = toiContact.get$toiCount();
    case 11:
      state = 0;
      toiContact.set$toiCount($.add(t1, 1));
      t1 = this.contacts;
      if (t1 === null || t1.length < 32)
        this.contacts = $.ListImplementation_List(32, 'Contact');
      ce = body.get$contactList();
      count = 0;
    case 12:
    case 13:
    case 14:
    case 15:
      L2:
        while (true)
          switch (state) {
            case 0:
              if (!(!(ce == null) && count < 32))
                break L2;
            default:
              c$0: {
                switch (state) {
                  case 0:
                    type = ce.get$other().get$type();
                  case 12:
                    state = 0;
                    if ($.eqB(type, 2))
                      break c$0;
                    contact = ce.get$contact();
                    t1 = contact.get$enabled();
                  case 13:
                    state = 0;
                    if ($.eqB(t1, false))
                      break c$0;
                    fixtureA = contact.get$fixtureA();
                    fixtureB = contact.get$fixtureB();
                    if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
                      break c$0;
                    if (!$.eqB(contact, toiContact))
                      contact.update$1(t2.get$contactListener());
                    t1 = contact.get$enabled();
                  case 14:
                    state = 0;
                    if ($.eqB(t1, false))
                      break c$0;
                    t1 = contact.get$touching();
                  case 15:
                    state = 0;
                    if ($.eqB(t1, false))
                      break c$0;
                    t1 = this.contacts;
                    if (count < 0 || count >= t1.length)
                      throw $.ioore(count);
                    t1[count] = contact;
                    ++count;
                }
              }
              ce = ce.get$next();
          }
      t1 = this.toiSolver;
      t1.initialize$3(this.contacts, count, body);
      for (var i = 0; i < 20; ++i)
        if (t1.solve$1(0.75) === true)
          break;
      t1 = toiOther.get$type();
    case 16:
      state = 0;
    case 17:
      if (state === 17 || state === 0 && !$.eqB(t1, 0))
        switch (state) {
          case 0:
            t1 = toiContact.get$flags();
          case 17:
            state = 0;
            toiContact.set$flags($.or(t1, 16));
        }
  }
},
 World$3: function(gravity, doSleep, argPool) {
  this._contactManager = $.ContactManager$(this);
  for (var t1 = this._contactStacks, i = 0; i < t1.length; ++i) {
    var t2 = $.ListImplementation_List(2, 'ContactRegister');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  this._initializeRegisters$0();
}
};

$$.WorldQueryWrapper = {"":
 ["broadPhase?", "callback"],
 "super": "Object"
};

$$.Contact = {"":
 ["flags=", "prev=", "next=", "edge1?", "edge2?", "fixtureA?", "fixtureB?", "manifold=", "toiCount="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 init$2: function(fixA, fixB) {
  this.flags = 0;
  this.fixtureA = fixA;
  this.fixtureB = fixB;
  this.manifold.set$pointCount(0);
  this.prev = null;
  this.next = null;
  var t1 = this.edge1;
  t1.set$contact(null);
  t1.set$prev(null);
  t1.set$next(null);
  t1.set$other(null);
  t1 = this.edge2;
  t1.set$contact(null);
  t1.set$prev(null);
  t1.set$next(null);
  t1.set$other(null);
  this.toiCount = 0;
},
 get$touching: function() {
  return $.eq($.and(this.flags, 2), 2);
},
 get$enabled: function() {
  return $.eq($.and(this.flags, 4), 4);
},
 flagForFiltering$0: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0))
    return this.flagForFiltering$0$bailout(1, t1);
  this.flags = (t1 | 8) >>> 0;
},
 flagForFiltering$0$bailout: function(state, t1) {
  this.flags = $.or(t1, 8);
},
 update$1: function(listener) {
  var t1 = this._oldManifold;
  t1.setFrom$1(this.manifold);
  var t2 = this.flags;
  if (t2 !== (t2 | 0))
    return this.update$1$bailout(1, listener, t1, t2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.flags = (t2 | 4) >>> 0;
  var t4 = this.flags;
  if (t4 !== (t4 | 0))
    return this.update$1$bailout(2, listener, t1, t4, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var wasTouching = (t4 & 2) === 2;
  var sensorA = this.fixtureA.get$isSensor();
  var sensorB = this.fixtureB.get$isSensor();
  var sensor = sensorA === true || sensorB === true;
  var bodyA = this.fixtureA.get$body();
  var bodyB = this.fixtureB.get$body();
  var xfA = bodyA.get$originTransform();
  var xfB = bodyB.get$originTransform();
  if (sensor) {
    var shapeA = this.fixtureA.get$shape();
    var shapeB = this.fixtureB.get$shape();
    var touching = this.pool.get$collision().testOverlap$4(shapeA, shapeB, xfA, xfB);
    if (typeof touching !== 'boolean')
      return this.update$1$bailout(3, listener, wasTouching, touching, t1, sensor, 0, 0, 0, 0, 0, 0, 0);
    this.manifold.set$pointCount(0);
  } else {
    this.evaluate$3(this.manifold, xfA, xfB);
    t2 = this.manifold.get$pointCount();
    if (typeof t2 !== 'number')
      return this.update$1$bailout(4, listener, wasTouching, bodyA, bodyB, t2, t1, sensor, 0, 0, 0, 0, 0);
    touching = t2 > 0;
    t2 = t1.points;
    var i = 0;
    while (true) {
      var t3 = this.manifold.get$pointCount();
      if (typeof t3 !== 'number')
        return this.update$1$bailout(5, i, listener, wasTouching, bodyB, bodyA, t3, touching, t1, sensor, 0, 0, 0);
      if (!(i < t3))
        break;
      t3 = this.manifold.get$points();
      if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior))
        return this.update$1$bailout(6, i, listener, t3, bodyB, wasTouching, bodyA, touching, t1, sensor, 0, 0, 0);
      if (i < 0 || i >= t3.length)
        throw $.ioore(i);
      var mp2 = t3[i];
      mp2.set$normalImpulse(0.0);
      mp2.set$tangentImpulse(0.0);
      var id2 = mp2.get$id();
      var j = 0;
      while (true) {
        t3 = t1.pointCount;
        if (typeof t3 !== 'number')
          return this.update$1$bailout(7, i, listener, bodyA, bodyB, t3, t1, wasTouching, mp2, id2, touching, j, sensor);
        if (!(j < t3))
          break;
        if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior))
          return this.update$1$bailout(8, i, listener, bodyA, bodyB, t1, wasTouching, mp2, t2, id2, touching, j, sensor);
        if (j < 0 || j >= t2.length)
          throw $.ioore(j);
        var mp1 = t2[j];
        if (mp1.get$id().isEqual$1(id2) === true) {
          mp2.set$normalImpulse(mp1.get$normalImpulse());
          mp2.set$tangentImpulse(mp1.get$tangentImpulse());
          break;
        }
        ++j;
      }
      ++i;
    }
    if (!(touching === wasTouching)) {
      bodyA.set$awake(true);
      bodyB.set$awake(true);
    }
  }
  t2 = this.flags;
  if (t2 !== (t2 | 0))
    return this.update$1$bailout(9, listener, wasTouching, t2, touching, t1, touching, sensor, 0, 0, 0, 0, 0);
  if (touching)
    this.flags = (t2 | 2) >>> 0;
  else
    this.flags = (t2 & -3) >>> 0;
  if (listener == null)
    return;
  if (!wasTouching && touching)
    listener.beginContact$1(this);
  if (wasTouching && !touching)
    listener.endContact$1(this);
  if (!sensor && touching)
    listener.preSolve$2(this, t1);
},
 update$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var listener = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 2:
      listener = env0;
      t1 = env1;
      t4 = env2;
      break;
    case 3:
      listener = env0;
      wasTouching = env1;
      touching = env2;
      t1 = env3;
      sensor = env4;
      break;
    case 4:
      listener = env0;
      wasTouching = env1;
      bodyA = env2;
      bodyB = env3;
      t2 = env4;
      t1 = env5;
      sensor = env6;
      break;
    case 5:
      i = env0;
      listener = env1;
      wasTouching = env2;
      bodyB = env3;
      bodyA = env4;
      t2 = env5;
      touching = env6;
      t1 = env7;
      sensor = env8;
      break;
    case 6:
      i = env0;
      listener = env1;
      t2 = env2;
      bodyB = env3;
      wasTouching = env4;
      bodyA = env5;
      touching = env6;
      t1 = env7;
      sensor = env8;
      break;
    case 7:
      i = env0;
      listener = env1;
      bodyA = env2;
      bodyB = env3;
      t2 = env4;
      t1 = env5;
      wasTouching = env6;
      mp2 = env7;
      id2 = env8;
      touching = env9;
      j = env10;
      sensor = env11;
      break;
    case 8:
      i = env0;
      listener = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      wasTouching = env5;
      mp2 = env6;
      t2 = env7;
      id2 = env8;
      touching = env9;
      j = env10;
      sensor = env11;
      break;
    case 9:
      listener = env0;
      wasTouching = env1;
      t3 = env2;
      touching = env3;
      t1 = env4;
      t2 = env5;
      sensor = env6;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._oldManifold;
      t1.setFrom$1(this.manifold);
      var t2 = this.flags;
    case 1:
      state = 0;
      this.flags = $.or(t2, 4);
      var t4 = this.flags;
    case 2:
      state = 0;
      var wasTouching = $.eq($.and(t4, 2), 2);
      var sensorA = this.fixtureA.get$isSensor();
      var sensorB = this.fixtureB.get$isSensor();
      var sensor = sensorA === true || sensorB === true;
      var bodyA = this.fixtureA.get$body();
      var bodyB = this.fixtureB.get$body();
      var xfA = bodyA.get$originTransform();
      var xfB = bodyB.get$originTransform();
    default:
      if (state === 3 || state === 0 && sensor)
        switch (state) {
          case 0:
            var shapeA = this.fixtureA.get$shape();
            var shapeB = this.fixtureB.get$shape();
            var touching = this.pool.get$collision().testOverlap$4(shapeA, shapeB, xfA, xfB);
          case 3:
            state = 0;
            this.manifold.set$pointCount(0);
        }
      else
        switch (state) {
          case 0:
            this.evaluate$3(this.manifold, xfA, xfB);
            t2 = this.manifold.get$pointCount();
          case 4:
            state = 0;
            touching = $.gt(t2, 0);
            var i = 0;
          default:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    t2 = this.manifold.get$pointCount();
                  case 5:
                    state = 0;
                    if (!$.ltB(i, t2))
                      break L0;
                    t2 = this.manifold.get$points();
                  case 6:
                    state = 0;
                    var mp2 = $.index(t2, i);
                    mp2.set$normalImpulse(0.0);
                    mp2.set$tangentImpulse(0.0);
                    var id2 = mp2.get$id();
                    var j = 0;
                  default:
                    L1:
                      while (true)
                        switch (state) {
                          case 0:
                            t2 = t1.get$pointCount();
                          case 7:
                            state = 0;
                            if (!$.ltB(j, t2))
                              break L1;
                            t2 = t1.get$points();
                          case 8:
                            state = 0;
                            var mp1 = $.index(t2, j);
                            if (mp1.get$id().isEqual$1(id2) === true) {
                              mp2.set$normalImpulse(mp1.get$normalImpulse());
                              mp2.set$tangentImpulse(mp1.get$tangentImpulse());
                              break L1;
                            }
                            ++j;
                        }
                    ++i;
                }
            if (!$.eqB(touching, wasTouching)) {
              bodyA.set$awake(true);
              bodyB.set$awake(true);
            }
        }
      t2 = touching === true;
      var t3 = this.flags;
    case 9:
      state = 0;
      if (t2)
        this.flags = $.or(t3, 2);
      else
        this.flags = $.and(t3, -3);
      if (listener == null)
        return;
      if ($.eqB(wasTouching, false) && $.eqB(touching, true))
        listener.beginContact$1(this);
      if ($.eqB(wasTouching, true) && $.eqB(touching, false))
        listener.endContact$1(this);
      if (!sensor && t2)
        listener.preSolve$2(this, t1);
  }
}
};

$$.ContactConstraint = {"":
 ["points?", "localNormal?", "localPoint?", "normal?", "normalMass?", "K?", "bodyA=", "bodyB=", "type=", "radius=", "friction=", "restitution=", "pointCount=", "manifold="],
 "super": "Object",
 setFrom$1: function(cp) {
  this.pointCount = cp.get$pointCount();
  this.localNormal.setFrom$1(cp.get$localNormal());
  this.localPoint.setFrom$1(cp.get$localPoint());
  this.normal.setFrom$1(cp.get$normal());
  this.normalMass.setFrom$1(cp.get$normalMass());
  this.K.setFrom$1(cp.get$K());
  this.bodyA = cp.get$bodyA();
  this.bodyB = cp.get$bodyB();
  this.type = cp.get$type();
  this.radius = cp.get$radius();
  this.friction = cp.get$friction();
  this.restitution = cp.get$restitution();
  this.manifold = cp.get$manifold();
  var t1 = this.points;
  var i = 0;
  while (true) {
    var t2 = cp.get$pointCount();
    if (typeof t2 !== 'number')
      return this.setFrom$1$bailout(1, cp, t1, i, t2, 0);
    if (!(i < t2))
      break;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = t1[i];
    var t3 = cp.get$points();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior))
      return this.setFrom$1$bailout(2, cp, t2, t3, i, t1);
    if (i < 0 || i >= t3.length)
      throw $.ioore(i);
    t2.setFrom$1(t3[i]);
    ++i;
  }
},
 setFrom$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var cp = env0;
      t1 = env1;
      i = env2;
      t2 = env3;
      break;
    case 2:
      cp = env0;
      t2 = env1;
      t3 = env2;
      i = env3;
      t1 = env4;
      break;
  }
  switch (state) {
    case 0:
      this.pointCount = cp.get$pointCount();
      this.localNormal.setFrom$1(cp.get$localNormal());
      this.localPoint.setFrom$1(cp.get$localPoint());
      this.normal.setFrom$1(cp.get$normal());
      this.normalMass.setFrom$1(cp.get$normalMass());
      this.K.setFrom$1(cp.get$K());
      this.bodyA = cp.get$bodyA();
      this.bodyB = cp.get$bodyB();
      this.type = cp.get$type();
      this.radius = cp.get$radius();
      this.friction = cp.get$friction();
      this.restitution = cp.get$restitution();
      this.manifold = cp.get$manifold();
      var t1 = this.points;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t2 = cp.get$pointCount();
            case 1:
              state = 0;
              if (!$.ltB(i, t2))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              t2 = t1[i];
              var t3 = cp.get$points();
            case 2:
              state = 0;
              t2.setFrom$1($.index(t3, i));
              ++i;
          }
  }
},
 toString$0: function() {
  return 'localNormal: "' + $.S(this.localNormal) + '", localPoint: "' + $.S(this.localPoint) + '" ' + 'normal: "' + $.S(this.normal) + '", radius: "' + $.S(this.radius) + '" friction: "' + $.S(this.friction) + '" ' + 'restitution: "' + $.S(this.restitution) + '", pointCount: "' + $.S(this.pointCount) + '"';
},
 ContactConstraint$0: function() {
  for (var t1 = this.points, i = 0; i < 2; ++i) {
    var t2 = $.ContactConstraintPoint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.ContactConstraintPoint = {"":
 ["localPoint?", "rA?", "rB?", "normalImpulse=", "tangentImpulse=", "normalMass=", "tangentMass=", "velocityBias="],
 "super": "Object",
 setFrom$1: function(cp) {
  this.localPoint.setFrom$1(cp.get$localPoint());
  this.rA.setFrom$1(cp.get$rA());
  this.rB.setFrom$1(cp.get$rB());
  this.normalImpulse = cp.get$normalImpulse();
  this.tangentImpulse = cp.get$tangentImpulse();
  this.normalMass = cp.get$normalMass();
  this.tangentMass = cp.get$tangentMass();
  this.velocityBias = cp.get$velocityBias();
},
 toString$0: function() {
  return 'normal impulse: ' + $.S(this.normalImpulse) + ', tangentImpulse: ' + $.S(this.tangentImpulse) + ', normalMass: ' + $.S(this.normalMass) + ', tangentMass: ' + $.S(this.tangentMass) + ', velocityBias: ' + $.S(this.velocityBias) + ', localPoint: ' + $.S(this.localPoint) + ', rA: ' + $.S(this.rA) + ', rB: ' + $.S(this.rB);
}
};

$$.ContactEdge = {"":
 ["other=", "contact=", "prev=", "next="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); }
};

$$.CircleContact = {"":
 ["flags", "prev", "next", "edge1", "edge2", "fixtureA", "fixtureB", "manifold", "toiCount", "pool", "_oldManifold"],
 "super": "Contact",
 init$2: function(fA, fB) {
  $.Expect_equals(0, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
},
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collideCircles$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
}
};

$$.ContactRegister = {"":
 ["creator?", "primary?"],
 "super": "Object"
};

$$.ContactSolver = {"":
 ["constraints?", "constraintCount", "worldManifold", "tangent", "temp1", "temp2", "P", "dv", "dv1", "dv2", "x?", "d", "P1", "P2", "psolver", "rA?", "rB?"],
 "super": "Object",
 init$3: function(contacts, contactCount, impulseRatio) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object' || contacts === null || contacts.constructor !== Array && !contacts.is$JavaScriptIndexingBehavior))
    return this.init$3$bailout(1, contacts, contactCount, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (typeof impulseRatio !== 'number')
    return this.init$3$bailout(1, contacts, contactCount, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.constraintCount = contactCount;
  if ($.ltB(this.constraints.length, contactCount)) {
    var old = this.constraints;
    this.constraints = $.ListImplementation_List($.max(old.length * 2, this.constraintCount), 'ContactConstraint');
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; t1 = this.constraints, i < t1.length; ++i) {
      var t2 = $.ContactConstraint$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (var t1 = this.worldManifold, t2 = this.tangent, t3 = this.temp2, t4 = this.temp1, t5 = t1.normal, t6 = t1.points, i = 0; $.ltB(i, this.constraintCount); ++i) {
    if (i < 0 || i >= contacts.length)
      throw $.ioore(i);
    var contact = contacts[i];
    var fixtureA = contact.get$fixtureA();
    var fixtureB = contact.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = contact.get$manifold();
    var friction = $.Settings_mixFriction(fixtureA.get$friction(), fixtureB.get$friction());
    var restitution = $.Settings_mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution());
    if (typeof restitution !== 'number')
      return this.init$3$bailout(2, contacts, impulseRatio, t1, friction, restitution, i, t2, t3, t4, radiusA, radiusB, bodyA, bodyB, manifold, 0, 0, 0, 0);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number')
      return this.init$3$bailout(3, contacts, impulseRatio, t1, friction, restitution, vA, vB, wA, t2, i, t3, t4, radiusA, radiusB, bodyA, bodyB, manifold, 0);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number')
      return this.init$3$bailout(4, contacts, impulseRatio, t1, friction, restitution, vA, vB, wA, wB, t2, i, t3, t4, radiusA, radiusB, bodyA, bodyB, manifold);
    t1.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
    var t10 = this.constraints;
    if (i < 0 || i >= t10.length)
      throw $.ioore(i);
    var cc = t10[i];
    cc.set$bodyA(bodyA);
    cc.set$bodyB(bodyB);
    cc.set$manifold(manifold);
    t10 = t5.get$x();
    cc.get$normal().set$x(t10);
    t10 = t5.get$y();
    cc.get$normal().set$y(t10);
    cc.set$pointCount(manifold.get$pointCount());
    cc.set$friction(friction);
    cc.set$restitution(restitution);
    t10 = manifold.get$localNormal().get$x();
    cc.get$localNormal().set$x(t10);
    t10 = manifold.get$localNormal().get$y();
    cc.get$localNormal().set$y(t10);
    t10 = manifold.get$localPoint().get$x();
    cc.get$localPoint().set$x(t10);
    t10 = manifold.get$localPoint().get$y();
    cc.get$localPoint().set$y(t10);
    cc.set$radius($.add(radiusA, radiusB));
    cc.set$type(manifold.get$type());
    for (var t7 = -wA, t8 = -wB, t9 = -restitution, j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      var ccp = $.index(cc.get$points(), j);
      t10 = cp.get$normalImpulse();
      if (typeof t10 !== 'number')
        throw $.iae(t10);
      ccp.set$normalImpulse(impulseRatio * t10);
      var t11 = cp.get$tangentImpulse();
      if (typeof t11 !== 'number')
        throw $.iae(t11);
      ccp.set$tangentImpulse(impulseRatio * t11);
      var t12 = cp.get$localPoint().get$x();
      ccp.get$localPoint().set$x(t12);
      t12 = cp.get$localPoint().get$y();
      ccp.get$localPoint().set$y(t12);
      t12 = $.sub($.index(t6, j).get$x(), bodyA.get$sweep().get$center().get$x());
      ccp.get$rA().set$x(t12);
      t12 = $.sub($.index(t6, j).get$y(), bodyA.get$sweep().get$center().get$y());
      ccp.get$rA().set$y(t12);
      t12 = $.sub($.index(t6, j).get$x(), bodyB.get$sweep().get$center().get$x());
      ccp.get$rB().set$x(t12);
      t12 = $.sub($.index(t6, j).get$y(), bodyB.get$sweep().get$center().get$y());
      ccp.get$rB().set$y(t12);
      var rnA = $.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x()));
      var rnB = $.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x()));
      rnA = $.mul(rnA, rnA);
      rnB = $.mul(rnB, rnB);
      var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB));
      if (typeof kNormal !== 'number')
        throw $.iae(kNormal);
      ccp.set$normalMass(1.0 / kNormal);
      t12 = cc.get$normal().get$y();
      if (typeof t12 !== 'number')
        throw $.iae(t12);
      t2.x = 1.0 * t12;
      var t13 = cc.get$normal().get$x();
      if (typeof t13 !== 'number')
        throw $.iae(t13);
      t2.y = -1.0 * t13;
      var rtA = $.sub($.mul(ccp.get$rA().get$x(), t2.y), $.mul(ccp.get$rA().get$y(), t2.x));
      var rtB = $.sub($.mul(ccp.get$rB().get$x(), t2.y), $.mul(ccp.get$rB().get$y(), t2.x));
      rtA = $.mul(rtA, rtA);
      rtB = $.mul(rtB, rtB);
      var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB));
      if (typeof kTangent !== 'number')
        throw $.iae(kTangent);
      ccp.set$tangentMass(1.0 / kTangent);
      ccp.set$velocityBias(0.0);
      var t14 = ccp.get$rA().get$y();
      if (typeof t14 !== 'number')
        throw $.iae(t14);
      t3.x = t7 * t14;
      var t15 = ccp.get$rA().get$x();
      if (typeof t15 !== 'number')
        throw $.iae(t15);
      t3.y = wA * t15;
      var t16 = ccp.get$rB().get$y();
      if (typeof t16 !== 'number')
        throw $.iae(t16);
      t16 = t8 * t16;
      var t17 = vB.get$x();
      if (typeof t17 !== 'number')
        throw $.iae(t17);
      t17 = t16 + t17;
      t16 = vA.get$x();
      if (typeof t16 !== 'number')
        throw $.iae(t16);
      t16 = t17 - t16;
      t17 = t3.x;
      if (typeof t17 !== 'number')
        throw $.iae(t17);
      t4.x = t16 - t17;
      var t18 = ccp.get$rB().get$x();
      if (typeof t18 !== 'number')
        throw $.iae(t18);
      t18 = wB * t18;
      var t19 = vB.get$y();
      if (typeof t19 !== 'number')
        throw $.iae(t19);
      t19 = t18 + t19;
      t18 = vA.get$y();
      if (typeof t18 !== 'number')
        throw $.iae(t18);
      t18 = t19 - t18;
      t19 = t3.y;
      if (typeof t19 !== 'number')
        throw $.iae(t19);
      t4.y = t18 - t19;
      var a = cc.get$normal();
      var vRel = $.add($.mul(a.get$x(), t4.x), $.mul(a.get$y(), t4.y));
      if ($.ltB(vRel, -1)) {
        if (typeof vRel !== 'number')
          throw $.iae(vRel);
        ccp.set$velocityBias(t9 * vRel);
      }
    }
    if ($.eqB(cc.get$pointCount(), 2)) {
      var ccp1 = $.index(cc.get$points(), 0);
      var ccp2 = $.index(cc.get$points(), 1);
      var invMassA = bodyA.get$invMass();
      var invIA = bodyA.get$invInertia();
      var invMassB = bodyB.get$invMass();
      var invIB = bodyB.get$invInertia();
      t7 = ccp1.get$rA();
      t8 = cc.get$normal();
      var rn1A = $.sub($.mul(t7.get$x(), t8.get$y()), $.mul(t7.get$y(), t8.get$x()));
      t9 = ccp1.get$rB();
      t10 = cc.get$normal();
      var rn1B = $.sub($.mul(t9.get$x(), t10.get$y()), $.mul(t9.get$y(), t10.get$x()));
      t11 = ccp2.get$rA();
      t12 = cc.get$normal();
      var rn2A = $.sub($.mul(t11.get$x(), t12.get$y()), $.mul(t11.get$y(), t12.get$x()));
      t13 = ccp2.get$rB();
      t14 = cc.get$normal();
      var rn2B = $.sub($.mul(t13.get$x(), t14.get$y()), $.mul(t13.get$y(), t14.get$x()));
      var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
      var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
      var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
      t7 = $.mul(k11, k11);
      t8 = $.sub($.mul(k11, k22), $.mul(k12, k12));
      if (typeof t8 !== 'number')
        throw $.iae(t8);
      if ($.ltB(t7, 100.0 * t8)) {
        cc.get$K().get$col1().set$x(k11);
        cc.get$K().get$col1().set$y(k12);
        cc.get$K().get$col2().set$x(k12);
        cc.get$K().get$col2().set$y(k22);
        t7 = cc.get$K().get$col1().get$x();
        cc.get$normalMass().get$col1().set$x(t7);
        t7 = cc.get$K().get$col1().get$y();
        cc.get$normalMass().get$col1().set$y(t7);
        t7 = cc.get$K().get$col2().get$x();
        cc.get$normalMass().get$col2().set$x(t7);
        t7 = cc.get$K().get$col2().get$y();
        cc.get$normalMass().get$col2().set$y(t7);
        cc.get$normalMass().invertLocal$0();
      } else
        cc.set$pointCount(1);
    }
  }
},
 init$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17) {
  switch (state) {
    case 1:
      var contacts = env0;
      var contactCount = env1;
      var impulseRatio = env2;
      break;
    case 2:
      contacts = env0;
      impulseRatio = env1;
      t1 = env2;
      friction = env3;
      restitution = env4;
      i = env5;
      t2 = env6;
      t3 = env7;
      t4 = env8;
      radiusA = env9;
      radiusB = env10;
      bodyA = env11;
      bodyB = env12;
      manifold = env13;
      break;
    case 3:
      contacts = env0;
      impulseRatio = env1;
      t1 = env2;
      friction = env3;
      restitution = env4;
      vA = env5;
      vB = env6;
      wA = env7;
      t2 = env8;
      i = env9;
      t3 = env10;
      t4 = env11;
      radiusA = env12;
      radiusB = env13;
      bodyA = env14;
      bodyB = env15;
      manifold = env16;
      break;
    case 4:
      contacts = env0;
      impulseRatio = env1;
      t1 = env2;
      friction = env3;
      restitution = env4;
      vA = env5;
      vB = env6;
      wA = env7;
      wB = env8;
      t2 = env9;
      i = env10;
      t3 = env11;
      t4 = env12;
      radiusA = env13;
      radiusB = env14;
      bodyA = env15;
      bodyB = env16;
      manifold = env17;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      this.constraintCount = contactCount;
      if ($.ltB(this.constraints.length, contactCount)) {
        var old = this.constraints;
        this.constraints = $.ListImplementation_List($.max(old.length * 2, this.constraintCount), 'ContactConstraint');
        $.setRange$3(this.constraints, 0, old.length, old);
        for (var i = old.length; i < this.constraints.length; ++i) {
          var t1 = this.constraints;
          var t2 = $.ContactConstraint$();
          if (i < 0 || i >= t1.length)
            throw $.ioore(i);
          t1[i] = t2;
        }
      }
      t1 = this.worldManifold;
      t2 = this.tangent;
      var t3 = this.temp2;
      var t4 = this.temp1;
      i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, this.constraintCount))
                break L0;
              var contact = $.index(contacts, i);
              var fixtureA = contact.get$fixtureA();
              var fixtureB = contact.get$fixtureB();
              var shapeA = fixtureA.get$shape();
              var shapeB = fixtureB.get$shape();
              var radiusA = shapeA.get$radius();
              var radiusB = shapeB.get$radius();
              var bodyA = fixtureA.get$body();
              var bodyB = fixtureB.get$body();
              var manifold = contact.get$manifold();
              var friction = $.Settings_mixFriction(fixtureA.get$friction(), fixtureB.get$friction());
              var restitution = $.Settings_mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution());
            case 2:
              state = 0;
              var vA = bodyA.get$linearVelocity();
              var vB = bodyB.get$linearVelocity();
              var wA = bodyA.get$angularVelocity();
            case 3:
              state = 0;
              var wB = bodyB.get$angularVelocity();
            case 4:
              state = 0;
              t1.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
              var t8 = this.constraints;
              if (i < 0 || i >= t8.length)
                throw $.ioore(i);
              var cc = t8[i];
              cc.set$bodyA(bodyA);
              cc.set$bodyB(bodyB);
              cc.set$manifold(manifold);
              t8 = t1.get$normal().get$x();
              cc.get$normal().set$x(t8);
              t8 = t1.get$normal().get$y();
              cc.get$normal().set$y(t8);
              cc.set$pointCount(manifold.get$pointCount());
              cc.set$friction(friction);
              cc.set$restitution(restitution);
              t8 = manifold.get$localNormal().get$x();
              cc.get$localNormal().set$x(t8);
              t8 = manifold.get$localNormal().get$y();
              cc.get$localNormal().set$y(t8);
              t8 = manifold.get$localPoint().get$x();
              cc.get$localPoint().set$x(t8);
              t8 = manifold.get$localPoint().get$y();
              cc.get$localPoint().set$y(t8);
              cc.set$radius($.add(radiusA, radiusB));
              cc.set$type(manifold.get$type());
              for (var j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
                var cp = $.index(manifold.get$points(), j);
                var ccp = $.index(cc.get$points(), j);
                ccp.set$normalImpulse($.mul(impulseRatio, cp.get$normalImpulse()));
                ccp.set$tangentImpulse($.mul(impulseRatio, cp.get$tangentImpulse()));
                var t5 = cp.get$localPoint().get$x();
                ccp.get$localPoint().set$x(t5);
                t5 = cp.get$localPoint().get$y();
                ccp.get$localPoint().set$y(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$x(), bodyA.get$sweep().get$center().get$x());
                ccp.get$rA().set$x(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$y(), bodyA.get$sweep().get$center().get$y());
                ccp.get$rA().set$y(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$x(), bodyB.get$sweep().get$center().get$x());
                ccp.get$rB().set$x(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$y(), bodyB.get$sweep().get$center().get$y());
                ccp.get$rB().set$y(t5);
                var rnA = $.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x()));
                var rnB = $.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x()));
                rnA = $.mul(rnA, rnA);
                rnB = $.mul(rnB, rnB);
                var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB));
                if (typeof kNormal !== 'number')
                  throw $.iae(kNormal);
                ccp.set$normalMass(1.0 / kNormal);
                t5 = cc.get$normal().get$y();
                if (typeof t5 !== 'number')
                  throw $.iae(t5);
                t2.set$x(1.0 * t5);
                var t6 = cc.get$normal().get$x();
                if (typeof t6 !== 'number')
                  throw $.iae(t6);
                t2.set$y(-1.0 * t6);
                var rtA = $.sub($.mul(ccp.get$rA().get$x(), t2.get$y()), $.mul(ccp.get$rA().get$y(), t2.get$x()));
                var rtB = $.sub($.mul(ccp.get$rB().get$x(), t2.get$y()), $.mul(ccp.get$rB().get$y(), t2.get$x()));
                rtA = $.mul(rtA, rtA);
                rtB = $.mul(rtB, rtB);
                var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB));
                if (typeof kTangent !== 'number')
                  throw $.iae(kTangent);
                ccp.set$tangentMass(1.0 / kTangent);
                ccp.set$velocityBias(0.0);
                t3.set$x($.mul($.neg(wA), ccp.get$rA().get$y()));
                t3.set$y($.mul(wA, ccp.get$rA().get$x()));
                t4.set$x($.sub($.sub($.add($.mul($.neg(wB), ccp.get$rB().get$y()), vB.get$x()), vA.get$x()), t3.get$x()));
                t4.set$y($.sub($.sub($.add($.mul(wB, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()), t3.get$y()));
                var a = cc.get$normal();
                var vRel = $.add($.mul(a.get$x(), t4.get$x()), $.mul(a.get$y(), t4.get$y()));
                if ($.ltB(vRel, -1))
                  ccp.set$velocityBias($.mul($.neg(restitution), vRel));
              }
              if ($.eqB(cc.get$pointCount(), 2)) {
                var ccp1 = $.index(cc.get$points(), 0);
                var ccp2 = $.index(cc.get$points(), 1);
                var invMassA = bodyA.get$invMass();
                var invIA = bodyA.get$invInertia();
                var invMassB = bodyB.get$invMass();
                var invIB = bodyB.get$invInertia();
                t5 = ccp1.get$rA();
                t6 = cc.get$normal();
                var rn1A = $.sub($.mul(t5.get$x(), t6.get$y()), $.mul(t5.get$y(), t6.get$x()));
                var t7 = ccp1.get$rB();
                t8 = cc.get$normal();
                var rn1B = $.sub($.mul(t7.get$x(), t8.get$y()), $.mul(t7.get$y(), t8.get$x()));
                var t9 = ccp2.get$rA();
                var t10 = cc.get$normal();
                var rn2A = $.sub($.mul(t9.get$x(), t10.get$y()), $.mul(t9.get$y(), t10.get$x()));
                var t11 = ccp2.get$rB();
                var t12 = cc.get$normal();
                var rn2B = $.sub($.mul(t11.get$x(), t12.get$y()), $.mul(t11.get$y(), t12.get$x()));
                var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
                var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
                var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
                t5 = $.mul(k11, k11);
                t6 = $.sub($.mul(k11, k22), $.mul(k12, k12));
                if (typeof t6 !== 'number')
                  throw $.iae(t6);
                if ($.ltB(t5, 100.0 * t6)) {
                  cc.get$K().get$col1().set$x(k11);
                  cc.get$K().get$col1().set$y(k12);
                  cc.get$K().get$col2().set$x(k12);
                  cc.get$K().get$col2().set$y(k22);
                  t5 = cc.get$K().get$col1().get$x();
                  cc.get$normalMass().get$col1().set$x(t5);
                  t5 = cc.get$K().get$col1().get$y();
                  cc.get$normalMass().get$col1().set$y(t5);
                  t5 = cc.get$K().get$col2().get$x();
                  cc.get$normalMass().get$col2().set$x(t5);
                  t5 = cc.get$K().get$col2().get$y();
                  cc.get$normalMass().get$col2().set$y(t5);
                  cc.get$normalMass().invertLocal$0();
                } else
                  cc.set$pointCount(1);
              }
              ++i;
          }
  }
},
 warmStart$0: function() {
  for (var t1 = this.tangent, i = 0; $.ltB(i, this.constraintCount); ++i) {
    var t2 = this.constraints;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    var c = t2[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number')
      return this.warmStart$0$bailout(1, c, bodyA, bodyB, invMassA, i, t1, 0, 0, 0);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number')
      return this.warmStart$0$bailout(2, c, bodyA, bodyB, invMassA, i, invIA, t1, 0, 0);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number')
      return this.warmStart$0$bailout(3, c, bodyA, bodyB, invMassA, i, invIA, invMassB, t1, 0);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number')
      return this.warmStart$0$bailout(4, c, bodyA, bodyB, invMassA, i, invIA, invMassB, invIB, t1);
    var normal = c.get$normal();
    $.Vector_crossVectorAndNumToOut(normal, 1, t1);
    for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      var ccp = $.index(c.get$points(), j);
      var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), t1.x));
      var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), t1.y));
      t2 = bodyA.get$angularVelocity();
      var t3 = $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px));
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      bodyA.set$angularVelocity($.sub(t2, invIA * t3));
      var t4 = bodyA.get$linearVelocity();
      t4.set$x($.sub(t4.get$x(), $.mul(Px, invMassA)));
      t4 = bodyA.get$linearVelocity();
      t4.set$y($.sub(t4.get$y(), $.mul(Py, invMassA)));
      t4 = bodyB.get$angularVelocity();
      var t5 = $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px));
      if (typeof t5 !== 'number')
        throw $.iae(t5);
      bodyB.set$angularVelocity($.add(t4, invIB * t5));
      var t6 = bodyB.get$linearVelocity();
      t6.set$x($.add(t6.get$x(), $.mul(Px, invMassB)));
      t6 = bodyB.get$linearVelocity();
      t6.set$y($.add(t6.get$y(), $.mul(Py, invMassB)));
    }
  }
},
 warmStart$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      t1 = env5;
      break;
    case 2:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      invIA = env5;
      t1 = env6;
      break;
    case 3:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      invIA = env5;
      invMassB = env6;
      t1 = env7;
      break;
    case 4:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      invIA = env5;
      invMassB = env6;
      invIB = env7;
      t1 = env8;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.tangent;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, this.constraintCount))
                break L0;
              var t2 = this.constraints;
              if (i < 0 || i >= t2.length)
                throw $.ioore(i);
              var c = t2[i];
              var bodyA = c.get$bodyA();
              var bodyB = c.get$bodyB();
              var invMassA = bodyA.get$invMass();
            case 1:
              state = 0;
              var invIA = bodyA.get$invInertia();
            case 2:
              state = 0;
              var invMassB = bodyB.get$invMass();
            case 3:
              state = 0;
              var invIB = bodyB.get$invInertia();
            case 4:
              state = 0;
              var normal = c.get$normal();
              $.Vector_crossVectorAndNumToOut(normal, 1, t1);
              for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
                var ccp = $.index(c.get$points(), j);
                var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), t1.get$x()));
                var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), t1.get$y()));
                bodyA.set$angularVelocity($.sub(bodyA.get$angularVelocity(), $.mul(invIA, $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px)))));
                t2 = bodyA.get$linearVelocity();
                t2.set$x($.sub(t2.get$x(), $.mul(Px, invMassA)));
                t2 = bodyA.get$linearVelocity();
                t2.set$y($.sub(t2.get$y(), $.mul(Py, invMassA)));
                bodyB.set$angularVelocity($.add(bodyB.get$angularVelocity(), $.mul(invIB, $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px)))));
                t2 = bodyB.get$linearVelocity();
                t2.set$x($.add(t2.get$x(), $.mul(Px, invMassB)));
                t2 = bodyB.get$linearVelocity();
                t2.set$y($.add(t2.get$y(), $.mul(Py, invMassB)));
              }
              ++i;
          }
  }
},
 solveVelocityConstraints$0: function() {
  var t1 = this.tangent;
  var t2 = this.dv;
  var t3 = this.dv1;
  var t4 = this.dv2;
  var t5 = this.temp2;
  var t6 = this.x;
  var t7 = this.d;
  var t8 = this.P1;
  var t9 = this.P2;
  var t10 = this.temp1;
  var i = 0;
  while (true) {
    var t11 = this.constraintCount;
    if (typeof t11 !== 'number')
      return this.solveVelocityConstraints$0$bailout(1, t3, t10, t4, i, t5, t11, t1, t2, t6, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (!(i < t11))
      break;
    t11 = this.constraints;
    if (i < 0 || i >= t11.length)
      throw $.ioore(i);
    var c = t11[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number')
      return this.solveVelocityConstraints$0$bailout(2, t3, t10, t4, i, t5, t1, c, bodyA, bodyB, wA, t6, t2, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number')
      return this.solveVelocityConstraints$0$bailout(3, t3, t10, t4, i, t5, t1, c, bodyA, bodyB, wA, wB, t6, t2, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number')
      return this.solveVelocityConstraints$0$bailout(4, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number')
      return this.solveVelocityConstraints$0$bailout(5, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number')
      return this.solveVelocityConstraints$0$bailout(6, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, invMassB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number')
      return this.solveVelocityConstraints$0$bailout(7, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, invMassB, invIB, t8, t7, t9, 0, 0, 0, 0, 0, 0, 0, 0);
    var t17 = c.get$normal().get$y();
    if (typeof t17 !== 'number')
      throw $.iae(t17);
    t1.x = 1.0 * t17;
    var t18 = c.get$normal().get$x();
    if (typeof t18 !== 'number')
      throw $.iae(t18);
    t1.y = -1.0 * t18;
    var friction = c.get$friction();
    if (typeof friction !== 'number')
      return this.solveVelocityConstraints$0$bailout(8, t3, t4, i, t5, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, invMassB, invIB, t8, t7, t9, t10, friction, t1, t2, 0, 0, 0, 0, 0, 0, 0);
    var j = 0;
    while (true) {
      t11 = c.get$pointCount();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(9, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, t11, 0, 0, 0, 0, 0);
      if (!(j < t11))
        break;
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior))
        return this.solveVelocityConstraints$0$bailout(10, t3, t4, i, t11, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0, 0, 0, 0);
      if (j < 0 || j >= t11.length)
        throw $.ioore(j);
      var ccp = t11[j];
      var a = ccp.get$rA();
      t11 = -wB;
      var t13 = ccp.get$rB().get$y();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(11, t3, t4, i, ccp, a, t11, t5, t13, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t13 = t11 * t13;
      t11 = vB.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(12, t3, t4, i, ccp, a, t5, t13, t11, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t11 = t13 + t11;
      t13 = vA.get$x();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(13, t3, t4, i, ccp, a, t5, c, t11, bodyB, t13, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t6, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t13 = t11 - t13;
      t11 = a.get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(14, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t13, vA, vB, invMassA, invIA, invMassB, invIB, t11, t8, t7, t6, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t2.x = t13 + wA * t11;
      t18 = ccp.get$rB().get$x();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(15, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t18, t9, t10, friction, t1, wB, j, t2, wA, 0, 0, 0);
      t18 = wB * t18;
      var t20 = vB.get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(16, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t18, t20, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t20 = t18 + t20;
      t18 = vA.get$y();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(17, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t20, t18, friction, t1, wB, j, t2, wA, 0, 0);
      t18 = t20 - t18;
      t20 = a.get$x();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(18, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t18, t20, friction, t1, wB, j, t2, wA, 0, 0, 0);
      t2.y = t18 - wA * t20;
      var t24 = t2.x;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(19, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t24, t1, wB, j, t2, wA, 0, 0, 0, 0);
      var t26 = t1.x;
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(20, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t24, t1, t26, wB, j, t2, wA, 0, 0, 0);
      t26 = t24 * t26;
      t24 = t2.y;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(21, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t26, t2, t24, wA, 0, 0, 0);
      var t29 = t1.y;
      if (typeof t29 !== 'number')
        return this.solveVelocityConstraints$0$bailout(22, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t26, t2, t24, t29, wA, 0, 0);
      var vt = t26 + t24 * t29;
      t26 = ccp.get$tangentMass();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(23, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, t9, t10, friction, t1, wB, j, t2, wA, vt, t26, 0, 0, 0);
      var lambda = t26 * -vt;
      t26 = ccp.get$normalImpulse();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(24, lambda, t26, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0, 0);
      var maxFriction = friction * t26;
      t26 = ccp.get$tangentImpulse();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(25, lambda, t3, maxFriction, t26, i, t4, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t26 += lambda;
      var newImpulse = $.max(-maxFriction, $.min(t26, maxFriction));
      var t34 = ccp.get$tangentImpulse();
      if (typeof t34 !== 'number')
        throw $.iae(t34);
      lambda = newImpulse - t34;
      t34 = t1.x;
      if (typeof t34 !== 'number')
        return this.solveVelocityConstraints$0$bailout(26, t3, t4, i, ccp, t5, newImpulse, lambda, c, bodyA, bodyB, t34, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      var Px = t34 * lambda;
      t34 = t1.y;
      if (typeof t34 !== 'number')
        return this.solveVelocityConstraints$0$bailout(27, t3, t4, i, ccp, t5, newImpulse, lambda, c, bodyA, bodyB, Px, t34, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t6, t9, t10, friction, t1, wB, j, t2, wA, 0);
      var Py = t34 * lambda;
      t34 = vA.get$x();
      if (typeof t34 !== 'number')
        return this.solveVelocityConstraints$0$bailout(28, t3, t4, i, ccp, t5, newImpulse, c, bodyA, bodyB, Px, t6, vA, Py, invMassA, invIA, invMassB, invIB, t7, vB, t34, t9, t8, t10, friction, t1, wB, j, t2, wA, 0);
      vA.set$x(t34 - Px * invMassA);
      var t38 = vA.get$y();
      if (typeof t38 !== 'number')
        return this.solveVelocityConstraints$0$bailout(29, t3, t4, i, ccp, t5, newImpulse, c, bodyA, bodyB, Px, t6, vA, Py, invMassA, invIA, invMassB, invIB, t7, vB, t38, t9, t8, t10, friction, t1, wB, j, t2, wA, 0);
      vA.set$y(t38 - Py * invMassA);
      var t40 = ccp.get$rA().get$x();
      if (typeof t40 !== 'number')
        return this.solveVelocityConstraints$0$bailout(30, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, t40, friction, t1, wB, j, t2, wA, 0);
      t40 *= Py;
      var t42 = ccp.get$rA().get$y();
      if (typeof t42 !== 'number')
        return this.solveVelocityConstraints$0$bailout(31, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, invIB, t7, t8, invMassA, t9, t10, t40, t42, friction, t1, wB, j, t2, wA);
      wA -= invIA * (t40 - t42 * Px);
      var t44 = vB.get$x();
      if (typeof t44 !== 'number')
        return this.solveVelocityConstraints$0$bailout(32, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, friction, t1, wA, j, t44, wB, t2, 0);
      vB.set$x(t44 + Px * invMassB);
      var t46 = vB.get$y();
      if (typeof t46 !== 'number')
        return this.solveVelocityConstraints$0$bailout(33, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, friction, t1, wA, j, t2, wB, t46, 0);
      vB.set$y(t46 + Py * invMassB);
      var t48 = ccp.get$rB().get$x();
      if (typeof t48 !== 'number')
        return this.solveVelocityConstraints$0$bailout(34, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, friction, t1, wA, j, t2, wB, t48, 0);
      t48 *= Py;
      var t50 = ccp.get$rB().get$y();
      if (typeof t50 !== 'number')
        return this.solveVelocityConstraints$0$bailout(35, t3, t48, t50, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, t9, t10, friction, t1, wA, j, t2, wB, 0);
      wB += invIB * (t48 - t50 * Px);
      ccp.set$tangentImpulse(newImpulse);
      ++j;
    }
    t11 = c.get$pointCount();
    if (typeof t11 !== 'number')
      return this.solveVelocityConstraints$0$bailout(36, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, t11, vB, invMassA, invMassB, invIB, invIA, t8, t7, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
    t11 = t11 === 1;
    t13 = -wB;
    if (t11) {
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior))
        return this.solveVelocityConstraints$0$bailout(37, t8, t3, t10, t4, i, t7, t5, t1, wB, bodyA, t2, bodyB, t6, vA, c, vB, invMassA, invIA, invMassB, invIB, wA, t11, t9, 0, 0, 0, 0, 0, 0, 0);
      if (0 >= t11.length)
        throw $.ioore(0);
      ccp = t11[0];
      var a1 = ccp.get$rA();
      t11 = ccp.get$rB().get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(38, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t13, t10, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      t11 = t13 * t11;
      t13 = vB.get$x();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(39, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t11, t13, t1, wB, t2, wA, 0, 0, 0, 0);
      t13 = t11 + t13;
      t11 = vA.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(40, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t13, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      t11 = t13 - t11;
      t13 = a1.get$y();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(41, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t11, t13, t1, wB, t2, wA, 0, 0, 0, 0);
      t2.x = t11 + wA * t13;
      t18 = ccp.get$rB().get$x();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(42, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, a1, t9, t10, t1, wB, t2, t18, wA, 0, 0, 0, 0, 0);
      t18 = wB * t18;
      t20 = vB.get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(43, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t1, wB, t2, t18, t20, wA, 0, 0, 0, 0);
      t20 = t18 + t20;
      t18 = vA.get$y();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(44, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t1, wB, t2, t20, wA, t18, 0, 0, 0, 0);
      t18 = t20 - t18;
      t20 = a1.get$x();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(45, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, t9, t10, t1, wB, t2, wA, t18, t20, 0, 0, 0, 0, 0);
      t2.y = t18 - wA * t20;
      var b = c.get$normal();
      t24 = t2.x;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(46, t3, t4, b, i, t24, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      t26 = b.get$x();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(47, t3, t4, b, i, t24, t26, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0);
      t26 = t24 * t26;
      t24 = t2.y;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(48, t3, t4, b, i, t26, t24, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0);
      t29 = b.get$y();
      if (typeof t29 !== 'number')
        return this.solveVelocityConstraints$0$bailout(49, t3, t4, i, t26, t24, t29, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0);
      var vn = t26 + t24 * t29;
      t26 = ccp.get$normalMass();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(50, t3, t4, i, t5, vn, t26, bodyA, bodyB, c, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      t26 = -t26;
      var t32 = ccp.get$velocityBias();
      if (typeof t32 !== 'number')
        return this.solveVelocityConstraints$0$bailout(51, t3, t4, i, t5, vn, c, bodyA, t26, bodyB, t6, vA, t32, vB, invMassA, invIA, invMassB, invIB, t8, ccp, t9, t10, t7, t1, wB, t2, wA, 0, 0, 0, 0);
      lambda = t26 * (vn - t32);
      t26 = ccp.get$normalImpulse();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(52, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, lambda, invMassA, invIA, t7, invIB, invMassB, ccp, t26, t8, t10, t9, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      a = t26 + lambda;
      newImpulse = a > 0.0 ? a : 0.0;
      t11 = ccp.get$normalImpulse();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(53, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      lambda = newImpulse - t11;
      t11 = c.get$normal().get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(54, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, lambda, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      Px = t11 * lambda;
      t11 = c.get$normal().get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(55, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, lambda, Px, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      Py = t11 * lambda;
      t11 = vA.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(56, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t11, wB, t2, t1, wA, 0, 0, 0, 0);
      vA.set$x(t11 - Px * invMassA);
      var t16 = vA.get$y();
      if (typeof t16 !== 'number')
        return this.solveVelocityConstraints$0$bailout(57, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, t16, wA, 0, 0, 0, 0);
      vA.set$y(t16 - Py * invMassA);
      t18 = ccp.get$rA().get$x();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(58, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, wA, t18, 0, 0, 0, 0, 0);
      t18 *= Py;
      t20 = ccp.get$rA().get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(59, t20, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, wA, t18, 0, 0, 0, 0);
      wA -= invIA * (t18 - t20 * Px);
      var t22 = vB.get$x();
      if (typeof t22 !== 'number')
        return this.solveVelocityConstraints$0$bailout(60, t3, t4, i, wA, t22, t5, bodyA, bodyB, t6, vA, vB, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, 0, 0, 0, 0, 0, 0);
      vB.set$x(t22 + Px * invMassB);
      t24 = vB.get$y();
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(61, t3, t4, i, wA, t5, t24, bodyA, bodyB, t6, vA, vB, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, 0, 0, 0, 0, 0, 0);
      vB.set$y(t24 + Py * invMassB);
      t26 = ccp.get$rB().get$x();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(62, t3, t10, t4, newImpulse, i, wA, Px, t5, Py, t1, wB, bodyA, bodyB, t2, t6, vA, vB, t26, invIB, t7, t8, ccp, t9, 0, 0, 0, 0, 0, 0, 0);
      t26 *= Py;
      var t28 = ccp.get$rB().get$y();
      if (typeof t28 !== 'number')
        return this.solveVelocityConstraints$0$bailout(63, t3, t10, t4, newImpulse, i, wA, t7, Px, t5, t1, wB, bodyA, bodyB, t2, t6, vA, vB, t26, invIB, t28, t8, ccp, t9, 0, 0, 0, 0, 0, 0, 0);
      wB += invIB * (t26 - t28 * Px);
      ccp.set$normalImpulse(newImpulse);
    } else {
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior))
        return this.solveVelocityConstraints$0$bailout(64, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
      if (0 >= t11.length)
        throw $.ioore(0);
      var cp1 = t11[0];
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior))
        return this.solveVelocityConstraints$0$bailout(65, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
      if (1 >= t11.length)
        throw $.ioore(1);
      var cp2 = t11[1];
      a = $.Vector$(cp1.get$normalImpulse(), cp2.get$normalImpulse());
      t11 = cp1.get$rB().get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(66, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, t13, wB, t11, t2, wA, 0, 0, 0);
      t11 = t13 * t11;
      t16 = vB.get$x();
      if (typeof t16 !== 'number')
        return this.solveVelocityConstraints$0$bailout(67, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, t11, t16, wA, 0, 0, 0);
      t16 = t11 + t16;
      t11 = vA.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(68, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, t16, t11, wA, 0, 0, 0);
      t11 = t16 - t11;
      t16 = cp1.get$rA().get$y();
      if (typeof t16 !== 'number')
        return this.solveVelocityConstraints$0$bailout(69, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, t11, t16, 0, 0, 0);
      t3.x = t11 + wA * t16;
      t20 = cp1.get$rB().get$x();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(70, t3, t4, i, t20, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0, 0);
      t20 = wB * t20;
      t22 = vB.get$y();
      if (typeof t22 !== 'number')
        return this.solveVelocityConstraints$0$bailout(71, t3, t4, i, t20, t22, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t22 = t20 + t22;
      t20 = vA.get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(72, t3, t4, i, t22, t5, t20, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t20 = t22 - t20;
      t22 = cp1.get$rA().get$x();
      if (typeof t22 !== 'number')
        return this.solveVelocityConstraints$0$bailout(73, t3, t4, i, t5, t20, t22, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t3.y = t20 - wA * t22;
      t26 = cp2.get$rB().get$y();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(74, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, t13, vB, t26, invIA, invMassA, invIB, invMassB, t7, t9, t8, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t26 = t13 * t26;
      t13 = vB.get$x();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(75, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t13, t8, t7, t9, t10, t26, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t13 = t26 + t13;
      t26 = vA.get$x();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(76, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t13, t26, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t26 = t13 - t26;
      t13 = cp2.get$rA().get$y();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(77, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t26, t13, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t4.x = t26 + wA * t13;
      var t31 = cp2.get$rB().get$x();
      if (typeof t31 !== 'number')
        return this.solveVelocityConstraints$0$bailout(78, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, t31, a, t1, wB, t2, wA, 0, 0, 0, 0);
      t31 = wB * t31;
      var t33 = vB.get$y();
      if (typeof t33 !== 'number')
        return this.solveVelocityConstraints$0$bailout(79, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, t31, t33, a, t1, wB, t2, wA, 0, 0, 0);
      t33 = t31 + t33;
      t31 = vA.get$y();
      if (typeof t31 !== 'number')
        return this.solveVelocityConstraints$0$bailout(80, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t33, wB, t31, t1, t2, wA, 0, 0, 0);
      t31 = t33 - t31;
      t33 = cp2.get$rA().get$x();
      if (typeof t33 !== 'number')
        return this.solveVelocityConstraints$0$bailout(81, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t31, t2, t33, wA, 0, 0, 0);
      t4.y = t31 - wA * t33;
      var t37 = t3.x;
      if (typeof t37 !== 'number')
        return this.solveVelocityConstraints$0$bailout(82, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, t37, 0, 0, 0, 0);
      var t39 = c.get$normal().get$x();
      if (typeof t39 !== 'number')
        return this.solveVelocityConstraints$0$bailout(83, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, t37, t39, 0, 0, 0);
      t39 = t37 * t39;
      t37 = t3.y;
      if (typeof t37 !== 'number')
        return this.solveVelocityConstraints$0$bailout(84, t39, t3, t4, t37, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t42 = c.get$normal().get$y();
      if (typeof t42 !== 'number')
        return this.solveVelocityConstraints$0$bailout(85, t39, t3, t4, t37, i, t42, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      var vn1 = t39 + t37 * t42;
      t39 = t4.x;
      if (typeof t39 !== 'number')
        return this.solveVelocityConstraints$0$bailout(86, t3, t4, i, vn1, t5, t39, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t45 = c.get$normal().get$x();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(87, t3, t4, i, vn1, t5, t39, t45, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t45 = t39 * t45;
      t39 = t4.y;
      if (typeof t39 !== 'number')
        return this.solveVelocityConstraints$0$bailout(88, t3, t4, i, vn1, t5, t45, c, bodyA, bodyB, t39, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t48 = c.get$normal().get$y();
      if (typeof t48 !== 'number')
        return this.solveVelocityConstraints$0$bailout(89, t3, t4, i, vn1, t5, t45, c, bodyA, t48, bodyB, t6, vA, t39, vB, invMassA, invIA, invMassB, invIB, t8, t7, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0);
      var vn2 = t45 + t39 * t48;
      t45 = cp1.get$velocityBias();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(90, t3, t4, i, vn1, t5, c, bodyA, bodyB, t6, vA, vn2, vB, t45, invIA, invMassA, invIB, invMassB, t7, t9, t8, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t45 = vn1 - t45;
      var t51 = cp2.get$velocityBias();
      if (typeof t51 !== 'number')
        return this.solveVelocityConstraints$0$bailout(91, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vn2, vB, invMassA, invIA, invMassB, t51, t8, invIB, t9, t10, t7, cp1, t45, cp2, a, t1, wB, t2, wA, 0, 0);
      b = $.Vector$(t45, vn2 - t51);
      t45 = c.get$K().get$col1().get$x();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(92, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t45, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t54 = a.x;
      if (typeof t54 !== 'number')
        return this.solveVelocityConstraints$0$bailout(93, t3, t4, i, t54, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t45, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t54 = t45 * t54;
      t45 = c.get$K().get$col2().get$x();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(94, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t54, cp1, t45, cp2, a, t1, wB, t2, wA, 0, 0);
      var t57 = a.y;
      if (typeof t57 !== 'number')
        return this.solveVelocityConstraints$0$bailout(95, t3, t4, i, t57, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t54, cp1, t45, cp2, a, t1, wB, t2, wA, 0);
      t5.x = t54 + t45 * t57;
      var t59 = c.get$K().get$col1().get$y();
      if (typeof t59 !== 'number')
        return this.solveVelocityConstraints$0$bailout(96, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t59, t2, wA, 0, 0, 0);
      var t61 = a.x;
      if (typeof t61 !== 'number')
        return this.solveVelocityConstraints$0$bailout(97, t3, t4, i, t5, t61, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t59, t2, wA, 0, 0);
      t61 = t59 * t61;
      t59 = c.get$K().get$col2().get$y();
      if (typeof t59 !== 'number')
        return this.solveVelocityConstraints$0$bailout(98, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, t61, t59, wA, 0, 0);
      var t64 = a.y;
      if (typeof t64 !== 'number')
        return this.solveVelocityConstraints$0$bailout(99, t3, t4, i, t5, t64, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, t61, t59, wA, 0);
      t5.y = t61 + t59 * t64;
      var t66 = b.x;
      if (typeof t66 !== 'number')
        return this.solveVelocityConstraints$0$bailout(100, t3, t4, i, t5, t66, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t68 = t5.x;
      if (typeof t68 !== 'number')
        return this.solveVelocityConstraints$0$bailout(101, t3, t68, t4, i, t5, t66, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      b.x = t66 - t68;
      var t70 = b.y;
      if (typeof t70 !== 'number')
        return this.solveVelocityConstraints$0$bailout(102, t3, t4, i, t5, c, bodyA, t70, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t72 = t5.y;
      if (typeof t72 !== 'number')
        return this.solveVelocityConstraints$0$bailout(103, t3, t4, i, t72, t5, c, t70, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      b.y = t70 - t72;
      for (; true;) {
        $.Matrix22_mulMatrixAndVectorToOut(c.get$normalMass(), b, t6);
        t6.mulLocal$1(-1);
        t11 = t6.get$x();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(104, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t11, t2, wA, 0, 0, 0);
        if (t11 >= 0.0) {
          t11 = t6.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(105, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, t11, wA, 0, 0, 0);
          t11 = t11 >= 0.0;
        } else
          t11 = false;
        if (t11) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          var t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(106, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, t11, t12, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
          var t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(107, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, t11, t12, cp1, t14, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(108, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, t14, cp2, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(109, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, t14, cp2, t11, t16, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          var t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(110, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, t14, wB, t2, t19, t18, wA, 0, 0, 0, 0, 0, 0);
          var t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(111, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, t14, wB, t19, t18, t21, t2, wA, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(112, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t14, wB, t2, t1, t18, t21, wA, 0, 0, 0, 0, 0, 0);
          var t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(113, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t14, wB, t1, t2, t21, t18, t23, wA, 0, 0, 0, 0, 0);
          var wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          var t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(114, t3, wA0, t25, t10, i, t26, cp1, t4, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, vB, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(115, t3, wA0, t25, t4, i, t26, t28, t5, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(116, t3, wA0, t4, t10, i, cp1, t28, t25, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, vB, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          var t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(117, t3, wA0, t4, i, t28, t25, t30, t5, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(118, t3, wA0, t4, i, t5, t28, t32, t33, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          var t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(119, t3, wA0, t4, i, t5, t28, t32, t33, bodyA, bodyB, t6, vA, vB, t35, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(120, t3, wA0, t4, i, t5, t28, bodyA, bodyB, t35, t6, vA, vB, t32, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(121, t3, wA0, t4, i, t5, t28, bodyA, bodyB, t35, t6, vA, vB, t32, t37, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          var wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t11 = cp1.get$normalMass();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(122, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, t11, cp2, a, t1, wB, t2, wA, 0, 0, 0);
        t11 = -t11;
        t13 = b.x;
        if (typeof t13 !== 'number')
          return this.solveVelocityConstraints$0$bailout(123, t3, t13, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, t11, a, t1, wB, t2, wA, 0, 0);
        t6.set$x(t11 * t13);
        t6.set$y(0.0);
        var t15 = c.get$K().get$col1().get$y();
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(124, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t15, wA, 0, 0, 0);
        t17 = t6.get$x();
        if (typeof t17 !== 'number')
          return this.solveVelocityConstraints$0$bailout(125, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t15, t17, wA, 0, 0);
        t17 = t15 * t17;
        t15 = b.y;
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(126, t3, t15, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t17, wA, 0, 0);
        vn2 = t17 + t15;
        t11 = t6.get$x();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(127, t11, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, vn2, 0, 0);
        if (t11 >= 0.0 && vn2 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(128, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t11, t1, wB, t12, t2, wA, 0, 0, 0, 0, 0, 0, 0);
          t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(129, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t11, t1, wB, t12, t2, t14, wA, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(130, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, wA, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(131, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, t16, wA, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(132, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t18, wA, t19, 0, 0, 0, 0, 0, 0);
          t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(133, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t18, wA, t19, t21, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(134, t21, t18, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, wA, 0, 0, 0, 0, 0, 0);
          t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(135, t21, t18, t23, t4, t3, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, wA, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(136, t3, t10, t4, i, cp1, cp2, wA0, t25, t5, t26, t1, wB, bodyA, bodyB, t2, t6, vA, vB, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(137, t3, t4, i, t5, wA0, t25, t26, t28, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(138, t3, t10, t4, i, cp1, cp2, wA0, t5, t1, wB, bodyA, bodyB, t25, t6, vA, vB, t28, t2, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(139, t3, t4, i, t5, wA0, bodyA, bodyB, t25, t6, vA, vB, t28, t30, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(140, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, t32, invIB, t33, t8, t7, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(141, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, t32, invIB, t33, t35, t7, t9, t8, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(142, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, invIB, t7, t8, t35, t32, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(143, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, invIB, t7, t8, t35, t32, t37, t10, t9, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t6.set$x(0.0);
        t11 = cp2.get$normalMass();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(144, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t11, wA, 0, 0, 0);
        t11 = -t11;
        t13 = b.y;
        if (typeof t13 !== 'number')
          return this.solveVelocityConstraints$0$bailout(145, t3, t4, t13, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t11, wA, 0, 0);
        t6.set$y(t11 * t13);
        t15 = c.get$K().get$col2().get$x();
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(146, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, t15, 0, 0, 0);
        t17 = t6.get$y();
        if (typeof t17 !== 'number')
          return this.solveVelocityConstraints$0$bailout(147, t17, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, t15, 0, 0);
        t17 = t15 * t17;
        t15 = b.x;
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(148, t3, t17, t4, i, t15, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
        vn1 = t17 + t15;
        t11 = t6.get$y();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(149, t3, t4, i, vn1, t11, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
        if (t11 >= 0.0 && vn1 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(150, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, t7, invIB, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, wA, t12, 0, 0, 0, 0, 0, 0, 0);
          t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(151, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, wA, t12, t14, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(152, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t11, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(153, t16, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t11, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(154, t3, t4, t14, i, t18, t19, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(155, t3, t4, t14, i, t18, t19, t21, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(156, t3, t4, t14, i, t21, t18, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(157, t3, t4, t14, i, t21, t18, t23, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(158, t3, t10, t4, i, cp1, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, wA0, vB, t26, t25, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(159, t3, t4, i, t5, bodyA, bodyB, t6, vA, wA0, vB, t26, t25, invIB, t7, t28, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(160, t3, t10, t4, i, cp1, t7, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, wA0, vB, invIB, t28, t25, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(161, t3, t4, i, t5, bodyA, bodyB, t6, vA, wA0, vB, t7, invIB, t8, t25, t28, t9, t10, t30, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(162, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, t32, t33, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(163, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, t32, t33, t35, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(164, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, cp1, t35, t32, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(165, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, cp1, t35, t32, cp2, t37, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t6.set$x(0.0);
        t6.set$y(0.0);
        vn1 = b.x;
        if (typeof vn1 !== 'number')
          return this.solveVelocityConstraints$0$bailout(166, t3, t4, i, vn1, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
        vn2 = b.y;
        if (typeof vn2 !== 'number')
          return this.solveVelocityConstraints$0$bailout(167, t3, t4, i, vn1, vn2, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
        if (vn1 >= 0.0 && vn2 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(168, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, t12, wA, 0, 0, 0, 0, 0, 0, 0);
          t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(169, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, t12, t14, wA, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(170, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, wA, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(171, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, t16, wA, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(172, t19, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t18, 0, 0, 0, 0, 0, 0);
          t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(173, t19, t21, t4, t3, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t18, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(174, t3, t4, t21, i, t18, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, 0, 0, 0, 0, 0, 0);
          t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(175, t3, t4, t21, i, t18, t23, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(176, t3, t10, t4, i, cp1, cp2, t5, t2, wA0, wB, bodyA, bodyB, t25, t6, vA, vB, t26, t1, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(177, t3, t4, i, t5, wA0, t25, bodyA, bodyB, t26, t6, vA, vB, t28, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(178, t3, t10, t4, i, cp1, cp2, t5, wA0, wB, bodyA, bodyB, t2, t6, vA, vB, t25, t28, t1, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(179, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t25, t28, invIB, t7, t8, t30, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(180, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t8, t32, t33, t9, t10, t7, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(181, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t32, t7, t33, t35, t10, t9, t8, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(182, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t8, t7, t9, t10, t35, t32, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(183, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t8, t7, t9, t10, t35, t32, t37, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        break;
      }
    }
    bodyA.get$linearVelocity().setFrom$1(vA);
    bodyA.set$angularVelocity(wA);
    bodyB.get$linearVelocity().setFrom$1(vB);
    bodyB.set$angularVelocity(wB);
    ++i;
  }
},
 solveVelocityConstraints$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26, env27, env28, env29) {
  switch (state) {
    case 1:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t11 = env5;
      t1 = env6;
      t2 = env7;
      t6 = env8;
      t7 = env9;
      t8 = env10;
      t9 = env11;
      break;
    case 2:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t1 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      t6 = env10;
      t2 = env11;
      t7 = env12;
      t8 = env13;
      t9 = env14;
      break;
    case 3:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t1 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      wB = env10;
      t6 = env11;
      t2 = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      break;
    case 4:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      break;
    case 5:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      invIA = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      break;
    case 6:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      invIA = env16;
      invMassB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      break;
    case 7:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      invIA = env16;
      invMassB = env17;
      invIB = env18;
      t8 = env19;
      t7 = env20;
      t9 = env21;
      break;
    case 8:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      wA = env7;
      wB = env8;
      vA = env9;
      vB = env10;
      t6 = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t8 = env16;
      t7 = env17;
      t9 = env18;
      t10 = env19;
      friction = env20;
      t1 = env21;
      t2 = env22;
      break;
    case 9:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      friction = env18;
      t1 = env19;
      wB = env20;
      j = env21;
      t2 = env22;
      wA = env23;
      t11 = env24;
      break;
    case 10:
      t3 = env0;
      t4 = env1;
      i = env2;
      t11 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t2 = env23;
      wA = env24;
      break;
    case 11:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t11 = env5;
      t5 = env6;
      t13 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 12:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      t13 = env6;
      t11 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 13:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      t11 = env7;
      bodyB = env8;
      t13 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t6 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 14:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t13 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t11 = env16;
      t8 = env17;
      t7 = env18;
      t6 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 15:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t18 = env18;
      t9 = env19;
      t10 = env20;
      friction = env21;
      t1 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 16:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t18 = env19;
      t20 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 17:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      t20 = env20;
      t18 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 18:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      t18 = env19;
      t20 = env20;
      friction = env21;
      t1 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 19:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t24 = env20;
      t1 = env21;
      wB = env22;
      j = env23;
      t2 = env24;
      wA = env25;
      break;
    case 20:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t24 = env20;
      t1 = env21;
      t26 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 21:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t26 = env23;
      t2 = env24;
      t24 = env25;
      wA = env26;
      break;
    case 22:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t26 = env23;
      t2 = env24;
      t24 = env25;
      t29 = env26;
      wA = env27;
      break;
    case 23:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      t7 = env14;
      invIB = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t2 = env23;
      wA = env24;
      vt = env25;
      t26 = env26;
      break;
    case 24:
      lambda = env0;
      t26 = env1;
      t3 = env2;
      t4 = env3;
      i = env4;
      ccp = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      friction = env21;
      t1 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 25:
      lambda = env0;
      t3 = env1;
      maxFriction = env2;
      t26 = env3;
      i = env4;
      t4 = env5;
      ccp = env6;
      t5 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 26:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      lambda = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t34 = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 27:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      lambda = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      Px = env10;
      t34 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t6 = env20;
      t9 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 28:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      Px = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      vB = env18;
      t34 = env19;
      t9 = env20;
      t8 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 29:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      Px = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      vB = env18;
      t38 = env19;
      t9 = env20;
      t8 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 30:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      t40 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 31:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      t40 = env22;
      t42 = env23;
      friction = env24;
      t1 = env25;
      wB = env26;
      j = env27;
      t2 = env28;
      wA = env29;
      break;
    case 32:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wA = env24;
      j = env25;
      t44 = env26;
      wB = env27;
      t2 = env28;
      break;
    case 33:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wA = env24;
      j = env25;
      t2 = env26;
      wB = env27;
      t46 = env28;
      break;
    case 34:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wA = env24;
      j = env25;
      t2 = env26;
      wB = env27;
      t48 = env28;
      break;
    case 35:
      t3 = env0;
      t48 = env1;
      t50 = env2;
      t4 = env3;
      i = env4;
      ccp = env5;
      t5 = env6;
      newImpulse = env7;
      c = env8;
      bodyA = env9;
      Px = env10;
      bodyB = env11;
      t6 = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      invMassB = env17;
      t7 = env18;
      invIB = env19;
      t8 = env20;
      t9 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wA = env25;
      j = env26;
      t2 = env27;
      wB = env28;
      break;
    case 36:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      t11 = env9;
      vB = env10;
      invMassA = env11;
      invMassB = env12;
      invIB = env13;
      invIA = env14;
      t8 = env15;
      t7 = env16;
      t9 = env17;
      t10 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 37:
      t8 = env0;
      t3 = env1;
      t10 = env2;
      t4 = env3;
      i = env4;
      t7 = env5;
      t5 = env6;
      t1 = env7;
      wB = env8;
      bodyA = env9;
      t2 = env10;
      bodyB = env11;
      t6 = env12;
      vA = env13;
      c = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      invMassB = env18;
      invIB = env19;
      wA = env20;
      t11 = env21;
      t9 = env22;
      break;
    case 38:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t11 = env19;
      t10 = env20;
      t13 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 39:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t13 = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 40:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t11 = env20;
      t13 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 41:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t13 = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 42:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      t7 = env13;
      invIB = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t18 = env23;
      wA = env24;
      break;
    case 43:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t18 = env23;
      t20 = env24;
      wA = env25;
      break;
    case 44:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t20 = env23;
      wA = env24;
      t18 = env25;
      break;
    case 45:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      t7 = env13;
      invIB = env14;
      t8 = env15;
      ccp = env16;
      t9 = env17;
      t10 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      t18 = env23;
      t20 = env24;
      break;
    case 46:
      t3 = env0;
      t4 = env1;
      b = env2;
      i = env3;
      t24 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      t7 = env15;
      invIB = env16;
      t8 = env17;
      ccp = env18;
      t9 = env19;
      t10 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 47:
      t3 = env0;
      t4 = env1;
      b = env2;
      i = env3;
      t24 = env4;
      t26 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      ccp = env19;
      t9 = env20;
      t10 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 48:
      t3 = env0;
      t4 = env1;
      b = env2;
      i = env3;
      t26 = env4;
      t24 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      ccp = env19;
      t9 = env20;
      t10 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 49:
      t3 = env0;
      t4 = env1;
      i = env2;
      t26 = env3;
      t24 = env4;
      t29 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      ccp = env19;
      t9 = env20;
      t10 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 50:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      vn = env4;
      t26 = env5;
      bodyA = env6;
      bodyB = env7;
      c = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      t7 = env15;
      invIB = env16;
      t8 = env17;
      ccp = env18;
      t9 = env19;
      t10 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 51:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      vn = env4;
      c = env5;
      bodyA = env6;
      t26 = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      t32 = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t8 = env17;
      ccp = env18;
      t9 = env19;
      t10 = env20;
      t7 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 52:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      lambda = env10;
      invMassA = env11;
      invIA = env12;
      t7 = env13;
      invIB = env14;
      invMassB = env15;
      ccp = env16;
      t26 = env17;
      t8 = env18;
      t10 = env19;
      t9 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 53:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      t9 = env17;
      t10 = env18;
      newImpulse = env19;
      t11 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 54:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      t9 = env17;
      t10 = env18;
      newImpulse = env19;
      lambda = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 55:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      lambda = env19;
      Px = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 56:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t11 = env21;
      wB = env22;
      t2 = env23;
      t1 = env24;
      wA = env25;
      break;
    case 57:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      t16 = env24;
      wA = env25;
      break;
    case 58:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      ccp = env14;
      t9 = env15;
      t10 = env16;
      newImpulse = env17;
      Px = env18;
      Py = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      t18 = env24;
      break;
    case 59:
      t20 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t18 = env25;
      break;
    case 60:
      t3 = env0;
      t4 = env1;
      i = env2;
      wA = env3;
      t22 = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 61:
      t3 = env0;
      t4 = env1;
      i = env2;
      wA = env3;
      t5 = env4;
      t24 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 62:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      newImpulse = env3;
      i = env4;
      wA = env5;
      Px = env6;
      t5 = env7;
      Py = env8;
      t1 = env9;
      wB = env10;
      bodyA = env11;
      bodyB = env12;
      t2 = env13;
      t6 = env14;
      vA = env15;
      vB = env16;
      t26 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      ccp = env21;
      t9 = env22;
      break;
    case 63:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      newImpulse = env3;
      i = env4;
      wA = env5;
      t7 = env6;
      Px = env7;
      t5 = env8;
      t1 = env9;
      wB = env10;
      bodyA = env11;
      bodyB = env12;
      t2 = env13;
      t6 = env14;
      vA = env15;
      vB = env16;
      t26 = env17;
      invIB = env18;
      t28 = env19;
      t8 = env20;
      ccp = env21;
      t9 = env22;
      break;
    case 64:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      t11 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 65:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      t11 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 66:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      t11 = env22;
      wB = env23;
      t14 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 67:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      t14 = env24;
      t11 = env25;
      wA = env26;
      break;
    case 68:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      t11 = env24;
      t14 = env25;
      wA = env26;
      break;
    case 69:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t14 = env25;
      t11 = env26;
      break;
    case 70:
      t3 = env0;
      t4 = env1;
      i = env2;
      t19 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 71:
      t3 = env0;
      t4 = env1;
      i = env2;
      t19 = env3;
      t21 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 72:
      t3 = env0;
      t4 = env1;
      i = env2;
      t21 = env3;
      t5 = env4;
      t19 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 73:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t19 = env4;
      t21 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 74:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      t25 = env9;
      vB = env10;
      t26 = env11;
      invIA = env12;
      invMassA = env13;
      invIB = env14;
      invMassB = env15;
      t7 = env16;
      t9 = env17;
      t8 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 75:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t25 = env14;
      t8 = env15;
      t7 = env16;
      t9 = env17;
      t10 = env18;
      t26 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 76:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t25 = env16;
      t26 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 77:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      t26 = env18;
      t25 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 78:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t31 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 79:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t31 = env20;
      t33 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 80:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t33 = env21;
      wB = env22;
      t31 = env23;
      t1 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 81:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t31 = env23;
      t2 = env24;
      t33 = env25;
      wA = env26;
      break;
    case 82:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t37 = env25;
      break;
    case 83:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t37 = env25;
      t39 = env26;
      break;
    case 84:
      t39 = env0;
      t3 = env1;
      t4 = env2;
      t37 = env3;
      i = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 85:
      t39 = env0;
      t3 = env1;
      t4 = env2;
      t37 = env3;
      i = env4;
      t42 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 86:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t39 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 87:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t39 = env5;
      t45 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 88:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t45 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t39 = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 89:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t45 = env5;
      c = env6;
      bodyA = env7;
      t48 = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      t39 = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t8 = env18;
      t7 = env19;
      t9 = env20;
      t10 = env21;
      cp1 = env22;
      cp2 = env23;
      a = env24;
      t1 = env25;
      wB = env26;
      t2 = env27;
      wA = env28;
      break;
    case 90:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vn2 = env10;
      vB = env11;
      t45 = env12;
      invIA = env13;
      invMassA = env14;
      invIB = env15;
      invMassB = env16;
      t7 = env17;
      t9 = env18;
      t8 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 91:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vn2 = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      t51 = env14;
      t8 = env15;
      invIB = env16;
      t9 = env17;
      t10 = env18;
      t7 = env19;
      cp1 = env20;
      t45 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 92:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      t45 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 93:
      t3 = env0;
      t4 = env1;
      i = env2;
      t54 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      t45 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 94:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      t54 = env19;
      cp1 = env20;
      t45 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 95:
      t3 = env0;
      t4 = env1;
      i = env2;
      t57 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      t54 = env20;
      cp1 = env21;
      t45 = env22;
      cp2 = env23;
      a = env24;
      t1 = env25;
      wB = env26;
      t2 = env27;
      wA = env28;
      break;
    case 96:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t59 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 97:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t61 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t59 = env25;
      t2 = env26;
      wA = env27;
      break;
    case 98:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t61 = env25;
      t59 = env26;
      wA = env27;
      break;
    case 99:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t64 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      t61 = env26;
      t59 = env27;
      wA = env28;
      break;
    case 100:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t66 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 101:
      t3 = env0;
      t68 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t66 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      b = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 102:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      t70 = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 103:
      t3 = env0;
      t4 = env1;
      i = env2;
      t72 = env3;
      t5 = env4;
      c = env5;
      t70 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      b = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 104:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t11 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 105:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t11 = env25;
      wA = env26;
      break;
    case 106:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t11 = env15;
      t12 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 107:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t11 = env15;
      t12 = env16;
      cp1 = env17;
      t14 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 108:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      t14 = env16;
      cp2 = env17;
      t11 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 109:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      t14 = env16;
      cp2 = env17;
      t11 = env18;
      t16 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 110:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      t14 = env18;
      wB = env19;
      t2 = env20;
      t19 = env21;
      t18 = env22;
      wA = env23;
      break;
    case 111:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      t14 = env18;
      wB = env19;
      t19 = env20;
      t18 = env21;
      t21 = env22;
      t2 = env23;
      wA = env24;
      break;
    case 112:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t14 = env17;
      wB = env18;
      t2 = env19;
      t1 = env20;
      t18 = env21;
      t21 = env22;
      wA = env23;
      break;
    case 113:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t14 = env17;
      wB = env18;
      t1 = env19;
      t2 = env20;
      t21 = env21;
      t18 = env22;
      t23 = env23;
      wA = env24;
      break;
    case 114:
      t3 = env0;
      wA0 = env1;
      t25 = env2;
      t10 = env3;
      i = env4;
      t26 = env5;
      cp1 = env6;
      t4 = env7;
      cp2 = env8;
      t5 = env9;
      t1 = env10;
      wB = env11;
      bodyA = env12;
      bodyB = env13;
      t2 = env14;
      t6 = env15;
      vA = env16;
      vB = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 115:
      t3 = env0;
      wA0 = env1;
      t25 = env2;
      t4 = env3;
      i = env4;
      t26 = env5;
      t28 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 116:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      t10 = env3;
      i = env4;
      cp1 = env5;
      t28 = env6;
      t25 = env7;
      cp2 = env8;
      t5 = env9;
      t1 = env10;
      wB = env11;
      bodyA = env12;
      bodyB = env13;
      t2 = env14;
      t6 = env15;
      vA = env16;
      vB = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 117:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t28 = env4;
      t25 = env5;
      t30 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 118:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      t32 = env6;
      t33 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 119:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      t32 = env6;
      t33 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      t35 = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 120:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      bodyA = env6;
      bodyB = env7;
      t35 = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      t32 = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 121:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      bodyA = env6;
      bodyB = env7;
      t35 = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      t32 = env12;
      t37 = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 122:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      t11 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 123:
      t3 = env0;
      t13 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      t11 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 124:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t15 = env25;
      wA = env26;
      break;
    case 125:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t15 = env25;
      t17 = env26;
      wA = env27;
      break;
    case 126:
      t3 = env0;
      t15 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      t17 = env26;
      wA = env27;
      break;
    case 127:
      t11 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      t7 = env14;
      invIB = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      vn2 = env27;
      break;
    case 128:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t11 = env17;
      t1 = env18;
      wB = env19;
      t12 = env20;
      t2 = env21;
      wA = env22;
      break;
    case 129:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t11 = env17;
      t1 = env18;
      wB = env19;
      t12 = env20;
      t2 = env21;
      t14 = env22;
      wA = env23;
      break;
    case 130:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      wA = env22;
      break;
    case 131:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      t16 = env22;
      wA = env23;
      break;
    case 132:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t18 = env21;
      wA = env22;
      t19 = env23;
      break;
    case 133:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t18 = env21;
      wA = env22;
      t19 = env23;
      t21 = env24;
      break;
    case 134:
      t21 = env0;
      t18 = env1;
      t3 = env2;
      t4 = env3;
      i = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invIA = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      t10 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      t14 = env22;
      wA = env23;
      break;
    case 135:
      t21 = env0;
      t18 = env1;
      t23 = env2;
      t4 = env3;
      t3 = env4;
      i = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t14 = env23;
      wA = env24;
      break;
    case 136:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      wA0 = env6;
      t25 = env7;
      t5 = env8;
      t26 = env9;
      t1 = env10;
      wB = env11;
      bodyA = env12;
      bodyB = env13;
      t2 = env14;
      t6 = env15;
      vA = env16;
      vB = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 137:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      t25 = env5;
      t26 = env6;
      t28 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 138:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      wA0 = env6;
      t5 = env7;
      t1 = env8;
      wB = env9;
      bodyA = env10;
      bodyB = env11;
      t25 = env12;
      t6 = env13;
      vA = env14;
      vB = env15;
      t28 = env16;
      t2 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 139:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t25 = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      t28 = env11;
      t30 = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 140:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      t32 = env11;
      invIB = env12;
      t33 = env13;
      t8 = env14;
      t7 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 141:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      t32 = env11;
      invIB = env12;
      t33 = env13;
      t35 = env14;
      t7 = env15;
      t9 = env16;
      t8 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 142:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t35 = env14;
      t32 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 143:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t35 = env14;
      t32 = env15;
      t37 = env16;
      t10 = env17;
      t9 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 144:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t11 = env25;
      wA = env26;
      break;
    case 145:
      t3 = env0;
      t4 = env1;
      t13 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      t11 = env26;
      wA = env27;
      break;
    case 146:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      t15 = env26;
      break;
    case 147:
      t17 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      t15 = env27;
      break;
    case 148:
      t3 = env0;
      t17 = env1;
      t4 = env2;
      i = env3;
      t15 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      b = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 149:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t11 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      b = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 150:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      t7 = env10;
      invIB = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      wA = env21;
      t12 = env22;
      break;
    case 151:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      wA = env21;
      t12 = env22;
      t14 = env23;
      break;
    case 152:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      wA = env20;
      t14 = env21;
      t11 = env22;
      break;
    case 153:
      t16 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t9 = env14;
      t10 = env15;
      cp1 = env16;
      cp2 = env17;
      t1 = env18;
      wB = env19;
      t2 = env20;
      wA = env21;
      t14 = env22;
      t11 = env23;
      break;
    case 154:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t18 = env4;
      t19 = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 155:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t18 = env4;
      t19 = env5;
      t21 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIA = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 156:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t21 = env4;
      t18 = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 157:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t21 = env4;
      t18 = env5;
      t23 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIA = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 158:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      t5 = env6;
      t1 = env7;
      wB = env8;
      bodyA = env9;
      bodyB = env10;
      t2 = env11;
      t6 = env12;
      vA = env13;
      wA0 = env14;
      vB = env15;
      t26 = env16;
      t25 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 159:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      wA0 = env8;
      vB = env9;
      t26 = env10;
      t25 = env11;
      invIB = env12;
      t7 = env13;
      t28 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 160:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      t7 = env5;
      cp2 = env6;
      t5 = env7;
      t1 = env8;
      wB = env9;
      bodyA = env10;
      bodyB = env11;
      t2 = env12;
      t6 = env13;
      vA = env14;
      wA0 = env15;
      vB = env16;
      invIB = env17;
      t28 = env18;
      t25 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 161:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      wA0 = env8;
      vB = env9;
      t7 = env10;
      invIB = env11;
      t8 = env12;
      t25 = env13;
      t28 = env14;
      t9 = env15;
      t10 = env16;
      t30 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 162:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      t32 = env16;
      t33 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 163:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      t32 = env16;
      t33 = env17;
      t35 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 164:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      cp1 = env16;
      t35 = env17;
      t32 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 165:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      cp1 = env16;
      t35 = env17;
      t32 = env18;
      cp2 = env19;
      t37 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 166:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 167:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      vn2 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 168:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      t12 = env21;
      wA = env22;
      break;
    case 169:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      t12 = env21;
      t14 = env22;
      wA = env23;
      break;
    case 170:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      wA = env22;
      break;
    case 171:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      t16 = env22;
      wA = env23;
      break;
    case 172:
      t19 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t9 = env14;
      t10 = env15;
      cp1 = env16;
      cp2 = env17;
      t1 = env18;
      wB = env19;
      t2 = env20;
      wA = env21;
      t14 = env22;
      t18 = env23;
      break;
    case 173:
      t19 = env0;
      t21 = env1;
      t4 = env2;
      t3 = env3;
      i = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invIA = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      t10 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      t14 = env23;
      t18 = env24;
      break;
    case 174:
      t3 = env0;
      t4 = env1;
      t21 = env2;
      i = env3;
      t18 = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invIA = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      t10 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      t14 = env23;
      break;
    case 175:
      t3 = env0;
      t4 = env1;
      t21 = env2;
      i = env3;
      t18 = env4;
      t23 = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      t14 = env24;
      break;
    case 176:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      t5 = env6;
      t2 = env7;
      wA0 = env8;
      wB = env9;
      bodyA = env10;
      bodyB = env11;
      t25 = env12;
      t6 = env13;
      vA = env14;
      vB = env15;
      t26 = env16;
      t1 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 177:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      t25 = env5;
      bodyA = env6;
      bodyB = env7;
      t26 = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      t28 = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 178:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      t5 = env6;
      wA0 = env7;
      wB = env8;
      bodyA = env9;
      bodyB = env10;
      t2 = env11;
      t6 = env12;
      vA = env13;
      vB = env14;
      t25 = env15;
      t28 = env16;
      t1 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 179:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t25 = env10;
      t28 = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t30 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 180:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t8 = env12;
      t32 = env13;
      t33 = env14;
      t9 = env15;
      t10 = env16;
      t7 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 181:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t32 = env12;
      t7 = env13;
      t33 = env14;
      t35 = env15;
      t10 = env16;
      t9 = env17;
      t8 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 182:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t8 = env12;
      t7 = env13;
      t9 = env14;
      t10 = env15;
      t35 = env16;
      t32 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 183:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t8 = env12;
      t7 = env13;
      t9 = env14;
      t10 = env15;
      t35 = env16;
      t32 = env17;
      t37 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.tangent;
      var t2 = this.dv;
      var t3 = this.dv1;
      var t4 = this.dv2;
      var t5 = this.temp2;
      var t6 = this.x;
      var t7 = this.d;
      var t8 = this.P1;
      var t9 = this.P2;
      var t10 = this.temp1;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t11 = this.constraintCount;
            case 1:
              state = 0;
              if (!$.ltB(i, t11))
                break L0;
              t11 = this.constraints;
              if (i < 0 || i >= t11.length)
                throw $.ioore(i);
              var c = t11[i];
              var bodyA = c.get$bodyA();
              var bodyB = c.get$bodyB();
              var wA = bodyA.get$angularVelocity();
            case 2:
              state = 0;
              var wB = bodyB.get$angularVelocity();
            case 3:
              state = 0;
              var vA = bodyA.get$linearVelocity();
              var vB = bodyB.get$linearVelocity();
              var invMassA = bodyA.get$invMass();
            case 4:
              state = 0;
              var invIA = bodyA.get$invInertia();
            case 5:
              state = 0;
              var invMassB = bodyB.get$invMass();
            case 6:
              state = 0;
              var invIB = bodyB.get$invInertia();
            case 7:
              state = 0;
              var t17 = c.get$normal().get$y();
              if (typeof t17 !== 'number')
                throw $.iae(t17);
              t1.set$x(1.0 * t17);
              var t18 = c.get$normal().get$x();
              if (typeof t18 !== 'number')
                throw $.iae(t18);
              t1.set$y(-1.0 * t18);
              var friction = c.get$friction();
            case 8:
              state = 0;
              var j = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      t11 = c.get$pointCount();
                    case 9:
                      state = 0;
                      if (!$.ltB(j, t11))
                        break L1;
                      t11 = c.get$points();
                    case 10:
                      state = 0;
                      var ccp = $.index(t11, j);
                      var a = ccp.get$rA();
                      t11 = $.neg(wB);
                      var t13 = ccp.get$rB().get$y();
                    case 11:
                      state = 0;
                      t13 = $.mul(t11, t13);
                      t11 = vB.get$x();
                    case 12:
                      state = 0;
                      t11 = $.add(t13, t11);
                      t13 = vA.get$x();
                    case 13:
                      state = 0;
                      t13 = $.sub(t11, t13);
                      t11 = a.get$y();
                    case 14:
                      state = 0;
                      t2.set$x($.add(t13, $.mul(wA, t11)));
                      t18 = ccp.get$rB().get$x();
                    case 15:
                      state = 0;
                      t18 = $.mul(wB, t18);
                      var t20 = vB.get$y();
                    case 16:
                      state = 0;
                      t20 = $.add(t18, t20);
                      t18 = vA.get$y();
                    case 17:
                      state = 0;
                      t18 = $.sub(t20, t18);
                      t20 = a.get$x();
                    case 18:
                      state = 0;
                      t2.set$y($.sub(t18, $.mul(wA, t20)));
                      var t24 = t2.get$x();
                    case 19:
                      state = 0;
                      var t26 = t1.get$x();
                    case 20:
                      state = 0;
                      t26 = $.mul(t24, t26);
                      t24 = t2.get$y();
                    case 21:
                      state = 0;
                      var t29 = t1.get$y();
                    case 22:
                      state = 0;
                      var vt = $.add(t26, $.mul(t24, t29));
                      t26 = ccp.get$tangentMass();
                    case 23:
                      state = 0;
                      var lambda = $.mul(t26, $.neg(vt));
                      t26 = ccp.get$normalImpulse();
                    case 24:
                      state = 0;
                      var maxFriction = $.mul(friction, t26);
                      t26 = ccp.get$tangentImpulse();
                    case 25:
                      state = 0;
                      t26 = $.add(t26, lambda);
                      var newImpulse = $.max($.neg(maxFriction), $.min(t26, maxFriction));
                      var t34 = ccp.get$tangentImpulse();
                      if (typeof t34 !== 'number')
                        throw $.iae(t34);
                      lambda = newImpulse - t34;
                      t34 = t1.get$x();
                    case 26:
                      state = 0;
                      var Px = $.mul(t34, lambda);
                      t34 = t1.get$y();
                    case 27:
                      state = 0;
                      var Py = $.mul(t34, lambda);
                      t34 = vA.get$x();
                    case 28:
                      state = 0;
                      vA.set$x($.sub(t34, $.mul(Px, invMassA)));
                      var t38 = vA.get$y();
                    case 29:
                      state = 0;
                      vA.set$y($.sub(t38, $.mul(Py, invMassA)));
                      var t40 = ccp.get$rA().get$x();
                    case 30:
                      state = 0;
                      t40 = $.mul(t40, Py);
                      var t42 = ccp.get$rA().get$y();
                    case 31:
                      state = 0;
                      wA = $.sub(wA, $.mul(invIA, $.sub(t40, $.mul(t42, Px))));
                      var t44 = vB.get$x();
                    case 32:
                      state = 0;
                      vB.set$x($.add(t44, $.mul(Px, invMassB)));
                      var t46 = vB.get$y();
                    case 33:
                      state = 0;
                      vB.set$y($.add(t46, $.mul(Py, invMassB)));
                      var t48 = ccp.get$rB().get$x();
                    case 34:
                      state = 0;
                      t48 = $.mul(t48, Py);
                      var t50 = ccp.get$rB().get$y();
                    case 35:
                      state = 0;
                      wB = $.add(wB, $.mul(invIB, $.sub(t48, $.mul(t50, Px))));
                      ccp.set$tangentImpulse(newImpulse);
                      ++j;
                  }
              t11 = c.get$pointCount();
            case 36:
              state = 0;
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 96:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
            case 124:
            case 125:
            case 126:
            case 127:
            case 128:
            case 129:
            case 130:
            case 131:
            case 132:
            case 133:
            case 134:
            case 135:
            case 136:
            case 137:
            case 138:
            case 139:
            case 140:
            case 141:
            case 142:
            case 143:
            case 144:
            case 145:
            case 146:
            case 147:
            case 148:
            case 149:
            case 150:
            case 151:
            case 152:
            case 153:
            case 154:
            case 155:
            case 156:
            case 157:
            case 158:
            case 159:
            case 160:
            case 161:
            case 162:
            case 163:
            case 164:
            case 165:
            case 166:
            case 167:
            case 168:
            case 169:
            case 170:
            case 171:
            case 172:
            case 173:
            case 174:
            case 175:
            case 176:
            case 177:
            case 178:
            case 179:
            case 180:
            case 181:
            case 182:
            case 183:
              if (state === 63 || state === 62 || state === 61 || state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 49 || state === 48 || state === 47 || state === 46 || state === 45 || state === 44 || state === 43 || state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 0 && $.eqB(t11, 1))
                switch (state) {
                  case 0:
                    t11 = c.get$points();
                  case 37:
                    state = 0;
                    ccp = $.index(t11, 0);
                    var a1 = ccp.get$rA();
                    t11 = $.neg(wB);
                    t13 = ccp.get$rB().get$y();
                  case 38:
                    state = 0;
                    t13 = $.mul(t11, t13);
                    t11 = vB.get$x();
                  case 39:
                    state = 0;
                    t11 = $.add(t13, t11);
                    t13 = vA.get$x();
                  case 40:
                    state = 0;
                    t13 = $.sub(t11, t13);
                    t11 = a1.get$y();
                  case 41:
                    state = 0;
                    t2.set$x($.add(t13, $.mul(wA, t11)));
                    t18 = ccp.get$rB().get$x();
                  case 42:
                    state = 0;
                    t18 = $.mul(wB, t18);
                    t20 = vB.get$y();
                  case 43:
                    state = 0;
                    t20 = $.add(t18, t20);
                    t18 = vA.get$y();
                  case 44:
                    state = 0;
                    t18 = $.sub(t20, t18);
                    t20 = a1.get$x();
                  case 45:
                    state = 0;
                    t2.set$y($.sub(t18, $.mul(wA, t20)));
                    var b = c.get$normal();
                    t24 = t2.get$x();
                  case 46:
                    state = 0;
                    t26 = b.get$x();
                  case 47:
                    state = 0;
                    t26 = $.mul(t24, t26);
                    t24 = t2.get$y();
                  case 48:
                    state = 0;
                    t29 = b.get$y();
                  case 49:
                    state = 0;
                    var vn = $.add(t26, $.mul(t24, t29));
                    t26 = ccp.get$normalMass();
                  case 50:
                    state = 0;
                    t26 = $.neg(t26);
                    var t32 = ccp.get$velocityBias();
                  case 51:
                    state = 0;
                    lambda = $.mul(t26, $.sub(vn, t32));
                    t26 = ccp.get$normalImpulse();
                  case 52:
                    state = 0;
                    a = $.add(t26, lambda);
                    newImpulse = $.gtB(a, 0.0) ? a : 0.0;
                    t11 = ccp.get$normalImpulse();
                  case 53:
                    state = 0;
                    lambda = $.sub(newImpulse, t11);
                    t11 = c.get$normal().get$x();
                  case 54:
                    state = 0;
                    Px = $.mul(t11, lambda);
                    t11 = c.get$normal().get$y();
                  case 55:
                    state = 0;
                    Py = $.mul(t11, lambda);
                    t11 = vA.get$x();
                  case 56:
                    state = 0;
                    vA.set$x($.sub(t11, $.mul(Px, invMassA)));
                    var t16 = vA.get$y();
                  case 57:
                    state = 0;
                    vA.set$y($.sub(t16, $.mul(Py, invMassA)));
                    t18 = ccp.get$rA().get$x();
                  case 58:
                    state = 0;
                    t18 = $.mul(t18, Py);
                    t20 = ccp.get$rA().get$y();
                  case 59:
                    state = 0;
                    wA = $.sub(wA, $.mul(invIA, $.sub(t18, $.mul(t20, Px))));
                    var t22 = vB.get$x();
                  case 60:
                    state = 0;
                    vB.set$x($.add(t22, $.mul(Px, invMassB)));
                    t24 = vB.get$y();
                  case 61:
                    state = 0;
                    vB.set$y($.add(t24, $.mul(Py, invMassB)));
                    t26 = ccp.get$rB().get$x();
                  case 62:
                    state = 0;
                    t26 = $.mul(t26, Py);
                    var t28 = ccp.get$rB().get$y();
                  case 63:
                    state = 0;
                    wB = $.add(wB, $.mul(invIB, $.sub(t26, $.mul(t28, Px))));
                    ccp.set$normalImpulse(newImpulse);
                }
              else
                switch (state) {
                  case 0:
                    t11 = c.get$points();
                  case 64:
                    state = 0;
                    var cp1 = $.index(t11, 0);
                    t11 = c.get$points();
                  case 65:
                    state = 0;
                    var cp2 = $.index(t11, 1);
                    a = $.Vector$(cp1.get$normalImpulse(), cp2.get$normalImpulse());
                    t11 = $.neg(wB);
                    var t14 = cp1.get$rB().get$y();
                  case 66:
                    state = 0;
                    t14 = $.mul(t11, t14);
                    t11 = vB.get$x();
                  case 67:
                    state = 0;
                    t11 = $.add(t14, t11);
                    t14 = vA.get$x();
                  case 68:
                    state = 0;
                    t14 = $.sub(t11, t14);
                    t11 = cp1.get$rA().get$y();
                  case 69:
                    state = 0;
                    t3.set$x($.add(t14, $.mul(wA, t11)));
                    var t19 = cp1.get$rB().get$x();
                  case 70:
                    state = 0;
                    t19 = $.mul(wB, t19);
                    var t21 = vB.get$y();
                  case 71:
                    state = 0;
                    t21 = $.add(t19, t21);
                    t19 = vA.get$y();
                  case 72:
                    state = 0;
                    t19 = $.sub(t21, t19);
                    t21 = cp1.get$rA().get$x();
                  case 73:
                    state = 0;
                    t3.set$y($.sub(t19, $.mul(wA, t21)));
                    var t25 = $.neg(wB);
                    t26 = cp2.get$rB().get$y();
                  case 74:
                    state = 0;
                    t26 = $.mul(t25, t26);
                    t25 = vB.get$x();
                  case 75:
                    state = 0;
                    t25 = $.add(t26, t25);
                    t26 = vA.get$x();
                  case 76:
                    state = 0;
                    t26 = $.sub(t25, t26);
                    t25 = cp2.get$rA().get$y();
                  case 77:
                    state = 0;
                    t4.set$x($.add(t26, $.mul(wA, t25)));
                    var t31 = cp2.get$rB().get$x();
                  case 78:
                    state = 0;
                    t31 = $.mul(wB, t31);
                    var t33 = vB.get$y();
                  case 79:
                    state = 0;
                    t33 = $.add(t31, t33);
                    t31 = vA.get$y();
                  case 80:
                    state = 0;
                    t31 = $.sub(t33, t31);
                    t33 = cp2.get$rA().get$x();
                  case 81:
                    state = 0;
                    t4.set$y($.sub(t31, $.mul(wA, t33)));
                    var t37 = t3.get$x();
                  case 82:
                    state = 0;
                    var t39 = c.get$normal().get$x();
                  case 83:
                    state = 0;
                    t39 = $.mul(t37, t39);
                    t37 = t3.get$y();
                  case 84:
                    state = 0;
                    t42 = c.get$normal().get$y();
                  case 85:
                    state = 0;
                    var vn1 = $.add(t39, $.mul(t37, t42));
                    t39 = t4.get$x();
                  case 86:
                    state = 0;
                    var t45 = c.get$normal().get$x();
                  case 87:
                    state = 0;
                    t45 = $.mul(t39, t45);
                    t39 = t4.get$y();
                  case 88:
                    state = 0;
                    t48 = c.get$normal().get$y();
                  case 89:
                    state = 0;
                    var vn2 = $.add(t45, $.mul(t39, t48));
                    t45 = cp1.get$velocityBias();
                  case 90:
                    state = 0;
                    t45 = $.sub(vn1, t45);
                    var t51 = cp2.get$velocityBias();
                  case 91:
                    state = 0;
                    b = $.Vector$(t45, $.sub(vn2, t51));
                    t45 = c.get$K().get$col1().get$x();
                  case 92:
                    state = 0;
                    var t54 = a.x;
                  case 93:
                    state = 0;
                    t54 = $.mul(t45, t54);
                    t45 = c.get$K().get$col2().get$x();
                  case 94:
                    state = 0;
                    var t57 = a.y;
                  case 95:
                    state = 0;
                    t5.set$x($.add(t54, $.mul(t45, t57)));
                    var t59 = c.get$K().get$col1().get$y();
                  case 96:
                    state = 0;
                    var t61 = a.x;
                  case 97:
                    state = 0;
                    t61 = $.mul(t59, t61);
                    t59 = c.get$K().get$col2().get$y();
                  case 98:
                    state = 0;
                    var t64 = a.y;
                  case 99:
                    state = 0;
                    t5.set$y($.add(t61, $.mul(t59, t64)));
                    var t66 = b.x;
                  case 100:
                    state = 0;
                    var t68 = t5.get$x();
                  case 101:
                    state = 0;
                    b.x = $.sub(t66, t68);
                    var t70 = b.y;
                  case 102:
                    state = 0;
                    var t72 = t5.get$y();
                  case 103:
                    state = 0;
                    b.y = $.sub(t70, t72);
                  default:
                    L2:
                      while (true)
                        switch (state) {
                          case 0:
                            if (!true)
                              break L2;
                            $.Matrix22_mulMatrixAndVectorToOut(c.get$normalMass(), b, t6);
                            t6.mulLocal$1(-1);
                            t11 = t6.get$x();
                          case 104:
                            state = 0;
                          case 105:
                            if (state === 105 || state === 0 && $.geB(t11, 0.0))
                              switch (state) {
                                case 0:
                                  t11 = t6.get$y();
                                case 105:
                                  state = 0;
                                  t11 = $.geB(t11, 0.0);
                              }
                            else
                              t11 = false;
                          default:
                            if (state === 121 || state === 120 || state === 119 || state === 118 || state === 117 || state === 116 || state === 115 || state === 114 || state === 113 || state === 112 || state === 111 || state === 110 || state === 109 || state === 108 || state === 107 || state === 106 || state === 0 && t11)
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  var t12 = t11.get$x();
                                case 106:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 107:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 108:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 109:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 110:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 111:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 112:
                                  state = 0;
                                  var t23 = t9.get$x();
                                case 113:
                                  state = 0;
                                  var wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 114:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 115:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 116:
                                  state = 0;
                                  var t30 = t8.get$x();
                                case 117:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 118:
                                  state = 0;
                                  var t35 = t9.get$y();
                                case 119:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 120:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 121:
                                  state = 0;
                                  var wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            t11 = cp1.get$normalMass();
                          case 122:
                            state = 0;
                            t11 = $.neg(t11);
                            t13 = b.x;
                          case 123:
                            state = 0;
                            t6.set$x($.mul(t11, t13));
                            t6.set$y(0.0);
                            var t15 = c.get$K().get$col1().get$y();
                          case 124:
                            state = 0;
                            t17 = t6.get$x();
                          case 125:
                            state = 0;
                            t17 = $.mul(t15, t17);
                            t15 = b.y;
                          case 126:
                            state = 0;
                            vn2 = $.add(t17, t15);
                            t11 = t6.get$x();
                          case 127:
                            state = 0;
                          case 128:
                          case 129:
                          case 130:
                          case 131:
                          case 132:
                          case 133:
                          case 134:
                          case 135:
                          case 136:
                          case 137:
                          case 138:
                          case 139:
                          case 140:
                          case 141:
                          case 142:
                          case 143:
                            if (state === 143 || state === 142 || state === 141 || state === 140 || state === 139 || state === 138 || state === 137 || state === 136 || state === 135 || state === 134 || state === 133 || state === 132 || state === 131 || state === 130 || state === 129 || state === 128 || state === 0 && $.geB(t11, 0.0) && $.geB(vn2, 0.0))
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  t12 = t11.get$x();
                                case 128:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 129:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 130:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 131:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 132:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 133:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 134:
                                  state = 0;
                                  t23 = t9.get$x();
                                case 135:
                                  state = 0;
                                  wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 136:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 137:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 138:
                                  state = 0;
                                  t30 = t8.get$x();
                                case 139:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 140:
                                  state = 0;
                                  t35 = t9.get$y();
                                case 141:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 142:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 143:
                                  state = 0;
                                  wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            t6.set$x(0.0);
                            t11 = cp2.get$normalMass();
                          case 144:
                            state = 0;
                            t11 = $.neg(t11);
                            t13 = b.y;
                          case 145:
                            state = 0;
                            t6.set$y($.mul(t11, t13));
                            t15 = c.get$K().get$col2().get$x();
                          case 146:
                            state = 0;
                            t17 = t6.get$y();
                          case 147:
                            state = 0;
                            t17 = $.mul(t15, t17);
                            t15 = b.x;
                          case 148:
                            state = 0;
                            vn1 = $.add(t17, t15);
                            t11 = t6.get$y();
                          case 149:
                            state = 0;
                          case 150:
                          case 151:
                          case 152:
                          case 153:
                          case 154:
                          case 155:
                          case 156:
                          case 157:
                          case 158:
                          case 159:
                          case 160:
                          case 161:
                          case 162:
                          case 163:
                          case 164:
                          case 165:
                            if (state === 165 || state === 164 || state === 163 || state === 162 || state === 161 || state === 160 || state === 159 || state === 158 || state === 157 || state === 156 || state === 155 || state === 154 || state === 153 || state === 152 || state === 151 || state === 150 || state === 0 && $.geB(t11, 0.0) && $.geB(vn1, 0.0))
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  t12 = t11.get$x();
                                case 150:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 151:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 152:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 153:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 154:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 155:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 156:
                                  state = 0;
                                  t23 = t9.get$x();
                                case 157:
                                  state = 0;
                                  wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 158:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 159:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 160:
                                  state = 0;
                                  t30 = t8.get$x();
                                case 161:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 162:
                                  state = 0;
                                  t35 = t9.get$y();
                                case 163:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 164:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 165:
                                  state = 0;
                                  wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            t6.set$x(0.0);
                            t6.set$y(0.0);
                            vn1 = b.x;
                          case 166:
                            state = 0;
                            vn2 = b.y;
                          case 167:
                            state = 0;
                          case 168:
                          case 169:
                          case 170:
                          case 171:
                          case 172:
                          case 173:
                          case 174:
                          case 175:
                          case 176:
                          case 177:
                          case 178:
                          case 179:
                          case 180:
                          case 181:
                          case 182:
                          case 183:
                            if (state === 183 || state === 182 || state === 181 || state === 180 || state === 179 || state === 178 || state === 177 || state === 176 || state === 175 || state === 174 || state === 173 || state === 172 || state === 171 || state === 170 || state === 169 || state === 168 || state === 0 && $.geB(vn1, 0.0) && $.geB(vn2, 0.0))
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  t12 = t11.get$x();
                                case 168:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 169:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 170:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 171:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 172:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 173:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 174:
                                  state = 0;
                                  t23 = t9.get$x();
                                case 175:
                                  state = 0;
                                  wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 176:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 177:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 178:
                                  state = 0;
                                  t30 = t8.get$x();
                                case 179:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 180:
                                  state = 0;
                                  t35 = t9.get$y();
                                case 181:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 182:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 183:
                                  state = 0;
                                  wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            break L2;
                        }
                }
              bodyA.get$linearVelocity().setFrom$1(vA);
              bodyA.set$angularVelocity(wA);
              bodyB.get$linearVelocity().setFrom$1(vB);
              bodyB.set$angularVelocity(wB);
              ++i;
          }
  }
},
 storeImpulses$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); ++i) {
    var t1 = this.constraints;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var c = t1[i];
    var m = c.get$manifold();
    for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      t1 = $.index(c.get$points(), j).get$normalImpulse();
      $.index(m.get$points(), j).set$normalImpulse(t1);
      t1 = $.index(c.get$points(), j).get$tangentImpulse();
      $.index(m.get$points(), j).set$tangentImpulse(t1);
    }
  }
},
 solvePositionConstraints$1: function(baumgarte) {
  var psm = this.psolver;
  var t1 = this.rA;
  var t2 = this.rB;
  var t3 = this.P;
  var t4 = this.temp1;
  var normal = psm.normal;
  var point = psm.point;
  var i = 0;
  var minSeparation = 0.0;
  while (true) {
    var t5 = this.constraintCount;
    if (typeof t5 !== 'number')
      return this.solvePositionConstraints$1$bailout(1, baumgarte, t5, psm, i, t2, minSeparation, t1, t3, t4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (!(i < t5))
      break;
    t5 = this.constraints;
    if (i < 0 || i >= t5.length)
      throw $.ioore(i);
    var c = t5[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    t5 = bodyA.get$mass();
    if (typeof t5 !== 'number')
      return this.solvePositionConstraints$1$bailout(2, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, t5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t7 = bodyA.get$invMass();
    if (typeof t7 !== 'number')
      return this.solvePositionConstraints$1$bailout(3, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, t5, t7, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invMassA = t5 * t7;
    t7 = bodyA.get$mass();
    if (typeof t7 !== 'number')
      return this.solvePositionConstraints$1$bailout(4, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, t7, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t9 = bodyA.get$invInertia();
    if (typeof t9 !== 'number')
      return this.solvePositionConstraints$1$bailout(5, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, t7, t9, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIA = t7 * t9;
    t9 = bodyB.get$mass();
    if (typeof t9 !== 'number')
      return this.solvePositionConstraints$1$bailout(6, baumgarte, t9, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0, 0, 0);
    var t11 = bodyB.get$invMass();
    if (typeof t11 !== 'number')
      return this.solvePositionConstraints$1$bailout(7, baumgarte, t9, t11, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0, 0);
    var invMassB = t9 * t11;
    t11 = bodyB.get$mass();
    if (typeof t11 !== 'number')
      return this.solvePositionConstraints$1$bailout(8, baumgarte, invMassB, t11, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0, 0);
    var t13 = bodyB.get$invInertia();
    if (typeof t13 !== 'number')
      return this.solvePositionConstraints$1$bailout(9, baumgarte, invMassB, t11, t13, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0);
    var invIB = t11 * t13;
    t5 = invMassA + invMassB;
    var j = 0;
    while (true) {
      var t6 = c.get$pointCount();
      if (typeof t6 !== 'number')
        return this.solvePositionConstraints$1$bailout(10, baumgarte, invMassB, psm, i, invIB, t2, t1, j, t3, t4, minSeparation, c, bodyA, bodyB, t6, invMassA, invIA, 0, 0, 0, 0, 0);
      if (!(j < t6))
        break;
      psm.initialize$2(c, j);
      var separation = psm.separation;
      if (typeof separation !== 'number')
        return this.solvePositionConstraints$1$bailout(11, baumgarte, separation, invIA, invMassB, point, invIB, t2, psm, t1, j, t3, t4, minSeparation, i, c, bodyA, bodyB, invMassA, normal, 0, 0, 0);
      t1.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      t2.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.min(minSeparation, separation);
      var C = $.max(-0.2, $.min(baumgarte * (separation + 0.005), 0.0));
      t7 = t1.x;
      if (typeof t7 !== 'number')
        return this.solvePositionConstraints$1$bailout(12, normal, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, t7, invIA, 0, 0, 0);
      t9 = normal.get$y();
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(13, normal, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, t7, t9, invIA, 0, 0);
      t9 = t7 * t9;
      t7 = t1.y;
      if (typeof t7 !== 'number')
        return this.solvePositionConstraints$1$bailout(14, t9, t7, invIA, invMassB, baumgarte, invIB, t2, psm, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, normal, 0, 0);
      var t12 = normal.get$x();
      if (typeof t12 !== 'number')
        return this.solvePositionConstraints$1$bailout(15, t9, t7, t12, invMassB, invIA, baumgarte, invIB, t2, psm, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, normal, 0);
      var rnA = t9 - t7 * t12;
      t9 = t2.x;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(16, invIA, baumgarte, invMassB, rnA, invIB, t2, t9, t1, j, t3, minSeparation, t4, psm, i, c, bodyA, bodyB, invMassA, C, normal, 0, 0);
      var t15 = normal.get$y();
      if (typeof t15 !== 'number')
        return this.solvePositionConstraints$1$bailout(17, normal, baumgarte, invMassB, rnA, invIB, t2, t9, t1, j, t3, minSeparation, t4, t15, psm, i, c, bodyA, bodyB, invMassA, C, invIA, 0);
      t15 = t9 * t15;
      t9 = t2.y;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(18, normal, baumgarte, invMassB, rnA, invIB, t2, psm, t1, j, t9, t3, minSeparation, t4, t15, i, c, bodyA, bodyB, invMassA, C, invIA, 0);
      var t18 = normal.get$x();
      if (typeof t18 !== 'number')
        return this.solvePositionConstraints$1$bailout(19, normal, baumgarte, invMassB, rnA, invIB, t2, psm, t1, j, t9, t3, minSeparation, t4, t15, t18, i, c, bodyA, bodyB, invMassA, C, invIA);
      var rnB = t15 - t9 * t18;
      var K = t5 + invIA * rnA * rnA + invIB * rnB * rnB;
      var impulse = K > 0.0 ? -C / K : 0.0;
      t3.setFrom$1(normal).mulLocal$1(impulse);
      t4.setFrom$1(t3).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(t4);
      t6 = bodyA.get$sweep();
      t7 = t6.get$angle();
      if (typeof t7 !== 'number')
        return this.solvePositionConstraints$1$bailout(20, baumgarte, invMassB, psm, t1, t2, invIB, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, invMassA, invIA, 0, 0, 0, 0);
      t9 = t1.x;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(21, baumgarte, invMassB, psm, t1, t2, invIB, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, t9, invMassA, invIA, 0, 0, 0);
      t11 = t3.y;
      if (typeof t11 !== 'number')
        return this.solvePositionConstraints$1$bailout(22, baumgarte, invMassB, psm, t1, t2, invIB, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, t9, t11, invMassA, invIA, 0, 0);
      t11 = t9 * t11;
      t9 = t1.y;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(23, invIA, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, invMassA, t11, t9, 0, 0);
      var t14 = t3.x;
      if (typeof t14 !== 'number')
        return this.solvePositionConstraints$1$bailout(24, t14, baumgarte, invIA, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, invMassA, t11, t9, 0);
      t6.set$angle(t7 - invIA * (t11 - t9 * t14));
      bodyA.synchronizeTransform$0();
      t4.setFrom$1(t3).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(t4);
      t6 = bodyB.get$sweep();
      var t16 = t6.get$angle();
      if (typeof t16 !== 'number')
        return this.solvePositionConstraints$1$bailout(25, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0);
      t18 = t2.x;
      if (typeof t18 !== 'number')
        return this.solvePositionConstraints$1$bailout(26, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t18, invMassA, invIA, 0, 0, 0);
      var t20 = t3.y;
      if (typeof t20 !== 'number')
        return this.solvePositionConstraints$1$bailout(27, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t20, t18, invMassA, invIA, 0, 0);
      t20 = t18 * t20;
      t18 = t2.y;
      if (typeof t18 !== 'number')
        return this.solvePositionConstraints$1$bailout(28, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t20, t18, invMassA, invIA, 0, 0);
      var t23 = t3.x;
      if (typeof t23 !== 'number')
        return this.solvePositionConstraints$1$bailout(29, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t20, t18, t23, invMassA, invIA, 0);
      t6.set$angle(t16 + invIB * (t20 - t18 * t23));
      bodyB.synchronizeTransform$0();
      ++j;
    }
    ++i;
  }
  return minSeparation >= -0.0075;
},
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      t5 = env1;
      psm = env2;
      i = env3;
      t2 = env4;
      minSeparation = env5;
      t1 = env6;
      t3 = env7;
      t4 = env8;
      break;
    case 2:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t5 = env11;
      break;
    case 3:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t5 = env11;
      t7 = env12;
      break;
    case 4:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      invMassA = env11;
      t7 = env12;
      break;
    case 5:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      invMassA = env11;
      t7 = env12;
      t9 = env13;
      break;
    case 6:
      baumgarte = env0;
      t9 = env1;
      psm = env2;
      i = env3;
      t2 = env4;
      minSeparation = env5;
      t1 = env6;
      t3 = env7;
      t4 = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      invMassA = env12;
      invIA = env13;
      break;
    case 7:
      baumgarte = env0;
      t9 = env1;
      t11 = env2;
      psm = env3;
      i = env4;
      t2 = env5;
      minSeparation = env6;
      t1 = env7;
      t3 = env8;
      t4 = env9;
      c = env10;
      bodyA = env11;
      bodyB = env12;
      invMassA = env13;
      invIA = env14;
      break;
    case 8:
      baumgarte = env0;
      invMassB = env1;
      t11 = env2;
      psm = env3;
      i = env4;
      t2 = env5;
      minSeparation = env6;
      t1 = env7;
      t3 = env8;
      t4 = env9;
      c = env10;
      bodyA = env11;
      bodyB = env12;
      invMassA = env13;
      invIA = env14;
      break;
    case 9:
      baumgarte = env0;
      invMassB = env1;
      t11 = env2;
      t13 = env3;
      psm = env4;
      i = env5;
      t2 = env6;
      minSeparation = env7;
      t1 = env8;
      t3 = env9;
      t4 = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      invMassA = env14;
      invIA = env15;
      break;
    case 10:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      i = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      t4 = env9;
      minSeparation = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t5 = env14;
      invMassA = env15;
      invIA = env16;
      break;
    case 11:
      baumgarte = env0;
      separation = env1;
      invIA = env2;
      invMassB = env3;
      point = env4;
      invIB = env5;
      t2 = env6;
      psm = env7;
      t1 = env8;
      j = env9;
      t3 = env10;
      t4 = env11;
      minSeparation = env12;
      i = env13;
      c = env14;
      bodyA = env15;
      bodyB = env16;
      invMassA = env17;
      normal = env18;
      break;
    case 12:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      psm = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      minSeparation = env9;
      t4 = env10;
      i = env11;
      c = env12;
      bodyA = env13;
      bodyB = env14;
      invMassA = env15;
      C = env16;
      t7 = env17;
      invIA = env18;
      break;
    case 13:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      psm = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      minSeparation = env9;
      t4 = env10;
      i = env11;
      c = env12;
      bodyA = env13;
      bodyB = env14;
      invMassA = env15;
      C = env16;
      t7 = env17;
      t9 = env18;
      invIA = env19;
      break;
    case 14:
      t9 = env0;
      t7 = env1;
      invIA = env2;
      invMassB = env3;
      baumgarte = env4;
      invIB = env5;
      t2 = env6;
      psm = env7;
      t1 = env8;
      j = env9;
      t3 = env10;
      minSeparation = env11;
      t4 = env12;
      i = env13;
      c = env14;
      bodyA = env15;
      bodyB = env16;
      invMassA = env17;
      C = env18;
      normal = env19;
      break;
    case 15:
      t9 = env0;
      t7 = env1;
      t12 = env2;
      invMassB = env3;
      invIA = env4;
      baumgarte = env5;
      invIB = env6;
      t2 = env7;
      psm = env8;
      t1 = env9;
      j = env10;
      t3 = env11;
      minSeparation = env12;
      t4 = env13;
      i = env14;
      c = env15;
      bodyA = env16;
      bodyB = env17;
      invMassA = env18;
      C = env19;
      normal = env20;
      break;
    case 16:
      invIA = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      t9 = env6;
      t1 = env7;
      j = env8;
      t3 = env9;
      minSeparation = env10;
      t4 = env11;
      psm = env12;
      i = env13;
      c = env14;
      bodyA = env15;
      bodyB = env16;
      invMassA = env17;
      C = env18;
      normal = env19;
      break;
    case 17:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      t9 = env6;
      t1 = env7;
      j = env8;
      t3 = env9;
      minSeparation = env10;
      t4 = env11;
      t15 = env12;
      psm = env13;
      i = env14;
      c = env15;
      bodyA = env16;
      bodyB = env17;
      invMassA = env18;
      C = env19;
      invIA = env20;
      break;
    case 18:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      psm = env6;
      t1 = env7;
      j = env8;
      t9 = env9;
      t3 = env10;
      minSeparation = env11;
      t4 = env12;
      t15 = env13;
      i = env14;
      c = env15;
      bodyA = env16;
      bodyB = env17;
      invMassA = env18;
      C = env19;
      invIA = env20;
      break;
    case 19:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      psm = env6;
      t1 = env7;
      j = env8;
      t9 = env9;
      t3 = env10;
      minSeparation = env11;
      t4 = env12;
      t15 = env13;
      t18 = env14;
      i = env15;
      c = env16;
      bodyA = env17;
      bodyB = env18;
      invMassA = env19;
      C = env20;
      invIA = env21;
      break;
    case 20:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      t1 = env3;
      t2 = env4;
      invIB = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t6 = env14;
      t5 = env15;
      invMassA = env16;
      invIA = env17;
      break;
    case 21:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      t1 = env3;
      t2 = env4;
      invIB = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t6 = env14;
      t5 = env15;
      t8 = env16;
      invMassA = env17;
      invIA = env18;
      break;
    case 22:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      t1 = env3;
      t2 = env4;
      invIB = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t6 = env14;
      t5 = env15;
      t8 = env16;
      t10 = env17;
      invMassA = env18;
      invIA = env19;
      break;
    case 23:
      invIA = env0;
      baumgarte = env1;
      invMassB = env2;
      psm = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      minSeparation = env9;
      t4 = env10;
      i = env11;
      c = env12;
      bodyA = env13;
      bodyB = env14;
      t6 = env15;
      t5 = env16;
      invMassA = env17;
      t10 = env18;
      t8 = env19;
      break;
    case 24:
      t13 = env0;
      baumgarte = env1;
      invIA = env2;
      invMassB = env3;
      psm = env4;
      invIB = env5;
      t2 = env6;
      t1 = env7;
      j = env8;
      t3 = env9;
      minSeparation = env10;
      t4 = env11;
      i = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t6 = env16;
      t5 = env17;
      invMassA = env18;
      t10 = env19;
      t8 = env20;
      break;
    case 25:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      invMassA = env16;
      invIA = env17;
      break;
    case 26:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t17 = env16;
      invMassA = env17;
      invIA = env18;
      break;
    case 27:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t19 = env16;
      t17 = env17;
      invMassA = env18;
      invIA = env19;
      break;
    case 28:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t19 = env16;
      t17 = env17;
      invMassA = env18;
      invIA = env19;
      break;
    case 29:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t19 = env16;
      t17 = env17;
      t22 = env18;
      invMassA = env19;
      invIA = env20;
      break;
  }
  switch (state) {
    case 0:
      var psm = this.psolver;
      var t1 = this.rA;
      var t2 = this.rB;
      var t3 = this.P;
      var t4 = this.temp1;
      var i = 0;
      var minSeparation = 0.0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t5 = this.constraintCount;
            case 1:
              state = 0;
              if (!$.ltB(i, t5))
                break L0;
              t5 = this.constraints;
              if (i < 0 || i >= t5.length)
                throw $.ioore(i);
              var c = t5[i];
              var bodyA = c.get$bodyA();
              var bodyB = c.get$bodyB();
              t5 = bodyA.get$mass();
            case 2:
              state = 0;
              var t7 = bodyA.get$invMass();
            case 3:
              state = 0;
              var invMassA = $.mul(t5, t7);
              t7 = bodyA.get$mass();
            case 4:
              state = 0;
              var t9 = bodyA.get$invInertia();
            case 5:
              state = 0;
              var invIA = $.mul(t7, t9);
              t9 = bodyB.get$mass();
            case 6:
              state = 0;
              var t11 = bodyB.get$invMass();
            case 7:
              state = 0;
              var invMassB = $.mul(t9, t11);
              t11 = bodyB.get$mass();
            case 8:
              state = 0;
              var t13 = bodyB.get$invInertia();
            case 9:
              state = 0;
              var invIB = $.mul(t11, t13);
              var j = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      t5 = c.get$pointCount();
                    case 10:
                      state = 0;
                      if (!$.ltB(j, t5))
                        break L1;
                      psm.initialize$2(c, j);
                      var normal = psm.get$normal();
                      var point = psm.get$point();
                      var separation = psm.get$separation();
                    case 11:
                      state = 0;
                      t1.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
                      t2.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
                      minSeparation = $.min(minSeparation, separation);
                      var t6 = $.add(separation, 0.005);
                      if (typeof t6 !== 'number')
                        throw $.iae(t6);
                      var C = $.max(-0.2, $.min(baumgarte * t6, 0.0));
                      t7 = t1.get$x();
                    case 12:
                      state = 0;
                      t9 = normal.get$y();
                    case 13:
                      state = 0;
                      t9 = $.mul(t7, t9);
                      t7 = t1.get$y();
                    case 14:
                      state = 0;
                      var t12 = normal.get$x();
                    case 15:
                      state = 0;
                      var rnA = $.sub(t9, $.mul(t7, t12));
                      t9 = t2.get$x();
                    case 16:
                      state = 0;
                      var t15 = normal.get$y();
                    case 17:
                      state = 0;
                      t15 = $.mul(t9, t15);
                      t9 = t2.get$y();
                    case 18:
                      state = 0;
                      var t18 = normal.get$x();
                    case 19:
                      state = 0;
                      var rnB = $.sub(t15, $.mul(t9, t18));
                      var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
                      if ($.gtB(K, 0.0)) {
                        t5 = -C;
                        if (typeof K !== 'number')
                          throw $.iae(K);
                        var impulse = t5 / K;
                      } else
                        impulse = 0.0;
                      t3.setFrom$1(normal).mulLocal$1(impulse);
                      t4.setFrom$1(t3).mulLocal$1(invMassA);
                      bodyA.get$sweep().get$center().subLocal$1(t4);
                      t5 = bodyA.get$sweep();
                      t6 = t5.get$angle();
                    case 20:
                      state = 0;
                      var t8 = t1.get$x();
                    case 21:
                      state = 0;
                      var t10 = t3.get$y();
                    case 22:
                      state = 0;
                      t10 = $.mul(t8, t10);
                      t8 = t1.get$y();
                    case 23:
                      state = 0;
                      t13 = t3.get$x();
                    case 24:
                      state = 0;
                      t5.set$angle($.sub(t6, $.mul(invIA, $.sub(t10, $.mul(t8, t13)))));
                      bodyA.synchronizeTransform$0();
                      t4.setFrom$1(t3).mulLocal$1(invMassB);
                      bodyB.get$sweep().get$center().addLocal$1(t4);
                      t5 = bodyB.get$sweep();
                      t15 = t5.get$angle();
                    case 25:
                      state = 0;
                      var t17 = t2.get$x();
                    case 26:
                      state = 0;
                      var t19 = t3.get$y();
                    case 27:
                      state = 0;
                      t19 = $.mul(t17, t19);
                      t17 = t2.get$y();
                    case 28:
                      state = 0;
                      var t22 = t3.get$x();
                    case 29:
                      state = 0;
                      t5.set$angle($.add(t15, $.mul(invIB, $.sub(t19, $.mul(t17, t22)))));
                      bodyB.synchronizeTransform$0();
                      ++j;
                  }
              ++i;
          }
      return minSeparation >= -0.0075;
  }
},
 ContactSolver$0: function() {
  for (var i = 0; i < this.constraints.length; ++i) {
    var t1 = this.constraints;
    var t2 = $.ContactConstraint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.PositionSolverManifold = {"":
 ["normal?", "point?", "separation=", "pointA?", "pointB?", "temp", "planePoint", "clipPoint"],
 "super": "Object",
 initialize$2: function(cc, index) {
  switch (cc.get$type()) {
    case 0:
      var t1 = cc.get$bodyA();
      var t2 = cc.get$localPoint();
      var t3 = this.pointA;
      t1.getWorldPointToOut$2(t2, t3);
      t2 = cc.get$bodyB();
      t1 = $.index(cc.get$points(), 0).get$localPoint();
      var t4 = this.pointB;
      t2.getWorldPointToOut$2(t1, t4);
      t1 = $.gtB($.MathBox_distanceSquared(t3, t4), 1.4208639999999999e-14);
      t2 = this.normal;
      if (t1) {
        t2.setFrom$1(t4).subLocal$1(t3);
        t2.normalize$0();
      } else
        t2.setCoords$2(1.0, 0.0);
      this.point.setFrom$1(t3).addLocal$1(t4).mulLocal$1(0.5);
      t1 = this.temp;
      t1.setFrom$1(t4).subLocal$1(t3);
      t3 = this.normal;
      this.separation = $.sub($.add($.mul(t1.get$x(), t3.get$x()), $.mul(t1.get$y(), t3.get$y())), cc.get$radius());
      break;
    case 1:
      t1 = cc.get$bodyA();
      t2 = cc.get$localNormal();
      t3 = this.normal;
      t1.getWorldVectorToOut$2(t2, t3);
      t2 = cc.get$bodyA();
      t1 = cc.get$localPoint();
      t4 = this.planePoint;
      t2.getWorldPointToOut$2(t1, t4);
      t1 = cc.get$bodyB();
      t2 = $.index(cc.get$points(), index).get$localPoint();
      var t5 = this.clipPoint;
      t1.getWorldPointToOut$2(t2, t5);
      t2 = this.temp;
      t2.setFrom$1(t5).subLocal$1(t4);
      this.separation = $.sub($.add($.mul(t2.get$x(), t3.get$x()), $.mul(t2.get$y(), t3.get$y())), cc.get$radius());
      this.point.setFrom$1(t5);
      break;
    case 2:
      t1 = cc.get$bodyB();
      t2 = cc.get$localNormal();
      t3 = this.normal;
      t1.getWorldVectorToOut$2(t2, t3);
      t2 = cc.get$bodyB();
      t1 = cc.get$localPoint();
      t4 = this.planePoint;
      t2.getWorldPointToOut$2(t1, t4);
      t1 = cc.get$bodyA();
      t2 = $.index(cc.get$points(), index).get$localPoint();
      t5 = this.clipPoint;
      t1.getWorldPointToOut$2(t2, t5);
      t2 = this.temp;
      t2.setFrom$1(t5).subLocal$1(t4);
      this.separation = $.sub($.add($.mul(t2.get$x(), t3.get$x()), $.mul(t2.get$y(), t3.get$y())), cc.get$radius());
      this.point.setFrom$1(t5);
      t3.negateLocal$0();
  }
}
};

$$.PolygonAndCircleContact = {"":
 ["flags", "prev", "next", "edge1", "edge2", "fixtureA", "fixtureB", "manifold", "toiCount", "pool", "_oldManifold"],
 "super": "Contact",
 init$2: function(fA, fB) {
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
},
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygonAndCircle$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
}
};

$$.PolygonContact = {"":
 ["flags", "prev", "next", "edge1", "edge2", "fixtureA", "fixtureB", "manifold", "toiCount", "pool", "_oldManifold"],
 "super": "Contact",
 init$2: function(fA, fB) {
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(1, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
},
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygons$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
}
};

$$.TimeOfImpactSolver = {"":
 ["constraints?", "count=", "toiBody", "psm", "rA?", "rB?", "P", "temp"],
 "super": "Object",
 initialize$3: function(contacts, argCount, argToiBody) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object' || contacts === null || contacts.constructor !== Array && !contacts.is$JavaScriptIndexingBehavior))
    return this.initialize$3$bailout(1, contacts, argCount, argToiBody);
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, this.constraints.length)) {
    var old = this.constraints;
    this.constraints = $.ListImplementation_List($.max(this.count, old.length * 2), 'TimeOfImpactConstraint');
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; t1 = this.constraints, i < t1.length; ++i) {
      var t2 = $.TimeOfImpactConstraint$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (i = 0; $.ltB(i, this.count); ++i) {
    if (i < 0 || i >= contacts.length)
      throw $.ioore(i);
    var contact = contacts[i];
    var fixtureA = contact.get$fixtureA();
    var fixtureB = contact.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = contact.get$manifold();
    var t1 = this.constraints;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var constraint = t1[i];
    constraint.set$bodyA(bodyA);
    constraint.set$bodyB(bodyB);
    constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
    constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
    constraint.set$type(manifold.get$type());
    constraint.set$pointCount(manifold.get$pointCount());
    constraint.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, constraint.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
    }
  }
},
 initialize$3$bailout: function(state, contacts, argCount, argToiBody) {
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, this.constraints.length)) {
    var old = this.constraints;
    this.constraints = $.ListImplementation_List($.max(this.count, old.length * 2), 'TimeOfImpactConstraint');
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; i < this.constraints.length; ++i) {
      var t1 = this.constraints;
      var t2 = $.TimeOfImpactConstraint$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (i = 0; $.ltB(i, this.count); ++i) {
    var contact = $.index(contacts, i);
    var fixtureA = contact.get$fixtureA();
    var fixtureB = contact.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = contact.get$manifold();
    t1 = this.constraints;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var constraint = t1[i];
    constraint.set$bodyA(bodyA);
    constraint.set$bodyB(bodyB);
    constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
    constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
    constraint.set$type(manifold.get$type());
    constraint.set$pointCount(manifold.get$pointCount());
    constraint.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, constraint.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
    }
  }
},
 solve$1: function(baumgarte) {
  for (var t1 = this.psm, t2 = this.rA, t3 = this.rB, t4 = this.P, t5 = this.temp, normal = t1.normal, point = t1.point, i = 0, minSeparation = 0; $.ltB(i, this.count); ++i) {
    var t6 = this.constraints;
    if (i < 0 || i >= t6.length)
      throw $.ioore(i);
    var c = t6[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var massA = bodyA.get$mass();
    var massB = bodyB.get$mass();
    if ($.eqB(bodyA, this.toiBody))
      massB = 0.0;
    else
      massA = 0.0;
    var invMassA = $.mul(massA, bodyA.get$invMass());
    if (typeof invMassA !== 'number')
      return this.solve$1$bailout(1, baumgarte, massA, massB, invMassA, i, minSeparation, c, bodyA, bodyB, t1, t2, t3, t4, t5, 0);
    var invIA = $.mul(massA, bodyA.get$invInertia());
    if (typeof invIA !== 'number')
      return this.solve$1$bailout(2, baumgarte, massB, invMassA, i, minSeparation, invIA, c, bodyA, t1, bodyB, t2, t3, t4, t5, 0);
    var invMassB = $.mul(massB, bodyB.get$invMass());
    if (typeof invMassB !== 'number')
      return this.solve$1$bailout(3, baumgarte, massB, invMassA, i, minSeparation, invIA, invMassB, c, bodyA, bodyB, t1, t2, t3, t4, t5);
    var invIB = $.mul(massB, bodyB.get$invInertia());
    if (typeof invIB !== 'number')
      return this.solve$1$bailout(4, baumgarte, invMassA, i, minSeparation, invIA, invMassB, invIB, c, bodyA, t1, bodyB, t2, t3, t4, t5);
    for (var t6 = invMassA + invMassB, j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      t1.initialize$2(c, j);
      var separation = t1.separation;
      t2.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      t3.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.min(minSeparation, separation);
      var t7 = $.add(separation, 0.005);
      if (typeof t7 !== 'number')
        throw $.iae(t7);
      var C = $.max(-0.2, $.min(baumgarte * t7, 0.0));
      var rnA = $.sub($.mul(t2.x, normal.get$y()), $.mul(t2.y, normal.get$x()));
      var rnB = $.sub($.mul(t3.x, normal.get$y()), $.mul(t3.y, normal.get$x()));
      if (typeof rnA !== 'number')
        throw $.iae(rnA);
      var t8 = t6 + invIA * rnA * rnA;
      if (typeof rnB !== 'number')
        throw $.iae(rnB);
      var K = t8 + invIB * rnB * rnB;
      var impulse = K > 0.0 ? -C / K : 0.0;
      t4.setFrom$1(normal).mulLocal$1(impulse);
      t5.setFrom$1(t4).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(t5);
      t7 = bodyA.get$sweep();
      t8 = t7.get$angle();
      var t9 = $.sub($.mul(t2.x, t4.y), $.mul(t2.y, t4.x));
      if (typeof t9 !== 'number')
        throw $.iae(t9);
      t7.set$angle($.sub(t8, invIA * t9));
      bodyA.synchronizeTransform$0();
      t5.setFrom$1(t4).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(t5);
      t7 = bodyB.get$sweep();
      var t10 = t7.get$angle();
      var t11 = $.sub($.mul(t3.x, t4.y), $.mul(t3.y, t4.x));
      if (typeof t11 !== 'number')
        throw $.iae(t11);
      t7.set$angle($.add(t10, invIB * t11));
      bodyB.synchronizeTransform$0();
    }
  }
  return minSeparation >= -0.0075;
},
 solve$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      massA = env1;
      massB = env2;
      invMassA = env3;
      i = env4;
      minSeparation = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      t2 = env10;
      t3 = env11;
      t4 = env12;
      t5 = env13;
      break;
    case 2:
      baumgarte = env0;
      massB = env1;
      invMassA = env2;
      i = env3;
      minSeparation = env4;
      invIA = env5;
      c = env6;
      bodyA = env7;
      t1 = env8;
      bodyB = env9;
      t2 = env10;
      t3 = env11;
      t4 = env12;
      t5 = env13;
      break;
    case 3:
      baumgarte = env0;
      massB = env1;
      invMassA = env2;
      i = env3;
      minSeparation = env4;
      invIA = env5;
      invMassB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      t4 = env13;
      t5 = env14;
      break;
    case 4:
      baumgarte = env0;
      invMassA = env1;
      i = env2;
      minSeparation = env3;
      invIA = env4;
      invMassB = env5;
      invIB = env6;
      c = env7;
      bodyA = env8;
      t1 = env9;
      bodyB = env10;
      t2 = env11;
      t3 = env12;
      t4 = env13;
      t5 = env14;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.psm;
      var t2 = this.rA;
      var t3 = this.rB;
      var t4 = this.P;
      var t5 = this.temp;
      var i = 0;
      var minSeparation = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, this.count))
                break L0;
              var t6 = this.constraints;
              if (i < 0 || i >= t6.length)
                throw $.ioore(i);
              var c = t6[i];
              var bodyA = c.get$bodyA();
              var bodyB = c.get$bodyB();
              var massA = bodyA.get$mass();
              var massB = bodyB.get$mass();
              if ($.eqB(bodyA, this.toiBody))
                massB = 0.0;
              else
                massA = 0.0;
              var invMassA = $.mul(massA, bodyA.get$invMass());
            case 1:
              state = 0;
              var invIA = $.mul(massA, bodyA.get$invInertia());
            case 2:
              state = 0;
              var invMassB = $.mul(massB, bodyB.get$invMass());
            case 3:
              state = 0;
              var invIB = $.mul(massB, bodyB.get$invInertia());
            case 4:
              state = 0;
              for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
                t1.initialize$2(c, j);
                var normal = t1.get$normal();
                var point = t1.get$point();
                var separation = t1.get$separation();
                t2.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
                t3.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
                minSeparation = $.min(minSeparation, separation);
                t6 = $.add(separation, 0.005);
                if (typeof t6 !== 'number')
                  throw $.iae(t6);
                var C = $.max(-0.2, $.min(baumgarte * t6, 0.0));
                var rnA = $.sub($.mul(t2.get$x(), normal.get$y()), $.mul(t2.get$y(), normal.get$x()));
                var rnB = $.sub($.mul(t3.get$x(), normal.get$y()), $.mul(t3.get$y(), normal.get$x()));
                var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
                if ($.gtB(K, 0.0)) {
                  t6 = -C;
                  if (typeof K !== 'number')
                    throw $.iae(K);
                  var impulse = t6 / K;
                } else
                  impulse = 0.0;
                t4.setFrom$1(normal).mulLocal$1(impulse);
                t5.setFrom$1(t4).mulLocal$1(invMassA);
                bodyA.get$sweep().get$center().subLocal$1(t5);
                t6 = bodyA.get$sweep();
                t6.set$angle($.sub(t6.get$angle(), $.mul(invIA, $.sub($.mul(t2.get$x(), t4.get$y()), $.mul(t2.get$y(), t4.get$x())))));
                bodyA.synchronizeTransform$0();
                t5.setFrom$1(t4).mulLocal$1(invMassB);
                bodyB.get$sweep().get$center().addLocal$1(t5);
                t6 = bodyB.get$sweep();
                t6.set$angle($.add(t6.get$angle(), $.mul(invIB, $.sub($.mul(t3.get$x(), t4.get$y()), $.mul(t3.get$y(), t4.get$x())))));
                bodyB.synchronizeTransform$0();
              }
              ++i;
          }
      return minSeparation >= -0.0075;
  }
},
 TimeOfImpactSolver$0: function() {
  for (var i = 0; i < this.constraints.length; ++i) {
    var t1 = this.constraints;
    var t2 = $.TimeOfImpactConstraint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.TimeOfImpactSolverManifold = {"":
 ["normal?", "point?", "separation=", "pointA?", "pointB?", "temp", "planePoint", "clipPoint"],
 "super": "Object",
 initialize$2: function(cc, index) {
  switch (cc.get$type()) {
    case 0:
      var t1 = this.pointA;
      t1.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
      var t2 = this.pointB;
      t2.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), 0)));
      var t3 = $.gtB($.MathBox_distanceSquared(t1, t2), 1.4208639999999999e-14);
      var t4 = this.normal;
      if (t3) {
        t4.setFrom$1(t2).subLocal$1(t1);
        t4.normalize$0();
      } else
        t4.setCoords$2(1, 0);
      this.point.setFrom$1(t1).addLocal$1(t2).mulLocal$1(0.5);
      t3 = this.temp;
      t3.setFrom$1(t2).subLocal$1(t1);
      t1 = this.normal;
      this.separation = $.sub($.add($.mul(t3.get$x(), t1.get$x()), $.mul(t3.get$y(), t1.get$y())), cc.get$radius());
      break;
    case 1:
      t1 = this.normal;
      t1.setFrom$1(cc.get$bodyA().getWorldVector$1(cc.get$localNormal()));
      t2 = this.planePoint;
      t2.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
      t3 = this.clipPoint;
      t3.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), index)));
      t4 = this.temp;
      t4.setFrom$1(t3).subLocal$1(t2);
      this.separation = $.sub($.add($.mul(t4.get$x(), t1.get$x()), $.mul(t4.get$y(), t1.get$y())), cc.get$radius());
      this.point.setFrom$1(t3);
      break;
    case 2:
      t1 = this.normal;
      t1.setFrom$1(cc.get$bodyB().getWorldVector$1(cc.get$localNormal()));
      t2 = this.planePoint;
      t2.setFrom$1(cc.get$bodyB().getWorldPoint$1(cc.get$localPoint()));
      t3 = this.clipPoint;
      t3.setFrom$1(cc.get$bodyA().getWorldPoint$1($.index(cc.get$localPoints(), index)));
      t4 = this.temp;
      t4.setFrom$1(t3).subLocal$1(t2);
      this.separation = $.sub($.add($.mul(t4.get$x(), t1.get$x()), $.mul(t4.get$y(), t1.get$y())), cc.get$radius());
      this.point.setFrom$1(t3);
      t1.negateLocal$0();
      break;
  }
}
};

$$.TimeOfImpactConstraint = {"":
 ["localPoints?", "localNormal?", "localPoint?", "type=", "radius=", "pointCount=", "bodyA=", "bodyB="],
 "super": "Object",
 setFrom$1: function(argOther) {
  for (var t1 = this.localPoints, i = 0; t2 = t1.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var t3 = t1[i];
    var t4 = argOther.get$localPoints();
    if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior))
      return this.setFrom$1$bailout(1, i, argOther, t1, t3, t4);
    if (i < 0 || i >= t4.length)
      throw $.ioore(i);
    t3.setFrom$1(t4[i]);
  }
  this.localNormal.setFrom$1(argOther.get$localNormal());
  this.localPoint.setFrom$1(argOther.get$localPoint());
  this.type = argOther.get$type();
  this.radius = argOther.get$radius();
  this.pointCount = argOther.get$pointCount();
  this.bodyA = argOther.get$bodyA();
  this.bodyB = argOther.get$bodyB();
  var t2;
},
 setFrom$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      i = env0;
      var argOther = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.localPoints;
      var i = 0;
    case 1:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < t1.length))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              var t2 = t1[i];
              var t3 = argOther.get$localPoints();
            case 1:
              state = 0;
              t2.setFrom$1($.index(t3, i));
              ++i;
          }
      this.localNormal.setFrom$1(argOther.get$localNormal());
      this.localPoint.setFrom$1(argOther.get$localPoint());
      this.type = argOther.get$type();
      this.radius = argOther.get$radius();
      this.pointCount = argOther.get$pointCount();
      this.bodyA = argOther.get$bodyA();
      this.bodyB = argOther.get$bodyB();
  }
},
 TimeOfImpactConstraint$0: function() {
  for (var t1 = this.localPoints, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.Joint = {"":
 ["type=", "_prev!", "_lib_next=", "edgeA?", "edgeB?", "bodyA=", "bodyB=", "islandFlag=", "collideConnected?", "userData="],
 "super": "Object",
 get$active: function() {
  return this.bodyA.get$active() === true && this.bodyB.get$active() === true;
},
 initVelocityConstraints$1: function(step) {
},
 solveVelocityConstraints$1: function(step) {
},
 solvePositionConstraints$1: function(baumgarte) {
}
};

$$.JointEdge = {"":
 ["other=", "joint=", "prev=", "next="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); }
};

$$.JointDef = {"":
 ["type=", "userData=", "bodyA=", "bodyB=", "collideConnected?"],
 "super": "Object"
};

$$.ConstantVolumeJoint = {"":
 ["bodies?", "targetLengths", "targetVolume", "normals?", "step", "_impulse", "_world", "distanceJoints", "frequencyHz?", "dampingRatio?", "type", "_prev", "_lib_next", "edgeA", "edgeB", "bodyA", "bodyB", "islandFlag", "collideConnected", "userData", "localCenterA", "localCenterB", "invMassA", "invIA", "invMassB", "invIB"],
 "super": "Joint",
 step$3: function(arg0, arg1, arg2) { return this.step.call$3(arg0, arg1, arg2); },
 get$area: function() {
  var t1 = this.bodies;
  var t2 = t1.length - 1;
  if (t2 < 0 || t2 >= t1.length)
    throw $.ioore(t2);
  var t3 = t1[t2].get$worldCenter().get$x();
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t3 = $.mul(t3, t1[0].get$worldCenter().get$y());
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  var t4 = t1[0].get$worldCenter().get$x();
  var t5 = t1.length - 1;
  if (t5 < 0 || t5 >= t1.length)
    throw $.ioore(t5);
  t3 = $.sub(t3, $.mul(t4, t1[t5].get$worldCenter().get$y()));
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  var result = 0.0 + t3;
  for (var i = 0; i < t1.length - 1; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = t1[i].get$worldCenter().get$x();
    t3 = i + 1;
    if (t3 < 0 || t3 >= t1.length)
      throw $.ioore(t3);
    t2 = $.mul(t2, t1[t3].get$worldCenter().get$y());
    if (t3 < 0 || t3 >= t1.length)
      throw $.ioore(t3);
    t4 = t1[t3].get$worldCenter().get$x();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = $.sub(t2, $.mul(t4, t1[i].get$worldCenter().get$y()));
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    result += t2;
  }
  return result * 0.5;
},
 constrainEdges$1: function(argStep) {
  for (var t1 = this.bodies, t2 = this.normals, perimeter = 0.0, i = 0; i < t1.length; ++i) {
    var next = i === t1.length - 1 ? 0 : i + 1;
    if (next < 0 || next >= t1.length)
      throw $.ioore(next);
    var t3 = t1[next].get$worldCenter().get$x();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var dx = $.sub(t3, t1[i].get$worldCenter().get$x());
    if (next < 0 || next >= t1.length)
      throw $.ioore(next);
    t3 = t1[next].get$worldCenter().get$y();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var dy = $.sub(t3, t1[i].get$worldCenter().get$y());
    var dist = $.sqrt($.add($.mul(dx, dx), $.mul(dy, dy)));
    if (dist < 1.192e-7)
      dist = 1.0;
    t3 = $.div(dy, dist);
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    t2[i].set$x(t3);
    t3 = $.div($.neg(dx), dist);
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    t2[i].set$y(t3);
    perimeter += dist;
  }
  var delta = $.Vector$(0, 0);
  var deltaArea = $.sub(this.targetVolume, this.get$area());
  if (typeof deltaArea !== 'number')
    throw $.iae(deltaArea);
  var toExtrude = 0.5 * deltaArea / perimeter;
  for (var done = true, i = 0; i < t1.length; ++i) {
    next = i === t1.length - 1 ? 0 : i + 1;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    t3 = t2[i].get$x();
    if (next < 0 || next >= t2.length)
      throw $.ioore(next);
    t3 = $.add(t3, t2[next].get$x());
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    t3 = toExtrude * t3;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    var t4 = t2[i].get$y();
    if (next < 0 || next >= t2.length)
      throw $.ioore(next);
    t4 = $.add(t4, t2[next].get$y());
    if (typeof t4 !== 'number')
      throw $.iae(t4);
    delta.setCoords$2(t3, toExtrude * t4);
    var norm = $.get$length(delta);
    if ($.gtB(norm, 0.2)) {
      if (typeof norm !== 'number')
        throw $.iae(norm);
      delta.mulLocal$1(0.2 / norm);
    }
    if ($.gtB(norm, 0.005))
      done = false;
    if (next < 0 || next >= t1.length)
      throw $.ioore(next);
    t3 = t1[next].get$sweep().get$center();
    t3.set$x($.add(t3.get$x(), delta.x));
    if (next < 0 || next >= t1.length)
      throw $.ioore(next);
    t3 = t1[next].get$sweep().get$center();
    t3.set$y($.add(t3.get$y(), delta.y));
    if (next < 0 || next >= t1.length)
      throw $.ioore(next);
    t1[next].synchronizeTransform$0();
  }
  return done;
},
 initVelocityConstraints$1: function(argStep) {
  this.step = argStep;
  var t1 = this.bodies;
  var d = $.ListImplementation_List(t1.length, 'Vector');
  for (var i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    d[i] = t2;
  }
  for (i = 0; t2 = t1.length, i < t2; ++i) {
    var prev = i === 0 ? t2 - 1 : i - 1;
    var next = i === t2 - 1 ? 0 : i + 1;
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    var t3 = d[i];
    if (next < 0 || next >= t2)
      throw $.ioore(next);
    t3.setFrom$1(t1[next].get$worldCenter());
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    t3 = d[i];
    if (prev < 0 || prev >= t1.length)
      throw $.ioore(prev);
    t3.subLocal$1(t1[prev].get$worldCenter());
  }
  if (this.step.get$warmStarting() === true) {
    t2 = this._impulse;
    if (typeof t2 !== 'number')
      return this.initVelocityConstraints$1$bailout(1, t2, d, t1, 0, 0, 0, 0);
    var t4 = this.step.get$dtRatio();
    if (typeof t4 !== 'number')
      return this.initVelocityConstraints$1$bailout(2, t2, d, t1, t4, 0, 0, 0);
    this._impulse = t2 * t4;
    for (i = 0; t2 = t1.length, i < t2; ++i) {
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t3 = t1[i].get$linearVelocity();
      t4 = t3.get$x();
      if (typeof t4 !== 'number')
        return this.initVelocityConstraints$1$bailout(3, t1, i, t3, t4, d, 0, 0);
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      var t6 = t1[i].get$invMass();
      if (typeof t6 !== 'number')
        return this.initVelocityConstraints$1$bailout(4, t1, i, t3, t4, d, t6, 0);
      if (i < 0 || i >= d.length)
        throw $.ioore(i);
      var t8 = d[i].get$y();
      if (typeof t8 !== 'number')
        return this.initVelocityConstraints$1$bailout(5, t1, i, t3, t4, d, t6, t8);
      var t10 = t6 * t8 * 0.5;
      var t11 = this._impulse;
      if (typeof t11 !== 'number')
        return this.initVelocityConstraints$1$bailout(6, t1, i, t3, t4, d, t10, t11);
      t3.set$x(t4 + t10 * t11);
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t3 = t1[i].get$linearVelocity();
      var t13 = t3.get$y();
      if (typeof t13 !== 'number')
        return this.initVelocityConstraints$1$bailout(7, t1, i, d, t3, t13, 0, 0);
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      var t15 = t1[i].get$invMass();
      if (typeof t15 !== 'number')
        return this.initVelocityConstraints$1$bailout(8, t15, t1, i, d, t3, t13, 0);
      if (i < 0 || i >= d.length)
        throw $.ioore(i);
      var t17 = d[i].get$x();
      if (typeof t17 !== 'number')
        return this.initVelocityConstraints$1$bailout(9, t15, t1, i, t17, d, t3, t13);
      var t19 = t15 * -t17 * 0.5;
      var t20 = this._impulse;
      if (typeof t20 !== 'number')
        return this.initVelocityConstraints$1$bailout(10, t1, i, d, t20, t19, t3, t13);
      t3.set$y(t13 + t19 * t20);
    }
  } else
    this._impulse = 0.0;
},
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t2 = env0;
      d = env1;
      t1 = env2;
      break;
    case 2:
      t2 = env0;
      d = env1;
      t1 = env2;
      t4 = env3;
      break;
    case 3:
      t1 = env0;
      i = env1;
      t2 = env2;
      t3 = env3;
      d = env4;
      break;
    case 4:
      t1 = env0;
      i = env1;
      t2 = env2;
      t3 = env3;
      d = env4;
      t5 = env5;
      break;
    case 5:
      t1 = env0;
      i = env1;
      t2 = env2;
      t3 = env3;
      d = env4;
      t5 = env5;
      t7 = env6;
      break;
    case 6:
      t1 = env0;
      i = env1;
      t2 = env2;
      t3 = env3;
      d = env4;
      t9 = env5;
      t10 = env6;
      break;
    case 7:
      t1 = env0;
      i = env1;
      d = env2;
      t2 = env3;
      t12 = env4;
      break;
    case 8:
      t14 = env0;
      t1 = env1;
      i = env2;
      d = env3;
      t2 = env4;
      t12 = env5;
      break;
    case 9:
      t14 = env0;
      t1 = env1;
      i = env2;
      t16 = env3;
      d = env4;
      t2 = env5;
      t12 = env6;
      break;
    case 10:
      t1 = env0;
      i = env1;
      d = env2;
      t19 = env3;
      t18 = env4;
      t2 = env5;
      t12 = env6;
      break;
  }
  switch (state) {
    case 0:
      this.step = argStep;
      var t1 = this.bodies;
      var d = $.ListImplementation_List(t1.length, 'Vector');
      for (var i = 0; i < t1.length; ++i) {
        var t2 = $.Vector$(0, 0);
        if (i < 0 || i >= d.length)
          throw $.ioore(i);
        d[i] = t2;
      }
      for (i = 0; i < t1.length; ++i) {
        var prev = i === 0 ? t1.length - 1 : i - 1;
        var next = i === t1.length - 1 ? 0 : i + 1;
        if (i < 0 || i >= d.length)
          throw $.ioore(i);
        t2 = d[i];
        if (next < 0 || next >= t1.length)
          throw $.ioore(next);
        t2.setFrom$1(t1[next].get$worldCenter());
        if (i < 0 || i >= d.length)
          throw $.ioore(i);
        t2 = d[i];
        if (prev < 0 || prev >= t1.length)
          throw $.ioore(prev);
        t2.subLocal$1(t1[prev].get$worldCenter());
      }
    default:
      if (state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 2 || state === 1 || state === 0 && this.step.get$warmStarting() === true)
        switch (state) {
          case 0:
            t2 = this._impulse;
          case 1:
            state = 0;
            var t4 = this.step.get$dtRatio();
          case 2:
            state = 0;
            this._impulse = $.mul(t2, t4);
            i = 0;
          default:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!(i < t1.length))
                      break L0;
                    if (i < 0 || i >= t1.length)
                      throw $.ioore(i);
                    t2 = t1[i].get$linearVelocity();
                    var t3 = t2.get$x();
                  case 3:
                    state = 0;
                    if (i < 0 || i >= t1.length)
                      throw $.ioore(i);
                    var t5 = t1[i].get$invMass();
                  case 4:
                    state = 0;
                    if (i < 0 || i >= d.length)
                      throw $.ioore(i);
                    var t7 = d[i].get$y();
                  case 5:
                    state = 0;
                    var t9 = $.mul($.mul(t5, t7), 0.5);
                    var t10 = this._impulse;
                  case 6:
                    state = 0;
                    t2.set$x($.add(t3, $.mul(t9, t10)));
                    if (i < 0 || i >= t1.length)
                      throw $.ioore(i);
                    t2 = t1[i].get$linearVelocity();
                    var t12 = t2.get$y();
                  case 7:
                    state = 0;
                    if (i < 0 || i >= t1.length)
                      throw $.ioore(i);
                    var t14 = t1[i].get$invMass();
                  case 8:
                    state = 0;
                    if (i < 0 || i >= d.length)
                      throw $.ioore(i);
                    var t16 = d[i].get$x();
                  case 9:
                    state = 0;
                    var t18 = $.mul($.mul(t14, $.neg(t16)), 0.5);
                    var t19 = this._impulse;
                  case 10:
                    state = 0;
                    t2.set$y($.add(t12, $.mul(t18, t19)));
                    ++i;
                }
        }
      else
        this._impulse = 0.0;
  }
},
 solvePositionConstraints$1: function(baumgarte) {
  return this.constrainEdges$1(this.step);
},
 solveVelocityConstraints$1: function(argStep) {
  var t1 = this.bodies;
  var d = $.ListImplementation_List(t1.length, 'Vector');
  for (var i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    d[i] = t2;
  }
  for (var crossMassSum = 0.0, dotMassSum = 0.0, i = 0; i < t1.length; ++i) {
    var prev = i === 0 ? t1.length - 1 : i - 1;
    var next = i === t1.length - 1 ? 0 : i + 1;
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    t2 = d[i];
    if (next < 0 || next >= t1.length)
      throw $.ioore(next);
    t2.setFrom$1(t1[next].get$worldCenter());
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    t2 = d[i];
    if (prev < 0 || prev >= t1.length)
      throw $.ioore(prev);
    t2.subLocal$1(t1[prev].get$worldCenter());
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    t2 = d[i].get$lengthSquared();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = $.div(t2, t1[i].get$mass());
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    dotMassSum += t2;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = t1[i].get$linearVelocity();
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    var t3 = d[i];
    var t4 = $.sub($.mul(t2.get$x(), t3.get$y()), $.mul(t2.get$y(), t3.get$x()));
    if (typeof t4 !== 'number')
      throw $.iae(t4);
    crossMassSum += t4;
  }
  var lambda = -2.0 * crossMassSum / dotMassSum;
  this._impulse = $.add(this._impulse, lambda);
  for (i = 0; i < t1.length; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = t1[i].get$linearVelocity();
    t3 = t2.get$x();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t4 = t1[i].get$invMass();
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    t2.set$x($.add(t3, $.mul($.mul($.mul(t4, d[i].get$y()), 0.5), lambda)));
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = t1[i].get$linearVelocity();
    var t5 = t2.get$y();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var t6 = t1[i].get$invMass();
    if (i < 0 || i >= d.length)
      throw $.ioore(i);
    t2.set$y($.add(t5, $.mul($.mul($.mul(t6, $.neg(d[i].get$x())), 0.5), lambda)));
  }
},
 ConstantVolumeJoint$2: function(_world, def) {
  if ($.leB($.get$length(def.get$bodies()), 2))
    throw $.captureStackTrace($.IllegalArgumentException$('You cannot create a constant volume joint with less than three bodies.'));
  this.bodies = $.ListImplementation_List$from(def.get$bodies());
  var t1 = this.bodies;
  this.targetLengths = $.ListImplementation_List(t1.length, 'num');
  for (var t2 = this.targetLengths, i = 0; t3 = t2.length, i < t3; ++i) {
    var next = i === t3 - 1 ? 0 : i + 1;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var temp = $.Vector$copy(t1[i].get$worldCenter());
    if (next < 0 || next >= t1.length)
      throw $.ioore(next);
    temp.subLocal$1(t1[next].get$worldCenter());
    var dist = $.get$length(temp);
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    t2[i] = dist;
  }
  this.targetVolume = this.get$area();
  if (!(def.get$joints() == null) && !$.eqB($.get$length(def.get$joints()), $.get$length(def.get$bodies())))
    throw $.captureStackTrace($.IllegalArgumentException$('Incorrect joint definition.  Joints have to correspond to the bodies'));
  if (def.get$joints() == null) {
    var djd = $.DistanceJointDef$();
    this.distanceJoints = $.ListImplementation_List(t1.length, 'DistanceJoint');
    var t3 = this.distanceJoints;
    if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior)
      return this.ConstantVolumeJoint$2$bailout(1, def, t3, t2, t1, djd);
    var t5 = this._world;
    i = 0;
    for (; t4 = t2.length, i < t4; ++i) {
      next = i === t4 - 1 ? 0 : i + 1;
      djd.frequencyHz = def.get$frequencyHz();
      djd.dampingRatio = def.get$dampingRatio();
      var t4 = t1.length;
      if (i < 0 || i >= t4)
        throw $.ioore(i);
      var t6 = t1[i];
      if (next < 0 || next >= t4)
        throw $.ioore(next);
      var t7 = t1[next];
      var t8 = t1[i].get$worldCenter();
      if (next < 0 || next >= t1.length)
        throw $.ioore(next);
      djd.initialize$4(t6, t7, t8, t1[next].get$worldCenter());
      t8 = t5.createJoint$1(djd);
      if (i < 0 || i >= t3.length)
        throw $.ioore(i);
      t3[i] = t8;
    }
  } else {
    this.distanceJoints = $.ListImplementation_List($.get$length(def.get$joints()), 'DistanceJoint');
    $.setRange$3(this.distanceJoints, 0, $.get$length(def.get$joints()), def.get$joints());
  }
  this.frequencyHz = def.get$frequencyHz();
  this.dampingRatio = def.get$dampingRatio();
  this.normals = $.ListImplementation_List(t1.length, 'Vector');
  for (t2 = this.normals, i = 0; i < t2.length; ++i) {
    t3 = $.Vector$(0, 0);
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    t2[i] = t3;
  }
  if (0 >= t1.length)
    throw $.ioore(0);
  this.bodyA = t1[0];
  if (1 >= t1.length)
    throw $.ioore(1);
  this.bodyB = t1[1];
  this.collideConnected = false;
},
 ConstantVolumeJoint$2$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var def = env0;
      t3 = env1;
      t2 = env2;
      t1 = env3;
      djd = env4;
      break;
  }
  switch (state) {
    case 0:
      if ($.leB($.get$length(def.get$bodies()), 2))
        throw $.captureStackTrace($.IllegalArgumentException$('You cannot create a constant volume joint with less than three bodies.'));
      this.bodies = $.ListImplementation_List$from(def.get$bodies());
      var t1 = this.bodies;
      this.targetLengths = $.ListImplementation_List(t1.length, 'num');
      for (var t2 = this.targetLengths, i = 0; i < t2.length; ++i) {
        var next = i === t2.length - 1 ? 0 : i + 1;
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        var temp = $.Vector$copy(t1[i].get$worldCenter());
        if (next < 0 || next >= t1.length)
          throw $.ioore(next);
        temp.subLocal$1(t1[next].get$worldCenter());
        var dist = $.get$length(temp);
        if (i < 0 || i >= t2.length)
          throw $.ioore(i);
        t2[i] = dist;
      }
      this.targetVolume = this.get$area();
      if (!(def.get$joints() == null) && !$.eqB($.get$length(def.get$joints()), $.get$length(def.get$bodies())))
        throw $.captureStackTrace($.IllegalArgumentException$('Incorrect joint definition.  Joints have to correspond to the bodies'));
    case 1:
      if (state === 1 || state === 0 && def.get$joints() == null)
        switch (state) {
          case 0:
            var djd = $.DistanceJointDef$();
            this.distanceJoints = $.ListImplementation_List(t1.length, 'DistanceJoint');
            var t3 = this.distanceJoints;
          case 1:
            state = 0;
            var t5 = this._world;
            i = 0;
            for (; i < t2.length; ++i) {
              next = i === t2.length - 1 ? 0 : i + 1;
              djd.frequencyHz = def.get$frequencyHz();
              djd.dampingRatio = def.get$dampingRatio();
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              var t4 = t1[i];
              if (next < 0 || next >= t1.length)
                throw $.ioore(next);
              var t6 = t1[next];
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              var t7 = t1[i].get$worldCenter();
              if (next < 0 || next >= t1.length)
                throw $.ioore(next);
              djd.initialize$4(t4, t6, t7, t1[next].get$worldCenter());
              $.indexSet(t3, i, t5.createJoint$1(djd));
            }
        }
      else {
        this.distanceJoints = $.ListImplementation_List($.get$length(def.get$joints()), 'DistanceJoint');
        $.setRange$3(this.distanceJoints, 0, $.get$length(def.get$joints()), def.get$joints());
      }
      this.frequencyHz = def.get$frequencyHz();
      this.dampingRatio = def.get$dampingRatio();
      this.normals = $.ListImplementation_List(t1.length, 'Vector');
      for (t2 = this.normals, i = 0; i < t2.length; ++i) {
        t3 = $.Vector$(0, 0);
        if (i < 0 || i >= t2.length)
          throw $.ioore(i);
        t2[i] = t3;
      }
      if (0 < 0 || 0 >= t1.length)
        throw $.ioore(0);
      this.bodyA = t1[0];
      if (1 < 0 || 1 >= t1.length)
        throw $.ioore(1);
      this.bodyB = t1[1];
      this.collideConnected = false;
  }
}
};

$$.DistanceJoint = {"":
 ["localAnchor1", "localAnchor2", "u", "impulse", "mass=", "length=", "frequencyHz?", "dampingRatio?", "gamma", "bias", "type", "_prev", "_lib_next", "edgeA", "edgeB", "bodyA", "bodyB", "islandFlag", "collideConnected", "userData", "localCenterA", "localCenterB", "invMassA", "invIA", "invMassB", "invIB"],
 "super": "Joint",
 initVelocityConstraints$1: function(step) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  var t1 = b2.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number')
    return this.initVelocityConstraints$1$bailout(1, step, b2, b1, r1, r2, t1, 0, 0, 0, 0, 0, 0);
  var t3 = r2.x;
  if (typeof t3 !== 'number')
    return this.initVelocityConstraints$1$bailout(2, step, b2, b1, t3, r1, r2, t1, 0, 0, 0, 0, 0);
  t3 = t1 + t3;
  t1 = b1.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number')
    return this.initVelocityConstraints$1$bailout(3, step, b2, t1, b1, r1, r2, t3, 0, 0, 0, 0, 0);
  t1 = t3 - t1;
  t3 = r1.x;
  if (typeof t3 !== 'number')
    return this.initVelocityConstraints$1$bailout(4, step, b2, b1, t1, t3, r1, r2, 0, 0, 0, 0, 0);
  t3 = t1 - t3;
  t1 = this.u;
  t1.x = t3;
  t3 = b2.get$sweep().get$center().get$y();
  if (typeof t3 !== 'number')
    return this.initVelocityConstraints$1$bailout(5, step, b2, b1, t1, r1, r2, t3, 0, 0, 0, 0, 0);
  var t8 = r2.y;
  if (typeof t8 !== 'number')
    return this.initVelocityConstraints$1$bailout(6, step, b2, b1, t1, r1, t8, r2, t3, 0, 0, 0, 0);
  t8 = t3 + t8;
  t3 = b1.get$sweep().get$center().get$y();
  if (typeof t3 !== 'number')
    return this.initVelocityConstraints$1$bailout(7, step, b2, t3, b1, t1, r1, r2, t8, 0, 0, 0, 0);
  t3 = t8 - t3;
  t8 = r1.y;
  if (typeof t8 !== 'number')
    return this.initVelocityConstraints$1$bailout(8, step, b2, b1, t3, t1, r1, t8, r2, 0, 0, 0, 0);
  t1.y = t3 - t8;
  var len = $.get$length(t1);
  if (typeof len !== 'number')
    return this.initVelocityConstraints$1$bailout(9, step, b2, b1, t1, r1, r2, len, 0, 0, 0, 0, 0);
  if (len > 0.005) {
    var t2 = t1.x;
    if (typeof t2 !== 'number')
      return this.initVelocityConstraints$1$bailout(10, step, b2, b1, t2, t1, r1, r2, len, 0, 0, 0, 0);
    var t4 = 1.0 / len;
    t1.x = t2 * t4;
    var t5 = t1.y;
    if (typeof t5 !== 'number')
      return this.initVelocityConstraints$1$bailout(11, step, b2, b1, t1, r1, t4, r2, len, t5, 0, 0, 0);
    t1.y = t5 * t4;
  } else
    t1.setCoords$2(0.0, 0.0);
  t2 = r1.x;
  if (typeof t2 !== 'number')
    return this.initVelocityConstraints$1$bailout(12, step, t2, b2, b1, t1, r1, r2, len, 0, 0, 0, 0);
  t4 = t1.y;
  if (typeof t4 !== 'number')
    return this.initVelocityConstraints$1$bailout(13, step, t2, b2, b1, t1, r1, r2, t4, len, 0, 0, 0);
  t2 *= t4;
  var t6 = r1.y;
  if (typeof t6 !== 'number')
    return this.initVelocityConstraints$1$bailout(14, step, t6, b2, b1, t1, r1, r2, len, t2, 0, 0, 0);
  t8 = t1.x;
  if (typeof t8 !== 'number')
    return this.initVelocityConstraints$1$bailout(15, step, t6, b2, b1, t1, r1, r2, len, t2, t8, 0, 0);
  var cr1u = t2 - t6 * t8;
  t2 = r2.x;
  if (typeof t2 !== 'number')
    return this.initVelocityConstraints$1$bailout(16, step, b1, cr1u, t2, b2, t1, r1, r2, len, 0, 0, 0);
  t4 = t2 * t4;
  t2 = r2.y;
  if (typeof t2 !== 'number')
    return this.initVelocityConstraints$1$bailout(18, step, b1, cr1u, t2, t1, t4, r1, r2, b2, len, 0, 0);
  var cr2u = t4 - t2 * t8;
  t4 = b1.get$invMass();
  if (typeof t4 !== 'number')
    return this.initVelocityConstraints$1$bailout(20, step, b1, cr1u, b2, t1, r1, r2, len, cr2u, t4, 0, 0);
  var t13 = b1.get$invInertia();
  if (typeof t13 !== 'number')
    return this.initVelocityConstraints$1$bailout(21, step, b1, cr1u, b2, t1, r1, r2, len, cr2u, t4, t13, 0);
  t4 += t13 * cr1u * cr1u;
  var t15 = b2.get$invMass();
  if (typeof t15 !== 'number')
    return this.initVelocityConstraints$1$bailout(22, step, b1, b2, t4, t1, r1, r2, t15, len, cr2u, 0, 0);
  t15 = t4 + t15;
  t4 = b2.get$invInertia();
  if (typeof t4 !== 'number')
    return this.initVelocityConstraints$1$bailout(23, step, b1, b2, t1, r1, t15, r2, t4, len, cr2u, 0, 0);
  var invMass = t15 + t4 * cr2u * cr2u;
  this.mass = 1.0 / invMass;
  t2 = this.frequencyHz;
  if (typeof t2 !== 'number')
    return this.initVelocityConstraints$1$bailout(24, step, b1, b2, t2, r1, r2, invMass, t1, len, 0, 0, 0);
  if (t2 > 0.0) {
    t3 = $.get$length(this);
    if (typeof t3 !== 'number')
      return this.initVelocityConstraints$1$bailout(25, step, b1, b2, t2, r1, r2, t3, invMass, t1, len, 0, 0);
    var C = len - t3;
    var omega = 6.283185307179586 * t2;
    t2 = this.mass;
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    t3 = 2.0 * t2;
    t5 = this.dampingRatio;
    if (typeof t5 !== 'number')
      throw $.iae(t5);
    var d = t3 * t5 * omega;
    var k = t2 * omega * omega;
    t6 = step.get$dt();
    if (typeof t6 !== 'number')
      return this.initVelocityConstraints$1$bailout(26, step, b1, b2, t1, r1, r2, d, invMass, C, k, t6, 0);
    t8 = step.get$dt();
    if (typeof t8 !== 'number')
      return this.initVelocityConstraints$1$bailout(27, step, t8, r1, r2, invMass, C, b1, b2, t1, d, k, t6);
    this.gamma = t6 * (d + t8 * k);
    t2 = this.gamma;
    if (typeof t2 !== 'number')
      return this.initVelocityConstraints$1$bailout(28, b1, b2, step, t1, r1, r2, invMass, C, t2, k, 0, 0);
    this.gamma = !(t2 === 0.0) ? 1.0 / t2 : 0.0;
    t2 = step.get$dt();
    if (typeof t2 !== 'number')
      return this.initVelocityConstraints$1$bailout(29, b1, b2, step, t1, r1, t2, r2, invMass, C, k, 0, 0);
    t4 = C * t2 * k;
    t5 = this.gamma;
    if (typeof t5 !== 'number')
      return this.initVelocityConstraints$1$bailout(30, b1, b2, t5, step, t1, r1, r2, invMass, t4, 0, 0, 0);
    this.bias = t4 * t5;
    var t7 = this.gamma;
    if (typeof t7 !== 'number')
      throw $.iae(t7);
    this.mass = invMass + t7;
    t2 = this.mass;
    if (typeof t2 !== 'number')
      return this.initVelocityConstraints$1$bailout(31, b1, b2, step, t2, t1, r1, r2, 0, 0, 0, 0, 0);
    this.mass = !(t2 === 0.0) ? 1.0 / t2 : 0.0;
  }
  if (step.get$warmStarting() === true) {
    t2 = this.impulse;
    if (typeof t2 !== 'number')
      return this.initVelocityConstraints$1$bailout(32, b1, b2, step, t1, r1, r2, t2, 0, 0, 0, 0, 0);
    t4 = step.get$dtRatio();
    if (typeof t4 !== 'number')
      return this.initVelocityConstraints$1$bailout(33, b1, b2, t1, r1, r2, t2, t4, 0, 0, 0, 0, 0);
    this.impulse = t2 * t4;
    var P = $.Vector$(0, 0);
    P.setFrom$1(t1).mulLocal$1(this.impulse);
    t6 = b1.get$linearVelocity();
    t7 = t6.get$x();
    if (typeof t7 !== 'number')
      return this.initVelocityConstraints$1$bailout(34, b1, b2, t6, t7, r1, r2, P, 0, 0, 0, 0, 0);
    var t9 = b1.get$invMass();
    if (typeof t9 !== 'number')
      return this.initVelocityConstraints$1$bailout(35, b1, b2, t6, t7, t9, r1, r2, P, 0, 0, 0, 0);
    var t11 = P.x;
    if (typeof t11 !== 'number')
      return this.initVelocityConstraints$1$bailout(36, b1, b2, t6, t7, t9, r1, r2, t11, P, 0, 0, 0);
    t6.set$x(t7 - t9 * t11);
    t6 = b1.get$linearVelocity();
    t13 = t6.get$y();
    if (typeof t13 !== 'number')
      return this.initVelocityConstraints$1$bailout(37, b1, b2, r1, r2, t6, t13, P, 0, 0, 0, 0, 0);
    t15 = b1.get$invMass();
    if (typeof t15 !== 'number')
      return this.initVelocityConstraints$1$bailout(38, b1, b2, t15, r1, r2, t6, t13, P, 0, 0, 0, 0);
    var t17 = P.y;
    if (typeof t17 !== 'number')
      return this.initVelocityConstraints$1$bailout(39, b1, b2, t15, t13, r1, r2, t6, t17, P, 0, 0, 0);
    t6.set$y(t13 - t15 * t17);
    t6 = b1.get$angularVelocity();
    if (typeof t6 !== 'number')
      return this.initVelocityConstraints$1$bailout(40, b1, b2, t6, r1, r2, P, 0, 0, 0, 0, 0, 0);
    var t20 = b1.get$invInertia();
    if (typeof t20 !== 'number')
      return this.initVelocityConstraints$1$bailout(41, b1, b2, t6, r1, t20, r2, P, 0, 0, 0, 0, 0);
    var t22 = r1.x;
    if (typeof t22 !== 'number')
      return this.initVelocityConstraints$1$bailout(42, b1, b2, P, t6, t20, r1, r2, t22, 0, 0, 0, 0);
    var t24 = P.y;
    if (typeof t24 !== 'number')
      return this.initVelocityConstraints$1$bailout(43, b1, b2, P, t24, t6, t20, r1, r2, t22, 0, 0, 0);
    t24 = t22 * t24;
    t22 = r1.y;
    if (typeof t22 !== 'number')
      return this.initVelocityConstraints$1$bailout(44, b1, b2, t22, t6, t20, r2, t24, P, 0, 0, 0, 0);
    var t27 = P.x;
    if (typeof t27 !== 'number')
      return this.initVelocityConstraints$1$bailout(45, b1, b2, t22, t27, t6, t20, r2, t24, P, 0, 0, 0);
    b1.set$angularVelocity(t6 - t20 * (t24 - t22 * t27));
    var t29 = b2.get$linearVelocity();
    var t30 = t29.get$x();
    if (typeof t30 !== 'number')
      return this.initVelocityConstraints$1$bailout(46, t30, b2, r2, P, t29, 0, 0, 0, 0, 0, 0, 0);
    var t32 = b2.get$invMass();
    if (typeof t32 !== 'number')
      return this.initVelocityConstraints$1$bailout(47, b2, t29, t30, r2, t32, P, 0, 0, 0, 0, 0, 0);
    var t34 = P.x;
    if (typeof t34 !== 'number')
      return this.initVelocityConstraints$1$bailout(48, b2, t34, t29, t30, r2, t32, P, 0, 0, 0, 0, 0);
    t29.set$x(t30 + t32 * t34);
    t29 = b2.get$linearVelocity();
    var t36 = t29.get$y();
    if (typeof t36 !== 'number')
      return this.initVelocityConstraints$1$bailout(49, t29, b2, t36, r2, P, 0, 0, 0, 0, 0, 0, 0);
    var t38 = b2.get$invMass();
    if (typeof t38 !== 'number')
      return this.initVelocityConstraints$1$bailout(50, t29, b2, t36, t38, r2, P, 0, 0, 0, 0, 0, 0);
    var t40 = P.y;
    if (typeof t40 !== 'number')
      return this.initVelocityConstraints$1$bailout(51, t29, b2, t36, t38, t40, r2, P, 0, 0, 0, 0, 0);
    t29.set$y(t36 + t38 * t40);
    t29 = b2.get$angularVelocity();
    if (typeof t29 !== 'number')
      return this.initVelocityConstraints$1$bailout(52, b2, t29, r2, P, 0, 0, 0, 0, 0, 0, 0, 0);
    var t43 = b2.get$invInertia();
    if (typeof t43 !== 'number')
      return this.initVelocityConstraints$1$bailout(53, b2, t29, t43, r2, P, 0, 0, 0, 0, 0, 0, 0);
    var t45 = r2.x;
    if (typeof t45 !== 'number')
      return this.initVelocityConstraints$1$bailout(54, b2, t45, t29, t43, r2, P, 0, 0, 0, 0, 0, 0);
    var t47 = P.y;
    if (typeof t47 !== 'number')
      return this.initVelocityConstraints$1$bailout(55, b2, t45, t47, t29, t43, r2, P, 0, 0, 0, 0, 0);
    t47 = t45 * t47;
    t45 = r2.y;
    if (typeof t45 !== 'number')
      return this.initVelocityConstraints$1$bailout(56, b2, t45, t29, t43, t47, P, 0, 0, 0, 0, 0, 0);
    var t50 = P.x;
    if (typeof t50 !== 'number')
      return this.initVelocityConstraints$1$bailout(57, b2, t45, t50, t29, t43, t47, 0, 0, 0, 0, 0, 0);
    b2.set$angularVelocity(t29 + t43 * (t47 - t45 * t50));
  } else
    this.impulse = 0.0;
},
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var step = env0;
      b2 = env1;
      b1 = env2;
      r1 = env3;
      r2 = env4;
      t1 = env5;
      break;
    case 2:
      step = env0;
      b2 = env1;
      b1 = env2;
      t3 = env3;
      r1 = env4;
      r2 = env5;
      t1 = env6;
      break;
    case 3:
      step = env0;
      b2 = env1;
      t1 = env2;
      b1 = env3;
      r1 = env4;
      r2 = env5;
      t3 = env6;
      break;
    case 4:
      step = env0;
      b2 = env1;
      b1 = env2;
      t1 = env3;
      t3 = env4;
      r1 = env5;
      r2 = env6;
      break;
    case 5:
      step = env0;
      b2 = env1;
      b1 = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      t3 = env6;
      break;
    case 6:
      step = env0;
      b2 = env1;
      b1 = env2;
      t1 = env3;
      r1 = env4;
      t8 = env5;
      r2 = env6;
      t3 = env7;
      break;
    case 7:
      step = env0;
      b2 = env1;
      t3 = env2;
      b1 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      t8 = env7;
      break;
    case 8:
      step = env0;
      b2 = env1;
      b1 = env2;
      t3 = env3;
      t1 = env4;
      r1 = env5;
      t8 = env6;
      r2 = env7;
      break;
    case 9:
      step = env0;
      b2 = env1;
      b1 = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      len = env6;
      break;
    case 10:
      step = env0;
      b2 = env1;
      b1 = env2;
      t2 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      len = env7;
      break;
    case 11:
      step = env0;
      b2 = env1;
      b1 = env2;
      t1 = env3;
      r1 = env4;
      t4 = env5;
      r2 = env6;
      len = env7;
      t5 = env8;
      break;
    case 12:
      step = env0;
      t2 = env1;
      b2 = env2;
      b1 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      len = env7;
      break;
    case 13:
      step = env0;
      t2 = env1;
      b2 = env2;
      b1 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      t4 = env7;
      len = env8;
      break;
    case 14:
      step = env0;
      t2 = env1;
      b2 = env2;
      b1 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      len = env7;
      t4 = env8;
      break;
    case 15:
      step = env0;
      t2 = env1;
      b2 = env2;
      b1 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      len = env7;
      t4 = env8;
      t7 = env9;
      break;
    case 16:
      step = env0;
      b1 = env1;
      cr1u = env2;
      t4 = env3;
      b2 = env4;
      t1 = env5;
      r1 = env6;
      r2 = env7;
      len = env8;
      break;
    case 17:
      step = env0;
      b1 = env1;
      cr1u = env2;
      t4 = env3;
      b2 = env4;
      t10 = env5;
      t1 = env6;
      r1 = env7;
      r2 = env8;
      len = env9;
      break;
    case 18:
      step = env0;
      b1 = env1;
      cr1u = env2;
      t4 = env3;
      t1 = env4;
      t10 = env5;
      r1 = env6;
      r2 = env7;
      b2 = env8;
      len = env9;
      break;
    case 19:
      step = env0;
      b1 = env1;
      cr1u = env2;
      t4 = env3;
      t1 = env4;
      t10 = env5;
      r1 = env6;
      r2 = env7;
      t13 = env8;
      b2 = env9;
      len = env10;
      break;
    case 20:
      step = env0;
      b1 = env1;
      cr1u = env2;
      b2 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      len = env7;
      cr2u = env8;
      t10 = env9;
      break;
    case 21:
      step = env0;
      b1 = env1;
      cr1u = env2;
      b2 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      len = env7;
      cr2u = env8;
      t10 = env9;
      t16 = env10;
      break;
    case 22:
      step = env0;
      b1 = env1;
      b2 = env2;
      t10 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      t18 = env7;
      len = env8;
      cr2u = env9;
      break;
    case 23:
      step = env0;
      b1 = env1;
      b2 = env2;
      t1 = env3;
      r1 = env4;
      t18 = env5;
      r2 = env6;
      t10 = env7;
      len = env8;
      cr2u = env9;
      break;
    case 24:
      step = env0;
      b1 = env1;
      b2 = env2;
      t2 = env3;
      r1 = env4;
      r2 = env5;
      invMass = env6;
      t1 = env7;
      len = env8;
      break;
    case 25:
      step = env0;
      b1 = env1;
      b2 = env2;
      t2 = env3;
      r1 = env4;
      r2 = env5;
      t3 = env6;
      invMass = env7;
      t1 = env8;
      len = env9;
      break;
    case 26:
      step = env0;
      b1 = env1;
      b2 = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      d = env6;
      invMass = env7;
      C = env8;
      k = env9;
      t6 = env10;
      break;
    case 27:
      step = env0;
      t8 = env1;
      r1 = env2;
      r2 = env3;
      invMass = env4;
      C = env5;
      b1 = env6;
      b2 = env7;
      t1 = env8;
      d = env9;
      k = env10;
      t6 = env11;
      break;
    case 28:
      b1 = env0;
      b2 = env1;
      step = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      invMass = env6;
      C = env7;
      t2 = env8;
      k = env9;
      break;
    case 29:
      b1 = env0;
      b2 = env1;
      step = env2;
      t1 = env3;
      r1 = env4;
      t2 = env5;
      r2 = env6;
      invMass = env7;
      C = env8;
      k = env9;
      break;
    case 30:
      b1 = env0;
      b2 = env1;
      t5 = env2;
      step = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      invMass = env7;
      t4 = env8;
      break;
    case 31:
      b1 = env0;
      b2 = env1;
      step = env2;
      t2 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      break;
    case 32:
      b1 = env0;
      b2 = env1;
      step = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      t2 = env6;
      break;
    case 33:
      b1 = env0;
      b2 = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      t2 = env5;
      t4 = env6;
      break;
    case 34:
      b1 = env0;
      b2 = env1;
      t6 = env2;
      t7 = env3;
      r1 = env4;
      r2 = env5;
      P = env6;
      break;
    case 35:
      b1 = env0;
      b2 = env1;
      t6 = env2;
      t7 = env3;
      t9 = env4;
      r1 = env5;
      r2 = env6;
      P = env7;
      break;
    case 36:
      b1 = env0;
      b2 = env1;
      t6 = env2;
      t7 = env3;
      t9 = env4;
      r1 = env5;
      r2 = env6;
      t11 = env7;
      P = env8;
      break;
    case 37:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      t6 = env4;
      t13 = env5;
      P = env6;
      break;
    case 38:
      b1 = env0;
      b2 = env1;
      t15 = env2;
      r1 = env3;
      r2 = env4;
      t6 = env5;
      t13 = env6;
      P = env7;
      break;
    case 39:
      b1 = env0;
      b2 = env1;
      t15 = env2;
      t13 = env3;
      r1 = env4;
      r2 = env5;
      t6 = env6;
      t17 = env7;
      P = env8;
      break;
    case 40:
      b1 = env0;
      b2 = env1;
      t6 = env2;
      r1 = env3;
      r2 = env4;
      P = env5;
      break;
    case 41:
      b1 = env0;
      b2 = env1;
      t6 = env2;
      r1 = env3;
      t20 = env4;
      r2 = env5;
      P = env6;
      break;
    case 42:
      b1 = env0;
      b2 = env1;
      P = env2;
      t6 = env3;
      t20 = env4;
      r1 = env5;
      r2 = env6;
      t22 = env7;
      break;
    case 43:
      b1 = env0;
      b2 = env1;
      P = env2;
      t24 = env3;
      t6 = env4;
      t20 = env5;
      r1 = env6;
      r2 = env7;
      t22 = env8;
      break;
    case 44:
      b1 = env0;
      b2 = env1;
      t22 = env2;
      t6 = env3;
      t20 = env4;
      r2 = env5;
      t24 = env6;
      P = env7;
      break;
    case 45:
      b1 = env0;
      b2 = env1;
      t22 = env2;
      t27 = env3;
      t6 = env4;
      t20 = env5;
      r2 = env6;
      t24 = env7;
      P = env8;
      break;
    case 46:
      t30 = env0;
      b2 = env1;
      r2 = env2;
      P = env3;
      t29 = env4;
      break;
    case 47:
      b2 = env0;
      t29 = env1;
      t30 = env2;
      r2 = env3;
      t32 = env4;
      P = env5;
      break;
    case 48:
      b2 = env0;
      t34 = env1;
      t29 = env2;
      t30 = env3;
      r2 = env4;
      t32 = env5;
      P = env6;
      break;
    case 49:
      t29 = env0;
      b2 = env1;
      t36 = env2;
      r2 = env3;
      P = env4;
      break;
    case 50:
      t29 = env0;
      b2 = env1;
      t36 = env2;
      t38 = env3;
      r2 = env4;
      P = env5;
      break;
    case 51:
      t29 = env0;
      b2 = env1;
      t36 = env2;
      t38 = env3;
      t40 = env4;
      r2 = env5;
      P = env6;
      break;
    case 52:
      b2 = env0;
      t29 = env1;
      r2 = env2;
      P = env3;
      break;
    case 53:
      b2 = env0;
      t29 = env1;
      t43 = env2;
      r2 = env3;
      P = env4;
      break;
    case 54:
      b2 = env0;
      t45 = env1;
      t29 = env2;
      t43 = env3;
      r2 = env4;
      P = env5;
      break;
    case 55:
      b2 = env0;
      t45 = env1;
      t47 = env2;
      t29 = env3;
      t43 = env4;
      r2 = env5;
      P = env6;
      break;
    case 56:
      b2 = env0;
      t45 = env1;
      t29 = env2;
      t43 = env3;
      t47 = env4;
      P = env5;
      break;
    case 57:
      b2 = env0;
      t45 = env1;
      t50 = env2;
      t29 = env3;
      t43 = env4;
      t47 = env5;
      break;
  }
  switch (state) {
    case 0:
      var b1 = this.bodyA;
      var b2 = this.bodyB;
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      var t1 = b2.get$sweep().get$center().get$x();
    case 1:
      state = 0;
      var t3 = r2.x;
    case 2:
      state = 0;
      t3 = $.add(t1, t3);
      t1 = b1.get$sweep().get$center().get$x();
    case 3:
      state = 0;
      t1 = $.sub(t3, t1);
      t3 = r1.x;
    case 4:
      state = 0;
      t3 = $.sub(t1, t3);
      t1 = this.u;
      t1.set$x(t3);
      t3 = b2.get$sweep().get$center().get$y();
    case 5:
      state = 0;
      var t8 = r2.y;
    case 6:
      state = 0;
      t8 = $.add(t3, t8);
      t3 = b1.get$sweep().get$center().get$y();
    case 7:
      state = 0;
      t3 = $.sub(t8, t3);
      t8 = r1.y;
    case 8:
      state = 0;
      t1.set$y($.sub(t3, t8));
      var len = $.get$length(t1);
    case 9:
      state = 0;
    default:
      if (state === 11 || state === 10 || state === 0 && $.gtB(len, 0.005))
        switch (state) {
          case 0:
            var t2 = t1.get$x();
          case 10:
            state = 0;
            if (typeof len !== 'number')
              throw $.iae(len);
            var t4 = 1.0 / len;
            t1.set$x($.mul(t2, t4));
            var t5 = t1.get$y();
          case 11:
            state = 0;
            t1.set$y($.mul(t5, t4));
        }
      else
        t1.setCoords$2(0.0, 0.0);
      t2 = r1.x;
    case 12:
      state = 0;
      t4 = t1.get$y();
    case 13:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = r1.y;
    case 14:
      state = 0;
      var t7 = t1.get$x();
    case 15:
      state = 0;
      var cr1u = $.sub(t4, $.mul(t2, t7));
      t4 = r2.x;
    case 16:
      state = 0;
      var t10 = t1.get$y();
    case 17:
      state = 0;
      t10 = $.mul(t4, t10);
      t4 = r2.y;
    case 18:
      state = 0;
      var t13 = t1.get$x();
    case 19:
      state = 0;
      var cr2u = $.sub(t10, $.mul(t4, t13));
      t10 = b1.get$invMass();
    case 20:
      state = 0;
      var t16 = b1.get$invInertia();
    case 21:
      state = 0;
      t10 = $.add(t10, $.mul($.mul(t16, cr1u), cr1u));
      var t18 = b2.get$invMass();
    case 22:
      state = 0;
      t18 = $.add(t10, t18);
      t10 = b2.get$invInertia();
    case 23:
      state = 0;
      var invMass = $.add(t18, $.mul($.mul(t10, cr2u), cr2u));
      if (typeof invMass !== 'number')
        throw $.iae(invMass);
      this.mass = 1.0 / invMass;
      t2 = this.frequencyHz;
    case 24:
      state = 0;
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
      if (state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 0 && $.gtB(t2, 0.0))
        switch (state) {
          case 0:
            t3 = $.get$length(this);
          case 25:
            state = 0;
            var C = $.sub(len, t3);
            if (typeof t2 !== 'number')
              throw $.iae(t2);
            var omega = 6.283185307179586 * t2;
            t2 = this.mass;
            if (typeof t2 !== 'number')
              throw $.iae(t2);
            t3 = 2.0 * t2;
            t5 = this.dampingRatio;
            if (typeof t5 !== 'number')
              throw $.iae(t5);
            var d = t3 * t5 * omega;
            var k = t2 * omega * omega;
            var t6 = step.get$dt();
          case 26:
            state = 0;
            t8 = step.get$dt();
          case 27:
            state = 0;
            t8 = $.mul(t8, k);
            if (typeof t8 !== 'number')
              throw $.iae(t8);
            this.gamma = $.mul(t6, d + t8);
            t2 = this.gamma;
          case 28:
            state = 0;
            if (!$.eqB(t2, 0.0)) {
              t2 = this.gamma;
              if (typeof t2 !== 'number')
                throw $.iae(t2);
              t2 = 1.0 / t2;
            } else
              t2 = 0.0;
            this.gamma = t2;
            t2 = step.get$dt();
          case 29:
            state = 0;
            t4 = $.mul($.mul(C, t2), k);
            t5 = this.gamma;
          case 30:
            state = 0;
            this.bias = $.mul(t4, t5);
            t7 = this.gamma;
            if (typeof t7 !== 'number')
              throw $.iae(t7);
            this.mass = invMass + t7;
            t2 = this.mass;
          case 31:
            state = 0;
            if (!$.eqB(t2, 0.0)) {
              t2 = this.mass;
              if (typeof t2 !== 'number')
                throw $.iae(t2);
              t2 = 1.0 / t2;
            } else
              t2 = 0.0;
            this.mass = t2;
        }
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      if (state === 57 || state === 56 || state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 49 || state === 48 || state === 47 || state === 46 || state === 45 || state === 44 || state === 43 || state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 0 && step.get$warmStarting() === true)
        switch (state) {
          case 0:
            t2 = this.impulse;
          case 32:
            state = 0;
            t4 = step.get$dtRatio();
          case 33:
            state = 0;
            this.impulse = $.mul(t2, t4);
            var P = $.Vector$(0, 0);
            P.setFrom$1(t1).mulLocal$1(this.impulse);
            t6 = b1.get$linearVelocity();
            t7 = t6.get$x();
          case 34:
            state = 0;
            var t9 = b1.get$invMass();
          case 35:
            state = 0;
            var t11 = P.x;
          case 36:
            state = 0;
            t6.set$x($.sub(t7, $.mul(t9, t11)));
            t6 = b1.get$linearVelocity();
            t13 = t6.get$y();
          case 37:
            state = 0;
            var t15 = b1.get$invMass();
          case 38:
            state = 0;
            var t17 = P.y;
          case 39:
            state = 0;
            t6.set$y($.sub(t13, $.mul(t15, t17)));
            t6 = b1.get$angularVelocity();
          case 40:
            state = 0;
            var t20 = b1.get$invInertia();
          case 41:
            state = 0;
            var t22 = r1.x;
          case 42:
            state = 0;
            var t24 = P.y;
          case 43:
            state = 0;
            t24 = $.mul(t22, t24);
            t22 = r1.y;
          case 44:
            state = 0;
            var t27 = P.x;
          case 45:
            state = 0;
            b1.set$angularVelocity($.sub(t6, $.mul(t20, $.sub(t24, $.mul(t22, t27)))));
            var t29 = b2.get$linearVelocity();
            var t30 = t29.get$x();
          case 46:
            state = 0;
            var t32 = b2.get$invMass();
          case 47:
            state = 0;
            var t34 = P.x;
          case 48:
            state = 0;
            t29.set$x($.add(t30, $.mul(t32, t34)));
            t29 = b2.get$linearVelocity();
            var t36 = t29.get$y();
          case 49:
            state = 0;
            var t38 = b2.get$invMass();
          case 50:
            state = 0;
            var t40 = P.y;
          case 51:
            state = 0;
            t29.set$y($.add(t36, $.mul(t38, t40)));
            t29 = b2.get$angularVelocity();
          case 52:
            state = 0;
            var t43 = b2.get$invInertia();
          case 53:
            state = 0;
            var t45 = r2.x;
          case 54:
            state = 0;
            var t47 = P.y;
          case 55:
            state = 0;
            t47 = $.mul(t45, t47);
            t45 = r2.y;
          case 56:
            state = 0;
            var t50 = P.x;
          case 57:
            state = 0;
            b2.set$angularVelocity($.add(t29, $.mul(t43, $.sub(t47, $.mul(t45, t50)))));
        }
      else
        this.impulse = 0.0;
  }
},
 solveVelocityConstraints$1: function(step) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  var v1 = $.Vector$(0, 0);
  var v2 = $.Vector$(0, 0);
  $.Vector_crossNumAndVectorToOut(b1.get$angularVelocity(), r1, v1);
  $.Vector_crossNumAndVectorToOut(b2.get$angularVelocity(), r2, v2);
  v1.addLocal$1(b1.get$linearVelocity());
  v2.addLocal$1(b2.get$linearVelocity());
  var t1 = this.u;
  var t2 = v2.subLocal$1(v1);
  var Cdot = $.add($.mul(t1.get$x(), t2.get$x()), $.mul(t1.get$y(), t2.get$y()));
  var imp = $.mul($.neg(this.mass), $.add($.add(Cdot, this.bias), $.mul(this.gamma, this.impulse)));
  this.impulse = $.add(this.impulse, imp);
  var Px = $.mul(imp, t1.get$x());
  var Py = $.mul(imp, t1.get$y());
  var t3 = b1.get$linearVelocity();
  t3.set$x($.sub(t3.get$x(), $.mul(b1.get$invMass(), Px)));
  t3 = b1.get$linearVelocity();
  t3.set$y($.sub(t3.get$y(), $.mul(b1.get$invMass(), Py)));
  b1.set$angularVelocity($.sub(b1.get$angularVelocity(), $.mul(b1.get$invInertia(), $.sub($.mul(r1.x, Py), $.mul(r1.y, Px)))));
  t3 = b2.get$linearVelocity();
  t3.set$x($.add(t3.get$x(), $.mul(b2.get$invMass(), Px)));
  t3 = b2.get$linearVelocity();
  t3.set$y($.add(t3.get$y(), $.mul(b2.get$invMass(), Py)));
  b2.set$angularVelocity($.add(b2.get$angularVelocity(), $.mul(b2.get$invInertia(), $.sub($.mul(r2.x, Py), $.mul(r2.y, Px)))));
},
 solvePositionConstraints$1: function(baumgarte) {
  var t1 = this.frequencyHz;
  if (typeof t1 !== 'number')
    return this.solvePositionConstraints$1$bailout(1, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (t1 > 0.0)
    return true;
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  var d = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  t1 = b2.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number')
    return this.solvePositionConstraints$1$bailout(2, b1, b2, r1, r2, d, t1, 0, 0, 0, 0, 0);
  var t3 = r2.x;
  if (typeof t3 !== 'number')
    return this.solvePositionConstraints$1$bailout(3, b1, b2, r1, r2, t3, d, t1, 0, 0, 0, 0);
  t3 = t1 + t3;
  t1 = b1.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number')
    return this.solvePositionConstraints$1$bailout(4, b1, b2, r1, r2, d, t3, t1, 0, 0, 0, 0);
  t1 = t3 - t1;
  t3 = r1.x;
  if (typeof t3 !== 'number')
    return this.solvePositionConstraints$1$bailout(5, b1, b2, r1, r2, d, t1, t3, 0, 0, 0, 0);
  d.x = t1 - t3;
  var t7 = b2.get$sweep().get$center().get$y();
  if (typeof t7 !== 'number')
    return this.solvePositionConstraints$1$bailout(6, b1, b2, r1, r2, d, t7, 0, 0, 0, 0, 0);
  var t9 = r2.y;
  if (typeof t9 !== 'number')
    return this.solvePositionConstraints$1$bailout(7, b1, b2, r1, r2, d, t7, t9, 0, 0, 0, 0);
  t9 = t7 + t9;
  t7 = b1.get$sweep().get$center().get$y();
  if (typeof t7 !== 'number')
    return this.solvePositionConstraints$1$bailout(8, b1, b2, r1, r2, d, t9, t7, 0, 0, 0, 0);
  t7 = t9 - t7;
  t9 = r1.y;
  if (typeof t9 !== 'number')
    return this.solvePositionConstraints$1$bailout(9, b1, b2, r1, r2, d, t9, t7, 0, 0, 0, 0);
  d.y = t7 - t9;
  var len = d.normalize$0();
  if (typeof len !== 'number')
    return this.solvePositionConstraints$1$bailout(10, b1, b2, r1, r2, len, d, 0, 0, 0, 0, 0);
  var t14 = $.get$length(this);
  if (typeof t14 !== 'number')
    return this.solvePositionConstraints$1$bailout(11, b1, b2, r1, r2, len, d, t14, 0, 0, 0, 0);
  var C = $.max(-0.2, $.min(len - t14, 0.2));
  var t16 = this.mass;
  if (typeof t16 !== 'number')
    return this.solvePositionConstraints$1$bailout(12, b1, C, b2, r2, r1, d, t16, 0, 0, 0, 0);
  var imp = -t16 * C;
  var t18 = this.u;
  t18.setFrom$1(d);
  var t19 = t18.x;
  if (typeof t19 !== 'number')
    return this.solvePositionConstraints$1$bailout(13, b1, C, b2, r2, r1, imp, t19, t18, 0, 0, 0);
  var Px = imp * t19;
  t18 = t18.y;
  if (typeof t18 !== 'number')
    return this.solvePositionConstraints$1$bailout(14, b1, C, b2, r2, r1, imp, Px, t18, 0, 0, 0);
  var Py = imp * t18;
  t18 = b1.get$sweep().get$center();
  var t21 = t18.get$x();
  if (typeof t21 !== 'number')
    return this.solvePositionConstraints$1$bailout(15, Py, b1, t18, t21, C, r2, b2, r1, Px, 0, 0);
  var t23 = b1.get$invMass();
  if (typeof t23 !== 'number')
    return this.solvePositionConstraints$1$bailout(16, Py, b1, t18, t21, t23, r2, C, b2, Px, r1, 0);
  t18.set$x(t21 - t23 * Px);
  t18 = b1.get$sweep().get$center();
  var t25 = t18.get$y();
  if (typeof t25 !== 'number')
    return this.solvePositionConstraints$1$bailout(17, Py, b1, C, r2, b2, r1, t18, t25, Px, 0, 0);
  var t27 = b1.get$invMass();
  if (typeof t27 !== 'number')
    return this.solvePositionConstraints$1$bailout(18, Py, b1, C, r2, b2, r1, t18, t25, t27, Px, 0);
  t18.set$y(t25 - t27 * Py);
  t18 = b1.get$sweep();
  var t29 = t18.get$angle();
  if (typeof t29 !== 'number')
    return this.solvePositionConstraints$1$bailout(19, Py, b1, C, r2, b2, t29, t18, r1, Px, 0, 0);
  var t31 = b1.get$invInertia();
  if (typeof t31 !== 'number')
    return this.solvePositionConstraints$1$bailout(20, Py, b1, C, r2, b2, t29, t18, r1, t31, Px, 0);
  var t33 = r1.x;
  if (typeof t33 !== 'number')
    return this.solvePositionConstraints$1$bailout(21, Py, b1, C, r2, b2, t29, t18, r1, t31, Px, t33);
  t33 *= Py;
  var t35 = r1.y;
  if (typeof t35 !== 'number')
    return this.solvePositionConstraints$1$bailout(22, Py, b1, C, r2, b2, t29, t18, t31, t33, Px, t35);
  t18.set$angle(t29 - t31 * (t33 - t35 * Px));
  t18 = b2.get$sweep().get$center();
  var t37 = t18.get$x();
  if (typeof t37 !== 'number')
    return this.solvePositionConstraints$1$bailout(23, b1, C, b2, r2, t18, t37, Py, Px, 0, 0, 0);
  var t39 = b2.get$invMass();
  if (typeof t39 !== 'number')
    return this.solvePositionConstraints$1$bailout(24, b1, C, b2, r2, t18, t37, Py, t39, Px, 0, 0);
  t18.set$x(t37 + t39 * Px);
  t18 = b2.get$sweep().get$center();
  var t41 = t18.get$y();
  if (typeof t41 !== 'number')
    return this.solvePositionConstraints$1$bailout(25, b1, C, b2, r2, Py, Px, t18, t41, 0, 0, 0);
  var t43 = b2.get$invMass();
  if (typeof t43 !== 'number')
    return this.solvePositionConstraints$1$bailout(26, b1, C, b2, r2, Py, Px, t18, t41, t43, 0, 0);
  t18.set$y(t41 + t43 * Py);
  t18 = b2.get$sweep();
  var t45 = t18.get$angle();
  if (typeof t45 !== 'number')
    return this.solvePositionConstraints$1$bailout(27, b1, C, b2, r2, t18, t45, Py, Px, 0, 0, 0);
  var t47 = b2.get$invInertia();
  if (typeof t47 !== 'number')
    return this.solvePositionConstraints$1$bailout(28, b1, C, b2, r2, t18, t45, t47, Py, Px, 0, 0);
  var t49 = r2.x;
  if (typeof t49 !== 'number')
    return this.solvePositionConstraints$1$bailout(29, b1, C, b2, r2, t18, t45, t47, t49, Px, Py, 0);
  t49 *= Py;
  var t51 = r2.y;
  if (typeof t51 !== 'number')
    return this.solvePositionConstraints$1$bailout(30, b1, C, b2, t51, t18, t45, t47, t49, Px, 0, 0);
  t18.set$angle(t45 + t47 * (t49 - t51 * Px));
  b1.synchronizeTransform$0();
  b2.synchronizeTransform$0();
  t18 = $.abs(C);
  if (typeof t18 !== 'number')
    return this.solvePositionConstraints$1$bailout(31, t18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  return t18 < 0.005;
},
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      d = env4;
      t1 = env5;
      break;
    case 3:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      t3 = env4;
      d = env5;
      t1 = env6;
      break;
    case 4:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      d = env4;
      t3 = env5;
      t1 = env6;
      break;
    case 5:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      d = env4;
      t1 = env5;
      t3 = env6;
      break;
    case 6:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      d = env4;
      t7 = env5;
      break;
    case 7:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      d = env4;
      t7 = env5;
      t9 = env6;
      break;
    case 8:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      d = env4;
      t9 = env5;
      t7 = env6;
      break;
    case 9:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      d = env4;
      t9 = env5;
      t7 = env6;
      break;
    case 10:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      len = env4;
      d = env5;
      break;
    case 11:
      b1 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      len = env4;
      d = env5;
      t14 = env6;
      break;
    case 12:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      r1 = env4;
      d = env5;
      t16 = env6;
      break;
    case 13:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      r1 = env4;
      imp = env5;
      t19 = env6;
      t18 = env7;
      break;
    case 14:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      r1 = env4;
      imp = env5;
      Px = env6;
      t18 = env7;
      break;
    case 15:
      Py = env0;
      b1 = env1;
      t18 = env2;
      t21 = env3;
      C = env4;
      r2 = env5;
      b2 = env6;
      r1 = env7;
      Px = env8;
      break;
    case 16:
      Py = env0;
      b1 = env1;
      t18 = env2;
      t21 = env3;
      t23 = env4;
      r2 = env5;
      C = env6;
      b2 = env7;
      Px = env8;
      r1 = env9;
      break;
    case 17:
      Py = env0;
      b1 = env1;
      C = env2;
      r2 = env3;
      b2 = env4;
      r1 = env5;
      t18 = env6;
      t25 = env7;
      Px = env8;
      break;
    case 18:
      Py = env0;
      b1 = env1;
      C = env2;
      r2 = env3;
      b2 = env4;
      r1 = env5;
      t18 = env6;
      t25 = env7;
      t27 = env8;
      Px = env9;
      break;
    case 19:
      Py = env0;
      b1 = env1;
      C = env2;
      r2 = env3;
      b2 = env4;
      t29 = env5;
      t18 = env6;
      r1 = env7;
      Px = env8;
      break;
    case 20:
      Py = env0;
      b1 = env1;
      C = env2;
      r2 = env3;
      b2 = env4;
      t29 = env5;
      t18 = env6;
      r1 = env7;
      t31 = env8;
      Px = env9;
      break;
    case 21:
      Py = env0;
      b1 = env1;
      C = env2;
      r2 = env3;
      b2 = env4;
      t29 = env5;
      t18 = env6;
      r1 = env7;
      t31 = env8;
      Px = env9;
      t33 = env10;
      break;
    case 22:
      Py = env0;
      b1 = env1;
      C = env2;
      r2 = env3;
      b2 = env4;
      t29 = env5;
      t18 = env6;
      t31 = env7;
      t33 = env8;
      Px = env9;
      t35 = env10;
      break;
    case 23:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      t18 = env4;
      t37 = env5;
      Py = env6;
      Px = env7;
      break;
    case 24:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      t18 = env4;
      t37 = env5;
      Py = env6;
      t39 = env7;
      Px = env8;
      break;
    case 25:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      Py = env4;
      Px = env5;
      t18 = env6;
      t41 = env7;
      break;
    case 26:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      Py = env4;
      Px = env5;
      t18 = env6;
      t41 = env7;
      t43 = env8;
      break;
    case 27:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      t18 = env4;
      t45 = env5;
      Py = env6;
      Px = env7;
      break;
    case 28:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      t18 = env4;
      t45 = env5;
      t47 = env6;
      Py = env7;
      Px = env8;
      break;
    case 29:
      b1 = env0;
      C = env1;
      b2 = env2;
      r2 = env3;
      t18 = env4;
      t45 = env5;
      t47 = env6;
      t49 = env7;
      Px = env8;
      Py = env9;
      break;
    case 30:
      b1 = env0;
      C = env1;
      b2 = env2;
      t51 = env3;
      t18 = env4;
      t45 = env5;
      t47 = env6;
      t49 = env7;
      Px = env8;
      break;
    case 31:
      t18 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.frequencyHz;
    case 1:
      state = 0;
      if ($.gtB(t1, 0.0))
        return true;
      var b1 = this.bodyA;
      var b2 = this.bodyB;
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      var d = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      t1 = b2.get$sweep().get$center().get$x();
    case 2:
      state = 0;
      var t3 = r2.x;
    case 3:
      state = 0;
      t3 = $.add(t1, t3);
      t1 = b1.get$sweep().get$center().get$x();
    case 4:
      state = 0;
      t1 = $.sub(t3, t1);
      t3 = r1.x;
    case 5:
      state = 0;
      d.x = $.sub(t1, t3);
      var t7 = b2.get$sweep().get$center().get$y();
    case 6:
      state = 0;
      var t9 = r2.y;
    case 7:
      state = 0;
      t9 = $.add(t7, t9);
      t7 = b1.get$sweep().get$center().get$y();
    case 8:
      state = 0;
      t7 = $.sub(t9, t7);
      t9 = r1.y;
    case 9:
      state = 0;
      d.y = $.sub(t7, t9);
      var len = d.normalize$0();
    case 10:
      state = 0;
      var t14 = $.get$length(this);
    case 11:
      state = 0;
      var C = $.max(-0.2, $.min($.sub(len, t14), 0.2));
      var t16 = this.mass;
    case 12:
      state = 0;
      var imp = $.mul($.neg(t16), C);
      var t18 = this.u;
      t18.setFrom$1(d);
      var t19 = t18.get$x();
    case 13:
      state = 0;
      var Px = $.mul(imp, t19);
      t18 = t18.get$y();
    case 14:
      state = 0;
      var Py = $.mul(imp, t18);
      t18 = b1.get$sweep().get$center();
      var t21 = t18.get$x();
    case 15:
      state = 0;
      var t23 = b1.get$invMass();
    case 16:
      state = 0;
      t18.set$x($.sub(t21, $.mul(t23, Px)));
      t18 = b1.get$sweep().get$center();
      var t25 = t18.get$y();
    case 17:
      state = 0;
      var t27 = b1.get$invMass();
    case 18:
      state = 0;
      t18.set$y($.sub(t25, $.mul(t27, Py)));
      t18 = b1.get$sweep();
      var t29 = t18.get$angle();
    case 19:
      state = 0;
      var t31 = b1.get$invInertia();
    case 20:
      state = 0;
      var t33 = r1.x;
    case 21:
      state = 0;
      t33 = $.mul(t33, Py);
      var t35 = r1.y;
    case 22:
      state = 0;
      t18.set$angle($.sub(t29, $.mul(t31, $.sub(t33, $.mul(t35, Px)))));
      t18 = b2.get$sweep().get$center();
      var t37 = t18.get$x();
    case 23:
      state = 0;
      var t39 = b2.get$invMass();
    case 24:
      state = 0;
      t18.set$x($.add(t37, $.mul(t39, Px)));
      t18 = b2.get$sweep().get$center();
      var t41 = t18.get$y();
    case 25:
      state = 0;
      var t43 = b2.get$invMass();
    case 26:
      state = 0;
      t18.set$y($.add(t41, $.mul(t43, Py)));
      t18 = b2.get$sweep();
      var t45 = t18.get$angle();
    case 27:
      state = 0;
      var t47 = b2.get$invInertia();
    case 28:
      state = 0;
      var t49 = r2.x;
    case 29:
      state = 0;
      t49 = $.mul(t49, Py);
      var t51 = r2.y;
    case 30:
      state = 0;
      t18.set$angle($.add(t45, $.mul(t47, $.sub(t49, $.mul(t51, Px)))));
      b1.synchronizeTransform$0();
      b2.synchronizeTransform$0();
      t18 = $.abs(C);
    case 31:
      state = 0;
      return $.lt(t18, 0.005);
  }
}
};

$$.DistanceJointDef = {"":
 ["localAnchorA?", "localAnchorB?", "length=", "frequencyHz?", "dampingRatio?", "type", "userData", "bodyA", "bodyB", "collideConnected"],
 "super": "JointDef",
 initialize$4: function(b1, b2, anchor1, anchor2) {
  this.bodyA = b1;
  this.bodyB = b2;
  this.localAnchorA.setFrom$1(this.bodyA.getLocalPoint$1(anchor1));
  this.localAnchorB.setFrom$1(this.bodyB.getLocalPoint$1(anchor2));
  var d = $.Vector$copy(anchor2);
  d.subLocal$1(anchor1);
  $.set$length(this, $.get$length(d));
},
 DistanceJointDef$0: function() {
  this.type = 3;
}
};

$$.FrictionJoint = {"":
 ["_localAnchorA", "_localAnchorB", "_linearImpulse", "_angularImpulse", "_maxForce", "_maxTorque", "type", "_prev", "_lib_next", "edgeA", "edgeB", "bodyA", "bodyB", "islandFlag", "collideConnected", "userData", "localCenterA", "localCenterB", "invMassA", "invIA", "invMassB", "invIB"],
 "super": "Joint",
 get$maxForce: function() {
  return this._maxForce;
},
 get$maxTorque: function() {
  return this._maxTorque;
},
 initVelocityConstraints$1: function(step) {
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this._localAnchorA).subLocal$1(this.bodyA.get$localCenter());
  r2.setFrom$1(this._localAnchorB).subLocal$1(this.bodyB.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(this.bodyA.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(this.bodyB.get$originTransform().get$rotation(), r2, r2);
  var K = $.Matrix22$(null, null);
  var t1 = this.bodyA.get$invMass();
  if (typeof t1 !== 'number')
    return this.initVelocityConstraints$1$bailout(1, step, t1, r1, K, r2, 0, 0, 0);
  var t3 = this.bodyB.get$invMass();
  if (typeof t3 !== 'number')
    return this.initVelocityConstraints$1$bailout(2, step, t1, t3, r1, r2, K, 0, 0);
  t3 = t1 + t3;
  t1 = this.bodyA.get$invInertia();
  if (typeof t1 !== 'number')
    return this.initVelocityConstraints$1$bailout(3, step, t3, r1, t1, r2, K, 0, 0);
  var t6 = r1.y;
  if (typeof t6 !== 'number')
    return this.initVelocityConstraints$1$bailout(4, step, t3, r1, t1, r2, K, t6, 0);
  t1 *= t6;
  t3 += t1 * t6;
  var t8 = this.bodyB.get$invInertia();
  if (typeof t8 !== 'number')
    return this.initVelocityConstraints$1$bailout(6, step, t8, r1, r2, K, t3, 0, 0);
  var t10 = r2.y;
  if (typeof t10 !== 'number')
    return this.initVelocityConstraints$1$bailout(7, step, t8, t10, r1, r2, K, t3, 0);
  t8 *= t10;
  t3 += t8 * t10;
  var t12 = K.col1;
  t12.set$x(t3);
  t3 = this.bodyA.get$invInertia();
  if (typeof t3 !== 'number')
    return this.initVelocityConstraints$1$bailout(9, step, t12, r1, r2, t3, K, 0, 0);
  t3 = -t3;
  var t14 = r1.x;
  if (typeof t14 !== 'number')
    return this.initVelocityConstraints$1$bailout(10, step, t12, r1, t14, r2, K, t3, 0);
  t14 = t3 * t14;
  t3 = r1.y;
  if (typeof t3 !== 'number')
    return this.initVelocityConstraints$1$bailout(11, step, t14, t12, r1, r2, t3, K, 0);
  t3 = t14 * t3;
  t14 = this.bodyB.get$invInertia();
  if (typeof t14 !== 'number')
    return this.initVelocityConstraints$1$bailout(12, step, t12, r1, t14, r2, t3, K, 0);
  var t18 = r2.x;
  if (typeof t18 !== 'number')
    return this.initVelocityConstraints$1$bailout(13, step, t12, r1, t14, r2, t18, t3, K);
  t18 = t14 * t18;
  t14 = r2.y;
  if (typeof t14 !== 'number')
    return this.initVelocityConstraints$1$bailout(14, step, t12, r1, r2, t18, t3, t14, K);
  t12.set$y(t3 - t18 * t14);
  t12 = t12.get$y();
  var t21 = K.col2;
  t21.set$x(t12);
  t12 = this.bodyA.get$invMass();
  if (typeof t12 !== 'number')
    return this.initVelocityConstraints$1$bailout(15, step, r1, t12, r2, t21, K, 0, 0);
  var t23 = this.bodyB.get$invMass();
  if (typeof t23 !== 'number')
    return this.initVelocityConstraints$1$bailout(16, step, r1, t12, r2, t23, t21, K, 0);
  t23 = t12 + t23;
  t12 = this.bodyA.get$invInertia();
  if (typeof t12 !== 'number')
    return this.initVelocityConstraints$1$bailout(17, step, r1, r2, t23, t12, t21, K, 0);
  var t26 = r1.x;
  if (typeof t26 !== 'number')
    return this.initVelocityConstraints$1$bailout(18, step, t26, r1, r2, t23, t12, t21, K);
  t12 *= t26;
  t23 += t12 * t26;
  var t28 = this.bodyB.get$invInertia();
  if (typeof t28 !== 'number')
    return this.initVelocityConstraints$1$bailout(20, step, t23, r1, t28, r2, t21, K, 0);
  var t30 = r2.x;
  if (typeof t30 !== 'number')
    return this.initVelocityConstraints$1$bailout(21, step, t23, r1, t28, r2, t30, t21, K);
  t28 *= t30;
  t21.set$y(t23 + t28 * t30);
  var linearMass = $.Matrix22$(null, null);
  linearMass.setFrom$1(K);
  linearMass.invertLocal$0();
  t21 = this.bodyA.get$invInertia();
  if (typeof t21 !== 'number')
    return this.initVelocityConstraints$1$bailout(23, step, r1, t21, r2, 0, 0, 0, 0);
  var t33 = this.bodyB.get$invInertia();
  if (typeof t33 !== 'number')
    return this.initVelocityConstraints$1$bailout(24, step, t33, r1, t21, r2, 0, 0, 0);
  if (t21 + t33 > 0.0)
    ;
  t1 = step.get$warmStarting() === true;
  var t2 = this._linearImpulse;
  if (t1) {
    t2.mulLocal$1(step.get$dtRatio());
    t1 = this._angularImpulse;
    if (typeof t1 !== 'number')
      return this.initVelocityConstraints$1$bailout(25, step, t2, t1, r1, r2, 0, 0, 0);
    var t4 = step.get$dtRatio();
    if (typeof t4 !== 'number')
      return this.initVelocityConstraints$1$bailout(26, t4, t2, t1, r1, r2, 0, 0, 0);
    this._angularImpulse = t1 * t4;
    var P = $.Vector$(0, 0);
    P.setFrom$1(t2);
    t2 = this.bodyA.get$linearVelocity();
    t6 = t2.get$x();
    if (typeof t6 !== 'number')
      return this.initVelocityConstraints$1$bailout(27, t2, t6, P, r1, r2, 0, 0, 0);
    t8 = this.bodyA.get$invMass();
    if (typeof t8 !== 'number')
      return this.initVelocityConstraints$1$bailout(28, P, r1, r2, t2, t6, t8, 0, 0);
    t10 = P.x;
    if (typeof t10 !== 'number')
      return this.initVelocityConstraints$1$bailout(29, t10, P, r1, r2, t2, t6, t8, 0);
    t2.set$x(t6 - t8 * t10);
    t2 = this.bodyA.get$linearVelocity();
    t12 = t2.get$y();
    if (typeof t12 !== 'number')
      return this.initVelocityConstraints$1$bailout(30, t2, P, t12, r1, r2, 0, 0, 0);
    t14 = this.bodyA.get$invMass();
    if (typeof t14 !== 'number')
      return this.initVelocityConstraints$1$bailout(31, t2, P, t12, r1, r2, t14, 0, 0);
    var t16 = P.y;
    if (typeof t16 !== 'number')
      return this.initVelocityConstraints$1$bailout(32, t2, P, t12, r1, r2, t14, t16, 0);
    t2.set$y(t12 - t14 * t16);
    t2 = this.bodyA;
    t18 = t2.get$angularVelocity();
    if (typeof t18 !== 'number')
      return this.initVelocityConstraints$1$bailout(33, t18, P, t2, r1, r2, 0, 0, 0);
    var t20 = this.bodyA.get$invInertia();
    if (typeof t20 !== 'number')
      return this.initVelocityConstraints$1$bailout(34, t20, P, t2, r1, r2, t18, 0, 0);
    var t22 = r1.x;
    if (typeof t22 !== 'number')
      return this.initVelocityConstraints$1$bailout(35, t20, P, t2, r1, r2, t22, t18, 0);
    var t24 = P.y;
    if (typeof t24 !== 'number')
      return this.initVelocityConstraints$1$bailout(36, t20, P, t2, r1, r2, t24, t22, t18);
    t24 = t22 * t24;
    t22 = r1.y;
    if (typeof t22 !== 'number')
      return this.initVelocityConstraints$1$bailout(37, t20, P, t2, r2, t22, t24, t18, 0);
    var t27 = P.x;
    if (typeof t27 !== 'number')
      return this.initVelocityConstraints$1$bailout(38, t20, P, t2, r2, t22, t27, t24, t18);
    t24 -= t22 * t27;
    var t29 = this._angularImpulse;
    if (typeof t29 !== 'number')
      return this.initVelocityConstraints$1$bailout(39, t20, P, t2, r2, t24, t29, t18, 0);
    t2.set$angularVelocity(t18 - t20 * (t24 + t29));
    t2 = this.bodyB.get$linearVelocity();
    var t31 = t2.get$x();
    if (typeof t31 !== 'number')
      return this.initVelocityConstraints$1$bailout(40, P, t2, t31, r2, 0, 0, 0, 0);
    t33 = this.bodyB.get$invMass();
    if (typeof t33 !== 'number')
      return this.initVelocityConstraints$1$bailout(41, t33, P, t2, t31, r2, 0, 0, 0);
    var t35 = P.x;
    if (typeof t35 !== 'number')
      return this.initVelocityConstraints$1$bailout(42, P, t2, t31, t33, r2, t35, 0, 0);
    t2.set$x(t31 + t33 * t35);
    t2 = this.bodyB.get$linearVelocity();
    var t37 = t2.get$y();
    if (typeof t37 !== 'number')
      return this.initVelocityConstraints$1$bailout(43, t37, t2, P, r2, 0, 0, 0, 0);
    var t39 = this.bodyB.get$invMass();
    if (typeof t39 !== 'number')
      return this.initVelocityConstraints$1$bailout(44, t37, t39, P, t2, r2, 0, 0, 0);
    var t41 = P.y;
    if (typeof t41 !== 'number')
      return this.initVelocityConstraints$1$bailout(45, t37, t41, t39, P, r2, t2, 0, 0);
    t2.set$y(t37 + t39 * t41);
    t2 = this.bodyB;
    var t43 = t2.get$angularVelocity();
    if (typeof t43 !== 'number')
      return this.initVelocityConstraints$1$bailout(46, t2, t43, P, r2, 0, 0, 0, 0);
    var t45 = this.bodyB.get$invInertia();
    if (typeof t45 !== 'number')
      return this.initVelocityConstraints$1$bailout(47, t2, t43, P, t45, r2, 0, 0, 0);
    var t47 = r2.x;
    if (typeof t47 !== 'number')
      return this.initVelocityConstraints$1$bailout(48, t2, t47, P, r2, t43, t45, 0, 0);
    var t49 = P.y;
    if (typeof t49 !== 'number')
      return this.initVelocityConstraints$1$bailout(49, t2, t47, P, t49, r2, t43, t45, 0);
    t49 = t47 * t49;
    t47 = r2.y;
    if (typeof t47 !== 'number')
      return this.initVelocityConstraints$1$bailout(50, t49, t2, P, t47, t43, t45, 0, 0);
    var t52 = P.x;
    if (typeof t52 !== 'number')
      return this.initVelocityConstraints$1$bailout(51, t49, t2, t47, t52, t43, t45, 0, 0);
    t49 -= t47 * t52;
    var t54 = this._angularImpulse;
    if (typeof t54 !== 'number')
      return this.initVelocityConstraints$1$bailout(52, t2, t43, t45, t49, t54, 0, 0, 0);
    t2.set$angularVelocity(t43 + t45 * (t49 + t54));
  } else {
    t2.setZero$0();
    this._angularImpulse = 0.0;
  }
},
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var step = env0;
      t1 = env1;
      r1 = env2;
      K = env3;
      r2 = env4;
      break;
    case 2:
      step = env0;
      t1 = env1;
      t3 = env2;
      r1 = env3;
      r2 = env4;
      K = env5;
      break;
    case 3:
      step = env0;
      t3 = env1;
      r1 = env2;
      t1 = env3;
      r2 = env4;
      K = env5;
      break;
    case 4:
      step = env0;
      t3 = env1;
      r1 = env2;
      t1 = env3;
      r2 = env4;
      K = env5;
      t6 = env6;
      break;
    case 5:
      step = env0;
      t1 = env1;
      t3 = env2;
      r1 = env3;
      r2 = env4;
      t6 = env5;
      K = env6;
      break;
    case 6:
      step = env0;
      t9 = env1;
      r1 = env2;
      r2 = env3;
      K = env4;
      t3 = env5;
      break;
    case 7:
      step = env0;
      t9 = env1;
      t11 = env2;
      r1 = env3;
      r2 = env4;
      K = env5;
      t3 = env6;
      break;
    case 8:
      step = env0;
      t11 = env1;
      t9 = env2;
      r1 = env3;
      r2 = env4;
      K = env5;
      t3 = env6;
      break;
    case 9:
      step = env0;
      t14 = env1;
      r1 = env2;
      r2 = env3;
      t3 = env4;
      K = env5;
      break;
    case 10:
      step = env0;
      t14 = env1;
      r1 = env2;
      t16 = env3;
      r2 = env4;
      K = env5;
      t3 = env6;
      break;
    case 11:
      step = env0;
      t16 = env1;
      t14 = env2;
      r1 = env3;
      r2 = env4;
      t3 = env5;
      K = env6;
      break;
    case 12:
      step = env0;
      t14 = env1;
      r1 = env2;
      t16 = env3;
      r2 = env4;
      t3 = env5;
      K = env6;
      break;
    case 13:
      step = env0;
      t14 = env1;
      r1 = env2;
      t16 = env3;
      r2 = env4;
      t20 = env5;
      t3 = env6;
      K = env7;
      break;
    case 14:
      step = env0;
      t14 = env1;
      r1 = env2;
      r2 = env3;
      t20 = env4;
      t3 = env5;
      t16 = env6;
      K = env7;
      break;
    case 15:
      step = env0;
      r1 = env1;
      t14 = env2;
      r2 = env3;
      t23 = env4;
      K = env5;
      break;
    case 16:
      step = env0;
      r1 = env1;
      t14 = env2;
      r2 = env3;
      t25 = env4;
      t23 = env5;
      K = env6;
      break;
    case 17:
      step = env0;
      r1 = env1;
      r2 = env2;
      t25 = env3;
      t14 = env4;
      t23 = env5;
      K = env6;
      break;
    case 18:
      step = env0;
      t28 = env1;
      r1 = env2;
      r2 = env3;
      t25 = env4;
      t14 = env5;
      t23 = env6;
      K = env7;
      break;
    case 19:
      step = env0;
      t14 = env1;
      r1 = env2;
      r2 = env3;
      t25 = env4;
      t23 = env5;
      K = env6;
      t28 = env7;
      break;
    case 20:
      step = env0;
      t25 = env1;
      r1 = env2;
      t31 = env3;
      r2 = env4;
      t23 = env5;
      K = env6;
      break;
    case 21:
      step = env0;
      t25 = env1;
      r1 = env2;
      t31 = env3;
      r2 = env4;
      t33 = env5;
      t23 = env6;
      K = env7;
      break;
    case 22:
      step = env0;
      t25 = env1;
      r1 = env2;
      t31 = env3;
      r2 = env4;
      t33 = env5;
      t23 = env6;
      K = env7;
      break;
    case 23:
      step = env0;
      r1 = env1;
      t23 = env2;
      r2 = env3;
      break;
    case 24:
      step = env0;
      t37 = env1;
      r1 = env2;
      t23 = env3;
      r2 = env4;
      break;
    case 25:
      step = env0;
      t2 = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 26:
      t4 = env0;
      t2 = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 27:
      t2 = env0;
      t6 = env1;
      P = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 28:
      P = env0;
      r1 = env1;
      r2 = env2;
      t2 = env3;
      t6 = env4;
      t8 = env5;
      break;
    case 29:
      t10 = env0;
      P = env1;
      r1 = env2;
      r2 = env3;
      t2 = env4;
      t6 = env5;
      t8 = env6;
      break;
    case 30:
      t2 = env0;
      P = env1;
      t12 = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 31:
      t2 = env0;
      P = env1;
      t12 = env2;
      r1 = env3;
      r2 = env4;
      t14 = env5;
      break;
    case 32:
      t2 = env0;
      P = env1;
      t12 = env2;
      r1 = env3;
      r2 = env4;
      t14 = env5;
      t16 = env6;
      break;
    case 33:
      t18 = env0;
      P = env1;
      t2 = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 34:
      t20 = env0;
      P = env1;
      t2 = env2;
      r1 = env3;
      r2 = env4;
      t18 = env5;
      break;
    case 35:
      t20 = env0;
      P = env1;
      t2 = env2;
      r1 = env3;
      r2 = env4;
      t22 = env5;
      t18 = env6;
      break;
    case 36:
      t20 = env0;
      P = env1;
      t2 = env2;
      r1 = env3;
      r2 = env4;
      t24 = env5;
      t22 = env6;
      t18 = env7;
      break;
    case 37:
      t20 = env0;
      P = env1;
      t2 = env2;
      r2 = env3;
      t22 = env4;
      t24 = env5;
      t18 = env6;
      break;
    case 38:
      t20 = env0;
      P = env1;
      t2 = env2;
      r2 = env3;
      t22 = env4;
      t27 = env5;
      t24 = env6;
      t18 = env7;
      break;
    case 39:
      t20 = env0;
      P = env1;
      t2 = env2;
      r2 = env3;
      t24 = env4;
      t29 = env5;
      t18 = env6;
      break;
    case 40:
      P = env0;
      t2 = env1;
      t31 = env2;
      r2 = env3;
      break;
    case 41:
      t33 = env0;
      P = env1;
      t2 = env2;
      t31 = env3;
      r2 = env4;
      break;
    case 42:
      P = env0;
      t2 = env1;
      t31 = env2;
      t33 = env3;
      r2 = env4;
      t35 = env5;
      break;
    case 43:
      t37 = env0;
      t2 = env1;
      P = env2;
      r2 = env3;
      break;
    case 44:
      t37 = env0;
      t39 = env1;
      P = env2;
      t2 = env3;
      r2 = env4;
      break;
    case 45:
      t37 = env0;
      t41 = env1;
      t39 = env2;
      P = env3;
      r2 = env4;
      t2 = env5;
      break;
    case 46:
      t2 = env0;
      t43 = env1;
      P = env2;
      r2 = env3;
      break;
    case 47:
      t2 = env0;
      t43 = env1;
      P = env2;
      t45 = env3;
      r2 = env4;
      break;
    case 48:
      t2 = env0;
      t47 = env1;
      P = env2;
      r2 = env3;
      t43 = env4;
      t45 = env5;
      break;
    case 49:
      t2 = env0;
      t47 = env1;
      P = env2;
      t49 = env3;
      r2 = env4;
      t43 = env5;
      t45 = env6;
      break;
    case 50:
      t49 = env0;
      t2 = env1;
      P = env2;
      t47 = env3;
      t43 = env4;
      t45 = env5;
      break;
    case 51:
      t49 = env0;
      t2 = env1;
      t47 = env2;
      t52 = env3;
      t43 = env4;
      t45 = env5;
      break;
    case 52:
      t2 = env0;
      t43 = env1;
      t45 = env2;
      t49 = env3;
      t54 = env4;
      break;
  }
  switch (state) {
    case 0:
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      r1.setFrom$1(this._localAnchorA).subLocal$1(this.bodyA.get$localCenter());
      r2.setFrom$1(this._localAnchorB).subLocal$1(this.bodyB.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(this.bodyA.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(this.bodyB.get$originTransform().get$rotation(), r2, r2);
      var K = $.Matrix22$(null, null);
      var t1 = this.bodyA.get$invMass();
    case 1:
      state = 0;
      var t3 = this.bodyB.get$invMass();
    case 2:
      state = 0;
      t3 = $.add(t1, t3);
      t1 = this.bodyA.get$invInertia();
    case 3:
      state = 0;
      var t6 = r1.y;
    case 4:
      state = 0;
      t6 = $.mul(t1, t6);
      t1 = r1.y;
    case 5:
      state = 0;
      t3 = $.add(t3, $.mul(t6, t1));
      var t9 = this.bodyB.get$invInertia();
    case 6:
      state = 0;
      var t11 = r2.y;
    case 7:
      state = 0;
      t11 = $.mul(t9, t11);
      t9 = r2.y;
    case 8:
      state = 0;
      t3 = $.add(t3, $.mul(t11, t9));
      var t14 = K.col1;
      t14.set$x(t3);
      t3 = this.bodyA.get$invInertia();
    case 9:
      state = 0;
      t3 = $.neg(t3);
      var t16 = r1.x;
    case 10:
      state = 0;
      t16 = $.mul(t3, t16);
      t3 = r1.y;
    case 11:
      state = 0;
      t3 = $.mul(t16, t3);
      t16 = this.bodyB.get$invInertia();
    case 12:
      state = 0;
      var t20 = r2.x;
    case 13:
      state = 0;
      t20 = $.mul(t16, t20);
      t16 = r2.y;
    case 14:
      state = 0;
      t14.set$y($.sub(t3, $.mul(t20, t16)));
      t14 = t14.get$y();
      var t23 = K.col2;
      t23.set$x(t14);
      t14 = this.bodyA.get$invMass();
    case 15:
      state = 0;
      var t25 = this.bodyB.get$invMass();
    case 16:
      state = 0;
      t25 = $.add(t14, t25);
      t14 = this.bodyA.get$invInertia();
    case 17:
      state = 0;
      var t28 = r1.x;
    case 18:
      state = 0;
      t28 = $.mul(t14, t28);
      t14 = r1.x;
    case 19:
      state = 0;
      t25 = $.add(t25, $.mul(t28, t14));
      var t31 = this.bodyB.get$invInertia();
    case 20:
      state = 0;
      var t33 = r2.x;
    case 21:
      state = 0;
      t33 = $.mul(t31, t33);
      t31 = r2.x;
    case 22:
      state = 0;
      t23.set$y($.add(t25, $.mul(t33, t31)));
      var linearMass = $.Matrix22$(null, null);
      linearMass.setFrom$1(K);
      linearMass.invertLocal$0();
      t23 = this.bodyA.get$invInertia();
    case 23:
      state = 0;
      var t37 = this.bodyB.get$invInertia();
    case 24:
      state = 0;
      var angularMass = $.add(t23, t37);
      if ($.gtB(angularMass, 0.0))
        if (typeof angularMass !== 'number')
          throw $.iae(angularMass);
      t1 = step.get$warmStarting() === true;
      var t2 = this._linearImpulse;
    default:
      if (state === 52 || state === 51 || state === 50 || state === 49 || state === 48 || state === 47 || state === 46 || state === 45 || state === 44 || state === 43 || state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 0 && t1)
        switch (state) {
          case 0:
            t2.mulLocal$1(step.get$dtRatio());
            t1 = this._angularImpulse;
          case 25:
            state = 0;
            var t4 = step.get$dtRatio();
          case 26:
            state = 0;
            this._angularImpulse = $.mul(t1, t4);
            var P = $.Vector$(0, 0);
            P.setFrom$1(t2);
            t2 = this.bodyA.get$linearVelocity();
            t6 = t2.get$x();
          case 27:
            state = 0;
            var t8 = this.bodyA.get$invMass();
          case 28:
            state = 0;
            var t10 = P.x;
          case 29:
            state = 0;
            t2.set$x($.sub(t6, $.mul(t8, t10)));
            t2 = this.bodyA.get$linearVelocity();
            var t12 = t2.get$y();
          case 30:
            state = 0;
            t14 = this.bodyA.get$invMass();
          case 31:
            state = 0;
            t16 = P.y;
          case 32:
            state = 0;
            t2.set$y($.sub(t12, $.mul(t14, t16)));
            t2 = this.bodyA;
            var t18 = t2.get$angularVelocity();
          case 33:
            state = 0;
            t20 = this.bodyA.get$invInertia();
          case 34:
            state = 0;
            var t22 = r1.x;
          case 35:
            state = 0;
            var t24 = P.y;
          case 36:
            state = 0;
            t24 = $.mul(t22, t24);
            t22 = r1.y;
          case 37:
            state = 0;
            var t27 = P.x;
          case 38:
            state = 0;
            t24 = $.sub(t24, $.mul(t22, t27));
            var t29 = this._angularImpulse;
          case 39:
            state = 0;
            t2.set$angularVelocity($.sub(t18, $.mul(t20, $.add(t24, t29))));
            t2 = this.bodyB.get$linearVelocity();
            t31 = t2.get$x();
          case 40:
            state = 0;
            t33 = this.bodyB.get$invMass();
          case 41:
            state = 0;
            var t35 = P.x;
          case 42:
            state = 0;
            t2.set$x($.add(t31, $.mul(t33, t35)));
            t2 = this.bodyB.get$linearVelocity();
            t37 = t2.get$y();
          case 43:
            state = 0;
            var t39 = this.bodyB.get$invMass();
          case 44:
            state = 0;
            var t41 = P.y;
          case 45:
            state = 0;
            t2.set$y($.add(t37, $.mul(t39, t41)));
            t2 = this.bodyB;
            var t43 = t2.get$angularVelocity();
          case 46:
            state = 0;
            var t45 = this.bodyB.get$invInertia();
          case 47:
            state = 0;
            var t47 = r2.x;
          case 48:
            state = 0;
            var t49 = P.y;
          case 49:
            state = 0;
            t49 = $.mul(t47, t49);
            t47 = r2.y;
          case 50:
            state = 0;
            var t52 = P.x;
          case 51:
            state = 0;
            t49 = $.sub(t49, $.mul(t47, t52));
            var t54 = this._angularImpulse;
          case 52:
            state = 0;
            t2.set$angularVelocity($.add(t43, $.mul(t45, $.add(t49, t54))));
        }
      else {
        t2.setZero$0();
        this._angularImpulse = 0.0;
      }
  }
},
 solveVelocityConstraints$1: function(step) {
  var Cdot = $.sub(this.bodyB.get$angularVelocity(), this.bodyA.get$angularVelocity());
  var angularMass = $.add(this.bodyA.get$invInertia(), this.bodyB.get$invInertia());
  if ($.gtB(angularMass, 0.0)) {
    if (typeof angularMass !== 'number')
      throw $.iae(angularMass);
    angularMass = 1.0 / angularMass;
  }
  var impulse = $.mul($.neg(angularMass), Cdot);
  var oldImpulse = this._angularImpulse;
  var maxImpulse = $.mul(step.get$dt(), this._maxTorque);
  var t1 = $.add(this._angularImpulse, impulse);
  this._angularImpulse = $.max($.neg(maxImpulse), $.min(t1, maxImpulse));
  impulse = $.sub(this._angularImpulse, oldImpulse);
  var t2 = this.bodyA;
  t2.set$angularVelocity($.sub(t2.get$angularVelocity(), $.mul(this.bodyA.get$invInertia(), impulse)));
  t2 = this.bodyB;
  t2.set$angularVelocity($.add(t2.get$angularVelocity(), $.mul(this.bodyB.get$invInertia(), impulse)));
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this._localAnchorA).subLocal$1(this.bodyA.get$localCenter());
  r2.setFrom$1(this._localAnchorB).subLocal$1(this.bodyB.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(this.bodyA.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(this.bodyB.get$originTransform().get$rotation(), r2, r2);
  var temp = $.Vector$(0, 0);
  Cdot = $.Vector$(0, 0);
  $.Vector_crossNumAndVectorToOut(this.bodyA.get$angularVelocity(), r1, temp);
  $.Vector_crossNumAndVectorToOut(this.bodyB.get$angularVelocity(), r2, Cdot);
  Cdot.addLocal$1(this.bodyB.get$linearVelocity()).subLocal$1(this.bodyA.get$linearVelocity()).subLocal$1(temp);
  var K = $.Matrix22$(null, null);
  t2 = $.add($.add($.add(this.bodyA.get$invMass(), this.bodyB.get$invMass()), $.mul($.mul(this.bodyA.get$invInertia(), r1.y), r1.y)), $.mul($.mul(this.bodyB.get$invInertia(), r2.y), r2.y));
  var t3 = K.col1;
  t3.set$x(t2);
  t3.set$y($.sub($.mul($.mul($.neg(this.bodyA.get$invInertia()), r1.x), r1.y), $.mul($.mul(this.bodyB.get$invInertia(), r2.x), r2.y)));
  t3 = t3.get$y();
  t2 = K.col2;
  t2.set$x(t3);
  t2.set$y($.add($.add($.add(this.bodyA.get$invMass(), this.bodyB.get$invMass()), $.mul($.mul(this.bodyA.get$invInertia(), r1.x), r1.x)), $.mul($.mul(this.bodyB.get$invInertia(), r2.x), r2.x)));
  var linearMass = $.Matrix22$(null, null);
  linearMass.setFrom$1(K);
  linearMass.invertLocal$0();
  var impulse0 = $.Vector$(0, 0);
  $.Matrix22_mulMatrixAndVectorToOut(linearMass, Cdot, impulse0);
  impulse0.negateLocal$0();
  oldImpulse = $.Vector$(0, 0);
  t2 = this._linearImpulse;
  oldImpulse.setFrom$1(t2);
  t2.addLocal$1(impulse0);
  var maxImpulse0 = $.mul(step.get$dt(), this._maxForce);
  if ($.gtB(t2.get$lengthSquared(), $.mul(maxImpulse0, maxImpulse0))) {
    t2.normalize$0();
    t2.mulLocal$1(maxImpulse0);
  }
  impulse0.setFrom$1(t2).subLocal$1(oldImpulse);
  t1 = this.bodyA.get$linearVelocity();
  t1.set$x($.sub(t1.get$x(), $.mul(impulse0.x, this.bodyA.get$invMass())));
  t1 = this.bodyA.get$linearVelocity();
  t1.set$y($.sub(t1.get$y(), $.mul(impulse0.y, this.bodyA.get$invMass())));
  t1 = this.bodyA;
  t1.set$angularVelocity($.sub(t1.get$angularVelocity(), $.mul(this.bodyA.get$invInertia(), $.sub($.mul(r1.x, impulse0.y), $.mul(r1.y, impulse0.x)))));
  t1 = this.bodyB.get$linearVelocity();
  t1.set$x($.add(t1.get$x(), $.mul(impulse0.x, this.bodyB.get$invMass())));
  t1 = this.bodyB.get$linearVelocity();
  t1.set$y($.add(t1.get$y(), $.mul(impulse0.y, this.bodyB.get$invMass())));
  t1 = this.bodyB;
  t1.set$angularVelocity($.add(t1.get$angularVelocity(), $.mul(this.bodyB.get$invInertia(), $.sub($.mul(r2.x, impulse0.y), $.mul(r2.y, impulse0.x)))));
},
 solvePositionConstraints$1: function(baumgarte) {
  return true;
}
};

$$.RevoluteJoint = {"":
 ["localAnchor1", "localAnchor2", "impulse", "_motorImpulse", "mass?", "motorMass", "_enableMotor", "_maxMotorTorque", "_motorSpeed", "_enableLimit", "referenceAngle?", "lowerAngle?", "upperAngle?", "limitState", "type", "_prev", "_lib_next", "edgeA", "edgeB", "bodyA", "bodyB", "islandFlag", "collideConnected", "userData", "localCenterA", "localCenterB", "invMassA", "invIA", "invMassB", "invIB"],
 "super": "Joint",
 initVelocityConstraints$1: function(step) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var t1 = this._enableMotor;
  if (typeof t1 !== 'boolean')
    return this.initVelocityConstraints$1$bailout(1, step, b1, b2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t3 = !t1;
  if (t1 || this._enableLimit === true)
    ;
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  var m1 = b1.get$invMass();
  if (typeof m1 !== 'number')
    return this.initVelocityConstraints$1$bailout(2, step, b1, r1, r2, m1, b2, t1, 0, 0, 0, 0, 0, 0, 0);
  var m2 = b2.get$invMass();
  if (typeof m2 !== 'number')
    return this.initVelocityConstraints$1$bailout(3, step, b1, r1, r2, m1, m2, t1, b2, 0, 0, 0, 0, 0, 0);
  var i1 = b1.get$invInertia();
  if (typeof i1 !== 'number')
    return this.initVelocityConstraints$1$bailout(4, step, b1, t1, r1, r2, m1, m2, i1, b2, 0, 0, 0, 0, 0);
  var i2 = b2.get$invInertia();
  if (typeof i2 !== 'number')
    return this.initVelocityConstraints$1$bailout(5, step, b1, b2, t1, r1, r2, m1, m2, i1, i2, 0, 0, 0, 0);
  var t7 = m1 + m2;
  var t8 = r1.y;
  if (typeof t8 !== 'number')
    return this.initVelocityConstraints$1$bailout(6, step, t8, m1, m2, i1, i2, t7, r1, r2, b2, t1, b1, 0, 0);
  var t10 = t7 + t8 * t8 * i1;
  var t11 = r2.y;
  if (typeof t11 !== 'number')
    return this.initVelocityConstraints$1$bailout(7, step, t11, m1, m2, i1, i2, r1, t10, r2, b2, t1, b1, 0, 0);
  t10 += t11 * t11 * i2;
  var t13 = this.mass;
  t13.get$col1().set$x(t10);
  t10 = r1.y;
  if (typeof t10 !== 'number')
    return this.initVelocityConstraints$1$bailout(8, step, t13, t10, m1, m2, i1, i2, r1, r2, b2, t1, b1, 0, 0);
  t10 = -t10;
  var t15 = r1.x;
  if (typeof t15 !== 'number')
    return this.initVelocityConstraints$1$bailout(9, step, t13, t15, t10, m1, m2, i1, i2, r1, r2, b2, t1, b1, 0);
  var t17 = t10 * t15 * i1;
  var t18 = r2.y;
  if (typeof t18 !== 'number')
    return this.initVelocityConstraints$1$bailout(10, step, t13, t18, t17, m1, m2, i1, i2, r1, r2, b2, t1, b1, 0);
  var t20 = r2.x;
  if (typeof t20 !== 'number')
    return this.initVelocityConstraints$1$bailout(11, step, t13, t18, t20, t17, m1, m2, i1, i2, r1, r2, b2, t1, b1);
  t17 -= t18 * t20 * i2;
  t13.get$col2().set$x(t17);
  t17 = r1.y;
  if (typeof t17 !== 'number')
    return this.initVelocityConstraints$1$bailout(12, step, t13, t17, m1, m2, i1, i2, r1, r2, b2, t1, b1, 0, 0);
  var t23 = -t17 * i1;
  var t24 = r2.y;
  if (typeof t24 !== 'number')
    return this.initVelocityConstraints$1$bailout(13, step, t13, t24, m1, m2, i1, i2, r1, r2, b2, t1, b1, t23, 0);
  t23 -= t24 * i2;
  t13.get$col3().set$x(t23);
  t23 = t13.get$col2().get$x();
  t13.get$col1().set$y(t23);
  t23 = r1.x;
  if (typeof t23 !== 'number')
    return this.initVelocityConstraints$1$bailout(14, step, t13, t7, m1, m2, i1, t23, i2, r1, r2, b2, t1, b1, 0);
  t7 += t23 * t23 * i1;
  var t27 = r2.x;
  if (typeof t27 !== 'number')
    return this.initVelocityConstraints$1$bailout(15, step, t13, m1, m2, i1, i2, t27, t7, r1, r2, b2, t1, b1, 0);
  t7 += t27 * t27 * i2;
  t13.get$col2().set$y(t7);
  t7 = r1.x;
  if (typeof t7 !== 'number')
    return this.initVelocityConstraints$1$bailout(16, step, t13, m1, m2, i1, i2, t7, r1, r2, b2, t1, b1, 0, 0);
  t7 *= i1;
  var t30 = r2.x;
  if (typeof t30 !== 'number')
    return this.initVelocityConstraints$1$bailout(17, step, t7, t13, m1, m2, i1, i2, t30, r1, r2, b2, t1, b1, 0);
  t7 += t30 * i2;
  t13.get$col3().set$y(t7);
  t7 = t13.get$col3().get$x();
  t13.get$col1().set$z(t7);
  t7 = t13.get$col3().get$y();
  t13.get$col2().set$z(t7);
  t7 = i1 + i2;
  t13.get$col3().set$z(t7);
  this.motorMass = t7;
  var t2 = this.motorMass;
  if (typeof t2 !== 'number')
    return this.initVelocityConstraints$1$bailout(18, step, r2, b2, t1, t2, r1, b1, m1, m2, i1, i2, 0, 0, 0);
  if (t2 > 0.0)
    this.motorMass = 1.0 / t2;
  if (t3)
    this._motorImpulse = 0.0;
  if (this._enableLimit === true) {
    t1 = b2.get$sweep().get$angle();
    if (typeof t1 !== 'number')
      return this.initVelocityConstraints$1$bailout(19, step, b1, b2, t1, r1, r2, m1, m2, i1, i2, 0, 0, 0, 0);
    t3 = b1.get$sweep().get$angle();
    if (typeof t3 !== 'number')
      return this.initVelocityConstraints$1$bailout(20, step, b1, b2, t3, t1, r1, r2, m1, m2, i1, i2, 0, 0, 0);
    t3 = t1 - t3;
    t1 = this.referenceAngle;
    if (typeof t1 !== 'number')
      return this.initVelocityConstraints$1$bailout(21, step, t3, b2, b1, t1, r1, r2, m1, m2, i1, i2, 0, 0, 0);
    var jointAngle = t3 - t1;
    t1 = this.upperAngle;
    if (typeof t1 !== 'number')
      return this.initVelocityConstraints$1$bailout(22, step, r2, b2, jointAngle, t1, r1, b1, m1, m2, i1, i2, 0, 0, 0);
    t3 = this.lowerAngle;
    if (typeof t3 !== 'number')
      return this.initVelocityConstraints$1$bailout(23, step, jointAngle, t1, t3, m1, m2, i1, i2, r1, b1, b2, r2, 0, 0);
    var t5 = $.abs(t1 - t3);
    if (typeof t5 !== 'number')
      return this.initVelocityConstraints$1$bailout(24, step, jointAngle, t1, t3, t5, m1, m2, i1, i2, r1, b1, b2, r2, 0);
    if (t5 < 0.06981317007977318)
      this.limitState = 3;
    else if (jointAngle <= t3) {
      t1 = this.limitState;
      if (t1 !== (t1 | 0))
        return this.initVelocityConstraints$1$bailout(25, step, i1, b2, i2, r1, r2, b1, m2, t1, m1, 0, 0, 0, 0);
      if (!(t1 === 1))
        this.impulse.z = 0.0;
      this.limitState = 1;
    } else if (jointAngle >= t1) {
      t1 = this.limitState;
      if (t1 !== (t1 | 0))
        return this.initVelocityConstraints$1$bailout(26, step, i1, m1, t1, r1, r2, b2, m2, b1, i2, 0, 0, 0, 0);
      if (!(t1 === 2))
        this.impulse.z = 0.0;
      this.limitState = 2;
    } else {
      this.limitState = 0;
      this.impulse.z = 0.0;
    }
  } else
    this.limitState = 0;
  t1 = step.get$warmStarting() === true;
  t2 = this.impulse;
  if (t1) {
    t2.mulLocal$1(step.get$dtRatio());
    t1 = this._motorImpulse;
    if (typeof t1 !== 'number')
      return this.initVelocityConstraints$1$bailout(27, step, r2, b2, b1, t1, r1, t2, m1, m2, i1, i2, 0, 0, 0);
    var t4 = step.get$dtRatio();
    if (typeof t4 !== 'number')
      return this.initVelocityConstraints$1$bailout(28, t4, b2, r2, t1, r1, b1, t2, m1, m2, i1, i2, 0, 0, 0);
    this._motorImpulse = t1 * t4;
    var temp = $.Vector$(0, 0);
    var P = $.Vector$(0, 0);
    P.setCoords$2(t2.x, t2.y);
    temp.setFrom$1(P).mulLocal$1(m1);
    b1.get$linearVelocity().subLocal$1(temp);
    var t6 = b1.get$angularVelocity();
    if (typeof t6 !== 'number')
      return this.initVelocityConstraints$1$bailout(29, b2, t6, b1, temp, P, r1, t2, r2, m2, i1, i2, 0, 0, 0);
    t8 = r1.x;
    if (typeof t8 !== 'number')
      return this.initVelocityConstraints$1$bailout(30, t8, b1, t6, m2, i1, i2, temp, P, r1, t2, b2, r2, 0, 0);
    t10 = P.y;
    if (typeof t10 !== 'number')
      return this.initVelocityConstraints$1$bailout(31, t8, t10, t6, m2, i1, i2, temp, P, r1, t2, r2, b2, b1, 0);
    t10 = t8 * t10;
    t8 = r1.y;
    if (typeof t8 !== 'number')
      return this.initVelocityConstraints$1$bailout(32, b1, t6, t8, t10, m2, i1, i2, temp, P, t2, b2, r2, 0, 0);
    t13 = P.x;
    if (typeof t13 !== 'number')
      return this.initVelocityConstraints$1$bailout(33, t6, t8, t13, t10, m2, i1, i2, temp, P, t2, r2, b2, b1, 0);
    t10 -= t8 * t13;
    t15 = this._motorImpulse;
    if (typeof t15 !== 'number')
      return this.initVelocityConstraints$1$bailout(34, b1, t6, t15, t10, m2, i1, i2, temp, P, r2, b2, t2, 0, 0);
    t15 = t10 + t15;
    t10 = t2.z;
    if (typeof t10 !== 'number')
      return this.initVelocityConstraints$1$bailout(35, b1, t6, m2, i1, t15, i2, t10, temp, P, t2, b2, r2, 0, 0);
    b1.set$angularVelocity(t6 - i1 * (t15 + t10));
    temp.setFrom$1(P).mulLocal$1(m2);
    b2.get$linearVelocity().addLocal$1(temp);
    t18 = b2.get$angularVelocity();
    if (typeof t18 !== 'number')
      return this.initVelocityConstraints$1$bailout(36, P, t2, b2, t18, r2, i2, 0, 0, 0, 0, 0, 0, 0, 0);
    t20 = r2.x;
    if (typeof t20 !== 'number')
      return this.initVelocityConstraints$1$bailout(37, t20, P, t2, b2, t18, r2, i2, 0, 0, 0, 0, 0, 0, 0);
    var t22 = P.y;
    if (typeof t22 !== 'number')
      return this.initVelocityConstraints$1$bailout(38, t20, t22, P, t2, b2, t18, r2, i2, 0, 0, 0, 0, 0, 0);
    t22 = t20 * t22;
    t20 = r2.y;
    if (typeof t20 !== 'number')
      return this.initVelocityConstraints$1$bailout(39, t22, t20, P, t2, b2, t18, i2, 0, 0, 0, 0, 0, 0, 0);
    var t25 = P.x;
    if (typeof t25 !== 'number')
      return this.initVelocityConstraints$1$bailout(40, t22, t20, t25, t2, b2, t18, i2, 0, 0, 0, 0, 0, 0, 0);
    t22 -= t20 * t25;
    t27 = this._motorImpulse;
    if (typeof t27 !== 'number')
      return this.initVelocityConstraints$1$bailout(41, t22, t27, t2, b2, t18, i2, 0, 0, 0, 0, 0, 0, 0, 0);
    t27 = t22 + t27;
    t2 = t2.z;
    if (typeof t2 !== 'number')
      return this.initVelocityConstraints$1$bailout(42, t27, b2, t18, t2, i2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    b2.set$angularVelocity(t18 + i2 * (t27 + t2));
  } else {
    t2.setZero$0();
    this._motorImpulse = 0.0;
  }
},
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var step = env0;
      b1 = env1;
      b2 = env2;
      t1 = env3;
      break;
    case 2:
      step = env0;
      b1 = env1;
      r1 = env2;
      r2 = env3;
      m1 = env4;
      b2 = env5;
      t1 = env6;
      break;
    case 3:
      step = env0;
      b1 = env1;
      r1 = env2;
      r2 = env3;
      m1 = env4;
      m2 = env5;
      t1 = env6;
      b2 = env7;
      break;
    case 4:
      step = env0;
      b1 = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      m1 = env5;
      m2 = env6;
      i1 = env7;
      b2 = env8;
      break;
    case 5:
      step = env0;
      b1 = env1;
      b2 = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 6:
      step = env0;
      t7 = env1;
      m1 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      t6 = env6;
      r1 = env7;
      r2 = env8;
      b2 = env9;
      t1 = env10;
      b1 = env11;
      break;
    case 7:
      step = env0;
      t9 = env1;
      m1 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      r1 = env6;
      t6 = env7;
      r2 = env8;
      b2 = env9;
      t1 = env10;
      b1 = env11;
      break;
    case 8:
      step = env0;
      t11 = env1;
      t6 = env2;
      m1 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      r1 = env7;
      r2 = env8;
      b2 = env9;
      t1 = env10;
      b1 = env11;
      break;
    case 9:
      step = env0;
      t11 = env1;
      t13 = env2;
      t6 = env3;
      m1 = env4;
      m2 = env5;
      i1 = env6;
      i2 = env7;
      r1 = env8;
      r2 = env9;
      b2 = env10;
      t1 = env11;
      b1 = env12;
      break;
    case 10:
      step = env0;
      t11 = env1;
      t16 = env2;
      t15 = env3;
      m1 = env4;
      m2 = env5;
      i1 = env6;
      i2 = env7;
      r1 = env8;
      r2 = env9;
      b2 = env10;
      t1 = env11;
      b1 = env12;
      break;
    case 11:
      step = env0;
      t11 = env1;
      t16 = env2;
      t18 = env3;
      t15 = env4;
      m1 = env5;
      m2 = env6;
      i1 = env7;
      i2 = env8;
      r1 = env9;
      r2 = env10;
      b2 = env11;
      t1 = env12;
      b1 = env13;
      break;
    case 12:
      step = env0;
      t11 = env1;
      t15 = env2;
      m1 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      r1 = env7;
      r2 = env8;
      b2 = env9;
      t1 = env10;
      b1 = env11;
      break;
    case 13:
      step = env0;
      t11 = env1;
      t22 = env2;
      m1 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      r1 = env7;
      r2 = env8;
      b2 = env9;
      t1 = env10;
      b1 = env11;
      t21 = env12;
      break;
    case 14:
      step = env0;
      t11 = env1;
      t21 = env2;
      m1 = env3;
      m2 = env4;
      i1 = env5;
      t24 = env6;
      i2 = env7;
      r1 = env8;
      r2 = env9;
      b2 = env10;
      t1 = env11;
      b1 = env12;
      break;
    case 15:
      step = env0;
      t11 = env1;
      m1 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      t26 = env6;
      t21 = env7;
      r1 = env8;
      r2 = env9;
      b2 = env10;
      t1 = env11;
      b1 = env12;
      break;
    case 16:
      step = env0;
      t11 = env1;
      m1 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      t21 = env6;
      r1 = env7;
      r2 = env8;
      b2 = env9;
      t1 = env10;
      b1 = env11;
      break;
    case 17:
      step = env0;
      t21 = env1;
      t11 = env2;
      m1 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      t29 = env7;
      r1 = env8;
      r2 = env9;
      b2 = env10;
      t1 = env11;
      b1 = env12;
      break;
    case 18:
      step = env0;
      r2 = env1;
      b2 = env2;
      t1 = env3;
      t2 = env4;
      r1 = env5;
      b1 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 19:
      step = env0;
      b1 = env1;
      b2 = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 20:
      step = env0;
      b1 = env1;
      b2 = env2;
      t3 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 21:
      step = env0;
      t3 = env1;
      b2 = env2;
      b1 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 22:
      step = env0;
      r2 = env1;
      b2 = env2;
      jointAngle = env3;
      t1 = env4;
      r1 = env5;
      b1 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 23:
      step = env0;
      jointAngle = env1;
      t1 = env2;
      t3 = env3;
      m1 = env4;
      m2 = env5;
      i1 = env6;
      i2 = env7;
      r1 = env8;
      b1 = env9;
      b2 = env10;
      r2 = env11;
      break;
    case 24:
      step = env0;
      jointAngle = env1;
      t1 = env2;
      t3 = env3;
      t5 = env4;
      m1 = env5;
      m2 = env6;
      i1 = env7;
      i2 = env8;
      r1 = env9;
      b1 = env10;
      b2 = env11;
      r2 = env12;
      break;
    case 25:
      step = env0;
      i1 = env1;
      b2 = env2;
      i2 = env3;
      r1 = env4;
      r2 = env5;
      b1 = env6;
      m2 = env7;
      t1 = env8;
      m1 = env9;
      break;
    case 26:
      step = env0;
      i1 = env1;
      m1 = env2;
      t1 = env3;
      r1 = env4;
      r2 = env5;
      b2 = env6;
      m2 = env7;
      b1 = env8;
      i2 = env9;
      break;
    case 27:
      step = env0;
      r2 = env1;
      b2 = env2;
      b1 = env3;
      t1 = env4;
      r1 = env5;
      t2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 28:
      t4 = env0;
      b2 = env1;
      r2 = env2;
      t1 = env3;
      r1 = env4;
      b1 = env5;
      t2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 29:
      b2 = env0;
      t6 = env1;
      b1 = env2;
      temp = env3;
      P = env4;
      r1 = env5;
      t2 = env6;
      r2 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 30:
      t8 = env0;
      b1 = env1;
      t6 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      temp = env6;
      P = env7;
      r1 = env8;
      t2 = env9;
      b2 = env10;
      r2 = env11;
      break;
    case 31:
      t8 = env0;
      t10 = env1;
      t6 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      temp = env6;
      P = env7;
      r1 = env8;
      t2 = env9;
      r2 = env10;
      b2 = env11;
      b1 = env12;
      break;
    case 32:
      b1 = env0;
      t6 = env1;
      t8 = env2;
      t10 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      temp = env7;
      P = env8;
      t2 = env9;
      b2 = env10;
      r2 = env11;
      break;
    case 33:
      t6 = env0;
      t8 = env1;
      t13 = env2;
      t10 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      temp = env7;
      P = env8;
      t2 = env9;
      r2 = env10;
      b2 = env11;
      b1 = env12;
      break;
    case 34:
      b1 = env0;
      t6 = env1;
      t15 = env2;
      t10 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      temp = env7;
      P = env8;
      r2 = env9;
      b2 = env10;
      t2 = env11;
      break;
    case 35:
      b1 = env0;
      t6 = env1;
      m2 = env2;
      i1 = env3;
      t15 = env4;
      i2 = env5;
      t10 = env6;
      temp = env7;
      P = env8;
      t2 = env9;
      b2 = env10;
      r2 = env11;
      break;
    case 36:
      P = env0;
      t2 = env1;
      b2 = env2;
      t18 = env3;
      r2 = env4;
      i2 = env5;
      break;
    case 37:
      t20 = env0;
      P = env1;
      t2 = env2;
      b2 = env3;
      t18 = env4;
      r2 = env5;
      i2 = env6;
      break;
    case 38:
      t20 = env0;
      t22 = env1;
      P = env2;
      t2 = env3;
      b2 = env4;
      t18 = env5;
      r2 = env6;
      i2 = env7;
      break;
    case 39:
      t22 = env0;
      t20 = env1;
      P = env2;
      t2 = env3;
      b2 = env4;
      t18 = env5;
      i2 = env6;
      break;
    case 40:
      t22 = env0;
      t20 = env1;
      t25 = env2;
      t2 = env3;
      b2 = env4;
      t18 = env5;
      i2 = env6;
      break;
    case 41:
      t22 = env0;
      t27 = env1;
      t2 = env2;
      b2 = env3;
      t18 = env4;
      i2 = env5;
      break;
    case 42:
      t27 = env0;
      b2 = env1;
      t18 = env2;
      t2 = env3;
      i2 = env4;
      break;
  }
  switch (state) {
    case 0:
      var b1 = this.bodyA;
      var b2 = this.bodyB;
      var t1 = this._enableMotor;
    case 1:
      state = 0;
      if (t1 === true || this._enableLimit === true)
        ;
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      var m1 = b1.get$invMass();
    case 2:
      state = 0;
      var m2 = b2.get$invMass();
    case 3:
      state = 0;
      var i1 = b1.get$invInertia();
    case 4:
      state = 0;
      var i2 = b2.get$invInertia();
    case 5:
      state = 0;
      var t6 = $.add(m1, m2);
      var t7 = r1.y;
    case 6:
      state = 0;
      t6 = $.add(t6, $.mul($.mul(t7, t7), i1));
      var t9 = r2.y;
    case 7:
      state = 0;
      t6 = $.add(t6, $.mul($.mul(t9, t9), i2));
      var t11 = this.mass;
      t11.get$col1().set$x(t6);
      t6 = r1.y;
    case 8:
      state = 0;
      t6 = $.neg(t6);
      var t13 = r1.x;
    case 9:
      state = 0;
      var t15 = $.mul($.mul(t6, t13), i1);
      var t16 = r2.y;
    case 10:
      state = 0;
      var t18 = r2.x;
    case 11:
      state = 0;
      t15 = $.sub(t15, $.mul($.mul(t16, t18), i2));
      t11.get$col2().set$x(t15);
      t15 = r1.y;
    case 12:
      state = 0;
      var t21 = $.mul($.neg(t15), i1);
      var t22 = r2.y;
    case 13:
      state = 0;
      t21 = $.sub(t21, $.mul(t22, i2));
      t11.get$col3().set$x(t21);
      t21 = t11.get$col2().get$x();
      t11.get$col1().set$y(t21);
      t21 = $.add(m1, m2);
      var t24 = r1.x;
    case 14:
      state = 0;
      t21 = $.add(t21, $.mul($.mul(t24, t24), i1));
      var t26 = r2.x;
    case 15:
      state = 0;
      t21 = $.add(t21, $.mul($.mul(t26, t26), i2));
      t11.get$col2().set$y(t21);
      t21 = r1.x;
    case 16:
      state = 0;
      t21 = $.mul(t21, i1);
      var t29 = r2.x;
    case 17:
      state = 0;
      t21 = $.add(t21, $.mul(t29, i2));
      t11.get$col3().set$y(t21);
      t21 = t11.get$col3().get$x();
      t11.get$col1().set$z(t21);
      t21 = t11.get$col3().get$y();
      t11.get$col2().set$z(t21);
      t21 = $.add(i1, i2);
      t11.get$col3().set$z(t21);
      this.motorMass = $.add(i1, i2);
      var t2 = this.motorMass;
    case 18:
      state = 0;
      if ($.gtB(t2, 0.0)) {
        t2 = this.motorMass;
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        this.motorMass = 1.0 / t2;
      }
      if ($.eqB(t1, false))
        this._motorImpulse = 0.0;
    default:
      if (state === 26 || state === 25 || state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 0 && this._enableLimit === true)
        switch (state) {
          case 0:
            t1 = b2.get$sweep().get$angle();
          case 19:
            state = 0;
            var t3 = b1.get$sweep().get$angle();
          case 20:
            state = 0;
            t3 = $.sub(t1, t3);
            t1 = this.referenceAngle;
          case 21:
            state = 0;
            var jointAngle = $.sub(t3, t1);
            t1 = this.upperAngle;
          case 22:
            state = 0;
            t3 = this.lowerAngle;
          case 23:
            state = 0;
            var t5 = $.abs($.sub(t1, t3));
          case 24:
            state = 0;
          default:
            if (state === 0 && $.ltB(t5, 0.06981317007977318))
              this.limitState = 3;
            else
              switch (state) {
                case 0:
                default:
                  if (state === 25 || state === 0 && $.leB(jointAngle, t3))
                    switch (state) {
                      case 0:
                        t1 = this.limitState;
                      case 25:
                        state = 0;
                        if (!$.eqB(t1, 1))
                          this.impulse.set$z(0.0);
                        this.limitState = 1;
                    }
                  else
                    switch (state) {
                      case 0:
                      case 26:
                        if (state === 26 || state === 0 && $.geB(jointAngle, t1))
                          switch (state) {
                            case 0:
                              t1 = this.limitState;
                            case 26:
                              state = 0;
                              if (!$.eqB(t1, 2))
                                this.impulse.set$z(0.0);
                              this.limitState = 2;
                          }
                        else {
                          this.limitState = 0;
                          this.impulse.set$z(0.0);
                        }
                    }
              }
        }
      else
        this.limitState = 0;
      t1 = step.get$warmStarting() === true;
      t2 = this.impulse;
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
      if (state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 0 && t1)
        switch (state) {
          case 0:
            t2.mulLocal$1(step.get$dtRatio());
            t1 = this._motorImpulse;
          case 27:
            state = 0;
            var t4 = step.get$dtRatio();
          case 28:
            state = 0;
            this._motorImpulse = $.mul(t1, t4);
            var temp = $.Vector$(0, 0);
            var P = $.Vector$(0, 0);
            P.setCoords$2(t2.get$x(), t2.get$y());
            temp.setFrom$1(P).mulLocal$1(m1);
            b1.get$linearVelocity().subLocal$1(temp);
            t6 = b1.get$angularVelocity();
          case 29:
            state = 0;
            var t8 = r1.x;
          case 30:
            state = 0;
            var t10 = P.y;
          case 31:
            state = 0;
            t10 = $.mul(t8, t10);
            t8 = r1.y;
          case 32:
            state = 0;
            t13 = P.x;
          case 33:
            state = 0;
            t10 = $.sub(t10, $.mul(t8, t13));
            t15 = this._motorImpulse;
          case 34:
            state = 0;
            t15 = $.add(t10, t15);
            t10 = t2.get$z();
          case 35:
            state = 0;
            b1.set$angularVelocity($.sub(t6, $.mul(i1, $.add(t15, t10))));
            temp.setFrom$1(P).mulLocal$1(m2);
            b2.get$linearVelocity().addLocal$1(temp);
            t18 = b2.get$angularVelocity();
          case 36:
            state = 0;
            var t20 = r2.x;
          case 37:
            state = 0;
            t22 = P.y;
          case 38:
            state = 0;
            t22 = $.mul(t20, t22);
            t20 = r2.y;
          case 39:
            state = 0;
            var t25 = P.x;
          case 40:
            state = 0;
            t22 = $.sub(t22, $.mul(t20, t25));
            var t27 = this._motorImpulse;
          case 41:
            state = 0;
            t27 = $.add(t22, t27);
            t2 = t2.get$z();
          case 42:
            state = 0;
            b2.set$angularVelocity($.add(t18, $.mul(i2, $.add(t27, t2))));
        }
      else {
        t2.setZero$0();
        this._motorImpulse = 0.0;
      }
  }
},
 solveVelocityConstraints$1: function(step) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var v1 = b1.get$linearVelocity();
  var w1 = b1.get$angularVelocity();
  var v2 = b2.get$linearVelocity();
  var w2 = b2.get$angularVelocity();
  var m1 = b1.get$invMass();
  var m2 = b2.get$invMass();
  var i1 = b1.get$invInertia();
  var i2 = b2.get$invInertia();
  if (this._enableMotor === true && !$.eqB(this.limitState, 3)) {
    var Cdot = $.sub($.sub(w2, w1), this._motorSpeed);
    var imp = $.mul(this.motorMass, $.neg(Cdot));
    var oldImpulse = this._motorImpulse;
    var maxImpulse = $.mul(step.get$dt(), this._maxMotorTorque);
    var t1 = $.add(this._motorImpulse, imp);
    this._motorImpulse = $.max($.neg(maxImpulse), $.min(t1, maxImpulse));
    imp = $.sub(this._motorImpulse, oldImpulse);
    w1 = $.sub(w1, $.mul(i1, imp));
    w2 = $.add(w2, $.mul(i2, imp));
  }
  var temp = $.Vector$(0, 0);
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  t1 = this._enableLimit === true && !$.eqB(this.limitState, 0);
  var t2 = this.localAnchor1;
  var t3 = this.localAnchor2;
  var t4 = this.mass;
  if (t1) {
    r1.setFrom$1(t2).subLocal$1(b1.get$localCenter());
    r2.setFrom$1(t3).subLocal$1(b2.get$localCenter());
    $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
    $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
    var Cdot1 = $.Vector$(0, 0);
    Cdot = $.Vector3$(0, 0, 0);
    $.Vector_crossNumAndVectorToOut(w1, r1, temp);
    $.Vector_crossNumAndVectorToOut(w2, r2, Cdot1);
    Cdot1.addLocal$1(v2).subLocal$1(v1).subLocal$1(temp);
    var Cdot2 = $.sub(w2, w1);
    Cdot.setCoords$3(Cdot1.x, Cdot1.y, Cdot2);
    imp = $.Vector3$(0, 0, 0);
    t4.solve33ToOut$2(Cdot.negateLocal$0(), imp);
    if ($.eqB(this.limitState, 3))
      this.impulse.addLocal$1(imp);
    else if ($.eqB(this.limitState, 1)) {
      t1 = this.impulse;
      if ($.ltB($.add(t1.get$z(), imp.z), 0.0)) {
        t4.solve22ToOut$2(Cdot1.negateLocal$0(), temp);
        imp.x = temp.x;
        imp.y = temp.y;
        imp.z = $.neg(t1.get$z());
        t1.set$x($.add(t1.get$x(), temp.x));
        t1.set$y($.add(t1.get$y(), temp.y));
        t1.set$z(0.0);
      }
    } else if ($.eqB(this.limitState, 2)) {
      t1 = this.impulse;
      if ($.gtB($.add(t1.get$z(), imp.z), 0.0)) {
        t4.solve22ToOut$2(Cdot1.negateLocal$0(), temp);
        imp.x = temp.x;
        imp.y = temp.y;
        imp.z = $.neg(t1.get$z());
        t1.set$x($.add(t1.get$x(), temp.x));
        t1.set$y($.add(t1.get$y(), temp.y));
        t1.set$z(0.0);
      }
    }
    var P = $.Vector$(0, 0);
    P.setCoords$2(imp.x, imp.y);
    temp.setFrom$1(P).mulLocal$1(m1);
    v1.subLocal$1(temp);
    w1 = $.sub(w1, $.mul(i1, $.add($.sub($.mul(r1.x, P.y), $.mul(r1.y, P.x)), imp.z)));
    temp.setFrom$1(P).mulLocal$1(m2);
    v2.addLocal$1(temp);
    w2 = $.add(w2, $.mul(i2, $.add($.sub($.mul(r2.x, P.y), $.mul(r2.y, P.x)), imp.z)));
  } else {
    r1.setFrom$1(t2).subLocal$1(b1.get$localCenter());
    r2.setFrom$1(t3).subLocal$1(b2.get$localCenter());
    $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
    $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
    Cdot = $.Vector$(0, 0);
    imp = $.Vector$(0, 0);
    $.Vector_crossNumAndVectorToOut(w1, r1, temp);
    $.Vector_crossNumAndVectorToOut(w2, r2, Cdot);
    Cdot.addLocal$1(v2).subLocal$1(v1).subLocal$1(temp);
    t4.solve22ToOut$2(Cdot.negateLocal$0(), imp);
    t1 = this.impulse;
    t1.set$x($.add(t1.get$x(), imp.x));
    t1.set$y($.add(t1.get$y(), imp.y));
    temp.setFrom$1(imp).mulLocal$1(m1);
    v1.subLocal$1(temp);
    w1 = $.sub(w1, $.mul(i1, $.sub($.mul(r1.x, imp.y), $.mul(r1.y, imp.x))));
    temp.setFrom$1(imp).mulLocal$1(m2);
    v2.addLocal$1(temp);
    w2 = $.add(w2, $.mul(i2, $.sub($.mul(r2.x, imp.y), $.mul(r2.y, imp.x))));
  }
  b1.set$angularVelocity(w1);
  b2.set$angularVelocity(w2);
},
 solvePositionConstraints$1: function(baumgarte) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  if (this._enableLimit === true) {
    var t1 = this.limitState;
    if (t1 !== (t1 | 0))
      return this.solvePositionConstraints$1$bailout(1, b2, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t3 = !(t1 === 0);
    t1 = t3;
  } else
    t1 = false;
  if (t1) {
    t1 = b2.get$sweep().get$angle();
    if (typeof t1 !== 'number')
      return this.solvePositionConstraints$1$bailout(2, b2, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t3 = b1.get$sweep().get$angle();
    if (typeof t3 !== 'number')
      return this.solvePositionConstraints$1$bailout(3, b2, t1, t3, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t3 = t1 - t3;
    t1 = this.referenceAngle;
    if (typeof t1 !== 'number')
      return this.solvePositionConstraints$1$bailout(4, b2, t1, t3, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var angle = t3 - t1;
    t1 = this.limitState;
    if (t1 !== (t1 | 0))
      return this.solvePositionConstraints$1$bailout(5, b2, angle, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t1 === 3) {
      t1 = this.lowerAngle;
      if (typeof t1 !== 'number')
        return this.solvePositionConstraints$1$bailout(6, b2, angle, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      var C = $.max(-0.13962634015954636, $.min(angle - t1, 0.13962634015954636));
      t3 = this.motorMass;
      if (typeof t3 !== 'number')
        return this.solvePositionConstraints$1$bailout(7, b2, t3, C, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      var limitImpulse = -t3 * C;
      var angularError = $.abs(C);
      if (typeof angularError !== 'number')
        return this.solvePositionConstraints$1$bailout(8, b2, limitImpulse, angularError, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    } else if (t1 === 1) {
      t1 = this.lowerAngle;
      if (typeof t1 !== 'number')
        return this.solvePositionConstraints$1$bailout(10, b2, angle, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      C = angle - t1;
      angularError = -C;
      var C0 = $.max(-0.13962634015954636, $.min(C + 0.03490658503988659, 0.0));
      t1 = this.motorMass;
      if (typeof t1 !== 'number')
        return this.solvePositionConstraints$1$bailout(11, b2, C0, angularError, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      limitImpulse = -t1 * C0;
    } else if (t1 === 2) {
      t1 = this.upperAngle;
      if (typeof t1 !== 'number')
        return this.solvePositionConstraints$1$bailout(13, b2, angle, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      C = angle - t1;
      C0 = $.max(0.0, $.min(C - 0.03490658503988659, 0.13962634015954636));
      t1 = this.motorMass;
      if (typeof t1 !== 'number')
        return this.solvePositionConstraints$1$bailout(14, b2, C, C0, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      limitImpulse = -t1 * C0;
      angularError = C;
    } else {
      limitImpulse = 0.0;
      angularError = 0.0;
    }
    t1 = b1.get$sweep();
    var t2 = t1.get$angle();
    if (typeof t2 !== 'number')
      return this.solvePositionConstraints$1$bailout(15, limitImpulse, angularError, b1, b2, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t4 = b1.get$invInertia();
    if (typeof t4 !== 'number')
      return this.solvePositionConstraints$1$bailout(16, limitImpulse, angularError, b1, b2, t2, t1, t4, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t1.set$angle(t2 - t4 * limitImpulse);
    t1 = b2.get$sweep();
    var t6 = t1.get$angle();
    if (typeof t6 !== 'number')
      return this.solvePositionConstraints$1$bailout(17, t6, limitImpulse, angularError, b1, b2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t8 = b2.get$invInertia();
    if (typeof t8 !== 'number')
      return this.solvePositionConstraints$1$bailout(18, t6, t8, limitImpulse, angularError, b1, b2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t1.set$angle(t6 + t8 * limitImpulse);
    b1.synchronizeTransform$0();
    b2.synchronizeTransform$0();
  } else
    angularError = 0.0;
  var imp = $.Vector$(0, 0);
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  C = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
  C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
  var positionError = $.get$length(C);
  if (typeof positionError !== 'number')
    return this.solvePositionConstraints$1$bailout(19, r2, C, b1, b2, angularError, positionError, imp, r1, 0, 0, 0, 0, 0, 0, 0, 0);
  var invMass1 = b1.get$invMass();
  if (typeof invMass1 !== 'number')
    return this.solvePositionConstraints$1$bailout(20, imp, r2, C, b1, b2, angularError, positionError, invMass1, r1, 0, 0, 0, 0, 0, 0, 0);
  var invMass2 = b2.get$invMass();
  if (typeof invMass2 !== 'number')
    return this.solvePositionConstraints$1$bailout(21, r1, r2, C, b1, b2, angularError, imp, positionError, invMass1, invMass2, 0, 0, 0, 0, 0, 0);
  var invI1 = b1.get$invInertia();
  if (typeof invI1 !== 'number')
    return this.solvePositionConstraints$1$bailout(22, invI1, r2, r1, C, b1, b2, angularError, imp, positionError, invMass1, invMass2, 0, 0, 0, 0, 0);
  var invI2 = b2.get$invInertia();
  if (typeof invI2 !== 'number')
    return this.solvePositionConstraints$1$bailout(23, b1, b2, angularError, positionError, invMass1, r1, invI1, r2, invI2, C, invMass2, imp, 0, 0, 0, 0);
  t1 = C.get$lengthSquared();
  if (typeof t1 !== 'number')
    return this.solvePositionConstraints$1$bailout(24, b1, b2, angularError, positionError, invMass1, invMass2, invI1, r2, invI2, C, r1, imp, t1, 0, 0, 0);
  if (t1 > 0.0025000000000000005) {
    var u = $.Vector$(0, 0);
    var m = invMass1 + invMass2;
    if (m > 0.0)
      m = 1.0 / m;
    imp.setFrom$1(C).negateLocal$0().mulLocal$1(m);
    u.setFrom$1(imp).mulLocal$1(0.5 * invMass1);
    b1.get$sweep().get$center().subLocal$1(u);
    u.setFrom$1(imp).mulLocal$1(0.5 * invMass2);
    b2.get$sweep().get$center().addLocal$1(u);
    C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
    C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
  }
  var K1 = $.Matrix22$(null, null);
  t1 = invMass1 + invMass2;
  t2 = K1.col1;
  t2.set$x(t1);
  t3 = K1.col2;
  t3.set$x(0.0);
  t2.set$y(0.0);
  t3.set$y(t1);
  var K2 = $.Matrix22$(null, null);
  t1 = r1.y;
  if (typeof t1 !== 'number')
    return this.solvePositionConstraints$1$bailout(25, t1, b1, b2, K1, angularError, positionError, imp, r1, invI1, r2, invI2, C, K2, 0, 0, 0);
  t2 = invI1 * t1;
  t1 = t2 * t1;
  t2 = K2.col1;
  t2.set$x(t1);
  t1 = -invI1;
  t4 = r1.x;
  if (typeof t4 !== 'number')
    return this.solvePositionConstraints$1$bailout(27, t1, t2, t4, b1, b2, K1, angularError, positionError, imp, r1, invI1, r2, invI2, C, K2, 0);
  t4 = t1 * t4;
  t6 = r1.y;
  if (typeof t6 !== 'number')
    return this.solvePositionConstraints$1$bailout(28, t2, t4, b1, b2, K1, angularError, positionError, imp, r1, invI1, r2, invI2, C, t6, K2, 0);
  t6 = t4 * t6;
  t4 = K2.col2;
  t4.set$x(t6);
  t6 = r1.x;
  if (typeof t6 !== 'number')
    return this.solvePositionConstraints$1$bailout(29, t2, b1, b2, t4, K1, angularError, t1, positionError, imp, r1, invI1, r2, invI2, C, K2, t6);
  t6 = t1 * t6;
  t1 = r1.y;
  if (typeof t1 !== 'number')
    return this.solvePositionConstraints$1$bailout(30, t2, b1, b2, t4, K1, angularError, positionError, imp, r1, invI1, r2, invI2, C, t1, t6, K2);
  t2.set$y(t6 * t1);
  t2 = r1.x;
  if (typeof t2 !== 'number')
    return this.solvePositionConstraints$1$bailout(31, b1, b2, t4, K1, angularError, t2, positionError, imp, r1, invI1, r2, invI2, C, K2, 0, 0);
  var t11 = invI1 * t2;
  t4.set$y(t11 * t2);
  var K3 = $.Matrix22$(null, null);
  t4 = r2.y;
  if (typeof t4 !== 'number')
    return this.solvePositionConstraints$1$bailout(33, b1, b2, K1, angularError, positionError, imp, t4, r1, r2, invI2, C, K2, K3, 0, 0, 0);
  var t13 = invI2 * t4;
  t4 = t13 * t4;
  t13 = K3.col1;
  t13.set$x(t4);
  t4 = -invI2;
  var t14 = r2.x;
  if (typeof t14 !== 'number')
    return this.solvePositionConstraints$1$bailout(35, b1, b2, t4, K1, angularError, positionError, imp, r1, r2, invI2, C, t13, t14, K2, K3, 0);
  t14 = t4 * t14;
  var t16 = r2.y;
  if (typeof t16 !== 'number')
    return this.solvePositionConstraints$1$bailout(36, b1, b2, K1, angularError, t14, positionError, imp, r1, r2, invI2, C, t13, t16, K2, K3, 0);
  t16 = t14 * t16;
  t14 = K3.col2;
  t14.set$x(t16);
  t16 = r2.x;
  if (typeof t16 !== 'number')
    return this.solvePositionConstraints$1$bailout(37, b1, b2, K1, angularError, positionError, imp, r1, r2, invI2, C, t14, t4, t16, t13, K2, K3);
  t16 = t4 * t16;
  t4 = r2.y;
  if (typeof t4 !== 'number')
    return this.solvePositionConstraints$1$bailout(38, b1, b2, K1, angularError, positionError, imp, r1, r2, invI2, C, t14, t16, t4, t13, K2, K3);
  t13.set$y(t16 * t4);
  t13 = r2.x;
  if (typeof t13 !== 'number')
    return this.solvePositionConstraints$1$bailout(39, b1, b2, K1, angularError, positionError, imp, r1, r2, invI2, C, t14, K2, t13, K3, 0, 0);
  var t21 = invI2 * t13;
  t14.set$y(t21 * t13);
  K1.addLocal$1(K2).addLocal$1(K3);
  K1.solveToOut$2(C.negateLocal$0(), imp);
  C.setFrom$1(imp).mulLocal$1(b1.get$invMass());
  b1.get$sweep().get$center().subLocal$1(C);
  t14 = b1.get$sweep();
  var t22 = t14.get$angle();
  if (typeof t22 !== 'number')
    return this.solvePositionConstraints$1$bailout(41, t14, r2, r1, C, b1, b2, angularError, positionError, imp, t22, 0, 0, 0, 0, 0, 0);
  var t24 = b1.get$invInertia();
  if (typeof t24 !== 'number')
    return this.solvePositionConstraints$1$bailout(42, t14, r2, t24, C, r1, b1, b2, angularError, positionError, imp, t22, 0, 0, 0, 0, 0);
  var t26 = r1.x;
  if (typeof t26 !== 'number')
    return this.solvePositionConstraints$1$bailout(43, b1, b2, angularError, t14, positionError, t24, r1, r2, C, t22, imp, t26, 0, 0, 0, 0);
  var t28 = imp.y;
  if (typeof t28 !== 'number')
    return this.solvePositionConstraints$1$bailout(44, b1, b2, angularError, t14, positionError, t24, r1, r2, C, t22, imp, t26, t28, 0, 0, 0);
  t28 = t26 * t28;
  t26 = r1.y;
  if (typeof t26 !== 'number')
    return this.solvePositionConstraints$1$bailout(45, b1, b2, angularError, t14, positionError, t24, imp, r2, C, t28, t22, t26, 0, 0, 0, 0);
  var t31 = imp.x;
  if (typeof t31 !== 'number')
    return this.solvePositionConstraints$1$bailout(46, b1, b2, angularError, t14, positionError, t24, imp, r2, C, t28, t22, t26, t31, 0, 0, 0);
  t14.set$angle(t22 - t24 * (t28 - t26 * t31));
  C.setFrom$1(imp).mulLocal$1(b2.get$invMass());
  b2.get$sweep().get$center().addLocal$1(C);
  t14 = b2.get$sweep();
  var t33 = t14.get$angle();
  if (typeof t33 !== 'number')
    return this.solvePositionConstraints$1$bailout(47, r2, t14, t33, b1, b2, angularError, positionError, imp, 0, 0, 0, 0, 0, 0, 0, 0);
  var t35 = b2.get$invInertia();
  if (typeof t35 !== 'number')
    return this.solvePositionConstraints$1$bailout(48, r2, t14, t33, t35, b2, b1, angularError, positionError, imp, 0, 0, 0, 0, 0, 0, 0);
  var t37 = r2.x;
  if (typeof t37 !== 'number')
    return this.solvePositionConstraints$1$bailout(49, r2, t14, t33, t35, b2, b1, angularError, positionError, imp, t37, 0, 0, 0, 0, 0, 0);
  var t39 = imp.y;
  if (typeof t39 !== 'number')
    return this.solvePositionConstraints$1$bailout(50, t39, r2, t14, t33, b1, b2, t35, angularError, positionError, imp, t37, 0, 0, 0, 0, 0);
  t39 = t37 * t39;
  t37 = r2.y;
  if (typeof t37 !== 'number')
    return this.solvePositionConstraints$1$bailout(51, t37, t14, t33, b1, b2, t35, angularError, t39, positionError, imp, 0, 0, 0, 0, 0, 0);
  var t42 = imp.x;
  if (typeof t42 !== 'number')
    return this.solvePositionConstraints$1$bailout(52, t37, t42, t14, t33, b1, b2, t35, angularError, t39, positionError, 0, 0, 0, 0, 0, 0);
  t14.set$angle(t33 + t35 * (t39 - t37 * t42));
  b1.synchronizeTransform$0();
  b2.synchronizeTransform$0();
  return positionError <= 0.005 && angularError <= 0.03490658503988659;
},
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15) {
  switch (state) {
    case 1:
      b2 = env0;
      t1 = env1;
      b1 = env2;
      break;
    case 2:
      b2 = env0;
      t1 = env1;
      b1 = env2;
      break;
    case 3:
      b2 = env0;
      t1 = env1;
      t3 = env2;
      b1 = env3;
      break;
    case 4:
      b2 = env0;
      t1 = env1;
      t3 = env2;
      b1 = env3;
      break;
    case 5:
      b2 = env0;
      angle = env1;
      t1 = env2;
      b1 = env3;
      break;
    case 6:
      b2 = env0;
      angle = env1;
      t1 = env2;
      b1 = env3;
      break;
    case 7:
      b2 = env0;
      t3 = env1;
      C = env2;
      b1 = env3;
      break;
    case 8:
      b2 = env0;
      limitImpulse = env1;
      angularError = env2;
      b1 = env3;
      break;
    case 9:
      b2 = env0;
      angle = env1;
      t1 = env2;
      b1 = env3;
      break;
    case 10:
      b2 = env0;
      angle = env1;
      t1 = env2;
      b1 = env3;
      break;
    case 11:
      b2 = env0;
      C0 = env1;
      angularError = env2;
      t1 = env3;
      b1 = env4;
      break;
    case 12:
      b2 = env0;
      angle = env1;
      t1 = env2;
      b1 = env3;
      break;
    case 13:
      b2 = env0;
      angle = env1;
      t1 = env2;
      b1 = env3;
      break;
    case 14:
      b2 = env0;
      C = env1;
      C0 = env2;
      t1 = env3;
      b1 = env4;
      break;
    case 15:
      limitImpulse = env0;
      angularError = env1;
      b1 = env2;
      b2 = env3;
      t2 = env4;
      t1 = env5;
      break;
    case 16:
      limitImpulse = env0;
      angularError = env1;
      b1 = env2;
      b2 = env3;
      t2 = env4;
      t1 = env5;
      t4 = env6;
      break;
    case 17:
      t6 = env0;
      limitImpulse = env1;
      angularError = env2;
      b1 = env3;
      b2 = env4;
      t1 = env5;
      break;
    case 18:
      t6 = env0;
      t8 = env1;
      limitImpulse = env2;
      angularError = env3;
      b1 = env4;
      b2 = env5;
      t1 = env6;
      break;
    case 19:
      r2 = env0;
      C = env1;
      b1 = env2;
      b2 = env3;
      angularError = env4;
      positionError = env5;
      imp = env6;
      r1 = env7;
      break;
    case 20:
      imp = env0;
      r2 = env1;
      C = env2;
      b1 = env3;
      b2 = env4;
      angularError = env5;
      positionError = env6;
      invMass1 = env7;
      r1 = env8;
      break;
    case 21:
      r1 = env0;
      r2 = env1;
      C = env2;
      b1 = env3;
      b2 = env4;
      angularError = env5;
      imp = env6;
      positionError = env7;
      invMass1 = env8;
      invMass2 = env9;
      break;
    case 22:
      invI1 = env0;
      r2 = env1;
      r1 = env2;
      C = env3;
      b1 = env4;
      b2 = env5;
      angularError = env6;
      imp = env7;
      positionError = env8;
      invMass1 = env9;
      invMass2 = env10;
      break;
    case 23:
      b1 = env0;
      b2 = env1;
      angularError = env2;
      positionError = env3;
      invMass1 = env4;
      r1 = env5;
      invI1 = env6;
      r2 = env7;
      invI2 = env8;
      C = env9;
      invMass2 = env10;
      imp = env11;
      break;
    case 24:
      b1 = env0;
      b2 = env1;
      angularError = env2;
      positionError = env3;
      invMass1 = env4;
      invMass2 = env5;
      invI1 = env6;
      r2 = env7;
      invI2 = env8;
      C = env9;
      r1 = env10;
      imp = env11;
      t1 = env12;
      break;
    case 25:
      t1 = env0;
      b1 = env1;
      b2 = env2;
      K1 = env3;
      angularError = env4;
      positionError = env5;
      imp = env6;
      r1 = env7;
      invI1 = env8;
      r2 = env9;
      invI2 = env10;
      C = env11;
      K2 = env12;
      break;
    case 26:
      t3 = env0;
      b1 = env1;
      b2 = env2;
      K1 = env3;
      angularError = env4;
      positionError = env5;
      imp = env6;
      r1 = env7;
      invI1 = env8;
      r2 = env9;
      invI2 = env10;
      C = env11;
      K2 = env12;
      t1 = env13;
      break;
    case 27:
      t3 = env0;
      t1 = env1;
      t5 = env2;
      b1 = env3;
      b2 = env4;
      K1 = env5;
      angularError = env6;
      positionError = env7;
      imp = env8;
      r1 = env9;
      invI1 = env10;
      r2 = env11;
      invI2 = env12;
      C = env13;
      K2 = env14;
      break;
    case 28:
      t1 = env0;
      t5 = env1;
      b1 = env2;
      b2 = env3;
      K1 = env4;
      angularError = env5;
      positionError = env6;
      imp = env7;
      r1 = env8;
      invI1 = env9;
      r2 = env10;
      invI2 = env11;
      C = env12;
      t3 = env13;
      K2 = env14;
      break;
    case 29:
      t1 = env0;
      b1 = env1;
      b2 = env2;
      t5 = env3;
      K1 = env4;
      angularError = env5;
      t3 = env6;
      positionError = env7;
      imp = env8;
      r1 = env9;
      invI1 = env10;
      r2 = env11;
      invI2 = env12;
      C = env13;
      K2 = env14;
      t8 = env15;
      break;
    case 30:
      t1 = env0;
      b1 = env1;
      b2 = env2;
      t5 = env3;
      K1 = env4;
      angularError = env5;
      positionError = env6;
      imp = env7;
      r1 = env8;
      invI1 = env9;
      r2 = env10;
      invI2 = env11;
      C = env12;
      t3 = env13;
      t8 = env14;
      K2 = env15;
      break;
    case 31:
      b1 = env0;
      b2 = env1;
      t5 = env2;
      K1 = env3;
      angularError = env4;
      t1 = env5;
      positionError = env6;
      imp = env7;
      r1 = env8;
      invI1 = env9;
      r2 = env10;
      invI2 = env11;
      C = env12;
      K2 = env13;
      break;
    case 32:
      b1 = env0;
      b2 = env1;
      t5 = env2;
      K1 = env3;
      angularError = env4;
      t12 = env5;
      positionError = env6;
      r1 = env7;
      imp = env8;
      r2 = env9;
      invI2 = env10;
      C = env11;
      t1 = env12;
      K2 = env13;
      break;
    case 33:
      b1 = env0;
      b2 = env1;
      K1 = env2;
      angularError = env3;
      positionError = env4;
      imp = env5;
      t5 = env6;
      r1 = env7;
      r2 = env8;
      invI2 = env9;
      C = env10;
      K2 = env11;
      K3 = env12;
      break;
    case 34:
      t5 = env0;
      b1 = env1;
      b2 = env2;
      K1 = env3;
      angularError = env4;
      positionError = env5;
      imp = env6;
      r1 = env7;
      t15 = env8;
      r2 = env9;
      invI2 = env10;
      C = env11;
      K2 = env12;
      K3 = env13;
      break;
    case 35:
      b1 = env0;
      b2 = env1;
      t15 = env2;
      K1 = env3;
      angularError = env4;
      positionError = env5;
      imp = env6;
      r1 = env7;
      r2 = env8;
      invI2 = env9;
      C = env10;
      t5 = env11;
      t17 = env12;
      K2 = env13;
      K3 = env14;
      break;
    case 36:
      b1 = env0;
      b2 = env1;
      K1 = env2;
      angularError = env3;
      t17 = env4;
      positionError = env5;
      imp = env6;
      r1 = env7;
      r2 = env8;
      invI2 = env9;
      C = env10;
      t5 = env11;
      t15 = env12;
      K2 = env13;
      K3 = env14;
      break;
    case 37:
      b1 = env0;
      b2 = env1;
      K1 = env2;
      angularError = env3;
      positionError = env4;
      imp = env5;
      r1 = env6;
      r2 = env7;
      invI2 = env8;
      C = env9;
      t17 = env10;
      t15 = env11;
      t20 = env12;
      t5 = env13;
      K2 = env14;
      K3 = env15;
      break;
    case 38:
      b1 = env0;
      b2 = env1;
      K1 = env2;
      angularError = env3;
      positionError = env4;
      imp = env5;
      r1 = env6;
      r2 = env7;
      invI2 = env8;
      C = env9;
      t17 = env10;
      t20 = env11;
      t15 = env12;
      t5 = env13;
      K2 = env14;
      K3 = env15;
      break;
    case 39:
      b1 = env0;
      b2 = env1;
      K1 = env2;
      angularError = env3;
      positionError = env4;
      imp = env5;
      r1 = env6;
      r2 = env7;
      invI2 = env8;
      C = env9;
      t17 = env10;
      K2 = env11;
      t5 = env12;
      K3 = env13;
      break;
    case 40:
      b1 = env0;
      b2 = env1;
      K1 = env2;
      angularError = env3;
      positionError = env4;
      imp = env5;
      r1 = env6;
      r2 = env7;
      C = env8;
      t17 = env9;
      K2 = env10;
      t24 = env11;
      t5 = env12;
      K3 = env13;
      break;
    case 41:
      t17 = env0;
      r2 = env1;
      r1 = env2;
      C = env3;
      b1 = env4;
      b2 = env5;
      angularError = env6;
      positionError = env7;
      imp = env8;
      t26 = env9;
      break;
    case 42:
      t17 = env0;
      r2 = env1;
      t28 = env2;
      C = env3;
      r1 = env4;
      b1 = env5;
      b2 = env6;
      angularError = env7;
      positionError = env8;
      imp = env9;
      t26 = env10;
      break;
    case 43:
      b1 = env0;
      b2 = env1;
      angularError = env2;
      t17 = env3;
      positionError = env4;
      t28 = env5;
      r1 = env6;
      r2 = env7;
      C = env8;
      t26 = env9;
      imp = env10;
      t30 = env11;
      break;
    case 44:
      b1 = env0;
      b2 = env1;
      angularError = env2;
      t17 = env3;
      positionError = env4;
      t28 = env5;
      r1 = env6;
      r2 = env7;
      C = env8;
      t26 = env9;
      imp = env10;
      t30 = env11;
      t32 = env12;
      break;
    case 45:
      b1 = env0;
      b2 = env1;
      angularError = env2;
      t17 = env3;
      positionError = env4;
      t28 = env5;
      imp = env6;
      r2 = env7;
      C = env8;
      t32 = env9;
      t26 = env10;
      t30 = env11;
      break;
    case 46:
      b1 = env0;
      b2 = env1;
      angularError = env2;
      t17 = env3;
      positionError = env4;
      t28 = env5;
      imp = env6;
      r2 = env7;
      C = env8;
      t32 = env9;
      t26 = env10;
      t30 = env11;
      t35 = env12;
      break;
    case 47:
      r2 = env0;
      t17 = env1;
      t37 = env2;
      b1 = env3;
      b2 = env4;
      angularError = env5;
      positionError = env6;
      imp = env7;
      break;
    case 48:
      r2 = env0;
      t17 = env1;
      t37 = env2;
      t39 = env3;
      b2 = env4;
      b1 = env5;
      angularError = env6;
      positionError = env7;
      imp = env8;
      break;
    case 49:
      r2 = env0;
      t17 = env1;
      t37 = env2;
      t39 = env3;
      b2 = env4;
      b1 = env5;
      angularError = env6;
      positionError = env7;
      imp = env8;
      t41 = env9;
      break;
    case 50:
      t43 = env0;
      r2 = env1;
      t17 = env2;
      t37 = env3;
      b1 = env4;
      b2 = env5;
      t39 = env6;
      angularError = env7;
      positionError = env8;
      imp = env9;
      t41 = env10;
      break;
    case 51:
      t41 = env0;
      t17 = env1;
      t37 = env2;
      b1 = env3;
      b2 = env4;
      t39 = env5;
      angularError = env6;
      t43 = env7;
      positionError = env8;
      imp = env9;
      break;
    case 52:
      t41 = env0;
      t46 = env1;
      t17 = env2;
      t37 = env3;
      b1 = env4;
      b2 = env5;
      t39 = env6;
      angularError = env7;
      t43 = env8;
      positionError = env9;
      break;
  }
  switch (state) {
    case 0:
      var b1 = this.bodyA;
      var b2 = this.bodyB;
    case 1:
      if (state === 1 || state === 0 && this._enableLimit === true)
        switch (state) {
          case 0:
            var t1 = this.limitState;
          case 1:
            state = 0;
            var t3 = !$.eqB(t1, 0);
            t1 = t3;
        }
      else
        t1 = false;
    default:
      if (state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = b2.get$sweep().get$angle();
          case 2:
            state = 0;
            t3 = b1.get$sweep().get$angle();
          case 3:
            state = 0;
            t3 = $.sub(t1, t3);
            t1 = this.referenceAngle;
          case 4:
            state = 0;
            var angle = $.sub(t3, t1);
            t1 = this.limitState;
          case 5:
            state = 0;
          default:
            if (state === 8 || state === 7 || state === 6 || state === 0 && $.eqB(t1, 3))
              switch (state) {
                case 0:
                  t1 = this.lowerAngle;
                case 6:
                  state = 0;
                  var C = $.max(-0.13962634015954636, $.min($.sub(angle, t1), 0.13962634015954636));
                  t3 = this.motorMass;
                case 7:
                  state = 0;
                  var limitImpulse = $.mul($.neg(t3), C);
                  var angularError = $.abs(C);
                case 8:
                  state = 0;
              }
            else
              switch (state) {
                case 0:
                  t1 = this.limitState;
                case 9:
                  state = 0;
                default:
                  if (state === 11 || state === 10 || state === 0 && $.eqB(t1, 1))
                    switch (state) {
                      case 0:
                        t1 = this.lowerAngle;
                      case 10:
                        state = 0;
                        C = $.sub(angle, t1);
                        angularError = $.neg(C);
                        var C0 = $.max(-0.13962634015954636, $.min($.add(C, 0.03490658503988659), 0.0));
                        t1 = this.motorMass;
                      case 11:
                        state = 0;
                        limitImpulse = $.mul($.neg(t1), C0);
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this.limitState;
                      case 12:
                        state = 0;
                      default:
                        if (state === 14 || state === 13 || state === 0 && $.eqB(t1, 2))
                          switch (state) {
                            case 0:
                              t1 = this.upperAngle;
                            case 13:
                              state = 0;
                              C = $.sub(angle, t1);
                              C0 = $.max(0.0, $.min($.sub(C, 0.03490658503988659), 0.13962634015954636));
                              t1 = this.motorMass;
                            case 14:
                              state = 0;
                              limitImpulse = $.mul($.neg(t1), C0);
                              angularError = C;
                          }
                        else {
                          limitImpulse = 0.0;
                          angularError = 0.0;
                        }
                    }
              }
            t1 = b1.get$sweep();
            var t2 = t1.get$angle();
          case 15:
            state = 0;
            var t4 = b1.get$invInertia();
          case 16:
            state = 0;
            t1.set$angle($.sub(t2, $.mul(t4, limitImpulse)));
            t1 = b2.get$sweep();
            var t6 = t1.get$angle();
          case 17:
            state = 0;
            var t8 = b2.get$invInertia();
          case 18:
            state = 0;
            t1.set$angle($.add(t6, $.mul(t8, limitImpulse)));
            b1.synchronizeTransform$0();
            b2.synchronizeTransform$0();
        }
      else
        angularError = 0.0;
      var imp = $.Vector$(0, 0);
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      C = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
      C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
      var positionError = $.get$length(C);
    case 19:
      state = 0;
      var invMass1 = b1.get$invMass();
    case 20:
      state = 0;
      var invMass2 = b2.get$invMass();
    case 21:
      state = 0;
      var invI1 = b1.get$invInertia();
    case 22:
      state = 0;
      var invI2 = b2.get$invInertia();
    case 23:
      state = 0;
      t1 = C.get$lengthSquared();
    case 24:
      state = 0;
      if ($.gtB(t1, 0.0025000000000000005)) {
        var u = $.Vector$(0, 0);
        var m = $.add(invMass1, invMass2);
        if ($.gtB(m, 0.0)) {
          if (typeof m !== 'number')
            throw $.iae(m);
          m = 1.0 / m;
        }
        imp.setFrom$1(C).negateLocal$0().mulLocal$1(m);
        t1 = u.setFrom$1(imp);
        if (typeof invMass1 !== 'number')
          throw $.iae(invMass1);
        t1.mulLocal$1(0.5 * invMass1);
        b1.get$sweep().get$center().subLocal$1(u);
        t1 = u.setFrom$1(imp);
        if (typeof invMass2 !== 'number')
          throw $.iae(invMass2);
        t1.mulLocal$1(0.5 * invMass2);
        b2.get$sweep().get$center().addLocal$1(u);
        C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
        C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
      }
      var K1 = $.Matrix22$(null, null);
      t1 = $.add(invMass1, invMass2);
      t2 = K1.col1;
      t2.set$x(t1);
      t1 = K1.col2;
      t1.set$x(0.0);
      t2.set$y(0.0);
      t1.set$y($.add(invMass1, invMass2));
      var K2 = $.Matrix22$(null, null);
      t1 = r1.y;
    case 25:
      state = 0;
      t1 = $.mul(invI1, t1);
      t3 = r1.y;
    case 26:
      state = 0;
      t3 = $.mul(t1, t3);
      t1 = K2.col1;
      t1.set$x(t3);
      t3 = $.neg(invI1);
      var t5 = r1.x;
    case 27:
      state = 0;
      t5 = $.mul(t3, t5);
      t3 = r1.y;
    case 28:
      state = 0;
      t3 = $.mul(t5, t3);
      t5 = K2.col2;
      t5.set$x(t3);
      t3 = $.neg(invI1);
      t8 = r1.x;
    case 29:
      state = 0;
      t8 = $.mul(t3, t8);
      t3 = r1.y;
    case 30:
      state = 0;
      t1.set$y($.mul(t8, t3));
      t1 = r1.x;
    case 31:
      state = 0;
      t1 = $.mul(invI1, t1);
      var t12 = r1.x;
    case 32:
      state = 0;
      t5.set$y($.mul(t1, t12));
      var K3 = $.Matrix22$(null, null);
      t5 = r2.y;
    case 33:
      state = 0;
      t5 = $.mul(invI2, t5);
      var t15 = r2.y;
    case 34:
      state = 0;
      t15 = $.mul(t5, t15);
      t5 = K3.col1;
      t5.set$x(t15);
      t15 = $.neg(invI2);
      var t17 = r2.x;
    case 35:
      state = 0;
      t17 = $.mul(t15, t17);
      t15 = r2.y;
    case 36:
      state = 0;
      t15 = $.mul(t17, t15);
      t17 = K3.col2;
      t17.set$x(t15);
      t15 = $.neg(invI2);
      var t20 = r2.x;
    case 37:
      state = 0;
      t20 = $.mul(t15, t20);
      t15 = r2.y;
    case 38:
      state = 0;
      t5.set$y($.mul(t20, t15));
      t5 = r2.x;
    case 39:
      state = 0;
      t5 = $.mul(invI2, t5);
      var t24 = r2.x;
    case 40:
      state = 0;
      t17.set$y($.mul(t5, t24));
      K1.addLocal$1(K2).addLocal$1(K3);
      K1.solveToOut$2(C.negateLocal$0(), imp);
      C.setFrom$1(imp).mulLocal$1(b1.get$invMass());
      b1.get$sweep().get$center().subLocal$1(C);
      t17 = b1.get$sweep();
      var t26 = t17.get$angle();
    case 41:
      state = 0;
      var t28 = b1.get$invInertia();
    case 42:
      state = 0;
      var t30 = r1.x;
    case 43:
      state = 0;
      var t32 = imp.y;
    case 44:
      state = 0;
      t32 = $.mul(t30, t32);
      t30 = r1.y;
    case 45:
      state = 0;
      var t35 = imp.x;
    case 46:
      state = 0;
      t17.set$angle($.sub(t26, $.mul(t28, $.sub(t32, $.mul(t30, t35)))));
      C.setFrom$1(imp).mulLocal$1(b2.get$invMass());
      b2.get$sweep().get$center().addLocal$1(C);
      t17 = b2.get$sweep();
      var t37 = t17.get$angle();
    case 47:
      state = 0;
      var t39 = b2.get$invInertia();
    case 48:
      state = 0;
      var t41 = r2.x;
    case 49:
      state = 0;
      var t43 = imp.y;
    case 50:
      state = 0;
      t43 = $.mul(t41, t43);
      t41 = r2.y;
    case 51:
      state = 0;
      var t46 = imp.x;
    case 52:
      state = 0;
      t17.set$angle($.add(t37, $.mul(t39, $.sub(t43, $.mul(t41, t46)))));
      b1.synchronizeTransform$0();
      b2.synchronizeTransform$0();
      return $.leB(positionError, 0.005) && $.leB(angularError, 0.03490658503988659);
  }
},
 get$motorSpeed: function() {
  return this._motorSpeed;
},
 get$maxMotorTorque: function() {
  return this._maxMotorTorque;
},
 RevoluteJoint$1: function(def) {
  this.localAnchor1.setFrom$1(def.get$localAnchorA());
  this.localAnchor2.setFrom$1(def.get$localAnchorB());
  this.referenceAngle = def.get$referenceAngle();
  this._motorImpulse = 0;
  this.lowerAngle = def.get$lowerAngle();
  this.upperAngle = def.get$upperAngle();
  this._maxMotorTorque = def.get$maxMotorTorque();
  this._motorSpeed = def.get$motorSpeed();
  this._enableLimit = def.get$enableLimit();
  this._enableMotor = def.get$enableMotor();
}
};

$$.RevoluteJointDef = {"":
 ["localAnchorA?", "localAnchorB?", "referenceAngle?", "enableLimit?", "lowerAngle?", "upperAngle?", "enableMotor?", "motorSpeed?", "maxMotorTorque?", "type", "userData", "bodyA", "bodyB", "collideConnected"],
 "super": "JointDef",
 initialize$3: function(b1, b2, anchor) {
  this.bodyA = b1;
  this.bodyB = b2;
  this.bodyA.getLocalPointToOut$2(anchor, this.localAnchorA);
  this.bodyB.getLocalPointToOut$2(anchor, this.localAnchorB);
  this.referenceAngle = $.sub(this.bodyA.get$angle(), this.bodyB.get$angle());
},
 RevoluteJointDef$0: function() {
  this.type = 1;
}
};

$$.DefaultWorldPool = {"":
 ["collision?", "timeOfImpact?", "distance="],
 "super": "Object",
 timeOfImpact$2: function(arg0, arg1) { return this.timeOfImpact.call$2(arg0, arg1); },
 distance$3: function(arg0, arg1, arg2) { return this.distance.call$3(arg0, arg1, arg2); },
 getCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$('CircleContact');
  for (var i = 0; i < 10; ++i)
    queue.addFirst$1($.CircleContact$(this));
  return queue;
},
 getPolyCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$('PolygonAndCircleContact');
  for (var i = 0; i < 10; ++i)
    queue.addFirst$1($.PolygonAndCircleContact$(this));
  return queue;
},
 getPolyContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$('PolygonContact');
  for (var i = 0; i < 10; ++i)
    queue.addFirst$1($.PolygonContact$(this));
  return queue;
},
 DefaultWorldPool$0: function() {
  this.distance = $.Distance$_construct();
  this.collision = $.Collision$_construct(this);
  this.timeOfImpact = $.TimeOfImpact$_construct(this);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 "super": "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.BenchmarkRunner_setupBenchmarks_anon0 = {"":
 [],
 "super": "Closure",
 call$1: function(e) {
  return $.trim(e);
}
};

$$.BenchmarkRunner_setupBenchmarks_anon = {"":
 ["filterList_0"],
 "super": "Closure",
 call$1: function(e) {
  return !$.eqB($.indexOf$1(this.filterList_0, e.get$name()), -1);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 "super": "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.BroadPhase_updatePairs_anon = {"":
 [],
 "super": "Closure",
 call$2: function(a, b) {
  return $.compareTo(a, b);
}
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); }
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.Expect_equals = function(expected, actual, reason) {
  if (expected === actual)
    return;
  var msg = reason == null ? '' : ', \'' + $.S(reason) + '\'';
  $.Expect__fail('Expect.equals(expected: <' + $.S(expected) + '>, actual: <' + $.S(actual) + '>' + msg + ') fails.');
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return Math.floor(receiver);
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return isNaN(receiver);
  else
    return receiver.isNaN$0();
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$.Vector_crossVectorAndNumToOut = function(a, s, out) {
  var t1 = -s;
  var t2 = a.get$x();
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  var tempy = t1 * t2;
  t2 = a.get$y();
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  out.set$x(s * t2);
  out.set$y(tempy);
};

$.ClipVertex$ = function() {
  return new $.ClipVertex($.Vector$(0, 0), $.ContactID$());
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$.MathBox_distanceSquared = function(v1, v2) {
  var dx = $.sub(v1.get$x(), v2.get$x());
  var dy = $.sub(v1.get$y(), v2.get$y());
  return $.add($.mul(dx, dx), $.mul(dy, dy));
};

$.SimplexCache$ = function() {
  var t1 = new $.SimplexCache(0, 0, $.ListImplementation_List(3, 'int'), $.ListImplementation_List(3, 'int'));
  t1.SimplexCache$0();
  return t1;
};

$.SeparationFunction$ = function() {
  var t1 = $.DistanceProxy$();
  var t2 = $.DistanceProxy$();
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Sweep$();
  var t6 = $.Sweep$();
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  var t13 = $.Vector$(0, 0);
  var t14 = $.Vector$(0, 0);
  var t15 = $.Vector$(0, 0);
  var t16 = $.Vector$(0, 0);
  var t17 = $.Transform$();
  var t18 = $.Transform$();
  return new $.SeparationFunction(t1, t2, 0, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, $.Vector$(0, 0), $.Vector$(0, 0), t16, t17, t18);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListImplementation_List(null, 'Match');
  var length$ = $.get$length(haystack);
  var patternLength = needle.length;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$.Vector$copy = function(other) {
  return new $.Vector(other.get$x(), other.get$y());
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$.RevoluteJointDef$ = function() {
  var t1 = new $.RevoluteJointDef($.Vector$(0.0, 0.0), $.Vector$(0.0, 0.0), 0.0, false, 0.0, 0.0, false, 0.0, 0.0, 0, null, null, null, false);
  t1.RevoluteJointDef$0();
  return t1;
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || src.constructor !== Array && !src.is$JavaScriptIndexingBehavior))
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || (dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior)
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t1 = src[i];
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t1;
    }
  else
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t2 = src[i];
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t2;
    }
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.CircleShape$copy = function(other) {
  var t1 = other.get$type();
  var t2 = other.get$radius();
  return new $.CircleShape($.Vector$copy(other.get$position()), t1, t2);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.Vector_maxToOut = function(a, b, out) {
  out.x = $.gtB(a.x, b.x) ? a.x : b.x;
  out.y = $.gtB(a.y, b.y) ? a.y : b.y;
};

$.Collision$_construct = function(pool) {
  var t1 = $.DistanceInput$();
  t1 = new $.Collision(pool, $.SimplexCache$(), t1, $.DistanceOutput$(), $.EdgeResults$(), $.EdgeResults$(), $.ListImplementation_List(2, 'ClipVertex'), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.ListImplementation_List(2, 'ClipVertex'), $.ListImplementation_List(2, 'ClipVertex'));
  t1.Collision$_construct$1(pool);
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.ContactFilter$ = function() {
  return new $.ContactFilter();
};

$.ListIterator$ = function(list, T) {
  var t1 = new $.ListIterator(0, list);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.TimeOfImpact$_construct = function(argPool) {
  var t1 = new $.TimeOfImpact($.SimplexCache$(), $.DistanceInput$(), $.Transform$(), $.Transform$(), $.DistanceOutput$(), $.SeparationFunction$(), $.ListImplementation_List(2, 'int'), $.Sweep$(), $.Sweep$(), argPool);
  t1.TimeOfImpact$_construct$1(argPool);
  return t1;
};

$.EdgeResults$ = function() {
  return new $.EdgeResults(0, 0);
};

$.map = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.map$1(f);
  else
    return $.Collections_map(receiver, [], f);
};

$.Collections_map = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;)
    destination.push(f.call$1(t1.next$0()));
  return destination;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.Body$ = function(bd, world) {
  var t1 = $.Transform$();
  var t2 = $.Sweep$();
  var t3 = $.Vector$copy(bd.get$linearVelocity());
  var t4 = bd.get$linearDamping();
  var t5 = bd.get$angularDamping();
  var t6 = $.Vector$(0, 0);
  var t7 = bd.get$userData();
  var t8 = $.FixtureDef$();
  var t9 = $.MassData$();
  var t10 = $.Transform$();
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  t12 = new $.Body(world, 0, null, 0, t7, t3, 0, null, null, null, null, null, 0, null, t6, 0, 0, 0, t4, t5, bd.get$type(), null, t1, t2, t8, t9, t10, t11, t12);
  t12.Body$2(bd, world);
  return t12;
};

$.WorldManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  t3 = new $.WorldManifold(t1, $.ListImplementation_List(2, 'Vector'), t2, t3);
  t3.WorldManifold$0();
  return t3;
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.Vector$ = function(x, y) {
  return new $.Vector(x, y);
};

$.Velocity$ = function() {
  var t1 = new $.Velocity(null, null);
  t1.Velocity$0();
  return t1;
};

$.DoubleLinkedQueueEntry$ = function(e, E) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.PolygonAndCircleContact$ = function(argPool) {
  var t1 = $.Manifold$();
  return new $.PolygonAndCircleContact(null, null, null, $.ContactEdge$(), $.ContactEdge$(), null, null, t1, null, argPool, $.Manifold$());
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException(message);
};

$.AxisAlignedBox_testOverlap = function(a, b) {
  var t1 = b.get$lowerBound().get$x();
  if (typeof t1 !== 'number')
    return $.AxisAlignedBox_testOverlap$bailout(1, a, b, t1, 0);
  var t3 = a.get$upperBound().get$x();
  if (typeof t3 !== 'number')
    return $.AxisAlignedBox_testOverlap$bailout(2, a, b, t3, t1);
  if (!(t1 > t3)) {
    t1 = b.get$lowerBound().get$y();
    if (typeof t1 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(3, a, b, t1, 0);
    t3 = a.get$upperBound().get$y();
    if (typeof t3 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(4, a, b, t3, t1);
    t3 = t1 > t3;
    t1 = t3;
  } else
    t1 = true;
  if (!t1) {
    t1 = a.get$lowerBound().get$x();
    if (typeof t1 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(5, a, b, t1, 0);
    t3 = b.get$upperBound().get$x();
    if (typeof t3 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(6, a, b, t3, t1);
    if (!(t1 > t3)) {
      t1 = a.get$lowerBound().get$y();
      if (typeof t1 !== 'number')
        return $.AxisAlignedBox_testOverlap$bailout(7, b, t1, 0, 0);
      t3 = b.get$upperBound().get$y();
      if (typeof t3 !== 'number')
        return $.AxisAlignedBox_testOverlap$bailout(8, t1, t3, 0, 0);
      t3 = t1 > t3;
      t1 = t3;
    } else
      t1 = true;
  } else
    t1 = true;
  return !t1;
};

$.max = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return a;
      if (a < b)
        return b;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return a + b;
        if ($.isNaN(b) === true)
          return b;
        return a;
      }
      if (b === 0 && $.isNegative(a) === true)
        return b;
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.TimeOfImpactSolver$ = function() {
  var t1 = new $.TimeOfImpactSolver($.ListImplementation_List(4, 'TimeOfImpactConstraint'), 0, null, $.TimeOfImpactSolverManifold$(), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
  t1.TimeOfImpactSolver$0();
  return t1;
};

$.Pair$ = function() {
  return new $.Pair(null, null);
};

$.JointEdge$ = function() {
  return new $.JointEdge(null, null, null, null);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.Distance$_construct = function() {
  return new $.Distance(0, 0, 20, $.Simplex$(), $.ListImplementation_List(3, 'int'), $.ListImplementation_List(3, 'int'), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.Joint_Joint$create = function(argWorld, def) {
  switch (def.get$type()) {
    case 5:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 3:
      return $.DistanceJoint$(def);
    case 2:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 1:
      return $.RevoluteJoint$(def);
    case 8:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 9:
      return $.FrictionJoint$(def);
    case 7:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 6:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 4:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 10:
      return $.ConstantVolumeJoint$(argWorld, def);
  }
  return;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel, E) {
  var t1 = new $._DoubleLinkedQueueIterator(_sentinel, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$.sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.BenchmarkRunner$ = function() {
  var t1 = $.StringBufferImpl$('');
  return new $.BenchmarkRunner($.CTC3, $.CTC4, $.ListImplementation_List(null, 'Benchmark'), t1);
};

$.ObjectImplementation_toStringImpl = function(object) {
  return $.Primitives_objectToString(object);
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.DualPivotQuicksort__dualPivotQuicksort = function(a, left, right, compare) {
  var sixth = $.tdiv(right - left + 1, 6);
  var index1 = left + sixth;
  var index5 = right - sixth;
  var index3 = $.tdiv(left + right, 2);
  var index2 = index3 - sixth;
  var index4 = index3 + sixth;
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1)
    throw $.ioore(index1);
  var el1 = a[index1];
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  var el2 = a[index2];
  if (index3 < 0 || index3 >= t1)
    throw $.ioore(index3);
  var el3 = a[index3];
  if (index4 < 0 || index4 >= t1)
    throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 < 0 || index5 >= t1)
    throw $.ioore(index5);
  var el5 = a[index5];
  if ($.gtB(compare.call$2(el1, el2), 0)) {
    var t0 = el1;
    el1 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el1, el3), 0)) {
    t0 = el3;
    el3 = el1;
    el1 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el2, el5), 0)) {
    t0 = el2;
    el2 = el5;
    el5 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if (index1 < 0 || index1 >= a.length)
    throw $.ioore(index1);
  a[index1] = el1;
  if (index3 < 0 || index3 >= a.length)
    throw $.ioore(index3);
  a[index3] = el3;
  if (index5 < 0 || index5 >= a.length)
    throw $.ioore(index5);
  a[index5] = el5;
  t1 = a.length;
  if (left < 0 || left >= t1)
    throw $.ioore(left);
  var t2 = a[left];
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  a[index2] = t2;
  t2 = a.length;
  if (right < 0 || right >= t2)
    throw $.ioore(right);
  var t3 = a[right];
  if (index4 < 0 || index4 >= t2)
    throw $.ioore(index4);
  a[index4] = t3;
  var less = left + 1;
  var great = right - 1;
  var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
  if (pivots_are_equal)
    for (var k = less; k <= great; ++k) {
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      var ak = a[k];
      var comp = compare.call$2(ak, el2);
      if (typeof comp !== 'number')
        return $.DualPivotQuicksort__dualPivotQuicksort$bailout(1, a, less, k, compare, left, right, great, index1, index5, el2, pivots_are_equal, ak, comp, el4);
      if (comp === 0)
        continue;
      if (comp < 0) {
        if (!(k === less)) {
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else
        for (var less0 = less + 1; true;) {
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          comp = compare.call$2(a[great], el2);
          if ($.gtB(comp, 0)) {
            --great;
            continue;
          } else {
            t1 = $.ltB(comp, 0);
            t2 = a.length;
            var great0 = great - 1;
            if (t1) {
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
              break;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              break;
            }
          }
        }
    }
  else
    for (k = less; k <= great; ++k) {
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.ltB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.gtB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.gtB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            t2 = a.length;
            great0 = great - 1;
            if (t1) {
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
            }
            great = great0;
            break;
          }
        }
    }
  t1 = less - 1;
  t2 = a.length;
  if (t1 < 0 || t1 >= t2)
    throw $.ioore(t1);
  t3 = a[t1];
  if (left < 0 || left >= t2)
    throw $.ioore(left);
  a[left] = t3;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el2;
  t1 = great + 1;
  t3 = a.length;
  if (t1 < 0 || t1 >= t3)
    throw $.ioore(t1);
  var t4 = a[t1];
  if (right < 0 || right >= t3)
    throw $.ioore(right);
  a[right] = t4;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el4;
  $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
  $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
  if (pivots_are_equal)
    return;
  if (less < index1 && great > index5) {
    while (true) {
      if (less < 0 || less >= a.length)
        throw $.ioore(less);
      if (!$.eqB(compare.call$2(a[less], el2), 0))
        break;
      ++less;
    }
    while (true) {
      if (great < 0 || great >= a.length)
        throw $.ioore(great);
      if (!$.eqB(compare.call$2(a[great], el4), 0))
        break;
      --great;
    }
    for (k = less; k <= great; ++k) {
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.eqB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.eqB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.eqB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            t2 = a.length;
            great0 = great - 1;
            if (t1) {
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
            }
            great = great0;
            break;
          }
        }
    }
    $.DualPivotQuicksort__doSort(a, less, great, compare);
  } else
    $.DualPivotQuicksort__doSort(a, less, great, compare);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if (startIndex < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.ManifoldPoint$ = function() {
  return new $.ManifoldPoint($.Vector$(0, 0), 0, 0, $.ContactID$());
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.DistanceInput$ = function() {
  return new $.DistanceInput($.DistanceProxy$(), $.DistanceProxy$(), $.Transform$(), $.Transform$(), false);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.TimeOfImpactInput$ = function() {
  return new $.TimeOfImpactInput($.DistanceProxy$(), $.DistanceProxy$(), $.Sweep$(), $.Sweep$(), 0);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(_start, str, pattern);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$.Vector_minToOut = function(a, b, out) {
  out.x = $.ltB(a.x, b.x) ? a.x : b.x;
  out.y = $.ltB(a.y, b.y) ? a.y : b.y;
};

$.DoubleLinkedQueue$ = function(E) {
  var t1 = new $.DoubleLinkedQueue(null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.ContactSolver$ = function() {
  var t1 = new $.ContactSolver($.ListImplementation_List(256, 'ContactConstraint'), null, $.WorldManifold$(), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.PositionSolverManifold$(), $.Vector$(0, 0), $.Vector$(0, 0));
  t1.ContactSolver$0();
  return t1;
};

$.DualPivotQuicksort_insertionSort_ = function(a, left, right, compare) {
  for (var i = left + 1; i <= right; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    var el = a[i];
    var j = i;
    while (true) {
      if (j > left) {
        var t1 = j - 1;
        if (t1 < 0 || t1 >= a.length)
          throw $.ioore(t1);
        var t2 = $.gtB(compare.call$2(a[t1], el), 0);
        t1 = t2;
      } else
        t1 = false;
      if (!t1)
        break;
      var j0 = j - 1;
      t1 = a.length;
      if (j0 < 0 || j0 >= t1)
        throw $.ioore(j0);
      t2 = a[j0];
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      a[j] = t2;
      j = j0;
    }
    if (j < 0 || j >= a.length)
      throw $.ioore(j);
    a[j] = el;
  }
};

$.RevoluteJoint$ = function(def) {
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.JointEdge$();
  var t9 = $.JointEdge$();
  t7 = new $.RevoluteJoint($.Vector$(0, 0), $.Vector$(0, 0), $.Vector3$(0, 0, 0), 0, $.Matrix33$(), null, null, null, null, null, null, null, null, null, t1, null, null, t8, t9, t2, t3, false, t4, t5, t6, t7, null, null, null, null);
  t7.RevoluteJoint$1(def);
  return t7;
};

$.PolygonContact$ = function(argPool) {
  var t1 = $.Manifold$();
  return new $.PolygonContact(null, null, null, $.ContactEdge$(), $.ContactEdge$(), null, null, t1, null, argPool, $.Manifold$());
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$.BroadPhase$ = function() {
  var t1 = new $.BroadPhase($.DynamicTree$(), 0, null, null, 16, 0, null);
  t1.BroadPhase$0();
  return t1;
};

$._DoubleLinkedQueueEntrySentinel$ = function(E) {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.Settings_mixFriction = function(friction1, friction2) {
  return $.sqrt($.mul(friction1, friction2));
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.WorldQueryWrapper$ = function() {
  return new $.WorldQueryWrapper(null, null);
};

$.ContactConstraint$ = function() {
  var t1 = new $.ContactConstraint($.ListImplementation_List(2, 'ContactConstraintPoint'), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Matrix22$(null, null), $.Matrix22$(null, null), null, null, null, null, null, null, 0, null);
  t1.ContactConstraint$0();
  return t1;
};

$.ContactImpulse$ = function() {
  return new $.ContactImpulse($.ListImplementation_List(2, 'num'), $.ListImplementation_List(2, 'num'));
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.negate$0();
};

$.Vector_crossNumAndVectorToOut = function(s, a, out) {
  var tempY = $.mul(s, a.get$x());
  out.set$x($.mul($.neg(s), a.get$y()));
  out.set$y(tempY);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.Matrix22_mulMatrixAndVectorToOut = function(matrix, vector, out) {
  var tempy = $.add($.mul(matrix.get$col1().get$y(), vector.get$x()), $.mul(matrix.get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.mul(matrix.get$col1().get$x(), vector.get$x()), $.mul(matrix.get$col2().get$x(), vector.get$y())));
  out.set$y(tempy);
};

$.Features$ = function() {
  return new $.Features(0, 0, 0, 0);
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || !!c.is$List);
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.DynamicTreeNode$_construct = function() {
  return new $.DynamicTreeNode($.AxisAlignedBox$(null, null), null, null, null, null, null, null);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.ExpectException$ = function(message) {
  return new $.ExpectException(message);
};

$.CircleShape$ = function() {
  return new $.CircleShape($.Vector$(0, 0), 0, 0);
};

$.RuntimeOptions$ = function() {
  return new $.RuntimeOptions(null);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.AxisAlignedBox$ = function(lowerBound, upperBound) {
  var t1 = new $.AxisAlignedBox(lowerBound, upperBound);
  t1.AxisAlignedBox$2(lowerBound, upperBound);
  return t1;
};

$.Vector3$ = function(x, y, z) {
  return new $.Vector3(x, y, z);
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$.contains$2 = function(receiver, other, startIndex) {
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.DefaultWorldPool$ = function() {
  var t1 = new $.DefaultWorldPool(null, null, null);
  t1.DefaultWorldPool$0();
  return t1;
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$.ContactEdge$ = function() {
  return new $.ContactEdge(null, null, null, null);
};

$.CircleContact$ = function(argPool) {
  var t1 = $.Manifold$();
  return new $.CircleContact(null, null, null, $.ContactEdge$(), $.ContactEdge$(), null, null, t1, null, argPool, $.Manifold$());
};

$.DynamicTree$ = function() {
  var t1 = $.ListImplementation_List(4, 'Vector');
  var t2 = $.Vector$(0, 0);
  var t3 = $.AxisAlignedBox$(null, null);
  t3 = new $.DynamicTree(null, 0, null, 0, 0, $.DoubleLinkedQueue$('DynamicTreeNode'), t1, 0, t2, t3, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
  t3.DynamicTree$0();
  return t3;
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.StringImplementation__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior)
    return $.StringImplementation__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.Island$ = function() {
  return new $.Island(null, null, null, null, null, null, null, null, null, null, null, null, null, $.ContactSolver$(), $.Vector$(0, 0), $.ContactImpulse$());
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.Transform_mulTransToOut = function(T, v, out) {
  var v1x = $.sub(v.get$x(), T.get$position().get$x());
  var v1y = $.sub(v.get$y(), T.get$position().get$y());
  var b = T.get$rotation().get$col1();
  var b1 = T.get$rotation().get$col2();
  var tempy = $.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y()));
  out.set$x($.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y())));
  out.set$y(tempy);
};

$.BallDropBench$ = function(solveLoops, steps) {
  return new $.BallDropBench(null, null, solveLoops, steps);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  return receiver.split(pattern);
};

$.TimeStep$ = function() {
  return new $.TimeStep(0, 0, 0, 0, 0, true);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.TimeOfImpactSolverManifold$ = function() {
  return new $.TimeOfImpactSolverManifold($.Vector$(0, 0), $.Vector$(0, 0), 0, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.CircleStressBench$ = function(solveLoops, steps) {
  return new $.CircleStressBench(null, null, null, solveLoops, steps);
};

$.ContactConstraintPoint$ = function() {
  return new $.ContactConstraintPoint($.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0, 0, 0, 0);
};

$.ContactRegister$ = function() {
  return new $.ContactRegister(null, false);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.print = function(object) {
  $.PrintImplementation_print(object);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.PrintImplementation_print = function(obj) {
  $.Primitives_printString(obj);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$.DistanceJointDef$ = function() {
  var t1 = new $.DistanceJointDef($.Vector$(0.0, 0.0), $.Vector$(0.0, 0.0), 1.0, 0.0, 0.0, 0, null, null, null, false);
  t1.DistanceJointDef$0();
  return t1;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.DominoPlatformBench$ = function(solveLoops, steps) {
  return new $.DominoPlatformBench(null, null, solveLoops, steps);
};

$.Matrix22$ = function(c1, c2) {
  var t1 = new $.Matrix22(null, null);
  t1.Matrix22$2(c1, c2);
  return t1;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.Settings_mixRestitution = function(restitution1, restitution2) {
  return $.gtB(restitution1, restitution2) ? restitution1 : restitution2;
};

$.FrictionJoint$ = function(def) {
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.JointEdge$();
  var t9 = $.JointEdge$();
  return new $.FrictionJoint($.Vector$copy(def.get$localAnchorA()), $.Vector$copy(def.get$localAnchorB()), $.Vector$(0, 0), 0.0, def.get$maxForce(), def.get$maxTorque(), t1, null, null, t8, t9, t2, t3, false, t4, t5, t6, t7, null, null, null, null);
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.DominoTowerBench$ = function(solveLoops, steps) {
  return new $.DominoTowerBench(null, null, null, solveLoops, steps);
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.StopwatchImplementation$start = function() {
  var t1 = new $.StopwatchImplementation(null, null);
  t1.StopwatchImplementation$start$0();
  return t1;
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.PositionSolverManifold$ = function() {
  return new $.PositionSolverManifold($.Vector$(0, 0), $.Vector$(0, 0), 0, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b)) {
    var result = a % b;
    if (result === 0)
      return 0;
    if (result > 0)
      return result;
    if (b < 0)
      return result - b;
    else
      return result + b;
  }
  return a.operator$mod$1(b);
};

$.Sweep$ = function() {
  return new $.Sweep($.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0);
};

$.DistanceProxy$ = function() {
  var t1 = new $.DistanceProxy($.ListImplementation_List(8, 'Vector'), 0, 0);
  t1.DistanceProxy$0();
  return t1;
};

$.MassData$ = function() {
  return new $.MassData(0, $.Vector$(0, 0), 0);
};

$.Matrix22_mulTransMatrixAndVectorToOut = function(matrix, vector, out) {
  var outx = $.add($.mul(vector.get$x(), matrix.get$col1().get$x()), $.mul(vector.get$y(), matrix.get$col1().get$y()));
  out.set$y($.add($.mul(vector.get$x(), matrix.get$col2().get$x()), $.mul(vector.get$y(), matrix.get$col2().get$y())));
  out.set$x(outx);
};

$.Matrix33$ = function() {
  return new $.Matrix33($.Vector3$(0, 0, 0), $.Vector3$(0, 0, 0), $.Vector3$(0, 0, 0));
};

$.BallCageBench$ = function(solveLoops, steps) {
  return new $.BallCageBench(null, null, solveLoops, steps);
};

$.min = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return b;
      if (a < b)
        return a;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return (a + b) * a * b;
        if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true)
          return b;
        return a;
      }
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.Vector3_crossToOut = function(a, b, out) {
  var tempy = $.sub($.mul(a.get$z(), b.get$x()), $.mul(a.get$x(), b.get$z()));
  var tempz = $.sub($.mul(a.get$x(), b.get$y()), $.mul(a.get$y(), b.get$x()));
  out.x = $.sub($.mul(a.get$y(), b.get$z()), $.mul(a.get$z(), b.get$y()));
  out.y = tempy;
  out.z = tempz;
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || !!o.is$Collection))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || !!o.is$List) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && !!o.is$Map)
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  m.forEach$1(new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$.Collision_clipSegmentToLine = function(vOut, vIn, norm, offset) {
  var t1 = $.index(vIn, 0).get$v();
  var distance0 = $.sub($.add($.mul(norm.get$x(), t1.get$x()), $.mul(norm.get$y(), t1.get$y())), offset);
  var t2 = $.index(vIn, 1).get$v();
  var distance1 = $.sub($.add($.mul(norm.get$x(), t2.get$x()), $.mul(norm.get$y(), t2.get$y())), offset);
  if ($.leB(distance0, 0.0)) {
    $.index(vOut, 0).setFrom$1($.index(vIn, 0));
    var numOut = 1;
  } else
    numOut = 0;
  if ($.leB(distance1, 0.0)) {
    var numOut0 = numOut + 1;
    $.index(vOut, numOut).setFrom$1($.index(vIn, 1));
    numOut = numOut0;
  }
  if ($.ltB($.mul(distance0, distance1), 0.0)) {
    var interp = $.div(distance0, $.sub(distance0, distance1));
    $.index(vOut, numOut).get$v().setFrom$1($.index(vIn, 1).get$v()).subLocal$1($.index(vIn, 0).get$v()).mulLocal$1(interp).addLocal$1($.index(vIn, 0).get$v());
    var vin = $.gtB(distance0, 0.0) ? $.index(vIn, 0) : $.index(vIn, 1);
    $.index(vOut, numOut).get$id().setFrom$1(vin.get$id());
    ++numOut;
  }
  return numOut;
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.trim$0();
  return receiver.trim();
};

$.Transform$ = function() {
  return new $.Transform($.Vector$(0, 0), $.Matrix22$(null, null));
};

$.Fixture$ = function() {
  return new $.Fixture($.AxisAlignedBox$(null, null), null, null, null, null, null, null, null, $.Filter$(), null, null, $.AxisAlignedBox$(null, null), $.AxisAlignedBox$(null, null));
};

$.setRange$4 = function(receiver, start, length$, from, startFrom) {
  if (!$.isJsArray(receiver))
    return receiver.setRange$4(start, length$, from, startFrom);
  $.checkMutable(receiver, 'indexed set');
  if (length$ === 0)
    return;
  $.checkNull(start);
  $.checkNull(length$);
  $.checkNull(from);
  $.checkNull(startFrom);
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if ($.gtB(t1, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  $.Arrays_copy(from, startFrom, receiver, start, length$);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b))
    if ($.ltB(a, b))
      return -1;
    else if ($.gtB(a, b))
      return 1;
    else if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b)))
          return 0;
        if (aIsNegative === true)
          return -1;
        return 1;
      }
      return 0;
    } else if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true)
        return 0;
      return 1;
    } else
      return -1;
  else if (typeof a === 'string') {
    if (!(typeof b === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b)
      var t1 = 0;
    else
      t1 = a < b ? -1 : 1;
    return t1;
  } else
    return a.compareTo$1(b);
};

$.Manifold$ = function() {
  var t1 = new $.Manifold($.ListImplementation_List(2, 'ManifoldPoint'), $.Vector$(0, 0), $.Vector$(0, 0), null, 0);
  t1.Manifold$0();
  return t1;
};

$.DistanceJoint$ = function(def) {
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.JointEdge$();
  var t9 = $.JointEdge$();
  var t10 = $.Vector$copy(def.get$localAnchorA());
  var t11 = $.Vector$copy(def.get$localAnchorB());
  var t12 = $.get$length(def);
  return new $.DistanceJoint(t10, t11, $.Vector$(0, 0), 0.0, null, t12, def.get$frequencyHz(), def.get$dampingRatio(), 0.0, 0.0, t1, null, null, t8, t9, t2, t3, false, t4, t5, t6, t7, null, null, null, null);
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.sort = function(receiver, compare) {
  if (!$.isJsArray(receiver))
    return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.DualPivotQuicksort_sort(receiver, compare);
};

$.DualPivotQuicksort_sort = function(a, compare) {
  $.DualPivotQuicksort__doSort(a, 0, a.length - 1, compare);
};

$.ContactID$ = function() {
  return new $.ContactID($.Features$());
};

$.World$ = function(gravity, doSleep, argPool) {
  var t1 = new $.World(4, null, null, null, 0, 0, gravity, doSleep, null, null, null, argPool, 0, true, true, $.ListImplementation_List(2, 'List<ContactRegister>'), $.Vector$(0, 0), $.Vector$(0, 0), $.TimeStep$(), $.Vector$(0, 0), $.Vector$(0, 0), $.WorldQueryWrapper$(), $.TimeOfImpactInput$(), $.TimeOfImpactOutput$(), $.Sweep$(), $.TimeOfImpactSolver$(), $.ListImplementation_List(32, 'Contact'), $.Island$(), $.ListImplementation_List(10, 'Body'));
  t1.World$3(gravity, doSleep, argPool);
  return t1;
};

$.DistanceOutput$ = function() {
  return new $.DistanceOutput($.Vector$(0, 0), $.Vector$(0, 0), null, null);
};

$.sin = function(value) {
  return Math.sin($.checkNum(value));
};

$.DualPivotQuicksort__doSort = function(a, left, right, compare) {
  if (right - left <= 32)
    $.DualPivotQuicksort_insertionSort_(a, left, right, compare);
  else
    $.DualPivotQuicksort__dualPivotQuicksort(a, left, right, compare);
};

$.toDouble = function(receiver) {
  return receiver;
};

$.ListImplementation_List = function(length$, E) {
  return $.Primitives_newList(length$);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.PolygonShape$ = function() {
  var t1 = $.ListImplementation_List(8, 'Vector');
  var t2 = $.ListImplementation_List(8, 'Vector');
  t2 = new $.PolygonShape($.Vector$(0, 0), t1, t2, 0, 1, 0.01);
  t2.PolygonShape$0();
  return t2;
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$.PolygonShape$copy = function(other) {
  var t1 = other.get$radius();
  var t2 = other.get$vertexCount();
  var t3 = $.ListImplementation_List(8, 'Vector');
  var t4 = $.ListImplementation_List(8, 'Vector');
  t1 = new $.PolygonShape($.Vector$copy(other.get$centroid()), t3, t4, t2, 1, t1);
  t1.PolygonShape$copy$1(other);
  return t1;
};

$.Filter$ = function() {
  return new $.Filter(0, 0, 0);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver))
    return $.Arrays_indexOf(receiver, element, 0, receiver.length);
  else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.Position$ = function() {
  var t1 = new $.Position(null, null);
  t1.Position$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.FixtureDef$ = function() {
  var t1 = new $.FixtureDef(null, null, 0.2, 0, 0, false, $.Filter$());
  t1.FixtureDef$0();
  return t1;
};

$.TimeOfImpactOutput$ = function() {
  return new $.TimeOfImpactOutput(0, 0);
};

$.Simplex$ = function() {
  var t1 = $.SimplexVertex$();
  var t2 = $.SimplexVertex$();
  var t3 = $.SimplexVertex$();
  var t4 = $.ListImplementation_List(3, 'SimplexVertex');
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  t6 = new $.Simplex(t1, t2, t3, t4, 0, t5, $.Vector$(0, 0), t6, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
  t6.Simplex$0();
  return t6;
};

$.BodyDef$ = function() {
  return new $.BodyDef(0, 0, null, $.Vector$(0, 0), $.Vector$(0, 0), 0, false, null, false, true, 0, 0, true, true);
};

$.TimeOfImpactConstraint$ = function() {
  var t1 = new $.TimeOfImpactConstraint($.ListImplementation_List(2, 'Vector'), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0, 0, null, null);
  t1.TimeOfImpactConstraint$0();
  return t1;
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.Expect__fail = function(message) {
  throw $.captureStackTrace($.ExpectException$(message));
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.ConstantVolumeJoint$ = function(_world, def) {
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  t7 = new $.ConstantVolumeJoint(null, null, null, null, null, 0, _world, null, null, null, t1, null, null, $.JointEdge$(), $.JointEdge$(), t2, t3, false, t4, t5, t6, t7, null, null, null, null);
  t7.ConstantVolumeJoint$2(_world, def);
  return t7;
};

$.SimplexVertex$ = function() {
  return new $.SimplexVertex($.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0, 0);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.getRuntimeTypeInfo = function(target) {
  if (target == null)
    return;
  var res = target.builtin$typeInfo;
  return res == null ? {} : res;
};

$.ListImplementation_List$from = function(other, E) {
  var result = $.ListImplementation_List(null);
  for (var t1 = $.iterator(other); t1.hasNext$0() === true;)
    result.push(t1.next$0());
  return result;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var runner = $.BenchmarkRunner$();
  var args = $.iterator($.RuntimeOptions$().get$arguments());
  for (; filter = null, args.hasNext$0() === true;)
    if ($.eqB(args.next$0(), '--filter')) {
      var filter = args.next$0();
      break;
    }
  runner.setupBenchmarks$1(filter);
  runner.runBenchmarks$0();
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$.cos = function(value) {
  return Math.cos($.checkNum(value));
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.ContactManager$ = function(argPool) {
  var t1 = $.ContactFilter$();
  return new $.ContactManager($.BroadPhase$(), null, 0, t1, null, argPool);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.Transform_mulToOut = function(transform, vector, out) {
  var tempY = $.add($.add(transform.get$position().get$y(), $.mul(transform.get$rotation().get$col1().get$y(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.add(transform.get$position().get$x(), $.mul(transform.get$rotation().get$col1().get$x(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$x(), vector.get$y())));
  out.set$y(tempY);
};

$.setRange$3 = function(receiver, start, length$, from) {
  if ($.isJsArray(receiver))
    return $.setRange$4(receiver, start, length$, from, 0);
  return receiver.setRange$3(start, length$, from);
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.DualPivotQuicksort__dualPivotQuicksort$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var a = env0;
      less = env1;
      k = env2;
      var compare = env3;
      var left = env4;
      var right = env5;
      great = env6;
      index1 = env7;
      index5 = env8;
      el2 = env9;
      pivots_are_equal = env10;
      ak = env11;
      comp = env12;
      el4 = env13;
      break;
  }
  switch (state) {
    case 0:
      var sixth = $.tdiv(right - left + 1, 6);
      var index1 = left + sixth;
      var index5 = right - sixth;
      var index3 = $.tdiv(left + right, 2);
      var index2 = index3 - sixth;
      var index4 = index3 + sixth;
      var t1 = a.length;
      if (index1 < 0 || index1 >= t1)
        throw $.ioore(index1);
      var el1 = a[index1];
      if (index2 < 0 || index2 >= t1)
        throw $.ioore(index2);
      var el2 = a[index2];
      if (index3 < 0 || index3 >= t1)
        throw $.ioore(index3);
      var el3 = a[index3];
      if (index4 < 0 || index4 >= t1)
        throw $.ioore(index4);
      var el4 = a[index4];
      if (index5 < 0 || index5 >= t1)
        throw $.ioore(index5);
      var el5 = a[index5];
      if ($.gtB(compare.call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el2, el5), 0)) {
        t0 = el2;
        el2 = el5;
        el5 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if (index1 < 0 || index1 >= a.length)
        throw $.ioore(index1);
      a[index1] = el1;
      if (index3 < 0 || index3 >= a.length)
        throw $.ioore(index3);
      a[index3] = el3;
      if (index5 < 0 || index5 >= a.length)
        throw $.ioore(index5);
      a[index5] = el5;
      t1 = a.length;
      if (left < 0 || left >= t1)
        throw $.ioore(left);
      var t2 = a[left];
      if (index2 < 0 || index2 >= t1)
        throw $.ioore(index2);
      a[index2] = t2;
      t2 = a.length;
      if (right < 0 || right >= t2)
        throw $.ioore(right);
      var t3 = a[right];
      if (index4 < 0 || index4 >= t2)
        throw $.ioore(index4);
      a[index4] = t3;
      var less = left + 1;
      var great = right - 1;
      var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
    case 1:
      if (state === 1 || state === 0 && pivots_are_equal)
        switch (state) {
          case 0:
            var k = less;
          case 1:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!(k <= great))
                      break L0;
                  case 1:
                    c$0: {
                      switch (state) {
                        case 0:
                          if (k < 0 || k >= a.length)
                            throw $.ioore(k);
                          var ak = a[k];
                          var comp = compare.call$2(ak, el2);
                        case 1:
                          state = 0;
                          if ($.eqB(comp, 0))
                            break c$0;
                          if ($.ltB(comp, 0)) {
                            if (!(k === less)) {
                              t1 = a.length;
                              if (less < 0 || less >= t1)
                                throw $.ioore(less);
                              t2 = a[less];
                              if (k < 0 || k >= t1)
                                throw $.ioore(k);
                              a[k] = t2;
                              if (less < 0 || less >= a.length)
                                throw $.ioore(less);
                              a[less] = ak;
                            }
                            ++less;
                          } else
                            for (var less0 = less + 1; true;) {
                              if (great < 0 || great >= a.length)
                                throw $.ioore(great);
                              comp = compare.call$2(a[great], el2);
                              if ($.gtB(comp, 0)) {
                                --great;
                                continue;
                              } else {
                                t1 = $.ltB(comp, 0);
                                t2 = a.length;
                                var great0 = great - 1;
                                if (t1) {
                                  if (less < 0 || less >= t2)
                                    throw $.ioore(less);
                                  t1 = a[less];
                                  if (k < 0 || k >= t2)
                                    throw $.ioore(k);
                                  a[k] = t1;
                                  t1 = a.length;
                                  if (great < 0 || great >= t1)
                                    throw $.ioore(great);
                                  t3 = a[great];
                                  if (less < 0 || less >= t1)
                                    throw $.ioore(less);
                                  a[less] = t3;
                                  if (great < 0 || great >= a.length)
                                    throw $.ioore(great);
                                  a[great] = ak;
                                  great = great0;
                                  less = less0;
                                  break;
                                } else {
                                  if (great < 0 || great >= t2)
                                    throw $.ioore(great);
                                  t1 = a[great];
                                  if (k < 0 || k >= t2)
                                    throw $.ioore(k);
                                  a[k] = t1;
                                  if (great < 0 || great >= a.length)
                                    throw $.ioore(great);
                                  a[great] = ak;
                                  great = great0;
                                  break;
                                }
                              }
                            }
                      }
                    }
                    ++k;
                }
        }
      else
        for (k = less; k <= great; ++k) {
          if (k < 0 || k >= a.length)
            throw $.ioore(k);
          ak = a[k];
          if ($.ltB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              t1 = a.length;
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              t2 = a[less];
              if (k < 0 || k >= t1)
                throw $.ioore(k);
              a[k] = t2;
              if (less < 0 || less >= a.length)
                throw $.ioore(less);
              a[less] = ak;
            }
            ++less;
          } else if ($.gtB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;) {
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              if ($.gtB(compare.call$2(a[great], el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if (great < 0 || great >= a.length)
                  throw $.ioore(great);
                t1 = $.ltB(compare.call$2(a[great], el2), 0);
                t2 = a.length;
                great0 = great - 1;
                if (t1) {
                  if (less < 0 || less >= t2)
                    throw $.ioore(less);
                  t1 = a[less];
                  if (k < 0 || k >= t2)
                    throw $.ioore(k);
                  a[k] = t1;
                  t1 = a.length;
                  if (great < 0 || great >= t1)
                    throw $.ioore(great);
                  t3 = a[great];
                  if (less < 0 || less >= t1)
                    throw $.ioore(less);
                  a[less] = t3;
                  if (great < 0 || great >= a.length)
                    throw $.ioore(great);
                  a[great] = ak;
                  great = great0;
                  less = less0;
                } else {
                  if (great < 0 || great >= t2)
                    throw $.ioore(great);
                  t1 = a[great];
                  if (k < 0 || k >= t2)
                    throw $.ioore(k);
                  a[k] = t1;
                  if (great < 0 || great >= a.length)
                    throw $.ioore(great);
                  a[great] = ak;
                  great = great0;
                }
                break;
              }
            }
        }
      t1 = less - 1;
      t2 = a.length;
      if (t1 < 0 || t1 >= t2)
        throw $.ioore(t1);
      t3 = a[t1];
      if (left < 0 || left >= t2)
        throw $.ioore(left);
      a[left] = t3;
      if (t1 < 0 || t1 >= a.length)
        throw $.ioore(t1);
      a[t1] = el2;
      t1 = great + 1;
      t3 = a.length;
      if (t1 < 0 || t1 >= t3)
        throw $.ioore(t1);
      var t4 = a[t1];
      if (right < 0 || right >= t3)
        throw $.ioore(right);
      a[right] = t4;
      if (t1 < 0 || t1 >= a.length)
        throw $.ioore(t1);
      a[t1] = el4;
      $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
      $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
      if (pivots_are_equal)
        return;
      if (less < index1 && great > index5) {
        while (true) {
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          if (!$.eqB(compare.call$2(a[less], el2), 0))
            break;
          ++less;
        }
        while (true) {
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if (!$.eqB(compare.call$2(a[great], el4), 0))
            break;
          --great;
        }
        for (k = less; k <= great; ++k) {
          if (k < 0 || k >= a.length)
            throw $.ioore(k);
          ak = a[k];
          if ($.eqB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              t1 = a.length;
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              t2 = a[less];
              if (k < 0 || k >= t1)
                throw $.ioore(k);
              a[k] = t2;
              if (less < 0 || less >= a.length)
                throw $.ioore(less);
              a[less] = ak;
            }
            ++less;
          } else if ($.eqB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;) {
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              if ($.eqB(compare.call$2(a[great], el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if (great < 0 || great >= a.length)
                  throw $.ioore(great);
                t1 = $.ltB(compare.call$2(a[great], el2), 0);
                t2 = a.length;
                great0 = great - 1;
                if (t1) {
                  if (less < 0 || less >= t2)
                    throw $.ioore(less);
                  t1 = a[less];
                  if (k < 0 || k >= t2)
                    throw $.ioore(k);
                  a[k] = t1;
                  t1 = a.length;
                  if (great < 0 || great >= t1)
                    throw $.ioore(great);
                  t3 = a[great];
                  if (less < 0 || less >= t1)
                    throw $.ioore(less);
                  a[less] = t3;
                  if (great < 0 || great >= a.length)
                    throw $.ioore(great);
                  a[great] = ak;
                  great = great0;
                  less = less0;
                } else {
                  if (great < 0 || great >= t2)
                    throw $.ioore(great);
                  t1 = a[great];
                  if (k < 0 || k >= t2)
                    throw $.ioore(k);
                  a[k] = t1;
                  if (great < 0 || great >= a.length)
                    throw $.ioore(great);
                  a[great] = ak;
                  great = great0;
                }
                break;
              }
            }
        }
        $.DualPivotQuicksort__doSort(a, less, great, compare);
      } else
        $.DualPivotQuicksort__doSort(a, less, great, compare);
  }
};

$.AxisAlignedBox_testOverlap$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var b = env1;
      t1 = env2;
      break;
    case 2:
      a = env0;
      b = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 3:
      a = env0;
      b = env1;
      t1 = env2;
      break;
    case 4:
      a = env0;
      b = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 5:
      a = env0;
      b = env1;
      t1 = env2;
      break;
    case 6:
      a = env0;
      b = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 7:
      b = env0;
      t1 = env1;
      break;
    case 8:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = b.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t3 = a.get$upperBound().get$x();
    case 2:
      state = 0;
    default:
      if (state === 4 || state === 3 || state === 0 && !$.gtB(t1, t3))
        switch (state) {
          case 0:
            t1 = b.get$lowerBound().get$y();
          case 3:
            state = 0;
            t3 = a.get$upperBound().get$y();
          case 4:
            state = 0;
            t3 = $.gtB(t1, t3);
            t1 = t3;
        }
      else
        t1 = true;
    case 5:
    case 6:
    case 7:
    case 8:
      if (state === 8 || state === 7 || state === 6 || state === 5 || state === 0 && !t1)
        switch (state) {
          case 0:
            t1 = a.get$lowerBound().get$x();
          case 5:
            state = 0;
            t3 = b.get$upperBound().get$x();
          case 6:
            state = 0;
          default:
            if (state === 8 || state === 7 || state === 0 && !$.gtB(t1, t3))
              switch (state) {
                case 0:
                  t1 = a.get$lowerBound().get$y();
                case 7:
                  state = 0;
                  t3 = b.get$upperBound().get$y();
                case 8:
                  state = 0;
                  t3 = $.gtB(t1, t3);
                  t1 = t3;
              }
            else
              t1 = true;
        }
      else
        t1 = true;
      return !t1;
  }
};

$.Arrays_copy$bailout = function(state, src, srcStart, dst, dstStart, count) {
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j)
      $.indexSet(dst, j, $.index(src, i));
  else
    for (var t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j)
      $.indexSet(dst, j, $.index(src, i));
};

$.StringImplementation__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC1 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC3 = Isolate.makeConstantList([10, 30]);
$.CTC4 = Isolate.makeConstantList([10, 100, 500, 2000]);
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC);
$.RuntimeOptions__nativeArguments = Isolate.$isolateProperties.CTC;
$.TimeOfImpact_toiCalls = null;
$.PI = 3.141592653589793;
$.TimeOfImpact_toiMaxRootIters = null;
$.TimeOfImpact_toiRootIters = null;
$.Primitives_DOLLAR_CHAR_VALUE = 36;
$.TimeOfImpact_toiIters = null;
$.TimeOfImpact_toiMaxIters = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.main();
    }
  }, false);
} else {
  $.main();
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter =   function(field, prototype) {
    var len = field.length;
    var lastChar = field[len - 1];
    var needsGetter = lastChar == '?' || lastChar == '=';
    var needsSetter = lastChar == '!' || lastChar == '=';
    if (needsGetter || needsSetter) field = field.substring(0, len - 1);
    if (needsGetter) {
      var getterString = "return this." + field + ";";
        prototype["get$" + field] = new Function(getterString);
    }
    if (needsSetter) {
      var setterString = "this." + field + " = v;";
      prototype["set$" + field] = new Function("v", setterString);
    }
    return field;
  };
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
