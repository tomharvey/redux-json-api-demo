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
        store.dispatch(readEndpoint('events/1'));
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

const mapStateToProps = (
        { api: 
            { events = { data: [] } }
        }
    ) => ({
    events
});

const ApiResults = connect(
    mapStateToProps
)(TodoList)

ReactDOM.render(
    <ApiResults store={store} />,
    document.getElementById('todos')
);
