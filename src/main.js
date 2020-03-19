import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' //全局css初始化
import './assets/css/reset.css' //导入全局初始样式
import './assets/font/iconfont.css' //图标样式
import './assets/css/common.css'//全局共有样式
import velocity from 'velocity-animate' //引入动画库 npm install velocity-animate --save
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
