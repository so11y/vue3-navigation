import {
  RouteRecordRaw,
  Router,
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
export function createSimpleRouter(routes: Array<RouteRecordRaw> = []): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        name: "Root",
        component: {
          name: "Root",
          render() {
            return <div>Root</div>;
          },
        },
      },
      ...routes,
    ],
  });
}
