import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'react-todolist-app-e84d5.firebaseapp.com',
  databaseURL: 'https://react-todolist-app-e84d5-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'react-todolist-app-e84d5',
  storageBucket: 'react-todolist-app-e84d5.appspot.com',
  messagingSenderId: '613163577549',
  appId: '1:613163577549:web:0999a9ae59bb49455eb984',
  measurementId: 'G-W74KSGHFSX',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
