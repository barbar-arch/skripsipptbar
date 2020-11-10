import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#ececec',
    height: 1
  }
})

const Separator = () => {
  return <View style={styles.separator} />
}

export default Separator
