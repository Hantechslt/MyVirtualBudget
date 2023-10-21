import React, { useEffect, useContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import CustomTheme from "./src/themes/CustomTheme";
import MainStack from "@Stacks/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import {MainProvider } from "@Contexts/MainContext";

//Este import se utiliza para inicializar la base de datos.
import Firebase from "@FirebaseDB/Firebase";

//const mainVariables = useContext(MainContext);

const App = () => {
  useEffect(() => {}, []);

  return (
    <PaperProvider theme={CustomTheme.DarkTheme}>
      <MainProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </MainProvider>
    </PaperProvider>
  );
};

export default App;
