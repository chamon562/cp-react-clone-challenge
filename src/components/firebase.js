import firebase from 'firebase'

// paste in config to our databse from firebase
const firebaseConfig = {
    apiKey: "AIzaSyDD2NKBDqBnH5dmhBkIWF_cTBQHHPlkNS0",
    authDomain: "slack-clone-challenge-pwj.firebaseapp.com",
    projectId: "slack-clone-challenge-pwj",
    storageBucket: "slack-clone-challenge-pwj.appspot.com",
    messagingSenderId: "521246135107",
    appId: "1:521246135107:web:a162caad19328f04ae55f6"
  };

//   initialize firebase app

const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize databse
// firestore is the real time database,
const db = firebaseApp.firestore();
// because of export default db it can be used anywhere in the code
export default db;