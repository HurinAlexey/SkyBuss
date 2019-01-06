import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Mail} from '../interfaces';

@Injectable()

export class MailService {

  constructor(
    private http: HttpClient
  ) {}

  send(mail: Mail): Observable<any> {
    return this.http.post('/api/mail', mail);
  }
}
