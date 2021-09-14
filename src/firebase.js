import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz3_V9bnetvEeV7vpgvNjzTsLHIf7n4jo",
  authDomain: "shopee-demo-c6d2b.firebaseapp.com",
  projectId: "shopee-demo-c6d2b",
  storageBucket: "shopee-demo-c6d2b.appspot.com",
  messagingSenderId: "889142901917",
  appId: "1:889142901917:web:e00c1bfb3ab0cd151d6874",
  measurementId: "G-9G0B5LV3HD"
};

//create firebase app instance
const firebaseApp = firebase.initializeApp(firebaseConfig);
//create db
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
