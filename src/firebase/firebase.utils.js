import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    //if false return
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`); //check if user exist in the database

  const snapShot = await userRef.get();//get the snapshot 

  if (!snapShot.exists) {//if false
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
        console.log('error creating user', err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
