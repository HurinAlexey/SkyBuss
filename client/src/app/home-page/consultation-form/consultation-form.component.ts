import { Component, OnInit } from '@angular/core';
import {MailService} from '../../shared/services/mail.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../shared/services/material.service';
import {Mail} from '../../shared/interfaces';

declare let gtag;

@Component({
  selector: 'app-consultation-form',
  templateUrl: './consultation-form.component.html',
  styleUrls: ['./consultation-form.component.less']
})
export class ConsultationFormComponent implements OnInit {

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
    mail.subject = '"Получить консультацию"';

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
      'event_label': 'consult'
    });
  }
}
