import React, { createContext, useReducer } from "react";

// Define tus variables iniciales
const mainVariables = {
  PERIODS: null,
  BUDGETS_BY_PERIOD: null,
  EXPENSES_BY_BUDGET: null,
  SELECTED_PERIOD: null,
};

// Define los tipos de acciones para actualizar el contexto
const ActionTypes = {
  UPDATE_PERIODS: "UPDATE_PERIODS",
  UPDATE_BUDGETS_BY_PERIOD: "UPDATE_BUDGETS_BY_PERIOD",
  UPDATE_EXPENSES_BY_BUDGET: "UPDATE_EXPENSES_BY_BUDGET",
  UPDATE_SELECTED_PERIOD: "UPDATE_SELECTED_PERIOD",
};

const mainReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PERIODS:
      return { ...state, PERIODS: action.payload };
    case ActionTypes.UPDATE_BUDGETS_BY_PERIOD:
      return { ...state, BUDGETS_BY_PERIOD: action.payload };
    case ActionTypes.UPDATE_EXPENSES_BY_BUDGET:
      return { ...state, EXPENSES_BY_BUDGET: action.payload };
    case ActionTypes.UPDATE_SELECTED_PERIOD:
      return { ...state, SELECTED_PERIOD: action.payload };
    default:
      return state;
  }
};

const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, mainVariables);

  const updatePeriods = (newPeriods) => {
    dispatch({ type: ActionTypes.UPDATE_PERIODS, payload: newPeriods });
  };

  const updateBudgetsByPeriod = (newBudgetsByPeriod) => {
    dispatch({
      type: ActionTypes.UPDATE_BUDGETS_BY_PERIOD,
      payload: newBudgetsByPeriod,
    });
  };
  const updateExpensesByBudget = (newExpensesByBudget) => {
    dispatch({
      type: ActionTypes.UPDATE_EXPENSES_BY_BUDGET,
      payload: newExpensesByBudget,
    });
  };
  const updateSelectedPeriod = (newSelectedPeriod) => {
    dispatch({
      type: ActionTypes.UPDATE_SELECTED_PERIOD,
      payload: newSelectedPeriod,
    });
  };
  return (
    <MainContext.Provider
      value={{
        ...state,
        updatePeriods,
        updateBudgetsByPeriod,
        updateExpensesByBudget,
        updateSelectedPeriod,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
