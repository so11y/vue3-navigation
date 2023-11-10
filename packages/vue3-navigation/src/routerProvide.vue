<script lang="ts">
import { reactive, provide, defineComponent, toRef } from "vue";
import { RouterProvideKey } from "./provideTypes";

export default defineComponent({
  name: "RouterProvide",
  setup: (_, { slots }) => {
    const provideDeptMap = reactive<Record<number, Array<string>>>({});
    const provideSource = {
      routerMap: provideDeptMap,
      getRouter(deptId: number) {
        if (!Reflect.has(provideDeptMap, deptId)) {
          provideSource.addRouter(deptId);
        }
        return toRef(provideDeptMap, deptId);
      },
      addRouter(deptId: number) {
        Reflect.set(provideDeptMap, deptId, []);
      },
      deleteRouter(deptId: number) {
        Reflect.deleteProperty(provideDeptMap, deptId);
      },
    };
    provide(RouterProvideKey, provideSource);
    return () => slots.default?.();
  },
});
</script>
./types./provide-types