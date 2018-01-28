<template>
  <div class="Login">
    <div class="login-com">
      <span class="title">用户名:</span>
      <input class="input-width" placeholder="请输入用户名" v-model="useName"/>
      <span>{{this.checkUseName.errorUseName}}</span>
    </div>
    <div class="login-com">
      <span class="title">密码:</span>
      <input class="input-width" placeholder="请输入密码" v-model="passWord"/>
      <span>{{this.checkPassWord.errorPassWord}}</span>

    </div>
    <div class="login-com">
      <span class="title"></span>
      <button class="login-btn" @click="login_click()" :disabled="disabled">登陆</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        useName: '',
        passWord: '',
        disabled: true,
        statusList: {
          useNameStatus: false,
          passWordStatus: false,
        }
      }
    },
    computed: {
      checkUseName() {
        let errorUseName = '';
        if (this.useName === '' || this.useName == undefined) {
          errorUseName = '不能为空';
          this.statusList.useNameStatus = false
        }
        if (!/@/g.test(this.useName)) {
          errorUseName = '不包含@';
          this.statusList.useNameStatus = false
        } else {
          this.statusList.useNameStatus = true
        }
        return {
          'errorUseName': errorUseName,
          'status': this.statusList.useNameStatus
        }
      },
      checkPassWord() {
        let errorPassWord = '';
        if (this.passWord === '') {
          errorPassWord = '不能为空';
          this.statusList.passWordStatus = false
        }
        if (!/^\w{1,6}$/g.test(this.passWord)) {
          errorPassWord = '密码不是1-6位';
          this.statusList.passWordStatus = false
        } else {
          this.statusList.passWordStatus = true
        }
        return {
          'errorPassWord': errorPassWord,
          'status': this.statusList.passWordStatus
        }
      }
    },
    watch: {
      statusList: {
        handler: function (statusList) {
          console.log('statusList', statusList);
          if (statusList.passWordStatus && statusList.useNameStatus) {
            this.disabled = false;
          }
        },
        deep: true
      }
    },
    methods: {
      login_click() {
        let s = {
          useName: this.useName,
          passWord: this.passWord,
        };
        this.$emit('keep-use-paw',s)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .login-com {
    margin-bottom: 20px;
  }

  .title {
    display: inline-block;
    width: 100px;
  }

  .input-width {
    width: 300px;
    padding: 2px 5px;
  }

  .login-btn {
    background: #6EBE91;
    color: #fff;
    padding: 10px;
  }
</style>
