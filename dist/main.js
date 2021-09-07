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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bundle.json":
/*!*********************!*\
  !*** ./bundle.json ***!
  \*********************/
/*! exports provided: id, author, widgets, sidebarLinks, uis, menuItems, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"id\":\"6862dc28-c7f5-41e9-e198-6f63890af280\",\"author\":\"\",\"widgets\":[{\"id\":\"averageAsset\",\"name\":\"AverageAsset\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"assetAge\",\"name\":\"AssetAge\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"maintenanceDetails\",\"name\":\"MaintenanceDetails\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"totalNumber\",\"name\":\"TotalNumber\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"serviceRequest\",\"name\":\"ServiceRequest\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"workOrderMonth\",\"name\":\"WorkOrderMonth\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"upcomingAssets\",\"name\":\"UpcomingAssets\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"problematicAssets\",\"name\":\"ProblematicAssets\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]},{\"id\":\"topAgedAssets\",\"name\":\"TopAgedAssets\",\"description\":\"A sample widget\",\"icon\":\"\",\"tags\":[]}],\"sidebarLinks\":[],\"uis\":[],\"menuItems\":[]}");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".item-list {\n  padding: 2em 3%; }\n\n.average_asset {\n  background: #544984;\n  color: #fff; }\n  .average_asset .uxp-widget-title-bar {\n    background: transparent; }\n  .average_asset .average-asset-data {\n    display: inline-flex;\n    width: 100%;\n    padding: 0px 5%;\n    height: 60%;\n    align-items: center; }\n    .average_asset .average-asset-data h4 {\n      font-size: 2.5em;\n      display: inline-block;\n      width: 50%; }\n    .average_asset .average-asset-data h3 {\n      font-size: 3em;\n      display: inline-block;\n      width: 50%;\n      text-align: center; }\n      .average_asset .average-asset-data h3 span {\n        display: inline-block;\n        font-size: 18px;\n        vertical-align: top; }\n\n.assetage_widget .assetage_chart {\n  width: 92%;\n  height: 80%; }\n\n.modal-container.hana_modal .modal-panel .modal-body {\n  padding-top: 0; }\n  .modal-container.hana_modal .modal-panel .modal-body .list_age {\n    display: inline-flex;\n    width: 100%;\n    margin: 0.5em 0px;\n    background: #eee;\n    padding: 12px 10px; }\n    .modal-container.hana_modal .modal-panel .modal-body .list_age .age_label {\n      display: inline-block;\n      width: 50%;\n      font-size: 13px;\n      text-align: left; }\n    .modal-container.hana_modal .modal-panel .modal-body .list_age .age_value {\n      display: inline-block;\n      width: 50%;\n      font-size: 13px;\n      text-align: right; }\n\n.assets-widget-list .item-list {\n  padding: 0em 3% 2em 3%; }\n  .assets-widget-list .item-list ul {\n    list-style: none;\n    margin: 0em 0em 1em;\n    padding: 1em 0em 1em; }\n    .assets-widget-list .item-list ul li {\n      display: inline-flex;\n      width: 100%;\n      background-color: #dbdbdb;\n      padding: 11px 10px; }\n      .assets-widget-list .item-list ul li a {\n        color: #424242;\n        text-decoration: none;\n        width: 100%; }\n      .assets-widget-list .item-list ul li label {\n        display: inline-block;\n        width: 50%;\n        font-size: 13px;\n        text-align: left;\n        padding: 0;\n        margin: 0; }\n      .assets-widget-list .item-list ul li span {\n        display: inline-block;\n        width: 50%;\n        font-size: 13px;\n        text-align: right; }\n      .assets-widget-list .item-list ul li:nth-child(odd) {\n        background-color: #cccccc; }\n      .assets-widget-list .item-list ul li.list-header {\n        background-color: #7d7d7d;\n        color: #fff; }\n        .assets-widget-list .item-list ul li.list-header label {\n          color: #fff; }\n\n.assets-widget-list .uxp-item-list-card {\n  padding: 0 0%;\n  border: 1px solid #ddd;\n  margin: 0 1%;\n  width: 98%; }\n  .assets-widget-list .uxp-item-list-card .header {\n    padding: 0px 15px; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(/*! react */ "react"));
const uxp_1 = __webpack_require__(/*! ./uxp */ "./src/uxp.ts");
const components_1 = __webpack_require__(/*! uxp/components */ "uxp/components");
__webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
const recharts_1 = __webpack_require__(/*! recharts */ "recharts");
const url = "http://mwalk.iviva.cloud/apps/ivivafacility/wo-details?key=121";
const AverageAsset = (props) => {
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "AssetAgebyBuilding", {}, { json: true }).then(res => {
            setData(res[0]);
        }).catch(e => {
            // console.log("hi", e);
        });
    }
    React.useEffect(() => {
        getData();
    }, []);
    return (React.createElement(components_1.WidgetWrapper, { className: "average_asset" },
        React.createElement(components_1.TitleBar, { title: 'Average age of Assets' }),
        React.createElement("div", { className: "average-asset-data" },
            React.createElement("h4", null, "Average age "),
            " ",
            React.createElement("h3", null,
                data.AssetAge,
                React.createElement("span", null, "YRS")))));
};
const AssetAge = (props) => {
    let [showModal, setShowModal] = React.useState(false);
    let [modelData, setmodelData] = React.useState(null);
    let [showModal1, setShowModal1] = React.useState(false);
    let [modelData1, setmodelData1] = React.useState(null);
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "AssetAgeinZone", {}, { json: true }).then(res => {
            console.log("red", res);
            setData(res);
        }).catch(e => {
            // console.log("hi", e);
        });
    }
    let [data1, setData1] = React.useState([]);
    function getData1(locationKey) {
        props.uxpContext.executeAction("ivivafacility", "AveAssetAgeinZonebyAssCat", { locationKey: locationKey }, { json: true }).then(res => {
            console.log(res);
            console.log("AveAssetAgeinZonebyAssCat");
            setData1(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    let [data2, setData2] = React.useState([]);
    function getData2(locationkey, AssetCategoryKey) {
        props.uxpContext.executeAction("ivivafacility", "AssetAgeinZonebyAssCat", { LocationKey: locationkey, AssetCategoryKey: AssetCategoryKey }, { json: true }).then(res => {
            console.log("getdata2", res);
            console.log("hello");
            setData2(res);
        }).catch(e => {
            console.log("getdata2error", e);
        });
    }
    // let [data2,setData2, LocationKey, setLocationKey, ServiceCategoryKey, setServiceCategoryKey] = React.useState<any>([]) 
    // function getData2 () {  
    //     props.uxpContext.executeAction("ivivafacility","AssetAgeinZonebyAssCat",{LocationKey:1,ServiceCategoryKey:12},{json:true}).then(res=>{ 
    //         console.log(res);
    //         setLocationKey(location);
    //         setServiceCategoryKey(ck);
    //         console.log("AssetAgeinZonebyAssCat");
    //         setData2(res);
    //     }).catch(e=>{
    //         //   console.log("hi", e);
    //     }); 
    // }
    React.useEffect(() => {
        getData();
        // getData1();
        // getData2();
    }, []);
    function handleClick(e) {
        // console.log(e); 
        // var dataset = data1;
        // setmodelData(dataset);
        // setShowModal(true);
        console.log("location", e);
        var dataset = e;
        var locationKey = e.payload.LocationKey;
        var locationName = e.payload.LocationName;
        console.log("key12", locationKey);
        console.log(dataset);
        setmodelData(dataset);
        getData1(locationKey);
        setShowModal(true);
    }
    function handleClick1(e) {
        console.log("hello", e);
        var dataset1 = e;
        var AssetAge = e.payload.AssetAge;
        var AssetCategoryKey = e.payload.AssetCategoryKey;
        // var locationKey = e.payload.LocationKey;
        var locationkey = modelData.payload.LocationKey;
        console.log("locationkey", locationkey, AssetCategoryKey);
        // console.log(dataset1); 
        getData2(locationkey, AssetCategoryKey);
        setmodelData1(dataset1);
        // console.log(dataset1);
        setShowModal1(true);
    }
    // function handleClick1(e:any){ 
    //     setmodelData1(true);
    //     setShowModal1(true);
    // } 
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.WidgetWrapper, { className: "assetage_widget" },
            React.createElement(components_1.TitleBar, { title: 'Asset Age by Location (Zones)' },
                React.createElement(components_1.FilterPanel, null)),
            React.createElement("div", { className: "assetage_chart" },
                React.createElement(recharts_1.ResponsiveContainer, { width: "100%" },
                    React.createElement(recharts_1.BarChart, { width: 500, height: 200, data: data, margin: {
                            top: 2, right: 0, left: 0, bottom: 2,
                        } },
                        React.createElement(recharts_1.CartesianGrid, { strokeDasharray: "0 0" }),
                        React.createElement(recharts_1.XAxis, { dataKey: "LocationName" }),
                        React.createElement(recharts_1.YAxis, { orientation: "left" }),
                        React.createElement(recharts_1.Tooltip, null),
                        React.createElement(recharts_1.Bar, { barSize: 20, onClick: handleClick, dataKey: "AssetAge", fill: "#FF8181" }))),
                React.createElement(components_1.Modal, { title: (modelData === null || modelData === void 0 ? void 0 : modelData.LocationName) || '', show: showModal && modelData != null, onOpen: () => { }, onClose: () => { setShowModal(false); setmodelData(null); } },
                    React.createElement(recharts_1.ResponsiveContainer, { width: '100%', aspect: 4.0 / 2.0 },
                        React.createElement(recharts_1.BarChart, { layout: "vertical", width: 500, height: 200, data: data1, margin: {
                                top: 2, right: 0, left: 0, bottom: 2,
                            } },
                            React.createElement(recharts_1.XAxis, { type: "number" }),
                            React.createElement(recharts_1.YAxis, { dataKey: "AssetCategoryID", type: "category" }),
                            React.createElement(recharts_1.Tooltip, null),
                            React.createElement(recharts_1.Bar, { barSize: 20, dataKey: "AssetCategoryKey", fill: "#0d998a", onClick: handleClick1 })))),
                React.createElement(components_1.Modal, { show: showModal1 && modelData1 != null, onOpen: () => { }, onClose: () => { setShowModal1(false); setmodelData1(null); } },
                    React.createElement("div", { className: "assets-widget-list" },
                        React.createElement("div", { className: "item-list" },
                            React.createElement("ul", null, Object.keys(data2 || {}).map((m) => {
                                return React.createElement("li", null,
                                    React.createElement("label", null, data2[m].AssetKey),
                                    React.createElement("span", null,
                                        " ",
                                        data2[m].AssetID));
                            })))))))));
};
const MaintenanceDetails = (props) => {
    let [showModal, setShowModal] = React.useState(false);
    let [modelData, setmodelData] = React.useState(null);
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "UpcomingPPMWOs", {}, { json: true }).then(res => {
            console.log(res);
            setData(res);
        }).catch(e => {
        });
    }
    React.useEffect(() => {
        getData();
    }, []);
    let [data1, setData1] = React.useState([]);
    function getData1() {
        props.uxpContext.executeAction("ivivafacility", "AveAssetAgeinZonebyAssCat", {}, { json: true }).then(res => {
            console.log(res);
            console.log("Hi");
            setData1(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    React.useEffect(() => {
        getData1();
    }, []);
    function handleClick(e) {
        console.log(e);
        var dataset = data1;
        setmodelData(dataset);
        setShowModal(true);
    }
    function parseDate(date) {
        var currentTime = new Date(date);
        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
        var day = ("0" + currentTime.getDate()).slice(-2);
        var year = currentTime.getFullYear();
        var formatedate = year + '-' + month + '-' + day;
        return formatedate;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.WidgetWrapper, { className: "assets-widget-list" },
            React.createElement(components_1.TitleBar, { title: 'Upcoming Maintenance Details' }),
            React.createElement("div", { className: "item-list" },
                React.createElement("ul", null,
                    React.createElement("li", { className: "list-header" },
                        React.createElement("label", null, "Upcoming Maintenance"),
                        React.createElement("span", null, "Millenia Walk")),
                    data.map((item) => (React.createElement(React.Fragment, null,
                        React.createElement("li", { key: item.MWOKey, onClick: handleClick },
                            React.createElement("label", null, item.MWOCode),
                            React.createElement("span", null, parseDate(item.TargetStartDate)))))))),
            React.createElement(components_1.Modal, { show: showModal && modelData != null, onOpen: () => { }, onClose: () => { setShowModal(false); setmodelData(null); } },
                React.createElement("div", { className: "assets-widget-list" },
                    React.createElement("div", { className: "item-list" },
                        React.createElement("ul", null, data1.map((item) => (React.createElement("li", { key: item.AssetCategoryKey },
                            React.createElement("label", null,
                                "Hi",
                                item.AssetCategoryID)))))))))));
};
const TotalNumber = (props) => {
    let [showModal, setShowModal] = React.useState(false);
    let [modelData, setmodelData] = React.useState(null);
    let [showModal1, setShowModal1] = React.useState(false);
    let [modelData1, setmodelData1] = React.useState(null);
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "AssetCountbyZone", {}, { json: true }).then(res => {
            console.log(res);
            setData(res);
        }).catch(e => {
            // console.log("hi", e);
        });
    }
    let [data1, setData1] = React.useState([]);
    function getData1() {
        props.uxpContext.executeAction("ivivafacility", "AssetCountbyAssCatZone", {}, { json: true }).then(res => {
            console.log(res);
            console.log("AssetCountbyAssCatZone");
            setData1(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    let [data2, setData2] = React.useState([]);
    function getData2() {
        props.uxpContext.executeAction("ivivafacility", "AssetsCountZonebyAssCat", {}, { json: true }).then(res => {
            console.log(res);
            console.log("AssetsCountZonebyAssCat");
            setData2(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    React.useEffect(() => {
        getData();
        getData1();
        getData2();
    }, []);
    function handleClick(e) {
        console.log(e);
        var dataset = data1;
        setmodelData(dataset);
        setShowModal(true);
    }
    function handleClick1(e) {
        console.log(e);
        var dataset1 = data2;
        setmodelData(dataset1);
        setShowModal(true);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.WidgetWrapper, { className: "assetage_widget" },
            React.createElement(components_1.TitleBar, { title: 'Total Number of Asset by Location (Zone)' },
                React.createElement(components_1.FilterPanel, null)),
            React.createElement("div", { className: "assetage_chart" },
                React.createElement(recharts_1.ResponsiveContainer, { width: "100%" },
                    React.createElement(recharts_1.BarChart, { width: 500, height: 200, data: data, margin: {
                            top: 2, right: 0, left: 0, bottom: 2,
                        } },
                        React.createElement(recharts_1.CartesianGrid, { strokeDasharray: "0 0" }),
                        React.createElement(recharts_1.XAxis, { dataKey: "LocationName" }),
                        React.createElement(recharts_1.YAxis, { orientation: "left" }),
                        React.createElement(recharts_1.Tooltip, null),
                        React.createElement(recharts_1.Bar, { barSize: 20, onClick: handleClick, dataKey: "AssetCount", fill: "#0d998a" }))),
                React.createElement(components_1.Modal, { show: showModal && modelData != null, onOpen: () => { }, onClose: () => { setShowModal(false); setmodelData(null); } },
                    React.createElement(recharts_1.ResponsiveContainer, { width: '100%', aspect: 4.0 / 2.0 },
                        React.createElement(recharts_1.BarChart, { data: data1, layout: "vertical", width: 500, height: 200 },
                            React.createElement(recharts_1.XAxis, { type: "number" }),
                            React.createElement(recharts_1.YAxis, { dataKey: "AssetCategoryID", type: "category" }),
                            React.createElement(recharts_1.Tooltip, null),
                            React.createElement(recharts_1.Bar, { barSize: 20, dataKey: "AssetCategoryKey", fill: "#0d998a", onClick: handleClick1 })))),
                React.createElement(components_1.Modal, { show: showModal1 && modelData1 != null, onOpen: () => { }, onClose: () => { setShowModal1(false); setmodelData1(null); } },
                    React.createElement("div", { className: "assets-widget-list" },
                        React.createElement("div", { className: "item-list" },
                            React.createElement("ul", null, data2.map((item) => (React.createElement("li", { key: item.AssetID },
                                React.createElement("label", null, item.AssetID))))))))))));
};
const ServiceRequest = (props) => {
    let [showModal, setShowModal] = React.useState(false);
    let [modelData, setmodelData] = React.useState(null);
    let [showModal1, setShowModal1] = React.useState(false);
    let [modelData1, setmodelData1] = React.useState(null);
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "WRsBySerCat", {}, { json: true }).then(res => {
            console.log("peichart", res);
            var updatedData = res.map((d) => {
                d.WRCounts = parseInt(d.WRCounts);
                return d;
            });
            setData(updatedData);
        }).catch(e => {
            // console.log("hi", e);
        });
    }
    let [data1, setData1] = React.useState([]);
    function getData1() {
        props.uxpContext.executeAction("ivivafacility", "WRCountbyZoneSerCat", {}, { json: true }).then(res => {
            console.log(res);
            console.log("WRCountbyZoneSerCat");
            setData1(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    let [data2, setData2] = React.useState([]);
    function getData2() {
        props.uxpContext.executeAction("ivivafacility", "WRCountbyAssetZone", { ServiceCategoryKey: 2, LocationKey: 1 }, { json: true }).then(res => {
            console.log(res);
            console.log("WRCountbyAssetZone");
            setData2(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    React.useEffect(() => {
        getData();
        getData1();
        getData2();
    }, []);
    function handleClick(e) {
        console.log(e);
        var dataset = data1;
        setmodelData(dataset);
        setShowModal(true);
    }
    function handleClick1(e) {
        console.log(e);
        var dataset1 = data2;
        setmodelData(dataset1);
        setShowModal(true);
    }
    // function handleClick1(e:any){ 
    //     setmodelData1(true);
    //     setShowModal1(true);
    // // } 
    const data02 = [
        {
            "name": "Group A",
            "value": "400"
        },
        {
            "name": "Group B",
            "value": "300"
        },
        {
            "name": "Group C",
            "value": "300"
        },
        {
            "name": "Group D",
            "value": "200"
        },
        {
            "name": "Group E",
            "value": "278"
        },
        {
            "name": "Group F",
            "value": "189"
        }
    ];
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.WidgetWrapper, { className: "assetage_widget" },
            React.createElement(components_1.TitleBar, { title: 'Service Request/Work Orders by Categories' },
                React.createElement(components_1.FilterPanel, null)),
            React.createElement("div", { className: "assetage_chart", style: { width: "95%", height: "95%" } },
                React.createElement(recharts_1.ResponsiveContainer, { width: "100%" },
                    React.createElement(recharts_1.PieChart, { style: { with: '100%', height: '100%' } },
                        React.createElement(recharts_1.Pie, { data: data, dataKey: "WRCounts", nameKey: "ServiceCategoryName", cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 80, fill: "#82ca9d", label: true }))),
                React.createElement(components_1.Modal, { show: showModal && modelData != null, onOpen: () => { }, onClose: () => { setShowModal(false); setmodelData(null); } },
                    React.createElement(recharts_1.ResponsiveContainer, { width: '100%', aspect: 4.0 / 2.0 },
                        React.createElement(recharts_1.BarChart, { data: data1, layout: "vertical", width: 500, height: 200 },
                            React.createElement(recharts_1.XAxis, { type: "number" }),
                            React.createElement(recharts_1.YAxis, { dataKey: "LocationName", type: "category" }),
                            React.createElement(recharts_1.Tooltip, null),
                            React.createElement(recharts_1.Bar, { barSize: 20, dataKey: "LocationKey", fill: "#c02b82", onClick: handleClick1 })))),
                React.createElement(components_1.Modal, { show: showModal1 && modelData1 != null, onOpen: () => { }, onClose: () => { setShowModal1(false); setmodelData1(null); } },
                    React.createElement("div", { className: "assets-widget-list" },
                        React.createElement("div", { className: "item-list" },
                            React.createElement("ul", null, Object.keys(modelData1 || {}).map((m) => {
                                return React.createElement("li", { key: modelData1[m].AssetID },
                                    React.createElement("label", null, modelData1[m].AssetID),
                                    React.createElement("span", null, modelData1[m].WRCount));
                            })))))))));
};
const WorkOrderMonth = (props) => {
    let [showModal, setShowModal] = React.useState(false);
    let [modelData, setmodelData] = React.useState(null);
    let [showModal1, setShowModal1] = React.useState(false);
    let [modelData1, setmodelData1] = React.useState(null);
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "CWOPerMonthbySerCat", {}, { json: true }).then(res => {
            console.log(res);
            setData(res);
        }).catch(e => {
            // console.log("hi", e);
        });
    }
    let [data1, setData1] = React.useState([]);
    function getData1() {
        props.uxpContext.executeAction("ivivafacility", "CWOCountbyZoneSerCat", {}, { json: true }).then(res => {
            console.log(res);
            console.log("CWOCountbyZoneSerCat");
            setData1(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    let [data2, setData2] = React.useState([]);
    function getData2() {
        props.uxpContext.executeAction("ivivafacility", "CWOCountbyAssetZone", {}, { json: true }).then(res => {
            console.log(res);
            console.log("CWOCountbyAssetZone");
            setData2(res);
        }).catch(e => {
            //   console.log("hi", e);
        });
    }
    React.useEffect(() => {
        getData();
        getData1();
        getData2();
    }, []);
    // function handleClick(e:any){ 
    //     console.log(e); 
    //     var dataset = data1;
    //     setmodelData(dataset);
    //     setShowModal(true);
    // }  
    // function handleClick1(e:any){
    //     console.log(e); 
    //     var dataset1 = data2;
    //     setmodelData(dataset1);
    //     setShowModal(true);
    // }  
    function handleClick(e) {
        setmodelData(true);
        setShowModal(true);
    }
    function handleClick1(e) {
        setmodelData1(true);
        setShowModal1(true);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.WidgetWrapper, { className: "assetage_widget" },
            React.createElement(components_1.TitleBar, { title: 'Work Orders per Month' },
                React.createElement(components_1.FilterPanel, null)),
            React.createElement("div", { className: "assetage_chart" },
                React.createElement(recharts_1.ResponsiveContainer, { width: "100%" },
                    React.createElement(recharts_1.BarChart, { width: 500, height: 200, data: data, margin: {
                            top: 2, right: 0, left: 0, bottom: 2,
                        } },
                        React.createElement(recharts_1.CartesianGrid, { strokeDasharray: "0 0" }),
                        React.createElement(recharts_1.XAxis, { dataKey: "monthname" }),
                        React.createElement(recharts_1.YAxis, { orientation: "left" }),
                        React.createElement(recharts_1.Tooltip, null),
                        React.createElement(recharts_1.Bar, { stackId: "a", barSize: 20, onClick: handleClick, fill: "#8884d8", dataKey: "ServiceCategoryKey" }),
                        React.createElement(recharts_1.Bar, { stackId: "a", barSize: 20, onClick: handleClick, fill: "#82ca9d", dataKey: "CWOMCOUNT" }))),
                React.createElement(components_1.Modal, { show: showModal, onOpen: () => { }, onClose: () => setShowModal(false) },
                    React.createElement(recharts_1.ResponsiveContainer, { width: '100%', aspect: 4.0 / 2.0 },
                        React.createElement(recharts_1.BarChart, { data: data1, layout: "vertical", width: 500, height: 200 },
                            React.createElement(recharts_1.XAxis, { type: "number" }),
                            React.createElement(recharts_1.YAxis, { dataKey: "LocationName", type: "category" }),
                            React.createElement(recharts_1.Tooltip, null),
                            React.createElement(recharts_1.Bar, { barSize: 20, dataKey: "CWOCount", fill: "#0d998a", onClick: handleClick1 })))),
                React.createElement(components_1.Modal, { show: showModal1, onOpen: () => { }, onClose: () => setShowModal1(false) },
                    React.createElement("div", { className: "assets-widget-list" },
                        React.createElement("div", { className: "item-list" },
                            React.createElement("ul", null, data2.map((item) => (React.createElement("li", { key: item.AssetID },
                                React.createElement("label", null, item.AssetID),
                                React.createElement("span", null, item.CWOCount))))))))))));
};
const UpcomingAssets = (props) => {
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "UpcomingPPMAssetforMaintenance", {}, { json: true }).then(res => {
            console.log(res);
            setData(res);
        }).catch(e => {
        });
    }
    React.useEffect(() => {
        getData();
    }, []);
    function parseDate(date) {
        var currentTime = new Date(date);
        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
        var day = ("0" + currentTime.getDate()).slice(-2);
        var year = currentTime.getFullYear();
        var formatedate = year + '-' + month + '-' + day;
        return formatedate;
    }
    let date = new Date();
    date.setDate(date.getDate() + 1);
    function addDays(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }
    let [startDate, setStartDate] = React.useState(new Date());
    let [endDate, setEndDate] = React.useState(addDays(90));
    return (React.createElement(components_1.WidgetWrapper, { className: "assets-widget-list" },
        React.createElement(components_1.TitleBar, { title: 'Upcoming Assets for Maintenance' },
            React.createElement(components_1.DateRangePicker, { title: "", startDate: startDate, endDate: endDate, closeOnSelect: true, onChange: (newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd); } })),
        React.createElement("div", { className: "item-list" },
            React.createElement("ul", null, data.map((item) => (React.createElement("li", { key: item.AssetID },
                React.createElement("label", null, item.AssetID),
                React.createElement("span", null, parseDate(item.TargetStartDate)))))))));
};
const ProblematicAssets = (props) => {
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "TopProblematicAssets", {}, { json: true }).then(res => {
            console.log(res);
            setData(res);
        }).catch(e => {
        });
    }
    React.useEffect(() => {
        getData();
    }, []);
    return (React.createElement(components_1.WidgetWrapper, { className: "assets-widget-list" },
        React.createElement(components_1.TitleBar, { title: 'Top 5 Highest CWO/WR per Asset' }),
        React.createElement("div", { className: "item-list" },
            React.createElement("ul", null, data.map((item) => (React.createElement("li", { key: item.AssetID },
                React.createElement("label", null, item.AssetID),
                React.createElement("span", null, item.TotalCases))))))));
};
const TopAgedAssets = (props) => {
    let [data, setData] = React.useState([]);
    function getData() {
        props.uxpContext.executeAction("ivivafacility", "TopAgedAssets", {}, { json: true }).then(res => {
            console.log(res);
            setData(res);
        }).catch(e => {
            // console.log("hi", e);
        });
    }
    React.useEffect(() => {
        getData();
    }, []);
    return (React.createElement(components_1.WidgetWrapper, { className: "assets-widget-list" },
        React.createElement(components_1.TitleBar, { title: 'Top 5 highest cwo/wr per Assets' }),
        React.createElement("div", { className: "item-list" },
            React.createElement("ul", null, data.map((item) => (React.createElement("li", { key: item.AssetID },
                React.createElement("label", null, item.AssetID),
                React.createElement("span", null, item.Age))))))));
};
/**
 * Register as a Widget
 */
uxp_1.registerWidget({
    id: "averageAsset",
    widget: AverageAsset,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "assetAge",
    widget: AssetAge,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "maintenanceDetails",
    widget: MaintenanceDetails,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "totalNumber",
    widget: TotalNumber,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "serviceRequest",
    widget: ServiceRequest,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "workOrderMonth",
    widget: WorkOrderMonth,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "upcomingAssets",
    widget: UpcomingAssets,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "problematicAssets",
    widget: ProblematicAssets,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
uxp_1.registerWidget({
    id: "topAgedAssets",
    widget: TopAgedAssets,
    configs: {
        layout: {
        // w: 12,
        // h: 12,
        // minH: 12,
        // minW: 12
        }
    }
});
/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "pontiacland",
    label: "Pontiacland",
    // click: () => alert("Hello"),
    component: PontiaclandWidget
});
*/
/**
 * Register as a UI
 */
/*
registerUI({
   id:"pontiacland",
   component: PontiaclandWidget
});
*/ 


/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/uxp.ts":
/*!********************!*\
  !*** ./src/uxp.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUI = exports.registerMenuItem = exports.registerLink = exports.registerWidget = void 0;
const bundle_json_1 = __importDefault(__webpack_require__(/*! ../bundle.json */ "./bundle.json"));
function registerWidget(_widget) {
    var _a;
    let id = (bundle_json_1.default.id + '/widget/' + _widget.id).toLowerCase();
    if (!window.registerWidget) {
        console.error('This code is not being run within the context of UXP');
        return;
    }
    // get widget details from bundle.json 
    // get widget
    let _widgetDetails = (_a = bundle_json_1.default.widgets) === null || _a === void 0 ? void 0 : _a.find((w) => w.id == _widget.id);
    if (!_widgetDetails) {
        console.log("Please update the bundle.json");
        throw "Error: The widget you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedWidget = Object.assign(Object.assign(Object.assign({}, _widget), _widgetDetails), { id });
    window.registerWidget(updatedWidget);
}
exports.registerWidget = registerWidget;
function registerLink(_link) {
    var _a;
    let id = (bundle_json_1.default.id + '/sidebarlink/' + _link.id).toLowerCase();
    if (!window.registerLink) {
        console.error('This is not is not being run within the UXP context');
        return;
    }
    console.log('registering link....', id);
    // get widget details from bundle.json 
    // get widget
    let _linkDetails = (_a = bundle_json_1.default.sidebarLinks) === null || _a === void 0 ? void 0 : _a.find((s) => s.id == _link.id);
    if (!_linkDetails) {
        console.log("Please update the bundle.json");
        throw "Error: The sidebar link you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedLink = Object.assign(Object.assign(Object.assign({}, _link), _linkDetails), { id });
    window.registerLink(updatedLink);
}
exports.registerLink = registerLink;
function registerMenuItem(_menuItem) {
    let id = (bundle_json_1.default.id + '/menuitem/' + _menuItem.id).toLowerCase();
    if (!window.registerMenuItem) {
        console.error('This is not is not being run within the UXP context');
        return;
    }
    console.log('registering menu item....', id);
    // get widget details from bundle.json 
    // get widget
    let _menuItemDetails = bundle_json_1.default.menuItems.find((s) => s.id == _menuItem.id);
    if (!_menuItemDetails) {
        console.log("Please update the bundle.json");
        throw "Error: The menu item you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedMenuItem = Object.assign(Object.assign(Object.assign({}, _menuItem), _menuItemDetails), { id });
    window.registerMenuItem(updatedMenuItem);
}
exports.registerMenuItem = registerMenuItem;
function registerUI(_ui) {
    let id = (bundle_json_1.default.id + '/ui/' + _ui.id).toLowerCase();
    if (!window.registerUI) {
        console.error('This is not is not being run within the UXP context');
        return;
    }
    console.log('registering link....', id);
    // get widget details from bundle.json 
    // get widget
    let _uiDetails = bundle_json_1.default.uis.find((s) => s.id == _ui.id);
    if (!_uiDetails) {
        console.log("Please update the bundle.json");
        throw "Error: The ui you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedUI = Object.assign(Object.assign(Object.assign({}, _ui), _uiDetails), { id });
    window.registerUI(updatedUI);
}
exports.registerUI = registerUI;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "recharts":
/*!***************************!*\
  !*** external "Recharts" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Recharts;

/***/ }),

/***/ "uxp/components":
/*!********************************!*\
  !*** external "UXPComponents" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = UXPComponents;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map