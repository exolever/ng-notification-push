import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private readonly http = inject(HttpClient);

  addPushSubscriber(sub: PushSubscription): Observable<unknown> {
    return this.http.post('http://localhost:9000/api/notifications', sub);
  }

  send(): Observable<unknown> {
    return this.http.post('http://localhost:9000/api/newsletter', null);
  }
}
