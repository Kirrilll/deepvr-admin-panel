export default class SocketService {
    private static socketInstancePool: Map<string, WebSocket | null> = new Map();

    static initChannelInstance(channel: string) {
        const socket = new WebSocket(`ws://pusher.creatrix-digital.ru:5000/connect/${channel}`);
        SocketService.socketInstancePool.set(
            channel,
            socket
        );
        return socket;
    }

    static getChannelInstance(channel: string) {
        if (!SocketService.socketInstancePool.has(channel)) {
            SocketService.initChannelInstance(channel);
        }
        return SocketService.socketInstancePool.get(channel)!;
    }

    static closeChannelInstance(channel: string) {
        SocketService.getChannelInstance(channel).close();
    }

    static closeAllChannels() {
        SocketService.socketInstancePool.forEach(socket => socket?.close());
        SocketService.socketInstancePool.clear();
    }
}