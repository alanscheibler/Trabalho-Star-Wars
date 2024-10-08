import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/SWCard';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Desenvolvedor</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Nome: Alan Marcelo Scheibler</Text>
        <Text style={styles.text}>RA: 1130556</Text>
        <Text style={styles.text}>E-mail: 1130556@atitus.edu.br</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FB930F',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#303030',
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8,
  },
});
