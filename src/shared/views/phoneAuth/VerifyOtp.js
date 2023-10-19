import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import MainStyleSheet from "@Styles/MainStyleSheet";

const VerifyOtp = ({ navigation, route }) => {
  const [otp, setOTP] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [phone] = useState(route.params?.phone);
  const [codeZone] = useState(route.params?.codeZone);
  const [confirm, setConfirm] = useState(null);
  const [waitOtp, setWaitOtp] = useState(true);
  const OtpNumberRef = useRef();

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  signInWithPhoneNumber = () => {
    try {
      var phoneNum = codeZone + "" + phone;
      auth()
        .signInWithPhoneNumber(phoneNum)
        .then((confirmation) => {
          setConfirm(confirmation);
          setWaitOtp(false);
        });
    } catch (e) {
      console.log(e);
    }
  };
  handleConfirmCode = async () => {
    try {
      console.log(otp);
      const response = await confirm.confirm(otp);
      if (response) {
        console.log(response);
        navigation.navigate("DrawerNav");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={MainStyleSheet.mainViewContainer}>
      <TextInput
        label="OTP de 6 dígitos"
        value={otp}
        style={{ width: "100%" }}
        onChangeText={(text) => setOTP(text)}
        mode="outlined"
        keyboardType="numeric"
        maxLength={6}
        ref={OtpNumberRef}
      />
      <Button
        mode="contained-tonal"
        style={MainStyleSheet.primaryButton}
        onPress={() => handleConfirmCode()}
        disabled={waitOtp}
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

export default VerifyOtp;
