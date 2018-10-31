const OBA = require('oba-api');
var fs = require('fs');
require('dotenv').config()


var public_key = process.env.DB_PUBLIC;
var secret_key = process.env.DB_SECRET;
// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: public_key,
  secret: secret_key
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client.get('search', {
  q: 'test',
  sort: 'title',
  facet: 'type(book)',
  refine: true
  //page: 1
})
.then(function(res){
  fs.writeFile('myjsonfile.json', res, 'utf8', function(){})
  const boeken = [];
  JSON.parse(res).aquabrowser.results.result.forEach(function(boek, id) {

    // boek.titles.title.$t// titel
    // boek.authors['main-author'].$t // hoofdauteur
    // boek.authors.author.$t // auteur
    // boek.languages.language.$t // taal
    // boek.publication.year.$t // jaartal
    // boek.summaries.summary.$t // samenvatting

    var boekInstantie = {
      id : id,
      titel : boek.titles.title.$t,
      taal : (typeof boek.languages === "undefined") ? 'Taal onbekend' : boek.languages.language.$t,
      jaartal : (typeof boek.publication === "undefined" || typeof boek.publication.year === "undefined") ? 'Jaar onbekend' : boek.publication.year.$t,
      author : (typeof boek.authors === "undefined" || typeof boek.authors['main-author'] === "undefined")  ? "Auteur onbekend" : boek.authors['main-author'].$t
    }
    
    boeken.push(boekInstantie)
    //boeken.push(["id: " + id, "titel: " + boek.titles.title.$t, "taal: " + boek.languages.language.$t]);

    // boeken.map(function (value, index) {
    //   return index;
    // })
  })
  console.log(boeken)
})
  .catch(err => console.log(err)) // Something went wrong in the request to the API