import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import MyBudgetApp from "@Apis/MyBudgetApp";
import Utilities from "@Utilities/Utilities";
import auth from "@react-native-firebase/auth";
import Budgets from "@Budgets/Budgets";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

function DrawerNav() {
  const theme = useTheme();

  // Componente Feed
  function Feed() {
    useEffect(() => {
      //console.log(Utilities.getTimeStamp());
      //console.log(auth().currentUser.uid);
      /*MyBudgetApp.getMyAppInfo().then((res) => {
        console.log(res);
      });*/
    }, []);

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
        name="Mis Finanzas"
        component={Budgets}
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
    </Drawer.Navigator>
  );
}

export default DrawerNav;
