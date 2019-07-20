import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChatModule,
    AngularFireModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
