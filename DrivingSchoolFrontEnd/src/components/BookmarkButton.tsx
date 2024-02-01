import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { QuizzSummaryElement } from '../interfaces/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../auth/Auth';
import { API, Theme } from '../constants';

const BookmarkButton = ({route, user}) => {
    const params = route.params as {element: QuizzSummaryElement}; 
    const initialIcon = user.savedQuestions && user.savedQuestions.some(q => q.id === params.element.question.id) 
    ? "bookmark" 
    : "bookmark-outline";
    const [icon, setIcon] = useState(initialIcon);

    
    const handlePress = async () => {
      if (user.savedQuestions === null) {
        user.savedQuestions = [];
      }
    
      const questionIndex = user.savedQuestions.findIndex(q => q.id === params.element.question.id);
    
      if (questionIndex >= 0) {
        // Question already exists, remove it
        user.savedQuestions.splice(questionIndex, 1);
        setIcon("bookmark-outline");
      } else {
        // Question doesn't exist, add it
        user.savedQuestions.push(params.element.question);
        setIcon("bookmark");
      }
    
      try {
        const result = await axios.put(`${API}Update/${user.id}`, JSON.stringify(user), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        // Assuming result.data contains the updated user data
        await AsyncStorage.setItem("@user", JSON.stringify(result.data));
      } catch (error) {
        console.error('Error making PUT request:', error);
      } finally {
      }
    };

    return (
      <IconButton
      icon={icon}
        iconColor={Theme.secondary}
        size={30}
        onPress={handlePress}
      />
    );
}

export default BookmarkButton