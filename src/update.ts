import { autoUpdater, app, dialog } from "electron";
import isDevelopment from "electron-is-dev";

// Update server config
const server = "https://hazel.deankinane.now.sh";
const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
console.log(feed);

export default function configureUpdater() {
  autoUpdater.setFeedURL({ url: feed });
  if (!isDevelopment) {
    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 60000);
  }

  autoUpdater.on(
    "update-downloaded",
    async (event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: "info",
        buttons: ["Restart", "Later"],
        title: "Application Update",
        message: process.platform === "win32" ? releaseNotes : releaseName,
        detail:
          "A new version has been downloaded. Restart the application to apply the updates."
      };

      const dlgResult = await dialog.showMessageBox(dialogOpts);
      if (dlgResult === 0) autoUpdater.quitAndInstall();
    }
  );

  autoUpdater.on("error", message => {
    const dialogOpts = {
      type: "error",
      buttons: ["OK"],
      title: "Application Update Error",
      message: "There was a problem updating the application",
      detail: message.message
    };
    dialog.showMessageBox(dialogOpts);
  });
}
