import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat.component';
import { SocketService } from './services/socket.service';
import { MatCardModule, MatIconModule, MatInputModule, MatDialogModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    ChatComponent
  ],
  entryComponents: [UserDialogComponent],
  providers: [SocketService],
  declarations: [ChatComponent, UserDialogComponent]
})
export class ChatModule { }
