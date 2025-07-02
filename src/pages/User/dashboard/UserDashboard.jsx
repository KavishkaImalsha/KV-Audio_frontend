import { Route, Routes } from "react-router-dom"
import Orders from "../Orders"

const UserDashboard = () => {
    return(<>
        <Routes>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </>)
}

export default UserDashboard