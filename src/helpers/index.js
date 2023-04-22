//Funciones reutilizables

//Funcion para hacer representeacion de moneda 
export const formatearCantidad = cantidad => //como es un unico parametro se quitan los parentesis
{
  return Number(cantidad).toLocaleString('en-US', //cambiamos de locacion el string
  {
     style:'currency', //moneda
     currency: 'USD' //dolares
  })
} 

export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha)
  const  opciones = {
    year:'numeric',
    month:'long',
    day: '2-digit'
  }
  return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const generarId = () => 
{
    //aqui iteraremos las propiedades del gasto
    const random = Math.random().toString(36).substring(2,11) //generamos otra id mas dificil de repetir
    const fecha = Date.now().toString(36)

    return random + fecha
}