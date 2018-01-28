// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.filter("currency",currency);
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('../static/loading-svg/loading-bars.svg'),
  try: 3
})
Vue.use(infiniteScroll)
Vue.component('icon', Icon)


let vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
});
