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

## Day 2

### 5 possible research cases (in Dutch):

* Meer engelstalige boeken sinds Nederland steeds internationaler is?
* Bepaalde onderwerpen die vaker voorkomen, bijv: Meer boeken over programmeren?
* Komen er steeds minder boeken bij in het assortiment?
* Correlatie dikte van boeken en het onderwerp (worden woordenboeken dikker of dunner over tijd?)
* In welke taal zijn boeken het dikst

## Day 3

Pushing the results to a javascript object using JSON.parse.

Once all results are in an array I can modify the results and choose to only display parts of it.

Example:

```js
boeken.push(["id: " + id, "titel: " + boek.titles.title.$t, "taal: " + boek.languages.language.$t]);
```

Here I can access different fields of the books that my search query returns. A few fields I'm able to access now:

```js
    boek.titles.title.$t// titel
    boek.authors['main-author'].$t // hoofdauteur
    boek.authors.author.$t // auteur
    boek.languages.language.$t // taal
    boek.publication.year.$t // jaartal
    boek.summaries.summary.$t // samenvatting
```

Also more experimentation with the search query.

Experimenting with the different parameters. 

```js
facet: 'type(book)' 
```

With 
```js
refine: true
```
It's possible to filter on the different facets.

Different types of facets (from the documentation):
```html
    <value count="422426" id="book" />
    <value count="2059" id="dvdvideo" />
    <value count="2186" id="movie" />
    <value count="3678" id="largetype" />
```

Should return only the results of the book type.

*Pagesize doesn't seem to work which for now prevents me from retrieving more than 20 results.*

Next evolution: Ability to check if a field is returned.

```js
    var boekInstantie = {
      id : id,
      titel : boek.titles.title.$t,
      taal : (typeof boek.languages === "undefined") ? 'Taal onbekend' : boek.languages.language.$t,
      jaartal : (typeof boek.publication === "undefined" || typeof boek.publication.year === "undefined") ? 'Jaar onbekend' : boek.publication.year.$t,
      author : (typeof boek.authors === "undefined" || typeof boek.authors['main-author'] === "undefined")  ? "Auteur onbekend" : boek.authors['main-author'].$t
    }
```

This code snippet adds id, title, language, year and author to the boek instance var. Code is added to check whether certain objects exist in the database. If they don't it displays a static message saying the info is missing.



