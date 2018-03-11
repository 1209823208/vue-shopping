<template>
  <div class="city_container">
    <head-top signin-up='true' style="padding: 20px 10px;">
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
    <section style="margin-bottom: 60px">
      <form class="city_form" v-on:submit.prevent>
        <div>
          <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style"
                 v-model="inputValue">
        </div>
        <div>
          <input type="submit" name="submit" class="city_submit input_style" @click="postpois" value="提交">
        </div>
      </form>
      <header v-if="historytitle" class="pois_search_history">搜索历史</header>
      <ul class="getpois_ul">
        <li v-for="(item,index) in placelist" @click="nextpage(index,item.geohash)" :key="index">
          <h4 class="pois_name ellipsis">{{item.name}}</h4>
          <p class="pois_address ellipsis">{{item.address}}</p>
        </li>
      </ul>
      <footer class="clear_all_history" @click="clearAll" v-if="historytitle && placelist.length">清空所有</footer>
      <div class="search_none_place" v-if="placeNone">无搜索结果</div>
    </section>
  </div>
</template>

<script>
  import headTop from '../../components/header/head.vue'

  export default {
    data() {
      return {
        cityId: '',
        cityname: '安阳',
        inputValue: '',
        historytitle: true,
        placelist: [],
        placeNone: false, // 搜索无结果，显示提示信息
        placeHistory: [], //历史搜索记录
      }
    },
    components: {
      headTop
    },
    methods: {
      postpois() {
        if (this.inputValue) {
          let req = this.env.getHeader();
          let _this = this;
          this.$http.get(this.env._URL('/v1/pois/'), {
            params: {
              type: 'search',
              city_id: this.cityId,
              keyword: this.inputValue
            },
            req
          })
            .then(function (response) {
              if (response.status === 200) {
                _this.placelist = response.data;
                _this.historytitle = false;
                _this.placeNone = response.data ? false : true;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }

      },
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复存储，判断完成后进入下一页
       */
      nextpage(index, geohash) {
        let choosePlace = this.placelist[index];
        let history = window.localStorage.getItem('placeHistory');
        if (history) {
          let checkrepeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(item => {
            if (item.geohash == geohash) {
              checkrepeat = true;
            }
          })
          if (!checkrepeat) {
            this.placeHistory.push(choosePlace)
          }
        } else {
          this.placeHistory.push(choosePlace);
        }
        window.localStorage.setItem('placeHistory', JSON.stringify(this.placeHistory));
        this.$router.push({path: '/msite', query: {geohash}})
      },
      clearAll() {
        this.placelist = [];
        window.localStorage.removeItem('placeHistory');
      },
      getCurrentCity() {
        let req = this.env.getHeader();
        let _this = this;
        this.$http.get(this.env._URL('/v1/cities/' + this.cityId), {
          params: {
            t: new Date().getTime().toString()
          },
          req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.cityname = response.data.name;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.initData();
      },
      initData() {
        // 获取搜索历史记录
        let placeHistory = window.localStorage.getItem('placeHistory');
        if (placeHistory) {
          this.placelist = JSON.parse(placeHistory);
        } else {
          this.placelist = [];
          this.historytitle = false;
        }
      }
    },
    mounted() {
      this.cityId = this.$route.params.cityid;
      // 获取当前城市名字
      this.getCurrentCity();

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .change_city {
    color: #ffffff
  }

  .city_form {
    margin-top: 80px;
  }

  .city_form > div {
    margin: auto;
    text-align: center;
  }

  .input_style {
    border-radius: 0.1rem;
    margin-bottom: 0.4rem;
    width: 80%;
    height: 40px;
  }

  .city_form div .city_input {
    border: 1px solid #e4e4e4;
    padding: 0 0.3rem;
    font-size: 14px;
    color: #333;
  }

  .city_form div .city_submit {
    background-color: #3190e8;
    font-size: 14px;
    color: #fff;
  }

  .pois_search_history {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding: 10px;
  }

  .getpois_ul {
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
  }

  .getpois_ul li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid #e4e4e4;
  }

  .getpois_ul li .pois_name {
    margin: 0 auto 0.35rem;
    width: 90%;
    font-size: 0.65rem;
    color: #333;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .getpois_ul {
    padding: 0px;
  }

  .getpois_ul li .pois_address {
    width: 90%;
    margin: 0 auto 0.55rem;
    font-size: 0.45rem;
    color: #999;
  }
</style>
