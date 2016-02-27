import React from 'react';
import TodoList from './TodoList';
//import './stylesheets/_bootstrap.scss';

class App extends React.Component {
    render() {
        return (
            <div className="container">
              <h1>Todo List</h1>
              <TodoList />
            </div>
        );
    }
}

export default App;
