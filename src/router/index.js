import Vue from 'vue'
import Router from 'vue-router'

import login from 'base/login/login'
import mobileBind from 'base/login/bindMobile'
import complain from 'base/common/complain'

//  我的服务start
const serviceCenterIndex = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/main')
const bookKeepingAgeny = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/bookKeepingAgency')
const dymaic = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/dymaic')
const dataMemo = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/dataMemo')
const zuoZhang = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/zuozhang')
const baoShui = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/baoshui')
const report = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/report')
const table = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/table')

// import serviceCenterIndex from 'base/serviceCenter/main'

// import bookKeepingAgeny from 'base/serviceCenter/bookKeepingAgency'
// import dymaic from 'base/serviceCenter/dymaic'
// import dataMemo from 'base/serviceCenter/dataMemo'

// import zuoZhang from 'base/serviceCenter/zuozhang'
// import baoShui from 'base/serviceCenter/baoshui'
// import report from 'base/serviceCenter/report'
// import table from 'base/serviceCenter/table'

//  项目方案
const project = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/project/index')

// import project from 'base/serviceCenter/project/index'

//  企业荣誉
const honorIndex = () => import(/* webpackChunkName: "serviceCenter" */ 'base/serviceCenter/honor/index')

// import honorIndex from 'base/serviceCenter/honor/index'

//  我的服务end

//  个人中心start
const myCenter = () => import(/* webpackChunkName: "myCenter" */ 'base/personCenter/index')
const updateUserInfo = () => import(/* webpackChunkName: "myCenter" */ 'base/personCenter/updateUserInfo')
//  个人中心end
const orderIndex = () => import(/* webpackChunkName: "myCenter" */ 'base/order/index')
const kimsIndex = () => import(/* webpackChunkName: "myCenter" */ 'base/kims/index')
const recommendedIndex = () => import(/* webpackChunkName: "myCenter" */ 'base/recommended/index')

// import myCenter from 'base/personCenter/index'
// import updateUserInfo from 'base/personCenter/updateUserInfo'

// import orderIndex from 'base/order/index'
// import kimsIndex from 'base/kims/index'
// import recommendedIndex from 'base/recommended/index'

//  发票
const invoiceIndex = () => import(/* webpackChunkName: "myCenter" */ 'base/invoice/index')
const invoiceList = () => import(/* webpackChunkName: "myCenter" */ 'base/invoice/list')
const invoiceCreate = () => import(/* webpackChunkName: "myCenter" */ 'base/invoice/create')

// import invoiceIndex from 'base/invoice/index'
// import invoiceList from 'base/invoice/list'
// import invoiceCreate from 'base/invoice/create'

//  资料start
const sourceIndex = () => import(/* webpackChunkName: "myCenter" */ 'base/source/index')
const sourceList = () => import(/* webpackChunkName: "myCenter" */ 'base/source/list')
const unFinishedList = () => import(/* webpackChunkName: "myCenter" */ 'base/source/unFinishedList')

// import sourceIndex from 'base/source/index'
// import sourceList from 'base/source/list'
// import unFinishedList from 'base/source/unFinishedList'

//  交接(免登陆，独立成包)
const customerComfirm = () => import(/* webpackChunkName: "sourceConfirm" */ 'base/source/customer_comfirm')
const comfirmSuccess = () => import(/* webpackChunkName: "sourceConfirm" */ 'base/source/comfirm_success')
const comfirmFail = () => import(/* webpackChunkName: "sourceConfirm" */ 'base/source/comfirm_fail')

// import customerComfirm from 'base/source/customer_comfirm'
// import comfirmSuccess from 'base/source/comfirm_success'
// import comfirmFail from 'base/source/comfirm_fail'
//  资料end

//  客户评价(免登陆，独立成包)
const returnVisitIndex = () => import(/* webpackChunkName: "returnVisit" */ 'base/returnVisit/index')
const returnWorkOrder = () => import(/* webpackChunkName: "returnVisit" */ 'base/returnVisit/workOrder')
const returnCycleWordOrder = () => import(/* webpackChunkName: "returnVisit" */ 'base/returnVisit/cycleWordOrder')
const returnVisitList = () => import(/* webpackChunkName: "returnVisit" */ 'base/returnVisit/list')
const returnVisitFinish = () => import(/* webpackChunkName: "returnVisit" */ 'base/returnVisit/finish')
// import returnVisitIndex from 'base/returnVisit/index'
// import returnWorkOrder from 'base/returnVisit/workOrder'
// import returnCycleWordOrder from 'base/returnVisit/cycleWordOrder'
// import returnVisitList from 'base/returnVisit/list'

const aboutIndex = () => import(/* webpackChunkName: "myCenter" */ 'base/about/index')

// import aboutIndex from 'base/about/index'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'getUserInfo',
    //   component: getUserInfo
    // },
    //  登录start
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
    //  登录end
    {
      //  关于我们
      path: '/about',
      name: 'aboutIndex',
      component: aboutIndex
    },
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
    //  个人中心
    {
      path: '/myCenter',
      name: "personCenterIndex",
      component: myCenter
    },
    {
      path: '/updateUserInfo',
      name: "updateUserInfo",
      component: updateUserInfo
    },
    //  我的发票
    {
      path: '/invoice',
      component: invoiceIndex,
      children: [
        {
          path: 'list',
          name: "invoiceList",
          component: invoiceList
        },
        {
          path: "create",
          name: "invoiceCreate",
          component: invoiceCreate,
          meta: {
            title: "E账柜-开发票"
          }
        },
        {
          path: '/',
          redirect: {
            name: 'invoiceList'
          }
        }
      ]
    },
    //  我的文件

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
    //  个人中心资料入口
    {
      path: '/source',
      component: sourceIndex,
      children: [
        {
          path: 'list',
          name: 'sourceList',
          component: sourceList
        },
        {
          path: 'unFinishedList',
          name: 'unFinishedList',
          component: unFinishedList
        },
        {
          path: '/',
          redirect: {
            name: 'unFinishedList'
          }
        }
      ]
    },
    //  客户回访
    {
      path: '/returnVisit',
      component: returnVisitIndex,
      children: [
        {
          path: 'workOrder/:id',
          name: 'returnWorkOrder',
          component: returnWorkOrder
        },
        // {
        //   path: 'cycleWordOrder',
        //   name: 'returnCycleWordOrder',
        //   component: returnCycleWordOrder
        // },
        {
          path: 'returnVisitList',
          name: 'returnVisitList',
          component: returnVisitList
        },
        {
          path: 'finish',
          name: 'returnVisitFinish',
          component: returnVisitFinish,
        },
        {
          path: '/',
          redirect: {
            name: 'returnVisitList'
          }
        }
      ]
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
