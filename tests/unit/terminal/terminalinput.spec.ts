import { shallowMount, Wrapper } from "@vue/test-utils";
import TerminalInput from "@/components/terminal/TerminalInput.vue";
import { testId } from "tests/helpers/test-helpers";

describe("Press enter when typing in the terminal", () => {
  let wrapper: Wrapper<TerminalInput>;
  let terminalInputId: string;
  let terminalInputElement: HTMLInputElement;

  beforeEach(() => {
    wrapper = shallowMount(TerminalInput);
    terminalInputId = testId("terminal-input");
    terminalInputElement = wrapper.find(terminalInputId)
      .element as HTMLInputElement;

    // Set the value of the textbox
    wrapper.find(terminalInputId).setValue("echo Hello, World!");

    // Press the enter key in the textbox
    wrapper.find(terminalInputId).trigger("keypress", { key: "Enter" });
  });

  it("clears the text field", () => {
    expect(terminalInputElement.value).toBe("");
  });

  it("submits the command to the terminal", () => {
    expect(wrapper.emitted("command-sent")[0]).toEqual(["echo Hello, World!"]);
  });
});
