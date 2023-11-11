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
    bubble: NOOP,
  };
}

export function useKeepAliveViews(name = "NavigateView"): Ref<string[]> {
  const ctx = getCurrentInstance()!;
  const { dept, bubble: parentBubble } = hasBubbleProvide();
  const { routerMap, addRouter, deleteRouter } = inject(RouterProvideKey)!;
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
    bubble,
    dept: currentDept,
  });
  onUnmounted(() => deleteRouter(currentDept));
  return addRouter(currentDept, navigateViewConfigRawProps);
}

export function useRouter(): Router {
  const router = useVueRouter();
  const ctx = getCurrentInstance()!;
  const { bubble } = ctx.provides[ProvidePageKeepAliveKey as symbol] as {
    bubble: () => void;
  };
  const { getRouter, navigateViewConfigRawMap } = inject(RouterProvideKey)!;
  const canOperatePage = (name: string, index: number) => {
    if (navigateViewConfigRawMap[index]) {
      const { include, exclude } = unref(navigateViewConfigRawMap[index]);
      if (include && !include.includes(name)) {
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
    const views = unref(getRouter(matched.length - 1));
    const index = views.findIndex((pageName) => pageName === name);
    if (canOperatePage(name as string, index)) {
      if (kill) {
        views.splice(index, 1);
      } else if (index === -1 && name) {
        views.push(name as string);
      }
    }
  };
  const killMaybeLinkPage = (to: RouteLocationRaw) => {
    const toPage = router.resolve(to);
    const toPageDept = toPage.matched.length - 1;
    const toPageViews = unref(getRouter(toPageDept));
    if (toPageViews) {
      const index = toPageViews.findIndex(
        (pageName) => pageName === toPage.name
      );
      if (canOperatePage(toPage.name as string, index) === false) {
        if (index > -1) {
          toPageViews.splice(index, 1);
        }
      }
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
