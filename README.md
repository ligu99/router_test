# router_test

# 动态添加路由，并解决刷新空白的问题

目前数据都是临时写死的，实际项目中应该根据用户的token请求路由数据

## 方法一
1. 登录后，获取路由数据并添加路由

```
getMentList() {
      let menuData = [{
        path: '/console',
        name: 'Console',
        component: () => import('@/views/Layout.vue'),
        children: []
      }];
      let childrenData = [
        {
          path: '/test1',
          component: "Test1"
        }, {
          path: '/test2',
          component: "Test2"
        }, {
          path: '/test3',
          component: "Test3"
        }];
      childrenData.forEach(item => {
        menuData[0].children.push({
          path: item.path,
          component: () => import(`@/views/${item.component}.vue`)
        })
      });
      this.$router.addRoutes(menuData);
      //将路由数据、登录状态存到localStorage，路由数据同时存到vuex(用于刷新的时候重新添加路由，如果vuex没有数据了，就说明刷新了页面，需要重新添加路由)
      setStore("menuData", childrenData)
      setStore("isLogin", true)
      this.$store.commit('setMenuData', childrenData)
    }
```

2. /router/index.js 添加路由守卫，解决登录后，刷新页面动态添加的路由失效的问题

```
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
  let mLength = store.state.menuData.length//用于解决刷新空白的问题
  if (mLength === 0 && to.path !== "/") {
    setMenu()
    next({ ...to, replace: true })
  } else {
    next()
  }
  next()
})
```

## 方法二
1. 同方法一的1.
2. 因为每次刷新都会走App.vue的生命周期，所以在App.vue 判断是否登录，如果没有就return，有登录就请求路由数据

```
created() {
    this.getMentList()
  },
  methods: {
    getMentList() {
      console.log(getStore("isLogin"))
      if (getStore("isLogin") !== 'true') {
        return
      }
      let menuData = [{
        path: '/console',
        name: 'Console',
        component: () => import('@/views/Layout.vue'),
        children: []
      }];
      let childrenData = [
        {
          path: '/test1',
          component: "Test1"
        }, {
          path: '/test2',
          component: "Test2"
        }, {
          path: '/test3',
          component: "Test3"
        }];
      childrenData.forEach(item => {
        menuData[0].children.push({
          path: item.path,
          component: () => import(`@/views/${item.component}.vue`)
        })
      });
      this.$router.addRoutes(menuData);
      setStore("menuData", childrenData)
      this.$store.commit('setMenuData', childrenData)
    }
  }
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
