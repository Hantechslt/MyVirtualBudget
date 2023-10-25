import React, { useEffect, useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
import BudgetByPeriodCard from "@Components/BudgetByPeriodCard";
import PeriodCard from "@Components/PeriodCard";
import PeriodsApi from "@Apis/Periods";
import { MainContext } from "@Contexts/MainContext";
import BudgetByPeriodUtils from "@BudgetsByPeriod/BudgetsByPeriodUtils";
import ExpensesByBudgetUtils from "@ExpensesByBudget/ExpensesByBudgetUtils";
import LoadScreen from "@Components/LoadScreen";
import SelectModal from "@Components/SelectModal";
import Utilities from "@Utilities/Utilities";
import PeriodsUtils from "@Periods/PeriodsUtils";
import Config from "@Config/Config";
const Budgets = ({ navigation }) => {
  const theme = useTheme();
  const {
    PERIODS,
    SELECTED_PERIOD,
    BUDGETS_BY_PERIOD,
    EXPENSES_BY_BUDGET,
    updatePeriods,
    updateSelectedPeriod,
    updateBudgetsByPeriod,
    updateExpensesByBudget,
  } = useContext(MainContext);

  const budgetByPeriodUtils = new BudgetByPeriodUtils(
    BUDGETS_BY_PERIOD,
    updateBudgetsByPeriod
  );

  const expensesByBudgetUtils = new ExpensesByBudgetUtils(
    EXPENSES_BY_BUDGET,
    updateExpensesByBudget
  );
  const periodsUtils = new PeriodsUtils(PERIODS, updatePeriods);
  const [budgetByPeriodTemp, setBudgetByPeriodTemp] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState(5); // Cantidad de elementos visibles
  const [openSelectModal, setOpenSelectModal] = useState(false);

  /**
   * O: Obtener los datos de la base de datos y almacenarlos en memoria local para aumentar el rendimiento
   */
  useEffect(() => {
    console.log(Config);
    if (PERIODS === null) {
      setLoading(true);

      PeriodsApi.getPeriodList().then((periodList) => {
        if (periodList.length !== 0) {
          setPage(page + 1);
          //Obtenemos todos los periodos
          const updatePeriod = periodList.reverse();
          //Obtenemos todos los presupuestos.
          const budgetByPeriod =
            budgetByPeriodUtils.handleGetBudgetsByPeriod(updatePeriod);
          //Obtenemos todos los gastos de los presupuestos
          const ExpensesByPeriod =
            expensesByBudgetUtils.handleGetExpensesByBudget(budgetByPeriod);
          //Almacenamos la información en memoria
          updateExpensesByBudget(ExpensesByPeriod);
          updateBudgetsByPeriod(budgetByPeriod);
          const labelDescArray = periodsUtils.handleAddLabelDesc(updatePeriod);
          updatePeriods(labelDescArray);
        } else {
          navigation.navigate("CreateUpdatePeriod", {
            period: null,
          });
        }
        setLoading(false);
      });
    } else {
      updateSelectedPeriod(PERIODS[0]);
      handleRefreshBudgets(PERIODS[0].index);
    }
  }, [PERIODS]);

  /**
   * O: Refrescar la ventana cuando se hace focus en la ventana.
   */
  useFocusEffect(
    useCallback(() => {
      if (PERIODS !== null) {        
        handleRefreshBudgets(SELECTED_PERIOD.index);
      }
    }, [BUDGETS_BY_PERIOD, EXPENSES_BY_BUDGET])
  );

  /**
   * O: Buscar los presupuestos del periodo seleccionado
   * @param {*} index
   */
  const handleRefreshBudgets = (index) => {
    const updateBudgets = budgetByPeriodUtils.handleGetBudgetByPeriod(
      BUDGETS_BY_PERIOD !== null ? BUDGETS_BY_PERIOD : [],
      "periodKey",
      index
    );
    setBudgetByPeriodTemp(updateBudgets);
  };

  /**
   * O: Mostrar mas datos mientras hace scroll, esto para no sobrecargar la ventana
   * @param {*} event
   */
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
      !loading
    ) {
      setVisibleData(visibleData + 5);
    }
  };
  /**
   *
   * @param {*} period
   */
  const handleSelectedPeriod = (period) => {
    setVisibleData(5);
    handleRefreshBudgets(period.index);
    updateSelectedPeriod(period);
  };

  /**
   * Renderizado de la ventana
   */
  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          ...MainStyleSheet.frontView,
        }}
      >
        {/**Componente LoadScreen */}
        <LoadScreen loading={loading} />

        {/**Componente PeriodCard */}
        {SELECTED_PERIOD !== null ? (
          <PeriodCard
            selected={SELECTED_PERIOD}
            periods={PERIODS}
            handleOpenSelect={setOpenSelectModal.bind(null)}
          />
        ) : null}

        {/**  Componente SelectModal*/}
        {PERIODS !== null ? (
          <SelectModal
            open={openSelectModal}
            close={setOpenSelectModal.bind(null)}
            items={PERIODS}
            setValue={handleSelectedPeriod.bind(null)}
            title={"Seleccione un Periodo"}
          ></SelectModal>
        ) : null}

        {/** BudgetByPeriodCard*/}
        <ScrollView onScroll={handleScroll}>
          {budgetByPeriodTemp.length !== 0
            ? budgetByPeriodTemp.slice(0, visibleData).map((budgetByPeriod) => {
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
