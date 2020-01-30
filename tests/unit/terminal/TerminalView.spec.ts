import { shallowMount, Wrapper } from "@vue/test-utils";
import TerminalView from "@/components/terminal/TerminalView";

describe("TerminalView.vue", () => {
  let wrapper: Wrapper<TerminalView>;

  beforeEach(() => {
    wrapper = shallowMount(TerminalView);
  });

  it("xterm element should be created", () => {
    expect(wrapper.find(".xterm").exists()).toBe(true);
  });

  it("terminal should be killed when component destroyed", () => {
    let terminalKill: jest.SpyInstance | undefined;

    if (wrapper.vm.terminalShell)
      terminalKill = jest.spyOn(wrapper.vm.terminalShell, "kill");

    wrapper.vm.$destroy();

    expect(terminalKill).toHaveBeenCalled();
  });
});
