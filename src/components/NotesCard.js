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
import { TouchableWithoutFeedback } from "react-native";

import Clipboard from "@react-native-clipboard/clipboard";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Config from "@Config/Config";
const NotesCard = (props) => {
  const theme = useTheme();
  const [showClipboardCopied, setShowClipboardCopied] = useState(false);
  console.log(props);

  const copyToClipboard = () => {
    Clipboard.setString(props.notes.note);
    setShowClipboardCopied(true);
    setTimeout(() => {
      setShowClipboardCopied(false);
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback
      onLongPress={copyToClipboard}
      key={props.notes.index}
    >
      <Card
        key={props.notes.index}
        style={{
          margin: "2%",
        }}
      >
        <Card.Title
          title={<Text variant="bodySmall">{"Notas / Recordatorios"}</Text>}
          right={() => (
            <IconButton
              icon={() => (
                <MaterialCommunityIcons
                  name={"delete"}
                  size={Config.ICON_SIZE}
                  style={{
                    color: theme.colors.darkRed,
                  }}
                />
              )}
              onPress={() => {
                props.handleRemoveNote(props.notes.index);
              }}
            />
          )}
        />
        <Card.Content>
          <Text variant="bodyLarge">{props.notes.note}</Text>
          {showClipboardCopied ? (
            <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
              {"Nota copiada"}
            </Text>
          ) : null}
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default NotesCard;
