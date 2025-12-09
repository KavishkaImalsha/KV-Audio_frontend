import { Route, Routes } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar.jsx'
import AdminHome from './side bar actions/AdminHome.jsx'
import Items from './side bar actions/Items.jsx'
import UpdateItemModel from '../../components/admin/UpdateItemModel.jsx'
import Bookings from './side bar actions/Bookings.jsx'
const AdminDashboard = () => {
    return(
        <>
          <div className='h-[calc(100vh-80px)] flex pt-20'>
            <AdminSideBar/>
            <div className='ml-64 w-[calc(100vw-200px)] overflow-x-hidden mx-3 overflow-y-auto'>
              <Routes>
                  <Route path='/dashboard' element={<AdminHome/>}/>
                  <Route path='/items' element={<Items/>}/>
                  <Route path='/edit-item' element={<UpdateItemModel/>}/>
                  <Route path='/bookings/*' element={<Bookings/>}/>
                  <Route path='/users' element={<h1>Users</h1>}/>
              </Routes>
            </div>
          </div>
        </>
    )
}

export default AdminDashboard