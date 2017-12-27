import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {
    // Our socket connection
    private socket;

    constructor() { 
    }

    connect() {
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        this.socket = io('http://localhost:3030');

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        this.socket.on('connect', () => {
            this.socket.emit('startStream');
            console.log('opened socket')
        })

        this.socket.on('message', (data) => {
            console.log(data);
        })

        this.socket.on('error', error => {
            console.error(error)
        })
        this.socket.on('disconnect', () => {
            console.log('closed socket');
        })
    }
}