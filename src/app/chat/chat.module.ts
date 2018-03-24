import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat.component';
import { SocketService } from './services/socket.service';
import { MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    ChatComponent
  ],
  providers: [SocketService],
  declarations: [ChatComponent]
})
export class ChatModule { }
