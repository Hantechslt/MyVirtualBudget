import React, { useEffect, useState, useContext } from "react";
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
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer";
import Config from "@Config/Config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import DrawerItemCostume from "@Components/DrawerItemCostume";
import { MainContext } from "@Contexts/MainContext";
import CustomTheme from "@Themes/CustomTheme";
import MainStyleSheet from "@Styles/MainStyleSheet";
import Summary from "@Summary/Summary";
import Notes from "@Notes/Notes";
import FinancialTips from "@FinancialTips/FinancialTips";
const Drawer = createDrawerNavigator();

function DrawerNav() {
  const theme = useTheme();
  const { updateSelectedTheme } = useContext(MainContext);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const [expanded, setExpanded] = useState(true);
  const [expandedQuery, setExpandedQuery] = useState(true);
  const [expandedSetting, setExpandedSetting] = useState(true);

  const [options, setOptions] = useState([
    {
      label: "Presupuesto",
      navigate: "Finances",
      iconName: Config.BUDGET_ICON,
    },
  ]);

  const [queryOptions, setQueryOptions] = useState([
    {
      label: "Resumen general",
      navigate: "Summary",
      iconName: Config.SUMMARY_ICON,
    },
    {
      label: "Notas",
      navigate: "Notes",
      iconName: "notebook-outline",
    },
    {
      label: "Tips financieros",
      navigate: "FinancialTips",
      iconName: "lightbulb-on-outline",
    },
  ]);

  const [settingOptions, setSettingOptions] = useState([
    {
      label: "Generales",
      navigate: "",
      iconName: "account-cog-outline",
    },

    {
      label: "V3.0",
      navigate: "",
      iconName: "source-branch",
    },
  ]);

  const changeTheme = () => {
    if (isDarkTheme) {
      setIsDarkTheme(false);
      updateSelectedTheme(CustomTheme.WhiteTheme);
    } else {
      setIsDarkTheme(true);
      updateSelectedTheme(CustomTheme.DarkTheme);
    }
  };
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView>
        <View
          style={{
            ...MainStyleSheet.viewRow,
            marginHorizontal: "2%",
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
          <IconButton
            {...props}
            icon={() => (
              <MaterialCommunityIcons
                name={isDarkTheme ? "white-balance-sunny" : "weather-night"}
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {
              changeTheme();
            }}
          />
        </View>
        <Divider />
        <List.Accordion
          title="Mis finanzas"
          titleStyle={{
            color: theme.colors.primary,
          }}
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
          {options.map((option, i) => {
            return <DrawerItemCostume key={i} {...props} option={option} />;
          })}
        </List.Accordion>
        <List.Accordion
          title="Consultas"
          titleStyle={{
            color: theme.colors.primary,
          }}
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => (
                <MaterialCommunityIcons
                  name="folder-eye-outline"
                  onPress={() => navigation.goBack()}
                  size={20}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
            />
          )}
          expanded={expandedQuery}
          onPress={() => setExpandedQuery(!expandedQuery)}
        >
          {queryOptions.map((option, i) => {
            return <DrawerItemCostume key={i} {...props} option={option} />;
          })}
        </List.Accordion>
        <List.Accordion
          title="Ajustes"
          titleStyle={{
            color: theme.colors.primary,
          }}
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => (
                <MaterialCommunityIcons
                  name="account-cog-outline"
                  onPress={() => navigation.goBack()}
                  size={20}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
            />
          )}
          expanded={expandedSetting}
          onPress={() => setExpandedSetting(!expandedSetting)}
        >
          {settingOptions.map((option, i) => {
            return <DrawerItemCostume key={i} {...props} option={option} />;
          })}
        </List.Accordion>
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props}></CustomDrawerContent>
      )}
      screenOptions={{
        swipeEnabled: false,
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: "75%",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
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
        name="Summary"
        component={Summary}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerLeftContainerStyle: {
            backgroundColor: theme.colors.background,
          },
          title: "Resumen general",
        }}
      />
      <Drawer.Screen
        name="Notes"
        component={Notes}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerLeftContainerStyle: {
            backgroundColor: theme.colors.background,
          },
          title: "Notas",
        }}
      />
      <Drawer.Screen
        name="FinancialTips"
        component={FinancialTips}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerLeftContainerStyle: {
            backgroundColor: theme.colors.background,
          },
          title: "Tips financieros",
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
