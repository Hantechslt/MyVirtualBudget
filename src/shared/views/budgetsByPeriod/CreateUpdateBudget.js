import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Animated } from "react-native";
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
import BudgetsByPeriod from "@Apis/BudgetsByPeriod";
import BudgetByPeriodUtils from "@BudgetsByPeriod/BudgetsByPeriodUtils";
import Config from "@Config/Config";
import LoadScreen from "@Components/LoadScreen";
import SnackbarMsg from "@Components/SnackbarMsg";
const CreateUpdateBudget = ({ navigation, route }) => {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  const [period] = useState(route.params?.period);
  const [budget] = useState(route.params?.budget);

  const [formatDate, setFormatDate] = useState("");

  const [originalValue, setOriginalValue] = useState("");
  const [value, setValue] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [loading, setLoading] = useState(false);

  //snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState("SUCCESS");

  const { updateSelectedPeriod, BUDGETS_BY_PERIOD, updateBudgetsByPeriod } =
    useContext(MainContext);

  const budgetByPeriodUtils = new BudgetByPeriodUtils(
    BUDGETS_BY_PERIOD,
    updateBudgetsByPeriod
  );

  useEffect(() => {
    if (budget !== null) {
      setIsEdit(true);
    }
    setFormatDate(
      Utilities.getFormatPeriodDate(period.startDate, period.endDate)
    );
  }, []);

  const initVariables = () => {
    setBudgetName("");
    setValue("");
    setOriginalValue("");
  };

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

  const handleCreateUpdateBudget = (isCreate) => {
    objBudget = {
      amount: parseFloat(originalValue),
      periodKey: period.index,
      state: true,
      budgetName: budgetName,
      isShared: false,
    };
    if (isCreate) {
      objBudget["used"] = 0;
      objBudget["index"] = Utilities.getTimeStamp();
      setLoading(true);
      BudgetsByPeriod.createUpdateBudget(objBudget).then((res) => {
        if (res) {
          updateSelectedPeriod(period);

          budgetByPeriodUtils.handleCreateBudget(objBudget);
          setSnackbarType("SUCCESS");
          setSnackbarVisible(true);
          initVariables();
        } else {
          setSnackbarType("ERROR");
          setSnackbarVisible(true);
        }
        setLoading(false);
      });
    } else {
      objBudget["used"] = budgetByPeriod.used;
      objBudget["index"] = budgetByPeriod.index;
      setLoading(true);
      BudgetsByPeriod.createUpdateBudget(objBudget).then((res) => {
        if (res) {
          updateSelectedPeriod(period);
          budgetByPeriodUtils.handleUpdateBudget(objBudget);
          setSnackbarType("SUCCESS");
          setSnackbarVisible(true);
        } else {
          setSnackbarType("ERROR");
          setSnackbarVisible(true);
        }
        setLoading(false);
      });
    }
  };
  const handleDeleteBudget = () => {
    setLoading(true);
    BudgetsByPeriod.removeBudget(objBudget).then((res) => {
      if (res) {
        budgetByPeriodUtils.handleRemoveBudget(objBudget);
        setSnackbarType("SUCCESS");
        setSnackbarVisible(true);
        setIsEdit(false);
        initVariables();
      } else {
        setSnackbarType("ERROR");
        setSnackbarVisible(true);
      }
      setLoading(false);
    });
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
        <ScrollView>
          <LoadScreen loading={loading} />
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
                <MaterialCommunityIcons
                  name="folder-table"
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
              Presupuesto
            </Text>
            <Text
              style={{ color: theme.colors.onBackground }}
              variant="bodySmall"
            >
              Se definen para agrupar los gastos de un tipo de presupuesto
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
              label="Periodo"
              style={{ width: "85%" }}
              mode="outlined"
              value={formatDate}
              editable={false}
            />
          </View>
          <View style={{ ...MainStyleSheet.viewRow, marginVertical: "2%" }}>
            <TextInput
              label="Nombre del presupuesto"
              style={{ width: "85%" }}
              mode="outlined"
              value={budgetName}
              onChangeText={(text) => setBudgetName(text)}
            />
          </View>
          <View style={{ ...MainStyleSheet.viewRow }}>
            <TextInput
              label="Monto del presupuesto"
              style={{ width: "85%" }}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={value}
            />
            {isEdit ? (
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name="delete"
                    onPress={() => handleDeleteBudget()}
                    size={30}
                    style={{
                      color: theme.colors.darkRed,
                    }}
                  />
                )}
                onPress={() => {}}
              />
            ) : null}
          </View>
          {isEdit ? (
            <Button
              mode="contained-tonal"
              style={MainStyleSheet.primaryButton}
              onPress={() => {
                handleCreateUpdateBudget(false);
              }}
            >
              Editar presupuesto
            </Button>
          ) : (
            <Button
              mode="contained-tonal"
              style={MainStyleSheet.primaryButton}
              onPress={() => {
                handleCreateUpdateBudget(true);
              }}
            >
              Agregar presupuesto
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

export default CreateUpdateBudget;
