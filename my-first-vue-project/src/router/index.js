import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParentRoute from '@/components/ParentRoute'
import ChildRouteOne from '@/components/ChildRouteOne'
import ChildRouteTwo from '@/components/ChildRouteTwo'
import Lifecycle from '@/components/Lifecycle'
import ComA from '@/components/ComA'
import ComB from '@/components/ComB'
import ComC from '@/components/ComC'
/*shopping*/
import GoodsIndex from '@/components/shopping/GoodsIndex'
import GoodList from '@/components/shopping/GoodList'
import CartList from '@/components/shopping/CartList'
import Address from '@/components/shopping/Address'
import OrderList from '@/components/shopping/OrderList'
import OrderSuccess from '@/components/shopping/OrderSuccess'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/shoppingIndex',
    },
    {
      path: '/shoppingIndex',
      component: GoodsIndex,
      children: [
        {
          path: '/',
          redirect: 'goodList'
        },
        {
          path: 'goodList',
          component: GoodList
        },
        {
          path: 'cartList',
          component: CartList
        },
        {
          path: 'address',
          component: Address
        },
        {
          path: 'orderList',
          component: OrderList
        },
        {
          path: 'orderSuccess',
          component: OrderSuccess
        }
      ]
    },
    // 基础知识 配置
    {
      path: '/HelloWorld',
      component: HelloWorld,
      alias: '/gogo',
    },
    {
      path: '/Header/:color/:type',
      name: 'Header',
      component: Header,
      beforeEnter: (to, from, next) => {
        console.log('路由独享to:', to);
        console.log('路由独享from:', from);
        next();
      }
    },
    {
      path: '/Footer',
      name: 'FooterByName',
      component: Footer,
      children: [
        {
          path: '/',
          components: {
            default: ComC,
            a: ComA,
            b: ComB
          },
        },
      ]
    },
    {
      path: '/Lifecycle',
      component: Lifecycle
    },
    {
      path: '/ParentRoute',
      component: ParentRoute,
      children: [
        {
          path: '/',
          component: ChildRouteOne
        },
        {
          path: 'ChildRouteOne',
          component: ChildRouteOne
        },
        {
          path: 'ChildRouteTwo',
          component: ChildRouteTwo
        },
      ]
    }
  ]
})
