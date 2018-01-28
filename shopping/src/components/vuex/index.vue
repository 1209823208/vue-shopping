<template>
  <div id="app">
    <h1>vuex demo</h1>
    <h2>Products</h2>
      <shopingList></shopingList>
    <h2>Cart</h2>
      <cartList></cartList>
  </div>
</template>

<script>
  import shopingList from './shoppingList.vue'
  import cartList from './cartList.vue'

  export default {
    components: {
      shopingList,
      cartList
    }
  }
</script>

<style>

</style>
