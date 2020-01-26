import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import TerminalView from "@/components/terminal/TerminalView.vue";
import { Terminal } from "xterm";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("TerminalView.vue", () => {
  it("creates xterm element", () => {
    const wrapper = shallowMount(TerminalView);
    expect(wrapper.find(".xterm").exists()).toBe(true);
  });
});
