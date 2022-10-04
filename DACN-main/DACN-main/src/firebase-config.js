import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore' 
const firebaseConfig = {
    apiKey: "AIzaSyB6OgiLMGOI_yak44SvTVIpLr2DK2JDkhM",
    authDomain: "dacn-web-25c8b.firebaseapp.com",
    projectId: "dacn-web-25c8b",
    storageBucket: "dacn-web-25c8b.appspot.com",
    messagingSenderId: "767433153402",
    appId: "1:767433153402:web:5cf2d45da7c6c95a1454c3",
    measurementId: "G-WNYREHK1BG"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();