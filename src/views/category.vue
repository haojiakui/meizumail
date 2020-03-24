<template>
  <div>
    <m-head></m-head>
<!--    主要分类内容-->
    <div class="category-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="arrow">></span>
        <span>全部</span>
        <span class="arrow">></span>
        <span class="last-bread">手机</span>
      </div>
      <!--    <div>筛选列表</div>-->
      <!--    商品列表-->
      <category-list :data = categoryListData></category-list>
    </div>

    <!--    主要分类内容-->
    <m-footer></m-footer>
  </div>
</template>

<script>
  import mHead from '../components/mHead'
  import mFooter from '../components/mFooter'
  import categoryList  from '../components/categoryList'
  import axios from 'axios'
  export default {
    name: 'category',
   components:{
     mHead,mFooter,categoryList
   },
    data(){
      return {
        categoryListData:[]
      }
    },
    methods:{
     async getCategoryListData(){
        const {data} = await axios.get('/api/categoryList')
       this.categoryListData = data
     }
    },
    mounted() {
      this.getCategoryListData()
    }
  }
</script>

<style lang="less" scoped>
.category-wrapper{
  width: 1240px;
  margin: 0 auto;
  padding-bottom: 60px;
}
.bread{
  height: 40px;line-height: 40px;
  .arrow,.last-bread{
    color: #999;
  }
}
</style>