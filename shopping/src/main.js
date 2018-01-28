// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Layout from './components/Layout.vue'
import VueResource from 'vue-resource'
// import store from './VuexStore'
import store from './store'
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
