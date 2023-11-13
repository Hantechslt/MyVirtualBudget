import React, { useState, useEffect } from "react";

import { useTheme } from "react-native-paper";

import { View, ScrollView } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
import Config from "@Config/Config";
import TipsCard from "@Components/TipsCard";
const FinancialTips = () => {
  const [tips, setTips] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const tipsArray = Config.MY_BUDGET[0].FinancialTips.filter(
      (tip) => tip !== null
    );
    console.log(tipsArray);
    setTips(tipsArray);
  }, []);

  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView>
        <View
          style={{
            ...MainStyleSheet.frontView,
            backgroundColor: theme.colors.background,
          }}
        >
          {tips.length !== 0
            ? tips.map((tip, i) => {
                return <TipsCard key={i} tip={tip} />;
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};
export default FinancialTips;
