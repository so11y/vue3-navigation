import { createApp, h } from "vue";
import { NavigateProvide } from "vue3-navigation";
import { createRouter, createWebHistory } from "vue-router";
import RouterList from "./router";
import App from "./App.vue";
const crateRouter = createRouter({
  history: createWebHistory(),
  routes: RouterList,
});

const app = createApp({
  render: () =>
    h(NavigateProvide, null, {
      default: () => h(App),
    }),
});

app.use(crateRouter);
app.mount("#app");
