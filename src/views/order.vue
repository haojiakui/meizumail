<template>
  <div>
    <!--    订单页面-->
    <m-header></m-header>
    <div class="order">
      <div class="order-item ">
        <h1 class="order-title order-title_address">收货人信息</h1>
<!--      收货人信息   -->
        <ul class="address-list clearfix">
          <li v-for="(item,index) in addressData" :class="{'active':item.checked}" :key="index" class="fl address-item" @click="checkAddress(item)">
              <div class="clearfix address-title">
                <div class="fl">{{item.name}}</div>
                <div class="fr">{{item.phone}}</div>
              </div>
              <div class="address-info">
                {{item.province + item.city + item.district + item.street}}
              </div>
              <div class="address-checked" v-show="item.checked">
                <i class="iconfont icon-check address-check"></i>
              </div>
          </li>
          <li class="address-item fl address-add">
<!--            添加新地址选项-->
            <div class="address-add_icon">+</div>
            <div>添加新地址</div>
          </li>
        </ul>
      </div>
      <div class="order-item">
        <h1 class="order-title order-title_address">确认订单信息</h1>
<!--  确认订单信息      -->
        <table class="order-goods">
          <thead>
          <tr>
            <th class="goods-name">商品</th>
            <th class="goods-price">单价</th>
            <th class="goods-number">数量</th>
            <th class="goods-count">小计</th>
            <th class="goods-express">配送方式</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in orderData" :key="index" >
              <td class="goods-name">
                <img :src="item.imageUrl" alt="">
                <div class="goods-desc">
                  <p class="goods-shop">{{item.goodsName}}</p>
                  <p class="goods-shop-desc">{{item.goodsDesc}}</p>
                </div>
              </td>
              <td class="goods-price">￥{{item.goodsPrice}}</td>
              <td class="goods-number">{{item.count}}</td>
              <td class="goods-count">{{item.goodsPrice * item.count}}</td>
<!--              根据orderdata的行数，动态绑定数据 合并列-->
              <td   class="goods-express">快递配送，运费 <span class="red">￥0.00</span> </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
<!--              备注信息合并三列-->
              <td colspan="3" class="order-footer">
               <label for="1">备注：</label>
                <textarea id="1" v-model="userRemarks" placeholder="输入您想对我们说的..."></textarea>
              </td>
              <td colspan="2" class="footer-total">合计：<span class="price">￥{{checkedGoodsPrice}}</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="order-item clearfix">
        <h1 class="order-title order-title_address">选择支付方式</h1>
        <div class="order-pay">
<!--          代表每一行-->
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">支付宝</h1>
            <ul class="pay-content fl clearfix  ">
              <li>
                <input v-model="payMode" id="huabei" value="huabei" name="pay" type="radio">
                <label for="huabei"><img src="../assets/images/banks/huabei.png" alt="">
                </label>
              </li>
              <li>
                <input v-model="payMode" id="alipay" value="alipay" name="pay" type="radio">
                <label for="alipay"><img src="../assets/images/banks/alipay.png" alt=""></label>
              </li>
            </ul>
          </div>

          <div class="pay-item clearfix">
            <h1 class="pay-title fl">微信</h1>
            <ul class="pay-content fl clearfix">
              <li>
                <input v-model="payMode" id="wechat" value="wechat" name="pay" type="radio">
                <label for="wechat"><img src="../assets/images/banks/wechat.png" alt=""></label>
              </li>
            </ul>
          </div>

          <div class="pay-item clearfix">
          <h1 class="pay-title fl">网上银行</h1>
            <ul class="pay-content fl clearfix pay-bank">
              <li>
                <input v-model="payMode" id="zg" value="zhongguo" name="pay" type="radio">
                <label for="zg"><img src="../assets/images/banks/zhongguo.png" alt=""></label>

              </li>
              <li>
                <input v-model="payMode" id="js" value="jianshe" name="pay" type="radio">
                <label for="js"><img src="../assets/images/banks/jianshe.png" alt=""></label>
              </li>
              <li>
                <input v-model="payMode" id="ny" value="nongye" name="pay" type="radio">
                <label for="ny"><img src="../assets/images/banks/nongye.png" alt=""></label>
              </li>
              <li>
                <input v-model="payMode" id="gs" value="gongshang" name="pay" type="radio">
                <label for="gs"><img src="../assets/images/banks/gongshang.png" alt=""></label>
              </li>
              <li>
                <input v-model="payMode" value="jiaotong" id="jt" name="pay" type="radio">
                <label for="jt"> <img src="../assets/images/banks/jiaotong.png" alt=""></label>

              </li>
              <li>
                <input v-model="payMode" value="zhaoshang" name="pay" id="zs" type="radio">
                <label for="zs"><img src="../assets/images/banks/zhaoshang.png" alt=""></label>

              </li>
              <li>
                <input v-model="payMode" value="youzheng" name="pay" id="yz" type="radio">
                <label for="yz"><img src="../assets/images/banks/youzheng.png" alt=""></label>

              </li>
              <li>
                <input v-model="payMode" value="xingye" id="xy" name="pay" type="radio">
                <label for="xy"><img src="../assets/images/banks/xingye.png" alt=""></label>

              </li>
              <li>
                <input v-model="payMode" value="shanghai" id="sh" name="pay" type="radio">
                <label for="sh"><img src="../assets/images/banks/shanghai.png" alt=""></label>
              </li>
            </ul>
          </div>
<!--          上第二行-->
<!--          demo1-->
          <ul class="order-total">
            <li class="clearfix">
              <div class="fl">总金额:</div>
              <div class="fr">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="clearfix">
              <div class="fl">运费</div>
              <div class="fr">￥0</div>
            </li>
            <li class="order-line"></li>
            <li class="clearfix">
              <div class="fl">应付</div>
              <div class="fr order-price">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="order-btn">
              <a href="javascript:;" class=" btn success" @click="pushOrder">下单并支付</a>
            </li>
          </ul>
          <!--          demo1-->
        </div>
      </div>
    </div>
    <v-dialog
            :show.sync="dialogShow" :confirm-btn-show="false" :cancel-btn-show="false"
            :width="300" :height="150"  @changeShow = 'closeShow'
    >
      <div>
        <i class="iconfont icon-check-circle add-success"></i>成功提交订单  <br>
        <a href="javascript:;"   class="go-shopcart" @click="goToIndex">返回首页</a>
      </div>
    </v-dialog>
    <m-footer></m-footer>

  </div>
</template>

<script>
  import vDialog from '../components/vdialog'
  import mHeader from '../components/mHead'
  import mFooter from '../components/mFooter'
  import  { mapGetters,mapMutations } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'order',
    components:{
      mHeader,mFooter,vDialog
    },
    data(){
      return {
        addressData:[],
        payMode: '',
        userRemarks:null,
        dialogShow:false
      }
    },
    methods:{
      ...mapMutations([
        'REMOVE_GOODS'
      ]),
      //获取收货人信息
       async getAddressData() {
         const {data} = await axios.get('/api/addressData')
         this.addressData = data
       },
      closeShow(){
        this.dialogShow = false
      },
      goToIndex(){
        this.$router.push({
          name:'Index'
        })
      },
    //  选中地址后绑定样式
      checkAddress(val){
         this.addressData.forEach(e=>{
           e.checked = false
           if(e.id === val.id  ){
             e.checked = true
           }
         })
      },
      //结算按钮：将用户选中的地址，选中的商品，以及支付方式提交给后台
      pushOrder (){
        const date = new Date()

        const address = this.addressData.filter(e=>e.checked)[0]  //过滤当前用户选择的地址，由于是个数据集合，所以拿到第0个数据
        const data = {
          orderId: date.getTime(),
          address,
          orderData:this.orderData,
          price:this.checkedGoodsPrice,
          time:date,
          payMode: this.payMode,
          remarks:this.userRemarks
        }
        this.REMOVE_GOODS()
      //  在这里使用axios提交到后台
      //   axios.post('127.0.0.1:8888',data).then(response=> {
      //     console.log(response);
      //     console.log(11);
      //   })
      //     .catch( error => {
      //       console.log(data);
      //       console.log(error);
      //     })
      //   console.log(data);
        this.dialogShow = true
      }
    },
    computed:{
      ...mapGetters([
        'checkedGoodsPrice' //引入商品总价
  ]),
     orderData(){
       //取到shopCartData中checked为true的那一项 （已经选中的商品）
       return this.$store.state.shopCartData.filter(e=> e.checked)
     }
    },
    mounted() {
      this.getAddressData()
    }
  }
</script>

<style lang="less" scoped>
.order{
  width: 1240px;
  margin: 0 auto 60px;
  .order-item{
    margin-top: 10px;
    padding: 0 40px 10px;
    background: #fff;
  }
  .order-title{
    padding: 20px 0;
    font-size: 18px;
    color: black;
    font-weight: bold;
    text-indent: 10px; //文本缩进
    /**/
  }
  .order-title_address{
    border-bottom: 1px solid #efefef;
  }
  .address-list{
    margin-top: 30px;
    padding-left: 12px;
    .address-item {
      width: 275px;
      height: 144px;
      margin: 0 12px 30px 0;
      border: 1px solid #efefef;
      padding: 15px;
      transition: border .3s;
      cursor: pointer;
      position: relative;
      &:hover,&.active{
        border-color: #00c3f5;
      }
    }
    .address-title{
      font-size: 12px;
      font-weight: bold;
      color: black;
      border-bottom: 1px solid #efefef;
      line-height: 25px;
    }
    .address-info{
      font-size: 12px;
      padding: 10px;
      word-break: break-all; //强制换行1
      word-wrap: break-word; //强制换行2
    }
    .address-checked{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-right:30px solid #00c3f5;
      border-top: 30px solid transparent;
    }
  /*  √图标*/
    .address-check{
      position: absolute;
      right: -28px;
      color: #fff;
      bottom: 2px;
      font-size: 10px;
    }
    .address-add{
      text-align: center;
      transition: color .8s;
      &:hover{
        color: #00c3f5;
      }
      .address-add_icon{
        font-size: 30px;
        margin-top: 30px;
        margin-bottom: 10px;
        line-height: 1;
      }
    }
  }
  .order-goods{

    border: 1px solid #efefef;
    thead {
      tr{
        height: 63px;
        border-bottom: 1px solid #efefef;
      }
      .goods-number,.goods-count,.goods-express{
        font-size: 18px;
        color: black;
      }
      .goods-name{
        font-size: 12px;
        font-weight: 400;
        color: #666;

      }
    }

    tbody tr{
      border-bottom: 1px solid #efefef;
    }
    tfoot tr{
      background: #f5f5f5;
    }
    .goods-name{
      width: 438px;
      padding-left: 10px;
      text-align: left;
      cursor: pointer;
      img{
        width: 120px;
        height: 120px;
        vertical-align: middle;
      }
      .goods-desc{
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        width: 300px;
         overflow: hidden;
        .goods-shop{
          font-size:  16px;
          color: #262626;
        }
        .goods-shop-desc{
          margin-top: 10px;
          color: #999;
          font-size: 14px;
          /*line-height: 1;*/
        /* 溢出隐藏 */
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }
      }
    }
    .goods-price{
      width: 225px;
      font-weight: bold;
      text-align: center;
      font-size: 18px;
      color: black;
    }
    .goods-number{
      width: 139px;
      font-weight: bold;
      text-align: center;
    }
    .goods-count{
      width: 173px;
      text-align: right;
      font-weight: bold;
      padding-right: 20px;
      color: #e02b41;
      font-size: 18px;
    }
    .goods-express{
      width: 184px;
      text-align: center;
      color: #999;
      border-left: 1px solid #efefef;
      .red{
        color: #e02b41;
        font-weight: bold;
      }
    }
    .order-footer{
      padding: 15px  20px;
      font-size: 12px;
    }
    textarea{
      width: 552px;
      height: 58px;
      border: 1px solid #efefef;
      padding: 5px;
      outline: 0;
      resize: none; //去除用户自定义宽高
      background: #fff;
      margin-left: 5px;
      vertical-align: middle;
    }
    .footer-total{
      text-align: right;
      color: #e02b41;
      padding: 15px 20px;
      font-weight: bold;
      .price{
        font-size: 22px;

      }
    }
  }
/*  支付方式下*/
  .order-pay{
    padding: 40px 26px 14px;
    border: 1px solid #efefef;
    .pay-item{
      margin-bottom: 26px;
    }
    .pay-title{
      width: 60px;
      height: 40px;
      line-height: 40px;
      color: #333;
      font-size: 14px;
      margin: 0 20px 0 0;
    }
    .pay-content{
      li{
         float: left;
        margin-right: 40px;
        margin-bottom: 26px;
       }
      input{
        vertical-align: middle;
        margin-right: 20px;
      }
      img{
        vertical-align: middle;
      }
    }
    .pay-bank{
      width: 1020px;
    }
  }
  .order-total{
    width: 318px;
    float: right;
    margin-top:  30px;
    li{
      margin-bottom: 20px;
    }
    .order-btn{
      text-align: right;
    }
    .order-price{
      color: #e02b41;
      font-weight: bold;
      font-size: 20px;
    }
    .order-line{
      height: 1px;
      background: #efefef;
    }
  }
/*  支付方式上*/

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