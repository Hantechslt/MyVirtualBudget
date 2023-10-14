import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import CustomTheme from "./src/themes/CustomTheme"; // Asegúrate de ajustar la ruta correcta
import Budgets from "@Views/Budgets";


const App=()=>{
 return (
   <PaperProvider theme={CustomTheme.DarkTheme}>
     <Budgets />
   </PaperProvider>
 );
}

export default App;

