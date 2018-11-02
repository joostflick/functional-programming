const OBA = require('oba-api');
var fs = require('fs');
require('dotenv').config()

// Take keys from .env
var public_key = process.env.DB_PUBLIC;
var secret_key = process.env.DB_SECRET;

// Setup authentication to api server
const client = new OBA({
  public: public_key,
  secret: secret_key
});

const boeken = [];
// Amount of desired pages (desired results / 20)
const amountPages = 10;
var pageIndex = 0;
promises = [];


for(i=0; i<amountPages; i++){
  pageIndex++
  promises.push(
  client.get('search', {
    q: 'language:eng',
    sort: 'title',
    facet: 'type(book)',
    refine: true,
    page: pageIndex
  })
  .then(function(res){
    JSON.parse(res).aquabrowser.results.result.forEach(function(boek, id) {
  
      var boekInstantie = {
        //pageId : id,
        id : parseInt(boek.id.nativeid),
        titel : boek.titles.title.$t,
        taal : (typeof boek.languages === "undefined") ? 'Taal onbekend' : boek.languages.language.$t,
        jaartal : (typeof boek.publication === "undefined" || typeof boek.publication.year === "undefined") ? 'Jaar onbekend' : boek.publication.year.$t,
        author : (typeof boek.authors === "undefined" || typeof boek.authors['main-author'] === "undefined")  ? "Auteur onbekend" : boek.authors['main-author'].$t
      }
      
      boeken.push(boekInstantie)
    })
  })
    .catch(err => console.log(err)) // Something went wrong in the request to the API
  )
}
Promise.all(promises).then(function(res){
  fs.writeFile('myjsonfile.json', JSON.stringify(boeken), 'utf8', function(){})
  console.log(boeken)
})
