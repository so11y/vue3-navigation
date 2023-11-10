<script setup lang="ts">
import { useKeepAliveViews } from "../router";
defineOptions({
  name: "RouterView",
});
const views = useKeepAliveViews();
</script>
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="views">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
