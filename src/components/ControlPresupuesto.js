import React, {useState, useEffect} from 'react'
import {Text, View, Image, StyleSheet, Pressable, Alert} from 'react-native'
import  globalStyles from '../styles'
import { formatearCantidad } from '../helpers'
import CircularProgress from 'react-native-circular-progress-indicator'

const ControlPresupuesto = ({
    presupuesto,
    gastos,
    resetearApp
   }) =>
 {

  const [disponible, setDisponible] = useState(0);
  const [gastosTotales, setGastosTotales] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    //Metodo reduce se le pasa un arreglo y se le va a indicar en que parte va a encontrar la cantidad
    //en este caso como son objetos se le indica en que parte del objeto o en que seccion se encuentra la cantidad
    //primero se le pasa la variable temporal en este caso gasto y luego pasa el elemento del arreglo a iterar
    //el arrowFunction retorna el valor al total
    //el total es el acumulado por eso esta despues del +, asi se va acumulando los valores del arreglo
      const totalGastado = gastos.reduce((total, gasto)=> Number(gasto.cantidad) + total,0) //va a recorrer el arreglo de gastos, donde tomara el gasto y la cantidad la cual estara en string y se pasara para su suma, se le agrega al total e inicia en 0
      setGastosTotales(totalGastado)

      const totalDisponible = presupuesto - totalGastado

      //Calculo del porcentaje para la grafica
      const nuevoPorcentaje = (((presupuesto-totalDisponible) / presupuesto) *100)


      setTimeout(() => {  //una vez que pasen 2 segundos lo pondra
        setPorcentaje(nuevoPorcentaje)
      }, 1000);

      setDisponible(totalDisponible)
    },[gastos])  //cada que cambia el arreglo de gastos ejecuta el codigo dentro del useEffect

  return (
    <View style={styles.contenedor}>
        <View style={styles.centrarGrafica}>
           <CircularProgress 
           value={porcentaje} 
           duration={1000}
           radius={150} 
           valueSuffix={'%'} 
           title='Gastado' 
           inActiveStrokeColor='#F5F5F5' 
           inActiveStrokeWidth={20} 
           activeStrokeColor='#3B82F6'
           activeStrokeWidth={20}
           titleStyle={{fontWeight:'bold', fontSize:20}}
           titleColor='#64748B'
           />
        </View>
        <View style={styles.contenedorTexto}>

            <Pressable style={styles.boton} onPress={resetearApp}>
               <Text style={styles.textoBoton}>Reiniciar App</Text>
            </Pressable>

            <Text style={styles.valor}>
                <Text style={styles.label}>Presupuesto Inicial:{' '}</Text>
                {formatearCantidad(presupuesto)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}>Disponible:{' '}</Text>
                {formatearCantidad(disponible)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}>Gastos:{' '}</Text>
                {formatearCantidad(gastosTotales)}
            </Text>     
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor //toma una copia de lo que hay en index.js de styles
     },
     centrarGrafica:{
        alignItems:'center'
     },
     imagen:{
        width:250,
        height:250
     },
     boton:{
       backgroundColor:'#DB2777',
       padding:10,
       marginBottom:40,
       borderRadius:5
     },
     textoBoton:
     {
       textAlign:'center',
       color:'white',
       fontWeight:'bold',
       textTransform:'uppercase'
     },
     contenedorTexto:{
       marginTop:50,
     },
     valor:{
      fontSize:24,
      textAlign:'center',
      marginBottom:10,
      color:'black'
     },
     label:{
      fontWeight:'700',
      color:'#3B82F6'
     }
})

export default ControlPresupuesto
