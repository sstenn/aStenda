(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],2:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
}).call(this,require('_process'))

},{"_process":5}],3:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))

},{"_process":5}],4:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
}).call(this,require('_process'))

},{"./emptyFunction":1,"_process":5}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))

},{"./lib/ReactPropTypesSecret":9,"_process":5,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],7:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = require('./factoryWithTypeCheckers');
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};

},{"./factoryWithTypeCheckers":8}],8:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))

},{"./checkPropTypes":6,"./lib/ReactPropTypesSecret":9,"_process":5,"fbjs/lib/emptyFunction":1,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],9:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],10:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.GoogleLogin=t(require("react")):e.GoogleLogin=t(e.react)}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),c=n.n(a),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.signIn=n.signIn.bind(n),n.state={disabled:!0},n}return r(t,e),s(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.clientId,o=t.cookiePolicy,i=t.loginHint,r=t.hostedDomain,a=t.autoLoad,c=t.fetchBasicProfile,s=t.redirectUri,u=t.discoveryDocs,l=t.onFailure,f=t.uxMode;!function(e,t,n,o){var i=e.getElementsByTagName(t)[0],r=i,a=i;a=e.createElement(t),a.id=n,a.src="//apis.google.com/js/client:platform.js",r.parentNode.insertBefore(a,r),a.onload=o}(document,"script","google-login",function(){var t={client_id:n,cookiepolicy:o,login_hint:i,hosted_domain:r,fetch_basic_profile:c,discoveryDocs:u,ux_mode:f,redirect_uri:s};window.gapi.load("auth2",function(){e.setState({disabled:!1}),window.gapi.auth2.getAuthInstance()||window.gapi.auth2.init(t).then(function(){},function(e){return l(e)}),a&&e.signIn()})})}},{key:"signIn",value:function(e){if(e&&e.preventDefault(),!this.state.disabled){var t=window.gapi.auth2.getAuthInstance(),n=this.props,o=n.offline,i=n.redirectUri,r=n.onSuccess,a=n.onRequest,c=n.fetchBasicProfile,s=n.onFailure,u=n.prompt,l=n.scope,f=n.responseType,p={response_type:f,redirect_uri:i,fetch_basic_profile:c,prompt:u,scope:l};a(),o?t.grantOfflineAccess(p).then(function(e){return r(e)},function(e){return s(e)}):t.signIn(p).then(function(e){var t=e.getBasicProfile(),n=e.getAuthResponse();e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},r(e)},function(e){return s(e)})}}},{key:"render",value:function(){var e=this.props,t=e.tag,n=e.style,o=e.className,i=e.disabledStyle,r=e.buttonText,a=e.children,s=this.state.disabled||this.props.disabled,u={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},l=function(){return n||(o&&!n?{}:u)}(),f=function(){return s?Object.assign({},l,i):l}();return c.a.createElement(t,{onClick:this.signIn,style:f,disabled:s,className:o},a||r)}}]),t}(a.Component);u.defaultProps={tag:"button",buttonText:"Login with Google",scope:"profile email",responseType:"permission",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,uxMode:"popup",disabledStyle:{opacity:.6},onRequest:function(){},offline:!1},t.default=u},function(t,n){t.exports=e},function(e,t,n){e.exports=n(0)}])});

},{"react":36}],11:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;
},{}],12:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var invariant = require('fbjs/lib/invariant');

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
}).call(this,require('_process'))

},{"./reactProdInvariant":33,"_process":5,"fbjs/lib/invariant":3}],13:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactChildren = require('./ReactChildren');
var ReactComponent = require('./ReactComponent');
var ReactPureComponent = require('./ReactPureComponent');
var ReactClass = require('./ReactClass');
var ReactDOMFactories = require('./ReactDOMFactories');
var ReactElement = require('./ReactElement');
var ReactPropTypes = require('./ReactPropTypes');
var ReactVersion = require('./ReactVersion');

var onlyChild = require('./onlyChild');
var warning = require('fbjs/lib/warning');

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var canDefineProperty = require('./canDefineProperty');
  var ReactElementValidator = require('./ReactElementValidator');
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

// TODO: Fix tests so that this deprecation warning doesn't cause failures.
if (process.env.NODE_ENV !== 'production') {
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        process.env.NODE_ENV !== 'production' ? warning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated. Use ' + 'the prop-types package from npm instead.') : void 0;
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });
  }
}

module.exports = React;
}).call(this,require('_process'))

},{"./ReactChildren":14,"./ReactClass":15,"./ReactComponent":16,"./ReactDOMFactories":19,"./ReactElement":20,"./ReactElementValidator":22,"./ReactPropTypes":25,"./ReactPureComponent":27,"./ReactVersion":28,"./canDefineProperty":29,"./onlyChild":32,"_process":5,"fbjs/lib/warning":4,"object-assign":35}],14:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var PooledClass = require('./PooledClass');
var ReactElement = require('./ReactElement');

var emptyFunction = require('fbjs/lib/emptyFunction');
var traverseAllChildren = require('./traverseAllChildren');

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;
},{"./PooledClass":12,"./ReactElement":20,"./traverseAllChildren":34,"fbjs/lib/emptyFunction":1}],15:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactElement = require('./ReactElement');
var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

var didWarnDeprecated = false;

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(didWarnDeprecated, '%s: React.createClass is deprecated and will be removed in version 16. ' + 'Use plain JavaScript classes instead. If you\'re not yet ready to ' + 'migrate, create-react-class is available on npm as a ' + 'drop-in replacement.', spec && spec.displayName || 'A Component') : void 0;
      didWarnDeprecated = true;
    }

    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
}).call(this,require('_process'))

},{"./ReactComponent":16,"./ReactElement":20,"./ReactNoopUpdateQueue":23,"./ReactPropTypeLocationNames":24,"./reactProdInvariant":33,"_process":5,"fbjs/lib/emptyObject":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":4,"object-assign":35}],16:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var canDefineProperty = require('./canDefineProperty');
var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
}).call(this,require('_process'))

},{"./ReactNoopUpdateQueue":23,"./canDefineProperty":29,"./reactProdInvariant":33,"_process":5,"fbjs/lib/emptyObject":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],17:[function(require,module,exports){
(function (process){
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;
}).call(this,require('_process'))

},{"./ReactCurrentOwner":18,"./reactProdInvariant":33,"_process":5,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],18:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;
},{}],19:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactElement = require('./ReactElement');

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = require('./ReactElementValidator');
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
}).call(this,require('_process'))

},{"./ReactElement":20,"./ReactElementValidator":22,"_process":5}],20:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var warning = require('fbjs/lib/warning');
var canDefineProperty = require('./canDefineProperty');
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
}).call(this,require('_process'))

},{"./ReactCurrentOwner":18,"./ReactElementSymbol":21,"./canDefineProperty":29,"_process":5,"fbjs/lib/warning":4,"object-assign":35}],21:[function(require,module,exports){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;
},{}],22:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

'use strict';

var ReactCurrentOwner = require('./ReactCurrentOwner');
var ReactComponentTreeHook = require('./ReactComponentTreeHook');
var ReactElement = require('./ReactElement');

var checkReactTypeSpec = require('./checkReactTypeSpec');

var canDefineProperty = require('./canDefineProperty');
var getIteratorFn = require('./getIteratorFn');
var warning = require('fbjs/lib/warning');

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
}).call(this,require('_process'))

},{"./ReactComponentTreeHook":17,"./ReactCurrentOwner":18,"./ReactElement":20,"./canDefineProperty":29,"./checkReactTypeSpec":30,"./getIteratorFn":31,"_process":5,"fbjs/lib/warning":4}],23:[function(require,module,exports){
(function (process){
/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var warning = require('fbjs/lib/warning');

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
}).call(this,require('_process'))

},{"_process":5,"fbjs/lib/warning":4}],24:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
}).call(this,require('_process'))

},{"_process":5}],25:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _require = require('./ReactElement'),
    isValidElement = _require.isValidElement;

var factory = require('prop-types/factory');

module.exports = factory(isValidElement);
},{"./ReactElement":20,"prop-types/factory":7}],26:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;
},{}],27:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;
},{"./ReactComponent":16,"./ReactNoopUpdateQueue":23,"fbjs/lib/emptyObject":2,"object-assign":35}],28:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

module.exports = '15.5.4';
},{}],29:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
}).call(this,require('_process'))

},{"_process":5}],30:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactPropTypesSecret = require('./ReactPropTypesSecret');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = require('./ReactComponentTreeHook');
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = require('./ReactComponentTreeHook');
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
}).call(this,require('_process'))

},{"./ReactComponentTreeHook":17,"./ReactPropTypeLocationNames":24,"./ReactPropTypesSecret":26,"./reactProdInvariant":33,"_process":5,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],31:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;
},{}],32:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactElement = require('./ReactElement');

var invariant = require('fbjs/lib/invariant');

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
}).call(this,require('_process'))

},{"./ReactElement":20,"./reactProdInvariant":33,"_process":5,"fbjs/lib/invariant":3}],33:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;
},{}],34:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');
var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var getIteratorFn = require('./getIteratorFn');
var invariant = require('fbjs/lib/invariant');
var KeyEscapeUtils = require('./KeyEscapeUtils');
var warning = require('fbjs/lib/warning');

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
}).call(this,require('_process'))

},{"./KeyEscapeUtils":11,"./ReactCurrentOwner":18,"./ReactElementSymbol":21,"./getIteratorFn":31,"./reactProdInvariant":33,"_process":5,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],35:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],36:[function(require,module,exports){
'use strict';

module.exports = require('./lib/React');

},{"./lib/React":13}],37:[function(require,module,exports){
'use strict';

var Agenda = React.createClass({
    displayName: 'Agenda',


    getInitialState: function getInitialState() {
        return {
            ajaxUrl: './backend/index.php',
            weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            colors: ['#d20000', '#00509f', '#009f9f', '#009f50', '#9f5000', '#9f009f', '#9f9f00'],
            user_id: 0,
            activities: [],
            errorMessage: ''
        };
    },

    componentWillMount: function componentWillMount() {
        //this.setState({user_id: localStorage.getItem('userGoogleId')})


        this.loadActivities();
    },

    loadActivities: function loadActivities() {
        var element = this;

        var param = {
            'c': 'schedule',
            'a': 'loadActivities',
            'param': {
                'user': localStorage.getItem('userGoogleId')
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ activities: data });
            console.log(data);
        });
    },

    render: function render() {

        var element = this;
        var fullYear = '';

        var events = element.state.activities.map(function (event, i) {
            if (event) {

                var d = new Date(event.date);
                var day = element.state.weekDays[d.getDay()];
                var dayNr = d.getDate();
                var month = element.state.months[d.getMonth()];
                var year = d.getFullYear();
                var color = element.state.colors[d.getDay()];
                var setYear = false;

                if (year != fullYear) {
                    setYear = true;
                    fullYear = year;
                }

                return React.createElement(
                    'div',
                    null,
                    setYear ? React.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-10' },
                        React.createElement(
                            'h3',
                            { className: 'pull-right' },
                            year
                        )
                    ) : null,
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-12 col-md-10 event borderBottom' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-4 col-sm-2' },
                                React.createElement(
                                    'div',
                                    { className: 'dateLabel', style: { background: color } },
                                    React.createElement(
                                        'p',
                                        null,
                                        day
                                    ),
                                    React.createElement(
                                        'p',
                                        { className: 'dayNr' },
                                        dayNr
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        month
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-8 eventDetail' },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'h4',
                                        null,
                                        event.naam
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        event.time_from,
                                        'u - ',
                                        event.time_till,
                                        'u'
                                    )
                                )
                            )
                        )
                    )
                );
            }
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'errorMessage' },
                element.state.errorMessage
            ),
            React.createElement(
                'h2',
                null,
                'Agenda'
            ),
            events
        );
    }
});

module.exports = Agenda;

},{}],38:[function(require,module,exports){
'use strict';

var _reactGoogleLogin = require('react-google-login');

var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = require('./auth.js');

var userId = sessionStorage.getItem('userId');

var loginSuccess = function loginSuccess(response) {
  var userId = response['profileObj']['googleId'];
  var userName = response['profileObj']['name'];
  var userMail = response['profileObj']['email'];

  ReactDOM.render(React.createElement(Auth, { id: userId, name: userName, mail: userMail }), document.getElementById('app'));
};

var loginFailure = function loginFailure(response) {
  console.log(response);
};

if (userId) {

  ReactDOM.render(React.createElement(Auth, null), document.getElementById('app'));
} else {
  ReactDOM.render(React.createElement(
    'div',
    { className: 'login' },
    React.createElement(_reactGoogleLogin2.default, {
      clientId: '486491156289-1kvp2o81li65uq6vvon9odn01crv3fq2.apps.googleusercontent.com',
      buttonText: 'Login',
      prompt: 'select_account',
      onSuccess: loginSuccess,
      onFailure: loginFailure }),
    React.createElement(
      'div',
      { className: 'brand' },
      React.createElement(
        'h1',
        null,
        'aStenda'
      )
    )
  ), document.getElementById('app'));
}

/*let renderReact = () => {
    if(typeof gapi == 'undefined') {
        console.log('no gapi yet');
        _.debounce(renderReact, 500)();
    } else {
        ReactDOM.render(<Login />, document.getElementById("app"));
    }
};*/

//ReactDOM.render(<Login />, document.getElementById('app'));

},{"./auth.js":39,"react-google-login":10}],39:[function(require,module,exports){
'use strict';

var Navbar = require('./navbar.js');
var Failpage = require('./failpage.js');

var Auth = React.createClass({
	displayName: 'Auth',


	getInitialState: function getInitialState() {
		return {
			userId: this.props.id,
			userName: this.props.name,
			userMail: this.props.mail,
			failed: false,
			role: false
		};
	},

	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		if (nextState != this.state) {
			return true;
		} else {
			return false;
		}
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			userId: nextProps.id,
			userName: nextProps.name,
			userMail: nextProps.mail
		});
	},

	componentWillMount: function componentWillMount() {
		this.checkUser();
	},

	checkUser: function checkUser() {
		var element = this;
		var ajaxUrl = './backend/index.php';

		var param = {
			'c': 'user',
			'a': 'activeUser',
			'param': {
				'id': this.props.id,
				'mail': this.props.mail
			}
		};

		$.post({ url: ajaxUrl, data: param, dataType: 'json' }).done(function (data) {

			if (data['active']) {
				//Bestaande gebruiker
				element.setSession(data['active'][0]['rol']);
				element.setState({ 'role': data['active'][0]['rol'] });
			} else if (data['new']) {
				//Nieuwe gebruiker op aanvraag van beheerder
				element.setNewUser();
				element.setSession(data['new'][0]['rol']);
				element.setState({ 'role': data['new'][0]['rol'] });
			} else {
				//Nieuwe gebruiker die niet word toegelaten op de app
				element.setState({ 'failed': true });
				//<Failpage />
			}
		});
	},

	setNewUser: function setNewUser() {
		var ajaxUrl = './backend/index.php';

		var param = {
			'c': 'user',
			'a': 'setNewUser',
			'param': {
				'id': this.props.id,
				'name': this.props.name,
				'gmail': this.props.mail
			}
		};

		//console.log(param);

		$.post({ url: ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
			console.log(data);
		});
	},

	setSession: function setSession(role) {

		localStorage.setItem('userRole', role);
		localStorage.setItem('userGoogleId', this.state.userId);
	},

	render: function render() {

		//const loggedIn = this.state.active;
		//const loggedIn = localStorage.getItem('userId');

		return React.createElement(
			'div',
			null,
			this.state.failed ? React.createElement(Failpage, null) : React.createElement(
				'div',
				null,
				this.state.role ? React.createElement(Navbar, { role: this.state.role }) : null
			)
		);
	}
});

module.exports = Auth;

},{"./failpage.js":40,"./navbar.js":42}],40:[function(require,module,exports){
'use strict';

//var Agenda = require('./agenda.js');

var Fail = React.createClass({
    displayName: 'Fail',


    getInitialState: function getInitialState() {
        return {};
    },

    componentWillMount: function componentWillMount() {},

    handleClick: function handleClick() {
        localStorage.setItem('userRole', 0);
        localStorage.setItem('userGoogleId', '');

        window.location = "http://localhost/aStenda/";
    },

    render: function render() {

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'col-md-8 col-md-offset-2' },
                'You are not allowed in this application, click ',
                React.createElement(
                    'a',
                    { href: '#', onClick: this.handleClick },
                    'here'
                ),
                ' to go back to the home page'
            )
        );
    }
});

module.exports = Fail;

},{}],41:[function(require,module,exports){
'use strict';

//var Agenda = require('./agenda.js');

var Home = React.createClass({
    displayName: 'Home',


    getInitialState: function getInitialState() {
        return {
            role: 0

        };
    },

    componentWillMount: function componentWillMount() {
        this.setState({ role: localStorage.getItem('userRole') });
    },

    logout: function logout() {
        localStorage.setItem('userRole', 0);
        localStorage.setItem('userGoogleId', '');

        window.location = "http://localhost/aStenda/";
    },

    render: function render() {
        var element = this;

        var role = this.state.role;

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'menu col-md-2' },
                React.createElement(
                    'div',
                    { className: 'sidebar-nav' },
                    React.createElement(
                        'div',
                        { className: 'sidebar-nav' },
                        React.createElement(
                            'div',
                            { className: 'sidebar-brand' },
                            React.createElement(
                                'h1',
                                null,
                                'aStenda'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'navbar navbar-default', role: 'navigation' },
                            React.createElement(
                                'div',
                                { className: 'navbar-header' },
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '.sidebar-navbar-collapse' },
                                    React.createElement(
                                        'span',
                                        { className: 'sr-only' },
                                        'Toggle navigation'
                                    ),
                                    React.createElement('span', { className: 'icon-bar' }),
                                    React.createElement('span', { className: 'icon-bar' }),
                                    React.createElement('span', { className: 'icon-bar' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'logo-wrapper' },
                                React.createElement('img', { className: 'logo', src: './data/logov2.png' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'navbar-collapse collapse sidebar-navbar-collapse' },
                                React.createElement(
                                    'ul',
                                    { className: 'nav navbar-nav' },
                                    role > 80 && React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            ReactRouter.Link,
                                            { to: '/users' },
                                            React.createElement('i', { className: 'fa fa-user-circle-o fa-fw', 'aria-hidden': 'true' }),
                                            ' Users'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            ReactRouter.Link,
                                            { to: '/agenda' },
                                            React.createElement('i', { className: 'fa fa-calendar fa-fw', 'aria-hidden': 'true' }),
                                            ' Agenda'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: 'dropdown' },
                                        React.createElement(
                                            'a',
                                            { className: 'dropdown-toggle', 'data-toggle': 'dropdown', href: '#' },
                                            React.createElement('i', { className: 'fa fa-tasks fa-fw', 'aria-hidden': 'true' }),
                                            ' Schedule',
                                            React.createElement('span', { className: 'caret' })
                                        ),
                                        React.createElement(
                                            'ul',
                                            { className: 'dropdown-menu' },
                                            React.createElement(
                                                'li',
                                                null,
                                                React.createElement(
                                                    ReactRouter.Link,
                                                    { to: '/schedule' },
                                                    'Schedule'
                                                )
                                            ),
                                            role > 80 && React.createElement(
                                                'li',
                                                null,
                                                React.createElement(
                                                    ReactRouter.Link,
                                                    { to: '/scheduleMaker' },
                                                    'Make schedule'
                                                )
                                            ),
                                            role > 80 && React.createElement(
                                                'li',
                                                null,
                                                React.createElement(
                                                    ReactRouter.Link,
                                                    { to: '/template' },
                                                    'Template'
                                                )
                                            ),
                                            role > 80 && React.createElement(
                                                'li',
                                                null,
                                                React.createElement(
                                                    ReactRouter.Link,
                                                    { to: '/types' },
                                                    'Types'
                                                )
                                            ),
                                            React.createElement(
                                                'li',
                                                null,
                                                React.createElement(
                                                    ReactRouter.Link,
                                                    { to: '/skipaday' },
                                                    'Skip a day'
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: 'logout', onClick: element.logout },
                                        React.createElement(
                                            'a',
                                            null,
                                            React.createElement('i', { className: 'fa fa-sign-out fa-fw', 'aria-hidden': 'true' }),
                                            ' Logout'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'content col-md-10' },
                this.props.children
            )
        );
    }
});

module.exports = Home;

},{}],42:[function(require,module,exports){
'use strict';

var Home = require('./home.js');
var Agenda = require('./agenda.js');
var Users = require('./users.js');
var Template = require('./template.js');
var Types = require('./types.js');
var ScheduleMaker = require('./scheduleMaker.js');
var Schedule = require('./schedule.js');
var Skip = require('./skipaday.js');

var _ReactRouter = ReactRouter,
    Router = _ReactRouter.Router,
    Route = _ReactRouter.Route,
    IndexRoute = _ReactRouter.IndexRoute,
    IndexLink = _ReactRouter.IndexLink,
    hashHistory = _ReactRouter.hashHistory,
    Link = _ReactRouter.Link;


var Navbar = React.createClass({
  displayName: 'Navbar',


  getInitialState: function getInitialState() {
    return {
      role: 0
    };
  },

  componentWillMount: function componentWillMount() {},

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      role: nextProps.role
    });
  },

  render: function render() {

    //console.log(this.state.role)

    return React.createElement(
      Router,
      { history: hashHistory },
      React.createElement(
        Route,
        { path: '/', component: Home },
        React.createElement(IndexRoute, { component: Agenda }),
        ' // Default page',
        React.createElement(Route, { path: 'users', component: Users }),
        React.createElement(Route, { path: 'agenda', component: Agenda }),
        React.createElement(Route, { path: 'schedule', component: Schedule }),
        React.createElement(Route, { path: 'scheduleMaker', component: ScheduleMaker }),
        React.createElement(Route, { path: 'template', component: Template }),
        React.createElement(Route, { path: 'types', component: Types }),
        React.createElement(Route, { path: 'skipaday', component: Skip })
      )
    );
  }
});

module.exports = Navbar;

/*
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
 	  <IndexRoute component={Agenda}/> // Default page
 	    <Route path="agenda" component={Agenda} />
      <Route path="schedule" component={Schedule} />
    </Route>
  </Router>, document.getElementById('app'));*/

},{"./agenda.js":37,"./home.js":41,"./schedule.js":46,"./scheduleMaker.js":47,"./skipaday.js":48,"./template.js":49,"./types.js":50,"./users.js":51}],43:[function(require,module,exports){
"use strict";

var Popup = React.createClass({
    displayName: "Popup",


    getInitialState: function getInitialState() {
        return {
            message: ''
        };
    },

    componentWillMount: function componentWillMount() {},

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            message: nextProps.message
        });
    },

    handleClick: function handleClick(e) {
        e.preventDefault();

        //var name = e.target.className; 
        var action = e.target.value;

        //console.log(name)   

        //if(name == 'confirm-bg' || typeof action !== 'undefined'){

        this.props.handleClick(action);
        //}
    },

    render: function render() {

        return React.createElement(
            "div",
            { className: "confirm-bg" },
            React.createElement(
                "div",
                { className: "confirm col-md-2 col-md-offset-5" },
                React.createElement(
                    "div",
                    { className: "row message" },
                    this.props.message
                ),
                React.createElement(
                    "div",
                    { className: "row buttons" },
                    React.createElement("input", { className: "btn btn-default", type: "button", value: "Yes", onClick: this.handleClick }),
                    React.createElement("input", { className: "btn btn-default", type: "button", value: "No", onClick: this.handleClick })
                )
            )
        );
    }
});

module.exports = Popup;

},{}],44:[function(require,module,exports){
'use strict';

var Request = React.createClass({
    displayName: 'Request',


    getInitialState: function getInitialState() {
        return {
            ajaxUrl: './backend/index.php',
            user_id: 0
        };
    },

    componentWillMount: function componentWillMount() {
        this.setState({ user_id: localStorage.getItem('userGoogleId') });
    },

    doRequest: function doRequest(dateFrom, dateTill, timeFrom, timeTill, reason) {

        var element = this;

        var param = {
            'c': 'request',
            'a': 'requestSkip',
            'param': {
                'dateFrom': dateFrom,
                'dateTill': dateTill,
                'timeFrom': timeFrom,
                'timeTill': timeTill,
                'reason': reason,
                'user_id': element.state.user_id
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.props.rerender();
        });
    },

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        var element = this;

        var dateFrom = element.refs.requestFromDate.value;
        var timeFrom = element.refs.requestFromTime.value;
        var dateTill = element.refs.requestTillDate.value;
        var timeTill = element.refs.requestTillTime.value;
        var reason = element.refs.requestReason.value;

        if (dateFrom == '' || dateTill == '' || reason == '') {
            return false;
        } else {
            element.doRequest(dateFrom, dateTill, timeFrom, timeTill, reason);

            element.refs.requestFromDate.value = '';
            element.refs.requestFromTime.value = '';
            element.refs.requestTillDate.value = '';
            element.refs.requestTillTime.value = '';
            element.refs.requestReason.value = '';
        }
    },

    checkFields: function checkFields(e) {
        e.preventDefault();

        var target = e.target.id;

        if (target == 'dateFrom') {
            document.getElementById('dateTill').setAttribute('min', e.target.value);
        } else {
            document.getElementById('dateFrom').setAttribute('max', e.target.value);
        }
    },

    render: function render() {
        var element = this;

        //console.log(this.state.user_id);

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-5' },
                    React.createElement(
                        'h3',
                        null,
                        'Request a day off!'
                    ),
                    React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'From'
                            ),
                            React.createElement('input', { id: 'dateFrom', type: 'date', className: 'form-control requestDate', ref: 'requestFromDate', onChange: element.checkFields }),
                            React.createElement('input', { type: 'time', className: 'form-control requestTime', ref: 'requestFromTime' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'Till'
                            ),
                            React.createElement('input', { id: 'dateTill', type: 'date', className: 'form-control requestDate', ref: 'requestTillDate', onChange: element.checkFields }),
                            React.createElement('input', { type: 'time', className: 'form-control requestTime', ref: 'requestTillTime' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'Reason'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control', ref: 'requestReason' })
                        ),
                        React.createElement('input', { className: 'btn pull-right', type: 'button', value: 'Request', onClick: element.handleSubmit })
                    )
                )
            )
        );
    }
});

module.exports = Request;

},{}],45:[function(require,module,exports){
'use strict';

//var Agenda = require('./agenda.js');

var Requests = React.createClass({
    displayName: 'Requests',


    getInitialState: function getInitialState() {
        return {
            ajaxUrl: './backend/index.php',
            pending: [],
            approved: [],
            rerender: false,
            user_id: 0,
            role: 0
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.loadRequests();
    },

    componentWillMount: function componentWillMount() {
        this.setState({
            user_id: localStorage.getItem('userGoogleId'),
            role: localStorage.getItem('userRole')
        });

        this.loadRequests();
    },

    loadRequests: function loadRequests() {
        var element = this;

        var param = {
            'c': 'request',
            'a': 'allRequests',
            'param': {
                'role': element.state.role,
                'user_id': element.state.user_id
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ pending: data['pending'], approved: data['approved'] });
        });
    },

    approveRequest: function approveRequest(e) {
        e.preventDefault();

        var element = this;

        var request = e.target.getAttribute('data-request');
        var user = e.target.getAttribute('data-user');

        var param = {
            'c': 'request',
            'a': 'approveRequest',
            'param': {
                'request': request,
                'user': user
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.loadRequests();
        });
    },

    declineRequest: function declineRequest(e) {
        e.preventDefault();

        var element = this;

        var request = e.target.getAttribute('data-request');
        var user = e.target.getAttribute('data-user');

        var param = {
            'c': 'request',
            'a': 'declineRequest',
            'param': {
                'request': request,
                'user': user
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.loadRequests();
        });
    },

    render: function render() {
        var element = this;

        var pending = this.state.pending.map(function (request, i) {

            var dateTimeFrom = request.time_from.split(" ");
            var aDateFrom = dateTimeFrom[0].split("-");
            var dateFrom = aDateFrom[2] + '-' + aDateFrom[1] + '-' + aDateFrom[0];
            var aTimeFrom = dateTimeFrom[1].split(":");
            var timeFrom = aTimeFrom[0] + ':' + aTimeFrom[1];
            var datetimefrom = dateFrom + ' ' + timeFrom;

            var dateTimeTill = request.time_till.split(" ");
            var aDateTill = dateTimeTill[0].split("-");
            var dateTill = aDateTill[2] + '-' + aDateTill[1] + '-' + aDateTill[0];
            var aTimeTill = dateTimeTill[1].split(":");
            var timeTill = aTimeTill[0] + ':' + aTimeTill[1];
            var datetimetill = dateTill + ' ' + timeTill;

            if (request) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-3' },
                                request.naam
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-4' },
                                datetimefrom
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-4' },
                                datetimetill
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-1' },
                                element.state.role > 80 && React.createElement('i', { className: 'fa fa-check approve', 'data-request': request.req_id, 'data-user': request.usr_id, 'aria-hidden': 'true', onClick: element.approveRequest }),
                                React.createElement('i', { className: 'fa fa-times delete', 'data-request': request.req_id, 'data-user': request.usr_id, 'aria-hidden': 'true', onClick: element.declineRequest })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-12' },
                                request.reason
                            )
                        )
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-12' },
                                'No requests!'
                            )
                        )
                    )
                );
            }
        });

        var approved = this.state.approved.map(function (request, i) {
            if (request) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-3' },
                                request.naam
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-4' },
                                request.time_from
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-4' },
                                request.time_till
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-1' },
                                React.createElement('i', { className: 'fa fa-check approved', 'aria-hidden': 'true' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-12' },
                                request.reason
                            )
                        )
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-12' },
                                'No requests!'
                            )
                        )
                    )
                );
            }
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-5' },
                    React.createElement(
                        'h3',
                        null,
                        'Pending requests'
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        pending
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-5' },
                    React.createElement(
                        'h3',
                        null,
                        'Approved requests'
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        approved
                    )
                )
            )
        );
    }
});

module.exports = Requests;

},{}],46:[function(require,module,exports){
'use strict';

var Popup = require('./popup.js');

var ScheduleMaker = React.createClass({
    displayName: 'ScheduleMaker',


    getInitialState: function getInitialState() {
        return {
            weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            days: [],
            weeks: [],
            daysInWeek: 7,
            ajaxUrl: './backend/index.php',
            template: [],
            errorMessage: '',
            users: [],
            schedule: [],
            types: []
        };
    },

    componentWillMount: function componentWillMount() {
        var element = this;

        element.loadTemplate();
        element.loadUsers();
        element.loadSchedule();
        element.loadWeeks();
        element.loadTypes();
    },

    loadWeeks: function loadWeeks() {
        var element = this;

        var param = {
            'c': 'schedule',
            'a': 'loadWeeks',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ weeks: data });
        });
    },

    loadTemplate: function loadTemplate() {
        var element = this;

        var param = {
            'c': 'template',
            'a': 'loadTemplate',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ template: data });
        });
    },

    loadUsers: function loadUsers() {
        var element = this;

        var param = {
            'c': 'user',
            'a': 'allUsers',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {

            element.setState({ users: data['users'] });
        });
    },

    loadSchedule: function loadSchedule() {
        var element = this;

        var param = {
            'c': 'schedule',
            'a': 'getSchedule',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {

            element.setState({ schedule: data });
        });
    },

    loadTypes: function loadTypes() {
        var element = this;

        var param = {
            'c': 'type',
            'a': 'getAllTypes',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ types: data });
        });
    },

    getFirstDayOfWeek: function getFirstDayOfWeek(w, y) {
        var today = new Date(y, 0, 1 + (w - 1) * 7);
        var dayOfWeekStartingSundayZeroIndexBased = today.getDay(); // 0 : Sunday ,1 : Monday,2,3,4,5,6 : Saturday
        var mondayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);

        return mondayOfWeek;
    },

    handleWeekClick: function handleWeekClick(e) {
        e.preventDefault();

        var element = this;

        var values = e.target.value.split("|");
        var week = values[0];
        var year = values[1];

        var startDate = element.getFirstDayOfWeek(week, year);

        var thisWeek = [];
        element.setState({ days: [] });

        for (var i = 0; i < element.state.daysInWeek; i++) {
            var day = new Date(startDate);
            var next = day.setDate(day.getDate() + i);
            var dateObject = new Date(next);

            var dd = dateObject.getDate();
            var mm = dateObject.getMonth() + 1;
            var Y = dateObject.getFullYear();

            var date = dd + '-' + mm + '-' + Y;

            thisWeek.push(date);
        }

        element.setState({ days: thisWeek });
    },

    render: function render() {
        var element = this;

        var template = element.state.template;
        var schedule = element.state.schedule;

        var legenda = element.state.types.map(function (t, i) {
            if (t) {

                return React.createElement(
                    'div',
                    { className: 'col-md-3' },
                    React.createElement(
                        'div',
                        { className: 'legenda', style: { background: t.color } },
                        t.name
                    )
                );
            }
        });

        var weekButtons = element.state.weeks.map(function (w, i) {
            if (w) {

                var value = w.week + '|' + w.year;

                return React.createElement(
                    'button',
                    { className: 'btn btn-default', value: value, onClick: element.handleWeekClick },
                    w.week
                );
            }
        });

        var week = element.state.days.map(function (day, i) {
            if (day) {

                var fullDay = element.state.weekDays[i];

                if (template[fullDay]) {
                    var times = template[fullDay].map(function (val, i) {
                        var time = val.split('|');

                        var key = time[0] + day + time[2];
                        var employee = schedule[key];

                        return React.createElement(
                            'div',
                            null,
                            typeof employee != 'undefined' ? React.createElement(
                                'div',
                                { className: 'employment borderAll', 'data-unique': time[2], 'data-time': time[0], 'data-date': day, style: { background: time[1] } },
                                time[0],
                                React.createElement(
                                    'div',
                                    { className: 'employee' },
                                    employee
                                )
                            ) : null
                        );
                    });
                }

                return React.createElement(
                    'div',
                    { className: 'tableBody' },
                    React.createElement(
                        'h4',
                        { className: 'borderBottom dateDay' },
                        day
                    ),
                    React.createElement(
                        'div',
                        { className: 'fullDay' },
                        fullDay
                    ),
                    React.createElement(
                        'div',
                        { className: 'borderAll' },
                        times ? times : ''
                    )
                );
            }
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'errorMessage' },
                element.state.errorMessage
            ),
            React.createElement(
                'h2',
                null,
                'Schedule'
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-5 col-md-offset-5' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        legenda
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-5 col-sm-5' },
                    'Weeks',
                    weekButtons
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-10' },
                    week
                )
            )
        );
    }
});

module.exports = ScheduleMaker;

},{"./popup.js":43}],47:[function(require,module,exports){
'use strict';

var Popup = require('./popup.js');

var ScheduleMaker = React.createClass({
    displayName: 'ScheduleMaker',


    getInitialState: function getInitialState() {
        return {
            weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            days: [],
            yearCount: 10,
            weeks: [],
            years: [],
            daysInWeek: 7,
            ajaxUrl: './backend/index.php',
            template: [],
            errorMessage: '',
            users: [],
            selectedUser: '',
            tempSchedule: [],
            param: [],
            activeWeek: 0,
            activeYear: 0
        };
    },

    componentWillMount: function componentWillMount() {
        var element = this;

        element.loadTemplate();
        element.loadUsers();
        element.loadTempSchedule();

        for (var i = 1; i < 53; i++) {

            //if week nr nog niet voorkomt in roosters die klaar zijn dan  || Bij het selecteren of er al een rooster bestaat
            element.state.weeks.push(i);
        }

        var date = new Date();
        var year = date.getFullYear();

        for (var i = 0; i <= element.state.yearCount; i++) {
            element.state.years.push(year + i);
        }
    },

    loadTemplate: function loadTemplate() {
        var element = this;

        var param = {
            'c': 'template',
            'a': 'loadTemplate',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ template: data });
        });
    },

    loadUsers: function loadUsers() {
        var element = this;

        var param = {
            'c': 'user',
            'a': 'allUsers',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {

            element.setState({ users: data['users'] });
        });
    },

    loadTempSchedule: function loadTempSchedule() {
        var element = this;

        var param = {
            'c': 'schedule',
            'a': 'getTempSchedule',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {

            element.setState({ tempSchedule: data });
        });
    },

    getCurrentWeekAndYear: function getCurrentWeekAndYear() {
        var now = new Date();
        var oneJan = new Date(now.getFullYear(), 0, 1);
        var week = Math.ceil(((now - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
        var year = now.getFullYear();

        var weekYear = [];

        weekYear.push(week, year);

        return weekYear;
    },

    getFirstDayOfWeek: function getFirstDayOfWeek(w, y) {
        var today = new Date(y, 0, 1 + (w - 1) * 7);
        var dayOfWeekStartingSundayZeroIndexBased = today.getDay(); // 0 : Sunday ,1 : Monday,2,3,4,5,6 : Saturday
        var mondayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);

        return mondayOfWeek;
    },

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        var element = this;

        var week = element.refs.week.value;
        var year = element.refs.year.value;

        var current = element.getCurrentWeekAndYear();

        if (week < current[0] && year == current[1] || year < current[1]) {
            element.setState({ errorMessage: 'This week is in the past' });
        } else {
            element.setState({ errorMessage: '', activeWeek: week, activeYear: year });

            var startDate = element.getFirstDayOfWeek(week, year);

            var thisWeek = [];
            element.setState({ days: [] });

            for (var i = 0; i < element.state.daysInWeek; i++) {
                var day = new Date(startDate);
                var next = day.setDate(day.getDate() + i);
                var dateObject = new Date(next);

                var dd = dateObject.getDate();
                var mm = dateObject.getMonth() + 1;
                var Y = dateObject.getFullYear();

                var date = dd + '-' + mm + '-' + Y;

                thisWeek.push(date);
            }

            element.setState({ days: thisWeek });
        }
    },

    handleUserClick: function handleUserClick(e) {
        e.preventDefault();

        var element = this;

        var selected = e.target.getAttribute('data-user');

        element.setState({ selectedUser: selected });
    },

    setUserToEmployment: function setUserToEmployment(e) {
        e.preventDefault();

        var element = this;

        var times = e.target.getAttribute('data-time');
        var date = e.target.getAttribute('data-date');
        var unique = e.target.getAttribute('data-unique');
        var user_id = element.state.selectedUser;

        element.setState({ errorMessage: '' });

        if (user_id == '') {
            return false;
        } else {

            var param = {
                'c': 'schedule',
                'a': 'setTempEmployment',
                'param': {
                    'times': times,
                    'date': date,
                    'user_id': user_id,
                    'unique': unique
                }
            };

            console.log(e.target);

            $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {

                if (!data) {
                    element.setState({ errorMessage: 'You approved a day off request on this date for this user!' });
                } else {
                    element.loadTempSchedule();
                }
            });
        }

        element.setState({ selectedUser: '' });
    },

    popup: function popup(e) {
        e.preventDefault();

        var element = this;

        if (element.state.days.length > 0) {
            this.setState({ showConfirm: true });
        } else {
            return false;
        }
    },

    sendSchedule: function sendSchedule() {
        var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var element = this;

        if (action == "Yes") {

            var param = {
                'c': 'schedule',
                'a': 'sendSchedule',
                'param': {
                    'first': element.state.days[0],
                    'last': element.state.days[6],
                    'week': element.state.activeWeek,
                    'year': element.state.activeYear
                }
            };

            $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
                element.setState({ showConfirm: false });
                element.setState({ errorMessage: 'Schedule sent!' });
            });
        } else {

            element.setState({ showConfirm: false });
        }
    },

    render: function render() {
        var element = this;

        var template = element.state.template;
        var tempSchedule = element.state.tempSchedule;

        var selectWeek = element.state.weeks.map(function (w, i) {
            if (w) {
                return React.createElement(
                    'option',
                    { value: w },
                    w
                );
            }
        });

        var selectYear = element.state.years.map(function (y, i) {
            if (y) {
                return React.createElement(
                    'option',
                    { value: y },
                    y
                );
            }
        });

        var week = element.state.days.map(function (day, i) {
            if (day) {

                var fullDay = element.state.weekDays[i];

                if (template[fullDay]) {
                    var times = template[fullDay].map(function (val, i) {
                        var time = val.split('|');

                        var key = time[0] + day + time[2];
                        var employee = tempSchedule[key];

                        return React.createElement(
                            'div',
                            { className: 'employment borderAll', 'data-unique': time[2], 'data-time': time[0], 'data-date': day, style: { background: time[1] }, onClick: element.setUserToEmployment },
                            time[0],
                            React.createElement(
                                'div',
                                { className: 'employee', 'data-unique': time[2], 'data-time': time[0], 'data-date': day },
                                employee,
                                typeof employee != 'undefined' ? React.createElement('i', { className: 'fa fa-check fa-fw', 'aria-hidden': 'true' }) : null
                            )
                        );
                    });
                }

                return React.createElement(
                    'div',
                    { className: 'tableBody' },
                    React.createElement(
                        'h4',
                        { className: 'borderBottom dateDay' },
                        day
                    ),
                    React.createElement(
                        'div',
                        { className: 'fullDay' },
                        fullDay
                    ),
                    React.createElement(
                        'div',
                        { className: 'borderAll' },
                        times ? times : ''
                    )
                );
            }
        });

        var users = element.state.users.map(function (user, i) {
            if (user) {

                var classes = "col-xs-12 col-sm-6 col-md-2";
                classes += user.id == element.state.selectedUser ? " selectedUser" : "";

                return React.createElement(
                    'div',
                    { className: classes },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'a',
                            { href: '#', 'data-user': user.id, onClick: element.handleUserClick },
                            user.naam
                        )
                    )
                );
            }
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'errorMessage' },
                element.state.errorMessage
            ),
            React.createElement(
                'h2',
                null,
                'Schedule maker'
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-6 col-sm-5' },
                    React.createElement(
                        'form',
                        { className: 'form-inline' },
                        React.createElement(
                            'select',
                            { className: 'form-control', ref: 'week' },
                            selectWeek
                        ),
                        React.createElement(
                            'select',
                            { className: 'form-control', ref: 'year' },
                            selectYear
                        ),
                        React.createElement('input', { className: 'btn', type: 'button', value: 'Select', onClick: element.handleSubmit })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-xs-6 col-sm-5' },
                    React.createElement('input', { className: 'btn pull-right', type: 'button', value: 'Publish!', onClick: element.popup })
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-10' },
                    week
                )
            ),
            React.createElement(
                'div',
                { className: 'row scheduleMakerUsers' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 col-md-10' },
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            users
                        )
                    )
                )
            ),
            element.state.showConfirm ? React.createElement(Popup, { message: 'Publish this schedule?', handleClick: element.sendSchedule }) : null
        );
    }
});

module.exports = ScheduleMaker;

},{"./popup.js":43}],48:[function(require,module,exports){
'use strict';

var Requests = require('./requests.js');
var Request = require('./request.js');

var Skip = React.createClass({
    displayName: 'Skip',


    getInitialState: function getInitialState() {
        return {
            role: 0,
            rerender: 'false'
        };
    },

    componentWillMount: function componentWillMount() {
        this.setState({ role: localStorage.getItem('userRole') });
    },

    rerender: function rerender() {
        this.setState({ rerender: 'true' });
    },

    render: function render() {

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h2',
                null,
                'Skip a day'
            ),
            React.createElement(Request, { rerender: this.rerender }),
            React.createElement(Requests, { rerender: this.state.rerender })
        );
    }
});

module.exports = Skip;

},{"./request.js":44,"./requests.js":45}],49:[function(require,module,exports){
'use strict';

var Template = React.createClass({
    displayName: 'Template',


    getInitialState: function getInitialState() {
        return {
            weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            types: [],
            ajaxUrl: './backend/index.php',
            template: []
        };
    },

    componentWillMount: function componentWillMount() {

        this.loadTemplate();
        this.loadTypes();
    },

    loadTemplate: function loadTemplate() {
        var element = this;

        var param = {
            'c': 'template',
            'a': 'loadTemplate',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ template: data });
        });
    },

    loadTypes: function loadTypes() {
        var element = this;

        var param = {
            'c': 'type',
            'a': 'getAllTypes',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ types: data });
        });
    },

    addEmployment: function addEmployment(day, from, till, type) {
        var element = this;

        var param = {
            'c': 'template',
            'a': 'addEmployment',
            'param': {
                'day': day,
                'from': from,
                'till': till,
                'type': type
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.loadTemplate();
        });
    },

    removeEmployment: function removeEmployment(e) {
        e.preventDefault();

        var element = this;

        var day = e.target.getAttribute('data-day');
        var time = e.target.getAttribute('data-time');

        var param = {
            'c': 'template',
            'a': 'removeEmployment',
            'param': {
                'day': day,
                'time': time
            }
        };
        //console.log(param)

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.loadTemplate();
        });
    },

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        var element = this;

        var day = element.refs.day.value;
        var type = element.refs.type.value;
        var from = element.refs.from.value;
        var till = element.refs.till.value;

        if (from == '' || till == '') {
            return false;
        } else {
            element.addEmployment(day, from, till, type);

            element.refs.from.value = '';
            element.refs.till.value = '';
        }
    },

    render: function render() {
        var element = this;

        var template = element.state.template;

        //console.log(element.state.types)

        var selectDay = element.state.weekDays.map(function (day, i) {
            if (day) {
                return React.createElement(
                    'option',
                    { value: day },
                    day
                );
            }
        });

        var selectType = element.state.types.map(function (type, i) {
            if (type) {
                return React.createElement(
                    'option',
                    { className: 'templateColorOption', value: type.id, style: { background: type.color } },
                    type.name
                );
            }
        });

        var days = element.state.weekDays.map(function (day, i) {
            if (day) {

                if (template[day]) {
                    var times = template[day].map(function (val, i) {
                        var time = val.split('|');
                        return React.createElement(
                            'div',
                            { className: 'employment borderAll', style: { background: time[1] } },
                            time[0],
                            React.createElement('i', { className: 'fa fa-times delete pull-right', 'data-day': day, 'data-time': time[0], onClick: element.removeEmployment, 'aria-hidden': 'true' })
                        );
                    });
                }

                return React.createElement(
                    'div',
                    { className: 'tableBody' },
                    React.createElement(
                        'h4',
                        { className: 'borderBottom' },
                        day
                    ),
                    React.createElement(
                        'div',
                        { className: 'borderAll' },
                        times ? times : ''
                    )
                );
            }
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h2',
                null,
                'Template'
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-10' },
                    React.createElement(
                        'form',
                        { className: 'form-inline' },
                        React.createElement(
                            'select',
                            { className: 'form-control', ref: 'day' },
                            selectDay
                        ),
                        React.createElement(
                            'select',
                            { className: 'form-control', ref: 'type' },
                            selectType
                        ),
                        React.createElement('input', { className: 'form-control', type: 'time', ref: 'from' }),
                        React.createElement('input', { className: 'form-control', type: 'time', ref: 'till' }),
                        React.createElement('input', { className: 'btn', type: 'button', value: 'Add', onClick: element.handleSubmit })
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-10' },
                    days
                )
            )
        );
    }
});

module.exports = Template;

},{}],50:[function(require,module,exports){
'use strict';

var Types = React.createClass({
    displayName: 'Types',


    getInitialState: function getInitialState() {
        return {
            types: [],
            ajaxUrl: './backend/index.php',
            colors: ['#d20000', '#00509f', '#009f9f', '#009f50', '#9f5000', '#9f009f', '#9f9f00', '#f6fafd']
        };
    },

    componentWillMount: function componentWillMount() {
        var element = this;

        element.loadTypes();
    },

    loadTypes: function loadTypes() {
        var element = this;

        var param = {
            'c': 'type',
            'a': 'getAllTypes',
            'param': {}
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.setState({ types: data });
        });
    },

    chooseColor: function chooseColor(e) {
        e.preventDefault();

        var element = this;

        var id = e.target.parentElement.parentElement.parentElement.parentElement.id;
        var color = e.target.getAttribute('data-value');
        var elem = e.target.parentElement.parentElement.parentElement;

        //e.target.parentElement.parentElement.parentElement.style.display = 'none';

        elem.className = 'colorInputChoose noHover';

        var param = {
            'c': 'type',
            'a': 'updateColor',
            'param': {
                'id': id,
                'color': color
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.loadTypes();
            elem.className = 'colorInputChoose';
        });
    },

    changeName: function changeName(e) {
        e.preventDefault();

        var element = this;

        var val = e.target.value;
        var id = e.target.getAttribute('data-id');

        var param = {
            'c': 'type',
            'a': 'changeName',
            'param': {
                'id': id,
                'name': val
            }
        };

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {});
    },

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        var element = this;

        var name = element.refs.name.value;
        var color = element.refs.color.value;

        if (name == '' || color == '') {
            return false;
        } else {

            var param = {
                'c': 'type',
                'a': 'addType',
                'param': {
                    'name': name,
                    'color': color
                }
            };

            $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
                element.loadTypes();
            });

            element.refs.name.value = '';
            element.refs.color.value = '';
        }
    },

    removeType: function removeType(e) {
        e.preventDefault();

        var element = this;

        var id = e.target.getAttribute('data-id');

        var param = {
            'c': 'type',
            'a': 'removeType',
            'param': {
                'id': id
            }
        };

        console.log(param);

        $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            element.loadTypes();
        });
    },

    render: function render() {
        var element = this;

        var selectColor = element.state.colors.map(function (color, i) {
            if (color) {
                return React.createElement('option', { value: color, style: { background: color } });
            }
        });

        var colors = element.state.colors.map(function (color, i) {
            if (color) {
                return React.createElement(
                    'div',
                    { className: 'col-xs-3' },
                    React.createElement('div', { className: 'colorChooseColor', 'data-value': color, style: { background: color }, onClick: element.chooseColor })
                );
            }
        });

        var types = element.state.types.map(function (type, i) {
            if (type) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-8' },
                                React.createElement('input', { className: 'form-control typeInput', type: 'text', maxLength: '16', 'data-id': type.id, defaultValue: type.name, onChange: element.changeName })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-3' },
                                React.createElement(
                                    'div',
                                    { id: type.id, className: 'colorInput', style: { background: type.color } },
                                    React.createElement(
                                        'div',
                                        { className: 'colorInputChoose' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            colors
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-1' },
                                type.id == 1 ? null : React.createElement('i', { className: 'fa fa-times pull-right delete', 'data-id': type.id, 'aria-hidden': 'true', onClick: element.removeType })
                            )
                        )
                    )
                );
            }
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h2',
                null,
                'Employment types'
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-10' },
                    React.createElement(
                        'h3',
                        null,
                        'Add type'
                    ),
                    React.createElement(
                        'form',
                        { className: 'form-inline' },
                        React.createElement('input', { className: 'form-control', placeholder: 'Name', type: 'text', ref: 'name', maxLength: '16' }),
                        React.createElement(
                            'select',
                            { className: 'form-control', ref: 'color' },
                            selectColor
                        ),
                        React.createElement('input', { className: 'btn', type: 'button', value: 'Add', onClick: element.handleSubmit })
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                        'h3',
                        null,
                        'Types'
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        types
                    )
                )
            )
        );
    }
});

module.exports = Types;

},{}],51:[function(require,module,exports){
'use strict';

var Popup = require('./popup.js');

var Users = React.createClass({
    displayName: 'Users',


    getInitialState: function getInitialState() {
        return {
            users: [],
            pendingUsers: [],
            searchUsers: [],
            ajaxUrl: './backend/index.php',
            errorMessage: '',
            showConfirm: false,
            param: []
        };
    },

    componentWillMount: function componentWillMount() {
        this.loadUsers();
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        //console.log(this.state, nextState);
        if (nextState != this.state || nextProps != this.props) {
            return true;
        } else {
            return false;
        }
    },

    loadUsers: function loadUsers() {
        var element = this;
        var ajaxUrl = './backend/index.php';

        var param = {
            'c': 'user',
            'a': 'allUsers',
            'param': {}
        };

        $.post({ url: ajaxUrl, data: param, dataType: 'json' }).done(function (data) {

            element.setState({ users: data['users'], pendingUsers: data['pending_users'] });
        });
    },

    inviteNewUser: function inviteNewUser(gmail) {
        var element = this;

        var param = {
            'c': 'user',
            'a': 'inviteNewUser',
            'param': {
                'gmail': gmail
            }
        };

        $.post({ url: this.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
            //console.log(data);

            if (data) {
                document.getElementById('addUserInput').value = '';
                element.setState({ errorMessage: 'User invited!' });
                element.loadUsers();
            } else {
                element.setState({ errorMessage: 'User already excists or invited!' });
            }
        });
    },

    handleUserClick: function handleUserClick(e) {
        e.preventDefault();

        //console.log(e);
    },

    handlePendingUserClick: function handlePendingUserClick(e) {
        e.preventDefault();

        //console.log(e);
    },

    handleAddUserClick: function handleAddUserClick(e) {
        e.preventDefault();

        var value = e.target.parentElement.parentElement.querySelector('input').value;

        if (value != '') {
            //Add User
            var regex = /@gmail\.com$/;
            if (regex.test(value)) {
                //Valid gmail adres
                this.inviteNewUser(value);
            } else {
                //Geen gmail adres
                this.setState({ errorMessage: 'Email is not a valid gmail account!' });
                return false;
            }
        } else {
            //Geen waarde ingevuld
            this.setState({ errorMessage: 'Typ in a gmail account!' });
            return false;
        }
    },

    popup: function popup(e) {
        e.preventDefault();

        var table = e.target.getAttribute('data-table');
        var id = e.target.getAttribute('data-id');

        var param = {
            'table': table,
            'id': id
        };

        this.setState({
            param: [param]
        });

        this.setState({ showConfirm: true });
    },

    removeUser: function removeUser(action) {
        var element = this;

        if (action == "Yes") {

            var param = {
                'c': 'user',
                'a': 'removeUser',
                'param': {
                    'table': element.state.param[0]['table'],
                    'id': element.state.param[0]['id']
                }
            };

            //console.log(param)

            $.post({ url: element.state.ajaxUrl, data: param, dataType: 'json' }).done(function (data) {
                element.setState({ showConfirm: false });
                element.loadUsers();
            });
        } else {
            element.setState({ showConfirm: false });
        }
    },

    render: function render() {
        var element = this;

        //console.log(element.state.showConfirm);

        //activeUsers(){
        var activeUsers = this.state.users.map(function (user, i) {
            if (user) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'a',
                            { href: '#', onClick: element.handleUserClick },
                            user.naam
                        ),
                        user.rol == 100 ? null : React.createElement('i', { className: 'fa fa-times pull-right delete', 'data-table': 'users', 'data-id': user.id, 'aria-hidden': 'true', onClick: element.popup })
                    )
                );
            }
        });
        var pendingUsers = this.state.pendingUsers.map(function (pUser, i) {
            if (pUser) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'a',
                            { href: '#', onClick: element.handlePendingUserClick },
                            pUser.gmail
                        ),
                        React.createElement('i', { className: 'fa fa-times pull-right delete', 'data-table': 'pending_users', 'data-id': pUser.id, 'aria-hidden': 'true', onClick: element.popup })
                    )
                );
            }
        });
        //};
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h2',
                null,
                'Users'
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                        'h3',
                        null,
                        'Add user'
                    ),
                    React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement('input', { id: 'addUserInput', type: 'text', className: 'form-control', placeholder: 'Add user' }),
                            React.createElement(
                                'div',
                                { className: 'input-group-btn' },
                                React.createElement(
                                    'button',
                                    { className: 'btn', onClick: element.handleAddUserClick },
                                    'Add'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'errorMessage' },
                    element.state.errorMessage
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                        'h3',
                        null,
                        'Active users'
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        activeUsers
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4 col-md-offset-2' },
                    React.createElement(
                        'h3',
                        null,
                        'Pending users'
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        pendingUsers
                    )
                )
            ),
            element.state.showConfirm ? React.createElement(Popup, { message: 'Are you sure?', handleClick: element.removeUser }) : null
        );
    }
});

module.exports = Users;

},{"./popup.js":43}]},{},[46,50,47,44,45,38,42,41,37,49,39,40,48,43,51])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnkuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1nb29nbGUtbG9naW4vZGlzdC9nb29nbGUtbG9naW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL0tleUVzY2FwZVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2xhc3MuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFRyZWVIb29rLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RFbGVtZW50U3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRWYWxpZGF0b3IuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFB1cmVDb21wb25lbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2NoZWNrUmVhY3RUeXBlU3BlYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvZ2V0SXRlcmF0b3JGbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvb25seUNoaWxkLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9yZWFjdFByb2RJbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3RyYXZlcnNlQWxsQ2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qvbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QvcmVhY3QuanMiLCJzcmNcXGFnZW5kYS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhdXRoLmpzIiwic3JjXFxmYWlscGFnZS5qcyIsInNyY1xcaG9tZS5qcyIsInNyY1xcbmF2YmFyLmpzIiwic3JjXFxwb3B1cC5qcyIsInNyY1xccmVxdWVzdC5qcyIsInNyY1xccmVxdWVzdHMuanMiLCJzcmNcXHNjaGVkdWxlLmpzIiwic3JjXFxzY2hlZHVsZU1ha2VyLmpzIiwic3JjXFxza2lwYWRheS5qcyIsInNyY1xcdGVtcGxhdGUuanMiLCJzcmNcXHR5cGVzLmpzIiwic3JjXFx1c2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDanRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7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LGNBQVYsRUFBeUIsTUFBSyxNQUE5QixFQUFxQyxXQUFVLGNBQS9DLEVBQThELGFBQVksVUFBMUUsR0FERjtBQUVFO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBLHNDQUFRLFdBQVUsS0FBbEIsRUFBd0IsU0FBUyxRQUFRLGtCQUF6QztBQUFBO0FBQUE7QUFERjtBQUZGO0FBREY7QUFGSixpQkFESjtBQWNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGNBQWY7QUFBK0IsNEJBQVEsS0FBUixDQUFjO0FBQTdDO0FBZEosYUFGSjtBQWtCSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsVUFBZjtBQUNRO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRFI7QUFFUTtBQUFBO0FBQUEsMEJBQUssV0FBVSxxQkFBZjtBQUFzQztBQUF0QztBQUZSLGlCQURKO0FBS1E7QUFBQTtBQUFBLHNCQUFLLFdBQVUsMEJBQWY7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURKO0FBRUk7QUFBQTtBQUFBLDBCQUFLLFdBQVUscUJBQWY7QUFBc0M7QUFBdEM7QUFGSjtBQUxSLGFBbEJKO0FBNEJLLG9CQUFRLEtBQVIsQ0FBYyxXQUFkLEdBQ0csb0JBQUMsS0FBRCxJQUFPLFNBQVEsZUFBZixFQUErQixhQUFhLFFBQVEsVUFBcEQsR0FESCxHQUdHO0FBL0JSLFNBREo7QUFvQ0g7QUFyT3lCLENBQWxCLENBQVo7O0FBd09BLE9BQU8sT0FBUCxHQUFpQixLQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoICh4KSB7fVxuICAgIH07XG5cbiAgICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgICAgfVxuXG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaW52YXJpYW50KHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lKTtcbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gUmVhY3QgMTUuNSByZWZlcmVuY2VzIHRoaXMgbW9kdWxlLCBhbmQgYXNzdW1lcyBQcm9wVHlwZXMgYXJlIHN0aWxsIGNhbGxhYmxlIGluIHByb2R1Y3Rpb24uXG4vLyBUaGVyZWZvcmUgd2UgcmUtZXhwb3J0IGRldmVsb3BtZW50LW9ubHkgdmVyc2lvbiB3aXRoIGFsbCB0aGUgUHJvcFR5cGVzIGNoZWNrcyBoZXJlLlxuLy8gSG93ZXZlciBpZiBvbmUgaXMgbWlncmF0aW5nIHRvIHRoZSBgcHJvcC10eXBlc2AgbnBtIGxpYnJhcnksIHRoZXkgd2lsbCBnbyB0aHJvdWdoIHRoZVxuLy8gYGluZGV4LmpzYCBlbnRyeSBwb2ludCwgYW5kIGl0IHdpbGwgYnJhbmNoIGRlcGVuZGluZyBvbiB0aGUgZW52aXJvbm1lbnQuXG52YXIgZmFjdG9yeSA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQpIHtcbiAgLy8gSXQgaXMgc3RpbGwgYWxsb3dlZCBpbiAxNS41LlxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IGZhbHNlO1xuICByZXR1cm4gZmFjdG9yeShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KHJlcXVpcmUoXCJyZWFjdFwiKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJyZWFjdFwiXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLkdvb2dsZUxvZ2luPXQocmVxdWlyZShcInJlYWN0XCIpKTplLkdvb2dsZUxvZ2luPXQoZS5yZWFjdCl9KHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQobyl7aWYobltvXSlyZXR1cm4gbltvXS5leHBvcnRzO3ZhciBpPW5bb109e2k6byxsOiExLGV4cG9ydHM6e319O3JldHVybiBlW29dLmNhbGwoaS5leHBvcnRzLGksaS5leHBvcnRzLHQpLGkubD0hMCxpLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuaT1mdW5jdGlvbihlKXtyZXR1cm4gZX0sdC5kPWZ1bmN0aW9uKGUsbixvKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Om99KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTIpfShbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG8oZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfWZ1bmN0aW9uIGkoZSx0KXtpZighZSl0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7cmV0dXJuIXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0P2U6dH1mdW5jdGlvbiByKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCYmbnVsbCE9PXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIrdHlwZW9mIHQpO2UucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodCYmdC5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTplLGVudW1lcmFibGU6ITEsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pLHQmJihPYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LnNldFByb3RvdHlwZU9mKGUsdCk6ZS5fX3Byb3RvX189dCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGE9bigxKSxjPW4ubihhKSxzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgbz10W25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxvLmtleSxvKX19cmV0dXJuIGZ1bmN0aW9uKHQsbixvKXtyZXR1cm4gbiYmZSh0LnByb3RvdHlwZSxuKSxvJiZlKHQsbyksdH19KCksdT1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUpe28odGhpcyx0KTt2YXIgbj1pKHRoaXMsKHQuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YodCkpLmNhbGwodGhpcyxlKSk7cmV0dXJuIG4uc2lnbkluPW4uc2lnbkluLmJpbmQobiksbi5zdGF0ZT17ZGlzYWJsZWQ6ITB9LG59cmV0dXJuIHIodCxlKSxzKHQsW3trZXk6XCJjb21wb25lbnREaWRNb3VudFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PXRoaXMucHJvcHMsbj10LmNsaWVudElkLG89dC5jb29raWVQb2xpY3ksaT10LmxvZ2luSGludCxyPXQuaG9zdGVkRG9tYWluLGE9dC5hdXRvTG9hZCxjPXQuZmV0Y2hCYXNpY1Byb2ZpbGUscz10LnJlZGlyZWN0VXJpLHU9dC5kaXNjb3ZlcnlEb2NzLGw9dC5vbkZhaWx1cmUsZj10LnV4TW9kZTshZnVuY3Rpb24oZSx0LG4sbyl7dmFyIGk9ZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0KVswXSxyPWksYT1pO2E9ZS5jcmVhdGVFbGVtZW50KHQpLGEuaWQ9bixhLnNyYz1cIi8vYXBpcy5nb29nbGUuY29tL2pzL2NsaWVudDpwbGF0Zm9ybS5qc1wiLHIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxyKSxhLm9ubG9hZD1vfShkb2N1bWVudCxcInNjcmlwdFwiLFwiZ29vZ2xlLWxvZ2luXCIsZnVuY3Rpb24oKXt2YXIgdD17Y2xpZW50X2lkOm4sY29va2llcG9saWN5Om8sbG9naW5faGludDppLGhvc3RlZF9kb21haW46cixmZXRjaF9iYXNpY19wcm9maWxlOmMsZGlzY292ZXJ5RG9jczp1LHV4X21vZGU6ZixyZWRpcmVjdF91cmk6c307d2luZG93LmdhcGkubG9hZChcImF1dGgyXCIsZnVuY3Rpb24oKXtlLnNldFN0YXRlKHtkaXNhYmxlZDohMX0pLHdpbmRvdy5nYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpfHx3aW5kb3cuZ2FwaS5hdXRoMi5pbml0KHQpLnRoZW4oZnVuY3Rpb24oKXt9LGZ1bmN0aW9uKGUpe3JldHVybiBsKGUpfSksYSYmZS5zaWduSW4oKX0pfSl9fSx7a2V5Olwic2lnbkluXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoZSYmZS5wcmV2ZW50RGVmYXVsdCgpLCF0aGlzLnN0YXRlLmRpc2FibGVkKXt2YXIgdD13aW5kb3cuZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKSxuPXRoaXMucHJvcHMsbz1uLm9mZmxpbmUsaT1uLnJlZGlyZWN0VXJpLHI9bi5vblN1Y2Nlc3MsYT1uLm9uUmVxdWVzdCxjPW4uZmV0Y2hCYXNpY1Byb2ZpbGUscz1uLm9uRmFpbHVyZSx1PW4ucHJvbXB0LGw9bi5zY29wZSxmPW4ucmVzcG9uc2VUeXBlLHA9e3Jlc3BvbnNlX3R5cGU6ZixyZWRpcmVjdF91cmk6aSxmZXRjaF9iYXNpY19wcm9maWxlOmMscHJvbXB0OnUsc2NvcGU6bH07YSgpLG8/dC5ncmFudE9mZmxpbmVBY2Nlc3MocCkudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gcihlKX0sZnVuY3Rpb24oZSl7cmV0dXJuIHMoZSl9KTp0LnNpZ25JbihwKS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0QmFzaWNQcm9maWxlKCksbj1lLmdldEF1dGhSZXNwb25zZSgpO2UuZ29vZ2xlSWQ9dC5nZXRJZCgpLGUudG9rZW5PYmo9bixlLnRva2VuSWQ9bi5pZF90b2tlbixlLmFjY2Vzc1Rva2VuPW4uYWNjZXNzX3Rva2VuLGUucHJvZmlsZU9iaj17Z29vZ2xlSWQ6dC5nZXRJZCgpLGltYWdlVXJsOnQuZ2V0SW1hZ2VVcmwoKSxlbWFpbDp0LmdldEVtYWlsKCksbmFtZTp0LmdldE5hbWUoKSxnaXZlbk5hbWU6dC5nZXRHaXZlbk5hbWUoKSxmYW1pbHlOYW1lOnQuZ2V0RmFtaWx5TmFtZSgpfSxyKGUpfSxmdW5jdGlvbihlKXtyZXR1cm4gcyhlKX0pfX19LHtrZXk6XCJyZW5kZXJcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMucHJvcHMsdD1lLnRhZyxuPWUuc3R5bGUsbz1lLmNsYXNzTmFtZSxpPWUuZGlzYWJsZWRTdHlsZSxyPWUuYnV0dG9uVGV4dCxhPWUuY2hpbGRyZW4scz10aGlzLnN0YXRlLmRpc2FibGVkfHx0aGlzLnByb3BzLmRpc2FibGVkLHU9e2Rpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIixiYWNrZ3JvdW5kOlwiI2QxNDgzNlwiLGNvbG9yOlwiI2ZmZlwiLHdpZHRoOjE5MCxwYWRkaW5nVG9wOjEwLHBhZGRpbmdCb3R0b206MTAsYm9yZGVyUmFkaXVzOjIsYm9yZGVyOlwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIsZm9udFNpemU6MTYsZm9udFdlaWdodDpcImJvbGRcIixmb250RmFtaWx5OlwiUm9ib3RvXCJ9LGw9ZnVuY3Rpb24oKXtyZXR1cm4gbnx8KG8mJiFuP3t9OnUpfSgpLGY9ZnVuY3Rpb24oKXtyZXR1cm4gcz9PYmplY3QuYXNzaWduKHt9LGwsaSk6bH0oKTtyZXR1cm4gYy5hLmNyZWF0ZUVsZW1lbnQodCx7b25DbGljazp0aGlzLnNpZ25JbixzdHlsZTpmLGRpc2FibGVkOnMsY2xhc3NOYW1lOm99LGF8fHIpfX1dKSx0fShhLkNvbXBvbmVudCk7dS5kZWZhdWx0UHJvcHM9e3RhZzpcImJ1dHRvblwiLGJ1dHRvblRleHQ6XCJMb2dpbiB3aXRoIEdvb2dsZVwiLHNjb3BlOlwicHJvZmlsZSBlbWFpbFwiLHJlc3BvbnNlVHlwZTpcInBlcm1pc3Npb25cIixwcm9tcHQ6XCJcIixjb29raWVQb2xpY3k6XCJzaW5nbGVfaG9zdF9vcmlnaW5cIixmZXRjaEJhc2ljUHJvZmlsZTohMCx1eE1vZGU6XCJwb3B1cFwiLGRpc2FibGVkU3R5bGU6e29wYWNpdHk6LjZ9LG9uUmVxdWVzdDpmdW5jdGlvbigpe30sb2ZmbGluZTohMX0sdC5kZWZhdWx0PXV9LGZ1bmN0aW9uKHQsbil7dC5leHBvcnRzPWV9LGZ1bmN0aW9uKGUsdCxuKXtlLmV4cG9ydHM9bigwKX1dKX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z29vZ2xlLWxvZ2luLmpzLm1hcCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0nOiAnPTAnLFxuICAgICc6JzogJz0yJ1xuICB9O1xuICB2YXIgZXNjYXBlZFN0cmluZyA9ICgnJyArIGtleSkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcblxuICByZXR1cm4gJyQnICsgZXNjYXBlZFN0cmluZztcbn1cblxuLyoqXG4gKiBVbmVzY2FwZSBhbmQgdW53cmFwIGtleSBmb3IgaHVtYW4tcmVhZGFibGUgZGlzcGxheVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gdW5lc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB1bmVzY2FwZWQga2V5LlxuICovXG5mdW5jdGlvbiB1bmVzY2FwZShrZXkpIHtcbiAgdmFyIHVuZXNjYXBlUmVnZXggPSAvKD0wfD0yKS9nO1xuICB2YXIgdW5lc2NhcGVyTG9va3VwID0ge1xuICAgICc9MCc6ICc9JyxcbiAgICAnPTInOiAnOidcbiAgfTtcbiAgdmFyIGtleVN1YnN0cmluZyA9IGtleVswXSA9PT0gJy4nICYmIGtleVsxXSA9PT0gJyQnID8ga2V5LnN1YnN0cmluZygyKSA6IGtleS5zdWJzdHJpbmcoMSk7XG5cbiAgcmV0dXJuICgnJyArIGtleVN1YnN0cmluZykucmVwbGFjZSh1bmVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gdW5lc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG59XG5cbnZhciBLZXlFc2NhcGVVdGlscyA9IHtcbiAgZXNjYXBlOiBlc2NhcGUsXG4gIHVuZXNjYXBlOiB1bmVzY2FwZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlFc2NhcGVVdGlsczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBTdGF0aWMgcG9vbGVycy4gU2V2ZXJhbCBjdXN0b20gdmVyc2lvbnMgZm9yIGVhY2ggcG90ZW50aWFsIG51bWJlciBvZlxuICogYXJndW1lbnRzLiBBIGNvbXBsZXRlbHkgZ2VuZXJpYyBwb29sZXIgaXMgZWFzeSB0byBpbXBsZW1lbnQsIGJ1dCB3b3VsZFxuICogcmVxdWlyZSBhY2Nlc3NpbmcgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gSW4gZWFjaCBvZiB0aGVzZSwgYHRoaXNgIHJlZmVycyB0b1xuICogdGhlIENsYXNzIGl0c2VsZiwgbm90IGFuIGluc3RhbmNlLiBJZiBhbnkgb3RoZXJzIGFyZSBuZWVkZWQsIHNpbXBseSBhZGQgdGhlbVxuICogaGVyZSwgb3IgaW4gdGhlaXIgb3duIGZpbGVzLlxuICovXG52YXIgb25lQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMikge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMik7XG4gIH1cbn07XG5cbnZhciB0aHJlZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMyk7XG4gIH1cbn07XG5cbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0KTtcbiAgfVxufTtcblxudmFyIHN0YW5kYXJkUmVsZWFzZXIgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgIShpbnN0YW5jZSBpbnN0YW5jZW9mIEtsYXNzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUcnlpbmcgdG8gcmVsZWFzZSBhbiBpbnN0YW5jZSBpbnRvIGEgcG9vbCBvZiBhIGRpZmZlcmVudCB0eXBlLicpIDogX3Byb2RJbnZhcmlhbnQoJzI1JykgOiB2b2lkIDA7XG4gIGluc3RhbmNlLmRlc3RydWN0b3IoKTtcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGggPCBLbGFzcy5wb29sU2l6ZSkge1xuICAgIEtsYXNzLmluc3RhbmNlUG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgfVxufTtcblxudmFyIERFRkFVTFRfUE9PTF9TSVpFID0gMTA7XG52YXIgREVGQVVMVF9QT09MRVIgPSBvbmVBcmd1bWVudFBvb2xlcjtcblxuLyoqXG4gKiBBdWdtZW50cyBgQ29weUNvbnN0cnVjdG9yYCB0byBiZSBhIHBvb2xhYmxlIGNsYXNzLCBhdWdtZW50aW5nIG9ubHkgdGhlIGNsYXNzXG4gKiBpdHNlbGYgKHN0YXRpY2FsbHkpIG5vdCBhZGRpbmcgYW55IHByb3RvdHlwaWNhbCBmaWVsZHMuIEFueSBDb3B5Q29uc3RydWN0b3JcbiAqIHlvdSBnaXZlIHRoaXMgbWF5IGhhdmUgYSBgcG9vbFNpemVgIHByb3BlcnR5LCBhbmQgd2lsbCBsb29rIGZvciBhXG4gKiBwcm90b3R5cGljYWwgYGRlc3RydWN0b3JgIG9uIGluc3RhbmNlcy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDb3B5Q29uc3RydWN0b3IgQ29uc3RydWN0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byByZXNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBvb2xlciBDdXN0b21pemFibGUgcG9vbGVyLlxuICovXG52YXIgYWRkUG9vbGluZ1RvID0gZnVuY3Rpb24gKENvcHlDb25zdHJ1Y3RvciwgcG9vbGVyKSB7XG4gIC8vIENhc3RpbmcgYXMgYW55IHNvIHRoYXQgZmxvdyBpZ25vcmVzIHRoZSBhY3R1YWwgaW1wbGVtZW50YXRpb24gYW5kIHRydXN0c1xuICAvLyBpdCB0byBtYXRjaCB0aGUgdHlwZSB3ZSBkZWNsYXJlZFxuICB2YXIgTmV3S2xhc3MgPSBDb3B5Q29uc3RydWN0b3I7XG4gIE5ld0tsYXNzLmluc3RhbmNlUG9vbCA9IFtdO1xuICBOZXdLbGFzcy5nZXRQb29sZWQgPSBwb29sZXIgfHwgREVGQVVMVF9QT09MRVI7XG4gIGlmICghTmV3S2xhc3MucG9vbFNpemUpIHtcbiAgICBOZXdLbGFzcy5wb29sU2l6ZSA9IERFRkFVTFRfUE9PTF9TSVpFO1xuICB9XG4gIE5ld0tsYXNzLnJlbGVhc2UgPSBzdGFuZGFyZFJlbGVhc2VyO1xuICByZXR1cm4gTmV3S2xhc3M7XG59O1xuXG52YXIgUG9vbGVkQ2xhc3MgPSB7XG4gIGFkZFBvb2xpbmdUbzogYWRkUG9vbGluZ1RvLFxuICBvbmVBcmd1bWVudFBvb2xlcjogb25lQXJndW1lbnRQb29sZXIsXG4gIHR3b0FyZ3VtZW50UG9vbGVyOiB0d29Bcmd1bWVudFBvb2xlcixcbiAgdGhyZWVBcmd1bWVudFBvb2xlcjogdGhyZWVBcmd1bWVudFBvb2xlcixcbiAgZm91ckFyZ3VtZW50UG9vbGVyOiBmb3VyQXJndW1lbnRQb29sZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9vbGVkQ2xhc3M7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENoaWxkcmVuID0gcmVxdWlyZSgnLi9SZWFjdENoaWxkcmVuJyk7XG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RQdXJlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdFB1cmVDb21wb25lbnQnKTtcbnZhciBSZWFjdENsYXNzID0gcmVxdWlyZSgnLi9SZWFjdENsYXNzJyk7XG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSByZXF1aXJlKCcuL1JlYWN0RE9NRmFjdG9yaWVzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXMnKTtcbnZhciBSZWFjdFZlcnNpb24gPSByZXF1aXJlKCcuL1JlYWN0VmVyc2lvbicpO1xuXG52YXIgb25seUNoaWxkID0gcmVxdWlyZSgnLi9vbmx5Q2hpbGQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50O1xudmFyIGNyZWF0ZUZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeTtcbnZhciBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuICB2YXIgZGlkV2FyblByb3BUeXBlc0RlcHJlY2F0ZWQgPSBmYWxzZTtcbiAgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50O1xuICBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG4gIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jbG9uZUVsZW1lbnQ7XG59XG5cbnZhciBfX3NwcmVhZCA9IF9hc3NpZ247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgX19zcHJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcod2FybmVkLCAnUmVhY3QuX19zcHJlYWQgaXMgZGVwcmVjYXRlZCBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkLiBVc2UgJyArICdPYmplY3QuYXNzaWduIGRpcmVjdGx5IG9yIGFub3RoZXIgaGVscGVyIGZ1bmN0aW9uIHdpdGggc2ltaWxhciAnICsgJ3NlbWFudGljcy4gWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byB5b3VyIGNvbXBpbGVyLiAnICsgJ1NlZSBodHRwczovL2ZiLm1lL3JlYWN0LXNwcmVhZC1kZXByZWNhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLicpIDogdm9pZCAwO1xuICAgIHdhcm5lZCA9IHRydWU7XG4gICAgcmV0dXJuIF9hc3NpZ24uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxudmFyIFJlYWN0ID0ge1xuXG4gIC8vIE1vZGVyblxuXG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBSZWFjdENoaWxkcmVuLm1hcCxcbiAgICBmb3JFYWNoOiBSZWFjdENoaWxkcmVuLmZvckVhY2gsXG4gICAgY291bnQ6IFJlYWN0Q2hpbGRyZW4uY291bnQsXG4gICAgdG9BcnJheTogUmVhY3RDaGlsZHJlbi50b0FycmF5LFxuICAgIG9ubHk6IG9ubHlDaGlsZFxuICB9LFxuXG4gIENvbXBvbmVudDogUmVhY3RDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQ6IFJlYWN0UHVyZUNvbXBvbmVudCxcblxuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgaXNWYWxpZEVsZW1lbnQ6IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCxcblxuICAvLyBDbGFzc2ljXG5cbiAgUHJvcFR5cGVzOiBSZWFjdFByb3BUeXBlcyxcbiAgY3JlYXRlQ2xhc3M6IFJlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MsXG4gIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnksXG4gIGNyZWF0ZU1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAvLyBDdXJyZW50bHkgYSBub29wLiBXaWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgYW5kIHRyYWNlIG1peGlucy5cbiAgICByZXR1cm4gbWl4aW47XG4gIH0sXG5cbiAgLy8gVGhpcyBsb29rcyBET00gc3BlY2lmaWMgYnV0IHRoZXNlIGFyZSBhY3R1YWxseSBpc29tb3JwaGljIGhlbHBlcnNcbiAgLy8gc2luY2UgdGhleSBhcmUganVzdCBnZW5lcmF0aW5nIERPTSBzdHJpbmdzLlxuICBET006IFJlYWN0RE9NRmFjdG9yaWVzLFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvbixcblxuICAvLyBEZXByZWNhdGVkIGhvb2sgZm9yIEpTWCBzcHJlYWQsIGRvbid0IHVzZSB0aGlzIGZvciBhbnl0aGluZy5cbiAgX19zcHJlYWQ6IF9fc3ByZWFkXG59O1xuXG4vLyBUT0RPOiBGaXggdGVzdHMgc28gdGhhdCB0aGlzIGRlcHJlY2F0aW9uIHdhcm5pbmcgZG9lc24ndCBjYXVzZSBmYWlsdXJlcy5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdCwgJ1Byb3BUeXBlcycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhkaWRXYXJuUHJvcFR5cGVzRGVwcmVjYXRlZCwgJ0FjY2Vzc2luZyBQcm9wVHlwZXMgdmlhIHRoZSBtYWluIFJlYWN0IHBhY2thZ2UgaXMgZGVwcmVjYXRlZC4gVXNlICcgKyAndGhlIHByb3AtdHlwZXMgcGFja2FnZSBmcm9tIG5wbSBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICAgICAgICBkaWRXYXJuUHJvcFR5cGVzRGVwcmVjYXRlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBSZWFjdFByb3BUeXBlcztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciB0cmF2ZXJzZUFsbENoaWxkcmVuID0gcmVxdWlyZSgnLi90cmF2ZXJzZUFsbENoaWxkcmVuJyk7XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLnR3b0FyZ3VtZW50UG9vbGVyO1xudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLmZvdXJBcmd1bWVudFBvb2xlcjtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcbmZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gIHJldHVybiAoJycgKyB0ZXh0KS5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCAnJCYvJyk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiB0cmF2ZXJzYWwuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgRm9yRWFjaEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gZm9yRWFjaEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gdHJhdmVyc2FsIHdpdGguXG4gKiBAcGFyYW0gez8qfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gY29udGV4dCB3aXRoLlxuICovXG5mdW5jdGlvbiBGb3JFYWNoQm9va0tlZXBpbmcoZm9yRWFjaEZ1bmN0aW9uLCBmb3JFYWNoQ29udGV4dCkge1xuICB0aGlzLmZ1bmMgPSBmb3JFYWNoRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IGZvckVhY2hDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbkZvckVhY2hCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKEZvckVhY2hCb29rS2VlcGluZywgdHdvQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGQoYm9va0tlZXBpbmcsIGNoaWxkLCBuYW1lKSB7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG4gIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmZvcmVhY2hcbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBGb3JFYWNoQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgRm9yRWFjaEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIG1hcHBpbmcuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgTWFwQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7ISp9IG1hcFJlc3VsdCBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBtYXBGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IG1hcENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqL1xuZnVuY3Rpb24gTWFwQm9va0tlZXBpbmcobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIHRoaXMucmVzdWx0ID0gbWFwUmVzdWx0O1xuICB0aGlzLmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgdGhpcy5mdW5jID0gbWFwRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuTWFwQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVzdWx0ID0gbnVsbDtcbiAgdGhpcy5rZXlQcmVmaXggPSBudWxsO1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oTWFwQm9va0tlZXBpbmcsIGZvdXJBcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0LFxuICAgICAga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4LFxuICAgICAgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuXG4gIHZhciBtYXBwZWRDaGlsZCA9IGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAobWFwcGVkQ2hpbGQgIT0gbnVsbCkge1xuICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobWFwcGVkQ2hpbGQpKSB7XG4gICAgICBtYXBwZWRDaGlsZCA9IFJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gTWFwQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgTWFwQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5tYXBcbiAqXG4gKiBUaGUgcHJvdmlkZWQgbWFwRnVuY3Rpb24oY2hpbGQsIGtleSwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmdW5jIFRoZSBtYXAgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgQ29udGV4dCBmb3IgbWFwRnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuYywgY29udGV4dCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZER1bW15KHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQ291bnQgdGhlIG51bWJlciBvZiBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzXG4gKiBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5jb3VudFxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBjb3VudENoaWxkcmVuKGNoaWxkcmVuLCBjb250ZXh0KSB7XG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSwgbnVsbCk7XG59XG5cbi8qKlxuICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLnRvYXJyYXlcbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIFJlYWN0Q2hpbGRyZW4gPSB7XG4gIGZvckVhY2g6IGZvckVhY2hDaGlsZHJlbixcbiAgbWFwOiBtYXBDaGlsZHJlbixcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbDogbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbCxcbiAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gIHRvQXJyYXk6IHRvQXJyYXlcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDaGlsZHJlbjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpLFxuICAgIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBNSVhJTlNfS0VZID0gJ21peGlucyc7XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgYW5vbnltb3VzIGZ1bmN0aW9ucyB3aGljaCBkbyBub3Rcbi8vIGhhdmUgLm5hbWUgc2V0IHRvIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSBiZWluZyBhc3NpZ25lZCB0by5cbmZ1bmN0aW9uIGlkZW50aXR5KGZuKSB7XG4gIHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBQb2xpY2llcyB0aGF0IGRlc2NyaWJlIG1ldGhvZHMgaW4gYFJlYWN0Q2xhc3NJbnRlcmZhY2VgLlxuICovXG5cblxudmFyIGluamVjdGVkTWl4aW5zID0gW107XG5cbi8qKlxuICogQ29tcG9zaXRlIGNvbXBvbmVudHMgYXJlIGhpZ2hlci1sZXZlbCBjb21wb25lbnRzIHRoYXQgY29tcG9zZSBvdGhlciBjb21wb3NpdGVcbiAqIG9yIGhvc3QgY29tcG9uZW50cy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgdHlwZSBvZiBgUmVhY3RDbGFzc2AsIHBhc3MgYSBzcGVjaWZpY2F0aW9uIG9mXG4gKiB5b3VyIG5ldyBjbGFzcyB0byBgUmVhY3QuY3JlYXRlQ2xhc3NgLiBUaGUgb25seSByZXF1aXJlbWVudCBvZiB5b3VyIGNsYXNzXG4gKiBzcGVjaWZpY2F0aW9uIGlzIHRoYXQgeW91IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC5cbiAqXG4gKiAgIHZhciBNeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIDxkaXY+SGVsbG8gV29ybGQ8L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBzdXBwb3J0cyBhIHNwZWNpZmljIHByb3RvY29sIG9mIG1ldGhvZHMgdGhhdCBoYXZlXG4gKiBzcGVjaWFsIG1lYW5pbmcgKGUuZy4gYHJlbmRlcmApLiBTZWUgYFJlYWN0Q2xhc3NJbnRlcmZhY2VgIGZvclxuICogbW9yZSB0aGUgY29tcHJlaGVuc2l2ZSBwcm90b2NvbC4gQW55IG90aGVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgaW4gdGhlXG4gKiBjbGFzcyBzcGVjaWZpY2F0aW9uIHdpbGwgYmUgYXZhaWxhYmxlIG9uIHRoZSBwcm90b3R5cGUuXG4gKlxuICogQGludGVyZmFjZSBSZWFjdENsYXNzSW50ZXJmYWNlXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0Q2xhc3NJbnRlcmZhY2UgPSB7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIE1peGluIG9iamVjdHMgdG8gaW5jbHVkZSB3aGVuIGRlZmluaW5nIHlvdXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7YXJyYXl9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgbWl4aW5zOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGRlZmluZWQgb25cbiAgICogdGhlIGNvbXBvbmVudCdzIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgaXRzIHByb3RvdHlwZSAoc3RhdGljIG1ldGhvZHMpLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHN0YXRpY3M6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgcHJvcCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgcHJvcFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIHRoaXMgY29tcG9uZW50IHNldHMgZm9yIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjaGlsZENvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvLyA9PT09IERlZmluaXRpb24gbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFZhbHVlcyBpbiB0aGUgbWFwcGluZyB3aWxsIGJlIHNldCBvblxuICAgKiBgdGhpcy5wcm9wc2AgaWYgdGhhdCBwcm9wIGlzIG5vdCBzcGVjaWZpZWQgKGkuZS4gdXNpbmcgYW4gYGluYCBjaGVjaykuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYmVmb3JlIGBnZXRJbml0aWFsU3RhdGVgIGFuZCB0aGVyZWZvcmUgY2Fubm90IHJlbHlcbiAgICogb24gYHRoaXMuc3RhdGVgIG9yIHVzZSBgdGhpcy5zZXRTdGF0ZWAuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIG9uY2UgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICogYXMgdGhlIGluaXRpYWwgdmFsdWUgb2YgYHRoaXMuc3RhdGVgLlxuICAgKlxuICAgKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAqICAgICByZXR1cm4ge1xuICAgKiAgICAgICBpc09uOiBmYWxzZSxcbiAgICogICAgICAgZm9vQmF6OiBuZXcgQmF6Rm9vKClcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRJbml0aWFsU3RhdGU6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0Q2hpbGRDb250ZXh0OiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogVXNlcyBwcm9wcyBmcm9tIGB0aGlzLnByb3BzYCBhbmQgc3RhdGUgZnJvbSBgdGhpcy5zdGF0ZWAgdG8gcmVuZGVyIHRoZVxuICAgKiBzdHJ1Y3R1cmUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogTm8gZ3VhcmFudGVlcyBhcmUgbWFkZSBhYm91dCB3aGVuIG9yIGhvdyBvZnRlbiB0aGlzIG1ldGhvZCBpcyBpbnZva2VkLCBzb1xuICAgKiBpdCBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICpcbiAgICogICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAqICAgICByZXR1cm4gPGRpdj5IZWxsbywge25hbWV9ITwvZGl2PjtcbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgKiBAcmVxdWlyZWRcbiAgICovXG4gIHJlbmRlcjogJ0RFRklORV9PTkNFJyxcblxuICAvLyA9PT09IERlbGVnYXRlIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsbHkgY3JlYXRlZCBhbmQgYWJvdXQgdG8gYmUgbW91bnRlZC5cbiAgICogVGhpcyBtYXkgaGF2ZSBzaWRlIGVmZmVjdHMsIGJ1dCBhbnkgZXh0ZXJuYWwgc3Vic2NyaXB0aW9ucyBvciBkYXRhIGNyZWF0ZWRcbiAgICogYnkgdGhpcyBtZXRob2QgbXVzdCBiZSBjbGVhbmVkIHVwIGluIGBjb21wb25lbnRXaWxsVW5tb3VudGAuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIGFuZCBoYXMgYSBET00gcmVwcmVzZW50YXRpb24uXG4gICAqIEhvd2V2ZXIsIHRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZSBET00gbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gbW91bnRlZCAoaW5pdGlhbGl6ZWQgYW5kIHJlbmRlcmVkKSBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byByZWFjdCB0byBhIHByb3AgdHJhbnNpdGlvbiBieSB1cGRhdGluZyB0aGVcbiAgICogc3RhdGUgdXNpbmcgYHRoaXMuc2V0U3RhdGVgLiBDdXJyZW50IHByb3BzIGFyZSBhY2Nlc3NlZCB2aWEgYHRoaXMucHJvcHNgLlxuICAgKlxuICAgKiAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgKiAgICAgICBsaWtlc0luY3JlYXNpbmc6IG5leHRQcm9wcy5saWtlQ291bnQgPiB0aGlzLnByb3BzLmxpa2VDb3VudFxuICAgKiAgICAgfSk7XG4gICAqICAgfVxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBlcXVpdmFsZW50IGBjb21wb25lbnRXaWxsUmVjZWl2ZVN0YXRlYC4gQW4gaW5jb21pbmcgcHJvcFxuICAgKiB0cmFuc2l0aW9uIG1heSBjYXVzZSBhIHN0YXRlIGNoYW5nZSwgYnV0IHRoZSBvcHBvc2l0ZSBpcyBub3QgdHJ1ZS4gSWYgeW91XG4gICAqIG5lZWQgaXQsIHlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBmb3IgYGNvbXBvbmVudFdpbGxVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGlsZSBkZWNpZGluZyBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGFzIGEgcmVzdWx0IG9mXG4gICAqIHJlY2VpdmluZyBuZXcgcHJvcHMsIHN0YXRlIGFuZC9vciBjb250ZXh0LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBgcmV0dXJuIGZhbHNlYCB3aGVuIHlvdSdyZSBjZXJ0YWluIHRoYXQgdGhlXG4gICAqIHRyYW5zaXRpb24gdG8gdGhlIG5ldyBwcm9wcy9zdGF0ZS9jb250ZXh0IHdpbGwgbm90IHJlcXVpcmUgYSBjb21wb25lbnRcbiAgICogdXBkYXRlLlxuICAgKlxuICAgKiAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICByZXR1cm4gIWVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSkgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRDb250ZXh0LCB0aGlzLmNvbnRleHQpO1xuICAgKiAgIH1cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgdXBkYXRlLlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogJ0RFRklORV9PTkNFJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gdXBkYXRlIGR1ZSB0byBhIHRyYW5zaXRpb24gZnJvbVxuICAgKiBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAgdG8gYG5leHRQcm9wc2AsIGBuZXh0U3RhdGVgXG4gICAqIGFuZCBgbmV4dENvbnRleHRgLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBwZXJmb3JtIHByZXBhcmF0aW9uIGJlZm9yZSBhbiB1cGRhdGUgb2NjdXJzLlxuICAgKlxuICAgKiBOT1RFOiBZb3UgKipjYW5ub3QqKiB1c2UgYHRoaXMuc2V0U3RhdGUoKWAgaW4gdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQncyBET00gcmVwcmVzZW50YXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJldlByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldlN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNvbnRleHRcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRVcGRhdGU6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IGFuZCBoYXZlXG4gICAqIGl0cyBET00gcmVwcmVzZW50YXRpb24gZGVzdHJveWVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBkZWFsbG9jYXRlIGFueSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGBjb21wb25lbnREaWRVbm1vdW50YCBzaW5jZSB5b3VyIGNvbXBvbmVudCB3aWxsIGhhdmUgYmVlblxuICAgKiBkZXN0cm95ZWQgYnkgdGhhdCBwb2ludC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvLyA9PT09IEFkdmFuY2VkIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnQncyBjdXJyZW50bHkgbW91bnRlZCBET00gcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6ICdPVkVSUklERV9CQVNFJ1xuXG59O1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBjbGFzcyBzcGVjaWZpY2F0aW9uIGtleXMgdG8gc3BlY2lhbCBwcm9jZXNzaW5nIGZ1bmN0aW9ucy5cbiAqXG4gKiBBbHRob3VnaCB0aGVzZSBhcmUgZGVjbGFyZWQgbGlrZSBpbnN0YW5jZSBwcm9wZXJ0aWVzIGluIHRoZSBzcGVjaWZpY2F0aW9uXG4gKiB3aGVuIGRlZmluaW5nIGNsYXNzZXMgdXNpbmcgYFJlYWN0LmNyZWF0ZUNsYXNzYCwgdGhleSBhcmUgYWN0dWFsbHkgc3RhdGljXG4gKiBhbmQgYXJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgdGhlIHByb3RvdHlwZS4gRGVzcGl0ZVxuICogYmVpbmcgc3RhdGljLCB0aGV5IG11c3QgYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBcInN0YXRpY3NcIiBrZXkgdW5kZXJcbiAqIHdoaWNoIGFsbCBvdGhlciBzdGF0aWMgbWV0aG9kcyBhcmUgZGVmaW5lZC5cbiAqL1xudmFyIFJFU0VSVkVEX1NQRUNfS0VZUyA9IHtcbiAgZGlzcGxheU5hbWU6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZGlzcGxheU5hbWUpIHtcbiAgICBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICB9LFxuICBtaXhpbnM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgbWl4aW5zKSB7XG4gICAgaWYgKG1peGlucykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIG1peGluc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjaGlsZENvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzLCAnY2hpbGRDb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgfSxcbiAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcywgJ2NvbnRleHQnKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZXMpO1xuICB9LFxuICAvKipcbiAgICogU3BlY2lhbCBjYXNlIGdldERlZmF1bHRQcm9wcyB3aGljaCBzaG91bGQgbW92ZSBpbnRvIHN0YXRpY3MgYnV0IHJlcXVpcmVzXG4gICAqIGF1dG9tYXRpYyBtZXJnaW5nLlxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGdldERlZmF1bHRQcm9wcykge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcywgZ2V0RGVmYXVsdFByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gZ2V0RGVmYXVsdFByb3BzO1xuICAgIH1cbiAgfSxcbiAgcHJvcFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3BUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHByb3BUeXBlcywgJ3Byb3AnKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IucHJvcFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IucHJvcFR5cGVzLCBwcm9wVHlwZXMpO1xuICB9LFxuICBzdGF0aWNzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgICBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcyk7XG4gIH0sXG4gIGF1dG9iaW5kOiBmdW5jdGlvbiAoKSB7fSB9O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHR5cGVEZWYsIGxvY2F0aW9uKSB7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIHR5cGVEZWYpIHtcbiAgICBpZiAodHlwZURlZi5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIC8vIHVzZSBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBpbnZhcmlhbnQgc28gY29tcG9uZW50c1xuICAgICAgLy8gZG9uJ3Qgc2hvdyB1cCBpbiBwcm9kIGJ1dCBvbmx5IGluIF9fREVWX19cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKSB7XG4gIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChSZWFjdENsYXNzTWl4aW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdPVkVSUklERV9CQVNFJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIG92ZXJyaWRlIGAlc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzIGRvIG5vdCBvdmVybGFwIHdpdGggUmVhY3QgbWV0aG9kcy4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3MycsIG5hbWUpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gRGlzYWxsb3cgZGVmaW5pbmcgbWV0aG9kcyBtb3JlIHRoYW4gb25jZSB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJyB8fCBzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3NCcsIG5hbWUpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogTWl4aW4gaGVscGVyIHdoaWNoIGhhbmRsZXMgcG9saWN5IHZhbGlkYXRpb24gYW5kIHJlc2VydmVkXG4gKiBzcGVjaWZpY2F0aW9uIGtleXMgd2hlbiBidWlsZGluZyBSZWFjdCBjbGFzc2VzLlxuICovXG5mdW5jdGlvbiBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYykge1xuICBpZiAoIXNwZWMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHR5cGVvZlNwZWMgPSB0eXBlb2Ygc3BlYztcbiAgICAgIHZhciBpc01peGluVmFsaWQgPSB0eXBlb2ZTcGVjID09PSAnb2JqZWN0JyAmJiBzcGVjICE9PSBudWxsO1xuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhpc01peGluVmFsaWQsICclczogWW91XFwncmUgYXR0ZW1wdGluZyB0byBpbmNsdWRlIGEgbWl4aW4gdGhhdCBpcyBlaXRoZXIgbnVsbCAnICsgJ29yIG5vdCBhbiBvYmplY3QuIENoZWNrIHRoZSBtaXhpbnMgaW5jbHVkZWQgYnkgdGhlIGNvbXBvbmVudCwgJyArICdhcyB3ZWxsIGFzIGFueSBtaXhpbnMgdGhleSBpbmNsdWRlIHRoZW1zZWx2ZXMuICcgKyAnRXhwZWN0ZWQgb2JqZWN0IGJ1dCBnb3QgJXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBzcGVjID09PSBudWxsID8gbnVsbCA6IHR5cGVvZlNwZWMpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gICEodHlwZW9mIHNwZWMgIT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGNsYXNzIG9yIGZ1bmN0aW9uIGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzUnKSA6IHZvaWQgMDtcbiAgISFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoc3BlYykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NicpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJykpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyB3aGVuIG1peGluZyBpbiBjb21wb25lbnQgc3BlY3MuJywgc3BlY1BvbGljeSwgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzcnLCBzcGVjUG9saWN5LCBuYW1lKSA6IHZvaWQgMDtcblxuICAgICAgICAgIC8vIEZvciBtZXRob2RzIHdoaWNoIGFyZSBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLCBjYWxsIHRoZSBleGlzdGluZ1xuICAgICAgICAgIC8vIG1ldGhvZHMgYmVmb3JlIGNhbGxpbmcgdGhlIG5ldyBwcm9wZXJ0eSwgbWVyZ2luZyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgICBpZiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFkZCB2ZXJib3NlIGRpc3BsYXlOYW1lIHRvIHRoZSBmdW5jdGlvbiwgd2hpY2ggaGVscHMgd2hlbiBsb29raW5nXG4gICAgICAgICAgICAvLyBhdCBwcm9maWxpbmcgdG9vbHMuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmIHNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0uZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lICsgJ18nICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgaWYgKCFzdGF0aWNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIG5hbWUgaW4gc3RhdGljcykge1xuICAgIHZhciBwcm9wZXJ0eSA9IHN0YXRpY3NbbmFtZV07XG4gICAgaWYgKCFzdGF0aWNzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXNlcnZlZCA9IG5hbWUgaW4gUkVTRVJWRURfU1BFQ19LRVlTO1xuICAgICEhaXNSZXNlcnZlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgcHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0IGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IGluc3RlYWQ7IGl0IHdpbGwgc3RpbGwgYmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzgnLCBuYW1lKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGAlc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc5JywgbmFtZSkgOiB2b2lkIDA7XG4gICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtvYmplY3R9IG9uZSBhZnRlciBpdCBoYXMgYmVlbiBtdXRhdGVkIHRvIGNvbnRhaW4gZXZlcnl0aGluZyBpbiB0d28uXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgIShvbmUgJiYgdHdvICYmIHR5cGVvZiBvbmUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0d28gPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKSA6IF9wcm9kSW52YXJpYW50KCc4MCcpIDogdm9pZCAwO1xuXG4gIGZvciAodmFyIGtleSBpbiB0d28pIHtcbiAgICBpZiAodHdvLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICEob25lW2tleV0gPT09IHVuZGVmaW5lZCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gZ2V0SW5pdGlhbFN0YXRlKCkgb3IgZ2V0RGVmYXVsdFByb3BzKCkgbWV0aG9kcyByZXR1cm5pbmcgb2JqZWN0cyB3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KSA6IF9wcm9kSW52YXJpYW50KCc4MScsIGtleSkgOiB2b2lkIDA7XG4gICAgICBvbmVba2V5XSA9IHR3b1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb25lO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgbWVyZ2VzIHRoZWlyIHJldHVybiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgdmFyIGEgPSBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgdmFyIGMgPSB7fTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYik7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IG51bGw7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWU7XG4gICAgdmFyIF9iaW5kID0gYm91bmRNZXRob2QuYmluZDtcbiAgICBib3VuZE1ldGhvZC5iaW5kID0gZnVuY3Rpb24gKG5ld1RoaXMpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgLy8gVXNlciBpcyB0cnlpbmcgdG8gYmluZCgpIGFuIGF1dG9ib3VuZCBtZXRob2Q7IHdlIGVmZmVjdGl2ZWx5IHdpbGxcbiAgICAgIC8vIGlnbm9yZSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgdGhhdCB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlLCBzb1xuICAgICAgLy8gbGV0J3Mgd2Fybi5cbiAgICAgIGlmIChuZXdUaGlzICE9PSBjb21wb25lbnQgJiYgbmV3VGhpcyAhPT0gbnVsbCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogUmVhY3QgY29tcG9uZW50IG1ldGhvZHMgbWF5IG9ubHkgYmUgYm91bmQgdG8gdGhlICcgKyAnY29tcG9uZW50IGluc3RhbmNlLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICB9XG4gICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBib3VuZE1ldGhvZDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kcyhjb21wb25lbnQpIHtcbiAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGF1dG9CaW5kS2V5ID0gcGFpcnNbaV07XG4gICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICogdGhlcmVmb3JlIG5vdCBhbHJlYWR5IHBhcnQgb2YgdGhlIG1vZGVybiBSZWFjdENvbXBvbmVudC5cbiAqL1xudmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAvKipcbiAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdyZXBsYWNlU3RhdGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVyLmlzTW91bnRlZCh0aGlzKTtcbiAgfVxufTtcblxudmFyIFJlYWN0Q2xhc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbl9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxudmFyIGRpZFdhcm5EZXByZWNhdGVkID0gZmFsc2U7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlY2xhc3NcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNwZWMgQ2xhc3Mgc3BlY2lmaWNhdGlvbiAod2hpY2ggbXVzdCBkZWZpbmUgYHJlbmRlcmApLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjcmVhdGVDbGFzczogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZGlkV2FybkRlcHJlY2F0ZWQsICclczogUmVhY3QuY3JlYXRlQ2xhc3MgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTYuICcgKyAnVXNlIHBsYWluIEphdmFTY3JpcHQgY2xhc3NlcyBpbnN0ZWFkLiBJZiB5b3VcXCdyZSBub3QgeWV0IHJlYWR5IHRvICcgKyAnbWlncmF0ZSwgY3JlYXRlLXJlYWN0LWNsYXNzIGlzIGF2YWlsYWJsZSBvbiBucG0gYXMgYSAnICsgJ2Ryb3AtaW4gcmVwbGFjZW1lbnQuJywgc3BlYyAmJiBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIENvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgZGlkV2FybkRlcHJlY2F0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFRvIGtlZXAgb3VyIHdhcm5pbmdzIG1vcmUgdW5kZXJzdGFuZGFibGUsIHdlJ2xsIHVzZSBhIGxpdHRsZSBoYWNrIGhlcmUgdG9cbiAgICAvLyBlbnN1cmUgdGhhdCBDb25zdHJ1Y3Rvci5uYW1lICE9PSAnQ29uc3RydWN0b3InLiBUaGlzIG1ha2VzIHN1cmUgd2UgZG9uJ3RcbiAgICAvLyB1bm5lY2Vzc2FyaWx5IGlkZW50aWZ5IGEgY2xhc3Mgd2l0aG91dCBkaXNwbGF5TmFtZSBhcyAnQ29uc3RydWN0b3InLlxuICAgIHZhciBDb25zdHJ1Y3RvciA9IGlkZW50aXR5KGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBfcHJvZEludmFyaWFudCgnODInLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcblxuICAgICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB9KTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBuZXcgUmVhY3RDbGFzc0NvbXBvbmVudCgpO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5fX3JlYWN0QXV0b0JpbmRQYWlycyA9IFtdO1xuXG4gICAgaW5qZWN0ZWRNaXhpbnMuZm9yRWFjaChtaXhTcGVjSW50b0NvbXBvbmVudC5iaW5kKG51bGwsIENvbnN0cnVjdG9yKSk7XG5cbiAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkZWZhdWx0UHJvcHMgcHJvcGVydHkgYWZ0ZXIgYWxsIG1peGlucyBoYXZlIGJlZW4gbWVyZ2VkLlxuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgdGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZSBvZiB0aGVzZSBtZXRob2QgbmFtZXMgaXMgb2ssXG4gICAgICAvLyBzaW5jZSBpdCdzIHVzZWQgd2l0aCBjcmVhdGVDbGFzcy4gSWYgaXQncyBub3QsIHRoZW4gaXQncyBsaWtlbHkgYVxuICAgICAgLy8gbWlzdGFrZSBzbyB3ZSdsbCB3YXJuIHlvdSB0byB1c2UgdGhlIHN0YXRpYyBwcm9wZXJ0eSwgcHJvcGVydHlcbiAgICAgIC8vIGluaXRpYWxpemVyIG9yIGNvbnN0cnVjdG9yIHJlc3BlY3RpdmVseS5cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKSA6IF9wcm9kSW52YXJpYW50KCc4MycpIDogdm9pZCAwO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50U2hvdWxkVXBkYXRlLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKSA6IF9wcm9kSW52YXJpYW50KCc4NScpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcyk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gaXNOYXRpdmUoZm4pIHtcbiAgLy8gQmFzZWQgb24gaXNOYXRpdmUoKSBmcm9tIExvZGFzaFxuICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgKyBmdW5jVG9TdHJpbmdcbiAgLy8gVGFrZSBhbiBleGFtcGxlIG5hdGl2ZSBmdW5jdGlvbiBzb3VyY2UgZm9yIGNvbXBhcmlzb25cbiAgLmNhbGwoaGFzT3duUHJvcGVydHkpXG4gIC8vIFN0cmlwIHJlZ2V4IGNoYXJhY3RlcnMgc28gd2UgY2FuIHVzZSBpdCBmb3IgcmVnZXhcbiAgLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLy8gUmVtb3ZlIGhhc093blByb3BlcnR5IGZyb20gdGhlIHRlbXBsYXRlIHRvIG1ha2UgaXQgZ2VuZXJpY1xuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCcpO1xuICB0cnkge1xuICAgIHZhciBzb3VyY2UgPSBmdW5jVG9TdHJpbmcuY2FsbChmbik7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChzb3VyY2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGNhblVzZUNvbGxlY3Rpb25zID1cbi8vIEFycmF5LmZyb21cbnR5cGVvZiBBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nICYmXG4vLyBNYXBcbnR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwKSAmJlxuLy8gTWFwLnByb3RvdHlwZS5rZXlzXG5NYXAucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXAucHJvdG90eXBlLmtleXMpICYmXG4vLyBTZXRcbnR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0KSAmJlxuLy8gU2V0LnByb3RvdHlwZS5rZXlzXG5TZXQucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIFNldC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQucHJvdG90eXBlLmtleXMpO1xuXG52YXIgc2V0SXRlbTtcbnZhciBnZXRJdGVtO1xudmFyIHJlbW92ZUl0ZW07XG52YXIgZ2V0SXRlbUlEcztcbnZhciBhZGRSb290O1xudmFyIHJlbW92ZVJvb3Q7XG52YXIgZ2V0Um9vdElEcztcblxuaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gIHZhciBpdGVtTWFwID0gbmV3IE1hcCgpO1xuICB2YXIgcm9vdElEU2V0ID0gbmV3IFNldCgpO1xuXG4gIHNldEl0ZW0gPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICBpdGVtTWFwLnNldChpZCwgaXRlbSk7XG4gIH07XG4gIGdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gaXRlbU1hcC5nZXQoaWQpO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgaXRlbU1hcFsnZGVsZXRlJ10oaWQpO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGl0ZW1NYXAua2V5cygpKTtcbiAgfTtcblxuICBhZGRSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcm9vdElEU2V0LmFkZChpZCk7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByb290SURTZXRbJ2RlbGV0ZSddKGlkKTtcbiAgfTtcbiAgZ2V0Um9vdElEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290SURTZXQua2V5cygpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBpdGVtQnlLZXkgPSB7fTtcbiAgdmFyIHJvb3RCeUtleSA9IHt9O1xuXG4gIC8vIFVzZSBub24tbnVtZXJpYyBrZXlzIHRvIHByZXZlbnQgVjggcGVyZm9ybWFuY2UgaXNzdWVzOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MjMyXG4gIHZhciBnZXRLZXlGcm9tSUQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gJy4nICsgaWQ7XG4gIH07XG4gIHZhciBnZXRJREZyb21LZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGtleS5zdWJzdHIoMSksIDEwKTtcbiAgfTtcblxuICBzZXRJdGVtID0gZnVuY3Rpb24gKGlkLCBpdGVtKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgaXRlbUJ5S2V5W2tleV0gPSBpdGVtO1xuICB9O1xuICBnZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcmV0dXJuIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtQnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9O1xuXG4gIGFkZFJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByb290QnlLZXlba2V5XSA9IHRydWU7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgcm9vdEJ5S2V5W2tleV07XG4gIH07XG4gIGdldFJvb3RJRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJvb3RCeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH07XG59XG5cbnZhciB1bm1vdW50ZWRJRHMgPSBbXTtcblxuZnVuY3Rpb24gcHVyZ2VEZWVwKGlkKSB7XG4gIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gIGlmIChpdGVtKSB7XG4gICAgdmFyIGNoaWxkSURzID0gaXRlbS5jaGlsZElEcztcblxuICAgIHJlbW92ZUl0ZW0oaWQpO1xuICAgIGNoaWxkSURzLmZvckVhY2gocHVyZ2VEZWVwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiAnI2VtcHR5JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuICcjdGV4dCc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGUuZGlzcGxheU5hbWUgfHwgZWxlbWVudC50eXBlLm5hbWUgfHwgJ1Vua25vd24nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlSUQoaWQpIHtcbiAgdmFyIG5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKGlkKTtcbiAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICB2YXIgb3duZXJJRCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0T3duZXJJRChpZCk7XG4gIHZhciBvd25lck5hbWU7XG4gIGlmIChvd25lcklEKSB7XG4gICAgb3duZXJOYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShvd25lcklEKTtcbiAgfVxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50LCAnUmVhY3RDb21wb25lbnRUcmVlSG9vazogTWlzc2luZyBSZWFjdCBlbGVtZW50IGZvciBkZWJ1Z0lEICVzIHdoZW4gJyArICdidWlsZGluZyBzdGFjaycsIGlkKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgZWxlbWVudCAmJiBlbGVtZW50Ll9zb3VyY2UsIG93bmVyTmFtZSk7XG59XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0ge1xuICBvblNldENoaWxkcmVuOiBmdW5jdGlvbiAoaWQsIG5leHRDaGlsZElEcykge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnSXRlbSBtdXN0IGhhdmUgYmVlbiBzZXQnKSA6IF9wcm9kSW52YXJpYW50KCcxNDQnKSA6IHZvaWQgMDtcbiAgICBpdGVtLmNoaWxkSURzID0gbmV4dENoaWxkSURzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXh0Q2hpbGRJRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuZXh0Q2hpbGRJRCA9IG5leHRDaGlsZElEc1tpXTtcbiAgICAgIHZhciBuZXh0Q2hpbGQgPSBnZXRJdGVtKG5leHRDaGlsZElEKTtcbiAgICAgICFuZXh0Q2hpbGQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgaG9vayBldmVudHMgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDAnKSA6IHZvaWQgMDtcbiAgICAgICEobmV4dENoaWxkLmNoaWxkSURzICE9IG51bGwgfHwgdHlwZW9mIG5leHRDaGlsZC5lbGVtZW50ICE9PSAnb2JqZWN0JyB8fCBuZXh0Q2hpbGQuZWxlbWVudCA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvblNldENoaWxkcmVuKCkgdG8gZmlyZSBmb3IgYSBjb250YWluZXIgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MScpIDogdm9pZCAwO1xuICAgICAgIW5leHRDaGlsZC5pc01vdW50ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25Nb3VudENvbXBvbmVudCgpIHRvIGZpcmUgZm9yIHRoZSBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiBfcHJvZEludmFyaWFudCgnNzEnKSA6IHZvaWQgMDtcbiAgICAgIGlmIChuZXh0Q2hpbGQucGFyZW50SUQgPT0gbnVsbCkge1xuICAgICAgICBuZXh0Q2hpbGQucGFyZW50SUQgPSBpZDtcbiAgICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGRuJ3QgYmUgbmVjZXNzYXJ5IGJ1dCBtb3VudGluZyBhIG5ldyByb290IGR1cmluZyBpblxuICAgICAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgY3VycmVudGx5IGNhdXNlcyBub3QteWV0LW1vdW50ZWQgY29tcG9uZW50cyB0b1xuICAgICAgICAvLyBiZSBwdXJnZWQgZnJvbSBvdXIgdHJlZSBkYXRhIHNvIHRoZWlyIHBhcmVudCBpZCBpcyBtaXNzaW5nLlxuICAgICAgfVxuICAgICAgIShuZXh0Q2hpbGQucGFyZW50SUQgPT09IGlkKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbkJlZm9yZU1vdW50Q29tcG9uZW50KCkgcGFyZW50IGFuZCBvblNldENoaWxkcmVuKCkgdG8gYmUgY29uc2lzdGVudCAoJXMgaGFzIHBhcmVudHMgJXMgYW5kICVzKS4nLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiBfcHJvZEludmFyaWFudCgnMTQyJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogdm9pZCAwO1xuICAgIH1cbiAgfSxcbiAgb25CZWZvcmVNb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50LCBwYXJlbnRJRCkge1xuICAgIHZhciBpdGVtID0ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIHBhcmVudElEOiBwYXJlbnRJRCxcbiAgICAgIHRleHQ6IG51bGwsXG4gICAgICBjaGlsZElEczogW10sXG4gICAgICBpc01vdW50ZWQ6IGZhbHNlLFxuICAgICAgdXBkYXRlQ291bnQ6IDBcbiAgICB9O1xuICAgIHNldEl0ZW0oaWQsIGl0ZW0pO1xuICB9LFxuICBvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50KSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0uZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnSXRlbSBtdXN0IGhhdmUgYmVlbiBzZXQnKSA6IF9wcm9kSW52YXJpYW50KCcxNDQnKSA6IHZvaWQgMDtcbiAgICBpdGVtLmlzTW91bnRlZCA9IHRydWU7XG4gICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgaWYgKGlzUm9vdCkge1xuICAgICAgYWRkUm9vdChpZCk7XG4gICAgfVxuICB9LFxuICBvblVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0udXBkYXRlQ291bnQrKztcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGlmIGl0IGV4aXN0cy5cbiAgICAgIC8vIGBpdGVtYCBtaWdodCBub3QgZXhpc3QgaWYgaXQgaXMgaW5zaWRlIGFuIGVycm9yIGJvdW5kYXJ5LCBhbmQgYSBzaWJsaW5nXG4gICAgICAvLyBlcnJvciBib3VuZGFyeSBjaGlsZCB0aHJldyB3aGlsZSBtb3VudGluZy4gVGhlbiB0aGlzIGluc3RhbmNlIG5ldmVyXG4gICAgICAvLyBnb3QgYSBjaGFuY2UgdG8gbW91bnQsIGJ1dCBpdCBzdGlsbCBnZXRzIGFuIHVubW91bnRpbmcgZXZlbnQgZHVyaW5nXG4gICAgICAvLyB0aGUgZXJyb3IgYm91bmRhcnkgY2xlYW51cC5cbiAgICAgIGl0ZW0uaXNNb3VudGVkID0gZmFsc2U7XG4gICAgICB2YXIgaXNSb290ID0gaXRlbS5wYXJlbnRJRCA9PT0gMDtcbiAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgcmVtb3ZlUm9vdChpZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHVubW91bnRlZElEcy5wdXNoKGlkKTtcbiAgfSxcbiAgcHVyZ2VVbm1vdW50ZWRDb21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFJlYWN0Q29tcG9uZW50VHJlZUhvb2suX3ByZXZlbnRQdXJnaW5nKSB7XG4gICAgICAvLyBTaG91bGQgb25seSBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdW5tb3VudGVkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB1bm1vdW50ZWRJRHNbaV07XG4gICAgICBwdXJnZURlZXAoaWQpO1xuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMubGVuZ3RoID0gMDtcbiAgfSxcbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5pc01vdW50ZWQgOiBmYWxzZTtcbiAgfSxcbiAgZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW06IGZ1bmN0aW9uICh0b3BFbGVtZW50KSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICBpZiAodG9wRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXREaXNwbGF5TmFtZSh0b3BFbGVtZW50KTtcbiAgICAgIHZhciBvd25lciA9IHRvcEVsZW1lbnQuX293bmVyO1xuICAgICAgaW5mbyArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHRvcEVsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgb3duZXIuZ2V0TmFtZSgpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudE93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB2YXIgaWQgPSBjdXJyZW50T3duZXIgJiYgY3VycmVudE93bmVyLl9kZWJ1Z0lEO1xuXG4gICAgaW5mbyArPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGlkKTtcbiAgICByZXR1cm4gaW5mbztcbiAgfSxcbiAgZ2V0U3RhY2tBZGRlbmR1bUJ5SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgd2hpbGUgKGlkKSB7XG4gICAgICBpbmZvICs9IGRlc2NyaWJlSUQoaWQpO1xuICAgICAgaWQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFBhcmVudElEKGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldENoaWxkSURzOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jaGlsZElEcyA6IFtdO1xuICB9LFxuICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBnZXREaXNwbGF5TmFtZShlbGVtZW50KTtcbiAgfSxcbiAgZ2V0RWxlbWVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gIH0sXG4gIGdldE93bmVySUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQuX293bmVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQuX293bmVyLl9kZWJ1Z0lEO1xuICB9LFxuICBnZXRQYXJlbnRJRDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ucGFyZW50SUQgOiBudWxsO1xuICB9LFxuICBnZXRTb3VyY2U6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtID8gaXRlbS5lbGVtZW50IDogbnVsbDtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5fc291cmNlIDogbnVsbDtcbiAgICByZXR1cm4gc291cmNlO1xuICB9LFxuICBnZXRUZXh0OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnJyArIGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbiAgZ2V0VXBkYXRlQ291bnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnVwZGF0ZUNvdW50IDogMDtcbiAgfSxcblxuXG4gIGdldFJvb3RJRHM6IGdldFJvb3RJRHMsXG4gIGdldFJlZ2lzdGVyZWRJRHM6IGdldEl0ZW1JRHNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRUcmVlSG9vazsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgb3duZXIuXG4gKlxuICogVGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIGNvbXBvbmVudCB3aG8gc2hvdWxkIG93biBhbnkgY29tcG9uZW50cyB0aGF0IGFyZVxuICogY3VycmVudGx5IGJlaW5nIGNvbnN0cnVjdGVkLlxuICovXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSB7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDdXJyZW50T3duZXI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgSFRNTCB0YWcgZWxlbWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIGNyZWF0ZURPTUZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuICBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcHBpbmcgZnJvbSBzdXBwb3J0ZWQgSFRNTCB0YWdzIHRvIGBSZWFjdERPTUNvbXBvbmVudGAgY2xhc3Nlcy5cbiAqIFRoaXMgaXMgYWxzbyBhY2Nlc3NpYmxlIHZpYSBgUmVhY3QuRE9NYC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHtcbiAgYTogY3JlYXRlRE9NRmFjdG9yeSgnYScpLFxuICBhYmJyOiBjcmVhdGVET01GYWN0b3J5KCdhYmJyJyksXG4gIGFkZHJlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ2FkZHJlc3MnKSxcbiAgYXJlYTogY3JlYXRlRE9NRmFjdG9yeSgnYXJlYScpLFxuICBhcnRpY2xlOiBjcmVhdGVET01GYWN0b3J5KCdhcnRpY2xlJyksXG4gIGFzaWRlOiBjcmVhdGVET01GYWN0b3J5KCdhc2lkZScpLFxuICBhdWRpbzogY3JlYXRlRE9NRmFjdG9yeSgnYXVkaW8nKSxcbiAgYjogY3JlYXRlRE9NRmFjdG9yeSgnYicpLFxuICBiYXNlOiBjcmVhdGVET01GYWN0b3J5KCdiYXNlJyksXG4gIGJkaTogY3JlYXRlRE9NRmFjdG9yeSgnYmRpJyksXG4gIGJkbzogY3JlYXRlRE9NRmFjdG9yeSgnYmRvJyksXG4gIGJpZzogY3JlYXRlRE9NRmFjdG9yeSgnYmlnJyksXG4gIGJsb2NrcXVvdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jsb2NrcXVvdGUnKSxcbiAgYm9keTogY3JlYXRlRE9NRmFjdG9yeSgnYm9keScpLFxuICBicjogY3JlYXRlRE9NRmFjdG9yeSgnYnInKSxcbiAgYnV0dG9uOiBjcmVhdGVET01GYWN0b3J5KCdidXR0b24nKSxcbiAgY2FudmFzOiBjcmVhdGVET01GYWN0b3J5KCdjYW52YXMnKSxcbiAgY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnY2FwdGlvbicpLFxuICBjaXRlOiBjcmVhdGVET01GYWN0b3J5KCdjaXRlJyksXG4gIGNvZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvZGUnKSxcbiAgY29sOiBjcmVhdGVET01GYWN0b3J5KCdjb2wnKSxcbiAgY29sZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbGdyb3VwJyksXG4gIGRhdGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGEnKSxcbiAgZGF0YWxpc3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGFsaXN0JyksXG4gIGRkOiBjcmVhdGVET01GYWN0b3J5KCdkZCcpLFxuICBkZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlbCcpLFxuICBkZXRhaWxzOiBjcmVhdGVET01GYWN0b3J5KCdkZXRhaWxzJyksXG4gIGRmbjogY3JlYXRlRE9NRmFjdG9yeSgnZGZuJyksXG4gIGRpYWxvZzogY3JlYXRlRE9NRmFjdG9yeSgnZGlhbG9nJyksXG4gIGRpdjogY3JlYXRlRE9NRmFjdG9yeSgnZGl2JyksXG4gIGRsOiBjcmVhdGVET01GYWN0b3J5KCdkbCcpLFxuICBkdDogY3JlYXRlRE9NRmFjdG9yeSgnZHQnKSxcbiAgZW06IGNyZWF0ZURPTUZhY3RvcnkoJ2VtJyksXG4gIGVtYmVkOiBjcmVhdGVET01GYWN0b3J5KCdlbWJlZCcpLFxuICBmaWVsZHNldDogY3JlYXRlRE9NRmFjdG9yeSgnZmllbGRzZXQnKSxcbiAgZmlnY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnZmlnY2FwdGlvbicpLFxuICBmaWd1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ3VyZScpLFxuICBmb290ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvb3RlcicpLFxuICBmb3JtOiBjcmVhdGVET01GYWN0b3J5KCdmb3JtJyksXG4gIGgxOiBjcmVhdGVET01GYWN0b3J5KCdoMScpLFxuICBoMjogY3JlYXRlRE9NRmFjdG9yeSgnaDInKSxcbiAgaDM6IGNyZWF0ZURPTUZhY3RvcnkoJ2gzJyksXG4gIGg0OiBjcmVhdGVET01GYWN0b3J5KCdoNCcpLFxuICBoNTogY3JlYXRlRE9NRmFjdG9yeSgnaDUnKSxcbiAgaDY6IGNyZWF0ZURPTUZhY3RvcnkoJ2g2JyksXG4gIGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWQnKSxcbiAgaGVhZGVyOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkZXInKSxcbiAgaGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdoZ3JvdXAnKSxcbiAgaHI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hyJyksXG4gIGh0bWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2h0bWwnKSxcbiAgaTogY3JlYXRlRE9NRmFjdG9yeSgnaScpLFxuICBpZnJhbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ2lmcmFtZScpLFxuICBpbWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltZycpLFxuICBpbnB1dDogY3JlYXRlRE9NRmFjdG9yeSgnaW5wdXQnKSxcbiAgaW5zOiBjcmVhdGVET01GYWN0b3J5KCdpbnMnKSxcbiAga2JkOiBjcmVhdGVET01GYWN0b3J5KCdrYmQnKSxcbiAga2V5Z2VuOiBjcmVhdGVET01GYWN0b3J5KCdrZXlnZW4nKSxcbiAgbGFiZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2xhYmVsJyksXG4gIGxlZ2VuZDogY3JlYXRlRE9NRmFjdG9yeSgnbGVnZW5kJyksXG4gIGxpOiBjcmVhdGVET01GYWN0b3J5KCdsaScpLFxuICBsaW5rOiBjcmVhdGVET01GYWN0b3J5KCdsaW5rJyksXG4gIG1haW46IGNyZWF0ZURPTUZhY3RvcnkoJ21haW4nKSxcbiAgbWFwOiBjcmVhdGVET01GYWN0b3J5KCdtYXAnKSxcbiAgbWFyazogY3JlYXRlRE9NRmFjdG9yeSgnbWFyaycpLFxuICBtZW51OiBjcmVhdGVET01GYWN0b3J5KCdtZW51JyksXG4gIG1lbnVpdGVtOiBjcmVhdGVET01GYWN0b3J5KCdtZW51aXRlbScpLFxuICBtZXRhOiBjcmVhdGVET01GYWN0b3J5KCdtZXRhJyksXG4gIG1ldGVyOiBjcmVhdGVET01GYWN0b3J5KCdtZXRlcicpLFxuICBuYXY6IGNyZWF0ZURPTUZhY3RvcnkoJ25hdicpLFxuICBub3NjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnbm9zY3JpcHQnKSxcbiAgb2JqZWN0OiBjcmVhdGVET01GYWN0b3J5KCdvYmplY3QnKSxcbiAgb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ29sJyksXG4gIG9wdGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdvcHRncm91cCcpLFxuICBvcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGlvbicpLFxuICBvdXRwdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ291dHB1dCcpLFxuICBwOiBjcmVhdGVET01GYWN0b3J5KCdwJyksXG4gIHBhcmFtOiBjcmVhdGVET01GYWN0b3J5KCdwYXJhbScpLFxuICBwaWN0dXJlOiBjcmVhdGVET01GYWN0b3J5KCdwaWN0dXJlJyksXG4gIHByZTogY3JlYXRlRE9NRmFjdG9yeSgncHJlJyksXG4gIHByb2dyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdwcm9ncmVzcycpLFxuICBxOiBjcmVhdGVET01GYWN0b3J5KCdxJyksXG4gIHJwOiBjcmVhdGVET01GYWN0b3J5KCdycCcpLFxuICBydDogY3JlYXRlRE9NRmFjdG9yeSgncnQnKSxcbiAgcnVieTogY3JlYXRlRE9NRmFjdG9yeSgncnVieScpLFxuICBzOiBjcmVhdGVET01GYWN0b3J5KCdzJyksXG4gIHNhbXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3NhbXAnKSxcbiAgc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdzY3JpcHQnKSxcbiAgc2VjdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnc2VjdGlvbicpLFxuICBzZWxlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3NlbGVjdCcpLFxuICBzbWFsbDogY3JlYXRlRE9NRmFjdG9yeSgnc21hbGwnKSxcbiAgc291cmNlOiBjcmVhdGVET01GYWN0b3J5KCdzb3VyY2UnKSxcbiAgc3BhbjogY3JlYXRlRE9NRmFjdG9yeSgnc3BhbicpLFxuICBzdHJvbmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0cm9uZycpLFxuICBzdHlsZTogY3JlYXRlRE9NRmFjdG9yeSgnc3R5bGUnKSxcbiAgc3ViOiBjcmVhdGVET01GYWN0b3J5KCdzdWInKSxcbiAgc3VtbWFyeTogY3JlYXRlRE9NRmFjdG9yeSgnc3VtbWFyeScpLFxuICBzdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1cCcpLFxuICB0YWJsZTogY3JlYXRlRE9NRmFjdG9yeSgndGFibGUnKSxcbiAgdGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rib2R5JyksXG4gIHRkOiBjcmVhdGVET01GYWN0b3J5KCd0ZCcpLFxuICB0ZXh0YXJlYTogY3JlYXRlRE9NRmFjdG9yeSgndGV4dGFyZWEnKSxcbiAgdGZvb3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rmb290JyksXG4gIHRoOiBjcmVhdGVET01GYWN0b3J5KCd0aCcpLFxuICB0aGVhZDogY3JlYXRlRE9NRmFjdG9yeSgndGhlYWQnKSxcbiAgdGltZTogY3JlYXRlRE9NRmFjdG9yeSgndGltZScpLFxuICB0aXRsZTogY3JlYXRlRE9NRmFjdG9yeSgndGl0bGUnKSxcbiAgdHI6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyJyksXG4gIHRyYWNrOiBjcmVhdGVET01GYWN0b3J5KCd0cmFjaycpLFxuICB1OiBjcmVhdGVET01GYWN0b3J5KCd1JyksXG4gIHVsOiBjcmVhdGVET01GYWN0b3J5KCd1bCcpLFxuICAndmFyJzogY3JlYXRlRE9NRmFjdG9yeSgndmFyJyksXG4gIHZpZGVvOiBjcmVhdGVET01GYWN0b3J5KCd2aWRlbycpLFxuICB3YnI6IGNyZWF0ZURPTUZhY3RvcnkoJ3dicicpLFxuXG4gIC8vIFNWR1xuICBjaXJjbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpcmNsZScpLFxuICBjbGlwUGF0aDogY3JlYXRlRE9NRmFjdG9yeSgnY2xpcFBhdGgnKSxcbiAgZGVmczogY3JlYXRlRE9NRmFjdG9yeSgnZGVmcycpLFxuICBlbGxpcHNlOiBjcmVhdGVET01GYWN0b3J5KCdlbGxpcHNlJyksXG4gIGc6IGNyZWF0ZURPTUZhY3RvcnkoJ2cnKSxcbiAgaW1hZ2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltYWdlJyksXG4gIGxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmUnKSxcbiAgbGluZWFyR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmVhckdyYWRpZW50JyksXG4gIG1hc2s6IGNyZWF0ZURPTUZhY3RvcnkoJ21hc2snKSxcbiAgcGF0aDogY3JlYXRlRE9NRmFjdG9yeSgncGF0aCcpLFxuICBwYXR0ZXJuOiBjcmVhdGVET01GYWN0b3J5KCdwYXR0ZXJuJyksXG4gIHBvbHlnb246IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlnb24nKSxcbiAgcG9seWxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlsaW5lJyksXG4gIHJhZGlhbEdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdyYWRpYWxHcmFkaWVudCcpLFxuICByZWN0OiBjcmVhdGVET01GYWN0b3J5KCdyZWN0JyksXG4gIHN0b3A6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0b3AnKSxcbiAgc3ZnOiBjcmVhdGVET01GYWN0b3J5KCdzdmcnKSxcbiAgdGV4dDogY3JlYXRlRE9NRmFjdG9yeSgndGV4dCcpLFxuICB0c3BhbjogY3JlYXRlRE9NRmFjdG9yeSgndHNwYW4nKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTUZhY3RvcmllczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFN5bWJvbCcpO1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xuXG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24sIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duO1xuXG5mdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nUmVmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNlbGZcbiAgICAgIH0pO1xuICAgICAgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50Ll9zZWxmID0gc2VsZjtcbiAgICAgIGVsZW1lbnQuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZmFjdG9yeVxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHZhciBmYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgLy8gRXhwb3NlIHRoZSB0eXBlIG9uIHRoZSBmYWN0b3J5IGFuZCB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIGVhc2lseSBhY2Nlc3NlZCBvbiBlbGVtZW50cy4gRS5nLiBgPEZvbyAvPi50eXBlID09PSBGb29gLlxuICAvLyBUaGlzIHNob3VsZCBub3QgYmUgbmFtZWQgYGNvbnN0cnVjdG9yYCBzaW5jZSB0aGlzIG1heSBub3QgYmUgdGhlIGZ1bmN0aW9uXG4gIC8vIHRoYXQgY3JlYXRlZCB0aGUgZWxlbWVudCwgYW5kIGl0IG1heSBub3QgZXZlbiBiZSBhIGNvbnN0cnVjdG9yLlxuICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgZmFjdG9yeS50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5ID0gZnVuY3Rpb24gKG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jbG9uZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn07XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5pc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQgdHlwZS4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2xbJ2ZvciddICYmIFN5bWJvbFsnZm9yJ10oJ3JlYWN0LmVsZW1lbnQnKSB8fCAweGVhYzc7XG5cbm1vZHVsZS5leHBvcnRzID0gUkVBQ1RfRUxFTUVOVF9UWVBFOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGNoZWNrUmVhY3RUeXBlU3BlYyA9IHJlcXVpcmUoJy4vY2hlY2tSZWFjdFR5cGVTcGVjJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oZWxlbWVudFByb3BzKSB7XG4gIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudFByb3BzLl9fc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudFByb3BzLl9fc291cmNlO1xuICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICByZXR1cm4gJyBDaGVjayB5b3VyIGNvZGUgYXQgJyArIGZpbGVOYW1lICsgJzonICsgbGluZU51bWJlciArICcuJztcbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSkge1xuICB2YXIgaW5mbyA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuXG4gIGlmICghaW5mbykge1xuICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBpbmZvID0gJyBDaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmZvO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuXG4gIHZhciBtZW1vaXplciA9IG93bmVySGFzS2V5VXNlV2FybmluZy51bmlxdWVLZXkgfHwgKG93bmVySGFzS2V5VXNlV2FybmluZy51bmlxdWVLZXkgPSB7fSk7XG5cbiAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuICBpZiAobWVtb2l6ZXJbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbWVtb2l6ZXJbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlO1xuXG4gIC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuICB2YXIgY2hpbGRPd25lciA9ICcnO1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIC8vIEdpdmUgdGhlIGNvbXBvbmVudCB0aGF0IG9yaWdpbmFsbHkgY3JlYXRlZCB0aGlzIGNoaWxkLlxuICAgIGNoaWxkT3duZXIgPSAnIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tICcgKyBlbGVtZW50Ll9vd25lci5nZXROYW1lKCkgKyAnLic7XG4gIH1cblxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJXMnLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIGlmIChjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMpIHtcbiAgICBjaGVja1JlYWN0VHlwZVNwZWMoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGVsZW1lbnQsIG51bGwpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICB9XG59XG5cbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSB7XG5cbiAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbic7XG4gICAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICAgIGlmICghdmFsaWRUeXBlKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBpbmZvID0gJyc7XG4gICAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5mbyArPSAnIFlvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBmcm9tIHRoZSBmaWxlICcgKyAnaXRcXCdzIGRlZmluZWQgaW4uJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0ocHJvcHMpO1xuICAgICAgICBpZiAoc291cmNlSW5mbykge1xuICAgICAgICAgIGluZm8gKz0gc291cmNlSW5mbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmZvICs9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5mbyArPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKCk7XG5cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGUgPT0gbnVsbCA/IHR5cGUgOiB0eXBlb2YgdHlwZSwgaW5mbykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gICAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgIGlmICh2YWxpZFR5cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICBjcmVhdGVGYWN0b3J5OiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBjb25zdHJ1Y3RvciAmJiAoY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgY29uc3RydWN0b3IubmFtZSkgfHwgJ1JlYWN0Q2xhc3MnKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGFic3RyYWN0IEFQSSBmb3IgYW4gdXBkYXRlIHF1ZXVlLlxuICovXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCB0aGUgcGVuZGluZyB1cGRhdGVzXG4gICAqIGhhdmUgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0byB1c2UgYXMgYHRoaXNgIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2spIHt9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3ROb29wVXBkYXRlUXVldWU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0J1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50JyksXG4gICAgaXNWYWxpZEVsZW1lbnQgPSBfcmVxdWlyZS5pc1ZhbGlkRWxlbWVudDtcblxudmFyIGZhY3RvcnkgPSByZXF1aXJlKCdwcm9wLXR5cGVzL2ZhY3RvcnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KGlzVmFsaWRFbGVtZW50KTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIC8vIER1cGxpY2F0ZWQgZnJvbSBSZWFjdENvbXBvbmVudC5cbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWFjdFB1cmVDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbl9hc3NpZ24oUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDb21wb25lbnQucHJvdG90eXBlKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHVyZUNvbXBvbmVudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICcxNS41LjQnOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gZmFsc2U7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB0cnkge1xuICAgIC8vICRGbG93Rml4TWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7IGdldDogZnVuY3Rpb24gKCkge30gfSk7XG4gICAgY2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW5EZWZpbmVQcm9wZXJ0eTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vaztcblxuaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnKSB7XG4gIC8vIFRlbXBvcmFyeSBoYWNrLlxuICAvLyBJbmxpbmUgcmVxdWlyZXMgZG9uJ3Qgd29yayB3ZWxsIHdpdGggSmVzdDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy83MjQwXG4gIC8vIFJlbW92ZSB0aGUgaW5saW5lIHJlcXVpcmVzIHdoZW4gd2UgZG9uJ3QgbmVlZCB0aGVtIGFueW1vcmU6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcxNzhcbiAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xufVxuXG52YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P29iamVjdH0gZWxlbWVudCBUaGUgUmVhY3QgZWxlbWVudCB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHs/bnVtYmVyfSBkZWJ1Z0lEIFRoZSBSZWFjdCBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBpcyBiZWluZyB0eXBlLWNoZWNrZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUmVhY3RUeXBlU3BlYyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGVsZW1lbnQsIGRlYnVnSUQpIHtcbiAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICEodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIFJlYWN0LlByb3BUeXBlcy4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lKSA6IF9wcm9kSW52YXJpYW50KCc4NCcsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUpIDogdm9pZCAwO1xuICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKSA6IHZvaWQgMDtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgIHZhciBjb21wb25lbnRTdGFja0luZm8gPSAnJztcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGlmICghUmVhY3RDb21wb25lbnRUcmVlSG9vaykge1xuICAgICAgICAgICAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGVidWdJRCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChkZWJ1Z0lEKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFN0YWNrSW5mbyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0oZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBjb21wb25lbnRTdGFja0luZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUmVhY3RUeXBlU3BlYzsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBTeW1ib2wgKi9cblxudmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICpcbiAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICpcbiAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpdGVyYXRvckZuO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SXRlcmF0b3JGbjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5vbmx5XG4gKlxuICogVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0c1xuICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAqIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdEVsZW1lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RFbGVtZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDMnKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9ubHlDaGlsZDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBXQVJOSU5HOiBETyBOT1QgbWFudWFsbHkgcmVxdWlyZSB0aGlzIG1vZHVsZS5cbiAqIFRoaXMgaXMgYSByZXBsYWNlbWVudCBmb3IgYGludmFyaWFudCguLi4pYCB1c2VkIGJ5IHRoZSBlcnJvciBjb2RlIHN5c3RlbVxuICogYW5kIHdpbGwgX29ubHlfIGJlIHJlcXVpcmVkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGJhYmVsIHBhc3MuXG4gKiBJdCBhbHdheXMgdGhyb3dzLlxuICovXG5cbmZ1bmN0aW9uIHJlYWN0UHJvZEludmFyaWFudChjb2RlKSB7XG4gIHZhciBhcmdDb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXG4gIHZhciBtZXNzYWdlID0gJ01pbmlmaWVkIFJlYWN0IGVycm9yICMnICsgY29kZSArICc7IHZpc2l0ICcgKyAnaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnQ9JyArIGNvZGU7XG5cbiAgZm9yICh2YXIgYXJnSWR4ID0gMDsgYXJnSWR4IDwgYXJnQ291bnQ7IGFyZ0lkeCsrKSB7XG4gICAgbWVzc2FnZSArPSAnJmFyZ3NbXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1thcmdJZHggKyAxXSk7XG4gIH1cblxuICBtZXNzYWdlICs9ICcgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50JyArICcgZm9yIGZ1bGwgZXJyb3JzIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJztcblxuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCByZWFjdFByb2RJbnZhcmlhbnQncyBvd24gZnJhbWVcblxuICB0aHJvdyBlcnJvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFjdFByb2RJbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50U3ltYm9sJyk7XG5cbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgS2V5RXNjYXBlVXRpbHMgPSByZXF1aXJlKCcuL0tleUVzY2FwZVV0aWxzJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogVGhpcyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50IHNpbmNlIHRoaXMgZmlsZSBpcyBzaGFyZWQgYmV0d2VlblxuICogaXNvbW9ycGhpYyBhbmQgcmVuZGVyZXJzLiBXZSBjb3VsZCBleHRyYWN0IHRoaXMgdG8gYVxuICpcbiAqL1xuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAoY29tcG9uZW50ICYmIHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBLZXlFc2NhcGVVdGlscy5lc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gIC8vIFRoZSBmb2xsb3dpbmcgaXMgaW5saW5lZCBmcm9tIFJlYWN0RWxlbWVudC4gVGhpcyBtZWFucyB3ZSBjYW4gb3B0aW1pemVcbiAgLy8gc29tZSBjaGVja3MuIFJlYWN0IEZpYmVyIGFsc28gaW5saW5lcyB0aGlzIGxvZ2ljIGZvciBzaW1pbGFyIHB1cnBvc2VzLlxuICB0eXBlID09PSAnb2JqZWN0JyAmJiBjaGlsZHJlbi4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICB2YXIgaWkgPSAwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyc7XG4gICAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgICAgaWYgKG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lKSB7XG4gICAgICAgICAgICAgIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgKyAnYC4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhkaWRXYXJuQWJvdXRNYXBzLCAnVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBub3QgeWV0IGZ1bGx5IHN1cHBvcnRlZC4gSXQgaXMgYW4gJyArICdleHBlcmltZW50YWwgZmVhdHVyZSB0aGF0IG1pZ2h0IGJlIHJlbW92ZWQuIENvbnZlcnQgaXQgdG8gYSAnICsgJ3NlcXVlbmNlIC8gaXRlcmFibGUgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLiVzJywgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgY2hpbGQgPSBlbnRyeVsxXTtcbiAgICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBLZXlFc2NhcGVVdGlscy5lc2NhcGUoZW50cnlbMF0pICsgU1VCU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCAwKTtcbiAgICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkIG9yIHdyYXAgdGhlIG9iamVjdCB1c2luZyBjcmVhdGVGcmFnbWVudChvYmplY3QpIGZyb20gdGhlICcgKyAnUmVhY3QgYWRkLW9ucy4nO1xuICAgICAgICBpZiAoY2hpbGRyZW4uX2lzUmVhY3RFbGVtZW50KSB7XG4gICAgICAgICAgYWRkZW5kdW0gPSAnIEl0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgYW4gZWxlbWVudCBjcmVhdGVkIGJ5IGEgZGlmZmVyZW50ICcgKyAndmVyc2lvbiBvZiBSZWFjdC4gTWFrZSBzdXJlIHRvIHVzZSBvbmx5IG9uZSBjb3B5IG9mIFJlYWN0Lic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSArPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiBfcHJvZEludmFyaWFudCgnMzEnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9SZWFjdCcpO1xuIiwidmFyIEFnZW5kYSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybih7XHJcbiAgICAgICAgICAgIGFqYXhVcmw6ICcuL2JhY2tlbmQvaW5kZXgucGhwJyxcclxuICAgICAgICAgICAgd2Vla0RheXM6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcclxuICAgICAgICAgICAgbW9udGhzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcclxuICAgICAgICAgICAgY29sb3JzOiBbJyNkMjAwMDAnLCAnIzAwNTA5ZicsICcjMDA5ZjlmJywgJyMwMDlmNTAnLCAnIzlmNTAwMCcsICcjOWYwMDlmJywgJyM5ZjlmMDAnXSxcclxuICAgICAgICAgICAgdXNlcl9pZDogMCxcclxuICAgICAgICAgICAgYWN0aXZpdGllczogW10sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJycsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vdGhpcy5zZXRTdGF0ZSh7dXNlcl9pZDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJHb29nbGVJZCcpfSlcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmxvYWRBY3Rpdml0aWVzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRBY3Rpdml0aWVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAnYycgICAgIDogJ3NjaGVkdWxlJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdsb2FkQWN0aXZpdGllcycsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgICAgICAndXNlcicgIDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJHb29nbGVJZCcpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLnBvc3Qoe3VybDogZWxlbWVudC5zdGF0ZS5hamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe2FjdGl2aXRpZXM6IGRhdGF9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfSkgXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgID0gdGhpcztcclxuICAgICAgICB2YXIgZnVsbFllYXIgPSAnJztcclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gZWxlbWVudC5zdGF0ZS5hY3Rpdml0aWVzLm1hcCgoZXZlbnQsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYoZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKGV2ZW50LmRhdGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IGVsZW1lbnQuc3RhdGUud2Vla0RheXNbZC5nZXREYXkoKV1cclxuICAgICAgICAgICAgICAgIHZhciBkYXlOciA9IGQuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB2YXIgbW9udGggPSBlbGVtZW50LnN0YXRlLm1vbnRoc1tkLmdldE1vbnRoKCldXHJcbiAgICAgICAgICAgICAgICB2YXIgeWVhciAgPSBkLmdldEZ1bGxZZWFyKClcclxuICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGVsZW1lbnQuc3RhdGUuY29sb3JzW2QuZ2V0RGF5KCldXHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0WWVhciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHllYXIgIT0gZnVsbFllYXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFllYXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxZZWFyID0geWVhcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzZXRZZWFyID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLW1kLTEwXCI+PGgzIGNsYXNzTmFtZT1cInB1bGwtcmlnaHRcIj57eWVhcn08L2gzPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLW1kLTEwIGV2ZW50IGJvcmRlckJvdHRvbVwiPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00IGNvbC1zbS0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZUxhYmVsXCIgc3R5bGU9e3tiYWNrZ3JvdW5kOiBjb2xvcn19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+e2RheX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXlOclwiPntkYXlOcn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57bW9udGh9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04IGV2ZW50RGV0YWlsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxoND57ZXZlbnQubmFhbX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57ZXZlbnQudGltZV9mcm9tfXUgLSB7ZXZlbnQudGltZV90aWxsfXU8L3A+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e2VsZW1lbnQuc3RhdGUuZXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgyPkFnZW5kYTwvaDI+XHJcbiAgICAgICAgICAgICAgICB7ZXZlbnRzfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBZ2VuZGE7IiwiaW1wb3J0IEdvb2dsZUxvZ2luIGZyb20gJ3JlYWN0LWdvb2dsZS1sb2dpbic7XHJcblxyXG52YXIgQXV0aCA9IHJlcXVpcmUoJy4vYXV0aC5qcycpO1xyXG5cclxuY29uc3QgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcblxyXG5jb25zdCBsb2dpblN1Y2Nlc3MgPSAocmVzcG9uc2UpID0+IHtcclxuICB2YXIgdXNlcklkICAgPSByZXNwb25zZVsncHJvZmlsZU9iaiddWydnb29nbGVJZCddXHJcbiAgdmFyIHVzZXJOYW1lID0gcmVzcG9uc2VbJ3Byb2ZpbGVPYmonXVsnbmFtZSddXHJcbiAgdmFyIHVzZXJNYWlsID0gcmVzcG9uc2VbJ3Byb2ZpbGVPYmonXVsnZW1haWwnXVxyXG5cclxuXHJcbiAgUmVhY3RET00ucmVuZGVyKDxBdXRoIGlkPXt1c2VySWR9IG5hbWU9e3VzZXJOYW1lfSBtYWlsPXt1c2VyTWFpbH0gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSlcclxufVxyXG5cclxuY29uc3QgbG9naW5GYWlsdXJlID0gKHJlc3BvbnNlKSA9PiB7XHJcbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG59XHJcblxyXG5cclxuaWYodXNlcklkKXtcclxuXHJcbiAgUmVhY3RET00ucmVuZGVyKDxBdXRoIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG5cclxufWVsc2V7XHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJsb2dpblwiPlxyXG4gICAgICA8R29vZ2xlTG9naW5cclxuICAgICAgICAgIGNsaWVudElkPVwiNDg2NDkxMTU2Mjg5LTFrdnAybzgxbGk2NXVxNnZ2b245b2RuMDFjcnYzZnEyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCJcclxuICAgICAgICAgIGJ1dHRvblRleHQ9XCJMb2dpblwiXHJcbiAgICAgICAgICBwcm9tcHQ9XCJzZWxlY3RfYWNjb3VudFwiXHJcbiAgICAgICAgICBvblN1Y2Nlc3M9e2xvZ2luU3VjY2Vzc31cclxuICAgICAgICAgIG9uRmFpbHVyZT17bG9naW5GYWlsdXJlfSAvPlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnJhbmRcIj48aDE+YVN0ZW5kYTwvaDE+PC9kaXY+XHJcblxyXG4gICAgPC9kaXY+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcclxuICApOyAgXHJcblxyXG59XHJcblxyXG5cclxuICAgIC8qbGV0IHJlbmRlclJlYWN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHR5cGVvZiBnYXBpID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBnYXBpIHlldCcpO1xyXG4gICAgICAgICAgICBfLmRlYm91bmNlKHJlbmRlclJlYWN0LCA1MDApKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKDxMb2dpbiAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH07Ki9cclxuXHJcbi8vUmVhY3RET00ucmVuZGVyKDxMb2dpbiAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcclxuIiwidmFyIE5hdmJhciA9IHJlcXVpcmUoJy4vbmF2YmFyLmpzJyk7XHJcbnZhciBGYWlscGFnZSA9IHJlcXVpcmUoJy4vZmFpbHBhZ2UuanMnKTtcclxuXHJcblxyXG52YXIgQXV0aCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuKHtcclxuXHRcdFx0dXNlcklkOiB0aGlzLnByb3BzLmlkLFxyXG5cdFx0XHR1c2VyTmFtZTogdGhpcy5wcm9wcy5uYW1lLFxyXG5cdFx0XHR1c2VyTWFpbDogdGhpcy5wcm9wcy5tYWlsLFxyXG5cdFx0XHRmYWlsZWQ6IGZhbHNlLFxyXG5cdFx0XHRyb2xlOiBmYWxzZSxcclxuXHRcdH0pXHJcblx0fSxcclxuICAgIFxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XHJcbiAgICAgICAgaWYobmV4dFN0YXRlICE9IHRoaXMuc3RhdGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHR1c2VySWQ6IG5leHRQcm9wcy5pZCxcclxuXHRcdFx0dXNlck5hbWU6IG5leHRQcm9wcy5uYW1lLFxyXG5cdFx0XHR1c2VyTWFpbDogbmV4dFByb3BzLm1haWxcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5jaGVja1VzZXIoKTtcclxuXHR9LFxyXG5cclxuXHRjaGVja1VzZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XHJcblx0XHR2YXIgYWpheFVybCA9ICcuL2JhY2tlbmQvaW5kZXgucGhwJztcclxuXHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdCdjJyBcdDogJ3VzZXInLFxyXG5cdFx0XHQnYSdcdFx0OiAnYWN0aXZlVXNlcicsXHJcblx0XHRcdCdwYXJhbSdcdDoge1xyXG5cdFx0XHRcdCdpZCdcdDogdGhpcy5wcm9wcy5pZCxcclxuXHRcdFx0XHQnbWFpbCdcdDogdGhpcy5wcm9wcy5tYWlsLFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdCQucG9zdCh7dXJsOiBhamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHRcdFx0XHJcblxyXG5cdFx0XHRpZihkYXRhWydhY3RpdmUnXSl7XHJcblx0XHRcdFx0Ly9CZXN0YWFuZGUgZ2VicnVpa2VyXHJcblx0XHRcdFx0ZWxlbWVudC5zZXRTZXNzaW9uKGRhdGFbJ2FjdGl2ZSddWzBdWydyb2wnXSk7XHJcblx0XHRcdFx0ZWxlbWVudC5zZXRTdGF0ZSh7J3JvbGUnOiBkYXRhWydhY3RpdmUnXVswXVsncm9sJ119KTtcclxuXHRcdFx0fWVsc2UgaWYoZGF0YVsnbmV3J10pe1xyXG5cdFx0XHRcdC8vTmlldXdlIGdlYnJ1aWtlciBvcCBhYW52cmFhZyB2YW4gYmVoZWVyZGVyXHJcblx0XHRcdFx0ZWxlbWVudC5zZXROZXdVc2VyKCk7XHJcblx0XHRcdFx0ZWxlbWVudC5zZXRTZXNzaW9uKGRhdGFbJ25ldyddWzBdWydyb2wnXSk7XHJcblx0XHRcdFx0ZWxlbWVudC5zZXRTdGF0ZSh7J3JvbGUnOiBkYXRhWyduZXcnXVswXVsncm9sJ119KTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Ly9OaWV1d2UgZ2VicnVpa2VyIGRpZSBuaWV0IHdvcmQgdG9lZ2VsYXRlbiBvcCBkZSBhcHBcclxuXHRcdFx0XHRlbGVtZW50LnNldFN0YXRlKHsnZmFpbGVkJzogdHJ1ZX0pO1xyXG5cdFx0XHRcdC8vPEZhaWxwYWdlIC8+XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0sXHJcblxyXG5cdHNldE5ld1VzZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYWpheFVybCA9ICcuL2JhY2tlbmQvaW5kZXgucGhwJztcclxuXHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdCdjJyBcdDogJ3VzZXInLFxyXG5cdFx0XHQnYSdcdFx0OiAnc2V0TmV3VXNlcicsXHJcblx0XHRcdCdwYXJhbSdcdDoge1xyXG5cdFx0XHRcdCdpZCdcdDogdGhpcy5wcm9wcy5pZCxcclxuXHRcdFx0XHQnbmFtZSdcdDogdGhpcy5wcm9wcy5uYW1lLFxyXG5cdFx0XHRcdCdnbWFpbCcgOiB0aGlzLnByb3BzLm1haWwsXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKHBhcmFtKTtcclxuXHJcblx0XHQkLnBvc3Qoe3VybDogYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdFxyXG5cdH0sXHJcblxyXG5cdHNldFNlc3Npb246IGZ1bmN0aW9uKHJvbGUpe1x0XHRcclxuXHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlclJvbGUnLCByb2xlKTtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyR29vZ2xlSWQnLCB0aGlzLnN0YXRlLnVzZXJJZCk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHJcblxyXG5cdFx0Ly9jb25zdCBsb2dnZWRJbiA9IHRoaXMuc3RhdGUuYWN0aXZlO1xyXG5cdFx0Ly9jb25zdCBsb2dnZWRJbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcclxuXHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLmZhaWxlZCA/IChcclxuXHRcdFx0XHRcdFx0PEZhaWxwYWdlIC8+XHJcblx0XHRcdFx0XHQpIDogKFxyXG5cdFx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHRcdHt0aGlzLnN0YXRlLnJvbGUgPyAoXHJcblx0XHRcdFx0XHRcdFx0XHQ8TmF2YmFyIHJvbGU9e3RoaXMuc3RhdGUucm9sZX0gLz5cclxuXHRcdFx0XHRcdFx0XHQpIDogKFxyXG5cdFx0XHRcdFx0XHRcdFx0bnVsbFxyXG5cdFx0XHRcdFx0XHRcdCl9XHQgIFxyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQpfVxyXG5cdFx0XHRcdDwvZGl2Plx0XHJcblx0XHRcdFx0KVxyXG5cdFxyXG5cclxuXHJcblx0XHRcclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdXRoOyIsIi8vdmFyIEFnZW5kYSA9IHJlcXVpcmUoJy4vYWdlbmRhLmpzJyk7XHJcblxyXG52YXIgRmFpbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuKHtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDbGljazogZnVuY3Rpb24oKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlclJvbGUnLCAwKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlckdvb2dsZUlkJywgJycpO1xyXG5cclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBcImh0dHA6Ly9sb2NhbGhvc3QvYVN0ZW5kYS9cIjtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICAgICAgICAgICAgICBZb3UgYXJlIG5vdCBhbGxvd2VkIGluIHRoaXMgYXBwbGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2sgPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5oZXJlPC9hPiB0byBnbyBiYWNrIHRvIHRoZSBob21lIHBhZ2VcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmFpbDsiLCIvL3ZhciBBZ2VuZGEgPSByZXF1aXJlKCcuL2FnZW5kYS5qcycpO1xyXG5cclxudmFyIEhvbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybih7XHJcbiAgICAgICAgICAgIHJvbGUgOiAwLFxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm9sZTogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJSb2xlJyl9KVxyXG4gICAgfSxcclxuXHJcbiAgICBsb2dvdXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJSb2xlJywgMCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJHb29nbGVJZCcsICcnKTtcclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCJodHRwOi8vbG9jYWxob3N0L2FTdGVuZGEvXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvbGUgPSB0aGlzLnN0YXRlLnJvbGU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUgY29sLW1kLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGViYXItbmF2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZWJhci1uYXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZWJhci1icmFuZFwiPjxoMT5hU3RlbmRhPC9oMT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0XCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIi5zaWRlYmFyLW5hdmJhci1jb2xsYXBzZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPlRvZ2dsZSBuYXZpZ2F0aW9uPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uLWJhclwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28td3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImxvZ29cIiBzcmM9XCIuL2RhdGEvbG9nb3YyLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItY29sbGFwc2UgY29sbGFwc2Ugc2lkZWJhci1uYXZiYXItY29sbGFwc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXZiYXItbmF2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGUgPiA4MCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PFJlYWN0Um91dGVyLkxpbmsgdG89XCIvdXNlcnNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS11c2VyLWNpcmNsZS1vIGZhLWZ3XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBVc2VyczwvUmVhY3RSb3V0ZXIuTGluaz48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxSZWFjdFJvdXRlci5MaW5rIHRvPVwiL2FnZW5kYVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWNhbGVuZGFyIGZhLWZ3XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBBZ2VuZGE8L1JlYWN0Um91dGVyLkxpbms+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJkcm9wZG93blwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRhc2tzIGZhLWZ3XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBTY2hlZHVsZTxzcGFuIGNsYXNzTmFtZT1cImNhcmV0XCI+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PFJlYWN0Um91dGVyLkxpbmsgdG89XCIvc2NoZWR1bGVcIj5TY2hlZHVsZTwvUmVhY3RSb3V0ZXIuTGluaz48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGUgPiA4MCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxSZWFjdFJvdXRlci5MaW5rIHRvPVwiL3NjaGVkdWxlTWFrZXJcIj5NYWtlIHNjaGVkdWxlPC9SZWFjdFJvdXRlci5MaW5rPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlID4gODAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48UmVhY3RSb3V0ZXIuTGluayB0bz1cIi90ZW1wbGF0ZVwiPlRlbXBsYXRlPC9SZWFjdFJvdXRlci5MaW5rPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlID4gODAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48UmVhY3RSb3V0ZXIuTGluayB0bz1cIi90eXBlc1wiPlR5cGVzPC9SZWFjdFJvdXRlci5MaW5rPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxSZWFjdFJvdXRlci5MaW5rIHRvPVwiL3NraXBhZGF5XCI+U2tpcCBhIGRheTwvUmVhY3RSb3V0ZXIuTGluaz48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxvZ291dFwiIG9uQ2xpY2s9e2VsZW1lbnQubG9nb3V0fT48YT48aSBjbGFzc05hbWU9XCJmYSBmYS1zaWduLW91dCBmYS1md1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gTG9nb3V0PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQgY29sLW1kLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxufVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSG9tZTsiLCJ2YXIgSG9tZSA9IHJlcXVpcmUoJy4vaG9tZS5qcycpO1xyXG52YXIgQWdlbmRhID0gcmVxdWlyZSgnLi9hZ2VuZGEuanMnKTtcclxudmFyIFVzZXJzID0gcmVxdWlyZSgnLi91c2Vycy5qcycpO1xyXG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlLmpzJyk7XHJcbnZhciBUeXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMuanMnKTtcclxudmFyIFNjaGVkdWxlTWFrZXIgPSByZXF1aXJlKCcuL3NjaGVkdWxlTWFrZXIuanMnKTtcclxudmFyIFNjaGVkdWxlID0gcmVxdWlyZSgnLi9zY2hlZHVsZS5qcycpO1xyXG52YXIgU2tpcCA9IHJlcXVpcmUoJy4vc2tpcGFkYXkuanMnKTtcclxuXHJcbnZhciB7IFJvdXRlcixcclxuICBSb3V0ZSxcclxuICBJbmRleFJvdXRlLFxyXG4gIEluZGV4TGluayxcclxuICBoYXNoSGlzdG9yeSxcclxuICBMaW5rIH0gPSBSZWFjdFJvdXRlcjtcclxuXHJcbiAgdmFyIE5hdmJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHJldHVybih7XHJcbiAgICAgICAgICByb2xlOiAwXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcyl7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHJvbGU6IG5leHRQcm9wcy5yb2xlLFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUucm9sZSlcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFJvdXRlciBoaXN0b3J5PXtoYXNoSGlzdG9yeX0+XHJcbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWV9PlxyXG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0FnZW5kYX0vPiAvLyBEZWZhdWx0IHBhZ2VcclxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJ1c2Vyc1wiIGNvbXBvbmVudD17VXNlcnN9IC8+XHJcbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiYWdlbmRhXCIgY29tcG9uZW50PXtBZ2VuZGF9IC8+XHJcbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwic2NoZWR1bGVcIiBjb21wb25lbnQ9e1NjaGVkdWxlfSAvPlxyXG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cInNjaGVkdWxlTWFrZXJcIiBjb21wb25lbnQ9e1NjaGVkdWxlTWFrZXJ9IC8+XHJcbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwidGVtcGxhdGVcIiBjb21wb25lbnQ9e1RlbXBsYXRlfSAvPlxyXG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cInR5cGVzXCIgY29tcG9uZW50PXtUeXBlc30gLz5cclxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJza2lwYWRheVwiIGNvbXBvbmVudD17U2tpcH0gLz5cclxuICAgICAgICAgIDwvUm91dGU+XHJcbiAgICAgICAgPC9Sb3V0ZXI+XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBOYXZiYXI7XHJcblxyXG4vKlxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgPFJvdXRlciBoaXN0b3J5PXtoYXNoSGlzdG9yeX0+XHJcbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWV9PlxyXG4gXHQgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17QWdlbmRhfS8+IC8vIERlZmF1bHQgcGFnZVxyXG4gXHQgICAgPFJvdXRlIHBhdGg9XCJhZ2VuZGFcIiBjb21wb25lbnQ9e0FnZW5kYX0gLz5cclxuICAgICAgPFJvdXRlIHBhdGg9XCJzY2hlZHVsZVwiIGNvbXBvbmVudD17U2NoZWR1bGV9IC8+XHJcbiAgICA8L1JvdXRlPlxyXG4gIDwvUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsqLyIsInZhciBQb3B1cCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogJycsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpe1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBuZXh0UHJvcHMubWVzc2FnZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIC8vdmFyIG5hbWUgPSBlLnRhcmdldC5jbGFzc05hbWU7IFxyXG4gICAgICAgIHZhciBhY3Rpb24gPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhuYW1lKSAgIFxyXG5cclxuICAgICAgICAvL2lmKG5hbWUgPT0gJ2NvbmZpcm0tYmcnIHx8IHR5cGVvZiBhY3Rpb24gIT09ICd1bmRlZmluZWQnKXtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVDbGljayhhY3Rpb24pXHJcbiAgICAgICAgLy99XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25maXJtLWJnXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29uZmlybSBjb2wtbWQtMiBjb2wtbWQtb2Zmc2V0LTVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBtZXNzYWdlXCI+e3RoaXMucHJvcHMubWVzc2FnZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJZZXNcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiTm9cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3B1cDsiLCJ2YXIgUmVxdWVzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuKHtcclxuICAgICAgICAgICAgYWpheFVybDogJy4vYmFja2VuZC9pbmRleC5waHAnLFxyXG4gICAgICAgICAgICB1c2VyX2lkOiAwLFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyX2lkOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckdvb2dsZUlkJyl9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRvUmVxdWVzdDogZnVuY3Rpb24oZGF0ZUZyb20sIGRhdGVUaWxsLCB0aW1lRnJvbSwgdGltZVRpbGwsIHJlYXNvbil7XHJcblxyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICdjJyAgICAgOiAncmVxdWVzdCcsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAncmVxdWVzdFNraXAnLFxyXG4gICAgICAgICAgICAncGFyYW0nIDoge1xyXG4gICAgICAgICAgICAgICAgJ2RhdGVGcm9tJyA6IGRhdGVGcm9tLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGVUaWxsJyA6IGRhdGVUaWxsLFxyXG4gICAgICAgICAgICAgICAgJ3RpbWVGcm9tJyA6IHRpbWVGcm9tLFxyXG4gICAgICAgICAgICAgICAgJ3RpbWVUaWxsJyA6IHRpbWVUaWxsLFxyXG4gICAgICAgICAgICAgICAgJ3JlYXNvbicgICA6IHJlYXNvbixcclxuICAgICAgICAgICAgICAgICd1c2VyX2lkJyAgOiBlbGVtZW50LnN0YXRlLnVzZXJfaWQsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICAkLnBvc3Qoe3VybDogZWxlbWVudC5zdGF0ZS5hamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucHJvcHMucmVyZW5kZXIoKTtcclxuICAgICAgICB9KSBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBkYXRlRnJvbSA9IGVsZW1lbnQucmVmcy5yZXF1ZXN0RnJvbURhdGUudmFsdWU7XHJcbiAgICAgICAgdmFyIHRpbWVGcm9tID0gZWxlbWVudC5yZWZzLnJlcXVlc3RGcm9tVGltZS52YWx1ZTtcclxuICAgICAgICB2YXIgZGF0ZVRpbGwgPSBlbGVtZW50LnJlZnMucmVxdWVzdFRpbGxEYXRlLnZhbHVlO1xyXG4gICAgICAgIHZhciB0aW1lVGlsbCA9IGVsZW1lbnQucmVmcy5yZXF1ZXN0VGlsbFRpbWUudmFsdWU7XHJcbiAgICAgICAgdmFyIHJlYXNvbiAgID0gZWxlbWVudC5yZWZzLnJlcXVlc3RSZWFzb24udmFsdWU7XHJcblxyXG4gICAgICAgIGlmKGRhdGVGcm9tID09ICcnIHx8IGRhdGVUaWxsID09ICcnIHx8IHJlYXNvbiA9PSAnJyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZWxlbWVudC5kb1JlcXVlc3QoZGF0ZUZyb20sIGRhdGVUaWxsLCB0aW1lRnJvbSwgdGltZVRpbGwsIHJlYXNvbik7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LnJlZnMucmVxdWVzdEZyb21EYXRlLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVmcy5yZXF1ZXN0RnJvbVRpbWUudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgZWxlbWVudC5yZWZzLnJlcXVlc3RUaWxsRGF0ZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZnMucmVxdWVzdFRpbGxUaW1lLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVmcy5yZXF1ZXN0UmVhc29uLnZhbHVlICAgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0ZpZWxkczogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQuaWQ7XHJcblxyXG4gICAgICAgIGlmKHRhcmdldCA9PSAnZGF0ZUZyb20nKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVUaWxsJykuc2V0QXR0cmlidXRlKCdtaW4nLCBlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlRnJvbScpLnNldEF0dHJpYnV0ZSgnbWF4JywgZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnVzZXJfaWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlJlcXVlc3QgYSBkYXkgb2ZmITwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+RnJvbTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJkYXRlRnJvbVwiIHR5cGU9XCJkYXRlXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHJlcXVlc3REYXRlXCIgcmVmPVwicmVxdWVzdEZyb21EYXRlXCIgb25DaGFuZ2U9e2VsZW1lbnQuY2hlY2tGaWVsZHN9IC8+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGltZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCByZXF1ZXN0VGltZVwiIHJlZj1cInJlcXVlc3RGcm9tVGltZVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlRpbGw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZGF0ZVRpbGxcIiB0eXBlPVwiZGF0ZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCByZXF1ZXN0RGF0ZVwiIHJlZj1cInJlcXVlc3RUaWxsRGF0ZVwiIG9uQ2hhbmdlPXtlbGVtZW50LmNoZWNrRmllbGRzfSAvPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRpbWVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcmVxdWVzdFRpbWVcIiByZWY9XCJyZXF1ZXN0VGlsbFRpbWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5SZWFzb248L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPVwicmVxdWVzdFJlYXNvblwiIC8+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYnRuIHB1bGwtcmlnaHRcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJSZXF1ZXN0XCIgb25DbGljaz17ZWxlbWVudC5oYW5kbGVTdWJtaXR9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgPC9kaXY+ICBcclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdDsiLCIvL3ZhciBBZ2VuZGEgPSByZXF1aXJlKCcuL2FnZW5kYS5qcycpO1xyXG5cclxudmFyIFJlcXVlc3RzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4oe1xyXG4gICAgICAgICAgICBhamF4VXJsOiAnLi9iYWNrZW5kL2luZGV4LnBocCcsXHJcbiAgICAgICAgICAgIHBlbmRpbmc6IFtdLFxyXG4gICAgICAgICAgICBhcHByb3ZlZDogW10sXHJcbiAgICAgICAgICAgIHJlcmVuZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlcl9pZDogMCxcclxuICAgICAgICAgICAgcm9sZTogMCxcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpe1xyXG4gICAgICAgIHRoaXMubG9hZFJlcXVlc3RzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdXNlcl9pZDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJHb29nbGVJZCcpLFxyXG4gICAgICAgICAgICByb2xlOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclJvbGUnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMubG9hZFJlcXVlc3RzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRSZXF1ZXN0czogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICdyZXF1ZXN0JyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdhbGxSZXF1ZXN0cycsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgICAgICAncm9sZScgICAgOiBlbGVtZW50LnN0YXRlLnJvbGUsXHJcbiAgICAgICAgICAgICAgICAndXNlcl9pZCcgOiBlbGVtZW50LnN0YXRlLnVzZXJfaWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtwZW5kaW5nOiBkYXRhWydwZW5kaW5nJ10sIGFwcHJvdmVkOiBkYXRhWydhcHByb3ZlZCddfSk7XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYXBwcm92ZVJlcXVlc3Q6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZXF1ZXN0Jyk7XHJcbiAgICAgICAgdmFyIHVzZXIgICAgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlcicpO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICdjJyAgICAgOiAncmVxdWVzdCcsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAnYXBwcm92ZVJlcXVlc3QnLFxyXG4gICAgICAgICAgICAncGFyYW0nIDoge1xyXG4gICAgICAgICAgICAgICAgJ3JlcXVlc3QnIDogcmVxdWVzdCxcclxuICAgICAgICAgICAgICAgICd1c2VyJyAgICA6IHVzZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBlbGVtZW50LmxvYWRSZXF1ZXN0cygpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkZWNsaW5lUmVxdWVzdDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciByZXF1ZXN0ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlcXVlc3QnKTtcclxuICAgICAgICB2YXIgdXNlciAgICA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS11c2VyJyk7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICdyZXF1ZXN0JyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdkZWNsaW5lUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgICAgICAncmVxdWVzdCcgOiByZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgJ3VzZXInICAgIDogdXNlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLnBvc3Qoe3VybDogZWxlbWVudC5zdGF0ZS5hamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQubG9hZFJlcXVlc3RzKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgY29uc3QgcGVuZGluZyA9IHRoaXMuc3RhdGUucGVuZGluZy5tYXAoKHJlcXVlc3QsIGkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlVGltZUZyb20gPSByZXF1ZXN0LnRpbWVfZnJvbS5zcGxpdChcIiBcIik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhRGF0ZUZyb20gICAgPSBkYXRlVGltZUZyb21bMF0uc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZUZyb20gICAgID0gYURhdGVGcm9tWzJdICsgJy0nICsgYURhdGVGcm9tWzFdICsgJy0nICsgYURhdGVGcm9tWzBdO1xyXG4gICAgICAgICAgICB2YXIgYVRpbWVGcm9tICAgID0gZGF0ZVRpbWVGcm9tWzFdLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgdmFyIHRpbWVGcm9tICAgICA9IGFUaW1lRnJvbVswXSArICc6JyArIGFUaW1lRnJvbVsxXTtcclxuICAgICAgICAgICAgdmFyIGRhdGV0aW1lZnJvbSA9IGRhdGVGcm9tICsgJyAnICsgdGltZUZyb207XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZVRpbWVUaWxsID0gcmVxdWVzdC50aW1lX3RpbGwuc3BsaXQoXCIgXCIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYURhdGVUaWxsICAgID0gZGF0ZVRpbWVUaWxsWzBdLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgdmFyIGRhdGVUaWxsICAgICA9IGFEYXRlVGlsbFsyXSArICctJyArIGFEYXRlVGlsbFsxXSArICctJyArIGFEYXRlVGlsbFswXTtcclxuICAgICAgICAgICAgdmFyIGFUaW1lVGlsbCAgICA9IGRhdGVUaW1lVGlsbFsxXS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIHZhciB0aW1lVGlsbCAgICAgPSBhVGltZVRpbGxbMF0gKyAnOicgKyBhVGltZVRpbGxbMV07XHJcbiAgICAgICAgICAgIHZhciBkYXRldGltZXRpbGwgPSBkYXRlVGlsbCArICcgJyArIHRpbWVUaWxsO1xyXG5cclxuICAgICAgICAgICAgaWYocmVxdWVzdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTNcIj57cmVxdWVzdC5uYWFtfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj57ZGF0ZXRpbWVmcm9tfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj57ZGF0ZXRpbWV0aWxsfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ICAgZWxlbWVudC5zdGF0ZS5yb2xlID4gODAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hlY2sgYXBwcm92ZVwiIGRhdGEtcmVxdWVzdD17cmVxdWVzdC5yZXFfaWR9IGRhdGEtdXNlcj17cmVxdWVzdC51c3JfaWR9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIG9uQ2xpY2s9e2VsZW1lbnQuYXBwcm92ZVJlcXVlc3R9PjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzIGRlbGV0ZVwiIGRhdGEtcmVxdWVzdD17cmVxdWVzdC5yZXFfaWR9IGRhdGEtdXNlcj17cmVxdWVzdC51c3JfaWR9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIG9uQ2xpY2s9e2VsZW1lbnQuZGVjbGluZVJlcXVlc3R9PjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPntyZXF1ZXN0LnJlYXNvbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPk5vIHJlcXVlc3RzITwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBhcHByb3ZlZCA9IHRoaXMuc3RhdGUuYXBwcm92ZWQubWFwKChyZXF1ZXN0LCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlcXVlc3Qpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0zXCI+e3JlcXVlc3QubmFhbX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00XCI+e3JlcXVlc3QudGltZV9mcm9tfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj57cmVxdWVzdC50aW1lX3RpbGx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGVjayBhcHByb3ZlZFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPntyZXF1ZXN0LnJlYXNvbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPk5vIHJlcXVlc3RzITwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+UGVuZGluZyByZXF1ZXN0czwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPntwZW5kaW5nfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPkFwcHJvdmVkIHJlcXVlc3RzPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+e2FwcHJvdmVkfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbn1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RzOyIsInZhciBQb3B1cCA9IHJlcXVpcmUoJy4vcG9wdXAuanMnKTtcclxuXHJcbnZhciBTY2hlZHVsZU1ha2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4oe1xyXG4gICAgICAgICAgICB3ZWVrRGF5czogWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JywgJ1N1bmRheSddLFxyXG4gICAgICAgICAgICBkYXlzOiBbXSxcclxuICAgICAgICAgICAgd2Vla3M6IFtdLFxyXG4gICAgICAgICAgICBkYXlzSW5XZWVrOiA3LFxyXG4gICAgICAgICAgICBhamF4VXJsOiAnLi9iYWNrZW5kL2luZGV4LnBocCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBbXSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnJyxcclxuICAgICAgICAgICAgdXNlcnM6IFtdLFxyXG4gICAgICAgICAgICBzY2hlZHVsZTogW10sXHJcbiAgICAgICAgICAgIHR5cGVzOiBbXSxcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICBlbGVtZW50LmxvYWRUZW1wbGF0ZSgpO1xyXG4gICAgICAgIGVsZW1lbnQubG9hZFVzZXJzKCk7XHJcbiAgICAgICAgZWxlbWVudC5sb2FkU2NoZWR1bGUoKTtcclxuICAgICAgICBlbGVtZW50LmxvYWRXZWVrcygpO1xyXG4gICAgICAgIGVsZW1lbnQubG9hZFR5cGVzKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkV2Vla3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICdjJyAgICAgOiAnc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICAnYScgICAgIDogJ2xvYWRXZWVrcycsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7d2Vla3M6IGRhdGF9KTtcclxuICAgICAgICB9KSBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRUZW1wbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICd0ZW1wbGF0ZScsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAnbG9hZFRlbXBsYXRlJyxcclxuICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHt0ZW1wbGF0ZTogZGF0YX0pO1xyXG4gICAgICAgIH0pIFxyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkVXNlcnM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICdjJyAgICAgOiAndXNlcicsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAnYWxsVXNlcnMnLFxyXG4gICAgICAgICAgICAncGFyYW0nIDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLnBvc3Qoe3VybDogZWxlbWVudC5zdGF0ZS5hamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHt1c2VyczogZGF0YVsndXNlcnMnXX0pXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRTY2hlZHVsZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICdzY2hlZHVsZScsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAnZ2V0U2NoZWR1bGUnLFxyXG4gICAgICAgICAgICAncGFyYW0nIDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLnBvc3Qoe3VybDogZWxlbWVudC5zdGF0ZS5hamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtzY2hlZHVsZTogZGF0YX0pXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRUeXBlczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICd0eXBlJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdnZXRBbGxUeXBlcycsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7dHlwZXM6IGRhdGF9KTtcclxuICAgICAgICB9KSBcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Rmlyc3REYXlPZldlZWs6IGZ1bmN0aW9uKHcsIHkpIHtcclxuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSh5LCAwLCAxICsgKHcgLSAxKSAqIDcpO1xyXG4gICAgICAgIHZhciBkYXlPZldlZWtTdGFydGluZ1N1bmRheVplcm9JbmRleEJhc2VkID0gdG9kYXkuZ2V0RGF5KCk7IC8vIDAgOiBTdW5kYXkgLDEgOiBNb25kYXksMiwzLDQsNSw2IDogU2F0dXJkYXlcclxuICAgICAgICB2YXIgbW9uZGF5T2ZXZWVrID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpIC0gdG9kYXkuZ2V0RGF5KCkrMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtb25kYXlPZldlZWs7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVdlZWtDbGljazogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZXMgPSBlLnRhcmdldC52YWx1ZS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgdmFyIHdlZWsgPSB2YWx1ZXNbMF07XHJcbiAgICAgICAgdmFyIHllYXIgPSB2YWx1ZXNbMV07XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB2YXIgc3RhcnREYXRlID0gZWxlbWVudC5nZXRGaXJzdERheU9mV2Vlayh3ZWVrLCB5ZWFyKTtcclxuXHJcbiAgICAgICAgdmFyIHRoaXNXZWVrID0gW107XHJcbiAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7ZGF5czogW119KTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpPTAgOyBpPGVsZW1lbnQuc3RhdGUuZGF5c0luV2VlayA7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBuZXcgRGF0ZShzdGFydERhdGUpO1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IGRheS5zZXREYXRlKGRheS5nZXREYXRlKCkgK2kpO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKG5leHQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGRkID0gZGF0ZU9iamVjdC5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBtbSA9IGRhdGVPYmplY3QuZ2V0TW9udGgoKSArMTtcclxuICAgICAgICAgICAgdmFyIFkgID0gZGF0ZU9iamVjdC5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBkZCArICctJyArIG1tICsgJy0nICsgWTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXNXZWVrLnB1c2goZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtkYXlzOiB0aGlzV2Vla30pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gZWxlbWVudC5zdGF0ZS50ZW1wbGF0ZTtcclxuICAgICAgICB2YXIgc2NoZWR1bGUgPSBlbGVtZW50LnN0YXRlLnNjaGVkdWxlO1xyXG5cclxuICAgICAgICBjb25zdCBsZWdlbmRhID0gZWxlbWVudC5zdGF0ZS50eXBlcy5tYXAoKHQsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYodCl7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZGFcIiBzdHlsZT17e2JhY2tncm91bmQ6IHQuY29sb3J9fT57dC5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCB3ZWVrQnV0dG9ucyA9IGVsZW1lbnQuc3RhdGUud2Vla3MubWFwKCh3LCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHcpe1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHcud2VlayArICd8JyArIHcueWVhcjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdmFsdWU9e3ZhbHVlfSBvbkNsaWNrPXtlbGVtZW50LmhhbmRsZVdlZWtDbGlja30+e3cud2Vla308L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCB3ZWVrID0gZWxlbWVudC5zdGF0ZS5kYXlzLm1hcCgoZGF5LCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF5KXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsRGF5ID0gZWxlbWVudC5zdGF0ZS53ZWVrRGF5c1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRlbXBsYXRlW2Z1bGxEYXldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lcyA9IHRlbXBsYXRlW2Z1bGxEYXldLm1hcCgodmFsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSB2YWwuc3BsaXQoJ3wnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHRpbWVbMF0gKyBkYXkgKyB0aW1lWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbXBsb3llZSA9IHNjaGVkdWxlW2tleV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZW9mIGVtcGxveWVlICE9ICd1bmRlZmluZWQnID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1wbG95bWVudCBib3JkZXJBbGxcIiBkYXRhLXVuaXF1ZT17dGltZVsyXX0gZGF0YS10aW1lPXt0aW1lWzBdfSBkYXRhLWRhdGU9e2RheX0gc3R5bGU9e3tiYWNrZ3JvdW5kOiB0aW1lWzFdfX0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGltZVswXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbXBsb3llZVwiPntlbXBsb3llZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGVCb2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImJvcmRlckJvdHRvbSBkYXRlRGF5XCI+e2RheX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVsbERheVwiPntmdWxsRGF5fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyQWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGltZXMgPyB0aW1lcyA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlcnJvck1lc3NhZ2VcIj57ZWxlbWVudC5zdGF0ZS5lcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aDI+U2NoZWR1bGU8L2gyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC01IGNvbC1tZC1vZmZzZXQtNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPntsZWdlbmRhfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTUgY29sLXNtLTVcIj5XZWVrcyBcclxuICAgICAgICAgICAgICAgICAgICAgICAge3dlZWtCdXR0b25zfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7d2Vla31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gIFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgXHJcbiAgICAgICAgICAgIClcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVkdWxlTWFrZXI7IiwidmFyIFBvcHVwID0gcmVxdWlyZSgnLi9wb3B1cC5qcycpO1xyXG5cclxudmFyIFNjaGVkdWxlTWFrZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybih7XHJcbiAgICAgICAgICAgIHdlZWtEYXlzOiBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J10sXHJcbiAgICAgICAgICAgIGRheXM6IFtdLFxyXG4gICAgICAgICAgICB5ZWFyQ291bnQ6IDEwLFxyXG4gICAgICAgICAgICB3ZWVrczogW10sXHJcbiAgICAgICAgICAgIHllYXJzOiBbXSxcclxuICAgICAgICAgICAgZGF5c0luV2VlazogNyxcclxuICAgICAgICAgICAgYWpheFVybDogJy4vYmFja2VuZC9pbmRleC5waHAnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogW10sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJycsXHJcbiAgICAgICAgICAgIHVzZXJzOiBbXSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyOiAnJyxcclxuICAgICAgICAgICAgdGVtcFNjaGVkdWxlOiBbXSxcclxuICAgICAgICAgICAgcGFyYW06IFtdLFxyXG4gICAgICAgICAgICBhY3RpdmVXZWVrOiAwLFxyXG4gICAgICAgICAgICBhY3RpdmVZZWFyOiAwLFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGVsZW1lbnQubG9hZFRlbXBsYXRlKCk7XHJcbiAgICAgICAgZWxlbWVudC5sb2FkVXNlcnMoKTtcclxuICAgICAgICBlbGVtZW50LmxvYWRUZW1wU2NoZWR1bGUoKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpPTEgOyBpPDUzIDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgd2VlayBuciBub2cgbmlldCB2b29ya29tdCBpbiByb29zdGVycyBkaWUga2xhYXIgemlqbiBkYW4gIHx8IEJpaiBoZXQgc2VsZWN0ZXJlbiBvZiBlciBhbCBlZW4gcm9vc3RlciBiZXN0YWF0XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3RhdGUud2Vla3MucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpPTAgOyBpPD1lbGVtZW50LnN0YXRlLnllYXJDb3VudCA7IGkrKyl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3RhdGUueWVhcnMucHVzaCh5ZWFyK2kpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbG9hZFRlbXBsYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAnYycgICAgIDogJ3RlbXBsYXRlJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdsb2FkVGVtcGxhdGUnLFxyXG4gICAgICAgICAgICAncGFyYW0nIDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLnBvc3Qoe3VybDogZWxlbWVudC5zdGF0ZS5hamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe3RlbXBsYXRlOiBkYXRhfSk7XHJcbiAgICAgICAgfSkgXHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRVc2VyczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICd1c2VyJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdhbGxVc2VycycsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe3VzZXJzOiBkYXRhWyd1c2VycyddfSlcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgbG9hZFRlbXBTY2hlZHVsZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICdzY2hlZHVsZScsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAnZ2V0VGVtcFNjaGVkdWxlJyxcclxuICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7dGVtcFNjaGVkdWxlOiBkYXRhfSlcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q3VycmVudFdlZWtBbmRZZWFyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciBvbmVKYW4gPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XHJcbiAgICAgICAgdmFyIHdlZWsgPSBNYXRoLmNlaWwoICgoKG5vdyAtIG9uZUphbikgLyA4NjQwMDAwMCkgKyBvbmVKYW4uZ2V0RGF5KCkgKyAxKSAvIDcgKTtcclxuICAgICAgICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICB2YXIgd2Vla1llYXIgPSBbXTtcclxuXHJcbiAgICAgICAgd2Vla1llYXIucHVzaCh3ZWVrLCB5ZWFyKVxyXG5cclxuICAgICAgICByZXR1cm4gd2Vla1llYXI7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpcnN0RGF5T2ZXZWVrOiBmdW5jdGlvbih3LCB5KSB7XHJcbiAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoeSwgMCwgMSArICh3IC0gMSkgKiA3KTtcclxuICAgICAgICB2YXIgZGF5T2ZXZWVrU3RhcnRpbmdTdW5kYXlaZXJvSW5kZXhCYXNlZCA9IHRvZGF5LmdldERheSgpOyAvLyAwIDogU3VuZGF5ICwxIDogTW9uZGF5LDIsMyw0LDUsNiA6IFNhdHVyZGF5XHJcbiAgICAgICAgdmFyIG1vbmRheU9mV2VlayA9IG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCksIHRvZGF5LmdldERhdGUoKSAtIHRvZGF5LmdldERheSgpKzEpO1xyXG5cclxuICAgICAgICByZXR1cm4gbW9uZGF5T2ZXZWVrO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgd2VlayA9IChlbGVtZW50LnJlZnMud2Vlay52YWx1ZSk7XHJcbiAgICAgICAgdmFyIHllYXIgPSBlbGVtZW50LnJlZnMueWVhci52YWx1ZTtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBlbGVtZW50LmdldEN1cnJlbnRXZWVrQW5kWWVhcigpO1xyXG5cclxuICAgICAgICBpZigod2VlayA8IGN1cnJlbnRbMF0gJiYgeWVhciA9PSBjdXJyZW50WzFdKSB8fCB5ZWFyIDwgY3VycmVudFsxXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTogJ1RoaXMgd2VlayBpcyBpbiB0aGUgcGFzdCd9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOiAnJywgYWN0aXZlV2Vlazogd2VlaywgYWN0aXZlWWVhcjogeWVhcn0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IGVsZW1lbnQuZ2V0Rmlyc3REYXlPZldlZWsod2VlaywgeWVhcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhpc1dlZWsgPSBbXTtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7ZGF5czogW119KTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wIDsgaTxlbGVtZW50LnN0YXRlLmRheXNJbldlZWsgOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IG5ldyBEYXRlKHN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGRheS5zZXREYXRlKGRheS5nZXREYXRlKCkgK2kpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGVPYmplY3QgPSBuZXcgRGF0ZShuZXh0KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGRkID0gZGF0ZU9iamVjdC5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW0gPSBkYXRlT2JqZWN0LmdldE1vbnRoKCkgKzE7XHJcbiAgICAgICAgICAgICAgICB2YXIgWSAgPSBkYXRlT2JqZWN0LmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBkZCArICctJyArIG1tICsgJy0nICsgWTtcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXNXZWVrLnB1c2goZGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe2RheXM6IHRoaXNXZWVrfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVVc2VyQ2xpY2s6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlcicpO1xyXG5cclxuICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtzZWxlY3RlZFVzZXI6IHNlbGVjdGVkfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFVzZXJUb0VtcGxveW1lbnQ6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgdGltZXMgICA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lJyk7XHJcbiAgICAgICAgdmFyIGRhdGUgICAgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGF0ZScpO1xyXG4gICAgICAgIHZhciB1bmlxdWUgID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXVuaXF1ZScpO1xyXG4gICAgICAgIHZhciB1c2VyX2lkID0gZWxlbWVudC5zdGF0ZS5zZWxlY3RlZFVzZXI7XHJcblxyXG5cclxuICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6ICcnfSk7XHJcblxyXG4gICAgICAgIGlmKHVzZXJfaWQgPT0gJycpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAnYycgICAgIDogJ3NjaGVkdWxlJyxcclxuICAgICAgICAgICAgICAgICdhJyAgICAgOiAnc2V0VGVtcEVtcGxveW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAndGltZXMnICA6IHRpbWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICdkYXRlJyAgIDogZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAndXNlcl9pZCc6IHVzZXJfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3VuaXF1ZScgOiB1bmlxdWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6ICdZb3UgYXBwcm92ZWQgYSBkYXkgb2ZmIHJlcXVlc3Qgb24gdGhpcyBkYXRlIGZvciB0aGlzIHVzZXIhJ30pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5sb2FkVGVtcFNjaGVkdWxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtzZWxlY3RlZFVzZXI6ICcnfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYoZWxlbWVudC5zdGF0ZS5kYXlzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93Q29uZmlybTogdHJ1ZX0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRTY2hlZHVsZTogZnVuY3Rpb24oYWN0aW9uPWZhbHNlKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmKGFjdGlvbiA9PSBcIlllc1wiKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICdjJyAgICAgOiAnc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICAgICAgJ2EnICAgICA6ICdzZW5kU2NoZWR1bGUnLFxyXG4gICAgICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAnZmlyc3QnICAgOiBlbGVtZW50LnN0YXRlLmRheXNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xhc3QnICAgIDogZWxlbWVudC5zdGF0ZS5kYXlzWzZdLFxyXG4gICAgICAgICAgICAgICAgICAgICd3ZWVrJyAgICA6IGVsZW1lbnQuc3RhdGUuYWN0aXZlV2VlayxcclxuICAgICAgICAgICAgICAgICAgICAneWVhcicgICAgOiBlbGVtZW50LnN0YXRlLmFjdGl2ZVllYXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7c2hvd0NvbmZpcm06IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6ICdTY2hlZHVsZSBzZW50ISd9KTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe3Nob3dDb25maXJtOiBmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGVsZW1lbnQuc3RhdGUudGVtcGxhdGU7XHJcbiAgICAgICAgdmFyIHRlbXBTY2hlZHVsZSA9IGVsZW1lbnQuc3RhdGUudGVtcFNjaGVkdWxlO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RXZWVrID0gZWxlbWVudC5zdGF0ZS53ZWVrcy5tYXAoKHcsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYodyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3d9Pnt3fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdFllYXIgPSBlbGVtZW50LnN0YXRlLnllYXJzLm1hcCgoeSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZih5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17eX0+e3l9PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3Qgd2VlayA9IGVsZW1lbnQuc3RhdGUuZGF5cy5tYXAoKGRheSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRheSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnVsbERheSA9IGVsZW1lbnQuc3RhdGUud2Vla0RheXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wbGF0ZVtmdWxsRGF5XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZXMgPSB0ZW1wbGF0ZVtmdWxsRGF5XS5tYXAoKHZhbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lID0gdmFsLnNwbGl0KCd8Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSB0aW1lWzBdICsgZGF5ICsgdGltZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW1wbG95ZWUgPSB0ZW1wU2NoZWR1bGVba2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVtcGxveW1lbnQgYm9yZGVyQWxsXCIgZGF0YS11bmlxdWU9e3RpbWVbMl19IGRhdGEtdGltZT17dGltZVswXX0gZGF0YS1kYXRlPXtkYXl9IHN0eWxlPXt7YmFja2dyb3VuZDogdGltZVsxXX19IG9uQ2xpY2s9e2VsZW1lbnQuc2V0VXNlclRvRW1wbG95bWVudH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGltZVswXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1wbG95ZWVcIiBkYXRhLXVuaXF1ZT17dGltZVsyXX0gZGF0YS10aW1lPXt0aW1lWzBdfSBkYXRhLWRhdGU9e2RheX0+e2VtcGxveWVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlb2YgZW1wbG95ZWUgIT0gJ3VuZGVmaW5lZCcgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hlY2sgZmEtZndcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGVCb2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImJvcmRlckJvdHRvbSBkYXRlRGF5XCI+e2RheX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVsbERheVwiPntmdWxsRGF5fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyQWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGltZXMgPyB0aW1lcyA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCB1c2VycyA9IGVsZW1lbnQuc3RhdGUudXNlcnMubWFwKCh1c2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHVzZXIpe1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzICA9IFwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC0yXCI7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzICs9IHVzZXIuaWQgPT0gZWxlbWVudC5zdGF0ZS5zZWxlY3RlZFVzZXIgPyBcIiBzZWxlY3RlZFVzZXJcIiA6IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtdXNlcj17dXNlci5pZH0gb25DbGljaz17ZWxlbWVudC5oYW5kbGVVc2VyQ2xpY2t9ID57dXNlci5uYWFtfTwvYT4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e2VsZW1lbnQuc3RhdGUuZXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgyPlNjaGVkdWxlIG1ha2VyPC9oMj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBjb2wtc20tNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiByZWY9XCJ3ZWVrXCI+e3NlbGVjdFdlZWt9PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj1cInllYXJcIj57c2VsZWN0WWVhcn08L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJidG5cIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJTZWxlY3RcIiBvbkNsaWNrPXtlbGVtZW50LmhhbmRsZVN1Ym1pdH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgY29sLXNtLTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJ0biBwdWxsLXJpZ2h0XCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiUHVibGlzaCFcIiBvbkNsaWNrPXtlbGVtZW50LnBvcHVwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7d2Vla31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gIFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBzY2hlZHVsZU1ha2VyVXNlcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtbWQtMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+PGRpdiBjbGFzc05hbWU9XCJyb3dcIj57dXNlcnN9PC9kaXY+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtlbGVtZW50LnN0YXRlLnNob3dDb25maXJtID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3B1cCBtZXNzYWdlPVwiUHVibGlzaCB0aGlzIHNjaGVkdWxlP1wiIGhhbmRsZUNsaWNrPXtlbGVtZW50LnNlbmRTY2hlZHVsZX0gLz5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+ICBcclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2NoZWR1bGVNYWtlcjsiLCJ2YXIgUmVxdWVzdHMgPSByZXF1aXJlKCcuL3JlcXVlc3RzLmpzJyk7XHJcbnZhciBSZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0LmpzJyk7XHJcblxyXG52YXIgU2tpcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuKHtcclxuICAgICAgICAgICAgcm9sZTogMCxcclxuICAgICAgICAgICAgcmVyZW5kZXI6ICdmYWxzZScsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3JvbGU6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyUm9sZScpfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmVyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVyZW5kZXI6ICd0cnVlJ30pXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgyPlNraXAgYSBkYXk8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSZXF1ZXN0IHJlcmVuZGVyPXt0aGlzLnJlcmVuZGVyfSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8UmVxdWVzdHMgcmVyZW5kZXI9e3RoaXMuc3RhdGUucmVyZW5kZXJ9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgXHJcbiAgICAgICAgICAgIClcclxufVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2tpcDsiLCJ2YXIgVGVtcGxhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4oe1xyXG4gICAgICAgICAgICB3ZWVrRGF5czogWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JywgJ1N1bmRheSddLFxyXG4gICAgICAgICAgICB0eXBlczogW10sXHJcbiAgICAgICAgICAgIGFqYXhVcmw6ICcuL2JhY2tlbmQvaW5kZXgucGhwJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IFtdXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRUZW1wbGF0ZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFR5cGVzKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkVGVtcGxhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICdjJyAgICAgOiAndGVtcGxhdGUnLFxyXG4gICAgICAgICAgICAnYScgICAgIDogJ2xvYWRUZW1wbGF0ZScsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7dGVtcGxhdGU6IGRhdGF9KTtcclxuICAgICAgICB9KSBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGxvYWRUeXBlczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICd0eXBlJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdnZXRBbGxUeXBlcycsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7dHlwZXM6IGRhdGF9KTtcclxuICAgICAgICB9KSBcclxuICAgIH0sXHJcblxyXG4gICAgYWRkRW1wbG95bWVudDogZnVuY3Rpb24oZGF5LCBmcm9tLCB0aWxsLCB0eXBlKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7ICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAnYycgICAgIDogJ3RlbXBsYXRlJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdhZGRFbXBsb3ltZW50JyxcclxuICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgICAgICdkYXknIDogZGF5LFxyXG4gICAgICAgICAgICAgICAgJ2Zyb20nOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgJ3RpbGwnOiB0aWxsLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiB0eXBlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZWxlbWVudC5sb2FkVGVtcGxhdGUoKTtcclxuICAgICAgICB9KSBcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVFbXBsb3ltZW50OiBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGRheSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1kYXknKTtcclxuICAgICAgICB2YXIgdGltZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAnYycgICAgIDogJ3RlbXBsYXRlJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdyZW1vdmVFbXBsb3ltZW50JyxcclxuICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgICAgICdkYXknIDogZGF5LFxyXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiB0aW1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIC8vY29uc29sZS5sb2cocGFyYW0pXHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZWxlbWVudC5sb2FkVGVtcGxhdGUoKTtcclxuICAgICAgICB9KSBcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgZGF5ICA9IGVsZW1lbnQucmVmcy5kYXkudmFsdWU7XHJcbiAgICAgICAgdmFyIHR5cGUgPSBlbGVtZW50LnJlZnMudHlwZS52YWx1ZTtcclxuICAgICAgICB2YXIgZnJvbSA9IGVsZW1lbnQucmVmcy5mcm9tLnZhbHVlO1xyXG4gICAgICAgIHZhciB0aWxsID0gZWxlbWVudC5yZWZzLnRpbGwudmFsdWU7XHJcblxyXG4gICAgICAgIGlmKGZyb20gPT0gJycgfHwgdGlsbCA9PSAnJyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFbXBsb3ltZW50KGRheSwgZnJvbSwgdGlsbCwgdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LnJlZnMuZnJvbS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZnMudGlsbC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGVsZW1lbnQuc3RhdGUudGVtcGxhdGU7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coZWxlbWVudC5zdGF0ZS50eXBlcylcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0RGF5ID0gZWxlbWVudC5zdGF0ZS53ZWVrRGF5cy5tYXAoKGRheSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihkYXkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtkYXl9PntkYXl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0VHlwZSA9IGVsZW1lbnQuc3RhdGUudHlwZXMubWFwKCh0eXBlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGNsYXNzTmFtZT1cInRlbXBsYXRlQ29sb3JPcHRpb25cIiB2YWx1ZT17dHlwZS5pZH0gc3R5bGU9e3tiYWNrZ3JvdW5kOiB0eXBlLmNvbG9yfX0+e3R5cGUubmFtZX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBkYXlzID0gZWxlbWVudC5zdGF0ZS53ZWVrRGF5cy5tYXAoKGRheSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRheSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wbGF0ZVtkYXldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lcyA9IHRlbXBsYXRlW2RheV0ubWFwKCh2YWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZSA9IHZhbC5zcGxpdCgnfCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbXBsb3ltZW50IGJvcmRlckFsbFwiIHN0eWxlPXt7YmFja2dyb3VuZDogdGltZVsxXX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpbWVbMF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lcyBkZWxldGUgcHVsbC1yaWdodFwiIGRhdGEtZGF5PXtkYXl9IGRhdGEtdGltZT17dGltZVswXX0gb25DbGljaz17ZWxlbWVudC5yZW1vdmVFbXBsb3ltZW50fSBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlQm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJib3JkZXJCb3R0b21cIj57ZGF5fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXJBbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aW1lcyA/IHRpbWVzIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPlRlbXBsYXRlPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImZvcm0taW5saW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPVwiZGF5XCI+e3NlbGVjdERheX08L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiByZWY9XCJ0eXBlXCI+e3NlbGVjdFR5cGV9PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGltZVwiIHJlZj1cImZyb21cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRpbWVcIiByZWY9XCJ0aWxsXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJ0blwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIkFkZFwiIG9uQ2xpY2s9e2VsZW1lbnQuaGFuZGxlU3VibWl0fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXlzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZTsiLCJ2YXIgVHlwZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybih7XHJcbiAgICAgICAgICAgIHR5cGVzOiBbXSxcclxuICAgICAgICAgICAgYWpheFVybDogJy4vYmFja2VuZC9pbmRleC5waHAnLFxyXG4gICAgICAgICAgICBjb2xvcnM6IFsnI2QyMDAwMCcsICcjMDA1MDlmJywgJyMwMDlmOWYnLCAnIzAwOWY1MCcsICcjOWY1MDAwJywgJyM5ZjAwOWYnLCAnIzlmOWYwMCcsICcjZjZmYWZkJ10sXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgZWxlbWVudC5sb2FkVHlwZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbG9hZFR5cGVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAnYycgICAgIDogJ3R5cGUnLFxyXG4gICAgICAgICAgICAnYScgICAgIDogJ2dldEFsbFR5cGVzJyxcclxuICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHt0eXBlczogZGF0YX0pO1xyXG4gICAgICAgIH0pIFxyXG4gICAgfSxcclxuXHJcbiAgICBjaG9vc2VDb2xvcjogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBpZCAgICA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgdmFyIGNvbG9yID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyk7XHJcbiAgICAgICAgdmFyIGVsZW0gPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy9lLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9ICdjb2xvcklucHV0Q2hvb3NlIG5vSG92ZXInO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICdjJyAgICAgOiAndHlwZScsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAndXBkYXRlQ29sb3InLFxyXG4gICAgICAgICAgICAncGFyYW0nIDoge1xyXG4gICAgICAgICAgICAgICAgJ2lkJyAgICA6IGlkLFxyXG4gICAgICAgICAgICAgICAgJ2NvbG9yJyA6IGNvbG9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZWxlbWVudC5sb2FkVHlwZXMoKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSAnY29sb3JJbnB1dENob29zZSc7XHJcbiAgICAgICAgfSkgXHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZU5hbWU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgdmFsID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdmFyIGlkICA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICdjJyAgICAgOiAndHlwZScsXHJcbiAgICAgICAgICAgICdhJyAgICAgOiAnY2hhbmdlTmFtZScsXHJcbiAgICAgICAgICAgICdwYXJhbScgOiB7XHJcbiAgICAgICAgICAgICAgICAnaWQnICAgIDogaWQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZScgIDogdmFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiBlbGVtZW50LnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHJcbiAgICAgICAgfSkgXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBuYW1lICA9IGVsZW1lbnQucmVmcy5uYW1lLnZhbHVlO1xyXG4gICAgICAgIHZhciBjb2xvciA9IGVsZW1lbnQucmVmcy5jb2xvci52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYobmFtZSA9PSAnJyB8fCBjb2xvciA9PSAnJyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICdjJyAgICAgOiAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnYScgICAgIDogJ2FkZFR5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZScgICA6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yJyAgOiBjb2xvclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkLnBvc3Qoe3VybDogZWxlbWVudC5zdGF0ZS5hamF4VXJsLCBkYXRhOiBwYXJhbSwgZGF0YVR5cGU6ICdqc29uJ30pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxvYWRUeXBlcygpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5yZWZzLm5hbWUudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgZWxlbWVudC5yZWZzLmNvbG9yLnZhbHVlID0gJyc7ICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlVHlwZTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBpZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgJ2MnICAgICA6ICd0eXBlJyxcclxuICAgICAgICAgICAgJ2EnICAgICA6ICdyZW1vdmVUeXBlJyxcclxuICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgICAgICdpZCcgICA6IGlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtKTtcclxuXHJcbiAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBlbGVtZW50LmxvYWRUeXBlcygpO1xyXG4gICAgICAgIH0pICAgICAgICBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdENvbG9yID0gZWxlbWVudC5zdGF0ZS5jb2xvcnMubWFwKChjb2xvciwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihjb2xvcil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17Y29sb3J9IHN0eWxlPXt7YmFja2dyb3VuZDogY29sb3J9fT48L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IGVsZW1lbnQuc3RhdGUuY29sb3JzLm1hcCgoY29sb3IsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYoY29sb3Ipe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvckNob29zZUNvbG9yXCIgZGF0YS12YWx1ZT17Y29sb3J9IHN0eWxlPXt7YmFja2dyb3VuZDogY29sb3J9fSBvbkNsaWNrPXtlbGVtZW50LmNob29zZUNvbG9yfT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGVzID0gZWxlbWVudC5zdGF0ZS50eXBlcy5tYXAoKHR5cGUsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYodHlwZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLThcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCB0eXBlSW5wdXRcIiB0eXBlPVwidGV4dFwiIG1heExlbmd0aD1cIjE2XCIgZGF0YS1pZD17dHlwZS5pZH0gZGVmYXVsdFZhbHVlPXt0eXBlLm5hbWV9IG9uQ2hhbmdlPXtlbGVtZW50LmNoYW5nZU5hbWV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0eXBlLmlkfSBjbGFzc05hbWU9XCJjb2xvcklucHV0XCIgc3R5bGU9e3tiYWNrZ3JvdW5kOiB0eXBlLmNvbG9yfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9ySW5wdXRDaG9vc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sb3JzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlLmlkID09IDEgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lcyBwdWxsLXJpZ2h0IGRlbGV0ZVwiIGRhdGEtaWQ9e3R5cGUuaWR9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIG9uQ2xpY2s9e2VsZW1lbnQucmVtb3ZlVHlwZX0+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgyPkVtcGxveW1lbnQgdHlwZXM8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+QWRkIHR5cGU8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIiByZWY9XCJuYW1lXCIgbWF4TGVuZ3RoPVwiMTZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPVwiY29sb3JcIj57c2VsZWN0Q29sb3J9PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJ0blwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIkFkZFwiIG9uQ2xpY2s9e2VsZW1lbnQuaGFuZGxlU3VibWl0fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+VHlwZXM8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj57dHlwZXN9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgIFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgXHJcbiAgICAgICAgICAgIClcclxufVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHlwZXM7IiwidmFyIFBvcHVwID0gcmVxdWlyZSgnLi9wb3B1cC5qcycpO1xyXG5cclxuXHJcbnZhciBVc2VycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybih7XHJcbiAgICAgICAgICAgIHVzZXJzOiBbXSxcclxuICAgICAgICAgICAgcGVuZGluZ1VzZXJzOiBbXSxcclxuICAgICAgICAgICAgc2VhcmNoVXNlcnM6IFtdLFxyXG4gICAgICAgICAgICBhamF4VXJsOiAnLi9iYWNrZW5kL2luZGV4LnBocCcsXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJycsXHJcbiAgICAgICAgICAgIHNob3dDb25maXJtOiBmYWxzZSxcclxuICAgICAgICAgICAgcGFyYW06IFtdLFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxvYWRVc2VycygpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xyXG4gICAgICAgIGlmKG5leHRTdGF0ZSAhPSB0aGlzLnN0YXRlIHx8IG5leHRQcm9wcyAhPSB0aGlzLnByb3BzKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbG9hZFVzZXJzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcclxuICAgICAgICB2YXIgYWpheFVybCA9ICcuL2JhY2tlbmQvaW5kZXgucGhwJztcclxuXHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAnYycgICAgIDogJ3VzZXInLFxyXG4gICAgICAgICAgICAnYScgICAgIDogJ2FsbFVzZXJzJyxcclxuICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5wb3N0KHt1cmw6IGFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe3VzZXJzOiBkYXRhWyd1c2VycyddLCBwZW5kaW5nVXNlcnM6IGRhdGFbJ3BlbmRpbmdfdXNlcnMnXX0pXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGludml0ZU5ld1VzZXI6IGZ1bmN0aW9uKGdtYWlsKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAnYycgICAgIDogJ3VzZXInLFxyXG4gICAgICAgICAgICAnYScgICAgIDogJ2ludml0ZU5ld1VzZXInLFxyXG4gICAgICAgICAgICAncGFyYW0nIDoge1xyXG4gICAgICAgICAgICAgICAgJ2dtYWlsJyA6IGdtYWlsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQucG9zdCh7dXJsOiB0aGlzLnN0YXRlLmFqYXhVcmwsIGRhdGE6IHBhcmFtLCBkYXRhVHlwZTogJ2pzb24nfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFVzZXJJbnB1dCcpLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6ICdVc2VyIGludml0ZWQhJ30pXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxvYWRVc2VycygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTogJ1VzZXIgYWxyZWFkeSBleGNpc3RzIG9yIGludml0ZWQhJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVVc2VyQ2xpY2s6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlUGVuZGluZ1VzZXJDbGljazogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVBZGRVc2VyQ2xpY2s6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWVcclxuXHJcblxyXG5cclxuICAgICAgICBpZih2YWx1ZSAhPSAnJyl7XHJcbiAgICAgICAgICAgIC8vQWRkIFVzZXJcclxuICAgICAgICAgICAgdmFyIHJlZ2V4ID0gL0BnbWFpbFxcLmNvbSQvXHJcbiAgICAgICAgICAgIGlmKHJlZ2V4LnRlc3QodmFsdWUpKXtcclxuICAgICAgICAgICAgICAgIC8vVmFsaWQgZ21haWwgYWRyZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52aXRlTmV3VXNlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy9HZWVuIGdtYWlsIGFkcmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6ICdFbWFpbCBpcyBub3QgYSB2YWxpZCBnbWFpbCBhY2NvdW50ISd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vR2VlbiB3YWFyZGUgaW5nZXZ1bGRcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOiAnVHlwIGluIGEgZ21haWwgYWNjb3VudCEnfSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHZhciB0YWJsZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWJsZScpO1xyXG4gICAgICAgIHZhciBpZCAgICA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICd0YWJsZScgOiB0YWJsZSxcclxuICAgICAgICAgICAgJ2lkJyAgICA6IGlkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcGFyYW06IFtwYXJhbV1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93Q29uZmlybTogdHJ1ZX0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlVXNlcjogZnVuY3Rpb24oYWN0aW9uKXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmKGFjdGlvbiA9PSBcIlllc1wiKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICdjJyAgICAgOiAndXNlcicsXHJcbiAgICAgICAgICAgICAgICAnYScgICAgIDogJ3JlbW92ZVVzZXInLFxyXG4gICAgICAgICAgICAgICAgJ3BhcmFtJyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAndGFibGUnIDogZWxlbWVudC5zdGF0ZS5wYXJhbVswXVsndGFibGUnXSxcclxuICAgICAgICAgICAgICAgICAgICAnaWQnICAgIDogZWxlbWVudC5zdGF0ZS5wYXJhbVswXVsnaWQnXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhcmFtKVxyXG5cclxuICAgICAgICAgICAgJC5wb3N0KHt1cmw6IGVsZW1lbnQuc3RhdGUuYWpheFVybCwgZGF0YTogcGFyYW0sIGRhdGFUeXBlOiAnanNvbid9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7c2hvd0NvbmZpcm06IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxvYWRVc2VycygpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRTdGF0ZSh7c2hvd0NvbmZpcm06IGZhbHNlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGVsZW1lbnQuc3RhdGUuc2hvd0NvbmZpcm0pO1xyXG4gICAgXHJcbiAgICAgICAgLy9hY3RpdmVVc2Vycygpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlVXNlcnMgPSB0aGlzLnN0YXRlLnVzZXJzLm1hcCgodXNlciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e2VsZW1lbnQuaGFuZGxlVXNlckNsaWNrfSA+e3VzZXIubmFhbX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHVzZXIucm9sID09IDEwMCA/IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzIHB1bGwtcmlnaHQgZGVsZXRlXCIgZGF0YS10YWJsZT1cInVzZXJzXCIgZGF0YS1pZD17dXNlci5pZH0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgb25DbGljaz17ZWxlbWVudC5wb3B1cH0+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZW5kaW5nVXNlcnMgPSB0aGlzLnN0YXRlLnBlbmRpbmdVc2Vycy5tYXAoKHBVc2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocFVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e2VsZW1lbnQuaGFuZGxlUGVuZGluZ1VzZXJDbGlja30gPntwVXNlci5nbWFpbH08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lcyBwdWxsLXJpZ2h0IGRlbGV0ZVwiIGRhdGEtdGFibGU9XCJwZW5kaW5nX3VzZXJzXCIgZGF0YS1pZD17cFVzZXIuaWR9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIG9uQ2xpY2s9e2VsZW1lbnQucG9wdXB9PjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvL307XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxoMj5Vc2VyczwvaDI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPkFkZCB1c2VyPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiYWRkVXNlcklucHV0XCIgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkFkZCB1c2VyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuXCIgb25DbGljaz17ZWxlbWVudC5oYW5kbGVBZGRVc2VyQ2xpY2t9ID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e2VsZW1lbnQuc3RhdGUuZXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5BY3RpdmUgdXNlcnM8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+e2FjdGl2ZVVzZXJzfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5QZW5kaW5nIHVzZXJzPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPntwZW5kaW5nVXNlcnN9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtlbGVtZW50LnN0YXRlLnNob3dDb25maXJtID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3B1cCBtZXNzYWdlPVwiQXJlIHlvdSBzdXJlP1wiIGhhbmRsZUNsaWNrPXtlbGVtZW50LnJlbW92ZVVzZXJ9IC8+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGxcclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzOyJdfQ==
