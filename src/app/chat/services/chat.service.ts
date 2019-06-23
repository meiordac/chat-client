import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PrivateMessageComponent } from '../components/private-message/private-message.component';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User;
  privateChat: MatDialogRef<PrivateMessageComponent>;

  /**
   *Creates an instance of ChatService.
   * @param {HttpClient} http
   * @memberof ChatService
   */
  constructor(private http: HttpClient) {}

  /**
   *
   *
   * @param {string} q
   * @returns {Observable<{
   *     data: any[];
   *     meta: { status: number; msg: string; response_id: string };
   *     pagination: { total_count: number; count: number; offset: number };
   *   }>}
   * @memberof ChatService
   */
  getGif(
    q: string
  ): Observable<{
    data: any[];
    meta: { status: number; msg: string; response_id: string };
    pagination: { total_count: number; count: number; offset: number };
  }> {
    return this.http.get<{
      data: any[];
      meta: { status: number; msg: string; response_id: string };
      pagination: { total_count: number; count: number; offset: number };
    }>(
      `http://api.giphy.com/v1/gifs/search?q=${q
        .toLowerCase()
        .replace(' ', '+')}&api_key=${environment.giphyKey}&limit=1`
    );
  }
}
