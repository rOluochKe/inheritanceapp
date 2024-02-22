import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)}
      disabled={!isValid || loader}
    >
      {loader ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btnStyle: (backgroundColor) => ({
    height: 50,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  }),
  btnText: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18
  }
})
