import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

class FirebaseSingleton {
  constructor() {
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

    if (!FirebaseSingleton.instance) {
      const firebaseApp = initializeApp(firebaseConfig);
      this.db = getDatabase(firebaseApp);
      FirebaseSingleton.instance = this;
    }

    return FirebaseSingleton.instance;
  }
}

const instance = new FirebaseSingleton();
Object.freeze(instance);

export default instance;
