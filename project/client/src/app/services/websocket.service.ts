import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';
import { environment } from "../../environments/environment";

@Injectable()
export class WebsocketService{
    private socket;

    constructor(){
        this.socket = io(environment.ws_url);
    }

    socketConnection(socketName): Rx.Subject<MessageEvent>{
        let observable = new Observable(observer => {
            this.socket.on(socketName, (data) => {
                console.log('Received a message from websocket');
                observer.next(data)
            })
        })

        let observer = {
            next:(data: Object) => {
                this.socket.emit(socketName, JSON.stringify(data));
            }
        };

        return Rx.Subject.create(observer, observable);
    }

    getPublicChat():Rx.Subject<MessageEvent>{
        return this.socketConnection('chat')
    }

    getPrivateChat(): Rx.Subject<MessageEvent>{
        return this.socketConnection('private')
    }

    showTyping(): Rx.Subject<MessageEvent>{
        return this.socketConnection('typing');
    }
}