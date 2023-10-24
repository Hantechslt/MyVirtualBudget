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

class Budgets {
  getPeriodList = () => {

    const data = [];
    const refBD = FirebaseRefStructure.getPeriodsStructure(
      auth().currentUser.uid,
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
   * @param {*} objPeriod
   * @returns
   */
  createUpdatePeriod = (objPeriod) => {
    const refBD = FirebaseRefStructure.CUDPeriodsStructure(
      auth().currentUser.uid,
      objPeriod.index,
      Config.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);
    return update(dbRef, objPeriod)
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
  removePeriod = (index) => {
    const refBD = FirebaseRefStructure.CUDPeriodsStructure(
      auth().currentUser.uid,
      index,
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
export default new Budgets();
