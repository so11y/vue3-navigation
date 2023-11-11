<script lang="ts">
import { defineComponent, PropType,h } from "vue";
import { RouteLocationRaw } from "vue-router";
import { useRouter } from "../router";
export default defineComponent({
  name: "NavigateLink",
  props: {
    to: {
      type: [Object, String] as PropType<RouteLocationRaw>,
      required: true,
    },
  },
  setup({ to }, { slots }) {
    const router = useRouter();
    return () =>
      h(
        "a",
        {
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            router.push(to);
          },
        },
        slots.default?.()
      );
  },
});
</script>
