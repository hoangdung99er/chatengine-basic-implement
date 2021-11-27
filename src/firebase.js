// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoeQvoPLarn1O0nStV_vtOmIg0rlf-ZIc",
  authDomain: "oauth-passport-basic.firebaseapp.com",
  projectId: "oauth-passport-basic",
  storageBucket: "oauth-passport-basic.appspot.com",
  messagingSenderId: "980264694880",
  appId: "1:980264694880:web:9480e5eb10a50bfe2f7f05",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () =>
  auth.signInWithRedirect(facebookProvider);

export default firebase;
