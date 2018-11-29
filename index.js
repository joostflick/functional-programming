const OBA = require('oba-api')
var fs = require('fs')
require('dotenv').config()

// Take keys from .env
var public_key = process.env.DB_PUBLIC
var secret_key = process.env.DB_SECRET

// Set up authentication to api server
const client = new OBA({
  public: public_key,
  secret: secret_key
})

// Empty arrays
const boeken = []
const percentageArray = []

// Empty promises array
promises = []

// Select amount of pages
var amountPages = 5

// Which year
var year = 2000

// Search query
var query = 'year:' + year + ' test'

// Get results for each page
for (var i = 0; i < amountPages; i++) getResults(i + 1, query)

// Get results with page and query parameters
function getResults(page, query) {
  // Make a promise for each request
  promises.push(
    // Get request
    client
      .get('search', {
        q: query,
        //sort: 'title',
        facet: 'type(book)',
        refine: true,
        page: page
      })
      .then(function(res) {
        JSON.parse(res).aquabrowser.results.result.forEach(function(boek, id) {
          var boekInstantie = {
            //pageId : id,
            id: parseInt(boek.id.nativeid),
            titel: boek.titles.title.$t,
            taal:
              typeof boek.languages === 'undefined'
                ? 'Taal onbekend'
                : boek.languages.language.$t,
            jaartal:
              typeof boek.publication === 'undefined' ||
              typeof boek.publication.year === 'undefined'
                ? 'Jaar onbekend'
                : parseInt(boek.publication.year.$t),
            author:
              typeof boek.authors === 'undefined' ||
              typeof boek.authors['main-author'] === 'undefined'
                ? 'Auteur onbekend'
                : boek.authors['main-author'].$t
          }
          // Push all book objects to the boeken array
          boeken.push(boekInstantie)
        })
      })
      .catch(err => console.log(err))
  )
}

// Order the data by a certain property
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function dynamicSort(property) {
  var sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}

// Remove duplicates which occur because the oba API loops through pages when you request non existant pages
// This removes duplicates based on a certain property
// https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
function removeDuplicate(originalArray, prop) {
  var newArray = []
  var lookupObject = {}

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i])
  }
  return newArray
}

// If all promises are resolved, do this
Promise.all(promises).then(function(res) {
  //console.log(boeken)

  // Remove duplicates and sort by year
  var cleanedBoeken = removeDuplicate(boeken.sort(dynamicSort('jaartal')), 'id')

  // Empty array for different languages
  languages = []

  var differentLanguages = removeDuplicate(cleanedBoeken, 'taal')

  differentLanguages.forEach(function(boek) {
    languages.push(boek.taal)
    console.log(languages)
  })

  // Code below needs to be updated to be dynamic
  boekenDut = []
  boekenEng = []
  boekenGer = []
  var boekenOther = 0

  cleanedBoeken.forEach(function(boek) {
    if (boek.taal === languages[0]) {
      boekenDut.push(boek)
    } else if (boek.taal === languages[1]) {
      boekenEng.push(boek)
    } else if (boek.taal === languages[2]) {
      boekenGer.push(boek)
    } else {
      boekenOther++
    }
  })
  //console.log(boekenDut)

  console.log(
    'Aantal boeken uit ' + year + ' in de taal Nederlands: ' + boekenDut.length
  )
  //console.log(boekenEng)
  console.log(
    'Aantal boeken uit ' + year + ' in de taal Engels: ' + boekenEng.length
  )
  console.log(
    'Aantal boeken uit ' + year + ' in de taal Duits: ' + boekenGer.length
  )

  fs.writeFile(
    'myjsonfile.json',
    JSON.stringify(cleanedBoeken, null, '  '),
    'utf8',
    function() {}
  )

  var percentages = calculatePercentage(
    boekenDut.length,
    boekenEng.length,
    boekenGer.length,
    boekenOther
  )
  percentageArray.push(
    { year: year, lang: 'Dutch', value: percentages[0] },
    { year: year, lang: 'English', value: percentages[1] },
    { year: year, lang: 'German', value: percentages[2] },
    { year: year, lang: 'Other', value: percentages[3] }
  )
  console.log(percentageArray)
  fs.writeFile(
    'docs/percentages.json',
    JSON.stringify(percentageArray, null, '  '),
    'utf8',
    function() {}
  )
})

// Calculate percentages
function calculatePercentage(dut, eng, ger, other) {
  var total = dut + eng + ger + other
  var percentDut = (dut * 100) / total
  var percentEng = (eng * 100) / total
  var percentOther = (other * 100) / total
  var percentGer = (ger * 100) / total

  return [percentDut, percentEng, percentGer, percentOther]
}
