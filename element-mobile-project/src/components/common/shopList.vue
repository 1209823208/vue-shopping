<template>
  <div>
    <ul class="shop-list-ul" v-load-more="loaderMore" v-if="shopListArr.length" type="1">

      <router-link tag="li" :to="{path:'shop',query:{geohash:geohash,id:item.id}}" v-for="item in shopListArr"
                   :key="item.id">
        <div class="clear">
          <section class="shop-left">
            <img class="goods-img" :src="imgBaseUrl+item.image_path">
          </section>
          <section class="shop-right">
            <div class="clear">
              <section class="fl">
                <div class="clear">
                  <span class="fl">品牌</span>
                  <div class="fr" style="font-weight: bold">{{item.name}}</div>
                </div>
              </section>
              <section class="fr" style="font-size: 12px">{{item.icon_name}}</section>
            </div>
            <div class="clear">
              <section class="fl">
                <i class="fa fa-star" style="color: #ff9a0d"></i>
                <i class="fa fa-star" style="color: #ff9a0d"></i>
                <i class="fa fa-star" style="color: #ff9a0d"></i>
                <i class="fa fa-star" style="color: #ff9a0d"></i>
                <i class="fa fa-star" style="color: #ff9a0d"></i>
                <span>{{item.rating}}</span>
                <span>月售{{item.recent_order_num}}单</span>
              </section>
              <section class="fr">
                <span class="delivery_style delivery_left">{{item.delivery_mode.text}}</span>
                <span class="delivery_style delivery_right">准时达</span>
              </section>
            </div>
            <div class="price-style">
              <span>¥{{item.float_minimum_order_amount}}起送/配送费约¥{{item.piecewise_agent_fee.tips}}</span>
              <span>
                <span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}</span>
                <span v-else>{{item.distance}}</span>
                /
                <span style="color: #3190e8">{{item.order_lead_time}}</span>
              </span>
            </div>
          </section>
        </div>
      </router-link>
    </ul>
    <p v-if="touchend" class="empty_data">没有更多了</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {loadMore, getImgPath} from './mixin'
  import {showBack, animate} from '../../config/mUtils'
  import {imgBaseUrl} from '../../config/env'

  export default {
    props: ['geohash', 'restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
    data() {
      return {
        offset: 0,
        limit: 20,
        extras: [],
        keyword: '',
        shopListArr: [],
        touchend: false, //没有更多数据
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        showBackStatus: false, //显示返回顶部按钮
        imgBaseUrl
      }
    },
    mixins: [loadMore, getImgPath],
    computed: {
      ...mapState([
        'latitude',
        'longitude'
      ])
    },
    methods: {
      getShopList(flag = 1) {
        let req = this.env.getHeader();
        let _this = this;
        let supportStr = '';
        if (this.supportIds && this.supportIds.length > 0) {
          this.supportIds.forEach(item => {
            if (item.status) {
              supportStr += '&support_ids[]=' + item.id;
            }
          });
        }
        this.$http.get(this.env._URL('/shopping/restaurants/'), {
          params: {
            latitude: this.latitude,
            longitude: this.longitude,
            offset: this.offset,
            limit: this.limit,
            'extras[]': 'activities',
            keyword: this.keyword,
            restaurant_category_id: '',
            'restaurant_category_ids[]': this.restaurantCategoryIds,
            order_by: this.sortByType,
            'delivery_mode[]': this.deliveryMode + supportStr,
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              if (_this.shopListArr.length == 0) {
                _this.shopListArr = [...response.data];
              } else {
                _this.shopListArr = [_this.shopListArr, ...response.data];
              }
              if (response.data.length < 20) {
                _this.touchend = true;
              }
              // 防止重复加载
              _this.preventRepeatReuqest = false;

              if (flag == 1) {
                //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
                showBack(status => {
                  _this.showBackStatus = status;
                });
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      listenPropChange() {
        this.offset = 0;
        this.shopListArr = [];
        this.getShopList(2);
      },
      loaderMore() {
        if (this.touchend) {
          return
        }
        //防止重复请求
        if (this.preventRepeatReuqest) {
          return
        }
        this.preventRepeatReuqest = true;

        //数据的定位加20位
        this.offset += 20;
        this.getShopList(2);
      },
    },
    mounted() {
      this.getShopList();
    },
    watch: {
      //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
      restaurantCategoryIds: function (value) {
        this.listenPropChange();
      },
      //监听父级传来的排序方式
      sortByType: function (value) {
        this.listenPropChange();
      },
      //监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
      confirmSelect: function (value) {
        this.listenPropChange();
        this.$emit('DidConfrim');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clear:after {
    content: "";
    height: 0;
    visibility: hidden;
    overflow: hidden;
    display: block;
    clear: both;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .shop-list-ul {
    padding: 0px;
  }

  .shop-list-ul > li {
    border: 1px solid #f1f1f1;
    list-style: none;
    box-sizing: border-box;
    padding: 20px 5px;
  }

  .shop-list-ul .shop-left {
    width: 20%;
    float: left;
  }

  .shop-list-ul .shop-right {
    width: 80%;
    float: right;
    box-sizing: border-box;
    padding: 0px 10px;
  }

  .shop-list-ul .goods-img {
    width: 100%;
  }

  .rating_order_num_right {

  }

  .delivery_style {
    font-size: 10px;
    padding: 2px;
    border-radius: 8px;
    margin-left: 8px;
  }

  .delivery_style.delivery_left {
    color: #fff;
    background-color: #3190e8;
    border: 1px solid #3190e8;
  }

  .delivery_style.delivery_right {
    color: #3190e8;
    border: 1px solid #3190e8;
  }

  .price-style {
    font-size: 0.5rem;
    color: #666;
  }
</style>
