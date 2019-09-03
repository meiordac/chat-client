import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import '@firebase/messaging';

import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 *
 *
 * @export
 * @class MessagingService
 */
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  /**
   *Creates an instance of MessagingService.
   * @param {AngularFireDatabase} db
   * @param {AngularFireAuth} afAuth
   * @memberof MessagingService
   */
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  /**
   *
   *
   * @memberof MessagingService
   */
  getPermission() {
    Notification.requestPermission()
      .then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          return this.messaging.getToken();
        } else {
          console.log('Unable to get permission to notify.');
        }
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      });
  }

  /**
   *
   *
   * @memberof MessagingService
   */
  receiveMessage() {
    this.messaging.onMessage(payload => {
      console.log('Message received.', payload);
      this.currentMessage.next(payload);
    });
  }

  /**
   *
   *
   * @private
   * @param {string} token
   * @memberof MessagingService
   */
  private updateToken(token: string) {
    this.afAuth.authState.pipe(first()).subscribe(user => {
      if (!user) {
        return;
      }

      const data = { [user.uid]: token };
      this.db.object('fcmTokens/').update(data);
    });
  }
}
