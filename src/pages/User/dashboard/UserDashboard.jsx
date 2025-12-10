import { Route, Routes } from "react-router-dom"
import Orders from "../Orders"
import Inqueries from "../Inqueries"

const UserDashboard = () => {
    return(<>
        <Routes>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/inqueries" element={<Inqueries/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </>)
}

export default UserDashboard