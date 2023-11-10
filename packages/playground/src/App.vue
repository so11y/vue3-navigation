<script setup lang="ts">
import { ref } from "vue";
import { useKeepAlive, useRouter } from "vue3-navigation";

const routerName = ref("");

const views = useKeepAlive();

const { push } = useRouter();

function pushRouter() {
  console.log("----F");
  push(routerName.value);
  routerName.value = "";
}
</script>

<template>
  cache:{{ views }}
  <br />
  <router-view v-slot="{ Component }">
    <keep-alive :include="views">
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <hr />
  <br />
  <input type="text" v-model="routerName" @keydown.enter="pushRouter" />
</template>
