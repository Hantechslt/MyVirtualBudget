import React, { useContext, useEffect, useState } from "react";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";

import Config from "@Config/Config";

const ExpensesCard = (props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [budget, setBudget] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    setBudget(props.budget);
    setExpense(props.expense);
  }, [props]);

  return (
    <Card
      key={props.expense.index}
      style={{
        ...MainStyleSheet.primaryCard,
        borderColor: theme.colors.onBackground,
      }}
    >
      <Card.Title
        titleNumberOfLines={2}
        title={
          <Text
            style={{ color: theme.colors.onBackground }}
            variant="titleMedium"
          >
            {props.expense.expenseName}
          </Text>
        }
        subtitle={
          <View>
            <Text variant="bodySmall">
              {Utilities.getLocaleCurrency(
                props.expense.amount,
                "en-CR",
                "CRC"
              )}
              {" / "}
              {moment(props.expense.index).format("DD/MM/YYYY")}
            </Text>
          </View>
        }
        right={() => (
          <View style={MainStyleSheet.viewRow}>
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
                navigation.navigate("CreateUpdateExpense", {
                  budget: budget,
                  expense: expense,
                })
              }
            />
            <IconButton
              icon={() => (
                <MaterialCommunityIcons
                  name={Config.DELETE_ICON}
                  size={Config.ICON_SIZE}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              )}
              onPress={() => props.deleteAction(props.expense)}
            />
          </View>
        )}
      />
    </Card>
  );
};

export default ExpensesCard;
