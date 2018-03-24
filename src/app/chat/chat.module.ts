import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat.component';
import { SocketService } from './services/socket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ChatComponent
  ],
  providers: [SocketService],
  declarations: [ChatComponent]
})
export class ChatModule { }
