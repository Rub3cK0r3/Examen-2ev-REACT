import { useContext, type FormEvent } from "react"
import type { Task } from "../types/Task"
import { useForm } from "../hooks/useForm"
import { TareaContext } from "../context/context";

export const TaskForm = () => {
    const context = useContext(TareaContext);
    if (!context) return null;
    const { dispatch } = context;
  const {form, onInputChange, onResetForm} = useForm<Task>({
    titulo : '',
    descripcion : '',
    prioridad : 'Media',
    completada : false
  })

  const { titulo : t, descripcion : d, prioridad : p} = form

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('probando a añadir tarea!')
    console.log(`
      Título : ${t}
      Descripción : ${d}  
      Prioridad : ${p}
    `)
    // tantas comprobaciones como quieras
    if (context.state.tareas.some(task=>task.titulo === t) || !t.trim() || !d.trim()){
      return
    }
    dispatch({ type : 'ANADIR_TAREA', payload : form})
    onResetForm()
  }

  return (
    <>
      <h3>Nueva Tarea</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" onChange={onInputChange}/>
        <input type="text" name="descripcion" placeholder="Descripción" onChange={onInputChange}/>
        <select name="prioridad" onChange={onInputChange} defaultValue={'Media'}>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button type="submit">Añadir</button>
      </form>
    </>
  )
}
