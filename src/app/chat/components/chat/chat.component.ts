import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Action } from '../../models/action';
import { SocketEvent } from '../../models/event';
import { ChatMessage } from '../../models/message';
import { User } from '../../models/user';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';
import { PrivateMessageComponent } from '../private-message/private-message.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

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
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesContainer', { static: true })
  messageContainer: ElementRef;

  user: User;
  messages: ChatMessage[] = [];
  messageContent: string;
  mobileQuery: MediaQueryList;

  /**
   * Creates an instance of ChatComponent.
   * @param {SocketService} socketService
   * @param {MatDialog} dialog
   * @param {MatSnackBar} snackBar
   * @memberof ChatComponent
   */
  constructor(
    public socketService: SocketService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private userService: UserService,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  /**
   * On init initializes io
   *
   * @memberof ChatComponent
   */
  ngOnInit(): void {
    this.initSocketIo();
    this.sendNotification(Action.JOINED);
  }

  /**
   * Initiates Socket Io connection and subscribes to new message and connect/disconnected events
   *
   * @private
   * @memberof ChatComponent
   */
  private initSocketIo(): void {
    this.socketService.initSocketIo();
    this.onMessage();
    this.onMessages();
    this.onPrivateMessage();
    this.onJoin();
    this.onNewUser();
    this.onUsersChanged();
    this.onEvent();
  }

  /**
   * Handles new events like connect or disconnect
   *
   * @private
   * @memberof ChatComponent
   */
  private onEvent() {
    this.socketService.onEvent(SocketEvent.CONNECT).subscribe(() => {
      console.log('You joined the chatroom');
    });
    this.socketService.onEvent(SocketEvent.DISCONNECT).subscribe(() => {
      console.log('You have been disconnected');
    });
  }

  /**
   * Reacts to new id when new user joins
   *
   * @private
   * @memberof ChatComponent
   */
  private onNewUser() {
    this.socketService.onNewUser().subscribe(data => {
      this.user = data;
      this.userService.currentUser = data;
      setTimeout(() => this.openDialog());
    });
  }

  /**
   * Reatcs to list of users changed, when someone joins or leaves the chat
   *
   * @private
   * @memberof ChatComponent
   */
  private onUsersChanged() {
    this.socketService.onUsersChanged().subscribe(data => {
      this.socketService.users = data ? data : [];
    });
  }

  /**
   * Reacts to a new user joining the chat with an snackBar
   *
   * @private
   * @memberof ChatComponent
   */
  private onJoin() {
    this.socketService.onJoined().subscribe(data => {
      console.log(data);
      this.openSnackBar(data);
    });
  }

  /**
   * Reacts to a new message, pushing it to an array
   *
   * @private
   * @memberof ChatComponent
   */
  private onMessage() {
    this.socketService.onMessage().subscribe((message: ChatMessage) => {
      if (message.from.name !== this.user.name) {
        this.openSnackBar('New message');
      }
      this.messages.push(message);
      this.scrollToBottom();
    });
  }

  /**
   *
   *
   * @private
   * @memberof ChatComponent
   */
  private onMessages() {
    this.socketService.onMessages().subscribe((messages: ChatMessage[]) => {
      this.messages.push(...messages);
    });
  }

  /**
   * Sends a message
   *
   * @param {string} message
   * @returns {void}
   * @memberof ChatComponent
   */
  sendMessage(): void {
    if (!this.messageContent || this.messageContent.length === 0) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: this.messageContent
    });
    this.messageContent = '';
  }

  /**
   * Sends notification using socket service
   *
   * @param {Action} action
   * @memberof ChatComponent
   */
  sendNotification(action: Action): void {
    if (action === Action.JOINED) {
      const data = {
        from: this.user,
        action: action
      };
      this.socketService.join(data);
    } else if (action === Action.RENAME) {
      const data = {
        action: action,
        user: this.user
      };
      this.socketService.rename(data);
    }
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
      this.user.name = result;
      this.sendNotification(Action.RENAME);
    });
  }

  /**
   * Opens a snackbar
   *
   * @memberof ChatComponent
   */
  openSnackBar(text: string) {
    this.snackBar
      .open(text, 'okay', {
        duration: 3000
      })
      .onAction()
      .subscribe(() => this.snackBar.dismiss());
  }

  /**
   * Scrolls to bottom of message container
   *
   * @memberof ChatComponent
   */
  scrollToBottom() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  /**
   *
   *
   * @memberof ChatComponent
   */
  onPrivateMessage() {
    this.socketService.onPrivateMessage().subscribe(message => {
      if (!this.userService.privateChat) {
        this.userService.privateChat = this.dialog.open(
          PrivateMessageComponent,
          {
            width: '500px',
            data: message
          }
        );
      }
    });
  }
}
