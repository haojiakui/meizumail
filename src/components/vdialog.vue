<template>
<!--  弹框dom:外部一灰色模板，居中div 弹框显示的div-->
  <transition name="dialog">
    <div class="dialog-mask" v-show="show">
      <div class="dialog-box">
        <div class="dialog-wrapper" :style="dialogBox">
          <div class="dialog-header" :class="{'dialog-title': title}">
          {{title}}
            <i class="iconfont icon-close dialog-close deleteIcon" @click="close"></i>
          </div>
          <div  :style="dialogContent">
            <slot></slot>
          </div>
          <div class="dialog-footer" v-if="confirmBtnShow || cancelBtnShow">
            <button class="btn success wd100 mr20" v-show="confirmBtnShow" @click="confirm">{{confirmBtnText}}</button>
            <button class="btn cancel wd100"       v-show="cancelBtnShow" @click="close">{{cancelButtonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ademo1',
    props:{
      show :{
        //根据外部传入的值决定是否显示，默认不显示
        type : Boolean,
        default : false
      },
      height:{
        type:Number,
        default: 100
      },
      width:{
        type:Number,
        default:760
      },
      title:{
        type:String,
        default:''
      },
      confirmBtnShow:{
        type:Boolean,
        default:true
      },
      cancelBtnShow :{
        type:Boolean,
        default:true
      },
      confirmBtnText:{
        type:String,
        default:'确定'
      },
      cancelButtonText:{
        type:String,
        default:'取消'
      }
    },
    computed:{
      dialogBox(){
        return {
          width:`${this.width}px`,

        }
      },
      dialogContent(){
        return {
          height:`${this.height}px`
        }
      }
    },
    methods:{
      close(){
        //  将dialogshow的值改变成false    修饰符sync:基于v-bind的修饰符 父组件的 :show = xxx实现双向绑定
        this.$emit('changeShow',false)  //改变父组件上show的值，将其变为false
      //  父组件：:show.sync = dialogShow 类似双向绑定
      ;
      },
      confirm(){
        this.$emit('confirm',)
      }
    }
  }
</script>

<style lang="less" scoped>
.dialog-mask{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(153,153,153,.6);
  display: table;
  .dialog-box{
    display: table-cell;
    vertical-align: middle;

  }
  .dialog-wrapper{
    margin: 0 auto;
    background: #fff;
    text-align: center;

  }
  .dialog-header{
    height: 50px;
    line-height: 50px;
    text-align: center;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px 4px 0 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    position: relative;
  }
  .dialog-title{
    border-bottom: 1px solid #efefef;
  }
  .dialog-close{
    position: absolute;
    right: 26px;
    color: #bdbdbd;
    top: 0;
    cursor: pointer;
  }

  .dialog-footer{
    padding-bottom: 30px;
  }
  .mr20{
    margin-right: 20px;
  }
  .wd100 {
    width: 100px;
  }
}
.deleteIcon{
  cursor: pointer;
}
  .dialog-enter-active{
    transition: opacity .3s;
  }
  .dialog-enter{
    opacity: 0;
  }

</style>