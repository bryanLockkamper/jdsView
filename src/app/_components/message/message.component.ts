import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/_models/message.model';
import * as SockJS from 'sockjs-client';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { Utilisateur } from 'src/app/_models/utilisateur.model';
import * as decode from 'jwt-decode';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: Message[];
  disabled = true;
  newmessage: Message;
  user : Utilisateur;

  private stompClient;
  idUtilisateur = decode(localStorage.getItem('token')).userInfo.id;

  constructor(    
    private userService : UtilisateurService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.messages = [];
    
    this.userService.getMonProfil(this.idUtilisateur).subscribe(data =>{
      this.user = data;
    });
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    
    let ws = new SockJS(environment.apiDomain + 'socket');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {

          this.newmessage = JSON.parse(message.body);
          that.showMessage(this.newmessage);          

        }
      });
    });
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.messages = [];
    }
  }

  showMessage(message: Message) {
    this.newmessage = {
      sender: message.sender,
      content: message.content,
      date: message.date,
      reply: message.reply,
      type: message.type,
      // type: files.length ? 'file' : 'CHAT',
      // files: files,
      user: message.user
    };
    this.messages.push(this.newmessage);
    this.changeDetectorRef.detectChanges();
  }

  sendMessage(event : any) {
      
    // const files = !event.files ? null : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'file-text-outline',
    //   };
    // });

    this.newmessage = {
      sender: this.user.pseudo,
      content: event.message,
      date: new Date(),
      reply: true,
      type: 'CHAT',
      // type: files.length ? 'file' : 'CHAT',
      // files: files,
      user: this.user
    };

    this.stompClient.send(
      '/app/send/message',
      {},
      JSON.stringify(this.newmessage)
    );

    this.newmessage = null;
  }
}
