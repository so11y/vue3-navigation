import {InjectionKey} from "vue"

export type ProvideTypes = {
  dept: number;
  bubble: () => void;
};
declare module "vue" {
  interface ComponentInternalInstance {
    provides: Record<symbol, any>;
  }
}
export {}