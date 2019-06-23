import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ChatMessage } from '../../models/message';
import { User } from '../../models/user';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.scss', '../chat/chat.component.scss']
})
export class PrivateMessageComponent implements OnInit {
  @ViewChild('messagesContainer', { static: true })
  messageContainer: ElementRef;

  messages: ChatMessage[] = [];
  messageContent = '';
  otherUser: User;

  constructor(
    dialogRef: MatDialogRef<PrivateMessageComponent>,
    private socketService: SocketService,
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: ChatMessage | User
  ) {
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.chatService.privateChat = undefined;
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
      this.scrollToBottom();
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
      from: this.chatService.currentUser,
      content: this.messageContent
    });

    this.messages.push({
      content: this.messageContent,
      from: this.chatService.currentUser
    });
    this.messageContent = '';
    this.scrollToBottom();
  }

  /**
   *
   *
   * @memberof PrivateMessageComponent
   */
  onPrivateMessage(value: ChatMessage) {
    this.messages.push(value);
    this.scrollToBottom();
  }

  /**
   *
   *
   * @memberof PrivateMessageComponent
   */
  scrollToBottom() {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }, 200);
  }
}
