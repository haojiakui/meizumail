<template>
  <div>
    <button @click="backtop" class="goTop">回到顶部</button>
  </div>
</template>

<script>

  export default {
    name: 'scrollTop',
    mounted(){
      window.addEventListener("scroll",this.showbtn,true);
    },
    data(){
      return {
        scrollTop:0,
        isTop:false
      }
    },
    methods:{
      // 显示回到顶部按钮
      showbtn(){
        let that = this;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        that.scrollTop = scrollTop
      },
      backtop(){
        let timer = setInterval(function(){
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          this.isTop = true;
          if(osTop === 0){
            clearInterval(timer);
          }
        },30)
      }
    }

  }

</script>

<style lang="less" scoped>
.goTop{
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background: white;
  color: #000000;
}

</style>