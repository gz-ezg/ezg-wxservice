<template>
  <div>
    <van-nav-bar
      style="background-color: #952f2a;color:white"
      title="项目方案"
      left-arrow
      @click-left="$backTo()"
    />
    <van-loading v-if="loading" style="top:10vh;left:45vw"></van-loading>
    <div v-if="!loading">
      点击获取项目方案（待开发）
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      loading: true
    }
  }
}
</script>
