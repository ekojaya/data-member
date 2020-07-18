import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBUVvj6QMmt9auIez8WE_AAVKMgpbOmEU0",
  authDomain: "latihan-firebase-bd167.firebaseapp.com",
  projectId: "latihan-firebase-bd167",
});
let dataBase = firebase.firestore();
dataBase.settings({ timestampsInSnapshots: true });

export default dataBase;
