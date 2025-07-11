const Footer = () => {
    return(<>
        <div className="w-full h-[250px] px-15 py-5 bg-black font-quicksan text-white">
            <h1 className="text-xl font-semibold">Contact Us</h1>
            <div className="grid grid-cols-3 py-5">
                <div className="flex gap-2">
                    <img className="w-7 h-7" src="https://img.icons8.com/?size=100&id=7880&format=png&color=228BE6"/>
                    <p>
                        <span className="block">AudioPro Rentals</span>
                        <span className="block">123 Music Avenue</span>
                        <span className="block">Colombo 07, Sri Lanka</span>
                    </p>
                </div>
                <div>
                    <div className="flex gap-2 my-2">
                        <img className="w-7 h-7" src="https://img.icons8.com/?size=100&id=ZeQPTbzIF4jw&format=png&color=40C057"/>
                        <p>+94 77 123 4567</p>
                    </div>
                    <div className="flex gap-2 my-2">
                        <img className="w-7 h-7" src="https://img.icons8.com/?size=100&id=9729&format=png&color=FFFFFF"/>
                        <p>+94 11 456 7890</p>
                    </div>
                    <div className="flex gap-2 my-2">
                        <img className="w-7 h-7" src="https://img.icons8.com/?size=100&id=12623&format=png&color=FA5252"/>
                        <p> support@audiopro.lk</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <img className="w-7 h-7" src="https://img.icons8.com/?size=100&id=10034&format=png&color=FFFFFF"/>
                    <p>
                        <span className="block">Mon - Fri: 9:00 AM - 6:00 PM</span>
                        <span className="block">Saturday: 10:00 AM - 4:00 PM</span>
                        <span className="block">Sunday: Closed</span>
                    </p>
                </div>
            </div>
            <hr className="w-full text-white"/>
            <div className="mt-2 flex justify-between items-center">
                <div>
                    <p className="text-xs">&copy {new Date().getFullYear()} AudioPro Rentals. All right reserved.</p>
                </div>
                <div className="flex gap-1">
                    <img className="object-contain w-10 h-10" src="https://www.svgrepo.com/show/328121/mastercard.svg"/>
                    <img className="object-contain w-10 h-10" src="https://www.svgrepo.com/show/328127/visa.svg"/>
                </div>
            </div>
        </div>
    </>)
}

export default Footer