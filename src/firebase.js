import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAJhjemzFSDqOAg0Jh9sdMV9A_OvdwH1B4",
  authDomain: "watsappclone-c5b59.firebaseapp.com",
  projectId: "watsappclone-c5b59",
  storageBucket: "watsappclone-c5b59.appspot.com",
  messagingSenderId: "470833348256",
  appId: "1:470833348256:web:ad95493f2f382fe30fd3c5"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth()
const provider=new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db