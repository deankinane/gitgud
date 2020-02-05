import Vue from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
export default class TerminalView extends Vue {
    uid?: string;
    terminal?: Terminal;
    fitAddon?: FitAddon;
    created(): void;
    mounted(): void;
    emit(channel: string, data: string): void;
    onShellData(data: string): void;
    onShellKill(data: string): void;
    onShellEvent: (event: any, { channel, data }: {
        channel: string;
        data: any;
    }) => void;
    beforeDestroy(): void;
}
