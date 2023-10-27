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
import { utils } from "@react-native-firebase/app";

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
      strokeWidth: "2",
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
    setSelectedPeriod(SELECTED_PERIOD[0]);
    setSelectPeriods(PERIODS);
    const budgetsArray = Utilities.filterArrayByProperty(
      BUDGETS_BY_PERIOD,
      "periodKey",
      SELECTED_PERIOD[0].index
    );
    const budgetsSort = Utilities.sortArrayByIndex(budgetsArray, "index");
    setSelectBudgets(budgetsSort);
    handleLoadBudgetChart(SELECTED_PERIOD[0]);
    setSelectedBudget(budgetsSort[0]);
    handleLoadExpensesChart(budgetsSort[0]);
  }, [BUDGETS_BY_PERIOD]);

  const handleLoadBudgetChart = (period) => {
    const budgetsArray = Utilities.filterArrayByProperty(
      BUDGETS_BY_PERIOD,
      "periodKey",
      period.index
    );

    let budgetLabelsArray = [];
    let budgetValuesArray = [];

    let sum = 0.0;
    budgetValuesArray.push(0);
    budgetLabelsArray.push("");
    for (let i = 0; i < budgetsArray.length; i++) {
      console.log(budgetsArray[i].amount);
      budgetLabelsArray.push(budgetsArray[i].budgetName.substring(0, 10));
      sum = sum + budgetsArray[i].amount / 1000;
      budgetValuesArray.push(sum);
    }
    let screenW = budgetsArray.length / 4;
    setScreenWidthBudgets(screenWidth * (screenW < 1 ? 1 : screenW));

    let labelRev = budgetLabelsArray.reverse();
    let valuesRev = budgetValuesArray.reverse();

    setBudgetLabels(labelRev);
    setBudgetValues(valuesRev);
  };

  const handleLoadExpensesChart = (budget) => {
    let expensesLabelsArray = [];
    let expensesValuesArray = [];
    const expenses = Utilities.filterArrayByProperty(
      EXPENSES_BY_BUDGET,
      "budgetKey",
      budget.index
    );
    let sum = 0.0;
    const expensesSort = Utilities.sortArrayByIndex(expenses, "index");
    expensesLabelsArray.push("");
    expensesValuesArray.push(0);
    for (let i = 0; i < expensesSort.length; i++) {
      expensesLabelsArray.push(moment(expensesSort[i].index).format("DD/MM"));
      sum = sum + expensesSort[i].amount / 1000;
      expensesValuesArray.push(sum);
    }
    let screenW = expenses.length / 8;
    setScreenWidthExpenses(screenWidth * (screenW < 1 ? 1 : screenW));

    let labelRev = expensesLabelsArray.reverse();
    let valuesRev = expensesValuesArray.reverse();

    setExpensesLabels(labelRev);
    setExpensesValues(valuesRev);
  };

  const handleSelectPeriod = (period) => {
    console.log(period);
    setSelectedPeriod(period);
    const budgetsArray = Utilities.filterArrayByProperty(
      BUDGETS_BY_PERIOD,
      "periodKey",
      period.index
    );
    const budgetsSort = Utilities.sortArrayByIndex(budgetsArray, "index");
    setSelectBudgets(budgetsSort);
    handleLoadBudgetChart(period);
    handleLoadBudgetChart(period);
    setSelectedBudget(budgetsSort[0]);
  };

  const handleSelectBudget = (budget) => {
    handleLoadExpensesChart(budget);
    setSelectedBudget(budget);
  };

  const handleOpenSelectBudget = () => {
    setOpenBudgets(true);
  };

  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView>
        <View
          style={{
            ...MainStyleSheet.frontView,
            backgroundColor: theme.colors.background,
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
            <ScrollView horizontal={true}>
              <ScrollView horizontal={true}>
                <LineChart
                  data={{
                    labels: budgetLabels,
                    datasets: [
                      {
                        data: budgetValues,

                        //withDots: false, //pone los puntos
                        legend: ["Rainy Days"], // optional
                      },
                    ],
                  }}
                  width={screenWidthBudgets} // from react-native
                  height={250}
                  //yAxisLabel="$"
                  //yAxisSuffix="k"
                  formatYLabel={(yValue) => {
                    return (
                      Utilities.getLocaleCurrency(yValue, "es-CR", "CRC") + "k"
                    );
                  }}
                  fromNumber={selectedPeriod.amount / 1000}
                  yAxisInterval={1} // optional, defaults to 1
                  fromZero={true}
                  onDataPointClick={({
                    index,
                    value,
                    dataset,
                    getColor,
                    x,
                    y,
                  }) => {
                    console.log(
                      parseInt(selectBudgets.length) > parseInt(index)
                    );
                    console.log(selectBudgets.length);
                    console.log(index);

                    if (parseInt(selectBudgets.length) > parseInt(index)) {
                      handleSelectBudget(selectBudgets[index]);
                    } else {
                      console.log("este indice no esta " + index);
                    }
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
              </ScrollView>
              {/** <BarChart
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
                fromNumber={selectedPeriod.amount / 1000}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 7,
                }}
              />*/}
            </ScrollView>
          ) : null}

          <Text
            style={{ color: theme.colors.onBackground, margin: "3%" }}
            variant="titleMedium"
          >
            {selectedBudget !== null ? selectedBudget.budgetName : ""}
          </Text>
          {expensesValues.length !== 0 ? (
            <ScrollView horizontal={true}>
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
                height={250}
                //yAxisLabel="$"
                //yAxisSuffix="k"
                formatYLabel={(yValue) => {
                  return (
                    Utilities.getLocaleCurrency(yValue, "es-CR", "CRC") + "k"
                  );
                }}
                fromNumber={selectedBudget.amount / 1000}
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
            </ScrollView>
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
  );
};

export default Summary;
