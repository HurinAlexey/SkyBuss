import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MailService} from '../shared/services/mail.service';
import {Mail} from '../shared/interfaces';
import {MaterialService} from '../shared/services/material.service';

declare let gtag;

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.less']
})
export class ContactsPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private mailService: MailService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null),
      message: new FormControl(null)
    });
  }

  onSubmit(mail: Mail) {
    this.form.disable();
    mail.subject = '"Контактная форма"';

    this.mailService.send(mail).subscribe(message => {
      this.form.reset();
      MaterialService.toast(message.message);
      this.form.patchValue({name: null, email: null, phone: null, message: null});
      this.form.enable();
    }, error => {
      MaterialService.toast(error.error.message);
      this.form.enable();
    })
  }

  onClick() {
    gtag('event', 'click', {
      'event_category': 'button',
      'event_label': 'contacts'
    });
  }

}
