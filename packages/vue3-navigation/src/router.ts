import {
  provide,
  InjectionKey,
  inject,
  getCurrentInstance,
  onUnmounted,
  unref,
} from "vue";
import { useRouter as useVueRouter, RouteLocationRaw } from "vue-router";
import { RouterProvideKey } from "./helper";
import type { ProvideTypes } from "../vue-types";

const providePageKeepAlive = Symbol() as InjectionKey<ProvideTypes>;
function hasBubbleProvide(): ProvideTypes {
  const ctx = getCurrentInstance()!;
  if ((providePageKeepAlive as symbol) in ctx.parent!.provides) {
    return ctx.parent?.provides[providePageKeepAlive as symbol];
  }
  return {
    dept: -1,
    bubble: () => {},
  };
}

export const useKeepAlive = () => {
  const ctx = getCurrentInstance()!;
  const { dept, bubble: parentBubble } = hasBubbleProvide();
  const { routerMap, getRouter, deleteRouter } = inject(RouterProvideKey)!;
  const currentDept = dept + 1;
  const bubble = () => {
    if (currentDept <= 0) return;
    const name = ctx?.type.name!;
    const parentKeepAliveView = routerMap[dept];
    if (!routerMap[dept].includes(name)) {
      parentKeepAliveView.push(name);
    }
    parentBubble();
  };
  provide(providePageKeepAlive, {
    bubble,
    dept: currentDept,
  });
  onUnmounted(() => deleteRouter(currentDept));
  return getRouter(currentDept);
};

export const useRouter = () => {
  const router = useVueRouter();
  const { getRouter } = inject(RouterProvideKey)!;
  const { dept } = inject(providePageKeepAlive)!;
  const ctx = getCurrentInstance()!;
  const views = unref(getRouter(dept));
  const { bubble } = ctx.provides[providePageKeepAlive as symbol] as {
    bubble: () => void;
  };
  const localSelf = (kill: boolean) => {
    const name = router.currentRoute.value.name as string;
    const index = views.findIndex((pageName) => pageName === name);
    if (kill) {
      views.splice(index, 1);
    } else if (index === -1 && name) {
      views.push(name);
    }
  };
  const killMaybeLinkPage = (to: RouteLocationRaw) => {
    const toPage = router.resolve(to);
    const toPageDept = toPage.matched.length - 1;
    const toPageViews = unref(getRouter(toPageDept));
    const index = toPageViews.findIndex((pageName) => pageName === toPage.name);
    if (index > -1) {
      toPageViews.splice(index, 1);
    }
  };
  return {
    push(to: RouteLocationRaw, kill = false) {
      bubble();
      localSelf(kill);
      killMaybeLinkPage(to);
      return router.push(to);
    },
    replace(to: RouteLocationRaw) {
      localSelf(true);
      killMaybeLinkPage(to);
      return router.replace(to);
    },
  };
};
