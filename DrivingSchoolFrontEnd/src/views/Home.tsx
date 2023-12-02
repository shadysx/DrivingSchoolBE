import { View, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



const Home: React.FC<any> = ({ navigation}) => {
    const [visible, setVisible] = React.useState(true);
    const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={styles.homeContainer}>
        <Text style={styles.homeText}>Accueil</Text>
        <View style={styles.homeButtonsContainer}>
            <Button 
                style={[styles.homeButton, {backgroundColor: '#8093F1'}]}
                icon="steering" 
                mode="contained" 
                onPress={() => navigation.navigate('Quizz')}
            >
                Simulation d'examen
            </Button>
            <Button 
                style={[styles.homeButton, {backgroundColor: '#b388eb'}]}
                icon="steering" 
                mode="contained" 
                onPress={() => console.log('Pressed')}
            >
                Simulation d'examen
            </Button>
            <Button 
                style={[styles.homeButton, {backgroundColor: '#F7AEF8'}]}
                icon="steering" 
                mode="contained" 
                onPress={() => console.log('Pressed')}
            >
                Simulation d'examen
            </Button>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Bienvenue sur DrivingSchoolBelgium</Dialog.Title>
            <Dialog.Content>
                <Text variant="bodyMedium">Ici tu vas pouvoir choisir ce que tu veux faire</Text>
                <Text>Pour l'instant il n'y a que le mode simulation d'examen qui est disponible mais de nombreuses fonctionnalités comme la théorie, les examen ciblés, la progressions et bien d'autres sont sur le point de voir le jour!</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
    </SafeAreaView>
  )
}
export default Home;

const styles = StyleSheet.create({
    homeContainer: {
        justifyContent: 'center',
    },
    homeText: {
        fontSize: 30,
        textAlign: 'center'
    },
    homeButtonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 50
    },
    homeButton: {
        width: Dimensions.get('window').width / 3 - Dimensions.get('window').width / 40 ,
        alignContent: 'center',
        justifyContent: 'center',
        height: 50,
    }
});