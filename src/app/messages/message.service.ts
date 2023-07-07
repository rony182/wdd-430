import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangeEvent = new Subject<Message[]>();

  messages: Message[] = [];
  maxMessageId: string;

  constructor(private http: HttpClient) {
    
  }

  getMessages(): Observable<Message[]> {
    return this.http
      .get<{ messages: Message[] }>('http://localhost:3000/messages')
      .pipe(
        map((response) => {
          this.messages = response.messages; // Update the messages array
          return this.messages;
        })
      );
  }
  

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id) || null;
  }

  getMaxId(): string {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId.toString();
  }

  addMessage(message: Message) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http
      .post<Message>('http://localhost:3000/messages', message, { headers: headers })
      .subscribe((response) => {
        const newMessage = Object.assign({}, message, response); // Merge response with original message object
        this.messages.push(newMessage); // Add the new message to the local array
        this.messageChangeEvent.next(this.messages.slice()); // Emit the updated array
      });
  }
  
  

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post('http://localhost:3000/messages', messages, { headers: headers })
      .subscribe(() => {
        this.messageChangeEvent.next(this.messages.slice());
      });
  }
}
