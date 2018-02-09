<template>
  <div class="food-message">
    <el-table
      :data="tableData"
      :default-sort="{prop: 'item_id', order: 'descending'}"
      ref="singleTable"
      border
      height="500"
      @sort-change="sortChangeEvent"
      @filter-change="filterChangeEvent"
      style="width: 60%;margin: auto">
      <el-table-column
        sortable
        prop="item_id"
        label="食品id"
        width="150">
      </el-table-column>
      <el-table-column
        :filters="[{text: '1223', value: '1223'}, {text: '好', value: '好'}]"
        :filter-method="filterHandler"
        sortable
        prop="name"
        label="食品名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="restaurant_name"
        label="餐馆名称"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="restaurant_id"
        label="餐馆ID"
        width="300">
      </el-table-column>
      <el-table-column
        prop="restaurant_address"
        label="餐馆地址"
        width="120">
      </el-table-column>
      <el-table-column
        :filters="[{text: '423', value: '423'}, {text: '天天', value: '天天'}]"
        :filter-method="filterHandler"
        prop="description"
        label="食品介绍"
        width="120">
      </el-table-column>
      <el-table-column
        :sort-method="sortMethodFun"
        prop="rating"
        label="食品评分"
        sortable="true"
        width="120">
      </el-table-column>
      <el-table-column
        prop="category_name"
        label="食品分类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="month_sales"
        label="月销量"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: auto; width: 60%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next"
        :total="countNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getFoods,
    getFoodsCount,
    getMenu,
    updateFood,
    deleteFood,
    getResturantDetail,
    getMenuById
  } from '@/api/getData'

  export default {
    data() {
      return {
        tableData: [],
        restaurant_id: null,
        offset: 0,
        limit: 20,
        countNum: 0,
        currentPage: 1,
        i: 0
      }
    },
    methods: {
      async initData() {
        try {
          const countData = await getFoodsCount({restaurant_id: this.restaurant_id});
          if (countData.status == 1) {
            this.countNum = countData.count;
          } else {
            throw new Error('获取数据失败');
          }
          this.getFoods();
        } catch (err) {
          console.log('获取数据失败', err);
        }
      },
      async getFoods() {
        const Foods = await getFoods({offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id});
        this.tableData = [];
        console.log('Foods', Foods);
        Foods.forEach((item, index) => {
          const tableData = {};
          tableData.name = item.name;
          tableData.item_id = item.item_id;
          tableData.description = item.description;
          tableData.rating = item.rating;
          tableData.month_sales = item.month_sales;
          tableData.restaurant_id = item.restaurant_id;
          tableData.category_id = item.category_id;
          tableData.image_path = item.image_path;
          tableData.specfoods = item.specfoods;
          tableData.index = index;

          tableData.restaurant_name = '';
          tableData.restaurant_id = '';
          tableData.restaurant_address = '';
          tableData.category_name = '';
          this.tableData.push(tableData);
        })
      },
      handleSizeChange(val) {
        this.limit = val;
        this.offset = 0;
        this.getFoods();
      },
      handleCurrentChange(val) {
        this.offset = (val - 1) * this.limit;
        this.getFoods();
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        if (row[property].indexOf(value) > -1) {
          return true;
        }
      },
      filterChangeEvent(filters) {
        console.log('filters', filters);   //filter change 返回筛选条件 但是 无筛选字段
      },
      sortChangeEvent(column, prop, order) {
        console.log('column', column);
        console.log('prop', prop);
        console.log('order', order);
      },
      sortMethodFun(a, b) {
        console.log('a', a);
        console.log('b', b);
      },
      handleClick(index) {
        console.log('index', index);
      }
    },
    mounted() {

    },
    created() {

      if (this.$route.query.restaurant_id) {
        this.restaurant_id = this.$route.query.restaurant_id;
      }
      this.initData();
    }
  }
</script>
<style scoped>
  .food-message {
    margin: 20px;
  }

</style>
