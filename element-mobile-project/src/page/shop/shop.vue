<template>
  <div>
    <section v-if="!showLoading">
      <head-top :go-back="true" :head-title="shopDetailData.name">
        <div slot='centerContent' class="centerContent">
          <p>商家配送／{{shopDetailData.order_lead_time}}分钟／配送费¥{{deliveryFee}}</p>
          <p>公告：{{promotionInfo}}</p>
          <section class="clearfix" v-if="shopDetailData.activities.length">
            <p class="fl">
            <span
              :style="{backgroundColor:'#'+shopDetailData.activities[0].icon_color,borderCOlor:'#'+shopDetailData.activities[0].icon_color}">
              {{shopDetailData.activities[0].icon_name}}
            </span>
              <span>{{shopDetailData.activities[0].description}}(App专享)</span>
            </p>
            <p class="fr">{{shopDetailData.activities.length}}个活动</p>
          </section>
        </div>
      </head-top>
      <section class="firstContent">
        <div class="clearfix">
          <div class="fl firstContentDetail" @click="changeFun('food')">商品</div>
          <div class="fl firstContentDetail" @click="changeFun('rating')">评价</div>
        </div>
      </section>
      <section class="seconedContend">
        <!--商品-->
        <div v-show="changeShowType =='food'" class="clearfix">
          <!--左边导航-->
          <section class="fl seconedContendLeft" id="wrapper_menu" ref="wrapperMenu">
            <div class="">
              <div class="seconedContendLeftDetail" v-for="(item,index) in shopCategory"
                   :class="{active:index==menuIndex}" @click="chooseMenu(index)">
                <img src="" alt="">
                <span>{{item.name}}</span>
                <span>89</span>
              </div>
            </div>
          </section>
          <!-- 右边导航-->
          <section class="fl seconedContendRight" ref="menuFoodList">
            <div class="" v-for="(categoryItem,index) in shopCategory">
              <header>
                <strong>{{categoryItem.name}}</strong>
                <span>{{categoryItem.description}}</span>
              </header>
              <section v-for="(goodItem,goodIndex) in categoryItem.foods">
                <section style="border-bottom: 1px solid #ebebeb;">
                  <router-link :to="{}">
                    <section class="clearfix">
                      <section v-if="goodItem.image_path" class="fl goodsImg">
                        <img :src="imgBaseUrl+goodItem.image_path" alt="">
                      </section>
                      <section class="fl goodsDetail">
                        <strong style="color: #333;font-size: 16px">{{goodItem.name}}</strong>
                        <!--食品描述-->
                        <p style="color: #999; font-size: 12px">{{goodItem.description}}</p>
                        <p style="color: #333; font-size: 12px">
                          <span>月售{{goodItem.month_sales}}份</span>
                          <span>好评率{{goodItem.rating}}%</span>
                        </p>
                        <!--活动-->
                        <p class="goodActivity" v-if="goodItem.activity"
                           :style="{color:'#'+goodItem.activity.image_text_color,borderColor:'#'+goodItem.activity.icon_color}">
                          {{goodItem.activity.image_text}}</p>
                        <section style="color:#333" class="clearfix">
                          <div class="fl">
                            <span>¥</span>
                            <span style="color: #f60;font-weight: bold;">{{goodItem.specfoods[0].price}}</span>
                            <span>起</span>
                          </div>
                          <div class="fr">
                            <buy-cart :shopId='shop_id' :foods='goodItem' @moveInCart="listenInCart"
                                      @showChooseList="showChooseList" @showReduceTip="showReduceTip"
                                      @showMoveDot="showMoveDotFun"></buy-cart>
                          </div>
                        </section>
                      </section>
                    </section>
                  </router-link>
                </section>
              </section>
            </div>
          </section>
        </div>
        <!--评价-->
        <div v-show="changeShowType =='rating'">
          <div class="clearfix">
            <div class="fl">
              <h4>{{shopDetailData.rating}}</h4>
              <h5>综合评价</h5>
              <p>高于周边商家
                <span v-if="ratingScoresData.compare_rating && ratingScoresData.compare_rating>0">
                  {{(ratingScoresData.compare_rating*100).toFixed(1)}}
                </span>
                <span v-else>0</span>
                %</p>
            </div>
            <div class="fl">
              <div>服务态度
                <span v-if="ratingScoresData.service_score&&ratingScoresData.service_score>0">
                  {{ratingScoresData.service_score.toFixed(1)}}
                </span>
                <span v-else>0</span>
              </div>
              <div>菜单评价
                <span v-if="ratingScoresData.food_score && ratingScoresData.food_score>0">
                {{ratingScoresData.food_score.toFixed(1)}}</span>
                <span v-else>0</span>
              </div>
              <div>送达时间{{shopDetailData.order_lead_time}}分钟</div>
            </div>
          </div>
          <div class="clearfix">
            <div class="fl rating_container_detail" v-for="(item,index) in ratingTagsList" :key="index"
                 :class="{active:ratingTagsIndex==index}" @click="changeTgeIndex(index, item.name)">
              {{item.name}}({{item.count}})
            </div>
          </div>
          <!--评价列表-->
          <div class="rating_list">
            <div class="clearfix rating_list_item" v-for="(item,index) in ratingList">
              <div class="fl">
                <img class="ratingImg" :src="getImgPath(item.avatar)" alt="" v-if="item.avatar">
              </div>
              <div class="fl">
                <p>{{item.username}}</p>
                <div>
                  <span>{{item.time_spent_desc}}</span>
                </div>
                <div>
                  <div v-for="(imgItem, imgIndex) in item.item_ratings" :key="imgIndex">
                    <img class="ratingImg" :src="getImgPath(imgItem.image_hash)" v-if="imgItem.image_hash">
                  </div>
                </div>
                <div>
                  <span class="food_name_item" v-for="(itemLag, lagIndex) in item.item_ratings" :key="lagIndex">
                      {{itemLag.food_name}}
                  </span>
                </div>
              </div>
              <div class="fl">
                {{item.rated_at}}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--购物车列表-->
      <section class="cartListContent" v-if="showCartFlag && cartFoodList.length>0">
        <div class="clearfix">
          <div class="fl">购物车</div>
          <button class="fr"><i class="fa fa-trash-o fa-fw"></i>
            清空
          </button>
        </div>
        <div class="clearfix" v-for="(cartItem,cartindex) in cartFoodList">
          <h5 class="fl" style="width: 30%">{{cartItem.name}}</h5>
          <span class="fl" style="width: 30%">¥{{cartItem.price}}</span>
          <div class="fl" style="width: 30%">
            <span @click="removeOutCart(cartItem)"><i class="fa fa-minus-circle icon_class"
                                                      aria-hidden="true"></i></span>
            <span class="cart_num">{{cartItem.num}}</span>
            <span @click="addToCart(cartItem)"><i class="fa fa-plus-circle icon_class"></i></span>
          </div>
        </div>
      </section>
      <!--购物车-->
      <section class="cart-content">
        <div class="clearfix">
          <div class="fl cart-detail" style="background-color: #3D3D3F;" @click="toggleDislpayCart()">
            <i class="fa fa-cart-plus" aria-hidden="true"></i>
            <span>¥{{totalPrice}}</span>
            <span>配送费¥{{deliveryFee}}</span>
            <span>num:{{totalNum}}</span>
          </div>
          <div v-if="minimunOrderAmount>0" class="fl cart-detail" style="background-color: #5DAA5A;">
            还差¥{{minimunOrderAmount}}起送
          </div>

          <div v-else class="fl cart-detail" style="background-color: #5DAA5A;">结算</div>
        </div>
      </section>
      <!--规格详情-->
      <section v-if="cartDetailDisplay">
        <div class="specs_cover" @click="cartDetailDisplay = false"></div>
        <div class="specs_list">
          <p style="text-align: center">{{chooseFoods.name}}</p>
          <p>{{chooseFoods.specifications[0].name}}</p>
          <div class="clearfix">
            <div class="fl specs_list_detail" :class="{active:specsIndex===chooseIndex}"
                 v-for="(choooseItem,chooseIndex) in chooseFoods.specifications[0].values"
                 @click="changeChooseIndex(chooseIndex)">
              {{choooseItem}}
            </div>
          </div>
          <div style="margin-top: 20px">
            <span> ¥{{chooseFoods.specfoods[specsIndex].price}}</span>
            <button class="cartBtn" @click="addSpecs()">加入购物车</button>
          </div>
        </div>
      </section>
      <p class="show_delete_tip" v-if="showDeleteTip">多规格商品只能去购物车删除哦</p>
    </section>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import headTop from '../../components/header/head.vue'
  import buyCart from '../../components/common/buyCart.vue'
  import {imgBaseUrl} from '../../config/env'
  import {getImgPath} from '../../components/common/mixin'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        imgBaseUrl,
        geohash: '',
        shop_id: '',
        headTitle: '效果演示',
        restaurant_id: '',//当前店铺
        shopCategory: [],// 左侧分类
        shopDetailData: null, //商铺详情
        ratingOffset: 0,
        ratingList: [],  //评论信息
        ratingScoresData: [],//商品评论详情
        ratingTagsList: [],  //评论tag列表
        totalPrice: 0, //总共价格
        showLoading: true, //显示加载动画
        shopListTop: [], //商品列表的高度集合
        foodScroll: null,  //食品列表scroll
        menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
        menuIndex: 0, //已选菜单索引值，默认为0
        cartDetailDisplay: false,
        chooseFoods: [],   //当前选中的
        specsIndex: 0,// 当前选中规格
        showDeleteTip: false,  //多规格删除提示
        cartFoodList: [], //购物车商品列表
        showCartFlag: false,//是否展示购物车
        categoryNum: [], //商品类型右上角已加入购物车的数量
        changeShowType: 'food',   // 商家 评论切换
        ratingTagsIndex: 0,
        ratingTagName: ''

      }
    },
    components: {
      headTop,
      buyCart
    },
    created() {
      this.geohash = this.$route.query.geohash;
      this.shop_id = this.$route.query.id;
      // 获取本地缓存的购物车数据
      this.INIT_BUYCART();
      // 防止刷新页面时，vuex状态丢失，经纬度需要重新获取，并存入vuex
      if (!this.latitude) {
        this.msiteAddress();
      }
    },
    beforeMount() {
      this.initData();
    },
    mounted() {
    },
    mixins: [getImgPath],
    computed: {
      ...mapState(['latitude', 'longitude', 'cartList'
      ]),
      promotionInfo: function () {
        return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
      },
      //配送费
      deliveryFee: function () {
        if (this.shopDetailData) {
          return this.shopDetailData.float_delivery_fee;
        } else {
          return null;
        }
      },
      // 还差多少元起送 为负数显示去结算
      minimunOrderAmount: function () {
        if (this.shopDetailData) {
          return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
        } else {
          return null;
        }
      },
      // 当前购物车信息
      shopCart: function () {
        return {...this.cartList[this.shop_id]};
      },
      // 购物车共商品的数量
      totalNum: function () {
        let num = 0;
        this.cartFoodList.forEach(item => {
          num += item.num
        })
        return num;
      }
    },
    watch: {
      showLoading: function (value) {
        if (!value) {
          // showLoading数据变化时 说明组件已经获取初始化数据，在下次 DOM 更新循环之后执行
          this.$nextTick(() => {
            this.getFoodListHeight();

            // 在进入该页面 获取到数据后  执行   初始购物车列表组合信息
            this.initCategoryNum();
          })
        }
      },
      shopCart: function () {
        // 当购物车数据cartList变化时 再次获取 购物车列表组合信息
        this.initCategoryNum();
      }
    },
    methods: {
      ...mapMutations([
        'INIT_BUYCART', 'RECORD_SHOPDETAIL', 'RECORD_ADDRESS', 'ADD_CART', 'REDUCE_CART'
      ]),
      initData() {
        // 获取商铺信息
        this.getShopDetailData();
        // 获取店铺信息
        this.getFoodList();
        // 获取评论详情
        this.getRatingList();
        // 商品评论详情
        this.getRatingScoresData();
        //评论Tag列表
        this.getRatingTagsList();
      },
      // 获取商铺信息
      getShopDetailData() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/shopping/restaurant/' + this.shop_id), {
          params: {
            latitude: this.latitude,
            longitude: this.longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.shopDetailData = response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 获取类别下的商品信息
      getFoodList() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/shopping/v2/menu/'), {
          params: {
            restaurant_id: this.shop_id
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              response.data.forEach(item => {
                _this.shopCategory = [...response.data];
              })
              _this.showLoading = false;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 获取评论详情
      getRatingList() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/ugc/v2/restaurants/' + this.shop_id + '/ratings'), {
          params: {
            has_content: true,
            offset: this.ratingOffset,
            limit: 10,
            tag_name: this.ratingTagName
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.ratingList = [...response.data];
              console.log('_this.ratingList', _this.ratingList);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 商品评论详情
      getRatingScoresData() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/ugc/v2/restaurants/' + this.shop_id + '/ratings/scores'), {
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.ratingScoresData = response.data;
              console.log('_this.ratingScoresData', _this.ratingScoresData);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //评论Tag列表
      getRatingTagsList() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/ugc/v2/restaurants/' + this.shop_id + '/ratings/tags'), {
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.ratingTagsList = response.data;
              console.log('_this.ratingTagsList', _this.ratingTagsList);
              _this.RECORD_SHOPDETAIL(_this.ratingTagsList);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 获取当前位置 名称
      msiteAddress() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/v2/pois/' + this.geohash), {
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.RECORD_ADDRESS(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 获取食品列表的高度，存入shopListTop
      getFoodListHeight() {
        const listContainer = this.$refs.menuFoodList;  // 获取Dom节点
        if (listContainer && listContainer.children) {
          const listArr = Array.from(listContainer.children);
          listArr.forEach((item, index) => {
            this.shopListTop[index] = item.offsetTop;
          })
          this.lisenScroll(listContainer);
        }

      },
      lisenScroll(element) {
        this.foodScroll = new BScroll(element, {
          probeType: 3,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 2000,
          click: true,
        });

        const wrapperMenu = new BScroll('#wrapper_menu', {
          click: true,
        });

        const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
        this.foodScroll.on('scroll', (pos) => {
          if (!this.$refs.wrapperMenu) {
            return
          }
          this.shopListTop.forEach((item, index) => {
            if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
              this.menuIndex = index;
              const menuList = this.$refs.wrapperMenu.querySelectorAll('.active');
              const el = menuList[0];
              wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight / 2 - 50));
            }
          })
        })
      },
      chooseMenu(index) {
        this.menuIndex = index;
        //menuIndexChange解决运动时listenScroll依然监听的bug
        this.menuIndexChange = false;
        this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
        this.foodScroll.on('scrollEnd', () => {
          this.menuIndexChange = true;
        })
      },
      //* 初始化和shopCart变化时，重新获取购物车改变过的数据，
      // 赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，
      // 所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
      initCategoryNum() {
        let newArr = [];
        this.cartFoodList = {};
        this.totalPrice = 0;
        this.cartFoodList = [];
        this.shopCategory.forEach((item, index) => {
          if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
            let num = 0;
            let category_list = this.shopCart[item.foods[0].category_id];
            Object.keys(category_list).forEach(item_id => {
              let category_item = category_list[item_id];
              Object.keys(category_item).forEach(foodId => {
                let foodItem = category_item[foodId];
                num += foodItem.num;
                if (item.type == 1) {
                  this.totalPrice += foodItem.num * foodItem.price;
                  if (foodItem.num > 0) {
                    let obj = {
                      category_id: item.foods[0].category_id,
                      item_id: item_id,
                      food_id: foodId,
                      num: foodItem.num,
                      price: foodItem.price,
                      name: foodItem.name,
                      specs: foodItem.specs,
                    }
                    this.cartFoodList.push(obj);
                  }
                }
              })
            })
            newArr[index] = num;
          } else {
            newArr[index] = 0;
          }
        })
        this.totalPrice = this.totalPrice.toFixed(2);
        this.categoryNum = [...newArr];
      },
      // 购物车
      listenInCart() {

      },
      //显示规格列表
      showChooseList(foods) {
        if (foods) {
          this.chooseFoods = foods;
        }
        this.cartDetailDisplay = !this.cartDetailDisplay;
        this.specsIndex = 0;

      },
      //改变当前规格
      changeChooseIndex(index) {
        this.specsIndex = index;
      },
      //多规格商品加入购物车
      addSpecs() {
        let obj = {
          shopid: this.shop_id,
          category_id: this.chooseFoods.category_id,
          item_id: this.chooseFoods.item_id,
          food_id: this.chooseFoods.specfoods[this.specsIndex].food_id,
          name: this.chooseFoods.specfoods[this.specsIndex].name,
          price: this.chooseFoods.specfoods[this.specsIndex].price,
          specs: this.chooseFoods.specifications[0].values[this.specsIndex],
          packing_fee: this.chooseFoods.specfoods[this.specsIndex].packing_fee,
          sku_id: this.chooseFoods.specfoods[this.specsIndex].sku_id,
          stock: this.chooseFoods.specfoods[this.specsIndex].stock,
        };
        this.ADD_CART(obj);
        this.showChooseList();
      },
      showReduceTip() {
        this.showDeleteTip = true;
        setTimeout(() => {
          this.showDeleteTip = false;
        }, 3000)
      },
      //切换购物车显示
      toggleDislpayCart() {
        this.showCartFlag = !this.showCartFlag;
      },
      showMoveDotFun() {

      },
      // 减少购物车数量
      removeOutCart(foodItem) {
        let obj = {
          shopid: this.shop_id,
          category_id: foodItem.category_id,
          item_id: foodItem.item_id,
          food_id: foodItem.food_id,
          name: foodItem.name,
          price: foodItem.price,
          specs: foodItem.specs,
        };
        this.REDUCE_CART(obj);
      },
      // 增加购物车数量
      addToCart(foodItem) {
        let obj = {
          shopid: this.shop_id,
          category_id: foodItem.category_id,
          item_id: foodItem.item_id,
          food_id: foodItem.food_id,
          name: foodItem.name,
          price: foodItem.price,
          specs: foodItem.specs,
        };
        this.ADD_CART(obj);
      },
      changeTgeIndex(index, name) {
        this.ratingTagsIndex = index;
        this.ratingOffset = 0;
        this.ratingTagName = name;
        this.getRatingList();
      },
      changeFun(type) {
        this.changeShowType = type;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .centerContent {
    font-size: 12px;
    padding: 0px;
    margin: 0px;
  }

  .centerContent p {
    margin: 0px;
  }

  .firstContent {
    position: fixed;
    top: 70px;
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    z-index: 100;
  }

  .firstContentDetail {
    width: 50%;
    text-align: center;
  }

  .seconedContend {
    margin-top: 110px;
    margin-bottom: 100px;
  }

  .seconedContendLeft {
    width: 20%;
  }

  .seconedContendLeftDetail {
    background-color: #F5F4F4;
    padding: 20px 5px;
    border: 1px solid #ededed;
  }

  .seconedContendLeftDetail.active {
    background-color: #ffffff;
  }

  .seconedContendRight {
    width: 80%;
  }

  .goodsImg {
    width: 15%;
    margin: 5% 2%;
  }

  .goodsImg img {
    width: 100%;
  }

  .goodsDetail {
    width: 80%;
  }

  .goodActivity {
    border-width: 1px;
  }

  .cart-content {
    position: fixed;
    bottom: 0px;
    left: 0;
    z-index: 200;
    width: 100%;
    background-color: #ffff;
    color: #ffffff;
  }

  .cart-content .cart-detail {
    width: 50%;
    padding: 20px 0px;
    text-align: center;
    box-sizing: border-box;
  }

  .cartListContent {
    background: #fff;
    bottom: 60px;
    width: 100%;
    z-index: 1000;
    left: 0;
    right: 0;
    position: fixed;
  }

  .specs_cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999;
  }

  .specs_list {
    position: fixed;
    top: 35%;
    left: 5%;
    width: 70%;
    background-color: #fff;
    z-index: 100000;
    border: 1px;
    border-radius: 1px;
    min-height: 200px;
  }

  .specs_list_detail {
    padding: 5px;
    border: 1px solid #ddd;
    margin-right: 5px;
    margin-bottom: 2px;
  }

  .specs_list_detail.active {
    border-color: #3199e8;
    color: #3199e8;
  }

  .cartBtn {
    width: 50px;
    height: 20px;
    background-color: #3199e8;
    border: 1px;
    border-radius: 1px;
    color: #fff;
    text-align: center;
  }

  .show_delete_tip {
    position: fixed;
    top: 50%;
    left: 15%;
    width: 70%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 18;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    border: 1px;
    border-radius: 1px;
  }

  .rating_container_detail {
    color: #6d7885;
    padding: 3px;
    background-color: #ebf5ff;
    border-radius: 1px;
    border: 1px;
    margin: 4px 2px 0;
  }

  .rating_container_detail.active {
    background-color: #3190e8;
    color: #fff;
  }

  .rating_list_item {
    border-top: 1px solid #f1f1f1
  }

  .food_name_item {
    color: #999;
    width: 50px;
    padding: 2px;
    border: 1px solid #ebebeb;
    border-radius: 1px;
    margin-right: 3px;
    margin-bottom: 4px;
  }

  .ratingImg {
    width: 20px;
    height: 20px;
  }

</style>
