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
import { MainContext, mainVariables } from "@Contexts/MainContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BudgetsByPeriod from "@Apis/BudgetsByPeriod";

const CreateUpdateBudget = ({ navigation, route }) => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);
  const [isEdit, setIsEdit] = useState(false);

  const [period] = useState(route.params?.period);
  const [budgetByPeriod] = useState(route.params?.budget);

  const [formatDate, setFormatDate] = useState("");

  const [originalValue, setOriginalValue] = useState("");
  const [value, setValue] = useState("");
  const [budgetName, setBudgetName] = useState("");

  useEffect(() => {
    console.log(period);
    if (budgetByPeriod !== null) {
      console.log(budgetByPeriod);
      setIsEdit(true);
    }
    setFormatDate(
      Utilities.getFormatPeriodDate(period.startDate, period.endDate)
    );
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

  const handleCreateUpdateBudget = (isCreate) => {
    objBudgetByPeriod = {
      amount: parseFloat(originalValue),
      periodKey: period.index,
      state: true,
      budgetName: budgetName,
    };
    if (isCreate) {
      objBudgetByPeriod["used"] = 0;
      BudgetsByPeriod.createBudget(objBudgetByPeriod, mainVariables).then(
        (res) => {
          if (res) console.log("Agregado");
        }
      );
    } else {
      objBudgetByPeriod["used"] = budgetByPeriod.used;
      objBudgetByPeriod["index"] = budgetByPeriod.index;
      BudgetsByPeriod.updateBudget(objBudgetByPeriod, mainVariables).then(
        (res) => {
          if (res) console.log("Editado");
        }
      );
    }
  };
  const handleDeleteBudget = () => {
    objBudgetByPeriod = {
      index: budgetByPeriod.index,
      periodKey: period.index,
    };
    BudgetsByPeriod.removeBudget(objBudgetByPeriod, mainVariables).then(
      (res) => {
        if (res) {
          console.log("se elimino");
          setIsEdit(false);
          initVariables();
        }
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
                <MaterialCommunityIcons
                  name="folder-table"
                  size={mainVariables.ICONZISE}
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
      </View>
    </View>
  );
};

export default CreateUpdateBudget;
