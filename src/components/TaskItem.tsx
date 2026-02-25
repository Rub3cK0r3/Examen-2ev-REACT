import { useContext } from "react";
import type { Task } from "../types/Task"
import { TareaContext } from "../context/context";

interface Props {
  t : Task
}

export const TaskItem = ({ t }:Props) => {
  const context = useContext(TareaContext);
  if (!context) return null;
  const { dispatch } = context;

  return (
    <>
      <h3>{t.titulo}</h3>
      <p>{t.descripcion}</p>
      <p>Prioridad : {t.prioridad}</p>
      <p>Completada?? <b>{t.completada ? 'Sí' : 'No'}</b></p>
      <button onClick={()=>dispatch({ type : 'CAMBIAR_ESTADO', payload : t.titulo})}>Cambiar estado</button>
      <button onClick={()=>dispatch({ type : 'ELIMINAR_TAREA', payload : t.titulo})}>Eliminar</button>
    </>
  )
}
