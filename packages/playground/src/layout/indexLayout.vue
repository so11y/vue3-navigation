<script setup lang="ts">
import { NavigateLink } from "vue3-navigation";
import { RouteRecordRaw } from "vue-router";
import RouterList from "../router";
import { MenuOption } from "naive-ui";
import { h } from "vue";
import BasicLayout from "./basicLayout.vue";

defineOptions({
  name: "indexLayout",
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
          show: !item.meta?.hidden
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
</script>

<template>
  <BasicLayout :menu="menuOptions" name="indexLayout" />
</template>

<style lang="scss" scoped>
:deep(.main .nav) {
  left: 0;
}
</style>
