import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3VjeFVlVg6VjD9F_eSKl1Dzyhl613oS8",
    authDomain: "slackclone-2cdcb.firebaseapp.com",
    projectId: "slackclone-2cdcb",
    storageBucket: "slackclone-2cdcb.appspot.com",
    messagingSenderId: "528298926860",
    appId: "1:528298926860:web:9fdae4929dcc920bf31f29",
    measurementId: "G-VPCXZW2RX0"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  export {db,auth,provider, signInWithPopup};
