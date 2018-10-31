const OBA = require('oba-api');
var fs = require('fs');
require('dotenv').config()


console.log(process.env.DB_PUBLIC),
console.log(process.env.DB_SECRET)
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
  q: 'Nederlandse wetenschappers in het buitenland',
  sort: 'title',
  pagesize: 44
})
.then(function(res){
  // fs.writeFile('myjsonfile.json', res, 'utf8')
  const boeken = [];
  JSON.parse(res).aquabrowser.results.result.forEach(function(boek, id) {
    // console.log(boek.titles.title.$t, id); // TITEL VAN HET BOEK
    // console.log(boek.authors.author.$t); // AUTEUR VAN HET BOEK
    // console.log(boek.publication.year.$t); // JAAR VAN PUBLICATIE
    boeken.push(boek.titles.title.$t, id);
    // boeken.map(function (value, index) {
    //   return index;
    // })
  })
    console.log(boeken)
})
  .catch(err => console.log(err)) // Something went wrong in the request to the API