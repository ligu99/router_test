<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { setStore, getStore } from "@/views/storage";

export default {
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
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
