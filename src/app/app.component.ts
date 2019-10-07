import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from './services/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

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
        this.newsletterService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err =>  console.log('Could not send subscription object to server, reason: ', err)
        );
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  sendNewsletter() {
    this.newsletterService.send().subscribe();
  }
}
