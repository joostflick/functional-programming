# Functional programming

![Main view](./img/image1.png)

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

## linting

I used prettier in VScode using the prettier defaults but with no closing `;`
