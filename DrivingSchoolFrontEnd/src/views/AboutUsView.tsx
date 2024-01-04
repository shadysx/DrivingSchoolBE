import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
            Bienvenue sur DrivingSchool Belgique, cette application est un projet étudiant qui à pour but de 
            vous aider à préparer votre permis de conduire en Belgique. 
            {'\n'}{'\n'}
            Cette application est totalement gratuite pendant la durée de son développement, ensuite un système de 
            publicité sera mis en place pour permettre de financer les serveurs et les mises à jour.
            {'\n'}{'\n'}
            Si vous avez des questions ou des suggestions n'hésitez pas à nous contacter (voir page contact).
            {"\n"}{"\n"}
            Toutes les contributions sont les bienvenue, si vous voulez contribuer au projet il vous suffit de me contacter.
            {"\n"}{"\n"}
            Bonne chance pour votre permis !
          {/* Continue with your about text */}
        </Text>
        {/* Add more content as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#333', // Adjust the color as needed
    lineHeight: 24, // Adjust line height for readability
  },
});

export default AboutPage;
