<template>
  <div class="swiper" :style = 'swiperSize'>
<!--    图文-->
   <ul :style="listWrapper" class="swiper-ul" @transitionend = 'setDuration'>
     <li class="swiper-list" v-for="(item,index) in data " :key = 'item.imgUrl'>
       <a :href="item.href" class="imgbox">
         <img :src="item.imgUrl" :style="swiperSize" alt="">
       </a>
     </li>
     <li v-if="data.length >1" class="swiper-list" :key="data.length + 1">
       <a :href="data[0].href">
         <img :src="data[0].imgUrl" :style="swiperSize" alt="">
       </a>
     </li>
   </ul>
<!--切换按钮-->
    <ul class="swiper-btns">
      <li v-for="(item,index) in data" @click="changeImage(index)" :class="{'active':activeIndex === index}" :key="item.imgUrl">
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'swiper',
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      },
      number:{
        type:Number,
        default:500,
      },
      width:{
        type:Number,
        default:1240
      },
      delay:{
        type:Number,
        default:5000
      }
    },
    mounted() {
      this.setTimer()

    },//  标识符，用于标识那张图片
    data(){
      return {
        activeIndex:0,
      //  想要自动循环小圆点，就要使用循环
        timer:null,
        haveDuration:true
        }
    },
    methods:{
      //每次挂载后自动执行
      setTimer(){
      //  先清除定时器
        clearInterval(this.timer)
        this.timer = setInterval(()=>{

          if(this.activeIndex === this.data.length  ){
            this.activeIndex = 0
            this.haveDuration =false
          }else {
            this.activeIndex++
            this.haveDuration = true
          }
        },this.delay)
      },
      changeImage(index){
        console.log(index);
        this.activeIndex = index
        this.haveDuration = true
      },
      setDuration(){
        if(this.activeIndex === this.data.length){
          this.activeIndex = 0;
          this.haveDuration =false
        }
      }
    },
    computed :{
      swiperSize(){
        return {
          width:`$(this.width)px`,
           minHeight:`$(this.height)px`,
          height:`$(this.height)px`
        }//使用计算属性动态将父组件传递过来的值用在子组件身上
      },
      //这个列表指的是轮播主体
      listWrapper(){
        return {
          width:`${(this.data.length + 1 ) * this.width}px`,
          height: `$(this.height)px`,
          border:`1px solid black`,
          // transform:`translateX(-$(this.activeIndex * this.width)px)`,
          // transform:`translateX(-$(this.width)px)`,
          transform: 'translate(' + (-this.activeIndex *  this.width) + 'px,0)',
          transitionDuration: this.haveDuration ? '.3s': '' //当鼠标点击圆点时，将该圆点的index赋到transform里，然后将
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.swiper{
  width: 1240px;
  height: 500px;
  position: relative;
  overflow: hidden;

  .swiper-ul{
    font-size: 0;

  }
  /*左边切换按钮*/
  .swiper-list{
    display: inline-block;


  }
  .swiper-btns{
    position: absolute;
    left: 30%;
    bottom: 30px;
    li{
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50px;
      margin: 0 5px;
      background: #fff;
      cursor: pointer;
      &.active{
        background: transparent;
        border: 1px solid #fff;
      }
    }
  }
}
</style>