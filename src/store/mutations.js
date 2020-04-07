import Vue from 'vue'
const mutations = {
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
      Vue.set(obj,'count',obj.num)
      state.shopCartData.push(obj)
    }
    console.log(state.shopCartData);
  }
}
export default mutations