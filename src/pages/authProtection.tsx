import { Link, Outlet } from "react-router-dom";

export const AuthProtection = () => localStorage.getItem('jwt') ? <Outlet/> : <Link to={'/'} replace/>
