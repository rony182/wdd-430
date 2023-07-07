import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[] = [];
  originalContact: Contact;
  contact: Contact = null;
  editMode: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'];

      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(id);

      if (this.originalContact === undefined || this.originalContact === null) {
        return;
      }
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      this.editMode = true;
      if (this.originalContact.group != null) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.group)
        );
      }
    });
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newContact = new Contact(
      this.contactService.getMaxId(),
      values.name,
      values.email,
      values.phone,
      values.imageUrl,
      this.groupContacts
    );

    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    let invalidGroupContact =
      this.groupContacts.indexOf(selectedContact) !== -1;

    if (invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(idx, 1);
  }
}
