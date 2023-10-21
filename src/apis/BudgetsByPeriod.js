import {
  ref,
  get,
  update,
  query,
  limitToLast,
  remove,
  orderByChild,
} from "@react-native-firebase/database";

import firebaseSingleton from "@FirebaseDB/Firebase";
import auth from "@react-native-firebase/auth";
import Utilities from "@Utilities/Utilities";
import FirebaseRefStructure from "@FirebaseDB/FirebaseRefStructure";
import Config from "@Config/Config";
class BudgetsByPeriod {
  getBudgetList = (periodKey) => {
    const data = [];
    const refBD = FirebaseRefStructure.getPeriodsStructure(
      auth().currentUser.uid,
      periodKey,
      Config.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);
    const sortedQuery = query(dbRef, orderByChild("index"));
    return get(sortedQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            data.push(childSnapshot.val());
          });
        }
      })
      .then(() => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  createUpdateBudget = (objBudgetByPeriod) => {
    const refBD = FirebaseRefStructure.CRDbudgetStructure(
      auth().currentUser.uid,
      objBudgetByPeriod.periodKey,
      objBudgetByPeriod.index,
      Config.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);    
    return update(dbRef, objBudgetByPeriod).then(() => {
      return true;
    });
  };

  removeBudget = (objBudgetByPeriod) => {
    const refBD = FirebaseRefStructure.CRDbudgetStructure(
      auth().currentUser.uid,
      objBudgetByPeriod.periodKey,
      objBudgetByPeriod.index,
      Config.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);
    return remove(dbRef)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };
}
export default new BudgetsByPeriod();
