<template>
  <div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="price" @click="changePriceSort()">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{cur: currentPrice ==='all'}"
                     @click="changePriceFilterByData('all')">All</a></dd>
              <dd v-for="(item,index) in priceFilter" @click="changePriceFilterByData(index)">
                <a href="javascript:void(0)" :class="{cur: currentPrice===index}">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'../../../static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice | currency('$')}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)"> 加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                加载中...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog :isShow="isShow" @on-close="closeDialog()">
      <div class="addDialog">
        <p>{{dialogText}}</p>
        <a href="javascript:;" class="btn btn--m" @click="closeDialog()">继续购物</a>
        <router-link :to="{'path':'cartList'}" class="btn btn--m btn--red" tag="a" v-if="addCartFlag">查看购物车
        </router-link>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import Dialog from '../base/Dialog.vue'
  import Error from '../base/Error.vue'

  export default {
    components: {
      Dialog,
      Error
    },
    data() {
      return {
        goodsList: [],
        currentPrice: 'all',
        busy: false,
        page: 0,
        count: 0,
        isShow: false,
        priceFilterFlag: true,
        dialogText: '',
        addCartFlag: false,
        priceFilter: [
          {
            startPrice: 0,
            endPrice: 100,
          },
          {
            startPrice: 100,
            endPrice: 500,
          },
          {
            startPrice: 500,
            endPrice: 1000,
          },
          {
            startPrice: 1000,
            endPrice: 2000,
          },
        ]

      }
    },
    methods: {
      getGoodsList() {
        let _this = this;
        let params = {
          page: this.page,
          pageSize: 8,
          sort: this.priceFilterFlag ? 1 : -1,
          priceLevel: this.currentPrice
        };
        this.$http.get('/goods/list', {
          params: params,
        })
          .then(function (res) {
            if (res.data.status === 0) {
              if (_this.page === 1) {
                _this.goodsList = res.data.result.list;
              } else {
                _this.goodsList = _this.goodsList.concat(res.data.result.list);
              }
              _this.busy = false;
              if (res.data.result.count === 0) {
                _this.busy = true;
              }
            }
          })
          .catch(function (err) {
            console.log(err);
            return Promise.reject(err);
          })
      },
      loadMore() {
        this.busy = true;
        let _this = this;
        setTimeout(() => {
          _this.page++;
          _this.getGoodsList();
        }, 1000);
      },
      changePriceSort() {
        this.priceFilterFlag = !this.priceFilterFlag;
        this.page = 1;
        this.getGoodsList();
      },
      changePriceFilterByData(index) {
        this.currentPrice = index;
        this.page = 1;
        this.getGoodsList();
      },
      //加入购物车
      addCart(productId) {
        this.$http.post("/goods/addCart", {
          productId: productId
        }).then((response) => {
          if (response.data.status === '0') {
            this.isShow = true;
            this.addCartFlag = true;
            this.dialogText = '购物车加入成功';
            this.$store.dispatch('getCartNumByAPi');
          } else {
            let arr = {
              mdShow: true,
              errorText: response.data.msg,
            };
            this.$store.commit('getErrorArr', arr);
          }

        }).catch((error) => {
          console.log('add cart', error);
          return Promise.reject(error);
        })
      },
      //关闭弹框
      closeDialog() {
        this.isShow = false;
      }
    },
    mounted: function () {
//      this.getGoodsList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addDialog {
    margin: 60px;
    text-align: center;
  }

  .addDialog .btn {
    width: 30%;
    min-width: 80px;
    margin: 0 2.5%;
  }

</style>
