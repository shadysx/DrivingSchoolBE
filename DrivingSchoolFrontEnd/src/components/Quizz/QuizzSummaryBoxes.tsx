import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { QuizzSummary } from "../../models/QuizzSummary";
import { QuizzSummaryElement } from "../../models/QuizzSummaryElement";
import { Theme } from "../../constants";

interface QuizSummaryBoxesProps {
  quizzSummary: QuizzSummary
}

const QuizzSummaryBoxes: React.FC<QuizSummaryBoxesProps>  = ({ quizzSummary }) => {
  // TODO
  const newTab = quizzSummary?.QuizzSummaryElements 
  ? [...quizzSummary.QuizzSummaryElements, ...quizzSummary.QuizzSummaryElements, ...quizzSummary.QuizzSummaryElements, ...quizzSummary.QuizzSummaryElements] 
  : [];

  return (
    <View style={styles.imageContainer}>
      {/* <Text style={styles.scoreText}>
            Votre score est : {quizzSummary?.Score}/{questionsAmount}
          </Text> */}
      {newTab.map((element, index) => {
        return <QuizzSummaryElementBox element={element} key={index} />;
      })}
    </View>
  );
};

interface QuizzSummaryProps {
  element: QuizzSummaryElement;
}

const QuizzSummaryElementBox: React.FC<QuizzSummaryProps> = ({ element }) => {
  const borderColor = element.IsAnswerCorrect ? Theme.secondary : "red";
  return (
    <View style={[styles.quizzSummaryElementBox]}>
      <Image
        style={[styles.image, { borderColor: borderColor }]}
        source={{ uri: element.ImageUri}}
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
