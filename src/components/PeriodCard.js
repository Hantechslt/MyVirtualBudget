import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { View } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Text,
  Divider,
  useTheme,
} from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
import { MainContext } from "@Contexts/MainContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Utilities from "@Utilities/Utilities";
import SelectModal from "@Components/SelectModal";
import Config from "@Config/Config";

const PeriodCard = (props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [formatDate, setFormatDate] = useState("");
  const { PERIODS, SELECTED_PERIOD, updateSelectedPeriod } =
    useContext(MainContext);

  useEffect(() => {
    setFormatDate(
      Utilities.getFormatPeriodDate(
        SELECTED_PERIOD.startDate,
        SELECTED_PERIOD.endDate
      )
    );
  }, [PERIODS]);

  const handleOpenSelectModal = () => {
    PERIODS.forEach((period) => {
      period["label"] =
        "Periodo: " +
        Utilities.getFormatPeriodDate(period.startDate, period.endDate);
      period["description"] = Utilities.getLocaleCurrency(
        period.amount,
        "es-CR",
        "CRC"
      );
    });
    setOpenSelectModal(true);
  };

  const handleSelectedItem = (period) => {
    props.handleChangePeriod(period);
    updateSelectedPeriod(period);
  };

  return (
    <Card
      style={{
        ...MainStyleSheet.primaryCard,
        borderColor: theme.colors.onBackground,
      }}
    >
      <Card.Title
        title={
          <Text
            style={{
              color: theme.colors.onBackground,
              fontWeight: "bold",
            }}
            variant="titleLarge"
          >
            Periodo
          </Text>
        }
        subtitle={<Text variant="bodySmall">{formatDate}</Text>}
        left={(props) => (
          <Avatar.Icon
            {...props}
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
        )}
        right={() => (
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="rotate-3d-variant"
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {
              handleOpenSelectModal(true);
            }}
          />
        )}
      />
      <Divider style={{ marginHorizontal: "5%" }} />
      <Card.Content>
        {PERIODS !== null ? (
          <SelectModal
            open={openSelectModal}
            close={setOpenSelectModal.bind(null)}
            items={PERIODS}
            setValue={handleSelectedItem.bind(null)}
            title={"Seleccione un Periodo"}
          ></SelectModal>
        ) : null}
        <View style={MainStyleSheet.viewRow}>
          <View>
            <Text
              style={{ color: theme.colors.onBackground }}
              variant="titleMedium"
            >
              Ingresos
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: theme.colors.onBackground,
              }}
              variant="titleLarge"
            >
              {Utilities.getLocaleCurrency(
                SELECTED_PERIOD.amount,
                "en-CR",
                "CRC"
              )}
            </Text>
          </View>
          <View>
            <Text variant="titleMedium">Gastos</Text>
            <Text
              style={{ fontWeight: "bold", color: theme.colors.emeraldGreen }}
              variant="titleLarge"
            >
              {Utilities.getLocaleCurrency(
                SELECTED_PERIOD.used,
                "en-CR",
                "CRC"
              )}
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <View
          style={{
            ...MainStyleSheet.viewRow,
            justifyContent: "space-around",
          }}
        >
          <IconButton
            icon={() => (
              <Ionicons
                name="wallet"
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdatePeriod", {
                period: null,
              })
            }
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="folder-table"
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdateBudget", {
                period: SELECTED_PERIOD,
                budget: null,
              })
            }
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="file-edit-outline"
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdatePeriod", {
                period: SELECTED_PERIOD,
              })
            }
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default PeriodCard;
