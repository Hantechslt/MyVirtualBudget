import { ref, get, update } from "firebase/database";

import firebaseSingleton from "@Config/Firebase";

const dbRef = ref(firebaseSingleton.db, "/BudgetTypeDEV/+50686223950/202208");

class Budgets {
  getBudgetsList = () => {
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
export default new Budgets();

