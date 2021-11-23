var admin = require("firebase-admin")
var serviceAccount = require(`./hour-video-df956-firebase-adminsdk-1heoe-0a192d0504.json`);

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "hour-video-df956.appspot.com",
  messagingSenderId: "1025738132564",
  appId: "",
  measurementId: "G-X6B73N78XJ",
  credential: admin.credential.cert(serviceAccount)
};

admin.initializeApp(firebaseConfig);
const db = admin.database().ref()

async function test() {
    try {
      await db.child('Videos').child('testvid').set({encoding:true})
      console.log(db.key)
    } catch(e) {
      console.log(e);
    }
    process.exit(0)
}

test()
