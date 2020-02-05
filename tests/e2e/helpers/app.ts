import { Application } from "spectron";

let app: Application;

export function startApp(): Promise<Application> {
  app = new Application({
    path: "./dist_electron/win-unpacked/gitgud.exe"
  });
  return app.start();
}

export function stopApp(): Promise<Application> {
  return app.stop();
}
