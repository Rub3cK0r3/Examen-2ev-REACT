import { createContext, useEffect, useReducer } from "react";
import { initialState, taskReducer, type Acciones, type AppState } from "./reducer";
import { useNavigate } from "react-router-dom";

//1. Tipo del contexto
interface TaskContexTipo {
    state: AppState;
    dispatch: React.Dispatch<Acciones>;
}

//2. Crear el contexto
export const TareaContext = createContext<TaskContexTipo | undefined>(undefined);


//3. provider
export const TareaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    //useReducer
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        if (state.token){
            localStorage.setItem('jwt',state.token)
            navigate('tasks/')
        } else {
            localStorage.removeItem('jwt')
            navigate('/')
        }
    }, [state.token])

    return (
        <TareaContext.Provider value={{ state, dispatch }} >
            {children}
        </TareaContext.Provider >
    )
}

