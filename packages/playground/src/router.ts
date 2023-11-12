import IndexLayout from "./layout/indexLayout.vue";
import AddressLayout from "./layout/addressLayout.vue";
import { RouteRecordRaw } from "vue-router";
import { defineAsyncComponent, h } from "vue";

// 基于keep-alive，需要不同的name，不同路径对应同一组件需要不同名称
// 所以创建buildChildren进行compoment数据的生成

function buildChildren(name: string) {
  return {
    name,
    setup() {
      const component = defineAsyncComponent(
        () => import("./views/relationship/relationshipList/index.vue")
      );
      return () => h(component);
    },
  };
}

export const childrenList = [
  {
    path: "/user/address-book/company",
    name: "company",
    meta: {
      title: "公司",
      hidden: true,
    },
    component: buildChildren("company"),
  },
  {
    path: "/user/address-book/family",
    name: "family",
    meta: {
      title: "家庭",
      hidden: true,
    },
    component: buildChildren("family"),
  },
  {
    path: "/user/address-book/friend",
    name: "friend",
    meta: {
      title: "朋友",
      hidden: true,
    },
    component: buildChildren("friend"),
  },
  {
    path: "/user/address-book/relationshipDetail",
    name: "relationshipDetail",
    component: () =>
      import("./views/relationship/relationshipDetail/index.vue"),
  },
];

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
    component: IndexLayout,
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
      {
        path: "/user/address-book",
        name: "addressBook",
        component: AddressLayout,
        redirect: "/user/address-book/company",
        meta: {
          title: "通讯录",
        },
        children: childrenList,
      },
    ],
  },
] as Array<RouteRecordRaw>;
