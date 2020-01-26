import { shallowMount } from "@vue/test-utils";
import TerminalView from "@/components/terminal/TerminalView.vue";

describe("TerminalView.vue", () => {
  it("creates xterm element", () => {
    const wrapper = shallowMount(TerminalView);
    expect(wrapper.find(".xterm").exists()).toBe(true);
  });
});
