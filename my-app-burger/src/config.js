import firebase from 'firebase/app'
import 'firebase/database';



const firebaseConfig={
    apiKey: "AIzaSyAdDIK8mlo9OoI0lZbuc0ENeq81GrFn5vg",
    authDomain: "fir-starter-mine.firebaseapp.com",
    databaseURL: "https://fir-starter-mine.firebaseio.com",
    projectId: "fir-starter-mine",
    storageBucket: "fir-starter-mine.appspot.com",
    messagingSenderId: "97976473971"
  };
export default firebase.initializeApp(firebaseConfig)