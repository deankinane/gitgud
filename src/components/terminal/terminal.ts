import { Terminal as xterm } from "xterm";
import { spawn as spawnPty } from "node-pty";

export default class Terminal {
  private xterm: xterm;
  private shell: any;
  private cwd: string = "c:/";
  private xtermElement?: HTMLElement;

  constructor(element: HTMLElement, workingDirectory?: string) {
    this.xtermElement = element;
    this.cwd = workingDirectory || this.cwd;

    this.xterm = new xterm({
      cursorStyle: "bar",
      disableStdin: false,
      windowsMode: true,
      logLevel: "debug"
    });

    this.xterm.open(this.xtermElement);

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
}
