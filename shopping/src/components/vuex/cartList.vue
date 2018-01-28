<template>
  <div id="cartList">
    <ul>
      <li v-for="item in carts">
        {{item.title}}     <span style="color: burlywood">{{item.quantity}}</span>
      </li>
    </ul>
    <p>total: {{totalPrice}}</p>
    <button @click="checkoutCart"> clear</button>
    <p>{{checkoutStatus}}</p>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        carts: 'getCartList',
        totalPrice: 'getTotalPrice',
        checkoutStatus: 'checkoutStatus'
      })
    },
    methods: {
      ...mapActions({
        checkoutCart: 'checkoutCart'
      }),
    }
  }
</script>

<style>

</style>
