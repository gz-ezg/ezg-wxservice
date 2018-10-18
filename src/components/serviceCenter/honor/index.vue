<template>
  <div>
    <van-nav-bar
      style="background-color: #952f2a;color:white"
      title="企业荣誉展示"
      left-arrow
      @click-left="$backTo()"
    />
    <van-loading v-if="loading" style="top:10vh;left:45vw"></van-loading>
    <div v-if="!loading">
      <van-row style="background-color: #CCCCCC;padding:10px">
        <center>
          {{data.companyname}}
        </center>
      </van-row>
      <van-row style="background-color: #fff;line-height:2em">
        <!-- 此处跳转待定 -->
        <center @click="open_resolve" v-if="data.isNewHigh == 'Y'">
          <!-- <a href="#" style="text-decoration:none">恭喜您，您是高新企业，点击获得<span style="color:red;">高新财务解决方案</span></a>-->
          <a href="#" style="text-decoration:none">恭喜您，您是高新企业</a>
        </center>
      </van-row>
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <!-- <span slot="icon"><van-icon name="wap-home"></van-icon></span> -->
          <span slot="title">企业荣誉（{{data.ry.Total}}）</span>
          <div slot="default">
            <van-row v-for="(item, index) in data.ry.Datas" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;line-height:1.7em" gutter="20">
              <van-col span="24" style="font-size:16px;font-weight:900">{{item.XMMC}}</van-col>
              <van-col span="16" v-if="item.XMLB != '          '">{{item.XMLB}}</van-col>
              <van-col span="16" v-if="item.XMLB == '          '" style="visibility:hidden">1</van-col>
              <van-col span="8" style="text-align:right">{{item.NF}}</van-col>
              <van-col span="24">{{item.SBXM}}</van-col>
            </van-row>
            <van-row style="margin-top:10px">
              <center @click="open_popup('ry')" v-if="data.ry.Datas>='5'">点击查看更多</center>
            </van-row>
          </div>
        </van-collapse-item>
        <van-collapse-item name="2">
          <span slot="title">知识产权（{{data.zl.Total}}）</span>
          <div slot="default">
            <van-row v-for="(item, index) in data.zl.Datas" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;line-height:1.7em" gutter="20">
              <van-col span="24" style="font-size:16px;font-weight:900">{{item.MC}}</van-col>
              <van-col span="12">{{item.Type}}</van-col>
              <van-col span="12" style="text-align:right">{{item.SQRQ}}</van-col>
            </van-row>
            <van-row style="margin-top:10px">
              <center @click="open_popup('zl')" v-if="data.zl.Datas>='5'">点击查看更多</center>
            </van-row>
          </div>
        </van-collapse-item>
        <van-collapse-item name="3">
          <span slot="title">软件著作（{{data.rz.Total}}）</span>
          <div slot="default">
            <van-row v-for="(item, index) in data.rz.Datas" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;line-height:1.7em" gutter="20">
              <van-col span="24" style="font-size:16px;font-weight:900">{{item.SoftName}}</van-col>
              <van-col span="12">{{item.SoftID}}</van-col>
              <van-col span="10" style="text-align:right">{{item.TypeNum}}</van-col>
              <van-col span="22" style="text-align:right">{{item.SuessDate}}</van-col>
            </van-row>
            <van-row style="margin-top:10px">
              <center @click="open_popup('rz')" v-if="data.rz.Datas>='5'">点击查看更多</center>
            </van-row>
          </div>
        </van-collapse-item>
        <van-collapse-item name="4">
          <span slot="title">商标（{{data.sb.Total}}）</span>
          <div slot="default">
            <van-row v-for="(item, index) in data.sb.Datas" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;" gutter="20">
              <van-row>
                <van-col span="6">
                  <img :src="item.ImageUrl">
                </van-col>
                <van-col span="16" style="line-height:2em">
                  <van-col span="24" style="font-size:20px;font-weight:900">{{item.Name}}</van-col>
                  <van-col span="12">{{item.RegNo}}</van-col>
                  <van-col span="12" style="text-align:right">{{item.AppDate}}</van-col>
                </van-col>
              </van-row>
            </van-row>
            <van-row style="margin-top:10px">
              <center @click="open_popup('sb')" v-if="data.sb.Datas>='5'">点击查看更多</center>
            </van-row>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <detail></detail>
  </div>
</template>

<script>
import Detail from './detail';

export default {
  components:{
    Detail
  },
  data(){
    return {
      activeNames: [],
      loading: false,
      data: {
       companyname: "",
       isNewHigh: "N",
       ry: {
         Datas: [],
         Total: 0
       },
       rz: {
         Datas: [],
         Total: ""
       },
       sb: {
         Datas: [],
         Total: ""
       },
       zl: {
         Datas: [],
         Total: ""
       },
      },
      companyId: "",
    }
  },
  methods:{
    get_data(e){
      let url = `api/store/customer/company/bmj/detail`
      let _self = this

      _self.loading = true

      let config = {
        params:{
          companyId: e
          // companyId: "33744",
        }
      }

      function success(res){
        _self.data = res.data.data
        console.log(_self.data)
        _self.loading = false
      }

      function fail(err){
        _self.loading = false
        _self.$toast.fail(err.data.msg)
      }

      this.$Get(url, config, success, fail)
    },
    //  跳转高新解决方案
    open_resolve(e){

    },
    open_popup(e){
      console.log(e)
      let _self = this
      _self.$bus.emit("OPEN_HONOR_DETAIL", {companyId: _self.companyId, type: e})
    }
  },
  created(){
    this.companyId = this.$route.params.companyid
    this.get_data(this.$route.params.companyid)
  }
}
</script>
