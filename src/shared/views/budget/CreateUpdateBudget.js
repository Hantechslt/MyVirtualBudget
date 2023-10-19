import React, { useState, useCallback, useContext } from "react";
import { View, ScrollView } from "react-native";
import {
  useTheme,
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
} from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
import Utilities from "@Utilities/Utilities";
import { MainContext, mainVariables } from "@Contexts/MainContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CreateUpdateBudget = ({ navigation }) => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);

  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          ...MainStyleSheet.frontView,
          backgroundColor: theme.colors.background,
        }}
      >
        <IconButton
          icon={() => (
            <MaterialCommunityIcons
              name="keyboard-backspace"
              onPress={() => navigation.goBack()}
              size={30}
              style={{
                color: theme.colors.primary,
              }}
            />
          )}
          onPress={() => {}}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Avatar.Icon
            icon={() => (
              <MaterialCommunityIcons
                name="account-cash"
                size={mainVariables.ICONZISE}
                style={{
                  color: theme.colors.shadow,
                }}
              />
            )}
          />
          <Text
            style={{ color: theme.colors.onBackground }}
            variant="headlineMedium"
          >
            Presupuesto
          </Text>
          <Text
            style={{ color: theme.colors.onBackground }}
            variant="bodySmall"
          >
            Se definen para agrupar los gastos de un tipo de presupuesto
            definido
          </Text>
        </View>
        <Divider
          style={{
            marginVertical: "3%",
          }}
        />
        <ScrollView>
          <View style={{ ...MainStyleSheet.viewRow }}>
            <TextInput
              label="Nombre del presupuesto"
              style={{ width: "100%" }}
              mode="outlined"
            />
          </View>
          <View style={{ ...MainStyleSheet.viewRow, marginVertical: "5%" }}>
            <TextInput
              label="Monto del presupuesto"
              style={{ width: "100%" }}
              mode="outlined"
              keyboardType="numeric"
            />
          </View>
          <Button
            mode="contained-tonal"
            style={MainStyleSheet.primaryButton}
            onPress={() => {
              console.log("press");
            }}
          >
            Agregar presupuesto
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateUpdateBudget;
