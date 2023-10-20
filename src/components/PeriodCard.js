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

const PeriodCard = (props) => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);
  const navigation = useNavigation();

  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [formatDate, setFormatDate] = useState("");

  useEffect(() => {
    console.log(props);
    setFormatDate(
      Utilities.getFormatPeriodDate(
        props.period.startDate,
        props.period.endDate
      )
    );
  }, []);

  const handleOpenSelectModal = () => {
    mainVariables.PERIODS.forEach((period) => {
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

  const handleSelectedItem = (item) => {
    mainVariables.SELECTEDPERIOD = item;
    props.selectedPeriod(item);
    console.log(item);
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
                size={mainVariables.ICONZISE}
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
                size={mainVariables.ICONZISE}
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
        {mainVariables.PERIODS !== null ? (
          <SelectModal
            open={openSelectModal}
            close={setOpenSelectModal.bind(null)}
            items={mainVariables.PERIODS}
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
              {Utilities.getLocaleCurrency(props.period.amount, "en-CR", "CRC")}
            </Text>
          </View>
          <View>
            <Text variant="titleMedium">Gastos</Text>
            <Text
              style={{ fontWeight: "bold", color: theme.colors.emeraldGreen }}
              variant="titleLarge"
            >
              {Utilities.getLocaleCurrency(props.period.used, "en-CR", "CRC")}
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
                size={mainVariables.ICONZISE}
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
                size={mainVariables.ICONZISE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdateBudget", {
                period: props.period,
                budget: null,
              })
            }
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="file-edit-outline"
                size={mainVariables.ICONZISE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdatePeriod", {
                period: props.period,
              })
            }
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default PeriodCard;
