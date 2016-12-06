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
store.dispatch(setEndpointHost('http://localhost:3000'));
store.dispatch(setEndpointPath('/api/v1'));
store.dispatch(setAccessToken('1234'));

class TodoList extends React.Component {
    componentWillMount() {
        store.dispatch(readEndpoint('todos'));
    }

    render() {
        return (
            <ul>
                {this.props.todos.data.map(todo => (
                    <li key={todo.id} >{todo.description}</li>
                ))}
            </ul>
        );
    }

};

const mapStateToProps = (state) => {
    console.log(state)
    const todos = state.api.todos || { data: [] };
    return {todos}
};

const ApiResults = connect(
    mapStateToProps
)(TodoList)

ReactDOM.render(
    <ApiResults store={store} />,
    document.getElementById('todos')
);
