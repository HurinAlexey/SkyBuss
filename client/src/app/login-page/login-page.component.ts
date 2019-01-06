import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/internal/Subscription';

import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterialService} from '../shared/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onSubmit() {
    this.form.disable();
    let user;
    if (this.form.value.login.indexOf('@') == -1) {
      user = {
        login: this.form.value.login,
        password: this.form.value.password
      }
    } else {
      user = {
        email: this.form.value.login,
        password: this.form.value.password
      }
    }
    this.aSub = this.auth.login(user).subscribe(
      () => {
        this.router.navigate(['/categories'])
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()) {
      this.router.navigate(['/categories'])
    }

    this.form = new FormGroup({
      login: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if(params['accessDenied']) {
        MaterialService.toast('Авторизуйтесь что-бы войти в систему');
      } else if(params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заного');
      }
    });
  }

  ngOnDestroy() {
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
