import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import {
  useTheme,
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
} from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
import Utilities from "@Utilities/Utilities";
import { MainContext } from "@Contexts/MainContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Config from "@Config/Config";
import ExpensesByBudget from "@Apis/ExpensesByBudget";
import ExpensesByBudgetUtils from "@ExpensesByBudget/ExpensesByBudgetUtils";
import BudgetByPeriodUtils from "@BudgetsByPeriod/BudgetsByPeriodUtils";
import PeriodsUtils from "@Periods/PeriodsUtils";
import SnackbarMsg from "@Components/SnackbarMsg";
import LoadScreen from "@Components/LoadScreen";
const CreateUpdateExpense = ({ navigation, route }) => {
  const {
    PERIODS,
    SELECTED_PERIOD,
    BUDGETS_BY_PERIOD,
    EXPENSES_BY_BUDGET,
    updatePeriods,
    updateBudgetsByPeriod,
    updateExpensesByBudget,
  } = useContext(MainContext);

  const budgetByPeriodUtils = new BudgetByPeriodUtils(
    BUDGETS_BY_PERIOD,
    updateBudgetsByPeriod
  );

  const expensesByBudgetUtils = new ExpensesByBudgetUtils(
    EXPENSES_BY_BUDGET,
    updateExpensesByBudget
  );

  const periodsUtils = new PeriodsUtils(PERIODS, updatePeriods);

  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  const [budget, setBudget] = useState(route.params?.budget);
  const [expense] = useState(route.params?.expense);

  const [originalValue, setOriginalValue] = useState("");
  const [value, setValue] = useState("");
  const [expenseName, setExpenseName] = useState("");

  const [loading, setLoading] = useState(false);

  //snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState("SUCCESS");

  useEffect(() => {
    if (expense !== null) {
      setIsEdit(true);
      setExpenseName(expense.expenseName);
      setValue(String(expense.amount));
      setOriginalValue(String(expense.amount));
    }
    
  }, []);

  const handleBlur = () => {
    const numberFormat = new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    });
    const formattedValue = numberFormat.format(value);
    setValue(formattedValue);
  };

  const handleFocus = () => {
    setValue(originalValue);
  };

  const handleChange = (text) => {
    let onlyNumAndDot = text.replace(/[^0-9.]/g, "");
    if (onlyNumAndDot.split(".").length > 2) {
      onlyNumAndDot = onlyNumAndDot.replace(/\.+$/, "");
    }
    const onlyTwoDecimals = onlyNumAndDot.replace(/(\.\d\d).*/g, "$1");
    setValue(onlyTwoDecimals);
    setOriginalValue(onlyTwoDecimals);
  };

  const handleCreateUpdateExpense = (isCreate) => {
    let objPeriod = {
      index: SELECTED_PERIOD[0].index,
    };
    let objBudget = {
      periodKey: budget.periodKey,
      index: budget.index,
    };
    let objExpense = {
      expenseName: expenseName,
      amount: parseFloat(originalValue),
      budgetKey: budget.index,
      state: true,
    };
    if (isCreate) {
      objPeriod["used"] =
        parseFloat(SELECTED_PERIOD[0].used) + parseFloat(originalValue);

      SELECTED_PERIOD[0]["used"] =
        parseFloat(SELECTED_PERIOD[0].used) + parseFloat(originalValue);

      const budgetResult = parseFloat(budget.used) + parseFloat(originalValue);
      objBudget["used"] = budgetResult;

      let budgetUpdate = {
        ...budget,
        used: budgetResult,
      };
      setBudget(budgetUpdate);
      objExpense["index"] = Utilities.getTimeStamp();
      setLoading(true);

      ExpensesByBudget.createUpdateExpense(
        objPeriod,
        objBudget,
        objExpense
      ).then((res) => {
        if (res) {
          setSnackbarType("SUCCESS");
          setSnackbarVisible(true);
          expensesByBudgetUtils.handleCreateExpense(objExpense);
          budgetByPeriodUtils.handleUpdateBudget(budgetUpdate);
          periodsUtils.handleUpdatePeriods(SELECTED_PERIOD[0]);
        } else {
          setSnackbarType("ERROR");
          setSnackbarVisible(true);
        }
        setLoading(false);
      });
    } else {
      let periodResult = 0.0;
      let budgetResult = 0.0;

      if (parseFloat(originalValue) >= parseFloat(expense.amount)) {
        periodResult =
          parseFloat(SELECTED_PERIOD[0].used) +
          (parseFloat(originalValue) - parseFloat(expense.amount));
        budgetResult =
          budget.used +
          (parseFloat(originalValue) - parseFloat(expense.amount));
      } else {
        periodResult =
          parseFloat(SELECTED_PERIOD[0].used) -
          (parseFloat(expense.amount) - parseFloat(originalValue));
        budgetResult =
          parseFloat(budget.used) -
          (parseFloat(expense.amount) - parseFloat(originalValue));
      }
      objPeriod["used"] = periodResult;
      objBudget["used"] = budgetResult;
      objExpense["index"] = expense.index;

      let budgetUpdate = {
        ...budget,
        used: budgetResult,
      };
      setBudget(budgetUpdate);
      setLoading(true);

      ExpensesByBudget.createUpdateExpense(
        objPeriod,
        objBudget,
        objExpense
      ).then((res) => {
        if (res) {
          setSnackbarType("SUCCESS");
          setSnackbarVisible(true);
          expensesByBudgetUtils.handleUpdateExpense(objExpense);
          budgetByPeriodUtils.handleUpdateBudget(budgetUpdate);
          periodsUtils.handleUpdatePeriods(SELECTED_PERIOD[0]);
        } else {
          setSnackbarType("ERROR");
          setSnackbarVisible(true);
        }
        setLoading(false);
      });
    }
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
        <LoadScreen loading={loading} />
        <ScrollView>
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="keyboard-backspace"
                onPress={() => navigation.goBack()}
                size={30}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {}}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Avatar.Icon
              icon={() => (
                <FontAwesome5
                  name="money-check-alt"
                  size={Config.ICON_SIZE}
                  style={{
                    color: theme.colors.shadow,
                  }}
                />
              )}
            />
            <Text
              style={{ color: theme.colors.onBackground }}
              variant="headlineMedium"
            >
              Gasto
            </Text>
            <Text
              style={{ color: theme.colors.onBackground }}
              variant="bodySmall"
            >
              Se definen para identificar un egreso de dinero de un presupuesto
              definido
            </Text>
          </View>
          <Divider
            style={{
              marginVertical: "3%",
            }}
          />
          <View style={{ ...MainStyleSheet.viewRow }}>
            <TextInput
              label="Presuesto"
              style={{ width: "85%" }}
              mode="outlined"
              value={budget.budgetName}
              editable={false}
            />
          </View>
          <View style={{ ...MainStyleSheet.viewRow, marginVertical: "2%" }}>
            <TextInput
              label="Nombre del gasto"
              style={{ width: "85%" }}
              mode="outlined"
              value={expenseName}
              onChangeText={(text) => setExpenseName(text)}
            />
          </View>
          <View style={{ ...MainStyleSheet.viewRow }}>
            <TextInput
              label="Monto del gasto"
              style={{ width: "85%" }}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={value}
            />
          </View>
          {isEdit ? (
            <Button
              mode="contained-tonal"
              style={MainStyleSheet.primaryButton}
              onPress={() => {
                handleCreateUpdateExpense(false);
              }}
            >
              Editar gasto
            </Button>
          ) : (
            <Button
              mode="contained-tonal"
              style={MainStyleSheet.primaryButton}
              onPress={() => {
                handleCreateUpdateExpense(true);
              }}
            >
              Agregar gasto
            </Button>
          )}
        </ScrollView>
        {snackbarVisible ? (
          <SnackbarMsg
            open={snackbarVisible}
            close={setSnackbarVisible.bind(null)}
            type={snackbarType}
          />
        ) : null}
      </View>
    </View>
  );
};

export default CreateUpdateExpense;
