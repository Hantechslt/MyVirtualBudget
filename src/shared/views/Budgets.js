import React, { useState, useEffect } from "react";

import { BackHandler } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainContext from "@Context/Main";
import { TextInput, Button, Text, useTheme } from "react-native-paper";

import { View } from "react-native";

//APIS
import BudgetsApi from "@Apis/Budgets";

const Budgets = ({ navigation }) => {
  const theme = useTheme();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    BudgetsApi.getBudgetsList().then((res) => {
      setBudgets(res);
      console.log(res);
    });
  }, []);

  return (
    <View
      padding={2}
      style={{
        backgroundColor: theme.colors.background,
        height: "100%",
      }}
    >
      <View padding={2}>
        <Text>{"Estamos de vuelva muchachos"}</Text>
      </View>
    </View>
  );
};

export default Budgets;
