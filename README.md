# redux json api demo
While playing around with React I've found myself with a need to pull data from a server. The data comes in compliant with [json api spec](http://jsonapi.org) and the [Redux Json Api package](https://github.com/dixieio/redux-json-api) was listed as one of the JS client implementations.

While there are some docs in the [Redux Json Api GitHub repo](https://github.com/dixieio/redux-json-api) I was missing an understandable and complete example of how to implement this.

To get to know the library a bit better I started by creating a quick "Hello World" app, which is available by checking out the [hello-world tag of this repo](https://github.com/tomharvey/redux-json-api-demo/tree/hello-world)

The only file which then changes to add the Redux store and make use of the redux-son-api package is `main.js` and [this diff](https://github.com/tomharvey/redux-json-api-demo/compare/hello-world...3beb65468753ad0b022ad0f1d8b39619e688a075) should show the changes required to get up and running with this package.