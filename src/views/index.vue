<template>
  <div>
    <m-head></m-head>
    <div class="swiper-wraper">
      <swiper :data = "swiperData"></swiper>
      <ul class="menus">
        <li v-for="(item,index) in menuData" :key="index">
          <a :href="item.href">{{item.name}}</a>
        </li>
      </ul>
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
        swiperData:[],
        menuData:[]
      }
    },mounted() {
      this.getswiperData()
      this.getMenuData()
    },
    methods:{
      async getswiperData(){
        const {data} = await axios.get('/api/advertise')
        this.swiperData = data  //然后将这个值传递给子组件
      },
    //  轮播菜单区
      async getMenuData(){
        const {data} = await axios.get('/api/menu')
        this.menuData = data
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
  .menus{
position: absolute;
    left: 0;
    top: 0 ;
    bottom: 0;
    width: 303px;
    background-color: rgba(0,0,0,.5);
    padding-top: 17px;
    li{
      height: 57px;
      line-height: 57px;
    }
    a{
      padding-left: 40px;
      color: #fff;
      font-size: 16px;
      transition: color .3s;
      &:hover{
        color: #31a5e7;
      }
    }
  }
}
</style>