<template>
  <div class="login-template">
    <p class="login-title">elm后台管理系统</p>
    <div class="login-message">
      <el-form :rules="rules" :model="loginForm" ref="loginForm">
        <el-form-item>
          <el-input placeholder="用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <!--<el-button type="primary" @click="login">登陆测试axios请求</el-button>-->

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {login, getAdminInfo} from '@/api/getData'
  import {mapActions, mapState} from 'vuex'
  import env from '@/config/environment'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        report: {},
        rules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      login() {
        let body = {
          username: "rit_first_reviewer1",
          password: "qwer1234"
        };
        let _this = this;
        this.$http.post(env._URL('/api/v1.0/token-auth/'), body)
          .then(function (response) {
            if (response.status === 200) {
              if (response.data.token) {
                localStorage.setItem('id_token', response.data.token)
              }
              //获取报告信息
              _this.getReportMes();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getReportMes() {
        let _this = this;
        let req = env.getHeader();
        this.$http.get(env._URL('/reporter/report-detail/'), {
          params: {
            family_id: 17880336
          }, req
        })
          .then(function (response) {
            if (response.status === 200) {
              _this.report = response.data.data;
              _this.editReportMes();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      editReportMes() {
        let body = this.report;
        let req = env.getHeader();
        this.$http.post(env._URL('/reporter/report-edited/?family_id=17880336'), body, req)
          .then(function (response) {
            if (response.status === 200) {
              console.log('success', response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
            if (res.status == 1) {
              this.$message({
                type: 'success',
                message: '登录成功'
              });
              this.$router.push('manage')
            } else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        });
      },
      ...mapActions(['getAdminData']),
    },
    computed: {
      ...mapState(['adminInfo']),
    },
    mounted() {
      if (!this.adminInfo.id) {
        this.getAdminData();
      }
    },
    watch: {
      adminInfo: function (newAdminInfo) {
        if (newAdminInfo.id) {
          this.$router.push('manage');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-template {
    background-color: #324057;
    height: -webkit-fill-available;
    width: 100%;
    padding-top: 100px;
  }

  .login-title {
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    margin: 0px;
  }

  .login-message {
    width: 30%;
    margin: auto;
    background-color: #ffffff;
    padding: 50px 30px 10px;
    border-radius: 5px;
  }
</style>
