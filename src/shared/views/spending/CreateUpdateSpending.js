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
import { MainContext, mainVariables } from "@Contexts/MainContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CreateUpdateSpending = ({ navigation }) => {
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
                name="cash-minus"
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
            Gasto
          </Text>
          <Text
            style={{ color: theme.colors.onBackground }}
            variant="bodySmall"
          >
            Se definen para identificar un egreso de dinero de un presupuesto
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
              label="Nombre del gasto"
              style={{ width: "100%" }}
              mode="outlined"
            />
          </View>
          <View style={{ ...MainStyleSheet.viewRow, marginVertical: "5%" }}>
            <TextInput
              label="Monto del gasto"
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
            Agregar gasto
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateUpdateSpending;
