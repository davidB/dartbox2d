function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  return this._msg == null ? 'Exception' : 'Exception: ' + $.S(this._msg);
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC4) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC4) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) == null || $.index(this._keys, index) === $.CTC4) this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t1 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 == null || t2 === $.CTC4) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t1 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC4) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t2 = t1.length;
    if (hash < 0 || hash >= t2) throw $.ioore(hash);
    t1 = t1[hash];
    if (t1 == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(t1, key)) return hash;
    if (insertionIndex < 0 && $.CTC4 === t1) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC4 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(result, f));
  return result;
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  if (typeof length$ !== 'number') return this._advance$0$bailout(1, length$);
  var entry = null;
  do {
    var t1 = this._nextValidIndex + 1;
    this._nextValidIndex = t1;
    if (t1 >= length$) break;
    entry = $.index(this._entries, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC4));
 },
 _advance$0$bailout: function(state, length$) {
  var entry = null;
  do {
    var t1 = this._nextValidIndex + 1;
    this._nextValidIndex = t1;
    if ($.geB(t1, length$)) break;
    entry = $.index(this._entries, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC4));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = $.get$length(this._entries);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(1, t1, t2);
  if (t1 >= t2) return false;
  t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(2, t1, 0);
  t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t1[t2] === $.CTC4 && this._advance$0();
  t1 = this._nextValidIndex;
  t2 = $.get$length(this._entries);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(3, t1, t2);
  return t1 < t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._nextValidIndex;
      var t2 = $.get$length(this._entries);
    case 1:
      state = 0;
      if ($.geB(t1, t2)) return false;
      t1 = this._entries;
    case 2:
      state = 0;
      $.index(t1, this._nextValidIndex) === $.CTC4 && this._advance$0();
      t1 = this._nextValidIndex;
      t2 = $.get$length(this._entries);
    case 3:
      state = 0;
      return $.lt(t1, t2);
  }
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_lib1_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib1_list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_1 = 0;
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_10 = 0;
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  if (this._map.containsKey$1(key) === true) {
    var t1 = this._map;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(1, key, value, t1);
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    $.addLast(this._lib1_list, $.KeyValuePair$(key, value));
    t1 = this._map;
    if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(2, key, t1, 0);
    t2 = this._lib1_list.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      t1 = env2;
      break;
    case 2:
      key = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
    case 2:
      if (state == 1 || (state == 0 && this._map.containsKey$1(key) === true)) {
        switch (state) {
          case 0:
            var t1 = this._map;
          case 1:
            state = 0;
            $.index(t1, key).get$element().set$value(value);
        }
      } else {
        switch (state) {
          case 0:
            $.addLast(this._lib1_list, $.KeyValuePair$(key, value));
            t1 = this._map;
          case 2:
            state = 0;
            $.indexSet(t1, key, this._lib1_list.lastEntry$0());
        }
      }
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._lib1_list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
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
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 append$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this, this._next);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC2);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC2);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  var entry = this._sentinel.get$_next();
  for (; t1 = this._sentinel, !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element()) === true && other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
  var t1;
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  var entry = this._sentinel.get$_next();
  for (; t1 = this._sentinel, !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry = nextEntry;
  }
  var t1;
 },
 clear$0: function() {
  var t1 = this._sentinel;
  this._sentinel.set$_next(t1);
  t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel.get$_next();
  var t2 = this._sentinel;
  return t1 == null ? t2 == null : t1 === t2;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addFirst$1: function(value) {
  this._sentinel.append$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t2 = $.get$length(str);
  if (typeof t2 !== 'number') return this.add$1$bailout(2, t1, t2);
  this._length = t1 + t2;
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
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t2 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t2);
      return this;
  }
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 },
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  return !(this.stack == null) ? this.stack : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib2_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); ++i) {
    i > 0 && sb.add$1(', ');
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; $.ltB(i, $.get$length(this._existingArgumentNames)); ++i) {
    i > 0 && sb.add$1(', ');
    sb.add$1($.index(this._existingArgumentNames, i));
  }
  var formalParameters = sb.toString$0();
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(this._functionName) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(this._functionName) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(this._functionName) + '(' + $.S(formalParameters) + ')';
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if (this.functionName == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(this.functionName) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return !(this._message == null) ? 'NotImplementedException: ' + $.S(this._message) : 'NotImplementedException';
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.ExpectException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return this.message;
 }
};

$$.BlobTest = {"":
 ["fps", "frameCount", "world", "debugDraw", "viewport", "ctx", "canvas", "bodies"],
 super: "Demo",
 initialize$0: function() {
  var sd = $.PolygonShape$();
  sd.setAsBox$2(50.0, 0.4);
  var bd = $.BodyDef$();
  bd.position.setCoords$2(0.0, 0.0);
  var ground = this.world.createBody$1(bd);
  this.bodies.push(ground);
  ground.createFixtureFromShape$1(sd);
  sd.setAsBoxWithCenterAndAngle$4(0.4, 50.0, $.Vector$(-10.0, 0.0), 0.0);
  ground.createFixtureFromShape$1(sd);
  sd.setAsBoxWithCenterAndAngle$4(0.4, 50.0, $.Vector$(10.0, 0.0), 0.0);
  ground.createFixtureFromShape$1(sd);
  var cvjd = $.ConstantVolumeJointDef$();
  for (var i = 0; i < 20; ++i) {
    var angle = $.MathBox_translateAndScale(i, 0, 20, 0, 6.283185307179586);
    bd = $.BodyDef$();
    bd.fixedRotation = true;
    var t1 = $.Math_sin(angle);
    if (typeof t1 !== 'number') throw $.iae(t1);
    var x = 0.0 + 5.0 * t1;
    var t2 = $.Math_cos(angle);
    if (typeof t2 !== 'number') throw $.iae(t2);
    var y = 10.0 + 5.0 * t2;
    bd.position.setFrom$1($.Vector$(x, y));
    bd.type = 2;
    var body = this.world.createBody$1(bd);
    this.bodies.push(body);
    var fd = $.FixtureDef$();
    var cd = $.CircleShape$();
    cd.radius = 0.5;
    fd.shape = cd;
    fd.density = 1.0;
    fd.filter.set$groupIndex(-2);
    body.createFixture$1(fd);
    cvjd.addBody$1(body);
  }
  cvjd.frequencyHz = 10.0;
  cvjd.dampingRatio = 1.0;
  this.world.createJoint$1(cvjd);
  var bd2 = $.BodyDef$();
  bd2.type = 2;
  var psd = $.PolygonShape$();
  t1 = 10.0 + 15.0;
  psd.setAsBoxWithCenterAndAngle$4(3.0, 1.5, $.Vector$(0.0, t1), 0.0);
  bd2.position = $.Vector$(0.0, t1);
  var fallingBox = this.world.createBody$1(bd2);
  this.bodies.push(fallingBox);
  fallingBox.createFixtureFromShape$2(psd, 1.0);
 },
 get$name: function() {
  return 'Blob Test';
 }
};

$$.Demo = {"":
 ["fps!", "frameCount=", "debugDraw!", "bodies?"],
 super: "Object",
 runAnimation$0: function() {
  $.window().requestAnimationFrame$1(new $.Demo_runAnimation_anon(this));
 },
 get$name: function() {
  return 'No Demo Name Set';
 },
 initializeAnimation$0: function() {
  this.canvas = $._ElementFactoryProvider_Element$tag('canvas');
  this.canvas.set$width(900);
  this.canvas.set$height(600);
  $.add$1($.document().get$body().get$nodes(), this.canvas);
  this.ctx = this.canvas.getContext$1('2d');
  var extents = $.Vector$(450.0, 300.0);
  this.viewport = $.CanvasViewportTransform$(extents, extents);
  this.viewport.set$scale(10);
  this.debugDraw = $.CanvasDraw$(this.viewport, this.ctx);
  var t1 = this.debugDraw;
  this.world.set$debugDraw(t1);
  this.frameCount = 0;
  $.window().setInterval$2(new $.Demo_initializeAnimation_anon(this), 1000);
 },
 step$1: function(timestamp) {
  this.world.step$3(0.016666666666666666, 10, 10);
  this.ctx.clearRect$4(0, 0, 900, 600);
  this.world.drawDebugData$0();
  this.ctx.setFillColor$1('black');
  this.ctx.set$font('18pt monospace');
  this.ctx.fillText$3(this.get$name(), 20, 20);
  if (!(this.fps == null)) {
    this.ctx.setFillColor$1('red');
    this.ctx.set$font('12pt monospace');
    this.ctx.fillText$3('FPS: ' + $.S($.toStringAsFixed(this.fps, 2)), 20, 40);
  }
  this.frameCount = $.add(this.frameCount, 1);
  $.window().requestAnimationFrame$1(new $.Demo_step_anon(this));
 },
 Demo$0: function() {
  this.world = $.World$($.Vector$(0, -10), true, $.DefaultWorldPool$());
 }
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._this.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 setRange$4: function(start, rangeLength, from, startFrom) {
  return $.setRange$4(this._list, start, rangeLength, from, startFrom);
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,0)
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 sort$1: function(compare) {
  return $.sort(this._list, compare);
 },
 addLast$1: function(value) {
  return $.addLast(this._list, value);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 filter$1: function(f) {
  return $.filter(this._list, f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._list, f));
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.next$0$bailout(2, t1, t2);
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t2, 1);
      return $.index(t1, t2);
  }
 },
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t2, t1);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  this._visited.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    this._visited.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  t1.copy_1 = $.index(this._visited, map);
  if (!(t1.copy_1 == null)) return t1.copy_1;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(this._visited, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var copy = this._visited.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  this._visited.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var copy = $.index(this._visited, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(this._visited, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var copyId = $.index(this._visited, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(this._visited, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var copyId = $.index(this._visited, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(this._visited, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Manager = {"":
 ["managers", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!($._globalState().get$rootContext() == null) && ($._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && ($._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true))) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  if ($.isEmpty(this.events) === true) return;
  return this.events.removeFirst$0();
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort) {
    var t1 = $.eqB(this._workerId, other._workerId) && ($.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId));
  } else t1 = false;
  return t1;
 },
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.AxisAlignedBox = {"":
 ["upperBound?", "lowerBound?"],
 super: "Object",
 toString$0: function() {
  return $.S(this.lowerBound) + ', ' + $.S(this.upperBound);
 },
 setFrom$1: function(other) {
  this.lowerBound.setFrom$1(other.get$lowerBound());
  this.upperBound.setFrom$1(other.get$upperBound());
 },
 contains$1: function(aabb) {
  return $.gtB(this.lowerBound.get$x(), aabb.get$lowerBound().get$x()) && ($.gtB(this.lowerBound.get$y(), aabb.get$lowerBound().get$y()) && ($.ltB(this.upperBound.get$y(), aabb.get$upperBound().get$y()) && $.ltB(this.upperBound.get$x(), aabb.get$upperBound().get$x())));
 },
 get$center: function() {
  var c = $.Vector$copy(this.lowerBound);
  c.addLocal$1(this.upperBound);
  c.mulLocal$1(0.5);
  return c;
 },
 setFromCombination$2: function(boxOne, boxTwo) {
  var t1 = $.Math_min(boxOne.get$lowerBound().get$x(), boxTwo.get$lowerBound().get$x());
  this.lowerBound.set$x(t1);
  t1 = $.Math_min(boxOne.get$lowerBound().get$y(), boxTwo.get$lowerBound().get$y());
  this.lowerBound.set$y(t1);
  t1 = $.Math_max(boxOne.get$upperBound().get$x(), boxTwo.get$upperBound().get$x());
  this.upperBound.set$x(t1);
  t1 = $.Math_max(boxOne.get$upperBound().get$y(), boxTwo.get$upperBound().get$y());
  this.upperBound.set$y(t1);
 },
 AxisAlignedBox$2: function(lowerBound, upperBound) {
  if (this.lowerBound == null) this.lowerBound = $.Vector$(0, 0);
  if (this.upperBound == null) this.upperBound = $.Vector$(0, 0);
 }
};

$$.Collision = {"":
 ["clipPoints2", "clipPoints1", "v12", "v11", "normal1", "normal?", "tangent", "planePoint", "localNormal?", "localTangent", "incidentEdge?", "results2", "results1", "output", "input", "cache", "_pool"],
 super: "Object",
 collidePolygons$5: function(manifold, polyA, xfA, polyB, xfB) {
  manifold.set$pointCount(0);
  var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
  if (typeof totalRadius !== 'number') return this.collidePolygons$5$bailout(1, manifold, polyA, xfA, polyB, xfB, totalRadius);
  this.findMaxSeparation$5(this.results1, polyA, xfA, polyB, xfB);
  if ($.gtB(this.results1.separation, totalRadius)) return;
  this.findMaxSeparation$5(this.results2, polyB, xfB, polyA, xfA);
  if ($.gtB(this.results2.separation, totalRadius)) return;
  var t1 = this.results2.separation;
  var t2 = this.results1.separation;
  if (typeof t2 !== 'number') throw $.iae(t2);
  if ($.gtB(t1, 0.98 * t2 + 0.001)) {
    var edge1 = this.results2.edgeIndex;
    manifold.set$type(2);
    var poly2 = polyA;
    var xf2 = xfA;
    var xf1 = xfB;
    var poly1 = polyB;
    var flip = 1;
  } else {
    edge1 = this.results1.edgeIndex;
    manifold.set$type(1);
    poly2 = polyB;
    xf2 = xfB;
    xf1 = xfA;
    poly1 = polyA;
    flip = 0;
  }
  this.findIncidentEdge$6(this.incidentEdge, poly1, xf1, edge1, poly2, xf2);
  var count1 = poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  this.v11.setFrom$1($.index(vertices1, edge1));
  t1 = this.v12;
  t1.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
  this.localTangent.setFrom$1(this.v12).subLocal$1(this.v11);
  this.localTangent.normalize$0();
  $.Vector_crossVectorAndNumToOut(this.localTangent, 1, this.localNormal);
  this.planePoint.setFrom$1(this.v11).addLocal$1(this.v12).mulLocal$1(0.5);
  $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), this.localTangent, this.tangent);
  $.Vector_crossVectorAndNumToOut(this.tangent, 1, this.normal);
  $.Transform_mulToOut(xf1, this.v11, this.v11);
  $.Transform_mulToOut(xf1, this.v12, this.v12);
  var frontOffset = $.Vector_dot(this.normal, this.v11);
  if (typeof frontOffset !== 'number') return this.collidePolygons$5$bailout(2, xf2, manifold, frontOffset, totalRadius, flip, 0);
  var sideOffset1 = $.add($.neg($.Vector_dot(this.tangent, this.v11)), totalRadius);
  var sideOffset2 = $.add($.Vector_dot(this.tangent, this.v12), totalRadius);
  this.tangent.negateLocal$0();
  var np = $.Collision_clipSegmentToLine(this.clipPoints1, this.incidentEdge, this.tangent, sideOffset1);
  this.tangent.negateLocal$0();
  if ($.ltB(np, 2)) return;
  if ($.ltB($.Collision_clipSegmentToLine(this.clipPoints2, this.clipPoints1, this.tangent, sideOffset2), 2)) return;
  manifold.get$localNormal().setFrom$1(this.localNormal);
  manifold.get$localPoint().setFrom$1(this.planePoint);
  for (var pointCount = 0, i = 0; i < 2; ++i) {
    t1 = this.normal;
    t2 = this.clipPoints2;
    var t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    if ($.leB($.sub($.Vector_dot(t1, t2[i].get$v()), frontOffset), totalRadius)) {
      var cp = $.index(manifold.get$points(), pointCount);
      t1 = this.clipPoints2;
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
      t3 = cp.get$id();
      var t4 = this.clipPoints2;
      var t5 = t4.length;
      if (i < 0 || i >= t5) throw $.ioore(i);
      t3.setFrom$1(t4[i].get$id());
      cp.get$id().get$features().set$flip(flip);
      ++pointCount;
    }
  }
  manifold.set$pointCount(pointCount);
 },
 collidePolygons$5$bailout: function(state, env0, env1, env2, env3, env4, env5) {
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
      frontOffset = env2;
      totalRadius = env3;
      flip = env4;
      break;
  }
  switch (state) {
    case 0:
      manifold.set$pointCount(0);
      var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
    case 1:
      state = 0;
      this.findMaxSeparation$5(this.results1, polyA, xfA, polyB, xfB);
      if ($.gtB(this.results1.get$separation(), totalRadius)) return;
      this.findMaxSeparation$5(this.results2, polyB, xfB, polyA, xfA);
      if ($.gtB(this.results2.get$separation(), totalRadius)) return;
      var t1 = this.results2.get$separation();
      var t2 = this.results1.get$separation();
      if (typeof t2 !== 'number') throw $.iae(t2);
      if ($.gtB(t1, 0.98 * t2 + 0.001)) {
        var edge1 = this.results2.get$edgeIndex();
        manifold.set$type(2);
        var poly2 = polyA;
        var xf2 = xfA;
        var xf1 = xfB;
        var poly1 = polyB;
        var flip = 1;
      } else {
        edge1 = this.results1.get$edgeIndex();
        manifold.set$type(1);
        poly2 = polyB;
        xf2 = xfB;
        xf1 = xfA;
        poly1 = polyA;
        flip = 0;
      }
      this.findIncidentEdge$6(this.incidentEdge, poly1, xf1, edge1, poly2, xf2);
      var count1 = poly1.get$vertexCount();
      var vertices1 = poly1.get$vertices();
      this.v11.setFrom$1($.index(vertices1, edge1));
      t1 = this.v12;
      t1.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
      this.localTangent.setFrom$1(this.v12).subLocal$1(this.v11);
      this.localTangent.normalize$0();
      $.Vector_crossVectorAndNumToOut(this.localTangent, 1, this.localNormal);
      this.planePoint.setFrom$1(this.v11).addLocal$1(this.v12).mulLocal$1(0.5);
      $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), this.localTangent, this.tangent);
      $.Vector_crossVectorAndNumToOut(this.tangent, 1, this.normal);
      $.Transform_mulToOut(xf1, this.v11, this.v11);
      $.Transform_mulToOut(xf1, this.v12, this.v12);
      var frontOffset = $.Vector_dot(this.normal, this.v11);
    case 2:
      state = 0;
      var sideOffset1 = $.add($.neg($.Vector_dot(this.tangent, this.v11)), totalRadius);
      var sideOffset2 = $.add($.Vector_dot(this.tangent, this.v12), totalRadius);
      this.tangent.negateLocal$0();
      var np = $.Collision_clipSegmentToLine(this.clipPoints1, this.incidentEdge, this.tangent, sideOffset1);
      this.tangent.negateLocal$0();
      if ($.ltB(np, 2)) return;
      if ($.ltB($.Collision_clipSegmentToLine(this.clipPoints2, this.clipPoints1, this.tangent, sideOffset2), 2)) return;
      manifold.get$localNormal().setFrom$1(this.localNormal);
      manifold.get$localPoint().setFrom$1(this.planePoint);
      for (var pointCount = 0, i = 0; i < 2; ++i) {
        t1 = this.normal;
        t2 = this.clipPoints2;
        var t3 = t2.length;
        if (i < 0 || i >= t3) throw $.ioore(i);
        if ($.leB($.sub($.Vector_dot(t1, t2[i].get$v()), frontOffset), totalRadius)) {
          var cp = $.index(manifold.get$points(), pointCount);
          t1 = this.clipPoints2;
          t2 = t1.length;
          if (i < 0 || i >= t2) throw $.ioore(i);
          $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
          t3 = cp.get$id();
          var t4 = this.clipPoints2;
          var t5 = t4.length;
          if (i < 0 || i >= t5) throw $.ioore(i);
          t3.setFrom$1(t4[i].get$id());
          cp.get$id().get$features().set$flip(flip);
          ++pointCount;
        }
      }
      manifold.set$pointCount(pointCount);
  }
 },
 findIncidentEdge$6: function(c, poly1, xf1, edge1, poly2, xf2) {
  poly1.get$vertexCount();
  var normals1 = poly1.get$normals();
  var count2 = poly2.get$vertexCount();
  if (typeof count2 !== 'number') return this.findIncidentEdge$6$bailout(1, c, xf1, edge1, poly2, xf2, normals1, count2, 0);
  var vertices2 = poly2.get$vertices();
  var normals2 = poly2.get$normals();
  if (typeof normals2 !== 'string' && (typeof normals2 !== 'object' || normals2 === null || (normals2.constructor !== Array && !normals2.is$JavaScriptIndexingBehavior()))) return this.findIncidentEdge$6$bailout(2, c, xf1, edge1, xf2, normals1, count2, vertices2, normals2);
  $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), $.index(normals1, edge1), this.normal1);
  $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), this.normal1, this.normal1);
  for (var minDot = 99999999999999.0, i = 0, index = 0; i < count2; ++i) {
    var t1 = this.normal1;
    var t2 = normals2.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var dot = $.Vector_dot(t1, normals2[i]);
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
      $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), $.index(normals1, edge1), this.normal1);
      $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), this.normal1, this.normal1);
      for (var minDot = 99999999999999.0, i = 0, index = 0; $.ltB(i, count2); ++i) {
        var dot = $.Vector_dot(this.normal1, $.index(normals2, i));
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
 findMaxSeparation$5: function(results, poly1, xf1, poly2, xf2) {
  var count1 = poly1.get$vertexCount();
  if (count1 !== (count1 | 0)) return this.findMaxSeparation$5$bailout(1, results, poly1, xf1, poly2, xf2, count1, 0, 0, 0, 0, 0);
  var normals1 = poly1.get$normals();
  if (typeof normals1 !== 'string' && (typeof normals1 !== 'object' || normals1 === null || (normals1.constructor !== Array && !normals1.is$JavaScriptIndexingBehavior()))) return this.findMaxSeparation$5$bailout(2, results, poly1, xf1, poly2, xf2, count1, normals1, 0, 0, 0, 0);
  var v = poly2.get$centroid();
  var predy = $.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y()));
  var predx = $.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y()));
  var v1 = poly1.get$centroid();
  var tempy = $.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y()));
  var dx = $.sub(predx, $.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())));
  var dy = $.sub(predy, tempy);
  var R = xf1.get$rotation();
  var dLocal1x = $.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y()));
  if (typeof dLocal1x !== 'number') return this.findMaxSeparation$5$bailout(3, results, dLocal1x, poly1, xf1, poly2, xf2, dy, count1, normals1, dx, R);
  var dLocal1y = $.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y()));
  if (typeof dLocal1y !== 'number') return this.findMaxSeparation$5$bailout(4, results, dLocal1x, poly1, xf1, poly2, xf2, count1, normals1, dLocal1y, 0, 0);
  for (var edge = 0, i = 0, maxDot = 1e-12, dot = null; i < count1; ++i) {
    var t1 = normals1.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = normals1[i];
    dot = $.add($.mul(t2.get$x(), dLocal1x), $.mul(t2.get$y(), dLocal1y));
    if ($.gtB(dot, maxDot)) {
      edge = i;
      maxDot = dot;
    }
  }
  var s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
  if (typeof s !== 'number') return this.findMaxSeparation$5$bailout(5, results, poly1, xf1, poly2, xf2, count1, s, edge, 0, 0, 0);
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
    if (!$.gtB(sNext, s)) {
      results.set$edgeIndex(edge);
      results.set$separation(s);
      return;
    }
    bestSeparation = sNext;
    bestEdge = nextEdge;
    increment = 1;
  }
  if (typeof bestSeparation !== 'number') return this.findMaxSeparation$5$bailout(6, results, poly1, xf1, poly2, xf2, count1, bestEdge, bestSeparation, increment, s, edge);
  for (t1 = increment === -1, edge0 = count1 - 1; true; ) {
    if (t1) {
      edge = bestEdge - 1;
      edge = edge >= 0 ? edge : edge0;
    } else {
      edge = bestEdge + 1;
      edge = edge < count1 ? edge : 0;
    }
    s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
    if (!$.gtB(s, bestSeparation)) break;
    bestSeparation = s;
    bestEdge = edge;
  }
  results.set$edgeIndex(bestEdge);
  results.set$separation(bestSeparation);
  var edge0;
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
        if (!$.gtB(sNext, s)) {
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
      for (var t1 = increment === -1; true; ) {
        if (t1) {
          edge = $.geB($.sub(bestEdge, 1), 0) ? $.sub(bestEdge, 1) : $.sub(count1, 1);
        } else {
          edge = $.ltB($.add(bestEdge, 1), count1) ? $.add(bestEdge, 1) : 0;
        }
        s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
        if (!$.gtB(s, bestSeparation)) break;
        bestSeparation = s;
        bestEdge = edge;
      }
      results.set$edgeIndex(bestEdge);
      results.set$separation(bestSeparation);
  }
 },
 edgeSeparation$5: function(poly1, xf1, edge1, poly2, xf2) {
  poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  if (typeof vertices1 !== 'string' && (typeof vertices1 !== 'object' || vertices1 === null || (vertices1.constructor !== Array && !vertices1.is$JavaScriptIndexingBehavior()))) return this.edgeSeparation$5$bailout(1, poly1, xf1, edge1, poly2, xf2, vertices1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var normals1 = poly1.get$normals();
  if (typeof normals1 !== 'string' && (typeof normals1 !== 'object' || normals1 === null || (normals1.constructor !== Array && !normals1.is$JavaScriptIndexingBehavior()))) return this.edgeSeparation$5$bailout(2, xf1, edge1, poly2, xf2, vertices1, normals1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var count2 = poly2.get$vertexCount();
  if (typeof count2 !== 'number') return this.edgeSeparation$5$bailout(3, xf1, edge1, poly2, xf2, vertices1, normals1, count2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var vertices2 = poly2.get$vertices();
  if (typeof vertices2 !== 'string' && (typeof vertices2 !== 'object' || vertices2 === null || (vertices2.constructor !== Array && !vertices2.is$JavaScriptIndexingBehavior()))) return this.edgeSeparation$5$bailout(4, xf1, edge1, xf2, vertices1, normals1, count2, vertices2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var R = xf1.get$rotation();
  if (edge1 !== (edge1 | 0)) throw $.iae(edge1);
  var t1 = normals1.length;
  if (edge1 < 0 || edge1 >= t1) throw $.ioore(edge1);
  var t2 = normals1[edge1];
  var t3 = R.get$col1().get$y();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(5, xf1, edge1, xf2, t3, vertices1, count2, vertices2, R, t2, 0, 0, 0, 0, 0, 0, 0, 0);
  var t4 = t2.get$x();
  if (typeof t4 !== 'number') return this.edgeSeparation$5$bailout(6, xf1, edge1, t4, xf2, t3, vertices1, count2, vertices2, R, t2, 0, 0, 0, 0, 0, 0, 0);
  t4 *= t3;
  t3 = R.get$col2().get$y();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(7, xf1, edge1, xf2, t4, t3, vertices1, count2, vertices2, R, t2, 0, 0, 0, 0, 0, 0, 0);
  var t5 = t2.get$y();
  if (typeof t5 !== 'number') return this.edgeSeparation$5$bailout(8, xf1, edge1, xf2, t4, t3, t5, vertices1, count2, vertices2, R, t2, 0, 0, 0, 0, 0, 0);
  var normal1Worldy = t4 + t3 * t5;
  t4 = R.get$col1().get$x();
  if (typeof t4 !== 'number') return this.edgeSeparation$5$bailout(9, xf1, edge1, xf2, vertices1, count2, vertices2, normal1Worldy, R, t4, t2, 0, 0, 0, 0, 0, 0, 0);
  var t6 = t2.get$x();
  if (typeof t6 !== 'number') return this.edgeSeparation$5$bailout(10, xf1, edge1, t6, xf2, vertices1, count2, vertices2, normal1Worldy, R, t4, t2, 0, 0, 0, 0, 0, 0);
  t6 *= t4;
  t4 = R.get$col2().get$x();
  if (typeof t4 !== 'number') return this.edgeSeparation$5$bailout(11, t6, xf1, edge1, t4, xf2, vertices1, count2, vertices2, normal1Worldy, R, t2, 0, 0, 0, 0, 0, 0);
  t2 = t2.get$y();
  if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(12, t6, xf1, edge1, t4, xf2, t2, vertices1, count2, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  var normal1Worldx = t6 + t4 * t2;
  var R1 = xf2.get$rotation();
  t6 = R1.get$col1().get$x();
  if (typeof t6 !== 'number') return this.edgeSeparation$5$bailout(13, t6, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  t6 *= normal1Worldx;
  var t7 = R1.get$col1().get$y();
  if (typeof t7 !== 'number') return this.edgeSeparation$5$bailout(14, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, t6, R, t7, normal1Worldy, 0, 0, 0, 0, 0);
  var normal1x = t6 + normal1Worldy * t7;
  t6 = R1.get$col2().get$x();
  if (typeof t6 !== 'number') return this.edgeSeparation$5$bailout(15, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, R, normal1x, t6, normal1Worldy, 0, 0, 0, 0, 0);
  t6 *= normal1Worldx;
  var t8 = R1.get$col2().get$y();
  if (typeof t8 !== 'number') return this.edgeSeparation$5$bailout(16, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, R, normal1x, t6, t8, normal1Worldy, 0, 0, 0, 0);
  var normal1y = t6 + normal1Worldy * t8;
  for (var minDot = 99999999999999.0, i = 0, index = 0; i < count2; ++i) {
    t1 = vertices2.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = vertices2[i];
    t3 = t2.get$x();
    if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(17, xf1, edge1, xf2, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y, t2, t3);
    t3 *= normal1x;
    t2 = t2.get$y();
    if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(18, t3, t2, edge1, xf1, xf2, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y);
    var dot = t3 + t2 * normal1y;
    if (typeof dot !== 'number') return this.edgeSeparation$5$bailout(19, xf1, edge1, xf2, dot, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y, 0);
    if (dot < minDot) {
      index = i;
      minDot = dot;
    }
  }
  t1 = vertices1.length;
  if (edge1 < 0 || edge1 >= t1) throw $.ioore(edge1);
  t2 = vertices1[edge1];
  t3 = xf1.get$position().get$y();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(20, index, xf1, xf2, normal1Worldx, R1, t2, vertices2, normal1Worldy, R, t3, 0, 0, 0, 0, 0, 0, 0);
  t4 = R.get$col1().get$y();
  if (typeof t4 !== 'number') return this.edgeSeparation$5$bailout(21, index, xf1, xf2, normal1Worldx, R1, t2, vertices2, normal1Worldy, R, t4, t3, 0, 0, 0, 0, 0, 0);
  t5 = t2.get$x();
  if (typeof t5 !== 'number') return this.edgeSeparation$5$bailout(22, xf1, xf2, normal1Worldx, R1, vertices2, R, index, t2, normal1Worldy, t3, t4, t5, 0, 0, 0, 0, 0);
  t3 += t4 * t5;
  t6 = R.get$col2().get$y();
  if (typeof t6 !== 'number') return this.edgeSeparation$5$bailout(23, index, xf1, t3, xf2, t6, normal1Worldx, R1, t2, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  t7 = t2.get$y();
  if (typeof t7 !== 'number') return this.edgeSeparation$5$bailout(24, xf1, t3, xf2, t6, t7, normal1Worldx, R1, vertices2, R, index, t2, normal1Worldy, 0, 0, 0, 0, 0);
  var v1y = t3 + t6 * t7;
  t3 = xf1.get$position().get$x();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(25, index, xf2, normal1Worldx, R1, t2, v1y, vertices2, t3, R, normal1Worldy, 0, 0, 0, 0, 0, 0, 0);
  t8 = R.get$col1().get$x();
  if (typeof t8 !== 'number') return this.edgeSeparation$5$bailout(26, index, normal1Worldy, xf2, normal1Worldx, R1, t2, v1y, vertices2, t3, R, t8, 0, 0, 0, 0, 0, 0);
  var t9 = t2.get$x();
  if (typeof t9 !== 'number') return this.edgeSeparation$5$bailout(27, xf2, normal1Worldx, R1, v1y, vertices2, t3, R, t8, t9, index, t2, normal1Worldy, 0, 0, 0, 0, 0);
  t3 += t8 * t9;
  var t10 = R.get$col2().get$x();
  if (typeof t10 !== 'number') return this.edgeSeparation$5$bailout(28, index, t3, xf2, t10, normal1Worldx, R1, v1y, normal1Worldy, vertices2, t2, 0, 0, 0, 0, 0, 0, 0);
  t2 = t2.get$y();
  if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(29, index, t3, xf2, t10, t2, normal1Worldx, R1, v1y, normal1Worldy, vertices2, 0, 0, 0, 0, 0, 0, 0);
  var v1x = t3 + t10 * t2;
  t3 = vertices2.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  var t11 = vertices2[index];
  var t12 = xf2.get$position().get$y();
  if (typeof t12 !== 'number') return this.edgeSeparation$5$bailout(30, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, t11, t12, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t13 = R1.get$col1().get$y();
  if (typeof t13 !== 'number') return this.edgeSeparation$5$bailout(31, t13, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, t11, t12, 0, 0, 0, 0, 0, 0, 0, 0);
  var t14 = t11.get$x();
  if (typeof t14 !== 'number') return this.edgeSeparation$5$bailout(32, t13, t14, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, t11, t12, 0, 0, 0, 0, 0, 0, 0);
  t12 += t13 * t14;
  var t15 = R1.get$col2().get$y();
  if (typeof t15 !== 'number') return this.edgeSeparation$5$bailout(33, xf2, t12, normal1Worldx, R1, t15, v1y, normal1Worldy, v1x, t11, 0, 0, 0, 0, 0, 0, 0, 0);
  var t16 = t11.get$y();
  if (typeof t16 !== 'number') return this.edgeSeparation$5$bailout(34, xf2, t12, normal1Worldx, R1, t16, t15, v1y, normal1Worldy, v1x, t11, 0, 0, 0, 0, 0, 0, 0);
  var v2y = t12 + t15 * t16 - v1y;
  var t17 = xf2.get$position().get$x();
  if (typeof t17 !== 'number') return this.edgeSeparation$5$bailout(35, t17, normal1Worldx, R1, v1x, normal1Worldy, t11, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t18 = R1.get$col1().get$x();
  if (typeof t18 !== 'number') return this.edgeSeparation$5$bailout(36, t17, t18, normal1Worldx, R1, v1x, normal1Worldy, t11, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t19 = t11.get$x();
  if (typeof t19 !== 'number') return this.edgeSeparation$5$bailout(37, t17, t18, t19, normal1Worldx, R1, v1x, normal1Worldy, t11, v2y, 0, 0, 0, 0, 0, 0, 0, 0);
  t17 += t18 * t19;
  var t20 = R1.get$col2().get$x();
  if (typeof t20 !== 'number') return this.edgeSeparation$5$bailout(38, normal1Worldx, t17, t20, v1x, normal1Worldy, t11, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  t11 = t11.get$y();
  if (typeof t11 !== 'number') return this.edgeSeparation$5$bailout(39, normal1Worldx, t17, t20, v1x, normal1Worldy, t11, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  return (t17 + t20 * t11 - v1x) * normal1Worldx + v2y * normal1Worldy;
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
      t1 = env3;
      vertices1 = env4;
      count2 = env5;
      vertices2 = env6;
      R = env7;
      v = env8;
      break;
    case 6:
      xf1 = env0;
      edge1 = env1;
      t2 = env2;
      xf2 = env3;
      t1 = env4;
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
      t2 = env3;
      t1 = env4;
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
      t2 = env3;
      t1 = env4;
      t3 = env5;
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
      t2 = env8;
      v = env9;
      break;
    case 10:
      xf1 = env0;
      edge1 = env1;
      t4 = env2;
      xf2 = env3;
      vertices1 = env4;
      count2 = env5;
      vertices2 = env6;
      normal1Worldy = env7;
      R = env8;
      t2 = env9;
      v = env10;
      break;
    case 11:
      t4 = env0;
      xf1 = env1;
      edge1 = env2;
      t2 = env3;
      xf2 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      normal1Worldy = env8;
      R = env9;
      v = env10;
      break;
    case 12:
      t4 = env0;
      xf1 = env1;
      edge1 = env2;
      t2 = env3;
      xf2 = env4;
      t5 = env5;
      vertices1 = env6;
      count2 = env7;
      vertices2 = env8;
      normal1Worldy = env9;
      R = env10;
      break;
    case 13:
      t4 = env0;
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
      t4 = env8;
      R = env9;
      t6 = env10;
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
      t4 = env10;
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
      t4 = env10;
      t7 = env11;
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
      t2 = env1;
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
      t2 = env9;
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
      t2 = env10;
      t3 = env11;
      break;
    case 23:
      index = env0;
      xf1 = env1;
      t1 = env2;
      xf2 = env3;
      t4 = env4;
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
      t4 = env3;
      t5 = env4;
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
      t6 = env10;
      break;
    case 27:
      xf2 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1y = env3;
      vertices2 = env4;
      t1 = env5;
      R = env6;
      t6 = env7;
      t7 = env8;
      index = env9;
      v3 = env10;
      normal1Worldy = env11;
      break;
    case 28:
      index = env0;
      t1 = env1;
      xf2 = env2;
      t8 = env3;
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
      t8 = env3;
      t9 = env4;
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
      t10 = env0;
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
      t10 = env0;
      t11 = env1;
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
      t12 = env4;
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
      t13 = env4;
      t12 = env5;
      v1y = env6;
      normal1Worldy = env7;
      v1x = env8;
      v4 = env9;
      break;
    case 35:
      t14 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1x = env3;
      normal1Worldy = env4;
      v4 = env5;
      v2y = env6;
      break;
    case 36:
      t14 = env0;
      t15 = env1;
      normal1Worldx = env2;
      R1 = env3;
      v1x = env4;
      normal1Worldy = env5;
      v4 = env6;
      v2y = env7;
      break;
    case 37:
      t14 = env0;
      t15 = env1;
      t16 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v1x = env5;
      normal1Worldy = env6;
      v4 = env7;
      v2y = env8;
      break;
    case 38:
      normal1Worldx = env0;
      t14 = env1;
      t17 = env2;
      v1x = env3;
      normal1Worldy = env4;
      v4 = env5;
      v2y = env6;
      break;
    case 39:
      normal1Worldx = env0;
      t14 = env1;
      t17 = env2;
      v1x = env3;
      normal1Worldy = env4;
      t18 = env5;
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
      var t1 = R.get$col1().get$y();
    case 5:
      state = 0;
      var t2 = v.get$x();
    case 6:
      state = 0;
      t2 = $.mul(t1, t2);
      t1 = R.get$col2().get$y();
    case 7:
      state = 0;
      var t3 = v.get$y();
    case 8:
      state = 0;
      var normal1Worldy = $.add(t2, $.mul(t1, t3));
      t2 = R.get$col1().get$x();
    case 9:
      state = 0;
      var t4 = v.get$x();
    case 10:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = R.get$col2().get$x();
    case 11:
      state = 0;
      var t5 = v.get$y();
    case 12:
      state = 0;
      var normal1Worldx = $.add(t4, $.mul(t2, t5));
      var R1 = xf2.get$rotation();
      t4 = R1.get$col1().get$x();
    case 13:
      state = 0;
      t4 = $.mul(normal1Worldx, t4);
      var t6 = R1.get$col1().get$y();
    case 14:
      state = 0;
      var normal1x = $.add(t4, $.mul(normal1Worldy, t6));
      t4 = R1.get$col2().get$x();
    case 15:
      state = 0;
      t4 = $.mul(normal1Worldx, t4);
      var t7 = R1.get$col2().get$y();
    case 16:
      state = 0;
      var normal1y = $.add(t4, $.mul(normal1Worldy, t7));
      var minDot = 99999999999999.0;
      var i = 0;
      var index = 0;
    case 17:
    case 18:
    case 19:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, count2)) break L0;
            var a = $.index(vertices2, i);
            t1 = a.get$x();
          case 17:
            state = 0;
            t1 = $.mul(t1, normal1x);
            t2 = a.get$y();
          case 18:
            state = 0;
            var dot = $.add(t1, $.mul(t2, normal1y));
          case 19:
            state = 0;
            if ($.ltB(dot, minDot)) {
              index = i;
              minDot = dot;
            }
            ++i;
        }
      }
      var v3 = $.index(vertices1, edge1);
      t1 = xf1.get$position().get$y();
    case 20:
      state = 0;
      t2 = R.get$col1().get$y();
    case 21:
      state = 0;
      t3 = v3.get$x();
    case 22:
      state = 0;
      t1 = $.add(t1, $.mul(t2, t3));
      t4 = R.get$col2().get$y();
    case 23:
      state = 0;
      t5 = v3.get$y();
    case 24:
      state = 0;
      var v1y = $.add(t1, $.mul(t4, t5));
      t1 = xf1.get$position().get$x();
    case 25:
      state = 0;
      t6 = R.get$col1().get$x();
    case 26:
      state = 0;
      t7 = v3.get$x();
    case 27:
      state = 0;
      t1 = $.add(t1, $.mul(t6, t7));
      var t8 = R.get$col2().get$x();
    case 28:
      state = 0;
      var t9 = v3.get$y();
    case 29:
      state = 0;
      var v1x = $.add(t1, $.mul(t8, t9));
      var v4 = $.index(vertices2, index);
      t1 = xf2.get$position().get$y();
    case 30:
      state = 0;
      var t10 = R1.get$col1().get$y();
    case 31:
      state = 0;
      var t11 = v4.get$x();
    case 32:
      state = 0;
      t1 = $.add(t1, $.mul(t10, t11));
      var t12 = R1.get$col2().get$y();
    case 33:
      state = 0;
      var t13 = v4.get$y();
    case 34:
      state = 0;
      var v2y = $.sub($.add(t1, $.mul(t12, t13)), v1y);
      var t14 = xf2.get$position().get$x();
    case 35:
      state = 0;
      var t15 = R1.get$col1().get$x();
    case 36:
      state = 0;
      var t16 = v4.get$x();
    case 37:
      state = 0;
      t14 = $.add(t14, $.mul(t15, t16));
      var t17 = R1.get$col2().get$x();
    case 38:
      state = 0;
      var t18 = v4.get$y();
    case 39:
      state = 0;
      return $.add($.mul($.sub($.add(t14, $.mul(t17, t18)), v1x), normal1Worldx), $.mul(v2y, normal1Worldy));
  }
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
  if (typeof cLocaly !== 'number') return this.collidePolygonAndCircle$5$bailout(1, manifold, cLocaly, polygon, circle, v1x, v1y, b, 0);
  var cLocalx = $.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y()));
  if (typeof cLocalx !== 'number') return this.collidePolygonAndCircle$5$bailout(2, manifold, cLocaly, polygon, circle, cLocalx, 0, 0, 0);
  var radius = $.add(polygon.get$radius(), circle.get$radius());
  if (typeof radius !== 'number') return this.collidePolygonAndCircle$5$bailout(3, manifold, cLocaly, polygon, circle, cLocalx, radius, 0, 0);
  var vertexCount = polygon.get$vertexCount();
  if (typeof vertexCount !== 'number') return this.collidePolygonAndCircle$5$bailout(4, manifold, cLocaly, polygon, circle, cLocalx, radius, vertexCount, 0);
  var vertices = polygon.get$vertices();
  if (typeof vertices !== 'string' && (typeof vertices !== 'object' || vertices === null || (vertices.constructor !== Array && !vertices.is$JavaScriptIndexingBehavior()))) return this.collidePolygonAndCircle$5$bailout(5, manifold, cLocaly, polygon, circle, vertices, cLocalx, radius, vertexCount);
  var normals = polygon.get$normals();
  if (typeof normals !== 'string' && (typeof normals !== 'object' || normals === null || (normals.constructor !== Array && !normals.is$JavaScriptIndexingBehavior()))) return this.collidePolygonAndCircle$5$bailout(6, manifold, cLocaly, normals, circle, vertices, cLocalx, radius, vertexCount);
  for (var normalIndex = 0, i = 0, separation = 1e-12; i < vertexCount; ++i) {
    var t1 = vertices.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = vertices[i];
    var t3 = t2.get$x();
    if (typeof t3 !== 'number') throw $.iae(t3);
    var tempx = cLocalx - t3;
    t2 = t2.get$y();
    if (typeof t2 !== 'number') throw $.iae(t2);
    var tempy = cLocaly - t2;
    t2 = normals.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = normals[i];
    var s = $.add($.mul(t3.get$x(), tempx), $.mul(t3.get$y(), tempy));
    if ($.gtB(s, radius)) return;
    if ($.gtB(s, separation)) {
      separation = s;
      normalIndex = i;
    }
  }
  var vertIndex2 = normalIndex + 1;
  vertIndex2 = vertIndex2 < vertexCount ? vertIndex2 : 0;
  t1 = vertices.length;
  if (normalIndex < 0 || normalIndex >= t1) throw $.ioore(normalIndex);
  t2 = vertices[normalIndex];
  t3 = vertices.length;
  if (vertIndex2 < 0 || vertIndex2 >= t3) throw $.ioore(vertIndex2);
  var t4 = vertices[vertIndex2];
  if ($.ltB(separation, 1.192e-7)) {
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = normals.length;
    if (normalIndex < 0 || normalIndex >= t1) throw $.ioore(normalIndex);
    t3 = normals[normalIndex];
    var t5 = t3.get$x();
    manifold.get$localNormal().set$x(t5);
    t3 = t3.get$y();
    manifold.get$localNormal().set$y(t3);
    t3 = $.mul($.add(t2.get$x(), t4.get$x()), 0.5);
    manifold.get$localPoint().set$x(t3);
    t3 = $.mul($.add(t2.get$y(), t4.get$y()), 0.5);
    manifold.get$localPoint().set$y(t3);
    var mpoint = $.index(manifold.get$points(), 0);
    t3 = circle.get$position().get$x();
    mpoint.get$localPoint().set$x(t3);
    t3 = circle.get$position().get$y();
    mpoint.get$localPoint().set$y(t3);
    mpoint.get$id().zero$0();
    return;
  }
  t1 = t2.get$x();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var tempX = cLocalx - t1;
  t1 = t2.get$y();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var tempY = cLocaly - t1;
  var temp2X = $.sub(t4.get$x(), t2.get$x());
  var temp2Y = $.sub(t4.get$y(), t2.get$y());
  if (typeof temp2X !== 'number') throw $.iae(temp2X);
  t1 = tempX * temp2X;
  if (typeof temp2Y !== 'number') throw $.iae(temp2Y);
  var u1 = t1 + tempY * temp2Y;
  t1 = t4.get$x();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var temp3X = cLocalx - t1;
  t1 = t4.get$y();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var temp3Y = cLocaly - t1;
  var temp4X = $.sub(t2.get$x(), t4.get$x());
  var temp4Y = $.sub(t2.get$y(), t4.get$y());
  if (typeof temp4X !== 'number') throw $.iae(temp4X);
  t1 = temp3X * temp4X;
  if (typeof temp4Y !== 'number') throw $.iae(temp4Y);
  var u2 = t1 + temp3Y * temp4Y;
  if (u1 <= 0) {
    t1 = t2.get$x();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var dx = cLocalx - t1;
    t1 = t2.get$y();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var dy = cLocaly - t1;
    if (dx * dx + dy * dy > radius * radius) return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = t2.get$x();
    if (typeof t1 !== 'number') throw $.iae(t1);
    t1 = cLocalx - t1;
    manifold.get$localNormal().set$x(t1);
    t1 = t2.get$y();
    if (typeof t1 !== 'number') throw $.iae(t1);
    t1 = cLocaly - t1;
    manifold.get$localNormal().set$y(t1);
    manifold.get$localNormal().normalize$0();
    manifold.get$localPoint().setFrom$1(t2);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  } else {
    if (u2 <= 0.0) {
      t1 = t4.get$x();
      if (typeof t1 !== 'number') throw $.iae(t1);
      dx = cLocalx - t1;
      t1 = t4.get$y();
      if (typeof t1 !== 'number') throw $.iae(t1);
      dy = cLocaly - t1;
      if (dx * dx + dy * dy > radius * radius) return;
      manifold.set$pointCount(1);
      manifold.set$type(1);
      t1 = t4.get$x();
      if (typeof t1 !== 'number') throw $.iae(t1);
      t1 = cLocalx - t1;
      manifold.get$localNormal().set$x(t1);
      t1 = t4.get$y();
      if (typeof t1 !== 'number') throw $.iae(t1);
      t1 = cLocaly - t1;
      manifold.get$localNormal().set$y(t1);
      manifold.get$localNormal().normalize$0();
      manifold.get$localPoint().setFrom$1(t4);
      $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
      $.index(manifold.get$points(), 0).get$id().zero$0();
    } else {
      var fcx = $.mul($.add(t2.get$x(), t4.get$x()), 0.5);
      var fcy = $.mul($.add(t2.get$y(), t4.get$y()), 0.5);
      if (typeof fcx !== 'number') throw $.iae(fcx);
      var tx = cLocalx - fcx;
      if (typeof fcy !== 'number') throw $.iae(fcy);
      var ty = cLocaly - fcy;
      t1 = normals.length;
      if (normalIndex < 0 || normalIndex >= t1) throw $.ioore(normalIndex);
      t3 = normals[normalIndex];
      t5 = t3.get$x();
      if (typeof t5 !== 'number') throw $.iae(t5);
      t5 *= tx;
      t3 = t3.get$y();
      if (typeof t3 !== 'number') throw $.iae(t3);
      if (t5 + ty * t3 > radius) return;
      manifold.set$pointCount(1);
      manifold.set$type(1);
      t1 = manifold.get$localNormal();
      t2 = normals.length;
      if (normalIndex < 0 || normalIndex >= t2) throw $.ioore(normalIndex);
      t1.setFrom$1(normals[normalIndex]);
      manifold.get$localPoint().set$x(fcx);
      manifold.get$localPoint().set$y(fcy);
      $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
      $.index(manifold.get$points(), 0).get$id().zero$0();
    }
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
        if ($.gtB(s, radius)) return;
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
        if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius))) return;
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
      } else {
        if ($.leB(u2, 0.0)) {
          dx = $.sub(cLocalx, v2.get$x());
          dy = $.sub(cLocaly, v2.get$y());
          if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius))) return;
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
          if ($.gtB($.add($.mul(tx, norm.get$x()), $.mul(ty, norm.get$y())), radius)) return;
          manifold.set$pointCount(1);
          manifold.set$type(1);
          manifold.get$localNormal().setFrom$1($.index(normals, normalIndex));
          manifold.get$localPoint().set$x(fcx);
          manifold.get$localPoint().set$y(fcy);
          $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
          $.index(manifold.get$points(), 0).get$id().zero$0();
        }
      }
  }
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
  if ($.gtB(distSqr, $.mul(radius, radius))) return;
  manifold.set$type(0);
  manifold.get$localPoint().setFrom$1(circle1.get$position());
  manifold.get$localNormal().setZero$0();
  manifold.set$pointCount(1);
  $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle2.get$position());
  $.index(manifold.get$points(), 0).get$id().zero$0();
 },
 testOverlap$4: function(shapeA, shapeB, transformA, transformB) {
  this.input.get$proxyA().setFromShape$1(shapeA);
  this.input.get$proxyB().setFromShape$1(shapeB);
  this.input.get$transformA().setFrom$1(transformA);
  this.input.get$transformB().setFrom$1(transformB);
  this.input.set$useRadii(true);
  this.cache.set$count(0);
  this._pool.get$distance().distance$3(this.output, this.cache, this.input);
  return $.lt(this.output.get$distance(), 0.000001192);
 },
 Collision$_construct$1: function(pool) {
  $.indexSet(this.incidentEdge, 0, $.ClipVertex$());
  $.indexSet(this.incidentEdge, 1, $.ClipVertex$());
  var t1 = this.clipPoints1;
  var t2 = $.ClipVertex$();
  var t3 = t1.length;
  if (0 < 0 || 0 >= t3) throw $.ioore(0);
  t1[0] = t2;
  t2 = this.clipPoints1;
  t1 = $.ClipVertex$();
  var t4 = t2.length;
  if (1 < 0 || 1 >= t4) throw $.ioore(1);
  t2[1] = t1;
  t1 = this.clipPoints2;
  t2 = $.ClipVertex$();
  var t5 = t1.length;
  if (0 < 0 || 0 >= t5) throw $.ioore(0);
  t1[0] = t2;
  t2 = this.clipPoints2;
  t1 = $.ClipVertex$();
  var t6 = t2.length;
  if (1 < 0 || 1 >= t6) throw $.ioore(1);
  t2[1] = t1;
 }
};

$$.ClipVertex = {"":
 ["id?", "v?"],
 super: "Object",
 setFrom$1: function(cv) {
  this.v.setFrom$1(cv.get$v());
  this.id.setFrom$1(cv.get$id());
 }
};

$$.EdgeResults = {"":
 ["edgeIndex=", "separation="],
 super: "Object"
};

$$.ContactID = {"":
 ["features?"],
 super: "Object",
 zero$0: function() {
  this.features.zero$0();
 },
 isEqual$1: function(other) {
  return $.eq(other.get$features(), this.features);
 },
 setFrom$1: function(other) {
  this.features.setFrom$1(other.get$features());
 },
 operator$eq$1: function(other) {
  return $.eq(other.get$features(), this.features);
 }
};

$$.Distance = {"":
 ["normal?", "temp", "searchDirection", "closestPoint", "saveB", "saveA", "simplex", "maxIters", "iters", "calls"],
 super: "Object",
 distance$3: function(output, cache, input) {
  this.calls = $.add(this.calls, 1);
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  var transformA = input.get$transformA();
  var transformB = input.get$transformB();
  this.simplex.readCache$5(cache, proxyA, transformA, proxyB, transformB);
  var vertices = this.simplex.get$vertices();
  this.simplex.getClosestPoint$1(this.closestPoint);
  var distanceSqr1 = this.closestPoint.get$lengthSquared();
  for (var distanceSqr2 = distanceSqr1, iter = 0, saveCount = 0; $.ltB(iter, this.maxIters); ) {
    saveCount = this.simplex.get$count();
    for (var i = 0; $.ltB(i, saveCount); ++i) {
      $.indexSet(this.saveA, i, $.index(vertices, i).get$indexA());
      $.indexSet(this.saveB, i, $.index(vertices, i).get$indexB());
    }
    switch (this.simplex.get$count()) {
      case 1:
        break;
      case 2:
        this.simplex.solve2$0();
        break;
      case 3:
        this.simplex.solve3$0();
        break;
      default:
    }
    if ($.eqB(this.simplex.get$count(), 3)) break;
    this.simplex.getClosestPoint$1(this.closestPoint);
    distanceSqr2 = this.closestPoint.get$lengthSquared();
    this.simplex.getSearchDirection$1(this.searchDirection);
    if ($.ltB(this.searchDirection.get$lengthSquared(), 1.4208639999999999e-14)) break;
    var vertex = $.index(vertices, this.simplex.get$count());
    $.Matrix22_mulTransMatrixAndVectorToOut(transformA.get$rotation(), this.searchDirection.negateLocal$0(), this.temp);
    vertex.set$indexA(proxyA.getSupport$1(this.temp));
    $.Transform_mulToOut(transformA, $.index(proxyA.get$vertices(), vertex.get$indexA()), vertex.get$wA());
    $.Matrix22_mulTransMatrixAndVectorToOut(transformB.get$rotation(), this.searchDirection.negateLocal$0(), this.temp);
    vertex.set$indexB(proxyB.getSupport$1(this.temp));
    $.Transform_mulToOut(transformB, $.index(proxyB.get$vertices(), vertex.get$indexB()), vertex.get$wB());
    vertex.get$w().setFrom$1(vertex.get$wB()).subLocal$1(vertex.get$wA());
    ++iter;
    this.iters = $.add(this.iters, 1);
    for (i = 0; duplicate = false, $.ltB(i, saveCount); ++i) {
      if ($.eqB(vertex.get$indexA(), $.index(this.saveA, i)) && $.eqB(vertex.get$indexB(), $.index(this.saveB, i))) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) break;
    var t1 = this.simplex;
    t1.set$count($.add(t1.get$count(), 1));
    distanceSqr1 = distanceSqr2;
  }
  this.maxIters = $.Math_max(this.maxIters, iter);
  this.simplex.getWitnessPoints$2(output.get$pointA(), output.get$pointB());
  output.set$distance($.MathBox_distance(output.get$pointA(), output.get$pointB()));
  output.set$iterations(iter);
  this.simplex.writeCache$1(cache);
  if (input.get$useRadii() === true) {
    var rA = proxyA.get$radius();
    var rB = proxyB.get$radius();
    if ($.gtB(output.get$distance(), $.add(rA, rB)) && $.gtB(output.get$distance(), 1.192e-7)) {
      output.set$distance($.sub(output.get$distance(), $.add(rA, rB)));
      this.normal.setFrom$1(output.get$pointB()).subLocal$1(output.get$pointA());
      this.normal.normalize$0();
      this.temp.setFrom$1(this.normal).mulLocal$1(rA);
      output.get$pointA().addLocal$1(this.temp);
      this.temp.setFrom$1(this.normal).mulLocal$1(rB);
      output.get$pointB().subLocal$1(this.temp);
    } else {
      output.get$pointA().addLocal$1(output.get$pointB()).mulLocal$1(0.5);
      output.get$pointB().setFrom$1(output.get$pointA());
      output.set$distance(0.0);
    }
  }
  var duplicate;
 },
 get$distance: function() { return new $.BoundClosure1(this, 'distance$3'); }
};

$$.DistanceInput = {"":
 ["useRadii=", "transformB=", "transformA=", "proxyB=", "proxyA="],
 super: "Object"
};

$$.DistanceOutput = {"":
 ["iterations!", "distance=", "pointB?", "pointA?"],
 super: "Object",
 distance$3: function(arg0, arg1, arg2) { return this.distance.$call$3(arg0, arg1, arg2); }
};

$$.DistanceProxy = {"":
 ["radius=", "count=", "vertices?"],
 super: "Object",
 getSupport$1: function(direction) {
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var bestValue = $.Vector_dot(t1[0], direction);
  if (typeof bestValue !== 'number') return this.getSupport$1$bailout(1, direction, bestValue, 0, 0, 0);
  var bestIndex = 0;
  var i = 1;
  while (true) {
    t1 = this.count;
    if (typeof t1 !== 'number') return this.getSupport$1$bailout(2, direction, t1, bestIndex, i, bestValue);
    if (!(i < t1)) break;
    t1 = this.vertices;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var value = $.Vector_dot(t1[i], direction);
    if (typeof value !== 'number') return this.getSupport$1$bailout(3, direction, bestIndex, i, value, bestValue);
    if (value > bestValue) {
      bestIndex = i;
      bestValue = value;
    }
    ++i;
  }
  return bestIndex;
 },
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var direction = env0;
      bestValue = env1;
      break;
    case 2:
      direction = env0;
      t1 = env1;
      bestIndex = env2;
      i = env3;
      bestValue = env4;
      break;
    case 3:
      direction = env0;
      bestIndex = env1;
      i = env2;
      value = env3;
      bestValue = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.vertices;
      var t2 = t1.length;
      if (0 < 0 || 0 >= t2) throw $.ioore(0);
      var bestValue = $.Vector_dot(t1[0], direction);
    case 1:
      state = 0;
      var bestIndex = 0;
      var i = 1;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = this.count;
          case 2:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.vertices;
            t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            var value = $.Vector_dot(t1[i], direction);
          case 3:
            state = 0;
            if ($.gtB(value, bestValue)) {
              bestIndex = i;
              bestValue = value;
            }
            ++i;
        }
      }
      return bestIndex;
  }
 },
 setFromShape$1: function(shape) {
  var t1 = shape.get$type();
  if (typeof t1 !== 'number') return this.setFromShape$1$bailout(1, shape, t1, 0, 0);
  if (t1 === 0) {
    t1 = this.vertices;
    var t2 = t1.length;
    if (0 >= t2) throw $.ioore(0);
    t1[0].setFrom$1(shape.get$position());
    this.count = 1;
    this.radius = shape.get$radius();
  } else {
    t1 = shape.get$type();
    if (typeof t1 !== 'number') return this.setFromShape$1$bailout(2, shape, t1, 0, 0);
    if (t1 === 1) {
      this.count = shape.get$vertexCount();
      this.radius = shape.get$radius();
      var i = 0;
      while (true) {
        t1 = this.count;
        if (typeof t1 !== 'number') return this.setFromShape$1$bailout(3, shape, i, t1, 0);
        if (!(i < t1)) break;
        t1 = this.vertices;
        t2 = t1.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        t1 = t1[i];
        var t3 = shape.get$vertices();
        if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.setFromShape$1$bailout(4, shape, i, t1, t3);
        var t4 = t3.length;
        if (i < 0 || i >= t4) throw $.ioore(i);
        t1.setFrom$1(t3[i]);
        ++i;
      }
    }
  }
 },
 setFromShape$1$bailout: function(state, env0, env1, env2, env3) {
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
      break;
    case 4:
      shape = env0;
      i = env1;
      t1 = env2;
      t3 = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = shape.get$type();
    case 1:
      state = 0;
    case 2:
    case 3:
    case 4:
      if ((state == 0 && $.eqB(t1, 0))) {
        t1 = this.vertices;
        var t2 = t1.length;
        if (0 < 0 || 0 >= t2) throw $.ioore(0);
        t1[0].setFrom$1(shape.get$position());
        this.count = 1;
        this.radius = shape.get$radius();
      } else {
        switch (state) {
          case 0:
            t1 = shape.get$type();
          case 2:
            state = 0;
          case 3:
          case 4:
            if (state == 3 || state == 4 || (state == 0 && $.eqB(t1, 1))) {
              switch (state) {
                case 0:
                  this.count = shape.get$vertexCount();
                  this.radius = shape.get$radius();
                  var i = 0;
                case 3:
                case 4:
                  L0: while (true) {
                    switch (state) {
                      case 0:
                        t1 = this.count;
                      case 3:
                        state = 0;
                        if (!$.ltB(i, t1)) break L0;
                        t1 = this.vertices;
                        t2 = t1.length;
                        if (i < 0 || i >= t2) throw $.ioore(i);
                        t1 = t1[i];
                        var t3 = shape.get$vertices();
                      case 4:
                        state = 0;
                        t1.setFrom$1($.index(t3, i));
                        ++i;
                    }
                  }
              }
            }
        }
      }
  }
 },
 DistanceProxy$0: function() {
  for (var i = 0; i < this.vertices.length; ++i) {
    var t1 = this.vertices;
    var t2 = $.Vector$(0, 0);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.Features = {"":
 ["flip=", "incidentVertex=", "incidentEdge=", "referenceEdge="],
 super: "Object",
 zero$0: function() {
  this.referenceEdge = 0;
  this.incidentEdge = 0;
  this.incidentVertex = 0;
  this.flip = 0;
 },
 toString$0: function() {
  return 'Features: (' + $.S(this.flip) + ', ' + $.S(this.incidentEdge) + ', ' + $.S(this.incidentVertex) + ' ' + $.S(this.referenceEdge) + ')';
 },
 operator$eq$1: function(other) {
  return $.eqB(this.referenceEdge, other.get$referenceEdge()) && ($.eqB(this.incidentEdge, other.get$incidentEdge()) && ($.eqB(this.incidentVertex, other.get$incidentVertex()) && $.eqB(this.flip, other.get$flip())));
 },
 setFrom$1: function(f) {
  this.referenceEdge = f.get$referenceEdge();
  this.incidentEdge = f.get$incidentEdge();
  this.incidentVertex = f.get$incidentVertex();
  this.flip = f.get$flip();
 }
};

$$.Manifold = {"":
 ["pointCount=", "type=", "localPoint?", "localNormal?", "points?"],
 super: "Object",
 setFrom$1: function(other) {
  for (var i = 0; $.ltB(i, other.get$pointCount()); ++i) {
    var t1 = this.points;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1[i].setFrom$1($.index(other.get$points(), i));
  }
  this.type = other.get$type();
  this.localNormal.setFrom$1(other.get$localNormal());
  this.localPoint.setFrom$1(other.get$localPoint());
  this.pointCount = other.get$pointCount();
 },
 Manifold$0: function() {
  for (var i = 0; i < 2; ++i) {
    var t1 = this.points;
    var t2 = $.ManifoldPoint$();
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.ManifoldPoint = {"":
 ["id?", "tangentImpulse=", "normalImpulse=", "localPoint?"],
 super: "Object",
 setFrom$1: function(other) {
  this.localPoint.setFrom$1(other.get$localPoint());
  this.normalImpulse = other.get$normalImpulse();
  this.tangentImpulse = other.get$tangentImpulse();
  this.id.setFrom$1(other.get$id());
 }
};

$$.Simplex = {"":
 ["case33", "case3", "case22", "case2", "e12", "e23", "e13", "count=", "vertices?", "v3", "v2", "v1"],
 super: "Object",
 solve3$0: function() {
  var w1 = this.v1.w;
  var w2 = this.v2.w;
  var w3 = this.v3.w;
  this.e12.setFrom$1(w2).subLocal$1(w1);
  var w1e12 = $.Vector_dot(w1, this.e12);
  if (typeof w1e12 !== 'number') return this.solve3$0$bailout(1, w1, w2, w1e12, w3, 0, 0, 0, 0, 0, 0, 0);
  var w2e12 = $.Vector_dot(w2, this.e12);
  if (typeof w2e12 !== 'number') return this.solve3$0$bailout(2, w2e12, w1, w2, w1e12, w3, 0, 0, 0, 0, 0, 0);
  var d12_2 = -w1e12;
  this.e13.setFrom$1(w3).subLocal$1(w1);
  var w1e13 = $.Vector_dot(w1, this.e13);
  if (typeof w1e13 !== 'number') return this.solve3$0$bailout(3, w2e12, d12_2, w1, w2, w3, w1e13, 0, 0, 0, 0, 0);
  var w3e13 = $.Vector_dot(w3, this.e13);
  if (typeof w3e13 !== 'number') return this.solve3$0$bailout(4, w2e12, d12_2, w1, w2, w3, w1e13, w3e13, 0, 0, 0, 0);
  var d13_2 = -w1e13;
  this.e23.setFrom$1(w3).subLocal$1(w2);
  var w2e23 = $.Vector_dot(w2, this.e23);
  if (typeof w2e23 !== 'number') return this.solve3$0$bailout(5, w2e12, d12_2, w1, w2e23, w2, w3, w3e13, d13_2, 0, 0, 0);
  var w3e23 = $.Vector_dot(w3, this.e23);
  if (typeof w3e23 !== 'number') return this.solve3$0$bailout(6, w2e12, d12_2, w1, w2e23, w2, w3e23, w3, w3e13, d13_2, 0, 0);
  var d23_2 = -w2e23;
  var n123 = $.Vector_crossVectors(this.e12, this.e13);
  if (typeof n123 !== 'number') return this.solve3$0$bailout(7, w2e12, d12_2, w1, w2, w3e23, w3, d23_2, w3e13, n123, d13_2, 0);
  var t1 = $.Vector_crossVectors(w2, w3);
  if (typeof t1 !== 'number') return this.solve3$0$bailout(8, w2e12, d12_2, w1, w2, w3e23, w3, d23_2, w3e13, n123, d13_2, t1);
  var d123_1 = n123 * t1;
  t1 = $.Vector_crossVectors(w3, w1);
  if (typeof t1 !== 'number') return this.solve3$0$bailout(9, w2e12, d123_1, d12_2, w1, w2, w3e23, t1, d23_2, w3e13, n123, d13_2);
  var d123_2 = n123 * t1;
  t1 = $.Vector_crossVectors(w1, w2);
  if (typeof t1 !== 'number') return this.solve3$0$bailout(10, w2e12, d123_1, d12_2, d123_2, w3e23, t1, d23_2, w3e13, n123, d13_2, 0);
  var d123_3 = n123 * t1;
  if (d12_2 <= 0.0 && d13_2 <= 0.0) {
    this.v1.a = 1.0;
    this.count = 1;
    return;
  }
  if (w2e12 > 0.0 && (d12_2 > 0.0 && d123_3 <= 0.0)) {
    var inv_d12 = 1.0 / (w2e12 + d12_2);
    t1 = w2e12 * inv_d12;
    this.v1.a = t1;
    t1 = d12_2 * inv_d12;
    this.v2.a = t1;
    this.count = 2;
    return;
  }
  if (w3e13 > 0.0 && (d13_2 > 0.0 && d123_2 <= 0.0)) {
    var inv_d13 = 1.0 / (w3e13 + d13_2);
    t1 = w3e13 * inv_d13;
    this.v1.a = t1;
    t1 = d13_2 * inv_d13;
    this.v3.a = t1;
    this.count = 2;
    this.v2.setFrom$1(this.v3);
    return;
  }
  if (w2e12 <= 0.0 && d23_2 <= 0.0) {
    this.v2.a = 1.0;
    this.count = 1;
    this.v1.setFrom$1(this.v2);
    return;
  }
  if (w3e13 <= 0.0 && w3e23 <= 0.0) {
    this.v3.a = 1.0;
    this.count = 1;
    this.v1.setFrom$1(this.v3);
    return;
  }
  if (w3e23 > 0.0 && (d23_2 > 0.0 && d123_1 <= 0.0)) {
    var inv_d23 = 1.0 / (w3e23 + d23_2);
    t1 = w3e23 * inv_d23;
    this.v2.a = t1;
    t1 = d23_2 * inv_d23;
    this.v3.a = t1;
    this.count = 2;
    this.v1.setFrom$1(this.v3);
    return;
  }
  var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
  t1 = d123_1 * inv_d123;
  this.v1.a = t1;
  t1 = d123_2 * inv_d123;
  this.v2.a = t1;
  t1 = d123_3 * inv_d123;
  this.v3.a = t1;
  this.count = 3;
 },
 solve3$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      w1 = env0;
      w2 = env1;
      w1e12 = env2;
      w3 = env3;
      break;
    case 2:
      w2e12 = env0;
      w1 = env1;
      w2 = env2;
      w1e12 = env3;
      w3 = env4;
      break;
    case 3:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      w2 = env3;
      w3 = env4;
      w1e13 = env5;
      break;
    case 4:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      w2 = env3;
      w3 = env4;
      w1e13 = env5;
      w3e13 = env6;
      break;
    case 5:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      w2e23 = env3;
      w2 = env4;
      w3 = env5;
      w3e13 = env6;
      d13_2 = env7;
      break;
    case 6:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      w2e23 = env3;
      w2 = env4;
      w3e23 = env5;
      w3 = env6;
      w3e13 = env7;
      d13_2 = env8;
      break;
    case 7:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      w2 = env3;
      w3e23 = env4;
      w3 = env5;
      d23_2 = env6;
      w3e13 = env7;
      n123 = env8;
      d13_2 = env9;
      break;
    case 8:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      w2 = env3;
      w3e23 = env4;
      w3 = env5;
      d23_2 = env6;
      w3e13 = env7;
      n123 = env8;
      d13_2 = env9;
      t1 = env10;
      break;
    case 9:
      w2e12 = env0;
      d123_1 = env1;
      d12_2 = env2;
      w1 = env3;
      w2 = env4;
      w3e23 = env5;
      t1 = env6;
      d23_2 = env7;
      w3e13 = env8;
      n123 = env9;
      d13_2 = env10;
      break;
    case 10:
      w2e12 = env0;
      d123_1 = env1;
      d12_2 = env2;
      d123_2 = env3;
      w3e23 = env4;
      t1 = env5;
      d23_2 = env6;
      w3e13 = env7;
      n123 = env8;
      d13_2 = env9;
      break;
  }
  switch (state) {
    case 0:
      var w1 = this.v1.get$w();
      var w2 = this.v2.get$w();
      var w3 = this.v3.get$w();
      this.e12.setFrom$1(w2).subLocal$1(w1);
      var w1e12 = $.Vector_dot(w1, this.e12);
    case 1:
      state = 0;
      var w2e12 = $.Vector_dot(w2, this.e12);
    case 2:
      state = 0;
      var d12_2 = $.neg(w1e12);
      this.e13.setFrom$1(w3).subLocal$1(w1);
      var w1e13 = $.Vector_dot(w1, this.e13);
    case 3:
      state = 0;
      var w3e13 = $.Vector_dot(w3, this.e13);
    case 4:
      state = 0;
      var d13_2 = $.neg(w1e13);
      this.e23.setFrom$1(w3).subLocal$1(w2);
      var w2e23 = $.Vector_dot(w2, this.e23);
    case 5:
      state = 0;
      var w3e23 = $.Vector_dot(w3, this.e23);
    case 6:
      state = 0;
      var d23_2 = $.neg(w2e23);
      var n123 = $.Vector_crossVectors(this.e12, this.e13);
    case 7:
      state = 0;
      var t1 = $.Vector_crossVectors(w2, w3);
    case 8:
      state = 0;
      var d123_1 = $.mul(n123, t1);
      t1 = $.Vector_crossVectors(w3, w1);
    case 9:
      state = 0;
      var d123_2 = $.mul(n123, t1);
      t1 = $.Vector_crossVectors(w1, w2);
    case 10:
      state = 0;
      var d123_3 = $.mul(n123, t1);
      if ($.leB(d12_2, 0.0) && $.leB(d13_2, 0.0)) {
        this.v1.set$a(1.0);
        this.count = 1;
        return;
      }
      if ($.gtB(w2e12, 0.0) && ($.gtB(d12_2, 0.0) && $.leB(d123_3, 0.0))) {
        t1 = $.add(w2e12, d12_2);
        if (typeof t1 !== 'number') throw $.iae(t1);
        var inv_d12 = 1.0 / t1;
        t1 = $.mul(w2e12, inv_d12);
        this.v1.set$a(t1);
        t1 = $.mul(d12_2, inv_d12);
        this.v2.set$a(t1);
        this.count = 2;
        return;
      }
      if ($.gtB(w3e13, 0.0) && ($.gtB(d13_2, 0.0) && $.leB(d123_2, 0.0))) {
        t1 = $.add(w3e13, d13_2);
        if (typeof t1 !== 'number') throw $.iae(t1);
        var inv_d13 = 1.0 / t1;
        t1 = $.mul(w3e13, inv_d13);
        this.v1.set$a(t1);
        t1 = $.mul(d13_2, inv_d13);
        this.v3.set$a(t1);
        this.count = 2;
        this.v2.setFrom$1(this.v3);
        return;
      }
      if ($.leB(w2e12, 0.0) && $.leB(d23_2, 0.0)) {
        this.v2.set$a(1.0);
        this.count = 1;
        this.v1.setFrom$1(this.v2);
        return;
      }
      if ($.leB(w3e13, 0.0) && $.leB(w3e23, 0.0)) {
        this.v3.set$a(1.0);
        this.count = 1;
        this.v1.setFrom$1(this.v3);
        return;
      }
      if ($.gtB(w3e23, 0.0) && ($.gtB(d23_2, 0.0) && $.leB(d123_1, 0.0))) {
        t1 = $.add(w3e23, d23_2);
        if (typeof t1 !== 'number') throw $.iae(t1);
        var inv_d23 = 1.0 / t1;
        t1 = $.mul(w3e23, inv_d23);
        this.v2.set$a(t1);
        t1 = $.mul(d23_2, inv_d23);
        this.v3.set$a(t1);
        this.count = 2;
        this.v1.setFrom$1(this.v3);
        return;
      }
      t1 = $.add($.add(d123_1, d123_2), d123_3);
      if (typeof t1 !== 'number') throw $.iae(t1);
      var inv_d123 = 1.0 / t1;
      t1 = $.mul(d123_1, inv_d123);
      this.v1.set$a(t1);
      t1 = $.mul(d123_2, inv_d123);
      this.v2.set$a(t1);
      t1 = $.mul(d123_3, inv_d123);
      this.v3.set$a(t1);
      this.count = 3;
  }
 },
 solve2$0: function() {
  var w1 = this.v1.w;
  var w2 = this.v2.w;
  this.e12.setFrom$1(w2).subLocal$1(w1);
  var t1 = $.Vector_dot(w1, this.e12);
  if (typeof t1 !== 'number') return this.solve2$0$bailout(1, t1, w2);
  var d12_2 = -t1;
  if (d12_2 <= 0.0) {
    this.v1.a = 1.0;
    this.count = 1;
    return;
  }
  var d12_1 = $.Vector_dot(w2, this.e12);
  if (typeof d12_1 !== 'number') return this.solve2$0$bailout(2, d12_2, d12_1);
  if (d12_1 <= 0.0) {
    this.v2.a = 1.0;
    this.count = 1;
    this.v1.setFrom$1(this.v2);
    return;
  }
  var inv_d12 = 1.0 / (d12_1 + d12_2);
  t1 = d12_1 * inv_d12;
  this.v1.a = t1;
  t1 = d12_2 * inv_d12;
  this.v2.a = t1;
  this.count = 2;
 },
 solve2$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      w2 = env1;
      break;
    case 2:
      d12_2 = env0;
      d12_1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var w1 = this.v1.get$w();
      var w2 = this.v2.get$w();
      this.e12.setFrom$1(w2).subLocal$1(w1);
      var t1 = $.Vector_dot(w1, this.e12);
    case 1:
      state = 0;
      var d12_2 = $.neg(t1);
      if ($.leB(d12_2, 0.0)) {
        this.v1.set$a(1.0);
        this.count = 1;
        return;
      }
      var d12_1 = $.Vector_dot(w2, this.e12);
    case 2:
      state = 0;
      if ($.leB(d12_1, 0.0)) {
        this.v2.set$a(1.0);
        this.count = 1;
        this.v1.setFrom$1(this.v2);
        return;
      }
      t1 = $.add(d12_1, d12_2);
      if (typeof t1 !== 'number') throw $.iae(t1);
      var inv_d12 = 1.0 / t1;
      t1 = $.mul(d12_1, inv_d12);
      this.v1.set$a(t1);
      t1 = $.mul(d12_2, inv_d12);
      this.v2.set$a(t1);
      this.count = 2;
  }
 },
 getMetric$0: function() {
  switch (this.count) {
    case 0:
      return 0.0;
    case 1:
      return 0.0;
    case 2:
      return $.MathBox_distance(this.v1.get$w(), this.v2.get$w());
    case 3:
      this.case3.setFrom$1(this.v2.get$w()).subLocal$1(this.v1.get$w());
      this.case33.setFrom$1(this.v3.get$w()).subLocal$1(this.v1.get$w());
      return $.Vector_crossVectors(this.case3, this.case33);
    default:
      return 0.0;
  }
 },
 getWitnessPoints$2: function(pA, pB) {
  switch (this.count) {
    case 0:
      break;
    case 1:
      pA.setFrom$1(this.v1.get$wA());
      pB.setFrom$1(this.v1.get$wB());
      break;
    case 2:
      this.case2.setFrom$1(this.v1.get$wA()).mulLocal$1(this.v1.get$a());
      pA.setFrom$1(this.v2.get$wA()).mulLocal$1(this.v2.get$a()).addLocal$1(this.case2);
      this.case2.setFrom$1(this.v1.get$wB()).mulLocal$1(this.v1.get$a());
      pB.setFrom$1(this.v2.get$wB()).mulLocal$1(this.v2.get$a()).addLocal$1(this.case2);
      break;
    case 3:
      pA.setFrom$1(this.v1.get$wA()).mulLocal$1(this.v1.get$a());
      this.case3.setFrom$1(this.v2.get$wA()).mulLocal$1(this.v2.get$a());
      this.case33.setFrom$1(this.v3.get$wA()).mulLocal$1(this.v3.get$a());
      pA.addLocal$1(this.case3).addLocal$1(this.case33);
      pB.setFrom$1(pA);
      break;
    default:
      break;
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
      this.case22.setFrom$1(this.v2.get$w()).mulLocal$1(this.v2.get$a());
      this.case2.setFrom$1(this.v1.get$w()).mulLocal$1(this.v1.get$a()).addLocal$1(this.case22);
      out.setFrom$1(this.case2);
      return;
    case 3:
      out.setZero$0();
      return;
    default:
      out.setZero$0();
      return;
  }
 },
 getSearchDirection$1: function(out) {
  switch (this.count) {
    case 1:
      out.setFrom$1(this.v1.get$w()).negateLocal$0();
      return;
    case 2:
      this.e12.setFrom$1(this.v2.get$w()).subLocal$1(this.v1.get$w());
      out.setFrom$1(this.v1.get$w()).negateLocal$0();
      if ($.gtB($.Vector_crossVectors(this.e12, out), 0)) {
        $.Vector_crossNumAndVectorToOut(1, this.e12, out);
        return;
      }
      $.Vector_crossVectorAndNumToOut(this.e12, 1, out);
      return;
    default:
      out.setZero$0();
      return;
  }
 },
 writeCache$1: function(cache) {
  cache.set$metric(this.getMetric$0());
  cache.set$count(this.count);
  for (var i = 0; $.ltB(i, this.count); ++i) {
    var t1 = cache.get$indexA();
    var t2 = this.vertices;
    var t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    $.indexSet(t1, i, t2[i].get$indexA());
    t1 = cache.get$indexB();
    var t4 = this.vertices;
    var t5 = t4.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    $.indexSet(t1, i, t4[i].get$indexB());
  }
 },
 readCache$5: function(cache, proxyA, transformA, proxyB, transformB) {
  this.count = cache.get$count();
  for (var i = 0; $.ltB(i, this.count); ++i) {
    var t1 = this.vertices;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    t1.set$indexA($.index(cache.get$indexA(), i));
    t1.set$indexB($.index(cache.get$indexB(), i));
    var wALocal = $.index(proxyA.get$vertices(), t1.get$indexA());
    var wBLocal = $.index(proxyB.get$vertices(), t1.get$indexB());
    $.Transform_mulToOut(transformA, wALocal, t1.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, t1.get$wB());
    t1.get$w().setFrom$1(t1.get$wB()).subLocal$1(t1.get$wA());
    t1.set$a(0.0);
  }
  if ($.gtB(this.count, 1)) {
    var metric1 = cache.get$metric();
    var metric2 = this.getMetric$0();
    if (typeof metric1 !== 'number') throw $.iae(metric1);
    if ($.ltB(metric2, 0.5 * metric1) || ($.ltB(2.0 * metric1, metric2) || $.ltB(metric2, 1.192e-7))) this.count = 0;
  }
  if ($.eqB(this.count, 0)) {
    t1 = this.vertices;
    t2 = t1.length;
    if (0 < 0 || 0 >= t2) throw $.ioore(0);
    t1 = t1[0];
    t1.set$indexA(0);
    t1.set$indexB(0);
    wALocal = $.index(proxyA.get$vertices(), 0);
    wBLocal = $.index(proxyB.get$vertices(), 0);
    $.Transform_mulToOut(transformA, wALocal, t1.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, t1.get$wB());
    t1.get$w().setFrom$1(t1.get$wB()).subLocal$1(t1.get$wA());
    this.count = 1;
  }
 },
 Simplex$0: function() {
  var t1 = this.vertices;
  var t2 = this.v1;
  var t3 = t1.length;
  if (0 < 0 || 0 >= t3) throw $.ioore(0);
  t1[0] = t2;
  t2 = this.vertices;
  t1 = this.v2;
  var t4 = t2.length;
  if (1 < 0 || 1 >= t4) throw $.ioore(1);
  t2[1] = t1;
  t1 = this.vertices;
  t2 = this.v3;
  var t5 = t1.length;
  if (2 < 0 || 2 >= t5) throw $.ioore(2);
  t1[2] = t2;
 }
};

$$.SimplexCache = {"":
 ["indexB?", "indexA?", "count=", "metric="],
 super: "Object",
 setFrom$1: function(sc) {
  $.setRange$3(this.indexA, 0, $.get$length(this.indexA), sc.get$indexA());
  $.setRange$3(this.indexB, 0, $.get$length(this.indexB), sc.get$indexB());
  this.metric = sc.get$metric();
  this.count = sc.get$count();
 },
 SimplexCache$0: function() {
  for (var i = 0; i < 3; ++i) {
    $.indexSet(this.indexA, i, 2147483647);
    $.indexSet(this.indexB, i, 2147483647);
  }
 }
};

$$.SimplexVertex = {"":
 ["indexB=", "indexA=", "a=", "w?", "wB?", "wA?"],
 super: "Object",
 toString$0: function() {
  return 'wA: ' + $.S(this.wA) + ', wB: ' + $.S(this.wB) + ', w: ' + $.S(this.w);
 },
 setFrom$1: function(sv) {
  this.wA.setFrom$1(sv.get$wA());
  this.wB.setFrom$1(sv.get$wB());
  this.w.setFrom$1(sv.get$w());
  this.a = sv.get$a();
  this.indexA = sv.get$indexA();
  this.indexB = sv.get$indexB();
 }
};

$$.TimeOfImpact = {"":
 ["pool", "sweepB?", "sweepA?", "indexes", "fcn", "distanceOutput", "xfB", "xfA", "distanceInput", "cache"],
 super: "Object",
 timeOfImpact$2: function(output, input) {
  var t1 = $.TimeOfImpact_toiCalls;
  if (typeof t1 !== 'number') return this.timeOfImpact$2$bailout(1, output, input, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.TimeOfImpact_toiCalls = t1 + 1;
  output.set$state(0);
  output.set$t(input.get$tMax());
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  this.sweepA.setFrom$1(input.get$sweepA());
  this.sweepB.setFrom$1(input.get$sweepB());
  this.sweepA.normalize$0();
  this.sweepB.normalize$0();
  var tMax = input.get$tMax();
  if (tMax !== (tMax | 0)) return this.timeOfImpact$2$bailout(2, output, input, tMax, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t2 = proxyA.get$radius();
  if (typeof t2 !== 'number') return this.timeOfImpact$2$bailout(3, output, input, tMax, t2, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t3 = proxyB.get$radius();
  if (typeof t3 !== 'number') return this.timeOfImpact$2$bailout(4, output, input, tMax, t2, t3, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var target = $.Math_max(0.005, t2 + t3 - 0.015);
  if (typeof target !== 'number') return this.timeOfImpact$2$bailout(5, output, input, target, tMax, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.cache.count = 0;
  var t4 = input.get$proxyA();
  this.distanceInput.proxyA = t4;
  t4 = input.get$proxyB();
  this.distanceInput.proxyB = t4;
  this.distanceInput.useRadii = false;
  for (t1 = target + 0.00125, t2 = target - 0.00125, iter = 0, t10 = 0; true; ) {
    this.sweepA.getTransform$2(this.xfA, t10);
    this.sweepB.getTransform$2(this.xfB, t10);
    t3 = this.xfA;
    this.distanceInput.transformA = t3;
    t3 = this.xfB;
    this.distanceInput.transformB = t3;
    this.pool.get$distance().distance$3(this.distanceOutput, this.cache, this.distanceInput);
    t3 = this.distanceOutput.distance;
    if (typeof t3 !== 'number') return this.timeOfImpact$2$bailout(6, output, target, iter, tMax, t3, t10, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t3 <= 0) {
      output.set$state(2);
      output.set$t(0);
      break;
    }
    t3 = this.distanceOutput.distance;
    if (typeof t3 !== 'number') return this.timeOfImpact$2$bailout(7, output, target, t3, iter, tMax, t10, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t3 < t1) {
      output.set$state(3);
      output.set$t(t10);
      break;
    }
    this.fcn.initialize$6(this.cache, proxyA, this.sweepA, proxyB, this.sweepB, t10);
    for (var t20 = tMax, pushBackIter = 0; done = false, true; ) {
      var s2 = this.fcn.findMinSeparation$2(this.indexes, t20);
      if (typeof s2 !== 'number') return this.timeOfImpact$2$bailout(8, output, proxyB, pushBackIter, target, iter, tMax, t10, proxyA, s2, t20, 0, 0, 0, 0, 0, 0, 0);
      if (s2 > t1) {
        output.set$state(4);
        output.set$t(tMax);
        done = true;
        break;
      }
      if (s2 > t2) {
        t10 = t20;
        done = false;
        break;
      }
      t3 = this.fcn;
      t4 = this.indexes;
      var t5 = t4.length;
      if (0 >= t5) throw $.ioore(0);
      t4 = t4[0];
      var t6 = this.indexes;
      var t7 = t6.length;
      if (1 >= t7) throw $.ioore(1);
      var s1 = t3.evaluate$3(t4, t6[1], t10);
      if (typeof s1 !== 'number') return this.timeOfImpact$2$bailout(9, output, proxyB, pushBackIter, target, iter, tMax, s1, t10, proxyA, s2, t20, 0, 0, 0, 0, 0, 0);
      if (s1 < t2) {
        output.set$state(1);
        output.set$t(t10);
        done = true;
        break;
      }
      if (s1 <= t1) {
        output.set$state(3);
        output.set$t(t10);
        done = true;
        break;
      }
      for (var a1 = t10, a2 = t20, rootIterCount = 0; true; ) {
        var t = (rootIterCount & 1) === 1 ? a1 + (target - s1) * (a2 - a1) / (s2 - s1) : 0.5 * (a1 + a2);
        t3 = this.fcn;
        t4 = this.indexes;
        t5 = t4.length;
        if (0 >= t5) throw $.ioore(0);
        t4 = t4[0];
        t6 = this.indexes;
        t7 = t6.length;
        if (1 >= t7) throw $.ioore(1);
        var s = t3.evaluate$3(t4, t6[1], t);
        if (typeof s !== 'number') return this.timeOfImpact$2$bailout(10, output, pushBackIter, target, rootIterCount, s2, a2, proxyA, a1, proxyB, s1, t, iter, tMax, t10, s, t20, 0);
        t3 = $.abs(s - target);
        if (typeof t3 !== 'number') return this.timeOfImpact$2$bailout(11, output, t3, pushBackIter, target, rootIterCount, s2, a2, proxyA, a1, proxyB, s1, t, iter, tMax, t10, s, t20);
        if (t3 < 0.00125) {
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
        if (a1 !== (a1 | 0)) return this.timeOfImpact$2$bailout(12, output, pushBackIter, target, rootIterCount, proxyA, proxyB, s2, a2, a1, s1, iter, tMax, t10, t20, 0, 0, 0);
        ++rootIterCount;
        t3 = $.TimeOfImpact_toiRootIters;
        if (typeof t3 !== 'number') return this.timeOfImpact$2$bailout(13, output, pushBackIter, target, proxyA, proxyB, s2, a2, a1, s1, rootIterCount, t3, iter, tMax, t10, t20, 0, 0);
        $.TimeOfImpact_toiRootIters = t3 + 1;
        if (rootIterCount === 50) break;
      }
      if (t20 !== (t20 | 0)) return this.timeOfImpact$2$bailout(14, output, t20, pushBackIter, target, iter, tMax, t10, proxyA, proxyB, rootIterCount, 0, 0, 0, 0, 0, 0, 0);
      $.TimeOfImpact_toiMaxRootIters = $.Math_max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
      ++pushBackIter;
      if (pushBackIter === 8) {
        done = false;
        break;
      }
    }
    ++iter;
    t3 = $.TimeOfImpact_toiIters;
    if (typeof t3 !== 'number') return this.timeOfImpact$2$bailout(15, output, t10, target, tMax, iter, t3, done, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0);
    $.TimeOfImpact_toiIters = t3 + 1;
    if (done) break;
    if (iter === 1000) {
      output.set$state(1);
      output.set$t(t10);
      break;
    }
  }
  $.TimeOfImpact_toiMaxIters = $.Math_max($.TimeOfImpact_toiMaxIters, iter);
  var iter, done, t10;
 },
 timeOfImpact$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16) {
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
      proxyA = env3;
      proxyB = env4;
      break;
    case 3:
      output = env0;
      input = env1;
      tMax = env2;
      t2 = env3;
      proxyA = env4;
      proxyB = env5;
      break;
    case 4:
      output = env0;
      input = env1;
      tMax = env2;
      t2 = env3;
      t3 = env4;
      proxyA = env5;
      proxyB = env6;
      break;
    case 5:
      output = env0;
      input = env1;
      target = env2;
      tMax = env3;
      proxyA = env4;
      proxyB = env5;
      break;
    case 6:
      output = env0;
      target = env1;
      iter = env2;
      tMax = env3;
      t2 = env4;
      t1 = env5;
      proxyA = env6;
      proxyB = env7;
      break;
    case 7:
      output = env0;
      target = env1;
      t2 = env2;
      iter = env3;
      tMax = env4;
      t1 = env5;
      proxyA = env6;
      proxyB = env7;
      break;
    case 8:
      output = env0;
      proxyB = env1;
      pushBackIter = env2;
      target = env3;
      iter = env4;
      tMax = env5;
      t1 = env6;
      proxyA = env7;
      s2 = env8;
      t2 = env9;
      break;
    case 9:
      output = env0;
      proxyB = env1;
      pushBackIter = env2;
      target = env3;
      iter = env4;
      tMax = env5;
      s1 = env6;
      t1 = env7;
      proxyA = env8;
      s2 = env9;
      t2 = env10;
      break;
    case 10:
      output = env0;
      pushBackIter = env1;
      target = env2;
      rootIterCount = env3;
      s2 = env4;
      a2 = env5;
      proxyA = env6;
      a1 = env7;
      proxyB = env8;
      s1 = env9;
      t = env10;
      iter = env11;
      tMax = env12;
      t1 = env13;
      s = env14;
      t2 = env15;
      break;
    case 11:
      output = env0;
      t3 = env1;
      pushBackIter = env2;
      target = env3;
      rootIterCount = env4;
      s2 = env5;
      a2 = env6;
      proxyA = env7;
      a1 = env8;
      proxyB = env9;
      s1 = env10;
      t = env11;
      iter = env12;
      tMax = env13;
      t1 = env14;
      s = env15;
      t2 = env16;
      break;
    case 12:
      output = env0;
      pushBackIter = env1;
      target = env2;
      rootIterCount = env3;
      proxyA = env4;
      proxyB = env5;
      s2 = env6;
      a2 = env7;
      a1 = env8;
      s1 = env9;
      iter = env10;
      tMax = env11;
      t1 = env12;
      t2 = env13;
      break;
    case 13:
      output = env0;
      pushBackIter = env1;
      target = env2;
      proxyA = env3;
      proxyB = env4;
      s2 = env5;
      a2 = env6;
      a1 = env7;
      s1 = env8;
      rootIterCount = env9;
      t3 = env10;
      iter = env11;
      tMax = env12;
      t1 = env13;
      t2 = env14;
      break;
    case 14:
      output = env0;
      t2 = env1;
      pushBackIter = env2;
      target = env3;
      iter = env4;
      tMax = env5;
      t1 = env6;
      proxyA = env7;
      proxyB = env8;
      rootIterCount = env9;
      break;
    case 15:
      output = env0;
      t1 = env1;
      target = env2;
      tMax = env3;
      iter = env4;
      t2 = env5;
      done = env6;
      proxyA = env7;
      proxyB = env8;
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
      this.sweepA.setFrom$1(input.get$sweepA());
      this.sweepB.setFrom$1(input.get$sweepB());
      this.sweepA.normalize$0();
      this.sweepB.normalize$0();
      var tMax = input.get$tMax();
    case 2:
      state = 0;
      var t2 = proxyA.get$radius();
    case 3:
      state = 0;
      var t3 = proxyB.get$radius();
    case 4:
      state = 0;
      var target = $.Math_max(0.005, $.sub($.add(t2, t3), 0.015));
    case 5:
      state = 0;
      this.cache.set$count(0);
      var t4 = input.get$proxyA();
      this.distanceInput.set$proxyA(t4);
      t4 = input.get$proxyB();
      this.distanceInput.set$proxyB(t4);
      this.distanceInput.set$useRadii(false);
      var iter = 0;
      t1 = 0;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            this.sweepA.getTransform$2(this.xfA, t1);
            this.sweepB.getTransform$2(this.xfB, t1);
            t2 = this.xfA;
            this.distanceInput.set$transformA(t2);
            t2 = this.xfB;
            this.distanceInput.set$transformB(t2);
            this.pool.get$distance().distance$3(this.distanceOutput, this.cache, this.distanceInput);
            t2 = this.distanceOutput.get$distance();
          case 6:
            state = 0;
            if ($.leB(t2, 0)) {
              output.set$state(2);
              output.set$t(0);
              break L0;
            }
            t2 = this.distanceOutput.get$distance();
          case 7:
            state = 0;
            if ($.ltB(t2, $.add(target, 0.00125))) {
              output.set$state(3);
              output.set$t(t1);
              break L0;
            }
            this.fcn.initialize$6(this.cache, proxyA, this.sweepA, proxyB, this.sweepB, t1);
            t2 = tMax;
            var pushBackIter = 0;
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            L1: while (true) {
              switch (state) {
                case 0:
                  var done = false;
                  if (!true) break L1;
                  var s2 = this.fcn.findMinSeparation$2(this.indexes, t2);
                case 8:
                  state = 0;
                  if ($.gtB(s2, $.add(target, 0.00125))) {
                    output.set$state(4);
                    output.set$t(tMax);
                    done = true;
                    break L1;
                  }
                  if ($.gtB(s2, $.sub(target, 0.00125))) {
                    t1 = t2;
                    done = false;
                    break L1;
                  }
                  t3 = this.fcn;
                  t4 = this.indexes;
                  var t5 = t4.length;
                  if (0 < 0 || 0 >= t5) throw $.ioore(0);
                  t4 = t4[0];
                  var t6 = this.indexes;
                  var t7 = t6.length;
                  if (1 < 0 || 1 >= t7) throw $.ioore(1);
                  var s1 = t3.evaluate$3(t4, t6[1], t1);
                case 9:
                  state = 0;
                  if ($.ltB(s1, $.sub(target, 0.00125))) {
                    output.set$state(1);
                    output.set$t(t1);
                    done = true;
                    break L1;
                  }
                  if ($.leB(s1, $.add(target, 0.00125))) {
                    output.set$state(3);
                    output.set$t(t1);
                    done = true;
                    break L1;
                  }
                  var a1 = t1;
                  var a2 = t2;
                  var rootIterCount = 0;
                case 10:
                case 11:
                case 12:
                case 13:
                  L2: while (true) {
                    switch (state) {
                      case 0:
                        if (!true) break L2;
                        if ((rootIterCount & 1) === 1) var t = $.add(a1, $.div($.mul($.sub(target, s1), $.sub(a2, a1)), $.sub(s2, s1)));
                        else {
                          t3 = $.add(a1, a2);
                          if (typeof t3 !== 'number') throw $.iae(t3);
                          t = 0.5 * t3;
                        }
                        t3 = this.fcn;
                        t4 = this.indexes;
                        t5 = t4.length;
                        if (0 < 0 || 0 >= t5) throw $.ioore(0);
                        t4 = t4[0];
                        t6 = this.indexes;
                        t7 = t6.length;
                        if (1 < 0 || 1 >= t7) throw $.ioore(1);
                        var s = t3.evaluate$3(t4, t6[1], t);
                      case 10:
                        state = 0;
                        t3 = $.abs($.sub(s, target));
                      case 11:
                        state = 0;
                        if ($.ltB(t3, 0.00125)) {
                          t2 = t;
                          break L2;
                        }
                        if ($.gtB(s, target)) {
                          s1 = s;
                          a1 = t;
                        } else {
                          a2 = t;
                          s2 = s;
                        }
                      case 12:
                        state = 0;
                        ++rootIterCount;
                        t3 = $.TimeOfImpact_toiRootIters;
                      case 13:
                        state = 0;
                        $.TimeOfImpact_toiRootIters = $.add(t3, 1);
                        if (rootIterCount === 50) break L2;
                    }
                  }
                case 14:
                  state = 0;
                  $.TimeOfImpact_toiMaxRootIters = $.Math_max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
                  ++pushBackIter;
                  if (pushBackIter === 8) {
                    done = false;
                    break L1;
                  }
              }
            }
            ++iter;
            t2 = $.TimeOfImpact_toiIters;
          case 15:
            state = 0;
            $.TimeOfImpact_toiIters = $.add(t2, 1);
            if (done) break L0;
            if (iter === 1000) {
              output.set$state(1);
              output.set$t(t1);
              break L0;
            }
        }
      }
      $.TimeOfImpact_toiMaxIters = $.Math_max($.TimeOfImpact_toiMaxIters, iter);
  }
 },
 get$timeOfImpact: function() { return new $.BoundClosure2(this, 'timeOfImpact$2'); },
 TimeOfImpact$_construct$1: function(argPool) {
  var t1 = this.indexes;
  var t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  t1[0] = 0;
  t1 = this.indexes;
  var t3 = t1.length;
  if (1 < 0 || 1 >= t3) throw $.ioore(1);
  t1[1] = 0;
  $.TimeOfImpact_toiCalls = 0;
  $.TimeOfImpact_toiIters = 0;
  $.TimeOfImpact_toiMaxIters = 0;
  $.TimeOfImpact_toiRootIters = 0;
  $.TimeOfImpact_toiMaxRootIters = 0;
 }
};

$$.SeparationFunction = {"":
 ["xfb", "xfa", "temp", "axisB", "axisA", "localPointB2", "localPointB1", "normal?", "localPointA2", "localPointA1", "pointB?", "pointA?", "localPointB", "localPointA", "sweepB?", "sweepA?", "axis", "localPoint?", "type=", "proxyB=", "proxyA="],
 super: "Object",
 evaluate$3: function(indexA, indexB, t) {
  this.sweepA.getTransform$2(this.xfa, t);
  this.sweepB.getTransform$2(this.xfb, t);
  switch (this.type) {
    case 0:
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.axisA);
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis.negateLocal$0(), this.axisB);
      this.axis.negateLocal$0();
      this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
      this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
      $.Transform_mulToOut(this.xfa, this.localPointA, this.pointA);
      $.Transform_mulToOut(this.xfb, this.localPointB, this.pointB);
      return $.Vector_dot(this.pointB.subLocal$1(this.pointA), this.axis);
    case 1:
      $.Matrix22_mulMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.normal);
      $.Transform_mulToOut(this.xfa, this.localPoint, this.pointA);
      this.normal.negateLocal$0();
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.normal, this.axisB);
      this.normal.negateLocal$0();
      this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
      $.Transform_mulToOut(this.xfb, this.localPointB, this.pointB);
      return $.Vector_dot(this.pointB.subLocal$1(this.pointA), this.normal);
    case 2:
      $.Matrix22_mulMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis, this.normal);
      $.Transform_mulToOut(this.xfb, this.localPoint, this.pointB);
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.normal.negateLocal$0(), this.axisA);
      this.normal.negateLocal$0();
      this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
      $.Transform_mulToOut(this.xfa, this.localPointA, this.pointA);
      return $.Vector_dot(this.pointA.subLocal$1(this.pointB), this.normal);
    default:
      return 0;
  }
 },
 findMinSeparation$2: function(indexes, t) {
  this.sweepA.getTransform$2(this.xfa, t);
  this.sweepB.getTransform$2(this.xfb, t);
  switch (this.type) {
    case 0:
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.axisA);
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis.negateLocal$0(), this.axisB);
      this.axis.negateLocal$0();
      $.indexSet(indexes, 0, this.proxyA.getSupport$1(this.axisA));
      $.indexSet(indexes, 1, this.proxyB.getSupport$1(this.axisB));
      this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
      this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
      $.Transform_mulToOut(this.xfa, this.localPointA, this.pointA);
      $.Transform_mulToOut(this.xfb, this.localPointB, this.pointB);
      return $.Vector_dot(this.pointB.subLocal$1(this.pointA), this.axis);
    case 1:
      $.Matrix22_mulMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.normal);
      $.Transform_mulToOut(this.xfa, this.localPoint, this.pointA);
      this.normal.negateLocal$0();
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.normal, this.axisB);
      this.normal.negateLocal$0();
      $.indexSet(indexes, 0, -1);
      $.indexSet(indexes, 1, this.proxyB.getSupport$1(this.axisB));
      this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
      $.Transform_mulToOut(this.xfb, this.localPointB, this.pointB);
      return $.Vector_dot(this.pointB.subLocal$1(this.pointA), this.normal);
    case 2:
      $.Matrix22_mulMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis, this.normal);
      $.Transform_mulToOut(this.xfb, this.localPoint, this.pointB);
      $.Matrix22_mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.normal.negateLocal$0(), this.axisA);
      this.normal.negateLocal$0();
      $.indexSet(indexes, 1, -1);
      $.indexSet(indexes, 0, this.proxyA.getSupport$1(this.axisA));
      this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
      $.Transform_mulToOut(this.xfa, this.localPointA, this.pointA);
      return $.Vector_dot(this.pointA.subLocal$1(this.pointB), this.normal);
    default:
      $.indexSet(indexes, 0, -1);
      $.indexSet(indexes, 1, -1);
      return 0;
  }
 },
 initialize$6: function(cache, argProxyA, argSweepA, argProxyB, argSweepB, t1) {
  this.proxyA = argProxyA;
  this.proxyB = argProxyB;
  var count = cache.get$count();
  this.sweepA = argSweepA;
  this.sweepB = argSweepB;
  this.sweepA.getTransform$2(this.xfa, t1);
  this.sweepB.getTransform$2(this.xfb, t1);
  if ($.eqB(count, 1)) {
    this.type = 0;
    this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
    this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
    $.Transform_mulToOut(this.xfa, this.localPointA, this.pointA);
    $.Transform_mulToOut(this.xfb, this.localPointB, this.pointB);
    this.axis.setFrom$1(this.pointB).subLocal$1(this.pointA);
    return this.axis.normalize$0();
  }
  if ($.eqB($.index(cache.get$indexA(), 0), $.index(cache.get$indexA(), 1))) {
    this.type = 2;
    this.localPointB1.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
    this.localPointB2.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 1)));
    this.temp.setFrom$1(this.localPointB2).subLocal$1(this.localPointB1);
    $.Vector_crossVectorAndNumToOut(this.temp, 1, this.axis);
    this.axis.normalize$0();
    $.Matrix22_mulMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis, this.normal);
    this.localPoint.setFrom$1(this.localPointB1);
    this.localPoint.addLocal$1(this.localPointB2);
    this.localPoint.mulLocal$1(0.5);
    $.Transform_mulToOut(this.xfb, this.localPoint, this.pointB);
    this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
    $.Transform_mulToOut(this.xfa, this.localPointA, this.pointA);
    this.temp.setFrom$1(this.pointA);
    this.temp.subLocal$1(this.pointB);
    var s = $.Vector_dot(this.temp, this.normal);
    if ($.ltB(s, 0.0)) {
      this.axis.negateLocal$0();
      s = $.neg(s);
    }
    return s;
  }
  this.type = 1;
  this.localPointA1.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
  this.localPointA2.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 1)));
  this.temp.setFrom$1(this.localPointA2);
  this.temp.subLocal$1(this.localPointA1);
  $.Vector_crossVectorAndNumToOut(this.temp, 1.0, this.axis);
  this.axis.normalize$0();
  $.Matrix22_mulMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.normal);
  this.localPoint.setFrom$1(this.localPointA1);
  this.localPoint.addLocal$1(this.localPointA2);
  this.localPoint.mulLocal$1(0.5);
  $.Transform_mulToOut(this.xfa, this.localPoint, this.pointA);
  this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
  $.Transform_mulToOut(this.xfb, this.localPointB, this.pointB);
  this.temp.setFrom$1(this.pointB);
  this.temp.subLocal$1(this.pointA);
  s = $.Vector_dot(this.temp, this.normal);
  if ($.ltB(s, 0.0)) {
    this.axis.negateLocal$0();
    s = $.neg(s);
  }
  return s;
 }
};

$$.TimeOfImpactInput = {"":
 ["tMax=", "sweepB?", "sweepA?", "proxyB?", "proxyA?"],
 super: "Object"
};

$$.TimeOfImpactOutput = {"":
 ["t=", "state="],
 super: "Object"
};

$$.WorldManifold = {"":
 ["pool4", "pool3", "points?", "normal?"],
 super: "Object",
 initialize$5: function(manifold, xfA, radiusA, xfB, radiusB) {
  switch (manifold.get$type()) {
    case 0:
      var pointA = this.pool3;
      var pointB = this.pool4;
      this.normal.set$x(1);
      this.normal.set$y(0);
      pointA.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      pointA.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      pointB.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      pointB.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      if ($.gtB($.MathBox_distanceSquared(pointA, pointB), 1.4208639999999999e-14)) {
        var t1 = $.sub(pointB.get$x(), pointA.get$x());
        this.normal.set$x(t1);
        t1 = $.sub(pointB.get$y(), pointA.get$y());
        this.normal.set$y(t1);
        this.normal.normalize$0();
      }
      var cAx = $.add($.mul(this.normal.get$x(), radiusA), pointA.get$x());
      var cAy = $.add($.mul(this.normal.get$y(), radiusA), pointA.get$y());
      var cBx = $.add($.mul($.neg(this.normal.get$x()), radiusB), pointB.get$x());
      var cBy = $.add($.mul($.neg(this.normal.get$y()), radiusB), pointB.get$y());
      t1 = $.mul($.add(cAx, cBx), 0.5);
      $.index(this.points, 0).set$x(t1);
      t1 = $.mul($.add(cAy, cBy), 0.5);
      $.index(this.points, 0).set$y(t1);
      return;
    case 1:
      var planePoint = this.pool3;
      t1 = $.add($.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localNormal().get$y()));
      this.normal.set$x(t1);
      t1 = $.add($.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localNormal().get$y()));
      this.normal.set$y(t1);
      planePoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      planePoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      var clipPoint = this.pool4;
      for (var i = 0; $.ltB(i, manifold.get$pointCount()); ++i) {
        clipPoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        var scalar = $.sub(radiusA, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), this.normal.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), this.normal.get$y())));
        cAx = $.add($.mul(this.normal.get$x(), scalar), clipPoint.get$x());
        cAy = $.add($.mul(this.normal.get$y(), scalar), clipPoint.get$y());
        cBx = $.add($.mul($.neg(this.normal.get$x()), radiusB), clipPoint.get$x());
        cBy = $.add($.mul($.neg(this.normal.get$y()), radiusB), clipPoint.get$y());
        t1 = $.mul($.add(cAx, cBx), 0.5);
        $.index(this.points, i).set$x(t1);
        t1 = $.mul($.add(cAy, cBy), 0.5);
        $.index(this.points, i).set$y(t1);
      }
      return;
    case 2:
      planePoint = this.pool3;
      var R = xfB.get$rotation();
      t1 = $.add($.mul(R.get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$x(), manifold.get$localNormal().get$y()));
      this.normal.set$x(t1);
      t1 = $.add($.mul(R.get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$y(), manifold.get$localNormal().get$y()));
      this.normal.set$y(t1);
      var v = manifold.get$localPoint();
      planePoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())));
      planePoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
      clipPoint = this.pool4;
      for (i = 0; $.ltB(i, manifold.get$pointCount()); ++i) {
        clipPoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        scalar = $.sub(radiusB, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), this.normal.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), this.normal.get$y())));
        cBx = $.add($.mul(this.normal.get$x(), scalar), clipPoint.get$x());
        cBy = $.add($.mul(this.normal.get$y(), scalar), clipPoint.get$y());
        cAx = $.add($.mul($.neg(this.normal.get$x()), radiusA), clipPoint.get$x());
        cAy = $.add($.mul($.neg(this.normal.get$y()), radiusA), clipPoint.get$y());
        t1 = $.mul($.add(cAx, cBx), 0.5);
        $.index(this.points, i).set$x(t1);
        t1 = $.mul($.add(cAy, cBy), 0.5);
        $.index(this.points, i).set$y(t1);
      }
      t1 = $.neg(this.normal.get$x());
      this.normal.set$x(t1);
      t1 = $.neg(this.normal.get$y());
      this.normal.set$y(t1);
      break;
  }
 },
 WorldManifold$0: function() {
  for (var i = 0; i < 2; ++i) {
    var t1 = this.points;
    var t2 = $.Vector$(0, 0);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.BroadPhase = {"":
 ["queryProxy", "_pairCount", "_pairCapacity", "_pairBuffer", "moveBuffer", "proxyCount", "_tree"],
 super: "Object",
 _bufferMove$1: function(node) {
  this.moveBuffer.push(node);
 },
 query$2: function(callback, box) {
  this._tree.query$2(callback, box);
 },
 treeCallback$1: function(proxy) {
  if ($.eqB(proxy, this.queryProxy)) return true;
  if (this._pairCount === this._pairCapacity) {
    var oldBuffer = this._pairBuffer;
    this._pairCapacity = this._pairCapacity * 2;
    var t1 = $.ListFactory_List(this._pairCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Pair'}));
    this._pairBuffer = t1;
    for (var i = 0; i < oldBuffer.length; ++i) {
      t1 = this._pairBuffer;
      var t2 = oldBuffer.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      var t3 = oldBuffer[i];
      var t4 = t1.length;
      if (i < 0 || i >= t4) throw $.ioore(i);
      t1[i] = t3;
    }
    for (i = oldBuffer.length; i < this._pairCapacity; ++i) {
      t1 = this._pairBuffer;
      t2 = $.Pair$();
      t3 = t1.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      t1[i] = t2;
    }
  }
  if ($.ltB(proxy.get$key(), this.queryProxy.get$key())) {
    t1 = this._pairBuffer;
    t2 = this._pairCount;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    t1[t2].set$proxyA(proxy);
    t4 = this.queryProxy;
    var t5 = this._pairBuffer;
    var t6 = this._pairCount;
    if (t6 !== (t6 | 0)) throw $.iae(t6);
    var t7 = t5.length;
    if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
    t5[t6].set$proxyB(t4);
  } else {
    t1 = this.queryProxy;
    t2 = this._pairBuffer;
    t3 = this._pairCount;
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    t4 = t2.length;
    if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
    t2[t3].set$proxyA(t1);
    t1 = this._pairBuffer;
    t5 = this._pairCount;
    if (t5 !== (t5 | 0)) throw $.iae(t5);
    t6 = t1.length;
    if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
    t1[t5].set$proxyB(proxy);
  }
  this._pairCount = this._pairCount + 1;
  return true;
 },
 updatePairs$1: function(callback) {
  this._pairCount = 0;
  for (var i = 0; i < this.moveBuffer.length; ++i) {
    var t1 = this.moveBuffer;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    this.queryProxy = t1[i];
    if (this.queryProxy == null) continue;
    this._tree.query$2(this, this.queryProxy.get$box());
  }
  t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'DynamicTreeNode'}));
  this.moveBuffer = t1;
  var pairBuffer = $.ListFactory_List$from($.getRange(this._pairBuffer, 0, this._pairCount));
  $.sort(pairBuffer, new $.BroadPhase_updatePairs_anon());
  $.setRange$3(this._pairBuffer, 0, this._pairCount, pairBuffer);
  for (i = 0; i < this._pairCount; ) {
    t1 = this._pairBuffer;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    callback.addPair$2(t1.get$proxyA().get$userData(), t1.get$proxyB().get$userData());
    ++i;
    for (; i < this._pairCount; ) {
      t2 = this._pairBuffer;
      var t3 = t2.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      t2 = t2[i];
      t3 = t2.get$proxyA();
      var t4 = t1.get$proxyA();
      if (t3 == null ? t4 == null : t3 === t4) {
        t2 = t2.get$proxyB();
        t3 = t1.get$proxyB();
        t4 = !(t2 == null ? t3 == null : t2 === t3);
        t2 = t4;
      } else t2 = true;
      if (t2) break;
      ++i;
    }
  }
  this._tree.rebalance$1(4);
 },
 testOverlap$2: function(proxyA, proxyB) {
  return $.AxisAlignedBox_testOverlap(proxyA.get$box(), proxyB.get$box());
 },
 moveProxy$3: function(proxy, box, displacement) {
  this._tree.moveProxy$3(proxy, box, displacement) === true && this._bufferMove$1(proxy);
 },
 createProxy$2: function(box, userData) {
  var node = this._tree.createProxy$2(box, userData);
  this.proxyCount = this.proxyCount + 1;
  this._bufferMove$1(node);
  return node;
 },
 BroadPhase$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'DynamicTreeNode'}));
  this.moveBuffer = t1;
  t1 = $.ListFactory_List(this._pairCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'Pair'}));
  this._pairBuffer = t1;
  for (var i = 0; i < this._pairCapacity; ++i) {
    t1 = this._pairBuffer;
    var t2 = $.Pair$();
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.DynamicTree = {"":
 ["deltaTwo", "deltaOne", "center?", "_tempBox", "_tempVector", "_nodeCounter", "_drawVectors", "_nodeStack", "_path", "_insertionCount", "_lastLeaf", "_nodeCount", "_root"],
 super: "Object",
 _freeNode$1: function(node) {
  this._nodeStack.addFirst$1(node);
  this._nodeCount = this._nodeCount - 1;
 },
 rebalance$1: function(iterations) {
  if (typeof iterations !== 'number') return this.rebalance$1$bailout(1, iterations, 0, 0, 0, 0);
  if (this._root == null) return;
  for (var current = null, i = 0; i < iterations; ++i) {
    current = this._root;
    for (var bit = 0; current.get$isLeaf() !== true; ) {
      var t1 = this._path;
      if (t1 !== (t1 | 0)) return this.rebalance$1$bailout(2, iterations, i, t1, current, bit);
      current = ($.shr(t1, bit) & 1) === 0 ? current.get$childOne() : current.get$childTwo();
      var bit0 = bit + 1 & 31;
      bit = bit0;
    }
    t1 = this._path;
    if (typeof t1 !== 'number') return this.rebalance$1$bailout(3, iterations, i, t1, current, 0);
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
      if (this._root == null) return;
      var current = null;
      var i = 0;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, iterations)) break L0;
            current = this._root;
            var bit = 0;
          case 2:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!(current.get$isLeaf() !== true)) break L1;
                  var t1 = this._path;
                case 2:
                  state = 0;
                  current = $.eqB($.and($.shr(t1, bit), 1), 0) ? current.get$childOne() : current.get$childTwo();
                  var bit0 = bit + 1 & 31;
                  bit = bit0;
              }
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
  }
 },
 _computeHeight$1: function(node) {
  if (node == null) return 0;
  var t1 = $.Math_max(this._computeHeight$1(node.get$childOne()), this._computeHeight$1(node.get$childTwo()));
  if (typeof t1 !== 'number') throw $.iae(t1);
  return 1 + t1;
 },
 computeHeightFromRoot$0: function() {
  return this._computeHeight$1(this._root);
 },
 _removeLeaf$1: function(argNode) {
  var t1 = this._root;
  if (argNode == null ? t1 == null : argNode === t1) {
    this._root = null;
    t1 = this._lastLeaf;
    if (t1 == null ? argNode == null : t1 === argNode) this._lastLeaf = null;
    return;
  }
  var node2 = argNode.get$parent();
  var node1 = node2.get$parent();
  t1 = node2.get$childOne();
  var sibling = (t1 == null ? argNode == null : t1 === argNode) ? node2.get$childTwo() : node2.get$childOne();
  if (!(node1 == null)) {
    t1 = node1.get$childOne();
    if (t1 == null ? node2 == null : t1 === node2) node1.set$childOne(sibling);
    else node1.set$childTwo(sibling);
    sibling.set$parent(node1);
    this._freeNode$1(node2);
    for (; !(node1 == null); ) {
      this._tempBox.setFrom$1(node1.get$box());
      node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
      if ($.contains$1(this._tempBox, node1.get$box()) === true) break;
      node1 = node1.get$parent();
    }
  } else {
    this._root = sibling;
    sibling.set$parent(null);
    this._freeNode$1(node2);
  }
  t1 = this._lastLeaf;
  if (t1 == null ? argNode == null : t1 === argNode) this._lastLeaf = this._root;
 },
 _insertLeaf$1: function(node) {
  var t1 = this._insertionCount;
  if (typeof t1 !== 'number') return this._insertLeaf$1$bailout(1, node, t1, 0, 0, 0, 0);
  this._insertionCount = t1 + 1;
  if (this._root == null) {
    this._root = node;
    node.set$parent(null);
    return;
  }
  this.center.setFrom$1(node.get$box().get$center());
  var sibling = this._root;
  if (sibling.get$isLeaf() !== true) {
    var childOne = null;
    var childTwo = null;
    do {
      childOne = sibling.get$childOne();
      childTwo = sibling.get$childTwo();
      this.deltaOne.setFrom$1(childOne.get$box().get$center());
      this.deltaTwo.setFrom$1(childTwo.get$box().get$center());
      this.deltaOne.subLocal$1(this.center).absLocal$0();
      this.deltaTwo.subLocal$1(this.center).absLocal$0();
      t1 = this.deltaOne.x;
      if (typeof t1 !== 'number') return this._insertLeaf$1$bailout(2, node, childTwo, t1, childOne, 0, 0);
      var t2 = this.deltaOne.y;
      if (typeof t2 !== 'number') return this._insertLeaf$1$bailout(3, node, childOne, childTwo, t1, t2, 0);
      var normOne = t1 + t2;
      t2 = this.deltaTwo.x;
      if (typeof t2 !== 'number') return this._insertLeaf$1$bailout(4, node, t2, childOne, childTwo, normOne, 0);
      t1 = this.deltaTwo.y;
      if (typeof t1 !== 'number') return this._insertLeaf$1$bailout(5, node, t2, t1, childOne, childTwo, normOne);
      sibling = normOne < t2 + t1 ? childOne : childTwo;
      t1 = sibling.get$isLeaf();
      if (typeof t1 !== 'boolean') return this._insertLeaf$1$bailout(6, childTwo, sibling, node, t1, childOne, 0);
    } while (!t1);
  }
  var node1 = sibling.get$parent();
  var node2 = this._allocateNode$0();
  node2.set$parent(node1);
  node2.set$userData(null);
  node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
  if (!(node1 == null)) {
    t1 = sibling.get$parent().get$childOne();
    if (t1 == null ? sibling == null : t1 === sibling) node1.set$childOne(node2);
    else node1.set$childTwo(node2);
    node2.set$childOne(sibling);
    node2.set$childTwo(node);
    sibling.set$parent(node2);
    node.set$parent(node2);
    do {
      if ($.contains$1(node1.get$box(), node2.get$box()) === true) break;
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
 _insertLeaf$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var node = env0;
      t1 = env1;
      break;
    case 2:
      node = env0;
      childTwo = env1;
      t1 = env2;
      childOne = env3;
      break;
    case 3:
      node = env0;
      childOne = env1;
      childTwo = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 4:
      node = env0;
      t2 = env1;
      childOne = env2;
      childTwo = env3;
      normOne = env4;
      break;
    case 5:
      node = env0;
      t2 = env1;
      t1 = env2;
      childOne = env3;
      childTwo = env4;
      normOne = env5;
      break;
    case 6:
      childTwo = env0;
      sibling = env1;
      node = env2;
      t1 = env3;
      childOne = env4;
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
      this.center.setFrom$1(node.get$box().get$center());
      var sibling = this._root;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      if (state == 2 || state == 3 || state == 4 || state == 5 || state == 6 || (state == 0 && sibling.get$isLeaf() !== true)) {
        switch (state) {
          case 0:
            var childOne = null;
            var childTwo = null;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            L0: while (true) {
              switch (state) {
                case 0:
                  childOne = sibling.get$childOne();
                  childTwo = sibling.get$childTwo();
                  this.deltaOne.setFrom$1(childOne.get$box().get$center());
                  this.deltaTwo.setFrom$1(childTwo.get$box().get$center());
                  this.deltaOne.subLocal$1(this.center).absLocal$0();
                  this.deltaTwo.subLocal$1(this.center).absLocal$0();
                  t1 = this.deltaOne.get$x();
                case 2:
                  state = 0;
                  var t2 = this.deltaOne.get$y();
                case 3:
                  state = 0;
                  var normOne = $.add(t1, t2);
                  t2 = this.deltaTwo.get$x();
                case 4:
                  state = 0;
                  t1 = this.deltaTwo.get$y();
                case 5:
                  state = 0;
                  sibling = $.ltB(normOne, $.add(t2, t1)) ? childOne : childTwo;
                  t1 = sibling.get$isLeaf();
                case 6:
                  state = 0;
                  if (!$.eqB(t1, false)) break L0;
              }
            }
        }
      }
      var node1 = sibling.get$parent();
      var node2 = this._allocateNode$0();
      node2.set$parent(node1);
      node2.set$userData(null);
      node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
      if (!(node1 == null)) {
        t1 = sibling.get$parent().get$childOne();
        if (t1 == null ? sibling == null : t1 === sibling) node1.set$childOne(node2);
        else node1.set$childTwo(node2);
        node2.set$childOne(sibling);
        node2.set$childTwo(node);
        sibling.set$parent(node2);
        node.set$parent(node2);
        do {
          if ($.contains$1(node1.get$box(), node2.get$box()) === true) break;
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
 _query$4: function(callback, argBox, node, count) {
  if (typeof count !== 'number') return this._query$4$bailout(1, callback, argBox, node, count);
  if (node == null) return true;
  if ($.AxisAlignedBox_testOverlap(argBox, node.get$box()) === true) {
    if (node.get$isLeaf() === true) {
      if (callback.treeCallback$1(node) !== true) return false;
    } else {
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childOne(), count) !== true) return false;
      }
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childTwo(), count) !== true) return false;
      }
    }
  }
  return true;
 },
 _query$4$bailout: function(state, callback, argBox, node, count) {
  if (node == null) return true;
  if ($.AxisAlignedBox_testOverlap(argBox, node.get$box()) === true) {
    if (node.get$isLeaf() === true) {
      if (callback.treeCallback$1(node) !== true) return false;
    } else {
      if ($.ltB(count, 64)) {
        count = $.add(count, 1);
        if (this._query$4(callback, argBox, node.get$childOne(), count) !== true) return false;
      }
      if ($.ltB(count, 64)) {
        count = $.add(count, 1);
        if (this._query$4(callback, argBox, node.get$childTwo(), count) !== true) return false;
      }
    }
  }
  return true;
 },
 query$2: function(callback, argBox) {
  this._query$4(callback, argBox, this._root, 1);
 },
 _allocateNode$0: function() {
  if ($.isEmpty(this._nodeStack) === true) {
    for (var i = 0; i < 6; ++i) {
      this._nodeStack.addFirst$1($.DynamicTreeNode$_construct());
    }
  }
  var node = this._nodeStack.removeFirst$0();
  node.set$parent(null);
  node.set$childOne(null);
  node.set$childTwo(null);
  node.set$userData(null);
  node.set$key(this._nodeCounter);
  this._nodeCounter = this._nodeCounter + 1;
  this._nodeCount = this._nodeCount + 1;
  return node;
 },
 moveProxy$3: function(argProxy, argBox, displacement) {
  if ($.contains$1(argProxy.get$box(), argBox) === true) return false;
  this._removeLeaf$1(argProxy);
  var t1 = argBox.get$lowerBound();
  t1.set$x($.sub(t1.get$x(), 0.1));
  t1 = argBox.get$lowerBound();
  t1.set$y($.sub(t1.get$y(), 0.1));
  t1 = argBox.get$upperBound();
  t1.set$x($.add(t1.get$x(), 0.1));
  t1 = argBox.get$upperBound();
  t1.set$y($.add(t1.get$y(), 0.1));
  this._tempVector.setFrom$1(displacement);
  this._tempVector.mulLocal$1(2);
  if ($.ltB(this._tempVector.get$x(), 0)) {
    t1 = argBox.get$lowerBound();
    t1.set$x($.add(t1.get$x(), this._tempVector.get$x()));
  } else {
    t1 = argBox.get$upperBound();
    t1.set$x($.add(t1.get$x(), this._tempVector.get$x()));
  }
  if ($.ltB(this._tempVector.get$y(), 0)) {
    t1 = argBox.get$lowerBound();
    t1.set$y($.add(t1.get$y(), this._tempVector.get$y()));
  } else {
    t1 = argBox.get$upperBound();
    t1.set$y($.add(t1.get$y(), this._tempVector.get$y()));
  }
  argProxy.get$box().setFrom$1(argBox);
  this._insertLeaf$1(argProxy);
  return true;
 },
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
  if (typeof height !== 'number') return this.createProxy$2$bailout(1, height, proxy, iterationCount);
  var tryCount = 0;
  while (true) {
    if (!($.gtB(height, 64) && tryCount < 10)) break;
    this.rebalance$1(iterationCount);
    height = this.computeHeightFromRoot$0();
    ++tryCount;
  }
  return proxy;
 },
 createProxy$2$bailout: function(state, height, proxy, iterationCount) {
  var tryCount = 0;
  while (true) {
    if (!($.gtB(height, 64) && tryCount < 10)) break;
    this.rebalance$1(iterationCount);
    height = this.computeHeightFromRoot$0();
    ++tryCount;
  }
  return proxy;
 },
 DynamicTree$0: function() {
  for (var i = 0; i < this._drawVectors.length; ++i) {
    var t1 = this._drawVectors;
    var t2 = $.Vector$(0, 0);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.DynamicTreeNode = {"":
 ["key=", "userData=", "childTwo=", "childOne=", "next=", "parent=", "box?"],
 super: "Object",
 toString$0: function() {
  return $.toString(this.box);
 },
 get$isLeaf: function() {
  return this.childOne == null;
 },
 next$0: function() { return this.next.$call$0(); }
};

$$.Pair = {"":
 ["proxyB=", "proxyA="],
 super: "Object",
 compareTo$1: function(pair2) {
  if ($.ltB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) return -1;
  if ($.eqB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) {
    if ($.ltB(this.proxyB.get$key(), pair2.get$proxyB().get$key())) var t1 = -1;
    else {
      t1 = $.eqB(this.proxyB.get$key(), pair2.get$proxyB().get$key()) ? 0 : 1;
    }
    return t1;
  }
  return 1;
 }
};

$$.CircleShape = {"":
 ["position?", "radius", "type"],
 super: "Shape",
 computeMass$2: function(massData, density) {
  massData.set$mass($.mul($.mul($.mul(density, 3.141592653589793), this.radius), this.radius));
  massData.get$center().setFrom$1(this.position);
  var t1 = massData.get$mass();
  var t2 = this.radius;
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= 0.5;
  var t3 = this.radius;
  if (typeof t3 !== 'number') throw $.iae(t3);
  t3 *= t2;
  t2 = $.Vector_dot(this.position, this.position);
  if (typeof t2 !== 'number') throw $.iae(t2);
  massData.set$inertia($.mul(t1, t3 + t2));
 },
 clone$0: function() {
  return $.CircleShape$copy(this);
 },
 computeAxisAlignedBox$2: function(argBox, argTransform) {
  var p = $.Vector$(0, 0);
  $.Matrix22_mulMatrixAndVectorToOut(argTransform.get$rotation(), this.position, p);
  p.addLocal$1(argTransform.get$position());
  argBox.get$lowerBound().setCoords$2($.sub(p.x, this.radius), $.sub(p.y, this.radius));
  argBox.get$upperBound().setCoords$2($.add(p.x, this.radius), $.add(p.y, this.radius));
 }
};

$$.MassData = {"":
 ["inertia=", "center?", "mass="],
 super: "Object",
 setFrom$1: function(md) {
  this.mass = md.get$mass();
  this.inertia = md.get$inertia();
  this.center.setFrom$1(md.get$center());
 }
};

$$.PolygonShape = {"":
 ["vertexCount?", "normals?", "vertices?", "centroid?", "radius", "type"],
 super: "Shape",
 computeMass$2: function(massData, density) {
  if ($.eqB(this.vertexCount, 2)) {
    var t1 = massData.get$center();
    var t2 = this.vertices;
    var t3 = t2.length;
    if (0 < 0 || 0 >= t3) throw $.ioore(0);
    t1 = t1.setFrom$1(t2[0]);
    var t4 = this.vertices;
    var t5 = t4.length;
    if (1 < 0 || 1 >= t5) throw $.ioore(1);
    t1.addLocal$1(t4[1]).mulLocal$1(0.5);
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
  for (var area = 0.0, I = 0.0, i = 0; $.ltB(i, this.vertexCount); ++i) {
    t1 = this.vertices;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    t2 = i + 1;
    if ($.ltB(t2, this.vertexCount)) {
      t3 = this.vertices;
      t4 = t3.length;
      if (t2 < 0 || t2 >= t4) throw $.ioore(t2);
      var p3 = t3[t2];
    } else {
      t2 = this.vertices;
      t3 = t2.length;
      if (0 < 0 || 0 >= t3) throw $.ioore(0);
      p3 = t2[0];
    }
    e1.setFrom$1(t1);
    e1.subLocal$1(pRef);
    e2.setFrom$1(p3);
    e2.subLocal$1(pRef);
    var D = $.Vector_crossVectors(e1, e2);
    if (typeof D !== 'number') throw $.iae(D);
    var triangleArea = 0.5 * D;
    area += triangleArea;
    t2 = center.x;
    t3 = triangleArea * 0.3333333333333333;
    t4 = $.add($.add(pRef.x, t1.get$x()), p3.get$x());
    if (typeof t4 !== 'number') throw $.iae(t4);
    center.x = $.add(t2, t3 * t4);
    t5 = center.y;
    var t6 = $.add($.add(pRef.y, t1.get$y()), p3.get$y());
    if (typeof t6 !== 'number') throw $.iae(t6);
    center.y = $.add(t5, t3 * t6);
    var px = pRef.x;
    var py = pRef.y;
    var ex1 = e1.x;
    var ey1 = e1.y;
    var ex2 = e2.x;
    var ey2 = e2.y;
    var t7 = $.add($.add($.mul(ex1, ex1), $.mul(ex2, ex1)), $.mul(ex2, ex2));
    if (typeof t7 !== 'number') throw $.iae(t7);
    t7 *= 0.25;
    var t8 = $.add($.mul(px, ex1), $.mul(px, ex2));
    if (typeof t8 !== 'number') throw $.iae(t8);
    var t9 = 0.3333333333333333 * (t7 + t8);
    if (typeof px !== 'number') throw $.iae(px);
    var intx2 = t9 + 0.5 * px * px;
    t9 = $.add($.add($.mul(ey1, ey1), $.mul(ey2, ey1)), $.mul(ey2, ey2));
    if (typeof t9 !== 'number') throw $.iae(t9);
    t9 *= 0.25;
    var t10 = $.add($.mul(py, ey1), $.mul(py, ey2));
    if (typeof t10 !== 'number') throw $.iae(t10);
    var t11 = 0.3333333333333333 * (t9 + t10);
    if (typeof py !== 'number') throw $.iae(py);
    I += D * (intx2 + (t11 + 0.5 * py * py));
  }
  massData.set$mass($.mul(density, area));
  center.mulLocal$1(1.0 / area);
  massData.get$center().setFrom$1(center);
  if (typeof density !== 'number') throw $.iae(density);
  massData.set$inertia(I * density);
 },
 computeAxisAlignedBox$2: function(argAabb, argXf) {
  var lower = $.Vector$(0, 0);
  var upper = $.Vector$(0, 0);
  var v = $.Vector$(0, 0);
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  $.Transform_mulToOut(argXf, t1[0], lower);
  upper.setFrom$1(lower);
  for (var i = 1; $.ltB(i, this.vertexCount); ++i) {
    t1 = this.vertices;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
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
 setAsBoxWithCenterAndAngle$4: function(hx, hy, center, angle) {
  this.vertexCount = 4;
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  t1[0].setCoords$2($.neg(hx), $.neg(hy));
  var t3 = this.vertices;
  var t4 = t3.length;
  if (1 < 0 || 1 >= t4) throw $.ioore(1);
  t3[1].setCoords$2(hx, $.neg(hy));
  var t5 = this.vertices;
  var t6 = t5.length;
  if (2 < 0 || 2 >= t6) throw $.ioore(2);
  t5[2].setCoords$2(hx, hy);
  var t7 = this.vertices;
  var t8 = t7.length;
  if (3 < 0 || 3 >= t8) throw $.ioore(3);
  t7[3].setCoords$2($.neg(hx), hy);
  var t9 = this.normals;
  var t10 = t9.length;
  if (0 < 0 || 0 >= t10) throw $.ioore(0);
  t9[0].setCoords$2(0.0, -1.0);
  var t11 = this.normals;
  var t12 = t11.length;
  if (1 < 0 || 1 >= t12) throw $.ioore(1);
  t11[1].setCoords$2(1.0, 0.0);
  var t13 = this.normals;
  var t14 = t13.length;
  if (2 < 0 || 2 >= t14) throw $.ioore(2);
  t13[2].setCoords$2(0.0, 1.0);
  var t15 = this.normals;
  var t16 = t15.length;
  if (3 < 0 || 3 >= t16) throw $.ioore(3);
  t15[3].setCoords$2(-1.0, 0.0);
  this.centroid.setFrom$1(center);
  var xf = $.Transform$();
  xf.position.setFrom$1(center);
  xf.rotation.setAngle$1(angle);
  for (var i = 0; $.ltB(i, this.vertexCount); ++i) {
    t1 = this.vertices;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    t3 = this.vertices;
    t4 = t3.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    $.Transform_mulToOut(xf, t1, t3[i]);
    t1 = xf.rotation;
    t5 = this.normals;
    t6 = t5.length;
    if (i < 0 || i >= t6) throw $.ioore(i);
    t5 = t5[i];
    t7 = this.normals;
    t8 = t7.length;
    if (i < 0 || i >= t8) throw $.ioore(i);
    $.Matrix22_mulMatrixAndVectorToOut(t1, t5, t7[i]);
  }
 },
 setAsBox$2: function(hx, hy) {
  this.vertexCount = 4;
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  t1[0].setCoords$2($.neg(hx), $.neg(hy));
  var t3 = this.vertices;
  var t4 = t3.length;
  if (1 < 0 || 1 >= t4) throw $.ioore(1);
  t3[1].setCoords$2(hx, $.neg(hy));
  var t5 = this.vertices;
  var t6 = t5.length;
  if (2 < 0 || 2 >= t6) throw $.ioore(2);
  t5[2].setCoords$2(hx, hy);
  var t7 = this.vertices;
  var t8 = t7.length;
  if (3 < 0 || 3 >= t8) throw $.ioore(3);
  t7[3].setCoords$2($.neg(hx), hy);
  var t9 = this.normals;
  var t10 = t9.length;
  if (0 < 0 || 0 >= t10) throw $.ioore(0);
  t9[0].setCoords$2(0.0, -1.0);
  var t11 = this.normals;
  var t12 = t11.length;
  if (1 < 0 || 1 >= t12) throw $.ioore(1);
  t11[1].setCoords$2(1.0, 0.0);
  var t13 = this.normals;
  var t14 = t13.length;
  if (2 < 0 || 2 >= t14) throw $.ioore(2);
  t13[2].setCoords$2(0.0, 1.0);
  var t15 = this.normals;
  var t16 = t15.length;
  if (3 < 0 || 3 >= t16) throw $.ioore(3);
  t15[3].setCoords$2(-1.0, 0.0);
  this.centroid.setZero$0();
 },
 clone$0: function() {
  return $.PolygonShape$copy(this);
 },
 getSupport$1: function(d) {
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var bestValue = $.Vector_dot(t1[0], d);
  if (typeof bestValue !== 'number') return this.getSupport$1$bailout(1, d, bestValue, 0, 0, 0);
  var i = 1;
  var bestIndex = 0;
  while (true) {
    t1 = this.vertexCount;
    if (typeof t1 !== 'number') return this.getSupport$1$bailout(2, d, t1, i, bestValue, bestIndex);
    if (!(i < t1)) break;
    t1 = this.vertices;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var value = $.Vector_dot(t1[i], d);
    if (typeof value !== 'number') return this.getSupport$1$bailout(3, d, i, value, bestValue, bestIndex);
    if (value > bestValue) {
      bestIndex = i;
      bestValue = value;
    }
    ++i;
  }
  return bestIndex;
 },
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var d = env0;
      bestValue = env1;
      break;
    case 2:
      d = env0;
      t1 = env1;
      i = env2;
      bestValue = env3;
      bestIndex = env4;
      break;
    case 3:
      d = env0;
      i = env1;
      value = env2;
      bestValue = env3;
      bestIndex = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.vertices;
      var t2 = t1.length;
      if (0 < 0 || 0 >= t2) throw $.ioore(0);
      var bestValue = $.Vector_dot(t1[0], d);
    case 1:
      state = 0;
      var i = 1;
      var bestIndex = 0;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = this.vertexCount;
          case 2:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.vertices;
            t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            var value = $.Vector_dot(t1[i], d);
          case 3:
            state = 0;
            if ($.gtB(value, bestValue)) {
              bestIndex = i;
              bestValue = value;
            }
            ++i;
        }
      }
      return bestIndex;
  }
 },
 PolygonShape$copy$1: function(other) {
  for (var i = 0; $.ltB(i, $.get$length(other.get$vertices())); ++i) {
    var t1 = this.vertices;
    var t2 = $.Vector$copy($.index(other.get$vertices(), i));
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
  for (i = 0; $.ltB(i, $.get$length(other.get$normals())); ++i) {
    t1 = this.normals;
    t2 = $.Vector$copy($.index(other.get$normals(), i));
    t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 PolygonShape$0: function() {
  for (var i = 0; i < this.vertices.length; ++i) {
    var t1 = this.vertices;
    var t2 = $.Vector$(0, 0);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
  for (i = 0; i < this.normals.length; ++i) {
    t1 = this.normals;
    t2 = $.Vector$(0, 0);
    t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.Shape = {"":
 ["radius=", "type="],
 super: "Object"
};

$$.CanvasDraw = {"":
 ["ctx", "viewportTransform", "drawFlags"],
 super: "DebugDraw",
 set$_color: function(color) {
  this.ctx.setStrokeColor$4(color.get$x(), color.get$y(), color.get$z(), 0.9);
  this.ctx.setFillColor$4(color.get$x(), color.get$y(), color.get$z(), 0.8);
 },
 drawTransform$2: function(xf, color) {
  this.drawCircle$3(xf.get$position(), 0.1, color);
 },
 _pathCircle$3: function(center, radius, color) {
  this.set$_color(color);
  this.getWorldToScreenToOut$2(center, center);
  this.ctx.beginPath$0();
  this.ctx.arc$6(center.get$x(), center.get$y(), radius, 0, 6.283185307179586, true);
  this.ctx.closePath$0();
 },
 drawPoint$3: function(point, radiusOnScreen, color) {
  this._pathCircle$3(point, radiusOnScreen, color);
  this.ctx.fill$0();
 },
 drawSolidCircle$4: function(center, radius, color, axis) {
  this.drawPoint$3(center, $.mul(radius, this.viewportTransform.get$scale()), color);
 },
 drawCircle$4: function(center, radius, color, axis) {
  this._pathCircle$3(center, $.mul(radius, this.viewportTransform.get$scale()), color);
  this.ctx.stroke$0();
 },
 drawCircle$3: function(center,radius,color) {
  return this.drawCircle$4(center,radius,color,null)
},
 drawSegment$3: function(p1, p2, color) {
  this.set$_color(color);
  this.getWorldToScreenToOut$2(p1, p1);
  this.getWorldToScreenToOut$2(p2, p2);
  this.ctx.beginPath$0();
  this.ctx.moveTo$2(p1.get$x(), p1.get$y());
  this.ctx.lineTo$2(p2.get$x(), p2.get$y());
  this.ctx.closePath$0();
  this.ctx.stroke$0();
 },
 _pathPolygon$3: function(vertices, vertexCount, color) {
  if (typeof vertices !== 'string' && (typeof vertices !== 'object' || vertices === null || (vertices.constructor !== Array && !vertices.is$JavaScriptIndexingBehavior()))) return this._pathPolygon$3$bailout(1, vertices, vertexCount, color);
  if (typeof vertexCount !== 'number') return this._pathPolygon$3$bailout(1, vertices, vertexCount, color);
  this.set$_color(color);
  for (var i = 0; i < vertexCount; ++i) {
    var t1 = vertices.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = vertices[i];
    var t3 = vertices.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    this.getWorldToScreenToOut$2(t2, vertices[i]);
  }
  this.ctx.beginPath$0();
  t1 = this.ctx;
  t2 = vertices.length;
  if (0 >= t2) throw $.ioore(0);
  t3 = vertices[0].get$x();
  var t4 = vertices.length;
  if (0 >= t4) throw $.ioore(0);
  t1.moveTo$2(t3, vertices[0].get$y());
  for (i = 1; i < vertexCount; ++i) {
    t1 = this.ctx;
    t2 = vertices.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = vertices[i].get$x();
    t4 = vertices.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t1.lineTo$2(t3, vertices[i].get$y());
  }
  t1 = this.ctx;
  t2 = vertices.length;
  if (0 >= t2) throw $.ioore(0);
  t3 = vertices[0].get$x();
  t4 = vertices.length;
  if (0 >= t4) throw $.ioore(0);
  t1.lineTo$2(t3, vertices[0].get$y());
  this.ctx.closePath$0();
 },
 _pathPolygon$3$bailout: function(state, vertices, vertexCount, color) {
  this.set$_color(color);
  for (var i = 0; $.ltB(i, vertexCount); ++i) {
    this.getWorldToScreenToOut$2($.index(vertices, i), $.index(vertices, i));
  }
  this.ctx.beginPath$0();
  this.ctx.moveTo$2($.index(vertices, 0).get$x(), $.index(vertices, 0).get$y());
  for (i = 1; $.ltB(i, vertexCount); ++i) {
    this.ctx.lineTo$2($.index(vertices, i).get$x(), $.index(vertices, i).get$y());
  }
  this.ctx.lineTo$2($.index(vertices, 0).get$x(), $.index(vertices, 0).get$y());
  this.ctx.closePath$0();
 },
 drawSolidPolygon$3: function(vertices, vertexCount, color) {
  this._pathPolygon$3(vertices, vertexCount, color);
  this.ctx.fill$0();
 },
 drawPolygon$3: function(vertices, vertexCount, color) {
  this._pathPolygon$3(vertices, vertexCount, color);
  this.ctx.stroke$0();
 },
 CanvasDraw$2: function(viewport, ctx) {
 }
};

$$.ContactFilter = {"":
 [],
 super: "Object",
 shouldCollide$2: function(fixtureA, fixtureB) {
  var filterA = fixtureA.get$filter();
  var filterB = fixtureB.get$filter();
  var t1 = filterA.get$groupIndex();
  if (typeof t1 !== 'number') return this.shouldCollide$2$bailout(1, t1, filterA, filterB, 0);
  if (!(t1 === 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex())) {
    t1 = filterA.get$groupIndex();
    if (typeof t1 !== 'number') return this.shouldCollide$2$bailout(2, t1, 0, 0, 0);
    return t1 > 0;
  }
  t1 = filterA.get$maskBits();
  if (t1 !== (t1 | 0)) return this.shouldCollide$2$bailout(3, t1, filterA, filterB, 0);
  var t2 = filterB.get$categoryBits();
  if (t2 !== (t2 | 0)) return this.shouldCollide$2$bailout(4, t1, t2, filterA, filterB);
  if (!((t1 & t2) >>> 0 === 0)) {
    t1 = filterA.get$categoryBits();
    if (t1 !== (t1 | 0)) return this.shouldCollide$2$bailout(5, t1, filterB, 0, 0);
    t2 = filterB.get$maskBits();
    if (t2 !== (t2 | 0)) return this.shouldCollide$2$bailout(6, t1, t2, 0, 0);
    var t3 = !((t1 & t2) >>> 0 === 0);
    t1 = t3;
  } else t1 = false;
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
      t2 = env1;
      filterA = env2;
      filterB = env3;
      break;
    case 5:
      t1 = env0;
      filterB = env1;
      break;
    case 6:
      t1 = env0;
      t2 = env1;
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
      if (state == 2 || (state == 0 && (!$.eqB(t1, 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex())))) {
        switch (state) {
          case 0:
            t1 = filterA.get$groupIndex();
          case 2:
            state = 0;
            return $.gt(t1, 0);
        }
      }
      t1 = filterA.get$maskBits();
    case 3:
      state = 0;
      var t2 = filterB.get$categoryBits();
    case 4:
      state = 0;
    case 5:
    case 6:
      if (state == 5 || state == 6 || (state == 0 && !$.eqB($.and(t1, t2), 0))) {
        switch (state) {
          case 0:
            t1 = filterA.get$categoryBits();
          case 5:
            state = 0;
            t2 = filterB.get$maskBits();
          case 6:
            state = 0;
            var t3 = !$.eqB($.and(t1, t2), 0);
            t1 = t3;
        }
      } else {
        t1 = false;
      }
      return t1;
  }
 }
};

$$.ContactImpulse = {"":
 ["tangentImpulses?", "normalImpulses?"],
 super: "Object"
};

$$.DebugDraw = {"":
 ["drawFlags?"],
 super: "Object",
 getWorldToScreenToOut$2: function(argWorld, argScreen) {
  this.viewportTransform.getWorldToScreen$2(argWorld, argScreen);
 },
 get$flags: function() {
  return this.drawFlags;
 },
 set$flags: function(flags) {
  this.drawFlags = flags;
 }
};

$$.Body = {"":
 ["tempCenter", "oldCenter", "_pxf", "_pmd", "_fixDef", "sweep?", "originTransform?", "islandIndex!", "_type?", "angularDamping?", "linearDamping?", "invInertia?", "_inertia", "_torque=", "_force?", "jointList=", "fixtureCount", "fixtureList?", "prev=", "next=", "invMass?", "mass=", "_angularVelocity", "_linearVelocity", "userData=", "sleepTime=", "contactList=", "flags=", "world"],
 super: "Object",
 advance$1: function(t) {
  this.sweep.advance$1(t);
  this.sweep.get$center().setFrom$1(this.sweep.get$centerZero());
  var t1 = this.sweep.get$angleZero();
  this.sweep.set$angle(t1);
  this.synchronizeTransform$0();
 },
 shouldCollide$1: function(other) {
  return !(!$.eqB(this._type, 2) && !$.eqB(other.get$_type(), 2));
 },
 synchronizeTransform$0: function() {
  var c = $.Math_cos(this.sweep.angle);
  var s = $.Math_sin(this.sweep.angle);
  if (typeof s !== 'number') return this.synchronizeTransform$0$bailout(1, s, c, 0, 0, 0);
  var t = this.originTransform;
  var r = t.rotation;
  var p = t.position;
  r.get$col1().set$x(c);
  var t1 = -s;
  r.get$col2().set$x(t1);
  r.get$col1().set$y(s);
  r.get$col2().set$y(c);
  t1 = r.get$col1().get$x();
  if (typeof t1 !== 'number') return this.synchronizeTransform$0$bailout(2, t1, r, p, 0, 0);
  var t2 = this.sweep.localCenter.get$x();
  if (typeof t2 !== 'number') return this.synchronizeTransform$0$bailout(3, t1, r, p, t2, 0);
  t2 *= t1;
  t1 = r.get$col2().get$x();
  if (typeof t1 !== 'number') return this.synchronizeTransform$0$bailout(4, r, p, t2, t1, 0);
  var t3 = this.sweep.localCenter.get$y();
  if (typeof t3 !== 'number') return this.synchronizeTransform$0$bailout(5, t3, r, p, t2, t1);
  var t4 = (t2 + t1 * t3) * -1;
  var t5 = this.sweep.center.get$x();
  if (typeof t5 !== 'number') return this.synchronizeTransform$0$bailout(6, r, p, t4, t5, 0);
  p.set$x(t4 + t5);
  var t6 = r.get$col1().get$y();
  if (typeof t6 !== 'number') return this.synchronizeTransform$0$bailout(7, r, p, t6, 0, 0);
  var t7 = this.sweep.localCenter.get$x();
  if (typeof t7 !== 'number') return this.synchronizeTransform$0$bailout(8, r, p, t6, t7, 0);
  t7 *= t6;
  t6 = r.get$col2().get$y();
  if (typeof t6 !== 'number') return this.synchronizeTransform$0$bailout(9, t7, t6, p, 0, 0);
  var t8 = this.sweep.localCenter.get$y();
  if (typeof t8 !== 'number') return this.synchronizeTransform$0$bailout(10, t7, t6, p, t8, 0);
  var t9 = (t7 + t6 * t8) * -1;
  var t10 = this.sweep.center.get$y();
  if (typeof t10 !== 'number') return this.synchronizeTransform$0$bailout(11, t10, p, t9, 0, 0);
  p.set$y(t9 + t10);
 },
 synchronizeTransform$0$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      s = env0;
      c = env1;
      break;
    case 2:
      t1 = env0;
      r = env1;
      p = env2;
      break;
    case 3:
      t1 = env0;
      r = env1;
      p = env2;
      t2 = env3;
      break;
    case 4:
      r = env0;
      p = env1;
      t2 = env2;
      t1 = env3;
      break;
    case 5:
      t3 = env0;
      r = env1;
      p = env2;
      t2 = env3;
      t1 = env4;
      break;
    case 6:
      r = env0;
      p = env1;
      t4 = env2;
      t5 = env3;
      break;
    case 7:
      r = env0;
      p = env1;
      t6 = env2;
      break;
    case 8:
      r = env0;
      p = env1;
      t6 = env2;
      t7 = env3;
      break;
    case 9:
      t7 = env0;
      t6 = env1;
      p = env2;
      break;
    case 10:
      t7 = env0;
      t6 = env1;
      p = env2;
      t8 = env3;
      break;
    case 11:
      t10 = env0;
      p = env1;
      t9 = env2;
      break;
  }
  switch (state) {
    case 0:
      var c = $.Math_cos(this.sweep.get$angle());
      var s = $.Math_sin(this.sweep.get$angle());
    case 1:
      state = 0;
      var t = this.originTransform;
      var r = t.get$rotation();
      var p = t.get$position();
      r.get$col1().set$x(c);
      var t1 = $.neg(s);
      r.get$col2().set$x(t1);
      r.get$col1().set$y(s);
      r.get$col2().set$y(c);
      t1 = r.get$col1().get$x();
    case 2:
      state = 0;
      var t2 = this.sweep.get$localCenter().get$x();
    case 3:
      state = 0;
      t2 = $.mul(t1, t2);
      t1 = r.get$col2().get$x();
    case 4:
      state = 0;
      var t3 = this.sweep.get$localCenter().get$y();
    case 5:
      state = 0;
      var t4 = $.mul($.add(t2, $.mul(t1, t3)), -1);
      var t5 = this.sweep.get$center().get$x();
    case 6:
      state = 0;
      p.set$x($.add(t4, t5));
      var t6 = r.get$col1().get$y();
    case 7:
      state = 0;
      var t7 = this.sweep.get$localCenter().get$x();
    case 8:
      state = 0;
      t7 = $.mul(t6, t7);
      t6 = r.get$col2().get$y();
    case 9:
      state = 0;
      var t8 = this.sweep.get$localCenter().get$y();
    case 10:
      state = 0;
      var t9 = $.mul($.add(t7, $.mul(t6, t8)), -1);
      var t10 = this.sweep.get$center().get$y();
    case 11:
      state = 0;
      p.set$y($.add(t9, t10));
  }
 },
 synchronizeFixtures$0: function() {
  var xf1 = this._pxf;
  xf1.get$rotation().setAngle$1(this.sweep.get$angleZero());
  $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), this.sweep.get$localCenter(), xf1.get$position());
  xf1.get$position().mulLocal$1(-1);
  xf1.get$position().addLocal$1(this.sweep.get$centerZero());
  var broadPhase = this.world.get$_contactManager().get$broadPhase();
  for (var f = this.fixtureList; !(f == null); f = f.get$next()) {
    f.synchronize$3(broadPhase, xf1, this.originTransform);
  }
 },
 get$fixedRotation: function() {
  return $.eq($.and(this.flags, 16), 16);
 },
 get$active: function() {
  return $.eq($.and(this.flags, 32), 32);
 },
 get$awake: function() {
  return $.eq($.and(this.flags, 2), 2);
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
 get$bullet: function() {
  return $.eq($.and(this.flags, 8), 8);
 },
 set$type: function(otherType) {
  if ($.eqB(this._type, otherType)) return;
  this._type = otherType;
  this.resetMassData$0();
  if ($.eqB(this._type, 0)) {
    this._linearVelocity.setZero$0();
    this._angularVelocity = 0.0;
  }
  this.set$awake(true);
  this._force.setZero$0();
  this._torque = 0.0;
  for (var ce = this.contactList; !(ce == null); ce = ce.get$next()) {
    ce.get$contact().flagForFiltering$0();
  }
 },
 get$type: function() {
  return this._type;
 },
 getLocalPoint$1: function(worldPoint) {
  var out = $.Vector$(0, 0);
  this.getLocalPointToOut$2(worldPoint, out);
  return out;
 },
 getLocalPointToOut$2: function(worldPoint, out) {
  $.Transform_mulTransToOut(this.originTransform, worldPoint, out);
 },
 getWorldVectorToOut$2: function(localVector, out) {
  $.Matrix22_mulMatrixAndVectorToOut(this.originTransform.get$rotation(), localVector, out);
 },
 getWorldVector$1: function(localVector) {
  var out = $.Vector$(0, 0);
  this.getWorldVectorToOut$2(localVector, out);
  return out;
 },
 getWorldPointToOut$2: function(localPoint, out) {
  $.Transform_mulToOut(this.originTransform, localPoint, out);
 },
 getWorldPoint$1: function(localPoint) {
  var v = $.Vector$(0, 0);
  this.getWorldPointToOut$2(localPoint, v);
  return v;
 },
 resetMassData$0: function() {
  this.mass = 0.0;
  this.invMass = 0.0;
  this._inertia = 0.0;
  this.invInertia = 0.0;
  this.sweep.get$localCenter().setZero$0();
  if ($.eqB(this._type, 0) || $.eqB(this._type, 1)) {
    this.sweep.get$center().setFrom$1(this.originTransform.get$position());
    this.sweep.get$centerZero().setFrom$1(this.originTransform.get$position());
    return;
  }
  this.tempCenter.setZero$0();
  var massData = this._pmd;
  for (var f = this.fixtureList; !(f == null); f = f.get$next()) {
    if ($.eqB(f.get$density(), 0.0)) continue;
    f.getMassData$1(massData);
    this.mass = $.add(this.mass, massData.get$mass());
    var temp = $.Vector$copy(massData.get$center());
    temp.mulLocal$1(massData.get$mass());
    this.tempCenter.addLocal$1(temp);
    this._inertia = $.add(this._inertia, massData.get$inertia());
  }
  if ($.gtB(this.mass, 0.0)) {
    var t1 = this.mass;
    if (typeof t1 !== 'number') throw $.iae(t1);
    this.invMass = 1.0 / t1;
    this.tempCenter.mulLocal$1(this.invMass);
  } else {
    this.mass = 1.0;
    this.invMass = 1.0;
  }
  if ($.gtB(this._inertia, 0.0) && $.eqB($.and(this.flags, 16), 0)) {
    this._inertia = $.sub(this._inertia, $.mul(this.mass, $.Vector_dot(this.tempCenter, this.tempCenter)));
    t1 = this._inertia;
    if (typeof t1 !== 'number') throw $.iae(t1);
    this.invInertia = 1.0 / t1;
  } else {
    this._inertia = 0.0;
    this.invInertia = 0.0;
  }
  this.oldCenter.setFrom$1(this.sweep.get$center());
  this.sweep.get$localCenter().setFrom$1(this.tempCenter);
  $.Transform_mulToOut(this.originTransform, this.sweep.get$localCenter(), this.sweep.get$centerZero());
  this.sweep.get$center().setFrom$1(this.sweep.get$centerZero());
  temp = $.Vector$copy(this.sweep.get$center());
  temp.subLocal$1(this.oldCenter);
  $.Vector_crossNumAndVectorToOut(this._angularVelocity, temp, temp);
  this._linearVelocity.addLocal$1(temp);
 },
 getMassData$1: function(data) {
  data.set$mass(this.mass);
  var lc = this.sweep.localCenter;
  var t1 = this._inertia;
  if (typeof t1 !== 'number') return this.getMassData$1$bailout(1, data, t1, lc, 0, 0);
  var t2 = this.mass;
  if (typeof t2 !== 'number') return this.getMassData$1$bailout(2, data, t1, t2, lc, 0);
  var t3 = lc.get$lengthSquared();
  if (typeof t3 !== 'number') return this.getMassData$1$bailout(3, data, t1, t2, t3, lc);
  data.set$inertia(t1 + t2 * t3);
  var t4 = lc.get$x();
  data.get$center().set$x(t4);
  t4 = lc.get$y();
  data.get$center().set$y(t4);
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
      t2 = env2;
      lc = env3;
      break;
    case 3:
      data = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
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
      var t2 = this.mass;
    case 2:
      state = 0;
      var t3 = lc.get$lengthSquared();
    case 3:
      state = 0;
      data.set$inertia($.add(t1, $.mul(t2, t3)));
      var t4 = lc.get$x();
      data.get$center().set$x(t4);
      t4 = lc.get$y();
      data.get$center().set$y(t4);
  }
 },
 get$inertia: function() {
  return $.add(this._inertia, $.mul(this.mass, $.add($.mul(this.sweep.get$localCenter().get$x(), this.sweep.get$localCenter().get$x()), $.mul(this.sweep.get$localCenter().get$y(), this.sweep.get$localCenter().get$y()))));
 },
 set$angularVelocity: function(w) {
  if (!$.eqB(this._type, 0)) {
    $.gtB($.mul(w, w), 0) && this.set$awake(true);
    this._angularVelocity = w;
  }
 },
 get$angularVelocity: function() {
  return this._angularVelocity;
 },
 get$linearVelocity: function() {
  return this._linearVelocity;
 },
 get$localCenter: function() {
  return this.sweep.get$localCenter();
 },
 get$worldCenter: function() {
  return this.sweep.get$center();
 },
 get$angle: function() {
  return this.sweep.get$angle();
 },
 get$position: function() {
  return this.originTransform.get$position();
 },
 createFixtureFromShape$2: function(shape, density) {
  this._fixDef.set$shape(shape);
  this._fixDef.set$density(density);
  return this.createFixture$1(this._fixDef);
 },
 createFixtureFromShape$1: function(shape) {
  return this.createFixtureFromShape$2(shape,0)
},
 createFixture$1: function(def) {
  var fixture = $.Fixture$();
  fixture.create$2(this, def);
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.createFixture$1$bailout(1, t1, fixture, 0);
  (t1 & 32) === 32 && fixture.createProxy$2(this.world.get$_contactManager().get$broadPhase(), this.originTransform);
  fixture.next = this.fixtureList;
  this.fixtureList = fixture;
  t1 = this.fixtureCount;
  if (typeof t1 !== 'number') return this.createFixture$1$bailout(2, t1, fixture, 0);
  this.fixtureCount = t1 + 1;
  fixture.body = this;
  t1 = fixture.density;
  if (typeof t1 !== 'number') return this.createFixture$1$bailout(3, t1, fixture, 0);
  t1 > 0.0 && this.resetMassData$0();
  t1 = this.world;
  var t2 = t1.get$_flags();
  if (t2 !== (t2 | 0)) return this.createFixture$1$bailout(4, t2, fixture, t1);
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
      $.eqB($.and(t1, 32), 32) && fixture.createProxy$2(this.world.get$_contactManager().get$broadPhase(), this.originTransform);
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
      $.gtB(t1, 0.0) && this.resetMassData$0();
      t1 = this.world;
      var t2 = t1.get$_flags();
    case 4:
      state = 0;
      t1.set$_flags($.or(t2, 1));
      return fixture;
  }
 },
 next$0: function() { return this.next.$call$0(); },
 Body$2: function(bd, world) {
  if (bd.get$bullet() === true) this.flags = $.or(this.flags, 8);
  if (bd.get$fixedRotation() === true) this.flags = $.or(this.flags, 16);
  if (bd.get$allowSleep() === true) this.flags = $.or(this.flags, 4);
  if (bd.get$awake() === true) this.flags = $.or(this.flags, 2);
  if (bd.get$active() === true) this.flags = $.or(this.flags, 32);
  this.originTransform.get$position().setFrom$1(bd.get$position());
  this.originTransform.get$rotation().setAngle$1(bd.get$angle());
  this.sweep.get$localCenter().setZero$0();
  $.Transform_mulToOut(this.originTransform, this.sweep.get$localCenter(), this.sweep.get$centerZero());
  this.sweep.get$center().setFrom$1(this.sweep.get$centerZero());
  var t1 = bd.get$angle();
  this.sweep.set$angle(t1);
  t1 = bd.get$angle();
  this.sweep.set$angleZero(t1);
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
 ["active?", "awake=", "angularDamping?", "linearDamping?", "allowSleep?", "bullet?", "isSleeping", "fixedRotation?", "angularVelocity=", "linearVelocity?", "position?", "userData=", "angle=", "type="],
 super: "Object"
};

$$.ContactManager = {"":
 ["pool", "contactListener?", "contactFilter", "contactCount?", "contactList=", "broadPhase?"],
 super: "Object",
 collide$0: function() {
  var c = this.contactList;
  for (; !(c == null); ) {
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
      if (!(this.contactFilter === null) && $.eqB(this.contactFilter.shouldCollide$2(fixtureA, fixtureB), false)) {
        c0 = c.get$next();
        this.destroy$1(c);
        c = c0;
        continue;
      }
      c.set$flags($.and(c.get$flags(), -9));
    }
    var proxyIdA = fixtureA.get$proxy();
    var proxyIdB = fixtureB.get$proxy();
    if ($.eqB(this.broadPhase.testOverlap$2(proxyIdA, proxyIdB), false)) {
      c0 = c.get$next();
      this.destroy$1(c);
      c = c0;
      continue;
    }
    c.update$1(this.contactListener);
    c = c.get$next();
  }
 },
 destroy$1: function(c) {
  var fixtureA = c.get$fixtureA();
  var fixtureB = c.get$fixtureB();
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  !(this.contactListener == null) && c.get$touching() === true && this.contactListener.endContact$1(c);
  if (!(c.get$prev() == null)) {
    var t1 = c.get$next();
    c.get$prev().set$next(t1);
  }
  if (!(c.get$next() == null)) {
    t1 = c.get$prev();
    c.get$next().set$prev(t1);
  }
  if ($.eqB(c, this.contactList)) this.contactList = c.get$next();
  if (!(c.get$edge1().get$prev() == null)) {
    t1 = c.get$edge1().get$next();
    c.get$edge1().get$prev().set$next(t1);
  }
  if (!(c.get$edge1().get$next() == null)) {
    t1 = c.get$edge1().get$prev();
    c.get$edge1().get$next().set$prev(t1);
  }
  $.eqB(c.get$edge1(), bodyA.get$contactList()) && bodyA.set$contactList(c.get$edge1().get$next());
  if (!(c.get$edge2().get$prev() == null)) {
    t1 = c.get$edge2().get$next();
    c.get$edge2().get$prev().set$next(t1);
  }
  if (!(c.get$edge2().get$next() == null)) {
    t1 = c.get$edge2().get$prev();
    c.get$edge2().get$next().set$prev(t1);
  }
  $.eqB(c.get$edge2(), bodyB.get$contactList()) && bodyB.set$contactList(c.get$edge2().get$next());
  this.pool.pushContact$1(c);
  t1 = this.contactCount;
  if (typeof t1 !== 'number') return this.destroy$1$bailout(1, t1);
  this.contactCount = t1 - 1;
 },
 destroy$1$bailout: function(state, t1) {
  this.contactCount = $.sub(t1, 1);
 },
 findNewContacts$0: function() {
  this.broadPhase.updatePairs$1(this);
 },
 addPair$2: function(fixtureA, fixtureB) {
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  if (bodyA == null ? bodyB == null : bodyA === bodyB) return;
  var edge = bodyB.get$contactList();
  for (; !(edge == null); ) {
    if ($.eqB(edge.get$other(), bodyA)) {
      var fA = edge.get$contact().get$fixtureA();
      var fB = edge.get$contact().get$fixtureB();
      if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB)) return;
      if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA)) return;
    }
    edge = edge.get$next();
  }
  var t1 = bodyB.shouldCollide$1(bodyA);
  if (typeof t1 !== 'boolean') return this.addPair$2$bailout(1, fixtureA, fixtureB, t1);
  if (!t1) return;
  t1 = this.contactFilter.shouldCollide$2(fixtureA, fixtureB);
  if (typeof t1 !== 'boolean') return this.addPair$2$bailout(2, fixtureA, fixtureB, t1);
  t1 = !t1;
  if (t1) return;
  var c = this.pool.popContact$2(fixtureA, fixtureB);
  fixtureA = c.get$fixtureA();
  fixtureB = c.get$fixtureB();
  bodyA = fixtureA.get$body();
  bodyB = fixtureB.get$body();
  c.set$prev(null);
  c.set$next(this.contactList);
  !(this.contactList == null) && this.contactList.set$prev(c);
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
  if (typeof t1 !== 'number') return this.addPair$2$bailout(3, t1, 0, 0);
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
      if (bodyA == null ? bodyB == null : bodyA === bodyB) return;
      var edge = bodyB.get$contactList();
      for (; !(edge == null); ) {
        if ($.eqB(edge.get$other(), bodyA)) {
          var fA = edge.get$contact().get$fixtureA();
          var fB = edge.get$contact().get$fixtureB();
          if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB)) return;
          if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA)) return;
        }
        edge = edge.get$next();
      }
      var t1 = bodyB.shouldCollide$1(bodyA);
    case 1:
      state = 0;
      if ($.eqB(t1, false)) return;
    case 2:
      if (state == 2 || (state == 0 && !(this.contactFilter === null))) {
        switch (state) {
          case 0:
            t1 = this.contactFilter.shouldCollide$2(fixtureA, fixtureB);
          case 2:
            state = 0;
            t1 = $.eqB(t1, false);
        }
      } else {
        t1 = false;
      }
      if (t1) return;
      var c = this.pool.popContact$2(fixtureA, fixtureB);
      fixtureA = c.get$fixtureA();
      fixtureB = c.get$fixtureB();
      bodyA = fixtureA.get$body();
      bodyB = fixtureB.get$body();
      c.set$prev(null);
      c.set$next(this.contactList);
      !(this.contactList == null) && this.contactList.set$prev(c);
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
 }
};

$$.Filter = {"":
 ["groupIndex=", "maskBits=", "categoryBits="],
 super: "Object",
 setFrom$1: function(other) {
  this.categoryBits = other.get$categoryBits();
  this.maskBits = other.get$maskBits();
  this.groupIndex = other.get$groupIndex();
 }
};

$$.Fixture = {"":
 ["_poolTwo", "_poolOne", "userData=", "isSensor?", "filter?", "proxy?", "restitution=", "friction=", "shape=", "body?", "next=", "density=", "box?"],
 super: "Object",
 get$type: function() {
  return this.shape.get$type();
 },
 getMassData$1: function(massData) {
  this.shape.computeMass$2(massData, this.density);
 },
 synchronize$3: function(broadPhase, transformOne, transformTwo) {
  if (this.proxy == null) return;
  this.shape.computeAxisAlignedBox$2(this._poolOne, transformOne);
  this.shape.computeAxisAlignedBox$2(this._poolTwo, transformTwo);
  var t1 = this._poolOne.lowerBound.get$x();
  if (typeof t1 !== 'number') return this.synchronize$3$bailout(1, broadPhase, transformOne, transformTwo, t1, 0, 0);
  var t2 = this._poolTwo.lowerBound.get$x();
  if (typeof t2 !== 'number') return this.synchronize$3$bailout(2, broadPhase, transformOne, transformTwo, t2, t1, 0);
  t1 = t1 < t2 ? this._poolOne.lowerBound.get$x() : this._poolTwo.lowerBound.get$x();
  this.box.lowerBound.set$x(t1);
  t1 = this._poolOne.lowerBound.get$y();
  if (typeof t1 !== 'number') return this.synchronize$3$bailout(3, broadPhase, transformOne, transformTwo, t1, 0, 0);
  t2 = this._poolTwo.lowerBound.get$y();
  if (typeof t2 !== 'number') return this.synchronize$3$bailout(4, broadPhase, transformOne, transformTwo, t2, t1, 0);
  t1 = t1 < t2 ? this._poolOne.lowerBound.get$y() : this._poolTwo.lowerBound.get$y();
  this.box.lowerBound.set$y(t1);
  t1 = this._poolOne.upperBound.get$x();
  if (typeof t1 !== 'number') return this.synchronize$3$bailout(5, broadPhase, transformOne, transformTwo, t1, 0, 0);
  t2 = this._poolTwo.upperBound.get$x();
  if (typeof t2 !== 'number') return this.synchronize$3$bailout(6, broadPhase, transformOne, transformTwo, t2, t1, 0);
  t1 = t1 > t2 ? this._poolOne.upperBound.get$x() : this._poolTwo.upperBound.get$x();
  this.box.upperBound.set$x(t1);
  t1 = this._poolOne.upperBound.get$y();
  if (typeof t1 !== 'number') return this.synchronize$3$bailout(7, broadPhase, transformOne, transformTwo, t1, 0, 0);
  t2 = this._poolTwo.upperBound.get$y();
  if (typeof t2 !== 'number') return this.synchronize$3$bailout(8, broadPhase, transformOne, transformTwo, t1, t2, 0);
  t1 = t1 > t2 ? this._poolOne.upperBound.get$y() : this._poolTwo.upperBound.get$y();
  this.box.upperBound.set$y(t1);
  var disp = this._poolOne.lowerBound;
  t1 = transformTwo.get$position().get$x();
  if (typeof t1 !== 'number') return this.synchronize$3$bailout(9, broadPhase, disp, transformTwo, t1, transformOne, 0);
  t2 = transformOne.get$position().get$x();
  if (typeof t2 !== 'number') return this.synchronize$3$bailout(10, broadPhase, disp, transformTwo, t1, transformOne, t2);
  disp.set$x(t1 - t2);
  var t3 = transformTwo.get$position().get$y();
  if (typeof t3 !== 'number') return this.synchronize$3$bailout(11, broadPhase, disp, t3, transformOne, 0, 0);
  var t4 = transformOne.get$position().get$y();
  if (typeof t4 !== 'number') return this.synchronize$3$bailout(12, broadPhase, disp, t3, t4, 0, 0);
  disp.set$y(t3 - t4);
  broadPhase.moveProxy$3(this.proxy, this.box, disp);
 },
 synchronize$3$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var broadPhase = env0;
      var transformOne = env1;
      var transformTwo = env2;
      t1 = env3;
      break;
    case 2:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t2 = env3;
      t1 = env4;
      break;
    case 3:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t1 = env3;
      break;
    case 4:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t2 = env3;
      t1 = env4;
      break;
    case 5:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t1 = env3;
      break;
    case 6:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t2 = env3;
      t1 = env4;
      break;
    case 7:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t1 = env3;
      break;
    case 8:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 9:
      broadPhase = env0;
      disp = env1;
      transformTwo = env2;
      t1 = env3;
      transformOne = env4;
      break;
    case 10:
      broadPhase = env0;
      disp = env1;
      transformTwo = env2;
      t1 = env3;
      transformOne = env4;
      t2 = env5;
      break;
    case 11:
      broadPhase = env0;
      disp = env1;
      t3 = env2;
      transformOne = env3;
      break;
    case 12:
      broadPhase = env0;
      disp = env1;
      t3 = env2;
      t4 = env3;
      break;
  }
  switch (state) {
    case 0:
      if (this.proxy == null) return;
      this.shape.computeAxisAlignedBox$2(this._poolOne, transformOne);
      this.shape.computeAxisAlignedBox$2(this._poolTwo, transformTwo);
      var t1 = this._poolOne.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t2 = this._poolTwo.get$lowerBound().get$x();
    case 2:
      state = 0;
      t1 = $.ltB(t1, t2) ? this._poolOne.get$lowerBound().get$x() : this._poolTwo.get$lowerBound().get$x();
      this.box.get$lowerBound().set$x(t1);
      t1 = this._poolOne.get$lowerBound().get$y();
    case 3:
      state = 0;
      t2 = this._poolTwo.get$lowerBound().get$y();
    case 4:
      state = 0;
      t1 = $.ltB(t1, t2) ? this._poolOne.get$lowerBound().get$y() : this._poolTwo.get$lowerBound().get$y();
      this.box.get$lowerBound().set$y(t1);
      t1 = this._poolOne.get$upperBound().get$x();
    case 5:
      state = 0;
      t2 = this._poolTwo.get$upperBound().get$x();
    case 6:
      state = 0;
      t1 = $.gtB(t1, t2) ? this._poolOne.get$upperBound().get$x() : this._poolTwo.get$upperBound().get$x();
      this.box.get$upperBound().set$x(t1);
      t1 = this._poolOne.get$upperBound().get$y();
    case 7:
      state = 0;
      t2 = this._poolTwo.get$upperBound().get$y();
    case 8:
      state = 0;
      t1 = $.gtB(t1, t2) ? this._poolOne.get$upperBound().get$y() : this._poolTwo.get$upperBound().get$y();
      this.box.get$upperBound().set$y(t1);
      var disp = this._poolOne.get$lowerBound();
      t1 = transformTwo.get$position().get$x();
    case 9:
      state = 0;
      t2 = transformOne.get$position().get$x();
    case 10:
      state = 0;
      disp.set$x($.sub(t1, t2));
      var t3 = transformTwo.get$position().get$y();
    case 11:
      state = 0;
      var t4 = transformOne.get$position().get$y();
    case 12:
      state = 0;
      disp.set$y($.sub(t3, t4));
      broadPhase.moveProxy$3(this.proxy, this.box, disp);
  }
 },
 createProxy$2: function(broadPhase, xf) {
  this.shape.computeAxisAlignedBox$2(this.box, xf);
  this.proxy = broadPhase.createProxy$2(this.box, this);
 },
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
 filter$1: function(arg0) { return this.filter.$call$1(arg0); },
 next$0: function() { return this.next.$call$0(); }
};

$$.FixtureDef = {"":
 ["filter?", "isSensor?", "density=", "restitution=", "friction=", "userData=", "shape="],
 super: "Object",
 filter$1: function(arg0) { return this.filter.$call$1(arg0); },
 FixtureDef$0: function() {
  this.filter.set$categoryBits(1);
  this.filter.set$maskBits(65535);
  this.filter.set$groupIndex(0);
 }
};

$$.Island = {"":
 ["impulse", "_translation", "_contactSolver", "positionIterationCount", "jointCapacity", "contactCapacity", "bodyCapacity", "contactCount?", "jointCount", "bodyCount?", "velocities", "positions", "joints?", "contacts", "bodies?", "listener"],
 super: "Object",
 report$1: function(constraints) {
  if (typeof constraints !== 'string' && (typeof constraints !== 'object' || constraints === null || (constraints.constructor !== Array && !constraints.is$JavaScriptIndexingBehavior()))) return this.report$1$bailout(1, constraints);
  if (this.listener == null) return;
  for (var i = 0; $.ltB(i, this.contactCount); ++i) {
    var c = $.index(this.contacts, i);
    var t1 = constraints.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = constraints[i];
    for (var j = 0; $.ltB(j, t2.get$pointCount()); ++j) {
      $.indexSet(this.impulse.normalImpulses, j, $.index(t2.get$points(), j).get$normalImpulse());
      $.indexSet(this.impulse.tangentImpulses, j, $.index(t2.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, this.impulse);
  }
 },
 report$1$bailout: function(state, constraints) {
  if (this.listener == null) return;
  for (var i = 0; $.ltB(i, this.contactCount); ++i) {
    var c = $.index(this.contacts, i);
    var cc = $.index(constraints, i);
    for (var j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
      $.indexSet(this.impulse.get$normalImpulses(), j, $.index(cc.get$points(), j).get$normalImpulse());
      $.indexSet(this.impulse.get$tangentImpulses(), j, $.index(cc.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, this.impulse);
  }
 },
 addJoint$1: function(joint) {
  var t1 = this.joints;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.addJoint$1$bailout(1, joint, t1, 0);
  var t2 = this.jointCount;
  if (typeof t2 !== 'number') return this.addJoint$1$bailout(2, joint, t1, t2);
  this.jointCount = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t1[t2] = joint;
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
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.joints;
    case 1:
      state = 0;
      var t2 = this.jointCount;
    case 2:
      state = 0;
      this.jointCount = $.add(t2, 1);
      $.indexSet(t1, t2, joint);
  }
 },
 addContact$1: function(contact) {
  var t1 = this.contacts;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.addContact$1$bailout(1, contact, t1, 0);
  var t2 = this.contactCount;
  if (typeof t2 !== 'number') return this.addContact$1$bailout(2, contact, t1, t2);
  this.contactCount = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t1[t2] = contact;
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
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.contacts;
    case 1:
      state = 0;
      var t2 = this.contactCount;
    case 2:
      state = 0;
      this.contactCount = $.add(t2, 1);
      $.indexSet(t1, t2, contact);
  }
 },
 addBody$1: function(body) {
  body.set$islandIndex(this.bodyCount);
  var t1 = this.bodies;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.addBody$1$bailout(1, body, t1, 0);
  var t2 = this.bodyCount;
  if (typeof t2 !== 'number') return this.addBody$1$bailout(2, body, t1, t2);
  this.bodyCount = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t1[t2] = body;
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
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
      body.set$islandIndex(this.bodyCount);
      var t1 = this.bodies;
    case 1:
      state = 0;
      var t2 = this.bodyCount;
    case 2:
      state = 0;
      this.bodyCount = $.add(t2, 1);
      $.indexSet(t1, t2, body);
  }
 },
 solve$3: function(step, gravity, allowSleep) {
  var i = 0;
  while (true) {
    var t1 = this.bodyCount;
    if (typeof t1 !== 'number') return this.solve$3$bailout(1, step, gravity, allowSleep, t1, i, 0, 0, 0, 0);
    if (!(i < t1)) break;
    c$0:{
      t1 = this.bodies;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(2, step, gravity, allowSleep, i, t1, 0, 0, 0, 0);
      var t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t1 = t1[i];
      t2 = t1.get$type();
      if (typeof t2 !== 'number') return this.solve$3$bailout(3, step, gravity, allowSleep, t1, t2, i, 0, 0, 0);
      if (!(t2 === 2)) break c$0;
      t2 = t1.get$_force().get$x();
      if (typeof t2 !== 'number') return this.solve$3$bailout(4, step, gravity, allowSleep, t2, t1, i, 0, 0, 0);
      var t3 = t1.get$invMass();
      if (typeof t3 !== 'number') return this.solve$3$bailout(5, step, gravity, allowSleep, t2, t3, t1, i, 0, 0);
      t3 *= t2;
      t2 = gravity.get$x();
      if (typeof t2 !== 'number') return this.solve$3$bailout(6, step, gravity, allowSleep, t1, t3, t2, i, 0, 0);
      t2 += t3;
      t3 = step.get$dt();
      if (typeof t3 !== 'number') return this.solve$3$bailout(7, step, gravity, allowSleep, t1, i, t2, t3, 0, 0);
      t3 *= t2;
      t2 = t1.get$_force().get$y();
      if (typeof t2 !== 'number') return this.solve$3$bailout(8, step, gravity, allowSleep, t2, t1, i, t3, 0, 0);
      var t4 = t1.get$invMass();
      if (typeof t4 !== 'number') return this.solve$3$bailout(9, step, gravity, t4, t2, allowSleep, t1, i, t3, 0);
      t4 *= t2;
      t2 = gravity.get$y();
      if (typeof t2 !== 'number') return this.solve$3$bailout(10, step, gravity, allowSleep, t4, t2, t1, i, t3, 0);
      t2 += t4;
      t4 = step.get$dt();
      if (typeof t4 !== 'number') return this.solve$3$bailout(11, step, gravity, allowSleep, t2, t4, t1, i, t3, 0);
      var velocityDelta = $.Vector$(t3, t2 * t4);
      t1.get$linearVelocity().addLocal$1(velocityDelta);
      t3 = t1.get$angularVelocity();
      if (typeof t3 !== 'number') return this.solve$3$bailout(12, step, gravity, allowSleep, t1, i, t3, 0, 0, 0);
      var t5 = step.get$dt();
      if (typeof t5 !== 'number') return this.solve$3$bailout(13, step, gravity, allowSleep, t1, i, t3, t5, 0, 0);
      var t6 = t1.get$invInertia();
      if (typeof t6 !== 'number') return this.solve$3$bailout(14, step, gravity, allowSleep, t1, i, t3, t5, t6, 0);
      t6 *= t5;
      t5 = t1.get$_torque();
      if (typeof t5 !== 'number') return this.solve$3$bailout(15, step, t6, t5, allowSleep, gravity, t1, i, t3, 0);
      t1.set$angularVelocity(t3 + t6 * t5);
      var t7 = step.get$dt();
      if (typeof t7 !== 'number') return this.solve$3$bailout(16, step, gravity, allowSleep, t1, t7, i, 0, 0, 0);
      var t8 = t1.get$linearDamping();
      if (typeof t8 !== 'number') return this.solve$3$bailout(17, step, gravity, allowSleep, t1, t7, t8, i, 0, 0);
      var a = 1.0 - t7 * t8;
      t2 = a < 1.0;
      if (0.0 > (t2 ? a : 1.0)) var a1 = 0.0;
      else {
        a1 = t2 ? a : 1.0;
      }
      t1.get$linearVelocity().mulLocal$1(a1);
      t2 = step.get$dt();
      if (typeof t2 !== 'number') return this.solve$3$bailout(18, step, gravity, allowSleep, t1, t2, i, 0, 0, 0);
      t3 = t1.get$angularDamping();
      if (typeof t3 !== 'number') return this.solve$3$bailout(19, step, gravity, allowSleep, t1, t2, i, t3, 0, 0);
      var a2 = 1.0 - t2 * t3;
      var b1 = a2 < 1.0 ? a2 : 1.0;
      t2 = t1.get$angularVelocity();
      if (typeof t2 !== 'number') return this.solve$3$bailout(20, step, gravity, allowSleep, b1, t2, t1, i, 0, 0);
      t1.set$angularVelocity(t2 * (0.0 > b1 ? 0.0 : b1));
    }
    ++i;
  }
  var i1 = -1;
  var i2 = 0;
  while (true) {
    t1 = this.contactCount;
    if (typeof t1 !== 'number') return this.solve$3$bailout(21, step, allowSleep, i1, i2, t1, 0, 0, 0, 0);
    if (!(i2 < t1)) break;
    t1 = this.contacts;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(22, step, t1, allowSleep, i1, i2, 0, 0, 0, 0);
    t2 = t1.length;
    if (i2 < 0 || i2 >= t2) throw $.ioore(i2);
    var fixtureA = t1[i2].get$fixtureA();
    t3 = this.contacts;
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(23, step, allowSleep, i1, fixtureA, i2, t3, 0, 0, 0);
    t4 = t3.length;
    if (i2 < 0 || i2 >= t4) throw $.ioore(i2);
    var fixtureB = t3[i2].get$fixtureB();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    t1 = bodyA.get$type();
    if (typeof t1 !== 'number') return this.solve$3$bailout(24, step, allowSleep, i1, i2, bodyB, t1, 0, 0, 0);
    if (!(t1 === 0)) {
      t1 = bodyB.get$type();
      if (typeof t1 !== 'number') return this.solve$3$bailout(25, step, allowSleep, i1, t1, i2, 0, 0, 0, 0);
      var nonStatic = !(t1 === 0);
    } else nonStatic = false;
    if (nonStatic) {
      ++i1;
      t1 = this.contacts;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(26, step, allowSleep, i1, t1, i2, 0, 0, 0, 0);
      t2 = t1.length;
      if (i1 < 0 || i1 >= t2) throw $.ioore(i1);
      t1 = t1[i1];
      t3 = this.contacts;
      if (typeof t3 !== 'object' || t3 === null || ((t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())) return this.solve$3$bailout(27, step, allowSleep, i1, t1, i2, t3, 0, 0, 0);
      t4 = this.contacts;
      if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || (t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(28, step, allowSleep, i1, t1, i2, t3, t4, 0, 0);
      t5 = t4.length;
      if (i2 < 0 || i2 >= t5) throw $.ioore(i2);
      t4 = t4[i2];
      t6 = t3.length;
      if (i1 < 0 || i1 >= t6) throw $.ioore(i1);
      t3[i1] = t4;
      t4 = this.contacts;
      if (typeof t4 !== 'object' || t4 === null || ((t4.constructor !== Array || !!t4.immutable$list) && !t4.is$JavaScriptIndexingBehavior())) return this.solve$3$bailout(29, step, allowSleep, i1, t1, i2, t4, 0, 0, 0);
      t3 = t4.length;
      if (i2 < 0 || i2 >= t3) throw $.ioore(i2);
      t4[i2] = t1;
    }
    ++i2;
  }
  this._contactSolver.init$3(this.contacts, this.contactCount, step.get$dtRatio());
  this._contactSolver.warmStart$0();
  i = 0;
  while (true) {
    t1 = this.jointCount;
    if (typeof t1 !== 'number') return this.solve$3$bailout(30, step, i, allowSleep, t1, 0, 0, 0, 0, 0);
    if (!(i < t1)) break;
    t1 = this.joints;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(31, step, i, allowSleep, t1, 0, 0, 0, 0, 0);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1[i].initVelocityConstraints$1(step);
    ++i;
  }
  i = 0;
  while (true) {
    t1 = step.get$velocityIterations();
    if (typeof t1 !== 'number') return this.solve$3$bailout(32, step, i, allowSleep, t1, 0, 0, 0, 0, 0);
    if (!(i < t1)) break;
    var j = 0;
    while (true) {
      t1 = this.jointCount;
      if (typeof t1 !== 'number') return this.solve$3$bailout(33, step, i, allowSleep, j, t1, 0, 0, 0, 0);
      if (!(j < t1)) break;
      t1 = this.joints;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(34, step, i, allowSleep, j, t1, 0, 0, 0, 0);
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      t1[j].solveVelocityConstraints$1(step);
      ++j;
    }
    this._contactSolver.solveVelocityConstraints$0();
    ++i;
  }
  this._contactSolver.storeImpulses$0();
  var temp = $.Vector$(0, 0);
  i = 0;
  while (true) {
    t1 = this.bodyCount;
    if (typeof t1 !== 'number') return this.solve$3$bailout(35, step, allowSleep, t1, i, temp, 0, 0, 0, 0);
    if (!(i < t1)) break;
    c$0:{
      t1 = this.bodies;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(36, step, allowSleep, i, t1, temp, 0, 0, 0, 0);
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t1 = t1[i];
      t2 = t1.get$type();
      if (typeof t2 !== 'number') return this.solve$3$bailout(37, step, allowSleep, t1, t2, i, temp, 0, 0, 0);
      if (t2 === 0) break c$0;
      this._translation.setFrom$1(t1.get$linearVelocity());
      this._translation.mulLocal$1(step.get$dt());
      t2 = $.Vector_dot(this._translation, this._translation);
      if (typeof t2 !== 'number') return this.solve$3$bailout(38, step, allowSleep, t1, t2, i, temp, 0, 0, 0);
      if (t2 > 4.0) {
        t2 = $.get$length(this._translation);
        if (typeof t2 !== 'number') throw $.iae(t2);
        var ratio = 2.0 / t2;
        t1.get$linearVelocity().mulLocal$1(ratio);
      }
      t2 = step.get$dt();
      if (typeof t2 !== 'number') return this.solve$3$bailout(39, step, allowSleep, t1, t2, i, temp, 0, 0, 0);
      t3 = t1.get$angularVelocity();
      if (typeof t3 !== 'number') return this.solve$3$bailout(40, step, allowSleep, t1, t2, t3, i, temp, 0, 0);
      var rotation = t2 * t3;
      if (rotation * rotation > 2.4674011002723395) {
        t2 = $.abs(rotation);
        if (typeof t2 !== 'number') throw $.iae(t2);
        ratio = 1.5707963267948966 / t2;
        t2 = t1.get$angularVelocity();
        if (typeof t2 !== 'number') return this.solve$3$bailout(41, step, allowSleep, t1, ratio, t2, i, temp, 0, 0);
        t1.set$angularVelocity(t2 * ratio);
      }
      t1.get$sweep().get$centerZero().setFrom$1(t1.get$sweep().get$center());
      t2 = t1.get$sweep().get$angle();
      t1.get$sweep().set$angleZero(t2);
      temp.setFrom$1(t1.get$linearVelocity());
      temp.mulLocal$1(step.get$dt());
      t1.get$sweep().get$center().addLocal$1(temp);
      t2 = t1.get$sweep();
      t3 = t2.get$angle();
      if (typeof t3 !== 'number') return this.solve$3$bailout(42, t3, step, allowSleep, t1, i, temp, t2, 0, 0);
      t4 = step.get$dt();
      if (typeof t4 !== 'number') return this.solve$3$bailout(43, t3, t4, allowSleep, step, t1, i, temp, t2, 0);
      t5 = t1.get$angularVelocity();
      if (typeof t5 !== 'number') return this.solve$3$bailout(44, t3, t4, t5, step, t1, allowSleep, i, temp, t2);
      t2.set$angle(t3 + t4 * t5);
      t1.synchronizeTransform$0();
    }
    ++i;
  }
  i = 0;
  while (true) {
    t1 = step.get$positionIterations();
    if (typeof t1 !== 'number') return this.solve$3$bailout(45, step, allowSleep, i, t1, 0, 0, 0, 0, 0);
    if (!(i < t1)) break;
    var contactsOkay = this._contactSolver.solvePositionConstraints$1(0.2);
    j = 0;
    var jointsOkay = true;
    while (true) {
      t1 = this.jointCount;
      if (typeof t1 !== 'number') return this.solve$3$bailout(46, step, contactsOkay, allowSleep, j, t1, i, jointsOkay, 0, 0);
      if (!(j < t1)) break;
      t1 = this.joints;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(47, step, contactsOkay, t1, allowSleep, j, i, jointsOkay, 0, 0);
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      var jointOkay = t1[j].solvePositionConstraints$1(0.2);
      jointsOkay = jointsOkay && jointOkay === true;
      ++j;
    }
    if (contactsOkay === true && jointsOkay) break;
    ++i;
  }
  this.report$1(this._contactSolver.constraints);
  if (allowSleep === true) {
    var minSleepTime = 99999999999999.0;
    i = 0;
    while (true) {
      t1 = this.bodyCount;
      if (typeof t1 !== 'number') return this.solve$3$bailout(48, i, step, t1, minSleepTime, 0, 0, 0, 0, 0);
      if (!(i < t1)) break;
      c$0:{
        t1 = this.bodies;
        if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(49, i, step, t1, minSleepTime, 0, 0, 0, 0, 0);
        t2 = t1.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        t1 = t1[i];
        t2 = t1.get$type();
        if (typeof t2 !== 'number') return this.solve$3$bailout(50, i, step, t1, minSleepTime, t2, 0, 0, 0, 0);
        if (t2 === 0) break c$0;
        t2 = t1.get$flags();
        if (t2 !== (t2 | 0)) return this.solve$3$bailout(51, i, step, t2, t1, minSleepTime, 0, 0, 0, 0);
        if ((t2 & 4) === 0) {
          t1.set$sleepTime(0.0);
          minSleepTime = 0.0;
        }
        t2 = t1.get$flags();
        if (t2 !== (t2 | 0)) return this.solve$3$bailout(52, i, step, minSleepTime, t2, t1, 0, 0, 0, 0);
        if (!((t2 & 4) === 0)) {
          t2 = t1.get$angularVelocity();
          if (typeof t2 !== 'number') return this.solve$3$bailout(53, i, step, minSleepTime, t1, t2, 0, 0, 0, 0);
          t3 = t1.get$angularVelocity();
          if (typeof t3 !== 'number') return this.solve$3$bailout(54, i, step, minSleepTime, t3, t1, t2, 0, 0, 0);
          if (!(t2 * t3 > 0.0012184696791468343)) {
            t2 = $.Vector_dot(t1.get$linearVelocity(), t1.get$linearVelocity());
            if (typeof t2 !== 'number') return this.solve$3$bailout(55, i, step, minSleepTime, t2, t1, 0, 0, 0, 0);
            t2 = t2 > 0.0001;
          } else t2 = true;
        } else t2 = true;
        if (t2) {
          t1.set$sleepTime(0.0);
          minSleepTime = 0.0;
        } else {
          t2 = t1.get$sleepTime();
          if (typeof t2 !== 'number') return this.solve$3$bailout(56, i, step, minSleepTime, t2, t1, 0, 0, 0, 0);
          t3 = step.get$dt();
          if (typeof t3 !== 'number') return this.solve$3$bailout(57, i, step, minSleepTime, t2, t3, t1, 0, 0, 0);
          t1.set$sleepTime(t2 + t3);
          minSleepTime = $.Math_min(minSleepTime, t1.get$sleepTime());
          if (typeof minSleepTime !== 'number') return this.solve$3$bailout(58, i, step, minSleepTime, 0, 0, 0, 0, 0, 0);
        }
      }
      ++i;
    }
    if (minSleepTime >= 0.5) {
      i = 0;
      while (true) {
        t1 = this.bodyCount;
        if (typeof t1 !== 'number') return this.solve$3$bailout(59, i, t1, 0, 0, 0, 0, 0, 0, 0);
        if (!(i < t1)) break;
        t1 = this.bodies;
        if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.solve$3$bailout(60, i, t1, 0, 0, 0, 0, 0, 0, 0);
        t2 = t1.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        t1[i].set$awake(false);
        ++i;
      }
    }
  }
 },
 solve$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
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
      t2 = env4;
      b = env5;
      i = env6;
      break;
    case 6:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t2 = env4;
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
      t2 = env6;
      break;
    case 8:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      b = env4;
      i = env5;
      t2 = env6;
      break;
    case 9:
      step = env0;
      gravity = env1;
      t3 = env2;
      t1 = env3;
      allowSleep = env4;
      b = env5;
      i = env6;
      t2 = env7;
      break;
    case 10:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t3 = env3;
      t1 = env4;
      b = env5;
      i = env6;
      t2 = env7;
      break;
    case 11:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      t3 = env4;
      b = env5;
      i = env6;
      t2 = env7;
      break;
    case 12:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t2 = env5;
      break;
    case 13:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t2 = env5;
      t4 = env6;
      break;
    case 14:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t2 = env5;
      t4 = env6;
      t5 = env7;
      break;
    case 15:
      step = env0;
      t5 = env1;
      t4 = env2;
      allowSleep = env3;
      gravity = env4;
      b = env5;
      i = env6;
      t2 = env7;
      break;
    case 16:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t6 = env4;
      i = env5;
      break;
    case 17:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t6 = env4;
      t7 = env5;
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
      t2 = env6;
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
      allowSleep = env1;
      i1 = env2;
      fixtureA = env3;
      i2 = env4;
      t2 = env5;
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
      i2 = env4;
      t1 = env5;
      break;
    case 28:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      temp = env3;
      i2 = env4;
      t1 = env5;
      t2 = env6;
      break;
    case 29:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      temp = env3;
      i2 = env4;
      t1 = env5;
      break;
    case 30:
      step = env0;
      i = env1;
      allowSleep = env2;
      t1 = env3;
      break;
    case 31:
      step = env0;
      i = env1;
      allowSleep = env2;
      t1 = env3;
      break;
    case 32:
      step = env0;
      i = env1;
      allowSleep = env2;
      t1 = env3;
      break;
    case 33:
      step = env0;
      i = env1;
      allowSleep = env2;
      j = env3;
      t1 = env4;
      break;
    case 34:
      step = env0;
      i = env1;
      allowSleep = env2;
      j = env3;
      t1 = env4;
      break;
    case 35:
      step = env0;
      allowSleep = env1;
      t1 = env2;
      i = env3;
      temp = env4;
      break;
    case 36:
      step = env0;
      allowSleep = env1;
      i = env2;
      t1 = env3;
      temp = env4;
      break;
    case 37:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      i = env4;
      temp = env5;
      break;
    case 38:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      i = env4;
      temp = env5;
      break;
    case 39:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      i = env4;
      temp = env5;
      break;
    case 40:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      t2 = env4;
      i = env5;
      temp = env6;
      break;
    case 41:
      step = env0;
      allowSleep = env1;
      b = env2;
      ratio = env3;
      t1 = env4;
      i = env5;
      temp = env6;
      break;
    case 42:
      t2 = env0;
      step = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      temp = env5;
      t1 = env6;
      break;
    case 43:
      t2 = env0;
      t3 = env1;
      allowSleep = env2;
      step = env3;
      b = env4;
      i = env5;
      temp = env6;
      t1 = env7;
      break;
    case 44:
      t2 = env0;
      t3 = env1;
      t4 = env2;
      step = env3;
      b = env4;
      allowSleep = env5;
      i = env6;
      temp = env7;
      t1 = env8;
      break;
    case 45:
      step = env0;
      allowSleep = env1;
      i = env2;
      t1 = env3;
      break;
    case 46:
      step = env0;
      contactsOkay = env1;
      allowSleep = env2;
      j = env3;
      t1 = env4;
      i = env5;
      jointsOkay = env6;
      break;
    case 47:
      step = env0;
      contactsOkay = env1;
      t1 = env2;
      allowSleep = env3;
      j = env4;
      i = env5;
      jointsOkay = env6;
      break;
    case 48:
      i = env0;
      step = env1;
      t1 = env2;
      minSleepTime = env3;
      break;
    case 49:
      i = env0;
      step = env1;
      t1 = env2;
      minSleepTime = env3;
      break;
    case 50:
      i = env0;
      step = env1;
      b = env2;
      minSleepTime = env3;
      t1 = env4;
      break;
    case 51:
      i = env0;
      step = env1;
      t1 = env2;
      b = env3;
      minSleepTime = env4;
      break;
    case 52:
      i = env0;
      step = env1;
      minSleepTime = env2;
      t1 = env3;
      b = env4;
      break;
    case 53:
      i = env0;
      step = env1;
      minSleepTime = env2;
      b = env3;
      t1 = env4;
      break;
    case 54:
      i = env0;
      step = env1;
      minSleepTime = env2;
      t2 = env3;
      b = env4;
      t1 = env5;
      break;
    case 55:
      i = env0;
      step = env1;
      minSleepTime = env2;
      t1 = env3;
      b = env4;
      break;
    case 56:
      i = env0;
      step = env1;
      minSleepTime = env2;
      t1 = env3;
      b = env4;
      break;
    case 57:
      i = env0;
      step = env1;
      minSleepTime = env2;
      t1 = env3;
      t2 = env4;
      b = env5;
      break;
    case 58:
      i = env0;
      step = env1;
      minSleepTime = env2;
      break;
    case 59:
      i = env0;
      t1 = env1;
      break;
    case 60:
      i = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = this.bodyCount;
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
            c$0:{
              switch (state) {
                case 0:
                  t1 = this.bodies;
                case 2:
                  state = 0;
                  var b = $.index(t1, i);
                  t1 = b.get$type();
                case 3:
                  state = 0;
                  if (!$.eqB(t1, 2)) break c$0;
                  t1 = b.get$_force().get$x();
                case 4:
                  state = 0;
                  var t2 = b.get$invMass();
                case 5:
                  state = 0;
                  t2 = $.mul(t1, t2);
                  t1 = gravity.get$x();
                case 6:
                  state = 0;
                  t1 = $.add(t2, t1);
                  t2 = step.get$dt();
                case 7:
                  state = 0;
                  t2 = $.mul(t1, t2);
                  t1 = b.get$_force().get$y();
                case 8:
                  state = 0;
                  var t3 = b.get$invMass();
                case 9:
                  state = 0;
                  t3 = $.mul(t1, t3);
                  t1 = gravity.get$y();
                case 10:
                  state = 0;
                  t1 = $.add(t3, t1);
                  t3 = step.get$dt();
                case 11:
                  state = 0;
                  var velocityDelta = $.Vector$(t2, $.mul(t1, t3));
                  b.get$linearVelocity().addLocal$1(velocityDelta);
                  t2 = b.get$angularVelocity();
                case 12:
                  state = 0;
                  var t4 = step.get$dt();
                case 13:
                  state = 0;
                  var t5 = b.get$invInertia();
                case 14:
                  state = 0;
                  t5 = $.mul(t4, t5);
                  t4 = b.get$_torque();
                case 15:
                  state = 0;
                  b.set$angularVelocity($.add(t2, $.mul(t5, t4)));
                  var t6 = step.get$dt();
                case 16:
                  state = 0;
                  var t7 = b.get$linearDamping();
                case 17:
                  state = 0;
                  t7 = $.mul(t6, t7);
                  if (typeof t7 !== 'number') throw $.iae(t7);
                  var a = 1.0 - t7;
                  t1 = a < 1.0;
                  if (0.0 > (t1 ? a : 1.0)) var a1 = 0.0;
                  else {
                    a1 = t1 ? a : 1.0;
                  }
                  b.get$linearVelocity().mulLocal$1(a1);
                  t1 = step.get$dt();
                case 18:
                  state = 0;
                  t2 = b.get$angularDamping();
                case 19:
                  state = 0;
                  t2 = $.mul(t1, t2);
                  if (typeof t2 !== 'number') throw $.iae(t2);
                  var a2 = 1.0 - t2;
                  var b1 = a2 < 1.0 ? a2 : 1.0;
                  t1 = b.get$angularVelocity();
                case 20:
                  state = 0;
                  b.set$angularVelocity($.mul(t1, 0.0 > b1 ? 0.0 : b1));
              }
            }
            ++i;
        }
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
    case 29:
      L1: while (true) {
        switch (state) {
          case 0:
            t1 = this.contactCount;
          case 21:
            state = 0;
            if (!$.ltB(i2, t1)) break L1;
            t1 = this.contacts;
          case 22:
            state = 0;
            var fixtureA = $.index(t1, i2).get$fixtureA();
            t2 = this.contacts;
          case 23:
            state = 0;
            var fixtureB = $.index(t2, i2).get$fixtureB();
            var bodyA = fixtureA.get$body();
            var bodyB = fixtureB.get$body();
            t1 = bodyA.get$type();
          case 24:
            state = 0;
          case 25:
            if (state == 25 || (state == 0 && !$.eqB(t1, 0))) {
              switch (state) {
                case 0:
                  t1 = bodyB.get$type();
                case 25:
                  state = 0;
                  var nonStatic = !$.eqB(t1, 0);
              }
            } else {
              nonStatic = false;
            }
          case 26:
          case 27:
          case 28:
          case 29:
            if (state == 26 || state == 27 || state == 28 || state == 29 || (state == 0 && nonStatic)) {
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
                  t2 = this.contacts;
                case 28:
                  state = 0;
                  $.indexSet(t1, i1, $.index(t2, i2));
                  t1 = this.contacts;
                case 29:
                  state = 0;
                  $.indexSet(t1, i2, temp);
              }
            }
            ++i2;
        }
      }
      this._contactSolver.init$3(this.contacts, this.contactCount, step.get$dtRatio());
      this._contactSolver.warmStart$0();
      i = 0;
    case 30:
    case 31:
      L2: while (true) {
        switch (state) {
          case 0:
            t1 = this.jointCount;
          case 30:
            state = 0;
            if (!$.ltB(i, t1)) break L2;
            t1 = this.joints;
          case 31:
            state = 0;
            $.index(t1, i).initVelocityConstraints$1(step);
            ++i;
        }
      }
      i = 0;
    case 32:
    case 33:
    case 34:
      L3: while (true) {
        switch (state) {
          case 0:
            t1 = step.get$velocityIterations();
          case 32:
            state = 0;
            if (!$.ltB(i, t1)) break L3;
            var j = 0;
          case 33:
          case 34:
            L4: while (true) {
              switch (state) {
                case 0:
                  t1 = this.jointCount;
                case 33:
                  state = 0;
                  if (!$.ltB(j, t1)) break L4;
                  t1 = this.joints;
                case 34:
                  state = 0;
                  $.index(t1, j).solveVelocityConstraints$1(step);
                  ++j;
              }
            }
            this._contactSolver.solveVelocityConstraints$0();
            ++i;
        }
      }
      this._contactSolver.storeImpulses$0();
      temp = $.Vector$(0, 0);
      i = 0;
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
      L5: while (true) {
        switch (state) {
          case 0:
            t1 = this.bodyCount;
          case 35:
            state = 0;
            if (!$.ltB(i, t1)) break L5;
          case 36:
          case 37:
          case 38:
          case 39:
          case 40:
          case 41:
          case 42:
          case 43:
          case 44:
            c$0:{
              switch (state) {
                case 0:
                  t1 = this.bodies;
                case 36:
                  state = 0;
                  b = $.index(t1, i);
                  t1 = b.get$type();
                case 37:
                  state = 0;
                  if ($.eqB(t1, 0)) break c$0;
                  this._translation.setFrom$1(b.get$linearVelocity());
                  this._translation.mulLocal$1(step.get$dt());
                  t1 = $.Vector_dot(this._translation, this._translation);
                case 38:
                  state = 0;
                  if ($.gtB(t1, 4.0)) {
                    t1 = $.get$length(this._translation);
                    if (typeof t1 !== 'number') throw $.iae(t1);
                    var ratio = 2.0 / t1;
                    b.get$linearVelocity().mulLocal$1(ratio);
                  }
                  t1 = step.get$dt();
                case 39:
                  state = 0;
                  t2 = b.get$angularVelocity();
                case 40:
                  state = 0;
                  var rotation = $.mul(t1, t2);
                case 41:
                  if (state == 41 || (state == 0 && $.gtB($.mul(rotation, rotation), 2.4674011002723395))) {
                    switch (state) {
                      case 0:
                        t1 = $.abs(rotation);
                        if (typeof t1 !== 'number') throw $.iae(t1);
                        ratio = 1.5707963267948966 / t1;
                        t1 = b.get$angularVelocity();
                      case 41:
                        state = 0;
                        b.set$angularVelocity($.mul(t1, ratio));
                    }
                  }
                  b.get$sweep().get$centerZero().setFrom$1(b.get$sweep().get$center());
                  t1 = b.get$sweep().get$angle();
                  b.get$sweep().set$angleZero(t1);
                  temp.setFrom$1(b.get$linearVelocity());
                  temp.mulLocal$1(step.get$dt());
                  b.get$sweep().get$center().addLocal$1(temp);
                  t1 = b.get$sweep();
                  t2 = t1.get$angle();
                case 42:
                  state = 0;
                  t3 = step.get$dt();
                case 43:
                  state = 0;
                  t4 = b.get$angularVelocity();
                case 44:
                  state = 0;
                  t1.set$angle($.add(t2, $.mul(t3, t4)));
                  b.synchronizeTransform$0();
              }
            }
            ++i;
        }
      }
      i = 0;
    case 45:
    case 46:
    case 47:
      L6: while (true) {
        switch (state) {
          case 0:
            t1 = step.get$positionIterations();
          case 45:
            state = 0;
            if (!$.ltB(i, t1)) break L6;
            var contactsOkay = this._contactSolver.solvePositionConstraints$1(0.2);
            j = 0;
            var jointsOkay = true;
          case 46:
          case 47:
            L7: while (true) {
              switch (state) {
                case 0:
                  t1 = this.jointCount;
                case 46:
                  state = 0;
                  if (!$.ltB(j, t1)) break L7;
                  t1 = this.joints;
                case 47:
                  state = 0;
                  var jointOkay = $.index(t1, j).solvePositionConstraints$1(0.2);
                  jointsOkay = jointsOkay && jointOkay === true;
                  ++j;
              }
            }
            if (contactsOkay === true && jointsOkay) break L6;
            ++i;
        }
      }
      this.report$1(this._contactSolver.get$constraints());
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
      if (state == 48 || state == 49 || state == 50 || state == 51 || state == 52 || state == 53 || state == 54 || state == 55 || state == 56 || state == 57 || state == 58 || state == 59 || state == 60 || (state == 0 && allowSleep === true)) {
        switch (state) {
          case 0:
            var minSleepTime = 99999999999999.0;
            i = 0;
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
            L8: while (true) {
              switch (state) {
                case 0:
                  t1 = this.bodyCount;
                case 48:
                  state = 0;
                  if (!$.ltB(i, t1)) break L8;
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
                  c$0:{
                    switch (state) {
                      case 0:
                        t1 = this.bodies;
                      case 49:
                        state = 0;
                        b = $.index(t1, i);
                        t1 = b.get$type();
                      case 50:
                        state = 0;
                        if ($.eqB(t1, 0)) break c$0;
                        t1 = b.get$flags();
                      case 51:
                        state = 0;
                        if ($.eqB($.and(t1, 4), 0)) {
                          b.set$sleepTime(0.0);
                          minSleepTime = 0.0;
                        }
                        t1 = b.get$flags();
                      case 52:
                        state = 0;
                      case 53:
                      case 54:
                      case 55:
                        if (state == 53 || state == 54 || state == 55 || (state == 0 && !$.eqB($.and(t1, 4), 0))) {
                          switch (state) {
                            case 0:
                              t1 = b.get$angularVelocity();
                            case 53:
                              state = 0;
                              t2 = b.get$angularVelocity();
                            case 54:
                              state = 0;
                            case 55:
                              if (state == 55 || (state == 0 && !$.gtB($.mul(t1, t2), 0.0012184696791468343))) {
                                switch (state) {
                                  case 0:
                                    t1 = $.Vector_dot(b.get$linearVelocity(), b.get$linearVelocity());
                                  case 55:
                                    state = 0;
                                    t1 = $.gtB(t1, 0.0001);
                                }
                              } else {
                                t1 = true;
                              }
                          }
                        } else {
                          t1 = true;
                        }
                      case 56:
                      case 57:
                      case 58:
                        if ((state == 0 && t1)) {
                          b.set$sleepTime(0.0);
                          minSleepTime = 0.0;
                        } else {
                          switch (state) {
                            case 0:
                              t1 = b.get$sleepTime();
                            case 56:
                              state = 0;
                              t2 = step.get$dt();
                            case 57:
                              state = 0;
                              b.set$sleepTime($.add(t1, t2));
                              minSleepTime = $.Math_min(minSleepTime, b.get$sleepTime());
                            case 58:
                              state = 0;
                          }
                        }
                    }
                  }
                  ++i;
              }
            }
          case 59:
          case 60:
            if (state == 59 || state == 60 || (state == 0 && $.geB(minSleepTime, 0.5))) {
              switch (state) {
                case 0:
                  i = 0;
                case 59:
                case 60:
                  L9: while (true) {
                    switch (state) {
                      case 0:
                        t1 = this.bodyCount;
                      case 59:
                        state = 0;
                        if (!$.ltB(i, t1)) break L9;
                        t1 = this.bodies;
                      case 60:
                        state = 0;
                        $.index(t1, i).set$awake(false);
                        ++i;
                    }
                  }
              }
            }
        }
      }
  }
 },
 clear$0: function() {
  this.bodyCount = 0;
  this.contactCount = 0;
  this.jointCount = 0;
 },
 init$4: function(argBodyCapacity, argContactCapacity, argJointCapacity, argListener) {
  this.bodyCapacity = argBodyCapacity;
  this.contactCapacity = argContactCapacity;
  this.jointCapacity = argJointCapacity;
  this.bodyCount = 0;
  this.contactCount = 0;
  this.listener = argListener;
  if (this.bodies == null || $.gtB(this.bodyCapacity, $.get$length(this.bodies))) {
    var t1 = $.ListFactory_List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
    this.bodies = t1;
  }
  if (this.contacts == null || $.gtB(this.contactCapacity, $.get$length(this.contacts))) {
    t1 = $.ListFactory_List(this.contactCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
    this.contacts = t1;
  }
  if (this.joints == null || $.gtB(this.jointCapacity, $.get$length(this.joints))) {
    t1 = $.ListFactory_List(this.jointCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Joint'}));
    this.joints = t1;
  }
  if (this.velocities == null || $.gtB(this.bodyCapacity, $.get$length(this.velocities))) {
    if (this.velocities == null) {
      var old = $.ListFactory_List(0);
      $.setRuntimeTypeInfo(old, ({E: 'Velocity'}));
    } else old = this.velocities;
    t1 = $.ListFactory_List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Velocity'}));
    this.velocities = t1;
    $.setRange$3(this.velocities, 0, $.get$length(old), old);
    var i = $.get$length(old);
    if (i !== (i | 0)) return this.init$4$bailout(1, i);
    for (; $.ltB(i, $.get$length(this.velocities)); ++i) {
      $.indexSet(this.velocities, i, $.Velocity$());
    }
  }
  if (this.positions == null || $.gtB(this.bodyCapacity, $.get$length(this.positions))) {
    if (this.positions == null) {
      old = $.ListFactory_List(0);
      $.setRuntimeTypeInfo(old, ({E: 'Position'}));
    } else old = this.positions;
    t1 = $.ListFactory_List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Position'}));
    this.positions = t1;
    $.setRange$3(this.positions, 0, $.get$length(old), old);
    i = $.get$length(old);
    if (i !== (i | 0)) return this.init$4$bailout(2, i);
    for (; $.ltB(i, $.get$length(this.positions)); ++i) {
      $.indexSet(this.positions, i, $.Position$());
    }
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
      if (this.bodies == null || $.gtB(this.bodyCapacity, $.get$length(this.bodies))) {
        var t1 = $.ListFactory_List(this.bodyCapacity);
        $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
        this.bodies = t1;
      }
      if (this.contacts == null || $.gtB(this.contactCapacity, $.get$length(this.contacts))) {
        t1 = $.ListFactory_List(this.contactCapacity);
        $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
        this.contacts = t1;
      }
      if (this.joints == null || $.gtB(this.jointCapacity, $.get$length(this.joints))) {
        t1 = $.ListFactory_List(this.jointCapacity);
        $.setRuntimeTypeInfo(t1, ({E: 'Joint'}));
        this.joints = t1;
      }
    case 1:
      if (state == 1 || (state == 0 && (this.velocities == null || $.gtB(this.bodyCapacity, $.get$length(this.velocities))))) {
        switch (state) {
          case 0:
            if (this.velocities == null) {
              var old = $.ListFactory_List(0);
              $.setRuntimeTypeInfo(old, ({E: 'Velocity'}));
            } else old = this.velocities;
            t1 = $.ListFactory_List(this.bodyCapacity);
            $.setRuntimeTypeInfo(t1, ({E: 'Velocity'}));
            this.velocities = t1;
            $.setRange$3(this.velocities, 0, $.get$length(old), old);
            var i = $.get$length(old);
          case 1:
            state = 0;
            for (; $.ltB(i, $.get$length(this.velocities)); i = $.add(i, 1)) {
              $.indexSet(this.velocities, i, $.Velocity$());
            }
        }
      }
    case 2:
      if (state == 2 || (state == 0 && (this.positions == null || $.gtB(this.bodyCapacity, $.get$length(this.positions))))) {
        switch (state) {
          case 0:
            if (this.positions == null) {
              old = $.ListFactory_List(0);
              $.setRuntimeTypeInfo(old, ({E: 'Position'}));
            } else old = this.positions;
            t1 = $.ListFactory_List(this.bodyCapacity);
            $.setRuntimeTypeInfo(t1, ({E: 'Position'}));
            this.positions = t1;
            $.setRange$3(this.positions, 0, $.get$length(old), old);
            i = $.get$length(old);
          case 2:
            state = 0;
            for (; $.ltB(i, $.get$length(this.positions)); i = $.add(i, 1)) {
              $.indexSet(this.positions, i, $.Position$());
            }
        }
      }
  }
 }
};

$$.Position = {"":
 ["a=", "x="],
 super: "Object",
 Position$0: function() {
  this.x = $.Vector$(0, 0);
  this.a = 0;
 }
};

$$.Velocity = {"":
 ["a=", "v?"],
 super: "Object",
 Velocity$0: function() {
  this.v = $.Vector$(0, 0);
  this.a = 0;
 }
};

$$.TimeStep = {"":
 ["warmStarting=", "positionIterations=", "velocityIterations=", "dtRatio=", "inv_dt=", "dt="],
 super: "Object"
};

$$.World = {"":
 ["stack", "island", "contacts", "toiSolver", "backup", "toiOutput", "toiInput", "wqwrapper", "cB", "cA", "timestep", "axis", "center?", "_contactStacks", "_continuousPhysics", "_warmStarting", "_inverseTimestep", "_pool", "_jointDestructionListener", "_fixtureDestructionListener", "_debugDraw", "_allowSleep", "_gravity", "_jointCount", "_bodyCount", "_jointList", "_bodyList", "_contactManager?", "_flags="],
 super: "Object",
 drawJoint$1: function(joint) {
  var bodyA = joint.get$bodyA();
  var bodyB = joint.get$bodyB();
  var xf1 = bodyA.get$originTransform();
  var xf2 = bodyB.get$originTransform();
  var x1 = $.Vector$copy(xf1.get$position());
  var x2 = $.Vector$copy(xf2.get$position());
  var p1 = $.Vector$(0, 0);
  var p2 = $.Vector$(0, 0);
  joint.getAnchorA$1(p1);
  joint.getAnchorB$1(p2);
  var color = $.Color3$fromRGB(0.5, 0.3, 0.3);
  switch (joint.get$type()) {
    case 3:
      this._debugDraw.drawSegment$3(p1, p2, color);
      break;
    case 4:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 9:
      this._debugDraw.drawSegment$3(x1, x2, color);
      break;
    case 10:
    case 5:
      break;
    default:
      var p1t = $.Vector$copy(p1);
      var p2t = $.Vector$copy(p2);
      this._debugDraw.drawSegment$3(x1, p1, color);
      this._debugDraw.drawSegment$3(p1t, p2, color);
      this._debugDraw.drawSegment$3(x2, p2t, color);
  }
 },
 drawShape$3: function(fixture, xf, color) {
  switch (fixture.get$type()) {
    case 0:
      var circle = fixture.get$shape();
      $.Transform_mulToOut(xf, circle.get$position(), this.center);
      var radius = circle.get$radius();
      this.axis.setFrom$1(xf.get$rotation().get$col1());
      if (!(0 === $.and(this._debugDraw.get$drawFlags(), 64))) this._debugDraw.drawCircle$4(this.center, radius, color, this.axis);
      else this._debugDraw.drawSolidCircle$4(this.center, radius, color, this.axis);
      break;
    case 1:
      var poly = fixture.get$shape();
      var vertexCount = poly.get$vertexCount();
      var vertices = $.ListFactory_List(vertexCount);
      $.setRuntimeTypeInfo(vertices, ({E: 'Vector'}));
      for (var i = 0; $.ltB(i, vertexCount); ++i) {
        var t1 = $.Vector$(0, 0);
        var t2 = vertices.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        vertices[i] = t1;
      }
      for (i = 0; $.ltB(i, vertexCount); ++i) {
        t1 = $.index(poly.get$vertices(), i);
        t2 = vertices.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        $.Transform_mulToOut(xf, t1, vertices[i]);
      }
      if (!(0 === $.and(this._debugDraw.get$drawFlags(), 64))) this._debugDraw.drawPolygon$3(vertices, vertexCount, color);
      else this._debugDraw.drawSolidPolygon$3(vertices, vertexCount, color);
  }
 },
 solveTimeOfImpactGivenBody$1: function(body) {
  var bullet = body.get$bullet();
  if (typeof bullet !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(1, body, bullet, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var iter = 0;
  var toiContact = null;
  var toi = 1.0;
  var toiOther = null;
  var count = null;
  var found = null;
  do {
    for (var ce = body.get$contactList(), count = 0, found = false; !(ce == null); ce = ce.get$next()) {
      if ($.eqB(ce.get$contact(), toiContact)) continue;
      var other = ce.get$other();
      var type = other.get$type();
      if (typeof type !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(2, found, body, other, type, bullet, iter, toiContact, toi, toiOther, ce, count, 0);
      if (bullet) {
        var t1 = other.get$flags();
        if (t1 !== (t1 | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(3, found, body, bullet, iter, other, type, toiContact, t1, toi, toiOther, ce, count);
        if ((t1 & 64) === 0) continue;
        if (!(type === 0)) {
          t1 = ce.get$contact().get$flags();
          if (t1 !== (t1 | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(4, found, body, other, bullet, iter, toiContact, toi, toiOther, ce, t1, count, 0);
          var t2 = !((t1 & 16) === 0);
          t1 = t2;
        } else t1 = false;
        if (t1) continue;
      } else {
        if (type === 2) continue;
      }
      var contact = ce.get$contact();
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(5, found, body, bullet, contact, iter, t1, other, toiContact, toi, toiOther, ce, count);
      if (!t1) continue;
      t1 = contact.get$toiCount();
      if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(6, found, body, bullet, contact, iter, other, t1, toiContact, toi, toiOther, ce, count);
      if (t1 > 10) continue;
      var fixtureA = contact.get$fixtureA();
      var fixtureB = contact.get$fixtureB();
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) continue;
      var bodyA = fixtureA.get$body();
      var bodyB = fixtureB.get$body();
      this.toiInput.proxyA.setFromShape$1(fixtureA.get$shape());
      this.toiInput.proxyB.setFromShape$1(fixtureB.get$shape());
      this.toiInput.sweepA.setFrom$1(bodyA.get$sweep());
      this.toiInput.sweepB.setFrom$1(bodyB.get$sweep());
      this.toiInput.tMax = toi;
      this._pool.get$timeOfImpact().timeOfImpact$2(this.toiOutput, this.toiInput);
      t1 = this.toiOutput.state;
      if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(7, found, body, bullet, contact, t1, iter, other, toiContact, toi, toiOther, ce, count);
      if (t1 === 3) {
        t1 = this.toiOutput.t;
        if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(8, found, body, bullet, contact, iter, t1, other, toiContact, toi, toiOther, ce, count);
        t1 = t1 < toi;
      } else t1 = false;
      if (t1) {
        toi = this.toiOutput.t;
        if (typeof toi !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(9, body, other, bullet, contact, iter, toi, ce, count, 0, 0, 0, 0);
        toiContact = contact;
        toiOther = other;
        found = true;
      }
      ++count;
    }
    ++iter;
  } while ((found === true && ($.gtB(count, 1) && iter < 50)));
  if (toiContact == null) {
    body.advance$1(1.0);
    return;
  }
  this.backup.setFrom$1(body.get$sweep());
  body.advance$1(toi);
  toiContact.update$1(this._contactManager.contactListener);
  t1 = toiContact.get$enabled();
  if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(10, body, t1, toiContact, toiOther, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!t1) {
    body.get$sweep().setFrom$1(this.backup);
    this.solveTimeOfImpactGivenBody$1(body);
  }
  t1 = toiContact.get$toiCount();
  if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(11, body, toiContact, t1, toiOther, 0, 0, 0, 0, 0, 0, 0, 0);
  toiContact.set$toiCount(t1 + 1);
  if (this.contacts.length < 32) {
    t1 = $.ListFactory_List(32);
    $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
    this.contacts = t1;
  }
  ce = body.get$contactList();
  count = 0;
  while (true) {
    if (!(!(ce == null) && count < 32)) break;
    c$0:{
      type = ce.get$other().get$type();
      if (typeof type !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(12, count, body, type, toiContact, ce, toiOther, 0, 0, 0, 0, 0, 0);
      if (type === 2) break c$0;
      contact = ce.get$contact();
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(13, count, t1, toiOther, body, toiContact, ce, contact, 0, 0, 0, 0, 0);
      if (!t1) break c$0;
      fixtureA = contact.get$fixtureA();
      fixtureB = contact.get$fixtureB();
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) break c$0;
      !$.eqB(contact, toiContact) && contact.update$1(this._contactManager.contactListener);
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(14, count, body, toiOther, t1, toiContact, ce, contact, 0, 0, 0, 0, 0);
      if (!t1) break c$0;
      t1 = contact.get$touching();
      if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(15, count, body, t1, toiOther, toiContact, ce, contact, 0, 0, 0, 0, 0);
      if (!t1) break c$0;
      t1 = this.contacts;
      t2 = t1.length;
      if (count < 0 || count >= t2) throw $.ioore(count);
      t1[count] = contact;
      ++count;
    }
    ce = ce.get$next();
  }
  this.toiSolver.initialize$3(this.contacts, count, body);
  for (var i = 0; i < 20; ++i) {
    if (this.toiSolver.solve$1(0.75) === true) break;
  }
  t1 = toiOther.get$type();
  if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(16, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!(t1 === 0)) {
    t1 = toiContact.get$flags();
    if (t1 !== (t1 | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(17, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    toiContact.set$flags((t1 | 16) >>> 0);
  }
 },
 solveTimeOfImpactGivenBody$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var body = env0;
      bullet = env1;
      break;
    case 2:
      found = env0;
      body = env1;
      other = env2;
      type = env3;
      bullet = env4;
      iter = env5;
      toiContact = env6;
      toi = env7;
      toiOther = env8;
      ce = env9;
      count = env10;
      break;
    case 3:
      found = env0;
      body = env1;
      bullet = env2;
      iter = env3;
      other = env4;
      type = env5;
      toiContact = env6;
      t1 = env7;
      toi = env8;
      toiOther = env9;
      ce = env10;
      count = env11;
      break;
    case 4:
      found = env0;
      body = env1;
      other = env2;
      bullet = env3;
      iter = env4;
      toiContact = env5;
      toi = env6;
      toiOther = env7;
      ce = env8;
      t1 = env9;
      count = env10;
      break;
    case 5:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      t1 = env5;
      other = env6;
      toiContact = env7;
      toi = env8;
      toiOther = env9;
      ce = env10;
      count = env11;
      break;
    case 6:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      other = env5;
      t1 = env6;
      toiContact = env7;
      toi = env8;
      toiOther = env9;
      ce = env10;
      count = env11;
      break;
    case 7:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      t1 = env4;
      iter = env5;
      other = env6;
      toiContact = env7;
      toi = env8;
      toiOther = env9;
      ce = env10;
      count = env11;
      break;
    case 8:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      t1 = env5;
      other = env6;
      toiContact = env7;
      toi = env8;
      toiOther = env9;
      ce = env10;
      count = env11;
      break;
    case 9:
      body = env0;
      other = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      toi = env5;
      ce = env6;
      count = env7;
      break;
    case 10:
      body = env0;
      t1 = env1;
      toiContact = env2;
      toiOther = env3;
      break;
    case 11:
      body = env0;
      toiContact = env1;
      t1 = env2;
      toiOther = env3;
      break;
    case 12:
      count = env0;
      body = env1;
      type = env2;
      toiContact = env3;
      ce = env4;
      toiOther = env5;
      break;
    case 13:
      count = env0;
      t1 = env1;
      toiOther = env2;
      body = env3;
      toiContact = env4;
      ce = env5;
      contact = env6;
      break;
    case 14:
      count = env0;
      body = env1;
      toiOther = env2;
      t1 = env3;
      toiContact = env4;
      ce = env5;
      contact = env6;
      break;
    case 15:
      count = env0;
      body = env1;
      t1 = env2;
      toiOther = env3;
      toiContact = env4;
      ce = env5;
      contact = env6;
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
      var iter = 0;
      var toiContact = null;
      var toi = 1.0;
      var toiOther = null;
      var count = null;
      var found = null;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      L0: while (true) {
        switch (state) {
          case 0:
            var ce = body.get$contactList();
            count = 0;
            found = false;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!!(ce == null)) break L1;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                  c$1:{
                    switch (state) {
                      case 0:
                        if ($.eqB(ce.get$contact(), toiContact)) break c$1;
                        var other = ce.get$other();
                        var type = other.get$type();
                      case 2:
                        state = 0;
                      case 3:
                      case 4:
                        if (state == 3 || state == 4 || (state == 0 && $.eqB(bullet, true))) {
                          switch (state) {
                            case 0:
                              var t1 = other.get$flags();
                            case 3:
                              state = 0;
                              if ($.eqB($.and(t1, 64), 0)) break c$1;
                            case 4:
                              if (state == 4 || (state == 0 && !$.eqB(type, 0))) {
                                switch (state) {
                                  case 0:
                                    t1 = ce.get$contact().get$flags();
                                  case 4:
                                    state = 0;
                                    var t2 = !$.eqB($.and(t1, 16), 0);
                                    t1 = t2;
                                }
                              } else {
                                t1 = false;
                              }
                              if (t1) break c$1;
                          }
                        } else {
                          if ($.eqB(type, 2)) break c$1;
                        }
                        var contact = ce.get$contact();
                        t1 = contact.get$enabled();
                      case 5:
                        state = 0;
                        if ($.eqB(t1, false)) break c$1;
                        t1 = contact.get$toiCount();
                      case 6:
                        state = 0;
                        if ($.gtB(t1, 10)) break c$1;
                        var fixtureA = contact.get$fixtureA();
                        var fixtureB = contact.get$fixtureB();
                        if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) break c$1;
                        var bodyA = fixtureA.get$body();
                        var bodyB = fixtureB.get$body();
                        this.toiInput.get$proxyA().setFromShape$1(fixtureA.get$shape());
                        this.toiInput.get$proxyB().setFromShape$1(fixtureB.get$shape());
                        this.toiInput.get$sweepA().setFrom$1(bodyA.get$sweep());
                        this.toiInput.get$sweepB().setFrom$1(bodyB.get$sweep());
                        this.toiInput.set$tMax(toi);
                        this._pool.get$timeOfImpact().timeOfImpact$2(this.toiOutput, this.toiInput);
                        t1 = this.toiOutput.get$state();
                      case 7:
                        state = 0;
                      case 8:
                        if (state == 8 || (state == 0 && $.eqB(t1, 3))) {
                          switch (state) {
                            case 0:
                              t1 = this.toiOutput.get$t();
                            case 8:
                              state = 0;
                              t1 = $.ltB(t1, toi);
                          }
                        } else {
                          t1 = false;
                        }
                      case 9:
                        if (state == 9 || (state == 0 && t1)) {
                          switch (state) {
                            case 0:
                              toi = this.toiOutput.get$t();
                            case 9:
                              state = 0;
                              toiContact = contact;
                              toiOther = other;
                              found = true;
                          }
                        }
                        ++count;
                    }
                  }
                  ce = ce.get$next();
              }
            }
            ++iter;
            if (!(found === true && ($.gtB(count, 1) && iter < 50))) break L0;
        }
      }
      if (toiContact == null) {
        body.advance$1(1.0);
        return;
      }
      this.backup.setFrom$1(body.get$sweep());
      body.advance$1(toi);
      toiContact.update$1(this._contactManager.get$contactListener());
      t1 = toiContact.get$enabled();
    case 10:
      state = 0;
      if ($.eqB(t1, false)) {
        body.get$sweep().setFrom$1(this.backup);
        this.solveTimeOfImpactGivenBody$1(body);
      }
      t1 = toiContact.get$toiCount();
    case 11:
      state = 0;
      toiContact.set$toiCount($.add(t1, 1));
      if (this.contacts === null || this.contacts.length < 32) {
        t1 = $.ListFactory_List(32);
        $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
        this.contacts = t1;
      }
      ce = body.get$contactList();
      count = 0;
    case 12:
    case 13:
    case 14:
    case 15:
      L2: while (true) {
        switch (state) {
          case 0:
            if (!(!(ce == null) && count < 32)) break L2;
          case 12:
          case 13:
          case 14:
          case 15:
            c$0:{
              switch (state) {
                case 0:
                  type = ce.get$other().get$type();
                case 12:
                  state = 0;
                  if ($.eqB(type, 2)) break c$0;
                  contact = ce.get$contact();
                  t1 = contact.get$enabled();
                case 13:
                  state = 0;
                  if ($.eqB(t1, false)) break c$0;
                  fixtureA = contact.get$fixtureA();
                  fixtureB = contact.get$fixtureB();
                  if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) break c$0;
                  !$.eqB(contact, toiContact) && contact.update$1(this._contactManager.get$contactListener());
                  t1 = contact.get$enabled();
                case 14:
                  state = 0;
                  if ($.eqB(t1, false)) break c$0;
                  t1 = contact.get$touching();
                case 15:
                  state = 0;
                  if ($.eqB(t1, false)) break c$0;
                  t1 = this.contacts;
                  t2 = t1.length;
                  if (count < 0 || count >= t2) throw $.ioore(count);
                  t1[count] = contact;
                  ++count;
              }
            }
            ce = ce.get$next();
        }
      }
      this.toiSolver.initialize$3(this.contacts, count, body);
      for (var i = 0; i < 20; ++i) {
        if (this.toiSolver.solve$1(0.75) === true) break;
      }
      t1 = toiOther.get$type();
    case 16:
      state = 0;
    case 17:
      if (state == 17 || (state == 0 && !$.eqB(t1, 0))) {
        switch (state) {
          case 0:
            t1 = toiContact.get$flags();
          case 17:
            state = 0;
            toiContact.set$flags($.or(t1, 16));
        }
      }
  }
 },
 solveTimeOfImpact$0: function() {
  for (var c = this._contactManager.get$contactList(); !(c == null); c = c.get$next()) {
    c.set$flags($.or(c.get$flags(), 4));
    c.set$toiCount(0);
  }
  for (var body = this._bodyList; !(body == null); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 1), 0) || ($.eqB(body.get$type(), 1) || $.eqB(body.get$type(), 0))) body.set$flags($.or(body.get$flags(), 64));
    else body.set$flags($.and(body.get$flags(), -65));
  }
  for (body = this._bodyList; !(body == null); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 64), 64)) continue;
    if ($.eqB(body.get$bullet(), true)) continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
  for (body = this._bodyList; !(body == null); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 64), 64)) continue;
    if ($.eqB(body.get$bullet(), false)) continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
 },
 solve$1: function(timeStep) {
  this.island.init$4(this._bodyCount, this._contactManager.get$contactCount(), this._jointCount, this._contactManager.get$contactListener());
  for (var b = this._bodyList; !(b == null); b = b.get$next()) {
    b.set$flags($.and(b.get$flags(), -2));
  }
  for (var c = this._contactManager.get$contactList(); !(c == null); c = c.get$next()) {
    c.set$flags($.and(c.get$flags(), -2));
  }
  for (var j = this.get$jointList(); !(j == null); j = j.get$_lib0_next()) {
    j.set$islandFlag(false);
  }
  var stackSize = this._bodyCount;
  if ($.ltB(this.stack.length, stackSize)) {
    var t1 = $.ListFactory_List(stackSize);
    $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
    this.stack = t1;
  }
  for (var seed = this._bodyList; !(seed == null); seed = seed.get$next()) {
    if ($.eqB($.and(seed.get$flags(), 1), 1)) continue;
    if ($.eqB(seed.get$awake(), false) || $.eqB(seed.get$active(), false)) continue;
    if ($.eqB(seed.get$type(), 0)) continue;
    $.clear(this.island);
    t1 = this.stack;
    var t2 = t1.length;
    if (0 < 0 || 0 >= t2) throw $.ioore(0);
    t1[0] = seed;
    seed.set$flags($.or(seed.get$flags(), 1));
    for (var stackCount = 1; stackCount > 0; ) {
      t1 = this.stack;
      --stackCount;
      t2 = t1.length;
      if (stackCount < 0 || stackCount >= t2) throw $.ioore(stackCount);
      t1 = t1[stackCount];
      this.island.addBody$1(t1);
      t1.set$awake(true);
      if ($.eqB(t1.get$type(), 0)) continue;
      for (var ce = t1.get$contactList(); !(ce == null); ce = ce.get$next()) {
        var contact = ce.get$contact();
        if ($.eqB($.and(contact.get$flags(), 1), 1)) continue;
        if ($.eqB(contact.get$enabled(), false) || $.eqB(contact.get$touching(), false)) continue;
        var sensorA = contact.get$fixtureA().get$isSensor();
        var sensorB = contact.get$fixtureB().get$isSensor();
        if (sensorA === true || sensorB === true) continue;
        this.island.addContact$1(contact);
        contact.set$flags($.or(contact.get$flags(), 1));
        var other = ce.get$other();
        if ($.eqB($.and(other.get$flags(), 1), 1)) continue;
        t2 = this.stack;
        var stackCount0 = stackCount + 1;
        var t3 = t2.length;
        if (stackCount < 0 || stackCount >= t3) throw $.ioore(stackCount);
        t2[stackCount] = other;
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
      for (var je = t1.get$jointList(); !(je == null); je = je.get$next()) {
        if ($.eqB(je.get$joint().get$islandFlag(), true)) continue;
        other = je.get$other();
        if ($.eqB(other.get$active(), false)) continue;
        this.island.addJoint$1(je.get$joint());
        je.get$joint().set$islandFlag(true);
        if ($.eqB($.and(other.get$flags(), 1), 1)) continue;
        t1 = this.stack;
        stackCount0 = stackCount + 1;
        t2 = t1.length;
        if (stackCount < 0 || stackCount >= t2) throw $.ioore(stackCount);
        t1[stackCount] = other;
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
    }
    this.island.solve$3(timeStep, this._gravity, this._allowSleep);
    for (var i = 0; $.ltB(i, this.island.get$bodyCount()); ++i) {
      b = $.index(this.island.get$bodies(), i);
      $.eqB(b.get$type(), 0) && b.set$flags($.and(b.get$flags(), -2));
    }
  }
  for (b = this._bodyList; !(b == null); b = b.get$next()) {
    if ($.eqB($.and(b.get$flags(), 1), 0)) continue;
    if ($.eqB(b.get$type(), 0)) continue;
    b.synchronizeFixtures$0();
  }
  this._contactManager.findNewContacts$0();
 },
 get$jointList: function() {
  return this._jointList;
 },
 get$locked: function() {
  return $.eq($.and(this._flags, 2), 2);
 },
 get$contactCount: function() {
  return this._contactManager.get$contactCount();
 },
 get$contactList: function() {
  return this._contactManager.get$contactList();
 },
 drawDebugData$0: function() {
  if (this._debugDraw == null) return;
  var drawFlags = this._debugDraw.get$drawFlags();
  if (drawFlags !== (drawFlags | 0)) return this.drawDebugData$0$bailout(1, drawFlags);
  if ((drawFlags & 1) === 1) {
    var xf = $.Transform$();
    var color = $.Color3$();
    for (var b = this._bodyList; !(b == null); b = b.get$next()) {
      xf.setFrom$1(b.get$originTransform());
      for (var f = b.get$fixtureList(); !(f == null); f = f.get$next()) {
        if ($.eqB(b.get$active(), false)) {
          color.setFromRGB$3(0.5, 0.5, 0.3);
          this.drawShape$3(f, xf, color);
        } else {
          if ($.eqB(b.get$type(), 0)) {
            color.setFromRGB$3(0.5, 0.9, 0.3);
            this.drawShape$3(f, xf, color);
          } else {
            if ($.eqB(b.get$type(), 1)) {
              color.setFromRGB$3(0.5, 0.5, 0.9);
              this.drawShape$3(f, xf, color);
            } else {
              if ($.eqB(b.get$awake(), false)) {
                color.setFromRGB$3(0.9, 0.9, 0.9);
                this.drawShape$3(f, xf, color);
              } else {
                color.setFromRGB$3(0.9, 0.7, 0.7);
                this.drawShape$3(f, xf, color);
              }
            }
          }
        }
      }
    }
  }
  if ((drawFlags & 2) === 2) {
    for (var j = this._jointList; !(j == null); j = j.get$_lib0_next()) {
      this.drawJoint$1(j);
    }
  }
  if ((drawFlags & 8) === 8) {
    color = $.Color3$fromRGB(0.3, 0.9, 0.9);
    for (var c = this._contactManager.contactList; !(c == null); c = c.get$next()) {
      var fixtureA = c.get$fixtureA();
      var fixtureB = c.get$fixtureB();
      this.cA.setFrom$1(fixtureA.get$box().get$center());
      this.cB.setFrom$1(fixtureB.get$box().get$center());
      this._debugDraw.drawSegment$3(this.cA, this.cB, color);
    }
  }
  if ((drawFlags & 4) === 4) {
    color = $.Color3$fromRGB(0.9, 0.3, 0.9);
    for (b = this._bodyList, t1 = !(0 === (drawFlags & 64)); !(b == null); b = b.get$next()) {
      if (b.get$active() !== true) continue;
      for (f = b.get$fixtureList(); !(f == null); f = f.get$next()) {
        var aabb = f.get$proxy().get$box();
        var vs = $.ListFactory_List(4);
        $.setRuntimeTypeInfo(vs, ({E: 'Vector'}));
        for (var i = 0; i < vs.length; ++i) {
          var t2 = $.Vector$(0, 0);
          var t3 = vs.length;
          if (i < 0 || i >= t3) throw $.ioore(i);
          vs[i] = t2;
        }
        t2 = vs.length;
        if (0 >= t2) throw $.ioore(0);
        vs[0].setCoords$2(aabb.get$lowerBound().get$x(), aabb.get$lowerBound().get$y());
        t3 = vs.length;
        if (1 >= t3) throw $.ioore(1);
        vs[1].setCoords$2(aabb.get$upperBound().get$x(), aabb.get$lowerBound().get$y());
        var t4 = vs.length;
        if (2 >= t4) throw $.ioore(2);
        vs[2].setCoords$2(aabb.get$upperBound().get$x(), aabb.get$upperBound().get$y());
        var t5 = vs.length;
        if (3 >= t5) throw $.ioore(3);
        vs[3].setCoords$2(aabb.get$lowerBound().get$x(), aabb.get$upperBound().get$y());
        if (t1) this._debugDraw.drawPolygon$3(vs, 4, color);
        else this._debugDraw.drawSolidPolygon$3(vs, 4, color);
      }
    }
  }
  if ((drawFlags & 16) === 16) {
    xf = $.Transform$();
    color = $.Color3$fromRGB(1, 0, 0);
    for (b = this._bodyList; !(b == null); b = b.get$next()) {
      xf.setFrom$1(b.get$originTransform());
      xf.position.setFrom$1(b.get$worldCenter());
      this._debugDraw.drawTransform$2(xf, color);
    }
  }
  var t1;
 },
 drawDebugData$0$bailout: function(state, drawFlags) {
  if ($.eqB($.and(drawFlags, 1), 1)) {
    var xf = $.Transform$();
    var color = $.Color3$();
    for (var b = this._bodyList; !(b == null); b = b.get$next()) {
      xf.setFrom$1(b.get$originTransform());
      for (var f = b.get$fixtureList(); !(f == null); f = f.get$next()) {
        if ($.eqB(b.get$active(), false)) {
          color.setFromRGB$3(0.5, 0.5, 0.3);
          this.drawShape$3(f, xf, color);
        } else {
          if ($.eqB(b.get$type(), 0)) {
            color.setFromRGB$3(0.5, 0.9, 0.3);
            this.drawShape$3(f, xf, color);
          } else {
            if ($.eqB(b.get$type(), 1)) {
              color.setFromRGB$3(0.5, 0.5, 0.9);
              this.drawShape$3(f, xf, color);
            } else {
              if ($.eqB(b.get$awake(), false)) {
                color.setFromRGB$3(0.9, 0.9, 0.9);
                this.drawShape$3(f, xf, color);
              } else {
                color.setFromRGB$3(0.9, 0.7, 0.7);
                this.drawShape$3(f, xf, color);
              }
            }
          }
        }
      }
    }
  }
  if ($.eqB($.and(drawFlags, 2), 2)) {
    for (var j = this._jointList; !(j == null); j = j.get$_lib0_next()) {
      this.drawJoint$1(j);
    }
  }
  if ($.eqB($.and(drawFlags, 8), 8)) {
    color = $.Color3$fromRGB(0.3, 0.9, 0.9);
    for (var c = this._contactManager.get$contactList(); !(c == null); c = c.get$next()) {
      var fixtureA = c.get$fixtureA();
      var fixtureB = c.get$fixtureB();
      this.cA.setFrom$1(fixtureA.get$box().get$center());
      this.cB.setFrom$1(fixtureB.get$box().get$center());
      this._debugDraw.drawSegment$3(this.cA, this.cB, color);
    }
  }
  if ($.eqB($.and(drawFlags, 4), 4)) {
    color = $.Color3$fromRGB(0.9, 0.3, 0.9);
    for (b = this._bodyList; !(b == null); b = b.get$next()) {
      if (b.get$active() !== true) continue;
      for (f = b.get$fixtureList(); !(f == null); f = f.get$next()) {
        var aabb = f.get$proxy().get$box();
        var vs = $.ListFactory_List(4);
        $.setRuntimeTypeInfo(vs, ({E: 'Vector'}));
        for (var i = 0; i < vs.length; ++i) {
          var t1 = $.Vector$(0, 0);
          var t2 = vs.length;
          if (i < 0 || i >= t2) throw $.ioore(i);
          vs[i] = t1;
        }
        t1 = vs.length;
        if (0 >= t1) throw $.ioore(0);
        vs[0].setCoords$2(aabb.get$lowerBound().get$x(), aabb.get$lowerBound().get$y());
        t2 = vs.length;
        if (1 >= t2) throw $.ioore(1);
        vs[1].setCoords$2(aabb.get$upperBound().get$x(), aabb.get$lowerBound().get$y());
        var t3 = vs.length;
        if (2 >= t3) throw $.ioore(2);
        vs[2].setCoords$2(aabb.get$upperBound().get$x(), aabb.get$upperBound().get$y());
        var t4 = vs.length;
        if (3 >= t4) throw $.ioore(3);
        vs[3].setCoords$2(aabb.get$lowerBound().get$x(), aabb.get$upperBound().get$y());
        if (!(0 === $.and(drawFlags, 64))) this._debugDraw.drawPolygon$3(vs, 4, color);
        else this._debugDraw.drawSolidPolygon$3(vs, 4, color);
      }
    }
  }
  if ($.eqB($.and(drawFlags, 16), 16)) {
    xf = $.Transform$();
    color = $.Color3$fromRGB(1, 0, 0);
    for (b = this._bodyList; !(b == null); b = b.get$next()) {
      xf.setFrom$1(b.get$originTransform());
      xf.position.setFrom$1(b.get$worldCenter());
      this._debugDraw.drawTransform$2(xf, color);
    }
  }
 },
 clearForces$0: function() {
  for (var body = this._bodyList; !(body == null); body = body.get$next()) {
    body.get$_force().setZero$0();
    body.set$_torque(0.0);
  }
 },
 step$3: function(dt, velocityIterations, positionIterations) {
  if ($.eqB($.and(this._flags, 1), 1)) {
    this._contactManager.findNewContacts$0();
    this._flags = $.and(this._flags, -2);
  }
  this._flags = $.or(this._flags, 2);
  this.timestep.set$dt(dt);
  this.timestep.set$velocityIterations(velocityIterations);
  this.timestep.set$positionIterations(positionIterations);
  if ($.gtB(dt, 0.0)) {
    if (typeof dt !== 'number') throw $.iae(dt);
    var t1 = 1.0 / dt;
    this.timestep.set$inv_dt(t1);
  } else this.timestep.set$inv_dt(0.0);
  t1 = $.mul(this._inverseTimestep, dt);
  this.timestep.set$dtRatio(t1);
  t1 = this._warmStarting;
  this.timestep.set$warmStarting(t1);
  this._contactManager.collide$0();
  $.gtB(this.timestep.get$dt(), 0.0) && this.solve$1(this.timestep);
  this._continuousPhysics === true && $.gtB(this.timestep.get$dt(), 0.0) && this.solveTimeOfImpact$0();
  if ($.gtB(this.timestep.get$dt(), 0.0)) this._inverseTimestep = this.timestep.get$inv_dt();
  $.eqB($.and(this._flags, 4), 4) && this.clearForces$0();
  this._flags = $.and(this._flags, -3);
 },
 createJoint$1: function(def) {
  if (this.get$locked() === true) return;
  var j = $.Joint_Joint$create(this, def);
  j.set$_prev(null);
  j.set$_lib0_next(this._jointList);
  !(this._jointList == null) && this._jointList.set$_prev(j);
  this._jointList = j;
  this._jointCount = this._jointCount + 1;
  j.get$edgeA().set$joint(j);
  var t1 = j.get$bodyB();
  j.get$edgeA().set$other(t1);
  j.get$edgeA().set$prev(null);
  t1 = j.get$bodyA().get$jointList();
  j.get$edgeA().set$next(t1);
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
  if (typeof t1 !== 'boolean') return this.createJoint$1$bailout(1, bodyA, j, bodyB, t1);
  if (!t1) {
    var edge = bodyB.get$contactList();
    for (; !(edge == null); ) {
      $.eqB(edge.get$other(), bodyA) && edge.get$contact().flagForFiltering$0();
      edge = edge.get$next();
    }
  }
  return j;
 },
 createJoint$1$bailout: function(state, bodyA, j, bodyB, t1) {
  if ($.eqB(t1, false)) {
    var edge = bodyB.get$contactList();
    for (; !(edge == null); ) {
      $.eqB(edge.get$other(), bodyA) && edge.get$contact().flagForFiltering$0();
      edge = edge.get$next();
    }
  }
  return j;
 },
 createBody$1: function(def) {
  if (this.get$locked() === true) return;
  var b = $.Body$(def, this);
  b.prev = null;
  b.next = this._bodyList;
  !(this._bodyList == null) && this._bodyList.set$prev(b);
  this._bodyList = b;
  var t1 = this._bodyCount;
  if (typeof t1 !== 'number') return this.createBody$1$bailout(1, b, t1);
  this._bodyCount = t1 + 1;
  return b;
 },
 createBody$1$bailout: function(state, b, t1) {
  this._bodyCount = $.add(t1, 1);
  return b;
 },
 set$debugDraw: function(debugDraw) {
  this._debugDraw = debugDraw;
 },
 get$contactListener: function() {
  return this._contactManager.get$contactListener();
 },
 pushContact$1: function(contact) {
  if ($.gtB(contact.get$manifold().get$pointCount(), 0)) {
    contact.get$fixtureA().get$body().set$awake(true);
    contact.get$fixtureB().get$body().set$awake(true);
  }
  var type1 = contact.get$fixtureA().get$type();
  var type2 = contact.get$fixtureB().get$type();
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0)) throw $.iae(type1);
  var t2 = t1.length;
  if (type1 < 0 || type1 >= t2) throw $.ioore(type1);
  $.index(t1[type1], type2).get$creator().addFirst$1(contact);
 },
 _getFreshContactStack$2: function(type1, type2) {
  if ($.eqB(type1, 0) && $.eqB(type2, 0)) return this._pool.getCircleContactStack$0();
  if ($.eqB(type1, 1) && $.eqB(type2, 1)) return this._pool.getPolyContactStack$0();
  return this._pool.getPolyCircleContactStack$0();
 },
 popContact$2: function(fixtureA, fixtureB) {
  var type1 = fixtureA.get$type();
  var type2 = fixtureB.get$type();
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0)) throw $.iae(type1);
  var t2 = t1.length;
  if (type1 < 0 || type1 >= t2) throw $.ioore(type1);
  var reg = $.index(t1[type1], type2);
  var creator = reg.get$creator();
  if (!(creator == null)) {
    if ($.isEmpty(creator) === true) creator = this._getFreshContactStack$2(type1, type2);
    if (reg.get$primary() === true) {
      var c = creator.removeFirst$0();
      c.init$2(fixtureA, fixtureB);
      return c;
    }
    c = creator.removeFirst$0();
    c.init$2(fixtureB, fixtureA);
    return c;
  }
  return;
 },
 _initializeRegisters$0: function() {
  this._addType$3(this._pool.getCircleContactStack$0(), 0, 0);
  this._addType$3(this._pool.getPolyCircleContactStack$0(), 1, 0);
  this._addType$3(this._pool.getPolyContactStack$0(), 1, 1);
 },
 _addType$3: function(creatorStack, type1, type2) {
  var register = $.ContactRegister$();
  register.creator = creatorStack;
  register.primary = true;
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0)) throw $.iae(type1);
  var t2 = t1.length;
  if (type1 < 0 || type1 >= t2) throw $.ioore(type1);
  $.indexSet(t1[type1], type2, register);
  if (!(type1 === type2)) {
    var register2 = $.ContactRegister$();
    register2.creator = creatorStack;
    register2.primary = false;
    t1 = this._contactStacks;
    if (type2 !== (type2 | 0)) throw $.iae(type2);
    t2 = t1.length;
    if (type2 < 0 || type2 >= t2) throw $.ioore(type2);
    $.indexSet(t1[type2], type1, register2);
  }
 },
 World$3: function(gravity, doSleep, argPool) {
  this._contactManager = $.ContactManager$(this);
  for (var i = 0; i < this._contactStacks.length; ++i) {
    var t1 = this._contactStacks;
    var t2 = $.ListFactory_List(2);
    $.setRuntimeTypeInfo(t2, ({E: 'ContactRegister'}));
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
  this._initializeRegisters$0();
 }
};

$$.WorldQueryWrapper = {"":
 ["callback", "broadPhase?"],
 super: "Object",
 treeCallback$1: function(node) {
  var fixture = node.get$userData();
  return this.callback.reportFixture$1(fixture);
 }
};

$$.Contact = {"":
 ["toiCount=", "manifold=", "fixtureB?", "fixtureA?", "edge2?", "edge1?", "next=", "prev=", "flags="],
 super: "Object",
 update$1: function(listener) {
  this._oldManifold.setFrom$1(this.manifold);
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.update$1$bailout(1, listener, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.flags = (t1 | 4) >>> 0;
  var t2 = this.flags;
  if (t2 !== (t2 | 0)) return this.update$1$bailout(2, listener, t2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var wasTouching = (t2 & 2) === 2;
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
    if (typeof touching !== 'boolean') return this.update$1$bailout(3, listener, wasTouching, sensor, touching, 0, 0, 0, 0, 0, 0, 0);
    this.manifold.set$pointCount(0);
  } else {
    this.evaluate$3(this.manifold, xfA, xfB);
    t1 = this.manifold.get$pointCount();
    if (typeof t1 !== 'number') return this.update$1$bailout(4, listener, wasTouching, bodyA, bodyB, t1, sensor, 0, 0, 0, 0, 0);
    touching = t1 > 0;
    var i = 0;
    while (true) {
      t1 = this.manifold.get$pointCount();
      if (typeof t1 !== 'number') return this.update$1$bailout(5, i, listener, wasTouching, bodyB, bodyA, t1, touching, sensor, 0, 0, 0);
      if (!(i < t1)) break;
      t1 = this.manifold.get$points();
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.update$1$bailout(6, i, listener, t1, bodyB, wasTouching, bodyA, touching, sensor, 0, 0, 0);
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t1 = t1[i];
      t1.set$normalImpulse(0.0);
      t1.set$tangentImpulse(0.0);
      var id2 = t1.get$id();
      var j = 0;
      while (true) {
        t2 = this._oldManifold.pointCount;
        if (typeof t2 !== 'number') return this.update$1$bailout(7, i, listener, bodyA, bodyB, t2, wasTouching, t1, id2, touching, j, sensor);
        if (!(j < t2)) break;
        t2 = this._oldManifold.points;
        if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.update$1$bailout(8, i, listener, bodyA, bodyB, wasTouching, t1, t2, id2, touching, j, sensor);
        var t3 = t2.length;
        if (j < 0 || j >= t3) throw $.ioore(j);
        t2 = t2[j];
        if (t2.get$id().isEqual$1(id2) === true) {
          t1.set$normalImpulse(t2.get$normalImpulse());
          t1.set$tangentImpulse(t2.get$tangentImpulse());
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
  if (touching) {
    t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.update$1$bailout(9, listener, wasTouching, touching, t1, touching, sensor, 0, 0, 0, 0, 0);
    this.flags = (t1 | 2) >>> 0;
  } else {
    t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.update$1$bailout(10, listener, wasTouching, touching, t1, touching, sensor, 0, 0, 0, 0, 0);
    this.flags = (t1 & -3) >>> 0;
  }
  if (listener == null) return;
  !wasTouching && touching && listener.beginContact$1(this);
  wasTouching && !touching && listener.endContact$1(this);
  !sensor && touching && listener.preSolve$2(this, this._oldManifold);
 },
 update$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var listener = env0;
      t1 = env1;
      break;
    case 2:
      listener = env0;
      t2 = env1;
      break;
    case 3:
      listener = env0;
      wasTouching = env1;
      sensor = env2;
      touching = env3;
      break;
    case 4:
      listener = env0;
      wasTouching = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      sensor = env5;
      break;
    case 5:
      i = env0;
      listener = env1;
      wasTouching = env2;
      bodyB = env3;
      bodyA = env4;
      t1 = env5;
      touching = env6;
      sensor = env7;
      break;
    case 6:
      i = env0;
      listener = env1;
      t1 = env2;
      bodyB = env3;
      wasTouching = env4;
      bodyA = env5;
      touching = env6;
      sensor = env7;
      break;
    case 7:
      i = env0;
      listener = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      wasTouching = env5;
      mp2 = env6;
      id2 = env7;
      touching = env8;
      j = env9;
      sensor = env10;
      break;
    case 8:
      i = env0;
      listener = env1;
      bodyA = env2;
      bodyB = env3;
      wasTouching = env4;
      mp2 = env5;
      t1 = env6;
      id2 = env7;
      touching = env8;
      j = env9;
      sensor = env10;
      break;
    case 9:
      listener = env0;
      wasTouching = env1;
      touching = env2;
      t2 = env3;
      t1 = env4;
      sensor = env5;
      break;
    case 10:
      listener = env0;
      wasTouching = env1;
      touching = env2;
      t2 = env3;
      t1 = env4;
      sensor = env5;
      break;
  }
  switch (state) {
    case 0:
      this._oldManifold.setFrom$1(this.manifold);
      var t1 = this.flags;
    case 1:
      state = 0;
      this.flags = $.or(t1, 4);
      var t2 = this.flags;
    case 2:
      state = 0;
      var wasTouching = $.eq($.and(t2, 2), 2);
      var sensorA = this.fixtureA.get$isSensor();
      var sensorB = this.fixtureB.get$isSensor();
      var sensor = sensorA === true || sensorB === true;
      var bodyA = this.fixtureA.get$body();
      var bodyB = this.fixtureB.get$body();
      var xfA = bodyA.get$originTransform();
      var xfB = bodyB.get$originTransform();
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      if (state == 3 || (state == 0 && sensor)) {
        switch (state) {
          case 0:
            var shapeA = this.fixtureA.get$shape();
            var shapeB = this.fixtureB.get$shape();
            var touching = this.pool.get$collision().testOverlap$4(shapeA, shapeB, xfA, xfB);
          case 3:
            state = 0;
            this.manifold.set$pointCount(0);
        }
      } else {
        switch (state) {
          case 0:
            this.evaluate$3(this.manifold, xfA, xfB);
            t1 = this.manifold.get$pointCount();
          case 4:
            state = 0;
            touching = $.gt(t1, 0);
            var i = 0;
          case 5:
          case 6:
          case 7:
          case 8:
            L0: while (true) {
              switch (state) {
                case 0:
                  t1 = this.manifold.get$pointCount();
                case 5:
                  state = 0;
                  if (!$.ltB(i, t1)) break L0;
                  t1 = this.manifold.get$points();
                case 6:
                  state = 0;
                  var mp2 = $.index(t1, i);
                  mp2.set$normalImpulse(0.0);
                  mp2.set$tangentImpulse(0.0);
                  var id2 = mp2.get$id();
                  var j = 0;
                case 7:
                case 8:
                  L1: while (true) {
                    switch (state) {
                      case 0:
                        t1 = this._oldManifold.get$pointCount();
                      case 7:
                        state = 0;
                        if (!$.ltB(j, t1)) break L1;
                        t1 = this._oldManifold.get$points();
                      case 8:
                        state = 0;
                        var mp1 = $.index(t1, j);
                        if (mp1.get$id().isEqual$1(id2) === true) {
                          mp2.set$normalImpulse(mp1.get$normalImpulse());
                          mp2.set$tangentImpulse(mp1.get$tangentImpulse());
                          break L1;
                        }
                        ++j;
                    }
                  }
                  ++i;
              }
            }
            if (!$.eqB(touching, wasTouching)) {
              bodyA.set$awake(true);
              bodyB.set$awake(true);
            }
        }
      }
      t1 = touching === true;
    case 9:
    case 10:
      if (state == 9 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t2 = this.flags;
          case 9:
            state = 0;
            this.flags = $.or(t2, 2);
        }
      } else {
        switch (state) {
          case 0:
            t2 = this.flags;
          case 10:
            state = 0;
            this.flags = $.and(t2, -3);
        }
      }
      if (listener == null) return;
      $.eqB(wasTouching, false) && $.eqB(touching, true) && listener.beginContact$1(this);
      $.eqB(wasTouching, true) && $.eqB(touching, false) && listener.endContact$1(this);
      !sensor && t1 && listener.preSolve$2(this, this._oldManifold);
  }
 },
 flagForFiltering$0: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.flagForFiltering$0$bailout(1, t1);
  this.flags = (t1 | 8) >>> 0;
 },
 flagForFiltering$0$bailout: function(state, t1) {
  this.flags = $.or(t1, 8);
 },
 get$enabled: function() {
  return $.eq($.and(this.flags, 4), 4);
 },
 get$touching: function() {
  return $.eq($.and(this.flags, 2), 2);
 },
 init$2: function(fixA, fixB) {
  this.flags = 0;
  this.fixtureA = fixA;
  this.fixtureB = fixB;
  this.manifold.set$pointCount(0);
  this.prev = null;
  this.next = null;
  this.edge1.set$contact(null);
  this.edge1.set$prev(null);
  this.edge1.set$next(null);
  this.edge1.set$other(null);
  this.edge2.set$contact(null);
  this.edge2.set$prev(null);
  this.edge2.set$next(null);
  this.edge2.set$other(null);
  this.toiCount = 0;
 },
 next$0: function() { return this.next.$call$0(); }
};

$$.ContactConstraint = {"":
 ["manifold=", "pointCount=", "restitution=", "friction=", "radius=", "type=", "bodyB=", "bodyA=", "K?", "normalMass?", "normal?", "localPoint?", "localNormal?", "points?"],
 super: "Object",
 toString$0: function() {
  return 'localNormal: "' + $.S(this.localNormal) + '", localPoint: "' + $.S(this.localPoint) + '" ' + 'normal: "' + $.S(this.normal) + '", radius: "' + $.S(this.radius) + '" friction: "' + $.S(this.friction) + '" ' + 'restitution: "' + $.S(this.restitution) + '", pointCount: "' + $.S(this.pointCount) + '"';
 },
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
  var i = 0;
  while (true) {
    var t1 = cp.get$pointCount();
    if (typeof t1 !== 'number') return this.setFrom$1$bailout(1, cp, i, t1, 0);
    if (!(i < t1)) break;
    t1 = this.points;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    var t3 = cp.get$points();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.setFrom$1$bailout(2, cp, t1, t3, i);
    var t4 = t3.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t1.setFrom$1(t3[i]);
    ++i;
  }
 },
 setFrom$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var cp = env0;
      i = env1;
      t1 = env2;
      break;
    case 2:
      cp = env0;
      t1 = env1;
      t3 = env2;
      i = env3;
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
      var i = 0;
    case 1:
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = cp.get$pointCount();
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.points;
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1 = t1[i];
            var t3 = cp.get$points();
          case 2:
            state = 0;
            t1.setFrom$1($.index(t3, i));
            ++i;
        }
      }
  }
 },
 ContactConstraint$0: function() {
  for (var i = 0; i < 2; ++i) {
    var t1 = this.points;
    var t2 = $.ContactConstraintPoint$();
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.ContactConstraintPoint = {"":
 ["velocityBias=", "tangentMass=", "normalMass=", "tangentImpulse=", "normalImpulse=", "rB?", "rA?", "localPoint?"],
 super: "Object",
 toString$0: function() {
  return 'normal impulse: ' + $.S(this.normalImpulse) + ', tangentImpulse: ' + $.S(this.tangentImpulse) + ', normalMass: ' + $.S(this.normalMass) + ', tangentMass: ' + $.S(this.tangentMass) + ', velocityBias: ' + $.S(this.velocityBias) + ', localPoint: ' + $.S(this.localPoint) + ', rA: ' + $.S(this.rA) + ', rB: ' + $.S(this.rB);
 },
 setFrom$1: function(cp) {
  this.localPoint.setFrom$1(cp.get$localPoint());
  this.rA.setFrom$1(cp.get$rA());
  this.rB.setFrom$1(cp.get$rB());
  this.normalImpulse = cp.get$normalImpulse();
  this.tangentImpulse = cp.get$tangentImpulse();
  this.normalMass = cp.get$normalMass();
  this.tangentMass = cp.get$tangentMass();
  this.velocityBias = cp.get$velocityBias();
 }
};

$$.ContactEdge = {"":
 ["next=", "prev=", "contact=", "other="],
 super: "Object",
 next$0: function() { return this.next.$call$0(); }
};

$$.CircleContact = {"":
 ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"],
 super: "Contact",
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collideCircles$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.Expect_equals(0, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
};

$$.ContactRegister = {"":
 ["primary?", "creator?"],
 super: "Object"
};

$$.ContactSolver = {"":
 ["rB?", "rA?", "psolver", "P2", "P1", "d", "x?", "dv2", "dv1", "dv", "P", "temp2", "temp1", "tangent", "worldManifold", "constraintCount", "constraints?"],
 super: "Object",
 solvePositionConstraints$1: function(baumgarte) {
  if (typeof baumgarte !== 'number') return this.solvePositionConstraints$1$bailout(1, baumgarte, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var i = 0;
  var minSeparation = 0.0;
  while (true) {
    var t1 = this.constraintCount;
    if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(2, baumgarte, minSeparation, t1, i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (!(i < t1)) break;
    t1 = this.constraints;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    var bodyA = t1.get$bodyA();
    var bodyB = t1.get$bodyB();
    var t3 = bodyA.get$mass();
    if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(3, baumgarte, t1, bodyA, i, bodyB, minSeparation, t3, 0, 0, 0, 0, 0, 0, 0, 0);
    var t4 = bodyA.get$invMass();
    if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(4, baumgarte, t1, bodyA, i, bodyB, minSeparation, t4, t3, 0, 0, 0, 0, 0, 0, 0);
    var invMassA = t3 * t4;
    t4 = bodyA.get$mass();
    if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(5, baumgarte, t1, bodyA, i, bodyB, minSeparation, invMassA, t4, 0, 0, 0, 0, 0, 0, 0);
    t3 = bodyA.get$invInertia();
    if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(6, baumgarte, t1, bodyA, i, bodyB, minSeparation, invMassA, t4, t3, 0, 0, 0, 0, 0, 0);
    var invIA = t4 * t3;
    t3 = bodyB.get$mass();
    if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(7, baumgarte, t3, t1, bodyA, i, bodyB, minSeparation, invMassA, invIA, 0, 0, 0, 0, 0, 0);
    t4 = bodyB.get$invMass();
    if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(8, baumgarte, t3, t4, t1, bodyA, i, bodyB, minSeparation, invMassA, invIA, 0, 0, 0, 0, 0);
    var invMassB = t3 * t4;
    t4 = bodyB.get$mass();
    if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(9, baumgarte, invMassB, t4, t1, bodyA, i, bodyB, minSeparation, invMassA, invIA, 0, 0, 0, 0, 0);
    t3 = bodyB.get$invInertia();
    if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(10, baumgarte, invMassB, t4, t3, i, minSeparation, t1, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0);
    var invIB = t4 * t3;
    t2 = invMassA + invMassB;
    var j = 0;
    while (true) {
      t3 = t1.get$pointCount();
      if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(11, baumgarte, invMassB, i, invIB, j, minSeparation, t3, t1, bodyA, bodyB, invMassA, invIA, 0, 0, 0);
      if (!(j < t3)) break;
      var psm = this.psolver;
      psm.initialize$2(t1, j);
      var normal = psm.normal;
      var point = psm.point;
      var separation = psm.separation;
      if (typeof separation !== 'number') return this.solvePositionConstraints$1$bailout(12, baumgarte, separation, normal, invMassB, point, invIB, i, j, minSeparation, t1, bodyA, bodyB, invMassA, invIA, 0);
      this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.Math_min(minSeparation, separation);
      if (typeof minSeparation !== 'number') return this.solvePositionConstraints$1$bailout(13, baumgarte, separation, normal, invMassB, invIB, i, j, minSeparation, t1, bodyA, bodyB, invMassA, invIA, 0, 0);
      var C = $.MathBox_clamp(baumgarte * (separation + 0.005), -0.2, 0.0);
      if (typeof C !== 'number') return this.solvePositionConstraints$1$bailout(14, baumgarte, invIA, invMassB, invIB, i, j, minSeparation, t1, bodyA, bodyB, C, invMassA, normal, 0, 0);
      var rnA = $.Vector_crossVectors(this.rA, normal);
      if (typeof rnA !== 'number') return this.solvePositionConstraints$1$bailout(15, invIA, baumgarte, invMassB, invIB, i, j, minSeparation, t1, bodyA, bodyB, C, invMassA, rnA, normal, 0);
      var rnB = $.Vector_crossVectors(this.rB, normal);
      if (typeof rnB !== 'number') return this.solvePositionConstraints$1$bailout(16, normal, baumgarte, invMassB, invIB, i, j, minSeparation, t1, bodyA, bodyB, C, invMassA, rnA, rnB, invIA);
      var K = t2 + invIA * rnA * rnA + invIB * rnB * rnB;
      var impulse = K > 0.0 ? -C / K : 0.0;
      this.P.setFrom$1(normal).mulLocal$1(impulse);
      this.temp1.setFrom$1(this.P).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(this.temp1);
      t3 = bodyA.get$sweep();
      t4 = t3.get$angle();
      if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(17, baumgarte, invMassB, t3, t4, invIB, i, j, minSeparation, t1, bodyA, bodyB, invMassA, invIA, 0, 0);
      var t5 = $.Vector_crossVectors(this.rA, this.P);
      if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(18, baumgarte, invMassB, t3, t4, invIB, i, t5, j, minSeparation, t1, bodyA, bodyB, invMassA, invIA, 0);
      t3.set$angle(t4 - invIA * t5);
      bodyA.synchronizeTransform$0();
      this.temp1.setFrom$1(this.P).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(this.temp1);
      t3 = bodyB.get$sweep();
      var t6 = t3.get$angle();
      if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(19, baumgarte, invMassB, i, invIB, j, minSeparation, t1, bodyA, bodyB, t3, t6, invMassA, invIA, 0, 0);
      var t7 = $.Vector_crossVectors(this.rB, this.P);
      if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(20, baumgarte, invMassB, i, invIB, j, minSeparation, t1, bodyA, bodyB, t3, t6, invMassA, t7, invIA, 0);
      t3.set$angle(t6 + invIB * t7);
      bodyB.synchronizeTransform$0();
      ++j;
    }
    ++i;
  }
  return minSeparation >= -0.0075;
 },
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      break;
    case 2:
      baumgarte = env0;
      minSeparation = env1;
      t1 = env2;
      i = env3;
      break;
    case 3:
      baumgarte = env0;
      t1 = env1;
      bodyA = env2;
      i = env3;
      bodyB = env4;
      minSeparation = env5;
      t3 = env6;
      break;
    case 4:
      baumgarte = env0;
      t1 = env1;
      bodyA = env2;
      i = env3;
      bodyB = env4;
      minSeparation = env5;
      t4 = env6;
      t3 = env7;
      break;
    case 5:
      baumgarte = env0;
      t1 = env1;
      bodyA = env2;
      i = env3;
      bodyB = env4;
      minSeparation = env5;
      invMassA = env6;
      t4 = env7;
      break;
    case 6:
      baumgarte = env0;
      t1 = env1;
      bodyA = env2;
      i = env3;
      bodyB = env4;
      minSeparation = env5;
      invMassA = env6;
      t4 = env7;
      t3 = env8;
      break;
    case 7:
      baumgarte = env0;
      t3 = env1;
      t1 = env2;
      bodyA = env3;
      i = env4;
      bodyB = env5;
      minSeparation = env6;
      invMassA = env7;
      invIA = env8;
      break;
    case 8:
      baumgarte = env0;
      t3 = env1;
      t4 = env2;
      t1 = env3;
      bodyA = env4;
      i = env5;
      bodyB = env6;
      minSeparation = env7;
      invMassA = env8;
      invIA = env9;
      break;
    case 9:
      baumgarte = env0;
      invMassB = env1;
      t4 = env2;
      t1 = env3;
      bodyA = env4;
      i = env5;
      bodyB = env6;
      minSeparation = env7;
      invMassA = env8;
      invIA = env9;
      break;
    case 10:
      baumgarte = env0;
      invMassB = env1;
      t4 = env2;
      t3 = env3;
      i = env4;
      minSeparation = env5;
      t1 = env6;
      bodyA = env7;
      bodyB = env8;
      invMassA = env9;
      invIA = env10;
      break;
    case 11:
      baumgarte = env0;
      invMassB = env1;
      i = env2;
      invIB = env3;
      j = env4;
      minSeparation = env5;
      t2 = env6;
      t1 = env7;
      bodyA = env8;
      bodyB = env9;
      invMassA = env10;
      invIA = env11;
      break;
    case 12:
      baumgarte = env0;
      separation = env1;
      normal = env2;
      invMassB = env3;
      point = env4;
      invIB = env5;
      i = env6;
      j = env7;
      minSeparation = env8;
      t1 = env9;
      bodyA = env10;
      bodyB = env11;
      invMassA = env12;
      invIA = env13;
      break;
    case 13:
      baumgarte = env0;
      separation = env1;
      normal = env2;
      invMassB = env3;
      invIB = env4;
      i = env5;
      j = env6;
      minSeparation = env7;
      t1 = env8;
      bodyA = env9;
      bodyB = env10;
      invMassA = env11;
      invIA = env12;
      break;
    case 14:
      baumgarte = env0;
      invIA = env1;
      invMassB = env2;
      invIB = env3;
      i = env4;
      j = env5;
      minSeparation = env6;
      t1 = env7;
      bodyA = env8;
      bodyB = env9;
      C = env10;
      invMassA = env11;
      normal = env12;
      break;
    case 15:
      invIA = env0;
      baumgarte = env1;
      invMassB = env2;
      invIB = env3;
      i = env4;
      j = env5;
      minSeparation = env6;
      t1 = env7;
      bodyA = env8;
      bodyB = env9;
      C = env10;
      invMassA = env11;
      rnA = env12;
      normal = env13;
      break;
    case 16:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      invIB = env3;
      i = env4;
      j = env5;
      minSeparation = env6;
      t1 = env7;
      bodyA = env8;
      bodyB = env9;
      C = env10;
      invMassA = env11;
      rnA = env12;
      rnB = env13;
      invIA = env14;
      break;
    case 17:
      baumgarte = env0;
      invMassB = env1;
      t2 = env2;
      t3 = env3;
      invIB = env4;
      i = env5;
      j = env6;
      minSeparation = env7;
      t1 = env8;
      bodyA = env9;
      bodyB = env10;
      invMassA = env11;
      invIA = env12;
      break;
    case 18:
      baumgarte = env0;
      invMassB = env1;
      t2 = env2;
      t3 = env3;
      invIB = env4;
      i = env5;
      t4 = env6;
      j = env7;
      minSeparation = env8;
      t1 = env9;
      bodyA = env10;
      bodyB = env11;
      invMassA = env12;
      invIA = env13;
      break;
    case 19:
      baumgarte = env0;
      invMassB = env1;
      i = env2;
      invIB = env3;
      j = env4;
      minSeparation = env5;
      t1 = env6;
      bodyA = env7;
      bodyB = env8;
      t2 = env9;
      t5 = env10;
      invMassA = env11;
      invIA = env12;
      break;
    case 20:
      baumgarte = env0;
      invMassB = env1;
      i = env2;
      invIB = env3;
      j = env4;
      minSeparation = env5;
      t1 = env6;
      bodyA = env7;
      bodyB = env8;
      t2 = env9;
      t5 = env10;
      invMassA = env11;
      t6 = env12;
      invIA = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var i = 0;
      var minSeparation = 0.0;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = this.constraintCount;
          case 2:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.constraints;
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1 = t1[i];
            var bodyA = t1.get$bodyA();
            var bodyB = t1.get$bodyB();
            var t3 = bodyA.get$mass();
          case 3:
            state = 0;
            var t4 = bodyA.get$invMass();
          case 4:
            state = 0;
            var invMassA = $.mul(t3, t4);
            t4 = bodyA.get$mass();
          case 5:
            state = 0;
            t3 = bodyA.get$invInertia();
          case 6:
            state = 0;
            var invIA = $.mul(t4, t3);
            t3 = bodyB.get$mass();
          case 7:
            state = 0;
            t4 = bodyB.get$invMass();
          case 8:
            state = 0;
            var invMassB = $.mul(t3, t4);
            t4 = bodyB.get$mass();
          case 9:
            state = 0;
            t3 = bodyB.get$invInertia();
          case 10:
            state = 0;
            var invIB = $.mul(t4, t3);
            var j = 0;
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
            L1: while (true) {
              switch (state) {
                case 0:
                  t2 = t1.get$pointCount();
                case 11:
                  state = 0;
                  if (!$.ltB(j, t2)) break L1;
                  var psm = this.psolver;
                  psm.initialize$2(t1, j);
                  var normal = psm.get$normal();
                  var point = psm.get$point();
                  var separation = psm.get$separation();
                case 12:
                  state = 0;
                  this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
                  this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
                  minSeparation = $.Math_min(minSeparation, separation);
                case 13:
                  state = 0;
                  var C = $.MathBox_clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0);
                case 14:
                  state = 0;
                  var rnA = $.Vector_crossVectors(this.rA, normal);
                case 15:
                  state = 0;
                  var rnB = $.Vector_crossVectors(this.rB, normal);
                case 16:
                  state = 0;
                  var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
                  var impulse = $.gtB(K, 0.0) ? $.div($.neg(C), K) : 0.0;
                  this.P.setFrom$1(normal).mulLocal$1(impulse);
                  this.temp1.setFrom$1(this.P).mulLocal$1(invMassA);
                  bodyA.get$sweep().get$center().subLocal$1(this.temp1);
                  t2 = bodyA.get$sweep();
                  t3 = t2.get$angle();
                case 17:
                  state = 0;
                  t4 = $.Vector_crossVectors(this.rA, this.P);
                case 18:
                  state = 0;
                  t2.set$angle($.sub(t3, $.mul(invIA, t4)));
                  bodyA.synchronizeTransform$0();
                  this.temp1.setFrom$1(this.P).mulLocal$1(invMassB);
                  bodyB.get$sweep().get$center().addLocal$1(this.temp1);
                  t2 = bodyB.get$sweep();
                  var t5 = t2.get$angle();
                case 19:
                  state = 0;
                  var t6 = $.Vector_crossVectors(this.rB, this.P);
                case 20:
                  state = 0;
                  t2.set$angle($.add(t5, $.mul(invIB, t6)));
                  bodyB.synchronizeTransform$0();
                  ++j;
              }
            }
            ++i;
        }
      }
      return $.ge(minSeparation, -0.0075);
  }
 },
 storeImpulses$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); ++i) {
    var t1 = this.constraints;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    var m = t1.get$manifold();
    for (var j = 0; $.ltB(j, t1.get$pointCount()); ++j) {
      t2 = $.index(t1.get$points(), j).get$normalImpulse();
      $.index(m.get$points(), j).set$normalImpulse(t2);
      t2 = $.index(t1.get$points(), j).get$tangentImpulse();
      $.index(m.get$points(), j).set$tangentImpulse(t2);
    }
  }
 },
 solveVelocityConstraints$0: function() {
  var i = 0;
  while (true) {
    var t1 = this.constraintCount;
    if (typeof t1 !== 'number') return this.solveVelocityConstraints$0$bailout(1, t1, i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (!(i < t1)) break;
    t1 = this.constraints;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    var bodyA = t1.get$bodyA();
    var bodyB = t1.get$bodyB();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number') return this.solveVelocityConstraints$0$bailout(2, t1, bodyA, bodyB, wA, i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number') return this.solveVelocityConstraints$0$bailout(3, t1, bodyA, bodyB, wA, i, wB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number') return this.solveVelocityConstraints$0$bailout(4, t1, bodyA, bodyB, wA, i, wB, vA, vB, invMassA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number') return this.solveVelocityConstraints$0$bailout(5, t1, bodyA, bodyB, wA, i, wB, vA, vB, invMassA, invIA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number') return this.solveVelocityConstraints$0$bailout(6, t1, bodyA, bodyB, wA, i, wB, vA, vB, invMassA, invIA, invMassB, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number') return this.solveVelocityConstraints$0$bailout(7, i, t1, bodyA, bodyB, wA, wB, vA, vB, invMassA, invIA, invMassB, invIB, 0, 0, 0, 0, 0, 0, 0, 0);
    var t3 = t1.get$normal().get$y();
    if (typeof t3 !== 'number') throw $.iae(t3);
    t3 *= 1.0;
    this.tangent.x = t3;
    t3 = t1.get$normal().get$x();
    if (typeof t3 !== 'number') throw $.iae(t3);
    t3 *= -1.0;
    this.tangent.y = t3;
    var friction = t1.get$friction();
    if (typeof friction !== 'number') return this.solveVelocityConstraints$0$bailout(8, i, friction, t1, bodyA, bodyB, wA, wB, vA, vB, invMassA, invIA, invMassB, invIB, 0, 0, 0, 0, 0, 0, 0);
    var j = 0;
    while (true) {
      t2 = t1.get$pointCount();
      if (typeof t2 !== 'number') return this.solveVelocityConstraints$0$bailout(9, i, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, t2, 0, 0, 0, 0, 0);
      if (!(j < t2)) break;
      t2 = t1.get$points();
      if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.solveVelocityConstraints$0$bailout(10, i, t2, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, wA, invIB, 0, 0, 0, 0, 0);
      t3 = t2.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      t2 = t2[j];
      var a = t2.get$rA();
      var t4 = -wB;
      var t5 = t2.get$rB().get$y();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(11, i, t2, a, t4, friction, t5, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0);
      t5 *= t4;
      t4 = vB.get$x();
      if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(12, i, t2, a, friction, t5, t4, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0);
      t4 += t5;
      t5 = vA.get$x();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(13, t1, bodyB, i, t2, a, friction, wB, j, t4, t5, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0);
      t5 = t4 - t5;
      t4 = a.get$y();
      if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(14, bodyA, i, t2, a, friction, wB, j, bodyB, t1, t5, vA, vB, invMassA, invIA, invMassB, invIB, t4, wA, 0, 0);
      t5 += wA * t4;
      this.dv.x = t5;
      t5 = t2.get$rB().get$x();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(15, i, t2, a, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, t5, 0, 0, 0);
      t5 *= wB;
      var t6 = vB.get$y();
      if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(16, t5, t6, i, t2, a, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0);
      t6 += t5;
      t5 = vA.get$y();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(17, t6, t5, i, t2, a, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0);
      t5 = t6 - t5;
      t6 = a.get$x();
      if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(18, i, t5, t6, t2, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0, 0);
      t5 -= wA * t6;
      this.dv.y = t5;
      t5 = this.dv.x;
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(19, i, t2, friction, t5, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0, 0, 0);
      var t7 = this.tangent.x;
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(20, t1, i, t2, friction, t5, wB, j, bodyB, t7, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0, 0);
      t7 *= t5;
      t5 = this.dv.y;
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(21, t1, i, t2, friction, wB, j, t7, bodyB, t5, vA, vB, invMassA, invIA, invMassB, invIB, bodyA, wA, 0, 0, 0);
      var t8 = this.tangent.y;
      if (typeof t8 !== 'number') return this.solveVelocityConstraints$0$bailout(22, t1, bodyA, i, t2, friction, wB, j, t7, bodyB, t5, vA, t8, invMassA, invIA, vB, invMassB, invIB, wA, 0, 0);
      var vt = t7 + t5 * t8;
      t7 = t2.get$tangentMass();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(23, i, t2, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, t7, wA, vt, 0, 0, 0);
      var lambda = t7 * -vt;
      t7 = t2.get$normalImpulse();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(24, lambda, t7, i, t2, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0, 0);
      var maxFriction = friction * t7;
      t7 = t2.get$tangentImpulse();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(25, lambda, maxFriction, t7, i, t2, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0);
      var newImpulse = $.MathBox_clamp(t7 + lambda, -maxFriction, maxFriction);
      if (typeof newImpulse !== 'number') return this.solveVelocityConstraints$0$bailout(26, i, t2, newImpulse, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, wA, invIB, 0, 0, 0, 0);
      var t9 = t2.get$tangentImpulse();
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(27, i, t2, newImpulse, t9, friction, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0, 0);
      var lambda0 = newImpulse - t9;
      t9 = this.tangent.x;
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(28, i, t2, newImpulse, friction, lambda0, t9, wB, j, bodyB, t1, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0);
      var Px = t9 * lambda0;
      t9 = this.tangent.y;
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(29, t1, bodyB, i, t2, newImpulse, friction, lambda0, wB, j, t9, Px, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0);
      var Py = t9 * lambda0;
      t9 = vA.get$x();
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(30, t1, bodyA, i, t2, newImpulse, friction, wB, j, bodyB, Px, Py, vA, vB, invMassA, invIA, invMassB, invIB, t9, wA, 0);
      vA.set$x(t9 - Px * invMassA);
      var t10 = vA.get$y();
      if (typeof t10 !== 'number') return this.solveVelocityConstraints$0$bailout(31, t1, bodyA, i, t2, newImpulse, friction, wB, j, bodyB, Px, Py, vA, vB, invMassA, invIA, invMassB, invIB, t10, wA, 0);
      vA.set$y(t10 - Py * invMassA);
      var t11 = t2.get$rA().get$x();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(32, t1, t11, i, t2, newImpulse, friction, wB, j, bodyB, Px, Py, vA, vB, bodyA, invIA, invMassB, invIB, wA, invMassA, 0);
      t11 *= Py;
      var t12 = t2.get$rA().get$y();
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(33, t1, t11, i, t12, t2, newImpulse, friction, wB, j, bodyB, Px, Py, vA, vB, bodyA, invIA, invMassB, invIB, wA, invMassA);
      wA -= invIA * (t11 - t12 * Px);
      var t13 = vB.get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(34, t1, i, t2, newImpulse, friction, wA, t13, wB, j, bodyB, Px, Py, vA, vB, bodyA, invMassA, invMassB, invIB, invIA, 0);
      vB.set$x(t13 + Px * invMassB);
      var t14 = vB.get$y();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(35, t1, i, t2, newImpulse, friction, wA, wB, j, bodyB, Px, Py, t14, vB, bodyA, vA, invMassB, invIB, invIA, invMassA, 0);
      vB.set$y(t14 + Py * invMassB);
      var t15 = t2.get$rB().get$x();
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(36, invMassB, i, t2, newImpulse, friction, wA, wB, j, bodyB, Px, Py, vA, t1, bodyA, invMassA, vB, invIB, invIA, t15, 0);
      t15 *= Py;
      var t16 = t2.get$rB().get$y();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(37, t16, i, t2, newImpulse, friction, wA, wB, j, bodyB, Px, bodyA, vA, t1, vB, invMassA, invIA, invIB, invMassB, t15, 0);
      wB += invIB * (t15 - t16 * Px);
      t2.set$tangentImpulse(newImpulse);
      ++j;
    }
    t2 = t1.get$pointCount();
    if (typeof t2 !== 'number') return this.solveVelocityConstraints$0$bailout(38, i, wB, bodyA, bodyB, t1, t2, vA, vB, invMassA, invIA, invMassB, invIB, wA, 0, 0, 0, 0, 0, 0, 0);
    t2 = t2 === 1;
    t3 = -wB;
    if (t2) {
      t2 = t1.get$points();
      if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.solveVelocityConstraints$0$bailout(39, i, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
      t4 = t2.length;
      if (0 >= t4) throw $.ioore(0);
      t2 = t2[0];
      var a1 = t2.get$rA();
      t5 = t2.get$rB().get$y();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(40, t5, i, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, a1, t3, 0, 0, 0, 0);
      t5 *= t3;
      t3 = vB.get$x();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(41, t5, t3, i, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, a1, 0, 0, 0, 0);
      t3 += t5;
      t5 = vA.get$x();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(42, i, t3, t5, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, a1, 0, 0, 0, 0);
      t5 = t3 - t5;
      t3 = a1.get$y();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(43, i, t5, t3, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, a1, 0, 0, 0, 0);
      t5 += wA * t3;
      this.dv.x = t5;
      t5 = t2.get$rB().get$x();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(44, i, wB, bodyA, bodyB, t1, t5, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, a1, 0, 0, 0, 0, 0);
      t5 *= wB;
      t6 = vB.get$y();
      if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(45, i, wB, bodyA, bodyB, t1, t5, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, a1, t6, 0, 0, 0, 0);
      t6 += t5;
      t5 = vA.get$y();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(46, wA, a1, i, wB, bodyA, bodyB, t1, vA, t6, t5, invMassA, vB, invMassB, invIA, t2, invIB, 0, 0, 0, 0);
      t5 = t6 - t5;
      t6 = a1.get$x();
      if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(47, wA, i, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, t5, invMassB, invIB, t2, t6, 0, 0, 0, 0, 0);
      t5 -= wA * t6;
      this.dv.y = t5;
      var b = t1.get$normal();
      t5 = this.dv.x;
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(48, b, t5, i, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0, 0);
      t7 = b.get$x();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(49, b, t5, i, t7, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0);
      t7 *= t5;
      t5 = this.dv.y;
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(50, b, i, t7, t5, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0);
      t8 = b.get$y();
      if (typeof t8 !== 'number') return this.solveVelocityConstraints$0$bailout(51, i, t7, t5, t8, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0);
      var vn = t7 + t5 * t8;
      t7 = t2.get$normalMass();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(52, i, vn, t7, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0, 0);
      t7 = -t7;
      t9 = t2.get$velocityBias();
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(53, wA, i, vn, t7, wB, bodyA, bodyB, t9, vA, t1, invMassA, invIA, vB, invMassB, invIB, t2, 0, 0, 0, 0);
      lambda = t7 * (vn - t9);
      t7 = t2.get$normalImpulse();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(54, wA, i, wB, bodyA, bodyB, t1, lambda, t7, vB, vA, invIA, invMassA, invIB, invMassB, t2, 0, 0, 0, 0, 0);
      a = t7 + lambda;
      newImpulse = a > 0.0 ? a : 0.0;
      t3 = t2.get$normalImpulse();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(55, newImpulse, t3, i, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0, 0);
      lambda = newImpulse - t3;
      t3 = t1.get$normal().get$x();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(56, newImpulse, i, lambda, t3, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0);
      Px = t3 * lambda;
      t3 = t1.get$normal().get$y();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(57, newImpulse, i, lambda, Px, t3, wB, bodyA, bodyB, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0);
      Py = t3 * lambda;
      t3 = vA.get$x();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(58, newImpulse, i, Px, Py, t3, wB, bodyA, bodyB, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0);
      vA.set$x(t3 - Px * invMassA);
      t4 = vA.get$y();
      if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(59, newImpulse, i, Px, Py, wB, bodyA, bodyB, t4, vA, vB, invMassA, invIA, invMassB, invIB, t2, wA, 0, 0, 0, 0);
      vA.set$y(t4 - Py * invMassA);
      t5 = t2.get$rA().get$x();
      if (typeof t5 !== 'number') return this.solveVelocityConstraints$0$bailout(60, newImpulse, i, Px, Py, wB, bodyA, bodyB, vA, vB, invIA, invMassB, invIB, t2, wA, t5, 0, 0, 0, 0, 0);
      t5 *= Py;
      t6 = t2.get$rA().get$y();
      if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(61, newImpulse, i, Px, Py, wB, bodyA, bodyB, vA, vB, invIA, invMassB, invIB, t2, wA, t5, t6, 0, 0, 0, 0);
      wA -= invIA * (t5 - t6 * Px);
      t7 = vB.get$x();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(62, newImpulse, i, wA, t7, Px, Py, wB, bodyA, bodyB, vA, vB, invMassB, invIB, t2, 0, 0, 0, 0, 0, 0);
      vB.set$x(t7 + Px * invMassB);
      t8 = vB.get$y();
      if (typeof t8 !== 'number') return this.solveVelocityConstraints$0$bailout(63, newImpulse, i, wA, Px, Py, t8, wB, bodyA, bodyB, vA, vB, invMassB, invIB, t2, 0, 0, 0, 0, 0, 0);
      vB.set$y(t8 + Py * invMassB);
      t9 = t2.get$rB().get$x();
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(64, newImpulse, i, wA, Px, Py, wB, bodyA, bodyB, t9, vA, vB, invIB, t2, 0, 0, 0, 0, 0, 0, 0);
      t9 *= Py;
      t10 = t2.get$rB().get$y();
      if (typeof t10 !== 'number') return this.solveVelocityConstraints$0$bailout(65, newImpulse, i, wA, Px, wB, bodyA, bodyB, vA, vB, t9, t10, invIB, t2, 0, 0, 0, 0, 0, 0, 0);
      wB += invIB * (t9 - t10 * Px);
      t2.set$normalImpulse(newImpulse);
    } else {
      t2 = t1.get$points();
      if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.solveVelocityConstraints$0$bailout(66, i, t2, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0, 0, 0, 0, 0);
      t4 = t2.length;
      if (0 >= t4) throw $.ioore(0);
      t2 = t2[0];
      t5 = t1.get$points();
      if (typeof t5 !== 'string' && (typeof t5 !== 'object' || t5 === null || (t5.constructor !== Array && !t5.is$JavaScriptIndexingBehavior()))) return this.solveVelocityConstraints$0$bailout(67, i, t2, t5, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0, 0, 0, 0);
      t6 = t5.length;
      if (1 >= t6) throw $.ioore(1);
      t5 = t5[1];
      a = $.Vector$(t2.get$normalImpulse(), t5.get$normalImpulse());
      t7 = t2.get$rB().get$y();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(68, i, t2, t5, a, t3, t7, wB, bodyA, bodyB, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t7 *= t3;
      t8 = vB.get$x();
      if (typeof t8 !== 'number') return this.solveVelocityConstraints$0$bailout(69, i, t2, t5, a, wB, bodyA, t7, bodyB, t8, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t8 += t7;
      t7 = vA.get$x();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(70, t8, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, t7, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t7 = t8 - t7;
      t8 = t2.get$rA().get$y();
      if (typeof t8 !== 'number') return this.solveVelocityConstraints$0$bailout(71, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, t7, invMassB, t8, 0, 0, 0);
      t7 += wA * t8;
      this.dv1.x = t7;
      t7 = t2.get$rB().get$x();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(72, t7, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0, 0);
      t7 *= wB;
      t9 = vB.get$y();
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(73, t7, i, t2, t5, t9, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t9 += t7;
      t7 = vA.get$y();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(74, i, t2, t9, t5, t7, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t7 = t9 - t7;
      t9 = t2.get$rA().get$x();
      if (typeof t9 !== 'number') return this.solveVelocityConstraints$0$bailout(75, i, t2, t5, t7, a, t9, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t7 -= wA * t9;
      this.dv1.y = t7;
      t7 = t5.get$rB().get$y();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(76, i, t2, t5, a, wB, bodyA, bodyB, t1, t3, vA, t7, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t7 *= t3;
      t3 = vB.get$x();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(77, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, t3, wA, invIB, invMassB, t7, 0, 0, 0);
      t3 += t7;
      t7 = vA.get$x();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(78, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, t3, invMassB, t7, 0, 0, 0);
      t7 = t3 - t7;
      t3 = t5.get$rA().get$y();
      if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(79, t3, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, t7, 0, 0, 0);
      t7 += wA * t3;
      this.dv2.x = t7;
      t7 = t5.get$rB().get$x();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(80, i, t2, t5, t7, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0, 0);
      t7 *= wB;
      t10 = vB.get$y();
      if (typeof t10 !== 'number') return this.solveVelocityConstraints$0$bailout(81, i, t2, t5, t7, t10, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t10 += t7;
      t7 = vA.get$y();
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(82, i, t2, t5, a, t10, t7, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t7 = t10 - t7;
      t10 = t5.get$rA().get$x();
      if (typeof t10 !== 'number') return this.solveVelocityConstraints$0$bailout(83, i, t2, t5, a, t7, wB, t10, bodyB, bodyA, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t7 -= wA * t10;
      this.dv2.y = t7;
      t7 = this.dv1.x;
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(84, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, t7, invMassB, 0, 0, 0, 0);
      t11 = t1.get$normal().get$x();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(85, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, t7, invMassB, t11, 0, 0, 0);
      t11 *= t7;
      t7 = this.dv1.y;
      if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(86, t7, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, t11, 0, 0, 0);
      t12 = t1.get$normal().get$y();
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(87, t7, t12, i, t2, t5, a, wB, t1, bodyB, bodyA, vA, vB, invMassA, invIA, wA, invIB, invMassB, t11, 0, 0);
      var vn1 = t11 + t7 * t12;
      t11 = this.dv2.x;
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(88, i, t2, vn1, t5, t11, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
      t13 = t1.get$normal().get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(89, i, t2, vn1, t5, t11, t13, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0);
      t13 *= t11;
      t11 = this.dv2.y;
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(90, i, t2, vn1, t5, a, t13, t11, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0);
      t14 = t1.get$normal().get$y();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(91, i, t2, vn1, t5, a, t13, t11, t14, wB, bodyA, bodyB, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, 0);
      var vn2 = t13 + t11 * t14;
      t13 = t2.get$velocityBias();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(92, i, t2, vn1, t5, a, wB, bodyA, bodyB, t1, vn2, vA, t13, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0);
      t13 = vn1 - t13;
      t15 = t5.get$velocityBias();
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(93, i, t2, t5, a, wB, bodyA, bodyB, t1, vn2, vA, vB, invMassA, invIA, t15, wA, invIB, invMassB, t13, 0, 0);
      b = $.Vector$(t13, vn2 - t15);
      t13 = t1.get$K().get$col1().get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(94, t13, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
      t16 = a.x;
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(95, t13, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, t16, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
      t16 *= t13;
      t13 = t1.get$K().get$col2().get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(96, t16, i, t2, t13, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
      var t17 = a.y;
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(97, t16, i, t2, t13, t5, a, wB, bodyA, bodyB, t1, t17, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0);
      t16 += t13 * t17;
      this.temp2.x = t16;
      t16 = t1.get$K().get$col1().get$y();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(98, i, t2, t5, a, t16, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
      var t18 = a.x;
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(99, i, t2, t5, a, t16, wB, bodyA, bodyB, t1, t18, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
      t18 *= t16;
      t16 = t1.get$K().get$col2().get$y();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(100, t16, i, t2, t5, a, wB, bodyA, t18, bodyB, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
      var t19 = a.y;
      if (typeof t19 !== 'number') return this.solveVelocityConstraints$0$bailout(101, t16, i, t2, t5, a, wB, bodyA, t18, bodyB, t19, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, b, 0);
      t18 += t16 * t19;
      this.temp2.y = t18;
      t18 = b.x;
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(102, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, t18, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
      var t20 = this.temp2.x;
      if (typeof t20 !== 'number') return this.solveVelocityConstraints$0$bailout(103, t20, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, t18, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
      b.x = t18 - t20;
      var t21 = b.y;
      if (typeof t21 !== 'number') return this.solveVelocityConstraints$0$bailout(104, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, t21, wA, invIB, invMassB, b, 0, 0, 0);
      var t22 = this.temp2.y;
      if (typeof t22 !== 'number') return this.solveVelocityConstraints$0$bailout(105, i, t2, t22, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, t21, wA, invIB, invMassB, b, 0, 0);
      b.y = t21 - t22;
      for (; true; ) {
        $.Matrix22_mulMatrixAndVectorToOut(t1.get$normalMass(), b, this.x);
        this.x.mulLocal$1(-1);
        t3 = this.x.get$x();
        if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(106, i, t2, t5, a, t3, wB, bodyA, bodyB, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
        if (t3 >= 0.0) {
          t3 = this.x.get$y();
          if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(107, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, t3, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
          t3 = t3 >= 0.0;
        } else t3 = false;
        if (t3) {
          this.d.setFrom$1(this.x).subLocal$1(a);
          this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.x);
          this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.y);
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          t3 = $.Vector_crossVectors(t2.get$rA(), this.P1);
          if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(108, i, t2, t3, t5, wB, bodyA, bodyB, vA, vB, invIA, wA, invIB, 0, 0, 0, 0, 0, 0, 0, 0);
          t4 = $.Vector_crossVectors(t5.get$rA(), this.P2);
          if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(109, i, t2, t3, t5, t4, wB, bodyA, bodyB, vA, vB, invIA, wA, invIB, 0, 0, 0, 0, 0, 0, 0);
          var wA0 = wA - invIA * (t3 + t4);
          t6 = $.Vector_crossVectors(t2.get$rB(), this.P1);
          if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(110, wA0, wB, bodyA, bodyB, t6, i, t2, vA, vB, t5, invIB, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t7 = $.Vector_crossVectors(t5.get$rB(), this.P2);
          if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(111, i, t2, t5, wA0, wB, bodyA, bodyB, t6, vA, vB, t7, invIB, 0, 0, 0, 0, 0, 0, 0, 0);
          var wB0 = wB + invIB * (t6 + t7);
          t2.set$normalImpulse(this.x.get$x());
          t5.set$normalImpulse(this.x.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t3 = t2.get$normalMass();
        if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(112, i, t2, t3, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
        t3 = -t3;
        t4 = b.x;
        if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(113, i, t2, t5, t3, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, t4, invMassB, b, 0, 0);
        t4 *= t3;
        this.x.set$x(t4);
        this.x.set$y(0.0);
        t4 = t1.get$K().get$col1().get$y();
        if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(114, i, t2, t5, a, wB, bodyA, t4, bodyB, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
        t3 = this.x.get$x();
        if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(115, i, t2, t5, a, wB, bodyA, t4, bodyB, t3, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
        t3 *= t4;
        t4 = b.y;
        if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(116, invMassB, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, t4, wA, invIB, t3, b, 0, 0);
        vn2 = t3 + t4;
        t3 = this.x.get$x();
        if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(117, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, vn2, wA, invIB, invMassB, b, t3, 0, 0);
        if (t3 >= 0.0 && vn2 >= 0.0) {
          this.d.setFrom$1(this.x).subLocal$1(a);
          this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.x);
          this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.y);
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          t3 = $.Vector_crossVectors(t2.get$rA(), this.P1);
          if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(118, i, t2, t5, t3, wB, bodyA, bodyB, vA, vB, invIA, wA, invIB, 0, 0, 0, 0, 0, 0, 0, 0);
          t4 = $.Vector_crossVectors(t5.get$rA(), this.P2);
          if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(119, i, t2, t5, t3, wB, bodyA, bodyB, t4, vA, vB, invIA, wA, invIB, 0, 0, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t3 + t4);
          t6 = $.Vector_crossVectors(t2.get$rB(), this.P1);
          if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(120, wB, bodyA, bodyB, i, t2, vA, vB, t5, wA0, invIB, t6, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t7 = $.Vector_crossVectors(t5.get$rB(), this.P2);
          if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(121, t7, i, t2, t5, wB, bodyA, bodyB, vA, vB, wA0, invIB, t6, 0, 0, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t6 + t7);
          t2.set$normalImpulse(this.x.get$x());
          t5.set$normalImpulse(this.x.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        this.x.set$x(0.0);
        t3 = t5.get$normalMass();
        if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(122, i, t2, t5, a, wB, bodyA, t3, bodyB, vA, t1, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
        t3 = -t3;
        t4 = b.y;
        if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(123, i, t2, t5, a, wB, bodyA, bodyB, t1, t3, vA, vB, invMassA, invIA, wA, invIB, t4, invMassB, b, 0, 0);
        t4 *= t3;
        this.x.set$y(t4);
        t4 = t1.get$K().get$col2().get$x();
        if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(124, invMassB, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, t4, b, 0, 0, 0);
        t3 = this.x.get$y();
        if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(125, invMassB, i, t2, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, t4, b, t3, 0, 0);
        t3 *= t4;
        t4 = b.x;
        if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(126, t3, i, t2, t5, a, wB, bodyA, bodyB, t1, t4, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
        vn1 = t3 + t4;
        t3 = this.x.get$y();
        if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(127, vn1, i, t2, t3, t5, a, wB, bodyA, bodyB, t1, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0);
        if (t3 >= 0.0 && vn1 >= 0.0) {
          this.d.setFrom$1(this.x).subLocal$1(a);
          this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.x);
          this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.y);
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          t3 = $.Vector_crossVectors(t2.get$rA(), this.P1);
          if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(128, i, t2, t5, wB, bodyA, bodyB, vA, vB, invIA, wA, invIB, t3, 0, 0, 0, 0, 0, 0, 0, 0);
          t4 = $.Vector_crossVectors(t5.get$rA(), this.P2);
          if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(129, i, t2, t5, wB, bodyA, bodyB, vA, vB, invIA, wA, invIB, t3, t4, 0, 0, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t3 + t4);
          t6 = $.Vector_crossVectors(t2.get$rB(), this.P1);
          if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(130, wB, bodyA, bodyB, wA0, i, t2, vA, t6, t5, vB, invIB, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t7 = $.Vector_crossVectors(t5.get$rB(), this.P2);
          if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(131, wA0, i, t2, t6, t5, t7, wB, bodyA, bodyB, vA, vB, invIB, 0, 0, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t6 + t7);
          t2.set$normalImpulse(this.x.get$x());
          t5.set$normalImpulse(this.x.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        this.x.set$x(0.0);
        this.x.set$y(0.0);
        vn1 = b.x;
        if (typeof vn1 !== 'number') return this.solveVelocityConstraints$0$bailout(132, i, t2, t5, a, vn1, t1, wB, bodyA, bodyB, vA, vB, invMassA, invIA, wA, invIB, invMassB, b, 0, 0, 0);
        vn2 = b.y;
        if (typeof vn2 !== 'number') return this.solveVelocityConstraints$0$bailout(133, i, t2, t5, a, vn1, vn2, t1, wB, bodyA, bodyB, vA, vB, invMassA, invIA, wA, invIB, invMassB, 0, 0, 0);
        if (vn1 >= 0.0 && vn2 >= 0.0) {
          this.d.setFrom$1(this.x).subLocal$1(a);
          this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.x);
          this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.y);
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          t3 = $.Vector_crossVectors(t2.get$rA(), this.P1);
          if (typeof t3 !== 'number') return this.solveVelocityConstraints$0$bailout(134, i, t2, t5, wB, bodyA, bodyB, t3, vA, vB, invIA, wA, invIB, 0, 0, 0, 0, 0, 0, 0, 0);
          t4 = $.Vector_crossVectors(t5.get$rA(), this.P2);
          if (typeof t4 !== 'number') return this.solveVelocityConstraints$0$bailout(135, i, t2, t5, wB, bodyA, bodyB, t3, vA, vB, t4, invIA, wA, invIB, 0, 0, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t3 + t4);
          t6 = $.Vector_crossVectors(t2.get$rB(), this.P1);
          if (typeof t6 !== 'number') return this.solveVelocityConstraints$0$bailout(136, wB, t6, bodyA, bodyB, i, t2, vA, vB, t5, invIB, wA0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t7 = $.Vector_crossVectors(t5.get$rB(), this.P2);
          if (typeof t7 !== 'number') return this.solveVelocityConstraints$0$bailout(137, t6, i, t2, t7, t5, wB, bodyA, bodyB, vA, vB, invIB, wA0, 0, 0, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t6 + t7);
          t2.set$normalImpulse(this.x.get$x());
          t5.set$normalImpulse(this.x.get$y());
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
 solveVelocityConstraints$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19) {
  switch (state) {
    case 1:
      t1 = env0;
      i = env1;
      break;
    case 2:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      wA = env3;
      i = env4;
      break;
    case 3:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      wA = env3;
      i = env4;
      wB = env5;
      break;
    case 4:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      wA = env3;
      i = env4;
      wB = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      break;
    case 5:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      wA = env3;
      i = env4;
      wB = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      break;
    case 6:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      wA = env3;
      i = env4;
      wB = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      invMassB = env10;
      break;
    case 7:
      i = env0;
      t1 = env1;
      bodyA = env2;
      bodyB = env3;
      wA = env4;
      wB = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      break;
    case 8:
      i = env0;
      friction = env1;
      t1 = env2;
      bodyA = env3;
      bodyB = env4;
      wA = env5;
      wB = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      break;
    case 9:
      i = env0;
      friction = env1;
      wB = env2;
      j = env3;
      bodyB = env4;
      t1 = env5;
      bodyA = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      wA = env13;
      t2 = env14;
      break;
    case 10:
      i = env0;
      t2 = env1;
      friction = env2;
      wB = env3;
      j = env4;
      bodyB = env5;
      t1 = env6;
      bodyA = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      wA = env13;
      invIB = env14;
      break;
    case 11:
      i = env0;
      ccp = env1;
      a = env2;
      t2 = env3;
      friction = env4;
      t3 = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      t1 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 12:
      i = env0;
      ccp = env1;
      a = env2;
      friction = env3;
      t3 = env4;
      t2 = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      t1 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 13:
      t1 = env0;
      bodyB = env1;
      i = env2;
      ccp = env3;
      a = env4;
      friction = env5;
      wB = env6;
      j = env7;
      t2 = env8;
      t3 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 14:
      bodyA = env0;
      i = env1;
      ccp = env2;
      a = env3;
      friction = env4;
      wB = env5;
      j = env6;
      bodyB = env7;
      t1 = env8;
      t3 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t2 = env16;
      wA = env17;
      break;
    case 15:
      i = env0;
      ccp = env1;
      a = env2;
      friction = env3;
      wB = env4;
      j = env5;
      bodyB = env6;
      t1 = env7;
      bodyA = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      wA = env15;
      t3 = env16;
      break;
    case 16:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      friction = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      t1 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 17:
      t4 = env0;
      t3 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      friction = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      t1 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 18:
      i = env0;
      t3 = env1;
      t4 = env2;
      ccp = env3;
      friction = env4;
      wB = env5;
      j = env6;
      bodyB = env7;
      t1 = env8;
      bodyA = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      wA = env16;
      break;
    case 19:
      i = env0;
      ccp = env1;
      friction = env2;
      t3 = env3;
      wB = env4;
      j = env5;
      bodyB = env6;
      t1 = env7;
      bodyA = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      wA = env15;
      break;
    case 20:
      t1 = env0;
      i = env1;
      ccp = env2;
      friction = env3;
      t3 = env4;
      wB = env5;
      j = env6;
      bodyB = env7;
      t5 = env8;
      bodyA = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      wA = env16;
      break;
    case 21:
      t1 = env0;
      i = env1;
      ccp = env2;
      friction = env3;
      wB = env4;
      j = env5;
      t5 = env6;
      bodyB = env7;
      t3 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      bodyA = env15;
      wA = env16;
      break;
    case 22:
      t1 = env0;
      bodyA = env1;
      i = env2;
      ccp = env3;
      friction = env4;
      wB = env5;
      j = env6;
      t5 = env7;
      bodyB = env8;
      t3 = env9;
      vA = env10;
      t6 = env11;
      invMassA = env12;
      invIA = env13;
      vB = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 23:
      i = env0;
      ccp = env1;
      friction = env2;
      wB = env3;
      j = env4;
      bodyB = env5;
      t1 = env6;
      bodyA = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t5 = env14;
      wA = env15;
      vt = env16;
      break;
    case 24:
      lambda = env0;
      t5 = env1;
      i = env2;
      ccp = env3;
      friction = env4;
      wB = env5;
      j = env6;
      bodyB = env7;
      t1 = env8;
      bodyA = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      wA = env16;
      break;
    case 25:
      lambda = env0;
      maxFriction = env1;
      t5 = env2;
      i = env3;
      ccp = env4;
      friction = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      t1 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 26:
      i = env0;
      ccp = env1;
      newImpulse = env2;
      friction = env3;
      wB = env4;
      j = env5;
      bodyB = env6;
      t1 = env7;
      bodyA = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      wA = env14;
      invIB = env15;
      break;
    case 27:
      i = env0;
      ccp = env1;
      newImpulse = env2;
      t7 = env3;
      friction = env4;
      wB = env5;
      j = env6;
      bodyB = env7;
      t1 = env8;
      bodyA = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      wA = env16;
      break;
    case 28:
      i = env0;
      ccp = env1;
      newImpulse = env2;
      friction = env3;
      lambda0 = env4;
      t7 = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      t1 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      break;
    case 29:
      t1 = env0;
      bodyB = env1;
      i = env2;
      ccp = env3;
      newImpulse = env4;
      friction = env5;
      lambda0 = env6;
      wB = env7;
      j = env8;
      t7 = env9;
      Px = env10;
      bodyA = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      wA = env18;
      break;
    case 30:
      t1 = env0;
      bodyA = env1;
      i = env2;
      ccp = env3;
      newImpulse = env4;
      friction = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      Px = env9;
      Py = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      wA = env18;
      break;
    case 31:
      t1 = env0;
      bodyA = env1;
      i = env2;
      ccp = env3;
      newImpulse = env4;
      friction = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      Px = env9;
      Py = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t8 = env17;
      wA = env18;
      break;
    case 32:
      t1 = env0;
      t9 = env1;
      i = env2;
      ccp = env3;
      newImpulse = env4;
      friction = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      Px = env9;
      Py = env10;
      vA = env11;
      vB = env12;
      bodyA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      wA = env17;
      invMassA = env18;
      break;
    case 33:
      t1 = env0;
      t9 = env1;
      i = env2;
      t10 = env3;
      ccp = env4;
      newImpulse = env5;
      friction = env6;
      wB = env7;
      j = env8;
      bodyB = env9;
      Px = env10;
      Py = env11;
      vA = env12;
      vB = env13;
      bodyA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      wA = env18;
      invMassA = env19;
      break;
    case 34:
      t1 = env0;
      i = env1;
      ccp = env2;
      newImpulse = env3;
      friction = env4;
      wA = env5;
      t11 = env6;
      wB = env7;
      j = env8;
      bodyB = env9;
      Px = env10;
      Py = env11;
      vA = env12;
      vB = env13;
      bodyA = env14;
      invMassA = env15;
      invMassB = env16;
      invIB = env17;
      invIA = env18;
      break;
    case 35:
      t1 = env0;
      i = env1;
      ccp = env2;
      newImpulse = env3;
      friction = env4;
      wA = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      Px = env9;
      Py = env10;
      t12 = env11;
      vB = env12;
      bodyA = env13;
      vA = env14;
      invMassB = env15;
      invIB = env16;
      invIA = env17;
      invMassA = env18;
      break;
    case 36:
      invMassB = env0;
      i = env1;
      ccp = env2;
      newImpulse = env3;
      friction = env4;
      wA = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      Px = env9;
      Py = env10;
      vA = env11;
      t1 = env12;
      bodyA = env13;
      invMassA = env14;
      vB = env15;
      invIB = env16;
      invIA = env17;
      t13 = env18;
      break;
    case 37:
      t14 = env0;
      i = env1;
      ccp = env2;
      newImpulse = env3;
      friction = env4;
      wA = env5;
      wB = env6;
      j = env7;
      bodyB = env8;
      Px = env9;
      bodyA = env10;
      vA = env11;
      t1 = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invIB = env16;
      invMassB = env17;
      t13 = env18;
      break;
    case 38:
      i = env0;
      wB = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      t2 = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      wA = env12;
      break;
    case 39:
      i = env0;
      wB = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      vA = env5;
      vB = env6;
      invMassA = env7;
      invIA = env8;
      invMassB = env9;
      invIB = env10;
      t2 = env11;
      wA = env12;
      break;
    case 40:
      t3 = env0;
      i = env1;
      wB = env2;
      bodyA = env3;
      bodyB = env4;
      t1 = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      ccp = env12;
      wA = env13;
      a1 = env14;
      t2 = env15;
      break;
    case 41:
      t3 = env0;
      t2 = env1;
      i = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      wA = env14;
      a1 = env15;
      break;
    case 42:
      i = env0;
      t2 = env1;
      t3 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      wA = env14;
      a1 = env15;
      break;
    case 43:
      i = env0;
      t3 = env1;
      t2 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      wA = env14;
      a1 = env15;
      break;
    case 44:
      i = env0;
      wB = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      t3 = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      ccp = env12;
      wA = env13;
      a1 = env14;
      break;
    case 45:
      i = env0;
      wB = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      t3 = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      ccp = env12;
      wA = env13;
      a1 = env14;
      t4 = env15;
      break;
    case 46:
      wA = env0;
      a1 = env1;
      i = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      t4 = env8;
      t3 = env9;
      invMassA = env10;
      vB = env11;
      invMassB = env12;
      invIA = env13;
      ccp = env14;
      invIB = env15;
      break;
    case 47:
      wA = env0;
      i = env1;
      wB = env2;
      bodyA = env3;
      bodyB = env4;
      t1 = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      t3 = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      t4 = env14;
      break;
    case 48:
      b = env0;
      t3 = env1;
      i = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      wA = env14;
      break;
    case 49:
      b = env0;
      t3 = env1;
      i = env2;
      t5 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      ccp = env14;
      wA = env15;
      break;
    case 50:
      b = env0;
      i = env1;
      t5 = env2;
      t3 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      ccp = env14;
      wA = env15;
      break;
    case 51:
      i = env0;
      t5 = env1;
      t3 = env2;
      t6 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      ccp = env14;
      wA = env15;
      break;
    case 52:
      i = env0;
      vn = env1;
      t5 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      wA = env14;
      break;
    case 53:
      wA = env0;
      i = env1;
      vn = env2;
      t5 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t7 = env7;
      vA = env8;
      t1 = env9;
      invMassA = env10;
      invIA = env11;
      vB = env12;
      invMassB = env13;
      invIB = env14;
      ccp = env15;
      break;
    case 54:
      wA = env0;
      i = env1;
      wB = env2;
      bodyA = env3;
      bodyB = env4;
      t1 = env5;
      lambda = env6;
      t5 = env7;
      vB = env8;
      vA = env9;
      invIA = env10;
      invMassA = env11;
      invIB = env12;
      invMassB = env13;
      ccp = env14;
      break;
    case 55:
      newImpulse = env0;
      t2 = env1;
      i = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      wA = env14;
      break;
    case 56:
      newImpulse = env0;
      i = env1;
      lambda = env2;
      t2 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      ccp = env14;
      wA = env15;
      break;
    case 57:
      newImpulse = env0;
      i = env1;
      lambda = env2;
      Px = env3;
      t2 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      ccp = env14;
      wA = env15;
      break;
    case 58:
      newImpulse = env0;
      i = env1;
      Px = env2;
      Py = env3;
      t2 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      ccp = env14;
      wA = env15;
      break;
    case 59:
      newImpulse = env0;
      i = env1;
      Px = env2;
      Py = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t3 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      ccp = env14;
      wA = env15;
      break;
    case 60:
      newImpulse = env0;
      i = env1;
      Px = env2;
      Py = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      ccp = env12;
      wA = env13;
      t4 = env14;
      break;
    case 61:
      newImpulse = env0;
      i = env1;
      Px = env2;
      Py = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      ccp = env12;
      wA = env13;
      t4 = env14;
      t5 = env15;
      break;
    case 62:
      newImpulse = env0;
      i = env1;
      wA = env2;
      t6 = env3;
      Px = env4;
      Py = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      vA = env9;
      vB = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      break;
    case 63:
      newImpulse = env0;
      i = env1;
      wA = env2;
      Px = env3;
      Py = env4;
      t7 = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      vA = env9;
      vB = env10;
      invMassB = env11;
      invIB = env12;
      ccp = env13;
      break;
    case 64:
      newImpulse = env0;
      i = env1;
      wA = env2;
      Px = env3;
      Py = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t8 = env8;
      vA = env9;
      vB = env10;
      invIB = env11;
      ccp = env12;
      break;
    case 65:
      newImpulse = env0;
      i = env1;
      wA = env2;
      Px = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      vA = env7;
      vB = env8;
      t8 = env9;
      t9 = env10;
      invIB = env11;
      ccp = env12;
      break;
    case 66:
      i = env0;
      t2 = env1;
      wB = env2;
      bodyA = env3;
      bodyB = env4;
      t1 = env5;
      vA = env6;
      vB = env7;
      invMassA = env8;
      invIA = env9;
      wA = env10;
      invIB = env11;
      invMassB = env12;
      break;
    case 67:
      i = env0;
      cp1 = env1;
      t2 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t1 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      wA = env11;
      invIB = env12;
      invMassB = env13;
      break;
    case 68:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      t2 = env4;
      t3 = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      vA = env9;
      t1 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 69:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      t3 = env6;
      bodyB = env7;
      t2 = env8;
      vA = env9;
      t1 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 70:
      t2 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      t3 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 71:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      wA = env12;
      invIB = env13;
      t3 = env14;
      invMassB = env15;
      t2 = env16;
      break;
    case 72:
      t3 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      break;
    case 73:
      t3 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      t4 = env4;
      a = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 74:
      i = env0;
      cp1 = env1;
      t4 = env2;
      cp2 = env3;
      t3 = env4;
      a = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 75:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      t3 = env3;
      a = env4;
      t4 = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 76:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      t3 = env8;
      vA = env9;
      t5 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 77:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      t3 = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      t5 = env16;
      break;
    case 78:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      wA = env12;
      invIB = env13;
      t3 = env14;
      invMassB = env15;
      t5 = env16;
      break;
    case 79:
      t3 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      t5 = env16;
      break;
    case 80:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      t5 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      break;
    case 81:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      t5 = env3;
      t6 = env4;
      a = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 82:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      t6 = env4;
      t5 = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 83:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      t5 = env4;
      wB = env5;
      t6 = env6;
      bodyB = env7;
      bodyA = env8;
      vA = env9;
      t1 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 84:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      wA = env12;
      invIB = env13;
      t5 = env14;
      invMassB = env15;
      break;
    case 85:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      wA = env12;
      invIB = env13;
      t5 = env14;
      invMassB = env15;
      t7 = env16;
      break;
    case 86:
      t5 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      t7 = env16;
      break;
    case 87:
      t5 = env0;
      t8 = env1;
      i = env2;
      cp1 = env3;
      cp2 = env4;
      a = env5;
      wB = env6;
      t1 = env7;
      bodyB = env8;
      bodyA = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      t7 = env17;
      break;
    case 88:
      i = env0;
      cp1 = env1;
      vn1 = env2;
      cp2 = env3;
      t7 = env4;
      a = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 89:
      i = env0;
      cp1 = env1;
      vn1 = env2;
      cp2 = env3;
      t7 = env4;
      t9 = env5;
      a = env6;
      wB = env7;
      bodyA = env8;
      bodyB = env9;
      t1 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      wA = env15;
      invIB = env16;
      invMassB = env17;
      break;
    case 90:
      i = env0;
      cp1 = env1;
      vn1 = env2;
      cp2 = env3;
      a = env4;
      t9 = env5;
      t7 = env6;
      wB = env7;
      bodyA = env8;
      bodyB = env9;
      t1 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      wA = env15;
      invIB = env16;
      invMassB = env17;
      break;
    case 91:
      i = env0;
      cp1 = env1;
      vn1 = env2;
      cp2 = env3;
      a = env4;
      t9 = env5;
      t7 = env6;
      t10 = env7;
      wB = env8;
      bodyA = env9;
      bodyB = env10;
      vA = env11;
      t1 = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      wA = env16;
      invIB = env17;
      invMassB = env18;
      break;
    case 92:
      i = env0;
      cp1 = env1;
      vn1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vn2 = env9;
      vA = env10;
      t9 = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      wA = env15;
      invIB = env16;
      invMassB = env17;
      break;
    case 93:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vn2 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      t11 = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      t9 = env17;
      break;
    case 94:
      t9 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 95:
      t9 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      t12 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 96:
      t12 = env0;
      i = env1;
      cp1 = env2;
      t9 = env3;
      cp2 = env4;
      a = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 97:
      t12 = env0;
      i = env1;
      cp1 = env2;
      t9 = env3;
      cp2 = env4;
      a = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      t13 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      wA = env15;
      invIB = env16;
      invMassB = env17;
      b = env18;
      break;
    case 98:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      t12 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 99:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      t12 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      t14 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 100:
      t12 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      t14 = env7;
      bodyB = env8;
      vA = env9;
      t1 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 101:
      t12 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      t14 = env7;
      bodyB = env8;
      t15 = env9;
      vA = env10;
      t1 = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      wA = env15;
      invIB = env16;
      invMassB = env17;
      b = env18;
      break;
    case 102:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      t14 = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 103:
      t16 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      t14 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 104:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      t17 = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 105:
      i = env0;
      cp1 = env1;
      t18 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      t17 = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 106:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      t2 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      vA = env8;
      t1 = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 107:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      t2 = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 108:
      i = env0;
      cp1 = env1;
      t2 = env2;
      cp2 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      wA = env10;
      invIB = env11;
      break;
    case 109:
      i = env0;
      cp1 = env1;
      t2 = env2;
      cp2 = env3;
      t3 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      wA = env11;
      invIB = env12;
      break;
    case 110:
      wA0 = env0;
      wB = env1;
      bodyA = env2;
      bodyB = env3;
      t4 = env4;
      i = env5;
      cp1 = env6;
      vA = env7;
      vB = env8;
      cp2 = env9;
      invIB = env10;
      break;
    case 111:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      wA0 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t4 = env7;
      vA = env8;
      vB = env9;
      t5 = env10;
      invIB = env11;
      break;
    case 112:
      i = env0;
      cp1 = env1;
      t2 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 113:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      t2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      t3 = env15;
      invMassB = env16;
      b = env17;
      break;
    case 114:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      t3 = env6;
      bodyB = env7;
      vA = env8;
      t1 = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 115:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      t3 = env6;
      bodyB = env7;
      t2 = env8;
      vA = env9;
      t1 = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 116:
      invMassB = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      t3 = env13;
      wA = env14;
      invIB = env15;
      t2 = env16;
      b = env17;
      break;
    case 117:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      vn2 = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      t2 = env17;
      break;
    case 118:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      t2 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      wA = env10;
      invIB = env11;
      break;
    case 119:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      t2 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t3 = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      wA = env11;
      invIB = env12;
      break;
    case 120:
      wB = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      cp1 = env4;
      vA = env5;
      vB = env6;
      cp2 = env7;
      wA0 = env8;
      invIB = env9;
      t4 = env10;
      break;
    case 121:
      t5 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t4 = env11;
      break;
    case 122:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      t2 = env6;
      bodyB = env7;
      vA = env8;
      t1 = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 123:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      wB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      t2 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      t3 = env15;
      invMassB = env16;
      b = env17;
      break;
    case 124:
      invMassB = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      t3 = env15;
      b = env16;
      break;
    case 125:
      invMassB = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      t3 = env15;
      b = env16;
      t2 = env17;
      break;
    case 126:
      t2 = env0;
      i = env1;
      cp1 = env2;
      cp2 = env3;
      a = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      t1 = env8;
      t3 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 127:
      vn1 = env0;
      i = env1;
      cp1 = env2;
      t2 = env3;
      cp2 = env4;
      a = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      b = env17;
      break;
    case 128:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      vA = env6;
      vB = env7;
      invIA = env8;
      wA = env9;
      invIB = env10;
      t2 = env11;
      break;
    case 129:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      vA = env6;
      vB = env7;
      invIA = env8;
      wA = env9;
      invIB = env10;
      t2 = env11;
      t3 = env12;
      break;
    case 130:
      wB = env0;
      bodyA = env1;
      bodyB = env2;
      wA0 = env3;
      i = env4;
      cp1 = env5;
      vA = env6;
      t4 = env7;
      cp2 = env8;
      vB = env9;
      invIB = env10;
      break;
    case 131:
      wA0 = env0;
      i = env1;
      cp1 = env2;
      t4 = env3;
      cp2 = env4;
      t5 = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      vA = env9;
      vB = env10;
      invIB = env11;
      break;
    case 132:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      vn1 = env4;
      t1 = env5;
      wB = env6;
      bodyA = env7;
      bodyB = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      wA = env13;
      invIB = env14;
      invMassB = env15;
      b = env16;
      break;
    case 133:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      a = env3;
      vn1 = env4;
      vn2 = env5;
      t1 = env6;
      wB = env7;
      bodyA = env8;
      bodyB = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      wA = env14;
      invIB = env15;
      invMassB = env16;
      break;
    case 134:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t2 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      wA = env10;
      invIB = env11;
      break;
    case 135:
      i = env0;
      cp1 = env1;
      cp2 = env2;
      wB = env3;
      bodyA = env4;
      bodyB = env5;
      t2 = env6;
      vA = env7;
      vB = env8;
      t3 = env9;
      invIA = env10;
      wA = env11;
      invIB = env12;
      break;
    case 136:
      wB = env0;
      t4 = env1;
      bodyA = env2;
      bodyB = env3;
      i = env4;
      cp1 = env5;
      vA = env6;
      vB = env7;
      cp2 = env8;
      invIB = env9;
      wA0 = env10;
      break;
    case 137:
      t4 = env0;
      i = env1;
      cp1 = env2;
      t5 = env3;
      cp2 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      wA0 = env11;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
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
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = this.constraintCount;
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.constraints;
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1 = t1[i];
            var bodyA = t1.get$bodyA();
            var bodyB = t1.get$bodyB();
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
            var t3 = t1.get$normal().get$y();
            if (typeof t3 !== 'number') throw $.iae(t3);
            t3 *= 1.0;
            this.tangent.set$x(t3);
            t3 = t1.get$normal().get$x();
            if (typeof t3 !== 'number') throw $.iae(t3);
            t3 *= -1.0;
            this.tangent.set$y(t3);
            var friction = t1.get$friction();
          case 8:
            state = 0;
            var j = 0;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
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
            L1: while (true) {
              switch (state) {
                case 0:
                  t2 = t1.get$pointCount();
                case 9:
                  state = 0;
                  if (!$.ltB(j, t2)) break L1;
                  t2 = t1.get$points();
                case 10:
                  state = 0;
                  var ccp = $.index(t2, j);
                  var a = ccp.get$rA();
                  t2 = $.neg(wB);
                  t3 = ccp.get$rB().get$y();
                case 11:
                  state = 0;
                  t3 = $.mul(t2, t3);
                  t2 = vB.get$x();
                case 12:
                  state = 0;
                  t2 = $.add(t3, t2);
                  t3 = vA.get$x();
                case 13:
                  state = 0;
                  t3 = $.sub(t2, t3);
                  t2 = a.get$y();
                case 14:
                  state = 0;
                  t3 = $.add(t3, $.mul(wA, t2));
                  this.dv.set$x(t3);
                  t3 = ccp.get$rB().get$x();
                case 15:
                  state = 0;
                  t3 = $.mul(wB, t3);
                  var t4 = vB.get$y();
                case 16:
                  state = 0;
                  t4 = $.add(t3, t4);
                  t3 = vA.get$y();
                case 17:
                  state = 0;
                  t3 = $.sub(t4, t3);
                  t4 = a.get$x();
                case 18:
                  state = 0;
                  t3 = $.sub(t3, $.mul(wA, t4));
                  this.dv.set$y(t3);
                  t3 = this.dv.get$x();
                case 19:
                  state = 0;
                  var t5 = this.tangent.get$x();
                case 20:
                  state = 0;
                  t5 = $.mul(t3, t5);
                  t3 = this.dv.get$y();
                case 21:
                  state = 0;
                  var t6 = this.tangent.get$y();
                case 22:
                  state = 0;
                  var vt = $.add(t5, $.mul(t3, t6));
                  t5 = ccp.get$tangentMass();
                case 23:
                  state = 0;
                  var lambda = $.mul(t5, $.neg(vt));
                  t5 = ccp.get$normalImpulse();
                case 24:
                  state = 0;
                  var maxFriction = $.mul(friction, t5);
                  t5 = ccp.get$tangentImpulse();
                case 25:
                  state = 0;
                  var newImpulse = $.MathBox_clamp($.add(t5, lambda), $.neg(maxFriction), maxFriction);
                case 26:
                  state = 0;
                  var t7 = ccp.get$tangentImpulse();
                case 27:
                  state = 0;
                  var lambda0 = $.sub(newImpulse, t7);
                  t7 = this.tangent.get$x();
                case 28:
                  state = 0;
                  var Px = $.mul(t7, lambda0);
                  t7 = this.tangent.get$y();
                case 29:
                  state = 0;
                  var Py = $.mul(t7, lambda0);
                  t7 = vA.get$x();
                case 30:
                  state = 0;
                  vA.set$x($.sub(t7, $.mul(Px, invMassA)));
                  var t8 = vA.get$y();
                case 31:
                  state = 0;
                  vA.set$y($.sub(t8, $.mul(Py, invMassA)));
                  var t9 = ccp.get$rA().get$x();
                case 32:
                  state = 0;
                  t9 = $.mul(t9, Py);
                  var t10 = ccp.get$rA().get$y();
                case 33:
                  state = 0;
                  wA = $.sub(wA, $.mul(invIA, $.sub(t9, $.mul(t10, Px))));
                  var t11 = vB.get$x();
                case 34:
                  state = 0;
                  vB.set$x($.add(t11, $.mul(Px, invMassB)));
                  var t12 = vB.get$y();
                case 35:
                  state = 0;
                  vB.set$y($.add(t12, $.mul(Py, invMassB)));
                  var t13 = ccp.get$rB().get$x();
                case 36:
                  state = 0;
                  t13 = $.mul(t13, Py);
                  var t14 = ccp.get$rB().get$y();
                case 37:
                  state = 0;
                  wB = $.add(wB, $.mul(invIB, $.sub(t13, $.mul(t14, Px))));
                  ccp.set$tangentImpulse(newImpulse);
                  ++j;
              }
            }
            t2 = t1.get$pointCount();
          case 38:
            state = 0;
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
            if (state == 39 || state == 40 || state == 41 || state == 42 || state == 43 || state == 44 || state == 45 || state == 46 || state == 47 || state == 48 || state == 49 || state == 50 || state == 51 || state == 52 || state == 53 || state == 54 || state == 55 || state == 56 || state == 57 || state == 58 || state == 59 || state == 60 || state == 61 || state == 62 || state == 63 || state == 64 || state == 65 || (state == 0 && $.eqB(t2, 1))) {
              switch (state) {
                case 0:
                  t2 = t1.get$points();
                case 39:
                  state = 0;
                  ccp = $.index(t2, 0);
                  var a1 = ccp.get$rA();
                  t2 = $.neg(wB);
                  t3 = ccp.get$rB().get$y();
                case 40:
                  state = 0;
                  t3 = $.mul(t2, t3);
                  t2 = vB.get$x();
                case 41:
                  state = 0;
                  t2 = $.add(t3, t2);
                  t3 = vA.get$x();
                case 42:
                  state = 0;
                  t3 = $.sub(t2, t3);
                  t2 = a1.get$y();
                case 43:
                  state = 0;
                  t3 = $.add(t3, $.mul(wA, t2));
                  this.dv.set$x(t3);
                  t3 = ccp.get$rB().get$x();
                case 44:
                  state = 0;
                  t3 = $.mul(wB, t3);
                  t4 = vB.get$y();
                case 45:
                  state = 0;
                  t4 = $.add(t3, t4);
                  t3 = vA.get$y();
                case 46:
                  state = 0;
                  t3 = $.sub(t4, t3);
                  t4 = a1.get$x();
                case 47:
                  state = 0;
                  t3 = $.sub(t3, $.mul(wA, t4));
                  this.dv.set$y(t3);
                  var b = t1.get$normal();
                  t3 = this.dv.get$x();
                case 48:
                  state = 0;
                  t5 = b.get$x();
                case 49:
                  state = 0;
                  t5 = $.mul(t3, t5);
                  t3 = this.dv.get$y();
                case 50:
                  state = 0;
                  t6 = b.get$y();
                case 51:
                  state = 0;
                  var vn = $.add(t5, $.mul(t3, t6));
                  t5 = ccp.get$normalMass();
                case 52:
                  state = 0;
                  t5 = $.neg(t5);
                  t7 = ccp.get$velocityBias();
                case 53:
                  state = 0;
                  lambda = $.mul(t5, $.sub(vn, t7));
                  t5 = ccp.get$normalImpulse();
                case 54:
                  state = 0;
                  a = $.add(t5, lambda);
                  newImpulse = $.gtB(a, 0.0) ? a : 0.0;
                  t2 = ccp.get$normalImpulse();
                case 55:
                  state = 0;
                  lambda = $.sub(newImpulse, t2);
                  t2 = t1.get$normal().get$x();
                case 56:
                  state = 0;
                  Px = $.mul(t2, lambda);
                  t2 = t1.get$normal().get$y();
                case 57:
                  state = 0;
                  Py = $.mul(t2, lambda);
                  t2 = vA.get$x();
                case 58:
                  state = 0;
                  vA.set$x($.sub(t2, $.mul(Px, invMassA)));
                  t3 = vA.get$y();
                case 59:
                  state = 0;
                  vA.set$y($.sub(t3, $.mul(Py, invMassA)));
                  t4 = ccp.get$rA().get$x();
                case 60:
                  state = 0;
                  t4 = $.mul(t4, Py);
                  t5 = ccp.get$rA().get$y();
                case 61:
                  state = 0;
                  wA = $.sub(wA, $.mul(invIA, $.sub(t4, $.mul(t5, Px))));
                  t6 = vB.get$x();
                case 62:
                  state = 0;
                  vB.set$x($.add(t6, $.mul(Px, invMassB)));
                  t7 = vB.get$y();
                case 63:
                  state = 0;
                  vB.set$y($.add(t7, $.mul(Py, invMassB)));
                  t8 = ccp.get$rB().get$x();
                case 64:
                  state = 0;
                  t8 = $.mul(t8, Py);
                  t9 = ccp.get$rB().get$y();
                case 65:
                  state = 0;
                  wB = $.add(wB, $.mul(invIB, $.sub(t8, $.mul(t9, Px))));
                  ccp.set$normalImpulse(newImpulse);
              }
            } else {
              switch (state) {
                case 0:
                  t2 = t1.get$points();
                case 66:
                  state = 0;
                  var cp1 = $.index(t2, 0);
                  t2 = t1.get$points();
                case 67:
                  state = 0;
                  var cp2 = $.index(t2, 1);
                  a = $.Vector$(cp1.get$normalImpulse(), cp2.get$normalImpulse());
                  t2 = $.neg(wB);
                  t3 = cp1.get$rB().get$y();
                case 68:
                  state = 0;
                  t3 = $.mul(t2, t3);
                  t2 = vB.get$x();
                case 69:
                  state = 0;
                  t2 = $.add(t3, t2);
                  t3 = vA.get$x();
                case 70:
                  state = 0;
                  t3 = $.sub(t2, t3);
                  t2 = cp1.get$rA().get$y();
                case 71:
                  state = 0;
                  t3 = $.add(t3, $.mul(wA, t2));
                  this.dv1.set$x(t3);
                  t3 = cp1.get$rB().get$x();
                case 72:
                  state = 0;
                  t3 = $.mul(wB, t3);
                  t4 = vB.get$y();
                case 73:
                  state = 0;
                  t4 = $.add(t3, t4);
                  t3 = vA.get$y();
                case 74:
                  state = 0;
                  t3 = $.sub(t4, t3);
                  t4 = cp1.get$rA().get$x();
                case 75:
                  state = 0;
                  t3 = $.sub(t3, $.mul(wA, t4));
                  this.dv1.set$y(t3);
                  t3 = $.neg(wB);
                  t5 = cp2.get$rB().get$y();
                case 76:
                  state = 0;
                  t5 = $.mul(t3, t5);
                  t3 = vB.get$x();
                case 77:
                  state = 0;
                  t3 = $.add(t5, t3);
                  t5 = vA.get$x();
                case 78:
                  state = 0;
                  t5 = $.sub(t3, t5);
                  t3 = cp2.get$rA().get$y();
                case 79:
                  state = 0;
                  t5 = $.add(t5, $.mul(wA, t3));
                  this.dv2.set$x(t5);
                  t5 = cp2.get$rB().get$x();
                case 80:
                  state = 0;
                  t5 = $.mul(wB, t5);
                  t6 = vB.get$y();
                case 81:
                  state = 0;
                  t6 = $.add(t5, t6);
                  t5 = vA.get$y();
                case 82:
                  state = 0;
                  t5 = $.sub(t6, t5);
                  t6 = cp2.get$rA().get$x();
                case 83:
                  state = 0;
                  t5 = $.sub(t5, $.mul(wA, t6));
                  this.dv2.set$y(t5);
                  t5 = this.dv1.get$x();
                case 84:
                  state = 0;
                  t7 = t1.get$normal().get$x();
                case 85:
                  state = 0;
                  t7 = $.mul(t5, t7);
                  t5 = this.dv1.get$y();
                case 86:
                  state = 0;
                  t8 = t1.get$normal().get$y();
                case 87:
                  state = 0;
                  var vn1 = $.add(t7, $.mul(t5, t8));
                  t7 = this.dv2.get$x();
                case 88:
                  state = 0;
                  t9 = t1.get$normal().get$x();
                case 89:
                  state = 0;
                  t9 = $.mul(t7, t9);
                  t7 = this.dv2.get$y();
                case 90:
                  state = 0;
                  t10 = t1.get$normal().get$y();
                case 91:
                  state = 0;
                  var vn2 = $.add(t9, $.mul(t7, t10));
                  t9 = cp1.get$velocityBias();
                case 92:
                  state = 0;
                  t9 = $.sub(vn1, t9);
                  t11 = cp2.get$velocityBias();
                case 93:
                  state = 0;
                  b = $.Vector$(t9, $.sub(vn2, t11));
                  t9 = t1.get$K().get$col1().get$x();
                case 94:
                  state = 0;
                  t12 = a.x;
                case 95:
                  state = 0;
                  t12 = $.mul(t9, t12);
                  t9 = t1.get$K().get$col2().get$x();
                case 96:
                  state = 0;
                  t13 = a.y;
                case 97:
                  state = 0;
                  t12 = $.add(t12, $.mul(t9, t13));
                  this.temp2.set$x(t12);
                  t12 = t1.get$K().get$col1().get$y();
                case 98:
                  state = 0;
                  t14 = a.x;
                case 99:
                  state = 0;
                  t14 = $.mul(t12, t14);
                  t12 = t1.get$K().get$col2().get$y();
                case 100:
                  state = 0;
                  var t15 = a.y;
                case 101:
                  state = 0;
                  t14 = $.add(t14, $.mul(t12, t15));
                  this.temp2.set$y(t14);
                  t14 = b.x;
                case 102:
                  state = 0;
                  var t16 = this.temp2.get$x();
                case 103:
                  state = 0;
                  b.x = $.sub(t14, t16);
                  var t17 = b.y;
                case 104:
                  state = 0;
                  var t18 = this.temp2.get$y();
                case 105:
                  state = 0;
                  b.y = $.sub(t17, t18);
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
                  L2: while (true) {
                    switch (state) {
                      case 0:
                        if (!true) break L2;
                        $.Matrix22_mulMatrixAndVectorToOut(t1.get$normalMass(), b, this.x);
                        this.x.mulLocal$1(-1);
                        t2 = this.x.get$x();
                      case 106:
                        state = 0;
                      case 107:
                        if (state == 107 || (state == 0 && $.geB(t2, 0.0))) {
                          switch (state) {
                            case 0:
                              t2 = this.x.get$y();
                            case 107:
                              state = 0;
                              t2 = $.geB(t2, 0.0);
                          }
                        } else {
                          t2 = false;
                        }
                      case 108:
                      case 109:
                      case 110:
                      case 111:
                        if (state == 108 || state == 109 || state == 110 || state == 111 || (state == 0 && t2)) {
                          switch (state) {
                            case 0:
                              this.d.setFrom$1(this.x).subLocal$1(a);
                              this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$x());
                              this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$y());
                              this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                              vA.subLocal$1(this.temp2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                              vB.addLocal$1(this.temp2);
                              t2 = $.Vector_crossVectors(cp1.get$rA(), this.P1);
                            case 108:
                              state = 0;
                              t3 = $.Vector_crossVectors(cp2.get$rA(), this.P2);
                            case 109:
                              state = 0;
                              var wA0 = $.sub(wA, $.mul(invIA, $.add(t2, t3)));
                              t4 = $.Vector_crossVectors(cp1.get$rB(), this.P1);
                            case 110:
                              state = 0;
                              t5 = $.Vector_crossVectors(cp2.get$rB(), this.P2);
                            case 111:
                              state = 0;
                              var wB0 = $.add(wB, $.mul(invIB, $.add(t4, t5)));
                              cp1.set$normalImpulse(this.x.get$x());
                              cp2.set$normalImpulse(this.x.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        t2 = cp1.get$normalMass();
                      case 112:
                        state = 0;
                        t2 = $.neg(t2);
                        t3 = b.x;
                      case 113:
                        state = 0;
                        t3 = $.mul(t2, t3);
                        this.x.set$x(t3);
                        this.x.set$y(0.0);
                        t3 = t1.get$K().get$col1().get$y();
                      case 114:
                        state = 0;
                        t2 = this.x.get$x();
                      case 115:
                        state = 0;
                        t2 = $.mul(t3, t2);
                        t3 = b.y;
                      case 116:
                        state = 0;
                        vn2 = $.add(t2, t3);
                        t2 = this.x.get$x();
                      case 117:
                        state = 0;
                      case 118:
                      case 119:
                      case 120:
                      case 121:
                        if (state == 118 || state == 119 || state == 120 || state == 121 || (state == 0 && ($.geB(t2, 0.0) && $.geB(vn2, 0.0)))) {
                          switch (state) {
                            case 0:
                              this.d.setFrom$1(this.x).subLocal$1(a);
                              this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$x());
                              this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$y());
                              this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                              vA.subLocal$1(this.temp2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                              vB.addLocal$1(this.temp2);
                              t2 = $.Vector_crossVectors(cp1.get$rA(), this.P1);
                            case 118:
                              state = 0;
                              t3 = $.Vector_crossVectors(cp2.get$rA(), this.P2);
                            case 119:
                              state = 0;
                              wA0 = $.sub(wA, $.mul(invIA, $.add(t2, t3)));
                              t4 = $.Vector_crossVectors(cp1.get$rB(), this.P1);
                            case 120:
                              state = 0;
                              t5 = $.Vector_crossVectors(cp2.get$rB(), this.P2);
                            case 121:
                              state = 0;
                              wB0 = $.add(wB, $.mul(invIB, $.add(t4, t5)));
                              cp1.set$normalImpulse(this.x.get$x());
                              cp2.set$normalImpulse(this.x.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        this.x.set$x(0.0);
                        t2 = cp2.get$normalMass();
                      case 122:
                        state = 0;
                        t2 = $.neg(t2);
                        t3 = b.y;
                      case 123:
                        state = 0;
                        t3 = $.mul(t2, t3);
                        this.x.set$y(t3);
                        t3 = t1.get$K().get$col2().get$x();
                      case 124:
                        state = 0;
                        t2 = this.x.get$y();
                      case 125:
                        state = 0;
                        t2 = $.mul(t3, t2);
                        t3 = b.x;
                      case 126:
                        state = 0;
                        vn1 = $.add(t2, t3);
                        t2 = this.x.get$y();
                      case 127:
                        state = 0;
                      case 128:
                      case 129:
                      case 130:
                      case 131:
                        if (state == 128 || state == 129 || state == 130 || state == 131 || (state == 0 && ($.geB(t2, 0.0) && $.geB(vn1, 0.0)))) {
                          switch (state) {
                            case 0:
                              this.d.setFrom$1(this.x).subLocal$1(a);
                              this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$x());
                              this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$y());
                              this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                              vA.subLocal$1(this.temp2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                              vB.addLocal$1(this.temp2);
                              t2 = $.Vector_crossVectors(cp1.get$rA(), this.P1);
                            case 128:
                              state = 0;
                              t3 = $.Vector_crossVectors(cp2.get$rA(), this.P2);
                            case 129:
                              state = 0;
                              wA0 = $.sub(wA, $.mul(invIA, $.add(t2, t3)));
                              t4 = $.Vector_crossVectors(cp1.get$rB(), this.P1);
                            case 130:
                              state = 0;
                              t5 = $.Vector_crossVectors(cp2.get$rB(), this.P2);
                            case 131:
                              state = 0;
                              wB0 = $.add(wB, $.mul(invIB, $.add(t4, t5)));
                              cp1.set$normalImpulse(this.x.get$x());
                              cp2.set$normalImpulse(this.x.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        this.x.set$x(0.0);
                        this.x.set$y(0.0);
                        vn1 = b.x;
                      case 132:
                        state = 0;
                        vn2 = b.y;
                      case 133:
                        state = 0;
                      case 134:
                      case 135:
                      case 136:
                      case 137:
                        if (state == 134 || state == 135 || state == 136 || state == 137 || (state == 0 && ($.geB(vn1, 0.0) && $.geB(vn2, 0.0)))) {
                          switch (state) {
                            case 0:
                              this.d.setFrom$1(this.x).subLocal$1(a);
                              this.P1.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$x());
                              this.P2.setFrom$1(t1.get$normal()).mulLocal$1(this.d.get$y());
                              this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                              vA.subLocal$1(this.temp2);
                              this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                              vB.addLocal$1(this.temp2);
                              t2 = $.Vector_crossVectors(cp1.get$rA(), this.P1);
                            case 134:
                              state = 0;
                              t3 = $.Vector_crossVectors(cp2.get$rA(), this.P2);
                            case 135:
                              state = 0;
                              wA0 = $.sub(wA, $.mul(invIA, $.add(t2, t3)));
                              t4 = $.Vector_crossVectors(cp1.get$rB(), this.P1);
                            case 136:
                              state = 0;
                              t5 = $.Vector_crossVectors(cp2.get$rB(), this.P2);
                            case 137:
                              state = 0;
                              wB0 = $.add(wB, $.mul(invIB, $.add(t4, t5)));
                              cp1.set$normalImpulse(this.x.get$x());
                              cp2.set$normalImpulse(this.x.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        break L2;
                    }
                  }
              }
            }
            bodyA.get$linearVelocity().setFrom$1(vA);
            bodyA.set$angularVelocity(wA);
            bodyB.get$linearVelocity().setFrom$1(vB);
            bodyB.set$angularVelocity(wB);
            ++i;
        }
      }
  }
 },
 warmStart$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); ++i) {
    var t1 = this.constraints;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    var bodyA = t1.get$bodyA();
    var bodyB = t1.get$bodyB();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number') return this.warmStart$0$bailout(1, t1, bodyA, bodyB, invMassA, i, 0, 0, 0);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number') return this.warmStart$0$bailout(2, t1, bodyA, bodyB, invMassA, invIA, i, 0, 0);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number') return this.warmStart$0$bailout(3, t1, bodyA, bodyB, invMassA, invIA, invMassB, i, 0);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number') return this.warmStart$0$bailout(4, t1, bodyA, bodyB, invMassA, invIA, invMassB, invIB, i);
    var normal = t1.get$normal();
    $.Vector_crossVectorAndNumToOut(normal, 1, this.tangent);
    for (var j = 0; $.ltB(j, t1.get$pointCount()); ++j) {
      var ccp = $.index(t1.get$points(), j);
      var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), this.tangent.x));
      var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), this.tangent.y));
      t2 = bodyA.get$angularVelocity();
      var t3 = $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px));
      if (typeof t3 !== 'number') throw $.iae(t3);
      bodyA.set$angularVelocity($.sub(t2, invIA * t3));
      var t4 = bodyA.get$linearVelocity();
      t4.set$x($.sub(t4.get$x(), $.mul(Px, invMassA)));
      t4 = bodyA.get$linearVelocity();
      t4.set$y($.sub(t4.get$y(), $.mul(Py, invMassA)));
      t4 = bodyB.get$angularVelocity();
      var t5 = $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px));
      if (typeof t5 !== 'number') throw $.iae(t5);
      bodyB.set$angularVelocity($.add(t4, invIB * t5));
      var t6 = bodyB.get$linearVelocity();
      t6.set$x($.add(t6.get$x(), $.mul(Px, invMassB)));
      t6 = bodyB.get$linearVelocity();
      t6.set$y($.add(t6.get$y(), $.mul(Py, invMassB)));
    }
  }
 },
 warmStart$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      break;
    case 2:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      invIA = env4;
      i = env5;
      break;
    case 3:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      invIA = env4;
      invMassB = env5;
      i = env6;
      break;
    case 4:
      t1 = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      invIA = env4;
      invMassB = env5;
      invIB = env6;
      i = env7;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var t1 = this.constraints;
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1 = t1[i];
            var bodyA = t1.get$bodyA();
            var bodyB = t1.get$bodyB();
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
            var normal = t1.get$normal();
            $.Vector_crossVectorAndNumToOut(normal, 1, this.tangent);
            for (var j = 0; $.ltB(j, t1.get$pointCount()); ++j) {
              var ccp = $.index(t1.get$points(), j);
              var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), this.tangent.get$x()));
              var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), this.tangent.get$y()));
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
  }
 },
 init$3: function(contacts, contactCount, impulseRatio) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object' || contacts === null || (contacts.constructor !== Array && !contacts.is$JavaScriptIndexingBehavior()))) return this.init$3$bailout(1, contacts, contactCount, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (typeof impulseRatio !== 'number') return this.init$3$bailout(1, contacts, contactCount, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.constraintCount = contactCount;
  if ($.ltB(this.constraints.length, contactCount)) {
    var old = this.constraints;
    var t1 = $.ListFactory_List($.Math_max(old.length * 2, this.constraintCount));
    $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraint'}));
    this.constraints = t1;
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; i < this.constraints.length; ++i) {
      t1 = this.constraints;
      var t2 = $.ContactConstraint$();
      var t3 = t1.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (i = 0; $.ltB(i, this.constraintCount); ++i) {
    t1 = contacts.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = contacts[i];
    var fixtureA = t2.get$fixtureA();
    var fixtureB = t2.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = t2.get$manifold();
    var friction = $.Settings_mixFriction(fixtureA.get$friction(), fixtureB.get$friction());
    var restitution = $.Settings_mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution());
    if (typeof restitution !== 'number') return this.init$3$bailout(2, bodyB, manifold, impulseRatio, contacts, friction, restitution, i, radiusA, radiusB, bodyA, 0, 0, 0, 0);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number') return this.init$3$bailout(3, bodyB, manifold, impulseRatio, contacts, friction, restitution, vA, vB, wA, i, radiusA, radiusB, bodyA, 0);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number') return this.init$3$bailout(4, bodyB, manifold, impulseRatio, contacts, friction, restitution, vA, vB, wA, wB, i, radiusA, radiusB, bodyA);
    this.worldManifold.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
    t2 = this.constraints;
    t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t2 = t2[i];
    t2.set$bodyA(bodyA);
    t2.set$bodyB(bodyB);
    t2.set$manifold(manifold);
    var t4 = this.worldManifold.normal.get$x();
    t2.get$normal().set$x(t4);
    t4 = this.worldManifold.normal.get$y();
    t2.get$normal().set$y(t4);
    t2.set$pointCount(manifold.get$pointCount());
    t2.set$friction(friction);
    t2.set$restitution(restitution);
    t4 = manifold.get$localNormal().get$x();
    t2.get$localNormal().set$x(t4);
    t4 = manifold.get$localNormal().get$y();
    t2.get$localNormal().set$y(t4);
    t4 = manifold.get$localPoint().get$x();
    t2.get$localPoint().set$x(t4);
    t4 = manifold.get$localPoint().get$y();
    t2.get$localPoint().set$y(t4);
    t2.set$radius($.add(radiusA, radiusB));
    t2.set$type(manifold.get$type());
    for (t1 = -wA, t3 = -wB, t4 = -restitution, j = 0; $.ltB(j, t2.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      var ccp = $.index(t2.get$points(), j);
      var t5 = cp.get$normalImpulse();
      if (typeof t5 !== 'number') throw $.iae(t5);
      ccp.set$normalImpulse(impulseRatio * t5);
      var t6 = cp.get$tangentImpulse();
      if (typeof t6 !== 'number') throw $.iae(t6);
      ccp.set$tangentImpulse(impulseRatio * t6);
      var t7 = cp.get$localPoint().get$x();
      ccp.get$localPoint().set$x(t7);
      t7 = cp.get$localPoint().get$y();
      ccp.get$localPoint().set$y(t7);
      t7 = $.sub($.index(this.worldManifold.points, j).get$x(), bodyA.get$sweep().get$center().get$x());
      ccp.get$rA().set$x(t7);
      t7 = $.sub($.index(this.worldManifold.points, j).get$y(), bodyA.get$sweep().get$center().get$y());
      ccp.get$rA().set$y(t7);
      t7 = $.sub($.index(this.worldManifold.points, j).get$x(), bodyB.get$sweep().get$center().get$x());
      ccp.get$rB().set$x(t7);
      t7 = $.sub($.index(this.worldManifold.points, j).get$y(), bodyB.get$sweep().get$center().get$y());
      ccp.get$rB().set$y(t7);
      var rnA = $.sub($.mul(ccp.get$rA().get$x(), t2.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), t2.get$normal().get$x()));
      var rnB = $.sub($.mul(ccp.get$rB().get$x(), t2.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), t2.get$normal().get$x()));
      rnA = $.mul(rnA, rnA);
      rnB = $.mul(rnB, rnB);
      var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB));
      if (typeof kNormal !== 'number') throw $.iae(kNormal);
      ccp.set$normalMass(1.0 / kNormal);
      t7 = t2.get$normal().get$y();
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 *= 1.0;
      this.tangent.x = t7;
      t7 = t2.get$normal().get$x();
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 *= -1.0;
      this.tangent.y = t7;
      var rtA = $.sub($.mul(ccp.get$rA().get$x(), this.tangent.y), $.mul(ccp.get$rA().get$y(), this.tangent.x));
      var rtB = $.sub($.mul(ccp.get$rB().get$x(), this.tangent.y), $.mul(ccp.get$rB().get$y(), this.tangent.x));
      rtA = $.mul(rtA, rtA);
      rtB = $.mul(rtB, rtB);
      var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB));
      if (typeof kTangent !== 'number') throw $.iae(kTangent);
      ccp.set$tangentMass(1.0 / kTangent);
      ccp.set$velocityBias(0.0);
      t7 = ccp.get$rA().get$y();
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 *= t1;
      this.temp2.x = t7;
      t7 = ccp.get$rA().get$x();
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 *= wA;
      this.temp2.y = t7;
      t7 = ccp.get$rB().get$y();
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 *= t3;
      var t8 = vB.get$x();
      if (typeof t8 !== 'number') throw $.iae(t8);
      t8 += t7;
      t7 = vA.get$x();
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 = t8 - t7;
      t8 = this.temp2.x;
      if (typeof t8 !== 'number') throw $.iae(t8);
      t8 = t7 - t8;
      this.temp1.x = t8;
      t8 = ccp.get$rB().get$x();
      if (typeof t8 !== 'number') throw $.iae(t8);
      t8 *= wB;
      t7 = vB.get$y();
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 += t8;
      t8 = vA.get$y();
      if (typeof t8 !== 'number') throw $.iae(t8);
      t8 = t7 - t8;
      t7 = this.temp2.y;
      if (typeof t7 !== 'number') throw $.iae(t7);
      t7 = t8 - t7;
      this.temp1.y = t7;
      var a = t2.get$normal();
      var vRel = $.add($.mul(a.get$x(), this.temp1.x), $.mul(a.get$y(), this.temp1.y));
      if ($.ltB(vRel, -1)) {
        if (typeof vRel !== 'number') throw $.iae(vRel);
        ccp.set$velocityBias(t4 * vRel);
      }
    }
    if ($.eqB(t2.get$pointCount(), 2)) {
      var ccp1 = $.index(t2.get$points(), 0);
      var ccp2 = $.index(t2.get$points(), 1);
      var invMassA = bodyA.get$invMass();
      var invIA = bodyA.get$invInertia();
      var invMassB = bodyB.get$invMass();
      var invIB = bodyB.get$invInertia();
      var rn1A = $.Vector_crossVectors(ccp1.get$rA(), t2.get$normal());
      var rn1B = $.Vector_crossVectors(ccp1.get$rB(), t2.get$normal());
      var rn2A = $.Vector_crossVectors(ccp2.get$rA(), t2.get$normal());
      var rn2B = $.Vector_crossVectors(ccp2.get$rB(), t2.get$normal());
      var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
      var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
      var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
      t1 = $.mul(k11, k11);
      t3 = $.sub($.mul(k11, k22), $.mul(k12, k12));
      if (typeof t3 !== 'number') throw $.iae(t3);
      if ($.ltB(t1, 100.0 * t3)) {
        t2.get$K().get$col1().set$x(k11);
        t2.get$K().get$col1().set$y(k12);
        t2.get$K().get$col2().set$x(k12);
        t2.get$K().get$col2().set$y(k22);
        t1 = t2.get$K().get$col1().get$x();
        t2.get$normalMass().get$col1().set$x(t1);
        t1 = t2.get$K().get$col1().get$y();
        t2.get$normalMass().get$col1().set$y(t1);
        t1 = t2.get$K().get$col2().get$x();
        t2.get$normalMass().get$col2().set$x(t1);
        t1 = t2.get$K().get$col2().get$y();
        t2.get$normalMass().get$col2().set$y(t1);
        t2.get$normalMass().invertLocal$0();
      } else t2.set$pointCount(1);
    }
  }
  var j;
 },
 init$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var contacts = env0;
      var contactCount = env1;
      var impulseRatio = env2;
      break;
    case 1:
      contacts = env0;
      contactCount = env1;
      impulseRatio = env2;
      break;
    case 2:
      bodyB = env0;
      manifold = env1;
      impulseRatio = env2;
      contacts = env3;
      friction = env4;
      restitution = env5;
      i = env6;
      radiusA = env7;
      radiusB = env8;
      bodyA = env9;
      break;
    case 3:
      bodyB = env0;
      manifold = env1;
      impulseRatio = env2;
      contacts = env3;
      friction = env4;
      restitution = env5;
      vA = env6;
      vB = env7;
      wA = env8;
      i = env9;
      radiusA = env10;
      radiusB = env11;
      bodyA = env12;
      break;
    case 4:
      bodyB = env0;
      manifold = env1;
      impulseRatio = env2;
      contacts = env3;
      friction = env4;
      restitution = env5;
      vA = env6;
      vB = env7;
      wA = env8;
      wB = env9;
      i = env10;
      radiusA = env11;
      radiusB = env12;
      bodyA = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      this.constraintCount = contactCount;
      if ($.ltB(this.constraints.length, contactCount)) {
        var old = this.constraints;
        var t1 = $.ListFactory_List($.Math_max(old.length * 2, this.constraintCount));
        $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraint'}));
        this.constraints = t1;
        $.setRange$3(this.constraints, 0, old.length, old);
        for (var i = old.length; i < this.constraints.length; ++i) {
          t1 = this.constraints;
          var t2 = $.ContactConstraint$();
          var t3 = t1.length;
          if (i < 0 || i >= t3) throw $.ioore(i);
          t1[i] = t2;
        }
      }
      i = 0;
    case 2:
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
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
            this.worldManifold.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
            t1 = this.constraints;
            t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1 = t1[i];
            t1.set$bodyA(bodyA);
            t1.set$bodyB(bodyB);
            t1.set$manifold(manifold);
            t3 = this.worldManifold.get$normal().get$x();
            t1.get$normal().set$x(t3);
            t3 = this.worldManifold.get$normal().get$y();
            t1.get$normal().set$y(t3);
            t1.set$pointCount(manifold.get$pointCount());
            t1.set$friction(friction);
            t1.set$restitution(restitution);
            t3 = manifold.get$localNormal().get$x();
            t1.get$localNormal().set$x(t3);
            t3 = manifold.get$localNormal().get$y();
            t1.get$localNormal().set$y(t3);
            t3 = manifold.get$localPoint().get$x();
            t1.get$localPoint().set$x(t3);
            t3 = manifold.get$localPoint().get$y();
            t1.get$localPoint().set$y(t3);
            t1.set$radius($.add(radiusA, radiusB));
            t1.set$type(manifold.get$type());
            for (var j = 0; $.ltB(j, t1.get$pointCount()); ++j) {
              var cp = $.index(manifold.get$points(), j);
              var ccp = $.index(t1.get$points(), j);
              ccp.set$normalImpulse($.mul(impulseRatio, cp.get$normalImpulse()));
              ccp.set$tangentImpulse($.mul(impulseRatio, cp.get$tangentImpulse()));
              t2 = cp.get$localPoint().get$x();
              ccp.get$localPoint().set$x(t2);
              t2 = cp.get$localPoint().get$y();
              ccp.get$localPoint().set$y(t2);
              t2 = $.sub($.index(this.worldManifold.get$points(), j).get$x(), bodyA.get$sweep().get$center().get$x());
              ccp.get$rA().set$x(t2);
              t2 = $.sub($.index(this.worldManifold.get$points(), j).get$y(), bodyA.get$sweep().get$center().get$y());
              ccp.get$rA().set$y(t2);
              t2 = $.sub($.index(this.worldManifold.get$points(), j).get$x(), bodyB.get$sweep().get$center().get$x());
              ccp.get$rB().set$x(t2);
              t2 = $.sub($.index(this.worldManifold.get$points(), j).get$y(), bodyB.get$sweep().get$center().get$y());
              ccp.get$rB().set$y(t2);
              var rnA = $.sub($.mul(ccp.get$rA().get$x(), t1.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), t1.get$normal().get$x()));
              var rnB = $.sub($.mul(ccp.get$rB().get$x(), t1.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), t1.get$normal().get$x()));
              rnA = $.mul(rnA, rnA);
              rnB = $.mul(rnB, rnB);
              var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB));
              if (typeof kNormal !== 'number') throw $.iae(kNormal);
              ccp.set$normalMass(1.0 / kNormal);
              t2 = t1.get$normal().get$y();
              if (typeof t2 !== 'number') throw $.iae(t2);
              t2 *= 1.0;
              this.tangent.set$x(t2);
              t2 = t1.get$normal().get$x();
              if (typeof t2 !== 'number') throw $.iae(t2);
              t2 *= -1.0;
              this.tangent.set$y(t2);
              var rtA = $.sub($.mul(ccp.get$rA().get$x(), this.tangent.get$y()), $.mul(ccp.get$rA().get$y(), this.tangent.get$x()));
              var rtB = $.sub($.mul(ccp.get$rB().get$x(), this.tangent.get$y()), $.mul(ccp.get$rB().get$y(), this.tangent.get$x()));
              rtA = $.mul(rtA, rtA);
              rtB = $.mul(rtB, rtB);
              var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB));
              if (typeof kTangent !== 'number') throw $.iae(kTangent);
              ccp.set$tangentMass(1.0 / kTangent);
              ccp.set$velocityBias(0.0);
              t2 = $.mul($.neg(wA), ccp.get$rA().get$y());
              this.temp2.set$x(t2);
              t2 = $.mul(wA, ccp.get$rA().get$x());
              this.temp2.set$y(t2);
              t2 = $.sub($.sub($.add($.mul($.neg(wB), ccp.get$rB().get$y()), vB.get$x()), vA.get$x()), this.temp2.get$x());
              this.temp1.set$x(t2);
              t2 = $.sub($.sub($.add($.mul(wB, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()), this.temp2.get$y());
              this.temp1.set$y(t2);
              var a = t1.get$normal();
              var vRel = $.add($.mul(a.get$x(), this.temp1.get$x()), $.mul(a.get$y(), this.temp1.get$y()));
              $.ltB(vRel, -1) && ccp.set$velocityBias($.mul($.neg(restitution), vRel));
            }
            if ($.eqB(t1.get$pointCount(), 2)) {
              var ccp1 = $.index(t1.get$points(), 0);
              var ccp2 = $.index(t1.get$points(), 1);
              var invMassA = bodyA.get$invMass();
              var invIA = bodyA.get$invInertia();
              var invMassB = bodyB.get$invMass();
              var invIB = bodyB.get$invInertia();
              var rn1A = $.Vector_crossVectors(ccp1.get$rA(), t1.get$normal());
              var rn1B = $.Vector_crossVectors(ccp1.get$rB(), t1.get$normal());
              var rn2A = $.Vector_crossVectors(ccp2.get$rA(), t1.get$normal());
              var rn2B = $.Vector_crossVectors(ccp2.get$rB(), t1.get$normal());
              var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
              var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
              var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
              t2 = $.mul(k11, k11);
              t3 = $.sub($.mul(k11, k22), $.mul(k12, k12));
              if (typeof t3 !== 'number') throw $.iae(t3);
              if ($.ltB(t2, 100.0 * t3)) {
                t1.get$K().get$col1().set$x(k11);
                t1.get$K().get$col1().set$y(k12);
                t1.get$K().get$col2().set$x(k12);
                t1.get$K().get$col2().set$y(k22);
                t2 = t1.get$K().get$col1().get$x();
                t1.get$normalMass().get$col1().set$x(t2);
                t2 = t1.get$K().get$col1().get$y();
                t1.get$normalMass().get$col1().set$y(t2);
                t2 = t1.get$K().get$col2().get$x();
                t1.get$normalMass().get$col2().set$x(t2);
                t2 = t1.get$K().get$col2().get$y();
                t1.get$normalMass().get$col2().set$y(t2);
                t1.get$normalMass().invertLocal$0();
              } else t1.set$pointCount(1);
            }
            ++i;
        }
      }
  }
 },
 ContactSolver$0: function() {
  for (var i = 0; i < this.constraints.length; ++i) {
    var t1 = this.constraints;
    var t2 = $.ContactConstraint$();
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.PositionSolverManifold = {"":
 ["clipPoint", "planePoint", "temp", "pointB?", "pointA?", "separation=", "point?", "normal?"],
 super: "Object",
 initialize$2: function(cc, index) {
  switch (cc.get$type()) {
    case 0:
      cc.get$bodyA().getWorldPointToOut$2(cc.get$localPoint(), this.pointA);
      cc.get$bodyB().getWorldPointToOut$2($.index(cc.get$points(), 0).get$localPoint(), this.pointB);
      if ($.gtB($.MathBox_distanceSquared(this.pointA, this.pointB), 1.4208639999999999e-14)) {
        this.normal.setFrom$1(this.pointB).subLocal$1(this.pointA);
        this.normal.normalize$0();
      } else this.normal.setCoords$2(1.0, 0.0);
      this.point.setFrom$1(this.pointA).addLocal$1(this.pointB).mulLocal$1(0.5);
      this.temp.setFrom$1(this.pointB).subLocal$1(this.pointA);
      this.separation = $.sub($.Vector_dot(this.temp, this.normal), cc.get$radius());
      break;
    case 1:
      cc.get$bodyA().getWorldVectorToOut$2(cc.get$localNormal(), this.normal);
      cc.get$bodyA().getWorldPointToOut$2(cc.get$localPoint(), this.planePoint);
      cc.get$bodyB().getWorldPointToOut$2($.index(cc.get$points(), index).get$localPoint(), this.clipPoint);
      this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
      this.separation = $.sub($.Vector_dot(this.temp, this.normal), cc.get$radius());
      this.point.setFrom$1(this.clipPoint);
      break;
    case 2:
      cc.get$bodyB().getWorldVectorToOut$2(cc.get$localNormal(), this.normal);
      cc.get$bodyB().getWorldPointToOut$2(cc.get$localPoint(), this.planePoint);
      cc.get$bodyA().getWorldPointToOut$2($.index(cc.get$points(), index).get$localPoint(), this.clipPoint);
      this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
      this.separation = $.sub($.Vector_dot(this.temp, this.normal), cc.get$radius());
      this.point.setFrom$1(this.clipPoint);
      this.normal.negateLocal$0();
  }
 }
};

$$.PolygonAndCircleContact = {"":
 ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"],
 super: "Contact",
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygonAndCircle$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
};

$$.PolygonContact = {"":
 ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"],
 super: "Contact",
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygons$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(1, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
};

$$.TimeOfImpactSolver = {"":
 ["temp", "P", "rB?", "rA?", "psm", "toiBody", "count=", "constraints?"],
 super: "Object",
 solve$1: function(baumgarte) {
  if (typeof baumgarte !== 'number') return this.solve$1$bailout(1, baumgarte, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (var i = 0, minSeparation = 0; $.ltB(i, this.count); ++i) {
    var t1 = this.constraints;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    var bodyA = t1.get$bodyA();
    var bodyB = t1.get$bodyB();
    var massA = bodyA.get$mass();
    var massB = bodyB.get$mass();
    if ($.eqB(bodyA, this.toiBody)) massB = 0.0;
    else massA = 0.0;
    var invMassA = $.mul(massA, bodyA.get$invMass());
    if (typeof invMassA !== 'number') return this.solve$1$bailout(2, baumgarte, massA, massB, t1, bodyA, invMassA, i, minSeparation, bodyB, 0);
    var invIA = $.mul(massA, bodyA.get$invInertia());
    if (typeof invIA !== 'number') return this.solve$1$bailout(3, baumgarte, massB, t1, bodyA, invMassA, i, minSeparation, invIA, bodyB, 0);
    var invMassB = $.mul(massB, bodyB.get$invMass());
    if (typeof invMassB !== 'number') return this.solve$1$bailout(4, baumgarte, massB, t1, bodyA, invMassA, i, minSeparation, invIA, bodyB, invMassB);
    var invIB = $.mul(massB, bodyB.get$invInertia());
    if (typeof invIB !== 'number') return this.solve$1$bailout(5, baumgarte, t1, bodyA, invMassA, i, minSeparation, invIA, bodyB, invMassB, invIB);
    for (t2 = invMassA + invMassB, j = 0; $.ltB(j, t1.get$pointCount()); ++j) {
      this.psm.initialize$2(t1, j);
      var normal = this.psm.normal;
      var point = this.psm.point;
      var separation = this.psm.separation;
      this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.Math_min(minSeparation, separation);
      var t3 = $.add(separation, 0.005);
      if (typeof t3 !== 'number') throw $.iae(t3);
      var C = $.MathBox_clamp(baumgarte * t3, -0.2, 0.0);
      var rnA = $.Vector_crossVectors(this.rA, normal);
      var rnB = $.Vector_crossVectors(this.rB, normal);
      if (typeof rnA !== 'number') throw $.iae(rnA);
      var t4 = t2 + invIA * rnA * rnA;
      if (typeof rnB !== 'number') throw $.iae(rnB);
      var K = t4 + invIB * rnB * rnB;
      var impulse = K > 0.0 ? $.div($.neg(C), K) : 0.0;
      this.P.setFrom$1(normal).mulLocal$1(impulse);
      this.temp.setFrom$1(this.P).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(this.temp);
      t3 = bodyA.get$sweep();
      t4 = t3.get$angle();
      var t5 = $.Vector_crossVectors(this.rA, this.P);
      if (typeof t5 !== 'number') throw $.iae(t5);
      t3.set$angle($.sub(t4, invIA * t5));
      bodyA.synchronizeTransform$0();
      this.temp.setFrom$1(this.P).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(this.temp);
      t3 = bodyB.get$sweep();
      var t6 = t3.get$angle();
      var t7 = $.Vector_crossVectors(this.rB, this.P);
      if (typeof t7 !== 'number') throw $.iae(t7);
      t3.set$angle($.add(t6, invIB * t7));
      bodyB.synchronizeTransform$0();
    }
  }
  return $.ge(minSeparation, -0.0075);
  var j;
 },
 solve$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      break;
    case 2:
      baumgarte = env0;
      massA = env1;
      massB = env2;
      t1 = env3;
      bodyA = env4;
      invMassA = env5;
      i = env6;
      minSeparation = env7;
      bodyB = env8;
      break;
    case 3:
      baumgarte = env0;
      massB = env1;
      t1 = env2;
      bodyA = env3;
      invMassA = env4;
      i = env5;
      minSeparation = env6;
      invIA = env7;
      bodyB = env8;
      break;
    case 4:
      baumgarte = env0;
      massB = env1;
      t1 = env2;
      bodyA = env3;
      invMassA = env4;
      i = env5;
      minSeparation = env6;
      invIA = env7;
      bodyB = env8;
      invMassB = env9;
      break;
    case 5:
      baumgarte = env0;
      t1 = env1;
      bodyA = env2;
      invMassA = env3;
      i = env4;
      minSeparation = env5;
      invIA = env6;
      bodyB = env7;
      invMassB = env8;
      invIB = env9;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var i = 0;
      var minSeparation = 0;
    case 2:
    case 3:
    case 4:
    case 5:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.count)) break L0;
            var t1 = this.constraints;
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1 = t1[i];
            var bodyA = t1.get$bodyA();
            var bodyB = t1.get$bodyB();
            var massA = bodyA.get$mass();
            var massB = bodyB.get$mass();
            if ($.eqB(bodyA, this.toiBody)) massB = 0.0;
            else massA = 0.0;
            var invMassA = $.mul(massA, bodyA.get$invMass());
          case 2:
            state = 0;
            var invIA = $.mul(massA, bodyA.get$invInertia());
          case 3:
            state = 0;
            var invMassB = $.mul(massB, bodyB.get$invMass());
          case 4:
            state = 0;
            var invIB = $.mul(massB, bodyB.get$invInertia());
          case 5:
            state = 0;
            for (var j = 0; $.ltB(j, t1.get$pointCount()); ++j) {
              this.psm.initialize$2(t1, j);
              var normal = this.psm.get$normal();
              var point = this.psm.get$point();
              var separation = this.psm.get$separation();
              this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
              this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
              minSeparation = $.Math_min(minSeparation, separation);
              var C = $.MathBox_clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0);
              var rnA = $.Vector_crossVectors(this.rA, normal);
              var rnB = $.Vector_crossVectors(this.rB, normal);
              var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
              var impulse = $.gtB(K, 0.0) ? $.div($.neg(C), K) : 0.0;
              this.P.setFrom$1(normal).mulLocal$1(impulse);
              this.temp.setFrom$1(this.P).mulLocal$1(invMassA);
              bodyA.get$sweep().get$center().subLocal$1(this.temp);
              t2 = bodyA.get$sweep();
              t2.set$angle($.sub(t2.get$angle(), $.mul(invIA, $.Vector_crossVectors(this.rA, this.P))));
              bodyA.synchronizeTransform$0();
              this.temp.setFrom$1(this.P).mulLocal$1(invMassB);
              bodyB.get$sweep().get$center().addLocal$1(this.temp);
              t2 = bodyB.get$sweep();
              t2.set$angle($.add(t2.get$angle(), $.mul(invIB, $.Vector_crossVectors(this.rB, this.P))));
              bodyB.synchronizeTransform$0();
            }
            ++i;
        }
      }
      return $.ge(minSeparation, -0.0075);
  }
 },
 initialize$3: function(contacts, argCount, argToiBody) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object' || contacts === null || (contacts.constructor !== Array && !contacts.is$JavaScriptIndexingBehavior()))) return this.initialize$3$bailout(1, contacts, argCount, argToiBody);
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, this.constraints.length)) {
    var old = this.constraints;
    var t1 = $.ListFactory_List($.Math_max(this.count, old.length * 2));
    $.setRuntimeTypeInfo(t1, ({E: 'TimeOfImpactConstraint'}));
    this.constraints = t1;
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; i < this.constraints.length; ++i) {
      t1 = this.constraints;
      var t2 = $.TimeOfImpactConstraint$();
      var t3 = t1.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (i = 0; $.ltB(i, this.count); ++i) {
    t1 = contacts.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = contacts[i];
    var fixtureA = t2.get$fixtureA();
    var fixtureB = t2.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = t2.get$manifold();
    t2 = this.constraints;
    t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t2 = t2[i];
    t2.set$bodyA(bodyA);
    t2.set$bodyB(bodyB);
    t2.get$localNormal().setFrom$1(manifold.get$localNormal());
    t2.get$localPoint().setFrom$1(manifold.get$localPoint());
    t2.set$type(manifold.get$type());
    t2.set$pointCount(manifold.get$pointCount());
    t2.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, t2.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      $.indexSet(t2.get$localPoints(), j, cp.get$localPoint());
    }
  }
 },
 initialize$3$bailout: function(state, contacts, argCount, argToiBody) {
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, this.constraints.length)) {
    var old = this.constraints;
    var t1 = $.ListFactory_List($.Math_max(this.count, old.length * 2));
    $.setRuntimeTypeInfo(t1, ({E: 'TimeOfImpactConstraint'}));
    this.constraints = t1;
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; i < this.constraints.length; ++i) {
      t1 = this.constraints;
      var t2 = $.TimeOfImpactConstraint$();
      var t3 = t1.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
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
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    t1.set$bodyA(bodyA);
    t1.set$bodyB(bodyB);
    t1.get$localNormal().setFrom$1(manifold.get$localNormal());
    t1.get$localPoint().setFrom$1(manifold.get$localPoint());
    t1.set$type(manifold.get$type());
    t1.set$pointCount(manifold.get$pointCount());
    t1.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, t1.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      $.indexSet(t1.get$localPoints(), j, cp.get$localPoint());
    }
  }
 },
 TimeOfImpactSolver$0: function() {
  for (var i = 0; i < this.constraints.length; ++i) {
    var t1 = this.constraints;
    var t2 = $.TimeOfImpactConstraint$();
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.TimeOfImpactSolverManifold = {"":
 ["clipPoint", "planePoint", "temp", "pointB?", "pointA?", "separation=", "point?", "normal?"],
 super: "Object",
 initialize$2: function(cc, index) {
  switch (cc.get$type()) {
    case 0:
      this.pointA.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
      this.pointB.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), 0)));
      if ($.gtB($.MathBox_distanceSquared(this.pointA, this.pointB), 1.4208639999999999e-14)) {
        this.normal.setFrom$1(this.pointB).subLocal$1(this.pointA);
        this.normal.normalize$0();
      } else this.normal.setCoords$2(1, 0);
      this.point.setFrom$1(this.pointA).addLocal$1(this.pointB).mulLocal$1(0.5);
      this.temp.setFrom$1(this.pointB).subLocal$1(this.pointA);
      this.separation = $.sub($.Vector_dot(this.temp, this.normal), cc.get$radius());
      break;
    case 1:
      this.normal.setFrom$1(cc.get$bodyA().getWorldVector$1(cc.get$localNormal()));
      this.planePoint.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
      this.clipPoint.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), index)));
      this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
      this.separation = $.sub($.Vector_dot(this.temp, this.normal), cc.get$radius());
      this.point.setFrom$1(this.clipPoint);
      break;
    case 2:
      this.normal.setFrom$1(cc.get$bodyB().getWorldVector$1(cc.get$localNormal()));
      this.planePoint.setFrom$1(cc.get$bodyB().getWorldPoint$1(cc.get$localPoint()));
      this.clipPoint.setFrom$1(cc.get$bodyA().getWorldPoint$1($.index(cc.get$localPoints(), index)));
      this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
      this.separation = $.sub($.Vector_dot(this.temp, this.normal), cc.get$radius());
      this.point.setFrom$1(this.clipPoint);
      this.normal.negateLocal$0();
      break;
  }
 }
};

$$.TimeOfImpactConstraint = {"":
 ["bodyB=", "bodyA=", "pointCount=", "radius=", "type=", "localPoint?", "localNormal?", "localPoints?"],
 super: "Object",
 setFrom$1: function(argOther) {
  for (var i = 0; i < this.localPoints.length; ++i) {
    var t1 = this.localPoints;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    var t3 = argOther.get$localPoints();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.setFrom$1$bailout(1, i, argOther, t1, t3);
    var t4 = t3.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t1.setFrom$1(t3[i]);
  }
  this.localNormal.setFrom$1(argOther.get$localNormal());
  this.localPoint.setFrom$1(argOther.get$localPoint());
  this.type = argOther.get$type();
  this.radius = argOther.get$radius();
  this.pointCount = argOther.get$pointCount();
  this.bodyA = argOther.get$bodyA();
  this.bodyB = argOther.get$bodyB();
 },
 setFrom$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      i = env0;
      var argOther = env1;
      t1 = env2;
      t3 = env3;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!(i < this.localPoints.length)) break L0;
            var t1 = this.localPoints;
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1 = t1[i];
            var t3 = argOther.get$localPoints();
          case 1:
            state = 0;
            t1.setFrom$1($.index(t3, i));
            ++i;
        }
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
  for (var i = 0; i < this.localPoints.length; ++i) {
    var t1 = this.localPoints;
    var t2 = $.Vector$(0, 0);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.Joint = {"":
 ["userData=", "collideConnected?", "islandFlag=", "bodyB=", "bodyA=", "edgeB?", "edgeA?", "_lib0_next=", "_prev!", "type="],
 super: "Object",
 solvePositionConstraints$1: function(baumgarte) {
 },
 solveVelocityConstraints$1: function(step) {
 },
 initVelocityConstraints$1: function(step) {
 },
 get$active: function() {
  return this.bodyA.get$active() === true && this.bodyB.get$active() === true;
 },
 getAnchorB$1: function(argOut) {
 },
 getAnchorA$1: function(argOut) {
 }
};

$$.JointEdge = {"":
 ["next=", "prev=", "joint=", "other="],
 super: "Object",
 next$0: function() { return this.next.$call$0(); }
};

$$.JointDef = {"":
 ["collideConnected?", "bodyB=", "bodyA=", "userData=", "type="],
 super: "Object"
};

$$.ConstantVolumeJoint = {"":
 ["dampingRatio?", "frequencyHz?", "distanceJoints", "_world", "_impulse", "step", "normals?", "targetVolume", "targetLengths", "bodies?", "invIB", "invMassB", "invIA", "invMassA", "localCenterB", "localCenterA", "userData", "collideConnected", "islandFlag", "bodyB", "bodyA", "edgeB", "edgeA", "_lib0_next", "_prev", "type"],
 super: "Joint",
 getAnchorB$1: function(argOut) {
  throw $.captureStackTrace($.NotImplementedException$(null));
 },
 getAnchorA$1: function(argOut) {
  throw $.captureStackTrace($.NotImplementedException$(null));
 },
 solveVelocityConstraints$1: function(argStep) {
  var d = $.ListFactory_List(this.bodies.length);
  $.setRuntimeTypeInfo(d, ({E: 'Vector'}));
  for (var i = 0; i < this.bodies.length; ++i) {
    var t1 = $.Vector$(0, 0);
    var t2 = d.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    d[i] = t1;
  }
  for (var crossMassSum = 0.0, dotMassSum = 0.0, i = 0; i < this.bodies.length; ++i) {
    var prev = i === 0 ? this.bodies.length - 1 : i - 1;
    var next = i === this.bodies.length - 1 ? 0 : i + 1;
    t1 = d.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = d[i];
    var t3 = this.bodies;
    var t4 = t3.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    t2.setFrom$1(t3[next].get$worldCenter());
    t2 = d.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t5 = d[i];
    var t6 = this.bodies;
    var t7 = t6.length;
    if (prev < 0 || prev >= t7) throw $.ioore(prev);
    t5.subLocal$1(t6[prev].get$worldCenter());
    t5 = d.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var t8 = d[i].get$lengthSquared();
    var t9 = this.bodies;
    var t10 = t9.length;
    if (i < 0 || i >= t10) throw $.ioore(i);
    t8 = $.div(t8, t9[i].get$mass());
    if (typeof t8 !== 'number') throw $.iae(t8);
    dotMassSum += t8;
    t8 = this.bodies;
    var t11 = t8.length;
    if (i < 0 || i >= t11) throw $.ioore(i);
    var t12 = t8[i].get$linearVelocity();
    var t13 = d.length;
    if (i < 0 || i >= t13) throw $.ioore(i);
    t12 = $.Vector_crossVectors(t12, d[i]);
    if (typeof t12 !== 'number') throw $.iae(t12);
    crossMassSum += t12;
  }
  var lambda = -2.0 * crossMassSum / dotMassSum;
  this._impulse = $.add(this._impulse, lambda);
  for (i = 0; i < this.bodies.length; ++i) {
    t1 = this.bodies;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = t1[i].get$linearVelocity();
    t4 = t3.get$x();
    t5 = this.bodies;
    t6 = t5.length;
    if (i < 0 || i >= t6) throw $.ioore(i);
    t7 = t5[i].get$invMass();
    t8 = d.length;
    if (i < 0 || i >= t8) throw $.ioore(i);
    t3.set$x($.add(t4, $.mul($.mul($.mul(t7, d[i].get$y()), 0.5), lambda)));
    t3 = this.bodies;
    t9 = t3.length;
    if (i < 0 || i >= t9) throw $.ioore(i);
    t10 = t3[i].get$linearVelocity();
    t11 = t10.get$y();
    t12 = this.bodies;
    t13 = t12.length;
    if (i < 0 || i >= t13) throw $.ioore(i);
    var t14 = t12[i].get$invMass();
    var t15 = d.length;
    if (i < 0 || i >= t15) throw $.ioore(i);
    t10.set$y($.add(t11, $.mul($.mul($.mul(t14, $.neg(d[i].get$x())), 0.5), lambda)));
  }
 },
 solvePositionConstraints$1: function(baumgarte) {
  return this.constrainEdges$1(this.step);
 },
 initVelocityConstraints$1: function(argStep) {
  this.step = argStep;
  var d = $.ListFactory_List(this.bodies.length);
  $.setRuntimeTypeInfo(d, ({E: 'Vector'}));
  for (var i = 0; i < this.bodies.length; ++i) {
    var t1 = $.Vector$(0, 0);
    var t2 = d.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    d[i] = t1;
  }
  for (i = 0; i < this.bodies.length; ++i) {
    var prev = i === 0 ? this.bodies.length - 1 : i - 1;
    var next = i === this.bodies.length - 1 ? 0 : i + 1;
    t1 = d.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = d[i];
    var t3 = this.bodies;
    var t4 = t3.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    t2.setFrom$1(t3[next].get$worldCenter());
    t2 = d.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t5 = d[i];
    var t6 = this.bodies;
    var t7 = t6.length;
    if (prev < 0 || prev >= t7) throw $.ioore(prev);
    t5.subLocal$1(t6[prev].get$worldCenter());
  }
  if (this.step.get$warmStarting() === true) {
    t1 = this._impulse;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(1, d, t1, 0, 0, 0, 0);
    t2 = this.step.get$dtRatio();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(2, d, t2, t1, 0, 0, 0);
    this._impulse = t1 * t2;
    for (i = 0; i < this.bodies.length; ++i) {
      t1 = this.bodies;
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = t1[i].get$linearVelocity();
      t4 = t3.get$x();
      if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(3, d, t3, t4, i, 0, 0);
      t5 = this.bodies;
      t6 = t5.length;
      if (i < 0 || i >= t6) throw $.ioore(i);
      t7 = t5[i].get$invMass();
      if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(4, i, d, t3, t4, t7, 0);
      var t8 = d.length;
      if (i < 0 || i >= t8) throw $.ioore(i);
      var t9 = d[i].get$y();
      if (typeof t9 !== 'number') return this.initVelocityConstraints$1$bailout(5, t9, i, d, t3, t4, t7);
      var t10 = t7 * t9 * 0.5;
      var t11 = this._impulse;
      if (typeof t11 !== 'number') return this.initVelocityConstraints$1$bailout(6, t11, t10, i, d, t3, t4);
      t3.set$x(t4 + t10 * t11);
      t3 = this.bodies;
      var t12 = t3.length;
      if (i < 0 || i >= t12) throw $.ioore(i);
      var t13 = t3[i].get$linearVelocity();
      var t14 = t13.get$y();
      if (typeof t14 !== 'number') return this.initVelocityConstraints$1$bailout(7, t13, t14, d, i, 0, 0);
      var t15 = this.bodies;
      var t16 = t15.length;
      if (i < 0 || i >= t16) throw $.ioore(i);
      var t17 = t15[i].get$invMass();
      if (typeof t17 !== 'number') return this.initVelocityConstraints$1$bailout(8, t13, t14, t17, i, d, 0);
      var t18 = d.length;
      if (i < 0 || i >= t18) throw $.ioore(i);
      var t19 = d[i].get$x();
      if (typeof t19 !== 'number') return this.initVelocityConstraints$1$bailout(9, t13, t14, t17, i, t19, d);
      var t20 = t17 * -t19 * 0.5;
      var t21 = this._impulse;
      if (typeof t21 !== 'number') return this.initVelocityConstraints$1$bailout(10, t13, t14, t21, i, d, t20);
      t13.set$y(t14 + t20 * t21);
    }
  } else this._impulse = 0.0;
 },
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      d = env0;
      t1 = env1;
      break;
    case 2:
      d = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 3:
      d = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      break;
    case 4:
      i = env0;
      d = env1;
      t3 = env2;
      t4 = env3;
      t7 = env4;
      break;
    case 5:
      t9 = env0;
      i = env1;
      d = env2;
      t3 = env3;
      t4 = env4;
      t7 = env5;
      break;
    case 6:
      t11 = env0;
      t10 = env1;
      i = env2;
      d = env3;
      t3 = env4;
      t4 = env5;
      break;
    case 7:
      t13 = env0;
      t14 = env1;
      d = env2;
      i = env3;
      break;
    case 8:
      t13 = env0;
      t14 = env1;
      t17 = env2;
      i = env3;
      d = env4;
      break;
    case 9:
      t13 = env0;
      t14 = env1;
      t17 = env2;
      i = env3;
      t19 = env4;
      d = env5;
      break;
    case 10:
      t13 = env0;
      t14 = env1;
      t21 = env2;
      i = env3;
      d = env4;
      t20 = env5;
      break;
  }
  switch (state) {
    case 0:
      this.step = argStep;
      var d = $.ListFactory_List(this.bodies.length);
      $.setRuntimeTypeInfo(d, ({E: 'Vector'}));
      for (var i = 0; i < this.bodies.length; ++i) {
        var t1 = $.Vector$(0, 0);
        var t2 = d.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        d[i] = t1;
      }
      for (i = 0; i < this.bodies.length; ++i) {
        var prev = i === 0 ? this.bodies.length - 1 : i - 1;
        var next = i === this.bodies.length - 1 ? 0 : i + 1;
        t1 = d.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        t2 = d[i];
        var t3 = this.bodies;
        var t4 = t3.length;
        if (next < 0 || next >= t4) throw $.ioore(next);
        t2.setFrom$1(t3[next].get$worldCenter());
        t2 = d.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        var t5 = d[i];
        var t6 = this.bodies;
        var t7 = t6.length;
        if (prev < 0 || prev >= t7) throw $.ioore(prev);
        t5.subLocal$1(t6[prev].get$worldCenter());
      }
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      if (state == 1 || state == 2 || state == 3 || state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || state == 10 || (state == 0 && this.step.get$warmStarting() === true)) {
        switch (state) {
          case 0:
            t1 = this._impulse;
          case 1:
            state = 0;
            t2 = this.step.get$dtRatio();
          case 2:
            state = 0;
            this._impulse = $.mul(t1, t2);
            i = 0;
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!(i < this.bodies.length)) break L0;
                  t1 = this.bodies;
                  t2 = t1.length;
                  if (i < 0 || i >= t2) throw $.ioore(i);
                  t3 = t1[i].get$linearVelocity();
                  t4 = t3.get$x();
                case 3:
                  state = 0;
                  t5 = this.bodies;
                  t6 = t5.length;
                  if (i < 0 || i >= t6) throw $.ioore(i);
                  t7 = t5[i].get$invMass();
                case 4:
                  state = 0;
                  var t8 = d.length;
                  if (i < 0 || i >= t8) throw $.ioore(i);
                  var t9 = d[i].get$y();
                case 5:
                  state = 0;
                  var t10 = $.mul($.mul(t7, t9), 0.5);
                  var t11 = this._impulse;
                case 6:
                  state = 0;
                  t3.set$x($.add(t4, $.mul(t10, t11)));
                  t3 = this.bodies;
                  var t12 = t3.length;
                  if (i < 0 || i >= t12) throw $.ioore(i);
                  var t13 = t3[i].get$linearVelocity();
                  var t14 = t13.get$y();
                case 7:
                  state = 0;
                  var t15 = this.bodies;
                  var t16 = t15.length;
                  if (i < 0 || i >= t16) throw $.ioore(i);
                  var t17 = t15[i].get$invMass();
                case 8:
                  state = 0;
                  var t18 = d.length;
                  if (i < 0 || i >= t18) throw $.ioore(i);
                  var t19 = d[i].get$x();
                case 9:
                  state = 0;
                  var t20 = $.mul($.mul(t17, $.neg(t19)), 0.5);
                  var t21 = this._impulse;
                case 10:
                  state = 0;
                  t13.set$y($.add(t14, $.mul(t20, t21)));
                  ++i;
              }
            }
        }
      } else {
        this._impulse = 0.0;
      }
  }
 },
 constrainEdges$1: function(argStep) {
  for (var perimeter = 0.0, i = 0; i < this.bodies.length; ++i) {
    var next = i === this.bodies.length - 1 ? 0 : i + 1;
    var t1 = this.bodies;
    var t2 = t1.length;
    if (next < 0 || next >= t2) throw $.ioore(next);
    var t3 = t1[next].get$worldCenter().get$x();
    var t4 = this.bodies;
    var t5 = t4.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var dx = $.sub(t3, t4[i].get$worldCenter().get$x());
    t3 = this.bodies;
    var t6 = t3.length;
    if (next < 0 || next >= t6) throw $.ioore(next);
    var t7 = t3[next].get$worldCenter().get$y();
    var t8 = this.bodies;
    var t9 = t8.length;
    if (i < 0 || i >= t9) throw $.ioore(i);
    var dy = $.sub(t7, t8[i].get$worldCenter().get$y());
    var dist = $.Math_sqrt($.add($.mul(dx, dx), $.mul(dy, dy)));
    if ($.ltB(dist, 1.192e-7)) dist = 1.0;
    t1 = $.div(dy, dist);
    t2 = this.normals;
    t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t2[i].set$x(t1);
    t1 = $.div($.neg(dx), dist);
    t4 = this.normals;
    t5 = t4.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    t4[i].set$y(t1);
    if (typeof dist !== 'number') throw $.iae(dist);
    perimeter += dist;
  }
  var delta = $.Vector$(0, 0);
  var deltaArea = $.sub(this.targetVolume, this.get$area());
  if (typeof deltaArea !== 'number') throw $.iae(deltaArea);
  var toExtrude = 0.5 * deltaArea / perimeter;
  for (var done = true, i = 0; i < this.bodies.length; ++i) {
    next = i === this.bodies.length - 1 ? 0 : i + 1;
    t1 = this.normals;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = t1[i].get$x();
    t4 = this.normals;
    t5 = t4.length;
    if (next < 0 || next >= t5) throw $.ioore(next);
    t3 = $.add(t3, t4[next].get$x());
    if (typeof t3 !== 'number') throw $.iae(t3);
    t3 *= toExtrude;
    t6 = this.normals;
    t7 = t6.length;
    if (i < 0 || i >= t7) throw $.ioore(i);
    t8 = t6[i].get$y();
    t9 = this.normals;
    var t10 = t9.length;
    if (next < 0 || next >= t10) throw $.ioore(next);
    t8 = $.add(t8, t9[next].get$y());
    if (typeof t8 !== 'number') throw $.iae(t8);
    delta.setCoords$2(t3, toExtrude * t8);
    var norm = $.get$length(delta);
    if ($.gtB(norm, 0.2)) {
      if (typeof norm !== 'number') throw $.iae(norm);
      delta.mulLocal$1(0.2 / norm);
    }
    if ($.gtB(norm, 0.005)) done = false;
    t1 = this.bodies;
    t2 = t1.length;
    if (next < 0 || next >= t2) throw $.ioore(next);
    t3 = t1[next].get$sweep().get$center();
    t3.set$x($.add(t3.get$x(), delta.x));
    t3 = this.bodies;
    t4 = t3.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    t5 = t3[next].get$sweep().get$center();
    t5.set$y($.add(t5.get$y(), delta.y));
    t5 = this.bodies;
    t6 = t5.length;
    if (next < 0 || next >= t6) throw $.ioore(next);
    t5[next].synchronizeTransform$0();
  }
  return done;
 },
 get$area: function() {
  var t1 = this.bodies;
  var t2 = this.bodies.length - 1;
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  var t4 = t1[t2].get$worldCenter().get$x();
  var t5 = this.bodies;
  var t6 = t5.length;
  if (0 < 0 || 0 >= t6) throw $.ioore(0);
  t4 = $.mul(t4, t5[0].get$worldCenter().get$y());
  var t7 = this.bodies;
  var t8 = t7.length;
  if (0 < 0 || 0 >= t8) throw $.ioore(0);
  var t9 = t7[0].get$worldCenter().get$x();
  var t10 = this.bodies;
  var t11 = this.bodies.length - 1;
  var t12 = t10.length;
  if (t11 < 0 || t11 >= t12) throw $.ioore(t11);
  t4 = $.sub(t4, $.mul(t9, t10[t11].get$worldCenter().get$y()));
  if (typeof t4 !== 'number') throw $.iae(t4);
  var result = 0.0 + t4;
  for (var i = 0; i < this.bodies.length - 1; ++i) {
    t1 = this.bodies;
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = t1[i].get$worldCenter().get$x();
    t4 = this.bodies;
    t5 = i + 1;
    t6 = t4.length;
    if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
    t3 = $.mul(t3, t4[t5].get$worldCenter().get$y());
    t7 = this.bodies;
    t8 = t7.length;
    if (t5 < 0 || t5 >= t8) throw $.ioore(t5);
    t9 = t7[t5].get$worldCenter().get$x();
    t10 = this.bodies;
    t11 = t10.length;
    if (i < 0 || i >= t11) throw $.ioore(i);
    t3 = $.sub(t3, $.mul(t9, t10[i].get$worldCenter().get$y()));
    if (typeof t3 !== 'number') throw $.iae(t3);
    result += t3;
  }
  return result * 0.5;
 },
 step$1: function(arg0) { return this.step.$call$1(arg0); },
 step$3: function(arg0, arg1, arg2) { return this.step.$call$3(arg0, arg1, arg2); },
 ConstantVolumeJoint$2: function(_world, def) {
  if ($.leB($.get$length(def.get$bodies()), 2)) throw $.captureStackTrace($.IllegalArgumentException$('You cannot create a constant volume joint with less than three bodies.'));
  this.bodies = $.ListFactory_List$from(def.get$bodies());
  var t1 = $.ListFactory_List(this.bodies.length);
  $.setRuntimeTypeInfo(t1, ({E: 'num'}));
  this.targetLengths = t1;
  for (var i = 0; i < this.targetLengths.length; ++i) {
    var next = i === this.targetLengths.length - 1 ? 0 : i + 1;
    t1 = this.bodies;
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var temp = $.Vector$copy(t1[i].get$worldCenter());
    var t3 = this.bodies;
    var t4 = t3.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    temp.subLocal$1(t3[next].get$worldCenter());
    var dist = $.get$length(temp);
    var t5 = this.targetLengths;
    var t6 = t5.length;
    if (i < 0 || i >= t6) throw $.ioore(i);
    t5[i] = dist;
  }
  this.targetVolume = this.get$area();
  if (!(def.get$joints() == null) && !$.eqB($.get$length(def.get$joints()), $.get$length(def.get$bodies()))) throw $.captureStackTrace($.IllegalArgumentException$('Incorrect joint definition.  Joints have to correspond to the bodies'));
  if (def.get$joints() == null) {
    var djd = $.DistanceJointDef$();
    t1 = $.ListFactory_List(this.bodies.length);
    $.setRuntimeTypeInfo(t1, ({E: 'DistanceJoint'}));
    this.distanceJoints = t1;
    for (i = 0; i < this.targetLengths.length; ++i) {
      next = i === this.targetLengths.length - 1 ? 0 : i + 1;
      djd.frequencyHz = def.get$frequencyHz();
      djd.dampingRatio = def.get$dampingRatio();
      t1 = this.bodies;
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t1 = t1[i];
      t3 = this.bodies;
      t4 = t3.length;
      if (next < 0 || next >= t4) throw $.ioore(next);
      t3 = t3[next];
      t5 = this.bodies;
      t6 = t5.length;
      if (i < 0 || i >= t6) throw $.ioore(i);
      var t7 = t5[i].get$worldCenter();
      var t8 = this.bodies;
      var t9 = t8.length;
      if (next < 0 || next >= t9) throw $.ioore(next);
      djd.initialize$4(t1, t3, t7, t8[next].get$worldCenter());
      $.indexSet(this.distanceJoints, i, this._world.createJoint$1(djd));
    }
  } else {
    t1 = $.ListFactory_List($.get$length(def.get$joints()));
    $.setRuntimeTypeInfo(t1, ({E: 'DistanceJoint'}));
    this.distanceJoints = t1;
    $.setRange$3(this.distanceJoints, 0, $.get$length(def.get$joints()), def.get$joints());
  }
  this.frequencyHz = def.get$frequencyHz();
  this.dampingRatio = def.get$dampingRatio();
  t1 = $.ListFactory_List(this.bodies.length);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  this.normals = t1;
  for (i = 0; i < this.normals.length; ++i) {
    t1 = this.normals;
    t2 = $.Vector$(0, 0);
    t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
  t1 = this.bodies;
  t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  this.bodyA = t1[0];
  t3 = this.bodies;
  t4 = t3.length;
  if (1 < 0 || 1 >= t4) throw $.ioore(1);
  this.bodyB = t3[1];
  this.collideConnected = false;
 }
};

$$.ConstantVolumeJointDef = {"":
 ["joints?", "bodies?", "dampingRatio?", "frequencyHz?", "collideConnected", "bodyB", "bodyA", "userData", "type"],
 super: "JointDef",
 addBody$1: function(argBody) {
  this.bodies.push(argBody);
  if (this.bodies.length === 1) this.bodyA = argBody;
  else {
    if (this.bodies.length === 2) this.bodyB = argBody;
  }
 },
 ConstantVolumeJointDef$0: function() {
  this.type = 10;
  this.collideConnected = false;
 }
};

$$.DistanceJoint = {"":
 ["bias", "gamma", "dampingRatio?", "frequencyHz?", "length=", "mass=", "impulse", "u", "localAnchor2", "localAnchor1", "invIB", "invMassB", "invIA", "invMassA", "localCenterB", "localCenterA", "userData", "collideConnected", "islandFlag", "bodyB", "bodyA", "edgeB", "edgeA", "_lib0_next", "_prev", "type"],
 super: "Joint",
 solvePositionConstraints$1: function(baumgarte) {
  var t1 = this.frequencyHz;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(1, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (t1 > 0.0) return true;
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
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(2, r1, r2, d, t1, b1, b2, 0, 0, 0, 0, 0);
  var t2 = r2.x;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(3, r1, t2, r2, d, t1, b1, b2, 0, 0, 0, 0);
  t2 += t1;
  t1 = b1.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(4, r1, r2, d, t2, b1, b2, t1, 0, 0, 0, 0);
  t1 = t2 - t1;
  t2 = r1.x;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(5, t1, r1, t2, r2, d, b1, b2, 0, 0, 0, 0);
  d.x = t1 - t2;
  var t3 = b2.get$sweep().get$center().get$y();
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(6, r1, r2, d, t3, b1, b2, 0, 0, 0, 0, 0);
  var t4 = r2.y;
  if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(7, r1, r2, t4, d, t3, b1, b2, 0, 0, 0, 0);
  t4 += t3;
  t3 = b1.get$sweep().get$center().get$y();
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(8, t3, r1, r2, d, t4, b1, b2, 0, 0, 0, 0);
  t3 = t4 - t3;
  t4 = r1.y;
  if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(9, r1, r2, d, t4, b1, b2, t3, 0, 0, 0, 0);
  d.y = t3 - t4;
  var len = d.normalize$0();
  if (typeof len !== 'number') return this.solvePositionConstraints$1$bailout(10, r1, r2, len, d, b1, b2, 0, 0, 0, 0, 0);
  var t5 = $.get$length(this);
  if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(11, r1, r2, len, d, t5, b1, b2, 0, 0, 0, 0);
  var C = $.MathBox_clamp(len - t5, -0.2, 0.2);
  if (typeof C !== 'number') return this.solvePositionConstraints$1$bailout(12, r1, r2, d, b1, b2, C, 0, 0, 0, 0, 0);
  var t6 = this.mass;
  if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(13, r1, r2, d, t6, b1, b2, C, 0, 0, 0, 0);
  var imp = -t6 * C;
  this.u.setFrom$1(d);
  var t7 = this.u.x;
  if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(14, r1, r2, imp, t7, b1, b2, C, 0, 0, 0, 0);
  var Px = imp * t7;
  t7 = this.u.y;
  if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(15, r1, r2, imp, Px, t7, b1, b2, C, 0, 0, 0);
  var Py = imp * t7;
  t7 = b1.get$sweep().get$center();
  var t8 = t7.get$x();
  if (typeof t8 !== 'number') return this.solvePositionConstraints$1$bailout(16, t8, r1, t7, r2, Py, Px, b1, b2, C, 0, 0);
  var t9 = b1.get$invMass();
  if (typeof t9 !== 'number') return this.solvePositionConstraints$1$bailout(17, t8, t9, r1, r2, t7, Py, Px, b1, b2, C, 0);
  t7.set$x(t8 - t9 * Px);
  t7 = b1.get$sweep().get$center();
  var t10 = t7.get$y();
  if (typeof t10 !== 'number') return this.solvePositionConstraints$1$bailout(18, Py, r1, r2, t7, t10, Px, b1, b2, C, 0, 0);
  var t11 = b1.get$invMass();
  if (typeof t11 !== 'number') return this.solvePositionConstraints$1$bailout(19, Py, r1, r2, t7, t10, t11, Px, b1, b2, C, 0);
  t7.set$y(t10 - t11 * Py);
  t7 = b1.get$sweep();
  var t12 = t7.get$angle();
  if (typeof t12 !== 'number') return this.solvePositionConstraints$1$bailout(20, t7, t12, r1, r2, Py, Px, b1, b2, C, 0, 0);
  var t13 = b1.get$invInertia();
  if (typeof t13 !== 'number') return this.solvePositionConstraints$1$bailout(21, t7, t12, t13, r2, r1, Py, Px, b1, b2, C, 0);
  var t14 = r1.x;
  if (typeof t14 !== 'number') return this.solvePositionConstraints$1$bailout(22, t7, t12, t13, r2, r1, Py, Px, t14, b1, b2, C);
  t14 *= Py;
  var t15 = r1.y;
  if (typeof t15 !== 'number') return this.solvePositionConstraints$1$bailout(23, t7, t12, t13, r2, t14, Py, Px, t15, b1, b2, C);
  t7.set$angle(t12 - t13 * (t14 - t15 * Px));
  t7 = b2.get$sweep().get$center();
  var t16 = t7.get$x();
  if (typeof t16 !== 'number') return this.solvePositionConstraints$1$bailout(24, Py, t7, t16, r2, Px, b1, C, b2, 0, 0, 0);
  var t17 = b2.get$invMass();
  if (typeof t17 !== 'number') return this.solvePositionConstraints$1$bailout(25, t7, t16, r2, t17, C, Px, b1, Py, b2, 0, 0);
  t7.set$x(t16 + t17 * Px);
  t7 = b2.get$sweep().get$center();
  var t18 = t7.get$y();
  if (typeof t18 !== 'number') return this.solvePositionConstraints$1$bailout(26, b1, r2, Px, t7, t18, Py, b2, C, 0, 0, 0);
  var t19 = b2.get$invMass();
  if (typeof t19 !== 'number') return this.solvePositionConstraints$1$bailout(27, b1, r2, Px, t7, t18, t19, Py, b2, C, 0, 0);
  t7.set$y(t18 + t19 * Py);
  t7 = b2.get$sweep();
  var t20 = t7.get$angle();
  if (typeof t20 !== 'number') return this.solvePositionConstraints$1$bailout(28, b2, t7, t20, r2, Px, Py, b1, C, 0, 0, 0);
  var t21 = b2.get$invInertia();
  if (typeof t21 !== 'number') return this.solvePositionConstraints$1$bailout(29, b2, t7, t20, t21, r2, Px, Py, b1, C, 0, 0);
  var t22 = r2.x;
  if (typeof t22 !== 'number') return this.solvePositionConstraints$1$bailout(30, b1, b2, t7, t20, t21, r2, Px, t22, Py, C, 0);
  t22 *= Py;
  var t23 = r2.y;
  if (typeof t23 !== 'number') return this.solvePositionConstraints$1$bailout(31, b2, t7, t20, t21, t22, Px, b1, t23, C, 0, 0);
  t7.set$angle(t20 + t21 * (t22 - t23 * Px));
  b1.synchronizeTransform$0();
  b2.synchronizeTransform$0();
  t7 = $.abs(C);
  if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(32, t7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  return t7 < 0.005;
 },
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      r1 = env0;
      r2 = env1;
      d = env2;
      t1 = env3;
      b1 = env4;
      b2 = env5;
      break;
    case 3:
      r1 = env0;
      t2 = env1;
      r2 = env2;
      d = env3;
      t1 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 4:
      r1 = env0;
      r2 = env1;
      d = env2;
      t2 = env3;
      b1 = env4;
      b2 = env5;
      t1 = env6;
      break;
    case 5:
      t1 = env0;
      r1 = env1;
      t2 = env2;
      r2 = env3;
      d = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 6:
      r1 = env0;
      r2 = env1;
      d = env2;
      t3 = env3;
      b1 = env4;
      b2 = env5;
      break;
    case 7:
      r1 = env0;
      r2 = env1;
      t4 = env2;
      d = env3;
      t3 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 8:
      t3 = env0;
      r1 = env1;
      r2 = env2;
      d = env3;
      t4 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 9:
      r1 = env0;
      r2 = env1;
      d = env2;
      t4 = env3;
      b1 = env4;
      b2 = env5;
      t3 = env6;
      break;
    case 10:
      r1 = env0;
      r2 = env1;
      len = env2;
      d = env3;
      b1 = env4;
      b2 = env5;
      break;
    case 11:
      r1 = env0;
      r2 = env1;
      len = env2;
      d = env3;
      t5 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 12:
      r1 = env0;
      r2 = env1;
      d = env2;
      b1 = env3;
      b2 = env4;
      C = env5;
      break;
    case 13:
      r1 = env0;
      r2 = env1;
      d = env2;
      t6 = env3;
      b1 = env4;
      b2 = env5;
      C = env6;
      break;
    case 14:
      r1 = env0;
      r2 = env1;
      imp = env2;
      t7 = env3;
      b1 = env4;
      b2 = env5;
      C = env6;
      break;
    case 15:
      r1 = env0;
      r2 = env1;
      imp = env2;
      Px = env3;
      t7 = env4;
      b1 = env5;
      b2 = env6;
      C = env7;
      break;
    case 16:
      t8 = env0;
      r1 = env1;
      t7 = env2;
      r2 = env3;
      Py = env4;
      Px = env5;
      b1 = env6;
      b2 = env7;
      C = env8;
      break;
    case 17:
      t8 = env0;
      t9 = env1;
      r1 = env2;
      r2 = env3;
      t7 = env4;
      Py = env5;
      Px = env6;
      b1 = env7;
      b2 = env8;
      C = env9;
      break;
    case 18:
      Py = env0;
      r1 = env1;
      r2 = env2;
      t7 = env3;
      t10 = env4;
      Px = env5;
      b1 = env6;
      b2 = env7;
      C = env8;
      break;
    case 19:
      Py = env0;
      r1 = env1;
      r2 = env2;
      t7 = env3;
      t10 = env4;
      t11 = env5;
      Px = env6;
      b1 = env7;
      b2 = env8;
      C = env9;
      break;
    case 20:
      t7 = env0;
      t12 = env1;
      r1 = env2;
      r2 = env3;
      Py = env4;
      Px = env5;
      b1 = env6;
      b2 = env7;
      C = env8;
      break;
    case 21:
      t7 = env0;
      t12 = env1;
      t13 = env2;
      r2 = env3;
      r1 = env4;
      Py = env5;
      Px = env6;
      b1 = env7;
      b2 = env8;
      C = env9;
      break;
    case 22:
      t7 = env0;
      t12 = env1;
      t13 = env2;
      r2 = env3;
      r1 = env4;
      Py = env5;
      Px = env6;
      t14 = env7;
      b1 = env8;
      b2 = env9;
      C = env10;
      break;
    case 23:
      t7 = env0;
      t12 = env1;
      t13 = env2;
      r2 = env3;
      t14 = env4;
      Py = env5;
      Px = env6;
      t15 = env7;
      b1 = env8;
      b2 = env9;
      C = env10;
      break;
    case 24:
      Py = env0;
      t7 = env1;
      t16 = env2;
      r2 = env3;
      Px = env4;
      b1 = env5;
      C = env6;
      b2 = env7;
      break;
    case 25:
      t7 = env0;
      t16 = env1;
      r2 = env2;
      t17 = env3;
      C = env4;
      Px = env5;
      b1 = env6;
      Py = env7;
      b2 = env8;
      break;
    case 26:
      b1 = env0;
      r2 = env1;
      Px = env2;
      t7 = env3;
      t18 = env4;
      Py = env5;
      b2 = env6;
      C = env7;
      break;
    case 27:
      b1 = env0;
      r2 = env1;
      Px = env2;
      t7 = env3;
      t18 = env4;
      t19 = env5;
      Py = env6;
      b2 = env7;
      C = env8;
      break;
    case 28:
      b2 = env0;
      t7 = env1;
      t20 = env2;
      r2 = env3;
      Px = env4;
      Py = env5;
      b1 = env6;
      C = env7;
      break;
    case 29:
      b2 = env0;
      t7 = env1;
      t20 = env2;
      t21 = env3;
      r2 = env4;
      Px = env5;
      Py = env6;
      b1 = env7;
      C = env8;
      break;
    case 30:
      b1 = env0;
      b2 = env1;
      t7 = env2;
      t20 = env3;
      t21 = env4;
      r2 = env5;
      Px = env6;
      t22 = env7;
      Py = env8;
      C = env9;
      break;
    case 31:
      b2 = env0;
      t7 = env1;
      t20 = env2;
      t21 = env3;
      t22 = env4;
      Px = env5;
      b1 = env6;
      t23 = env7;
      C = env8;
      break;
    case 32:
      t7 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.frequencyHz;
    case 1:
      state = 0;
      if ($.gtB(t1, 0.0)) return true;
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
      var t2 = r2.x;
    case 3:
      state = 0;
      t2 = $.add(t1, t2);
      t1 = b1.get$sweep().get$center().get$x();
    case 4:
      state = 0;
      t1 = $.sub(t2, t1);
      t2 = r1.x;
    case 5:
      state = 0;
      d.x = $.sub(t1, t2);
      var t3 = b2.get$sweep().get$center().get$y();
    case 6:
      state = 0;
      var t4 = r2.y;
    case 7:
      state = 0;
      t4 = $.add(t3, t4);
      t3 = b1.get$sweep().get$center().get$y();
    case 8:
      state = 0;
      t3 = $.sub(t4, t3);
      t4 = r1.y;
    case 9:
      state = 0;
      d.y = $.sub(t3, t4);
      var len = d.normalize$0();
    case 10:
      state = 0;
      var t5 = $.get$length(this);
    case 11:
      state = 0;
      var C = $.MathBox_clamp($.sub(len, t5), -0.2, 0.2);
    case 12:
      state = 0;
      var t6 = this.mass;
    case 13:
      state = 0;
      var imp = $.mul($.neg(t6), C);
      this.u.setFrom$1(d);
      var t7 = this.u.get$x();
    case 14:
      state = 0;
      var Px = $.mul(imp, t7);
      t7 = this.u.get$y();
    case 15:
      state = 0;
      var Py = $.mul(imp, t7);
      t7 = b1.get$sweep().get$center();
      var t8 = t7.get$x();
    case 16:
      state = 0;
      var t9 = b1.get$invMass();
    case 17:
      state = 0;
      t7.set$x($.sub(t8, $.mul(t9, Px)));
      t7 = b1.get$sweep().get$center();
      var t10 = t7.get$y();
    case 18:
      state = 0;
      var t11 = b1.get$invMass();
    case 19:
      state = 0;
      t7.set$y($.sub(t10, $.mul(t11, Py)));
      t7 = b1.get$sweep();
      var t12 = t7.get$angle();
    case 20:
      state = 0;
      var t13 = b1.get$invInertia();
    case 21:
      state = 0;
      var t14 = r1.x;
    case 22:
      state = 0;
      t14 = $.mul(t14, Py);
      var t15 = r1.y;
    case 23:
      state = 0;
      t7.set$angle($.sub(t12, $.mul(t13, $.sub(t14, $.mul(t15, Px)))));
      t7 = b2.get$sweep().get$center();
      var t16 = t7.get$x();
    case 24:
      state = 0;
      var t17 = b2.get$invMass();
    case 25:
      state = 0;
      t7.set$x($.add(t16, $.mul(t17, Px)));
      t7 = b2.get$sweep().get$center();
      var t18 = t7.get$y();
    case 26:
      state = 0;
      var t19 = b2.get$invMass();
    case 27:
      state = 0;
      t7.set$y($.add(t18, $.mul(t19, Py)));
      t7 = b2.get$sweep();
      var t20 = t7.get$angle();
    case 28:
      state = 0;
      var t21 = b2.get$invInertia();
    case 29:
      state = 0;
      var t22 = r2.x;
    case 30:
      state = 0;
      t22 = $.mul(t22, Py);
      var t23 = r2.y;
    case 31:
      state = 0;
      t7.set$angle($.add(t20, $.mul(t21, $.sub(t22, $.mul(t23, Px)))));
      b1.synchronizeTransform$0();
      b2.synchronizeTransform$0();
      t7 = $.abs(C);
    case 32:
      state = 0;
      return $.lt(t7, 0.005);
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
  var Cdot = $.Vector_dot(this.u, v2.subLocal$1(v1));
  var imp = $.mul($.neg(this.mass), $.add($.add(Cdot, this.bias), $.mul(this.gamma, this.impulse)));
  this.impulse = $.add(this.impulse, imp);
  var Px = $.mul(imp, this.u.get$x());
  var Py = $.mul(imp, this.u.get$y());
  var t1 = b1.get$linearVelocity();
  t1.set$x($.sub(t1.get$x(), $.mul(b1.get$invMass(), Px)));
  t1 = b1.get$linearVelocity();
  t1.set$y($.sub(t1.get$y(), $.mul(b1.get$invMass(), Py)));
  b1.set$angularVelocity($.sub(b1.get$angularVelocity(), $.mul(b1.get$invInertia(), $.sub($.mul(r1.x, Py), $.mul(r1.y, Px)))));
  t1 = b2.get$linearVelocity();
  t1.set$x($.add(t1.get$x(), $.mul(b2.get$invMass(), Px)));
  t1 = b2.get$linearVelocity();
  t1.set$y($.add(t1.get$y(), $.mul(b2.get$invMass(), Py)));
  b2.set$angularVelocity($.add(b2.get$angularVelocity(), $.mul(b2.get$invInertia(), $.sub($.mul(r2.x, Py), $.mul(r2.y, Px)))));
 },
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
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(1, step, r1, r2, t1, b1, b2, 0, 0, 0, 0, 0);
  var t2 = r2.x;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(2, step, t2, r1, r2, t1, b1, b2, 0, 0, 0, 0);
  t2 += t1;
  t1 = b1.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(3, step, t1, r1, r2, b1, b2, t2, 0, 0, 0, 0);
  t1 = t2 - t1;
  t2 = r1.x;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(4, step, t2, t1, r1, r2, b1, b2, 0, 0, 0, 0);
  t2 = t1 - t2;
  this.u.x = t2;
  t2 = b2.get$sweep().get$center().get$y();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(5, step, r1, r2, t2, b1, b2, 0, 0, 0, 0, 0);
  t1 = r2.y;
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(6, step, t1, r1, r2, t2, b1, b2, 0, 0, 0, 0);
  t1 += t2;
  t2 = b1.get$sweep().get$center().get$y();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(7, step, t2, r1, r2, b1, b2, t1, 0, 0, 0, 0);
  t2 = t1 - t2;
  t1 = r1.y;
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(8, step, t2, t1, r1, r2, b1, b2, 0, 0, 0, 0);
  t1 = t2 - t1;
  this.u.y = t1;
  var len = $.get$length(this.u);
  if (typeof len !== 'number') return this.initVelocityConstraints$1$bailout(9, step, r1, r2, len, b1, b2, 0, 0, 0, 0, 0);
  if (len > 0.005) {
    t1 = this.u;
    t2 = t1.x;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(10, step, t2, r1, t1, r2, len, b1, b2, 0, 0, 0);
    var t3 = 1.0 / len;
    t1.x = t2 * t3;
    t1 = this.u;
    var t4 = t1.y;
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(11, step, t3, r1, r2, t1, len, b1, b2, t4, 0, 0);
    t1.y = t4 * t3;
  } else this.u.setCoords$2(0.0, 0.0);
  var cr1u = $.Vector_crossVectors(r1, this.u);
  if (typeof cr1u !== 'number') return this.initVelocityConstraints$1$bailout(12, step, r1, r2, cr1u, len, b1, b2, 0, 0, 0, 0);
  var cr2u = $.Vector_crossVectors(r2, this.u);
  if (typeof cr2u !== 'number') return this.initVelocityConstraints$1$bailout(13, step, r1, r2, cr1u, cr2u, b1, b2, len, 0, 0, 0);
  t1 = b1.get$invMass();
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(14, step, b2, r1, r2, cr1u, cr2u, b1, t1, len, 0, 0);
  t2 = b1.get$invInertia();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(15, step, t2, b2, r1, r2, cr1u, cr2u, b1, t1, len, 0);
  t1 += t2 * cr1u * cr1u;
  t3 = b2.get$invMass();
  if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(16, step, t1, t3, r1, r2, len, b1, b2, cr2u, 0, 0);
  t3 += t1;
  t1 = b2.get$invInertia();
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(17, step, t3, t1, r2, r1, len, b1, b2, cr2u, 0, 0);
  var invMass = t3 + t1 * cr2u * cr2u;
  this.mass = 1.0 / invMass;
  t1 = this.frequencyHz;
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(18, step, invMass, r1, r2, len, b1, b2, t1, 0, 0, 0);
  if (t1 > 0.0) {
    t1 = $.get$length(this);
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(19, step, invMass, r1, r2, t1, len, b1, b2, 0, 0, 0);
    var C = len - t1;
    t1 = this.frequencyHz;
    if (typeof t1 !== 'number') throw $.iae(t1);
    var omega = 6.283185307179586 * t1;
    t1 = this.mass;
    if (typeof t1 !== 'number') throw $.iae(t1);
    t1 *= 2.0;
    t2 = this.dampingRatio;
    if (typeof t2 !== 'number') throw $.iae(t2);
    var d = t1 * t2 * omega;
    t3 = this.mass;
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(20, step, omega, t3, invMass, r1, r2, d, C, b1, b2, 0);
    var k = t3 * omega * omega;
    t4 = step.get$dt();
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(21, step, b2, invMass, r1, r2, d, C, b1, k, t4, 0);
    var t5 = step.get$dt();
    if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(22, step, t5, invMass, r1, b2, r2, d, C, b1, k, t4);
    this.gamma = t4 * (d + t5 * k);
    t1 = this.gamma;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(23, step, invMass, t1, r1, r2, C, b1, b2, k, 0, 0);
    if (!(t1 === 0.0)) {
      t1 = this.gamma;
      if (typeof t1 !== 'number') throw $.iae(t1);
      t1 = 1.0 / t1;
    } else t1 = 0.0;
    this.gamma = t1;
    t1 = step.get$dt();
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(24, step, invMass, t1, r1, r2, C, b1, b2, k, 0, 0);
    t2 = C * t1 * k;
    t3 = this.gamma;
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(25, step, invMass, t3, r1, r2, t2, b1, b2, 0, 0, 0);
    this.bias = t2 * t3;
    t4 = this.gamma;
    if (typeof t4 !== 'number') throw $.iae(t4);
    this.mass = invMass + t4;
    t1 = this.mass;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(26, step, r1, r2, t1, b1, b2, 0, 0, 0, 0, 0);
    if (!(t1 === 0.0)) {
      t1 = this.mass;
      if (typeof t1 !== 'number') throw $.iae(t1);
      t1 = 1.0 / t1;
    } else t1 = 0.0;
    this.mass = t1;
  }
  if (step.get$warmStarting() === true) {
    t1 = this.impulse;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(27, step, r1, r2, b1, b2, t1, 0, 0, 0, 0, 0);
    t2 = step.get$dtRatio();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(28, r1, r2, t2, b1, b2, t1, 0, 0, 0, 0, 0);
    this.impulse = t1 * t2;
    var P = $.Vector$(0, 0);
    P.setFrom$1(this.u).mulLocal$1(this.impulse);
    t3 = b1.get$linearVelocity();
    t4 = t3.get$x();
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(29, t3, t4, r1, r2, b1, b2, P, 0, 0, 0, 0);
    t5 = b1.get$invMass();
    if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(30, t3, t4, t5, r1, r2, b1, b2, P, 0, 0, 0);
    var t6 = P.x;
    if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(31, t6, t3, t4, t5, r1, r2, b1, b2, P, 0, 0);
    t3.set$x(t4 - t5 * t6);
    t3 = b1.get$linearVelocity();
    var t7 = t3.get$y();
    if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(32, t7, b2, r1, r2, b1, t3, P, 0, 0, 0, 0);
    var t8 = b1.get$invMass();
    if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(33, P, t7, b2, r1, r2, b1, t3, t8, 0, 0, 0);
    var t9 = P.y;
    if (typeof t9 !== 'number') return this.initVelocityConstraints$1$bailout(34, P, t7, t9, b2, r1, r2, b1, t3, t8, 0, 0);
    t3.set$y(t7 - t8 * t9);
    t3 = b1.get$angularVelocity();
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(35, t3, r1, r2, b1, b2, P, 0, 0, 0, 0, 0);
    var t10 = b1.get$invInertia();
    if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(36, t3, r1, t10, r2, b1, b2, P, 0, 0, 0, 0);
    var t11 = $.Vector_crossVectors(r1, P);
    if (typeof t11 !== 'number') return this.initVelocityConstraints$1$bailout(37, t3, t10, r2, t11, b1, b2, P, 0, 0, 0, 0);
    b1.set$angularVelocity(t3 - t10 * t11);
    var t12 = b2.get$linearVelocity();
    var t13 = t12.get$x();
    if (typeof t13 !== 'number') return this.initVelocityConstraints$1$bailout(38, t13, r2, t12, b2, P, 0, 0, 0, 0, 0, 0);
    var t14 = b2.get$invMass();
    if (typeof t14 !== 'number') return this.initVelocityConstraints$1$bailout(39, t13, t14, t12, r2, b2, P, 0, 0, 0, 0, 0);
    var t15 = P.x;
    if (typeof t15 !== 'number') return this.initVelocityConstraints$1$bailout(40, t13, t14, t12, t15, r2, b2, P, 0, 0, 0, 0);
    t12.set$x(t13 + t14 * t15);
    t12 = b2.get$linearVelocity();
    var t16 = t12.get$y();
    if (typeof t16 !== 'number') return this.initVelocityConstraints$1$bailout(41, t12, r2, t16, b2, P, 0, 0, 0, 0, 0, 0);
    var t17 = b2.get$invMass();
    if (typeof t17 !== 'number') return this.initVelocityConstraints$1$bailout(42, t12, r2, t16, t17, b2, P, 0, 0, 0, 0, 0);
    var t18 = P.y;
    if (typeof t18 !== 'number') return this.initVelocityConstraints$1$bailout(43, t18, t12, r2, t16, t17, b2, P, 0, 0, 0, 0);
    t12.set$y(t16 + t17 * t18);
    t12 = b2.get$angularVelocity();
    if (typeof t12 !== 'number') return this.initVelocityConstraints$1$bailout(44, t12, r2, b2, P, 0, 0, 0, 0, 0, 0, 0);
    var t19 = b2.get$invInertia();
    if (typeof t19 !== 'number') return this.initVelocityConstraints$1$bailout(45, t12, t19, r2, b2, P, 0, 0, 0, 0, 0, 0);
    var t20 = $.Vector_crossVectors(r2, P);
    if (typeof t20 !== 'number') return this.initVelocityConstraints$1$bailout(46, t12, t19, t20, b2, 0, 0, 0, 0, 0, 0, 0);
    b2.set$angularVelocity(t12 + t19 * t20);
  } else this.impulse = 0.0;
 },
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var step = env0;
      r1 = env1;
      r2 = env2;
      t1 = env3;
      b1 = env4;
      b2 = env5;
      break;
    case 2:
      step = env0;
      t2 = env1;
      r1 = env2;
      r2 = env3;
      t1 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 3:
      step = env0;
      t1 = env1;
      r1 = env2;
      r2 = env3;
      b1 = env4;
      b2 = env5;
      t2 = env6;
      break;
    case 4:
      step = env0;
      t2 = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 5:
      step = env0;
      r1 = env1;
      r2 = env2;
      t2 = env3;
      b1 = env4;
      b2 = env5;
      break;
    case 6:
      step = env0;
      t1 = env1;
      r1 = env2;
      r2 = env3;
      t2 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 7:
      step = env0;
      t2 = env1;
      r1 = env2;
      r2 = env3;
      b1 = env4;
      b2 = env5;
      t1 = env6;
      break;
    case 8:
      step = env0;
      t2 = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 9:
      step = env0;
      r1 = env1;
      r2 = env2;
      len = env3;
      b1 = env4;
      b2 = env5;
      break;
    case 10:
      step = env0;
      t2 = env1;
      r1 = env2;
      t1 = env3;
      r2 = env4;
      len = env5;
      b1 = env6;
      b2 = env7;
      break;
    case 11:
      step = env0;
      t3 = env1;
      r1 = env2;
      r2 = env3;
      t1 = env4;
      len = env5;
      b1 = env6;
      b2 = env7;
      t4 = env8;
      break;
    case 12:
      step = env0;
      r1 = env1;
      r2 = env2;
      cr1u = env3;
      len = env4;
      b1 = env5;
      b2 = env6;
      break;
    case 13:
      step = env0;
      r1 = env1;
      r2 = env2;
      cr1u = env3;
      cr2u = env4;
      b1 = env5;
      b2 = env6;
      len = env7;
      break;
    case 14:
      step = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      cr1u = env4;
      cr2u = env5;
      b1 = env6;
      t1 = env7;
      len = env8;
      break;
    case 15:
      step = env0;
      t2 = env1;
      b2 = env2;
      r1 = env3;
      r2 = env4;
      cr1u = env5;
      cr2u = env6;
      b1 = env7;
      t1 = env8;
      len = env9;
      break;
    case 16:
      step = env0;
      t1 = env1;
      t3 = env2;
      r1 = env3;
      r2 = env4;
      len = env5;
      b1 = env6;
      b2 = env7;
      cr2u = env8;
      break;
    case 17:
      step = env0;
      t3 = env1;
      t1 = env2;
      r2 = env3;
      r1 = env4;
      len = env5;
      b1 = env6;
      b2 = env7;
      cr2u = env8;
      break;
    case 18:
      step = env0;
      invMass = env1;
      r1 = env2;
      r2 = env3;
      len = env4;
      b1 = env5;
      b2 = env6;
      t1 = env7;
      break;
    case 19:
      step = env0;
      invMass = env1;
      r1 = env2;
      r2 = env3;
      t1 = env4;
      len = env5;
      b1 = env6;
      b2 = env7;
      break;
    case 20:
      step = env0;
      omega = env1;
      t3 = env2;
      invMass = env3;
      r1 = env4;
      r2 = env5;
      d = env6;
      C = env7;
      b1 = env8;
      b2 = env9;
      break;
    case 21:
      step = env0;
      b2 = env1;
      invMass = env2;
      r1 = env3;
      r2 = env4;
      d = env5;
      C = env6;
      b1 = env7;
      k = env8;
      t4 = env9;
      break;
    case 22:
      step = env0;
      t5 = env1;
      invMass = env2;
      r1 = env3;
      b2 = env4;
      r2 = env5;
      d = env6;
      C = env7;
      b1 = env8;
      k = env9;
      t4 = env10;
      break;
    case 23:
      step = env0;
      invMass = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      C = env5;
      b1 = env6;
      b2 = env7;
      k = env8;
      break;
    case 24:
      step = env0;
      invMass = env1;
      t1 = env2;
      r1 = env3;
      r2 = env4;
      C = env5;
      b1 = env6;
      b2 = env7;
      k = env8;
      break;
    case 25:
      step = env0;
      invMass = env1;
      t3 = env2;
      r1 = env3;
      r2 = env4;
      t2 = env5;
      b1 = env6;
      b2 = env7;
      break;
    case 26:
      step = env0;
      r1 = env1;
      r2 = env2;
      t1 = env3;
      b1 = env4;
      b2 = env5;
      break;
    case 27:
      step = env0;
      r1 = env1;
      r2 = env2;
      b1 = env3;
      b2 = env4;
      t1 = env5;
      break;
    case 28:
      r1 = env0;
      r2 = env1;
      t2 = env2;
      b1 = env3;
      b2 = env4;
      t1 = env5;
      break;
    case 29:
      t3 = env0;
      t4 = env1;
      r1 = env2;
      r2 = env3;
      b1 = env4;
      b2 = env5;
      P = env6;
      break;
    case 30:
      t3 = env0;
      t4 = env1;
      t5 = env2;
      r1 = env3;
      r2 = env4;
      b1 = env5;
      b2 = env6;
      P = env7;
      break;
    case 31:
      t6 = env0;
      t3 = env1;
      t4 = env2;
      t5 = env3;
      r1 = env4;
      r2 = env5;
      b1 = env6;
      b2 = env7;
      P = env8;
      break;
    case 32:
      t7 = env0;
      b2 = env1;
      r1 = env2;
      r2 = env3;
      b1 = env4;
      t3 = env5;
      P = env6;
      break;
    case 33:
      P = env0;
      t7 = env1;
      b2 = env2;
      r1 = env3;
      r2 = env4;
      b1 = env5;
      t3 = env6;
      t8 = env7;
      break;
    case 34:
      P = env0;
      t7 = env1;
      t9 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      b1 = env6;
      t3 = env7;
      t8 = env8;
      break;
    case 35:
      t3 = env0;
      r1 = env1;
      r2 = env2;
      b1 = env3;
      b2 = env4;
      P = env5;
      break;
    case 36:
      t3 = env0;
      r1 = env1;
      t10 = env2;
      r2 = env3;
      b1 = env4;
      b2 = env5;
      P = env6;
      break;
    case 37:
      t3 = env0;
      t10 = env1;
      r2 = env2;
      t11 = env3;
      b1 = env4;
      b2 = env5;
      P = env6;
      break;
    case 38:
      t13 = env0;
      r2 = env1;
      t12 = env2;
      b2 = env3;
      P = env4;
      break;
    case 39:
      t13 = env0;
      t14 = env1;
      t12 = env2;
      r2 = env3;
      b2 = env4;
      P = env5;
      break;
    case 40:
      t13 = env0;
      t14 = env1;
      t12 = env2;
      t15 = env3;
      r2 = env4;
      b2 = env5;
      P = env6;
      break;
    case 41:
      t12 = env0;
      r2 = env1;
      t16 = env2;
      b2 = env3;
      P = env4;
      break;
    case 42:
      t12 = env0;
      r2 = env1;
      t16 = env2;
      t17 = env3;
      b2 = env4;
      P = env5;
      break;
    case 43:
      t18 = env0;
      t12 = env1;
      r2 = env2;
      t16 = env3;
      t17 = env4;
      b2 = env5;
      P = env6;
      break;
    case 44:
      t12 = env0;
      r2 = env1;
      b2 = env2;
      P = env3;
      break;
    case 45:
      t12 = env0;
      t19 = env1;
      r2 = env2;
      b2 = env3;
      P = env4;
      break;
    case 46:
      t12 = env0;
      t19 = env1;
      t20 = env2;
      b2 = env3;
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
      var t2 = r2.x;
    case 2:
      state = 0;
      t2 = $.add(t1, t2);
      t1 = b1.get$sweep().get$center().get$x();
    case 3:
      state = 0;
      t1 = $.sub(t2, t1);
      t2 = r1.x;
    case 4:
      state = 0;
      t2 = $.sub(t1, t2);
      this.u.set$x(t2);
      t2 = b2.get$sweep().get$center().get$y();
    case 5:
      state = 0;
      t1 = r2.y;
    case 6:
      state = 0;
      t1 = $.add(t2, t1);
      t2 = b1.get$sweep().get$center().get$y();
    case 7:
      state = 0;
      t2 = $.sub(t1, t2);
      t1 = r1.y;
    case 8:
      state = 0;
      t1 = $.sub(t2, t1);
      this.u.set$y(t1);
      var len = $.get$length(this.u);
    case 9:
      state = 0;
    case 10:
    case 11:
      if (state == 10 || state == 11 || (state == 0 && $.gtB(len, 0.005))) {
        switch (state) {
          case 0:
            t1 = this.u;
            t2 = t1.get$x();
          case 10:
            state = 0;
            if (typeof len !== 'number') throw $.iae(len);
            var t3 = 1.0 / len;
            t1.set$x($.mul(t2, t3));
            t1 = this.u;
            var t4 = t1.get$y();
          case 11:
            state = 0;
            t1.set$y($.mul(t4, t3));
        }
      } else {
        this.u.setCoords$2(0.0, 0.0);
      }
      var cr1u = $.Vector_crossVectors(r1, this.u);
    case 12:
      state = 0;
      var cr2u = $.Vector_crossVectors(r2, this.u);
    case 13:
      state = 0;
      t1 = b1.get$invMass();
    case 14:
      state = 0;
      t2 = b1.get$invInertia();
    case 15:
      state = 0;
      t1 = $.add(t1, $.mul($.mul(t2, cr1u), cr1u));
      t3 = b2.get$invMass();
    case 16:
      state = 0;
      t3 = $.add(t1, t3);
      t1 = b2.get$invInertia();
    case 17:
      state = 0;
      var invMass = $.add(t3, $.mul($.mul(t1, cr2u), cr2u));
      if (typeof invMass !== 'number') throw $.iae(invMass);
      this.mass = 1.0 / invMass;
      t1 = this.frequencyHz;
    case 18:
      state = 0;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
      if (state == 19 || state == 20 || state == 21 || state == 22 || state == 23 || state == 24 || state == 25 || state == 26 || (state == 0 && $.gtB(t1, 0.0))) {
        switch (state) {
          case 0:
            t1 = $.get$length(this);
          case 19:
            state = 0;
            var C = $.sub(len, t1);
            t1 = this.frequencyHz;
            if (typeof t1 !== 'number') throw $.iae(t1);
            var omega = 6.283185307179586 * t1;
            t1 = this.mass;
            if (typeof t1 !== 'number') throw $.iae(t1);
            t1 *= 2.0;
            t2 = this.dampingRatio;
            if (typeof t2 !== 'number') throw $.iae(t2);
            var d = t1 * t2 * omega;
            t3 = this.mass;
          case 20:
            state = 0;
            var k = $.mul($.mul(t3, omega), omega);
            t4 = step.get$dt();
          case 21:
            state = 0;
            var t5 = step.get$dt();
          case 22:
            state = 0;
            t5 = $.mul(t5, k);
            if (typeof t5 !== 'number') throw $.iae(t5);
            this.gamma = $.mul(t4, d + t5);
            t1 = this.gamma;
          case 23:
            state = 0;
            if (!$.eqB(t1, 0.0)) {
              t1 = this.gamma;
              if (typeof t1 !== 'number') throw $.iae(t1);
              t1 = 1.0 / t1;
            } else t1 = 0.0;
            this.gamma = t1;
            t1 = step.get$dt();
          case 24:
            state = 0;
            t2 = $.mul($.mul(C, t1), k);
            t3 = this.gamma;
          case 25:
            state = 0;
            this.bias = $.mul(t2, t3);
            t4 = this.gamma;
            if (typeof t4 !== 'number') throw $.iae(t4);
            this.mass = invMass + t4;
            t1 = this.mass;
          case 26:
            state = 0;
            if (!$.eqB(t1, 0.0)) {
              t1 = this.mass;
              if (typeof t1 !== 'number') throw $.iae(t1);
              t1 = 1.0 / t1;
            } else t1 = 0.0;
            this.mass = t1;
        }
      }
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
    case 43:
    case 44:
    case 45:
    case 46:
      if (state == 27 || state == 28 || state == 29 || state == 30 || state == 31 || state == 32 || state == 33 || state == 34 || state == 35 || state == 36 || state == 37 || state == 38 || state == 39 || state == 40 || state == 41 || state == 42 || state == 43 || state == 44 || state == 45 || state == 46 || (state == 0 && step.get$warmStarting() === true)) {
        switch (state) {
          case 0:
            t1 = this.impulse;
          case 27:
            state = 0;
            t2 = step.get$dtRatio();
          case 28:
            state = 0;
            this.impulse = $.mul(t1, t2);
            var P = $.Vector$(0, 0);
            P.setFrom$1(this.u).mulLocal$1(this.impulse);
            t3 = b1.get$linearVelocity();
            t4 = t3.get$x();
          case 29:
            state = 0;
            t5 = b1.get$invMass();
          case 30:
            state = 0;
            var t6 = P.x;
          case 31:
            state = 0;
            t3.set$x($.sub(t4, $.mul(t5, t6)));
            t3 = b1.get$linearVelocity();
            var t7 = t3.get$y();
          case 32:
            state = 0;
            var t8 = b1.get$invMass();
          case 33:
            state = 0;
            var t9 = P.y;
          case 34:
            state = 0;
            t3.set$y($.sub(t7, $.mul(t8, t9)));
            t3 = b1.get$angularVelocity();
          case 35:
            state = 0;
            var t10 = b1.get$invInertia();
          case 36:
            state = 0;
            var t11 = $.Vector_crossVectors(r1, P);
          case 37:
            state = 0;
            b1.set$angularVelocity($.sub(t3, $.mul(t10, t11)));
            var t12 = b2.get$linearVelocity();
            var t13 = t12.get$x();
          case 38:
            state = 0;
            var t14 = b2.get$invMass();
          case 39:
            state = 0;
            var t15 = P.x;
          case 40:
            state = 0;
            t12.set$x($.add(t13, $.mul(t14, t15)));
            t12 = b2.get$linearVelocity();
            var t16 = t12.get$y();
          case 41:
            state = 0;
            var t17 = b2.get$invMass();
          case 42:
            state = 0;
            var t18 = P.y;
          case 43:
            state = 0;
            t12.set$y($.add(t16, $.mul(t17, t18)));
            t12 = b2.get$angularVelocity();
          case 44:
            state = 0;
            var t19 = b2.get$invInertia();
          case 45:
            state = 0;
            var t20 = $.Vector_crossVectors(r2, P);
          case 46:
            state = 0;
            b2.set$angularVelocity($.add(t12, $.mul(t19, t20)));
        }
      } else {
        this.impulse = 0.0;
      }
  }
 },
 getAnchorB$1: function(argOut) {
  this.bodyB.getWorldPointToOut$2(this.localAnchor2, argOut);
 },
 getAnchorA$1: function(argOut) {
  this.bodyA.getWorldPointToOut$2(this.localAnchor1, argOut);
 }
};

$$.DistanceJointDef = {"":
 ["dampingRatio?", "frequencyHz?", "length=", "localAnchorB?", "localAnchorA?", "collideConnected", "bodyB", "bodyA", "userData", "type"],
 super: "JointDef",
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
 ["_maxTorque", "_maxForce", "_angularImpulse", "_linearImpulse", "_localAnchorB", "_localAnchorA", "invIB", "invMassB", "invIA", "invMassA", "localCenterB", "localCenterA", "userData", "collideConnected", "islandFlag", "bodyB", "bodyA", "edgeB", "edgeA", "_lib0_next", "_prev", "type"],
 super: "Joint",
 solvePositionConstraints$1: function(baumgarte) {
  return true;
 },
 solveVelocityConstraints$1: function(step) {
  var Cdot = $.sub(this.bodyB.get$angularVelocity(), this.bodyA.get$angularVelocity());
  var angularMass = $.add(this.bodyA.get$invInertia(), this.bodyB.get$invInertia());
  if ($.gtB(angularMass, 0.0)) {
    if (typeof angularMass !== 'number') throw $.iae(angularMass);
    angularMass = 1.0 / angularMass;
  }
  var impulse = $.mul($.neg(angularMass), Cdot);
  var oldImpulse = this._angularImpulse;
  var maxImpulse = $.mul(step.get$dt(), this._maxTorque);
  this._angularImpulse = $.MathBox_clamp($.add(this._angularImpulse, impulse), $.neg(maxImpulse), maxImpulse);
  var impulse0 = $.sub(this._angularImpulse, oldImpulse);
  var t1 = this.bodyA;
  t1.set$angularVelocity($.sub(t1.get$angularVelocity(), $.mul(this.bodyA.get$invInertia(), impulse0)));
  t1 = this.bodyB;
  t1.set$angularVelocity($.add(t1.get$angularVelocity(), $.mul(this.bodyB.get$invInertia(), impulse0)));
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
  t1 = $.add($.add($.add(this.bodyA.get$invMass(), this.bodyB.get$invMass()), $.mul($.mul(this.bodyA.get$invInertia(), r1.y), r1.y)), $.mul($.mul(this.bodyB.get$invInertia(), r2.y), r2.y));
  K.col1.set$x(t1);
  t1 = $.sub($.mul($.mul($.neg(this.bodyA.get$invInertia()), r1.x), r1.y), $.mul($.mul(this.bodyB.get$invInertia(), r2.x), r2.y));
  K.col1.set$y(t1);
  t1 = K.col1.get$y();
  K.col2.set$x(t1);
  t1 = $.add($.add($.add(this.bodyA.get$invMass(), this.bodyB.get$invMass()), $.mul($.mul(this.bodyA.get$invInertia(), r1.x), r1.x)), $.mul($.mul(this.bodyB.get$invInertia(), r2.x), r2.x));
  K.col2.set$y(t1);
  var linearMass = $.Matrix22$(null, null);
  linearMass.setFrom$1(K);
  linearMass.invertLocal$0();
  var impulse1 = $.Vector$(0, 0);
  $.Matrix22_mulMatrixAndVectorToOut(linearMass, Cdot, impulse1);
  impulse1.negateLocal$0();
  oldImpulse = $.Vector$(0, 0);
  oldImpulse.setFrom$1(this._linearImpulse);
  this._linearImpulse.addLocal$1(impulse1);
  var maxImpulse0 = $.mul(step.get$dt(), this._maxForce);
  if ($.gtB(this._linearImpulse.get$lengthSquared(), $.mul(maxImpulse0, maxImpulse0))) {
    this._linearImpulse.normalize$0();
    this._linearImpulse.mulLocal$1(maxImpulse0);
  }
  impulse1.setFrom$1(this._linearImpulse).subLocal$1(oldImpulse);
  t1 = this.bodyA.get$linearVelocity();
  t1.set$x($.sub(t1.get$x(), $.mul(impulse1.x, this.bodyA.get$invMass())));
  t1 = this.bodyA.get$linearVelocity();
  t1.set$y($.sub(t1.get$y(), $.mul(impulse1.y, this.bodyA.get$invMass())));
  t1 = this.bodyA;
  t1.set$angularVelocity($.sub(t1.get$angularVelocity(), $.mul(this.bodyA.get$invInertia(), $.Vector_crossVectors(r1, impulse1))));
  t1 = this.bodyB.get$linearVelocity();
  t1.set$x($.add(t1.get$x(), $.mul(impulse1.x, this.bodyB.get$invMass())));
  t1 = this.bodyB.get$linearVelocity();
  t1.set$y($.add(t1.get$y(), $.mul(impulse1.y, this.bodyB.get$invMass())));
  t1 = this.bodyB;
  t1.set$angularVelocity($.add(t1.get$angularVelocity(), $.mul(this.bodyB.get$invInertia(), $.Vector_crossVectors(r2, impulse1))));
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
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(1, step, t1, r1, K, r2, 0, 0);
  var t2 = this.bodyB.get$invMass();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(2, step, t1, t2, r1, r2, K, 0);
  t2 += t1;
  t1 = this.bodyA.get$invInertia();
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(3, step, t2, r1, t1, r2, K, 0);
  var t3 = r1.y;
  if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(4, step, t3, t2, r1, t1, r2, K);
  t3 *= t1;
  t1 = r1.y;
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(5, step, t1, t2, r1, r2, t3, K);
  t2 += t3 * t1;
  var t4 = this.bodyB.get$invInertia();
  if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(6, step, t4, r1, r2, K, t2, 0);
  var t5 = r2.y;
  if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(7, step, t4, t5, r1, r2, K, t2);
  t5 *= t4;
  t4 = r2.y;
  if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(8, step, t5, r1, t4, r2, K, t2);
  t2 += t5 * t4;
  K.col1.set$x(t2);
  t2 = this.bodyA.get$invInertia();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(9, step, t2, r1, K, r2, 0, 0);
  t2 = -t2;
  var t6 = r1.x;
  if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(10, step, r1, r2, t6, K, t2, 0);
  t6 *= t2;
  t2 = r1.y;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(11, step, t6, r1, r2, t2, K, 0);
  t2 *= t6;
  t6 = this.bodyB.get$invInertia();
  if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(12, step, t2, r1, t6, r2, K, 0);
  var t7 = r2.x;
  if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(13, step, t2, r1, t6, r2, t7, K);
  t7 *= t6;
  t6 = r2.y;
  if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(14, step, t2, r1, r2, t7, t6, K);
  t2 -= t7 * t6;
  K.col1.set$y(t2);
  t2 = K.col1.get$y();
  K.col2.set$x(t2);
  t2 = this.bodyA.get$invMass();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(15, step, K, r1, t2, r2, 0, 0);
  var t8 = this.bodyB.get$invMass();
  if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(16, step, r1, t2, r2, t8, K, 0);
  t8 += t2;
  t2 = this.bodyA.get$invInertia();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(17, step, r1, r2, t8, t2, K, 0);
  var t9 = r1.x;
  if (typeof t9 !== 'number') return this.initVelocityConstraints$1$bailout(18, step, t9, r1, r2, t8, t2, K);
  t9 *= t2;
  t2 = r1.x;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(19, step, t2, r1, r2, t8, K, t9);
  t8 += t9 * t2;
  var t10 = this.bodyB.get$invInertia();
  if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(20, step, t8, r1, t10, r2, K, 0);
  var t11 = r2.x;
  if (typeof t11 !== 'number') return this.initVelocityConstraints$1$bailout(21, step, t8, r1, t10, r2, t11, K);
  t11 *= t10;
  t10 = r2.x;
  if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(22, step, t8, r1, t10, r2, t11, K);
  t8 += t11 * t10;
  K.col2.set$y(t8);
  var linearMass = $.Matrix22$(null, null);
  linearMass.setFrom$1(K);
  linearMass.invertLocal$0();
  t8 = this.bodyA.get$invInertia();
  if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(23, step, r1, t8, r2, 0, 0, 0);
  var t12 = this.bodyB.get$invInertia();
  if (typeof t12 !== 'number') return this.initVelocityConstraints$1$bailout(24, step, t12, r1, t8, r2, 0, 0);
  t8 + t12 > 0.0;
  if (step.get$warmStarting() === true) {
    this._linearImpulse.mulLocal$1(step.get$dtRatio());
    t1 = this._angularImpulse;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(25, step, t1, r1, r2, 0, 0, 0);
    t2 = step.get$dtRatio();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(26, t2, t1, r1, r2, 0, 0, 0);
    this._angularImpulse = t1 * t2;
    var P = $.Vector$(0, 0);
    P.setFrom$1(this._linearImpulse);
    t3 = this.bodyA.get$linearVelocity();
    t4 = t3.get$x();
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(27, t3, t4, P, r1, r2, 0, 0);
    t5 = this.bodyA.get$invMass();
    if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(28, P, r1, r2, t3, t4, t5, 0);
    t6 = P.x;
    if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(29, t6, P, r1, r2, t3, t4, t5);
    t3.set$x(t4 - t5 * t6);
    t3 = this.bodyA.get$linearVelocity();
    t7 = t3.get$y();
    if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(30, t7, t3, P, r1, r2, 0, 0);
    t8 = this.bodyA.get$invMass();
    if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(31, t3, P, r1, t8, r2, t7, 0);
    t9 = P.y;
    if (typeof t9 !== 'number') return this.initVelocityConstraints$1$bailout(32, t3, P, r1, t8, r2, t7, t9);
    t3.set$y(t7 - t8 * t9);
    t3 = this.bodyA;
    t10 = t3.get$angularVelocity();
    if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(33, t10, P, t3, r1, r2, 0, 0);
    t11 = this.bodyA.get$invInertia();
    if (typeof t11 !== 'number') return this.initVelocityConstraints$1$bailout(34, t11, P, t3, r1, r2, t10, 0);
    t12 = $.Vector_crossVectors(r1, P);
    if (typeof t12 !== 'number') return this.initVelocityConstraints$1$bailout(35, t11, t12, P, t3, r2, t10, 0);
    var t13 = this._angularImpulse;
    if (typeof t13 !== 'number') return this.initVelocityConstraints$1$bailout(36, t11, t12, P, t3, r2, t13, t10);
    t3.set$angularVelocity(t10 - t11 * (t12 + t13));
    t3 = this.bodyB.get$linearVelocity();
    var t14 = t3.get$x();
    if (typeof t14 !== 'number') return this.initVelocityConstraints$1$bailout(37, P, t3, t14, r2, 0, 0, 0);
    var t15 = this.bodyB.get$invMass();
    if (typeof t15 !== 'number') return this.initVelocityConstraints$1$bailout(38, t15, P, t3, t14, r2, 0, 0);
    var t16 = P.x;
    if (typeof t16 !== 'number') return this.initVelocityConstraints$1$bailout(39, P, r2, t16, t3, t14, t15, 0);
    t3.set$x(t14 + t15 * t16);
    t3 = this.bodyB.get$linearVelocity();
    var t17 = t3.get$y();
    if (typeof t17 !== 'number') return this.initVelocityConstraints$1$bailout(40, t3, t17, P, r2, 0, 0, 0);
    var t18 = this.bodyB.get$invMass();
    if (typeof t18 !== 'number') return this.initVelocityConstraints$1$bailout(41, t3, t17, t18, P, r2, 0, 0);
    var t19 = P.y;
    if (typeof t19 !== 'number') return this.initVelocityConstraints$1$bailout(42, P, t3, t17, t18, r2, t19, 0);
    t3.set$y(t17 + t18 * t19);
    t3 = this.bodyB;
    var t20 = t3.get$angularVelocity();
    if (typeof t20 !== 'number') return this.initVelocityConstraints$1$bailout(43, t20, P, t3, r2, 0, 0, 0);
    var t21 = this.bodyB.get$invInertia();
    if (typeof t21 !== 'number') return this.initVelocityConstraints$1$bailout(44, t20, t21, P, t3, r2, 0, 0);
    var t22 = $.Vector_crossVectors(r2, P);
    if (typeof t22 !== 'number') return this.initVelocityConstraints$1$bailout(45, t20, t21, t22, t3, 0, 0, 0);
    var t23 = this._angularImpulse;
    if (typeof t23 !== 'number') return this.initVelocityConstraints$1$bailout(46, t23, t20, t21, t22, t3, 0, 0);
    t3.set$angularVelocity(t20 + t21 * (t22 + t23));
  } else {
    this._linearImpulse.setZero$0();
    this._angularImpulse = 0.0;
  }
 },
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
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
      t2 = env2;
      r1 = env3;
      r2 = env4;
      K = env5;
      break;
    case 3:
      step = env0;
      t2 = env1;
      r1 = env2;
      t1 = env3;
      r2 = env4;
      K = env5;
      break;
    case 4:
      step = env0;
      t3 = env1;
      t2 = env2;
      r1 = env3;
      t1 = env4;
      r2 = env5;
      K = env6;
      break;
    case 5:
      step = env0;
      t1 = env1;
      t2 = env2;
      r1 = env3;
      r2 = env4;
      t3 = env5;
      K = env6;
      break;
    case 6:
      step = env0;
      t4 = env1;
      r1 = env2;
      r2 = env3;
      K = env4;
      t2 = env5;
      break;
    case 7:
      step = env0;
      t4 = env1;
      t5 = env2;
      r1 = env3;
      r2 = env4;
      K = env5;
      t2 = env6;
      break;
    case 8:
      step = env0;
      t5 = env1;
      r1 = env2;
      t4 = env3;
      r2 = env4;
      K = env5;
      t2 = env6;
      break;
    case 9:
      step = env0;
      t2 = env1;
      r1 = env2;
      K = env3;
      r2 = env4;
      break;
    case 10:
      step = env0;
      r1 = env1;
      r2 = env2;
      t6 = env3;
      K = env4;
      t2 = env5;
      break;
    case 11:
      step = env0;
      t6 = env1;
      r1 = env2;
      r2 = env3;
      t2 = env4;
      K = env5;
      break;
    case 12:
      step = env0;
      t2 = env1;
      r1 = env2;
      t6 = env3;
      r2 = env4;
      K = env5;
      break;
    case 13:
      step = env0;
      t2 = env1;
      r1 = env2;
      t6 = env3;
      r2 = env4;
      t7 = env5;
      K = env6;
      break;
    case 14:
      step = env0;
      t2 = env1;
      r1 = env2;
      r2 = env3;
      t7 = env4;
      t6 = env5;
      K = env6;
      break;
    case 15:
      step = env0;
      K = env1;
      r1 = env2;
      t2 = env3;
      r2 = env4;
      break;
    case 16:
      step = env0;
      r1 = env1;
      t2 = env2;
      r2 = env3;
      t8 = env4;
      K = env5;
      break;
    case 17:
      step = env0;
      r1 = env1;
      r2 = env2;
      t8 = env3;
      t2 = env4;
      K = env5;
      break;
    case 18:
      step = env0;
      t9 = env1;
      r1 = env2;
      r2 = env3;
      t8 = env4;
      t2 = env5;
      K = env6;
      break;
    case 19:
      step = env0;
      t2 = env1;
      r1 = env2;
      r2 = env3;
      t8 = env4;
      K = env5;
      t9 = env6;
      break;
    case 20:
      step = env0;
      t8 = env1;
      r1 = env2;
      t10 = env3;
      r2 = env4;
      K = env5;
      break;
    case 21:
      step = env0;
      t8 = env1;
      r1 = env2;
      t10 = env3;
      r2 = env4;
      t11 = env5;
      K = env6;
      break;
    case 22:
      step = env0;
      t8 = env1;
      r1 = env2;
      t10 = env3;
      r2 = env4;
      t11 = env5;
      K = env6;
      break;
    case 23:
      step = env0;
      r1 = env1;
      t8 = env2;
      r2 = env3;
      break;
    case 24:
      step = env0;
      t12 = env1;
      r1 = env2;
      t8 = env3;
      r2 = env4;
      break;
    case 25:
      step = env0;
      t1 = env1;
      r1 = env2;
      r2 = env3;
      break;
    case 26:
      t2 = env0;
      t1 = env1;
      r1 = env2;
      r2 = env3;
      break;
    case 27:
      t3 = env0;
      t4 = env1;
      P = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 28:
      P = env0;
      r1 = env1;
      r2 = env2;
      t3 = env3;
      t4 = env4;
      t5 = env5;
      break;
    case 29:
      t6 = env0;
      P = env1;
      r1 = env2;
      r2 = env3;
      t3 = env4;
      t4 = env5;
      t5 = env6;
      break;
    case 30:
      t7 = env0;
      t3 = env1;
      P = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 31:
      t3 = env0;
      P = env1;
      r1 = env2;
      t8 = env3;
      r2 = env4;
      t7 = env5;
      break;
    case 32:
      t3 = env0;
      P = env1;
      r1 = env2;
      t8 = env3;
      r2 = env4;
      t7 = env5;
      t9 = env6;
      break;
    case 33:
      t10 = env0;
      P = env1;
      t3 = env2;
      r1 = env3;
      r2 = env4;
      break;
    case 34:
      t11 = env0;
      P = env1;
      t3 = env2;
      r1 = env3;
      r2 = env4;
      t10 = env5;
      break;
    case 35:
      t11 = env0;
      t12 = env1;
      P = env2;
      t3 = env3;
      r2 = env4;
      t10 = env5;
      break;
    case 36:
      t11 = env0;
      t12 = env1;
      P = env2;
      t3 = env3;
      r2 = env4;
      t13 = env5;
      t10 = env6;
      break;
    case 37:
      P = env0;
      t3 = env1;
      t14 = env2;
      r2 = env3;
      break;
    case 38:
      t15 = env0;
      P = env1;
      t3 = env2;
      t14 = env3;
      r2 = env4;
      break;
    case 39:
      P = env0;
      r2 = env1;
      t16 = env2;
      t3 = env3;
      t14 = env4;
      t15 = env5;
      break;
    case 40:
      t3 = env0;
      t17 = env1;
      P = env2;
      r2 = env3;
      break;
    case 41:
      t3 = env0;
      t17 = env1;
      t18 = env2;
      P = env3;
      r2 = env4;
      break;
    case 42:
      P = env0;
      t3 = env1;
      t17 = env2;
      t18 = env3;
      r2 = env4;
      t19 = env5;
      break;
    case 43:
      t20 = env0;
      P = env1;
      t3 = env2;
      r2 = env3;
      break;
    case 44:
      t20 = env0;
      t21 = env1;
      P = env2;
      t3 = env3;
      r2 = env4;
      break;
    case 45:
      t20 = env0;
      t21 = env1;
      t22 = env2;
      t3 = env3;
      break;
    case 46:
      t23 = env0;
      t20 = env1;
      t21 = env2;
      t22 = env3;
      t3 = env4;
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
      var t2 = this.bodyB.get$invMass();
    case 2:
      state = 0;
      t2 = $.add(t1, t2);
      t1 = this.bodyA.get$invInertia();
    case 3:
      state = 0;
      var t3 = r1.y;
    case 4:
      state = 0;
      t3 = $.mul(t1, t3);
      t1 = r1.y;
    case 5:
      state = 0;
      t2 = $.add(t2, $.mul(t3, t1));
      var t4 = this.bodyB.get$invInertia();
    case 6:
      state = 0;
      var t5 = r2.y;
    case 7:
      state = 0;
      t5 = $.mul(t4, t5);
      t4 = r2.y;
    case 8:
      state = 0;
      t2 = $.add(t2, $.mul(t5, t4));
      K.col1.set$x(t2);
      t2 = this.bodyA.get$invInertia();
    case 9:
      state = 0;
      t2 = $.neg(t2);
      var t6 = r1.x;
    case 10:
      state = 0;
      t6 = $.mul(t2, t6);
      t2 = r1.y;
    case 11:
      state = 0;
      t2 = $.mul(t6, t2);
      t6 = this.bodyB.get$invInertia();
    case 12:
      state = 0;
      var t7 = r2.x;
    case 13:
      state = 0;
      t7 = $.mul(t6, t7);
      t6 = r2.y;
    case 14:
      state = 0;
      t2 = $.sub(t2, $.mul(t7, t6));
      K.col1.set$y(t2);
      t2 = K.col1.get$y();
      K.col2.set$x(t2);
      t2 = this.bodyA.get$invMass();
    case 15:
      state = 0;
      var t8 = this.bodyB.get$invMass();
    case 16:
      state = 0;
      t8 = $.add(t2, t8);
      t2 = this.bodyA.get$invInertia();
    case 17:
      state = 0;
      var t9 = r1.x;
    case 18:
      state = 0;
      t9 = $.mul(t2, t9);
      t2 = r1.x;
    case 19:
      state = 0;
      t8 = $.add(t8, $.mul(t9, t2));
      var t10 = this.bodyB.get$invInertia();
    case 20:
      state = 0;
      var t11 = r2.x;
    case 21:
      state = 0;
      t11 = $.mul(t10, t11);
      t10 = r2.x;
    case 22:
      state = 0;
      t8 = $.add(t8, $.mul(t11, t10));
      K.col2.set$y(t8);
      var linearMass = $.Matrix22$(null, null);
      linearMass.setFrom$1(K);
      linearMass.invertLocal$0();
      t8 = this.bodyA.get$invInertia();
    case 23:
      state = 0;
      var t12 = this.bodyB.get$invInertia();
    case 24:
      state = 0;
      var angularMass = $.add(t8, t12);
      if ($.gtB(angularMass, 0.0)) if (typeof angularMass !== 'number') throw $.iae(angularMass);
    case 25:
    case 26:
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
    case 43:
    case 44:
    case 45:
    case 46:
      if (state == 25 || state == 26 || state == 27 || state == 28 || state == 29 || state == 30 || state == 31 || state == 32 || state == 33 || state == 34 || state == 35 || state == 36 || state == 37 || state == 38 || state == 39 || state == 40 || state == 41 || state == 42 || state == 43 || state == 44 || state == 45 || state == 46 || (state == 0 && step.get$warmStarting() === true)) {
        switch (state) {
          case 0:
            this._linearImpulse.mulLocal$1(step.get$dtRatio());
            t1 = this._angularImpulse;
          case 25:
            state = 0;
            t2 = step.get$dtRatio();
          case 26:
            state = 0;
            this._angularImpulse = $.mul(t1, t2);
            var P = $.Vector$(0, 0);
            P.setFrom$1(this._linearImpulse);
            t3 = this.bodyA.get$linearVelocity();
            t4 = t3.get$x();
          case 27:
            state = 0;
            t5 = this.bodyA.get$invMass();
          case 28:
            state = 0;
            t6 = P.x;
          case 29:
            state = 0;
            t3.set$x($.sub(t4, $.mul(t5, t6)));
            t3 = this.bodyA.get$linearVelocity();
            t7 = t3.get$y();
          case 30:
            state = 0;
            t8 = this.bodyA.get$invMass();
          case 31:
            state = 0;
            t9 = P.y;
          case 32:
            state = 0;
            t3.set$y($.sub(t7, $.mul(t8, t9)));
            t3 = this.bodyA;
            t10 = t3.get$angularVelocity();
          case 33:
            state = 0;
            t11 = this.bodyA.get$invInertia();
          case 34:
            state = 0;
            t12 = $.Vector_crossVectors(r1, P);
          case 35:
            state = 0;
            var t13 = this._angularImpulse;
          case 36:
            state = 0;
            t3.set$angularVelocity($.sub(t10, $.mul(t11, $.add(t12, t13))));
            t3 = this.bodyB.get$linearVelocity();
            var t14 = t3.get$x();
          case 37:
            state = 0;
            var t15 = this.bodyB.get$invMass();
          case 38:
            state = 0;
            var t16 = P.x;
          case 39:
            state = 0;
            t3.set$x($.add(t14, $.mul(t15, t16)));
            t3 = this.bodyB.get$linearVelocity();
            var t17 = t3.get$y();
          case 40:
            state = 0;
            var t18 = this.bodyB.get$invMass();
          case 41:
            state = 0;
            var t19 = P.y;
          case 42:
            state = 0;
            t3.set$y($.add(t17, $.mul(t18, t19)));
            t3 = this.bodyB;
            var t20 = t3.get$angularVelocity();
          case 43:
            state = 0;
            var t21 = this.bodyB.get$invInertia();
          case 44:
            state = 0;
            var t22 = $.Vector_crossVectors(r2, P);
          case 45:
            state = 0;
            var t23 = this._angularImpulse;
          case 46:
            state = 0;
            t3.set$angularVelocity($.add(t20, $.mul(t21, $.add(t22, t23))));
        }
      } else {
        this._linearImpulse.setZero$0();
        this._angularImpulse = 0.0;
      }
  }
 },
 get$maxTorque: function() {
  return this._maxTorque;
 },
 get$maxForce: function() {
  return this._maxForce;
 }
};

$$.RevoluteJoint = {"":
 ["limitState", "upperAngle?", "lowerAngle?", "referenceAngle?", "_enableLimit", "_motorSpeed", "_maxMotorTorque", "_enableMotor", "motorMass", "mass?", "_motorImpulse", "impulse", "localAnchor2", "localAnchor1", "invIB", "invMassB", "invIA", "invMassA", "localCenterB", "localCenterA", "userData", "collideConnected", "islandFlag", "bodyB", "bodyA", "edgeB", "edgeA", "_lib0_next", "_prev", "type"],
 super: "Joint",
 get$maxMotorTorque: function() {
  return this._maxMotorTorque;
 },
 get$motorSpeed: function() {
  return this._motorSpeed;
 },
 getAnchorB$1: function(argOut) {
  this.bodyB.getWorldPointToOut$2(this.localAnchor2, argOut);
 },
 getAnchorA$1: function(argOut) {
  this.bodyA.getWorldPointToOut$2(this.localAnchor1, argOut);
 },
 solvePositionConstraints$1: function(baumgarte) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  if (this._enableLimit === true) {
    var t1 = this.limitState;
    if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(1, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t2 = !(t1 === 0);
    t1 = t2;
  } else t1 = false;
  if (t1) {
    t1 = b2.get$sweep().get$angle();
    if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(2, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t2 = b1.get$sweep().get$angle();
    if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(3, t1, t2, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t2 = t1 - t2;
    t1 = this.referenceAngle;
    if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(4, b2, t1, t2, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var angle = t2 - t1;
    t1 = this.limitState;
    if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(5, angle, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t1 === 3) {
      t1 = this.lowerAngle;
      if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(6, angle, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      var C = $.MathBox_clamp(angle - t1, -0.13962634015954636, 0.13962634015954636);
      if (typeof C !== 'number') return this.solvePositionConstraints$1$bailout(7, C, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      t2 = this.motorMass;
      if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(8, C, t2, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      var limitImpulse = -t2 * C;
      var angularError = $.abs(C);
      if (typeof angularError !== 'number') return this.solvePositionConstraints$1$bailout(9, angularError, b2, limitImpulse, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    } else {
      t1 = this.limitState;
      if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(10, b2, angle, t1, b1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      if (t1 === 1) {
        t1 = this.lowerAngle;
        if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(11, b2, angle, b1, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        C = angle - t1;
        angularError = -C;
        var C0 = $.MathBox_clamp(C + 0.03490658503988659, -0.13962634015954636, 0.0);
        if (typeof C0 !== 'number') return this.solvePositionConstraints$1$bailout(12, C0, angularError, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t1 = this.motorMass;
        if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(13, t1, C0, angularError, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        limitImpulse = -t1 * C0;
      } else {
        t1 = this.limitState;
        if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(14, angle, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (t1 === 2) {
          t1 = this.upperAngle;
          if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(15, angle, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          C = angle - t1;
          C0 = $.MathBox_clamp(C - 0.03490658503988659, 0.0, 0.13962634015954636);
          if (typeof C0 !== 'number') return this.solvePositionConstraints$1$bailout(16, C0, C, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t1 = this.motorMass;
          if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(17, C0, t1, C, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          limitImpulse = -t1 * C0;
          angularError = C;
        } else {
          limitImpulse = 0.0;
          angularError = 0.0;
        }
      }
    }
    t1 = b1.get$sweep();
    t2 = t1.get$angle();
    if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(18, t1, t2, angularError, b2, limitImpulse, b1, 0, 0, 0, 0, 0, 0, 0, 0);
    var t3 = b1.get$invInertia();
    if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(19, t1, t2, t3, limitImpulse, b2, b1, angularError, 0, 0, 0, 0, 0, 0, 0);
    t1.set$angle(t2 - t3 * limitImpulse);
    t1 = b2.get$sweep();
    var t4 = t1.get$angle();
    if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(20, b2, angularError, t1, t4, b1, limitImpulse, 0, 0, 0, 0, 0, 0, 0, 0);
    var t5 = b2.get$invInertia();
    if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(21, angularError, b1, t1, t4, t5, limitImpulse, b2, 0, 0, 0, 0, 0, 0, 0);
    t1.set$angle(t4 + t5 * limitImpulse);
    b1.synchronizeTransform$0();
    b2.synchronizeTransform$0();
  } else angularError = 0.0;
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
  if (typeof positionError !== 'number') return this.solvePositionConstraints$1$bailout(22, angularError, positionError, imp, r1, r2, C, b1, b2, 0, 0, 0, 0, 0, 0);
  var invMass1 = b1.get$invMass();
  if (typeof invMass1 !== 'number') return this.solvePositionConstraints$1$bailout(23, angularError, positionError, imp, r1, r2, C, invMass1, b1, b2, 0, 0, 0, 0, 0);
  var invMass2 = b2.get$invMass();
  if (typeof invMass2 !== 'number') return this.solvePositionConstraints$1$bailout(24, angularError, positionError, imp, r1, invMass2, r2, C, invMass1, b1, b2, 0, 0, 0, 0);
  var invI1 = b1.get$invInertia();
  if (typeof invI1 !== 'number') return this.solvePositionConstraints$1$bailout(25, angularError, positionError, imp, r1, invI1, r2, invMass2, C, invMass1, b1, b2, 0, 0, 0);
  var invI2 = b2.get$invInertia();
  if (typeof invI2 !== 'number') return this.solvePositionConstraints$1$bailout(26, angularError, positionError, imp, r1, invI1, r2, invI2, C, invMass1, invMass2, b1, b2, 0, 0);
  t1 = C.get$lengthSquared();
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(27, angularError, positionError, imp, r1, invI1, r2, invI2, C, invMass1, invMass2, t1, b1, b2, 0);
  if (t1 > 0.0025000000000000005) {
    var u = $.Vector$(0, 0);
    var m = invMass1 + invMass2;
    if (m > 0.0) m = 1.0 / m;
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
  K1.col1.set$x(t1);
  K1.col2.set$x(0.0);
  K1.col1.set$y(0.0);
  K1.col2.set$y(t1);
  var K2 = $.Matrix22$(null, null);
  t1 = r1.y;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(28, angularError, K1, positionError, imp, r1, invI1, r2, invI2, C, K2, t1, b1, b2, 0);
  t1 *= invI1;
  t2 = r1.y;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(29, angularError, K1, positionError, imp, r1, invI1, r2, invI2, C, K2, t2, t1, b1, b2);
  t2 *= t1;
  K2.col1.set$x(t2);
  t2 = -invI1;
  t1 = r1.x;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(30, angularError, K1, positionError, imp, r1, invI1, r2, invI2, C, K2, t1, t2, b1, b2);
  t1 *= t2;
  t3 = r1.y;
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(31, b2, angularError, K1, imp, positionError, r1, invI1, r2, invI2, C, K2, t3, b1, t1);
  t3 *= t1;
  K2.col2.set$x(t3);
  t3 = r1.x;
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(32, angularError, K1, t2, positionError, r1, imp, invI1, r2, C, invI2, K2, t3, b1, b2);
  t3 *= t2;
  t2 = r1.y;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(33, angularError, K1, positionError, imp, r1, invI1, r2, invI2, C, t3, K2, t2, b1, b2);
  t2 *= t3;
  K2.col1.set$y(t2);
  t2 = r1.x;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(34, angularError, K1, positionError, imp, r1, invI1, r2, invI2, C, K2, t2, b1, b2, 0);
  t2 *= invI1;
  t3 = r1.x;
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(35, angularError, K1, positionError, imp, r1, r2, invI2, C, t2, K2, t3, b1, b2, 0);
  t3 *= t2;
  K2.col2.set$y(t3);
  var K3 = $.Matrix22$(null, null);
  t3 = r2.y;
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(36, b2, angularError, K1, imp, positionError, r1, r2, invI2, C, K2, K3, t3, b1, 0);
  t3 *= invI2;
  t2 = r2.y;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(37, b2, angularError, K1, imp, positionError, r1, r2, invI2, C, K2, K3, t3, b1, t2);
  t2 *= t3;
  K3.col1.set$x(t2);
  t2 = -invI2;
  t3 = r2.x;
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(38, t3, t2, angularError, K1, positionError, imp, r1, r2, invI2, C, K2, K3, b1, b2);
  t3 *= t2;
  t1 = r2.y;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(39, t1, angularError, K1, positionError, imp, r1, r2, invI2, C, t3, K2, K3, b1, b2);
  t1 *= t3;
  K3.col2.set$x(t1);
  t1 = r2.x;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(40, angularError, K1, positionError, imp, r1, r2, invI2, C, t2, t1, K2, K3, b1, b2);
  t1 *= t2;
  t2 = r2.y;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(41, angularError, t2, positionError, K1, r1, imp, r2, invI2, C, t1, K2, K3, b1, b2);
  t2 *= t1;
  K3.col1.set$y(t2);
  t2 = r2.x;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(42, angularError, K1, positionError, imp, r1, r2, invI2, C, t2, K2, K3, b1, b2, 0);
  t2 *= invI2;
  t1 = r2.x;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(43, angularError, K1, positionError, imp, r1, t1, r2, C, K2, t2, K3, b1, b2, 0);
  t1 *= t2;
  K3.col2.set$y(t1);
  K1.addLocal$1(K2).addLocal$1(K3);
  K1.solveToOut$2(C.negateLocal$0(), imp);
  C.setFrom$1(imp).mulLocal$1(b1.get$invMass());
  b1.get$sweep().get$center().subLocal$1(C);
  t1 = b1.get$sweep();
  t2 = t1.get$angle();
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(44, angularError, positionError, t1, t2, imp, r2, r1, C, b1, b2, 0, 0, 0, 0);
  t3 = b1.get$invInertia();
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(45, angularError, positionError, t1, t2, t3, r2, r1, imp, C, b1, b2, 0, 0, 0);
  t4 = $.Vector_crossVectors(r1, imp);
  if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(46, angularError, positionError, t1, t2, t3, r2, t4, imp, C, b1, b2, 0, 0, 0);
  t1.set$angle(t2 - t3 * t4);
  C.setFrom$1(imp).mulLocal$1(b2.get$invMass());
  b2.get$sweep().get$center().addLocal$1(C);
  t1 = b2.get$sweep();
  t5 = t1.get$angle();
  if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(47, angularError, imp, positionError, t5, t1, r2, b1, b2, 0, 0, 0, 0, 0, 0);
  var t6 = b2.get$invInertia();
  if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(48, angularError, positionError, t1, t5, t6, r2, imp, b1, b2, 0, 0, 0, 0, 0);
  var t7 = $.Vector_crossVectors(r2, imp);
  if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(49, angularError, positionError, t1, t5, t6, t7, b1, b2, 0, 0, 0, 0, 0, 0);
  t1.set$angle(t5 + t6 * t7);
  b1.synchronizeTransform$0();
  b2.synchronizeTransform$0();
  return positionError <= 0.005 && angularError <= 0.03490658503988659;
 },
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      t1 = env0;
      b1 = env1;
      b2 = env2;
      break;
    case 2:
      t1 = env0;
      b1 = env1;
      b2 = env2;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 4:
      b2 = env0;
      t1 = env1;
      t2 = env2;
      b1 = env3;
      break;
    case 5:
      angle = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 6:
      angle = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 7:
      C = env0;
      b1 = env1;
      b2 = env2;
      break;
    case 8:
      C = env0;
      t2 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 9:
      angularError = env0;
      b2 = env1;
      limitImpulse = env2;
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
      angle = env1;
      b1 = env2;
      t1 = env3;
      break;
    case 12:
      C0 = env0;
      angularError = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 13:
      t1 = env0;
      C0 = env1;
      angularError = env2;
      b1 = env3;
      b2 = env4;
      break;
    case 14:
      angle = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 15:
      angle = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 16:
      C0 = env0;
      C = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 17:
      C0 = env0;
      t1 = env1;
      C = env2;
      b1 = env3;
      b2 = env4;
      break;
    case 18:
      t1 = env0;
      t2 = env1;
      angularError = env2;
      b2 = env3;
      limitImpulse = env4;
      b1 = env5;
      break;
    case 19:
      t1 = env0;
      t2 = env1;
      t3 = env2;
      limitImpulse = env3;
      b2 = env4;
      b1 = env5;
      angularError = env6;
      break;
    case 20:
      b2 = env0;
      angularError = env1;
      t1 = env2;
      t4 = env3;
      b1 = env4;
      limitImpulse = env5;
      break;
    case 21:
      angularError = env0;
      b1 = env1;
      t1 = env2;
      t4 = env3;
      t5 = env4;
      limitImpulse = env5;
      b2 = env6;
      break;
    case 22:
      angularError = env0;
      positionError = env1;
      imp = env2;
      r1 = env3;
      r2 = env4;
      C = env5;
      b1 = env6;
      b2 = env7;
      break;
    case 23:
      angularError = env0;
      positionError = env1;
      imp = env2;
      r1 = env3;
      r2 = env4;
      C = env5;
      invMass1 = env6;
      b1 = env7;
      b2 = env8;
      break;
    case 24:
      angularError = env0;
      positionError = env1;
      imp = env2;
      r1 = env3;
      invMass2 = env4;
      r2 = env5;
      C = env6;
      invMass1 = env7;
      b1 = env8;
      b2 = env9;
      break;
    case 25:
      angularError = env0;
      positionError = env1;
      imp = env2;
      r1 = env3;
      invI1 = env4;
      r2 = env5;
      invMass2 = env6;
      C = env7;
      invMass1 = env8;
      b1 = env9;
      b2 = env10;
      break;
    case 26:
      angularError = env0;
      positionError = env1;
      imp = env2;
      r1 = env3;
      invI1 = env4;
      r2 = env5;
      invI2 = env6;
      C = env7;
      invMass1 = env8;
      invMass2 = env9;
      b1 = env10;
      b2 = env11;
      break;
    case 27:
      angularError = env0;
      positionError = env1;
      imp = env2;
      r1 = env3;
      invI1 = env4;
      r2 = env5;
      invI2 = env6;
      C = env7;
      invMass1 = env8;
      invMass2 = env9;
      t1 = env10;
      b1 = env11;
      b2 = env12;
      break;
    case 28:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      invI1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      K2 = env9;
      t1 = env10;
      b1 = env11;
      b2 = env12;
      break;
    case 29:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      invI1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      K2 = env9;
      t2 = env10;
      t1 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 30:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      invI1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      K2 = env9;
      t1 = env10;
      t2 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 31:
      b2 = env0;
      angularError = env1;
      K1 = env2;
      imp = env3;
      positionError = env4;
      r1 = env5;
      invI1 = env6;
      r2 = env7;
      invI2 = env8;
      C = env9;
      K2 = env10;
      t2 = env11;
      b1 = env12;
      t1 = env13;
      break;
    case 32:
      angularError = env0;
      K1 = env1;
      t2 = env2;
      positionError = env3;
      r1 = env4;
      imp = env5;
      invI1 = env6;
      r2 = env7;
      C = env8;
      invI2 = env9;
      K2 = env10;
      t1 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 33:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      invI1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      t1 = env9;
      K2 = env10;
      t2 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 34:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      invI1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      K2 = env9;
      t2 = env10;
      b1 = env11;
      b2 = env12;
      break;
    case 35:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      r2 = env5;
      invI2 = env6;
      C = env7;
      t2 = env8;
      K2 = env9;
      t1 = env10;
      b1 = env11;
      b2 = env12;
      break;
    case 36:
      b2 = env0;
      angularError = env1;
      K1 = env2;
      imp = env3;
      positionError = env4;
      r1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      K2 = env9;
      K3 = env10;
      t1 = env11;
      b1 = env12;
      break;
    case 37:
      b2 = env0;
      angularError = env1;
      K1 = env2;
      imp = env3;
      positionError = env4;
      r1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      K2 = env9;
      K3 = env10;
      t1 = env11;
      b1 = env12;
      t2 = env13;
      break;
    case 38:
      t1 = env0;
      t2 = env1;
      angularError = env2;
      K1 = env3;
      positionError = env4;
      imp = env5;
      r1 = env6;
      r2 = env7;
      invI2 = env8;
      C = env9;
      K2 = env10;
      K3 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 39:
      t2 = env0;
      angularError = env1;
      K1 = env2;
      positionError = env3;
      imp = env4;
      r1 = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      t1 = env9;
      K2 = env10;
      K3 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 40:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      r2 = env5;
      invI2 = env6;
      C = env7;
      t2 = env8;
      t1 = env9;
      K2 = env10;
      K3 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 41:
      angularError = env0;
      t2 = env1;
      positionError = env2;
      K1 = env3;
      r1 = env4;
      imp = env5;
      r2 = env6;
      invI2 = env7;
      C = env8;
      t1 = env9;
      K2 = env10;
      K3 = env11;
      b1 = env12;
      b2 = env13;
      break;
    case 42:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      r2 = env5;
      invI2 = env6;
      C = env7;
      t2 = env8;
      K2 = env9;
      K3 = env10;
      b1 = env11;
      b2 = env12;
      break;
    case 43:
      angularError = env0;
      K1 = env1;
      positionError = env2;
      imp = env3;
      r1 = env4;
      t1 = env5;
      r2 = env6;
      C = env7;
      K2 = env8;
      t2 = env9;
      K3 = env10;
      b1 = env11;
      b2 = env12;
      break;
    case 44:
      angularError = env0;
      positionError = env1;
      t1 = env2;
      t2 = env3;
      imp = env4;
      r2 = env5;
      r1 = env6;
      C = env7;
      b1 = env8;
      b2 = env9;
      break;
    case 45:
      angularError = env0;
      positionError = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      r2 = env5;
      r1 = env6;
      imp = env7;
      C = env8;
      b1 = env9;
      b2 = env10;
      break;
    case 46:
      angularError = env0;
      positionError = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      r2 = env5;
      t4 = env6;
      imp = env7;
      C = env8;
      b1 = env9;
      b2 = env10;
      break;
    case 47:
      angularError = env0;
      imp = env1;
      positionError = env2;
      t5 = env3;
      t1 = env4;
      r2 = env5;
      b1 = env6;
      b2 = env7;
      break;
    case 48:
      angularError = env0;
      positionError = env1;
      t1 = env2;
      t5 = env3;
      t6 = env4;
      r2 = env5;
      imp = env6;
      b1 = env7;
      b2 = env8;
      break;
    case 49:
      angularError = env0;
      positionError = env1;
      t1 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      b1 = env6;
      b2 = env7;
      break;
  }
  switch (state) {
    case 0:
      var b1 = this.bodyA;
      var b2 = this.bodyB;
    case 1:
      if (state == 1 || (state == 0 && this._enableLimit === true)) {
        switch (state) {
          case 0:
            var t1 = this.limitState;
          case 1:
            state = 0;
            var t2 = !$.eqB(t1, 0);
            t1 = t2;
        }
      } else {
        t1 = false;
      }
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
      if (state == 2 || state == 3 || state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || state == 10 || state == 11 || state == 12 || state == 13 || state == 14 || state == 15 || state == 16 || state == 17 || state == 18 || state == 19 || state == 20 || state == 21 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = b2.get$sweep().get$angle();
          case 2:
            state = 0;
            t2 = b1.get$sweep().get$angle();
          case 3:
            state = 0;
            t2 = $.sub(t1, t2);
            t1 = this.referenceAngle;
          case 4:
            state = 0;
            var angle = $.sub(t2, t1);
            t1 = this.limitState;
          case 5:
            state = 0;
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
            if (state == 6 || state == 7 || state == 8 || state == 9 || (state == 0 && $.eqB(t1, 3))) {
              switch (state) {
                case 0:
                  t1 = this.lowerAngle;
                case 6:
                  state = 0;
                  var C = $.MathBox_clamp($.sub(angle, t1), -0.13962634015954636, 0.13962634015954636);
                case 7:
                  state = 0;
                  t2 = this.motorMass;
                case 8:
                  state = 0;
                  var limitImpulse = $.mul($.neg(t2), C);
                  var angularError = $.abs(C);
                case 9:
                  state = 0;
              }
            } else {
              switch (state) {
                case 0:
                  t1 = this.limitState;
                case 10:
                  state = 0;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                  if (state == 11 || state == 12 || state == 13 || (state == 0 && $.eqB(t1, 1))) {
                    switch (state) {
                      case 0:
                        t1 = this.lowerAngle;
                      case 11:
                        state = 0;
                        C = $.sub(angle, t1);
                        angularError = $.neg(C);
                        var C0 = $.MathBox_clamp($.add(C, 0.03490658503988659), -0.13962634015954636, 0.0);
                      case 12:
                        state = 0;
                        t1 = this.motorMass;
                      case 13:
                        state = 0;
                        limitImpulse = $.mul($.neg(t1), C0);
                    }
                  } else {
                    switch (state) {
                      case 0:
                        t1 = this.limitState;
                      case 14:
                        state = 0;
                      case 15:
                      case 16:
                      case 17:
                        if (state == 15 || state == 16 || state == 17 || (state == 0 && $.eqB(t1, 2))) {
                          switch (state) {
                            case 0:
                              t1 = this.upperAngle;
                            case 15:
                              state = 0;
                              C = $.sub(angle, t1);
                              C0 = $.MathBox_clamp($.sub(C, 0.03490658503988659), 0.0, 0.13962634015954636);
                            case 16:
                              state = 0;
                              t1 = this.motorMass;
                            case 17:
                              state = 0;
                              limitImpulse = $.mul($.neg(t1), C0);
                              angularError = C;
                          }
                        } else {
                          limitImpulse = 0.0;
                          angularError = 0.0;
                        }
                    }
                  }
              }
            }
            t1 = b1.get$sweep();
            t2 = t1.get$angle();
          case 18:
            state = 0;
            var t3 = b1.get$invInertia();
          case 19:
            state = 0;
            t1.set$angle($.sub(t2, $.mul(t3, limitImpulse)));
            t1 = b2.get$sweep();
            var t4 = t1.get$angle();
          case 20:
            state = 0;
            var t5 = b2.get$invInertia();
          case 21:
            state = 0;
            t1.set$angle($.add(t4, $.mul(t5, limitImpulse)));
            b1.synchronizeTransform$0();
            b2.synchronizeTransform$0();
        }
      } else {
        angularError = 0.0;
      }
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
    case 22:
      state = 0;
      var invMass1 = b1.get$invMass();
    case 23:
      state = 0;
      var invMass2 = b2.get$invMass();
    case 24:
      state = 0;
      var invI1 = b1.get$invInertia();
    case 25:
      state = 0;
      var invI2 = b2.get$invInertia();
    case 26:
      state = 0;
      t1 = C.get$lengthSquared();
    case 27:
      state = 0;
      if ($.gtB(t1, 0.0025000000000000005)) {
        var u = $.Vector$(0, 0);
        var m = $.add(invMass1, invMass2);
        if ($.gtB(m, 0.0)) {
          if (typeof m !== 'number') throw $.iae(m);
          m = 1.0 / m;
        }
        imp.setFrom$1(C).negateLocal$0().mulLocal$1(m);
        t1 = u.setFrom$1(imp);
        if (typeof invMass1 !== 'number') throw $.iae(invMass1);
        t1.mulLocal$1(0.5 * invMass1);
        b1.get$sweep().get$center().subLocal$1(u);
        t1 = u.setFrom$1(imp);
        if (typeof invMass2 !== 'number') throw $.iae(invMass2);
        t1.mulLocal$1(0.5 * invMass2);
        b2.get$sweep().get$center().addLocal$1(u);
        C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
        C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
      }
      var K1 = $.Matrix22$(null, null);
      t1 = $.add(invMass1, invMass2);
      K1.col1.set$x(t1);
      K1.col2.set$x(0.0);
      K1.col1.set$y(0.0);
      t1 = $.add(invMass1, invMass2);
      K1.col2.set$y(t1);
      var K2 = $.Matrix22$(null, null);
      t1 = r1.y;
    case 28:
      state = 0;
      t1 = $.mul(invI1, t1);
      t2 = r1.y;
    case 29:
      state = 0;
      t2 = $.mul(t1, t2);
      K2.col1.set$x(t2);
      t2 = $.neg(invI1);
      t1 = r1.x;
    case 30:
      state = 0;
      t1 = $.mul(t2, t1);
      t2 = r1.y;
    case 31:
      state = 0;
      t2 = $.mul(t1, t2);
      K2.col2.set$x(t2);
      t2 = $.neg(invI1);
      t1 = r1.x;
    case 32:
      state = 0;
      t1 = $.mul(t2, t1);
      t2 = r1.y;
    case 33:
      state = 0;
      t2 = $.mul(t1, t2);
      K2.col1.set$y(t2);
      t2 = r1.x;
    case 34:
      state = 0;
      t2 = $.mul(invI1, t2);
      t1 = r1.x;
    case 35:
      state = 0;
      t1 = $.mul(t2, t1);
      K2.col2.set$y(t1);
      var K3 = $.Matrix22$(null, null);
      t1 = r2.y;
    case 36:
      state = 0;
      t1 = $.mul(invI2, t1);
      t2 = r2.y;
    case 37:
      state = 0;
      t2 = $.mul(t1, t2);
      K3.col1.set$x(t2);
      t2 = $.neg(invI2);
      t1 = r2.x;
    case 38:
      state = 0;
      t1 = $.mul(t2, t1);
      t2 = r2.y;
    case 39:
      state = 0;
      t2 = $.mul(t1, t2);
      K3.col2.set$x(t2);
      t2 = $.neg(invI2);
      t1 = r2.x;
    case 40:
      state = 0;
      t1 = $.mul(t2, t1);
      t2 = r2.y;
    case 41:
      state = 0;
      t2 = $.mul(t1, t2);
      K3.col1.set$y(t2);
      t2 = r2.x;
    case 42:
      state = 0;
      t2 = $.mul(invI2, t2);
      t1 = r2.x;
    case 43:
      state = 0;
      t1 = $.mul(t2, t1);
      K3.col2.set$y(t1);
      K1.addLocal$1(K2).addLocal$1(K3);
      K1.solveToOut$2(C.negateLocal$0(), imp);
      C.setFrom$1(imp).mulLocal$1(b1.get$invMass());
      b1.get$sweep().get$center().subLocal$1(C);
      t1 = b1.get$sweep();
      t2 = t1.get$angle();
    case 44:
      state = 0;
      t3 = b1.get$invInertia();
    case 45:
      state = 0;
      t4 = $.Vector_crossVectors(r1, imp);
    case 46:
      state = 0;
      t1.set$angle($.sub(t2, $.mul(t3, t4)));
      C.setFrom$1(imp).mulLocal$1(b2.get$invMass());
      b2.get$sweep().get$center().addLocal$1(C);
      t1 = b2.get$sweep();
      t5 = t1.get$angle();
    case 47:
      state = 0;
      var t6 = b2.get$invInertia();
    case 48:
      state = 0;
      var t7 = $.Vector_crossVectors(r2, imp);
    case 49:
      state = 0;
      t1.set$angle($.add(t5, $.mul(t6, t7)));
      b1.synchronizeTransform$0();
      b2.synchronizeTransform$0();
      return $.leB(positionError, 0.005) && $.leB(angularError, 0.03490658503988659);
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
    this._motorImpulse = $.MathBox_clamp($.add(this._motorImpulse, imp), $.neg(maxImpulse), maxImpulse);
    var imp0 = $.sub(this._motorImpulse, oldImpulse);
    w1 = $.sub(w1, $.mul(i1, imp0));
    w2 = $.add(w2, $.mul(i2, imp0));
  }
  var temp = $.Vector$(0, 0);
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  var t1 = this._enableLimit === true && !$.eqB(this.limitState, 0);
  if (t1) {
    r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
    r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
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
    this.mass.solve33ToOut$2(Cdot.negateLocal$0(), imp);
    if ($.eqB(this.limitState, 3)) this.impulse.addLocal$1(imp);
    else {
      if ($.eqB(this.limitState, 1)) {
        if ($.ltB($.add(this.impulse.get$z(), imp.z), 0.0)) {
          this.mass.solve22ToOut$2(Cdot1.negateLocal$0(), temp);
          imp.x = temp.x;
          imp.y = temp.y;
          imp.z = $.neg(this.impulse.get$z());
          t1 = this.impulse;
          t1.set$x($.add(t1.get$x(), temp.x));
          t1 = this.impulse;
          t1.set$y($.add(t1.get$y(), temp.y));
          this.impulse.set$z(0.0);
        }
      } else {
        if ($.eqB(this.limitState, 2)) {
          if ($.gtB($.add(this.impulse.get$z(), imp.z), 0.0)) {
            this.mass.solve22ToOut$2(Cdot1.negateLocal$0(), temp);
            imp.x = temp.x;
            imp.y = temp.y;
            imp.z = $.neg(this.impulse.get$z());
            t1 = this.impulse;
            t1.set$x($.add(t1.get$x(), temp.x));
            t1 = this.impulse;
            t1.set$y($.add(t1.get$y(), temp.y));
            this.impulse.set$z(0.0);
          }
        }
      }
    }
    var P = $.Vector$(0, 0);
    P.setCoords$2(imp.x, imp.y);
    temp.setFrom$1(P).mulLocal$1(m1);
    v1.subLocal$1(temp);
    w1 = $.sub(w1, $.mul(i1, $.add($.Vector_crossVectors(r1, P), imp.z)));
    temp.setFrom$1(P).mulLocal$1(m2);
    v2.addLocal$1(temp);
    w2 = $.add(w2, $.mul(i2, $.add($.Vector_crossVectors(r2, P), imp.z)));
  } else {
    r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
    r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
    $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
    $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
    Cdot = $.Vector$(0, 0);
    imp = $.Vector$(0, 0);
    $.Vector_crossNumAndVectorToOut(w1, r1, temp);
    $.Vector_crossNumAndVectorToOut(w2, r2, Cdot);
    Cdot.addLocal$1(v2).subLocal$1(v1).subLocal$1(temp);
    this.mass.solve22ToOut$2(Cdot.negateLocal$0(), imp);
    t1 = this.impulse;
    t1.set$x($.add(t1.get$x(), imp.x));
    t1 = this.impulse;
    t1.set$y($.add(t1.get$y(), imp.y));
    temp.setFrom$1(imp).mulLocal$1(m1);
    v1.subLocal$1(temp);
    w1 = $.sub(w1, $.mul(i1, $.Vector_crossVectors(r1, imp)));
    temp.setFrom$1(imp).mulLocal$1(m2);
    v2.addLocal$1(temp);
    w2 = $.add(w2, $.mul(i2, $.Vector_crossVectors(r2, imp)));
  }
  b1.set$angularVelocity(w1);
  b2.set$angularVelocity(w2);
 },
 initVelocityConstraints$1: function(step) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  this._enableMotor === true || this._enableLimit === true;
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  var m1 = b1.get$invMass();
  if (typeof m1 !== 'number') return this.initVelocityConstraints$1$bailout(1, step, b1, b2, r1, r2, m1, 0, 0, 0, 0, 0, 0);
  var m2 = b2.get$invMass();
  if (typeof m2 !== 'number') return this.initVelocityConstraints$1$bailout(2, step, b1, b2, r1, r2, m1, m2, 0, 0, 0, 0, 0);
  var i1 = b1.get$invInertia();
  if (typeof i1 !== 'number') return this.initVelocityConstraints$1$bailout(3, step, b1, b2, r1, r2, m1, m2, i1, 0, 0, 0, 0);
  var i2 = b2.get$invInertia();
  if (typeof i2 !== 'number') return this.initVelocityConstraints$1$bailout(4, step, b1, b2, r1, r2, m1, m2, i1, i2, 0, 0, 0);
  var t1 = m1 + m2;
  var t2 = r1.y;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(5, step, t1, b1, b2, r1, t2, r2, m1, m2, i1, i2, 0);
  var t3 = r1.y;
  if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(6, step, m1, m2, i1, i2, t1, b1, b2, r1, t2, r2, t3);
  var t4 = t1 + t2 * t3 * i1;
  var t5 = r2.y;
  if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(7, step, t5, b1, b2, r1, t4, r2, m1, m2, i1, i2, 0);
  var t6 = r2.y;
  if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(8, step, m1, m2, i1, i2, b1, b2, r1, t4, r2, t5, t6);
  t4 += t5 * t6 * i2;
  this.mass.get$col1().set$x(t4);
  t4 = r1.y;
  if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(9, step, t4, b1, b2, r1, r2, m1, m2, i1, i2, 0, 0);
  t4 = -t4;
  var t7 = r1.x;
  if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(10, step, t7, b1, b2, t4, r1, r2, m1, m2, i1, i2, 0);
  var t8 = t4 * t7 * i1;
  var t9 = r2.y;
  if (typeof t9 !== 'number') return this.initVelocityConstraints$1$bailout(11, step, t9, t8, b1, b2, r1, r2, m1, m2, i1, i2, 0);
  var t10 = r2.x;
  if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(12, step, t9, t10, t8, m1, m2, i1, i2, b1, b2, r1, r2);
  t8 -= t9 * t10 * i2;
  this.mass.get$col2().set$x(t8);
  t8 = r1.y;
  if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(13, step, t8, b1, b2, r1, r2, m1, m2, i1, i2, 0, 0);
  var t11 = -t8 * i1;
  var t12 = r2.y;
  if (typeof t12 !== 'number') return this.initVelocityConstraints$1$bailout(14, step, t11, b1, t12, b2, r1, r2, m1, m2, i1, i2, 0);
  t11 -= t12 * i2;
  this.mass.get$col3().set$x(t11);
  t11 = this.mass.get$col2().get$x();
  this.mass.get$col1().set$y(t11);
  t11 = r1.x;
  if (typeof t11 !== 'number') return this.initVelocityConstraints$1$bailout(15, step, i2, b1, b2, t11, r1, r2, m1, m2, i1, t1, 0);
  var t13 = r1.x;
  if (typeof t13 !== 'number') return this.initVelocityConstraints$1$bailout(16, step, t11, t13, m1, m2, i1, i2, t1, b1, b2, r1, r2);
  t1 += t11 * t13 * i1;
  var t14 = r2.x;
  if (typeof t14 !== 'number') return this.initVelocityConstraints$1$bailout(17, step, r2, b1, b2, t1, r1, t14, m1, m2, i1, i2, 0);
  var t15 = r2.x;
  if (typeof t15 !== 'number') return this.initVelocityConstraints$1$bailout(18, step, t14, m1, m2, i1, i2, t15, b1, b2, t1, r1, r2);
  t1 += t14 * t15 * i2;
  this.mass.get$col2().set$y(t1);
  t1 = r1.x;
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(19, step, i2, b1, b2, r1, r2, m1, m2, i1, t1, 0, 0);
  t1 *= i1;
  var t16 = r2.x;
  if (typeof t16 !== 'number') return this.initVelocityConstraints$1$bailout(20, step, t1, b1, i2, b2, r1, r2, m1, m2, i1, t16, 0);
  t1 += t16 * i2;
  this.mass.get$col3().set$y(t1);
  t1 = this.mass.get$col3().get$x();
  this.mass.get$col1().set$z(t1);
  t1 = this.mass.get$col3().get$y();
  this.mass.get$col2().set$z(t1);
  t1 = i1 + i2;
  this.mass.get$col3().set$z(t1);
  this.motorMass = t1;
  t1 = this.motorMass;
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(21, step, b1, b2, t1, r1, r2, m1, m2, i1, i2, 0, 0);
  if (t1 > 0.0) {
    t1 = this.motorMass;
    if (typeof t1 !== 'number') throw $.iae(t1);
    this.motorMass = 1.0 / t1;
  }
  t1 = this._enableMotor;
  if (typeof t1 !== 'boolean') return this.initVelocityConstraints$1$bailout(22, step, b1, b2, r1, t1, r2, m1, m2, i1, i2, 0, 0);
  if (!t1) this._motorImpulse = 0.0;
  if (this._enableLimit === true) {
    t1 = b2.get$sweep().get$angle();
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(23, step, t1, b1, b2, r1, r2, m1, m2, i1, i2, 0, 0);
    t2 = b1.get$sweep().get$angle();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(24, step, t2, t1, b1, b2, r1, r2, m1, m2, i1, i2, 0);
    t2 = t1 - t2;
    t1 = this.referenceAngle;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(25, step, t2, t1, b1, b2, r1, r2, m1, m2, i1, i2, 0);
    var jointAngle = t2 - t1;
    t1 = this.upperAngle;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(26, step, t1, jointAngle, b1, b2, r1, r2, m1, m2, i1, i2, 0);
    t2 = this.lowerAngle;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(27, step, jointAngle, m1, m2, i1, i2, b1, b2, r1, r2, t1, t2);
    t3 = $.abs(t1 - t2);
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(28, step, jointAngle, b1, b2, r1, t3, r2, m1, m2, i1, i2, 0);
    if (t3 < 0.06981317007977318) this.limitState = 3;
    else {
      t1 = this.lowerAngle;
      if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(29, step, t1, jointAngle, b1, b2, r1, r2, m1, m2, i1, i2, 0);
      if (jointAngle <= t1) {
        t1 = this.limitState;
        if (t1 !== (t1 | 0)) return this.initVelocityConstraints$1$bailout(30, step, t1, b1, b2, r1, r2, m1, m2, i1, i2, 0, 0);
        if (!(t1 === 1)) this.impulse.z = 0.0;
        this.limitState = 1;
      } else {
        t1 = this.upperAngle;
        if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(31, step, jointAngle, b1, t1, b2, r1, r2, m1, m2, i1, i2, 0);
        if (jointAngle >= t1) {
          t1 = this.limitState;
          if (t1 !== (t1 | 0)) return this.initVelocityConstraints$1$bailout(32, step, b1, b2, t1, r1, r2, m1, m2, i1, i2, 0, 0);
          if (!(t1 === 2)) this.impulse.z = 0.0;
          this.limitState = 2;
        } else {
          this.limitState = 0;
          this.impulse.z = 0.0;
        }
      }
    }
  } else this.limitState = 0;
  if (step.get$warmStarting() === true) {
    this.impulse.mulLocal$1(step.get$dtRatio());
    t1 = this._motorImpulse;
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(33, step, t1, b1, b2, r1, r2, m1, m2, i1, i2, 0, 0);
    t2 = step.get$dtRatio();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(34, i2, t2, b1, b2, r1, r2, m1, t1, m2, i1, 0, 0);
    this._motorImpulse = t1 * t2;
    var temp = $.Vector$(0, 0);
    var P = $.Vector$(0, 0);
    P.setCoords$2(this.impulse.x, this.impulse.y);
    temp.setFrom$1(P).mulLocal$1(m1);
    b1.get$linearVelocity().subLocal$1(temp);
    t3 = b1.get$angularVelocity();
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(35, t3, b1, b2, temp, P, r1, r2, m2, i1, i2, 0, 0);
    t4 = $.Vector_crossVectors(r1, P);
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(36, t3, t4, b1, b2, temp, P, r2, m2, i1, i2, 0, 0);
    t5 = this._motorImpulse;
    if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(37, t5, t3, t4, b1, b2, temp, P, r2, m2, i1, i2, 0);
    t5 += t4;
    t4 = this.impulse.z;
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(38, t3, b1, b2, temp, t5, P, t4, r2, m2, i1, i2, 0);
    b1.set$angularVelocity(t3 - i1 * (t5 + t4));
    temp.setFrom$1(P).mulLocal$1(m2);
    b2.get$linearVelocity().addLocal$1(temp);
    t6 = b2.get$angularVelocity();
    if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(39, P, r2, b2, t6, i2, 0, 0, 0, 0, 0, 0, 0);
    t7 = $.Vector_crossVectors(r2, P);
    if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(40, i2, b2, t6, t7, 0, 0, 0, 0, 0, 0, 0, 0);
    t8 = this._motorImpulse;
    if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(41, i2, t8, b2, t6, t7, 0, 0, 0, 0, 0, 0, 0);
    t8 += t7;
    t7 = this.impulse.z;
    if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(42, t8, t7, b2, t6, i2, 0, 0, 0, 0, 0, 0, 0);
    b2.set$angularVelocity(t6 + i2 * (t8 + t7));
  } else {
    this.impulse.setZero$0();
    this._motorImpulse = 0.0;
  }
 },
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var step = env0;
      b1 = env1;
      b2 = env2;
      r1 = env3;
      r2 = env4;
      m1 = env5;
      break;
    case 2:
      step = env0;
      b1 = env1;
      b2 = env2;
      r1 = env3;
      r2 = env4;
      m1 = env5;
      m2 = env6;
      break;
    case 3:
      step = env0;
      b1 = env1;
      b2 = env2;
      r1 = env3;
      r2 = env4;
      m1 = env5;
      m2 = env6;
      i1 = env7;
      break;
    case 4:
      step = env0;
      b1 = env1;
      b2 = env2;
      r1 = env3;
      r2 = env4;
      m1 = env5;
      m2 = env6;
      i1 = env7;
      i2 = env8;
      break;
    case 5:
      step = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t2 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 6:
      step = env0;
      m1 = env1;
      m2 = env2;
      i1 = env3;
      i2 = env4;
      t1 = env5;
      b1 = env6;
      b2 = env7;
      r1 = env8;
      t2 = env9;
      r2 = env10;
      t3 = env11;
      break;
    case 7:
      step = env0;
      t4 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 8:
      step = env0;
      m1 = env1;
      m2 = env2;
      i1 = env3;
      i2 = env4;
      b1 = env5;
      b2 = env6;
      r1 = env7;
      t1 = env8;
      r2 = env9;
      t4 = env10;
      t5 = env11;
      break;
    case 9:
      step = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 10:
      step = env0;
      t6 = env1;
      b1 = env2;
      b2 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 11:
      step = env0;
      t8 = env1;
      t7 = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 12:
      step = env0;
      t8 = env1;
      t9 = env2;
      t7 = env3;
      m1 = env4;
      m2 = env5;
      i1 = env6;
      i2 = env7;
      b1 = env8;
      b2 = env9;
      r1 = env10;
      r2 = env11;
      break;
    case 13:
      step = env0;
      t7 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 14:
      step = env0;
      t10 = env1;
      b1 = env2;
      t11 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 15:
      step = env0;
      i2 = env1;
      b1 = env2;
      b2 = env3;
      t12 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      t10 = env10;
      break;
    case 16:
      step = env0;
      t12 = env1;
      t13 = env2;
      m1 = env3;
      m2 = env4;
      i1 = env5;
      i2 = env6;
      t10 = env7;
      b1 = env8;
      b2 = env9;
      r1 = env10;
      r2 = env11;
      break;
    case 17:
      step = env0;
      r2 = env1;
      b1 = env2;
      b2 = env3;
      t10 = env4;
      r1 = env5;
      t14 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 18:
      step = env0;
      t14 = env1;
      m1 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      t15 = env6;
      b1 = env7;
      b2 = env8;
      t10 = env9;
      r1 = env10;
      r2 = env11;
      break;
    case 19:
      step = env0;
      i2 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      t10 = env9;
      break;
    case 20:
      step = env0;
      t10 = env1;
      b1 = env2;
      i2 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      t16 = env10;
      break;
    case 21:
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
    case 22:
      step = env0;
      b1 = env1;
      b2 = env2;
      r1 = env3;
      t1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 23:
      step = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 24:
      step = env0;
      t2 = env1;
      t1 = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 25:
      step = env0;
      t2 = env1;
      t1 = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 26:
      step = env0;
      t1 = env1;
      jointAngle = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 27:
      step = env0;
      jointAngle = env1;
      m1 = env2;
      m2 = env3;
      i1 = env4;
      i2 = env5;
      b1 = env6;
      b2 = env7;
      r1 = env8;
      r2 = env9;
      t1 = env10;
      t2 = env11;
      break;
    case 28:
      step = env0;
      jointAngle = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t3 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 29:
      step = env0;
      t1 = env1;
      jointAngle = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 30:
      step = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 31:
      step = env0;
      jointAngle = env1;
      b1 = env2;
      t1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      m1 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 32:
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
    case 33:
      step = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 34:
      i2 = env0;
      t2 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      m1 = env6;
      t1 = env7;
      m2 = env8;
      i1 = env9;
      break;
    case 35:
      t3 = env0;
      b1 = env1;
      b2 = env2;
      temp = env3;
      P = env4;
      r1 = env5;
      r2 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 36:
      t3 = env0;
      t4 = env1;
      b1 = env2;
      b2 = env3;
      temp = env4;
      P = env5;
      r2 = env6;
      m2 = env7;
      i1 = env8;
      i2 = env9;
      break;
    case 37:
      t5 = env0;
      t3 = env1;
      t4 = env2;
      b1 = env3;
      b2 = env4;
      temp = env5;
      P = env6;
      r2 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 38:
      t3 = env0;
      b1 = env1;
      b2 = env2;
      temp = env3;
      t5 = env4;
      P = env5;
      t4 = env6;
      r2 = env7;
      m2 = env8;
      i1 = env9;
      i2 = env10;
      break;
    case 39:
      P = env0;
      r2 = env1;
      b2 = env2;
      t6 = env3;
      i2 = env4;
      break;
    case 40:
      i2 = env0;
      b2 = env1;
      t6 = env2;
      t7 = env3;
      break;
    case 41:
      i2 = env0;
      t8 = env1;
      b2 = env2;
      t6 = env3;
      t7 = env4;
      break;
    case 42:
      t8 = env0;
      t7 = env1;
      b2 = env2;
      t6 = env3;
      i2 = env4;
      break;
  }
  switch (state) {
    case 0:
      var b1 = this.bodyA;
      var b2 = this.bodyB;
      this._enableMotor === true || this._enableLimit === true;
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      var m1 = b1.get$invMass();
    case 1:
      state = 0;
      var m2 = b2.get$invMass();
    case 2:
      state = 0;
      var i1 = b1.get$invInertia();
    case 3:
      state = 0;
      var i2 = b2.get$invInertia();
    case 4:
      state = 0;
      var t1 = $.add(m1, m2);
      var t2 = r1.y;
    case 5:
      state = 0;
      var t3 = r1.y;
    case 6:
      state = 0;
      t1 = $.add(t1, $.mul($.mul(t2, t3), i1));
      var t4 = r2.y;
    case 7:
      state = 0;
      var t5 = r2.y;
    case 8:
      state = 0;
      t1 = $.add(t1, $.mul($.mul(t4, t5), i2));
      this.mass.get$col1().set$x(t1);
      t1 = r1.y;
    case 9:
      state = 0;
      t1 = $.neg(t1);
      var t6 = r1.x;
    case 10:
      state = 0;
      var t7 = $.mul($.mul(t1, t6), i1);
      var t8 = r2.y;
    case 11:
      state = 0;
      var t9 = r2.x;
    case 12:
      state = 0;
      t7 = $.sub(t7, $.mul($.mul(t8, t9), i2));
      this.mass.get$col2().set$x(t7);
      t7 = r1.y;
    case 13:
      state = 0;
      var t10 = $.mul($.neg(t7), i1);
      var t11 = r2.y;
    case 14:
      state = 0;
      t10 = $.sub(t10, $.mul(t11, i2));
      this.mass.get$col3().set$x(t10);
      t10 = this.mass.get$col2().get$x();
      this.mass.get$col1().set$y(t10);
      t10 = $.add(m1, m2);
      var t12 = r1.x;
    case 15:
      state = 0;
      var t13 = r1.x;
    case 16:
      state = 0;
      t10 = $.add(t10, $.mul($.mul(t12, t13), i1));
      var t14 = r2.x;
    case 17:
      state = 0;
      var t15 = r2.x;
    case 18:
      state = 0;
      t10 = $.add(t10, $.mul($.mul(t14, t15), i2));
      this.mass.get$col2().set$y(t10);
      t10 = r1.x;
    case 19:
      state = 0;
      t10 = $.mul(t10, i1);
      var t16 = r2.x;
    case 20:
      state = 0;
      t10 = $.add(t10, $.mul(t16, i2));
      this.mass.get$col3().set$y(t10);
      t10 = this.mass.get$col3().get$x();
      this.mass.get$col1().set$z(t10);
      t10 = this.mass.get$col3().get$y();
      this.mass.get$col2().set$z(t10);
      t10 = $.add(i1, i2);
      this.mass.get$col3().set$z(t10);
      this.motorMass = $.add(i1, i2);
      t1 = this.motorMass;
    case 21:
      state = 0;
      if ($.gtB(t1, 0.0)) {
        t1 = this.motorMass;
        if (typeof t1 !== 'number') throw $.iae(t1);
        this.motorMass = 1.0 / t1;
      }
      t1 = this._enableMotor;
    case 22:
      state = 0;
      if ($.eqB(t1, false)) this._motorImpulse = 0.0;
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
      if (state == 23 || state == 24 || state == 25 || state == 26 || state == 27 || state == 28 || state == 29 || state == 30 || state == 31 || state == 32 || (state == 0 && this._enableLimit === true)) {
        switch (state) {
          case 0:
            t1 = b2.get$sweep().get$angle();
          case 23:
            state = 0;
            t2 = b1.get$sweep().get$angle();
          case 24:
            state = 0;
            t2 = $.sub(t1, t2);
            t1 = this.referenceAngle;
          case 25:
            state = 0;
            var jointAngle = $.sub(t2, t1);
            t1 = this.upperAngle;
          case 26:
            state = 0;
            t2 = this.lowerAngle;
          case 27:
            state = 0;
            t3 = $.abs($.sub(t1, t2));
          case 28:
            state = 0;
          case 29:
          case 30:
          case 31:
          case 32:
            if ((state == 0 && $.ltB(t3, 0.06981317007977318))) {
              this.limitState = 3;
            } else {
              switch (state) {
                case 0:
                  t1 = this.lowerAngle;
                case 29:
                  state = 0;
                case 30:
                case 31:
                case 32:
                  if (state == 30 || (state == 0 && $.leB(jointAngle, t1))) {
                    switch (state) {
                      case 0:
                        t1 = this.limitState;
                      case 30:
                        state = 0;
                        !$.eqB(t1, 1) && this.impulse.set$z(0.0);
                        this.limitState = 1;
                    }
                  } else {
                    switch (state) {
                      case 0:
                        t1 = this.upperAngle;
                      case 31:
                        state = 0;
                      case 32:
                        if (state == 32 || (state == 0 && $.geB(jointAngle, t1))) {
                          switch (state) {
                            case 0:
                              t1 = this.limitState;
                            case 32:
                              state = 0;
                              !$.eqB(t1, 2) && this.impulse.set$z(0.0);
                              this.limitState = 2;
                          }
                        } else {
                          this.limitState = 0;
                          this.impulse.set$z(0.0);
                        }
                    }
                  }
              }
            }
        }
      } else {
        this.limitState = 0;
      }
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
      if (state == 33 || state == 34 || state == 35 || state == 36 || state == 37 || state == 38 || state == 39 || state == 40 || state == 41 || state == 42 || (state == 0 && step.get$warmStarting() === true)) {
        switch (state) {
          case 0:
            this.impulse.mulLocal$1(step.get$dtRatio());
            t1 = this._motorImpulse;
          case 33:
            state = 0;
            t2 = step.get$dtRatio();
          case 34:
            state = 0;
            this._motorImpulse = $.mul(t1, t2);
            var temp = $.Vector$(0, 0);
            var P = $.Vector$(0, 0);
            P.setCoords$2(this.impulse.get$x(), this.impulse.get$y());
            temp.setFrom$1(P).mulLocal$1(m1);
            b1.get$linearVelocity().subLocal$1(temp);
            t3 = b1.get$angularVelocity();
          case 35:
            state = 0;
            t4 = $.Vector_crossVectors(r1, P);
          case 36:
            state = 0;
            t5 = this._motorImpulse;
          case 37:
            state = 0;
            t5 = $.add(t4, t5);
            t4 = this.impulse.get$z();
          case 38:
            state = 0;
            b1.set$angularVelocity($.sub(t3, $.mul(i1, $.add(t5, t4))));
            temp.setFrom$1(P).mulLocal$1(m2);
            b2.get$linearVelocity().addLocal$1(temp);
            t6 = b2.get$angularVelocity();
          case 39:
            state = 0;
            t7 = $.Vector_crossVectors(r2, P);
          case 40:
            state = 0;
            t8 = this._motorImpulse;
          case 41:
            state = 0;
            t8 = $.add(t7, t8);
            t7 = this.impulse.get$z();
          case 42:
            state = 0;
            b2.set$angularVelocity($.add(t6, $.mul(i2, $.add(t8, t7))));
        }
      } else {
        this.impulse.setZero$0();
        this._motorImpulse = 0.0;
      }
  }
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

$$.DefaultWorldPool = {"":
 ["distance=", "timeOfImpact?", "collision?"],
 super: "Object",
 getPolyContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(queue, ({E: 'PolygonContact'}));
  for (var i = 0; i < 10; ++i) {
    queue.addFirst$1($.PolygonContact$(this));
  }
  return queue;
 },
 getPolyCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(queue, ({E: 'PolygonAndCircleContact'}));
  for (var i = 0; i < 10; ++i) {
    queue.addFirst$1($.PolygonAndCircleContact$(this));
  }
  return queue;
 },
 getCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(queue, ({E: 'CircleContact'}));
  for (var i = 0; i < 10; ++i) {
    queue.addFirst$1($.CircleContact$(this));
  }
  return queue;
 },
 distance$3: function(arg0, arg1, arg2) { return this.distance.$call$3(arg0, arg1, arg2); },
 timeOfImpact$2: function(arg0, arg1) { return this.timeOfImpact.$call$2(arg0, arg1); },
 DefaultWorldPool$0: function() {
  this.distance = $.Distance$_construct();
  this.collision = $.Collision$_construct(this);
  this.timeOfImpact = $.TimeOfImpact$_construct(this);
 }
};

$$.Color3 = {"":
 ["z=", "y=", "x="],
 super: "Object",
 operator$eq$1: function(other) {
  if (!((typeof other === 'object' && other !== null) && !!other.is$Color3)) return false;
  var t1 = this.x;
  var t2 = other.x;
  if (t1 == null ? t2 == null : t1 === t2) {
    t1 = this.y;
    t2 = other.y;
    if (t1 == null ? t2 == null : t1 === t2) {
      t1 = this.z;
      t2 = other.z;
      t2 = t1 == null ? t2 == null : t1 === t2;
      t1 = t2;
    } else t1 = false;
  } else t1 = false;
  return t1;
 },
 setFrom$1: function(argColor) {
  this.x = argColor.get$x();
  this.y = argColor.get$y();
  this.z = argColor.get$z();
 },
 setFromRGB$3: function(r, g, b) {
  this.x = r;
  this.y = g;
  this.z = b;
 },
 is$Color3: true
};

$$.CanvasViewportTransform = {"":
 ["scale=", "center?", "extents"],
 super: "Object",
 getWorldToScreen$2: function(argWorld, argScreen) {
  var gridCorrectedX = $.add($.mul(argWorld.get$x(), this.scale), this.extents.get$x());
  var gridCorrectedY = $.sub(this.extents.get$y(), $.mul(argWorld.get$y(), this.scale));
  argScreen.setCoords$2($.add(gridCorrectedX, this.get$translation().get$x()), $.add(gridCorrectedY, $.neg(this.get$translation().get$y())));
 },
 get$translation: function() {
  var result = $.Vector$copy(this.extents);
  result.subLocal$1(this.center);
  return result;
 }
};

$$.Matrix22 = {"":
 ["col2?", "col1?"],
 super: "Object",
 toString$0: function() {
  return $.S(this.col1) + ', ' + $.S(this.col2);
 },
 solveToOut$2: function(b, out) {
  var a11 = this.col1.get$x();
  var a12 = this.col2.get$x();
  var a21 = this.col1.get$y();
  var a22 = this.col2.get$y();
  var det = $.sub($.mul(a11, a22), $.mul(a12, a21));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number') throw $.iae(det);
    det = 1.0 / det;
  }
  var tempy = $.mul(det, $.sub($.mul(a11, b.get$y()), $.mul(a21, b.get$x())));
  out.set$x($.mul(det, $.sub($.mul(a22, b.get$x()), $.mul(a12, b.get$y()))));
  out.set$y(tempy);
 },
 addLocal$1: function(other) {
  var t1 = this.col1;
  var t2 = t1.get$x();
  if (typeof t2 !== 'number') return this.addLocal$1$bailout(1, other, t1, t2, 0);
  var t3 = other.get$col1().get$x();
  if (typeof t3 !== 'number') return this.addLocal$1$bailout(2, other, t1, t2, t3);
  t1.set$x(t2 + t3);
  t1 = this.col1;
  var t4 = t1.get$y();
  if (typeof t4 !== 'number') return this.addLocal$1$bailout(3, other, t1, t4, 0);
  var t5 = other.get$col1().get$y();
  if (typeof t5 !== 'number') return this.addLocal$1$bailout(4, other, t1, t4, t5);
  t1.set$y(t4 + t5);
  t1 = this.col2;
  var t6 = t1.get$x();
  if (typeof t6 !== 'number') return this.addLocal$1$bailout(5, other, t6, t1, 0);
  var t7 = other.get$col2().get$x();
  if (typeof t7 !== 'number') return this.addLocal$1$bailout(6, other, t6, t1, t7);
  t1.set$x(t6 + t7);
  t1 = this.col2;
  var t8 = t1.get$y();
  if (typeof t8 !== 'number') return this.addLocal$1$bailout(7, other, t8, t1, 0);
  var t9 = other.get$col2().get$y();
  if (typeof t9 !== 'number') return this.addLocal$1$bailout(8, t8, t9, t1, 0);
  t1.set$y(t8 + t9);
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
      t3 = env3;
      break;
    case 3:
      other = env0;
      t1 = env1;
      t4 = env2;
      break;
    case 4:
      other = env0;
      t1 = env1;
      t4 = env2;
      t5 = env3;
      break;
    case 5:
      other = env0;
      t6 = env1;
      t1 = env2;
      break;
    case 6:
      other = env0;
      t6 = env1;
      t1 = env2;
      t7 = env3;
      break;
    case 7:
      other = env0;
      t8 = env1;
      t1 = env2;
      break;
    case 8:
      t8 = env0;
      t9 = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.col1;
      var t2 = t1.get$x();
    case 1:
      state = 0;
      var t3 = other.get$col1().get$x();
    case 2:
      state = 0;
      t1.set$x($.add(t2, t3));
      t1 = this.col1;
      var t4 = t1.get$y();
    case 3:
      state = 0;
      var t5 = other.get$col1().get$y();
    case 4:
      state = 0;
      t1.set$y($.add(t4, t5));
      t1 = this.col2;
      var t6 = t1.get$x();
    case 5:
      state = 0;
      var t7 = other.get$col2().get$x();
    case 6:
      state = 0;
      t1.set$x($.add(t6, t7));
      t1 = this.col2;
      var t8 = t1.get$y();
    case 7:
      state = 0;
      var t9 = other.get$col2().get$y();
    case 8:
      state = 0;
      t1.set$y($.add(t8, t9));
      return this;
  }
 },
 invertLocal$0: function() {
  var a = this.col1.get$x();
  if (typeof a !== 'number') return this.invertLocal$0$bailout(1, a, 0, 0, 0);
  var b = this.col2.get$x();
  if (typeof b !== 'number') return this.invertLocal$0$bailout(2, a, b, 0, 0);
  var c = this.col1.get$y();
  if (typeof c !== 'number') return this.invertLocal$0$bailout(3, a, b, c, 0);
  var d = this.col2.get$y();
  if (typeof d !== 'number') return this.invertLocal$0$bailout(4, d, a, b, c);
  var det = a * d - b * c;
  if (!(det === 0)) det = 1.0 / det;
  var t1 = det * d;
  this.col1.set$x(t1);
  t1 = -det;
  var t2 = t1 * b;
  this.col2.set$x(t2);
  t1 *= c;
  this.col1.set$y(t1);
  t1 = det * a;
  this.col2.set$y(t1);
  return this;
 },
 invertLocal$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      b = env1;
      break;
    case 3:
      a = env0;
      b = env1;
      c = env2;
      break;
    case 4:
      d = env0;
      a = env1;
      b = env2;
      c = env3;
      break;
  }
  switch (state) {
    case 0:
      var a = this.col1.get$x();
    case 1:
      state = 0;
      var b = this.col2.get$x();
    case 2:
      state = 0;
      var c = this.col1.get$y();
    case 3:
      state = 0;
      var d = this.col2.get$y();
    case 4:
      state = 0;
      var det = $.sub($.mul(a, d), $.mul(b, c));
      if (!$.eqB(det, 0)) {
        if (typeof det !== 'number') throw $.iae(det);
        det = 1.0 / det;
      }
      var t1 = $.mul(det, d);
      this.col1.set$x(t1);
      t1 = $.mul($.neg(det), b);
      this.col2.set$x(t1);
      t1 = $.mul($.neg(det), c);
      this.col1.set$y(t1);
      t1 = $.mul(det, a);
      this.col2.set$y(t1);
      return this;
  }
 },
 setFrom$1: function(matrix) {
  this.col1.setFrom$1(matrix.get$col1());
  this.col2.setFrom$1(matrix.get$col2());
 },
 setAngle$1: function(angle) {
  var cosin = $.Math_cos(angle);
  var sin = $.Math_sin(angle);
  this.col1.setCoords$2(cosin, sin);
  this.col2.setCoords$2($.neg(sin), cosin);
 },
 operator$eq$1: function(other) {
  if (!(other == null) && ((typeof other === 'object' && other !== null) && !!other.is$Matrix22)) {
    return $.eqB(this.col1, other.get$col1()) && $.eqB(this.col2, other.get$col2());
  }
  return false;
 },
 Matrix22$2: function(c1, c2) {
  if (c1 == null) c1 = $.Vector$(0, 0);
  if (c2 == null) c2 = $.Vector$(0, 0);
  this.col1 = c1;
  this.col2 = c2;
 },
 is$Matrix22: true
};

$$.Matrix33 = {"":
 ["col3?", "col2?", "col1?"],
 super: "Object",
 solve33ToOut$2: function(b, out) {
  $.Vector3_crossToOut(this.col2, this.col3, out);
  var det = $.Vector3_dot(this.col1, out);
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number') throw $.iae(det);
    det = 1.0 / det;
  }
  $.Vector3_crossToOut(this.col2, this.col3, out);
  var x = $.mul(det, $.Vector3_dot(b, out));
  $.Vector3_crossToOut(b, this.col3, out);
  var y = $.mul(det, $.Vector3_dot(this.col1, out));
  $.Vector3_crossToOut(this.col2, b, out);
  var z = $.mul(det, $.Vector3_dot(this.col1, out));
  out.set$x(x);
  out.set$y(y);
  out.set$z(z);
 },
 solve22ToOut$2: function(b, out) {
  var a11 = this.col1.get$x();
  var a12 = this.col2.get$x();
  var a21 = this.col1.get$y();
  var a22 = this.col2.get$y();
  var det = $.sub($.mul(a11, a22), $.mul(a12, a21));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number') throw $.iae(det);
    det = 1.0 / det;
  }
  out.set$x($.mul(det, $.sub($.mul(a22, b.get$x()), $.mul(a12, b.get$y()))));
  out.set$y($.mul(det, $.sub($.mul(a11, b.get$y()), $.mul(a21, b.get$x()))));
 },
 setZero$0: function() {
  this.col1.setZero$0();
  this.col2.setZero$0();
  this.col3.setZero$0();
 }
};

$$.Sweep = {"":
 ["angle=", "angleZero=", "center?", "centerZero?", "localCenter?"],
 super: "Object",
 advance$1: function(time) {
  if (typeof time !== 'number') throw $.iae(time);
  var t1 = 1 - time;
  var t2 = this.centerZero.get$x();
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= t1;
  var t3 = this.center.get$x();
  if (typeof t3 !== 'number') throw $.iae(t3);
  t2 += time * t3;
  this.centerZero.set$x(t2);
  t2 = this.centerZero.get$y();
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= t1;
  var t4 = this.center.get$y();
  if (typeof t4 !== 'number') throw $.iae(t4);
  t2 += time * t4;
  this.centerZero.set$y(t2);
  t2 = this.angleZero;
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= t1;
  t1 = this.angle;
  if (typeof t1 !== 'number') throw $.iae(t1);
  this.angleZero = t2 + time * t1;
 },
 getTransform$2: function(xf, alpha) {
  if (typeof alpha !== 'number') throw $.iae(alpha);
  var t1 = 1.0 - alpha;
  var t2 = this.centerZero.x;
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= t1;
  var t3 = this.center.x;
  if (typeof t3 !== 'number') throw $.iae(t3);
  t2 += alpha * t3;
  xf.get$position().set$x(t2);
  t2 = this.centerZero.y;
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= t1;
  var t4 = this.center.y;
  if (typeof t4 !== 'number') throw $.iae(t4);
  t2 += alpha * t4;
  xf.get$position().set$y(t2);
  t2 = xf.get$rotation();
  var t5 = this.angleZero;
  if (typeof t5 !== 'number') throw $.iae(t5);
  t5 *= t1;
  t1 = this.angle;
  if (typeof t1 !== 'number') throw $.iae(t1);
  t2.setAngle$1(t5 + alpha * t1);
  t2 = xf.get$position();
  var t6 = t2.get$x();
  if (typeof t6 !== 'number') return this.getTransform$2$bailout(1, xf, t2, t6, 0, 0, 0);
  var t7 = xf.get$rotation().get$col1().get$x();
  if (typeof t7 !== 'number') return this.getTransform$2$bailout(2, xf, t7, t2, t6, 0, 0);
  var t8 = this.localCenter.x;
  if (typeof t8 !== 'number') return this.getTransform$2$bailout(3, xf, t7, t8, t2, t6, 0);
  t8 *= t7;
  t7 = xf.get$rotation().get$col2().get$x();
  if (typeof t7 !== 'number') return this.getTransform$2$bailout(4, xf, t7, t6, t8, t2, 0);
  var t9 = this.localCenter.y;
  if (typeof t9 !== 'number') return this.getTransform$2$bailout(5, xf, t8, t7, t9, t2, t6);
  t2.set$x(t6 - (t8 + t7 * t9));
  t2 = xf.get$position();
  var t10 = t2.get$y();
  if (typeof t10 !== 'number') return this.getTransform$2$bailout(6, xf, t2, t10, 0, 0, 0);
  var t11 = xf.get$rotation().get$col1().get$y();
  if (typeof t11 !== 'number') return this.getTransform$2$bailout(7, xf, t2, t10, t11, 0, 0);
  var t12 = this.localCenter.x;
  if (typeof t12 !== 'number') return this.getTransform$2$bailout(8, xf, t12, t2, t10, t11, 0);
  t12 *= t11;
  t11 = xf.get$rotation().get$col2().get$y();
  if (typeof t11 !== 'number') return this.getTransform$2$bailout(9, t2, t10, t12, t11, 0, 0);
  var t13 = this.localCenter.y;
  if (typeof t13 !== 'number') return this.getTransform$2$bailout(10, t13, t2, t10, t12, t11, 0);
  t2.set$y(t10 - (t12 + t11 * t13));
 },
 getTransform$2$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var xf = env0;
      t2 = env1;
      t6 = env2;
      break;
    case 2:
      xf = env0;
      t7 = env1;
      t2 = env2;
      t6 = env3;
      break;
    case 3:
      xf = env0;
      t7 = env1;
      t8 = env2;
      t2 = env3;
      t6 = env4;
      break;
    case 4:
      xf = env0;
      t7 = env1;
      t6 = env2;
      t8 = env3;
      t2 = env4;
      break;
    case 5:
      xf = env0;
      t8 = env1;
      t7 = env2;
      t9 = env3;
      t2 = env4;
      t6 = env5;
      break;
    case 6:
      xf = env0;
      t2 = env1;
      t10 = env2;
      break;
    case 7:
      xf = env0;
      t2 = env1;
      t10 = env2;
      t11 = env3;
      break;
    case 8:
      xf = env0;
      t12 = env1;
      t2 = env2;
      t10 = env3;
      t11 = env4;
      break;
    case 9:
      t2 = env0;
      t10 = env1;
      t12 = env2;
      t11 = env3;
      break;
    case 10:
      t13 = env0;
      t2 = env1;
      t10 = env2;
      t12 = env3;
      t11 = env4;
      break;
  }
  switch (state) {
    case 0:
      if (typeof alpha !== 'number') throw $.iae(alpha);
      var t1 = 1.0 - alpha;
      var t2 = this.centerZero.get$x();
      if (typeof t2 !== 'number') throw $.iae(t2);
      t2 *= t1;
      var t3 = this.center.get$x();
      if (typeof t3 !== 'number') throw $.iae(t3);
      t2 += alpha * t3;
      xf.get$position().set$x(t2);
      t2 = this.centerZero.get$y();
      if (typeof t2 !== 'number') throw $.iae(t2);
      t2 *= t1;
      var t4 = this.center.get$y();
      if (typeof t4 !== 'number') throw $.iae(t4);
      t2 += alpha * t4;
      xf.get$position().set$y(t2);
      t2 = xf.get$rotation();
      var t5 = this.angleZero;
      if (typeof t5 !== 'number') throw $.iae(t5);
      t5 *= t1;
      t1 = this.angle;
      if (typeof t1 !== 'number') throw $.iae(t1);
      t2.setAngle$1(t5 + alpha * t1);
      t2 = xf.get$position();
      var t6 = t2.get$x();
    case 1:
      state = 0;
      var t7 = xf.get$rotation().get$col1().get$x();
    case 2:
      state = 0;
      var t8 = this.localCenter.get$x();
    case 3:
      state = 0;
      t8 = $.mul(t7, t8);
      t7 = xf.get$rotation().get$col2().get$x();
    case 4:
      state = 0;
      var t9 = this.localCenter.get$y();
    case 5:
      state = 0;
      t2.set$x($.sub(t6, $.add(t8, $.mul(t7, t9))));
      t2 = xf.get$position();
      var t10 = t2.get$y();
    case 6:
      state = 0;
      var t11 = xf.get$rotation().get$col1().get$y();
    case 7:
      state = 0;
      var t12 = this.localCenter.get$x();
    case 8:
      state = 0;
      t12 = $.mul(t11, t12);
      t11 = xf.get$rotation().get$col2().get$y();
    case 9:
      state = 0;
      var t13 = this.localCenter.get$y();
    case 10:
      state = 0;
      t2.set$y($.sub(t10, $.add(t12, $.mul(t11, t13))));
  }
 },
 normalize$0: function() {
  var t1 = $.floor($.div(this.angleZero, 6.283185307179586));
  if (typeof t1 !== 'number') throw $.iae(t1);
  var d = 6.283185307179586 * t1;
  this.angleZero = $.sub(this.angleZero, d);
  this.angle = $.sub(this.angle, d);
 },
 setFrom$1: function(other) {
  this.localCenter.setFrom$1(other.get$localCenter());
  this.centerZero.setFrom$1(other.get$centerZero());
  this.center.setFrom$1(other.get$center());
  this.angleZero = other.get$angleZero();
  this.angle = other.get$angle();
 },
 operator$eq$1: function(other) {
  return $.eqB(this.localCenter, other.get$localCenter()) && ($.eqB(this.centerZero, other.get$centerZero()) && ($.eqB(this.center, other.get$center()) && ($.eqB(this.angleZero, other.get$angleZero()) && $.eqB(this.angle, other.get$angle()))));
 }
};

$$.Transform = {"":
 ["rotation?", "position?"],
 super: "Object",
 setFrom$1: function(other) {
  this.position.setFrom$1(other.get$position());
  this.rotation.setFrom$1(other.get$rotation());
 },
 operator$eq$1: function(other) {
  if (other == null) return false;
  return $.eqB(this.position, other.get$position()) && $.eqB(this.rotation, other.get$rotation());
 }
};

$$.Vector = {"":
 ["y=", "x="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ')';
 },
 negateLocal$0: function() {
  this.x = $.neg(this.x);
  this.y = $.neg(this.y);
  return this;
 },
 normalize$0: function() {
  var len = $.get$length(this);
  if ($.ltB(len, 1.192e-7)) return 0;
  if (typeof len !== 'number') throw $.iae(len);
  var invLength = 1.0 / len;
  this.x = $.mul(this.x, invLength);
  this.y = $.mul(this.y, invLength);
  return len;
 },
 absLocal$0: function() {
  this.x = $.abs(this.x);
  this.y = $.abs(this.y);
 },
 get$lengthSquared: function() {
  return $.add($.mul(this.x, this.x), $.mul(this.y, this.y));
 },
 get$length: function() {
  return $.Math_sqrt(this.get$lengthSquared());
 },
 setZero$0: function() {
  this.setCoords$2(0, 0);
  return this;
 },
 mulLocal$1: function(d) {
  this.x = $.mul(this.x, d);
  this.y = $.mul(this.y, d);
  return this;
 },
 setFrom$1: function(v) {
  this.setCoords$2(v.get$x(), v.get$y());
  return this;
 },
 setCoords$2: function(xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
  return this;
 },
 subLocal$1: function(other) {
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.subLocal$1$bailout(1, other, t1, 0);
  var t2 = other.get$x();
  if (typeof t2 !== 'number') return this.subLocal$1$bailout(2, other, t2, t1);
  this.x = t1 - t2;
  var t3 = this.y;
  if (typeof t3 !== 'number') return this.subLocal$1$bailout(3, other, t3, 0);
  var t4 = other.get$y();
  if (typeof t4 !== 'number') return this.subLocal$1$bailout(4, t3, t4, 0);
  this.y = t3 - t4;
  return this;
 },
 subLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var other = env0;
      t1 = env1;
      break;
    case 2:
      other = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 3:
      other = env0;
      t3 = env1;
      break;
    case 4:
      t3 = env0;
      t4 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = other.get$x();
    case 2:
      state = 0;
      this.x = $.sub(t1, t2);
      var t3 = this.y;
    case 3:
      state = 0;
      var t4 = other.get$y();
    case 4:
      state = 0;
      this.y = $.sub(t3, t4);
      return this;
  }
 },
 addLocal$1: function(v) {
  this.x = $.add(this.x, v.get$x());
  this.y = $.add(this.y, v.get$y());
  return this;
 },
 operator$eq$1: function(other) {
  if (other == null) return false;
  var t1 = this.x;
  var t2 = other.get$x();
  if (t1 == null ? t2 == null : t1 === t2) {
    t1 = this.y;
    t2 = other.get$y();
    t2 = t1 == null ? t2 == null : t1 === t2;
    t1 = t2;
  } else t1 = false;
  return t1;
 }
};

$$.Vector3 = {"":
 ["z=", "y=", "x="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ', ' + $.S(this.z) + ')';
 },
 setZero$0: function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
 },
 negateLocal$0: function() {
  this.x = $.neg(this.x);
  this.y = $.neg(this.y);
  this.z = $.neg(this.z);
  return this;
 },
 mulLocal$1: function(argScalar) {
  this.x = $.mul(this.x, argScalar);
  this.y = $.mul(this.y, argScalar);
  this.z = $.mul(this.z, argScalar);
  return this;
 },
 subLocal$1: function(argVec) {
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.subLocal$1$bailout(1, argVec, t1, 0);
  var t2 = argVec.get$x();
  if (typeof t2 !== 'number') return this.subLocal$1$bailout(2, argVec, t1, t2);
  this.x = t1 - t2;
  var t3 = this.y;
  if (typeof t3 !== 'number') return this.subLocal$1$bailout(3, argVec, t3, 0);
  var t4 = argVec.get$y();
  if (typeof t4 !== 'number') return this.subLocal$1$bailout(4, argVec, t4, t3);
  this.y = t3 - t4;
  var t5 = this.z;
  if (typeof t5 !== 'number') return this.subLocal$1$bailout(5, t5, argVec, 0);
  var t6 = argVec.get$z();
  if (typeof t6 !== 'number') return this.subLocal$1$bailout(6, t5, t6, 0);
  this.z = t5 - t6;
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
      t2 = env2;
      break;
    case 3:
      argVec = env0;
      t3 = env1;
      break;
    case 4:
      argVec = env0;
      t4 = env1;
      t3 = env2;
      break;
    case 5:
      t5 = env0;
      argVec = env1;
      break;
    case 6:
      t5 = env0;
      t6 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = argVec.get$x();
    case 2:
      state = 0;
      this.x = $.sub(t1, t2);
      var t3 = this.y;
    case 3:
      state = 0;
      var t4 = argVec.get$y();
    case 4:
      state = 0;
      this.y = $.sub(t3, t4);
      var t5 = this.z;
    case 5:
      state = 0;
      var t6 = argVec.get$z();
    case 6:
      state = 0;
      this.z = $.sub(t5, t6);
      return this;
  }
 },
 add$1: function(argVec) {
  return $.Vector3$($.add(this.x, argVec.get$x()), $.add(this.y, argVec.get$y()), $.add(this.z, argVec.get$z()));
 },
 addLocal$1: function(argVec) {
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.addLocal$1$bailout(1, argVec, t1, 0);
  var t2 = argVec.get$x();
  if (typeof t2 !== 'number') return this.addLocal$1$bailout(2, argVec, t1, t2);
  this.x = t1 + t2;
  var t3 = this.y;
  if (typeof t3 !== 'number') return this.addLocal$1$bailout(3, argVec, t3, 0);
  var t4 = argVec.get$y();
  if (typeof t4 !== 'number') return this.addLocal$1$bailout(4, argVec, t4, t3);
  this.y = t3 + t4;
  var t5 = this.z;
  if (typeof t5 !== 'number') return this.addLocal$1$bailout(5, t5, argVec, 0);
  var t6 = argVec.get$z();
  if (typeof t6 !== 'number') return this.addLocal$1$bailout(6, t5, t6, 0);
  this.z = t5 + t6;
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
      t2 = env2;
      break;
    case 3:
      argVec = env0;
      t3 = env1;
      break;
    case 4:
      argVec = env0;
      t4 = env1;
      t3 = env2;
      break;
    case 5:
      t5 = env0;
      argVec = env1;
      break;
    case 6:
      t5 = env0;
      t6 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = argVec.get$x();
    case 2:
      state = 0;
      this.x = $.add(t1, t2);
      var t3 = this.y;
    case 3:
      state = 0;
      var t4 = argVec.get$y();
    case 4:
      state = 0;
      this.y = $.add(t3, t4);
      var t5 = this.z;
    case 5:
      state = 0;
      var t6 = argVec.get$z();
    case 6:
      state = 0;
      this.z = $.add(t5, t6);
      return this;
  }
 },
 setCoords$3: function(argX, argY, argZ) {
  this.x = argX;
  this.y = argY;
  this.z = argZ;
  return this;
 },
 setFrom$1: function(argVec) {
  this.x = argVec.get$x();
  this.y = argVec.get$y();
  this.z = argVec.get$z();
  return this;
 },
 operator$eq$1: function(other) {
  if (!(other == null) && ((typeof other === 'object' && other !== null) && !!other.is$Vector3)) {
    return $.eqB(this.x, other.get$x()) && ($.eqB(this.y, other.get$y()) && $.eqB(this.z, other.get$z()));
  }
  return false;
 },
 is$Vector3: true
};

$$.Demo_runAnimation_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(time) {
  this.this_0.step$1(time);
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.Demo_step_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(time) {
  this.this_0.step$1(time);
 }
};

$$.Demo_initializeAnimation_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  var t1 = this.this_0.get$frameCount();
  this.this_0.set$fps(t1);
  this.this_0.set$frameCount(0);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.BroadPhase_updatePairs_anon = {"":
 [],
 super: "Closure",
 $call$2: function(a, b) {
  return $.compareTo(a, b);
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$.HashSetImplementation_filter__ = {"":
 ["result_1", "f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key) === true && $.add$1(this.result_1, key);
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); }
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$$.BoundClosure3 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$1: function(p0) { return this.self[this.target](p0); },
 $call$0: function() {
  return this.$call$1(null)
}
};
$$.BoundClosure4 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$1: function(p0) { return this.self[this.target](p0); },
 $call$0: function() {
  return this.$call$1(null)
}
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$.setRange$3 = function(receiver, start, length$, from) {
  if ($.isJsArray(receiver) === true) return $.setRange$4(receiver, start, length$, from, 0);
  return receiver.setRange$3(start, length$, from);
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.Color3$fromRGB = function(r, g, b) {
  return new $.Color3(b, g, r);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$.Vector_crossVectorAndNumToOut = function(a, s, out) {
  var tempy = $.mul($.neg(s), a.get$x());
  out.set$x($.mul(s, a.get$y()));
  out.set$y(tempy);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.MathBox_distanceSquared = function(v1, v2) {
  var dx = $.sub(v1.get$x(), v2.get$x());
  var dy = $.sub(v1.get$y(), v2.get$y());
  return $.add($.mul(dx, dx), $.mul(dy, dy));
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
  var t19 = $.Vector$(0, 0);
  return new $.SeparationFunction(t18, t17, t16, $.Vector$(0, 0), t19, t15, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, 0, t2, t1);
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.Vector_crossVectors = function(v1, v2) {
  return $.sub($.mul(v1.get$x(), v2.get$y()), $.mul(v1.get$y(), v2.get$x()));
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.CircleShape$copy = function(other) {
  var t1 = other.get$type();
  var t2 = other.get$radius();
  return new $.CircleShape($.Vector$copy(other.get$position()), t2, t1);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.Vector_maxToOut = function(a, b, out) {
  out.set$x($.gtB(a.get$x(), b.get$x()) ? a.get$x() : b.get$x());
  out.set$y($.gtB(a.get$y(), b.get$y()) ? a.get$y() : b.get$y());
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.TimeOfImpact$_construct = function(argPool) {
  var t1 = $.SimplexCache$();
  var t2 = $.DistanceInput$();
  var t3 = $.Transform$();
  var t4 = $.Transform$();
  var t5 = $.DistanceOutput$();
  var t6 = $.SeparationFunction$();
  var t7 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t7, ({E: 'int'}));
  var t8 = $.Sweep$();
  t1 = new $.TimeOfImpact(argPool, $.Sweep$(), t8, t7, t6, t5, t4, t3, t2, t1);
  t1.TimeOfImpact$_construct$1(argPool);
  return t1;
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.EdgeResults$ = function() {
  return new $.EdgeResults(0, 0);
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
  t7 = new $.Body($.Vector$(0, 0), t11, t10, t9, t8, t2, t1, null, bd.get$type(), t5, t4, 0, 0, 0, t6, null, 0, null, null, null, null, null, 0, t3, t7, 0, null, 0, world);
  t7.Body$2(bd, world);
  return t7;
};

$.WorldManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t4, ({E: 'Vector'}));
  t1 = new $.WorldManifold(t3, t2, t4, t1);
  t1.WorldManifold$0();
  return t1;
};

$.Vector$ = function(x, y) {
  return new $.Vector(y, x);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && ($.isEmpty(name$) !== true && (!(name$ === 'Object') && !(name$ === 'Function.prototype')))) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.PolygonAndCircleContact$ = function(argPool) {
  var t1 = $.Manifold$();
  var t2 = $.ContactEdge$();
  var t3 = $.ContactEdge$();
  return new $.PolygonAndCircleContact($.Manifold$(), argPool, null, t1, null, null, t3, t2, null, null, null);
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException(message);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.Math_max = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b) return a;
      if (a < b) return b;
      if (typeof b === 'number') {
        if (typeof a === 'number') {
          if (a === 0.0) return a + b;
        }
        if ($.isNaN(b) === true) return b;
        return a;
      }
      if (b === 0 && $.isNegative(a) === true) return b;
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.AxisAlignedBox_testOverlap = function(a, b) {
  var t1 = b.get$lowerBound().get$x();
  if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(1, a, b, t1, 0);
  var t2 = a.get$upperBound().get$x();
  if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(2, a, b, t2, t1);
  if (!(t1 > t2)) {
    t1 = b.get$lowerBound().get$y();
    if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(3, a, b, t1, 0);
    t2 = a.get$upperBound().get$y();
    if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(4, a, b, t2, t1);
    t2 = t1 > t2;
    t1 = t2;
  } else t1 = true;
  if (!t1) {
    t1 = a.get$lowerBound().get$x();
    if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(5, a, b, t1, 0);
    t2 = b.get$upperBound().get$x();
    if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(6, a, b, t2, t1);
    if (!(t1 > t2)) {
      t1 = a.get$lowerBound().get$y();
      if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(7, b, t1, 0, 0);
      t2 = b.get$upperBound().get$y();
      if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(8, t1, t2, 0, 0);
      t2 = t1 > t2;
      t1 = t2;
    } else t1 = true;
  } else t1 = true;
  return !t1;
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.JointEdge$ = function() {
  return new $.JointEdge(null, null, null, null);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$.Math_sqrt = function(x) {
  return $.MathNatives_sqrt(x);
};

$.MathNatives_sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.DualPivotQuicksort__dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || ((a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())) return $.DualPivotQuicksort__dualPivotQuicksort$bailout(1, a, left, right, compare, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
  var index1 = $.add(left, sixth);
  var index5 = $.sub(right, sixth);
  var index3 = $.tdiv($.add(left, right), 2);
  var index2 = $.sub(index3, sixth);
  var index4 = $.add(index3, sixth);
  if (index1 !== (index1 | 0)) throw $.iae(index1);
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  var el2 = a[index1];
  if (index2 !== (index2 | 0)) throw $.iae(index2);
  var t2 = a.length;
  if (index2 < 0 || index2 >= t2) throw $.ioore(index2);
  var el20 = a[index2];
  if (index3 !== (index3 | 0)) throw $.iae(index3);
  var t3 = a.length;
  if (index3 < 0 || index3 >= t3) throw $.ioore(index3);
  var el1 = a[index3];
  if (index4 !== (index4 | 0)) throw $.iae(index4);
  var t4 = a.length;
  if (index4 < 0 || index4 >= t4) throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 !== (index5 | 0)) throw $.iae(index5);
  var t5 = a.length;
  if (index5 < 0 || index5 >= t5) throw $.ioore(index5);
  var el40 = a[index5];
  if ($.gtB(compare.$call$2(el2, el20), 0)) var el10 = el20;
  else {
    el10 = el2;
    el2 = el20;
  }
  if ($.gtB(compare.$call$2(el4, el40), 0)) {
    var el5 = el4;
    el4 = el40;
  } else el5 = el40;
  if ($.gtB(compare.$call$2(el10, el1), 0)) var el3 = el10;
  else {
    el3 = el1;
    el1 = el10;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    var t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el5), 0)) {
    t0 = el2;
    el2 = el5;
    el5 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  a[index1] = el1;
  t2 = a.length;
  if (index3 < 0 || index3 >= t2) throw $.ioore(index3);
  a[index3] = el3;
  t3 = a.length;
  if (index5 < 0 || index5 >= t3) throw $.ioore(index5);
  a[index5] = el5;
  if (left !== (left | 0)) throw $.iae(left);
  t4 = a.length;
  if (left < 0 || left >= t4) throw $.ioore(left);
  t5 = a[left];
  var t6 = a.length;
  if (index2 < 0 || index2 >= t6) throw $.ioore(index2);
  a[index2] = t5;
  if (right !== (right | 0)) throw $.iae(right);
  t5 = a.length;
  if (right < 0 || right >= t5) throw $.ioore(right);
  var t7 = a[right];
  var t8 = a.length;
  if (index4 < 0 || index4 >= t8) throw $.ioore(index4);
  a[index4] = t7;
  var less = left + 1;
  if (typeof less !== 'number') return $.DualPivotQuicksort__dualPivotQuicksort$bailout(2, a, left, right, compare, index5, el2, less, el4, index1, 0, 0, 0, 0, 0);
  var great = right - 1;
  if (typeof great !== 'number') return $.DualPivotQuicksort__dualPivotQuicksort$bailout(3, a, left, right, compare, index5, el2, great, less, el4, index1, 0, 0, 0, 0);
  var pivots_are_equal = $.eqB(compare.$call$2(el2, el4), 0);
  if (pivots_are_equal) {
    for (var k = less; k <= great; ++k) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      t2 = a[k];
      var comp = compare.$call$2(t2, el2);
      if (typeof comp !== 'number') return $.DualPivotQuicksort__dualPivotQuicksort$bailout(4, a, less, k, compare, left, right, great, index1, index5, el2, pivots_are_equal, t2, comp, el4);
      if (comp === 0) continue;
      if (comp < 0) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t3 = a[less];
          t4 = a.length;
          if (k < 0 || k >= t4) throw $.ioore(k);
          a[k] = t3;
          t3 = a.length;
          if (less < 0 || less >= t3) throw $.ioore(less);
          a[less] = t2;
        }
        ++less;
      } else {
        for (; true; ) {
          if (great !== (great | 0)) throw $.iae(great);
          t1 = a.length;
          if (great < 0 || great >= t1) throw $.ioore(great);
          comp = compare.$call$2(a[great], el2);
          if ($.gtB(comp, 0)) {
            --great;
            continue;
          } else {
            t1 = $.ltB(comp, 0);
            var great0 = great - 1;
            if (t1) {
              if (less !== (less | 0)) throw $.iae(less);
              t1 = a.length;
              if (less < 0 || less >= t1) throw $.ioore(less);
              t3 = a[less];
              t4 = a.length;
              if (k < 0 || k >= t4) throw $.ioore(k);
              a[k] = t3;
              var less0 = less + 1;
              t3 = a.length;
              if (great < 0 || great >= t3) throw $.ioore(great);
              t5 = a[great];
              t6 = a.length;
              if (less < 0 || less >= t6) throw $.ioore(less);
              a[less] = t5;
              t5 = a.length;
              if (great < 0 || great >= t5) throw $.ioore(great);
              a[great] = t2;
              great = great0;
              less = less0;
              break;
            } else {
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              t3 = a[great];
              t4 = a.length;
              if (k < 0 || k >= t4) throw $.ioore(k);
              a[k] = t3;
              t3 = a.length;
              if (great < 0 || great >= t3) throw $.ioore(great);
              a[great] = t2;
              great = great0;
              break;
            }
          }
        }
      }
    }
  } else {
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      t2 = a[k];
      if ($.ltB(compare.$call$2(t2, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t3 = a[less];
          t4 = a.length;
          if (k < 0 || k >= t4) throw $.ioore(k);
          a[k] = t3;
          t3 = a.length;
          if (less < 0 || less >= t3) throw $.ioore(less);
          a[less] = t2;
        }
        ++less;
      } else {
        if ($.gtB(compare.$call$2(t2, el4), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t1 = a.length;
            if (great < 0 || great >= t1) throw $.ioore(great);
            if ($.gtB(compare.$call$2(a[great], el4), 0)) {
              --great;
              if (great < k) break;
              continue;
            } else {
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              t1 = $.ltB(compare.$call$2(a[great], el2), 0);
              great0 = great - 1;
              if (t1) {
                if (less !== (less | 0)) throw $.iae(less);
                t1 = a.length;
                if (less < 0 || less >= t1) throw $.ioore(less);
                t3 = a[less];
                t4 = a.length;
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t3;
                less0 = less + 1;
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                t5 = a[great];
                t6 = a.length;
                if (less < 0 || less >= t6) throw $.ioore(less);
                a[less] = t5;
                t5 = a.length;
                if (great < 0 || great >= t5) throw $.ioore(great);
                a[great] = t2;
                great = great0;
                less = less0;
              } else {
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                t3 = a[great];
                t4 = a.length;
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t3;
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                a[great] = t2;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
  }
  t1 = less - 1;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  t2 = a.length;
  if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
  t3 = a[t1];
  t4 = a.length;
  if (left < 0 || left >= t4) throw $.ioore(left);
  a[left] = t3;
  t3 = a.length;
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  a[t1] = el2;
  t1 = great + 1;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  t5 = a.length;
  if (t1 < 0 || t1 >= t5) throw $.ioore(t1);
  t6 = a[t1];
  t7 = a.length;
  if (right < 0 || right >= t7) throw $.ioore(right);
  a[right] = t6;
  t6 = a.length;
  if (t1 < 0 || t1 >= t6) throw $.ioore(t1);
  a[t1] = el4;
  $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
  $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
  if (pivots_are_equal) return;
  if (less < index1 && great > index5) {
    while (true) {
      if (less !== (less | 0)) throw $.iae(less);
      t1 = a.length;
      if (less < 0 || less >= t1) throw $.ioore(less);
      if (!$.eqB(compare.$call$2(a[less], el2), 0)) break;
      ++less;
    }
    while (true) {
      if (great !== (great | 0)) throw $.iae(great);
      t1 = a.length;
      if (great < 0 || great >= t1) throw $.ioore(great);
      if (!$.eqB(compare.$call$2(a[great], el4), 0)) break;
      --great;
    }
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      t2 = a[k];
      if ($.eqB(compare.$call$2(t2, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t3 = a[less];
          t4 = a.length;
          if (k < 0 || k >= t4) throw $.ioore(k);
          a[k] = t3;
          t3 = a.length;
          if (less < 0 || less >= t3) throw $.ioore(less);
          a[less] = t2;
        }
        ++less;
      } else {
        if ($.eqB(compare.$call$2(t2, el4), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t1 = a.length;
            if (great < 0 || great >= t1) throw $.ioore(great);
            if ($.eqB(compare.$call$2(a[great], el4), 0)) {
              --great;
              if (great < k) break;
              continue;
            } else {
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              t1 = $.ltB(compare.$call$2(a[great], el2), 0);
              great0 = great - 1;
              if (t1) {
                if (less !== (less | 0)) throw $.iae(less);
                t1 = a.length;
                if (less < 0 || less >= t1) throw $.ioore(less);
                t3 = a[less];
                t4 = a.length;
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t3;
                less0 = less + 1;
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                t5 = a[great];
                t6 = a.length;
                if (less < 0 || less >= t6) throw $.ioore(less);
                a[less] = t5;
                t5 = a.length;
                if (great < 0 || great >= t5) throw $.ioore(great);
                a[great] = t2;
                great = great0;
                less = less0;
              } else {
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                t3 = a[great];
                t4 = a.length;
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t3;
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                a[great] = t2;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
    $.DualPivotQuicksort__doSort(a, less, great, compare);
  } else $.DualPivotQuicksort__doSort(a, less, great, compare);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.DistanceInput$ = function() {
  var t1 = $.DistanceProxy$();
  var t2 = $.DistanceProxy$();
  var t3 = $.Transform$();
  return new $.DistanceInput(false, $.Transform$(), t3, t2, t1);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.Vector_minToOut = function(a, b, out) {
  out.set$x($.ltB(a.get$x(), b.get$x()) ? a.get$x() : b.get$x());
  out.set$y($.ltB(a.get$y(), b.get$y()) ? a.get$y() : b.get$y());
};

$.ContactSolver$ = function() {
  var t1 = $.ListFactory_List(256);
  $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraint'}));
  var t2 = $.WorldManifold$();
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  var t13 = $.Vector$(0, 0);
  var t14 = $.PositionSolverManifold$();
  var t15 = $.Vector$(0, 0);
  t1 = new $.ContactSolver($.Vector$(0, 0), t15, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, null, t1);
  t1.ContactSolver$0();
  return t1;
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; j < tagNames.length; ++j) {
      t1 = tagNames.length;
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.BroadPhase$ = function() {
  var t1 = new $.BroadPhase(null, 0, 16, null, null, 0, $.DynamicTree$());
  t1.BroadPhase$0();
  return t1;
};

$.Expect__getMessage = function(reason) {
  return reason == null ? '' : ', \'' + $.S(reason) + '\'';
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.Settings_mixFriction = function(friction1, friction2) {
  return $.Math_sqrt($.mul(friction1, friction2));
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null) {
    if ($._Device_isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$.ContactConstraint$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraintPoint'}));
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Matrix22$(null, null);
  t1 = new $.ContactConstraint(null, 0, null, null, null, null, null, null, $.Matrix22$(null, null), t5, t4, t3, t2, t1);
  t1.ContactConstraint$0();
  return t1;
};

$.ContactImpulse$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'num'}));
  var t2 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t2, ({E: 'num'}));
  return new $.ContactImpulse(t2, t1);
};

$.neg = function(a) {
  if (typeof a === "number") return -a;
  return a.operator$negate$0();
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.Matrix22_mulMatrixAndVectorToOut = function(matrix, vector, out) {
  var tempy = $.add($.mul(matrix.get$col1().get$y(), vector.get$x()), $.mul(matrix.get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.mul(matrix.get$col1().get$x(), vector.get$x()), $.mul(matrix.get$col2().get$x(), vector.get$y())));
  out.set$y(tempy);
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.DynamicTreeNode$_construct = function() {
  return new $.DynamicTreeNode(null, null, null, null, null, null, $.AxisAlignedBox$(null, null));
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.ExpectException$ = function(message) {
  return new $.ExpectException(message);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) return receiver.filter$1(predicate);
  return $.Collections_filter(receiver, [], predicate);
};

$.Vector3$ = function(x, y, z) {
  return new $.Vector3(z, y, x);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.DefaultWorldPool$ = function() {
  var t1 = new $.DefaultWorldPool(null, null, null);
  t1.DefaultWorldPool$0();
  return t1;
};

$.CircleContact$ = function(argPool) {
  var t1 = $.Manifold$();
  var t2 = $.ContactEdge$();
  var t3 = $.ContactEdge$();
  return new $.CircleContact($.Manifold$(), argPool, null, t1, null, null, t3, t2, null, null, null);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  return name$;
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.CanvasViewportTransform$ = function(extents, center) {
  var t1 = $.Vector$copy(extents);
  return new $.CanvasViewportTransform(20, $.Vector$copy(center), t1);
};

$.TimeStep$ = function() {
  return new $.TimeStep(true, 0, 0, 0, 0, 0);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.TimeOfImpactSolverManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  return new $.TimeOfImpactSolverManifold($.Vector$(0, 0), t6, t5, t4, t3, 0, t2, t1);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
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
  var t10 = $.Vector$copy(def.get$localAnchorA());
  var t11 = $.Vector$copy(def.get$localAnchorB());
  var t12 = $.Vector$(0, 0);
  var t13 = def.get$maxForce();
  return new $.FrictionJoint(def.get$maxTorque(), t13, 0.0, t12, t11, t10, null, null, null, null, t7, t6, t5, t4, false, t3, t2, t9, t8, null, null, t1);
};

$.Settings_mixRestitution = function(restitution1, restitution2) {
  return $.gtB(restitution1, restitution2) ? restitution1 : restitution2;
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  }
  return receiver.isNegative$0();
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.Sweep$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  return new $.Sweep(0, 0, $.Vector$(0, 0), t2, t1);
};

$.MassData$ = function() {
  return new $.MassData(0, $.Vector$(0, 0), 0);
};

$.Matrix22_mulTransMatrixAndVectorToOut = function(matrix, vector, out) {
  var outx = $.add($.mul(vector.get$x(), matrix.get$col1().get$x()), $.mul(vector.get$y(), matrix.get$col1().get$y()));
  out.set$y($.add($.mul(vector.get$x(), matrix.get$col2().get$x()), $.mul(vector.get$y(), matrix.get$col2().get$y())));
  out.set$x(outx);
};

$.CanvasDraw$ = function(viewport, ctx) {
  var t1 = new $.CanvasDraw(ctx, viewport, 1);
  t1.CanvasDraw$2(viewport, ctx);
  return t1;
};

$.Matrix33$ = function() {
  var t1 = $.Vector3$(0, 0, 0);
  var t2 = $.Vector3$(0, 0, 0);
  return new $.Matrix33($.Vector3$(0, 0, 0), t2, t1);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.Vector3_crossToOut = function(a, b, out) {
  var tempy = $.sub($.mul(a.get$z(), b.get$x()), $.mul(a.get$x(), b.get$z()));
  var tempz = $.sub($.mul(a.get$x(), b.get$y()), $.mul(a.get$y(), b.get$x()));
  out.set$x($.sub($.mul(a.get$y(), b.get$z()), $.mul(a.get$z(), b.get$y())));
  out.set$y(tempy);
  out.set$z(tempz);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$.Collision_clipSegmentToLine = function(vOut, vIn, norm, offset) {
  var distance0 = $.sub($.Vector_dot(norm, $.index(vIn, 0).get$v()), offset);
  var distance1 = $.sub($.Vector_dot(norm, $.index(vIn, 1).get$v()), offset);
  if ($.leB(distance0, 0.0)) {
    $.index(vOut, 0).setFrom$1($.index(vIn, 0));
    var numOut = 1;
  } else numOut = 0;
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

$.ConstantVolumeJointDef$ = function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
  t1 = new $.ConstantVolumeJointDef(null, t1, 0.0, 0.0, false, null, null, null, 0);
  t1.ConstantVolumeJointDef$0();
  return t1;
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.Transform$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.Transform($.Matrix22$(null, null), t1);
};

$.setRange$4 = function(receiver, start, length$, from, startFrom) {
  if ($.isJsArray(receiver) !== true) return receiver.setRange$4(start, length$, from, startFrom);
  $.checkMutable(receiver, 'indexed set');
  if (length$ === 0) return;
  $.checkNull(start);
  $.checkNull(length$);
  $.checkNull(from);
  $.checkNull(startFrom);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!((typeof startFrom === 'number') && (startFrom === (startFrom | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(startFrom));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if ($.gtB(t1, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  $.Arrays_copy(from, startFrom, receiver, start, length$);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) return -1;
    if ($.gtB(a, b)) return 1;
    if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b))) return 0;
        if (aIsNegative === true) return -1;
        return 1;
      }
      return 0;
    }
    if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true) return 0;
      return 1;
    }
    return -1;
  }
  if (typeof a === 'string') {
    if (!(typeof b === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b) var t1 = 0;
    else {
      t1 = (a < b) ? -1 : 1;
    }
    return t1;
  }
  return a.compareTo$1(b);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b);
};

$.Manifold$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'ManifoldPoint'}));
  var t2 = $.Vector$(0, 0);
  t1 = new $.Manifold(0, null, $.Vector$(0, 0), t2, t1);
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
  var t13 = $.Vector$(0, 0);
  var t14 = def.get$frequencyHz();
  return new $.DistanceJoint(0.0, 0.0, def.get$dampingRatio(), t14, t12, null, 0.0, t13, t11, t10, null, null, null, null, t7, t6, t5, t4, false, t3, t2, t9, t8, null, null, t1);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.Filter$ = function() {
  return new $.Filter(0, 0, 0);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.TimeOfImpactConstraint$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  var t2 = $.Vector$(0, 0);
  t1 = new $.TimeOfImpactConstraint(null, null, 0, 0, 0, $.Vector$(0, 0), t2, t1);
  t1.TimeOfImpactConstraint$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.ConstantVolumeJoint$ = function(_world, def) {
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.JointEdge$();
  t1 = new $.ConstantVolumeJoint(null, null, null, _world, 0, null, null, null, null, null, null, null, null, null, t7, t6, t5, t4, false, t3, t2, $.JointEdge$(), t8, null, null, t1);
  t1.ConstantVolumeJoint$2(_world, def);
  return t1;
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
  return document.createElement(tag);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.BlobTest_main = function() {
  var blob = $.BlobTest$();
  blob.initialize$0();
  blob.initializeAnimation$0();
  blob.runAnimation$0();
};

$.main = function() {
  $.BlobTest_main();
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.ContactManager$ = function(argPool) {
  return new $.ContactManager(argPool, null, $.ContactFilter$(), 0, null, $.BroadPhase$());
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.Expect_equals = function(expected, actual, reason) {
  if ($.eqB(expected, actual)) return;
  var msg = $.Expect__getMessage(reason);
  $.Expect__fail('Expect.equals(expected: <' + $.S(expected) + '>, actual: <' + $.S(actual) + '>' + $.S(msg) + ') fails.');
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.ClipVertex$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.ClipVertex($.ContactID$(), t1);
};

$.SimplexCache$ = function() {
  var t1 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, ({E: 'int'}));
  t1 = new $.SimplexCache(t2, t1, 0, 0);
  t1.SimplexCache$0();
  return t1;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.toStringAsFixed = function(receiver, fractionDigits) {
  if (!(typeof receiver === 'number')) return receiver.toStringAsFixed$1(fractionDigits);
  $.checkNum(fractionDigits);
  var result = (receiver.toFixed(fractionDigits));
  if (receiver === 0 && $.isNegative(receiver) === true) return '-' + result;
  return result;
};

$.Vector$copy = function(other) {
  var t1 = other.get$x();
  return new $.Vector(other.get$y(), t1);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a <= b;
  return a.operator$le$1(b);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || (src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || ((dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number') return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart == null) srcStart = 0;
  if (typeof srcStart !== 'number') return $.Arrays_copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart == null) dstStart = 0;
  if (typeof dstStart !== 'number') return $.Arrays_copy$bailout(3, src, dst, count, srcStart, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.Collision$_construct = function(pool) {
  var t1 = $.DistanceInput$();
  var t2 = $.SimplexCache$();
  var t3 = $.DistanceOutput$();
  var t4 = $.EdgeResults$();
  var t5 = $.EdgeResults$();
  var t6 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t6, ({E: 'ClipVertex'}));
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  var t13 = $.Vector$(0, 0);
  var t14 = $.Vector$(0, 0);
  var t15 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t15, ({E: 'ClipVertex'}));
  var t16 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t16, ({E: 'ClipVertex'}));
  t2 = new $.Collision(t16, t15, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t1, t2, pool);
  t2.Collision$_construct$1(pool);
  return t2;
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ContactFilter$ = function() {
  return new $.ContactFilter();
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.Velocity$ = function() {
  var t1 = new $.Velocity(null, null);
  t1.Velocity$0();
  return t1;
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.TimeOfImpactSolver$ = function() {
  var t1 = $.ListFactory_List(4);
  $.setRuntimeTypeInfo(t1, ({E: 'TimeOfImpactConstraint'}));
  var t2 = $.TimeOfImpactSolverManifold$();
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  t1 = new $.TimeOfImpactSolver($.Vector$(0, 0), t5, t4, t3, t2, null, 0, t1);
  t1.TimeOfImpactSolver$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.Pair$ = function() {
  return new $.Pair(null, null);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.Distance$_construct = function() {
  var t1 = $.Simplex$();
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, ({E: 'int'}));
  var t3 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t3, ({E: 'int'}));
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  return new $.Distance($.Vector$(0, 0), t6, t5, t4, t3, t2, t1, 20, 0, 0);
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.getRange$2(start, length$);
  if (0 === length$) return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
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

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number') return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number') throw $.iae(length$);
  var end = start + length$;
  if (end > a.length) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.ManifoldPoint$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.ManifoldPoint($.ContactID$(), 0, 0, t1);
};

$.BlobTest$ = function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
  t1 = new $.BlobTest(null, null, null, null, null, null, null, t1);
  t1.Demo$0();
  return t1;
};

$.TimeOfImpactInput$ = function() {
  var t1 = $.DistanceProxy$();
  var t2 = $.DistanceProxy$();
  var t3 = $.Sweep$();
  return new $.TimeOfImpactInput(0, $.Sweep$(), t3, t2, t1);
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
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
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector3$(0, 0, 0);
  t1 = new $.RevoluteJoint(null, null, null, null, null, null, null, null, null, $.Matrix33$(), 0, t12, t11, t10, null, null, null, null, t7, t6, t5, t4, false, t3, t2, t9, t8, null, null, t1);
  t1.RevoluteJoint$1(def);
  return t1;
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.DualPivotQuicksort_insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || ((a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())) return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  if (typeof left !== 'number') return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  if (typeof right !== 'number') return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  for (var i = left + 1; i <= right; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = a[i];
    var j = i;
    while (true) {
      if (j > left) {
        t1 = j - 1;
        if (t1 !== (t1 | 0)) throw $.iae(t1);
        var t3 = a.length;
        if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
        var t4 = $.gtB(compare.$call$2(a[t1], t2), 0);
        t1 = t4;
      } else t1 = false;
      if (!t1) break;
      t1 = j - 1;
      if (t1 !== (t1 | 0)) throw $.iae(t1);
      t3 = a.length;
      if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
      t1 = a[t1];
      if (j !== (j | 0)) throw $.iae(j);
      t4 = a.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      a[j] = t1;
      --j;
    }
    if (j !== (j | 0)) throw $.iae(j);
    t1 = a.length;
    if (j < 0 || j >= t1) throw $.ioore(j);
    a[j] = t2;
  }
};

$.MathBox_translateAndScale = function(val, fromMin, fromMax, toMin, toMax) {
  return $.add(toMin, $.mul($.div($.sub(val, fromMin), $.sub(fromMax, fromMin)), $.sub(toMax, toMin)));
};

$.PolygonContact$ = function(argPool) {
  var t1 = $.Manifold$();
  var t2 = $.ContactEdge$();
  var t3 = $.ContactEdge$();
  return new $.PolygonContact($.Manifold$(), argPool, null, t1, null, null, t3, t2, null, null, null);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.WorldQueryWrapper$ = function() {
  return new $.WorldQueryWrapper(null, null);
};

$.Vector_crossNumAndVectorToOut = function(s, a, out) {
  var tempY = $.mul(s, a.get$x());
  out.set$x($.mul($.neg(s), a.get$y()));
  out.set$y(tempY);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.Features$ = function() {
  return new $.Features(0, 0, 0, 0);
};

$.Color3$ = function() {
  return new $.Color3(0, 0, 0);
};

$.ContactEdge$ = function() {
  return new $.ContactEdge(null, null, null, null);
};

$.CircleShape$ = function() {
  return new $.CircleShape($.Vector$(0, 0), 0, 0);
};

$._globalState = function() {
  return $globalState;;
};

$.AxisAlignedBox$ = function(lowerBound, upperBound) {
  var t1 = new $.AxisAlignedBox(upperBound, lowerBound);
  t1.AxisAlignedBox$2(lowerBound, upperBound);
  return t1;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.Island$ = function() {
  var t1 = $.ContactSolver$();
  var t2 = $.Vector$(0, 0);
  return new $.Island($.ContactImpulse$(), t2, t1, null, null, null, null, null, null, null, null, null, null, null, null, null);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = t2;
    }
  }
  return array;
};

$.DynamicTree$ = function() {
  var t1 = $.ListFactory_List(4);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  var t2 = $.Vector$(0, 0);
  var t3 = $.AxisAlignedBox$(null, null);
  var t4 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t4, ({E: 'DynamicTreeNode'}));
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  t4 = new $.DynamicTree($.Vector$(0, 0), t6, t5, t3, t2, 0, t1, t4, 0, 0, null, 0, null);
  t4.DynamicTree$0();
  return t4;
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

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.ContactConstraintPoint$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  return new $.ContactConstraintPoint(0, 0, 0, 0, 0, $.Vector$(0, 0), t2, t1);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.ContactRegister$ = function() {
  return new $.ContactRegister(false, null);
};

$.MathBox_clamp = function(a, low, high) {
  return $.Math_max(low, $.Math_min(a, high));
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC5)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$.MathBox_distance = function(v1, v2) {
  return $.Math_sqrt($.MathBox_distanceSquared(v1, v2));
};

$.DistanceJointDef$ = function() {
  var t1 = $.Vector$(0.0, 0.0);
  t1 = new $.DistanceJointDef(0.0, 0.0, 1.0, $.Vector$(0.0, 0.0), t1, false, null, null, null, 0);
  t1.DistanceJointDef$0();
  return t1;
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.Matrix22$ = function(c1, c2) {
  var t1 = new $.Matrix22(null, null);
  t1.Matrix22$2(c1, c2);
  return t1;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$.PositionSolverManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  return new $.PositionSolverManifold($.Vector$(0, 0), t6, t5, t4, t3, 0, t2, t1);
};

$.DistanceProxy$ = function() {
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  t1 = new $.DistanceProxy(0, 0, t1);
  t1.DistanceProxy$0();
  return t1;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.Math_min = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b) return b;
      if (a < b) return a;
      if (typeof b === 'number') {
        if (typeof a === 'number') {
          if (a === 0.0) return (a + b) * a * b;
        }
        if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true) return b;
        return a;
      }
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.Fixture$ = function() {
  var t1 = $.AxisAlignedBox$(null, null);
  var t2 = $.Filter$();
  var t3 = $.AxisAlignedBox$(null, null);
  return new $.Fixture($.AxisAlignedBox$(null, null), t3, null, null, t2, null, null, null, null, null, null, null, t1);
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC3) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  if ($.contains$1(userAgent, 'Opera') === true) return $.typeNameInOpera;
  return $.constructorNameFallback;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.sort = function(receiver, compare) {
  if ($.isJsArray(receiver) !== true) return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.DualPivotQuicksort_sort(receiver, compare);
};

$.DualPivotQuicksort_sort = function(a, compare) {
  $.DualPivotQuicksort__doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$.ContactID$ = function() {
  return new $.ContactID($.Features$());
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.World$ = function(gravity, doSleep, argPool) {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'List<ContactRegister>'}));
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.TimeStep$();
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  var t7 = $.WorldQueryWrapper$();
  var t8 = $.TimeOfImpactInput$();
  var t9 = $.TimeOfImpactOutput$();
  var t10 = $.Sweep$();
  var t11 = $.TimeOfImpactSolver$();
  var t12 = $.ListFactory_List(32);
  $.setRuntimeTypeInfo(t12, ({E: 'Contact'}));
  var t13 = $.Island$();
  var t14 = $.ListFactory_List(10);
  $.setRuntimeTypeInfo(t14, ({E: 'Body'}));
  t1 = new $.World(t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, t1, true, true, 0, argPool, null, null, null, doSleep, gravity, 0, 0, null, null, null, 4);
  t1.World$3(gravity, doSleep, argPool);
  return t1;
};

$.DistanceOutput$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.DistanceOutput(null, null, $.Vector$(0, 0), t1);
};

$.Math_sin = function(x) {
  return $.MathNatives_sin(x);
};

$.DualPivotQuicksort__doSort = function(a, left, right, compare) {
  if ($.leB($.sub(right, left), 32)) $.DualPivotQuicksort_insertionSort_(a, left, right, compare);
  else $.DualPivotQuicksort__dualPivotQuicksort(a, left, right, compare);
};

$.MathNatives_sin = function(value) {
  return Math.sin($.checkNum(value));
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.PolygonShape$ = function() {
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  var t2 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t2, ({E: 'Vector'}));
  t1 = new $.PolygonShape(0, t2, t1, $.Vector$(0, 0), 0.01, 1);
  t1.PolygonShape$0();
  return t1;
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.PolygonShape$copy = function(other) {
  var t1 = other.get$radius();
  var t2 = other.get$vertexCount();
  var t3 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t3, ({E: 'Vector'}));
  var t4 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t4, ({E: 'Vector'}));
  t1 = new $.PolygonShape(t2, t4, t3, $.Vector$copy(other.get$centroid()), t1, 1);
  t1.PolygonShape$copy$1(other);
  return t1;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.Position$ = function() {
  var t1 = new $.Position(null, null);
  t1.Position$0();
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a / b;
  return a.operator$div$1(b);
};

$.FixtureDef$ = function() {
  var t1 = new $.FixtureDef($.Filter$(), false, 0, 0, 0.2, null, null);
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
  var t4 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t4, ({E: 'SimplexVertex'}));
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  t1 = new $.Simplex($.Vector$(0, 0), t10, t9, t8, t6, t7, t5, 0, t4, t3, t2, t1);
  t1.Simplex$0();
  return t1;
};

$.BodyDef$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.BodyDef(true, true, 0, 0, true, false, null, false, 0, $.Vector$(0, 0), t1, null, 0, 0);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.Expect__fail = function(message) {
  throw $.captureStackTrace($.ExpectException$(message));
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.SimplexVertex$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  return new $.SimplexVertex(0, 0, 0, $.Vector$(0, 0), t2, t1);
};

$.Vector_dot = function(one, two) {
  return $.add($.mul(one.get$x(), two.get$x()), $.mul(one.get$y(), two.get$y()));
};

$.Vector3_dot = function(a, b) {
  return $.add($.add($.mul(a.get$x(), b.get$x()), $.mul(a.get$y(), b.get$y())), $.mul(a.get$z(), b.get$z()));
};

$.document = function() {
  return document;;
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || ($.eqB(type, 'called_non_callable') || ($.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')))) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || ($.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.Math_cos = function(x) {
  return $.MathNatives_cos(x);
};

$.MathNatives_cos = function(value) {
  return Math.cos($.checkNum(value));
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.Transform_mulToOut = function(transform, vector, out) {
  var tempY = $.add($.add(transform.get$position().get$y(), $.mul(transform.get$rotation().get$col1().get$y(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.add(transform.get$position().get$x(), $.mul(transform.get$rotation().get$col1().get$x(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$x(), vector.get$y())));
  out.set$y(tempY);
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.DualPivotQuicksort__dualPivotQuicksort$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var a = env0;
      var left = env1;
      var right = env2;
      var compare = env3;
      break;
    case 2:
      a = env0;
      left = env1;
      right = env2;
      compare = env3;
      index5 = env4;
      el2 = env5;
      less = env6;
      el4 = env7;
      index1 = env8;
      break;
    case 3:
      a = env0;
      left = env1;
      right = env2;
      compare = env3;
      index5 = env4;
      el2 = env5;
      great = env6;
      less = env7;
      el4 = env8;
      index1 = env9;
      break;
    case 4:
      a = env0;
      less = env1;
      k = env2;
      compare = env3;
      left = env4;
      right = env5;
      great = env6;
      index1 = env7;
      index5 = env8;
      el2 = env9;
      t1 = env10;
      ak = env11;
      comp = env12;
      el4 = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
      var index1 = $.add(left, sixth);
      var index5 = $.sub(right, sixth);
      var index3 = $.tdiv($.add(left, right), 2);
      var index2 = $.sub(index3, sixth);
      var index4 = $.add(index3, sixth);
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      if ($.gtB(compare.$call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el5), 0)) {
        t0 = el2;
        el2 = el5;
        el5 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      $.indexSet(a, index1, el1);
      $.indexSet(a, index3, el3);
      $.indexSet(a, index5, el5);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = $.add(left, 1);
    case 2:
      state = 0;
      var great = $.sub(right, 1);
    case 3:
      state = 0;
      var t1 = $.eq(compare.$call$2(el2, el4), 0) === true;
    case 4:
      if (state == 4 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            var k = less;
          case 4:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!$.leB(k, great)) break L0;
                case 4:
                  c$0:{
                    switch (state) {
                      case 0:
                        var ak = $.index(a, k);
                        var comp = compare.$call$2(ak, el2);
                      case 4:
                        state = 0;
                        if ($.eqB(comp, 0)) break c$0;
                        if ($.ltB(comp, 0)) {
                          if (!$.eqB(k, less)) {
                            $.indexSet(a, k, $.index(a, less));
                            $.indexSet(a, less, ak);
                          }
                          less = $.add(less, 1);
                        } else {
                          for (; true; ) {
                            comp = compare.$call$2($.index(a, great), el2);
                            if ($.gtB(comp, 0)) {
                              great = $.sub(great, 1);
                              continue;
                            } else {
                              if ($.ltB(comp, 0)) {
                                $.indexSet(a, k, $.index(a, less));
                                var less0 = $.add(less, 1);
                                $.indexSet(a, less, $.index(a, great));
                                var great0 = $.sub(great, 1);
                                $.indexSet(a, great, ak);
                                great = great0;
                                less = less0;
                                break;
                              } else {
                                $.indexSet(a, k, $.index(a, great));
                                great0 = $.sub(great, 1);
                                $.indexSet(a, great, ak);
                                great = great0;
                                break;
                              }
                            }
                          }
                        }
                    }
                  }
                  k = $.add(k, 1);
              }
            }
        }
      } else {
        for (k = less; $.leB(k, great); k = $.add(k, 1)) {
          ak = $.index(a, k);
          if ($.ltB(compare.$call$2(ak, el2), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.add(less, 1);
          } else {
            if ($.gtB(compare.$call$2(ak, el4), 0)) {
              for (; true; ) {
                if ($.gtB(compare.$call$2($.index(a, great), el4), 0)) {
                  great = $.sub(great, 1);
                  if ($.ltB(great, k)) break;
                  continue;
                } else {
                  if ($.ltB(compare.$call$2($.index(a, great), el2), 0)) {
                    $.indexSet(a, k, $.index(a, less));
                    less0 = $.add(less, 1);
                    $.indexSet(a, less, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                    less = less0;
                  } else {
                    $.indexSet(a, k, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                  }
                  break;
                }
              }
            }
          }
        }
      }
      $.indexSet(a, left, $.index(a, $.sub(less, 1)));
      $.indexSet(a, $.sub(less, 1), el2);
      $.indexSet(a, right, $.index(a, $.add(great, 1)));
      $.indexSet(a, $.add(great, 1), el4);
      $.DualPivotQuicksort__doSort(a, left, $.sub(less, 2), compare);
      $.DualPivotQuicksort__doSort(a, $.add(great, 2), right, compare);
      if (t1) return;
      if ($.ltB(less, index1) && $.gtB(great, index5)) {
        for (; $.eqB(compare.$call$2($.index(a, less), el2), 0); ) {
          less = $.add(less, 1);
        }
        for (; $.eqB(compare.$call$2($.index(a, great), el4), 0); ) {
          great = $.sub(great, 1);
        }
        for (k = less; $.leB(k, great); k = $.add(k, 1)) {
          ak = $.index(a, k);
          if ($.eqB(compare.$call$2(ak, el2), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.add(less, 1);
          } else {
            if ($.eqB(compare.$call$2(ak, el4), 0)) {
              for (; true; ) {
                if ($.eqB(compare.$call$2($.index(a, great), el4), 0)) {
                  great = $.sub(great, 1);
                  if ($.ltB(great, k)) break;
                  continue;
                } else {
                  if ($.ltB(compare.$call$2($.index(a, great), el2), 0)) {
                    $.indexSet(a, k, $.index(a, less));
                    less0 = $.add(less, 1);
                    $.indexSet(a, less, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                    less = less0;
                  } else {
                    $.indexSet(a, k, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                  }
                  break;
                }
              }
            }
          }
        }
        $.DualPivotQuicksort__doSort(a, less, great, compare);
      } else $.DualPivotQuicksort__doSort(a, less, great, compare);
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
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
      t2 = env2;
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
      t2 = env2;
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
      t2 = env2;
      t1 = env3;
      break;
    case 7:
      b = env0;
      t1 = env1;
      break;
    case 8:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = b.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t2 = a.get$upperBound().get$x();
    case 2:
      state = 0;
    case 3:
    case 4:
      if (state == 3 || state == 4 || (state == 0 && !$.gtB(t1, t2))) {
        switch (state) {
          case 0:
            t1 = b.get$lowerBound().get$y();
          case 3:
            state = 0;
            t2 = a.get$upperBound().get$y();
          case 4:
            state = 0;
            t2 = $.gtB(t1, t2);
            t1 = t2;
        }
      } else {
        t1 = true;
      }
    case 5:
    case 6:
    case 7:
    case 8:
      if (state == 5 || state == 6 || state == 7 || state == 8 || (state == 0 && !t1)) {
        switch (state) {
          case 0:
            t1 = a.get$lowerBound().get$x();
          case 5:
            state = 0;
            t2 = b.get$upperBound().get$x();
          case 6:
            state = 0;
          case 7:
          case 8:
            if (state == 7 || state == 8 || (state == 0 && !$.gtB(t1, t2))) {
              switch (state) {
                case 0:
                  t1 = a.get$lowerBound().get$y();
                case 7:
                  state = 0;
                  t2 = b.get$upperBound().get$y();
                case 8:
                  state = 0;
                  t2 = $.gtB(t1, t2);
                  t1 = t2;
              }
            } else {
              t1 = true;
            }
        }
      } else {
        t1 = true;
      }
      return !t1;
  }
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
    case 1:
      state = 0;
      if (srcStart == null) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null) dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$.DualPivotQuicksort_insertionSort_$bailout = function(state, a, left, right, compare) {
  for (var i = $.add(left, 1); $.leB(i, right); i = $.add(i, 1)) {
    var el = $.index(a, i);
    var j = i;
    while (true) {
      if (!($.gtB(j, left) && $.gtB(compare.$call$2($.index(a, $.sub(j, 1)), el), 0))) break;
      $.indexSet(a, j, $.index(a, $.sub(j, 1)));
      j = $.sub(j, 1);
    }
    $.indexSet(a, j, el);
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    $.add$1(accumulator, $.index(a, i));
  }
  return accumulator;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.$call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC5 = new Isolate.$isolateProperties.Object();
$.CTC4 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC3 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC2 = new Isolate.$isolateProperties.EmptyQueueException();
$.TimeOfImpact_toiCalls = null;
$.TimeOfImpact_toiRootIters = null;
$.TimeOfImpact_toiMaxIters = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
$.TimeOfImpact_toiMaxRootIters = null;
$.TimeOfImpact_toiIters = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
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
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('HTMLAnchorElement', ["type=", "shape="], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLAreaElement', ["shape="], {
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type="], {
});

$.$defineNativeClass('WebKitCSSMatrix', ["a="], {
 toString$0: function() {
  return this.toString();
 },
 scale$3: function(scaleX, scaleY, scaleZ) {
  return this.scale(scaleX,scaleY,scaleZ);
 },
 get$scale: function() { return new $.BoundClosure1(this, 'scale$3'); }
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$position: function() {
  return this.getPropertyValue$1('position');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 set$font: function(value) {
  this.setProperty$3('font', value, '');
 },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width!", "height!"], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["font!"], {
 stroke$0: function() {
  return this.stroke();
 },
 setStrokeColor$5: function(c_OR_color_OR_grayLevel_OR_r, alpha_OR_g_OR_m, b_OR_y, a_OR_k, a) {
  return this.setStrokeColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k,a);
 },
 setStrokeColor$4: function(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k) {
  return this.setStrokeColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k);
},
 setFillColor$5: function(c_OR_color_OR_grayLevel_OR_r, alpha_OR_g_OR_m, b_OR_y, a_OR_k, a) {
  return this.setFillColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k,a);
 },
 setFillColor$1: function(c_OR_color_OR_grayLevel_OR_r) {
  return this.setFillColor(c_OR_color_OR_grayLevel_OR_r);
},
 setFillColor$4: function(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k) {
  return this.setFillColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k);
},
 scale$2: function(sx, sy) {
  return this.scale(sx,sy);
 },
 get$scale: function() { return new $.BoundClosure2(this, 'scale$2'); },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
 },
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
 fill$0: function() {
  return this.fill();
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 },
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return this.arc(x,y,radius,startAngle,endAngle,anticlockwise);
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.count$0 = function() {
  return this.count();
 };
_ConsoleImpl.get$count = function() { return new $.BoundClosure0(this, 'count$0'); };
$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.$call$0(); }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
});

$.$defineNativeClass('DocumentFragment', [], {
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 }
});

$.$defineNativeClass('Element', ["id?"], {
});

$.$defineNativeClass('HTMLEmbedElement', ["width!", "type=", "height!"], {
});

$.$defineNativeClass('Entry', [], {
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
 },
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 },
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["position?", "length?"], {
});

$.$defineNativeClass('FileWriterSync', ["position?", "length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('HTMLHRElement', ["width!"], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["state?", "length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
 update$1: function(value) {
  return this.update(value);
 },
 advance$1: function(count) {
  return this.advance(count);
 }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', [], {
 count$1: function(key_OR_range) {
  return this.count(key_OR_range);
 },
 get$count: function() { return new $.BoundClosure3(this, 'count$1'); }
});

$.$defineNativeClass('IDBObjectStore', [], {
 count$1: function(key_OR_range) {
  return this.count(key_OR_range);
 },
 get$count: function() { return new $.BoundClosure4(this, 'count$1'); },
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width!", "height!"], {
});

$.$defineNativeClass('HTMLInputElement', ["width!", "value=", "type=", "pattern?", "height!"], {
 step$1: function(arg0) { return this.step.$call$1(arg0); },
 step$3: function(arg0, arg1, arg2) { return this.step.$call$3(arg0, arg1, arg2); }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?"], {
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type="], {
});

$.$defineNativeClass('HTMLLinkElement', ["type="], {
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width!", "height!"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', ["enabled?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 add$1: function(track) {
  return this.add(track);
 }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 remove$0: function() {
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
 }
});

$.$defineNativeClass('NodeIterator', ["filter?"], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
});

$.$defineNativeClass('HTMLOListElement', ["type="], {
});

$.$defineNativeClass('HTMLObjectElement', ["width!", "type=", "height!"], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('Oscillator', ["type="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "type?"], {
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type="], {
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('PopStateEvent', ["state?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width!"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value=", "position?"], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "type?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "scale?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["z?", "y?", "x?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["z?", "y?", "x?"], {
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "type?"], {
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGMatrix', ["a="], {
 scale$1: function(scaleFactor) {
  return this.scale(scaleFactor);
 },
 get$scale: function() { return new $.BoundClosure(this, 'scale$1'); }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y=", "x=", "angle="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y=", "x=", "angle="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', ["points?"], {
});

$.$defineNativeClass('SVGPolylineElement', ["points?"], {
});

$.$defineNativeClass('SVGRect', ["y=", "x=", "width!", "height!"], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGScriptElement', ["type="], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type="], {
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGTransform', ["type?", "angle?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["type="], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "type?", "length="], {
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type="], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type="], {
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLTableColElement', ["width!"], {
});

$.$defineNativeClass('HTMLTableElement', ["width!"], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "type?"], {
});

$.$defineNativeClass('TextTrackCue', ["text!", "position?", "id?"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('TreeWalker', ["filter?"], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', ["type="], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width!", "height!"], {
});

$.$defineNativeClass('WebGLActiveInfo', ["type?"], {
});

$.$defineNativeClass('DOMWindow', ["parent?", "navigator?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 _ensureRequestAnimationFrame$0: function() {
     if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }
;
 },
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
 },
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', ["position?"], {
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XPathExpression', [], {
 evaluate$3: function(contextNode, type, inResult) {
  return this.evaluate(contextNode,type,inResult);
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 215 dynamic classes.
// 358 classes
// 30 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v2/*class(_SVGElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGComponentTransferFunctionElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGComponentTransferFunctionElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v3/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v4/*class(_ElementImpl)*/ = [v2/*class(_SVGElementImpl)*/,v2/*class(_SVGElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v5/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v6/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v7/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v7/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v6/*class(_DocumentImpl)*/],
    ['DocumentFragment', v5/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v1/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGElement', v2/*class(_SVGElementImpl)*/],
    ['Element', v4/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['MouseEvent', v3/*class(_MouseEventImpl)*/],
    ['Event', [v3/*class(_MouseEventImpl)*/,v3/*class(_MouseEventImpl)*/,v3/*class(_MouseEventImpl)*/,v3/*class(_MouseEventImpl)*/,'Event|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['Node', [v4/*class(_ElementImpl)*/,v5/*class(_DocumentFragmentImpl)*/,v6/*class(_DocumentImpl)*/,v7/*class(_CharacterDataImpl)*/,v4/*class(_ElementImpl)*/,v5/*class(_DocumentFragmentImpl)*/,v6/*class(_DocumentImpl)*/,v7/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
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
