import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqNlwtdkx3MTWYBDRuSmZUnbzk7lAb4CQ",
  authDomain: "nwitter-reloaded-52712.firebaseapp.com",
  projectId: "nwitter-reloaded-52712",
  storageBucket: "nwitter-reloaded-52712.appspot.com",
  messagingSenderId: "445248933826",
  appId: "1:445248933826:web:53cf6dc58ea3438f0f105b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
