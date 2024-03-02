import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/Auth";
import { API, Theme } from "../constants";
import { Question, QuizzSummaryElement } from "../interfaces/interfaces";
import CachedImage from "../components/CachedImage";

const FavoritesView = ({ navigation }) => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuestionsFromApi = async () => {
      console.log("fetching");
      try {
        const response = await fetch(
          API + "question/getall"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let responseData: Question[] = await response.json();
        responseData = responseData.sort(() => Math.random() - 0.5);
        setQuestions(responseData);
      } catch (error: any) {
        // setError(error);
      } 
    };
    fetchQuestionsFromApi();
  },[]);

  const renderItem = ({ item }) => (
    <FavoriteLine question={item} navigation={navigation} />
  );

  return (
          <FlatList
          data={user.savedQuestions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
        <View style={styles.image}>
          <CachedImage url={ question.thumbnailUri } />
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
  },
  leftContainer: {
    flex: 1,
    margin: 5,
  },
  imageContainer: {
    borderRadius: 10
  },
  image: {
    width: 120,
    height: "100%",
    borderRadius: 10
  },
});

export default FavoritesView;
