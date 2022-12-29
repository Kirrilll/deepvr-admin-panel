import { AnyAction, createListenerMiddleware, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { AppDispatch } from "../../app/store";



class _WebSocketService {
    private static socketInstancePool: Map<string, WebSocket | null> = new Map();

    static initChannelInstance(channel: string){
        const socket =  new WebSocket(`ws://pusher.creatrix-digital.ru:5000/connect/${channel}`);
        _WebSocketService.socketInstancePool.set(
            channel,
            socket
        );
        return socket;
    }

    static getChannelInstance(channel: string) {
        if (!_WebSocketService.socketInstancePool.has(channel)) {
           _WebSocketService.initChannelInstance(channel);
        }
        return _WebSocketService.socketInstancePool.get(channel)!;
    }

    static closeChannelInstance(channel: string){
        _WebSocketService.getChannelInstance(channel).close();
    }

    static closeAllChannels() {
        _WebSocketService.socketInstancePool.forEach(socket => socket?.close());
        _WebSocketService.socketInstancePool.clear();
    }

}


export const socketMiddleware: Middleware = (storeApi: MiddlewareAPI<AppDispatch>) => (next: AppDispatch) => (action: AnyAction) => {

    const ws = _WebSocketService.getChannelInstance('abc');

    //const ws = new WebSocket("ws://pusher.creatrix-digital.ru:5000/connect/abc");

    ws.onopen = (e) => console.log(e);
    ws.onmessage = (e) => console.log(e);


    return next(action);
}

// socketMiddleware.startListening({
//     actionCreator: '',
//     effect: (action, listnerApi) => {
//         socket.getWebSocket()?.onmessage(e => console.log('adad'));
//     }
// });