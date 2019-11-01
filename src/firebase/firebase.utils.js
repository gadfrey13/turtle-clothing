import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyACbbCmJkFrubdoaUdW4Mpwk1yi1MZdZrQ",
    authDomain: "turtle-db.firebaseapp.com",
    databaseURL: "https://turtle-db.firebaseio.com",
    projectId: "turtle-db",
    storageBucket: "turtle-db.appspot.com",
    messagingSenderId: "896768624900",
    appId: "1:896768624900:web:592bcfcd0b5d2843bda851",
    measurementId: "G-45RTQ3S797"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;