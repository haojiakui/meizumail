<template>
  <div  class="clearfix">
    <div class="fl ad-left">
      <a :href="data[0] && data[0].href"  >
        <img :src="data[0] && data[0].imgUrl" alt="">
      </a>
    </div>
    <div class="fr">
      <div class="ad-right-top">
        <a :href="data[1] && data[1].href"  >
          <img :src="data[1] && data[1].imgUrl" alt="">
        </a>
      </div>
      <div class="clearfix ">
        <div class="fl ad-right-bottom">
          <a :href="data[2] && data[2].href"  >
          <img :src="data[2] && data[2].imgUrl" class="ad-img" alt="">
          </a>
        </div>
        <div class="fr ad-right-bottom">
          <a :href="data[3] && data[3].href"  >
            <img :src="data[3] && data[3].imgUrl" class="ad-img" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'addList',
    props:{
      data:{
        type : Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
   .ad-left{
     display: inline-block;
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