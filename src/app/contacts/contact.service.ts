import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  maxContactId: string;
  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<{ contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (response) => {
          this.contacts = response.contacts;
          this.maxContactId = this.getMaxId();
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getContactByGroup(id: string): Contact[] {
    const contacts: Contact[] = [];
    for (let contact of this.contacts) {
      if (contact.group) {
        for (let group of contact.group) {
          if (group.id === id) {
            contacts.push(contact);
          }
        }
      }
    }
    return contacts.slice();
  }

  getContactforMessage(id: string) {
    return this.http.get<{contact: Contact}>('http://localhost:3000/contacts/' + id);
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }
  getMaxId(): string {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId.toString();
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        newContact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/contacts', contacts, { headers: headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
  sortAndSend() {
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
