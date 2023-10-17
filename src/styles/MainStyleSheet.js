import { StyleSheet } from "react-native";

const containerStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
});

const MainStyleSheet = StyleSheet.create({
  mainViewContainer: {
    ...containerStyles.container,
    flex: 1,
  },
  modalContainer: {
    ...containerStyles.container,
    width: "100%",
  },
  primaryButton: {
    width: "100%",
    marginTop: "3%",
    borderRadius: 7,
  },
  selectButton: {
    borderRadius: 7,
    width: "100%",
  },
  buttonContent: {
    justifyContent: "flex-start",
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewInputCode: {
    paddingRight: "5%",
    width: "30%",
  },
  viewInputPhone: {
    paddingLeft: "5%",
    width: "70%",
  },
  noAuthenticationContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  noAuthenticationText: {
    textDecorationLine: "underline",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
  },
});

export default MainStyleSheet;
