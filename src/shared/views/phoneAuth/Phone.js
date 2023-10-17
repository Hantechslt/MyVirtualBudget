import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  Checkbox,
  useTheme,
  Text,
} from "react-native-paper";
import SelectModal from "@Components/SelectModal";
import CountryCode from "@Config/CountryCode";
import MainStyleSheet from "@Styles/MainStyleSheet";

const PhoneNumberInput = ({ navigation }) => {
  const theme = useTheme();
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const phoneNumberRef = useRef();

  useEffect(() => {}, []);

  const handleAuthentication = () => {
    if (phoneNumber) {
      navigation.navigate("Otp", {
        codeZone: areaCode,
        phone: phoneNumber,
      });
    } else {
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={MainStyleSheet.mainViewContainer}>
      <SelectModal
        setValue={setAreaCode.bind(null)}
        items={CountryCode.CountryCodes}
        title={"País"}
      />
      <View style={MainStyleSheet.viewRow}>
        <View style={MainStyleSheet.viewInputCode}>
          <TextInput
            label="Código"
            ref={phoneNumberRef}
            value={areaCode}
            onChangeText={(text) => setAreaCode(text)}
            mode="outlined"
            keyboardType="phone-pad"
            editable={false}
          />
        </View>
        <View style={MainStyleSheet.viewInputPhone}>
          <TextInput
            label="Número de teléfono"
            ref={phoneNumberRef}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            mode="outlined"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <Button
        mode="contained-tonal"
        onPress={handleAuthentication}
        style={MainStyleSheet.primaryButton}
      >
        Autenticar
      </Button>
      <View style={MainStyleSheet.noAuthenticationContainer}>
        <Text
          style={{
            ...MainStyleSheet.noAuthenticationText,
            color: theme.colors.RojoVino,
          }}
        >
          No me quiero autenticar
        </Text>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        Por favor, ingresa un número de teléfono válido.
      </Snackbar>
    </View>
  );
};

export default PhoneNumberInput;
