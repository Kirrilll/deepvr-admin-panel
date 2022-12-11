import { createListenerMiddleware } from "@reduxjs/toolkit";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const socketMiddleware = createListenerMiddleware();

const socket  = useWebSocket('ws://pusher.creatrix-digital.ru:5000/connect/test');

// socketMiddleware.startListening({
//     actionCreator: '',
//     effect: (action, listnerApi) => {
//         socket.getWebSocket()?.onmessage(e => console.log('adad'));
//     }
// });