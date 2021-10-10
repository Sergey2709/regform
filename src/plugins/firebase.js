import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD8MO_d56OH9HnzmhJfakDAZMSX9MI-OUA',
  authDomain: 'regform-33ef9.firebaseapp.com',
  databaseURL: 'https://regform-33ef9-default-rtdb.firebaseio.com',
  projectId: 'regform-33ef9',
  storageBucket: 'regform-33ef9.appspot.com',
  messagingSenderId: '244226144863',
  appId: '1:244226144863:web:e8bcec7a74e534513279ea',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };