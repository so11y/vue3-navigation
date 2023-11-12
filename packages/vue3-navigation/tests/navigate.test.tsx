import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { NavigateProvide, NavigateLink, NavigateView } from "../src/components";
import { RouterProvideKey } from "../src";
import { computed, h, inject, unref } from "vue";
import { NavigateViewConfigRaw } from "../src/types";
import { createSimpleRouter } from "./helper/createRouter";
import { createSimpleApp } from "./helper/createApp";

describe("navigate", () => {
  test("navigateProvide mount slot", () => {
    const navigateProvideInstance = mount(() => (
      <>
        <NavigateProvide>
          <div>test</div>
        </NavigateProvide>
      </>
    ));

    expect(navigateProvideInstance.html()).toMatchInlineSnapshot(
      '"<div>test</div>"'
    );
  });

  test("navigateProvide provide", () => {
    const fakeNavigateViewConfigRaw: NavigateViewConfigRaw = {
      include: ["a"],
      exclude: ["b"],
      max: Infinity,
    };

    const NavigateProvideSlot = {
      setup() {
        const provideSource = inject(RouterProvideKey)!;
        const { deleteRouter, addRouter, navigateViewConfigRawMap, getRouter } =
          provideSource;
        expect(provideSource).not.toBeNull();
        addRouter(
          0,
          computed(() => fakeNavigateViewConfigRaw),
          () => {}
        );
        const deptOneRouter = getRouter(0);
        expect(deptOneRouter).not.toBeNull();
        expect(unref(deptOneRouter?.value)).toEqual(["a"]);
        expect(unref(navigateViewConfigRawMap[0])).toMatchObject({
          include: ["a"],
          exclude: ["b"],
          max: Infinity,
        });
        deleteRouter(0);
        expect(unref(navigateViewConfigRawMap[0])).toBeUndefined();
        return () => null;
      },
    };

    mount(() => (
      <>
        <NavigateProvide>
          {{
            default: () => h(NavigateProvideSlot),
          }}
        </NavigateProvide>
      </>
    ));

    // expect({a:1}).toEqual({})
  });

  test("navigateView mount", async () => {
    const router = createSimpleRouter();
    router.push("/");
    await router.isReady();
    const root = createSimpleApp(() => <NavigateView name="App" />, [router]);
    expect(root.html()).toMatchInlineSnapshot('"<div>Root</div>"');
  });

  test("navigateLink mount", async () => {
    const router = createSimpleRouter();
    router.push("/");
    await router.isReady();
    const root = createSimpleApp(() => <NavigateLink to="/">link</NavigateLink>,[router]);
    expect(root.html()).toMatchInlineSnapshot('"<a>link</a>"');
  });
});
