import React, { useEffect, useContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import CustomTheme from "./src/themes/CustomTheme";
import MainStack from "@Stacks/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import { MainContext, mainVariables } from "@Contexts/MainContext";

//Este import se utiliza para inicializar la base de datos.
import Firebase from "@Config/Firebase";

const App = () => {
  useEffect(() => {}, []);

  return (
    <PaperProvider theme={CustomTheme.DarkTheme}>
      <MainContext.Provider value={mainVariables}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </MainContext.Provider>
    </PaperProvider>
  );
};

export default App;
