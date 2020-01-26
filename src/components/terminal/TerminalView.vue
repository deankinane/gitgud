<template>
  <div data-test-id="terminal-container" ref="terminal-container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Terminal from "@/components/terminal/terminal";

@Component
export default class TerminalView extends Vue {
  private terminalShell?: Terminal;

  created() {}

  mounted() {
    this.terminalShell = new Terminal(
      this.$refs["terminal-container"] as HTMLElement
    );
  }
}
</script>
