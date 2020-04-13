<template>
  <ul class="clearfix  getDemo"  >
    <li v-for="(item,index) in data" :key="index"
        :class="{'last-child': (index + 1) % 4 === 0}"
        class="goods-list  ">
      <a :href="item.href">
        <img :src="item.goodsUrl" alt="" class="goods-img">
        <div class="goods-name">{{item.goodsName}}</div>
        <div class="goods-desc"> {{item.goodsDesc}}</div>
        <div class="goodsPrice">
          <i>￥</i>{{item.goodsPrice}}<span class=" lower" v-if="item.lower">起</span><span class="goods-oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
        </div>
      </a>
      <div class="goods-new" v-if=" item.newProduct">新品</div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'goodsList',
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    //  ----------
    }
  }
</script>

<style lang="less" scoped>
.goods-list{
  float: left;
  width: 303px;
  height: 400px;
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
    margin-top: 30px;
    color: #333;
    font-size: 16px;
    margin-bottom: 2px;
  }
  .goods-desc{
    font-size: 14px;
    color: #999;
  }
.goodsPrice{
  position: relative;
  display: inline-block;
  padding-left: 14px;
  font-size: 22px;
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
    font-size: 14px;
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
</style>