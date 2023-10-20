import React, { useState, useCallback, useContext, useEffect } from "react";
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
import { DatePickerModal, en } from "react-native-paper-dates";
import Utilities from "@Utilities/Utilities";
import { MainContext, mainVariables } from "@Contexts/MainContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Periods from "@Apis/Periods";

const CreateUpdatePeriod = ({ navigation, route }) => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [originalValue, setOriginalValue] = useState("");
  const [value, setValue] = useState("");

  const [period] = useState(route.params?.period);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (period !== null) {
      setIsEdit(true);
      setStartDate(Utilities.getTimeStampToDate(period.startDate));
      setEndDate(Utilities.getTimeStampToDate(period.endDate));
      setValue(String(period.amount));
      setOriginalValue(String(period.amount));
    } else {
      initVariables();
    }
  }, []);

  const initVariables = () => {
    setStartDate(Utilities.getDate(0));
    setEndDate(Utilities.getDate(30));
    setValue("");
    setOriginalValue("");
  };
  const onDismissStartDate = useCallback(() => {
    setOpenStartDate(false);
  }, [setOpenStartDate]);

  const onDismissEndDate = useCallback(() => {
    setOpenEndDate(false);
  }, [setOpenEndDate]);

  const onConfirmStartDate = useCallback(
    (params) => {
      console.log(params);
      setOpenStartDate(false);
      setStartDate(params.date);
      console.log(params.date);
    },
    [setOpenStartDate, setStartDate]
  );
  const onConfirmEndDate = useCallback(
    (params) => {
      setOpenEndDate(false);
      setEndDate(params.date);
      console.log(params.date);
    },
    [setOpenEndDate, setEndDate]
  );

  const handleBlur = () => {
    const numberFormat = new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    });
    const formattedValue = numberFormat.format(value);
    setValue(formattedValue);
  };

  const handleFocus = () => {
    setValue(originalValue);
  };

  const handleChange = (text) => {
    let onlyNumAndDot = text.replace(/[^0-9.]/g, "");
    if (onlyNumAndDot.split(".").length > 2) {
      onlyNumAndDot = onlyNumAndDot.replace(/\.+$/, "");
    }
    const onlyTwoDecimals = onlyNumAndDot.replace(/(\.\d\d).*/g, "$1");
    setValue(onlyTwoDecimals);
    setOriginalValue(onlyTwoDecimals);
  };

  const handleCreateUpdatePeriods = (isCreate) => {
    const objPeriod = {
      startDate: Utilities.getDateToTimeStamp(startDate),
      endDate: Utilities.getDateToTimeStamp(endDate),
      amount: parseFloat(originalValue),
      state: true,
    };
    if (isCreate) {
      objPeriod["used"] = 0;
      Periods.createPeriod(objPeriod, mainVariables).then((res) => {
        if (res) {
          Periods.getPeriodList((periodsList) => {
            let datReverse = periodsList.reverse();
            let test = { ...mainVariables.PERIODS };
            test = datReverse;
            mainVariables.PERIODS = test;
          });
          console.log("agregado");
        } else console.log("No Agregado");
      });
    } else {
      objPeriod["used"] = period.used;
      objPeriod["index"] = period.index;
      Periods.updatePeriod(objPeriod, mainVariables).then((res) => {
        if (res) console.log("agregado");
        else console.log("No Agregado");
      });
    }
  };
  const handleDeletePeriod = () => {
    Periods.removePeriod(period.index, mainVariables).then((res) => {
      if (res) {
        console.log("se elimino");
        setIsEdit(false);
        initVariables();
      }
    });
  };
  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView>
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
              Se definen para poder agregar presupuestos dentros de un periodo
              de tiempo determinado
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
              value={moment(startDate).format("DD/MM/YYYY")}
              keyboardType="numeric"
              editable={false}
            />

            <IconButton
              icon={() => (
                <MaterialCommunityIcons
                  name="calendar"
                  onPress={() => setOpenStartDate(true)}
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
              value={moment(endDate).format("DD/MM/YYYY")}
              keyboardType="numeric"
              editable={false}
            />
            <IconButton
              icon={() => (
                <MaterialCommunityIcons
                  name="calendar"
                  onPress={() => setOpenEndDate(true)}
                  size={30}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
              onPress={() => {}}
            />
          </View>
          <View style={{ ...MainStyleSheet.viewRow }}>
            <TextInput
              label="Ingresos del periodo (Opcional)"
              style={{ width: "85%" }}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={value}
            />
            {isEdit ? (
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name="delete"
                    onPress={() => handleDeletePeriod()}
                    size={30}
                    style={{
                      color: theme.colors.darkRed,
                    }}
                  />
                )}
                onPress={() => {}}
              />
            ) : null}
          </View>
          {isEdit ? (
            <Button
              mode="contained-tonal"
              style={{
                ...MainStyleSheet.primaryButton,
              }}
              onPress={() => {
                handleCreateUpdatePeriods(false);
              }}
            >
              Editar preriodo
            </Button>
          ) : (
            <Button
              mode="contained-tonal"
              style={MainStyleSheet.primaryButton}
              onPress={() => {
                handleCreateUpdatePeriods(true);
              }}
            >
              Agregar periodo
            </Button>
          )}
          <DatePickerModal
            startYear={2023}
            endYear={2024}
            locale="en"
            mode="single"
            visible={openStartDate}
            onDismiss={onDismissStartDate}
            date={startDate}
            onConfirm={onConfirmStartDate}
            saveLabel="Confirmar"
            label={"Seleccione una fecha de inicio: "}
            animationType={"slide"}
            //editIcon={"file-edit-outline"}
          />
          <DatePickerModal
            startYear={2023}
            endYear={2024}
            locale="en"
            mode="single"
            visible={openEndDate}
            onDismiss={onDismissEndDate}
            date={endDate}
            onConfirm={onConfirmEndDate}
            saveLabel="Confirmar"
            label={"Seleccione una fecha de fin: "}
            animationType={"slide"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateUpdatePeriod;
