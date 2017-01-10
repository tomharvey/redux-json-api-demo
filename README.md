# Getting started with redux-json-api
## Introduction
I have a need to pull [json api](http://jsonapi.org) formatted data from an API server. The [Redux Json Api package](https://github.com/dixieio/redux-json-api) is listed as one of the JS client implementations, so it seems like a good place to start in solving that need.

While there are some docs in the [Redux Json Api GitHub repo](https://github.com/dixieio/redux-json-api) I was missing a complete and understandable example of how to use the package.

To experiment with this, I started with a basic 'hello world' react app.  I then added to this; adapting the app to get then display a list of items from an API server. Focusing on the bare minimum required to implement this gave me a decent understanding of how to use the library and a clear way to demonstrate the specific use of redux-json-api over any other react/redux cruft - I hope it makes for a useful getting started for others.

## Boilerplate
Start by creating the 3 files described below. Or, for the full code to create the hello world app, checkout the branch `hello_world` [here](https://github.com/tomharvey/redux-json-api-demo/tree/hello_world)


#### html
The `index.html` file contains some basic html, including a `div` with the id of `posts`. This is the div we will target to load content into with react. We're also loading `index.js`, which will contain our js code.

``` html
<!DOCTYPE html>
<html lang = "en">
    <head>
        <meta charset = "UTF-8">
        <title>React JSON API demo</title>
    </head>
    <body>
        <div id="posts"></div>
        <script src = "index.js"></script>
    </body>
</html>
```

#### npm and webpack setup
The `webpack.config.js` file contains some instructions on how webpack should operate, including webpack-dev-server which will be serving our files over http from localhost.

The `package.json` file contains some dependancies for the project. Once you've created the file you should be able to run `npm install` to install all of these.

More information on what these do can be found elsewhere.

## Hello World

The `main.js` file contains out javascript code and in this instance we're starting with a hello world app.

``` js
import React from 'react';
import ReactDOM from 'react-dom';

class TodoList extends React.Component {
    render() {
        return (<h1>Hello world</h1>);
    }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById('posts')
);
```

First we import some required objects from react. Secondly, we create a simple component to render "Hello world" in some header tags. Finally we render that component into the `div` with the id of `posts` we created in our `index.html` file.

## Listing posts from an API
So far we've just created a baseline; what follows is the bare minimum to start using redux-json-api and by separating this from a hello world you should see what's involved in using the library.

#### Creating the store
First we create a store for the results of the API call.

The `createStore` call in redux takes a `reducer` for its first argument but our simple hello world app doesn't use a reducer yet. The redux-json-api package uses one and we need to pass at least that to the `createStore` function.

``` js
const reducer = combineReducers({
    api
});

const store = createStore(reducer, applyMiddleware(thunk))
```

#### Configuring the API server options
We add the API server hostname, path and any required authentication token strings to out newly created store. In the example code, I've included soe dummy JSON and we'll serve that from the webpack-dev server as well, so we're stil lusing localhost.

``` js
store.dispatch(setEndpointHost('http://localhost:8080'));
store.dispatch(setEndpointPath('/api/v1'));
```

If the API server you're playing with requires some authentication token you will need to include that here as well.

``` js
store.dispatch(setAccessToken('SECRET-TOKEN-HERE'));
```

#### Mapping state to props
We need to create a function which will take the current state and map objects into the props object for us to use in the component we will render. In the redux-json-api docs this is given in a very terse fashion:

```
const mapStateToProps = ({ api: { tasks = { data: [] } } }) => ({ tasks });
```

I found this hard to read and difficult to translate into my current need, so went with the below:

``` js
const mapStateToProps = (state) => {
    console.log(state)
    const posts = state.api.posts || { data: [] };
    return {posts}
};
```
This takes the `state` object, then:

1. Logs the contents of `state` into the console
2. Tries to assign any posts inside the `state` object to a posts variable
3. Returns an object with a key of 'posts' which has an array of posts.

Hopefully this is easier to understand and add to. The added logging will allow you to inspect just how this works; you should see 3 instances logged and be able to see `state.api.isReading` move from 0 to 1 back to 0 as the API call is prepared, made and completed. Only in the last logged instance will you see `state.api.posts`. This is why the function assigns an empty data array to posts if that object is missing; otherwise it would raise an uncaught exception.

#### Rendering the results in the component
We extend the `TodoList` component to include a `componentWillMount` method which will dispatch an action to make a request of the API. We also add to the `render` method with some html to display a list of results.

``` js
class TodoList extends React.Component {
    componentWillMount() {
        store.dispatch(readEndpoint('posts'));
    }

    render() {
        return (
            <div>
                {this.props.posts.data.map(post => (
                    <h1 key={post.id} >{post.attributes.title}</h1>
                ))}
            </div>
        );
    }

};
```

#### Calling the API server
Finally, we create a function to call the API server and pass the results of that to the `div id='posts'` element. We also need to pass the store into this object, which contains all the required config for the API call.

``` js
const ApiResults = connect(
    mapStateToProps
)(TodoList)

ReactDOM.render(
    <ApiResults store={store} />,
    document.getElementById('posts')
);
```

#### Imports
We now need to import more than just the basic `react` and `react-dom` objects so we need to add to the top of the file with:

``` js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as api, readEndpoint } from 'redux-json-api';
import { setEndpointHost, setEndpointPath } from 'redux-json-api';
```

## Finally
This should show you how to add redux-json-api to your stack and get you started. Have a look at the console and observe how the `state` object changes as we configure the api, start to read form the api and successfully receive a response.

I've included a `posts.json` in this repo at `/api/v1/` which will show what the API server output would look like for this example. It includes comments as well as posts, you should be able to add these objects in `mapStateToProps` and then display them in `TodoList.render`.
