import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  currentSender: Contact;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
    ) {}

  ngOnInit() {
    this.messageService.messageChangeEvent.subscribe((messages: Message[]) => {
      const lastMessage = messages[messages.length - 1];
      this.currentSender = lastMessage.sender;
    });
    this.contactService.getContactforMessage('101').subscribe(response => {
      this.currentSender = response.contact;
    }
      )
  }
  onSendMessage() {
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;
    const id = this.messageService.getMaxId();  
    const newMessage = new Message(
      '',
      subjectValue,
      msgTextValue,
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    //assign blank values to the subject and msgText
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
