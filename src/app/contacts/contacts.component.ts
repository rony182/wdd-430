import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService],
})
export class ContactsComponent implements OnInit {
  onContactSelected: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.onContactSelected = contact;
    });
  }
}
