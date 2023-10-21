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
class SpendingByBudget {
  getSpendingList = (objBudget) => {
    const data = [];
    const refBD = FirebaseRefStructure.getSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      config.ENVIRONMENT
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
  createSpending = (objBudget, objSpending) => {
    const index = Utilities.getTimeStamp();
    objSpending["index"] = index;
    const refBD = FirebaseRefStructure.CUDSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      index,
      config.ENVIRONMENT
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
  updateSpending = (objBudget, objSpending) => {
    const refBD = FirebaseRefStructure.CUDSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      objSpending.index,
      config.ENVIRONMENT
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
  removeSpending = (objBudget, objSpending) => {
    const refBD = FirebaseRefStructure.CUDSpendingStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      objSpending.index,
      config.ENVIRONMENT
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
