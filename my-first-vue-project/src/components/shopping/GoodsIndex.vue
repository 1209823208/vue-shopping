<template>
  <div id="GoodsIndex">
    <NavHeader></NavHeader>
    <NavBread><span v-html="navBreadHtmlFun"></span></NavBread>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <NavFooter></NavFooter>
    <Error></Error>
  </div>
</template>

<script>
  import NavHeader from './NavHeader.vue'
  import NavBread from './NavBread.vue'
  import NavFooter from './NavFooter.vue'
  import Error from  '../base/Error.vue'
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    computed:{
      navBreadHtmlFun(){
        return this.$store.state.navBreadHtml;
      }
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter,
      Error
    },
  }
</script>
