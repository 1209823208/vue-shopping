<template>
  <div id="CartList">
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}"
                       @click="editCart(item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <a href="#"><img v-lazy="'../../../static/'+item.productImage" alt=""></a>
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
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="slimProductNum(item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="addProductNum(item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.salePrice * item.productNum| currency('$')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delProduct(item.productId)">
                      <!--<icon name="flag"></icon>-->
                      <i class="fa fa-trash-o fa-fw"></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="editCheckAll()">
                  <span class="checkbox-btn item-check-btn" :class="{'check':checkAllFlag}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{getTotalPrice| currency('$')}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis': !checkoutFlag}" @click="toAddess()">Checkout</a>
              </div>
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
        cartList: [],
        checkedNum: 0,
      }
    },
    methods: {
      getCartList() {
        let _this = this;
        this.$http.get('/users/getCartList').then((response) => {
          if (response.data.status === '0') {
            _this.cartList = response.data.result.cartList
          } else {
            let arr = {
              mdShow: true,
              errorText: response.data.msg,
            };
            this.$store.commit('getErrorArr', arr);
          }

        }).catch((err) => {
          console.log('err', err);
          Promise.reject(err);
        })
      },
      // 删除购物车　
      delProduct(productId) {
        let _this = this;
        this.$http.post('/users/cartDel', {
          productId: productId
        }).then((response) => {
          if (response.data.status === '0') {
            _this.getCartList();

          } else {
            alert('del cart product fail');
          }

        }).catch((err) => {
          console.log('err', err);
          Promise.reject(err);
        })
      },
      changeProductNum(item) {
        let _this = this;
        let params = {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked,
        }
        this.$http.post('/users/cartEdit', params)
          .then((response) => {
            if (response.data.status === '0') {
              _this.getCartList();
              this.$store.dispatch('getCartNumByAPi');
            } else {
              alert('del cart product fail');
            }

          }).catch((err) => {
          console.log('err', err);
          Promise.reject(err);
        })
      },
      // 修改商品数量
      addProductNum(item) {
        item.productNum++;
        this.changeProductNum(item);
      },
      // 修改商品数量
      slimProductNum(item) {
        if (item.productNum === '1') {
          alert('只有一件商品');
          return;
        } else {
          item.productNum--;
          this.changeProductNum(item);
        }
      },
      // 勾选
      editCart(item) {
        if (item.checked === '1') {
          item.checked = '0'
        } else {
          item.checked = '1'
        }
        this.changeProductNum(item);
      },
      // 全选
      editCheckAll() {
        let _this = this;
        let flag = !this.checkAllFlag;

        this.$http.post('/users/editCheckAll', {

          checkAll: flag
        })
          .then((response) => {
            if (response.data.status === '0') {
              _this.getCartList();
            } else {
              alert('checked fail');
            }
          }).catch((err) => {
          console.log('err', err);
          Promise.reject(err);
        })
      },
      toAddess() {
        if (this.checkoutFlag) {
          this.$router.push({path: 'address'})
        } else {
          alert('请选择商品');
          return;
        }
      }
    },
    mounted: function () {
      this.getCartList();
      this.$store.commit('getBreadHtml','CartList');
    },
    computed: {
      checkAllFlag() {
        return this.checkedNum === this.cartList.length;
      },
      checkoutFlag() {
        let s = this.checkedNum > 0 ? true : false;
        return s;
      },
      getTotalPrice() {
        let total = 0;
        let _this = this;
        _this.checkedNum = 0;
        this.cartList.forEach(function (item) {
          if (item.checked === '1') {
            total += item.productNum * item.salePrice;
            _this.checkedNum++;
          }
        })
        return total;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .input-sub, .input-add {
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }

  .item-quantity .select-self-area {
    background: none;
    border: 1px solid #f0f0f0;
  }

  .item-quantity .select-self-area .select-ipt {
    display: inline-block;
    padding: 0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
