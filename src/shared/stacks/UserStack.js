//React
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNav from "@Nav/Drawer";
import { useTheme } from "react-native-paper";
import CreateUpdatePeriod from "@BudgetByPeriod/CreateUpdatePeriod";
import CreateUpdateBudget from "@Budgets/CreateUpdateBudget";
import CreateUpdateSpending from "@SpendingByBudget/CreateUpdateSpending";
const Stack = createStackNavigator();

const UserStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNav"
        component={DrawerNav}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateUpdatePeriod"
        component={CreateUpdatePeriod}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateUpdateBudget"
        component={CreateUpdateBudget}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateUpdateSpending"
        component={CreateUpdateSpending}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default UserStack;
