import Utilities from "@Utilities/Utilities";

class BudgetByPeriodUtils {
  constructor(BUDGETS_BY_PERIOD, updateBudgetsByPeriod) {
    this.BUDGETS_BY_PERIOD = BUDGETS_BY_PERIOD;
    this.updateBudgetsByPeriod = updateBudgetsByPeriod;
  }

  handleCreateBudget(objBudget) {
    this.BUDGETS_BY_PERIOD.push(objBudget);
    this.BUDGETS_BY_PERIOD = Utilities.sortByIndex(
      this.BUDGETS_BY_PERIOD,
      "index"
    );
    this.updateBudgetsByPeriod(this.BUDGETS_BY_PERIOD);
  }

  handleUpdateBudget(objBudget) {
    this.BUDGETS_BY_PERIOD = Utilities.removeArrayItem(
      this.BUDGETS_BY_PERIOD,
      "index",
      objBudget.index
    );
    this.BUDGETS_BY_PERIOD.push(objBudget);
    this.BUDGETS_BY_PERIOD = Utilities.sortByIndex(
      this.BUDGETS_BY_PERIOD,
      "index"
    );
    this.updateBudgetsByPeriod(this.BUDGETS_BY_PERIOD);
  }

  handleRemoveBudget(objBudget) {
    this.BUDGETS_BY_PERIOD = Utilities.removeArrayItem(
      this.BUDGETS_BY_PERIOD,
      "index",
      objBudget.index
    );
    this.updateBudgetsByPeriod(this.BUDGETS_BY_PERIOD);
  }

  handleGetBudgetByPeriod(periods) {
    console.log(periods);
    const budgets = [];
    console.log(periods.BudgetByPeriod);
    for (let key in periods.BudgetByPeriod) {
      let budget = periods.BudgetByPeriod[key];
      budgets.push(budget);
    }
    const budgetsReverse = budgets.reverse();
    this.updateBudgetsByPeriod(budgetsReverse);
  }
}

export default BudgetByPeriodUtils;
