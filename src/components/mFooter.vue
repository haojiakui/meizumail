<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="clearfix">
        <ul class="fl footer-service">
          <li v-for="(item,index) in serveiceLinkData" :key="index">
            <a :href="item.href">
              <img :src="item.icon" alt=""><span>{{item.name}}</span>
            </a>
          </li>
        </ul>
        <div class="fr online-service">
          <span>周一至周日7:30-24:00</span>
          <p>400-788-3333</p>
          <a href="">在线客服</a>
        </div>
      </div>

      <hr class="footer-hr">
      <div class="clearfix">
        <div class="fl">
          <ul class="external-link">
            <li v-for="(item,index) in externalLinkData" :key="index">
              <a :href="item.href">{{item.name}}</a>
            </li>
          </ul>
          <div class="footer-rights">©2019 Meizu Telecom Equipment Co., Ltd. All rights reserved. 粤ICP备13003602号合字B2-20170010 营业执照法律声明粤公网安备 44049102496009 号</div>
        </div>
        <div class="fr subscribe">
          <a href=""><i class="iconfont">&#xe608;</i></a>
          <a href=""><i class="iconfont">&#xe609;</i></a>
          <a href=""><i class="iconfont">&#xe604;</i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  axios from 'axios'
  export default {
    name: 'mFooter',
    data (){
      return {
        serveiceLinkData:[],
        externalLinkData:[]
      }
    },
    methods:{
       async getserveiceLinkData(){
        const {data} = await axios.get('/api/serviceLink')
         this.serveiceLinkData = data
       },
      async getExternalLinkData(){
        const {data} = await axios.get('/api/externalLink')
        this.externalLinkData = data
      }
    },
    mounted() {
      this.getserveiceLinkData()
      this.getExternalLinkData()
    }
  }
</script>

<style lang="less" scoped>
.footer{
  background: #fff;
  padding: 48px 0 20px;
  border: 1px solid #efefef;
  margin-top: 20px;
  .footer-wrapper{
    width: 1240px;
    margin:  0 auto;
  }
  .footer-service{
    width: 1000px;
   li{
     display: inline-block;
     width: 240px;
     height: 57px;
     font-size: 12px;
     color: #999;
   /*   要让图片以文字参照对齐，*/
   }
    img,span{
      vertical-align: middle;
    }
  }
  .online-service{
    text-align: right;
    span{
      font-size: 12px;
      color: #999;
    }
    p{
      color: #00c3f5;
      font-size: 30px;
      font-weight: 400;
    }
  }
  .footer-hr{
    height: 1px;
    margin: 20px 0 28px;
    display: block;
    border: 0;
    border-top: 1px solid #eee;
  }
  .external-link{
    li{
      display: inline-block;
      padding-right:15px;
      margin-right: 15px;
      border-right: 1px solid #d6d6d6;
      font-size: 12px;
      color: #999;
      &:last-child{
        border-right: none;
      }
    }
  }
  .footer-rights{
    padding-top: 8px;
    font-size: 12px;
    color: #999;
  }
  .subscribe{
    margin-top: 18px;
    a{
      color: #999;
      padding-right: 10px;
      margin-right: 10px;
      border-right: 1px solid #eee;
      &:last-child{
        border-right: none;
      }
      &:hover{
        color: #31a5e7;
      }
    }
  }
}
</style>