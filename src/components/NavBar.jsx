import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NavFeatures from "./NavBarParts/NavFeatures"

const NavBar = () => {
    const [isLoged, setIsLoged] = useState(false)
    const [user,setUser] = useState({firstName: "", role: ""})
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            const firstName = localStorage.getItem('firstName')
            const role = localStorage.getItem('role')
            setIsLoged(true)
            setUser({firstName: firstName, role: role})
            
        }
    }, [])
    return(
        <>
            <div className="w-full h-[15vh] bg-black flex justify-center items-center relative">
                <img src="company_logo.png" className="w-[150px] h-[150px] absolute left-1"/>
                <div className="text-white text-md font-bold">
                    <Link to="/" className="mx-3 hover:underline hover:underline-offset-4 hover:decoration-white">Home</Link>
                    <Link to="/items" className="mx-3 hover:underline hover:underline-offset-4 hover:decoration-white">Items</Link>
                    <Link to="/gallery" className="mx-3 hover:underline hover:underline-offset-4 hover:decoration-white">Gallery</Link>
                    <Link to="/contact" className="mx-3 hover:underline hover:underline-offset-4 hover:decoration-white">Contact</Link>
                </div>
                {isLoged ?  <NavFeatures firstName={user.firstName} role={user.role}/> : <Link to="/login" className="flex justify-center items-center border-white border-2 text-white rounded-xl w-[100px] h-[40px] absolute right-4 hover:cursor-pointer hover:bg-white hover:text-black hover:font-semibold">Sign In</Link>}
            </div>
        </>
    )
}

export default NavBar