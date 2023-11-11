<script setup lang="ts">
import { useKeepAliveViews } from "../router";
import { NavigateViewProps } from "../types";

defineOptions({
  name: "NavigateView",
});

const props = withDefaults(defineProps<NavigateViewProps>(), {
  include: () => [],
  exclude: () => [],
  max: Infinity,
});
const views = useKeepAliveViews(props.name);
</script>
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="views" :max="max" :exclude="exclude">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
