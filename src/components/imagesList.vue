<template >
  <div :class="{'images-wrapper':type==='small','images-wrapper_big ': type=== 'big'}">
    <img class="img" :src="data[activeIndex]" alt="">
    <ul  class="imgs">
      <li v-for="(item,index) in data"
          class="imgs-item"
          @click="changeImage(index)"
          :class="{active: activeIndex=== index}"
          :key="index">
        <img :src="item"  alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'imagesList',
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      },
      type:{
        type:String,
        default: 'small'
      }
    },
    data(){
      return  {
        activeIndex:0
      }
    },
    methods:{
      changeImage(index){
        this.activeIndex = index
      }
    }

  }
</script>

<style lang="less" scoped>
  .images-wrapper{
    text-align: center;
    .img{
      height: 230px;
      margin-top: 20px;
    }
    .imgs{
      overflow: hidden;
      margin: 13px auto 15px;
      .imgs-item{
        display: inline-block;
        height: 40px;
        width: 40px;
        border-radius: 4px;
        margin: 0 4px;
        border: 1px solid #efefef;
        cursor: pointer;
        &.active{
          border-color: #bdbdbd;
        }
        img{
          width: 40px;
          height: 40px;

        }
      }
    }
  }
/*  修改*/
  .images-wrapper_big{
    text-align: center;
    .img{
      height: 375px;
      margin : 20px auto;
    }
    .imgs{
      overflow: hidden;
      margin-top: 10px;
      .imgs-item{
        display: inline-block;
        height: 75px;
        width: 75px;
        border-radius: 4px;
        margin: 0 5px;
        border: 1px solid transparent;
        cursor: pointer;
        &.active{
          border-color: #dcdcdc;
        }
        img{
          width: 75px;
          height: 75px;

        }
      }
    }
  }
</style>