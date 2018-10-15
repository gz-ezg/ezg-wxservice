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
import dymaic from 'base/serviceCenter/dymaic'
import dataMemo from 'base/serviceCenter/dataMemo'

import zuoZhang from 'base/serviceCenter/zuozhang'
import baoShui from 'base/serviceCenter/baoshui'
import report from 'base/serviceCenter/report'
import table from 'base/serviceCenter/table'

//  资料管理
import customerComfirm from 'base/source/customer_comfirm'
import comfirmSuccess from 'base/source/comfirm_success'
import comfirmFail from 'base/source/comfirm_fail'

//  项目方案
import project from 'base/serviceCenter/project/index'

//  企业荣誉
import honorIndex from 'base/serviceCenter/honor/index'



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
      path:'/complain/:id/:product',
      name:'complain',
      component: complain
    },
    {
      path:'/servicecenterindex',
      name:'serviceCenterIndex',
      component: serviceCenterIndex,
      beforeEnter: (to, from, next) => {
        console.log(to)
        console.log(from)
        if(from.name){
          // console.log("路由存在！")
        }else{
          // console.log("路由不存在！")
          localStorage.clear()
        }
        next()
      },
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
      path:'/bookkeepingageny/:companyid',
      name: 'bookKeepingAgeny',
      component: bookKeepingAgeny
    },
    {
      path: '/dymaic/:workOrderId',
      name: 'dymaic',
      component: dymaic
    },
    {
      path: '/dataMemo',
      name: 'dataMemo',
      component: dataMemo
    },
    {
      path: '/zuozhang/:companyid/:period',
      name: 'zuozhang',
      component: zuoZhang
    },
    {
      path: '/baoshui/:companyid/:period',
      name: 'baoshui',
      component: baoShui
    },
    {
      path: '/table/:companyid/:period/:type',
      name: 'table',
      component: table,
    },
    {
      path: '/report/:companyid/:period',
      name: 'report',
      component: report
    },
    //  资料相关部分
    //  确认页
    {
      path: '/customer_confirm/:id',
      name: "customer_comfirm",
      component: customerComfirm
    },
    //  成功页
    {
      path: '/comfirmSuccess',
      name: "comfirm_success",
      component: comfirmSuccess
    },
    //  拒绝页
    {
      path: '/comfirmFail',
      name: "comfirm_fail",
      component: comfirmFail
    },
    //  项目
    {
      path: '/project/:companyid',
      name: 'project',
      component: project
    },
    //  荣誉
    {
      path: '/honor/index/:companyid',
      name: 'honorIndex',
      component: honorIndex
    },
    {
      path: '/',
      redirect: {
        name:'login'
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
