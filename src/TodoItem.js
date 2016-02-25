import React from 'react';
import jQuery from 'jquery';
import EditableTextField from './EditableTextField';
import model from './Model'

class TodoItem extends React.Component {
   constructor() {
      super();

      this.state = {
         loading: true
      };
   }

   componentDidMount() {
      this.setState({
         id: this.props.id,
         title: this.props.title,
         completed: this.props.completed,
         loading: false
      });
   }

   updateTitle(newTitle) {
      console.log(newTitle);
      this.syncState({title: newTitle});
   }

   toggleChecked(event) {
      this.syncState({
         completed: this.refs.completed.checked
      });
   }

   syncState( updatedState ) {
      console.log( "Sync state: " + JSON.stringify( updatedState ) );

      // Update React State ----------------------------------------

      this.setState({
         loading: true
      });

      let component = this;

      let oldState = {
         id: this.state.id,
         title: this.state.title,
         completed: this.state.completed
      };

      let newState = jQuery.extend( oldState, updatedState );

      this.setState( newState );

      console.log( newState );

      // Update Server ------------------------------------------

      function onDone( data ) {
         console.log( "Sync State Done: " + JSON.stringify( data ) );

         component.setState({
            id: data.todo.id,
            title: data.todo.title,
            completed: data.todo.completed,
         });
      }

      function onFail(error) {
         console.log(error);
      }

      function onAlways() {
         component.setState({
            loading: false
         });
      }

      model.todos.update( this.props.id, newState, onDone, onFail, onAlways );
   }

   getClassName() {
      let _classNames = ["todo"];
      if (this.state.loading) {
         _classNames.push("loading");
      }
      if (this.state.completed) {
         _classNames.push("completed");
      }
      return _classNames.join(" ");
   }

   render() {
      return (
         <li className={this.getClassName()}>
            <input className="toggle" id={this.state.id} type="checkbox" ref="completed"
                   checked={this.state.completed ? "checked" : ""} onChange={this.toggleChecked.bind(this)}/>
            <label for={this.state.id}>
               <EditableTextField value={this.state.title} onChange={this.updateTitle.bind(this)}
                                  isEditable={!this.state.completed}/>
            </label>
         </li>
      );
   }
}

export default TodoItem;
