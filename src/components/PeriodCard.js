import React, { useContext } from "react";
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
import { MainContext, mainVariables } from "@Contexts/MainContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const PeriodCard = () => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);
  const navigation = useNavigation();

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
        subtitle={<Text variant="bodySmall">02/12/2023 - 04/12/2023</Text>}
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
        right={(props) => (
          <IconButton
            {...props}
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
              navigation.navigate("CreateUpdatePeriod");
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
              1000000
            </Text>
          </View>
          <View>
            <Text variant="titleMedium">Gastos</Text>
            <Text
              style={{ fontWeight: "bold", color: theme.colors.onBackground }}
              variant="titleLarge"
            >
              510000
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
            onPress={() => navigation.navigate("CreateUpdatePeriod")}
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="account-cash"
                size={mainVariables.ICONZISE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => navigation.navigate("CreateUpdateBudget")}
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
            onPress={() => {}}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default PeriodCard;
