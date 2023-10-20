import React, { useEffect, useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
import BudgetByPeriodCard from "@Components/BudgetByPeriodCard";
import PeriodCard from "@Components/PeriodCard";
import Periods from "@Apis/Periods";
import { MainContext } from "@Contexts/MainContext";

const Budgets = () => {
  const theme = useTheme();
  const mainVariables = useContext(MainContext);
  const [periodList, setPeriodList] = useState([]);
  const [periodSelected, setPeriodSelected] = useState(false);

  const [BudgetByPeriod, setBudgetByPeriod] = useState([]);

  useEffect(() => {
    //if (mainVariables.PERIODS === null) {
    Periods.getPeriodList(mainVariables).then((periodList) => {
      let datReverse = periodList.reverse();
      let budgets = [];
      for (let key in datReverse[0].BudgetByPeriod) {
        let budget = datReverse[0].BudgetByPeriod[key];        
        budgets.push(budget);
      }
      setBudgetByPeriod(budgets.reverse());
      //Agregar al contexto para optimizar consultas
      mainVariables.PERIODS = datReverse;
      mainVariables.SELECTEDPERIOD = datReverse[0];

      setPeriodList(datReverse);
      setPeriodSelected(datReverse[0]);
    });
    // }
  }, []);
  useFocusEffect(
    useCallback(() => {
      console.log(mainVariables);
    }, [])
  );

  const handleReloadBudgets = (item) => {
    setPeriodSelected(item);
  };

  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.shadow,
      }}
    >
      <View
        style={{
          ...MainStyleSheet.frontView,
        }}
      >
        {periodSelected !== null ? (
          <PeriodCard
            period={periodSelected}
            selectedPeriod={handleReloadBudgets.bind(null)}
          />
        ) : null}

        <ScrollView>
          {BudgetByPeriod.length !== 0
            ? BudgetByPeriod.map((budgetByPeriod) => {
                return (
                  <BudgetByPeriodCard
                    key={budgetByPeriod.index}
                    budget={budgetByPeriod}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
};
export default Budgets;
