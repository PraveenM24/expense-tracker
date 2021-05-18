import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDH8RThqwDdaKWAGc_sVv-eunmcXbXK44s",
    authDomain: "expense-tracker-20df3.firebaseapp.com",
    projectId: "expense-tracker-20df3",
    storageBucket: "expense-tracker-20df3.appspot.com",
    messagingSenderId: "96007637032",
    appId: "1:96007637032:web:31595876e9ed8e151d0d1d"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { auth, db, storage };
