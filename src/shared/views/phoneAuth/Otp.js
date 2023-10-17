import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import auth from "@react-native-firebase/auth";

const OTPInput = ({ navigation, route }) => {
  const [otp, setOTP] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [phone] = useState(route.params?.phone);
  const [codeZone] = useState(route.params?.codeZone);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    console.log(phone);
    console.log(codeZone);
    signInWithPhoneNumber();
  }, []);

  async function signInWithPhoneNumber() {
    try {
      var phoneNum = codeZone + "" + phone;
      console.log(phoneNum);
      console.log(auth);
      const confirmation = await auth().signInWithPhoneNumber(phoneNum);
      setConfirm(confirmation);
      console.log(confirmation);
    } catch (e) {
      console.log(e);
    }
  }
  async function handleConfirmCode() {
    try {
      console.log(otp);
       const response = await confirm.confirm(otp);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        label="OTP de 6 dígitos"
        value={otp}
        style={{ width: "100%" }}
        onChangeText={(text) => setOTP(text)}
        mode="outlined"
        keyboardType="numeric"
        maxLength={6}
      />      
      <Button
        mode="contained-tonal"
        style={{ width: "100%", marginTop: "3%" }}
        onPress={() => handleConfirmCode()}
      >
        Verificar OTP
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        Por favor, ingresa un OTP válido de 6 dígitos.
      </Snackbar>
    </View>
  );
};

export default OTPInput;
