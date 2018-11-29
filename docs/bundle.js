(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
var data = require('./percentages.json')
//data2 = JSON.parse({"url":"https://raw.githubusercontent.com/joostflick/functional-programming/master/docs/percentages.json"})
console.log(data)

var year = data[0].year

document.getElementById('heading').innerHTML = 'Book % per language in ' + year

// SVG Frame
const margin = 60
const width = 1000 - 2 * margin
const height = 600 - 2 * margin

// Select SVG from DOM
const svg = d3.select('svg')

const chart = svg
  .append('g')
  .attr('transform', `translate(${margin}, ${margin})`)

//
const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, 100])

chart.append('g').call(d3.axisLeft(yScale))

const xScale = d3
  .scaleBand()
  .range([0, width])
  .domain(data.map(s => s.lang))
  .padding(0.2)

chart
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))

chart
  .selectAll()
  .data(data)
  .enter()
  .append('rect')
  .attr(
    'x',
    a => xScale(a.lang) + (xScale.bandwidth() - xScale.bandwidth()) / 2
  )
  .attr('y', s => yScale(s.value))
  .attr('height', s => height - yScale(s.value))
  .attr('width', xScale.bandwidth())

//grid horizontal
chart
  .append('g')
  .attr('class', 'grid')
  .call(
    d3
      .axisLeft()
      .scale(yScale)
      .tickSize(-width, 0, 0)
      .tickFormat('')
  )

},{"./percentages.json":2}],2:[function(require,module,exports){
module.exports=[
  {
    "year": 2000,
    "lang": "Dutch",
    "value": 70
  },
  {
    "year": 2000,
    "lang": "English",
    "value": 30
  },
  {
    "year": 2000,
    "lang": "German",
    "value": 0
  },
  {
    "year": 2000,
    "lang": "Other",
    "value": 0
  }
]
},{}]},{},[1]);
