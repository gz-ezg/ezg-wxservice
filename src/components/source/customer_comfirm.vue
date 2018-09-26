<template>
  <div>
    <van-nav-bar
      style="background-color: #952f2a;color:white"
      title="交接确认"
      left-arrow
      @click-left="$backTo()"
    />
    <van-row>
      <van-field v-model="data.receiver_name" label="交接人" disabled/>
      <van-field v-model="data.connect_plan_name" label="交接方式" disabled/>
      <van-field v-model="data.tracking_number" v-if="data.connect_plan == 'express'" label="快递单号" disabled/>
    </van-row>
    <van-list>
      <van-row style="background-color:#fff;padding-top:5px"><center><h4>交接文件</h4></center></van-row>
      <van-cell-group>
        <van-cell
          v-for="item in files"
          :title="item.file_type_name"
          :value="item.connect_num"
          :label="item.companyname"
          :key="item.id"
        />
      </van-cell-group>
    </van-list>
    <van-row style="width:80%;margin:auto">

        <van-button size="large" type="danger" style="margin-top:40px" @click="agree" :loading="disabled">接 收</van-button>
        <van-button size="large" style="margin-top:10px" @click="disagree" :loading="disabled">拒 绝</van-button>

    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      connectRequestId: "",
      status: "",
      disabled: false,
      isExpress: false,
      data: {
        receiver_name: "",
        tracking_number: "",
        connect_plan_name: ""
      },
      files: []
    }
  },
  methods:{
    get_source_data(e){
      let _self = this
      let url = 'api/store/customer/file/connect/request/detail'

      let config = {
        params:{
          	connectRequestId: e
        }
      }

      function success(res){
        _self.data = res.data.data
        if(res.data.data.connect_plan == "express"){
          _self.data.connect_plan_name = "快递"
        }else{
          _self.data.connect_plan_name = "面交"
        }
        _self.files = res.data.data.files
      }

      this.$Get(url, config, success)
    },
    disagree(){
      this.status = "N"
      this.submit()
    },
    agree(){
      this.status = "Y"
      this.submit()
    },
    submit(){
      let _self = this
      _self.disabled = true
      let url = "api/store/customer/file/connect/request/dispose"
      let config = {
        connectRequestId: _self.connectRequestId,
        status: _self.status
      }

      function success(res){
        _self.disabled = false
        if(_self.status = "Y"){
          _self.$router.push({
            name:"comfirm_success"
          })
        }else{
          _self.$router.push({
            name:"comfirm_fail"
          })
        }
      }

      function fail(err){
        _self.disabled = false
      }

      this.$Post(url, config, success, fail)
    }
  },
  created(){
    let _self = this
    let id = this.$route.params.id
    _self.connectRequestId = this.$route.params.id
    this.get_source_data(id)
  }
}
</script>
