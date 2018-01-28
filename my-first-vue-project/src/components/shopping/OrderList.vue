<template>
  <div id="orderList">
    <div class="container">
      <div class="checkout-order">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>Order content</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>Order contents</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in orderList">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img v-lazy="'../../../static/'+item.productImage" alt="">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice| currency('$')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">×{{item.productNum}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">${{item.salePrice * item.productNum| currency('$')}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>Item subtotal:</span>
                <span>{{subtotal| currency('$')}}</span>
              </li>
              <li>
                <span>Shipping:</span>
                <span>{{shipping| currency('$')}}</span>
              </li>
              <li class="order-total-price">
                <span>Order total:</span>
                <span>{{orderTotal|currency('$')}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <button class="btn btn--m" @click="goBack()">Previous</button>
          </div>
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" @click="toOrderSucess()">Proceed to payment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {currency} from '../../util/currency'
  export default {
    data() {
      return {
        orderList: [],
        subtotal: 0,
        shipping: 10,
        orderTotal: 0
      }
    },
    filters:{
      currency:currency
    },
    methods: {
      getCartList() {
        this.$http.get('/users/getCartList').then((response) => {
          if (response.data.status === '0') {
            let cartList = response.data.result.cartList;
            let _this = this;
            cartList.forEach(function (item) {
              if (item.checked === '1') {
                _this.orderList.push(item);
                _this.subtotal += item.productNum * item.salePrice;
              }
            });
            _this.orderTotal = _this.subtotal - this.shipping;
          }

        }).catch((err) => {
          console.log('err', err);
          Promise.reject(err);
        })
      },
      toOrderSucess() {
        this.$http.post('/users/addOrder', {
          addressId: this.$route.query.addressId,
          orderTotal: this.orderTotal,
        }).then((response) => {
          console.log('addOrder', response);
          if (response.data.status === '0') {
            this.$router.push({
              path: 'orderSuccess', query: {
                orderId: response.data.result.orderId,
                orderTotal: response.data.result.orderTotal,
              }
            })
          }

        }).catch((err) => {
          console.log('err', err);
//          Promise.reject(err);
        })
      },
      goBack () {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
      }
    },
    mounted: function () {
      this.getCartList();
      this.$store.commit('getBreadHtml','OrderList');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
