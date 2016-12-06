import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as api, readEndpoint } from 'redux-json-api';
import { setEndpointHost, setEndpointPath, setAccessToken } from 'redux-json-api';

const reducer = combineReducers({
    api
});

const store = createStore(reducer, applyMiddleware(thunk))

store.dispatch(setEndpointHost('http://api-host'));
store.dispatch(setEndpointPath('/api/v1'));

store.dispatch(setAccessToken('token'));

class TodoList extends React.Component {
    componentWillMount() {
        store.dispatch(readEndpoint('posts'));
    }

    render() {
        return (
            <ul>
                {this.props.posts.data.map(post => (
                    <li key={post.id} >{post.title}</li>
                ))}
            </ul>
        );
    }

};

const mapStateToProps = (state) => {
    console.log(state)
    const posts = state.api.posts || { data: [] };
    return {posts}
};

const ApiResults = connect(
    mapStateToProps
)(TodoList)

ReactDOM.render(
    <ApiResults store={store} />,
    document.getElementById('posts')
);
