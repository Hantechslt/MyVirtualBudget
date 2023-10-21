import Utilities from "@Utilities/Utilities";

class CreateUpdatePeriodUtils {
  constructor(PERIODS, updatePeriods) {
    this.PERIODS = PERIODS;
    this.updatePeriods = updatePeriods;
  }
  /**
   * O: Crea un periodo local despues de la agregación de la base de datos para evitar consultar la base de datos.
   * @param {*} objPeriod
   */
  handleCreatePeriods(objPeriod) {
    const updatedPeriods = [...this.PERIODS, objPeriod];
    const sortedPeriods = Utilities.sortByIndex(updatedPeriods, "index");
    this.updatePeriods(sortedPeriods);
  }
  /**
   * O: Actualiza un periodo local despues de la actualizacion de la base de datos para evitar consultar la base de datos.
   * @param {*} objPeriod
   */
  handleUpdatePeriods(objPeriod) {
    this.PERIODS = Utilities.removeArrayItem(
      this.PERIODS,
      "index",
      objPeriod.index
    );
    const updatedPeriods = [...this.PERIODS, objPeriod];
    const sortedPeriods = Utilities.sortByIndex(updatedPeriods, "index");
    this.updatePeriods(sortedPeriods);
  }

  /**
   * Elimina un periodo local despues de la eliminación de la base de datos para evitar consultar la base de datos.
   * @param {*} objPeriod
   */
  handleRemovePeriods(objPeriod) {
    this.PERIODS = Utilities.removeArrayItem(
      this.PERIODS,
      "index",
      objPeriod.index
    );
    this.updatePeriods(this.PERIODS);
  }
}

export default CreateUpdatePeriodUtils;
