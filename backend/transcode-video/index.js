'use strict';

var AWS = require('aws-sdk');
var admin = require("firebase-admin")
var serviceAccount = require(`./${process.env.SERVICE_ACCOUNT}`);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  appId: process.env.APP_ID,
  credential: admin.credential.cert(serviceAccount)
};

var elasticTranscoder = new AWS.ElasticTranscoder({
    region: process.env.ELASTIC_TRANSCODER_REGION
});

if (admin.apps.length == 0) {
  admin.initializeApp(firebaseConfig);
}

function pushVideoEntryToFirebase(key, callback) {
    console.log('Adding video entry to firebase at key:', key);
    var database = admin.database().ref();

    database.child('videos').child(key)
        .set({
            transcoding: true
        })
        .then(function () {
          console.log('Video record saved to firebase');
            callback(null, 'Video record saved to firebase')
        })
        .catch(function (err) {
            callback(err)
        });
}

exports.handler = function (event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    var key = event.Records[0].s3.object.key;
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));
    var outputKey = sourceKey.split('.')[0];
    var uniqueVideoKey = outputKey.split('/')[0];

    var params = {
        PipelineId: process.env.ELASTIC_TRANSCODER_PIPELINE_ID,
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
              Key: outputKey + '-720p' + '.mp4',
              PresetId: process.env.GENERIC_720P_PRESET_ID
            }
        ]
    };

    elasticTranscoder.createJob(params, function (error, data) {
        if (error) {
            console.log('Error creating elastic transcoder job.');
            callback(error);
            return;
        }
        console.log('Elastic transcoder job created successfully');
        pushVideoEntryToFirebase(uniqueVideoKey, callback);
    });
};
