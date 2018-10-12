<template>
  <van-row>
    <van-nav-bar
      style="background-color: #952f2a;color:white"
      :title="detail.product"
      left-arrow
      @click-left="$backTo()"
    />
    <van-row style="background-color: #CCCCCC;padding:10px">
      <center>
        {{companyName}}
      </center>
    </van-row>
    <van-loading v-if="loading" style="top:45vh;left:50vw;font-size:10vw"></van-loading>
    <van-row style="background-color: rgba(255, 240, 245,1);padding:10px;margin:20px;font-size:14px;box-shadow: 5px 5px 13px #E6E8FA" v-if="!loading">
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
        <van-col span="14">服务不满意？<a style="color:rgb(0, 0, 238)" @click="open_complain">我要投诉</a></van-col>
        <van-col span="10" style="font-size:10px;text-align:right;line-height:17px"><van-icon name="info-o" style="line-height:1px"/> <a href="https://mp.weixin.qq.com/s/W25DatAlyJIchb7-O74Myw">做账资料注意事项</a></van-col>
      </van-row>
    </van-row>

    <van-steps direction="vertical" :active="activeIndex" active-color="#f60" v-if="!loading">
      <van-step v-for="(item, index) in workOrderList" :key="index">
        <van-row>
          <van-col span="6" >{{item.period}}</van-col>
          <van-col span="5" ><span style="line-height:21px" :class="{ underline: item.BS == 'Y'}" @click="open_baoshui(item)">报税 <van-icon name="search" v-if="item.BS=='Y' || index <=activeIndex" style="font-size:14px;color:#ccc;line-height:1px;"/><van-icon name="clock" v-if="item.BS!='Y' & index >activeIndex" style="font-size:14px;line-height:16px"/></span></van-col>
          <van-col span="5" ><span style="line-height:21px" :class="{ underline: item.BS == 'Y'}" @click="open_zuozhang(item)">做账 <van-icon name="search" v-if="item.JZ=='Y' || index <=activeIndex" style="font-size:14px;color:#ccc;line-height:1px;"/><van-icon name="clock" v-if="item.JZ!='Y' & index >activeIndex" style="font-size:14px;line-height:16px"/></span></van-col>
          <van-col span="8" ><span @click="open_report(item)" size="small" style="line-height:18px" :class="{ underline: item.BS == 'Y'}">风险评估报告</span></van-col>
        </van-row>
      </van-step>
      <van-row style="margin-top:10px">
        <div style="width:95%;font-size:14px;line-height:1em">
          <p>温馨提示：</p>
          <p style="margin:0;padding-bottom:2em;text-indent: 2em">历史的<span style="color:red">做账、报税、风险评估报告</span>可点击哦！</p>
        </div>
      </van-row>
    </van-steps>


  </van-row>
</template>

<script>
export default {
  data(){
    return{
      loading: false,
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
      tel: "",
      companyName: "无",
    }
  },
  computed:{
    href:function(){
      return "tel:" + this.tel
    }
  },
  methods:{
    open_complain(){
      let _self = this
      this.$router.push({
        name:'complain',
        params:{
          id: _self.detail.cycle_work_order_id,
          product: _self.detail.product
        }
      })
    },
    open_report(e){
      let _self = this
      console.log(e)
      if(e.id == ""){
        return
      }
      this.$router.push({
        name: 'report',
        params:{
          companyid: _self.$route.params.companyid,
          period: e.period
        }
      })
    },
    open_baoshui(e){
      let _self = this
      if(e.id == ""){
        return
      }
      this.$router.push({
        name: 'baoshui',
        params:{
          companyid: _self.$route.params.companyid,
          period: e.period
        }
      })
    },
    open_zuozhang(e){
      let _self = this
      if(e.id == ""){
        return
      }
      this.$router.push({
        name: 'zuozhang',
        params:{
          companyid: _self.$route.params.companyid,
          period: e.period
        }
      })
    },
    init(){
      let _self = this
      let url = `api/store/customer/company/showCompanyProgressInfo`
      _self.loading = true
      let config = {
        params:{
          companyId:_self.$route.params.companyid
          // companyId:33927
        }
      }

      function success(res){
        // console.log(res)
        _self.workOrderList = res.data.data.detail
        for(let i = 0;i<_self.workOrderList.length;i++){
          if(_self.workOrderList[i].BS == "Y" && _self.workOrderList[i].JZ == "Y"){
            _self.activeIndex = i
          }
        }
        _self.loading = false
      }

      function fail(err){
        _self.loading = false
      }

      this.$Get(url, config, success, fail)
    },
    get_base_info(){
      let _self = this
      let url = `api/store/customer/company/companyServiceInfo`

      let config = {
        params:{
          companyId:_self.$route.params.companyid
          // companyId:33927
        }
      }

      function success(res){
        // console.log("1111111111")
        // console.log(res.data.data[0])
        _self.tel = res.data.data.mobilePhone
        _self.detail = res.data.data
      }

      function fail(err){
        // console.log(err)
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
.underline{
  /* text-decoration:underline */
}
</style>
