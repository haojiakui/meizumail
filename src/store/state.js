//组件要想使用state里的数据，通常在computed里使用，使用时 ：return this.$store.state.xxx
const state = {
  shopCartData:[]
  //添加到购物车的值是一个购物车的数据，每条单个的购物车数据是个对象，所以这个购物车就是多个数据对象组成的数组
}
export default state