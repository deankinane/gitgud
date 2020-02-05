<template>
  <div>
    <div data-test-id="terminal-container" ref="terminal-container"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ipcRenderer } from "electron";
import { v1 as uuid } from "uuid";
import { ShellProperties } from "@/app/shell/shell-session";
import { Terminal } from "xterm";

@Component
export default class TerminalView extends Vue {
  uid?: string;
  terminal?: Terminal;

  created() {
    this.uid = uuid();
    this.terminal = new Terminal({
      cursorStyle: "bar",
      disableStdin: false,
      windowsMode: true,
      logLevel: "debug"
    });

    this.terminal.onData(data => this.emit("data", data));
    ipcRenderer.on(this.uid, this.onShellEvent.bind(this));
  }

  mounted() {
    if (this.uid) {
      this.terminal!.open(this.$refs["terminal-container"] as HTMLElement);

      const props: ShellProperties = {
        uid: this.uid
      };
      //console.log("uuid: " + props.uid);
      ipcRenderer.send("create-shell", props);
    }
  }

  emit(channel: string, data: string) {
    if (this.uid) {
      //console.log(channel + ":" + data);
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
}
</script>
