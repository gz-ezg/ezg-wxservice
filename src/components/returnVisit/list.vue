<template>
  <div>
    回访列表
    <van-button type="primary" @click="to_next('returnWorkOrder')">工单评价</van-button>
    <!-- <van-button type="primary" @click="to_next('returnCycleWordOrder')">周期性回访</van-button> -->
  </div>
</template>

<script>
export default {
  methods: {
    to_next(e){
      this.$router.push({
        name: e
      })
    }
  }
}
</script>
