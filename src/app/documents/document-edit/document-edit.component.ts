import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document = null;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
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

      this.originalDocument = this.documentService.getDocument(id);

      if (
        this.originalDocument === undefined ||
        this.originalDocument === null
      ) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newDocument = new Document(
      '',
      values.name,
      values.description,
      values.url,
      null
    );

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }
}
