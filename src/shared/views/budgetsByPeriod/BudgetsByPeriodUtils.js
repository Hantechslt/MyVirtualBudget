import Utilities from "@Utilities/Utilities";

class BudgetsByPeriodUtils {
  constructor(BUDGETS_BY_PERIOD, updateBudgetsByPeriod) {
    this.BUDGETS_BY_PERIOD = BUDGETS_BY_PERIOD;
    this.updateBudgetsByPeriod = updateBudgetsByPeriod;
  }

  handleCreateBudget(objBudget) {
    const updatedBudget = [...this.BUDGETS_BY_PERIOD, objBudget];
    const sortedBudgets = Utilities.sortByIndex(updatedBudget, "index");    
    this.updateBudgetsByPeriod(sortedBudgets);
  }

  handleUpdateBudget(objBudget) {
    this.BUDGETS_BY_PERIOD = Utilities.removeArrayItem(
      this.BUDGETS_BY_PERIOD,
      "index",
      objBudget.index
    );
    const updatedBudget = [...this.BUDGETS_BY_PERIOD, objBudget];
    const sortedBudgets = Utilities.sortByIndex(updatedBudget, "index");

    this.updateBudgetsByPeriod(sortedBudgets);
  }

  handleRemoveBudget(objBudget) {
    const removedBudget = Utilities.removeArrayItem(
      this.BUDGETS_BY_PERIOD,
      "index",
      objBudget.index
    );
    this.updateBudgetsByPeriod(removedBudget);
  }

  handleGetBudgetByPeriod(budgets, property, value) {
    return budgets.filter((budget) => budget[property] === value);
  }

  handleGetBudgetsByPeriod(periods) {
    const budgetByPeriod = [];
    periods.forEach((period) => {
      for (let key in period.BudgetByPeriod) {
        budgetByPeriod.push(period.BudgetByPeriod[key]);
      }
    });

    return budgetByPeriod;
  }
}

export default BudgetsByPeriodUtils;
