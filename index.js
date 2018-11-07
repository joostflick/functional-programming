const OBA = require('oba-api');
var fs = require('fs');
require('dotenv').config()

// Take keys from .env
var public_key = process.env.DB_PUBLIC;
var secret_key = process.env.DB_SECRET;

// Set up authentication to api server
const client = new OBA({
  public: public_key,
  secret: secret_key
});

// Empty array for the results
const boeken = []

// Empty promises array
promises = []

// Bepaal het aantal pagina's
var amountPages = 4

// Bepaal het jaar
var year = 2016

// De query
var query = 'year:' + year + ' muziek'

// Get results voor elke page
for (var i = 0; i < amountPages; i++) getResults((i + 1), query);

// Get results functie, met parameters voor welke pagina en query
function getResults(page, query){
  promises.push(
  client.get('search', {
    q: query,
    //sort: 'title',
    facet: 'type(book)',
    refine: true,
    page: page
  })
  .then(function(res){
    JSON.parse(res).aquabrowser.results.result.forEach(function(boek, id) {
  
      var boekInstantie = {
        //pageId : id,
        id : parseInt(boek.id.nativeid),
        titel : boek.titles.title.$t,
        taal : (typeof boek.languages === "undefined") ? 'Taal onbekend' : boek.languages.language.$t,
        jaartal : (typeof boek.publication === "undefined" || typeof boek.publication.year === "undefined") ? 'Jaar onbekend' : parseInt(boek.publication.year.$t),
        author : (typeof boek.authors === "undefined" || typeof boek.authors['main-author'] === "undefined")  ? "Auteur onbekend" : boek.authors['main-author'].$t
      }
      
      boeken.push(boekInstantie)
    })
  })
    .catch(err => console.log(err))
  )
}

// order the data by a certain property
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function dynamicSort(property) {
  var sortOrder = 1
  if(property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
      return result * sortOrder
  }
}

//Remove duplicates which occur because the oba API loops through pages when you request non existant pages
//This removes duplicates based on a certain property
//https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
function removeDuplicate(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}

// If all promises are resolved, do this
Promise.all(promises).then(function(res){
  //console.log(boeken)

  // Remove duplicates and sort by year
  var cleanedBoeken = removeDuplicate(boeken.sort(dynamicSort("jaartal")), "id");
  console.log(cleanedBoeken)
  //boeken.sort(dynamicSort("jaartal"))
  fs.writeFile('myjsonfile.json', JSON.stringify(cleanedBoeken, null, '  '), 'utf8', function(){})
  //console.log(boeken)
  boekenDut = []
  boekenEng = []
  cleanedBoeken.forEach(function(boek){
    if(boek.jaartal === year && boek.taal === 'dut'){
      boekenDut.push(boek)
    } else if(boek.jaartal === year && boek.taal === 'eng'){
      boekenEng.push(boek)
    }
  })
  //console.log(boekenDut)
  console.log("Aantal boeken uit " + year + " in de taal Nederlands: " + boekenDut.length)
  //console.log(boekenEng)
  console.log("Aantal boeken uit " + year + " in de taal Engels: " + boekenEng.length)
  console.log(cleanedBoeken.length)
})
