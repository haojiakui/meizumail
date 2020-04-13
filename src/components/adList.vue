<template>
<!--  渲染问题，样式问题-->
  <div class="clearfix">
<!--    左-->
    <div class="fl ad-left">
      <a :href="data[0] && data[0].href">
        <img class="ad-img" :src="data[0] && data[0].imgUrl" alt="">
      </a>
    </div>
<!--    右边-->
      <div class="fr">
<!--        右上-->
        <div class="ad-right-top">
          <a :href="data[1] && data[1].href"><img class="ad-img" :src="data[1] && data[1].imgUrl" alt=""></a>
        </div>
<!--        右下-->
        <div class="clearfix">
<!--          右下左-->
          <div class="fl ad-right-bottom"><a :href="data[2] && data[2].href"><img class="ad-img" :src="data[2] && data[2].imgUrl" alt=""></a></div>
<!--          右下右-->
          <div class="fr ad-right-bottom"><a :href="data[3] && data[3].href"><img class="ad-img" :src="data[3] && data[3].imgUrl" alt=""></a></div>
        </div>
<!--        右下-->
      </div>
  </div>
</template>

<script>
  export default {
    name: 'adList',
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.ad-left{
  width: 615px;
  height: 450px;
}
  .ad-right-top{
    width: 616px;
    height: 220px;
    margin-bottom: 10px;
  }
  .ad-right-bottom{
    width: 303px;
    height: 220px;
  }
  .ad-img{
    width: 100%;
  }
</style>