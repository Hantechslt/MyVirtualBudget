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

class SpendingByBudget {
  getSpendingList = (objBudget, context) => {
    const data = [];
    const refBD = FirebaseRefStructure.getSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
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
   * @param {*} objSpending
   * @returns
   */
  createSpending = (objBudget, objSpending, context) => {
    const index = Utilities.getTimeStamp();
    objSpending["index"] = index;
    const refBD = FirebaseRefStructure.CUDSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      index,
      context.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);    
    return update(dbRef, objSpending).then(() => {
      return true;
    });
  };

  /**
   * Actualizar un periodo
   * @param {*} objBudgetByPeriod
   * @returns
   */
  updateSpending = (objBudget, objSpending, context) => {
    const refBD = FirebaseRefStructure.CUDSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      objSpending.index,
      context.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);

    return update(dbRef, objSpending)
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
  removeSpending = (objBudget, objSpending, context) => {
    const refBD = FirebaseRefStructure.CUDSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      objSpending.index,
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
export default new SpendingByBudget();
