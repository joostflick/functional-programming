// https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
data = [ { year: 2018, lang: 'Dutch', value: 63.1578947368421 },
{ year: 2018, lang: 'English', value: 36.8421052631579 },
{ year: 2018, lang: 'German', value: 0 },
{ year: 2018, lang: 'Other', value: 0 } ]
var year = data[0].year

document.getElementById("heading").innerHTML = "Book % per language in " + year;


// SVG Frame
const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    // Select SVG from DOM
    const svg = d3.select('svg');

    const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

    // 
    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

    chart.append('g')
    .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map((s) => s.lang))
    .padding(0.2)

    chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

    chart.selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (a) => xScale(a.lang) + (xScale.bandwidth() - xScale.bandwidth()) / 2)
    .attr('y', (s) => yScale(s.value))
    .attr('height', (s) => height - yScale(s.value))
    .attr('width', xScale.bandwidth())


    //grid horizontal
    chart.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft()
        .scale(yScale)
        .tickSize(-width, 0, 0)
        .tickFormat(''))

