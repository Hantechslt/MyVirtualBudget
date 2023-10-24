import React from "react";

import { DrawerItem } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const DrawerItemCostume = (props) => {
  const theme = useTheme();
  return (
    <DrawerItem
      label={props.option.label}
      labelStyle={{
        color: theme.colors.primary,
      }}
      icon={(focus) =>
        props.option.isFontAwesome ? (
          <FontAwesome5
            name={props.option.iconName}
            size={props.option.iconSize}
            style={{
              color: theme.colors.primary,
            }}
          />
        ) : (
          <MaterialCommunityIcons
            name={props.option.iconName}
            size={20}
            style={{
              color: theme.colors.primary,
            }}
          />
        )
      }
      onPress={() => props.navigation.navigate(props.option.navigate)}
      style={{
        backgroundColor: theme.colors.surface,
        marginHorizontal: "6%",
      }}
      pressOpacity={theme.colors.primary}
    />
  );
};
export default DrawerItemCostume;
