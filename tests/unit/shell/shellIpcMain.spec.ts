import ShellIpcMain from "@/app/shell/shell-ipc-main";
import { v1 as uuid } from "uuid";
import IpcPayload from "@/app/shell/shell-ipc-payload";
import { BrowserWindow } from "tests/mocks/electron-mock";

describe("shell-ipc-main.ts", () => {
  it("sendData() should emit data event", () => {
    const id = uuid();
    let channel: string = "";
    const win = new BrowserWindow();
    const spy = jest
      .spyOn(win.webContents, "send")
      .mockImplementation((uid: string, payload: IpcPayload) => {
        channel = payload.channel;
      });

    const ipc = new ShellIpcMain(id, win.webContents as any);
    ipc.sendData("test");
    expect(channel).toBe("data");
  });
});
