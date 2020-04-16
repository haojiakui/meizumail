import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const routes = [
  {
    path:'/',
    name:'Index',
    component:()=> import('../views/index')
  },{
    path:'/Category/:id?',
    name:'Category', //大写
    component:()=> import('../views/category')
  },
  {
    path:'/detail/:id', //id是必传的
    name:'Detail', //大写
    component:()=> import('../views/detail')
  },
  {
    path:'/shopcart', //id是必传的
    name:'shopcart', //大写
    component:()=> import('../views/shopCart')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
