//a) Muestra el formulario
//b) recoge usuario y contraseña
//c) llama al servicio de login
//d) informa a app.tsx si todo ha ido bien

import { useContext, useState } from "react"
import { LoginRes } from "../services/auth.service";
import { TareaContext } from "../context/context";

export const Login: React.FC = () => {
    const context = useContext(TareaContext);
    if (!context) return null;
    const { dispatch } = context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError('');

        try {
            const data = await LoginRes(username, password); //me comunico con el backend
            //success, token, user, message
            if (data.success && data.token && data.user) {
                dispatch({ type : 'LOGIN' , payload : data.token})
            } else {
                setError(data.message);
            }
        } catch {
            setError('Error con el servidor')
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            {error && <p>{error}</p>}
        </>
    )
}
