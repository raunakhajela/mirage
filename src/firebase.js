// importing config and firebase
import config from "./firebaseConfig";
import FireBase from "firebase";
import 'firebase/firestore';

// initializing app
let app = FireBase.initializeApp(config);

// creating firestore variable
let firestore = app.firestore();

// allowing firestore to use timestamps
firestore.settings({
    timestampsInSnapshots: true
})


// exporting firestore
export default firestore;