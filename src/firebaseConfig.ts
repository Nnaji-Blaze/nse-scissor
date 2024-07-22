import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA8ZGqVm93pD_dKYr_VDrh1X6Rhcq3ijPo',
  authDomain: 'nse-scx.firebaseapp.com',
  projectId: 'nse-scx',
  storageBucket: 'nse-scx.appspot.com',
  messagingSenderId: '105802310295',
  appId: '1:105802310295:web:1cef468df2f7862cd07fd2',
  measurementId: 'G-S2CWNDHKL2',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
