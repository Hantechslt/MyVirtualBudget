//Estructura para almacenar los gastos de los presupuestos. 
BudgetSpending = {
  UserId: {
    Month: {
      UniqueID: {
        amount: 187000,
        budgetTypekey: 1655351389902,
        date: "15/06/2022",
        spendingName: "U YULI",
        state: true,
      },
    },
  },
};
//Estructura de los presupuestos. 
Budget = {
  UserId: {
    Month: {
      UniqueID: {
        amount: 400000,
        budgetName: "GASTOS CASA",               
        state: true,
        used: 161080,
      },
    },
  },
};

/**
/**
 * getBudgetsList = () => {
  const data = [];
  return get(dbRef.orderByChild('tuCampo').limitToLast(10))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          data.push(childSnapshot.val());
        });
      }
    })
    .then(() => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

 */ */