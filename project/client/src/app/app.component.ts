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
  public groupId;

  constructor(private chatService: ChatService){}

  getTypedMessage(){
    console.log('kkgkgh', this.message)
    this.chatService.sendPublicMessage({message: this.message, sender: this.handle, group: this.groupId});
  }

  isTyping(){
    this.chatService.showTyping({sender: this.handle, group: this.groupId});
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
      let userTyping = JSON.parse(typing)
      isTyping.innerHTML = '<p><em>' + userTyping.sender + ' is typing a message...</em></p>'
    })

    this.chatService.privateMessages.subscribe( privatemsg => {
      privateField.innerHTML += '<p>'+privatemsg+'</p>'
    })
  }
}
