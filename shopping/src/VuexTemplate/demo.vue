<template>
  <div id="demo">
    <h4>Vuex</h4>
    {{countsByStore}}
    {{counts}}
    <div @click="$store.commit('increment',{item:5})">add</div>
    <div>
      <pre>{{doneCount}}</pre>
      <pre>{{getTodoItemById}}</pre>
      <pre>{{$store.getters.getTodoById(2)}}</pre>
    </div>
    <h4>表单处理</h4>
    <input :value="message" @input="updateMessage">

  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        index: 2
      }
    },
    computed: {
      ...mapState({
        counts: function (state) {
          return state.count;
        },
        message: state => state.obj.message
      }),
      ...mapGetters({
        doneCount: 'doneTodos',
      }),
      countsByStore: function () {
        return this.$store.state.count;
      },
      getTodoItemById: function () {
        return this.$store.getters.getTodoById(this.index)
      }
    },
    methods: {
      updateMessage(e) {
        this.$store.commit('updateMessage', e.target.value)
      },
      ...mapActions([]),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
