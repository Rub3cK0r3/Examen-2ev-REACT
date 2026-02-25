import { useContext, useEffect, useMemo } from "react";
import { TareaContext } from "../context/context";
import { TaskItem } from "./TaskItem";
import { getProtectedData } from "../services/auth.service";

export const TaskList = () => {
  const context = useContext(TareaContext);
  if (!context) return null;
  const { dispatch } = context

  // para optimizar
  const tareasFiltradas = useMemo(()=>{
      
    if (context.state.filtro === undefined){
      return context.state.tareas
    }

    return context.state.tareas.filter(t=>t.completada === context.state.filtro)
    
  },[context.state.filtro,context.state.tareas])

  useEffect(()=>{
    console.log('tareas con el filtro (recuerda asíncrono',tareasFiltradas)
  },[tareasFiltradas])

  const loadTasks = async () => {
    const data = await getProtectedData(context.state.token || '')
    dispatch({ type : 'LOAD_TASKS', payload : data})
  }

  return (
    <>
      <button onClick={()=>dispatch({ type : 'CAMBIAR_FILTRO', payload : undefined})}>Todas</button>
      <button onClick={()=>dispatch({ type : 'CAMBIAR_FILTRO', payload : false})}>Pendientes</button>
      <button onClick={()=>dispatch({ type : 'CAMBIAR_FILTRO', payload : true})}>Completadas</button>
      {
        tareasFiltradas.length === 0 
        ? <><p>No hay tareas que coincidan con la busqueda (en local).</p> <button onClick={loadTasks}>Cargar Tareas de la API</button></>
        : tareasFiltradas.map(t=>(
          <li key={t.titulo}><TaskItem t={t}/></li>
        ))
      }
    </>
  )
}
