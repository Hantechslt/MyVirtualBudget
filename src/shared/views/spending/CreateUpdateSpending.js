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

import SpendingByBudget from "@Apis/SpendingByBudget";

const CreateUpdateSpending = ({ navigation, route }) => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);
  const [isEdit, setIsEdit] = useState(false);

  const [budget] = useState(route.params?.budget);
  const [spending] = useState(route.params?.spending);

  const [originalValue, setOriginalValue] = useState("");
  const [value, setValue] = useState("");
  const [spendingName, setSpendingName] = useState("");

  useEffect(() => {
    if (spending !== null) {
      console.log(spending);
      setIsEdit(true);
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

  const handleCreateUpdateSpending = (isCreate) => {
    objBudget = {
      periodKey: budget.periodKey,
      index: budget.index,
    };
    objSpending = {
      spendingName: spendingName,
      amount: parseFloat(originalValue),
      budgetKey: budget.index,
      state: true,
    };
    if (isCreate) {
      SpendingByBudget.createSpending(
        objBudget,
        objSpending,
        mainVariables
      ).then((res) => {
        if (res) console.log("Agregado");
      });
    } else {
      objBudgetByPeriod["index"] = budgetByPeriod.index;
      SpendingByBudget.updateSpending(
        objBudget,
        objSpending,
        mainVariables
      ).then((res) => {
        if (res) console.log("Editado");
      });
    }
  };
  const handleDeleteSpending = () => {
    objBudgetByPeriod = {
      index: budgetByPeriod.index,
      periodKey: period.index,
    };
    SpendingByBudget.removeSpending(objBudgetByPeriod, mainVariables).then(
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
      <ScrollView>
        <View
          style={{
            ...MainStyleSheet.frontView,
            backgroundColor: theme.colors.background,
          }}
        >
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
              value={spendingName}
              onChangeText={(text) => setSpendingName(text)}
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
            {isEdit ? (
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name="delete"
                    onPress={() => handleDeleteSpending()}
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
                handleCreateUpdateSpending(false);
              }}
            >
              Editar gasto
            </Button>
          ) : (
            <Button
              mode="contained-tonal"
              style={MainStyleSheet.primaryButton}
              onPress={() => {
                handleCreateUpdateSpending(true);
              }}
            >
              Agregar gasto
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateUpdateSpending;
