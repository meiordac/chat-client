import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PrivateMessageComponent } from '../components/private-message/private-message.component';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  privateChat: MatDialogRef<PrivateMessageComponent>;

  constructor() {}
}
