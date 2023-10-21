import { ref, get, update } from "@react-native-firebase/database";

import Firebase from "@FirebaseDB/Firebase";

class MyBudgetApp {
  getMyAppInfo = () => {
    console.log(Firebase.getInstance());

    const dbRef = ref(Firebase.getInstance(), "/MyBudgetDEV");
    const data = [];
    return get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          data.push(snapshot.val());
        }
      })
      .then(() => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  updateBudgetsList = (updates) => {
    return update(dbRef, updates)
      .then(() => {
        console.log("Update successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
export default new MyBudgetApp();
