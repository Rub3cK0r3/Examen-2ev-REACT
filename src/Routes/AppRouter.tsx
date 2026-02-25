import { Route, Routes } from "react-router-dom"
import { Main } from "../pages/Main"
import { Login } from "../pages/Login"
import { AuthProtection } from "../pages/authProtection"

export const AppRouter = () => {
     return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="tasks/" element={<AuthProtection/>}>
                <Route index element={<Main/>}/>
            </Route>
        </Routes>
    )
}
