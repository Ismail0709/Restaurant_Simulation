// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBumwoUWOYPQ4qQsaXHaDsV2IYUiFkYB6w",
  authDomain: "restaurant-simulation-6b9fe.firebaseapp.com",
  projectId: "restaurant-simulation-6b9fe",
  storageBucket: "restaurant-simulation-6b9fe.appspot.com",
  messagingSenderId: "458642783663",
  appId: "YOUR_APP_ID", // You can find this in Firebase Console > Project Settings > General
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
