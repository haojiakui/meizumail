<template>
  <div>
    <m-head></m-head>
    <div class="swiper-wraper ">
      <swiper :data = "swiperData"></swiper>
      <ul class="menus">
        <li v-for="(item,index) in menuData" :key="index">
          <a :href="item.href">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <ul class="post-wrapper clearfix">
        <li  v-for="(item,index) in postData" :key=" index" class="fl">
          <a :href="item.href">
            <img :src="item.imgUrl" alt="">
          </a>
        </li>
    </ul>
    <div class="index-container">
      <div class="sale">
        <h3 class="title">热卖商品</h3>
        <goods-list :data="hotSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">手机</h3>
        <ad-list :data="phoneAdData"></ad-list>
        <goods-list :data="phoneSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">配件</h3>
        <ad-list :data="smartAdData"></ad-list>
        <goods-list :data="smartRecommendData"></goods-list>
      </div>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import mHead from '../components/mHead'
  import swiper from '../components/swiper'
  import axios from 'axios' //导入axios
  import goodsList from '../components/goodsList'
  import adList from '../components/adList'
  import mFooter from '../components/mFooter'
  export default {
    name: 'index',
    components:{
      mHead,
      swiper,
      goodsList,
      adList,
      mFooter
    },
    data(){
      return {
        swiperData:[],
        menuData:[],
        postData:[], //广告图
        hotSaleData:[] ,//商品组件
        phoneSaleData:[],
        smartRecommendData:[],
        phoneAdData:[], //手机
        smartAdData:[]
      }
    },
    mounted() {
      this.getswiperData()
      this.getMenuData()
      this.getPostData()
      this.getHotSaleData()
      this.getPhoneSaleData()
      this.getSmartRecommendData()
      this.getPhoneAdData() //手机数据
      this.getSmartAdData()
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
      },
    //  广告图
      async getHotSaleData(){
        const {data} = await axios.get('/api/hotSale')
        this.hotSaleData = data
      },
      //  热卖商品
      async getPostData(){
        const {data} = await axios.get('/api/post')
        this.postData = data

      },
    //  手机，配件
      async getPhoneSaleData(){
        const {data} = await axios.get('/api/phoneSale')
        this.phoneSaleData = data

      },
      async getSmartRecommendData(){
        const {data} = await axios.get('/api/smartSale')
        this.smartRecommendData = data

      },
      async getPhoneAdData(){
        const {data} = await axios.get('/api/phoneRecommend')
        this.phoneAdData = data

      },
      async getSmartAdData(){
        const {data} = await axios.get('/api/smartRecommend')
        this.smartAdData = data

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
  /*广告区*/
  .post-wrapper{
    width: 1240px;
    margin:  10px auto 50px;
    li{
      width: 303px;
      height: 180px;
      margin-right: 9px;
      &:last-child{
        margin-right: 0;
      }
      a{
        transition: opacity .3s ease-in-out;
        &:hover{
          opacity:.7;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
.index-container{
  width: 1240px;
  margin:  0 auto;
  .title{
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .sale{
    margin-bottom: 50px;
  }
}
</style>