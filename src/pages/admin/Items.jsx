import { Link } from "react-router-dom"
import { IoAddCircleSharp } from "react-icons/io5"
import { useState } from "react"
import AddItemModel from "../../components/admin/AddItemModel"

const Items = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
 return(
    <>
        <div className={`w-full h-full relative`}>
            <button onClick={() => {setIsModalVisible(true)}}>
                <IoAddCircleSharp className="text-7xl text-blue-600 fixed right-4 bottom-4 hover:text-blue-700 hover:cursor-pointer"/>
            </button>

            {isModalVisible && <AddItemModel showModel={setIsModalVisible}/>}
        </div>
    </>
 )
}
export default Items