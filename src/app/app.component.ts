import {Component} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {NewsletterService} from './services/newsletter.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;
  sub: PushSubscription;

  readonly VAPID_PUBLIC_KEY = 'BMloIXro0C20iV6Nlo90bBPKFv0RF9xuy-QOgOPLHZbUO8FRTLseMljQMxlZCjnZvTpbq-dEYbL3aqsJge5JbH0';

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) { }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.sub = sub;
        console.log('Notification Subscription: ', sub);
        this.newsletterService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err =>  console.log('Could not send subscription object to server, reason: ', err)
        );
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  sendNewsletter() {
    console.log('Sending Newsletter to all Subscribers ...');
    this.newsletterService.send().subscribe();
  }


}
