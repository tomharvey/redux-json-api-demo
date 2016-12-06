import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { reducer as api, readEndpoint, setEndpointHost, setEndpointPath, setAccessToken } from 'redux-json-api';


class TodoList extends React.Component {
    componentWillMount() {
        store.dispatch(setEndpointHost('http://localhost:3000'));
        store.dispatch(setEndpointPath('/api/v1'));
        store.dispatch(setAccessToken('1234'));

        store.dispatch(readEndpoint('events'));
    }

    render() {
        return (
            <ul>
            {this.props.events.data.map(event => (
                <li key={event.id} >{event.id}</li>
            ))}
            </ul>
            );
    }

};

const mapStateToProps = ({ api: { events = { data: [] } } }) => ({ events });
const reducer = combineReducers({
    api
});

const store = createStore(reducer, applyMiddleware(thunk))

const ApiResults = connect(
    mapStateToProps
)(TodoList)

ReactDOM.render(
    <ApiResults store={store} />,
    document.getElementById('todos')
);
