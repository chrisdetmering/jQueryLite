/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection {\n\n  constructor(nodes)  {\n    this.nodes = nodes;\n  }\n\n\n  each(callback) { \n    this.nodes.forEach(callback);\n  }\n\n  changeHTML(html) {\n    this.each(node => {\n      node.innerHTML = html;\n    });\n  }\n\n  html(html) { \n    if (html === undefined) { \n      return this.nodes[0].innerHTML;\n    } else { \n      this.changeHTML(html)\n    }\n  }\n\n  empty() { \n    this.html(\"\"); \n  }\n\n  changeHTML(html) { \n    this.each(node => {\n      node.innerHTML = html;\n    });\n  }\n\n  //simplify and refactor\n  append(content) { \n    if (typeof content === 'object') { \n      this.handleElementOrDomNodes(content)\n    } else { \n      this.addToInnerHTML(content)\n    }\n  }\n\n  handleElementOrDomNodes(content) { \n    if (content instanceof HTMLElement) { \n      this.addToInnerHTML(content.outerHTML)\n    } else { \n      this.addAndRemove(content)\n    }\n  }\n\n  addToInnerHTML(content) { \n    this.each(node => {\n      node.innerHTML += content;\n    }) \n  }\n\n  addAndRemove(content) { \n    this.each(selectedNode => {\n      content.each(node => {\n        selectedNode.innerHTML += node.outerHTML;\n        node.remove();\n      })\n    })\n  }\n\n  //attr \n\n  attr(name, value) { \n    if (arguments.length < 2) { \n      this.each(node => { node.setAttribute(name, value) });\n    } else { \n      return this.nodes[0].getAttribute(name);\n    }\n  }\n\n  addClass(newClass) { \n    this.each(element =>{ \n      element.classList.add(newClass)\n    });\n  }\n  \n  removeClass(newClass) {\n    this.each(element => {\n      element.classList.remove(newClass)\n    });\n  }\n\n  children() { \n    var children = [];\n    this.each(node => { \n        children = children.concat(Array.from(node.children)); \n    });\n    return new DomNodeCollection(children); \n  }\n   \n  parent() { \n    var parents = [];\n    this.each(node => {\n       parents.push(node.parentNode);\n    });\n\n    return new DomNodeCollection(parents);\n  }\n\n  find(selector) { \n    var found = [];\n    this.each(node => { \n      found = found.concat(Array.from(node.querySelectorAll(selector))); \n    });\n\n    return new DomNodeCollection(found); \n  }\n\n  remove() {\n    this.each(node => node.remove());\n  }\n\n\n  on(event, callback) { \n    this.each(node => { \n      node.setAttribute(event, callback)\n      node.addEventListener(event, callback);\n    })\n  }\n \n  off(event) { \n    this.each(node => {\n      let callback = node.getAttribute(event)\n      node.removeEventListener(event, callback);\n    })\n  }\n\n\n  \n}\n\n\nmodule.exports = DomNodeCollection\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nconst _docReadyCallbacks = [];\nlet _docReady = false; \n\nwindow.$1 = (arg) => { \n  switch(typeof arg) { \n    case 'function': \n      registerDocReadyCallBack(arg)\n    break; \n    case 'string': \n      return selectMatchingNodes(arg);\n    break; \n    case 'object': \n      if (arg instanceof HTMLElement) { \n        return new DomNodeCollection([arg]);\n      }\n    break; \n  }\n}; \n\n\n$1.ajax = (options) => { \n  const request = new XMLHttpRequest();\n  options = $1.extend(settings, options)\n  options.method.toUpperCase();\n\n  request.open(options.method, options.url, true)\n\n  request.onload = (e) => { \n    if (request.status === 200) {\n      options.success(request.response)\n    } else { \n      options.error()\n    }\n  }\n\n  request.send()\n}\n\nconst settings = { \n  url: 'The current page', \n  method: 'GET', \n  data: {}, \n  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n  success: () => {},\n  error: () => {}\n}\n\n\n//helper functions\n$1.extend = (targetObj, ...objects) => {\n  objects.forEach(obj => {\n    for (var key in obj) {\n      targetObj[key] = obj[key];\n    }\n  });\n\n  return targetObj;\n}\n\nfunction selectMatchingNodes(string) { \n  var nodeList = document.querySelectorAll(string);\n  var arrayList = Array.from(nodeList);\n\n  return new DomNodeCollection(arrayList);\n}\n\nfunction registerDocReadyCallBack(func) { \n  if (!_docReady) { \n    _docReadyCallbacks.push(func);\n  } else { \n    func();\n  }\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  _docReady = true;\n  _docReadyCallbacks.forEach(func => func());\n}); \n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });