import { testWithSpectron, Server } from "vue-cli-plugin-electron-builder";
import { Application, SpectronWindow, SpectronClient } from "spectron";

jest.setTimeout(40000);

describe("TerminalView", () => {
  let server: Server;
  let app: Application;
  let win: SpectronWindow;
  let client: SpectronClient;

  beforeEach(async done => {
    server = await testWithSpectron();
    app = server.app;
    win = app.browserWindow;
    client = app.client;
    done();
  });

  test("Xterm element was created", async done => {
    expect(await client.element(".xterm").isExisting()).toBe(true);
    done();
  });

  afterEach(async done => {
    await app.stop();
    await server.stopServe();
    done();
  });
});
