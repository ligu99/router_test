<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { setStore } from "./storage";
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    login() {
      this.getMentList();
      this.$router.push("/test1")
    },
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
      setStore("menuData", childrenData)
      setStore("isLogin", true)
      this.$store.commit('setMenuData', childrenData)
    }
  }
}
</script>
