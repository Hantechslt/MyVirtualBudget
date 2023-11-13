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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Utilities from "@Utilities/Utilities";
import Config from "@Config/Config";

const PeriodCard = (props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [formatDate, setFormatDate] = useState("");
  
  useEffect(() => {
    setFormatDate(
      Utilities.getFormatPeriodDate(
        props.selected.startDate,
        props.selected.endDate
      )
    );
  }, [props.selected]);

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
                name={Config.CHANGE_PERIOD}
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {
              props.handleOpenSelect(true);
            }}
          />
        )}
      />
      <Divider style={{ marginHorizontal: "5%" }} />
      <Card.Content>
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
                props.selected.amount,
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
              {Utilities.getLocaleCurrency(props.selected.used, "en-CR", "CRC")}
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <View
          style={{
            ...MainStyleSheet.viewRow,
            justifyContent: "space-around",
            marginBottom: "-3%",
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
                name={Config.BUDGET_ICON}
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdateBudget", {
                period: props.selected,
                budget: null,
              })
            }
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name={Config.EDIT_ICON}
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdatePeriod", {
                period: props.selected,
              })
            }
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default PeriodCard;
