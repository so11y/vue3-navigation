import { createApp, h } from "vue";
import { RouterProvide } from "vue3-navigation";
import { createRouter, createWebHistory } from "vue-router";
import RouterList from "./router";
import App from "./App.vue";
const crateRouter = createRouter({
  history: createWebHistory(),
  routes: RouterList,
});

const app = createApp({
  render: () =>
    h(RouterProvide, null, {
      default: () => h(App),
    }),
});

app.use(crateRouter);
app.mount("#app");
