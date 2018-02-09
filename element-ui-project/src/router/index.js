import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Manage from '@/page/Manage'
import Home from '@/page/Home'
import UserList from '@/page/UserList'
import ShopList from '@/page/ShopList'
import FoodList from '@/page/FoodList'
import AddShop from '@/page/AddShop'
import TextEdit from '@/page/TextEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: []
        },
        {
          path: 'userList',
          name: 'userList',
          component: UserList,
          meta: ['数据管理', '用户列表'],
        },
        {
          path: 'shopList',
          name: 'shopList',
          component: ShopList,
          meta: ['数据管理', '商家列表'],
        },
        {
          path: 'foodList',
          name: 'foodList',
          component: FoodList,
          meta: ['数据管理', '食品列表'],
        },
        {
          path: 'addShop',
          name: 'addShop',
          component: AddShop,
          meta: ['添加数据', '添加商铺'],
        },
        {
          path: 'textEdit',
          name: 'textEdit',
          component: TextEdit,
          meta: ['编辑', '文本编辑'],
        }
      ]
    }
  ]
})
