<script setup lang="ts">
import { NavigateView, NavigateLink, useRoute } from "vue3-navigation";
import { RouteRecordRaw } from "vue-router";
import RouterList from "../router";
import { MenuOption, NMenu } from "naive-ui";
import { h, ref, watch } from "vue";
defineOptions({
  name: "Layout",
});
function buildMenu(router: Array<RouteRecordRaw>): Array<MenuOption> {
  const walk = (router: Array<RouteRecordRaw>): Array<MenuOption> => {
    return router
      .filter((item) => item.meta?.title)
      .map((item) => {
        const menu: MenuOption = {
          label: () =>
            h(
              NavigateLink,
              {
                to: {
                  path: item.path,
                },
              },
              { default: () => item.meta?.title }
            ),
          key: item.path,
        };
        if (item.children) {
          menu.children = walk(item.children);
        }
        return menu;
      });
  };
  return walk(router);
}
const route = useRoute();
const selectedKey = ref<string>("/");

watch(
  () => route.path,
  (path) => {
    selectedKey.value = path;
  },
  {
    immediate:true
  }
);
const menuOptions = buildMenu(RouterList);
</script>

<template>
  <div class="main">
    <div class="nav">
      <NMenu v-model:value="selectedKey" :options="menuOptions" />
    </div>
    <div class="body">
      <NavigateView name="Layout" />
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
