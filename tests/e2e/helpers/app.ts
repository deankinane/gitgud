import { Application } from "spectron";
import os from "os";

let app: Application;

export function startApp(): Promise<Application> {
  app = new Application({
    path:
      os.platform() === "win32"
        ? "./dist_electron/win-unpacked/gitgud.exe"
        : "./dist_electron/linux-unpacked/gitgud"
  });
  return app.start();
}

export function stopApp(): Promise<Application> {
  return app.stop();
}
