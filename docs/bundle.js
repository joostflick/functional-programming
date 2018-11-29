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
  .attr('y', s => yScale(s.percent))
  .attr('height', s => height - yScale(s.percent))
  .attr('width', xScale.bandwidth())
  // mouse events
  .on('mouseover', onMouseOver)
  .on('mouseout', onMouseOut)
  .on('mousemove', mouseMove)
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
    "id": 1714,
    "query": "test",
    "titel": "Autotest",
    "taal": "dut",
    "jaartal": 1973,
    "author": "Auteur onbekend"
  },
  {
    "id": 42568,
    "query": "test",
    "titel": "Op de proef gesteld : geschiedenis van de psychologische test : tentoonstellingsbrochure / [teksten:  Peter van Drunen en Pieter J. van Strien]",
    "taal": "dut",
    "jaartal": 1991,
    "author": "van Drunen, Peter"
  },
  {
    "id": 42621,
    "query": "test",
    "titel": "Tussen traditie en vernieuwing : zestig jaar SON-tests / Peter van Drunen",
    "taal": "dut",
    "jaartal": 2003,
    "author": "van Drunen, Peter"
  },
  {
    "id": 45372,
    "query": "test",
    "titel": "Test je wijnkennis met Hubrecht Duijker : voor iedere wijnliefhebber om spelenderwijs thuis te raken in de wereld van de wijn / [idee & tekst: Hubrecht Duijker ; eindred.: Inmerc]",
    "taal": "dut",
    "jaartal": 2002,
    "author": "Duijker, Hubrecht"
  },
  {
    "id": 69698,
    "query": "test",
    "titel": "Markant Nederland : test je toeristische kennis",
    "taal": "dut",
    "jaartal": 1998,
    "author": "Auteur onbekend"
  },
  {
    "id": 86809,
    "query": "test",
    "titel": "The application of the Rorschach test to young children / by Mary Ford",
    "taal": "Taal onbekend",
    "jaartal": 1946,
    "author": "Ford, Mary"
  },
  {
    "id": 112549,
    "query": "test",
    "taal": "dut",
    "jaartal": 2002,
    "author": "Gijsen, William"
  },
  {
    "id": 120875,
    "query": "test",
    "titel": "Test en train uzelf / V. Golenitsjev ; [vert. uit het Russisch: Alexander Münninghoff]",
    "taal": "dut",
    "jaartal": 1975,
    "author": "Goleniscev, V.E."
  },
  {
    "id": 125741,
    "query": "test",
    "titel": "Test uw gezondheid / Jannes van Everdingen ... [et al. ; verder werkten mee W. Bergman ... et al. ; eindred. Van den Hoven Bureauredactie ; foto's Consumentenbond, Irene Kievits]",
    "taal": "dut",
    "jaartal": 2003,
    "author": "J.J.E. van Everdingen"
  },
  {
    "id": 145389,
    "query": "test",
    "titel": "Een kom water, een test vuur / Hella S. Haasse",
    "taal": "dut",
    "jaartal": 1959,
    "author": "Haasse, Hella S."
  },
  {
    "id": 156544,
    "query": "test",
    "titel": "The love test / Hugo Hamilton",
    "taal": "eng",
    "jaartal": 1995,
    "author": "Hamilton, Hugo"
  },
  {
    "id": 184502,
    "query": "test",
    "titel": "Drie drama's / Willem Frederik Hermans",
    "taal": "dut",
    "jaartal": 1962,
    "author": "Hermans, Willem Frederik"
  },
  {
    "id": 192166,
    "query": "test",
    "titel": "Test je kennis over de wereld : leuke spelen waarvan je ook wat leert / tekst van G.R. van Hierden-Tuinman en J. van Gelder ; met quizvragen van Erik Van den Heuvel",
    "taal": "dut",
    "jaartal": 1982,
    "author": "van Hierden-Tuinman, R."
  },
  {
    "id": 202167,
    "query": "test",
    "titel": "Jef Farèl in actie / tekst: G.H. van Maren ; tek.: Ben Horsthuis",
    "taal": "dut",
    "jaartal": 1996,
    "author": "Horsthuis, Ben"
  },
  {
    "id": 204948,
    "query": "test",
    "titel": "Wat is uw keus? : 22 auto's getest en beschreven / door J.B.Th. Hugenholtz",
    "taal": "dut",
    "jaartal": 1968,
    "author": "Hugenholtz, J.B.Th."
  },
  {
    "id": 208308,
    "query": "test",
    "titel": "Test het I.Q. van uw kat : hoe intelligent is uw poes of kater? / E.M. Bard ; met tek. van Robert Leydenfrost ; [vert. uit het Engels: Thecla Nieweg]",
    "taal": "dut",
    "jaartal": 1991,
    "author": "Bard, E.M."
  },
  {
    "id": 227995,
    "query": "test",
    "titel": "Diagnostiek bij allochtonen : mogelijkheden en beperkingen van psychologische tests / Nico Bleichrodt, Fons J.R. van de Vijver (red.)",
    "taal": "dut",
    "jaartal": 2001,
    "author": "Nico Bleichrodt"
  },
  {
    "id": 264632,
    "query": "test",
    "titel": "Vingeroefeningen voor de psychologische test : testvoorbeelden en aanwijzingen voor sollicitanten en liefhebbers / Frank Brenner, Doris Dilger ; [vert. uit het Duits door Rien Pico]",
    "taal": "dut",
    "jaartal": 1985,
    "author": "Brenner, Frank"
  },
  {
    "id": 266822,
    "query": "test",
    "titel": "Test zelf uw rekenkunst / Edward H. Julius ; [vert. uit het Engels door: E.J. van Kervel]",
    "taal": "Taal onbekend",
    "jaartal": 1993,
    "author": "Julius, Edward H."
  },
  {
    "id": 271384,
    "query": "test",
    "titel": "Kleur in de klas : 101 kernpunten van intercultureel onderwijs : met de test Hoe allochtoon-vriendelijk ben ik eigenlijk? / Hans Kaldenbach ; [ill. Anone ... et al.]",
    "taal": "dut",
    "jaartal": 1998,
    "author": "Kaldenbach, Hans"
  },
  {
    "id": 279175,
    "query": "test",
    "titel": "The test of time / by Garry Kasparov ; transl. [from the Russian] by K.P. Neat",
    "taal": "eng",
    "jaartal": 1986,
    "author": "Kasparov, Garri"
  },
  {
    "id": 297201,
    "query": "test",
    "titel": "Test en verbeter uw vaardigheden als manager / Vikky Burt ; [vert. uit het Engels: Katrien Bruyland]",
    "taal": "dut",
    "jaartal": 2001,
    "author": "Burt, Vikky"
  },
  {
    "id": 311037,
    "query": "test",
    "titel": "Harde noten : test uw klassieke muziekkennis / [Victor Striker ; red.: De Taallijn]",
    "taal": "dut",
    "jaartal": 2000,
    "author": "Striker, Victor"
  },
  {
    "id": 329000,
    "query": "test",
    "titel": "Tests in de psychologische practijk : een inleiding in de psychodiagnostiek / door B.J. Kouwer",
    "taal": "dut",
    "jaartal": 1957,
    "author": "Kouwer, B.J."
  },
  {
    "id": 331266,
    "query": "test",
    "titel": "Handboek psychodiagnostiek en verstandelijke beperking : classificatie, test- en schaalgebruik / D.W. Kraijer, J.J. Plas ; [ill.: Juul Kraijer]",
    "taal": "dut",
    "jaartal": 2002,
    "author": "Kraijer, D.W."
  },
  {
    "id": 372537,
    "query": "test",
    "titel": "Test uw talenten / Peter Lauster ; [vert. uit het Duits door Parma van Loon ; ill.: Kurt Heger]",
    "taal": "dut",
    "jaartal": 1991,
    "author": "Lauster, Peter"
  },
  {
    "id": 395836,
    "query": "test",
    "titel": "Test your EQ / Mark Davis",
    "taal": "eng",
    "jaartal": 2004,
    "author": "Davis, Mark"
  },
  {
    "id": 420991,
    "query": "test",
    "titel": "psychologische test voor onderwijs en maatschappij / J. Luning Prak",
    "taal": "dut",
    "jaartal": 1976,
    "author": "Prak, Jacob Luning"
  },
  {
    "id": 421163,
    "query": "test",
    "titel": "De waarde van de psychologische test / J. Luning Prak",
    "taal": "dut",
    "jaartal": 1964,
    "author": "Prak, Jacob Luning"
  },
  {
    "id": 434733,
    "query": "test",
    "titel": "Testwijzer : het gebruik van psychologische tests bij personeelsselectie / Paul van der Maesen de Sombreff",
    "taal": "dut",
    "jaartal": 1990,
    "author": "van der Maesen de Sombreff, Paul"
  },
  {
    "id": 471413,
    "query": "test",
    "taal": "dut",
    "jaartal": 1980,
    "author": "Mesker, P."
  },
  {
    "id": 488932,
    "query": "test",
    "titel": "Test en verbeter uw managementstijl / John Wilson ; [vert. uit het Engels: Katrien Bruyland]",
    "taal": "dut",
    "jaartal": 2001,
    "author": "Wilson, John"
  },
  {
    "id": 500547,
    "query": "test",
    "titel": "The electric kool-aid acid test / Tom Wolfe",
    "taal": "eng",
    "jaartal": 1990,
    "author": "Wolfe, Tom"
  },
  {
    "id": 512931,
    "query": "test",
    "titel": "Test en verbeter uw leidinggevende capaciteiten / Brian O'Neill ; [vert. uit het Engels: Moniek Braeckman]",
    "taal": "dut",
    "jaartal": 2001,
    "author": "O'Neill, Brian"
  },
  {
    "id": 546869,
    "query": "test",
    "titel": "Genees je allergie in een handomdraai : test en therapie met drukpuntmassage / Jimmy Scott ; [ill. Claudia Wagar ; vert. uit het Engels door Margot Bakker]",
    "taal": "dut",
    "jaartal": 1989,
    "author": "SCOTT, JIMMY"
  },
  {
    "id": 555566,
    "query": "test",
    "titel": "The Times IQ-test : 400 nieuwe oefeningen voor de praktijk / Ken Russell en Philip Carter ; [vert. uit het Engels: Joost Zwart]",
    "taal": "dut",
    "jaartal": 2002,
    "author": "Russell, Ken"
  },
  {
    "id": 590086,
    "query": "test",
    "titel": "Test your English vocabulary in use : pre-intermediate & intermediate / Stuart Redman & Ruth Gairns",
    "taal": "eng",
    "jaartal": 2003,
    "author": "Redman, Stuart"
  },
  {
    "id": 632528,
    "query": "test",
    "titel": "Chill : toptips voor relaxte meiden : test jezelf, maak lekkere snacks en doe iets creatiefs / Leanne Warrick",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Warrick, Leanne"
  },
  {
    "id": 636174,
    "query": "test",
    "titel": "Test your IQ : 400 questions to boost your brainpower/ Philip Carter & Ken Russell",
    "taal": "eng",
    "jaartal": 2007,
    "author": "Carter, Philip"
  },
  {
    "id": 639008,
    "query": "test",
    "titel": "Trainingsprogramma voor de psychologische test : aanwijzingen, voorbeelden en oplossingen voor een succesvolle test / Paul Pelshenke",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Pelshenke, Paul"
  },
  {
    "id": 640774,
    "query": "test",
    "titel": "Testtheorie : inleiding in de theorie van de psychologische test en zijn toepassingen / P.J.D. Drenth, K. Sijtsma",
    "taal": "dut",
    "jaartal": 2006,
    "author": "Drenth, P.J.D."
  },
  {
    "id": 642576,
    "query": "test",
    "titel": "Alles over management tests / Jack J.R. van Minden",
    "taal": "dut",
    "jaartal": 2006,
    "author": "van Minden, Jack J.R."
  },
  {
    "id": 656337,
    "query": "test",
    "titel": "Houden van is niet genoeg : test, begrijp en verbeter je relatie / Jan Verhulst",
    "taal": "dut",
    "jaartal": 2007,
    "author": "Verhulst, Jan"
  },
  {
    "id": 665622,
    "query": "test",
    "titel": "Practice exercises for the TOEFL : test of English as a foreign language / Pamela J. Sharpe",
    "taal": "eng",
    "jaartal": 2003,
    "author": "Sharpe, Pamela J."
  },
  {
    "id": 681819,
    "query": "test",
    "titel": "Die Homosexualität des Mannes im Szondi-Test : ein Beitrag zur Erforschung der Homosexualität und zur Kritik der Szondi-Methode / von Carl Laszlo",
    "taal": "ger",
    "jaartal": 1956,
    "author": "Laszlo, Carl"
  },
  {
    "id": 684350,
    "query": "test",
    "titel": "De aids-test : wel of niet doen?",
    "taal": "dut",
    "jaartal": 1991,
    "author": "Auteur onbekend"
  },
  {
    "id": 685014,
    "query": "test",
    "titel": "Juridische en ethische dilemma's bij HIV-prevalentie_onderzoek : inleiding voor de Nationale commissie AIDS-bestrijding , symposium Toepassing van de test, 1 december 1988 / W. van der Burg, A.H. Vedder, A.K. Huibers",
    "taal": "dut",
    "jaartal": 1988,
    "author": "van der Burg, W."
  },
  {
    "id": 685123,
    "query": "test",
    "titel": "Le labyrinthe sida : quelques impacts sociaux du sida en Suisse : test des anticorps anti-hiv, assurance maladie, emploi, caisses de pension / Roger Charbonney",
    "taal": "fre",
    "jaartal": 1988,
    "author": "Charbonney, Roger"
  },
  {
    "id": 686448,
    "query": "test",
    "titel": "Gefeliciteerd mevrouw, de test wijst uit dat u 100% lesbies bent : een onderzoek naar hulpverleningservaringen van lesbiese vrouwen / [door] Ineke Hengeveld, Obertha Holwerda en Marianne Hoogma",
    "taal": "dut",
    "jaartal": 1980,
    "author": "Hengeveld, Ineke"
  },
  {
    "id": 751340,
    "query": "test",
    "titel": "Coole chick of tuttebol : welk type ben jij? : 50 tests om: je toekomst te ontrafelen, je eigen stijl te openbaren en je ware ik te ontdekken! / Michelle Hainer",
    "taal": "dut",
    "jaartal": 2007,
    "author": "Hainer, Michelle"
  },
  {
    "id": 752789,
    "query": "test",
    "titel": "AIDS information and education in the Netherlands : summary national programme 1992 ; general messages 'safe sex' and 'HIV test' ; addresses / Cees J.M. van Eijk",
    "taal": "eng",
    "jaartal": 1992,
    "author": "van Eijk, Cees J.M."
  },
  {
    "id": 753312,
    "query": "test",
    "titel": "De HIV-test, wel of niet doen? : Antwoorden op de meest gestelde vragen / Stichting Aids Fonds",
    "taal": "dut",
    "jaartal": 1997,
    "author": "Auteur onbekend"
  },
  {
    "id": 754999,
    "query": "test",
    "titel": "Profiel van de aanvragers van een HIV-test bij de GGD Leiden e.o. : 1991, 1992, 1993 / Hanneke Tielen, Jacky Voskuil, Sandra Wijnands",
    "taal": "dut",
    "jaartal": 1994,
    "author": "Tielen, Hanneke"
  },
  {
    "id": 757250,
    "query": "test",
    "titel": "Test of a path-analytic model of condom use among homosexual men / C.J. Hoekzema ... [et al.]",
    "taal": "dut",
    "jaartal": 1993,
    "author": "Hoekzema, C.J."
  },
  {
    "id": 757591,
    "query": "test",
    "titel": "HIV testing: a study of why gay men in the Netherlands choose not to test / Shelley Facente",
    "taal": "eng",
    "jaartal": 2001,
    "author": "Facente, S."
  },
  {
    "id": 759697,
    "query": "test",
    "titel": "The Male Impotence Test : The MIT Manual / Ahmed El Senoussi",
    "taal": "eng",
    "jaartal": 1964,
    "author": "Senoussi, A."
  },
  {
    "id": 797329,
    "query": "test",
    "titel": "Handboek psychodiagnostiek en beperkte begaafdheid : classificatie, test-, schaal- en vragenlijstgebruik / D.W. Kraijer, J.J. Plas",
    "taal": "dut",
    "jaartal": 2007,
    "author": "Kraijer, D.W."
  },
  {
    "id": 812429,
    "query": "test",
    "titel": "Sociaal cognitieve vaardigheden test : handleiding / Teun G. van Manen, Pier J.M. Prins, Paul M.G. Emmelkamp",
    "taal": "dut",
    "jaartal": 2007,
    "author": "van Manen, Teun G."
  },
  {
    "id": 815042,
    "query": "test",
    "titel": "Test je talent / Mireille Geus en Laura Carina Mesland",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Geus, Mireille"
  },
  {
    "id": 815048,
    "query": "test",
    "titel": "Gare dino's en de Grote Kika Cola Test / Tais Teng en Laura van Hoeij",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Teng, Tais"
  },
  {
    "id": 893062,
    "query": "test",
    "titel": "TMap NEXT : Business Driven Test Management / Leo van der Aalst ... [et al.]",
    "taal": "dut",
    "jaartal": 2008,
    "author": "Leo van der Aalst"
  },
  {
    "id": 902525,
    "query": "test",
    "titel": "The Times IQ-tests / Ken Russell Dl. 2,  400 niet eerder gepubliceerde vragen / [vert. uit het Engels: Marten Hofstede]",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Russell, Ken"
  },
  {
    "id": 919162,
    "query": "test",
    "titel": "Psychologische tests voor dummies / Liam Healy",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Healy, Liam"
  },
  {
    "id": 922556,
    "query": "test",
    "titel": "Waarom hij, waarom zij? : test je persoonlijkheid en vind de ware liefde / Helen Fisher",
    "taal": "dut",
    "jaartal": 2009,
    "author": "Fisher, Helen"
  },
  {
    "id": 941595,
    "query": "test",
    "titel": "The Times IQ-tests / Ken Russell Dl. 3,  : 400 niet eerder gepubliceerde vragen / [vert. uit het Engels: Marten Hofstede]",
    "taal": "dut",
    "jaartal": 2010,
    "author": "Russell, Ken"
  },
  {
    "id": 959818,
    "query": "test",
    "titel": "Testen en getest worden : over belangen en beginselen rond de HIV-test / A.H. Vedder",
    "taal": "dut",
    "jaartal": 1990,
    "author": "Vedder, A."
  },
  {
    "id": 960854,
    "query": "test",
    "titel": "Test de test : een boekje voor mensen die een hiv-test overwegen",
    "taal": "dut",
    "jaartal": 1999,
    "author": "Auteur onbekend"
  },
  {
    "id": 963149,
    "query": "test",
    "titel": "HIV and me : the complete gay guide to the HIV test and living with the virus / [text: Collin Richardson ; ill.: Mark Blann]",
    "taal": "eng",
    "jaartal": 2003,
    "author": "Richardson, C."
  },
  {
    "id": 963903,
    "query": "test",
    "titel": "Alles over psychologische tests / Jack J.R. van Minden",
    "taal": "dut",
    "jaartal": 2010,
    "author": "van Minden, Jack J.R."
  },
  {
    "id": 989450,
    "query": "test",
    "titel": "The official guide to the TOEFL test / ETS",
    "taal": "eng",
    "jaartal": 2009,
    "author": "Auteur onbekend"
  },
  {
    "id": 1012743,
    "query": "test",
    "titel": "Alles over management tests : tests, tools en cases voor managers met ambitie / Jack J.R. van Minden",
    "taal": "dut",
    "jaartal": 2011,
    "author": "van Minden, Jack J.R."
  },
  {
    "id": 1020843,
    "query": "test",
    "titel": "Als beste getest / [tekst:] Hercules",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Valkema"
  },
  {
    "id": 1026406,
    "query": "test",
    "titel": "Verlaag uw hartleeftijd : test zelf uw hartleeftijd / Lothar Schwarz & Markus Schwarz",
    "taal": "dut",
    "jaartal": 2011,
    "author": "Schwarz, Lothar"
  },
  {
    "id": 1056529,
    "query": "test",
    "titel": "Stukje bij beestje : test je kennis van de dierenwereld / Lars Gejl",
    "taal": "dut",
    "jaartal": 2012,
    "author": "Gejl, Lars"
  },
  {
    "id": 1092583,
    "query": "test",
    "titel": "Test. / Mirjam Mous",
    "taal": "dut",
    "jaartal": 2013,
    "author": "Mous, Mirjam"
  },
  {
    "id": 1096314,
    "query": "test",
    "titel": "Passing the Test: The Transgender Self, Society and Femininity / Allison Bischoff",
    "taal": "eng",
    "jaartal": 2011,
    "author": "Bischoff, A."
  },
  {
    "id": 1098643,
    "query": "test",
    "titel": "De test / Joelle Charbonneau",
    "taal": "dut",
    "jaartal": 2013,
    "author": "Charbonneau, Joelle"
  },
  {
    "id": 1118848,
    "query": "test",
    "titel": "Stress test : reflections on financial crises / Timothy F. Geithner",
    "taal": "eng",
    "jaartal": 2014,
    "author": "Geithner, Timothy F."
  },
  {
    "id": 1131124,
    "query": "test",
    "titel": "Rails 4 test prescriptions : build a healthy codebase / Noel Rappin",
    "taal": "eng",
    "jaartal": 2014,
    "author": "Rappin, Noel"
  },
  {
    "id": 1136443,
    "query": "test",
    "titel": "Praktijkboek psychologische test : voorbereidende oefeningen / John Wiering",
    "taal": "dut",
    "jaartal": 2015,
    "author": "Wiering, John"
  },
  {
    "id": 1136530,
    "query": "test",
    "titel": "Narissa's spannende test / Ella Gray",
    "taal": "dut",
    "jaartal": 2015,
    "author": "Gray, Ella"
  },
  {
    "id": 1137252,
    "query": "test",
    "titel": "The great prostate hoax : how big medicine hijacked the PSA test and caused a public health disaster / Richard J. Ablin, PhD",
    "taal": "eng",
    "jaartal": 2014,
    "author": "Ablin, Richard J."
  },
  {
    "id": 1140999,
    "query": "test",
    "titel": "Testjaarboek 2017 : bijna 1500 producten en diensten getest / auteur: Consumentenbond",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Alfred Jacobsen"
  },
  {
    "id": 1150723,
    "query": "test",
    "titel": "Barron's TOEFL iBT : internet-based test / Pamela J. Sharpe",
    "taal": "eng",
    "jaartal": 2013,
    "author": "Sharpe, Pamela J."
  },
  {
    "id": 1150730,
    "query": "test",
    "titel": "The official guide to the TOEFL® test / ETS",
    "taal": "eng",
    "jaartal": 2015,
    "author": "Educational Testing Service, Princeton,N.J."
  },
  {
    "id": 1150743,
    "query": "test",
    "titel": "Essential cybersecurity science : build, test, and evaluate secure systems / Josiah Dykstra",
    "taal": "eng",
    "jaartal": 2015,
    "author": "Dykstra, Josiah"
  },
  {
    "id": 1153575,
    "query": "test",
    "titel": "De test / Hjorth Rosenfeldt",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Rosenfeldt, Hjorth"
  },
  {
    "id": 1158341,
    "query": "test",
    "titel": "MeisjeDjamila : life in Texas, expectations vs reality, holiday ins & outs, emoji's fashion, diy's, quiz, test, puzzels en héél véél challenges van Djamila / idee en inhoud: Djamila (MeisjeDjamila)",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Djamila\""
  },
  {
    "id": 1159051,
    "query": "test",
    "titel": "Je kind als proefkonijn : de 25 leukste psychologische tests voor thuis voor kinderen van 0-12 jaar / Otje van der Lelij",
    "taal": "dut",
    "jaartal": 2016,
    "author": "van der Lelij, Otje"
  },
  {
    "id": 1160130,
    "query": "test",
    "titel": "Testjaarboek 2018 : bijna 2000 producten en diensten getest / auteur: Consumentenbond",
    "taal": "dut",
    "jaartal": 2017,
    "author": "Alfred Jacobsen"
  },
  {
    "id": 1160672,
    "query": "test",
    "titel": "Pub Quiz Amsterdam : test je kennis in 99 quizvragen / samenstelling Monique den Ouden",
    "taal": "dut",
    "jaartal": 2016,
    "author": "Monique den Ouden"
  },
  {
    "id": 1163652,
    "query": "test",
    "titel": "De grote voetbal-iq-test : daag je vrienden uit! / Willem van Beeren & Harry Hamer",
    "taal": "dut",
    "jaartal": 2016,
    "author": "van Beeren, Willem"
  },
  {
    "id": 1172754,
    "query": "test",
    "titel": "The tickle test / Kathryn White, Adrian Reynolds",
    "taal": "eng",
    "jaartal": 2017,
    "author": "White, Kathryn"
  },
  {
    "id": 1176228,
    "query": "test",
    "titel": "Building microservices with ASP.NET Core : develop, test, and deploy cross-platform services in the cloud / Kevin Hoffman",
    "taal": "eng",
    "jaartal": 2017,
    "author": "Hoffman, Kevin"
  },
  {
    "id": 1176724,
    "query": "test",
    "titel": "Gentest of geen test? : Hoe de NIPT de zwangerschap verandert / Marcel Zuijderland",
    "taal": "dut",
    "jaartal": 2017,
    "author": "Zuijderland, Marcel"
  },
  {
    "id": 1179447,
    "query": "test",
    "titel": "The new business road test : what entrepreneurs and investors should do before launching a lean start-up / John Mullins",
    "taal": "eng",
    "jaartal": 2018,
    "author": "Mullins, John"
  },
  {
    "id": 1181922,
    "query": "test",
    "titel": "Over de grens : de vluchtelingencrisis als reality test / Monika Sie Dhian Ho, René Cuperus & Annelies Pilon (red.)",
    "taal": "dut",
    "jaartal": 2017,
    "author": "Monika Sie Dhian Ho"
  },
  {
    "id": 1182889,
    "query": "test",
    "titel": "Komt een test bij de dokter / T.A. Boer, S.M.H. Einerhand, J.N. de Haas- de Vries en M.N. van Rijswijk",
    "taal": "dut",
    "jaartal": 2018,
    "author": "Boer, T.A."
  },
  {
    "id": 1188710,
    "query": "test",
    "titel": "Talentenwijzer : talentontwikkelingsprogramma met online test / Djoerd Hiemstra",
    "taal": "dut",
    "jaartal": 2018,
    "author": "Hiemstra, Djoerd"
  },
  {
    "id": 1192274,
    "query": "test",
    "titel": "\"AZT en de (mogelijke) konsekwenties voor het test- en preventiebeleid nader bekeken\"!",
    "taal": "dut",
    "jaartal": 1988,
    "author": "Auteur onbekend"
  }
]
},{}]},{},[1]);
