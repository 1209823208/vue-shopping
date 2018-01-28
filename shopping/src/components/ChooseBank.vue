<template>
  <div class="ChooseBank">
    <h3>请选择银行</h3>
    <ul class="bankList">
      <li v-for="(item,index) in bankList"
          :class="[item.id,{active:currentBankIndex===index}]"
          @click="changeBank(index)"></li>
    </ul>
    　<slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bankList: [
          {
            id: 'zhaoshang',
            text: '兴业银行',
          },
          {
            id: 'jianshe',
            text: '中国邮政储蓄银行',
          },
          {
            id: 'pufa',
            text: '宁波银行',
          },
          {
            id: 'zhaoshang',
            text: '中信银行',
          },
          {
            id: 'jiaotong',
            text: '交通银行',
          },
          {
            id: 'gongshang',
            text: '工商银行',
          },
          {
            id: 'nongye',
            text: '农业银行',
          },
          {
            id: 'zhongguoyinhang',
            text: '中国银行',
          },
          {
            id: 'zhongxinyinhang',
            text: '中信银行',
          }
        ],
        currentBankIndex: 0,
      }
    },
    methods: {
      changeBank(index) {
        this.currentBankIndex = index;
        this.$emit('on-change',this.bankList[this.currentBankIndex].text);
      }
    },
    mounted() {
      this.$emit('on-change',this.bankList[this.currentBankIndex].text);
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

  a {
    color: #42b983;
  }

  .bankList li {
    background: url("../assets/banks/banks.png");
    border: 1px solid #e3e3e3;
    cursor: pointer;
    display: inline-block;
    width: 117px;
    height: 32px;
    display: inline-block;
    margin: 0 10px;
  }

  .bankList li.active {
    border: 1px solid burlywood;
  }

  .bankList li.zhaoshang {
    background-position: 0 0;
  }

  .bankList li.jianshe {
    background-position: -117px 0;
  }

  .bankList li.pufa {
    background-position: -234px 0;

  }

  .bankList li.zhaoshang {
    background-position: -351px 0;

  }

  .bankList li.jiaotong {
    background-position: -468px 0;

  }

  .bankList li.gongshang {
    background-position: -585px 0;

  }

  .bankList li.nongye {
    background-position: -702px 0;

  }

  .bankList li.zhongguoyinhang {
    background-position: -819px 0;

  }

  .bankList li.zhongxinyinhang {
    background-position: -936px 0;

  }
</style>
