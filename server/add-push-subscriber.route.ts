import { USER_SUBSCRIPTIONS } from './in-memory-db';
const webpush = require('web-push');

export function addPushSubscriber(req, res) {
  const sub = req.body;
  USER_SUBSCRIPTIONS.push(sub);
  res.status(200).json({message: 'Subscription added successfully.'});
}

export function sendNotification(req, res) {
  // sample notification payload
  const notificationPayload = {
    notification: {
      title: 'OpenExO',
      body: 'You have a new message in the opportunity Community engagement',
      icon: 'assets/openexo_thumbnail.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [{
        action: 'explore',
        title: 'See opportunity'
      }]
    }
  };

  Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
    sub, JSON.stringify(notificationPayload) )))
    .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
    .catch(err => {
      console.error('Error sending notification, reason: ', err);
      res.sendStatus(500);
    });

}
