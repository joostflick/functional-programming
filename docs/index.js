// https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/

var data = require('./percentages.json')

// pass data to this function to return an array with the unique languages and amount of books for that language
function languagesCounter(data) {
  return d3
    .nest()
    .key(function(d) {
      return d.taal
    })
    .rollup(function(v) {
      return v.length
    })
    .entries(data)
}

// add up all value properties in an array
function countTotal(array) {
  var total = 0
  array.forEach(function(d) {
    total = total + d.value
  })
  return total
}

var percentages = []
var languagesCount = languagesCounter(data)

//percentages for pie chart
for (var a = 0; a < languagesCount.length; a++) {
  // calculate percentage data for the piechart
  percentages[a] = {
    language: languagesCount[a].key,
    percent: (languagesCount[a].value / countTotal(languagesCount)) * 100
  }
}

// display the search query in title
var query = data[0].query
document.getElementById('heading').innerHTML =
  'Book % per language for query "' + query + '"'

// tooltip for mouse over
var tooltip = d3
  .select('body')
  .append('div')
  .style('position', 'absolute')
  .style('z-index', '10')
  .style('visibility', 'hidden')
  .attr('class', 'tooltip')

// set the tooltip and style for the barchart
function onMouseOver(d, i) {
  d3.select(this).attr('class', 'highlight')
  return tooltip
    .style('visibility', 'visible')
    .text(d.language + ' = ' + d.percent + ' %')
}

function onMouseOut(d, i) {
  d3.select(this).attr('class', 'bar')
  return tooltip.style('visibility', 'hidden')
}

// make the tooltip stick to the mouse
function mouseMove() {
  return tooltip
    .style('top', event.pageY - 10 + 'px')
    .style('left', event.pageX + 10 + 'px')
}

// click event for bar
function clickLang(d, i) {
  document.getElementById('details').innerHTML =
    'Language: ' + d.language + ', Percentage: ' + d.percent + '%'
}

// color scale
var color = d3.scaleOrdinal([
  '#4daf4a',
  '#377eb8',
  '#ff7f00',
  '#984ea3',
  '#e41a1c'
])
// SVG Frame
const margin = 60
const width = 1000 - 2 * margin
const height = 600 - 2 * margin

// Select SVG from DOM
const svg = d3.select('svg')

const chart = svg
  .append('g')
  .attr('transform', `translate(${margin}, ${margin})`)

const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, 100])

chart.append('g').call(d3.axisLeft(yScale))

const xScale = d3
  .scaleBand()
  .range([0, width])
  .domain(percentages.map(s => s.language))
  .padding(0.2)

chart
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))

chart
  .selectAll()
  .data(percentages)
  .enter()
  .append('rect')
  .attr(
    'x',
    a => xScale(a.language) + (xScale.bandwidth() - xScale.bandwidth()) / 2
  )
  // mouse events
  .on('mouseover', onMouseOver)
  .on('mouseout', onMouseOut)
  .on('mousemove', mouseMove)
  .on('click', clickLang)
  .transition()
  .duration(400)
  .attr('y', s => yScale(s.percent))
  .attr('height', s => height - yScale(s.percent))
  .attr('width', xScale.bandwidth())
  // color
  .attr('fill', function(d) {
    return color(d.language)
  })

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
