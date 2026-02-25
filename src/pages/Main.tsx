import { useContext } from "react";
import { TaskForm } from "../components/TaskForm"
import { TaskList } from "../components/TaskList"
import { TaskStatistics } from "../components/TaskStatistics"
import { TareaContext } from "../context/context";

export const Main = () => {
  const context = useContext(TareaContext);
  if (!context) return null;
  const { dispatch } = context
  return (
    <>
        <p>Token: <b>{context.state.token}</b></p>
        <button onClick={()=>dispatch({ type : 'LOGOUT'})}>Cerrar Sesión</button>
        <TaskForm/>
        <TaskList/>
        <TaskStatistics/>
    </>
  )
}
