import Utilities from "@Utilities/Utilities";

class ExpensesByBudgetUtils {
  constructor(EXPENSES_BY_BUDGET, updateExpensesByBudget) {
    this.EXPENSES_BY_BUDGET = EXPENSES_BY_BUDGET;
    this.updateExpensesByBudget = updateExpensesByBudget;
  }

  handleCreateExpense(objExpense) {
    const updatedExpenses = [...this.EXPENSES_BY_BUDGET, objExpense];
    const sortedExpenses = Utilities.sortArrayByIndex(updatedExpenses, "index");
    this.updateExpensesByBudget(sortedExpenses);
  }

  handleUpdateExpense(objExpense) {
    this.EXPENSES_BY_BUDGET = Utilities.removeArrayItem(
      this.EXPENSES_BY_BUDGET,
      "index",
      objExpense.index
    );
    const updatedExpenses = [...this.EXPENSES_BY_BUDGET, objExpense];
    const sortedExpenses = Utilities.sortArrayByIndex(updatedExpenses, "index");

    this.updateExpensesByBudget(sortedExpenses);
  }

  handleRemoveExpense(objExpense) {
    const removedExpense = Utilities.removeArrayItem(
      this.EXPENSES_BY_BUDGET,
      "index",
      objExpense.index
    );
    this.updateExpensesByBudget(removedExpense);
  }

  /**
   * Retornar todos los 
   * @param {*} expenses 
   * @param {*} property 
   * @param {*} value 
   * @returns 
   */
  handleGetExpenseByBudget(expenses, property, value) {
    return expenses.filter((expense) => expense[property] === value);
  }

  /**
   * Retornar todos los gastos de los presupuestos ordenados por el index
   * @param {*} budgets
   * @returns
   */
  handleGetExpensesByBudget(budgets) {
    const expensesByBudget = [];
    budgets.forEach((budget) => {
      for (let key in budget.ExpensesByBudget) {
        expensesByBudget.push(budget.ExpensesByBudget[key]);
      }
    });
    const expensesByBudgetSort = Utilities.sortArrayByIndex(
      expensesByBudget,
      "index"
    );
    return expensesByBudgetSort;
  }
}

export default ExpensesByBudgetUtils;
