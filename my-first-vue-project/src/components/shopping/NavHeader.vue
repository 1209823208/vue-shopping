<template>
  <div>
    <div class="header">
      <div class="navbar">
        <div class="navbar-left-container">
          <a href="/">
            <img class="navbar-brand-logo" src="../../../static/logo.png"></a>
        </div>
        <div class="navbar-right-container" style="display: flex;">
          <div class="navbar-menu-container">
            <!--<a href="/" class="navbar-link">我的账户</a>-->
            <span class="navbar-link" v-if="loginFlag">{{userName}}</span>
            <a href="javascript:void(0)" class="navbar-link" v-if="!loginFlag" @click="loginDialog()">Login</a>
            <a href="javascript:void(0)" class="navbar-link" v-if="loginFlag" @click="loginOut()">Logout</a>
            <div class="navbar-cart-container" v-if="loginFlag">
              <router-link class="navbar-cart-count" tag="span" :to="{'path':'cartList'}">{{cartNum}}</router-link>
              <span class="navbar-link navbar-cart-link">
                 <i class="fa fa-shopping-cart"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---登陆-->
    <Dialog :isShow="isShow" @on-close="close_dialog()">
      <div class="error" v-if="errorFlag">{{errorText}}</div>
      <div class="login-div"><span>用户名:</span><input class="login-input" type="text" v-model="userName"/></div>
      <div class="login-div"><span>密码:</span><input class="login-input" type="text" v-model="userPwd"/></div>
      <div class="login-div"><span></span>
        <button @click="loginIn()">登陆</button>
      </div>

    </Dialog>
  </div>
</template>

<script>
  import Dialog from '../base/Dialog.vue'

  export default {
    data() {
      return {
        isShow: false,
        userName: '',
        userPwd: '',
        errorText: '',
        errorFlag: false,
        loginFlag: false
      }
    },
    computed: {
      cartNum() {
        return this.$store.state.countCart;
      }
    },
    methods: {
      loginIn() {
        let _this = this;
        if (this.userName === '' || this.userPwd === '') {
          this.errorText = '用户名或密码错误';
          this.errorFlag = true;
          return;
        }
        this.$http.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd,
        }).then((response) => {
          console.log('response', response);
          if (response.data.status === '0') {
            _this.loginFlag = true;
            _this.userName = response.data.result.userName;
            _this.isShow = false;
            _this.$store.dispatch('getCartNumByAPi');
            this.$router.go(0);
          }

        }).catch((error) => {
          console.log('error', error);
          return Promise.reject(error);
        })

      },
      loginOut() {
        let _this = this;
        this.$http.get('/users/loginOut').then((response) => {
          if (response.data.status === '0') {
            _this.loginFlag = false;
            _this.userName = '';
            this.$router.go(0);
          }
        }).catch((err) => {
          console.log('error', error);
          return Promise.reject(error);
        })
      },
      checkLogin() {
        let _this = this;
        this.$http.get('/users/checkLogin').then((response) => {
          if (response.data.status === '0') {
            _this.loginFlag = true;
            _this.userName = response.data.result.userName;
            _this.$store.dispatch('getCartNumByAPi');
          }
        }).catch((err) => {
          console.log('error', error);
          return Promise.reject(error);
        })
      },
      loginDialog() {
        this.isShow = true;
      },
      //关闭弹框
      close_dialog() {
        this.isShow = false;
      }
    },
    mounted: function () {
      console.log('checkLogin');
      this.checkLogin();
    },
    components: {
      Dialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat", sans-serif;
    font-size: 16px;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }

  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }

  .navbar-brand-logo {
    /*width: 120px;*/
  }

  .header a, .footer a {
    color: #666;
    text-decoration: none;
  }

  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }

  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }

  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }

  .navbar-link {
    padding-left: 15px;
  }

  .navbar-cart-container {
    position: relative;
  }

  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }

  .login-input {
    height: 30px;
    line-height: 30px;
    width: 200px;
  }

  .login-div {
    margin: 20px;
  }

  .login-div span {
    width: 60px;
    display: inline-block;
  }

  .login-div button {
    width: 60px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-color: chartreuse;
    color: #ffffff;
  }
</style>
