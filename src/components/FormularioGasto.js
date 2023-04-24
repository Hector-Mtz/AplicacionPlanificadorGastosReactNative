import React, {useState, useEffect} from 'react'
import { Text, SafeAreaView, View, TextInput, StyleSheet, Pressable } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';

const FormularioGasto = ({
    setModal,
    handleGasto,
    setGasto,
    gasto,
    eliminarGasto
}) => {

    //States
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState()
 
    useEffect(()=> {
        if(gasto?.nombre) //pregunta si existe el nombre del gasto con Optional Chaining(este sirve para revisar las propiedades de algun objeto)
        {
          setNombre(gasto.nombre)
          setCantidad(gasto.cantidad)
          setCategoria(gasto.categoria)
          setId(gasto.id)
          setFecha(gasto.fecha)
        }
        else
        {
           
        }
    },[gasto]) //puede que tarde en llegar lleno el gasto pero con esto estara esperando a que la dependencia tenga ese cambio

  return (
    <SafeAreaView style={styles.contenedor}>
        <View style={styles.contenedorBtns}>
            <Pressable style={[styles.btn,styles.btnCancelar]} onPress={()=>{
                setModal(false)
                setGasto({})
            }}>
                <Text style={styles.btnText}>Cancelar</Text>
            </Pressable>

             {/*Con esto comprobamos si el id esta vacio o no, de ser no, es un registro existente de lo contrrio es nuevi*/
               !!id  && (
                <Pressable style={[styles.btn,styles.btnEliminar]} onPress={()=>{
                      eliminarGasto(id)
                  }}>
                    <Text style={styles.btnText}>Eliminar</Text>
                </Pressable>
               )
             } 
        </View>
        <View style={styles.formulario}>
            <Text style={styles.titulo}> {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>

            <View style={styles.campo}>
                <Text style={styles.label}>Nombre Gasto</Text>
                <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Nombre del gasto. ej. Comida' value={nombre} onChangeText={setNombre} />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Cantidad Gasto</Text>
                <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Cantidad del gasto ej. 300' keyboardType='numeric' onChangeText={setCantidad} value={cantidad} />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Categoria Gasto</Text>
                <Picker style={styles.picker} selectedValue={categoria} onValueChange={(value)=>{
                    setCategoria(value)
                }}>
                     <Picker.Item label='-- SELECCIONE --' value="" />
                     <Picker.Item label='Ahorro' value="ahorro" />
                     <Picker.Item label='Comida' value="comida" />
                     <Picker.Item label='Casa' value="casa" />
                     <Picker.Item label='Gastos Varios' value="gasto" />
                     <Picker.Item label='Entrenenimiento' value="entretenimiento" />
                     <Picker.Item label='Salud' value="salud" />
                     <Picker.Item label='Sucripciones' value="suscripciones" />
                </Picker>
            </View>
            <Pressable style={styles.submit} onPress={()=>handleGasto({nombre, cantidad, categoria, id, fecha})}>
                <Text style={styles.submitText}>
                  {gasto?.nombre ? 'Guardar Cambios Gasto' : 'Agregar Gasto'}
                </Text>
            </Pressable>
        </View>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create(
    {
        contenedor:{
           backgroundColor:'#1E40AF',
           flex:1,
        },
        formulario:{
           ...globalStyles.contenedor
        },
        titulo:{
           textAlign:'center',
           fontSize:28,
           marginBottom:30,
           color:'#64748B'
        },
        campo:{
           marginVertical:10
        },
        label:{
          color:'#64748B',
          textTransform:'uppercase',
          fontSize:16,
          fontWeight:'bold'
        },
        input:{
           backgroundColor:'#F5F5F5',
           color:'#64748B',
           padding:10,
           borderRadius:10,
           marginTop:10
        },
        picker:{
            color:'#64748B',
            borderRadius:10,
        },
        submit:{
          backgroundColor:'#3B82F6',
          padding:10,
          marginTop:20,
          borderRadius:10
        },
        submitText:{
          textAlign:'center',
          color:'white',
          textTransform:'uppercase',
          fontWeight:'bold'
        },
        btn:{
          padding:10,
          marginTop:30,
          marginHorizontal:10,
          flex:1
        },
        btnEliminar:{
          backgroundColor:'red'
        },
        btnCancelar:{
          backgroundColor:'#DB2777',
        },
        btnText:{
            textTransform:'uppercase',
            fontWeight:'bold',
            color:'white',
            textAlign:'center'
        },
        contenedorBtns:{
            flexDirection:'row',
            justifyContent:'space-between'
        }
    }
)

export default FormularioGasto
