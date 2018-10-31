# OBA API USER

## Day 1
Installed Rijks module to make node.js calls to the oba API. 
```node
$ npm install rijkvanzanten/node-oba-api
```
This also turns the xml into a json object.

Modified the code with 
```js
fs.writeFile('myjsonfile.json', res, 'utf8')
```
to be able to take a better look at the results of my search queries.

with ```http://jsonviewer.stack.hu/``` I was able to see the structure of the datamodel way better. This also helped me defining my possible research subjects

### 5 possible research cases:

* Meer engelstalige boeken sinds Nederland steeds internationaler is?
* Bepaalde onderwerpen die vaker voorkomen, bijv: Meer boeken over programmeren?
* Komen er steeds minder boeken bij in het assortiment?
* Correlatie dikte van boeken en het onderwerp (worden woordenboeken dikker of dunner over tijd?)
* In welke taal zijn boeken het dikst

