import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Action } from '../models/action';
import { SocketEvent } from '../models/event';
import { ChatMessage } from '../models/message';
import { User } from '../models/user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

/**
 * Main chat component
 *
 * @export
 * @class ChatComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  action = Action;
  user: User = { name: 'Anonymous' };
  messages: ChatMessage[] = [];
  messageContent: string;
  ioConnection: any;

  /**
   * Creates an instance of ChatComponent.
   * @param {SocketService} socketService
   * @param {MatDialog} dialog
   * @param {MatSnackBar} snackBar
   * @memberof ChatComponent
   */
  constructor(
    private socketService: SocketService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initIoConnection();
  }

  /**
   * Initiates Socket Io connection and subscribes to new message and connect/disconnected events
   *
   * @private
   * @memberof ChatComponent
   */
  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: ChatMessage) => {
        if (message.from.name !== this.user.name) {
          this.openSnackBar();
        }
        this.messages.push(message);
      });

    this.socketService.onEvent(SocketEvent.CONNECT).subscribe(() => {
      console.log('connected');
    });

    this.socketService.onEvent(SocketEvent.DISCONNECT).subscribe(() => {
      console.log('disconnected');
    });
  }

  /**
   * Sends a message
   *
   * @param {string} message
   * @returns {void}
   * @memberof ChatComponent
   */
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

  /**
   * Sends notification using socket service
   *
   * @param {*} params
   * @param {Action} action
   * @memberof ChatComponent
   */
  public sendNotification(params: any, action: Action): void {
    let message: any;

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

  /**
   * Opens a user dialog
   *
   * @memberof ChatComponent
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: { name: this.user.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = { name: result };
    });
  }

  /**
   * Opens a snackbar for a new message
   *
   * @memberof ChatComponent
   */
  openSnackBar() {
    this.snackBar.open('New message', 'okay', {
      duration: 3000
    })
      .onAction()
      .subscribe(() => this.snackBar.dismiss());
  }
}
