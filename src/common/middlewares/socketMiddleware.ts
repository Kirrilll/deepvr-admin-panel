import { AnyAction, createListenerMiddleware, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { AppDispatch } from "../../app/store";
import SocketService from "../services/SocketService";



export const socketMiddleware: Middleware = (storeApi: MiddlewareAPI<AppDispatch>) => (next: AppDispatch) => (action: AnyAction) => {

    const ws = SocketService.getChannelInstance('abc');

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