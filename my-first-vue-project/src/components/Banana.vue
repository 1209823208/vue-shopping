<template>
  <div id="Banana">
    <p style="color: bisque">Banana</p>
    <button @click="addOne()">add one </button>
    <br/>
    <button @click="minusOne()">minus one</button>
  </div>
</template>

<script>
  export default {
    name: 'Banana',
    data() {
      return {
        price: 1
      }
    },
    methods: {
      addOne() {
//        this.$store.commit('increment', this.price);
      },
      minusOne() {
//        this.$store.commit('decrement', this.price);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active {
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
