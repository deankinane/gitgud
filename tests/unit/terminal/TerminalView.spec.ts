import { shallowMount, Wrapper } from "@vue/test-utils";
import TerminalView from "@/components/terminal/TerminalView.vue";
import { testId } from "tests/helpers/test-helpers";

describe("TerminalVue component", () => {
  let wrapper: Wrapper<TerminalView>;
  let terminalInputId: string;

  beforeEach(() => {
    wrapper = shallowMount(TerminalView);
    terminalInputId = testId("terminal-container");
  });

  it("should create an xterm element", () => {
    // wrapper.find(terminalInputId).find()
  });
});
