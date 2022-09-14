import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private contactService: ContactService
    ) { }
    
  contactFormGroup: any;
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactFormGroup = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(9)]],
    })
  }

  save(){
    this.contactService.addContact(this.contactFormGroup.value)
    this.activeModal.dismiss()
  }

  get contactForm() { return this.contactFormGroup.controls; }
}
