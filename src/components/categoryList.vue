<template>
  <div>
  <ul class="clearfix" v-if="data.length > 0">
    <li v-for="(item,index) in data" :key="index"
        :class="{'last-child': (index + 1) % 4 === 0}"
        class="goods-list"
        @click="clickItem(item)"
    >
      <a :href="item.href">
        <images-list :data="item.colorImageUrls"></images-list>
        <div class="goods-name">{{item.goodsName}}</div>
        <div class="goods-desc"> {{item.goodsDesc}}</div>
        <div class="goodsPrice">
          <i>￥</i>{{item.goodsPrice}}<span class=" lower" v-if="item.lower">起</span><span class="goods-oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
        </div>
      </a>
      <div class="goods-new" v-if=" item.newProduct">新品</div>
    </li>
  </ul>
<!--    如果没有数据显示的dom结构 -->
    <div class="clearfix empty" v-else>
      <div class="fl empty-bg"></div>
      <div class="fr empty-desc">
        <div class="title">抱歉没有找到相关商品</div>
        <p>建议您：<br>
            1.适当 <br>
            2.尝试其他条件
        </p>
      </div>
    </div>
    <!--    如果没有数据显示的dom结构 -->
  </div>
</template>

<script>
 //导入图片组件
 import imagesList from '../components/imagesList'
  export default {
    name: 'categoryList',
    components:{
      imagesList
    },
    props:{
      data:{
         type: Array,
        default() {
          return [];
        }
      }
    },
    // 由于组件具有复用性，所以对组件添加事件不能直接跳转,应当将这个事件发射给父级组件处理
    methods:{
      clickItem(item){
        this.$emit('clickItem',item)
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-list{
    float: left;
    width: 303px;
    height: 416px;
    background-color: #ffffff;
    cursor: pointer;
    transition: all .3s ease;
    position: relative;
    margin-top: 10px;
    margin-right: 9px;
    overflow: hidden;
    text-align: center;

    &:hover{
      box-shadow: 0 15px 30px rgba(0,0,0,.1);
    }
  }
  .goods-img{
    height: 230px;
    /*  设置高不设宽，让图片根据高度自适应宽*/
    margin-top: 30px;
  }
  .goods-name{

    color: #333;
    font-size: 14px;
    margin-bottom: 2px;
  }
  .goods-desc{
    font-size: 12px;
    color: #999;
  }
  .goodsPrice{
    position: relative;
    display: inline-block;
    padding-left: 14px;
    font-size: 18px;
    color: #c00;
    i{
      font-style: normal;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 5px;
    }
    .lower{
      font-size: 16px;
    }
    .goods-oldprice{
      text-decoration:line-through;
      color: #666;
      font-size: 12px;
      margin-left: 8px;
    }
  }
  .goods-new{
    position: absolute;
    left: 30px;
    top: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    line-height: 60px;
    text-align: center;
    background: linear-gradient(120deg,#2e74f6,#56bdf9);   //线性渐变
    color: #fff;
  }
  .last-child{
    margin-right: 0;
    /*  并不是每一个都有，需要通过绑定class*/
  }
  .empty{
    width: 335px;
    margin: 120px auto 380px;
    .empty-bg{
      background: url("../assets/images/xiongmao.png") no-repeat;
      width: 105px;
      height: 135px;
      margin-right: 30px;

    }
    .empty-desc{
      width: 200px;

    }
    .title{
      font-size: 18px;
      color: #00c3f5;
      margin: 15px auto ;
    }
  }
</style>