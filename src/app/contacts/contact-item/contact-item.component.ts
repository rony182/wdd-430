import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() selectedContactEvent = new EventEmitter<void>();

  constructor() {}
  ngOnInit() {}
}
