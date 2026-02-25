import { useContext } from "react";
import { TareaContext } from "../context/context";

export const TaskStatistics = () => {
  const context = useContext(TareaContext);
  if (!context) return null;
  return (
    <>
      <h3>Estadísticas</h3>
      <p>Total : {context.state.tareas.length}</p>
      <p>Pendientes : {context.state.tareas.filter(t=>!t.completada).length}</p>
      <p>Completadas : {context.state.tareas.filter(t=>t.completada).length}</p>
    </>
  )
}
