<template>
  <div class="analysis">
    <h3 class="analysis-title">流量分析</h3>
    <p class="analysis-desc">
      是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
    <div class="analysis-content">
      <div class="com-div-content clearfix">
        <div class="com-title fl">购买数量:</div>
        <div class="analysis-right fl">
          <VCounter @on-change="changeParams('buyNum',$event)"></VCounter>
        </div>
      </div>
      <div class="com-div-content clearfix">
        <div class="com-title fl">产品类型:</div>
        <div class="analysis-right fl">
          <VSelection :selectList="selectList" @on-change="changeParams('productType',$event)"></VSelection>
        </div>
      </div>
      <div class="com-div-content clearfix">
        <div class="com-title fl">有效时间:</div>
        <div class="analysis-right fl">
          <VChoose :timeList="timeList" @on-change="changeParams('limitTime',$event)"></VChoose>
        </div>
      </div>
      <div class="com-div-content clearfix">
        <div class="com-title fl">产品版本:</div>
        <div class="analysis-right fl">
          <VMulChoose :VersionList="VersionList" @on-change="changeParams('CurrentVersion',$event)"></VMulChoose>
        </div>
      </div>
      <div class="com-div-content clearfix">
        <div class="com-title fl">总价:</div>
        <div class="analysis-right fl">
          {{totalPrice}}
        </div>
      </div>
      <div class="com-div-content clearfix">
        <div class="com-title fl"></div>
        <div class="analysis-right fl">
          <button class="buy-btn" @click="buyButton">立即购买</button>
        </div>
      </div>
    </div>
    <VDialog :isShow="isBuyShowMessage" @on-close="closeDialogByParam('isBuyShowMessage')">
      <table class="table table-bordered table-striped">
        <thead>
        <tr>
          <th>购买数量</th>
          <th>产品类型</th>
          <th>有效时间</th>
          <th>产品版本</th>
          <th>总价</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td v-for="item in buyMessage">{{item}}</td>
        </tr>
        </tbody>
      </table>
      <VChooseBank @on-change="changeParams('Currentbank',$event)">
        <button class="buy-btn" @click="saveBuyButton">确认购买</button>
      </VChooseBank>
    </VDialog>

    <VDialog :isShow="isBuySuccess" @on-close="closeDialogByParam('isBuySuccess')">
      <button class="buy-btn" @click="goOrder">go订单</button>
    </VDialog>
  </div>
</template>

<script>
  import VCounter from '../../components/base/Counter.vue'
  import VSelection from '../../components/base/Selection.vue'
  import VChoose from '../../components/base/Choose.vue'
  import VMulChoose from '../../components/base/MulChoose.vue'
  import VDialog from '../../components/base/Dialog.vue'
  import VChooseBank from '../../components/ChooseBank.vue'

  export default {
    components: {
      VCounter,
      VSelection,
      VChoose,
      VMulChoose,
      VDialog,
      VChooseBank
    },
    data() {
      return {
        buyNum: 1,
        price: 100,
        totalPrice: 0,
        productType: '',
        selectList: [
          {
            val: 1,
            text: '入门版'
          },
          {
            val: 2,
            text: '中级版'
          },
          {
            val: 3,
            text: '高级版'
          },
          {
            val: 4,
            text: '客户版'
          }
        ],
        limitTime: '',
        timeList: [
          {
            val: 1,
            text: '半年'
          },
          {
            val: 2,
            text: '1年'
          },
          {
            val: 3,
            text: '3年 '
          }
        ],
        CurrentVersion: [],
        VersionList: [
          {
            val: 1,
            text: '客户版'
          },
          {
            val: 2,
            text: '代理商版'
          },
          {
            val: 3,
            text: '专家版 '
          }
        ],
        buyMessage: {},
        isBuyShowMessage: false,
        Currentbank: '',
        isBuySuccess: false
      }
    },
    watch: {
      buyNum: {
        handler: function (buyNum) {
          this.totalPrice = buyNum * this.price;
        },
        deep: true
      }
    },
    methods: {
      changeParams(attr, msg) {
        console.log(attr);
        console.log(msg);
        this[attr] = msg;
      },
      buyButton() {
        let buyMessage = {
          buyNum: this.buyNum,
          price: 100,
          productType: this.productType,
          limitTime: this.limitTime,
          CurrentVersion: this.CurrentVersion
        };
        this.buyMessage = buyMessage;
        console.log('buyMessage', buyMessage);
        this.isBuyShowMessage = true;

      },
      closeDialogByParam(attr) {
        this[attr] = false;
      },
      saveBuyButton() {
        this.isBuyShowMessage = false;
        this.isBuySuccess = true;
      },
      goOrder() {

      }
    },
    mounted() {
      this.totalPrice = this.buyNum * this.price;
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

  .analysis-title {
    margin-left: 20px
  }

  .analysis-desc {
    background: #F8FBFE;
    color: #999999;
    padding: 10px 20px;
    line-height: 30px;
  }

  .analysis-content {
    margin-left: 20px;
  }

  .com-div-content {
    margin-bottom: 20px;
  }

  .com-title {
    width: 100px;
    line-height: 30px;
  }

  .buy-btn {
    background: #42b983;
    color: #fff;
    padding: 5px 10px;
  }

  .table-bordered {
    text-align: center;
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
