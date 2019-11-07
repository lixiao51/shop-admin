import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// 给vue设置element-ui插件
Vue.use(ElementUi)

new Vue({

  render: h => h(App),
  router
}).$mount('#app')
