<template>
  <div>
    <van-popup v-model="honorShow" style="width:100vw;height:100vh">
      <van-nav-bar class="navBarStyle" title="企业荣誉" @click-left="honorShow=false">
        <div slot="left"><van-icon name="close" /></div>
      </van-nav-bar>
      <van-loading v-if="loading" style="top:10vh;left:45vw"></van-loading>
      <van-cell v-for="(item,index) in data" :key="index" v-if="!loading">
          <div v-if="type=='ry'">
            <van-row v-for="(item, index) in data" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;line-height:1.7em" gutter="20">
              <van-col span="24" style="font-size:16px;font-weight:900">{{item.XMMC}}</van-col>
              <van-col span="16" v-if="item.XMLB != '          '">{{item.XMLB}}</van-col>
              <van-col span="16" v-if="item.XMLB == '          '" style="visibility:hidden">1</van-col>
              <van-col span="8" style="text-align:right">{{item.NF}}</van-col>
              <van-col span="24">{{item.SBXM}}</van-col>
            </van-row>
          </div>
          <div v-if="type=='zl'">
            <van-row v-for="(item, index) in data" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;line-height:1.7em" gutter="20">
              <van-col span="24" style="font-size:16px;font-weight:900">{{item.MC}}</van-col>
              <van-col span="12">{{item.Type}}</van-col>
              <van-col span="12" style="text-align:right">{{item.SQRQ}}</van-col>
            </van-row>
          </div>
          <div v-if="type=='rz'">
            <van-row v-for="(item, index) in data" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;line-height:1.7em" gutter="20">
              <van-col span="24" style="font-size:16px;font-weight:900">{{item.SoftName}}</van-col>
              <van-col span="12">{{item.SoftID}}</van-col>
              <van-col span="10" style="text-align:right">{{item.TypeNum}}</van-col>
              <van-col span="22" style="text-align:right">{{item.SuessDate}}</van-col>
            </van-row>
          </div>
          <div v-if="type=='sb'">
            <van-row v-for="(item, index) in data" :key="index" style="padding-bottom:5px;border-bottom: 1px solid #ccc;padding-bottom:5px;padding-top:5px;line-height:1.7em" gutter="20">
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
          </div>
        </van-cell>
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      honorShow: false,
      type: "",
      data: [],
      loading: false
    }
  },
  methods:{
    get_data(companyId, type){
      let _self = this
      let url = `api/store/customer/company/bmj/list`
      _self.data = []
      _self.loading = true
      let config = {
        params: {
          type: type,
          // companyId: companyId
          companyId: 33744
        }
      }

      function success(res){
        // console.log(res.data.data.Datas)
        _self.data = res.data.data.Datas
        _self.loading = false
      }

      function fail(err){
        _self.loading = false
        _self.$toast.fail(err.data.msg)
      }

      this.$Get(url, config, success, fail)
    }
  },
  created(){
    let _self = this
    _self.$bus.off("OPEN_HONOR_DETAIL", true)
    _self.$bus.on("OPEN_HONOR_DETAIL", (e)=>{
      _self.get_data(e.companyId, e.type)
      _self.type = e.type
      _self.honorShow = true
    })
    }
  }
</script>

<style>
.navBarStyle{
  color:white!important;
  background-color: #952f2a!important;
}
</style>

