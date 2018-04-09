import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { of } from 'rxjs/observable/of';
import * as socketIo from 'socket.io-client';

import { SocketEvent } from '../models/event';
import { ChatMessage } from '../models/message';
import { User } from '../models/user';
import { Action } from '../models/action';
import { environment } from '../../../environments/environment';

@Injectable()
export class SocketService {
    private socket;
    users: User[] = [];

    public initSocketIo(): void {
        this.socket = socketIo(environment.serverUrl);
    }

    public send(message: ChatMessage): void {
        this.socket.emit('message', message);
    }

    public rename(data: any): void {
        this.socket.emit('rename', data);
    }

    public join(data: {action: Action, from: User}): void {
        this.socket.emit('join', data);
    }

    public onMessage(): Observable<ChatMessage> {
        return new Observable<ChatMessage>(observer => {
            this.socket.on('message', (data: ChatMessage) => observer.next(data));
        });
    }

    public onUsersChanged(): Observable<User[]> {
        return new Observable<User[]>(observer => {
            this.socket.on('users', (data: User[]) => observer.next(data));
        });
    }

    public onJoined(): Observable<string> {
        return new Observable<string>(observer => {
            this.socket.on('join', (data: string) => observer.next(data));
        });
    }

    public onId(): Observable<number> {
        return new Observable<number>(observer => {
            this.socket.on('id', (data: number) => observer.next(data));
        });
    }

    public onEvent(event: SocketEvent): Observable<any> {
        return new Observable<SocketEvent>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public onError(): Observable<any> {
          return new Observable<SocketEvent>(observer => {
            this.socket.on('error', (error) => {
                console.log(error);
                observer.next(error);
            });
        });
    }
}
