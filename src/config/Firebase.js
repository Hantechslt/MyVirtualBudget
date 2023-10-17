
import { initializeApp } from '@react-native-firebase/app';
import { getDatabase } from '@react-native-firebase/database';
import { getAuth } from "@react-native-firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBn4Q8Th181Lk01sCkw4yGH75Qmy2R9-5M",
  authDomain: "myvitualbudget.firebaseapp.com",
  databaseURL: "https://myvitualbudget-default-rtdb.firebaseio.com",
  projectId: "myvitualbudget",
  storageBucket: "myvitualbudget.appspot.com",
  messagingSenderId: "296808226826",
  appId: "1:296808226826:web:c27f5a8ecf5d3c49273ff3",
  measurementId: "G-442HVYVGK8",
};

class Firebase {
  constructor() {
    if (Firebase.singletonFirebase instanceof Firebase) {
      return Firebase.singletonFirebase;
    }
    
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
    this.auth = getAuth(app); 

    Object.freeze(this);
    Firebase.singletonFirebase = this;
  }

  getInstance = () => {
    return this.db; 
  };

  getAuthInstance = () => {
    return this.auth; 
  };
}

export default new Firebase();





