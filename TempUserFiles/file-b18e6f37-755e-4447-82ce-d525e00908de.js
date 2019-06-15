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
/******/ 	return __webpack_require__(__webpack_require__.s = "./TempUserFiles/file-b18e6f37-755e-4447-82ce-d525e00908de.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./TempUserFiles/file-b18e6f37-755e-4447-82ce-d525e00908de.js":
/*!********************************************************************!*\
  !*** ./TempUserFiles/file-b18e6f37-755e-4447-82ce-d525e00908de.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/TempUserFiles/file-b18e6f37-755e-4447-82ce-d525e00908de.js: Unexpected token, expected \\\"jsxTagEnd\\\" (5:0)\\n\\n\\u001b[0m \\u001b[90m 3 | \\u001b[39m        \\u001b[36mconst\\u001b[39m \\u001b[33mApp\\u001b[39m \\u001b[33m=\\u001b[39m () \\u001b[33m=>\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 4 | \\u001b[39m    \\u001b[36mreturn\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mdiv\\u001b[39m\\u001b[33m>\\u001b[39mhello23\\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mdiv\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 5 | \\u001b[39m}\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m   | \\u001b[39m\\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 6 | \\u001b[39m        \\u001b[33mReactDOM\\u001b[39m\\u001b[33m.\\u001b[39mrender(\\u001b[33m<\\u001b[39m\\u001b[33mApp\\u001b[39m \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m,\\u001b[39m document\\u001b[33m.\\u001b[39mquerySelector(\\u001b[32m'#app'\\u001b[39m))\\u001b[0m\\n    at Object.raise (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:6322:17)\\n    at Object.unexpected (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:7638:16)\\n    at Object.expect (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:7624:28)\\n    at Object.jsxParseClosingElementAt (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:3508:10)\\n    at Object.jsxParseElementAt (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:3527:37)\\n    at Object.jsxParseElement (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:3584:17)\\n    at Object.parseExprAtom (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:3591:19)\\n    at Object.parseExprSubscripts (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:8385:23)\\n    at Object.parseMaybeUnary (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:8365:21)\\n    at Object.parseExprOps (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:8252:23)\\n    at Object.parseMaybeConditional (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:8225:23)\\n    at Object.parseMaybeAssign (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:8172:21)\\n    at Object.parseExpression (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:8120:23)\\n    at Object.parseReturnStatement (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:10132:28)\\n    at Object.parseStatementContent (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:9811:21)\\n    at Object.parseStatement (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:9763:17)\\n    at Object.parseBlockOrModuleBlockBody (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:10340:25)\\n    at Object.parseBlockBody (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:10327:10)\\n    at Object.parseBlock (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:10311:10)\\n    at Object.parseFunctionBody (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:9382:24)\\n    at Object.parseArrowExpression (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:9323:10)\\n    at Object.parseParenAndDistinguishExpression (/Users/stevenlevine/FullStack.Academy/Capstone/snippet.good/node_modules/@babel/parser/lib/index.js:8960:12)\");\n\n//# sourceURL=webpack:///./TempUserFiles/file-b18e6f37-755e-4447-82ce-d525e00908de.js?");

/***/ })

/******/ });