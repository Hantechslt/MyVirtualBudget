import React, { useState, useCallback, useContext } from "react";
import { View } from "react-native";
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
import { DatePickerModal, en } from "react-native-paper-dates";
import Utilities from "@Utilities/Utilities";
import { MainContext, mainVariables } from "@Contexts/MainContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

const CreateUpdatePeriod = ({ navigation }) => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);

  const [date, setDate] = useState(Utilities.getDate());
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      console.log(params.date);
    },
    [setOpen, setDate]
  );

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
              <Ionicons
                name="wallet"
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
            Periodo
          </Text>
          <Text
            style={{ color: theme.colors.onBackground }}
            variant="bodySmall"
          >
            Se definen para poder agregar presupuestos dentros de un periodo de
            tiempo determinado
          </Text>
        </View>
        <Divider
          style={{
            marginVertical: "3%",
          }}
        />
        <View style={{ ...MainStyleSheet.viewRow }}>
          <TextInput
            label="Fecha de inicio"
            style={{ width: "85%" }}
            mode="outlined"
            value={moment(date).format("DD/MM/YYYY")}
            keyboardType="numeric"
            editable={false}
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="calendar"
                onPress={() => setOpen(true)}
                size={30}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {}}
          />
        </View>
        <View style={{ ...MainStyleSheet.viewRow, marginVertical: "5%" }}>
          <TextInput
            label="Fecha Final"
            style={{ width: "85%" }}
            mode="outlined"
            value={moment(date).format("DD/MM/YYYY")}
            keyboardType="numeric"
            editable={false}
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="calendar"
                onPress={() => setOpen(true)}
                size={30}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {}}
          />
        </View>
        <DatePickerModal
          startYear={2023}
          endYear={2024}
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          saveLabel="Confirmar"
          label={"Seleccione una fecha de inicio: "}
          animationType={"slide"}
          //editIcon={"file-edit-outline"}
        />
        <Button
          mode="contained-tonal"
          style={MainStyleSheet.primaryButton}
          onPress={() => {
            console.log("press");
          }}
        >
          Agregar periodo
        </Button>
      </View>
    </View>
  );
};

export default CreateUpdatePeriod;
