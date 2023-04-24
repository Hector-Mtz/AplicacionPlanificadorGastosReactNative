import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({
    gastos,
    setModal,
    setGasto,
    filtro,
    gastosFiltrados
}) => {

  return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>Gastos</Text>
        
         {
            //si no esta vacio filtro, iterara sobre los gastos filtrados
           filtro ?   gastosFiltrados.map(gasto => (
              <Gasto gasto={gasto} key={gasto.id} setModal={setModal} setGasto={setGasto} />
           ))
           //sino es asi iterara sobre gastos
         :  gastos.map(gasto => (
            <Gasto gasto={gasto} key={gasto.id} setModal={setModal} setGasto={setGasto} />
          ))
         }

         {(gastos.length === 0  || (gastosFiltrados.length == 0 && !!filtro /*gastos filtrados debe estar vacio pero tener un filtro aplicado*/ 
           )) && (
            <Text style = {styles.noGastos}>No Hay Gastos</Text>
         )}
    </View>
  )
}

const styles = StyleSheet.create({
   contenedor:{
      marginTop:20,
      marginBottom:100
   },
   titulo:{
     color:'#64748B',
     fontSize:30,
     textAlign:'center',
     fontWeight:'700',
     marginTop:20
   },
   noGastos:{
    marginTop:20,
    textAlign:'center',
    fontSize:20,
    marginVertical:20
   }
})

export default ListadoGastos
