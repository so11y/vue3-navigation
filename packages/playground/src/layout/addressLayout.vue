<script setup lang="tsx">
import { RouteRecordRaw } from "vue-router";
import { NavigateLink, useRoute, useRouter } from "vue3-navigation";
import { childrenList } from "../router";
import { MenuOption } from "naive-ui";
import BasicLayout from "./basicLayout.vue";
import { NCard } from "naive-ui";

defineOptions({
  name: "addressLayout",
});

const route = useRoute();
const router = useRouter();

function buildMenu(routerRaw: Array<RouteRecordRaw>): Array<MenuOption> {
  const walk = (routerRaw: Array<RouteRecordRaw>): Array<MenuOption> => {
    return routerRaw
      .filter((item) => item.meta?.title)
      .map((item) => {
        const menu: MenuOption = {
          label: () => (
            <a
              onClick={() => {
                const { query } = route;
                router.push({
                  path: item.path,
                  query,
                });
              }}
            >
              {item.meta.title}
            </a>
          ),
          key: item.path,
        };
        if (item.children) {
          menu.children = walk(item.children);
        }
        return menu;
      });
  };
  return walk(routerRaw);
}

const menuOptions = buildMenu(childrenList);
</script>

<template>
  <div class="container">
    <n-card title="通讯录" size="small" hoverable>
      <BasicLayout :menu="menuOptions" name="addressLayout"
    /></n-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
}
:deep(.n-card__content) {
  position: static;
  height: 600px;
}
:deep(.n-card) {
  max-width: 1500px
}
:deep(.main) {
  position: static;
  display: flex;
  height: 600px;
}
:deep(.main .nav) {
  position: static;
  height: 600px;
}
:deep(.main .body) {
  padding: 15px;
  flex: 1;
}
</style>
