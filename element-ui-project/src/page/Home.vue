<template>
  <div>
    <div>
      <h1 style="text-align: center">数据统计</h1>
      <div class="total-list">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="4">
            <div class="total-item today-data"><span class="number">当日数据</span></div>
          </el-col>
          <el-col :span="4">
            <div class="total-item"><span class="number">{{userCount}}</span><span>新增用户</span></div>
          </el-col>
          <el-col :span="4">
            <div class="total-item"><span class="number">{{orderCount}}</span><span>新增订单</span></div>
          </el-col>
          <el-col :span="4">
            <div class="total-item"><span class="number">{{adminCount}}</span><span>新增管理员</span></div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="total-item total-num"><span class="number">总数据</span></div>
          </el-col>
          <el-col :span="4">
            <div class="total-item"><span class="number">{{allUserCount}}</span><span>注册用户</span></div>
          </el-col>
          <el-col :span="4">
            <div class="total-item"><span class="number">{{allOrderCount}}</span><span>订单</span></div>
          </el-col>
          <el-col :span="4">
            <div class="total-item"><span class="number">{{allAdminCount}}</span><span>管理员</span></div>
          </el-col>
        </el-row>
      </div>
      <tendency :sevenDay="sevenDay" :sevenDate="sevenDate"></tendency>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import Tendency from '../components/Tendency.vue';
  import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
  import dtime from 'time-formater'


  export default {
    data() {
      return {
        userCount: '',
        orderCount: '',
        adminCount: '',
        allUserCount: '',
        allOrderCount: '',
        allAdminCount: '',
        sevenDay: [],
        sevenDate: []
      }
    },
    mounted() {
      this.initData();
      for (let i = 6; i > -1; i--) {
        const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD')
        this.sevenDay.push(date);
      }
      // new Date().getTime() - 86400000 * i  获取前一天的时间戳 然后转化为 YYYY-MM-DD格式
      this.getSevenData();
    },
    components: {
      ElCol,
      ElRow,
      Tendency
    },
    methods: {
      async initData() {
        const today = dtime().format('YYYY-MM-DD');   // 获取当天时间
        Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
          .then(res => {
            this.userCount = res[0].count;
            this.orderCount = res[1].count;
            this.adminCount = res[2].count;
            this.allUserCount = res[3].count;
            this.allOrderCount = res[4].count;
            this.allAdminCount = res[5].count;
          }).catch(err => {
          console.log(err)
        })
      },
      async getSevenData() {
        const apiArr = [[], [], []];
        this.sevenDay.forEach((item) => {
          apiArr[0].push(userCount(item));
          apiArr[1].push(orderCount(item));
          apiArr[2].push(adminDayCount(item));
        })
        const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
        Promise.all(promiseArr).then(res => {
          const resArr = [[], [], []];
          res.forEach((item, index) => {
            if (item.status == 1) {
              resArr[Math.floor(index / 7)].push(item.count)
            }
          })
          this.sevenDate = resArr;
          console.log('resArr', resArr);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped>
  .total-list {

  }

  .total-list {
    margin: 10px 10px 20px;
    text-align: center;
  }

  .total-item {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #E5E9F2;
    padding-left: 10px;
    padding-right: 10px;
  }

  .total-item.today-data {
    background: #FF9800;
  }

  .total-item.total-num {
    background: #20A0FF;
  }

  .total-item > .number {
    color: #333;
    font-size: 26px;
  }

  .total-item.today-data > .number, .total-item.total-num > .number {
    color: #ffffff;
  }

</style>
