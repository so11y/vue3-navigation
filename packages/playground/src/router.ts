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
    meta: {
      title: "登录",
    },
    component: () => import("./views/login/index.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    meta: {
      title: "用户管理",
    },
    redirect: "/user/userList",
    children: [
      {
        path: "/user/userList",
        name: "userList",
        meta: {
          title: "用户列表",
        },
        component: () => import("./views/userList/index.vue"),
      },
      {
        path: "/user/operate-user",
        name: "operateUser",
        meta: {
          title: "操作用户",
        },
        component: () => import("./views/operateUser/index.vue"),
      },
      {
        path: "/user/userDetail",
        name: "userDetail",
        component: () => import("./views/userDetail/index.vue"),
      },
    ],
  },
] as Array<RouteRecordRaw>;
