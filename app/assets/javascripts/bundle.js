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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/D3/grossing.js":
/*!*********************************!*\
  !*** ./frontend/D3/grossing.js ***!
  \*********************************/
/*! exports provided: grossing_bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grossing_bubble", function() { return grossing_bubble; });
var grossing_bubble = function grossing_bubble() {
  d3.csv("../../app/assets/imports/2019Grossing.csv", function (d) {
    return {
      title: d["Title"],
      year: +d.Year,
      grossing: +d["Grossing"].split(",").join(""),
      grossing2: d.Grossing,
      acronym: d.Title,
      genre: d.Genre
    };
  }).then(function (data) {
    var width = 1000;
    var height = 960;
    var svg = d3.select("#bubble-chart").append("svg").attr("width", width).attr("height", height).attr("text-anchor", "middle").attr("transform", "translate(" + 230 + "," + 10 + ")");
    svg.append("text").attr("x", 200).attr("y", -30).attr("dy", "3.5em").attr("text-anchor", "start").style("font-size", "28px").style("font-weight", "bold").text("MOVIE GROSSING");
    var pack = d3.pack().size([width - 150, height]).padding(1.5);
    var genres = ["Action", "Adventure", "Black Comedy", "Comedy", "Drama", "Horror", "Romantic Comedy", "Thriller/Suspense"];
    var color = d3.scaleOrdinal().domain(data.map(function (d) {
      return d.genre;
    })).range(['#fbb4ae', '#b3cde3', '#ccebc5', '#ffe9a8']); //circles

    var root = d3.hierarchy({
      children: data
    }).sum(function (d) {
      return d.grossing;
    });
    var node = svg.selectAll(".node").data(pack(root).leaves()).enter().append("g").attr("class", "node").attr("transform", function (d) {
      return "translate(" + d.x + ',' + d.y + ")";
    });
    node.append("circle").attr("id", function (d) {
      return d.id;
    }).attr("r", function (d) {
      return d.r;
    }).style("fill", function (d) {
      return color(d.data.genre);
    }).on("mouseover", function (d) {
      tooltip.text(d.data.title + ": $ " + d.data.grossing2);
      tooltip.style("visibility", "visible");
    }).on("mousemove", function () {
      return tooltip.style("top", d3.event.pageY - 10 + "px").style("left", d3.event.pageX + 10 + "px");
    }).on("mouseout", function () {
      return tooltip.style("visibility", "hidden");
    });
    node.append("text").text(function (d) {
      return d.data.acronym;
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
}; // var n = 1, // number of layers
//     m = 1; // number of samples per layer
// var margin = { top: 20, right: 50, bottom: 100, left: 75 },
//     width = 740 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
// var svg = d3.select("#chart-svg").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// d3.csv("2019Grossing.csv", function (data) {
//     var headers = ["Under $100M", "$100M - 200M", "$200M - 300M", "$300M - 400M", "$400M - 500M", "Over $500M"];
//     var layers = d3.layout.stack()(headers.map(function (Grossing) {
//         return data.map(function (d) {
//             return { x: d.Genre, y: +d[Grossing] };
//         });
//     }));
//     var yGroupMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y; }); });
//     var yStackMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y0 + d.y; }); });
//     var xScale = d3.scale.ordinal()
//         .domain(layers[0].map(function (d) { return d.x; }))
//         .rangeRoundBands([25, width], .08);
//     var y = d3.scale.linear()
//         .domain([0, yStackMax])
//         .range([height, 0]);
//     // var color = d3.scale.ordinal()
//     //     .domain(headers)
//     //     .range(["#98ABC5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);
//     var xAxis = d3.svg.axis()
//         .scale(xScale)
//         .tickSize(0)
//         .tickPadding(6)
//         .orient("bottom");
//     var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left")
//         .tickFormat(d3.format(".2s"));
//     var layer = svg.selectAll(".layer")
//         .data(layers)
//         .enter().append("g")
//         .attr("class", "layer")
//         .style("fill", function (d, i) { return color(i); });
//     var rect = layer.selectAll("rect")
//         .data(function (d) { return d; })
//         .enter().append("rect")
//         .attr("x", function (d) { return xScale(d.x); })
//         .attr("y", height)
//         .attr("width", xScale.rangeBand())
//         .attr("height", 0);
//     rect.transition()
//         .delay(function (d, i) { return i * 10; })
//         .attr("y", function (d) { return y(d.y0 + d.y); })
//         .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); });
//     //********** AXES ************
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//         .selectAll("text").style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//         .attr("transform", function (d) {
//             return "rotate(-45)"
//         });
//     svg.append("g")
//         .attr("class", "y axis")
//         .attr("transform", "translate(20,0)")
//         .call(yAxis)
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr({ "x": -150, "y": -70 })
//         .attr("dy", ".75em")
//         .style("text-anchor", "end")
//         .text("# of campaigns");
//     var legend = svg.selectAll(".legend")
//         .data(headers.slice().reverse())
//         .enter().append("g")
//         .attr("class", "legend")
//         .attr("transform", function (d, i) { return "translate(-20," + i * 20 + ")"; });
//     legend.append("rect")
//         .attr("x", width - 18)
//         .attr("width", 18)
//         .attr("height", 18)
//         .style("fill", color);
//     legend.append("text")
//         .attr("x", width - 24)
//         .attr("y", 9)
//         .attr("dy", ".35em")
//         .style("text-anchor", "end")
//         .text(function (d) { return d; });
//     d3.selectAll("input").on("change", change);
//     var timeout = setTimeout(function () {
//         d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
//     }, 2000);
//     function change() {
//         clearTimeout(timeout);
//         if (this.value === "grouped") transitionGrouped();
//         else transitionStacked();
//     }
//     function transitionGrouped() {
//         y.domain([0, yGroupMax]);
//         rect.transition()
//             .duration(500)
//             .delay(function (d, i) { return i * 10; })
//             .attr("x", function (d, i, j) { return xScale(d.x) + xScale.rangeBand() / n * j; })
//             .attr("width", xScale.rangeBand() / n)
//             .transition()
//             .attr("y", function (d) { return y(d.y); })
//             .attr("height", function (d) { return height - y(d.y); });
//         rect.on("mouseover", function () { tooltip.style("display", null); })
//             .on("mouseout", function () { tooltip.style("display", "none"); })
//             .on("mousemove", function (d) {
//                 var xPosition = d3.mouse(this)[0] - 15;
//                 var yPosition = d3.mouse(this)[1] - 25;
//                 tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//                 tooltip.select("text").text("hello world");
//             });
//     };
//     function transitionStacked() {
//         y.domain([0, yStackMax]);
//         rect.transition()
//             .duration(500)
//             .delay(function (d, i) { return i * 10; })
//             .attr("y", function (d) { return y(d.y0 + d.y); })
//             .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
//             .transition()
//             .attr("x", function (d) { return xScale(d.x); })
//             .attr("width", xScale.rangeBand());
//         rect.on("mouseover", function () { tooltip.style("display", null); })
//             .on("mouseout", function () { tooltip.style("display", "none"); })
//             .on("mousemove", function (d) {
//                 var xPosition = d3.mouse(this)[0] - 15;
//                 var yPosition = d3.mouse(this)[1] - 25;
//                 // console.log(xPosition);
//                 tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//                 tooltip.select("text").text("hello world");
//             });
//     };
//     var tooltip = svg.append("g")
//         .attr("class", "tooltip");
//     tooltip.append("rect")
//         .attr("width", 30)
//         .attr("height", 20)
//         .attr("fill", "red")
//         .style("opacity", 0.5);
//     tooltip.append("text")
//         .attr("x", 15)
//         .attr("dy", "1.2em")
//         .style("text-anchor", "middle")
//         .attr("font-size", "12px")
//         .attr("font-weight", "bold");
// });

/***/ }),

/***/ "./frontend/index.js":
/*!***************************!*\
  !*** ./frontend/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D3_grossing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./D3/grossing */ "./frontend/D3/grossing.js");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sliderContainer").style.display = "none";
  document.getElementsByClassName("button")[0].addEventListener('click', function () {
    document.getElementById("sliderContainer").style.display = "none";
    var element = document.getElementById("container");

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    var svg = document.createElement('div');
    svg.setAttribute("id", "bubble-chart");
    document.getElementById("container").appendChild(svg);
    Object(_D3_grossing__WEBPACK_IMPORTED_MODULE_0__["grossing_bubble"])();
  });
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map