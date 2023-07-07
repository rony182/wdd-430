import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageResolver implements Resolve<Message[]> {
  constructor(private messageService: MessageService) {}

  resolve(): Observable<Message[]> {
    return this.messageService.getMessages();
  }
}
