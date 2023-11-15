import { getCurrentInstance } from "vue";
import { RouteLocation, Router } from "vue-router";
import { ProvidePageKeepAliveKey, ProvideTypes } from "./types";

export function isFunction<T = any>(
  callback: any
): callback is (...args: any[]) => T {
  return typeof callback === "function";
}

export function NOOP() {}

export function hasBubbleProvide(): ProvideTypes {
  const ctx = getCurrentInstance()!;
  if ((ProvidePageKeepAliveKey as symbol) in ctx.parent!.provides) {
    return ctx.parent?.provides[ProvidePageKeepAliveKey as symbol];
  }
  return {
    dept: -1,
  };
}

export function findRedirectName(maybeToPage: RouteLocation, router: Router) {
  for (const value of maybeToPage.matched) {
    if (value.name === maybeToPage.name && value.redirect) {
      const redirectPage = router.resolve(
        isFunction(value.redirect)
          ? value.redirect(maybeToPage)
          : value.redirect
      );
      return findRedirectName(redirectPage, router);
    }
  }
  return maybeToPage;
}
