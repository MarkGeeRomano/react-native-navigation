import React from 'react'
import { View } from 'react-native'
import styles from '../../styles/cardSection'

const CardSection = (props) => (
  <View style={[styles.constainerStyle, props.style]}>
    {props.children}
  </View>
)

export { CardSection }