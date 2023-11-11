import {
  provide,
  inject,
  getCurrentInstance,
  onUnmounted,
  unref,
  Ref,
  computed,
} from "vue";
import {
  useRouter as useVueRouter,
  useRoute as useVueRoute,
  RouteLocationRaw,
  Router,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import {
  RouterProvideKey,
  ProvidePageKeepAliveKey,
  ProvideTypes,
  NavigateViewConfigRaw,
} from "./types";

function NOOP() {}

function hasBubbleProvide(): Omit<ProvideTypes, "props"> {
  const ctx = getCurrentInstance()!;
  if ((ProvidePageKeepAliveKey as symbol) in ctx.parent!.provides) {
    return ctx.parent?.provides[ProvidePageKeepAliveKey as symbol];
  }
  return {
    dept: -1,
  };
}

export function useKeepAliveViews(name:string): Ref<string[]> {
  const ctx = getCurrentInstance()!;
  const { dept } = hasBubbleProvide();
  const { routerMap, addRouter, deleteRouter, navigateBubbleMap } =
    inject(RouterProvideKey)!;
  const parentBubble = navigateBubbleMap[dept] || NOOP;
  const navigateViewConfigRawProps = computed<NavigateViewConfigRaw>(
    () => ctx.props
  );
  const currentDept = dept + 1;
  const bubble = () => {
    if (currentDept <= 0) return;
    const parentKeepAliveView = routerMap[dept];
    if (!routerMap[dept].includes(name)) {
      parentKeepAliveView.push(name);
    }
    parentBubble();
  };
  provide(ProvidePageKeepAliveKey, {
    dept: currentDept,
  });
  onUnmounted(() => deleteRouter(currentDept));
  return addRouter(currentDept, navigateViewConfigRawProps, bubble);
}

export function useRouter(): Router {
  const router = useVueRouter();
  const { getRouter, navigateViewConfigRawMap, navigateBubbleMap } =
    inject(RouterProvideKey)!;
  const canOperatePage = (name: string, index: number) => {
    if (navigateViewConfigRawMap[index]) {
      const { include, exclude } = unref(navigateViewConfigRawMap[index]);
      if (include && include.includes(name)) {
        return false;
      }
      if (exclude && exclude.includes(name)) {
        return false;
      }
    }
    return true;
  };
  const localSelf = (kill: boolean) => {
    const { name, matched } = router.currentRoute.value;
    const dept = matched.length - 1;
    const views = unref(getRouter(dept));
    const index = views.findIndex((pageName) => pageName === name);
    const bubble = navigateBubbleMap[dept] || NOOP;
    if (canOperatePage(name as string, index)) {
      if (kill) {
        views.splice(index, 1);
      } else if (index === -1 && name) {
        bubble();
        views.push(name as string);
      }
    }
  };
  const killMaybeLinkPage = (to: RouteLocationRaw) => {
    //需要检查to的路由是否存在重定向
    //如果有重定向还需要检查重定向是否还会继续重定向
    //最终没有重定向的路由才是真正的目标路由
    //然后把这个路由的name获取出来
    const toPage = router.resolve(to);
    const toPageDept = toPage.matched.length - 1;
    const toPageViews = unref(getRouter(toPageDept));
    if (toPageViews) {
      const index = toPageViews.findIndex(
        (pageName) => pageName === toPage.name
      );
      if (canOperatePage(toPage.name as string, index)) {
        if (index > -1) {
          toPageViews.splice(index, 1);
        }
      }
    }
  };
  const handleRouterAction = (to: RouteLocationRaw, kill = false) => {
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
