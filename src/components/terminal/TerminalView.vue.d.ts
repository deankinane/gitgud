import Vue from "vue";
import { Terminal } from "xterm";
import { Dimension } from "@/components/terminal/terminal-helpers";
export default class TerminalView extends Vue {
  uid?: string;
  terminal?: Terminal;
  charMeasureElement?: HTMLElement;
  created(): void;
  mounted(): void;
  emit(channel: string, data: any): void;
  onShellData(data: string): void;
  onShellKill(data: string): void;
  onShellEvent: (
    event: any,
    {
      channel,
      data
    }: {
      channel: string;
      data: any;
    }
  ) => void;
  beforeDestroy(): void;
  resize(dimension: Dimension): void;
}
