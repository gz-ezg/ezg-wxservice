<template>
  <div>
    <van-nav-bar
      title="我的发票"
      right-text="开票"
      left-arrow
      @click-left="$backTo()"
      @click-right="create_invoice"
      class="navBarCommonStyle"
    />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    //  开票服务
    create_invoice(){
      this.$router.push({
        name: "invoiceCreate"
      })
    }
  }
}
</script>

