//React
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNav from "@Nav/Drawer";
import { useTheme } from "react-native-paper";
import auth from "@react-native-firebase/auth";

//views
import VerifyPhone from "@PhoneAuth/VerifyPhone";
import VerifyOtp from "@PhoneAuth/VerifyOtp";
import CreateUpdatePeriod from "@BudgetByPeriod/CreateUpdatePeriod";

import UserStack from "@Stacks/UserStack";
import AuthStack from "@Stacks/AuthStack";
const Stack = createStackNavigator();

/**
 *
 * @returns Verificar si el usuario esta autenticado, si esta autenticado entonces lo lleva a la pantalla de inicio si no a la de autenticación.
 */
const MainStack = () => {
  const theme = useTheme();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    //Escuha si el estado de la autenticación cambia.
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Screen
          name="UserStack"
          component={UserStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
export default MainStack;
