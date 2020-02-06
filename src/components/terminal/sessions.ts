import { ShellSession } from "./shell-session";
import { BrowserWindow, ipcMain } from "electron";

export interface ShellProperties {
  uid: string;
}

export const Sessions: ShellSession[] = new Array<ShellSession>();

export function InitShellSessionListener(win: BrowserWindow) {
  ipcMain.on("create-shell", (event: string, data: ShellProperties) => {
    console.log("create-shell: " + data.uid);
    const newSession = new ShellSession(win, data.uid);
    Sessions.push(newSession);
  });
}

export function KillAllSessions() {
  Sessions.forEach(session => {
    session.destroy();
  });
}
