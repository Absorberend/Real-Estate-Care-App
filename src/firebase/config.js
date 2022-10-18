import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZAiJ70kv4cYy2OhE68iGCdJk-RYVI3Yc",
    authDomain: "real-estate-care-app.firebaseapp.com",
    projectId: "real-estate-care-app",
    storageBucket: "real-estate-care-app.appspot.com",
    messagingSenderId: "588435235465",
    appId: "1:588435235465:web:570c5b19fbff5f9e2d5c58"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

projectFirestore.enablePersistence()
.catch(err => {
  if(err.code === 'failed-precondition') {
    //probably multiple tabs open at once.
    console.log('persistence failed')
  } else if (err.code === 'unimplemented') {
    //lack of browser support.
    console.log('persistence is not available');
  }
})

export {projectFirestore};