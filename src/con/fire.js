// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC5XisBKJFXUGNozjnphkewS-kPVKs4GGE",
  authDomain: "rejajamil-8e1a2.firebaseapp.com",
  databaseURL: "https://rejajamil-8e1a2.firebaseio.com",
  projectId: "rejajamil-8e1a2",
  storageBucket: "rejajamil-8e1a2.appspot.com",
  messagingSenderId: "1060272044947",
  appId: "1:1060272044947:web:7d6cd87f0f14bbbdd24666",
  measurementId: "G-58SLZLY7HW"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const fire = firebase.database().ref().child('message/time');

// Triger
// fire.on('value', (data) => {
//   console.log(data);
// });

// Updater
// fire.set(Date.now());
export default fire
