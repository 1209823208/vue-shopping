<template>
  <div id="head-top">
    <div class="row">
      <div class="col-xs-3">
        <slot name='logo'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
          <i class="fa fa-angle-left"></i>
        </section>
      </div>
      <div class="col-xs-6" style="text-align: center">
        <section class="title_head ellipsis" v-if="headTitle">
          <span class="title_text">{{headTitle}}</span>
          <slot name="centerContent"></slot>
        </section>
      </div>
      <div class="col-xs-3">
        <router-link to="/" class="a-router-link-active" v-if="signinUp">
          <div>登陆|注册</div>
        </router-link>
        <slot name="changecity"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: ''
      }
    },
    props: {
      signinUp: String,
      headTitle: String,
      goBack: {
        default: false,

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #head-top {
    background-color: #3190e8;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    color: #ffffff;
    font-size: 16px;
  }

  #head-top .a-router-link-active {
    color: #ffffff;
  }
  .title_head.ellipsis{
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
