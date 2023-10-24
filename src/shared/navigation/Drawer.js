import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import PeriodsHome from "@Periods/Periods";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

function DrawerNav() {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="Mis Finanzas"
        component={PeriodsHome}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerLeftContainerStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
