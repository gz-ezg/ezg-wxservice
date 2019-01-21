// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import { Lazyload } from 'vant';
import axios from 'axios'
// import { url } from 'inspector';
import VueBus from './common/vue-bus'
import { Toast } from 'vant';
import 'vant/lib/index.css';
import $ from 'jquery'

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(VueBus)



let host

// if(process.env.NODE_ENV === 'production'){
//   host = 'http://m2.zgcfo.com'
// }else if (process.env.NODE_ENV === 'jenkins'){
//   host = 'http://m2.roderickt1an.cn'
// }else{
//   // host = 'http://192.168.0.226:8100'
//   host = 'http://192.168.1.12:8100'
// }
const instance = axios.create({
  baseURL: host
})

// //  登录拦截器
// // axios.defaults.baseURL = "http://m2.zgcfo.com"
// // axios.defaults.baseURL = "http://wxservice.roderickt1an.cn"
// instance.defaults.baseURL = "http://192.168.0.226:8100"


instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.data = "1111"
  // console.log(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use(
    (response) => {
        if(response.data.msgCode == "50003"){
          router.push({
            name:'login'
          })
        }else if(response.data.msgCode == '60000'){

		}else{
          	return response;
        }
	},
  	(error) => {
		return Promise.reject(error)
  	}
)

Vue.prototype.$http = instance

//  回退上一级路由
Vue.prototype.$backTo = function(){
  this.$router.go(-1)
}

//	公用get请求
Vue.prototype.$Get = function(url,config,success,fail){
  	this.$http.get(url, config).then(function(res){
    	if(res.data.msgCode == "40000"){
      		// console.log(res)
      		success(res)
    	}else{
          console.warn(res)
          Toast.fail(res.data.msg)
      		fail(res)
    	}
  	}).catch(function(err){
      console.error(err)
      Toast.fail(err)
		  fail(err)
	})
}

//	公用post请求
Vue.prototype.$Post = function(url,config,success,fail){
	this.$http.post(url, config).then(function(res){
	  if(res.data.msgCode == "40000"){
      // console.log(res)
      Toast.success(res.data.msg)
			success(res)
	  }else{
      console.warn(res)
      Toast.fail(res.data.msg)
			fail(res)
	  }
	}).catch(function(err){
    console.error(err)
    Toast.fail(err)
		fail(err)
  })
}

//	数据字典请求接口
//  需要针对store搞一个数据字典
Vue.prototype.$GetDataCenter = function(params, finish){
    let _self = this
    let config = {
        params:{
            groupCodes:params
        }
	}
    let url = `api/system/tsType/queryTsTypeByGroupCodes`

    this.$http.get(url, config).then(function(res){
        if(res.data.msgCode == "40000"){
            finish(res)
        }else{
            // _self.$Message.error("请求异常！")
        }
    }).catch(function(err){
        console.log(err)
        // _self.$Message.error("网络异常！")
    })
}

//	数组转map
Vue.prototype.$array2map = function (array){
    if(array == "" || array == null){
        return ;
    }else{
        let tempMap = new Map()
        for(let i = 0;i<array.length;i++){
            tempMap.set(array[i].typecode, array[i].typename)
        }
        return tempMap
    }
}

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */


  if (to.meta.title) {
    document.title = to.meta.title
  }else{
    document.title = "E账柜"
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


