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
  private terminalShell: Terminal | null = null;

  mounted() {
    this.terminalShell = new Terminal(
      this.$refs["terminal-container"] as HTMLElement,
      null
    );
  }
}
</script>
