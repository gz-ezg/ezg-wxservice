<template>
  <div>
    <van-nav-bar
      title="服务评价"
      class="navBarCommonStyle"
    />
    <van-loading v-if="loading" style="top:45vh;left:50vw;font-size:10vw"></van-loading>
    <van-row style="background-color: rgba(255, 240, 245,1);padding:10px;margin:20px;font-size:14px;box-shadow: 5px 5px 13px #E6E8FA">
      <!-- <van-row style="border-bottom:1px solid #999;padding-bottom:5px"> -->
        <van-col span="18">
          <van-row>
            <van-col>服务人员：</van-col>
          </van-row>
          <van-row style="margin-top:2px">
            <van-col>联系方式：</van-col>
          </van-row>
          <van-row style="margin-top:2px">
            <van-col>业务名称：</van-col>
          </van-row>
        </van-col>
        <van-col span="6">
          <center><a :href="href"><van-icon name="phone" style="line-height:23px;color:red;padding:15px;font-size:20px" /></a></center>
        </van-col>
      </van-row>
    <!-- </van-row> -->
      <van-row style="margin:20px;padding:20px">
        <van-row type="flex" align="center" style="margin-top:5px">
          <van-col span="8"><span class="rate-text">服务效率：</span></van-col>
          <van-col span="16"><van-rate v-model="serviceRanks" size="24" /></van-col>
        </van-row>
        <van-row type="flex" align="center" style="margin-top:5px">
          <van-col span="8"><span class="rate-text">服务态度：</span></van-col>
          <van-col span="16"><van-rate v-model="attitudeRanks" size="24" /></van-col>
        </van-row>
        <van-row type="flex" align="center" style="margin-top:5px">
          <van-col span="8"><span class="rate-text">服务能力：</span></van-col>
          <van-col span="16"><van-rate v-model="abilityRanks" size="24" /></van-col>
        </van-row>
        <van-row style="margin-top:30px">
          <van-field rows="6" type="textarea" placeholder="请输入意见，我们会根据您的建议提供更多的服务！" v-model="customerMemo"></van-field>
        </van-row>
      </van-row>
      <van-button type="primary" bottom-action style="font-size:20px;border-radius:2px;position:fixed;bottom:0px;background-color:#952f2a;z-index:3" @click="submit" :loading="submitLoading">提交</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      serviceRanks: 5,
      abilityRanks: 5,
      attitudeRanks: 5,
      customerMemo: "",
      submitLoading: false
    }
  }
}
</script>

<style scoped>
.rate-text{
  font-size:16px;
  line-height: 16px;
}
</style>
