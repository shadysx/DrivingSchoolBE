import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../auth/Auth";
import { Theme } from "../constants";
import { Question, QuizzSummaryElement } from "../interfaces/interfaces";

const FavoritesView = ({ navigation }) => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user, "User");
  });
  return (
    <ScrollView style={styles.container}>
      {user.savedQuestions.map((question, index) => {
        return (
          <FavoriteLine
            key={index}
            question={question}
            navigation={navigation}
          />
        );
      })}
    </ScrollView>
  );
};

interface FavoriteLineProps {
  question: Question;
  navigation: any;
}

const FavoriteLine: React.FC<FavoriteLineProps> = ({
  question,
  navigation,
}) => {
  const handlePress = () => {
    const quizzSummaryElement: QuizzSummaryElement = {
      question: question,
      userAnswerIndex: -1,
      isAnswerCorrect: true,
    };
    console.log(JSON.stringify(quizzSummaryElement, null, 4));
    navigation.navigate("QuizzSummaryDetailView", {
      element: quizzSummaryElement,
    });
    // navigation.navigate("HomeView");
  };
  return (
    <TouchableOpacity
      style={styles.lineContainer}
      onPress={() => handlePress()}
    >
      <View style={styles.leftContainer}>
        <Text>{question.text}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: question.imageUri }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: Theme.white,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    // borderRadius: 5,
    // // Shadow for iOS
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // // Elevation for Android
    // elevation: 5,
  },
  leftContainer: {
    flex: 1,
    margin: 5,
  },
  imageContainer: {},
  image: {
    width: 120,
    height: "100%",
  },
});

export default FavoritesView;
