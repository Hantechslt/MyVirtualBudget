class FirebaseRefStructure {
  FirebaseRefStructure() {}

  //#region PERIOD
  CUDPeriodsStructure(uid, index, ENV) {
    if (ENV == "DEV") return `UsersDEV/${uid}/Periods/${index}/`;
    else return `Users/${uid}/Periods/${index}/`;
  }
  getPeriodsStructure(uid, ENV) {
    if (ENV == "DEV") return `UsersDEV/${uid}/Periods/`;
    else return `Users/${uid}/Periods/`;
  }
  //#endregion

  //#region BUDGET

  CUDBudgetsStructure(uid, periodKey, index, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/${index}/`;
    else return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/${index}/`;
  }

  getBudgetsStructure(uid, periodKey, index, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/`;
    else return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/`;
  }
  //#endregion
  //#region Spending

  CUDExpensesStructure(uid, periodKey, budgetKey, index, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/ExpensesByBudget/${index}/`;
    else
      return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/ExpensesByBudget/${index}/`;
  }

  getExpensesStructure(uid, periodKey, budgetKey, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/ExpensesByBudget`;
    else
      return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/ExpensesByBudget`;
  }
  //#endregion
}

export default new FirebaseRefStructure();
