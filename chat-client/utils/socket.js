import { io } from 'socket.io-client'; 

export const socket = io('http://10.0.0.77:3000', {
    autoConnect: false
}); 