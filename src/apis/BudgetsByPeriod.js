import {
  ref,
  get,
  update,
  query,
  limitToLast,
  remove,
  orderByChild,
} from "@react-native-firebase/database";

import firebaseSingleton from "@Config/Firebase";
import auth from "@react-native-firebase/auth";
import Utilities from "@Utilities/Utilities";
import FirebaseRefStructure from "@Config/FirebaseRefStructure";

class BudgetsByPeriod {
  getBudgetList = (periodKey, context) => {
    const data = [];
    const refBD = FirebaseRefStructure.getPeriodsStructure(
      auth().currentUser.uid,
      periodKey,
      context.ENVIRONMENT
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
  /**
   * Crear un nuevo periodo
   * @param {*} objBudgetByPeriod
   * @returns
   */
  createBudget = (objBudgetByPeriod, context) => {
    const index = Utilities.getTimeStamp();
    objBudgetByPeriod["index"] = index;
    const refBD = FirebaseRefStructure.CRDbudgetStructure(
      auth().currentUser.uid,
      objBudgetByPeriod.periodKey,
      index,
      context.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);
    console.log(dbRef);
    return update(dbRef, objBudgetByPeriod).then(() => {
      return true;
    });
  };

  /**
   * Actualizar un periodo
   * @param {*} objBudgetByPeriod
   * @returns
   */
  updateBudget = (objBudgetByPeriod, context) => {
    const refBD = FirebaseRefStructure.CRDbudgetStructure(
      auth().currentUser.uid,
      objBudgetByPeriod.periodKey,
      objBudgetByPeriod.index,
      context.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);

    return update(dbRef, objBudgetByPeriod)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  /**
   * Eliminar periodo
   * @param {*} index
   * @param {*} context
   * @returns
   */
  removeBudget = (objBudgetByPeriod, context) => {
    const refBD = FirebaseRefStructure.CRDbudgetStructure(
      auth().currentUser.uid,
      objBudgetByPeriod.periodKey,
      objBudgetByPeriod.index,
      context.ENVIRONMENT
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
