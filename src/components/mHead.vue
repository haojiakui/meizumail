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
        <li><a class="nav-item" href="">魅族手机</a></li>
        <li><a class="nav-item" href="">魅蓝手机</a></li>
        <li><a class="nav-item" href="">魅族声学</a></li>
        <li><a class="nav-item" href="">魅族手机</a></li>


      </ul>
    </div>
  </div>
</template>


<style lang="less" scoped>
  .header{
    width: 100%;
    background: white;
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
              color: #31a517;
            }
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'mHead'
  }
</script>
