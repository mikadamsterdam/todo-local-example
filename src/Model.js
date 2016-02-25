import jQuery from 'jquery';

class TodosLocal
{
   constructor() {
      this.todos = [];
   }

   create( todo, onDone, onFail )
   {
      console.log( "TodosLocal.create: " + JSON.stringify( todo ) );

      var id = this.todos.length;

      todo = jQuery.extend( todo, { id: id } );

      this.todos.push( todo );

      onDone( { todo: todo } );
   }

   update( id, attributes, onDone, onFail, onAlways )
   {
      console.log( "TodosLocal.update: [" + id + "] " + JSON.stringify( attributes ) );

      jQuery.extend( this.todos[id], attributes );

      var response = { todo: this.todos[id] };

      onDone( response );
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
      // Use Wouter's server.  Hard code to project 2, since he added projects while I was working on this.  But should improve to
      // also understand Projects properly.
      this.server = "https://afternoon-atoll-31464.herokuapp.com/projects/2";
   }

   create( todo, onDone, onFail )
   {
      var data = JSON.stringify({ todo: todo });

      console.log( "post /todos: " + data );

      let request = {
         type: "POST",
         url: this.server + "/todos.json",
         data: data,
         contentType: "application/json",
         dataType: "json"
      };

      jQuery.ajax( request ).done( onDone ).fail( onFail );
   }

   update( id, attributes, onDone, onFail, onAlways )
   {
      let data = JSON.stringify({
         todo: attributes
      });

      console.log( "put /todos/" + id + " " + data );

      let request = {
         type: "PUT",
         url: this.server + "/todos/" +  id + ".json",
         data: data,
         contentType: "application/json",
         dataType: "json"
      };

      jQuery.ajax( request ).done( onDone ).fail( onFail ).always( onAlways );
   }

   index( onDone )
   {
      jQuery.getJSON( this.server + "/todos", onDone );
   }
}



class Model {
   constructor( opts )
   {
      this.todos = opts.local ? new TodosLocal : new TodosRemote;
      // Add models later for projects, workers, etc.
   }
}


var model = new Model( { local: true } );


function test()
{
   // What can I do here?
   // model.todos.create( { ... } );
   // model.todos.update( { ... } );
}


export default model;