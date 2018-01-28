<template>
  <div id="header">
    <h1 v-text="msg"></h1>
    <h1 v-text="parentHeader"></h1>
    <input v-model="childTellParent"/>
    <button v-on:click="childTellParentByInput">确定</button>
    <p>路由参数：{{params}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        msg: 'this is a header',
        childTellParent: '',
        params: this.$route.params
      }
    },
    props: ['parentHeader'],
    methods: {
      childTellParentByInput: function () {
        console.log('child:', this.childTellParent);
        this.$emit('childTellParentByFunction', this.childTellParent)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header {
    color: aquamarine
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
