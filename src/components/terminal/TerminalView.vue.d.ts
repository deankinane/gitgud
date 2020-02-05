import Vue from "vue";
import { Terminal } from "xterm";
export default class TerminalView extends Vue {
    uid?: string;
    terminal?: Terminal;
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
