import "./chunk-VZEHAHUI.js";
import {
  CommonModule,
  DomAdapter,
  LocationStrategy,
  PLATFORM_BROWSER_ID,
  PlatformLocation,
  PlatformNavigation,
  getDOM,
  init_common,
  init_platform_navigation,
  normalizeQueryParams,
  setRootDomAdapter
} from "./chunk-RUZ3W66U.js";
import {
  APP_ID,
  ApplicationModule,
  COMPILER_OPTIONS,
  CSP_NONCE,
  ChangeDetectionScheduler,
  ChangeDetectionSchedulerImpl,
  Compiler,
  CompilerConfig,
  CompilerFactory,
  Console,
  DOCUMENT,
  ErrorHandler,
  FactoryTarget,
  FakeNavigation,
  INJECTOR_SCOPE,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  PLATFORM_INITIALIZER,
  RendererFactory2,
  RendererStyleFlags2,
  ResourceLoader,
  RuntimeError,
  SecurityContext,
  Subject,
  TESTABILITY,
  TESTABILITY_GETTER,
  TestComponentRenderer,
  Testability,
  TestabilityRegistry,
  TracingService,
  Version,
  ViewEncapsulation,
  XSS_SECURITY_URL,
  XhrFactory,
  __spreadProps,
  __spreadValues,
  _global,
  _sanitizeHtml,
  _sanitizeUrl,
  allowSanitizationBypassAndThrow,
  bypassSanitizationTrustHtml,
  bypassSanitizationTrustResourceUrl,
  bypassSanitizationTrustScript,
  bypassSanitizationTrustStyle,
  bypassSanitizationTrustUrl,
  core_exports,
  createPlatformFactory,
  forwardRef,
  getTestBed,
  init_compiler,
  init_core,
  init_esm,
  init_testing,
  inject,
  internalProvideZoneChangeDetection,
  parseCookieValue,
  platformCore,
  setDocument,
  unwrapSafeValue,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-4IKF6JLI.js";

// node_modules/zone.js/fesm2015/zone.js
var global2 = globalThis;
function __symbol__(name) {
  const symbolPrefix = global2["__Zone_symbol_prefix"] || "__zone_symbol__";
  return symbolPrefix + name;
}
function initZone() {
  const performance2 = global2["performance"];
  function mark(name) {
    performance2 && performance2["mark"] && performance2["mark"](name);
  }
  function performanceMeasure(name, label) {
    performance2 && performance2["measure"] && performance2["measure"](name, label);
  }
  mark("Zone");
  class ZoneImpl {
    static __symbol__ = __symbol__;
    static assertZonePatched() {
      if (global2["Promise"] !== patches["ZoneAwarePromise"]) {
        throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
      }
    }
    static get root() {
      let zone = ZoneImpl.current;
      while (zone.parent) {
        zone = zone.parent;
      }
      return zone;
    }
    static get current() {
      return _currentZoneFrame.zone;
    }
    static get currentTask() {
      return _currentTask;
    }
    static __load_patch(name, fn, ignoreDuplicate = false) {
      if (patches.hasOwnProperty(name)) {
        const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === true;
        if (!ignoreDuplicate && checkDuplicate) {
          throw Error("Already loaded patch: " + name);
        }
      } else if (!global2["__Zone_disable_" + name]) {
        const perfName = "Zone:" + name;
        mark(perfName);
        patches[name] = fn(global2, ZoneImpl, _api);
        performanceMeasure(perfName, perfName);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    _parent;
    _name;
    _properties;
    _zoneDelegate;
    constructor(parent, zoneSpec) {
      this._parent = parent;
      this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
      this._properties = zoneSpec && zoneSpec.properties || {};
      this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
    }
    get(key) {
      const zone = this.getZoneWith(key);
      if (zone)
        return zone._properties[key];
    }
    getZoneWith(key) {
      let current = this;
      while (current) {
        if (current._properties.hasOwnProperty(key)) {
          return current;
        }
        current = current._parent;
      }
      return null;
    }
    fork(zoneSpec) {
      if (!zoneSpec)
        throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, zoneSpec);
    }
    wrap(callback, source) {
      if (typeof callback !== "function") {
        throw new Error("Expecting function got: " + callback);
      }
      const _callback = this._zoneDelegate.intercept(this, callback, source);
      const zone = this;
      return function() {
        return zone.runGuarded(_callback, this, arguments, source);
      };
    }
    run(callback, applyThis, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runGuarded(callback, applyThis = null, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runTask(task, applyThis, applyArgs) {
      if (task.zone != this) {
        throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      }
      const zoneTask = task;
      const { type, data: { isPeriodic = false, isRefreshable = false } = {} } = task;
      if (task.state === notScheduled && (type === eventTask || type === macroTask)) {
        return;
      }
      const reEntryGuard = task.state != running;
      reEntryGuard && zoneTask._transitionTo(running, scheduled);
      const previousTask = _currentTask;
      _currentTask = zoneTask;
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        if (type == macroTask && task.data && !isPeriodic && !isRefreshable) {
          task.cancelFn = void 0;
        }
        try {
          return this._zoneDelegate.invokeTask(this, zoneTask, applyThis, applyArgs);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        const state = task.state;
        if (state !== notScheduled && state !== unknown) {
          if (type == eventTask || isPeriodic || isRefreshable && state === scheduling) {
            reEntryGuard && zoneTask._transitionTo(scheduled, running, scheduling);
          } else {
            const zoneDelegates = zoneTask._zoneDelegates;
            this._updateTaskCount(zoneTask, -1);
            reEntryGuard && zoneTask._transitionTo(notScheduled, running, notScheduled);
            if (isRefreshable) {
              zoneTask._zoneDelegates = zoneDelegates;
            }
          }
        }
        _currentZoneFrame = _currentZoneFrame.parent;
        _currentTask = previousTask;
      }
    }
    scheduleTask(task) {
      if (task.zone && task.zone !== this) {
        let newZone = this;
        while (newZone) {
          if (newZone === task.zone) {
            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
          }
          newZone = newZone.parent;
        }
      }
      task._transitionTo(scheduling, notScheduled);
      const zoneDelegates = [];
      task._zoneDelegates = zoneDelegates;
      task._zone = this;
      try {
        task = this._zoneDelegate.scheduleTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, scheduling, notScheduled);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      if (task._zoneDelegates === zoneDelegates) {
        this._updateTaskCount(task, 1);
      }
      if (task.state == scheduling) {
        task._transitionTo(scheduled, scheduling);
      }
      return task;
    }
    scheduleMicroTask(source, callback, data, customSchedule) {
      return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
    }
    scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
    }
    scheduleEventTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
    }
    cancelTask(task) {
      if (task.zone != this)
        throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      if (task.state !== scheduled && task.state !== running) {
        return;
      }
      task._transitionTo(canceling, scheduled, running);
      try {
        this._zoneDelegate.cancelTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, canceling);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      this._updateTaskCount(task, -1);
      task._transitionTo(notScheduled, canceling);
      task.runCount = -1;
      return task;
    }
    _updateTaskCount(task, count) {
      const zoneDelegates = task._zoneDelegates;
      if (count == -1) {
        task._zoneDelegates = null;
      }
      for (let i = 0; i < zoneDelegates.length; i++) {
        zoneDelegates[i]._updateTaskCount(task.type, count);
      }
    }
  }
  const DELEGATE_ZS = {
    name: "",
    onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
    onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
    onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
    onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
  };
  class _ZoneDelegate {
    get zone() {
      return this._zone;
    }
    _zone;
    _taskCounts = {
      "microTask": 0,
      "macroTask": 0,
      "eventTask": 0
    };
    _parentDelegate;
    _forkDlgt;
    _forkZS;
    _forkCurrZone;
    _interceptDlgt;
    _interceptZS;
    _interceptCurrZone;
    _invokeDlgt;
    _invokeZS;
    _invokeCurrZone;
    _handleErrorDlgt;
    _handleErrorZS;
    _handleErrorCurrZone;
    _scheduleTaskDlgt;
    _scheduleTaskZS;
    _scheduleTaskCurrZone;
    _invokeTaskDlgt;
    _invokeTaskZS;
    _invokeTaskCurrZone;
    _cancelTaskDlgt;
    _cancelTaskZS;
    _cancelTaskCurrZone;
    _hasTaskDlgt;
    _hasTaskDlgtOwner;
    _hasTaskZS;
    _hasTaskCurrZone;
    constructor(zone, parentDelegate, zoneSpec) {
      this._zone = zone;
      this._parentDelegate = parentDelegate;
      this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
      this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
      this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this._zone : parentDelegate._forkCurrZone);
      this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
      this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
      this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this._zone : parentDelegate._interceptCurrZone);
      this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
      this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
      this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this._zone : parentDelegate._invokeCurrZone);
      this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
      this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
      this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this._zone : parentDelegate._handleErrorCurrZone);
      this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
      this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
      this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this._zone : parentDelegate._scheduleTaskCurrZone);
      this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
      this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
      this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this._zone : parentDelegate._invokeTaskCurrZone);
      this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
      this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
      this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this._zone : parentDelegate._cancelTaskCurrZone);
      this._hasTaskZS = null;
      this._hasTaskDlgt = null;
      this._hasTaskDlgtOwner = null;
      this._hasTaskCurrZone = null;
      const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
      const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
      if (zoneSpecHasTask || parentHasTask) {
        this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
        this._hasTaskDlgt = parentDelegate;
        this._hasTaskDlgtOwner = this;
        this._hasTaskCurrZone = this._zone;
        if (!zoneSpec.onScheduleTask) {
          this._scheduleTaskZS = DELEGATE_ZS;
          this._scheduleTaskDlgt = parentDelegate;
          this._scheduleTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onInvokeTask) {
          this._invokeTaskZS = DELEGATE_ZS;
          this._invokeTaskDlgt = parentDelegate;
          this._invokeTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onCancelTask) {
          this._cancelTaskZS = DELEGATE_ZS;
          this._cancelTaskDlgt = parentDelegate;
          this._cancelTaskCurrZone = this._zone;
        }
      }
    }
    fork(targetZone, zoneSpec) {
      return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new ZoneImpl(targetZone, zoneSpec);
    }
    intercept(targetZone, callback, source) {
      return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
    }
    invoke(targetZone, callback, applyThis, applyArgs, source) {
      return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
    }
    handleError(targetZone, error) {
      return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
    }
    scheduleTask(targetZone, task) {
      let returnTask = task;
      if (this._scheduleTaskZS) {
        if (this._hasTaskZS) {
          returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
        }
        returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
        if (!returnTask)
          returnTask = task;
      } else {
        if (task.scheduleFn) {
          task.scheduleFn(task);
        } else if (task.type == microTask) {
          scheduleMicroTask(task);
        } else {
          throw new Error("Task is missing scheduleFn.");
        }
      }
      return returnTask;
    }
    invokeTask(targetZone, task, applyThis, applyArgs) {
      return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
    }
    cancelTask(targetZone, task) {
      let value;
      if (this._cancelTaskZS) {
        value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
      } else {
        if (!task.cancelFn) {
          throw Error("Task is not cancelable");
        }
        value = task.cancelFn(task);
      }
      return value;
    }
    hasTask(targetZone, isEmpty) {
      try {
        this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
      } catch (err) {
        this.handleError(targetZone, err);
      }
    }
    _updateTaskCount(type, count) {
      const counts = this._taskCounts;
      const prev = counts[type];
      const next = counts[type] = prev + count;
      if (next < 0) {
        throw new Error("More tasks executed then were scheduled.");
      }
      if (prev == 0 || next == 0) {
        const isEmpty = {
          microTask: counts["microTask"] > 0,
          macroTask: counts["macroTask"] > 0,
          eventTask: counts["eventTask"] > 0,
          change: type
        };
        this.hasTask(this._zone, isEmpty);
      }
    }
  }
  class ZoneTask {
    type;
    source;
    invoke;
    callback;
    data;
    scheduleFn;
    cancelFn;
    _zone = null;
    runCount = 0;
    _zoneDelegates = null;
    _state = "notScheduled";
    constructor(type, source, callback, options, scheduleFn, cancelFn) {
      this.type = type;
      this.source = source;
      this.data = options;
      this.scheduleFn = scheduleFn;
      this.cancelFn = cancelFn;
      if (!callback) {
        throw new Error("callback is not defined");
      }
      this.callback = callback;
      const self2 = this;
      if (type === eventTask && options && options.useG) {
        this.invoke = ZoneTask.invokeTask;
      } else {
        this.invoke = function() {
          return ZoneTask.invokeTask.call(global2, self2, this, arguments);
        };
      }
    }
    static invokeTask(task, target, args) {
      if (!task) {
        task = this;
      }
      _numberOfNestedTaskFrames++;
      try {
        task.runCount++;
        return task.zone.runTask(task, target, args);
      } finally {
        if (_numberOfNestedTaskFrames == 1) {
          drainMicroTaskQueue();
        }
        _numberOfNestedTaskFrames--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(notScheduled, scheduling);
    }
    _transitionTo(toState, fromState1, fromState2) {
      if (this._state === fromState1 || this._state === fromState2) {
        this._state = toState;
        if (toState == notScheduled) {
          this._zoneDelegates = null;
        }
      } else {
        throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
      }
    }
    toString() {
      if (this.data && typeof this.data.handleId !== "undefined") {
        return this.data.handleId.toString();
      } else {
        return Object.prototype.toString.call(this);
      }
    }
    // add toJSON method to prevent cyclic error when
    // call JSON.stringify(zoneTask)
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount
      };
    }
  }
  const symbolSetTimeout = __symbol__("setTimeout");
  const symbolPromise = __symbol__("Promise");
  const symbolThen = __symbol__("then");
  let _microTaskQueue = [];
  let _isDrainingMicrotaskQueue = false;
  let nativeMicroTaskQueuePromise;
  function nativeScheduleMicroTask(func) {
    if (!nativeMicroTaskQueuePromise) {
      if (global2[symbolPromise]) {
        nativeMicroTaskQueuePromise = global2[symbolPromise].resolve(0);
      }
    }
    if (nativeMicroTaskQueuePromise) {
      let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
      if (!nativeThen) {
        nativeThen = nativeMicroTaskQueuePromise["then"];
      }
      nativeThen.call(nativeMicroTaskQueuePromise, func);
    } else {
      global2[symbolSetTimeout](func, 0);
    }
  }
  function scheduleMicroTask(task) {
    if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
      nativeScheduleMicroTask(drainMicroTaskQueue);
    }
    task && _microTaskQueue.push(task);
  }
  function drainMicroTaskQueue() {
    if (!_isDrainingMicrotaskQueue) {
      _isDrainingMicrotaskQueue = true;
      while (_microTaskQueue.length) {
        const queue = _microTaskQueue;
        _microTaskQueue = [];
        for (let i = 0; i < queue.length; i++) {
          const task = queue[i];
          try {
            task.zone.runTask(task, null, null);
          } catch (error) {
            _api.onUnhandledError(error);
          }
        }
      }
      _api.microtaskDrainDone();
      _isDrainingMicrotaskQueue = false;
    }
  }
  const NO_ZONE = { name: "NO ZONE" };
  const notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
  const microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
  const patches = {};
  const _api = {
    symbol: __symbol__,
    currentZoneFrame: () => _currentZoneFrame,
    onUnhandledError: noop,
    microtaskDrainDone: noop,
    scheduleMicroTask,
    showUncaughtError: () => !ZoneImpl[__symbol__("ignoreConsoleErrorUncaughtError")],
    patchEventTarget: () => [],
    patchOnProperties: noop,
    patchMethod: () => noop,
    bindArguments: () => [],
    patchThen: () => noop,
    patchMacroTask: () => noop,
    patchEventPrototype: () => noop,
    isIEOrEdge: () => false,
    getGlobalObjects: () => void 0,
    ObjectDefineProperty: () => noop,
    ObjectGetOwnPropertyDescriptor: () => void 0,
    ObjectCreate: () => void 0,
    ArraySlice: () => [],
    patchClass: () => noop,
    wrapWithCurrentZone: () => noop,
    filterProperties: () => [],
    attachOriginToPatched: () => noop,
    _redefineProperty: () => noop,
    patchCallbacks: () => noop,
    nativeScheduleMicroTask
  };
  let _currentZoneFrame = { parent: null, zone: new ZoneImpl(null, null) };
  let _currentTask = null;
  let _numberOfNestedTaskFrames = 0;
  function noop() {
  }
  performanceMeasure("Zone", "Zone");
  return ZoneImpl;
}
function loadZone() {
  const global3 = globalThis;
  const checkDuplicate = global3[__symbol__("forceDuplicateZoneCheck")] === true;
  if (global3["Zone"] && (checkDuplicate || typeof global3["Zone"].__symbol__ !== "function")) {
    throw new Error("Zone already loaded.");
  }
  global3["Zone"] ??= initZone();
  return global3["Zone"];
}
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectDefineProperty = Object.defineProperty;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectCreate = Object.create;
var ArraySlice = Array.prototype.slice;
var ADD_EVENT_LISTENER_STR = "addEventListener";
var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
var ZONE_SYMBOL_ADD_EVENT_LISTENER = __symbol__(ADD_EVENT_LISTENER_STR);
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = __symbol__(REMOVE_EVENT_LISTENER_STR);
var TRUE_STR = "true";
var FALSE_STR = "false";
var ZONE_SYMBOL_PREFIX = __symbol__("");
function wrapWithCurrentZone(callback, source) {
  return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
  return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = __symbol__;
var isWindowExists = typeof window !== "undefined";
var internalWindow = isWindowExists ? window : void 0;
var _global2 = isWindowExists && internalWindow || globalThis;
var REMOVE_ATTRIBUTE = "removeAttribute";
function bindArguments(args, source) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] === "function") {
      args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
    }
  }
  return args;
}
function patchPrototype(prototype, fnNames) {
  const source = prototype.constructor["name"];
  for (let i = 0; i < fnNames.length; i++) {
    const name = fnNames[i];
    const delegate = prototype[name];
    if (delegate) {
      const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
      if (!isPropertyWritable(prototypeDesc)) {
        continue;
      }
      prototype[name] = ((delegate2) => {
        const patched = function() {
          return delegate2.apply(this, bindArguments(arguments, source + "." + name));
        };
        attachOriginToPatched(patched, delegate2);
        return patched;
      })(delegate);
    }
  }
}
function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }
  if (propertyDesc.writable === false) {
    return false;
  }
  return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
}
var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isNode = !("nw" in _global2) && typeof _global2.process !== "undefined" && _global2.process.toString() === "[object process]";
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var isMix = typeof _global2.process !== "undefined" && _global2.process.toString() === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var zoneSymbolEventNames$1 = {};
var enableBeforeunloadSymbol = zoneSymbol("enable_beforeunload");
var wrapFn = function(event) {
  event = event || _global2.event;
  if (!event) {
    return;
  }
  let eventNameSymbol = zoneSymbolEventNames$1[event.type];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
  }
  const target = this || event.target || _global2;
  const listener = target[eventNameSymbol];
  let result;
  if (isBrowser && target === internalWindow && event.type === "error") {
    const errorEvent = event;
    result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
    if (result === true) {
      event.preventDefault();
    }
  } else {
    result = listener && listener.apply(this, arguments);
    if (
      // https://github.com/angular/angular/issues/47579
      // https://www.w3.org/TR/2011/WD-html5-20110525/history.html#beforeunloadevent
      // This is the only specific case we should check for. The spec defines that the
      // `returnValue` attribute represents the message to show the user. When the event
      // is created, this attribute must be set to the empty string.
      event.type === "beforeunload" && // To prevent any breaking changes resulting from this change, given that
      // it was already causing a significant number of failures in G3, we have hidden
      // that behavior behind a global configuration flag. Consumers can enable this
      // flag explicitly if they want the `beforeunload` event to be handled as defined
      // in the specification.
      _global2[enableBeforeunloadSymbol] && // The IDL event definition is `attribute DOMString returnValue`, so we check whether
      // `typeof result` is a string.
      typeof result === "string"
    ) {
      event.returnValue = result;
    } else if (result != void 0 && !result) {
      event.preventDefault();
    }
  }
  return result;
};
function patchProperty(obj, prop, prototype) {
  let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
  if (!desc && prototype) {
    const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
    if (prototypeDesc) {
      desc = { enumerable: true, configurable: true };
    }
  }
  if (!desc || !desc.configurable) {
    return;
  }
  const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
  if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
    return;
  }
  delete desc.writable;
  delete desc.value;
  const originalDescGet = desc.get;
  const originalDescSet = desc.set;
  const eventName = prop.slice(2);
  let eventNameSymbol = zoneSymbolEventNames$1[eventName];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
  }
  desc.set = function(newValue) {
    let target = this;
    if (!target && obj === _global2) {
      target = _global2;
    }
    if (!target) {
      return;
    }
    const previousValue = target[eventNameSymbol];
    if (typeof previousValue === "function") {
      target.removeEventListener(eventName, wrapFn);
    }
    originalDescSet?.call(target, null);
    target[eventNameSymbol] = newValue;
    if (typeof newValue === "function") {
      target.addEventListener(eventName, wrapFn, false);
    }
  };
  desc.get = function() {
    let target = this;
    if (!target && obj === _global2) {
      target = _global2;
    }
    if (!target) {
      return null;
    }
    const listener = target[eventNameSymbol];
    if (listener) {
      return listener;
    } else if (originalDescGet) {
      let value = originalDescGet.call(this);
      if (value) {
        desc.set.call(this, value);
        if (typeof target[REMOVE_ATTRIBUTE] === "function") {
          target.removeAttribute(prop);
        }
        return value;
      }
    }
    return null;
  };
  ObjectDefineProperty(obj, prop, desc);
  obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
  if (properties) {
    for (let i = 0; i < properties.length; i++) {
      patchProperty(obj, "on" + properties[i], prototype);
    }
  } else {
    const onProperties = [];
    for (const prop in obj) {
      if (prop.slice(0, 2) == "on") {
        onProperties.push(prop);
      }
    }
    for (let j = 0; j < onProperties.length; j++) {
      patchProperty(obj, onProperties[j], prototype);
    }
  }
}
var originalInstanceKey = zoneSymbol("originalInstance");
function patchClass(className) {
  const OriginalClass = _global2[className];
  if (!OriginalClass)
    return;
  _global2[zoneSymbol(className)] = OriginalClass;
  _global2[className] = function() {
    const a = bindArguments(arguments, className);
    switch (a.length) {
      case 0:
        this[originalInstanceKey] = new OriginalClass();
        break;
      case 1:
        this[originalInstanceKey] = new OriginalClass(a[0]);
        break;
      case 2:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
        break;
      case 3:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
        break;
      case 4:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
        break;
      default:
        throw new Error("Arg list too long.");
    }
  };
  attachOriginToPatched(_global2[className], OriginalClass);
  const instance = new OriginalClass(function() {
  });
  let prop;
  for (prop in instance) {
    if (className === "XMLHttpRequest" && prop === "responseBlob")
      continue;
    (function(prop2) {
      if (typeof instance[prop2] === "function") {
        _global2[className].prototype[prop2] = function() {
          return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
        };
      } else {
        ObjectDefineProperty(_global2[className].prototype, prop2, {
          set: function(fn) {
            if (typeof fn === "function") {
              this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
              attachOriginToPatched(this[originalInstanceKey][prop2], fn);
            } else {
              this[originalInstanceKey][prop2] = fn;
            }
          },
          get: function() {
            return this[originalInstanceKey][prop2];
          }
        });
      }
    })(prop);
  }
  for (prop in OriginalClass) {
    if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
      _global2[className][prop] = OriginalClass[prop];
    }
  }
}
function patchMethod(target, name, patchFn) {
  let proto = target;
  while (proto && !proto.hasOwnProperty(name)) {
    proto = ObjectGetPrototypeOf(proto);
  }
  if (!proto && target[name]) {
    proto = target;
  }
  const delegateName = zoneSymbol(name);
  let delegate = null;
  if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
    delegate = proto[delegateName] = proto[name];
    const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
    if (isPropertyWritable(desc)) {
      const patchDelegate = patchFn(delegate, delegateName, name);
      proto[name] = function() {
        return patchDelegate(this, arguments);
      };
      attachOriginToPatched(proto[name], delegate);
    }
  }
  return delegate;
}
function patchMacroTask(obj, funcName, metaCreator) {
  let setNative = null;
  function scheduleTask(task) {
    const data = task.data;
    data.args[data.cbIdx] = function() {
      task.invoke.apply(this, arguments);
    };
    setNative.apply(data.target, data.args);
    return task;
  }
  setNative = patchMethod(obj, funcName, (delegate) => function(self2, args) {
    const meta = metaCreator(self2, args);
    if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
      return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
    } else {
      return delegate.apply(self2, args);
    }
  });
}
function attachOriginToPatched(patched, original) {
  patched[zoneSymbol("OriginalDelegate")] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIEOrEdge() {
  if (isDetectedIEOrEdge) {
    return ieOrEdge;
  }
  isDetectedIEOrEdge = true;
  try {
    const ua = internalWindow.navigator.userAgent;
    if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1 || ua.indexOf("Edge/") !== -1) {
      ieOrEdge = true;
    }
  } catch (error) {
  }
  return ieOrEdge;
}
function isFunction(value) {
  return typeof value === "function";
}
function isNumber(value) {
  return typeof value === "number";
}
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
  useG: true
};
var zoneSymbolEventNames = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$");
var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
function prepareEventNames(eventName, eventNameToString) {
  const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
  const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
  const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
  const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
  zoneSymbolEventNames[eventName] = {};
  zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
  zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global3, api, apis, patchOptions) {
  const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
  const REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
  const LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
  const REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
  const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
  const ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
  const PREPEND_EVENT_LISTENER = "prependListener";
  const PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
  const invokeTask = function(task, target, event) {
    if (task.isRemoved) {
      return;
    }
    const delegate = task.callback;
    if (typeof delegate === "object" && delegate.handleEvent) {
      task.callback = (event2) => delegate.handleEvent(event2);
      task.originalDelegate = delegate;
    }
    let error;
    try {
      task.invoke(task, target, [event]);
    } catch (err) {
      error = err;
    }
    const options = task.options;
    if (options && typeof options === "object" && options.once) {
      const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
      target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
    }
    return error;
  };
  function globalCallback(context, event, isCapture) {
    event = event || _global3.event;
    if (!event) {
      return;
    }
    const target = context || event.target || _global3;
    const tasks = target[zoneSymbolEventNames[event.type][isCapture ? TRUE_STR : FALSE_STR]];
    if (tasks) {
      const errors = [];
      if (tasks.length === 1) {
        const err = invokeTask(tasks[0], target, event);
        err && errors.push(err);
      } else {
        const copyTasks = tasks.slice();
        for (let i = 0; i < copyTasks.length; i++) {
          if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
            break;
          }
          const err = invokeTask(copyTasks[i], target, event);
          err && errors.push(err);
        }
      }
      if (errors.length === 1) {
        throw errors[0];
      } else {
        for (let i = 0; i < errors.length; i++) {
          const err = errors[i];
          api.nativeScheduleMicroTask(() => {
            throw err;
          });
        }
      }
    }
  }
  const globalZoneAwareCallback = function(event) {
    return globalCallback(this, event, false);
  };
  const globalZoneAwareCaptureCallback = function(event) {
    return globalCallback(this, event, true);
  };
  function patchEventTargetMethods(obj, patchOptions2) {
    if (!obj) {
      return false;
    }
    let useGlobalCallback = true;
    if (patchOptions2 && patchOptions2.useG !== void 0) {
      useGlobalCallback = patchOptions2.useG;
    }
    const validateHandler = patchOptions2 && patchOptions2.vh;
    let checkDuplicate = true;
    if (patchOptions2 && patchOptions2.chkDup !== void 0) {
      checkDuplicate = patchOptions2.chkDup;
    }
    let returnTarget = false;
    if (patchOptions2 && patchOptions2.rt !== void 0) {
      returnTarget = patchOptions2.rt;
    }
    let proto = obj;
    while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
      proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && obj[ADD_EVENT_LISTENER]) {
      proto = obj;
    }
    if (!proto) {
      return false;
    }
    if (proto[zoneSymbolAddEventListener]) {
      return false;
    }
    const eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
    const taskData = {};
    const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
    const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
    const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
    const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
    let nativePrependEventListener;
    if (patchOptions2 && patchOptions2.prepend) {
      nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
    }
    function buildEventListenerOptions(options, passive) {
      if (!passive) {
        return options;
      }
      if (typeof options === "boolean") {
        return { capture: options, passive: true };
      }
      if (!options) {
        return { passive: true };
      }
      if (typeof options === "object" && options.passive !== false) {
        return __spreadProps(__spreadValues({}, options), { passive: true });
      }
      return options;
    }
    const customScheduleGlobal = function(task) {
      if (taskData.isExisting) {
        return;
      }
      return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
    };
    const customCancelGlobal = function(task) {
      if (!task.isRemoved) {
        const symbolEventNames = zoneSymbolEventNames[task.eventName];
        let symbolEventName;
        if (symbolEventNames) {
          symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
        }
        const existingTasks = symbolEventName && task.target[symbolEventName];
        if (existingTasks) {
          for (let i = 0; i < existingTasks.length; i++) {
            const existingTask = existingTasks[i];
            if (existingTask === task) {
              existingTasks.splice(i, 1);
              task.isRemoved = true;
              if (task.removeAbortListener) {
                task.removeAbortListener();
                task.removeAbortListener = null;
              }
              if (existingTasks.length === 0) {
                task.allRemoved = true;
                task.target[symbolEventName] = null;
              }
              break;
            }
          }
        }
      }
      if (!task.allRemoved) {
        return;
      }
      return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
    };
    const customScheduleNonGlobal = function(task) {
      return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customSchedulePrepend = function(task) {
      return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customCancelNonGlobal = function(task) {
      return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
    };
    const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
    const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
    const compareTaskCallbackVsDelegate = function(task, delegate) {
      const typeOfDelegate = typeof delegate;
      return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
    };
    const compare = patchOptions2?.diff || compareTaskCallbackVsDelegate;
    const unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")];
    const passiveEvents = _global3[zoneSymbol("PASSIVE_EVENTS")];
    function copyEventListenerOptions(options) {
      if (typeof options === "object" && options !== null) {
        const newOptions = __spreadValues({}, options);
        if (options.signal) {
          newOptions.signal = options.signal;
        }
        return newOptions;
      }
      return options;
    }
    const makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = false, prepend = false) {
      return function() {
        const target = this || _global3;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        let delegate = arguments[1];
        if (!delegate) {
          return nativeListener.apply(this, arguments);
        }
        if (isNode && eventName === "uncaughtException") {
          return nativeListener.apply(this, arguments);
        }
        let isEventListenerObject = false;
        if (typeof delegate !== "function") {
          if (!delegate.handleEvent) {
            return nativeListener.apply(this, arguments);
          }
          isEventListenerObject = true;
        }
        if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
          return;
        }
        const passive = !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
        const options = copyEventListenerOptions(buildEventListenerOptions(arguments[2], passive));
        const signal = options?.signal;
        if (signal?.aborted) {
          return;
        }
        if (unpatchedEvents) {
          for (let i = 0; i < unpatchedEvents.length; i++) {
            if (eventName === unpatchedEvents[i]) {
              if (passive) {
                return nativeListener.call(target, eventName, delegate, options);
              } else {
                return nativeListener.apply(this, arguments);
              }
            }
          }
        }
        const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
        const once = options && typeof options === "object" ? options.once : false;
        const zone = Zone.current;
        let symbolEventNames = zoneSymbolEventNames[eventName];
        if (!symbolEventNames) {
          prepareEventNames(eventName, eventNameToString);
          symbolEventNames = zoneSymbolEventNames[eventName];
        }
        const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        let existingTasks = target[symbolEventName];
        let isExisting = false;
        if (existingTasks) {
          isExisting = true;
          if (checkDuplicate) {
            for (let i = 0; i < existingTasks.length; i++) {
              if (compare(existingTasks[i], delegate)) {
                return;
              }
            }
          }
        } else {
          existingTasks = target[symbolEventName] = [];
        }
        let source;
        const constructorName = target.constructor["name"];
        const targetSource = globalSources[constructorName];
        if (targetSource) {
          source = targetSource[eventName];
        }
        if (!source) {
          source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
        }
        taskData.options = options;
        if (once) {
          taskData.options.once = false;
        }
        taskData.target = target;
        taskData.capture = capture;
        taskData.eventName = eventName;
        taskData.isExisting = isExisting;
        const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
        if (data) {
          data.taskData = taskData;
        }
        if (signal) {
          taskData.options.signal = void 0;
        }
        const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
        if (signal) {
          taskData.options.signal = signal;
          const onAbort = () => task.zone.cancelTask(task);
          nativeListener.call(signal, "abort", onAbort, { once: true });
          task.removeAbortListener = () => signal.removeEventListener("abort", onAbort);
        }
        taskData.target = null;
        if (data) {
          data.taskData = null;
        }
        if (once) {
          taskData.options.once = true;
        }
        if (typeof task.options !== "boolean") {
          task.options = options;
        }
        task.target = target;
        task.capture = capture;
        task.eventName = eventName;
        if (isEventListenerObject) {
          task.originalDelegate = delegate;
        }
        if (!prepend) {
          existingTasks.push(task);
        } else {
          existingTasks.unshift(task);
        }
        if (returnTarget2) {
          return target;
        }
      };
    };
    proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
    if (nativePrependEventListener) {
      proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
    }
    proto[REMOVE_EVENT_LISTENER] = function() {
      const target = this || _global3;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const options = arguments[2];
      const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
      const delegate = arguments[1];
      if (!delegate) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
        return;
      }
      const symbolEventNames = zoneSymbolEventNames[eventName];
      let symbolEventName;
      if (symbolEventNames) {
        symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
      }
      const existingTasks = symbolEventName && target[symbolEventName];
      if (existingTasks) {
        for (let i = 0; i < existingTasks.length; i++) {
          const existingTask = existingTasks[i];
          if (compare(existingTask, delegate)) {
            existingTasks.splice(i, 1);
            existingTask.isRemoved = true;
            if (existingTasks.length === 0) {
              existingTask.allRemoved = true;
              target[symbolEventName] = null;
              if (!capture && typeof eventName === "string") {
                const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                target[onPropertySymbol] = null;
              }
            }
            existingTask.zone.cancelTask(existingTask);
            if (returnTarget) {
              return target;
            }
            return;
          }
        }
      }
      return nativeRemoveEventListener.apply(this, arguments);
    };
    proto[LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global3;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const listeners = [];
      const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
        listeners.push(delegate);
      }
      return listeners;
    };
    proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global3;
      let eventName = arguments[0];
      if (!eventName) {
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
          const prop = keys[i];
          const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
          let evtName = match && match[1];
          if (evtName && evtName !== "removeListener") {
            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
          }
        }
        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
      } else {
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const symbolEventNames = zoneSymbolEventNames[eventName];
        if (symbolEventNames) {
          const symbolEventName = symbolEventNames[FALSE_STR];
          const symbolCaptureEventName = symbolEventNames[TRUE_STR];
          const tasks = target[symbolEventName];
          const captureTasks = target[symbolCaptureEventName];
          if (tasks) {
            const removeTasks = tasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
          if (captureTasks) {
            const removeTasks = captureTasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
        }
      }
      if (returnTarget) {
        return this;
      }
    };
    attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
    attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
    if (nativeRemoveAllListeners) {
      attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
    }
    if (nativeListeners) {
      attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
    }
    return true;
  }
  let results = [];
  for (let i = 0; i < apis.length; i++) {
    results[i] = patchEventTargetMethods(apis[i], patchOptions);
  }
  return results;
}
function findEventTasks(target, eventName) {
  if (!eventName) {
    const foundTasks = [];
    for (let prop in target) {
      const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
      let evtName = match && match[1];
      if (evtName && (!eventName || evtName === eventName)) {
        const tasks = target[prop];
        if (tasks) {
          for (let i = 0; i < tasks.length; i++) {
            foundTasks.push(tasks[i]);
          }
        }
      }
    }
    return foundTasks;
  }
  let symbolEventName = zoneSymbolEventNames[eventName];
  if (!symbolEventName) {
    prepareEventNames(eventName);
    symbolEventName = zoneSymbolEventNames[eventName];
  }
  const captureFalseTasks = target[symbolEventName[FALSE_STR]];
  const captureTrueTasks = target[symbolEventName[TRUE_STR]];
  if (!captureFalseTasks) {
    return captureTrueTasks ? captureTrueTasks.slice() : [];
  } else {
    return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
  }
}
function patchEventPrototype(global3, api) {
  const Event = global3["Event"];
  if (Event && Event.prototype) {
    api.patchMethod(Event.prototype, "stopImmediatePropagation", (delegate) => function(self2, args) {
      self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
      delegate && delegate.apply(self2, args);
    });
  }
}
function patchQueueMicrotask(global3, api) {
  api.patchMethod(global3, "queueMicrotask", (delegate) => {
    return function(self2, args) {
      Zone.current.scheduleMicroTask("queueMicrotask", args[0]);
    };
  });
}
var taskSymbol = zoneSymbol("zoneTask");
function patchTimer(window2, setName, cancelName, nameSuffix) {
  let setNative = null;
  let clearNative = null;
  setName += nameSuffix;
  cancelName += nameSuffix;
  const tasksByHandleId = {};
  function scheduleTask(task) {
    const data = task.data;
    data.args[0] = function() {
      return task.invoke.apply(this, arguments);
    };
    const handleOrId = setNative.apply(window2, data.args);
    if (isNumber(handleOrId)) {
      data.handleId = handleOrId;
    } else {
      data.handle = handleOrId;
      data.isRefreshable = isFunction(handleOrId.refresh);
    }
    return task;
  }
  function clearTask(task) {
    const { handle, handleId } = task.data;
    return clearNative.call(window2, handle ?? handleId);
  }
  setNative = patchMethod(window2, setName, (delegate) => function(self2, args) {
    if (isFunction(args[0])) {
      const options = {
        isRefreshable: false,
        isPeriodic: nameSuffix === "Interval",
        delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
        args
      };
      const callback = args[0];
      args[0] = function timer() {
        try {
          return callback.apply(this, arguments);
        } finally {
          const { handle: handle2, handleId: handleId2, isPeriodic: isPeriodic2, isRefreshable: isRefreshable2 } = options;
          if (!isPeriodic2 && !isRefreshable2) {
            if (handleId2) {
              delete tasksByHandleId[handleId2];
            } else if (handle2) {
              handle2[taskSymbol] = null;
            }
          }
        }
      };
      const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
      if (!task) {
        return task;
      }
      const { handleId, handle, isRefreshable, isPeriodic } = task.data;
      if (handleId) {
        tasksByHandleId[handleId] = task;
      } else if (handle) {
        handle[taskSymbol] = task;
        if (isRefreshable && !isPeriodic) {
          const originalRefresh = handle.refresh;
          handle.refresh = function() {
            const { zone, state } = task;
            if (state === "notScheduled") {
              task._state = "scheduled";
              zone._updateTaskCount(task, 1);
            } else if (state === "running") {
              task._state = "scheduling";
            }
            return originalRefresh.call(this);
          };
        }
      }
      return handle ?? handleId ?? task;
    } else {
      return delegate.apply(window2, args);
    }
  });
  clearNative = patchMethod(window2, cancelName, (delegate) => function(self2, args) {
    const id = args[0];
    let task;
    if (isNumber(id)) {
      task = tasksByHandleId[id];
      delete tasksByHandleId[id];
    } else {
      task = id?.[taskSymbol];
      if (task) {
        id[taskSymbol] = null;
      } else {
        task = id;
      }
    }
    if (task?.type) {
      if (task.cancelFn) {
        task.zone.cancelTask(task);
      }
    } else {
      delegate.apply(window2, args);
    }
  });
}
function patchCustomElements(_global3, api) {
  const { isBrowser: isBrowser2, isMix: isMix2 } = api.getGlobalObjects();
  if (!isBrowser2 && !isMix2 || !_global3["customElements"] || !("customElements" in _global3)) {
    return;
  }
  const callbacks = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback",
    "formAssociatedCallback",
    "formDisabledCallback",
    "formResetCallback",
    "formStateRestoreCallback"
  ];
  api.patchCallbacks(api, _global3.customElements, "customElements", "define", callbacks);
}
function eventTargetPatch(_global3, api) {
  if (Zone[api.symbol("patchEventTarget")]) {
    return;
  }
  const { eventNames, zoneSymbolEventNames: zoneSymbolEventNames2, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2 } = api.getGlobalObjects();
  for (let i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    const falseEventName = eventName + FALSE_STR2;
    const trueEventName = eventName + TRUE_STR2;
    const symbol = ZONE_SYMBOL_PREFIX2 + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
    zoneSymbolEventNames2[eventName] = {};
    zoneSymbolEventNames2[eventName][FALSE_STR2] = symbol;
    zoneSymbolEventNames2[eventName][TRUE_STR2] = symbolCapture;
  }
  const EVENT_TARGET = _global3["EventTarget"];
  if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
    return;
  }
  api.patchEventTarget(_global3, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
  return true;
}
function patchEvent(global3, api) {
  api.patchEventPrototype(global3, api);
}
function filterProperties(target, onProperties, ignoreProperties) {
  if (!ignoreProperties || ignoreProperties.length === 0) {
    return onProperties;
  }
  const tip = ignoreProperties.filter((ip) => ip.target === target);
  if (tip.length === 0) {
    return onProperties;
  }
  const targetIgnoreProperties = tip[0].ignoreProperties;
  return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
  if (!target) {
    return;
  }
  const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
  patchOnProperties(target, filteredProperties, prototype);
}
function getOnEventNames(target) {
  return Object.getOwnPropertyNames(target).filter((name) => name.startsWith("on") && name.length > 2).map((name) => name.substring(2));
}
function propertyDescriptorPatch(api, _global3) {
  if (isNode && !isMix) {
    return;
  }
  if (Zone[api.symbol("patchEvents")]) {
    return;
  }
  const ignoreProperties = _global3["__Zone_ignore_on_properties"];
  let patchTargets = [];
  if (isBrowser) {
    const internalWindow2 = window;
    patchTargets = patchTargets.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker"
    ]);
    const ignoreErrorProperties = [];
    patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
  }
  patchTargets = patchTargets.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket"
  ]);
  for (let i = 0; i < patchTargets.length; i++) {
    const target = _global3[patchTargets[i]];
    target?.prototype && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
  }
}
function patchBrowser(Zone2) {
  Zone2.__load_patch("legacy", (global3) => {
    const legacyPatch = global3[Zone2.__symbol__("legacyPatch")];
    if (legacyPatch) {
      legacyPatch();
    }
  });
  Zone2.__load_patch("timers", (global3) => {
    const set = "set";
    const clear = "clear";
    patchTimer(global3, set, clear, "Timeout");
    patchTimer(global3, set, clear, "Interval");
    patchTimer(global3, set, clear, "Immediate");
  });
  Zone2.__load_patch("requestAnimationFrame", (global3) => {
    patchTimer(global3, "request", "cancel", "AnimationFrame");
    patchTimer(global3, "mozRequest", "mozCancel", "AnimationFrame");
    patchTimer(global3, "webkitRequest", "webkitCancel", "AnimationFrame");
  });
  Zone2.__load_patch("blocking", (global3, Zone3) => {
    const blockingMethods = ["alert", "prompt", "confirm"];
    for (let i = 0; i < blockingMethods.length; i++) {
      const name = blockingMethods[i];
      patchMethod(global3, name, (delegate, symbol, name2) => {
        return function(s, args) {
          return Zone3.current.run(delegate, global3, args, name2);
        };
      });
    }
  });
  Zone2.__load_patch("EventTarget", (global3, Zone3, api) => {
    patchEvent(global3, api);
    eventTargetPatch(global3, api);
    const XMLHttpRequestEventTarget = global3["XMLHttpRequestEventTarget"];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
      api.patchEventTarget(global3, api, [XMLHttpRequestEventTarget.prototype]);
    }
  });
  Zone2.__load_patch("MutationObserver", (global3, Zone3, api) => {
    patchClass("MutationObserver");
    patchClass("WebKitMutationObserver");
  });
  Zone2.__load_patch("IntersectionObserver", (global3, Zone3, api) => {
    patchClass("IntersectionObserver");
  });
  Zone2.__load_patch("FileReader", (global3, Zone3, api) => {
    patchClass("FileReader");
  });
  Zone2.__load_patch("on_property", (global3, Zone3, api) => {
    propertyDescriptorPatch(api, global3);
  });
  Zone2.__load_patch("customElements", (global3, Zone3, api) => {
    patchCustomElements(global3, api);
  });
  Zone2.__load_patch("XHR", (global3, Zone3) => {
    patchXHR(global3);
    const XHR_TASK = zoneSymbol("xhrTask");
    const XHR_SYNC = zoneSymbol("xhrSync");
    const XHR_LISTENER = zoneSymbol("xhrListener");
    const XHR_SCHEDULED = zoneSymbol("xhrScheduled");
    const XHR_URL = zoneSymbol("xhrURL");
    const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
    function patchXHR(window2) {
      const XMLHttpRequest2 = window2["XMLHttpRequest"];
      if (!XMLHttpRequest2) {
        return;
      }
      const XMLHttpRequestPrototype = XMLHttpRequest2.prototype;
      function findPendingTask(target) {
        return target[XHR_TASK];
      }
      let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
      let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      if (!oriAddListener) {
        const XMLHttpRequestEventTarget = window2["XMLHttpRequestEventTarget"];
        if (XMLHttpRequestEventTarget) {
          const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
          oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
      }
      const READY_STATE_CHANGE = "readystatechange";
      const SCHEDULED = "scheduled";
      function scheduleTask(task) {
        const data = task.data;
        const target = data.target;
        target[XHR_SCHEDULED] = false;
        target[XHR_ERROR_BEFORE_SCHEDULED] = false;
        const listener = target[XHR_LISTENER];
        if (!oriAddListener) {
          oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
        if (listener) {
          oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
        }
        const newListener = target[XHR_LISTENER] = () => {
          if (target.readyState === target.DONE) {
            if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
              const loadTasks = target[Zone3.__symbol__("loadfalse")];
              if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                const oriInvoke = task.invoke;
                task.invoke = function() {
                  const loadTasks2 = target[Zone3.__symbol__("loadfalse")];
                  for (let i = 0; i < loadTasks2.length; i++) {
                    if (loadTasks2[i] === task) {
                      loadTasks2.splice(i, 1);
                    }
                  }
                  if (!data.aborted && task.state === SCHEDULED) {
                    oriInvoke.call(task);
                  }
                };
                loadTasks.push(task);
              } else {
                task.invoke();
              }
            } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
              target[XHR_ERROR_BEFORE_SCHEDULED] = true;
            }
          }
        };
        oriAddListener.call(target, READY_STATE_CHANGE, newListener);
        const storedTask = target[XHR_TASK];
        if (!storedTask) {
          target[XHR_TASK] = task;
        }
        sendNative.apply(target, data.args);
        target[XHR_SCHEDULED] = true;
        return task;
      }
      function placeholderCallback() {
      }
      function clearTask(task) {
        const data = task.data;
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
      }
      const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
        self2[XHR_SYNC] = args[2] == false;
        self2[XHR_URL] = args[1];
        return openNative.apply(self2, args);
      });
      const XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
      const fetchTaskAborting = zoneSymbol("fetchTaskAborting");
      const fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
      const sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
        if (Zone3.current[fetchTaskScheduling] === true) {
          return sendNative.apply(self2, args);
        }
        if (self2[XHR_SYNC]) {
          return sendNative.apply(self2, args);
        } else {
          const options = {
            target: self2,
            url: self2[XHR_URL],
            isPeriodic: false,
            args,
            aborted: false
          };
          const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
          if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
            task.invoke();
          }
        }
      });
      const abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
        const task = findPendingTask(self2);
        if (task && typeof task.type == "string") {
          if (task.cancelFn == null || task.data && task.data.aborted) {
            return;
          }
          task.zone.cancelTask(task);
        } else if (Zone3.current[fetchTaskAborting] === true) {
          return abortNative.apply(self2, args);
        }
      });
    }
  });
  Zone2.__load_patch("geolocation", (global3) => {
    if (global3["navigator"] && global3["navigator"].geolocation) {
      patchPrototype(global3["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
    }
  });
  Zone2.__load_patch("PromiseRejectionEvent", (global3, Zone3) => {
    function findPromiseRejectionHandler(evtName) {
      return function(e) {
        const eventTasks = findEventTasks(global3, evtName);
        eventTasks.forEach((eventTask) => {
          const PromiseRejectionEvent = global3["PromiseRejectionEvent"];
          if (PromiseRejectionEvent) {
            const evt = new PromiseRejectionEvent(evtName, {
              promise: e.promise,
              reason: e.rejection
            });
            eventTask.invoke(evt);
          }
        });
      };
    }
    if (global3["PromiseRejectionEvent"]) {
      Zone3[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
      Zone3[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
    }
  });
  Zone2.__load_patch("queueMicrotask", (global3, Zone3, api) => {
    patchQueueMicrotask(global3, api);
  });
}
function patchPromise(Zone2) {
  Zone2.__load_patch("ZoneAwarePromise", (global3, Zone3, api) => {
    const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    const ObjectDefineProperty2 = Object.defineProperty;
    function readableObjectToString(obj) {
      if (obj && obj.toString === Object.prototype.toString) {
        const className = obj.constructor && obj.constructor.name;
        return (className ? className : "") + ": " + JSON.stringify(obj);
      }
      return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    const __symbol__3 = api.symbol;
    const _uncaughtPromiseErrors = [];
    const isDisableWrappingUncaughtPromiseRejection = global3[__symbol__3("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== false;
    const symbolPromise = __symbol__3("Promise");
    const symbolThen = __symbol__3("then");
    const creationTrace = "__creationTrace__";
    api.onUnhandledError = (e) => {
      if (api.showUncaughtError()) {
        const rejection = e && e.rejection;
        if (rejection) {
          console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
        } else {
          console.error(e);
        }
      }
    };
    api.microtaskDrainDone = () => {
      while (_uncaughtPromiseErrors.length) {
        const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
        try {
          uncaughtPromiseError.zone.runGuarded(() => {
            if (uncaughtPromiseError.throwOriginal) {
              throw uncaughtPromiseError.rejection;
            }
            throw uncaughtPromiseError;
          });
        } catch (error) {
          handleUnhandledRejection(error);
        }
      }
    };
    const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__3("unhandledPromiseRejectionHandler");
    function handleUnhandledRejection(e) {
      api.onUnhandledError(e);
      try {
        const handler = Zone3[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
        if (typeof handler === "function") {
          handler.call(this, e);
        }
      } catch (err) {
      }
    }
    function isThenable(value) {
      return value && typeof value.then === "function";
    }
    function forwardResolution(value) {
      return value;
    }
    function forwardRejection(rejection) {
      return ZoneAwarePromise.reject(rejection);
    }
    const symbolState = __symbol__3("state");
    const symbolValue = __symbol__3("value");
    const symbolFinally = __symbol__3("finally");
    const symbolParentPromiseValue = __symbol__3("parentPromiseValue");
    const symbolParentPromiseState = __symbol__3("parentPromiseState");
    const source = "Promise.then";
    const UNRESOLVED = null;
    const RESOLVED = true;
    const REJECTED = false;
    const REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
      return (v) => {
        try {
          resolvePromise(promise, state, v);
        } catch (err) {
          resolvePromise(promise, false, err);
        }
      };
    }
    const once = function() {
      let wasCalled = false;
      return function wrapper(wrappedFunction) {
        return function() {
          if (wasCalled) {
            return;
          }
          wasCalled = true;
          wrappedFunction.apply(null, arguments);
        };
      };
    };
    const TYPE_ERROR = "Promise resolved with itself";
    const CURRENT_TASK_TRACE_SYMBOL = __symbol__3("currentTaskTrace");
    function resolvePromise(promise, state, value) {
      const onceWrapper = once();
      if (promise === value) {
        throw new TypeError(TYPE_ERROR);
      }
      if (promise[symbolState] === UNRESOLVED) {
        let then = null;
        try {
          if (typeof value === "object" || typeof value === "function") {
            then = value && value.then;
          }
        } catch (err) {
          onceWrapper(() => {
            resolvePromise(promise, false, err);
          })();
          return promise;
        }
        if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
          clearRejectedNoCatch(value);
          resolvePromise(promise, value[symbolState], value[symbolValue]);
        } else if (state !== REJECTED && typeof then === "function") {
          try {
            then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
          } catch (err) {
            onceWrapper(() => {
              resolvePromise(promise, false, err);
            })();
          }
        } else {
          promise[symbolState] = state;
          const queue = promise[symbolValue];
          promise[symbolValue] = value;
          if (promise[symbolFinally] === symbolFinally) {
            if (state === RESOLVED) {
              promise[symbolState] = promise[symbolParentPromiseState];
              promise[symbolValue] = promise[symbolParentPromiseValue];
            }
          }
          if (state === REJECTED && value instanceof Error) {
            const trace = Zone3.currentTask && Zone3.currentTask.data && Zone3.currentTask.data[creationTrace];
            if (trace) {
              ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: trace
              });
            }
          }
          for (let i = 0; i < queue.length; ) {
            scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
          }
          if (queue.length == 0 && state == REJECTED) {
            promise[symbolState] = REJECTED_NO_CATCH;
            let uncaughtPromiseError = value;
            try {
              throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
            } catch (err) {
              uncaughtPromiseError = err;
            }
            if (isDisableWrappingUncaughtPromiseRejection) {
              uncaughtPromiseError.throwOriginal = true;
            }
            uncaughtPromiseError.rejection = value;
            uncaughtPromiseError.promise = promise;
            uncaughtPromiseError.zone = Zone3.current;
            uncaughtPromiseError.task = Zone3.currentTask;
            _uncaughtPromiseErrors.push(uncaughtPromiseError);
            api.scheduleMicroTask();
          }
        }
      }
      return promise;
    }
    const REJECTION_HANDLED_HANDLER = __symbol__3("rejectionHandledHandler");
    function clearRejectedNoCatch(promise) {
      if (promise[symbolState] === REJECTED_NO_CATCH) {
        try {
          const handler = Zone3[REJECTION_HANDLED_HANDLER];
          if (handler && typeof handler === "function") {
            handler.call(this, { rejection: promise[symbolValue], promise });
          }
        } catch (err) {
        }
        promise[symbolState] = REJECTED;
        for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
          if (promise === _uncaughtPromiseErrors[i].promise) {
            _uncaughtPromiseErrors.splice(i, 1);
          }
        }
      }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
      clearRejectedNoCatch(promise);
      const promiseState = promise[symbolState];
      const delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
      zone.scheduleMicroTask(source, () => {
        try {
          const parentPromiseValue = promise[symbolValue];
          const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
          if (isFinallyPromise) {
            chainPromise[symbolParentPromiseValue] = parentPromiseValue;
            chainPromise[symbolParentPromiseState] = promiseState;
          }
          const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
          resolvePromise(chainPromise, true, value);
        } catch (error) {
          resolvePromise(chainPromise, false, error);
        }
      }, chainPromise);
    }
    const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
    const noop = function() {
    };
    const AggregateError = global3.AggregateError;
    class ZoneAwarePromise {
      static toString() {
        return ZONE_AWARE_PROMISE_TO_STRING;
      }
      static resolve(value) {
        if (value instanceof ZoneAwarePromise) {
          return value;
        }
        return resolvePromise(new this(null), RESOLVED, value);
      }
      static reject(error) {
        return resolvePromise(new this(null), REJECTED, error);
      }
      static withResolvers() {
        const result = {};
        result.promise = new ZoneAwarePromise((res, rej) => {
          result.resolve = res;
          result.reject = rej;
        });
        return result;
      }
      static any(values) {
        if (!values || typeof values[Symbol.iterator] !== "function") {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        const promises = [];
        let count = 0;
        try {
          for (let v of values) {
            count++;
            promises.push(ZoneAwarePromise.resolve(v));
          }
        } catch (err) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        if (count === 0) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        let finished = false;
        const errors = [];
        return new ZoneAwarePromise((resolve, reject) => {
          for (let i = 0; i < promises.length; i++) {
            promises[i].then((v) => {
              if (finished) {
                return;
              }
              finished = true;
              resolve(v);
            }, (err) => {
              errors.push(err);
              count--;
              if (count === 0) {
                finished = true;
                reject(new AggregateError(errors, "All promises were rejected"));
              }
            });
          }
        });
      }
      static race(values) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        function onResolve(value) {
          resolve(value);
        }
        function onReject(error) {
          reject(error);
        }
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          value.then(onResolve, onReject);
        }
        return promise;
      }
      static all(values) {
        return ZoneAwarePromise.allWithCallback(values);
      }
      static allSettled(values) {
        const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
        return P.allWithCallback(values, {
          thenCallback: (value) => ({ status: "fulfilled", value }),
          errorCallback: (err) => ({ status: "rejected", reason: err })
        });
      }
      static allWithCallback(values, callback) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        let unresolvedCount = 2;
        let valueIndex = 0;
        const resolvedValues = [];
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          const curValueIndex = valueIndex;
          try {
            value.then((value2) => {
              resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2;
              unresolvedCount--;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }, (err) => {
              if (!callback) {
                reject(err);
              } else {
                resolvedValues[curValueIndex] = callback.errorCallback(err);
                unresolvedCount--;
                if (unresolvedCount === 0) {
                  resolve(resolvedValues);
                }
              }
            });
          } catch (thenErr) {
            reject(thenErr);
          }
          unresolvedCount++;
          valueIndex++;
        }
        unresolvedCount -= 2;
        if (unresolvedCount === 0) {
          resolve(resolvedValues);
        }
        return promise;
      }
      constructor(executor) {
        const promise = this;
        if (!(promise instanceof ZoneAwarePromise)) {
          throw new Error("Must be an instanceof Promise.");
        }
        promise[symbolState] = UNRESOLVED;
        promise[symbolValue] = [];
        try {
          const onceWrapper = once();
          executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
        } catch (error) {
          resolvePromise(promise, false, error);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return ZoneAwarePromise;
      }
      then(onFulfilled, onRejected) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = this.constructor || ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        const zone = Zone3.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
        }
        return chainPromise;
      }
      catch(onRejected) {
        return this.then(null, onRejected);
      }
      finally(onFinally) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        chainPromise[symbolFinally] = symbolFinally;
        const zone = Zone3.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
        }
        return chainPromise;
      }
    }
    ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
    ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
    ZoneAwarePromise["race"] = ZoneAwarePromise.race;
    ZoneAwarePromise["all"] = ZoneAwarePromise.all;
    const NativePromise = global3[symbolPromise] = global3["Promise"];
    global3["Promise"] = ZoneAwarePromise;
    const symbolThenPatched = __symbol__3("thenPatched");
    function patchThen(Ctor) {
      const proto = Ctor.prototype;
      const prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
      if (prop && (prop.writable === false || !prop.configurable)) {
        return;
      }
      const originalThen = proto.then;
      proto[symbolThen] = originalThen;
      Ctor.prototype.then = function(onResolve, onReject) {
        const wrapped = new ZoneAwarePromise((resolve, reject) => {
          originalThen.call(this, resolve, reject);
        });
        return wrapped.then(onResolve, onReject);
      };
      Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
      return function(self2, args) {
        let resultPromise = fn.apply(self2, args);
        if (resultPromise instanceof ZoneAwarePromise) {
          return resultPromise;
        }
        let ctor = resultPromise.constructor;
        if (!ctor[symbolThenPatched]) {
          patchThen(ctor);
        }
        return resultPromise;
      };
    }
    if (NativePromise) {
      patchThen(NativePromise);
      patchMethod(global3, "fetch", (delegate) => zoneify(delegate));
    }
    Promise[Zone3.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
  });
}
function patchToString(Zone2) {
  Zone2.__load_patch("toString", (global3) => {
    const originalFunctionToString = Function.prototype.toString;
    const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
    const PROMISE_SYMBOL = zoneSymbol("Promise");
    const ERROR_SYMBOL = zoneSymbol("Error");
    const newFunctionToString = function toString() {
      if (typeof this === "function") {
        const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
        if (originalDelegate) {
          if (typeof originalDelegate === "function") {
            return originalFunctionToString.call(originalDelegate);
          } else {
            return Object.prototype.toString.call(originalDelegate);
          }
        }
        if (this === Promise) {
          const nativePromise = global3[PROMISE_SYMBOL];
          if (nativePromise) {
            return originalFunctionToString.call(nativePromise);
          }
        }
        if (this === Error) {
          const nativeError = global3[ERROR_SYMBOL];
          if (nativeError) {
            return originalFunctionToString.call(nativeError);
          }
        }
      }
      return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    const originalObjectToString = Object.prototype.toString;
    const PROMISE_OBJECT_TO_STRING = "[object Promise]";
    Object.prototype.toString = function() {
      if (typeof Promise === "function" && this instanceof Promise) {
        return PROMISE_OBJECT_TO_STRING;
      }
      return originalObjectToString.call(this);
    };
  });
}
function patchCallbacks(api, target, targetName, method, callbacks) {
  const symbol = Zone.__symbol__(method);
  if (target[symbol]) {
    return;
  }
  const nativeDelegate = target[symbol] = target[method];
  target[method] = function(name, opts, options) {
    if (opts && opts.prototype) {
      callbacks.forEach(function(callback) {
        const source = `${targetName}.${method}::` + callback;
        const prototype = opts.prototype;
        try {
          if (prototype.hasOwnProperty(callback)) {
            const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
            if (descriptor && descriptor.value) {
              descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
              api._redefineProperty(opts.prototype, callback, descriptor);
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } else if (prototype[callback]) {
            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
          }
        } catch {
        }
      });
    }
    return nativeDelegate.call(target, name, opts, options);
  };
  api.attachOriginToPatched(target[method], nativeDelegate);
}
function patchUtil(Zone2) {
  Zone2.__load_patch("util", (global3, Zone3, api) => {
    const eventNames = getOnEventNames(global3);
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    const SYMBOL_BLACK_LISTED_EVENTS = Zone3.__symbol__("BLACK_LISTED_EVENTS");
    const SYMBOL_UNPATCHED_EVENTS = Zone3.__symbol__("UNPATCHED_EVENTS");
    if (global3[SYMBOL_UNPATCHED_EVENTS]) {
      global3[SYMBOL_BLACK_LISTED_EVENTS] = global3[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global3[SYMBOL_BLACK_LISTED_EVENTS]) {
      Zone3[SYMBOL_BLACK_LISTED_EVENTS] = Zone3[SYMBOL_UNPATCHED_EVENTS] = global3[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.isIEOrEdge = isIEOrEdge;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = () => ({
      globalSources,
      zoneSymbolEventNames,
      eventNames,
      isBrowser,
      isMix,
      isNode,
      TRUE_STR,
      FALSE_STR,
      ZONE_SYMBOL_PREFIX,
      ADD_EVENT_LISTENER_STR,
      REMOVE_EVENT_LISTENER_STR
    });
  });
}
function patchCommon(Zone2) {
  patchPromise(Zone2);
  patchToString(Zone2);
  patchUtil(Zone2);
}
var Zone$1 = loadZone();
patchCommon(Zone$1);
patchBrowser(Zone$1);

// node_modules/zone.js/fesm2015/zone-testing.js
function patchJasmine(Zone2) {
  Zone2.__load_patch("jasmine", (global3, Zone3, api) => {
    const __extends = function(d, b) {
      for (const p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    if (!Zone3)
      throw new Error("Missing: zone.js");
    if (typeof jest !== "undefined") {
      return;
    }
    if (typeof jasmine == "undefined" || jasmine["__zone_patch__"]) {
      return;
    }
    jasmine["__zone_patch__"] = true;
    const SyncTestZoneSpec = Zone3["SyncTestZoneSpec"];
    const ProxyZoneSpec2 = Zone3["ProxyZoneSpec"];
    if (!SyncTestZoneSpec)
      throw new Error("Missing: SyncTestZoneSpec");
    if (!ProxyZoneSpec2)
      throw new Error("Missing: ProxyZoneSpec");
    const ambientZone = Zone3.current;
    const symbol = Zone3.__symbol__;
    const disablePatchingJasmineClock = global3[symbol("fakeAsyncDisablePatchingClock")] === true;
    const enableAutoFakeAsyncWhenClockPatched = !disablePatchingJasmineClock && (global3[symbol("fakeAsyncPatchLock")] === true || global3[symbol("fakeAsyncAutoFakeAsyncWhenClockPatched")] === true);
    const ignoreUnhandledRejection = global3[symbol("ignoreUnhandledRejection")] === true;
    if (!ignoreUnhandledRejection) {
      const globalErrors = jasmine.GlobalErrors;
      if (globalErrors && !jasmine[symbol("GlobalErrors")]) {
        jasmine[symbol("GlobalErrors")] = globalErrors;
        jasmine.GlobalErrors = function() {
          const instance = new globalErrors();
          const originalInstall = instance.install;
          if (originalInstall && !instance[symbol("install")]) {
            instance[symbol("install")] = originalInstall;
            instance.install = function() {
              const isNode2 = typeof process !== "undefined" && !!process.on;
              const originalHandlers = isNode2 ? process.listeners("unhandledRejection") : global3.eventListeners("unhandledrejection");
              const result = originalInstall.apply(this, arguments);
              isNode2 ? process.removeAllListeners("unhandledRejection") : global3.removeAllListeners("unhandledrejection");
              if (originalHandlers) {
                originalHandlers.forEach((handler) => {
                  if (isNode2) {
                    process.on("unhandledRejection", handler);
                  } else {
                    global3.addEventListener("unhandledrejection", handler);
                  }
                });
              }
              return result;
            };
          }
          return instance;
        };
      }
    }
    const jasmineEnv = jasmine.getEnv();
    ["describe", "xdescribe", "fdescribe"].forEach((methodName) => {
      let originalJasmineFn = jasmineEnv[methodName];
      jasmineEnv[methodName] = function(description, specDefinitions) {
        return originalJasmineFn.call(this, description, wrapDescribeInZone(description, specDefinitions));
      };
    });
    ["it", "xit", "fit"].forEach((methodName) => {
      let originalJasmineFn = jasmineEnv[methodName];
      jasmineEnv[symbol(methodName)] = originalJasmineFn;
      jasmineEnv[methodName] = function(description, specDefinitions, timeout) {
        arguments[1] = wrapTestInZone(specDefinitions);
        return originalJasmineFn.apply(this, arguments);
      };
    });
    ["beforeEach", "afterEach", "beforeAll", "afterAll"].forEach((methodName) => {
      let originalJasmineFn = jasmineEnv[methodName];
      jasmineEnv[symbol(methodName)] = originalJasmineFn;
      jasmineEnv[methodName] = function(specDefinitions, timeout) {
        arguments[0] = wrapTestInZone(specDefinitions);
        return originalJasmineFn.apply(this, arguments);
      };
    });
    if (!disablePatchingJasmineClock) {
      const originalClockFn = jasmine[symbol("clock")] = jasmine["clock"];
      jasmine["clock"] = function() {
        const clock = originalClockFn.apply(this, arguments);
        if (!clock[symbol("patched")]) {
          clock[symbol("patched")] = symbol("patched");
          const originalTick = clock[symbol("tick")] = clock.tick;
          clock.tick = function() {
            const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
            if (fakeAsyncZoneSpec) {
              return fakeAsyncZoneSpec.tick.apply(fakeAsyncZoneSpec, arguments);
            }
            return originalTick.apply(this, arguments);
          };
          const originalMockDate = clock[symbol("mockDate")] = clock.mockDate;
          clock.mockDate = function() {
            const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
            if (fakeAsyncZoneSpec) {
              const dateTime = arguments.length > 0 ? arguments[0] : /* @__PURE__ */ new Date();
              return fakeAsyncZoneSpec.setFakeBaseSystemTime.apply(fakeAsyncZoneSpec, dateTime && typeof dateTime.getTime === "function" ? [dateTime.getTime()] : arguments);
            }
            return originalMockDate.apply(this, arguments);
          };
          if (enableAutoFakeAsyncWhenClockPatched) {
            ["install", "uninstall"].forEach((methodName) => {
              const originalClockFn2 = clock[symbol(methodName)] = clock[methodName];
              clock[methodName] = function() {
                const FakeAsyncTestZoneSpec2 = Zone3["FakeAsyncTestZoneSpec"];
                if (FakeAsyncTestZoneSpec2) {
                  jasmine[symbol("clockInstalled")] = "install" === methodName;
                  return;
                }
                return originalClockFn2.apply(this, arguments);
              };
            });
          }
        }
        return clock;
      };
    }
    if (!jasmine[Zone3.__symbol__("createSpyObj")]) {
      const originalCreateSpyObj = jasmine.createSpyObj;
      jasmine[Zone3.__symbol__("createSpyObj")] = originalCreateSpyObj;
      jasmine.createSpyObj = function() {
        const args = Array.prototype.slice.call(arguments);
        const propertyNames = args.length >= 3 ? args[2] : null;
        let spyObj;
        if (propertyNames) {
          const defineProperty = Object.defineProperty;
          Object.defineProperty = function(obj, p, attributes) {
            return defineProperty.call(this, obj, p, __spreadProps(__spreadValues({}, attributes), {
              configurable: true,
              enumerable: true
            }));
          };
          try {
            spyObj = originalCreateSpyObj.apply(this, args);
          } finally {
            Object.defineProperty = defineProperty;
          }
        } else {
          spyObj = originalCreateSpyObj.apply(this, args);
        }
        return spyObj;
      };
    }
    function wrapDescribeInZone(description, describeBody) {
      return function() {
        const syncZone = ambientZone.fork(new SyncTestZoneSpec(`jasmine.describe#${description}`));
        return syncZone.run(describeBody, this, arguments);
      };
    }
    function runInTestZone(testBody, applyThis, queueRunner, done) {
      const isClockInstalled = !!jasmine[symbol("clockInstalled")];
      queueRunner.testProxyZoneSpec;
      const testProxyZone = queueRunner.testProxyZone;
      if (isClockInstalled && enableAutoFakeAsyncWhenClockPatched) {
        const fakeAsyncModule = Zone3[Zone3.__symbol__("fakeAsyncTest")];
        if (fakeAsyncModule && typeof fakeAsyncModule.fakeAsync === "function") {
          testBody = fakeAsyncModule.fakeAsync(testBody);
        }
      }
      if (done) {
        return testProxyZone.run(testBody, applyThis, [done]);
      } else {
        return testProxyZone.run(testBody, applyThis);
      }
    }
    function wrapTestInZone(testBody) {
      return testBody && (testBody.length ? function(done) {
        return runInTestZone(testBody, this, this.queueRunner, done);
      } : function() {
        return runInTestZone(testBody, this, this.queueRunner);
      });
    }
    const QueueRunner = jasmine.QueueRunner;
    jasmine.QueueRunner = function(_super) {
      __extends(ZoneQueueRunner, _super);
      function ZoneQueueRunner(attrs) {
        if (attrs.onComplete) {
          attrs.onComplete = /* @__PURE__ */ ((fn) => () => {
            this.testProxyZone = null;
            this.testProxyZoneSpec = null;
            ambientZone.scheduleMicroTask("jasmine.onComplete", fn);
          })(attrs.onComplete);
        }
        const nativeSetTimeout = global3[Zone3.__symbol__("setTimeout")];
        const nativeClearTimeout = global3[Zone3.__symbol__("clearTimeout")];
        if (nativeSetTimeout) {
          attrs.timeout = {
            setTimeout: nativeSetTimeout ? nativeSetTimeout : global3.setTimeout,
            clearTimeout: nativeClearTimeout ? nativeClearTimeout : global3.clearTimeout
          };
        }
        if (jasmine.UserContext) {
          if (!attrs.userContext) {
            attrs.userContext = new jasmine.UserContext();
          }
          attrs.userContext.queueRunner = this;
        } else {
          if (!attrs.userContext) {
            attrs.userContext = {};
          }
          attrs.userContext.queueRunner = this;
        }
        const onException = attrs.onException;
        attrs.onException = function(error) {
          if (error && error.message === "Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.") {
            const proxyZoneSpec = this && this.testProxyZoneSpec;
            if (proxyZoneSpec) {
              const pendingTasksInfo = proxyZoneSpec.getAndClearPendingTasksInfo();
              try {
                error.message += pendingTasksInfo;
              } catch (err) {
              }
            }
          }
          if (onException) {
            onException.call(this, error);
          }
        };
        _super.call(this, attrs);
      }
      ZoneQueueRunner.prototype.execute = function() {
        let zone = Zone3.current;
        let isChildOfAmbientZone = false;
        while (zone) {
          if (zone === ambientZone) {
            isChildOfAmbientZone = true;
            break;
          }
          zone = zone.parent;
        }
        if (!isChildOfAmbientZone)
          throw new Error("Unexpected Zone: " + Zone3.current.name);
        this.testProxyZoneSpec = new ProxyZoneSpec2();
        this.testProxyZone = ambientZone.fork(this.testProxyZoneSpec);
        if (!Zone3.currentTask) {
          Zone3.current.scheduleMicroTask("jasmine.execute().forceTask", () => QueueRunner.prototype.execute.call(this));
        } else {
          _super.prototype.execute.call(this);
        }
      };
      return ZoneQueueRunner;
    }(QueueRunner);
  });
}
function patchJest(Zone2) {
  Zone2.__load_patch("jest", (context, Zone3, api) => {
    if (typeof jest === "undefined" || jest["__zone_patch__"]) {
      return;
    }
    Zone3[api.symbol("ignoreConsoleErrorUncaughtError")] = true;
    jest["__zone_patch__"] = true;
    const ProxyZoneSpec2 = Zone3["ProxyZoneSpec"];
    const SyncTestZoneSpec = Zone3["SyncTestZoneSpec"];
    if (!ProxyZoneSpec2) {
      throw new Error("Missing ProxyZoneSpec");
    }
    const rootZone = Zone3.current;
    const syncZone = rootZone.fork(new SyncTestZoneSpec("jest.describe"));
    const proxyZoneSpec = new ProxyZoneSpec2();
    const proxyZone = rootZone.fork(proxyZoneSpec);
    function wrapDescribeFactoryInZone(originalJestFn) {
      return function(...tableArgs) {
        const originalDescribeFn = originalJestFn.apply(this, tableArgs);
        return function(...args) {
          args[1] = wrapDescribeInZone(args[1]);
          return originalDescribeFn.apply(this, args);
        };
      };
    }
    function wrapTestFactoryInZone(originalJestFn) {
      return function(...tableArgs) {
        return function(...args) {
          args[1] = wrapTestInZone(args[1]);
          return originalJestFn.apply(this, tableArgs).apply(this, args);
        };
      };
    }
    function wrapDescribeInZone(describeBody) {
      return function(...args) {
        return syncZone.run(describeBody, this, args);
      };
    }
    function wrapTestInZone(testBody, isTestFunc = false) {
      if (typeof testBody !== "function") {
        return testBody;
      }
      const wrappedFunc = function() {
        if (Zone3[api.symbol("useFakeTimersCalled")] === true && testBody && !testBody.isFakeAsync) {
          const fakeAsyncModule = Zone3[Zone3.__symbol__("fakeAsyncTest")];
          if (fakeAsyncModule && typeof fakeAsyncModule.fakeAsync === "function") {
            testBody = fakeAsyncModule.fakeAsync(testBody);
          }
        }
        proxyZoneSpec.isTestFunc = isTestFunc;
        return proxyZone.run(testBody, null, arguments);
      };
      Object.defineProperty(wrappedFunc, "length", {
        configurable: true,
        writable: true,
        enumerable: false
      });
      wrappedFunc.length = testBody.length;
      return wrappedFunc;
    }
    ["describe", "xdescribe", "fdescribe"].forEach((methodName) => {
      let originalJestFn = context[methodName];
      if (context[Zone3.__symbol__(methodName)]) {
        return;
      }
      context[Zone3.__symbol__(methodName)] = originalJestFn;
      context[methodName] = function(...args) {
        args[1] = wrapDescribeInZone(args[1]);
        return originalJestFn.apply(this, args);
      };
      context[methodName].each = wrapDescribeFactoryInZone(originalJestFn.each);
    });
    context.describe.only = context.fdescribe;
    context.describe.skip = context.xdescribe;
    ["it", "xit", "fit", "test", "xtest"].forEach((methodName) => {
      let originalJestFn = context[methodName];
      if (context[Zone3.__symbol__(methodName)]) {
        return;
      }
      context[Zone3.__symbol__(methodName)] = originalJestFn;
      context[methodName] = function(...args) {
        args[1] = wrapTestInZone(args[1], true);
        return originalJestFn.apply(this, args);
      };
      context[methodName].each = wrapTestFactoryInZone(originalJestFn.each);
      context[methodName].todo = originalJestFn.todo;
      context[methodName].failing = originalJestFn.failing;
    });
    context.it.only = context.fit;
    context.it.skip = context.xit;
    context.test.only = context.fit;
    context.test.skip = context.xit;
    ["beforeEach", "afterEach", "beforeAll", "afterAll"].forEach((methodName) => {
      let originalJestFn = context[methodName];
      if (context[Zone3.__symbol__(methodName)]) {
        return;
      }
      context[Zone3.__symbol__(methodName)] = originalJestFn;
      context[methodName] = function(...args) {
        args[0] = wrapTestInZone(args[0]);
        return originalJestFn.apply(this, args);
      };
    });
    Zone3.patchJestObject = function patchJestObject(Timer, isModern = false) {
      function isPatchingFakeTimer() {
        const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
        return !!fakeAsyncZoneSpec;
      }
      function isInTestFunc() {
        const proxyZoneSpec2 = Zone3.current.get("ProxyZoneSpec");
        return proxyZoneSpec2 && proxyZoneSpec2.isTestFunc;
      }
      if (Timer[api.symbol("fakeTimers")]) {
        return;
      }
      Timer[api.symbol("fakeTimers")] = true;
      api.patchMethod(Timer, "_checkFakeTimers", (delegate) => {
        return function(self2, args) {
          if (isPatchingFakeTimer()) {
            return true;
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "useFakeTimers", (delegate) => {
        return function(self2, args) {
          Zone3[api.symbol("useFakeTimersCalled")] = true;
          if (isModern || isInTestFunc()) {
            return delegate.apply(self2, args);
          }
          return self2;
        };
      });
      api.patchMethod(Timer, "useRealTimers", (delegate) => {
        return function(self2, args) {
          Zone3[api.symbol("useFakeTimersCalled")] = false;
          if (isModern || isInTestFunc()) {
            return delegate.apply(self2, args);
          }
          return self2;
        };
      });
      api.patchMethod(Timer, "setSystemTime", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec && isPatchingFakeTimer()) {
            fakeAsyncZoneSpec.setFakeBaseSystemTime(args[0]);
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "getRealSystemTime", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec && isPatchingFakeTimer()) {
            return fakeAsyncZoneSpec.getRealSystemTime();
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "runAllTicks", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            fakeAsyncZoneSpec.flushMicrotasks();
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "runAllTimers", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            fakeAsyncZoneSpec.flush(100, true);
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "advanceTimersByTime", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            fakeAsyncZoneSpec.tick(args[0]);
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "runOnlyPendingTimers", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            fakeAsyncZoneSpec.flushOnlyPendingTimers();
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "advanceTimersToNextTimer", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            fakeAsyncZoneSpec.tickToNext(args[0]);
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "clearAllTimers", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            fakeAsyncZoneSpec.removeAllTimers();
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
      api.patchMethod(Timer, "getTimerCount", (delegate) => {
        return function(self2, args) {
          const fakeAsyncZoneSpec = Zone3.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            return fakeAsyncZoneSpec.getTimerCount();
          } else {
            return delegate.apply(self2, args);
          }
        };
      });
    };
  });
}
function patchMocha(Zone2) {
  Zone2.__load_patch("mocha", (global3, Zone3) => {
    const Mocha = global3.Mocha;
    if (typeof Mocha === "undefined") {
      return;
    }
    if (typeof Zone3 === "undefined") {
      throw new Error("Missing Zone.js");
    }
    const ProxyZoneSpec2 = Zone3["ProxyZoneSpec"];
    const SyncTestZoneSpec = Zone3["SyncTestZoneSpec"];
    if (!ProxyZoneSpec2) {
      throw new Error("Missing ProxyZoneSpec");
    }
    if (Mocha["__zone_patch__"]) {
      throw new Error('"Mocha" has already been patched with "Zone".');
    }
    Mocha["__zone_patch__"] = true;
    const rootZone = Zone3.current;
    const syncZone = rootZone.fork(new SyncTestZoneSpec("Mocha.describe"));
    let testZone = null;
    const suiteZone = rootZone.fork(new ProxyZoneSpec2());
    const mochaOriginal = {
      after: global3.after,
      afterEach: global3.afterEach,
      before: global3.before,
      beforeEach: global3.beforeEach,
      describe: global3.describe,
      it: global3.it
    };
    function modifyArguments(args, syncTest, asyncTest) {
      for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (typeof arg === "function") {
          args[i] = arg.length === 0 ? syncTest(arg) : asyncTest(arg);
          args[i].toString = function() {
            return arg.toString();
          };
        }
      }
      return args;
    }
    function wrapDescribeInZone(args) {
      const syncTest = function(fn) {
        return function() {
          return syncZone.run(fn, this, arguments);
        };
      };
      return modifyArguments(args, syncTest);
    }
    function wrapTestInZone(args) {
      const asyncTest = function(fn) {
        return function(done) {
          return testZone.run(fn, this, [done]);
        };
      };
      const syncTest = function(fn) {
        return function() {
          return testZone.run(fn, this);
        };
      };
      return modifyArguments(args, syncTest, asyncTest);
    }
    function wrapSuiteInZone(args) {
      const asyncTest = function(fn) {
        return function(done) {
          return suiteZone.run(fn, this, [done]);
        };
      };
      const syncTest = function(fn) {
        return function() {
          return suiteZone.run(fn, this);
        };
      };
      return modifyArguments(args, syncTest, asyncTest);
    }
    global3.describe = global3.suite = function() {
      return mochaOriginal.describe.apply(this, wrapDescribeInZone(arguments));
    };
    global3.xdescribe = global3.suite.skip = global3.describe.skip = function() {
      return mochaOriginal.describe.skip.apply(this, wrapDescribeInZone(arguments));
    };
    global3.describe.only = global3.suite.only = function() {
      return mochaOriginal.describe.only.apply(this, wrapDescribeInZone(arguments));
    };
    global3.it = global3.specify = global3.test = function() {
      return mochaOriginal.it.apply(this, wrapTestInZone(arguments));
    };
    global3.xit = global3.xspecify = global3.it.skip = function() {
      return mochaOriginal.it.skip.apply(this, wrapTestInZone(arguments));
    };
    global3.it.only = global3.test.only = function() {
      return mochaOriginal.it.only.apply(this, wrapTestInZone(arguments));
    };
    global3.after = global3.suiteTeardown = function() {
      return mochaOriginal.after.apply(this, wrapSuiteInZone(arguments));
    };
    global3.afterEach = global3.teardown = function() {
      return mochaOriginal.afterEach.apply(this, wrapTestInZone(arguments));
    };
    global3.before = global3.suiteSetup = function() {
      return mochaOriginal.before.apply(this, wrapSuiteInZone(arguments));
    };
    global3.beforeEach = global3.setup = function() {
      return mochaOriginal.beforeEach.apply(this, wrapTestInZone(arguments));
    };
    ((originalRunTest, originalRun) => {
      Mocha.Runner.prototype.runTest = function(fn) {
        Zone3.current.scheduleMicroTask("mocha.forceTask", () => {
          originalRunTest.call(this, fn);
        });
      };
      Mocha.Runner.prototype.run = function(fn) {
        this.on("test", (e) => {
          testZone = rootZone.fork(new ProxyZoneSpec2());
        });
        this.on("fail", (test, err) => {
          const proxyZoneSpec = testZone && testZone.get("ProxyZoneSpec");
          if (proxyZoneSpec && err) {
            try {
              err.message += proxyZoneSpec.getAndClearPendingTasksInfo();
            } catch (error) {
            }
          }
        });
        return originalRun.call(this, fn);
      };
    })(Mocha.Runner.prototype.runTest, Mocha.Runner.prototype.run);
  });
}
var global$2 = globalThis;
function __symbol__2(name) {
  const symbolPrefix = global$2["__Zone_symbol_prefix"] || "__zone_symbol__";
  return symbolPrefix + name;
}
var __global = typeof window !== "undefined" && window || typeof self !== "undefined" && self || global;
var AsyncTestZoneSpec = class _AsyncTestZoneSpec {
  finishCallback;
  failCallback;
  // Needs to be a getter and not a plain property in order run this just-in-time. Otherwise
  // `__symbol__` would be evaluated during top-level execution prior to the Zone prefix being
  // changed for tests.
  static get symbolParentUnresolved() {
    return __symbol__2("parentUnresolved");
  }
  _pendingMicroTasks = false;
  _pendingMacroTasks = false;
  _alreadyErrored = false;
  _isSync = false;
  _existingFinishTimer = null;
  entryFunction = null;
  runZone = Zone.current;
  unresolvedChainedPromiseCount = 0;
  supportWaitUnresolvedChainedPromise = false;
  constructor(finishCallback, failCallback, namePrefix) {
    this.finishCallback = finishCallback;
    this.failCallback = failCallback;
    this.name = "asyncTestZone for " + namePrefix;
    this.properties = { "AsyncTestZoneSpec": this };
    this.supportWaitUnresolvedChainedPromise = __global[__symbol__2("supportWaitUnResolvedChainedPromise")] === true;
  }
  isUnresolvedChainedPromisePending() {
    return this.unresolvedChainedPromiseCount > 0;
  }
  _finishCallbackIfDone() {
    if (this._existingFinishTimer !== null) {
      clearTimeout(this._existingFinishTimer);
      this._existingFinishTimer = null;
    }
    if (!(this._pendingMicroTasks || this._pendingMacroTasks || this.supportWaitUnresolvedChainedPromise && this.isUnresolvedChainedPromisePending())) {
      this.runZone.run(() => {
        this._existingFinishTimer = setTimeout(() => {
          if (!this._alreadyErrored && !(this._pendingMicroTasks || this._pendingMacroTasks)) {
            this.finishCallback();
          }
        }, 0);
      });
    }
  }
  patchPromiseForTest() {
    if (!this.supportWaitUnresolvedChainedPromise) {
      return;
    }
    const patchPromiseForTest = Promise[Zone.__symbol__("patchPromiseForTest")];
    if (patchPromiseForTest) {
      patchPromiseForTest();
    }
  }
  unPatchPromiseForTest() {
    if (!this.supportWaitUnresolvedChainedPromise) {
      return;
    }
    const unPatchPromiseForTest = Promise[Zone.__symbol__("unPatchPromiseForTest")];
    if (unPatchPromiseForTest) {
      unPatchPromiseForTest();
    }
  }
  // ZoneSpec implementation below.
  name;
  properties;
  onScheduleTask(delegate, current, target, task) {
    if (task.type !== "eventTask") {
      this._isSync = false;
    }
    if (task.type === "microTask" && task.data && task.data instanceof Promise) {
      if (task.data[_AsyncTestZoneSpec.symbolParentUnresolved] === true) {
        this.unresolvedChainedPromiseCount--;
      }
    }
    return delegate.scheduleTask(target, task);
  }
  onInvokeTask(delegate, current, target, task, applyThis, applyArgs) {
    if (task.type !== "eventTask") {
      this._isSync = false;
    }
    return delegate.invokeTask(target, task, applyThis, applyArgs);
  }
  onCancelTask(delegate, current, target, task) {
    if (task.type !== "eventTask") {
      this._isSync = false;
    }
    return delegate.cancelTask(target, task);
  }
  // Note - we need to use onInvoke at the moment to call finish when a test is
  // fully synchronous. TODO(juliemr): remove this when the logic for
  // onHasTask changes and it calls whenever the task queues are dirty.
  // updated by(JiaLiPassion), only call finish callback when no task
  // was scheduled/invoked/canceled.
  onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
    if (!this.entryFunction) {
      this.entryFunction = delegate;
    }
    try {
      this._isSync = true;
      return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
    } finally {
      if (this._isSync && this.entryFunction === delegate) {
        this._finishCallbackIfDone();
      }
    }
  }
  onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
    const result = parentZoneDelegate.handleError(targetZone, error);
    if (result) {
      this.failCallback(error);
      this._alreadyErrored = true;
    }
    return false;
  }
  onHasTask(delegate, current, target, hasTaskState) {
    delegate.hasTask(target, hasTaskState);
    if (current !== target) {
      return;
    }
    if (hasTaskState.change == "microTask") {
      this._pendingMicroTasks = hasTaskState.microTask;
      this._finishCallbackIfDone();
    } else if (hasTaskState.change == "macroTask") {
      this._pendingMacroTasks = hasTaskState.macroTask;
      this._finishCallbackIfDone();
    }
  }
};
function patchAsyncTest(Zone2) {
  Zone2["AsyncTestZoneSpec"] = AsyncTestZoneSpec;
  Zone2.__load_patch("asynctest", (global3, Zone3, api) => {
    Zone3[api.symbol("asyncTest")] = function asyncTest(fn) {
      if (global3.jasmine) {
        return function(done) {
          if (!done) {
            done = function() {
            };
            done.fail = function(e) {
              throw e;
            };
          }
          runInTestZone(fn, this, done, (err) => {
            if (typeof err === "string") {
              return done.fail(new Error(err));
            } else {
              done.fail(err);
            }
          });
        };
      }
      return function() {
        return new Promise((finishCallback, failCallback) => {
          runInTestZone(fn, this, finishCallback, failCallback);
        });
      };
    };
    function runInTestZone(fn, context, finishCallback, failCallback) {
      const currentZone = Zone3.current;
      const AsyncTestZoneSpec2 = Zone3["AsyncTestZoneSpec"];
      if (AsyncTestZoneSpec2 === void 0) {
        throw new Error("AsyncTestZoneSpec is needed for the async() test helper but could not be found. Please make sure that your environment includes zone.js/plugins/async-test");
      }
      const ProxyZoneSpec2 = Zone3["ProxyZoneSpec"];
      if (!ProxyZoneSpec2) {
        throw new Error("ProxyZoneSpec is needed for the async() test helper but could not be found. Please make sure that your environment includes zone.js/plugins/proxy");
      }
      const proxyZoneSpec = ProxyZoneSpec2.get();
      ProxyZoneSpec2.assertPresent();
      const proxyZone = Zone3.current.getZoneWith("ProxyZoneSpec");
      const previousDelegate = proxyZoneSpec.getDelegate();
      proxyZone.parent.run(() => {
        const testZoneSpec = new AsyncTestZoneSpec2(() => {
          if (proxyZoneSpec.getDelegate() == testZoneSpec) {
            proxyZoneSpec.setDelegate(previousDelegate);
          }
          testZoneSpec.unPatchPromiseForTest();
          currentZone.run(() => {
            finishCallback();
          });
        }, (error) => {
          if (proxyZoneSpec.getDelegate() == testZoneSpec) {
            proxyZoneSpec.setDelegate(previousDelegate);
          }
          testZoneSpec.unPatchPromiseForTest();
          currentZone.run(() => {
            failCallback(error);
          });
        }, "test");
        proxyZoneSpec.setDelegate(testZoneSpec);
        testZoneSpec.patchPromiseForTest();
      });
      return Zone3.current.runGuarded(fn, context);
    }
  });
}
var global$1 = typeof window === "object" && window || typeof self === "object" && self || globalThis.global;
var OriginalDate = global$1.Date;
function FakeDate() {
  if (arguments.length === 0) {
    const d = new OriginalDate();
    d.setTime(FakeDate.now());
    return d;
  } else {
    const args = Array.prototype.slice.call(arguments);
    return new OriginalDate(...args);
  }
}
FakeDate.now = function() {
  const fakeAsyncTestZoneSpec = Zone.current.get("FakeAsyncTestZoneSpec");
  if (fakeAsyncTestZoneSpec) {
    return fakeAsyncTestZoneSpec.getFakeSystemTime();
  }
  return OriginalDate.now.apply(this, arguments);
};
FakeDate.UTC = OriginalDate.UTC;
FakeDate.parse = OriginalDate.parse;
var patchedTimers;
var timeoutCallback = function() {
};
var Scheduler = class _Scheduler {
  // Next scheduler id.
  static nextNodeJSId = 1;
  static nextId = -1;
  // Scheduler queue with the tuple of end time and callback function - sorted by end time.
  _schedulerQueue = [];
  // Current simulated time in millis.
  _currentTickTime = 0;
  // Current fake system base time in millis.
  _currentFakeBaseSystemTime = OriginalDate.now();
  // track requeuePeriodicTimer
  _currentTickRequeuePeriodicEntries = [];
  constructor() {
  }
  static getNextId() {
    const id = patchedTimers.nativeSetTimeout.call(global$1, timeoutCallback, 0);
    patchedTimers.nativeClearTimeout.call(global$1, id);
    if (typeof id === "number") {
      return id;
    }
    return _Scheduler.nextNodeJSId++;
  }
  getCurrentTickTime() {
    return this._currentTickTime;
  }
  getFakeSystemTime() {
    return this._currentFakeBaseSystemTime + this._currentTickTime;
  }
  setFakeBaseSystemTime(fakeBaseSystemTime) {
    this._currentFakeBaseSystemTime = fakeBaseSystemTime;
  }
  getRealSystemTime() {
    return OriginalDate.now();
  }
  scheduleFunction(cb, delay, options) {
    options = __spreadValues(__spreadValues({}, {
      args: [],
      isPeriodic: false,
      isRequestAnimationFrame: false,
      id: -1,
      isRequeuePeriodic: false
    }), options);
    let currentId = options.id < 0 ? _Scheduler.nextId : options.id;
    _Scheduler.nextId = _Scheduler.getNextId();
    let endTime = this._currentTickTime + delay;
    let newEntry = {
      endTime,
      id: currentId,
      func: cb,
      args: options.args,
      delay,
      isPeriodic: options.isPeriodic,
      isRequestAnimationFrame: options.isRequestAnimationFrame
    };
    if (options.isRequeuePeriodic) {
      this._currentTickRequeuePeriodicEntries.push(newEntry);
    }
    let i = 0;
    for (; i < this._schedulerQueue.length; i++) {
      let currentEntry = this._schedulerQueue[i];
      if (newEntry.endTime < currentEntry.endTime) {
        break;
      }
    }
    this._schedulerQueue.splice(i, 0, newEntry);
    return currentId;
  }
  removeScheduledFunctionWithId(id) {
    for (let i = 0; i < this._schedulerQueue.length; i++) {
      if (this._schedulerQueue[i].id == id) {
        this._schedulerQueue.splice(i, 1);
        break;
      }
    }
  }
  removeAll() {
    this._schedulerQueue = [];
  }
  getTimerCount() {
    return this._schedulerQueue.length;
  }
  tickToNext(step = 1, doTick, tickOptions) {
    if (this._schedulerQueue.length < step) {
      return;
    }
    const startTime = this._currentTickTime;
    const targetTask = this._schedulerQueue[step - 1];
    this.tick(targetTask.endTime - startTime, doTick, tickOptions);
  }
  tick(millis = 0, doTick, tickOptions) {
    let finalTime = this._currentTickTime + millis;
    let lastCurrentTime = 0;
    tickOptions = Object.assign({ processNewMacroTasksSynchronously: true }, tickOptions);
    const schedulerQueue = tickOptions.processNewMacroTasksSynchronously ? this._schedulerQueue : this._schedulerQueue.slice();
    if (schedulerQueue.length === 0 && doTick) {
      doTick(millis);
      return;
    }
    while (schedulerQueue.length > 0) {
      this._currentTickRequeuePeriodicEntries = [];
      let current = schedulerQueue[0];
      if (finalTime < current.endTime) {
        break;
      } else {
        let current2 = schedulerQueue.shift();
        if (!tickOptions.processNewMacroTasksSynchronously) {
          const idx = this._schedulerQueue.indexOf(current2);
          if (idx >= 0) {
            this._schedulerQueue.splice(idx, 1);
          }
        }
        lastCurrentTime = this._currentTickTime;
        this._currentTickTime = current2.endTime;
        if (doTick) {
          doTick(this._currentTickTime - lastCurrentTime);
        }
        let retval = current2.func.apply(global$1, current2.isRequestAnimationFrame ? [this._currentTickTime] : current2.args);
        if (!retval) {
          break;
        }
        if (!tickOptions.processNewMacroTasksSynchronously) {
          this._currentTickRequeuePeriodicEntries.forEach((newEntry) => {
            let i = 0;
            for (; i < schedulerQueue.length; i++) {
              const currentEntry = schedulerQueue[i];
              if (newEntry.endTime < currentEntry.endTime) {
                break;
              }
            }
            schedulerQueue.splice(i, 0, newEntry);
          });
        }
      }
    }
    lastCurrentTime = this._currentTickTime;
    this._currentTickTime = finalTime;
    if (doTick) {
      doTick(this._currentTickTime - lastCurrentTime);
    }
  }
  flushOnlyPendingTimers(doTick) {
    if (this._schedulerQueue.length === 0) {
      return 0;
    }
    const startTime = this._currentTickTime;
    const lastTask = this._schedulerQueue[this._schedulerQueue.length - 1];
    this.tick(lastTask.endTime - startTime, doTick, { processNewMacroTasksSynchronously: false });
    return this._currentTickTime - startTime;
  }
  flush(limit = 20, flushPeriodic = false, doTick) {
    if (flushPeriodic) {
      return this.flushPeriodic(doTick);
    } else {
      return this.flushNonPeriodic(limit, doTick);
    }
  }
  flushPeriodic(doTick) {
    if (this._schedulerQueue.length === 0) {
      return 0;
    }
    const startTime = this._currentTickTime;
    const lastTask = this._schedulerQueue[this._schedulerQueue.length - 1];
    this.tick(lastTask.endTime - startTime, doTick);
    return this._currentTickTime - startTime;
  }
  flushNonPeriodic(limit, doTick) {
    const startTime = this._currentTickTime;
    let lastCurrentTime = 0;
    let count = 0;
    while (this._schedulerQueue.length > 0) {
      count++;
      if (count > limit) {
        throw new Error("flush failed after reaching the limit of " + limit + " tasks. Does your code use a polling timeout?");
      }
      if (this._schedulerQueue.filter((task) => !task.isPeriodic && !task.isRequestAnimationFrame).length === 0) {
        break;
      }
      const current = this._schedulerQueue.shift();
      lastCurrentTime = this._currentTickTime;
      this._currentTickTime = current.endTime;
      if (doTick) {
        doTick(this._currentTickTime - lastCurrentTime);
      }
      const retval = current.func.apply(global$1, current.args);
      if (!retval) {
        break;
      }
    }
    return this._currentTickTime - startTime;
  }
};
var FakeAsyncTestZoneSpec = class _FakeAsyncTestZoneSpec {
  trackPendingRequestAnimationFrame;
  macroTaskOptions;
  static assertInZone() {
    if (Zone.current.get("FakeAsyncTestZoneSpec") == null) {
      throw new Error("The code should be running in the fakeAsync zone to call this function");
    }
  }
  _scheduler = new Scheduler();
  _microtasks = [];
  _lastError = null;
  _uncaughtPromiseErrors = Promise[Zone.__symbol__("uncaughtPromiseErrors")];
  pendingPeriodicTimers = [];
  pendingTimers = [];
  patchDateLocked = false;
  constructor(namePrefix, trackPendingRequestAnimationFrame = false, macroTaskOptions) {
    this.trackPendingRequestAnimationFrame = trackPendingRequestAnimationFrame;
    this.macroTaskOptions = macroTaskOptions;
    this.name = "fakeAsyncTestZone for " + namePrefix;
    if (!this.macroTaskOptions) {
      this.macroTaskOptions = global$1[Zone.__symbol__("FakeAsyncTestMacroTask")];
    }
  }
  _fnAndFlush(fn, completers) {
    return (...args) => {
      fn.apply(global$1, args);
      if (this._lastError === null) {
        if (completers.onSuccess != null) {
          completers.onSuccess.apply(global$1);
        }
        this.flushMicrotasks();
      } else {
        if (completers.onError != null) {
          completers.onError.apply(global$1);
        }
      }
      return this._lastError === null;
    };
  }
  static _removeTimer(timers, id) {
    let index = timers.indexOf(id);
    if (index > -1) {
      timers.splice(index, 1);
    }
  }
  _dequeueTimer(id) {
    return () => {
      _FakeAsyncTestZoneSpec._removeTimer(this.pendingTimers, id);
    };
  }
  _requeuePeriodicTimer(fn, interval, args, id) {
    return () => {
      if (this.pendingPeriodicTimers.indexOf(id) !== -1) {
        this._scheduler.scheduleFunction(fn, interval, {
          args,
          isPeriodic: true,
          id,
          isRequeuePeriodic: true
        });
      }
    };
  }
  _dequeuePeriodicTimer(id) {
    return () => {
      _FakeAsyncTestZoneSpec._removeTimer(this.pendingPeriodicTimers, id);
    };
  }
  _setTimeout(fn, delay, args, isTimer = true) {
    let removeTimerFn = this._dequeueTimer(Scheduler.nextId);
    let cb = this._fnAndFlush(fn, { onSuccess: removeTimerFn, onError: removeTimerFn });
    let id = this._scheduler.scheduleFunction(cb, delay, { args, isRequestAnimationFrame: !isTimer });
    if (isTimer) {
      this.pendingTimers.push(id);
    }
    return id;
  }
  _clearTimeout(id) {
    _FakeAsyncTestZoneSpec._removeTimer(this.pendingTimers, id);
    this._scheduler.removeScheduledFunctionWithId(id);
  }
  _setInterval(fn, interval, args) {
    let id = Scheduler.nextId;
    let completers = { onSuccess: null, onError: this._dequeuePeriodicTimer(id) };
    let cb = this._fnAndFlush(fn, completers);
    completers.onSuccess = this._requeuePeriodicTimer(cb, interval, args, id);
    this._scheduler.scheduleFunction(cb, interval, { args, isPeriodic: true });
    this.pendingPeriodicTimers.push(id);
    return id;
  }
  _clearInterval(id) {
    _FakeAsyncTestZoneSpec._removeTimer(this.pendingPeriodicTimers, id);
    this._scheduler.removeScheduledFunctionWithId(id);
  }
  _resetLastErrorAndThrow() {
    let error = this._lastError || this._uncaughtPromiseErrors[0];
    this._uncaughtPromiseErrors.length = 0;
    this._lastError = null;
    throw error;
  }
  getCurrentTickTime() {
    return this._scheduler.getCurrentTickTime();
  }
  getFakeSystemTime() {
    return this._scheduler.getFakeSystemTime();
  }
  setFakeBaseSystemTime(realTime) {
    this._scheduler.setFakeBaseSystemTime(realTime);
  }
  getRealSystemTime() {
    return this._scheduler.getRealSystemTime();
  }
  static patchDate() {
    if (!!global$1[Zone.__symbol__("disableDatePatching")]) {
      return;
    }
    if (global$1["Date"] === FakeDate) {
      return;
    }
    global$1["Date"] = FakeDate;
    FakeDate.prototype = OriginalDate.prototype;
    _FakeAsyncTestZoneSpec.checkTimerPatch();
  }
  static resetDate() {
    if (global$1["Date"] === FakeDate) {
      global$1["Date"] = OriginalDate;
    }
  }
  static checkTimerPatch() {
    if (!patchedTimers) {
      throw new Error("Expected timers to have been patched.");
    }
    if (global$1.setTimeout !== patchedTimers.setTimeout) {
      global$1.setTimeout = patchedTimers.setTimeout;
      global$1.clearTimeout = patchedTimers.clearTimeout;
    }
    if (global$1.setInterval !== patchedTimers.setInterval) {
      global$1.setInterval = patchedTimers.setInterval;
      global$1.clearInterval = patchedTimers.clearInterval;
    }
  }
  lockDatePatch() {
    this.patchDateLocked = true;
    _FakeAsyncTestZoneSpec.patchDate();
  }
  unlockDatePatch() {
    this.patchDateLocked = false;
    _FakeAsyncTestZoneSpec.resetDate();
  }
  tickToNext(steps = 1, doTick, tickOptions = { processNewMacroTasksSynchronously: true }) {
    if (steps <= 0) {
      return;
    }
    _FakeAsyncTestZoneSpec.assertInZone();
    this.flushMicrotasks();
    this._scheduler.tickToNext(steps, doTick, tickOptions);
    if (this._lastError !== null) {
      this._resetLastErrorAndThrow();
    }
  }
  tick(millis = 0, doTick, tickOptions = { processNewMacroTasksSynchronously: true }) {
    _FakeAsyncTestZoneSpec.assertInZone();
    this.flushMicrotasks();
    this._scheduler.tick(millis, doTick, tickOptions);
    if (this._lastError !== null) {
      this._resetLastErrorAndThrow();
    }
  }
  flushMicrotasks() {
    _FakeAsyncTestZoneSpec.assertInZone();
    const flushErrors = () => {
      if (this._lastError !== null || this._uncaughtPromiseErrors.length) {
        this._resetLastErrorAndThrow();
      }
    };
    while (this._microtasks.length > 0) {
      let microtask = this._microtasks.shift();
      microtask.func.apply(microtask.target, microtask.args);
    }
    flushErrors();
  }
  flush(limit, flushPeriodic, doTick) {
    _FakeAsyncTestZoneSpec.assertInZone();
    this.flushMicrotasks();
    const elapsed = this._scheduler.flush(limit, flushPeriodic, doTick);
    if (this._lastError !== null) {
      this._resetLastErrorAndThrow();
    }
    return elapsed;
  }
  flushOnlyPendingTimers(doTick) {
    _FakeAsyncTestZoneSpec.assertInZone();
    this.flushMicrotasks();
    const elapsed = this._scheduler.flushOnlyPendingTimers(doTick);
    if (this._lastError !== null) {
      this._resetLastErrorAndThrow();
    }
    return elapsed;
  }
  removeAllTimers() {
    _FakeAsyncTestZoneSpec.assertInZone();
    this._scheduler.removeAll();
    this.pendingPeriodicTimers = [];
    this.pendingTimers = [];
  }
  getTimerCount() {
    return this._scheduler.getTimerCount() + this._microtasks.length;
  }
  // ZoneSpec implementation below.
  name;
  properties = { "FakeAsyncTestZoneSpec": this };
  onScheduleTask(delegate, current, target, task) {
    switch (task.type) {
      case "microTask":
        let args = task.data && task.data.args;
        let additionalArgs;
        if (args) {
          let callbackIndex = task.data.cbIdx;
          if (typeof args.length === "number" && args.length > callbackIndex + 1) {
            additionalArgs = Array.prototype.slice.call(args, callbackIndex + 1);
          }
        }
        this._microtasks.push({
          func: task.invoke,
          args: additionalArgs,
          target: task.data && task.data.target
        });
        break;
      case "macroTask":
        switch (task.source) {
          case "setTimeout":
            task.data["handleId"] = this._setTimeout(task.invoke, task.data["delay"], Array.prototype.slice.call(task.data["args"], 2));
            break;
          case "setImmediate":
            task.data["handleId"] = this._setTimeout(task.invoke, 0, Array.prototype.slice.call(task.data["args"], 1));
            break;
          case "setInterval":
            task.data["handleId"] = this._setInterval(task.invoke, task.data["delay"], Array.prototype.slice.call(task.data["args"], 2));
            break;
          case "XMLHttpRequest.send":
            throw new Error("Cannot make XHRs from within a fake async test. Request URL: " + task.data["url"]);
          case "requestAnimationFrame":
          case "webkitRequestAnimationFrame":
          case "mozRequestAnimationFrame":
            task.data["handleId"] = this._setTimeout(task.invoke, 16, task.data["args"], this.trackPendingRequestAnimationFrame);
            break;
          default:
            const macroTaskOption = this.findMacroTaskOption(task);
            if (macroTaskOption) {
              const args2 = task.data && task.data["args"];
              const delay = args2 && args2.length > 1 ? args2[1] : 0;
              let callbackArgs = macroTaskOption.callbackArgs ? macroTaskOption.callbackArgs : args2;
              if (!!macroTaskOption.isPeriodic) {
                task.data["handleId"] = this._setInterval(task.invoke, delay, callbackArgs);
                task.data.isPeriodic = true;
              } else {
                task.data["handleId"] = this._setTimeout(task.invoke, delay, callbackArgs);
              }
              break;
            }
            throw new Error("Unknown macroTask scheduled in fake async test: " + task.source);
        }
        break;
      case "eventTask":
        task = delegate.scheduleTask(target, task);
        break;
    }
    return task;
  }
  onCancelTask(delegate, current, target, task) {
    switch (task.source) {
      case "setTimeout":
      case "requestAnimationFrame":
      case "webkitRequestAnimationFrame":
      case "mozRequestAnimationFrame":
        return this._clearTimeout(task.data["handleId"]);
      case "setInterval":
        return this._clearInterval(task.data["handleId"]);
      default:
        const macroTaskOption = this.findMacroTaskOption(task);
        if (macroTaskOption) {
          const handleId = task.data["handleId"];
          return macroTaskOption.isPeriodic ? this._clearInterval(handleId) : this._clearTimeout(handleId);
        }
        return delegate.cancelTask(target, task);
    }
  }
  onInvoke(delegate, current, target, callback, applyThis, applyArgs, source) {
    try {
      _FakeAsyncTestZoneSpec.patchDate();
      return delegate.invoke(target, callback, applyThis, applyArgs, source);
    } finally {
      if (!this.patchDateLocked) {
        _FakeAsyncTestZoneSpec.resetDate();
      }
    }
  }
  findMacroTaskOption(task) {
    if (!this.macroTaskOptions) {
      return null;
    }
    for (let i = 0; i < this.macroTaskOptions.length; i++) {
      const macroTaskOption = this.macroTaskOptions[i];
      if (macroTaskOption.source === task.source) {
        return macroTaskOption;
      }
    }
    return null;
  }
  onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
    this._lastError = error;
    return false;
  }
};
var _fakeAsyncTestZoneSpec = null;
function getProxyZoneSpec() {
  return Zone && Zone["ProxyZoneSpec"];
}
var _sharedProxyZoneSpec = null;
var _sharedProxyZone = null;
function resetFakeAsyncZone() {
  if (_fakeAsyncTestZoneSpec) {
    _fakeAsyncTestZoneSpec.unlockDatePatch();
  }
  _fakeAsyncTestZoneSpec = null;
  getProxyZoneSpec()?.get()?.resetDelegate();
  _sharedProxyZoneSpec?.resetDelegate();
}
function fakeAsync(fn, options = {}) {
  const { flush: flush2 = true } = options;
  const fakeAsyncFn = function(...args) {
    const ProxyZoneSpec2 = getProxyZoneSpec();
    if (!ProxyZoneSpec2) {
      throw new Error("ProxyZoneSpec is needed for the fakeAsync() test helper but could not be found. Make sure that your environment includes zone-testing.js");
    }
    const proxyZoneSpec = ProxyZoneSpec2.assertPresent();
    if (Zone.current.get("FakeAsyncTestZoneSpec")) {
      throw new Error("fakeAsync() calls can not be nested");
    }
    try {
      if (!_fakeAsyncTestZoneSpec) {
        const FakeAsyncTestZoneSpec2 = Zone && Zone["FakeAsyncTestZoneSpec"];
        if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec2) {
          throw new Error("fakeAsync() calls can not be nested");
        }
        _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec2();
      }
      let res;
      const lastProxyZoneSpec = proxyZoneSpec.getDelegate();
      proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
      _fakeAsyncTestZoneSpec.lockDatePatch();
      try {
        res = fn.apply(this, args);
        if (flush2) {
          _fakeAsyncTestZoneSpec.flush(20, true);
        } else {
          flushMicrotasks();
        }
      } finally {
        proxyZoneSpec.setDelegate(lastProxyZoneSpec);
      }
      if (!flush2) {
        if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
          throw new Error(`${_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length} periodic timer(s) still in the queue.`);
        }
        if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
          throw new Error(`${_fakeAsyncTestZoneSpec.pendingTimers.length} timer(s) still in the queue.`);
        }
      }
      return res;
    } finally {
      resetFakeAsyncZone();
    }
  };
  fakeAsyncFn.isFakeAsync = true;
  return fakeAsyncFn;
}
function _getFakeAsyncZoneSpec() {
  if (_fakeAsyncTestZoneSpec == null) {
    _fakeAsyncTestZoneSpec = Zone.current.get("FakeAsyncTestZoneSpec");
    if (_fakeAsyncTestZoneSpec == null) {
      throw new Error("The code should be running in the fakeAsync zone to call this function");
    }
  }
  return _fakeAsyncTestZoneSpec;
}
function tick(millis = 0, ignoreNestedTimeout = false) {
  _getFakeAsyncZoneSpec().tick(millis, null, ignoreNestedTimeout);
}
function flush(maxTurns) {
  return _getFakeAsyncZoneSpec().flush(maxTurns);
}
function discardPeriodicTasks() {
  const zoneSpec = _getFakeAsyncZoneSpec();
  zoneSpec.pendingPeriodicTimers;
  zoneSpec.pendingPeriodicTimers.length = 0;
}
function withProxyZone(fn) {
  const autoProxyFn = function(...args) {
    const proxyZoneSpec = getProxyZoneSpec();
    if (proxyZoneSpec === void 0) {
      throw new Error("ProxyZoneSpec is needed for the withProxyZone() test helper but could not be found. Make sure that your environment includes zone-testing.js");
    }
    const proxyZone = proxyZoneSpec.get() !== void 0 ? Zone.current : getOrCreateRootProxy();
    return proxyZone.run(fn, this, args);
  };
  return autoProxyFn;
}
function getOrCreateRootProxy() {
  const ProxyZoneSpec2 = getProxyZoneSpec();
  if (ProxyZoneSpec2 === void 0) {
    throw new Error("ProxyZoneSpec is needed for withProxyZone but could not be found. Make sure that your environment includes zone-testing.js");
  }
  if (_sharedProxyZoneSpec === null) {
    _sharedProxyZoneSpec = new ProxyZoneSpec2();
  }
  _sharedProxyZone = Zone.root.fork(_sharedProxyZoneSpec);
  return _sharedProxyZone;
}
function flushMicrotasks() {
  _getFakeAsyncZoneSpec().flushMicrotasks();
}
function patchFakeAsyncTest(Zone2) {
  Zone2["FakeAsyncTestZoneSpec"] = FakeAsyncTestZoneSpec;
  Zone2.__load_patch("fakeasync", (global3, Zone3, api) => {
    Zone3[api.symbol("fakeAsyncTest")] = {
      resetFakeAsyncZone,
      flushMicrotasks,
      discardPeriodicTasks,
      tick,
      flush,
      fakeAsync,
      withProxyZone
    };
  }, true);
  patchedTimers = {
    setTimeout: global$1.setTimeout,
    setInterval: global$1.setInterval,
    clearTimeout: global$1.clearTimeout,
    clearInterval: global$1.clearInterval,
    nativeSetTimeout: global$1[Zone2.__symbol__("setTimeout")],
    nativeClearTimeout: global$1[Zone2.__symbol__("clearTimeout")]
  };
  Scheduler.nextId = Scheduler.getNextId();
}
function patchLongStackTrace(Zone2) {
  const NEWLINE = "\n";
  const IGNORE_FRAMES = {};
  const creationTrace = "__creationTrace__";
  const ERROR_TAG = "STACKTRACE TRACKING";
  const SEP_TAG = "__SEP_TAG__";
  let sepTemplate = SEP_TAG + "@[native]";
  class LongStackTrace {
    error = getStacktrace();
    timestamp = /* @__PURE__ */ new Date();
  }
  function getStacktraceWithUncaughtError() {
    return new Error(ERROR_TAG);
  }
  function getStacktraceWithCaughtError() {
    try {
      throw getStacktraceWithUncaughtError();
    } catch (err) {
      return err;
    }
  }
  const error = getStacktraceWithUncaughtError();
  const caughtError = getStacktraceWithCaughtError();
  const getStacktrace = error.stack ? getStacktraceWithUncaughtError : caughtError.stack ? getStacktraceWithCaughtError : getStacktraceWithUncaughtError;
  function getFrames(error2) {
    return error2.stack ? error2.stack.split(NEWLINE) : [];
  }
  function addErrorStack(lines, error2) {
    let trace = getFrames(error2);
    for (let i = 0; i < trace.length; i++) {
      const frame = trace[i];
      if (!IGNORE_FRAMES.hasOwnProperty(frame)) {
        lines.push(trace[i]);
      }
    }
  }
  function renderLongStackTrace(frames, stack) {
    const longTrace = [stack ? stack.trim() : ""];
    if (frames) {
      let timestamp = (/* @__PURE__ */ new Date()).getTime();
      for (let i = 0; i < frames.length; i++) {
        const traceFrames = frames[i];
        const lastTime = traceFrames.timestamp;
        let separator = `____________________Elapsed ${timestamp - lastTime.getTime()} ms; At: ${lastTime}`;
        separator = separator.replace(/[^\w\d]/g, "_");
        longTrace.push(sepTemplate.replace(SEP_TAG, separator));
        addErrorStack(longTrace, traceFrames.error);
        timestamp = lastTime.getTime();
      }
    }
    return longTrace.join(NEWLINE);
  }
  function stackTracesEnabled() {
    return Error.stackTraceLimit > 0;
  }
  Zone2["longStackTraceZoneSpec"] = {
    name: "long-stack-trace",
    longStackTraceLimit: 10,
    // Max number of task to keep the stack trace for.
    // add a getLongStackTrace method in spec to
    // handle handled reject promise error.
    getLongStackTrace: function(error2) {
      if (!error2) {
        return void 0;
      }
      const trace = error2[Zone2.__symbol__("currentTaskTrace")];
      if (!trace) {
        return error2.stack;
      }
      return renderLongStackTrace(trace, error2.stack);
    },
    onScheduleTask: function(parentZoneDelegate, currentZone, targetZone, task) {
      if (stackTracesEnabled()) {
        const currentTask = Zone2.currentTask;
        let trace = currentTask && currentTask.data && currentTask.data[creationTrace] || [];
        trace = [new LongStackTrace()].concat(trace);
        if (trace.length > this.longStackTraceLimit) {
          trace.length = this.longStackTraceLimit;
        }
        if (!task.data)
          task.data = {};
        if (task.type === "eventTask") {
          task.data = __spreadValues({}, task.data);
        }
        task.data[creationTrace] = trace;
      }
      return parentZoneDelegate.scheduleTask(targetZone, task);
    },
    onHandleError: function(parentZoneDelegate, currentZone, targetZone, error2) {
      if (stackTracesEnabled()) {
        const parentTask = Zone2.currentTask || error2.task;
        if (error2 instanceof Error && parentTask) {
          const longStack = renderLongStackTrace(parentTask.data && parentTask.data[creationTrace], error2.stack);
          try {
            error2.stack = error2.longStack = longStack;
          } catch (err) {
          }
        }
      }
      return parentZoneDelegate.handleError(targetZone, error2);
    }
  };
  function captureStackTraces(stackTraces, count) {
    if (count > 0) {
      stackTraces.push(getFrames(new LongStackTrace().error));
      captureStackTraces(stackTraces, count - 1);
    }
  }
  function computeIgnoreFrames() {
    if (!stackTracesEnabled()) {
      return;
    }
    const frames = [];
    captureStackTraces(frames, 2);
    const frames1 = frames[0];
    const frames2 = frames[1];
    for (let i = 0; i < frames1.length; i++) {
      const frame1 = frames1[i];
      if (frame1.indexOf(ERROR_TAG) == -1) {
        let match = frame1.match(/^\s*at\s+/);
        if (match) {
          sepTemplate = match[0] + SEP_TAG + " (http://localhost)";
          break;
        }
      }
    }
    for (let i = 0; i < frames1.length; i++) {
      const frame1 = frames1[i];
      const frame2 = frames2[i];
      if (frame1 === frame2) {
        IGNORE_FRAMES[frame1] = true;
      } else {
        break;
      }
    }
  }
  computeIgnoreFrames();
}
var ProxyZoneSpec = class _ProxyZoneSpec {
  defaultSpecDelegate;
  name = "ProxyZone";
  _delegateSpec = null;
  properties = { "ProxyZoneSpec": this };
  propertyKeys = null;
  lastTaskState = null;
  isNeedToTriggerHasTask = false;
  tasks = [];
  static get() {
    return Zone.current.get("ProxyZoneSpec");
  }
  static isLoaded() {
    return _ProxyZoneSpec.get() instanceof _ProxyZoneSpec;
  }
  static assertPresent() {
    const spec = _ProxyZoneSpec.get();
    if (spec === void 0) {
      throw new Error(`Expected to be running in 'ProxyZone', but it was not found.`);
    }
    return spec;
  }
  constructor(defaultSpecDelegate = null) {
    this.defaultSpecDelegate = defaultSpecDelegate;
    this.setDelegate(defaultSpecDelegate);
  }
  setDelegate(delegateSpec) {
    const isNewDelegate = this._delegateSpec !== delegateSpec;
    this._delegateSpec = delegateSpec;
    this.propertyKeys && this.propertyKeys.forEach((key) => delete this.properties[key]);
    this.propertyKeys = null;
    if (delegateSpec && delegateSpec.properties) {
      this.propertyKeys = Object.keys(delegateSpec.properties);
      this.propertyKeys.forEach((k) => this.properties[k] = delegateSpec.properties[k]);
    }
    if (isNewDelegate && this.lastTaskState && (this.lastTaskState.macroTask || this.lastTaskState.microTask)) {
      this.isNeedToTriggerHasTask = true;
    }
  }
  getDelegate() {
    return this._delegateSpec;
  }
  resetDelegate() {
    this.getDelegate();
    this.setDelegate(this.defaultSpecDelegate);
  }
  tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone) {
    if (this.isNeedToTriggerHasTask && this.lastTaskState) {
      this.isNeedToTriggerHasTask = false;
      this.onHasTask(parentZoneDelegate, currentZone, targetZone, this.lastTaskState);
    }
  }
  removeFromTasks(task) {
    if (!this.tasks) {
      return;
    }
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i] === task) {
        this.tasks.splice(i, 1);
        return;
      }
    }
  }
  getAndClearPendingTasksInfo() {
    if (this.tasks.length === 0) {
      return "";
    }
    const taskInfo = this.tasks.map((task) => {
      const dataInfo = task.data && Object.keys(task.data).map((key) => {
        return key + ":" + task.data[key];
      }).join(",");
      return `type: ${task.type}, source: ${task.source}, args: {${dataInfo}}`;
    });
    const pendingTasksInfo = "--Pending async tasks are: [" + taskInfo + "]";
    this.tasks = [];
    return pendingTasksInfo;
  }
  onFork(parentZoneDelegate, currentZone, targetZone, zoneSpec) {
    if (this._delegateSpec && this._delegateSpec.onFork) {
      return this._delegateSpec.onFork(parentZoneDelegate, currentZone, targetZone, zoneSpec);
    } else {
      return parentZoneDelegate.fork(targetZone, zoneSpec);
    }
  }
  onIntercept(parentZoneDelegate, currentZone, targetZone, delegate, source) {
    if (this._delegateSpec && this._delegateSpec.onIntercept) {
      return this._delegateSpec.onIntercept(parentZoneDelegate, currentZone, targetZone, delegate, source);
    } else {
      return parentZoneDelegate.intercept(targetZone, delegate, source);
    }
  }
  onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
    this.tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone);
    if (this._delegateSpec && this._delegateSpec.onInvoke) {
      return this._delegateSpec.onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source);
    } else {
      return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
    }
  }
  onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
    if (this._delegateSpec && this._delegateSpec.onHandleError) {
      return this._delegateSpec.onHandleError(parentZoneDelegate, currentZone, targetZone, error);
    } else {
      return parentZoneDelegate.handleError(targetZone, error);
    }
  }
  onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
    if (task.type !== "eventTask") {
      this.tasks.push(task);
    }
    if (this._delegateSpec && this._delegateSpec.onScheduleTask) {
      return this._delegateSpec.onScheduleTask(parentZoneDelegate, currentZone, targetZone, task);
    } else {
      return parentZoneDelegate.scheduleTask(targetZone, task);
    }
  }
  onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
    if (task.type !== "eventTask") {
      this.removeFromTasks(task);
    }
    this.tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone);
    if (this._delegateSpec && this._delegateSpec.onInvokeTask) {
      return this._delegateSpec.onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs);
    } else {
      return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
    }
  }
  onCancelTask(parentZoneDelegate, currentZone, targetZone, task) {
    if (task.type !== "eventTask") {
      this.removeFromTasks(task);
    }
    this.tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone);
    if (this._delegateSpec && this._delegateSpec.onCancelTask) {
      return this._delegateSpec.onCancelTask(parentZoneDelegate, currentZone, targetZone, task);
    } else {
      return parentZoneDelegate.cancelTask(targetZone, task);
    }
  }
  onHasTask(delegate, current, target, hasTaskState) {
    this.lastTaskState = hasTaskState;
    if (this._delegateSpec && this._delegateSpec.onHasTask) {
      this._delegateSpec.onHasTask(delegate, current, target, hasTaskState);
    } else {
      delegate.hasTask(target, hasTaskState);
    }
  }
};
function patchProxyZoneSpec(Zone2) {
  Zone2["ProxyZoneSpec"] = ProxyZoneSpec;
}
function patchSyncTest(Zone2) {
  class SyncTestZoneSpec {
    runZone = Zone2.current;
    constructor(namePrefix) {
      this.name = "syncTestZone for " + namePrefix;
    }
    // ZoneSpec implementation below.
    name;
    onScheduleTask(delegate, current, target, task) {
      switch (task.type) {
        case "microTask":
        case "macroTask":
          throw new Error(`Cannot call ${task.source} from within a sync test (${this.name}).`);
        case "eventTask":
          task = delegate.scheduleTask(target, task);
          break;
      }
      return task;
    }
  }
  Zone2["SyncTestZoneSpec"] = SyncTestZoneSpec;
}
function patchPromiseTesting(Zone2) {
  Zone2.__load_patch("promisefortest", (global3, Zone3, api) => {
    const symbolState = api.symbol("state");
    const UNRESOLVED = null;
    const symbolParentUnresolved = api.symbol("parentUnresolved");
    Promise[api.symbol("patchPromiseForTest")] = function patchPromiseForTest() {
      let oriThen = Promise[Zone3.__symbol__("ZonePromiseThen")];
      if (oriThen) {
        return;
      }
      oriThen = Promise[Zone3.__symbol__("ZonePromiseThen")] = Promise.prototype.then;
      Promise.prototype.then = function() {
        const chained = oriThen.apply(this, arguments);
        if (this[symbolState] === UNRESOLVED) {
          const asyncTestZoneSpec = Zone3.current.get("AsyncTestZoneSpec");
          if (asyncTestZoneSpec) {
            asyncTestZoneSpec.unresolvedChainedPromiseCount++;
            chained[symbolParentUnresolved] = true;
          }
        }
        return chained;
      };
    };
    Promise[api.symbol("unPatchPromiseForTest")] = function unpatchPromiseForTest() {
      const oriThen = Promise[Zone3.__symbol__("ZonePromiseThen")];
      if (oriThen) {
        Promise.prototype.then = oriThen;
        Promise[Zone3.__symbol__("ZonePromiseThen")] = void 0;
      }
    };
  });
}
function rollupTesting(Zone2) {
  patchLongStackTrace(Zone2);
  patchProxyZoneSpec(Zone2);
  patchSyncTest(Zone2);
  patchJasmine(Zone2);
  patchJest(Zone2);
  patchMocha(Zone2);
  patchAsyncTest(Zone2);
  patchFakeAsyncTest(Zone2);
  patchPromiseTesting(Zone2);
}
rollupTesting(Zone);

// src/test.ts
init_testing();

// node_modules/@angular/platform-browser-dynamic/fesm2022/testing.mjs
init_core();
init_core();

// node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs
init_core();
init_core();
init_compiler();

// node_modules/@angular/platform-browser/fesm2022/browser.mjs
init_common();
init_core();
init_core();

// node_modules/@angular/platform-browser/fesm2022/dom_renderer.mjs
init_common();
init_core();
init_core();
var EVENT_MANAGER_PLUGINS = new InjectionToken(ngDevMode ? "EventManagerPlugins" : "");
var EventManager = class _EventManager {
  _zone;
  _plugins;
  _eventNameToPlugin = /* @__PURE__ */ new Map();
  /**
   * Initializes an instance of the event-manager service.
   */
  constructor(plugins, _zone) {
    this._zone = _zone;
    plugins.forEach((plugin) => {
      plugin.manager = this;
    });
    this._plugins = plugins.slice().reverse();
  }
  /**
   * Registers a handler for a specific element and event.
   *
   * @param element The HTML element to receive event notifications.
   * @param eventName The name of the event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @param options Options that configure how the event listener is bound.
   * @returns  A callback function that can be used to remove the handler.
   */
  addEventListener(element, eventName, handler, options) {
    const plugin = this._findPluginFor(eventName);
    return plugin.addEventListener(element, eventName, handler, options);
  }
  /**
   * Retrieves the compilation zone in which event listeners are registered.
   */
  getZone() {
    return this._zone;
  }
  /** @internal */
  _findPluginFor(eventName) {
    let plugin = this._eventNameToPlugin.get(eventName);
    if (plugin) {
      return plugin;
    }
    const plugins = this._plugins;
    plugin = plugins.find((plugin2) => plugin2.supports(eventName));
    if (!plugin) {
      throw new RuntimeError(5101, (typeof ngDevMode === "undefined" || ngDevMode) && `No event manager plugin found for event ${eventName}`);
    }
    this._eventNameToPlugin.set(eventName, plugin);
    return plugin;
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _EventManager, deps: [{ token: EVENT_MANAGER_PLUGINS }, { token: NgZone }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _EventManager });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: EventManager, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [EVENT_MANAGER_PLUGINS]
}] }, { type: NgZone }] });
var EventManagerPlugin = class {
  _doc;
  // TODO: remove (has some usage in G3)
  constructor(_doc) {
    this._doc = _doc;
  }
  // Using non-null assertion because it's set by EventManager's constructor
  manager;
};
var APP_ID_ATTRIBUTE_NAME = "ng-app-id";
function removeElements(elements) {
  for (const element of elements) {
    element.remove();
  }
}
function createStyleElement(style, doc) {
  const styleElement = doc.createElement("style");
  styleElement.textContent = style;
  return styleElement;
}
function addServerStyles(doc, appId, inline, external) {
  const elements = doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${appId}"],link[${APP_ID_ATTRIBUTE_NAME}="${appId}"]`);
  if (elements) {
    for (const styleElement of elements) {
      styleElement.removeAttribute(APP_ID_ATTRIBUTE_NAME);
      if (styleElement instanceof HTMLLinkElement) {
        external.set(styleElement.href.slice(styleElement.href.lastIndexOf("/") + 1), {
          usage: 0,
          elements: [styleElement]
        });
      } else if (styleElement.textContent) {
        inline.set(styleElement.textContent, { usage: 0, elements: [styleElement] });
      }
    }
  }
}
function createLinkElement(url, doc) {
  const linkElement = doc.createElement("link");
  linkElement.setAttribute("rel", "stylesheet");
  linkElement.setAttribute("href", url);
  return linkElement;
}
var SharedStylesHost = class _SharedStylesHost {
  doc;
  appId;
  nonce;
  /**
   * Provides usage information for active inline style content and associated HTML <style> elements.
   * Embedded styles typically originate from the `styles` metadata of a rendered component.
   */
  inline = /* @__PURE__ */ new Map();
  /**
   * Provides usage information for active external style URLs and the associated HTML <link> elements.
   * External styles typically originate from the `ɵɵExternalStylesFeature` of a rendered component.
   */
  external = /* @__PURE__ */ new Map();
  /**
   * Set of host DOM nodes that will have styles attached.
   */
  hosts = /* @__PURE__ */ new Set();
  constructor(doc, appId, nonce, platformId = {}) {
    this.doc = doc;
    this.appId = appId;
    this.nonce = nonce;
    addServerStyles(doc, appId, this.inline, this.external);
    this.hosts.add(doc.head);
  }
  /**
   * Adds embedded styles to the DOM via HTML `style` elements.
   * @param styles An array of style content strings.
   */
  addStyles(styles, urls) {
    for (const value of styles) {
      this.addUsage(value, this.inline, createStyleElement);
    }
    urls?.forEach((value) => this.addUsage(value, this.external, createLinkElement));
  }
  /**
   * Removes embedded styles from the DOM that were added as HTML `style` elements.
   * @param styles An array of style content strings.
   */
  removeStyles(styles, urls) {
    for (const value of styles) {
      this.removeUsage(value, this.inline);
    }
    urls?.forEach((value) => this.removeUsage(value, this.external));
  }
  addUsage(value, usages, creator) {
    const record = usages.get(value);
    if (record) {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && record.usage === 0) {
        record.elements.forEach((element) => element.setAttribute("ng-style-reused", ""));
      }
      record.usage++;
    } else {
      usages.set(value, {
        usage: 1,
        elements: [...this.hosts].map((host) => this.addElement(host, creator(value, this.doc)))
      });
    }
  }
  removeUsage(value, usages) {
    const record = usages.get(value);
    if (record) {
      record.usage--;
      if (record.usage <= 0) {
        removeElements(record.elements);
        usages.delete(value);
      }
    }
  }
  ngOnDestroy() {
    for (const [, { elements }] of [...this.inline, ...this.external]) {
      removeElements(elements);
    }
    this.hosts.clear();
  }
  /**
   * Adds a host node to the set of style hosts and adds all existing style usage to
   * the newly added host node.
   *
   * This is currently only used for Shadow DOM encapsulation mode.
   */
  addHost(hostNode) {
    this.hosts.add(hostNode);
    for (const [style, { elements }] of this.inline) {
      elements.push(this.addElement(hostNode, createStyleElement(style, this.doc)));
    }
    for (const [url, { elements }] of this.external) {
      elements.push(this.addElement(hostNode, createLinkElement(url, this.doc)));
    }
  }
  removeHost(hostNode) {
    this.hosts.delete(hostNode);
  }
  addElement(host, element) {
    if (this.nonce) {
      element.setAttribute("nonce", this.nonce);
    }
    if (false) {
      element.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
    }
    return host.appendChild(element);
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _SharedStylesHost });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: SharedStylesHost, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: Document, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [APP_ID]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [CSP_NONCE]
}, {
  type: Optional
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [PLATFORM_ID]
}] }] });
var NAMESPACE_URIS = {
  "svg": "http://www.w3.org/2000/svg",
  "xhtml": "http://www.w3.org/1999/xhtml",
  "xlink": "http://www.w3.org/1999/xlink",
  "xml": "http://www.w3.org/XML/1998/namespace",
  "xmlns": "http://www.w3.org/2000/xmlns/",
  "math": "http://www.w3.org/1998/Math/MathML"
};
var COMPONENT_REGEX = /%COMP%/g;
var SOURCEMAP_URL_REGEXP = /\/\*#\s*sourceMappingURL=(.+?)\s*\*\//;
var PROTOCOL_REGEXP = /^https?:/;
var COMPONENT_VARIABLE = "%COMP%";
var HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
var CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
var REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
var REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken(ngDevMode ? "RemoveStylesOnCompDestroy" : "", {
  providedIn: "root",
  factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT
});
function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimStylesContent(compId, styles) {
  return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
function addBaseHrefToCssSourceMap(baseHref, styles) {
  if (!baseHref) {
    return styles;
  }
  const absoluteBaseHrefUrl = new URL(baseHref, "http://localhost");
  return styles.map((cssContent) => {
    if (!cssContent.includes("sourceMappingURL=")) {
      return cssContent;
    }
    return cssContent.replace(SOURCEMAP_URL_REGEXP, (_, sourceMapUrl) => {
      if (sourceMapUrl[0] === "/" || sourceMapUrl.startsWith("data:") || PROTOCOL_REGEXP.test(sourceMapUrl)) {
        return `/*# sourceMappingURL=${sourceMapUrl} */`;
      }
      const { pathname: resolvedSourceMapUrl } = new URL(sourceMapUrl, absoluteBaseHrefUrl);
      return `/*# sourceMappingURL=${resolvedSourceMapUrl} */`;
    });
  });
}
var DomRendererFactory2 = class _DomRendererFactory2 {
  eventManager;
  sharedStylesHost;
  appId;
  removeStylesOnCompDestroy;
  doc;
  platformId;
  ngZone;
  nonce;
  tracingService;
  rendererByCompId = /* @__PURE__ */ new Map();
  defaultRenderer;
  platformIsServer;
  constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, platformId, ngZone, nonce = null, tracingService = null) {
    this.eventManager = eventManager;
    this.sharedStylesHost = sharedStylesHost;
    this.appId = appId;
    this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
    this.doc = doc;
    this.platformId = platformId;
    this.ngZone = ngZone;
    this.nonce = nonce;
    this.tracingService = tracingService;
    this.platformIsServer = false;
    this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.platformIsServer, this.tracingService);
  }
  createRenderer(element, type) {
    if (!element || !type) {
      return this.defaultRenderer;
    }
    if (false) {
      type = __spreadProps(__spreadValues({}, type), { encapsulation: ViewEncapsulation.Emulated });
    }
    const renderer = this.getOrCreateRenderer(element, type);
    if (renderer instanceof EmulatedEncapsulationDomRenderer2) {
      renderer.applyToHost(element);
    } else if (renderer instanceof NoneEncapsulationDomRenderer) {
      renderer.applyStyles();
    }
    return renderer;
  }
  getOrCreateRenderer(element, type) {
    const rendererByCompId = this.rendererByCompId;
    let renderer = rendererByCompId.get(type.id);
    if (!renderer) {
      const doc = this.doc;
      const ngZone = this.ngZone;
      const eventManager = this.eventManager;
      const sharedStylesHost = this.sharedStylesHost;
      const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
      const platformIsServer = this.platformIsServer;
      const tracingService = this.tracingService;
      switch (type.encapsulation) {
        case ViewEncapsulation.Emulated:
          renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService);
          break;
        case ViewEncapsulation.ShadowDom:
          return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer, tracingService);
        default:
          renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService);
          break;
      }
      rendererByCompId.set(type.id, renderer);
    }
    return renderer;
  }
  ngOnDestroy() {
    this.rendererByCompId.clear();
  }
  /**
   * Used during HMR to clear any cached data about a component.
   * @param componentId ID of the component that is being replaced.
   */
  componentReplaced(componentId) {
    this.rendererByCompId.delete(componentId);
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomRendererFactory2, deps: [{ token: EventManager }, { token: SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: NgZone }, { token: CSP_NONCE }, { token: TracingService, optional: true }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomRendererFactory2 });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: DomRendererFactory2, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: EventManager }, { type: SharedStylesHost }, { type: void 0, decorators: [{
  type: Inject,
  args: [APP_ID]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
}] }, { type: Document, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }, { type: Object, decorators: [{
  type: Inject,
  args: [PLATFORM_ID]
}] }, { type: NgZone }, { type: void 0, decorators: [{
  type: Inject,
  args: [CSP_NONCE]
}] }, { type: TracingService, decorators: [{
  type: Inject,
  args: [TracingService]
}, {
  type: Optional
}] }] });
var DefaultDomRenderer2 = class {
  eventManager;
  doc;
  ngZone;
  platformIsServer;
  tracingService;
  data = /* @__PURE__ */ Object.create(null);
  /**
   * By default this renderer throws when encountering synthetic properties
   * This can be disabled for example by the AsyncAnimationRendererFactory
   */
  throwOnSyntheticProps = true;
  constructor(eventManager, doc, ngZone, platformIsServer, tracingService) {
    this.eventManager = eventManager;
    this.doc = doc;
    this.ngZone = ngZone;
    this.platformIsServer = platformIsServer;
    this.tracingService = tracingService;
  }
  destroy() {
  }
  destroyNode = null;
  createElement(name, namespace) {
    if (namespace) {
      return this.doc.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
    }
    return this.doc.createElement(name);
  }
  createComment(value) {
    return this.doc.createComment(value);
  }
  createText(value) {
    return this.doc.createTextNode(value);
  }
  appendChild(parent, newChild) {
    const targetParent = isTemplateNode(parent) ? parent.content : parent;
    targetParent.appendChild(newChild);
  }
  insertBefore(parent, newChild, refChild) {
    if (parent) {
      const targetParent = isTemplateNode(parent) ? parent.content : parent;
      targetParent.insertBefore(newChild, refChild);
    }
  }
  removeChild(_parent, oldChild) {
    oldChild.remove();
  }
  selectRootElement(selectorOrNode, preserveContent) {
    let el = typeof selectorOrNode === "string" ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
    if (!el) {
      throw new RuntimeError(-5104, (typeof ngDevMode === "undefined" || ngDevMode) && `The selector "${selectorOrNode}" did not match any elements`);
    }
    if (!preserveContent) {
      el.textContent = "";
    }
    return el;
  }
  parentNode(node) {
    return node.parentNode;
  }
  nextSibling(node) {
    return node.nextSibling;
  }
  setAttribute(el, name, value, namespace) {
    if (namespace) {
      name = namespace + ":" + name;
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.setAttributeNS(namespaceUri, name, value);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
    }
  }
  removeAttribute(el, name, namespace) {
    if (namespace) {
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }
  addClass(el, name) {
    el.classList.add(name);
  }
  removeClass(el, name) {
    el.classList.remove(name);
  }
  setStyle(el, style, value, flags) {
    if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
      el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? "important" : "");
    } else {
      el.style[style] = value;
    }
  }
  removeStyle(el, style, flags) {
    if (flags & RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      el.style[style] = "";
    }
  }
  setProperty(el, name, value) {
    if (el == null) {
      return;
    }
    (typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(name, "property");
    el[name] = value;
  }
  setValue(node, value) {
    node.nodeValue = value;
  }
  listen(target, event, callback, options) {
    (typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(event, "listener");
    if (typeof target === "string") {
      target = getDOM().getGlobalEventTarget(this.doc, target);
      if (!target) {
        throw new RuntimeError(5102, (typeof ngDevMode === "undefined" || ngDevMode) && `Unsupported event target ${target} for event ${event}`);
      }
    }
    let wrappedCallback = this.decoratePreventDefault(callback);
    if (this.tracingService?.wrapEventListener) {
      wrappedCallback = this.tracingService.wrapEventListener(target, event, wrappedCallback);
    }
    return this.eventManager.addEventListener(target, event, wrappedCallback, options);
  }
  decoratePreventDefault(eventHandler) {
    return (event) => {
      if (event === "__ngUnwrap__") {
        return eventHandler;
      }
      const allowDefaultBehavior = false ? this.ngZone.runGuarded(() => eventHandler(event)) : eventHandler(event);
      if (allowDefaultBehavior === false) {
        event.preventDefault();
      }
      return void 0;
    };
  }
};
var AT_CHARCODE = (() => "@".charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new RuntimeError(5105, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Make sure \`provideAnimationsAsync()\`, \`provideAnimations()\` or \`provideNoopAnimations()\` call was added to a list of providers used to bootstrap an application.
  - There is a corresponding animation configuration named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.dev/api/core/Component#animations).`);
  }
}
function isTemplateNode(node) {
  return node.tagName === "TEMPLATE" && node.content !== void 0;
}
var ShadowDomRenderer = class extends DefaultDomRenderer2 {
  sharedStylesHost;
  hostEl;
  shadowRoot;
  constructor(eventManager, sharedStylesHost, hostEl, component, doc, ngZone, nonce, platformIsServer, tracingService) {
    super(eventManager, doc, ngZone, platformIsServer, tracingService);
    this.sharedStylesHost = sharedStylesHost;
    this.hostEl = hostEl;
    this.shadowRoot = hostEl.attachShadow({ mode: "open" });
    this.sharedStylesHost.addHost(this.shadowRoot);
    let styles = component.styles;
    if (ngDevMode) {
      const baseHref = getDOM().getBaseHref(doc) ?? "";
      styles = addBaseHrefToCssSourceMap(baseHref, styles);
    }
    styles = shimStylesContent(component.id, styles);
    for (const style of styles) {
      const styleEl = document.createElement("style");
      if (nonce) {
        styleEl.setAttribute("nonce", nonce);
      }
      styleEl.textContent = style;
      this.shadowRoot.appendChild(styleEl);
    }
    const styleUrls = component.getExternalStyles?.();
    if (styleUrls) {
      for (const styleUrl of styleUrls) {
        const linkEl = createLinkElement(styleUrl, doc);
        if (nonce) {
          linkEl.setAttribute("nonce", nonce);
        }
        this.shadowRoot.appendChild(linkEl);
      }
    }
  }
  nodeOrShadowRoot(node) {
    return node === this.hostEl ? this.shadowRoot : node;
  }
  appendChild(parent, newChild) {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }
  insertBefore(parent, newChild, refChild) {
    return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
  }
  removeChild(_parent, oldChild) {
    return super.removeChild(null, oldChild);
  }
  parentNode(node) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }
  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot);
  }
};
var NoneEncapsulationDomRenderer = class extends DefaultDomRenderer2 {
  sharedStylesHost;
  removeStylesOnCompDestroy;
  styles;
  styleUrls;
  constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, compId) {
    super(eventManager, doc, ngZone, platformIsServer, tracingService);
    this.sharedStylesHost = sharedStylesHost;
    this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
    let styles = component.styles;
    if (ngDevMode) {
      const baseHref = getDOM().getBaseHref(doc) ?? "";
      styles = addBaseHrefToCssSourceMap(baseHref, styles);
    }
    this.styles = compId ? shimStylesContent(compId, styles) : styles;
    this.styleUrls = component.getExternalStyles?.(compId);
  }
  applyStyles() {
    this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
  }
  destroy() {
    if (!this.removeStylesOnCompDestroy) {
      return;
    }
    this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
  }
};
var EmulatedEncapsulationDomRenderer2 = class extends NoneEncapsulationDomRenderer {
  contentAttr;
  hostAttr;
  constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService) {
    const compId = appId + "-" + component.id;
    super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, compId);
    this.contentAttr = shimContentAttribute(compId);
    this.hostAttr = shimHostAttribute(compId);
  }
  applyToHost(element) {
    this.applyStyles();
    this.setAttribute(element, this.hostAttr, "");
  }
  createElement(parent, name) {
    const el = super.createElement(parent, name);
    super.setAttribute(el, this.contentAttr, "");
    return el;
  }
};

// node_modules/@angular/platform-browser/fesm2022/browser.mjs
var BrowserDomAdapter = class _BrowserDomAdapter extends DomAdapter {
  supportsDOMEvents = true;
  static makeCurrent() {
    setRootDomAdapter(new _BrowserDomAdapter());
  }
  onAndCancel(el, evt, listener, options) {
    el.addEventListener(evt, listener, options);
    return () => {
      el.removeEventListener(evt, listener, options);
    };
  }
  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
  }
  remove(node) {
    node.remove();
  }
  createElement(tagName, doc) {
    doc = doc || this.getDefaultDocument();
    return doc.createElement(tagName);
  }
  createHtmlDocument() {
    return document.implementation.createHTMLDocument("fakeTitle");
  }
  getDefaultDocument() {
    return document;
  }
  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }
  isShadowRoot(node) {
    return node instanceof DocumentFragment;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
  getGlobalEventTarget(doc, target) {
    if (target === "window") {
      return window;
    }
    if (target === "document") {
      return doc;
    }
    if (target === "body") {
      return doc.body;
    }
    return null;
  }
  getBaseHref(doc) {
    const href = getBaseElementHref();
    return href == null ? null : relativePath(href);
  }
  resetBaseElement() {
    baseElement = null;
  }
  getUserAgent() {
    return window.navigator.userAgent;
  }
  getCookie(name) {
    return parseCookieValue(document.cookie, name);
  }
};
var baseElement = null;
function getBaseElementHref() {
  baseElement = baseElement || document.head.querySelector("base");
  return baseElement ? baseElement.getAttribute("href") : null;
}
function relativePath(url) {
  return new URL(url, document.baseURI).pathname;
}
var BrowserGetTestability = class {
  addToWindow(registry) {
    _global["getAngularTestability"] = (elem, findInAncestors = true) => {
      const testability = registry.findTestabilityInTree(elem, findInAncestors);
      if (testability == null) {
        throw new RuntimeError(5103, (typeof ngDevMode === "undefined" || ngDevMode) && "Could not find testability for element.");
      }
      return testability;
    };
    _global["getAllAngularTestabilities"] = () => registry.getAllTestabilities();
    _global["getAllAngularRootElements"] = () => registry.getAllRootElements();
    const whenAllStable = (callback) => {
      const testabilities = _global["getAllAngularTestabilities"]();
      let count = testabilities.length;
      const decrement = function() {
        count--;
        if (count == 0) {
          callback();
        }
      };
      testabilities.forEach((testability) => {
        testability.whenStable(decrement);
      });
    };
    if (!_global["frameworkStabilizers"]) {
      _global["frameworkStabilizers"] = [];
    }
    _global["frameworkStabilizers"].push(whenAllStable);
  }
  findTestabilityInTree(registry, elem, findInAncestors) {
    if (elem == null) {
      return null;
    }
    const t = registry.getTestability(elem);
    if (t != null) {
      return t;
    } else if (!findInAncestors) {
      return null;
    }
    if (getDOM().isShadowRoot(elem)) {
      return this.findTestabilityInTree(registry, elem.host, true);
    }
    return this.findTestabilityInTree(registry, elem.parentElement, true);
  }
};
var BrowserXhr = class _BrowserXhr {
  build() {
    return new XMLHttpRequest();
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserXhr, deps: [], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserXhr });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: BrowserXhr, decorators: [{
  type: Injectable
}] });
var DomEventsPlugin = class _DomEventsPlugin extends EventManagerPlugin {
  constructor(doc) {
    super(doc);
  }
  // This plugin should come last in the list of plugins, because it accepts all
  // events.
  supports(eventName) {
    return true;
  }
  addEventListener(element, eventName, handler, options) {
    element.addEventListener(eventName, handler, options);
    return () => this.removeEventListener(element, eventName, handler, options);
  }
  removeEventListener(target, eventName, callback, options) {
    return target.removeEventListener(eventName, callback, options);
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomEventsPlugin, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomEventsPlugin });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: DomEventsPlugin, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
var MODIFIER_KEYS = ["alt", "control", "meta", "shift"];
var _keyMap = {
  "\b": "Backspace",
  "	": "Tab",
  "\x7F": "Delete",
  "\x1B": "Escape",
  "Del": "Delete",
  "Esc": "Escape",
  "Left": "ArrowLeft",
  "Right": "ArrowRight",
  "Up": "ArrowUp",
  "Down": "ArrowDown",
  "Menu": "ContextMenu",
  "Scroll": "ScrollLock",
  "Win": "OS"
};
var MODIFIER_KEY_GETTERS = {
  "alt": (event) => event.altKey,
  "control": (event) => event.ctrlKey,
  "meta": (event) => event.metaKey,
  "shift": (event) => event.shiftKey
};
var KeyEventsPlugin = class _KeyEventsPlugin extends EventManagerPlugin {
  /**
   * Initializes an instance of the browser plug-in.
   * @param doc The document in which key events will be detected.
   */
  constructor(doc) {
    super(doc);
  }
  /**
   * Reports whether a named key event is supported.
   * @param eventName The event name to query.
   * @return True if the named key event is supported.
   */
  supports(eventName) {
    return _KeyEventsPlugin.parseEventName(eventName) != null;
  }
  /**
   * Registers a handler for a specific element and key event.
   * @param element The HTML element to receive event notifications.
   * @param eventName The name of the key event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @returns The key event that was registered.
   */
  addEventListener(element, eventName, handler, options) {
    const parsedEvent = _KeyEventsPlugin.parseEventName(eventName);
    const outsideHandler = _KeyEventsPlugin.eventCallback(parsedEvent["fullKey"], handler, this.manager.getZone());
    return this.manager.getZone().runOutsideAngular(() => {
      return getDOM().onAndCancel(element, parsedEvent["domEventName"], outsideHandler, options);
    });
  }
  /**
   * Parses the user provided full keyboard event definition and normalizes it for
   * later internal use. It ensures the string is all lowercase, converts special
   * characters to a standard spelling, and orders all the values consistently.
   *
   * @param eventName The name of the key event to listen for.
   * @returns an object with the full, normalized string, and the dom event name
   * or null in the case when the event doesn't match a keyboard event.
   */
  static parseEventName(eventName) {
    const parts = eventName.toLowerCase().split(".");
    const domEventName = parts.shift();
    if (parts.length === 0 || !(domEventName === "keydown" || domEventName === "keyup")) {
      return null;
    }
    const key = _KeyEventsPlugin._normalizeKey(parts.pop());
    let fullKey = "";
    let codeIX = parts.indexOf("code");
    if (codeIX > -1) {
      parts.splice(codeIX, 1);
      fullKey = "code.";
    }
    MODIFIER_KEYS.forEach((modifierName) => {
      const index = parts.indexOf(modifierName);
      if (index > -1) {
        parts.splice(index, 1);
        fullKey += modifierName + ".";
      }
    });
    fullKey += key;
    if (parts.length != 0 || key.length === 0) {
      return null;
    }
    const result = {};
    result["domEventName"] = domEventName;
    result["fullKey"] = fullKey;
    return result;
  }
  /**
   * Determines whether the actual keys pressed match the configured key code string.
   * The `fullKeyCode` event is normalized in the `parseEventName` method when the
   * event is attached to the DOM during the `addEventListener` call. This is unseen
   * by the end user and is normalized for internal consistency and parsing.
   *
   * @param event The keyboard event.
   * @param fullKeyCode The normalized user defined expected key event string
   * @returns boolean.
   */
  static matchEventFullKeyCode(event, fullKeyCode) {
    let keycode = _keyMap[event.key] || event.key;
    let key = "";
    if (fullKeyCode.indexOf("code.") > -1) {
      keycode = event.code;
      key = "code.";
    }
    if (keycode == null || !keycode)
      return false;
    keycode = keycode.toLowerCase();
    if (keycode === " ") {
      keycode = "space";
    } else if (keycode === ".") {
      keycode = "dot";
    }
    MODIFIER_KEYS.forEach((modifierName) => {
      if (modifierName !== keycode) {
        const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
        if (modifierGetter(event)) {
          key += modifierName + ".";
        }
      }
    });
    key += keycode;
    return key === fullKeyCode;
  }
  /**
   * Configures a handler callback for a key event.
   * @param fullKey The event name that combines all simultaneous keystrokes.
   * @param handler The function that responds to the key event.
   * @param zone The zone in which the event occurred.
   * @returns A callback function.
   */
  static eventCallback(fullKey, handler, zone) {
    return (event) => {
      if (_KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) {
        zone.runGuarded(() => handler(event));
      }
    };
  }
  /** @internal */
  static _normalizeKey(keyName) {
    return keyName === "esc" ? "escape" : keyName;
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _KeyEventsPlugin, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _KeyEventsPlugin });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: KeyEventsPlugin, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
function initDomAdapter() {
  BrowserDomAdapter.makeCurrent();
}
function errorHandler() {
  return new ErrorHandler();
}
function _document() {
  setDocument(document);
  return document;
}
var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
  { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID },
  { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
  { provide: DOCUMENT, useFactory: _document }
];
var platformBrowser = createPlatformFactory(platformCore, "browser", INTERNAL_BROWSER_PLATFORM_PROVIDERS);
var BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "BrowserModule Providers Marker" : "");
var TESTABILITY_PROVIDERS = [
  {
    provide: TESTABILITY_GETTER,
    useClass: BrowserGetTestability
  },
  {
    provide: TESTABILITY,
    useClass: Testability,
    deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
  },
  {
    provide: Testability,
    // Also provide as `Testability` for backwards-compatibility.
    useClass: Testability,
    deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
  }
];
var BROWSER_MODULE_PROVIDERS = [
  { provide: INJECTOR_SCOPE, useValue: "root" },
  { provide: ErrorHandler, useFactory: errorHandler },
  {
    provide: EVENT_MANAGER_PLUGINS,
    useClass: DomEventsPlugin,
    multi: true,
    deps: [DOCUMENT]
  },
  { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
  DomRendererFactory2,
  SharedStylesHost,
  EventManager,
  { provide: RendererFactory2, useExisting: DomRendererFactory2 },
  { provide: XhrFactory, useClass: BrowserXhr },
  typeof ngDevMode === "undefined" || ngDevMode ? { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true } : []
];
var BrowserModule = class _BrowserModule {
  constructor() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const providersAlreadyPresent = inject(BROWSER_MODULE_PROVIDERS_MARKER, {
        optional: true,
        skipSelf: true
      });
      if (providersAlreadyPresent) {
        throw new RuntimeError(5100, `Providers from the \`BrowserModule\` have already been loaded. If you need access to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
      }
    }
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserModule, deps: [], target: FactoryTarget.NgModule });
  static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserModule, exports: [CommonModule, ApplicationModule] });
  static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: BrowserModule, decorators: [{
  type: NgModule,
  args: [{
    providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
    exports: [CommonModule, ApplicationModule]
  }]
}], ctorParameters: () => [] });

// node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs
init_common();
init_core();
init_core();
var Meta = class _Meta {
  _doc;
  _dom;
  constructor(_doc) {
    this._doc = _doc;
    this._dom = getDOM();
  }
  /**
   * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   * If an existing element is found, it is returned and is not modified in any way.
   * @param tag The definition of a `<meta>` element to match or create.
   * @param forceCreation True to create a new element without checking whether one already exists.
   * @returns The existing element with the same attributes and values if found,
   * the new element if no match is found, or `null` if the tag parameter is not defined.
   */
  addTag(tag, forceCreation = false) {
    if (!tag)
      return null;
    return this._getOrCreateElement(tag, forceCreation);
  }
  /**
   * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   * @param tags An array of tag definitions to match or create.
   * @param forceCreation True to create new elements without checking whether they already exist.
   * @returns The matching elements if found, or the new elements.
   */
  addTags(tags, forceCreation = false) {
    if (!tags)
      return [];
    return tags.reduce((result, tag) => {
      if (tag) {
        result.push(this._getOrCreateElement(tag, forceCreation));
      }
      return result;
    }, []);
  }
  /**
   * Retrieves a `<meta>` tag element in the current HTML document.
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   * @returns The matching element, if any.
   */
  getTag(attrSelector) {
    if (!attrSelector)
      return null;
    return this._doc.querySelector(`meta[${attrSelector}]`) || null;
  }
  /**
   * Retrieves a set of `<meta>` tag elements in the current HTML document.
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   * @returns The matching elements, if any.
   */
  getTags(attrSelector) {
    if (!attrSelector)
      return [];
    const list = this._doc.querySelectorAll(`meta[${attrSelector}]`);
    return list ? [].slice.call(list) : [];
  }
  /**
   * Modifies an existing `<meta>` tag element in the current HTML document.
   * @param tag The tag description with which to replace the existing tag content.
   * @param selector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   * If not supplied, matches a tag with the same `name` or `property` attribute value as the
   * replacement tag.
   * @return The modified element.
   */
  updateTag(tag, selector) {
    if (!tag)
      return null;
    selector = selector || this._parseSelector(tag);
    const meta = this.getTag(selector);
    if (meta) {
      return this._setMetaElementAttributes(tag, meta);
    }
    return this._getOrCreateElement(tag, true);
  }
  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   * @param attrSelector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   */
  removeTag(attrSelector) {
    this.removeTagElement(this.getTag(attrSelector));
  }
  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   * @param meta The tag definition to match against to identify an existing tag.
   */
  removeTagElement(meta) {
    if (meta) {
      this._dom.remove(meta);
    }
  }
  _getOrCreateElement(meta, forceCreation = false) {
    if (!forceCreation) {
      const selector = this._parseSelector(meta);
      const elem = this.getTags(selector).filter((elem2) => this._containsAttributes(meta, elem2))[0];
      if (elem !== void 0)
        return elem;
    }
    const element = this._dom.createElement("meta");
    this._setMetaElementAttributes(meta, element);
    const head = this._doc.getElementsByTagName("head")[0];
    head.appendChild(element);
    return element;
  }
  _setMetaElementAttributes(tag, el) {
    Object.keys(tag).forEach((prop) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
    return el;
  }
  _parseSelector(tag) {
    const attr = tag.name ? "name" : "property";
    return `${attr}="${tag[attr]}"`;
  }
  _containsAttributes(tag, elem) {
    return Object.keys(tag).every((key) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
  }
  _getMetaKeyMap(prop) {
    return META_KEYS_MAP[prop] || prop;
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _Meta, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _Meta, providedIn: "root" });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: Meta, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
var META_KEYS_MAP = {
  httpEquiv: "http-equiv"
};
var Title = class _Title {
  _doc;
  constructor(_doc) {
    this._doc = _doc;
  }
  /**
   * Get the title of the current HTML document.
   */
  getTitle() {
    return this._doc.title;
  }
  /**
   * Set the title of the current HTML document.
   * @param newTitle
   */
  setTitle(newTitle) {
    this._doc.title = newTitle || "";
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _Title, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _Title, providedIn: "root" });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: Title, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
var EVENT_NAMES = {
  // pan
  "pan": true,
  "panstart": true,
  "panmove": true,
  "panend": true,
  "pancancel": true,
  "panleft": true,
  "panright": true,
  "panup": true,
  "pandown": true,
  // pinch
  "pinch": true,
  "pinchstart": true,
  "pinchmove": true,
  "pinchend": true,
  "pinchcancel": true,
  "pinchin": true,
  "pinchout": true,
  // press
  "press": true,
  "pressup": true,
  // rotate
  "rotate": true,
  "rotatestart": true,
  "rotatemove": true,
  "rotateend": true,
  "rotatecancel": true,
  // swipe
  "swipe": true,
  "swipeleft": true,
  "swiperight": true,
  "swipeup": true,
  "swipedown": true,
  // tap
  "tap": true,
  "doubletap": true
};
var HAMMER_GESTURE_CONFIG = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "HammerGestureConfig" : "");
var HAMMER_LOADER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "HammerLoader" : "");
var HammerGestureConfig = class _HammerGestureConfig {
  /**
   * A set of supported event names for gestures to be used in Angular.
   * Angular supports all built-in recognizers, as listed in
   * [HammerJS documentation](https://hammerjs.github.io/).
   */
  events = [];
  /**
   * Maps gesture event names to a set of configuration options
   * that specify overrides to the default values for specific properties.
   *
   * The key is a supported event name to be configured,
   * and the options object contains a set of properties, with override values
   * to be applied to the named recognizer event.
   * For example, to disable recognition of the rotate event, specify
   *  `{"rotate": {"enable": false}}`.
   *
   * Properties that are not present take the HammerJS default values.
   * For information about which properties are supported for which events,
   * and their allowed and default values, see
   * [HammerJS documentation](https://hammerjs.github.io/).
   *
   */
  overrides = {};
  /**
   * Properties whose default values can be overridden for a given event.
   * Different sets of properties apply to different events.
   * For information about which properties are supported for which events,
   * and their allowed and default values, see
   * [HammerJS documentation](https://hammerjs.github.io/).
   */
  options;
  /**
   * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
   * and attaches it to a given HTML element.
   * @param element The element that will recognize gestures.
   * @returns A HammerJS event-manager object.
   */
  buildHammer(element) {
    const mc = new Hammer(element, this.options);
    mc.get("pinch").set({ enable: true });
    mc.get("rotate").set({ enable: true });
    for (const eventName in this.overrides) {
      mc.get(eventName).set(this.overrides[eventName]);
    }
    return mc;
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _HammerGestureConfig, deps: [], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _HammerGestureConfig });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: HammerGestureConfig, decorators: [{
  type: Injectable
}] });
var HammerGesturesPlugin = class _HammerGesturesPlugin extends EventManagerPlugin {
  _config;
  _injector;
  loader;
  _loaderPromise = null;
  constructor(doc, _config, _injector, loader) {
    super(doc);
    this._config = _config;
    this._injector = _injector;
    this.loader = loader;
  }
  supports(eventName) {
    if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
      return false;
    }
    if (!window.Hammer && !this.loader) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        const _console = this._injector.get(Console);
        _console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.`);
      }
      return false;
    }
    return true;
  }
  addEventListener(element, eventName, handler) {
    const zone = this.manager.getZone();
    eventName = eventName.toLowerCase();
    if (!window.Hammer && this.loader) {
      this._loaderPromise = this._loaderPromise || zone.runOutsideAngular(() => this.loader());
      let cancelRegistration = false;
      let deregister = () => {
        cancelRegistration = true;
      };
      zone.runOutsideAngular(() => this._loaderPromise.then(() => {
        if (!window.Hammer) {
          if (typeof ngDevMode === "undefined" || ngDevMode) {
            const _console = this._injector.get(Console);
            _console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
          }
          deregister = () => {
          };
          return;
        }
        if (!cancelRegistration) {
          deregister = this.addEventListener(element, eventName, handler);
        }
      }).catch(() => {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          const _console = this._injector.get(Console);
          _console.warn(`The "${eventName}" event cannot be bound because the custom Hammer.JS loader failed.`);
        }
        deregister = () => {
        };
      }));
      return () => {
        deregister();
      };
    }
    return zone.runOutsideAngular(() => {
      const mc = this._config.buildHammer(element);
      const callback = function(eventObj) {
        zone.runGuarded(function() {
          handler(eventObj);
        });
      };
      mc.on(eventName, callback);
      return () => {
        mc.off(eventName, callback);
        if (typeof mc.destroy === "function") {
          mc.destroy();
        }
      };
    });
  }
  isCustomEvent(eventName) {
    return this._config.events.indexOf(eventName) > -1;
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _HammerGesturesPlugin, deps: [{ token: DOCUMENT }, { token: HAMMER_GESTURE_CONFIG }, { token: Injector }, { token: HAMMER_LOADER, optional: true }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _HammerGesturesPlugin });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: HammerGesturesPlugin, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }, { type: HammerGestureConfig, decorators: [{
  type: Inject,
  args: [HAMMER_GESTURE_CONFIG]
}] }, { type: Injector }, { type: void 0, decorators: [{
  type: Optional
}, {
  type: Inject,
  args: [HAMMER_LOADER]
}] }] });
var HammerModule = class _HammerModule {
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _HammerModule, deps: [], target: FactoryTarget.NgModule });
  static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.1.6", ngImport: core_exports, type: _HammerModule });
  static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _HammerModule, providers: [
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: HammerGesturesPlugin,
      multi: true,
      deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Injector, [new Optional(), HAMMER_LOADER]]
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }
  ] });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: HammerModule, decorators: [{
  type: NgModule,
  args: [{
    providers: [
      {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        multi: true,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Injector, [new Optional(), HAMMER_LOADER]]
      },
      { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }
    ]
  }]
}] });
var DomSanitizer = class _DomSanitizer {
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomSanitizer, deps: [], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomSanitizer, providedIn: "root", useExisting: forwardRef(() => DomSanitizerImpl) });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: DomSanitizer, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root", useExisting: forwardRef(() => DomSanitizerImpl) }]
}] });
var DomSanitizerImpl = class _DomSanitizerImpl extends DomSanitizer {
  _doc;
  constructor(_doc) {
    super();
    this._doc = _doc;
  }
  sanitize(ctx, value) {
    if (value == null)
      return null;
    switch (ctx) {
      case SecurityContext.NONE:
        return value;
      case SecurityContext.HTML:
        if (allowSanitizationBypassAndThrow(
          value,
          "HTML"
          /* BypassType.Html */
        )) {
          return unwrapSafeValue(value);
        }
        return _sanitizeHtml(this._doc, String(value)).toString();
      case SecurityContext.STYLE:
        if (allowSanitizationBypassAndThrow(
          value,
          "Style"
          /* BypassType.Style */
        )) {
          return unwrapSafeValue(value);
        }
        return value;
      case SecurityContext.SCRIPT:
        if (allowSanitizationBypassAndThrow(
          value,
          "Script"
          /* BypassType.Script */
        )) {
          return unwrapSafeValue(value);
        }
        throw new RuntimeError(5200, (typeof ngDevMode === "undefined" || ngDevMode) && "unsafe value used in a script context");
      case SecurityContext.URL:
        if (allowSanitizationBypassAndThrow(
          value,
          "URL"
          /* BypassType.Url */
        )) {
          return unwrapSafeValue(value);
        }
        return _sanitizeUrl(String(value));
      case SecurityContext.RESOURCE_URL:
        if (allowSanitizationBypassAndThrow(
          value,
          "ResourceURL"
          /* BypassType.ResourceUrl */
        )) {
          return unwrapSafeValue(value);
        }
        throw new RuntimeError(5201, (typeof ngDevMode === "undefined" || ngDevMode) && `unsafe value used in a resource URL context (see ${XSS_SECURITY_URL})`);
      default:
        throw new RuntimeError(5202, (typeof ngDevMode === "undefined" || ngDevMode) && `Unexpected SecurityContext ${ctx} (see ${XSS_SECURITY_URL})`);
    }
  }
  bypassSecurityTrustHtml(value) {
    return bypassSanitizationTrustHtml(value);
  }
  bypassSecurityTrustStyle(value) {
    return bypassSanitizationTrustStyle(value);
  }
  bypassSecurityTrustScript(value) {
    return bypassSanitizationTrustScript(value);
  }
  bypassSecurityTrustUrl(value) {
    return bypassSanitizationTrustUrl(value);
  }
  bypassSecurityTrustResourceUrl(value) {
    return bypassSanitizationTrustResourceUrl(value);
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomSanitizerImpl, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DomSanitizerImpl, providedIn: "root" });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: DomSanitizerImpl, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
var HydrationFeatureKind;
(function(HydrationFeatureKind2) {
  HydrationFeatureKind2[HydrationFeatureKind2["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
  HydrationFeatureKind2[HydrationFeatureKind2["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
  HydrationFeatureKind2[HydrationFeatureKind2["I18nSupport"] = 2] = "I18nSupport";
  HydrationFeatureKind2[HydrationFeatureKind2["EventReplay"] = 3] = "EventReplay";
  HydrationFeatureKind2[HydrationFeatureKind2["IncrementalHydration"] = 4] = "IncrementalHydration";
})(HydrationFeatureKind || (HydrationFeatureKind = {}));
var VERSION = new Version("20.1.6");

// node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs
var VERSION2 = new Version("20.1.6");
var COMPILER_PROVIDERS = [
  { provide: Compiler, useFactory: () => new Compiler() }
];
var JitCompilerFactory = class {
  _defaultOptions;
  /** @internal */
  constructor(defaultOptions) {
    const compilerOptions = {
      defaultEncapsulation: ViewEncapsulation.Emulated
    };
    this._defaultOptions = [compilerOptions, ...defaultOptions];
  }
  createCompiler(options = []) {
    const opts = _mergeOptions(this._defaultOptions.concat(options));
    const injector = Injector.create({
      providers: [
        COMPILER_PROVIDERS,
        {
          provide: CompilerConfig,
          useFactory: () => {
            return new CompilerConfig({
              defaultEncapsulation: opts.defaultEncapsulation,
              preserveWhitespaces: opts.preserveWhitespaces
            });
          },
          deps: []
        },
        opts.providers
      ]
    });
    return injector.get(Compiler);
  }
};
function _mergeOptions(optionsArr) {
  return {
    defaultEncapsulation: _lastDefined(optionsArr.map((options) => options.defaultEncapsulation)),
    providers: _mergeArrays(optionsArr.map((options) => options.providers)),
    preserveWhitespaces: _lastDefined(optionsArr.map((options) => options.preserveWhitespaces))
  };
}
function _lastDefined(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (args[i] !== void 0) {
      return args[i];
    }
  }
  return void 0;
}
function _mergeArrays(parts) {
  const result = [];
  parts.forEach((part) => part && result.push(...part));
  return result;
}
var ResourceLoaderImpl = class _ResourceLoaderImpl extends ResourceLoader {
  get(url) {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "text";
    xhr.onload = function() {
      const response = xhr.response;
      let status = xhr.status;
      if (status === 0) {
        status = response ? 200 : 0;
      }
      if (200 <= status && status <= 300) {
        resolve(response);
      } else {
        reject(`Failed to load ${url}`);
      }
    };
    xhr.onerror = function() {
      reject(`Failed to load ${url}`);
    };
    xhr.send();
    return promise;
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _ResourceLoaderImpl, deps: null, target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _ResourceLoaderImpl });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: ResourceLoaderImpl, decorators: [{
  type: Injectable
}] });
var INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
  {
    provide: COMPILER_OPTIONS,
    useValue: { providers: [{ provide: ResourceLoader, useClass: ResourceLoaderImpl, deps: [] }] },
    multi: true
  },
  { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] }
];
var platformBrowserDynamic = createPlatformFactory(platformBrowser, "browserDynamic", INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

// node_modules/@angular/platform-browser/fesm2022/testing.mjs
init_common();

// node_modules/@angular/common/fesm2022/testing.mjs
init_common();
init_core();
init_core();
init_esm();
init_platform_navigation();
init_testing();
var urlParse = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
function parseUrl(urlStr, baseHref) {
  const verifyProtocol = /^((http[s]?|ftp):\/\/)/;
  let serverBase;
  if (!verifyProtocol.test(urlStr)) {
    serverBase = "http://empty.com/";
  }
  let parsedUrl;
  try {
    parsedUrl = new URL(urlStr, serverBase);
  } catch (e) {
    const result = urlParse.exec(serverBase || "" + urlStr);
    if (!result) {
      throw new Error(`Invalid URL: ${urlStr} with base: ${baseHref}`);
    }
    const hostSplit = result[4].split(":");
    parsedUrl = {
      protocol: result[1],
      hostname: hostSplit[0],
      port: hostSplit[1] || "",
      pathname: result[5],
      search: result[6],
      hash: result[8]
    };
  }
  if (parsedUrl.pathname && parsedUrl.pathname.indexOf(baseHref) === 0) {
    parsedUrl.pathname = parsedUrl.pathname.substring(baseHref.length);
  }
  return {
    hostname: !serverBase && parsedUrl.hostname || "",
    protocol: !serverBase && parsedUrl.protocol || "",
    port: !serverBase && parsedUrl.port || "",
    pathname: parsedUrl.pathname || "/",
    search: parsedUrl.search || "",
    hash: parsedUrl.hash || ""
  };
}
var MOCK_PLATFORM_LOCATION_CONFIG = new InjectionToken("MOCK_PLATFORM_LOCATION_CONFIG");
var MockPlatformLocation = class _MockPlatformLocation {
  baseHref = "";
  hashUpdate = new Subject();
  popStateSubject = new Subject();
  urlChangeIndex = 0;
  urlChanges = [{ hostname: "", protocol: "", port: "", pathname: "/", search: "", hash: "", state: null }];
  constructor(config) {
    if (config) {
      this.baseHref = config.appBaseHref || "";
      const parsedChanges = this.parseChanges(null, config.startUrl || "http://_empty_/", this.baseHref);
      this.urlChanges[0] = __spreadValues({}, parsedChanges);
    }
  }
  get hostname() {
    return this.urlChanges[this.urlChangeIndex].hostname;
  }
  get protocol() {
    return this.urlChanges[this.urlChangeIndex].protocol;
  }
  get port() {
    return this.urlChanges[this.urlChangeIndex].port;
  }
  get pathname() {
    return this.urlChanges[this.urlChangeIndex].pathname;
  }
  get search() {
    return this.urlChanges[this.urlChangeIndex].search;
  }
  get hash() {
    return this.urlChanges[this.urlChangeIndex].hash;
  }
  get state() {
    return this.urlChanges[this.urlChangeIndex].state;
  }
  getBaseHrefFromDOM() {
    return this.baseHref;
  }
  onPopState(fn) {
    const subscription = this.popStateSubject.subscribe(fn);
    return () => subscription.unsubscribe();
  }
  onHashChange(fn) {
    const subscription = this.hashUpdate.subscribe(fn);
    return () => subscription.unsubscribe();
  }
  get href() {
    let url = `${this.protocol}//${this.hostname}${this.port ? ":" + this.port : ""}`;
    url += `${this.pathname === "/" ? "" : this.pathname}${this.search}${this.hash}`;
    return url;
  }
  get url() {
    return `${this.pathname}${this.search}${this.hash}`;
  }
  parseChanges(state, url, baseHref = "") {
    state = JSON.parse(JSON.stringify(state));
    return __spreadProps(__spreadValues({}, parseUrl(url, baseHref)), { state });
  }
  replaceState(state, title, newUrl) {
    const { pathname, search, state: parsedState, hash } = this.parseChanges(state, newUrl);
    this.urlChanges[this.urlChangeIndex] = __spreadProps(__spreadValues({}, this.urlChanges[this.urlChangeIndex]), {
      pathname,
      search,
      hash,
      state: parsedState
    });
  }
  pushState(state, title, newUrl) {
    const { pathname, search, state: parsedState, hash } = this.parseChanges(state, newUrl);
    if (this.urlChangeIndex > 0) {
      this.urlChanges.splice(this.urlChangeIndex + 1);
    }
    this.urlChanges.push(__spreadProps(__spreadValues({}, this.urlChanges[this.urlChangeIndex]), {
      pathname,
      search,
      hash,
      state: parsedState
    }));
    this.urlChangeIndex = this.urlChanges.length - 1;
  }
  forward() {
    const oldUrl = this.url;
    const oldHash = this.hash;
    if (this.urlChangeIndex < this.urlChanges.length) {
      this.urlChangeIndex++;
    }
    this.emitEvents(oldHash, oldUrl);
  }
  back() {
    const oldUrl = this.url;
    const oldHash = this.hash;
    if (this.urlChangeIndex > 0) {
      this.urlChangeIndex--;
    }
    this.emitEvents(oldHash, oldUrl);
  }
  historyGo(relativePosition = 0) {
    const oldUrl = this.url;
    const oldHash = this.hash;
    const nextPageIndex = this.urlChangeIndex + relativePosition;
    if (nextPageIndex >= 0 && nextPageIndex < this.urlChanges.length) {
      this.urlChangeIndex = nextPageIndex;
    }
    this.emitEvents(oldHash, oldUrl);
  }
  getState() {
    return this.state;
  }
  /**
   * Browsers are inconsistent in when they fire events and perform the state updates
   * The most easiest thing to do in our mock is synchronous and that happens to match
   * Firefox and Chrome, at least somewhat closely
   *
   * https://github.com/WICG/navigation-api#watching-for-navigations
   * https://docs.google.com/document/d/1Pdve-DJ1JCGilj9Yqf5HxRJyBKSel5owgOvUJqTauwU/edit#heading=h.3ye4v71wsz94
   * popstate is always sent before hashchange:
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#when_popstate_is_sent
   */
  emitEvents(oldHash, oldUrl) {
    this.popStateSubject.next({
      type: "popstate",
      state: this.getState(),
      oldUrl,
      newUrl: this.url
    });
    if (oldHash !== this.hash) {
      this.hashUpdate.next({
        type: "hashchange",
        state: null,
        oldUrl,
        newUrl: this.url
      });
    }
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _MockPlatformLocation, deps: [{ token: MOCK_PLATFORM_LOCATION_CONFIG, optional: true }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _MockPlatformLocation });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: MockPlatformLocation, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [MOCK_PLATFORM_LOCATION_CONFIG]
}, {
  type: Optional
}] }] });
var FakeNavigationPlatformLocation = class _FakeNavigationPlatformLocation {
  _platformNavigation;
  constructor() {
    const platformNavigation = inject(PlatformNavigation);
    if (!(platformNavigation instanceof FakeNavigation)) {
      throw new Error("FakePlatformNavigation cannot be used without FakeNavigation. Use `provideFakeNavigation` to have all these services provided together.");
    }
    this._platformNavigation = platformNavigation;
  }
  config = inject(MOCK_PLATFORM_LOCATION_CONFIG, { optional: true });
  getBaseHrefFromDOM() {
    return this.config?.appBaseHref ?? "";
  }
  onPopState(fn) {
    this._platformNavigation.window.addEventListener("popstate", fn);
    return () => this._platformNavigation.window.removeEventListener("popstate", fn);
  }
  onHashChange(fn) {
    this._platformNavigation.window.addEventListener("hashchange", fn);
    return () => this._platformNavigation.window.removeEventListener("hashchange", fn);
  }
  get href() {
    return this._platformNavigation.currentEntry.url;
  }
  get protocol() {
    return new URL(this._platformNavigation.currentEntry.url).protocol;
  }
  get hostname() {
    return new URL(this._platformNavigation.currentEntry.url).hostname;
  }
  get port() {
    return new URL(this._platformNavigation.currentEntry.url).port;
  }
  get pathname() {
    return new URL(this._platformNavigation.currentEntry.url).pathname;
  }
  get search() {
    return new URL(this._platformNavigation.currentEntry.url).search;
  }
  get hash() {
    return new URL(this._platformNavigation.currentEntry.url).hash;
  }
  pushState(state, title, url) {
    this._platformNavigation.pushState(state, title, url);
  }
  replaceState(state, title, url) {
    this._platformNavigation.replaceState(state, title, url);
  }
  forward() {
    this._platformNavigation.forward();
  }
  back() {
    this._platformNavigation.back();
  }
  historyGo(relativePosition = 0) {
    this._platformNavigation.go(relativePosition);
  }
  getState() {
    return this._platformNavigation.currentEntry.getHistoryState();
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _FakeNavigationPlatformLocation, deps: [], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _FakeNavigationPlatformLocation });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: FakeNavigationPlatformLocation, decorators: [{
  type: Injectable
}], ctorParameters: () => [] });
var FAKE_NAVIGATION = new InjectionToken("fakeNavigation", {
  providedIn: "root",
  factory: () => {
    const config = inject(MOCK_PLATFORM_LOCATION_CONFIG, { optional: true });
    const baseFallback = "http://_empty_/";
    const startUrl = new URL(config?.startUrl || baseFallback, baseFallback);
    const fakeNavigation = new FakeNavigation(inject(DOCUMENT), startUrl.href);
    fakeNavigation.setSynchronousTraversalsForTesting(true);
    return fakeNavigation;
  }
});
var SpyLocation = class _SpyLocation {
  urlChanges = [];
  _history = [new LocationState("", "", null)];
  _historyIndex = 0;
  /** @internal */
  _subject = new Subject();
  /** @internal */
  _basePath = "";
  /** @internal */
  _locationStrategy = null;
  /** @internal */
  _urlChangeListeners = [];
  /** @internal */
  _urlChangeSubscription = null;
  /** @docs-private */
  ngOnDestroy() {
    this._urlChangeSubscription?.unsubscribe();
    this._urlChangeListeners = [];
  }
  setInitialPath(url) {
    this._history[this._historyIndex].path = url;
  }
  setBaseHref(url) {
    this._basePath = url;
  }
  path() {
    return this._history[this._historyIndex].path;
  }
  getState() {
    return this._history[this._historyIndex].state;
  }
  isCurrentPathEqualTo(path, query = "") {
    const givenPath = path.endsWith("/") ? path.substring(0, path.length - 1) : path;
    const currPath = this.path().endsWith("/") ? this.path().substring(0, this.path().length - 1) : this.path();
    return currPath == givenPath + (query.length > 0 ? "?" + query : "");
  }
  simulateUrlPop(pathname) {
    this._subject.next({ "url": pathname, "pop": true, "type": "popstate" });
  }
  simulateHashChange(pathname) {
    const path = this.prepareExternalUrl(pathname);
    this.pushHistory(path, "", null);
    this.urlChanges.push("hash: " + pathname);
    this._subject.next({ "url": pathname, "pop": true, "type": "popstate" });
    this._subject.next({ "url": pathname, "pop": true, "type": "hashchange" });
  }
  prepareExternalUrl(url) {
    if (url.length > 0 && !url.startsWith("/")) {
      url = "/" + url;
    }
    return this._basePath + url;
  }
  go(path, query = "", state = null) {
    path = this.prepareExternalUrl(path);
    this.pushHistory(path, query, state);
    const locationState = this._history[this._historyIndex - 1];
    if (locationState.path == path && locationState.query == query) {
      return;
    }
    const url = path + (query.length > 0 ? "?" + query : "");
    this.urlChanges.push(url);
    this._notifyUrlChangeListeners(path + normalizeQueryParams(query), state);
  }
  replaceState(path, query = "", state = null) {
    path = this.prepareExternalUrl(path);
    const history = this._history[this._historyIndex];
    history.state = state;
    if (history.path == path && history.query == query) {
      return;
    }
    history.path = path;
    history.query = query;
    const url = path + (query.length > 0 ? "?" + query : "");
    this.urlChanges.push("replace: " + url);
    this._notifyUrlChangeListeners(path + normalizeQueryParams(query), state);
  }
  forward() {
    if (this._historyIndex < this._history.length - 1) {
      this._historyIndex++;
      this._subject.next({
        "url": this.path(),
        "state": this.getState(),
        "pop": true,
        "type": "popstate"
      });
    }
  }
  back() {
    if (this._historyIndex > 0) {
      this._historyIndex--;
      this._subject.next({
        "url": this.path(),
        "state": this.getState(),
        "pop": true,
        "type": "popstate"
      });
    }
  }
  historyGo(relativePosition = 0) {
    const nextPageIndex = this._historyIndex + relativePosition;
    if (nextPageIndex >= 0 && nextPageIndex < this._history.length) {
      this._historyIndex = nextPageIndex;
      this._subject.next({
        "url": this.path(),
        "state": this.getState(),
        "pop": true,
        "type": "popstate"
      });
    }
  }
  onUrlChange(fn) {
    this._urlChangeListeners.push(fn);
    this._urlChangeSubscription ??= this.subscribe((v) => {
      this._notifyUrlChangeListeners(v.url, v.state);
    });
    return () => {
      const fnIndex = this._urlChangeListeners.indexOf(fn);
      this._urlChangeListeners.splice(fnIndex, 1);
      if (this._urlChangeListeners.length === 0) {
        this._urlChangeSubscription?.unsubscribe();
        this._urlChangeSubscription = null;
      }
    };
  }
  /** @internal */
  _notifyUrlChangeListeners(url = "", state) {
    this._urlChangeListeners.forEach((fn) => fn(url, state));
  }
  subscribe(onNext, onThrow, onReturn) {
    return this._subject.subscribe({
      next: onNext,
      error: onThrow ?? void 0,
      complete: onReturn ?? void 0
    });
  }
  normalize(url) {
    return null;
  }
  pushHistory(path, query, state) {
    if (this._historyIndex > 0) {
      this._history.splice(this._historyIndex + 1);
    }
    this._history.push(new LocationState(path, query, state));
    this._historyIndex = this._history.length - 1;
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _SpyLocation, deps: [], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _SpyLocation });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: SpyLocation, decorators: [{
  type: Injectable
}] });
var LocationState = class {
  path;
  query;
  state;
  constructor(path, query, state) {
    this.path = path;
    this.query = query;
    this.state = state;
  }
};
var MockLocationStrategy = class _MockLocationStrategy extends LocationStrategy {
  internalBaseHref = "/";
  internalPath = "/";
  internalTitle = "";
  urlChanges = [];
  /** @internal */
  _subject = new Subject();
  stateChanges = [];
  constructor() {
    super();
  }
  simulatePopState(url) {
    this.internalPath = url;
    this._subject.next(new _MockPopStateEvent(this.path()));
  }
  path(includeHash = false) {
    return this.internalPath;
  }
  prepareExternalUrl(internal) {
    if (internal.startsWith("/") && this.internalBaseHref.endsWith("/")) {
      return this.internalBaseHref + internal.substring(1);
    }
    return this.internalBaseHref + internal;
  }
  pushState(ctx, title, path, query) {
    this.stateChanges.push(ctx);
    this.internalTitle = title;
    const url = path + (query.length > 0 ? "?" + query : "");
    this.internalPath = url;
    const externalUrl = this.prepareExternalUrl(url);
    this.urlChanges.push(externalUrl);
  }
  replaceState(ctx, title, path, query) {
    this.stateChanges[(this.stateChanges.length || 1) - 1] = ctx;
    this.internalTitle = title;
    const url = path + (query.length > 0 ? "?" + query : "");
    this.internalPath = url;
    const externalUrl = this.prepareExternalUrl(url);
    this.urlChanges.push("replace: " + externalUrl);
  }
  onPopState(fn) {
    this._subject.subscribe({ next: fn });
  }
  getBaseHref() {
    return this.internalBaseHref;
  }
  back() {
    if (this.urlChanges.length > 0) {
      this.urlChanges.pop();
      this.stateChanges.pop();
      const nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : "";
      this.simulatePopState(nextUrl);
    }
  }
  forward() {
    throw "not implemented";
  }
  getState() {
    return this.stateChanges[(this.stateChanges.length || 1) - 1];
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _MockLocationStrategy, deps: [], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _MockLocationStrategy });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: MockLocationStrategy, decorators: [{
  type: Injectable
}], ctorParameters: () => [] });
var _MockPopStateEvent = class {
  newUrl;
  pop = true;
  type = "popstate";
  constructor(newUrl) {
    this.newUrl = newUrl;
  }
};

// node_modules/@angular/platform-browser/fesm2022/testing.mjs
init_core();
init_core();
init_testing();
var DOMTestComponentRenderer = class _DOMTestComponentRenderer extends TestComponentRenderer {
  _doc;
  constructor(_doc) {
    super();
    this._doc = _doc;
  }
  insertRootElement(rootElId) {
    this.removeAllRootElementsImpl();
    const rootElement = getDOM().getDefaultDocument().createElement("div");
    rootElement.setAttribute("id", rootElId);
    this._doc.body.appendChild(rootElement);
  }
  removeAllRootElements() {
    if (typeof this._doc.querySelectorAll === "function") {
      this.removeAllRootElementsImpl();
    }
  }
  removeAllRootElementsImpl() {
    const oldRoots = this._doc.querySelectorAll("[id^=root]");
    for (let i = 0; i < oldRoots.length; i++) {
      getDOM().remove(oldRoots[i]);
    }
  }
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DOMTestComponentRenderer, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
  static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _DOMTestComponentRenderer });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: DOMTestComponentRenderer, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
var platformBrowserTesting = createPlatformFactory(platformBrowser, "browserTesting");
var BrowserTestingModule = class _BrowserTestingModule {
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserTestingModule, deps: [], target: FactoryTarget.NgModule });
  static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserTestingModule, exports: [BrowserModule] });
  static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserTestingModule, providers: [
    { provide: APP_ID, useValue: "a" },
    internalProvideZoneChangeDetection({}),
    { provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
    { provide: PlatformLocation, useClass: MockPlatformLocation },
    { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }
  ], imports: [BrowserModule] });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: BrowserTestingModule, decorators: [{
  type: NgModule,
  args: [{
    exports: [BrowserModule],
    providers: [
      { provide: APP_ID, useValue: "a" },
      internalProvideZoneChangeDetection({}),
      { provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
      { provide: PlatformLocation, useClass: MockPlatformLocation },
      { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }
    ]
  }]
}] });

// node_modules/@angular/platform-browser-dynamic/fesm2022/testing.mjs
init_compiler();
var platformBrowserDynamicTesting = createPlatformFactory(platformBrowserDynamic, "browserDynamicTesting");
var BrowserDynamicTestingModule = class _BrowserDynamicTestingModule {
  static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserDynamicTestingModule, deps: [], target: FactoryTarget.NgModule });
  static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserDynamicTestingModule, exports: [BrowserTestingModule] });
  static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: _BrowserDynamicTestingModule, imports: [BrowserTestingModule] });
};
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.6", ngImport: core_exports, type: BrowserDynamicTestingModule, decorators: [{
  type: NgModule,
  args: [{
    exports: [BrowserTestingModule]
  }]
}] });

// src/test.ts
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
/*! Bundled license information:

zone.js/fesm2015/zone.js:
zone.js/fesm2015/zone-testing.js:
  (**
   * @license Angular v<unknown>
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/platform-browser/fesm2022/dom_renderer.mjs:
@angular/platform-browser/fesm2022/browser.mjs:
@angular/platform-browser/fesm2022/platform-browser.mjs:
@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs:
@angular/common/fesm2022/testing.mjs:
@angular/platform-browser/fesm2022/testing.mjs:
@angular/platform-browser-dynamic/fesm2022/testing.mjs:
  (**
   * @license Angular v20.1.6
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=test_main.js.map
