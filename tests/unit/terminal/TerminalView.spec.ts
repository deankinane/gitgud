import { shallowMount, Wrapper } from "@vue/test-utils";
import TerminalView from "@/components/terminal/TerminalView.vue";

describe("TerminalView.vue", () => {
  let wrapper: Wrapper<TerminalView>;

  beforeEach(() => {
    wrapper = shallowMount(TerminalView, { attachToDocument: true });
  });

  it("xterm element should be created", () => {
    expect(wrapper.find(".xterm").exists()).toBe(true);
  });

  it("terminal should be killed when component destroyed", () => {
    let killEventEmmitted: boolean = false;

    jest
      .spyOn(wrapper.vm, "emit")
      .mockImplementation((channel: string, data: string) => {
        if (channel === "kill") {
          killEventEmmitted = true;
        }
      });

    wrapper.vm.$destroy();

    expect(killEventEmmitted).toBe(true);
  });

  it("resize() should make set the terminal size correctly", () => {
    //wrapper.find("")
  });

  afterEach(() => {
    wrapper.destroy();
  });
});
