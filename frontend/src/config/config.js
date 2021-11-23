import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_APP_FIREBASE_ID,
};

export const firebaseInit = () => {
  if (firebase.apps.length === 0) {
    const app = firebase.initializeApp(firebaseConfig);
    return app;
  }
}
