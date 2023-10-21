import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  Modal,
  Portal,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
const SelectModal = (props) => {
  const theme = useTheme();
  //const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);

  const handleSelect = (item) => {    
    props.setValue(item);
    props.close(false);
  };

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  return (
    <Portal>
      <Modal
        visible={props.open}
        onDismiss={() => {
          props.close(false);
        }}
      >
        <ScrollView>
          <View
            style={{
              ...MainStyleSheet.modalContent,
              backgroundColor: theme.colors.background,
            }}
          >
            <Text style={{ color: theme.colors.primary }}>{props.title} </Text>
            <List.Section>
              {items.map((item, index) => (
                <List.Item
                  key={index}
                  title={item.label}
                  description={item.description}
                  onPress={() => handleSelect(item)}
                />
              ))}
            </List.Section>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default SelectModal;
