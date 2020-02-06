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
      case "resize":
        this.shell.resize(data.cols, data.rows);
        break;
    }
  }

  emit(channel: string, data: any = {}): any {
    this.wc.send(this.id, { channel, data });
  }

  destroy() {
    ipcMain.removeListener(this.id, this.onIpcMain);
    this.shell.kill();
  }
}
