(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("playkit-js"));
	else if(typeof define === 'function' && define.amd)
		define(["playkit-js"], factory);
	else if(typeof exports === 'object')
		exports["PlaykitJsUi"] = factory(require("playkit-js"));
	else
		root["PlaykitJsUi"] = factory(root["Playkit"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_35__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function() {
    'use strict';
    function VNode() {}
    function h(nodeName, attributes) {
        var lastSimple, child, simple, i, children = EMPTY_CHILDREN;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
            if (child === !0 || child === !1) child = null;
            if (simple = 'function' != typeof nodeName) if (null == child) child = ''; else if ('number' == typeof child) child = String(child); else if ('string' != typeof child) simple = !1;
            if (simple && lastSimple) children[children.length - 1] += child; else if (children === EMPTY_CHILDREN) children = [ child ]; else children.push(child);
            lastSimple = simple;
        }
        var p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = null == attributes ? void 0 : attributes;
        p.key = null == attributes ? void 0 : attributes.key;
        if (void 0 !== options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        for (var i in props) obj[i] = props[i];
        return obj;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function enqueueRender(component) {
        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || setTimeout)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p.__d) renderComponent(p);
    }
    function isSameNodeType(node, vnode, hydrating) {
        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName); else return hydrating || node._componentConstructor === vnode.nodeName;
    }
    function isNamedNode(node, nodeName) {
        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    function getNodeProps(vnode) {
        var props = extend({}, vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (void 0 !== defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function createNode(nodeName, isSvg) {
        var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
        node.__n = nodeName;
        return node;
    }
    function removeNode(node) {
        if (node.parentNode) node.parentNode.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('key' === name) ; else if ('ref' === name) {
            if (old) old(null);
            if (value) value(node);
        } else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && IS_NON_DIMENSIONAL.test(i) === !1 ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);
            (node.__l || (node.__l = {}))[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name); else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this.__l[e.type](options.event && options.event(e) || e);
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        var out = dom, prevSvgMode = isSvgMode;
        if (null == vnode) vnode = '';
        if ('string' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, !0);
                }
            }
            out.__preactattr_ = !0;
            return out;
        }
        if ('function' == typeof vnode.nodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
        isSvgMode = 'svg' === vnode.nodeName ? !0 : 'foreignObject' === vnode.nodeName ? !1 : isSvgMode;
        if (!dom || !isNamedNode(dom, String(vnode.nodeName))) {
            out = createNode(String(vnode.nodeName), isSvgMode);
            if (dom) {
                while (dom.firstChild) out.appendChild(dom.firstChild);
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
            }
        }
        var fc = out.firstChild, props = out.__preactattr_ || (out.__preactattr_ = {}), vchildren = vnode.children;
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0;
        if (0 !== len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child.__preactattr_, key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
        }
        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && void 0 !== keyed[key]) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) if (child === originalChildren[i + 1]) removeNode(originalChildren[i]); else dom.insertBefore(child, originalChildren[i] || null);
        }
        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component); else {
            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
            if (unmountOnly === !1 || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
        }
    }
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }
    function createComponent(Ctor, props, context) {
        var inst, list = components[Ctor.name];
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.__b = list[i].__b;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component.__x) {
            component.__x = !0;
            if (component.__r = props.ref) delete props.ref;
            if (component.__k = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.__c) component.__c = component.context;
                component.context = context;
            }
            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__r) component.__r(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component.__x) {
            var rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.__p || props, previousState = component.__s || state, previousContext = component.__c || context, isUpdate = component.base, nextBase = component.__b, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = !1;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;
            if (!skip) {
                rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if ('function' == typeof childComponent) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1); else {
                        toUnmount = inst;
                        component._component = inst = createComponent(childComponent, childProps, context);
                        inst.__b = inst.__b || nextBase;
                        inst.__u = component;
                        setComponentProps(inst, childProps, 0, context, !1);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase, !1);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t.__u) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                flushMounts();
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.__b) {
                c.__b = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, !1);
            }
        }
        return dom;
    }
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component.__x = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner); else if (base) {
            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
            component.__b = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__r) component.__r(null);
    }
    function Component(props, context) {
        this.__d = !0;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent, !1);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        setState: function(state, callback) {
            var s = this.state;
            if (!this.__s) this.__s = extend({}, s);
            extend(s, 'function' == typeof state ? state(s, this.props) : state);
            if (callback) (this.__h = this.__h || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function(callback) {
            if (callback) (this.__h = this.__h || []).push(callback);
            renderComponent(this, 2);
        },
        render: function() {}
    });
    var preact = {
        h: h,
        createElement: h,
        cloneElement: cloneElement,
        Component: Component,
        render: render,
        rerender: rerender,
        options: options
    };
    if (true) module.exports = preact; else self.preact = preact;
}();
//# sourceMappingURL=preact.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return Provider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return connect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectAdvanced", function() { return connectAdvanced; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(7);



var Children = {
	only: function only(children) {
		return children && children[0] || null;
	}
};

function proptype() {}
proptype.isRequired = proptype;

var PropTypes = {
	element: proptype,
	func: proptype,
	shape: function shape() {
		return proptype;
	},
	instanceOf: function instanceOf() {
		return proptype;
	}
};

var subscriptionShape = PropTypes.shape({
  trySubscribe: PropTypes.func.isRequired,
  tryUnsubscribe: PropTypes.func.isRequired,
  notifyNestedSubs: PropTypes.func.isRequired,
  isSubscribed: PropTypes.func.isRequired
});

var storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  warning('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      classCallCheck(this, Provider);

      var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return Children.only(this.props.children);
    };

    return Provider;
  }(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

  {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);
  Provider.displayName = 'Provider';

  return Provider;
}

var Provider = createProvider();

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

var index$1 = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {}
            }
        }
    }

    return targetComponent;
};

var invariant = function () {};

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    invariant(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      inherits(Connect, _Component);

      function Connect(props, context) {
        classCallCheck(this, Connect);

        var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        invariant(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        invariant(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;


    {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          if (this.subscription) this.subscription.tryUnsubscribe();
          this.initSubscription();
          if (shouldHandleStateChanges) this.subscription.trySubscribe();
        }
      };
    }

    return index$1(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      verifyPlainObject(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && (typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return Object(__WEBPACK_IMPORTED_MODULE_1_redux__["bindActionCreators"])(mapDispatchToProps, dispatch);
  }) : undefined;
}

var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}

var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      warning('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual : _ref2$areMergedPropsE,
        extraOptions = objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

var connect = createConnect();

var index = { Provider: Provider, connect: connect, connectAdvanced: connectAdvanced };

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=preact-redux.esm.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(16)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _playkitJs = __webpack_require__(35);

var _playkitJs2 = _interopRequireDefault(_playkitJs);

var _logger = __webpack_require__(65);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base component to be extended by other player UI components
 *
 * @class BaseComponent
 * @extends {Component}
 */
var BaseComponent = function (_Component) {
  _inherits(BaseComponent, _Component);

  /**
   * Creates an instance of BaseComponent.
   * @param {Object} [obj={ config: {} }] obj
   * @memberof BaseComponent
   */
  function BaseComponent() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { config: {} };

    _classCallCheck(this, BaseComponent);

    var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this));

    _this.name = obj.name;
    _this.player = obj.player;
    _this.config = obj.config;
    _this.logger = _logger2.default.getLogger('UI ' + _this.name);
    _this.logger.debug('Initialized');
    return _this;
  }

  return BaseComponent;
}(_preact.Component);

exports.default = BaseComponent;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.bindActions = bindActions;

var _redux = __webpack_require__(7);

/**
 * Binding redux actions to props utility
 *
 * @export
 * @param {Array<any>} actions redux actions
 * @returns {Function} function
 */
function bindActions(actions) {
  return function (dispatch) {
    return _extends({}, (0, _redux.bindActionCreators)(actions, dispatch));
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconType = exports.default = undefined;

var _icon = __webpack_require__(67);

Object.defineProperty(exports, 'IconType', {
  enumerable: true,
  get: function get() {
    return _icon.IconType;
  }
});

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _icon2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

function n(n){return n&&"object"==typeof n&&"default"in n?n.default:n}function t(n){return null!==n&&void 0!==n}function r(n,t){var o=e({},n);for(var i in t)t.hasOwnProperty(i)&&(o[i]=n[i]&&t[i]&&"object"==typeof n[i]&&"object"==typeof t[i]?r(n[i],t[i]):n[i]||t[i]);return o}function e(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n}function o(n){if(n=n||{},"string"==typeof n&&(n=n.split(",")),"join"in n){for(var t={},r=0;r<n.length;r++){var e=n[r].trim();e&&(t[e.split(".").pop()]=e)}return t}return n}function i(n,t){return v=t||h,n&&n.replace(/\{\{([\w.-]+)\}\}/g,u)}function u(n,t){for(var r=t.split("."),e=v,o=0;o<r.length;o++)if(null==(e=e[r[o]]))return"";return"string"==typeof e&&e.match(/\{\{/)&&(e=i(e,v)),e}function c(n,r,e,o,u,c){r&&(n=r+"."+n);var a=e&&f(e,n);return(u||0===u)&&a&&"object"==typeof a&&(a=a.splice?a[u]||a[0]:0===u&&t(a.none)?a.none:1===u&&t(a.one||a.singular)?a.one||a.singular:a.some||a.many||a.plural||a.other||a),a&&i(a,o)||c||null}function a(n,t,r){var i={};t=t||{},n=o(n);for(var u in n)if(n.hasOwnProperty(u)&&n[u]){var a=n[u];r||"string"!=typeof a?a.nodeName===g&&(a=e({fallback:a.children&&a.children[0]},a.attributes),i[u]=c(a.id,t.scope,t.dictionary,a.fields,a.plural,a.fallback)):i[u]=c(a,t.scope,t.dictionary)}return i}var l=__webpack_require__(0),f=n(__webpack_require__(71)),p=/[?&#]intl=show/,s=function(n){function t(){n.apply(this,arguments)}return n&&(t.__proto__=n),t.prototype=Object.create(n&&n.prototype),t.prototype.constructor=t,t.prototype.getChildContext=function(){var n=this.props,t=n.scope,o=n.definition,i=n.mark,u=e({},this.context.intl||{});return t&&(u.scope=t),o&&(u.dictionary=r(u.dictionary||{},o)),(i||"undefined"!=typeof location&&String(location).match(p))&&(u.mark=!0),{intl:u}},t.prototype.render=function(n){var t=n.children;return t&&t[0]||null},t}(l.Component),d=function(){for(var n=[],t=arguments.length;t--;)n[t]=arguments[t];if(n.length>1){return y(n[0],n[1])}var r=n[0];return function(n){return y(n,r)}},y=function(n,t){return function(r){return l.h(s,t||{},l.h(n,r))}},h={},v,g=function(n,t){var r=n.id,e=n.children,o=n.plural,i=n.fields,u=t.intl,a=e&&e[0],p=c(r,u&&u.scope,u&&u.dictionary,i,o,a);if(u&&u.mark){var s="dictionary"+(u&&u.scope?"."+u.scope:"")+"."+r;return l.h("mark",{style:"background: "+(p?f(u,s)?"rgba(119,231,117,.5)":"rgba(229,226,41,.5)":"rgba(228,147,51,.5)"),title:r},p)}return p},b=function(n,t){var r=n.children,e=t.intl,o=r&&r[0];return o&&l.cloneElement(o,a(o.attributes,e,!0))},m=function(n){return function(t){return function(r,e){var o="function"==typeof n?n(r):n,i=a(o,e.intl);return l.h(t,assign({},r,i))}}};d.intl=d,d.IntlProvider=s,d.Text=g,d.Localizer=b,d.withText=m,module.exports=d;
//# sourceMappingURL=preact-i18n.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var types = exports.types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS',
  UPDATE_IS_MOBILE: 'shell/UPDATE_IS_MOBILE',
  UPDATE_PRE_PLAYBACK: 'shell/UPDATE_PRE_PLAYBACK',
  UPDATE_PLAYER_WIDTH: 'shell/UPDATE_PLAYER_WIDTH',
  UPDATE_DOCUMENT_WIDTH: 'shell/UPDATE_DOCUMENT_WIDTH',
  UPDATE_PLAYER_HOVER_STATE: 'shell/UPDATE_PLAYER_HOVER_STATE'
};

var initialState = exports.initialState = {
  playerClasses: [],
  prePlayback: true,
  is_ad: true,
  playerHover: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.ADD_PLAYER_CLASS:
      if (state.playerClasses.includes(action.className)) return state;
      return _extends({}, state, {
        playerClasses: [].concat(_toConsumableArray(state.playerClasses), [action.className])
      });

    case types.REMOVE_PLAYER_CLASS:
      return _extends({}, state, {
        playerClasses: state.playerClasses.filter(function (c) {
          return c !== action.className;
        })
      });

    case types.UPDATE_IS_MOBILE:
      return _extends({}, state, {
        isMobile: action.isMobile
      });

    case types.UPDATE_PRE_PLAYBACK:
      return _extends({}, state, {
        prePlayback: action.prePlayback
      });

    case types.UPDATE_PLAYER_WIDTH:
      return _extends({}, state, {
        playerWidth: action.playerWidth
      });

    case types.UPDATE_DOCUMENT_WIDTH:
      return _extends({}, state, {
        documentWidth: action.documentWidth
      });

    case types.UPDATE_PLAYER_HOVER_STATE:
      return _extends({}, state, {
        playerHover: action.hover
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  addPlayerClass: function addPlayerClass(className) {
    return { type: types.ADD_PLAYER_CLASS, className: className };
  },
  removePlayerClass: function removePlayerClass(className) {
    return { type: types.REMOVE_PLAYER_CLASS, className: className };
  },
  updateIsMobile: function updateIsMobile(isMobile) {
    return { type: types.UPDATE_IS_MOBILE, isMobile: isMobile };
  },
  updatePrePlayback: function updatePrePlayback(prePlayback) {
    return { type: types.UPDATE_PRE_PLAYBACK, prePlayback: prePlayback };
  },
  updatePlayerWidth: function updatePlayerWidth(playerWidth) {
    return { type: types.UPDATE_PLAYER_WIDTH, playerWidth: playerWidth };
  },
  updateDocumentWidth: function updateDocumentWidth(documentWidth) {
    return { type: types.UPDATE_DOCUMENT_WIDTH, documentWidth: documentWidth };
  },
  updatePlayerHoverState: function updatePlayerHoverState(hover) {
    return { type: types.UPDATE_PLAYER_HOVER_STATE, hover: hover };
  }
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(29)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _loading = __webpack_require__(69);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _loading2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _playPause = __webpack_require__(70);

var _playPause2 = _interopRequireDefault(_playPause);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _playPause2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_SEEKBAR_DRAGGING_STATUS: 'seekbar/UPDATE_SEEKBAR_DRAGGING_STATUS',
  UPDATE_CURRENT_TIME: 'seekbar/UPDATE_CURRENT_TIME',
  UPDATE_DURATION: 'seekbar/UPDATE_DURATION'
};

var initialState = exports.initialState = {
  currentTime: 0,
  duration: 0,
  draggingActive: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_SEEKBAR_DRAGGING_STATUS:
      return _extends({}, state, {
        draggingActive: action.draggingActive
      });

    case types.UPDATE_CURRENT_TIME:
      return _extends({}, state, {
        currentTime: action.currentTime
      });

    case types.UPDATE_DURATION:
      return _extends({}, state, {
        duration: action.duration
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updateSeekbarDraggingStatus: function updateSeekbarDraggingStatus(draggingActive) {
    return { type: types.UPDATE_SEEKBAR_DRAGGING_STATUS, draggingActive: draggingActive };
  },
  updateDuration: function updateDuration(duration) {
    return { type: types.UPDATE_DURATION, duration: duration };
  },
  updateCurrentTime: function updateCurrentTime(currentTime) {
    return { type: types.UPDATE_CURRENT_TIME, currentTime: currentTime };
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _seekbar = __webpack_require__(74);

var _seekbar2 = _interopRequireDefault(_seekbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _seekbar2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _volume = __webpack_require__(75);

var _volume2 = _interopRequireDefault(_volume);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _volume2.default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _fullscreen = __webpack_require__(85);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _fullscreen2.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _bottomBar = __webpack_require__(89);

var _bottomBar2 = _interopRequireDefault(_bottomBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _bottomBar2.default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _overlayPlay = __webpack_require__(49);

var _overlayPlay2 = _interopRequireDefault(_overlayPlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _overlayPlay2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  TOGGLE_PLAY: 'play-pause/TOGGLE_PLAY'
};

var initialState = exports.initialState = {
  isPlaying: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.TOGGLE_PLAY:
      return _extends({}, state, {
        isPlaying: action.isPlaying
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  toggleIsPlaying: function toggleIsPlaying(isPlaying) {
    return { type: types.TOGGLE_PLAY, isPlaying: isPlaying };
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _prePlaybackPlayOverlay = __webpack_require__(68);

var _prePlaybackPlayOverlay2 = _interopRequireDefault(_prePlaybackPlayOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _prePlaybackPlayOverlay2.default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Formatting seconds input into time format
 *
 * @param {number} input number of seconds
 * @returns {string} formatted time string
 */
function toHHMMSS(input) {
  var sec_num = parseInt(input, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return '' + (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
}

/**
 * Converting formatted time into seconds
 *
 * @param {string} input formatted time
 * @returns {number} number of seconds
 */
function toSecondsFromHHMMSS(input) {
  var parts = input.split(':');
  var seconds = 0;
  if (parts.length === 2) {
    if (parseInt(parts[0]) > 59 || parseInt(parts[1]) > 59) {
      return 0;
    }
    seconds += parseInt(parts[0]) * 60;
    seconds += parseInt(parts[1]);
  }
  return seconds;
}

exports.toHHMMSS = toHHMMSS;
exports.toSecondsFromHHMMSS = toSecondsFromHHMMSS;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _settings = __webpack_require__(76);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _settings2.default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(0)) :
  typeof define === 'function' && define.amd ? define(['preact'], factory) :
  (global.preactPortal = factory(global.preact));
}(this, (function (preact) { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Portal = function (_Component) {
	inherits(Portal, _Component);

	function Portal() {
		classCallCheck(this, Portal);
		return possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Portal.prototype.componentDidUpdate = function componentDidUpdate(props) {
		for (var i in props) {
			if (props[i] !== this.props[i]) {
				return this.renderLayer();
			}
		}
	};

	Portal.prototype.componentDidMount = function componentDidMount() {
		this.renderLayer();
	};

	Portal.prototype.componentWillUnmount = function componentWillUnmount() {
		this.renderLayer(false);
		if (this.remote) this.remote.parentNode.removeChild(this.remote);
	};

	Portal.prototype.findNode = function findNode(node) {
		return typeof node === 'string' ? document.querySelector(node) : node;
	};

	Portal.prototype.renderLayer = function renderLayer() {
		var show = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

		if (this.props.into !== this.intoPointer) {
			this.intoPointer = this.props.into;
			if (this.into && this.remote) {
				this.remote = preact.render(preact.h(PortalProxy, null), this.into, this.remote);
			}
			this.into = this.findNode(this.props.into);
		}

		this.remote = preact.render(preact.h(
			PortalProxy,
			{ context: this.context },
			show && this.props.children || null
		), this.into, this.remote);
	};

	Portal.prototype.render = function render() {
		return null;
	};

	return Portal;
}(preact.Component);

var PortalProxy = function (_Component2) {
	inherits(PortalProxy, _Component2);

	function PortalProxy() {
		classCallCheck(this, PortalProxy);
		return possibleConstructorReturn(this, _Component2.apply(this, arguments));
	}

	PortalProxy.prototype.getChildContext = function getChildContext() {
		return this.props.context;
	};

	PortalProxy.prototype.render = function render(_ref) {
		var children = _ref.children;

		return children && children[0] || null;
	};

	return PortalProxy;
}(preact.Component);

return Portal;

})));
//# sourceMappingURL=preact-portal.js.map


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _overlay = __webpack_require__(78);

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _overlay2.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _language = __webpack_require__(82);

var _language2 = _interopRequireDefault(_language);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _language2.default;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  TOGGLE_CVAA_OVERLAY: 'cvaa/TOGGLE_CVAA_OVERLAY',
  UPDATE_CAPTIONS_STYLE: 'cvaa/UPDATE_CAPTIONS_STYLE'
};

var initialState = exports.initialState = {
  overlayOpen: false,
  style: 'default'
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.TOGGLE_CVAA_OVERLAY:
      return _extends({}, state, {
        overlayOpen: action.show
      });

    case types.UPDATE_CAPTIONS_STYLE:
      return _extends({}, state, {
        style: action.style
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  toggleCVAAOverlay: function toggleCVAAOverlay(show) {
    return { type: types.TOGGLE_CVAA_OVERLAY, show: show };
  },
  updateCaptionsStyle: function updateCaptionsStyle(style) {
    return { type: types.UPDATE_CAPTIONS_STYLE, style: style };
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _timeDisplay = __webpack_require__(88);

var _timeDisplay2 = _interopRequireDefault(_timeDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _timeDisplay2.default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _overlayPortal = __webpack_require__(90);

var _overlayPortal2 = _interopRequireDefault(_overlayPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _overlayPortal2.default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keyboard = __webpack_require__(91);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _keyboard2.default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = playbackUI;

var _preact = __webpack_require__(0);

var _overlayPlay = __webpack_require__(15);

var _overlayPlay2 = _interopRequireDefault(_overlayPlay);

var _prePlaybackPlayOverlay = __webpack_require__(18);

var _prePlaybackPlayOverlay2 = _interopRequireDefault(_prePlaybackPlayOverlay);

var _loading = __webpack_require__(8);

var _loading2 = _interopRequireDefault(_loading);

var _playPause = __webpack_require__(9);

var _playPause2 = _interopRequireDefault(_playPause);

var _seekbarPlaybackContainer = __webpack_require__(72);

var _seekbarPlaybackContainer2 = _interopRequireDefault(_seekbarPlaybackContainer);

var _volume = __webpack_require__(12);

var _volume2 = _interopRequireDefault(_volume);

var _settings = __webpack_require__(20);

var _settings2 = _interopRequireDefault(_settings);

var _language = __webpack_require__(23);

var _language2 = _interopRequireDefault(_language);

var _fullscreen = __webpack_require__(13);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _timeDisplayPlaybackContainer = __webpack_require__(86);

var _timeDisplayPlaybackContainer2 = _interopRequireDefault(_timeDisplayPlaybackContainer);

var _bottomBar = __webpack_require__(14);

var _bottomBar2 = _interopRequireDefault(_bottomBar);

var _overlayPortal = __webpack_require__(26);

var _overlayPortal2 = _interopRequireDefault(_overlayPortal);

var _keyboard = __webpack_require__(27);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
function playbackUI(props) {
  return (0, _preact.h)(
    'div',
    { className: 'playback-gui-wrapper' },
    (0, _preact.h)(_keyboard2.default, { player: props.player }),
    (0, _preact.h)(_loading2.default, { player: props.player }),
    (0, _preact.h)(
      'div',
      { className: 'player-gui', id: 'player-gui' },
      (0, _preact.h)(_overlayPortal2.default, null),
      (0, _preact.h)(_overlayPlay2.default, { player: props.player }),
      (0, _preact.h)(
        _bottomBar2.default,
        null,
        (0, _preact.h)(_seekbarPlaybackContainer2.default, { showFramePreview: true, showTimeBubble: true, player: props.player }),
        (0, _preact.h)(
          'div',
          { className: 'left-controls' },
          (0, _preact.h)(_playPause2.default, { player: props.player }),
          (0, _preact.h)(_timeDisplayPlaybackContainer2.default, { format: 'current / total' })
        ),
        (0, _preact.h)(
          'div',
          { className: 'right-controls' },
          (0, _preact.h)(_volume2.default, { player: props.player }),
          (0, _preact.h)(_language2.default, { player: props.player }),
          (0, _preact.h)(_settings2.default, { player: props.player }),
          (0, _preact.h)(_fullscreen2.default, { player: props.player })
        )
      )
    ),
    (0, _preact.h)(_prePlaybackPlayOverlay2.default, { player: props.player })
  );
}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(57);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(51);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_35__;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_LOADING_SPINNER_STATE: 'loading/UPDATE_LOADING_SPINNER_STATE'
};

var initialState = exports.initialState = {
  show: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_LOADING_SPINNER_STATE:
      return _extends({}, state, {
        show: action.show
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updateLoadingSpinnerState: function updateLoadingSpinnerState(show) {
    return { type: types.UPDATE_LOADING_SPINNER_STATE, show: show };
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_VOLUME: 'volume/UPDATE_VOLUME',
  UPDATE_VOLUME_DRAGGING_STATUS: 'volume/UPDATE_VOLUME_DRAGGING_STATUS',
  UPDATE_MUTED: 'volume/UPDATE_MUTED'
};

var initialState = exports.initialState = {
  draggingActive: false,
  volume: 1,
  muted: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_VOLUME:
      return _extends({}, state, {
        volume: action.volume
      });

    case types.UPDATE_VOLUME_DRAGGING_STATUS:
      return _extends({}, state, {
        draggingActive: action.draggingActive
      });

    case types.UPDATE_MUTED:
      return _extends({}, state, {
        muted: action.muted
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updateVolume: function updateVolume(volume) {
    return { type: types.UPDATE_VOLUME, volume: volume };
  },
  updateVolumeDraggingStatus: function updateVolumeDraggingStatus(draggingActive) {
    return { type: types.UPDATE_VOLUME_DRAGGING_STATUS, draggingActive: draggingActive };
  },
  updateMuted: function updateMuted(muted) {
    return { type: types.UPDATE_MUTED, muted: muted };
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_QUALITY: 'settings/UPDATE_QUALITY',
  UPDATE_SPEED: 'settings/UPDATE_SPEED'
};

var initialState = exports.initialState = {
  quality: 1,
  speed: 2
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_QUALITY:
      return _extends({}, state, {
        quality: action.quality
      });

    case types.UPDATE_SPEED:
      return _extends({}, state, {
        speed: action.speed
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updateQuality: function updateQuality(quality) {
    return { type: types.UPDATE_QUALITY, quality: quality };
  },
  updateSpeed: function updateSpeed(speed) {
    return { type: types.UPDATE_SPEED, speed: speed };
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _smartContainer = __webpack_require__(77);

var _smartContainer2 = _interopRequireDefault(_smartContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _smartContainer2.default;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _dropdown = __webpack_require__(41);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SmartContainerItem component
 *
 * @class SmartContainerItem
 * @extends {Component}
 */
var SmartContainerItem = function (_Component) {
  _inherits(SmartContainerItem, _Component);

  function SmartContainerItem() {
    _classCallCheck(this, SmartContainerItem);

    return _possibleConstructorReturn(this, (SmartContainerItem.__proto__ || Object.getPrototypeOf(SmartContainerItem)).apply(this, arguments));
  }

  _createClass(SmartContainerItem, [{
    key: 'render',


    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof SmartContainer
     */
    value: function render(props) {
      return (0, _preact.h)(
        'div',
        { className: 'smart-container-item select-menu-item' },
        (0, _preact.h)(
          'label',
          { htmlFor: _icon.IconType.Quality },
          props.icon ? (0, _preact.h)(
            'div',
            { className: 'label-icon' },
            (0, _preact.h)(_icon2.default, { type: props.icon })
          ) : undefined,
          props.label
        ),
        (0, _preact.h)(_dropdown2.default, { onSelect: function onSelect(o) {
            return props.onSelect(o);
          }, options: props.options })
      );
    }
  }]);

  return SmartContainerItem;
}(_preact.Component);

exports.default = SmartContainerItem;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dropdown = __webpack_require__(79);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _dropdown2.default;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_FULLSCREEN: 'fullscreen/UPDATE_FULLSCREEN'
};

var initialState = exports.initialState = {
  fullscreen: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_FULLSCREEN:
      return _extends({}, state, {
        fullscreen: action.fullscreen
      });
    default:
      return state;
  }
};

var actions = exports.actions = {
  updateFullscreen: function updateFullscreen(fullscreen) {
    return { type: types.UPDATE_FULLSCREEN, fullscreen: fullscreen };
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adsUI;

var _preact = __webpack_require__(0);

var _loading = __webpack_require__(8);

var _loading2 = _interopRequireDefault(_loading);

var _playPause = __webpack_require__(9);

var _playPause2 = _interopRequireDefault(_playPause);

var _seekbarAdsContainer = __webpack_require__(92);

var _seekbarAdsContainer2 = _interopRequireDefault(_seekbarAdsContainer);

var _volume = __webpack_require__(12);

var _volume2 = _interopRequireDefault(_volume);

var _fullscreen = __webpack_require__(13);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _timeDisplayAdsContainer = __webpack_require__(94);

var _timeDisplayAdsContainer2 = _interopRequireDefault(_timeDisplayAdsContainer);

var _adSkip = __webpack_require__(96);

var _adSkip2 = _interopRequireDefault(_adSkip);

var _adLearnMore = __webpack_require__(98);

var _adLearnMore2 = _interopRequireDefault(_adLearnMore);

var _topBar = __webpack_require__(44);

var _topBar2 = _interopRequireDefault(_topBar);

var _bottomBar = __webpack_require__(14);

var _bottomBar2 = _interopRequireDefault(_bottomBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ads ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {HTMLElement} player ui tree
 */
function adsUI(props) {
  var useStyledLinearAds = false;

  try {
    useStyledLinearAds = props.player.config.plugins.ima.adsRenderingSettings.useStyledLinearAds;
  } catch (e) {
    //TODO: add error handling
  }

  return (0, _preact.h)(
    'div',
    { className: 'ad-gui-wrapper' },
    (0, _preact.h)(_loading2.default, { player: props.player }),
    (0, _preact.h)(
      'div',
      { className: 'player-gui', id: 'player-gui' },
      useStyledLinearAds ? undefined : (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          _topBar2.default,
          null,
          (0, _preact.h)(
            'div',
            { className: 'left-controls' },
            (0, _preact.h)(
              'span',
              { className: 'font-size-base' },
              'Adverisment'
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'right-controls' },
            (0, _preact.h)(_adLearnMore2.default, null)
          )
        ),
        (0, _preact.h)(_adSkip2.default, { player: props.player })
      ),
      (0, _preact.h)(
        _bottomBar2.default,
        null,
        (0, _preact.h)(_seekbarAdsContainer2.default, { adBreak: true, showFramePreview: true, showTimeBubble: true, player: props.player }),
        (0, _preact.h)(
          'div',
          { className: 'left-controls' },
          (0, _preact.h)(_playPause2.default, { player: props.player }),
          (0, _preact.h)(_timeDisplayAdsContainer2.default, null)
        ),
        (0, _preact.h)(
          'div',
          { className: 'right-controls' },
          (0, _preact.h)(_volume2.default, { player: props.player }),
          (0, _preact.h)(_fullscreen2.default, { player: props.player })
        )
      )
    )
  );
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _topBar = __webpack_require__(100);

var _topBar2 = _interopRequireDefault(_topBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _topBar2.default;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = liveUI;

var _preact = __webpack_require__(0);

var _overlayPlay = __webpack_require__(15);

var _overlayPlay2 = _interopRequireDefault(_overlayPlay);

var _prePlaybackPlayOverlay = __webpack_require__(18);

var _prePlaybackPlayOverlay2 = _interopRequireDefault(_prePlaybackPlayOverlay);

var _loading = __webpack_require__(8);

var _loading2 = _interopRequireDefault(_loading);

var _playPause = __webpack_require__(9);

var _playPause2 = _interopRequireDefault(_playPause);

var _seekbarLivePlaybackContainer = __webpack_require__(101);

var _seekbarLivePlaybackContainer2 = _interopRequireDefault(_seekbarLivePlaybackContainer);

var _volume = __webpack_require__(12);

var _volume2 = _interopRequireDefault(_volume);

var _settings = __webpack_require__(20);

var _settings2 = _interopRequireDefault(_settings);

var _language = __webpack_require__(23);

var _language2 = _interopRequireDefault(_language);

var _fullscreen = __webpack_require__(13);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _bottomBar = __webpack_require__(14);

var _bottomBar2 = _interopRequireDefault(_bottomBar);

var _overlayPortal = __webpack_require__(26);

var _overlayPortal2 = _interopRequireDefault(_overlayPortal);

var _keyboard = __webpack_require__(27);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _liveTag = __webpack_require__(103);

var _liveTag2 = _interopRequireDefault(_liveTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Live ui intrface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
function liveUI(props) {
  return (0, _preact.h)(
    'div',
    { className: 'playback-gui-wrapper' },
    (0, _preact.h)(_keyboard2.default, { player: props.player }),
    (0, _preact.h)(_loading2.default, { player: props.player }),
    (0, _preact.h)(
      'div',
      { className: 'player-gui', id: 'player-gui' },
      (0, _preact.h)(_overlayPortal2.default, null),
      (0, _preact.h)(_overlayPlay2.default, { player: props.player }),
      (0, _preact.h)(
        _bottomBar2.default,
        null,
        (0, _preact.h)(_seekbarLivePlaybackContainer2.default, { showFramePreview: true, showTimeBubble: true, player: props.player }),
        (0, _preact.h)(
          'div',
          { className: 'left-controls' },
          (0, _preact.h)(_playPause2.default, { player: props.player }),
          (0, _preact.h)(_liveTag2.default, { player: props.player })
        ),
        (0, _preact.h)(
          'div',
          { className: 'right-controls' },
          (0, _preact.h)(_volume2.default, { player: props.player }),
          (0, _preact.h)(_language2.default, { player: props.player }),
          (0, _preact.h)(_settings2.default, { player: props.player }),
          (0, _preact.h)(_fullscreen2.default, { player: props.player })
        )
      )
    ),
    (0, _preact.h)(_prePlaybackPlayOverlay2.default, { player: props.player })
  );
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  TOGGLE_SHARE_OVERLAY: 'share/TOGGLE_SHARE_OVERLAY'
};

var initialState = exports.initialState = {
  overlayOpen: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.TOGGLE_SHARE_OVERLAY:
      return _extends({}, state, {
        overlayOpen: action.show
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  toggleShareOverlay: function toggleShareOverlay(show) {
    return { type: types.TOGGLE_SHARE_OVERLAY, show: show };
  }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_PLAYER_STATE: 'engine/UPDATE_PLAYER_STATE',
  UPDATE_IS_PLAYING: 'engine/UPDATE_IS_PLAYING',
  UPDATE_IS_ENDED: 'engine/UPDATE_IS_ENDED',
  UPDATE_CURRENT_TIME: 'engine/UPDATE_CURRENT_TIME',
  UPDATE_DURATION: 'engine/UPDATE_DURATION',
  UPDATE_VOLUME: 'engine/UPDATE_VOLUME',
  UPDATE_MUTED: 'engine/UPDATE_MUTED',
  UPDATE_METADATA_LOADING_STATUS: 'engine/UPDATE_METADATA_LOADING_STATUS',
  UPDATE_AUDIO_TRACKS: 'engine/UPDATE_AUDIO_TRACKS',
  UPDATE_VIDEO_TRACKS: 'engine/UPDATE_VIDEO_TRACKS',
  UPDATE_TEXT_TRACKS: 'engine/UPDATE_TEXT_TRACKS',
  UPDATE_AD_BREAK: 'engine/UPDATE_AD_BREAK',
  UPDATE_AD_BREAK_PROGRESS: 'engine/UPDATE_AD_BREAK_PROGRESS',
  UPDATE_AD_IS_PLAYING: 'engine/UPDATE_AD_IS_PLAYING',
  UPDATE_AD_SKIP_TIME_OFFSET: 'engine/UPDATE_AD_SKIP_TIME_OFFSET',
  UPDATE_AD_SKIPPABLE_STATE: 'engine/UPDATE_AD_SKIPPABLE_STATE',
  UPDATE_AD_URL: 'engine/UPDATE_AD_URL',
  UPDATE_PLAYER_POSTER: 'engine/UPDATE_PLATER_POSTER',
  UPDATE_IS_LIVE: 'engine/UPDATE_IS_LIVE',
  UPDATE_IS_DVR: 'engine/UPDATE_IS_DVR'
};

var initialState = exports.initialState = {
  isPlaying: false,
  isEnded: false,
  metadataLoaded: false,
  playerState: {
    previousState: '',
    currentState: ''
  },
  poster: '',
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false,
  videoTracks: [],
  audioTracks: [],
  textTracks: [],
  adBreak: false,
  adIsPlaying: false,
  adSkipTimeOffset: 0,
  adSkippableState: false,
  isLive: false,
  isDvr: false,
  adProgress: {
    currentTime: 0,
    duration: 0
  },
  adUrl: ''
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_PLAYER_STATE:
      return _extends({}, state, {
        playerState: action.playerState
      });

    case types.UPDATE_IS_PLAYING:
      return _extends({}, state, {
        isPlaying: action.isPlaying
      });

    case types.UPDATE_IS_ENDED:
      return _extends({}, state, {
        isEnded: action.isEnded
      });

    case types.UPDATE_CURRENT_TIME:
      return _extends({}, state, {
        currentTime: action.currentTime
      });

    case types.UPDATE_DURATION:
      return _extends({}, state, {
        duration: action.duration
      });

    case types.UPDATE_VOLUME:
      return _extends({}, state, {
        volume: action.volume
      });

    case types.UPDATE_MUTED:
      return _extends({}, state, {
        muted: action.muted
      });

    case types.UPDATE_METADATA_LOADING_STATUS:
      return _extends({}, state, {
        metadataLoaded: action.metadataLoaded
      });

    case types.UPDATE_AUDIO_TRACKS:
      return _extends({}, state, {
        audioTracks: action.tracks
      });

    case types.UPDATE_VIDEO_TRACKS:
      return _extends({}, state, {
        videoTracks: action.tracks
      });

    case types.UPDATE_TEXT_TRACKS:
      return _extends({}, state, {
        textTracks: action.tracks
      });

    case types.UPDATE_AD_BREAK:
      return _extends({}, state, {
        adBreak: action.adBreak
      });

    case types.UPDATE_AD_BREAK_PROGRESS:
      return _extends({}, state, {
        adProgress: action.adProgress
      });

    case types.UPDATE_AD_IS_PLAYING:
      return _extends({}, state, {
        adIsPlaying: action.adIsPlaying
      });

    case types.UPDATE_AD_SKIP_TIME_OFFSET:
      return _extends({}, state, {
        adSkipTimeOffset: action.adSkipTimeOffset
      });

    case types.UPDATE_AD_SKIPPABLE_STATE:
      return _extends({}, state, {
        adSkippableState: action.adSkippableState
      });

    case types.UPDATE_AD_URL:
      return _extends({}, state, {
        adUrl: action.adUrl
      });

    case types.UPDATE_PLAYER_POSTER:
      return _extends({}, state, {
        poster: action.poster
      });

    case types.UPDATE_IS_LIVE:
      return _extends({}, state, {
        isLive: action.isLive
      });

    case types.UPDATE_IS_DVR:
      return _extends({}, state, {
        isDvr: action.isDvr
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updatePlayerState: function updatePlayerState(prevoiusState, currentState) {
    return { type: types.UPDATE_PLAYER_STATE, playerState: { prevoiusState: prevoiusState, currentState: currentState } };
  },
  updateIsPlaying: function updateIsPlaying(isPlaying) {
    return { type: types.UPDATE_IS_PLAYING, isPlaying: isPlaying };
  },
  updateIsEnded: function updateIsEnded(isEnded) {
    return { type: types.UPDATE_IS_ENDED, isEnded: isEnded };
  },
  updateCurrentTime: function updateCurrentTime(currentTime) {
    return { type: types.UPDATE_CURRENT_TIME, currentTime: currentTime };
  },
  updateDuration: function updateDuration(duration) {
    return { type: types.UPDATE_DURATION, duration: duration };
  },
  updateVolume: function updateVolume(volume) {
    return { type: types.UPDATE_VOLUME, volume: volume };
  },
  updateMuted: function updateMuted(muted) {
    return { type: types.UPDATE_MUTED, muted: muted };
  },
  updateMetadataLoadingStatus: function updateMetadataLoadingStatus(metadataLoaded) {
    return { type: types.UPDATE_METADATA_LOADING_STATUS, metadataLoaded: metadataLoaded };
  },
  updateAudioTracks: function updateAudioTracks(tracks) {
    return { type: types.UPDATE_AUDIO_TRACKS, tracks: tracks };
  },
  updateVideoTracks: function updateVideoTracks(tracks) {
    return { type: types.UPDATE_VIDEO_TRACKS, tracks: tracks };
  },
  updateTextTracks: function updateTextTracks(tracks) {
    return { type: types.UPDATE_TEXT_TRACKS, tracks: tracks };
  },
  updateAdBreak: function updateAdBreak(adBreak) {
    return { type: types.UPDATE_AD_BREAK, adBreak: adBreak };
  },
  updateAdBreakProgress: function updateAdBreakProgress(currentTime, duration) {
    return { type: types.UPDATE_AD_BREAK_PROGRESS, adProgress: { currentTime: currentTime, duration: duration } };
  },
  updateAdIsPlaying: function updateAdIsPlaying(adIsPlaying) {
    return { type: types.UPDATE_AD_IS_PLAYING, adIsPlaying: adIsPlaying };
  },
  updateAdSkipTimeOffset: function updateAdSkipTimeOffset(adSkipTimeOffset) {
    return { type: types.UPDATE_AD_SKIP_TIME_OFFSET, adSkipTimeOffset: adSkipTimeOffset };
  },
  updateAdSkippableState: function updateAdSkippableState(adSkippableState) {
    return { type: types.UPDATE_AD_SKIPPABLE_STATE, adSkippableState: adSkippableState };
  },
  updateAdClickUrl: function updateAdClickUrl(adUrl) {
    return { type: types.UPDATE_AD_URL, adUrl: adUrl };
  },
  updatePlayerPoster: function updatePlayerPoster(poster) {
    return { type: types.UPDATE_PLAYER_POSTER, poster: poster };
  },
  updateIsLive: function updateIsLive(isLive) {
    return { type: types.UPDATE_IS_LIVE, isLive: isLive };
  },
  updateIsDvr: function updateIsDvr(isDvr) {
    return { type: types.UPDATE_IS_DVR, isDvr: isDvr };
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardControl = exports.OverlayPortal = exports.BottomBar = exports.TopBar = exports.TimeDisplay = exports.FullscreenControl = exports.LanguageControl = exports.SettingsControl = exports.ShareControl = exports.VolumeControl = exports.SeekBarControl = exports.PlayPauseControl = exports.Loading = exports.PrePlaybackPlayOverlay = exports.OverlayPlay = exports.liveUI = exports.adsUI = exports.playbackUI = exports.h = undefined;

var _preact = __webpack_require__(0);

Object.defineProperty(exports, 'h', {
  enumerable: true,
  get: function get() {
    return _preact.h;
  }
});

var _playback = __webpack_require__(28);

Object.defineProperty(exports, 'playbackUI', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_playback).default;
  }
});

var _ads = __webpack_require__(43);

Object.defineProperty(exports, 'adsUI', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ads).default;
  }
});

var _live = __webpack_require__(45);

Object.defineProperty(exports, 'liveUI', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_live).default;
  }
});

var _overlayPlay = __webpack_require__(15);

Object.defineProperty(exports, 'OverlayPlay', {
  enumerable: true,
  get: function get() {
    return _overlayPlay.OverlayPlay;
  }
});

var _prePlaybackPlayOverlay = __webpack_require__(18);

Object.defineProperty(exports, 'PrePlaybackPlayOverlay', {
  enumerable: true,
  get: function get() {
    return _prePlaybackPlayOverlay.PrePlaybackPlayOverlay;
  }
});

var _loading = __webpack_require__(8);

Object.defineProperty(exports, 'Loading', {
  enumerable: true,
  get: function get() {
    return _loading.Loading;
  }
});

var _playPause = __webpack_require__(9);

Object.defineProperty(exports, 'PlayPauseControl', {
  enumerable: true,
  get: function get() {
    return _playPause.PlayPauseControl;
  }
});

var _seekbar = __webpack_require__(11);

Object.defineProperty(exports, 'SeekBarControl', {
  enumerable: true,
  get: function get() {
    return _seekbar.SeekBarControl;
  }
});

var _volume = __webpack_require__(12);

Object.defineProperty(exports, 'VolumeControl', {
  enumerable: true,
  get: function get() {
    return _volume.VolumeControl;
  }
});

var _share = __webpack_require__(105);

Object.defineProperty(exports, 'ShareControl', {
  enumerable: true,
  get: function get() {
    return _share.ShareControl;
  }
});

var _settings = __webpack_require__(20);

Object.defineProperty(exports, 'SettingsControl', {
  enumerable: true,
  get: function get() {
    return _settings.SettingsControl;
  }
});

var _language = __webpack_require__(23);

Object.defineProperty(exports, 'LanguageControl', {
  enumerable: true,
  get: function get() {
    return _language.LanguageControl;
  }
});

var _fullscreen = __webpack_require__(13);

Object.defineProperty(exports, 'FullscreenControl', {
  enumerable: true,
  get: function get() {
    return _fullscreen.FullscreenControl;
  }
});

var _timeDisplay = __webpack_require__(25);

Object.defineProperty(exports, 'TimeDisplay', {
  enumerable: true,
  get: function get() {
    return _timeDisplay.TimeDisplay;
  }
});

var _topBar = __webpack_require__(44);

Object.defineProperty(exports, 'TopBar', {
  enumerable: true,
  get: function get() {
    return _topBar.TopBar;
  }
});

var _bottomBar = __webpack_require__(14);

Object.defineProperty(exports, 'BottomBar', {
  enumerable: true,
  get: function get() {
    return _bottomBar.BottomBar;
  }
});

var _overlayPortal = __webpack_require__(26);

Object.defineProperty(exports, 'OverlayPortal', {
  enumerable: true,
  get: function get() {
    return _overlayPortal.OverlayPortal;
  }
});

var _keyboard = __webpack_require__(27);

Object.defineProperty(exports, 'KeyboardControl', {
  enumerable: true,
  get: function get() {
    return _keyboard.KeyboardControl;
  }
});

var _uiManager = __webpack_require__(109);

var _uiManager2 = _interopRequireDefault(_uiManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _uiManager2.default;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _playPause = __webpack_require__(17);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    isPlaying: state.engine.isPlaying,
    adBreak: state.engine.adBreak,
    adIsPlaying: state.engine.adIsPlaying,
    playerHover: state.shell.playerHover,
    isMobile: state.shell.isMobile
  };
};

/**
 * OverlayPlay component
 *
 * @class OverlayPlay
 * @example <OverlayPlay player={this.player} />
 * @extends {BaseComponent}
 */
var OverlayPlay = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_playPause.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(OverlayPlay, _BaseComponent);

  /**
   * Creates an instance of OverlayPlay.
   * @param {Object} obj obj
   * @memberof OverlayPlay
   */
  function OverlayPlay(obj) {
    _classCallCheck(this, OverlayPlay);

    return _possibleConstructorReturn(this, (OverlayPlay.__proto__ || Object.getPrototypeOf(OverlayPlay)).call(this, { name: 'OverlayPlay', player: obj.player }));
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof OverlayPlay
   */


  _createClass(OverlayPlay, [{
    key: 'isPlayingAdOrPlayback',
    value: function isPlayingAdOrPlayback() {
      return this.props.adBreak && this.props.adIsPlaying || !this.props.adBreak && this.props.isPlaying;
    }

    /**
     * toggle play pause and set animation to icon change
     *
     * @returns {void}
     * @memberof OverlayPlay
     */

  }, {
    key: 'togglePlayPause',
    value: function togglePlayPause() {
      var _this2 = this;

      this.logger.debug('Toggle play');
      this.setState({ animation: true });
      setTimeout(function () {
        _this2.setState({ animation: false });
      }, 400);

      this.isPlayingAdOrPlayback() ? this.player.pause() : this.player.play();
    }

    /**
     * handler for overlay click
     *
     * @returns {void}
     * @memberof OverlayPlay
     */

  }, {
    key: 'onOverlayClick',
    value: function onOverlayClick() {
      if (!this.props.isMobile || this.props.isMobile && this.props.playerHover) {
        this.togglePlayPause();
      }
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof OverlayPlay
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return (0, _preact.h)(
        'div',
        { className: 'overlay-play ' + (this.state.animation ? 'in' : ''), onClick: function onClick() {
            return _this3.onOverlayClick();
          } },
        this.isPlayingAdOrPlayback() ? (0, _preact.h)(_icon2.default, { type: _icon.IconType.Play }) : (0, _preact.h)(_icon2.default, { type: _icon.IconType.Pause })
      );
    }
  }]);

  return OverlayPlay;
}(_base2.default)) || _class);
exports.default = OverlayPlay;

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(54);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(52);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(16)))

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(32);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(56);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(59);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(61);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16), __webpack_require__(60)(module)))

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(33);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(29)))

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(34);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOG_LEVEL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsLogger = __webpack_require__(66);

var JsLogger = _interopRequireWildcard(_jsLogger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOG_LEVEL = {
  "DEBUG": JsLogger.DEBUG,
  "INFO": JsLogger.INFO,
  "TIME": JsLogger.TIME,
  "WARN": JsLogger.WARN,
  "ERROR": JsLogger.ERROR,
  "OFF": JsLogger.OFF
};

/**
 * LoggerFactory
 *
 * @class LoggerFactory
 */

var LoggerFactory = function () {
  /**
   * Creates an instance of LoggerFactory.
   * @param {Object} [options] options
   * @memberof LoggerFactory
   */
  function LoggerFactory(options) {
    _classCallCheck(this, LoggerFactory);

    JsLogger.useDefaults(options || {});
  }

  /**
   * getLogger
   *
   * @param {string} [name] name
   * @returns {*} - logger
   * @memberof LoggerFactory
   */


  _createClass(LoggerFactory, [{
    key: "getLogger",
    value: function getLogger(name) {
      if (!name) {
        return JsLogger;
      }
      return JsLogger.get(name);
    }
  }]);

  return LoggerFactory;
}();

var lf = new LoggerFactory({ defaultLevel: JsLogger.DEBUG });

exports.default = lf;
exports.LOG_LEVEL = LOG_LEVEL;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
(function (global) {
	"use strict";

	// Top level module for the global, static logger instance.
	var Logger = { };

	// For those that are at home that are keeping score.
	Logger.VERSION = "1.3.0";

	// Function which handles all incoming log messages.
	var logHandler;

	// Map of ContextualLogger instances by name; used by Logger.get() to return the same named instance.
	var contextualLoggersByNameMap = {};

	// Polyfill for ES5's Function.bind.
	var bind = function(scope, func) {
		return function() {
			return func.apply(scope, arguments);
		};
	};

	// Super exciting object merger-matron 9000 adding another 100 bytes to your download.
	var merge = function () {
		var args = arguments, target = args[0], key, i;
		for (i = 1; i < args.length; i++) {
			for (key in args[i]) {
				if (!(key in target) && args[i].hasOwnProperty(key)) {
					target[key] = args[i][key];
				}
			}
		}
		return target;
	};

	// Helper to define a logging level object; helps with optimisation.
	var defineLogLevel = function(value, name) {
		return { value: value, name: name };
	};

	// Predefined logging levels.
	Logger.DEBUG = defineLogLevel(1, 'DEBUG');
	Logger.INFO = defineLogLevel(2, 'INFO');
	Logger.TIME = defineLogLevel(3, 'TIME');
	Logger.WARN = defineLogLevel(4, 'WARN');
	Logger.ERROR = defineLogLevel(8, 'ERROR');
	Logger.OFF = defineLogLevel(99, 'OFF');

	// Inner class which performs the bulk of the work; ContextualLogger instances can be configured independently
	// of each other.
	var ContextualLogger = function(defaultContext) {
		this.context = defaultContext;
		this.setLevel(defaultContext.filterLevel);
		this.log = this.info;  // Convenience alias.
	};

	ContextualLogger.prototype = {
		// Changes the current logging level for the logging instance.
		setLevel: function (newLevel) {
			// Ensure the supplied Level object looks valid.
			if (newLevel && "value" in newLevel) {
				this.context.filterLevel = newLevel;
			}
		},

		// Is the logger configured to output messages at the supplied level?
		enabledFor: function (lvl) {
			var filterLevel = this.context.filterLevel;
			return lvl.value >= filterLevel.value;
		},

		debug: function () {
			this.invoke(Logger.DEBUG, arguments);
		},

		info: function () {
			this.invoke(Logger.INFO, arguments);
		},

		warn: function () {
			this.invoke(Logger.WARN, arguments);
		},

		error: function () {
			this.invoke(Logger.ERROR, arguments);
		},

		time: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'start' ]);
			}
		},

		timeEnd: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'end' ]);
			}
		},

		// Invokes the logger callback if it's not being filtered.
		invoke: function (level, msgArgs) {
			if (logHandler && this.enabledFor(level)) {
				logHandler(msgArgs, merge({ level: level }, this.context));
			}
		}
	};

	// Protected instance which all calls to the to level `Logger` module will be routed through.
	var globalLogger = new ContextualLogger({ filterLevel: Logger.OFF });

	// Configure the global Logger instance.
	(function() {
		// Shortcut for optimisers.
		var L = Logger;

		L.enabledFor = bind(globalLogger, globalLogger.enabledFor);
		L.debug = bind(globalLogger, globalLogger.debug);
		L.time = bind(globalLogger, globalLogger.time);
		L.timeEnd = bind(globalLogger, globalLogger.timeEnd);
		L.info = bind(globalLogger, globalLogger.info);
		L.warn = bind(globalLogger, globalLogger.warn);
		L.error = bind(globalLogger, globalLogger.error);

		// Don't forget the convenience alias!
		L.log = L.info;
	}());

	// Set the global logging handler.  The supplied function should expect two arguments, the first being an arguments
	// object with the supplied log messages and the second being a context object which contains a hash of stateful
	// parameters which the logging function can consume.
	Logger.setHandler = function (func) {
		logHandler = func;
	};

	// Sets the global logging filter level which applies to *all* previously registered, and future Logger instances.
	// (note that named loggers (retrieved via `Logger.get`) can be configured independently if required).
	Logger.setLevel = function(level) {
		// Set the globalLogger's level.
		globalLogger.setLevel(level);

		// Apply this level to all registered contextual loggers.
		for (var key in contextualLoggersByNameMap) {
			if (contextualLoggersByNameMap.hasOwnProperty(key)) {
				contextualLoggersByNameMap[key].setLevel(level);
			}
		}
	};

	// Retrieve a ContextualLogger instance.  Note that named loggers automatically inherit the global logger's level,
	// default context and log handler.
	Logger.get = function (name) {
		// All logger instances are cached so they can be configured ahead of use.
		return contextualLoggersByNameMap[name] ||
			(contextualLoggersByNameMap[name] = new ContextualLogger(merge({ name: name }, globalLogger.context)));
	};

	// CreateDefaultHandler returns a handler function which can be passed to `Logger.setHandler()` which will
	// write to the window's console object (if present); the optional options object can be used to customise the
	// formatter used to format each log message.
	Logger.createDefaultHandler = function (options) {
		options = options || {};

		options.formatter = options.formatter || function defaultMessageFormatter(messages, context) {
			// Prepend the logger's name to the log message for easy identification.
			if (context.name) {
				messages.unshift("[" + context.name + "]");
			}
		};

		// Map of timestamps by timer labels used to track `#time` and `#timeEnd()` invocations in environments
		// that don't offer a native console method.
		var timerStartTimeByLabelMap = {};

		// Support for IE8+ (and other, slightly more sane environments)
		var invokeConsoleMethod = function (hdlr, messages) {
			Function.prototype.apply.call(hdlr, console, messages);
		};

		// Check for the presence of a logger.
		if (typeof console === "undefined") {
			return function () { /* no console */ };
		}

		return function(messages, context) {
			// Convert arguments object to Array.
			messages = Array.prototype.slice.call(messages);

			var hdlr = console.log;
			var timerLabel;

			if (context.level === Logger.TIME) {
				timerLabel = (context.name ? '[' + context.name + '] ' : '') + messages[0];

				if (messages[1] === 'start') {
					if (console.time) {
						console.time(timerLabel);
					}
					else {
						timerStartTimeByLabelMap[timerLabel] = new Date().getTime();
					}
				}
				else {
					if (console.timeEnd) {
						console.timeEnd(timerLabel);
					}
					else {
						invokeConsoleMethod(hdlr, [ timerLabel + ': ' +
							(new Date().getTime() - timerStartTimeByLabelMap[timerLabel]) + 'ms' ]);
					}
				}
			}
			else {
				// Delegate through to custom warn/error loggers if present on the console.
				if (context.level === Logger.WARN && console.warn) {
					hdlr = console.warn;
				} else if (context.level === Logger.ERROR && console.error) {
					hdlr = console.error;
				} else if (context.level === Logger.INFO && console.info) {
					hdlr = console.info;
				}

				options.formatter(messages, context);
				invokeConsoleMethod(hdlr, messages);
			}
		};
	};

	// Configure and example a Default implementation which writes to the `window.console` (if present).  The
	// `options` hash can be used to configure the default logLevel and provide a custom message formatter.
	Logger.useDefaults = function(options) {
		Logger.setLevel(options && options.defaultLevel || Logger.DEBUG);
		Logger.setHandler(Logger.createDefaultHandler(options));
	};

	// Export to popular environments boilerplate.
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (Logger),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = Logger;
	}
	else {
		Logger._prevLogger = global.Logger;

		Logger.noConflict = function () {
			global.Logger = Logger._prevLogger;
			return Logger;
		};

		global.Logger = Logger;
	}
}(this));


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconType = {
  Maximize: 'maximize',
  Minimize: 'minimize',
  Play: 'play',
  Pause: 'pause',
  VolumeBase: 'volume-base',
  VolumeWaves: 'volume-waves',
  VolumeMute: 'volume-mute',
  Close: 'close',
  Share: 'share',
  Settings: 'settings',
  Check: 'check',
  Language: 'language',
  Quality: 'quality',
  Captions: 'captions',
  Speed: 'speed',
  Audio: 'audio',
  Copy: 'copy',
  Facebook: 'facebook',
  Twitter: 'twitter',
  GooglePlus: 'google-plus',
  Linkedin: 'linkedin',
  Email: 'email',
  Embed: 'embed',
  Link: 'link',
  ArrowDown: 'arrow-down',
  Startover: 'shartover'
  /**
   * Icon component
   *
   * @class Icon
   * @example <Icon type={IconType.Play} />
   * @extends {Component}
   */
};
var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',

    /**
     * render icon based on props.type
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof Icon
     */
    value: function render(props) {
      switch (props.type) {
        case IconType.Maximize:
          return (0, _preact.h)(
            'svg',
            { className: 'icon icon-maximize', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M800 269.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' }),
            (0, _preact.h)('path', { d: 'M224 754.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' })
          );
        case IconType.Minimize:
          return (0, _preact.h)(
            'svg',
            { className: 'icon icon-minimize', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M672 306.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' }),
            (0, _preact.h)('path', { d: 'M352 717.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' })
          );

        case IconType.Play:
          return (0, _preact.h)(
            'svg',
            { className: 'icon icon-play', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M796.806 461.202c44.919 28.075 44.739 73.706 0 101.668l-459.472 287.171c-44.919 28.075-81.334 7.915-81.334-45.305v-585.4c0-53.096 36.595-73.266 81.334-45.305l459.472 287.171z' })
          );

        case IconType.Pause:
          return (0, _preact.h)(
            'svg',
            { className: 'icon icon-pause', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M256 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314zM640 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314z' })
          );

        case IconType.VolumeBase:
          return (0, _preact.h)(
            'svg',
            { className: 'icon volume-base', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M128 416v192h96v-192h-96zM64 383.853c0-17.592 14.012-31.853 32.094-31.853h159.813c17.725 0 32.094 14.581 32.094 31.853v256.295c0 17.592-14.012 31.853-32.094 31.853h-159.813c-17.725 0-32.094-14.581-32.094-31.853v-256.295z' }),
            (0, _preact.h)('path', { d: 'M288 634.342l160 88.889v-422.462l-160 88.889v244.684zM224 352l231.787-128.771c31.046-17.248 56.213-2.487 56.213 32.476v512.589c0 35.184-25.054 49.786-56.213 32.476l-231.787-128.771v-320z' })
          );

        case IconType.VolumeWaves:
          return (0, _preact.h)(
            'svg',
            { className: 'icon volume-waves', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M802.017 837.177c82.359-86.627 129.183-201.774 129.183-324.26 0-123.976-47.976-240.409-132.127-327.329-12.293-12.697-32.552-13.025-45.249-0.732s-13.025 32.552-0.732 45.249c72.692 75.084 114.109 175.597 114.109 282.812 0 105.928-40.422 205.331-111.566 280.162-12.177 12.808-11.666 33.063 1.143 45.24s33.063 11.666 45.24-1.143z' }),
            (0, _preact.h)('path', { d: 'M667.436 743.221c67.761-60.884 107.273-147.888 107.273-241.233 0-87.318-34.552-169.203-94.836-229.446-12.501-12.493-32.762-12.486-45.255 0.015s-12.486 32.762 0.015 45.255c48.375 48.342 76.075 113.989 76.075 184.176 0 75.021-31.679 144.776-86.048 193.627-13.146 11.812-14.227 32.044-2.416 45.19s32.044 14.227 45.19 2.416z' })
          );

        case IconType.VolumeMute:
          return (0, _preact.h)(
            'svg',
            { className: 'icon volume-mute', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M768 466.745l-67.986-67.986c-12.213-12.213-32.654-12.393-45.151 0.104-12.584 12.584-12.543 32.711-0.104 45.151l67.986 67.986-67.986 67.986c-12.213 12.213-12.393 32.654 0.104 45.151 12.584 12.584 32.711 12.543 45.151 0.104l67.986-67.986 67.986 67.986c12.213 12.213 32.654 12.393 45.151-0.104 12.584-12.584 12.543-32.711 0.104-45.151l-67.986-67.986 67.986-67.986c12.213-12.213 12.393-32.654-0.104-45.151-12.584-12.584-32.711-12.543-45.151-0.104l-67.986 67.986z' })
          );

        case IconType.Close:
          return (0, _preact.h)(
            'svg',
            { className: 'icon icon-close', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M573.162 512l214.269-214.269c16.772-16.772 16.688-44.071-0.202-60.96-17.007-17.007-44.182-16.98-60.96-0.202l-214.269 214.269-214.269-214.269c-16.772-16.772-44.071-16.688-60.96 0.202-17.007 17.007-16.98 44.182-0.202 60.96l214.269 214.269-214.269 214.269c-16.772 16.772-16.688 44.071 0.202 60.96 17.007 17.007 44.182 16.98 60.96 0.202l214.269-214.269 214.269 214.269c16.772 16.772 44.071 16.688 60.96-0.202 17.007-17.007 16.98-44.182 0.202-60.96l-214.269-214.269z' })
          );

        case IconType.Share:
          return (0, _preact.h)(
            'svg',
            { className: 'icon icon-share', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M318.641 446.219l236.155-142.257c-0.086-1.754-0.129-3.52-0.129-5.295 0-58.91 47.756-106.667 106.667-106.667s106.667 47.756 106.667 106.667c0 58.91-47.756 106.667-106.667 106.667-33.894 0-64.095-15.808-83.633-40.454l-236.467 142.445c-0.132-3.064-0.394-6.095-0.779-9.087l7.271-12.835-0.117 53.333-7.183-12.743c0.399-3.046 0.67-6.131 0.806-9.252l236.467 142.383c19.538-24.648 49.741-40.457 83.636-40.457 58.91 0 106.667 47.756 106.667 106.667s-47.756 106.667-106.667 106.667c-58.91 0-106.667-47.756-106.667-106.667 0-1.775 0.043-3.539 0.129-5.293l-236.19-142.216c-19.528 24.867-49.868 40.841-83.939 40.841-58.91 0-106.667-47.756-106.667-106.667s47.756-106.667 106.667-106.667c34.091 0 64.447 15.993 83.974 40.886zM234.667 554.667c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 341.333c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 768c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667z' })
          );

        case IconType.Settings:
          return (0, _preact.h)(
            'svg',
            { className: 'icon icon-share', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M803.451 546.033c2.552-22.107 2.552-44.408 0.246-64.81-1.084-6.208-6.499-10.721-12.535-10.671-30.286 0.533-57.727-17.773-68.866-45.941s-3.64-60.291 18.795-80.593c3.935-3.569 4.416-9.583 0.92-13.959-13.595-17.35-29.146-33.073-46.311-46.83-4.23-3.38-10.359-2.886-14.783 1.966-14.421 14.721-34.212 22.938-54.434 22.761-9.009 0.041-17.942-1.652-26.865-5.212-28.414-11.992-46.226-40.546-44.49-71.542 0.335-5.319-3.547-9.972-8.785-10.588-21.926-2.538-44.068-2.595-65.961-0.176-5.349 0.6-9.341 5.207-9.175 10.514 1.027 30.384-16.802 58.251-45.764 70.431-8.238 3.138-16.993 4.701-25.207 4.609-20.599 0.206-40.395-7.982-55.482-23.363-2.014-2.187-4.849-3.435-7.553-3.445-2.441 0.015-4.811 0.83-6.513 2.139-17.541 13.798-33.455 29.547-47.262 46.729-3.418 4.337-2.922 10.575 0.97 14.162 22.816 20.692 30.19 53.479 17.807 83.351-13.035 27.396-41.135 44.394-71.446 43.222-5.112-0.197-9.499 3.606-10.086 9.179-2.673 22.023-2.673 44.289-0.212 64.867 1.080 6.27 6.559 10.824 13.309 10.737l2.225 0.006c28.935 0.604 54.726 18.391 65.634 45.374 11.22 28.205 3.921 60.407-18.565 81.204-3.866 3.509-4.341 9.418-0.895 13.742 13.545 17.354 29.027 33.106 46.042 46.867 4.303 3.449 10.547 2.954 14.986-1.907 14.414-14.76 34.226-23.001 54.43-22.82 9.070-0.052 18.063 1.668 27.041 5.299 28.19 12.071 45.891 40.41 44.347 71.468-0.342 5.312 3.536 9.962 8.802 10.578 21.915 2.548 44.049 2.605 65.929 0.176 5.364-0.604 9.364-5.227 9.191-10.598-0.997-30.358 16.84-58.183 45.452-70.201 8.263-3.256 17.070-4.908 25.521-4.865 20.676-0.206 40.533 8.070 55.398 23.38 2.039 2.195 4.898 3.446 7.673 3.455 2.268-0.011 4.468-0.776 6.321-2.228 17.625-13.724 33.599-29.444 47.415-46.611 3.426-4.348 2.928-10.6-0.863-14.097-22.358-20.082-30.057-51.85-19.372-79.939s37.55-46.71 67.745-46.857h5.229c5.12-0.026 9.413-3.875 9.996-8.962zM861.733 552.735c-3.961 34.572-33.157 60.748-68.129 60.926h-5.235c-5.803 0.028-10.991 3.624-13.054 9.048s-0.577 11.558 4.020 15.69c26.602 24.519 29.853 65.381 7.275 94.034-16.847 20.934-36.063 39.845-57.197 56.302-12.034 9.427-26.861 14.584-42.368 14.658-19.254-0.051-37.623-8.090-50.269-21.718-3.221-3.315-7.66-5.165-12.712-5.118-1.425-0.007-2.839 0.258-3.554 0.532-5.581 2.346-9.136 7.892-8.937 13.966 1.152 35.958-25.509 66.771-61.307 70.804-26.332 2.923-52.909 2.854-79.246-0.208-36.286-4.245-62.897-36.157-60.576-72.186 0.304-6.123-3.235-11.788-8.302-13.964-1.328-0.536-2.748-0.808-4.606-0.8-4.651-0.041-9.118 1.817-11.635 4.367-24.544 27.036-65.886 30.311-94.481 7.394-20.587-16.65-39.207-35.595-55.308-56.226-22.552-28.277-19.261-69.208 7.317-93.334 4.474-4.138 5.939-10.604 3.748-16.115-2.052-5.076-6.932-8.442-11.794-8.55-36.436 0.464-66.759-24.741-72.949-60.89-3.243-26.718-3.243-53.731-0.055-79.964 3.744-35.827 34.642-62.605 70.642-61.219 6.877 0.266 13.251-3.59 15.584-8.401 2.309-5.59 0.861-12.028-3.789-16.247-26.603-24.51-29.856-65.368-7.293-93.994 16.767-20.868 35.856-39.76 57.129-56.491 12.099-9.322 26.921-14.42 42.463-14.513 19.308 0.059 37.717 8.166 50.145 21.684 3.263 3.322 7.737 5.172 12.994 5.126 1.471 0.015 2.933-0.245 3.363-0.39 5.601-2.359 9.165-7.93 8.957-14.077-1.126-35.941 25.542-66.721 61.322-70.731 26.322-2.909 52.889-2.84 79.251 0.212 36.244 4.265 62.828 36.125 60.546 72.343-0.339 6.047 3.159 11.654 8.186 13.782 1.381 0.55 2.855 0.829 4.726 0.823 4.663 0.040 9.142-1.819 11.615-4.312 24.439-26.99 65.656-30.312 94.137-7.557 20.721 16.607 39.456 35.549 55.655 56.225 22.667 28.35 19.38 69.439-7.531 93.846-4.33 3.918-5.776 10.112-3.628 15.542s7.438 8.96 13.543 8.854c34.999-0.298 65.076 24.766 71.337 60.925 3.065 26.552 3.065 53.368 0 79.92zM511.956 589.951c43.215-0.108 78.137-35.17 78.072-78.385 0-31.732-19.132-60.334-48.461-72.448s-63.068-5.35-85.461 17.133c-22.393 22.483-29.022 56.249-16.791 85.529s40.909 48.298 72.641 48.171zM512.146 648.617c-55.438 0.221-105.58-33.029-126.965-84.224s-9.796-110.233 29.358-149.543c39.153-39.31 98.144-51.136 149.424-29.956s84.731 71.189 84.732 126.627c0.114 75.549-60.999 136.907-136.548 137.096z' })
          );

        case IconType.Check:
          return (0, _preact.h)(
            'svg',
            { className: 'icon check-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M342.481 563.894c-12.577-12.416-32.838-12.285-45.254 0.292s-12.285 32.838 0.292 45.254l118.857 117.333c13.275 13.105 34.901 12.123 46.933-2.131l297.143-352c11.4-13.505 9.694-33.694-3.811-45.094s-33.694-9.694-45.094 3.811l-274.828 325.566-94.238-93.030z' })
          );
        case IconType.Language:
          return (0, _preact.h)(
            'svg',
            { className: 'icon language-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M512 800c159.058 0 288-128.942 288-288s-128.942-288-288-288c-159.058 0-288 128.942-288 288s128.942 288 288 288zM512 864c-194.404 0-352-157.596-352-352s157.596-352 352-352c194.404 0 352 157.596 352 352s-157.596 352-352 352z' }),
            (0, _preact.h)('path', { d: 'M441.231 173.324c-76.632 84.62-121.231 207.208-121.231 338.676 0 134.304 46.556 259.282 126.083 343.936l46.646-43.82c-68.041-72.429-108.728-181.651-108.728-300.116 0-116.001 39.001-223.203 104.669-295.716l-47.438-42.96z' }),
            (0, _preact.h)('path', { d: 'M584.297 173.324c76.632 84.62 121.231 207.208 121.231 338.676 0 134.304-46.556 259.282-126.083 343.936l-46.646-43.82c68.041-72.429 108.728-181.651 108.728-300.116 0-116.001-39.001-223.203-104.669-295.716l47.438-42.96z' }),
            (0, _preact.h)('path', { d: 'M840.432 419.786c-81.65-22.637-200.551-35.786-328.432-35.786-128.056 0-247.103 13.185-328.758 35.876l17.136 61.663c75.47-20.972 188.938-33.539 311.622-33.539 122.521 0 235.854 12.533 311.334 33.459l17.099-61.674z' }),
            (0, _preact.h)('path', { d: 'M840.432 605.754c-81.65 22.637-200.551 35.786-328.432 35.786-128.056 0-247.103-13.185-328.758-35.876l17.136-61.663c75.47 20.972 188.938 33.539 311.622 33.539 122.521 0 235.854-12.533 311.334-33.459l17.099 61.674z' }),
            (0, _preact.h)('path', { d: 'M480 192h64v640h-64v-640z' })
          );

        case IconType.Quality:
          return (0, _preact.h)(
            'svg',
            { className: 'icon quality-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M159.904 192h288.234c17.277 0 31.862 14.323 31.862 31.992 0 17.792-14.261 31.993-31.853 31.994l-288.147 0.014v544.174c-0.017-0.18 704-0.174 704-0.174v-128.006c0-17.795 14.327-31.994 32-31.994 17.796 0 32 14.34 32 32.029v128.145c0 35.25-28.639 63.826-63.904 63.826h-704.192c-35.293 0-63.904-28.875-63.904-63.826v-544.348c0-35.25 28.639-63.826 63.904-63.826zM501.818 378.182c108.449 0 196.364-87.915 196.364-196.364 0-29.091 43.636-29.091 43.636 0 0 108.449 87.915 196.364 196.364 196.364 29.091 0 29.091 43.636 0 43.636-108.449 0-196.364 87.915-196.364 196.364 0 29.091-43.636 29.091-43.636 0 0-108.449-87.915-196.364-196.364-196.364-29.091 0-29.091-43.636 0-43.636z' })
          );

        case IconType.Captions:
          return (0, _preact.h)(
            'svg',
            { className: 'icon captions-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M160 771.213c-0.017-0.172 704-0.166 704-0.166v-518.261c0.017 0.172-704 0.166-704 0.166v518.261zM96 252.787c0-33.572 28.639-60.787 63.904-60.787h704.192c35.293 0 63.904 27.5 63.904 60.787v518.427c0 33.572-28.639 60.787-63.904 60.787h-704.192c-35.293 0-63.904-27.5-63.904-60.787v-518.427z' }),
            (0, _preact.h)('path', { d: 'M490.583 568.655c0 7.729-2.311 15.987-6.933 24.777s-11.668 17.162-21.14 25.118c-9.471 7.956-21.405 14.358-35.801 19.208s-30.611 7.274-48.644 7.274c-38.34 0-68.268-11.176-89.787-33.528s-32.278-52.319-32.278-89.901c0-25.459 4.925-47.962 14.775-67.511s24.095-34.665 42.734-45.348c18.639-10.684 40.916-16.025 66.829-16.025 16.063 0 30.8 2.349 44.212 7.047s24.777 10.759 34.096 18.185c9.32 7.425 16.442 15.343 21.367 23.754s7.388 16.253 7.388 23.527c0 7.425-2.766 13.714-8.297 18.867s-12.237 7.729-20.117 7.729c-5.152 0-9.433-1.326-12.843-3.978s-7.236-6.933-11.479-12.843c-7.577-11.517-15.495-20.155-23.754-25.913s-18.753-8.638-31.482-8.638c-18.336 0-33.111 7.16-44.325 21.481s-16.821 33.907-16.821 58.759c0 11.669 1.44 22.39 4.319 32.164s7.047 18.109 12.502 25.004c5.455 6.895 12.047 12.123 19.776 15.684s16.215 5.342 25.459 5.342c12.426 0 23.072-2.879 31.937-8.638s16.707-14.548 23.527-26.368c3.789-6.971 7.88-12.426 12.275-16.366s9.774-5.91 16.139-5.91c7.577 0 13.866 2.879 18.867 8.638s7.501 11.896 7.501 18.412zM767.219 568.655c0 7.729-2.311 15.987-6.933 24.777s-11.668 17.162-21.14 25.118c-9.471 7.956-21.405 14.358-35.801 19.208s-30.611 7.274-48.644 7.274c-38.34 0-68.268-11.176-89.787-33.528s-32.278-52.319-32.278-89.901c0-25.459 4.925-47.962 14.775-67.511s24.095-34.665 42.734-45.348c18.639-10.684 40.916-16.025 66.829-16.025 16.063 0 30.8 2.349 44.212 7.047s24.777 10.759 34.096 18.185c9.32 7.425 16.442 15.343 21.367 23.754s7.388 16.253 7.388 23.527c0 7.425-2.766 13.714-8.297 18.867s-12.237 7.729-20.117 7.729c-5.152 0-9.433-1.326-12.843-3.978s-7.236-6.933-11.479-12.843c-7.577-11.517-15.495-20.155-23.754-25.913s-18.753-8.638-31.482-8.638c-18.336 0-33.111 7.16-44.325 21.481s-16.821 33.907-16.821 58.759c0 11.669 1.44 22.39 4.319 32.164s7.047 18.109 12.502 25.004c5.455 6.895 12.047 12.123 19.776 15.684s16.215 5.342 25.459 5.342c12.426 0 23.072-2.879 31.937-8.638s16.707-14.548 23.527-26.368c3.789-6.971 7.88-12.426 12.275-16.366s9.774-5.91 16.139-5.91c7.577 0 13.866 2.879 18.867 8.638s7.501 11.896 7.501 18.412z' })
          );

        case IconType.Speed:
          return (0, _preact.h)(
            'svg',
            { className: 'icon speed-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M512 832c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM480.239 643.971c-0.158-1.272-0.239-2.566-0.239-3.876v-192.19c0-17.621 14.204-31.905 32-31.905 17.673 0 32 14.497 32 31.905v192.19c0 1.313-0.079 2.607-0.232 3.878 55.325 14.128 96.232 64.301 96.232 124.027 0 70.692-57.308 128-128 128s-128-57.308-128-128c0-59.729 40.91-109.903 96.239-124.029zM928 576c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-194.404-157.596-352-352-352s-352 157.596-352 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-229.75 186.25-416 416-416s416 186.25 416 416z' })
          );

        case IconType.Audio:
          return (0, _preact.h)(
            'svg',
            { className: 'icon audio-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M768 625.124v-354.531l-352 135.385v330.022c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 23.314 0 45.173 6.233 64 17.124v-241.124c0-13.241 8.155-25.114 20.513-29.867l416-160c20.96-8.062 43.487 7.41 43.487 29.867v512c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 23.314 0 45.173 6.233 64 17.124zM288 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM704 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64z' })
          );

        case IconType.Copy:
          return (0, _preact.h)(
            'svg',
            { className: 'icon copy-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M703.727 320c35.497 0 64.273 28.482 64.273 64.003v351.993c0 35.348-28.862 64.003-64.273 64.003h-191.454c-35.496 0-64.271-28.48-64.273-64.001l255.727 0.001v-352c0 0-28.356 0.147-63.727 0.001v-63.912l63.727-0.088zM256 288.187c0-35.45 28.398-64.187 63.988-64.187h192.025c35.339 0 63.988 28.706 63.988 64.187v319.625c0 35.45-28.398 64.187-63.988 64.187h-192.025c-35.339 0-63.988-28.706-63.988-64.187v-319.625zM320 288v320h192v-320h-192z' })
          );

        case IconType.Facebook:
          return (0, _preact.h)(
            'svg',
            { className: 'icon facebook-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M432 405.333h-80v106.667h80v320h133.333v-320h97.12l9.547-106.667h-106.667v-44.453c0-25.467 5.12-35.547 29.733-35.547h76.933v-133.333h-101.547c-95.893 0-138.453 42.213-138.453 123.067v90.267z' })
          );

        case IconType.Twitter:
          return (0, _preact.h)(
            'svg',
            { className: 'icon twitter-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M832 316.614c-23.547 10.29-48.853 17.221-75.413 20.345 27.12-15.987 47.947-41.319 57.733-71.508-25.36 14.806-53.467 25.568-83.387 31.37-23.92-25.122-58.080-40.82-95.84-40.82-84.773 0-147.067 77.861-127.92 158.687-109.093-5.381-205.84-56.833-270.613-135.035-34.4 58.094-17.84 134.090 40.613 172.574-21.493-0.683-41.76-6.484-59.44-16.171-1.44 59.879 42.16 115.898 105.307 128.368-18.48 4.935-38.72 6.090-59.307 2.205 16.693 51.347 65.173 88.702 122.667 89.752-55.2 42.605-124.747 61.637-194.4 53.552 58.107 36.673 127.147 58.067 201.28 58.067 243.787 0 381.52-202.684 373.2-384.473 25.653-18.244 47.92-41.004 65.52-66.914v0z' })
          );

        case IconType.GooglePlus:
          return (0, _preact.h)(
            'svg',
            { className: 'icon google-plus-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { fill: '#fff', d: 'M352 556.8h127.040c-5.12 32.928-38.4 96.64-127.040 96.64-76.48 0-138.88-63.328-138.88-141.44 0-78.080 62.4-141.44 138.88-141.44 43.52 0 72.64 18.56 89.28 34.56l60.8-58.56c-39.040-36.48-89.6-58.56-150.080-58.56-123.84 0-224 100.16-224 224s100.16 224 224 224c129.28 0 215.072-90.88 215.072-218.88 0-14.72-1.632-25.92-3.552-37.12h-211.52v76.8zM800 544v96h-64v-96h-96v-64h96v-96h64v96h96v64h-96z' })
          );

        case IconType.Linkedin:
          return (0, _preact.h)(
            'svg',
            { className: 'icon linkedin-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M324.8 290.087c0 36.506-29.6 66.087-66.133 66.087s-66.133-29.581-66.133-66.087c0-36.48 29.6-66.087 66.133-66.087s66.133 29.607 66.133 66.087zM325.333 409.043h-133.333v422.957h133.333v-422.957zM538.187 409.043h-132.48v422.957h132.507v-222.026c0-123.45 160.773-133.549 160.773 0v222.026h133.013v-267.811c0-208.306-237.92-200.719-293.813-98.179v-56.967z' })
          );

        case IconType.Email:
          return (0, _preact.h)(
            'svg',
            { className: 'icon email-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M256 768c-35.346 0-64-28.654-64-64v-352c0-35.346 28.654-64 64-64h512c35.346 0 64 28.654 64 64v352c0 35.346-28.654 64-64 64h-512zM512 467.488l147.52-115.488h-295.040l147.52 115.488zM748.48 352l-211.2 179.2c-0.713 1.308-1.572 2.532-2.56 3.648-12.707 12.158-32.733 12.158-45.44 0-0.988-1.116-1.847-2.34-2.56-3.648l-211.2-179.2h-19.52v352h512v-352h-19.52z' })
          );

        case IconType.Embed:
          return (0, _preact.h)(
            'svg',
            { className: 'icon embed-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M377.989 579.335c12.669 12.904 12.669 33.777 0 46.68-12.733 12.969-33.427 12.969-46.16 0l-104.727-106.667c-12.669-12.904-12.669-33.777 0-46.68l104.727-106.667c12.733-12.969 33.427-12.969 46.16 0 12.669 12.904 12.669 33.777 0 46.68l-81.812 83.327 81.812 83.327zM646.011 412.68c-12.669-12.904-12.669-33.777 0-46.68 12.733-12.969 33.427-12.969 46.16 0l104.727 106.667c12.669 12.904 12.669 33.777 0 46.68l-104.727 106.667c-12.733 12.969-33.427 12.969-46.16 0-12.669-12.904-12.669-33.777 0-46.68l81.812-83.327-81.812-83.327zM572.293 250.6c17.455 4.445 28.025 22.388 23.686 40.066l-104.727 426.669c-4.349 17.719-22.048 28.535-39.545 24.079-17.455-4.445-28.025-22.388-23.686-40.066l104.727-426.669c4.349-17.719 22.048-28.535 39.545-24.079z' })
          );

        case IconType.Link:
          return (0, _preact.h)(
            'svg',
            { className: 'icon link-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M355.028 445.537c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-24.141-24.141c-49.92-49.92-49.832-130.999 0.094-180.925 49.984-49.984 130.995-50.025 180.955-0.064l113.266 113.266c49.964 49.964 49.935 130.955-0.064 180.955-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255c25.013-25.013 25.027-65.482 0.064-90.445l-113.266-113.266c-24.957-24.957-65.445-24.936-90.445 0.064-24.955 24.955-24.998 65.511-0.094 90.416l24.141 24.141zM668.972 578.463c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l24.141 24.141c49.92 49.92 49.832 130.999-0.094 180.925-49.984 49.984-130.995 50.025-180.955 0.064l-113.266-113.266c-49.964-49.964-49.935-130.955 0.064-180.955 12.497-12.497 32.758-12.497 45.255 0s12.497 32.758 0 45.255c-25.013 25.013-25.027 65.482-0.064 90.445l113.266 113.266c24.957 24.957 65.445 24.936 90.445-0.064 24.955-24.955 24.998-65.511 0.094-90.416l-24.141-24.141z' })
          );

        case IconType.ArrowDown:
          return (0, _preact.h)(
            'svg',
            { className: 'icon arrow-down-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M301.255 338.745c-24.994-24.994-65.516-24.994-90.51 0s-24.994 65.516 0 90.51l256 256c24.994 24.994 65.516 24.994 90.51 0l256-256c24.994-24.994 24.994-65.516 0-90.51s-65.516-24.994-90.51 0l-210.745 210.745-210.745-210.745z' })
          );

        case IconType.Startover:
          return (0, _preact.h)(
            'svg',
            { className: 'icon startover-icon', viewBox: '0 0 1024 1024' },
            (0, _preact.h)('path', { d: 'M255.271 339.053c94.182-126.513 270.298-165.203 410.222-84.418 150.758 87.040 202.411 279.813 115.371 430.571s-279.813 202.411-430.571 115.371c-61.424-35.463-107.948-89.4-134.169-153.673-7.677-18.818-29.156-27.85-47.974-20.173s-27.85 29.156-20.173 47.974c32.339 79.269 89.818 145.906 165.517 189.611 185.96 107.364 423.747 43.649 531.111-142.311s43.649-423.747-142.311-531.111c-172.433-99.554-389.428-52.014-505.682 103.69l-27.226-78.49c-6.66-19.202-27.626-29.368-46.828-22.708s-29.368 27.626-22.708 46.828l52.434 151.164c5.36 15.452 20.275 25.513 36.61 24.694l159.799-8.011c20.299-1.018 35.929-18.298 34.911-38.596s-18.298-35.929-38.596-34.911l-89.738 4.499z' })
          );

        default:
          break;
      }
    }
  }]);

  return Icon;
}(_preact.Component);

exports.default = Icon;
exports.IconType = IconType;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _shell = __webpack_require__(6);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    metadataLoaded: state.engine.metadataLoaded,
    prePlayback: state.shell.prePlayback,
    poster: state.engine.poster,
    isMobile: state.shell.isMobile,
    isEnded: state.engine.isEnded
  };
};

/**
 * PrePlaybackPlayOverlay component
 *
 * @class PrePlaybackPlayOverlay
 * @example <PrePlaybackPlayOverlay player={this.player} />
 * @extends {BaseComponent}
 */
var PrePlaybackPlayOverlay = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_shell.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(PrePlaybackPlayOverlay, _BaseComponent);

  /**
   * Creates an instance of PrePlaybackPlayOverlay.
   * @param {Object} obj obj
   * @memberof PrePlaybackPlayOverlay
   */
  function PrePlaybackPlayOverlay(obj) {
    _classCallCheck(this, PrePlaybackPlayOverlay);

    return _possibleConstructorReturn(this, (PrePlaybackPlayOverlay.__proto__ || Object.getPrototypeOf(PrePlaybackPlayOverlay)).call(this, { name: 'PrePlaybackPlayOverlay', player: obj.player }));
  }

  /**
   * before component mounted, add 'pre-playback' class to player shell in order to hide the gui
   * and set the autoplay and mobileAutoplay values from the player config
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */


  _createClass(PrePlaybackPlayOverlay, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.addPlayerClass('pre-playback');

      try {
        this.autoplay = this.player.config.playback.autoplay;
      } catch (e) {
        this.autoplay = false;
      } // eslint-disable-line no-unused-vars

      try {
        this.mobileAutoplay = this.player.config.playback.mobileAutoplay;
      } catch (e) {
        this.mobileAutoplay = false;
      } // eslint-disable-line no-unused-vars
    }

    /**
     * before component unmounted, remove the pre playback flag and class from player shell.
     *
     * @returns {void}
     * @memberof PrePlaybackPlayOverlay
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.updatePrePlayback(false);
      this.props.removePlayerClass('pre-playback');
    }

    /**
     * after component mounted, listen to play event and update the pre plackback flag to false
     *
     * @returns {void}
     * @memberof PrePlaybackPlayOverlay
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.player.addEventListener(this.player.Event.PLAY, function () {
        _this2.props.updatePrePlayback(false);
        _this2.props.removePlayerClass('pre-playback');
      });

      if (this.player.paused === false) {
        this.props.updatePrePlayback(false);
        this.props.removePlayerClass('pre-playback');
      }
    }

    /**
     * play on click
     *
     * @returns {void}
     * @memberof PrePlaybackPlayOverlay
     */

  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.player.play();

      if (this.props.prePlayback) {
        this.props.updatePrePlayback(false);
        this.props.removePlayerClass('pre-playback');
      }
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof PrePlaybackPlayOverlay
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this3 = this;

      if (!props.isEnded && !props.prePlayback || !props.isEnded && !props.isMobile && this.autoplay || !props.isEnded && props.isMobile && this.mobileAutoplay) return undefined;

      return (0, _preact.h)(
        'div',
        { className: 'pre-playback-play-overlay', style: { backgroundImage: 'url(' + props.poster + ')' }, onClick: function onClick() {
            return _this3.handleClick();
          } },
        (0, _preact.h)(
          'a',
          { className: 'pre-playback-play-button' },
          props.isEnded ? (0, _preact.h)(_icon2.default, { type: _icon.IconType.Startover }) : (0, _preact.h)(_icon2.default, { type: _icon.IconType.Play })
        )
      );
    }
  }]);

  return PrePlaybackPlayOverlay;
}(_base2.default)) || _class);
exports.default = PrePlaybackPlayOverlay;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _loading = __webpack_require__(36);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    show: state.loading.show,
    isMobile: state.shell.isMobile
  };
};

/**
 * Loading component
 *
 * @class Loading
 * @example <Loading />
 * @extends {BaseComponent}
 */
var Loading = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_loading.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(Loading, _BaseComponent);

  /**
   * Creates an instance of Loading.
   * @param {Object} obj obj
   * @memberof Loading
   */
  function Loading(obj) {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, { name: 'Loading', player: obj.player }));
  }

  /**
   * before component mount, update the autoplay and mobileAutoplay values from player config
   *
   * @returns {void}
   * @memberof Loading
   */


  _createClass(Loading, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      try {
        this.autoplay = this.player.config.playback.autoplay;
      } catch (e) {
        this.autoplay = false;
      } // eslint-disable-line no-unused-vars

      try {
        this.mobileAutoplay = this.player.config.playback.mobileAutoplay;
      } catch (e) {
        this.mobileAutoplay = false;
      } // eslint-disable-line no-unused-vars
    }

    /**
     * after component mounted, set event listener to player state change and update the state of loading spinner accordingly.
     * initially, if not mobile and autoplay is on, show the loading spinner without dependency on the player state.
     * if is mobile and mobile autoplay is on, show the loading spinner without dependency on the player state.
     *
     * @returns {void}
     * @memberof Loading
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.props.isMobile && this.autoplay || this.props.isMobile && this.mobileAutoplay) {
        this.props.updateLoadingSpinnerState(true);
      }

      this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, function (e) {
        if (e.payload.newState.type === 'idle' || e.payload.newState.type === 'playing' || e.payload.newState.type === 'paused') {
          _this2.props.updateLoadingSpinnerState(false);
        } else {
          _this2.props.updateLoadingSpinnerState(true);
        }
      });
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof Loading
     */

  }, {
    key: 'render',
    value: function render(props) {
      if (!props.show) return undefined;

      return (0, _preact.h)(
        'div',
        { className: 'loading-backdrop show' },
        (0, _preact.h)(
          'div',
          { className: 'spinner-container' },
          (0, _preact.h)(
            'div',
            { className: 'spinner' },
            [].concat(_toConsumableArray(Array(8))).map(function (i) {
              return (0, _preact.h)('span', { key: i });
            })
          )
        )
      );
    }
  }]);

  return Loading;
}(_base2.default)) || _class);
exports.default = Loading;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(5);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _playPause = __webpack_require__(17);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    isPlaying: state.engine.isPlaying,
    adBreak: state.engine.adBreak,
    adIsPlaying: state.engine.adIsPlaying,
    isEnded: state.engine.isEnded
  };
};

/**
 * PlayPauseControl component
 *
 * @class PlayPauseControl
 * @example <PlayPauseControl player={this.player} />
 * @extends {BaseComponent}
 */
var PlayPauseControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_playPause.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(PlayPauseControl, _BaseComponent);

  /**
   * Creates an instance of PlayPauseControl.
   * @param {Object} obj obj
   * @memberof PlayPauseControl
   */
  function PlayPauseControl(obj) {
    _classCallCheck(this, PlayPauseControl);

    return _possibleConstructorReturn(this, (PlayPauseControl.__proto__ || Object.getPrototypeOf(PlayPauseControl)).call(this, { name: 'PlayPause', player: obj.player }));
  }

  /**
   * toggle play / pause
   *
   * @returns {void}
   * @memberof PlayPauseControl
   */


  _createClass(PlayPauseControl, [{
    key: 'togglePlayPause',
    value: function togglePlayPause() {
      this.logger.debug('Toggle play');
      this.isPlayingAdOrPlayback() ? this.player.pause() : this.player.play();
    }

    /**
     * check if currently playing ad or playback
     *
     * @returns {boolean} - if currently playing ad or playback
     * @memberof PlayPauseControl
     */

  }, {
    key: 'isPlayingAdOrPlayback',
    value: function isPlayingAdOrPlayback() {
      return this.props.adBreak && this.props.adIsPlaying || !this.props.adBreak && this.props.isPlaying;
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof PlayPauseControl
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this2 = this;

      var controlButtonClass = this.isPlayingAdOrPlayback() ? 'control-button is-playing' : 'control-button';

      return (0, _preact.h)(
        'div',
        { className: 'control-button-container control-play-pause' },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: this.isPlayingAdOrPlayback() ? 'controls.pause' : 'controls.play' }),
              className: controlButtonClass,
              onClick: function onClick() {
                return _this2.togglePlayPause();
              }
            },
            props.isEnded && !props.adBreak ? (0, _preact.h)(_icon2.default, { type: _icon.IconType.Startover }) : (0, _preact.h)(
              'div',
              null,
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Play }),
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Pause })
            )
          )
        )
      );
    }
  }]);

  return PlayPauseControl;
}(_base2.default)) || _class);
exports.default = PlayPauseControl;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):e.dlv=n()}(this,function(){function e(e,n,t,o){for(o=0,n=n.split?n.split("."):n;e&&o<n.length;)e=e[n[o++]];return void 0===e?t:e}return e});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _seekbarPlaybackContainer = __webpack_require__(73);

var _seekbarPlaybackContainer2 = _interopRequireDefault(_seekbarPlaybackContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _seekbarPlaybackContainer2.default;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _seekbar = __webpack_require__(10);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _seekbar2 = __webpack_require__(11);

var _seekbar3 = _interopRequireDefault(_seekbar2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTime: state.seekbar.currentTime,
    duration: state.engine.duration,
    isDraggingActive: state.seekbar.draggingActive,
    isMobile: state.shell.isMobile,
    poster: state.engine.poster
  };
};

/**
 * SeekBarPlaybackContainer component
 *
 * @class SeekBarPlaybackContainer
 * @example <SeekBarPlaybackContainer player={this.player} />
 * @extends {BaseComponent}
 */
var SeekBarPlaybackContainer = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_seekbar.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(SeekBarPlaybackContainer, _BaseComponent);

  /**
   * Creates an instance of SeekBarPlaybackContainer.
   * @param {Object} obj obj
   * @memberof SeekBarPlaybackContainer
   */
  function SeekBarPlaybackContainer(obj) {
    _classCallCheck(this, SeekBarPlaybackContainer);

    return _possibleConstructorReturn(this, (SeekBarPlaybackContainer.__proto__ || Object.getPrototypeOf(SeekBarPlaybackContainer)).call(this, { name: 'SeekBarPlaybackContainer', player: obj.player }));
  }

  /**
   * after component mounted, listen to time update event and if dragging not active,
   * update the current time in the store
   *
   * @returns {void}
   * @memberof SeekBarPlaybackContainer
   */


  _createClass(SeekBarPlaybackContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.player.addEventListener(this.player.Event.TIME_UPDATE, function () {
        if (!_this2.props.isDraggingActive) {
          _this2.props.updateCurrentTime(_this2.player.currentTime);
        }
      });
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof SeekBarPlaybackContainer
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return (0, _preact.h)(_seekbar3.default, {
        playerElement: this.player.getView().parentElement,
        showFramePreview: this.props.showFramePreview,
        showTimeBubble: this.props.showTimeBubble,
        changeCurrentTime: function changeCurrentTime(time) {
          return _this3.player.currentTime = time;
        },
        playerPoster: this.props.poster,
        updateSeekbarDraggingStatus: function updateSeekbarDraggingStatus(data) {
          return _this3.props.updateSeekbarDraggingStatus(data);
        },
        updateCurrentTime: function updateCurrentTime(data) {
          return _this3.props.updateCurrentTime(data);
        },

        currentTime: this.props.currentTime,
        duration: this.props.duration,
        isDraggingActive: this.props.isDraggingActive,
        isMobile: this.props.isMobile
      });
    }
  }]);

  return SeekBarPlaybackContainer;
}(_base2.default)) || _class);
exports.default = SeekBarPlaybackContainer;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _timeFormat = __webpack_require__(19);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SeekBarControl component
 *
 * @class SeekBarControl
 * @example <SeekBarControl
 *  playerElement={this.player.getView().parentElement}
 *  showFramePreview={this.props.showFramePreview}
 *  showTimeBubble={this.props.showTimeBubble}
 *  changeCurrentTime={time => this.player.currentTime = time}
 *  playerPoster={this.props.poster}
 *  updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
 *  updateCurrentTime={data => this.props.updateCurrentTime(data)}
 *  currentTime={this.props.currentTime}
 *  duration={this.props.duration}
 *  isDraggingActive={this.props.isDraggingActive}
 *  isMobile={this.props.isMobile}
 * />
 * @extends {Component}
 */
var SeekBarControl = function (_Component) {
  _inherits(SeekBarControl, _Component);

  function SeekBarControl() {
    _classCallCheck(this, SeekBarControl);

    return _possibleConstructorReturn(this, (SeekBarControl.__proto__ || Object.getPrototypeOf(SeekBarControl)).apply(this, arguments));
  }

  _createClass(SeekBarControl, [{
    key: 'componentWillMount',


    /**
     * before component mounted, set initial state
     *
     * @returns {void}
     * @memberof SeekBarControl
     */
    value: function componentWillMount() {
      this.setState({ virtualTime: 0 });
    }

    /**
     * on component update, check if playerPostaer configured and framePreviewImg not set yet,
     * if true, update the frame preview image
     *
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.playerPoster && !this.framePreviewImg) {
        this.framePreviewImg = this.getFramePreviewImg();
      }
    }

    /**
     * seekbar mouse down handler
     *
     * @param {Event} e - mouse down event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarMouseDown',
    value: function onSeekbarMouseDown(e) {
      if (this.props.isMobile) return;

      this.props.updateSeekbarDraggingStatus(true);
      if (this.props.isDraggingActive) {
        var time = this.getTime(e);
        this.updateSeekBarProgress(time, this.props.duration);
      }
    }

    /**
     * seekbar mouse up handler
     *
     * @param {Event} e - mouse up event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarMouseUp',
    value: function onSeekbarMouseUp(e) {
      if (this.props.isMobile) return;

      var time = this.getTime(e);
      this.props.changeCurrentTime(time);
      this.updateSeekBarProgress(time, this.props.duration);
      this.props.updateSeekbarDraggingStatus(false);
    }

    /**
     * seekbar mouse move handler
     *
     * @param {Event} e - mouse move event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarMouseMove',
    value: function onSeekbarMouseMove(e) {
      if (this.props.isMobile) return;

      var time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration, true);

      if (this.props.isDraggingActive) {
        this.updateSeekBarProgress(time, this.props.duration);
      }
    }

    /**
     * seekbar touch start handler
     *
     * @param {Event} e - touch start event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarTouchStart',
    value: function onSeekbarTouchStart(e) {
      this.props.updateSeekbarDraggingStatus(true);
      if (this.props.isDraggingActive) {
        var time = this.getTime(e);
        this.updateSeekBarProgress(time, this.props.duration);
      }
    }

    /**
     * seekbar touch move handler
     *
     * @param {Event} e - touch move event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarTouchMove',
    value: function onSeekbarTouchMove(e) {
      var time = this.getTime(e);
      this._movex = time;
      this.updateSeekBarProgress(time, this.props.duration, true);

      if (this.props.isDraggingActive) {
        this.updateSeekBarProgress(time, this.props.duration);
      }
    }

    /**
     * seekbar touch end handler
     *
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarTouchEnd',
    value: function onSeekbarTouchEnd() {
      if (this.props.isDraggingActive) {
        var time = this._movex;
        this.props.changeCurrentTime(time);
        this.updateSeekBarProgress(time, this.props.duration);
      }
      this.props.updateSeekbarDraggingStatus(false);
    }

    /**
     * abstract function to update virtual progress ui using component state or report to upper component of time change
     *
     * @param {number} currentTime - current time
     * @param {number} duration - duration
     * @param {boolean} [virtual=false] - virtual relates to the hover seekbar position
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'updateSeekBarProgress',
    value: function updateSeekBarProgress(currentTime, duration) {
      var virtual = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (virtual) {
        this.setState({ virtualTime: currentTime });
      } else {
        this.props.updateCurrentTime(currentTime);
      }
    }

    /**
     * utility function to get element offset from window
     *
     * @param {*} element - element to get the offset for
     * @returns {{ top: number, left: number }} - object with offset in both asixs
     * @memberof SeekBarControl
     */

  }, {
    key: 'getOffset',
    value: function getOffset(element) {
      var _x = 0;
      var _y = 0;
      while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
        _x += element.offsetLeft - element.scrollLeft;
        _y += element.offsetTop - element.scrollTop;
        element = element.offsetParent;
      }
      return { top: _y, left: _x };
    }

    /**
     * get current time based on position of the mouseEvent on the seekbar
     *
     * @param {*} e - event
     * @returns {number} - current time in seconds
     * @memberof SeekBarControl
     */

  }, {
    key: 'getTime',
    value: function getTime(e) {
      var xPosition = e.touches ? e.touches[0].clientX : e.clientX;
      var time = this.props.duration * ((xPosition - this._seekBarElement.offsetLeft - this.getOffset(this.props.playerElement).left) / this._seekBarElement.clientWidth);
      time = parseFloat(time.toFixed(2));
      if (time < 0) return 0;
      if (time > this.props.duration) return this.props.duration;
      return time;
    }

    /**
     * utility function to get the thumb sprite background position
     *
     * @returns {string} background-position string value
     * @memberof SeekBarControl
     */

  }, {
    key: 'getThumbSpriteOffset',
    value: function getThumbSpriteOffset() {
      return -(Math.ceil(100 * this.state.virtualTime / this.props.duration) * 160) + 'px 0px';
    }

    /**
     * get the left position the frame preview element should be in
     *
     * @returns {number} left position
     * @memberof SeekBarControl
     */

  }, {
    key: 'getFramePreviewOffset',
    value: function getFramePreviewOffset() {
      if (this._seekBarElement) {
        var leftOffset = this.state.virtualTime / this.props.duration * this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth / 2;
        if (leftOffset < 0) return 0;else if (leftOffset > this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth) return this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth;else return leftOffset;
      } else return 0;
    }

    /**
     * get the left position to time bubble should be in
     *
     * @returns {number} left position
     * @memberof SeekBarControl
     */

  }, {
    key: 'getTimeBubbleOffset',
    value: function getTimeBubbleOffset() {
      if (this._timeBubbleElement) {
        var leftOffset = this.state.virtualTime / this.props.duration * this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth / 2;
        if (leftOffset < 0) return 0;else if (leftOffset > this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth) return this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth;else return leftOffset;
      } else return 0;
    }

    /**
     * get the frame preview sprite based on player poster
     *
     * @returns {string} image url
     * @memberof SeekBarControl
     */

  }, {
    key: 'getFramePreviewImg',
    value: function getFramePreviewImg() {
      var parts = this.props.playerPoster.split('/');
      var heightValueIndex = parts.indexOf('height') + 1;
      var widthValueIndex = parts.indexOf('width') + 1;
      parts[heightValueIndex] = 90;
      parts[widthValueIndex] = 160;
      parts.push('vid_slices/100');

      return parts.join('/');
    }

    /**
     * render frame preview
     *
     * @returns {React$Element} - component
     * @memberof SeekBarControl
     */

  }, {
    key: 'renderFramePreview',
    value: function renderFramePreview() {
      var _this2 = this;

      if (!this.props.showFramePreview || this.props.isMobile) return undefined;
      var framePreviewStyle = 'left: ' + this.getFramePreviewOffset() + 'px';
      var framePreviewImgStyle = 'background-image: url(' + this.framePreviewImg + '); ';
      framePreviewImgStyle += 'background-position: ' + this.getThumbSpriteOffset();

      return (0, _preact.h)(
        'div',
        {
          className: 'frame-preview',
          style: framePreviewStyle,
          ref: function ref(c) {
            return _this2._framePreviewElement = c;
          }
        },
        (0, _preact.h)('div', { className: 'frame-preview-img', style: framePreviewImgStyle })
      );
    }

    /**
     * render time bubble
     *
     * @returns {React$Element} - component
     * @memberof SeekBarControl
     */

  }, {
    key: 'renderTimeBubble',
    value: function renderTimeBubble() {
      var _this3 = this;

      if (!this.props.showTimeBubble || this.props.isMobile) return undefined;
      var timeBubbleStyle = 'left: ' + this.getTimeBubbleOffset() + 'px';
      var timeBubbleValue = this.props.isDvr ? '-' + (0, _timeFormat.toHHMMSS)(this.props.duration - this.state.virtualTime) : (0, _timeFormat.toHHMMSS)(this.state.virtualTime);
      return (0, _preact.h)(
        'div',
        { className: 'time-preview', style: timeBubbleStyle, ref: function ref(c) {
            return _this3._timeBubbleElement = c;
          } },
        timeBubbleValue
      );
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component
     * @memberof SeekBarControl
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this4 = this;

      var virtualProgressWidth = this.state.virtualTime / props.duration * 100 + '%';
      var progressWidth = props.currentTime / props.duration * 100 + '%';
      var seekbarStyleClass = 'seek-bar';
      if (props.adBreak) seekbarStyleClass += ' ad-break';
      if (props.isDvr) seekbarStyleClass += ' live';
      if (props.isMobile) seekbarStyleClass += ' hover';

      return (0, _preact.h)(
        'div',
        {
          className: seekbarStyleClass,
          ref: function ref(c) {
            return _this4._seekBarElement = c;
          },
          role: 'slider',
          'aria-label': 'Seek slider',
          'aria-valuemin': '0',
          'aria-valuemax': Math.round(this.props.duration),
          'aria-valuenow': Math.round(this.props.currentTime),
          'aria-valuetext': (0, _timeFormat.toHHMMSS)(this.props.currentTime) + ' of ' + (0, _timeFormat.toHHMMSS)(this.props.duration),
          onMouseMove: function onMouseMove(e) {
            return _this4.onSeekbarMouseMove(e);
          },
          onMouseDown: function onMouseDown(e) {
            return _this4.onSeekbarMouseDown(e);
          },
          onMouseUp: function onMouseUp(e) {
            return _this4.onSeekbarMouseUp(e);
          },
          onTouchStart: function onTouchStart(e) {
            return _this4.onSeekbarTouchStart(e);
          },
          onTouchMove: function onTouchMove(e) {
            return _this4.onSeekbarTouchMove(e);
          },
          onTouchEnd: function onTouchEnd() {
            return _this4.onSeekbarTouchEnd();
          }
        },
        (0, _preact.h)(
          'div',
          { className: 'progress-bar' },
          (0, _preact.h)(
            'div',
            { className: 'progress', style: { width: progressWidth } },
            props.adBreak ? undefined : (0, _preact.h)('a', { className: 'scrubber' })
          ),
          (0, _preact.h)('div', { className: 'virtual-progress', style: { width: virtualProgressWidth } }),
          this.renderTimeBubble(),
          this.renderFramePreview(),
          (0, _preact.h)('div', { className: 'buffered', style: 'width: 60%;' })
        )
      );
    }
  }]);

  return SeekBarControl;
}(_preact.Component);

exports.default = SeekBarControl;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _volume = __webpack_require__(37);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    isDraggingActive: state.volume.draggingActive,
    volume: state.volume.volume,
    muted: state.volume.muted,
    isMobile: state.shell.isMobile
  };
};

/**
 * VolumeControl component
 *
 * @class VolumeControl
 * @example <VolumeControl player={this.player} />
 * @extends {BaseComponent}
 */
var VolumeControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_volume.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(VolumeControl, _BaseComponent);

  /**
   * Creates an instance of VolumeControl.
   *
   * @constructor
   * @param {Object} obj obj
   * @memberof VolumeControl
   */
  function VolumeControl(obj) {
    _classCallCheck(this, VolumeControl);

    return _possibleConstructorReturn(this, (VolumeControl.__proto__ || Object.getPrototypeOf(VolumeControl)).call(this, { name: 'Volume', player: obj.player }));
  }

  /**
   * after component mounted, update initial volume and muted value and listen to volume change
   *
   * @method componentDidMount
   * @returns {void}
   * @memberof VolumeControl
   */


  _createClass(VolumeControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.player.addEventListener(this.player.Event.LOADED_METADATA, function () {
        _this2.props.updateVolume(_this2.player.volume);
        _this2.props.updateMuted(_this2.player.muted);
      });

      this.player.addEventListener(this.player.Event.VOLUME_CHANGE, function () {
        _this2.props.updateVolume(_this2.player.volume);
      });
    }

    /**
     * get the volume progress bar height percentage string
     *
     * @method getVolumeProgessHeight
     * @returns {string} - volume progress bar new height based on volume
     * @memberof VolumeControl
     */

  }, {
    key: 'getVolumeProgessHeight',
    value: function getVolumeProgessHeight() {
      return this.props.muted ? '0%' : Math.round(this.props.volume * 100) + '%';
    }

    /**
     * on volume progress bar mouse down, update volume dragging status in store state
     *
     * @method onVolumeProgressBarMouseDown
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeProgressBarMouseDown',
    value: function onVolumeProgressBarMouseDown() {
      this.props.updateVolumeDraggingStatus(true);
    }

    /**
     * on volume progress bar mouse move, update the volume if dragging is active
     *
     * @method onVolumeProgressBarMouseMove
     * @param {Event} e - mouse move event
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeProgressBarMouseMove',
    value: function onVolumeProgressBarMouseMove(e) {
      if (this.props.isDraggingActive) {
        this.changeVolume(e);
      }
    }

    /**
     * on volume progress bar mouse up, update the volume and change the dragging status to false
     *
     * @method onVolumeProgressBarMouseUp
     * @param {Event} e - mouse up event
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeProgressBarMouseUp',
    value: function onVolumeProgressBarMouseUp(e) {
      this.props.updateVolumeDraggingStatus(false);
      this.changeVolume(e);
    }

    /**
     * on colume control button click, toggle mute in player and store state
     *
     * @method onVolumeControlButtonClick
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeControlButtonClick',
    value: function onVolumeControlButtonClick() {
      this.logger.debug('Toggle mute. ' + this.player.muted + ' => ' + !this.player.muted);
      this.props.updateMuted(!this.props.muted);
      this.player.muted = !this.player.muted;
    }

    /**
     * change volume based on event mouse position compared to volume progress bar element
     * if muted value is true in store state, change it to false both in store state and in player instance.
     *
     * @method changeVolume
     * @param {Event} e - event to get the position from
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'changeVolume',
    value: function changeVolume(e) {
      var barHeight = this._volumeProgressBarElement.clientHeight;
      var topY = this.getCoords(this._volumeProgressBarElement).top;
      var clickY = e.clientY;
      var volume = 1 - (clickY - topY) / barHeight;
      volume = parseFloat(volume.toFixed(2));
      this.logger.debug('Change volume from ' + this.player.volume + ' => ' + volume);
      this.player.volume = volume;
      if (this.props.muted) {
        this.player.muted = false;
        this.props.updateMuted(false);
      }
    }

    /**
     * get element cordinates
     *
     * @method getCoords
     * @param {HTMLElement} el element to inspect
     * @returns {{top: number, left: number}} object with the top and left position
     * @memberof VolumeControl
     */

  }, {
    key: 'getCoords',
    value: function getCoords(el) {
      var box = el.getBoundingClientRect();

      return {
        top: box.top,
        left: box.left
      };
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof VolumeControl
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var controlButtonClass = 'control-button-container volume-control';
      if (this.props.isDraggingActive) controlButtonClass += ' dragging-active';
      if (this.props.muted || this.props.volume === 0) controlButtonClass += ' is-muted';

      return (0, _preact.h)(
        'div',
        { ref: function ref(c) {
            return _this3._volumeControlElement = c;
          }, className: controlButtonClass },
        (0, _preact.h)(
          'button',
          { className: 'control-button', onClick: function onClick() {
              return _this3.onVolumeControlButtonClick();
            }, 'aria-label': 'Volume' },
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeBase }),
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeWaves }),
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeMute })
        ),
        (0, _preact.h)(
          'div',
          { className: 'volume-control-bar', role: 'slider',
            'aria-valuemin': '0', 'aria-valuemaz': '100', 'aria-valuenow': this.player.volume * 100,
            'aria-valuetext': this.player.volume * 100 + '% volume ' + (this.player.muted ? 'muted' : '') },
          (0, _preact.h)(
            'div',
            {
              className: 'bar',
              ref: function ref(c) {
                return _this3._volumeProgressBarElement = c;
              },
              onMouseDown: function onMouseDown() {
                return _this3.onVolumeProgressBarMouseDown();
              },
              onMouseUp: function onMouseUp(e) {
                return _this3.onVolumeProgressBarMouseUp(e);
              },
              onMouseMove: function onMouseMove(e) {
                return _this3.onVolumeProgressBarMouseMove(e);
              }
            },
            (0, _preact.h)('div', { className: 'progress', style: { height: this.getVolumeProgessHeight() } })
          )
        )
      );
    }
  }]);

  return VolumeControl;
}(_base2.default)) || _class);
exports.default = VolumeControl;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(5);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _settings = __webpack_require__(38);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _smartContainer = __webpack_require__(39);

var _smartContainer2 = _interopRequireDefault(_smartContainer);

var _smartContainerItem = __webpack_require__(40);

var _smartContainerItem2 = _interopRequireDefault(_smartContainerItem);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultSpeeds = [0.5, 1, 2, 4];

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    videoTracks: state.engine.videoTracks,
    isMobile: state.shell.isMobile,
    isLive: state.engine.isLive
  };
};

/**
 * SettingsControl component
 *
 * @class SettingsControl
 * @example <SettingsControl player={this.player} />
 * @extends {BaseComponent}
 */
var SettingsControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_settings.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(SettingsControl, _BaseComponent);

  /**
   * Creates an instance of SettingsControl.
   * @param {Object} obj obj
   * @memberof SettingsControl
   */
  function SettingsControl(obj) {
    _classCallCheck(this, SettingsControl);

    return _possibleConstructorReturn(this, (SettingsControl.__proto__ || Object.getPrototypeOf(SettingsControl)).call(this, { name: 'Settings', player: obj.player }));
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof SettingsControl
   */


  _createClass(SettingsControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ smartContainerOpen: false });
    }

    /**
     * after component mounted, set event listener to click outside of the component
     *
     * @returns {void}
     * @memberof SettingsControl
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    /**
     * before component unmounted, remove event listener
     *
     * @returns {void}
     * @memberof SettingsControl
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this));
    }

    /**
     * event listener for clicking outside handler.
     *
     * @param {*} e - click event
     * @returns {void}
     * @memberof SettingsControl
     */

  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      if (!this.props.isMobile && !!this._controlSettingsElement && !this._controlSettingsElement.contains(event.target) && this.state.smartContainerOpen) {
        if (e.target.classList.contains('overlay-play')) {
          e.stopPropagation();
        }
        this.setState({ smartContainerOpen: false });
      }
    }

    /**
     * toggle smart container internal state on control button click
     *
     * @returns {void}
     * @memberof SettingsControl
     */

  }, {
    key: 'onControlButtonClick',
    value: function onControlButtonClick() {
      this.setState({ smartContainerOpen: !this.state.smartContainerOpen });
    }

    /**
     * change player playback rate and update it in the store state
     *
     * @param {number} playbackRate - playback rate value
     * @returns {void}
     * @memberof SettingsControl
     */

  }, {
    key: 'onSpeedChange',
    value: function onSpeedChange(playbackRate) {
      this.props.updateSpeed(playbackRate);
      this.player.playbackRate = playbackRate;
    }

    /**
     * change quality track or if value is 'auto', enable player adaptive bitrate
     *
     * @param {(Object | string)} videoTrack - video track
     * @returns {void}
     * @memberof SettingsControl
     */

  }, {
    key: 'onQualityChange',
    value: function onQualityChange(videoTrack) {
      if (videoTrack === 'auto') {
        this.player.enableAdaptiveBitrate();
      } else {
        this.player.selectTrack(videoTrack);
      }
    }

    /**
     * get the quality option label with fallbacks by optional configuration
     *
     * @param {Object} t - video track
     * @returns {string} - quality option label
     * @memberof SettingsControl
     */

  }, {
    key: 'getQualityOptionLabel',
    value: function getQualityOptionLabel(t) {
      var resolution = t.height ? t.height + 'p' : undefined;
      var mbs = t.bandwidth ? (t.bandwidth / 1000000).toPrecision(2) + 'Mbs' : undefined;

      if (!this.props.qualityType) {
        return resolution || mbs || 'N/A';
      } else if (this.props.qualityType.toUpperCase() === 'MBS' && mbs) {
        return mbs;
      } else if (this.props.qualityType.toUpperCase() === 'RESOLUTION' && resolution) {
        return t.height + 'p';
      } else if (t.label) {
        return t.label;
      } else {
        return 'N/A';
      }
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof SettingsControl
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this2 = this;

      var speedOptions = defaultSpeeds.reduce(function (acc, speed) {
        var speedOption = {
          value: speed,
          label: speed === 1 ? 'Normal' : speed,
          active: false
        };
        if (speed === _this2.player.playbackRate) {
          speedOption.active = true;
        }
        acc.push(speedOption);
        return acc;
      }, []);

      var qualityOptions = props.videoTracks.filter(function (t) {
        return t.bandwidth || t.height;
      }).sort(function (a, b) {
        return a.bandwidth < b.bandwidth;
      }).map(function (t) {
        return {
          label: _this2.getQualityOptionLabel(t),
          active: !_this2.player.isAdaptiveBitrateEnabled() && t.active,
          value: t
        };
      });

      if (qualityOptions.length > 1) {
        qualityOptions.unshift({
          label: 'Auto',
          active: this.player.isAdaptiveBitrateEnabled(),
          value: 'auto'
        });
      }

      if (props.isLive && qualityOptions.length === 0) return undefined;

      return (0, _preact.h)(
        'div',
        {
          ref: function ref(c) {
            return _this2._controlSettingsElement = c;
          },
          className: 'control-button-container control-settings'
        },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.settings' }),
              className: this.state.smartContainerOpen ? 'control-button active' : 'control-button',
              onClick: function onClick() {
                return _this2.onControlButtonClick();
              }
            },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.Settings })
          )
        ),
        !this.state.smartContainerOpen ? '' : (0, _preact.h)(
          _smartContainer2.default,
          { title: 'Settings', onClose: function onClose() {
              return _this2.onControlButtonClick();
            } },
          qualityOptions.length === 0 ? '' : (0, _preact.h)(
            _preactI18n.Localizer,
            null,
            (0, _preact.h)(_smartContainerItem2.default, { icon: 'quality', label: (0, _preact.h)(_preactI18n.Text, { id: 'settings.quality' }), options: qualityOptions, onSelect: function onSelect(o) {
                return _this2.onQualityChange(o);
              } })
          ),
          props.isLive ? '' : (0, _preact.h)(
            _preactI18n.Localizer,
            null,
            (0, _preact.h)(_smartContainerItem2.default, { icon: 'speed', label: (0, _preact.h)(_preactI18n.Text, { id: 'settings.speed' }), options: speedOptions, onSelect: function onSelect(o) {
                return _this2.onSpeedChange(o);
              } })
          )
        )
      );
    }
  }]);

  return SettingsControl;
}(_base2.default)) || _class);
exports.default = SettingsControl;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _preactPortal = __webpack_require__(21);

var _preactPortal2 = _interopRequireDefault(_preactPortal);

var _overlay = __webpack_require__(22);

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    isMobile: state.shell.isMobile
  };
};

/**
 * SmartContainer component
 *
 * @class SmartContainer
 * @example <SmartContainer title='Language' onClose={() => this.controlButtonClickHandler()}>
 *   <SmartContainerItem
 *     icon={IconType.Audio}
 *     label='Audio'
 *     options={audioTrackOptions}
 *     onSelect={audioTrack => this.audioTrackChangeHandler(audioTrack)}
 *   />
 *   ...
 * </SmartContainer>
 * @extends {Component}
 */
var SmartContainer = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_Component) {
  _inherits(SmartContainer, _Component);

  function SmartContainer() {
    _classCallCheck(this, SmartContainer);

    return _possibleConstructorReturn(this, (SmartContainer.__proto__ || Object.getPrototypeOf(SmartContainer)).apply(this, arguments));
  }

  _createClass(SmartContainer, [{
    key: 'render',


    /**
     * if mobile detected, smart container representation is an overlay. hence, render overlay with its children.
     * otherwise, render smart container
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof SmartContainer
     */
    value: function render(props) {
      return props.isMobile ? (0, _preact.h)(
        _preactPortal2.default,
        { into: '#overlay-portal' },
        (0, _preact.h)(
          _overlay2.default,
          { open: true, onClose: function onClose() {
              return props.onClose();
            } },
          (0, _preact.h)(
            'div',
            { className: 'title' },
            props.title
          ),
          props.children
        )
      ) : (0, _preact.h)(
        'div',
        { className: 'smart-container top left' },
        props.children
      );
    }
  }]);

  return SmartContainer;
}(_preact.Component)) || _class);
exports.default = SmartContainer;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(5);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _shell = __webpack_require__(6);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Overlay component
 * @class Overlay
 * @example <Overlay
 *  type='share'
 *  onClose={() => this.closeShareOverlay()}
 * >
 *  ...
 * </Overlay>
 * @extends {Component}
 */
var Overlay = (_dec = (0, _preactRedux.connect)(null, (0, _bindActions.bindActions)(_shell.actions)), _dec(_class = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: 'componentWillMount',


    /**
     * componentWillMount
     *
     * @returns {void}
     * @memberof Overlay
     */
    value: function componentWillMount() {
      this.props.addPlayerClass('overlay-active');
    }

    /**
     * componentWillUnmount
     *
     * @returns {void}
     * @memberof Overlay
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.removePlayerClass('overlay-active');
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component
     * @memberof Overlay
     */

  }, {
    key: 'render',
    value: function render(props) {
      var overlayClass = 'overlay';
      if (props.type) overlayClass += ' ' + props.type + '-overlay';
      if (props.open) overlayClass += ' active';

      return (0, _preact.h)(
        'div',
        { className: overlayClass, role: 'dialog' },
        (0, _preact.h)(
          'div',
          { className: 'overlay-contents' },
          props.children
        ),
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'a',
            { onClick: function onClick() {
                return props.onClose();
              }, 'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'core.close' }), className: 'close-overlay' },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.Close })
          )
        )
      );
    }
  }]);

  return Overlay;
}(_preact.Component)) || _class);
exports.default = Overlay;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _menu = __webpack_require__(80);

var _menu2 = _interopRequireDefault(_menu);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    isMobile: state.shell.isMobile
  };
};

/**
 * DropDown component
 *
 * @class DropDown
 * @example <DropDown options={this.videoTrackOptions} />
 * @extends {Component}
 */
var DropDown = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_Component) {
  _inherits(DropDown, _Component);

  function DropDown() {
    _classCallCheck(this, DropDown);

    return _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).apply(this, arguments));
  }

  _createClass(DropDown, [{
    key: 'componentWillMount',


    /**
     * before component mounted, set initial internal state
     *
     * @returns {void}
     * @memberof DropDown
     */
    value: function componentWillMount() {
      this.setState({ dropMenuActive: false });
    }

    /**
     * is given option selected
     *
     * @param {Object} option - option object
     * @returns {boolean} - is the option selected
     * @memberof DropDown
     */

  }, {
    key: 'isSelected',
    value: function isSelected(option) {
      return option.active;
    }

    /**
     * on option select - pass the selected option to upper component through props and close the menu
     *
     * @param {Object} option - option object
     * @returns {void}
     * @memberof DropDown
     */

  }, {
    key: 'onSelect',
    value: function onSelect(option) {
      this.props.onSelect(option);
      this.setState({ dropMenuActive: false });
    }

    /**
     * listener function from Menu component to close the dropdown menu.
     * set the internal state of dropMenuActive to false.
     *
     * @returns {void}
     * @memberof DropDown
     */

  }, {
    key: 'onClose',
    value: function onClose() {
      this.setState({ dropMenuActive: false });
    }

    /**
     * get active option label or first option's label
     *
     * @returns {string} - active option label
     * @memberof DropDown
     */

  }, {
    key: 'getActiveOptionLabel',
    value: function getActiveOptionLabel() {
      var activeOptions = this.props.options.filter(function (t) {
        return t.active;
      });
      try {
        return activeOptions[0].label;
      } catch (e) {
        return this.props.options[0].label || 'Unlabled';
      }
    }

    /**
     * render for menu only which will render a native select element in this case (mobile)
     *
     * @returns {React$Element} - component element
     * @memberof DropDown
     */

  }, {
    key: 'renderNativeSelect',
    value: function renderNativeSelect() {
      var _this2 = this;

      return (0, _preact.h)(_menu2.default, {
        options: this.props.options,
        onSelect: function onSelect(o) {
          return _this2.onSelect(o);
        },
        onClose: function onClose() {
          return _this2.onClose();
        }
      });
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof DropDown
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this3 = this;

      return props.isMobile ? this.renderNativeSelect() : (0, _preact.h)(
        'div',
        { className: this.state.dropMenuActive ? 'dropdown active' : 'dropdown' },
        (0, _preact.h)(
          'div',
          { className: 'dropdown-button', onClick: function onClick() {
              return _this3.setState({ dropMenuActive: !_this3.state.dropMenuActive });
            } },
          this.getActiveOptionLabel(),
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.ArrowDown })
        ),
        !this.state.dropMenuActive ? undefined : (0, _preact.h)(_menu2.default, {
          options: props.options,
          onSelect: function onSelect(o) {
            return _this3.onSelect(o);
          },
          onClose: function onClose() {
            return _this3.onClose();
          }
        })
      );
    }
  }]);

  return DropDown;
}(_preact.Component)) || _class);
exports.default = DropDown;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _menu = __webpack_require__(81);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _menu2.default;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _preactRedux = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    isMobile: state.shell.isMobile
  };
};

/**
 * Menu component
 *
 * @class Menu
 * @example <Menu
 *  options={this.videoTrackOptions}
 *  onSelect={track => this.videoTrackChangeHandler(track)}
 *  onClose={() => this.onClose()}
 * />
 * @extends {Component}
 */
var Menu = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'componentDidMount',


    /**
     * after component mounted, listen to click outside of the component
     * @returns {void}
     * @memberof Menu
     */
    value: function componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    /**
     * before component unmount, remove the event listener
     *
     * @returns {void}
     * @memberof Menu
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this));
    }

    /**
     * handler to click outside of the component event listener.
     * if not mobile device and clicked outside the component, call the onClose callback
     *
     * @param {*} e click event
     * @returns {void}
     * @memberof Menu
     */

  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      if (!this.props.isMobile && this._menuElement && !this._menuElement.contains(event.target)) {

        if (e.target.classList.contains('overlay-play') || e.target.parentElement.getElementsByClassName('dropdown-menu')[0] === this._menuElement) {
          e.stopPropagation();
        }
        this.props.onClose();
      }
    }

    /**
     * indication if option is active or not
     *
     * @param {Object} option option object
     * @returns {boolean} is option active boolean
     * @memberof Menu
     */

  }, {
    key: 'isSelected',
    value: function isSelected(option) {
      return option.active;
    }

    /**
     * when option selected, change the active prop immediately for instant ui change
     * and call the onSelect callback with the option value
     *
     * @param {Object} option - option object
     * @returns {void}
     * @memberof Menu
     */

  }, {
    key: 'onSelect',
    value: function onSelect(option) {
      this.props.onSelect(option.value);

      // Instant select
      this.props.options.filter(function (t) {
        return t.active;
      }).forEach(function (option) {
        option.active = false;
      });
      this.props.options.filter(function (t) {
        return t.value === option.value;
      })[0].active = true;
    }

    /**
     * get active option label
     *
     * @returns {string} active option label
     * @memberof Menu
     */

  }, {
    key: 'getActiveOptionLabel',
    value: function getActiveOptionLabel() {
      var activeOptions = this.props.options.filter(function (t) {
        return t.active;
      });
      return activeOptions.length > 0 ? activeOptions[0].label : this.props.options[0].label;
    }

    /**
     * render native select element
     *
     * @returns {React$Element} - component element
     * @memberof Menu
     */

  }, {
    key: 'renderNativeSelect',
    value: function renderNativeSelect() {
      var _this2 = this;

      return (0, _preact.h)(
        'select',
        {
          className: this.props.hideSelect ? 'mobile-hidden-select' : '',
          onChange: function onChange(e) {
            return _this2.onSelect(_this2.props.options[e.target.value]);
          }
        },
        this.props.options.map(function (o, index) {
          return (0, _preact.h)(
            'option',
            { selected: _this2.isSelected(o), value: index, key: index },
            o.label
          );
        })
      );
    }

    /**
     * if mobile device detected, renders the native select element.
     * otherwise, render the styled menu
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof Menu
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this3 = this;

      return props.isMobile ? this.renderNativeSelect() : (0, _preact.h)(
        'div',
        {
          ref: function ref(c) {
            return _this3._menuElement = c;
          },
          className: 'dropdown-menu top left'
        },
        props.options.map(function (o, index) {
          return (0, _preact.h)(
            'div',
            { key: index, className: _this3.isSelected(o) ? 'dropdown-menu-item active' : 'dropdown-menu-item', onClick: function onClick() {
                return _this3.onSelect(o);
              } },
            (0, _preact.h)(
              'span',
              null,
              o.label
            ),
            (0, _preact.h)(
              'span',
              { style: 'opacity: ' + (_this3.isSelected(o) ? 1 : 0) },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            )
          );
        })
      );
    }
  }]);

  return Menu;
}(_preact.Component)) || _class);
exports.default = Menu;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(5);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _cvaa = __webpack_require__(24);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _smartContainer = __webpack_require__(39);

var _smartContainer2 = _interopRequireDefault(_smartContainer);

var _smartContainerItem = __webpack_require__(40);

var _smartContainerItem2 = _interopRequireDefault(_smartContainerItem);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _cvaaOverlay = __webpack_require__(83);

var _cvaaOverlay2 = _interopRequireDefault(_cvaaOverlay);

var _preactPortal = __webpack_require__(21);

var _preactPortal2 = _interopRequireDefault(_preactPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    audioTracks: state.engine.audioTracks,
    textTracks: state.engine.textTracks,
    overlayOpen: state.cvaa.overlayOpen,
    isMobile: state.shell.isMobile
  };
};

/**
 * LanguageControl component
 *
 * @class LanguageControl
 * @example <LanguageControl />
 * @extends {BaseComponent}
 */
var LanguageControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_cvaa.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(LanguageControl, _BaseComponent);

  /**
   * Creates an instance of LanguageControl.
   * @param {Object} obj obj
   * @memberof LanguageControl
   */
  function LanguageControl(obj) {
    _classCallCheck(this, LanguageControl);

    return _possibleConstructorReturn(this, (LanguageControl.__proto__ || Object.getPrototypeOf(LanguageControl)).call(this, { name: 'LanguageControl', player: obj.player }));
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof LanguageControl
   */


  _createClass(LanguageControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ smartContainerOpen: false });
    }

    /**
     * after component mounted, set event listener to click outside of the component
     *
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    /**
     * before component unmounted, remove event listener
     *
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    /**
     * event listener for clicking outside handler.
     *
     * @param {*} e - click event
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      if (this._controlLanguageElement && !this.props.isMobile && !this._controlLanguageElement.contains(event.target) && this.state.smartContainerOpen && !this.state.cvaaOverlay) {
        if (e.target.classList.contains('overlay-play')) {
          e.stopPropagation();
        }
        this.setState({ smartContainerOpen: false });
      }
    }

    /**
     * toggle smart container internal state on control button click
     *
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'onControlButtonClick',
    value: function onControlButtonClick() {
      this.setState({ smartContainerOpen: !this.state.smartContainerOpen });
    }

    /**
     * call to player selectTrack method and change audio track
     *
     * @param {Object} audioTrack - audio track
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'onAudioChange',
    value: function onAudioChange(audioTrack) {
      this.player.selectTrack(audioTrack);
    }

    /**
     * check if option is 'off', if it does- hideTextTrack called.
     * otherwise, selecting the given text track
     *
     * @param {(Object | string)} textTrack - text track or 'off' string
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'onCaptionsChange',
    value: function onCaptionsChange(textTrack) {
      if (textTrack === 'off') {
        this.player.hideTextTrack();
      } else {
        this.player.selectTrack(textTrack);
      }
    }

    /**
     * toggle the internal state of cvaa overlay
     *
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'toggleCVAAOverlay',
    value: function toggleCVAAOverlay() {
      this.setState({ cvaaOverlay: !this.state.cvaaOverlay });
    }

    /**
     * render smart container with both audio and text options if exist
     *
     * @param {Array<Object>} audioOptions - audio tracks
     * @param {Array<Object>} textOptions - text tracks
     * @returns {React$Element} - component
     * @memberof LanguageControl
     */

  }, {
    key: 'renderAll',
    value: function renderAll(audioOptions, textOptions) {
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        {
          ref: function ref(c) {
            return _this2._controlLanguageElement = c;
          },
          className: 'control-button-container control-language'
        },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.language' }),
              className: this.state.smartContainerOpen ? 'control-button active' : 'control-button',
              onClick: function onClick() {
                return _this2.onControlButtonClick();
              }
            },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.Language })
          )
        ),
        !this.state.smartContainerOpen || this.state.cvaaOverlay ? undefined : (0, _preact.h)(
          _smartContainer2.default,
          { title: 'Language', onClose: function onClose() {
              return _this2.onControlButtonClick();
            } },
          audioOptions.length === 0 ? undefined : (0, _preact.h)(
            _preactI18n.Localizer,
            null,
            (0, _preact.h)(_smartContainerItem2.default, {
              icon: 'audio',
              label: (0, _preact.h)(_preactI18n.Text, { id: 'language.audio' }),
              options: audioOptions,
              onSelect: function onSelect(audioTrack) {
                return _this2.onAudioChange(audioTrack);
              }
            })
          ),
          textOptions.length === 0 ? undefined : (0, _preact.h)(
            _preactI18n.Localizer,
            null,
            (0, _preact.h)(_smartContainerItem2.default, {
              icon: 'captions',
              label: (0, _preact.h)(_preactI18n.Text, { id: 'language.captions' }),
              options: textOptions,
              onSelect: function onSelect(textTrack) {
                return _this2.onCaptionsChange(textTrack);
              }
            })
          ),
          textOptions.length === 0 ? undefined : (0, _preact.h)(
            'div',
            { className: 'smart-container-item' },
            (0, _preact.h)(
              'a',
              { onClick: function onClick() {
                  return _this2.toggleCVAAOverlay();
                } },
              (0, _preact.h)(_preactI18n.Text, { id: 'language.advanced_captions_settings' })
            )
          )
        ),
        this.state.cvaaOverlay ? (0, _preact.h)(
          _preactPortal2.default,
          { into: '#overlay-portal' },
          (0, _preact.h)(_cvaaOverlay2.default, { onClose: function onClose() {
              return _this2.toggleCVAAOverlay();
            } })
        ) : null
      );
    }

    /**
     * root render function. will decide to render audio only / text only or both based on the available options
     *
     * @param {*} props - component props
     * @returns {React$Element} - component
     * @memberof LanguageControl
     */

  }, {
    key: 'render',
    value: function render(props) {
      var audioOptions = props.audioTracks.filter(function (t) {
        return t.label || t.language;
      }).map(function (t) {
        return { label: t.label || t.language, active: t.active, value: t };
      });
      var textOptions = props.textTracks.filter(function (t) {
        return t.kind === 'subtitles';
      }).map(function (t) {
        return { label: t.label || t.language, active: t.active, value: t };
      });

      if (textOptions.length > 0) {
        textOptions.push({
          label: 'Off',
          active: props.textTracks.filter(function (t) {
            return t.kind === 'subtitles' && t.active;
          }).length === 0,
          value: 'off'
        });
      }

      if (audioOptions.length > 0 || textOptions.length > 0) {
        return this.renderAll(audioOptions, textOptions);
      } else {
        return undefined;
      }
    }
  }]);

  return LanguageControl;
}(_base2.default)) || _class);
exports.default = LanguageControl;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _cvaaOverlay = __webpack_require__(84);

var _cvaaOverlay2 = _interopRequireDefault(_cvaaOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _cvaaOverlay2.default;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _cvaa = __webpack_require__(24);

var _shell = __webpack_require__(6);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _overlay = __webpack_require__(22);

var _overlay2 = _interopRequireDefault(_overlay);

var _dropdown = __webpack_require__(41);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    open: state.cvaa.overlayOpen,
    style: state.cvaa.style
  };
};

var cvaaOverlayState = {
  Main: 'main',
  CustomCaptions: 'custom-captions'
};

/**
 * CVAAOverlay component
 *
 * @class CVAAOverlay
 * @extends {BaseComponent}
 */
var CVAAOverlay = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_extends({}, _cvaa.actions, _shell.actions))), _dec(_class = function (_BaseComponent) {
  _inherits(CVAAOverlay, _BaseComponent);

  /**
   * Creates an instance of CVAAOverlay.
   * @memberof CVAAOverlay
   */
  function CVAAOverlay() {
    _classCallCheck(this, CVAAOverlay);

    return _possibleConstructorReturn(this, (CVAAOverlay.__proto__ || Object.getPrototypeOf(CVAAOverlay)).call(this, { name: 'CVAAOverlay' }));
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */


  _createClass(CVAAOverlay, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({
        state: cvaaOverlayState.Main
      });
    }

    /**
     * componentWillMount
     *
     * @returns {void}
     * @memberof CVAAOverlay
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        state: cvaaOverlayState.Main
      });
    }

    /**
     * changing the overlay state
     *
     * @param {CvaaOverlayStateType} stateName - the new state name
     * @returns {void}
     * @memberof CVAAOverlay
     */

  }, {
    key: 'transitionToState',
    value: function transitionToState(stateName) {
      this.setState({ state: stateName });
    }

    /**
     * changing the captions style
     *
     * @param {string} style - style name
     * @returns {void}
     * @memberof CVAAOverlay
     */

  }, {
    key: 'changeCaptionsStyle',
    value: function changeCaptionsStyle(style) {
      this.props.removePlayerClass('captions-' + this.props.style);
      this.props.addPlayerClass('captions-' + style);
      this.props.updateCaptionsStyle(style);
      this.props.onClose();
    }

    /**
     * render main state
     *
     * @returns {React$Element} - main state element
     * @memberof CVAAOverlay
     */

  }, {
    key: 'renderMainState',
    value: function renderMainState() {
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        { className: this.state.state === cvaaOverlayState.Main ? 'overlay-screen active' : 'overlay-screen' },
        (0, _preact.h)(
          'div',
          { className: 'title' },
          'Advanced captions settings'
        ),
        (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'div',
            { className: 'sample', onClick: function onClick() {
                return _this2.changeCaptionsStyle('default');
              } },
            'Sample'
          ),
          (0, _preact.h)(
            'div',
            { className: 'sample black-bg', onClick: function onClick() {
                return _this2.changeCaptionsStyle('black-bg');
              } },
            'Sample'
          ),
          (0, _preact.h)(
            'div',
            { className: 'sample yellow-text', onClick: function onClick() {
                return _this2.changeCaptionsStyle('yellow-text');
              } },
            'Sample'
          )
        ),
        (0, _preact.h)(
          'a',
          { className: 'button-save-cvaa', onClick: function onClick() {
              return _this2.transitionToState(cvaaOverlayState.CustomCaptions);
            } },
          'Set custom caption'
        )
      );
    }

    /**
     * render custom captions state
     *
     * @returns {React$Element} - custom captions elements
     * @memberof CVAAOverlay
     */

  }, {
    key: 'renderCustomCaptionsState',
    value: function renderCustomCaptionsState() {
      var speedOptions = [{ value: 1, label: 'Auto (360)', active: true }, { value: 2, label: '240' }, { value: 3, label: '144' }];

      return (0, _preact.h)(
        'div',
        { className: this.state.state === cvaaOverlayState.CustomCaptions ? 'overlay-screen active' : 'overlay-screen' },
        (0, _preact.h)(
          'form',
          { className: 'form custom-caption-form' },
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'label',
              null,
              'Size'
            ),
            (0, _preact.h)(_dropdown2.default, { options: speedOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'label',
              null,
              'Font color'
            ),
            (0, _preact.h)(_dropdown2.default, { options: speedOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'label',
              null,
              'Font opacity'
            ),
            (0, _preact.h)(_dropdown2.default, { options: speedOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'label',
              null,
              'Font family'
            ),
            (0, _preact.h)(_dropdown2.default, { options: speedOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'label',
              null,
              'Font style'
            ),
            (0, _preact.h)(_dropdown2.default, { options: speedOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'label',
              null,
              'Background color'
            ),
            (0, _preact.h)(_dropdown2.default, { options: speedOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'label',
              null,
              'Background opacity'
            ),
            (0, _preact.h)(_dropdown2.default, { options: speedOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: 'form-group-row' },
            (0, _preact.h)(
              'a',
              { className: 'btn btn-branded btn-block' },
              'Apply'
            )
          )
        )
      );
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof CVAAOverlay
     */

  }, {
    key: 'render',
    value: function render(props) {
      return (0, _preact.h)(
        _overlay2.default,
        { open: true, onClose: function onClose() {
            return props.onClose();
          }, type: 'cvaa' },
        this.renderMainState(),
        this.renderCustomCaptionsState()
      );
    }
  }]);

  return CVAAOverlay;
}(_base2.default)) || _class);
exports.default = CVAAOverlay;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(5);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _fullscreen = __webpack_require__(42);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    fullscreen: state.fullscreen.fullscreen,
    isMobile: state.shell.isMobile
  };
};

/**
 * FullscreenControl component
 *
 * @class FullscreenControl
 * @example <FullscreenControl player={this.player} />
 * @extends {BaseComponent}
 */
var FullscreenControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_fullscreen.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(FullscreenControl, _BaseComponent);

  /**
   * Creates an instance of FullscreenControl.
   * @param {Object} obj obj
   * @memberof FullscreenControl
   */
  function FullscreenControl(obj) {
    _classCallCheck(this, FullscreenControl);

    return _possibleConstructorReturn(this, (FullscreenControl.__proto__ || Object.getPrototypeOf(FullscreenControl)).call(this, { name: 'Fullscreen', player: obj.player }));
  }

  /**
   * after component mounted, set up event listerners to window fullscreen state change
   *
   * @returns {void}
   * @memberof FullscreenControl
   */


  _createClass(FullscreenControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener('webkitfullscreenchange', function () {
        return _this2.fullscreenChangeHandler();
      });
      document.addEventListener('mozfullscreenchange', function () {
        return _this2.fullscreenChangeHandler();
      });
      document.addEventListener('fullscreenchange', function () {
        return _this2.fullscreenChangeHandler();
      });
      document.addEventListener('MSFullscreenChange', function () {
        return _this2.fullscreenChangeHandler();
      });
    }

    /**
     * fullscreen change handler function. updates the store with new value
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'fullscreenChangeHandler',
    value: function fullscreenChangeHandler() {
      var isFullscreen = typeof document.fullscreenElement !== 'undefined' && Boolean(document.fullscreenElement) || typeof document.webkitFullscreenElement !== 'undefined' && Boolean(document.webkitFullscreenElement) || typeof document.mozFullScreenElement !== 'undefined' && Boolean(document.mozFullScreenElement) || typeof document.msFullscreenElement !== 'undefined' && Boolean(document.msFullscreenElement);

      this.props.updateFullscreen(isFullscreen);
    }

    /**
     * request fullscreen function to all browsers
     *
     * @param {HTMLElement} element - element to enter fullscreen
     * @returns {boolean} - boolean success indicator to enter fullscreen or not
     * @memberof FullscreenControl
     */

  }, {
    key: 'requestFullscreen',
    value: function requestFullscreen(element) {
      if (typeof element.requestFullscreen === 'function') {
        element.requestFullscreen();
        return true;
      } else if (typeof element.mozRequestFullScreen === 'function') {
        element.mozRequestFullScreen();
        return true;
      } else if (typeof element.webkitRequestFullScreen === 'function') {
        element.webkitRequestFullScreen();
        return true;
      } else if (typeof element.msRequestFullscreen === 'function') {
        element.msRequestFullscreen();
        return true;
      } else {
        return false;
      }
    }

    /**
     * if mobile detected, get the video element and request fullscreen.
     * otherwise, request fullscreen to the parent plater view than includes the GUI as well
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'enterFullscreen',
    value: function enterFullscreen() {
      if (this.props.isMobile && this.player.env.os.name === 'iOS') {
        this.player.getView().getElementsByTagName('video')[0].webkitEnterFullscreen();
      } else {
        this.requestFullscreen(this.player.getView().parentElement);
      }
    }

    /**
     * exit fullscreen cross platform function
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'exitFullscreen',
    value: function exitFullscreen() {
      if (typeof document.exitFullscreen === 'function') {
        document.exitFullscreen();
      } else if (typeof document.webkitExitFullscreen === 'function') {
        document.webkitExitFullscreen();
      } else if (typeof document.mozCancelFullScreen === 'function') {
        document.mozCancelFullScreen();
      } else if (typeof document.msExitFullscreen === 'function') {
        document.msExitFullscreen();
      }
    }

    /**
     * toggle fullscreen based on current fullscreen state in store
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'toggleFullscreen',
    value: function toggleFullscreen() {
      this.logger.debug('Toggle fullscreen');
      this.props.fullscreen ? this.exitFullscreen() : this.enterFullscreen();
    }

    /**
     * render component
     *
     * @returns {React$Element} - component
     * @memberof FullscreenControl
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return (0, _preact.h)(
        'div',
        { className: 'control-button-container control-fullscreen' },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            { 'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.fullscreen' }),
              className: this.props.fullscreen ? 'control-button is-fullscreen' : 'control-button',
              onClick: function onClick() {
                return _this3.toggleFullscreen();
              } },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.Maximize }),
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.Minimize })
          )
        )
      );
    }
  }]);

  return FullscreenControl;
}(_base2.default)) || _class);
exports.default = FullscreenControl;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _timeDisplayPlaybackContainer = __webpack_require__(87);

var _timeDisplayPlaybackContainer2 = _interopRequireDefault(_timeDisplayPlaybackContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _timeDisplayPlaybackContainer2.default;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _timeDisplay = __webpack_require__(25);

var _timeDisplay2 = _interopRequireDefault(_timeDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTime: state.engine.currentTime,
    duration: state.engine.duration
  };
};

/**
 * TimeDisplayPlaybackContainer component
 *
 * @class TimeDisplayPlaybackContainer
 * @example <TimeDisplayPlaybackContainer format='currentTime / duration' />
 * @extends {BaseComponent}
 */
var TimeDisplayPlaybackContainer = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(TimeDisplayPlaybackContainer, _BaseComponent);

  /**
   * Creates an instance of TimeDisplayPlaybackContainer.
   * @memberof TimeDisplayPlaybackContainer
   */
  function TimeDisplayPlaybackContainer() {
    _classCallCheck(this, TimeDisplayPlaybackContainer);

    return _possibleConstructorReturn(this, (TimeDisplayPlaybackContainer.__proto__ || Object.getPrototypeOf(TimeDisplayPlaybackContainer)).call(this, { name: 'TimeDisplayPlaybackContainer' }));
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof TimeDisplayPlaybackContainer
   */


  _createClass(TimeDisplayPlaybackContainer, [{
    key: 'render',
    value: function render(props) {
      return (0, _preact.h)(_timeDisplay2.default, _extends({
        currentTime: props.currentTime,
        duration: props.duration
      }, props));
    }
  }]);

  return TimeDisplayPlaybackContainer;
}(_base2.default)) || _class);
exports.default = TimeDisplayPlaybackContainer;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _timeFormat = __webpack_require__(19);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TimeDisplay component
 *
 * @class TimeDisplay
 * @example <TimeDisplay
 *  currentTime={this.player.currentTime}
 *  duration={this.player.duration}
 *  format='currentTime / duration'
 * />
 * @extends {Component}
 */
var TimeDisplay = function (_Component) {
  _inherits(TimeDisplay, _Component);

  function TimeDisplay() {
    _classCallCheck(this, TimeDisplay);

    return _possibleConstructorReturn(this, (TimeDisplay.__proto__ || Object.getPrototypeOf(TimeDisplay)).apply(this, arguments));
  }

  _createClass(TimeDisplay, [{
    key: 'getTimeDisplay',


    /**
     * get formatted time display based on defined format
     *
     * @method getTimeDisplay
     * @param {number} currentTime current time
     * @param {number} duration duration
     * @param {string} [format] string that can use one or more of: 'current' / 'total' / 'left' and will be replaced with the relevant value
     * @returns {string} formatted time display
     * @memberof TimeDisplay
     */
    value: function getTimeDisplay(currentTime, duration, format) {
      var result = format ? format : 'current / total',
          current = (0, _timeFormat.toHHMMSS)(currentTime),
          total = (0, _timeFormat.toHHMMSS)(duration),
          left = (0, _timeFormat.toHHMMSS)(duration - currentTime);

      result = result.replace(/current/g, current);
      result = result.replace(/total/g, total);
      result = result.replace(/left/g, left);

      return result;
    }

    /**
     * render component
     *
     * @method render
     * @param {*} props - component props
     * @returns {React$Element} - component
     * @memberof TimeDisplay
     */

  }, {
    key: 'render',
    value: function render(props) {
      return (0, _preact.h)(
        'div',
        { className: 'time-display' },
        (0, _preact.h)(
          'span',
          null,
          this.getTimeDisplay(props.currentTime, props.duration, props.format)
        )
      );
    }
  }]);

  return TimeDisplay;
}(_preact.Component);

exports.default = TimeDisplay;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * BottomBar component
 *
 * @class BottomBar
 * @example <BottomBar>...</BottomBar>
 * @extends {Component}
 */
var BottomBar = function (_Component) {
  _inherits(BottomBar, _Component);

  function BottomBar() {
    _classCallCheck(this, BottomBar);

    return _possibleConstructorReturn(this, (BottomBar.__proto__ || Object.getPrototypeOf(BottomBar)).apply(this, arguments));
  }

  _createClass(BottomBar, [{
    key: 'render',

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof BottomBar
     */
    value: function render(props) {
      return (0, _preact.h)(
        'div',
        { className: 'bottom-bar' },
        props.children
      );
    }
  }]);

  return BottomBar;
}(_preact.Component);

exports.default = BottomBar;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * OverlayPortal component
 *
 * @class OverlayPortal
 * @example <OverlayPortal>...</OverlayPortal>
 * @extends {Component}
 */
var OverlayPortal = function (_Component) {
  _inherits(OverlayPortal, _Component);

  function OverlayPortal() {
    _classCallCheck(this, OverlayPortal);

    return _possibleConstructorReturn(this, (OverlayPortal.__proto__ || Object.getPrototypeOf(OverlayPortal)).apply(this, arguments));
  }

  _createClass(OverlayPortal, [{
    key: 'shouldComponentUpdate',


    /**
     * change in component props or state shouldn't render the component again
     *
     * @returns {boolean} shouldComponentUpdate
     * @memberof OverlayPortal
     */
    value: function shouldComponentUpdate() {
      return false;
    }

    /**
     * render component
     *
     * @param {*} props - comonent props
     * @returns {React$Element} - component element
     * @memberof OverlayPortal
     */

  }, {
    key: 'render',
    value: function render(props) {
      return (0, _preact.h)(
        'div',
        { id: 'overlay-portal' },
        props.children
      );
    }
  }]);

  return OverlayPortal;
}(_preact.Component);

exports.default = OverlayPortal;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * KeyboardControl component
 *
 * @class KeyboardControl
 * @extends {BaseComponent}
 */
var KeyboardControl = function (_BaseComponent) {
  _inherits(KeyboardControl, _BaseComponent);

  /**
   * Creates an instance of KeyboardControl.
   * @param {Object} obj obj
   * @memberof KeyboardControl
   */
  function KeyboardControl(obj) {
    _classCallCheck(this, KeyboardControl);

    var _this = _possibleConstructorReturn(this, (KeyboardControl.__proto__ || Object.getPrototypeOf(KeyboardControl)).call(this, { name: 'Keyboard', player: obj.player }));

    _this.player.getView().parentElement.onkeydown = function (e) {
      var time = void 0,
          newVolume = void 0;
      switch (e.which) {
        case 32:
          // space
          _this.logger.debug("Keydown space");
          _this.player.paused ? _this.player.play() : _this.player.pause();
          break;

        case 38:
          // up
          _this.logger.debug("Keydown up");
          newVolume = Math.round(_this.player.volume * 100) + 5;
          _this.logger.debug('Changing volume. ' + _this.player.volume + ' => ' + newVolume);
          if (_this.player.muted) {
            _this.player.muted = false;
          }
          _this.player.volume = newVolume / 100;
          break;

        case 40:
          // down
          _this.logger.debug("Keydown down");
          newVolume = Math.round(_this.player.volume * 100) - 5;
          if (newVolume < 5) {
            _this.player.muted = true;
            return;
          }
          _this.logger.debug('Changing volume. ' + _this.player.volume + ' => ' + newVolume);
          _this.player.volume = newVolume / 100;
          break;

        case 37:
          // left
          _this.logger.debug("Keydown left");
          time = _this.player.currentTime - 5 > 0 ? _this.player.currentTime - 5 : 0;
          _this.player.currentTime = time;
          break;

        case 39:
          // right
          _this.logger.debug("Keydown right");
          time = _this.player.currentTime + 5 > _this.player.duration ? _this.player.duration : _this.player.currentTime + 5;
          _this.player.currentTime = time;
          break;

        default:
          return;
      }
    };

    _this.disableKeyboardCommandsOnControls();
    return _this;
  }

  /**
   * disable keyboard commands when control button is on focus to prevent
   * double function execution.
   *
   * @returns {void}
   * @memberof KeyboardControl
   */


  _createClass(KeyboardControl, [{
    key: 'disableKeyboardCommandsOnControls',
    value: function disableKeyboardCommandsOnControls() {
      var controlButtonsElements = Array.from(document.getElementsByClassName('control-button'));
      controlButtonsElements.forEach(function (element) {
        element.onkeydown = function (e) {
          return e.preventDefault();
        };
      });
    }
  }]);

  return KeyboardControl;
}(_base2.default);

exports.default = KeyboardControl;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _seekbarAdsContainer = __webpack_require__(93);

var _seekbarAdsContainer2 = _interopRequireDefault(_seekbarAdsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _seekbarAdsContainer2.default;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _seekbar = __webpack_require__(10);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _seekbar2 = __webpack_require__(11);

var _seekbar3 = _interopRequireDefault(_seekbar2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTime: state.engine.adProgress.currentTime,
    duration: state.engine.adProgress.duration,
    isDraggingActive: state.seekbar.draggingActive,
    isMobile: state.shell.isMobile
  };
};

/**
 * SeekBarAdsContainer component
 *
 * @class SeekBarAdsContainer
 * @example <SeekBarAdsContainer player={this.player} />
 * @extends {BaseComponent}
 */
var SeekBarAdsContainer = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_seekbar.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(SeekBarAdsContainer, _BaseComponent);

  /**
   * Creates an instance of SeekBarAdsContainer.
   * @param {Object} obj - obj
   * @memberof SeekBarAdsContainer
   */
  function SeekBarAdsContainer(obj) {
    _classCallCheck(this, SeekBarAdsContainer);

    return _possibleConstructorReturn(this, (SeekBarAdsContainer.__proto__ || Object.getPrototypeOf(SeekBarAdsContainer)).call(this, { name: 'SeekBarAdsContainer', player: obj.player }));
  }

  /**
   * render compoent
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SeekBarAdsContainer
   */


  _createClass(SeekBarAdsContainer, [{
    key: 'render',
    value: function render(props) {
      return (0, _preact.h)(_seekbar3.default, {
        playerElement: this.player.getView().parentElement,
        changeCurrentTime: function changeCurrentTime(time) {} // eslint-disable-line no-unused-vars
        , updateSeekbarDraggingStatus: function updateSeekbarDraggingStatus(data) {} // eslint-disable-line no-unused-vars
        , updateCurrentTime: function updateCurrentTime(data) {} // eslint-disable-line no-unused-vars

        , adBreak: props.adBreak,
        currentTime: props.currentTime,
        duration: props.duration,
        isDraggingActive: props.isDraggingActive,
        isMobile: props.isMobile
      });
    }
  }]);

  return SeekBarAdsContainer;
}(_base2.default)) || _class);
exports.default = SeekBarAdsContainer;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _timeDisplayAdsContainer = __webpack_require__(95);

var _timeDisplayAdsContainer2 = _interopRequireDefault(_timeDisplayAdsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _timeDisplayAdsContainer2.default;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _timeDisplay = __webpack_require__(25);

var _timeDisplay2 = _interopRequireDefault(_timeDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    adProgress: state.engine.adProgress
  };
};

/**
 * TimeDisplayAdsContainer component
 *
 * @class TimeDisplayAdsContainer
 * @example <TimeDisplayAdsContainer format='-left seconds left' />
 * @extends {BaseComponent}
 */
var TimeDisplayAdsContainer = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(TimeDisplayAdsContainer, _BaseComponent);

  /**
   * Creates an instance of TimeDisplayAdsContainer.
   * @memberof TimeDisplayAdsContainer
   */
  function TimeDisplayAdsContainer() {
    _classCallCheck(this, TimeDisplayAdsContainer);

    return _possibleConstructorReturn(this, (TimeDisplayAdsContainer.__proto__ || Object.getPrototypeOf(TimeDisplayAdsContainer)).call(this, { name: 'TimeDisplayAdsContainer' }));
  }

  /**
   * render component
   *
   * @param {*} props component props
   * @returns {React$Element} - component element
   * @memberof TimeDisplayAdsContainer
   */


  _createClass(TimeDisplayAdsContainer, [{
    key: 'render',
    value: function render(props) {
      return (0, _preact.h)(_timeDisplay2.default, _extends({
        currentTime: props.adProgress.currentTime,
        duration: props.adProgress.duration
      }, props));
    }
  }]);

  return TimeDisplayAdsContainer;
}(_base2.default)) || _class);
exports.default = TimeDisplayAdsContainer;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _adSkip = __webpack_require__(97);

var _adSkip2 = _interopRequireDefault(_adSkip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _adSkip2.default;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTime: state.engine.adProgress.currentTime,
    duration: state.engine.adProgress.duration,
    adSkipTimeOffset: state.engine.adSkipTimeOffset,
    adSkippableState: state.engine.adSkippableState
  };
};

/**
 * AdSkip component
 *
 * @class AdSkip
 * @example <AdSkip player={this.player} />
 * @extends {BaseComponent}
 */
var AdSkip = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(AdSkip, _BaseComponent);

  /**
   * Creates an instance of AdSkip.
   * @param {Object} obj obj
   * @memberof AdSkip
   */
  function AdSkip(obj) {
    _classCallCheck(this, AdSkip);

    return _possibleConstructorReturn(this, (AdSkip.__proto__ || Object.getPrototypeOf(AdSkip)).call(this, { name: 'AdSkip', player: obj.player }));
  }

  /**
   * componentDidMount
   *
   * @returns {void}
   * @memberof AdSkip
   */


  _createClass(AdSkip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.skipSupport = this.player.config.plugins.ima.skipSupport;
    }

    /**
     * getting the number value of seconds left to be able to skip ad
     *
     * @returns {number} - number of seconds left to skip ad
     * @memberof AdSkip
     */

  }, {
    key: 'getSkipTimeOffset',
    value: function getSkipTimeOffset() {
      if (this.skipSupport) {
        return Math.ceil(this.skipSupport.skipTimeOffset - this.props.currentTime);
      } else {
        return Math.ceil(this.props.adSkipTimeOffset - this.props.currentTime);
      }
    }

    /**
     * render component
     *
     * @returns {React$Element}  - component
     * @memberof AdSkip
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.adSkippableState && this.skipSupport) {
        return this.getSkipTimeOffset() <= 0 ? (0, _preact.h)(
          'a',
          { className: 'btn btn-branded btn-skip-ad', onClick: function onClick() {
              return _this2.player.skipAd();
            } },
          this.skipSupport.label || 'Skip ad'
        ) : (0, _preact.h)(
          'span',
          { className: 'skip-ad' },
          'Skip in ',
          this.getSkipTimeOffset()
        );
      } else {
        return undefined;
      }
    }
  }]);

  return AdSkip;
}(_base2.default)) || _class);
exports.default = AdSkip;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _adLearnMore = __webpack_require__(99);

var _adLearnMore2 = _interopRequireDefault(_adLearnMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _adLearnMore2.default;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    url: state.engine.adUrl
  };
};

/**
 * AdLearnMore component
 *
 * @class AdLearnMore
 * @example <AdLearnMore />
 * @extends {Component}
 */
var AdLearnMore = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_Component) {
  _inherits(AdLearnMore, _Component);

  function AdLearnMore() {
    _classCallCheck(this, AdLearnMore);

    return _possibleConstructorReturn(this, (AdLearnMore.__proto__ || Object.getPrototypeOf(AdLearnMore)).apply(this, arguments));
  }

  _createClass(AdLearnMore, [{
    key: 'render',

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof AdLearnMore
     */
    value: function render(props) {
      return (0, _preact.h)(
        'a',
        { href: props.url, target: 'new', className: 'btn btn-dark-transparent' },
        'Learn more'
      );
    }
  }]);

  return AdLearnMore;
}(_preact.Component)) || _class);
exports.default = AdLearnMore;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TopBar component
 *
 * @class TopBar
 * @example <TopBar>...</TopBar>
 * @extends {Component}
 */
var TopBar = function (_Component) {
  _inherits(TopBar, _Component);

  function TopBar() {
    _classCallCheck(this, TopBar);

    return _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).apply(this, arguments));
  }

  _createClass(TopBar, [{
    key: 'render',

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof TopBar
     */
    value: function render(props) {
      return (0, _preact.h)(
        'div',
        { className: 'top-bar' },
        props.children
      );
    }
  }]);

  return TopBar;
}(_preact.Component);

exports.default = TopBar;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _seekbarLivePlaybackContainer = __webpack_require__(102);

var _seekbarLivePlaybackContainer2 = _interopRequireDefault(_seekbarLivePlaybackContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _seekbarLivePlaybackContainer2.default;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _seekbar = __webpack_require__(10);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _seekbar2 = __webpack_require__(11);

var _seekbar3 = _interopRequireDefault(_seekbar2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTime: state.seekbar.currentTime,
    duration: state.engine.duration,
    isDraggingActive: state.seekbar.draggingActive,
    isMobile: state.shell.isMobile,
    poster: state.engine.poster,
    isDvr: state.engine.isDvr
  };
};

/**
 * SeekBarLivePlaybackContainer component
 *
 * @class SeekBarLivePlaybackContainer
 * @example <SeekBarLivePlaybackContainer player={this.player} />
 * @extends {BaseComponent}
 */
var SeekBarLivePlaybackContainer = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_seekbar.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(SeekBarLivePlaybackContainer, _BaseComponent);

  /**
   * Creates an instance of SeekBarLivePlaybackContainer.
   * @param {Object} obj obj
   * @memberof SeekBarLivePlaybackContainer
   */
  function SeekBarLivePlaybackContainer(obj) {
    _classCallCheck(this, SeekBarLivePlaybackContainer);

    return _possibleConstructorReturn(this, (SeekBarLivePlaybackContainer.__proto__ || Object.getPrototypeOf(SeekBarLivePlaybackContainer)).call(this, { name: 'SeekBarLivePlaybackContainer', player: obj.player }));
  }

  /**
   * after component mounted, listen to time update event and if dragging not active,
   * update the current time in the store
   *
   * @returns {void}
   * @memberof SeekBarLivePlaybackContainer
   */


  _createClass(SeekBarLivePlaybackContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.player.addEventListener(this.player.Event.TIME_UPDATE, function () {
        if (!_this2.props.isDraggingActive) {
          _this2.props.updateCurrentTime(_this2.player.currentTime);
        }
      });
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof SeekBarLivePlaybackContainer
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this3 = this;

      if (!props.isDvr) return undefined;
      return (0, _preact.h)(_seekbar3.default, {
        playerElement: this.player.getView().parentElement,
        showTimeBubble: this.props.showTimeBubble,
        changeCurrentTime: function changeCurrentTime(time) {
          return _this3.player.currentTime = time;
        },
        playerPoster: this.props.poster,
        updateSeekbarDraggingStatus: function updateSeekbarDraggingStatus(data) {
          return _this3.props.updateSeekbarDraggingStatus(data);
        },
        updateCurrentTime: function updateCurrentTime(data) {
          return _this3.props.updateCurrentTime(data);
        },

        isDvr: this.props.isDvr,
        currentTime: this.props.currentTime,
        duration: this.props.duration,
        isDraggingActive: this.props.isDraggingActive,
        isMobile: this.props.isMobile
      });
    }
  }]);

  return SeekBarLivePlaybackContainer;
}(_base2.default)) || _class);
exports.default = SeekBarLivePlaybackContainer;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _liveTag = __webpack_require__(104);

var _liveTag2 = _interopRequireDefault(_liveTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _liveTag2.default;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    isLive: state.engine.isLive,
    isDvr: state.engine.isDvr,
    currentTime: state.engine.currentTime,
    duration: state.engine.duration
  };
};

/**
 * LiveTag component
 *
 * @class LiveTag
 * @example <LiveTag player={this.player} />
 * @extends {BaseComponent}
 */
var LiveTag = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(LiveTag, _BaseComponent);

  /**
   * Creates an instance of LiveTag.
   * @param {Object} obj obj
   * @memberof LiveTag
   */
  function LiveTag(obj) {
    _classCallCheck(this, LiveTag);

    return _possibleConstructorReturn(this, (LiveTag.__proto__ || Object.getPrototypeOf(LiveTag)).call(this, { name: 'LiveTag', player: obj.player }));
  }

  /**
   * returns a boolean to detect if player is on live edge with buffer of 1 second
   *
   * @returns {boolean} - is player on live edge
   * @memberof LiveTag
   */


  _createClass(LiveTag, [{
    key: 'isOnLiveEdge',
    value: function isOnLiveEdge() {
      return this.props.currentTime >= this.props.duration - 1;
    }

    /**
     * click handler to live tag
     * if not on live edge, seeking to live edge and if paused, call play method
     *
     * @returns {void}
     * @memberof LiveTag
     */

  }, {
    key: 'onClick',
    value: function onClick() {
      if (!this.isOnLiveEdge()) {
        this.player.seekToLiveEdge();
        if (this.player.paused) {
          this.player.play();
        }
      }
    }

    /**
     * render live tag component
     *
     * @param {*} props - component props
     * @returns {React$Element} component element
     * @memberof LiveTag
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this2 = this;

      var tagStyleClass = 'live-tag';
      if (props.isDvr && !this.isOnLiveEdge()) tagStyleClass += ' non-live-playhead';

      return (0, _preact.h)(
        'div',
        { className: tagStyleClass, onClick: function onClick() {
            return _this2.onClick();
          } },
        'Live'
      );
    }
  }]);

  return LiveTag;
}(_base2.default)) || _class);
exports.default = LiveTag;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _share = __webpack_require__(106);

var _share2 = _interopRequireDefault(_share);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _share2.default;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _shareOverlay = __webpack_require__(107);

var _shareOverlay2 = _interopRequireDefault(_shareOverlay);

var _preactPortal = __webpack_require__(21);

var _preactPortal2 = _interopRequireDefault(_preactPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ShareControl component
 *
 * @class ShareControl
 * @example <ShareControl player={this.player} />
 * @extends {BaseComponent}
 */
var ShareControl = function (_BaseComponent) {
  _inherits(ShareControl, _BaseComponent);

  /**
   * Creates an instance of ShareControl.
   * @param {Object} obj obj
   * @memberof ShareControl
   */
  function ShareControl(obj) {
    _classCallCheck(this, ShareControl);

    return _possibleConstructorReturn(this, (ShareControl.__proto__ || Object.getPrototypeOf(ShareControl)).call(this, { name: 'Share', player: obj.player }));
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof ShareControl
   */


  _createClass(ShareControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ overlay: false });
    }

    /**
     * toggle overlay internal component state
     *
     * @returns {void}
     * @memberof ShareControl
     */

  }, {
    key: 'toggleOverlay',
    value: function toggleOverlay() {
      this.setState({ overlay: !this.state.overlay });
    }

    /**
     * render element
     *
     * @returns {React$Element} component element
     * @memberof ShareControl
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        { className: 'control-button-container control-share' },
        (0, _preact.h)(
          'button',
          { className: 'control-button control-button-rounded', onClick: function onClick() {
              return _this2.toggleOverlay();
            }, 'aria-label': 'Share' },
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.Share })
        ),
        this.state.overlay ? (0, _preact.h)(
          _preactPortal2.default,
          { into: '#overlay-portal' },
          (0, _preact.h)(_shareOverlay2.default, { player: this.player, onClose: function onClose() {
              return _this2.toggleOverlay();
            } })
        ) : null
      );
    }
  }]);

  return ShareControl;
}(_base2.default);

exports.default = ShareControl;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _shareOverlay = __webpack_require__(108);

var _shareOverlay2 = _interopRequireDefault(_shareOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _shareOverlay2.default;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(5);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _share = __webpack_require__(46);

var _timeFormat = __webpack_require__(19);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _overlay = __webpack_require__(22);

var _overlay2 = _interopRequireDefault(_overlay);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @example <ShareOverlay player={this.player} />
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    open: state.share.overlayOpen
  };
};

var shareOverlayState = {
  Main: 'main',
  LinkOptions: 'link-options',
  EmbedOptions: 'embed-options'
};

/**
 * ShareOverlay component
 *
 * @class ShareOverlay
 * @extends {BaseComponent}
 */
var ShareOverlay = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_share.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(ShareOverlay, _BaseComponent);

  /**
   * Creates an instance of ShareOverlay.
   * @param {Object} obj obj
   * @memberof ShareOverlay
   */
  function ShareOverlay(obj) {
    _classCallCheck(this, ShareOverlay);

    return _possibleConstructorReturn(this, (ShareOverlay.__proto__ || Object.getPrototypeOf(ShareOverlay)).call(this, { name: 'ShareOverlay', player: obj.player }));
  }

  /**
   * before component mount, set initial state
   *
   * @returns {void}
   * @memberof ShareOverlay
   */


  _createClass(ShareOverlay, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        state: shareOverlayState.Main,
        shareUrl: 'https://cdnapisec.kaltura.com/index.php?assetId=123456',
        startFrom: false,
        startFromValue: 0
      });
    }

    /**
     * before component unmounted, change the overlay state to the initial state
     *
     * @returns {void}
     * @memberof ShareOverlay
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({
        state: shareOverlayState.Main
      });
    }

    /**
     * changing the overlay state
     *
     * @param {string} stateName state name
     * @returns {void}
     * @memberof ShareOverlay
     */

  }, {
    key: 'transitionToState',
    value: function transitionToState(stateName) {
      this.setState({ state: stateName });
    }

    /**
     * copy input text based on input element.
     * on success, set success internal component state for 2 seconds
     *
     * @param {HTMLInputElement} inputElement - start from input element
     * @returns {void}
     * @memberof ShareOverlay
     */

  }, {
    key: 'copyUrl',
    value: function copyUrl(inputElement) {
      var _this2 = this;

      try {
        inputElement.select();
        document.execCommand('copy');
        inputElement.blur();

        this.setState({ copySuccess: true });
        setTimeout(function () {
          return _this2.setState({ copySuccess: false });
        }, 2000);
      } catch (e) {
        this.setState({ copySuccess: false });
      }
    }

    /**
     * toggle start from option checkbox in the internal component state
     *
     * @returns {void}
     * @memberof ShareOverlay
     */

  }, {
    key: 'toggleStartFrom',
    value: function toggleStartFrom() {
      this.setState({ startFrom: !this.state.startFrom });
    }

    /**
     * get share url method
     *
     * @returns {string} - share url
     * @memberof ShareOverlay
     */

  }, {
    key: 'getShareUrl',
    value: function getShareUrl() {
      var url = this.state.shareUrl;
      if (this.state.startFrom) {
        url += '?start=' + this.state.startFromValue;
      }
      return url;
    }

    /**
     * get embed code
     * #TODO: complete logic here
     *
     * @returns {string} - embed code
     * @memberof ShareOverlay
     */

  }, {
    key: 'getEmbedCode',
    value: function getEmbedCode() {
      return '<iframe src="//cdnapi.kaltura.com/p/243342/sp/24334200/embedIframeJs/uiconf_id/28685261/partner_id/243342?iframeembed=true&playerId=kdp&entry_id=1_sf5ovm7u&flashvars[streamerType]=auto" width="560" height="395" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0"></iframe>';
    }

    /**
     * start from input change handler.
     * converts to seconds and save the new value in internal component state
     *
     * @param {*} e - input change event
     * @returns {void}
     * @memberof ShareOverlay
     */

  }, {
    key: 'handleStartFromChange',
    value: function handleStartFromChange(e) {
      var seconds = (0, _timeFormat.toSecondsFromHHMMSS)(e.target.value);
      if (seconds >= this.player.duration) {
        this.setState({ startFromValue: 1 });
      }
      this.setState({ startFromValue: seconds });
    }

    /**
     * opens new window for share
     *
     * @param {string} href - url to open
     * @returns {boolean} - false
     * @memberof ShareOverlay
     */

  }, {
    key: 'share',
    value: function share(href) {
      window.open(href, '_blank', 'width=580,height=580');
      return false;
    }

    /**
     * renders main overlay state
     *
     * @returns {React$Element} - main state element
     * @memberof ShareOverlay
     */

  }, {
    key: 'renderMainState',
    value: function renderMainState() {
      var _this3 = this;

      return (0, _preact.h)(
        'div',
        { className: this.state.state === shareOverlayState.Main ? 'overlay-screen active' : 'overlay-screen' },
        (0, _preact.h)(
          'div',
          { className: 'title' },
          (0, _preact.h)(_preactI18n.Text, { id: 'share.share_title' })
        ),
        (0, _preact.h)(
          'div',
          { className: 'share-main-container' },
          (0, _preact.h)(
            'div',
            { className: 'share-icons' },
            (0, _preact.h)(
              'a',
              {
                href: 'https://player.kaltura.com/video/220277207/share/facebook', target: '_blank', rel: 'noopener noreferrer',
                title: 'Share on Facebook', role: 'button', 'aria-label': 'Share on Facebook',
                className: 'btn-rounded facebook-share-btn',
                onClick: function onClick() {
                  return _this3.share('https://player.kaltura.com/video/220277207/share/facebook');
                }
              },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Facebook })
            ),
            (0, _preact.h)(
              'a',
              {
                href: 'https://player.kaltura.com/video/220277207/share/twitter', target: '_blank', rel: 'noopener noreferrer',
                title: 'Share on Twitter', role: 'button', 'aria-label': 'Share on Twitter',
                className: 'btn-rounded twitter-share-btn',
                onClick: function onClick() {
                  return _this3.share('https://player.kaltura.com/video/220277207/share/twitter');
                }
              },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Twitter })
            ),
            (0, _preact.h)(
              'a',
              {
                href: 'https://player.kaltura.com/video/220277207/share/google-plus', target: '_blank', rel: 'noopener noreferrer',
                title: 'Share on Google Plus', role: 'button', 'aria-label': 'Share on Google Plus',
                className: 'btn-rounded google-plus-share-btn',
                onClick: function onClick() {
                  return _this3.share('https://player.kaltura.com/video/220277207/share/google');
                }
              },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.GooglePlus })
            ),
            (0, _preact.h)(
              'a',
              {
                href: 'https://player.kaltura.com/video/220277207/share/linkedin', target: '_blank', rel: 'noopener noreferrer',
                title: 'Share on Linkedin', role: 'button', 'aria-label': 'Share on Linkedin',
                className: 'btn-rounded linkedin-share-btn',
                onClick: function onClick() {
                  return _this3.share('https://player.kaltura.com/video/220277207/share/linkedin');
                }
              },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Linkedin })
            ),
            (0, _preact.h)(
              'a',
              {
                className: 'btn-rounded email-share-btn',
                href: 'mailto:?subject=' + encodeURIComponent('email subject') + '&body=' + encodeURIComponent('email body')
              },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Email })
            ),
            (0, _preact.h)(
              'a',
              {
                className: 'btn-rounded embed-share-btn',
                onClick: function onClick() {
                  return _this3.transitionToState(shareOverlayState.EmbedOptions);
                }
              },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Embed })
            )
          ),
          (0, _preact.h)(
            'div',
            null,
            (0, _preact.h)(
              'div',
              { className: 'form-group has-icon' },
              (0, _preact.h)('input', { type: 'text', placeholder: 'Share URL', className: 'form-control', value: this.state.shareUrl, readOnly: true }),
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Link })
            )
          ),
          (0, _preact.h)(
            'a',
            { onClick: function onClick() {
                return _this3.transitionToState(shareOverlayState.LinkOptions);
              } },
            (0, _preact.h)(_preactI18n.Text, { id: 'share.link_options' })
          )
        )
      );
    }

    /**
     * renders link options state
     *
     * @returns {React$Element} - link options element
     * @memberof ShareOverlay
     */

  }, {
    key: 'renderLinkOptionsState',
    value: function renderLinkOptionsState() {
      var _this4 = this;

      var copyUrlClasses = 'btn-rounded btn-branded btn-copy-url';
      copyUrlClasses += this.state.copySuccess ? ' copied' : '';

      return (0, _preact.h)(
        'div',
        { className: this.state.state === shareOverlayState.LinkOptions ? 'overlay-screen active' : 'overlay-screen' },
        (0, _preact.h)(
          'div',
          { className: 'title' },
          'Link options'
        ),
        (0, _preact.h)(
          'div',
          { className: 'link-options-container' },
          (0, _preact.h)(
            'div',
            { className: 'copy-url-row' },
            (0, _preact.h)(
              'div',
              { className: 'form-group has-icon input-copy-url', style: 'width: 350px;' },
              (0, _preact.h)('input', {
                type: 'text',
                ref: function ref(c) {
                  return _this4._shareUrlInput = c;
                },
                placeholder: 'Share URL',
                className: 'form-control',
                value: this.getShareUrl(),
                readOnly: true
              }),
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Link })
            ),
            (0, _preact.h)(
              'a',
              {
                className: copyUrlClasses,
                onClick: function onClick() {
                  return _this4.copyUrl(_this4._shareUrlInput);
                } },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Copy }),
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'video-start-options-row' },
            (0, _preact.h)(
              'div',
              { className: 'checkbox d-inline-block' },
              (0, _preact.h)('input', {
                type: 'checkbox',
                id: 'start-from',
                checked: this.state.startFrom,
                onClick: function onClick() {
                  return _this4.toggleStartFrom();
                }
              }),
              (0, _preact.h)(
                'label',
                { htmlFor: 'start-from' },
                'Start video at '
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'form-group d-inline-block' },
              (0, _preact.h)('input', {
                type: 'text',
                className: 'form-control',
                onChange: function onChange(e) {
                  return _this4.handleStartFromChange(e);
                },
                value: (0, _timeFormat.toHHMMSS)(this.state.startFromValue),
                style: 'width: 72px;'
              })
            )
          )
        )
      );
    }

    /**
     * renders embed options state
     *
     * @returns {React$Element} - embed options element
     * @memberof ShareOverlay
     */

  }, {
    key: 'renderEmbedOptionsState',
    value: function renderEmbedOptionsState() {
      var _this5 = this;

      var copyUrlClasses = 'btn-rounded btn-branded btn-copy-url';
      copyUrlClasses += this.state.copySuccess ? ' copied' : '';

      return (0, _preact.h)(
        'div',
        { className: this.state.state === shareOverlayState.EmbedOptions ? 'overlay-screen active' : 'overlay-screen' },
        (0, _preact.h)(
          'div',
          { className: 'title' },
          'Embed options'
        ),
        (0, _preact.h)(
          'div',
          { className: 'link-options-container' },
          (0, _preact.h)(
            'div',
            { className: 'copy-url-row' },
            (0, _preact.h)(
              'div',
              { className: 'form-group has-icon input-copy-url', style: 'width: 350px;' },
              (0, _preact.h)('input', {
                type: 'text',
                ref: function ref(c) {
                  return _this5._embedCodeInput = c;
                },
                placeholder: 'Share URL',
                className: 'form-control',
                value: this.getEmbedCode(),
                readOnly: true
              }),
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Embed })
            ),
            (0, _preact.h)(
              'a',
              {
                className: copyUrlClasses,
                onClick: function onClick() {
                  return _this5.copyUrl(_this5._embedCodeInput);
                } },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Copy }),
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'video-start-options-row' },
            (0, _preact.h)(
              'div',
              { className: 'checkbox d-inline-block' },
              (0, _preact.h)('input', {
                type: 'checkbox',
                id: 'start-from',
                checked: this.state.startFrom,
                onClick: function onClick() {
                  return _this5.toggleStartFrom();
                }
              }),
              (0, _preact.h)(
                'label',
                { htmlFor: 'start-from' },
                'Start video at '
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'form-group d-inline-block' },
              (0, _preact.h)('input', {
                type: 'text',
                className: 'form-control',
                onChange: function onChange(e) {
                  return _this5.handleStartFromChange(e);
                },
                value: (0, _timeFormat.toHHMMSS)(this.state.startFromValue),
                style: 'width: 72px;'
              })
            )
          )
        )
      );
    }

    /**
     * utility function to switch and render the right overlay state element based on the overlay state.
     *
     * @returns {React$Element} - current state element
     * @memberof ShareOverlay
     */

  }, {
    key: 'renderStateContent',
    value: function renderStateContent() {
      switch (this.state.state) {
        case shareOverlayState.Main:
          return this.renderMainState();

        case shareOverlayState.LinkOptions:
          return this.renderLinkOptionsState();

        case shareOverlayState.EmbedOptions:
          return this.renderEmbedOptionsState();

        default:
          return this.renderMainState();
      }
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof ShareOverlay
     */

  }, {
    key: 'render',
    value: function render(props) {
      return (0, _preact.h)(
        _overlay2.default,
        { open: true, onClose: function onClose() {
            return props.onClose();
          }, type: 'share' },
        this.renderStateContent()
      );
    }
  }]);

  return ShareOverlay;
}(_base2.default)) || _class);
exports.default = ShareOverlay;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// core components for the UI


// ui presets


var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _preactI18n = __webpack_require__(5);

var _redux = __webpack_require__(7);

var _store = __webpack_require__(110);

var _store2 = _interopRequireDefault(_store);

var _fr = __webpack_require__(111);

var _fr2 = _interopRequireDefault(_fr);

var _playkitJs = __webpack_require__(35);

var _engineConnector = __webpack_require__(112);

var _engineConnector2 = _interopRequireDefault(_engineConnector);

var _shell = __webpack_require__(113);

var _shell2 = _interopRequireDefault(_shell);

var _playerGui = __webpack_require__(114);

var _playerGui2 = _interopRequireDefault(_playerGui);

var _ads = __webpack_require__(43);

var _ads2 = _interopRequireDefault(_ads);

var _playback = __webpack_require__(28);

var _playback2 = _interopRequireDefault(_playback);

var _live = __webpack_require__(45);

var _live2 = _interopRequireDefault(_live);

__webpack_require__(115);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * API used for building UIs based on state conditions
 *
 * @class UIManager
 */
var UIManager = function () {

  /**
   * Creates an instance of UIManager.
   * @param {Player} player - player instance
   * @param {Object} config - player config
   * @memberof UIManager
   */
  function UIManager(player, config) {
    _classCallCheck(this, UIManager);

    this.player = player;
    this.config = config;
  }

  /**
   * build default UIs
   *
   * @returns {void}
   * @memberof UIManager
   */


  _createClass(UIManager, [{
    key: 'buildDefaultUI',
    value: function buildDefaultUI() {
      var uis = [{ template: function template(props) {
          return (0, _ads2.default)(props);
        }, condition: function condition(state) {
          return state.engine.adBreak;
        } }, { template: function template(props) {
          return (0, _live2.default)(props);
        }, condition: function condition(state) {
          return state.engine.isLive;
        } }, { template: function template(props) {
          return (0, _playback2.default)(props);
        } }];
      this._buildUI(uis);
    }

    /**
     * build custom UIs
     *
     * @param {Array<UIPreset>} uis - UIs array with conditions based on state
     * @returns {void}
     * @memberof UIManager
     */

  }, {
    key: 'buildCustomUI',
    value: function buildCustomUI(uis) {
      if (uis.length > 0) {
        this._buildUI(uis);
      } else {
        var fallbackUIs = [{ template: function template(props) {
            return (0, _playback2.default)(props);
          } }];
        this._buildUI(fallbackUIs);
      }
    }

    /**
     * build the UI and render to targetId configured in player config
     *
     * @param {Array<UIPreset>} [uis] - UI array with conditions
     * @returns {void}
     * @memberof UIManager
     */

  }, {
    key: '_buildUI',
    value: function _buildUI(uis) {
      if (!this.player) return;

      // define the store and devtools for redux
      var store = (0, _redux.createStore)(_store2.default, window.devToolsExtension && window.devToolsExtension({ name: 'playkit #' + this.config.target, instanceId: this.config.target }));

      // i18n, redux and initial player-to-store connector setup
      var template = (0, _preact.h)(
        _preactRedux.Provider,
        { store: store },
        (0, _preact.h)(
          _preactI18n.IntlProvider,
          { definition: _fr2.default },
          (0, _preact.h)(
            _shell2.default,
            { player: this.player },
            (0, _preact.h)(_engineConnector2.default, { player: this.player }),
            (0, _preact.h)(_playerGui2.default, { uis: uis, player: this.player })
          )
        )
      );

      // render the player
      var container = document.getElementById(this.config.targetId);
      (0, _preact.render)(template, container);
    }
  }]);

  return UIManager;
}();

exports.default = UIManager;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(7);

var _engine = __webpack_require__(47);

var _engine2 = _interopRequireDefault(_engine);

var _shell = __webpack_require__(6);

var _shell2 = _interopRequireDefault(_shell);

var _playPause = __webpack_require__(17);

var _playPause2 = _interopRequireDefault(_playPause);

var _seekbar = __webpack_require__(10);

var _seekbar2 = _interopRequireDefault(_seekbar);

var _volume = __webpack_require__(37);

var _volume2 = _interopRequireDefault(_volume);

var _fullscreen = __webpack_require__(42);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _loading = __webpack_require__(36);

var _loading2 = _interopRequireDefault(_loading);

var _share = __webpack_require__(46);

var _share2 = _interopRequireDefault(_share);

var _cvaa = __webpack_require__(24);

var _cvaa2 = _interopRequireDefault(_cvaa);

var _settings = __webpack_require__(38);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({
  engine: _engine2.default,
  shell: _shell2.default,
  seekbar: _seekbar2.default,
  volume: _volume2.default,
  fullscreen: _fullscreen2.default,
  loading: _loading2.default,
  playPause: _playPause2.default,
  share: _share2.default,
  cvaa: _cvaa2.default,
  settings: _settings2.default
});
exports.default = reducer;

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = {
	"core": {
		"disable": "Disable",
		"auto": "Auto",
		"close": "Close"
	},
	"controls": {
		"play": "Play",
		"pause": "Pause",
		"share": "Share",
		"language": "Language",
		"settings": "Settings",
		"fullscreen": "Fullscreen"
	},
	"settings": {
		"quality": "Quality",
		"speed": "Speed"
	},
	"language": {
		"audio": "Audio",
		"captions": "Captions",
		"advanced_captions_settings": "Advanced captions settings"
	},
	"share": {
		"share_title": "Share",
		"link_options": "Link options"
	}
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _engine = __webpack_require__(47);

var _engine2 = _interopRequireDefault(_engine);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * EngineConnector component
 *
 * @class EngineConnector
 * @example <EngineConnector player={this.player} />
 * @extends {BaseComponent}
 */
var EngineConnector = (_dec = (0, _preactRedux.connect)(_engine2.default, (0, _bindActions.bindActions)(_engine.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(EngineConnector, _BaseComponent);

  /**
   * Creates an instance of EngineConnector.
   * @param {Object} obj obj
   * @memberof EngineConnector
   */
  function EngineConnector(obj) {
    _classCallCheck(this, EngineConnector);

    return _possibleConstructorReturn(this, (EngineConnector.__proto__ || Object.getPrototypeOf(EngineConnector)).call(this, { name: 'EngineConnector', player: obj.player }));
  }

  /**
   * after component mounted, set event listeners and update redux store
   *
   * @returns {void}
   * @memberof EngineConnector
   */


  _createClass(EngineConnector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var TrackType = this.player.Track;

      this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, function (e) {
        _this2.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
      });

      this.player.addEventListener(this.player.Event.TIME_UPDATE, function () {
        _this2.props.updateCurrentTime(_this2.player.currentTime);
      });

      this.player.addEventListener(this.player.Event.DURATION_CHANGE, function () {
        _this2.props.updateDuration(_this2.player.duration);
      });

      this.player.addEventListener(this.player.Event.LOADED_METADATA, function () {
        _this2.props.updateDuration(_this2.player.duration);
        _this2.props.updateMuted(_this2.player.muted);
        _this2.props.updateMetadataLoadingStatus(true);
        _this2.props.updatePlayerPoster(_this2.player.poster);
        _this2.props.updateIsLive(_this2.player.isLive());
        _this2.props.updateIsDvr(_this2.player.isDvr());
      });

      this.player.addEventListener(this.player.Event.VOLUME_CHANGE, function () {
        _this2.props.updateVolume(_this2.player.volume);
      });

      this.player.addEventListener(this.player.Event.PLAY, function () {
        _this2.props.updateIsPlaying(true);

        if (_this2.props.engine.isEnded) {
          _this2.props.updateIsEnded(false);
        }
      });

      this.player.addEventListener(this.player.Event.PAUSE, function () {
        _this2.props.updateIsPlaying(false);
      });

      this.player.addEventListener(this.player.Event.ENDED, function () {
        _this2.props.updateIsEnded(true);
      });

      this.player.addEventListener(this.player.Event.TRACKS_CHANGED, function () {
        var audioTracks = _this2.player.getTracks(TrackType.AUDIO);
        var videoTracks = _this2.player.getTracks(TrackType.VIDEO);
        var textTracks = _this2.player.getTracks(TrackType.TEXT);

        _this2.props.updateAudioTracks(audioTracks);
        _this2.props.updateVideoTracks(videoTracks);
        _this2.props.updateTextTracks(textTracks);
      });

      this.player.addEventListener(this.player.Event.TEXT_TRACK_CHANGED, function () {
        var tracks = _this2.player.getTracks(TrackType.TEXT);
        _this2.props.updateTextTracks(tracks);
      });

      this.player.addEventListener(this.player.Event.AUDIO_TRACK_CHANGED, function () {
        var tracks = _this2.player.getTracks(TrackType.AUDIO);
        _this2.props.updateAudioTracks(tracks);
      });

      this.player.addEventListener(this.player.Event.VIDEO_TRACK_CHANGED, function () {
        var tracks = _this2.player.getTracks(TrackType.VIDEO);
        _this2.props.updateVideoTracks(tracks);
      });

      this.player.addEventListener(this.player.Event.AD_BREAK_START, function () {
        _this2.props.updateAdBreak(true);
      });

      this.player.addEventListener(this.player.Event.AD_BREAK_END, function () {
        _this2.props.updateAdBreak(false);
      });

      this.player.addEventListener(this.player.Event.AD_PROGRESS, function (e) {
        var currentTime = e.payload.adProgress.currentTime;
        var duration = e.payload.adProgress.duration;

        _this2.props.updateAdBreakProgress(currentTime, duration);
      });

      this.player.addEventListener(this.player.Event.AD_STARTED, function () {
        _this2.props.updateAdIsPlaying(true);
      });

      this.player.addEventListener(this.player.Event.AD_RESUMED, function () {
        _this2.props.updateAdIsPlaying(true);
      });

      this.player.addEventListener(this.player.Event.AD_PAUSED, function () {
        _this2.props.updateAdIsPlaying(false);
      });

      this.player.addEventListener(this.player.Event.AD_LOADED, function (e) {
        _this2.props.updateAdClickUrl(e.payload.ad.g.clickThroughUrl);
        _this2.props.updateAdSkipTimeOffset(e.payload.ad.getSkipTimeOffset());
        _this2.props.updateAdSkippableState(e.payload.ad.getAdSkippableState());
      });
    }

    /**
     * component shouldn't update the dom if props or internal state changed
     *
     * @returns {boolean} - should component update on changes or not
     * @memberof EngineConnector
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof EngineConnector
     */

  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)('span', null);
    }
  }]);

  return EngineConnector;
}(_base2.default)) || _class);
exports.default = EngineConnector;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

var _preactRedux = __webpack_require__(1);

var _bindActions = __webpack_require__(3);

var _shell = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    metadataLoaded: state.engine.metadataLoaded,
    currentState: state.engine.playerState.currentState,
    playerClasses: state.shell.playerClasses,
    isMobile: state.shell.isMobile,
    playerWidth: state.shell.playerWidth,
    playerHeight: state.shell.playerHeight,
    playerHover: state.shell.playerHover
  };
};

/**
 * Shell component
 *
 * @class Shell
 * @example <Shell player={this.player}>...</Shell>
 * @extends {BaseComponent}
 */
var Shell = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_shell.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(Shell, _BaseComponent);

  /**
   * Creates an instance of Shell.
   * @param {Object} obj obj
   * @memberof Shell
   */
  function Shell(obj) {
    _classCallCheck(this, Shell);

    return _possibleConstructorReturn(this, (Shell.__proto__ || Object.getPrototypeOf(Shell)).call(this, { name: 'Shell', player: obj.player }));
  }

  /**
   * on mouse over, add hover class (shows the player ui) and timeout of 3 seconds bt default or what pass as prop configuration to component
   *
   * @returns {void}
   * @memberof Shell
   */


  _createClass(Shell, [{
    key: 'onMouseOver',
    value: function onMouseOver() {
      var _this2 = this;

      if (!this.state.hover) {
        this.props.updatePlayerHoverState(true);
        this.setState({ hover: true });
      }
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }
      this.hoverTimeout = setTimeout(function () {
        _this2.props.updatePlayerHoverState(false);
        _this2.setState({ hover: false });
      }, this.props.hoverTimeout || 3000);
    }

    /**
     * on mouse leave, remove the hover class (hide the player gui)
     *
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      if (this.state.hover) {
        this.setState({ hover: false });
        this.props.updatePlayerHoverState(false);
      }
    }

    /**
     * if ui hidden and mouse move, show the ui by adding the hover class
     *
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      if (!this.state.hover) {
        this.setState({ hover: true });
        this.props.updatePlayerHoverState(true);
      }
    }

    /**
     * after component mounted, update the isMobile indication in the store state,
     * add event listener to get the player width and update these on resize as well.
     * also, update document width initially and on resize.
     *
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.props.updateIsMobile(!!this.player.env.device.type);
      if (document.body) {
        this.props.updateDocumentWidth(document.body.clientWidth);
      }
      this.player.addEventListener(this.player.Event.LOADED_METADATA, function () {
        _this3.props.updatePlayerWidth(_this3.player.getView().parentElement.clientWidth);
      });
      window.addEventListener('resize', function () {
        _this3.props.updatePlayerWidth(_this3.player.getView().parentElement.clientWidth);

        if (document.body) {
          _this3.props.updateDocumentWidth(document.body.clientWidth);
        }
      });
      if (this.player.env.device.type) {
        this.props.updatePlayerHoverState(true);
      }
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof Shell
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this4 = this;

      var playerClasses = 'player skin-default';
      playerClasses += ' ' + props.playerClasses.join(' ');

      if (this.props.isMobile) playerClasses += ' touch';
      if (this.props.playerHover) playerClasses += ' hover';
      if (this.props.metadataLoaded) playerClasses += ' metadata-loaded';
      if (this.props.metadataLoaded) playerClasses += ' state-' + this.props.currentState;

      return (0, _preact.h)(
        'div',
        {
          className: playerClasses,
          onMouseOver: function onMouseOver() {
            return _this4.onMouseOver();
          },
          onMouseMove: function onMouseMove() {
            return _this4.onMouseMove();
          },
          onMouseLeave: function onMouseLeave() {
            return _this4.onMouseLeave();
          }
        },
        props.children
      );
    }
  }]);

  return Shell;
}(_base2.default)) || _class);
exports.default = Shell;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    state: {
      shell: state.shell,
      engine: {
        adBreak: state.engine.adBreak,
        isLive: state.engine.isLive
      }
    }
  };
};

/**
 * Player GUI component
 *
 * @class PlayerGUI
 * @extends {Component}
 */
var PlayerGUI = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_Component) {
  _inherits(PlayerGUI, _Component);

  function PlayerGUI() {
    _classCallCheck(this, PlayerGUI);

    return _possibleConstructorReturn(this, (PlayerGUI.__proto__ || Object.getPrototypeOf(PlayerGUI)).apply(this, arguments));
  }

  _createClass(PlayerGUI, [{
    key: 'getMatchedUI',

    /**
     * get the single matched UI to render based on the UIs and it's conditions
     *
     * @param {Array<any>} uis - UIs array with conditions
     * @param {Object} state - state to be used in the condition check
     * @returns {*} - matched UI
     * @memberof PlayerGUI
     */
    value: function getMatchedUI(uis, state) {
      var matchedUI = void 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = uis[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ui = _step.value;

          if (typeof ui.condition === 'undefined' || ui.condition(state)) {
            matchedUI = ui;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return matchedUI;
    }

    /**
     * render component based on the matched UI.
     * if no matched UI found, it will choose the first UI configured in the UI array
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof PlayerGUI
     */

  }, {
    key: 'render',
    value: function render(props) {
      var uiToRender = void 0;

      if (this.props.uis.length > 0) {
        uiToRender = this.getMatchedUI(props.uis, props.state);
        return uiToRender ? uiToRender.template(props) : this.props.uis[0].template(props);
      } else {
        return undefined;
      }
    }
  }]);

  return PlayerGUI;
}(_preact.Component)) || _class);
exports.default = PlayerGUI;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(118)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(117)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, ".row {\n  display: block; }\n  .row:after {\n    content: '';\n    clear: both;\n    display: block; }\n\n.d-inline-block {\n  display: inline-block; }\n\n.mobile-hidden-select {\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0px;\n  width: 100%;\n  height: 100%; }\n\n.font-size-base {\n  font-size: 15px; }\n\n.form-group {\n  margin: 10px 0;\n  position: relative;\n  max-width: 100%; }\n  .form-group.has-error .form-control {\n    border-color: #db1f26; }\n    .form-group.has-error .form-control:focus {\n      border-color: #fff; }\n  .form-group.has-icon .form-control {\n    padding-left: 34px; }\n  .form-group .icon {\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    width: 32px;\n    height: 32px;\n    fill: rgba(255, 255, 255, 0.4); }\n\n.form-control {\n  height: 36px;\n  width: 100%;\n  min-width: 72px;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  background-color: rgba(0, 0, 0, 0.4);\n  font-size: 15px;\n  line-height: 18px;\n  color: #fff;\n  padding: 8px 10px;\n  text-overflow: ellipsis; }\n  .form-control::-webkit-input-placeholder {\n    color: rgba(255, 255, 255, 0.6); }\n  .form-control:focus {\n    background-color: #fff;\n    border-color: #fff;\n    color: #333; }\n    .form-control:focus::-webkit-input-placeholder {\n      color: #ccc; }\n    .form-control:focus + .icon {\n      fill: #999; }\n\ntextarea.form-control {\n  min-height: 72px; }\n\nselect {\n  font-size: 15px;\n  font-family: \"Lato\", sans-serif;\n  color: #fff;\n  -webkit-appearance: none;\n  border: 0;\n  background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23FFFFFF' viewBox='0 0 1024 1024'><path d='M301.255 338.745c-24.994-24.994-65.516-24.994-90.51 0s-24.994 65.516 0 90.51l256 256c24.994 24.994 65.516 24.994 90.51 0l256-256c24.994-24.994 24.994-65.516 0-90.51s-65.516-24.994-90.51 0l-210.745 210.745-210.745-210.745z' /></svg>\") no-repeat;\n  background-size: 16px;\n  background-position: 100% center;\n  background-repeat: no-repeat;\n  padding-right: 24px; }\n\n.checkbox {\n  font-size: 15px;\n  position: relative; }\n  .checkbox input {\n    display: none; }\n  .checkbox label:before {\n    height: 16px;\n    width: 16px;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    border-radius: 4px;\n    background-color: rgba(0, 0, 0, 0.4);\n    margin-right: 8px;\n    display: inline-block;\n    content: '';\n    vertical-align: middle; }\n  .checkbox input:checked + label:before {\n    border: 1px solid #fff;\n    background: #fff; }\n\n.form-group-row {\n  font-size: 15px;\n  margin: 24px 0; }\n  .form-group-row:after {\n    clear: both;\n    content: ' ';\n    display: block; }\n  .form-group-row label {\n    float: left;\n    color: rgba(244, 244, 244, 0.8); }\n  .form-group-row .dropdown {\n    float: right; }\n\n.btn {\n  text-decoration: none;\n  height: 36px;\n  border-radius: 18px;\n  color: #fff;\n  line-height: 36px;\n  font-weight: bold;\n  cursor: pointer;\n  display: inline-block;\n  padding: 0 24px; }\n  .btn.btn-block {\n    display: block; }\n  .btn.btn-dark-transparent {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px solid rgba(255, 255, 255, 0.2);\n    line-height: 32px; }\n    .btn.btn-dark-transparent:hover {\n      color: #fff;\n      border: 2px solid rgba(255, 255, 255, 0.4); }\n  .btn.btn-branded {\n    background-color: #01ACCD; }\n    .btn.btn-branded:hover {\n      color: #fff; }\n\n.btn-rounded {\n  height: 36px;\n  width: 36px;\n  min-width: 36px;\n  min-height: 36px;\n  border-radius: 18px;\n  background-color: rgba(0, 0, 0, 0.4);\n  display: inline-block;\n  padding: 2px;\n  fill: #fff; }\n\n@keyframes openDropmenu {\n  from {\n    opacity: 0;\n    transform: translateY(10px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.dropdown {\n  position: relative;\n  font-size: 15px; }\n  .dropdown.active .dropdown-menu {\n    display: block;\n    opacity: 1; }\n  .dropdown.active .dropdown-button .icon {\n    transform: rotate(180deg); }\n  .dropdown .dropdown-button {\n    font-weight: bold;\n    line-height: 18px;\n    color: #fff;\n    cursor: pointer;\n    padding-left: 20px; }\n    .dropdown .dropdown-button .icon {\n      width: 16px;\n      height: 16px;\n      fill: #fff;\n      vertical-align: middle;\n      margin-left: 6px;\n      transition: 150ms transform;\n      will-change: transform; }\n\n.dropdown-menu {\n  display: block;\n  opacity: 1;\n  position: absolute;\n  background-color: #333333;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 6px 0;\n  z-index: 5;\n  animation: openDropmenu 100ms ease-out forwards;\n  max-height: 173px;\n  overflow-y: auto;\n  font-size: 15px; }\n  .dropdown-menu.top {\n    margin-bottom: 10px;\n    bottom: 100%; }\n  .dropdown-menu.bottom {\n    margin-top: 10px;\n    top: 100%; }\n  .dropdown-menu.right {\n    left: 0; }\n  .dropdown-menu.left {\n    right: 0; }\n  .dropdown-menu .dropdown-menu-item {\n    padding: 2px 10px 2px 16px;\n    white-space: nowrap;\n    min-height: 30px;\n    cursor: pointer; }\n    .dropdown-menu .dropdown-menu-item:hover {\n      color: #fff; }\n    .dropdown-menu .dropdown-menu-item.active {\n      color: #01ACCD;\n      fill: #01ACCD; }\n    .dropdown-menu .dropdown-menu-item .check-icon {\n      display: inline-block;\n      margin-left: 16px;\n      vertical-align: middle;\n      width: 24px;\n      height: 24px; }\n    .dropdown-menu .dropdown-menu-item span {\n      vertical-align: middle;\n      line-height: 26px; }\n\n.tooltip {\n  display: inline-block;\n  height: 22px;\n  border-radius: 4px;\n  background-color: #FFFFFF;\n  padding: 3px 13px;\n  color: #333333;\n  font-size: 13px;\n  font-weight: bold;\n  line-height: 16px;\n  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3); }\n\n.player .control-button {\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  display: inline-block;\n  opacity: 0.8;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  fill: #fff; }\n  .player .control-button svg {\n    width: 32px;\n    height: 32px; }\n  .player .control-button.active {\n    opacity: 1; }\n  .player .control-button.control-button-rounded {\n    width: 36px;\n    height: 36px;\n    padding: 2px; }\n\n.player:not(.touch) .control-button:hover {\n  opacity: 1; }\n\n.player:not(.touch) .control-button.control-button-rounded:hover {\n  background-color: rgba(0, 0, 0, 0.4);\n  border-radius: 18px; }\n\n.player .control-button-container {\n  display: inline-block;\n  position: relative;\n  vertical-align: top; }\n\n.player.touch .player .control-button-container {\n  position: static; }\n\n.player.touch .control-button {\n  position: relative; }\n\na {\n  color: #01ACCD;\n  text-decoration: underline;\n  font-size: 15px;\n  line-height: 18px; }\n  a:hover {\n    color: #01819a; }\n  a:active {\n    opacity: 0.7; }\n\n.kaltura-player-container {\n  position: absolute !important;\n  top: 0;\n  background-color: #000; }\n\n.player {\n  overflow: hidden;\n  user-select: none;\n  width: 100%; }\n  .player:-webkit-full-screen {\n    width: 100%;\n    height: 100%;\n    max-width: none; }\n  .player * {\n    box-sizing: border-box;\n    outline: none; }\n  .player ::selection {\n    background-color: rgba(0, 0, 0, 0.1); }\n  .player video {\n    width: 100%; }\n  .player .player-gui {\n    opacity: 0;\n    overflow: hidden;\n    font-size: 0;\n    font-family: \"Lato\", sans-serif; }\n    .player .player-gui input, .player .player-gui textarea {\n      font-family: \"Lato\", sans-serif; }\n  .player #overlay-portal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n  .player.metadata-loaded .player-gui,\n  .player.state-paused .player-gui,\n  .player.overlay-active .player-gui,\n  .player.menu-active .player-gui {\n    opacity: 1; }\n\nvideo {\n  left: 0; }\n  video::-webkit-media-controls-panel-container, video::-webkit-media-controls {\n    display: none !important;\n    -webkit-appearance: none; }\n  video::-webkit-media-controls-start-playback-button {\n    display: none !important;\n    -webkit-appearance: none; }\n\nvideo::cue {\n  background-color: transparent;\n  font-family: \"Lato\", sans-serif; }\n\n.player.captions-yellow-text video::cue {\n  color: #FAFF00; }\n\n.player.captions-black-bg video::cue {\n  background-color: #000; }\n\n.player video::-webkit-media-text-track-display {\n  transform: translateY(0px);\n  transition: ease-in 100ms; }\n\n.player.state-paused video::-webkit-media-text-track-display,\n.player.hover video::-webkit-media-text-track-display {\n  transform: translateY(-60px);\n  transition: ease-out 100ms; }\n\n@keyframes openOverlay {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.overlay {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: none;\n  opacity: 0;\n  animation: openOverlay 100ms ease-in-out forwards;\n  z-index: 4; }\n  .overlay.active {\n    display: block;\n    opacity: 1; }\n  .overlay .overlay-contents {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.42);\n    z-index: 4;\n    text-align: center;\n    color: #fff;\n    padding: 80px 20px;\n    overflow-y: auto; }\n  .overlay .title {\n    font-size: 24px;\n    font-weight: bold;\n    line-height: 29px;\n    margin-bottom: 60px; }\n  .overlay .close-overlay {\n    position: absolute;\n    top: 48px;\n    right: 48px;\n    z-index: 5;\n    fill: #fff;\n    cursor: pointer; }\n    .overlay .close-overlay .icon-close {\n      width: 24px;\n      height: 24px; }\n  .overlay .overlay-screen {\n    display: none; }\n    .overlay .overlay-screen.active {\n      display: block; }\n\n@media screen and (max-width: 768px) {\n  .overlay .overlay-contents {\n    padding: 36px 20px; }\n  .overlay .close-overlay {\n    top: 38px; }\n  .overlay .title {\n    margin-bottom: 24px; } }\n\n@media screen and (max-width: 480px) {\n  .overlay .overlay-contents {\n    padding: 16px 24px; }\n  .overlay .close-overlay {\n    top: 15px;\n    right: 24px; }\n  .overlay .title {\n    font-size: 16px;\n    line-height: 19px;\n    margin-bottom: 24px; } }\n\n@keyframes openSmartContainer {\n  from {\n    opacity: 0;\n    transform: translateY(10px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n@keyframes closeSmartContainer {\n  from {\n    opacity: 1;\n    transform: translateY(0); }\n  to {\n    opacity: 0;\n    transform: translateY(10px); } }\n\n.player:not(.touch) .smart-container {\n  background-color: #222222;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  position: absolute;\n  right: 0px;\n  min-width: 193px;\n  font-size: 15px;\n  z-index: 5;\n  display: block;\n  animation: openSmartContainer 100ms ease-out forwards; }\n  .player:not(.touch) .smart-container.leaving {\n    animation: closeSmartContainer 100ms ease-out forwards; }\n  .player:not(.touch) .smart-container.top {\n    bottom: 100%;\n    margin-bottom: 6px; }\n    .player:not(.touch) .smart-container.top:before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      bottom: -6px;\n      left: 0;\n      width: 100%;\n      height: 6px; }\n  .player:not(.touch) .smart-container.bottom {\n    top: 100%;\n    margin-top: 6px; }\n  .player:not(.touch) .smart-container.right {\n    left: 0px; }\n  .player:not(.touch) .smart-container.left {\n    right: 0px; }\n  .player:not(.touch) .smart-container .smart-container-item {\n    margin: 16px;\n    color: rgba(244, 244, 244, 0.8);\n    white-space: nowrap; }\n    .player:not(.touch) .smart-container .smart-container-item:after {\n      display: block;\n      content: ' ';\n      clear: both; }\n    .player:not(.touch) .smart-container .smart-container-item.select-menu-item label {\n      float: left; }\n      .player:not(.touch) .smart-container .smart-container-item.select-menu-item label .label-icon {\n        display: none; }\n    .player:not(.touch) .smart-container .smart-container-item.select-menu-item .dropdown, .player:not(.touch) .smart-container .smart-container-item.select-menu-item select {\n      float: right; }\n    .player:not(.touch) .smart-container .smart-container-item.select-menu-item select {\n      text-align-last: right; }\n\n.touch .smart-container-item {\n  width: 300px;\n  max-width: 100%;\n  margin: 16px auto;\n  color: rgba(244, 244, 244, 0.8);\n  white-space: nowrap;\n  text-align: left; }\n  .touch .smart-container-item:after {\n    display: block;\n    content: ' ';\n    clear: both; }\n  .touch .smart-container-item.select-menu-item label {\n    float: left;\n    font-size: 16px;\n    color: rgba(255, 255, 255, 0.8);\n    fill: #fff; }\n    .touch .smart-container-item.select-menu-item label .label-icon {\n      width: 24px;\n      height: 24px;\n      display: inline-block;\n      vertical-align: middle;\n      margin-right: 16px; }\n  .touch .smart-container-item.select-menu-item .dropdown, .touch .smart-container-item.select-menu-item select {\n    float: right; }\n  .touch .smart-container-item.select-menu-item select {\n    text-align-last: right; }\n\n.overlay.share-overlay .share-icons {\n  margin: 60px 0; }\n  .overlay.share-overlay .share-icons .btn-rounded {\n    margin: 0 8px;\n    transition: transform 100ms;\n    will-change: transform; }\n    .overlay.share-overlay .share-icons .btn-rounded:first-child {\n      margin-left: 0; }\n    .overlay.share-overlay .share-icons .btn-rounded:last-child {\n      margin-right: 0; }\n    .overlay.share-overlay .share-icons .btn-rounded.facebook-share-btn {\n      background-color: #3B5998; }\n    .overlay.share-overlay .share-icons .btn-rounded.twitter-share-btn {\n      background-color: #1DA1F2; }\n    .overlay.share-overlay .share-icons .btn-rounded.google-plus-share-btn {\n      background-color: #DD4B39; }\n    .overlay.share-overlay .share-icons .btn-rounded.linkedin-share-btn {\n      background-color: #00A0DC; }\n\n.share-main-container {\n  width: 300px;\n  max-width: 100%;\n  margin: 0 auto;\n  text-align: center; }\n\n.link-options-container {\n  width: 400px;\n  max-width: 100%;\n  text-align: left;\n  margin: 0 auto; }\n  .link-options-container .copy-url-row {\n    display: flex; }\n    .link-options-container .copy-url-row .input-copy-url {\n      margin: 0; }\n    .link-options-container .copy-url-row .btn-copy-url {\n      margin-left: 16px; }\n      .link-options-container .copy-url-row .btn-copy-url .icon {\n        will-change: transform;\n        transition: 100ms transform;\n        position: absolute;\n        width: 32px; }\n      .link-options-container .copy-url-row .btn-copy-url .check-icon {\n        transform: scale(0);\n        opacity: 0; }\n      .link-options-container .copy-url-row .btn-copy-url.copied {\n        background-color: #009444; }\n        .link-options-container .copy-url-row .btn-copy-url.copied .copy-icon {\n          transform: scale(0);\n          opacity: 0; }\n        .link-options-container .copy-url-row .btn-copy-url.copied .check-icon {\n          transform: scale(1);\n          opacity: 1; }\n  .link-options-container .video-start-options-row {\n    margin-top: 24px; }\n    .link-options-container .video-start-options-row .checkbox {\n      margin-right: 15px; }\n    .link-options-container .video-start-options-row .form-group {\n      margin: 0; }\n\n.player:not(.touch) .overlay.share-overlay .share-icons .btn-rounded:hover {\n  transform: scale(1.1667); }\n\n@media screen and (max-width: 768px) {\n  .overlay.share-overlay .share-icons {\n    margin: 40px 0; } }\n\n@media screen and (max-width: 480px) {\n  .overlay.share-overlay .share-icons {\n    margin: 20px 0; } }\n\n.overlay.cvaa-overlay .sample {\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 36px;\n  text-align: center;\n  padding: 0 31px;\n  display: inline-block;\n  margin: 0 12px;\n  cursor: pointer; }\n  .overlay.cvaa-overlay .sample.black-bg {\n    background-color: #000; }\n  .overlay.cvaa-overlay .sample.yellow-text {\n    color: #FAFF00; }\n\n.overlay.cvaa-overlay .button-save-cvaa {\n  margin-top: 50px;\n  height: 40px;\n  width: 400px;\n  max-width: 100%;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 38px;\n  text-align: center;\n  display: inline-block;\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.overlay.cvaa-overlay .custom-caption-form {\n  width: 300px;\n  max-width: 100%;\n  margin: 0 auto; }\n\n@media screen and (max-width: 480px) {\n  .overlay.cvaa-overlay .sample {\n    width: 30%;\n    margin: 2.33%;\n    padding: 0; }\n    .overlay.cvaa-overlay .sample:first-child {\n      margin-left: 0; }\n    .overlay.cvaa-overlay .sample:last-child {\n      margin-right: 0; }\n  .overlay.cvaa-overlay .button-save-cvaa {\n    margin-top: 20px; } }\n\n@keyframes kaltura-spinner {\n  0% {\n    transform: rotate(0deg) scale(0.7);\n    opacity: 1; }\n  70% {\n    transform: rotate(360deg) scale(0.7);\n    opacity: 1; }\n  82% {\n    transform: rotate(360deg) scale(0);\n    opacity: 0; }\n  87% {\n    transform: rotate(360deg) scale(0.9);\n    opacity: 1; }\n  100% {\n    transform: rotate(360deg) scale(0.7);\n    opacity: 1; } }\n\n.loading-backdrop {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n  transition: 100ms opacity;\n  opacity: 0; }\n  .loading-backdrop.show {\n    opacity: 1; }\n    .loading-backdrop.show .spinner-container {\n      display: block; }\n  .loading-backdrop .spinner-container {\n    display: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate3d(-50px, -50px, 0); }\n\n.spinner {\n  width: 100px;\n  height: 100px;\n  position: relative;\n  animation: kaltura-spinner 2.5s infinite; }\n  .spinner span {\n    width: 8px;\n    height: 8px;\n    background-color: #fff;\n    display: block;\n    border-radius: 8px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-top: -4px;\n    margin-left: -4px; }\n    .spinner span:nth-child(1) {\n      transform: rotate(45deg) translateX(-25px) translateY(-25px);\n      background-color: #da1f26; }\n    .spinner span:nth-child(2) {\n      transform: rotate(90deg) translateX(-25px) translateY(-25px);\n      background-color: #06a885; }\n    .spinner span:nth-child(3) {\n      transform: rotate(135deg) translateX(-25px) translateY(-25px);\n      background-color: #009344; }\n    .spinner span:nth-child(4) {\n      transform: rotate(180deg) translateX(-25px) translateY(-25px);\n      background-color: #f8a61a; }\n    .spinner span:nth-child(5) {\n      transform: rotate(225deg) translateX(-25px) translateY(-25px);\n      background-color: #1b4a97; }\n    .spinner span:nth-child(6) {\n      transform: rotate(270deg) translateX(-25px) translateY(-25px);\n      background-color: #00abcc; }\n    .spinner span:nth-child(7) {\n      transform: rotate(315deg) translateX(-25px) translateY(-25px);\n      background-color: #b1d238; }\n    .spinner span:nth-child(8) {\n      transform: rotate(360deg) translateX(-25px) translateY(-25px);\n      background-color: #fcd203; }\n\n.control-button-container.control-play-pause .control-button {\n  transition: 400ms transform; }\n  .control-button-container.control-play-pause .control-button .icon-pause {\n    transition: 400ms opacity;\n    opacity: 0;\n    display: none; }\n  .control-button-container.control-play-pause .control-button .icon-play {\n    transition: 400ms opacity;\n    opacity: 1;\n    display: block; }\n  .control-button-container.control-play-pause .control-button.is-playing {\n    transform: rotate(360deg); }\n    .control-button-container.control-play-pause .control-button.is-playing .icon-pause {\n      opacity: 1;\n      display: block; }\n    .control-button-container.control-play-pause .control-button.is-playing .icon-play {\n      opacity: 0;\n      display: none; }\n\n.touch .control-button-container.control-play-pause {\n  display: none; }\n\n@media screen and (max-width: 480px) {\n  .control-button-container.control-play-pause {\n    display: none; } }\n\n.control-button-container.volume-control:hover .volume-control-bar {\n  display: block !important; }\n\n.control-button-container.volume-control.is-muted .volume-waves {\n  opacity: 0;\n  transform: translateX(-5px); }\n\n.control-button-container.volume-control.is-muted .volume-mute {\n  opacity: 1;\n  transform: scale(1); }\n\n.control-button-container.volume-control.dragging-active .volume-control-bar {\n  display: block; }\n\n.control-button-container.volume-control .volume-waves {\n  transform: translateX(0px); }\n\n.control-button-container.volume-control .volume-mute {\n  opacity: 1;\n  transform: scale(0); }\n\n.control-button-container.volume-control .volume-waves, .control-button-container.volume-control .volume-mute {\n  transition: 300ms transform, 300ms opacity; }\n\n.control-button-container.volume-control svg {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.volume-control-bar {\n  position: absolute;\n  z-index: 2;\n  bottom: 38px;\n  left: 0px;\n  display: block;\n  height: 112px;\n  width: 34px;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);\n  background-color: #333333;\n  padding: 6px;\n  display: none; }\n  .volume-control-bar:before {\n    position: absolute;\n    width: 34px;\n    height: 14px;\n    bottom: -8px;\n    left: 0;\n    content: ' ';\n    display: block; }\n  .volume-control-bar .bar {\n    background-color: #424242;\n    height: 100%;\n    position: relative;\n    cursor: pointer; }\n  .volume-control-bar .progress {\n    position: absolute;\n    bottom: 0px;\n    left: 0px;\n    width: 100%;\n    border-radius: 0 0 2px 2px;\n    background-color: #01ACCD; }\n\n.touch .control-button-container.volume-control {\n  display: none; }\n\n@media screen and (max-width: 480px) {\n  .control-button-container.volume-control {\n    display: none; } }\n\n.control-button-container.control-fullscreen .control-button {\n  transition: 100ms transform;\n  transform: scale(1); }\n  .control-button-container.control-fullscreen .control-button .icon-minimize {\n    display: none; }\n  .control-button-container.control-fullscreen .control-button.is-fullscreen .icon-maximize {\n    display: none; }\n  .control-button-container.control-fullscreen .control-button.is-fullscreen .icon-minimize {\n    display: block; }\n\n.player:not(.touch) .control-button-container.control-fullscreen .control-button:hover {\n  transform: scale(1.1); }\n\n.player .seek-bar {\n  padding: 6px 0;\n  cursor: pointer;\n  position: relative; }\n  .player .seek-bar:hover .time-preview,\n  .player .seek-bar:hover .frame-preview, .player .seek-bar.hover .time-preview,\n  .player .seek-bar.hover .frame-preview, .player .seek-bar.dragging-active .time-preview,\n  .player .seek-bar.dragging-active .frame-preview {\n    display: block; }\n  .player .seek-bar:hover .progress-bar .scrubber, .player .seek-bar.hover .progress-bar .scrubber, .player .seek-bar.dragging-active .progress-bar .scrubber {\n    transform: scale(1); }\n  .player .seek-bar:hover .progress-bar .virtual-progress, .player .seek-bar.hover .progress-bar .virtual-progress, .player .seek-bar.dragging-active .progress-bar .virtual-progress {\n    display: block; }\n  .player .seek-bar.ad-break {\n    cursor: initial; }\n    .player .seek-bar.ad-break .progress-bar .progress {\n      background-color: #F9A71B; }\n  .player .seek-bar.live .progress-bar .progress {\n    background-color: #DA1F26; }\n  .player .seek-bar .progress-bar {\n    height: 4px;\n    background-color: rgba(255, 255, 255, 0.3);\n    border-radius: 2px;\n    position: relative; }\n    .player .seek-bar .progress-bar .progress {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      z-index: 2;\n      border-radius: 2px 0 0 2px;\n      background-color: #01ACCD; }\n    .player .seek-bar .progress-bar .virtual-progress {\n      display: none; }\n    .player .seek-bar .progress-bar .buffered, .player .seek-bar .progress-bar .virtual-progress {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      z-index: 1;\n      border-radius: 2px 0 0 2px;\n      background-color: rgba(255, 255, 255, 0.3); }\n    .player .seek-bar .progress-bar .scrubber {\n      position: absolute;\n      z-index: 3;\n      cursor: pointer;\n      display: block;\n      top: -6px;\n      right: -8px;\n      border-radius: 8px;\n      height: 16px;\n      width: 16px;\n      background-color: #FFFFFF;\n      box-shadow: 0 0 31px 0 rgba(0, 0, 0, 0.3);\n      transform: scale(0);\n      transition: 100ms transform; }\n      .player .seek-bar .progress-bar .scrubber:active {\n        opacity: 1;\n        cursor: grabbing; }\n  .player .seek-bar .frame-preview {\n    position: absolute;\n    bottom: 16px;\n    left: 0;\n    height: 94px;\n    width: 164px;\n    border: 2px solid rgba(255, 255, 255, 0.2);\n    border-radius: 4px; }\n    .player .seek-bar .frame-preview .frame-preview-img {\n      background-size: auto 100%;\n      width: 100%;\n      height: 100%;\n      position: relative; }\n  .player .seek-bar .time-preview {\n    position: absolute;\n    bottom: 22px;\n    left: 0;\n    z-index: 10;\n    height: 22px;\n    min-width: 48px;\n    padding: 0 3px;\n    text-align: center;\n    border-radius: 3px;\n    background-color: rgba(0, 0, 0, 0.7);\n    font-size: 13px;\n    font-weight: bold;\n    line-height: 22px;\n    color: #fff; }\n  .player .seek-bar .time-preview,\n  .player .seek-bar .frame-preview {\n    display: none; }\n\n.touch .virtual-progress, .touch .time-preview, .touch .frame-preview {\n  display: none !important; }\n\n@media screen and (max-width: 480px) {\n  .virtual-progress, .time-preview, .frame-preview {\n    display: none; } }\n\n.player .time-display {\n  display: inline-block;\n  line-height: 32px;\n  vertical-align: top;\n  font-size: 14px;\n  padding: 0 23px;\n  font-weight: bold; }\n\n.touch .time-display {\n  padding-left: 0; }\n\n@media screen and (max-width: 480px) {\n  .player .time-display {\n    padding: 0 12px 0 0; } }\n\n.player .video-playing-title {\n  font-size: 15px;\n  font-weight: bold;\n  line-height: 18px;\n  padding: 6px 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.player .bottom-bar {\n  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);\n  padding: 6px 16px;\n  color: #fff;\n  opacity: 0;\n  transition: 100ms opacity;\n  width: 100%;\n  margin-top: auto;\n  position: absolute;\n  bottom: 0;\n  left: 0; }\n  .player .bottom-bar .left-controls {\n    float: left;\n    text-align: left; }\n    .player .bottom-bar .left-controls:first-child {\n      margin-left: 0px; }\n  .player .bottom-bar .right-controls {\n    float: right;\n    text-align: left; }\n    .player .bottom-bar .right-controls .control-button-container {\n      margin: 0 6px; }\n      .player .bottom-bar .right-controls .control-button-container:last-child {\n        margin-right: 0; }\n\n.player.hover .bottom-bar,\n.player.state-paused .bottom-bar,\n.player.menu-active .bottom-bar {\n  opacity: 1; }\n\n.player.overlay-active .bottom-bar {\n  opacity: 0; }\n\n@media screen and (max-width: 480px) {\n  .player .bottom-bar {\n    padding: 6px 8px; } }\n\n.player .top-bar {\n  background: linear-gradient(0deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);\n  padding: 14px 16px;\n  color: #fff;\n  opacity: 0;\n  transition: 100ms opacity;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0; }\n  .player .top-bar .left-controls {\n    text-align: left;\n    min-width: 0; }\n  .player .top-bar .right-controls {\n    text-align: left; }\n    .player .top-bar .right-controls .control-button-container {\n      margin: 0 6px; }\n      .player .top-bar .right-controls .control-button-container:last-child {\n        margin-right: 0; }\n\n.player.hover .top-bar,\n.player.state-paused .top-bar,\n.player.menu-active .top-bar {\n  opacity: 1; }\n\n.player.overlay-active .top-bar {\n  opacity: 0; }\n\n@media screen and (max-width: 480px) {\n  .player .top-bar {\n    padding: 8px 8px 20px 8px; } }\n\n@keyframes overlayPlayIconIn {\n  from {\n    opacity: 1;\n    transform: scale(0); }\n  to {\n    opacity: 0;\n    transform: scale(1); } }\n\n.overlay-play {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n  .overlay-play.in .icon {\n    animation: overlayPlayIconIn 400ms linear forwards; }\n  .overlay-play .icon {\n    width: 144px;\n    height: 144px;\n    fill: #fff;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -72px 0 0 -72px;\n    opacity: 0; }\n\n.pre-playback-play-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n  background-position: center center;\n  background-size: cover; }\n  .pre-playback-play-overlay .pre-playback-play-button {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    height: 108px;\n    width: 108px;\n    border: 2px solid rgba(255, 255, 255, 0.2);\n    background-color: rgba(0, 0, 0, 0.5);\n    margin: -54px 0 0 -54px;\n    border-radius: 54px;\n    fill: #fff;\n    padding: 20px;\n    cursor: pointer; }\n    .pre-playback-play-overlay .pre-playback-play-button:hover {\n      border: 2px solid rgba(255, 255, 255, 0.4); }\n    .pre-playback-play-overlay .pre-playback-play-button:active {\n      opacity: 0.7;\n      transform: scale(1); }\n\n.pre-playback .player-gui {\n  opacity: 0 !important;\n  display: none; }\n\n.btn-skip-ad {\n  position: absolute;\n  bottom: 60px;\n  right: 16px; }\n\n.skip-ad {\n  color: #fff;\n  font-size: 20px;\n  font-weight: bold;\n  line-height: 24px;\n  text-shadow: 0 0 6px rgba(0, 0, 0, 0.6);\n  position: absolute;\n  bottom: 66px;\n  right: 16px; }\n\n.live-tag {\n  color: #DA1F26;\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 1px;\n  line-height: 19px;\n  border: 2px solid #DA1F26;\n  border-radius: 4px;\n  text-transform: uppercase;\n  text-align: center;\n  display: inline-block;\n  padding: 0 3px 0 5px;\n  margin: 5px 23px;\n  cursor: default; }\n  .live-tag.non-live-playhead {\n    background-color: rgba(255, 255, 255, 0.2);\n    border: none;\n    color: #fff;\n    line-height: 23px;\n    padding: 0 5px 0 7px;\n    cursor: pointer; }\n\n@media screen and (max-width: 480px) {\n  .live-tag {\n    margin-left: 0; } }\n", ""]);

// exports


/***/ }),
/* 117 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(119);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 119 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=playkit-ui.js.map