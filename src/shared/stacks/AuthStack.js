//React
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import VerifyPhone from "@PhoneAuth/VerifyPhone";
import VerifyOtp from "@PhoneAuth/VerifyOtp";

const Stack = createStackNavigator();

const UserStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default UserStack;
