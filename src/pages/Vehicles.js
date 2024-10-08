import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function Vehicles({ route }) {
  const { character } = route.params;
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchVehicleAndStarshipDetails = async () => {
      try {
        const vehicleUrls = [...character.vehicles, ...character.starships];

        const vehicleDetails = await Promise.all(
          vehicleUrls.map(async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
          })
        );
        setVehicles(vehicleDetails);
      } catch (error) {
        console.error('Erro ao buscar detalhes dos veículos/naves:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleAndStarshipDetails();
  }, [character.vehicles, character.starships]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Carregando veículos e naves...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veículos e Naves de {character.name}</Text>

      {vehicles.length === 0 ? (
        <Text style={styles.message}>Não há veículos ou naves disponíveis.</Text>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.vehicleInfo}>Nome: {item.name}</Text>
              <Text style={styles.vehicleInfo}>Modelo: {item.model}</Text>
              <Text style={styles.vehicleInfo}>Passageiros: {item.passengers}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#181818',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  vehicleInfo: {
    color: '#FFF',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    marginTop: 32,
    color: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  loadingText: {
    color: '#FFF',
    marginTop: 16,
    fontSize: 18,
  },
});
