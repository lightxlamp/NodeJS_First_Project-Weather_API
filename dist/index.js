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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst weatherRequest = __webpack_require__(/*! ./requests/weather.request */ \"./requests/weather.request.js\");\n\nconst app = express();\napp.set('view engine', 'ejs');\napp.use(express.static('public'));\napp.use(bodyParser.urlencoded({\n  extended: true\n}));\napp.set('views', path.join(__dirname, 'views'));\nconsole.log(path.join(__dirname, 'views')); // https://expressjs.com/en/guide/routing.html\n// You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests\n\napp.get('/', (request, response) => {\n  // http://expressjs.com/en/5x/api.html#res.render\n  // Renders a view and sends the rendered HTML string to the client. Optional parameters:\n  console.log('GET');\n  response.render('index.ejs', {\n    weather: null,\n    error: null\n  });\n});\napp.post('/', async (request, response) => {\n  const {\n    city\n  } = request.body;\n  const {\n    weather,\n    error\n  } = await weatherRequest(city);\n  response.render('index.ejs', {\n    weather,\n    error\n  });\n});\napp.listen(1789, () => {\n  console.log('Server running on port 1789');\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./requests/weather.request.js":
/*!*************************************!*\
  !*** ./requests/weather.request.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// https://gist.github.com/derzorngottes/3b57edc1f996dddcab25 - Hide API Keys on Github\nconst requestPromise = __webpack_require__(/*! request-promise */ \"request-promise\"); // https://github.com/request/request-promise\n//import API_KEY from './../my_config'\n\n\nmodule.exports = async function (city = \"\") {\n  if (!city) {\n    console.log(\"City should be filled\");\n  }\n\n  console.log(\"City: \", city);\n  const API_KEY = \"6dbb6b54a0a5123ae62a1cca20e4cc09\";\n  const URL = \"http://api.openweathermap.org/data/2.5/weather\";\n  var options = {\n    uri: URL,\n    qs: {\n      q: city,\n      appid: API_KEY,\n      units: \"imperial\"\n    },\n    headers: {\n      \"User-Agent\": \"Request-Promise\"\n    },\n    json: true\n  }; // Start. My uneened code anymore \n  // const my_request_url_with_parameters = URL + \"?q=\" + city + \"&appid=\" + API_KEY + \"&units=imperial\";\n  // const options2 = {\n  //   uri: my_request_url_with_parameters,\n  //   json: true\n  // };\n  // End\n\n  try {\n    const data = await requestPromise(options);\n    console.log(\"DataObj\", data);\n\n    if (data) {\n      const celsius = (data.main.temp - 32) * 5 / 9;\n      return {\n        weather: `${data.name}: ${celsius.toFixed(0)} ℃`,\n        error: null\n      };\n    }\n  } catch (error) {\n    console.log(\"errorOBJ\", error);\n    console.log(error.error.message);\n    return {\n      weather: null,\n      error: error.error.message\n    };\n  } // var unirest = require(\"unirest\");\n  // var req = unirest(\"POST\", \"https://accuweatherstefan-skliarovv1.p.rapidapi.com/get24HoursConditionsByLocationKey\");\n  // req.headers({\n  //     \"x-rapidapi-host\": \"AccuWeatherstefan-skliarovV1.p.rapidapi.com\",\n  //     \"x-rapidapi-key\": \"4a0ac4212cmsh35f41b479108785p1a8667jsn4d53cd848a6c\",\n  //     \"content-type\": \"application/x-www-form-urlencoded\"\n  // });\n  // req.form({});\n  // req.end(function (res) {\n  //     if (res.error) throw new Error(res.error);\n  //     console.log(res.body);\n  // });\n\n};\n\n//# sourceURL=webpack:///./requests/weather.request.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request-promise\");\n\n//# sourceURL=webpack:///external_%22request-promise%22?");

/***/ })

/******/ });