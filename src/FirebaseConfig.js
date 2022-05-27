import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDUWg0z-qQLTn6DKLdBUsXJ93ie1orolao',

  authDomain: 'ispygame-7ea84.firebaseapp.com',

  projectId: 'ispygame-7ea84',

  storageBucket: 'ispygame-7ea84.appspot.com',

  messagingSenderId: '720457772463',

  appId: '1:720457772463:web:a09f5c166f43aeedd4535a'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
