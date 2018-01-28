<template>
  <div class="Dialog">
    <div class="dialog-cover" v-if="isShow" @click="closeDIalog()"></div>
    <div class="dialog-content clearfix" v-if="isShow">
      <span class="dialog-close" @click="closeDIalog()">x</span>
      <div class="dialog-detail-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      closeDIalog: function () {
//        this.isShow = false;
        this.$emit('on-close')
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

  .dialog-cover {

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    opacity: 0.5;
  }

  .dialog-content {
    background: #fff;
    min-width: 800px;
    max-width: 50%;
    min-height: 200px;
    z-index: 9999999;
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    padding: 10px 20px;
  }

  .dialog-close {
    float: right;
  }

  .dialog-detail-content {
    margin-top: 30px;
  }
</style>















