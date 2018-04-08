import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

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
export class ChatContainerComponent {
  constructor(public socketService: SocketService) {}
}
