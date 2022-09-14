import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactForm } from 'src/app/shared/models/contact-form';
import { ContactService } from 'src/app/shared/services/contact.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  modalRef: any;
  
  constructor(
    private modalService: NgbModal,
    private contactService: ContactService
    ) { }

      sort = {
        firstName: {
          orderByAsc: true
        },
        lastName: {
          orderByAsc: true
        }
      }
  
  filter: boolean = false;
  term!: string;
  contacts!: ContactForm[];
  
  ngOnInit(): void {
    this.contacts = this.contactService.getList();
  }
  
  onSort(type: "firstName" | "lastName") {

    if(this.sort[type].orderByAsc){
      this.orderByAsc(type)
    }else {
      this.orderByDesc(type)
    }

    // After sorting is done, toggle the sort type
    this.sort[type].orderByAsc = !this.sort[type].orderByAsc
  }

  orderByAsc(type: 'firstName' | 'lastName'){    
    this.contacts.sort((a, b) => {
    return a[type].toLowerCase().localeCompare(b[type].toLowerCase());
    })
  }
  orderByDesc(type: 'firstName' | 'lastName'){
    this.contacts.sort((a, b) => {
      return b[type].toLowerCase().localeCompare(a[type].toLowerCase());
      })
  }

  getContacts(): ContactForm[]{
    if(this.filter){
      let filteredContacts = this.contacts.filter((contact: any) => contact.lastName.toLowerCase().includes(this.term.toLowerCase()));
      return filteredContacts 
    }
    return this.contacts;
  }

  filterList(){
    this.filter = true;
  }

  clearFilter(){
    this.filter = false;
  }

  openModal(){
    this.modalService.open(ContactFormComponent, { size: 'lg' });
  }

}
