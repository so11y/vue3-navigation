import { mount } from "@vue/test-utils";
import { NavigateProvide, NavigateView } from "../../src";
import { Plugin } from "vue";

export function createSimpleApp(
  slot: () => JSX.Element,
  plugins: Array<Plugin>
) {
  return mount(() => <NavigateProvide>{slot()}</NavigateProvide>, {
    global: {
      plugins,
    },
  });
}
