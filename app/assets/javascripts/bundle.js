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
/******/ 	__webpack_require__.p = "js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/grossing.js":
/*!*************************!*\
  !*** ./app/grossing.js ***!
  \*************************/
/*! exports provided: grossing_bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grossing_bubble", function() { return grossing_bubble; });
// import * from '../../app/assets/imports/2019Grossing.csv';
var grossing_bubble = function grossing_bubble() {
  d3.csv("./app/assets/imports/2019Grossing.csv", function (d) {
    return {
      rank: d.Rank,
      title: d.Title,
      grossing: d.Grossing,
      genre: d.Genre,
      rating: d.Rating
    };
  }).then(function (data) {
    var width = 1000;
    var height = 1000;
    var svg = d3.select("#bubble-chart").append("svg").attr("width", width).attr("height", height).attr("text-anchor", "middle").attr("transform", "translate(" + 230 + "," + 10 + ")");
    svg.append("text").attr("x", 300).attr("y", -30).attr("dy", "3.5em").attr("text-anchor", "start").style("font-size", "28px").style("font-weight", "bold").text("Movie Grossing");
    var pack = d3.pack().size([width - 150, height]).padding(1.5);
    var genres = ["Action", "Adventure", "Black Comedy", "Comedy", "Drama", "Horror", "Romantic Comedy", "Thriller/Suspense"];
    var color = d3.scaleOrdinal().domain(data.map(function (d) {
      return d.genre;
    })).range(["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffe9a8", "#b9bfe3", "#fddaec"]); //circles

    var root = d3.hierarchy({
      children: data
    }).sum(function (d) {
      return d.grossing;
    });
    var node = svg.selectAll(".node").data(pack(root).leaves()).enter().append("g").attr("class", "node").attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
    node.append("circle").attr("id", function (d) {
      return d.id;
    }).attr("r", function (d) {
      return d.r;
    }).style("fill", function (d) {
      return color(d.data.genre);
    }).on("mouseover", function (d) {
      tooltip.text(d.data.rank + ". " + d.data.title + ": $ " + d.data.grossing + " million. \n Rating: " + d.data.rating);
      tooltip.style("visibility", "visible");
    }).on("mousemove", function () {
      return tooltip.style("top", d3.event.pageY - 10 + "px").style("left", d3.event.pageX + 10 + "px");
    }).on("mouseout", function () {
      return tooltip.style("visibility", "hidden");
    });
    node.append("text").text(function (d) {
      return d.data.title;
    });
    var legend = svg.selectAll(".legend").data(genres).enter().append("g").attr("class", "legend").attr("transform", "translate(" + 780 + "," + 120 + ")");
    legend.append("rect").attr("x", 40).attr("y", function (d, i) {
      return 20 * i;
    }).attr("width", 15).attr("height", 15).style("fill", function (d) {
      return color(d);
    });
    legend.append("text").attr("x", 60).attr("text-anchor", "start").attr("dy", "1em").attr("y", function (d, i) {
      return 20 * i;
    }).text(function (d) {
      return d;
    }).attr("font-size", "12px");
    legend.append("text").attr("x", 80).attr("dy", "-.2em").attr("y", -10).text("Genre").attr("font-size", "17px");
    var tooltip = d3.select("body").append("div").style("position", "absolute").style("z-index", "10").style("visibility", "hidden").style("color", "white").style("padding", "8px").style("background-color", "rgba(0, 0, 0, 0.75)").style("border-radius", "6px").text("tooltip");
  });
};

/***/ }),

/***/ "./app/scatter.js":
/*!************************!*\
  !*** ./app/scatter.js ***!
  \************************/
/*! exports provided: scatter_bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scatter_bubble", function() { return scatter_bubble; });
var scatter_bubble = function scatter_bubble() {
  var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  },
      dim = Math.min(parseInt(d3.select("#chart").style("width")), parseInt(d3.select("#chart").style("height"))),
      width = dim - margin.left - margin.right,
      height = dim - margin.top - margin.bottom;
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  var r = d3.scaleLinear().range([7, 18]);
  var color = d3.scaleOrdinal().range(["#8c510a", "#dfc27d", "#35978f"]);
  var xAxis = d3.axisBottom().scale(x); // .orient("bottom");

  var yAxis = d3.axisLeft().scale(y); // .orient("left");

  var svg = d3.select("#chart").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var dollarFormatter = d3.format(",.0f"); // var tip = d3
  // .tip()
  // .attr("class", "d3-tip")
  // .offset([-10, 0])
  // .html(function(d) {
  //     return (
  //     "<div><span>Category:</span> <span style='color:white'>" +
  //     d.Category +
  //     "</span></div>" +
  //     "<div><span>Sub-Category:</span> <span style='color:white'>" +
  //     d.SubCategory +
  //     "</span></div>" +
  //     "<div><span>Total Cost:</span> <span style='color:white'>" +
  //     "$" +
  //     dollarFormatter(d.Grossing) +
  //     "</span></div>"
  //     );
  // });

  var tooltip = d3.select("body").append("div").style("position", "absolute").style("z-index", "10").style("visibility", "hidden").style("color", "white").style("padding", "8px").style("background-color", "rgba(0, 0, 0, 0.75)").style("border-radius", "6px").text("tooltip"); // svg.call(tooltip);

  d3.csv("./app/assets/imports/2019Grossing.csv", function (error, data) {
    if (error) throw error;
    var subset = data.filter(function (el) {
      return el.Metric === "Cost";
    });
    subset.forEach(function (d) {
      d.Rank = +d.Rank;
      d.Rating = +d.Rating;
      d.Grossing = +d.Grossing;
    });
    x.domain([0, 1]);
    y.domain([0, 1]);
    r.domain(d3.extent(subset, function (d) {
      return d.Grossing;
    }));
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width).attr("y", -6).style("text-anchor", "end").text("Box Office Rank");
    svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Rating");
    svg.selectAll(".dot").data(subset).enter().append("circle").attr("class", "dot").attr("r", function (d) {
      return r(d.TotalValue);
    }).attr("cx", function (d) {
      return x(d.Rank);
    }).attr("cy", function (d) {
      return y(d.Rating);
    }).style("fill", function (d) {
      return color(d.Category);
    }).on("mouseover", function (d) {
      tooltip.text(d.data.Rank + ". " + d.data.Title + ": $ " + d.data.Grossing + " million");
      tooltip.style("visibility", "visible");
    }).on("mouseout", function () {
      return tooltip.style("visibility", "hidden");
    });
  });

  function resize() {
    var dim = Math.min(parseInt(d3.select("#chart").style("width")), parseInt(d3.select("#chart").style("height"))),
        width = dim - margin.left - margin.right,
        height = dim - margin.top - margin.bottom;
    console.log(dim); // Update the range of the scale with new width/height

    x.range([0, width]);
    y.range([height, 0]); // Update the axis and text with the new scale

    svg.select(".x.axis").attr("transform", "translate(0," + height + ")").call(xAxis);
    svg.select(".x.axis").select(".label").attr("x", width);
    svg.select(".y.axis").call(yAxis); // Update the tick marks

    xAxis.ticks(dim / 75);
    yAxis.ticks(dim / 75); // Update the circles

    r.range([dim / 90, dim / 35]);
    svg.selectAll(".dot").attr("r", function (d) {
      return r(d.Grossing);
    }).attr("cx", function (d) {
      return x(d.Rank);
    }).attr("cy", function (d) {
      return y(d.Rating);
    });
  }

  d3.select(window).on("resize", resize);
  resize();
};

/***/ }),

/***/ "./frontend/index.js":
/*!***************************!*\
  !*** ./frontend/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_grossing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/grossing */ "./app/grossing.js");
/* harmony import */ var _app_scatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/scatter */ "./app/scatter.js");


document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("button")[0].addEventListener('click', function () {
    var element = document.getElementById("container");

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    var svg = document.createElement('div');
    svg.setAttribute("id", "bubble-chart");
    document.getElementById("container").appendChild(svg);
    Object(_app_grossing__WEBPACK_IMPORTED_MODULE_0__["grossing_bubble"])();
  });
  document.getElementsByClassName("button2")[0].addEventListener('click', function () {
    var element = document.getElementById("container");

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    var svg = document.createElement('div');
    svg.setAttribute("id", "chart");
    document.getElementById("container").appendChild(svg);
    Object(_app_scatter__WEBPACK_IMPORTED_MODULE_1__["scatter_bubble"])();
  });
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map