<template>
  <el-row style="height: 100%">
    <el-col :span="4" style="height: 100%;background-color: #324157">
      <div class="el-menu-conent">
        <el-menu :default-active="activeIndex" @select="handleSelect"
                 background-color="#324157"
                 text-color="#fff"
                 active-text-color="#20a0ff">
          <el-menu-item index="1"><i class="el-icon-menu firstCategory"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document firstCategory"></i>数据管理</template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="managerList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus firstCategory"></i>添加数据</template>
            <el-menu-item index="addShops">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on firstCategory"></i>图表</template>
            <el-menu-item index="userCharts">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit-outline firstCategory"></i>编辑</template>
            <el-menu-item index="textEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting firstCategory"></i>设置</template>
            <el-menu-item index="adminSetting">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-edit firstCategory"></i>说明</template>
            <el-menu-item index="description">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="20">
      <headTop></headTop>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
  </el-row>
</template>

<script>
  import headTop from '../components/HeadTop.vue'

  export default {
    data() {
      return {}
    },
    components: {
      headTop,
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log('key', key);
        console.log('keyPath', keyPath);
        if (key == 1 || key == 'orderList' || key == 'managerList') {
          this.$router.push({
            path: '/manage'
          })
        } else {
          this.$router.push({
            name: key
          })
        }}
    },
    computed: {
      activeIndex: function () {
        return this.$route.path.replace('/manage/', '');
      }
    },
    mounted() {
      console.log('meta', this.$route);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .firstCategory {
    color: #ffffff
  }

  .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
  }

  .el-submenu .el-menu-item:hover {
    background-color: #48576a !important;
  }

  .el-menu--dark .el-submenu .el-menu .el-menu-item:hover {
    background-color: #48576a !important;
  }

  .el-breadcrumb__inner a {
    color: #48576a !important;
    font-weight: normal;
  }
</style>
