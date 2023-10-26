import React, { useState, useEffect, useContext } from "react";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  useTheme,
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
  List,
  Tooltip,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MainContext } from "@Contexts/MainContext";
import moment from "moment";

import { View, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
import Config from "@Config/Config";
import Utilities from "@Utilities/Utilities";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectModal from "@Components/SelectModal";
import ExpensesByBudgetUtils from "@ExpensesByBudget/ExpensesByBudgetUtils";
import BudgetsByPeriodUtils from "@BudgetsByPeriod/BudgetsByPeriodUtils";

const Summary = ({ navigation }) => {
  const theme = useTheme();

  const {
    PERIODS,
    SELECTED_PERIOD,
    BUDGETS_BY_PERIOD,
    EXPENSES_BY_BUDGET,
    updateExpensesByBudget,
    updateBudgetsByPeriod,
  } = useContext(MainContext);

  const expensesByBudgetUtils = new ExpensesByBudgetUtils(
    EXPENSES_BY_BUDGET,
    updateExpensesByBudget
  );
  const budgetsByPeriodUtils = new BudgetsByPeriodUtils(
    BUDGETS_BY_PERIOD,
    updateBudgetsByPeriod
  );

  const chartConfig = {
    backgroundColor: theme.colors.primary,
    backgroundGradientFrom: theme.colors.secondaryContainer,
    backgroundGradientTo: theme.colors.secondaryContainer,
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 17,
    },
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: theme.colors.onPrimaryContainer,
    },
  };

  const screenWidth = Dimensions.get("window").width;

  const [screenWidthExpenses, setScreenWidthExpenses] = useState(screenWidth);
  const [screenWidthBudgets, setScreenWidthBudgets] = useState(screenWidth);

  const [budgetLabels, setBudgetLabels] = useState([]);
  const [budgetValues, setBudgetValues] = useState([]);

  const [expensesLabels, setExpensesLabels] = useState([]);
  const [expensesValues, setExpensesValues] = useState([]);

  const [selectBudgets, setSelectBudgets] = useState([]);
  const [selectPeriods, setSelectPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const [openBudgets, setOpenBudgets] = useState(false);
  const [openPeriods, setOpenPeriods] = useState(false);

  useEffect(() => {
    //Alimentar los select
    setSelectedPeriod(SELECTED_PERIOD);
    setSelectPeriods(PERIODS);
    setSelectBudgets(BUDGETS_BY_PERIOD);
    const budgetsArray = budgetsByPeriodUtils.handleGetBudgetByPeriod(
      BUDGETS_BY_PERIOD,
      "periodKey",
      SELECTED_PERIOD.index
    );
    budgetsArray.forEach((budget) => {
      budget["label"] = budget.budgetName;
      budget["description"] = Utilities.getLocaleCurrency(
        budget.amount,
        "es-CR",
        "CRC"
      );
    });
    handleLoadBudgetChart(SELECTED_PERIOD);
    setSelectedBudget(budgetsArray[0]);
    handleLoadExpensesChart(budgetsArray[0]);
  }, []);

  const handleLoadBudgetChart = (period) => {
    const budgetsArray = budgetsByPeriodUtils.handleGetBudgetByPeriod(
      BUDGETS_BY_PERIOD,
      "periodKey",
      period.index
    );

    let budgetLabelsArray = [];
    let budgetValuesArray = [];

    budgetsArray.forEach((budget) => {
      budgetLabelsArray.push(budget.budgetName);
      budgetValuesArray.push((budget.amount / 1000).toFixed(1));
    });
    let screenW = budgetsArray.length / 4;
    if (screenWidthBudgets > screenWidthExpenses) {
      setScreenWidthExpenses(screenWidthBudgets);
    }
    setScreenWidthBudgets(screenWidth * (screenW < 1 ? 1 : screenW));
    setBudgetLabels(budgetLabelsArray);
    setBudgetValues(budgetValuesArray);
  };

  const handleLoadExpensesChart = (budget) => {
    let expensesLabelsArray = [];
    let expensesValuesArray = [];
    let expenses = expensesByBudgetUtils.handleGetExpenseByBudget(
      EXPENSES_BY_BUDGET,
      "budgetKey",
      budget.index
    );

    expenses.forEach((expense) => {
      expensesLabelsArray.push(moment(expense.index).format("DD"));
      expensesValuesArray.push((expense.amount / 1000).toFixed(1));
    });

    let screenW = expenses.length / 8;
    setScreenWidthExpenses(screenWidth * (screenW < 1 ? 1 : screenW));
    if (screenWidthBudgets > screenWidthExpenses) {
      setScreenWidthExpenses(screenWidthBudgets);
    }
    
    setExpensesLabels(expensesLabelsArray);
    setExpensesValues(expensesValuesArray);
  };

  const handleSelectPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handleSelectBudget = (budget) => {
    handleLoadExpensesChart(budget);
    setSelectedBudget(budget);
  };

  const handleOpenSelectBudget = () => {
    setOpenBudgets(true);
  };

  return (
    <ScrollView horizontal={true}>
      <View
        style={{
          ...MainStyleSheet.backView,
          backgroundColor: theme.colors.background,
          width: screenWidthExpenses,
        }}
      >
        <ScrollView>
          <View
            style={{
              ...MainStyleSheet.frontView,
              backgroundColor: theme.colors.background,
              width: screenWidthExpenses,
            }}
          >
            <IconButton
              mode="outlined"
              icon={() => (
                <Ionicons
                  name="wallet"
                  size={Config.ICON_SIZE}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
              onPress={() => setOpenPeriods(true)}
            />
            <Text
              style={{ color: theme.colors.onBackground }}
              variant="titleMedium"
            >
              {selectPeriods !== null
                ? Utilities.getFormatPeriodDate(
                    selectPeriods.startData,
                    selectPeriods.endDate
                  )
                : ""}
            </Text>
            {budgetValues.length !== 0 ? (
              <BarChart
                //style={graphStyle}
                data={{
                  labels: budgetLabels,
                  datasets: [
                    {
                      data: budgetValues,

                      //withDots: false, //pone los puntos
                    },
                  ],
                }}
                showBarTops={false}
                width={screenWidthBudgets}
                height={220}
                yAxisSuffix="k"
                chartConfig={chartConfig}
                showValuesOnTopOfBars={true}
                fromZero={true}
                formatYLabel={(yValue) => {
                  return (
                    Utilities.getLocaleCurrency(yValue, "es-CR", "CRC") + "k"
                  );
                }}
                withInnerLines={false}
                fromNumber={SELECTED_PERIOD.amount / 1000}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 7,
                }}
              />
            ) : null}

            <IconButton
              mode="outlined"
              icon={() => (
                <MaterialCommunityIcons
                  name={Config.BUDGET_ICON}
                  size={Config.ICON_SIZE}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
              onPress={() => handleOpenSelectBudget()}
            />
            <Text
              style={{ color: theme.colors.onBackground }}
              variant="titleMedium"
            >
              {selectedBudget !== null ? selectedBudget.budgetName : ""}
            </Text>
            {expensesValues.length !== 0 ? (
              <LineChart
                data={{
                  labels: expensesLabels,
                  datasets: [
                    {
                      data: expensesValues,

                      //withDots: false, //pone los puntos
                      legend: ["Rainy Days"], // optional
                    },
                  ],
                }}
                width={screenWidthExpenses} // from react-native
                height={220}
                //yAxisLabel="$"
                //yAxisSuffix="k"
                formatYLabel={(yValue) => {
                  return (
                    Utilities.getLocaleCurrency(yValue, "es-CR", "CRC") + "k"
                  );
                }}
                fromNumber={BUDGETS_BY_PERIOD[2].amount / 1000}
                yAxisInterval={1} // optional, defaults to 1
                fromZero={true}
                yla
                onDataPointClick={({
                  index,
                  value,
                  dataset,
                  getColor,
                  x,
                  y,
                }) => {
                  alert(`Valor: ${dataset.data}`);
                }}
                renderDotContent={({ x, y, index, indexData }) => {
                  return (
                    <View
                      key={index}
                      style={{
                        position: "absolute",
                        top: y - 30,
                        left: x - 15,
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>
                        {Utilities.getLocaleCurrency(
                          indexData,
                          "es-CR",
                          "CRC"
                        ) + "k "}
                      </Text>
                    </View>
                  );
                }}
                chartConfig={chartConfig}
                withInnerLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                yLabelsOffset={18}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 7,
                }}
              />
            ) : null}
          </View>
        </ScrollView>
        {selectPeriods.length !== 0 ? (
          <SelectModal
            open={openPeriods}
            close={setOpenPeriods.bind(null)}
            items={selectPeriods}
            setValue={handleSelectPeriod.bind(null)}
            title={"Seleccione un periodo"}
          />
        ) : null}
        {selectBudgets.length !== 0 ? (
          <SelectModal
            open={openBudgets}
            close={setOpenBudgets.bind(null)}
            items={selectBudgets}
            setValue={handleSelectBudget.bind(null)}
            title={"Seleccione un presupuesto"}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Summary;
