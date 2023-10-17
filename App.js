import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import CustomTheme from "./src/themes/CustomTheme";
import MainStack from "@Stacks/MainStack";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  useEffect(() => {}, []);

  return (
    <PaperProvider theme={CustomTheme.DarkTheme}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
