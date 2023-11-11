import Layout from "./components/layout.vue";
import { RouteRecordRaw } from "vue-router";
export default [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/login/index.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    redirect: "/user/userList",
    children: [
      {
        path: "/user/userList",
        name: "userList",
        component: () => import("./views/userList/index.vue"),
      },
      {
        path: "/user/userDetail",
        name: "userDetail",
        component: () => import("./views/userDetail/index.vue"),
      },
    ],
  },
] as Array<RouteRecordRaw>