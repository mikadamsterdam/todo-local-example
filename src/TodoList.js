import React from 'react';
import jQuery from 'jquery';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import model from './Model'

class TodoList extends React.Component {
   constructor() {
      super();

      this.state = {
         todos: []
      };
   }

   reloadTodos(event) {
      let component = this;

      function onDone(data) {
         console.log("Reload Todos done: " + data);

         component.setState({
            todos: data.todos
            //todos: []
         });
      }

      model.todos.index( onDone );
   }

   componentDidMount() {
      this.reloadTodos();
   }

   render() {
      return (
         <div className="todo-list">
            <TodoForm onChange={this.reloadTodos.bind(this)}/>
            <ul>
               {this.state.todos.map(function (todo, i) {
                  return (
                     <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed}/>
                  );
               })}
            </ul>
         </div>
      );
   }
}

export default TodoList;
