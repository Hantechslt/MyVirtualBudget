import Utilities from "@Utilities/Utilities";

class BudgetsByPeriodUtils {
  constructor(BUDGETS_BY_PERIOD, updateBudgetsByPeriod) {
    this.BUDGETS_BY_PERIOD = BUDGETS_BY_PERIOD;
    this.updateBudgetsByPeriod = updateBudgetsByPeriod;
  }

  /**
   * Agregar un periodo
   * @param {*} objBudget
   */
  handleCreateBudget(objBudget) {
    const updatedBudget = [...this.BUDGETS_BY_PERIOD, objBudget];
    const sortedBudgets = Utilities.sortArrayByIndex(updatedBudget, "index");
    this.updateBudgetsByPeriod(sortedBudgets);
  }

  /**
   * Actualizar un periodo
   * @param {*} objBudget
   */
  handleUpdateBudget(objBudget) {
    this.BUDGETS_BY_PERIOD = Utilities.removeArrayItem(
      this.BUDGETS_BY_PERIOD,
      "index",
      objBudget.index
    );
    const updatedBudget = [...this.BUDGETS_BY_PERIOD, objBudget];
    const sortedBudgets = Utilities.sortArrayByIndex(updatedBudget, "index");
    this.updateBudgetsByPeriod(sortedBudgets);
  }

  /**
   * Remover un periodo.
   * @param {*} objBudget
   */
  handleRemoveBudget(objBudget) {
    const removedBudget = Utilities.removeArrayItem(
      this.BUDGETS_BY_PERIOD,
      "index",
      objBudget.index
    );
    this.updateBudgetsByPeriod(removedBudget);
  }

  /**
   * Retornar todos los prepuestos de los periodos actuales
   * @param {*} periods
   * @returns
   */
  handleGetBudgetsByPeriod(periods) {
    const budgetByPeriod = [];
    periods.forEach((period) => {
      for (let key in period.BudgetByPeriod) {
        budgetByPeriod.push(period.BudgetByPeriod[key]);
      }
    });
    const budgetByPeriodSort = Utilities.sortArrayByIndex(
      budgetByPeriod,
      "index"
    );

    return budgetByPeriodSort;
  }

  /**
   * Agregar propiedad extras a los datos de presupuestos esto para utilizarlo en los select
   * @param {*} budgets
   * @returns
   */
  handleAddLabelDesc(budgets) {
    budgets.forEach((budget) => {
      budget["label"] = budget.budgetName;
      budget["description"] = Utilities.getLocaleCurrency(
        budget.amount,
        "es-CR",
        "CRC"
      );
    });
    return budgets;
  }
}

export default BudgetsByPeriodUtils;
