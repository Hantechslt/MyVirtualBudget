import React, { useEffect, useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, ScrollView, Text } from "react-native";
import { useTheme, Button } from "react-native-paper";
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

  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState(5); // Cantidad de elementos visibles
  const [openSelectModal, setOpenSelectModal] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [hasPeriod, setHasPeriod] = useState(true);

  /**
   * O: Obtener los datos de la base de datos y almacenarlos en memoria local para aumentar el rendimiento
   */
  useEffect(() => {
    if (PERIODS.length === 0) {
      setLoading(true);
      updateSelectedPeriod([]);
      setSelectedPeriod([]);
      PeriodsApi.getPeriodList().then((periodList) => {
        console.log("Volvi a passar por aqui");
        if (periodList.length !== 0) {
          setPage(page + 1);
          //Obtenemos todos los periodos y los ordenamos por el index
          const updatePeriod = Utilities.sortArrayByIndex(periodList, "index");
          //Obtenemos todos los presupuestos.
          const budgetByPeriod =
            budgetByPeriodUtils.handleGetBudgetsByPeriod(updatePeriod);
          //Obtenemos todos los gastos de los presupuestos
          const ExpensesByPeriod =
            expensesByBudgetUtils.handleGetExpensesByBudget(budgetByPeriod);
          //Agregar label y descripción al arreglo de periodo
          const addLabelDescPeriod =
            periodsUtils.handleAddLabelDesc(updatePeriod);

          //Almacenamos la información en memoria
          setSelectedPeriod([addLabelDescPeriod[0]]);

          updateSelectedPeriod([...SELECTED_PERIOD, addLabelDescPeriod[0]]);
          updateExpensesByBudget(ExpensesByPeriod);
          updateBudgetsByPeriod(budgetByPeriod);
          updatePeriods(addLabelDescPeriod);
        } else {
          setHasPeriod(false);
          /*navigation.navigate("CreateUpdatePeriod", {
            period: null,
          });*/
        }
        setLoading(false);
      });
    } else {
      setHasPeriod(true);
      setSelectedPeriod(SELECTED_PERIOD);
      handleRefreshBudgets(SELECTED_PERIOD[0].index);
    }
  }, [PERIODS]);

  /**
   * O: Refrescar la ventana cuando se hace focus en la ventana.
   */
  useFocusEffect(
    useCallback(() => {
      if (PERIODS.length !== 0) {
        handleRefreshBudgets(selectedPeriod[0].index);
      }
    }, [BUDGETS_BY_PERIOD, EXPENSES_BY_BUDGET])
  );

  /**
   * O: Buscar los presupuestos del periodo seleccionado
   * @param {*} index
   */
  const handleRefreshBudgets = (index) => {
    const updateBudgets = Utilities.filterArrayByProperty(
      BUDGETS_BY_PERIOD,
      "periodKey",
      index
    );
    setBudgets(updateBudgets);
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
    if (period.index !== selectedPeriod.index) {
      handleRefreshBudgets(period.index);
      setSelectedPeriod([period]);
      updateSelectedPeriod([period]);
    }
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
        {!hasPeriod ? (
          <Button
            mode="contained-tonal"
            onPress={() => {
              navigation.navigate("CreateUpdatePeriod", {
                period: null,
              });
            }}
            style={MainStyleSheet.primaryButton}
          >
            Nuevo periodo
          </Button>
        ) : null}
        {/**Componente PeriodCard */}
        {selectedPeriod.length !== 0 ? (
          <PeriodCard
            selected={selectedPeriod[0]}
            periods={PERIODS}
            handleOpenSelect={setOpenSelectModal.bind(null)}
          />
        ) : null}

        {/**  Componente SelectModal*/}
        {PERIODS.length !== 0 ? (
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
          {budgets.length !== 0
            ? budgets.slice(0, visibleData).map((budget) => {
                return (
                  <BudgetByPeriodCard key={budget.index} budget={budget} />
                );
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
};
export default Budgets;
