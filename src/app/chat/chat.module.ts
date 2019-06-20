import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatComponent } from './components/chat/chat.component';
import { PrivateMessageComponent } from './components/private-message/private-message.component';
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
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  exports: [ChatContainerComponent],
  entryComponents: [UserDialogComponent],
  declarations: [
    ChatComponent,
    UserDialogComponent,
    ChatContainerComponent,
    PrivateMessageComponent
  ]
})
export class ChatModule {}
