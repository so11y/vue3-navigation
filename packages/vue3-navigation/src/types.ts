import { ComputedRef, InjectionKey, Ref } from "vue";
export const RouterProvideKey = Symbol("RouterProvideKey") as InjectionKey<{
  addRouter: (
    deptId: number,
    navigateViewConfigRaw: ComputedRef<NavigateViewConfigRaw>,
    bubble: () => void
  ) => Ref<string[]>;
  getRouter: (deptId: number) => Ref<string[]>;
  deleteRouter: (deptId: number) => void;
  routerMap: Record<number, Array<string>>;
  navigateViewConfigRawMap: Record<number, ComputedRef<NavigateViewConfigRaw>>;
  navigateBubbleMap: Record<number, () => void>;
}>;

export interface NavigateViewProps {
  include?: string[];
  exclude?: string[];
  max?: number;
  name: string;
}

export type NavigateViewConfigRaw = Omit<NavigateViewProps, "name">;

export type ProvideTypes = {
  dept: number;
};

export const ProvidePageKeepAliveKey = Symbol() as InjectionKey<ProvideTypes>;
