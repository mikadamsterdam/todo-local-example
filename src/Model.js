import jQuery from 'jquery';

class TodosLocal
{
   constructor() {
      this.todos = [];
   }

   create( todo, onSuccess, onFail )
   {
      console.log( "TodosLocal.create: " + JSON.stringify( todo ) );

      var id = this.todos.length;

      this.todos.push( jQuery.extend( todo, { id: id } ) );
      onSuccess({});
   }

   update( id, attributes, onDone, onFail, onAlways )
   {
      console.log( "TodosLocal.update: [" + id + "] " + JSON.stringify( attributes ) );

      jQuery.extend( this.todos[id], attributes );

      onDone( { todo: this.todos[id] } );
      onAlways();
   }

   index( onDone ) {
      console.log( "TodosLocal.index:" );

      var response = { todos: this.todos };

      onDone( response );
   }
}


class TodosRemote
{
   constructor()
   {
   }

   create( todo, onSuccess, onFail )
   {
      var data = JSON.stringify({ todo: todo });

      console.log( "post /todos: " + data );

      var request = {
         type: "POST",
         url: "https://afternoon-atoll-31464.herokuapp.com/todos.json",
         data: data,
         contentType: "application/json",
         dataType: "json"
      };

      jQuery.ajax( request ).done( onSuccess ).fail( onFail );
   }

   update( id, attributes, onDone, onFail, onAlways )
   {
      data = JSON.stringify({
         todo: newState
      });

      console.log( "put /todos/" + id + " " + data );

      request = {
         type: "PUT",
         url: "https://afternoon-atoll-31464.herokuapp.com/todos/" +  id + ".json",
         data: data,
         contentType: "application/json",
         dataType: "json"
      };

      jQuery.ajax( request ).done( onDone ).fail( onFail ).always( onAlways );
   }

   index( onDone )
   {
      jQuery.getJSON( "https://afternoon-atoll-31464.herokuapp.com/todos", onDone );
   }
}



class Model {
   constructor( opts )
   {
      this.todos = opts.local ? new TodosLocal : new TodosRemote;
   }
}


var model = new Model( { local: true } );

export default model;