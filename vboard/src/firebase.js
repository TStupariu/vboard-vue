import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: "AIzaSyCWWCgbw-1PEPQU3c_7p92Tr_gprWoZZwQ",
  authDomain: "vboard-2ff43.firebaseapp.com",
  databaseURL: "https://vboard-2ff43.firebaseio.com",
  projectId: "vboard-2ff43",
  storageBucket: "vboard-2ff43.appspot.com",
  messagingSenderId: "394536965455"
});

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();