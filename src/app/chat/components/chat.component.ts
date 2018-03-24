import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Action } from '../models/action';
import { SocketEvent } from '../models/event';
import { ChatMessage } from '../models/message';
import { User } from '../models/user';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  action = Action;
  user: User = {name: 'Anonymous'};
  messages: ChatMessage[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: ChatMessage) => {
        console.log(message);
        this.messages.push(message);
      });

    this.socketService.onEvent(SocketEvent.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(SocketEvent.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: ChatMessage;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      };
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: { name: this.user.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = {name: result};
    });
  }
}
