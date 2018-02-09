<template>
  <div class="user-message">
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="180">
      </el-table-column>
      <el-table-column
        prop="registe_time"
        label="注册日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="注册地址">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <el-pagination
        background
        @size-change="sizeChangeEvent"
        @current-change="currentChangeEvent"
        :current-page.sync="currentPage"
        :page-size="20"
        :page-sizes="[20, 30, 40]"
        layout="total, sizes, prev, pager, next"
        :total="countNum">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {getUserList, getUserCount} from '@/api/getData'

  export default {
    data() {
      return {
        tableData: [],
        countNum: 0,
        offset: 0,
        limit: 20,
        currentPage: 1
      }
    },
    methods: {
      async initData() {
        const countData = await getUserCount();
        if (countData.status == 1) {
          this.countNum = countData.count;
        } else {
          throw new Error('获取数据失败');
        }
        this.getUsers();
      },
      async getUsers() {
        const Users = await getUserList({offset: this.offset, limit: this.limit});
        this.tableData = [];
        Users.forEach(item => {
          const tableItemData = {};
          tableItemData.id = item.id;
          tableItemData.registe_time = item.registe_time;
          tableItemData.username = item.username;
          tableItemData.city = item.city;
          this.tableData.push(tableItemData);
        })
      },
      sizeChangeEvent(val) {
        this.limit = val;
        this.getUsers();
      },
      currentChangeEvent(val) {
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
        this.getUsers();
      }
    },
    mounted() {
      this.initData();
    }
  }
</script>
<style scoped>
  .user-message {
    margin: 20px;
  }

  .user-message .el-table th {
    background-color: #20A0FF !important;
  }
</style>
