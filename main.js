import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as api, readEndpoint } from 'redux-json-api';
import { setEndpointHost, setEndpointPath, setAccessToken, setHeaders } from 'redux-json-api';

const reducer = combineReducers({
    api
});

const store = createStore(reducer, applyMiddleware(thunk))

store.dispatch(setEndpointHost('http://localhost:8080'));
store.dispatch(setEndpointPath('/api/v1'))

class PostList extends React.Component {
    componentWillMount() {
        store.dispatch(readEndpoint('posts.json'));
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

const mapStateToProps = (state) => {
    console.log(state) // Check the console to see how the state object changes as we read the API
    const posts = state.api.posts || { data: [] };
    return {
        posts
    }
};

const ApiResults = connect(
    mapStateToProps
)(PostList)

ReactDOM.render(
    <ApiResults store={store} />,
    document.getElementById('posts')
);
