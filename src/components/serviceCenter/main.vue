<template>
  <div>
    <van-row style="padding-bottom:45px">
      <!-- #CC3300 -->
      <van-row style="padding: 10px; background-color: #952f2a; border-bottom: 1px solid white;" >
        <center style="margin-left: 2%; color: white;font-weight:bold;" @click="open_select">{{showCompanyName}}<van-icon name="arrow" /></center>
      </van-row>
      <div style="height:150px;padding: 10px; background-color: #952f2a; border-bottom: 1px solid #eeeeee;color: white" >
        <van-row>
          <van-row style="font-size:14px;line-height:14px;">
            <van-col span="12" >
              财务报表 {{year}}年{{month}}月
            </van-col>
            <van-col span="12" style="text-align:right">
              <span>服务详情</span><van-icon name="arrow" style="font-size:12px" @click="open_detail()" />
            </van-col>
          </van-row>
          <van-row style="margin-top:30px">
              <center>
                <div style="font-size:16px;padding-bottom:10px">月净利润(元)</div>
                <div style="font-size:35px">{{accountTotal.yuelirun}}</div>
              </center>
            </van-row>
        </van-row>
      </div>
      <van-row style="margin-top:5px;padding-top:5px;padding-bottom:5px;background-color: #fff;border-bottom: 1px solid white;font-size:14px">
        <van-col span="6">
          <center>
            <div>月收入(元)</div>
            <div>{{accountTotal.yueshouru}}</div>
          </center>
        </van-col>
        <van-col span="6">
          <center>
            <div>货币资金(元)</div>
            <div>{{accountTotal.huobizijin}}</div>
          </center>
        </van-col>
        <van-col span="6">
          <center>
            <div>成本费用(元)</div>
            <div>{{accountTotal.chengbenfeiyong}}</div>
          </center>
        </van-col>
        <van-col span="6">
          <center>
            <div>税金(元)</div>
            <div>{{accountTotal.shuijin}}</div>
          </center>
        </van-col>
      </van-row>
      <van-cell-group style="margin-top:10px">
        <van-cell value="详情" is-link @click="open_report" style="line-height:24px">
          <span slot="title">企业风险评估报告 <span style="font-size:10px;color:red" v-if="isNew">new</span></span>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top:10px">
        <van-cell title="综合服务中心" style="font-size:18px;font-weight:bold" />
        <van-collapse v-model="activeNames">
          <van-collapse-item name="commercial">
            <div slot="title">商事服务({{commercialWorkOrder.length}})</div>
            <div slot="default">
                <van-row style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;" v-for="(item,index) in commercialWorkOrder" :key="index">
                  <van-row style="margin-bottom:5px">
                    <van-col span="12" style="font-size:12px">{{item.product}}</van-col>
                    <van-col span="12" style="text-align:right;font-size:10px"><span >详情</span><van-icon name="arrow" @click="open_workorder_detail(item.workorderId)" /></van-col>
                  </van-row>
                  <van-row style="margin-top:5px">
                    <van-col span="12" style="font-size:12px">目前进度: <span style="font-size:14px;color:red">{{item.CurrentProcess}}</span></van-col>
                    <van-col span="12" style="text-align:right;font-size:10px">预计完成时间:{{item.service_end_time}}</van-col>
                  </van-row>
                </van-row>
            </div>
          </van-collapse-item>
          <van-collapse-item name="plan">
            <div slot="title">企划服务({{planWorkOrder.length}})</div>
            <div slot="default">
                <van-row style="-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;" v-for="(item,index) in planWorkOrder" :key="index">
                  <van-row style="margin-bottom:5px">
                    <van-col span="12" style="font-size:12px">{{item.product}}</van-col>
                    <van-col span="12" style="text-align:right;font-size:10px"><span>详情</span><van-icon name="arrow" @click="open_workorder_detail(item.workorderId)" /></van-col>
                  </van-row>
                  <van-row style="margin-top:5px">
                    <van-col span="12" style="font-size:12px">目前进度: <span style="font-size:14px;color:red">{{item.CurrentProcess}}</span></van-col>
                    <van-col span="12" style="text-align:right;font-size:10px">预计完成时间:{{item.service_end_time}}</van-col>
                  </van-row>
                </van-row>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </van-row>
    <van-dialog
      v-model="select_company"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
    >
      <van-radio-group v-model="select_company_id">
        <van-cell-group>
          <van-cell v-for="item in companyList" :key="item.id" clickable @click="choose(item)" >
            <van-col span="22" style="height:30px;line-height:30px"><div>{{item.companyname}}</div></van-col>
            <van-col span="2"><van-radio :name="item.id" style="height:30px"/></van-col>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!--  暂时关闭  -->
    <!-- <van-tabbar v-model="activetabbar" fixed>
      <van-tabbar-item icon="home" url="http://m.zgcfo.com/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" url="http://www16.53kf.com/m.php?cid=72151061">在线咨询</van-tabbar-item>
      <van-tabbar-item icon="info-o" to="/">我的服务</van-tabbar-item>
      <van-tabbar-item icon="contact" url="http://m.zgcfo.com/center.html">个人中心</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>


<script>
export default {
  data(){
    return{
      year:"",
      month:"",
      activetabbar:2,
      activeNames:[],
      isNew:true,
      select_company: false,
      showCompanyName: "无",
      select_company_id:"",
      companyList:[],
      commercialWorkOrder:[],
      planWorkOrder:[],
      accountTotal:{
        huobizijin:0,
        shuijin:0,
        yuelirun:0,
        qitashuifei:0,
        yueshouru:0,
        chengbenfeiyong:0,
        qiyesuodeshui:0,
        gerensuodeshui:0
      }
    }
  },
  methods:{
    get_date(){
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth()
      if(this.month == 0){
        this.year = this.year - 1
        this.month = 12
      }
      if(this.month<=10){
        this.month = "0"+this.month
      }
    },
    open_select(){
      this.select_company = true
    },
    //  选择公司名称
    choose(e){
      this.showCompanyName = e.companyname
      this.select_company_id = e.id
      this.select_company = false
      localStorage.setItem("companyName",this.showCompanyName)
      localStorage.setItem("companyID",this.select_company_id)
      this.get_data()
    },
    //  打开服务详情
    open_detail(){
      let _self = this
      this.$router.push({
        name:'bookKeepingAgeny',
        params:{
          companyid:_self.select_company_id
        }
      })
    },
    //  打开企业风险评估
    open_report(){
      let _self = this
      let period = _self.year + _self.month
      this.$router.push({
        name:"report",
        params:{
          companyid: _self.select_company_id,
          period: period
        }
      })
    },
    //  打开工单详情
    open_workorder_detail(e){
      this.$router.push({
        name:"dymaic",
        params:{
          workOrderId: e
        }
      })
    },
    get_company_list(){
      let _self = this
      let url = `api/store/customer/company/list`
      let config = {}

      function success(res){
        // console.log(res.data.data)
        _self.companyList = res.data.data
        if(res.data.data){
          if(res.data.data.length == 0){
            _self.$toast.fail("客户未绑定企业！")
          }
          if(!localStorage.getItem("companyName")){
            console.log(localStorage.getItem("companyName"))
            console.log("1111")
            _self.showCompanyName = res.data.data[0].companyname
            _self.select_company_id = res.data.data[0].id
            localStorage.setItem("companyName",_self.showCompanyName)
            localStorage.setItem("companyID",_self.select_company_id)
            _self.get_account()
            _self.get_data()
          }else{
            console.log("2222")
            _self.showCompanyName = localStorage.getItem("companyName")
            _self.select_company_id = parseInt(localStorage.getItem("companyID"))
            localStorage.setItem("companyName",_self.showCompanyName)
            localStorage.setItem("companyID",_self.select_company_id)
            _self.get_account()
            _self.get_data()
          }
        }
      }

      function fail(err){
        console.log(err)
      }

      this.$Get(url, config, success, fail)
    },
    get_data(){
      this.commercialWorkOrder = []
      this.planWorkOrder = []
      let _self = this
      let url = `api/store/customer/company/work/order/list`
      let config = {
        params:{
          companyId: _self.select_company_id
        }
      }

      function success(res){
        // console.log(res.data.data)
        if(res.data.data.BUSSINESS){
          _self.commercialWorkOrder = res.data.data.BUSSINESS
          for(let i = 0;i<_self.commercialWorkOrder.length;i++){
            if(_self.commercialWorkOrder[i].service_end_time){
              _self.commercialWorkOrder[i].service_end_time = _self.commercialWorkOrder[i].service_end_time.slice(0,10)
            }
          }
        }
        if(res.data.data.PLAN){
          _self.planWorkOrder = res.data.data.PLAN
          for(let i = 0;i<_self.planWorkOrder.length;i++){
            if(_self.planWorkOrder[i].service_end_time){
              _self.planWorkOrder[i].service_end_time = _self.planWorkOrder[i].service_end_time.slice(0,10)
            }
          }
        }
      }

      function fail(err){
        console.log(err)
      }

      this.$Get(url, config, success, fail)
    },
    get_account(){
      let _self = this
      let url = `api/store/customer/company/account/report`
      let temp = _self.year + _self.month
      let config = {
        params:{
          companyId: _self.select_company_id,
          // period: temp
        }
      }

      function success(res){
        console.log(res.data.data)
        _self.accountTotal = res.data.data
      }

      function fail(err){
        _self.$toast.fail(err.data.msg)
      }

      this.$Get(url, config, success, fail)
    }
  },
  created(){
    // if(localStorage.getItem("companyID")){
    //   this.select_company_id = localStorage.getItem("companyID")
    // }
    this.get_company_list()
    this.get_date()
  },
  // beforeUpdate(){
  //   if(localStorage.getItem("companyID")){
  //     console.log(localStorage.getItem("companyID"))
  //   }
  // },
  watch:{
    'select_company_id':'get_account'
  }
}
</script>
