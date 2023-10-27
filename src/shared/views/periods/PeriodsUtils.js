import Utilities from "@Utilities/Utilities";

class PeriodsUtils {
  constructor(PERIODS, updatePeriods) {
    this.PERIODS = PERIODS;
    this.updatePeriods = updatePeriods;
  }
  /**
   * O: Crea un periodo local despues de la agregación de la base de datos para evitar consultar la base de datos.
   * @param {*} objPeriod
   */
  handleCreatePeriods(objPeriod) {
    const label = Utilities.getFormatPeriodDate(
      objPeriod.startDate,
      objPeriod.endDate
    );
    const desc = Utilities.getLocaleCurrency(objPeriod.amount, "es-CR", "CRC");
    let objPeriodStorage = {
      ...objPeriod,
      label: label,
      description: desc,
    };

    const updatedPeriods = [...this.PERIODS, objPeriodStorage];
    const sortedPeriods = Utilities.sortArrayByIndex(updatedPeriods, "index");
    
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
    const sortedPeriods = Utilities.sortArrayByIndex(updatedPeriods, "index");
    this.updatePeriods(sortedPeriods);
  }

  /**
   * Elimina un periodo local despues de la eliminación de la base de datos para evitar consultar la base de datos.
   * @param {*} objPeriod
   */
  handleRemovePeriods(objPeriod) {
    const removedPeriod = Utilities.removeArrayItem(
      this.PERIODS,
      "index",
      objPeriod.index
    );
    console.log("removedPeriod");
        console.log(removedPeriod);

    this.updatePeriods(removedPeriod);
  }

  /**
   * Agregar propiedad extras a los datos de periodo esto para utilizarlo en los select
   * @param {*} periods
   * @returns
   */
  handleAddLabelDesc(periods) {
    periods.forEach((period) => {
      period["label"] = Utilities.getFormatPeriodDate(
        period.startDate,
        period.endDate
      );
      period["description"] = Utilities.getLocaleCurrency(
        period.amount,
        "es-CR",
        "CRC"
      );
    });
    return periods;
  }
}

export default PeriodsUtils;
