import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  Modal
} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';

import {generarId} from './src/helpers/index.js'
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';

function App(): JSX.Element 
{

  //States
  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0) //cantidad presupuestal
  const [gastos, setGastos] = useState([])
  const [gasto, setGasto] = useState({})
  //States para filtros
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //States Modales
  const [modal, setModal] = useState(false)

  const handleNuevoPresupuesto = (presupuesto) => 
   {
     if(Number(presupuesto) > 0) //si el presupuesto ingresado no es mayor a cero procede
     {
        setIsValidPresupuesto(true)
     }
     else //sino envia una alerta
     {
        Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', [{text:'OK'}])
     } 
   }

   const handleGasto = gasto => //funcion para setear los gastos donde solo toma el gasto del form
   {
     //console.log(Object.values(gasto)) //toma los valores de lado derecho
     if([gasto.nombre,gasto.categoria,gasto.cantidad].includes('')) //comprobamos si alguna propiedad vacia del objeto
     {
       Alert.alert('Error','Todos los campos son obligatorios',[{text:'OK'}])
       return 
     }
    
     if(gasto.id)
     {
      // console.log('edicion')
      const gastosActualizados = gastos.map(gastoTemporal => gastoTemporal.id === gasto.id ? gasto : gastoTemporal )

        setGastos(gastosActualizados)

      }
     else
     {
     // console.log('nuevo registro')
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos,gasto]) // Seteamos en el state de gastos el nuevo gasto tomando una copia de los que existen  
     }
     setModal(!modal)
     //console.log(gastos)
     //gasto.id = Date.now() //generamos una id para distinguir los gastos
   }

   const eliminarGasto = id => //funcion para eliminar el gasto
   {
       //console.log('eliminar', id)
       Alert.alert('¿Deseas Eliminar Este Gasto?','Un gasto no se puede recuperar.',
       [
        {text:'No', style:'cancel'},
        {text:'Si, Eliminar' ,onPress:() => {
           const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)

           setGastos(gastosActualizados)
           setModal(!modal)
           setGasto({})
        }}
       ])
   }
  return (
     <View style={styles.contenedor}>
      <ScrollView>
      <View style={styles.header}>
        <Header />
         {isValidPresupuesto ? //validamos si hay presupuesto o no y definimos que componentes existe
           (
             <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} /> 
           ): 
           (
            <NuevoPresupuesto 
            presupuesto={presupuesto} 
            setPresupuesto={setPresupuesto} 
            handleNuevoPresupuesto={handleNuevoPresupuesto} /> 
           )
         }
      </View>

       {isValidPresupuesto && (
          <>
            <Filtro filtro={filtro} 
              setFiltro={setFiltro} 
              gastos = {gastos}
              setGastosFiltrados = {setGastosFiltrados}
             />
            <ListadoGastos gastos={gastos}  setModal={setModal} setGasto={setGasto} filtro={filtro} gastosFiltrados = {gastosFiltrados} />
          </>
       )}

       {modal && ( //mientras la variable de modal sea true se mostrara el modal de lo contrario no
          <Modal visible={modal} animationType='slide' 
          onRequestClose={()=>{
            setModal(!modal) //es tambien una manera de cerrar el modal
          }} >
             <FormularioGasto setModal={setModal} handleGasto={handleGasto} gasto={gasto} setGasto={setGasto} eliminarGasto={eliminarGasto} />
          </Modal> 
       )}

       {isValidPresupuesto && (
         <Pressable style={styles.pressable} onPress={()=>setModal(!modal)}>
             <Image 
               source={require('./src/img/nuevo-gasto.png')}
               style={styles.imagen}
             />
         </Pressable>
       )}
      </ScrollView>
     </View>
  );
}

const styles = StyleSheet.create({
   contenedor:{
     backgroundColor:'#F5F5F5',
     flex:1
   },
   header:{
    backgroundColor:'#3B82F6',
    minHeight:400
  },
  pressable:{
    position: 'absolute',
    bottom:40,
    right:30
  },
  imagen:{
     width:60,
     height:60,
  }
});

export default App;
