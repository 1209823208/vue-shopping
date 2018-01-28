<template>
  <div id="layout">
    <div class="header">
      <div class="row header-width">
        <div class="col-sm-6 header-left">
          <img class="logo" src="../assets/logo.png"/>
        </div>
        <div class="col-sm-6 header-right">
          <a v-if="!useName" @click="openLoginDialog">登陆</a>
          <a v-if="useName" @click="quit">退出</a><span class="line">|</span>

          <a>注册</a><span class="line">|</span>
          <a @click="openAboutDialog">关于</a>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-width">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="footer">
      <p>© 2016 fishenal MIT</p>
    </div>
    <my-dialog :isShow="isAboutShow" @on-close="closeDialogByParam('isAboutShow')">
      <p>
        本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据
      </p>
    </my-dialog>
    <my-dialog :isShow="isLoginShow" @on-close="closeDialogByParam('isLoginShow')">
      <Login @keep-use-paw="keepUsePaw"></Login>
    </my-dialog>
  </div>
</template>

<script>
  import Diolog from './base/Dialog.vue'
  import Login from './Login.vue'

  export default {
    data() {
      return {
        isAboutShow: false,
        isLoginShow: false,
        useName: ''
      }
    },
    components: {
      'myDialog': Diolog,
      Login
    },
    methods: {
      openAboutDialog() {
        this.isAboutShow = true;
      },
      openLoginDialog() {
        this.isLoginShow = true;
      },
      closeDialogByParam(att) {
        this[att] = false;
      },
      keepUsePaw(params) {
        this.closeDialogByParam('isLoginShow');
        this.useName = params.useName;
        console.log('this.useName ', this.useName);
      },
      quit() {
        this.useName = '';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #layout {
    margin: auto;
    font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }

  .header {
    box-sizing: border-box;

    background: #363636;
  }

  .header-width {
    width: 80%;
    height: 100px;
    margin: 0px auto;
    padding: 10px 0px;

  }

  .header .header-left {
    line-height: 80px;
  }

  .header .header-left .logo {
    width: 10%;
  }

  .header .header-right {
    line-height: 80px;
    text-align: right;
  }

  .header .header-right .line {
    padding: 0px 10px;
    color: #ffffff;
  }

  .header .header-right a {
    color: #B2B2B2;
    font-weight: bold;
  }

  .content {
    background: #F0F1F4;
  }

  .content-width {
    width: 80%;
    margin: auto;
    min-height: 1000px;
  }

  .footer {
    background: #E3E3E8;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .clearfix:after {
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


</style>















