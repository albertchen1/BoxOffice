export const scatter_bubble = () => {
    var margin = { top: 40, right: 40, bottom: 40, left: 40 },
        dim = Math.min(
            parseInt(d3.select("#chart").style("width")),
            parseInt(d3.select("#chart").style("height"))
        ),
        width = dim - margin.left - margin.right,
        height = dim - margin.top - margin.bottom;

    var x = d3.scaleLinear().range([0, width]);

    var y = d3.scaleLinear().range([height, 0]);

    var r = d3.scaleLinear().range([7, 18]);

    var color = d3.scaleOrdinal().range(["#8c510a", "#dfc27d", "#35978f"]);

    var xAxis = d3
        .axisBottom()
        .scale(x)
    // .orient("bottom");

    var yAxis = d3
        .axisLeft()
        .scale(y)
    // .orient("left");

    var svg = d3
        .select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dollarFormatter = d3.format(",.0f");

    // var tip = d3
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
    var tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .text("tooltip");

    // svg.call(tooltip);

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
        r.domain(
            d3.extent(subset, function (d) {
                return d.Grossing;
            })
        );

        svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Box Office Rank");

        svg
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Rating");

        svg
            .selectAll(".dot")
            .data(subset)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("r", function (d) {
                return r(d.TotalValue);
            })
            .attr("cx", function (d) {
                return x(d.Rank);
            })
            .attr("cy", function (d) {
                return y(d.Rating);
            })
            .style("fill", function (d) {
                return color(d.Category);
            })
            .on("mouseover", function (d) {
                tooltip.text(
                    d.data.Rank +
                    ". " +
                    d.data.Title +
                    ": $ " +
                    d.data.Grossing +
                    " million"
                );
                tooltip.style("visibility", "visible");
            })
            .on("mouseout", function () {
                return tooltip.style("visibility", "hidden");
            });
    });

    function resize() {
        var dim = Math.min(
            parseInt(d3.select("#chart").style("width")),
            parseInt(d3.select("#chart").style("height"))
        ),
            width = dim - margin.left - margin.right,
            height = dim - margin.top - margin.bottom;

        console.log(dim);

        // Update the range of the scale with new width/height
        x.range([0, width]);
        y.range([height, 0]);

        // Update the axis and text with the new scale
        svg
            .select(".x.axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg
            .select(".x.axis")
            .select(".label")
            .attr("x", width);

        svg.select(".y.axis").call(yAxis);

        // Update the tick marks
        xAxis.ticks(dim / 75);
        yAxis.ticks(dim / 75);

        // Update the circles
        r.range([dim / 90, dim / 35]);

        svg
            .selectAll(".dot")
            .attr("r", function (d) {
                return r(d.Grossing);
            })
            .attr("cx", function (d) {
                return x(d.Rank);
            })
            .attr("cy", function (d) {
                return y(d.Rating);
            });
    }

    d3.select(window).on("resize", resize);

    resize();

}
