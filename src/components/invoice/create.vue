<template>
  <div>
    <van-row style="padding-bottom:60px">
      <van-cell-group>
        <van-field v-model="enterpriseName" label="单位名称" placeholder="请输入单位名称" required />
        <van-field v-model="taxNum" label="纳税人识别号" placeholder="请输入纳税人识别号" required />
        <div style="display:flex;justify-content:center;" class="van-cell">
          <span style="max-width:24vw;flex:1" class="van-cell--required">发票类型</span>
          <span style="flex:1;" >
            <van-radio-group v-model="invoiceType" style="line-height:2em">
              <van-row :gutter="20">
                <van-col span="12">
                  <van-radio name="普通发票" style="font-size:12px;line-height:1.6em">普通发票</van-radio>
                </van-col>
                <van-col span="12">
                  <van-radio name="增值税专用发票" style="font-size:12px;line-height:1.6em">增值税专用发票</van-radio>
                </van-col>
              </van-row>
            </van-radio-group>
          </span>
        </div>
        <div v-if="invoiceType == '增值税专用发票'">
          <van-field v-model="registerAddress" label="单位地址" placeholder="请输入单位地址" :required="invoiceType=='增值税专用发票'" />
          <van-field v-model="registerTel" label="单位联系方式" placeholder="请输入单位联系方式" :required="invoiceType=='增值税专用发票'" />
          <van-field v-model="bank" label="开户行" placeholder="请输入对公账户开户行" :required="invoiceType=='增值税专用发票'" />
          <van-field v-model="bankAccount" label="对公账号" placeholder="请输入对公账户账号" :required="invoiceType=='增值税专用发票'" />
        </div>
        <div style="display:flex;justify-content:center;" class="van-cell">
          <span style="max-width:24vw;flex:1" class="van-cell--required">发票内容</span>
          <span style="flex:1;" >
            <van-radio-group v-model="invoiceContent" style="line-height:2em">
              <van-row :gutter="20">
                <van-col span="12">
                  <van-radio name="技术服务费" style="font-size:12px;line-height:1.6em">技术服务费</van-radio>
                </van-col>
                <van-col span="12">
                  <van-radio name="咨询费" style="font-size:12px;line-height:1.6em">咨询费</van-radio>
                </van-col>
                <van-col span="12" style="margin-top:5px">
                  <van-radio name="服务费" style="font-size:12px;line-height:1.6em">服务费</van-radio>
                </van-col>
              </van-row>
            </van-radio-group>
          </span>
        </div>
        <van-field v-model="taxMoney" label="开票金额" placeholder="请输入开票金额(单位:元)" required/>
        <div style="display:flex;justify-content:center;" class="van-cell">
          <span style="max-width:24vw;flex:1" class="van-cell--required">领取方式</span>
          <span style="flex:1;" >
            <van-radio-group v-model="expressType" style="line-height:2em">
              <van-row :gutter="20">
                <van-col span="8">
                  <van-radio name="自取" style="font-size:12px;line-height:1.6em">自取</van-radio>
                </van-col>
                <van-col span="8">
                  <van-radio name="快递" style="font-size:12px;line-height:1.6em">快递</van-radio>
                </van-col>
                <van-col span="8">
                  <van-radio name="邮箱" style="font-size:12px;line-height:1.6em">邮箱</van-radio>
                </van-col>
              </van-row>
            </van-radio-group>
          </span>
        </div>
        <div v-if="expressType=='邮箱'">
          <van-field v-model="email" label="邮箱" placeholder="请输入电子邮箱地址" required />
        </div>
        <div v-if="expressType=='快递'">
          <van-field v-model="receiver" label="收件人" placeholder="请输入收件人姓名" required />
          <van-field v-model="receiverMobile" label="联系方式" placeholder="请输入联系方式" required />
          <van-field v-model="receiverAddress" label="收件人地址" placeholder="请详细输入收件人地址" type="textarea" required />
        </div>
        <van-field v-model="taxMemo" placeholder="请输入备注" label="备注" type="textarea"  />
      </van-cell-group>
      <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px;position:fixed;bottom:0px;background-color:#952f2a;z-index:3" @click="valid_data">提交</van-button>
    </van-row>
  </div>
</template>

<script>
import schema from 'async-validator'

export default {
  data(){
    return {
      loading: false,
      enterpriseName: "",
      taxNum: "",
      invoiceContent: "技术服务费",
      invoiceType: "普通发票",
      expressType: "自取",
      taxMoney: "",
      receiver: "",
      receiverMobile: "",
      receiverAddress: "",
      taxMemo: "",
      email: "",
      registerAddress: "",
      registerTel: "",
      bank: "",
      bankAccount: ""
    }
  },
  methods: {
    valid_data(){
      let _self = this

      let descriptor = {
        enterpriseName: { type: "string", required: true, message: "请输入单位名称！" },
        taxNum: { type: "string", required: true, message: "请输入纳税人识别号！" },
        invoiceContent: { type: "string", required: true, message: "请输入发票内容！" },
        taxMoney: { type: "string", required: true, message: "请输入开票金额！" },
      }

      if(_self.invoiceType == "普通发票"){
        // Object.assign(descriptor, temp)
        // console.log(descriptor)
      }else{
        let temp = {
          registerAddress: { type: "string", required: true, message: "请输入单位地址！" },
          registerTel: { type: "string", required: true, message: "请输入单位联系方式！" },
          bank: { type: "string", required: true, message: "请输入开户行！" },
          bankAccount: { type: "string", required: true, message: "请输入对公账号账号！" }
        }
        Object.assign(descriptor, temp)
        // console.log(descriptor)
      }

      if(_self.expressType == "自取"){
        // console.log(descriptor)
      }else if(_self.expressType == "邮箱"){
        let temp2 = {
          email: { type: "string", required: true, message: "请输入对公账号账号！" }
        }
      }else{
        let temp2 = {
          receiver: { type: "string", required: true, message: "请输入收件人！" },
          receiverMobile: { type: "string", required: true, message: "请输入收件人联系方式！" },
          receiverAddress: { type: "string", required: true, message: "请输入收件人地址！" }
        }

        Object.assign(descriptor, temp2)
        // console.log(descriptor)
      }

      var validator = new schema(descriptor);
        validator.validate(
          {
            enterpriseName: _self.enterpriseName,
            taxNum: _self.taxNum,
            invoiceContent: _self.invoiceContent,
            taxMoney: _self.taxMoney,
            registerAddress: _self.registerAddress,
            registerTel: _self.registerTel,
            bank: _self.bank,
            bankAccount: _self.bankAccount,
            email: _self.email,
            receiver: _self.receiver,
            receiverMobile: _self.receiverMobile,
            receiverAddress: _self.receiverAddress,
          }, (errors, fields) => {
            if(errors) {
              console.log(errors)
              // console.log(fields)
              //  这里写一个异常处理函数，弹窗
              _self.$toast.fail(errors[0].message)
              return 1;
              // return handleErrors(errors, fields);
            }else{
              _self.submit()
            }
          }
        );
    },
    submit(){
      let _self = this
      let url = `api/store/customer/saveCustomerInvoice`

      _self.loading = true

      let config = {
        taxMemo: _self.taxMemo,
        invoiceType: _self.invoiceType,
        enterpriseName: _self.enterpriseName,
        taxNum: _self.taxNum,
        invoiceContent: _self.invoiceContent,
        expressType: _self.expressType,
        taxMoney: _self.taxMoney,
        registerAddress: _self.registerAddress,
        registerTel: _self.registerTel,
        bank: _self.bank,
        bankAccount: _self.bankAccount,
        email: _self.email,
        receiver: _self.receiver,
        receiverMobile: _self.receiverMobile,
        receiverAddress: _self.receiverAddress,
        deleteFlag: 0,
        invoiceStatus: "applied",

      }

      function success(res){
        _self.loading = false
        _self.enterpriseName= ""
        _self.taxNum= ""
        _self.invoiceContent= "技术服务费"
        _self.invoiceType= "普通发票"
        _self.expressType= "自取"
        _self.taxMoney= ""
        _self.registerAddress= ""
        _self.registerTel= ""
        _self.bank= ""
        _self.bankAccount= ""
        _self.email= ""
        _self.receiver= ""
        _self.receiverMobile = ""
        _self.receiverAddress = ""
        _self.taxMemo = ""
      }

      function fail(err){
        _self.loading = false
      }

      this.$Post(url, config, success, fail)
    }
  }
}
</script>


<style>
.van-icon::before {
    vertical-align: top;
}
</style>
