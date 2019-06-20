import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { Action } from '../models/action';
import { SocketEvent } from '../models/event';
import { ChatMessage } from '../models/message';
import { User } from '../models/user';

/**
 *
 *
 * @export
 * @class SocketService
 */
@Injectable({ providedIn: 'root' })
export class SocketService {
  users: User[] = [];

  private socket: socketIo.Socket;

  /**
   *
   *
   * @memberof SocketService
   */
  initSocketIo(): void {
    this.socket = socketIo(environment.serverUrl);
  }

  /**
   *
   *
   * @param {ChatMessage} message
   * @memberof SocketService
   */
  send(message: ChatMessage): void {
    this.socket.emit('message', message);
  }

  /**
   *
   *
   * @param {ChatMessage} message
   * @memberof SocketService
   */
  sendPM(id: number, message: ChatMessage): void {
    this.socket.emit('privateMessage', id, message);
  }

  /**
   *
   *
   * @param {*} data
   * @memberof SocketService
   */
  rename(data: any): void {
    this.socket.emit('rename', data);
  }

  /**
   *
   *
   * @param {{ action: Action; from: User }} data
   * @memberof SocketService
   */
  join(data: { action: Action; from: User }): void {
    this.socket.emit('join', data);
  }

  /**
   *
   *
   * @returns {Observable<ChatMessage>}
   * @memberof SocketService
   */
  onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('message', (data: ChatMessage) => observer.next(data));
    });
  }

  /**
   *
   *
   * @returns {Observable<ChatMessage>}
   * @memberof SocketService
   */
  onPrivateMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('privateMessage', (data: ChatMessage) =>
        observer.next(data)
      );
    });
  }

  /**
   *
   *
   * @returns {Observable<User[]>}
   * @memberof SocketService
   */
  onUsersChanged(): Observable<User[]> {
    return new Observable<User[]>(observer => {
      this.socket.on('users', (data: User[]) => observer.next(data));
    });
  }

  /**
   *
   *
   * @returns {Observable<string>}
   * @memberof SocketService
   */
  onJoined(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('join', (data: string) => observer.next(data));
    });
  }

  /**
   *
   *
   * @returns {Observable<User>}
   * @memberof SocketService
   */
  onNewUser(): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on('user', (data: User) => observer.next(data));
    });
  }

  /**
   *
   *
   * @returns {Observable<ChatMessage[]>}
   * @memberof SocketService
   */
  onMessages(): Observable<ChatMessage[]> {
    return new Observable<ChatMessage[]>(observer => {
      this.socket.on('messages', (data: ChatMessage[]) => observer.next(data));
    });
  }

  /**
   *
   *
   * @param {SocketEvent} event
   * @returns {Observable<any>}
   * @memberof SocketService
   */
  onEvent(event: SocketEvent): Observable<any> {
    return new Observable<SocketEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  /**
   *
   *
   * @returns {Observable<any>}
   * @memberof SocketService
   */
  onError(): Observable<any> {
    return new Observable<SocketEvent>(observer => {
      this.socket.on('error', error => {
        console.log(error);
        observer.next(error);
      });
    });
  }
}
