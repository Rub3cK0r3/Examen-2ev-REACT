import type { Task } from "../types/Task";

export interface AppState {
    tareas: Task[];
    filtro : boolean | undefined
    token : string | null
}

export type Acciones =
    | { type: 'ANADIR_TAREA', payload: Task }
    | { type: 'ELIMINAR_TAREA', payload: string }
    | { type : 'CAMBIAR_ESTADO', payload : string }
    | { type : 'CAMBIAR_FILTRO', payload : boolean | undefined }
    | { type : 'LOGIN' , payload : string }
    | { type : 'LOGOUT' }
    | { type : 'LOAD_TASKS', payload : Task[]}


export const initialState: AppState = {
    tareas: [],
    filtro : undefined,
    token : null
}

export const taskReducer = (state: AppState, action: Acciones) => {

    switch (action.type) {
        case 'ANADIR_TAREA':
            return {
                ...state,
                tareas: [
                    ...state.tareas,
                    {...action.payload}
                ]
            }
        case 'ELIMINAR_TAREA':
            return {
                ...state,
                tareas: state.tareas.filter((tar) => tar.titulo !== action.payload)
            }
        case 'CAMBIAR_ESTADO':
            return {
                ...state,
                tareas : state.tareas.map(t=>{
                    return t.titulo === action.payload ? {...t,completada : !t.completada} : t
                })
            }
        case 'CAMBIAR_FILTRO':
            return {
                ...state,
                filtro : action.payload
            }
        default:
            return state;
        case 'LOGIN':
            return {
                ...state,
                token : action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                token : null
            }
        case 'LOAD_TASKS':
            return {
                ...state,
                tareas : action.payload
            }
    }

}

