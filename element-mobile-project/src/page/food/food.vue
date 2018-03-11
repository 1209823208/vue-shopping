<template>
  <div>
    <head-top :go-back="true" :head-title="headTitle" style="padding: 20px 10px;"></head-top>
    <section style="margin-top: 70px">
      <section>
        <div>
          <div class=" clearfix sort-container">
            <div class="fl bl" @click="changeSort(1)">
              分类
            </div>
            <div class="fl bl" @click="changeSort(2)">
              排序
            </div>
            <div class="fl" @click="changeSort(3)">
              筛选
            </div>
            <!--分类 排序 筛选弹框-->
            <section class="sort-container-dio">
              <section class="category-content clearfix no" :class="{show:currentSortIndex==1}">
                <div class="fl">
                  <div class="sort-category" v-for="(item,index) in category"
                       :class="{active:index==currentCategoryIndex}">
                    <div @click="changeCategory(index)">
                      {{item.name}}-{{index}}
                    </div>
                    <!--<div v-else>{{item.name}}:{{index}}</div>-->
                  </div>
                </div>
                <div class="fl category-content-right">
                  <section class="no" v-for="(categoryItem,categoryIndex) in categoryDetail"
                           :class="{show:categoryIndex==currentCategoryIndex}">
                    <div class="clearfix left-content" v-for="dateilItem in categoryItem"
                         @click="changeCategoryItem(dateilItem.id)">
                      <div class="fl">{{dateilItem.name}}</div>
                      <div class="fr">{{dateilItem.count}}</div>
                    </div>
                  </section>
                </div>
              </section>
              <section class="order-by-content no" :class="{show:currentSortIndex==2}">
                <div class="order-by-detail" v-for="(orderByItem,index) in orderByList"
                     @click="changeOrder(orderByItem.no)">
                  <label>{{orderByItem.desc}}</label>
                </div>
              </section>
              <section class="filter-content no" :class="{show:currentSortIndex==3}">
                <div>
                  <section>
                    <h4>配送方式</h4>
                    <div class="clearfix">
                      <div class="shopAttr" v-for="(item,index) in delivery" :class="{active:delivery_mode==item.id}"
                           @click="selectShopAttr(item.id)">
                        {{item.text}}
                      </div>
                    </div>
                  </section>
                  <section>
                    <h4>商家属性(多选)</h4>
                    <div class="clearfix">
                      <div class="shopAttr" v-for="(item,index) in activity" :class="{active:item.status}"
                           @click="selectSupportIds(item,index)">
                        {{item.name}}
                      </div>
                    </div>
                    <div>
                      <button @click="cancelSelectFilter()">取消</button>
                      <button @click="confirmFun()">确定({{support_ids}})</button>
                    </div>
                  </section>
                </div>
              </section>
            </section>
          </div>

        </div>
      </section>
      <!--列表-->
      <shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id"
                 :restaurantCategoryIds="restaurant_category_ids" :sortByType="sortByType"
                 :deliveryMode="delivery_mode" :supportIds="support_status_ids" v-if="latitude"
                 @DidConfrim="clearAll" :confirmSelect="confirmStatus"></shop-list>
    </section>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import headTop from '../../components/header/head.vue'
  import shopList from '../../components/common/shopList.vue'

  export default {
    data() {
      return {
        category: [],
        categoryDetail: [],
        currentCategoryIndex: 1,
        geohash: '',
        headTitle: '',
        footTitle: '',
        restaurant_category_id: '',
        delivery: [],//配送地址
        activity: [], //活动
        support_ids: 0,  //记录筛选个数
        support_status_ids: [],  //
        delivery_mode: '',// 选中配送方式id
        currentSortIndex: '',
        restaurant_category_ids: '', // 分类
        sortByType: '',
        confirmStatus: false, // 确认选择
        orderByList: [// 排序
          {
            no: 0,
            desc: '智能排序',
          },
          {
            no: 5,
            desc: '距离最近',
          },
          {
            no: 6,
            desc: '销量最高',
          },
          {
            no: 1,
            desc: '起送价最低',
          },
          {
            no: 2,
            desc: '配送速度最快',
          },
          {
            no: 3,
            desc: '评分最高',
          }
        ],
      }
    },
    components: {
      headTop,
      shopList
    },
    computed: {
      ...mapState([
        'latitude',
        'longitude'
      ])
    },
    created() {
      this.initData();
    },
    mounted() {
      //获取分类
      this.getRestaurantCategory();
      //配送地址
      this.getDelivery();
      //活动
      this.getActive();
    },
    methods: {
      initData() {
        this.geohash = this.$route.query.geohash;
        this.headTitle = this.$route.query.title;
        this.foodTitle = this.headTitle;
        this.restaurant_category_id = this.$route.query.restaurant_category_id;

        // 防止刷新页面时，vuex状态丢失，经纬度需要重新获取，并存入vuex
        if (!this.latitude) {
          this.msiteAddress();
        }
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
      ...mapMutations([
        'RECORD_ADDRESS'
      ]),
      //获取分类
      getRestaurantCategory() {
        let _this = this;
        _this.category = [];
        _this.categoryDetail = [];
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/shopping/v2/restaurant/category/'), {
          params: {
            latitude: this.latitude,
            longitude: this.longitude
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              response.data.forEach(item => {
                _this.category.push({
                  count: item.count,
                  id: item.id,
                  ids: item.ids,
                  image_url: item.image_url,
                  level: item.level,
                  name: item.name
                })
                _this.categoryDetail.push(item.sub_categories)
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //获取配送地址
      getDelivery() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/shopping/v1/restaurants/delivery_modes/'), {
          params: {
            latitude: this.latitude,
            longitude: this.longitude,
            kw: ''
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.delivery = response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //获取店铺活动
      getActive() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/shopping/v1/restaurants/activity_attributes/'), {
          params: {
            latitude: this.latitude,
            longitude: this.longitude,
            kw: ''
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.activity = [];

              response.data.forEach(item => {
                Object.assign(item, {
                  status: false
                })
                _this.activity.push(item);
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //筛选分类
      changeCategory(index) {
        this.currentCategoryIndex = index;
        if (index == 0) {
          this.restaurant_category_ids = null;
          this.currentSortIndex = '';
        }
      },
      changeCategoryItem(id) {
        this.restaurant_category_ids = id;
        this.currentSortIndex = '';
      },
      // 改变排序
      changeOrder(id) {
        this.sortByType = id;
        this.currentSortIndex = '';
      },
      // 点击商家属性
      selectSupportIds(item, index) {
        this.activity[index].status = !this.activity[index].status;
        let support_id = this.delivery_mode == null || this.delivery_mode == '' ? 0 : 1;
        this.activity.forEach(item => {
          if (item.status) {
            support_id++;
          }
        })
        this.support_ids = support_id;

      },
      // 点击配送方式
      selectShopAttr(index_id) {
        if (this.delivery_mode === index_id) {
          this.delivery_mode = '';
          this.support_ids--;
        } else {
          this.delivery_mode = index_id;
          this.support_ids++;
        }
      },
      // 点击取消
      cancelSelectFilter() {
        this.delivery_mode = '';
        this.activity.forEach(item => {
          item.status = false;
        })
        this.support_ids = 0;
        this.support_status_ids = [];
      },
      // 当前是分类 排序 筛选
      changeSort(id) {
        if (this.currentSortIndex == id) {
          this.currentSortIndex = '';
        } else {
          this.currentSortIndex = id;
        }
      },
      confirmFun() {
        //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
        this.support_status_ids = [];
        this.confirmStatus = !this.confirmStatus;
        this.activity.forEach(item => {
          this.support_status_ids.push({
            id: item.id,
            status: item.status
          })
        })
        this.currentSortIndex = '';
      },
      //点击取消或者确认时，需要清空当前已选的状态值
      clearAll() {
        this.delivery_mode = null;
        this.activity.map(item => item.status = false);
        this.filterNum = 0;
        this.support_status_ids = [];
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sort-container > div {
    width: 33.3%;
    text-align: center;
  }

  .sort-container > div.bl {
    border-right: 1px solid #e4e4e4;
  }

  .sort-container {
    position: relative;
  }

  .sort-container .sort-container-dio {
    border: 1px solid;
    top: 20px;
    position: absolute;
    width: 100%;
    background-color: #ffffff;
  }

  /*分类 */
  .category-content > div {
    width: 50%;
  }

  .category-content .sort-category {
    background-color: #F1F0F0;
    padding: 10px 5px;
  }

  .category-content .sort-category.active {
    background-color: #ffffff;
  }

  .category-content-right {
    margin-top: 10px;
  }

  .category-content-right .left-content {
    border-bottom: 1px solid #e4e4e4;
    padding: 10px 5px;
  }

  /*排序*/
  .order-by-content {

  }

  .order-by-content .order-by-detail {
    margin-left: 10px;
    border-bottom: 1px solid #e4e4e4;
    padding: 10px;
  }

  .order-by-content .order-by-detail > label {
    margin-left: 10px;
  }

  /*筛选*/
  .filter-content .shopAttr {
    width: 30%;
    float: left;
    text-align: center;
    margin: 5px;
    border: 1px solid #e4e4e4;
  }

  .filter-content .shopAttr.active {
    background-color: #007aff;
  }
</style>
