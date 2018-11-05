var svgWidth = 1000;
var svgHeight = 600;
var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar-chart");

    var dataset = [10, 100, 56, 120, 180, 220, 40, 120, 160];
    var barPadding = 5;
    var barWidth = (svgWidth / dataset.length);
    var barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("y", function(d) {
            return svgHeight - d
        })
        .attr("height", function(d) {
            return d;
        })
        .attr("width", barWidth - barPadding)
        .attr("transform", function (d, i) {
             var translate = [barWidth * i, 0];
             return "translate("+ translate +")";
        });

console.log('works')