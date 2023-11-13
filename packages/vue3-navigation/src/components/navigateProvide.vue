<script lang="ts">
import {
  unref,
  ComputedRef,
  reactive,
  provide,
  defineComponent,
  toRef,
} from "vue";
import { NavigateViewConfigRaw, RouterProvideKey } from "../types";

export default defineComponent({
  name: "NavigateProvide",
  setup: (_, { slots }) => {
    const provideDeptMap = reactive<Record<number, Array<string>>>({});
    const navigateViewConfigRawMap: Record<
      number,
      ComputedRef<NavigateViewConfigRaw>
    > = {};
    const navigateBubbleMap: Record<number, () => void> = {};
    const provideSource = {
      routerMap: provideDeptMap,
      navigateBubbleMap,
      navigateViewConfigRawMap,
      getRouter(deptId: number) {
        return toRef(provideDeptMap, deptId);
      },
      addRouter(
        deptId: number,
        navigateViewConfigRaw: ComputedRef<NavigateViewConfigRaw>,
        bubble: () => void
      ) {
        Reflect.set(provideDeptMap, deptId, []);
        Reflect.set(navigateViewConfigRawMap, deptId, navigateViewConfigRaw);
        Reflect.set(navigateBubbleMap, deptId, bubble);
        return toRef(provideDeptMap, deptId);
      },
      deleteRouter(deptId: number) {
        Reflect.deleteProperty(provideDeptMap, deptId);
        Reflect.deleteProperty(navigateViewConfigRawMap, deptId);
        Reflect.deleteProperty(navigateBubbleMap, deptId);
      },
    };
    provide(RouterProvideKey, provideSource);
    return () => slots.default?.();
  },
});
</script>
