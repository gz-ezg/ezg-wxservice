<template>
  <div>
    <van-row style="padding-bottom:45px">
      <van-row style="padding: 10px; background-color: #CC3300; border-bottom: 1px solid white;" >
        <center style="margin-left: 2%; color: white;font-weight:bold;" @click="openSelect">{{showCompanyName}}</center>
      </van-row>
      <div style="height:150px;padding: 10px; background-color: #CC3300; border-bottom: 1px solid #eeeeee;color: white" >
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
                <div style="font-size:35px">12345556.55</div>
              </center>
            </van-row>
        </van-row>
      </div>
      <van-row style="margin-top:5px;padding-top:5px;padding-bottom:5px;background-color: #fff;border-bottom: 1px solid white;font-size:14px">
        <van-col span="6">
          <center>
            <div>月收入(元)</div>
            <div>356669.00</div>
          </center>
        </van-col>
        <van-col span="6">
          <center>
            <div>货币资金(元)</div>
            <div>356669.00</div>
          </center>
        </van-col>
        <van-col span="6">
          <center>
            <div>成本费用(元)</div>
            <div>356669.00</div>
          </center>
        </van-col>
        <van-col span="6">
          <center>
            <div>税金(元)</div>
            <div>356669.00</div>
          </center>
        </van-col>
      </van-row>
      <van-cell-group style="margin-top:10px">
        <van-cell value="详情" is-link @click="open_report">
          <span slot="title">企业风险评估报告 <span style="font-size:10px;color:red" v-if="isNew">new</span></span>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top:10px">
        <van-cell title="综合服务中心" style="font-size:18px;font-weight:bold" />
        <van-collapse v-model="activeNames">
          <van-collapse-item name="commercial">
            <div slot="title">商事服务({{commercialWorkOrder.length}})</div>
            <div slot="default">
                <van-row style="-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;" v-for="(item,index) in commercialWorkOrder" :key="index">
                  <van-row>
                    <van-col span="12" style="font-size:12px">{{item.product}}</van-col>
                    <van-col span="12" style="text-align:right;font-size:10px"><span >详情</span><van-icon name="arrow" @click="open_workorder_detail(item)" /></van-col>
                  </van-row>
                  <van-row>
                    <van-col span="12" style="font-size:12px">目前进度: <span style="font-size:14px">{{item.process}}</span></van-col>
                    <van-col span="12" style="text-align:right;font-size:10px">预计完成时间:{{item.finishTime}}</van-col>
                  </van-row>
                </van-row>
            </div>
          </van-collapse-item>
          <van-collapse-item name="plan">
            <div slot="title">企划服务({{planWorkOrder.length}})</div>
            <div slot="default">
                <van-row style="-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;" v-for="(item,index) in planWorkOrder" :key="index">
                  <van-row>
                    <van-col span="12" style="font-size:12px">{{item.product}}</van-col>
                    <van-col span="12" style="text-align:right;font-size:10px"><span >详情</span><van-icon name="arrow" @click="open_workorder_detail(item)" /></van-col>
                  </van-row>
                  <van-row>
                    <van-col span="12" style="font-size:12px">目前进度: <span style="font-size:14px">{{item.process}}</span></van-col>
                    <van-col span="12" style="text-align:right;font-size:10px">预计完成时间:{{item.finishTime}}</van-col>
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
          <van-cell v-for="item in companyList" :key="item.id" clickable @click="choose(item)">
            <van-col span="22"><div>{{item.name}}</div></van-col>
            <van-col span="2"><van-radio :name="item.id" /></van-col>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <van-tabbar v-model="activetabbar" fixed>
      <van-tabbar-item icon="home" url="http://m.zgcfo.com/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" url="http://www16.53kf.com/m.php?cid=72151061">在线咨询</van-tabbar-item>
      <van-tabbar-item icon="info-o" to="/">我的服务</van-tabbar-item>
      <van-tabbar-item icon="contact" url="http://m.zgcfo.com/center.html">个人中心</van-tabbar-item>
    </van-tabbar>
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
      companyList:[
        {
          name:"广州则为科技有限公司",
          id:50111
        },
        {
          name:"广州则科技有限公司",
          id:50112
        },
        {
          name:"广州科技有限公司",
          id:50113
        }
      ],
      commercialWorkOrder:[
        {
          id:123,
          product:"工商变更",
          process:"税务登记",
          finishTime:"2018-07-01"
        },
        {
          id:124,
          product:"工商变更3",
          process:"税务登记",
          finishTime:"2018-07-01"
        },
        {
          id:125,
          product:"工商变更4",
          process:"税务登记",
          finishTime:"2018-07-01"
        }
      ],
      planWorkOrder:[
        {
          id:123,
          product:"工商变更",
          process:"税务登记",
          finishTime:"2018-07-01"
        },
        {
          id:124,
          product:"工商变更3",
          process:"税务登记",
          finishTime:"2018-07-01"
        },
        {
          id:125,
          product:"工商变更4",
          process:"税务登记",
          finishTime:"2018-07-01"
        },
        {
          id:126,
          product:"工商变更1",
          process:"税务登记",
          finishTime:"2018-07-01"
        }
      ]
    }
  },
  methods:{
    getDate(){
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
    },
    openSelect(){
      this.select_company = true
    },
    //  选择公司名称
    choose(e){
      this.showCompanyName = e.name
      this.select_company_id = e.id
      this.select_company = false
    },
    //  打开服务详情
    open_detail(){
      this.$router.push({
        name:'bookKeepingAgeny'
      })
    },
    //  打开企业风险评估
    open_report(){

    },
    //  打开工单详情
    open_workorder_detail(e){
      console.log(e)
    }
  },
  created(){
    this.getDate()
  }
}
</script>
