import React, { useState, useEffect, useContext } from "react";

import {
  useTheme,
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
  List,
  Tooltip,
  Card,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Config from "@Config/Config";
const TipsCard = (props) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  const theme = useTheme();
  const [show, setShow] = useState(false);

  return (
    <Card
      key={props.i}
      style={{
        margin: "2%",
      }}    
    >
      <Card.Title      
        title={<Text variant="titleMedium">{props.tip.title}</Text>}
        right={() => (
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name={show ? "eye-off" : "eye-outline"}
                size={Config.ICON_SIZE}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {
              !setShow(!show);
            }}
          />
        )}
      />
      {show ? (
        <Card.Content>
          <Text variant="bodyLarge">{props.tip.tip}</Text>
        </Card.Content>
      ) : null}
    </Card>
  );
};

export default TipsCard;
