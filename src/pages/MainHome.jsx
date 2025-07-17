import { Route, Routes } from "react-router-dom"
import NavBar from "../components/NavBar"
import Home from "./Home"
import Items from "./Items"
import Gallery from "./Gallery"
import Contact from "./Contact"
import Error from "./Error"
import AdminDashboard from "./admin/AdminDashboard"
import Cart from "./User/Cart"
import UserDashboard from "./User/dashboard/UserDashboard"

const MainHome = () => {
    return(
        <>
            <div className="h-full w-full relative">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/admin/*" element={<AdminDashboard/>}/>
                    <Route path="/user/*" element={<UserDashboard/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </div>
            <NavBar/>
        </>
    )
}

export default MainHome