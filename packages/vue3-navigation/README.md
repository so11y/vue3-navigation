# Vue 3 路由导航

这是一个基于 Vue 3 的 KeepAlive 实现的路由页面导航系统，支持前进刷新和后退缓存。

## 功能特性

- 前进刷新
- 后退缓存
- 提供与 vue-router 同等 api 使用方式

## 注意

- 不可以有两个同级的NavigateView会有意想不到的意外
- 界面级别路由一定要定义name并与对应路由中name相互对应以下是示例

```typescript
[
  {
    path: "/login",
    name: "login", //这里的login一定要与缓存界面级别组件的name相互对应
    component: () => import("./views/login.vue"),
  },
];
```

```javascript
export default defineComponent({
  name: "login", //这个组件是页面组件需要与路由中定义的name相互对应
});
```


## 使用前必要改造
- RouterView 替换为 NavigateView
- RouterLink 替换为 NavigateLink
- useRouter 和 useRoute 从 vue3-navigation 中导入
- 界面级别路由需要与定义name并于对应路由中name相互对应

```javascript
//createApp使用部位需要进改造
import { createApp, h } from "vue";
import { NavigateProvide } from "vue3-navigation";
import App from "./App.vue";
const app = createApp({
  render: () =>
    h(NavigateProvide, null, {
      default: () => h(App),
    }),
});
```

## 前进缓存
```javascript
import { useRouter } from "vue3-navigation";

const router = useRouter();

function handleClick(){
  //调用push时将会把form缓存
  //比如当前是A路由，从a前往b界面
  //那么a在调用完成router.push之后会缓存当前a界面
  //并且b界面如果已经被缓存，会重新渲染新的b界面
  router.push("/b");
  //router.replace将会不缓存页面其他同理
  router.replace("/b");
}
```

## api介绍

#### router.push(RouteLocationRaw,isKill = false)

#### router.replace(RouteLocationRaw,isKill = true)

- RouteLocationRaw是vue-router的跳转参数类型
- isKill是是是否缓存当前界面，默认是缓存 false


## 组件介绍

```html
<NavigateView :include="Array<string>" :exclude="Array<string>" :max="number"/>
```

- include:Array<string> ，因为本身就会缓存了，其实这个属性意义不大，除非某个界面需要完全的持久缓存才使用
- exclude:Array<string> , 排除一些不需要被缓存的路由
- max:number, 缓存最大上限个数，默认Infinity



## 安装
```bash
npm install vue3-navigation --save
```


### 如何运行本项目
- 对项目可以进行fork或者clone到然后执行以下操作
- pnpm i
- pnpm run dev
- 将会运行playground进行体验