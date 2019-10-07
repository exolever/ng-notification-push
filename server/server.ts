require('./config');

import * as express from 'express';
import { addPushSubscriber } from './add-push-subscriber.route';
import { sendNotification } from './add-push-subscriber.route';

const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
const cors = require('cors');

webpush.setVapidDetails(
  process.env.VAPID_MAILTO,
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

let corsOptions;
if (process.env.ENVIROMENT  === 'dev') {
  const whitelist = ['http://127.0.0.1:8080', 'http://127.0.0.1:8081'];
  corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes... move to a new folder.
app.route('/api/notifications')
  .post(addPushSubscriber);
app.route('/api/newsletter')
  .post(sendNotification);

app.listen(process.env.PORT, () => {
  console.log('Listen port: ', process.env.PORT);
});
