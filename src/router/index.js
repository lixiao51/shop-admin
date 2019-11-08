import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../component/Home.vue'
import Login from '../component/Login.vue'
import Users from '../component/Users'
import Roles from '../component/Roles.vue'
import Rights from '../component/Rights.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ] }

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
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
