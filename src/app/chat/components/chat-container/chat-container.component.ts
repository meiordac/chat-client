import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { User } from '../../models/user';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';
import { PrivateMessageComponent } from '../private-message/private-message.component';

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
    private userService: UserService,
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
  ngOnInit() {}

  /**
   *
   *
   * @memberof ChatContainerComponent
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   *
   *
   * @param {User} user
   * @memberof ChatContainerComponent
   */
  onClick(user: User) {
    this.sideNav.close();
    if (!this.userService.privateChat) {
      this.userService.privateChat = this.dialog.open(PrivateMessageComponent, {
        width: '500px',
        data: user
      });
    }
  }
}
