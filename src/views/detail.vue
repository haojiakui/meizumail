<template>
  <div class="bg-white">
    <my-header></my-header>
    <div class="detail-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="arrow">></span>
        <span>全部</span>
        <span class="arrow">></span>
        <span class="last-bread">手机</span>
      </div>
      <div class="clearfix">
        <div class="fl detail-images"><images-list :data="infoData.colorImageUrls" type="big"></images-list></div>
        <div class="fl detail-props">
          <h1 class="prop-title">{{infoData.goodsName}}</h1>
          <p class="prop-desc">{{infoData.goodsDesc}}</p>
          <div class="prop-sale">
            <span class="prop-name">价<span class="prop-space"></span>格:</span><span class="prop-price">￥{{infoData.goodsPrice}}</span>
          </div>
          <div>
            <span class="prop-name">支<span class="prop-space"></span>持:</span>
            <ul class="service-list">
              <li class="list-item"><i class="iconfont icon-check-circle"></i>百城速达</li>
              <li class="list-item"><i class="iconfont icon-check-circle"></i>顺丰包邮</li>
              <li class="list-item"><i class="iconfont icon-check-circle"></i>七天无理由退货</li>
            </ul>
          </div>
          <div >
            <span class="prop-name">服<span class="prop-space"></span>务:</span>
            <span>本商品由 魅族 负责发货并提供售后服务</span>
          </div>
          <div>
            <span class="prop-name" >数<span class="prop-space"></span>量:</span>
            <div class="clearfix prop-number">
              <input type="number" class="fl prop-input" v-model="puchrchaseQuantity" >
              <div class="fl change-box" >
                <div class="change-value"   @click="increase" >+</div>
                <div class="change-value"  @click="decrease">-</div>
              </div>
            </div>
          </div>
           <div class="prop-buy">
             <a href="javascript:;" class="btn danger mr20" @click="purchase">立即购买</a>
             <a href="javascript:;" class="btn success" @click="addCart">加入购物车</a>
           </div>
        </div>
      </div>
<!--      详情-->
      <div class="detail-info_wrapper">
        <div class="detail-info">
          <a href="" class="info-title">商品详情</a>
        </div>
        <img class="detail-images2" :src="item" alt="" v-for="(item,index) in infoData.information" :key="index">
      </div>
<!--      详情-->
    </div>
    <v-dialog
            :show.sync="dialogShow" :confirm-btn-show="false" :cancel-btn-show="false"
            :width="300" :height="150"  @changeShow = 'closeShow'
    >
      <div>
        <i class="iconfont icon-check-circle add-success"></i>成功加入购物车 <br>
        <a href="javascript:;"   class="go-shopcart" @click="goToCart">进入购物车</a>
      </div>
    </v-dialog>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myHeader from '../components/mHead'
  import myFooter from '../components/mFooter'
  import imagesList from '../components/imagesList'
  import vDialog  from '../components/vdialog'
  import axios from 'axios'
  export default {
    name: 'detail',
    components:{
      myHeader,myFooter,imagesList,vDialog
    },
    data(){
      return {
        infoData: {} ,//用于存储获取到的商品详情
        puchrchaseQuantity: 1,
        dialogShow : false //弹框显示
      }
    },
  mounted() {
    this.getDetail(this.$route.params.id) //这个id通过路由的组件的params获取
  },
    methods:{
      async getDetail(id){
        const {data} = await axios(`/api/categoryList/${id}`);
        this.infoData = data
      },
      //  购物车加减按钮事件
      increase(){
        this.puchrchaseQuantity = parseInt(this.puchrchaseQuantity) + 1   // 防止在输入状态下值由数字转为字符串
      },
      decrease(){
       if(this.puchrchaseQuantity > 1){ //防止成为负数
         this.puchrchaseQuantity = parseInt(this.puchrchaseQuantity) - 1
       }
      },
    //  加入购物车： 本质上向mutations发射数据，然后由mutations负责处理
      addCart(){

        this.$store.commit('addShopCart', {
          data:this.infoData,//购物的内容
          num:parseInt(this.puchrchaseQuantity) //数量
        })
      //  加入购物车还要有弹框提示
        this.dialogShow = true

      },

      //立即购买按钮
      purchase(){
        //要跳转到购物页面 ，先放置
        this.$store.commit('addShopCart', {
          data:this.infoData,//购物的内容
          num:parseInt(this.puchrchaseQuantity) //数量
        })
        this.goToCart()
      },
      //进入购物车
      goToCart(){
        this.$router.push({
          name:'shopcart'
        })
      },
      closeShow(con){
        this.dialogShow = con
      }
    }
  }
</script>

<style lang="less" scoped>
  .bg-white{
    background: white;
  }
  .detail-wrapper{
    width: 1240px;
    margin: 0 auto;
  .detail-images{
    width: 495px;
  }
  }
  .bread{
    height: 40px;
    line-height: 40px;
    .arrow,.last-bread{
      color: #999;
    }
  }
.detail-props{
  width: 675px;
  font-size: 12px;
  .prop-title{
    font-size: 24px;
    color: #000;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .prop-desc{
    font-size: 16px;
    color: #e22841;
    margin-bottom: 15px;
  }
  .prop-name{
    padding: 0 10px;
    line-height: 34px;
    .prop-space{
      padding: 0 12px;
    }
  }
}
  .prop-sale{
    height: 55px;
    background: #f5f5f5;
    margin-bottom: 26px;
    .prop-price{
      font-size: 24px;
      color: #e02b41;
      line-height: 55px;
    }
  }
  .service-list{
    display: inline-block;
    .list-item{
      display: inline-block;
      margin-right: 20px;
      i{
        margin-right: 5px;
        color: #00c3f5;
      }

    }
  }
  .prop-number{
    display: inline-block;
    vertical-align: middle;
    .prop-input{
      width: 53px;
      height: 38px;
      line-height: 38px;
      border: 1px solid #dcdcdc;
      color: #333;
      text-align: center;
    }
    .change-box{
      margin-left: 6px;
    }
    .change-value{
      width: 20px;
      height: 16px;
      font-size: 14px;
      color: #666;
      border: 1px solid #dcdcdc;
      line-height: 14px;
      cursor: pointer;
      text-align: center;
      &:last-child{
        margin-top: 6px;
      }
    }
  }
  .prop-buy{
    margin-top: 17px;
    .mr20{
      margin-right: 20px;
    }
  }
  .detail-info_wrapper{
    font-size: 0;
    margin-top: 60px;
    margin-bottom: 80px;
    .detail-info{
      height: 62px;
      border-bottom: 1px solid #dcdcdc;
    }
    .info-title{
      font-size: 16px;
      height: 62px;
      line-height: 62px;
      color: #00c3f5;
      border-bottom: 1px solid #00c3f5;
      padding: 0 20px;
      margin-bottom: -1px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: inline-block;
    }
  }
  .detail-images2{
    width: 1240px;
  }

  .add-success{
    color: #00c3f5;
    margin-right: 5px;
    vertical-align: middle;
  }
  .go-shopcart{
    color:#00c3f5;
    text-decoration: underline;
  }
</style>