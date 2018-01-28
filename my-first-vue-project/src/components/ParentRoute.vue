<template>
  <div id="Parentoute">
    <p style="color: bisque">Parentoute 父路由</p>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'Parentoute',
    data() {
      return {

      }
    },
    methods: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active{
    color: #42b983;
    font-size: 20px;
    font-weight: bold;
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
