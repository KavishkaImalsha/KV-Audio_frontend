import { Route, Routes } from "react-router-dom"
import NavBar from "../components/NavBar"
import Home from "./Home"
import Items from "./Items"
import Gallery from "./Gallery"
import Contact from "./Contact"
import Error from "./Error"

const MainHome = () => {
    return(
        <>
            <NavBar/>

            <div className="h-[calc(100vh - 80px)]">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </div>
        </>
    )
}

export default MainHome