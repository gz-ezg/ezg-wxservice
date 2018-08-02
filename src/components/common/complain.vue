<template>
  <van-row>
    <van-nav-bar
      style="background-color: #CC3300;color:white"
      title="客服中心"
      left-arrow
      @click-left="$backTo()"
    />
    <van-row type="flex" justify="center" style="margin-top:40px">
        服务：{{product}}
    </van-row>

    <van-cell-group style="width:90%;margin:auto;margin-top:70px">
      <van-field
        v-model="content"
        type="textarea"
        rows="7"
        placeholder="请输入内容"
      />
    </van-cell-group>

    <van-dialog
      title=""
      v-model="show"
      message="亿账柜客服将尽快处理您的投诉并与您联系，请保持手机畅通！"
      show-confirm-button
      :before-close="beforeClose"
    >
    </van-dialog>

      <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px;position:fixed;bottom:0px;background-color:#cc3300" @click="submit">提交</van-button>
  </van-row>
</template>

<script>
export default {
  data(){
    return{
      show:false,
      content:"",
      product:"",
      cycle_work_order_id:""
    }
  },
  methods:{
    submit(){
      let _self = this
      let url = "api/store/customer/complaint/create"

      let config = {
          workOrderId:_self.cycle_work_order_id,
          record:_self.content
      }

      function success(res){
        _self.show = true
      }

      function fail(err){
        _self.$toast.fail("新建投诉失败！请稍后重试！")
      }

      this.$Post(url, config, success, fail)
    },
    beforeClose(){
      this.$backTo()
    }
  },
  created(){
    this.product = this.$route.params.product,
    this.cycle_work_order_id = this.$route.params.id
  }
}
</script>
