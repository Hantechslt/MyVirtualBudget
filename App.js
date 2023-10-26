import React, { useEffect, useContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import CustomTheme from "./src/themes/CustomTheme";
import MainStack from "@Stacks/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import { MainContext, MainProvider } from "@Contexts/MainContext";
import MyBudgetApp from "@Apis/MyBudgetApp";
import Config from "@Config/Config";
//Este import se utiliza para inicializar la base de datos.
//import Firebase from "@FirebaseDB/Firebase";

//const mainVariables = useContext(MainContext);

const App = () => {
  useEffect(() => {
    MyBudgetApp.getMyAppInfo().then((myBudgetInfo) => {
      Config.MY_BUDGET = myBudgetInfo;
    });
  }, []);

  function MyBudget() {
    const { SELECTED_THEME } = useContext(MainContext);
    return (
      <PaperProvider theme={SELECTED_THEME}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    );
  }

  return (
    <MainProvider>
      <MyBudget />
    </MainProvider>
  );
};

export default App;
