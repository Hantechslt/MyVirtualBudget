import React from "react";

import { DrawerItem } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Utilities from "@Utilities/Utilities";
const DrawerItemCostume = (props) => {
  const theme = useTheme();
  return (
    <DrawerItem
      key={props.key}
      label={props.option.label}
      labelStyle={{
        color: theme.colors.secondary,
      }}
      icon={(focus) =>
        props.option.isFontAwesome ? (
          <FontAwesome5
            name={props.option.iconName}
            size={props.option.iconSize}
            style={{
              color: theme.colors.secondary,
            }}
          />
        ) : (
          <MaterialCommunityIcons
            name={props.option.iconName}
            size={20}
            style={{
              color: theme.colors.secondary,
            }}
          />
        )
      }
      onPress={() =>
        props.option.navigate !== ""
          ? props.navigation.navigate(props.option.navigate)
          : null
      }
      style={{
        backgroundColor: theme.colors.surface,
        marginHorizontal: "6%",
      }}
      pressOpacity={theme.colors.primary}
    />
  );
};
export default DrawerItemCostume;
