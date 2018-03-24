import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat.component';
import { SocketService } from './services/socket.service';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ChatComponent
  ],
  providers: [SocketService],
  declarations: [ChatComponent]
})
export class ChatModule { }
