<script setup lang="ts">
import { NavigateView, useRoute } from "vue3-navigation";
import { MenuOption, NMenu } from "naive-ui";
import { ref, watch } from "vue";
defineOptions({
  name: "Layout",
});

const props = defineProps<{
  menu: Array<MenuOption>;
  name: string;
}>();

const route = useRoute();
const selectedKey = ref<string>("/");

watch(
  () => route.path,
  (path) => {
    selectedKey.value = path;
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="main">
    <div class="nav">
      <NMenu v-model:value="selectedKey" :options="props.menu" />
    </div>
    <div class="body">
      <NavigateView :name="props.name" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  height: 100vh;
  position: relative;
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    border-right: 1px solid #999;
    box-sizing: border-box;
  }
  .body {
    padding: 8px 8px 0 208px;
    box-sizing: border-box;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
