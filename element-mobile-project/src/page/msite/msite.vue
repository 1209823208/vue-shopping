<template>
  <div>
    <head-top :head-title="msiteTitle" signin-up='msite' style="padding: 20px 10px;">
      <span slot='logo'>
        <i class="fa fa-search"></i>
      </span>
    </head-top>

    <section style="margin-bottom: 60px">
      <nav class="msite_nav">
        <div class="swiper-container" v-if="foodTypes.length">
          <div class="clear">
            <div class="food_types_container" v-for="(item, index) in foodTypes" :key="index">
              <router-link
                :to="{path:'/food',query:{geohash,title:item.title,restaurant_category_id:getCategoryId(item.link)}}"
                :key="item.id" class="link_to_food">
                <figure>
                  <img :src="imgBaseUrl + item.image_url">
                  <figcaption>{{item.title}}</figcaption>
                </figure>
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <div class="shop_list_container">
        <header class="shop_header">
          <span class="shop_header_title">附近商家</span>
        </header>
        <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
      </div>
    </section>

    <footer-list></footer-list>
  </div>
</template>

<script>
  import headTop from '../../components/header/head.vue'
  import shopList from '../../components/common/shopList.vue'
  import footer from '../../components/footer/footer.vue'

  import {mapMutations} from 'vuex'
  import '../../plugins/swiper.min.js'
  import '../../style/swiper.min.css'

  export default {
    data() {
      return {
        geohash: '', //位置的latitude + ',' +.longitude;
        foodTypes: [], //食品分类列表
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
        msiteTitle: '请选择地址...',
        hasGetData: false
      }
    },
    methods: {
      // 自动定位当前位置
      cityGusee() {
        let _this = this;
        let req = this.env.getHeader();
        this.$http.get(this.env._URL('/v1/cities/'), {
          params: {
            type: 'guess'
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.geohash = response.data.latitude + ',' + response.data.longitude;
              // 根据geohash 获取当前位置 名称
              _this.msiteAddress();
              //保存geohash 到vuex
              _this.SAVE_GEOHASH(_this.geohash);
              _this.hasGetData = true;
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
              _this.msiteTitle = response.data.name;
              _this.RECORD_ADDRESS(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 获取nav活动列表
      getFoodTypes() {
        let req = this.env.getHeader();
        let _this = this;
        this.$http.get(this.env._URL('/v2/index_entry/'), {
          params: {
            geohash: this.geohash
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.foodTypes = response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 解码url地址，求去restaurant_category_id值
      getCategoryId(url) {

        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id
        } else {
          return ''
        }
      },
      ...mapMutations([
        'RECORD_ADDRESS', 'SAVE_GEOHASH'
      ])
    },
    beforeMount() {
      if (!this.$route.query.geohash) {
        this.cityGusee();
      } else {
        this.geohash = this.$route.query.geohash;
        this.SAVE_GEOHASH(this.geohash);
        //获取位置信息
        this.msiteAddress();
        this.hasGetData = true;
      }
    },
    mounted() {
      this.getFoodTypes();
    },
    components: {
      headTop,
      'footerList': footer,
      shopList
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .msite_nav {
    padding-top: 70px;
    background-color: #fff;
  }

  .swiper-container {
    padding-bottom: 10px;
  }

  .swiper-pagination {
    bottom: 2px;
  }

  .food_types_container {
    width: 25%;
    float: left;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
  }

  figure > img {
    margin-bottom: 0.3rem;
    width: 18px;
    height: 18px;
  }

  .clear:after {
    content: "";
    height: 0;
    visibility: hidden;
    overflow: hidden;
    display: block;
    clear: both;
  }

  .shop_header_title {
    padding-left: 10px
  }
</style>
