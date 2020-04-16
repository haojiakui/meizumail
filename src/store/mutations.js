import Vue from 'vue'
const mutations = {
  //添加商品到购物车 || 添加数量到购物车
  addShopCart(state,obj){ //state：vuex对象，obj:要添加到购物车总数的单个购物车对象
    let haveData = false //判断这条数据是否已在数组中存在
    state.shopCartData.forEach(e=>{
      if(e.id === obj.data.id){
        haveData = true
        e.count += obj.num
      }
    })
    //如果原数组中不存在这条数据，就使用vue.set添加这条数据
    if(!haveData){
      Vue.set(obj.data,'count',obj.num)
      Vue.set(obj.data,'checked',true) //当被加入购物车时，该商品标识默认为true
      state.shopCartData.push(obj.data)
    }

  },
  INCREASE_SHOPCART(state,id){
    state.shopCartData.forEach(e=>{
      if(e.id === id){
        e.count ++
      }
    })
  },
  DECREASE_SHOPCART(state,id){
    state.shopCartData.forEach(e=>{
      if(e.id === id && e.count >1){
        e.count --
      }
    })
  },
  CHECK_GOODS(state,id){
    state.shopCartData.forEach(e=>{
      if(e.id === id){
        e.checked = !e.checked
        // console.log('该商品改变了选中状态', e.checked);
      }
    })
  }, //全选按钮的点击事件
  CHECK_ALL_GOODS(state,checked){
    // checked:是当前全选的状态,当点击全选按钮时，所有obj的checked都取反
    state.shopCartData.forEach(e=>{
      e.checked = !checked
    })
  },
//  删除单个商品
  DEL_SHOPCART(state,id){
    state.shopCartData.forEach((e,index)=>{
      if(e.id === id){
        state.shopCartData.splice(index,1)//将这条数据删除
      }
    })
  },
  REMOVE_GOODS(state ){
      state.shopCartData = state.shopCartData.filter(item=> !item.checked)
  }



}


export default mutations