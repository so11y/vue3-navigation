<script setup lang="ts">
import { NavigateView, NavigateLink } from "vue3-navigation";
import { RouteRecordRaw } from "vue-router";
import RouterList from "../router";
import { MenuOption, NMenu } from "naive-ui";
import { computed, h } from "vue";

function buildMenu(router: Array<RouteRecordRaw>): Array<MenuOption> {
  const walk = (router: Array<RouteRecordRaw>): Array<MenuOption> => {
    return router.map((item) => {
      const menu: MenuOption = {
        label: () =>
          h(
            NavigateLink,
            {
              to: {
                path: item.path,
              },
            },
            { default: () => item.name }
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

const menuOptions = buildMenu(RouterList);

defineOptions({
  name: "Layout",
});
</script>

<template>
  <div class="main">
    <div class="nav">
      <NMenu :options="menuOptions" />
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
  }
  .body {
    padding-left: 200px;
  }
}
</style>
