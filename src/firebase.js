import firebase from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import 'firebase/auth'
import 'firebase/database'  

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export default db