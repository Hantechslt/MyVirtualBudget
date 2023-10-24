import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Avatar,
  Card,
  IconButton,
  Text,
  Divider,
  ProgressBar,
  useTheme,
} from "react-native-paper";
import Utilities from "@Utilities/Utilities";
import MainStyleSheet from "@Styles/MainStyleSheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Config from "@Config/Config";

const BudgetByPeriodCard = (props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  useEffect(() => {}, []);

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
            style={{ color: theme.colors.onBackground }}
            variant="titleMedium"
          >
            {props.budget.budgetName}
          </Text>
        }
        subtitle={
          <Text variant="bodySmall">
            {Utilities.getLocaleCurrency(props.budget.amount, "en-CR", "CRC") +
              " / " +
              Utilities.getLocaleCurrency(props.budget.used, "en-CR", "CRC")}
          </Text>
        }
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={() => (
              <MaterialCommunityIcons
                name="folder-table"
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.shadow,
                }}
              />
            )}
            size={30}
          />
        )}
        right={(props) => (
          <View style={MainStyleSheet.viewRow}>
            <IconButton
              {...props}
              icon={() => (
                <MaterialCommunityIcons
                  name="file-edit-outline"
                  size={Config.ICON_SIZE}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
              onPress={() => {}}
            />
          </View>
        )}
      />
      <Divider style={{ marginHorizontal: "5%" }} />
      <Card.Content>
        <View>
          <ProgressBar
            theme={{
              colors: {
                surfaceVariant: theme.colors.shadow,
              },
            }}
            progress={Utilities.getRatios(
              props.budget.amount,
              props.budget.used
            )}
            color={
              props.budget.used >= props.budget.amount
                ? theme.colors.darkRed
                : theme.colors.primary
            }
          />
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
              <MaterialCommunityIcons
                name="file-document-outline"
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {}}
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="plus"
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() =>
              navigation.navigate("CreateUpdateExpense", {
                budget: props.budget,
                expense: null,
              })
            }
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default BudgetByPeriodCard;
