<template>
  <div>
    <m-head></m-head>
    <div class="swiper-wraper">
      <swiper :data = "swiperData"></swiper>
    </div>
    <div>广告图</div>
    <div>展示区</div>
    <div>底部</div>
  </div>
</template>

<script>
  import mHead from '../components/mHead'
  import swiper from '../components/swiper'
  import axios from 'axios' //导入axios
  export default {
    name: 'index',
    components:{
      mHead,
      swiper
    },
    data(){
      return {
        swiperData:[]
      }
    },mounted() {
      this.getswiperData()
    },
    methods:{
      async getswiperData(){
        const {data} = await axios.get('/api/advertise')
        this.swiperData = data  //然后将这个值传递给子组件
      }
    }
  }
</script>

<style lang="less" scoped>
.swiper-wraper{
  width: 1240px;
  height: 500px;
  position: relative;
  margin: 0 auto;
}
</style>