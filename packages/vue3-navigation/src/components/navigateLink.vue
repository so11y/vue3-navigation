<template>
  <a @click="handleTo">
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from "vue-router";
import { useRouter } from "../router";
defineOptions({
  name: "NavigateLink",
});
const props = defineProps<{
  to: RouteLocationRaw;
}>();
const router = useRouter();

function handleTo(e: MouseEvent) {
  e.preventDefault();
  router.push(props.to);
}
</script>
