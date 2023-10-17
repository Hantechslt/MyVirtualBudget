//React
import React, { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerNav from "@Nav/Drawer";
import { useTheme } from "react-native-paper";
import MyBudgetApp from "@Apis/MyBudgetApp";
//views
//import Budgets from "@Views/Budgets";
import Phone from "@PhoneAuth/Phone";
import Otp from "@PhoneAuth/Otp";
const Stack = createStackNavigator();

const MainStack = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    MyBudgetApp.getMyAppInfo().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Phone"
        component={Phone}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DrawerNav"
        component={DrawerNav}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
