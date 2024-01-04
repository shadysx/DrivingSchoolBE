import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ContactView = () => {
  // Define your contact information
  const contactInfo = {
    email: 'laurent.kl1996@gmail.com',
    phone: '+1234567890',
    instagram: '@ShadySx',
  };

  // Function to handle email link
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contactInfo.email}`);
  };

  // Function to handle phone link
  const handlePhonePress = () => {
    Linking.openURL(`tel:${contactInfo.phone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Contactez nous</Text>
      
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.contactText}>Email: {contactInfo.email}</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={handlePhonePress}>
        <Text style={styles.contactText}>Phone: {contactInfo.phone}</Text>
      </TouchableOpacity> */}

      <Text style={styles.contactText}>Instagram: {contactInfo.instagram}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
  },
});

export default ContactView;
