import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../auth/Auth';
import { Button } from 'react-native-paper';
import { Theme } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const LoginView = () => {
  const { user, handleGoogleSignIn, handleLogout, checkUserInAsyncStorage } = useAuth();

  useEffect(() => {
    console.log('DummyValue ');
  });

  return (
    <ImageBackground
    source={require('../../assets/drivingSchool1.webp')} // Replace with your image path
    style={styles.backgroundGradient}
  >
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.connectionButton}
            icon="google"
            mode="contained"
            buttonColor={Theme.primary}
            onPress={() => handleGoogleSignIn()}
          >
            Se connecter avec Google
          </Button>
          <Button
            style={styles.connectionButton}
            icon="apple"
            mode="contained"
            buttonColor={'black'}
            onPress={() => console.log('Pressed')}
          >
            Se connecter avec Apple
          </Button>
        </View>
        {user && <Text>Welcome {user.userName}</Text>}
      </SafeAreaView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  connectionButton: {
    width: '80%',
    marginBottom: 10,
  },
  backgroundGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default LoginView;