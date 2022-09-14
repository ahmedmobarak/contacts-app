import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactForm } from '../models/contact-form';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }
  list = new BehaviorSubject<Array<ContactForm>>([]);

  addContact(data: ContactForm) {
     let newList = this.list.value
     newList.push(data)
     this.list.next(newList)
  }

  getList(): ContactForm[]{
    return this.list.value;
  }
}
