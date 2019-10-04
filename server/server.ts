import * as express from 'express';
import {addPushSubscriber} from './add-push-subscriber.route';
import {sendNotification} from './add-push-subscriber.route';

const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
const cors = require('cors');

const vapidKeys = {
  publicKey: 'BMloIXro0C20iV6Nlo90bBPKFv0RF9xuy-QOgOPLHZbUO8FRTLseMljQMxlZCjnZvTpbq-dEYbL3aqsJge5JbH0',
  privateKey: 'WGwDC2kpduKoj7nyP0OQWEdMOsJc5IPoeJZi9o36v6E',
};

webpush.setVapidDetails(
  'mailto:nacho@openexo.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const whitelist = ['http://127.0.0.1:8081'];
const corsOptions = {
  // tslint:disable-next-line:only-arrow-functions
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.route('/api/notifications')
  .post(addPushSubscriber);

app.route('/api/newsletter')
  .post(sendNotification);

const httpServer = app.listen(9000, () => {
  console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});
