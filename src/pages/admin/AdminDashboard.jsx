import { Route, Routes } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar.jsx'
import AdminHome from './AdminHome.jsx'
const AdminDashboard = () => {
    return(
        <>
          <div className='w-full h-screen flex'>
            <AdminSideBar/>
            <div className='w-[calc(100vw-250px)'>
              <Routes>
                  <Route path='/dashboard' element={<AdminHome/>}/>
                  <Route path='/items' element={<h1>Items</h1>}/>
                  <Route path='/bookings' element={<h1>Bookings</h1>}/>
                  <Route path='/users' element={<h1>Users</h1>}/>
              </Routes>
            </div>
          </div>
        </>
    )
}

export default AdminDashboard