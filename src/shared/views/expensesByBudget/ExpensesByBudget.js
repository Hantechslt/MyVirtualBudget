import React, { useState, useEffect, useContext } from "react";
import { DataTable, TextInput, Text, useTheme } from "react-native-paper";
import { View, ScrollView } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
import ExpensesCard from "@Components/ExpensesCard";
import ExpensesByBudgetUtils from "./ExpensesByBudgetUtils";
import { MainContext } from "@Contexts/MainContext";

const ExpensesByBudget = ({ navigation, route }) => {
  const { EXPENSES_BY_BUDGET, updateExpensesByBudget } =
    useContext(MainContext);

  const expensesByBudgetUtils = new ExpensesByBudgetUtils(
    EXPENSES_BY_BUDGET,
    updateExpensesByBudget
  );

  const theme = useTheme();

  const [budget] = useState(route.params?.budget);
  const [textSearch, setTextSearch] = useState("");
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [expenses, setExpenses] = useState([]);
  const [expensesTemp, setExpensesTemp] = useState([]);


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, expensesTemp.length);

  useEffect(() => {
    let expenses = expensesByBudgetUtils.handleGetExpenseByBudget(
      EXPENSES_BY_BUDGET,
      "budgetKey",
      budget.index
    );
    setExpenses(expenses);
    setExpensesTemp(expenses);

    setPage(0);
  }, [itemsPerPage]);
  
const handleRealTimeSearch =(text)=>{
  if(text !==""){
    let searchResult = [...expensesTemp];
    let result = searchResult.filter((expense) =>
      expense.expenseName.toLowerCase().includes(text.toLowerCase())
    );
    console.log(result);
    setExpensesTemp(result);
  }
  else{
    setExpensesTemp(expenses)
  }
 setTextSearch(text);
}

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
        <ScrollView>
          {expensesTemp.slice(from, to).map((expense) => {
            return <ExpensesCard expense={expense} />;
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
    </View>
  );
};

export default ExpensesByBudget;
