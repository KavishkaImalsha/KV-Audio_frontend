import { Link, useNavigate } from "react-router-dom"
import profilePic from "../../assets/profilePic.jpg"
import { useEffect, useRef, useState } from "react"
const NavFeatures = ({firstName, role}) => {
    const [showModel, setShowModel] = useState(false)
    const navigate = useNavigate()
    const modelRef = useRef(null)

    useEffect(() => {
        const handdleClickedOutSide = (event) => {
            if(modelRef.current && !modelRef.current.contains(event.target)){
                setShowModel(false)
            }
        }

        document.addEventListener('mousedown', handdleClickedOutSide)

        return () => {
            document.removeEventListener('mousedown', handdleClickedOutSide)
        }
    },[])
    return(
    <>
        <div className="text-white absolute right-5 flex gap-4">
            {role == "customer" && (<Link to="/cart" className="w-7 h-7 m-auto hover:cursor-pointer">
                <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 902.86 902.86"
                xml:space="preserve">
                <g>
                    <g>
                        <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                            M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
                        <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                            c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                            c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                            C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                            c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                            M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                            S619.162,694.432,619.162,716.897z"/>
                    </g>
                </g>
            </svg>
            </Link>)}
            <button className="rounded-full bg-white hover:cursor-pointer" onClick={() => {setShowModel(prev => prev ? false : true)}}>
                <img src={profilePic} className="w-10 h-10 rounded-full bg-cover bg-no-repeat"/>
            </button >
            {showModel && (<div ref={modelRef} className="z-50 absolute w-30 border-0 border-gray-400 rounded bg-white text-black top-[7vh]">
                {role === 'customer' && (<div className="text-center">
                    <Link to="/user/orders" className="my-1 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200 w-full text-md">
                        <img className="w-6 h-6 mx-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFJ0lEQVR4nO2bWWwVVRjHf7e2VatEFJXYFtwVN0QSRU1UwKqJcQtGhZgYEzeMGh58IMqLaIy+AU+IPmgafPHBNYjVRBGNFjeKimw2Ri1QcKlLQBDKNV/yn+RkvMvMmbm9czv9J5PcOzPfWf5nzrec8x0YQ93QBNypy37nCl3AeqCo6zvgNnKAi4H31elv1Wkj40vd+wS4glGIs4BXgEPAT8D9wGHO84LI+F5EvAeczyjA8cCzwH7gN2AhcESF91tEziBwAFgBnEQD4ih19k9gj0gYH0P+aMn/5cgfQwOgFXgE2K0RfB5oTzh1BjUtdqtsqyNzKADzgH419lVgSoLybCo8COwEDgIvAq+p7H7VZXVmAl3AF2rcp8CVCcu7EdjqKMMLnWczgDV69g1wA3XEedLs1phN0uJJRuVy4COVtw6YWYX0DQ5J0xlBnAq8DAwDPwP3hExaXFwArFJnNgO3RiTSBmBAcsNqk7WtpiZtqUzakLT0kQnKmwy8pMbvAB4AmiPImVl8TkrWFOMCtWVIbVuqtqaGNlXwhyow23xigvKOk1n7B/hbv8elYBqDcvfGLLcsmuWUbNco2Xw/DX+0arRspP4VkRMjyMV1jjr1zkF9IQt9TGcX8LWjZKbhjyYpyB/kChuRp0eQS+oen+so6S1xlPRTEvoFmEUy3ARsVHnvxtDW1wJfSe5D4NIEbZilvlhZT0YR6NZImcBnwGyPSi9zTJpFetdElJuukU7Lzs9WH4rqk/WtKrqBvhLT4KIIsmc7Ud+PmrtNES3CCse0hqPFuHA//836/DfEJQA1/i4pwkMVFOEJwDIpqV8jRH0BJkhb7wN+T8G0TgopwAWOae3zISBsCodCptA3aitlWo3EWprWRAQEMAdjiUZsSMrlgByTKHG7jcb8UJBjo+YLI/Ixh8glFZygVAgIcIqj3c0+31tlzhbk4m6RzFsJV3yaVeeA9MZKtakSUiXA8Iaitnechc2b+T+uAnpTjBZvUV1F1R3VR6kJAWudSO5jNapXnT7H1xEpgxnyCay8z4GrY8rXlADUuTscz21YOmJ+xCCnHIzI11WmlT3Xk8iaE+D67h+owaboXgA6iI8OyVoZu4CHEy6HjRgB6NM3J2qxzJKZyGciLoyO17t7JLs4aVRXLwJ6Q0vj+6osjbfKA9zlRItpLonXjYAAJztxhrs5EkSL/Y6JPJP0UXcCAlzi6Ig+XUXds2e1QmYICHC9Yozt+l1r1IyACcB9krOoLioBhh5dNCoBexULFOWLr9W8zgUBT2vV5nHgDG1omIJblBcCSmG5TNimvBLQphWYICbIHQHBut7+PBNguBt4iBwTEBVjBDD2BZDpKTBPdt1Wf3P5BTyqBYlBKTVb7MgVAeO03vembPs24PYU83MyT0C31tzN3b1OmZzBnmHSjdNME7BRo9yp/8MKWy0dZo5cXSPibWBqAxBQUJ+642yPr3MSlSxTa7WI6HCSJ3bonqW6HJ5RAmaqL5G3xwsa5cCnX6VEJsOxJTJCF2kruz1jBISTr+bE1V1Nzs5wGikyI0VAZ4UdYi+0ldkZzhoBvslX3hU8kXAvPy0CfJOvvDHZ+cQGpAyb60CAb/JVplJlezwJqGuqbJrJ0nEJyFSydKmcvm3OqExNkQDf5KsRR4sat9MxnbYl5ktAu/SNm3zl43Bl9shMTxkCGvbITBjVdobDBLQ4O8QNfWgq6rG5gIBRe2yukhZfrySrrc4p0jV6Z9SjK69HZ13k+vA0WcF/23oiUN54iF4AAAAASUVORK5CYII=" alt="external-logistics-shipping-delivery-kmg-design-detailed-outline-kmg-design-2"/>
                        Orders
                    </Link>
                </div>)}
                <ul className="text-center border-t-1 border-t-gray-400">
                    <li className="flex justify-center items-center hover:bg-gray-200 hover:cursor-pointer text-md my-1"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-5 h-5" viewBox="0 0 50 50">
                        <path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
                        </svg>
                        <button className="hover:cursor-pointer mx-1">Settings</button>
                    </li>

                    <li className="flex justify-center items-center hover:bg-gray-200 hover:cursor-pointer text-md my-1"><img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3aMU4DMRCF4R8KWiRofRHEwWi3gcBNOEEaxAEoAhR0tCzXcGTJkdAqGzyJgt4MfpJLS/NpdtdrywBnwAPwDWSRMQKLWltz7gUKnxt3FshYJ12hk+sfnWnORq+WbK2rQ46c3Dsiltw7IpabKB0pGQgCMaVDjphHYAmce+/Iqtb0YsEoQhLwWesqqAuvkL0wqpAp5vU3jDLEhFGHbMNc4hTShPECmWLephhPkJ0Yb5BZzCGQE+Bd4NhodSjktL547iFhHi2pz3B2BEm71hIvkBRhQUwt/1vqkNT6O68MSZY9iSokRdhYpShb3Y8ohw/PwFOE46C90iF/kCFCRwZrXaqQ3CFiyb0jYsn/tiNjnVAusqhdqvmyTFoIHOfMjVsLpFzuKphNZxRG6URBNF88WwOccZGxk5w4qAAAAABJRU5ErkJggg==" alt="exit--v1"/>
                        <button className="hover:cursor-pointer mx-1" 
                        onClick={() => {
                            localStorage.clear()
                            window.location.href = "/";
                        }}>Logout</button>
                    </li>
                </ul>
            </div>)}
            <div className="m-auto">
                <p className="text-center text-xl">Hi! <span className="text-blue-600 mx-1">{firstName}</span></p>
            </div>
        </div>
    </>
    )
}

export default NavFeatures