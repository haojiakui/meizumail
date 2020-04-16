<template>
<!--  条件筛选组件-->
  <ul class="filter-box ">
<!--    每一行左边有个title,右边又是一个浮动的ul列表-->
    <li v-for="(item,index) in data" :key="index" class="box-item clearfix">
      <div class="filter-title fl">{{item.name}}:</div>
      <ul class="">
        <li
            v-for="(info,ii) in item.queryList"
            :key="ii"
            :class="{'active': activeFilter[item.key]===info.value}"
            class="filter-item fl"
            @click="changeFilter(item.key,info.value)"
        >{{info.name}}
        </li>
      </ul>
    </li>
  </ul>
</template>
<!--将筛选结果看作一个对象，-->
<script>
  export default {
    name: 'filterBox',
    props:{
      data:{
        type:Array,
        default() {
          return [];
        }
      }
    },
    data(){
      return {
        activeFilter:{} //用于存放筛选结果
      }
    },
    methods:{
      changeFilter(key,val){
        // 使用set方法动态添加对象属性值
        this.$set(this.activeFilter,key,val);
        //将选中的值发送到分类页
        this.$emit('filter',this.activeFilter)
      }
    }
  }
</script>

<style lang="less" scoped>
.filter-box{
  background: #fff;
  padding: 15px 10px;
  border: 1px solid #efefef;
  .box-item{
    line-height: 46px;
  }
  .filter-title{
    width: 85px;
    padding-left: 10px;
    white-space: nowrap;
    color: #333;
    overflow: hidden; //防止特殊情况
  }
  .filter-item{
    cursor: pointer;
    margin-right: 62px;
    &.active{
      color: #00c3f5;
    }
  }
}
</style>