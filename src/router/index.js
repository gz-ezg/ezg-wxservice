import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import searchList from '@/components/searchList'
// import productDetail from '@/components/productDetail'
// import chat from '@/components/chat'
// import productList from '@/components/productList'
// import cart from '@/components/cart'
// import getUserInfo from '@/components/getUserInfo'
// import orderList from '@/components/orderList'
// import tel from '@/components/tel'

import login from 'base/login/login'
import mobileBind from 'base/login/bindMobile'
import complain from 'base/common/complain'

import serviceCenterIndex from 'base/serviceCenter/main'

import bookKeepingAgeny from 'base/serviceCenter/bookKeepingAgency'


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'getUserInfo',
    //   component: getUserInfo
    // },
    {
      path:'/complain',
      name:'complain',
      component: complain
    },
    {
      path:'/servicecenterindex',
      name:'serviceCenterIndex',
      component: serviceCenterIndex
    },

    {
      path:'/login',
      name: 'login',
      component: login
    },
    {
      path:'/mobliebind',
      name: 'mobileBind',
      component: mobileBind
    },

    {
      path:'/bookkeepingageny',
      name: 'bookKeepingAgeny',
      component: bookKeepingAgeny
    },
    {
      path: '/',
      redirect: {
        name:'serviceCenterIndex'
      }
    },
    // 采用history模式，配置全局路由
    {
      path: '*',
      redirect: {
        name:"serviceCenterIndex"
      }
    }
  ]
})
