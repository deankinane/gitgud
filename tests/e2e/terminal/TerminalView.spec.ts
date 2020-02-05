import { startApp, stopApp } from "tests/e2e/helpers/app";
import { Application, SpectronClient } from "spectron";

jest.setTimeout(60000);

describe("TerminalView", () => {
  let app: Application;
  let client: SpectronClient;

  beforeEach(async done => {
    app = await startApp();
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
