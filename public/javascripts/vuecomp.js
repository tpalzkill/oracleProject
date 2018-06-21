

new Vue({
  el: '#app',
  data: {
    message: '',
    todos: [{id:0, item:'buy milk'}],
  },
  methods: {

    // getTodos: function() {
    //   return knex('todos').where('completed', false).select('todos.text')
    //     .then(function(response) {
    //       this.todos = response;
    //
    //       // response.forEach( todo => {
    //       //   this.todos.push(todo.text);
    //       // })
    //       console.log(response);
    //     })
    // },
    addItem: function(input) {
      let id = this.todos.length + 1;
      if (this.input != '') {
        let newTodo = {
          id: id,
          item: this.message
        };
        this.todos.push(newTodo);
        this.message = '';
      }
    },
    deleteItem: function(id) {
      this.todos.splice(id, 1);
    },

  },
  beforeMount() {
    // this.getTodos();
  }
});
