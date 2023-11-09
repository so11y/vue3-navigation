import { InjectionKey, Ref } from "vue";

export const RouterProvideKey = Symbol("RouterProvideKey") as InjectionKey<{
  addRouter: (deptId: number) => void;
  getRouter: (deptId: number) => Ref<string[]>;
  deleteRouter: (deptId: number) => void;
  routerMap: Record<number, Array<string>>;
}>;