import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    todos: [
      {
        id: 1, done: true
      },
      {
        id: 2, done: false
      }
    ],
    obj:{
      message:'34'
    }
  },
  mutations: {
    increment(state, params) {
      console.log('increment state', state);

      console.log('increment params', params);
      state.count += params.item;
    },
    updateMessage (state, message) {
      state.obj.message = message
    }
  },
  getters: {
    doneTodos: state => {
      let s = state.todos.filter(todo => {
        return todo.done
      });
      return s;
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})

