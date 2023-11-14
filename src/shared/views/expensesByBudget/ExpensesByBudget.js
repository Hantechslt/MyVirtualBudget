import React, { useState, useEffect, useContext } from "react";

import { DataTable, TextInput, Text, useTheme } from "react-native-paper";
import { View, ScrollView } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
import ExpensesCard from "@Components/ExpensesCard";
import ExpensesByBudgetUtils from "@ExpensesByBudget/ExpensesByBudgetUtils";
import PeriodsUtils from "@Periods/PeriodsUtils";
import BudgetsByPeriodUtils from "@BudgetsByPeriod/BudgetsByPeriodUtils";
import ExpensesByBudgetApi from "@Apis/ExpensesByBudget";
import { MainContext } from "@Contexts/MainContext";
import LoadScreen from "@Components/LoadScreen";
import SnackbarMsg from "@Components/SnackbarMsg";

const ExpensesByBudget = ({ navigation, route }) => {
  const {
    PERIODS,
    SELECTED_PERIOD,
    BUDGETS_BY_PERIOD,
    EXPENSES_BY_BUDGET,
    updatePeriods,
    updateBudgetsByPeriod,
    updateExpensesByBudget,
  } = useContext(MainContext);

  const budgetByPeriodUtils = new BudgetsByPeriodUtils(
    BUDGETS_BY_PERIOD,
    updateBudgetsByPeriod
  );

  const expensesByBudgetUtils = new ExpensesByBudgetUtils(
    EXPENSES_BY_BUDGET,
    updateExpensesByBudget
  );

  const periodsUtils = new PeriodsUtils(PERIODS, updatePeriods);

  const theme = useTheme();

  const [budget] = useState(route.params?.budget);
  const [textSearch, setTextSearch] = useState("");
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [loading, setLoading] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [expensesTemp, setExpensesTemp] = useState([]);
  //snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState("SUCCESS");
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, expensesTemp.length);

  useEffect(() => {
    setExpenses(handleGetExpenseByBudget());
    setExpensesTemp(handleGetExpenseByBudget());
    setPage(0);
  }, [itemsPerPage, EXPENSES_BY_BUDGET]);

  const handleGetExpenseByBudget = () => {  
    let result = expensesByBudgetUtils.handleGetExpenseByBudget(
      EXPENSES_BY_BUDGET,
      "budgetKey",
      budget.index
    );
    return result;
  };

  const handleRealTimeSearch = (text) => {
    if (text !== "") {
      let searchResult = [...expensesTemp];
      let result = searchResult.filter((expense) =>
        expense.expenseName.toLowerCase().includes(text.toLowerCase())
      );
      setExpensesTemp(result);
    } else {
      setExpensesTemp(expenses);
    }
    setTextSearch(text);
  };

  const handleDeleteExpense = (expense) => {
    objPeriod = {
      index: SELECTED_PERIOD[0].index,
      used: parseFloat(SELECTED_PERIOD[0].used) - parseFloat(expense.amount),
    };
    periodUpdate = {
      ...SELECTED_PERIOD[0],
      used: parseFloat(SELECTED_PERIOD[0].used) - parseFloat(expense.amount),
    };
    objBudget = {
      index: budget.index,
      periodKey: budget.periodKey,
      used: parseFloat(budget.used) - parseFloat(expense.amount),
    };
    objBudgetUpdate = {
      ...budget,
      used: parseFloat(budget.used) - parseFloat(expense.amount),
    };
    objSpending = {
      index: expense.index,
    };
    setLoading(true);
    ExpensesByBudgetApi.removeExpense(objPeriod, objBudget, objSpending).then(
      (res) => {
        if (res) {
          periodsUtils.handleUpdatePeriods(periodUpdate);
          budgetByPeriodUtils.handleUpdateBudget(objBudgetUpdate);
          expensesByBudgetUtils.handleRemoveExpense(objSpending);
          
          setSnackbarType("SUCCESS");
          setSnackbarVisible(true);
        } else {
          setSnackbarType("ERROR");
          setSnackbarVisible(true);
        }
        setLoading(false);
      }
    );
  };
  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          ...MainStyleSheet.frontView,
          backgroundColor: theme.colors.background,
        }}
      >
        <TextInput
          label="Ingrese un valor para buscar"
          value={textSearch}
          style={{ width: "100%" }}
          onChangeText={(text) => handleRealTimeSearch(text)}
          mode="outlined"
        />
        <LoadScreen loading={loading} />

        <ScrollView>
          {expensesTemp.slice(from, to).map((expense) => {
            return (
              <ExpensesCard
                expense={expense}
                budget={budget}
                deleteAction={handleDeleteExpense.bind(null)}
              />
            );
          })}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(expensesTemp.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${expensesTemp.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Gastos por pagina"}
          />
        </ScrollView>
      </View>
      {snackbarVisible ? (
        <SnackbarMsg
          open={snackbarVisible}
          close={setSnackbarVisible.bind(null)}
          type={snackbarType}
        />
      ) : null}
    </View>
  );
};

export default ExpensesByBudget;
