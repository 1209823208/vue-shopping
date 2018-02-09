<template>
  <div class="detail">
    <div class="row" style="padding: 0px; margin: 0px">
      <div class="col-sm-2 index-page-left">
        <div class="com-back">
          <div style="text-align: center">
            <img style="width: 40%" src="../assets/images/1.png">
          </div>
          <ul class="nav-list">
            <router-link  tag="li"
                         v-for="item in navList"
                         active-class="active" :to="{'path':item.ref}">{{item.name}}
            </router-link>
          </ul>
        </div>
      </div>
      <div class="col-sm-9 index-page-right">
        <div class="row" style="padding: 0px; margin: 0px;background: #fff">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        routePath:this.$route.path,
        navList: [
          {
            name: '数据统计',
            ref: 'count',
          },
          {
            name: '数据预测',
            ref: 'datspecu',
          },
          {
            name: '流量分析',
            ref: 'analysis',
          },
          {
            name: '广告发布',
            ref: 'public',
          }
        ]
      }
    },
    mounted() {
      console.log(this.$route.path);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail {
    padding: 20px 0px;
  }

  .index-page-left {
    margin-left: 0px;
    padding: 0px;
  }

  .com-back {
    background: #fff;
    padding: 10px;
  }

  .nav-list {
    margin-left: 20px;
  }

  .nav-list li {
    margin-bottom: 10px;
    padding: 5px;
  }

  .nav-list li:hover {
    background: #6EBE91;
    color: #fff;
  }
  .nav-list .active{
    background: #6EBE91;
    color: #fff;
  }

</style>
