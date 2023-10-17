import React, { useState } from "react";
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
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items] = useState(props.items);

  const showSelectModal = () => setVisible(true);
  const hideSelectModal = () => setVisible(false);

  const handleSelect = (item) => {
    props.setValue(item.value);
    setSelectedItem(item.label);
    hideSelectModal();
  };

  return (
    <View style={MainStyleSheet.modalContainer}>
      <Button
        onPress={showSelectModal}
        contentStyle={MainStyleSheet.buttonContent}
        style={MainStyleSheet.selectButton}
        mode="elevated"
      >
        <Text style={{ color: theme.colors.primary, fontSize: 16 }}>
          {selectedItem !== null
            ? props.title + ": " + selectedItem
            : "Seleccione " + props.title}
        </Text>
      </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideSelectModal}>
          <ScrollView>
            <View
              style={{
                ...MainStyleSheet.modalContent,
                backgroundColor: theme.colors.background,
              }}
            >
              <Text style={{ color: theme.colors.primary }}>
                Seleccione un país:
              </Text>
              <List.Section>
                {items.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item.value + " - " + item.label}
                    onPress={() => handleSelect(item)}
                  />
                ))}
              </List.Section>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

export default SelectModal;
