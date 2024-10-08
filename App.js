import { StyleSheet, StatusBar,TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';

import Home from './src/pages/Home';
import Character from './src/pages/Character';
import Vehicles from './src/pages/Vehicles';
import Movies from './src/pages/Movies'
import About from './src/pages/About';

const Stack = createNativeStackNavigator();

const sound = async () => {
  const { sound } = await Audio.Sound.createAsync(require('./src/sounds/lightSaber.mp3'));
  await sound.playAsync();
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Stack.Navigator initialRouteName='Home'
      screenOptions={{
        headerTitleAlign:'center',
        headerStyle: {
          backgroundColor: '#FB930F'
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight:'bold',
          textAlign: 'center',
          flex: 1,
        }
      }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => {sound(), navigation.navigate('About')}}>
                <Text style={{ color: '#FFF', marginRight: 16 }}>Sobre</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name='Character'
        component={Character}
        />
        <Stack.Screen name='Movies'
        component={Movies}
        />
        <Stack.Screen name='Vehicles'
        component={Vehicles}
        />
        <Stack.Screen name='About'
        component={About}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
