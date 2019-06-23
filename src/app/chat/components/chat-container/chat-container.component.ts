import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { Action } from '../../models/action';
import { User } from '../../models/user';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { ChatComponent } from '../chat/chat.component';
import { PrivateMessageComponent } from '../private-message/private-message.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

/**
 * Lists users in sidenav and displays app chat
 *
 * @export
 * @class UserListComponent
 */
@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  @ViewChild('snav', { static: true }) sideNav: MatSidenav;
  @ViewChild('chat', { static: false }) chat: ChatComponent;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  /**
   *Creates an instance of ChatContainerComponent.
   * @param {SocketService} socketService
   * @param {MatDialog} dialog
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {MediaMatcher} media
   * @memberof ChatContainerComponent
   */
  constructor(
    public socketService: SocketService,
    private dialog: MatDialog,
    private chatService: ChatService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  /**
   *
   *
   * @memberof ChatContainerComponent
   */
  ngOnInit() {
    this.initSocketIo();
    this.onNewUser();
  }

  /**
   *
   *
   * @memberof ChatContainerComponent
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * Initiates Socket Io connection and subscribes to new message and connect/disconnected events
   *
   * @private
   * @memberof ChatContainerComponent
   */

  private initSocketIo(): void {
    this.socketService.initSocketIo();
  }

  /**
   *
   *
   * @param {User} user
   * @memberof ChatContainerComponent
   */
  onClick(user: User) {
    if (user.id === this.chatService.currentUser.id) {
      return;
    }
    this.sideNav.close();
    if (!this.chatService.privateChat) {
      this.chatService.privateChat = this.dialog.open(PrivateMessageComponent, {
        width: '500px',
        data: user
      });
    }
  }

  /**
   * Reacts to new id when new user joins
   *
   * @private
   * @memberof ChatComponent
   */
  private onNewUser() {
    this.socketService.onNewUser().subscribe(data => {
      this.chat.user = data;
      this.chatService.currentUser = data;
      setTimeout(() => this.openDialog());
    });
  }

  /**
   * Opens a user dialog
   *
   * @memberof ChatComponent
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: { name: this.chat.user.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chat.user.name = result;
      this.chat.sendNotification(Action.RENAME);
    });
  }
}
