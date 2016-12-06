import React from 'react';
import ReactDOM from 'react-dom';

class PostList extends React.Component {
    render() {
        return (<h1>Hello world</h1>);
    }
}

ReactDOM.render(
    <PostList />,
    document.getElementById('posts')
);
