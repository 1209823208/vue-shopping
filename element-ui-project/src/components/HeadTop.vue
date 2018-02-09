<template>
  <div class="head-content">
    <el-row>
      <el-col :span="20">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in $route.meta">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4">
        <div class="left-user-message">
          <el-dropdown>
          <span class="el-dropdown-link">
            {{adminInfo.user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>首页</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {signout} from '@/api/getData'

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {
      ...mapState(['adminInfo']),
    },
    methods: {
      ...mapActions(['getAdminData']),
      async loginOut(){
        const res = await signout()
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '退出成功'
          });
          this.$router.push('/');
        }else{
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }
    },
    mounted() {
      console.log('meta', this.$route);
      if (!this.adminInfo.id) {
        this.getAdminData();
      }
    }
  }
</script>
<style scoped>
  .head-content {
    background-color: #EFF2F7;
    height: 60px;
    padding-left: 20px;
  }

  .head-content .el-breadcrumb {
    line-height: 60px;
    font-weight: normal;
  }

  .left-user-message {
    height: 60px;
    padding: 20px 0px;
  }
</style>
