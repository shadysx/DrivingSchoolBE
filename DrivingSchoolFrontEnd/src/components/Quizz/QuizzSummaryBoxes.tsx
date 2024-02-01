import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Theme } from "../../constants";
import { QuizzSummary, QuizzSummaryElement } from "../../interfaces/interfaces";
import { TouchableOpacity } from "react-native-gesture-handler";

interface QuizSummaryBoxesProps {
  quizzSummary: QuizzSummary;
  navigation: any;
}

const QuizzSummaryBoxes: React.FC<QuizSummaryBoxesProps> = ({
  quizzSummary,
  navigation,
}) => {
  return (
    <View style={styles.imagesContainer}>
      {quizzSummary?.quizzSummaryElements?.map((element, index) => (
        <QuizzSummaryElementBox
          element={element}
          navigation={navigation}
          key={index}
        />
      ))}
    </View>
  );
};

interface QuizzSummaryElementBoxProps {
  element: QuizzSummaryElement;
  navigation: any;
}

const QuizzSummaryElementBox: React.FC<QuizzSummaryElementBoxProps> = ({
  element,
  navigation,
}) => {
  const borderColor = element.isAnswerCorrect ? Theme.secondary : "red";

  const handlePress = () => {
    navigation.navigate("QuizzSummaryDetailView", { element });
  };

  return (
    <View style={styles.quizzSummaryElementBox}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Image
          style={[styles.image, { borderColor: borderColor }]}
          source={{ uri: element.question.imageUri }}
        />
      </TouchableOpacity>
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
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  quizzSummaryElementBox: {
    width: "25%", // For 4 images per row
    padding: 4, // Optional for spacing
  },
  image: {
    width: "100%",
    borderRadius: 10,
    height: 100, // Set a fixed height or make it responsive
    resizeMode: "cover", // To maintain aspect ratio
    borderWidth: 3, // Set the border width
    // borderColor is set dynamically based on the answer correctness
  },
});

export default QuizzSummaryBoxes;
