// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import { Lazyload } from 'vant';
import axios from 'axios'
// import { url } from 'inspector';
import VueBus from './common/vue-bus'
import $ from 'jquery'

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(VueBus)

//  登录拦截器

axios.interceptors.response.use(
    (response) => {
        if(response.data.msgCode == "50003"){

        }else if(response.data.msgCode == '60000'){

		}else{
          	return response;
        }
	},
  	(error) => {
		return Promise.reject(error)
  	}
)

Vue.prototype.$http = axios

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
      		fail(res)
    	}
  	}).catch(function(err){
		  console.error(err)
		  fail(err)
	})
}

//	公用post请求
Vue.prototype.$Post = function(url,config,success,fail){
	this.$http.post(url, config).then(function(res){
	  if(res.data.msgCode == "40000"){
			// console.log(res)
			success(res)
	  }else{
			console.warn(res)
			fail(res)
	  }
	}).catch(function(err){
		console.error(err)
		fail(err)
  })
}

//	数据字典请求接口
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
            _self.$Message.error("请求异常！")
        }
    }).catch(function(err){
        console.log(err)
        _self.$Message.error("网络异常！")
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
