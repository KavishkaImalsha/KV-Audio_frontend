import { Route, Routes } from "react-router-dom"
import NavBar from "../components/NavBar"
import Home from "./Home"
import Items from "./Items"
import Contact from "./Contact"
import Error from "./Error"
import AdminDashboard from "./admin/AdminDashboard"
import Cart from "./User/Cart"
import UserDashboard from "./User/dashboard/UserDashboard"
import Profile from "../pages/User/Profile.jsx"
import ProtectedRoute from "../components/ProtectedRoute.jsx"

const MainHome = () => {
    return(
        <>
            <NavBar/>
            <div className="h-[calc(100vh-15vh)] w-full">
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route element={<ProtectedRoute allowedRole={["admin"]}/>}>
                        <Route path="/admin/*" element={<AdminDashboard/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRole={["customer"]}/>}>
                        <Route path="/user/*" element={<UserDashboard/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRole={["admin", "customer"]}/>}>
                        <Route path="/profile" element={<Profile/>}/>
                    </Route>
                    
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </div>
            
        </>
    )
}

export default MainHome