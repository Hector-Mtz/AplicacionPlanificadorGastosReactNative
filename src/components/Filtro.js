import React, {useEffect} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import globalStyles from '../styles'

const Filtro = (
    {
        setFiltro,
        filtro,
        gastos,
        setGastosFiltrados
    }
) => {

    useEffect(()=> 
    {
        if(filtro === '') //si el filtro no lleva nada dejara el arreglo vacio
        {
          setGastosFiltrados([])
        }
        else
        {
           const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro) //tomara los gastos que tengan esa categoria del filtro

           setGastosFiltrados(gastosFiltrados)
        }
    },[filtro])

  return (
     <View style={styles.contenedor}>
        <Text style = {styles.label}>Filtrar gastos</Text>
        <Picker
          selectedValue={filtro} 
          onValueChange={(valor)=> {
            setFiltro(valor)
          }}
        >
           <Picker.Item label='-- SELECCIONE --' value="" color='black'  />
           <Picker.Item label='Ahorro' value="ahorro" color='black'  />
           <Picker.Item label='Comida' value="comida" color='black'  />
           <Picker.Item label='Casa' value="casa" color='black'  />
           <Picker.Item label='Gastos Varios' value="gasto" color='black'  />
           <Picker.Item label='Entrenenimiento' value="entretenimiento" color='black'  />
           <Picker.Item label='Salud' value="salud" color='black'  />
           <Picker.Item label='Sucripciones' value="suscripciones"  color='black' />
        </Picker>
     </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor,
        transform:[{translateY:0}],
        marginTop:70
    },
    label:{
       fontSize:22,
       fontWeight:'900',
       color:'#64748B'
    }
})

export default Filtro
