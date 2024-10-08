import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Card({character, action}) {
  return (
<TouchableOpacity style={styles.container} onPress={action}>
    <View style = {styles.containerInfo}>
      <Text style = {styles.textInfo}>{character.name}</Text>
    </View>
</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    width: '100%',
    height: 64,
    borderWidth: 1, 
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    borderColor: '#FFF',

  },
  containerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    color: '#FFF',
  },

  textInfo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  }
})