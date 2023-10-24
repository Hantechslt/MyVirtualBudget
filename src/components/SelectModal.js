import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
        contentContainerStyle={{
          ...styles.modalContent,
          backgroundColor: theme.colors.background,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            ...MainStyleSheet.modalContent,
            backgroundColor: theme.colors.background,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: theme.colors.primary }}>{props.title}</Text>
          <ScrollView>
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
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    marginVertical: "30%",
    marginHorizontal: "5%",
  },
});

export default SelectModal;
