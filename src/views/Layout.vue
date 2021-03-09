<template>
  <div>
    <ul class="listwrap">
      <li
        class="list"
        v-for="(item, index) in menuData"
        :key="index"
        @click="toPage(item.path)"
      >
        {{ item.component }}
      </li>
      <span @click="logout">退出</span>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { getStore, setStore } from "@/views/storage";

export default {
  data() {
    return {
    }
  },
  computed: {
    menuData() {
      return this.$store.state.menuData;
    }
  },
  created() {
  },
  methods: {
    toPage(path) {
      console.log("topage")
      this.$router.push(path)
    },
    logout() {
      this.$router.push("/");
      setStore("isLogin", false)
    }
  }
}
</script>

<style lang="scss" scoped>
.listwrap {
  width: 300px;
  margin: auto;
  overflow: hidden;
}
.list {
  float: left;
  text-align: center;
  width: 100px;
  cursor: pointer;
}
</style>