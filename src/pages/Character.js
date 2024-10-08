import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import SWButton from '../components/SWButton';
import Card from '../components/SWCard';

import { Audio } from 'expo-av';

const sound = async () => {
  const { sound } = await Audio.Sound.createAsync(require('../sounds/lightSaber.mp3'));
  await sound.playAsync();
};

export default function Character({ route, navigation }) {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{character.name}</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          <Text style={styles.label}>Altura: </Text>
          {character.height}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Peso: </Text> 
          {character.mass}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Cor do Cabelo: </Text>
          {character.hair_color}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Cor da Pele: </Text>
          {character.skin_color}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Cor dos Olhos:  </Text>
          {character.eye_color}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Gênero:  </Text>
          {character.gender}
        </Text>
        <View style={styles.rowContainer}>
          <SWButton
            text="Veiculos"
            onPress={() =>{sound(), navigation.navigate('Vehicles', { character })}} 
          />
          <SWButton
            text="Filmes"
            onPress={() => {sound(), navigation.navigate('Movies', { character })}} 
          />
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#181818',
    alignItems: 'center',
    padding: 24,
  },

  card:{
    alignItems: 'flex-start',
    backgroundColor: '#303030',
    padding: 16,
    borderRadius: 8

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF'
  },

  text: {
    color: '#FFF',
    fontSize: 16,
    paddingBottom: 8,
  },
  label:{
    fontWeight: 'bold',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 64,
  },
});
