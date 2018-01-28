<template>
  <div class="OrderList">
    <h2 style="padding: 0; margin: 0px; margin-bottom: 20px">你的产品</h2>
    <div>
      <div class="com-div-content clearfix">
        <div class="com-width-filter fl">
          <div class="clearfix">
            <div class="com-title fl">选择产品:</div>
            <div class="analysis-right fl">
              <VSelection :selectList="selectList" @on-change="changeParams('productType',$event)"></VSelection>
            </div>
          </div>
        </div>

        <div class="com-width-filter fl">
          <div class="clearfix">
            <div class="com-title fl">开始日期:</div>
            <div class="analysis-right fl">
              <input/>
            </div>
          </div>
        </div>

        <div class="com-width-filter fl">
          <div class="clearfix">
            <div class="com-title fl">结束日期:</div>
            <div class="analysis-right fl">
              <input/>
            </div>
          </div>
        </div>

        <div class="com-width-filter fl">
          <div class="clearfix">
            <div class="com-title fl">关键词:</div>
            <div class="analysis-right fl">
              <input/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <table class="table table-bordered table-striped">
        <thead>
        <tr>
          <td>订单号</td>
          <th>购买产品</th>
          <th>版本类型</th>
          <th>有效时间</th>
          <th>购买日期</th>
          <th>数量</th>
          <th>总价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in orderList">
          <td>{{item.id}}</td>
          <td>{{item.product}}</td>
          <td>{{item.type}}</td>
          <td>{{item.limitTime}}</td>
          <td>{{item.buydata}}</td>
          <td>{{item.num}}</td>
          <td>{{item.total}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import VSelection from './base/Selection.vue'

  export default {
    components: {
      VSelection,
    },
    data() {
      return {
        productType: '',
        selectList: [
          {
            val: 1,
            text: '数据预测'
          },
          {
            val: 2,
            text: '数据统计'
          },
          {
            val: 3,
            text: '流量分析'
          },
          {
            val: 4,
            text: '广告发布'
          }
        ],
        orderList: [
          {
            id: 'de11',
            product: "数据统计",
            type: '高级',
            limitTime: '1年',
            buydata: '2017-2-1',
            num: 222,
            total: 6666
          },
          {
            id: 'de12',
            product: "数据预测",
            type: '初级',
            limitTime: '5年',
            buydata: '2015-10-1',
            num: 222,
            total: 56666
          },
          {
            id: 'de13',
            product: "广告发布",
            type: '中级',
            limitTime: '1年',
            buydata: '2018-1-1',
            num: 222,
            total: 5432
          }
        ]
      }
    },
    methods: {
      changeParams(attr, msg) {
        this[attr] = msg
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
  .com-width-filter{
    margin-left: 20px;
  }
  .com-width-filter .com-title{
    line-height: 25px;
    margin-right: 10px;
  }
  .table-bordered {
    text-align: center;
    margin-top: 20px;
  }

  .table-bordered thead {
    background: #42b983;
    color: #fff;
  }

  .table-bordered thead th {
    border: 0;
    text-align: center;
  }
</style>
