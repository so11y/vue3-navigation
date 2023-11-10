import {
  provide,
  inject,
  getCurrentInstance,
  onUnmounted,
  unref,
  Ref,
} from "vue";
import {
  useRouter as useVueRouter,
  useRoute as useVueRoute,
  RouteLocationRaw,
  Router,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import { RouterProvideKey, ProvidePageKeepAliveKep } from "./provideTypes";
import type { ProvideTypes } from "../vue-types";

function hasBubbleProvide(): ProvideTypes {
  const ctx = getCurrentInstance()!;
  if ((ProvidePageKeepAliveKep as symbol) in ctx.parent!.provides) {
    return ctx.parent?.provides[ProvidePageKeepAliveKep as symbol];
  }
  return {
    dept: -1,
    bubble: () => {},
  };
}

export function useKeepAliveViews(): Ref<string[]> {
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
  provide(ProvidePageKeepAliveKep, {
    bubble,
    dept: currentDept,
  });
  onUnmounted(() => deleteRouter(currentDept));
  return getRouter(currentDept);
}

export function useRouter(): Router {
  const router = useVueRouter();
  const { getRouter } = inject(RouterProvideKey)!;
  const ctx = getCurrentInstance()!;
  const { bubble } = ctx.provides[ProvidePageKeepAliveKep as symbol] as {
    bubble: () => void;
  };
  const localSelf = (kill: boolean) => {
    const { name, matched } = router.currentRoute.value;
    const views = unref(getRouter(matched.length - 1));
    const index = views.findIndex((pageName) => pageName === name);
    if (kill) {
      views.splice(index, 1);
    } else if (index === -1 && name) {
      views.push(name as string);
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
  const handleRouterAction = (to: RouteLocationRaw, kill = false) => {
    bubble();
    localSelf(kill);
    killMaybeLinkPage(to);
  };
  return {
    ...router,
    push(to: RouteLocationRaw, kill = false) {
      handleRouterAction(to, kill);
      return router.push(to);
    },
    replace(to: RouteLocationRaw) {
      handleRouterAction(to, true);
      return router.replace(to);
    },
  };
}

export function useRoute(): RouteLocationNormalizedLoaded {
  return useVueRoute();
}
