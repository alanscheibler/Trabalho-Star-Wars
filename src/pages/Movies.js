import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export default function Movies({ route }) {
  const { character } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await Promise.all(
          character.films.map(async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
          })
        );
        setMovies(movieDetails);
      } catch (error) {
        console.error('Erro ao buscar detalhes dos filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [character.films]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filmes de {character.name}</Text>

      {movies.length === 0 ? (
        <Text style={styles.message}>Não há filmes disponíveis.</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.movieInfo}>
                <Text style={styles.label}>Título: </Text>
                {item.title}
              </Text>
              <Text style={styles.movieInfo}>
                <Text style={styles.label}>Diretor: </Text>
                {item.director}
              </Text>
              <Text style={styles.movieInfo}>
                <Text style={styles.label}>Data de Lançamento: </Text>
                {item.release_date}
              </Text>
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
  movieInfo: {
    color: '#FFF',
    fontSize: 16,
    paddingBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#FFF',
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
