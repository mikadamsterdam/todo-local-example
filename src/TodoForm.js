import React from 'react';
import model from './Model'

class TodoForm extends React.Component {
   constructor() {
      super();
   }

   createTodo(event) {
      event.preventDefault();

      let component = this;
      let title = component.refs.newTodoInput.value;

      let newTodo = {
         id: null,
         title: title,
         completed: false
      };

      function onDone( data ) {
         console.log( "Create Todo done: " + JSON.stringify( data ) );

         component.props.onChange();
         component.refs.newTodoInput.value = "";
      }

      function onFail(error) {
         console.log(error);
      }

      model.todos.create( newTodo, onDone, onFail );
   }

   render() {
      return (
         <form onSubmit={this.createTodo.bind(this)}>
            <div className="form-group col-xs-10">
               <input type="text" className="form-control" ref="newTodoInput" placeholder="What needs to be done?"/>
            </div>
            <div className="form-group col-xs-2">
               <button type="submit" className="btn btn-primary">Save</button>
            </div>
         </form>
      );
   }
}

export default TodoForm;
