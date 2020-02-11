<template>
  <div ref="root" class="terminal-outer-container" data-colour="terminal-bg">
    <div ref="char-measure-element"></div>
    <div
      class="integrated-terminal"
      data-test-id="terminal-container"
      ref="terminal-container"
      @contextmenu.prevent="onRightClick"
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
}

.integrated-terminal {
  height: 100%;
}

.integrated-terminal .xterm {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 10px;
  right: 0;
}

.integrated-terminal .xterm .xterm-screen canvas {
  position: absolute;
  right: -20px;
  bottom: 0;
  left: 0;
  top: auto;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ipcRenderer, Rectangle, clipboard } from "electron";
import { v1 as uuid } from "uuid";
import { ShellProperties } from "@/components/terminal/sessions";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { Dimension, measureFont } from "@/components/terminal/terminal-helpers";
import { applyColours } from "@/app/config/colours";

@Component
export default class TerminalView extends Vue {
  uid?: string;
  terminal?: Terminal;
  charMeasureElement?: HTMLElement;
  containerElement?: HTMLElement;
  resizeDelayTimer?: NodeJS.Timeout;

  created() {
    this.uid = uuid();
    this.terminal = new Terminal({
      cursorStyle: "bar",
      disableStdin: false,
      windowsMode: true,
      logLevel: "debug"
    });

    this.terminal.onData(data => this.emit("data", data));
    this.terminal.onSelectionChange(this.onSelection.bind(this));

    ipcRenderer.on(this.uid, this.onShellEvent.bind(this));
    ipcRenderer.on("window-resized", this.resizeToFitAvailableSpace.bind(this));
  }

  mounted() {
    this.charMeasureElement = this.$refs["char-measure-element"] as HTMLElement;
    this.containerElement = this.$refs["terminal-container"] as HTMLElement;

    if (this.uid) {
      this.terminal!.open(this.containerElement);

      const props: ShellProperties = {
        uid: this.uid
      };
      ipcRenderer.send("create-shell", props);
      this.resizeToFitAvailableSpace();
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

  resizeToFitAvailableSpace() {
    clearTimeout(this.resizeDelayTimer!);
    this.resizeDelayTimer = setTimeout(() => {
      this.resize(
        new Dimension(
          this.containerElement!.clientWidth,
          this.containerElement!.clientHeight
        )
      );
    }, 500);
  }

  resize(dimension: Dimension): void {
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
    }

    this.emit("resize", {
      cols: cols,
      rows: rows
    });
  }

  onRightClick(e: MouseEvent) {
    this.terminal!.paste(clipboard.readText("clipboard"));
  }

  onSelection() {
    if (this.terminal!.hasSelection()) {
      clipboard.writeText(this.terminal!.getSelection());
      console.log(this.terminal!.getSelection());
    }
  }
}
</script>
