
// Compatible with version 9.0+
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

app.firestore().settings({ timestampsInSnapshots: true });

export default app.firestore();
