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
  NavigateViewConfigRaw,
} from "./types";
import { NOOP, findRedirectName, hasBubbleProvide } from "./helper";

export function useKeepAliveViews(name: string): Ref<string[]> {
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
    if (canOperatePage(name as string, dept)) {
      if (kill) {
        views.splice(index, 1);
      } else if (index === -1 && name) {
        bubble();
        views.push(name as string);
      }
    }
  };
  const killMaybeLinkPage = (to: RouteLocationRaw) => {
    const maybeToPage = router.resolve(to);
    const toRouteLocation = findRedirectName(maybeToPage, router);
    const { matched, name } = toRouteLocation;
    const toPageDept = matched.length - 1;
    const toPageViews = unref(getRouter(toPageDept));
    if (toPageViews) {
      const index = toPageViews.findIndex((pageName) => pageName === name);
      if (index > -1 && canOperatePage(name as string, toPageDept)) {
        toPageViews.splice(index, 1);
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
