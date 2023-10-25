import React, { useState, useEffect } from "react";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  useTheme,
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
  List,
  Tooltip,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { View, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
import Config from "@Config/Config";
const Summary = ({ navigation }) => {
  const theme = useTheme();

  const screenWidth = Dimensions.get("window").width;

  const [labels, setLabels] = useState([]);
  const [values, setData] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  useEffect(() => {
    let labelsArray = [];
    let DataArray = [];

    for (let index = 0; index < 30; index++) {
      labelsArray.push(index);
      DataArray.push(Math.random() * 100);
    }

    setLabels(labelsArray);
    setData(DataArray);
  }, []);

  const handleDataPointClick = (point) => {
    console.log(point);
    setSelectedPoint(point);
    setTooltipVisible(true);
  };

  const closeTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <ScrollView horizontal={true}>
      <View
        style={{
          ...MainStyleSheet.backView,
          backgroundColor: theme.colors.background,
          width: Dimensions.get("window").width * 2,
        }}
      >
        <View
          style={{
            ...MainStyleSheet.frontView,
            backgroundColor: theme.colors.background,
            width: Dimensions.get("window").width * 2,
          }}
        >
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="keyboard-backspace"
                onPress={() => navigation.goBack()}
                size={30}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {}}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Avatar.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={Config.SUMMARY_ICON}
                  size={Config.ICON_SIZE}
                  style={{
                    color: theme.colors.shadow,
                  }}
                />
              )}
            />
            <Text
              style={{ color: theme.colors.onBackground }}
              variant="headlineMedium"
            >
              Resumen General
            </Text>
          </View>
          <Divider
            style={{
              marginVertical: "3%",
            }}
          />
          {values.length !== 0 ? (
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: values,
                    //withDots: false, //pone los puntos
                  },
                ],
              }}
              width={Dimensions.get("window").width * 2} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              onDataPointClick={({ value, dataset, getColor, x, y }) => {
                alert(`Valor: ${value}`);
              }}
              /*renderDotContent={({ x, y, index, indexData }) => {
                return (
                  <View
                    style={{ position: "absolute", top: y - 30, left: x - 15 }}
                  >
                    <Text>{indexData}</Text>
                  </View>
                );
              }}*/
              chartConfig={{
                backgroundColor: theme.colors.primary,
                backgroundGradientFrom: theme.colors.secondaryContainer,
                backgroundGradientTo: theme.colors.secondaryContainer,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 17,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: theme.colors.onPrimaryContainer,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 7,
              }}
            />
          ) : null}
        </View>
        {selectedPoint && (
          <Tooltip
            visible={tooltipVisible}
            onDismiss={closeTooltip}
            content={
              <Text style={{ color: theme.colors.primary }}>
                Valor: {selectedPoint.y}
              </Text>
            }
            style={{
              position: "absolute",
              top: selectedPoint.y - 40,
              left: selectedPoint.x - 20,
            }}
          >
            <View />
          </Tooltip>
        )}
      </View>
    </ScrollView>
  );
};

export default Summary;
