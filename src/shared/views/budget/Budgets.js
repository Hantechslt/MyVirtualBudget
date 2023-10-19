import React from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import MainStyleSheet from "@Styles/MainStyleSheet";
import SpendingCard from "@Components/SpendingCard";
import PeriodCard from "@Components/PeriodCard";

const Budgets = () => {
    
  const theme = useTheme();

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
        <PeriodCard />
        <ScrollView>
          {[1, 2, 3, 4, 5].map((item) => {
            return <SpendingCard />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default Budgets;
