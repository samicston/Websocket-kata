import { Component, OnInit } from '@angular/core';
import { ChatService } from "./services/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public message;
  public chat;
  public handle;
  public privateMessage;

  constructor(private chatService: ChatService){}

  getTypedMessage(){
    console.log('kkgkgh', this.message)
    this.chatService.sendPublicMessage({message: this.message, sender: this.handle});
  }

  isTyping(){
    this.chatService.showTyping(this.handle);
  }

  getPrivateMessage(){
    this.chatService.sendPrivateMessage(this.privateMessage)
  }

  ngOnInit(){
    let chat = document.getElementById('output');
    let isTyping = document.getElementById('feedback');
    let privateField = document.getElementById('private');
    this.chatService.publicMessages.subscribe(msg => {
      let message = JSON.parse(msg)
      chat.innerHTML += '<p><strong>' + message.sender + ':</strong> ' + message.message + '</p>';
      isTyping.innerHTML = '';
    })

    this.chatService.typing.subscribe(typing => {
      isTyping.innerHTML = '<p><em>' + typing + ' is typing a message...</em></p>'
    })

    this.chatService.privateMessages.subscribe( privatemsg => {
      privateField.innerHTML += '<p>'+privatemsg+'</p>'
    })
  }
}
