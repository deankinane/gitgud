<template>
  <div ref="root" class="terminal-outer-container" data-colour="terminal-bg">
    <div ref="char-measure-element"></div>
    <div
      class="integrated-terminal"
      data-test-id="terminal-container"
      ref="terminal-container"
    ></div>
  </div>
</template>

<style lang="css">
.terminal-outer-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left: 10px;
}

.integrated-terminal {
  height: 100%;
}

.integrated-terminal .xterm {
  position: absolute;
  bottom: 0;
  top: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ipcRenderer } from "electron";
import { v1 as uuid } from "uuid";
import { ShellProperties } from "@/components/terminal/sessions";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import os from "os";
import { Dimension, measureFont } from "@/components/terminal/terminal-helpers";
import { applyColours } from "@/app/config/colours";

@Component
export default class TerminalView extends Vue {
  uid?: string;
  terminal?: Terminal;
  charMeasureElement?: HTMLElement;

  created() {
    this.uid = uuid();
    this.terminal = new Terminal({
      cursorStyle: "bar",
      disableStdin: false,
      windowsMode: os.platform() === "win32",
      logLevel: "debug"
    });

    this.terminal.onData(data => this.emit("data", data));
    ipcRenderer.on(this.uid, this.onShellEvent.bind(this));
  }

  mounted() {
    this.charMeasureElement = this.$refs["char-measure-element"] as HTMLElement;
    if (this.uid) {
      const container = this.$refs["terminal-container"] as HTMLElement;
      this.terminal!.open(container);

      const props: ShellProperties = {
        uid: this.uid
      };
      ipcRenderer.send("create-shell", props);
      this.layout(new Dimension(container.clientWidth, container.clientHeight));
    }

    applyColours(this.$refs["root"] as HTMLElement);
  }

  emit(channel: string, data: any) {
    if (this.uid) {
      ipcRenderer.send(this.uid, { channel, data });
    }
  }

  onShellData(data: string) {
    this.terminal!.write(data);
  }

  onShellKill(data: string) {}

  onShellEvent = (
    event: any,
    { channel, data }: { channel: string; data: any }
  ) => {
    switch (channel) {
      case "data":
        this.onShellData(data);
        break;
      case "kill":
        this.onShellKill(data);
        break;
    }
  };

  beforeDestroy() {
    this.emit("kill", "");
  }

  layout(dimension: Dimension): void {
    let fontDimension = measureFont(
      this.terminal!.getOption("fontFamily"),
      this.terminal!.getOption("fontSize"),
      this.terminal!.getOption("lineHeight"),
      this.charMeasureElement!
    );
    let cols = Math.floor(dimension.width / fontDimension.width);
    let rows = Math.floor(dimension.height / fontDimension.height);
    if (cols <= 0 || rows <= 0) {
      return;
    }
    if (this.terminal!) {
      this.terminal!.resize(cols, rows);
      this.terminal!.element!.style.width = dimension.width + "px";
    }

    this.emit("resize", {
      cols: cols,
      rows: rows
    });
  }
}
</script>
