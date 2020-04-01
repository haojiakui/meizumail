<template>
  <div class="clearfix sort-box">
    <div class="fl sort-order">
      <a href="javascript:;" :class="{'active':activeSortKey === 'recommend'}" @click="setSortKey('recommend')">推荐</a>
      <a href="javascript:;" :class="{'active':activeSortKey === 'new'}" @click="setSortKey('new')">新品</a>
      <a href="javascript:;" :class="{'active': activeSortKey === 'low' || activeSortKey === 'high'}" @click="changePrice">价格<i class="iconfont arrow" :class="sortArrow"></i></a>
    </div>
    <div class="fr">
      <input type="checkbox" v-model="haveStock"><span>仅显示有货商品 </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sortBox',
    data(){
      return{
      //  字段用于标识当前选择的是哪一个排序条件
        activeSortKey:'' ,//推荐 or  新品？
        activePrice : 'low', //价格排序
        haveStock:false  //显示有货
      }
    },
    watch:{
      haveStock(val){
        this.$emit('getStock',val) //通过wacth实时监测haveStock的值
      }
    },
    computed:{
      sortArrow(){
         if(this.activePrice === "low"){
            return 'icon-down'
         }else{
           return 'icon-up'
         }
      }
    }
  ,
    methods:{
      setSortKey(val){
        this.activeSortKey = val
        this.$emit('getKey',this.activeSortKey)
      },
      changePrice(){
        if(this.activeSortKey === this.activePrice){
          this.activePrice = this.activePrice === "low" ? 'high' : "low"
        }
        this.setSortKey(this.activePrice)
      }
    },
    mounted() {
      this.setSortKey('recommend')
    }
  }
</script>

<style lang="less" scoped>
.sort-box{
  margin: 30px auto 20px;

  color: #666;
  border: 1px solid red;
  .sort-order{
    a{
      margin-right: 50px;
      height: 30px;
      &:hover,&.active{
        color: #00c3f5;
        transition: all .5s;
      }
    }
   & a:nth-child(3){
     position: relative;
        &:hover .arrow{
       display: inline-block;
     }
    }
    .arrow{
      display: none;
      position: absolute;
      bottom: -4px;
    }
  }
}

</style>