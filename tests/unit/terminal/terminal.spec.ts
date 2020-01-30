import Terminal from "@/components/terminal/terminal";

describe("terminal.ts", () => {
  let terminal: Terminal;
  let onShellData: jest.SpyInstance;

  beforeEach(() => {
    terminal = new Terminal(document.createElement("div"));
    onShellData = jest.spyOn(terminal, "onShellData");
  });

  afterEach(() => {
    terminal.kill();
  });

  it("should create shell instance when constructed", () => {
    expect(terminal.shell.pid).toBeGreaterThan(0);
  });

  it("sendCommand() should write to the shell", done => {
    terminal.sendCommand("echo Hello, World!");

    const interval = setInterval(() => {
      expect(onShellData).toHaveBeenCalled();
      clearInterval(interval);
      done();
    }, 500);
  });
});
