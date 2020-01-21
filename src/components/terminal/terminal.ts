import { Terminal as xterm } from "xterm";
const pty = __non_webpack_require__("node-pty");

export default class Terminal {
  private xterm: xterm;
  private shell: any;
  private cwd: string = "c:/";

  constructor(element: HTMLElement, workingDirectory: string | null) {
    this.cwd = workingDirectory === null ? this.cwd : workingDirectory;

    this.xterm = new xterm({
      cursorStyle: "bar",
      disableStdin: false
    });

    this.xterm.open(element);

    this.shell = pty.spawn("bash.exe", [], {
      name: "xterm-color",
      cwd: this.cwd,
      env: process.env
    });

    this.xterm.onData(data => this.shell.write(data));
    this.shell.on("data", (data: string | Uint8Array) => {
      this.xterm.write(data);
    });

    //this.shell.write("clear");
  }
}
