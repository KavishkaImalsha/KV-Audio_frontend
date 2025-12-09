import { Route, Routes } from "react-router-dom"
import Orders from "../Orders"
import Profile from "../Profile"

const UserDashboard = () => {
    return(<>
        <Routes>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </>)
}

export default UserDashboard