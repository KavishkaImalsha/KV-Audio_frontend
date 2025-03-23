import { useState } from "react"
import UplodMediaFiles from "../actions/UplodMediaFiles"

const TestComponent = () => {
    const [file, setFile] = useState(null)

    const uplodFile = () => {
        UplodMediaFiles(file).then((url) => {
            console.log(url)
        })
    }
    return(<>
        <div className="flex justify-center items-center flex-col">
            <input type="file" onChange={(event) => {setFile(event.target.files[0])
            }
            }/>
            <button onClick={() => {uplodFile()}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload</button>

        </div>
    </>)
}

export default TestComponent