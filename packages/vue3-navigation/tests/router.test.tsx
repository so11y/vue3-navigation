import { describe, expect, test } from "vitest";
import { NavigateView, RouterProvideKey, useRouter } from "../src";
import { createSimpleRouter } from "./helper/createRouter";
import { createSimpleApp } from "./helper/createApp";
import { h, inject, nextTick, ref } from "vue";
import { flushPromises } from "@vue/test-utils";
describe("router", () => {
  test("useRouter push ", async () => {
    let provideSource: typeof RouterProvideKey;
    function getProvideSource() {
      return provideSource;
    }
    const HomeRouter = {
      path: "/home",
      name: "Home",
      component: {
        name: "Home",
        setup() {
          const router = useRouter();
          const inputValue = ref("");
          return () => (
            <>
              <input type="text" v-model={inputValue.value} />
              <div onClick={() => router.push("/user")}>
                Home{inputValue.value}
              </div>
            </>
          );
        },
      },
    };
    const UserRouter = {
      path: "/user",
      name: "User",
      component: {
        name: "User",
        setup() {
          return () => <div>User</div>;
        },
      },
    };
    const NavigateProvideSlot = () => ({
      setup() {
        provideSource = inject(RouterProvideKey)! as any;
        return () => null;
      },
    });
    const router = createSimpleRouter([HomeRouter, UserRouter]);
    router.push("/home");
    await router.isReady();
    const root = createSimpleApp(
      () => (
        <>
          {h(NavigateProvideSlot())}
          <NavigateView name="App" />
        </>
      ),
      [router]
    );
    root.find("input").setValue("123");
    await nextTick();
    expect(root.html()).toMatchInlineSnapshot(`
      "<input type=\\"text\\">
      <div>Home123</div>"
    `);
    root.find("div").trigger("click");
    await flushPromises();
    expect(root.html()).toMatchInlineSnapshot('"<div>User</div>"');
    router.back();
    await flushPromises();
    expect(root.html()).toMatchInlineSnapshot(`
      "<input type=\\"text\\">
      <div>Home123</div>"
    `);
  });
});
