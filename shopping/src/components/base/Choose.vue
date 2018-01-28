<template>
  <div class="Choose">
    <ul>
      <li v-for="(item,index) in timeList">
        <div class="text-style" :class="{active:currentTime === index}" @click="changeCurrentTime(index)">{{item.text}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      timeList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentTime: this.timeList.length > 0 ? 0: ''
      }
    },
    watch: {
      currentTime: {
        handler: function (currentTime) {
          this.$emit('on-change', currentTime);
        },
        deep: true
      }
    },
    methods: {
      changeCurrentTime(arr_index){
        this.currentTime = arr_index
      }
    },
    mounted() {
      console.log(this.timeList);
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
    width: 50px;
    height: 30px;
    float: right;
    box-sizing: border-box;
    text-align: center;
    line-height: 26px;
  }
  .text-style.active{
    background: #6EBE91;
    color: #fff;
  }
  .text-style:hover {
    background: #6EBE91;
    color: #fff;
  }
</style>















