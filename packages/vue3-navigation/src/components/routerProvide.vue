<script lang="ts">
import { unref,ComputedRef,reactive, provide, defineComponent, toRef } from "vue";
import { NavigateViewConfigRaw, RouterProvideKey } from "../types";

export default defineComponent({
  name: "RouterProvide",
  setup: (_, { slots }) => {
    const provideDeptMap = reactive<Record<number, Array<string>>>({});
    const navigateViewConfigRawMap = reactive<
      Record<number, ComputedRef<NavigateViewConfigRaw>>
    >({});
    const provideSource = {
      routerMap: provideDeptMap,
      navigateViewConfigRawMap,
      getRouter(deptId: number) {
        return toRef(provideDeptMap, deptId);
      },
      addRouter(
        deptId: number,
        navigateViewConfigRaw: ComputedRef<NavigateViewConfigRaw>
      ) {
        const { include = [] } = unref(navigateViewConfigRaw);
        Reflect.set(provideDeptMap, deptId, [...include]);
        Reflect.set(navigateViewConfigRawMap, deptId, navigateViewConfigRaw);
        return toRef(provideDeptMap, deptId);
      },
      deleteRouter(deptId: number) {
        Reflect.deleteProperty(provideDeptMap, deptId);
        Reflect.deleteProperty(navigateViewConfigRawMap, deptId);
      },
    };
    provide(RouterProvideKey, provideSource);
    return () => slots.default?.();
  },
});
</script>
