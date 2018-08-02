<template>
  <van-row>
    <van-nav-bar
      style="background-color: #CC3300;color:white"
      :title="detail.product"
      left-arrow
      @click-left="$backTo()"
    />
    <van-row style="background-color: #CCCCCC;padding:10px">
      <center>
        {{companyName}}
      </center>
    </van-row>

    <van-row style="background-color: #FF8C69;padding:10px;margin:20px;font-size:14px">
      <van-row style="border-bottom:1px solid #999;padding-bottom:5px">
        <van-col span="18">
          <van-row>
            服务会计：{{detail.realname}}
          </van-row>
          <van-row>
            联系方式：{{tel}}
          </van-row>
          <van-row>
            服务税期：{{detail.begin_period}}至{{detail.end_period}}
          </van-row>
        </van-col>
        <van-col span="6">
          <center><a :href="href"><van-icon name="phone" style="line-height:23px;color:red;padding:15px;font-size:20px" /></a></center>
        </van-col>
      </van-row>
      <van-row style="margin-top:5px">
        <van-col span="14">服务不满意？<a href="/#/complain">我要投诉</a></van-col>
        <van-col span="10" style="font-size:10px;text-align:right;line-height:17px"><van-icon name="info-o" style="line-height:1px"/> <a href="https://mp.weixin.qq.com/s/W25DatAlyJIchb7-O74Myw">做账资料注意事项</a></van-col>
      </van-row>
    </van-row>

    <van-steps direction="vertical" :active="activeIndex" active-color="#f60">
      <van-step v-for="(item, index) in workOrderList" :key="index">
        <van-row>
          <van-col span="6" >{{item.period}}</van-col>
          <van-col span="5" ><span style="line-height:21px" @click="open_baoshui(item)">报税 <van-icon name="passed" v-if="item.BS=='Y'" style="font-size:14px;color:#00EE00;line-height:1px"/><van-icon name="clock" v-if="item.BS!='Y'" style="font-size:14px;line-height:16px"/></span></van-col>
          <van-col span="5" ><span style="line-height:21px" @click="open_zuozhang(item)">做账 <van-icon name="passed" v-if="item.JZ=='Y'" style="font-size:14px;color:#00EE00;line-height:1px"/><van-icon name="clock" v-if="item.JZ!='Y'" style="font-size:14px;line-height:16px"/></span></van-col>
          <van-col span="8" ><span @click="open_report(item)" size="small" style="line-height:18px">风险评估报告</span></van-col>
        </van-row>
      </van-step>
    </van-steps>
  </van-row>
</template>

<script>
export default {
  data(){
    return{
      detail:{
        begin_period:"",
        companyname:"",
        cycle_work_order_id:"",
        end_period:"",
        mobilePhone:"",
        product:"无",
        realname:"",
        service_record_id:"",
        skuname:""
      },
      workOrderList:[],
      // finish:true,
      activeIndex: 0,
      tel: 13580328323,
    }
  },
  computed:{
    href:function(){
      return "tel:" + this.tel
    }
  },
  methods:{
    open_report(e){
      console.log(e)
    },
    open_baoshui(e){
      console.log(e)
    },
    open_zuozhang(e){
      console.log(e)
    },
    init(){
      let _self = this
      let url = `api/store/customer/company/showCompanyProgressInfo`
      let config = {
        params:{
          // companyId:_self.$route.params.companyid
          companyId:33927
        }
      }

      function success(res){
        console.log(res)
        _self.workOrderList = res.data.data.detail
        for(let i = 0;i<_self.workOrderList.length;i++){
          if(_self.workOrderList[i].BS == "Y" && _self.workOrderList[i].JZ == "Y"){
            _self.activeIndex = i
          }
        }
      }

      function fail(err){
      }

      this.$Get(url, config, success, fail)
    },
    get_base_info(){
      let _self = this
      let url = `api/store/customer/company/companyServiceInfo`

      let config = {
        params:{
          // companyId:_self.$route.params.companyid
          companyId:33927
        }
      }

      function success(res){
        console.log("1111111111")
        console.log(res.data.data[0])
        _self.tel = res.data.data[0].mobilePhone
        _self.detail = res.data.data[0]
      }

      function fail(err){
        console.log(err)
      }

      this.$Get(url, config, success, fail)
    }

  },
  created(){
    let _self = this
    this.companyName = localStorage.getItem("companyName")
    this.get_base_info()
    this.init()
  },
  mounted(){

  }
}
</script>

<style scoped>
.van-step--finish{
  color:red
}
/* .van-step--finish .van-step__line{
  background-color: red
} */
</style>
