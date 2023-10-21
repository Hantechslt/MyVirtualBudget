import React, { useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
import BudgetByPeriodCard from "@Components/BudgetByPeriodCard";
import PeriodCard from "@Components/PeriodCard";
import Periods from "@Apis/Periods";
import { MainContext } from "@Contexts/MainContext";
import BudgetByPeriodUtils from "@Budgets/BudgetByPeriodUtils";

const Budgets = () => {
  const theme = useTheme();

  const {
    PERIODS,
    SELECTED_PERIOD,
    BUDGETS_BY_PERIOD,
    updatePeriods,
    updateSelectedPeriod,
    updateBudgetsByPeriod,
  } = useContext(MainContext);

  const budgetByPeriodUtils = new BudgetByPeriodUtils(
    BUDGETS_BY_PERIOD,
    updateBudgetsByPeriod
  );

  useEffect(() => {
    if (PERIODS === null) {
      Periods.getPeriodList().then((periodList) => {
        const periodsReverse = periodList.reverse();
        updatePeriods(periodsReverse);
      });
    } else {
      console.log("HUBO UN CAMBIO DE ESTADO EN PERIODS");      
      updateSelectedPeriod(PERIODS[0]);
      budgetByPeriodUtils.handleGetBudgetByPeriod(PERIODS[0]);
    }
  }, [PERIODS]);

  useFocusEffect(
    useCallback(() => {
      if (PERIODS !== null) {
        budgetByPeriodUtils.handleGetBudgetByPeriod(PERIODS[0]);
      }
    }, [])
  );

  const handleChangePeriod = (periodSelected) => {
    budgetByPeriodUtils.handleGetBudgetByPeriod(periodSelected);
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
        {SELECTED_PERIOD !== null ? (
          <PeriodCard handleChangePeriod={handleChangePeriod.bind(null)} />
        ) : null}

        <ScrollView>
          {BUDGETS_BY_PERIOD !== null
            ? BUDGETS_BY_PERIOD.map((budgetByPeriod) => {
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
