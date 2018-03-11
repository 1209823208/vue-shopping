import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'
import App from '../App'

// 懒加载模式
// 第三个参数的意义就是把chunk名相同的文件打包到一起
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')

Vue.use(Router)

export default new Router({
  mode: routerMode,   //路由模式
  routes: [
    {
      path: '/',
      component: App,// 顶层路由，对应index.html
      children: [
        //  二级路由 对应App.vue
        //  地址为空时跳转home页面
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          component: home
        },
        //当前选择城市页
        {
          path: '/city/:cityid',
          component: city
        },
        //所有商铺列表
        {
          path: '/msite',
          component: msite
        },
        //特色商铺
        {
          path: '/food',
          component: food
        },
        //商品详情
        {
          path: '/shop',
          component: shop
        },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) { //滚动行为
    console.log('savedPosition-to', to);
    console.log('savedPosition-from', from);
    console.log('savedPosition-savedPosition', savedPosition);
    if (savedPosition) {  //savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
