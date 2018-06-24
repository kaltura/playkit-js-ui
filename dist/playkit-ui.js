(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("playkit-js"));
	else if(typeof define === 'function' && define.amd)
		define(["playkit-js"], factory);
	else if(typeof exports === 'object')
		exports["ui"] = factory(require("playkit-js"));
	else
		root["playkit"] = root["playkit"] || {}, root["playkit"]["ui"] = factory(root["playkit"]["core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_33__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
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
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(113)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return Provider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return connect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectAdvanced", function() { return connectAdvanced; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(12);



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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(28)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _playkitJs = __webpack_require__(33);

var _playkitJs2 = _interopRequireDefault(_playkitJs);

var _logger = __webpack_require__(29);

var _logger2 = _interopRequireDefault(_logger);

var _eventDispatcher = __webpack_require__(56);

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
    _this.logger = (0, _logger2.default)('UI ' + _this.name);
    _this.logger.debug('Initialized');
    return _this;
  }

  /**
   * Notify the store that a clickable component has been clicked.
   * @param {any} payload - Optional payload.
   * @returns {void}
   *
   * @memberof BaseComponent
   */


  _createClass(BaseComponent, [{
    key: 'notifyClick',
    value: function notifyClick(payload) {
      this.context.store.dispatch({
        type: _eventDispatcher.types.COMPONENT_CLICKED,
        name: this.name,
        payload: payload
      });
    }

    /**
     * Notify the store that a changeable component has been change.
     * @param {any} payload - Optional payload.
     * @returns {void}
     *
     * @memberof BaseComponent
     */

  }, {
    key: 'notifyChange',
    value: function notifyChange(payload) {
      this.context.store.dispatch({
        type: _eventDispatcher.types.COMPONENT_CHANGED,
        name: this.name,
        payload: payload
      });
    }
  }]);

  return BaseComponent;
}(_preact.Component);

exports.default = BaseComponent;
exports.BaseComponent = BaseComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconType = exports.Icon = exports.default = undefined;

var _icon = __webpack_require__(37);

Object.defineProperty(exports, 'Icon', {
  enumerable: true,
  get: function get() {
    return _icon.Icon;
  }
});
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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.bindActions = bindActions;

var _redux = __webpack_require__(12);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeyName = getKeyName;
exports.isTab = isTab;
exports.isEnter = isEnter;
exports.isEsc = isEsc;
var KeyMap = exports.KeyMap = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  C: 67,
  F: 70,
  M: 77,
  SEMI_COLON: 186,
  COMMA: 188,
  PERIOD: 190
};

/**
 * gets the key name for a certain key code
 * @param {number} keyCode - key code
 * @returns {string} - key name
 */
function getKeyName(keyCode) {
  for (var keyName in KeyMap) {
    if (KeyMap[keyName] === keyCode) {
      return keyName;
    }
  }
  return 'NOT_FOUND';
}

/**
 * @param {number} keyCode - key code
 * @returns {boolean} - whether the given key code is a tab key
 */
function isTab(keyCode) {
  return isKeyEqual(keyCode, KeyMap.TAB);
}

/**
 * @param {number} keyCode - key code
 * @returns {boolean} - whether the given key code is an enter key
 */
function isEnter(keyCode) {
  return isKeyEqual(keyCode, KeyMap.ENTER);
}

/**
 * @param {number} keyCode - key code
 * @returns {boolean} - whether the given key code is an esc key
 */
function isEsc(keyCode) {
  return isKeyEqual(keyCode, KeyMap.ESC);
}

/**
 * @param {number} inputKeyCode - input key code
 * @param {number} targetKeyCode - target key code
 * @returns {boolean} - whether the given key code is equals to the input key
 */
function isKeyEqual(inputKeyCode, targetKeyCode) {
  return inputKeyCode === targetKeyCode;
}

/***/ }),
/* 7 */
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
  UPDATE_PLAYER_CLIENT_RECT: 'shell/UPDATE_PLAYER_CLIENT_RECT',
  UPDATE_DOCUMENT_WIDTH: 'shell/UPDATE_DOCUMENT_WIDTH',
  UPDATE_PLAYER_HOVER_STATE: 'shell/UPDATE_PLAYER_HOVER_STATE',
  UPDATE_PLAYER_NAV_STATE: 'shell/UPDATE_PLAYER_NAV_STATE',
  UPDATE_BOTTOM_BAR_HOVER_ACTIVE: 'shell/UPDATE_BOTTOM_BAR_HOVER_ACTIVE',
  UPDATE_SMART_CONTAINER_OPEN: 'shell/UPDATE_SMART_CONTAINER_OPEN'
};

var initialState = exports.initialState = {
  playerClasses: [],
  prePlayback: true,
  playerHover: false,
  playerNav: false,
  smartContainerOpen: false
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

    case types.UPDATE_PLAYER_CLIENT_RECT:
      return _extends({}, state, {
        playerClientRect: action.playerClientRect
      });

    case types.UPDATE_DOCUMENT_WIDTH:
      return _extends({}, state, {
        documentWidth: action.documentWidth
      });

    case types.UPDATE_PLAYER_HOVER_STATE:
      return _extends({}, state, {
        playerHover: action.hover
      });

    case types.UPDATE_PLAYER_NAV_STATE:
      return _extends({}, state, {
        playerNav: action.nav
      });

    case types.UPDATE_BOTTOM_BAR_HOVER_ACTIVE:
      return _extends({}, state, {
        bottomBarHoverActive: action.active
      });

    case types.UPDATE_SMART_CONTAINER_OPEN:
      return _extends({}, state, {
        smartContainerOpen: action.open
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
  updatePlayerClientRect: function updatePlayerClientRect(playerClientRect) {
    return { type: types.UPDATE_PLAYER_CLIENT_RECT, playerClientRect: playerClientRect };
  },
  updateDocumentWidth: function updateDocumentWidth(documentWidth) {
    return { type: types.UPDATE_DOCUMENT_WIDTH, documentWidth: documentWidth };
  },
  updatePlayerHoverState: function updatePlayerHoverState(hover) {
    return { type: types.UPDATE_PLAYER_HOVER_STATE, hover: hover };
  },
  updatePlayerNavState: function updatePlayerNavState(nav) {
    return { type: types.UPDATE_PLAYER_NAV_STATE, nav: nav };
  },
  updateBottomBarHoverActive: function updateBottomBarHoverActive(active) {
    return { type: types.UPDATE_BOTTOM_BAR_HOVER_ACTIVE, active: active };
  },
  updateSmartContainerOpen: function updateSmartContainerOpen(open) {
    return { type: types.UPDATE_SMART_CONTAINER_OPEN, open: open };
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventType = __webpack_require__(30);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create an Event work-alike object based on the dictionary.
 * The event should contain all of the same properties from the dict.
 * @classdesc
 */
var FakeEvent = function () {

  /**
   * @constructor
   * @param{string} type - The event type.
   * @param {any} payload - The event payload.
   */

  /** @const {boolean} */

  /** @const {boolean} */

  /** @const {boolean} */

  /**
   * According to MDN, Chrome uses high-res timers instead of epoch time.
   * Follow suit so that timeStamps on FakeEvents use the same base as
   * on native Events.
   * @const {number}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp
   */

  /** @const {string} */

  /** @const {boolean} */

  /** @type {EventTarget} */

  /** @type {EventTarget} */

  /**
   * Non-standard property read by FakeEventTarget to stop processing listeners.
   * @type {boolean}
   */

  /**
   * The event payload;
   * @type {any}
   */
  function FakeEvent(type, payload) {
    _classCallCheck(this, FakeEvent);

    this.bubbles = false;
    this.cancelable = false;
    this.defaultPrevented = false;
    this.timeStamp = window.performance ? window.performance.now() : Date.now();
    this.type = type;
    this.isTrusted = false;
    this.currentTarget = null;
    this.target = null;
    this.stopped = false;
    if (payload) {
      this.payload = payload;
    }
  }

  /**
   * Does nothing, since FakeEvents have no default.  Provided for compatibility
   * with native Events.
   * @override
   */


  _createClass(FakeEvent, [{
    key: 'preventDefault',
    value: function preventDefault() {}

    /**
     * Stops processing event listeners for this event.  Provided for compatibility
     * with native Events.
     * @override
     */

  }, {
    key: 'stopImmediatePropagation',
    value: function stopImmediatePropagation() {
      this.stopped = true;
    }

    /**
     * Does nothing, since FakeEvents do not bubble.  Provided for compatibility
     * with native Events.
     * @override
     */

  }, {
    key: 'stopPropagation',
    value: function stopPropagation() {}
  }]);

  return FakeEvent;
}();

FakeEvent.Type = _eventType.EventType;
exports.FakeEvent = FakeEvent;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventManager = exports.UIEventManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _multiMap = __webpack_require__(110);

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** A singleton wrapper for the event manager.
 * @class UIEventManager
 */
var UIEventManager = function () {
  function UIEventManager() {
    _classCallCheck(this, UIEventManager);
  }

  _createClass(UIEventManager, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!UIEventManager._instance) {
        UIEventManager._instance = new EventManager();
      }
      return UIEventManager._instance;
    }
  }]);

  return UIEventManager;
}();

/**
 * Creates a new EventManager. An EventManager maintains a collection of "event
 * bindings" between event targets and event listeners.
 *
 * @struct
 * @constructor
 * @implements {IDestroyable}
 */


var EventManager = function () {

  /**
   * @constructor
   */
  function EventManager() {
    _classCallCheck(this, EventManager);

    /**
     * Maps an event type to an array of event bindings.
     * @private {MultiMap.<!EventManager.Binding_>}
     */
    this._bindingMap = new _multiMap.MultiMap();
  }

  /**
   * Detaches all event listeners.
   * @override
   */


  _createClass(EventManager, [{
    key: 'destroy',
    value: function destroy() {
      this.removeAll();
      this._bindingMap = null;
      return Promise.resolve();
    }

    /**
     * Attaches an event listener to an event target for only one time.
     * @param {EventTarget} target - The event target.
     * @param {string} type - The event type.
     * @param {EventManager.ListenerType} listener - The event listener.
     * @returns {void}
     */

  }, {
    key: 'listenOnce',
    value: function listenOnce(target, type, listener) {
      var _this = this;

      /**
       * Unlisten to the current event and executing the handler.
       * @param {Object} event - event
       * @returns {void}
       */
      var oneListener = function oneListener(event) {
        _this.unlisten(target, type, oneListener);
        listener.call(_this, event);
      };
      this.listen(target, type, oneListener);
    }

    /**
     * Attaches an event listener to an event target.
     * @param {EventTarget} target The event target.
     * @param {string} type The event type.
     * @param {EventManager.ListenerType} listener The event listener.
     * @returns {void}
     */

  }, {
    key: 'listen',
    value: function listen(target, type, listener) {
      var binding = new Binding_(target, type, listener);
      if (this._bindingMap) {
        this._bindingMap.push(type, binding);
      }
    }

    /**
     * Detaches an event listener from an event target.
     * @param {EventTarget} target The event target.
     * @param {string} type The event type.
     * @param {EventManager.ListenerType} [listener] The event listener to detach. If no given, detaches all event listeners of the target and type.
     * @returns {void}
     */

  }, {
    key: 'unlisten',
    value: function unlisten(target, type, listener) {
      if (this._bindingMap) {
        var list = this._bindingMap.get(type);

        for (var i = 0; i < list.length; ++i) {
          var binding = list[i];

          if (binding.target === target && (binding.listener === listener || !listener)) {
            binding.unlisten();
            if (this._bindingMap) {
              this._bindingMap.remove(type, binding);
            }
          }
        }
      }
    }

    /**
     * Detaches all event listeners from all targets.
     * @returns {void}
     */

  }, {
    key: 'removeAll',
    value: function removeAll() {
      if (this._bindingMap) {
        var listeners = this._bindingMap.getAll();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;

            listener.unlisten();
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

        if (this._bindingMap) {
          this._bindingMap.clear();
        }
      }
    }
  }]);

  return EventManager;
}();

/**
 * @typedef {function(!Event)}
 */


/**
 * Creates a new Binding_ and attaches the event listener to the event target.
 * @param {EventTarget} target The event target.
 * @param {string} type The event type.
 * @param {EventManager.ListenerType} listener The event listener.
 * @constructor
 * @private
 */
var Binding_ = function () {

  /**
   * @constructor
   * @param {EventTarget} target - The event target.
   * @param {string} type - The event type.
   * @param {ListenerType} listener - The event listener.
   */
  function Binding_(target, type, listener) {
    _classCallCheck(this, Binding_);

    /** @type {EventTarget} */
    this.target = target;

    /** @type {string} */
    this.type = type;

    /** @type {?EventManager.ListenerType} */
    this.listener = listener;

    this.target.addEventListener(type, listener, false);
  }

  /**
   * Detaches the event listener from the event target. This does nothing if the
   * event listener is already detached.
   * @returns {void}
   */


  _createClass(Binding_, [{
    key: 'unlisten',
    value: function unlisten() {
      if (!this.target) return;

      this.target.removeEventListener(this.type, this.listener, false);

      this.target = null;
      this.listener = null;
    }
  }]);

  return Binding_;
}();

exports.UIEventManager = UIEventManager;
exports.EventManager = EventManager;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

function n(n){return n&&"object"==typeof n&&"default"in n?n.default:n}function t(n){return null!==n&&void 0!==n}function r(n,t){var o=e({},n);for(var i in t)t.hasOwnProperty(i)&&(o[i]=n[i]&&t[i]&&"object"==typeof n[i]&&"object"==typeof t[i]?r(n[i],t[i]):n[i]||t[i]);return o}function e(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n}function o(n){if(n=n||{},"string"==typeof n&&(n=n.split(",")),"join"in n){for(var t={},r=0;r<n.length;r++){var e=n[r].trim();e&&(t[e.split(".").pop()]=e)}return t}return n}function i(n,t){return v=t||h,n&&n.replace(/\{\{([\w.-]+)\}\}/g,u)}function u(n,t){for(var r=t.split("."),e=v,o=0;o<r.length;o++)if(null==(e=e[r[o]]))return"";return"string"==typeof e&&e.match(/\{\{/)&&(e=i(e,v)),e}function c(n,r,e,o,u,c){r&&(n=r+"."+n);var a=e&&f(e,n);return(u||0===u)&&a&&"object"==typeof a&&(a=a.splice?a[u]||a[0]:0===u&&t(a.none)?a.none:1===u&&t(a.one||a.singular)?a.one||a.singular:a.some||a.many||a.plural||a.other||a),a&&i(a,o)||c||null}function a(n,t,r){var i={};t=t||{},n=o(n);for(var u in n)if(n.hasOwnProperty(u)&&n[u]){var a=n[u];r||"string"!=typeof a?a.nodeName===g&&(a=e({fallback:a.children&&a.children[0]},a.attributes),i[u]=c(a.id,t.scope,t.dictionary,a.fields,a.plural,a.fallback)):i[u]=c(a,t.scope,t.dictionary)}return i}var l=__webpack_require__(0),f=n(__webpack_require__(95)),p=/[?&#]intl=show/,s=function(n){function t(){n.apply(this,arguments)}return n&&(t.__proto__=n),t.prototype=Object.create(n&&n.prototype),t.prototype.constructor=t,t.prototype.getChildContext=function(){var n=this.props,t=n.scope,o=n.definition,i=n.mark,u=e({},this.context.intl||{});return t&&(u.scope=t),o&&(u.dictionary=r(u.dictionary||{},o)),(i||"undefined"!=typeof location&&String(location).match(p))&&(u.mark=!0),{intl:u}},t.prototype.render=function(n){var t=n.children;return t&&t[0]||null},t}(l.Component),d=function(){for(var n=[],t=arguments.length;t--;)n[t]=arguments[t];if(n.length>1){return y(n[0],n[1])}var r=n[0];return function(n){return y(n,r)}},y=function(n,t){return function(r){return l.h(s,t||{},l.h(n,r))}},h={},v,g=function(n,t){var r=n.id,e=n.children,o=n.plural,i=n.fields,u=t.intl,a=e&&e[0],p=c(r,u&&u.scope,u&&u.dictionary,i,o,a);if(u&&u.mark){var s="dictionary"+(u&&u.scope?"."+u.scope:"")+"."+r;return l.h("mark",{style:"background: "+(p?f(u,s)?"rgba(119,231,117,.5)":"rgba(229,226,41,.5)":"rgba(228,147,51,.5)"),title:r},p)}return p},b=function(n,t){var r=n.children,e=t.intl,o=r&&r[0];return o&&l.cloneElement(o,a(o.attributes,e,!0))},m=function(n){return function(t){return function(r,e){var o="function"==typeof n?n(r):n,i=a(o,e.intl);return l.h(t,assign({},r,i))}}};d.intl=d,d.IntlProvider=s,d.Text=g,d.Localizer=b,d.withText=m,module.exports=d;
//# sourceMappingURL=preact-i18n.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Binds an handler to a desired context.
 * @param {any} thisObj - The handler context.
 * @param {Function} fn - The handler.
 * @returns {Function} - The new bound function.
 * @public
 */
function bindMethod(thisObj, fn) {
  return function () {
    fn.apply(thisObj, arguments);
  };
}

exports.bindMethod = bindMethod;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(53);
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

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var types = exports.types = {
  UPDATE: 'config/UPDATE',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET'
};

var initialState = exports.initialState = {
  forceTouchUI: false,
  components: {
    watermark: {},
    seekbar: {},
    error: {},
    vrStereo: {}
  }
};

/**
 * @param {any} item - The item to check.
 * @returns {boolean} - Whether the item is an object.
 */
function isObject(item) {
  return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item);
}

/**
 * @param {any} target - The target object.
 * @param {any} sources - The objects to merge.
 * @returns {Object} - The merged object.
 */
function mergeDeep(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) {
    return target;
  }
  var source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, _defineProperty({}, key, source[key]));
      }
    }
  }
  return mergeDeep.apply(undefined, [target].concat(_toConsumableArray(sources)));
}

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE:
      {
        var config = mergeDeep(state, action.config);
        return _extends({}, state, config);
      }
    case types.UPDATE_COMPONENT:
      {
        return _extends({}, state, {
          components: _extends({}, state.components, _defineProperty({}, action.componentAlias, mergeDeep(state.components[action.componentAlias], action.config)))
        });
      }
    default:
      return state;
  }
};

var actions = exports.actions = {
  updateConfig: function updateConfig(config) {
    return { type: types.UPDATE, config: config };
  },
  updateComponentConfig: function updateComponentConfig(componentAlias, config) {
    return {
      type: types.UPDATE_COMPONENT,
      componentAlias: componentAlias,
      config: config
    };
  }
};

/***/ }),
/* 14 */
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
  UPDATE_AD_BREAK_COMPLETED: 'engine/UPDATE_AD_BREAK_COMPLETED',
  UPDATE_AD_IS_PLAYING: 'engine/UPDATE_AD_IS_PLAYING',
  UPDATE_AD_SKIP_TIME_OFFSET: 'engine/UPDATE_AD_SKIP_TIME_OFFSET',
  UPDATE_AD_SKIPPABLE_STATE: 'engine/UPDATE_AD_SKIPPABLE_STATE',
  UPDATE_AD_URL: 'engine/UPDATE_AD_URL',
  UPDATE_AD_IS_LINEAR: 'engine/UPDATE_AD_IS_LINEAR',
  UPDATE_PLAYER_POSTER: 'engine/UPDATE_PLAYER_POSTER',
  UPDATE_IS_LIVE: 'engine/UPDATE_IS_LIVE',
  UPDATE_IS_DVR: 'engine/UPDATE_IS_DVR',
  UPDATE_ERROR: 'engine/ERROR',
  UPDATE_IS_IDLE: 'engine/UPDATE_IS_IDLE',
  UPDATE_FALLBACK_TO_MUTED_AUTOPLAY: 'engine/UPDATE_FALLBACK_TO_MUTED_AUTOPLAY',
  UPDATE_IS_VR: 'engine/UPDATE_IS_VR',
  UPDATE_VR_STEREO_MODE: 'engine/UPDATE_VR_STEREO_MODE'
};

var initialState = exports.initialState = {
  isIdle: false,
  isPlaying: false,
  isEnded: false,
  metadataLoaded: false,
  playerState: {
    previousState: '',
    currentState: ''
  },
  fallbackToMutedAutoPlay: false,
  poster: '',
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false,
  videoTracks: [],
  audioTracks: [],
  textTracks: [],
  adIsLinear: false,
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
  adUrl: '',
  hasError: false,
  isVr: false,
  vrStereoMode: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_ERROR:
      return _extends({}, state, {
        hasError: action.hasError
      });

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

    case types.UPDATE_AD_BREAK_COMPLETED:
      return _extends({}, state, {
        adProgress: {
          currentTime: state.adProgress.duration,
          duration: state.adProgress.duration
        }
      });

    case types.UPDATE_AD_IS_PLAYING:
      return _extends({}, state, {
        adIsPlaying: action.adIsPlaying
      });

    case types.UPDATE_AD_IS_LINEAR:
      return _extends({}, state, {
        adIsLinear: action.adIsLinear
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

    case types.UPDATE_IS_IDLE:
      return _extends({}, state, {
        isIdle: action.IsIdle
      });

    case types.UPDATE_FALLBACK_TO_MUTED_AUTOPLAY:
      return _extends({}, state, {
        fallbackToMutedAutoPlay: action.fallback
      });

    case types.UPDATE_IS_VR:
      return _extends({}, state, {
        isVr: action.isVr
      });

    case types.UPDATE_VR_STEREO_MODE:
      return _extends({}, state, {
        vrStereoMode: action.vrStereoMode
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updateHasError: function updateHasError(hasError) {
    return { type: types.UPDATE_ERROR, hasError: hasError };
  },
  updatePlayerState: function updatePlayerState(prevoiusState, currentState) {
    return {
      type: types.UPDATE_PLAYER_STATE,
      playerState: { prevoiusState: prevoiusState, currentState: currentState }
    };
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
    return {
      type: types.UPDATE_METADATA_LOADING_STATUS,
      metadataLoaded: metadataLoaded
    };
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
    return {
      type: types.UPDATE_AD_BREAK_PROGRESS,
      adProgress: { currentTime: currentTime, duration: duration }
    };
  },
  updateAdBreakCompleted: function updateAdBreakCompleted() {
    return { type: types.UPDATE_AD_BREAK_COMPLETED };
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
  updateAdIsLinear: function updateAdIsLinear(adIsLinear) {
    return { type: types.UPDATE_AD_IS_LINEAR, adIsLinear: adIsLinear };
  },
  updatePlayerPoster: function updatePlayerPoster(poster) {
    return { type: types.UPDATE_PLAYER_POSTER, poster: poster };
  },
  updateIsLive: function updateIsLive(isLive) {
    return { type: types.UPDATE_IS_LIVE, isLive: isLive };
  },
  updateIsDvr: function updateIsDvr(isDvr) {
    return { type: types.UPDATE_IS_DVR, isDvr: isDvr };
  },
  updateIsIdle: function updateIsIdle(IsIdle) {
    return { type: types.UPDATE_IS_IDLE, IsIdle: IsIdle };
  },
  updateFallbackToMutedAutoPlay: function updateFallbackToMutedAutoPlay(fallback) {
    return { type: types.UPDATE_FALLBACK_TO_MUTED_AUTOPLAY, fallback: fallback };
  },
  updateIsVr: function updateIsVr(isVr) {
    return { type: types.UPDATE_IS_VR, isVr: isVr };
  },
  updateVrStereoMode: function updateVrStereoMode(vrStereoMode) {
    return { type: types.UPDATE_VR_STEREO_MODE, vrStereoMode: vrStereoMode };
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loading = __webpack_require__(118);

Object.defineProperty(exports, 'Loading', {
  enumerable: true,
  get: function get() {
    return _loading.Loading;
  }
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overlay = __webpack_require__(130);

Object.defineProperty(exports, 'Overlay', {
  enumerable: true,
  get: function get() {
    return _overlay.Overlay;
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_SEEKBAR_DRAGGING_STATUS: 'seekbar/UPDATE_SEEKBAR_DRAGGING_STATUS',
  UPDATE_SEEKBAR_HOVER_ACTIVE: 'seekbar/UPDATE_SEEKBAR_HOVER_ACTIVE',
  UPDATE_CURRENT_TIME: 'seekbar/UPDATE_CURRENT_TIME',
  UPDATE_DURATION: 'seekbar/UPDATE_DURATION'
};

var initialState = exports.initialState = {
  currentTime: 0,
  duration: 0,
  draggingActive: false,
  hoverActive: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_SEEKBAR_DRAGGING_STATUS:
      return _extends({}, state, {
        draggingActive: action.draggingActive
      });

    case types.UPDATE_SEEKBAR_HOVER_ACTIVE:
      return _extends({}, state, {
        hoverActive: action.hoverActive
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
    return {
      type: types.UPDATE_SEEKBAR_DRAGGING_STATUS,
      draggingActive: draggingActive
    };
  },
  updateSeekbarHoverActive: function updateSeekbarHoverActive(hoverActive) {
    return {
      type: types.UPDATE_SEEKBAR_HOVER_ACTIVE,
      hoverActive: hoverActive
    };
  },
  updateDuration: function updateDuration(duration) {
    return { type: types.UPDATE_DURATION, duration: duration };
  },
  updateCurrentTime: function updateCurrentTime(currentTime) {
    return { type: types.UPDATE_CURRENT_TIME, currentTime: currentTime };
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponentStateFromComponentConfig = exports.getComponentStateFromConfig = exports.shouldRenderComponent = undefined;

var _playkitJs = __webpack_require__(33);

/**
 * @param {string} component - The component name.
 * @param {string} oldState - The component old state.
 * @param {string} action - The action object.
 * @returns {Object} - The component updated state.
 */
function getComponentStateFromConfig(component, oldState, action) {
  var componentConfig = action.config.components && action.config.components[component];
  if (componentConfig) {
    return _playkitJs.Utils.Object.mergeDeep(oldState, componentConfig);
  }
  return oldState;
}

/**
 * @param {string} component - The component name.
 * @param {string} oldState - The component old state.
 * @param {string} action - The action object.
 * @returns {Object} - The component updated state.
 */

function getComponentStateFromComponentConfig(component, oldState, action) {
  if (action.componentAlias === component) {
    return _playkitJs.Utils.Object.mergeDeep(oldState, action.config);
  }
  return oldState;
}

/**
 * Checks if component should be rendered based on its value in the store.
 * @param {Object} config - Config store
 * @param {string} alias - Component alias
 * @return {boolean} - Whether component should be rendered
 */
function shouldRenderComponent(config, alias) {
  var componentConfig = config.components[alias];
  return !(Object.keys(componentConfig).length === 0 && componentConfig.constructor === Object);
}

exports.shouldRenderComponent = shouldRenderComponent;
exports.getComponentStateFromConfig = getComponentStateFromConfig;
exports.getComponentStateFromComponentConfig = getComponentStateFromComponentConfig;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.initialState = exports.types = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = __webpack_require__(13);

var _componentConfig = __webpack_require__(18);

var component = 'loading';

var types = exports.types = {
  UPDATE_LOADING_SPINNER_STATE: component + '/UPDATE_LOADING_SPINNER_STATE'
};

var initialState = exports.initialState = {
  show: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _config.types.UPDATE:
      return (0, _componentConfig.getComponentStateFromConfig)(component, state, action);

    case _config.types.UPDATE_COMPONENT:
      return (0, _componentConfig.getComponentStateFromComponentConfig)(component, state, action);

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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_ACTION_ICON: 'overlay-action/UPDATE_ACTION_ICON'
};

var initialState = exports.initialState = {
  iconType: null
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_ACTION_ICON:
      return _extends({}, state, {
        iconType: action.iconType
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updateOverlayActionIcon: function updateOverlayActionIcon(iconType) {
    return { type: types.UPDATE_ACTION_ICON, iconType: iconType };
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playPause = __webpack_require__(123);

Object.defineProperty(exports, 'PlayPauseControl', {
  enumerable: true,
  get: function get() {
    return _playPause.PlayPauseControl;
  }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _volume = __webpack_require__(127);

Object.defineProperty(exports, 'VolumeControl', {
  enumerable: true,
  get: function get() {
    return _volume.VolumeControl;
  }
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fullscreen = __webpack_require__(137);

Object.defineProperty(exports, 'FullscreenControl', {
  enumerable: true,
  get: function get() {
    return _fullscreen.FullscreenControl;
  }
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bottomBar = __webpack_require__(140);

Object.defineProperty(exports, 'BottomBar', {
  enumerable: true,
  get: function get() {
    return _bottomBar.BottomBar;
  }
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyboard = __webpack_require__(41);

Object.defineProperty(exports, 'KeyboardControl', {
  enumerable: true,
  get: function get() {
    return _keyboard.KeyboardControl;
  }
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unmuteIndication = __webpack_require__(142);

Object.defineProperty(exports, 'UnmuteIndication', {
  enumerable: true,
  get: function get() {
    return _unmuteIndication.UnmuteIndication;
  }
});

/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogLevel = exports.getLogLevel = exports.LogLevel = undefined;

var _jsLogger = __webpack_require__(97);

var JsLogger = _interopRequireWildcard(_jsLogger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var LogLevel = {
  DEBUG: JsLogger.DEBUG,
  INFO: JsLogger.INFO,
  TIME: JsLogger.TIME,
  WARN: JsLogger.WARN,
  ERROR: JsLogger.ERROR,
  OFF: JsLogger.OFF
};


JsLogger.useDefaults({ defaultLevel: JsLogger.ERROR });

/**
 * get a logger
 * @param {?string} name - the logger name
 * @returns {Object} - the logger class
 */
function getLogger(name) {
  if (!name) {
    return JsLogger;
  }
  return JsLogger.get(name);
}

/**
 * get the log level
 * @param {?string} name - the logger name
 * @returns {LogLevelObject} - the log level
 */
function getLogLevel(name) {
  return getLogger(name).getLevel();
}

/**
 * sets the logger level
 * @param {LogLevelObject} level - the log level
 * @param {?string} name - the logger name
 * @returns {void}
 */
function setLogLevel(level, name) {
  getLogger(name).setLevel(level);
}

exports.default = getLogger;
exports.LogLevel = LogLevel;
exports.getLogLevel = getLogLevel;
exports.setLogLevel = setLogLevel;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var namespace = 'playkit-ui';

var EventType = {
  UI_CLICKED: namespace + '-uiclicked',
  UI_VISIBILITY_CHANGED: namespace + '-uivisibilitychanged',
  USER_CLICKED_PLAY: namespace + '-userclickedplay',
  USER_CLICKED_PAUSE: namespace + '-userclickedpause',
  USER_CLICKED_REWIND: namespace + '-userclickedrewind',
  USER_CLICKED_LIVE_TAG: namespace + '-userclickedlivetag',
  USER_CLICKED_MUTE: namespace + '-userclickedmute',
  USER_CLICKED_UNMUTE: namespace + '-userclickedunmute',
  USER_CHANGED_VOLUME: namespace + '-userchangedvolume',
  USER_SELECTED_CAPTION_TRACK: namespace + '-userselectedcaptiontrack',
  USER_SELECTED_AUDIO_TRACK: namespace + '-userselectedaudiotrack',
  USER_SELECTED_QUALITY_TRACK: namespace + '-userselectedqualitytrack',
  USER_ENTERED_FULL_SCREEN: namespace + '-userenteredfullscreen',
  USER_EXITED_FULL_SCREEN: namespace + '-userexitedfullscreen',
  USER_SELECTED_CAPTIONS_STYLE: namespace + '-userselectedcaptionsstyle',
  USER_SELECTED_SPEED: namespace + '-userselectedspeed',
  USER_SEEKED: namespace + '-userseeked'
};

exports.EventType = EventType;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = exports.types = {
  UPDATE_VOLUME_DRAGGING_STATUS: 'volume/UPDATE_VOLUME_DRAGGING_STATUS',
  UPDATE_HOVER: 'volume/UPDATE_HOVER'
};

var initialState = exports.initialState = {
  draggingActive: false,
  hover: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_VOLUME_DRAGGING_STATUS:
      return _extends({}, state, {
        draggingActive: action.draggingActive
      });

    case types.UPDATE_HOVER:
      return _extends({}, state, {
        hover: action.hover
      });

    default:
      return state;
  }
};

var actions = exports.actions = {
  updateVolumeDraggingStatus: function updateVolumeDraggingStatus(draggingActive) {
    return {
      type: types.UPDATE_VOLUME_DRAGGING_STATUS,
      draggingActive: draggingActive
    };
  },
  updateVolumeHover: function updateVolumeHover(hover) {
    return { type: types.UPDATE_HOVER, hover: hover };
  }
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.initialState = exports.types = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = __webpack_require__(13);

var _componentConfig = __webpack_require__(18);

var component = 'fullscreen';

var types = exports.types = {
  UPDATE_FULLSCREEN: component + '/UPDATE_FULLSCREEN'
};

var initialState = exports.initialState = {
  fullscreen: false,
  inBrowserFullscreenForIOS: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _config.types.UPDATE:
      return (0, _componentConfig.getComponentStateFromConfig)(component, state, action);

    case _config.types.UPDATE_COMPONENT:
      return (0, _componentConfig.getComponentStateFromComponentConfig)(component, state, action);

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
/* 33 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ }),
/* 34 */
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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overlayAction = __webpack_require__(120);

Object.defineProperty(exports, 'OverlayAction', {
  enumerable: true,
  get: function get() {
    return _overlayAction.OverlayAction;
  }
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconType = exports.Icon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  VolumeWave: 'volume-wave',
  VolumeMute: 'volume-mute',
  Close: 'close',
  Share: 'share',
  Settings: 'settings',
  Check: 'check',
  Language: 'language',
  Quality: 'quality',
  Captions: 'captions',
  Speed: 'speed',
  SpeedDown: 'speed-down',
  SpeedUp: 'speed-up',
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
  StartOver: 'start-over',
  SeekForward: 'seek-forward',
  SeekEnd: 'seek-end',
  Rewind: 'rewind',
  Rewind10: 'rewind10',
  vrStereo: 'vr-stereo',
  vrStereoFull: 'vr-stereo-full'
};

/**
 * Icon component
 *
 * @class Icon
 * @example <Icon type={IconType.Play} />
 * @extends {Component}
 */

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
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconMaximize].join(' ') });

        case IconType.Minimize:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconMinimize].join(' ') });

        case IconType.Play:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconPlay].join(' ') });

        case IconType.Pause:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconPause].join(' ') });

        case IconType.VolumeBase:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconVolumeBase].join(' ') });

        case IconType.VolumeWaves:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconVolumeWaves].join(' ') });

        case IconType.VolumeWave:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconVolumeWave].join(' ') });

        case IconType.VolumeMute:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconVolumeMute].join(' ') });

        case IconType.Close:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconClose].join(' ') });

        case IconType.Share:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconShare].join(' ') });

        case IconType.Settings:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconSettings].join(' ') });

        case IconType.Check:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconCheck].join(' ') });

        case IconType.Language:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconLanguage].join(' ') });

        case IconType.Quality:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconQuality].join(' ') });

        case IconType.Captions:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconCaptions].join(' ') });

        case IconType.Speed:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconSpeed].join(' ') });

        case IconType.SpeedDown:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconSpeedDown].join(' ') });

        case IconType.SpeedUp:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconSpeedUp].join(' ') });

        case IconType.Audio:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconAudio].join(' ') });

        case IconType.Copy:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconCopy].join(' ') });

        case IconType.Facebook:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconFacebook].join(' ') });

        case IconType.Twitter:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconTwitter].join(' ') });

        case IconType.GooglePlus:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconGoogleplus].join(' ') });

        case IconType.Linkedin:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconLinkedin].join(' ') });

        case IconType.Email:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconEmail].join(' ') });

        case IconType.Embed:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconEmbed].join(' ') });

        case IconType.Link:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconLink].join(' ') });

        case IconType.ArrowDown:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconArrowDown].join(' ') });

        case IconType.StartOver:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconStartOver].join(' ') });

        case IconType.SeekForward:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconSeekForward].join(' ') });

        case IconType.SeekEnd:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconSeekEnd].join(' ') });

        case IconType.Rewind:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconRewind].join(' ') });

        case IconType.Rewind10:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconRewind10].join(' ') });

        case IconType.vrStereo:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconVrStereo].join(' ') });

        case IconType.vrStereoFull:
          return (0, _preact.h)('i', { className: [_style2.default.icon, _style2.default.iconVrStereoFull].join(' ') });

        default:
          break;
      }
    }
  }]);

  return Icon;
}(_preact.Component);

exports.default = Icon;
exports.Icon = Icon;
exports.IconType = IconType;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prePlaybackPlayOverlay = __webpack_require__(121);

Object.defineProperty(exports, 'PrePlaybackPlayOverlay', {
  enumerable: true,
  get: function get() {
    return _prePlaybackPlayOverlay.PrePlaybackPlayOverlay;
  }
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seekbar = __webpack_require__(126);

Object.defineProperty(exports, 'SeekBarControl', {
  enumerable: true,
  get: function get() {
    return _seekbar.SeekBarControl;
  }
});

/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardControl = exports.KEYBOARD_DEFAULT_VOLUME_JUMP = exports.KEYBOARD_DEFAULT_SEEK_JUMP = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _preactRedux = __webpack_require__(2);

var _shell = __webpack_require__(7);

var _overlayAction = __webpack_require__(21);

var _bindActions = __webpack_require__(5);

var _keyMap = __webpack_require__(6);

var _icon = __webpack_require__(4);

var _shell2 = __webpack_require__(58);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    playerNav: state.shell.playerNav,
    isPlaying: state.engine.isPlaying,
    adBreak: state.engine.adBreak,
    adIsPlaying: state.engine.adIsPlaying
  };
};

/**
 * Default seek jump
 * @type {number}
 * @const
 */
var KEYBOARD_DEFAULT_SEEK_JUMP = exports.KEYBOARD_DEFAULT_SEEK_JUMP = 5;
/**
 * Default volume jump
 * @type {number}
 * @const
 */
var KEYBOARD_DEFAULT_VOLUME_JUMP = exports.KEYBOARD_DEFAULT_VOLUME_JUMP = 5;

/**
 * KeyboardControl component
 *
 * @class KeyboardControl
 * @extends {BaseComponent}
 */
var KeyboardControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(Object.assign(_shell.actions, _overlayAction.actions))), _dec(_class = function (_BaseComponent) {
  _inherits(KeyboardControl, _BaseComponent);

  /**
   * creates an instance of KeyboardControl
   *
   * @param {Object} obj obj
   * @memberof KeyboardControl
   */
  function KeyboardControl(obj) {
    var _this$keyboardHandler;

    _classCallCheck(this, KeyboardControl);

    var _this = _possibleConstructorReturn(this, (KeyboardControl.__proto__ || Object.getPrototypeOf(KeyboardControl)).call(this, { name: 'Keyboard', player: obj.player, config: obj.config }));

    _this._activeTextTrack = null;
    _this._hoverTimeout = null;
    _this.keyboardHandlers = (_this$keyboardHandler = {}, _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.SPACE, function () {
      if (_this.isPlayingAdOrPlayback()) {
        _this.player.pause();
        _this.props.updateOverlayActionIcon(_icon.IconType.Pause);
      } else {
        _this.player.play();
        _this.props.updateOverlayActionIcon(_icon.IconType.Play);
      }
      _this.toggleHoverState();
      return true;
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.UP, function () {
      var newVolume = (Math.round(_this.player.volume * 100) + KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      _this.logger.debug('Changing volume. ' + _this.player.volume + ' => ' + newVolume);
      if (_this.player.muted) {
        _this.player.muted = false;
      }
      if (newVolume <= 1) {
        _this.player.volume = newVolume;
        _this.props.updateOverlayActionIcon([_icon.IconType.VolumeBase, _icon.IconType.VolumeWaves]);
        return { volume: _this.player.volume };
      }
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.DOWN, function () {
      var newVolume = (Math.round(_this.player.volume * 100) - KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      if (newVolume >= 0) {
        _this.logger.debug('Changing volume. ' + _this.player.volume + ' => ' + newVolume);
        _this.player.volume = newVolume;
        if (newVolume === 0) {
          _this.player.muted = true;
          _this.props.updateOverlayActionIcon([_icon.IconType.VolumeBase, _icon.IconType.VolumeMute]);
        } else {
          _this.props.updateOverlayActionIcon([_icon.IconType.VolumeBase, _icon.IconType.VolumeWave]);
        }
        return { volume: _this.player.volume };
      }
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.F, function () {
      if (!_this.player.isFullscreen()) {
        _this.logger.debug('Enter fullscreen');
        _this.player.enterFullscreen();
        return true;
      }
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.ESC, function () {
      if (_this.player.isFullscreen()) {
        _this.logger.debug('Exit fullscreen');
        _this.player.exitFullscreen();
        return true;
      }
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.LEFT, function () {
      var newTime = _this.player.currentTime - KEYBOARD_DEFAULT_SEEK_JUMP;
      var from = _this.player.currentTime;
      var to = newTime > 0 ? newTime : 0;
      _this.logger.debug('Seek. ' + from + ' => ' + to);
      _this.player.currentTime = to;
      _this.props.updateOverlayActionIcon(_icon.IconType.Rewind);
      _this.toggleHoverState();
      return { from: from, to: to };
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.RIGHT, function () {
      var newTime = _this.player.currentTime + KEYBOARD_DEFAULT_SEEK_JUMP;
      var from = _this.player.currentTime;
      var to = newTime > _this.player.duration ? _this.player.duration : newTime;
      _this.logger.debug('Seek. ' + from + ' => ' + to);
      _this.player.currentTime = newTime > _this.player.duration ? _this.player.duration : newTime;
      _this.props.updateOverlayActionIcon(_icon.IconType.SeekForward);
      _this.toggleHoverState();
      return { from: from, to: to };
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.HOME, function () {
      var from = _this.player.currentTime;
      var to = 0;
      _this.logger.debug('Seek. ' + from + ' => ' + to);
      _this.player.currentTime = to;
      _this.props.updateOverlayActionIcon(_icon.IconType.StartOver);
      _this.toggleHoverState();
      return { from: from, to: to };
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.END, function () {
      var from = _this.player.currentTime;
      var to = _this.player.duration;
      _this.logger.debug('Seek. ' + from + ' => ' + to);
      _this.player.currentTime = to;
      _this.props.updateOverlayActionIcon(_icon.IconType.SeekEnd);
      _this.toggleHoverState();
      return { from: from, to: to };
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.M, function () {
      _this.logger.debug(_this.player.muted ? 'Umnute' : 'Mute');
      _this.player.muted = !_this.player.muted;
      _this.player.muted ? _this.props.updateOverlayActionIcon([_icon.IconType.VolumeBase, _icon.IconType.VolumeMute]) : _this.props.updateOverlayActionIcon([_icon.IconType.VolumeBase, _icon.IconType.VolumeWaves]);
      return true;
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.SEMI_COLON, function (shiftKey) {
      if (shiftKey && _this.player.playbackRate !== _this.player.defaultPlaybackRate) {
        _this.logger.debug('Changing playback rate. ' + _this.player.playbackRate + ' => ' + _this.player.defaultPlaybackRate);
        _this.player.playbackRate = _this.player.defaultPlaybackRate;
        _this.props.updateOverlayActionIcon(_icon.IconType.Speed);
        return { speed: _this.player.defaultPlaybackRate };
      }
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.PERIOD, function (shiftKey) {
      if (shiftKey) {
        var playbackRate = _this.player.playbackRate;
        var index = _this.player.playbackRates.indexOf(playbackRate);
        if (index < _this.player.playbackRates.length - 1) {
          _this.logger.debug('Changing playback rate. ' + playbackRate + ' => ' + _this.player.playbackRates[index + 1]);
          _this.player.playbackRate = _this.player.playbackRates[index + 1];
          _this.props.updateOverlayActionIcon(_icon.IconType.SpeedUp);
          return { speed: _this.player.playbackRates[index + 1] };
        }
      }
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.COMMA, function (shiftKey) {
      if (shiftKey) {
        var playbackRate = _this.player.playbackRate;
        var index = _this.player.playbackRates.indexOf(playbackRate);
        if (index > 0) {
          _this.logger.debug('Changing playback rate. ' + playbackRate + ' => ' + _this.player.playbackRates[index - 1]);
          _this.player.playbackRate = _this.player.playbackRates[index - 1];
          _this.props.updateOverlayActionIcon(_icon.IconType.SpeedDown);
          return { speed: _this.player.playbackRates[index - 1] };
        }
      }
    }), _defineProperty(_this$keyboardHandler, _keyMap.KeyMap.C, function () {
      var activeTextTrack = _this.player.getActiveTracks().text;
      if (activeTextTrack.language === 'off' && _this._activeTextTrack) {
        _this.logger.debug('Changing text track', _this._activeTextTrack);
        _this.player.selectTrack(_this._activeTextTrack);
        var clonedTextTrack = Object.assign({}, _this._activeTextTrack);
        _this._activeTextTrack = null;
        return { track: clonedTextTrack };
      } else if (activeTextTrack.language !== 'off' && !_this._activeTextTrack) {
        _this.logger.debug('Hiding text track');
        _this._activeTextTrack = activeTextTrack;
        _this.player.hideTextTrack();
      }
    }), _this$keyboardHandler);

    var playerContainer = document.getElementById(_this.config.targetId);
    if (!playerContainer) {
      return _possibleConstructorReturn(_this);
    }
    playerContainer.onkeydown = function (e) {
      if (!_this.props.playerNav && typeof _this.keyboardHandlers[e.keyCode] === 'function') {
        e.preventDefault();
        _this.logger.debug('KeyDown -> keyName: ' + (0, _keyMap.getKeyName)(e.keyCode) + ', shiftKey: ' + e.shiftKey.toString());
        var payload = _this.keyboardHandlers[e.keyCode](e.shiftKey);
        if (payload) {
          _this.notifyClick(_extends({ key: e.keyCode }, payload));
        }
      }
    };
    return _this;
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof KeyboardControl
   */


  _createClass(KeyboardControl, [{
    key: 'isPlayingAdOrPlayback',
    value: function isPlayingAdOrPlayback() {
      return this.props.adBreak && this.props.adIsPlaying || !this.props.adBreak && this.props.isPlaying;
    }

    /**
     * handlers for keyboard commands
     * @type {Object} - maps key number to his handler
     *
     * @memberof KeyboardControl
     */

  }, {
    key: 'toggleHoverState',


    /**
     * toggles the shell hover state
     *
     * @returns {void}
     * @memberof KeyboardControl
     */
    value: function toggleHoverState() {
      var _this2 = this;

      if (this._hoverTimeout !== null) {
        clearTimeout(this._hoverTimeout);
        this._hoverTimeout = null;
      }
      this.props.updatePlayerHoverState(true);
      this._hoverTimeout = setTimeout(function () {
        _this2.props.updatePlayerHoverState(false);
      }, _shell2.CONTROL_BAR_HOVER_DEFAULT_TIMEOUT);
    }
  }]);

  return KeyboardControl;
}(_base2.default)) || _class);
exports.KeyboardControl = KeyboardControl;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settings = __webpack_require__(128);

Object.defineProperty(exports, 'SettingsControl', {
  enumerable: true,
  get: function get() {
    return _settings.SettingsControl;
  }
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _smartContainer = __webpack_require__(129);

Object.defineProperty(exports, 'SmartContainer', {
  enumerable: true,
  get: function get() {
    return _smartContainer.SmartContainer;
  }
});

/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dropdown = __webpack_require__(131);

Object.defineProperty(exports, 'DropDown', {
  enumerable: true,
  get: function get() {
    return _dropdown.DropDown;
  }
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _language = __webpack_require__(133);

Object.defineProperty(exports, 'LanguageControl', {
  enumerable: true,
  get: function get() {
    return _language.LanguageControl;
  }
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeDisplay = __webpack_require__(139);

Object.defineProperty(exports, 'TimeDisplay', {
  enumerable: true,
  get: function get() {
    return _timeDisplay.TimeDisplay;
  }
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overlayPortal = __webpack_require__(141);

Object.defineProperty(exports, 'OverlayPortal', {
  enumerable: true,
  get: function get() {
    return _overlayPortal.OverlayPortal;
  }
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Watermark = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _preactRedux = __webpack_require__(2);

var _eventManager = __webpack_require__(9);

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
    config: Object.assign({
      placement: 'top-left',
      timeout: 0
    }, state.config.components.watermark)
  };
};

/**
 * Watermark component
 * @class Watermark
 * @example <Watermark player={this.player} />
 * @extends {BaseComponent}
 */
var Watermark = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(Watermark, _BaseComponent);

  /**
   * Creates an instance of Watermark.
   * @param {Object} obj - object
   * @memberof Watermark
   */
  function Watermark(obj) {
    _classCallCheck(this, Watermark);

    var _this = _possibleConstructorReturn(this, (Watermark.__proto__ || Object.getPrototypeOf(Watermark)).call(this, { name: 'Watermark', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    _this.setState({ show: true });
    return _this;
  }

  /**
   * After component mounted, listen to relevant player event for updating the state of the component
   * @method componentDidMount
   * @returns {void}
   * @memberof Watermark
   */


  /**
   * @static
   * @type {string} - Component display name
   */


  _createClass(Watermark, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      /**
       * playing handler
       * @returns {void}
       */
      var onPlaying = function onPlaying() {
        if (_this2.props.config.timeout > 0) {
          setTimeout(function () {
            return _this2.setState({ show: false });
          }, _this2.props.config.timeout);
        }
      };

      this._eventManager.listenOnce(this.player, this.player.Event.PLAYING, onPlaying);
      this._eventManager.listen(this.player, this.player.Event.CHANGE_SOURCE_ENDED, function () {
        _this2.setState({ show: true });
        _this2._eventManager.listenOnce(_this2.player, _this2.player.Event.PLAYING, onPlaying);
      });
    }

    /**
     * Render component
     * @param {*} props - component props
     * @returns {?React$Element} - component element
     * @memberof Watermark
     */

  }, {
    key: 'render',
    value: function render(props) {
      if (props.config.img) {
        var styleClass = [_style2.default.watermark];
        props.config.placement.split('-').forEach(function (side) {
          styleClass.push(_style2.default[side]);
        });
        if (!this.state.show) {
          styleClass.push(_style2.default.hideWatermark);
        }
        return (0, _preact.h)(
          'div',
          { className: styleClass.join(' ') },
          (0, _preact.h)(
            'a',
            { href: props.config.url, target: '_blank', rel: 'noopener noreferrer' },
            (0, _preact.h)('img', { src: props.config.img })
          )
        );
      }
    }
  }]);

  return Watermark;
}(_base2.default)) || _class);
Watermark.displayName = 'watermark';
exports.Watermark = Watermark;

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(88);
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
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(87);




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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(81);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 53 */
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
/* 54 */
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _engineConnector = __webpack_require__(100);

Object.defineProperty(exports, 'EngineConnector', {
  enumerable: true,
  get: function get() {
    return _engineConnector.EngineConnector;
  }
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventDispatcherMiddleware = exports.types = undefined;

var _keyboardHandlers;

var _fakeEvent = __webpack_require__(8);

var _shell = __webpack_require__(7);

var _audioSelectedEvent = __webpack_require__(101);

var _captionSelectedEvent = __webpack_require__(102);

var _captionsStyleSelectedEvent = __webpack_require__(103);

var _qualitySelectedEvent = __webpack_require__(104);

var _seekedEvent = __webpack_require__(105);

var _speedSelectedEvent = __webpack_require__(106);

var _uiVisibilityChangedEvent = __webpack_require__(107);

var _rewindClicked = __webpack_require__(108);

var _volumeChanged = __webpack_require__(109);

var _keyMap = __webpack_require__(6);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var namespace = 'event-dispatcher-middleware';

var types = {
  COMPONENT_CLICKED: namespace + '/COMPONENT_CLICKED',
  COMPONENT_CHANGED: namespace + '/COMPONENT_CHANGED'
};

/**
 * EventDispatcher Middleware function.
 * @param {Player} player - The video player.
 * @returns {void}
 */
var eventDispatcherMiddleware = function eventDispatcherMiddleware(player) {
  return function (store) {
    return function (next) {
      return function (action) {
        switch (action.type) {
          case types.COMPONENT_CLICKED:
            onClickableComponentsHandler(store, action, player);
            break;

          case types.COMPONENT_CHANGED:
            onChangeableComponentsHandler(store, action, player);
            break;

          case _shell.types.UPDATE_PLAYER_HOVER_STATE:
            onPlayerHoverStateChangeHandler(store, action, player);
            break;

          default:
            break;
        }
        next(action);
      };
    };
  };
};

/**
 * Handler for hover state change action.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onPlayerHoverStateChangeHandler(store, action, player) {
  var engineState = store.getState().engine;
  var shellState = store.getState().shell;
  if (!engineState.adBreak && engineState.isPlaying && shellState.playerHover !== action.hover) {
    player.dispatchEvent(new _uiVisibilityChangedEvent.UIVisibilityChangedEvent(action.hover));
  }
}

/**
 * Handler for changeable components actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onChangeableComponentsHandler(store, action, player) {
  switch (action.name) {
    case 'Volume':
      player.dispatchEvent(new _volumeChanged.VolumeChangedEvent(action.payload.volume));
      break;

    case 'SeekBarPlaybackContainer':
      player.dispatchEvent(new _seekedEvent.SeekedEvent(action.payload.from, action.payload.to));
      break;

    default:
      break;
  }
}

/**
 * Handler for clickable components actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onClickableComponentsHandler(store, action, player) {
  switch (action.name) {
    case 'Keyboard':
      keyboardHandlers[action.payload.key](store, action, player);
      break;

    case 'OverlayAction':
      onOverlayActionClicked(store, action, player);
      break;

    case 'Settings':
      onSettingsClicked(store, action, player);
      break;

    case 'CVAAOverlay':
      player.dispatchEvent(new _captionsStyleSelectedEvent.CaptionsStyleSelectedEvent(action.payload.textStyle));
      break;

    case 'Fullscreen':
      onFullScreenClicked(store, action, player);
      break;

    case 'LanguageControl':
      onLanguageClicked(store, action, player);
      break;

    case 'Shell':
      player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.UI_CLICKED));
      break;

    case 'Rewind':
      player.dispatchEvent(new _rewindClicked.RewindClickedEvent(action.payload.from, action.payload.to));
      break;

    case 'LiveTag':
      player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_CLICKED_LIVE_TAG));
      break;

    case 'PrePlaybackPlayOverlay':
    case 'PlayPause':
      onPlayPauseClicked(store, action, player);
      break;

    case 'Volume':
      onVolumeClicked(store, action, player);
      break;
  }
}

/**
 * Handler for play-pause clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onPlayPauseClicked(store, action, player) {
  var engineState = store.getState().engine;
  if (engineState.adBreak) {
    engineState.adIsPlaying ? player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_CLICKED_PAUSE)) : player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_CLICKED_PLAY));
  } else {
    engineState.isPlaying ? player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_CLICKED_PAUSE)) : player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_CLICKED_PLAY));
  }
}

/**
 * Handler for volume clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onVolumeClicked(store, action, player) {
  var engineState = store.getState().engine;
  engineState.muted ? player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_CLICKED_MUTE)) : player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_CLICKED_UNMUTE));
}

/**
 * Handler for language menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onLanguageClicked(store, action, player) {
  if (action.payload.type === player.Track.AUDIO) {
    player.dispatchEvent(new _audioSelectedEvent.AudioSelectedEvent(action.payload.track));
  } else if (action.payload.type === player.Track.TEXT) {
    player.dispatchEvent(new _captionSelectedEvent.CaptionSelectedEvent(action.payload.track));
  }
}

/**
 * Handler for fullscreen clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onFullScreenClicked(store, action, player) {
  player.isFullscreen() ? player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_EXITED_FULL_SCREEN)) : player.dispatchEvent(new _fakeEvent.FakeEvent(_fakeEvent.FakeEvent.Type.USER_ENTERED_FULL_SCREEN));
}

/**
 * Handler for settings menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onSettingsClicked(store, action, player) {
  if (action.payload.type === player.Track.VIDEO) {
    player.dispatchEvent(new _qualitySelectedEvent.QualitySelectedEvent(action.payload.track));
  } else {
    player.dispatchEvent(new _speedSelectedEvent.SpeedSelectedEvent(action.payload.speed));
  }
}

/**
 * Handler for overlay clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onOverlayActionClicked(store, action, player) {
  if (action.payload.type === 'PlayPause') {
    onPlayPauseClicked(store, action, player);
  } else if (action.payload.type === 'Fullscreen') {
    onFullScreenClicked(store, action, player);
  }
}

/**
 * Keyboard handler object.
 * Maps key code to its event dispatching logic.
 * @type {Object}
 */
var keyboardHandlers = (_keyboardHandlers = {}, _defineProperty(_keyboardHandlers, _keyMap.KeyMap.SPACE, function (store, action, player) {
  onPlayPauseClicked(store, action, player);
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.UP, function (store, action, player) {
  player.dispatchEvent(new _volumeChanged.VolumeChangedEvent(action.payload.volume));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.DOWN, function (store, action, player) {
  player.dispatchEvent(new _volumeChanged.VolumeChangedEvent(action.payload.volume));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.F, function (store, action, player) {
  onFullScreenClicked(store, action, player);
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.ESC, function (store, action, player) {
  onFullScreenClicked(store, action, player);
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.LEFT, function (store, action, player) {
  player.dispatchEvent(new _seekedEvent.SeekedEvent(action.payload.from, action.payload.to));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.RIGHT, function (store, action, player) {
  player.dispatchEvent(new _seekedEvent.SeekedEvent(action.payload.from, action.payload.to));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.HOME, function (store, action, player) {
  player.dispatchEvent(new _seekedEvent.SeekedEvent(action.payload.from, action.payload.to));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.END, function (store, action, player) {
  player.dispatchEvent(new _seekedEvent.SeekedEvent(action.payload.from, action.payload.to));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.M, function (store, action, player) {
  onVolumeClicked(store, action, player);
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.SEMI_COLON, function (store, action, player) {
  player.dispatchEvent(new _speedSelectedEvent.SpeedSelectedEvent(action.payload.speed));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.PERIOD, function (store, action, player) {
  player.dispatchEvent(new _speedSelectedEvent.SpeedSelectedEvent(action.payload.speed));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.COMMA, function (store, action, player) {
  player.dispatchEvent(new _speedSelectedEvent.SpeedSelectedEvent(action.payload.speed));
}), _defineProperty(_keyboardHandlers, _keyMap.KeyMap.C, function (store, action, player) {
  player.dispatchEvent(new _captionSelectedEvent.CaptionSelectedEvent(action.payload.track));
}), _keyboardHandlers);

exports.types = types;
exports.eventDispatcherMiddleware = eventDispatcherMiddleware;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shell = __webpack_require__(58);

Object.defineProperty(exports, 'Shell', {
  enumerable: true,
  get: function get() {
    return _shell.Shell;
  }
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shell = exports.CONTROL_BAR_HOVER_DEFAULT_TIMEOUT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _shell = __webpack_require__(7);

var _engine = __webpack_require__(14);

var _keyMap = __webpack_require__(6);

var _bindMethod = __webpack_require__(11);

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
    targetId: state.config.targetId,
    forceTouchUI: state.config.forceTouchUI,
    metadataLoaded: state.engine.metadataLoaded,
    currentState: state.engine.playerState.currentState,
    playerClasses: state.shell.playerClasses,
    isMobile: state.shell.isMobile,
    playerClientRect: state.shell.playerClientRect,
    playerHover: state.shell.playerHover,
    playerNav: state.shell.playerNav,
    seekbarDraggingActive: state.seekbar.draggingActive,
    seekbarHoverActive: state.seekbar.hoverActive,
    bottomBarHoverActive: state.shell.bottomBarHoverActive,
    volumeHoverActive: state.volume.hover,
    adBreak: state.engine.adBreak,
    prePlayback: state.shell.prePlayback,
    smartContainerOpen: state.shell.smartContainerOpen,
    fullscreen: state.fullscreen.fullscreen,
    fallbackToMutedAutoPlay: state.engine.fallbackToMutedAutoPlay
  };
};

/**
 * The default control bar hover time rendering timeout value
 * @type {number}
 * @const
 */
var CONTROL_BAR_HOVER_DEFAULT_TIMEOUT = exports.CONTROL_BAR_HOVER_DEFAULT_TIMEOUT = 3000;

/**
 * Shell component
 *
 * @class Shell
 * @example <Shell player={this.player}>...</Shell>
 * @extends {BaseComponent}
 */
var Shell = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(Object.assign({}, _shell.actions, _engine.actions))), _dec(_class = function (_BaseComponent) {
  _inherits(Shell, _BaseComponent);

  /**
   * Creates an instance of Shell.
   * @param {Object} obj obj
   * @memberof Shell
   */
  function Shell(obj) {
    _classCallCheck(this, Shell);

    var _this = _possibleConstructorReturn(this, (Shell.__proto__ || Object.getPrototypeOf(Shell)).call(this, { name: 'Shell', player: obj.player }));

    _this._onWindowResize = (0, _bindMethod.bindMethod)(_this, _this._onWindowResize);
    _this._environmentClasses = ["playkit" + '-' + _this.player.env.os.name.replace(/ /g, '-'), "playkit" + '-' + _this.player.env.browser.name.replace(/ /g, '-')];
    return _this;
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
      if (this.props.isMobile) {
        return;
      }
      if (this.state.nav) {
        this.setState({ nav: false });
        this.props.updatePlayerNavState(false);
      }
      if (!this.props.bottomBarHoverActive) {
        this._updatePlayerHoverState();
      }
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
      if (this.props.isMobile) {
        return;
      }
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
      if (this.props.isMobile) {
        return;
      }
      this._updatePlayerHoverState();
    }

    /**
     * if the ui is in fallback to muted autoplay mode, unmute the player on any click
     *
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: 'onClick',
    value: function onClick() {
      if (this.props.fallbackToMutedAutoPlay) {
        this.player.muted = false;
        this.props.updateFallbackToMutedAutoPlay(false);
      }
      this.notifyClick();
    }

    /**
     * on touch end handler
     * @param {TouchEvent} e - touch event
      * @returns {void}
     * @memberof Shell
     */

  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      if (this.props.prePlayback) {
        return;
      }
      if (!this.state.hover) {
        e.stopPropagation();
      }
      this._updatePlayerHoverState();
    }

    /**
     * key down handler
     *
     * @param {KeyboardEvent} e - event object
     * @returns {void}
     */

  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (!this.state.nav && e.keyCode === _keyMap.KeyMap.TAB) {
        this.setState({ nav: true });
        this.props.updatePlayerNavState(true);
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
      this.props.updateIsMobile(!!this.player.env.device.type || this.props.forceTouchUI);
      this._onWindowResize();
      window.addEventListener('resize', this._onWindowResize);
    }

    /**
     * window resize handler
     *
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: '_onWindowResize',
    value: function _onWindowResize() {
      var playerContainer = document.getElementById(this.props.targetId);
      if (playerContainer) {
        this.props.updatePlayerClientRect(playerContainer.getBoundingClientRect());
      }
      if (document.body) {
        this.props.updateDocumentWidth(document.body.clientWidth);
      }
    }

    /**
     * before component mounted, remove event listeners
     *
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._clearHoverTimeout();
      window.removeEventListener('resize', this._onWindowResize);
    }

    /**
     * updates the player hover state
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: '_updatePlayerHoverState',
    value: function _updatePlayerHoverState() {
      if (this.props.prePlayback) {
        return;
      }
      if (!this.state.hover) {
        this.props.updatePlayerHoverState(true);
        this.setState({ hover: true });
      }
      this._startHoverTimeout();
    }

    /**
     * checks if hover state can be ended based on other components states
     * @returns {boolean} - if hover state can be ended
     * @private
     * @memberof Shell
     */

  }, {
    key: '_canEndHoverState',
    value: function _canEndHoverState() {
      return !this.props.seekbarDraggingActive && !this.props.seekbarHoverActive && !this.props.volumeHoverActive && !this.props.smartContainerOpen && !this.player.paused;
    }

    /**
     * starts the hover timeout.
     * @returns {void}
     * @private
     * @memberof Shell
     */

  }, {
    key: '_startHoverTimeout',
    value: function _startHoverTimeout() {
      var _this2 = this;

      this._clearHoverTimeout();
      this.hoverTimeout = setTimeout(function () {
        if (_this2._canEndHoverState()) {
          _this2.props.updatePlayerHoverState(false);
          _this2.setState({ hover: false });
        }
      }, this.props.hoverTimeout || CONTROL_BAR_HOVER_DEFAULT_TIMEOUT);
    }

    /**
     * clears the hover timeout.
     * @returns {void}
     * @private
     * @memberof Shell
     */

  }, {
    key: '_clearHoverTimeout',
    value: function _clearHoverTimeout() {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null;
      }
    }

    /**
     * when component did update and change its props from prePlayback to !prePlayback
     * update the hover state
     *
     * @param {Object} prevProps - previous props
     * @returns {void}
     * @memberof Shell
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // Update the hover state if the transition was from pre playback screen
      // or after an ad break
      if (!this.props.prePlayback && prevProps.prePlayback || !this.props.adBreak && prevProps.adBreak) {
        this._updatePlayerHoverState();
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
      var _this3 = this;

      var playerClasses = [_style2.default.player, _style2.default.skinDefault].concat(_toConsumableArray(this._environmentClasses));
      playerClasses.push(props.playerClasses);

      if (this.props.isMobile) playerClasses.push(_style2.default.touch);
      if (this.props.playerNav) playerClasses.push(_style2.default.nav);
      if (this.props.playerHover || this.props.playerNav) playerClasses.push(_style2.default.hover);
      if (this.props.metadataLoaded) playerClasses.push(_style2.default.metadataLoaded);
      if (this.props.adBreak) playerClasses.push(_style2.default.adBreak);
      if (this.props.metadataLoaded) playerClasses.push(_style2.default['state-' + this.props.currentState]);
      if (this.props.seekbarDraggingActive) playerClasses.push(_style2.default.hover);
      if (this.props.fullscreen) playerClasses.push(_style2.default.fullscreen);
      if (this.props.playerClientRect && this.props.playerClientRect.width <= 480) playerClasses.push(_style2.default.sizeSm);else if (this.props.playerClientRect && this.props.playerClientRect.width <= 768) playerClasses.push(_style2.default.sizeMd);

      playerClasses = playerClasses.join(' ');

      return (0, _preact.h)(
        'div',
        {
          tabIndex: '0',
          className: playerClasses,
          onClick: function onClick() {
            return _this3.onClick();
          },
          onTouchEnd: function onTouchEnd(e) {
            return _this3.onTouchEnd(e);
          },
          onMouseOver: function onMouseOver() {
            return _this3.onMouseOver();
          },
          onMouseMove: function onMouseMove() {
            return _this3.onMouseMove();
          },
          onMouseLeave: function onMouseLeave() {
            return _this3.onMouseLeave();
          },
          onKeyDown: function onKeyDown(e) {
            return _this3.onKeyDown(e);
          } },
        props.children
      );
    }
  }]);

  return Shell;
}(_base2.default)) || _class);
exports.Shell = Shell;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _videoPlayer = __webpack_require__(115);

Object.defineProperty(exports, 'VideoPlayer', {
  enumerable: true,
  get: function get() {
    return _videoPlayer.VideoPlayer;
  }
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idle = __webpack_require__(117);

Object.defineProperty(exports, 'idleUI', {
  enumerable: true,
  get: function get() {
    return _idle.idleUI;
  }
});

var _playback = __webpack_require__(119);

Object.defineProperty(exports, 'playbackUI', {
  enumerable: true,
  get: function get() {
    return _playback.playbackUI;
  }
});

var _ads = __webpack_require__(143);

Object.defineProperty(exports, 'adsUI', {
  enumerable: true,
  get: function get() {
    return _ads.adsUI;
  }
});

var _error = __webpack_require__(148);

Object.defineProperty(exports, 'errorUI', {
  enumerable: true,
  get: function get() {
    return _error.errorUI;
  }
});

var _live = __webpack_require__(150);

Object.defineProperty(exports, 'liveUI', {
  enumerable: true,
  get: function get() {
    return _live.liveUI;
  }
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rewind = __webpack_require__(124);

Object.defineProperty(exports, 'RewindControl', {
  enumerable: true,
  get: function get() {
    return _rewind.RewindControl;
  }
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seekbarPlaybackContainer = __webpack_require__(125);

Object.defineProperty(exports, 'SeekBarPlaybackContainer', {
  enumerable: true,
  get: function get() {
    return _seekbarPlaybackContainer.SeekBarPlaybackContainer;
  }
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmartContainerItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _dropdown = __webpack_require__(45);

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
        { className: [_style2.default.smartContainerItem, _style2.default.selectMenuItem].join(' ') },
        (0, _preact.h)(
          'label',
          { htmlFor: _icon.IconType.Quality },
          props.icon ? (0, _preact.h)(
            'div',
            { className: _style2.default.labelIcon },
            (0, _preact.h)(_icon2.default, { type: props.icon })
          ) : undefined,
          props.label
        ),
        (0, _preact.h)(_dropdown.DropDown, { onSelect: function onSelect(o) {
            return props.onSelect(o);
          }, options: props.options })
      );
    }
  }]);

  return SmartContainerItem;
}(_preact.Component);

exports.SmartContainerItem = SmartContainerItem;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menu = __webpack_require__(132);

Object.defineProperty(exports, 'Menu', {
  enumerable: true,
  get: function get() {
    return _menu.Menu;
  }
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cvaaOverlay = __webpack_require__(134);

Object.defineProperty(exports, 'CVAAOverlay', {
  enumerable: true,
  get: function get() {
    return _cvaaOverlay.CVAAOverlay;
  }
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slider = __webpack_require__(136);

Object.defineProperty(exports, 'Slider', {
  enumerable: true,
  get: function get() {
    return _slider.Slider;
  }
});

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeDisplayPlaybackContainer = __webpack_require__(138);

Object.defineProperty(exports, 'TimeDisplayPlaybackContainer', {
  enumerable: true,
  get: function get() {
    return _timeDisplayPlaybackContainer.TimeDisplayPlaybackContainer;
  }
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeDisplayAdsContainer = __webpack_require__(144);

Object.defineProperty(exports, 'TimeDisplayAdsContainer', {
  enumerable: true,
  get: function get() {
    return _timeDisplayAdsContainer.TimeDisplayAdsContainer;
  }
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adSkip = __webpack_require__(145);

Object.defineProperty(exports, 'AdSkip', {
  enumerable: true,
  get: function get() {
    return _adSkip.AdSkip;
  }
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adLearnMore = __webpack_require__(146);

Object.defineProperty(exports, 'AdLearnMore', {
  enumerable: true,
  get: function get() {
    return _adLearnMore.AdLearnMore;
  }
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _topBar = __webpack_require__(147);

Object.defineProperty(exports, 'TopBar', {
  enumerable: true,
  get: function get() {
    return _topBar.TopBar;
  }
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorOverlay = __webpack_require__(149);

Object.defineProperty(exports, 'ErrorOverlay', {
  enumerable: true,
  get: function get() {
    return _errorOverlay.ErrorOverlay;
  }
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seekbarLivePlaybackContainer = __webpack_require__(151);

Object.defineProperty(exports, 'SeekBarLivePlaybackContainer', {
  enumerable: true,
  get: function get() {
    return _seekbarLivePlaybackContainer.SeekBarLivePlaybackContainer;
  }
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _liveTag = __webpack_require__(152);

Object.defineProperty(exports, 'LiveTag', {
  enumerable: true,
  get: function get() {
    return _liveTag.LiveTag;
  }
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shareOverlay = __webpack_require__(159);

Object.defineProperty(exports, 'ShareOverlay', {
  enumerable: true,
  get: function get() {
    return _shareOverlay.ShareOverlay;
  }
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = exports.VERSION = exports.UIManager = exports.EventType = exports.Utils = exports.Components = exports.Presets = exports.Reducers = exports.redux = exports.preact = exports.h = undefined;

var _preact = __webpack_require__(0);

Object.defineProperty(exports, 'h', {
  enumerable: true,
  get: function get() {
    return _preact.h;
  }
});

var _uiManager = __webpack_require__(79);

var _uiManager2 = _interopRequireDefault(_uiManager);

var preact = _interopRequireWildcard(_preact);

var _eventType = __webpack_require__(30);

var _preactRedux = __webpack_require__(2);

var redux = _interopRequireWildcard(_preactRedux);

var _reducers = __webpack_require__(155);

var Reducers = _interopRequireWildcard(_reducers);

var _uiPresets = __webpack_require__(60);

var Presets = _interopRequireWildcard(_uiPresets);

var _components = __webpack_require__(156);

var Components = _interopRequireWildcard(_components);

var _utils = __webpack_require__(165);

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.preact = preact;
exports.redux = redux;

// ui reducers

// ui presets

// components

//Utils

exports.Reducers = Reducers;
exports.Presets = Presets;
exports.Components = Components;
exports.Utils = Utils;
exports.EventType = _eventType.EventType;
exports.UIManager = _uiManager2.default;
exports.VERSION = "0.23.5";
exports.NAME = "playkit-js-ui";

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// core components for the UI

// ui presets


var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _preactI18n = __webpack_require__(10);

var _redux = __webpack_require__(12);

var _copyDeep = __webpack_require__(96);

var _logger = __webpack_require__(29);

var _eventType = __webpack_require__(30);

var _store = __webpack_require__(98);

var _store2 = _interopRequireDefault(_store);

var _fr = __webpack_require__(99);

var _fr2 = _interopRequireDefault(_fr);

var _config = __webpack_require__(13);

var _playkitJs = __webpack_require__(33);

var _engineConnector = __webpack_require__(55);

var _shell = __webpack_require__(57);

var _videoPlayer = __webpack_require__(59);

var _playerGui = __webpack_require__(116);

var _uiPresets = __webpack_require__(60);

var presets = _interopRequireWildcard(_uiPresets);

var _middlewares = __webpack_require__(153);

__webpack_require__(1);

var _eventManager = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
   * @param {UIOptionsObject} config - ui config
   * @memberof UIManager
   */
  function UIManager(player, config) {
    _classCallCheck(this, UIManager);

    if (config.logLevel && this.LogLevel[config.logLevel]) {
      (0, _logger.setLogLevel)(this.LogLevel[config.logLevel]);
    }
    this.player = player;
    this.targetId = config.targetId;
    this._eventManager = _eventManager.UIEventManager.getInstance();
    this._createStore(config);
    this.setConfig(config);
  }

  /**
   * Gets the updated state from the config reducer.
   * @public
   * @returns {UIOptionsObject} - The UI manager config.
   */


  _createClass(UIManager, [{
    key: 'setConfig',


    /**
     * sets the player and ui config in the store
     *
     * @param {Object} config - new config object
     * @param {string} componentAlias - component alias (optional)
     * @returns {void}
     * @memberof UIManager
     */
    value: function setConfig(config, componentAlias) {
      if (componentAlias) {
        this.store.dispatch(_config.actions.updateComponentConfig(componentAlias, config));
      } else {
        this.store.dispatch(_config.actions.updateConfig(config));
      }
    }

    /**
     * build default UIs
     *
     * @returns {void}
     * @memberof UIManager
     */

  }, {
    key: 'buildDefaultUI',
    value: function buildDefaultUI() {
      var uis = [{ template: function template(props) {
          return presets.idleUI(props);
        }, condition: function condition(state) {
          return state.engine.isIdle;
        } }, { template: function template(props) {
          return presets.errorUI(props);
        }, condition: function condition(state) {
          return state.engine.hasError;
        } }, { template: function template(props) {
          return presets.adsUI(props);
        }, condition: function condition(state) {
          return state.engine.adBreak;
        } }, { template: function template(props) {
          return presets.liveUI(props);
        }, condition: function condition(state) {
          return state.engine.isLive;
        } }, { template: function template(props) {
          return presets.playbackUI(props);
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
            return presets.playbackUI(props);
          } }];
        this._buildUI(fallbackUIs);
      }
    }

    /**
     * Creates the redux store.
     * @param {UIOptionsObject} config - The UI config.
     * @private
     * @returns {void}
     */

  }, {
    key: '_createStore',
    value: function _createStore(config) {
      this.store = (0, _redux.createStore)(_store2.default, window.devToolsExtension && window.devToolsExtension({
        name: 'playkit #' + this.targetId,
        instanceId: this.targetId
      }), (0, _middlewares.middleware)(this.player, config));
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
      var container = document.getElementById(this.targetId);
      // i18n, redux and initial player-to-store connector setup
      var template = (0, _preact.h)(
        _preactRedux.Provider,
        { store: this.store },
        (0, _preact.h)(
          _preactI18n.IntlProvider,
          { definition: _fr2.default },
          (0, _preact.h)(
            _shell.Shell,
            { player: this.player },
            (0, _preact.h)(_engineConnector.EngineConnector, { player: this.player }),
            (0, _preact.h)(_videoPlayer.VideoPlayer, { player: this.player }),
            (0, _preact.h)(_playerGui.PlayerGUI, { uis: uis, player: this.player, playerContainer: container })
          )
        )
      );

      // render the player
      (0, _preact.render)(template, container);
    }

    /**
     * Destroy the ui manager.
     * @returns {void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var container = document.getElementById(this.targetId);
      if (container && container.childNodes) {
        container.removeChild(container.childNodes[0]);
        container.prepend(this.player.getView());
        this._eventManager.removeAll();
      }
    }

    /**
     * get the log level
     * @param {?string} name - the logger name
     * @returns {Object} - the log level
     */

  }, {
    key: 'getLogLevel',
    value: function getLogLevel(name) {
      return (0, _logger.getLogLevel)(name);
    }

    /**
     * sets the logger level
     * @param {Object} level - the log level
     * @param {?string} name - the logger name
     * @returns {void}
     */

  }, {
    key: 'setLogLevel',
    value: function setLogLevel(level, name) {
      (0, _logger.setLogLevel)(level, name);
    }

    /**
     * Get the ui manager log level.
     * @returns {Object} - The log levels of the player.
     * @public
     */

  }, {
    key: 'config',
    get: function get() {
      return (0, _copyDeep.copyDeep)(this.store.getState().config);
    }
  }, {
    key: 'LogLevel',
    get: function get() {
      return _logger.LogLevel;
    }

    /**
     * Gets the ui manager event enums.
     * @returns {Object} - The ui manager event enums.
     * @public
     */

  }, {
    key: 'Event',
    get: function get() {
      return _eventType.EventType;
    }
  }]);

  return UIManager;
}();

exports.default = UIManager;

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(84);




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
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(82);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(28)))

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(52);


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
/* 84 */
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
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(86);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 86 */
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
/* 87 */
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(89);


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(91);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28), __webpack_require__(90)(module)))

/***/ }),
/* 90 */
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
/* 91 */
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
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(53);




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

    if (true) {
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
  if (true) {
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

    if (true) {
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

/***/ }),
/* 93 */
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
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(54);
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):e.dlv=n()}(this,function(){function e(e,n,t,o){for(o=0,n=n.split?n.split("."):n;e&&o<n.length;)e=e[n[o++]];return void 0===e?t:e}return e});

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @param {any} data - The data to copy.
 * @returns {any} - The copied data.
 */
function copyDeep(data) {
  var node = void 0;
  if (Array.isArray(data)) {
    node = data.length > 0 ? data.slice(0) : [];
    node.forEach(function (e, i) {
      if ((typeof e === "undefined" ? "undefined" : _typeof(e)) === "object" && e !== {} || Array.isArray(e) && e.length > 0) {
        node[i] = copyDeep(e);
      }
    });
  } else if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
    node = Object.assign({}, data);
    Object.keys(node).forEach(function (key) {
      if (_typeof(node[key]) === "object" && node[key] !== {} || Array.isArray(node[key]) && node[key].length > 0) {
        node[key] = copyDeep(node[key]);
      }
    });
  } else {
    node = data;
  }
  return node;
}

exports.copyDeep = copyDeep;

/***/ }),
/* 97 */
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
	Logger.VERSION = "1.4.1";

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
		
		// Gets the current logging level for the logging instance
		getLevel: function () {
			return this.context.filterLevel;
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

	// Gets the global logging filter level
	Logger.getLevel = function() {
		return globalLogger.getLevel();
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
				} else if (context.level === Logger.DEBUG && console.debug) {
					hdlr = console.debug;
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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(12);

var _config = __webpack_require__(13);

var _config2 = _interopRequireDefault(_config);

var _engine = __webpack_require__(14);

var _engine2 = _interopRequireDefault(_engine);

var _shell = __webpack_require__(7);

var _shell2 = _interopRequireDefault(_shell);

var _seekbar = __webpack_require__(17);

var _seekbar2 = _interopRequireDefault(_seekbar);

var _volume = __webpack_require__(31);

var _volume2 = _interopRequireDefault(_volume);

var _fullscreen = __webpack_require__(32);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _loading = __webpack_require__(19);

var _loading2 = _interopRequireDefault(_loading);

var _share = __webpack_require__(34);

var _share2 = _interopRequireDefault(_share);

var _cvaa = __webpack_require__(20);

var _cvaa2 = _interopRequireDefault(_cvaa);

var _settings = __webpack_require__(35);

var _settings2 = _interopRequireDefault(_settings);

var _overlayAction = __webpack_require__(21);

var _overlayAction2 = _interopRequireDefault(_overlayAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({
  config: _config2.default,
  engine: _engine2.default,
  shell: _shell2.default,
  seekbar: _seekbar2.default,
  volume: _volume2.default,
  fullscreen: _fullscreen2.default,
  loading: _loading2.default,
  share: _share2.default,
  cvaa: _cvaa2.default,
  settings: _settings2.default,
  overlayAction: _overlayAction2.default
});

exports.default = reducer;

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = {
	"core": {
		"disable": "Disable",
		"auto": "Auto",
		"close": "Close",
		"retry": "Retry"
	},
	"controls": {
		"play": "Play",
		"pause": "Pause",
		"share": "Share",
		"language": "Language",
		"settings": "Settings",
		"fullscreen": "Fullscreen",
		"rewind": "Rewind",
		"vrStereo": "vrStereo"
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
	},
	"error": {
		"default_error": "Something went wrong",
		"default_session_text": "Session ID "
	}
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EngineConnector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _engine = __webpack_require__(14);

var _engine2 = _interopRequireDefault(_engine);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _eventManager = __webpack_require__(9);

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

    var _this = _possibleConstructorReturn(this, (EngineConnector.__proto__ || Object.getPrototypeOf(EngineConnector)).call(this, { name: 'EngineConnector', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    return _this;
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

      this._eventManager.listen(this.player, this.player.Event.PLAYER_RESET, function () {
        _this2.props.updateIsIdle(true);
      });

      this._eventManager.listen(this.player, this.player.Event.SOURCE_SELECTED, function () {
        _this2.props.updateHasError(false);
        _this2.props.updateIsVr(_this2.player.isVr());
      });

      this._eventManager.listen(this.player, this.player.Event.CHANGE_SOURCE_STARTED, function () {
        _this2.props.updateFallbackToMutedAutoPlay(false);
        _this2.props.updateAdBreak(false);
        _this2.props.updateAdIsPlaying(false);
        _this2.props.updateIsPlaying(false);
      });

      this._eventManager.listen(this.player, this.player.Event.CHANGE_SOURCE_ENDED, function () {
        _this2.props.updatePlayerPoster(_this2.player.poster);
        _this2.props.updateIsIdle(false);
      });

      this._eventManager.listen(this.player, this.player.Event.PLAYER_STATE_CHANGED, function (e) {
        _this2.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
      });

      this._eventManager.listen(this.player, this.player.Event.TIME_UPDATE, function () {
        _this2.props.updateCurrentTime(_this2.player.currentTime);
      });

      this._eventManager.listen(this.player, this.player.Event.DURATION_CHANGE, function () {
        _this2.props.updateDuration(_this2.player.duration);
      });

      this._eventManager.listen(this.player, this.player.Event.LOADED_DATA, function () {
        _this2.props.updateDuration(_this2.player.duration);
      });

      this._eventManager.listen(this.player, this.player.Event.LOADED_METADATA, function () {
        _this2.props.updateMuted(_this2.player.muted);
        _this2.props.updateMetadataLoadingStatus(true);
        _this2.props.updateIsLive(_this2.player.isLive());
        _this2.props.updateIsDvr(_this2.player.isDvr());
        _this2.props.updatePlayerPoster(_this2.player.poster);
      });

      this._eventManager.listen(this.player, this.player.Event.VOLUME_CHANGE, function () {
        _this2.props.updateVolume(_this2.player.volume);
      });

      this._eventManager.listen(this.player, this.player.Event.MUTE_CHANGE, function () {
        _this2.props.updateMuted(_this2.player.muted);
      });

      this._eventManager.listen(this.player, this.player.Event.PLAYING, function () {
        _this2.props.updateIsPlaying(true);

        if (_this2.props.engine.isEnded) {
          _this2.props.updateIsEnded(false);
        }
      });

      this._eventManager.listen(this.player, this.player.Event.PAUSE, function () {
        _this2.props.updateIsPlaying(false);
      });

      this._eventManager.listen(this.player, this.player.Event.ENDED, function () {
        _this2.props.updateIsEnded(true);
      });

      this._eventManager.listen(this.player, this.player.Event.TRACKS_CHANGED, function () {
        var audioTracks = _this2.player.getTracks(TrackType.AUDIO);
        var videoTracks = _this2.player.getTracks(TrackType.VIDEO);
        var textTracks = _this2.player.getTracks(TrackType.TEXT);

        _this2.props.updateAudioTracks(audioTracks);
        _this2.props.updateVideoTracks(videoTracks);
        _this2.props.updateTextTracks(textTracks);
      });

      this._eventManager.listen(this.player, this.player.Event.TEXT_TRACK_CHANGED, function () {
        var tracks = _this2.player.getTracks(TrackType.TEXT);
        _this2.props.updateTextTracks(tracks);
      });

      this._eventManager.listen(this.player, this.player.Event.AUDIO_TRACK_CHANGED, function () {
        var tracks = _this2.player.getTracks(TrackType.AUDIO);
        _this2.props.updateAudioTracks(tracks);
      });

      this._eventManager.listen(this.player, this.player.Event.VIDEO_TRACK_CHANGED, function () {
        var tracks = _this2.player.getTracks(TrackType.VIDEO);
        _this2.props.updateVideoTracks(tracks);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_BREAK_START, function () {
        _this2.props.updateHasError(false);
        _this2.props.updateAdBreak(true);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_BREAK_END, function () {
        _this2.props.updateAdBreak(false);
      });

      this._eventManager.listen(this.player, this.player.Event.ALL_ADS_COMPLETED, function () {
        _this2.props.updateAdBreak(false);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_PROGRESS, function (e) {
        var currentTime = e.payload.adProgress.currentTime;
        var duration = e.payload.adProgress.duration;

        _this2.props.updateAdBreakProgress(currentTime, duration);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_COMPLETED, function () {
        _this2.props.updateAdBreakCompleted();
      });

      this._eventManager.listen(this.player, this.player.Event.AD_STARTED, function () {
        _this2.props.updateAdIsPlaying(true);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_RESUMED, function () {
        _this2.props.updateAdIsPlaying(true);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_PAUSED, function () {
        _this2.props.updateAdIsPlaying(false);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_ERROR, function (e) {
        if (e.payload.fatal) {
          _this2.props.updateAdBreak(false);
        }
      });

      this._eventManager.listen(this.player, this.player.Event.FALLBACK_TO_MUTED_AUTOPLAY, function () {
        _this2.props.updateFallbackToMutedAutoPlay(true);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_LOADED, function (e) {
        _this2.props.updateAdIsLinear(e.payload.ad.isLinear());
        _this2.props.updateAdClickUrl(e.payload.ad.g.clickThroughUrl);
        _this2.props.updateAdSkipTimeOffset(e.payload.ad.getSkipTimeOffset());
        _this2.props.updateAdSkippableState(e.payload.ad.getAdSkippableState());
      });

      this._eventManager.listen(this.player, this.player.Event.VR_STEREO_MODE_CHANGED, function (e) {
        _this2.props.updateVrStereoMode(e.payload.mode);
      });

      this._eventManager.listen(this.player, this.player.Event.ERROR, function (e) {
        if (e.payload && e.payload.severity === 2) {
          _this2.props.updateHasError(true);
        }
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
exports.EngineConnector = EngineConnector;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSelectedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AudioSelectedEvent event
 *
 * @class AudioSelectedEvent
 * @extends {FakeEvent}
 */
var AudioSelectedEvent = function (_FakeEvent) {
  _inherits(AudioSelectedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {Object} audioTrack - The selected audio track.
   */
  function AudioSelectedEvent(audioTrack) {
    _classCallCheck(this, AudioSelectedEvent);

    var _this = _possibleConstructorReturn(this, (AudioSelectedEvent.__proto__ || Object.getPrototypeOf(AudioSelectedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_SELECTED_AUDIO_TRACK));

    _this.payload = {
      audioTrack: audioTrack
    };
    return _this;
  }

  return AudioSelectedEvent;
}(_fakeEvent.FakeEvent);

exports.AudioSelectedEvent = AudioSelectedEvent;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptionSelectedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CaptionSelectedEvent event
 *
 * @class CaptionSelectedEvent
 * @extends {FakeEvent}
 */
var CaptionSelectedEvent = function (_FakeEvent) {
  _inherits(CaptionSelectedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {Object} captionTrack - The selected caption track.
   */
  function CaptionSelectedEvent(captionTrack) {
    _classCallCheck(this, CaptionSelectedEvent);

    var _this = _possibleConstructorReturn(this, (CaptionSelectedEvent.__proto__ || Object.getPrototypeOf(CaptionSelectedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_SELECTED_CAPTION_TRACK));

    _this.payload = {
      captionTrack: captionTrack
    };
    return _this;
  }

  return CaptionSelectedEvent;
}(_fakeEvent.FakeEvent);

exports.CaptionSelectedEvent = CaptionSelectedEvent;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptionsStyleSelectedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CaptionsStyleSelectedEvent event
 *
 * @class CaptionsStyleSelectedEvent
 * @extends {FakeEvent}
 */
var CaptionsStyleSelectedEvent = function (_FakeEvent) {
  _inherits(CaptionsStyleSelectedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {Object} captionsStyle - The selected captoons style.
   */
  function CaptionsStyleSelectedEvent(captionsStyle) {
    _classCallCheck(this, CaptionsStyleSelectedEvent);

    var _this = _possibleConstructorReturn(this, (CaptionsStyleSelectedEvent.__proto__ || Object.getPrototypeOf(CaptionsStyleSelectedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_SELECTED_CAPTIONS_STYLE));

    _this.payload = {
      captionsStyle: captionsStyle
    };
    return _this;
  }

  return CaptionsStyleSelectedEvent;
}(_fakeEvent.FakeEvent);

exports.CaptionsStyleSelectedEvent = CaptionsStyleSelectedEvent;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QualitySelectedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * QualitySelectedEvent event
 *
 * @class QualitySelectedEvent
 * @extends {FakeEvent}
 */
var QualitySelectedEvent = function (_FakeEvent) {
  _inherits(QualitySelectedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {Object} qualityTrack - The selected quality track.
   */
  function QualitySelectedEvent(qualityTrack) {
    _classCallCheck(this, QualitySelectedEvent);

    var _this = _possibleConstructorReturn(this, (QualitySelectedEvent.__proto__ || Object.getPrototypeOf(QualitySelectedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_SELECTED_QUALITY_TRACK));

    _this.payload = {
      qualityTrack: qualityTrack
    };
    return _this;
  }

  return QualitySelectedEvent;
}(_fakeEvent.FakeEvent);

exports.QualitySelectedEvent = QualitySelectedEvent;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SeekedEvent event
 *
 * @class SeekedEvent
 * @extends {FakeEvent}
 */
var SeekedEvent = function (_FakeEvent) {
  _inherits(SeekedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {number} from - The start seek time.
   * @param {number} to - The target seek time.
   */
  function SeekedEvent(from, to) {
    _classCallCheck(this, SeekedEvent);

    var _this = _possibleConstructorReturn(this, (SeekedEvent.__proto__ || Object.getPrototypeOf(SeekedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_SEEKED));

    _this.payload = {
      from: from,
      to: to
    };
    return _this;
  }

  return SeekedEvent;
}(_fakeEvent.FakeEvent);

exports.SeekedEvent = SeekedEvent;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpeedSelectedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SpeedSelectedEvent event
 *
 * @class SpeedSelectedEvent
 * @extends {FakeEvent}
 */
var SpeedSelectedEvent = function (_FakeEvent) {
  _inherits(SpeedSelectedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {number} speed - The selected speed.
   */
  function SpeedSelectedEvent(speed) {
    _classCallCheck(this, SpeedSelectedEvent);

    var _this = _possibleConstructorReturn(this, (SpeedSelectedEvent.__proto__ || Object.getPrototypeOf(SpeedSelectedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_SELECTED_SPEED));

    _this.payload = {
      speed: speed
    };
    return _this;
  }

  return SpeedSelectedEvent;
}(_fakeEvent.FakeEvent);

exports.SpeedSelectedEvent = SpeedSelectedEvent;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIVisibilityChangedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UIVisibilityChangedEvent event
 *
 * @class UIVisibilityChangedEvent
 * @extends {FakeEvent}
 */
var UIVisibilityChangedEvent = function (_FakeEvent) {
  _inherits(UIVisibilityChangedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {boolean} visible - The visible state.
   */
  function UIVisibilityChangedEvent(visible) {
    _classCallCheck(this, UIVisibilityChangedEvent);

    var _this = _possibleConstructorReturn(this, (UIVisibilityChangedEvent.__proto__ || Object.getPrototypeOf(UIVisibilityChangedEvent)).call(this, _fakeEvent.FakeEvent.Type.UI_VISIBILITY_CHANGED));

    _this.payload = {
      visible: visible
    };
    return _this;
  }

  return UIVisibilityChangedEvent;
}(_fakeEvent.FakeEvent);

exports.UIVisibilityChangedEvent = UIVisibilityChangedEvent;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewindClickedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RewindClickedEvent event
 *
 * @class RewindClickedEvent
 * @extends {FakeEvent}
 */
var RewindClickedEvent = function (_FakeEvent) {
  _inherits(RewindClickedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {number} from - The start seek time.
   * @param {number} to - The target seek time.
   */
  function RewindClickedEvent(from, to) {
    _classCallCheck(this, RewindClickedEvent);

    var _this = _possibleConstructorReturn(this, (RewindClickedEvent.__proto__ || Object.getPrototypeOf(RewindClickedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_CLICKED_REWIND));

    _this.payload = {
      from: from,
      to: to
    };
    return _this;
  }

  return RewindClickedEvent;
}(_fakeEvent.FakeEvent);

exports.RewindClickedEvent = RewindClickedEvent;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeChangedEvent = undefined;

var _fakeEvent = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * VolumeChangedEvent event
 *
 * @class VolumeChangedEvent
 * @extends {FakeEvent}
 */
var VolumeChangedEvent = function (_FakeEvent) {
  _inherits(VolumeChangedEvent, _FakeEvent);

  /**
   * @constructor
   *
   * @param {number} volume - The new volume.
   */
  function VolumeChangedEvent(volume) {
    _classCallCheck(this, VolumeChangedEvent);

    var _this = _possibleConstructorReturn(this, (VolumeChangedEvent.__proto__ || Object.getPrototypeOf(VolumeChangedEvent)).call(this, _fakeEvent.FakeEvent.Type.USER_CHANGED_VOLUME));

    _this.payload = {
      volume: volume
    };
    return _this;
  }

  return VolumeChangedEvent;
}(_fakeEvent.FakeEvent);

exports.VolumeChangedEvent = VolumeChangedEvent;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A simple multimap template.
 * @constructor
 * @struct
 * @template T
 */
var MultiMap = function () {

  /**
   * @constructor
   */
  function MultiMap() {
    _classCallCheck(this, MultiMap);

    /** @private {!Object.<string, !Array.<T>>} */
    this._map = new Map();
  }

  /**
   * Add a key, value pair to the map.
   * @param {string} key -
   * @param {T} value  -
   * @returns {void}
   */


  _createClass(MultiMap, [{
    key: "push",
    value: function push(key, value) {
      if (this._map.has(key)) {
        var list = this._map.get(key);
        if (Array.isArray(list)) {
          list.push(value);
          this._map.set(key, list);
        }
      } else {
        this._map.set(key, [value]);
      }
    }

    /**
     * Set an array of values for the key, overwriting any previous data.
     * @param {string} key -
     * @param {!Array.<T>} values -
     * @returns {void}
     */

  }, {
    key: "set",
    value: function set(key, values) {
      this._map.set(key, values);
    }

    /**
     * Check for a key.
     * @param {string} key -
     * @return {boolean} true if the key exists.
     */

  }, {
    key: "has",
    value: function has(key) {
      return this._map.has(key);
    }

    /**
     * Get a list of values by key.
     * @param {string} key -
     * @return {Array.<T>} or null if no suZch key exists.
     */

  }, {
    key: "get",
    value: function get(key) {
      var list = this._map.get(key);
      // slice() clones the list so that it and the map can each be modified
      // without affecting the other.
      return list ? list.slice() : [];
    }

    /**
     * Get a list of all values.
     * @returns {!Array.<T>} -
     */

  }, {
    key: "getAll",
    value: function getAll() {
      var list = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._map.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          list = list.concat(value);
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

      return list;
    }

    /**
     * Remove a specific value, if it exists.
     * @param {string} key -
     * @param {T} value -
     * @returns {void}
     */

  }, {
    key: "remove",
    value: function remove(key, value) {
      if (!this._map.has(key)) return;
      var list = this._map.get(key);
      if (Array.isArray(list)) {
        for (var i = 0; i < list.length; ++i) {
          if (list[i] === value) {
            list.splice(i, 1);
            --i;
          }
        }
      }
    }

    /**
     * Gets all keys from the multimap.
     * @return {!Array.<string>} - The map keys.
     */

  }, {
    key: "keys",
    value: function keys() {
      return this._map.keys();
    }

    /**
     * Clear all keys and values from the multimap.
     * @returns {void}
     */

  }, {
    key: "clear",
    value: function clear() {
      this._map.clear();
    }
  }]);

  return MultiMap;
}();

exports.MultiMap = MultiMap;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(112)(undefined);
// imports


// module
exports.push([module.i, ".playkit-row {\n  display: block; }\n  .playkit-row:after {\n    content: '';\n    clear: both;\n    display: block; }\n\n.playkit-d-inline-block {\n  display: inline-block; }\n\n.playkit-mobile-hidden-select {\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0px;\n  width: 100%;\n  height: 100%; }\n\n.playkit-font-size-base {\n  font-size: 15px; }\n\n.playkit-player .playkit-form-group {\n  margin: 10px 0;\n  position: relative;\n  max-width: 100%; }\n  .playkit-player .playkit-form-group.playkit-has-error .playkit-form-control {\n    border-color: #db1f26; }\n    .playkit-player .playkit-form-group.playkit-has-error .playkit-form-control:focus {\n      border-color: #fff; }\n  .playkit-player .playkit-form-group.playkit-has-icon .playkit-form-control {\n    padding-left: 34px; }\n  .playkit-player .playkit-form-group .playkit-icon {\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    width: 32px;\n    height: 32px;\n    fill: rgba(255, 255, 255, 0.4); }\n\n.playkit-player .playkit-form-control {\n  height: 36px;\n  width: 100%;\n  min-width: 72px;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  background-color: rgba(0, 0, 0, 0.4);\n  font-size: 15px;\n  line-height: 18px;\n  color: #fff;\n  padding: 8px 10px;\n  text-overflow: ellipsis; }\n  .playkit-player .playkit-form-control::-webkit-input-placeholder {\n    color: rgba(255, 255, 255, 0.6); }\n  .playkit-player .playkit-form-control:focus {\n    background-color: #fff;\n    border-color: #fff;\n    color: #333; }\n    .playkit-player .playkit-form-control:focus::-webkit-input-placeholder {\n      color: #ccc; }\n    .playkit-player .playkit-form-control:focus + .playkit-icon {\n      fill: #999; }\n\n.playkit-player textarea.playkit-form-control {\n  min-height: 72px; }\n\n.playkit-player select {\n  font-size: 15px;\n  font-family: sans-serif;\n  color: #fff;\n  -webkit-appearance: none;\n  border: 0;\n  background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23FFFFFF' viewBox='0 0 1024 1024'><path d='M301.255 338.745c-24.994-24.994-65.516-24.994-90.51 0s-24.994 65.516 0 90.51l256 256c24.994 24.994 65.516 24.994 90.51 0l256-256c24.994-24.994 24.994-65.516 0-90.51s-65.516-24.994-90.51 0l-210.745 210.745-210.745-210.745z' /></svg>\") no-repeat;\n  background-size: 16px;\n  background-position: 100% center;\n  background-repeat: no-repeat;\n  padding-right: 24px; }\n\n.playkit-checkbox {\n  font-size: 15px;\n  position: relative; }\n  .playkit-checkbox input {\n    display: none; }\n  .playkit-checkbox label:before {\n    height: 16px;\n    width: 16px;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    border-radius: 4px;\n    background-color: rgba(0, 0, 0, 0.4);\n    margin-right: 8px;\n    display: inline-block;\n    content: '';\n    vertical-align: middle; }\n  .playkit-checkbox input:checked + label:before {\n    border: 1px solid #fff;\n    background: #fff; }\n\n.playkit-form-group-row {\n  font-size: 15px;\n  margin: 24px 0; }\n  .playkit-form-group-row:after {\n    clear: both;\n    content: ' ';\n    display: block; }\n  .playkit-form-group-row label {\n    float: left;\n    color: rgba(244, 244, 244, 0.8); }\n  .playkit-form-group-row .playkit-dropdown {\n    float: right; }\n\n.playkit-btn {\n  text-decoration: none;\n  height: 36px;\n  border-radius: 18px;\n  color: #fff;\n  line-height: 36px;\n  font-weight: bold;\n  cursor: pointer;\n  display: inline-block;\n  padding: 0 24px; }\n  .playkit-btn.playkit-btn-block {\n    display: block; }\n  .playkit-btn.playkit-btn-dark-transparent {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px solid rgba(255, 255, 255, 0.2);\n    line-height: 32px; }\n    .playkit-btn.playkit-btn-dark-transparent:hover {\n      color: #fff;\n      border: 2px solid rgba(255, 255, 255, 0.4); }\n  .playkit-btn.playkit-btn-branded {\n    background-color: #01ACCD; }\n    .playkit-btn.playkit-btn-branded:hover {\n      color: #fff; }\n\n.playkit-btn-rounded {\n  height: 36px;\n  width: 36px;\n  min-width: 36px;\n  min-height: 36px;\n  border-radius: 18px;\n  background-color: rgba(0, 0, 0, 0.4);\n  display: inline-block;\n  padding: 2px; }\n\n.playkit-icon {\n  display: inline-block;\n  font-size: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: 50% 50%; }\n\n.playkit-icon-maximize {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M800 269.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' /%3E %3Cpath fill='%23fff' d='M224 754.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-minimize {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M672 306.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' /%3E%3Cpath fill='%23fff' d='M352 717.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-play {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M796.806 461.202c44.919 28.075 44.739 73.706 0 101.668l-459.472 287.171c-44.919 28.075-81.334 7.915-81.334-45.305v-585.4c0-53.096 36.595-73.266 81.334-45.305l459.472 287.171z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-pause {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M256 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314zM640 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-base {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M128 416v192h96v-192h-96zM64 383.853c0-17.592 14.012-31.853 32.094-31.853h159.813c17.725 0 32.094 14.581 32.094 31.853v256.295c0 17.592-14.012 31.853-32.094 31.853h-159.813c-17.725 0-32.094-14.581-32.094-31.853v-256.295z' /%3E%3Cpath fill='%23fff' d='M288 634.342l160 88.889v-422.462l-160 88.889v244.684zM224 352l231.787-128.771c31.046-17.248 56.213-2.487 56.213 32.476v512.589c0 35.184-25.054 49.786-56.213 32.476l-231.787-128.771v-320z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-waves {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M802.017 837.177c82.359-86.627 129.183-201.774 129.183-324.26 0-123.976-47.976-240.409-132.127-327.329-12.293-12.697-32.552-13.025-45.249-0.732s-13.025 32.552-0.732 45.249c72.692 75.084 114.109 175.597 114.109 282.812 0 105.928-40.422 205.331-111.566 280.162-12.177 12.808-11.666 33.063 1.143 45.24s33.063 11.666 45.24-1.143z' /%3E%3Cpath fill='%23fff' d='M667.436 743.221c67.761-60.884 107.273-147.888 107.273-241.233 0-87.318-34.552-169.203-94.836-229.446-12.501-12.493-32.762-12.486-45.255 0.015s-12.486 32.762 0.015 45.255c48.375 48.342 76.075 113.989 76.075 184.176 0 75.021-31.679 144.776-86.048 193.627-13.146 11.812-14.227 32.044-2.416 45.19s32.044 14.227 45.19 2.416z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-wave {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M667.436 743.221c67.761-60.884 107.273-147.888 107.273-241.233 0-87.318-34.552-169.203-94.836-229.446-12.501-12.493-32.762-12.486-45.255 0.015s-12.486 32.762 0.015 45.255c48.375 48.342 76.075 113.989 76.075 184.176 0 75.021-31.679 144.776-86.048 193.627-13.146 11.812-14.227 32.044-2.416 45.19s32.044 14.227 45.19 2.416z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-mute {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M768 466.745l-67.986-67.986c-12.213-12.213-32.654-12.393-45.151 0.104-12.584 12.584-12.543 32.711-0.104 45.151l67.986 67.986-67.986 67.986c-12.213 12.213-12.393 32.654 0.104 45.151 12.584 12.584 32.711 12.543 45.151 0.104l67.986-67.986 67.986 67.986c12.213 12.213 32.654 12.393 45.151-0.104 12.584-12.584 12.543-32.711 0.104-45.151l-67.986-67.986 67.986-67.986c12.213-12.213 12.393-32.654-0.104-45.151-12.584-12.584-32.711-12.543-45.151-0.104l-67.986 67.986z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-close {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M573.162 512l214.269-214.269c16.772-16.772 16.688-44.071-0.202-60.96-17.007-17.007-44.182-16.98-60.96-0.202l-214.269 214.269-214.269-214.269c-16.772-16.772-44.071-16.688-60.96 0.202-17.007 17.007-16.98 44.182-0.202 60.96l214.269 214.269-214.269 214.269c-16.772 16.772-16.688 44.071 0.202 60.96 17.007 17.007 44.182 16.98 60.96 0.202l214.269-214.269 214.269 214.269c16.772 16.772 44.071 16.688 60.96-0.202 17.007-17.007 16.98-44.182 0.202-60.96l-214.269-214.269z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-share {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M318.641 446.219l236.155-142.257c-0.086-1.754-0.129-3.52-0.129-5.295 0-58.91 47.756-106.667 106.667-106.667s106.667 47.756 106.667 106.667c0 58.91-47.756 106.667-106.667 106.667-33.894 0-64.095-15.808-83.633-40.454l-236.467 142.445c-0.132-3.064-0.394-6.095-0.779-9.087l7.271-12.835-0.117 53.333-7.183-12.743c0.399-3.046 0.67-6.131 0.806-9.252l236.467 142.383c19.538-24.648 49.741-40.457 83.636-40.457 58.91 0 106.667 47.756 106.667 106.667s-47.756 106.667-106.667 106.667c-58.91 0-106.667-47.756-106.667-106.667 0-1.775 0.043-3.539 0.129-5.293l-236.19-142.216c-19.528 24.867-49.868 40.841-83.939 40.841-58.91 0-106.667-47.756-106.667-106.667s47.756-106.667 106.667-106.667c34.091 0 64.447 15.993 83.974 40.886zM234.667 554.667c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 341.333c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 768c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-settings {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M803.451 546.033c2.552-22.107 2.552-44.408 0.246-64.81-1.084-6.208-6.499-10.721-12.535-10.671-30.286 0.533-57.727-17.773-68.866-45.941s-3.64-60.291 18.795-80.593c3.935-3.569 4.416-9.583 0.92-13.959-13.595-17.35-29.146-33.073-46.311-46.83-4.23-3.38-10.359-2.886-14.783 1.966-14.421 14.721-34.212 22.938-54.434 22.761-9.009 0.041-17.942-1.652-26.865-5.212-28.414-11.992-46.226-40.546-44.49-71.542 0.335-5.319-3.547-9.972-8.785-10.588-21.926-2.538-44.068-2.595-65.961-0.176-5.349 0.6-9.341 5.207-9.175 10.514 1.027 30.384-16.802 58.251-45.764 70.431-8.238 3.138-16.993 4.701-25.207 4.609-20.599 0.206-40.395-7.982-55.482-23.363-2.014-2.187-4.849-3.435-7.553-3.445-2.441 0.015-4.811 0.83-6.513 2.139-17.541 13.798-33.455 29.547-47.262 46.729-3.418 4.337-2.922 10.575 0.97 14.162 22.816 20.692 30.19 53.479 17.807 83.351-13.035 27.396-41.135 44.394-71.446 43.222-5.112-0.197-9.499 3.606-10.086 9.179-2.673 22.023-2.673 44.289-0.212 64.867 1.080 6.27 6.559 10.824 13.309 10.737l2.225 0.006c28.935 0.604 54.726 18.391 65.634 45.374 11.22 28.205 3.921 60.407-18.565 81.204-3.866 3.509-4.341 9.418-0.895 13.742 13.545 17.354 29.027 33.106 46.042 46.867 4.303 3.449 10.547 2.954 14.986-1.907 14.414-14.76 34.226-23.001 54.43-22.82 9.070-0.052 18.063 1.668 27.041 5.299 28.19 12.071 45.891 40.41 44.347 71.468-0.342 5.312 3.536 9.962 8.802 10.578 21.915 2.548 44.049 2.605 65.929 0.176 5.364-0.604 9.364-5.227 9.191-10.598-0.997-30.358 16.84-58.183 45.452-70.201 8.263-3.256 17.070-4.908 25.521-4.865 20.676-0.206 40.533 8.070 55.398 23.38 2.039 2.195 4.898 3.446 7.673 3.455 2.268-0.011 4.468-0.776 6.321-2.228 17.625-13.724 33.599-29.444 47.415-46.611 3.426-4.348 2.928-10.6-0.863-14.097-22.358-20.082-30.057-51.85-19.372-79.939s37.55-46.71 67.745-46.857h5.229c5.12-0.026 9.413-3.875 9.996-8.962zM861.733 552.735c-3.961 34.572-33.157 60.748-68.129 60.926h-5.235c-5.803 0.028-10.991 3.624-13.054 9.048s-0.577 11.558 4.020 15.69c26.602 24.519 29.853 65.381 7.275 94.034-16.847 20.934-36.063 39.845-57.197 56.302-12.034 9.427-26.861 14.584-42.368 14.658-19.254-0.051-37.623-8.090-50.269-21.718-3.221-3.315-7.66-5.165-12.712-5.118-1.425-0.007-2.839 0.258-3.554 0.532-5.581 2.346-9.136 7.892-8.937 13.966 1.152 35.958-25.509 66.771-61.307 70.804-26.332 2.923-52.909 2.854-79.246-0.208-36.286-4.245-62.897-36.157-60.576-72.186 0.304-6.123-3.235-11.788-8.302-13.964-1.328-0.536-2.748-0.808-4.606-0.8-4.651-0.041-9.118 1.817-11.635 4.367-24.544 27.036-65.886 30.311-94.481 7.394-20.587-16.65-39.207-35.595-55.308-56.226-22.552-28.277-19.261-69.208 7.317-93.334 4.474-4.138 5.939-10.604 3.748-16.115-2.052-5.076-6.932-8.442-11.794-8.55-36.436 0.464-66.759-24.741-72.949-60.89-3.243-26.718-3.243-53.731-0.055-79.964 3.744-35.827 34.642-62.605 70.642-61.219 6.877 0.266 13.251-3.59 15.584-8.401 2.309-5.59 0.861-12.028-3.789-16.247-26.603-24.51-29.856-65.368-7.293-93.994 16.767-20.868 35.856-39.76 57.129-56.491 12.099-9.322 26.921-14.42 42.463-14.513 19.308 0.059 37.717 8.166 50.145 21.684 3.263 3.322 7.737 5.172 12.994 5.126 1.471 0.015 2.933-0.245 3.363-0.39 5.601-2.359 9.165-7.93 8.957-14.077-1.126-35.941 25.542-66.721 61.322-70.731 26.322-2.909 52.889-2.84 79.251 0.212 36.244 4.265 62.828 36.125 60.546 72.343-0.339 6.047 3.159 11.654 8.186 13.782 1.381 0.55 2.855 0.829 4.726 0.823 4.663 0.040 9.142-1.819 11.615-4.312 24.439-26.99 65.656-30.312 94.137-7.557 20.721 16.607 39.456 35.549 55.655 56.225 22.667 28.35 19.38 69.439-7.531 93.846-4.33 3.918-5.776 10.112-3.628 15.542s7.438 8.96 13.543 8.854c34.999-0.298 65.076 24.766 71.337 60.925 3.065 26.552 3.065 53.368 0 79.92zM511.956 589.951c43.215-0.108 78.137-35.17 78.072-78.385 0-31.732-19.132-60.334-48.461-72.448s-63.068-5.35-85.461 17.133c-22.393 22.483-29.022 56.249-16.791 85.529s40.909 48.298 72.641 48.171zM512.146 648.617c-55.438 0.221-105.58-33.029-126.965-84.224s-9.796-110.233 29.358-149.543c39.153-39.31 98.144-51.136 149.424-29.956s84.731 71.189 84.732 126.627c0.114 75.549-60.999 136.907-136.548 137.096z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-check {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M342.481 563.894c-12.577-12.416-32.838-12.285-45.254 0.292s-12.285 32.838 0.292 45.254l118.857 117.333c13.275 13.105 34.901 12.123 46.933-2.131l297.143-352c11.4-13.505 9.694-33.694-3.811-45.094s-33.694-9.694-45.094 3.811l-274.828 325.566-94.238-93.030z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-language {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 800c159.058 0 288-128.942 288-288s-128.942-288-288-288c-159.058 0-288 128.942-288 288s128.942 288 288 288zM512 864c-194.404 0-352-157.596-352-352s157.596-352 352-352c194.404 0 352 157.596 352 352s-157.596 352-352 352z' /%3E%3Cpath fill='%23fff' d='M441.231 173.324c-76.632 84.62-121.231 207.208-121.231 338.676 0 134.304 46.556 259.282 126.083 343.936l46.646-43.82c-68.041-72.429-108.728-181.651-108.728-300.116 0-116.001 39.001-223.203 104.669-295.716l-47.438-42.96z' /%3E%3Cpath fill='%23fff' d='M584.297 173.324c76.632 84.62 121.231 207.208 121.231 338.676 0 134.304-46.556 259.282-126.083 343.936l-46.646-43.82c68.041-72.429 108.728-181.651 108.728-300.116 0-116.001-39.001-223.203-104.669-295.716l47.438-42.96z' /%3E%3Cpath fill='%23fff' d='M840.432 419.786c-81.65-22.637-200.551-35.786-328.432-35.786-128.056 0-247.103 13.185-328.758 35.876l17.136 61.663c75.47-20.972 188.938-33.539 311.622-33.539 122.521 0 235.854 12.533 311.334 33.459l17.099-61.674z' /%3E%3Cpath fill='%23fff' d='M840.432 605.754c-81.65 22.637-200.551 35.786-328.432 35.786-128.056 0-247.103-13.185-328.758-35.876l17.136-61.663c75.47 20.972 188.938 33.539 311.622 33.539 122.521 0 235.854-12.533 311.334-33.459l17.099 61.674z' /%3E%3Cpath fill='%23fff' d='M480 192h64v640h-64v-640z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-quality {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M159.904 192h288.234c17.277 0 31.862 14.323 31.862 31.992 0 17.792-14.261 31.993-31.853 31.994l-288.147 0.014v544.174c-0.017-0.18 704-0.174 704-0.174v-128.006c0-17.795 14.327-31.994 32-31.994 17.796 0 32 14.34 32 32.029v128.145c0 35.25-28.639 63.826-63.904 63.826h-704.192c-35.293 0-63.904-28.875-63.904-63.826v-544.348c0-35.25 28.639-63.826 63.904-63.826zM501.818 378.182c108.449 0 196.364-87.915 196.364-196.364 0-29.091 43.636-29.091 43.636 0 0 108.449 87.915 196.364 196.364 196.364 29.091 0 29.091 43.636 0 43.636-108.449 0-196.364 87.915-196.364 196.364 0 29.091-43.636 29.091-43.636 0 0-108.449-87.915-196.364-196.364-196.364-29.091 0-29.091-43.636 0-43.636z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-captions {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M160 771.213c-0.017-0.172 704-0.166 704-0.166v-518.261c0.017 0.172-704 0.166-704 0.166v518.261zM96 252.787c0-33.572 28.639-60.787 63.904-60.787h704.192c35.293 0 63.904 27.5 63.904 60.787v518.427c0 33.572-28.639 60.787-63.904 60.787h-704.192c-35.293 0-63.904-27.5-63.904-60.787v-518.427z' /%3E%3Cpath fill='%23fff' d='M490.583 568.655c0 7.729-2.311 15.987-6.933 24.777s-11.668 17.162-21.14 25.118c-9.471 7.956-21.405 14.358-35.801 19.208s-30.611 7.274-48.644 7.274c-38.34 0-68.268-11.176-89.787-33.528s-32.278-52.319-32.278-89.901c0-25.459 4.925-47.962 14.775-67.511s24.095-34.665 42.734-45.348c18.639-10.684 40.916-16.025 66.829-16.025 16.063 0 30.8 2.349 44.212 7.047s24.777 10.759 34.096 18.185c9.32 7.425 16.442 15.343 21.367 23.754s7.388 16.253 7.388 23.527c0 7.425-2.766 13.714-8.297 18.867s-12.237 7.729-20.117 7.729c-5.152 0-9.433-1.326-12.843-3.978s-7.236-6.933-11.479-12.843c-7.577-11.517-15.495-20.155-23.754-25.913s-18.753-8.638-31.482-8.638c-18.336 0-33.111 7.16-44.325 21.481s-16.821 33.907-16.821 58.759c0 11.669 1.44 22.39 4.319 32.164s7.047 18.109 12.502 25.004c5.455 6.895 12.047 12.123 19.776 15.684s16.215 5.342 25.459 5.342c12.426 0 23.072-2.879 31.937-8.638s16.707-14.548 23.527-26.368c3.789-6.971 7.88-12.426 12.275-16.366s9.774-5.91 16.139-5.91c7.577 0 13.866 2.879 18.867 8.638s7.501 11.896 7.501 18.412zM767.219 568.655c0 7.729-2.311 15.987-6.933 24.777s-11.668 17.162-21.14 25.118c-9.471 7.956-21.405 14.358-35.801 19.208s-30.611 7.274-48.644 7.274c-38.34 0-68.268-11.176-89.787-33.528s-32.278-52.319-32.278-89.901c0-25.459 4.925-47.962 14.775-67.511s24.095-34.665 42.734-45.348c18.639-10.684 40.916-16.025 66.829-16.025 16.063 0 30.8 2.349 44.212 7.047s24.777 10.759 34.096 18.185c9.32 7.425 16.442 15.343 21.367 23.754s7.388 16.253 7.388 23.527c0 7.425-2.766 13.714-8.297 18.867s-12.237 7.729-20.117 7.729c-5.152 0-9.433-1.326-12.843-3.978s-7.236-6.933-11.479-12.843c-7.577-11.517-15.495-20.155-23.754-25.913s-18.753-8.638-31.482-8.638c-18.336 0-33.111 7.16-44.325 21.481s-16.821 33.907-16.821 58.759c0 11.669 1.44 22.39 4.319 32.164s7.047 18.109 12.502 25.004c5.455 6.895 12.047 12.123 19.776 15.684s16.215 5.342 25.459 5.342c12.426 0 23.072-2.879 31.937-8.638s16.707-14.548 23.527-26.368c3.789-6.971 7.88-12.426 12.275-16.366s9.774-5.91 16.139-5.91c7.577 0 13.866 2.879 18.867 8.638s7.501 11.896 7.501 18.412z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-speed {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 832c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM480.239 643.971c-0.158-1.272-0.239-2.566-0.239-3.876v-192.19c0-17.621 14.204-31.905 32-31.905 17.673 0 32 14.497 32 31.905v192.19c0 1.313-0.079 2.607-0.232 3.878 55.325 14.128 96.232 64.301 96.232 124.027 0 70.692-57.308 128-128 128s-128-57.308-128-128c0-59.729 40.91-109.903 96.239-124.029zM928 576c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-194.404-157.596-352-352-352s-352 157.596-352 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-229.75 186.25-416 416-416s416 186.25 416 416z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-speed-down {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM401.852 670.758c-1.056-0.826-2.077-1.728-3.055-2.706l-113.005-113.005c-12.533-12.533-12.65-32.737-0.066-45.321 12.497-12.497 32.536-12.719 45.321 0.066l113.005 113.005c0.976 0.976 1.876 1.998 2.701 3.059 19.106-11.343 41.416-17.855 65.248-17.855 70.692 0 128 57.308 128 128s-57.308 128-128 128c-70.692 0-128-57.308-128-128 0-23.829 6.511-46.137 17.852-65.242zM928 576c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-194.404-157.596-352-352-352s-352 157.596-352 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-229.75 186.25-416 416-416s416 186.25 416 416z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-speed-up {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM546.516 612.708c0.524-1.23 1.129-2.446 1.819-3.64l79.906-138.402c8.862-15.35 28.348-20.692 43.76-11.794 15.305 8.837 20.707 28.135 11.666 43.794l-79.906 138.402c-0.693 1.201-1.451 2.34-2.268 3.416 23.761 23.238 38.508 55.655 38.508 91.516 0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 11.959 0 23.535 1.64 34.516 4.708zM928 576c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-194.404-157.596-352-352-352s-352 157.596-352 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-229.75 186.25-416 416-416s416 186.25 416 416z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-audio {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M768 625.124v-354.531l-352 135.385v330.022c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 23.314 0 45.173 6.233 64 17.124v-241.124c0-13.241 8.155-25.114 20.513-29.867l416-160c20.96-8.062 43.487 7.41 43.487 29.867v512c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 23.314 0 45.173 6.233 64 17.124zM288 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM704 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-copy {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M703.727 320c35.497 0 64.273 28.482 64.273 64.003v351.993c0 35.348-28.862 64.003-64.273 64.003h-191.454c-35.496 0-64.271-28.48-64.273-64.001l255.727 0.001v-352c0 0-28.356 0.147-63.727 0.001v-63.912l63.727-0.088zM256 288.187c0-35.45 28.398-64.187 63.988-64.187h192.025c35.339 0 63.988 28.706 63.988 64.187v319.625c0 35.45-28.398 64.187-63.988 64.187h-192.025c-35.339 0-63.988-28.706-63.988-64.187v-319.625zM320 288v320h192v-320h-192z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-facebook {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M432 405.333h-80v106.667h80v320h133.333v-320h97.12l9.547-106.667h-106.667v-44.453c0-25.467 5.12-35.547 29.733-35.547h76.933v-133.333h-101.547c-95.893 0-138.453 42.213-138.453 123.067v90.267z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-twitter {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M832 316.614c-23.547 10.29-48.853 17.221-75.413 20.345 27.12-15.987 47.947-41.319 57.733-71.508-25.36 14.806-53.467 25.568-83.387 31.37-23.92-25.122-58.080-40.82-95.84-40.82-84.773 0-147.067 77.861-127.92 158.687-109.093-5.381-205.84-56.833-270.613-135.035-34.4 58.094-17.84 134.090 40.613 172.574-21.493-0.683-41.76-6.484-59.44-16.171-1.44 59.879 42.16 115.898 105.307 128.368-18.48 4.935-38.72 6.090-59.307 2.205 16.693 51.347 65.173 88.702 122.667 89.752-55.2 42.605-124.747 61.637-194.4 53.552 58.107 36.673 127.147 58.067 201.28 58.067 243.787 0 381.52-202.684 373.2-384.473 25.653-18.244 47.92-41.004 65.52-66.914v0z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-google-plus {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M352 556.8h127.040c-5.12 32.928-38.4 96.64-127.040 96.64-76.48 0-138.88-63.328-138.88-141.44 0-78.080 62.4-141.44 138.88-141.44 43.52 0 72.64 18.56 89.28 34.56l60.8-58.56c-39.040-36.48-89.6-58.56-150.080-58.56-123.84 0-224 100.16-224 224s100.16 224 224 224c129.28 0 215.072-90.88 215.072-218.88 0-14.72-1.632-25.92-3.552-37.12h-211.52v76.8zM800 544v96h-64v-96h-96v-64h96v-96h64v96h96v64h-96z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-linked-in {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M324.8 290.087c0 36.506-29.6 66.087-66.133 66.087s-66.133-29.581-66.133-66.087c0-36.48 29.6-66.087 66.133-66.087s66.133 29.607 66.133 66.087zM325.333 409.043h-133.333v422.957h133.333v-422.957zM538.187 409.043h-132.48v422.957h132.507v-222.026c0-123.45 160.773-133.549 160.773 0v222.026h133.013v-267.811c0-208.306-237.92-200.719-293.813-98.179v-56.967z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-email {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M256 768c-35.346 0-64-28.654-64-64v-352c0-35.346 28.654-64 64-64h512c35.346 0 64 28.654 64 64v352c0 35.346-28.654 64-64 64h-512zM512 467.488l147.52-115.488h-295.040l147.52 115.488zM748.48 352l-211.2 179.2c-0.713 1.308-1.572 2.532-2.56 3.648-12.707 12.158-32.733 12.158-45.44 0-0.988-1.116-1.847-2.34-2.56-3.648l-211.2-179.2h-19.52v352h512v-352h-19.52z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-embed {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M377.989 579.335c12.669 12.904 12.669 33.777 0 46.68-12.733 12.969-33.427 12.969-46.16 0l-104.727-106.667c-12.669-12.904-12.669-33.777 0-46.68l104.727-106.667c12.733-12.969 33.427-12.969 46.16 0 12.669 12.904 12.669 33.777 0 46.68l-81.812 83.327 81.812 83.327zM646.011 412.68c-12.669-12.904-12.669-33.777 0-46.68 12.733-12.969 33.427-12.969 46.16 0l104.727 106.667c12.669 12.904 12.669 33.777 0 46.68l-104.727 106.667c-12.733 12.969-33.427 12.969-46.16 0-12.669-12.904-12.669-33.777 0-46.68l81.812-83.327-81.812-83.327zM572.293 250.6c17.455 4.445 28.025 22.388 23.686 40.066l-104.727 426.669c-4.349 17.719-22.048 28.535-39.545 24.079-17.455-4.445-28.025-22.388-23.686-40.066l104.727-426.669c4.349-17.719 22.048-28.535 39.545-24.079z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-link {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M355.028 445.537c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-24.141-24.141c-49.92-49.92-49.832-130.999 0.094-180.925 49.984-49.984 130.995-50.025 180.955-0.064l113.266 113.266c49.964 49.964 49.935 130.955-0.064 180.955-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255c25.013-25.013 25.027-65.482 0.064-90.445l-113.266-113.266c-24.957-24.957-65.445-24.936-90.445 0.064-24.955 24.955-24.998 65.511-0.094 90.416l24.141 24.141zM668.972 578.463c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l24.141 24.141c49.92 49.92 49.832 130.999-0.094 180.925-49.984 49.984-130.995 50.025-180.955 0.064l-113.266-113.266c-49.964-49.964-49.935-130.955 0.064-180.955 12.497-12.497 32.758-12.497 45.255 0s12.497 32.758 0 45.255c-25.013 25.013-25.027 65.482-0.064 90.445l113.266 113.266c24.957 24.957 65.445 24.936 90.445-0.064 24.955-24.955 24.998-65.511 0.094-90.416l-24.141-24.141z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-arrow-down {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M301.255 338.745c-24.994-24.994-65.516-24.994-90.51 0s-24.994 65.516 0 90.51l256 256c24.994 24.994 65.516 24.994 90.51 0l256-256c24.994-24.994 24.994-65.516 0-90.51s-65.516-24.994-90.51 0l-210.745 210.745-210.745-210.745z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-start-over {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M255.271 339.053c94.182-126.513 270.298-165.203 410.222-84.418 150.758 87.040 202.411 279.813 115.371 430.571s-279.813 202.411-430.571 115.371c-61.424-35.463-107.948-89.4-134.169-153.673-7.677-18.818-29.156-27.85-47.974-20.173s-27.85 29.156-20.173 47.974c32.339 79.269 89.818 145.906 165.517 189.611 185.96 107.364 423.747 43.649 531.111-142.311s43.649-423.747-142.311-531.111c-172.433-99.554-389.428-52.014-505.682 103.69l-27.226-78.49c-6.66-19.202-27.626-29.368-46.828-22.708s-29.368 27.626-22.708 46.828l52.434 151.164c5.36 15.452 20.275 25.513 36.61 24.694l159.799-8.011c20.299-1.018 35.929-18.298 34.911-38.596s-18.298-35.929-38.596-34.911l-89.738 4.499z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-seek-forward {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' opacity='0.5' d='M765.529 323.053c-94.182-126.513-270.298-165.203-410.222-84.418-150.758 87.040-202.411 279.813-115.371 430.571s279.813 202.411 430.571 115.371c61.424-35.463 107.948-89.4 134.169-153.673 7.677-18.818 29.156-27.85 47.974-20.173s27.85 29.156 20.173 47.974c-32.339 79.269-89.818 145.906-165.517 189.611-185.96 107.364-423.747 43.649-531.111-142.311s-43.649-423.747 142.311-531.111c172.433-99.554 389.428-52.014 505.682 103.69l27.226-78.49c6.66-19.202 27.626-29.368 46.828-22.708s29.368 27.626 22.708 46.828l-52.434 151.164c-5.36 15.452-20.275 25.513-36.61 24.694l-159.799-8.011c-20.299-1.018-35.929-18.298-34.911-38.596s18.298-35.929 38.596-34.911l89.738 4.499z'/%3E%3Cpath fill='%23fff' d='M207.932 431.974c20.553-78.699 71.369-149.456 147.375-193.338 139.923-80.785 316.040-42.095 410.222 84.418l-89.738-4.499c-20.299-1.018-37.579 14.613-38.596 34.911s14.613 37.579 34.911 38.596l159.799 8.011c16.335 0.819 31.25-9.242 36.61-24.694l52.434-151.164c6.66-19.202-3.506-40.167-22.708-46.828s-40.167 3.506-46.828 22.708l-27.226 78.49c-116.254-155.703-333.248-203.244-505.682-103.69-91.184 52.645-152.976 136.648-179.618 230.523l69.044 26.555z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-seek-end {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M742.494 323.053c-94.182-126.513-270.298-165.203-410.222-84.418-150.758 87.040-202.411 279.813-115.371 430.571s279.813 202.411 430.571 115.371c61.424-35.463 107.948-89.4 134.169-153.673 7.677-18.818 29.156-27.85 47.974-20.173s27.85 29.156 20.173 47.974c-32.339 79.269-89.818 145.906-165.517 189.611-185.96 107.364-423.747 43.649-531.111-142.311s-43.649-423.747 142.311-531.111c172.433-99.554 389.428-52.014 505.682 103.69l27.226-78.49c6.66-19.202 27.626-29.368 46.828-22.708s29.368 27.626 22.708 46.828l-52.434 151.164c-5.36 15.452-20.275 25.513-36.61 24.694l-159.799-8.011c-20.299-1.018-35.929-18.298-34.911-38.596s18.298-35.929 38.596-34.911l89.738 4.499z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-rewind {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' opacity='0.5' d='M258.471 323.053c94.182-126.513 270.298-165.203 410.222-84.418 150.758 87.040 202.411 279.813 115.371 430.571s-279.813 202.411-430.571 115.371c-61.424-35.463-107.948-89.4-134.169-153.673-7.677-18.818-29.156-27.85-47.974-20.173s-27.85 29.156-20.173 47.974c32.339 79.269 89.818 145.906 165.517 189.611 185.96 107.364 423.747 43.649 531.111-142.311s43.649-423.747-142.311-531.111c-172.433-99.554-389.428-52.014-505.682 103.69l-27.226-78.49c-6.66-19.202-27.626-29.368-46.828-22.708s-29.368 27.626-22.708 46.828l52.434 151.164c5.36 15.452 20.275 25.513 36.61 24.694l159.799-8.011c20.299-1.018 35.929-18.298 34.911-38.596s-18.298-35.929-38.596-34.911l-89.738 4.499z'%3E%3C/path%3E%3Cpath fill='%23fff' d='M816.068 431.974c-20.553-78.699-71.369-149.456-147.375-193.338-139.923-80.785-316.040-42.095-410.222 84.418l89.738-4.499c20.299-1.018 37.579 14.613 38.596 34.911s-14.613 37.579-34.911 38.596l-159.799 8.011c-16.335 0.819-31.25-9.242-36.61-24.694l-52.434-151.164c-6.66-19.202 3.506-40.167 22.708-46.828s40.167 3.506 46.828 22.708l27.226 78.49c116.254-155.703 333.248-203.244 505.682-103.69 91.184 52.645 152.976 136.648 179.618 230.523l-69.044 26.555z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n.playkit-icon-rewind-10 {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M258.471 323.053c94.182-126.513 270.298-165.203 410.222-84.418 150.758 87.040 202.411 279.813 115.371 430.571s-279.813 202.411-430.571 115.371c-61.424-35.463-107.948-89.4-134.169-153.673-7.677-18.818-29.156-27.85-47.974-20.173s-27.85 29.156-20.173 47.974c32.339 79.269 89.818 145.906 165.517 189.611 185.96 107.364 423.747 43.649 531.111-142.311s43.649-423.747-142.311-531.111c-172.433-99.554-389.428-52.014-505.682 103.69l-27.226-78.49c-6.66-19.202-27.626-29.368-46.828-22.708s-29.368 27.626-22.708 46.828l52.434 151.164c5.36 15.452 20.275 25.513 36.61 24.694l159.799-8.011c20.299-1.018 35.929-18.298 34.911-38.596s-18.298-35.929-38.596-34.911l-89.738 4.499z'%3E%3C/path%3E%3Cpath fill='%23fff' d='M413.327 636.083h67.358v-252.083h-48.527c-2.173 7.358-4.949 13.589-8.329 18.693s-7.726 9.139-13.037 12.106c-5.311 2.967-11.709 5.103-19.193 6.409s-16.417 1.958-26.798 1.958v41.302h48.527v171.616zM596.807 554.192c0 17.803 1.569 29.849 4.708 36.139s8.208 9.435 15.21 9.435c7.001 0 12.071-3.145 15.21-9.435s4.708-18.336 4.708-36.139v-83.316c0-17.803-1.569-29.849-4.708-36.139s-8.208-9.435-15.21-9.435c-7.001 0-12.071 3.145-15.21 9.435s-4.708 18.336-4.708 36.139v83.316zM529.449 512.534c0-25.398 1.75-46.405 5.251-63.021s8.812-29.789 15.934-39.522c7.122-9.732 16.176-16.497 27.16-20.295s23.962-5.697 38.93-5.697c14.969 0 27.945 1.899 38.93 5.697s20.038 10.563 27.16 20.295c7.122 9.732 12.433 22.906 15.934 39.522s5.251 37.622 5.251 63.021c0 25.636-1.75 46.702-5.251 63.199s-8.812 29.552-15.934 39.166c-7.122 9.613-16.176 16.2-27.16 19.761s-23.962 5.341-38.93 5.341c-14.969 0-27.945-1.78-38.93-5.341s-20.038-10.147-27.16-19.761c-7.122-9.613-12.433-22.668-15.934-39.166s-5.251-37.563-5.251-63.199z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n.playkit-icon-vr-stereo {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M864 255.996c53.019 0 96 42.981 96 96v384.004c0 53.019-42.981 96-96 96h-219.764c-33.721 0-64.97-17.693-82.319-46.608l-49.917-83.195-49.917 83.195c-17.349 28.916-48.598 46.608-82.319 46.608h-219.764c-53.019 0-96-42.981-96-96v-384.003c0-53.019 42.981-96 96-96h704zM128 351.997v384.003c0 17.673 14.327 32 32 32h219.764c11.24 0 21.657-5.898 27.44-15.536l49.917-83.195c5.405-9.008 12.944-16.547 21.952-21.952 30.309-18.185 69.622-8.357 87.807 21.952l49.917 83.195c5.783 9.639 16.199 15.536 27.44 15.536h219.764c17.673 0 32-14.327 32-32v-384.004c0-17.673-14.327-32-32-32h-704c-17.673 0-32 14.327-32 32zM304 624c-44.183 0-80-35.817-80-80s35.817-80 80-80c44.183 0 80 35.817 80 80s-35.817 80-80 80zM720 624c-44.183 0-80-35.817-80-80s35.817-80 80-80c44.183 0 80 35.817 80 80s-35.817 80-80 80z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n.playkit-icon-vr-stereo-full {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%2301ACCD' d='M864 255.996c53.019 0 96 42.981 96 96v384.004c0 53.019-42.981 96-96 96h-219.764c-33.721 0-64.97-17.693-82.319-46.608l-49.917-83.195-49.917 83.195c-17.349 28.916-48.598 46.608-82.319 46.608h-219.764c-53.019 0-96-42.981-96-96v-384.003c0-53.019 42.981-96 96-96h704zM304 624c44.183 0 80-35.817 80-80s-35.817-80-80-80c-44.183 0-80 35.817-80 80s35.817 80 80 80zM720 624c44.183 0 80-35.817 80-80s-35.817-80-80-80c-44.183 0-80 35.817-80 80s35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n@keyframes playkit-openDropmenu {\n  from {\n    opacity: 0;\n    transform: translateY(10px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.playkit-dropdown {\n  position: relative;\n  font-size: 15px; }\n  .playkit-dropdown.playkit-active .playkit-dropdown-menu {\n    display: block;\n    opacity: 1; }\n  .playkit-dropdown.playkit-active .playkit-dropdown-button .playkit-icon {\n    transform: rotate(180deg); }\n  .playkit-dropdown .playkit-dropdown-button {\n    font-weight: bold;\n    line-height: 18px;\n    color: #fff;\n    cursor: pointer;\n    padding-left: 20px; }\n    .playkit-dropdown .playkit-dropdown-button .playkit-icon {\n      width: 16px;\n      height: 16px;\n      vertical-align: middle;\n      margin-left: 6px;\n      transition: 150ms transform;\n      will-change: transform; }\n\n.playkit-dropdown-menu {\n  display: block;\n  opacity: 1;\n  position: absolute;\n  background-color: #333333;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 6px 0;\n  z-index: 5;\n  animation: playkit-openDropmenu 100ms ease-out forwards;\n  max-height: 220px;\n  overflow-y: auto;\n  font-size: 15px;\n  text-align: left; }\n  .playkit-dropdown-menu.playkit-top {\n    margin-bottom: 10px;\n    bottom: 100%; }\n  .playkit-dropdown-menu.playkit-bottom {\n    margin-top: 10px;\n    top: 100%; }\n  .playkit-dropdown-menu.playkit-right {\n    left: 0; }\n  .playkit-dropdown-menu.playkit-left {\n    right: 0; }\n  .playkit-dropdown-menu .playkit-dropdown-menu-item {\n    padding: 2px 10px 2px 16px;\n    white-space: nowrap;\n    min-height: 30px;\n    cursor: pointer; }\n    .playkit-dropdown-menu .playkit-dropdown-menu-item:hover {\n      color: #fff; }\n    .playkit-dropdown-menu .playkit-dropdown-menu-item.playkit-active {\n      color: #01ACCD; }\n      .playkit-dropdown-menu .playkit-dropdown-menu-item.playkit-active .playkit-icon-check {\n        background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%2301ACCD' d='M342.481 563.894c-12.577-12.416-32.838-12.285-45.254 0.292s-12.285 32.838 0.292 45.254l118.857 117.333c13.275 13.105 34.901 12.123 46.933-2.131l297.143-352c11.4-13.505 9.694-33.694-3.811-45.094s-33.694-9.694-45.094 3.811l-274.828 325.566-94.238-93.030z' /%3E%3C/svg%3E\"); }\n    .playkit-dropdown-menu .playkit-dropdown-menu-item .playkit-icon-check {\n      display: inline-block;\n      margin-left: 16px;\n      vertical-align: middle;\n      width: 24px;\n      height: 24px; }\n    .playkit-dropdown-menu .playkit-dropdown-menu-item span {\n      vertical-align: middle;\n      line-height: 26px; }\n\n.playkit-player .playkit-control-button {\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  display: inline-block;\n  opacity: 0.8;\n  border: none;\n  padding: 0;\n  cursor: pointer; }\n  .playkit-player .playkit-control-button i {\n    width: 32px;\n    height: 32px; }\n  .playkit-player .playkit-control-button.playkit-active {\n    opacity: 1; }\n  .playkit-player .playkit-control-button.playkit-control-button-rounded {\n    width: 36px;\n    height: 36px;\n    padding: 2px; }\n\n.playkit-player:not(.playkit-touch) .playkit-control-button:hover {\n  opacity: 1; }\n\n.playkit-player:not(.playkit-touch) .playkit-control-button.playkit-control-button-rounded:hover {\n  background-color: rgba(0, 0, 0, 0.4);\n  border-radius: 18px; }\n\n.playkit-player .playkit-control-button-container {\n  display: inline-block;\n  position: relative;\n  vertical-align: top; }\n\n.playkit-player.playkit-touch .playkit-player .playkit-control-button-container {\n  position: static; }\n\n.playkit-player.playkit-touch .playkit-control-button {\n  position: relative; }\n\n.playkit-rotate {\n  -moz-animation: playkit-spin .3s 1 linear;\n  -o-animation: playkit-spin .3s 1 linear;\n  -webkit-animation: playkit-spin .3s 1 linear;\n  animation: playkit-spin .3s 1 linear; }\n\n@-webkit-keyframes playkit-spin {\n  0% {\n    -webkit-transform: rotate(359deg); }\n  100% {\n    -webkit-transform: rotate(0deg); } }\n\n@-moz-keyframes playkit-spin {\n  0% {\n    -moz-transform: rotate(359deg); }\n  100% {\n    -moz-transform: rotate(0deg); } }\n\n@-o-keyframes playkit-spin {\n  0% {\n    -o-transform: rotate(359deg); }\n  100% {\n    -o-transform: rotate(0deg); } }\n\n@-ms-keyframes playkit-spin {\n  0% {\n    -ms-transform: rotate(359deg); }\n  100% {\n    -ms-transform: rotate(0deg); } }\n\n@keyframes playkit-spin {\n  0% {\n    transform: rotate(359deg); }\n  100% {\n    transform: rotate(0deg); } }\n\n.playkit-player a {\n  font-size: 15px;\n  line-height: 18px;\n  cursor: pointer; }\n  .playkit-player a:hover {\n    color: #01819a; }\n  .playkit-player a:active {\n    opacity: 0.7; }\n\n.playkit-player {\n  overflow: hidden;\n  user-select: none;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  outline: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent; }\n  .playkit-player:-webkit-full-screen {\n    width: 100%;\n    height: 100%;\n    max-width: none; }\n  .playkit-player * {\n    box-sizing: border-box;\n    outline: none; }\n  .playkit-player ::selection {\n    background-color: rgba(0, 0, 0, 0.1); }\n  .playkit-player video {\n    width: 100%; }\n  .playkit-player .playkit-player-gui {\n    opacity: 0;\n    overflow: hidden;\n    font-size: 0;\n    font-family: sans-serif; }\n    .playkit-player .playkit-player-gui label {\n      margin-bottom: initial; }\n    .playkit-player .playkit-player-gui input, .playkit-player .playkit-player-gui textarea {\n      font-family: sans-serif; }\n  .playkit-player #overlay-portal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n  .playkit-player.playkit-overlay-active #overlay-portal {\n    z-index: 11; }\n  .playkit-player.playkit-metadata-loaded .playkit-player-gui,\n  .playkit-player.playkit-state-paused .playkit-player-gui,\n  .playkit-player.playkit-overlay-active .playkit-player-gui,\n  .playkit-player.playkit-menu-active .playkit-player-gui {\n    opacity: 1; }\n\n.playkit-player.playkit-nav .playkit-control-button:focus,\n.playkit-player.playkit-nav .playkit-seek-bar:focus,\n.playkit-player.playkit-nav .playkit-dropdown-button:focus,\n.playkit-player.playkit-nav .playkit-smart-container-item:focus,\n.playkit-player.playkit-nav .playkit-dropdown-menu-item:focus,\n.playkit-player.playkit-nav .playkit-pre-playback-play-button:focus,\n.playkit-player.playkit-nav .playkit-sample:focus,\n.playkit-player.playkit-nav .playkit-custom-captions-applied > a:focus,\n.playkit-player.playkit-nav .playkit-form-group-row > a:focus,\n.playkit-player.playkit-nav .playkit-button-save-cvaa:focus,\n.playkit-player.playkit-nav .playkit-slider:focus,\n.playkit-player.playkit-nav .playkit-live-tag:focus {\n  outline: 1px solid #00cbff; }\n\n.playkit-player [id^=playkit-ads-container] {\n  transition: transform 100ms; }\n  .playkit-player [id^=playkit-ads-container][data-adtype=\"overlay\"] {\n    z-index: 1; }\n\n.playkit-player:not(.playkit-ad-break).playkit-metadata-loaded.playkit-hover [id^=playkit-ads-container],\n.playkit-player:not(.playkit-ad-break).playkit-metadata-loaded.playkit-state-paused [id^=playkit-ads-container] {\n  transform: translateY(-60px); }\n\nvideo {\n  left: 0; }\n  video::-webkit-media-controls-panel-container, video::-webkit-media-controls {\n    display: none !important;\n    -webkit-appearance: none; }\n  video::-webkit-media-controls-start-playback-button {\n    display: none !important;\n    -webkit-appearance: none; }\n\n.playkit-player video::-webkit-media-text-track-display {\n  transform: translateY(0px);\n  transition: ease-in 100ms; }\n\n.playkit-player.playkit-state-paused video::-webkit-media-text-track-display,\n.playkit-player.playkit-hover video::-webkit-media-text-track-display {\n  transform: translateY(-60px);\n  transition: ease-out 100ms; }\n\n.playkit-player.playkit-fullscreen.playkit-iOS video::-webkit-media-text-track-display {\n  transform: translateY(0px); }\n\n.playkit-player.playkit-overlay-active .playkit-subtitles {\n  display: none; }\n\n.playkit-player .playkit-subtitles {\n  transform: translateY(0px);\n  transition: ease-in 100ms; }\n\n.playkit-player:not(.playkit-overlay-active).playkit-state-paused .playkit-subtitles,\n.playkit-player:not(.playkit-overlay-active).playkit-hover .playkit-subtitles {\n  transform: translateY(-60px);\n  transition: ease-out 100ms; }\n\n.playkit-player:not(.playkit-overlay-active).playkit-fullscreen.playkit-iOS .playkit-subtitles {\n  transform: translateY(0px); }\n\n.playkit-video-player {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: black; }\n\n@keyframes playkit-openOverlay {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.playkit-overlay {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: none;\n  opacity: 0;\n  animation: playkit-openOverlay 100ms ease-in-out forwards;\n  z-index: 11; }\n  .playkit-overlay.playkit-active {\n    display: block;\n    opacity: 1; }\n  .playkit-overlay .playkit-overlay-contents {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.42);\n    z-index: 4;\n    text-align: center;\n    color: #fff;\n    padding: 60px 20px 30px 20px;\n    overflow-y: auto; }\n  .playkit-overlay .playkit-title {\n    font-size: 24px;\n    font-weight: bold;\n    line-height: 29px;\n    margin-bottom: 60px; }\n  .playkit-overlay .playkit-close-overlay {\n    position: absolute;\n    top: 48px;\n    right: 48px;\n    z-index: 5;\n    cursor: pointer; }\n    .playkit-overlay .playkit-close-overlay .playkit-icon-close {\n      width: 24px;\n      height: 24px; }\n  .playkit-overlay .playkit-overlay-screen {\n    display: none; }\n    .playkit-overlay .playkit-overlay-screen.playkit-active {\n      display: block; }\n\n.playkit-player.playkit-size-md .playkit-overlay .playkit-overlay-contents {\n  padding: 36px 20px; }\n\n.playkit-player.playkit-size-md .playkit-overlay .playkit-close-overlay {\n  top: 38px; }\n\n.playkit-player.playkit-size-md .playkit-overlay .playkit-title {\n  margin-bottom: 24px; }\n\n.playkit-player.playkit-size-sm .playkit-overlay .playkit-overlay-contents {\n  padding: 16px 24px; }\n\n.playkit-player.playkit-size-sm .playkit-overlay .playkit-close-overlay {\n  top: 15px;\n  right: 24px; }\n\n.playkit-player.playkit-size-sm .playkit-overlay .playkit-title {\n  font-size: 16px;\n  line-height: 19px;\n  margin-bottom: 24px; }\n\n@keyframes playkit-openSmartContainer {\n  from {\n    opacity: 0;\n    transform: translateY(10px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n@keyframes playkit-closeSmartContainer {\n  from {\n    opacity: 1;\n    transform: translateY(0); }\n  to {\n    opacity: 0;\n    transform: translateY(10px); } }\n\n.playkit-player:not(.playkit-touch) .playkit-smart-container {\n  background-color: #222222;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  position: absolute;\n  right: 0px;\n  min-width: 193px;\n  font-size: 15px;\n  z-index: 10;\n  display: block;\n  animation: playkit-openSmartContainer 100ms ease-out forwards; }\n  .playkit-player:not(.playkit-touch) .playkit-smart-container.playkit-leaving {\n    animation: playkit-closeSmartContainer 100ms ease-out forwards; }\n  .playkit-player:not(.playkit-touch) .playkit-smart-container.playkit-top {\n    bottom: 100%;\n    margin-bottom: 6px; }\n    .playkit-player:not(.playkit-touch) .playkit-smart-container.playkit-top:before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      bottom: -6px;\n      left: 0;\n      width: 100%;\n      height: 6px; }\n  .playkit-player:not(.playkit-touch) .playkit-smart-container.playkit-bottom {\n    top: 100%;\n    margin-top: 6px; }\n  .playkit-player:not(.playkit-touch) .playkit-smart-container.playkit-right {\n    left: 0px; }\n  .playkit-player:not(.playkit-touch) .playkit-smart-container.playkit-left {\n    right: 0px; }\n  .playkit-player:not(.playkit-touch) .playkit-smart-container .playkit-smart-container-item {\n    margin: 16px;\n    color: rgba(244, 244, 244, 0.8);\n    white-space: nowrap;\n    display: flex;\n    justify-content: space-between; }\n    .playkit-player:not(.playkit-touch) .playkit-smart-container .playkit-smart-container-item.playkit-select-menu-item label .playkit-label-icon {\n      display: none; }\n    .playkit-player:not(.playkit-touch) .playkit-smart-container .playkit-smart-container-item.playkit-select-menu-item .playkit-dropdown, .playkit-player:not(.playkit-touch) .playkit-smart-container .playkit-smart-container-item.playkit-select-menu-item select {\n      align-self: flex-end; }\n    .playkit-player:not(.playkit-touch) .playkit-smart-container .playkit-smart-container-item.playkit-select-menu-item .playkit-dropdown span {\n      max-width: 100px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: inline-block;\n      vertical-align: middle; }\n    .playkit-player:not(.playkit-touch) .playkit-smart-container .playkit-smart-container-item.playkit-select-menu-item select {\n      text-align-last: right; }\n\n.playkit-touch .playkit-smart-container-item {\n  width: 300px;\n  max-width: 100%;\n  margin: 16px auto;\n  color: rgba(244, 244, 244, 0.8);\n  white-space: nowrap;\n  text-align: left;\n  display: flex;\n  justify-content: space-between; }\n  .playkit-touch .playkit-smart-container-item.playkit-select-menu-item label {\n    font-size: 16px;\n    color: rgba(255, 255, 255, 0.8);\n    margin-right: 20px; }\n    .playkit-touch .playkit-smart-container-item.playkit-select-menu-item label .playkit-label-icon {\n      width: 24px;\n      height: 24px;\n      display: inline-block;\n      vertical-align: middle;\n      margin-right: 16px; }\n  .playkit-touch .playkit-smart-container-item.playkit-select-menu-item .playkit-dropdown, .playkit-touch .playkit-smart-container-item.playkit-select-menu-item select {\n    align-self: flex-end; }\n  .playkit-touch .playkit-smart-container-item.playkit-select-menu-item select {\n    text-align-last: right;\n    min-width: 1px;\n    line-height: 24px; }\n\n.playkit-overlay.playkit-share-overlay .playkit-share-icons {\n  margin: 60px 0; }\n  .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded {\n    margin: 0 8px;\n    transition: transform 100ms;\n    will-change: transform; }\n    .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded:first-child {\n      margin-left: 0; }\n    .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded:last-child {\n      margin-right: 0; }\n    .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded.playkit-facebook-share-btn {\n      background-color: #3B5998; }\n    .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded.playkit-twitter-share-btn {\n      background-color: #1DA1F2; }\n    .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded.playkit-google-plus-share-btn {\n      background-color: #DD4B39; }\n    .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded.playkit-linkedin-share-btn {\n      background-color: #00A0DC; }\n\n.playkit-share-main-container {\n  width: 300px;\n  max-width: 100%;\n  margin: 0 auto;\n  text-align: center; }\n\n.playkit-link-options-container {\n  width: 400px;\n  max-width: 100%;\n  text-align: left;\n  margin: 0 auto; }\n  .playkit-link-options-container .playkit-copy-url-row {\n    display: flex; }\n    .playkit-link-options-container .playkit-copy-url-row .playkit-input-copy-url {\n      margin: 0; }\n    .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url {\n      margin-left: 16px; }\n      .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url .playkit-icon {\n        will-change: transform;\n        transition: 100ms transform;\n        position: absolute;\n        width: 32px; }\n      .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url .playkit-icon-check {\n        transform: scale(0);\n        opacity: 0; }\n      .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url.playkit-copied {\n        background-color: #009444; }\n        .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url.playkit-copied .playkit-icon-copy {\n          transform: scale(0);\n          opacity: 0; }\n        .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url.playkit-copied .playkit-icon-check {\n          transform: scale(1);\n          opacity: 1; }\n  .playkit-link-options-container .playkit-video-start-options-row {\n    margin-top: 24px; }\n    .playkit-link-options-container .playkit-video-start-options-row .playkit-checkbox {\n      margin-right: 15px; }\n    .playkit-link-options-container .playkit-video-start-options-row .playkit-form-group {\n      margin: 0; }\n\n.playkit-player:not(.playkit-touch) .playkit-overlay.playkit-share-overlay .playkit-share-icons .playkit-btn-rounded:hover {\n  transform: scale(1.1667); }\n\n.playkit-player.playkit-size-md .playkit-overlay.playkit-share-overlay .playkit-share-icons {\n  margin: 40px 0; }\n\n.playkit-player.playkit-size-sm .playkit-overlay.playkit-share-overlay .playkit-share-icons {\n  margin: 20px 0; }\n\n.playkit-overlay.playkit-cvaa-overlay .playkit-sample {\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 36px;\n  text-align: center;\n  padding: 0 31px;\n  display: inline-block;\n  margin: 0 12px;\n  cursor: pointer;\n  position: relative; }\n  .playkit-overlay.playkit-cvaa-overlay .playkit-sample.playkit-black-bg {\n    background-color: #000; }\n  .playkit-overlay.playkit-cvaa-overlay .playkit-sample.playkit-yellow-text {\n    color: #FAFF00; }\n  .playkit-overlay.playkit-cvaa-overlay .playkit-sample .playkit-active-tick {\n    height: 16px;\n    width: 16px;\n    border-radius: 8px;\n    background-color: #01ACCD;\n    position: absolute;\n    top: -5px;\n    right: -5px; }\n    .playkit-overlay.playkit-cvaa-overlay .playkit-sample .playkit-active-tick .playkit-icon {\n      vertical-align: top; }\n  .playkit-overlay.playkit-cvaa-overlay .playkit-sample span {\n    font-size: 16px !important;\n    line-height: 1;\n    vertical-align: middle; }\n\n.playkit-overlay.playkit-cvaa-overlay .playkit-button-save-cvaa {\n  margin-top: 50px;\n  height: 40px;\n  width: 400px;\n  max-width: 100%;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 38px;\n  text-align: center;\n  display: inline-block;\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.playkit-overlay.playkit-cvaa-overlay .playkit-custom-captions-applied {\n  margin-top: 50px; }\n\n.playkit-overlay.playkit-cvaa-overlay .playkit-custom-caption-form {\n  width: 300px;\n  max-width: 100%;\n  margin: 0 auto; }\n  .playkit-overlay.playkit-cvaa-overlay .playkit-custom-caption-form a {\n    color: white;\n    line-height: 36px;\n    text-decoration: none; }\n    .playkit-overlay.playkit-cvaa-overlay .playkit-custom-caption-form a:hover, .playkit-overlay.playkit-cvaa-overlay .playkit-custom-caption-form a:focus {\n      text-decoration: underline; }\n  .playkit-overlay.playkit-cvaa-overlay .playkit-custom-caption-form .playkit-slider {\n    float: right;\n    width: 100px;\n    margin-top: 5px; }\n\n.playkit-overlay.playkit-cvaa-overlay .playkit-preview-container {\n  width: 100%;\n  text-align: center;\n  font-size: 16px; }\n\n.playkit-player.playkit-size-sm .playkit-overlay.playkit-cvaa-overlay .playkit-sample {\n  width: 30%;\n  margin: 2.33%;\n  padding: 0; }\n  .playkit-player.playkit-size-sm .playkit-overlay.playkit-cvaa-overlay .playkit-sample:first-child {\n    margin-left: 0; }\n  .playkit-player.playkit-size-sm .playkit-overlay.playkit-cvaa-overlay .playkit-sample:last-child {\n    margin-right: 0; }\n  .playkit-player.playkit-size-sm .playkit-overlay.playkit-cvaa-overlay .playkit-sample.playkit-custom {\n    width: auto;\n    padding: 0 10px; }\n\n.playkit-player.playkit-size-sm .playkit-overlay.playkit-cvaa-overlay .playkit-button-save-cvaa,\n.playkit-player.playkit-size-sm .playkit-overlay.playkit-cvaa-overlay .playkit-custom-captions-applied {\n  margin-top: 20px; }\n\n@keyframes playkit-kaltura-spinner {\n  0% {\n    transform: rotate(0deg) scale(0.7);\n    opacity: 1; }\n  70% {\n    transform: rotate(360deg) scale(0.7);\n    opacity: 1; }\n  82% {\n    transform: rotate(360deg) scale(0);\n    opacity: 0; }\n  87% {\n    transform: rotate(360deg) scale(0.9);\n    opacity: 1; }\n  100% {\n    transform: rotate(360deg) scale(0.7);\n    opacity: 1; } }\n\n.playkit-loading-backdrop {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n  transition: 100ms opacity;\n  opacity: 0;\n  z-index: 5; }\n  .playkit-loading-backdrop.playkit-show {\n    opacity: 1; }\n    .playkit-loading-backdrop.playkit-show .playkit-spinner-container {\n      display: block; }\n  .playkit-loading-backdrop .playkit-spinner-container {\n    display: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate3d(-50px, -50px, 0); }\n\n.playkit-spinner {\n  width: 100px;\n  height: 100px;\n  position: relative;\n  animation: playkit-kaltura-spinner 2.5s infinite; }\n  .playkit-spinner span {\n    width: 8px;\n    height: 8px;\n    background-color: #fff;\n    display: block;\n    border-radius: 8px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-top: -4px;\n    margin-left: -4px; }\n    .playkit-spinner span:nth-child(1) {\n      transform: rotate(45deg) translateX(-25px) translateY(-25px);\n      background-color: #da1f26; }\n    .playkit-spinner span:nth-child(2) {\n      transform: rotate(90deg) translateX(-25px) translateY(-25px);\n      background-color: #06a885; }\n    .playkit-spinner span:nth-child(3) {\n      transform: rotate(135deg) translateX(-25px) translateY(-25px);\n      background-color: #009344; }\n    .playkit-spinner span:nth-child(4) {\n      transform: rotate(180deg) translateX(-25px) translateY(-25px);\n      background-color: #f8a61a; }\n    .playkit-spinner span:nth-child(5) {\n      transform: rotate(225deg) translateX(-25px) translateY(-25px);\n      background-color: #1b4a97; }\n    .playkit-spinner span:nth-child(6) {\n      transform: rotate(270deg) translateX(-25px) translateY(-25px);\n      background-color: #00abcc; }\n    .playkit-spinner span:nth-child(7) {\n      transform: rotate(315deg) translateX(-25px) translateY(-25px);\n      background-color: #b1d238; }\n    .playkit-spinner span:nth-child(8) {\n      transform: rotate(360deg) translateX(-25px) translateY(-25px);\n      background-color: #fcd203; }\n\n.playkit-control-button-container.playkit-control-play-pause .playkit-control-button {\n  transition: 400ms transform; }\n  .playkit-control-button-container.playkit-control-play-pause .playkit-control-button .playkit-icon-pause {\n    transition: 400ms opacity;\n    opacity: 0;\n    display: none; }\n  .playkit-control-button-container.playkit-control-play-pause .playkit-control-button .playkit-icon-play {\n    transition: 400ms opacity;\n    opacity: 1;\n    display: block; }\n  .playkit-control-button-container.playkit-control-play-pause .playkit-control-button.playkit-is-playing {\n    transform: rotate(360deg); }\n    .playkit-control-button-container.playkit-control-play-pause .playkit-control-button.playkit-is-playing .playkit-icon-pause {\n      opacity: 1;\n      display: block; }\n    .playkit-control-button-container.playkit-control-play-pause .playkit-control-button.playkit-is-playing .playkit-icon-play {\n      opacity: 0;\n      display: none; }\n\n.playkit-touch .playkit-control-button-container.playkit-control-play-pause {\n  display: none; }\n\n.playkit-player.playkit-size-sm .playkit-control-button-container.playkit-control-play-pause {\n  display: none; }\n\n.playkit-control-button-container.playkit-volume-control.playkit-hover .playkit-volume-control-bar {\n  display: block !important; }\n\n.playkit-control-button-container.playkit-volume-control.playkit-is-muted .playkit-icon-volume-waves {\n  opacity: 0;\n  transform: translateX(-5px); }\n\n.playkit-control-button-container.playkit-volume-control.playkit-is-muted .playkit-icon-volume-mute {\n  opacity: 1;\n  transform: scale(1); }\n\n.playkit-control-button-container.playkit-volume-control.playkit-dragging-active .playkit-volume-control-bar {\n  display: block; }\n\n.playkit-control-button-container.playkit-volume-control .playkit-icon-volume-waves {\n  transform: translateX(0px); }\n\n.playkit-control-button-container.playkit-volume-control .playkit-icon-volume-mute {\n  opacity: 1;\n  transform: scale(0); }\n\n.playkit-control-button-container.playkit-volume-control .playkit-icon-volume-waves, .playkit-control-button-container.playkit-volume-control .playkit-icon-volume-mute {\n  transition: 300ms transform, 300ms opacity; }\n\n.playkit-control-button-container.playkit-volume-control i {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.playkit-volume-control-bar {\n  position: absolute;\n  z-index: 2;\n  bottom: 38px;\n  left: 0px;\n  display: block;\n  height: 112px;\n  width: 34px;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);\n  background-color: #333333;\n  padding: 6px;\n  display: none; }\n  .playkit-volume-control-bar:before {\n    position: absolute;\n    width: 34px;\n    height: 14px;\n    bottom: -8px;\n    left: 0;\n    content: ' ';\n    display: block; }\n  .playkit-volume-control-bar .playkit-bar {\n    background-color: #424242;\n    height: 100%;\n    position: relative;\n    cursor: pointer; }\n  .playkit-volume-control-bar .playkit-progress {\n    position: absolute;\n    bottom: 0px;\n    left: 0px;\n    width: 100%;\n    border-radius: 0 0 2px 2px;\n    background-color: #01ACCD; }\n\n.playkit-player.playkit-smart-container-open .playkit-control-button-container.playkit-volume-control.playkit-hover .playkit-volume-control-bar {\n  display: none !important; }\n\n.playkit-touch .playkit-control-button-container.playkit-volume-control.playkit-hover .playkit-volume-control-bar {\n  display: none !important; }\n\n.playkit-in-browser-fullscreen-mode {\n  width: 100% !important;\n  height: 100% !important;\n  position: fixed !important;\n  top: 0 !important;\n  left: 0 !important;\n  z-index: 999999 !important; }\n\n.playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button {\n  transition: 100ms transform;\n  transform: scale(1); }\n  .playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button .playkit-icon-minimize {\n    display: none; }\n  .playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button.playkit-is-fullscreen .playkit-icon-maximize {\n    display: none; }\n  .playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button.playkit-is-fullscreen .playkit-icon-minimize {\n    display: block; }\n\n.playkit-player:not(.playkit-touch) .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button:hover {\n  transform: scale(1.1); }\n\n.playkit-player .playkit-seek-bar {\n  padding: 12px 0;\n  margin: -6px 0;\n  cursor: pointer;\n  position: relative; }\n  .playkit-player .playkit-seek-bar:hover .playkit-time-preview,\n  .playkit-player .playkit-seek-bar:hover .playkit-frame-preview, .playkit-player .playkit-seek-bar.playkit-hover .playkit-time-preview,\n  .playkit-player .playkit-seek-bar.playkit-hover .playkit-frame-preview, .playkit-player .playkit-seek-bar.playkit-dragging-active .playkit-time-preview,\n  .playkit-player .playkit-seek-bar.playkit-dragging-active .playkit-frame-preview {\n    display: block; }\n  .playkit-player .playkit-seek-bar:hover .playkit-progress-bar .playkit-scrubber, .playkit-player .playkit-seek-bar.playkit-hover .playkit-progress-bar .playkit-scrubber, .playkit-player .playkit-seek-bar.playkit-dragging-active .playkit-progress-bar .playkit-scrubber {\n    transform: scale(1); }\n  .playkit-player .playkit-seek-bar:hover .playkit-progress-bar .playkit-virtual-progress, .playkit-player .playkit-seek-bar.playkit-hover .playkit-progress-bar .playkit-virtual-progress, .playkit-player .playkit-seek-bar.playkit-dragging-active .playkit-progress-bar .playkit-virtual-progress {\n    display: block; }\n  .playkit-player .playkit-seek-bar.playkit-ad-break {\n    cursor: initial; }\n    .playkit-player .playkit-seek-bar.playkit-ad-break .playkit-progress-bar .playkit-progress {\n      background-color: #F9A71B; }\n  .playkit-player .playkit-seek-bar.playkit-live .playkit-progress-bar .playkit-progress {\n    background-color: #DA1F26; }\n  .playkit-player .playkit-seek-bar .playkit-progress-bar {\n    height: 4px;\n    background-color: rgba(255, 255, 255, 0.3);\n    border-radius: 2px;\n    position: relative; }\n    .playkit-player .playkit-seek-bar .playkit-progress-bar .playkit-progress {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      border-radius: 2px 0 0 2px;\n      background-color: #01ACCD; }\n    .playkit-player .playkit-seek-bar .playkit-progress-bar .playkit-virtual-progress {\n      display: none; }\n    .playkit-player .playkit-seek-bar .playkit-progress-bar .playkit-buffered, .playkit-player .playkit-seek-bar .playkit-progress-bar .playkit-virtual-progress {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      border-radius: 2px 0 0 2px;\n      background-color: rgba(255, 255, 255, 0.3); }\n    .playkit-player .playkit-seek-bar .playkit-progress-bar .playkit-scrubber {\n      position: absolute;\n      cursor: pointer;\n      display: block;\n      top: -6px;\n      right: -8px;\n      border-radius: 8px;\n      height: 16px;\n      width: 16px;\n      background-color: #FFFFFF;\n      box-shadow: 0 0 31px 0 rgba(0, 0, 0, 0.3);\n      transform: scale(0);\n      transition: 100ms transform; }\n      .playkit-player .playkit-seek-bar .playkit-progress-bar .playkit-scrubber:active {\n        opacity: 1;\n        cursor: grabbing; }\n  .playkit-player .playkit-seek-bar .playkit-frame-preview {\n    position: absolute;\n    bottom: 16px;\n    left: 0;\n    height: 94px;\n    width: 164px;\n    border: 2px solid rgba(255, 255, 255, 0.2);\n    border-radius: 4px; }\n    .playkit-player .playkit-seek-bar .playkit-frame-preview .playkit-frame-preview-img {\n      background-size: auto 100%;\n      width: 100%;\n      height: 100%;\n      position: relative; }\n  .playkit-player .playkit-seek-bar .playkit-time-preview {\n    position: absolute;\n    bottom: 22px;\n    left: 0;\n    height: 22px;\n    min-width: 48px;\n    padding: 0 3px;\n    text-align: center;\n    border-radius: 3px;\n    background-color: rgba(0, 0, 0, 0.7);\n    font-size: 13px;\n    font-weight: bold;\n    line-height: 22px;\n    color: #fff; }\n  .playkit-player .playkit-seek-bar .playkit-time-preview,\n  .playkit-player .playkit-seek-bar .playkit-frame-preview {\n    display: none; }\n\n.playkit-touch .playkit-virtual-progress, .playkit-touch .playkit-time-preview, .playkit-touch .playkit-frame-preview {\n  display: none !important; }\n\n.playkit-player.playkit-size-sm .playkit-virtual-progress, .playkit-player.playkit-size-sm .playkit-time-preview, .playkit-player.playkit-size-sm .playkit-frame-preview {\n  display: none; }\n\n.playkit-player .playkit-time-display {\n  display: inline-block;\n  line-height: 32px;\n  vertical-align: top;\n  font-size: 14px;\n  padding: 0 23px;\n  font-weight: bold; }\n\n.playkit-touch .playkit-time-display {\n  padding-left: 0; }\n\n.playkit-player.playkit-size-sm .playkit-player .playkit-time-display {\n  padding: 0 12px 0 0; }\n\n.playkit-player .playkit-video-playing-title {\n  font-size: 15px;\n  font-weight: bold;\n  line-height: 18px;\n  padding: 6px 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.playkit-player .playkit-bottom-bar {\n  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);\n  padding: 6px 16px;\n  color: #fff;\n  opacity: 0;\n  visibility: hidden;\n  transition: 100ms opacity;\n  width: 100%;\n  margin-top: auto;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  z-index: 1; }\n  .playkit-player .playkit-bottom-bar .playkit-left-controls {\n    float: left;\n    text-align: left; }\n    .playkit-player .playkit-bottom-bar .playkit-left-controls .playkit-control-button-container:first-child {\n      margin-left: 0px; }\n  .playkit-player .playkit-bottom-bar .playkit-right-controls {\n    float: right;\n    text-align: left; }\n    .playkit-player .playkit-bottom-bar .playkit-right-controls .playkit-control-button-container:last-child {\n      margin-right: 0px; }\n  .playkit-player .playkit-bottom-bar .playkit-control-button-container {\n    margin: 0 6px; }\n\n.playkit-player.playkit-hover .playkit-bottom-bar,\n.playkit-player.playkit-state-paused .playkit-bottom-bar,\n.playkit-player.playkit-menu-active .playkit-bottom-bar {\n  opacity: 1;\n  visibility: visible; }\n\n.playkit-player.playkit-overlay-active .playkit-bottom-bar {\n  opacity: 0;\n  visibility: hidden; }\n\n.playkit-player.playkit-size-sm .playkit-bottom-bar {\n  padding: 6px 8px; }\n  .playkit-player.playkit-size-sm .playkit-bottom-bar .playkit-time-display {\n    padding-left: 0; }\n\n.playkit-player .playkit-top-bar {\n  background: linear-gradient(0deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);\n  padding: 14px 16px;\n  color: #fff;\n  opacity: 0;\n  visibility: hidden;\n  transition: 100ms opacity;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0; }\n  .playkit-player .playkit-top-bar .playkit-left-controls {\n    text-align: left;\n    min-width: 0; }\n  .playkit-player .playkit-top-bar .playkit-right-controls {\n    text-align: left; }\n    .playkit-player .playkit-top-bar .playkit-right-controls .playkit-control-button-container {\n      margin: 0 6px; }\n      .playkit-player .playkit-top-bar .playkit-right-controls .playkit-control-button-container:last-child {\n        margin-right: 0; }\n\n.playkit-player.playkit-hover .playkit-top-bar,\n.playkit-player.playkit-state-paused .playkit-top-bar,\n.playkit-player.playkit-menu-active .playkit-top-bar {\n  opacity: 1;\n  visibility: visible; }\n\n.playkit-player.playkit-overlay-active .playkit-top-bar {\n  opacity: 0;\n  visibility: hidden; }\n\n.playkit-player.playkit-size-sm .playkit-player .playkit-top-bar {\n  padding: 8px 8px 20px 8px; }\n\n@keyframes playkit-overlayActionIconIn {\n  0% {\n    opacity: 0;\n    transform: scale(0); }\n  10% {\n    opacity: 0.1;\n    transform: scale(0.1); }\n  20% {\n    opacity: 0.3;\n    transform: scale(0.2); }\n  30% {\n    opacity: 0.5;\n    transform: scale(0.3); }\n  40% {\n    opacity: 0.7;\n    transform: scale(0.4); }\n  50% {\n    opacity: 0.9;\n    transform: scale(0.5); }\n  60% {\n    opacity: 0.9;\n    transform: scale(0.5); }\n  70% {\n    opacity: 0.9;\n    transform: scale(0.5); }\n  75% {\n    opacity: 0.9;\n    transform: scale(0.5); }\n  80% {\n    opacity: 1;\n    transform: scale(0.5); }\n  85% {\n    opacity: 1;\n    transform: scale(0.5); }\n  90% {\n    opacity: 1;\n    transform: scale(0.5); }\n  93% {\n    opacity: 0.7;\n    transform: scale(0.5); }\n  95% {\n    opacity: 0.5;\n    transform: scale(0.5); }\n  98% {\n    opacity: 0.2;\n    transform: scale(0.5); }\n  100% {\n    opacity: 0.0;\n    transform: scale(0.5); } }\n\n.playkit-overlay-action {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n  .playkit-overlay-action.playkit-in .playkit-icon {\n    animation: playkit-overlayActionIconIn 300ms linear forwards; }\n  .playkit-overlay-action .playkit-icon {\n    width: 144px;\n    height: 144px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -72px 0 0 -72px;\n    opacity: 0; }\n\n.playkit-pre-playback-play-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-position: center center;\n  background-size: contain;\n  background-repeat: no-repeat; }\n  .playkit-pre-playback-play-overlay.playkit-has-poster {\n    background-color: #000; }\n  .playkit-pre-playback-play-overlay .playkit-pre-playback-play-button {\n    z-index: 1;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    height: 108px;\n    width: 108px;\n    border: 2px solid rgba(255, 255, 255, 0.2);\n    background-color: rgba(0, 0, 0, 0.5);\n    margin: -54px 0 0 -54px;\n    border-radius: 54px;\n    padding: 20px;\n    cursor: pointer; }\n    .playkit-pre-playback-play-overlay .playkit-pre-playback-play-button:hover {\n      border: 2px solid rgba(255, 255, 255, 0.4); }\n    .playkit-pre-playback-play-overlay .playkit-pre-playback-play-button:active {\n      opacity: 0.7;\n      transform: scale(1); }\n\n.playkit-pre-playback .playkit-player-gui {\n  opacity: 0 !important;\n  display: none; }\n\n.playkit-btn-skip-ad {\n  position: absolute;\n  bottom: 60px;\n  right: 16px; }\n\n.playkit-skip-ad {\n  color: #fff;\n  font-size: 20px;\n  font-weight: bold;\n  line-height: 24px;\n  text-shadow: 0 0 6px rgba(0, 0, 0, 0.6);\n  position: absolute;\n  bottom: 66px;\n  right: 16px; }\n\n.playkit-live-tag {\n  color: #DA1F26;\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 1px;\n  line-height: 19px;\n  border: 2px solid #DA1F26;\n  border-radius: 4px;\n  text-transform: uppercase;\n  text-align: center;\n  display: inline-block;\n  padding: 0 3px 0 5px;\n  margin: 5px 23px;\n  cursor: default; }\n  .playkit-live-tag.playkit-non-live-playhead {\n    background-color: rgba(255, 255, 255, 0.2);\n    border: none;\n    color: #fff;\n    line-height: 23px;\n    padding: 0 5px 0 7px;\n    cursor: pointer; }\n\n.playkit-player.playkit-size-sm .playkit-live-tag {\n  margin-left: 0; }\n\n.playkit-icon {\n  display: inline-block;\n  font-size: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: 50% 50%; }\n\n.playkit-icon-maximize {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M800 269.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' /%3E %3Cpath fill='%23fff' d='M224 754.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-minimize {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M672 306.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' /%3E%3Cpath fill='%23fff' d='M352 717.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-play {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M796.806 461.202c44.919 28.075 44.739 73.706 0 101.668l-459.472 287.171c-44.919 28.075-81.334 7.915-81.334-45.305v-585.4c0-53.096 36.595-73.266 81.334-45.305l459.472 287.171z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-pause {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M256 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314zM640 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-base {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M128 416v192h96v-192h-96zM64 383.853c0-17.592 14.012-31.853 32.094-31.853h159.813c17.725 0 32.094 14.581 32.094 31.853v256.295c0 17.592-14.012 31.853-32.094 31.853h-159.813c-17.725 0-32.094-14.581-32.094-31.853v-256.295z' /%3E%3Cpath fill='%23fff' d='M288 634.342l160 88.889v-422.462l-160 88.889v244.684zM224 352l231.787-128.771c31.046-17.248 56.213-2.487 56.213 32.476v512.589c0 35.184-25.054 49.786-56.213 32.476l-231.787-128.771v-320z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-waves {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M802.017 837.177c82.359-86.627 129.183-201.774 129.183-324.26 0-123.976-47.976-240.409-132.127-327.329-12.293-12.697-32.552-13.025-45.249-0.732s-13.025 32.552-0.732 45.249c72.692 75.084 114.109 175.597 114.109 282.812 0 105.928-40.422 205.331-111.566 280.162-12.177 12.808-11.666 33.063 1.143 45.24s33.063 11.666 45.24-1.143z' /%3E%3Cpath fill='%23fff' d='M667.436 743.221c67.761-60.884 107.273-147.888 107.273-241.233 0-87.318-34.552-169.203-94.836-229.446-12.501-12.493-32.762-12.486-45.255 0.015s-12.486 32.762 0.015 45.255c48.375 48.342 76.075 113.989 76.075 184.176 0 75.021-31.679 144.776-86.048 193.627-13.146 11.812-14.227 32.044-2.416 45.19s32.044 14.227 45.19 2.416z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-wave {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M667.436 743.221c67.761-60.884 107.273-147.888 107.273-241.233 0-87.318-34.552-169.203-94.836-229.446-12.501-12.493-32.762-12.486-45.255 0.015s-12.486 32.762 0.015 45.255c48.375 48.342 76.075 113.989 76.075 184.176 0 75.021-31.679 144.776-86.048 193.627-13.146 11.812-14.227 32.044-2.416 45.19s32.044 14.227 45.19 2.416z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-volume-mute {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M768 466.745l-67.986-67.986c-12.213-12.213-32.654-12.393-45.151 0.104-12.584 12.584-12.543 32.711-0.104 45.151l67.986 67.986-67.986 67.986c-12.213 12.213-12.393 32.654 0.104 45.151 12.584 12.584 32.711 12.543 45.151 0.104l67.986-67.986 67.986 67.986c12.213 12.213 32.654 12.393 45.151-0.104 12.584-12.584 12.543-32.711 0.104-45.151l-67.986-67.986 67.986-67.986c12.213-12.213 12.393-32.654-0.104-45.151-12.584-12.584-32.711-12.543-45.151-0.104l-67.986 67.986z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-close {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M573.162 512l214.269-214.269c16.772-16.772 16.688-44.071-0.202-60.96-17.007-17.007-44.182-16.98-60.96-0.202l-214.269 214.269-214.269-214.269c-16.772-16.772-44.071-16.688-60.96 0.202-17.007 17.007-16.98 44.182-0.202 60.96l214.269 214.269-214.269 214.269c-16.772 16.772-16.688 44.071 0.202 60.96 17.007 17.007 44.182 16.98 60.96 0.202l214.269-214.269 214.269 214.269c16.772 16.772 44.071 16.688 60.96-0.202 17.007-17.007 16.98-44.182 0.202-60.96l-214.269-214.269z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-share {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M318.641 446.219l236.155-142.257c-0.086-1.754-0.129-3.52-0.129-5.295 0-58.91 47.756-106.667 106.667-106.667s106.667 47.756 106.667 106.667c0 58.91-47.756 106.667-106.667 106.667-33.894 0-64.095-15.808-83.633-40.454l-236.467 142.445c-0.132-3.064-0.394-6.095-0.779-9.087l7.271-12.835-0.117 53.333-7.183-12.743c0.399-3.046 0.67-6.131 0.806-9.252l236.467 142.383c19.538-24.648 49.741-40.457 83.636-40.457 58.91 0 106.667 47.756 106.667 106.667s-47.756 106.667-106.667 106.667c-58.91 0-106.667-47.756-106.667-106.667 0-1.775 0.043-3.539 0.129-5.293l-236.19-142.216c-19.528 24.867-49.868 40.841-83.939 40.841-58.91 0-106.667-47.756-106.667-106.667s47.756-106.667 106.667-106.667c34.091 0 64.447 15.993 83.974 40.886zM234.667 554.667c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 341.333c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 768c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-settings {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M803.451 546.033c2.552-22.107 2.552-44.408 0.246-64.81-1.084-6.208-6.499-10.721-12.535-10.671-30.286 0.533-57.727-17.773-68.866-45.941s-3.64-60.291 18.795-80.593c3.935-3.569 4.416-9.583 0.92-13.959-13.595-17.35-29.146-33.073-46.311-46.83-4.23-3.38-10.359-2.886-14.783 1.966-14.421 14.721-34.212 22.938-54.434 22.761-9.009 0.041-17.942-1.652-26.865-5.212-28.414-11.992-46.226-40.546-44.49-71.542 0.335-5.319-3.547-9.972-8.785-10.588-21.926-2.538-44.068-2.595-65.961-0.176-5.349 0.6-9.341 5.207-9.175 10.514 1.027 30.384-16.802 58.251-45.764 70.431-8.238 3.138-16.993 4.701-25.207 4.609-20.599 0.206-40.395-7.982-55.482-23.363-2.014-2.187-4.849-3.435-7.553-3.445-2.441 0.015-4.811 0.83-6.513 2.139-17.541 13.798-33.455 29.547-47.262 46.729-3.418 4.337-2.922 10.575 0.97 14.162 22.816 20.692 30.19 53.479 17.807 83.351-13.035 27.396-41.135 44.394-71.446 43.222-5.112-0.197-9.499 3.606-10.086 9.179-2.673 22.023-2.673 44.289-0.212 64.867 1.080 6.27 6.559 10.824 13.309 10.737l2.225 0.006c28.935 0.604 54.726 18.391 65.634 45.374 11.22 28.205 3.921 60.407-18.565 81.204-3.866 3.509-4.341 9.418-0.895 13.742 13.545 17.354 29.027 33.106 46.042 46.867 4.303 3.449 10.547 2.954 14.986-1.907 14.414-14.76 34.226-23.001 54.43-22.82 9.070-0.052 18.063 1.668 27.041 5.299 28.19 12.071 45.891 40.41 44.347 71.468-0.342 5.312 3.536 9.962 8.802 10.578 21.915 2.548 44.049 2.605 65.929 0.176 5.364-0.604 9.364-5.227 9.191-10.598-0.997-30.358 16.84-58.183 45.452-70.201 8.263-3.256 17.070-4.908 25.521-4.865 20.676-0.206 40.533 8.070 55.398 23.38 2.039 2.195 4.898 3.446 7.673 3.455 2.268-0.011 4.468-0.776 6.321-2.228 17.625-13.724 33.599-29.444 47.415-46.611 3.426-4.348 2.928-10.6-0.863-14.097-22.358-20.082-30.057-51.85-19.372-79.939s37.55-46.71 67.745-46.857h5.229c5.12-0.026 9.413-3.875 9.996-8.962zM861.733 552.735c-3.961 34.572-33.157 60.748-68.129 60.926h-5.235c-5.803 0.028-10.991 3.624-13.054 9.048s-0.577 11.558 4.020 15.69c26.602 24.519 29.853 65.381 7.275 94.034-16.847 20.934-36.063 39.845-57.197 56.302-12.034 9.427-26.861 14.584-42.368 14.658-19.254-0.051-37.623-8.090-50.269-21.718-3.221-3.315-7.66-5.165-12.712-5.118-1.425-0.007-2.839 0.258-3.554 0.532-5.581 2.346-9.136 7.892-8.937 13.966 1.152 35.958-25.509 66.771-61.307 70.804-26.332 2.923-52.909 2.854-79.246-0.208-36.286-4.245-62.897-36.157-60.576-72.186 0.304-6.123-3.235-11.788-8.302-13.964-1.328-0.536-2.748-0.808-4.606-0.8-4.651-0.041-9.118 1.817-11.635 4.367-24.544 27.036-65.886 30.311-94.481 7.394-20.587-16.65-39.207-35.595-55.308-56.226-22.552-28.277-19.261-69.208 7.317-93.334 4.474-4.138 5.939-10.604 3.748-16.115-2.052-5.076-6.932-8.442-11.794-8.55-36.436 0.464-66.759-24.741-72.949-60.89-3.243-26.718-3.243-53.731-0.055-79.964 3.744-35.827 34.642-62.605 70.642-61.219 6.877 0.266 13.251-3.59 15.584-8.401 2.309-5.59 0.861-12.028-3.789-16.247-26.603-24.51-29.856-65.368-7.293-93.994 16.767-20.868 35.856-39.76 57.129-56.491 12.099-9.322 26.921-14.42 42.463-14.513 19.308 0.059 37.717 8.166 50.145 21.684 3.263 3.322 7.737 5.172 12.994 5.126 1.471 0.015 2.933-0.245 3.363-0.39 5.601-2.359 9.165-7.93 8.957-14.077-1.126-35.941 25.542-66.721 61.322-70.731 26.322-2.909 52.889-2.84 79.251 0.212 36.244 4.265 62.828 36.125 60.546 72.343-0.339 6.047 3.159 11.654 8.186 13.782 1.381 0.55 2.855 0.829 4.726 0.823 4.663 0.040 9.142-1.819 11.615-4.312 24.439-26.99 65.656-30.312 94.137-7.557 20.721 16.607 39.456 35.549 55.655 56.225 22.667 28.35 19.38 69.439-7.531 93.846-4.33 3.918-5.776 10.112-3.628 15.542s7.438 8.96 13.543 8.854c34.999-0.298 65.076 24.766 71.337 60.925 3.065 26.552 3.065 53.368 0 79.92zM511.956 589.951c43.215-0.108 78.137-35.17 78.072-78.385 0-31.732-19.132-60.334-48.461-72.448s-63.068-5.35-85.461 17.133c-22.393 22.483-29.022 56.249-16.791 85.529s40.909 48.298 72.641 48.171zM512.146 648.617c-55.438 0.221-105.58-33.029-126.965-84.224s-9.796-110.233 29.358-149.543c39.153-39.31 98.144-51.136 149.424-29.956s84.731 71.189 84.732 126.627c0.114 75.549-60.999 136.907-136.548 137.096z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-check {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M342.481 563.894c-12.577-12.416-32.838-12.285-45.254 0.292s-12.285 32.838 0.292 45.254l118.857 117.333c13.275 13.105 34.901 12.123 46.933-2.131l297.143-352c11.4-13.505 9.694-33.694-3.811-45.094s-33.694-9.694-45.094 3.811l-274.828 325.566-94.238-93.030z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-language {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 800c159.058 0 288-128.942 288-288s-128.942-288-288-288c-159.058 0-288 128.942-288 288s128.942 288 288 288zM512 864c-194.404 0-352-157.596-352-352s157.596-352 352-352c194.404 0 352 157.596 352 352s-157.596 352-352 352z' /%3E%3Cpath fill='%23fff' d='M441.231 173.324c-76.632 84.62-121.231 207.208-121.231 338.676 0 134.304 46.556 259.282 126.083 343.936l46.646-43.82c-68.041-72.429-108.728-181.651-108.728-300.116 0-116.001 39.001-223.203 104.669-295.716l-47.438-42.96z' /%3E%3Cpath fill='%23fff' d='M584.297 173.324c76.632 84.62 121.231 207.208 121.231 338.676 0 134.304-46.556 259.282-126.083 343.936l-46.646-43.82c68.041-72.429 108.728-181.651 108.728-300.116 0-116.001-39.001-223.203-104.669-295.716l47.438-42.96z' /%3E%3Cpath fill='%23fff' d='M840.432 419.786c-81.65-22.637-200.551-35.786-328.432-35.786-128.056 0-247.103 13.185-328.758 35.876l17.136 61.663c75.47-20.972 188.938-33.539 311.622-33.539 122.521 0 235.854 12.533 311.334 33.459l17.099-61.674z' /%3E%3Cpath fill='%23fff' d='M840.432 605.754c-81.65 22.637-200.551 35.786-328.432 35.786-128.056 0-247.103-13.185-328.758-35.876l17.136-61.663c75.47 20.972 188.938 33.539 311.622 33.539 122.521 0 235.854-12.533 311.334-33.459l17.099 61.674z' /%3E%3Cpath fill='%23fff' d='M480 192h64v640h-64v-640z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-quality {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M159.904 192h288.234c17.277 0 31.862 14.323 31.862 31.992 0 17.792-14.261 31.993-31.853 31.994l-288.147 0.014v544.174c-0.017-0.18 704-0.174 704-0.174v-128.006c0-17.795 14.327-31.994 32-31.994 17.796 0 32 14.34 32 32.029v128.145c0 35.25-28.639 63.826-63.904 63.826h-704.192c-35.293 0-63.904-28.875-63.904-63.826v-544.348c0-35.25 28.639-63.826 63.904-63.826zM501.818 378.182c108.449 0 196.364-87.915 196.364-196.364 0-29.091 43.636-29.091 43.636 0 0 108.449 87.915 196.364 196.364 196.364 29.091 0 29.091 43.636 0 43.636-108.449 0-196.364 87.915-196.364 196.364 0 29.091-43.636 29.091-43.636 0 0-108.449-87.915-196.364-196.364-196.364-29.091 0-29.091-43.636 0-43.636z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-captions {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M160 771.213c-0.017-0.172 704-0.166 704-0.166v-518.261c0.017 0.172-704 0.166-704 0.166v518.261zM96 252.787c0-33.572 28.639-60.787 63.904-60.787h704.192c35.293 0 63.904 27.5 63.904 60.787v518.427c0 33.572-28.639 60.787-63.904 60.787h-704.192c-35.293 0-63.904-27.5-63.904-60.787v-518.427z' /%3E%3Cpath fill='%23fff' d='M490.583 568.655c0 7.729-2.311 15.987-6.933 24.777s-11.668 17.162-21.14 25.118c-9.471 7.956-21.405 14.358-35.801 19.208s-30.611 7.274-48.644 7.274c-38.34 0-68.268-11.176-89.787-33.528s-32.278-52.319-32.278-89.901c0-25.459 4.925-47.962 14.775-67.511s24.095-34.665 42.734-45.348c18.639-10.684 40.916-16.025 66.829-16.025 16.063 0 30.8 2.349 44.212 7.047s24.777 10.759 34.096 18.185c9.32 7.425 16.442 15.343 21.367 23.754s7.388 16.253 7.388 23.527c0 7.425-2.766 13.714-8.297 18.867s-12.237 7.729-20.117 7.729c-5.152 0-9.433-1.326-12.843-3.978s-7.236-6.933-11.479-12.843c-7.577-11.517-15.495-20.155-23.754-25.913s-18.753-8.638-31.482-8.638c-18.336 0-33.111 7.16-44.325 21.481s-16.821 33.907-16.821 58.759c0 11.669 1.44 22.39 4.319 32.164s7.047 18.109 12.502 25.004c5.455 6.895 12.047 12.123 19.776 15.684s16.215 5.342 25.459 5.342c12.426 0 23.072-2.879 31.937-8.638s16.707-14.548 23.527-26.368c3.789-6.971 7.88-12.426 12.275-16.366s9.774-5.91 16.139-5.91c7.577 0 13.866 2.879 18.867 8.638s7.501 11.896 7.501 18.412zM767.219 568.655c0 7.729-2.311 15.987-6.933 24.777s-11.668 17.162-21.14 25.118c-9.471 7.956-21.405 14.358-35.801 19.208s-30.611 7.274-48.644 7.274c-38.34 0-68.268-11.176-89.787-33.528s-32.278-52.319-32.278-89.901c0-25.459 4.925-47.962 14.775-67.511s24.095-34.665 42.734-45.348c18.639-10.684 40.916-16.025 66.829-16.025 16.063 0 30.8 2.349 44.212 7.047s24.777 10.759 34.096 18.185c9.32 7.425 16.442 15.343 21.367 23.754s7.388 16.253 7.388 23.527c0 7.425-2.766 13.714-8.297 18.867s-12.237 7.729-20.117 7.729c-5.152 0-9.433-1.326-12.843-3.978s-7.236-6.933-11.479-12.843c-7.577-11.517-15.495-20.155-23.754-25.913s-18.753-8.638-31.482-8.638c-18.336 0-33.111 7.16-44.325 21.481s-16.821 33.907-16.821 58.759c0 11.669 1.44 22.39 4.319 32.164s7.047 18.109 12.502 25.004c5.455 6.895 12.047 12.123 19.776 15.684s16.215 5.342 25.459 5.342c12.426 0 23.072-2.879 31.937-8.638s16.707-14.548 23.527-26.368c3.789-6.971 7.88-12.426 12.275-16.366s9.774-5.91 16.139-5.91c7.577 0 13.866 2.879 18.867 8.638s7.501 11.896 7.501 18.412z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-speed {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 832c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM480.239 643.971c-0.158-1.272-0.239-2.566-0.239-3.876v-192.19c0-17.621 14.204-31.905 32-31.905 17.673 0 32 14.497 32 31.905v192.19c0 1.313-0.079 2.607-0.232 3.878 55.325 14.128 96.232 64.301 96.232 124.027 0 70.692-57.308 128-128 128s-128-57.308-128-128c0-59.729 40.91-109.903 96.239-124.029zM928 576c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-194.404-157.596-352-352-352s-352 157.596-352 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-229.75 186.25-416 416-416s416 186.25 416 416z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-speed-down {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM401.852 670.758c-1.056-0.826-2.077-1.728-3.055-2.706l-113.005-113.005c-12.533-12.533-12.65-32.737-0.066-45.321 12.497-12.497 32.536-12.719 45.321 0.066l113.005 113.005c0.976 0.976 1.876 1.998 2.701 3.059 19.106-11.343 41.416-17.855 65.248-17.855 70.692 0 128 57.308 128 128s-57.308 128-128 128c-70.692 0-128-57.308-128-128 0-23.829 6.511-46.137 17.852-65.242zM928 576c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-194.404-157.596-352-352-352s-352 157.596-352 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-229.75 186.25-416 416-416s416 186.25 416 416z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-speed-up {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M512 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM546.516 612.708c0.524-1.23 1.129-2.446 1.819-3.64l79.906-138.402c8.862-15.35 28.348-20.692 43.76-11.794 15.305 8.837 20.707 28.135 11.666 43.794l-79.906 138.402c-0.693 1.201-1.451 2.34-2.268 3.416 23.761 23.238 38.508 55.655 38.508 91.516 0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 11.959 0 23.535 1.64 34.516 4.708zM928 576c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-194.404-157.596-352-352-352s-352 157.596-352 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-229.75 186.25-416 416-416s416 186.25 416 416z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-audio {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M768 625.124v-354.531l-352 135.385v330.022c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 23.314 0 45.173 6.233 64 17.124v-241.124c0-13.241 8.155-25.114 20.513-29.867l416-160c20.96-8.062 43.487 7.41 43.487 29.867v512c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128 23.314 0 45.173 6.233 64 17.124zM288 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64zM704 800c35.346 0 64-28.654 64-64s-28.654-64-64-64c-35.346 0-64 28.654-64 64s28.654 64 64 64z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-copy {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M703.727 320c35.497 0 64.273 28.482 64.273 64.003v351.993c0 35.348-28.862 64.003-64.273 64.003h-191.454c-35.496 0-64.271-28.48-64.273-64.001l255.727 0.001v-352c0 0-28.356 0.147-63.727 0.001v-63.912l63.727-0.088zM256 288.187c0-35.45 28.398-64.187 63.988-64.187h192.025c35.339 0 63.988 28.706 63.988 64.187v319.625c0 35.45-28.398 64.187-63.988 64.187h-192.025c-35.339 0-63.988-28.706-63.988-64.187v-319.625zM320 288v320h192v-320h-192z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-facebook {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M432 405.333h-80v106.667h80v320h133.333v-320h97.12l9.547-106.667h-106.667v-44.453c0-25.467 5.12-35.547 29.733-35.547h76.933v-133.333h-101.547c-95.893 0-138.453 42.213-138.453 123.067v90.267z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-twitter {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M832 316.614c-23.547 10.29-48.853 17.221-75.413 20.345 27.12-15.987 47.947-41.319 57.733-71.508-25.36 14.806-53.467 25.568-83.387 31.37-23.92-25.122-58.080-40.82-95.84-40.82-84.773 0-147.067 77.861-127.92 158.687-109.093-5.381-205.84-56.833-270.613-135.035-34.4 58.094-17.84 134.090 40.613 172.574-21.493-0.683-41.76-6.484-59.44-16.171-1.44 59.879 42.16 115.898 105.307 128.368-18.48 4.935-38.72 6.090-59.307 2.205 16.693 51.347 65.173 88.702 122.667 89.752-55.2 42.605-124.747 61.637-194.4 53.552 58.107 36.673 127.147 58.067 201.28 58.067 243.787 0 381.52-202.684 373.2-384.473 25.653-18.244 47.92-41.004 65.52-66.914v0z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-google-plus {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M352 556.8h127.040c-5.12 32.928-38.4 96.64-127.040 96.64-76.48 0-138.88-63.328-138.88-141.44 0-78.080 62.4-141.44 138.88-141.44 43.52 0 72.64 18.56 89.28 34.56l60.8-58.56c-39.040-36.48-89.6-58.56-150.080-58.56-123.84 0-224 100.16-224 224s100.16 224 224 224c129.28 0 215.072-90.88 215.072-218.88 0-14.72-1.632-25.92-3.552-37.12h-211.52v76.8zM800 544v96h-64v-96h-96v-64h96v-96h64v96h96v64h-96z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-linked-in {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M324.8 290.087c0 36.506-29.6 66.087-66.133 66.087s-66.133-29.581-66.133-66.087c0-36.48 29.6-66.087 66.133-66.087s66.133 29.607 66.133 66.087zM325.333 409.043h-133.333v422.957h133.333v-422.957zM538.187 409.043h-132.48v422.957h132.507v-222.026c0-123.45 160.773-133.549 160.773 0v222.026h133.013v-267.811c0-208.306-237.92-200.719-293.813-98.179v-56.967z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-email {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M256 768c-35.346 0-64-28.654-64-64v-352c0-35.346 28.654-64 64-64h512c35.346 0 64 28.654 64 64v352c0 35.346-28.654 64-64 64h-512zM512 467.488l147.52-115.488h-295.040l147.52 115.488zM748.48 352l-211.2 179.2c-0.713 1.308-1.572 2.532-2.56 3.648-12.707 12.158-32.733 12.158-45.44 0-0.988-1.116-1.847-2.34-2.56-3.648l-211.2-179.2h-19.52v352h512v-352h-19.52z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-embed {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M377.989 579.335c12.669 12.904 12.669 33.777 0 46.68-12.733 12.969-33.427 12.969-46.16 0l-104.727-106.667c-12.669-12.904-12.669-33.777 0-46.68l104.727-106.667c12.733-12.969 33.427-12.969 46.16 0 12.669 12.904 12.669 33.777 0 46.68l-81.812 83.327 81.812 83.327zM646.011 412.68c-12.669-12.904-12.669-33.777 0-46.68 12.733-12.969 33.427-12.969 46.16 0l104.727 106.667c12.669 12.904 12.669 33.777 0 46.68l-104.727 106.667c-12.733 12.969-33.427 12.969-46.16 0-12.669-12.904-12.669-33.777 0-46.68l81.812-83.327-81.812-83.327zM572.293 250.6c17.455 4.445 28.025 22.388 23.686 40.066l-104.727 426.669c-4.349 17.719-22.048 28.535-39.545 24.079-17.455-4.445-28.025-22.388-23.686-40.066l104.727-426.669c4.349-17.719 22.048-28.535 39.545-24.079z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-link {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M355.028 445.537c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-24.141-24.141c-49.92-49.92-49.832-130.999 0.094-180.925 49.984-49.984 130.995-50.025 180.955-0.064l113.266 113.266c49.964 49.964 49.935 130.955-0.064 180.955-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255c25.013-25.013 25.027-65.482 0.064-90.445l-113.266-113.266c-24.957-24.957-65.445-24.936-90.445 0.064-24.955 24.955-24.998 65.511-0.094 90.416l24.141 24.141zM668.972 578.463c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l24.141 24.141c49.92 49.92 49.832 130.999-0.094 180.925-49.984 49.984-130.995 50.025-180.955 0.064l-113.266-113.266c-49.964-49.964-49.935-130.955 0.064-180.955 12.497-12.497 32.758-12.497 45.255 0s12.497 32.758 0 45.255c-25.013 25.013-25.027 65.482-0.064 90.445l113.266 113.266c24.957 24.957 65.445 24.936 90.445-0.064 24.955-24.955 24.998-65.511 0.094-90.416l-24.141-24.141z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-arrow-down {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M301.255 338.745c-24.994-24.994-65.516-24.994-90.51 0s-24.994 65.516 0 90.51l256 256c24.994 24.994 65.516 24.994 90.51 0l256-256c24.994-24.994 24.994-65.516 0-90.51s-65.516-24.994-90.51 0l-210.745 210.745-210.745-210.745z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-start-over {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M255.271 339.053c94.182-126.513 270.298-165.203 410.222-84.418 150.758 87.040 202.411 279.813 115.371 430.571s-279.813 202.411-430.571 115.371c-61.424-35.463-107.948-89.4-134.169-153.673-7.677-18.818-29.156-27.85-47.974-20.173s-27.85 29.156-20.173 47.974c32.339 79.269 89.818 145.906 165.517 189.611 185.96 107.364 423.747 43.649 531.111-142.311s43.649-423.747-142.311-531.111c-172.433-99.554-389.428-52.014-505.682 103.69l-27.226-78.49c-6.66-19.202-27.626-29.368-46.828-22.708s-29.368 27.626-22.708 46.828l52.434 151.164c5.36 15.452 20.275 25.513 36.61 24.694l159.799-8.011c20.299-1.018 35.929-18.298 34.911-38.596s-18.298-35.929-38.596-34.911l-89.738 4.499z' /%3E%3C/svg%3E\"); }\n\n.playkit-icon-seek-forward {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' opacity='0.5' d='M765.529 323.053c-94.182-126.513-270.298-165.203-410.222-84.418-150.758 87.040-202.411 279.813-115.371 430.571s279.813 202.411 430.571 115.371c61.424-35.463 107.948-89.4 134.169-153.673 7.677-18.818 29.156-27.85 47.974-20.173s27.85 29.156 20.173 47.974c-32.339 79.269-89.818 145.906-165.517 189.611-185.96 107.364-423.747 43.649-531.111-142.311s-43.649-423.747 142.311-531.111c172.433-99.554 389.428-52.014 505.682 103.69l27.226-78.49c6.66-19.202 27.626-29.368 46.828-22.708s29.368 27.626 22.708 46.828l-52.434 151.164c-5.36 15.452-20.275 25.513-36.61 24.694l-159.799-8.011c-20.299-1.018-35.929-18.298-34.911-38.596s18.298-35.929 38.596-34.911l89.738 4.499z'/%3E%3Cpath fill='%23fff' d='M207.932 431.974c20.553-78.699 71.369-149.456 147.375-193.338 139.923-80.785 316.040-42.095 410.222 84.418l-89.738-4.499c-20.299-1.018-37.579 14.613-38.596 34.911s14.613 37.579 34.911 38.596l159.799 8.011c16.335 0.819 31.25-9.242 36.61-24.694l52.434-151.164c6.66-19.202-3.506-40.167-22.708-46.828s-40.167 3.506-46.828 22.708l-27.226 78.49c-116.254-155.703-333.248-203.244-505.682-103.69-91.184 52.645-152.976 136.648-179.618 230.523l69.044 26.555z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-seek-end {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M742.494 323.053c-94.182-126.513-270.298-165.203-410.222-84.418-150.758 87.040-202.411 279.813-115.371 430.571s279.813 202.411 430.571 115.371c61.424-35.463 107.948-89.4 134.169-153.673 7.677-18.818 29.156-27.85 47.974-20.173s27.85 29.156 20.173 47.974c-32.339 79.269-89.818 145.906-165.517 189.611-185.96 107.364-423.747 43.649-531.111-142.311s-43.649-423.747 142.311-531.111c172.433-99.554 389.428-52.014 505.682 103.69l27.226-78.49c6.66-19.202 27.626-29.368 46.828-22.708s29.368 27.626 22.708 46.828l-52.434 151.164c-5.36 15.452-20.275 25.513-36.61 24.694l-159.799-8.011c-20.299-1.018-35.929-18.298-34.911-38.596s18.298-35.929 38.596-34.911l89.738 4.499z'/%3E%3C/svg%3E\"); }\n\n.playkit-icon-rewind {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' opacity='0.5' d='M258.471 323.053c94.182-126.513 270.298-165.203 410.222-84.418 150.758 87.040 202.411 279.813 115.371 430.571s-279.813 202.411-430.571 115.371c-61.424-35.463-107.948-89.4-134.169-153.673-7.677-18.818-29.156-27.85-47.974-20.173s-27.85 29.156-20.173 47.974c32.339 79.269 89.818 145.906 165.517 189.611 185.96 107.364 423.747 43.649 531.111-142.311s43.649-423.747-142.311-531.111c-172.433-99.554-389.428-52.014-505.682 103.69l-27.226-78.49c-6.66-19.202-27.626-29.368-46.828-22.708s-29.368 27.626-22.708 46.828l52.434 151.164c5.36 15.452 20.275 25.513 36.61 24.694l159.799-8.011c20.299-1.018 35.929-18.298 34.911-38.596s-18.298-35.929-38.596-34.911l-89.738 4.499z'%3E%3C/path%3E%3Cpath fill='%23fff' d='M816.068 431.974c-20.553-78.699-71.369-149.456-147.375-193.338-139.923-80.785-316.040-42.095-410.222 84.418l89.738-4.499c20.299-1.018 37.579 14.613 38.596 34.911s-14.613 37.579-34.911 38.596l-159.799 8.011c-16.335 0.819-31.25-9.242-36.61-24.694l-52.434-151.164c-6.66-19.202 3.506-40.167 22.708-46.828s40.167 3.506 46.828 22.708l27.226 78.49c116.254-155.703 333.248-203.244 505.682-103.69 91.184 52.645 152.976 136.648 179.618 230.523l-69.044 26.555z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n.playkit-icon-rewind-10 {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M258.471 323.053c94.182-126.513 270.298-165.203 410.222-84.418 150.758 87.040 202.411 279.813 115.371 430.571s-279.813 202.411-430.571 115.371c-61.424-35.463-107.948-89.4-134.169-153.673-7.677-18.818-29.156-27.85-47.974-20.173s-27.85 29.156-20.173 47.974c32.339 79.269 89.818 145.906 165.517 189.611 185.96 107.364 423.747 43.649 531.111-142.311s43.649-423.747-142.311-531.111c-172.433-99.554-389.428-52.014-505.682 103.69l-27.226-78.49c-6.66-19.202-27.626-29.368-46.828-22.708s-29.368 27.626-22.708 46.828l52.434 151.164c5.36 15.452 20.275 25.513 36.61 24.694l159.799-8.011c20.299-1.018 35.929-18.298 34.911-38.596s-18.298-35.929-38.596-34.911l-89.738 4.499z'%3E%3C/path%3E%3Cpath fill='%23fff' d='M413.327 636.083h67.358v-252.083h-48.527c-2.173 7.358-4.949 13.589-8.329 18.693s-7.726 9.139-13.037 12.106c-5.311 2.967-11.709 5.103-19.193 6.409s-16.417 1.958-26.798 1.958v41.302h48.527v171.616zM596.807 554.192c0 17.803 1.569 29.849 4.708 36.139s8.208 9.435 15.21 9.435c7.001 0 12.071-3.145 15.21-9.435s4.708-18.336 4.708-36.139v-83.316c0-17.803-1.569-29.849-4.708-36.139s-8.208-9.435-15.21-9.435c-7.001 0-12.071 3.145-15.21 9.435s-4.708 18.336-4.708 36.139v83.316zM529.449 512.534c0-25.398 1.75-46.405 5.251-63.021s8.812-29.789 15.934-39.522c7.122-9.732 16.176-16.497 27.16-20.295s23.962-5.697 38.93-5.697c14.969 0 27.945 1.899 38.93 5.697s20.038 10.563 27.16 20.295c7.122 9.732 12.433 22.906 15.934 39.522s5.251 37.622 5.251 63.021c0 25.636-1.75 46.702-5.251 63.199s-8.812 29.552-15.934 39.166c-7.122 9.613-16.176 16.2-27.16 19.761s-23.962 5.341-38.93 5.341c-14.969 0-27.945-1.78-38.93-5.341s-20.038-10.147-27.16-19.761c-7.122-9.613-12.433-22.668-15.934-39.166s-5.251-37.563-5.251-63.199z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n.playkit-icon-vr-stereo {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%23fff' d='M864 255.996c53.019 0 96 42.981 96 96v384.004c0 53.019-42.981 96-96 96h-219.764c-33.721 0-64.97-17.693-82.319-46.608l-49.917-83.195-49.917 83.195c-17.349 28.916-48.598 46.608-82.319 46.608h-219.764c-53.019 0-96-42.981-96-96v-384.003c0-53.019 42.981-96 96-96h704zM128 351.997v384.003c0 17.673 14.327 32 32 32h219.764c11.24 0 21.657-5.898 27.44-15.536l49.917-83.195c5.405-9.008 12.944-16.547 21.952-21.952 30.309-18.185 69.622-8.357 87.807 21.952l49.917 83.195c5.783 9.639 16.199 15.536 27.44 15.536h219.764c17.673 0 32-14.327 32-32v-384.004c0-17.673-14.327-32-32-32h-704c-17.673 0-32 14.327-32 32zM304 624c-44.183 0-80-35.817-80-80s35.817-80 80-80c44.183 0 80 35.817 80 80s-35.817 80-80 80zM720 624c-44.183 0-80-35.817-80-80s35.817-80 80-80c44.183 0 80 35.817 80 80s-35.817 80-80 80z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n.playkit-icon-vr-stereo-full {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1024 1024' width='36' height='36'%3E%3Cpath fill='%2301ACCD' d='M864 255.996c53.019 0 96 42.981 96 96v384.004c0 53.019-42.981 96-96 96h-219.764c-33.721 0-64.97-17.693-82.319-46.608l-49.917-83.195-49.917 83.195c-17.349 28.916-48.598 46.608-82.319 46.608h-219.764c-53.019 0-96-42.981-96-96v-384.003c0-53.019 42.981-96 96-96h704zM304 624c44.183 0 80-35.817 80-80s-35.817-80-80-80c-44.183 0-80 35.817-80 80s35.817 80 80 80zM720 624c44.183 0 80-35.817 80-80s-35.817-80-80-80c-44.183 0-80 35.817-80 80s35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E\"); }\n\n.playkit-unmute-button-container {\n  display: inline-block;\n  position: absolute;\n  top: 13px;\n  left: 16px;\n  z-index: 15; }\n  .playkit-unmute-button-container a {\n    color: white; }\n  .playkit-unmute-button-container.playkit-show-icon-only .playkit-btn.playkit-unmute-button {\n    max-width: 64px; }\n    .playkit-unmute-button-container.playkit-show-icon-only .playkit-btn.playkit-unmute-button span {\n      transform: translateX(10px);\n      opacity: 0; }\n\n.playkit-btn.playkit-unmute-button {\n  font-size: 15px;\n  max-width: 200px;\n  transition: max-width 200ms;\n  padding: 0 16px;\n  white-space: nowrap; }\n  .playkit-btn.playkit-unmute-button span {\n    transform: translateX(0px);\n    opacity: 1;\n    transition: transform 100ms, opacity 100ms;\n    display: inline-block; }\n  .playkit-btn.playkit-unmute-button.playkit-has-top-bar {\n    transition: 100ms transform; }\n\n.playkit-unmute-icon-container {\n  width: 32px;\n  height: 32px;\n  display: inline-block;\n  vertical-align: top;\n  position: relative;\n  margin-right: 3px; }\n  .playkit-unmute-icon-container i {\n    position: absolute;\n    top: 0;\n    left: 0; }\n\n.playkit-player.playkit-hover .playkit-unmute-button-container.playkit-has-top-bar,\n.playkit-player.playkit-state-paused .playkit-unmute-button-container.playkit-has-top-bar,\n.playkit-player.playkit-menu-active .playkit-unmute-button-container.playkit-has-top-bar {\n  transform: translateY(32px); }\n\n.playkit-overlay.playkit-error-overlay {\n  background-color: #333;\n  font-size: 0em; }\n\n.playkit-overlay-contents .playkit-error-overlay {\n  padding-top: 20px; }\n\n.playkit-error-overlay {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  height: 100%;\n  font-family: sans-serif; }\n  .playkit-error-overlay .playkit-svg-container {\n    flex: 4;\n    display: flex;\n    justify-content: space-around;\n    flex-flow: column; }\n  .playkit-error-overlay .playkit-headline {\n    color: #FFFFFF;\n    font-size: 18px;\n    margin: 10px 0 14px 0;\n    flex: 1; }\n  .playkit-error-overlay .playkit-error-session {\n    font-size: 14px;\n    color: #ccc;\n    margin-bottom: 20px;\n    user-select: text;\n    -webkit-user-select: text;\n    -moz-user-select: text;\n    -ms-user-select: text;\n    max-width: 300px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    flex: 1; }\n  .playkit-error-overlay .playkit-control-button-container {\n    flex: 5; }\n  .playkit-error-overlay .playkit-retry-btn {\n    height: 36px;\n    width: 120px;\n    border: 2px solid #333;\n    border-radius: 18px;\n    background-color: black;\n    color: #FFFFFF;\n    font-size: 15px;\n    font-weight: bold;\n    line-height: 32px;\n    cursor: pointer; }\n  .playkit-error-overlay .playkit-error-text {\n    height: 0px;\n    visibility: hidden; }\n\n.playkit-link-options-container {\n  width: auto; }\n  .playkit-link-options-container .playkit-copy-url-row .playkit-input-copy-url {\n    margin: 0; }\n  .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url {\n    margin-left: 10px; }\n    .playkit-link-options-container .playkit-copy-url-row .playkit-btn-copy-url .playkit-icon {\n      height: 24px;\n      width: 24px;\n      margin-top: -3px; }\n\n.playkit-slider {\n  height: 8px;\n  border-radius: 4px;\n  background-color: rgba(255, 255, 255, 0.2); }\n  .playkit-slider .playkit-progress {\n    background-color: #01ACCD;\n    height: 8px;\n    border-radius: 4px;\n    position: relative; }\n    .playkit-slider .playkit-progress .playkit-handle {\n      height: 12px;\n      width: 12px;\n      border-radius: 5px;\n      background-color: #FFFFFF;\n      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);\n      position: absolute;\n      right: 0;\n      top: 0px;\n      transform: translate3d(6px, -2px, 0);\n      cursor: pointer; }\n\n.playkit-btn {\n  text-decoration: none;\n  height: 36px;\n  border-radius: 18px;\n  color: #fff;\n  line-height: 36px;\n  font-weight: bold;\n  cursor: pointer;\n  display: inline-block;\n  padding: 0 24px; }\n  .playkit-btn.playkit-btn-block {\n    display: block; }\n  .playkit-btn.playkit-btn-dark-transparent {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px solid rgba(255, 255, 255, 0.2);\n    line-height: 32px; }\n    .playkit-btn.playkit-btn-dark-transparent:hover {\n      color: #fff;\n      border: 2px solid rgba(255, 255, 255, 0.4); }\n  .playkit-btn.playkit-btn-branded {\n    background-color: #01ACCD; }\n    .playkit-btn.playkit-btn-branded:hover {\n      color: #fff; }\n\n.playkit-btn-rounded {\n  height: 36px;\n  width: 36px;\n  min-width: 36px;\n  min-height: 36px;\n  border-radius: 18px;\n  background-color: rgba(0, 0, 0, 0.4);\n  display: inline-block;\n  padding: 2px; }\n\n.playkit-in-browser-fullscreen-mode {\n  width: 100% !important;\n  height: 100% !important;\n  position: fixed !important;\n  top: 0 !important;\n  left: 0 !important;\n  z-index: 999999 !important; }\n\n.playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button {\n  transition: 100ms transform;\n  transform: scale(1); }\n  .playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button .playkit-icon-minimize {\n    display: none; }\n  .playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button.playkit-is-fullscreen .playkit-icon-maximize {\n    display: none; }\n  .playkit-player .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button.playkit-is-fullscreen .playkit-icon-minimize {\n    display: block; }\n\n.playkit-player:not(.playkit-touch) .playkit-control-button-container.playkit-control-fullscreen .playkit-control-button:hover {\n  transform: scale(1.1); }\n\n.playkit-player .playkit-watermark {\n  position: absolute;\n  padding: 5px;\n  transition: visibility 0s 1s, opacity 1s linear, transform ease-out 100ms; }\n  .playkit-player .playkit-watermark.playkit-hide-watermark {\n    visibility: hidden;\n    opacity: 0; }\n  .playkit-player .playkit-watermark.playkit-top {\n    top: 0; }\n  .playkit-player .playkit-watermark.playkit-bottom {\n    bottom: 0; }\n  .playkit-player .playkit-watermark.playkit-right {\n    right: 0; }\n  .playkit-player .playkit-watermark.playkit-left {\n    left: 0; }\n\n.playkit-player:not(.playkit-pre-playback):not(.playkit-overlay-active).playkit-state-paused .playkit-watermark.playkit-bottom,\n.playkit-player:not(.playkit-pre-playback):not(.playkit-overlay-active).playkit-hover .playkit-watermark.playkit-bottom {\n  transform: translateY(-60px); }\n\n.playkit-player a:not([href]):not([tabindex]).playkit-advanced-captions-menu-link {\n  color: #01ACCD;\n  text-decoration: underline; }\n\n.playkit-control-button-container.playkit-control-vr-stereo .playkit-control-button .playkit-icon-vr-stereo-full {\n  display: none; }\n\n.playkit-control-button-container.playkit-control-vr-stereo .playkit-control-button.playkit-vr-stereo-mode .playkit-icon-vr-stereo {\n  display: none; }\n\n.playkit-control-button-container.playkit-control-vr-stereo .playkit-control-button.playkit-vr-stereo-mode .playkit-icon-vr-stereo-full {\n  display: block; }\n", ""]);

// exports
exports.locals = {
	"row": "playkit-row",
	"d-inline-block": "playkit-d-inline-block",
	"dInlineBlock": "playkit-d-inline-block",
	"mobile-hidden-select": "playkit-mobile-hidden-select",
	"mobileHiddenSelect": "playkit-mobile-hidden-select",
	"font-size-base": "playkit-font-size-base",
	"fontSizeBase": "playkit-font-size-base",
	"player": "playkit-player",
	"form-group": "playkit-form-group",
	"formGroup": "playkit-form-group",
	"has-error": "playkit-has-error",
	"hasError": "playkit-has-error",
	"form-control": "playkit-form-control",
	"formControl": "playkit-form-control",
	"has-icon": "playkit-has-icon",
	"hasIcon": "playkit-has-icon",
	"icon": "playkit-icon",
	"checkbox": "playkit-checkbox",
	"form-group-row": "playkit-form-group-row",
	"formGroupRow": "playkit-form-group-row",
	"dropdown": "playkit-dropdown",
	"btn": "playkit-btn",
	"btn-block": "playkit-btn-block",
	"btnBlock": "playkit-btn-block",
	"btn-dark-transparent": "playkit-btn-dark-transparent",
	"btnDarkTransparent": "playkit-btn-dark-transparent",
	"btn-branded": "playkit-btn-branded",
	"btnBranded": "playkit-btn-branded",
	"btn-rounded": "playkit-btn-rounded",
	"btnRounded": "playkit-btn-rounded",
	"icon-maximize": "playkit-icon-maximize",
	"iconMaximize": "playkit-icon-maximize",
	"icon-minimize": "playkit-icon-minimize",
	"iconMinimize": "playkit-icon-minimize",
	"icon-play": "playkit-icon-play",
	"iconPlay": "playkit-icon-play",
	"icon-pause": "playkit-icon-pause",
	"iconPause": "playkit-icon-pause",
	"icon-volume-base": "playkit-icon-volume-base",
	"iconVolumeBase": "playkit-icon-volume-base",
	"icon-volume-waves": "playkit-icon-volume-waves",
	"iconVolumeWaves": "playkit-icon-volume-waves",
	"icon-volume-wave": "playkit-icon-volume-wave",
	"iconVolumeWave": "playkit-icon-volume-wave",
	"icon-volume-mute": "playkit-icon-volume-mute",
	"iconVolumeMute": "playkit-icon-volume-mute",
	"icon-close": "playkit-icon-close",
	"iconClose": "playkit-icon-close",
	"icon-share": "playkit-icon-share",
	"iconShare": "playkit-icon-share",
	"icon-settings": "playkit-icon-settings",
	"iconSettings": "playkit-icon-settings",
	"icon-check": "playkit-icon-check",
	"iconCheck": "playkit-icon-check",
	"icon-language": "playkit-icon-language",
	"iconLanguage": "playkit-icon-language",
	"icon-quality": "playkit-icon-quality",
	"iconQuality": "playkit-icon-quality",
	"icon-captions": "playkit-icon-captions",
	"iconCaptions": "playkit-icon-captions",
	"icon-speed": "playkit-icon-speed",
	"iconSpeed": "playkit-icon-speed",
	"icon-speed-down": "playkit-icon-speed-down",
	"iconSpeedDown": "playkit-icon-speed-down",
	"icon-speed-up": "playkit-icon-speed-up",
	"iconSpeedUp": "playkit-icon-speed-up",
	"icon-audio": "playkit-icon-audio",
	"iconAudio": "playkit-icon-audio",
	"icon-copy": "playkit-icon-copy",
	"iconCopy": "playkit-icon-copy",
	"icon-facebook": "playkit-icon-facebook",
	"iconFacebook": "playkit-icon-facebook",
	"icon-twitter": "playkit-icon-twitter",
	"iconTwitter": "playkit-icon-twitter",
	"icon-google-plus": "playkit-icon-google-plus",
	"iconGooglePlus": "playkit-icon-google-plus",
	"icon-linked-in": "playkit-icon-linked-in",
	"iconLinkedIn": "playkit-icon-linked-in",
	"icon-email": "playkit-icon-email",
	"iconEmail": "playkit-icon-email",
	"icon-embed": "playkit-icon-embed",
	"iconEmbed": "playkit-icon-embed",
	"icon-link": "playkit-icon-link",
	"iconLink": "playkit-icon-link",
	"icon-arrow-down": "playkit-icon-arrow-down",
	"iconArrowDown": "playkit-icon-arrow-down",
	"icon-start-over": "playkit-icon-start-over",
	"iconStartOver": "playkit-icon-start-over",
	"icon-seek-forward": "playkit-icon-seek-forward",
	"iconSeekForward": "playkit-icon-seek-forward",
	"icon-seek-end": "playkit-icon-seek-end",
	"iconSeekEnd": "playkit-icon-seek-end",
	"icon-rewind": "playkit-icon-rewind",
	"iconRewind": "playkit-icon-rewind",
	"icon-rewind-10": "playkit-icon-rewind-10",
	"iconRewind10": "playkit-icon-rewind-10",
	"icon-vr-stereo": "playkit-icon-vr-stereo",
	"iconVrStereo": "playkit-icon-vr-stereo",
	"icon-vr-stereo-full": "playkit-icon-vr-stereo-full",
	"iconVrStereoFull": "playkit-icon-vr-stereo-full",
	"active": "playkit-active",
	"dropdown-menu": "playkit-dropdown-menu",
	"dropdownMenu": "playkit-dropdown-menu",
	"dropdown-button": "playkit-dropdown-button",
	"dropdownButton": "playkit-dropdown-button",
	"openDropmenu": "playkit-openDropmenu",
	"top": "playkit-top",
	"bottom": "playkit-bottom",
	"right": "playkit-right",
	"left": "playkit-left",
	"dropdown-menu-item": "playkit-dropdown-menu-item",
	"dropdownMenuItem": "playkit-dropdown-menu-item",
	"control-button": "playkit-control-button",
	"controlButton": "playkit-control-button",
	"control-button-rounded": "playkit-control-button-rounded",
	"controlButtonRounded": "playkit-control-button-rounded",
	"touch": "playkit-touch",
	"control-button-container": "playkit-control-button-container",
	"controlButtonContainer": "playkit-control-button-container",
	"rotate": "playkit-rotate",
	"spin": "playkit-spin",
	"player-gui": "playkit-player-gui",
	"playerGui": "playkit-player-gui",
	"overlay-active": "playkit-overlay-active",
	"overlayActive": "playkit-overlay-active",
	"metadata-loaded": "playkit-metadata-loaded",
	"metadataLoaded": "playkit-metadata-loaded",
	"state-paused": "playkit-state-paused",
	"statePaused": "playkit-state-paused",
	"menu-active": "playkit-menu-active",
	"menuActive": "playkit-menu-active",
	"nav": "playkit-nav",
	"seek-bar": "playkit-seek-bar",
	"seekBar": "playkit-seek-bar",
	"smart-container-item": "playkit-smart-container-item",
	"smartContainerItem": "playkit-smart-container-item",
	"pre-playback-play-button": "playkit-pre-playback-play-button",
	"prePlaybackPlayButton": "playkit-pre-playback-play-button",
	"sample": "playkit-sample",
	"custom-captions-applied": "playkit-custom-captions-applied",
	"customCaptionsApplied": "playkit-custom-captions-applied",
	"button-save-cvaa": "playkit-button-save-cvaa",
	"buttonSaveCvaa": "playkit-button-save-cvaa",
	"slider": "playkit-slider",
	"live-tag": "playkit-live-tag",
	"liveTag": "playkit-live-tag",
	"ad-break": "playkit-ad-break",
	"adBreak": "playkit-ad-break",
	"hover": "playkit-hover",
	"fullscreen": "playkit-fullscreen",
	"iOS": "playkit-iOS",
	"iOs": "playkit-iOS",
	"video-player": "playkit-video-player",
	"videoPlayer": "playkit-video-player",
	"overlay": "playkit-overlay",
	"openOverlay": "playkit-openOverlay",
	"overlay-contents": "playkit-overlay-contents",
	"overlayContents": "playkit-overlay-contents",
	"title": "playkit-title",
	"close-overlay": "playkit-close-overlay",
	"closeOverlay": "playkit-close-overlay",
	"overlay-screen": "playkit-overlay-screen",
	"overlayScreen": "playkit-overlay-screen",
	"size-md": "playkit-size-md",
	"sizeMd": "playkit-size-md",
	"size-sm": "playkit-size-sm",
	"sizeSm": "playkit-size-sm",
	"smart-container": "playkit-smart-container",
	"smartContainer": "playkit-smart-container",
	"openSmartContainer": "playkit-openSmartContainer",
	"leaving": "playkit-leaving",
	"closeSmartContainer": "playkit-closeSmartContainer",
	"select-menu-item": "playkit-select-menu-item",
	"selectMenuItem": "playkit-select-menu-item",
	"label-icon": "playkit-label-icon",
	"labelIcon": "playkit-label-icon",
	"share-overlay": "playkit-share-overlay",
	"shareOverlay": "playkit-share-overlay",
	"share-icons": "playkit-share-icons",
	"shareIcons": "playkit-share-icons",
	"facebook-share-btn": "playkit-facebook-share-btn",
	"facebookShareBtn": "playkit-facebook-share-btn",
	"twitter-share-btn": "playkit-twitter-share-btn",
	"twitterShareBtn": "playkit-twitter-share-btn",
	"google-plus-share-btn": "playkit-google-plus-share-btn",
	"googlePlusShareBtn": "playkit-google-plus-share-btn",
	"linkedin-share-btn": "playkit-linkedin-share-btn",
	"linkedinShareBtn": "playkit-linkedin-share-btn",
	"share-main-container": "playkit-share-main-container",
	"shareMainContainer": "playkit-share-main-container",
	"link-options-container": "playkit-link-options-container",
	"linkOptionsContainer": "playkit-link-options-container",
	"copy-url-row": "playkit-copy-url-row",
	"copyUrlRow": "playkit-copy-url-row",
	"input-copy-url": "playkit-input-copy-url",
	"inputCopyUrl": "playkit-input-copy-url",
	"btn-copy-url": "playkit-btn-copy-url",
	"btnCopyUrl": "playkit-btn-copy-url",
	"copied": "playkit-copied",
	"video-start-options-row": "playkit-video-start-options-row",
	"videoStartOptionsRow": "playkit-video-start-options-row",
	"cvaa-overlay": "playkit-cvaa-overlay",
	"cvaaOverlay": "playkit-cvaa-overlay",
	"black-bg": "playkit-black-bg",
	"blackBg": "playkit-black-bg",
	"yellow-text": "playkit-yellow-text",
	"yellowText": "playkit-yellow-text",
	"active-tick": "playkit-active-tick",
	"activeTick": "playkit-active-tick",
	"custom-caption-form": "playkit-custom-caption-form",
	"customCaptionForm": "playkit-custom-caption-form",
	"preview-container": "playkit-preview-container",
	"previewContainer": "playkit-preview-container",
	"custom": "playkit-custom",
	"loading-backdrop": "playkit-loading-backdrop",
	"loadingBackdrop": "playkit-loading-backdrop",
	"show": "playkit-show",
	"spinner-container": "playkit-spinner-container",
	"spinnerContainer": "playkit-spinner-container",
	"spinner": "playkit-spinner",
	"kaltura-spinner": "playkit-kaltura-spinner",
	"kalturaSpinner": "playkit-kaltura-spinner",
	"control-play-pause": "playkit-control-play-pause",
	"controlPlayPause": "playkit-control-play-pause",
	"is-playing": "playkit-is-playing",
	"isPlaying": "playkit-is-playing",
	"volume-control": "playkit-volume-control",
	"volumeControl": "playkit-volume-control",
	"volume-control-bar": "playkit-volume-control-bar",
	"volumeControlBar": "playkit-volume-control-bar",
	"is-muted": "playkit-is-muted",
	"isMuted": "playkit-is-muted",
	"dragging-active": "playkit-dragging-active",
	"draggingActive": "playkit-dragging-active",
	"bar": "playkit-bar",
	"progress": "playkit-progress",
	"smart-container-open": "playkit-smart-container-open",
	"smartContainerOpen": "playkit-smart-container-open",
	"in-browser-fullscreen-mode": "playkit-in-browser-fullscreen-mode",
	"inBrowserFullscreenMode": "playkit-in-browser-fullscreen-mode",
	"control-fullscreen": "playkit-control-fullscreen",
	"controlFullscreen": "playkit-control-fullscreen",
	"is-fullscreen": "playkit-is-fullscreen",
	"isFullscreen": "playkit-is-fullscreen",
	"time-preview": "playkit-time-preview",
	"timePreview": "playkit-time-preview",
	"frame-preview": "playkit-frame-preview",
	"framePreview": "playkit-frame-preview",
	"progress-bar": "playkit-progress-bar",
	"progressBar": "playkit-progress-bar",
	"scrubber": "playkit-scrubber",
	"virtual-progress": "playkit-virtual-progress",
	"virtualProgress": "playkit-virtual-progress",
	"live": "playkit-live",
	"buffered": "playkit-buffered",
	"frame-preview-img": "playkit-frame-preview-img",
	"framePreviewImg": "playkit-frame-preview-img",
	"time-display": "playkit-time-display",
	"timeDisplay": "playkit-time-display",
	"video-playing-title": "playkit-video-playing-title",
	"videoPlayingTitle": "playkit-video-playing-title",
	"bottom-bar": "playkit-bottom-bar",
	"bottomBar": "playkit-bottom-bar",
	"left-controls": "playkit-left-controls",
	"leftControls": "playkit-left-controls",
	"right-controls": "playkit-right-controls",
	"rightControls": "playkit-right-controls",
	"top-bar": "playkit-top-bar",
	"topBar": "playkit-top-bar",
	"overlay-action": "playkit-overlay-action",
	"overlayAction": "playkit-overlay-action",
	"in": "playkit-in",
	"overlayActionIconIn": "playkit-overlayActionIconIn",
	"pre-playback-play-overlay": "playkit-pre-playback-play-overlay",
	"prePlaybackPlayOverlay": "playkit-pre-playback-play-overlay",
	"has-poster": "playkit-has-poster",
	"hasPoster": "playkit-has-poster",
	"pre-playback": "playkit-pre-playback",
	"prePlayback": "playkit-pre-playback",
	"btn-skip-ad": "playkit-btn-skip-ad",
	"btnSkipAd": "playkit-btn-skip-ad",
	"skip-ad": "playkit-skip-ad",
	"skipAd": "playkit-skip-ad",
	"non-live-playhead": "playkit-non-live-playhead",
	"nonLivePlayhead": "playkit-non-live-playhead",
	"unmute-button-container": "playkit-unmute-button-container",
	"unmuteButtonContainer": "playkit-unmute-button-container",
	"show-icon-only": "playkit-show-icon-only",
	"showIconOnly": "playkit-show-icon-only",
	"unmute-button": "playkit-unmute-button",
	"unmuteButton": "playkit-unmute-button",
	"has-top-bar": "playkit-has-top-bar",
	"hasTopBar": "playkit-has-top-bar",
	"unmute-icon-container": "playkit-unmute-icon-container",
	"unmuteIconContainer": "playkit-unmute-icon-container",
	"error-overlay": "playkit-error-overlay",
	"errorOverlay": "playkit-error-overlay",
	"svg-container": "playkit-svg-container",
	"svgContainer": "playkit-svg-container",
	"headline": "playkit-headline",
	"error-session": "playkit-error-session",
	"errorSession": "playkit-error-session",
	"retry-btn": "playkit-retry-btn",
	"retryBtn": "playkit-retry-btn",
	"error-text": "playkit-error-text",
	"errorText": "playkit-error-text",
	"handle": "playkit-handle",
	"watermark": "playkit-watermark",
	"hide-watermark": "playkit-hide-watermark",
	"hideWatermark": "playkit-hide-watermark",
	"advanced-captions-menu-link": "playkit-advanced-captions-menu-link",
	"advancedCaptionsMenuLink": "playkit-advanced-captions-menu-link",
	"control-vr-stereo": "playkit-control-vr-stereo",
	"controlVrStereo": "playkit-control-vr-stereo",
	"vr-stereo-mode": "playkit-vr-stereo-mode",
	"vrStereoMode": "playkit-vr-stereo-mode"
};

/***/ }),
/* 112 */
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
/* 113 */
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

var	fixUrls = __webpack_require__(114);

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
/* 114 */
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


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * VideoPlayer component
 *
 * @class VideoPlayer
 * @example <VideoPlayer>...</VideoPlayer>
 * @extends {Component}
 */
var VideoPlayer = function (_Component) {
  _inherits(VideoPlayer, _Component);

  function VideoPlayer() {
    _classCallCheck(this, VideoPlayer);

    return _possibleConstructorReturn(this, (VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).apply(this, arguments));
  }

  _createClass(VideoPlayer, [{
    key: 'shouldComponentUpdate',


    /**
     * this component should not render itself when player object changes.
     *
     * @returns {void}
     * @memberof VideoPlayer
     */
    value: function shouldComponentUpdate() {
      return false;
    }

    /**
     * appending the player view to component after the component was mounted
     *
     * @returns {void}
     * @memberof VideoPlayer
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._el.appendChild(this.props.player.getView());
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof VideoPlayer
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return (0, _preact.h)('div', { className: _style2.default.videoPlayer, ref: function ref(c) {
          return _this2._el = c;
        } });
    }
  }]);

  return VideoPlayer;
}(_preact.Component);

exports.VideoPlayer = VideoPlayer;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerGUI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

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
        isLive: state.engine.isLive,
        hasError: state.engine.hasError,
        isIdle: state.engine.isIdle
      }
    },
    config: state.config
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
exports.PlayerGUI = PlayerGUI;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idleUI = idleUI;

var _preact = __webpack_require__(0);

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _loading = __webpack_require__(15);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Idle ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
function idleUI(props) {
  return (0, _preact.h)(
    'div',
    { className: _style2.default.playbackGuiWWrapper },
    (0, _preact.h)(_loading2.default, { player: props.player })
  );
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _loading = __webpack_require__(19);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _eventManager = __webpack_require__(9);

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
    isMobile: state.shell.isMobile,
    adBreak: state.engine.adBreak,
    adIsLinear: state.engine.adIsLinear
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

    var _this = _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, { name: 'Loading', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    _this.setState({ afterPlayingEvent: false });
    return _this;
  }

  /**
   * after component mounted, set event listener to player state change and update the state of loading spinner accordingly.
   *
   * @returns {void}
   * @memberof Loading
   */


  _createClass(Loading, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._eventManager.listen(this.player, this.player.Event.PLAYER_STATE_CHANGED, function (e) {
        if (!_this2.state.afterPlayingEvent) return;
        var StateType = _this2.player.State;
        if (e.payload.newState.type === StateType.IDLE || e.payload.newState.type === StateType.PLAYING || e.payload.newState.type === StateType.PAUSED) {
          _this2.props.updateLoadingSpinnerState(false);
        } else {
          _this2.props.updateLoadingSpinnerState(true);
        }
      });

      this._eventManager.listen(this.player, this.player.Event.SOURCE_SELECTED, function () {
        if (_this2.player.config.playback.autoplay) {
          _this2.props.updateLoadingSpinnerState(true);
        } else {
          _this2.props.updateLoadingSpinnerState(false);
        }
      });

      this._eventManager.listen(this.player, this.player.Event.AD_BREAK_START, function () {
        _this2.props.updateLoadingSpinnerState(true);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_LOADED, function () {
        _this2.props.updateLoadingSpinnerState(true);
      });

      this._eventManager.listen(this.player, this.player.Event.AD_STARTED, function () {
        if (_this2.props.adIsLinear) {
          _this2.props.updateLoadingSpinnerState(false);
        }
      });

      this._eventManager.listen(this.player, this.player.Event.ALL_ADS_COMPLETED, function () {
        _this2.props.updateLoadingSpinnerState(false);
      });

      this._eventManager.listen(this.player, this.player.Event.AUTOPLAY_FAILED, function () {
        _this2.props.updateLoadingSpinnerState(false);
      });

      this._eventManager.listen(this.player, this.player.Event.PLAYING, function () {
        _this2.setState({ afterPlayingEvent: true });
        _this2.props.updateLoadingSpinnerState(false);
      });

      this._eventManager.listen(this.player, this.player.Event.CHANGE_SOURCE_STARTED, function () {
        _this2.setState({ afterPlayingEvent: false });
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
        { className: [_style2.default.loadingBackdrop, _style2.default.show].join(' ') },
        (0, _preact.h)(
          'div',
          { className: _style2.default.spinnerContainer },
          (0, _preact.h)(
            'div',
            { className: _style2.default.spinner },
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
exports.Loading = Loading;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playbackUI = playbackUI;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _overlayAction = __webpack_require__(36);

var _prePlaybackPlayOverlay = __webpack_require__(38);

var _loading = __webpack_require__(15);

var _playPause = __webpack_require__(22);

var _rewind = __webpack_require__(61);

var _seekbarPlaybackContainer = __webpack_require__(62);

var _volume = __webpack_require__(23);

var _settings = __webpack_require__(42);

var _language = __webpack_require__(46);

var _fullscreen = __webpack_require__(24);

var _vrStereoToggle = __webpack_require__(166);

var _timeDisplayPlaybackContainer = __webpack_require__(69);

var _bottomBar = __webpack_require__(25);

var _overlayPortal = __webpack_require__(48);

var _keyboard = __webpack_require__(26);

var _unmuteIndication = __webpack_require__(27);

var _watermark = __webpack_require__(49);

var _componentConfig = __webpack_require__(18);

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
    { className: _style2.default.playbackGuiWWrapper },
    (0, _preact.h)(_keyboard.KeyboardControl, { player: props.player, config: props.config }),
    (0, _preact.h)(_loading.Loading, { player: props.player }),
    (0, _preact.h)(
      'div',
      { className: _style2.default.playerGui, id: 'player-gui' },
      (0, _preact.h)(_overlayPortal.OverlayPortal, null),
      (0, _preact.h)(_unmuteIndication.UnmuteIndication, { player: props.player }),
      (0, _preact.h)(_overlayAction.OverlayAction, { player: props.player }),
      (0, _preact.h)(
        _bottomBar.BottomBar,
        null,
        (0, _preact.h)(_seekbarPlaybackContainer.SeekBarPlaybackContainer, { showFramePreview: true,
          showTimeBubble: true,
          player: props.player,
          playerContainer: props.playerContainer }),
        (0, _preact.h)(
          'div',
          { className: _style2.default.leftControls },
          (0, _preact.h)(_playPause.PlayPauseControl, { player: props.player }),
          (0, _preact.h)(_rewind.RewindControl, { player: props.player, step: 10 }),
          (0, _preact.h)(_timeDisplayPlaybackContainer.TimeDisplayPlaybackContainer, { format: 'current / total' })
        ),
        (0, _preact.h)(
          'div',
          { className: _style2.default.rightControls },
          props.player.isVr() && (0, _componentConfig.shouldRenderComponent)(props.config, _vrStereoToggle.VrStereoToggleControl.displayName) ? (0, _preact.h)(_vrStereoToggle.VrStereoToggleControl, { player: props.player }) : undefined,
          (0, _preact.h)(_volume.VolumeControl, { player: props.player }),
          (0, _preact.h)(_language.LanguageControl, { player: props.player }),
          (0, _preact.h)(_settings.SettingsControl, { player: props.player }),
          (0, _preact.h)(_fullscreen.FullscreenControl, { player: props.player })
        )
      )
    ),
    (0, _preact.h)(_prePlaybackPlayOverlay.PrePlaybackPlayOverlay, { player: props.player }),
    (0, _componentConfig.shouldRenderComponent)(props.config, _watermark.Watermark.displayName) ? (0, _preact.h)(_watermark.Watermark, { player: props.player }) : undefined
  );
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayAction = exports.OVERLAY_ACTION_DEFAULT_TIMEOUT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _overlayAction = __webpack_require__(21);

var _shell = __webpack_require__(7);

var _base = __webpack_require__(3);

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
    iconType: state.overlayAction.iconType,
    isPlaying: state.engine.isPlaying,
    adBreak: state.engine.adBreak,
    adIsPlaying: state.engine.adIsPlaying,
    playerHover: state.shell.playerHover,
    isMobile: state.shell.isMobile,
    isVr: state.engine.isVr
  };
};

/**
 * Default overlay action timeout
 * @type {number}
 * @const
 */
var OVERLAY_ACTION_DEFAULT_TIMEOUT = exports.OVERLAY_ACTION_DEFAULT_TIMEOUT = 300;

/**
 * The buffer before
 * @type {number}
 * @const
 */
var PLAY_PAUSE_BUFFER_TIME = 200;

/**
 * The maximum time two click would be considered a double click
 * @type {number}
 * @const
 */
var DOUBLE_CLICK_MAX_BUFFER_TIME = 500;

/**
 * The maximum distance between 'pointerdown' point and 'pointerup' point to still be considered as click and not as dragging
 * @type {number}
 * @const
 */
var DRAGGING_THRESHOLD = 5;

/**
 * OverlayAction component
 *
 * @class OverlayAction
 * @example <OverlayAction player={this.player} />
 * @extends {BaseComponent}
 */
var OverlayAction = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(Object.assign(_overlayAction.actions, _shell.actions))), _dec(_class = function (_BaseComponent) {
  _inherits(OverlayAction, _BaseComponent);

  /**
   * Creates an instance of OverlayAction.
   * @param {Object} obj obj
   * @memberof OverlayAction
   */
  function OverlayAction(obj) {
    _classCallCheck(this, OverlayAction);

    var _this = _possibleConstructorReturn(this, (OverlayAction.__proto__ || Object.getPrototypeOf(OverlayAction)).call(this, { name: 'OverlayAction', player: obj.player }));

    _this._iconTimeout = null;
    _this._pointerDownPosX = NaN;
    _this._pointerDownPosY = NaN;
    _this._firstClickTime = 0;
    _this._clickTimeout = 0;
    return _this;
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof OverlayAction
   */


  _createClass(OverlayAction, [{
    key: 'isPlayingAdOrPlayback',
    value: function isPlayingAdOrPlayback() {
      return this.props.adBreak && this.props.adIsPlaying || !this.props.adBreak && this.props.isPlaying;
    }

    /**
     * toggle play pause and set animation to icon change
     *
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'togglePlayPause',
    value: function togglePlayPause() {
      if (this.isPlayingAdOrPlayback()) {
        this.player.pause();
        this.props.updateOverlayActionIcon(_icon.IconType.Pause);
      } else {
        this.player.play();
        this.props.updateOverlayActionIcon(_icon.IconType.Play);
      }
      this.props.updatePlayerHoverState(true);
      this.notifyClick({
        type: 'PlayPause'
      });
    }

    /**
     * toggle exit-enter fullscreen
     *
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'toggleFullscreen',
    value: function toggleFullscreen() {
      if (!this.player.isFullscreen()) {
        this.logger.debug("Enter fullscreen");
        this.player.enterFullscreen();
      } else {
        this.logger.debug("Exit fullscreen");
        this.player.exitFullscreen();
      }
      this.notifyClick({
        type: 'Fullscreen'
      });
    }

    /**
     * Handler for overlay pointer (mouse/touch) down
     *
     * @param {*} event - mousedown/touchstart event
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'onOverlayPointerDown',
    value: function onOverlayPointerDown(event) {
      this._pointerDownPosX = event.clientX || event.changedTouches[0].clientX;
      this._pointerDownPosY = event.clientY || event.changedTouches[0].clientY;
    }

    /**
     * Handler for overlay mouse up
     *
     * @param {*} event - mouseup event
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'onOverlayMouseUp',
    value: function onOverlayMouseUp(event) {
      if (!this.props.isVr || !this.isDragging(event)) {
        this.onOverlayClick();
      }
    }

    /**
     * handler for overlay touch end
     *
     * @param {*} event - touchend event
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'onOverlayTouchEnd',
    value: function onOverlayTouchEnd(event) {
      if (this.props.playerHover && (!this.props.isVr || !this.isDragging(event))) {
        this.togglePlayPause();
      }
    }

    /**
     * Whether the user is dragging
     *
     * @param {*} event - mouseup/touchend event
     * @returns {boolean} - is dragging
     */

  }, {
    key: 'isDragging',
    value: function isDragging(event) {
      var points = {
        clientX: event.clientX || event.changedTouches[0] && event.changedTouches[0].clientX,
        clientY: event.clientY || event.changedTouches[0] && event.changedTouches[0].clientY
      };
      return Math.abs(points.clientX - this._pointerDownPosX) > DRAGGING_THRESHOLD || Math.abs(points.clientY - this._pointerDownPosY) > DRAGGING_THRESHOLD;
    }

    /**
     * Handler for overlay click
     *
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'onOverlayClick',
    value: function onOverlayClick() {
      var _this2 = this;

      if (this.props.isMobile) {
        return;
      }

      var now = Date.now();
      if (now - this._firstClickTime < PLAY_PAUSE_BUFFER_TIME) {
        this.cancelClickTimeout();
        this.toggleFullscreen();
        return;
      }
      if (now - this._firstClickTime < DOUBLE_CLICK_MAX_BUFFER_TIME) {
        this.cancelClickTimeout();
        this.togglePlayPause();
        this.toggleFullscreen();
        this._firstClickTime = 0;
        return;
      }

      this._firstClickTime = now;
      this._clickTimeout = setTimeout(function () {
        _this2._clickTimeout = null;
        _this2.togglePlayPause();
      }, PLAY_PAUSE_BUFFER_TIME);
    }

    /**
     * cancel the clickTimeout
     *
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'cancelClickTimeout',
    value: function cancelClickTimeout() {
      if (this._clickTimeout) {
        clearTimeout(this._clickTimeout);
        this._clickTimeout = null;
      }
    }

    /**
     * should component update handler
     *
     * @returns {boolean} - always update component
     * @param {Object} nextProps - next props of the component
     * @memberof OverlayAction
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.iconType) {
        this.toggleOverlayActionIcon(nextProps.iconType);
      }
      return true;
    }

    /**
     * toggles the overlay action icon
     *
     * @param {string | Array<string>} iconType - the icon string or array of icon strings
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'toggleOverlayActionIcon',
    value: function toggleOverlayActionIcon(iconType) {
      var _this3 = this;

      if (this._iconTimeout !== null) {
        clearTimeout(this._iconTimeout);
        this._iconTimeout = null;
        this.setState({ animation: false });
        this.forceUpdate();
      }
      this.setState({ animation: true, iconType: iconType });
      this._iconTimeout = setTimeout(function () {
        _this3.setState({ animation: false });
      }, OVERLAY_ACTION_DEFAULT_TIMEOUT);
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof OverlayAction
     */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return (0, _preact.h)(
        'div',
        { className: _style2.default.overlayAction + ' ' + (this.state.animation ? _style2.default.in : ''),
          onMouseDown: function onMouseDown(e) {
            return _this4.onOverlayPointerDown(e);
          },
          onTouchStart: function onTouchStart(e) {
            return _this4.onOverlayPointerDown(e);
          },
          onMouseUp: function onMouseUp(e) {
            return _this4.onOverlayMouseUp(e);
          },
          onTouchEnd: function onTouchEnd(e) {
            return _this4.onOverlayTouchEnd(e);
          } },
        this.state.animation ? this.renderIcons() : undefined
      );
    }

    /**
     * renders the icons
     *
     * @returns {React$Element} - icon element/s
     * @memberof OverlayAction
     */

  }, {
    key: 'renderIcons',
    value: function renderIcons() {
      if (Array.isArray(this.state.iconType)) {
        return this.state.iconType.map(function (i, x) {
          return (0, _preact.h)(_icon2.default, { key: x, type: i });
        });
      }
      return (0, _preact.h)(_icon2.default, { type: this.state.iconType });
    }

    /**
     * component did update handler
     *
     * @returns {void}
     * @memberof OverlayAction
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.animation) {
        this.props.updateOverlayActionIcon(null);
      }
    }
  }]);

  return OverlayAction;
}(_base2.default)) || _class);
exports.OverlayAction = OverlayAction;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrePlaybackPlayOverlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _shell = __webpack_require__(7);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

var _loading = __webpack_require__(19);

var _eventManager = __webpack_require__(9);

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
    isEnded: state.engine.isEnded,
    loading: state.loading.show
  };
};

/**
 * PrePlaybackPlayOverlay component
 *
 * @class PrePlaybackPlayOverlay
 * @example <PrePlaybackPlayOverlay player={this.player} />
 * @extends {BaseComponent}
 */
var PrePlaybackPlayOverlay = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(Object.assign(_shell.actions, _loading.actions))), _dec(_class = function (_BaseComponent) {
  _inherits(PrePlaybackPlayOverlay, _BaseComponent);

  /**
   * Creates an instance of PrePlaybackPlayOverlay.
   * @param {Object} obj obj
   * @memberof PrePlaybackPlayOverlay
   */
  function PrePlaybackPlayOverlay(obj) {
    _classCallCheck(this, PrePlaybackPlayOverlay);

    var _this = _possibleConstructorReturn(this, (PrePlaybackPlayOverlay.__proto__ || Object.getPrototypeOf(PrePlaybackPlayOverlay)).call(this, { name: 'PrePlaybackPlayOverlay', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    _this._eventManager.listen(_this.player, _this.player.Event.CHANGE_SOURCE_ENDED, function () {
      return _this._onChangeSourceEnded();
    });
    return _this;
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
      var _this2 = this;

      this.props.addPlayerClass(_style2.default.prePlayback);
      try {
        this.autoplay = this.player.config.playback.autoplay;
        if (this.autoplay === true) {
          this._eventManager.listen(this.player, this.player.Event.AUTOPLAY_FAILED, function () {
            _this2.autoplay = false;
            _this2.forceUpdate();
          });
        }
      } catch (e) {
        // eslint-disable-line no-unused-vars
        this.autoplay = false;
      }
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
      this._hidePrePlayback();
      this.props.removePlayerClass(_style2.default.prePlayback);
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
      var _this3 = this;

      this._eventManager.listen(this.player, this.player.Event.PLAY, function () {
        return _this3._hidePrePlayback();
      });
      if (this.player.paused === false) {
        this._hidePrePlayback();
      }
    }

    /**
     * change in component props or state shouldn't render the component again
     *
     * @returns {boolean} shouldComponentUpdate
     * @param {Object} nextProps - nextProps
     * @memberof PrePlaybackPlayOverlay
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.isEnded) {
        this.props.addPlayerClass(_style2.default.prePlayback);
      }
      return true;
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
      this.player.getView().focus();
      this.player.play();
      if (this.props.prePlayback) {
        this._hidePrePlayback();
        this.props.updateLoadingSpinnerState(true);
        this.notifyClick();
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
      var _this4 = this;

      if (!props.isEnded && !props.prePlayback || !props.isEnded && this.autoplay || props.loading) {
        return undefined;
      }
      var rootStyle = {},
          rootClass = [_style2.default.prePlaybackPlayOverlay];

      if (!props.prePlayback && props.poster) {
        rootStyle = { backgroundImage: 'url(' + props.poster + ')' };
        rootClass.push(_style2.default.hasPoster);
      }

      return (0, _preact.h)(
        'div',
        {
          className: rootClass.join(' '),
          style: rootStyle,
          onMouseOver: function onMouseOver(e) {
            return e.stopPropagation();
          },
          onClick: function onClick() {
            return _this4.handleClick();
          } },
        (0, _preact.h)(
          'a',
          { className: _style2.default.prePlaybackPlayButton,
            tabIndex: '0',
            onKeyDown: function onKeyDown(e) {
              if (e.keyCode === _keyMap.KeyMap.ENTER) {
                _this4.handleClick();
              }
            } },
          props.isEnded ? (0, _preact.h)(_icon2.default, { type: _icon.IconType.StartOver }) : (0, _preact.h)(_icon2.default, { type: _icon.IconType.Play })
        )
      );
    }

    /**
     * Change source ended event handler.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onChangeSourceEnded',
    value: function _onChangeSourceEnded() {
      try {
        if (!this.player.config.playback.autoplay) {
          this._displayPrePlayback();
        }
      } catch (e) {
        this.logger.error(e.message);
      }
    }

    /**
     * Displays the pre playback overlay.
     * @private
     * @returns {void}
     */

  }, {
    key: '_displayPrePlayback',
    value: function _displayPrePlayback() {
      this.props.updatePrePlayback(true);
      this.props.addPlayerClass(_style2.default.prePlayback);
    }

    /**
     * Hides the pre playback overlay.
     * @private
     * @returns {void}
     */

  }, {
    key: '_hidePrePlayback',
    value: function _hidePrePlayback() {
      this.props.updatePrePlayback(false);
      this.props.removePlayerClass(_style2.default.prePlayback);
    }
  }]);

  return PrePlaybackPlayOverlay;
}(_base2.default)) || _class);
exports.PrePlaybackPlayOverlay = PrePlaybackPlayOverlay;

/***/ }),
/* 122 */,
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayPauseControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _preactRedux = __webpack_require__(2);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

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
var PlayPauseControl = (_dec = (0, _preactRedux.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
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
      this.notifyClick();
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

      var controlButtonClass = this.isPlayingAdOrPlayback() ? [_style2.default.controlButton, _style2.default.isPlaying].join(' ') : _style2.default.controlButton;
      return (0, _preact.h)(
        'div',
        { className: [_style2.default.controlButtonContainer, _style2.default.controlPlayPause].join(' ') },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              tabIndex: '0',
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: this.isPlayingAdOrPlayback() ? 'controls.pause' : 'controls.play' }),
              className: controlButtonClass,
              onClick: function onClick() {
                return _this2.togglePlayPause();
              },
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.togglePlayPause();
                }
              } },
            props.isEnded && !props.adBreak ? (0, _preact.h)(_icon2.default, { type: _icon.IconType.StartOver }) : (0, _preact.h)(
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
exports.PlayPauseControl = PlayPauseControl;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewindControl = exports.REWIND_DEFAULT_STEP = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Default rewind step
 * @type {number}
 * @const
 */
var REWIND_DEFAULT_STEP = exports.REWIND_DEFAULT_STEP = 10;

/**
 * RewindControl component
 *
 * @class RewindControl
 * @example <RewindControl player={this.player} step={5} />
 * @extends {BaseComponent}
 */

var RewindControl = function (_BaseComponent) {
  _inherits(RewindControl, _BaseComponent);

  /**
   * Creates an instance of RewindControl.
   * @param {Object} obj obj
   * @memberof RewindControl
   */
  function RewindControl(obj) {
    _classCallCheck(this, RewindControl);

    return _possibleConstructorReturn(this, (RewindControl.__proto__ || Object.getPrototypeOf(RewindControl)).call(this, { name: 'Rewind', player: obj.player }));
  }

  /**
   * rewind click handler
   *
   * @returns {void}
   * @memberof RewindControl
   */


  _createClass(RewindControl, [{
    key: 'onClick',
    value: function onClick() {
      this.animate();
      var to = void 0;
      var step = this.props.step || REWIND_DEFAULT_STEP;
      var from = this.player.currentTime;
      if (this.player.currentTime - step < 0) {
        to = 0;
      } else {
        to = this.player.currentTime - step;
      }
      this.player.currentTime = to;
      this.notifyClick({
        from: from,
        to: to
      });
    }

    /**
     * toggles the animation state to activate the rotate animation
     *
     * @returns {void}
     * @memberof RewindControl
     */

  }, {
    key: 'animate',
    value: function animate() {
      this.setState({ animation: false });
      this.forceUpdate();
      this.setState({ animation: true });
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof RewindControl
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        { className: [_style2.default.controlButtonContainer, _style2.default.controlRewind].join(' ') },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              tabIndex: '0',
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.rewind' }),
              className: _style2.default.controlButton + ' ' + (this.state.animation ? _style2.default.rotate : ''),
              onClick: function onClick() {
                return _this2.onClick();
              },
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.onClick();
                }
              } },
            (0, _preact.h)(_icon2.default, { type: !props.step || props.step === REWIND_DEFAULT_STEP ? _icon.IconType.Rewind10 : _icon.IconType.Rewind })
          )
        )
      );
    }
  }]);

  return RewindControl;
}(_base2.default);

exports.RewindControl = RewindControl;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekBarPlaybackContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _seekbar = __webpack_require__(17);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _seekbar2 = __webpack_require__(39);

var _eventManager = __webpack_require__(9);

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

    var _this = _possibleConstructorReturn(this, (SeekBarPlaybackContainer.__proto__ || Object.getPrototypeOf(SeekBarPlaybackContainer)).call(this, { name: 'SeekBarPlaybackContainer', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    return _this;
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

      this._eventManager.listen(this.player, this.player.Event.TIME_UPDATE, function () {
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

      return (0, _preact.h)(_seekbar2.SeekBarControl, {
        player: this.props.player,
        playerElement: this.props.playerContainer,
        showFramePreview: this.props.showFramePreview,
        showTimeBubble: this.props.showTimeBubble,
        changeCurrentTime: function changeCurrentTime(time) {
          return _this3.player.currentTime = time;
        },
        playerPoster: this.props.poster,
        updateSeekbarDraggingStatus: function updateSeekbarDraggingStatus(data) {
          return _this3.props.updateSeekbarDraggingStatus(data);
        },
        updateSeekbarHoverActive: function updateSeekbarHoverActive(data) {
          return _this3.props.updateSeekbarHoverActive(data);
        },
        updateCurrentTime: function updateCurrentTime(data) {
          return _this3.props.updateCurrentTime(data);
        },
        currentTime: this.props.currentTime,
        duration: this.props.duration,
        isDraggingActive: this.props.isDraggingActive,
        isMobile: this.props.isMobile,
        notifyChange: function notifyChange(payload) {
          return _this3.notifyChange(payload);
        }
      });
    }
  }]);

  return SeekBarPlaybackContainer;
}(_base2.default)) || _class);
exports.SeekBarPlaybackContainer = SeekBarPlaybackContainer;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekBarControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _timeFormat = __webpack_require__(40);

var _keyMap = __webpack_require__(6);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _shell = __webpack_require__(7);

var _keyboard = __webpack_require__(41);

var _bindMethod = __webpack_require__(11);

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
    config: state.config.components.seekbar,
    isMobile: state.shell.isMobile
  };
};

/**
 * SeekBarControl component
 *
 * @class SeekBarControl
 * @extends {Component}
 */
var SeekBarControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_shell.actions)), _dec(_class = function (_Component) {
  _inherits(SeekBarControl, _Component);

  /**
   * Creates an instance of SeekBarControl.
   * @memberof SeekBarControl
   */
  function SeekBarControl() {
    _classCallCheck(this, SeekBarControl);

    var _this = _possibleConstructorReturn(this, (SeekBarControl.__proto__ || Object.getPrototypeOf(SeekBarControl)).call(this));

    _this.onPlayerMouseUp = (0, _bindMethod.bindMethod)(_this, _this.onPlayerMouseUp);
    _this.onPlayerMouseMove = (0, _bindMethod.bindMethod)(_this, _this.onPlayerMouseMove);
    return _this;
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof SeekBarControl
   */


  _createClass(SeekBarControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ virtualTime: 0 });
    }

    /**
     * on component mount, bind mouseup and mousemove events to top player element
     *
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mouseup', this.onPlayerMouseUp);
      document.addEventListener('mousemove', this.onPlayerMouseMove);
    }

    /**
     * before component unmounted, remove event listeners
     *
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.onPlayerMouseUp);
      document.removeEventListener('mousemove', this.onPlayerMouseMove);
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
      if (this.props.isMobile) {
        return;
      }
      e.preventDefault(); // fixes firefox mouseup not firing after dragging the scrubber
      this.props.updateSeekbarDraggingStatus(true);
      if (this.props.isDraggingActive) {
        var time = this.getTime(e);
        this.updateSeekBarProgress(time, this.props.duration);
      }
    }

    /**
     * onTap event handler
     *
     * @param {Event} e - onClick event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onTap',
    value: function onTap(e) {
      if (!this.props.isMobile) {
        return;
      }
      var oldTime = this.props.player.currentTime;
      var newTime = this.getTime(e);
      this.props.changeCurrentTime(newTime);
      this.updateSeekBarProgress(newTime, this.props.duration);
      this.props.updateSeekbarDraggingStatus(false);
      this.props.notifyChange({
        from: oldTime,
        to: newTime
      });
    }

    /**
     * player mouse up handler for seekbar porpuses
     *
     * @param {Event} e - mouse up event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onPlayerMouseUp',
    value: function onPlayerMouseUp(e) {
      if (this.props.isMobile) {
        return;
      }
      if (this.props.isDraggingActive) {
        var oldTime = this.props.player.currentTime;
        var newTime = this.getTime(e);
        this.props.changeCurrentTime(newTime);
        this.updateSeekBarProgress(newTime, this.props.duration);
        this.props.updateSeekbarDraggingStatus(false);
        this.props.notifyChange({
          from: oldTime,
          to: newTime
        });
      }
    }

    /**
     * player mouse move handler for seekbar porpuses
     *
     * @param {Event} e - mouse move event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onPlayerMouseMove',
    value: function onPlayerMouseMove(e) {
      if (this.props.isMobile) {
        return;
      }
      if (this.props.isDraggingActive) {
        var time = this.getTime(e);
        this.updateSeekBarProgress(time, this.props.duration);
        this.updateSeekBarProgress(time, this.props.duration, true);
      }
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
      if (this.props.isMobile) {
        return;
      }
      var time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration, true);
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
      e.preventDefault();
    }

    /**
     * seekbar key down handler
     *
     * @param {KeyboardEvent} e - keyboard event
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarKeyDown',
    value: function onSeekbarKeyDown(e) {
      var _this2 = this;

      if (this.props.adBreak) {
        return;
      }
      /**
       * Do seek operations.
       * @param {number} from - Seek start point.
       * @param {number} to - Seek end point.
       * @returns {void}
       */
      var seek = function seek(from, to) {
        _this2.props.player.currentTime = to;
        _this2.updateSeekBarProgress(_this2.props.player.currentTime, _this2.props.duration, true);
        _this2.props.notifyChange({
          from: from,
          to: to
        });
      };
      var newTime = void 0;
      switch (e.keyCode) {
        case _keyMap.KeyMap.LEFT:
          newTime = this.props.player.currentTime - _keyboard.KEYBOARD_DEFAULT_SEEK_JUMP > 0 ? this.props.player.currentTime - 5 : 0;
          seek(this.props.player.currentTime, newTime);
          break;
        case _keyMap.KeyMap.RIGHT:
          newTime = this.props.player.currentTime + _keyboard.KEYBOARD_DEFAULT_SEEK_JUMP > this.props.player.duration ? this.props.player.duration : this.props.player.currentTime + 5;
          seek(this.props.player.currentTime, newTime);
          break;
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
        var oldTime = this.props.player.currentTime;
        var newTime = this._movex;
        this.props.changeCurrentTime(newTime);
        this.updateSeekBarProgress(newTime, this.props.duration);
        this.props.notifyChange({
          from: oldTime,
          to: newTime
        });
      }
      this.props.updateSeekbarDraggingStatus(false);
    }

    /**
     * seekbar mouse over handler
     *
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarMouseOver',
    value: function onSeekbarMouseOver() {
      if (this.props.isMobile) return;
      this.props.updateSeekbarHoverActive(true);
    }

    /**
     * seekbar mouse leave handler
     *
     * @returns {void}
     * @memberof SeekBarControl
     */

  }, {
    key: 'onSeekbarMouseLeave',
    value: function onSeekbarMouseLeave() {
      if (this.props.isMobile) return;
      this.props.updateSeekbarHoverActive(false);
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
      //offset 0 is forced to handle browser compatibility issue
      if (this.props.player.isFullscreen()) {
        _x = 0;
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
     * get current buffered percent from the player
     *
     * @returns {number} - current buffered percent
     * @memberof SeekBarControl
     */

  }, {
    key: 'getBufferedPercent',
    value: function getBufferedPercent() {
      if (this.props.player.duration > 0 && this.props.player.buffered.length > 0) {
        var buffered = this.props.player.isLive() ? this.props.player.buffered.end(0) - this.props.player.getStartTimeOfDvrWindow() : this.props.player.buffered.end(0);
        var bufferedPercent = buffered / this.props.player.duration * 100;
        return bufferedPercent < 100 ? bufferedPercent : 100;
      }
      return 0;
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
      var percent = this.state.virtualTime / this.props.duration;
      var sliceIndex = Math.ceil(this.props.config.thumbsSlices * percent);
      return -(sliceIndex * this.props.config.thumbsWidth) + 'px 0px';
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
      if (this._seekBarElement && this._framePreviewElement) {
        var leftOffset = this.state.virtualTime / this.props.duration * this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth / 2;
        if (leftOffset < 0) {
          return 0;
        } else if (leftOffset > this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth) {
          return this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth;
        } else {
          return leftOffset;
        }
      } else {
        return 0;
      }
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
        if (leftOffset < 0) {
          return 0;
        } else if (leftOffset > this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth) {
          return this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth;
        } else {
          return leftOffset;
        }
      } else {
        return 0;
      }
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
      var _this3 = this;

      if (!this.props.config.thumbsSprite || !this.props.config.thumbsSlices || !this.props.config.thumbsWidth || !this.props.showFramePreview || this.props.isMobile) return undefined;

      return (0, _preact.h)(
        'div',
        {
          className: _style2.default.framePreview,
          style: this._getFramePreviewStyle(),
          ref: function ref(c) {
            return _this3._framePreviewElement = c;
          } },
        (0, _preact.h)('div', {
          className: _style2.default.framePreviewImg,
          style: this._getFramePreviewImgStyle() })
      );
    }

    /**
     * Gets the style of the frame preview image.
     * @returns {string} - The css style string.
     * @memberof SeekBarControl
     * @private
     */

  }, {
    key: '_getFramePreviewImgStyle',
    value: function _getFramePreviewImgStyle() {
      var framePreviewImgStyle = 'background-image: url(' + this.props.config.thumbsSprite + ');';
      framePreviewImgStyle += 'background-position: ' + this.getThumbSpriteOffset() + ';';
      framePreviewImgStyle += 'background-size: ' + this.props.config.thumbsSlices * this.props.config.thumbsWidth + 'px 100%;';
      return framePreviewImgStyle;
    }

    /**
     * Gets the style of the frame preview.
     * @returns {string} - The css style string.
     * @memberof SeekBarControl
     * @private
     */

  }, {
    key: '_getFramePreviewStyle',
    value: function _getFramePreviewStyle() {
      var framePreviewStyle = 'left: ' + this.getFramePreviewOffset() + 'px;';
      framePreviewStyle += 'width: ' + this.props.config.thumbsWidth + 'px;';
      return framePreviewStyle;
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
      var _this4 = this;

      if (!this.props.showTimeBubble || this.props.isMobile) return undefined;
      var timeBubbleStyle = 'left: ' + this.getTimeBubbleOffset() + 'px';
      var timeBubbleValue = this.props.isDvr ? '-' + (0, _timeFormat.toHHMMSS)(this.props.duration - this.state.virtualTime) : (0, _timeFormat.toHHMMSS)(this.state.virtualTime);
      return (0, _preact.h)(
        'div',
        { className: _style2.default.timePreview, style: timeBubbleStyle,
          ref: function ref(c) {
            return _this4._timeBubbleElement = c;
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
      var _this5 = this;

      var virtualProgressWidth = this.state.virtualTime / props.duration * 100 + '%';
      var progressWidth = props.currentTime / props.duration * 100 + '%';
      var bufferedWidth = Math.round(this.getBufferedPercent()) + '%';
      var seekbarStyleClass = [_style2.default.seekBar];
      if (props.adBreak) seekbarStyleClass.push(_style2.default.adBreak);
      if (props.isDvr) seekbarStyleClass.push(_style2.default.live);
      if (props.isMobile) seekbarStyleClass.push(_style2.default.hover);
      if (props.isDraggingActive) seekbarStyleClass.push(_style2.default.hover);

      return (0, _preact.h)(
        'div',
        {
          tabIndex: '0',
          className: seekbarStyleClass.join(' '),
          ref: function ref(c) {
            return _this5._seekBarElement = c;
          },
          role: 'slider',
          'aria-label': 'Seek slider',
          'aria-valuemin': '0',
          'aria-valuemax': Math.round(this.props.duration),
          'aria-valuenow': Math.round(this.props.currentTime),
          'aria-valuetext': (0, _timeFormat.toHHMMSS)(this.props.currentTime) + ' of ' + (0, _timeFormat.toHHMMSS)(this.props.duration),
          onClick: function onClick(e) {
            return _this5.onTap(e);
          },
          onMouseOver: function onMouseOver() {
            return _this5.onSeekbarMouseOver();
          },
          onMouseLeave: function onMouseLeave() {
            return _this5.onSeekbarMouseLeave();
          },
          onMouseMove: function onMouseMove(e) {
            return _this5.onSeekbarMouseMove(e);
          },
          onMouseDown: function onMouseDown(e) {
            return _this5.onSeekbarMouseDown(e);
          },
          onTouchStart: function onTouchStart(e) {
            return _this5.onSeekbarTouchStart(e);
          },
          onTouchMove: function onTouchMove(e) {
            return _this5.onSeekbarTouchMove(e);
          },
          onTouchEnd: function onTouchEnd() {
            return _this5.onSeekbarTouchEnd();
          },
          onKeyDown: function onKeyDown(e) {
            return _this5.onSeekbarKeyDown(e);
          } },
        (0, _preact.h)(
          'div',
          { className: _style2.default.progressBar },
          this.renderFramePreview(),
          this.renderTimeBubble(),
          (0, _preact.h)('div', { className: _style2.default.virtualProgress, style: { width: virtualProgressWidth } }),
          (0, _preact.h)('div', { className: _style2.default.buffered, style: { width: bufferedWidth } }),
          (0, _preact.h)(
            'div',
            { className: _style2.default.progress, style: { width: progressWidth } },
            props.adBreak ? undefined : (0, _preact.h)('a', { className: _style2.default.scrubber })
          )
        )
      );
    }
  }]);

  return SeekBarControl;
}(_preact.Component)) || _class);
exports.SeekBarControl = SeekBarControl;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _volume = __webpack_require__(31);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

var _keyboard = __webpack_require__(41);

var _eventManager = __webpack_require__(9);

var _bindMethod = __webpack_require__(11);

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
    volume: state.engine.volume,
    muted: state.engine.muted,
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

    var _this = _possibleConstructorReturn(this, (VolumeControl.__proto__ || Object.getPrototypeOf(VolumeControl)).call(this, { name: 'Volume', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    _this.onVolumeProgressBarMouseUp = (0, _bindMethod.bindMethod)(_this, _this.onVolumeProgressBarMouseUp);
    _this.onVolumeProgressBarMouseMove = (0, _bindMethod.bindMethod)(_this, _this.onVolumeProgressBarMouseMove);
    return _this;
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

      this._eventManager.listen(this.player, this.player.Event.LOADED_METADATA, function () {
        _this2.props.updateVolume(_this2.player.volume);
        _this2.props.updateMuted(_this2.player.muted);
      });
      this._eventManager.listen(this.player, this.player.Event.VOLUME_CHANGE, function () {
        _this2.props.updateMuted(_this2.player.muted);
        _this2.props.updateVolume(_this2.player.volume);
      });
      document.addEventListener('mouseup', this.onVolumeProgressBarMouseUp);
      document.addEventListener('mousemove', this.onVolumeProgressBarMouseMove);
    }

    /**
     * before component unmounted, remove event listeners
     *
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.onVolumeProgressBarMouseUp);
      document.removeEventListener('mousemove', this.onVolumeProgressBarMouseMove);
    }

    /**
     * get the volume progress bar height percentage string
     *
     * @method getVolumeProgessHeight
     * @returns {string} - volume progress bar new height based on volume
     * @memberof VolumeControl
     */

  }, {
    key: 'getVolumeProgressHeight',
    value: function getVolumeProgressHeight() {
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
     * volume mouse over handler
     *
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeMouseOver',
    value: function onVolumeMouseOver() {
      if (this.props.isMobile) return;
      this.props.updateVolumeHover(true);
      this.setState({ hover: true });
    }

    /**
     * volume mouse over handler
     *
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeMouseOut',
    value: function onVolumeMouseOut() {
      if (this.props.isMobile) return;
      this.props.updateVolumeHover(false);
      this.setState({ hover: false });
    }

    /**
     * on volume control key down, update the volume in case of up/down keys
     *
     * @param {KeyboardEvent} e - keyboardEvent event
     * @method onVolumeControlButtonClick
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeControlKeyDown',
    value: function onVolumeControlKeyDown(e) {
      var _this3 = this;

      /**
       * Change volume operations.
       * @param {number} newVolume - The new volume.
       * @returns {void}
       */
      var changeVolume = function changeVolume(newVolume) {
        _this3.setState({ hover: true });
        if (newVolume > 100 || newVolume < 0) {
          return;
        }
        _this3.player.muted = newVolume < _keyboard.KEYBOARD_DEFAULT_VOLUME_JUMP;
        _this3.player.volume = newVolume / 100;
        _this3.notifyChange({ volume: _this3.player.volume });
      };
      switch (e.keyCode) {
        case _keyMap.KeyMap.UP:
          changeVolume(Math.round(this.player.volume * 100) + _keyboard.KEYBOARD_DEFAULT_VOLUME_JUMP);
          break;
        case _keyMap.KeyMap.DOWN:
          changeVolume(Math.round(this.player.volume * 100) - _keyboard.KEYBOARD_DEFAULT_VOLUME_JUMP);
          break;
        default:
          this.setState({ hover: false });
          break;
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
      if (this.props.isDraggingActive) {
        this.props.updateVolumeDraggingStatus(false);
        this.changeVolume(e);
      }
    }

    /**
     * on volume control button click, toggle mute in player and store state
     *
     * @method onVolumeControlButtonClick
     * @returns {void}
     * @memberof VolumeControl
     */

  }, {
    key: 'onVolumeControlButtonClick',
    value: function onVolumeControlButtonClick() {
      this.logger.debug('Toggle mute. ' + this.player.muted + ' => ' + !this.player.muted);
      this.player.muted = !this.player.muted;
      this.notifyClick();
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
      if (volume <= 1 && volume >= 0) {
        this.logger.debug('Change volume from ' + this.player.volume + ' => ' + volume);
        this.player.volume = volume;
        if (this.props.muted) {
          this.player.muted = false;
        }
        this.notifyChange({ volume: this.player.volume });
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
      var _this4 = this;

      var controlButtonClass = [_style2.default.controlButtonContainer, _style2.default.volumeControl];
      if (this.props.isDraggingActive) controlButtonClass.push(_style2.default.draggingActive);
      if (this.props.muted || this.props.volume === 0) controlButtonClass.push(_style2.default.isMuted);
      if (this.state.hover && !this.props.smartContainerOpen) controlButtonClass.push(_style2.default.hover);

      return (0, _preact.h)(
        'div',
        {
          ref: function ref(c) {
            return _this4._volumeControlElement = c;
          },
          className: controlButtonClass.join(' '),
          onMouseOver: function onMouseOver() {
            return _this4.onVolumeMouseOver();
          },
          onMouseOut: function onMouseOut() {
            return _this4.onVolumeMouseOut();
          } },
        (0, _preact.h)(
          'button',
          { tabIndex: '0',
            'aria-label': 'Volume',
            className: _style2.default.controlButton,
            onClick: function onClick() {
              return _this4.onVolumeControlButtonClick();
            },
            onKeyDown: function onKeyDown(e) {
              return _this4.onVolumeControlKeyDown(e);
            } },
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeBase }),
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeWaves }),
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeMute })
        ),
        (0, _preact.h)(
          'div',
          { className: _style2.default.volumeControlBar, role: 'slider',
            'aria-valuemin': '0', 'aria-valuemaz': '100', 'aria-valuenow': this.player.volume * 100,
            'aria-valuetext': this.player.volume * 100 + '% volume ' + (this.player.muted ? 'muted' : '') },
          (0, _preact.h)(
            'div',
            {
              className: _style2.default.bar,
              ref: function ref(c) {
                return _this4._volumeProgressBarElement = c;
              },
              onMouseDown: function onMouseDown() {
                return _this4.onVolumeProgressBarMouseDown();
              } },
            (0, _preact.h)('div', { className: _style2.default.progress, style: { height: this.getVolumeProgressHeight() } })
          )
        )
      );
    }
  }]);

  return VolumeControl;
}(_base2.default)) || _class);
exports.VolumeControl = VolumeControl;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _settings = __webpack_require__(35);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _smartContainer = __webpack_require__(43);

var _smartContainerItem = __webpack_require__(63);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _bindMethod = __webpack_require__(11);

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

    var _this = _possibleConstructorReturn(this, (SettingsControl.__proto__ || Object.getPrototypeOf(SettingsControl)).call(this, { name: 'Settings', player: obj.player }));

    _this.handleClickOutside = (0, _bindMethod.bindMethod)(_this, _this.handleClickOutside);
    return _this;
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
      document.addEventListener('click', this.handleClickOutside, true);
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
      document.removeEventListener('click', this.handleClickOutside, true);
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
      if (!this.props.isMobile && !!this._controlSettingsElement && !this._controlSettingsElement.contains(e.target) && this.state.smartContainerOpen) {
        if (e.target.classList.contains(_style2.default.overlayPlay)) {
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
      this.notifyClick({
        speed: playbackRate
      });
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
      this.notifyClick({
        type: this.player.Track.VIDEO,
        track: videoTrack
      });
    }

    /**
     * This function gets an array and increases it if needed in each iteration. The function checks if the last element
     * in the sorted array has the same label as the new current track element. If so, it compares their bandwidth
     * and selects the one with the higher. If the resolution is different then it just adds it to the array
     *
     * @param {Array} qualities - sorted (!) video tracks array
     * @param {object} currentTrack - a track
     * @returns {Array<any>} - an array with unique values, compared by their height. if the new track (currenttrack) has
     * the same height value, then we take the one with the higher bandwidth (replace it if needed)
     * @memberof SettingsControl
     */

  }, {
    key: 'filterUniqueQualities',
    value: function filterUniqueQualities(qualities, currentTrack) {
      var arrLength = qualities.length - 1;
      var previousTrack = qualities[arrLength];
      if (arrLength > -1 && currentTrack.label === previousTrack.label) {
        if (currentTrack.bandwidth > previousTrack.bandwidth) {
          qualities[arrLength] = currentTrack;
        }
      } else {
        qualities.push(currentTrack);
      }
      return qualities;
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

      var speedOptions = this.player.playbackRates.reduce(function (acc, speed) {
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

      var qualityOptions = props.videoTracks.sort(function (a, b) {
        return a.bandwidth < b.bandwidth ? 1 : -1;
      }).filter(function (t) {
        return t.bandwidth || t.height;
      }).reduce(this.filterUniqueQualities, []).map(function (t) {
        return {
          label: t.label,
          active: !_this2.player.isAdaptiveBitrateEnabled() && t.active,
          value: t
        };
      });

      // Progressive playback doesn't support auto
      if (qualityOptions.length > 1 && this.player.streamType !== "progressive") {
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
          className: [_style2.default.controlButtonContainer, _style2.default.controlSettings].join(' ') },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              tabIndex: '0',
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.settings' }),
              className: this.state.smartContainerOpen ? [_style2.default.controlButton, _style2.default.active].join(' ') : _style2.default.controlButton,
              onClick: function onClick() {
                return _this2.onControlButtonClick();
              } },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.Settings })
          )
        ),
        !this.state.smartContainerOpen ? '' : (0, _preact.h)(
          _smartContainer.SmartContainer,
          { title: 'Settings', onClose: function onClose() {
              return _this2.onControlButtonClick();
            } },
          qualityOptions.length <= 1 ? '' : (0, _preact.h)(
            _preactI18n.Localizer,
            null,
            (0, _preact.h)(_smartContainerItem.SmartContainerItem, { icon: 'quality', label: (0, _preact.h)(_preactI18n.Text, { id: 'settings.quality' }), options: qualityOptions,
              onSelect: function onSelect(o) {
                return _this2.onQualityChange(o);
              } })
          ),
          props.isLive ? '' : (0, _preact.h)(
            _preactI18n.Localizer,
            null,
            (0, _preact.h)(_smartContainerItem.SmartContainerItem, { icon: 'speed', label: (0, _preact.h)(_preactI18n.Text, { id: 'settings.speed' }), options: speedOptions,
              onSelect: function onSelect(o) {
                return _this2.onSpeedChange(o);
              } })
          )
        )
      );
    }
  }]);

  return SettingsControl;
}(_base2.default)) || _class);
exports.SettingsControl = SettingsControl;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmartContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _shell = __webpack_require__(7);

var _preactPortal = __webpack_require__(44);

var _preactPortal2 = _interopRequireDefault(_preactPortal);

var _overlay = __webpack_require__(16);

var _keyMap = __webpack_require__(6);

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
var SmartContainer = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_shell.actions)), _dec(_class = function (_Component) {
  _inherits(SmartContainer, _Component);

  function SmartContainer() {
    _classCallCheck(this, SmartContainer);

    return _possibleConstructorReturn(this, (SmartContainer.__proto__ || Object.getPrototypeOf(SmartContainer)).apply(this, arguments));
  }

  _createClass(SmartContainer, [{
    key: 'componentWillMount',


    /**
     * before component mounted, add player css class
     *
     * @returns {void}
     * @memberof SmartContainer
     */
    value: function componentWillMount() {
      this.props.addPlayerClass(_style2.default.smartContainerOpen);
      this.props.updateSmartContainerOpen(true);
    }

    /**
     * after component unmounted, remove player css class
     *
     * @returns {void}
     * @memberof SmartContainer
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.removePlayerClass(_style2.default.smartContainerOpen);
      this.props.updateSmartContainerOpen(false);
    }

    /**
     * if mobile detected, smart container representation is an overlay. hence, render overlay with its children.
     * otherwise, render smart container
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof SmartContainer
     */

  }, {
    key: 'render',
    value: function render(props) {
      return props.isMobile ? (0, _preact.h)(
        _preactPortal2.default,
        { into: '#overlay-portal' },
        (0, _preact.h)(
          _overlay.Overlay,
          { open: true, onClose: function onClose() {
              return props.onClose();
            } },
          (0, _preact.h)(
            'div',
            { className: _style2.default.title },
            props.title
          ),
          props.children
        )
      ) : (0, _preact.h)(
        'div',
        { tabIndex: '-1',
          className: [_style2.default.smartContainer, _style2.default.top, _style2.default.left].join(' '),
          onKeyDown: function onKeyDown(e) {
            if (e.keyCode === _keyMap.KeyMap.ESC) {
              props.onClose();
            }
          } },
        props.children
      );
    }
  }]);

  return SmartContainer;
}(_preact.Component)) || _class);
exports.SmartContainer = SmartContainer;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _shell = __webpack_require__(7);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

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
      this.props.addPlayerClass(_style2.default.overlayActive);
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
      this.props.removePlayerClass(_style2.default.overlayActive);
    }

    /**
     * closeButton
     * @param {any} props - props
     * @returns {React$Element | void} close button element
     * @memberof Overlay
     */

  }, {
    key: 'renderCloseButton',
    value: function renderCloseButton(props) {
      if (!props.permanent) {
        return (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'a',
            { onClick: function onClick() {
                return props.onClose();
              }, 'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'core.close' }), className: _style2.default.closeOverlay },
            (0, _preact.h)(_icon2.default, {
              type: _icon.IconType.Close })
          )
        );
      } else {
        return undefined;
      }
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
      var overlayClass = [_style2.default.overlay];
      if (props.type) overlayClass.push(_style2.default[props.type + '-overlay']);
      if (props.open) overlayClass.push(_style2.default.active);

      return (0, _preact.h)(
        'div',
        {
          tabIndex: '-1',
          className: overlayClass.join(' '), role: 'dialog',
          onKeyDown: function onKeyDown(e) {
            if (e.keyCode === _keyMap.KeyMap.ESC) {
              props.onClose();
            }
          } },
        (0, _preact.h)(
          'div',
          { className: _style2.default.overlayContents },
          props.children
        ),
        this.renderCloseButton(props)
      );
    }
  }]);

  return Overlay;
}(_preact.Component)) || _class);
exports.Overlay = Overlay;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _menu = __webpack_require__(64);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

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
     * on key down handler - on enter open toggle drop down menu
     *
     * @param {KeyboardEvent} e - keyboard event
     * @returns {void}
     * @memberof DropDown
     */

  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      switch (e.keyCode) {
        case _keyMap.KeyMap.ENTER:
          this.setState({ dropMenuActive: !this.state.dropMenuActive });
          break;
        case _keyMap.KeyMap.ESC:
          this.onClose();
          e.stopPropagation();
          break;
      }
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

      return (0, _preact.h)(_menu.Menu, {
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
        { className: this.state.dropMenuActive ? [_style2.default.dropdown, _style2.default.active].join(' ') : _style2.default.dropdown,
          ref: function ref(el) {
            return _this3._el = el;
          } },
        (0, _preact.h)(
          'div',
          {
            tabIndex: '0',
            className: _style2.default.dropdownButton,
            onClick: function onClick() {
              return _this3.setState({ dropMenuActive: !_this3.state.dropMenuActive });
            },
            onKeyDown: function onKeyDown(e) {
              return _this3.onKeyDown(e);
            } },
          (0, _preact.h)(
            'span',
            null,
            this.getActiveOptionLabel()
          ),
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.ArrowDown })
        ),
        !this.state.dropMenuActive ? undefined : (0, _preact.h)(_menu.Menu, {
          parentEl: this._el,
          options: props.options,
          onSelect: function onSelect(o) {
            return _this3.onSelect(o);
          },
          onClose: function onClose() {
            return _this3.onClose();
          } })
      );
    }
  }]);

  return DropDown;
}(_preact.Component)) || _class);
exports.DropDown = DropDown;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _preactRedux = __webpack_require__(2);

var _keyMap = __webpack_require__(6);

var _bindMethod = __webpack_require__(11);

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
    isMobile: state.shell.isMobile,
    playerClientRect: state.shell.playerClientRect
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

  /**
   * Creates an instance of Menu.
   *
   * @constructor
   * @memberof Menu
   */
  function Menu() {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

    _this.handleClickOutside = (0, _bindMethod.bindMethod)(_this, _this.handleClickOutside);
    return _this;
  }

  /**
   * before component mounted, set initial state of the menu position
   * @returns {void}
   * @memberof Menu
   */


  _createClass(Menu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ position: [_style2.default.top, _style2.default.left] });
    }

    /**
     * after component mounted, listen to click outside of the component
     * @returns {void}
     * @memberof Menu
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleClickOutside, true);
      if (!this.props.isMobile) {
        this.setState({ position: this.getPosition() });
      }
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
      document.removeEventListener('click', this.handleClickOutside);
    }

    /**
     * get menu position based on document boundaries
     *
     * @returns {Array} position style classes array
     * @memberof Menu
     */

  }, {
    key: 'getPosition',
    value: function getPosition() {
      var menuElementRect = this._menuElement.getBoundingClientRect();
      var playerContainerRect = this.props.playerClientRect;
      var offsetBottom = playerContainerRect.bottom - menuElementRect.bottom;
      var height = offsetBottom + menuElementRect.height;
      if (height > playerContainerRect.height) {
        return [_style2.default.bottom, _style2.default.left];
      }
      return [_style2.default.top, _style2.default.left];
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
      if (!this.props.isMobile && this._menuElement && !this._menuElement.contains(e.target)) {
        e.stopPropagation();
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
     * on key down handler
     *
     * @param {KeyboardEvent} e - keyboard event
     * @param {Object} o - option object
     * @returns {void}
     * @memberof Menu
     */

  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e, o) {
      switch (e.keyCode) {
        case _keyMap.KeyMap.ENTER:
          this.onSelect(o);
          break;
        case _keyMap.KeyMap.ESC:
          this.props.onClose();
          e.stopPropagation();
          break;
        default:
          break;
      }
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
          className: this.props.hideSelect ? _style2.default.mobileHiddenSelect : '',
          onChange: function onChange(e) {
            return _this2.onSelect(_this2.props.options[e.target.value]);
          } },
        this.props.options.map(function (o, index) {
          return (0, _preact.h)(
            'option',
            { selected: _this2.isSelected(o), value: index,
              key: index },
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
          className: [_style2.default.dropdownMenu].concat(_toConsumableArray(this.state.position)).join(' ') },
        props.options.map(function (o, index) {
          return (0, _preact.h)(
            'div',
            { tabIndex: '',
              key: index,
              className: _this3.isSelected(o) ? [_style2.default.dropdownMenuItem, _style2.default.active].join(' ') : _style2.default.dropdownMenuItem,
              onClick: function onClick() {
                return _this3.onSelect(o);
              },
              onKeyDown: function onKeyDown(e) {
                return _this3.onKeyDown(e, o);
              } },
            (0, _preact.h)(
              'span',
              null,
              o.label
            ),
            (0, _preact.h)(
              'span',
              { className: _style2.default.menuIconContainer, style: 'opacity: ' + (_this3.isSelected(o) ? 1 : 0) },
              (0, _preact.h)(_icon2.default, {
                type: _icon.IconType.Check })
            )
          );
        })
      );
    }
  }]);

  return Menu;
}(_preact.Component)) || _class);
exports.Menu = Menu;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _cvaa = __webpack_require__(20);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _smartContainer = __webpack_require__(43);

var _smartContainerItem = __webpack_require__(63);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _cvaaOverlay = __webpack_require__(65);

var _preactPortal = __webpack_require__(44);

var _preactPortal2 = _interopRequireDefault(_preactPortal);

var _keyMap = __webpack_require__(6);

var _bindMethod = __webpack_require__(11);

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

    var _this = _possibleConstructorReturn(this, (LanguageControl.__proto__ || Object.getPrototypeOf(LanguageControl)).call(this, { name: 'LanguageControl', player: obj.player }));

    _this.handleClickOutside = (0, _bindMethod.bindMethod)(_this, _this.handleClickOutside);
    return _this;
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
      document.addEventListener('click', this.handleClickOutside, true);
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
      document.removeEventListener('click', this.handleClickOutside, true);
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
      if (this._controlLanguageElement && !this.props.isMobile && !this._controlLanguageElement.contains(e.target) && this.state.smartContainerOpen && !this.state.cvaaOverlay) {
        if (e.target.classList.contains('overlay-action')) {
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
      this.notifyClick({
        type: this.player.Track.AUDIO,
        track: audioTrack
      });
    }

    /**
     * Select the given text track
     *
     * @param {Object} textTrack - text track
     * @returns {void}
     * @memberof LanguageControl
     */

  }, {
    key: 'onCaptionsChange',
    value: function onCaptionsChange(textTrack) {
      this.player.selectTrack(textTrack);
      this.notifyClick({
        type: this.player.Track.TEXT,
        track: textTrack
      });
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
          className: [_style2.default.controlButtonContainer, _style2.default.controlLanguage].join(' ') },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              tabIndex: '0',
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.language' }),
              className: this.state.smartContainerOpen ? [_style2.default.controlButton, _style2.default.active].join(' ') : _style2.default.controlButton,
              onClick: function onClick() {
                return _this2.onControlButtonClick();
              } },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.Language })
          )
        ),
        !this.state.smartContainerOpen || this.state.cvaaOverlay ? undefined : (0, _preact.h)(
          _smartContainer.SmartContainer,
          { title: 'Language', onClose: function onClose() {
              return _this2.onControlButtonClick();
            } },
          audioOptions.length === 0 ? undefined : (0, _preact.h)(
            _preactI18n.Localizer,
            null,
            (0, _preact.h)(_smartContainerItem.SmartContainerItem, {
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
            (0, _preact.h)(_smartContainerItem.SmartContainerItem, {
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
            { tabIndex: '0',
              className: _style2.default.smartContainerItem,
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.toggleCVAAOverlay();
                }
              } },
            (0, _preact.h)(
              'a',
              { className: _style2.default.advancedCaptionsMenuLink, onClick: function onClick() {
                  return _this2.toggleCVAAOverlay();
                } },
              (0, _preact.h)(_preactI18n.Text, { id: 'language.advanced_captions_settings' })
            )
          )
        ),
        this.state.cvaaOverlay ? (0, _preact.h)(
          _preactPortal2.default,
          { into: '#overlay-portal', ref: function ref(_ref) {
              return _this2._portal = _ref;
            } },
          (0, _preact.h)(_cvaaOverlay.CVAAOverlay, { player: this.player, onClose: function onClose() {
              _this2.toggleCVAAOverlay();
              _this2.onControlButtonClick();
            } })
        ) : (0, _preact.h)('div', null)
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
        return {
          label: t.label || t.language,
          active: t.active,
          value: t
        };
      });

      if (audioOptions.length > 0 || textOptions.length > 0) {
        return this.renderAll(audioOptions, textOptions);
      } else {
        return undefined;
      }
    }
  }]);

  return LanguageControl;
}(_base2.default)) || _class);
exports.LanguageControl = LanguageControl;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CVAAOverlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _isEqual = __webpack_require__(135);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _bindActions = __webpack_require__(5);

var _cvaa = __webpack_require__(20);

var _shell = __webpack_require__(7);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _overlay = __webpack_require__(16);

var _dropdown = __webpack_require__(45);

var _slider = __webpack_require__(66);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

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
        state: cvaaOverlayState.Main,
        customTextStyle: this.props.player.textStyle
      });

      this.captionsStyleDefault = Object.assign(new this.props.player.TextStyle(), {
        backgroundOpacity: this.props.player.TextStyle.StandardOpacities.TRANSPARENT
      });

      this.captionsStyleYellow = Object.assign(new this.props.player.TextStyle(), {
        backgroundOpacity: this.props.player.TextStyle.StandardOpacities.TRANSPARENT,
        fontColor: this.props.player.TextStyle.StandardColors.YELLOW
      });

      this.captionsStyleBlackBG = Object.assign(new this.props.player.TextStyle(), {
        backgroundColor: this.props.player.TextStyle.StandardColors.BLACK,
        fontColor: this.props.player.TextStyle.StandardColors.WHITE
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
     * @param {Object} textStyle - TextStyle object
     * @returns {void}
     * @memberof CVAAOverlay
     */

  }, {
    key: 'changeCaptionsStyle',
    value: function changeCaptionsStyle(textStyle) {
      this.props.updateCaptionsStyle(textStyle);
      this.props.player.textStyle = textStyle;
      this.props.onClose();
      this.notifyClick({
        textStyle: textStyle
      });
    }

    /**
     * detection if advanced style applied or one of the default presets applied
     *
     * @returns {boolean} advanced style applied boolean
     * @memberof CVAAOverlay
     */

  }, {
    key: 'isAdvancedStyleApplied',
    value: function isAdvancedStyleApplied() {
      return !(0, _isEqual2.default)(this.props.player.textStyle, this.captionsStyleDefault) && !(0, _isEqual2.default)(this.props.player.textStyle, this.captionsStyleBlackBG) && !(0, _isEqual2.default)(this.props.player.textStyle, this.captionsStyleYellow);
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
        {
          className: this.state.state === cvaaOverlayState.Main ? [_style2.default.overlayScreen, _style2.default.active].join(' ') : _style2.default.overlayScreen },
        (0, _preact.h)(
          'div',
          { className: _style2.default.title },
          'Advanced captions settings'
        ),
        (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'div',
            { tabIndex: '0',
              className: _style2.default.sample,
              onClick: function onClick() {
                return _this2.changeCaptionsStyle(_this2.captionsStyleDefault);
              },
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.changeCaptionsStyle(_this2.captionsStyleDefault);
                }
              } },
            'Sample',
            (0, _isEqual2.default)(this.props.player.textStyle, this.captionsStyleDefault) ? (0, _preact.h)(
              'div',
              { className: _style2.default.activeTick },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            ) : undefined
          ),
          (0, _preact.h)(
            'div',
            { tabIndex: '0',
              className: [_style2.default.sample, _style2.default.blackBg].join(' '),
              onClick: function onClick() {
                return _this2.changeCaptionsStyle(_this2.captionsStyleBlackBG);
              },
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.changeCaptionsStyle(_this2.captionsStyleBlackBG);
                }
              } },
            'Sample',
            (0, _isEqual2.default)(this.props.player.textStyle, this.captionsStyleBlackBG) ? (0, _preact.h)(
              'div',
              { className: _style2.default.activeTick },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            ) : undefined
          ),
          (0, _preact.h)(
            'div',
            { tabIndex: '0',
              className: [_style2.default.sample, _style2.default.yellowText].join(' '),
              onClick: function onClick() {
                return _this2.changeCaptionsStyle(_this2.captionsStyleYellow);
              },
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.changeCaptionsStyle(_this2.captionsStyleYellow);
                }
              } },
            'Sample',
            (0, _isEqual2.default)(this.props.player.textStyle, this.captionsStyleYellow) ? (0, _preact.h)(
              'div',
              { className: _style2.default.activeTick },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            ) : undefined
          )
        ),
        !this.isAdvancedStyleApplied() ? (0, _preact.h)(
          'a',
          { tabIndex: '0',
            className: _style2.default.buttonSaveCvaa,
            onClick: function onClick() {
              return _this2.transitionToState(cvaaOverlayState.CustomCaptions);
            },
            onKeyDown: function onKeyDown(e) {
              if (e.keyCode === _keyMap.KeyMap.ENTER) {
                _this2.transitionToState(cvaaOverlayState.CustomCaptions);
              }
            } },
          'Set custom caption'
        ) : (0, _preact.h)(
          'div',
          { className: _style2.default.customCaptionsApplied },
          (0, _preact.h)(
            'div',
            { tabIndex: '0',
              className: [_style2.default.sample, _style2.default.custom].join(' '),
              style: this.state.customTextStyle.toCSS() },
            (0, _preact.h)(
              'span',
              null,
              'Custom captions'
            ),
            (0, _preact.h)(
              'div',
              { className: _style2.default.activeTick },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            )
          ),
          (0, _preact.h)(
            'a',
            { tabIndex: '0', onClick: function onClick() {
                return _this2.transitionToState(cvaaOverlayState.CustomCaptions);
              },
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.transitionToState(cvaaOverlayState.CustomCaptions);
                }
              } },
            'Edit caption'
          )
        )
      );
    }

    /**
     * change one or more properties in customTextStyle object in the internal state
     *
     * @param {Object} styleChanges style changes object
     * @returns {void}
     * @memberof CVAAOverlay
     */

  }, {
    key: 'changeCustomStyle',
    value: function changeCustomStyle(styleChanges) {
      this.setState({ customTextStyle: Object.assign(this.state.customTextStyle, styleChanges) });
    }

    /**
     * render custom captions state
     *
     * @param {*} props - component props
     * @returns {React$Element} - custom captions elements
     * @memberof CVAAOverlay
     */

  }, {
    key: 'renderCustomCaptionsState',
    value: function renderCustomCaptionsState(props) {
      var _this3 = this;

      var fontFamily = this.props.player.TextStyle.FontFamily;
      var edgeStyles = this.props.player.TextStyle.EdgeStyles;
      var standardColors = props.player.TextStyle.StandardColors;

      var fontSizeOptions = this.props.player.TextStyle.FontSizes.map(function (size) {
        return {
          value: size,
          label: size,
          active: _this3.state.customTextStyle.fontSize === size
        };
      });

      var fontColorOptions = Object.keys(standardColors).map(function (key) {
        return {
          value: standardColors[key],
          label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
          active: _this3.state.customTextStyle.fontColor == standardColors[key]
        };
      });

      var fontFamilyOptions = Object.keys(fontFamily).map(function (key) {
        return {
          value: fontFamily[key],
          label: fontFamily[key],
          active: _this3.state.customTextStyle.fontFamily == fontFamily[key]
        };
      });

      var fontStyleOptions = Object.keys(edgeStyles).map(function (key) {
        return {
          value: edgeStyles[key],
          label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
          active: _this3.state.customTextStyle.fontEdge == edgeStyles[key]
        };
      });

      var backgroundColorOptions = Object.keys(standardColors).map(function (key) {
        return {
          value: standardColors[key],
          label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
          active: _this3.state.customTextStyle.backgroundColor == standardColors[key]
        };
      });

      return (0, _preact.h)(
        'div',
        {
          className: this.state.state === cvaaOverlayState.CustomCaptions ? [_style2.default.overlayScreen, _style2.default.active].join(' ') : _style2.default.overlayScreen },
        (0, _preact.h)(
          'form',
          { className: [_style2.default.form, _style2.default.customCaptionForm].join(' ') },
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'label',
              null,
              'Size'
            ),
            (0, _preact.h)(_dropdown.DropDown, { onSelect: function onSelect(fontSize) {
                return _this3.changeCustomStyle({ fontSize: fontSize });
              }, options: fontSizeOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'label',
              null,
              'Font color'
            ),
            (0, _preact.h)(_dropdown.DropDown, { onSelect: function onSelect(fontColor) {
                return _this3.changeCustomStyle({ fontColor: fontColor });
              }, options: fontColorOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'label',
              null,
              'Font family'
            ),
            (0, _preact.h)(_dropdown.DropDown, { onSelect: function onSelect(fontFamily) {
                return _this3.changeCustomStyle({ fontFamily: fontFamily });
              }, options: fontFamilyOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'label',
              null,
              'Font style'
            ),
            (0, _preact.h)(_dropdown.DropDown, { onSelect: function onSelect(fontEdge) {
                return _this3.changeCustomStyle({ fontEdge: fontEdge });
              }, options: fontStyleOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'label',
              null,
              'Font opacity'
            ),
            (0, _preact.h)(_slider.Slider, { min: 0, max: 100, value: this.state.customTextStyle.fontOpacity * 100,
              onChange: function onChange(fontOpacity) {
                return _this3.changeCustomStyle({ fontOpacity: fontOpacity / 100 });
              } })
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'label',
              null,
              'Background color'
            ),
            (0, _preact.h)(_dropdown.DropDown, { onSelect: function onSelect(backgroundColor) {
                return _this3.changeCustomStyle({ backgroundColor: backgroundColor });
              },
              options: backgroundColorOptions })
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'label',
              null,
              'Background opacity'
            ),
            (0, _preact.h)(_slider.Slider, { min: 0, max: 100, value: this.state.customTextStyle.backgroundOpacity * 100,
              onChange: function onChange(backgroundOpacity) {
                return _this3.changeCustomStyle({ backgroundOpacity: backgroundOpacity / 100 });
              } })
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.formGroupRow },
            (0, _preact.h)(
              'a',
              { tabIndex: '0',
                onClick: function onClick() {
                  return _this3.changeCaptionsStyle(_this3.state.customTextStyle);
                },
                onKeyDown: function onKeyDown(e) {
                  if (e.keyCode === _keyMap.KeyMap.ENTER) {
                    _this3.changeCaptionsStyle(_this3.state.customTextStyle);
                  }
                },
                className: [_style2.default.btn, _style2.default.btnBranded, _style2.default.btnBlock].join(' ') },
              'Apply'
            )
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.previewContainer },
            (0, _preact.h)(
              'span',
              { style: this.state.customTextStyle.toCSS() },
              'This is your caption preview'
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
        _overlay.Overlay,
        { open: true, onClose: function onClose() {
            return props.onClose();
          }, type: 'cvaa' },
        this.renderMainState(),
        this.renderCustomCaptionsState(props)
      );
    }
  }]);

  return CVAAOverlay;
}(_base2.default)) || _class);
exports.CVAAOverlay = CVAAOverlay;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Shallow comparison of two objects
 *
 * @param {Object} objA object A
 * @param {Object} objB object B
 * @returns {boolean} objects equal or not
 */
function isEqual(objA, objB) {
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    if (objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

exports.default = isEqual;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _keyMap = __webpack_require__(6);

var _bindMethod = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEYBOARD_DRAG_STEP = 5;

/**
 * Slider component
 *
 * @class Slider
 * @example <Slider onChange={value => this.onOpacityChange(value)} value={this.initialOpacity} min={0} max={100} />
 * @extends {Component}
 */

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  /**
   * Creates an instance of Slider.
   *
   * @constructor
   * @memberof Slider
   */
  function Slider() {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

    _this.mouseUpHandler = (0, _bindMethod.bindMethod)(_this, _this.mouseUpHandler);
    _this.mouseMoveHandler = (0, _bindMethod.bindMethod)(_this, _this.mouseMoveHandler);
    return _this;
  }

  /**
   * before component mounted, set initial state of the slider
   *
   * @returns {void}
   * @memberof Slider
   */


  _createClass(Slider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        value: this.props.value || 0,
        min: this.props.min || 0,
        max: this.props.max || 100,
        dragging: false
      });

      document.addEventListener('mouseup', this.mouseUpHandler);
      document.addEventListener('mousemove', this.mouseMoveHandler);
      document.addEventListener('touchend', this.mouseUpHandler);
      document.addEventListener('touchmove', this.mouseMoveHandler);
    }

    /**
     * before component unmounted, remove event listeners
     *
     * @returns {void}
     * @memberof Slider
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.mouseUpHandler);
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('touchend', this.mouseUpHandler);
      document.removeEventListener('touchmove', this.mouseMoveHandler);
    }

    /**
     * after component mounted, save the sliderWidth
     *
     * @returns {void}
     * @memberof Slider
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.sliderWidth = this._sliderElement.clientWidth;
      this._sliderElementOffsetLeft = this._sliderElement.getBoundingClientRect().left;
    }

    /**
     * mousedown slider handler
     *
     * @param {*} e event
     * @returns {void}
     * @memberof Slider
     */

  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(e) {
      this._sliderElementOffsetLeft = this._sliderElement.getBoundingClientRect().left;
      if (!this.state.dragging) {
        this.setState({
          dragging: true,
          value: this.mouseEventToValue(e)
        });
        this.props.onChange(this.mouseEventToValue(e));
      }
    }

    /**
     * key down handler if dragging via keyboard
     *
     * @param {KeyboardEvent} e - keyboard event
     * @returns {void}
     * @memberof Slider
     */

  }, {
    key: 'onKeyboardDragging',
    value: function onKeyboardDragging(e) {
      e.stopPropagation();
      this._sliderElementOffsetLeft = this._sliderElement.getBoundingClientRect().left;
      var newValue = this.props.value;
      switch (e.keyCode) {
        case _keyMap.KeyMap.RIGHT:
          {
            newValue += KEYBOARD_DRAG_STEP;
            if (newValue > this.state.max) {
              newValue = this.state.max;
            }
            break;
          }
        case _keyMap.KeyMap.LEFT:
          {
            newValue -= KEYBOARD_DRAG_STEP;
            if (newValue < this.state.min) {
              newValue = this.state.min;
            }
            break;
          }
      }
      this.setState({
        value: newValue,
        dragging: false
      });
      this.props.onChange(newValue);
    }

    /**
     * document mousemove handler if dragging active
     *
     * @param {*} e event
     * @returns {void}
     * @memberof Slider
     */

  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(e) {
      if (this.state.dragging) {
        this.setState({
          value: this.mouseEventToValue(e)
        });
        this.props.onChange(this.mouseEventToValue(e));
      }
    }

    /**
     * document mouseup handler if dragging active
     *
     * @param {*} e event
     * @returns {void}
     * @memberof Slider
     */

  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(e) {
      if (this.state.dragging) {
        this.setState({
          value: this.mouseEventToValue(e),
          dragging: false
        });
        this.props.onChange(this.mouseEventToValue(e));
      }
    }

    /**
     * get slider value based on mouse event
     *
     * @param {*} e event
     * @returns {number} slider value
     * @memberof Slider
     */

  }, {
    key: 'mouseEventToValue',
    value: function mouseEventToValue(e) {
      var clientX = void 0;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
      } else if (e.changedTouches) {
        clientX = e.changedTouches[0].pageX;
      } else {
        clientX = e.clientX;
      }

      var offsetLeft = clientX - this._sliderElement.getBoundingClientRect().left;
      var offsetLeftPercentage = Math.round(offsetLeft / this._sliderElement.clientWidth * 100);

      if (this.getValueByPersentage(offsetLeftPercentage) < this.state.min) return this.state.min;
      if (this.getValueByPersentage(offsetLeftPercentage) > this.state.max) return this.state.max;

      return this.getValueByPersentage(offsetLeftPercentage);
    }

    /**
     * get slider value based on persentage value
     *
     * @param {any} persentage progress persentage of slider
     * @returns {number} slider value
     * @memberof Slider
     */

  }, {
    key: 'getValueByPersentage',
    value: function getValueByPersentage(persentage) {
      return this.state.max / 100 * persentage;
    }

    /**
     * get progress presentage by slider value
     *
     * @returns {number} presentage
     * @memberof Slider
     */

  }, {
    key: 'getPersentageByValue',
    value: function getPersentageByValue() {
      return Math.round(this.state.value / this.state.max * 100);
    }

    /**
     * component render function
     *
     * @returns {React$Element<any>} component element
     * @memberof Slider
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        { tabIndex: '0',
          ref: function ref(c) {
            return _this2._sliderElement = c;
          },
          className: _style2.default.slider,
          onMouseDown: function onMouseDown(e) {
            return _this2.mouseDownHandler(e);
          },
          onTouchStart: function onTouchStart(e) {
            return _this2.mouseDownHandler(e);
          },
          onKeyDown: function onKeyDown(e) {
            if (e.keyCode === _keyMap.KeyMap.LEFT || e.keyCode === _keyMap.KeyMap.RIGHT) {
              _this2.onKeyboardDragging(e);
            }
          } },
        (0, _preact.h)(
          'div',
          {
            className: _style2.default.progress,
            style: { width: this.getPersentageByValue() + '%' } },
          (0, _preact.h)('div', {
            className: _style2.default.handle,
            onMouseDown: function onMouseDown(e) {
              return _this2.mouseDownHandler(e);
            },
            onTouchStart: function onTouchStart(e) {
              return _this2.mouseDownHandler(e);
            }
          })
        )
      );
    }
  }]);

  return Slider;
}(_preact.Component);

exports.Slider = Slider;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullscreenControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _shell = __webpack_require__(7);

var _fullscreen = __webpack_require__(32);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _eventManager = __webpack_require__(9);

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
    targetId: state.config.targetId,
    fullscreen: state.fullscreen.fullscreen,
    inBrowserFullscreenForIOS: state.fullscreen.inBrowserFullscreenForIOS,
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
var FullscreenControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(Object.assign(_shell.actions, _fullscreen.actions))), _dec(_class = function (_BaseComponent) {
  _inherits(FullscreenControl, _BaseComponent);

  /**
   * Creates an instance of FullscreenControl.
   * @param {Object} obj obj
   * @memberof FullscreenControl
   */
  function FullscreenControl(obj) {
    _classCallCheck(this, FullscreenControl);

    var _this = _possibleConstructorReturn(this, (FullscreenControl.__proto__ || Object.getPrototypeOf(FullscreenControl)).call(this, { name: 'Fullscreen', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    return _this;
  }

  /**
   * before component mounted, cache the target id div
   *
   * @returns {void}
   * @memberof FullscreenControl
   */


  _createClass(FullscreenControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._targetDiv = document.getElementById(this.props.targetId);
    }

    /**
     * after component mounted, set up event listeners to window fullscreen state change
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._eventManager.listen(document, 'webkitfullscreenchange', function () {
        return _this2.fullscreenChangeHandler();
      });
      this._eventManager.listen(document, 'mozfullscreenchange', function () {
        return _this2.fullscreenChangeHandler();
      });
      this._eventManager.listen(document, 'fullscreenchange', function () {
        return _this2.fullscreenChangeHandler();
      });
      this._eventManager.listen(document, 'MSFullscreenChange', function () {
        return _this2.fullscreenChangeHandler();
      });
      this._eventManager.listen(this.player, this.player.Event.REQUESTED_ENTER_FULLSCREEN, function () {
        return _this2.enterFullscreen();
      });
      this._eventManager.listen(this.player, this.player.Event.REQUESTED_EXIT_FULLSCREEN, function () {
        return _this2.exitFullscreen();
      });
      this.handleIosFullscreen();
    }

    /**
     * Handle iOS full screen changes
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'handleIosFullscreen',
    value: function handleIosFullscreen() {
      var _this3 = this;

      if (this.player.env.os.name === 'iOS') {
        /**
         * Attach listeners to ios full screen change.
         * @returns {void}
         */
        var attachIosFullscreenListeners = function attachIosFullscreenListeners() {
          _this3._eventManager.listen(_this3.player.getVideoElement(), 'webkitbeginfullscreen', function () {
            return _this3.fullscreenEnterHandler();
          });
          _this3._eventManager.listen(_this3.player.getVideoElement(), 'webkitendfullscreen', function () {
            return _this3.fullscreenExitHandler();
          });
        };
        this._eventManager.listenOnce(this.player, this.player.Event.SOURCE_SELECTED, attachIosFullscreenListeners);
      }
    }

    /**
     * fullscreen change handler function.
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'fullscreenChangeHandler',
    value: function fullscreenChangeHandler() {
      var isFullscreen = typeof document.fullscreenElement !== 'undefined' && Boolean(document.fullscreenElement) || typeof document.webkitFullscreenElement !== 'undefined' && Boolean(document.webkitFullscreenElement) || typeof document.mozFullScreenElement !== 'undefined' && Boolean(document.mozFullScreenElement) || typeof document.msFullscreenElement !== 'undefined' && Boolean(document.msFullscreenElement);

      isFullscreen ? this.fullscreenEnterHandler() : this.fullscreenExitHandler();
    }

    /**
     * fullscreen enter handler function. updates the store with new value
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'fullscreenEnterHandler',
    value: function fullscreenEnterHandler() {
      this.player.notifyEnterFullscreen();
      this.props.updateFullscreen(true);
    }

    /**
     * fullscreen exit handler function. updates the store with new value
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'fullscreenExitHandler',
    value: function fullscreenExitHandler() {
      this.player.notifyExitFullscreen();
      this.props.updateFullscreen(false);
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
     * enter in browser fullscreen mode
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'enterInBrowserFullscreen',
    value: function enterInBrowserFullscreen() {
      if (this._targetDiv) {
        this._targetDiv.classList.add(_style2.default.inBrowserFullscreenMode);
        this.player.notifyEnterFullscreen();
        this.props.updateFullscreen(true);
        window.dispatchEvent(new Event('resize'));
      }
    }

    /**
     * exit in browser fullscreen mode
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'exitInBrowserFullscreen',
    value: function exitInBrowserFullscreen() {
      if (this._targetDiv) {
        this._targetDiv.classList.remove(_style2.default.inBrowserFullscreenMode);
        this.player.notifyExitFullscreen();
        this.props.updateFullscreen(false);
        window.dispatchEvent(new Event('resize'));
      }
    }

    /**
     * if mobile detected, get the video element and request fullscreen.
     * otherwise, request fullscreen to the parent player view than includes the GUI as well
     *
     * @returns {void}
     * @memberof FullscreenControl
     */

  }, {
    key: 'enterFullscreen',
    value: function enterFullscreen() {
      if (this.player.env.os.name === 'iOS') {
        if (this.props.inBrowserFullscreenForIOS) {
          this.enterInBrowserFullscreen();
        } else {
          this.player.getVideoElement().webkitEnterFullScreen();
        }
      } else {
        if (this._targetDiv) {
          this.requestFullscreen(this._targetDiv);
        }
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
      if (this.player.env.os.name === 'iOS') {
        if (this.props.inBrowserFullscreenForIOS) {
          this.exitInBrowserFullscreen();
        } else {
          this.player.getVideoElement().webkitExitFullScreen();
        }
      } else if (typeof document.exitFullscreen === 'function') {
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
      this.notifyClick();
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
      var _this4 = this;

      return (0, _preact.h)(
        'div',
        { className: [_style2.default.controlButtonContainer, _style2.default.controlFullscreen].join(' ') },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            { tabIndex: '0',
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.fullscreen' }),
              className: this.props.fullscreen ? [_style2.default.controlButton, _style2.default.isFullscreen].join(' ') : _style2.default.controlButton,
              onClick: function onClick() {
                return _this4.toggleFullscreen();
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
exports.FullscreenControl = FullscreenControl;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeDisplayPlaybackContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _timeDisplay = __webpack_require__(47);

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
      return (0, _preact.h)(_timeDisplay.TimeDisplay, _extends({
        currentTime: props.currentTime,
        duration: props.duration
      }, props));
    }
  }]);

  return TimeDisplayPlaybackContainer;
}(_base2.default)) || _class);
exports.TimeDisplayPlaybackContainer = TimeDisplayPlaybackContainer;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeDisplay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _timeFormat = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        { className: _style2.default.timeDisplay },
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

exports.TimeDisplay = TimeDisplay;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _bindActions = __webpack_require__(5);

var _shell = __webpack_require__(7);

var _preactRedux = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var BottomBar = (_dec = (0, _preactRedux.connect)(null, (0, _bindActions.bindActions)(_shell.actions)), _dec(_class = function (_Component) {
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
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        { className: _style2.default.bottomBar,
          onMouseOver: function onMouseOver() {
            return _this2.props.updateBottomBarHoverActive(true);
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.props.updateBottomBarHoverActive(false);
          } },
        props.children
      );
    }
  }]);

  return BottomBar;
}(_preact.Component)) || _class);
exports.BottomBar = BottomBar;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayPortal = undefined;

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

exports.OverlayPortal = OverlayPortal;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnmuteIndication = exports.MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _eventManager = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The icon only default timeout
 * @type {number}
 * @const
 */
var MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT = exports.MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT = 3000;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    fallbackToMutedAutoPlay: state.engine.fallbackToMutedAutoPlay,
    isPlaying: state.engine.isPlaying,
    adBreak: state.engine.adBreak,
    adIsPlaying: state.engine.adIsPlaying
  };
};

/**
 * UnmuteIndication component
 *
 * @class UnmuteIndication
 * @example <UnmuteIndication player={this.player} />
 * @extends {BaseComponent}
 */
var UnmuteIndication = (_dec = (0, _preactRedux.connect)(mapStateToProps, null), _dec(_class = function (_BaseComponent) {
  _inherits(UnmuteIndication, _BaseComponent);

  /**
   * Creates an instance of UnmuteIndication.
   * @param {Object} obj obj
   * @memberof UnmuteIndication
   */
  function UnmuteIndication(obj) {
    _classCallCheck(this, UnmuteIndication);

    var _this = _possibleConstructorReturn(this, (UnmuteIndication.__proto__ || Object.getPrototypeOf(UnmuteIndication)).call(this, { name: 'UnmuteIndication', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    _this._iconOnlyTimeoutCallback = _this._iconOnlyTimeout.bind(_this);
    return _this;
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof UnmuteIndication
   */

  /**
   * The icon only timeout bounded method reference
   * @private
   * @memberof UnmuteIndication
   * @type {Function}
   */


  _createClass(UnmuteIndication, [{
    key: 'isPlayingAdOrPlayback',
    value: function isPlayingAdOrPlayback() {
      return this.props.adBreak && this.props.adIsPlaying || !this.props.adBreak && this.props.isPlaying;
    }

    /**
     * after component updated, check the fallbackToMutedAutoPlay prop for updating the state of the component
     *
     * @param {Object} prevProps - previous component props
     * @method componentDidUpdate
     * @returns {void}
     * @memberof UnmuteIndication
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.fallbackToMutedAutoPlay && this.props.fallbackToMutedAutoPlay) {
        this._eventManager.listen(this.player, this.player.Event.PLAYING, this._iconOnlyTimeoutCallback);
        this._eventManager.listen(this.player, this.player.Event.AD_STARTED, this._iconOnlyTimeoutCallback);
      }
    }

    /**
     * The icon only timeout handler
     * @private
     * @memberof UnmuteIndication
     * @returns {void}
     */

  }, {
    key: '_iconOnlyTimeout',
    value: function _iconOnlyTimeout() {
      var _this2 = this;

      this.player.removeEventListener(this.player.Event.PLAYING, this._iconOnlyTimeoutCallback);
      this.player.removeEventListener(this.player.Event.AD_STARTED, this._iconOnlyTimeoutCallback);
      setTimeout(function () {
        _this2.setState({ iconOnly: true });
      }, MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT);
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {?React$Element} component element
     * @memberof UnmuteIndication
     */

  }, {
    key: 'render',
    value: function render(props) {
      var _this3 = this;

      if (!this.props.fallbackToMutedAutoPlay || !this.isPlayingAdOrPlayback()) return undefined;

      var styleClass = [_style2.default.unmuteButtonContainer];
      if (props.hasTopBar) styleClass.push(_style2.default.hasTopBar);
      if (this.state.iconOnly) styleClass.push(_style2.default.showIconOnly);

      return (0, _preact.h)(
        'div',
        {
          className: styleClass.join(' '),
          onMouseOver: function onMouseOver() {
            return _this3.setState({ iconOnly: false });
          },
          onMouseOut: function onMouseOut() {
            return _this3.setState({ iconOnly: true });
          },
          onClick: function onClick() {
            return _this3.player.muted = !_this3.player.muted;
          } },
        (0, _preact.h)(
          'a',
          { className: [_style2.default.btn, _style2.default.btnDarkTransparent, _style2.default.unmuteButton].join(' ') },
          (0, _preact.h)(
            'div',
            { className: _style2.default.unmuteIconContainer },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeBase }),
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.VolumeMute })
          ),
          (0, _preact.h)(
            'span',
            null,
            'Unmute'
          )
        )
      );
    }
  }]);

  return UnmuteIndication;
}(_base2.default)) || _class);
exports.UnmuteIndication = UnmuteIndication;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adsUI = adsUI;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _loading = __webpack_require__(15);

var _playPause = __webpack_require__(22);

var _volume = __webpack_require__(23);

var _fullscreen = __webpack_require__(24);

var _timeDisplayAdsContainer = __webpack_require__(70);

var _adSkip = __webpack_require__(71);

var _adLearnMore = __webpack_require__(72);

var _topBar = __webpack_require__(73);

var _bottomBar = __webpack_require__(25);

var _unmuteIndication = __webpack_require__(27);

var _keyboard = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ads ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {?HTMLElement} player ui tree
 */
function adsUI(props) {
  if (useDefaultAdsUi(props)) {
    return (0, _preact.h)(
      'div',
      { className: _style2.default.adGuiWrapper },
      (0, _preact.h)(_loading.Loading, { player: props.player }),
      (0, _preact.h)(
        'div',
        { className: _style2.default.playerGui, id: 'player-gui' },
        (0, _preact.h)(_unmuteIndication.UnmuteIndication, { player: props.player, hasTopBar: true })
      )
    );
  }
  var adsUiCustomization = getAdsUiCustomization();
  return (0, _preact.h)(
    'div',
    { className: _style2.default.adGuiWrapper },
    (0, _preact.h)(_keyboard.KeyboardControl, { player: props.player, config: props.config }),
    (0, _preact.h)(_loading.Loading, { player: props.player }),
    (0, _preact.h)(
      'div',
      { className: _style2.default.playerGui, id: 'player-gui' },
      (0, _preact.h)(_unmuteIndication.UnmuteIndication, { player: props.player, hasTopBar: true }),
      (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          _topBar.TopBar,
          null,
          (0, _preact.h)(
            'div',
            { className: _style2.default.leftControls },
            (0, _preact.h)(
              'span',
              { className: _style2.default.fontSizeBase },
              'Advertisement'
            )
          ),
          (0, _preact.h)(
            'div',
            { className: _style2.default.rightControls },
            adsUiCustomization.learnMoreButton ? (0, _preact.h)(_adLearnMore.AdLearnMore, null) : undefined
          )
        ),
        adsUiCustomization.skipButton ? (0, _preact.h)(_adSkip.AdSkip, { player: props.player }) : undefined
      ),
      (0, _preact.h)(
        _bottomBar.BottomBar,
        null,
        (0, _preact.h)(
          'div',
          { className: _style2.default.leftControls },
          (0, _preact.h)(_playPause.PlayPauseControl, { player: props.player }),
          (0, _preact.h)(_timeDisplayAdsContainer.TimeDisplayAdsContainer, null)
        ),
        (0, _preact.h)(
          'div',
          { className: _style2.default.rightControls },
          (0, _preact.h)(_volume.VolumeControl, { player: props.player }),
          (0, _preact.h)(_fullscreen.FullscreenControl, { player: props.player })
        )
      )
    )
  );
}

/**
 * Gets the ads ui customization settings
 * @returns {Object} - Customization object
 */

function getAdsUiCustomization() {
  return {
    learnMoreButton: useCustomLearnMoreButton(),
    skipButton: useCustomSkipButton()
  };
}

/**
 * Whether the default ads ui should be shown or not.
 * @param {any} props - component props
 * @returns {boolean} - Whether the default ads ui should be shown or not.
 */
function useDefaultAdsUi(props) {
  try {
    var isMobile = !!props.player.env.device.type;
    var adsRenderingSettings = props.player.config.plugins.ima.adsRenderingSettings;
    var useStyledLinearAds = adsRenderingSettings && adsRenderingSettings.useStyledLinearAds;
    return isMobile || useStyledLinearAds;
  } catch (e) {
    return false;
  }
}

/**
 * @returns {boolean} - Whether to use playkit skip button or not.
 */
function useCustomSkipButton() {
  //TODO: false until we develop are own ads manager
  return false;
}

/**
 * @returns {boolean} - Whether to use playkit learn more button or not.
 */
function useCustomLearnMoreButton() {
  //TODO: false until we develop are own ads manager
  return false;
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeDisplayAdsContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _timeDisplay = __webpack_require__(47);

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
      return (0, _preact.h)(_timeDisplay.TimeDisplay, _extends({
        currentTime: Math.round(props.adProgress.currentTime),
        duration: Math.round(props.adProgress.duration)
      }, props));
    }
  }]);

  return TimeDisplayAdsContainer;
}(_base2.default)) || _class);
exports.TimeDisplayAdsContainer = TimeDisplayAdsContainer;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdSkip = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _base = __webpack_require__(3);

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
          { className: [_style2.default.btn, _style2.default.btnBranded, _style2.default.btnSkipAd].join(' '), onClick: function onClick() {
              return _this2.player.skipAd();
            } },
          this.skipSupport.label || 'Skip ad'
        ) : (0, _preact.h)(
          'span',
          { className: _style2.default.skipAd },
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
exports.AdSkip = AdSkip;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdLearnMore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

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
        { href: props.url, target: '_blank', className: [_style2.default.btn, _style2.default.btnDarkTransparent].join(' ') },
        'Learn more'
      );
    }
  }]);

  return AdLearnMore;
}(_preact.Component)) || _class);
exports.AdLearnMore = AdLearnMore;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        { className: _style2.default.topBar },
        props.children
      );
    }
  }]);

  return TopBar;
}(_preact.Component);

exports.TopBar = TopBar;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorUI = errorUI;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _errorOverlay = __webpack_require__(74);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error ui
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
function errorUI(props) {
  return (0, _preact.h)(
    'div',
    { className: _style2.default.playbackGuiWWrapper },
    (0, _preact.h)(_errorOverlay.ErrorOverlay, { player: props.player })
  );
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorOverlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _overlay = __webpack_require__(16);

var _preactI18n = __webpack_require__(10);

var _bindActions = __webpack_require__(5);

var _engine = __webpack_require__(14);

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
    config: state.config.components.error,
    hasError: state.engine.hasError
  };
};

/**
 * errorOverlay component
 *
 * @class errorOverlay
 * @extends {BaseComponent}
 */
var ErrorOverlay = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(_engine.actions)), _dec(_class = function (_BaseComponent) {
  _inherits(ErrorOverlay, _BaseComponent);

  /**
   * Creates an instance of ErrorObject.
   * @param {Object} obj obj
   * @memberof ErrorObejct
   */
  function ErrorOverlay(obj) {
    _classCallCheck(this, ErrorOverlay);

    return _possibleConstructorReturn(this, (ErrorOverlay.__proto__ || Object.getPrototypeOf(ErrorOverlay)).call(this, { name: 'ErrorOverlay', player: obj.player }));
  }

  /**
   * copy input text based on input element.
   * on success, set success internal component state for 2 seconds
   * @returns {void}
   * @memberof ShareOverlay
   */


  _createClass(ErrorOverlay, [{
    key: 'copyError',
    value: function copyError() {
      var _this2 = this;

      var selection = window.getSelection();
      var range = document.createRange();
      try {
        range.selectNode(this.sessionEl);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        this.setState({ copySuccess: true });
        setTimeout(function () {
          return _this2.setState({ copySuccess: false });
        }, 2000);
      } catch (e) {
        this.setState({ copySuccess: false });
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
      this.player.loadMedia(this.props.config.mediaInfo);
    }

    /**
     * render the sessionID line
     *
     * @returns {React$Element} - main state element
     * @memberof ErrorOverlay
     */

  }, {
    key: 'renderSessionID',
    value: function renderSessionID() {
      var _this3 = this;

      var sessionId = this.player && this.player.config && this.player.config.session && this.player.config.session.id;
      var copyUrlClasses = [_style2.default.btnCopyUrl].join(' ');
      copyUrlClasses += this.state.copySuccess ? ' ' + _style2.default.copied : '';
      if (sessionId) {
        return (0, _preact.h)(
          'div',
          { className: _style2.default.linkOptionsContainer },
          (0, _preact.h)(
            'div',
            { className: _style2.default.copyUrlRow },
            (0, _preact.h)(
              'div',
              { ref: function ref(el) {
                  _this3.sessionEl = el;
                }, className: _style2.default.errorSession },
              (0, _preact.h)(_preactI18n.Text, { id: 'error.default_session_text' }),
              sessionId
            ),
            (0, _preact.h)(
              'a',
              {
                className: copyUrlClasses,
                onClick: function onClick() {
                  return _this3.copyError();
                } },
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Copy }),
              (0, _preact.h)(_icon2.default, { type: _icon.IconType.Check })
            )
          )
        );
      } else {
        return undefined;
      }
    }

    /**
     * render the retry button
     *
     * @returns {React$Element} - main state element
     * @memberof ErrorOverlay
     */

  }, {
    key: 'renderRetryButton',
    value: function renderRetryButton() {
      var _this4 = this;

      if (this.props.config.mediaInfo) {
        return (0, _preact.h)(
          'div',
          { className: _style2.default.controlButtonContainer, onClick: function onClick() {
              return _this4.handleClick();
            } },
          (0, _preact.h)(
            'button',
            { className: [_style2.default.controlButton, _style2.default.retryBtn].join(' ') },
            (0, _preact.h)(_preactI18n.Text, { id: 'core.retry' })
          )
        );
      } else {
        return undefined;
      }
    }

    /**
     * render main state
     *
     * @returns {?React$Element} - main state element
     * @memberof ErrorOverlay
     */

  }, {
    key: 'render',
    value: function render() {
      if (this.props && this.props.hasError) {
        return (0, _preact.h)(
          'div',
          { id: 'overlay-portal' },
          (0, _preact.h)(
            _overlay.Overlay,
            { open: true, permanent: true, type: 'error' },
            (0, _preact.h)(
              'div',
              { className: _style2.default.errorOverlay },
              (0, _preact.h)('p', { className: _style2.default.errorText }),
              (0, _preact.h)(
                'div',
                { className: _style2.default.svgContainer },
                (0, _preact.h)(
                  'svg',
                  { width: '124', height: '110', viewBox: '0 0 124 110', xmlns: 'http://www.w3.org/2000/svg',
                    xmlnsXlink: 'http://www.w3.org/1999/xlink' },
                  (0, _preact.h)(
                    'defs',
                    null,
                    (0, _preact.h)('polygon', { id: 'path-1',
                      points: '58.0906294 70 50.7492774 88.8201923 60.1881585 88.8201923 54.22331 107 73.8876457 84.2307692 64.0554779 84.2307692 70.6102564 70' })
                  ),
                  (0, _preact.h)(
                    'g',
                    { id: 'Player-v3', fill: 'none', fillRule: 'evenodd' },
                    (0, _preact.h)(
                      'g',
                      { id: 'Desktop---Default---Error', transform: 'translate(-365 -103)' },
                      (0, _preact.h)(
                        'g',
                        { id: 'Cloud', transform: 'translate(366 104)' },
                        (0, _preact.h)('path', {
                          d: 'M63.5662942,30.179068 C61.0506558,29.4162424 58.3339083,29 55.5,29 C42.5213084,29 32,37.7304474 32,48.5 C32,48.6497107 32.0020332,48.7990274 32.0060779,48.947932 L32.0060779,48.947932 C20.975194,51.4855427 13,58.8323573 13,67.5 C13,71.2164926 14.4662425,74.6901504 17.0109182,77.6459815 C17.3714483,67.0552274 26.624181,58.1393462 39.3259742,55.0194402 L39.3259742,55.0194402 C39.3212229,54.8326784 39.3188345,54.6453999 39.3188345,54.4576271 C39.3188345,41.956968 49.9040267,31.6467441 63.5662942,30.179068 Z',
                          id: 'Combined-Shape', fillOpacity: '.08', fill: '#2E2E2E' }),
                        (0, _preact.h)('path', {
                          d: 'M31.0032591,48.1614253 C31.2192187,36.9518144 42.1402046,28 55.5,28 C64.749856,28 73.0886419,32.3249294 77.2653132,39.0733535 C84.8537029,39.7078593 90.7909537,44.3809769 90.9945979,50.1913309 C102.911627,51.5069936 112,59.4322556 112,69 C112,79.5603607 100.981582,88 87.5,88 C84.4639246,88 81.503099,87.5724513 78.7283559,86.7489741 C74.6488476,88.1943213 69.4726739,89 64,89 C58.7323857,89 53.737093,88.2538247 49.7263698,86.9058736 C46.7827225,87.6274324 43.6763865,88 40.5,88 C24.8190401,88 12,78.9101352 12,67.5 C12,58.659353 19.7679337,51.004786 31.0032591,48.1614253 Z',
                          id: 'Combined-Shape', stroke: '#666', strokeWidth: '2' }),
                        (0, _preact.h)(
                          'g',
                          { id: 'Path-8', strokeLinecap: 'round', strokeLinejoin: 'round' },
                          (0, _preact.h)('use', { fill: '#666', xlinkHref: '#path-1' }),
                          (0, _preact.h)('path', { stroke: '#1D1D1D', strokeWidth: '2',
                            d: 'M65.6170644,83.2307692 L76.0725949,83.2307692 L51.7165365,111.432521 L58.8076053,89.8201923 L49.2858112,89.8201923 L57.4073201,69 L72.1718429,69 L65.6170644,83.2307692 Z' })
                        ),
                        (0, _preact.h)('path', {
                          d: 'M59.9991166,0 L59.9991166,7.04768642 C59.9991166,7.59997117 60.4468318,8.04768642 60.9991166,8.04768642 C61.5514013,8.04768642 61.9991166,7.59997117 61.9991166,7.04768642 L61.9991166,0 C61.9991166,-0.55228475 61.5514013,-1 60.9991166,-1 C60.4468318,-1 59.9991166,-0.55228475 59.9991166,0 Z M95.3084192,8.85153517 L90.7782537,14.2503762 C90.4232519,14.6734508 90.4784359,15.3042064 90.9015106,15.6592082 C91.3245852,16.01421 91.9553408,15.9590261 92.3103426,15.5359514 L96.8405081,10.1371104 C97.1955099,9.71403572 97.140326,9.08328013 96.7172513,8.72827833 C96.2941766,8.37327654 95.663421,8.4284605 95.3084192,8.85153517 Z M121.628196,36.6783398 L114.687579,37.9021577 C114.143685,37.9980609 113.780517,38.5167193 113.87642,39.0606136 C113.972323,39.6045079 114.490981,39.9676764 115.034876,39.8717732 L121.975492,38.6479553 C122.519386,38.552052 122.882555,38.0333936 122.786652,37.4894993 C122.690748,36.945605 122.17209,36.5824365 121.628196,36.6783398 Z M0.0227411046,38.6479553 L6.96335733,39.8717732 C7.50725163,39.9676764 8.02591002,39.6045079 8.12181326,39.0606136 C8.2177165,38.5167193 7.85454799,37.9980609 7.31065368,37.9021577 L0.37003746,36.6783398 C-0.173856844,36.5824365 -0.69251523,36.945605 -0.788418471,37.4894993 C-0.884321711,38.0333936 -0.521153199,38.552052 0.0227411046,38.6479553 Z M25.157725,10.1371104 L29.6878905,15.5359514 C30.0428923,15.9590261 30.6736479,16.01421 31.0967226,15.6592082 C31.5197972,15.3042064 31.5749812,14.6734508 31.2199794,14.2503762 L26.6898139,8.85153517 C26.3348121,8.4284605 25.7040565,8.37327654 25.2809818,8.72827833 C24.8579072,9.08328013 24.8027232,9.71403572 25.157725,10.1371104 Z',
                          id: 'Path-9', fill: '#666', fillRule: 'nonzero' })
                      )
                    )
                  )
                )
              ),
              (0, _preact.h)(
                'div',
                { className: _style2.default.headline },
                this.props.errorHead ? this.props.errorHead : (0, _preact.h)(_preactI18n.Text, { id: 'error.default_error' })
              ),
              this.renderSessionID(),
              this.renderRetryButton()
            )
          )
        );
      } else {
        return undefined;
      }
    }
  }]);

  return ErrorOverlay;
}(_base2.default)) || _class);
exports.ErrorOverlay = ErrorOverlay;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.liveUI = liveUI;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _overlayAction = __webpack_require__(36);

var _prePlaybackPlayOverlay = __webpack_require__(38);

var _loading = __webpack_require__(15);

var _playPause = __webpack_require__(22);

var _seekbarLivePlaybackContainer = __webpack_require__(75);

var _volume = __webpack_require__(23);

var _settings = __webpack_require__(42);

var _language = __webpack_require__(46);

var _fullscreen = __webpack_require__(24);

var _bottomBar = __webpack_require__(25);

var _overlayPortal = __webpack_require__(48);

var _keyboard = __webpack_require__(26);

var _liveTag = __webpack_require__(76);

var _unmuteIndication = __webpack_require__(27);

var _watermark = __webpack_require__(49);

var _componentConfig = __webpack_require__(18);

var _vrStereoToggle = __webpack_require__(166);

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
    { className: _style2.default.playbackGuiWWrapper },
    (0, _preact.h)(_keyboard.KeyboardControl, { player: props.player, config: props.config }),
    (0, _preact.h)(_loading.Loading, { player: props.player }),
    (0, _preact.h)(
      'div',
      { className: _style2.default.playerGui, id: 'player-gui' },
      (0, _preact.h)(_overlayPortal.OverlayPortal, null),
      (0, _preact.h)(_unmuteIndication.UnmuteIndication, null),
      (0, _preact.h)(_overlayAction.OverlayAction, { player: props.player }),
      (0, _preact.h)(
        _bottomBar.BottomBar,
        null,
        (0, _preact.h)(_seekbarLivePlaybackContainer.SeekBarLivePlaybackContainer, {
          showFramePreview: true,
          showTimeBubble: true,
          player: props.player,
          playerContainer: props.playerContainer }),
        (0, _preact.h)(
          'div',
          { className: _style2.default.leftControls },
          (0, _preact.h)(_playPause.PlayPauseControl, { player: props.player }),
          (0, _preact.h)(_liveTag.LiveTag, { player: props.player })
        ),
        (0, _preact.h)(
          'div',
          { className: _style2.default.rightControls },
          props.player.isVr() && (0, _componentConfig.shouldRenderComponent)(props.config, _vrStereoToggle.VrStereoToggleControl.displayName) ? (0, _preact.h)(_vrStereoToggle.VrStereoToggleControl, { player: props.player }) : undefined,
          (0, _preact.h)(_volume.VolumeControl, { player: props.player }),
          (0, _preact.h)(_language.LanguageControl, { player: props.player }),
          (0, _preact.h)(_settings.SettingsControl, { player: props.player }),
          (0, _preact.h)(_fullscreen.FullscreenControl, { player: props.player })
        )
      )
    ),
    (0, _preact.h)(_prePlaybackPlayOverlay.PrePlaybackPlayOverlay, { player: props.player }),
    (0, _componentConfig.shouldRenderComponent)(props.config, _watermark.Watermark.displayName) ? (0, _preact.h)(_watermark.Watermark, { player: props.player }) : undefined
  );
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekBarLivePlaybackContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _seekbar = __webpack_require__(17);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _seekbar2 = __webpack_require__(39);

var _eventManager = __webpack_require__(9);

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

    var _this = _possibleConstructorReturn(this, (SeekBarLivePlaybackContainer.__proto__ || Object.getPrototypeOf(SeekBarLivePlaybackContainer)).call(this, { name: 'SeekBarLivePlaybackContainer', player: obj.player }));

    _this._eventManager = _eventManager.UIEventManager.getInstance();
    return _this;
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

      this._eventManager.listen(this.player, this.player.Event.TIME_UPDATE, function () {
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

      if (!props.isDvr) {
        return undefined;
      }
      return (0, _preact.h)(_seekbar2.SeekBarControl, {
        player: this.props.player,
        playerElement: this.props.playerContainer,
        showTimeBubble: this.props.showTimeBubble,
        changeCurrentTime: function changeCurrentTime(time) {
          return _this3.player.currentTime = time;
        },
        playerPoster: this.props.poster,
        updateSeekbarDraggingStatus: function updateSeekbarDraggingStatus(data) {
          return _this3.props.updateSeekbarDraggingStatus(data);
        },
        updateSeekbarHoverActive: function updateSeekbarHoverActive(data) {
          return _this3.props.updateSeekbarHoverActive(data);
        },
        updateCurrentTime: function updateCurrentTime(data) {
          return _this3.props.updateCurrentTime(data);
        },
        isDvr: this.props.isDvr,
        currentTime: this.props.currentTime,
        duration: this.props.duration,
        isDraggingActive: this.props.isDraggingActive,
        isMobile: this.props.isMobile,
        notifyChange: function notifyChange(payload) {
          return _this3.notifyChange(payload);
        }
      });
    }
  }]);

  return SeekBarLivePlaybackContainer;
}(_base2.default)) || _class);
exports.SeekBarLivePlaybackContainer = SeekBarLivePlaybackContainer;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiveTag = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(2);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _keyMap = __webpack_require__(6);

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
      this.notifyClick();
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

      var tagStyleClass = [_style2.default.liveTag];
      if (props.isDvr && !this.isOnLiveEdge()) tagStyleClass.push(_style2.default.nonLivePlayhead);

      return (0, _preact.h)(
        'div',
        { tabIndex: '0',
          className: tagStyleClass.join(' '),
          onClick: function onClick() {
            return _this2.onClick();
          },
          onKeyDown: function onKeyDown(e) {
            if (e.keyCode === _keyMap.KeyMap.ENTER) {
              _this2.onClick();
            }
          } },
        'Live'
      );
    }
  }]);

  return LiveTag;
}(_base2.default)) || _class);
exports.LiveTag = LiveTag;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = undefined;

var _redux = __webpack_require__(12);

var _eventDispatcher = __webpack_require__(56);

var _logger = __webpack_require__(154);

/**
 * Creates the redux middleware.
 * @param {Player} player - The video player.
 * @param {UIOptionsObject} config - The UI config.
 * @return {GenericStoreEnhancer} - The redux middleware.
 */
var middleware = function middleware(player, config) {
  return (0, _redux.applyMiddleware)((0, _logger.loggerMiddleware)(config), (0, _eventDispatcher.eventDispatcherMiddleware)(player));
};
exports.middleware = middleware;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggerMiddleware = undefined;

var _logger = __webpack_require__(29);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('UILoggerMiddleware');

/**
 * The logger middleware.
 * Prints action logs in case of received debug=true from the UI config.
 * @param {UIOptionsObject} config - The UI config.
 * @returns {void}
 */

var loggerMiddleware = function loggerMiddleware(config) {
  return function (store) {
    return function (next) {
      return function (action) {
        // eslint-disable-line no-unused-vars
        if (config.debugActions) {
          logger.debug('Action fired', action);
        }
        next(action);
      };
    };
  };
};

exports.loggerMiddleware = loggerMiddleware;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.volume = exports.shell = exports.share = exports.setting = exports.seekbar = exports.overlayAction = exports.loading = exports.fullscreen = exports.engine = exports.cvaa = exports.config = undefined;

var _config2 = __webpack_require__(13);

var _config = _interopRequireWildcard(_config2);

var _cvaa2 = __webpack_require__(20);

var _cvaa = _interopRequireWildcard(_cvaa2);

var _engine2 = __webpack_require__(14);

var _engine = _interopRequireWildcard(_engine2);

var _fullscreen2 = __webpack_require__(32);

var _fullscreen = _interopRequireWildcard(_fullscreen2);

var _loading2 = __webpack_require__(19);

var _loading = _interopRequireWildcard(_loading2);

var _overlayAction2 = __webpack_require__(21);

var _overlayAction = _interopRequireWildcard(_overlayAction2);

var _seekbar2 = __webpack_require__(17);

var _seekbar = _interopRequireWildcard(_seekbar2);

var _settings = __webpack_require__(35);

var _setting = _interopRequireWildcard(_settings);

var _share2 = __webpack_require__(34);

var _share = _interopRequireWildcard(_share2);

var _shell2 = __webpack_require__(7);

var _shell = _interopRequireWildcard(_shell2);

var _volume2 = __webpack_require__(31);

var _volume = _interopRequireWildcard(_volume2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.config = _config;
exports.cvaa = _cvaa;
exports.engine = _engine;
exports.fullscreen = _fullscreen;
exports.loading = _loading;
exports.overlayAction = _overlayAction;
exports.seekbar = _seekbar;
exports.setting = _setting;
exports.share = _share;
exports.shell = _shell;
exports.volume = _volume;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adLearnMore = __webpack_require__(72);

Object.defineProperty(exports, 'AdLearnMore', {
  enumerable: true,
  get: function get() {
    return _adLearnMore.AdLearnMore;
  }
});

var _adSkip = __webpack_require__(71);

Object.defineProperty(exports, 'AdSkip', {
  enumerable: true,
  get: function get() {
    return _adSkip.AdSkip;
  }
});

var _base = __webpack_require__(3);

Object.defineProperty(exports, 'BaseComponent', {
  enumerable: true,
  get: function get() {
    return _base.BaseComponent;
  }
});

var _bottomBar = __webpack_require__(25);

Object.defineProperty(exports, 'BottomBar', {
  enumerable: true,
  get: function get() {
    return _bottomBar.BottomBar;
  }
});

var _cvaaOverlay = __webpack_require__(65);

Object.defineProperty(exports, 'CVAAOverlay', {
  enumerable: true,
  get: function get() {
    return _cvaaOverlay.CVAAOverlay;
  }
});

var _dropdown = __webpack_require__(45);

Object.defineProperty(exports, 'DropDown', {
  enumerable: true,
  get: function get() {
    return _dropdown.DropDown;
  }
});

var _engineConnector = __webpack_require__(55);

Object.defineProperty(exports, 'EngineConnector', {
  enumerable: true,
  get: function get() {
    return _engineConnector.EngineConnector;
  }
});

var _errorOverlay = __webpack_require__(74);

Object.defineProperty(exports, 'ErrorOverlay', {
  enumerable: true,
  get: function get() {
    return _errorOverlay.ErrorOverlay;
  }
});

var _fullscreen = __webpack_require__(24);

Object.defineProperty(exports, 'FullscreenControl', {
  enumerable: true,
  get: function get() {
    return _fullscreen.FullscreenControl;
  }
});

var _icon = __webpack_require__(4);

Object.defineProperty(exports, 'Icon', {
  enumerable: true,
  get: function get() {
    return _icon.Icon;
  }
});
Object.defineProperty(exports, 'IconType', {
  enumerable: true,
  get: function get() {
    return _icon.IconType;
  }
});

var _keyboard = __webpack_require__(26);

Object.defineProperty(exports, 'KeyboardControl', {
  enumerable: true,
  get: function get() {
    return _keyboard.KeyboardControl;
  }
});

var _language = __webpack_require__(46);

Object.defineProperty(exports, 'LanguageControl', {
  enumerable: true,
  get: function get() {
    return _language.LanguageControl;
  }
});

var _liveTag = __webpack_require__(76);

Object.defineProperty(exports, 'LiveTag', {
  enumerable: true,
  get: function get() {
    return _liveTag.LiveTag;
  }
});

var _loading = __webpack_require__(15);

Object.defineProperty(exports, 'Loading', {
  enumerable: true,
  get: function get() {
    return _loading.Loading;
  }
});

var _menu = __webpack_require__(64);

Object.defineProperty(exports, 'Menu', {
  enumerable: true,
  get: function get() {
    return _menu.Menu;
  }
});

var _overlay = __webpack_require__(16);

Object.defineProperty(exports, 'Overlay', {
  enumerable: true,
  get: function get() {
    return _overlay.Overlay;
  }
});

var _overlayAction = __webpack_require__(36);

Object.defineProperty(exports, 'OverlayAction', {
  enumerable: true,
  get: function get() {
    return _overlayAction.OverlayAction;
  }
});

var _overlayPortal = __webpack_require__(48);

Object.defineProperty(exports, 'OverlayPortal', {
  enumerable: true,
  get: function get() {
    return _overlayPortal.OverlayPortal;
  }
});

var _playPause = __webpack_require__(22);

Object.defineProperty(exports, 'PlayPauseControl', {
  enumerable: true,
  get: function get() {
    return _playPause.PlayPauseControl;
  }
});

var _prePlaybackPlayOverlay = __webpack_require__(38);

Object.defineProperty(exports, 'PrePlaybackPlayOverlay', {
  enumerable: true,
  get: function get() {
    return _prePlaybackPlayOverlay.PrePlaybackPlayOverlay;
  }
});

var _rewind = __webpack_require__(61);

Object.defineProperty(exports, 'RewindControl', {
  enumerable: true,
  get: function get() {
    return _rewind.RewindControl;
  }
});

var _seekbar = __webpack_require__(39);

Object.defineProperty(exports, 'SeekBarControl', {
  enumerable: true,
  get: function get() {
    return _seekbar.SeekBarControl;
  }
});

var _seekbarLivePlaybackContainer = __webpack_require__(75);

Object.defineProperty(exports, 'SeekBarLivePlaybackContainer', {
  enumerable: true,
  get: function get() {
    return _seekbarLivePlaybackContainer.SeekBarLivePlaybackContainer;
  }
});

var _seekbarPlaybackContainer = __webpack_require__(62);

Object.defineProperty(exports, 'SeekBarPlaybackContainer', {
  enumerable: true,
  get: function get() {
    return _seekbarPlaybackContainer.SeekBarPlaybackContainer;
  }
});

var _settings = __webpack_require__(42);

Object.defineProperty(exports, 'SettingsControl', {
  enumerable: true,
  get: function get() {
    return _settings.SettingsControl;
  }
});

var _share = __webpack_require__(157);

Object.defineProperty(exports, 'ShareControl', {
  enumerable: true,
  get: function get() {
    return _share.ShareControl;
  }
});

var _shareOverlay = __webpack_require__(77);

Object.defineProperty(exports, 'ShareOverlay', {
  enumerable: true,
  get: function get() {
    return _shareOverlay.ShareOverlay;
  }
});

var _shell = __webpack_require__(57);

Object.defineProperty(exports, 'Shell', {
  enumerable: true,
  get: function get() {
    return _shell.Shell;
  }
});

var _slider = __webpack_require__(66);

Object.defineProperty(exports, 'Slider', {
  enumerable: true,
  get: function get() {
    return _slider.Slider;
  }
});

var _smartContainer = __webpack_require__(43);

Object.defineProperty(exports, 'SmartContainer', {
  enumerable: true,
  get: function get() {
    return _smartContainer.SmartContainer;
  }
});

var _timeDisplay = __webpack_require__(47);

Object.defineProperty(exports, 'TimeDisplay', {
  enumerable: true,
  get: function get() {
    return _timeDisplay.TimeDisplay;
  }
});

var _timeDisplayAdsContainer = __webpack_require__(70);

Object.defineProperty(exports, 'TimeDisplayAdsContainer', {
  enumerable: true,
  get: function get() {
    return _timeDisplayAdsContainer.TimeDisplayAdsContainer;
  }
});

var _timeDisplayPlaybackContainer = __webpack_require__(69);

Object.defineProperty(exports, 'TimeDisplayPlaybackContainer', {
  enumerable: true,
  get: function get() {
    return _timeDisplayPlaybackContainer.TimeDisplayPlaybackContainer;
  }
});

var _tooltip = __webpack_require__(160);

Object.defineProperty(exports, 'Tooltip', {
  enumerable: true,
  get: function get() {
    return _tooltip.Tooltip;
  }
});

var _topBar = __webpack_require__(73);

Object.defineProperty(exports, 'TopBar', {
  enumerable: true,
  get: function get() {
    return _topBar.TopBar;
  }
});

var _unmuteIndication = __webpack_require__(27);

Object.defineProperty(exports, 'UnmuteIndication', {
  enumerable: true,
  get: function get() {
    return _unmuteIndication.UnmuteIndication;
  }
});

var _videoPlayer = __webpack_require__(59);

Object.defineProperty(exports, 'VideoPlayer', {
  enumerable: true,
  get: function get() {
    return _videoPlayer.VideoPlayer;
  }
});

var _volume = __webpack_require__(23);

Object.defineProperty(exports, 'VolumeControl', {
  enumerable: true,
  get: function get() {
    return _volume.VolumeControl;
  }
});

var _watermark = __webpack_require__(162);

Object.defineProperty(exports, 'Watermark', {
  enumerable: true,
  get: function get() {
    return _watermark.Watermark;
  }
});

var _vrStereoToggle = __webpack_require__(166);

Object.defineProperty(exports, 'VrStereoToggleControl', {
  enumerable: true,
  get: function get() {
    return _vrStereoToggle.VrStereoToggleControl;
  }
});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _share = __webpack_require__(158);

Object.defineProperty(exports, 'ShareControl', {
  enumerable: true,
  get: function get() {
    return _share.ShareControl;
  }
});

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _shareOverlay = __webpack_require__(77);

var _preactPortal = __webpack_require__(44);

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
            },
            'aria-label': 'Share' },
          (0, _preact.h)(_icon2.default, { type: _icon.IconType.Share })
        ),
        this.state.overlay ? (0, _preact.h)(
          _preactPortal2.default,
          { into: '#overlay-portal' },
          (0, _preact.h)(_shareOverlay.ShareOverlay, { player: this.player, onClose: function onClose() {
              return _this2.toggleOverlay();
            } })
        ) : null
      );
    }
  }]);

  return ShareControl;
}(_base2.default);

exports.ShareControl = ShareControl;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareOverlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _preactRedux = __webpack_require__(2);

var _bindActions = __webpack_require__(5);

var _share = __webpack_require__(34);

var _timeFormat = __webpack_require__(40);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _overlay = __webpack_require__(16);

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
                href: 'https://player.kaltura.com/video/220277207/share/google-plus', target: '_blank',
                rel: 'noopener noreferrer',
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
        _overlay.Overlay,
        { open: true, onClose: function onClose() {
            return props.onClose();
          }, type: 'share' },
        this.renderStateContent()
      );
    }
  }]);

  return ShareOverlay;
}(_base2.default)) || _class);
exports.ShareOverlay = ShareOverlay;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tooltip = __webpack_require__(161);

Object.defineProperty(exports, 'Tooltip', {
  enumerable: true,
  get: function get() {
    return _tooltip.Tooltip;
  }
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Tooltip component
 *
 * @class Tooltip
 * @example <Tooltip>...</Tooltip>
 * @extends {Component}
 */
var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: 'render',

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof Tooltip
     */
    value: function render(props) {
      var className = [_style2.default.tooltip];
      if (props.out) className.push(_style2.default.out);

      return (0, _preact.h)(
        'div',
        { className: className.join(' '), style: props.left ? { left: props.left } : '' },
        props.children
      );
    }
  }]);

  return Tooltip;
}(_preact.Component);

exports.Tooltip = Tooltip;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _watermark = __webpack_require__(49);

Object.defineProperty(exports, 'Watermark', {
  enumerable: true,
  get: function get() {
    return _watermark.Watermark;
  }
});

/***/ }),
/* 163 */,
/* 164 */,
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bindActions = __webpack_require__(5);

Object.defineProperty(exports, 'bindActions', {
  enumerable: true,
  get: function get() {
    return _bindActions.bindActions;
  }
});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vrStereoToggle = __webpack_require__(167);

Object.defineProperty(exports, 'VrStereoToggleControl', {
  enumerable: true,
  get: function get() {
    return _vrStereoToggle.VrStereoToggleControl;
  }
});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VrStereoToggleControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _preact = __webpack_require__(0);

var _preactI18n = __webpack_require__(10);

var _base = __webpack_require__(3);

var _base2 = _interopRequireDefault(_base);

var _icon = __webpack_require__(4);

var _icon2 = _interopRequireDefault(_icon);

var _keyMap = __webpack_require__(6);

var _engine = __webpack_require__(14);

var _bindActions = __webpack_require__(5);

var _preactRedux = __webpack_require__(2);

var _shell = __webpack_require__(7);

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
    vrStereoMode: state.engine.vrStereoMode,
    config: state.config.components.vrStereo
  };
};

/**
 * VrStereoToggleControl component
 *
 * @class VrStereoToggleControl
 * @example <VrStereoToggleControl player={this.player}/>
 * @extends {BaseComponent}
 */
var VrStereoToggleControl = (_dec = (0, _preactRedux.connect)(mapStateToProps, (0, _bindActions.bindActions)(Object.assign({}, _shell.actions, _engine.actions))), _dec(_class = function (_BaseComponent) {
  _inherits(VrStereoToggleControl, _BaseComponent);

  /**
   * Creates an instance of VrStereoToggleControl.
   * @param {Object} obj obj
   * @memberof VrStereoToggleControl
   */
  function VrStereoToggleControl(obj) {
    _classCallCheck(this, VrStereoToggleControl);

    return _possibleConstructorReturn(this, (VrStereoToggleControl.__proto__ || Object.getPrototypeOf(VrStereoToggleControl)).call(this, { name: VrStereoToggleControl.displayName, player: obj.player }));
  }

  /**
   * Vr-Stereo click handler
   *
   * @returns {void}
   * @memberof VrStereoToggleControl
   */

  /**
   * @static
   * @type {string} - Component display name
   */


  _createClass(VrStereoToggleControl, [{
    key: 'onClick',
    value: function onClick() {
      this.player.toggleVrStereoMode();
      this.props.updateVrStereoMode(!this.props.vrStereoMode);
    }

    /**
     * before component mounted, set initial state
     *
     * @returns {void}
     * @memberof VrStereoToggleControl
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.updateVrStereoMode(this.props.config.vrStereoMode);
    }
    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof VrStereoToggleControl
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        { className: [_style2.default.controlButtonContainer, _style2.default.controlVrStereo].join(' ') },
        (0, _preact.h)(
          _preactI18n.Localizer,
          null,
          (0, _preact.h)(
            'button',
            {
              tabIndex: '0',
              'aria-label': (0, _preact.h)(_preactI18n.Text, { id: 'controls.vrStereo' }),
              className: this.props.vrStereoMode ? [_style2.default.controlButton, _style2.default.vrStereoMode].join(' ') : _style2.default.controlButton,
              onClick: function onClick() {
                return _this2.onClick();
              },
              onKeyDown: function onKeyDown(e) {
                if (e.keyCode === _keyMap.KeyMap.ENTER) {
                  _this2.onClick();
                }
              } },
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.vrStereo }),
            (0, _preact.h)(_icon2.default, { type: _icon.IconType.vrStereoFull })
          )
        )
      );
    }
  }]);

  return VrStereoToggleControl;
}(_base2.default)) || _class);
VrStereoToggleControl.displayName = 'vrStereo';
exports.VrStereoToggleControl = VrStereoToggleControl;

/***/ })
/******/ ]);
});
//# sourceMappingURL=playkit-ui.js.map