<template>
  <div id="footer">
    <p>{{parentFooter}}</p>
    <input v-model="setValue"/>
    <button @click="toParentValue">sure</button>
    <p class="active">获取父组件的html</p>
    <slot>设置默认值 当父组件没有html</slot>
    <slot name="footer1">设置默认值 footer1</slot>
    <slot name="footer2">设置默认值 footer2</slot>

    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
  </div>
</template>

<script>
  export default {
    props: {
      'parent-footer': {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        'setValue': '',
      }
    },
    methods: {
      toParentValue: function () {
        this.$emit('get-footer-event', this.setValue)

      }
    },
    mounted: function () {
      console.log('Footer', this.$route);
    },
    beforeRouteEnter: (to, from, next) => {
      console.log('组件内守卫beforeRouteEnter  to :', to);
      console.log('组件内守卫beforeRouteEnter  from:', from);
      next();
    },
    beforeRouteLeave: (to, from, next) => {
      console.log('组件内守卫beforeRouteLeave  to:', to);
      console.log('组件内守卫beforeRouteLeave  from:', from);
      next();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active {
    color: #42b983;
    font-size: 20px;
    font-weight: bold;
  }

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
</style>
