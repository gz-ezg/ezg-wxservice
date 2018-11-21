<template>
  <div>
    <!-- <keep-alive> -->
    <van-loading v-if="loading" style="top:50vh;left:50vw"></van-loading>
    <!-- <keep-alive> -->
      <van-row style="padding-bottom:45px" v-if="!loading">
        <!-- #CC3300 -->
        <van-row style="padding: 10px; background-color: #952f2a; border-bottom: 1px solid white;" >
          <center style="margin-left: 2%; color: white;font-weight:bold;" @click="open_select">{{showCompanyName}}<van-icon name="arrow" /></center>
        </van-row>
        <div style="height:150px;padding: 10px; background-color: #952f2a; border-bottom: 1px solid #eeeeee;color: white" @click="open_detail()">
          <van-row>
            <van-row style="font-size:14px;line-height:14px;">
              <van-col span="12" >
                财务报表 {{year}}年{{month}}月
              </van-col>
              <van-col span="12" style="text-align:right">
                <span>账务详情</span><van-icon name="arrow" style="font-size:12px"  />
              </van-col>
            </van-row>
            <van-row style="margin-top:30px">
                <center>
                  <div style="font-size:16px;padding-bottom:10px">月净利润(万元)</div>
                  <div style="font-size:35px">{{accountTotal.yuelirun|formatMoney}}</div>
                </center>
              </van-row>
          </van-row>
        </div>
        <van-row style="margin-top:5px;padding-top:5px;padding-bottom:5px;background-color: #fff;border-bottom: 1px solid white;font-size:14px">
          <van-col span="6">
            <center>
              <div>月收入(万元)</div>
              <div>{{accountTotal.yueshouru|formatMoney}}</div>
            </center>
          </van-col>
          <van-col span="6">
            <center>
              <div>货币资金(万元)</div>
              <div>{{accountTotal.huobizijin|formatMoney}}</div>
            </center>
          </van-col>
          <van-col span="6">
            <center>
              <div>成本费用(万元)</div>
              <div>{{accountTotal.chengbenfeiyong|formatMoney}}</div>
            </center>
          </van-col>
          <van-col span="6">
            <center>
              <div>税金(万元)</div>
              <div>{{accountTotal.zhenzhishui|formatMoney}}</div>
            </center>
          </van-col>
        </van-row>

        <van-row style="margin-top:10px;padding-top:15px;padding-bottom:15px;background-color: #fff;border-bottom: 1px solid white;font-size:14px">
          <div @click="open_honor">
            <van-col span="8">
              <center>
                <div style="padding-bottom:10px">
                  <van-icon name="wap-home" style="font-size:30px;color:#952f2a"></van-icon>
                </div>
                <span>企业荣誉</span>
              </center>
            </van-col>
          </div>
          <div @click="open_project">
            <van-col span="8">
              <center>
                <div style="padding-bottom:10px">
                  <van-icon name="exchange" style="font-size:30px;color:#952f2a"></van-icon>
                </div>
                <span>项目方案</span>
              </center>
            </van-col>
          </div>
          <div @click="open_report">
            <van-col span="8">
              <center>
                <div style="padding-bottom:10px">
                  <van-icon name="records" style="font-size:30px;color:#952f2a"></van-icon>
                </div>
                <span >账务评估</span>
              </center>
            </van-col>
          </div>
        </van-row>
        <!-- <van-cell-group style="margin-top:10px">
          <van-cell value="详情" is-link @click="open_report" style="line-height:24px">
            <span slot="title">企业风险评估报告 <span style="font-size:10px;color:red" v-if="isNew">new</span></span>
          </van-cell>
        </van-cell-group> -->
        <van-cell-group style="margin-top:10px">
          <van-cell title="综合服务中心" style="font-size:18px;font-weight:bold" />
          <van-collapse v-model="activeNames">
            <van-collapse-item name="commercial">
              <div slot="title">商事服务({{commercialWorkOrder.length}})</div>
              <div slot="default">
                  <van-row style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;" v-for="(item,index) in commercialWorkOrder" :key="index">
                    <div @click="open_workorder_detail(item.workorderId)">
                      <van-row style="margin-bottom:5px">
                        <van-col span="12" style="font-size:12px">{{item.product}}</van-col>
                        <van-col span="12" style="text-align:right;font-size:10px"><span >详情</span><van-icon name="arrow"  /></van-col>
                      </van-row>
                      <van-row style="margin-top:5px">
                        <van-col span="12" style="font-size:12px">目前进度: <span style="font-size:14px;color:red">{{item.CurrentProcess}}</span></van-col>
                        <van-col span="12" style="text-align:right;font-size:10px" v-if="item.service_end_time">预计完成时间:{{item.service_end_time}}</van-col>
                      </van-row>
                    </div>
                  </van-row>
              </div>
            </van-collapse-item>
            <van-collapse-item name="plan">
              <div slot="title">企划服务({{planWorkOrder.length}})</div>
              <div slot="default">
                  <van-row style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;" v-for="(item,index) in planWorkOrder" :key="index">
                    <div @click="open_workorder_detail(item.workorderId)">
                      <van-row style="margin-bottom:5px">
                        <van-col span="12" style="font-size:12px">{{item.product}}</van-col>
                        <van-col span="12" style="text-align:right;font-size:10px"><span>详情</span><van-icon name="arrow"  /></van-col>
                      </van-row>
                      <van-row style="margin-top:5px">
                        <van-col span="12" style="font-size:12px">目前进度: <span style="font-size:14px;color:red">{{item.CurrentProcess}}</span></van-col>
                        <van-col span="12" style="text-align:right;font-size:10px" v-if="item.service_end_time">预计完成时间:{{item.service_end_time}}</van-col>
                      </van-row>
                    </div>
                  </van-row>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-cell-group>
      </van-row>
    <!-- </keep-alive> -->
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
    <van-tabbar v-model="active" fixed>
      <!-- <van-tabbar-item icon="home" url="http://m.zgcfo.com/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" url="http://www16.53kf.com/m.php?cid=72151061">在线咨询</van-tabbar-item> -->
      <van-tabbar-item icon="wap-home" to="/servicecenterindex">我的服务</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/myCenter">个人中心</van-tabbar-item>
    </van-tabbar>
    <!-- </keep-alive> -->
    </div>

</template>


<script>
export default {
  data(){
    return{
      active: 0,
      loading: false,
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
        zhenzhishui:0,
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
        this.month = 11
      }
      if(this.month == 1){
        this.year = this.year - 1
        this.month = 12
      }
      if(this.month<=10){
        this.month = "0" + (this.month - 1).toString()
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
      if(_self.select_company_id == "33742"){
        this.$router.push({
          name:'bookKeepingAgeny',
          params:{
            companyid: "35384"
          }
        })
      }else{
        this.$router.push({
          name:'bookKeepingAgeny',
          params:{
            companyid:_self.select_company_id
          }
        })
      }
    },
    //  打开企业风险评估
    open_report(){
      let _self = this
      let period = _self.year.toString() + _self.month.toString()
      this.$router.push({
        name:"report",
        params:{
          companyid: _self.select_company_id,
          period: period
        }
      })
    },
    open_project(){
      let _self = this
      _self.$toast.fail("方案模块正在努力开发中...")
      // this.$router.push({
      //   name: "project",
      //   params: {
      //     companyid: _self.select_company_id
      //   }
      // })
    },
    open_honor(){
      let _self = this
      this.$router.push({
        name: "honorIndex",
        params: {
          companyid: _self.select_company_id
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
      _self.loading = true
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
        _self.loading = false
      }

      this.$Get(url, config, success, fail)
    },
    get_data(){
      this.commercialWorkOrder = []
      this.planWorkOrder = []
      this.accountTotal.huobizijin=0,
      this.accountTotal.zhenzhishui=0,
      this.accountTotal.yuelirun=0,
      this.accountTotal.qitashuifei=0,
      this.accountTotal.yueshouru=0,
      this.accountTotal.chengbenfeiyong=0,
      this.accountTotal.qiyesuodeshui=0,
      this.accountTotal.gerensuodeshui=0

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
        _self.loading = false
      }

      function fail(err){
        console.log(err)
        _self.loading = false
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
        _self.loading = false
      }

      function fail(err){
        _self.$toast.fail(err.data.msg)
        _self.loading = false
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
  },
  filters:{
    formatMoney(e){
      return (e/1e4).toFixed(2)
    }
  }
}
</script>
