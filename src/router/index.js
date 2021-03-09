import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { getStore, setStore } from "@/views/storage";
import store from "@/store";

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path: '/console',
  //   name: 'Console',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Layout.vue'),
  //   children: [
  //     {
  //       path: '/test1',
  //       component: () => import('../views/Test1.vue'),
  //       meta: { title: 'test1' }
  //     }, {
  //       path: '/test2',
  //       component: () => import('../views/Test2.vue'),
  //       meta: { title: 'test2' }
  //     }, {
  //       path: '/test3',
  //       component: () => import('../views/Test3.vue'),
  //       meta: { title: 'test3' }
  //     },
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const setMenu = () => {
  let menuData = [{
    path: '/console',
    name: 'Console',
    component: () => import('@/views/Layout.vue'),
    children: []
  }];
  let chiData = JSON.parse(getStore("menuData"))
  store.commit('setMenuData', chiData)
  chiData.forEach(item => {
    menuData[0].children.push({
      path: item.path,
      component: () => import(`@/views/${item.component}.vue`)
    })
  })
  router.addRoutes(menuData);
}

router.beforeEach((to, from, next) => {
  // let mLength = store.state.menuData.length//用于解决刷新空白的问题
  // if (mLength === 0 && to.path !== "/") {
  //   setMenu()
  //   next({ ...to, replace: true })
  // } else {
  //   next()
  // }
  next()
})
export default router
