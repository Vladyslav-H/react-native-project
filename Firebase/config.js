import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCXRIw-zeQ3KMmDUtWAfZBhHGgRJLNl8so',
  authDomain: 'react-native-project-5898b.firebaseapp.com',
  databaseURL: 'https://react-native-project-5898b.firebaseio.com',
  projectId: 'react-native-project-5898b',
  storageBucket: 'react-native-project-5898b.appspot.com',
  messagingSenderId: '77659569482',
  appId: '1:77659569482:web:41eba2db53877de57b55b3',
  measurementId: 'G-FW9HVFV3BK',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
 