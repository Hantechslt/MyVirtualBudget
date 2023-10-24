import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Snackbar, useTheme } from "react-native-paper";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SnackbarMsg = (props) => {
  const theme = useTheme();
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarIcon, setSnackbarIcon] = useState("");
  const [snackbarColorIcon, setSnackbarColorIcon] = useState("");

  const [snackbarTextColor, setSnackbarTextColor] = useState("");

  useEffect(() => {
    setSnackbarTextColor(theme.colors.inverseSurface);
    switch (props.type) {
      case "SUCCESS":
        setSnackbarMsg("Accion ejecutada correctamente");
        setSnackbarIcon("check-circle");
        setSnackbarColorIcon(theme.colors.mintGreen);
        break;
      case "ERROR":
        setSnackbarMsg(
          "No se puedo ejecutar la acción verifique la conexión a internet"
        );
        setSnackbarIcon("close-circle");
        setSnackbarColorIcon(theme.colors.darkRed);
        break;
      case "WARNING":
        setSnackbarMsg("Verifique los datos ingresados");
        setSnackbarIcon("alert-circle");
        setSnackbarColorIcon(theme.colors.tertiaryContainer);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Snackbar
      visible={props.open}
      style={{ backgroundColor: theme.colors.backdrop }} // Cambia el color de fondo aquí
      onDismiss={() => props.close(false)}
      elevation={5}
      duration={7000}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: snackbarTextColor,
            width: "90%",
          }}
        >
          {snackbarMsg}
        </Text>
        <MaterialCommunityIcons
          name={snackbarIcon}
          size={30}
          style={{
            color: snackbarColorIcon,
            width: "10",
          }}
        />
      </View>
    </Snackbar>
  );
};
export default SnackbarMsg;
