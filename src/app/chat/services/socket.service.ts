import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';
import { SocketEvent } from '../models/event';

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

    public onEvent(event: SocketEvent): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
