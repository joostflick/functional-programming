const OBA = require('oba-api');
var fs = require('fs');
require('dotenv').config()


console.log(process.env.DB_PUBLIC),
console.log(process.env.DB_SECRET)
// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: process.env.DB_PUBLIC,
  secret: process.env.DB_SECRET
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client.get('search', {
  q: 'test',
  sort: 'title'
})
  .then(res => fs.writeFile('myjsonfile.json', res, 'utf8')) // JSON results
  .catch(err => console.log(err)) // Something went wrong in the request to the API