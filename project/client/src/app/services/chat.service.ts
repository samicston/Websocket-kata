import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";
import { Subject } from "rxjs/Rx";

@Injectable()

export class ChatService{
    publicMessages: Subject<any>;
    privateMessages: Subject<any>;
    typing: Subject<any>;

    constructor(private wsService: WebsocketService){
        this.publicMessages = <Subject<any>>this.wsService.getPublicChat()
                                                .map((res: any): any => {
                                                   return res;
                                                })
        
        this.privateMessages = <Subject<any>>this.wsService.getPrivateChat()
                                                 .map((res: any): any => {
                                                    return res;
                                                  })

        this.typing = <Subject<any>>this.wsService.showTyping()
                                        .map((res: any): any => {
                                            return res;
                                        })
    }

    sendPublicMessage(message){
        this.publicMessages.next(message);
    }

    sendPrivateMessage(message){
        this.privateMessages.next(message);
    }

    showTyping(message){
        this.typing.next(message)
    }
}