import Utilities from "@Utilities/Utilities";

class ExpensesByBudgetUtils {
  constructor(EXPENSES_BY_BUDGET, updateExpensesByBudget) {
    this.EXPENSES_BY_BUDGET = EXPENSES_BY_BUDGET;
    this.updateExpensesByBudget = updateExpensesByBudget;
  }

  handleCreateExpense(objExpense) {
    const updatedExpenses = [...this.EXPENSES_BY_BUDGET, objExpense];
    const sortedExpenses = Utilities.sortByIndex(updatedExpenses, "index");
    this.updateExpensesByBudget(sortedExpenses);
  }

  handleUpdateExpense(objExpense) {
    this.EXPENSES_BY_BUDGET = Utilities.removeArrayItem(
      this.EXPENSES_BY_BUDGET,
      "index",
      objExpense.index
    );
    const updatedExpenses = [...this.EXPENSES_BY_BUDGET, objExpense];
    const sortedExpenses = Utilities.sortByIndex(updatedExpenses, "index");

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

  handleGetExpenseByBudget(expenses, property, value) {
    return expenses.filter((expense) => expense[property] === value);
  }

  handleGetExpensesByBudget(budgets) {
    const expensesByBudget = [];
    budgets.forEach((budget) => {
      for (let key in budget.SpendingByBudget) {
        expensesByBudget.push(budget.SpendingByBudget[key]);
      }
    });

    return expensesByBudget;
  }
}

export default ExpensesByBudgetUtils;
