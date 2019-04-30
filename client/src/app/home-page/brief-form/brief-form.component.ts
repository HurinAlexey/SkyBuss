import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Mail} from '../../shared/interfaces';
import {MailService} from '../../shared/services/mail.service';
import {MaterialService} from '../../shared/services/material.service';

declare let gtag;

@Component({
  selector: 'app-brief-form',
  templateUrl: './brief-form.component.html',
  styleUrls: ['./brief-form.component.less']
})
export class BriefFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private mailService: MailService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      userSite: new FormControl(null),
      competitors: new FormControl(null),
      consumer: new FormControl(null),
      message: new FormControl(null),
    });
  }

  onSubmit(data) {
    let mail: Mail = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: `Адрес сайта: ${data.userSite}
Конкуренты: ${data.competitors}
Информация о потребителе: ${data.consumer}

${data.message}`
    };

    this.form.disable();
    mail.subject = '"Бриф"';

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
      'event_label': 'brifseo'
    });
  }
}
