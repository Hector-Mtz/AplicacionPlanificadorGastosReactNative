import React from 'react'
//rafce  comando para constuir un componente react
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
const Header = () => {
  return (
    <SafeAreaView>
      <View >
          <Text style={styles.textHeader}>
              Planificador de gastos
          </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    textHeader:{
      textAlign:'center',
      fontSize:30,
      color:'white',
      textTransform:'uppercase',
      fontWeight:'bold',
      paddingVertical:20
    }
})

export default Header
