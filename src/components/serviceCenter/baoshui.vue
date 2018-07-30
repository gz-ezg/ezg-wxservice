<template>
  <van-row>
    <van-nav-bar
      style="background-color: #CC3300;color:white"
      :title="title"
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
            服务会计：{{serviceName}}
          </van-row>
          <van-row>
            联系方式：{{tel}}
          </van-row>
          <van-row>
            服务税期：{{serviceRange}}
          </van-row>
        </van-col>
        <van-col span="6">
          <center><a :href="href"><van-icon name="phone" style="line-height:23px;color:red;padding:15px;font-size:20px" /></a></center>
        </van-col>
      </van-row>
      <van-row style="margin-top:5px">
        <van-col span="14">服务不满意？<a href="/#/complain">我要投诉</a></van-col>
      </van-row>
    </van-row>

  <van-cell-group>
    <van-cell title="增值税" value="13521.43元" />
    <van-cell title="企业所得税" value="13521.21元" />
    <van-cell title="个税" value="12345.12" />
    <van-cell title="附加税" value="365.21" />
  </van-cell-group>

  <van-swipe>
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
  </van-row>
</template>

<script>
export default {
  data(){
    return{
      finish:true,
      tel: 13580328323,
      title: "一般纳税人代理记账",
      companyName: "广州则为信息科技有限公司",
      serviceName: "胡小红",
      serviceRange: "2018-05至2019-05"
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
    }
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
