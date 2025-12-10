import { Navigate, Outlet, useNavigate } from "react-router-dom"

const ProtectedRoute = ({allowedRole}) => {
    const role = localStorage.getItem('role')

    if(!role){
        return <Navigate to={'/'} replace/>
    }

    if(allowedRole && !allowedRole.includes(role)){
        return <Navigate to={'/'} replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute