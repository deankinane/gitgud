import { Terminal as xterm } from "xterm";
import { spawn as spawnPty, IPty } from "node-pty-prebuilt-multiarch";

export default class Terminal {
  xterm: xterm;
  shell: IPty;
  cwd: string = "c:/";

  constructor(element: HTMLElement, workingDirectory?: string) {
    this.cwd = workingDirectory || this.cwd;

    this.shell = spawnPty("C:\\Program Files\\Git\\bin\\bash.exe", [], {
      name: "xterm-color",
      cwd: this.cwd,
      useConpty: true,
      env: process.env as { [key: string]: string }
    });

    this.xterm = new xterm({
      cursorStyle: "bar",
      disableStdin: false,
      windowsMode: true,
      logLevel: "debug"
    });

    this.xterm.open(element);

    this.shell.onData(data => this.onShellData(data));
    this.xterm.onData(data => this.onXtermData(data));
  }

  onXtermData(data: string) {
    this.shell.write(data);
  }

  onShellData(data: string) {
    this.xterm.write(data);
  }

  sendCommand(command: string) {
    this.shell.write(command + "\r");
  }

  kill() {
    this.shell.kill();
    this.xterm.dispose();
  }
}
