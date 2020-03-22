<template>
  <div class="header">
    <div class="header-wrapper clearfix">
<!--      right-->
      <div class="header-logo fl"></div>
      <div class="header-cart fr">
        <span class="iconfont">&#xe607;</span>
      </div>
      <div class="header-user fr"><span class="iconfont">&#xe602;</span></div>
      <div class="header-search fr">
        <input type="text" class="search-input" placeholder="搜索你喜欢的商品" name="" id="">
        <span class="iconfont search-icon">&#xe601;</span>
      </div>
<!--      nav-->
      <ul class="header-nav fr">
        <li  v-for="(item ,index) of navData "
             :key="index"
             @mouseenter="showChildren(item)"

        >
          <a class="nav-item" href="">{{item.name}}</a>
        </li>
`
      </ul>
    </div>
<!--    悬浮层-->
<!--      过渡效果，由transition包裹-->
    <transition name="nav" >
      <div class="nav-children" v-show="childrenShow" @mouseleave="hideChildren">
        <div class="children-wrapper">
          <transition-group tag="ul" @enter = 'enter'>
<!--            通过tag属性，指定transition-group 渲染为指定的元素  默认是span-->
            <li class="children-item"
                v-for="(item,index) in childrenData"
                :key = 'item.pic'
                :data-index= 'index' >
              <img :src= 'item.pic'   alt="">
              <p class="children-desc">{{item.name}}</p>
              <p>{{item.price}}</p>
            </li>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>


<style lang="less" scoped>
  .header{
    width: 100%;
    background: white;
    position: relative;
    .header-wrapper{
      width:1240px;
      margin: 0 auto;
      .header-logo{
        width:140px;
        height: 26px;
        margin:  28px  0;
        background: url("../assets/images/logo.png") no-repeat center;
      }
      .header-cart,.header-user{
        padding:29px 10px 0 20px ;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
      }
      .header-search{
        width: 172px;
        height: 32px;
        border: 1px solid #ddd;
        border-radius: 2px;
        position: relative;
        margin : 25px 0;

        .search-input{
          width: 127px;
          height: 20px;
          font-size: 12px;
          border: 0;
          outline: none;
          position: absolute;
          left: 5px;
          top: 6px;
        }
        .search-icon{
          font-size: 16px;
          position: absolute;
          right: 5px;
          top: 5px;
        }
      }
      .header-nav{
        li{
          display: inline-block;
          a.nav-item{
            display: inline-block;
            padding: 33px 20px;
            font-size: 16px;
            line-height: 1;
            cursor: pointer;
            transition: .1s ease;
            &:hover{
              /*color: #31a517;*/
              color: #00c3f5;
            }
          }
        }
      }
    }
  /*  悬浮样式*/
    .nav-children{
      width:100%;
      height:156px;
      background: white;
      position: absolute;
      left: 0;
      top: 82px;  /*基于header高度向下82px*/
      z-index: 1;
      border-bottom: 1px solid #e9e9e9;
      .children-wrapper{
        width:1240px;
        padding-left: 180px;
        margin: 0 auto ;
      }
      .children-item{
        opacity: 0;
        width: 120px;
        height: 145px;
        display: inline-block;
        font-size: 12px;
        color: #666;
        text-align: center;
        overflow: hidden;
        .children-desc{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      img{
        width: 100px;
        height: 100px;
      }
    }
    .nav-enter-active{
      height: 156px;
      transition: height .3s ease-in-out;
    }
    .nav-enter{
      height: 0;
    }
  }
</style>
<script>
  import axios from 'axios'
  export default {
    name: 'mHead',
    data(){
      return {
        navData:[], //接收到的分类导航的数据
        childrenData:[],
        childrenShow : false
      }
    },

    methods:{
      //想要这个方法自动执行，需要在mounted生命周期里执行
      async getNavData(){ //async:异步执行函数

        const {data} = await axios.get('/api/nav')  // 当请求成功后将数据赋值给data
        this.navData = data

      },
      showChildren(item){
        //获取悬浮列表的内容
        this.childrenShow = true

        this.childrenData = item.children;
      },
      hideChildren(){
        this.childrenShow = false
        this.childrenData = []
      },
      //从右到左依次渐显 渲染出来的子项
      enter(el){
        const timeout =  el.dataset.index * 200
        setTimeout(()=>{
          Velocity(el,{
            'opacity': 1,
            'transLateX':'-50px'
          }
          )
        },timeout)
      }
    },
    mounted() {

      this.getNavData() //生命周期函数要调用methods里方法，需要加上this关键字
    }
  }
</script>
