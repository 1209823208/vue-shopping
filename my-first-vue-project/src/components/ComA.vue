<template>
  <div id="ComA">
    <p style="color: bisque">ComA</p>
  </div>
</template>

<script>
  export default {
    name: 'ComA',
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
