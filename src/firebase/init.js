import firebase from 'firebase';
 
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAPHtifJNedQmJudytxfddVqtThXPcoJ0A",
    authDomain: "rs2-testbase.firebaseapp.com",
    projectId: "rs2-testbase",
    storageBucket: "rs2-testbase.appspot.com",
    messagingSenderId: "827030793773",
    appId: "1:827030793773:web:ad6571c1563a3161da52a4",
    measurementId: "G-1DLJ763C39"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  firebase.analytics();

  export default firebaseApp.firestore();