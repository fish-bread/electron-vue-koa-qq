/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$f = Object.prototype.hasOwnProperty;
const hasOwn$2 = (val, key) => hasOwnProperty$f.call(val, key);
const isArray$h = Array.isArray;
const isMap$3 = (val) => toTypeString(val) === "[object Map]";
const isSet$3 = (val) => toTypeString(val) === "[object Set]";
const isFunction$4 = (val) => typeof val === "function";
const isString$2 = (val) => typeof val === "string";
const isSymbol$5 = (val) => typeof val === "symbol";
const isObject$9 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$9(val) || isFunction$4(val)) && isFunction$4(val.then) && isFunction$4(val.catch);
};
const objectToString$3 = Object.prototype.toString;
const toTypeString = (value) => objectToString$3.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$h(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$2(value) || isObject$9(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$2(value)) {
    res = value;
  } else if (isArray$h(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$9(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString$2(val) ? val : val == null ? "" : isArray$h(val) || isObject$9(val) && (val.toString === objectToString$3 || !isFunction$4(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap$3(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet$3(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol$5(val)) {
    return stringifySymbol(val);
  } else if (isObject$9(val) && !isArray$h(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol$5(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= ~64;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= ~2;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= ~1;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= ~8;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= ~8;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= ~16;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  const dep = computed2.dep;
  computed2.flags |= 2;
  if (dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) {
    computed2.flags &= ~2;
    return;
  }
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= ~2;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= ~4;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type2, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type2, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type2 === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$h(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol$5(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type2) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap$3(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap$3(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap$3(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$h(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply$2(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply$2(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply$2(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply$2(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply$2(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply$2(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply$2(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply$2(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply$2(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto$1 = Array.prototype;
function apply$2(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto$1[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol$5)
);
function hasOwnProperty$e(key) {
  if (!isSymbol$5(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$h(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$e;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol$5(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$9(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$h(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$h(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$2(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn$2(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol$5(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$h(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto$2 = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap$3(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type2) {
  return function(...args) {
    return type2 === "delete" ? false : type2 === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has: has2 } = getProto$2(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend$1(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto$2(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has: has2, get: get2 } = getProto$2(target);
        let hadKey = has2.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has2.call(target, key);
        }
        const oldValue = get2.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has: has2, get: get2 } = getProto$2(target);
        let hadKey = has2.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has2.call(target, key);
        }
        get2 ? get2.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$2(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$9(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn$2(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$9(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$9(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref$1(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction$4(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$h(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction$4(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction$4(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
          oldValue = newValue;
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject$9(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$h(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet$3(value) || isMap$3(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close2 = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close2] : [open + close2];
}
function formatProps(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$2(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$4(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type2, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type2);
  }
}
function callWithAsyncErrorHandling(fn, instance, type2, args) {
  if (isFunction$4(fn)) {
    const res = callWithErrorHandling(fn, instance, type2, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type2);
      });
    }
    return res;
  }
  if (isArray$h(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type2, args));
    }
    return values;
  }
}
function handleError(err, instance, type2, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type2}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type2, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type2, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex$1(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex$1(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$h(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= ~1;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= ~1;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= ~1;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= ~1;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= ~1;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction$4(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type2) => type2.__isTeleport;
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$4(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend$1({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$h(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$h(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
    return hasOwn$2(rawSetupState, key);
  };
  if (oldRef != null && oldRef !== ref3) {
    if (isString$2(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$4(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString$2(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray$h(existing) && remove(existing, refValue);
          } else {
            if (!isArray$h(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          ref3.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type2, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type2, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type2, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type2, target, keepAliveRoot) {
  const injected = injectHook(
    type2,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type2], injected);
  }, target);
}
function injectHook(type2, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type2] || (target[type2] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type2, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveAsset(type2, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type2] || Component[type2], name) || // global registration
      resolve(instance.appContext[type2], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray$h(source);
  if (sourceIsArray || isString$2(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject$9(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys2 = Object.keys(source);
      ret = new Array(keys2.length);
      for (let i = 0, l = keys2.length; i < l; i++) {
        const key = keys2[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$2(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type: type2, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$2(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$2(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type2.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$2(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn$2(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$2(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$2(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$2(normalizedProps, key) || hasOwn$2(ctx, key) || hasOwn$2(publicPropertiesMap, key) || hasOwn$2(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$2(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$h(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$4(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$9(data)) ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$4(opt) ? opt.bind(publicThis, publicThis) : isFunction$4(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction$4(opt) && isFunction$4(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$4(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$h(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$h(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$h(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$9(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type2) {
  callWithAsyncErrorHandling(
    isArray$h(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type2
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction$4(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction$4(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject$9(raw)) {
    if (isArray$h(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$4(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$4(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base2 = instance.type;
  const { mixins, extends: extendsOptions } = base2;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base2);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base2;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base2, optionMergeStrategies);
  }
  if (isObject$9(base2)) {
    cache.set(base2, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(
      isFunction$4(to) ? to.call(this, this) : to,
      isFunction$4(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$h(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$h(to) && isArray$h(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend$1(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$4(rootComponent)) {
      rootComponent = extend$1({}, rootComponent);
    }
    if (rootProps != null && !isObject$9(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction$4(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction$4(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app2._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app2._instance,
            16
          );
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app2;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app2;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$4(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$2(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$2(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$2(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$2(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$2(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn$2(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$2(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$4(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$4(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props);
      if (keys2) needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$9(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$h(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$h(opt) || isFunction$4(opt) ? { type: opt } : extend$1({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$h(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type2 = propType[index];
            const typeName = isFunction$4(type2) && type2.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction$4(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn$2(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$9(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$h(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction$4(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || key !== "_") {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type2 = children._;
    if (type2) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type2, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type2 = children._;
    if (type2) {
      if (optimized && type2 === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type: type2, ref: ref3, shapeFlag } = n2;
    switch (type2) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type2.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type2.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root: root2, type: type2 } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode && type2.__asyncHydrate) {
            type2.__asyncHydrate(
              el,
              instance,
              hydrateSubTree
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (root2.ce) {
            root2.ce._injectChildStyle(type2);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type: type2, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type2.move(vnode, container, anchor, internals);
      return;
    }
    if (type2 === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type2 === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type: type2,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode, true);
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type2 !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type2 === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type: type2, el, anchor, transition } = vnode;
    if (type2 === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type2 === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function resolveChildrenNamespace({ type: type2, props }, currentNamespace) {
  return currentNamespace === "svg" && type2 === "foreignObject" || currentNamespace === "mathml" && type2 === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= ~32;
    job.flags &= ~4;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$h(ch1) && isArray$h(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend$1({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type2, args) => callWithAsyncErrorHandling(fn, instance, type2, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$4(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$4(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$9(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$h(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$9(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$2(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$2(options, hyphenate(key)) || hasOwn$2(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root2 = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root2;
    if (keys2.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys2.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root2 = cloneVNode(root2, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root2 = cloneVNode(root2, null, false, true);
    root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root2, vnode.transition);
  }
  {
    result = root2;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root2 = parent.subTree;
    if (root2.suspense && root2.suspense.activeBranch === vnode) {
      root2.el = vnode.el;
    }
    if (root2 === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const isSuspense = (type2) => type2.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$h(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type2, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type2,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type2, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type2,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString$2(ref3) || isRef(ref3) || isFunction$4(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type2, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type2 === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type: type2,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type2.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$2(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type2, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type2 || type2 === NULL_DYNAMIC_COMPONENT) {
    type2 = Comment;
  }
  if (isVNode(type2)) {
    const cloned = cloneVNode(
      type2,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type2)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type2)) {
    type2 = type2.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$2(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$9(style)) {
      if (isProxy(style) && !isArray$h(style)) {
        style = extend$1({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$2(type2) ? 1 : isSuspense(type2) ? 128 : isTeleport(type2) ? 64 : isObject$9(type2) ? 4 : isFunction$4(type2) ? 2 : 0;
  return createBaseVNode(
    type2,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend$1({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$h(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$h(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type2 = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$h(children)) {
    type2 = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type2 = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$4(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type2 = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type2 = 16;
      children = [createTextVNode(children)];
    } else {
      type2 = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type2;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$h(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type2 = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type: type2,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type2, appContext),
    emitsOptions: normalizeEmitsOptions(type2, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type2.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$4(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$9(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend$1(
          extend$1(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction$4(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction$4(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h(type2, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$9(propsOrChildren) && !isArray$h(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type2, null, [propsOrChildren]);
      }
      return createVNode(type2, propsOrChildren);
    } else {
      return createVNode(type2, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type2, propsOrChildren, children);
  }
}
const version = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
const CSS_VAR_TEXT = Symbol("");
function useCssVars(getter) {
  const instance = getCurrentInstance();
  if (!instance) {
    return;
  }
  const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)
    ).forEach((node) => setVarsOnNode(node, vars));
  };
  const setVars = () => {
    const vars = getter(instance.proxy);
    if (instance.ce) {
      setVarsOnNode(instance.ce, vars);
    } else {
      setVarsOnVNode(instance.subTree, vars);
    }
    updateTeleports(vars);
  };
  onBeforeUpdate(() => {
    queuePostFlushCb(setVars);
  });
  onMounted(() => {
    watch(setVars, NOOP, { flush: "post" });
    const ob = new MutationObserver(setVars);
    ob.observe(instance.subTree.el.parentNode, { childList: true });
    onUnmounted(() => ob.disconnect());
  });
}
function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128) {
    const suspense = vnode.suspense;
    vnode = suspense.activeBranch;
    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  }
  while (vnode.component) {
    vnode = vnode.component.subTree;
  }
  if (vnode.shapeFlag & 1 && vnode.el) {
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === Fragment) {
    vnode.children.forEach((c) => setVarsOnVNode(c, vars));
  } else if (vnode.type === Static) {
    let { el, anchor } = vnode;
    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor) break;
      el = el.nextSibling;
    }
  }
}
function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    const style = el.style;
    let cssText = "";
    for (const key in vars) {
      style.setProperty(`--${key}`, vars[key]);
      cssText += `--${key}: ${vars[key]};`;
    }
    style[CSS_VAR_TEXT] = cssText;
  }
}
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$2(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString$2(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$h(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean2 ? "" : isSymbol$5(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type2 = typeof el[key];
    if (type2 === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type2 === "string") {
      value = "";
      needRemove = true;
    } else if (type2 === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$h(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString$2(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction$4(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString$2(value)) {
    return false;
  }
  return key in el;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$h(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = Symbol("_assign");
const vModelText = {
  created(el, { modifiers: { lazy, trim: trim2, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      let domValue = el.value;
      if (trim2) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el[assignKey](domValue);
    });
    if (trim2) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim: trim2, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim2 && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    return fn(event, ...args);
  });
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some(
      (k2) => k2 === eventKey || keyNames[k2] === eventKey
    )) {
      return fn(event);
    }
  });
};
const rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app2._component;
    if (!isFunction$4(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString$2(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
var isVue2 = false;
/*!
 * pinia v2.3.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref$1({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app2) {
      {
        pinia._a = app2;
        app2.provide(piniaSymbol, pinia);
        app2.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$h = {};
function _sfc_render(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(_component_router_view);
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render]]);
/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  obj.default && isRouteComponent(obj.default);
}
const assign$1 = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray$g(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const isArray$g = Array.isArray;
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode$1(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash: decode$1(hash)
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base2) {
  if (!base2 || !pathname.toLowerCase().startsWith(base2.toLowerCase()))
    return pathname;
  return pathname.slice(base2.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray$g(a) ? isEquivalentArray(a, b) : isArray$g(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray$g(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") {
    toSegments.push("");
  }
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base2) {
  if (!base2) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base2 = baseEl && baseEl.getAttribute("href") || "/";
      base2 = base2.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base2 = "/";
    }
  }
  if (base2[0] !== "/" && base2[0] !== "#")
    base2 = "/" + base2;
  return removeTrailingSlash(base2);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base2, location2) {
  return base2.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base2, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base2.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base2.slice(hashPos)) ? base2.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base2);
  return path + search + hash;
}
function useHistoryListeners(base2, historyState, currentLocation, replace2) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base2, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace2(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1)
        listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign$1({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener, {
    passive: true
  });
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base2) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base2, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace22) {
    const hashIndex = base2.indexOf("#");
    const url2 = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base2 : base2.slice(hashIndex)) + to : createBaseLocation() + base2 + to;
    try {
      history2[replace22 ? "replaceState" : "pushState"](state, "", url2);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace22 ? "replace" : "assign"](url2);
    }
  }
  function replace2(to, data) {
    const state = assign$1({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push2(to, data) {
    const currentState = assign$1(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    changeLocation(currentState.current, currentState, true);
    const state = assign$1({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push: push2,
    replace: replace2
  };
}
function createWebHistory(base2) {
  base2 = normalizeBase(base2);
  const historyNavigation = useHistoryStateNavigation(base2);
  const historyListeners = useHistoryListeners(base2, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign$1({
    // it's overridden right after
    location: "",
    base: base2,
    go,
    createHref: createHref.bind(null, base2)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base2) {
  base2 = location.host ? base2 || location.pathname + location.search : "";
  if (!base2.includes("#"))
    base2 += "#";
  return createWebHistory(base2);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type2, params) {
  {
    return assign$1(new Error(), {
      type: type2,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type2) {
  return error instanceof Error && NavigationFailureSymbol in error && (type2 == null || !!(error.type & type2));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign$1({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys2 = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys2.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict && !pattern.endsWith("/"))
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse2(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys2[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify3(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray$g(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray$g(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys: keys2,
    parse: parse2,
    stringify: stringify3
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign$1(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          normalizeRouteRecord(assign$1({}, mainNormalizedRecord, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            // we might be the child of an alias
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }))
        );
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) {
        insertMatcher(matcher);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign$1(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          matcher.keys.filter((k2) => !k2.optional).concat(matcher.parent ? matcher.parent.keys.filter((k2) => k2.optional) : []).map((k2) => k2.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k2) => k2.name))
      );
      path = matcher.stringify(params);
    } else if (location2.path != null) {
      path = location2.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign$1({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve: resolve2,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function paramsFromLocation(params, keys2) {
  const newParams = {};
  for (const key of keys2) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", {
    value: {}
  });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "object" ? props[name] : props;
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign$1(meta, record.meta), {});
}
function mergeOptions(defaults2, partialOptions) {
  const options = {};
  for (const key in defaults2) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
  }
  return options;
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    const sortOrder = comparePathParserScore(matcher, matchers[mid]);
    if (sortOrder < 0) {
      upper = mid;
    } else {
      lower = mid + 1;
    }
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) {
    if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) {
      return ancestor;
    }
  }
  return;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode$1(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode$1(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray$g(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray$g(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray$g(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function useLink(props) {
  const router2 = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref(props.to);
    return router2.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p2 = router2[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop$1);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
        document.startViewTransition(() => p2);
      }
      return p2;
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray$g(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref$1();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign$1({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode$1)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign$1({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign$1(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode$1(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      matcherLocation = assign$1({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign$1({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign$1({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign$1({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign$1({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign$1({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push2(to) {
    return pushWithRedirect(to);
  }
  function replace2(to) {
    return push2(assign$1(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      return assign$1({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace22 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign$1(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign$1({}, data, shouldRedirect.state) : data,
          force,
          replace: replace22
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          return pushWithRedirect(
            // keep options
            assign$1({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace22
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign$1({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace22, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app2 = installedApps.values().next().value;
    return app2 && typeof app2.runWithContext === "function" ? app2.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) {
        if (record.beforeEnter) {
          if (isArray$g(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace22, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace22 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign$1({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router2.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign$1(shouldRedirect, { replace: true, force: true }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            assign$1(locationAsObject(error.to), {
              force: true
            }),
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve22, reject) => {
      readyHandlers.add([resolve22, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve22, reject]) => err ? reject(err) : resolve22());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router2 = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push: push2,
    replace: replace2,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app2) {
      const router22 = this;
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router22;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push2(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true
        });
      }
      app2.provide(routerKey, router22);
      app2.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router2;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function bind$3(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString: toString$2 } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString$2.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type2) => {
  type2 = type2.toLowerCase();
  return (thing) => kindOf(thing) === type2;
};
const typeOfTest = (type2) => (thing) => typeof thing === type2;
const { isArray: isArray$f } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer$5(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$3(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString$1 = typeOfTest("string");
const isFunction$3 = typeOfTest("function");
const isNumber$1 = typeOfTest("number");
const isObject$8 = (thing) => thing !== null && typeof thing === "object";
const isBoolean$1 = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate$1 = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject$8(val) && isFunction$3(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$3(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$3(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray$f(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys2 = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys2.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys2[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys2 = Object.keys(obj);
  let i = keys2.length;
  let _key;
  while (i-- > 0) {
    _key = keys2[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge$1() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue2 = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge$1(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge$1({}, val);
    } else if (isArray$f(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue2);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$3(val)) {
      a[key] = bind$3(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter3, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter3 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter3 || filter3(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray$f(thing)) return thing;
  let i = thing.length;
  if (!isNumber$1(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray$3 = /* @__PURE__ */ ((TypedArray2) => {
  return (thing) => {
    return TypedArray2 && thing instanceof TypedArray2;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator2 = obj && obj[Symbol.iterator];
  const iterator2 = generator2.call(obj);
  let result;
  while ((result = iterator2.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer2(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty$d = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp$2 = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$3(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$3(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray$f(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$3(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack2 = new Array(10);
  const visit = (source, i) => {
    if (isObject$8(source)) {
      if (stack2.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack2[i] = source;
        const target = isArray$f(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack2[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject$8(thing) || isFunction$3(thing)) && isFunction$3(thing.then) && isFunction$3(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction$3(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const utils$4 = {
  isArray: isArray$f,
  isArrayBuffer,
  isBuffer: isBuffer$5,
  isFormData,
  isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber$1,
  isBoolean: isBoolean$1,
  isObject: isObject$8,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate: isDate$1,
  isFile,
  isBlob,
  isRegExp: isRegExp$2,
  isFunction: isFunction$3,
  isStream,
  isURLSearchParams,
  isTypedArray: isTypedArray$3,
  isFileList,
  forEach,
  merge: merge$1,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty: hasOwnProperty$d,
  hasOwnProp: hasOwnProperty$d,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$4.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$4.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$4.toFlatObject(error, axiosError, function filter3(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$4.isPlainObject(thing) || utils$4.isArray(thing);
}
function removeBrackets(key) {
  return utils$4.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$4.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$4.toFlatObject(utils$4, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils$4.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$4.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option2, source) {
    return !utils$4.isUndefined(source[option2]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$4.isSpecCompliantForm(formData);
  if (!utils$4.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$4.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils$4.isBlob(value)) {
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$4.isArrayBuffer(value) || utils$4.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$4.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$4.isArray(value) && isFlatArray(value) || (utils$4.isFileList(value) || utils$4.endsWith(key, "[]")) && (arr = utils$4.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$4.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack2 = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$4.isUndefined(value)) return;
    if (stack2.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack2.push(value);
    utils$4.forEach(value, function each(el, key) {
      const result = !(utils$4.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$4.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack2.pop();
  }
  if (!utils$4.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$2(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer2(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$2);
  } : encode$2;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode$1(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode$1;
  if (utils$4.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$4.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$4.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils$3,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$4.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$4.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject$1(arr) {
  const obj = {};
  const keys2 = Object.keys(arr);
  let i;
  const len = keys2.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys2[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$4.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$4.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$4.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$4.isArray(target[name])) {
      target[name] = arrayToObject$1(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$4.isFormData(formData) && utils$4.isFunction(formData.entries)) {
    const obj = {};
    utils$4.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$4.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$4.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (0, JSON.stringify)(rawValue);
}
const defaults$4 = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$4.isObject(data);
    if (isObjectPayload && utils$4.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$4.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$4.isArrayBuffer(data) || utils$4.isBuffer(data) || utils$4.isStream(data) || utils$4.isFile(data) || utils$4.isBlob(data) || utils$4.isReadableStream(data)) {
      return data;
    }
    if (utils$4.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$4.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$4.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults$4.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$4.isResponse(data) || utils$4.isReadableStream(data)) {
      return data;
    }
    if (data && utils$4.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$4.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults$4.headers[method] = {};
});
const ignoreDuplicateOf = utils$4.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$4.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter3, isHeaderNameFilter) {
  if (utils$4.isFunction(filter3)) {
    return filter3.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$4.isString(value)) return;
  if (utils$4.isString(filter3)) {
    return value.indexOf(filter3) !== -1;
  }
  if (utils$4.isRegExp(filter3)) {
    return filter3.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$4.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$4.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$4.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$4.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$4.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$4.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$4.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$4.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$4.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$4.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$4.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$4.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys2 = Object.keys(this);
    let i = keys2.length;
    let deleted = false;
    while (i--) {
      const key = keys2[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$4.forEach(this, (value, header) => {
      const key = utils$4.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$4.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$4.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed2 = new this(first);
    targets.forEach((target) => computed2.set(target));
    return computed2;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$4.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$4.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$4.freezeMethods(AxiosHeaders);
function transformData(fns, response) {
  const config = this || defaults$4;
  const context = response || config;
  const headers = AxiosHeaders.from(context.headers);
  let data = context.data;
  utils$4.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError(message, config, request) {
  AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$4.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});
function settle(resolve2, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve2(response);
  } else {
    reject(new AxiosError(
      "Request failed with status code " + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}
function speedometer(samplesCount, min2) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min2 = min2 !== void 0 ? min2 : 1e3;
  return function push2(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min2) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer2;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer2) {
      clearTimeout(timer2);
      timer2 = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer2) {
        timer2 = setTimeout(() => {
          timer2 = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$4.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url2) => {
  url2 = new URL(url2, platform.origin);
  return origin2.protocol === url2.protocol && origin2.host === url2.host && (isMSIE || origin2.port === url2.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$4.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$4.isString(path) && cookie.push("path=" + path);
      utils$4.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders ? { ...thing } : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$4.isPlainObject(target) && utils$4.isPlainObject(source)) {
      return utils$4.merge.call({ caseless }, target, source);
    } else if (utils$4.isPlainObject(source)) {
      return utils$4.merge({}, source);
    } else if (utils$4.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$4.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$4.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$4.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$4.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$4.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$4.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge3 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge3(config1[prop], config2[prop], prop);
    utils$4.isUndefined(configValue) && merge3 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$4.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type2, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type2 || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$4.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve2, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve2(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError2() {
      reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$4.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$4.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
      }
    };
    let timer2 = timeout && setTimeout(() => {
      timer2 = null;
      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer2 && clearTimeout(timer2);
        timer2 = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$4.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$4.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type2) => {
    !resolvers[type2] && (resolvers[type2] = utils$4.isFunction(res[type2]) ? (res2) => res2[type2]() : (_, config) => {
      throw new AxiosError(`Response type '${type2}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$4.isBlob(body)) {
    return body.size;
  }
  if (utils$4.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$4.isArrayBufferView(body) || utils$4.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$4.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$4.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$4.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url: url2,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url2, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$4.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$4.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url2, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$4.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$4.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve2, reject) => {
      settle(resolve2, reject, {
        data: responseData,
        headers: AxiosHeaders.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$4.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$4.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$4.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults$4.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION = "1.7.9";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type2, i) => {
  validators$1[type2] = function validator2(thing) {
    return typeof thing === type2 || "a" + (i < 1 ? "n " : " ") + type2;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys2 = Object.keys(options);
  let i = keys2.length;
  while (i-- > 0) {
    const opt = keys2[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack2 = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack2;
          } else if (stack2 && !String(err.stack).endsWith(stack2.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack2;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$4.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$4.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$4.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}
utils$4.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url2, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils$4.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve2) {
      resolvePromise = resolve2;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve2) => {
        token.subscribe(resolve2);
        _resolve = resolve2;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError(payload) {
  return utils$4.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  const instance = bind$3(Axios.prototype.request, context);
  utils$4.extend(instance, Axios.prototype, context, { allOwnKeys: true });
  utils$4.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults$4);
axios.Axios = Axios;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders;
axios.formToJSON = (thing) => formDataToJSON(utils$4.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode;
axios.default = axios;
const creatAxios = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5e3,
  headers: {
    "content-type": "application/json"
  }
});
const loginAxios = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5e3,
  headers: {
    "content-type": "application/json"
  }
});
const fileAxios = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5e3
});
fileAxios.interceptors.request.use(async (config) => {
  const token = await window.api.searchToken();
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
fileAxios.interceptors.response.use(async (response) => {
  const status = response.status;
  console.log("token代码", status);
  if (status === 200) {
    console.log("token有效");
  } else if (status === 401) {
    console.log("token无效");
    await window.api.sendLoginWindow();
  } else {
    console.log("其他报错");
  }
  return response;
});
creatAxios.interceptors.request.use(async (config) => {
  user_token.value = await window.api.searchToken();
  console.log("请求token", user_token.value);
  config.headers["Authorization"] = `Bearer ${user_token.value}`;
  return config;
});
creatAxios.interceptors.response.use(async (response) => {
  const status = response.status;
  console.log("token代码", status);
  if (status === 200) {
    console.log("token有效");
  } else if (status === 401) {
    console.log("token无效");
    await window.api.sendLoginWindow();
  } else {
    console.log("其他报错");
  }
  return response;
});
const loadImage = async (imageUrl) => {
  try {
    const localPath = await window.api.getLocalImagePath(imageUrl);
    if (localPath && localPath !== imageUrl) {
      console.log("localPath", localPath);
      if (false) ;
      return `file://${localPath.replace(/\\/g, "/")}`;
    }
    return imageUrl;
  } catch (error) {
    console.error("加载图片失败:", error);
    return imageUrl;
  }
};
const searchNoneUserAxios = async () => {
  search_user.value = [];
  await creatAxios({
    method: "post",
    url: "/user_none_search",
    data: {
      user_none_search_uid: user_none_search.value
    }
  }).then((res) => {
    console.log("返回用户", res.data.user);
    search_user.value.push(res.data.user);
    console.log("用和", search_user.value);
  }).catch((err) => {
    console.log(err);
  });
};
const add_user_axios = async (add_uid) => {
  await creatAxios({
    method: "post",
    url: "/user_add_uid",
    data: {
      add_uid,
      user_uid: user.value.user_uid
    }
  }).then(async (res) => {
    console.log(res.data.message);
    console.log("更新用户", res.data.user);
    if (res.data.message === "好友添加成功") {
      await window.api.localUser(res.data.user);
      await initialize_user();
      await window.api.sendWindow();
    }
  }).catch((err) => {
    console.log(err);
  });
};
const searchUserAxios = async () => {
  console.log("测试搜索");
};
const searchUserFriendAxios = async () => {
  await creatAxios({
    method: "post",
    url: "/user_friend",
    data: {
      user_uid: user.value.user_friend_uid
    }
  }).then(async (res) => {
    user_friend.value = await Promise.all(
      res.data.user_friend.map(async (friend) => ({
        ...friend,
        user_friend_headshot: await loadImage(friend.user_friend_headshot)
      }))
    );
    console.log("更新后的好友列表（含本地缓存路径）:", user_friend.value);
  }).catch((err) => {
    console.log(err);
  });
};
const localInput = ref$1();
const chatAudiofonc = () => {
  ischatAudio.value = true;
};
const ischatAudio = ref$1(false);
const isRecording = ref$1(false);
const audioBlob = ref$1(null);
const mediaRecorder = ref$1(null);
const audioChunks = ref$1([]);
const statusMessage = ref$1("");
const recordingTime = ref$1(0);
const MAX_RECORDING_TIME = 60;
let timer = null;
let recordingTimeout = null;
const startRecording = async () => {
  try {
    statusMessage.value = "正在请求麦克风权限...";
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    });
    mediaRecorder.value = new MediaRecorder(stream);
    audioChunks.value = [];
    recordingTime.value = 0;
    timer = setInterval(() => {
      recordingTime.value += 1;
    }, 1e3);
    recordingTimeout = setTimeout(() => {
      if (isRecording.value) {
        statusMessage.value = "已达到最大录制时间";
        stopRecording();
      }
    }, MAX_RECORDING_TIME * 1e3);
    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };
    mediaRecorder.value.onstop = () => {
      audioBlob.value = new Blob(audioChunks.value, { type: "audio/mp3" });
      statusMessage.value = "录音已准备好下载";
      clearInterval(timer);
      clearTimeout(recordingTimeout);
      timer = null;
      recordingTimeout = null;
      stream.getTracks().forEach((track2) => track2.stop());
    };
    mediaRecorder.value.start(100);
    isRecording.value = true;
    statusMessage.value = "正在录音...";
  } catch (error) {
    console.error("录音错误:", error);
    statusMessage.value = `录音失败: ${error.message}`;
    isRecording.value = false;
    clearTimers();
  }
};
const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop();
    isRecording.value = false;
    statusMessage.value = "录音已停止";
    clearTimers();
  }
};
const downloadAudio = () => {
  if (!audioBlob.value) return;
  const url2 = URL.createObjectURL(audioBlob.value);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url2;
  a.download = `recording-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.wav`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url2);
  }, 100);
};
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};
const clearTimers = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (recordingTimeout) {
    clearTimeout(recordingTimeout);
    recordingTimeout = null;
  }
};
const chatImage = ref$1();
const ischatImage = ref$1(false);
const totalImageSize = ref$1(0);
const selectedImages = ref$1([]);
const statusMessageImage = ref$1("图片准备就绪");
const chatImageFonc = () => {
  chatImage.value.click();
};
const chooseImage = (event) => {
  ischatImage.value = true;
  const files = event.target.files;
  if (files && files.length > 0) {
    const remainingSlots = 9 - selectedImages.value.length;
    if (remainingSlots <= 0) {
      console.log("已达到最大图片数量限制(9张)，请先删除部分图片");
      event.target.value = "";
      return;
    }
    const filesToProcess = Math.min(files.length, remainingSlots);
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        console.log(`文件 ${file.name} 不是图片类型！`);
        continue;
      }
      const maxSingleSize = 10 * 1024 * 1024;
      if (file.size > maxSingleSize) {
        console.log(`文件 ${file.name} 大小超过10MB限制！`);
        continue;
      }
      const maxTotalSize = 100 * 1024 * 1024;
      if (totalImageSize.value + file.size > maxTotalSize) {
        console.log("总图片大小已超过100MB限制！");
        return;
      }
      selectedImages.value.push(file);
      totalImageSize.value += file.size;
      console.log(
        `已添加图片: ${file.name}, 当前总大小: ${(totalImageSize.value / 1024 / 1024).toFixed(2)}MB`
      );
    }
    if (filesToProcess < files.length) {
      console.log(`只能添加${filesToProcess}张图片，已达到最大限制`);
    }
  }
  event.target.value = "";
};
const removeImage = (index) => {
  if (index >= 0 && index < selectedImages.value.length) {
    totalImageSize.value -= selectedImages.value[index].size;
    selectedImages.value.splice(index, 1);
  }
};
const ischatFile = ref$1(false);
const chatFile = ref$1();
const selectedFiles = ref$1([]);
const statusMessageFile = ref$1("文件准备就绪");
const chatFileFonc = () => {
  chatFile.value.click();
};
const chooseFile = (event) => {
  ischatFile.value = true;
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const extension = file.name.split(".").pop().toLowerCase();
    if (file.type.startsWith("image/")) {
      console.log(`文件 ${file.name} 是图片类型！`);
      selectedFiles.value.push({
        fileType: "image",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
      console.log("name", file.name);
    } else if (file.type.startsWith("video/")) {
      console.log(`文件 ${file.name} 是视频类型！`);
      selectedFiles.value.push({
        fileType: "video",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
    } else if (file.type.startsWith("audio/")) {
      console.log(`文件 ${file.name} 是音频类型！`);
      selectedFiles.value.push({
        fileType: "audio",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
    } else if (file.type === "application/pdf") {
      console.log(`文件 ${file.name} 是pdf类型！`);
      selectedFiles.value.push({
        fileType: "pdf",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
    } else if (file.type.startsWith("application/") && (["xls", "xlsx", "csv"].includes(extension) || file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      console.log(`文件 ${file.name} 是excel类型！`);
      selectedFiles.value.push({
        fileType: "excel",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
    } else if (file.type.startsWith("text/html")) {
      console.log(`文件 ${file.name} 是html类型！`);
      selectedFiles.value.push({
        fileType: "html",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
    } else if (file.type.startsWith("application/") && (["doc", "docx"].includes(extension) || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      console.log(`文件 ${file.name} 是word类型！`);
      selectedFiles.value.push({
        fileType: "word",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
    } else {
      console.log(`文件 ${file.name} 是其他类型！`);
      selectedFiles.value.push({
        fileType: "application",
        file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      });
    }
  }
};
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k2 = 1024;
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k2));
  if (i >= 3 && bytes >= 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  } else if (i >= 2 && bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
  return parseFloat((bytes / Math.pow(k2, i)).toFixed(2)) + " " + units[i];
};
const exitFile = () => {
  ischatFile.value = false;
};
const removeFile = (index) => {
  if (index >= 0 && index < selectedFiles.value.length) {
    selectedFiles.value.splice(index, 1);
    console.log("文件数", selectedFiles.value.length);
  }
};
const download_file = async (url2, index) => {
  if (!url2) return;
  if (window.electron) {
    user_friend_history_one.value.user_history[index].isdownload = "正在下载";
    await window.api.downloadFile(url2).then(async (result) => {
      if (result.success) {
        console.log("文件下载成功:", result.path);
        user_friend_history_one.value.user_history[index].filePath = result.path;
        user_friend_history_one.value.user_history[index].isdownload = "下载完成";
      } else {
        console.error("文件下载失败:", result.error);
      }
    }).catch((error) => {
      console.error("下载过程中出错:", error);
    });
  } else {
    const a = document.createElement("a");
    a.href = url2;
    a.download = url2.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
const open_file_local = async (index) => {
  await window.api.openFileLocation(user_friend_history_one.value.user_history[index].filePath).then((res) => {
    console.log("是否打开", res.success);
    if (res.success === false) {
      user_friend_history_one.value.user_history[index].isdownload = "未下载文件";
    }
  });
};
let ws$1 = null;
let isConnecting = false;
const initWebSocket = () => {
  if (ws$1) return;
  ws$1 = new WebSocket("ws://localhost:3001");
  ws$1.onopen = () => {
    console.log("WebSocket 连接已打开");
    isConnecting = true;
  };
  ws$1.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    console.log("收到服务器消息:", messageData);
    if (messageData.user_to_uid === selectedUserUid.value) {
      const newMessage = {
        user_take: messageData.user_uid === user.value.user_uid ? messageData.user_message : null,
        friend_user_take: messageData.user_uid !== user.value.user_uid ? messageData.user_message : null,
        fileType: messageData.fileType,
        fileSize: messageData.fileSize,
        timestamp: messageData.timestamp
      };
      console.log("消息类型", newMessage.fileType);
      if (!user_friend_history_one.value.user_history) {
        user_friend_history_one.value.user_history = [];
      }
      const friendUser = user_friend.value.find(
        (friendUser2) => friendUser2.user_friend_uid === selectedUserUid.value
      );
      user_friend_history_one.value.user = {
        user_uid: user.value.user_uid,
        user_name: user.value.user_name,
        user_headshot: user.value.user_headshot
      };
      user_friend_history_one.value.user_friend = {
        user_friend_uid: friendUser.user_friend_uid,
        user_friend_name: friendUser.user_friend_name,
        user_friend_headshot: friendUser.user_friend_headshot
      };
      user_friend_history_one.value.user_history.push(newMessage);
      console.log("webStock单个历史1", user_friend_history_one.value.user_history);
    } else if (messageData.user_uid === selectedUserUid.value) {
      const newMessage = {
        user_take: messageData.user_uid === user.value.user_to_uid ? messageData.user_message : null,
        friend_user_take: messageData.user_uid !== user.value.user_to_uid ? messageData.user_message : null,
        fileSize: messageData.fileSize,
        fileType: messageData.fileType,
        timestamp: messageData.timestamp
      };
      console.log("消息类型", newMessage.fileType);
      if (!user_friend_history_one.value.user_history) {
        user_friend_history_one.value.user_history = [];
      }
      user_friend_history_one.value.user_history.push(newMessage);
      console.log("webStock单个历史2", user_friend_history_one.value.user_history);
    }
  };
  ws$1.onclose = () => {
    console.log("WebSocket 连接已关闭");
    isConnecting = false;
    setTimeout(() => {
      initWebSocket();
    }, 5e3);
  };
  ws$1.onerror = (error) => {
    console.error("WebSocket 错误:", error);
    isConnecting = false;
  };
};
const sendMessage$1 = (message) => {
  if (!ws$1 || !isConnecting) {
    console.error("WebSocket 未连接");
    return;
  }
  console.log("用户uid", user.value.user_uid);
  console.log("发送uid", selectedUserUid.value);
  const messageData = {
    user_uid: user.value.user_uid,
    user_to_uid: selectedUserUid.value,
    user_message: message,
    user_token: user_token.value,
    Heartbeat: false
  };
  console.log("发送的json", messageData);
  ws$1.send(JSON.stringify(messageData));
};
const userSearchHistory = async () => {
  user_friend_history_one.value = {
    user: {
      user_uid: "",
      user_name: "",
      user_headshot: ""
    },
    user_friend: {
      user_friend_uid: "",
      user_friend_name: "",
      user_friend_headshot: ""
    },
    user_history: ""
  };
  await creatAxios({
    method: "POST",
    url: "/user_search_message",
    data: {
      user_uid: user.value.user_uid,
      user_to_uid: selectedUserUid.value
    }
  }).then((res) => {
    console.log(res.data.message);
    console.log("单个用户历史信息", res.data.user_history);
    if (res.data.user_history.user1.user1_uid === user.value.user_uid) {
      user_friend_history_one.value = {
        user: {
          user_uid: res.data.user_history.user1.user1_uid,
          user_name: res.data.user_history.user1.user1_name,
          user_headshot: res.data.user_history.user1.user1_headshot
        },
        user_friend: {
          user_friend_uid: res.data.user_history.user2.user2_uid,
          user_friend_name: res.data.user_history.user2.user2_name,
          user_friend_headshot: res.data.user_history.user2.user2_headshot
        },
        user_history: res.data.user_history.user_history.map((message) => ({
          user_take: message.sender_uid === user.value.user_uid ? message.message : null,
          friend_user_take: message.sender_uid === selectedUserUid.value ? message.message : null,
          fileSize: message.fileSize,
          fileType: message.fileType,
          timestamp: message.timestamp
        }))
      };
      console.log("存储历史信息1", user_friend_history_one.value);
    } else if (res.data.user_history.user2.user2_uid === user.value.user_uid) {
      user_friend_history_one.value = {
        user: {
          user_uid: res.data.user_history.user2.user2_uid,
          user_name: res.data.user_history.user2.user2_name,
          user_headshot: res.data.user_history.user2.user2_headshot
        },
        user_friend: {
          user_friend_uid: res.data.user_history.user1.user1_uid,
          user_friend_name: res.data.user_history.user1.user1_name,
          user_friend_headshot: res.data.user_history.user1.user1_headshot
        },
        user_history: res.data.user_history.user_history.map((message) => ({
          user_take: message.sender_uid === user.value.user_uid ? message.message : null,
          friend_user_take: message.sender_uid === selectedUserUid.value ? message.message : null,
          fileSize: message.fileSize,
          fileType: message.fileType,
          timestamp: message.timestamp
        }))
      };
      console.log("存储历史信息2", user_friend_history_one.value);
    }
  }).catch((err) => {
    console.log(err);
  });
};
let heartbeatIntervalId = null;
const wsHeartbeat = () => {
  heartbeatIntervalId = setInterval(() => {
    if (!ws$1 || !isConnecting) {
      console.error("WebSocket 未连接");
      return;
    }
    if (ws$1.readyState === WebSocket.OPEN) {
      console.log("发送心跳请求");
      ws$1.send(
        JSON.stringify({
          Heartbeat: true,
          user_token: user_token.value
        })
      );
    }
  }, 5e3);
};
const sendAudioWs = async () => {
  if (!audioBlob.value) return;
  statusMessage.value = "正在发送音频...";
  const formData = new FormData();
  formData.append("audio", audioBlob.value, `recording-${Date.now()}.mp3`);
  formData.append("user_uid", user.value.user_uid);
  formData.append("user_to_uid", selectedUserUid.value);
  await fileAxios({
    method: "POST",
    url: "/user_chat_audio",
    data: formData
  }).then((res) => {
    console.log(res.data.message);
    statusMessage.value = "音频发送成功";
  }).catch((err) => {
    console.log(err);
    statusMessage.value = "音频发送失败:";
  });
};
const send_image = async () => {
  if (!selectedImages.value || selectedImages.value.length === 0) return;
  statusMessageImage.value = "正在发送图片...";
  const formData = new FormData();
  selectedImages.value.forEach((image) => {
    formData.append(`images`, image);
  });
  formData.append("user_uid", user.value.user_uid);
  formData.append("user_to_uid", selectedUserUid.value);
  await fileAxios({
    method: "POST",
    url: "/user_chat_image",
    data: formData
  }).then((res) => {
    statusMessageImage.value = "图片发送成功";
    selectedImages.value = [];
    console.log(res.data.message);
  }).catch((err) => {
    console.log("图片发送失败:", err);
    statusMessageImage.value = "图片发送失败";
  });
};
const send_file = async () => {
  if (!selectedFiles.value || selectedFiles.value.length === 0) return;
  statusMessageFile.value = "正在发送文件...";
  const formData = new FormData();
  selectedFiles.value.forEach((fileData) => {
    formData.append(`files`, fileData.file);
  });
  formData.append("user_uid", user.value.user_uid);
  formData.append("user_to_uid", selectedUserUid.value);
  await fileAxios({
    method: "POST",
    url: "/user_chat_file",
    data: formData
  }).then((res) => {
    statusMessageFile.value = "文件发送成功";
    selectedFiles.value = [];
    console.log(res.data.message);
  }).catch((err) => {
    console.log("图片发送失败:", err);
    statusMessageFile.value = "文件发送失败";
  });
};
const file_name = (url2) => {
  const fileName = url2.split("/").pop();
  const withoutPrefix = fileName.replace("file_", "");
  const parts = withoutPrefix.split("_");
  const prefix = parts[0];
  const suffix = parts[1].split(".")[1];
  const desiredName = `${prefix}.${suffix}`;
  console.log(desiredName);
  return desiredName;
};
const user = ref$1({
  /*
  //名字
  user_name: '',
  //uid
  user_uid: 'number',
  //邮箱
  user_email: '',
  //头像
  user_headshot: '',
  //等级
  user_level: '',
  //点赞
  user_thumbs_up: '',
  //个签
  user_personal_signature: '',
  //性别
  user_gender: '',
  //生日
  user_birthday: '',
  //国家
  user_country: '',
  //地区
  user_region: '',
  //朋友列表
  user_friend_uid: []
  */
});
const user_token = ref$1("");
const user_friend = ref$1([
  /*{
    //名字
    user_friend_name: '',
    //uid
    user_friend_uid: '',
    //头像
    user_friend_headshot: ''
    //等级
    user_friend_level: '',
    //点赞
    user_friend_thumbs_up: '',
    //个签
    user_friend_personal_signature: '',
   //性别
   user_friend_gender: '',
   //生日
   user_friend_birthday: '',
   //国家
   user_friend_country: '',
   //地区
   user_friend_region: '',
  }*/
]);
const user_profile = ref$1({
  user_headshot: "",
  user_name: "",
  user_personal_signature: "",
  user_gender: "",
  user_birthday: "",
  user_country: "",
  user_region: ""
});
const search_user = ref$1([
  /*
      search_user_name: '',
      search_user_uid: '',
      search_user_headshot: ''
    */
]);
ref$1([]);
ref$1([
  /*{
    user: {
      user_uid: '',
      user_headshot: '',
      user_name: ''
    },
    user_friend: {
      user_friend_uid: '',
      user_friend_headshot: '',
      user_friend_name: ''
    },
    user_history: []
  }*/
]);
const user_friend_history_one = ref$1();
const user_search = ref$1("");
const user_none_search = ref$1("");
const selectedUserUid = ref$1(null);
const user_send_message = ref$1("");
const selectedUser = (user_uid) => {
  selectedUserUid.value = user_uid;
  console.log(selectedUserUid.value);
};
const initialize_user = async () => {
  user.value = await window.api.searchUser();
  user_token.value = await window.api.searchToken();
  console.log("用户", user.value);
  console.log("渲染token", user_token.value);
};
const clearInput = () => {
  user_search.value = "";
  console.log("执行");
};
const openSearch = async () => {
  await window.api.openSearchWindow();
};
const add_user = async (uid2) => {
  console.log(uid2);
  await add_user_axios(uid2);
};
const send_message = async (message) => {
  if (message.trim() === "") return;
  console.log("消息", message);
  await sendMessage$1(message);
  user_send_message.value = "";
};
const showMiniUserBox = ref$1(false);
const MiniUserBox = ref$1(null);
const MiniUserBoxButton = ref$1(null);
const UserMiniBoxClick = () => {
  console.log("showMiniUserBox");
  showMiniUserBox.value = !showMiniUserBox.value;
};
const showMiniUserFriendBox = ref$1(false);
const MiniUserFriendBox = ref$1(null);
const MiniUserFriendBoxButton = ref$1(null);
const UserFriendMiniBoxClick = () => {
  console.log("showMiniUserFriendBox");
  showMiniUserFriendBox.value = !showMiniUserFriendBox.value;
};
const showMoreBox = ref$1(false);
const moreBox = ref$1(null);
const moreBoxButton = ref$1(null);
const moreBoxButtonText = ref$1([
  { name: "超级调色盘" },
  { name: "检测更新" },
  { name: "设置" },
  { name: "帮助" },
  { name: "关于" },
  { name: "退出登录" }
]);
const toggleMoreBox = () => {
  showMoreBox.value = !showMoreBox.value;
};
const handleClickOutside = (event) => {
  if (moreBox.value && moreBoxButton.value && !moreBoxButton.value.contains(event.target) && !moreBox.value.contains(event.target)) {
    showMoreBox.value = false;
  }
  if (MiniUserBox.value && MiniUserBoxButton.value && !MiniUserBoxButton.value.contains(event.target) && !MiniUserBox.value.contains(event.target)) {
    showMiniUserBox.value = false;
  }
  if (MiniUserFriendBox.value && MiniUserFriendBoxButton.value && !MiniUserFriendBoxButton.value.contains(event.target) && !MiniUserFriendBox.value.contains(event.target)) {
    showMiniUserFriendBox.value = false;
  }
};
const loginOut = async () => {
  await window.api.openLoginWindow();
};
const appSet = () => {
  showMoreBox.value = false;
  window.api.openAppSetWindow();
};
const changeUserHeadshot = ref$1();
const user_edit_profile = async () => {
  console.log("user_profile对象", user_profile.value);
  await creatAxios({
    method: "post",
    url: "/user_edit_profile",
    data: {
      userUid: user.value.user_uid,
      userName: user_profile.value.user_name,
      userHeadshot: user_profile.value.user_headshot,
      userPersonalSignature: user_profile.value.user_personal_signature,
      userGender: user_profile.value.user_gender,
      userBirthday: user_profile.value.user_birthday,
      userCountry: user_profile.value.user_country,
      userRegion: user_profile.value.user_region
    }
  }).then(async (res) => {
    console.log("返回", res.data.message);
    console.log("是否成功", res.data.user);
    await window.api.localUser(res.data.user);
    await initialize_user();
    isUserProfile.value = false;
  }).catch((err) => {
    console.log(err);
  });
};
const previewImageUrl = ref$1("");
const clickInputImage = async () => {
  changeUserHeadshot.value.click();
};
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      console.log("只能上传图片文件！");
      return;
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      console.log("文件大小不能超过 2MB！");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("图片文件解析完成！");
      previewImageUrl.value = e.target.result;
      isUserHeadshot.value = true;
    };
    reader.readAsDataURL(file);
  }
};
const sendImg = async (file) => {
  const formData = new FormData();
  formData.append("Headshot", file);
  formData.append("userUid", user.value.user_uid);
  await fileAxios({
    url: `/user/changeUserHeadshot`,
    method: "post",
    data: formData
  }).then(async (res) => {
    console.log("成功", res);
    await window.api.localUser(res.data.user);
    await initialize_user();
    isUserHeadshot.value = false;
    user_profile.value.user_headshot = user.value.user_headshot;
  }).catch((err) => {
    console.log("错误", err);
  });
};
const isUserHeadshot = ref$1(false);
const isUserProfile = ref$1(false);
const cropper = ref$1();
const option = ref$1({
  autoCrop: true,
  // 是否默认生成截图框
  autoCropHeight: "240px",
  // 默认生成截图框宽度(默认值：容器的 80%, 可选值：0 ~ max), 真正裁剪出来的图片的宽度为 autoCropHeight * 1.25
  autoCropWidth: "240px",
  // 默认生成截图框宽度(默认值：容器的 80%, 可选值：0 ~ max), 真正裁剪出来的图片的宽度为 autoWidth * 1.25
  canMove: true,
  // 上传图片是否可以移动
  canScale: true,
  // 图片是否允许滚轮缩放
  centerBox: true,
  // 截图框是否被限制在图片里面
  fixed: true,
  // 是否固定截图框的宽高比例
  fixedBox: true,
  // 是否固定截图框大小
  fixedNumber: [1, 1],
  // 截图框的宽高比例([ 宽度 , 高度 ])
  img: "",
  // 裁剪图片的地址(可选值：url 地址, base64, blob)
  infoTrue: true,
  // infoTrue为 true 时显示预览图片的宽高信息,infoTrue为 false 时表示显示裁剪框的宽高信息
  mode: "contain",
  // 截图框可拖动时的方向(可选值：contain , cover, 100px, 100% auto)
  origin: false,
  // 上传的图片是否按照原始比例渲染
  outputSize: 1,
  // 裁剪生成图片的质量(可选值：0.1 ~ 1)
  outputType: "png",
  // 裁剪生成图片的格式(可选值：png, jpeg, webp)
  full: true
  // 是否输出原图比例的截图
});
const previews = ref$1();
const user_headshot = async () => {
  console.log("user headshot");
  cropper.value.getCropBlob(async (blob) => {
    let avatar = new File([blob], `${user.value.user_uid}.png`);
    await sendImg(avatar);
  });
};
const _hoisted_1$f = { class: "user-top" };
const _hoisted_2$f = { class: "user-img" };
const _hoisted_3$f = ["src"];
const _hoisted_4$f = { class: "user-name-box" };
const _hoisted_5$f = { class: "user-name" };
const _hoisted_6$f = { class: "user-uid" };
const _hoisted_7$c = { class: "user-Thumbs-up-box" };
const _hoisted_8$9 = { class: "user-Thumbs-up-number" };
const _hoisted_9$9 = { class: "user-center" };
const _hoisted_10$8 = { class: "user-center-level" };
const _hoisted_11$7 = { class: "user-center-text-right" };
const _hoisted_12$7 = { class: "user-center-level" };
const _hoisted_13$6 = { class: "user-center-text-right" };
const _hoisted_14$6 = { class: "user-center-level" };
const _hoisted_15$6 = { class: "user-center-text-right" };
const _hoisted_16$4 = { class: "user-bottom" };
const _sfc_main$g = {
  __name: "userMiniBox",
  setup(__props) {
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        ref_key: "MiniUserBox",
        ref: MiniUserBox,
        class: "userMiniBox",
        onClick: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["stop"]))
      }, [
        createBaseVNode("div", _hoisted_1$f, [
          createBaseVNode("div", _hoisted_2$f, [
            createBaseVNode("img", {
              src: unref(user).user_headshot,
              alt: ""
            }, null, 8, _hoisted_3$f)
          ]),
          createBaseVNode("div", _hoisted_4$f, [
            createBaseVNode("div", _hoisted_5$f, toDisplayString(unref(user).user_name), 1),
            createBaseVNode("div", _hoisted_6$f, "uid: " + toDisplayString(unref(user).user_uid), 1),
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "user-connect-box" }, [
              createBaseVNode("svg", {
                t: "1742379652254",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "7565",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M512 0c281.6 0 512 230.4 512 512s-230.4 512-512 512-512-230.4-512-512 230.4-512 512-512z",
                  fill: "#28D2A0",
                  "p-id": "7566"
                })
              ]),
              createBaseVNode("div", { class: "user-connect" }, "在线")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_7$c, [
            _cache[3] || (_cache[3] = createBaseVNode("svg", {
              t: "1742381372799",
              class: "icon",
              viewBox: "0 0 1024 1024",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "p-id": "3237",
              width: "200",
              height: "200"
            }, [
              createBaseVNode("path", {
                d: "M213.333333 392.533333H132.266667c-21.333333 0-42.666667 8.533333-55.466667 25.6s-21.333333 34.133333-21.333333 55.466667l34.133333 405.333333c4.266667 38.4 34.133333 68.266667 72.533333 68.266667H213.333333c42.666667 0 76.8-34.133333 76.8-76.8V469.333333c0-42.666667-34.133333-76.8-76.8-76.8z m8.533334 482.133334c0 4.266667-4.266667 8.533333-8.533334 8.533333H166.4c-4.266667 0-8.533333-4.266667-8.533333-8.533333L119.466667 469.333333c0-4.266667 0-8.533333 4.266666-8.533333 0 0 4.266667-4.266667 8.533334-4.266667H213.333333c4.266667 0 8.533333 4.266667 8.533334 8.533334v409.6zM964.266667 422.4c-12.8-17.066667-34.133333-29.866667-59.733334-29.866667h-187.733333l8.533333-21.333333c8.533333-29.866667 17.066667-59.733333 21.333334-93.866667 4.266667-46.933333-4.266667-81.066667-21.333334-110.933333-25.6-42.666667-89.6-98.133333-136.533333-89.6-21.333333 4.266667-34.133333 21.333333-38.4 42.666667v12.8c-4.266667 55.466667-12.8 132.266667-38.4 170.666666-21.333333 29.866667-64 59.733333-115.2 81.066667-25.6 12.8-46.933333 42.666667-46.933333 68.266667v418.133333c0 42.666667 34.133333 76.8 76.8 76.8h362.666666c34.133333 0 64-21.333333 72.533334-55.466667l115.2-405.333333c4.266667-21.333333 0-42.666667-12.8-64z m-51.2 51.2l-115.2 405.333333c0 4.266667-4.266667 8.533333-8.533334 8.533334H426.666667c-4.266667 0-8.533333-4.266667-8.533334-8.533334v-418.133333c0-4.266667 4.266667-8.533333 8.533334-12.8 42.666667-25.6 102.4-64 132.266666-110.933333 34.133333-59.733333 42.666667-153.6 46.933334-192 17.066667 8.533333 42.666667 29.866667 59.733333 55.466666 8.533333 17.066667 12.8 42.666667 12.8 76.8 0 25.6-8.533333 51.2-17.066667 81.066667L640 418.133333c-4.266667 8.533333 0 21.333333 4.266667 29.866667 4.266667 8.533333 17.066667 12.8 25.6 12.8h230.4c4.266667 0 8.533333 4.266667 8.533333 4.266667s4.266667 4.266667 4.266667 8.533333z",
                "p-id": "3238"
              })
            ], -1)),
            createBaseVNode("div", _hoisted_8$9, toDisplayString(unref(user).user_thumbs_up), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_9$9, [
          createBaseVNode("div", _hoisted_10$8, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "user-center-text" }, "等级", -1)),
            createBaseVNode("div", _hoisted_11$7, "LV:  " + toDisplayString(unref(user).user_level), 1)
          ]),
          createBaseVNode("div", _hoisted_12$7, [
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "user-center-text" }, "签名", -1)),
            createBaseVNode("div", _hoisted_13$6, toDisplayString(unref(user).user_personal_signature), 1)
          ]),
          createBaseVNode("div", _hoisted_14$6, [
            _cache[6] || (_cache[6] = createBaseVNode("div", { class: "user-center-text" }, "所在地", -1)),
            createBaseVNode("div", _hoisted_15$6, toDisplayString(unref(user).user_region), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_16$4, [
          createBaseVNode("button", {
            class: "user-bottom-button",
            onClick: _cache[0] || (_cache[0] = ($event) => isUserProfile.value = true)
          }, "编辑资料")
        ])
      ], 512)), [
        [vShow, unref(showMiniUserBox)]
      ]);
    };
  }
};
const UserMiniBox = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-7ea33436"]]);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k2) {
    var d = Object.getOwnPropertyDescriptor(n, k2);
    Object.defineProperty(a, k2, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k2];
      }
    });
  });
  return a;
}
var vibrant = {};
var color = {};
var util = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getColorIndex = exports.getColorDiffStatus = exports.hexDiff = exports.rgbDiff = exports.deltaE94 = exports.rgbToCIELab = exports.xyzToCIELab = exports.rgbToXyz = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.defer = exports.RSHIFT = exports.SIGBITS = exports.DELTAE94_DIFF_STATUS = void 0;
  exports.DELTAE94_DIFF_STATUS = {
    NA: 0,
    PERFECT: 1,
    CLOSE: 2,
    GOOD: 10,
    SIMILAR: 50
  };
  exports.SIGBITS = 5;
  exports.RSHIFT = 8 - exports.SIGBITS;
  function defer() {
    var resolve2;
    var reject;
    var promise = new Promise(function(_resolve, _reject) {
      resolve2 = _resolve;
      reject = _reject;
    });
    return { resolve: resolve2, reject, promise };
  }
  exports.defer = defer;
  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m === null ? null : [m[1], m[2], m[3]].map(function(s) {
      return parseInt(s, 16);
    });
  }
  exports.hexToRgb = hexToRgb;
  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
  }
  exports.rgbToHex = rgbToHex;
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max2 = Math.max(r, g, b);
    var min2 = Math.min(r, g, b);
    var h2;
    var s;
    var l = (max2 + min2) / 2;
    if (max2 === min2) {
      h2 = s = 0;
    } else {
      var d = max2 - min2;
      s = l > 0.5 ? d / (2 - max2 - min2) : d / (max2 + min2);
      switch (max2) {
        case r:
          h2 = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h2 = (b - r) / d + 2;
          break;
        case b:
          h2 = (r - g) / d + 4;
          break;
      }
      h2 /= 6;
    }
    return [h2, s, l];
  }
  exports.rgbToHsl = rgbToHsl;
  function hslToRgb(h2, s, l) {
    var r;
    var g;
    var b;
    function hue2rgb(p3, q2, t) {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p3 + (q2 - p3) * 6 * t;
      if (t < 1 / 2)
        return q2;
      if (t < 2 / 3)
        return p3 + (q2 - p3) * (2 / 3 - t) * 6;
      return p3;
    }
    if (s === 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p2 = 2 * l - q;
      r = hue2rgb(p2, q, h2 + 1 / 3);
      g = hue2rgb(p2, q, h2);
      b = hue2rgb(p2, q, h2 - 1 / 3);
    }
    return [
      r * 255,
      g * 255,
      b * 255
    ];
  }
  exports.hslToRgb = hslToRgb;
  function rgbToXyz(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    r = r > 0.04045 ? Math.pow((r + 5e-3) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 5e-3) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 5e-3) / 1.055, 2.4) : b / 12.92;
    r *= 100;
    g *= 100;
    b *= 100;
    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var z2 = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x, y, z2];
  }
  exports.rgbToXyz = rgbToXyz;
  function xyzToCIELab(x, y, z2) {
    var REF_X = 95.047;
    var REF_Y = 100;
    var REF_Z = 108.883;
    x /= REF_X;
    y /= REF_Y;
    z2 /= REF_Z;
    x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z2 = z2 > 8856e-6 ? Math.pow(z2, 1 / 3) : 7.787 * z2 + 16 / 116;
    var L2 = 116 * y - 16;
    var a = 500 * (x - y);
    var b = 200 * (y - z2);
    return [L2, a, b];
  }
  exports.xyzToCIELab = xyzToCIELab;
  function rgbToCIELab(r, g, b) {
    var _a = rgbToXyz(r, g, b), x = _a[0], y = _a[1], z2 = _a[2];
    return xyzToCIELab(x, y, z2);
  }
  exports.rgbToCIELab = rgbToCIELab;
  function deltaE94(lab1, lab2) {
    var WEIGHT_L = 1;
    var WEIGHT_C = 1;
    var WEIGHT_H = 1;
    var L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
    var L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];
    var dL = L1 - L2;
    var da = a1 - a2;
    var db = b1 - b2;
    var xC1 = Math.sqrt(a1 * a1 + b1 * b1);
    var xC2 = Math.sqrt(a2 * a2 + b2 * b2);
    var xDL = L2 - L1;
    var xDC = xC2 - xC1;
    var xDE = Math.sqrt(dL * dL + da * da + db * db);
    var xDH = Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC)) ? Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC) : 0;
    var xSC = 1 + 0.045 * xC1;
    var xSH = 1 + 0.015 * xC1;
    xDL /= WEIGHT_L;
    xDC /= WEIGHT_C * xSC;
    xDH /= WEIGHT_H * xSH;
    return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);
  }
  exports.deltaE94 = deltaE94;
  function rgbDiff(rgb1, rgb2) {
    var lab1 = rgbToCIELab.apply(void 0, rgb1);
    var lab2 = rgbToCIELab.apply(void 0, rgb2);
    return deltaE94(lab1, lab2);
  }
  exports.rgbDiff = rgbDiff;
  function hexDiff(hex1, hex2) {
    var rgb1 = hexToRgb(hex1);
    var rgb2 = hexToRgb(hex2);
    return rgbDiff(rgb1, rgb2);
  }
  exports.hexDiff = hexDiff;
  function getColorDiffStatus(d) {
    if (d < exports.DELTAE94_DIFF_STATUS.NA) {
      return "N/A";
    }
    if (d <= exports.DELTAE94_DIFF_STATUS.PERFECT) {
      return "Perfect";
    }
    if (d <= exports.DELTAE94_DIFF_STATUS.CLOSE) {
      return "Close";
    }
    if (d <= exports.DELTAE94_DIFF_STATUS.GOOD) {
      return "Good";
    }
    if (d < exports.DELTAE94_DIFF_STATUS.SIMILAR) {
      return "Similar";
    }
    return "Wrong";
  }
  exports.getColorDiffStatus = getColorDiffStatus;
  function getColorIndex(r, g, b) {
    return (r << 2 * exports.SIGBITS) + (g << exports.SIGBITS) + b;
  }
  exports.getColorIndex = getColorIndex;
})(util);
function arrayFilter$2(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$2;
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
function baseTimes$1(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$8 = freeGlobal || freeSelf || Function("return this")();
var _root = root$8;
var root$7 = _root;
var Symbol$6 = root$7.Symbol;
var _Symbol = Symbol$6;
var Symbol$5 = _Symbol;
var objectProto$f = Object.prototype;
var hasOwnProperty$c = objectProto$f.hasOwnProperty;
var nativeObjectToString$1 = objectProto$f.toString;
var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$e = Object.prototype;
var nativeObjectToString = objectProto$e.toString;
function objectToString$2(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$2;
var Symbol$4 = _Symbol, getRawTag = _getRawTag, objectToString$1 = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$4 ? Symbol$4.toStringTag : void 0;
function baseGetTag$5(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
}
var _baseGetTag = baseGetTag$5;
function isObjectLike$7(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$7;
var baseGetTag$4 = _baseGetTag, isObjectLike$6 = isObjectLike_1;
var argsTag$3 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$6(value) && baseGetTag$4(value) == argsTag$3;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$5 = isObjectLike_1;
var objectProto$d = Object.prototype;
var hasOwnProperty$b = objectProto$d.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$d.propertyIsEnumerable;
var isArguments$2 = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$5(value) && hasOwnProperty$b.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$2;
var isArray$e = Array.isArray;
var isArray_1 = isArray$e;
var isBuffer$4 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
isBuffer$4.exports;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer3 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer3;
})(isBuffer$4, isBuffer$4.exports);
var isBufferExports = isBuffer$4.exports;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$3(value, length) {
  var type2 = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$3;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$3(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$3;
var baseGetTag$3 = _baseGetTag, isLength$2 = isLength_1, isObjectLike$4 = isObjectLike_1;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$2 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$2] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$4(value) && isLength$2(value.length) && !!typedArrayTags[baseGetTag$3(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$3(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$3;
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var _nodeUtilExports = _nodeUtil.exports;
var baseIsTypedArray = _baseIsTypedArray, baseUnary$2 = _baseUnary, nodeUtil$2 = _nodeUtilExports;
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
var baseTimes = _baseTimes, isArguments$1 = isArguments_1, isArray$d = isArray_1, isBuffer$3 = isBufferExports, isIndex$2 = _isIndex, isTypedArray$1 = isTypedArray_1;
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$d(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$3(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$a.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex$2(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;
var objectProto$b = Object.prototype;
function isPrototype$3(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$b;
  return value === proto;
}
var _isPrototype = isPrototype$3;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var nativeKeys$1 = overArg$1(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype$2 = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$a = Object.prototype;
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$9.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
function isObject$7(value) {
  var type2 = typeof value;
  return value != null && (type2 == "object" || type2 == "function");
}
var isObject_1 = isObject$7;
var baseGetTag$2 = _baseGetTag, isObject$6 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$2(value) {
  if (!isObject$6(value)) {
    return false;
  }
  var tag = baseGetTag$2(value);
  return tag == funcTag$1 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$2;
var isFunction$1 = isFunction_1, isLength$1 = isLength_1;
function isArrayLike$4(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$4;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$3 = isArrayLike_1;
function keys$5(object) {
  return isArrayLike$3(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}
var keys_1 = keys$5;
var baseFor = _baseFor, keys$4 = keys_1;
function baseForOwn$1(object, iteratee) {
  return object && baseFor(object, iteratee, keys$4);
}
var _baseForOwn = baseForOwn$1;
var isArrayLike$2 = isArrayLike_1;
function createBaseEach$1(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$2(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var _createBaseEach = createBaseEach$1;
var baseForOwn = _baseForOwn, createBaseEach = _createBaseEach;
var baseEach$1 = createBaseEach(baseForOwn);
var _baseEach = baseEach$1;
var baseEach = _baseEach;
function baseFilter$1(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection2) {
    if (predicate(value, index, collection2)) {
      result.push(value);
    }
  });
  return result;
}
var _baseFilter = baseFilter$1;
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$5(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$5;
var eq$4 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$4(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var root$6 = _root;
var coreJsData$1 = root$6["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid2 = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid2 ? "Symbol(src)_1." + uid2 : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction = isFunction_1, isMasked = _isMasked, isObject$5 = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$9 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative$1(value) {
  if (!isObject$5(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$5 = _root;
var Map$4 = getNative$6(root$5, "Map");
var _Map = Map$4;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$3 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$3 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type2 = typeof value;
  return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$3(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$3.prototype.clear = mapCacheClear;
MapCache$3.prototype["delete"] = mapCacheDelete;
MapCache$3.prototype.get = mapCacheGet;
MapCache$3.prototype.has = mapCacheHas;
MapCache$3.prototype.set = mapCacheSet;
var _MapCache = MapCache$3;
var ListCache$1 = _ListCache, Map$2 = _Map, MapCache$2 = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$3(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$3.prototype.clear = stackClear;
Stack$3.prototype["delete"] = stackDelete;
Stack$3.prototype.get = stackGet;
Stack$3.prototype.has = stackHas;
Stack$3.prototype.set = stackSet;
var _Stack = Stack$3;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
var _setCacheAdd = setCacheAdd$1;
function setCacheHas$1(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas$1;
var MapCache$1 = _MapCache, setCacheAdd = _setCacheAdd, setCacheHas = _setCacheHas;
function SetCache$1(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache$1();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
SetCache$1.prototype.has = setCacheHas;
var _SetCache = SetCache$1;
function arraySome$1(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome$1;
function cacheHas$1(cache, key) {
  return cache.has(key);
}
var _cacheHas = cacheHas$1;
var SetCache = _SetCache, arraySome = _arraySome, cacheHas = _cacheHas;
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays$2(array, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack2.get(array);
  var othStacked = stack2.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  stack2.set(array, other);
  stack2.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack2) : customizer(arrValue, othValue, index, array, other, stack2);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
      result = false;
      break;
    }
  }
  stack2["delete"](array);
  stack2["delete"](other);
  return result;
}
var _equalArrays = equalArrays$2;
var root$4 = _root;
var Uint8Array$3 = root$4.Uint8Array;
var _Uint8Array = Uint8Array$3;
function mapToArray$1(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray$1;
function setToArray$1(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray$1;
var Symbol$3 = _Symbol, Uint8Array$2 = _Uint8Array, eq$3 = eq_1, equalArrays$1 = _equalArrays, mapToArray = _mapToArray, setToArray = _setToArray;
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", symbolTag$3 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]";
var symbolProto$2 = Symbol$3 ? Symbol$3.prototype : void 0, symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : void 0;
function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack2) {
  switch (tag) {
    case dataViewTag$3:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag$2:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other))) {
        return false;
      }
      return true;
    case boolTag$2:
    case dateTag$2:
    case numberTag$2:
      return eq$3(+object, +other);
    case errorTag$1:
      return object.name == other.name && object.message == other.message;
    case regexpTag$2:
    case stringTag$2:
      return object == other + "";
    case mapTag$4:
      var convert = mapToArray;
    case setTag$4:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack2.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;
      stack2.set(object, other);
      var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack2);
      stack2["delete"](object);
      return result;
    case symbolTag$3:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag$1;
function arrayPush$2(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var _arrayPush = arrayPush$2;
var arrayPush$1 = _arrayPush, isArray$c = isArray_1;
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$c(object) ? result : arrayPush$1(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter$1 = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$6 = Object.prototype;
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter$1(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols$2 = _getSymbols, keys$3 = keys_1;
function getAllKeys$2(object) {
  return baseGetAllKeys$1(object, keys$3, getSymbols$2);
}
var _getAllKeys = getAllKeys$2;
var getAllKeys$1 = _getAllKeys;
var COMPARE_PARTIAL_FLAG$3 = 1;
var objectProto$5 = Object.prototype;
var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys$1(object), objLength = objProps.length, othProps = getAllKeys$1(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$5.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack2.get(object);
  var othStacked = stack2.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack2.set(object, other);
  stack2.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack2) : customizer(objValue, othValue, key, object, other, stack2);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack2["delete"](object);
  stack2["delete"](other);
  return result;
}
var _equalObjects = equalObjects$1;
var getNative$4 = _getNative, root$3 = _root;
var DataView$2 = getNative$4(root$3, "DataView");
var _DataView = DataView$2;
var getNative$3 = _getNative, root$2 = _root;
var Promise$2 = getNative$3(root$2, "Promise");
var _Promise = Promise$2;
var getNative$2 = _getNative, root$1 = _root;
var Set$2 = getNative$2(root$1, "Set");
var _Set = Set$2;
var getNative$1 = _getNative, root = _root;
var WeakMap$2 = getNative$1(root, "WeakMap");
var _WeakMap = WeakMap$2;
var DataView$1 = _DataView, Map$1 = _Map, Promise$1 = _Promise, Set$1 = _Set, WeakMap$1 = _WeakMap, baseGetTag$1 = _baseGetTag, toSource = _toSource;
var mapTag$3 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag$4 = baseGetTag$1;
if (DataView$1 && getTag$4(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag$4(new Map$1()) != mapTag$3 || Promise$1 && getTag$4(Promise$1.resolve()) != promiseTag || Set$1 && getTag$4(new Set$1()) != setTag$3 || WeakMap$1 && getTag$4(new WeakMap$1()) != weakMapTag$1) {
  getTag$4 = function(value) {
    var result = baseGetTag$1(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$4;
var Stack$2 = _Stack, equalArrays = _equalArrays, equalByTag = _equalByTag, equalObjects = _equalObjects, getTag$3 = _getTag, isArray$b = isArray_1, isBuffer$2 = isBufferExports, isTypedArray = isTypedArray_1;
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", objectTag$1 = "[object Object]";
var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack2) {
  var objIsArr = isArray$b(object), othIsArr = isArray$b(other), objTag = objIsArr ? arrayTag$1 : getTag$3(object), othTag = othIsArr ? arrayTag$1 : getTag$3(other);
  objTag = objTag == argsTag$1 ? objectTag$1 : objTag;
  othTag = othTag == argsTag$1 ? objectTag$1 : othTag;
  var objIsObj = objTag == objectTag$1, othIsObj = othTag == objectTag$1, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$2(object)) {
    if (!isBuffer$2(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack2 || (stack2 = new Stack$2());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack2);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$4.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$4.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack2 || (stack2 = new Stack$2());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack2 || (stack2 = new Stack$2());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack2);
}
var _baseIsEqualDeep = baseIsEqualDeep$1;
var baseIsEqualDeep = _baseIsEqualDeep, isObjectLike$3 = isObjectLike_1;
function baseIsEqual$2(value, other, bitmask, customizer, stack2) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike$3(value) && !isObjectLike$3(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$2, stack2);
}
var _baseIsEqual = baseIsEqual$2;
var Stack$1 = _Stack, baseIsEqual$1 = _baseIsEqual;
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch$1(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack2 = new Stack$1();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack2);
      }
      if (!(result === void 0 ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack2) : result)) {
        return false;
      }
    }
  }
  return true;
}
var _baseIsMatch = baseIsMatch$1;
var isObject$4 = isObject_1;
function isStrictComparable$2(value) {
  return value === value && !isObject$4(value);
}
var _isStrictComparable = isStrictComparable$2;
var isStrictComparable$1 = _isStrictComparable, keys$2 = keys_1;
function getMatchData$1(object) {
  var result = keys$2(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable$1(value)];
  }
  return result;
}
var _getMatchData = getMatchData$1;
function matchesStrictComparable$2(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var _matchesStrictComparable = matchesStrictComparable$2;
var baseIsMatch = _baseIsMatch, getMatchData = _getMatchData, matchesStrictComparable$1 = _matchesStrictComparable;
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}
var _baseMatches = baseMatches$1;
var baseGetTag = _baseGetTag, isObjectLike$2 = isObjectLike_1;
var symbolTag$2 = "[object Symbol]";
function isSymbol$4(value) {
  return typeof value == "symbol" || isObjectLike$2(value) && baseGetTag(value) == symbolTag$2;
}
var isSymbol_1 = isSymbol$4;
var isArray$a = isArray_1, isSymbol$3 = isSymbol_1;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey$3(value, object) {
  if (isArray$a(value)) {
    return false;
  }
  var type2 = typeof value;
  if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol$3(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var _isKey = isKey$3;
var MapCache = _MapCache;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize$1(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache)();
  return memoized;
}
memoize$1.Cache = MapCache;
var memoize_1 = memoize$1;
var memoize = memoize_1;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$1;
var memoizeCapped = _memoizeCapped;
var rePropName$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar$1 = /\\(\\)?/g;
var stringToPath$2 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName$1, function(match, number, quote2, subString) {
    result.push(quote2 ? subString.replace(reEscapeChar$1, "$1") : number || match);
  });
  return result;
});
var _stringToPath = stringToPath$2;
function arrayMap$1(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$1;
var Symbol$2 = _Symbol, arrayMap = _arrayMap, isArray$9 = isArray_1, isSymbol$2 = isSymbol_1;
var INFINITY$1 = 1 / 0;
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$9(value)) {
    return arrayMap(value, baseToString$1) + "";
  }
  if (isSymbol$2(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;
function toString$1(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$1;
var isArray$8 = isArray_1, isKey$2 = _isKey, stringToPath$1 = _stringToPath, toString2 = toString_1;
function castPath$2(value, object) {
  if (isArray$8(value)) {
    return value;
  }
  return isKey$2(value, object) ? [value] : stringToPath$1(toString2(value));
}
var _castPath = castPath$2;
var isSymbol$1 = isSymbol_1;
var INFINITY = 1 / 0;
function toKey$4(value) {
  if (typeof value == "string" || isSymbol$1(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _toKey = toKey$4;
var castPath$1 = _castPath, toKey$3 = _toKey;
function baseGet$2(object, path) {
  path = castPath$1(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey$3(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var _baseGet = baseGet$2;
var baseGet$1 = _baseGet;
function get$2(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet$1(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_1 = get$2;
function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}
var _baseHasIn = baseHasIn$1;
var castPath = _castPath, isArguments = isArguments_1, isArray$7 = isArray_1, isIndex$1 = _isIndex, isLength = isLength_1, toKey$2 = _toKey;
function hasPath$1(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey$2(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex$1(key, length) && (isArray$7(object) || isArguments(object));
}
var _hasPath = hasPath$1;
var baseHasIn = _baseHasIn, hasPath = _hasPath;
function hasIn$1(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
var hasIn_1 = hasIn$1;
var baseIsEqual = _baseIsEqual, get$1 = get_1, hasIn = hasIn_1, isKey$1 = _isKey, isStrictComparable = _isStrictComparable, matchesStrictComparable = _matchesStrictComparable, toKey$1 = _toKey;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$1(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey$1(path), srcValue);
  }
  return function(object) {
    var objValue = get$1(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
var _baseMatchesProperty = baseMatchesProperty$1;
function identity$3(value) {
  return value;
}
var identity_1 = identity$3;
function baseProperty$1(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var _baseProperty = baseProperty$1;
var baseGet = _baseGet;
function basePropertyDeep$1(path) {
  return function(object) {
    return baseGet(object, path);
  };
}
var _basePropertyDeep = basePropertyDeep$1;
var baseProperty = _baseProperty, basePropertyDeep = _basePropertyDeep, isKey = _isKey, toKey = _toKey;
function property$1(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
var property_1 = property$1;
var baseMatches = _baseMatches, baseMatchesProperty = _baseMatchesProperty, identity$2 = identity_1, isArray$6 = isArray_1, property = property_1;
function baseIteratee$1(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity$2;
  }
  if (typeof value == "object") {
    return isArray$6(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
var _baseIteratee = baseIteratee$1;
var arrayFilter = _arrayFilter, baseFilter = _baseFilter, baseIteratee = _baseIteratee, isArray$5 = isArray_1;
function filter$2(collection, predicate) {
  var func = isArray$5(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate));
}
var filter_1 = filter$2;
Object.defineProperty(color, "__esModule", { value: true });
color.Swatch = void 0;
var util_1$2 = util;
var filter$1 = filter_1;
var Swatch = (
  /** @class */
  function() {
    function Swatch2(rgb, population) {
      this._rgb = rgb;
      this._population = population;
    }
    Swatch2.applyFilter = function(colors, f) {
      return typeof f === "function" ? filter$1(colors, function(_a) {
        var r = _a.r, g = _a.g, b = _a.b;
        return f(r, g, b, 255);
      }) : colors;
    };
    Object.defineProperty(Swatch2.prototype, "r", {
      get: function() {
        return this._rgb[0];
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Swatch2.prototype, "g", {
      get: function() {
        return this._rgb[1];
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Swatch2.prototype, "b", {
      get: function() {
        return this._rgb[2];
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Swatch2.prototype, "rgb", {
      get: function() {
        return this._rgb;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Swatch2.prototype, "hsl", {
      get: function() {
        if (!this._hsl) {
          var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
          this._hsl = util_1$2.rgbToHsl(r, g, b);
        }
        return this._hsl;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Swatch2.prototype, "hex", {
      get: function() {
        if (!this._hex) {
          var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
          this._hex = util_1$2.rgbToHex(r, g, b);
        }
        return this._hex;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Swatch2.prototype, "population", {
      get: function() {
        return this._population;
      },
      enumerable: false,
      configurable: true
    });
    Swatch2.prototype.toJSON = function() {
      return {
        rgb: this.rgb,
        population: this.population
      };
    };
    Swatch2.prototype.getRgb = function() {
      return this._rgb;
    };
    Swatch2.prototype.getHsl = function() {
      return this.hsl;
    };
    Swatch2.prototype.getPopulation = function() {
      return this._population;
    };
    Swatch2.prototype.getHex = function() {
      return this.hex;
    };
    Swatch2.prototype.getYiq = function() {
      if (!this._yiq) {
        var rgb = this._rgb;
        this._yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1e3;
      }
      return this._yiq;
    };
    Object.defineProperty(Swatch2.prototype, "titleTextColor", {
      get: function() {
        if (!this._titleTextColor) {
          this._titleTextColor = this.getYiq() < 200 ? "#fff" : "#000";
        }
        return this._titleTextColor;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Swatch2.prototype, "bodyTextColor", {
      get: function() {
        if (!this._bodyTextColor) {
          this._bodyTextColor = this.getYiq() < 150 ? "#fff" : "#000";
        }
        return this._bodyTextColor;
      },
      enumerable: false,
      configurable: true
    });
    Swatch2.prototype.getTitleTextColor = function() {
      return this.titleTextColor;
    };
    Swatch2.prototype.getBodyTextColor = function() {
      return this.bodyTextColor;
    };
    return Swatch2;
  }()
);
color.Swatch = Swatch;
var builder = {};
function arrayEach$1(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$1;
var getNative = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$2(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$2;
var baseAssignValue$1 = _baseAssignValue, eq$2 = eq_1;
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function assignValue$2(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$3.call(object, key) && eq$2(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
var _assignValue = assignValue$2;
var assignValue$1 = _assignValue, baseAssignValue = _baseAssignValue;
function copyObject$4(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$4;
var copyObject$3 = _copyObject, keys$1 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$3(source, keys$1(source), object);
}
var _baseAssign = baseAssign$1;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$3 = isObject_1, isPrototype$1 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$3(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$1 = isArrayLike_1;
function keysIn$4(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$4;
var copyObject$2 = _copyObject, keysIn$3 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$2(source, keysIn$3(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBuffer = { exports: {} };
_cloneBuffer.exports;
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
var _cloneBufferExports = _cloneBuffer.exports;
function copyArray$1(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$1;
var copyObject$1 = _copyObject, getSymbols$1 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$1(source, getSymbols$1(source), object);
}
var _copySymbols = copySymbols$1;
var overArg = _overArg;
var getPrototype$2 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$2;
var arrayPush = _arrayPush, getPrototype$1 = _getPrototype, getSymbols = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype$1(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$2 = keysIn_1;
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$2, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$1.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var Uint8Array$1 = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$1 = _Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$1;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray = _cloneTypedArray;
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$2 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$2(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
var baseCreate = _baseCreate, getPrototype = _getPrototype, isPrototype = _isPrototype;
function initCloneObject$1(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
var _initCloneObject = initCloneObject$1;
var getTag$2 = _getTag, isObjectLike$1 = isObjectLike_1;
var mapTag$1 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$1(value) && getTag$2(value) == mapTag$1;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$1 = _baseUnary, nodeUtil$1 = _nodeUtilExports;
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap$2 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$2;
var getTag$1 = _getTag, isObjectLike = isObjectLike_1;
var setTag$1 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary = _baseUnary, nodeUtil = _nodeUtilExports;
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet$2 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$2;
var Stack = _Stack, arrayEach = _arrayEach, assignValue = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer = _cloneBufferExports, copyArray = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys = _getAllKeys, getAllKeysIn = _getAllKeysIn, getTag = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject = _initCloneObject, isArray$4 = isArray_1, isBuffer$1 = isBufferExports, isMap$1 = isMap_1, isObject$1 = isObject_1, isSet$1 = isSet_1, keys = keys_1, keysIn$1 = keysIn_1;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$1(value, bitmask, customizer, key, object, stack2) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack2) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray$4(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack2 || (stack2 = new Stack());
  var stacked = stack2.get(value);
  if (stacked) {
    return stacked;
  }
  stack2.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack2));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack2));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn$1 : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack2));
  });
  return result;
}
var _baseClone = baseClone$1;
var baseClone = _baseClone;
var CLONE_SYMBOLS_FLAG = 4;
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}
var clone_1 = clone;
var hasRequiredBuilder;
function requireBuilder() {
  if (hasRequiredBuilder) return builder;
  hasRequiredBuilder = 1;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(builder, "__esModule", { value: true });
  var vibrant_12 = __importDefault2(requireVibrant());
  var clone2 = clone_1;
  var Builder = (
    /** @class */
    function() {
      function Builder2(src, opts) {
        if (opts === void 0) {
          opts = {};
        }
        this._src = src;
        this._opts = opts;
        this._opts.filters = clone2(vibrant_12.default.DefaultOpts.filters);
      }
      Builder2.prototype.maxColorCount = function(n) {
        this._opts.colorCount = n;
        return this;
      };
      Builder2.prototype.maxDimension = function(d) {
        this._opts.maxDimension = d;
        return this;
      };
      Builder2.prototype.addFilter = function(f) {
        this._opts.filters.push(f);
        return this;
      };
      Builder2.prototype.removeFilter = function(f) {
        var i = this._opts.filters.indexOf(f);
        if (i > 0)
          this._opts.filters.splice(i);
        return this;
      };
      Builder2.prototype.clearFilters = function() {
        this._opts.filters = [];
        return this;
      };
      Builder2.prototype.quality = function(q) {
        this._opts.quality = q;
        return this;
      };
      Builder2.prototype.useImageClass = function(imageClass) {
        this._opts.ImageClass = imageClass;
        return this;
      };
      Builder2.prototype.useGenerator = function(generator2) {
        this._opts.generator = generator2;
        return this;
      };
      Builder2.prototype.useQuantizer = function(quantizer2) {
        this._opts.quantizer = quantizer2;
        return this;
      };
      Builder2.prototype.build = function() {
        return new vibrant_12.default(this._src, this._opts);
      };
      Builder2.prototype.getPalette = function(cb) {
        return this.build().getPalette(cb);
      };
      Builder2.prototype.getSwatches = function(cb) {
        return this.build().getPalette(cb);
      };
      return Builder2;
    }()
  );
  builder.default = Builder;
  return builder;
}
var quantizer = {};
var mmcq = {};
var vbox = {};
Object.defineProperty(vbox, "__esModule", { value: true });
var util_1$1 = util;
var VBox = (
  /** @class */
  function() {
    function VBox2(r1, r2, g1, g2, b1, b2, hist) {
      this._volume = -1;
      this._count = -1;
      this.dimension = { r1, r2, g1, g2, b1, b2 };
      this.hist = hist;
    }
    VBox2.build = function(pixels, shouldIgnore) {
      var hn = 1 << 3 * util_1$1.SIGBITS;
      var hist = new Uint32Array(hn);
      var rmax;
      var rmin;
      var gmax;
      var gmin;
      var bmax;
      var bmin;
      var r;
      var g;
      var b;
      var a;
      rmax = gmax = bmax = 0;
      rmin = gmin = bmin = Number.MAX_VALUE;
      var n = pixels.length / 4;
      var i = 0;
      while (i < n) {
        var offset = i * 4;
        i++;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        if (a === 0)
          continue;
        r = r >> util_1$1.RSHIFT;
        g = g >> util_1$1.RSHIFT;
        b = b >> util_1$1.RSHIFT;
        var index = util_1$1.getColorIndex(r, g, b);
        hist[index] += 1;
        if (r > rmax)
          rmax = r;
        if (r < rmin)
          rmin = r;
        if (g > gmax)
          gmax = g;
        if (g < gmin)
          gmin = g;
        if (b > bmax)
          bmax = b;
        if (b < bmin)
          bmin = b;
      }
      return new VBox2(rmin, rmax, gmin, gmax, bmin, bmax, hist);
    };
    VBox2.prototype.invalidate = function() {
      this._volume = this._count = -1;
      this._avg = null;
    };
    VBox2.prototype.volume = function() {
      if (this._volume < 0) {
        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
        this._volume = (r2 - r1 + 1) * (g2 - g1 + 1) * (b2 - b1 + 1);
      }
      return this._volume;
    };
    VBox2.prototype.count = function() {
      if (this._count < 0) {
        var hist = this.hist;
        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
        var c = 0;
        for (var r = r1; r <= r2; r++) {
          for (var g = g1; g <= g2; g++) {
            for (var b = b1; b <= b2; b++) {
              var index = util_1$1.getColorIndex(r, g, b);
              c += hist[index];
            }
          }
        }
        this._count = c;
      }
      return this._count;
    };
    VBox2.prototype.clone = function() {
      var hist = this.hist;
      var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
      return new VBox2(r1, r2, g1, g2, b1, b2, hist);
    };
    VBox2.prototype.avg = function() {
      if (!this._avg) {
        var hist = this.hist;
        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
        var ntot = 0;
        var mult = 1 << 8 - util_1$1.SIGBITS;
        var rsum = void 0;
        var gsum = void 0;
        var bsum = void 0;
        rsum = gsum = bsum = 0;
        for (var r = r1; r <= r2; r++) {
          for (var g = g1; g <= g2; g++) {
            for (var b = b1; b <= b2; b++) {
              var index = util_1$1.getColorIndex(r, g, b);
              var h2 = hist[index];
              ntot += h2;
              rsum += h2 * (r + 0.5) * mult;
              gsum += h2 * (g + 0.5) * mult;
              bsum += h2 * (b + 0.5) * mult;
            }
          }
        }
        if (ntot) {
          this._avg = [
            ~~(rsum / ntot),
            ~~(gsum / ntot),
            ~~(bsum / ntot)
          ];
        } else {
          this._avg = [
            ~~(mult * (r1 + r2 + 1) / 2),
            ~~(mult * (g1 + g2 + 1) / 2),
            ~~(mult * (b1 + b2 + 1) / 2)
          ];
        }
      }
      return this._avg;
    };
    VBox2.prototype.contains = function(rgb) {
      var r = rgb[0], g = rgb[1], b = rgb[2];
      var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
      r >>= util_1$1.RSHIFT;
      g >>= util_1$1.RSHIFT;
      b >>= util_1$1.RSHIFT;
      return r >= r1 && r <= r2 && g >= g1 && g <= g2 && b >= b1 && b <= b2;
    };
    VBox2.prototype.split = function() {
      var hist = this.hist;
      var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
      var count = this.count();
      if (!count)
        return [];
      if (count === 1)
        return [this.clone()];
      var rw = r2 - r1 + 1;
      var gw = g2 - g1 + 1;
      var bw = b2 - b1 + 1;
      var maxw = Math.max(rw, gw, bw);
      var accSum = null;
      var sum;
      var total;
      sum = total = 0;
      var maxd = null;
      if (maxw === rw) {
        maxd = "r";
        accSum = new Uint32Array(r2 + 1);
        for (var r = r1; r <= r2; r++) {
          sum = 0;
          for (var g = g1; g <= g2; g++) {
            for (var b = b1; b <= b2; b++) {
              var index = util_1$1.getColorIndex(r, g, b);
              sum += hist[index];
            }
          }
          total += sum;
          accSum[r] = total;
        }
      } else if (maxw === gw) {
        maxd = "g";
        accSum = new Uint32Array(g2 + 1);
        for (var g = g1; g <= g2; g++) {
          sum = 0;
          for (var r = r1; r <= r2; r++) {
            for (var b = b1; b <= b2; b++) {
              var index = util_1$1.getColorIndex(r, g, b);
              sum += hist[index];
            }
          }
          total += sum;
          accSum[g] = total;
        }
      } else {
        maxd = "b";
        accSum = new Uint32Array(b2 + 1);
        for (var b = b1; b <= b2; b++) {
          sum = 0;
          for (var r = r1; r <= r2; r++) {
            for (var g = g1; g <= g2; g++) {
              var index = util_1$1.getColorIndex(r, g, b);
              sum += hist[index];
            }
          }
          total += sum;
          accSum[b] = total;
        }
      }
      var splitPoint = -1;
      var reverseSum = new Uint32Array(accSum.length);
      for (var i = 0; i < accSum.length; i++) {
        var d = accSum[i];
        if (splitPoint < 0 && d > total / 2)
          splitPoint = i;
        reverseSum[i] = total - d;
      }
      var vbox2 = this;
      function doCut(d2) {
        var dim1 = d2 + "1";
        var dim2 = d2 + "2";
        var d1 = vbox2.dimension[dim1];
        var d22 = vbox2.dimension[dim2];
        var vbox1 = vbox2.clone();
        var vbox22 = vbox2.clone();
        var left = splitPoint - d1;
        var right = d22 - splitPoint;
        if (left <= right) {
          d22 = Math.min(d22 - 1, ~~(splitPoint + right / 2));
          d22 = Math.max(0, d22);
        } else {
          d22 = Math.max(d1, ~~(splitPoint - 1 - left / 2));
          d22 = Math.min(vbox2.dimension[dim2], d22);
        }
        while (!accSum[d22])
          d22++;
        var c2 = reverseSum[d22];
        while (!c2 && accSum[d22 - 1])
          c2 = reverseSum[--d22];
        vbox1.dimension[dim2] = d22;
        vbox22.dimension[dim1] = d22 + 1;
        return [vbox1, vbox22];
      }
      return doCut(maxd);
    };
    return VBox2;
  }()
);
vbox.default = VBox;
var pqueue = {};
Object.defineProperty(pqueue, "__esModule", { value: true });
var PQueue = (
  /** @class */
  function() {
    function PQueue2(comparator) {
      this._comparator = comparator;
      this.contents = [];
      this._sorted = false;
    }
    PQueue2.prototype._sort = function() {
      if (!this._sorted) {
        this.contents.sort(this._comparator);
        this._sorted = true;
      }
    };
    PQueue2.prototype.push = function(item) {
      this.contents.push(item);
      this._sorted = false;
    };
    PQueue2.prototype.peek = function(index) {
      this._sort();
      index = typeof index === "number" ? index : this.contents.length - 1;
      return this.contents[index];
    };
    PQueue2.prototype.pop = function() {
      this._sort();
      return this.contents.pop();
    };
    PQueue2.prototype.size = function() {
      return this.contents.length;
    };
    PQueue2.prototype.map = function(mapper) {
      this._sort();
      return this.contents.map(mapper);
    };
    return PQueue2;
  }()
);
pqueue.default = PQueue;
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(mmcq, "__esModule", { value: true });
var color_1$1 = color;
var vbox_1 = __importDefault$1(vbox);
var pqueue_1 = __importDefault$1(pqueue);
var fractByPopulations = 0.75;
function _splitBoxes(pq, target) {
  var lastSize = pq.size();
  while (pq.size() < target) {
    var vbox2 = pq.pop();
    if (vbox2 && vbox2.count() > 0) {
      var _a = vbox2.split(), vbox1 = _a[0], vbox22 = _a[1];
      pq.push(vbox1);
      if (vbox22 && vbox22.count() > 0)
        pq.push(vbox22);
      if (pq.size() === lastSize) {
        break;
      } else {
        lastSize = pq.size();
      }
    } else {
      break;
    }
  }
}
var MMCQ = function(pixels, opts) {
  if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {
    throw new Error("Wrong MMCQ parameters");
  }
  var vbox2 = vbox_1.default.build(pixels);
  var hist = vbox2.hist;
  Object.keys(hist).length;
  var pq = new pqueue_1.default(function(a, b) {
    return a.count() - b.count();
  });
  pq.push(vbox2);
  _splitBoxes(pq, fractByPopulations * opts.colorCount);
  var pq2 = new pqueue_1.default(function(a, b) {
    return a.count() * a.volume() - b.count() * b.volume();
  });
  pq2.contents = pq.contents;
  _splitBoxes(pq2, opts.colorCount - pq2.size());
  return generateSwatches(pq2);
};
function generateSwatches(pq) {
  var swatches = [];
  while (pq.size()) {
    var v = pq.pop();
    var color2 = v.avg();
    color2[0];
    color2[1];
    color2[2];
    swatches.push(new color_1$1.Swatch(color2, v.count()));
  }
  return swatches;
}
mmcq.default = MMCQ;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WebWorker = void 0;
  var mmcq_1 = mmcq;
  Object.defineProperty(exports, "MMCQ", { enumerable: true, get: function() {
    return mmcq_1.default;
  } });
  exports.WebWorker = null;
})(quantizer);
var generator = {};
var _default$1 = {};
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;
var nativeMax = Math.max;
function overRest$1(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$1;
function constant$1(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$1;
var constant = constant_1, defineProperty = _defineProperty, identity$1 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$1 = shortOut(baseSetToString);
var _setToString = setToString$1;
var identity = identity_1, overRest = _overRest, setToString = _setToString;
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var _baseRest = baseRest$1;
var eq$1 = eq_1, isArrayLike = isArrayLike_1, isIndex = _isIndex, isObject = isObject_1;
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type2 = typeof index;
  if (type2 == "number" ? isArrayLike(object) && isIndex(index, object.length) : type2 == "string" && index in object) {
    return eq$1(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseRest = _baseRest, eq = eq_1, isIterateeCall = _isIterateeCall, keysIn = keysIn_1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var defaults$3 = baseRest(function(object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index < length) {
    var source = sources[index];
    var props = keysIn(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
var defaults_1 = defaults$3;
Object.defineProperty(_default$1, "__esModule", { value: true });
var color_1 = color;
var util_1 = util;
var defaults$2 = defaults_1;
var DefaultOpts = {
  targetDarkLuma: 0.26,
  maxDarkLuma: 0.45,
  minLightLuma: 0.55,
  targetLightLuma: 0.74,
  minNormalLuma: 0.3,
  targetNormalLuma: 0.5,
  maxNormalLuma: 0.7,
  targetMutesSaturation: 0.3,
  maxMutesSaturation: 0.4,
  targetVibrantSaturation: 1,
  minVibrantSaturation: 0.35,
  weightSaturation: 3,
  weightLuma: 6.5,
  weightPopulation: 0.5
};
function _findMaxPopulation(swatches) {
  var p2 = 0;
  swatches.forEach(function(s) {
    p2 = Math.max(p2, s.getPopulation());
  });
  return p2;
}
function _isAlreadySelected(palette, s) {
  return palette.Vibrant === s || palette.DarkVibrant === s || palette.LightVibrant === s || palette.Muted === s || palette.DarkMuted === s || palette.LightMuted === s;
}
function _createComparisonValue(saturation, targetSaturation, luma, targetLuma, population, maxPopulation, opts) {
  function weightedMean() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }
    var sum = 0;
    var weightSum = 0;
    for (var i = 0; i < values.length; i += 2) {
      var value = values[i];
      var weight = values[i + 1];
      sum += value * weight;
      weightSum += weight;
    }
    return sum / weightSum;
  }
  function invertDiff(value, targetValue) {
    return 1 - Math.abs(value - targetValue);
  }
  return weightedMean(invertDiff(saturation, targetSaturation), opts.weightSaturation, invertDiff(luma, targetLuma), opts.weightLuma, population / maxPopulation, opts.weightPopulation);
}
function _findColorVariation(palette, swatches, maxPopulation, targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation, opts) {
  var max2 = null;
  var maxValue = 0;
  swatches.forEach(function(swatch) {
    var _a = swatch.getHsl(), s = _a[1], l = _a[2];
    if (s >= minSaturation && s <= maxSaturation && l >= minLuma && l <= maxLuma && !_isAlreadySelected(palette, swatch)) {
      var value = _createComparisonValue(s, targetSaturation, l, targetLuma, swatch.getPopulation(), maxPopulation, opts);
      if (max2 === null || value > maxValue) {
        max2 = swatch;
        maxValue = value;
      }
    }
  });
  return max2;
}
function _generateVariationColors(swatches, maxPopulation, opts) {
  var palette = {};
  palette.Vibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
  palette.LightVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
  palette.DarkVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
  palette.Muted = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
  palette.LightMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
  palette.DarkMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
  return palette;
}
function _generateEmptySwatches(palette, maxPopulation, opts) {
  if (palette.Vibrant === null && palette.DarkVibrant === null && palette.LightVibrant === null) {
    if (palette.DarkVibrant === null && palette.DarkMuted !== null) {
      var _a = palette.DarkMuted.getHsl(), h2 = _a[0], s = _a[1], l = _a[2];
      l = opts.targetDarkLuma;
      palette.DarkVibrant = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
    }
    if (palette.LightVibrant === null && palette.LightMuted !== null) {
      var _b = palette.LightMuted.getHsl(), h2 = _b[0], s = _b[1], l = _b[2];
      l = opts.targetDarkLuma;
      palette.DarkVibrant = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
    }
  }
  if (palette.Vibrant === null && palette.DarkVibrant !== null) {
    var _c = palette.DarkVibrant.getHsl(), h2 = _c[0], s = _c[1], l = _c[2];
    l = opts.targetNormalLuma;
    palette.Vibrant = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
  } else if (palette.Vibrant === null && palette.LightVibrant !== null) {
    var _d = palette.LightVibrant.getHsl(), h2 = _d[0], s = _d[1], l = _d[2];
    l = opts.targetNormalLuma;
    palette.Vibrant = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
  }
  if (palette.DarkVibrant === null && palette.Vibrant !== null) {
    var _e = palette.Vibrant.getHsl(), h2 = _e[0], s = _e[1], l = _e[2];
    l = opts.targetDarkLuma;
    palette.DarkVibrant = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
  }
  if (palette.LightVibrant === null && palette.Vibrant !== null) {
    var _f = palette.Vibrant.getHsl(), h2 = _f[0], s = _f[1], l = _f[2];
    l = opts.targetLightLuma;
    palette.LightVibrant = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
  }
  if (palette.Muted === null && palette.Vibrant !== null) {
    var _g = palette.Vibrant.getHsl(), h2 = _g[0], s = _g[1], l = _g[2];
    l = opts.targetMutesSaturation;
    palette.Muted = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
  }
  if (palette.DarkMuted === null && palette.DarkVibrant !== null) {
    var _h = palette.DarkVibrant.getHsl(), h2 = _h[0], s = _h[1], l = _h[2];
    l = opts.targetMutesSaturation;
    palette.DarkMuted = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
  }
  if (palette.LightMuted === null && palette.LightVibrant !== null) {
    var _j = palette.LightVibrant.getHsl(), h2 = _j[0], s = _j[1], l = _j[2];
    l = opts.targetMutesSaturation;
    palette.LightMuted = new color_1.Swatch(util_1.hslToRgb(h2, s, l), 0);
  }
}
var DefaultGenerator = function(swatches, opts) {
  opts = defaults$2({}, opts, DefaultOpts);
  var maxPopulation = _findMaxPopulation(swatches);
  var palette = _generateVariationColors(swatches, maxPopulation, opts);
  _generateEmptySwatches(palette, maxPopulation, opts);
  return palette;
};
_default$1.default = DefaultGenerator;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var default_1 = _default$1;
  Object.defineProperty(exports, "Default", { enumerable: true, get: function() {
    return default_1.default;
  } });
})(generator);
var filter2 = {};
var _default = {};
Object.defineProperty(_default, "__esModule", { value: true });
function defaultFilter(r, g, b, a) {
  return a >= 125 && !(r > 250 && g > 250 && b > 250);
}
_default.default = defaultFilter;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.combineFilters = void 0;
  var default_1 = _default;
  Object.defineProperty(exports, "Default", { enumerable: true, get: function() {
    return default_1.default;
  } });
  function combineFilters(filters) {
    if (!Array.isArray(filters) || filters.length === 0)
      return null;
    return function(r, g, b, a) {
      if (a === 0)
        return false;
      for (var i = 0; i < filters.length; i++) {
        if (!filters[i](r, g, b, a))
          return false;
      }
      return true;
    };
  }
  exports.combineFilters = combineFilters;
})(filter2);
var hasRequiredVibrant;
function requireVibrant() {
  if (hasRequiredVibrant) return vibrant;
  hasRequiredVibrant = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k2, k22) {
    if (k22 === void 0) k22 = k2;
    Object.defineProperty(o, k22, { enumerable: true, get: function() {
      return m[k2];
    } });
  } : function(o, m, k2, k22) {
    if (k22 === void 0) k22 = k2;
    o[k22] = m[k2];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k2 in mod) if (k2 !== "default" && Object.hasOwnProperty.call(mod, k2)) __createBinding2(result, mod, k2);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(vibrant, "__esModule", { value: true });
  var color_12 = color;
  var builder_1 = __importDefault2(requireBuilder());
  var Util = __importStar2(util);
  var Quantizer = __importStar2(quantizer);
  var Generator = __importStar2(generator);
  var Filters = __importStar2(filter2);
  var defaults2 = defaults_1;
  var Vibrant2 = (
    /** @class */
    function() {
      function Vibrant3(_src, opts) {
        this._src = _src;
        this.opts = defaults2({}, opts, Vibrant3.DefaultOpts);
        this.opts.combinedFilter = Filters.combineFilters(this.opts.filters);
      }
      Vibrant3.from = function(src) {
        return new builder_1.default(src);
      };
      Vibrant3.prototype._process = function(image, opts) {
        var quantizer2 = opts.quantizer, generator2 = opts.generator;
        image.scaleDown(opts);
        return image.applyFilter(opts.combinedFilter).then(function(imageData) {
          return quantizer2(imageData.data, opts);
        }).then(function(colors) {
          return color_12.Swatch.applyFilter(colors, opts.combinedFilter);
        }).then(function(colors) {
          return Promise.resolve(generator2(colors));
        });
      };
      Vibrant3.prototype.palette = function() {
        return this.swatches();
      };
      Vibrant3.prototype.swatches = function() {
        return this._palette;
      };
      Vibrant3.prototype.getPalette = function(cb) {
        var _this = this;
        var image = new this.opts.ImageClass();
        var result = image.load(this._src).then(function(image2) {
          return _this._process(image2, _this.opts);
        }).then(function(palette) {
          _this._palette = palette;
          image.remove();
          return palette;
        }, function(err) {
          image.remove();
          throw err;
        });
        if (cb)
          result.then(function(palette) {
            return cb(null, palette);
          }, function(err) {
            return cb(err);
          });
        return result;
      };
      Vibrant3.Builder = builder_1.default;
      Vibrant3.Quantizer = Quantizer;
      Vibrant3.Generator = Generator;
      Vibrant3.Filter = Filters;
      Vibrant3.Util = Util;
      Vibrant3.Swatch = color_12.Swatch;
      Vibrant3.DefaultOpts = {
        colorCount: 64,
        quality: 5,
        generator: Generator.Default,
        ImageClass: null,
        quantizer: Quantizer.MMCQ,
        filters: [Filters.Default]
      };
      return Vibrant3;
    }()
  );
  vibrant.default = Vibrant2;
  return vibrant;
}
var browser$1 = {};
var base = {};
Object.defineProperty(base, "__esModule", { value: true });
base.ImageBase = void 0;
var ImageBase = (
  /** @class */
  function() {
    function ImageBase2() {
    }
    ImageBase2.prototype.scaleDown = function(opts) {
      var width = this.getWidth();
      var height = this.getHeight();
      var ratio = 1;
      if (opts.maxDimension > 0) {
        var maxSide = Math.max(width, height);
        if (maxSide > opts.maxDimension)
          ratio = opts.maxDimension / maxSide;
      } else {
        ratio = 1 / opts.quality;
      }
      if (ratio < 1)
        this.resize(width * ratio, height * ratio, ratio);
    };
    ImageBase2.prototype.applyFilter = function(filter3) {
      var imageData = this.getImageData();
      if (typeof filter3 === "function") {
        var pixels = imageData.data;
        var n = pixels.length / 4;
        var offset = void 0, r = void 0, g = void 0, b = void 0, a = void 0;
        for (var i = 0; i < n; i++) {
          offset = i * 4;
          r = pixels[offset + 0];
          g = pixels[offset + 1];
          b = pixels[offset + 2];
          a = pixels[offset + 3];
          if (!filter3(r, g, b, a))
            pixels[offset + 3] = 0;
        }
      }
      return Promise.resolve(imageData);
    };
    return ImageBase2;
  }()
);
base.ImageBase = ImageBase;
var url = {};
var punycode$1 = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
punycode$1.exports;
(function(module, exports) {
  (function(root2) {
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = module && !module.nodeType && module;
    var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal;
    if (freeGlobal2.global === freeGlobal2 || freeGlobal2.window === freeGlobal2 || freeGlobal2.self === freeGlobal2) {
      root2 = freeGlobal2;
    }
    var punycode2, maxInt = 2147483647, base2 = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, baseMinusTMin = base2 - tMin, floor2 = Math.floor, stringFromCharCode = String.fromCharCode, key;
    function error(type2) {
      throw new RangeError(errors[type2]);
    }
    function map(array, fn) {
      var length = array.length;
      var result = [];
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }
    function mapDomain(string, fn) {
      var parts = string.split("@");
      var result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        string = parts[1];
      }
      string = string.replace(regexSeparators, ".");
      var labels = string.split(".");
      var encoded = map(labels, fn).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      var output = [], counter = 0, length = string.length, value, extra;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    function ucs2encode(array) {
      return map(array, function(value) {
        var output = "";
        if (value > 65535) {
          value -= 65536;
          output += stringFromCharCode(value >>> 10 & 1023 | 55296);
          value = 56320 | value & 1023;
        }
        output += stringFromCharCode(value);
        return output;
      }).join("");
    }
    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base2;
    }
    function digitToBasic(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    function adapt(delta, numPoints, firstTime) {
      var k2 = 0;
      delta = firstTime ? floor2(delta / damp) : delta >> 1;
      delta += floor2(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k2 += base2) {
        delta = floor2(delta / baseMinusTMin);
      }
      return floor2(k2 + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    function decode2(input) {
      var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k2, digit, t, baseMinusT;
      basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        for (oldi = i, w = 1, k2 = base2; ; k2 += base2) {
          if (index >= inputLength) {
            error("invalid-input");
          }
          digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base2 || digit > floor2((maxInt - i) / w)) {
            error("overflow");
          }
          i += digit * w;
          t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
          if (digit < t) {
            break;
          }
          baseMinusT = base2 - t;
          if (w > floor2(maxInt / baseMinusT)) {
            error("overflow");
          }
          w *= baseMinusT;
        }
        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor2(i / out) > maxInt - n) {
          error("overflow");
        }
        n += floor2(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return ucs2encode(output);
    }
    function encode3(input) {
      var n, delta, handledCPCount, basicLength, bias, j, m, q, k2, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
      input = ucs2decode(input);
      inputLength = input.length;
      n = initialN;
      delta = 0;
      bias = initialBias;
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      handledCPCount = basicLength = output.length;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }
        handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor2((maxInt - delta) / handledCPCountPlusOne)) {
          error("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue < n && ++delta > maxInt) {
            error("overflow");
          }
          if (currentValue == n) {
            for (q = delta, k2 = base2; ; k2 += base2) {
              t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
              if (q < t) {
                break;
              }
              qMinusT = q - t;
              baseMinusT = base2 - t;
              output.push(
                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
              );
              q = floor2(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    }
    function toUnicode(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode2(string.slice(4).toLowerCase()) : string;
      });
    }
    function toASCII(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode3(string) : string;
      });
    }
    punycode2 = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      "version": "1.4.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      "ucs2": {
        "decode": ucs2decode,
        "encode": ucs2encode
      },
      "decode": decode2,
      "encode": encode3,
      "toASCII": toASCII,
      "toUnicode": toUnicode
    };
    if (freeExports && freeModule) {
      if (module.exports == freeExports) {
        freeModule.exports = punycode2;
      } else {
        for (key in punycode2) {
          punycode2.hasOwnProperty(key) && (freeExports[key] = punycode2[key]);
        }
      }
    } else {
      root2.punycode = punycode2;
    }
  })(commonjsGlobal);
})(punycode$1, punycode$1.exports);
var punycodeExports = punycode$1.exports;
var type = TypeError;
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasMap = typeof Map === "function" && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === "function" && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace$1 = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat$1 = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
  return O.__proto__;
} : null);
function addNumericSeparator(num, str) {
  if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
    return str;
  }
  var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof num === "number") {
    var int = num < 0 ? -$floor(-num) : $floor(num);
    if (int !== num) {
      var intStr = String(int);
      var dec = $slice.call(str, intStr.length + 1);
      return $replace$1.call(intStr, sepRegex, "$&_") + "." + $replace$1.call($replace$1.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return $replace$1.call(str, sepRegex, "$&_");
}
var utilInspect = require$$0;
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
var quotes = {
  __proto__: null,
  "double": '"',
  single: "'"
};
var quoteREs = {
  __proto__: null,
  "double": /(["\\])/g,
  single: /(['\\])/g
};
var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};
  if (has$3(opts, "quoteStyle") && !has$3(quotes, opts.quoteStyle)) {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }
  if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }
  var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
  if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  }
  if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  }
  if (has$3(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  }
  var numericSeparator = opts.numericSeparator;
  if (typeof obj === "undefined") {
    return "undefined";
  }
  if (obj === null) {
    return "null";
  }
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  }
  if (typeof obj === "string") {
    return inspectString(obj, opts);
  }
  if (typeof obj === "number") {
    if (obj === 0) {
      return Infinity / obj > 0 ? "0" : "-0";
    }
    var str = String(obj);
    return numericSeparator ? addNumericSeparator(obj, str) : str;
  }
  if (typeof obj === "bigint") {
    var bigIntStr = String(obj) + "n";
    return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
    return isArray$3(obj) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from, noIndent) {
    if (from) {
      seen = $arrSlice.call(seen);
      seen.push(from);
    }
    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };
      if (has$3(opts, "quoteStyle")) {
        newOpts.quoteStyle = opts.quoteStyle;
      }
      return inspect_(value, newOpts, depth + 1, seen);
    }
    return inspect_(value, opts, depth + 1, seen);
  }
  if (typeof obj === "function" && !isRegExp$1(obj)) {
    var name = nameOf(obj);
    var keys2 = arrObjKeys(obj, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys2.length > 0 ? " { " + $join.call(keys2, ", ") + " }" : "");
  }
  if (isSymbol(obj)) {
    var symString = hasShammedSymbols ? $replace$1.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
    return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement(obj)) {
    var s = "<" + $toLowerCase.call(String(obj.nodeName));
    var attrs = obj.attributes || [];
    for (var i = 0; i < attrs.length; i++) {
      s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
    }
    s += ">";
    if (obj.childNodes && obj.childNodes.length) {
      s += "...";
    }
    s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
    return s;
  }
  if (isArray$3(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + $join.call(xs, ", ") + " ]";
  }
  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect2);
    if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
      return "{ [" + String(obj) + "] " + $join.call($concat$1.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
    }
    if (parts.length === 0) {
      return "[" + String(obj) + "]";
    }
    return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
  }
  if (typeof obj === "object" && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
      return utilInspect(obj, { depth: maxDepth - depth });
    } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
      return obj.inspect();
    }
  }
  if (isMap(obj)) {
    var mapParts = [];
    if (mapForEach) {
      mapForEach.call(obj, function(value, key) {
        mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
      });
    }
    return collectionOf("Map", mapSize.call(obj), mapParts, indent);
  }
  if (isSet(obj)) {
    var setParts = [];
    if (setForEach) {
      setForEach.call(obj, function(value) {
        setParts.push(inspect2(value, obj));
      });
    }
    return collectionOf("Set", setSize.call(obj), setParts, indent);
  }
  if (isWeakMap(obj)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet(obj)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber(obj)) {
    return markBoxed(inspect2(Number(obj)));
  }
  if (isBigInt(obj)) {
    return markBoxed(inspect2(bigIntValueOf.call(obj)));
  }
  if (isBoolean(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }
  if (isString(obj)) {
    return markBoxed(inspect2(String(obj)));
  }
  if (typeof window !== "undefined" && obj === window) {
    return "{ [object Window] }";
  }
  if (typeof globalThis !== "undefined" && obj === globalThis || typeof commonjsGlobal !== "undefined" && obj === commonjsGlobal) {
    return "{ [object globalThis] }";
  }
  if (!isDate(obj) && !isRegExp$1(obj)) {
    var ys = arrObjKeys(obj, inspect2);
    var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? "" : "null prototype";
    var stringTag2 = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
    var tag = constructorTag + (stringTag2 || protoTag ? "[" + $join.call($concat$1.call([], stringTag2 || [], protoTag || []), ": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + $join.call(ys, ", ") + " }";
  }
  return String(obj);
};
function wrapQuotes(s, defaultStyle, opts) {
  var style = opts.quoteStyle || defaultStyle;
  var quoteChar = quotes[style];
  return quoteChar + s + quoteChar;
}
function quote(s) {
  return $replace$1.call(String(s), /"/g, "&quot;");
}
function canTrustToString(obj) {
  return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
}
function isArray$3(obj) {
  return toStr(obj) === "[object Array]" && canTrustToString(obj);
}
function isDate(obj) {
  return toStr(obj) === "[object Date]" && canTrustToString(obj);
}
function isRegExp$1(obj) {
  return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
}
function isError(obj) {
  return toStr(obj) === "[object Error]" && canTrustToString(obj);
}
function isString(obj) {
  return toStr(obj) === "[object String]" && canTrustToString(obj);
}
function isNumber(obj) {
  return toStr(obj) === "[object Number]" && canTrustToString(obj);
}
function isBoolean(obj) {
  return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
}
function isSymbol(obj) {
  if (hasShammedSymbols) {
    return obj && typeof obj === "object" && obj instanceof Symbol;
  }
  if (typeof obj === "symbol") {
    return true;
  }
  if (!obj || typeof obj !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
function isBigInt(obj) {
  if (!obj || typeof obj !== "object" || !bigIntValueOf) {
    return false;
  }
  try {
    bigIntValueOf.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
var hasOwn$1 = Object.prototype.hasOwnProperty || function(key) {
  return key in this;
};
function has$3(obj, key) {
  return hasOwn$1.call(obj, key);
}
function toStr(obj) {
  return objectToString.call(obj);
}
function nameOf(f) {
  if (f.name) {
    return f.name;
  }
  var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  if (m) {
    return m[1];
  }
  return null;
}
function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }
  return -1;
}
function isMap(x) {
  if (!mapSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    mapSize.call(x);
    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }
    return x instanceof Map;
  } catch (e) {
  }
  return false;
}
function isWeakMap(x) {
  if (!weakMapHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x, weakMapHas);
    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakMap;
  } catch (e) {
  }
  return false;
}
function isWeakRef(x) {
  if (!weakRefDeref || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x);
    return true;
  } catch (e) {
  }
  return false;
}
function isSet(x) {
  if (!setSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    setSize.call(x);
    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }
    return x instanceof Set;
  } catch (e) {
  }
  return false;
}
function isWeakSet(x) {
  if (!weakSetHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x, weakSetHas);
    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakSet;
  } catch (e) {
  }
  return false;
}
function isElement(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
    return true;
  }
  return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
}
function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
    return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
  }
  var quoteRE = quoteREs[opts.quoteStyle || "single"];
  quoteRE.lastIndex = 0;
  var s = $replace$1.call($replace$1.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, "single", opts);
}
function lowbyte(c) {
  var n = c.charCodeAt(0);
  var x = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n];
  if (x) {
    return "\\" + x;
  }
  return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
}
function markBoxed(str) {
  return "Object(" + str + ")";
}
function weakCollectionOf(type2) {
  return type2 + " { ? }";
}
function collectionOf(type2, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
  return type2 + " (" + size + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], "\n") >= 0) {
      return false;
    }
  }
  return true;
}
function getIndent(opts, depth) {
  var baseIndent;
  if (opts.indent === "	") {
    baseIndent = "	";
  } else if (typeof opts.indent === "number" && opts.indent > 0) {
    baseIndent = $join.call(Array(opts.indent + 1), " ");
  } else {
    return null;
  }
  return {
    base: baseIndent,
    prev: $join.call(Array(depth + 1), baseIndent)
  };
}
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj, inspect2) {
  var isArr = isArray$3(obj);
  var xs = [];
  if (isArr) {
    xs.length = obj.length;
    for (var i = 0; i < obj.length; i++) {
      xs[i] = has$3(obj, i) ? inspect2(obj[i], obj) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k2 = 0; k2 < syms.length; k2++) {
      symMap["$" + syms[k2]] = syms[k2];
    }
  }
  for (var key in obj) {
    if (!has$3(obj, key)) {
      continue;
    }
    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
      continue;
    } else if ($test.call(/[^\w$]/, key)) {
      xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
    } else {
      xs.push(key + ": " + inspect2(obj[key], obj));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
      }
    }
  }
  return xs;
}
var inspect$3 = objectInspect;
var $TypeError$5 = type;
var listGetNode = function(list, key, isDelete) {
  var prev = list;
  var curr;
  for (; (curr = prev.next) != null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      if (!isDelete) {
        curr.next = /** @type {NonNullable<typeof list.next>} */
        list.next;
        list.next = curr;
      }
      return curr;
    }
  }
};
var listGet = function(objects, key) {
  if (!objects) {
    return void 0;
  }
  var node = listGetNode(objects, key);
  return node && node.value;
};
var listSet = function(objects, key, value) {
  var node = listGetNode(objects, key);
  if (node) {
    node.value = value;
  } else {
    objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key) {
  if (!objects) {
    return false;
  }
  return !!listGetNode(objects, key);
};
var listDelete = function(objects, key) {
  if (objects) {
    return listGetNode(objects, key, true);
  }
};
var sideChannelList = function getSideChannelList() {
  var $o;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError$5("Side channel does not contain " + inspect$3(key));
      }
    },
    "delete": function(key) {
      var root2 = $o && $o.next;
      var deletedNode = listDelete($o, key);
      if (deletedNode && root2 && root2 === deletedNode) {
        $o = void 0;
      }
      return !!deletedNode;
    },
    get: function(key) {
      return listGet($o, key);
    },
    has: function(key) {
      return listHas($o, key);
    },
    set: function(key, value) {
      if (!$o) {
        $o = {
          next: void 0
        };
      }
      listSet(
        /** @type {NonNullable<typeof $o>} */
        $o,
        key,
        value
      );
    }
  };
  return channel;
};
var esObjectAtoms = Object;
var esErrors = Error;
var _eval = EvalError;
var range = RangeError;
var ref = ReferenceError;
var syntax = SyntaxError;
var uri = URIError;
var abs$1 = Math.abs;
var floor$1 = Math.floor;
var max$1 = Math.max;
var min$1 = Math.min;
var pow$1 = Math.pow;
var round$1 = Math.round;
var _isNaN = Number.isNaN || function isNaN2(a) {
  return a !== a;
};
var $isNaN = _isNaN;
var sign$1 = function sign(number) {
  if ($isNaN(number) || number === 0) {
    return number;
  }
  return number < 0 ? -1 : 1;
};
var gOPD = Object.getOwnPropertyDescriptor;
var $gOPD$1 = gOPD;
if ($gOPD$1) {
  try {
    $gOPD$1([], "length");
  } catch (e) {
    $gOPD$1 = null;
  }
}
var gopd = $gOPD$1;
var $defineProperty$1 = Object.defineProperty || false;
if ($defineProperty$1) {
  try {
    $defineProperty$1({}, "a", { value: 1 });
  } catch (e) {
    $defineProperty$1 = false;
  }
}
var esDefineProperty = $defineProperty$1;
var shams;
var hasRequiredShams;
function requireShams() {
  if (hasRequiredShams) return shams;
  hasRequiredShams = 1;
  shams = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (var _ in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(obj, sym)
      );
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  return shams;
}
var hasSymbols$1;
var hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols$1;
  hasRequiredHasSymbols = 1;
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = requireShams();
  hasSymbols$1 = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  return hasSymbols$1;
}
var Reflect_getPrototypeOf;
var hasRequiredReflect_getPrototypeOf;
function requireReflect_getPrototypeOf() {
  if (hasRequiredReflect_getPrototypeOf) return Reflect_getPrototypeOf;
  hasRequiredReflect_getPrototypeOf = 1;
  Reflect_getPrototypeOf = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  return Reflect_getPrototypeOf;
}
var Object_getPrototypeOf;
var hasRequiredObject_getPrototypeOf;
function requireObject_getPrototypeOf() {
  if (hasRequiredObject_getPrototypeOf) return Object_getPrototypeOf;
  hasRequiredObject_getPrototypeOf = 1;
  var $Object2 = esObjectAtoms;
  Object_getPrototypeOf = $Object2.getPrototypeOf || null;
  return Object_getPrototypeOf;
}
var implementation;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr2 = Object.prototype.toString;
  var max2 = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i += 1) {
      arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
      arr[j + a.length] = b[j];
    }
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
      arr[j] = arrLike[i];
    }
    return arr;
  };
  var joiny = function(arr, joiner) {
    var str = "";
    for (var i = 0; i < arr.length; i += 1) {
      str += arr[i];
      if (i + 1 < arr.length) {
        str += joiner;
      }
    }
    return str;
  };
  implementation = function bind2(that) {
    var target = this;
    if (typeof target !== "function" || toStr2.apply(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          concatty(args, arguments)
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      }
      return target.apply(
        that,
        concatty(args, arguments)
      );
    };
    var boundLength = max2(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = "$" + i;
    }
    bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  return implementation;
}
var functionBind;
var hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind) return functionBind;
  hasRequiredFunctionBind = 1;
  var implementation2 = requireImplementation();
  functionBind = Function.prototype.bind || implementation2;
  return functionBind;
}
var functionCall;
var hasRequiredFunctionCall;
function requireFunctionCall() {
  if (hasRequiredFunctionCall) return functionCall;
  hasRequiredFunctionCall = 1;
  functionCall = Function.prototype.call;
  return functionCall;
}
var functionApply;
var hasRequiredFunctionApply;
function requireFunctionApply() {
  if (hasRequiredFunctionApply) return functionApply;
  hasRequiredFunctionApply = 1;
  functionApply = Function.prototype.apply;
  return functionApply;
}
var reflectApply = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
var bind$2 = requireFunctionBind();
var $apply$1 = requireFunctionApply();
var $call$2 = requireFunctionCall();
var $reflectApply = reflectApply;
var actualApply = $reflectApply || bind$2.call($call$2, $apply$1);
var bind$1 = requireFunctionBind();
var $TypeError$4 = type;
var $call$1 = requireFunctionCall();
var $actualApply = actualApply;
var callBindApplyHelpers = function callBindBasic(args) {
  if (args.length < 1 || typeof args[0] !== "function") {
    throw new $TypeError$4("a function is required");
  }
  return $actualApply(bind$1, $call$1, args);
};
var get;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return get;
  hasRequiredGet = 1;
  var callBind = callBindApplyHelpers;
  var gOPD2 = gopd;
  var hasProtoAccessor;
  try {
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (e) {
    if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
      throw e;
    }
  }
  var desc = !!hasProtoAccessor && gOPD2 && gOPD2(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  );
  var $Object2 = Object;
  var $getPrototypeOf = $Object2.getPrototypeOf;
  get = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
    /** @type {import('./get')} */
    function getDunder(value) {
      return $getPrototypeOf(value == null ? value : $Object2(value));
    }
  ) : false;
  return get;
}
var getProto$1;
var hasRequiredGetProto;
function requireGetProto() {
  if (hasRequiredGetProto) return getProto$1;
  hasRequiredGetProto = 1;
  var reflectGetProto = requireReflect_getPrototypeOf();
  var originalGetProto = requireObject_getPrototypeOf();
  var getDunderProto = requireGet();
  getProto$1 = reflectGetProto ? function getProto2(O) {
    return reflectGetProto(O);
  } : originalGetProto ? function getProto2(O) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new TypeError("getProto: not an object");
    }
    return originalGetProto(O);
  } : getDunderProto ? function getProto2(O) {
    return getDunderProto(O);
  } : null;
  return getProto$1;
}
var hasown;
var hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind2 = requireFunctionBind();
  hasown = bind2.call(call, $hasOwn);
  return hasown;
}
var undefined$1;
var $Object = esObjectAtoms;
var $Error = esErrors;
var $EvalError = _eval;
var $RangeError = range;
var $ReferenceError = ref;
var $SyntaxError = syntax;
var $TypeError$3 = type;
var $URIError = uri;
var abs = abs$1;
var floor = floor$1;
var max = max$1;
var min = min$1;
var pow = pow$1;
var round = round$1;
var sign2 = sign$1;
var $Function = Function;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD = gopd;
var $defineProperty = esDefineProperty;
var throwTypeError = function() {
  throw new $TypeError$3();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols = requireHasSymbols()();
var getProto = requireGetProto();
var $ObjectGPO = requireObject_getPrototypeOf();
var $ReflectGPO = requireReflect_getPrototypeOf();
var $apply = requireFunctionApply();
var $call = requireFunctionCall();
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined$1 : getProto(Uint8Array);
var INTRINSICS = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": $Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": $EvalError,
  "%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": $Object,
  "%Object.getOwnPropertyDescriptor%": $gOPD,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": $RangeError,
  "%ReferenceError%": $ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$3,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": $URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
  "%Function.prototype.call%": $call,
  "%Function.prototype.apply%": $apply,
  "%Object.defineProperty%": $defineProperty,
  "%Object.getPrototypeOf%": $ObjectGPO,
  "%Math.abs%": abs,
  "%Math.floor%": floor,
  "%Math.max%": max,
  "%Math.min%": min,
  "%Math.pow%": pow,
  "%Math.round%": round,
  "%Math.sign%": sign2,
  "%Reflect.getPrototypeOf%": $ReflectGPO
};
if (getProto) {
  try {
    null.error;
  } catch (e) {
    var errorProto = getProto(getProto(e));
    INTRINSICS["%Error.prototype%"] = errorProto;
  }
}
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen && getProto) {
      value = getProto(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind = requireFunctionBind();
var hasOwn = requireHasown();
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace(string, rePropName, function(match, number, quote2, subString) {
    result[result.length] = quote2 ? $replace(subString, reEscapeChar, "$1") : number || match;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$3("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError$3("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$3('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$3("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var GetIntrinsic$2 = getIntrinsic;
var callBindBasic2 = callBindApplyHelpers;
var $indexOf = callBindBasic2([GetIntrinsic$2("%String.prototype.indexOf%")]);
var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    GetIntrinsic$2(name, !!allowMissing)
  );
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBindBasic2(
      /** @type {const} */
      [intrinsic]
    );
  }
  return intrinsic;
};
var GetIntrinsic$1 = getIntrinsic;
var callBound$1 = callBound$2;
var inspect$2 = objectInspect;
var $TypeError$2 = type;
var $Map = GetIntrinsic$1("%Map%", true);
var $mapGet = callBound$1("Map.prototype.get", true);
var $mapSet = callBound$1("Map.prototype.set", true);
var $mapHas = callBound$1("Map.prototype.has", true);
var $mapDelete = callBound$1("Map.prototype.delete", true);
var $mapSize = callBound$1("Map.prototype.size", true);
var sideChannelMap = !!$Map && /** @type {Exclude<import('.'), false>} */
function getSideChannelMap() {
  var $m;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError$2("Side channel does not contain " + inspect$2(key));
      }
    },
    "delete": function(key) {
      if ($m) {
        var result = $mapDelete($m, key);
        if ($mapSize($m) === 0) {
          $m = void 0;
        }
        return result;
      }
      return false;
    },
    get: function(key) {
      if ($m) {
        return $mapGet($m, key);
      }
    },
    has: function(key) {
      if ($m) {
        return $mapHas($m, key);
      }
      return false;
    },
    set: function(key, value) {
      if (!$m) {
        $m = new $Map();
      }
      $mapSet($m, key, value);
    }
  };
  return channel;
};
var GetIntrinsic2 = getIntrinsic;
var callBound = callBound$2;
var inspect$1 = objectInspect;
var getSideChannelMap$1 = sideChannelMap;
var $TypeError$1 = type;
var $WeakMap = GetIntrinsic2("%WeakMap%", true);
var $weakMapGet = callBound("WeakMap.prototype.get", true);
var $weakMapSet = callBound("WeakMap.prototype.set", true);
var $weakMapHas = callBound("WeakMap.prototype.has", true);
var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
var sideChannelWeakmap = $WeakMap ? (
  /** @type {Exclude<import('.'), false>} */
  function getSideChannelWeakMap() {
    var $wm;
    var $m;
    var channel = {
      assert: function(key) {
        if (!channel.has(key)) {
          throw new $TypeError$1("Side channel does not contain " + inspect$1(key));
        }
      },
      "delete": function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapDelete($wm, key);
          }
        } else if (getSideChannelMap$1) {
          if ($m) {
            return $m["delete"](key);
          }
        }
        return false;
      },
      get: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapGet($wm, key);
          }
        }
        return $m && $m.get(key);
      },
      has: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapHas($wm, key);
          }
        }
        return !!$m && $m.has(key);
      },
      set: function(key, value) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if (!$wm) {
            $wm = new $WeakMap();
          }
          $weakMapSet($wm, key, value);
        } else if (getSideChannelMap$1) {
          if (!$m) {
            $m = getSideChannelMap$1();
          }
          $m.set(key, value);
        }
      }
    };
    return channel;
  }
) : getSideChannelMap$1;
var $TypeError = type;
var inspect = objectInspect;
var getSideChannelList2 = sideChannelList;
var getSideChannelMap2 = sideChannelMap;
var getSideChannelWeakMap2 = sideChannelWeakmap;
var makeChannel = getSideChannelWeakMap2 || getSideChannelMap2 || getSideChannelList2;
var sideChannel = function getSideChannel() {
  var $channelData;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError("Side channel does not contain " + inspect(key));
      }
    },
    "delete": function(key) {
      return !!$channelData && $channelData["delete"](key);
    },
    get: function(key) {
      return $channelData && $channelData.get(key);
    },
    has: function(key) {
      return !!$channelData && $channelData.has(key);
    },
    set: function(key, value) {
      if (!$channelData) {
        $channelData = makeChannel();
      }
      $channelData.set(key, value);
    }
  };
  return channel;
};
var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
};
var formats$3 = {
  "default": Format.RFC3986,
  formatters: {
    RFC1738: function(value) {
      return replace.call(value, percentTwenties, "+");
    },
    RFC3986: function(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};
var formats$2 = formats$3;
var has$2 = Object.prototype.hasOwnProperty;
var isArray$2 = Array.isArray;
var hexTable = function() {
  var array = [];
  for (var i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
}();
var compactQueue = function compactQueue2(queue2) {
  while (queue2.length > 1) {
    var item = queue2.pop();
    var obj = item.obj[item.prop];
    if (isArray$2(obj)) {
      var compacted = [];
      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== "undefined") {
          compacted.push(obj[j]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
};
var arrayToObject = function arrayToObject2(source, options) {
  var obj = options && options.plainObjects ? { __proto__: null } : {};
  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== "undefined") {
      obj[i] = source[i];
    }
  }
  return obj;
};
var merge = function merge2(target, source, options) {
  if (!source) {
    return target;
  }
  if (typeof source !== "object" && typeof source !== "function") {
    if (isArray$2(target)) {
      target.push(source);
    } else if (target && typeof target === "object") {
      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }
    return target;
  }
  if (!target || typeof target !== "object") {
    return [target].concat(source);
  }
  var mergeTarget = target;
  if (isArray$2(target) && !isArray$2(source)) {
    mergeTarget = arrayToObject(target, options);
  }
  if (isArray$2(target) && isArray$2(source)) {
    source.forEach(function(item, i) {
      if (has$2.call(target, i)) {
        var targetItem = target[i];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          target[i] = merge2(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }
  return Object.keys(source).reduce(function(acc, key) {
    var value = source[key];
    if (has$2.call(acc, key)) {
      acc[key] = merge2(acc[key], value, options);
    } else {
      acc[key] = value;
    }
    return acc;
  }, mergeTarget);
};
var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function(acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};
var decode = function(str, defaultDecoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, " ");
  if (charset === "iso-8859-1") {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};
var limit = 1024;
var encode = function encode2(str, defaultEncoder, charset, kind, format) {
  if (str.length === 0) {
    return str;
  }
  var string = str;
  if (typeof str === "symbol") {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string = String(str);
  }
  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  var out = "";
  for (var j = 0; j < string.length; j += limit) {
    var segment = string.length >= limit ? string.slice(j, j + limit) : string;
    var arr = [];
    for (var i = 0; i < segment.length; ++i) {
      var c = segment.charCodeAt(i);
      if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats$2.RFC1738 && (c === 40 || c === 41)) {
        arr[arr.length] = segment.charAt(i);
        continue;
      }
      if (c < 128) {
        arr[arr.length] = hexTable[c];
        continue;
      }
      if (c < 2048) {
        arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
        continue;
      }
      if (c < 55296 || c >= 57344) {
        arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
        continue;
      }
      i += 1;
      c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
      arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
    }
    out += arr.join("");
  }
  return out;
};
var compact = function compact2(value) {
  var queue2 = [{ obj: { o: value }, prop: "o" }];
  var refs = [];
  for (var i = 0; i < queue2.length; ++i) {
    var item = queue2[i];
    var obj = item.obj[item.prop];
    var keys2 = Object.keys(obj);
    for (var j = 0; j < keys2.length; ++j) {
      var key = keys2[j];
      var val = obj[key];
      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        queue2.push({ obj, prop: key });
        refs.push(val);
      }
    }
  }
  compactQueue(queue2);
  return value;
};
var isRegExp = function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
};
var isBuffer = function isBuffer2(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};
var combine = function combine2(a, b) {
  return [].concat(a, b);
};
var maybeMap = function maybeMap2(val, fn) {
  if (isArray$2(val)) {
    var mapped = [];
    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
};
var utils$2 = {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode,
  isBuffer,
  isRegExp,
  maybeMap,
  merge
};
var getSideChannel2 = sideChannel;
var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + "[]";
  },
  comma: "comma",
  indices: function indices(prefix, key) {
    return prefix + "[" + key + "]";
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$1 = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = formats$1["default"];
var defaults$1 = {
  addQueryPrefix: false,
  allowDots: false,
  allowEmptyArrays: false,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: false,
  commaRoundTrip: false,
  delimiter: "&",
  encode: true,
  encodeDotInKeys: false,
  encoder: utils$1.encode,
  encodeValuesOnly: false,
  filter: void 0,
  format: defaultFormat,
  formatter: formats$1.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
};
var sentinel = {};
var stringify$1 = function stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter3, sort, allowDots, serializeDate2, format, formatter, encodeValuesOnly, charset, sideChannel2) {
  var obj = object;
  var tmpSc = sideChannel2;
  var step = 0;
  var findFlag = false;
  while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
    var pos = tmpSc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        findFlag = true;
      }
    }
    if (typeof tmpSc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter3 === "function") {
    obj = filter3(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate2(obj);
  } else if (generateArrayPrefix === "comma" && isArray$1(obj)) {
    obj = utils$1.maybeMap(obj, function(value2) {
      if (value2 instanceof Date) {
        return serializeDate2(value2);
      }
      return value2;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, "key", format) : prefix;
    }
    obj = "";
  }
  if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, "key", format);
      return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$1.encoder, charset, "value", format))];
    }
    return [formatter(prefix) + "=" + formatter(String(obj))];
  }
  var values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  var objKeys;
  if (generateArrayPrefix === "comma" && isArray$1(obj)) {
    if (encodeValuesOnly && encoder) {
      obj = utils$1.maybeMap(obj, encoder);
    }
    objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray$1(filter3)) {
    objKeys = filter3;
  } else {
    var keys2 = Object.keys(obj);
    objKeys = sort ? keys2.sort(sort) : keys2;
  }
  var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
  var adjustedPrefix = commaRoundTrip && isArray$1(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
  if (allowEmptyArrays && isArray$1(obj) && obj.length === 0) {
    return adjustedPrefix + "[]";
  }
  for (var j = 0; j < objKeys.length; ++j) {
    var key = objKeys[j];
    var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
    if (skipNulls && value === null) {
      continue;
    }
    var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
    var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
    sideChannel2.set(object, step);
    var valueSideChannel = getSideChannel2();
    valueSideChannel.set(sentinel, sideChannel2);
    pushToArray(values, stringify(
      value,
      keyPrefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      generateArrayPrefix === "comma" && encodeValuesOnly && isArray$1(obj) ? null : encoder,
      filter3,
      sort,
      allowDots,
      serializeDate2,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
};
var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
  if (!opts) {
    return defaults$1;
  }
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  var charset = opts.charset || defaults$1.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var format = formats$1["default"];
  if (typeof opts.format !== "undefined") {
    if (!has$1.call(formats$1.formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  var formatter = formats$1.formatters[format];
  var filter3 = defaults$1.filter;
  if (typeof opts.filter === "function" || isArray$1(opts.filter)) {
    filter3 = opts.filter;
  }
  var arrayFormat;
  if (opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if ("indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = defaults$1.arrayFormat;
  }
  if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults$1.allowDots : !!opts.allowDots;
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults$1.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
    commaRoundTrip: !!opts.commaRoundTrip,
    delimiter: typeof opts.delimiter === "undefined" ? defaults$1.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults$1.encode,
    encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults$1.encodeDotInKeys,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$1.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
    filter: filter3,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$1.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$1.skipNulls,
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling
  };
};
var stringify_1 = function(object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter3;
  if (typeof options.filter === "function") {
    filter3 = options.filter;
    obj = filter3("", obj);
  } else if (isArray$1(options.filter)) {
    filter3 = options.filter;
    objKeys = filter3;
  }
  var keys2 = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
  var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
  if (!objKeys) {
    objKeys = Object.keys(obj);
  }
  if (options.sort) {
    objKeys.sort(options.sort);
  }
  var sideChannel2 = getSideChannel2();
  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    var value = obj[key];
    if (options.skipNulls && value === null) {
      continue;
    }
    pushToArray(keys2, stringify$1(
      value,
      key,
      generateArrayPrefix,
      commaRoundTrip,
      options.allowEmptyArrays,
      options.strictNullHandling,
      options.skipNulls,
      options.encodeDotInKeys,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel2
    ));
  }
  var joined = keys2.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
};
var utils = utils$2;
var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;
var defaults = {
  allowDots: false,
  allowEmptyArrays: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: false,
  comma: false,
  decodeDotInKeys: false,
  decoder: utils.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1e3,
  parseArrays: true,
  plainObjects: false,
  strictDepth: false,
  strictNullHandling: false,
  throwOnLimitExceeded: false
};
var interpretNumericEntities = function(str) {
  return str.replace(/&#(\d+);/g, function($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};
var parseArrayValue = function(val, options, currentArrayLength) {
  if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
    return val.split(",");
  }
  if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
    throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
  }
  return val;
};
var isoSentinel = "utf8=%26%2310003%3B";
var charsetSentinel = "utf8=%E2%9C%93";
var parseValues = function parseQueryStringValues(str, options) {
  var obj = { __proto__: null };
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
  cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var limit2 = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
  var parts = cleanStr.split(
    options.delimiter,
    options.throwOnLimitExceeded ? limit2 + 1 : limit2
  );
  if (options.throwOnLimitExceeded && parts.length > limit2) {
    throw new RangeError("Parameter limit exceeded. Only " + limit2 + " parameter" + (limit2 === 1 ? "" : "s") + " allowed.");
  }
  var skipIndex = -1;
  var i;
  var charset = options.charset;
  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf("utf8=") === 0) {
        if (parts[i] === charsetSentinel) {
          charset = "utf-8";
        } else if (parts[i] === isoSentinel) {
          charset = "iso-8859-1";
        }
        skipIndex = i;
        i = parts.length;
      }
    }
  }
  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }
    var part = parts[i];
    var bracketEqualsPos = part.indexOf("]=");
    var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
    var key;
    var val;
    if (pos === -1) {
      key = options.decoder(part, defaults.decoder, charset, "key");
      val = options.strictNullHandling ? null : "";
    } else {
      key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
      val = utils.maybeMap(
        parseArrayValue(
          part.slice(pos + 1),
          options,
          isArray(obj[key]) ? obj[key].length : 0
        ),
        function(encodedVal) {
          return options.decoder(encodedVal, defaults.decoder, charset, "value");
        }
      );
    }
    if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
      val = interpretNumericEntities(String(val));
    }
    if (part.indexOf("[]=") > -1) {
      val = isArray(val) ? [val] : val;
    }
    var existing = has.call(obj, key);
    if (existing && options.duplicates === "combine") {
      obj[key] = utils.combine(obj[key], val);
    } else if (!existing || options.duplicates === "last") {
      obj[key] = val;
    }
  }
  return obj;
};
var parseObject = function(chain, val, options, valuesParsed) {
  var currentArrayLength = 0;
  if (chain.length > 0 && chain[chain.length - 1] === "[]") {
    var parentKey = chain.slice(0, -1).join("");
    currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
  }
  var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root2 = chain[i];
    if (root2 === "[]" && options.parseArrays) {
      obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine([], leaf);
    } else {
      obj = options.plainObjects ? { __proto__: null } : {};
      var cleanRoot = root2.charAt(0) === "[" && root2.charAt(root2.length - 1) === "]" ? root2.slice(1, -1) : root2;
      var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
      var index = parseInt(decodedRoot, 10);
      if (!options.parseArrays && decodedRoot === "") {
        obj = { 0: leaf };
      } else if (!isNaN(index) && root2 !== decodedRoot && String(index) === decodedRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
        obj = [];
        obj[index] = leaf;
      } else if (decodedRoot !== "__proto__") {
        obj[decodedRoot] = leaf;
      }
    }
    leaf = obj;
  }
  return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  }
  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
  var brackets2 = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g;
  var segment = options.depth > 0 && brackets2.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key;
  var keys2 = [];
  if (parent) {
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys2.push(parent);
  }
  var i = 0;
  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;
    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys2.push(segment[1]);
  }
  if (segment) {
    if (options.strictDepth === true) {
      throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
    }
    keys2.push("[" + key.slice(segment.index) + "]");
  }
  return parseObject(keys2, val, options, valuesParsed);
};
var normalizeParseOptions = function normalizeParseOptions2(opts) {
  if (!opts) {
    return defaults;
  }
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
    throw new TypeError("Decoder has to be a function.");
  }
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
    throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
  }
  var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
  var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
  if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
    throw new TypeError("The duplicates option must be either combine, first, or last");
  }
  var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
  return {
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
    allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
    allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
    arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
    decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
    decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
    delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
    duplicates,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
    strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling,
    throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
  };
};
var parse$1 = function(str, opts) {
  var options = normalizeParseOptions(opts);
  if (str === "" || str === null || typeof str === "undefined") {
    return options.plainObjects ? { __proto__: null } : {};
  }
  var tempObj = typeof str === "string" ? parseValues(str, options) : str;
  var obj = options.plainObjects ? { __proto__: null } : {};
  var keys2 = Object.keys(tempObj);
  for (var i = 0; i < keys2.length; ++i) {
    var key = keys2[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
    obj = utils.merge(obj, newObj, options);
  }
  if (options.allowSparse === true) {
    return obj;
  }
  return utils.compact(obj);
};
var stringify2 = stringify_1;
var parse = parse$1;
var formats = formats$3;
var lib = {
  formats,
  parse,
  stringify: stringify2
};
var punycode = punycodeExports;
function Url$1() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}
var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, delims = [
  "<",
  ">",
  '"',
  "`",
  " ",
  "\r",
  "\n",
  "	"
], unwise = [
  "{",
  "}",
  "|",
  "\\",
  "^",
  "`"
].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = [
  "%",
  "/",
  "?",
  ";",
  "#"
].concat(autoEscape), hostEndingChars = [
  "/",
  "?",
  "#"
], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
  javascript: true,
  "javascript:": true
}, hostlessProtocol = {
  javascript: true,
  "javascript:": true
}, slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
}, querystring = lib;
function urlParse(url2, parseQueryString, slashesDenoteHost) {
  if (url2 && typeof url2 === "object" && url2 instanceof Url$1) {
    return url2;
  }
  var u = new Url$1();
  u.parse(url2, parseQueryString, slashesDenoteHost);
  return u;
}
Url$1.prototype.parse = function(url2, parseQueryString, slashesDenoteHost) {
  if (typeof url2 !== "string") {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url2);
  }
  var queryIndex = url2.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url2.indexOf("#") ? "?" : "#", uSplit = url2.split(splitter), slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, "/");
  url2 = uSplit.join(splitter);
  var rest = url2;
  rest = rest.trim();
  if (!slashesDenoteHost && url2.split("#").length === 1) {
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = "";
        this.query = {};
      }
      return this;
    }
  }
  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@/]+@[^@/]+/)) {
    var slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    var auth, atSign;
    if (hostEnd === -1) {
      atSign = rest.lastIndexOf("@");
    } else {
      atSign = rest.lastIndexOf("@", hostEnd);
    }
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }
    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    this.parseHost();
    this.hostname = this.hostname || "";
    var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) {
          continue;
        }
        if (!part.match(hostnamePartPattern)) {
          var newpart = "";
          for (var j = 0, k2 = part.length; j < k2; j++) {
            if (part.charCodeAt(j) > 127) {
              newpart += "x";
            } else {
              newpart += part[j];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = "/" + notHost.join(".") + rest;
            }
            this.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = "";
    } else {
      this.hostname = this.hostname.toLowerCase();
    }
    if (!ipv6Hostname) {
      this.hostname = punycode.toASCII(this.hostname);
    }
    var p2 = this.port ? ":" + this.port : "";
    var h2 = this.hostname || "";
    this.host = h2 + p2;
    this.href += this.host;
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== "/") {
        rest = "/" + rest;
      }
    }
  }
  if (!unsafeProtocol[lowerProto]) {
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1) {
        continue;
      }
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }
  var hash = rest.indexOf("#");
  if (hash !== -1) {
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf("?");
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    this.search = "";
    this.query = {};
  }
  if (rest) {
    this.pathname = rest;
  }
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = "/";
  }
  if (this.pathname || this.search) {
    var p2 = this.pathname || "";
    var s = this.search || "";
    this.path = p2 + s;
  }
  this.href = this.format();
  return this;
};
function urlFormat(obj) {
  if (typeof obj === "string") {
    obj = urlParse(obj);
  }
  if (!(obj instanceof Url$1)) {
    return Url$1.prototype.format.call(obj);
  }
  return obj.format();
}
Url$1.prototype.format = function() {
  var auth = this.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
    if (this.port) {
      host += ":" + this.port;
    }
  }
  if (this.query && typeof this.query === "object" && Object.keys(this.query).length) {
    query = querystring.stringify(this.query, {
      arrayFormat: "repeat",
      addQueryPrefix: false
    });
  }
  var search = this.search || query && "?" + query || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = "//" + (host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/" + pathname;
    }
  } else if (!host) {
    host = "";
  }
  if (hash && hash.charAt(0) !== "#") {
    hash = "#" + hash;
  }
  if (search && search.charAt(0) !== "?") {
    search = "?" + search;
  }
  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return protocol + host + pathname + search + hash;
};
function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}
Url$1.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};
function urlResolveObject(source, relative) {
  if (!source) {
    return relative;
  }
  return urlParse(source, false, true).resolveObject(relative);
}
Url$1.prototype.resolveObject = function(relative) {
  if (typeof relative === "string") {
    var rel = new Url$1();
    rel.parse(relative, false, true);
    relative = rel;
  }
  var result = new Url$1();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }
  result.hash = relative.hash;
  if (relative.href === "") {
    result.href = result.format();
    return result;
  }
  if (relative.slashes && !relative.protocol) {
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== "protocol") {
        result[rkey] = relative[rkey];
      }
    }
    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.pathname = "/";
      result.path = result.pathname;
    }
    result.href = result.format();
    return result;
  }
  if (relative.protocol && relative.protocol !== result.protocol) {
    if (!slashedProtocol[relative.protocol]) {
      var keys2 = Object.keys(relative);
      for (var v = 0; v < keys2.length; v++) {
        var k2 = keys2[v];
        result[k2] = relative[k2];
      }
      result.href = result.format();
      return result;
    }
    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || "").split("/");
      while (relPath.length && !(relative.host = relPath.shift())) {
      }
      if (!relative.host) {
        relative.host = "";
      }
      if (!relative.hostname) {
        relative.hostname = "";
      }
      if (relPath[0] !== "") {
        relPath.unshift("");
      }
      if (relPath.length < 2) {
        relPath.unshift("");
      }
      result.pathname = relPath.join("/");
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || "";
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    if (result.pathname || result.search) {
      var p2 = result.pathname || "";
      var s = result.search || "";
      result.path = p2 + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }
  var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
  if (psychotic) {
    result.hostname = "";
    result.port = null;
    if (result.host) {
      if (srcPath[0] === "") {
        srcPath[0] = result.host;
      } else {
        srcPath.unshift(result.host);
      }
    }
    result.host = "";
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === "") {
          relPath[0] = relative.host;
        } else {
          relPath.unshift(relative.host);
        }
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
  }
  if (isRelAbs) {
    result.host = relative.host || relative.host === "" ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
  } else if (relPath.length) {
    if (!srcPath) {
      srcPath = [];
    }
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (relative.search != null) {
    if (psychotic) {
      result.host = srcPath.shift();
      result.hostname = result.host;
      var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.hostname = authInHost.shift();
        result.host = result.hostname;
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    if (result.pathname !== null || result.search !== null) {
      result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
    }
    result.href = result.format();
    return result;
  }
  if (!srcPath.length) {
    result.pathname = null;
    if (result.search) {
      result.path = "/" + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === ".") {
      srcPath.splice(i, 1);
    } else if (last === "..") {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift("..");
    }
  }
  if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
    srcPath.unshift("");
  }
  if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
    srcPath.push("");
  }
  var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
  if (psychotic) {
    result.hostname = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
    result.host = result.hostname;
    var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.hostname = authInHost.shift();
      result.host = result.hostname;
    }
  }
  mustEndAbs = mustEndAbs || result.host && srcPath.length;
  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift("");
  }
  if (srcPath.length > 0) {
    result.pathname = srcPath.join("/");
  } else {
    result.pathname = null;
    result.path = null;
  }
  if (result.pathname !== null || result.search !== null) {
    result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};
Url$1.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) {
    this.hostname = host;
  }
};
url.parse = urlParse;
url.resolve = urlResolve;
url.resolveObject = urlResolveObject;
url.format = urlFormat;
url.Url = Url$1;
var __extends = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p2 in b2) if (b2.hasOwnProperty(p2)) d2[p2] = b2[p2];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k2, k22) {
  if (k22 === void 0) k22 = k2;
  Object.defineProperty(o, k22, { enumerable: true, get: function() {
    return m[k2];
  } });
} : function(o, m, k2, k22) {
  if (k22 === void 0) k22 = k2;
  o[k22] = m[k2];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k2 in mod) if (k2 !== "default" && Object.hasOwnProperty.call(mod, k2)) __createBinding(result, mod, k2);
  }
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(browser$1, "__esModule", { value: true });
var base_1 = base;
var Url = __importStar(url);
function isRelativeUrl(url2) {
  var u = Url.parse(url2);
  return u.protocol === null && u.host === null && u.port === null;
}
function isSameOrigin(a, b) {
  var ua = Url.parse(a);
  var ub = Url.parse(b);
  return ua.protocol === ub.protocol && ua.hostname === ub.hostname && ua.port === ub.port;
}
var BrowserImage = (
  /** @class */
  function(_super) {
    __extends(BrowserImage2, _super);
    function BrowserImage2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserImage2.prototype._initCanvas = function() {
      var img = this.image;
      var canvas = this._canvas = document.createElement("canvas");
      var context = this._context = canvas.getContext("2d");
      canvas.className = "vibrant-canvas";
      canvas.style.display = "none";
      this._width = canvas.width = img.width;
      this._height = canvas.height = img.height;
      context.drawImage(img, 0, 0);
      document.body.appendChild(canvas);
    };
    BrowserImage2.prototype.load = function(image) {
      var _this = this;
      var img = null;
      var src = null;
      if (typeof image === "string") {
        img = document.createElement("img");
        if (!isRelativeUrl(image) && !isSameOrigin(window.location.href, image)) {
          img.crossOrigin = "anonymous";
        }
        src = img.src = image;
      } else if (image instanceof HTMLImageElement) {
        img = image;
        src = image.src;
      } else {
        return Promise.reject(new Error("Cannot load buffer as an image in browser"));
      }
      this.image = img;
      return new Promise(function(resolve2, reject) {
        var onImageLoad = function() {
          _this._initCanvas();
          resolve2(_this);
        };
        if (img.complete) {
          onImageLoad();
        } else {
          img.onload = onImageLoad;
          img.onerror = function(e) {
            return reject(new Error("Fail to load image: " + src));
          };
        }
      });
    };
    BrowserImage2.prototype.clear = function() {
      this._context.clearRect(0, 0, this._width, this._height);
    };
    BrowserImage2.prototype.update = function(imageData) {
      this._context.putImageData(imageData, 0, 0);
    };
    BrowserImage2.prototype.getWidth = function() {
      return this._width;
    };
    BrowserImage2.prototype.getHeight = function() {
      return this._height;
    };
    BrowserImage2.prototype.resize = function(targetWidth, targetHeight, ratio) {
      var _a = this, canvas = _a._canvas, context = _a._context, img = _a.image;
      this._width = canvas.width = targetWidth;
      this._height = canvas.height = targetHeight;
      context.scale(ratio, ratio);
      context.drawImage(img, 0, 0);
    };
    BrowserImage2.prototype.getPixelCount = function() {
      return this._width * this._height;
    };
    BrowserImage2.prototype.getImageData = function() {
      return this._context.getImageData(0, 0, this._width, this._height);
    };
    BrowserImage2.prototype.remove = function() {
      if (this._canvas && this._canvas.parentNode) {
        this._canvas.parentNode.removeChild(this._canvas);
      }
    };
    return BrowserImage2;
  }(base_1.ImageBase)
);
browser$1.default = BrowserImage;
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
var vibrant_1 = __importDefault(requireVibrant());
var browser_1 = __importDefault(browser$1);
vibrant_1.default.DefaultOpts.ImageClass = browser_1.default;
var browser = vibrant_1.default;
const Vibrant = /* @__PURE__ */ getDefaultExportFromCjs(browser);
const istoneColor = ref$1(false);
const tone_accent_color = ref$1("#0099ff");
const tone_chat_bubbles = ref$1("#0099ff");
const tone_chat_background = ref$1("#f2f2f2");
const tone_background_image = ref$1(null);
const confirmToneColor = async () => {
  accent_color.value = tone_accent_color.value;
  chat_bubbles.value = tone_chat_bubbles.value;
  chat_background.value = tone_chat_background.value;
  const color2 = {
    accent_color: accent_color.value,
    chat_bubbles: chat_bubbles.value,
    chat_background: chat_background.value
  };
  console.log("颜色样式", color2);
  await window.api.localColorStyle(color2).then(() => {
    window.api.sendStyle();
    istoneColor.value = false;
  }).catch((err) => {
    console.log(err);
  });
};
const accent_color = ref$1("#0099ff");
const chat_bubbles = ref$1("#0099ff");
const chat_background = ref$1("#f2f2f2");
const background_image = ref$1(null);
const ImgInput = ref$1();
const currentImageFile = ref$1(null);
const userColorStyle = async () => {
  const color2 = await window.api.searchColorStyle();
  const backgroundImage = await window.api.getBackgroundImage();
  accent_color.value = color2.accent_color;
  chat_bubbles.value = color2.chat_bubbles;
  chat_background.value = color2.chat_background;
  if (backgroundImage) {
    console.log("背景存在");
    const blob = new Blob([backgroundImage]);
    background_image.value = URL.createObjectURL(blob);
  } else {
    background_image.value = color2.background_image;
    console.log("背景不存在");
  }
  console.log(color2);
};
const confirmColor = async () => {
  const color2 = {
    accent_color: accent_color.value,
    chat_bubbles: chat_bubbles.value,
    chat_background: chat_background.value
  };
  if (currentImageFile.value) {
    try {
      const arrayBuffer = await readFileAsArrayBuffer(currentImageFile.value);
      await window.api.saveBackgroundImage(color2, arrayBuffer).then(async () => {
        console.log("颜色样式", color2);
        window.api.sendStyle();
        currentImageFile.value = null;
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.error("保存图片失败:", error);
    }
  } else {
    console.log("颜色样式", color2);
    await window.api.localColorStyle(color2).then(() => {
      window.api.sendStyle();
      istoneColor.value = false;
    }).catch((err) => {
      console.log(err);
    });
  }
};
const selectedButtonIndex = ref$1(0);
const buttonImg = () => {
  console.log("按钮");
  ImgInput.value.click();
};
const handleImageUpload = async (event) => {
  selectedButtonIndex.value = -1;
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    console.log("只能上传图片文件！");
    return;
  }
  currentImageFile.value = file;
  const imageUrl = URL.createObjectURL(file);
  background_image.value = imageUrl;
  console.log("图片url", imageUrl);
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    accent_color.value = palette.Vibrant?.hex || "#0099ff";
    chat_bubbles.value = palette.DarkVibrant?.hex || "#0099ff";
    chat_background.value = palette.LightVibrant?.hex || "#f2f2f2";
  } catch (error) {
    console.error("颜色提取失败:", error);
  }
};
const handleDefaultColor = async () => {
  accent_color.value = "#0099ff";
  chat_bubbles.value = accent_color.value;
  chat_background.value = "#f2f2f2";
  background_image.value = null;
};
const chooseColor = (color2, index) => {
  console.log(color2, index);
  accent_color.value = color2.accent_color;
  chat_bubbles.value = color2.chat_bubbles;
  chat_background.value = color2.chat_background;
  background_image.value = color2.background_image;
  selectedButtonIndex.value = index;
};
const findMatchingButtonIndex = () => {
  const currentValues = {
    accent_color: accent_color.value,
    chat_bubbles: chat_bubbles.value,
    chat_background: chat_background.value,
    background_image: background_image.value
  };
  return colorButton.value.findIndex(
    (button) => button.accent_color === currentValues.accent_color && button.chat_bubbles === currentValues.chat_bubbles && button.chat_background === currentValues.chat_background && button.background_image === currentValues.background_image
  );
};
const colorButton = ref$1([
  {
    name: "默认",
    accent_color: "#0099ff",
    chat_bubbles: "#0099ff",
    chat_background: "#f2f2f2",
    background_image: null
  },
  {
    name: "典雅黑",
    accent_color: "#0066cc",
    chat_bubbles: "#666666",
    chat_background: "#111111",
    background_image: null
  },
  {
    name: "粉色",
    accent_color: "#7f7384",
    chat_bubbles: "#7f7384",
    chat_background: "#d7ced8",
    background_image: null
  }
]);
const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve2, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve2(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
const selectedItem = ref$1("chat");
const selectItem = (itemName) => {
  console.log(itemName);
  selectedItem.value = itemName;
};
const webUrl = (url2) => {
  window.api.sendUrl(url2);
};
const _hoisted_1$e = { class: "body-sidebar" };
const _hoisted_2$e = ["src"];
const _hoisted_3$e = { class: "body-sidebar-list" };
const _hoisted_4$e = { class: "body-sidebar-button-list" };
const _hoisted_5$e = { class: "body-sidebar-button-list-svg-more-box-button" };
const _hoisted_6$e = { class: "body-sidebar-button-list-svg-more-box-button" };
const _sfc_main$f = {
  __name: "homeSidebar",
  setup(__props) {
    useCssVars((_ctx) => ({
      "0ec8a834": unref(accent_color)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        _cache[16] || (_cache[16] = createBaseVNode("div", { class: "body-sidebar-logo" }, "test", -1)),
        createBaseVNode("div", {
          ref_key: "MiniUserBoxButton",
          ref: MiniUserBoxButton,
          class: "body-sidebar-user_headshot",
          onClick: _cache[0] || (_cache[0] = withModifiers((...args) => unref(UserMiniBoxClick) && unref(UserMiniBoxClick)(...args), ["stop"]))
        }, [
          createBaseVNode("img", {
            src: unref(user).user_headshot,
            alt: ""
          }, null, 8, _hoisted_2$e),
          createVNode(UserMiniBox)
        ], 512),
        createBaseVNode("div", _hoisted_3$e, [
          createBaseVNode("div", {
            class: normalizeClass(["body-sidebar-list-svg", { selected: unref(selectedItem) === "chat" }]),
            title: "聊天消息",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(selectItem)("chat"))
          }, _cache[7] || (_cache[7] = [
            createBaseVNode("svg", {
              t: "1742349978084",
              class: "icon",
              viewBox: "0 0 1024 1024",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "p-id": "3237",
              width: "200",
              height: "200"
            }, [
              createBaseVNode("path", {
                d: "M938.666667 93.866667H85.333333c-17.066667 0-34.133333 17.066667-34.133333 34.133333v640c0 17.066667 12.8 34.133333 34.133333 34.133333h162.133334v76.8c0 12.8 4.266667 21.333333 17.066666 25.6 4.266667 4.266667 12.8 4.266667 17.066667 4.266667s8.533333 0 12.8-4.266667l204.8-102.4H938.666667c17.066667 0 34.133333-12.8 34.133333-34.133333V128c0-17.066667-17.066667-34.133333-34.133333-34.133333z m-34.133334 640h-418.133333c-4.266667 0-8.533333 0-12.8 4.266666l-166.4 85.333334V768c0-17.066667-12.8-34.133333-34.133333-34.133333H119.466667V162.133333h789.333333l-4.266667 571.733334z",
                "p-id": "3238"
              }),
              createBaseVNode("path", {
                d: "M298.666667 448m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z",
                "p-id": "3239"
              }),
              createBaseVNode("path", {
                d: "M512 448m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z",
                "p-id": "3240"
              }),
              createBaseVNode("path", {
                d: "M725.333333 448m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z",
                "p-id": "3241"
              })
            ], -1)
          ]), 2)
        ]),
        createBaseVNode("div", _hoisted_4$e, [
          createBaseVNode("div", {
            ref_key: "moreBoxButton",
            ref: moreBoxButton,
            class: "body-sidebar-button-list-svg",
            title: "更多",
            onClick: _cache[2] || (_cache[2] = withModifiers((...args) => unref(toggleMoreBox) && unref(toggleMoreBox)(...args), ["stop"]))
          }, _cache[8] || (_cache[8] = [
            createBaseVNode("svg", {
              t: "1742350764132",
              class: "icon",
              viewBox: "0 0 1024 1024",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "p-id": "3406",
              width: "200",
              height: "200"
            }, [
              createBaseVNode("path", {
                d: "M170.666667 285.866667h682.666666c17.066667 0 34.133333-12.8 34.133334-34.133334s-17.066667-29.866667-34.133334-29.866666H170.666667c-17.066667 0-34.133333 17.066667-34.133334 34.133333s17.066667 29.866667 34.133334 29.866667zM853.333333 477.866667H170.666667c-17.066667 0-34.133333 12.8-34.133334 34.133333s12.8 34.133333 34.133334 34.133333h682.666666c17.066667 0 34.133333-12.8 34.133334-34.133333s-17.066667-34.133333-34.133334-34.133333zM853.333333 733.866667H170.666667c-17.066667 0-34.133333 12.8-34.133334 34.133333s12.8 34.133333 34.133334 34.133333h682.666666c17.066667 0 34.133333-12.8 34.133334-34.133333s-17.066667-34.133333-34.133334-34.133333z",
                "p-id": "3407"
              })
            ], -1)
          ]), 512),
          _cache[15] || (_cache[15] = createBaseVNode("div", {
            class: "body-sidebar-button-list-svg",
            title: "收藏"
          }, [
            createBaseVNode("svg", {
              t: "1742911253062",
              class: "icon",
              viewBox: "0 0 1024 1024",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "p-id": "3235",
              width: "200",
              height: "200"
            }, [
              createBaseVNode("path", {
                d: "M968.533333 405.333333c-4.266667-12.8-12.8-21.333333-25.6-21.333333l-277.333333-42.666667-123.733333-251.733333c-4.266667-12.8-17.066667-17.066667-29.866667-17.066667-12.8 0-21.333333 8.533333-29.866667 17.066667l-123.733333 256-277.333333 38.4c-12.8 0-21.333333 8.533333-25.6 21.333333s0 25.6 8.533333 34.133334l200.533333 196.266666-46.933333 273.066667c0 12.8 4.266667 25.6 12.8 29.866667 4.266667 4.266667 12.8 4.266667 17.066667 4.266666 4.266667 0 8.533333 0 17.066666-4.266666l247.466667-132.266667 247.466667 132.266667c12.8 4.266667 25.6 4.266667 34.133333-4.266667 8.533333-8.533333 12.8-21.333333 12.8-29.866667l-46.933333-273.066666 200.533333-196.266667c8.533333-4.266667 12.8-17.066667 8.533333-29.866667z m-264.533333 196.266667c-8.533333 8.533333-12.8 17.066667-8.533333 29.866667l38.4 226.133333-204.8-110.933333c-4.266667-4.266667-8.533333-4.266667-17.066667-4.266667s-8.533333 0-17.066667 4.266667l-204.8 110.933333 38.4-226.133333c0-8.533333 0-21.333333-8.533333-29.866667l-166.4-166.4L384 401.066667c8.533333 0 21.333333-8.533333 25.6-17.066667L512 179.2l102.4 209.066667c4.266667 8.533333 12.8 17.066667 25.6 17.066666l230.4 34.133334-166.4 162.133333z",
                "p-id": "3236"
              })
            ])
          ], -1)),
          withDirectives(createBaseVNode("div", {
            ref_key: "moreBox",
            ref: moreBox,
            class: "body-sidebar-button-list-svg-more-box"
          }, [
            createBaseVNode("button", {
              class: "body-sidebar-button-list-svg-more-box-button",
              onClick: _cache[3] || (_cache[3] = (...args) => unref(appSet) && unref(appSet)(...args))
            }, [
              _cache[9] || (_cache[9] = createBaseVNode("div", { class: "body-sidebar-button-list-svg-more-box-button-svg" }, [
                createBaseVNode("svg", {
                  t: "1742370691609",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3237",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M921.6 320l-140.8-209.066667c-4.266667-8.533333-17.066667-12.8-25.6-12.8H640c-17.066667 0-34.133333 12.8-34.133333 34.133334 0 51.2-42.666667 93.866667-93.866667 93.866666-51.2 0-93.866667-42.666667-93.866667-93.866666 0-17.066667-12.8-34.133333-34.133333-34.133334H268.8c-12.8-4.266667-21.333333 4.266667-29.866667 12.8L102.4 320c-8.533333 12.8-8.533333 29.866667 4.266667 42.666667l110.933333 93.866666V896c0 17.066667 12.8 34.133333 34.133333 34.133333h524.8c17.066667 0 34.133333-12.8 34.133334-34.133333V456.533333l110.933333-93.866666c8.533333-12.8 8.533333-29.866667 0-42.666667z m-170.666667 98.133333c-8.533333 4.266667-12.8 17.066667-12.8 25.6v422.4H281.6v-422.4c0-8.533333-4.266667-17.066667-12.8-25.6L170.666667 332.8l115.2-170.666667h72.533333c12.8 72.533333 81.066667 128 157.866667 128 76.8 0 140.8-55.466667 157.866666-128h72.533334l115.2 170.666667-110.933334 85.333333z",
                    "p-id": "3238"
                  })
                ])
              ], -1)),
              createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[0].name), 1)
            ]),
            createBaseVNode("button", _hoisted_5$e, [
              _cache[10] || (_cache[10] = createBaseVNode("div", { class: "body-sidebar-button-list-svg-more-box-button-svg" }, [
                createBaseVNode("svg", {
                  t: "1742371927459",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "2321",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                    "p-id": "2322"
                  })
                ])
              ], -1)),
              createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[1].name), 1)
            ]),
            createBaseVNode("button", {
              class: "body-sidebar-button-list-svg-more-box-button",
              onClick: _cache[4] || (_cache[4] = (...args) => unref(appSet) && unref(appSet)(...args))
            }, [
              _cache[11] || (_cache[11] = createBaseVNode("div", { class: "body-sidebar-button-list-svg-more-box-button-svg" }, [
                createBaseVNode("svg", {
                  t: "1742372105669",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "7834",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M951.466667 375.466667c-4.266667-12.8-17.066667-21.333333-34.133334-21.333334-51.2 0-93.866667-42.666667-93.866666-93.866666 0-12.8 4.266667-29.866667 8.533333-42.666667 4.266667-12.8 4.266667-29.866667-8.533333-38.4-55.466667-51.2-119.466667-85.333333-187.733334-106.666667-17.066667-8.533333-29.866667 0-38.4 12.8-17.066667 34.133333-51.2 51.2-85.333333 51.2s-68.266667-17.066667-85.333333-51.2c-8.533333-12.8-21.333333-21.333333-38.4-17.066666-68.266667 21.333333-136.533333 59.733333-187.733334 106.666666-12.8 12.8-12.8 25.6-8.533333 38.4 8.533333 12.8 8.533333 25.6 8.533333 42.666667 0 51.2-42.666667 93.866667-98.133333 93.866667-12.8 0-25.6 8.533333-29.866667 21.333333-12.8 42.666667-21.333333 89.6-21.333333 136.533333 0 29.866667 4.266667 64 8.533333 93.866667 4.266667 17.066667 17.066667 25.6 34.133334 25.6 55.466667-4.266667 106.666667 38.4 106.666666 93.866667 0 21.333333-8.533333 42.666667-21.333333 64-8.533333 12.8-8.533333 29.866667 0 42.666666 55.466667 55.466667 123.733333 98.133333 200.533333 123.733334 17.066667 4.266667 34.133333-4.266667 38.4-21.333334 12.8-38.4 51.2-68.266667 89.6-68.266666 42.666667 0 76.8 25.6 89.6 68.266666 4.266667 12.8 17.066667 21.333333 29.866667 21.333334h8.533333c76.8-21.333333 145.066667-64 200.533334-123.733334 12.8-12.8 12.8-29.866667 0-42.666666-12.8-17.066667-21.333333-38.4-21.333334-64 0-55.466667 51.2-102.4 106.666667-93.866667 17.066667 0 29.866667-8.533333 34.133333-25.6 4.266667-29.866667 8.533333-59.733333 8.533334-93.866667 8.533333-42.666667 0-89.6-12.8-132.266666z m-46.933334 192c-81.066667 8.533333-145.066667 76.8-145.066666 157.866666 0 25.6 8.533333 55.466667 21.333333 76.8-38.4 34.133333-81.066667 59.733333-128 76.8-29.866667-51.2-81.066667-81.066667-140.8-81.066666s-110.933333 29.866667-140.8 81.066666c-46.933333-17.066667-89.6-42.666667-128-76.8 12.8-25.6 21.333333-51.2 21.333333-76.8 0-85.333333-64-153.6-145.066666-157.866666-4.266667-17.066667-4.266667-34.133333-4.266667-55.466667 0-34.133333 4.266667-64 12.8-98.133333C209.066667 405.333333 264.533333 337.066667 264.533333 256c0-17.066667-4.266667-34.133333-8.533333-46.933333 38.4-29.866667 81.066667-55.466667 128-72.533334 29.866667 38.4 76.8 64 128 64s98.133333-25.6 128-64c46.933333 17.066667 85.333333 38.4 123.733333 68.266667-4.266667 17.066667-8.533333 29.866667-8.533333 46.933333 0 81.066667 59.733333 145.066667 136.533333 157.866667 8.533333 29.866667 12.8 64 12.8 98.133333v59.733334z",
                    "p-id": "7835"
                  }),
                  createBaseVNode("path", {
                    d: "M512 332.8c-98.133333 0-179.2 81.066667-179.2 179.2 0 98.133333 81.066667 179.2 179.2 179.2 98.133333 0 179.2-81.066667 179.2-179.2 0-98.133333-81.066667-179.2-179.2-179.2z m0 298.666667c-64 0-119.466667-51.2-119.466667-119.466667s51.2-119.466667 119.466667-119.466667 119.466667 51.2 119.466667 119.466667-55.466667 119.466667-119.466667 119.466667z",
                    "p-id": "7836"
                  })
                ])
              ], -1)),
              createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[2].name), 1)
            ]),
            createBaseVNode("button", _hoisted_6$e, [
              _cache[12] || (_cache[12] = createBaseVNode("div", { class: "body-sidebar-button-list-svg-more-box-button-svg" }, [
                createBaseVNode("svg", {
                  t: "1742372166273",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "8003",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M512 264.533333c-76.8 0-136.533333 59.733333-136.533333 132.266667 0 17.066667 12.8 34.133333 34.133333 34.133333s34.133333-12.8 34.133333-34.133333c0-38.4 34.133333-68.266667 76.8-68.266667 38.4 0 76.8 34.133333 76.8 76.8 0 38.4-34.133333 68.266667-76.8 68.266667-17.066667 0-34.133333 12.8-34.133333 34.133333v68.266667c0 17.066667 12.8 34.133333 34.133333 34.133333s34.133333-12.8 34.133334-34.133333v-38.4c59.733333-12.8 106.666667-68.266667 106.666666-132.266667-12.8-76.8-72.533333-140.8-149.333333-140.8zM512 640c-29.866667 0-51.2 25.6-51.2 51.2s21.333333 55.466667 51.2 55.466667 51.2-25.6 51.2-51.2S541.866667 640 512 640z",
                    "p-id": "8004"
                  }),
                  createBaseVNode("path", {
                    d: "M512 51.2C260.266667 51.2 51.2 260.266667 51.2 512S260.266667 972.8 512 972.8 972.8 763.733333 972.8 512 763.733333 51.2 512 51.2z m0 853.333333c-217.6 0-392.533333-174.933333-392.533333-392.533333S294.4 119.466667 512 119.466667s392.533333 174.933333 392.533333 392.533333-174.933333 392.533333-392.533333 392.533333z",
                    "p-id": "8005"
                  })
                ])
              ], -1)),
              createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[3].name), 1)
            ]),
            createBaseVNode("button", {
              class: "body-sidebar-button-list-svg-more-box-button",
              onClick: _cache[5] || (_cache[5] = ($event) => unref(webUrl)("https://github.com/fish-bread/electron-vue-koa-qq"))
            }, [
              _cache[13] || (_cache[13] = createBaseVNode("div", { class: "body-sidebar-button-list-svg-more-box-button-svg" }, [
                createBaseVNode("svg", {
                  t: "1742372285012",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "8172",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M836.266667 187.733333c-85.333333-85.333333-200.533333-132.266667-324.266667-132.266666-123.733333 0-238.933333 46.933333-324.266667 132.266666S55.466667 388.266667 55.466667 512c0 123.733333 46.933333 238.933333 132.266666 324.266667s200.533333 132.266667 324.266667 132.266666c123.733333 0 238.933333-46.933333 324.266667-132.266666s132.266667-200.533333 132.266666-324.266667c4.266667-123.733333-46.933333-238.933333-132.266666-324.266667z m-46.933334 601.6c-72.533333 72.533333-174.933333 115.2-277.333333 115.2s-204.8-42.666667-277.333333-115.2c-72.533333-72.533333-115.2-174.933333-115.2-277.333333s42.666667-204.8 115.2-277.333333c72.533333-76.8 170.666667-115.2 277.333333-115.2s204.8 42.666667 277.333333 115.2c72.533333 72.533333 115.2 174.933333 115.2 277.333333s-38.4 204.8-115.2 277.333333z",
                    "p-id": "8173"
                  }),
                  createBaseVNode("path", {
                    d: "M512 290.133333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z",
                    "p-id": "8174"
                  }),
                  createBaseVNode("path", {
                    d: "M597.333333 691.2h-42.666666V426.666667c0-17.066667-12.8-34.133333-34.133334-34.133334h-42.666666c-17.066667 0-34.133333 12.8-34.133334 34.133334s12.8 34.133333 34.133334 34.133333h8.533333v234.666667h-42.666667c-17.066667 0-34.133333 12.8-34.133333 34.133333s12.8 34.133333 34.133333 34.133333H597.333333c17.066667 0 34.133333-12.8 34.133334-34.133333s-17.066667-38.4-34.133334-38.4z",
                    "p-id": "8175"
                  })
                ])
              ], -1)),
              createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[4].name), 1)
            ]),
            createBaseVNode("button", {
              class: "body-sidebar-button-list-svg-more-box-button",
              onClick: _cache[6] || (_cache[6] = (...args) => unref(loginOut) && unref(loginOut)(...args))
            }, [
              _cache[14] || (_cache[14] = createBaseVNode("div", { class: "body-sidebar-button-list-svg-more-box-button-svg" }, [
                createBaseVNode("svg", {
                  t: "1742372335780",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "8342",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M512 861.866667H162.133333V162.133333H512c17.066667 0 34.133333-12.8 34.133333-34.133333s-17.066667-34.133333-34.133333-34.133333H128c-17.066667 0-34.133333 17.066667-34.133333 34.133333v768c0 17.066667 12.8 34.133333 34.133333 34.133333h384c17.066667 0 34.133333-12.8 34.133333-34.133333s-17.066667-34.133333-34.133333-34.133333z",
                    "p-id": "8343"
                  }),
                  createBaseVNode("path", {
                    d: "M930.133333 512v-4.266667-8.533333c0-4.266667-4.266667-8.533333-8.533333-12.8L725.333333 298.666667c-12.8-12.8-34.133333-12.8-46.933333 0s-8.533333 29.866667 4.266667 42.666666l136.533333 136.533334H341.333333c-17.066667 0-34.133333 12.8-34.133333 34.133333s12.8 34.133333 34.133333 34.133333h477.866667L682.666667 682.666667c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l192-192c8.533333-8.533333 12.8-17.066667 12.8-25.6-4.266667 0 0 0 0 0z",
                    "p-id": "8344"
                  })
                ])
              ], -1)),
              createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[5].name), 1)
            ])
          ], 512), [
            [vShow, unref(showMoreBox)]
          ])
        ])
      ]);
    };
  }
};
const HomeSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-1d7a640e"]]);
const _hoisted_1$d = { class: "home-friend-user" };
const _hoisted_2$d = { class: "home-friend-user-search" };
const _hoisted_3$d = { class: "home-friend-user-search-friend" };
const _hoisted_4$d = { class: "home-friend-user-friend-list" };
const _hoisted_5$d = ["onClick"];
const _hoisted_6$d = { class: "home-friend-user-friend-list-user-img" };
const _hoisted_7$b = ["src"];
const _hoisted_8$8 = { class: "home-friend-user-friend-list-user-title" };
const _hoisted_9$8 = { class: "home-friend-user-friend-list-user-name" };
const _hoisted_10$7 = { class: "home-friend-user-friend-list-user-local" };
const _sfc_main$e = {
  __name: "homeFriendUser",
  setup(__props) {
    useCssVars((_ctx) => ({
      "912147e8": unref(accent_color)
    }));
    const isFocused = ref$1(false);
    onMounted(async () => {
      await window.api.updateWindow(async () => {
        console.log("执行好友更新函数");
        await initialize_user();
        await searchUserFriendAxios();
        console.log("好友列表已更新", user_friend.value, "user", user.value);
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        createBaseVNode("div", _hoisted_2$d, [
          createBaseVNode("div", {
            class: "home-friend-user-search-input",
            style: normalizeStyle({ border: isFocused.value ? "1px solid blue" : "1px solid khaki" })
          }, [
            _cache[7] || (_cache[7] = createBaseVNode("div", { class: "home-friend-user-search-svg" }, [
              createBaseVNode("svg", {
                t: "1741917977118",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3680",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M448 221.866667c-55.466667 0-106.666667 25.6-145.066667 64-8.533333 12.8-8.533333 34.133333 4.266667 46.933333 12.8 8.533333 34.133333 8.533333 46.933333-4.266667 21.333333-25.6 55.466667-38.4 93.866667-38.4s72.533333 12.8 93.866667 38.4c8.533333 8.533333 17.066667 12.8 25.6 12.8 8.533333 0 17.066667-4.266667 21.333333-8.533333 12.8-12.8 12.8-29.866667 4.266667-46.933333-38.4-38.4-89.6-64-145.066667-64z",
                  "p-id": "3681"
                }),
                createBaseVNode("path", {
                  d: "M908.8 832l-145.066667-145.066667c51.2-68.266667 81.066667-149.333333 81.066667-238.933333 0-217.6-174.933333-392.533333-392.533333-392.533333s-392.533333 174.933333-392.533334 392.533333 174.933333 392.533333 392.533334 392.533333c89.6 0 170.666667-29.866667 238.933333-81.066666l145.066667 145.066666c8.533333 8.533333 25.6 17.066667 38.4 17.066667s25.6-4.266667 38.4-17.066667c17.066667-17.066667 17.066667-51.2-4.266667-72.533333z m-789.333333-384c0-183.466667 149.333333-332.8 332.8-332.8s332.8 149.333333 332.8 332.8-149.333333 332.8-332.8 332.8-332.8-149.333333-332.8-332.8z",
                  "p-id": "3682"
                })
              ])
            ], -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(user_search) ? user_search.value = $event : null),
              class: "search-input",
              type: "text",
              placeholder: "搜索",
              onFocus: _cache[1] || (_cache[1] = ($event) => isFocused.value = true),
              onBlur: _cache[2] || (_cache[2] = ($event) => isFocused.value = false),
              onKeydown: _cache[3] || (_cache[3] = withKeys((...args) => unref(searchUserAxios) && unref(searchUserAxios)(...args), ["enter"]))
            }, null, 544), [
              [vModelText, unref(user_search)]
            ]),
            withDirectives(createBaseVNode("div", {
              class: "home-friend-user-search-svg",
              onClick: _cache[4] || (_cache[4] = (...args) => unref(clearInput) && unref(clearInput)(...args))
            }, _cache[6] || (_cache[6] = [
              createBaseVNode("svg", {
                t: "1741918074924",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3849",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                  "p-id": "3850"
                })
              ], -1)
            ]), 512), [
              [vShow, isFocused.value === true]
            ])
          ], 4),
          createBaseVNode("div", _hoisted_3$d, [
            createBaseVNode("button", {
              class: "home-friend-user-search-friend-button",
              onClick: _cache[5] || (_cache[5] = (...args) => unref(openSearch) && unref(openSearch)(...args))
            }, _cache[8] || (_cache[8] = [
              createBaseVNode("svg", {
                t: "1742049370649",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3237",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M810.666667 477.866667h-264.533334V213.333333c0-17.066667-12.8-34.133333-29.866666-34.133333-17.066667 0-29.866667 12.8-34.133334 29.866667v268.8H213.333333c-17.066667 0-34.133333 12.8-34.133333 34.133333s12.8 34.133333 34.133333 34.133333h268.8V810.666667c0 17.066667 12.8 34.133333 29.866667 34.133333 17.066667 0 29.866667-12.8 34.133333-29.866667v-268.8H810.666667c17.066667 0 34.133333-12.8 34.133333-34.133333s-17.066667-34.133333-34.133333-34.133333z",
                  "p-id": "3238"
                })
              ], -1)
            ]))
          ])
        ]),
        createBaseVNode("div", _hoisted_4$d, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(user_friend), (users, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: normalizeClass(["home-friend-user-friend-list-user", { selected: unref(selectedUserUid) === users.user_friend_uid }]),
              onClick: ($event) => unref(selectedUser)(users.user_friend_uid)
            }, [
              createBaseVNode("div", _hoisted_6$d, [
                createBaseVNode("img", {
                  src: users.user_friend_headshot,
                  alt: ""
                }, null, 8, _hoisted_7$b)
              ]),
              createBaseVNode("div", _hoisted_8$8, [
                createBaseVNode("div", _hoisted_9$8, toDisplayString(users.user_friend_name), 1),
                createBaseVNode("div", _hoisted_10$7, toDisplayString(users.user_friend_local_name), 1)
              ])
            ], 10, _hoisted_5$d);
          }), 128))
        ])
      ]);
    };
  }
};
const HomeFriendUser = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-2e40096f"]]);
const shrink = () => {
  window.api.minimize();
};
const setFullScreen = () => {
  window.api.setFullScreen();
};
const close = () => {
  window.api.close();
};
const _hoisted_1$c = { class: "user-top" };
const _hoisted_2$c = { class: "user-img" };
const _hoisted_3$c = ["src"];
const _hoisted_4$c = { class: "user-name-box" };
const _hoisted_5$c = { class: "user-name" };
const _hoisted_6$c = { class: "user-uid" };
const _hoisted_7$a = { class: "user-Thumbs-up-box" };
const _hoisted_8$7 = { class: "user-Thumbs-up-number" };
const _hoisted_9$7 = { class: "user-center" };
const _hoisted_10$6 = { class: "user-center-level" };
const _hoisted_11$6 = { class: "user-center-text-right" };
const _hoisted_12$6 = { class: "user-center-level" };
const _hoisted_13$5 = { class: "user-center-text-right" };
const _hoisted_14$5 = { class: "user-center-level" };
const _hoisted_15$5 = { class: "user-center-text-right" };
const _sfc_main$d = {
  __name: "userFriendMiniBox",
  setup(__props) {
    const userFriend = ref$1();
    watchEffect(() => {
      if (showMiniUserFriendBox.value === true) {
        userFriend.value = user_friend.value.find(
          (user2) => user2.user_friend_uid === selectedUserUid.value
        );
        console.log("查找用户", userFriend.value);
      } else {
        console.log("没有");
      }
    });
    return (_ctx, _cache) => {
      return unref(showMiniUserFriendBox) ? (openBlock(), createElementBlock("div", {
        key: 0,
        ref_key: "MiniUserFriendBox",
        ref: MiniUserFriendBox,
        class: "userMiniBox",
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        createBaseVNode("div", _hoisted_1$c, [
          createBaseVNode("div", _hoisted_2$c, [
            createBaseVNode("img", {
              src: userFriend.value.user_friend_headshot,
              alt: ""
            }, null, 8, _hoisted_3$c)
          ]),
          createBaseVNode("div", _hoisted_4$c, [
            createBaseVNode("div", _hoisted_5$c, toDisplayString(userFriend.value.user_friend_name), 1),
            createBaseVNode("div", _hoisted_6$c, "uid: " + toDisplayString(userFriend.value.user_friend_uid), 1),
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "user-connect-box" }, [
              createBaseVNode("svg", {
                t: "1742379652254",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "7565",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M512 0c281.6 0 512 230.4 512 512s-230.4 512-512 512-512-230.4-512-512 230.4-512 512-512z",
                  fill: "#28D2A0",
                  "p-id": "7566"
                })
              ]),
              createBaseVNode("div", { class: "user-connect" }, "在线")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_7$a, [
            _cache[2] || (_cache[2] = createBaseVNode("svg", {
              t: "1742381372799",
              class: "icon",
              viewBox: "0 0 1024 1024",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "p-id": "3237",
              width: "200",
              height: "200"
            }, [
              createBaseVNode("path", {
                d: "M213.333333 392.533333H132.266667c-21.333333 0-42.666667 8.533333-55.466667 25.6s-21.333333 34.133333-21.333333 55.466667l34.133333 405.333333c4.266667 38.4 34.133333 68.266667 72.533333 68.266667H213.333333c42.666667 0 76.8-34.133333 76.8-76.8V469.333333c0-42.666667-34.133333-76.8-76.8-76.8z m8.533334 482.133334c0 4.266667-4.266667 8.533333-8.533334 8.533333H166.4c-4.266667 0-8.533333-4.266667-8.533333-8.533333L119.466667 469.333333c0-4.266667 0-8.533333 4.266666-8.533333 0 0 4.266667-4.266667 8.533334-4.266667H213.333333c4.266667 0 8.533333 4.266667 8.533334 8.533334v409.6zM964.266667 422.4c-12.8-17.066667-34.133333-29.866667-59.733334-29.866667h-187.733333l8.533333-21.333333c8.533333-29.866667 17.066667-59.733333 21.333334-93.866667 4.266667-46.933333-4.266667-81.066667-21.333334-110.933333-25.6-42.666667-89.6-98.133333-136.533333-89.6-21.333333 4.266667-34.133333 21.333333-38.4 42.666667v12.8c-4.266667 55.466667-12.8 132.266667-38.4 170.666666-21.333333 29.866667-64 59.733333-115.2 81.066667-25.6 12.8-46.933333 42.666667-46.933333 68.266667v418.133333c0 42.666667 34.133333 76.8 76.8 76.8h362.666666c34.133333 0 64-21.333333 72.533334-55.466667l115.2-405.333333c4.266667-21.333333 0-42.666667-12.8-64z m-51.2 51.2l-115.2 405.333333c0 4.266667-4.266667 8.533333-8.533334 8.533334H426.666667c-4.266667 0-8.533333-4.266667-8.533334-8.533334v-418.133333c0-4.266667 4.266667-8.533333 8.533334-12.8 42.666667-25.6 102.4-64 132.266666-110.933333 34.133333-59.733333 42.666667-153.6 46.933334-192 17.066667 8.533333 42.666667 29.866667 59.733333 55.466666 8.533333 17.066667 12.8 42.666667 12.8 76.8 0 25.6-8.533333 51.2-17.066667 81.066667L640 418.133333c-4.266667 8.533333 0 21.333333 4.266667 29.866667 4.266667 8.533333 17.066667 12.8 25.6 12.8h230.4c4.266667 0 8.533333 4.266667 8.533333 4.266667s4.266667 4.266667 4.266667 8.533333z",
                "p-id": "3238"
              })
            ], -1)),
            createBaseVNode("div", _hoisted_8$7, toDisplayString(userFriend.value.user_friend_thumbs_up), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_9$7, [
          createBaseVNode("div", _hoisted_10$6, [
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "user-center-text" }, "等级", -1)),
            createBaseVNode("div", _hoisted_11$6, "LV:  " + toDisplayString(userFriend.value.user_friend_level), 1)
          ]),
          createBaseVNode("div", _hoisted_12$6, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "user-center-text" }, "签名", -1)),
            createBaseVNode("div", _hoisted_13$5, toDisplayString(userFriend.value.user_friend_personal_signature), 1)
          ]),
          createBaseVNode("div", _hoisted_14$5, [
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "user-center-text" }, "所在地", -1)),
            createBaseVNode("div", _hoisted_15$5, toDisplayString(userFriend.value.user_friend_region), 1)
          ])
        ]),
        _cache[6] || (_cache[6] = createBaseVNode("div", { class: "user-bottom" }, [
          createBaseVNode("button", { class: "user-bottom-button" }, "音视频聊天")
        ], -1))
      ], 512)) : createCommentVNode("", true);
    };
  }
};
const UserFriendMiniBox = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-c4d1b3e6"]]);
const sendAudio = () => {
  window.api.openwebRTCWindow(selectedUserUid.value);
  console.log("sendAudio");
};
const sendVideo = () => {
  window.api.openwebRTCWindow(selectedUserUid.value);
  console.log("sendVideo");
};
const sendok = () => {
  console.log("sendok");
};
const _hoisted_1$b = { class: "audio-recorder" };
const _hoisted_2$b = ["disabled"];
const _hoisted_3$b = ["disabled"];
const _hoisted_4$b = ["disabled"];
const _hoisted_5$b = ["disabled"];
const _hoisted_6$b = { key: 0 };
const _hoisted_7$9 = {
  key: 1,
  class: "progress-bar"
};
const _sfc_main$c = {
  __name: "chatAudio",
  setup(__props) {
    useCssVars((_ctx) => ({
      "2e9b3cd4": unref(accent_color),
      "01dccd30": unref(chat_bubbles)
    }));
    const returnTextarea = () => {
      ischatAudio.value = false;
    };
    onBeforeUnmount(() => {
      if (isRecording.value) {
        stopRecording();
      }
      clearTimers();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        createBaseVNode("button", { onClick: returnTextarea }, "返回"),
        createBaseVNode("button", {
          disabled: unref(isRecording),
          onClick: _cache[0] || (_cache[0] = (...args) => unref(startRecording) && unref(startRecording)(...args))
        }, "开始录音", 8, _hoisted_2$b),
        createBaseVNode("button", {
          disabled: !unref(isRecording),
          onClick: _cache[1] || (_cache[1] = (...args) => unref(stopRecording) && unref(stopRecording)(...args))
        }, "停止录音", 8, _hoisted_3$b),
        createBaseVNode("button", {
          disabled: !unref(audioBlob),
          onClick: _cache[2] || (_cache[2] = (...args) => unref(downloadAudio) && unref(downloadAudio)(...args))
        }, "下载录音", 8, _hoisted_4$b),
        createBaseVNode("button", {
          disabled: !unref(audioBlob),
          onClick: _cache[3] || (_cache[3] = (...args) => unref(sendAudioWs) && unref(sendAudioWs)(...args))
        }, "发送录音", 8, _hoisted_5$b),
        unref(statusMessage) ? (openBlock(), createElementBlock("p", _hoisted_6$b, toDisplayString(unref(statusMessage)), 1)) : createCommentVNode("", true),
        createBaseVNode("p", null, "录制时长: " + toDisplayString(unref(formatTime)(unref(recordingTime))) + " / 60秒", 1),
        unref(isRecording) ? (openBlock(), createElementBlock("div", _hoisted_7$9, [
          createBaseVNode("div", {
            class: "progress",
            style: normalizeStyle({ width: `${unref(recordingTime) / 60 * 100}%` })
          }, null, 4)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const ChatAudio = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-851ad6f9"]]);
const _hoisted_1$a = { class: "image-preview-container" };
const _hoisted_2$a = { class: "image-preview-scroll" };
const _hoisted_3$a = ["src"];
const _hoisted_4$a = ["onClick"];
const _hoisted_5$a = { class: "size-info" };
const _hoisted_6$a = {
  key: 0,
  class: "limit-message"
};
const _sfc_main$b = {
  __name: "chatImage",
  setup(__props) {
    useCssVars((_ctx) => ({
      "004f0dc3": unref(accent_color)
    }));
    const URL2 = window.URL || window.webkitURL;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => ischatImage.value = false)
        }, "返回"),
        createBaseVNode("div", _hoisted_2$a, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedImages), (image, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "image-preview-item"
            }, [
              createBaseVNode("img", {
                src: unref(URL2).createObjectURL(image),
                alt: "预览图片",
                class: "preview-image"
              }, null, 8, _hoisted_3$a),
              createBaseVNode("button", {
                class: "remove-image-button",
                onClick: ($event) => unref(removeImage)(index)
              }, "×", 8, _hoisted_4$a)
            ]);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_5$a, [
          createTextVNode(" 已选择 " + toDisplayString(unref(selectedImages).length) + " 张图片，总大小: " + toDisplayString((unref(totalImageSize) / 1024 / 1024).toFixed(2)) + "MB ", 1),
          unref(selectedImages).length >= 9 ? (openBlock(), createElementBlock("span", _hoisted_6$a, " (已达到最大数量限制) ")) : createCommentVNode("", true),
          createBaseVNode("span", null, toDisplayString(unref(statusMessageImage)), 1),
          createBaseVNode("button", {
            class: "home-chat-local-input-out-put",
            style: normalizeStyle({ backgroundColor: unref(accent_color) }),
            onClick: _cache[1] || (_cache[1] = (...args) => unref(send_image) && unref(send_image)(...args))
          }, _cache[2] || (_cache[2] = [
            createBaseVNode("div", { style: { "-webkit-user-select": "none", "-webkit-user-drag": "none" } }, "发送", -1)
          ]), 4)
        ])
      ]);
    };
  }
};
const ChatImage = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-ee9cf28a"]]);
const _hoisted_1$9 = { class: "file-view-page" };
const _hoisted_2$9 = { class: "file-view-box" };
const _hoisted_3$9 = {
  key: 0,
  class: "file-view-box-mini"
};
const _hoisted_4$9 = ["onClick"];
const _hoisted_5$9 = { class: "file-view-box-mini-content" };
const _hoisted_6$9 = { class: "file-view-box-mini-name" };
const _hoisted_7$8 = { class: "file-view-box-mini-size" };
const _hoisted_8$6 = {
  key: 1,
  class: "file-view-box-mini"
};
const _hoisted_9$6 = ["onClick"];
const _hoisted_10$5 = { class: "file-view-box-mini-content" };
const _hoisted_11$5 = { class: "file-view-box-mini-name" };
const _hoisted_12$5 = { class: "file-view-box-mini-size" };
const _hoisted_13$4 = {
  key: 2,
  class: "file-view-box-mini"
};
const _hoisted_14$4 = ["onClick"];
const _hoisted_15$4 = { class: "file-view-box-mini-content" };
const _hoisted_16$3 = { class: "file-view-box-mini-name" };
const _hoisted_17$3 = { class: "file-view-box-mini-size" };
const _hoisted_18$3 = {
  key: 3,
  class: "file-view-box-mini"
};
const _hoisted_19$3 = ["onClick"];
const _hoisted_20$3 = { class: "file-view-box-mini-content" };
const _hoisted_21$1 = { class: "file-view-box-mini-name" };
const _hoisted_22$1 = { class: "file-view-box-mini-size" };
const _hoisted_23$1 = {
  key: 4,
  class: "file-view-box-mini"
};
const _hoisted_24$1 = ["onClick"];
const _hoisted_25$1 = { class: "file-view-box-mini-content" };
const _hoisted_26$1 = { class: "file-view-box-mini-name" };
const _hoisted_27$1 = { class: "file-view-box-mini-size" };
const _hoisted_28$1 = {
  key: 5,
  class: "file-view-box-mini"
};
const _hoisted_29$1 = ["onClick"];
const _hoisted_30$1 = { class: "file-view-box-mini-content" };
const _hoisted_31$1 = { class: "file-view-box-mini-name" };
const _hoisted_32$1 = { class: "file-view-box-mini-size" };
const _hoisted_33$1 = {
  key: 6,
  class: "file-view-box-mini"
};
const _hoisted_34$1 = ["onClick"];
const _hoisted_35$1 = { class: "file-view-box-mini-content" };
const _hoisted_36$1 = { class: "file-view-box-mini-name" };
const _hoisted_37$1 = { class: "file-view-box-mini-size" };
const _hoisted_38$1 = {
  key: 7,
  class: "file-view-box-mini"
};
const _hoisted_39$1 = ["onClick"];
const _hoisted_40$1 = { class: "file-view-box-mini-content" };
const _hoisted_41$1 = { class: "file-view-box-mini-name" };
const _hoisted_42$1 = { class: "file-view-box-mini-size" };
const _hoisted_43$1 = { style: { "width": "100%", "display": "flex", "justify-content": "space-between" } };
const _sfc_main$a = {
  __name: "chatFile",
  setup(__props) {
    useCssVars((_ctx) => ({
      "1e0c8983": unref(accent_color)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => unref(exitFile) && unref(exitFile)(...args))
        }, "返回"),
        createBaseVNode("div", _hoisted_2$9, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedFiles), (file, index) => {
            return openBlock(), createElementBlock("div", { key: index }, [
              file.fileType === "application" ? (openBlock(), createElementBlock("div", _hoisted_3$9, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_4$9),
                createBaseVNode("div", _hoisted_5$9, [
                  createBaseVNode("div", _hoisted_6$9, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_7$8, toDisplayString(file.fileSize), 1)
                ]),
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743132944321",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "1456",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M740 185V2H88v1021h836V185z",
                      fill: "#707070",
                      "p-id": "1457"
                    }),
                    createBaseVNode("path", {
                      d: "M923 185H739V1",
                      fill: "#707070",
                      "p-id": "1458"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true),
              file.fileType === "image" ? (openBlock(), createElementBlock("div", _hoisted_8$6, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_9$6),
                createBaseVNode("div", _hoisted_10$5, [
                  createBaseVNode("div", _hoisted_11$5, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_12$5, toDisplayString(file.fileSize), 1)
                ]),
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743132877304",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "1286",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M748 183.5V0H96v1024h836V183.5z",
                      fill: "#71CE52",
                      "p-id": "1287"
                    }),
                    createBaseVNode("path", {
                      d: "M932 184H748V0",
                      fill: "#C1FF99",
                      "p-id": "1288"
                    }),
                    createBaseVNode("path", {
                      d: "M314.1 460.9c17.5 9.9 38.9 9.8 56.3-0.4 17.4-10.2 28-28.8 27.9-48.9-0.2-31.1-25.6-56.1-56.7-55.9-31.2 0.1-56.2 25.5-56 56.7 0.1 20 11 38.5 28.5 48.5zM466.5 586.7l-74.9-78.8L280.7 666l470.3-3.1-144.2-228.2z",
                      fill: "#FFFFFF",
                      "p-id": "1289"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true),
              file.fileType === "video" ? (openBlock(), createElementBlock("div", _hoisted_13$4, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_14$4),
                createBaseVNode("div", _hoisted_15$4, [
                  createBaseVNode("div", _hoisted_16$3, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_17$3, toDisplayString(file.fileSize), 1)
                ]),
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743132994145",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "2543",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M748 183.5V0H96v1024h836V183.5z",
                      fill: "#E657FF",
                      "p-id": "2544"
                    }),
                    createBaseVNode("path", {
                      d: "M932 184H748V0",
                      fill: "#F797FF",
                      "p-id": "2545"
                    }),
                    createBaseVNode("path", {
                      d: "M635.3 459.6l52.3-30.3c9.2-5.5 17.4-0.9 17.4 8.3v151.3c0 11-7.3 14.7-17.4 8.3l-52.3-30.3c-9.2-5.5-17.4-11.9-17.4-21.1v-66.9c0-8.3 8.3-13.8 17.4-19.3z m-82.5-56.8H356.7c-20.2 0-36.7 16.5-36.7 36.7v157.7c0 20.2 16.5 36.7 36.7 36.7h196.2c20.2 0 36.7-16.5 36.7-36.7V439.5c-0.1-20.2-16.6-36.7-36.8-36.7z m-118.2 88.9c-2.8 13.8-13.8 23.8-25.7 26.6-23.8 4.6-44-16.5-39.4-39.4 2.8-13.8 13.8-23.8 25.7-25.7 23.8-6.4 44 13.8 39.4 38.5z",
                      fill: "#FFFFFF",
                      "p-id": "2546"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true),
              file.fileType === "audio" ? (openBlock(), createElementBlock("div", _hoisted_18$3, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_19$3),
                createBaseVNode("div", _hoisted_20$3, [
                  createBaseVNode("div", _hoisted_21$1, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_22$1, toDisplayString(file.fileSize), 1)
                ]),
                _cache[5] || (_cache[5] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743133093124",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "3393",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M748 183.5V0H96v1024h836V183.5z",
                      fill: "#FF6955",
                      "p-id": "3394"
                    }),
                    createBaseVNode("path", {
                      d: "M932 184H748V0",
                      fill: "#FFA694",
                      "p-id": "3395"
                    }),
                    createBaseVNode("path", {
                      d: "M586.7 302.1c-5.3 7.5-34.2 20.3-58.7 25.6-31 6.4-47 11.7-63 20.3-21.3 12.8-33.1 28.8-31 43.8 1.1 3.2 26.7 40.6 56.6 83.2 31 42.7 56.6 79 57.6 80 1.1 2.1-3.2 2.1-18.1 1.1-47-3.2-89.6 21.3-108.9 59.8-5.3 11.7-6.4 18.1-6.4 32 0 32 17.1 57.6 49.1 72.6 12.8 5.3 17.1 6.4 43.8 6.4 28.8 0 29.9 0 49.1-9.6C608 692.8 629.4 644.7 608 601c-4.3-9.6-31-55.5-59.8-102.5L496 412h8.5c34.2-2.1 57.6-12.8 73.6-31 13.9-16 18.1-32 17.1-57.6-1-23.5-3.2-28.8-8.5-21.3z",
                      fill: "#FFFFFF",
                      "p-id": "3396"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true),
              file.fileType === "pdf" ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_24$1),
                createBaseVNode("div", _hoisted_25$1, [
                  createBaseVNode("div", _hoisted_26$1, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_27$1, toDisplayString(file.fileSize), 1)
                ]),
                _cache[6] || (_cache[6] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743133041911",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "3057",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M748 183.5V0H96v1024h836V183.5z",
                      fill: "#FF5562",
                      "p-id": "3058"
                    }),
                    createBaseVNode("path", {
                      d: "M932 184H748V0",
                      fill: "#FF9292",
                      "p-id": "3059"
                    }),
                    createBaseVNode("path", {
                      d: "M657.9 606.1c-29.4-1.9-57.4-12.9-79.9-31.3-44.2 9.4-86.3 22.9-128.4 39.6-33.5 57.4-64.8 86.6-91.8 86.6-5.4 0-11.9-1-16.2-4.2-11.3-5.1-18.5-16.1-18.3-28.2 0-9.4 2.1-35.5 104.7-78.2 23.3-41.3 42.4-84.6 57.2-129.4-12.9-25-41-86.6-21.6-117.9 6.5-11.5 19.4-17.7 33.5-16.7 11 0.1 21.4 5.1 28.1 13.6 14 18.8 12.9 58.4-5.4 116.8 17.3 31.3 39.9 59.5 66.9 83.5 22.7-4.2 45.3-7.3 68-7.3 50.7 1 58.3 24 57.2 37.5 0 35.6-35.7 35.6-54 35.6z m-302.2 64.6l3.2-1c15.1-5.2 27-15.6 35.6-29.2-16.2 6.3-29.1 16.6-38.8 30.2z m143.5-312.9H496c-1.1 0-3.3 0-4.3 1-4.3 17.7-1.1 36.5 6.5 53.2 6.2-17.5 6.6-36.5 1-54.2z m7.6 151.2l-1.1 2.1-1.1-1.1c-9.7 24-20.5 48-32.4 70.9l2.1-1v2.1c24-8.4 48.5-15.3 73.4-20.9l-1-1h3.3c-16.2-15.5-30.7-32.6-43.2-51.1z m146.8 55.3c-9.7 0-18.3 0-28 2.1 10.8 5.2 21.6 7.3 32.4 8.3 7.6 1 15.1 0 21.6-2.1-0.1-3-4.4-8.3-26-8.3z",
                      fill: "#FFFFFF",
                      "p-id": "3060"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true),
              file.fileType === "excel" ? (openBlock(), createElementBlock("div", _hoisted_28$1, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_29$1),
                createBaseVNode("div", _hoisted_30$1, [
                  createBaseVNode("div", _hoisted_31$1, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_32$1, toDisplayString(file.fileSize), 1)
                ]),
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743133021478",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "2885",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M745 184.3V1H93v1022.5h836V184.3z",
                      fill: "#72DCA2",
                      "p-id": "2886"
                    }),
                    createBaseVNode("path", {
                      d: "M928.8 184h-184V0.8",
                      fill: "#A9FFCE",
                      "p-id": "2887"
                    }),
                    createBaseVNode("path", {
                      d: "M500.8 476.2l76.6-131h67.7L532.5 537.9 445.7 686H378l122.8-209.8z m-0.7 70.3l-6.6-11-112.7-190.3h67.7L525 474.4l8.9 15.2L650.3 686h-67.7l-82.5-139.5z",
                      fill: "#FCFCFC",
                      "p-id": "2888"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true),
              file.fileType === "word" ? (openBlock(), createElementBlock("div", _hoisted_33$1, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_34$1),
                createBaseVNode("div", _hoisted_35$1, [
                  createBaseVNode("div", _hoisted_36$1, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_37$1, toDisplayString(file.fileSize), 1)
                ]),
                _cache[8] || (_cache[8] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743133008598",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "2713",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M745 186V3H93v1021h836V186z",
                      fill: "#6CA2FF",
                      "p-id": "2714"
                    }),
                    createBaseVNode("path", {
                      d: "M929 186H745V3",
                      fill: "#A2CBFC",
                      "p-id": "2715"
                    }),
                    createBaseVNode("path", {
                      d: "M490.4 344.2H542l65.2 227.3L651 344.2h66.1L638.5 685H578l-60.5-238.1L454.3 685h-60.5l-78.5-340.8h66.1l43.8 227.3 65.2-227.3z",
                      fill: "#FCFCFC",
                      "p-id": "2716"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true),
              file.fileType === "html" ? (openBlock(), createElementBlock("div", _hoisted_38$1, [
                createBaseVNode("button", {
                  class: "file-view-box-mini-remove",
                  onClick: ($event) => unref(removeFile)(index)
                }, "×", 8, _hoisted_39$1),
                createBaseVNode("div", _hoisted_40$1, [
                  createBaseVNode("div", _hoisted_41$1, toDisplayString(file.fileName), 1),
                  createBaseVNode("div", _hoisted_42$1, toDisplayString(file.fileSize), 1)
                ]),
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                  createBaseVNode("svg", {
                    t: "1743133149852",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "3563",
                    width: "200",
                    height: "200"
                  }, [
                    createBaseVNode("path", {
                      d: "M748 183.5V0H96v1024h836V183.5z",
                      fill: "#383838",
                      "p-id": "3564"
                    }),
                    createBaseVNode("path", {
                      d: "M932 184H748V0",
                      fill: "#6D6D6C",
                      "p-id": "3565"
                    }),
                    createBaseVNode("path", {
                      d: "M432.7 412l-20-20c-2.9-2.9-7.1-2.9-10 0L291.5 503.3c-1.4 1.4-2.1 3.6-2.1 5s0.7 3.6 2.1 5l111.3 111.3c2.9 2.9 7.1 2.9 10 0l20-20c2.9-2.9 2.9-7.1 0-10L347.1 509l85.6-85.6c2.9-3.6 2.9-8.6 0-11.4z m304.6 91.3L626.7 392c-2.9-2.9-7.1-2.9-10 0l-20 20c-2.9 2.9-2.9 7.1 0 10l85.6 85.6-85.6 85.6c-2.9 2.9-2.9 7.1 0 10l20 20c2.9 2.9 7.1 2.9 10 0L738 511.9c1.4-1.4 2.1-3.6 2.1-5-0.6-0.7-1.3-2.2-2.8-3.6z m-169-156.9c-11.4-3.6-23.5 2.9-27.1 13.6l-92.7 284.6c-3.6 11.4 2.9 23.5 13.6 27.1 10.7 3.6 23.5-2.9 27.1-13.6l92.7-285.4c3.5-10.6-2.2-22.8-13.6-26.3z",
                      fill: "#FFFFFF",
                      "p-id": "3566"
                    })
                  ])
                ], -1))
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_43$1, [
          createBaseVNode("span", null, toDisplayString(unref(statusMessageFile)), 1),
          createBaseVNode("button", {
            class: "home-chat-local-input-out-put",
            style: normalizeStyle({ backgroundColor: unref(accent_color) }),
            onClick: _cache[1] || (_cache[1] = (...args) => unref(send_file) && unref(send_file)(...args))
          }, _cache[10] || (_cache[10] = [
            createBaseVNode("div", { style: { "-webkit-user-select": "none", "-webkit-user-drag": "none" } }, "发送", -1)
          ]), 4)
        ])
      ]);
    };
  }
};
const ChatFile = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-4e246dfd"]]);
const currentPlayingAudio = ref$1({
  index: -1,
  isPlaying: false,
  duration: 0,
  remaining: 0
});
const audioDurations = ref$1({});
const audioElements = ref$1([]);
const toggleAudio = (index) => {
  const audio = audioElements.value[index];
  if (currentPlayingAudio.value.index === index && currentPlayingAudio.value.isPlaying) {
    audio.pause();
    currentPlayingAudio.value.isPlaying = false;
    return;
  }
  if (currentPlayingAudio.value.index !== -1) {
    const prevAudio = audioElements.value[currentPlayingAudio.value.index];
    prevAudio.pause();
    prevAudio.currentTime = 0;
  }
  audio.play();
  currentPlayingAudio.value = {
    index,
    isPlaying: true,
    duration: audioDurations.value[index] || 0,
    remaining: audioDurations.value[index] || 0
  };
  audio.ontimeupdate = () => {
    if (audio.duration) {
      currentPlayingAudio.value.remaining = Math.ceil(audio.duration - audio.currentTime);
    }
  };
  audio.onended = () => {
    currentPlayingAudio.value = {
      index: -1,
      isPlaying: false,
      duration: 0,
      remaining: 0
    };
  };
};
const audioCanplay = async (e, index) => {
  const audio = e.target;
  while (audio.duration === Infinity) {
    await new Promise((r) => setTimeout(r, 200));
    audio.currentTime = 1e7 * Math.random();
  }
  audioDurations.value[index] = Math.ceil(audio.duration);
  if (currentPlayingAudio.value.index === index) {
    currentPlayingAudio.value.duration = audioDurations.value[index];
    currentPlayingAudio.value.remaining = audioDurations.value[index];
  }
};
const _hoisted_1$8 = { class: "home-chat" };
const _hoisted_2$8 = { class: "home-chat-top-button" };
const _hoisted_3$8 = { class: "home-chat-top-other" };
const _hoisted_4$8 = { class: "home-chat-top-other-user-name" };
const _hoisted_5$8 = { class: "home-chat-top-other-user" };
const _hoisted_6$8 = { class: "home-chat-top-other-button-all" };
const _hoisted_7$7 = { class: "home-chat-local" };
const _hoisted_8$5 = {
  key: 0,
  class: "user-message"
};
const _hoisted_9$5 = { class: "message-all" };
const _hoisted_10$4 = { class: "message-name-user" };
const _hoisted_11$4 = { class: "user-message-headshot" };
const _hoisted_12$4 = ["src"];
const _hoisted_13$3 = {
  key: 1,
  class: "user-message"
};
const _hoisted_14$3 = { class: "message-all" };
const _hoisted_15$3 = { class: "message-name-user" };
const _hoisted_16$2 = ["src", "onCanplay"];
const _hoisted_17$2 = ["onClick"];
const _hoisted_18$2 = {
  key: 0,
  t: "1743246175906",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "8981",
  width: "200",
  height: "200"
};
const _hoisted_19$2 = {
  key: 1,
  t: "1743246103702",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "8535",
  width: "200",
  height: "200"
};
const _hoisted_20$2 = {
  class: "audio-duration",
  style: { "-webkit-user-select": "none" }
};
const _hoisted_21 = { class: "user-message-headshot" };
const _hoisted_22 = ["src"];
const _hoisted_23 = {
  key: 2,
  class: "user-message"
};
const _hoisted_24 = { class: "message-all" };
const _hoisted_25 = { class: "message-name-user" };
const _hoisted_26 = ["src"];
const _hoisted_27 = { class: "user-message-headshot" };
const _hoisted_28 = ["src"];
const _hoisted_29 = {
  key: 3,
  class: "user-message"
};
const _hoisted_30 = { class: "message-all" };
const _hoisted_31 = { class: "message-name-user" };
const _hoisted_32 = ["src"];
const _hoisted_33 = { class: "user-message-headshot" };
const _hoisted_34 = ["src"];
const _hoisted_35 = {
  key: 4,
  class: "user-message"
};
const _hoisted_36 = { class: "message-all" };
const _hoisted_37 = { class: "message-name-user" };
const _hoisted_38 = ["onClick"];
const _hoisted_39 = ["onClick"];
const _hoisted_40 = { class: "isDownload" };
const _hoisted_41 = { class: "file-view-box-mini-content" };
const _hoisted_42 = { class: "file-view-box-mini-name" };
const _hoisted_43 = { class: "file-view-box-mini-size" };
const _hoisted_44 = { class: "user-message-headshot" };
const _hoisted_45 = ["src"];
const _hoisted_46 = {
  key: 5,
  class: "user-message"
};
const _hoisted_47 = { class: "message-all" };
const _hoisted_48 = { class: "message-name-user" };
const _hoisted_49 = ["onClick"];
const _hoisted_50 = ["onClick"];
const _hoisted_51 = { class: "isDownload" };
const _hoisted_52 = { class: "file-view-box-mini-content" };
const _hoisted_53 = { class: "file-view-box-mini-name" };
const _hoisted_54 = { class: "file-view-box-mini-size" };
const _hoisted_55 = { class: "user-message-headshot" };
const _hoisted_56 = ["src"];
const _hoisted_57 = {
  key: 6,
  class: "user-message"
};
const _hoisted_58 = { class: "message-all" };
const _hoisted_59 = { class: "message-name-user" };
const _hoisted_60 = ["onClick"];
const _hoisted_61 = ["onClick"];
const _hoisted_62 = { class: "isDownload" };
const _hoisted_63 = { class: "file-view-box-mini-content" };
const _hoisted_64 = { class: "file-view-box-mini-name" };
const _hoisted_65 = { class: "file-view-box-mini-size" };
const _hoisted_66 = { class: "user-message-headshot" };
const _hoisted_67 = ["src"];
const _hoisted_68 = {
  key: 7,
  class: "user-message"
};
const _hoisted_69 = { class: "message-all" };
const _hoisted_70 = { class: "message-name-user" };
const _hoisted_71 = ["onClick"];
const _hoisted_72 = ["onClick"];
const _hoisted_73 = { class: "isDownload" };
const _hoisted_74 = { class: "file-view-box-mini-content" };
const _hoisted_75 = { class: "file-view-box-mini-name" };
const _hoisted_76 = { class: "file-view-box-mini-size" };
const _hoisted_77 = { class: "user-message-headshot" };
const _hoisted_78 = ["src"];
const _hoisted_79 = {
  key: 8,
  class: "user-message"
};
const _hoisted_80 = { class: "message-all" };
const _hoisted_81 = { class: "message-name-user" };
const _hoisted_82 = ["onClick"];
const _hoisted_83 = ["onClick"];
const _hoisted_84 = ["onClick"];
const _hoisted_85 = { class: "isDownload" };
const _hoisted_86 = { class: "file-view-box-mini-content" };
const _hoisted_87 = { class: "file-view-box-mini-name" };
const _hoisted_88 = { class: "file-view-box-mini-size" };
const _hoisted_89 = { class: "user-message-headshot" };
const _hoisted_90 = ["src"];
const _hoisted_91 = {
  key: 9,
  class: "friend-message"
};
const _hoisted_92 = { class: "user-message-headshot" };
const _hoisted_93 = ["src"];
const _hoisted_94 = { class: "message-all" };
const _hoisted_95 = { class: "message-name-friend-user" };
const _hoisted_96 = {
  class: "friend-message-text",
  "data-menu-type": "text"
};
const _hoisted_97 = {
  key: 10,
  class: "friend-message"
};
const _hoisted_98 = { class: "user-message-headshot" };
const _hoisted_99 = ["src"];
const _hoisted_100 = { class: "message-all" };
const _hoisted_101 = { class: "message-name-friend-user" };
const _hoisted_102 = ["src"];
const _hoisted_103 = ["onClick"];
const _hoisted_104 = {
  key: 0,
  t: "1743246175906",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "8981",
  width: "200",
  height: "200"
};
const _hoisted_105 = {
  key: 1,
  t: "1743246103702",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "8535",
  width: "200",
  height: "200"
};
const _hoisted_106 = {
  class: "audio-duration",
  style: { "-webkit-user-select": "none" }
};
const _hoisted_107 = {
  key: 11,
  class: "friend-message"
};
const _hoisted_108 = { class: "user-message-headshot" };
const _hoisted_109 = ["src"];
const _hoisted_110 = { class: "message-all" };
const _hoisted_111 = { class: "message-name-friend-user" };
const _hoisted_112 = ["src"];
const _hoisted_113 = {
  key: 12,
  class: "friend-message"
};
const _hoisted_114 = { class: "user-message-headshot" };
const _hoisted_115 = ["src"];
const _hoisted_116 = { class: "message-all" };
const _hoisted_117 = { class: "message-name-friend-user" };
const _hoisted_118 = ["src"];
const _hoisted_119 = {
  key: 13,
  class: "friend-message"
};
const _hoisted_120 = { class: "user-message-headshot" };
const _hoisted_121 = ["src"];
const _hoisted_122 = { class: "message-all" };
const _hoisted_123 = { class: "message-name-friend-user" };
const _hoisted_124 = ["onClick"];
const _hoisted_125 = ["onClick"];
const _hoisted_126 = { class: "isDownload" };
const _hoisted_127 = { class: "file-view-box-mini-content" };
const _hoisted_128 = { class: "file-view-box-mini-name" };
const _hoisted_129 = { class: "file-view-box-mini-size" };
const _hoisted_130 = {
  key: 14,
  class: "friend-message"
};
const _hoisted_131 = { class: "user-message-headshot" };
const _hoisted_132 = ["src"];
const _hoisted_133 = { class: "message-all" };
const _hoisted_134 = { class: "message-name-friend-user" };
const _hoisted_135 = ["onClick"];
const _hoisted_136 = ["onClick"];
const _hoisted_137 = { class: "isDownload" };
const _hoisted_138 = { class: "file-view-box-mini-content" };
const _hoisted_139 = { class: "file-view-box-mini-name" };
const _hoisted_140 = { class: "file-view-box-mini-size" };
const _hoisted_141 = {
  key: 15,
  class: "friend-message"
};
const _hoisted_142 = { class: "user-message-headshot" };
const _hoisted_143 = ["src"];
const _hoisted_144 = { class: "message-all" };
const _hoisted_145 = { class: "message-name-friend-user" };
const _hoisted_146 = ["onClick"];
const _hoisted_147 = ["onClick"];
const _hoisted_148 = { class: "isDownload" };
const _hoisted_149 = { class: "file-view-box-mini-content" };
const _hoisted_150 = { class: "file-view-box-mini-name" };
const _hoisted_151 = { class: "file-view-box-mini-size" };
const _hoisted_152 = {
  key: 16,
  class: "friend-message"
};
const _hoisted_153 = { class: "user-message-headshot" };
const _hoisted_154 = ["src"];
const _hoisted_155 = { class: "message-all" };
const _hoisted_156 = { class: "message-name-friend-user" };
const _hoisted_157 = ["onClick"];
const _hoisted_158 = ["onClick"];
const _hoisted_159 = { class: "isDownload" };
const _hoisted_160 = { class: "file-view-box-mini-content" };
const _hoisted_161 = { class: "file-view-box-mini-name" };
const _hoisted_162 = { class: "file-view-box-mini-size" };
const _hoisted_163 = {
  key: 17,
  class: "friend-message"
};
const _hoisted_164 = { class: "user-message-headshot" };
const _hoisted_165 = ["src"];
const _hoisted_166 = { class: "message-all" };
const _hoisted_167 = { class: "message-name-friend-user" };
const _hoisted_168 = ["onClick"];
const _hoisted_169 = ["onClick"];
const _hoisted_170 = { class: "isDownload" };
const _hoisted_171 = { class: "file-view-box-mini-content" };
const _hoisted_172 = { class: "file-view-box-mini-name" };
const _hoisted_173 = { class: "file-view-box-mini-size" };
const _hoisted_174 = { class: "home-chat-local-input-top" };
const _hoisted_175 = { class: "home-chat-local-input-out" };
const _sfc_main$9 = {
  __name: "homeChat",
  setup(__props) {
    useCssVars((_ctx) => ({
      "756e9aef": unref(accent_color)
    }));
    const getDisplayDuration = (index) => {
      if (currentPlayingAudio.value.index === index) {
        return currentPlayingAudio.value.remaining;
      }
      return audioDurations.value[index] || "--";
    };
    const processMessageImages = async (messages2) => {
      return await Promise.all(messages2.map(async (message) => {
        if (message.fileType === "images") {
          const urls = getImageUrls(message.user_take);
          message.cachedImageUrls = await Promise.all(urls.map((url2) => loadImage(url2)));
        }
        return message;
      }));
    };
    const selectedUserName = ref$1("");
    const chatHistory = ref$1([]);
    const chatUserHeadshot = ref$1();
    const chatUserFriendHeadshot = ref$1();
    const chatUserName = ref$1();
    const chatUserFriendName = ref$1();
    const chatBodyRef = ref$1(null);
    watch(
      selectedUserUid,
      async (newUid) => {
        try {
          console.log("触发更新", user_friend_history_one.value);
          const user2 = user_friend.value.find((user3) => user3.user_friend_uid === newUid);
          if (user2) {
            selectedUserName.value = user2.user_friend_name;
            await userSearchHistory();
          } else {
            selectedUserName.value = "";
          }
          const history2 = [user_friend_history_one.value];
          console.log("选择id切换历史", history2);
          if (history2 !== void 0) {
            chatHistory.value = processMessageImages(history2[0].user_history);
            chatUserName.value = history2[0].user.user_name;
            chatUserFriendName.value = history2[0].user_friend.user_friend_name;
            chatUserHeadshot.value = await loadImage(history2[0].user.user_headshot);
            chatUserFriendHeadshot.value = await loadImage(history2[0].user_friend.user_friend_headshot);
            console.log(chatHistory.value);
          } else {
            chatHistory.value = [];
          }
        } catch (error) {
          console.log(error);
        }
      },
      { immediate: true }
    );
    watchEffect(
      async () => {
        try {
          if (user_friend_history_one.value && user_friend_history_one.value.user_history) {
            const history2 = [user_friend_history_one.value];
            console.log("添加历史1", history2);
            chatHistory.value = processMessageImages(history2[0].user_history);
            chatUserName.value = history2[0].user.user_name;
            chatUserFriendName.value = history2[0].user_friend.user_friend_name;
            chatUserHeadshot.value = await loadImage(history2[0].user.user_headshot);
            chatUserFriendHeadshot.value = await loadImage(history2[0].user_friend.user_friend_headshot);
            console.log("图片", chatUserHeadshot.value, chatUserFriendHeadshot.value);
            console.log("聊天历史2", chatHistory.value);
          } else {
            chatHistory.value = [];
          }
        } catch (error) {
          console.log(error);
        }
      },
      { deep: true }
    );
    watch(
      chatHistory,
      () => {
        try {
          nextTick(() => {
            console.log("执行");
            scrollToBottom();
          });
        } catch (error) {
          console.log(error);
        }
      },
      { deep: true, immediate: true }
    );
    const scrollToBottom = () => {
      if (chatBodyRef.value) {
        chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
      }
    };
    onMounted(() => {
      initWebSocket();
      wsHeartbeat();
    });
    onUnmounted(() => {
      ws$1.close();
      console.log("WebSocket 连接已主动关闭");
      clearInterval(heartbeatIntervalId);
      console.log("ws心跳计时器已清除");
    });
    const getImageUrls = (userTake) => {
      if (Array.isArray(userTake)) {
        return userTake;
      }
      if (typeof userTake === "string") {
        return userTake.split("|");
      }
      return [];
    };
    const activeDownloadIndex = ref$1(-1);
    const toggleDownloadButton = (index) => {
      if (activeDownloadIndex.value === index) {
        activeDownloadIndex.value = -1;
      } else {
        activeDownloadIndex.value = index;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("div", {
          class: "home-chat-top",
          style: normalizeStyle({
            "border-bottom": unref(selectedUserUid) !== null ? "1px solid #c0c0c0" : "none"
          })
        }, [
          createBaseVNode("div", _hoisted_2$8, [
            createBaseVNode("button", {
              class: "gray",
              onClick: _cache[0] || (_cache[0] = (...args) => unref(shrink) && unref(shrink)(...args))
            }, _cache[24] || (_cache[24] = [
              createBaseVNode("svg", {
                t: "1741916524280",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3514",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M819.2 477.866667h-597.333333c-17.066667 0-34.133333 12.8-34.133334 34.133333s12.8 34.133333 34.133334 34.133333h597.333333c17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333z",
                  "p-id": "3515"
                })
              ], -1)
            ])),
            createBaseVNode("button", {
              class: "gray",
              onClick: _cache[1] || (_cache[1] = (...args) => unref(setFullScreen) && unref(setFullScreen)(...args))
            }, _cache[25] || (_cache[25] = [
              createBaseVNode("svg", {
                t: "1741916508767",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3348",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M832 93.866667h-640c-51.2 0-93.866667 42.666667-93.866667 93.866666v640c0 51.2 42.666667 93.866667 93.866667 93.866667h640c51.2 0 93.866667-42.666667 93.866667-93.866667v-640c4.266667-46.933333-42.666667-93.866667-93.866667-93.866666z m29.866667 738.133333c0 17.066667-12.8 34.133333-34.133334 34.133333h-640c-17.066667 0-34.133333-12.8-34.133333-34.133333v-640c0-17.066667 12.8-34.133333 34.133333-34.133333h640c17.066667 0 34.133333 12.8 34.133334 34.133333v640z",
                  "p-id": "3349"
                })
              ], -1)
            ])),
            createBaseVNode("button", {
              class: "red",
              onClick: _cache[2] || (_cache[2] = (...args) => unref(close) && unref(close)(...args))
            }, _cache[26] || (_cache[26] = [
              createBaseVNode("svg", {
                t: "1741916485573",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3182",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                  "p-id": "3183"
                })
              ], -1)
            ]))
          ]),
          createBaseVNode("div", _hoisted_3$8, [
            withDirectives(createBaseVNode("div", _hoisted_4$8, [
              createBaseVNode("div", _hoisted_5$8, [
                createBaseVNode("div", {
                  ref_key: "MiniUserFriendBoxButton",
                  ref: MiniUserFriendBoxButton,
                  class: "user-name",
                  onClick: _cache[3] || (_cache[3] = withModifiers((...args) => unref(UserFriendMiniBoxClick) && unref(UserFriendMiniBoxClick)(...args), ["stop"]))
                }, toDisplayString(selectedUserName.value), 513)
              ]),
              createVNode(UserFriendMiniBox)
            ], 512), [
              [vShow, unref(selectedUserUid) !== null]
            ]),
            withDirectives(createBaseVNode("div", _hoisted_6$8, [
              createBaseVNode("button", {
                class: "home-chat-top-other-button",
                title: "语音通话",
                onClick: _cache[4] || (_cache[4] = (...args) => unref(sendAudio) && unref(sendAudio)(...args))
              }, _cache[27] || (_cache[27] = [
                createBaseVNode("svg", {
                  t: "1742707680389",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3403",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M866.133333 605.866667L768 554.666667c-21.333333-12.8-46.933333-12.8-68.266667 0l-89.6 42.666666c-21.333333-4.266667-68.266667-21.333333-110.933333-64s-59.733333-89.6-64-110.933333l46.933333-89.6c12.8-21.333333 8.533333-46.933333 0-68.266667L426.666667 170.666667c-12.8-25.6-38.4-38.4-64-38.4H256c-38.4 0-72.533333 17.066667-93.866667 46.933333-21.333333 29.866667-25.6 64-17.066666 98.133333 38.4 119.466667 110.933333 285.866667 217.6 392.533334 106.666667 106.666667 273.066667 179.2 392.533333 217.6 12.8 4.266667 25.6 4.266667 34.133333 4.266666 21.333333 0 42.666667-8.533333 64-21.333333 29.866667-21.333333 46.933333-55.466667 46.933334-93.866667v-106.666666c4.266667-25.6-12.8-51.2-34.133334-64z m-25.6 174.933333c0 17.066667-8.533333 29.866667-21.333333 42.666667-8.533333 4.266667-21.333333 12.8-42.666667 4.266666-93.866667-29.866667-264.533333-98.133333-366.933333-204.8-102.4-102.4-170.666667-273.066667-204.8-366.933333-8.533333-21.333333 0-34.133333 4.266667-42.666667 8.533333-12.8 25.6-21.333333 42.666666-21.333333h106.666667c4.266667 0 8.533333 0 8.533333 4.266667l51.2 93.866666V298.666667l-42.666666 106.666666c-4.266667 8.533333-4.266667 12.8-4.266667 21.333334 0 4.266667 17.066667 85.333333 85.333333 153.6s149.333333 85.333333 153.6 85.333333c8.533333 0 12.8 0 21.333334-4.266667l102.4-51.2h8.533333l93.866667 51.2c4.266667 0 4.266667 4.266667 4.266666 8.533334v110.933333z",
                    "p-id": "3404"
                  })
                ], -1)
              ])),
              createBaseVNode("button", {
                class: "home-chat-top-other-button",
                title: "视频通话",
                onClick: _cache[5] || (_cache[5] = (...args) => unref(sendVideo) && unref(sendVideo)(...args))
              }, _cache[28] || (_cache[28] = [
                createBaseVNode("svg", {
                  t: "1742708500672",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "10143",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M602.224 891h-480.96C54.392 891 0 836.64 0 769.736v-515.44c0-66.872 54.392-121.304 121.264-121.304h480.96c66.864 0 121.296 54.424 121.296 121.304v88.312l253.032-146.104a31.76 31.76 0 0 1 31.632 0A31.632 31.632 0 0 1 1024 223.904v576.232a31.704 31.704 0 0 1-15.816 27.424 31.76 31.76 0 0 1-31.632 0L723.52 681.464v88.272c0 66.904-54.424 121.264-121.296 121.264z m-480.96-694.744c-32 0-58.008 26.04-58.008 58.04v515.44c0 32 26.008 58.008 58.008 58.008h480.96c32 0 58.04-26.008 58.04-58.008V626.664c0-11.304 6.024-21.752 15.816-27.432a31.744 31.744 0 0 1 31.624 0l253.04 146.104V278.688l-253.04 146.104a31.744 31.744 0 0 1-31.624 0 31.632 31.632 0 0 1-15.816-27.4V254.296c0-32-26.04-58.04-58.04-58.04h-480.96z",
                    fill: "#2c2c2c",
                    "p-id": "10144"
                  })
                ], -1)
              ])),
              createBaseVNode("button", {
                class: "home-chat-top-other-button",
                title: "屏幕共享",
                onClick: _cache[6] || (_cache[6] = (...args) => unref(sendok) && unref(sendok)(...args))
              }, _cache[29] || (_cache[29] = [
                createBaseVNode("svg", {
                  t: "1742708552223",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "11282",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M889.6 127.488H141.696c-38.656 0-70.08 31.488-70.08 70.144v467.392c0 38.656 31.488 70.144 70.08 70.144h342.976v99.456H368.384c-18.688 0-33.792 13.888-33.792 30.976s15.104 30.976 33.792 30.976h294.592c18.688 0 33.792-13.888 33.792-30.976s-15.104-30.976-33.792-30.976H546.688v-99.456H889.6c38.656 0 70.144-31.424 70.144-70.144V197.568c0-38.592-31.424-70.08-70.144-70.08z m4.864 526.592a22.272 22.272 0 0 1-22.272 22.336H159.168a22.272 22.272 0 0 1-22.272-22.336V208.512c0-12.352 10.048-22.272 22.272-22.272h713.024c12.288 0 22.272 9.92 22.272 22.272V654.08zM566.976 313.984c-13.184-10.624-23.936-2.88-23.936 15.872v49.984h-2.176c-77.056 0-208.128 89.024-209.216 168.192 0 6.336 5.12 8.128 10.048 0 24.896-44.416 129.536-67.456 182.848-67.456h18.496v52.736c0 15.744 11.648 26.496 24.896 15.872l121.856-97.792c13.184-10.56 13.184-27.904 0-38.528l-122.816-98.88z",
                    fill: "#2c2c2c",
                    "p-id": "11283"
                  })
                ], -1)
              ]))
            ], 512), [
              [vShow, unref(selectedUserUid) !== null]
            ])
          ])
        ], 4),
        withDirectives(createBaseVNode("div", _hoisted_7$7, [
          createBaseVNode("div", {
            ref_key: "chatBodyRef",
            ref: chatBodyRef,
            class: "home-chat-local-body"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(chatHistory.value, (message, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: "message"
              }, [
                message.user_take && message.fileType === "text" ? (openBlock(), createElementBlock("div", _hoisted_8$5, [
                  createBaseVNode("div", _hoisted_9$5, [
                    createBaseVNode("div", _hoisted_10$4, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("div", {
                      class: "user-message-text",
                      "data-menu-type": "text",
                      style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                    }, toDisplayString(message.user_take), 5)
                  ]),
                  createBaseVNode("div", _hoisted_11$4, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_12$4)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "audio" ? (openBlock(), createElementBlock("div", _hoisted_13$3, [
                  createBaseVNode("div", _hoisted_14$3, [
                    createBaseVNode("div", _hoisted_15$3, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("audio", {
                      ref_for: true,
                      ref: (el) => {
                        if (el) unref(audioElements)[index] = el;
                      },
                      src: message.user_take,
                      style: { "display": "none" },
                      onCanplay: (e) => unref(audioCanplay)(e, index)
                    }, null, 40, _hoisted_16$2),
                    createBaseVNode("div", {
                      class: "user-message-audio",
                      style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                    }, [
                      createBaseVNode("div", {
                        class: "user-message-audio-svg",
                        onClick: ($event) => unref(toggleAudio)(index)
                      }, [
                        unref(currentPlayingAudio).index === index && unref(currentPlayingAudio).isPlaying ? (openBlock(), createElementBlock("svg", _hoisted_18$2, _cache[30] || (_cache[30] = [
                          createBaseVNode("path", {
                            d: "M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m-48.64 716.8H352.256V307.2h111.104v409.6z m204.8 0h-111.104V307.2h111.104v409.6z",
                            "p-id": "8982",
                            fill: "#2c2c2c"
                          }, null, -1)
                        ]))) : (openBlock(), createElementBlock("svg", _hoisted_19$2, _cache[31] || (_cache[31] = [
                          createBaseVNode("path", {
                            d: "M511.81250029 62.29999971C263.58125029 62.29999971 62.28125 263.6 62.28125 511.81250029c0 248.21250029 201.30000029 449.49375 449.49375 449.49375 248.21250029 0 449.49375-201.28124971 449.49375-449.49375C961.28749971 263.6 760.00625 62.29999971 511.81250029 62.29999971z m157.29374971 462.86250029l-213.95625029 170.15625a17.15625 17.15625 0 0 1-27.82499942-13.46249971V341.63749971c0-14.36249971 16.57500029-22.29374971 27.82499942-13.46249971l213.84375029 170.15625c8.62499971 6.93749971 8.62499971 19.98749971 0.1125 26.81250029z",
                            fill: "#2c2c2c",
                            "p-id": "8536"
                          }, null, -1)
                        ])))
                      ], 8, _hoisted_17$2),
                      createBaseVNode("div", _hoisted_20$2, toDisplayString(getDisplayDuration(index)), 1)
                    ], 4)
                  ]),
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_22)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "images" ? (openBlock(), createElementBlock("div", _hoisted_23, [
                  createBaseVNode("div", _hoisted_24, [
                    createBaseVNode("div", _hoisted_25, toDisplayString(chatUserName.value), 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(getImageUrls(message.user_take), (img, index2) => {
                      return openBlock(), createElementBlock("img", {
                        key: index2,
                        src: img,
                        class: "user-message-img",
                        style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                      }, null, 12, _hoisted_26);
                    }), 128))
                  ]),
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_28)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "video" ? (openBlock(), createElementBlock("div", _hoisted_29, [
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("div", _hoisted_31, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("video", {
                      src: message.user_take,
                      class: "user-message-img",
                      style: normalizeStyle({ backgroundColor: unref(chat_bubbles) }),
                      controls: ""
                    }, null, 12, _hoisted_32)
                  ]),
                  createBaseVNode("div", _hoisted_33, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_34)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "pdf" ? (openBlock(), createElementBlock("div", _hoisted_35, [
                  createBaseVNode("div", _hoisted_36, [
                    createBaseVNode("div", _hoisted_37, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button",
                        onClick: withModifiers(($event) => unref(download_file)(message.user_take), ["stop"])
                      }, _cache[32] || (_cache[32] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_39), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_button",
                        onClick: _cache[7] || (_cache[7] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[33] || (_cache[33] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_40, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("div", _hoisted_42, toDisplayString(unref(file_name)(message.user_take)), 1),
                        createBaseVNode("div", _hoisted_43, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[34] || (_cache[34] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133041911",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3057",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M748 183.5V0H96v1024h836V183.5z",
                            fill: "#FF5562",
                            "p-id": "3058"
                          }),
                          createBaseVNode("path", {
                            d: "M932 184H748V0",
                            fill: "#FF9292",
                            "p-id": "3059"
                          }),
                          createBaseVNode("path", {
                            d: "M657.9 606.1c-29.4-1.9-57.4-12.9-79.9-31.3-44.2 9.4-86.3 22.9-128.4 39.6-33.5 57.4-64.8 86.6-91.8 86.6-5.4 0-11.9-1-16.2-4.2-11.3-5.1-18.5-16.1-18.3-28.2 0-9.4 2.1-35.5 104.7-78.2 23.3-41.3 42.4-84.6 57.2-129.4-12.9-25-41-86.6-21.6-117.9 6.5-11.5 19.4-17.7 33.5-16.7 11 0.1 21.4 5.1 28.1 13.6 14 18.8 12.9 58.4-5.4 116.8 17.3 31.3 39.9 59.5 66.9 83.5 22.7-4.2 45.3-7.3 68-7.3 50.7 1 58.3 24 57.2 37.5 0 35.6-35.7 35.6-54 35.6z m-302.2 64.6l3.2-1c15.1-5.2 27-15.6 35.6-29.2-16.2 6.3-29.1 16.6-38.8 30.2z m143.5-312.9H496c-1.1 0-3.3 0-4.3 1-4.3 17.7-1.1 36.5 6.5 53.2 6.2-17.5 6.6-36.5 1-54.2z m7.6 151.2l-1.1 2.1-1.1-1.1c-9.7 24-20.5 48-32.4 70.9l2.1-1v2.1c24-8.4 48.5-15.3 73.4-20.9l-1-1h3.3c-16.2-15.5-30.7-32.6-43.2-51.1z m146.8 55.3c-9.7 0-18.3 0-28 2.1 10.8 5.2 21.6 7.3 32.4 8.3 7.6 1 15.1 0 21.6-2.1-0.1-3-4.4-8.3-26-8.3z",
                            fill: "#FFFFFF",
                            "p-id": "3060"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_38)
                  ]),
                  createBaseVNode("div", _hoisted_44, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_45)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "excel" ? (openBlock(), createElementBlock("div", _hoisted_46, [
                  createBaseVNode("div", _hoisted_47, [
                    createBaseVNode("div", _hoisted_48, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button",
                        onClick: withModifiers(($event) => unref(download_file)(message.user_take), ["stop"])
                      }, _cache[35] || (_cache[35] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_50), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_button",
                        onClick: _cache[8] || (_cache[8] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[36] || (_cache[36] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_51, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_52, [
                        createBaseVNode("div", _hoisted_53, toDisplayString(unref(file_name)(message.user_take)), 1),
                        createBaseVNode("div", _hoisted_54, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[37] || (_cache[37] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133021478",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "2885",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M745 184.3V1H93v1022.5h836V184.3z",
                            fill: "#72DCA2",
                            "p-id": "2886"
                          }),
                          createBaseVNode("path", {
                            d: "M928.8 184h-184V0.8",
                            fill: "#A9FFCE",
                            "p-id": "2887"
                          }),
                          createBaseVNode("path", {
                            d: "M500.8 476.2l76.6-131h67.7L532.5 537.9 445.7 686H378l122.8-209.8z m-0.7 70.3l-6.6-11-112.7-190.3h67.7L525 474.4l8.9 15.2L650.3 686h-67.7l-82.5-139.5z",
                            fill: "#FCFCFC",
                            "p-id": "2888"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_49)
                  ]),
                  createBaseVNode("div", _hoisted_55, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_56)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "word" ? (openBlock(), createElementBlock("div", _hoisted_57, [
                  createBaseVNode("div", _hoisted_58, [
                    createBaseVNode("div", _hoisted_59, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button",
                        onClick: withModifiers(($event) => unref(download_file)(message.user_take), ["stop"])
                      }, _cache[38] || (_cache[38] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_61), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_button",
                        onClick: _cache[9] || (_cache[9] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[39] || (_cache[39] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_62, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_63, [
                        createBaseVNode("div", _hoisted_64, toDisplayString(unref(file_name)(message.user_take)), 1),
                        createBaseVNode("div", _hoisted_65, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[40] || (_cache[40] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133008598",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "2713",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M745 186V3H93v1021h836V186z",
                            fill: "#6CA2FF",
                            "p-id": "2714"
                          }),
                          createBaseVNode("path", {
                            d: "M929 186H745V3",
                            fill: "#A2CBFC",
                            "p-id": "2715"
                          }),
                          createBaseVNode("path", {
                            d: "M490.4 344.2H542l65.2 227.3L651 344.2h66.1L638.5 685H578l-60.5-238.1L454.3 685h-60.5l-78.5-340.8h66.1l43.8 227.3 65.2-227.3z",
                            fill: "#FCFCFC",
                            "p-id": "2716"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_60)
                  ]),
                  createBaseVNode("div", _hoisted_66, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_67)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "html" ? (openBlock(), createElementBlock("div", _hoisted_68, [
                  createBaseVNode("div", _hoisted_69, [
                    createBaseVNode("div", _hoisted_70, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button",
                        onClick: withModifiers(($event) => unref(download_file)(message.user_take), ["stop"])
                      }, _cache[41] || (_cache[41] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_72), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_button",
                        onClick: _cache[10] || (_cache[10] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[42] || (_cache[42] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_73, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_74, [
                        createBaseVNode("div", _hoisted_75, toDisplayString(unref(file_name)(message.user_take)), 1),
                        createBaseVNode("div", _hoisted_76, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[43] || (_cache[43] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133149852",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3563",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M748 183.5V0H96v1024h836V183.5z",
                            fill: "#383838",
                            "p-id": "3564"
                          }),
                          createBaseVNode("path", {
                            d: "M932 184H748V0",
                            fill: "#6D6D6C",
                            "p-id": "3565"
                          }),
                          createBaseVNode("path", {
                            d: "M432.7 412l-20-20c-2.9-2.9-7.1-2.9-10 0L291.5 503.3c-1.4 1.4-2.1 3.6-2.1 5s0.7 3.6 2.1 5l111.3 111.3c2.9 2.9 7.1 2.9 10 0l20-20c2.9-2.9 2.9-7.1 0-10L347.1 509l85.6-85.6c2.9-3.6 2.9-8.6 0-11.4z m304.6 91.3L626.7 392c-2.9-2.9-7.1-2.9-10 0l-20 20c-2.9 2.9-2.9 7.1 0 10l85.6 85.6-85.6 85.6c-2.9 2.9-2.9 7.1 0 10l20 20c2.9 2.9 7.1 2.9 10 0L738 511.9c1.4-1.4 2.1-3.6 2.1-5-0.6-0.7-1.3-2.2-2.8-3.6z m-169-156.9c-11.4-3.6-23.5 2.9-27.1 13.6l-92.7 284.6c-3.6 11.4 2.9 23.5 13.6 27.1 10.7 3.6 23.5-2.9 27.1-13.6l92.7-285.4c3.5-10.6-2.2-22.8-13.6-26.3z",
                            fill: "#FFFFFF",
                            "p-id": "3566"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_71)
                  ]),
                  createBaseVNode("div", _hoisted_77, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_78)
                  ])
                ])) : createCommentVNode("", true),
                message.user_take && message.fileType === "audios" ? (openBlock(), createElementBlock("div", _hoisted_79, [
                  createBaseVNode("div", _hoisted_80, [
                    createBaseVNode("div", _hoisted_81, toDisplayString(chatUserName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button",
                        onClick: withModifiers(($event) => unref(download_file)(message.user_take, index), ["stop"])
                      }, _cache[44] || (_cache[44] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_83), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_button",
                        onClick: withModifiers(($event) => unref(open_file_local)(index), ["stop"])
                      }, _cache[45] || (_cache[45] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 8, _hoisted_84), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_85, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_86, [
                        createBaseVNode("div", _hoisted_87, toDisplayString(unref(file_name)(message.user_take)), 1),
                        createBaseVNode("div", _hoisted_88, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[46] || (_cache[46] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133093124",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3393",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M748 183.5V0H96v1024h836V183.5z",
                            fill: "#FF6955",
                            "p-id": "3394"
                          }),
                          createBaseVNode("path", {
                            d: "M932 184H748V0",
                            fill: "#FFA694",
                            "p-id": "3395"
                          }),
                          createBaseVNode("path", {
                            d: "M586.7 302.1c-5.3 7.5-34.2 20.3-58.7 25.6-31 6.4-47 11.7-63 20.3-21.3 12.8-33.1 28.8-31 43.8 1.1 3.2 26.7 40.6 56.6 83.2 31 42.7 56.6 79 57.6 80 1.1 2.1-3.2 2.1-18.1 1.1-47-3.2-89.6 21.3-108.9 59.8-5.3 11.7-6.4 18.1-6.4 32 0 32 17.1 57.6 49.1 72.6 12.8 5.3 17.1 6.4 43.8 6.4 28.8 0 29.9 0 49.1-9.6C608 692.8 629.4 644.7 608 601c-4.3-9.6-31-55.5-59.8-102.5L496 412h8.5c34.2-2.1 57.6-12.8 73.6-31 13.9-16 18.1-32 17.1-57.6-1-23.5-3.2-28.8-8.5-21.3z",
                            fill: "#FFFFFF",
                            "p-id": "3396"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_82)
                  ]),
                  createBaseVNode("div", _hoisted_89, [
                    createBaseVNode("img", {
                      src: chatUserHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_90)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "text" ? (openBlock(), createElementBlock("div", _hoisted_91, [
                  createBaseVNode("div", _hoisted_92, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_93)
                  ]),
                  createBaseVNode("div", _hoisted_94, [
                    createBaseVNode("div", _hoisted_95, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("div", _hoisted_96, toDisplayString(message.friend_user_take), 1)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "audio" ? (openBlock(), createElementBlock("div", _hoisted_97, [
                  createBaseVNode("div", _hoisted_98, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_99)
                  ]),
                  createBaseVNode("div", _hoisted_100, [
                    createBaseVNode("div", _hoisted_101, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("audio", {
                      ref_for: true,
                      ref: (el) => {
                        if (el) unref(audioElements)[index] = el;
                      },
                      src: message.friend_user_take,
                      style: { "display": "none" }
                    }, null, 8, _hoisted_102),
                    createBaseVNode("div", {
                      style: normalizeStyle({ backgroundColor: unref(chat_bubbles) }),
                      class: "friend-message-audio"
                    }, [
                      createBaseVNode("div", {
                        class: "user-message-audio-svg",
                        onClick: ($event) => unref(toggleAudio)(index)
                      }, [
                        unref(currentPlayingAudio).index === index && unref(currentPlayingAudio).isPlaying ? (openBlock(), createElementBlock("svg", _hoisted_104, _cache[47] || (_cache[47] = [
                          createBaseVNode("path", {
                            d: "M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m-48.64 716.8H352.256V307.2h111.104v409.6z m204.8 0h-111.104V307.2h111.104v409.6z",
                            "p-id": "8982",
                            fill: "#2c2c2c"
                          }, null, -1)
                        ]))) : (openBlock(), createElementBlock("svg", _hoisted_105, _cache[48] || (_cache[48] = [
                          createBaseVNode("path", {
                            d: "M511.81250029 62.29999971C263.58125029 62.29999971 62.28125 263.6 62.28125 511.81250029c0 248.21250029 201.30000029 449.49375 449.49375 449.49375 248.21250029 0 449.49375-201.28124971 449.49375-449.49375C961.28749971 263.6 760.00625 62.29999971 511.81250029 62.29999971z m157.29374971 462.86250029l-213.95625029 170.15625a17.15625 17.15625 0 0 1-27.82499942-13.46249971V341.63749971c0-14.36249971 16.57500029-22.29374971 27.82499942-13.46249971l213.84375029 170.15625c8.62499971 6.93749971 8.62499971 19.98749971 0.1125 26.81250029z",
                            fill: "#2c2c2c",
                            "p-id": "8536"
                          }, null, -1)
                        ])))
                      ], 8, _hoisted_103),
                      createBaseVNode("div", _hoisted_106, toDisplayString(getDisplayDuration(index)), 1)
                    ], 4)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "images" ? (openBlock(), createElementBlock("div", _hoisted_107, [
                  createBaseVNode("div", _hoisted_108, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_109)
                  ]),
                  createBaseVNode("div", _hoisted_110, [
                    createBaseVNode("div", _hoisted_111, toDisplayString(chatUserFriendName.value), 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(getImageUrls(message.friend_user_take), (img, index2) => {
                      return openBlock(), createElementBlock("img", {
                        key: index2,
                        src: img,
                        class: "friend-message-img",
                        style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                      }, null, 12, _hoisted_112);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "video" ? (openBlock(), createElementBlock("div", _hoisted_113, [
                  createBaseVNode("div", _hoisted_114, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_115)
                  ]),
                  createBaseVNode("div", _hoisted_116, [
                    createBaseVNode("div", _hoisted_117, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("video", {
                      src: message.friend_user_take,
                      class: "friend-message-img",
                      style: normalizeStyle({ backgroundColor: unref(chat_bubbles) }),
                      controls: ""
                    }, null, 12, _hoisted_118)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "pdf" ? (openBlock(), createElementBlock("div", _hoisted_119, [
                  createBaseVNode("div", _hoisted_120, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_121)
                  ]),
                  createBaseVNode("div", _hoisted_122, [
                    createBaseVNode("div", _hoisted_123, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini-friend",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button_friend",
                        onClick: withModifiers(($event) => unref(download_file)(message.friend_user_take), ["stop"])
                      }, _cache[49] || (_cache[49] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_125), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_friend_button",
                        onClick: _cache[11] || (_cache[11] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[50] || (_cache[50] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_126, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_127, [
                        createBaseVNode("div", _hoisted_128, toDisplayString(unref(file_name)(message.friend_user_take)), 1),
                        createBaseVNode("div", _hoisted_129, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[51] || (_cache[51] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133041911",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3057",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M748 183.5V0H96v1024h836V183.5z",
                            fill: "#FF5562",
                            "p-id": "3058"
                          }),
                          createBaseVNode("path", {
                            d: "M932 184H748V0",
                            fill: "#FF9292",
                            "p-id": "3059"
                          }),
                          createBaseVNode("path", {
                            d: "M657.9 606.1c-29.4-1.9-57.4-12.9-79.9-31.3-44.2 9.4-86.3 22.9-128.4 39.6-33.5 57.4-64.8 86.6-91.8 86.6-5.4 0-11.9-1-16.2-4.2-11.3-5.1-18.5-16.1-18.3-28.2 0-9.4 2.1-35.5 104.7-78.2 23.3-41.3 42.4-84.6 57.2-129.4-12.9-25-41-86.6-21.6-117.9 6.5-11.5 19.4-17.7 33.5-16.7 11 0.1 21.4 5.1 28.1 13.6 14 18.8 12.9 58.4-5.4 116.8 17.3 31.3 39.9 59.5 66.9 83.5 22.7-4.2 45.3-7.3 68-7.3 50.7 1 58.3 24 57.2 37.5 0 35.6-35.7 35.6-54 35.6z m-302.2 64.6l3.2-1c15.1-5.2 27-15.6 35.6-29.2-16.2 6.3-29.1 16.6-38.8 30.2z m143.5-312.9H496c-1.1 0-3.3 0-4.3 1-4.3 17.7-1.1 36.5 6.5 53.2 6.2-17.5 6.6-36.5 1-54.2z m7.6 151.2l-1.1 2.1-1.1-1.1c-9.7 24-20.5 48-32.4 70.9l2.1-1v2.1c24-8.4 48.5-15.3 73.4-20.9l-1-1h3.3c-16.2-15.5-30.7-32.6-43.2-51.1z m146.8 55.3c-9.7 0-18.3 0-28 2.1 10.8 5.2 21.6 7.3 32.4 8.3 7.6 1 15.1 0 21.6-2.1-0.1-3-4.4-8.3-26-8.3z",
                            fill: "#FFFFFF",
                            "p-id": "3060"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_124)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "excel" ? (openBlock(), createElementBlock("div", _hoisted_130, [
                  createBaseVNode("div", _hoisted_131, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_132)
                  ]),
                  createBaseVNode("div", _hoisted_133, [
                    createBaseVNode("div", _hoisted_134, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini-friend",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button_friend",
                        onClick: withModifiers(($event) => unref(download_file)(message.friend_user_take), ["stop"])
                      }, _cache[52] || (_cache[52] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_136), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_friend_button",
                        onClick: _cache[12] || (_cache[12] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[53] || (_cache[53] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_137, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_138, [
                        createBaseVNode("div", _hoisted_139, toDisplayString(unref(file_name)(message.friend_user_take)), 1),
                        createBaseVNode("div", _hoisted_140, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[54] || (_cache[54] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133021478",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "2885",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M745 184.3V1H93v1022.5h836V184.3z",
                            fill: "#72DCA2",
                            "p-id": "2886"
                          }),
                          createBaseVNode("path", {
                            d: "M928.8 184h-184V0.8",
                            fill: "#A9FFCE",
                            "p-id": "2887"
                          }),
                          createBaseVNode("path", {
                            d: "M500.8 476.2l76.6-131h67.7L532.5 537.9 445.7 686H378l122.8-209.8z m-0.7 70.3l-6.6-11-112.7-190.3h67.7L525 474.4l8.9 15.2L650.3 686h-67.7l-82.5-139.5z",
                            fill: "#FCFCFC",
                            "p-id": "2888"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_135)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "word" ? (openBlock(), createElementBlock("div", _hoisted_141, [
                  createBaseVNode("div", _hoisted_142, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_143)
                  ]),
                  createBaseVNode("div", _hoisted_144, [
                    createBaseVNode("div", _hoisted_145, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini-friend",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button_friend",
                        onClick: withModifiers(($event) => unref(download_file)(message.friend_user_take), ["stop"])
                      }, _cache[55] || (_cache[55] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_147), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_friend_button",
                        onClick: _cache[13] || (_cache[13] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[56] || (_cache[56] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_148, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_149, [
                        createBaseVNode("div", _hoisted_150, toDisplayString(unref(file_name)(message.friend_user_take)), 1),
                        createBaseVNode("div", _hoisted_151, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[57] || (_cache[57] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133008598",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "2713",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M745 186V3H93v1021h836V186z",
                            fill: "#6CA2FF",
                            "p-id": "2714"
                          }),
                          createBaseVNode("path", {
                            d: "M929 186H745V3",
                            fill: "#A2CBFC",
                            "p-id": "2715"
                          }),
                          createBaseVNode("path", {
                            d: "M490.4 344.2H542l65.2 227.3L651 344.2h66.1L638.5 685H578l-60.5-238.1L454.3 685h-60.5l-78.5-340.8h66.1l43.8 227.3 65.2-227.3z",
                            fill: "#FCFCFC",
                            "p-id": "2716"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_146)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "html" ? (openBlock(), createElementBlock("div", _hoisted_152, [
                  createBaseVNode("div", _hoisted_153, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_154)
                  ]),
                  createBaseVNode("div", _hoisted_155, [
                    createBaseVNode("div", _hoisted_156, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini-friend",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button_friend",
                        onClick: withModifiers(($event) => unref(download_file)(message.friend_user_take), ["stop"])
                      }, _cache[58] || (_cache[58] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_158), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_friend_button",
                        onClick: _cache[14] || (_cache[14] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[59] || (_cache[59] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_159, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_160, [
                        createBaseVNode("div", _hoisted_161, toDisplayString(unref(file_name)(message.friend_user_take)), 1),
                        createBaseVNode("div", _hoisted_162, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[60] || (_cache[60] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133149852",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3563",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M748 183.5V0H96v1024h836V183.5z",
                            fill: "#383838",
                            "p-id": "3564"
                          }),
                          createBaseVNode("path", {
                            d: "M932 184H748V0",
                            fill: "#6D6D6C",
                            "p-id": "3565"
                          }),
                          createBaseVNode("path", {
                            d: "M432.7 412l-20-20c-2.9-2.9-7.1-2.9-10 0L291.5 503.3c-1.4 1.4-2.1 3.6-2.1 5s0.7 3.6 2.1 5l111.3 111.3c2.9 2.9 7.1 2.9 10 0l20-20c2.9-2.9 2.9-7.1 0-10L347.1 509l85.6-85.6c2.9-3.6 2.9-8.6 0-11.4z m304.6 91.3L626.7 392c-2.9-2.9-7.1-2.9-10 0l-20 20c-2.9 2.9-2.9 7.1 0 10l85.6 85.6-85.6 85.6c-2.9 2.9-2.9 7.1 0 10l20 20c2.9 2.9 7.1 2.9 10 0L738 511.9c1.4-1.4 2.1-3.6 2.1-5-0.6-0.7-1.3-2.2-2.8-3.6z m-169-156.9c-11.4-3.6-23.5 2.9-27.1 13.6l-92.7 284.6c-3.6 11.4 2.9 23.5 13.6 27.1 10.7 3.6 23.5-2.9 27.1-13.6l92.7-285.4c3.5-10.6-2.2-22.8-13.6-26.3z",
                            fill: "#FFFFFF",
                            "p-id": "3566"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_157)
                  ])
                ])) : createCommentVNode("", true),
                message.friend_user_take && message.fileType === "audios" ? (openBlock(), createElementBlock("div", _hoisted_163, [
                  createBaseVNode("div", _hoisted_164, [
                    createBaseVNode("img", {
                      src: chatUserFriendHeadshot.value,
                      alt: ""
                    }, null, 8, _hoisted_165)
                  ]),
                  createBaseVNode("div", _hoisted_166, [
                    createBaseVNode("div", _hoisted_167, toDisplayString(chatUserFriendName.value), 1),
                    createBaseVNode("div", {
                      class: "file-view-box-mini-friend",
                      onClick: ($event) => toggleDownloadButton(index)
                    }, [
                      withDirectives(createBaseVNode("div", {
                        class: "download_button_friend",
                        onClick: withModifiers(($event) => unref(download_file)(message.friend_user_take), ["stop"])
                      }, _cache[61] || (_cache[61] = [
                        createBaseVNode("svg", {
                          t: "1743238450807",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "4604",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z",
                            "p-id": "4605"
                          })
                        ], -1)
                      ]), 8, _hoisted_169), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      withDirectives(createBaseVNode("div", {
                        class: "open_file_friend_button",
                        onClick: _cache[15] || (_cache[15] = withModifiers(() => {
                        }, ["stop"]))
                      }, _cache[62] || (_cache[62] = [
                        createBaseVNode("svg", {
                          t: "1743308430768",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3353",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                            "p-id": "3354"
                          })
                        ], -1)
                      ]), 512), [
                        [vShow, activeDownloadIndex.value === index]
                      ]),
                      createBaseVNode("div", _hoisted_170, toDisplayString(message.isdownload), 1),
                      createBaseVNode("div", _hoisted_171, [
                        createBaseVNode("div", _hoisted_172, toDisplayString(unref(file_name)(message.friend_user_take)), 1),
                        createBaseVNode("div", _hoisted_173, toDisplayString(unref(formatFileSize)(message.fileSize)), 1)
                      ]),
                      _cache[63] || (_cache[63] = createBaseVNode("div", { class: "file-view-box-mini-svg" }, [
                        createBaseVNode("svg", {
                          t: "1743133093124",
                          class: "icon",
                          viewBox: "0 0 1024 1024",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "p-id": "3393",
                          width: "200",
                          height: "200"
                        }, [
                          createBaseVNode("path", {
                            d: "M748 183.5V0H96v1024h836V183.5z",
                            fill: "#FF6955",
                            "p-id": "3394"
                          }),
                          createBaseVNode("path", {
                            d: "M932 184H748V0",
                            fill: "#FFA694",
                            "p-id": "3395"
                          }),
                          createBaseVNode("path", {
                            d: "M586.7 302.1c-5.3 7.5-34.2 20.3-58.7 25.6-31 6.4-47 11.7-63 20.3-21.3 12.8-33.1 28.8-31 43.8 1.1 3.2 26.7 40.6 56.6 83.2 31 42.7 56.6 79 57.6 80 1.1 2.1-3.2 2.1-18.1 1.1-47-3.2-89.6 21.3-108.9 59.8-5.3 11.7-6.4 18.1-6.4 32 0 32 17.1 57.6 49.1 72.6 12.8 5.3 17.1 6.4 43.8 6.4 28.8 0 29.9 0 49.1-9.6C608 692.8 629.4 644.7 608 601c-4.3-9.6-31-55.5-59.8-102.5L496 412h8.5c34.2-2.1 57.6-12.8 73.6-31 13.9-16 18.1-32 17.1-57.6-1-23.5-3.2-28.8-8.5-21.3z",
                            fill: "#FFFFFF",
                            "p-id": "3396"
                          })
                        ])
                      ], -1))
                    ], 8, _hoisted_168)
                  ])
                ])) : createCommentVNode("", true)
              ]);
            }), 128))
          ], 512),
          withDirectives(createVNode(ChatAudio, null, null, 512), [
            [vShow, unref(ischatAudio) === true]
          ]),
          withDirectives(createVNode(ChatImage, null, null, 512), [
            [vShow, unref(ischatImage) === true]
          ]),
          withDirectives(createVNode(ChatFile, null, null, 512), [
            [vShow, unref(ischatFile) === true]
          ]),
          withDirectives(createBaseVNode("div", {
            ref_key: "localInput",
            ref: localInput,
            class: "home-chat-local-input"
          }, [
            createBaseVNode("div", _hoisted_174, [
              _cache[67] || (_cache[67] = createBaseVNode("button", { class: "home-chat-local-input-button" }, [
                createBaseVNode("svg", {
                  t: "1742956168835",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "4895",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z",
                    fill: "#272536",
                    "p-id": "4896"
                  }),
                  createBaseVNode("path", {
                    d: "M807.273469 216.727043c-162.808016-162.836669-427.736874-162.836669-590.544891 0-162.836669 162.806993-162.836669 427.736874 0 590.543867 162.808016 162.837692 427.737898 162.837692 590.544891 0C970.110137 644.462894 970.110137 379.534036 807.273469 216.727043M764.893242 764.92036c-139.444912 139.443889-366.370225 139.414213-505.798764 0-139.459239-139.473565-139.459239-366.354875 0-505.827417 139.428539-139.429563 366.354875-139.460262 505.798764 0C904.336108 398.521482 904.336108 625.476471 764.893242 764.92036",
                    fill: "#231F20",
                    "p-id": "4897"
                  }),
                  createBaseVNode("path", {
                    d: "M381.724423 468.02137c24.783453 0 44.953841-20.169365 44.953841-44.967144 0-24.828478-20.170388-45.027519-44.953841-45.027519-24.842805 0-45.013193 20.199041-45.013193 45.027519C336.71123 447.852004 356.881618 468.02137 381.724423 468.02137",
                    fill: "#231F20",
                    "p-id": "4898"
                  }),
                  createBaseVNode("path", {
                    d: "M640.680243 468.095048c24.812105 0 45.010123-20.213367 45.010123-45.01217 0-24.827455-20.198018-44.99682-45.010123-44.99682-24.785499 0-44.953841 20.169365-44.953841 44.99682C595.726401 447.88168 615.894743 468.095048 640.680243 468.095048",
                    fill: "#231F20",
                    "p-id": "4899"
                  }),
                  createBaseVNode("path", {
                    d: "M642.245901 619.058294l-2.453888 0.798179c-40.310078 18.248619-83.548858 27.5341-128.411625 27.5341-46.343491 0-90.173742-9.375531-130.305765-27.799136l-2.425236-0.741897c-1.508353-0.413416-3.548826-1.003863-6.092765-1.003863-14.757099 0-26.734898 11.977799-26.734898 26.675546 0 6.978948 3.282766 13.988596 8.695033 19.253506l-0.325411 1.62501 6.831592 3.076058c47.911196 21.679765 100.021018 33.095769 150.681838 33.095769 51.608402 0 102.180194-11.120268 150.978597-33.361829 8.575306-4.703115 13.928221-13.721513 13.928221-23.511483C676.611593 627.458615 661.027663 613.290941 642.245901 619.058294",
                    fill: "#231F20",
                    "p-id": "4900"
                  })
                ])
              ], -1)),
              createBaseVNode("button", {
                class: "home-chat-local-input-button",
                onClick: _cache[17] || (_cache[17] = (...args) => unref(chatFileFonc) && unref(chatFileFonc)(...args))
              }, [
                _cache[64] || (_cache[64] = createBaseVNode("svg", {
                  t: "1743058027107",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3235",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z",
                    "p-id": "3236"
                  })
                ], -1)),
                createBaseVNode("input", {
                  ref_key: "chatFile",
                  ref: chatFile,
                  type: "file",
                  style: { "display": "none" },
                  multiple: "",
                  onChange: _cache[16] || (_cache[16] = (...args) => unref(chooseFile) && unref(chooseFile)(...args))
                }, null, 544)
              ]),
              createBaseVNode("button", {
                class: "home-chat-local-input-button",
                onClick: _cache[19] || (_cache[19] = (...args) => unref(chatImageFonc) && unref(chatImageFonc)(...args))
              }, [
                _cache[65] || (_cache[65] = createBaseVNode("svg", {
                  t: "1742955465045",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3235",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M874.666667 136.533333h-725.333334c-42.666667 0-72.533333 34.133333-72.533333 76.8v597.333334c0 42.666667 34.133333 76.8 76.8 76.8h725.333333c42.666667 0 76.8-34.133333 76.8-76.8V213.333333c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m-725.333334 68.266667h725.333334c4.266667 0 8.533333 4.266667 8.533333 8.533333v448l-311.466667-238.933333c-12.8-8.533333-34.133333-8.533333-42.666666 4.266667l-106.666667 128L341.333333 486.4c-12.8-8.533333-29.866667-8.533333-42.666666 4.266667l-157.866667 157.866666V213.333333c-4.266667-4.266667 4.266667-8.533333 8.533333-8.533333zM887.466667 810.666667c0 4.266667-4.266667 8.533333-8.533334 8.533333h-725.333333c-4.266667 0-8.533333-4.266667-8.533333-8.533333v-72.533334L324.266667 554.666667l85.333333 68.266666c12.8 12.8 34.133333 8.533333 42.666667-4.266666l106.666666-128 324.266667 247.466666V810.666667z",
                    "p-id": "3236"
                  }),
                  createBaseVNode("path", {
                    d: "M307.2 418.133333c34.133333 0 64-29.866667 64-64s-25.6-64-64-64-59.733333 25.6-59.733333 59.733334 25.6 68.266667 59.733333 68.266666z m4.266667-68.266666V384v-34.133333c-4.266667 4.266667 0 0 0 0z",
                    "p-id": "3237"
                  })
                ], -1)),
                createBaseVNode("input", {
                  ref_key: "chatImage",
                  ref: chatImage,
                  type: "file",
                  accept: "image/*",
                  style: { "display": "none" },
                  multiple: "",
                  onChange: _cache[18] || (_cache[18] = (...args) => unref(chooseImage) && unref(chooseImage)(...args))
                }, null, 544)
              ]),
              createBaseVNode("button", {
                class: "home-chat-local-input-button",
                onClick: _cache[20] || (_cache[20] = (...args) => unref(chatAudiofonc) && unref(chatAudiofonc)(...args))
              }, _cache[66] || (_cache[66] = [
                createBaseVNode("svg", {
                  t: "1742956244740",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "4198",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M544 851.946667V906.666667a32 32 0 0 1-64 0v-54.72C294.688 835.733333 149.333333 680.170667 149.333333 490.666667v-21.333334a32 32 0 0 1 64 0v21.333334c0 164.949333 133.717333 298.666667 298.666667 298.666666s298.666667-133.717333 298.666667-298.666666v-21.333334a32 32 0 0 1 64 0v21.333334c0 189.514667-145.354667 345.066667-330.666667 361.28zM298.666667 298.56C298.666667 180.8 394.165333 85.333333 512 85.333333c117.781333 0 213.333333 95.541333 213.333333 213.226667v192.213333C725.333333 608.533333 629.834667 704 512 704c-117.781333 0-213.333333-95.541333-213.333333-213.226667V298.56z m64 0v192.213333C362.666667 573.12 429.557333 640 512 640c82.496 0 149.333333-66.805333 149.333333-149.226667V298.56C661.333333 216.213333 594.442667 149.333333 512 149.333333c-82.496 0-149.333333 66.805333-149.333333 149.226667z",
                    fill: "#000000",
                    "p-id": "4199"
                  })
                ], -1)
              ]))
            ]),
            withDirectives(createBaseVNode("textarea", {
              "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => isRef(user_send_message) ? user_send_message.value = $event : null),
              "data-menu-type": "textarea",
              onKeydown: _cache[22] || (_cache[22] = withKeys(($event) => unref(send_message)(unref(user_send_message)), ["enter"]))
            }, null, 544), [
              [vModelText, unref(user_send_message)]
            ]),
            createBaseVNode("div", _hoisted_175, [
              createBaseVNode("button", {
                class: "home-chat-local-input-out-put",
                style: normalizeStyle({ backgroundColor: unref(accent_color) }),
                onClick: _cache[23] || (_cache[23] = ($event) => unref(send_message)(unref(user_send_message)))
              }, _cache[68] || (_cache[68] = [
                createBaseVNode("div", { style: { "-webkit-user-select": "none", "-webkit-user-drag": "none" } }, "发送", -1)
              ]), 4)
            ])
          ], 512), [
            [vShow, unref(ischatAudio) === false && unref(ischatImage) === false && unref(ischatFile) === false]
          ])
        ], 512), [
          [vShow, unref(selectedUserUid) !== null]
        ])
      ]);
    };
  }
};
const HomeChat = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-8289efe4"]]);
const _hoisted_1$7 = { class: "user-Profile" };
const _hoisted_2$7 = { class: "user-Profile-box" };
const _hoisted_3$7 = { class: "user-Profile-box-top" };
const _hoisted_4$7 = { class: "user-Profile-box-center" };
const _hoisted_5$7 = ["src"];
const _hoisted_6$7 = { class: "user-Profile-box-center-text" };
const _hoisted_7$6 = { class: "user-Profile-box-center-text" };
const _hoisted_8$4 = { class: "user-Profile-box-center-text" };
const _hoisted_9$4 = { class: "user-Profile-box-center-text" };
const _hoisted_10$3 = { class: "user-Profile-box-center-text" };
const _hoisted_11$3 = { class: "user-Profile-box-center-text" };
const _hoisted_12$3 = { class: "user-Profile-box-bottom" };
const _sfc_main$8 = {
  __name: "UserProfile",
  setup(__props) {
    onMounted(() => {
      user_profile.value.user_name = user.value.user_name;
      user_profile.value.user_headshot = user.value.user_headshot;
      user_profile.value.user_personal_signature = user.value.user_personal_signature;
      user_profile.value.user_gender = user.value.user_gender;
      user_profile.value.user_birthday = user.value.user_birthday;
      user_profile.value.user_country = user.value.user_country;
      user_profile.value.user_region = user.value.user_region;
      console.log("用户资料", user_profile.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$7, [
          createBaseVNode("div", _hoisted_3$7, [
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "user-Profile-box-top-text" }, "编辑资料", -1)),
            createBaseVNode("button", {
              class: "user-Profile-box-top-close-button",
              onClick: _cache[0] || (_cache[0] = ($event) => isUserProfile.value = false)
            }, _cache[11] || (_cache[11] = [
              createBaseVNode("svg", {
                t: "1742388636219",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3405",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                  "p-id": "3406"
                })
              ], -1)
            ]))
          ]),
          createBaseVNode("div", _hoisted_4$7, [
            createBaseVNode("div", {
              class: "user-Profile-box-center-img",
              onClick: _cache[2] || (_cache[2] = (...args) => unref(clickInputImage) && unref(clickInputImage)(...args))
            }, [
              _cache[13] || (_cache[13] = createBaseVNode("div", { class: "user-Profile-box-center-img-svg" }, [
                createBaseVNode("svg", {
                  t: "1742523455835",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "4738",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M512.525979 387.184273c-91.341335 0-165.656901 74.31045-165.656901 165.656901 0 91.341335 74.314543 165.656901 165.656901 165.656901s165.656901-74.314543 165.656901-165.656901C678.18288 461.494723 603.868337 387.184273 512.525979 387.184273L512.525979 387.184273zM512.525979 685.364443c-73.074296 0-132.523269-59.448974-132.523269-132.523269 0-73.075319 59.448974-132.527362 132.523269-132.527362s132.523269 59.452044 132.523269 132.527362C645.049249 625.915469 585.597205 685.364443 512.525979 685.364443L512.525979 685.364443zM512.525979 685.364443",
                    fill: "#272636",
                    "p-id": "4739"
                  }),
                  createBaseVNode("path", {
                    d: "M282.389532 381.457852l-60.621682 0c-13.377682 0-24.222681 10.840906-24.222681 24.214495 0 13.377682 10.840906 24.218588 24.222681 24.218588l60.625776 0c13.372565 0 24.218588-10.844999 24.218588-24.218588C306.60812 392.302851 295.766191 381.457852 282.389532 381.457852L282.389532 381.457852zM282.389532 381.457852",
                    fill: "#272636",
                    "p-id": "4740"
                  }),
                  createBaseVNode("path", {
                    d: "M828.570006 322.573743 672.27431 322.573743l-24.273846-94.374414c-3.325745-14.913665-16.836457-25.696242-32.299637-25.696242L409.332712 202.503087c-15.261589 0.004093-28.488845 10.331299-32.118512 24.988114l-24.435529 95.085612L196.478883 322.576813c-35.818787 0-64.962547 27.715225-64.962547 61.779042l0 380.038526c0 34.065863 29.143761 61.779042 64.962547 61.779042l632.091122 0c35.82288 0 64.962547-27.714202 64.962547-61.779042L893.532553 384.352785C893.536646 350.292038 864.392886 322.573743 828.570006 322.573743L828.570006 322.573743zM860.404038 764.390287c0 15.793708-14.281261 28.646434-31.829939 28.646434L196.478883 793.036721c-17.551748 0-31.828916-12.851703-31.828916-28.646434L164.649967 384.352785c0-15.793708 14.281261-28.646434 31.828916-28.646434l169.147398 0c7.560186 0 14.159488-5.117554 16.043395-12.441357l27.6702-107.629299 206.325136-0.236384c0.051165 0.248663 0.106424 0.497327 0.169869 0.74599l27.548426 107.123786c1.883907 7.319709 8.487302 12.437264 16.046464 12.437264l169.139212 0c17.552771 0 31.834033 12.851703 31.834033 28.646434L860.403015 764.390287 860.404038 764.390287zM860.404038 764.390287",
                    fill: "#272636",
                    "p-id": "4741"
                  })
                ])
              ], -1)),
              createBaseVNode("img", {
                src: unref(user_profile).user_headshot,
                alt: ""
              }, null, 8, _hoisted_5$7),
              createBaseVNode("input", {
                ref_key: "changeUserHeadshot",
                ref: changeUserHeadshot,
                type: "file",
                style: { "display": "none" },
                alt: "",
                accept: "image/*",
                onChange: _cache[1] || (_cache[1] = (...args) => unref(handleFileUpload) && unref(handleFileUpload)(...args))
              }, null, 544)
            ]),
            createBaseVNode("div", _hoisted_6$7, [
              _cache[14] || (_cache[14] = createBaseVNode("div", { class: "user-Profile-box-center-text-name" }, "昵称", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(user_profile).user_name = $event),
                maxlength: "36"
              }, null, 512), [
                [vModelText, unref(user_profile).user_name]
              ])
            ]),
            createBaseVNode("div", _hoisted_7$6, [
              _cache[15] || (_cache[15] = createBaseVNode("div", { class: "user-Profile-box-center-text-name" }, "个签", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(user_profile).user_personal_signature = $event),
                maxlength: "76"
              }, null, 512), [
                [vModelText, unref(user_profile).user_personal_signature]
              ])
            ]),
            createBaseVNode("div", _hoisted_8$4, [
              _cache[16] || (_cache[16] = createBaseVNode("div", { class: "user-Profile-box-center-text-name" }, "性别", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(user_profile).user_gender = $event),
                maxlength: "2"
              }, null, 512), [
                [vModelText, unref(user_profile).user_gender]
              ])
            ]),
            createBaseVNode("div", _hoisted_9$4, [
              _cache[17] || (_cache[17] = createBaseVNode("div", { class: "user-Profile-box-center-text-name" }, "生日", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => unref(user_profile).user_birthday = $event),
                type: "date"
              }, null, 512), [
                [vModelText, unref(user_profile).user_birthday]
              ])
            ]),
            createBaseVNode("div", _hoisted_10$3, [
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "user-Profile-box-center-text-name" }, "国家", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => unref(user_profile).user_country = $event),
                disabled: ""
              }, null, 512), [
                [vModelText, unref(user_profile).user_country]
              ])
            ]),
            createBaseVNode("div", _hoisted_11$3, [
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "user-Profile-box-center-text-name" }, "地区", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => unref(user_profile).user_region = $event)
              }, null, 512), [
                [vModelText, unref(user_profile).user_region]
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_12$3, [
            createBaseVNode("button", {
              class: "user-Profile-box-bottom-button blue",
              onClick: _cache[9] || (_cache[9] = (...args) => unref(user_edit_profile) && unref(user_edit_profile)(...args))
            }, "保存"),
            createBaseVNode("button", {
              class: "user-Profile-box-bottom-button white",
              onClick: _cache[10] || (_cache[10] = ($event) => isUserProfile.value = false)
            }, " 取消 ")
          ])
        ])
      ]);
    };
  }
};
const UserProfile = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-4f807a17"]]);
const Y = {};
Y.getData = (t) => new Promise((e, i) => {
  let s = {};
  L(t).then((r) => {
    s.arrayBuffer = r;
    try {
      s.orientation = N(r);
    } catch {
      s.orientation = -1;
    }
    e(s);
  }).catch((r) => {
    i(r);
  });
});
function L(t) {
  let e = null;
  return new Promise((i, s) => {
    if (t.src)
      if (/^data\:/i.test(t.src))
        e = k(t.src), i(e);
      else if (/^blob\:/i.test(t.src)) {
        var r = new FileReader();
        r.onload = function(h2) {
          e = h2.target.result, i(e);
        }, E(t.src, function(h2) {
          r.readAsArrayBuffer(h2);
        });
      } else {
        var o = new XMLHttpRequest();
        o.onload = function() {
          if (this.status == 200 || this.status === 0)
            e = o.response, i(e);
          else
            throw "Could not load image";
          o = null;
        }, o.open("GET", t.src, true), o.responseType = "arraybuffer", o.send(null);
      }
    else
      s("img error");
  });
}
function E(t, e) {
  var i = new XMLHttpRequest();
  i.open("GET", t, true), i.responseType = "blob", i.onload = function(s) {
    (this.status == 200 || this.status === 0) && e(this.response);
  }, i.send();
}
function k(t, e) {
  e = e || t.match(/^data\:([^\;]+)\;base64,/mi)[1] || "", t = t.replace(/^data\:([^\;]+)\;base64,/gmi, "");
  for (var i = atob(t), s = i.length % 2 == 0 ? i.length : i.length + 1, r = new ArrayBuffer(s), o = new Uint16Array(r), h2 = 0; h2 < s; h2++)
    o[h2] = i.charCodeAt(h2);
  return r;
}
function T(t, e, i) {
  var s = "", r;
  for (r = e, i += e; r < i; r++)
    s += String.fromCharCode(t.getUint8(r));
  return s;
}
function N(t) {
  var e = new DataView(t), i = e.byteLength, s, r, o, h2, a, n, c, l, f, p2;
  if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
    for (f = 2; f < i; ) {
      if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
        c = f;
        break;
      }
      f++;
    }
  if (c && (r = c + 4, o = c + 10, T(e, r, 4) === "Exif" && (n = e.getUint16(o), a = n === 18761, (a || n === 19789) && e.getUint16(o + 2, a) === 42 && (h2 = e.getUint32(o + 4, a), h2 >= 8 && (l = o + h2)))), l) {
    for (i = e.getUint16(l, a), p2 = 0; p2 < i; p2++)
      if (f = l + p2 * 12 + 2, e.getUint16(f, a) === 274) {
        f += 8, s = e.getUint16(f, a);
        break;
      }
  }
  return s;
}
const $ = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [s, r] of e)
    i[s] = r;
  return i;
}, z = /* @__PURE__ */ defineComponent({
  data: function() {
    return {
      // 容器高宽
      w: 0,
      h: 0,
      // 图片缩放比例
      scale: 1,
      // 图片偏移x轴
      x: 0,
      // 图片偏移y轴
      y: 0,
      // 图片加载
      loading: true,
      // 图片真实宽度
      trueWidth: 0,
      // 图片真实高度
      trueHeight: 0,
      move: true,
      // 移动的x
      moveX: 0,
      // 移动的y
      moveY: 0,
      // 开启截图
      crop: false,
      // 正在截图
      cropping: false,
      // 裁剪框大小
      cropW: 0,
      cropH: 0,
      cropOldW: 0,
      cropOldH: 0,
      // 判断是否能够改变
      canChangeX: false,
      canChangeY: false,
      // 改变的基准点
      changeCropTypeX: 1,
      changeCropTypeY: 1,
      // 裁剪框的坐标轴
      cropX: 0,
      cropY: 0,
      cropChangeX: 0,
      cropChangeY: 0,
      cropOffsertX: 0,
      cropOffsertY: 0,
      // 支持的滚动事件
      support: "",
      // 移动端手指缩放
      touches: [],
      touchNow: false,
      // 图片旋转
      rotate: 0,
      isIos: false,
      orientation: 0,
      imgs: "",
      // 图片缩放系数
      coe: 0.2,
      // 是否正在多次缩放
      scaling: false,
      scalingSet: "",
      coeStatus: "",
      // 控制emit触发频率
      isCanShow: true,
      // 图片是否等于截图大小
      imgIsQqualCrop: false
    };
  },
  props: {
    img: {
      type: [String, Blob, null, File],
      default: ""
    },
    // 输出图片压缩比
    outputSize: {
      type: Number,
      default: 1
    },
    outputType: {
      type: String,
      default: "jpeg"
    },
    info: {
      type: Boolean,
      default: true
    },
    // 是否开启滚轮放大缩小
    canScale: {
      type: Boolean,
      default: true
    },
    // 是否自成截图框
    autoCrop: {
      type: Boolean,
      default: false
    },
    autoCropWidth: {
      type: [Number, String],
      default: 0
    },
    autoCropHeight: {
      type: [Number, String],
      default: 0
    },
    // 是否开启固定宽高比
    fixed: {
      type: Boolean,
      default: false
    },
    // 宽高比 w/h
    fixedNumber: {
      type: Array,
      default: () => [1, 1]
    },
    // 固定大小 禁止改变截图框大小
    fixedBox: {
      type: Boolean,
      default: false
    },
    // 输出截图是否缩放
    full: {
      type: Boolean,
      default: false
    },
    // 是否可以拖动图片
    canMove: {
      type: Boolean,
      default: true
    },
    // 是否可以拖动截图框
    canMoveBox: {
      type: Boolean,
      default: true
    },
    // 上传图片按照原始比例显示
    original: {
      type: Boolean,
      default: false
    },
    // 截图框能否超过图片
    centerBox: {
      type: Boolean,
      default: false
    },
    // 是否根据dpr输出高清图片
    high: {
      type: Boolean,
      default: true
    },
    // 截图框展示宽高类型
    infoTrue: {
      type: Boolean,
      default: false
    },
    // 可以压缩图片宽高  默认不超过200
    maxImgSize: {
      type: [Number, String],
      default: 2e3
    },
    // 倍数  可渲染当前截图框的n倍 0 - 1000;
    enlarge: {
      type: [Number, String],
      default: 1
    },
    // 自动预览的固定宽度
    preW: {
      type: [Number, String],
      default: 0
    },
    /*
      图片布局方式 mode 实现和css背景一样的效果
      contain  居中布局 默认不会缩放 保证图片在容器里面 mode: 'contain'
      cover    拉伸布局 填充整个容器  mode: 'cover'
      如果仅有一个数值被给定，这个数值将作为宽度值大小，高度值将被设定为auto。 mode: '50px'
      如果有两个数值被给定，第一个将作为宽度值大小，第二个作为高度值大小。 mode: '50px 60px'
    */
    mode: {
      type: String,
      default: "contain"
    },
    //限制最小区域,可传1以上的数字和字符串，限制长宽都是这么大
    // 也可以传数组[90,90] 
    limitMinSize: {
      type: [Number, Array, String],
      default: () => 10,
      validator: function(t) {
        return Array.isArray(t) ? Number(t[0]) >= 0 && Number(t[1]) >= 0 : Number(t) >= 0;
      }
    },
    // 导出时,填充背景颜色
    fillColor: {
      type: String,
      default: ""
    }
  },
  computed: {
    cropInfo() {
      let t = {};
      if (t.top = this.cropOffsertY > 21 ? "-21px" : "0px", t.width = this.cropW > 0 ? this.cropW : 0, t.height = this.cropH > 0 ? this.cropH : 0, this.infoTrue) {
        let e = 1;
        this.high && !this.full && (e = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (e = Math.abs(Number(this.enlarge))), t.width = t.width * e, t.height = t.height * e, this.full && (t.width = t.width / this.scale, t.height = t.height / this.scale);
      }
      return t.width = t.width.toFixed(0), t.height = t.height.toFixed(0), t;
    },
    isIE() {
      return !!window.ActiveXObject || "ActiveXObject" in window;
    },
    passive() {
      return this.isIE ? null : {
        passive: false
      };
    },
    // 是否处于左右旋转
    isRotateRightOrLeft() {
      return [1, -1, 3, -3].includes(this.rotate);
    }
  },
  watch: {
    // 如果图片改变， 重新布局
    img() {
      this.checkedImg();
    },
    imgs(t) {
      t !== "" && this.reload();
    },
    cropW() {
      this.showPreview();
    },
    cropH() {
      this.showPreview();
    },
    cropOffsertX() {
      this.showPreview();
    },
    cropOffsertY() {
      this.showPreview();
    },
    scale(t, e) {
      this.showPreview();
    },
    x() {
      this.showPreview();
    },
    y() {
      this.showPreview();
    },
    autoCrop(t) {
      t && this.goAutoCrop();
    },
    // 修改了自动截图框
    autoCropWidth() {
      this.autoCrop && this.goAutoCrop();
    },
    autoCropHeight() {
      this.autoCrop && this.goAutoCrop();
    },
    mode() {
      this.checkedImg();
    },
    rotate() {
      this.showPreview(), this.autoCrop ? this.goAutoCrop(this.cropW, this.cropH) : (this.cropW > 0 || this.cropH > 0) && this.goAutoCrop(this.cropW, this.cropH);
    }
  },
  methods: {
    getVersion(t) {
      var e = navigator.userAgent.split(" "), i = "";
      let s = 0;
      const r = new RegExp(t, "i");
      for (var o = 0; o < e.length; o++)
        r.test(e[o]) && (i = e[o]);
      return i ? s = i.split("/")[1].split(".") : s = ["0", "0", "0"], s;
    },
    checkOrientationImage(t, e, i, s) {
      if (this.getVersion("chrome")[0] >= 81)
        e = -1;
      else if (this.getVersion("safari")[0] >= 605) {
        const h2 = this.getVersion("version");
        h2[0] > 13 && h2[1] > 1 && (e = -1);
      } else {
        const h2 = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
        if (h2) {
          let a = h2[1];
          a = a.split("_"), (a[0] > 13 || a[0] >= 13 && a[1] >= 4) && (e = -1);
        }
      }
      let r = document.createElement("canvas"), o = r.getContext("2d");
      switch (o.save(), e) {
        case 2:
          r.width = i, r.height = s, o.translate(i, 0), o.scale(-1, 1);
          break;
        case 3:
          r.width = i, r.height = s, o.translate(i / 2, s / 2), o.rotate(180 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        case 4:
          r.width = i, r.height = s, o.translate(0, s), o.scale(1, -1);
          break;
        case 5:
          r.height = i, r.width = s, o.rotate(0.5 * Math.PI), o.scale(1, -1);
          break;
        case 6:
          r.width = s, r.height = i, o.translate(s / 2, i / 2), o.rotate(90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        case 7:
          r.height = i, r.width = s, o.rotate(0.5 * Math.PI), o.translate(i, -s), o.scale(-1, 1);
          break;
        case 8:
          r.height = i, r.width = s, o.translate(s / 2, i / 2), o.rotate(-90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        default:
          r.width = i, r.height = s;
      }
      o.drawImage(t, 0, 0, i, s), o.restore(), r.toBlob(
        (h2) => {
          let a = URL.createObjectURL(h2);
          URL.revokeObjectURL(this.imgs), this.imgs = a;
        },
        "image/" + this.outputType,
        1
      );
    },
    // checkout img
    checkedImg() {
      if (this.img === null || this.img === "") {
        this.imgs = "", this.clearCrop();
        return;
      }
      this.loading = true, this.scale = 1, this.rotate = 0, this.imgIsQqualCrop = false, this.clearCrop();
      let t = new Image();
      if (t.onload = () => {
        if (this.img === "")
          return this.$emit("img-load", new Error("图片不能为空")), false;
        let i = t.width, s = t.height;
        Y.getData(t).then((r) => {
          this.orientation = r.orientation || 1;
          let o = Number(this.maxImgSize);
          if (!this.orientation && i < o & s < o) {
            this.imgs = this.img;
            return;
          }
          i > o && (s = s / i * o, i = o), s > o && (i = i / s * o, s = o), this.checkOrientationImage(t, this.orientation, i, s);
        }).catch((r) => {
          this.$emit("img-load", "error"), this.$emit("img-load-error", r);
        });
      }, t.onerror = (i) => {
        this.$emit("img-load", "error"), this.$emit("img-load-error", i);
      }, this.img.substr(0, 4) !== "data" && (t.crossOrigin = ""), this.isIE) {
        var e = new XMLHttpRequest();
        e.onload = function() {
          var i = URL.createObjectURL(this.response);
          t.src = i;
        }, e.open("GET", this.img, true), e.responseType = "blob", e.send();
      } else
        t.src = this.img;
    },
    // 当按下鼠标键
    startMove(t) {
      if (t.preventDefault(), this.move && !this.crop) {
        if (!this.canMove)
          return false;
        this.moveX = ("clientX" in t ? t.clientX : t.touches[0].clientX) - this.x, this.moveY = ("clientY" in t ? t.clientY : t.touches[0].clientY) - this.y, t.touches ? (window.addEventListener("touchmove", this.moveImg), window.addEventListener("touchend", this.leaveImg), t.touches.length == 2 && (this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale))) : (window.addEventListener("mousemove", this.moveImg), window.addEventListener("mouseup", this.leaveImg)), this.$emit("img-moving", {
          moving: true,
          axis: this.getImgAxis()
        });
      } else
        this.cropping = true, window.addEventListener("mousemove", this.createCrop), window.addEventListener("mouseup", this.endCrop), window.addEventListener("touchmove", this.createCrop), window.addEventListener("touchend", this.endCrop), this.cropOffsertX = t.offsetX ? t.offsetX : t.touches[0].pageX - this.$refs.cropper.offsetLeft, this.cropOffsertY = t.offsetY ? t.offsetY : t.touches[0].pageY - this.$refs.cropper.offsetTop, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.cropW = 0, this.cropH = 0;
    },
    // 移动端缩放
    touchScale(t) {
      t.preventDefault();
      let e = this.scale;
      var i = {
        x: this.touches[0].clientX,
        y: this.touches[0].clientY
      }, s = {
        x: t.touches[0].clientX,
        y: t.touches[0].clientY
      }, r = {
        x: this.touches[1].clientX,
        y: this.touches[1].clientY
      }, o = {
        x: t.touches[1].clientX,
        y: t.touches[1].clientY
      }, h2 = Math.sqrt(
        Math.pow(i.x - r.x, 2) + Math.pow(i.y - r.y, 2)
      ), a = Math.sqrt(
        Math.pow(s.x - o.x, 2) + Math.pow(s.y - o.y, 2)
      ), n = a - h2, c = 1;
      c = c / this.trueWidth > c / this.trueHeight ? c / this.trueHeight : c / this.trueWidth, c = c > 0.1 ? 0.1 : c;
      var l = c * n;
      if (!this.touchNow) {
        if (this.touchNow = true, n > 0 ? e += Math.abs(l) : n < 0 && e > Math.abs(l) && (e -= Math.abs(l)), this.touches = t.touches, setTimeout(() => {
          this.touchNow = false;
        }, 8), !this.checkoutImgAxis(this.x, this.y, e))
          return false;
        this.scale = e;
      }
    },
    cancelTouchScale(t) {
      window.removeEventListener("touchmove", this.touchScale);
    },
    // 移动图片
    moveImg(t) {
      if (t.preventDefault(), t.touches && t.touches.length === 2)
        return this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale), window.removeEventListener("touchmove", this.moveImg), false;
      let e = "clientX" in t ? t.clientX : t.touches[0].clientX, i = "clientY" in t ? t.clientY : t.touches[0].clientY, s, r;
      s = e - this.moveX, r = i - this.moveY, this.$nextTick(() => {
        if (this.centerBox) {
          let o = this.getImgAxis(s, r, this.scale), h2 = this.getCropAxis(), a = this.trueHeight * this.scale, n = this.trueWidth * this.scale, c, l, f, p2;
          switch (this.rotate) {
            case 1:
            case -1:
            case 3:
            case -3:
              c = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2 + (a - n) / 2, l = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2 + (n - a) / 2, f = c - a + this.cropW, p2 = l - n + this.cropH;
              break;
            default:
              c = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2, l = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2, f = c - n + this.cropW, p2 = l - a + this.cropH;
              break;
          }
          o.x1 >= h2.x1 && (s = c), o.y1 >= h2.y1 && (r = l), o.x2 <= h2.x2 && (s = f), o.y2 <= h2.y2 && (r = p2);
        }
        this.x = s, this.y = r, this.$emit("img-moving", {
          moving: true,
          axis: this.getImgAxis()
        });
      });
    },
    // 移动图片结束
    leaveImg(t) {
      window.removeEventListener("mousemove", this.moveImg), window.removeEventListener("touchmove", this.moveImg), window.removeEventListener("mouseup", this.leaveImg), window.removeEventListener("touchend", this.leaveImg), this.$emit("img-moving", {
        moving: false,
        axis: this.getImgAxis()
      });
    },
    // 缩放图片
    scaleImg() {
      this.canScale && window.addEventListener(this.support, this.changeSize, this.passive);
    },
    // 移出框
    cancelScale() {
      this.canScale && window.removeEventListener(this.support, this.changeSize);
    },
    // 改变大小函数
    changeSize(t) {
      t.preventDefault();
      let e = this.scale;
      var i = t.deltaY || t.wheelDelta, s = navigator.userAgent.indexOf("Firefox");
      i = s > 0 ? i * 30 : i, this.isIE && (i = -i);
      var r = this.coe;
      r = r / this.trueWidth > r / this.trueHeight ? r / this.trueHeight : r / this.trueWidth;
      var o = r * i;
      o < 0 ? e += Math.abs(o) : e > Math.abs(o) && (e -= Math.abs(o));
      let h2 = o < 0 ? "add" : "reduce";
      if (h2 !== this.coeStatus && (this.coeStatus = h2, this.coe = 0.2), this.scaling || (this.scalingSet = setTimeout(() => {
        this.scaling = false, this.coe = this.coe += 0.01;
      }, 50)), this.scaling = true, !this.checkoutImgAxis(this.x, this.y, e))
        return false;
      this.scale = e;
    },
    // 修改图片大小函数
    changeScale(t) {
      let e = this.scale;
      t = t || 1;
      var i = 20;
      if (i = i / this.trueWidth > i / this.trueHeight ? i / this.trueHeight : i / this.trueWidth, t = t * i, t > 0 ? e += Math.abs(t) : e > Math.abs(t) && (e -= Math.abs(t)), !this.checkoutImgAxis(this.x, this.y, e))
        return false;
      this.scale = e;
    },
    // 创建截图框
    createCrop(t) {
      t.preventDefault();
      var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
      this.$nextTick(() => {
        var s = e - this.cropX, r = i - this.cropY;
        if (s > 0 ? (this.cropW = s + this.cropChangeX > this.w ? this.w - this.cropChangeX : s, this.cropOffsertX = this.cropChangeX) : (this.cropW = this.w - this.cropChangeX + Math.abs(s) > this.w ? this.cropChangeX : Math.abs(s), this.cropOffsertX = this.cropChangeX + s > 0 ? this.cropChangeX + s : 0), !this.fixed)
          r > 0 ? (this.cropH = r + this.cropChangeY > this.h ? this.h - this.cropChangeY : r, this.cropOffsertY = this.cropChangeY) : (this.cropH = this.h - this.cropChangeY + Math.abs(r) > this.h ? this.cropChangeY : Math.abs(r), this.cropOffsertY = this.cropChangeY + r > 0 ? this.cropChangeY + r : 0);
        else {
          var o = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          o + this.cropOffsertY > this.h ? (this.cropH = this.h - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], s > 0 ? this.cropOffsertX = this.cropChangeX : this.cropOffsertX = this.cropChangeX - this.cropW) : this.cropH = o, this.cropOffsertY = this.cropOffsertY;
        }
      });
    },
    // 改变截图框大小
    changeCropSize(t, e, i, s, r) {
      t.preventDefault(), window.addEventListener("mousemove", this.changeCropNow), window.addEventListener("mouseup", this.changeCropEnd), window.addEventListener("touchmove", this.changeCropNow), window.addEventListener("touchend", this.changeCropEnd), this.canChangeX = e, this.canChangeY = i, this.changeCropTypeX = s, this.changeCropTypeY = r, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropOldW = this.cropW, this.cropOldH = this.cropH, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.fixed && this.canChangeX && this.canChangeY && (this.canChangeY = 0), this.$emit("change-crop-size", {
        width: this.cropW,
        height: this.cropH
      });
    },
    // 正在改变
    changeCropNow(t) {
      t.preventDefault();
      var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
      let s = this.w, r = this.h, o = 0, h2 = 0;
      if (this.centerBox) {
        let c = this.getImgAxis(), l = c.x2, f = c.y2;
        o = c.x1 > 0 ? c.x1 : 0, h2 = c.y1 > 0 ? c.y1 : 0, s > l && (s = l), r > f && (r = f);
      }
      const [a, n] = this.checkCropLimitSize();
      this.$nextTick(() => {
        var c = e - this.cropX, l = i - this.cropY;
        if (this.canChangeX && (this.changeCropTypeX === 1 ? this.cropOldW - c < a ? (this.cropW = a, this.cropOffsertX = this.cropOldW + this.cropChangeX - o - a) : this.cropOldW - c > 0 ? (this.cropW = s - this.cropChangeX - c <= s - o ? this.cropOldW - c : this.cropOldW + this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX - c <= s - o ? this.cropChangeX + c : o) : (this.cropW = Math.abs(c) + this.cropChangeX <= s ? Math.abs(c) - this.cropOldW : s - this.cropOldW - this.cropChangeX, this.cropOffsertX = this.cropChangeX + this.cropOldW) : this.changeCropTypeX === 2 && (this.cropOldW + c < a ? this.cropW = a : this.cropOldW + c > 0 ? (this.cropW = this.cropOldW + c + this.cropOffsertX <= s ? this.cropOldW + c : s - this.cropOffsertX, this.cropOffsertX = this.cropChangeX) : (this.cropW = s - this.cropChangeX + Math.abs(c + this.cropOldW) <= s - o ? Math.abs(c + this.cropOldW) : this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX + Math.abs(c + this.cropOldW) <= s - o ? this.cropChangeX - Math.abs(c + this.cropOldW) : o))), this.canChangeY && (this.changeCropTypeY === 1 ? this.cropOldH - l < n ? (this.cropH = n, this.cropOffsertY = this.cropOldH + this.cropChangeY - h2 - n) : this.cropOldH - l > 0 ? (this.cropH = r - this.cropChangeY - l <= r - h2 ? this.cropOldH - l : this.cropOldH + this.cropChangeY - h2, this.cropOffsertY = r - this.cropChangeY - l <= r - h2 ? this.cropChangeY + l : h2) : (this.cropH = Math.abs(l) + this.cropChangeY <= r ? Math.abs(l) - this.cropOldH : r - this.cropOldH - this.cropChangeY, this.cropOffsertY = this.cropChangeY + this.cropOldH) : this.changeCropTypeY === 2 && (this.cropOldH + l < n ? this.cropH = n : this.cropOldH + l > 0 ? (this.cropH = this.cropOldH + l + this.cropOffsertY <= r ? this.cropOldH + l : r - this.cropOffsertY, this.cropOffsertY = this.cropChangeY) : (this.cropH = r - this.cropChangeY + Math.abs(l + this.cropOldH) <= r - h2 ? Math.abs(l + this.cropOldH) : this.cropChangeY - h2, this.cropOffsertY = r - this.cropChangeY + Math.abs(l + this.cropOldH) <= r - h2 ? this.cropChangeY - Math.abs(l + this.cropOldH) : h2))), this.canChangeX && this.fixed) {
          var f = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          f < n ? (this.cropH = n, this.cropW = this.fixedNumber[0] * n / this.fixedNumber[1], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : f + this.cropOffsertY > r ? (this.cropH = r - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : this.cropH = f;
        }
        if (this.canChangeY && this.fixed) {
          var p2 = this.cropH / this.fixedNumber[1] * this.fixedNumber[0];
          p2 < a ? (this.cropW = a, this.cropH = this.fixedNumber[1] * a / this.fixedNumber[0], this.cropOffsertY = this.cropOldH + this.cropChangeY - this.cropH) : p2 + this.cropOffsertX > s ? (this.cropW = s - this.cropOffsertX, this.cropH = this.cropW / this.fixedNumber[0] * this.fixedNumber[1]) : this.cropW = p2;
        }
      });
    },
    checkCropLimitSize() {
      let { cropW: t, cropH: e, limitMinSize: i } = this, s = new Array();
      return Array.isArray(i) ? s = i : s = [i, i], t = parseFloat(s[0]), e = parseFloat(s[1]), [t, e];
    },
    // 结束改变
    changeCropEnd(t) {
      window.removeEventListener("mousemove", this.changeCropNow), window.removeEventListener("mouseup", this.changeCropEnd), window.removeEventListener("touchmove", this.changeCropNow), window.removeEventListener("touchend", this.changeCropEnd);
    },
    // 根据比例x/y，最小宽度，最小高度，现有宽度，现有高度，得到应该有的宽度和高度
    calculateSize(t, e, i, s, r, o) {
      const h2 = t / e;
      let a = r, n = o;
      return a < i && (a = i, n = Math.ceil(a / h2)), n < s && (n = s, a = Math.ceil(n * h2), a < i && (a = i, n = Math.ceil(a / h2))), a < r && (a = r, n = Math.ceil(a / h2)), n < o && (n = o, a = Math.ceil(n * h2)), { width: a, height: n };
    },
    // 创建完成
    endCrop() {
      this.cropW === 0 && this.cropH === 0 && (this.cropping = false);
      let [t, e] = this.checkCropLimitSize();
      const { width: i, height: s } = this.fixed ? this.calculateSize(
        this.fixedNumber[0],
        this.fixedNumber[1],
        t,
        e,
        this.cropW,
        this.cropH
      ) : { width: t, height: e };
      i > this.cropW && (this.cropW = i, this.cropOffsertX + i > this.w && (this.cropOffsertX = this.w - i)), s > this.cropH && (this.cropH = s, this.cropOffsertY + s > this.h && (this.cropOffsertY = this.h - s)), window.removeEventListener("mousemove", this.createCrop), window.removeEventListener("mouseup", this.endCrop), window.removeEventListener("touchmove", this.createCrop), window.removeEventListener("touchend", this.endCrop);
    },
    // 开始截图
    startCrop() {
      this.crop = true;
    },
    // 停止截图
    stopCrop() {
      this.crop = false;
    },
    // 清除截图
    clearCrop() {
      this.cropping = false, this.cropW = 0, this.cropH = 0;
    },
    // 截图移动
    cropMove(t) {
      if (t.preventDefault(), !this.canMoveBox)
        return this.crop = false, this.startMove(t), false;
      if (t.touches && t.touches.length === 2)
        return this.crop = false, this.startMove(t), this.leaveCrop(), false;
      window.addEventListener("mousemove", this.moveCrop), window.addEventListener("mouseup", this.leaveCrop), window.addEventListener("touchmove", this.moveCrop), window.addEventListener("touchend", this.leaveCrop);
      let e = "clientX" in t ? t.clientX : t.touches[0].clientX, i = "clientY" in t ? t.clientY : t.touches[0].clientY, s, r;
      s = e - this.cropOffsertX, r = i - this.cropOffsertY, this.cropX = s, this.cropY = r, this.$emit("crop-moving", {
        moving: true,
        axis: this.getCropAxis()
      });
    },
    moveCrop(t, e) {
      let i = 0, s = 0;
      t && (t.preventDefault(), i = "clientX" in t ? t.clientX : t.touches[0].clientX, s = "clientY" in t ? t.clientY : t.touches[0].clientY), this.$nextTick(() => {
        let r, o, h2 = i - this.cropX, a = s - this.cropY;
        if (e && (h2 = this.cropOffsertX, a = this.cropOffsertY), h2 <= 0 ? r = 0 : h2 + this.cropW > this.w ? r = this.w - this.cropW : r = h2, a <= 0 ? o = 0 : a + this.cropH > this.h ? o = this.h - this.cropH : o = a, this.centerBox) {
          let n = this.getImgAxis();
          r <= n.x1 && (r = n.x1), r + this.cropW > n.x2 && (r = n.x2 - this.cropW), o <= n.y1 && (o = n.y1), o + this.cropH > n.y2 && (o = n.y2 - this.cropH);
        }
        this.cropOffsertX = r, this.cropOffsertY = o, this.$emit("crop-moving", {
          moving: true,
          axis: this.getCropAxis()
        });
      });
    },
    // 算出不同场景下面 图片相对于外层容器的坐标轴
    getImgAxis(t, e, i) {
      t = t || this.x, e = e || this.y, i = i || this.scale;
      let s = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      }, r = this.trueWidth * i, o = this.trueHeight * i;
      switch (this.rotate) {
        case 0:
          s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
          break;
        case 1:
        case -1:
        case 3:
        case -3:
          s.x1 = t + this.trueWidth * (1 - i) / 2 + (r - o) / 2, s.x2 = s.x1 + this.trueHeight * i, s.y1 = e + this.trueHeight * (1 - i) / 2 + (o - r) / 2, s.y2 = s.y1 + this.trueWidth * i;
          break;
        default:
          s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
          break;
      }
      return s;
    },
    // 获取截图框的坐标轴
    getCropAxis() {
      let t = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      return t.x1 = this.cropOffsertX, t.x2 = t.x1 + this.cropW, t.y1 = this.cropOffsertY, t.y2 = t.y1 + this.cropH, t;
    },
    leaveCrop(t) {
      window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.$emit("crop-moving", {
        moving: false,
        axis: this.getCropAxis()
      });
    },
    getCropChecked(t) {
      let e = document.createElement("canvas"), i = e.getContext("2d"), s = new Image(), r = this.rotate, o = this.trueWidth, h2 = this.trueHeight, a = this.cropOffsertX, n = this.cropOffsertY;
      s.onload = () => {
        if (this.cropW !== 0) {
          let p2 = 1;
          this.high & !this.full && (p2 = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (p2 = Math.abs(Number(this.enlarge)));
          let d = this.cropW * p2, C = this.cropH * p2, u = o * this.scale * p2, g = h2 * this.scale * p2, m = (this.x - a + this.trueWidth * (1 - this.scale) / 2) * p2, v = (this.y - n + this.trueHeight * (1 - this.scale) / 2) * p2;
          switch (f(d, C), i.save(), r) {
            case 0:
              this.full ? (f(d / this.scale, C / this.scale), i.drawImage(
                s,
                m / this.scale,
                v / this.scale,
                u / this.scale,
                g / this.scale
              )) : i.drawImage(s, m, v, u, g);
              break;
            case 1:
            case -3:
              this.full ? (f(d / this.scale, C / this.scale), m = m / this.scale + (u / this.scale - g / this.scale) / 2, v = v / this.scale + (g / this.scale - u / this.scale) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(
                s,
                v,
                -m - g / this.scale,
                u / this.scale,
                g / this.scale
              )) : (m = m + (u - g) / 2, v = v + (g - u) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, v, -m - g, u, g));
              break;
            case 2:
            case -2:
              this.full ? (f(d / this.scale, C / this.scale), i.rotate(r * 90 * Math.PI / 180), m = m / this.scale, v = v / this.scale, i.drawImage(
                s,
                -m - u / this.scale,
                -v - g / this.scale,
                u / this.scale,
                g / this.scale
              )) : (i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -m - u, -v - g, u, g));
              break;
            case 3:
            case -1:
              this.full ? (f(d / this.scale, C / this.scale), m = m / this.scale + (u / this.scale - g / this.scale) / 2, v = v / this.scale + (g / this.scale - u / this.scale) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(
                s,
                -v - u / this.scale,
                m,
                u / this.scale,
                g / this.scale
              )) : (m = m + (u - g) / 2, v = v + (g - u) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -v - u, m, u, g));
              break;
            default:
              this.full ? (f(d / this.scale, C / this.scale), i.drawImage(
                s,
                m / this.scale,
                v / this.scale,
                u / this.scale,
                g / this.scale
              )) : i.drawImage(s, m, v, u, g);
          }
          i.restore();
        } else {
          let p2 = o * this.scale, d = h2 * this.scale;
          switch (i.save(), r) {
            case 0:
              f(p2, d), i.drawImage(s, 0, 0, p2, d);
              break;
            case 1:
            case -3:
              f(d, p2), i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, 0, -d, p2, d);
              break;
            case 2:
            case -2:
              f(p2, d), i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -p2, -d, p2, d);
              break;
            case 3:
            case -1:
              f(d, p2), i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -p2, 0, p2, d);
              break;
            default:
              f(p2, d), i.drawImage(s, 0, 0, p2, d);
          }
          i.restore();
        }
        t(e);
      };
      var c = this.img.substr(0, 4);
      c !== "data" && (s.crossOrigin = "Anonymous"), s.src = this.imgs;
      const l = this.fillColor;
      function f(p2, d) {
        e.width = Math.round(p2), e.height = Math.round(d), l && (i.fillStyle = l, i.fillRect(0, 0, e.width, e.height));
      }
    },
    // 获取转换成base64 的图片信息
    getCropData(t) {
      this.getCropChecked((e) => {
        t(e.toDataURL("image/" + this.outputType, this.outputSize));
      });
    },
    //canvas获取为blob对象
    getCropBlob(t) {
      this.getCropChecked((e) => {
        e.toBlob(
          (i) => t(i),
          "image/" + this.outputType,
          this.outputSize
        );
      });
    },
    // 自动预览函数
    showPreview() {
      if (this.isCanShow)
        this.isCanShow = false, setTimeout(() => {
          this.isCanShow = true;
        }, 16);
      else
        return false;
      let t = this.cropW, e = this.cropH, i = this.scale;
      var s = {};
      s.div = {
        width: `${t}px`,
        height: `${e}px`
      };
      let r = (this.x - this.cropOffsertX) / i, o = (this.y - this.cropOffsertY) / i, h2 = 0;
      s.w = t, s.h = e, s.url = this.imgs, s.img = {
        width: `${this.trueWidth}px`,
        height: `${this.trueHeight}px`,
        transform: `scale(${i})translate3d(${r}px, ${o}px, ${h2}px)rotateZ(${this.rotate * 90}deg)`
      }, s.html = `
      <div class="show-preview" style="width: ${s.w}px; height: ${s.h}px,; overflow: hidden">
        <div style="width: ${t}px; height: ${e}px">
          <img src=${s.url} style="width: ${this.trueWidth}px; height: ${this.trueHeight}px; transform:
          scale(${i})translate3d(${r}px, ${o}px, ${h2}px)rotateZ(${this.rotate * 90}deg)">
        </div>
      </div>`, this.$emit("real-time", s);
    },
    // reload 图片布局函数
    reload() {
      let t = new Image();
      t.onload = () => {
        this.w = parseFloat(window.getComputedStyle(this.$refs.cropper).width), this.h = parseFloat(window.getComputedStyle(this.$refs.cropper).height), this.trueWidth = t.width, this.trueHeight = t.height, this.original ? this.scale = 1 : this.scale = this.checkedMode(), this.$nextTick(() => {
          this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (this.w - this.trueWidth * this.scale) / 2, this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (this.h - this.trueHeight * this.scale) / 2, this.loading = false, this.autoCrop && this.goAutoCrop(), this.$emit("img-load", "success"), setTimeout(() => {
            this.showPreview();
          }, 20);
        });
      }, t.onerror = () => {
        this.$emit("img-load", "error");
      }, t.src = this.imgs;
    },
    // 背景布局的函数
    checkedMode() {
      let t = 1, e = this.trueWidth, i = this.trueHeight;
      const s = this.mode.split(" ");
      switch (s[0]) {
        case "contain":
          this.trueWidth > this.w && (t = this.w / this.trueWidth), this.trueHeight * t > this.h && (t = this.h / this.trueHeight);
          break;
        case "cover":
          e = this.w, t = e / this.trueWidth, i = i * t, i < this.h && (i = this.h, t = i / this.trueHeight);
          break;
        default:
          try {
            let r = s[0];
            if (r.search("px") !== -1) {
              r = r.replace("px", ""), e = parseFloat(r);
              const o = e / this.trueWidth;
              let h2 = 1, a = s[1];
              a.search("px") !== -1 && (a = a.replace("px", ""), i = parseFloat(a), h2 = i / this.trueHeight), t = Math.min(o, h2);
            }
            if (r.search("%") !== -1 && (r = r.replace("%", ""), e = parseFloat(r) / 100 * this.w, t = e / this.trueWidth), s.length === 2 && r === "auto") {
              let o = s[1];
              o.search("px") !== -1 && (o = o.replace("px", ""), i = parseFloat(o), t = i / this.trueHeight), o.search("%") !== -1 && (o = o.replace("%", ""), i = parseFloat(o) / 100 * this.h, t = i / this.trueHeight);
            }
          } catch {
            t = 1;
          }
      }
      return t;
    },
    // 自动截图函数
    goAutoCrop(t, e) {
      if (this.imgs === "" || this.imgs === null)
        return;
      this.clearCrop(), this.cropping = true;
      let i = this.w, s = this.h;
      if (this.centerBox) {
        const h2 = Math.abs(this.rotate) % 2 > 0;
        let a = (h2 ? this.trueHeight : this.trueWidth) * this.scale, n = (h2 ? this.trueWidth : this.trueHeight) * this.scale;
        i = a < i ? a : i, s = n < s ? n : s;
      }
      var r = t || parseFloat(this.autoCropWidth), o = e || parseFloat(this.autoCropHeight);
      (r === 0 || o === 0) && (r = i * 0.8, o = s * 0.8), r = r > i ? i : r, o = o > s ? s : o, this.fixed && (o = r / this.fixedNumber[0] * this.fixedNumber[1]), o > this.h && (o = this.h, r = o / this.fixedNumber[1] * this.fixedNumber[0]), this.changeCrop(r, o);
    },
    // 手动改变截图框大小函数
    changeCrop(t, e) {
      if (this.centerBox) {
        let i = this.getImgAxis();
        t > i.x2 - i.x1 && (t = i.x2 - i.x1, e = t / this.fixedNumber[0] * this.fixedNumber[1]), e > i.y2 - i.y1 && (e = i.y2 - i.y1, t = e / this.fixedNumber[1] * this.fixedNumber[0]);
      }
      this.cropW = t, this.cropH = e, this.checkCropLimitSize(), this.$nextTick(() => {
        this.cropOffsertX = (this.w - this.cropW) / 2, this.cropOffsertY = (this.h - this.cropH) / 2, this.centerBox && this.moveCrop(null, true);
      });
    },
    // 重置函数， 恢复组件置初始状态
    refresh() {
      this.img, this.imgs = "", this.scale = 1, this.crop = false, this.rotate = 0, this.w = 0, this.h = 0, this.trueWidth = 0, this.trueHeight = 0, this.imgIsQqualCrop = false, this.clearCrop(), this.$nextTick(() => {
        this.checkedImg();
      });
    },
    // 向左边旋转
    rotateLeft() {
      this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1;
    },
    // 向右边旋转
    rotateRight() {
      this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1;
    },
    // 清除旋转
    rotateClear() {
      this.rotate = 0;
    },
    // 图片坐标点校验
    checkoutImgAxis(t, e, i) {
      t = t || this.x, e = e || this.y, i = i || this.scale;
      let s = true;
      if (this.centerBox) {
        let r = this.getImgAxis(t, e, i), o = this.getCropAxis();
        r.x1 >= o.x1 && (s = false), r.x2 <= o.x2 && (s = false), r.y1 >= o.y1 && (s = false), r.y2 <= o.y2 && (s = false), s || this.changeImgScale(r, o, i);
      }
      return s;
    },
    // 缩放图片，将图片坐标适配截图框坐标
    changeImgScale(t, e, i) {
      let s = this.trueWidth, r = this.trueHeight, o = s * i, h2 = r * i;
      if (o >= this.cropW && h2 >= this.cropH)
        this.scale = i;
      else {
        const a = this.cropW / s, n = this.cropH / r, c = this.cropH <= r * a ? a : n;
        this.scale = c, o = s * c, h2 = r * c;
      }
      this.imgIsQqualCrop || (t.x1 >= e.x1 && (this.isRotateRightOrLeft ? this.x = e.x1 - (s - o) / 2 - (o - h2) / 2 : this.x = e.x1 - (s - o) / 2), t.x2 <= e.x2 && (this.isRotateRightOrLeft ? this.x = e.x1 - (s - o) / 2 - (o - h2) / 2 - h2 + this.cropW : this.x = e.x2 - (s - o) / 2 - o), t.y1 >= e.y1 && (this.isRotateRightOrLeft ? this.y = e.y1 - (r - h2) / 2 - (h2 - o) / 2 : this.y = e.y1 - (r - h2) / 2), t.y2 <= e.y2 && (this.isRotateRightOrLeft ? this.y = e.y2 - (r - h2) / 2 - (h2 - o) / 2 - o : this.y = e.y2 - (r - h2) / 2 - h2)), (o < this.cropW || h2 < this.cropH) && (this.imgIsQqualCrop = true);
    }
  },
  mounted() {
    this.support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
    let t = this;
    var e = navigator.userAgent;
    this.isIOS = !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function(i, s, r) {
        for (var o = atob(this.toDataURL(s, r).split(",")[1]), h2 = o.length, a = new Uint8Array(h2), n = 0; n < h2; n++)
          a[n] = o.charCodeAt(n);
        i(new Blob([a], { type: t.type || "image/png" }));
      }
    }), this.showPreview(), this.checkedImg();
  },
  unmounted() {
    window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.cancelScale();
  }
}), A = {
  key: 0,
  class: "cropper-box"
}, B = ["src"], P = { class: "cropper-view-box" }, R = ["src"], D = { key: 1 };
function U(t, e, i, s, r, o) {
  return openBlock(), createElementBlock("div", {
    class: "vue-cropper",
    ref: "cropper",
    onMouseover: e[28] || (e[28] = (...h2) => t.scaleImg && t.scaleImg(...h2)),
    onMouseout: e[29] || (e[29] = (...h2) => t.cancelScale && t.cancelScale(...h2))
  }, [
    t.imgs ? (openBlock(), createElementBlock("div", A, [
      withDirectives(createBaseVNode("div", {
        class: "cropper-box-canvas",
        style: normalizeStyle({
          width: t.trueWidth + "px",
          height: t.trueHeight + "px",
          transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + t.x / t.scale + "px," + t.y / t.scale + "px,0)rotateZ(" + t.rotate * 90 + "deg)"
        })
      }, [
        createBaseVNode("img", {
          src: t.imgs,
          alt: "cropper-img",
          ref: "cropperImg"
        }, null, 8, B)
      ], 4), [
        [vShow, !t.loading]
      ])
    ])) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(["cropper-drag-box", { "cropper-move": t.move && !t.crop, "cropper-crop": t.crop, "cropper-modal": t.cropping }]),
      onMousedown: e[0] || (e[0] = (...h2) => t.startMove && t.startMove(...h2)),
      onTouchstart: e[1] || (e[1] = (...h2) => t.startMove && t.startMove(...h2))
    }, null, 34),
    withDirectives(createBaseVNode("div", {
      class: "cropper-crop-box",
      style: normalizeStyle({
        width: t.cropW + "px",
        height: t.cropH + "px",
        transform: "translate3d(" + t.cropOffsertX + "px," + t.cropOffsertY + "px,0)"
      })
    }, [
      createBaseVNode("span", P, [
        createBaseVNode("img", {
          style: normalizeStyle({
            width: t.trueWidth + "px",
            height: t.trueHeight + "px",
            transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + (t.x - t.cropOffsertX) / t.scale + "px," + (t.y - t.cropOffsertY) / t.scale + "px,0)rotateZ(" + t.rotate * 90 + "deg)"
          }),
          src: t.imgs,
          alt: "cropper-img"
        }, null, 12, R)
      ]),
      createBaseVNode("span", {
        class: "cropper-face cropper-move",
        onMousedown: e[2] || (e[2] = (...h2) => t.cropMove && t.cropMove(...h2)),
        onTouchstart: e[3] || (e[3] = (...h2) => t.cropMove && t.cropMove(...h2))
      }, null, 32),
      t.info ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: "crop-info",
        style: normalizeStyle({ top: t.cropInfo.top })
      }, toDisplayString(t.cropInfo.width) + " × " + toDisplayString(t.cropInfo.height), 5)) : createCommentVNode("", true),
      t.fixedBox ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", D, [
        createBaseVNode("span", {
          class: "crop-line line-w",
          onMousedown: e[4] || (e[4] = (h2) => t.changeCropSize(h2, false, true, 0, 1)),
          onTouchstart: e[5] || (e[5] = (h2) => t.changeCropSize(h2, false, true, 0, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-line line-a",
          onMousedown: e[6] || (e[6] = (h2) => t.changeCropSize(h2, true, false, 1, 0)),
          onTouchstart: e[7] || (e[7] = (h2) => t.changeCropSize(h2, true, false, 1, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-line line-s",
          onMousedown: e[8] || (e[8] = (h2) => t.changeCropSize(h2, false, true, 0, 2)),
          onTouchstart: e[9] || (e[9] = (h2) => t.changeCropSize(h2, false, true, 0, 2))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-line line-d",
          onMousedown: e[10] || (e[10] = (h2) => t.changeCropSize(h2, true, false, 2, 0)),
          onTouchstart: e[11] || (e[11] = (h2) => t.changeCropSize(h2, true, false, 2, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point1",
          onMousedown: e[12] || (e[12] = (h2) => t.changeCropSize(h2, true, true, 1, 1)),
          onTouchstart: e[13] || (e[13] = (h2) => t.changeCropSize(h2, true, true, 1, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point2",
          onMousedown: e[14] || (e[14] = (h2) => t.changeCropSize(h2, false, true, 0, 1)),
          onTouchstart: e[15] || (e[15] = (h2) => t.changeCropSize(h2, false, true, 0, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point3",
          onMousedown: e[16] || (e[16] = (h2) => t.changeCropSize(h2, true, true, 2, 1)),
          onTouchstart: e[17] || (e[17] = (h2) => t.changeCropSize(h2, true, true, 2, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point4",
          onMousedown: e[18] || (e[18] = (h2) => t.changeCropSize(h2, true, false, 1, 0)),
          onTouchstart: e[19] || (e[19] = (h2) => t.changeCropSize(h2, true, false, 1, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point5",
          onMousedown: e[20] || (e[20] = (h2) => t.changeCropSize(h2, true, false, 2, 0)),
          onTouchstart: e[21] || (e[21] = (h2) => t.changeCropSize(h2, true, false, 2, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point6",
          onMousedown: e[22] || (e[22] = (h2) => t.changeCropSize(h2, true, true, 1, 2)),
          onTouchstart: e[23] || (e[23] = (h2) => t.changeCropSize(h2, true, true, 1, 2))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point7",
          onMousedown: e[24] || (e[24] = (h2) => t.changeCropSize(h2, false, true, 0, 2)),
          onTouchstart: e[25] || (e[25] = (h2) => t.changeCropSize(h2, false, true, 0, 2))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point8",
          onMousedown: e[26] || (e[26] = (h2) => t.changeCropSize(h2, true, true, 2, 2)),
          onTouchstart: e[27] || (e[27] = (h2) => t.changeCropSize(h2, true, true, 2, 2))
        }, null, 32)
      ]))
    ], 4), [
      [vShow, t.cropping]
    ])
  ], 544);
}
const M = /* @__PURE__ */ $(z, [["render", U], ["__scopeId", "data-v-a742df44"]]);
const _hoisted_1$6 = { class: "user-headshot" };
const _hoisted_2$6 = { class: "user-headshot-box" };
const _hoisted_3$6 = { class: "user-headshot-box-top" };
const _hoisted_4$6 = { class: "user-headshot-box-center" };
const _hoisted_5$6 = { class: "user-headshot-box-bottom" };
const _hoisted_6$6 = { class: "user-headshot-box-bottom-zoom" };
const _hoisted_7$5 = { class: "user-headshot-box-bottom-button-all" };
const _sfc_main$7 = {
  __name: "userHeadshot",
  setup(__props) {
    onMounted(() => {
      option.value.img = previewImageUrl.value;
    });
    const changeScale = (scaleSize) => {
      cropper.value.changeScale(scaleSize);
      console.log("changeScale", scaleSize);
      lastScaleValue.value = scaleValue.value;
    };
    const scaleValue = ref$1(0);
    const lastScaleValue = ref$1(0);
    const handleScaleChange = (event) => {
      const newScale = parseFloat(event.target.value);
      if (newScale > lastScaleValue.value) {
        cropper.value.changeScale(1);
      } else if (newScale < lastScaleValue.value) {
        cropper.value.changeScale(-1);
      }
      lastScaleValue.value = newScale;
    };
    const realTime = (data) => {
      previews.value = data;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("div", _hoisted_3$6, [
            _cache[7] || (_cache[7] = createBaseVNode("div", { class: "user-headshot-box-top-text" }, "裁剪图片", -1)),
            createBaseVNode("button", {
              class: "user-headshot-box-top-button",
              onClick: _cache[0] || (_cache[0] = ($event) => isUserHeadshot.value = false)
            }, _cache[6] || (_cache[6] = [
              createBaseVNode("svg", {
                t: "1742388636219",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3405",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                  "p-id": "3406"
                })
              ], -1)
            ]))
          ]),
          createBaseVNode("div", _hoisted_4$6, [
            createVNode(unref(M), {
              ref_key: "cropper",
              ref: cropper,
              class: "crop",
              "auto-crop": unref(option).autoCrop,
              "auto-crop-height": unref(option).autoCropHeight,
              "auto-crop-width": unref(option).autoCropWidth,
              "can-move": unref(option).canMove,
              "can-scale": unref(option).canScale,
              "center-box": unref(option).centerBox,
              fixed: unref(option).fixed,
              "fixed-box": unref(option).fixedBox,
              "fixed-number": unref(option).fixedNumber,
              img: unref(option).img,
              "info-true": unref(option).infoTrue,
              mode: unref(option).mode,
              origin: unref(option).origin,
              "output-size": unref(option).outputSize,
              "output-type": unref(option).outputType,
              onRealTime: realTime
            }, null, 8, ["auto-crop", "auto-crop-height", "auto-crop-width", "can-move", "can-scale", "center-box", "fixed", "fixed-box", "fixed-number", "img", "info-true", "mode", "origin", "output-size", "output-type"])
          ]),
          createBaseVNode("div", _hoisted_5$6, [
            createBaseVNode("div", _hoisted_6$6, [
              createBaseVNode("div", {
                class: "user-headshot-box-bottom-zoom-svg",
                onClick: _cache[1] || (_cache[1] = ($event) => changeScale(-1))
              }, _cache[8] || (_cache[8] = [
                createBaseVNode("svg", {
                  t: "1742556065048",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "8702",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z",
                    "p-id": "8703"
                  }),
                  createBaseVNode("path", {
                    d: "M625.792 448H336a32 32 0 0 0 0 64h289.792a32 32 0 1 0 0-64z",
                    "p-id": "8704"
                  })
                ], -1)
              ])),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => scaleValue.value = $event),
                type: "range",
                min: "0",
                max: "30",
                onInput: handleScaleChange
              }, null, 544), [
                [vModelText, scaleValue.value]
              ]),
              createBaseVNode("div", {
                class: "user-headshot-box-bottom-zoom-svg",
                onClick: _cache[3] || (_cache[3] = ($event) => changeScale(1))
              }, _cache[9] || (_cache[9] = [
                createBaseVNode("svg", {
                  t: "1742556044701",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "7701",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z",
                    "p-id": "7702"
                  }),
                  createBaseVNode("path", {
                    d: "M625.792 448H512v-112a32 32 0 0 0-64 0V448h-112a32 32 0 0 0 0 64H448v112a32 32 0 1 0 64 0V512h113.792a32 32 0 1 0 0-64z",
                    "p-id": "7703"
                  })
                ], -1)
              ]))
            ]),
            createBaseVNode("div", _hoisted_7$5, [
              createBaseVNode("button", {
                class: "user-headshot-box-bottom-button blue",
                onClick: _cache[4] || (_cache[4] = (...args) => unref(user_headshot) && unref(user_headshot)(...args))
              }, "保存"),
              createBaseVNode("button", {
                class: "user-headshot-box-bottom-button white",
                onClick: _cache[5] || (_cache[5] = ($event) => isUserHeadshot.value = false)
              }, " 取消 ")
            ])
          ])
        ])
      ]);
    };
  }
};
const UserHeadshot = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-a907cdee"]]);
const _sfc_main$6 = {
  __name: "MainIndex",
  setup(__props) {
    onMounted(async () => {
      await initialize_user();
      await searchUserFriendAxios();
      await userColorStyle();
      window.api.updateStyle(async () => {
        console.log("重新加载背景样式");
        await userColorStyle();
      });
      user.value.user_headshot = await loadImage(user.value.user_headshot);
      console.log("图片", user.value.user_headshot);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "background",
        style: normalizeStyle({
          backgroundColor: unref(chat_background),
          backgroundImage: unref(background_image) ? `url(${unref(background_image)})` : "none",
          backgroundSize: "cover"
        }),
        onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClickOutside) && unref(handleClickOutside)(...args))
      }, [
        createVNode(HomeSidebar),
        createVNode(HomeFriendUser),
        createVNode(HomeChat),
        unref(isUserProfile) === true ? (openBlock(), createBlock(UserProfile, { key: 0 })) : createCommentVNode("", true),
        unref(isUserHeadshot) === true ? (openBlock(), createBlock(UserHeadshot, { key: 1 })) : createCommentVNode("", true)
      ], 4);
    };
  }
};
const MainIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-221dc9f5"]]);
const _imports_0 = "" + new URL("2-B-UXDm8c.jpg", import.meta.url).href;
const sendEmailUser = async () => {
  await loginAxios({
    method: "POST",
    url: "/user_sendEmail",
    data: {
      to: LoginUser.value.user_email
    }
  }).then((res) => {
    email_captcha.value = "60秒后可重发";
    is_captcha.value = true;
    let seconds = 60;
    const interval = setInterval(() => {
      seconds--;
      email_captcha.value = `${seconds}秒后可重发`;
      if (seconds <= 0) {
        clearInterval(interval);
        email_captcha.value = "发送验证码";
        is_captcha.value = false;
        console.log("验证码", is_email.value);
      }
    }, 1e3);
    console.log(res);
  }).catch((err) => {
    console.log(err);
    email_captcha.value = "请求失败";
    LoginUser.value.user_email = "";
    is_captcha.value = false;
  });
};
const loginEmailUser = async () => {
  await loginAxios({
    method: "POST",
    url: "/user_login_email",
    data: {
      user_email: LoginUser.value.user_email,
      user_captcha: LoginUser.value.user_captcha
    }
  }).then(async (res) => {
    console.log("验证", res.data);
    email_verified.value = "验证成功";
    await window.api.localUser(res.data.user);
    await window.api.localToken(res.data.user_token);
    await window.api.openHomeWindow();
  }).catch((err) => {
    console.log(err);
    email_verified.value = "验证失败";
    LoginUser.value.user_captcha = "";
  });
};
const loginToken = async () => {
  await creatAxios({
    method: "POST",
    url: "/user_login_token"
  }).then(async (res) => {
    console.log("有效", res);
    is_user_token.value = true;
    await initialize_user();
  }).catch((err) => {
    console.log("无效", err);
    is_user_token.value = false;
  });
};
const login_togo = async () => {
  await window.api.openHomeWindow();
};
const deleteUser = async () => {
  await window.api.delete_User_Token().then(() => {
    is_user_token.value = false;
  });
};
const LoginUser = ref$1({
  user_email: "",
  user_captcha: ""
});
const isArticle = ref$1(false);
const is_login_togo = ref$1(false);
const is_email = ref$1(false);
const is_captcha = ref$1(false);
const email_verified = ref$1("登录或验证");
const email_captcha = ref$1("发送验证码");
const is_user_token = ref$1();
const verification = async () => {
  console.log("登录", email_verified.value);
  email_verified.value = "验证中";
  is_login_togo.value = false;
  await loginEmailUser();
};
const captcha = async () => {
  console.log("captcha", is_email.value);
  await sendEmailUser();
};
const article = () => {
  isArticle.value = isArticle.value === false;
};
const _hoisted_1$5 = { class: "page" };
const _hoisted_2$5 = { class: "page-box" };
const _hoisted_3$5 = { class: "page-box-button" };
const _hoisted_4$5 = {
  key: 0,
  class: "page-box-not-user"
};
const _hoisted_5$5 = { class: "user-box" };
const _hoisted_6$5 = { class: "user-input-box" };
const _hoisted_7$4 = { class: "user-input" };
const _hoisted_8$3 = { class: "user-input-captcha" };
const _hoisted_9$3 = ["disabled"];
const _hoisted_10$2 = { class: "user-article" };
const _hoisted_11$2 = {
  t: "1741952186063",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3403",
  width: "200",
  height: "200"
};
const _hoisted_12$2 = { class: "user-login-in" };
const _hoisted_13$2 = ["disabled"];
const _hoisted_14$2 = {
  key: 1,
  class: "page-box-yes-user"
};
const _hoisted_15$2 = { class: "page-box-yes-user-info" };
const _hoisted_16$1 = { class: "page-box-yes-user-img" };
const _hoisted_17$1 = ["src"];
const _hoisted_18$1 = { class: "page-box-yes-user-name" };
const _hoisted_19$1 = { class: "page-box-yes-user-button" };
const _hoisted_20$1 = { class: "page-box-yes-user-login-out" };
const _sfc_main$5 = {
  __name: "loginIndex",
  setup(__props) {
    onMounted(async () => {
      await loginToken();
      user.value.user_headshot = await loadImage(user.value.user_headshot);
      console.log("图片", user.value.user_headshot);
    });
    watchEffect(() => {
      console.log(LoginUser.value.user_email);
      is_email.value = LoginUser.value.user_email !== "";
      console.log("邮箱", is_email.value);
    });
    watchEffect(() => {
      console.log(LoginUser.value, isArticle.value);
      is_login_togo.value = !(LoginUser.value.user_email === "" || LoginUser.value.user_captcha === "" || isArticle.value === false);
      console.log("登录", is_login_togo.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("div", _hoisted_3$5, [
            createBaseVNode("button", {
              class: "red",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(close)())
            }, _cache[8] || (_cache[8] = [
              createBaseVNode("svg", {
                t: "1741916485573",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3182",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                  "p-id": "3183"
                })
              ], -1)
            ]))
          ]),
          unref(is_user_token) === false ? (openBlock(), createElementBlock("div", _hoisted_4$5, [
            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "user-img" }, [
              createBaseVNode("img", {
                src: _imports_0,
                alt: ""
              })
            ], -1)),
            createBaseVNode("div", _hoisted_5$5, [
              createBaseVNode("div", _hoisted_6$5, [
                createBaseVNode("div", _hoisted_7$4, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(LoginUser).user_email = $event),
                    placeholder: "邮箱",
                    maxlength: "21"
                  }, null, 512), [
                    [vModelText, unref(LoginUser).user_email]
                  ])
                ]),
                createBaseVNode("div", _hoisted_8$3, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(LoginUser).user_captcha = $event),
                    placeholder: "验证码",
                    maxlength: "6"
                  }, null, 512), [
                    [vModelText, unref(LoginUser).user_captcha]
                  ]),
                  createBaseVNode("button", {
                    class: normalizeClass(
                      unref(is_email) ? "user-input-captcha-button" : "user-input-captcha-button-disabled"
                    ),
                    style: normalizeStyle(unref(is_email) ? { cursor: "default" } : { cursor: "not-allowed" }),
                    disabled: unref(is_captcha) === true,
                    onClick: _cache[3] || (_cache[3] = (...args) => unref(captcha) && unref(captcha)(...args))
                  }, toDisplayString(unref(email_captcha)), 15, _hoisted_9$3)
                ])
              ]),
              createBaseVNode("div", _hoisted_10$2, [
                createBaseVNode("button", {
                  class: normalizeClass(["user-article-button", { "no-hover": unref(isArticle) }]),
                  onClick: _cache[4] || (_cache[4] = (...args) => unref(article) && unref(article)(...args))
                }, [
                  withDirectives((openBlock(), createElementBlock("svg", _hoisted_11$2, _cache[9] || (_cache[9] = [
                    createBaseVNode("path", {
                      d: "M938.666667 213.333333c-12.8-12.8-34.133333-12.8-46.933334 0L358.4 742.4 128 516.266667c-12.8-12.8-34.133333-12.8-46.933333 0-12.8 12.8-12.8 34.133333 0 46.933333l256 247.466667c4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667 0 25.6-8.533333L938.666667 256c12.8-12.8 12.8-29.866667 0-42.666667z",
                      "p-id": "3404"
                    }, null, -1)
                  ]), 512)), [
                    [vShow, unref(isArticle)]
                  ])
                ], 2),
                _cache[10] || (_cache[10] = createBaseVNode("div", { style: { "color": "grey" } }, "已同意并阅读条款", -1))
              ]),
              createBaseVNode("div", _hoisted_12$2, [
                createBaseVNode("button", {
                  class: normalizeClass(unref(is_login_togo) ? "user-login-in-button" : "user-login-in-button-disabled"),
                  style: normalizeStyle(unref(is_login_togo) ? { cursor: "default" } : { cursor: "not-allowed" }),
                  disabled: unref(is_login_togo) === false,
                  onClick: _cache[5] || (_cache[5] = (...args) => unref(verification) && unref(verification)(...args))
                }, toDisplayString(unref(email_verified)), 15, _hoisted_13$2)
              ])
            ]),
            _cache[12] || (_cache[12] = createBaseVNode("a", { class: "user-bottom" }, "更多功能", -1))
          ])) : (openBlock(), createElementBlock("div", _hoisted_14$2, [
            _cache[13] || (_cache[13] = createBaseVNode("div", { class: "page-box-yes-user-logo" }, "test", -1)),
            createBaseVNode("div", _hoisted_15$2, [
              createBaseVNode("div", _hoisted_16$1, [
                createBaseVNode("img", {
                  src: unref(user).user_headshot,
                  alt: ""
                }, null, 8, _hoisted_17$1)
              ]),
              createBaseVNode("div", _hoisted_18$1, [
                createBaseVNode("div", null, toDisplayString(unref(user).user_name), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_19$1, [
              createBaseVNode("button", {
                class: "user-login-in-button",
                onClick: _cache[6] || (_cache[6] = (...args) => unref(login_togo) && unref(login_togo)(...args))
              }, "登录")
            ]),
            createBaseVNode("div", _hoisted_20$1, [
              createBaseVNode("button", {
                class: "page-box-yes-user-login-out-button",
                onClick: _cache[7] || (_cache[7] = (...args) => unref(deleteUser) && unref(deleteUser)(...args))
              }, "退出登录")
            ])
          ]))
        ])
      ]);
    };
  }
};
const LoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-c4361915"]]);
const _hoisted_1$4 = { class: "search-body" };
const _hoisted_2$4 = { class: "search-body-top" };
const _hoisted_3$4 = { class: "search-body-top-button" };
const _hoisted_4$4 = { class: "search-body-search" };
const _hoisted_5$4 = { class: "search-body-search-user" };
const _hoisted_6$4 = ["onClick"];
const _hoisted_7$3 = { class: "search-body-body" };
const _hoisted_8$2 = { class: "home-friend-user-friend-list" };
const _hoisted_9$2 = { class: "home-friend-user-friend-list-user-img" };
const _hoisted_10$1 = ["src"];
const _hoisted_11$1 = { class: "home-friend-user-friend-list-user-title" };
const _hoisted_12$1 = { class: "home-friend-user-friend-list-user-name" };
const _hoisted_13$1 = { class: "home-friend-user-friend-list-user-local" };
const _hoisted_14$1 = { class: "home-friend-user-friend-list-user-add" };
const _hoisted_15$1 = ["onClick"];
const _sfc_main$4 = {
  __name: "searchindex",
  setup(__props) {
    const isFocused = ref$1(false);
    const search = ref$1([{ name: "全部" }, { name: "用户" }, { name: "群聊" }]);
    const selectedIndex = ref$1(0);
    const selectButton = (index) => {
      selectedIndex.value = index;
      console.log(selectedIndex.value);
    };
    onMounted(async () => {
      await initialize_user();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("div", _hoisted_3$4, [
            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "search-body-top-logo" }, "全网搜索", -1)),
            createBaseVNode("button", {
              class: "gray",
              onClick: _cache[0] || (_cache[0] = (...args) => unref(shrink) && unref(shrink)(...args))
            }, _cache[8] || (_cache[8] = [
              createBaseVNode("svg", {
                t: "1741916524280",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3514",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M819.2 477.866667h-597.333333c-17.066667 0-34.133333 12.8-34.133334 34.133333s12.8 34.133333 34.133334 34.133333h597.333333c17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333z",
                  "p-id": "3515"
                })
              ], -1)
            ])),
            createBaseVNode("button", {
              class: "gray",
              onClick: _cache[1] || (_cache[1] = (...args) => unref(setFullScreen) && unref(setFullScreen)(...args))
            }, _cache[9] || (_cache[9] = [
              createBaseVNode("svg", {
                t: "1741916508767",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3348",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M832 93.866667h-640c-51.2 0-93.866667 42.666667-93.866667 93.866666v640c0 51.2 42.666667 93.866667 93.866667 93.866667h640c51.2 0 93.866667-42.666667 93.866667-93.866667v-640c4.266667-46.933333-42.666667-93.866667-93.866667-93.866666z m29.866667 738.133333c0 17.066667-12.8 34.133333-34.133334 34.133333h-640c-17.066667 0-34.133333-12.8-34.133333-34.133333v-640c0-17.066667 12.8-34.133333 34.133333-34.133333h640c17.066667 0 34.133333 12.8 34.133334 34.133333v640z",
                  "p-id": "3349"
                })
              ], -1)
            ])),
            createBaseVNode("button", {
              class: "red",
              onClick: _cache[2] || (_cache[2] = (...args) => unref(close) && unref(close)(...args))
            }, _cache[10] || (_cache[10] = [
              createBaseVNode("svg", {
                t: "1741916485573",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3182",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                  "p-id": "3183"
                })
              ], -1)
            ]))
          ]),
          createBaseVNode("div", _hoisted_4$4, [
            createBaseVNode("div", {
              class: "home-friend-user-search-input",
              style: normalizeStyle({ border: isFocused.value ? "1px solid blue" : "1px solid khaki" })
            }, [
              _cache[13] || (_cache[13] = createBaseVNode("div", { class: "home-friend-user-search-svg" }, [
                createBaseVNode("svg", {
                  t: "1741917977118",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3680",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M448 221.866667c-55.466667 0-106.666667 25.6-145.066667 64-8.533333 12.8-8.533333 34.133333 4.266667 46.933333 12.8 8.533333 34.133333 8.533333 46.933333-4.266667 21.333333-25.6 55.466667-38.4 93.866667-38.4s72.533333 12.8 93.866667 38.4c8.533333 8.533333 17.066667 12.8 25.6 12.8 8.533333 0 17.066667-4.266667 21.333333-8.533333 12.8-12.8 12.8-29.866667 4.266667-46.933333-38.4-38.4-89.6-64-145.066667-64z",
                    "p-id": "3681"
                  }),
                  createBaseVNode("path", {
                    d: "M908.8 832l-145.066667-145.066667c51.2-68.266667 81.066667-149.333333 81.066667-238.933333 0-217.6-174.933333-392.533333-392.533333-392.533333s-392.533333 174.933333-392.533334 392.533333 174.933333 392.533333 392.533334 392.533333c89.6 0 170.666667-29.866667 238.933333-81.066666l145.066667 145.066666c8.533333 8.533333 25.6 17.066667 38.4 17.066667s25.6-4.266667 38.4-17.066667c17.066667-17.066667 17.066667-51.2-4.266667-72.533333z m-789.333333-384c0-183.466667 149.333333-332.8 332.8-332.8s332.8 149.333333 332.8 332.8-149.333333 332.8-332.8 332.8-332.8-149.333333-332.8-332.8z",
                    "p-id": "3682"
                  })
                ])
              ], -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(user_none_search) ? user_none_search.value = $event : null),
                class: "search-input",
                type: "text",
                placeholder: "搜索",
                onFocus: _cache[4] || (_cache[4] = ($event) => isFocused.value = true),
                onBlur: _cache[5] || (_cache[5] = ($event) => isFocused.value = false),
                onKeydown: _cache[6] || (_cache[6] = withKeys((...args) => unref(searchNoneUserAxios) && unref(searchNoneUserAxios)(...args), ["enter"]))
              }, null, 544), [
                [vModelText, unref(user_none_search)]
              ]),
              withDirectives(createBaseVNode("div", {
                class: "home-friend-user-search-svg",
                onClick: _cache[7] || (_cache[7] = (...args) => unref(clearInput) && unref(clearInput)(...args))
              }, _cache[12] || (_cache[12] = [
                createBaseVNode("svg", {
                  t: "1741918074924",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3849",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                    "p-id": "3850"
                  })
                ], -1)
              ]), 512), [
                [vShow, isFocused.value === true]
              ])
            ], 4)
          ]),
          createBaseVNode("div", _hoisted_5$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(search.value, (user2, index) => {
              return openBlock(), createElementBlock("button", {
                key: index,
                class: normalizeClass([{ "selected-button": selectedIndex.value === index }, "search-body-search-user-button"]),
                onClick: ($event) => selectButton(index)
              }, toDisplayString(user2.name), 11, _hoisted_6$4);
            }), 128))
          ])
        ]),
        createBaseVNode("div", _hoisted_7$3, [
          createBaseVNode("div", _hoisted_8$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(search_user), (user2, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: "home-friend-user-friend-list-user"
              }, [
                createBaseVNode("div", _hoisted_9$2, [
                  createBaseVNode("img", {
                    src: user2.search_user_headshot,
                    alt: ""
                  }, null, 8, _hoisted_10$1)
                ]),
                createBaseVNode("div", _hoisted_11$1, [
                  createBaseVNode("div", _hoisted_12$1, toDisplayString(user2.search_user_name), 1),
                  createBaseVNode("div", _hoisted_13$1, toDisplayString(user2.search_user_uid), 1)
                ]),
                createBaseVNode("div", _hoisted_14$1, [
                  createBaseVNode("button", {
                    class: "home-friend-user-friend-list-user-add-button",
                    onClick: ($event) => unref(add_user)(user2.search_user_uid)
                  }, " 添加 ", 8, _hoisted_15$1)
                ])
              ]);
            }), 128))
          ])
        ])
      ]);
    };
  }
};
const SearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-fa41af58"]]);
const ws = ref$1(null);
const messages = ref$1([]);
const localVideo = ref$1(null);
const remoteVideo = ref$1(null);
const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
    // 使用 Google 的公共 STUN 服务器
  ]
};
const peerConnection = ref$1(null);
const initializeWebRTC = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.value.srcObject = stream;
    peerConnection.value = new RTCPeerConnection(configuration);
    stream.getTracks().forEach((track2) => {
      peerConnection.value.addTrack(track2, stream);
    });
    peerConnection.value.ontrack = (event) => {
      remoteVideo.value.srcObject = event.streams[0];
    };
    peerConnection.value.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({
          type: "candidate",
          candidate: event.candidate,
          user_token: user_token.value
        });
      }
    };
  } catch (error) {
    console.error("Error initializing WebRTC:", error);
  }
};
const connectWebSocket = () => {
  ws.value = new WebSocket("ws://localhost:3001");
  ws.value.onopen = () => {
    console.log("WebSocket 连接成功");
    ws.value.isConnected = true;
  };
  ws.value.onmessage = async (event) => {
    const message = JSON.parse(event.data);
    messages.value.push(message);
    console.log("收到消息:", message);
    if (message.type === "offer" || message.type === "answer" || message.type === "candidate") {
      await handleWebRTCMessage(message);
    }
  };
  ws.value.onclose = () => {
    console.log("WebSocket 连接关闭");
  };
  ws.value.onerror = (error) => {
    console.error("WebSocket 错误:", error);
  };
};
const sendMessage = (message) => {
  if (ws.value && ws.value.readyState === WebSocket.OPEN && ws.value.isConnected) {
    ws.value.send(JSON.stringify(message));
    console.log("发送消息:", message);
  } else {
    console.error("WebSocket 未连接");
  }
};
const handleWebRTCMessage = async (message) => {
  switch (message.type) {
    case "offer":
      await handleOffer(message);
      break;
    case "answer":
      await handleAnswer(message);
      break;
    case "candidate":
      await handleCandidate(message);
      break;
    default:
      console.warn("未知的消息类型:", message.type);
  }
};
const handleOffer = async (offer) => {
  await peerConnection.value.setRemoteDescription(new RTCSessionDescription(offer));
  console.log("Received Offer SDP:", offer.sdp);
  const answer = await peerConnection.value.createAnswer();
  console.log("Generated Answer SDP:", answer.sdp);
  await peerConnection.value.setLocalDescription(answer);
  sendMessage({
    type: "answer",
    answer,
    targetUid: selectedUserUid.value,
    user_token: user_token.value
  });
};
const handleAnswer = async (answer) => {
  try {
    console.log("Received Answer SDP:", answer.sdp);
    await peerConnection.value.setRemoteDescription(new RTCSessionDescription(answer));
  } catch (error) {
    console.error("Error handling answer:", error);
  }
};
const handleCandidate = async (candidate) => {
  await peerConnection.value.addIceCandidate(new RTCIceCandidate(candidate));
};
const createAndSendOffer = async (targetUid) => {
  try {
    if (!peerConnection.value) {
      console.error("PeerConnection 未初始化");
      return;
    }
    const offer = await peerConnection.value.createOffer();
    console.log("Generated Offer SDP:", offer.sdp);
    await peerConnection.value.setLocalDescription(offer);
    sendMessage({
      type: "offer",
      offer,
      targetUid,
      // 目标用户的 UID
      userUid: user.value.user_uid,
      // 用户uid
      user_token: user_token.value
    });
    console.log("Offer 创建并发送成功:", offer);
  } catch (error) {
    console.error("创建或发送 offer 失败:", error);
  }
};
const _hoisted_1$3 = { class: "rtc-box" };
const _hoisted_2$3 = { class: "rtc-box-top" };
const _hoisted_3$3 = { class: "rtc-box-top-button" };
const _hoisted_4$3 = { class: "rtc-box-center" };
const _hoisted_5$3 = { class: "rtc-box-bottom" };
const _hoisted_6$3 = { class: "rtc-box-bottom-button" };
const _hoisted_7$2 = { class: "rtc-box-bottom-button-svg white" };
const _hoisted_8$1 = { class: "rtc-box-bottom-button-svg" };
const _hoisted_9$1 = { class: "rtc-box-bottom-button" };
const _sfc_main$3 = {
  __name: "webRTCindex",
  setup(__props) {
    const isMicrophone = ref$1(true);
    onMounted(async () => {
      window.api.receiveSelectedUserUid((event, uid2) => {
        selectedUserUid.value = uid2;
        console.log("Received selectedUserUid:", selectedUserUid.value);
      });
      await initialize_user();
      connectWebSocket();
      await initializeWebRTC();
      createAndSendOffer(selectedUserUid.value);
    });
    onUnmounted(() => {
      ws.value.close();
      peerConnection.value.close();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          createBaseVNode("div", _hoisted_3$3, [
            createBaseVNode("button", {
              class: "gray",
              onClick: _cache[0] || (_cache[0] = (...args) => unref(shrink) && unref(shrink)(...args))
            }, _cache[4] || (_cache[4] = [
              createBaseVNode("svg", {
                t: "1741916524280",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3514",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M819.2 477.866667h-597.333333c-17.066667 0-34.133333 12.8-34.133334 34.133333s12.8 34.133333 34.133334 34.133333h597.333333c17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333z",
                  "p-id": "3515"
                })
              ], -1)
            ])),
            createBaseVNode("button", {
              class: "gray",
              onClick: _cache[1] || (_cache[1] = (...args) => unref(setFullScreen) && unref(setFullScreen)(...args))
            }, _cache[5] || (_cache[5] = [
              createBaseVNode("svg", {
                t: "1741916508767",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3348",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M832 93.866667h-640c-51.2 0-93.866667 42.666667-93.866667 93.866666v640c0 51.2 42.666667 93.866667 93.866667 93.866667h640c51.2 0 93.866667-42.666667 93.866667-93.866667v-640c4.266667-46.933333-42.666667-93.866667-93.866667-93.866666z m29.866667 738.133333c0 17.066667-12.8 34.133333-34.133334 34.133333h-640c-17.066667 0-34.133333-12.8-34.133333-34.133333v-640c0-17.066667 12.8-34.133333 34.133333-34.133333h640c17.066667 0 34.133333 12.8 34.133334 34.133333v640z",
                  "p-id": "3349"
                })
              ], -1)
            ])),
            createBaseVNode("button", {
              class: "gray",
              onClick: _cache[2] || (_cache[2] = (...args) => unref(close) && unref(close)(...args))
            }, _cache[6] || (_cache[6] = [
              createBaseVNode("svg", {
                t: "1741916485573",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3182",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                  "p-id": "3183"
                })
              ], -1)
            ]))
          ])
        ]),
        createBaseVNode("div", _hoisted_4$3, [
          createBaseVNode("video", {
            id: "localVideo",
            ref_key: "localVideo",
            ref: localVideo,
            autoplay: "",
            muted: ""
          }, null, 512),
          createBaseVNode("video", {
            id: "remoteVideo",
            ref_key: "remoteVideo",
            ref: remoteVideo,
            autoplay: ""
          }, null, 512)
        ]),
        createBaseVNode("div", _hoisted_5$3, [
          createBaseVNode("button", _hoisted_6$3, [
            withDirectives(createBaseVNode("div", _hoisted_7$2, _cache[7] || (_cache[7] = [
              createBaseVNode("svg", {
                t: "1742714269708",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "4173",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M464.3328 834.9696C272.1792 811.6736 128 653.2096 128 465.4592h96a275.0464 275.0464 0 0 0 84.3264 197.7344 292.864 292.864 0 0 0 203.6736 81.92h1.9456c158.3104-1.024 286.0544-125.7472 286.0544-279.2448H896c0 187.4944-143.8208 345.8048-335.6672 369.408l0.4608 142.4384-96 0.256zM512 93.0816c-53.0432 0-96 41.6768-96 93.0816v279.296c0 51.2 42.9568 93.0816 96 93.0816s96-41.6768 96-93.0816V186.1632a91.8528 91.8528 0 0 0-28.1088-65.6896A97.5872 97.5872 0 0 0 512 93.2352zM512 0c106.0352 0 192 83.3536 192 186.1632v279.296c0 102.8096-85.9648 186.1632-192 186.1632s-192-83.3536-192-186.1632V186.1632C320 83.3536 405.9648 0 512 0z m0 0",
                  "p-id": "4174"
                }),
                createBaseVNode("path", {
                  d: "M320 930.9184h384V1024h-384z",
                  "p-id": "4175"
                })
              ], -1)
            ]), 512), [
              [vShow, isMicrophone.value === true]
            ]),
            withDirectives(createBaseVNode("div", _hoisted_8$1, _cache[8] || (_cache[8] = [
              createBaseVNode("svg", {
                t: "1742714278386",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "1760",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M348.059755 959.775056c-10.96595-4.376558-17.889634-11.723875-21.042625-22.330092-5.465225-18.3819-0.010058-34.898867 14.825983-44.897443 6.662758-4.489567 7.54375-4.54755 69.452793-4.54755h62.704243v-79.754892l-9.500392-1.340717c-94.618151-13.353917-179.366711-66.700359-233.511904-146.986569-31.141192-46.176626-49.366892-98.613085-55.048667-158.379702-3.362442-35.372201 0.141408-48.367567 15.904-58.990351 5.273525-3.554142 9.546542-4.54755 19.551625-4.54755 13.638509 0 20.972217 2.713975 27.855668 10.309792 7.6325 8.423558 9.10575 13.79175 10.811525 39.412692 0.925367 13.902392 3.124592 32.243467 4.887166 40.756959 19.051667 92.037893 85.044393 166.080244 174.050586 195.281953 51.038351 16.744759 116.202152 16.70275 165.785003-0.107684l17.784908-6.029675 26.714934 26.660501c14.69345 14.662684 26.715525 27.218442 26.715525 27.901817 0 0.683375-8.490417 4.98065-18.86825 9.5495-20.953875 9.225858-60.378401 20.840275-82.632168 24.342942l-14.499975 2.28265v79.638334h62.704834c61.909043 0 62.789443 0.057392 69.452201 4.54755 13.868667 9.345967 20.035017 25.886009 15.679759 42.058626-3.14885 11.695475-8.462608 18.371842-18.481892 23.222325-8.521183 4.1251-10.395583 4.170067-167.486044 4.044634-99.403551-0.079283-160.717969-0.864425-163.808836-2.09805z m544.940391-11.5801c-3.300317-2.084442-188.867103-186.805736-412.371556-410.492423-366.139905-366.438697-406.506956-407.455989-407.743539-414.31459-3.512133-19.481217 2.409858-34.916617 17.525167-45.680217 8.457875-6.021983 28.113042-7.545525 37.835309-2.931708 3.882517 1.84245 180.260128 176.766336 414.129989 410.716664 367.101955 367.228572 407.502731 408.259473 408.739315 415.119256 2.470208 13.701817 0.021892 26.843917-6.51425 34.966909-10.309792 12.812542-17.434642 16.4223-32.396118 16.413425-9.506308-0.005917-14.884559-1.06855-19.204317-3.797316z m-137.950635-298.14498l-25.892517-25.9505 4.4872-7.549667c24.889642-41.874617 40.227417-91.444451 40.395451-130.550069 0.101175-23.587384 4.556425-34.391217 17.939925-43.499334 9.466075-6.44325 30.58325-6.417808 40.177126 0.047334 15.739517 10.606808 19.26585 23.6288 15.92175 58.801017-5.801883 61.030418-23.566084 111.45521-56.417784 160.151153-5.380617 7.975667-9.99325 14.499975-10.250626 14.499975-0.257375 0-12.1197-11.677134-26.360525-25.9505z m-271.122971 9.97195c-66.130584-10.580183-120.530193-52.789684-145.017502-112.52021-9.950058-24.268392-13.027317-41.905976-14.221892-81.502084l-1.115883-36.999876 40.968776 40.736251c30.670225 30.496867 41.521984 42.562134 43.169775 48.000142 3.285525 10.839333 17.158334 30.874942 28.336101 40.925584 5.430317 4.882433 17.3169 12.567 26.413775 17.077275 14.998159 7.435475 19.96165 11.62625 53.235801 44.945959 33.443959 33.490109 36.279817 36.864384 32.000292 38.078484-7.962058 2.260167-52.071401 3.129917-63.769834 1.258475z m161.594228-119.521993l-27.425526-27.500075 3.020459-11.520934c2.576708-9.828767 2.936442-30.975525 2.451866-143.999835l-0.568-132.478902-5.2753-14.431934c-12.381217-33.867-40.161151-59.780818-74.516276-69.510184-16.643584-4.713808-48.322601-4.341058-64.860867 0.76325-28.432542 8.774417-54.249917 30.2247-66.412218 55.178834-9.674342 19.849825-11.9351 32.520959-11.9351 66.899751v31.059542l-37.000467-36.960234c-42.479301-42.432559-39.631017-35.443792-28.436092-69.770518 18.9712-58.170301 66.708051-102.60861 128.436635-119.561043 17.5441-4.817942 23.56135-5.492442 49.000059-5.492442 25.369484 0 31.473709 0.680417 48.759251 5.433867 65.447801 17.9985 113.347952 65.306393 131.142918 129.52116 7.344358 26.503709 8.426517 52.326409 7.580434 180.869545-0.923 140.272335-0.509425 136.253144-18.043467 175.500169-3.316883 7.425417-6.58525 13.500059-7.262117 13.500058-0.676867 0-13.572242-12.3753-28.656192-27.500075z",
                  fill: "#333333",
                  "p-id": "1761"
                })
              ], -1)
            ]), 512), [
              [vShow, isMicrophone.value === false]
            ]),
            withDirectives(createBaseVNode("div", null, "关闭麦克风", 512), [
              [vShow, isMicrophone.value === true]
            ]),
            withDirectives(createBaseVNode("div", null, "打开麦克风", 512), [
              [vShow, isMicrophone.value === false]
            ])
          ]),
          _cache[11] || (_cache[11] = createBaseVNode("button", { class: "rtc-box-bottom-button" }, [
            createBaseVNode("div", { class: "rtc-box-bottom-button-svg" }, [
              createBaseVNode("svg", {
                t: "1742708500672",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "10143",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M602.224 891h-480.96C54.392 891 0 836.64 0 769.736v-515.44c0-66.872 54.392-121.304 121.264-121.304h480.96c66.864 0 121.296 54.424 121.296 121.304v88.312l253.032-146.104a31.76 31.76 0 0 1 31.632 0A31.632 31.632 0 0 1 1024 223.904v576.232a31.704 31.704 0 0 1-15.816 27.424 31.76 31.76 0 0 1-31.632 0L723.52 681.464v88.272c0 66.904-54.424 121.264-121.296 121.264z m-480.96-694.744c-32 0-58.008 26.04-58.008 58.04v515.44c0 32 26.008 58.008 58.008 58.008h480.96c32 0 58.04-26.008 58.04-58.008V626.664c0-11.304 6.024-21.752 15.816-27.432a31.744 31.744 0 0 1 31.624 0l253.04 146.104V278.688l-253.04 146.104a31.744 31.744 0 0 1-31.624 0 31.632 31.632 0 0 1-15.816-27.4V254.296c0-32-26.04-58.04-58.04-58.04h-480.96z",
                  fill: "#2c2c2c",
                  "p-id": "10144"
                })
              ])
            ]),
            createBaseVNode("div", null, "关闭视频")
          ], -1)),
          createBaseVNode("button", _hoisted_9$1, [
            createBaseVNode("div", {
              class: "rtc-box-bottom-button-svg red",
              onClick: _cache[3] || (_cache[3] = (...args) => unref(close) && unref(close)(...args))
            }, _cache[9] || (_cache[9] = [
              createBaseVNode("svg", {
                t: "1742714948455",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "5359",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M908.7 447.3c-46-55.1-119.2-92.2-217.7-110.1-75.8-13.8-144.6-12.1-170.6-11.5-3.2 0.1-5.9 0.1-7.3 0.1s-4.2-0.1-7.3-0.1c-25.9-0.6-94.8-2.3-170.6 11.5-98.4 17.9-171.7 55-217.7 110.1-41.9 50.2-53.9 96.5-51.3 123.1 1.5 15.2 7.8 42.6 18 66.8 15.8 37.5 36.8 58.2 62.4 61.6 2.8 0.4 5.8 0.6 8.9 0.6 30.4 0 71.4-16.9 88.7-24.8 29.8-13.5 67.5-34.3 78.1-57.1 10.7-23 11-41.1 11.2-54.4 0.2-10.5 0.4-14.6 3.4-19.6 1.3-1.3 15.2-13.4 78.4-23.4 40.3-6.3 81.3-8.7 97.7-8.7s57.3 2.4 97.7 8.7c63.2 9.9 77 22.1 78.4 23.4 3 5 3.2 9 3.4 19.6 0.2 13.2 0.5 31.3 11.2 54.4 10.6 22.8 48.3 43.7 78.1 57.1 17.4 7.8 58.4 24.8 88.7 24.8 3.1 0 6.1-0.2 8.9-0.6 25.6-3.4 46.6-24.1 62.4-61.6 10.2-24.3 16.5-51.7 18-66.8 2.8-26.6-9.2-72.9-51.1-123.1z m-4.5 117.5c-0.8 8.2-5 28.3-12.7 47.6-9 22.4-17.2 29.9-19.6 30.9-6.8 0.8-29.6-3.4-63-18-33.1-14.5-51-27.9-54.8-32.4-5.2-11.7-5.4-20.1-5.6-30.7-0.2-13.4-0.5-30-12.1-48.7-8.6-13.8-24.4-24.3-49.5-33-16.8-5.8-38.2-10.9-63.4-15-45-7.4-90.6-10-110.4-10s-65.4 2.7-110.4 10c-25.3 4.1-46.6 9.2-63.4 15-25.1 8.7-40.8 19.2-49.5 33-11.6 18.6-11.9 35.3-12.1 48.7-0.2 10.6-0.3 19-5.6 30.7-3.8 4.5-21.7 17.9-54.8 32.4-33.4 14.6-56.2 18.8-63 18-2.4-1-10.7-8.5-19.6-30.9-7.7-19.3-11.9-39.5-12.7-47.6-0.9-8.8 4.3-40.6 38.5-81.6 37.4-44.8 99.5-75.4 184.7-90.9 70.1-12.8 134.8-11.2 159.2-10.6 3.8 0.1 6.6 0.2 8.7 0.2s4.9-0.1 8.7-0.2c24.4-0.6 89-2.1 159.2 10.6 85.2 15.5 147.3 46.1 184.7 90.9 34.2 41 39.4 72.8 38.5 81.6z",
                  fill: "#2c2c2c",
                  "p-id": "5360"
                })
              ], -1)
            ])),
            _cache[10] || (_cache[10] = createBaseVNode("div", null, "挂断", -1))
          ])
        ])
      ]);
    };
  }
};
const WebRTCIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-148c476a"]]);
const _hoisted_1$2 = { class: "super-color-palette" };
const _hoisted_2$2 = { class: "super-color-palette-views" };
const _hoisted_3$2 = { class: "super-color-palette-views-box-friendUser" };
const _hoisted_4$2 = { class: "super-color-palette-views-box-Chat" };
const _hoisted_5$2 = { class: "super-color-palette-views-box-Chat-take user" };
const _hoisted_6$2 = { class: "super-color-palette-views-box-Chat-take user" };
const _hoisted_7$1 = { class: "super-color-palette-views-right-button-all" };
const _hoisted_8 = { class: "super-color-palette-choose" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "super-color-palette-confirm" };
const _hoisted_11 = { class: "super-color-style" };
const _hoisted_12 = { class: "super-color-palette-views-box-friendUser" };
const _hoisted_13 = { class: "super-color-palette-views-box-Chat" };
const _hoisted_14 = { class: "super-color-palette-views-box-Chat-take user" };
const _hoisted_15 = { class: "super-color-palette-views-box-Chat-take user" };
const _hoisted_16 = { class: "super-color-palette-choose" };
const _hoisted_17 = { class: "super-color-style-box" };
const _hoisted_18 = { class: "super-color-style-box" };
const _hoisted_19 = { class: "super-color-style-box" };
const _hoisted_20 = { class: "super-color-palette-confirm" };
const _sfc_main$2 = {
  __name: "superColorPalette",
  setup(__props) {
    onMounted(async () => {
      await userColorStyle();
      const matchingIndex = findMatchingButtonIndex();
      if (matchingIndex !== -1) {
        selectedButtonIndex.value = matchingIndex;
      } else {
        selectedButtonIndex.value = -1;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives(createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("div", {
              class: "super-color-palette-views-box",
              style: normalizeStyle({
                backgroundColor: unref(chat_background),
                backgroundImage: unref(background_image) ? `url(${unref(background_image)})` : "none",
                backgroundSize: "cover"
              })
            }, [
              _cache[13] || (_cache[13] = createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar" }, [
                createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar-button" }),
                createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar-button" }),
                createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar-button" })
              ], -1)),
              createBaseVNode("div", _hoisted_3$2, [
                _cache[11] || (_cache[11] = createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-click" }, [
                  createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-img un-click-in" }),
                  createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-title un-click-in" })
                ], -1)),
                createBaseVNode("div", {
                  class: "super-color-palette-views-box-friendUser-click click",
                  style: normalizeStyle({ backgroundColor: unref(accent_color) })
                }, _cache[10] || (_cache[10] = [
                  createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-img click-in" }, null, -1),
                  createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-title click-in" }, null, -1)
                ]), 4)
              ]),
              createBaseVNode("div", _hoisted_4$2, [
                createBaseVNode("div", _hoisted_5$2, [
                  createBaseVNode("div", {
                    class: "super-color-palette-views-box-Chat-take-title user-take",
                    style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                  }, null, 4),
                  createBaseVNode("div", {
                    class: "super-color-palette-views-box-Chat-take-img user-take",
                    style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                  }, null, 4)
                ]),
                _cache[12] || (_cache[12] = createBaseVNode("div", { class: "super-color-palette-views-box-Chat-take friend" }, [
                  createBaseVNode("div", { class: "super-color-palette-views-box-Chat-take-img friend-take" }),
                  createBaseVNode("div", { class: "super-color-palette-views-box-Chat-take-title friend-take" })
                ], -1)),
                createBaseVNode("div", _hoisted_6$2, [
                  createBaseVNode("div", {
                    class: "super-color-palette-views-box-Chat-take-title user-take",
                    style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                  }, null, 4),
                  createBaseVNode("div", {
                    class: "super-color-palette-views-box-Chat-take-img user-take",
                    style: normalizeStyle({ backgroundColor: unref(chat_bubbles) })
                  }, null, 4)
                ])
              ])
            ], 4),
            createBaseVNode("div", _hoisted_7$1, [
              createBaseVNode("button", {
                class: "super-color-palette-views-right-button",
                onClick: _cache[0] || (_cache[0] = (...args) => unref(handleDefaultColor) && unref(handleDefaultColor)(...args))
              }, _cache[14] || (_cache[14] = [
                createBaseVNode("svg", {
                  t: "1742865223302",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "4419",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M523.377778 37.347556c-260.380444 0-471.466667 211.057778-471.466667 471.466666 0 260.380444 211.086222 471.438222 471.466667 471.438222s471.466667-211.057778 471.466666-471.466666c0-131.413333-54.101333-254.293333-147.797333-342.784A469.873778 469.873778 0 0 0 523.377778 37.319111z m0 68.266666a401.635556 401.635556 0 0 1 276.792889 110.023111 401.891556 401.891556 0 0 1 126.407111 293.148445c0 222.72-180.508444 403.2-403.2 403.2-222.691556 0-403.2-180.508444-403.2-403.171556 0-222.72 180.508444-403.228444 403.2-403.228444z",
                    fill: "#333333",
                    "p-id": "4420"
                  }),
                  createBaseVNode("path", {
                    d: "M193.109333 178.517333a34.133333 34.133333 0 0 1 45.511111-2.474666l2.759112 2.474666 612.266666 612.266667a34.133333 34.133333 0 0 1-45.511111 50.773333l-2.759111-2.474666L193.109333 226.816a34.133333 34.133333 0 0 1 0-48.298667z",
                    fill: "#333333",
                    "p-id": "4421"
                  })
                ], -1),
                createBaseVNode("div", null, "恢复默认", -1)
              ])),
              createBaseVNode("button", {
                class: "super-color-palette-views-right-button",
                onClick: _cache[1] || (_cache[1] = ($event) => istoneColor.value = true)
              }, _cache[15] || (_cache[15] = [
                createBaseVNode("svg", {
                  t: "1742865548533",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "5732",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M314.88 626.133333l96.213333 94.933334a130.346667 130.346667 0 0 1-108.16 54.826666 104.32 104.32 0 0 1-73.386666-27.52 102.4 102.4 0 0 0 42.666666-26.88 110.933333 110.933333 0 0 0 25.386667-64v-2.346666a59.52 59.52 0 0 1 7.893333-26.88 31.146667 31.146667 0 0 1 10.026667-2.56m14.08-64c-64 0-85.333333 27.733333-95.146667 85.333333v2.773333c-2.986667 18.773333-5.12 25.386667-8.533333 29.013334a39.68 39.68 0 0 1-8.746667 7.04 33.493333 33.493333 0 0 1-18.133333 5.12 29.866667 29.866667 0 0 1-8.746667-1.066667h-1.92a29.013333 29.013333 0 0 0-10.24-1.92A27.946667 27.946667 0 0 0 149.333333 717.013333c8.96 81.28 78.72 122.88 153.386667 122.88A189.226667 189.226667 0 0 0 481.28 725.333333a27.946667 27.946667 0 0 0-6.4-30.293333l-126.293333-125.653333a28.16 28.16 0 0 0-19.626667-8.106667l0.64 0.426667zM808.32 234.666667H810.666667c0 10.453333-9.386667 49.066667-97.493334 158.72-15.36 18.986667-31.146667 37.76-47.146666 56.106666-31.146667 35.84-147.626667 157.44-147.626667 157.44l-80.853333-81.493333s117.12-114.346667 154.24-147.413333c19.84-17.493333 40.32-34.56 60.586666-50.986667 100.053333-80.426667 140.8-92.373333 155.946667-92.373333m0-64c-47.146667 0-111.786667 38.826667-196.053333 106.666666-21.333333 17.066667-42.666667 34.773333-62.72 52.906667-38.677333 34.133333-76.373333 69.269333-113.066667 105.386667-14.72 14.72-29.653333 29.653333-44.16 44.586666l-3.413333 3.626667a60.8 60.8 0 0 0 0 85.333333l85.333333 86.4c11.306667 11.306667 26.666667 17.706667 42.666667 17.706667a60.586667 60.586667 0 0 0 42.666666-17.706667l3.2-3.2 9.813334-9.813333 34.773333-35.413333c35.84-37.12 71.893333-76.16 105.386667-114.773334 16.64-18.986667 32.853333-38.4 48.64-58.026666 102.186667-126.08 142.72-208 89.173333-249.813334a66.56 66.56 0 0 0-42.666667-13.866666h0.426667z",
                    "p-id": "5733"
                  })
                ], -1),
                createBaseVNode("div", null, "随心调", -1)
              ])),
              createBaseVNode("button", {
                class: "super-color-palette-views-right-button",
                onClick: _cache[2] || (_cache[2] = (...args) => unref(buttonImg) && unref(buttonImg)(...args))
              }, _cache[16] || (_cache[16] = [
                createBaseVNode("svg", {
                  t: "1742865580964",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "8172",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z",
                    fill: "#000000",
                    "p-id": "8173"
                  })
                ], -1),
                createBaseVNode("div", null, "上传图片", -1)
              ])),
              createBaseVNode("input", {
                ref_key: "ImgInput",
                ref: ImgInput,
                type: "file",
                style: { "display": "none" },
                accept: "image/*",
                onChange: _cache[3] || (_cache[3] = (...args) => unref(handleImageUpload) && unref(handleImageUpload)(...args))
              }, null, 544)
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(colorButton), (color2, index) => {
              return openBlock(), createElementBlock("button", {
                key: index,
                class: "super-color-palette-choose-button",
                style: normalizeStyle({
                  border: `3px solid ${unref(selectedButtonIndex) === index ? "#2b292b" : "transparent"}`,
                  backgroundColor: color2.accent_color
                }),
                onClick: ($event) => unref(chooseColor)(color2, index)
              }, toDisplayString(color2.name), 13, _hoisted_9);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("button", {
              class: "super-color-palette-confirm-button",
              style: normalizeStyle({ backgroundColor: unref(chat_bubbles) }),
              onClick: _cache[4] || (_cache[4] = (...args) => unref(confirmColor) && unref(confirmColor)(...args))
            }, " 确认修改 ", 4)
          ])
        ], 512), [
          [vShow, unref(istoneColor) === false]
        ]),
        withDirectives(createBaseVNode("div", _hoisted_11, [
          createBaseVNode("button", {
            class: "super-color-palette-confirm-button",
            style: normalizeStyle({ backgroundColor: unref(tone_accent_color) }),
            onClick: _cache[5] || (_cache[5] = ($event) => istoneColor.value = false)
          }, " 返回 ", 4),
          createBaseVNode("div", {
            class: "super-color-palette-views-box",
            style: normalizeStyle({
              backgroundColor: unref(tone_chat_background),
              backgroundImage: unref(tone_background_image) ? `url(${unref(tone_background_image)})` : "none",
              backgroundSize: "cover"
            })
          }, [
            _cache[20] || (_cache[20] = createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar" }, [
              createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar-button" }),
              createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar-button" }),
              createBaseVNode("div", { class: "super-color-palette-views-box-Sidebar-button" })
            ], -1)),
            createBaseVNode("div", _hoisted_12, [
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-click" }, [
                createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-img un-click-in" }),
                createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-title un-click-in" })
              ], -1)),
              createBaseVNode("div", {
                class: "super-color-palette-views-box-friendUser-click click",
                style: normalizeStyle({ backgroundColor: unref(tone_accent_color) })
              }, _cache[17] || (_cache[17] = [
                createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-img click-in" }, null, -1),
                createBaseVNode("div", { class: "super-color-palette-views-box-friendUser-title click-in" }, null, -1)
              ]), 4)
            ]),
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("div", {
                  class: "super-color-palette-views-box-Chat-take-title user-take",
                  style: normalizeStyle({ backgroundColor: unref(tone_chat_bubbles) })
                }, null, 4),
                createBaseVNode("div", {
                  class: "super-color-palette-views-box-Chat-take-img user-take",
                  style: normalizeStyle({ backgroundColor: unref(tone_chat_bubbles) })
                }, null, 4)
              ]),
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "super-color-palette-views-box-Chat-take friend" }, [
                createBaseVNode("div", { class: "super-color-palette-views-box-Chat-take-img friend-take" }),
                createBaseVNode("div", { class: "super-color-palette-views-box-Chat-take-title friend-take" })
              ], -1)),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("div", {
                  class: "super-color-palette-views-box-Chat-take-title user-take",
                  style: normalizeStyle({ backgroundColor: unref(tone_chat_bubbles) })
                }, null, 4),
                createBaseVNode("div", {
                  class: "super-color-palette-views-box-Chat-take-img user-take",
                  style: normalizeStyle({ backgroundColor: unref(tone_chat_bubbles) })
                }, null, 4)
              ])
            ])
          ], 4),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("div", _hoisted_17, [
              _cache[21] || (_cache[21] = createBaseVNode("div", null, "主题色", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => isRef(tone_accent_color) ? tone_accent_color.value = $event : null),
                type: "color"
              }, null, 512), [
                [vModelText, unref(tone_accent_color)]
              ])
            ]),
            createBaseVNode("div", _hoisted_18, [
              _cache[22] || (_cache[22] = createBaseVNode("div", null, "对话色", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(tone_chat_bubbles) ? tone_chat_bubbles.value = $event : null),
                type: "color"
              }, null, 512), [
                [vModelText, unref(tone_chat_bubbles)]
              ])
            ]),
            createBaseVNode("div", _hoisted_19, [
              _cache[23] || (_cache[23] = createBaseVNode("div", null, "背景色", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => isRef(tone_chat_background) ? tone_chat_background.value = $event : null),
                type: "color"
              }, null, 512), [
                [vModelText, unref(tone_chat_background)]
              ])
            ]),
            createBaseVNode("div", _hoisted_20, [
              createBaseVNode("button", {
                class: "super-color-palette-confirm-button",
                style: normalizeStyle({ backgroundColor: unref(tone_accent_color) }),
                onClick: _cache[9] || (_cache[9] = (...args) => unref(confirmToneColor) && unref(confirmToneColor)(...args))
              }, " 确认修改 ", 4)
            ])
          ])
        ], 512), [
          [vShow, unref(istoneColor) === true]
        ])
      ], 64);
    };
  }
};
const SuperColorPalette = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a14ce0d2"]]);
const _hoisted_1$1 = { class: "set-box" };
const _hoisted_2$1 = { class: "set-box-filePath" };
const _hoisted_3$1 = { class: "set-box-filePath-box" };
const _hoisted_4$1 = { class: "set-box-filePath-box-in" };
const _hoisted_5$1 = { class: "set-box-filePath-box-in-left" };
const _hoisted_6$1 = ["title"];
const _sfc_main$1 = {
  __name: "appset",
  setup(__props) {
    const downloadsPath = ref$1();
    const getCurrentDownloadsPath = async () => {
      try {
        downloadsPath.value = await window.api.getDownloadsPath();
      } catch (error) {
        console.error("获取下载路径失败:", error);
      }
    };
    const changeDownloadPath = async () => {
      try {
        const newPath = await window.api.openDirectoryDialog();
        if (newPath) {
          const result = await window.api.setDownloadsPath(newPath);
          if (result.success) {
            downloadsPath.value = newPath;
          }
        }
      } catch (error) {
        console.error("更改下载路径失败:", error);
      }
    };
    onMounted(() => {
      getCurrentDownloadsPath();
    });
    const clearImage = async () => {
      await window.api.clearImageCache();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          _cache[2] || (_cache[2] = createBaseVNode("div", { style: { "font-size": "14px" } }, "保存位置", -1)),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, [
                _cache[0] || (_cache[0] = createBaseVNode("div", { class: "title" }, "将接收的文件保存到", -1)),
                createBaseVNode("div", {
                  class: "download-path",
                  title: downloadsPath.value
                }, toDisplayString(downloadsPath.value), 9, _hoisted_6$1)
              ]),
              createBaseVNode("button", {
                class: "download-button",
                style: { "font-size": "11px" },
                onClick: changeDownloadPath
              }, " 更改存储路径 ")
            ]),
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "set-box-filePath-box-in" }, [
              createBaseVNode("div", { class: "set-box-filePath-box-in-left" }, [
                createBaseVNode("div", { class: "title" }, "将接收的聊天文件保存到"),
                createBaseVNode("div", null, "path")
              ]),
              createBaseVNode("button", {
                class: "download-button",
                style: { "font-size": "11px" }
              }, "更改存储路径")
            ], -1))
          ])
        ]),
        createBaseVNode("div", { class: "set-box-filePath-2" }, [
          _cache[3] || (_cache[3] = createBaseVNode("div", { style: { "font-size": "14px" } }, "图片缓存位置", -1)),
          createBaseVNode("button", { onClick: clearImage }, "清除图片缓存")
        ])
      ]);
    };
  }
};
const AppSet = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-12ce4582"]]);
const _hoisted_1 = { class: "app-set-box" };
const _hoisted_2 = { class: "app-set-box-left" };
const _hoisted_3 = { class: "app-set-box-right" };
const _hoisted_4 = { class: "app-set-box-right-top" };
const _hoisted_5 = { class: "app-set-box-right-top-button-all" };
const _hoisted_6 = { class: "app-set-box-right-top-title" };
const _hoisted_7 = { class: "top-title" };
const _sfc_main = {
  __name: "appSetIndex",
  setup(__props) {
    useCssVars((_ctx) => ({
      "8735ae54": unref(accent_color)
    }));
    const activeButtonIndex = ref$1(0);
    const title = ref$1("超级调色盘");
    watchEffect(() => {
      switch (activeButtonIndex.value) {
        case 0:
          title.value = "超级调色盘";
          break;
        case 1:
          title.value = "设置";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("button", {
            class: normalizeClass(["app-set-box-left-button", { active: activeButtonIndex.value === 0 }]),
            onClick: _cache[0] || (_cache[0] = ($event) => activeButtonIndex.value = 0)
          }, [
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "app-set-box-left-button-svg" }, [
              createBaseVNode("svg", {
                t: "1742370691609",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3237",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M921.6 320l-140.8-209.066667c-4.266667-8.533333-17.066667-12.8-25.6-12.8H640c-17.066667 0-34.133333 12.8-34.133333 34.133334 0 51.2-42.666667 93.866667-93.866667 93.866666-51.2 0-93.866667-42.666667-93.866667-93.866666 0-17.066667-12.8-34.133333-34.133333-34.133334H268.8c-12.8-4.266667-21.333333 4.266667-29.866667 12.8L102.4 320c-8.533333 12.8-8.533333 29.866667 4.266667 42.666667l110.933333 93.866666V896c0 17.066667 12.8 34.133333 34.133333 34.133333h524.8c17.066667 0 34.133333-12.8 34.133334-34.133333V456.533333l110.933333-93.866666c8.533333-12.8 8.533333-29.866667 0-42.666667z m-170.666667 98.133333c-8.533333 4.266667-12.8 17.066667-12.8 25.6v422.4H281.6v-422.4c0-8.533333-4.266667-17.066667-12.8-25.6L170.666667 332.8l115.2-170.666667h72.533333c12.8 72.533333 81.066667 128 157.866667 128 76.8 0 140.8-55.466667 157.866666-128h72.533334l115.2 170.666667-110.933334 85.333333z",
                  "p-id": "3238"
                })
              ])
            ], -1)),
            createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[0].name), 1)
          ], 2),
          createBaseVNode("button", {
            class: normalizeClass(["app-set-box-left-button", { active: activeButtonIndex.value === 1 }]),
            onClick: _cache[1] || (_cache[1] = ($event) => activeButtonIndex.value = 1)
          }, [
            _cache[6] || (_cache[6] = createBaseVNode("div", { class: "app-set-box-left-button-svg" }, [
              createBaseVNode("svg", {
                t: "1742370691609",
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "3237",
                width: "200",
                height: "200"
              }, [
                createBaseVNode("path", {
                  d: "M921.6 320l-140.8-209.066667c-4.266667-8.533333-17.066667-12.8-25.6-12.8H640c-17.066667 0-34.133333 12.8-34.133333 34.133334 0 51.2-42.666667 93.866667-93.866667 93.866666-51.2 0-93.866667-42.666667-93.866667-93.866666 0-17.066667-12.8-34.133333-34.133333-34.133334H268.8c-12.8-4.266667-21.333333 4.266667-29.866667 12.8L102.4 320c-8.533333 12.8-8.533333 29.866667 4.266667 42.666667l110.933333 93.866666V896c0 17.066667 12.8 34.133333 34.133333 34.133333h524.8c17.066667 0 34.133333-12.8 34.133334-34.133333V456.533333l110.933333-93.866666c8.533333-12.8 8.533333-29.866667 0-42.666667z m-170.666667 98.133333c-8.533333 4.266667-12.8 17.066667-12.8 25.6v422.4H281.6v-422.4c0-8.533333-4.266667-17.066667-12.8-25.6L170.666667 332.8l115.2-170.666667h72.533333c12.8 72.533333 81.066667 128 157.866667 128 76.8 0 140.8-55.466667 157.866666-128h72.533334l115.2 170.666667-110.933334 85.333333z",
                  "p-id": "3238"
                })
              ])
            ], -1)),
            createBaseVNode("div", null, toDisplayString(unref(moreBoxButtonText)[2].name), 1)
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("button", {
                class: "gray",
                onClick: _cache[2] || (_cache[2] = (...args) => unref(shrink) && unref(shrink)(...args))
              }, _cache[7] || (_cache[7] = [
                createBaseVNode("svg", {
                  t: "1741916524280",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3514",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M819.2 477.866667h-597.333333c-17.066667 0-34.133333 12.8-34.133334 34.133333s12.8 34.133333 34.133334 34.133333h597.333333c17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333z",
                    "p-id": "3515"
                  })
                ], -1)
              ])),
              createBaseVNode("button", {
                class: "gray",
                onClick: _cache[3] || (_cache[3] = (...args) => unref(setFullScreen) && unref(setFullScreen)(...args))
              }, _cache[8] || (_cache[8] = [
                createBaseVNode("svg", {
                  t: "1741916508767",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3348",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M832 93.866667h-640c-51.2 0-93.866667 42.666667-93.866667 93.866666v640c0 51.2 42.666667 93.866667 93.866667 93.866667h640c51.2 0 93.866667-42.666667 93.866667-93.866667v-640c4.266667-46.933333-42.666667-93.866667-93.866667-93.866666z m29.866667 738.133333c0 17.066667-12.8 34.133333-34.133334 34.133333h-640c-17.066667 0-34.133333-12.8-34.133333-34.133333v-640c0-17.066667 12.8-34.133333 34.133333-34.133333h640c17.066667 0 34.133333 12.8 34.133334 34.133333v640z",
                    "p-id": "3349"
                  })
                ], -1)
              ])),
              createBaseVNode("button", {
                class: "red",
                onClick: _cache[4] || (_cache[4] = (...args) => unref(close) && unref(close)(...args))
              }, _cache[9] || (_cache[9] = [
                createBaseVNode("svg", {
                  t: "1741916485573",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "3182",
                  width: "200",
                  height: "200"
                }, [
                  createBaseVNode("path", {
                    d: "M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z",
                    "p-id": "3183"
                  })
                ], -1)
              ]))
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, toDisplayString(title.value), 1)
            ])
          ]),
          activeButtonIndex.value === 0 ? (openBlock(), createBlock(SuperColorPalette, { key: 0 })) : createCommentVNode("", true),
          activeButtonIndex.value === 1 ? (openBlock(), createBlock(AppSet, { key: 1 })) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const AppSetIndex = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-749254eb"]]);
const router = createRouter({
  history: createWebHashHistory("./"),
  routes: [
    {
      path: "/home",
      component: MainIndex
    },
    {
      path: "/login",
      component: LoginIndex
    },
    {
      path: "/search",
      component: SearchIndex
    },
    {
      path: "/webRTC",
      component: WebRTCIndex
    },
    {
      path: "/appSet",
      component: AppSetIndex
    }
  ]
});
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
