import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Mail} from '../../shared/interfaces';
import {MailService} from '../../shared/services/mail.service';
import {MaterialService} from '../../shared/services/material.service';

declare let gtag;

@Component({
  selector: 'app-callback-form',
  templateUrl: './callback-form.component.html',
  styleUrls: ['./callback-form.component.less']
})
export class CallbackFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private mailService: MailService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(mail: Mail) {
    this.form.disable();
    mail.subject = '"Обратная связь"';

    this.mailService.send(mail).subscribe(message => {
      this.form.reset();
      MaterialService.toast(message.message);
      this.form.patchValue({name: null, email: null, phone: null});
      this.form.enable();
    }, error => {
      MaterialService.toast(error.error.message);
      this.form.enable();
    })
  }

  onClick() {
    gtag('event', 'click', {
      'event_category': 'button',
      'event_label': 'callback'
    });
  }
}
