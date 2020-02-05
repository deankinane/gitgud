import { startApp, stopApp } from "tests/e2e/helpers/app";
import { Application, SpectronWindow, SpectronClient } from "spectron";

jest.setTimeout(60000);

describe("TerminalView", () => {
  let app: Application;
  let win: SpectronWindow;
  let client: SpectronClient;

  beforeEach(async done => {
    app = await startApp();
    win = app.browserWindow;
    client = app.client;
    done();
  });

  test("Xterm element was created", async done => {
    expect(await client.element(".xterm").isExisting()).toBe(true);
    done();
  });

  afterEach(async done => {
    await stopApp();
    done();
  });
});

// describe("TerminalView", () => {
//   let server: Server;
//   let app: Application;
//   let win: SpectronWindow;
//   let client: SpectronClient;

//   beforeEach(async done => {
//     server = await testWithSpectron();
//     app = server.app;
//     win = app.browserWindow;
//     client = app.client;
//     done();
//   });

//   test("Xterm element was created", async done => {
//     expect(await client.element(".xterm").isExisting()).toBe(true);
//     done();
//   });

//   afterEach(async done => {
//     await app.stop();
//     await server.stopServe();
//     done();
//   });
// });
