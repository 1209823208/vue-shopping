<template>
  <div id="shoppingList">
    <ul>
      <li v-for="(item,index) in pruducts">
        <p>{{item.title}}  {{item.inventory}}</p>
        <button :disable="!item.inventory" @click="addCart(item)">add cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        pruducts: 'getProducts',
      }),
    },
    methods: {
      ...mapActions({
        addCart: 'addCart'
      }),
    },
    created: function () {
      this.$store.dispatch('getProductsByapi');
    },
  }
</script>

<style>

</style>
