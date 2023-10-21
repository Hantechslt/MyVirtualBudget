class FirebaseRefStructure {
  FirebaseRefStructure() {}

  //#region PERIOD
  CRDperiodStructure(uid, index, ENV) {
    if (ENV == "DEV") return `UsersDEV/${uid}/Periods/${index}/`;
    else return `Users/${uid}/Periods/${index}/`;
  }
  getPeriodsStructure(uid, ENV) {
    if (ENV == "DEV") return `UsersDEV/${uid}/Periods/`;
    else return `Users/${uid}/Periods/`;
  }
  //#endregion

  //#region BUDGET

  CRDbudgetStructure(uid, periodKey, index, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/${index}/`;
    else return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/${index}/`;
  }

  getbudgetStructure(uid, periodKey, index, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/`;
    else return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/`;
  }
  //#endregion
  //#region Spending

  CUDSpendingStructure(uid, periodKey, budgetKey, index, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/SpendingByBudget/${index}/`;
    else
      return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/SpendingByBudget/${index}/`;
  }

  getSpendingStructure(uid, periodKey, budgetKey, ENV) {
    if (ENV == "DEV")
      return `UsersDEV/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/SpendingByBudget`;
    else
      return `Users/${uid}/Periods/${periodKey}/BudgetByPeriod/${budgetKey}/SpendingByBudget`;
  }
  //#endregion
}

export default new FirebaseRefStructure();
