import IpcPayload from "@/app/shell/shell-ipc-payload";

class BrowserWindow {
  constructor() {
    this.webContents = new WebContents();
  }
  webContents: WebContents;
}

class WebContents {
  constructor() {}
  send(uid: string, payload: IpcPayload) {}
}

const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn()
};

export { BrowserWindow, WebContents, ipcRenderer };
