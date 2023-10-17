import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

function DrawerNav() {
  const theme = useTheme();

  // Componente Feed
  function Feed() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text>Feed Screen</Text>
      </View>
    );
  }

  // Componente Article
  function Article({ navigation }) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text>Article Screen</Text>
      </View>
    );
  }

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
        name="Presupuestos"
        component={Feed}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerLeftContainerStyle: {
            backgroundColor: theme.colors.background,
          },
          drawerLabel: "Hola",
        }}
      />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
