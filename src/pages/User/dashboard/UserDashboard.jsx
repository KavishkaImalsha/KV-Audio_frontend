import { Route, Routes } from "react-router-dom"
import Orders from "../Orders"
import Profile from "../Profile"
import Inqueries from "../Inqueries"

const UserDashboard = () => {
    return(<>
        <Routes>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/inqueries" element={<Inqueries/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </>)
}

export default UserDashboard