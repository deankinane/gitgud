import { Terminal as xterm } from "xterm";
import { spawn as spawnPty } from "node-pty";

export default class Terminal {
  private xterm: xterm;
  private shell: any;
  private cwd: string = "c:/";
  private xtermElement?: HTMLElement;

  constructor(workingDirectory: string | null) {
    this.cwd = workingDirectory === null ? this.cwd : workingDirectory;

    this.xterm = new xterm({
      cursorStyle: "bar",
      disableStdin: false,
      windowsMode: true,
      logLevel: "debug"
    });

    this.shell = spawnPty("bash.exe", [], {
      name: "xterm-color",
      cwd: this.cwd,
      env: process.env as { [key: string]: string }
    });

    this.shell.on("data", (data: string | Uint8Array) => {
      this.xterm.write(data);
    });
    this.xterm.onData(data => this.shell.write(data));
  }

  public mount(element: HTMLElement) {
    this.xtermElement = element;
    this.xterm.open(this.xtermElement);
  }
}
