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
import FirebaseRefStructure from "@FirebaseDB/FirebaseRefStructure";
import Config from "@Config/Config";

class ExpensesByBudget {
  getExpensesList = (objBudget) => {
    const data = [];
    const refBD = FirebaseRefStructure.getExpensesStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
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
  /**
   * Crear un nuevo periodo
   * @param {*} objExpense
   * @returns
   */
  createUpdateExpense = (objPeriod, objBudget, objExpense) => {
    const uid = auth().currentUser.uid;
    const refPeriod = FirebaseRefStructure.CUDPeriodsStructure(
      uid,
      objPeriod.index,
      Config.ENVIRONMENT
    );
    const refBudget = FirebaseRefStructure.CUDBudgetsStructure(
      uid,
      objBudget.periodKey,
      objBudget.index,
      Config.ENVIRONMENT
    );
    const refExpense = FirebaseRefStructure.CUDExpensesStructure(
      uid,
      objPeriod.index,
      objBudget.index,
      objExpense.index,
      Config.ENVIRONMENT
    );

    const dbRefPeriod = ref(firebaseSingleton.db, refPeriod);
    const dbRefBudget = ref(firebaseSingleton.db, refBudget);
    const dbRefExpense = ref(firebaseSingleton.db, refExpense);

    /*return update(dbRef, objExpense).then(() => {
      return true;
    });*/

    return Promise.all([
      update(dbRefPeriod, objPeriod),
      update(dbRefBudget, objBudget),
      update(dbRefExpense, objExpense),
    ]).then(() => {
      return true;
    });
  };

  /**
   * Eliminar periodo
   * @param {*} index
   * @param {*} context
   * @returns
   */
  removeExpense = (objBudget, objExpense) => {
    const refBD = FirebaseRefStructure.CUDExpensesStructure(
      auth().currentUser.uid,
      objBudget.periodKey,
      objBudget.index,
      objExpense.index,
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
export default new ExpensesByBudget();
