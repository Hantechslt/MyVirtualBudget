import React from "react";
import { ActivityIndicator, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

const LoadScreen = (props) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        transparent={true}
        visible={props.loading}
        animationType="slide" // Puedes ajustar el tipo de animación según tus preferencias
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Color oscurecido
          }}
        >
          <ActivityIndicator
            animating={true}
            color={theme.colors.primary} // Color del ActivityIndicator
            size="large"
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default LoadScreen;
