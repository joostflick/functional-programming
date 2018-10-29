const OBA = require('oba-api');
var fs = require('fs');

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: '1e19898c87464e239192c8bfe422f280',
  secret: '4289fec4e962a33118340c888699438d'
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client.get('search', {
  q: 'joost',
  sort: 'title'
})
  .then(res => fs.writeFile('myjsonfile.json', res, 'utf8')) // JSON results
  .catch(err => console.log(err)) // Something went wrong in the request to the API