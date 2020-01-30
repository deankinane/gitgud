import Vue from "vue";
import Component from "vue-class-component";
import Terminal from "@/components/terminal/terminal";

@Component
export default class TerminalView extends Vue {
  terminalShell?: Terminal;

  created() {}

  mounted() {
    this.terminalShell = new Terminal(
      this.$refs["terminal-container"] as HTMLElement
    );
  }

  beforeDestroy() {
    if (this.terminalShell) {
      this.terminalShell.kill();
    }
  }
}
