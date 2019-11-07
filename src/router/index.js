import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../component/Home.vue'
import Login from '../component/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }

  ]
})
// 注册导航守卫
// to到哪里去
// from 从哪里来
// next() 放行next('/login')去登录
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  // 判断to.path是否去login，否则就要有token
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
