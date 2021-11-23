'use strict';

var AWS = require('aws-sdk');
var admin = require('firebase-admin');
var serviceAccount = require(`./${process.env.SERVICE_ACCOUNT}`);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  appId: process.env.APP_ID,
  credential: admin.credential.cert(serviceAccount)
};

if (admin.apps.length == 0) {
  admin.initializeApp(firebaseConfig);
}

exports.handler = function(event, context, callback){
    context.callbackWaitsForEmptyEventLoop = false;
    var message = JSON.parse(event.Records[0].Sns.Message);
    var key = message.Records[0].s3.object.key;
    var bucket = message.Records[0].s3.bucket.name;
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));
    var uniqueVideoKey = sourceKey.split('/')[0];
    var database = admin.database().ref();

    database.child('videos').child(uniqueVideoKey).set({
        transcoding: false,
        key: key,
        bucket: process.env.S3
    }).catch(function(err) {
        callback(err);
    });
};
