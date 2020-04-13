<template>
  <div>
     <div class="clearfix recommonend-header">
       <h3 class="fl title">推荐商品</h3>
       <div class="fr">
         <i class="iconfont icon-left pagination-item" :class="{'disabled':  activeIndex ===0}" @click="prev"></i>
         <i class="iconfont icon-right pagination-item" :class="{'disabled':  activeIndex ===pageSize}" @click="next"></i>
       </div>
     </div>
    <div class="recommonend-concent">
<!--      列表项-->
      <ul class="clearfix" :style= listWrapper >
        <li v-for="(item,index) in data" :key="index"
            :class="{'last-child': (index + 1) % 4 === 0}"
            class="goods-list  ">
          <a :href="item.href">
            <img :src="item.goodsUrl" alt="">
            <div class="goods-name">{{item.goodsName}}</div>
            <div class="goods-desc"> {{item.goodsDesc}}</div>
            <div class="goodsPrice">
              <i>￥</i>{{item.goodsPrice}}<span class=" lower" v-if="item.lower">起</span><span class="goods-oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
            </div>
          </a>
          <div class="goods-new" v-if=" item.newProduct">新品</div>
        </li>
      </ul>
<!--      列表项-->
    </div>

  </div>
</template>

<script>
  export default {
    name: 'recommentList',
    props:{
      data:{
        type : Array,
        default(){
          return []
        }
      }
    },data(){
      return {
        activeIndex :0
      }
    },
  //  根据个数计算
 computed:{
      listWrapper(){
        return {
          width :`${(this.data.length) * 250 }px`,
          transform:`translateX(-${this.activeIndex * 1240}px)`,
          transitionDuration: '.3s'
        }
      },
      pageSize(){
        return Math.floor(this.data.length / 5) //
      }
 },
    methods:{
      prev(){
        if(this.activeIndex ===0){return}
        this.activeIndex -= 1
      },
      next(){
        if(this.activeIndex === this.pageSize){return}
        this.activeIndex += 1
      }
    }
}
</script>

<style lang="less" scoped>
  .recommonend-header{
    margin: 30px auto 10px ;
    .title{
      font-size: 30px;
      font-weight: 400;
    }
    .pagination-item{
      display: inline-block;
      width: 24px;
      height: 24px;
      cursor: pointer;
      color: #00c3f5;
      border: 1px solid #00c3f5;
      text-align: center;
      line-height: 24px;
      &.disabled{
        color: #efefef;
        border-color: #dcdcdc;
      }
    }
  }

  .recommonend-concent{
    width: 1240px;
    background: white;
    overflow: hidden;
    /*height: 252px;*/
    /*ul样式*/
    .goods-list{
      overflow: hidden ;
      float: left;
      width: 220px;
      margin: 0 15px;
      padding: 34px  0 15px;
      background-color: #ffffff;
      cursor: pointer;
      transition: all .3s ease;
      position: relative;
      text-align: center;
      img{
        height: 180px;
        &:hover{
          transform: scale(1.2);
          transition:  all .3s;
        }
      }
    }

    .goods-name{
      color: #555757;
      font-size: 14px;
      margin-bottom: 2px;
      margin-top: 20px;
    }
    .goods-desc{
      font-size: 12px;
      color: #999;

    }
    .goodsPrice{
      position: relative;
      display: inline-block;
      padding-left: 14px;
      font-size: 16px;
      margin-top: 8px;
      color: #c00;
      i{
        font-style: normal;
        font-size: 12px;
        position: absolute;
        left: 0;
        top: 2px;
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

    }
  }

</style>