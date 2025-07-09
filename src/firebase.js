// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPkqTsw9vw4TPxINTFm30LCCUHVxRNjyc",
  authDomain: "insurance-project-57465.firebaseapp.com",
  projectId: "insurance-project-57465",
  storageBucket: "insurance-project-57465.firebasestorage.app",
  messagingSenderId: "661001800472",
  appId: "1:661001800472:web:7ccfbbbbdd3dcee3fe2c6d"
};

// primary app
const primaryApp = initializeApp(firebaseConfig);
export const auth = getAuth(primaryApp);
export const db   = getFirestore(primaryApp);

// secondary app for creating users
const secondaryApp = !getApps().find(app => app.name === 'Secondary')
  ? initializeApp(firebaseConfig, 'Secondary')
  : getApp('Secondary');
export const secondaryAuth = getAuth(secondaryApp);