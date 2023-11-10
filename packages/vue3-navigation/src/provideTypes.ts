import { InjectionKey, Ref } from "vue";
import type { ProvideTypes } from "../vue-types";
export const RouterProvideKey = Symbol("RouterProvideKey") as InjectionKey<{
  addRouter: (deptId: number) => void;
  getRouter: (deptId: number) => Ref<string[]>;
  deleteRouter: (deptId: number) => void;
  routerMap: Record<number, Array<string>>;
}>;

export const ProvidePageKeepAliveKep = Symbol() as InjectionKey<ProvideTypes>;