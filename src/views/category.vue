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
      <filter-box :data="filterList" @filter = 'getQuery' ></filter-box>
      <sort-box @getKey = 'getSortKey' @getStock = 'getSortStork'></sort-box>
      <!--    商品条件-->
      <category-list :data = 'categoryListData' @clickItem="goDetail"></category-list>
      <recomment-list :data="recommendListData" ></recomment-list>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import mHead from '../components/mHead'
  import mFooter from '../components/mFooter'
  import categoryList  from '../components/categoryList'
  import filterBox  from '../components/filterBox'
  import sortBox from '../components/sortBox'
  import axios from 'axios'
  import recommentList from '../components/recommentList'
  export default {
    name: 'category',
   components:{
     mHead,mFooter,categoryList,filterBox,sortBox,recommentList
   },
    data(){
      return {
        categoryListData:[],
        filterList : [],
        categoryListCopy:[],
        currentQuery:null,
        currentStork:null,
        currentKey:null,
        recommendListData:[]
      }
    },
    methods:{
      //父组件接收子组件传递过来的值
      goDetail(item){
       this.$router.push({
          name:'Detail',
         params:{
            id: item.id
         }
       })
      },
      //子组件：推荐商品页
     async getRecommendListData(){
        const {data} = await axios.get('/api/smartSale')
       this.recommendListData = data

     },
      //子组件：分类 列表页
      async getCategoryListData(){
        const {data} = await axios.get('/api/categoryList')
        this.categoryListData = data
        this.categoryListCopy = [].concat(data)
      },
      async getFilterListData(){
        const {data} = await axios.get('/api/queryList')
        this.filterList = data
      },
    //  接收子组件传递来的数据
      getQuery(val){
       this.currentQuery = val
        this.sortGoods()
      },
      getSortKey(key){
       this.currentKey = key
        this.sortGoods()
      },
      getSortStork(val){
       this.currentStork = val
        this.sortGoods()
      },
      sortGoods(val){
        this.categoryListCopy = [].concat(this.categoryListCopy)
        if(this.currentQuery){
          // console.log(Object.keys(val));//将接收到的对象的key转换成数组
          Object.keys(this.currentQuery).forEach((key)=>{
            if(this.currentQuery[key]){
              this.categoryListData = this.categoryListData.filter((item)=>{
                return  item.features.indexOf(val[key]) >= 0
              })
            }
          })
        }
        if(this.currentStork){
          this.categoryListData = this.categoryListData.filter((item)=>{
            return  item.available
          })
        }
        if(this.currentKey){
          if(this.currentKey === 'recommend'){
            this.categoryListData.sort((a,b)=>{
              return b.shelveTime - a.shelveTime
            })
          }else if(this.currentKey === 'new'){
            this.categoryListData.sort((a,b)=>{
              return b.publishedTime - a.publishedTime
            })
          }else if(this.currentKey === 'low'){
            this.categoryListData.sort((a,b)=>{
              return b.goodsPrice - a.goodsPrice
            })
          }else if(this.currentKey === 'high'){
            this.categoryListData.sort((a,b)=>{
              return a.goodsPrice - b.goodsPrice
            })
          }
        }
      },
    },
    mounted() {
      this.getCategoryListData()
      this.getFilterListData()
      this.getRecommendListData()
    }
  }
</script>

<style lang="less" scoped>
.category-wrapper{
  width: 1240px;
  margin: 0 auto;

}
.bread{
  height: 40px;line-height: 40px;
  .arrow,.last-bread{
    color: #999;
  }
}
</style>