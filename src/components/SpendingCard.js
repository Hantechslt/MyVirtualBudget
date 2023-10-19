import React, { useContext } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Avatar,
  Card,
  IconButton,
  Text,
  Divider,
  ProgressBar,
  Button,
  useTheme,
} from "react-native-paper";
import { MainContext, mainVariables } from "@Contexts/MainContext";

import MainStyleSheet from "@Styles/MainStyleSheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SpendingCard = () => {
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
            style={{ color: theme.colors.onBackground }}
            variant="titleMedium"
          >
            Gastos personales
          </Text>
        }
        subtitle={<Text variant="bodySmall">100000 / 15000</Text>}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={() => (
              <MaterialCommunityIcons
                name="account-cash"
                size={mainVariables.ICONZISE}
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
                  size={mainVariables.ICONZISE}
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
            progress={0.5}
            color={theme.colors.primary}
          />
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
              <MaterialCommunityIcons
                name="file-document-outline"
                size={mainVariables.ICONZISE}
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
                size={mainVariables.ICONZISE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => navigation.navigate("CreateUpdateSpending")}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default SpendingCard;
