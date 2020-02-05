import { WebContents } from "electron";
import IpcPayload from "./shell-ipc-payload";

export default class ShellIpcMain {
  uid: string;
  wc: WebContents;

  constructor(uid: string, wc: WebContents) {
    this.uid = uid;
    this.wc = wc;
  }

  sendData(data: string) {
    const payload: IpcPayload = {
      channel: "data",
      data: data
    };
    this.wc.send(this.uid, payload);
  }
}
