import { Route, Routes } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar.jsx'
import AdminHome from './side bar actions/AdminHome.jsx'
import Items from './side bar actions/Items.jsx'
const AdminDashboard = () => {
    return(
        <>
          <div className='w-full h-[calc(100vh-80px)] flex'>
            <AdminSideBar/>
            <div className='w-[calc(100vw-250px)'>
              <Routes>
                  <Route path='/dashboard' element={<AdminHome/>}/>
                  <Route path='/items' element={<Items/>}/>
                  <Route path='/bookings' element={<h1>Bookings</h1>}/>
                  <Route path='/users' element={<h1>Users</h1>}/>
              </Routes>
            </div>
          </div>
        </>
    )
}

export default AdminDashboard