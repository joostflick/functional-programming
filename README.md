# Functional programming

![Main view](./img/image1.png)

[Old README about code](README-code.md)

[Old README](README-old.md)

## Installation & usage

1. Download the project
2. Run `npm install`
3. To change the query edit the query var in index.js
4. Run `npm start`
5. Open docs/index.html in your browser

I implemented the following commands:

`npm run build` runs browserify to make my application usable in a browser environment

`npm run data` makes a get request to retrieve new data and add it to the d3 environment

`npm start` runs both of the above commands, first retrieving data then building the app so it can be displayed in the browser

## What did I change for the redo?

### Browserify

I added browserify to be able to display external data in my d3 graph. This way it's possible to just use one script to retrieve data and display it.

### Code quality

I removed the long pieces of code to calculate percentages using a lot of magic numbers from my API logic, and moved it to my d3 file. This made it possible to use d3 functionality like nest() to clean my data more easily.

### % per query

I changed the functionality of the application to display the percentage difference between the languages per query, instead of per year. The title automatically changes based on the query that is used.

This gives valuable insights I could have used during front-end data.

### Tooltip & colors
