import React, { useState, useEffect } from "react";
import { DataTable, Text } from "react-native-paper";
import { View, ScrollView } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
const ExpensesByBudget = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = useState([
    {
      key: 1,
      name: "Compra en  ",
      calories: "20/20/2023",
      fat: "20.000",
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View>
      <DataTable>
        <View style={{ ...MainStyleSheet.viewRow }}>
          <View style={{ width: "70%", borderWidth: 1 }}>
            <Text numberOfLines={1}>{"Detalle"}</Text>
          </View>
          <View style={{ width: "30%", borderWidth: 1 }}>
            <Text numberOfLines={1}>{"Monto"}</Text>
          </View>
        </View>

        {items.slice(from, to).map((item) => (
          <View style={{ ...MainStyleSheet.viewRow }}>
            <View style={{ width: "70%", borderWidth: 1 }}>
              <Text numberOfLines={2}>{item.name}</Text>
              <Text numberOfLines={2}>{item.name}</Text>
            </View>
            <View style={{ width: "30%", borderWidth: 1 }}>
              <Text numberOfLines={1}>{item.fat}</Text>
              <Text numberOfLines={1}>{item.fat}</Text>
            </View>
          </View>
        ))}
      </DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Gastos por pagina"}
      />
    </View>
  );
};

export default ExpensesByBudget;
