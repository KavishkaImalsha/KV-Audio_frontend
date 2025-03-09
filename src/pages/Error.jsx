import { Link } from "react-router-dom"

const Error = () => {
    return(
        <>
            <div className="flex justify-center h-[70vh]">
                <img src="/page_not_found.png"/>
            </div>
            <div>
                <h3 className="text-center text-3xl font-bold">Opps, Page not found!</h3>
                <p className="text-center mt-2 text-gray-500">You may have mis-typed the url or page doesn't exists. Try going back <Link to="/" className="text-blue-500 font-bold">Home</Link></p>
            </div>
        </>
    )
}

export default Error