(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$a =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$9 = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$8 = fails$9;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$8(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$7 = fails$9;

	var functionBindNative = !fails$7(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$1 = functionBindNative;

	var call$4 = Function.prototype.call;

	var functionCall = NATIVE_BIND$1 ? call$4.bind(call$4) : function () {
	  return call$4.apply(call$4, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$2 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var call$3 = FunctionPrototype$1.call;
	var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype$1.bind.bind(call$3, call$3);

	var functionUncurryThisRaw = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$3.apply(fn, arguments);
	  };
	};

	var uncurryThisRaw$1 = functionUncurryThisRaw;

	var toString$3 = uncurryThisRaw$1({}.toString);
	var stringSlice$1 = uncurryThisRaw$1(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$1(toString$3(it), 8, -1);
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThisRaw = functionUncurryThisRaw;

	var functionUncurryThis = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThisRaw(fn);
	};

	var uncurryThis$8 = functionUncurryThis;
	var fails$6 = fails$9;
	var classof$2 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$8(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$6(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$2(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$5 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$3 = function (it) {
	  if (isNullOrUndefined$1(it)) throw $TypeError$5("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = indexedObject;
	var requireObjectCoercible$2 = requireObjectCoercible$3;

	var toIndexedObject$3 = function (it) {
	  return IndexedObject(requireObjectCoercible$2(it));
	};

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$b = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$a = isCallable$b;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$5 = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$a(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$a(it);
	};

	var global$9 = global$a;
	var isCallable$9 = isCallable$b;

	var aFunction = function (argument) {
	  return isCallable$9(argument) ? argument : undefined;
	};

	var getBuiltIn$3 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$9[namespace]) : global$9[namespace] && global$9[namespace][method];
	};

	var uncurryThis$7 = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$7({}.isPrototypeOf);

	var getBuiltIn$2 = getBuiltIn$3;

	var engineUserAgent = getBuiltIn$2('navigator', 'userAgent') || '';

	var global$8 = global$a;
	var userAgent = engineUserAgent;

	var process = global$8.process;
	var Deno = global$8.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION = engineV8Version;
	var fails$5 = fails$9;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$5(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$1 = getBuiltIn$3;
	var isCallable$8 = isCallable$b;
	var isPrototypeOf = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$1('Symbol');
	  return isCallable$8($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
	};

	var $String$3 = String;

	var tryToString$1 = function (argument) {
	  try {
	    return $String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$7 = isCallable$b;
	var tryToString = tryToString$1;

	var $TypeError$4 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$1 = function (argument) {
	  if (isCallable$7(argument)) return argument;
	  throw $TypeError$4(tryToString(argument) + ' is not a function');
	};

	var aCallable = aCallable$1;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable(func);
	};

	var call$2 = functionCall;
	var isCallable$6 = isCallable$b;
	var isObject$4 = isObject$5;

	var $TypeError$3 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$6(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
	  if (isCallable$6(fn = input.valueOf) && !isObject$4(val = call$2(fn, input))) return val;
	  if (pref !== 'string' && isCallable$6(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
	  throw $TypeError$3("Can't convert object to primitive value");
	};

	var shared$3 = {exports: {}};

	var global$7 = global$a;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$1(global$7, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$7[key] = value;
	  } return value;
	};

	var global$6 = global$a;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$6[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$3.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.26.0',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.26.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var requireObjectCoercible$1 = requireObjectCoercible$3;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$1 = function (argument) {
	  return $Object$1(requireObjectCoercible$1(argument));
	};

	var uncurryThis$6 = functionUncurryThis;
	var toObject = toObject$1;

	var hasOwnProperty = uncurryThis$6({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject(it), key);
	};

	var uncurryThis$5 = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$2 = uncurryThis$5(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$2(++id + postfix, 36);
	};

	var global$5 = global$a;
	var shared$2 = shared$3.exports;
	var hasOwn$6 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$2('wks');
	var Symbol$1 = global$5.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$3 = function (name) {
	  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var call$1 = functionCall;
	var isObject$3 = isObject$5;
	var isSymbol$1 = isSymbol$2;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$2 = wellKnownSymbol$3;

	var $TypeError$2 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$3(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$1(exoticToPrim, input, pref);
	    if (!isObject$3(result) || isSymbol$1(result)) return result;
	    throw $TypeError$2("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$4 = global$a;
	var isObject$2 = isObject$5;

	var document$1 = global$4.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$6 = descriptors;
	var fails$4 = fails$9;
	var createElement = documentCreateElement;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$6 && !fails$4(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$5 = descriptors;
	var call = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$1 = createPropertyDescriptor$2;
	var toIndexedObject$2 = toIndexedObject$3;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$5 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$2(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$4 = descriptors;
	var fails$3 = fails$9;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$4 && fails$3(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$1 = isObject$5;

	var $String$2 = String;
	var $TypeError$1 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$2 = function (argument) {
	  if (isObject$1(argument)) return argument;
	  throw $TypeError$1($String$2(argument) + ' is not an object');
	};

	var DESCRIPTORS$3 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var anObject$1 = anObject$2;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$3 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
	  anObject$1(O);
	  P = toPropertyKey(P);
	  anObject$1(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$1(O);
	  P = toPropertyKey(P);
	  anObject$1(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$2 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$2;

	var createNonEnumerableProperty$2 = DESCRIPTORS$2 ? function (object, key, value) {
	  return definePropertyModule$2.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$2 = {exports: {}};

	var DESCRIPTORS$1 = descriptors;
	var hasOwn$4 = hasOwnProperty_1;

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$4(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || (DESCRIPTORS$1 && getDescriptor(FunctionPrototype, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$4 = functionUncurryThis;
	var isCallable$5 = isCallable$b;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$4(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$5(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$1 = store$1.inspectSource;

	var global$3 = global$a;
	var isCallable$4 = isCallable$b;

	var WeakMap$1 = global$3.WeakMap;

	var weakMapBasicDetection = isCallable$4(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$1 = shared$3.exports;
	var uid = uid$2;

	var keys = shared$1('keys');

	var sharedKey$1 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$3 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$2 = global$a;
	var isObject = isObject$5;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
	var hasOwn$3 = hasOwnProperty_1;
	var shared = sharedStore;
	var sharedKey = sharedKey$1;
	var hiddenKeys$2 = hiddenKeys$3;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = global$2.TypeError;
	var WeakMap = global$2.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$2[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$3(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$3(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$3(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var fails$2 = fails$9;
	var isCallable$3 = isCallable$b;
	var hasOwn$2 = hasOwnProperty_1;
	var DESCRIPTORS = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource = inspectSource$1;
	var InternalStateModule = internalState;

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails$2(function () {
	  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (String(name).slice(0, 7) === 'Symbol(') {
	    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
	    defineProperty(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$2(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$2(state, 'source')) {
	    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$3(this) && getInternalState(this).source || inspectSource(this);
	}, 'toString');

	var isCallable$2 = isCallable$b;
	var definePropertyModule$1 = objectDefineProperty;
	var makeBuiltIn = makeBuiltIn$2.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$1 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$2(value)) makeBuiltIn(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$1.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$1 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$4 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$3(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$1 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$1 = toIndexedObject$3;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike = lengthOfArrayLike$1;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$1($this);
	    var length = lengthOfArrayLike(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var uncurryThis$3 = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var toIndexedObject = toIndexedObject$3;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$1 = hiddenKeys$3;

	var push = uncurryThis$3([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
	    ~indexOf(result, key) || push(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$1 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$1;

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn = getBuiltIn$3;
	var uncurryThis$2 = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject = anObject$2;

	var concat = uncurryThis$2([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$1 = fails$9;
	var isCallable$1 = isCallable$b;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$1(detection) ? fails$1(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$1 = global$a;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty = createNonEnumerableProperty$2;
	var defineBuiltIn = defineBuiltIn$1;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$1;
	  } else if (STATIC) {
	    target = global$1[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn(target, key, sourceProperty, options);
	  }
	};

	var uncurryThis$1 = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$1(1.0.valueOf);

	var wellKnownSymbol$1 = wellKnownSymbol$3;

	var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable = isCallable$b;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol = wellKnownSymbol$3;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
	};

	var classof = classof$1;

	var $String$1 = String;

	var toString$1 = function (argument) {
	  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$1(argument);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
	var toString = toString$1;
	var requireObjectCoercible = requireObjectCoercible$3;

	var $RangeError$1 = RangeError;

	// `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	var stringRepeat = function repeat(count) {
	  var str = toString(requireObjectCoercible(this));
	  var result = '';
	  var n = toIntegerOrInfinity$1(count);
	  if (n < 0 || n == Infinity) throw $RangeError$1('Wrong number of repetitions');
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
	  return result;
	};

	var $$1 = _export;
	var uncurryThis = functionUncurryThis;
	var toIntegerOrInfinity = toIntegerOrInfinity$4;
	var thisNumberValue = thisNumberValue$1;
	var $repeat = stringRepeat;
	var fails = fails$9;

	var $RangeError = RangeError;
	var $String = String;
	var floor = Math.floor;
	var repeat = uncurryThis($repeat);
	var stringSlice = uncurryThis(''.slice);
	var nativeToFixed = uncurryThis(1.0.toFixed);

	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};

	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	var multiply = function (data, n, c) {
	  var index = -1;
	  var c2 = c;
	  while (++index < 6) {
	    c2 += n * data[index];
	    data[index] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};

	var divide = function (data, n) {
	  var index = 6;
	  var c = 0;
	  while (--index >= 0) {
	    c += data[index];
	    data[index] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};

	var dataToString = function (data) {
	  var index = 6;
	  var s = '';
	  while (--index >= 0) {
	    if (s !== '' || index === 0 || data[index] !== 0) {
	      var t = $String(data[index]);
	      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
	    }
	  } return s;
	};

	var FORCED = fails(function () {
	  return nativeToFixed(0.00008, 3) !== '0.000' ||
	    nativeToFixed(0.9, 0) !== '1' ||
	    nativeToFixed(1.255, 2) !== '1.25' ||
	    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
	}) || !fails(function () {
	  // V8 ~ Android 4.3-
	  nativeToFixed({});
	});

	// `Number.prototype.toFixed` method
	// https://tc39.es/ecma262/#sec-number.prototype.tofixed
	$$1({ target: 'Number', proto: true, forced: FORCED }, {
	  toFixed: function toFixed(fractionDigits) {
	    var number = thisNumberValue(this);
	    var fractDigits = toIntegerOrInfinity(fractionDigits);
	    var data = [0, 0, 0, 0, 0, 0];
	    var sign = '';
	    var result = '0';
	    var e, z, j, k;

	    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
	    if (fractDigits < 0 || fractDigits > 20) throw $RangeError('Incorrect fraction digits');
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (number != number) return 'NaN';
	    if (number <= -1e21 || number >= 1e21) return $String(number);
	    if (number < 0) {
	      sign = '-';
	      number = -number;
	    }
	    if (number > 1e-21) {
	      e = log(number * pow(2, 69, 1)) - 69;
	      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(data, 0, z);
	        j = fractDigits;
	        while (j >= 7) {
	          multiply(data, 1e7, 0);
	          j -= 7;
	        }
	        multiply(data, pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(data, 1 << 23);
	          j -= 23;
	        }
	        divide(data, 1 << j);
	        multiply(data, 1, 1);
	        divide(data, 2);
	        result = dataToString(data);
	      } else {
	        multiply(data, 0, z);
	        multiply(data, 1 << -e, 0);
	        result = dataToString(data) + repeat('0', fractDigits);
	      }
	    }
	    if (fractDigits > 0) {
	      k = result.length;
	      result = sign + (k <= fractDigits
	        ? '0.' + repeat('0', fractDigits - k) + result
	        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
	    } else {
	      result = sign + result;
	    } return result;
	  }
	});

	// var getParam = function (key) {
	//   var _parammap = {};
	//   document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	//     function decode(s) {
	//       return decodeURIComponent(s.split("+").join(" "));
	//     }
	//     _parammap[decode(arguments[1])] = decode(arguments[2]);
	//   });
	//   return _parammap[key];
	// };
	$(function () {
	  var flag = true,
	    sizeName = "px",
	    btnLeft,
	    btnTop,
	    btnWidth,
	    btnHeight,
	    copyCss;
	  $("body").append('<textarea id="planCopyText" style="width:1px;height:1px;position:fixed;left:-9000px;top:-9000px;"></textarea>');
	  setTimeout(function () {
	    $(".kolon-cttd-inner").click(function (e) {
	      if (e.target.tagName != "IMG") {
	        console.log("not img!");
	        return;
	      }
	      flag = !flag;
	      {
	        sizeName = "%";
	      }
	      if (flag) {
	        console.log("%c" + (flag ? "end" : "start"), "text-shadow:3px 3px 3px rgba(0,0,0,0.2); color:#2bb835;");
	      } else {
	        console.log("%c" + (flag ? "end" : "start"), "text-shadow:3px 3px 3px rgba(0,0,0,0.2); color:#b8602b;");
	      }
	      if (flag) {
	        btnWidth = e.offsetX - btnLeft;
	        btnHeight = e.offsetY - btnTop;
	        {
	          btnWidth = (btnWidth / $(e.target).width() * 100).toFixed(1);
	          btnHeight = (btnHeight / $(e.target).height() * 100).toFixed(1);
	          btnLeft = (btnLeft / $(e.target).width() * 100).toFixed(1);
	          btnTop = (btnTop / $(e.target).height() * 100).toFixed(1);
	        }
	        copyCss = "width:" + btnWidth + sizeName + "; height:" + btnHeight + sizeName + "; top:" + btnTop + sizeName + "; left:" + btnLeft + sizeName + ";";
	        if (window.clipboardData) {
	          window.clipboardData.setData("Text", copyCss);
	        } else {
	          $("#planCopyText").text('style="' + copyCss + '"').select();
	          document.execCommand("copy");
	          console.log("%c" + 'style="' + copyCss + '"', "text-shadow:3px 3px 3px rgba(0,0,0,0.2); color:#3352db;");
	        }
	      } else {
	        btnLeft = e.offsetX;
	        btnTop = e.offsetY;
	      }
	    });
	  }, 500);
	});

}));
