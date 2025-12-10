const WhyChooseCard = () => {
    const whychoose = [
            {
                image: "https://img.icons8.com/?size=100&id=Y3Kra3lBeyOh&format=png&color=000000",
                title: "Top-Quality Audio Gear",
                descripton: "Rent from a premium collection of sound systems, speakers, mixers, and microphones – trusted by professionals."
            },
            {
                image: "https://img.icons8.com/?size=100&id=9AtVUc7sD0oH&format=png&color=000000",
                title: "Affordable & Flexible Plans",
                descripton: "Choose from budget-friendly daily or hourly rental packages that suit your event size and style."
            },
            {
                image: "https://img.icons8.com/clouds/100/ok-hand.png",
                title: "Perfect for Every Event",
                descripton: "Whether it's a wedding, concert, or private party — we’ve got the perfect sound solution for every occasion."
            },
            {
                image:"https://img.icons8.com/?size=100&id=6az9wbEz5UKE&format=png&color=000000",
                title: "Expert Setup & Support",
                descripton: "Our team provides hassle-free delivery, installation, and technical support — so you can focus on the show."
            }
        ]
    return(<>
        <div className="grid grid-cols-1 md:grid-cols-4">
            {whychoose.map((info, index) => (
                <div key={index} className="w-[330px] h-[200px] mx-2 rounded-lg mb-10">
                    <div className="flex justify-center">
                        <img className="w-20 h-20" src={info.image} alt="external-sound-equipment-music-festival-flaticons-flat-flat-icons"/>
                    </div>
                    <div className="text-center mx-1">
                        <h1 className="text-xl font-semibold text-black my-2">{info.title}</h1>
                        <p className="font-bold text-gray-600">{info.descripton}</p>
                    </div>
                </div>
            ))}
        </div>
    </>)
}

export default WhyChooseCard