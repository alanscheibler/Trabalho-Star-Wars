import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SWCard from '../components/SWCard';
import Character from './Character';
import { Audio } from 'expo-av';

const sound = async () => {
  const { sound } = await Audio.Sound.createAsync(require('../sounds/lightSaber.mp3'));
  await sound.playAsync();
};

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const navigation = useNavigation();

  useEffect(()=> {
    const fetchCharacters = async() => {
      try { 
        const charactersIds = [1, 4, 14, 20, 13];
        const charactersRequest = charactersIds.map(id => axios.get(`https://swapi.dev/api/people/${id}/`));
        const responses = await Promise.all(charactersRequest);

        const selectedCharacters = responses.map(response => response.data);
         setCharacters(selectedCharacters);
      } catch(error){
        Alert.alert('erro ao buscar personagens', error.message);
      }
    };
    fetchCharacters();
  }, []);

  const goToCharacter = (character) => {
    navigation.navigate('Character', {character});
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={({item}) => (
          <SWCard character={item} action={()=> {sound(),goToCharacter(item)}}/>
        )}
        keyExtractor = {(item)=> item.name}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#FFF',
  },

})