(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

//
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

},{"./percentages.json":2}],2:[function(require,module,exports){
module.exports=[
  {
    "id": 87681,
    "query": "website",
    "taal": "dut",
    "jaartal": 2005,
    "author": "Fouchier, Francisca J.C."
  },
  {
    "id": 188165,
    "query": "website",
    "titel": "Song sheets to software : a guide to print music, software, and web sites for musicians / Elizabeth C. Axford",
    "taal": "eng",
    "jaartal": 2004,
    "author": "Axford, Elizabeth C."
  },
  {
    "id": 262369,
    "query": "website",
    "titel": "Internet, pardon? : Mailen, chatten, websites / Marco Smeets",
    "taal": "dut",
    "jaartal": 1999,
    "author": "Smeets, Marco"
  },
  {
    "id": 316698,
    "query": "website",
    "titel": "Websites maken met WEB! Pro / [Addo Stuur ; met medew. van Alex Wit]",
    "taal": "dut",
    "jaartal": 2003,
    "author": "Stuur, Addo"
  },
  {
    "id": 335387,
    "query": "website",
    "titel": "Websites maken voor senioren / Jeroen Teelen ; [met medew. van: Elly Stouten]",
    "taal": "dut",
    "jaartal": 2005,
    "author": "Teelen, Jeroen"
  },
  {
    "id": 596284,
    "query": "website",
    "titel": "Web design: portfolios / ed. Julius Wiedemann",
    "taal": "eng",
    "jaartal": 2005,
    "author": "Julius Wiedemann"
  },
  {
    "id": 596800,
    "query": "website",
    "titel": "Welgespeld : werkwoordspelling voor hoger onderwijs / Wilma van der Westen",
    "taal": "dut",
    "jaartal": 2005,
    "author": "van der Westen, Wilma"
  },
  {
    "id": 597301,
    "query": "website",
    "titel": "Encyclopedie van de aarde / Matt Turner",
    "taal": "dut",
    "jaartal": 2005,
    "author": "Turner, Matt"
  },
  {
    "id": 597357,
    "query": "website",
    "titel": "Encyclopedie van mummies / Peter Chrisp",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Chrisp, Peter"
  },
  {
    "id": 597545,
    "query": "website",
    "titel": "Encyclopedie van ruimtevaart / Ian Graham",
    "taal": "dut",
    "jaartal": 2005,
    "author": "Graham, Ian"
  },
  {
    "id": 603222,
    "query": "website",
    "titel": "Maak je eigen website met FrontPage / Karin Princen",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Princen, Karin"
  },
  {
    "id": 610434,
    "query": "website",
    "titel": "Websites maken / Martijn Vet",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Vet, Martijn"
  },
  {
    "id": 623453,
    "query": "website",
    "titel": "Encyclopedie van het menselijk lichaam / Richard Walker",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Walker, Richard"
  },
  {
    "id": 623460,
    "query": "website",
    "titel": "Encyclopedie van insecten / David Burnie",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Burnie, David"
  },
  {
    "id": 623461,
    "query": "website",
    "titel": "Encyclopedie van zoogdieren / Jen Green en David Burnie",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Green, Jen"
  },
  {
    "id": 623462,
    "query": "website",
    "titel": "Encyclopedie van bodemschatten / John Farndon",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Farndon, John"
  },
  {
    "id": 660550,
    "query": "website",
    "titel": "Het beste van CSS : indrukwekkende websites vormgeven met Cascading Style Sheets / Ward van der Put",
    "taal": "dut",
    "jaartal": 2007,
    "author": "van der Put, Ward"
  },
  {
    "id": 790545,
    "query": "website",
    "titel": "Encyclopedie van De oude Grieken / Peter Chrisp",
    "taal": "dut",
    "jaartal": 2007,
    "author": "Chrisp, Peter"
  },
  {
    "id": 791384,
    "query": "website",
    "titel": "Encyclopedie van planten / David Burnie",
    "taal": "dut",
    "jaartal": 2007,
    "author": "Burnie, David"
  },
  {
    "id": 796502,
    "query": "website",
    "titel": "Encyclopedie van het weer / John Woodward",
    "taal": "dut",
    "jaartal": 2007,
    "author": "Woodward, John"
  },
  {
    "id": 796568,
    "query": "website",
    "titel": "Encyclopedie van het oude Rome / Peter Chrisp",
    "taal": "dut",
    "jaartal": 2007,
    "author": "Chrisp, Peter"
  },
  {
    "id": 797291,
    "query": "website",
    "titel": "Crash course in Web design for libraries / Charles Rubenstein",
    "taal": "eng",
    "jaartal": 2007,
    "author": "Rubenstein, Charles P."
  },
  {
    "id": 809104,
    "query": "website",
    "titel": "Websites maken voor dummies / Janine Warner",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Warner, Janine"
  },
  {
    "id": 872651,
    "query": "website",
    "titel": "Webanalytics voor dummies / Pedro Sostre, Jennifer LeClaire",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Sostre, Pedro"
  },
  {
    "id": 893066,
    "query": "website",
    "titel": "Adobe Dreamweaver CS4 inititatie : ontwerpen van websites met XHTML, CSS en spry / Patrick Verhaert",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Verhaert, Patrick"
  },
  {
    "id": 896311,
    "query": "website",
    "titel": "Websites maken voor dummies / David Crowder",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Crowder, David"
  },
  {
    "id": 896312,
    "query": "website",
    "titel": "Klantgerichte websites / Peter Beekman ... [et al.]",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Peter Beekman"
  },
  {
    "id": 897816,
    "query": "website",
    "titel": "Webredactie / Gabor Mooij",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Mooij, Gabor"
  },
  {
    "id": 899135,
    "query": "website",
    "titel": "Een website die werkt : overzichtelijk, vindbaar en klantgericht / Gerry McGovern",
    "taal": "dut",
    "jaartal": 2009,
    "author": "McGovern, Gerry"
  },
  {
    "id": 911952,
    "query": "website",
    "titel": "Websites maken voor kinderen / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Emma Schipper"
  },
  {
    "id": 912858,
    "query": "website",
    "titel": "De internet scorecard 2.0 : realiseer je online strategie / Geert-Jan Smits & Joost Steins Bisschop",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Smits, Geert-Jan"
  },
  {
    "id": 912882,
    "query": "website",
    "titel": "Websites met PHP 5 / Ward van der Put",
    "taal": "dut",
    "jaartal": 2009,
    "author": "van der Put, Ward"
  },
  {
    "id": 916239,
    "query": "website",
    "titel": "Websites ontwikkelen : met HTML, CSS & Dreamweaver : zelfstudiehandboek / Frances de Waal",
    "taal": "dut",
    "jaartal": 2009,
    "author": "de Waal, Frances"
  },
  {
    "id": 924336,
    "query": "website",
    "titel": "Een website maken voor uw eigen bedrijf / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Alex Wit"
  },
  {
    "id": 924337,
    "query": "website",
    "titel": "Websites bouwen met Web Easy / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Alex Wit"
  },
  {
    "id": 932501,
    "query": "website",
    "titel": "Schrijfwijzer voor het web : tactieken en technieken voor creatieve schrijvers op internet / Chrétien Breukers en Merel Roze",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Breukers, Chrétien"
  },
  {
    "id": 949623,
    "query": "website",
    "titel": "Websites / Petra Cremers",
    "taal": "dut",
    "jaartal": 2010,
    "author": "Cremers, Petra"
  },
  {
    "id": 959376,
    "query": "website",
    "titel": "Websites opmaken met CSS / Mark Creeten",
    "taal": "dut",
    "jaartal": 2010,
    "author": "Creeten, Mark"
  },
  {
    "id": 960845,
    "query": "website",
    "titel": "Roze klik? : Adviesrapport over website Internationaal Homo/Lesbisch Informatiecentrum en Archief (IHLIA) / Michel Otten",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Otten, M."
  },
  {
    "id": 961092,
    "query": "website",
    "titel": "Reader : een verzameling teksten, literatuurlijst, filmlijst en selectie websites bij de Internationale Week 2001 / samenst.: Anne Krul en Marlon Reina",
    "taal": "eng",
    "jaartal": 2001,
    "author": "A. Krul"
  },
  {
    "id": 964765,
    "query": "website",
    "titel": "Sociale netwerksites : de voordelen en risico's van Hyves, Facebook, Twitter etc. / auteur: Frank Heinen",
    "taal": "dut",
    "jaartal": 2010,
    "author": "Heinen, Frank"
  },
  {
    "id": 969691,
    "query": "website",
    "titel": "Check je webtekst : schrijf heldere, pakkende en vindbare content / Eric Tiggeler",
    "taal": "dut",
    "jaartal": 2010,
    "author": "Tiggeler, Eric"
  },
  {
    "id": 971215,
    "query": "website",
    "titel": "Get to the top on Google : tips and techniques to get your site to the top of the search engine ranks and stay there / David Viney",
    "taal": "eng",
    "jaartal": 2008,
    "author": "Viney, David"
  },
  {
    "id": 984250,
    "query": "website",
    "titel": "Web design index ...",
    "taal": "mul",
    "jaartal": 2000,
    "author": "Auteur onbekend"
  },
  {
    "id": 987424,
    "query": "website",
    "titel": "Basisgids uw website in de top 10 van Google / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Floris Keijser"
  },
  {
    "id": 988031,
    "query": "website",
    "titel": "Bagage : kennis van de Nederlandse samenleving / Nelleke Koot",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Koot, Nelleke"
  },
  {
    "id": 996455,
    "query": "website",
    "titel": "Don't make me think! : een nuchtere kijk op webusability / Steve Krug",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Krug, Steve"
  },
  {
    "id": 996456,
    "query": "website",
    "titel": "Adobe Dreamweaver CS5 : ontwerp van statische websites met XHTML, CSS en Spry / Patrick Verhaert",
    "taal": "dut",
    "jaartal": 2010,
    "author": "Verhaert, Patrick"
  },
  {
    "id": 998572,
    "query": "website",
    "titel": "Modern redesign met HTML5, CSS3 en JavaScript / Peter Kassenaar",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Kassenaar, Peter"
  },
  {
    "id": 1006197,
    "query": "website",
    "titel": "Verleiden op internet : hoe maak je een website onweerstaanbaar? / Aartjan van Erkel",
    "taal": "dut",
    "jaartal": 2011,
    "author": "van Erkel, Aartjan"
  },
  {
    "id": 1017567,
    "query": "website",
    "titel": "Samen lezen : oefenen met lezen van A1 naar A2 / Elizabeth Termeer",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Termeer, Elizabeth"
  },
  {
    "id": 1026389,
    "query": "website",
    "titel": "Basisgids populaire webtoepassingen / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Henk Mol"
  },
  {
    "id": 1033917,
    "query": "website",
    "titel": "De kleine Je website promoten voor dummies / Jan Zimmerman",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Zimmerman, Jan"
  },
  {
    "id": 1043965,
    "query": "website",
    "titel": "Webdesign 4 / Gabriel Sánchez Cano",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Cano, Gabriel Sánchez"
  },
  {
    "id": 1045102,
    "query": "website",
    "titel": "Websites maken met gratis software : snel aan de slag zonder voorkennis / Eric Tiggeler",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Tiggeler, Eric"
  },
  {
    "id": 1047409,
    "query": "website",
    "titel": "Basisgids websites maken met WordPress / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Alex Wit"
  },
  {
    "id": 1050011,
    "query": "website",
    "titel": "Zoekmachine optimalisatie : uw website op toppositie bij Google / Fred Zoer",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Zoer, Fred"
  },
  {
    "id": 1070161,
    "query": "website",
    "titel": "HTML & CSS : websites ontwerpen en bouwen / Jon Duckett",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Duckett, Jon"
  },
  {
    "id": 1071109,
    "query": "website",
    "titel": "The internet book of life : use the web to grow richer, smarter, healthier and happier / Irene E. McDermott",
    "taal": "eng",
    "jaartal": 2011,
    "author": "McDermott, Irene E."
  },
  {
    "id": 1071223,
    "query": "website",
    "titel": "Tips en tools voor Joomla! 2.5 en 3.0 : professionele websites voor iedereen / Eric Tiggeler",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Tiggeler, Eric"
  },
  {
    "id": 1087440,
    "query": "website",
    "titel": "Wegwijs in WordPress : blogs en websites maken / Hannie van Osnabrugge",
    "taal": "dut",
    "jaartal": 2013,
    "author": "van Osnabrugge, Hannie"
  },
  {
    "id": 1096841,
    "query": "website",
    "titel": "Seksuele gezondheid voor homoseksuele jongens en lesbische meiden : website over safe seks activiteiten met homo-lesbo jongerengroepen / [teksten Pinkeltje-GGD Nijmegen ... etc.]",
    "taal": "dut",
    "jaartal": 2005,
    "author": "Auteur onbekend"
  },
  {
    "id": 1098144,
    "query": "website",
    "titel": "Mobile webdesign / Luke Wroblewski",
    "taal": "dut",
    "jaartal": 2013,
    "author": "Wroblewski, Luke"
  },
  {
    "id": 1099031,
    "query": "website",
    "titel": "Responsive webdesign / Ethan Marcotte",
    "taal": "dut",
    "jaartal": 2013,
    "author": "Marcotte, Ethan"
  },
  {
    "id": 1107083,
    "query": "website",
    "titel": "Geld verdienen met je webshop : ontwerpen, bouwen, optimaliseren, promoten / hoofdredacteur Patrick Smits",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Patrick Smits"
  },
  {
    "id": 1109931,
    "query": "website",
    "titel": "Webdesign : van concept naar realisatie / Hedwyg van Groenendaal",
    "taal": "dut",
    "jaartal": 2014,
    "author": "van Groenendaal, Hedwyg"
  },
  {
    "id": 1110943,
    "query": "website",
    "titel": "Adobe Edge Animate : using web standard to create inertactive websites / Simon Widjaja",
    "taal": "eng",
    "jaartal": 2014,
    "author": "Widjaja, Simon"
  },
  {
    "id": 1113652,
    "query": "website",
    "titel": "Effectieve zakenbrieven ook via internet (e-mail, websites) : adviezen en oefenopdrachten / Marjan Palm-Hoebé",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Palm-Hoebé, Marjan"
  },
  {
    "id": 1113677,
    "query": "website",
    "titel": "Know your onions : web design / Drew de Soto",
    "taal": "eng",
    "jaartal": 2014,
    "author": "de Soto, Drew"
  },
  {
    "id": 1114923,
    "query": "website",
    "titel": "Usability / Peter Kassenaar",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Kassenaar, Peter"
  },
  {
    "id": 1115553,
    "query": "website",
    "titel": "Bijzondere overeenkomsten begrepen / Mr. I. Timmer",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Timmer, I."
  },
  {
    "id": 1117215,
    "query": "website",
    "titel": "Wat is onderzoek ? : praktijkboek voor methoden en technieken / Nel Verhoeven",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Verhoeven, Nel"
  },
  {
    "id": 1117593,
    "query": "website",
    "titel": "Toptaken : ontdek de 5 dingen die mensen online écht van je willen / Christiaan W. Lustig, Natanja de Bruin, Lonneke Theelen en Boudewijn Bugter",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Lustig, Christiaan W."
  },
  {
    "id": 1118410,
    "query": "website",
    "titel": "Een website maken voor uw eigen bedrijf / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Studio Visual Steps, Uithoorn"
  },
  {
    "id": 1120030,
    "query": "website",
    "titel": "Tips en tools voor Joomla! 3 : professionele websites voor iedereen / Eric Tiggeler",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Tiggeler, Eric"
  },
  {
    "id": 1125002,
    "query": "website",
    "titel": "Het webdesignboek : de ultieme gids voor het maken van prachtige websites / hoofdredacteur Patrick Smits",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Patrick Smits"
  },
  {
    "id": 1127887,
    "query": "website",
    "titel": "HTML & CSS : design and build websites / Jon Duckett",
    "taal": "eng",
    "jaartal": 2014,
    "author": "Duckett, Jon"
  },
  {
    "id": 1127900,
    "query": "website",
    "titel": "Etnische websites, behoeften en netwerken : over het gebruik van internet door jongeren / Jaswina Elahi",
    "taal": "dut",
    "jaartal": 2014,
    "author": "Elahi, Jaswina"
  },
  {
    "id": 1131138,
    "query": "website",
    "titel": "High performance responsive design : building faster sites across devices / Tom Barker",
    "taal": "eng",
    "jaartal": 2014,
    "author": "Barker, Tom"
  },
  {
    "id": 1131139,
    "query": "website",
    "titel": "Designing for performance : weighing aesthetics and speed / Lara Callender Hogan",
    "taal": "eng",
    "jaartal": 2014,
    "author": "Hogan, Lara Callender"
  },
  {
    "id": 1132314,
    "query": "website",
    "titel": "The responsive web / Matthew Carver",
    "taal": "eng",
    "jaartal": 2015,
    "author": "Carver, Matthew"
  },
  {
    "id": 1132783,
    "query": "website",
    "titel": "Responsive web design with Adobe Photoshop / Dan Rose",
    "taal": "eng",
    "jaartal": 2015,
    "author": "Rose, Dan"
  },
  {
    "id": 1133971,
    "query": "website",
    "titel": "Developing web components / Jarrod Overson and Jason Strimpel",
    "taal": "eng",
    "jaartal": 2015,
    "author": "Overson, Jarrod"
  },
  {
    "id": 1133988,
    "query": "website",
    "titel": "Je bent geweldig / Jill Mansell",
    "taal": "dut",
    "jaartal": 2015,
    "author": "Mansell, Jill"
  },
  {
    "id": 1135495,
    "query": "website",
    "titel": "Web typografie klinkt goed, maar ziet er niet uit / Bas Jacobs",
    "taal": "dut",
    "jaartal": 2015,
    "author": "Jacobs, Bas"
  },
  {
    "id": 1136734,
    "query": "website",
    "titel": "Rapport over rapporteren : op papier en digitaal / Wim Hoogland, Roel Dik, Ingrid Brand",
    "taal": "dut",
    "jaartal": 2015,
    "author": "Hoogland, Wim"
  },
  {
    "id": 1138636,
    "query": "website",
    "titel": "Parijs / Kristien In-'t-Ven",
    "taal": "dut",
    "jaartal": 2015,
    "author": "In-'t-Ven, Kristien"
  },
  {
    "id": 1140261,
    "query": "website",
    "titel": "Verbintenissenrecht begrepen / mr. I. Timmer, mr. A.L.A.M Paffen",
    "taal": "dut",
    "jaartal": 2015,
    "author": "Timmer, I."
  },
  {
    "id": 1140844,
    "query": "website",
    "titel": "Heel Holland Googelt : plaats uw website bovenaan in de zoekresultaten / Ita Pronk-Verduijn",
    "taal": "dut",
    "jaartal": 2015,
    "author": "Pronk-Verduijn, Ita"
  },
  {
    "id": 1151177,
    "query": "website",
    "titel": "Het webdesignboek : alles wat je nodig hebt om te werken met HTML5, CSS3, Javascript en meer ... / hoofdredacteur Patrick Smits",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Patrick Smits"
  },
  {
    "id": 1153248,
    "query": "website",
    "titel": "Webdesign voor dummies / Lisa Lopuck",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Lopuck, Lisa"
  },
  {
    "id": 1162050,
    "query": "website",
    "titel": "Maak uw website met WordPress / Studio Visual Steps",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Studio Visual Steps, Uithoorn"
  },
  {
    "id": 1162139,
    "query": "website",
    "titel": "Creëren met code : bouw je eigen website / auteur: Clyde Hatter",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Hatter, Clyde"
  },
  {
    "id": 1170181,
    "query": "website",
    "titel": "Experttips voor websites met resultaat : creëer een succesvolle website met de KLIK-methode voor meer klanten / Vanessa Carreiro & Maarten Ligthart",
    "taal": "dut",
    "jaartal": 2017,
    "author": "Carreiro, Vanessa"
  },
  {
    "id": 1174725,
    "query": "website",
    "titel": "Webdesign voor beginners / hoofdredacteur Patrick Smits",
    "taal": "dut",
    "jaartal": 2017,
    "author": "Patrick Smits"
  },
  {
    "id": 1176227,
    "query": "website",
    "titel": "Evil by design : interaction design to lead us into temptation / Chris Nodder",
    "taal": "eng",
    "jaartal": 2015,
    "author": "Nodder, Chris"
  },
  {
    "id": 1177825,
    "query": "website",
    "titel": "Een website maken voor kids / Greg Rickaby",
    "taal": "dut",
    "jaartal": 2017,
    "author": "Rickaby, Greg"
  },
  {
    "id": 1181964,
    "query": "website",
    "titel": "Responsive webdesign / Chris Ward",
    "taal": "dut",
    "jaartal": 2017,
    "author": "Ward, Chris"
  },
  {
    "id": 1195335,
    "query": "website",
    "titel": "Websites maken voor dummies / David A. Crowder",
    "taal": "dut",
    "jaartal": 2018,
    "author": "Crowder, David A."
  },
  {
    "id": 1197192,
    "query": "website",
    "titel": "Straf(proces)recht begrepen / mr. J.H.J. Verbaan",
    "taal": "dut",
    "jaartal": 2018,
    "author": "Verbaan, J.H.J."
  }
]
},{}]},{},[1]);
