import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const QuizzSummaryBoxes = ({ quizzSummary }) => {
  return (
    <View style={styles.imageContainer}>
      {/* <Text style={styles.scoreText}>
            Votre score est : {quizzSummary?.Score}/{questionsAmount}
          </Text> */}
      {quizzSummary?.QuizzSummaryElements.map((element, index) => {
        return <QuizzSummaryElementBox element={element} key={index} />;
      })}
    </View>
  );
};

const QuizzSummaryElementBox = ({ element }) => {
  const borderColor = element.isAnswerCorrect ? "green" : "red";
  return (
    <View style={[styles.quizzSummaryElementBox]}>
      <Image
        style={[styles.image, { borderColor: borderColor }]}
        source={{ uri: "https://via.placeholder.com/640x360" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: "left",
    marginVertical: 5,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  quizzSummaryElementBox: {
    width: "25%", // For 4 images per row
    padding: 5, // Optional for spacing
  },
  image: {
    width: "100%",
    height: 100, // Set a fixed height or make it responsive
    resizeMode: "cover", // To maintain aspect ratio
    borderWidth: 5, // Set the border width
    // borderColor is set dynamically based on the answer correctness
  },
});

export default QuizzSummaryBoxes;
