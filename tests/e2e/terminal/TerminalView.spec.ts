import { testWithSpectron, Server } from "vue-cli-plugin-electron-builder";
import { Application, SpectronWindow, SpectronClient } from "spectron";

jest.setTimeout(50000);

describe("TerminalView", () => {
  let server: Server;
  let app: Application;
  let win: SpectronWindow;
  let client: SpectronClient;

  beforeAll(async () => {
    server = await testWithSpectron();
    app = server.app;
    win = app.browserWindow;
    client = app.client;
  });

  test("Xterm element was created", async () => {
    expect(await client.element(".xterm").isExisting()).toBe(true);
  });

  afterAll(async () => {
    await server.stopServe();
  });
});
