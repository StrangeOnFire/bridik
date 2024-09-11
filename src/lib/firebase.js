import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDfhvMS0CcoRKT7lAEsCPUIAxOKancrNtE",
    authDomain: "parts-1ffae.firebaseapp.com",
    projectId: "parts-1ffae",
    storageBucket: "parts-1ffae.appspot.com",
    messagingSenderId: "15289760239",
    appId: "1:15289760239:web:16610f11ff703007855e1a",
    measurementId: "G-7C9G5N42EY"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);