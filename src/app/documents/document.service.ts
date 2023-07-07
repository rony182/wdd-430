import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  maxDocumentId: string;
  documentListChangedEvent = new Subject<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  documents: Document[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<{ documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (response) => {
          this.documents = response.documents;
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id) || null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }

  getMaxId(): string {
    let maxId = 0;
    if (Array.isArray(this.documents)) {
      for (let document of this.documents) {
        let currentId = parseInt(document.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    }
    return maxId.toString();
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        newDocument,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }

  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/documents', documents, { headers: headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  sortAndSend() {
    if (Array.isArray(this.documents)) {
      this.documents.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      this.documentListChangedEvent.next(this.documents.slice());
    }
  }
}
