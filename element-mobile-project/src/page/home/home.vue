<template>
  <div>
    <head-top signin-up='home' style="padding: 20px 10px;">
      <span slot='logo' class="head-logo" @click="reload">ele.me</span>
    </head-top>
    <section style="margin-bottom: 60px">
      <nav class="city-nav">
        <div class="city-tip">
          <span class="city-title">当前定位城市：</span>
          <span class="city-desc">定位不准时，请在城市列表中选择</span>
        </div>
        <router-link tag="div" :to="'/city/' + guessCityid" class="guess_city">
          <span>{{guessCity}}</span>
          <i class="fa fa-angle-right"></i>
        </router-link>
      </nav>
      <section id="hot_city_container" class="clear">
        <h4 class="city_title">热门城市</h4>
        <ul class="citylistul clear">
          <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
            {{item.name}}
          </router-link>
        </ul>
      </section>
      <section class="group_city_container">
        <ul class="group-ui">
          <li v-for="(value,key,index) in sortGroupCity" :key="key">
            <h4 class="city_title">{{key}}-{{index}}
              <span v-if="index == 0">（按字母排序）</span>
            </h4>
            <ul class="groupcity_name_container citylistul clear">
              <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                {{item.name}}
              </router-link>
            </ul>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
  import headTop from '../../components/header/head.vue'

  export default {
    data() {
      return {
        guessCity: '',   //当前城市
        guessCityid: '', //当前城市id
        hotcity: [],      //热门城市列表
        groupcity: [],     //所有城市列表
      }
    },
    components: {
      headTop
    },
    methods: {
      //点击图标刷新页面
      reload(){
        window.location.reload();
      },
      // 当前城市
      // 获取热门城市
      // 获取所有城市
      getHotCity(type) {
        let req = this.env.getHeader();
        let _this = this;
        this.$http.get(this.env._URL('/v1/cities/'), {
          params: {
            type: type,
            t: new Date().getTime().toString()
          }, req
        })
          .then(function (response) {
            if (response.status === 200) {
              if (type === 'hot') {
                _this.hotcity = response.data;
              } else if (type === 'group') {
                _this.groupcity = response.data;
              } else if (type === 'guess') {
                _this.guessCity = response.data.name;
                _this.guessCityid = response.data.id;
              }

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
    computed: {
      //  将获取的数据按照A-Z排序
      sortGroupCity() {
        let sortObj = {};
        for (let i = 65; i <= 90; i++) {
          if (this.groupcity[String.fromCharCode(i)]) {
            sortObj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
          }
        }
        return sortObj;
      }
    },
    mounted() {
      //获取当前城市
      this.getHotCity('guess');
      //获取热门城市
      this.getHotCity('hot');
      //获取所有城市
      this.getHotCity('group');
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .city-nav{
    padding-top: 80px;

    background-color: #fff;
    margin-bottom: 0.4rem;
  }
  .city-tip{
    border-bottom: 1px solid #e4e4e4;
    padding: 10px 10px;
  }
  .city-tip .city-title{
    font-size: 14px;
    color: #666;
  }
  .city-tip .city-desc{
    font-weight: 900;
    font-size: 0.4rem;
    color: #9f9f9f;
  }
  .guess_city{
    border-bottom: 1px solid #e4e4e4;
    padding: 10px 10px;
    position: relative;
  }
  .guess_city i{
    position: absolute;
    right: 20px;
  }
  #hot_city_container {
    background-color: #fff;
    margin-bottom: 0.4rem;
  }
  .city_title {
    color: #666;
    font-weight: 400;
    font-size: 14px;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding: 10px 10px;
  }
  .citylistul li {
    float: left;
    text-align: center;
    color: #3190e8;
    border-bottom: 0.025rem solid #e4e4e4;
    border-right: 0.025rem solid #e4e4e4;
    width: 25%;
    height: 20px;
    list-style: none;
  }
  .clear:after {
    content: "";
    height: 0;
    visibility: hidden;
    overflow: hidden;
    display: block;
    clear: both;
  }
  .citylistul{
    padding: 0px;
  }
  .group_city_container .group-ui{
    padding: 0px;
  }
  .group_city_container .group-ui li{
    color: #333333;
  }

  ul,li{
    list-style: none;
  }

</style>

