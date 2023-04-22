import React, {useEffect} from 'react'
import  {Text, View, TextInput, Pressable, StyleSheet} from 'react-native'

import  globalStyles from '../styles' //importacion de estilos

import AsyncStorage from '@react-native-async-storage/async-storage';

const NuevoPresupuesto = ({
    handleNuevoPresupuesto, 
    presupuesto, 
    setPresupuesto
}) => {
  
/*
 Ejemplo de uso de AsynStorage
  useEffect(() => 
  {
    const obtenerAS = async () => //se declara una funcion asincrona ya que no sabemos con certeza cuando obtendra los datos
    {
       try {
         const valor = await AsyncStorage.getItem('prueba_as')
         console.log(JSON.parse(valor))
       } 
       catch (error) //solo mostrara errores de AsyncStorage como un metodo mal escrito, etc
       {
          console.log(error)
       }
    }
    
    obtenerAS()

  }, [])

  */
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>
        Definir presupuesto
      </Text>
      <TextInput keyboardType='numeric' placeholder='Agrega tu presupuesto EJ.300' 
         style = {styles.input}  value={presupuesto.toString()} onChangeText={setPresupuesto}
       />
      <Pressable
      onPress={()=> {handleNuevoPresupuesto(presupuesto)}} 
      style={styles.boton}>
        <Text style = {styles.botonTexto}>
            Agregar Presupuesto
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor:{
    ...globalStyles.contenedor
  },
  label:{
    textAlign:'center',
    fontSize:24,
    color:'#3B82F6',
  },
  input:{
    backgroundColor:'#f5f5f5',
    color:'black',
    padding:10,
    borderRadius:10,
    textAlign:'center',
    marginTop:30
 },
  boton:{
   marginTop:30,
   backgroundColor:'#1048a4',
   padding:10,
   borderRadius:10
  },
  botonTexto:{
    color:'white',
    textAlign:'center',
    textTransform:'uppercase',
    fontWeight:'bold'
  }
})

export default NuevoPresupuesto
