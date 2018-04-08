import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { SocketService } from './services/socket.service';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  exports: [ChatContainerComponent],
  entryComponents: [UserDialogComponent],
  providers: [SocketService],
  declarations: [ChatComponent, UserDialogComponent, ChatContainerComponent]
})
export class ChatModule {}
