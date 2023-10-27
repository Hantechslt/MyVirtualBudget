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
import {
  DatePickerModal,
  es,
  registerTranslation,
} from "react-native-paper-dates";

import Utilities from "@Utilities/Utilities";
import { MainContext } from "@Contexts/MainContext";
import Config from "@Config/Config";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Periods from "@Apis/Periods";

import PeriodsUtils from "@Periods/PeriodsUtils";

import SnackbarMsg from "@Components/SnackbarMsg";
import LoadScreen from "@Components/LoadScreen";

const CreateUpdatePeriod = ({ navigation, route }) => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [originalValue, setOriginalValue] = useState("");
  const [value, setValue] = useState("");

  const [period] = useState(route.params?.period);

  const [isEdit, setIsEdit] = useState(false);

  const { PERIODS, updatePeriods } = useContext(MainContext);

  const [loading, setLoading] = useState(false);

  //snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState("SUCCESS");

  const periodsUtils = new PeriodsUtils(PERIODS, updatePeriods);

  registerTranslation("es", es);

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
    setIsEdit(false);
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
      setOpenStartDate(false);
      setStartDate(params.date);
    },
    [setOpenStartDate, setStartDate]
  );
  const onConfirmEndDate = useCallback(
    (params) => {
      setOpenEndDate(false);
      setEndDate(params.date);
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
    let objPeriod = {
      startDate: Utilities.getDateToTimeStamp(startDate),
      endDate: Utilities.getDateToTimeStamp(endDate),
      amount: parseFloat(originalValue),
      state: true,
    };

    if (isCreate) {
      objPeriod["used"] = 0;
      objPeriod["index"] = Utilities.getTimeStamp();
      setLoading(true);

      Periods.createUpdatePeriod(objPeriod).then((res) => {
        if (res) {
          setSnackbarType("SUCCESS");
          setSnackbarVisible(true);
          periodsUtils.handleCreatePeriods(objPeriod);
        } else {
          setSnackbarType("ERROR");
          setSnackbarVisible(true);
        }
        setLoading(false);
      });
    } else {
      objPeriod["used"] = period.used;
      objPeriod["index"] = period.index;
      setLoading(true);

      Periods.createUpdatePeriod(objPeriod).then((res) => {
        if (res) {
          setSnackbarType("SUCCESS");
          setSnackbarVisible(true);
          periodsUtils.handleUpdatePeriods(objPeriod);
        } else {
          setSnackbarType("ERROR");
          setSnackbarVisible(true);
        }
        setLoading(false);
      });
    }
  };
  const handleDeletePeriod = () => {
    Periods.removePeriod(period.index).then((res) => {
      if (res) {
        console.log("Periodo Removido");
        periodsUtils.handleRemovePeriods(period);
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
          <LoadScreen loading={loading} />

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
                  size={Config.ICON_SIZE}
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
            locale={es}
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
            locale={es}
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
      {snackbarVisible ? (
        <SnackbarMsg
          open={snackbarVisible}
          close={setSnackbarVisible.bind(null)}
          type={snackbarType}
        />
      ) : null}
    </View>
  );
};

export default CreateUpdatePeriod;
