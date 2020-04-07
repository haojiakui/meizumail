<template>
<div>
  <div id="app">
<router-view></router-view>
  </div>
</div>
</template>

<style>
/*@import "./assets/font/iconfont.css";*/
</style>
<script>
  import index  from './views/index'

  export default {
    comments:{
      index,
    }
  }
</script>