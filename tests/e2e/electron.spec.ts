/**
 * @jest-environment node
 */
import { testWithSpectron, Options } from "vue-cli-plugin-electron-builder";
import spectron from "spectron";

jest.setTimeout(50000);

describe("Main Window", () => {
  it("should load properly", async () => {
    // Wait for dev server to start
    const { stdout, url, stopServe, app } = await testWithSpectron(spectron);
    const win = app.browserWindow;
    const client = app.client;

    // Window was created
    expect(await client.getWindowCount()).toBe(1);
    // It is not minimized
    expect(await win.isMinimized()).toBe(false);
    // Window is visible
    expect(await win.isVisible()).toBe(true);
    // Size is correct
    const { width, height } = await win.getBounds();
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    // App is loaded properly
    expect(
      /Welcome to Your Vue\.js (\+ TypeScript )?App/.test(
        await client.getHTML("#app")
      )
    ).toBe(true);

    stopServe();
  });
});
