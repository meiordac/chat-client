import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ChatMessage } from '../../models/message';
import { User } from '../../models/user';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.scss', '../chat/chat.component.scss']
})
export class PrivateMessageComponent implements OnInit {
  messages: ChatMessage[] = [];
  messageContent = '';
  otherUser: User;

  constructor(
    dialogRef: MatDialogRef<PrivateMessageComponent>,
    private socketService: SocketService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: ChatMessage | User
  ) {
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.userService.privateChat = undefined;
    });
  }

  /**
   *
   *
   * @memberof PrivateMessageComponent
   */
  ngOnInit() {
    if (this.data.hasOwnProperty('from')) {
      this.otherUser = (<ChatMessage>this.data).from;
      this.messages.push(<ChatMessage>this.data);
    } else {
      this.otherUser = <User>this.data;
    }
  }

  /**
   *
   *
   * @returns {void}
   * @memberof PrivateMessageComponent
   */
  sendMessage(): void {
    if (!this.messageContent || this.messageContent.length === 0) {
      return;
    }

    this.socketService.sendPM(this.otherUser.id, {
      from: this.userService.currentUser,
      content: this.messageContent
    });

    this.messages.push({
      content: this.messageContent,
      from: this.userService.currentUser
    });
    this.messageContent = '';
  }

  /**
   *
   *
   * @memberof PrivateMessageComponent
   */
  onPrivateMessage() {
    this.socketService
      .onPrivateMessage()
      .subscribe(value => this.messages.push(value));
  }
}
