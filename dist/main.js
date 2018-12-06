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
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MVC/model.js":
/*!**************************!*\
  !*** ./src/MVC/model.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class {\r\n    constructor(api) {\r\n        this.apiVK = api;\r\n    }\r\n\r\n    get user() {\r\n        return this.apiVK.callApi('users.get', {fields: 'photo_100'}).then(response => response);\r\n    }\r\n\r\n    get friends() {\r\n        return this.apiVK.callApi('friends.get', {fields: 'first_name, last_name, photo_100'}).then(response => response);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/MVC/model.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const VK    = __webpack_require__(/*! ./modules/api.vk */ \"./src/modules/api.vk.js\");\r\nconst Model = __webpack_require__(/*! ./MVC/model */ \"./src/MVC/model.js\");\r\n\r\nconst apiVK = new VK(6774126, 2);\r\nconst model = new Model(apiVK);\r\n\r\nconsole.log(model.friends);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/api.vk.js":
/*!*******************************!*\
  !*** ./src/modules/api.vk.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class {\r\n    constructor(apiID, params, version = 5.92) {\r\n        this.apiID   = apiID;\r\n        this.params  = params;\r\n        this.version = version;\r\n    }\r\n\r\n    connect() {\r\n        if(this.inited != this.apiID) {\r\n            VK.init({\r\n                apiId: this.apiID\r\n            });\r\n\r\n            this.inited = this.apiID;\r\n        }\r\n\r\n        return new Promise((resolve, reject) => {\r\n            VK.Auth.getLoginStatus((response) => {\r\n                if (response.status === 'connected') {\r\n                    resolve();\r\n                } else {\r\n                    reject(new Error('Не авторизован!'));\r\n                }\r\n            });\r\n        });\r\n    }\r\n\r\n    auth() {\r\n        return this.connect().catch(() => {\r\n            return new Promise((resolve, reject) => {\r\n                VK.Auth.login((resoponse) => {\r\n                    if (response.session) {\r\n                        resolve();\r\n                    } else {\r\n                        reject(new Error('Авторизация провалена!'));\r\n                    }\r\n                });\r\n            });\r\n        });\r\n    }\r\n\r\n    callApi(method, params) {\r\n        return this.auth().then(() => {\r\n            return new Promise((resolve, reject) => {\r\n                params = params || {};\r\n                params.v = this.version;\r\n\r\n                VK.Api.call(method, params, (response) => {\r\n                    if (response.error) {\r\n                        reject(new Error(response.error.msg));\r\n                    } else {\r\n                        resolve(response);\r\n                    }\r\n                });\r\n            });\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/modules/api.vk.js?");

/***/ })

/******/ });