
declare module "vue" {
  interface ComponentInternalInstance {
    provides: Record<symbol, any>;
  }
}
export {}