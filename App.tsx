import React,{useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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

/* Async Storage
  Sistema de almacenamiento de tipo llave valor (key-value) que existe y se puede acceder de forma global
  en la App

  Similar a LocalStorage (WEB)

  En IOS utiliza Diccionarios o archivos, mientras que en Android utiliza SQLite o RocksDB (lo que haya disponible)

  //Metodos
  .setItem => Nos permite almacenar elementos
  .getItem => Nos permite obtener elementos
  .removeItem => Nos permite elminar un elemento
  .clear => Limpia todo el contenido
*/

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

  /*
  Ejemplo de uso de AsynStorage
  useEffect(()=> {  //no se le pasa nada ya que al cargar el componente se iniciara
     const almacenarAS = async () =>  //funcion asincrona
     {
        const nombre = [1,1,2]
        await AsyncStorage.setItem('prueba_as', JSON.stringify(nombre)) //almacenamiento de llave valor
        console.log('almacenado')
     }

     almacenarAS()
  },[])
  */
  //El orden en el que se ordenan los effects con en los que se ejecutan
  //USEEFFECTS
  useEffect(()=> {
    const obtenerPresupuestoStorage = async () => 
    {
      try 
      {
        //Preguntamos si existe la una variable o si es diferente de null si es alguna de estas 
        //deja en 0 el valor de la constante
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        //console.log(presupuestoStorage)
        //Nos aseguramos de que el presupuesto de Storage que se haya guardado y cargado sea 
        //diferente de 0
        if(presupuestoStorage > 0)
        {
           setPresupuesto(presupuestoStorage)
           setIsValidPresupuesto(true)
           
        }

        console.log(JSON.parse(presupuestoStorage))

      } catch (error)
      {
        console.log(error) 
      }
    }

    obtenerPresupuestoStorage()
 },[])  //se le pasa arreglo vacio porque se quiere ejecutar 1 vez

 
  //Almacenamiento en AsyncStorage, almacenamiento de PRESUPUESTO VALIDO
  useEffect(() => {  //el useEffect se ejecuta una vez cuando se monta el componente y cuando cambia la variable que escucha, por tanto hay que condicionar
    if(isValidPresupuesto)
    {
       const guardarPresupuestoStorage = async () => 
       {
          try 
          {
            await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
          } 
          catch (error)
          {
            console.log(error)
          }
       }

       guardarPresupuestoStorage()
    }
  },[isValidPresupuesto]) //solo cuando el presupuesto sea valido  se almacenara 


    //UseEffect para seteo de gastos
    useEffect(() => 
    { 
      const  obtenerGastosStorage =async () => 
      {
        try 
        {
          //sino existen gastos en el storage pone un arreglo vacio
          const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
          //comprobamos que no 
          setGastos(gastosStorage ? JSON.parse(gastosStorage) : []) 
  
          
        } 
        catch (error) 
        {
          console.log(error)
        }
      }
  
      obtenerGastosStorage()
    },[]) //solo queremos que se ejecute 1 vez
  

  //UseEffect para guardado de gastos en Storage
  useEffect(()=>
  {
     const guardarGastosStorage = async () => 
     {
        try
        {
          await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos)) 
        } 
        catch (error)
        {
          console.log(error)
        }
     }

     guardarGastosStorage()
  },[gastos]) //cada que gastos este cambiando va a estar escribiendo en Storage

//FIN USEEFFECTS

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

   const resetearApp = () => 
   {
      Alert.alert(
      '¿Deseas Resetear La App?',
      'Esto eliminara el presupuesto junto con los gastos', 
      [
        {text:'No', style:'cancel'},
        {text:'Eliminar', onPress: async () =>
        {
          try 
          {
            await AsyncStorage.clear()

            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
          } 
          catch (error) 
          {
            console.log(error)
          }
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
             <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} resetearApp={resetearApp} /> 
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
