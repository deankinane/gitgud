import { BrowserWindow, ipcMain } from "electron";
import { IPty, spawn as spawnPty } from "node-pty-prebuilt-multiarch";

export class ShellSession {
  win: BrowserWindow;
  id: string;
  shell: IPty;
  cwd: string = "/c/dev/repos";

  constructor(win: BrowserWindow, uid: string) {
    this.win = win;
    this.id = uid;

    this.shell = spawnPty("C:\\Program Files\\Git\\bin\\bash.exe", [], {
      name: "xterm-color",
      cwd: "",
      useConpty: true,
      env: process.env as { [key: string]: string }
    });

    this.shell.onData(data => this.emit("data", data));
    ipcMain.on(uid, this.onIpcMain.bind(this));

    this.emit("ready", {});
  }

  get wc() {
    return this.win.webContents;
  }

  onIpcMain(event: any, { channel, data }: { channel: string; data: any }) {
    console.log(channel + ":" + data);
    switch (channel) {
      case "data":
        this.shell.write(data);
        break;
      case "kill":
        this.destroy();
        break;
    }
  }

  emit(channel: string, data: any = {}): any {
    this.wc.send(this.id, { channel, data });
  }

  destroy() {
    if (this.id) {
      ipcMain.removeListener(this.id, this.onIpcMain);
      this.shell.kill();
    }
  }
}

export interface ShellProperties {
  uid: string;
}

export const Sessions: ShellSession[] = new Array<ShellSession>();

export default function InitShellSessionListener(win: BrowserWindow) {
  console.log("set up create shell listener");
  ipcMain.on("create-shell", (event: string, data: ShellProperties) => {
    console.log("create-shell: " + data.uid);
    const newSession = new ShellSession(win, data.uid);
    Sessions.push(newSession);
  });
}
