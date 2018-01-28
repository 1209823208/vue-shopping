import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/index'
import Detail from '../pages/detail'
import Public from '../pages/detail/publish'
import Analysis from '../pages/detail/analysis'
import OrderList from '../components/OrderList.vue'
import Demo from '../VuexTemplate/demo.vue'
import VuexIndex from '../components/vuex/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/detail',
      component: Detail,
      redirect: '/detail/analysis',
      children: [
        {
          path: '/',
          component: Analysis
        },
        {
          path: 'analysis',
          component: Analysis
        },
        {
          path: 'public',
          component: Public
        },
        {
          path: 'count',
          component: Public
        },
        {
          path: 'datspecu',
          component: Public
        },
      ]
    },
    {
      path: '/orderList',
      component: OrderList
    },
    {
      path: '/Demo',
      component: Demo
    },
    {
      path: '/VuexIndex',
      component: VuexIndex
    }
  ]
})
