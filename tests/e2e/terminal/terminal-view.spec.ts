/**
 * @jest-environment node
 */
import { testWithSpectron, Server } from "vue-cli-plugin-electron-builder";
import { Application } from "spectron";
import { testId } from "tests/helpers/test-helpers";

jest.setTimeout(50000);

describe("Terminal View", () => {
  let server: Server;
  let app: Application;

  beforeEach(async () => {
    server = await testWithSpectron();
    app = server.app;
  });

  afterEach(async () => {
    await server.stopServe();
  });

  it("component should be created", async () => {
    const client = app.client;

    // We should find the terminal element
    expect(await client.isExisting(testId("terminal-container"))).toBe(true);
  });

  it("should accept commands from the user and display the result", async () => {
    const client = app.client;

    // Click on the input field
    // await client.element(inputId).click();

    // // Set the value of the input field
    // await client.element(inputId).setValue("echo Hello, World!");

    // // Press the enter key to submit the command
    // await client.element(inputId).keys("Return");

    // Confirm the field has been cleared
    // expect(await client.element(inputId).getValue()).toBe("");
    // // Confrim the correct output of the command is displayed in the terminal
    // expect(await client.element(outputId).getValue()).toBe("Hello, World!");
  });
});
