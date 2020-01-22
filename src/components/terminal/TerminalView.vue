<template>
  <div data-test-id="terminal-container" ref="terminal-container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Terminal from "@/components/terminal/terminal";
require("xterm/css/xterm.css");

@Component
export default class TerminalView extends Vue {
  private terminalShell?: Terminal;

  created() {
    this.terminalShell = new Terminal(null);
  }

  mounted() {
    if (this.terminalShell) {
      this.terminalShell.mount(this.$refs["terminal-container"] as HTMLElement);
    }
  }
}
</script>
