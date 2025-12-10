const MapLocation = () => {
    return(<>
            <div className="w-full h-[600px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.622778487509!2d80.53239427373373!3d7.05353401677974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae375ed1abfb1c9%3A0xd2c626f4b046524a!2zRmFzaGlvbiBCYWJ5ICjgt4Pgt5LgtoLgt4Tgtr0g4La24LeZ4LeK4La24LeSIOC2muC2qeC3meC3iik!5e0!3m2!1sen!2slk!4v1752562472981!5m2!1sen!2slk"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of Audio Shop"
                ></iframe>
            </div>

    </>)
}

export default MapLocation