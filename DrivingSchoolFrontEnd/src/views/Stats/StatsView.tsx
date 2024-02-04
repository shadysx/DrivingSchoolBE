import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react"
import {
  LineChart,
} from "react-native-chart-kit";import { Theme } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const StatsView = ({scores, mean}) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: scores ?? [0], // Prevent crash when the score need time to lead TODO handle loading
        color: (opacity = 1) => Theme.secondary,
        strokeWidth: 2 // optional
      }
    ],
    legend: [`20 Derniers tests (Moyenne ${mean}/50)`] // optional
    
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width + Dimensions.get("window").width * 0.1}
        height={256}
        verticalLabelRotation={0}
        bezier
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={true}
        chartConfig={{
          backgroundGradientFrom: Theme.white,
          backgroundGradientTo: Theme.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) =>  Theme.secondary,
          labelColor: (opacity = 1) => Theme.secondary,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            stroke: "#fff"
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.white,
    marginLeft: -Dimensions.get("window").width * 0.05
  },
});

export default StatsView;
