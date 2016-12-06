import React from 'react';
import ReactDOM from 'react-dom';

class TodoList extends React.Component {
    render() {
        return (<h1>Hello world</h1>);
    }
}


ReactDOM.render(
    <TodoList />,
    document.getElementById('todos')
);
