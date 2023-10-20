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
class Budgets {
  getPeriodList = (context) => {
    const data = [];
    const refBD = FirebaseRefStructure.getPeriodsStructure(
      auth().currentUser.uid,
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
   * @param {*} objPeriod
   * @returns
   */
  createPeriod = (objPeriod, context) => {
    const index = Utilities.getTimeStamp();
    objPeriod["index"] = index;
    const refBD = FirebaseRefStructure.CRDperiodStructure(
      auth().currentUser.uid,
      index,
      context.ENVIRONMENT
    );
    const dbRef = ref(firebaseSingleton.db, refBD);
    console.log(dbRef);
    return update(dbRef, objPeriod).then(() => {
      return true;
    });
  };

  /**
   * Actualizar un periodo
   * @param {*} objPeriod
   * @returns
   */
  updatePeriod = (objPeriod, context) => {
    console.log(objPeriod);
    const refBD = FirebaseRefStructure.CRDperiodStructure(
      auth().currentUser.uid,
      objPeriod.index,
      context.ENVIRONMENT
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
  removePeriod = (index, context) => {
    const refBD = FirebaseRefStructure.CRDperiodStructure(
      auth().currentUser.uid,
      index,
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
export default new Budgets();
