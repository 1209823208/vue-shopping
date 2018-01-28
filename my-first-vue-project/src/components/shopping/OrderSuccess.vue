<template>
  <div id="OrderSuccess">
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="../../../static/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{currentOrderId}}</span>
            <span>Order total：{{orderTotalPrice| currency('$')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link tag="a" class="btn btn--m" :to="{path:'cartList'}">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link tag="a" class="btn btn--m" :to="{path:'/'}">Goods List</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentOrderId: '',
        orderTotalPrice: 0,
      }
    },
    methods: {
      getCurrentOrderDetail() {
        this.$http.get('/users/getOrderDetail', {
          params: {
            orderId: this.$route.query.orderId,
          },
        }).then((response) => {
          if (response.data.status === '0') {
            this.currentOrderId = response.data.result.currentOrder.orderId;
            this.orderTotalPrice = response.data.result.currentOrder.orderTotal;
          }
        }).catch((err) => {
          console.log(err);
          Promise.reject(err);
        })
      }
    },
    mounted: function () {
      this.getCurrentOrderDetail();
      this.$store.commit('getBreadHtml','OrderSuccess');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
