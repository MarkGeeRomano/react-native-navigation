import React from 'react'
import { Text, Modal, View } from 'react-native'
import { CardSection } from './CardSection'
import { Button } from './Button'
import styles from '../../styles/confirm'

const Confirm = (props) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => { }}
      transparent
      visible={props.visible}
    >
      <View style={styles.containerStyle}>
        <CardSection style={styles.cardSectionStyle}>
          <Text style={styles.textStyle}>
            {props.children}
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={props.onAccept}>Yesh</Button>
          <Button onPress={props.onReject}>No</Button>
        </CardSection>
      </View>
    </Modal>
  )
}

export { Confirm }