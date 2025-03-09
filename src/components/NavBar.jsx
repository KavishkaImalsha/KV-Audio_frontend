import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <>
            <div className="w-full h-[80px] bg-gray-600 flex justify-center items-center relative shadow-gray-400 shadow-2xl">
                <img src="company_logo.png" className="w-[150px] h-[150px] absolute left-1"/>
                <div>
                    <Link to="/" className="mx-3 text-black text-md font-bold hover:text-white">Home</Link>
                    <Link to="/items" className="mx-3 text-black text-md font-bold hover:text-white">Items</Link>
                    <Link to="/gallery" className="mx-3 text-black text-md font-bold hover:text-white">Gallery</Link>
                    <Link to="/contact" className="mx-3 text-black text-md font-bold hover:text-white">Contact</Link>
                </div>
            </div>
        </>
    )
}

export default NavBar