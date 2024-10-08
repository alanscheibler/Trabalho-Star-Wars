import React from 'react';
import { StyleSheet, TouchableOpacity, View,Text } from 'react-native';
import PropTypes from 'prop-types';

export default function CButton({IconComponent, onPress, style, iconStyle, text, textStyle}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.contentContainer}>
        {IconComponent ? (
            <IconComponent
            width={32}
            height={32}
            style={[styles.icon, iconStyle]}
            />
        ) : (
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

CButton.propTypes = {
  IconComponent: PropTypes.elementType,
  onPress: PropTypes.func,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  iconColor: PropTypes.string,
};


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D68A0C',
        padding: 8,
        borderRadius: 8,
        marginVertical: 8,
    },

    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText:{
        color: '#FFF',
        fontSize: 16,
        fontWeight:'bold'
    },
    icon: {
        tintColor: '#FFF',
    }
});