<template>
  <div class="Counter clearfix">
    <div class="text-style text-hov" @click="MinuNum">-</div>
    <div class="text-style text-number">
      <input v-model="num" @keyup="fixNumber"/>
    </div>
    <div class="text-style text-hov" @click="addNum">+</div>
  </div>
</template>

<script>
  export default {
    props: {
      max: {
        type: Number,
        default: 5
      },
      min: {
        type: Number,
        default: 1
      }
    },

    data() {
      return {
        num: this.min
      }
    },
    watch: {
      num: {
        handler: function (num) {
          this.$emit('on-change', num);
        },
        deep: true
      }
    },
    methods: {
      fixNumber() {
        if (typeof this.num === 'string') {
          this.num = this.num.replace(/\D/g, '');
        }
        if (this.num > this.max) {
          this.num = this.max;
        }
        if (this.num < this.min) {
          this.num = this.min;
        }
      },
      addNum() {
        if (this.num < this.max) {
          this.num++;
        }
      },
      MinuNum() {
        if (this.num > 1) {
          this.num--;
        }
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

  .text-style {
    border: 1px solid #E3E3E3;
    width: 30px;
    height: 30px;
    float: right;
    box-sizing: border-box;
    text-align: center;
    line-height: 26px;
  }

  .text-hov:hover {
    background: #6EBE91;
    color: #fff;
  }

  .text-number {
    border-left: 0;
    border-right: 0;
  }

  .text-number input {
    width: 100%;
    height: 100%;
    border: 0px;
    box-sizing: border-box;
    display: block;
    text-align: center;
  }


</style>















