<template>
  <div class="clear footer-list">
    <div class="footer-item">外卖</div>
    <div class="footer-item">搜索</div>
    <div class="footer-item">订单</div>
    <div class="footer-item">我的</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clear:after {
    content: "";
    height: 0;
    visibility: hidden;
    overflow: hidden;
    display: block;
    clear: both;
  }
  .footer-list{
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 20px 10px;
    height: 60px;
    box-sizing: border-box;
  }
  .footer-list>div.footer-item{
    float: left;
    text-align: center;
    width: 25%;
  }
</style>
