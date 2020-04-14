<template>
  <div>
    <m-head></m-head>
<!--    cartData.length > 0-->
    <div v-if="cartData.length > 0" class="shopCart_wrapper">
     <table class="shopCart_header">
       <tr>
         <td class="cart_select">
           <input type="checkbox" id="cart_checkbox" @click="checkedAllGoods " :checked="isAllChecked" class="cart_checkbox">
           <label for="cart_checkbox"><span>全选</span></label>
         </td>
         <td class="cart_name">商品</td>
         <td class="cart_price">单价(元)</td>
         <td class="cart_num">数量</td>
         <td class="cart_total">小计(元)</td>
         <td class="cart_operate">操作</td>
       </tr>
     </table>
<!--   购物车单个商品   -->
      <div class="shopCartList">
        <table>
          <tr v-for="(item,index) in cartData" :key = "index" class="cart-product">
            <td class="cart_select">
                <input type="checkbox" :checked="item.checked" @click="checkedGoods(item.id)" class="cart_checkbox" >
              <img :src="item.imageUrl" class="cart-img" alt="">
            </td>
            <td class="cart_name">
              <span class="cart-title">{{item.goodsName}}</span>
              <span class="cart-desc">{{item.goodsDesc}}</span>
            </td>
            <td class="cart_price">
              ￥{{item.goodsPrice}}
            </td>
            <td class="cart_num">
              <div class="cart-input clearfix">
                <button class="fl" @click='decrease(item.id)' >-</button>
                <input type="number" class="fl" v-model="item.count">
                <button class="fl" @click='increase(item.id)'>+</button>
              </div>
            </td>
            <td class="cart_total">￥{{item.count * item.goodsPrice}}</td>
            <td class="cart_operate"><i class="iconfont icon-close deleteIcon" @click="delGoods(item.id)"></i></td>
          </tr>
        </table>
<!--        购物车内的商品项-->
      </div>
<!--      购物车底部结算列表项-->
      <div class="clearfix shopCart-footer">
        <div class="fl">
<!--          左边-->
          <input type="checkbox" id="cart_checkbox2" :checked="isAllChecked" @click="checkedAllGoods " class="cart_checkbox">
          <label for="cart_checkbox2"><span>全选</span></label>
          <span class="footer-remove">删除选中的商品</span>
          <span>共<span class="footer-number gray">{{shopCartTotal}}</span>件商品，
            已选<span class="footer-number blue ">{{checkGoodsTotal}}</span>件商品</span>
        </div>
        <div class="fr">
<!--          右边-->
          <span>已优惠 <span class="footer-number red">{{0.0}}</span>元，合计(不含运费)<span class="footer-number red footer-total">￥{{checkedGoodsPrice}}</span>  </span>
          <a href="javascript:;" class="btn success" :class="{'cancel':checkGoodsTotal<=0}">去结算</a>
        </div>
      </div>
<!--      购物车底部结算列表项-->
    </div>
<!--    如果购物车内无数据，就显示下方内容-->
    <div v-else class="shopCart-empty">
        <div class="empty-content">
          <div class="empty-left"></div>
          <div class="empty-right">
            <p class="empty-desc">购物车内无商品，快去选购吧！</p>
            <a href="javascript:;" @click="goToIndex" class="btn success">返回商城首页</a>
          </div>
        </div>
    </div>




    <v-dialog
            :show ="dialogShow"  @changeShow = 'closeShow'
            title = "提示" :width = 450 :height = 120
            @confirm = "confrimdelete"
    >
      <div style="height: 120px;line-height: 120px">您确定要删除么</div>
    </v-dialog>
    <m-footer></m-footer>

  </div>

</template>

<script>
  import mHead from '../components/mHead'
  import mFooter from '../components/mFooter'

  import vDialog from '../components/vdialog'
  import { mapMutations ,mapGetters } from 'vuex' //引入辅助函数用于提交  按钮增减数量
  // import { mapGetters } from 'vuex'
  export default {                    //用于mapGettters 判断是否为全选状态  在computed下使用
    name: 'shopCart',
    components:{
      mHead,mFooter , vDialog
    },
    data(){
      return {
        dialogShow: false,
        currentId:null //点击删除目标商品时的临时存放的值
      }
    },
  //  组件想要拿到购物车的数据，需要使用计算属性调用
    computed:{
       cartData(){
        return this.$store.state.shopCartData
      },
      ...mapGetters([
        'isAllChecked' ,//全选凭证
        'checkGoodsTotal',//单个商品数量
        'checkedGoodsPrice',//单个商品总价
        'shopCartTotal',//选中商品的总价
      ])
    },
    methods:{
      ...mapMutations([ //前提是需要先导入
        'INCREASE_SHOPCART', //将mutation里的方法映射到该组件内
        'DECREASE_SHOPCART',
        'CHECK_GOODS',
        'CHECK_ALL_GOODS',
        'DEL_SHOPCART' //移除单个商品
        //等同于this.$store.commit('DECREASE_SHOPCART') =》
      //  https://vuex.vuejs.org/zh/guide/mutations.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%8F%90%E4%BA%A4-mutation
      ]),
      decrease(id){
        this.DECREASE_SHOPCART(id)
      },
      increase(id){
        this.INCREASE_SHOPCART(id)
      },
     goToIndex(){
       this.$router.push({
         name:'Index'
       })
     },
      //移除某单个购物商品
      delGoods(id){
        // 要想弹框，改变dialogShow的值
        this.dialogShow = true
        this.currentId = id
      } ,
    //  点击改变选中状态，并在state中改变check状态
      checkedGoods(id){
        this.CHECK_GOODS(id)
      },
      //全选与全不选  根据isAllChecked作为判断是否全选的依据
      checkedAllGoods(){
        this.CHECK_ALL_GOODS(this.isAllChecked)
        console.log(`这是问题，${this.isAllChecked}`);
      },
      //接受子组件传递过来的值，(点击弹框的关闭按钮，隐藏)
      closeShow(con){
        this.dialogShow = con
      },
      //接受子组件传递过来的值，(点击弹框的确定按钮，删除商品项)
      confrimdelete(){
        this.DEL_SHOPCART(this.currentId)
      //  由于这是一个公用组件，找不到商品id 所以将这个id存一个临时值，再调用这个id
        this.dialogShow = false //删除后将这个框隐藏掉
      }
    },
  }
</script>

<style lang="less" scoped>
  /*复选框样式*/
  .cart_checkbox{
    width: 13px;
    height: 13px;
    border-color: #dbdbdb;
    display: inline-block;
    background: #fff;
    border-radius: 2px;
    font-size: 10px;
    vertical-align:middle;
  }
  .shopCartList{
    background: #fff;
    margin-bottom: 10px;
  }
.shopCart_wrapper{
  width: 1240px;
  margin: 10px auto;
  .shopCart_header{
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #efefef;
    color: #333;
  /*  shopCart_header底部*/
  }

  .cart_select{
    padding-left: 45px;
    text-align: left;
    width: 220px;
  /*  cart_select底部*/
  }
  .cart-img{
    width: 100px;
    height: 100px;
    margin-left: 35px;
    vertical-align: middle;
  }
  .cart_name{
    width: 270px;
    text-align: center;
    .cart-title{
      display: inline-block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .cart-desc{
      color: #999;

    }
    /*cart_name底部*/
  }
  .cart_price{
    width: 220px;
    text-align: center;
  }
  .cart_num{
    width: 200px;
    text-align: center;
    .cart-input{
      width: 140px;
      height: 38px;
      border: 1px solid #efefef;
      border-radius: 4px;
      margin: 0 auto;
      button{
        width: 38px;
        height: 38px;
        text-align: center;
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
      input{
        width: 58px;
        height: 36px;
        border: none;
        padding: 0;
        vertical-align: top;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
        /*border-bottom: 1px solid #efefef;*/
        text-align: center;

      /*  外边框是div的边框，input只有内部左右两个边框，高度*/
      }
    }
  }
  .cart_total{
    width: 160px;
    text-align: center;
  }
  .cart_operate{
    width: 170px;
    padding-right: 40px;
    text-align: right;
  }

  /*循环tr样式*/
  .cart-product{
    height: 100px;
    border-top: 1px solid #efefef;
    &:last-child{
      border-bottom: 1px solid #efefef;
    }
  }
/*  底部购物车结算项*/
  .shopCart-footer{
    height: 70px;
    line-height: 70px;
    background: #fff;
    padding: 0 45px;
    color: #666;
    .footer-remove{
      color: #999;
      margin: 0  30px  0 20px;
      cursor: pointer;
    }
    .footer-number{
      font-weight: bold;
      margin: 0 5px;
    }
    .gray{
      color: #333;
    }
    .blue{
      color: #00c3f5;
    }
    .red{
      color: #e02b41;
    }
    .footer-total{
      font-size: 20px;
      margin-right: 35px;
    }
  }
/*  shopCart_wrapper底部*/
}
  .shopCart-empty{
    width: 1240px;
    margin: 10px auto;
    background: #fff;
    display: table;
    height: 360px;
    .empty-content{
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      .empty-left{
        display: inline-block;
        width: 100px;
        height: 114px;
        background: url("../assets/images/shopcart.png") no-repeat;
        margin-right: 30px;
        vertical-align: middle;
      }
      .empty-right{
        display: inline-block;
        vertical-align: middle;
        .empty-desc{
          color: #666;
          font-weight: bold;
          margin-bottom: 15px;
          text-align: left;
          font-size: 18px;
        }
      }
    }
    .deleteIcon{
      cursor: pointer;
    }
  }
  label,input[type=checkbox]{
      cursor: pointer;
    }
  .deleteIcon{
    cursor: pointer;
  }
</style>