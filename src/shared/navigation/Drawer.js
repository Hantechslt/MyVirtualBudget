import React, { useEffect, useState } from "react";
import {
  useTheme,
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
  List,
} from "react-native-paper";

import PeriodsHome from "@Periods/Periods";
import { View } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer";
import Config from "@Config/Config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DrawerItemCostume from "@Components/DrawerItemCostume";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Drawer = createDrawerNavigator();

function DrawerNav() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  const [options, setOptions] = useState([
    {
      label: "Presupuestos",
      navigate: "Finances",
      iconName: Config.BUDGET_ICON,
    },
    { label: "Consultas", navigate: "", iconName: "chart-bar-stacked" },
    {
      label: "Notas",
      navigate: "Notes",
      iconName: "notebook-outline",
    },
    {
      label: "Consejos financieros",
      navigate: "Notes",
      iconName: "lightbulb-on-outline",
    },
  ]);

  const [queryOptions, setQueryOptions] = useState([
    {
      label: "Gastos",
      navigate: "",
      iconName: Config.ADD_EXPENSE_ICON,
      isFontAwesome: true,
      iconSize: 16,
    },
  ]);

  const [settingOptions, setSettingOptions] = useState([
    {
      label: "Temas",
      navigate: "",
      iconName: "theme-light-dark",
    },
    {
      label: "Monedas",
      navigate: "",
      iconName: "hand-coin-outline",
    },
  ]);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
            margin: "3%",
          }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            variant="headlineLarge"
          >
            MyBudget
          </Text>
        </View>
        <Divider />
        <List.Accordion
          title="Mis finanzas"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => (
                <MaterialCommunityIcons
                  name="finance"
                  onPress={() => navigation.goBack()}
                  size={20}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
            />
          )}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          {options.map((option) => {
            return <DrawerItemCostume {...props} option={option} />;
          })}
        </List.Accordion>
        <List.Accordion
          title="Consultas"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => (
                <MaterialCommunityIcons
                  name="text-box-search"
                  onPress={() => navigation.goBack()}
                  size={20}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
            />
          )}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          {queryOptions.map((option) => {
            return <DrawerItemCostume {...props} option={option} />;
          })}
        </List.Accordion>
        <List.Accordion
          title="Ajustes"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => (
                <MaterialCommunityIcons
                  name="account-wrench"
                  onPress={() => navigation.goBack()}
                  size={20}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
            />
          )}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          {settingOptions.map((option) => {
            return <DrawerItemCostume {...props} option={option} />;
          })}
        </List.Accordion>
      </DrawerContentScrollView>
    );
  }

  function feed() {
    return (
      <View style={MainStyleSheet.viewRow}>
        <View style={MainStyleSheet.viewInputCode}>
          <TextInput
            label="Código"
            mode="outlined"
            keyboardType="phone-pad"
            editable={false}
          />
        </View>
        <View style={MainStyleSheet.viewInputPhone}>
          <TextInput
            label="Número de teléfono"
            mode="outlined"
            keyboardType="phone-pad"
          />
        </View>
      </View>
    );
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props}></CustomDrawerContent>
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: "75%",
        },
        drawerActiveBackgroundColor: theme.colors.secondaryContainer,
        drawerActiveTintColor: "#ffffff",
        drawerInactiveTintColor: theme.colors.primary,
      }}
    >
      <Drawer.Screen
        name="Finances"
        component={PeriodsHome}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerLeftContainerStyle: {
            backgroundColor: theme.colors.background,
          },
          title: "Mis Finanzas",
        }}
      />
      <Drawer.Screen
        name="Notes"
        component={feed}
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
