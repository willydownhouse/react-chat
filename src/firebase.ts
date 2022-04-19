// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messaginSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

// const firebaseConfig = {
//   apiKey:
//     process.env.NODE_ENV === 'development'
//       ? process.env.REACT_APP_apiKey
//       : process.env.REACT_APP_PROD_apiKey,
//   authDomain:
//     process.env.NODE_ENV === 'development'
//       ? process.env.REACT_APP_authDomain
//       : process.env.REACT_APP_PROD_authDomain,
//   projectId:
//     process.env.NODE_ENV === 'development'
//       ? process.env.REACT_APP_projectId
//       : process.env.REACT_APP_PROD_projectId,
//   storageBucket:
//     process.env.NODE_ENV === 'development'
//       ? process.env.REACT_APP_storageBucket
//       : process.env.REACT_APP_PROD_storageBucket,
//   messagingSenderId:
//     process.env.NODE_ENV === 'development'
//       ? process.env.REACT_APP_messaginSenderId
//       : process.env.REACT_APP_PROD_messaginSenderId,
//   appId:
//     process.env.NODE_ENV === 'development'
//       ? process.env.REACT_APP_appId
//       : process.env.REACT_APP_PROD_appId,
//   measurementId:
//     process.env.NODE_ENV === 'development'
//       ? process.env.REACT_APP_measurementId
//       : process.env.REACT_APP_PROD_measurementId,
// };
