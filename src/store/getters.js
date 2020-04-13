import shopCart from "../views/shopCart";

const getters = {
  //判断购物车内数据是否为全选状态
  isAllChecked(state){
  //  判断全选：遍历购物车内所有对象，如果所有obj的checked都为true
    let checked = true //默认是全选状态
    state.shopCartData.forEach(e=>{
      //如果有一条是false,就不是全选状态，checked就为false
      if(!e.checked){
        checked = false
      }
    })
    // console.log('de',checked);
    return checked  //作为是否为全选状态的凭证
  },

//  -----------------------------
// 单个选中商品的数量(已选中的个数)
  checkGoodsTotal(state){
    let total = 0
    state.shopCartData.forEach(e=>{
      if(e.checked){
        total += e.count
      }
    })
    return total
  },
//  选中商品的总价  (选中的所有商品共xxx元)
  checkedGoodsPrice(state){
    let total = 0
    state.shopCartData.forEach(e=>{
      if(e.checked){
        total  += (e.goodsPrice * e.count)
      }
    })
    return total
  },
//  ---------------------------------
//  现存购物车里的总个数(共几个)
  shopCartTotal(state){
    let total = 0
    state.shopCartData.forEach(e=>{
      total += e.count
    })
    return total
  }


}
export default getters