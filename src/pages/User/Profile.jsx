import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Phone, MapPin, Camera, Save, X, LogOut, Package, Shield, MessageCircle } from "lucide-react";
import Footer from "../../components/Footer";
import BackendApi from "../../api/BackendApi";

const Profile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profilePic: null
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDetails = await BackendApi.get('/user/userDetails')
        console.log(userDetails.data);
        
        setUserData({
          firstName: userDetails.data.firstName,
          lastName: userDetails.data.lastName,
          email: userDetails.data.email,
          phoneNumber: userDetails.data.phoneNumber,
          role: userDetails.data.role,
        });

      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const userUpdateRes = await BackendApi.put('/user/userUpdate', userData)

      localStorage.setItem("firstName", userData.firstName);

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-10 font-quicksand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        
        <div className="relative mb-20">
          <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl shadow-lg"></div>
          <div className="absolute -bottom-16 left-8 md:left-12 flex items-end">
            <div className="relative group">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center">
                {userData.profilePic ? (
                  <img src={userData.profilePic} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-300" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 bg-gray-900 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-sm">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="ml-6 mb-2 hidden md:block">
              <h1 className="text-3xl font-bold text-gray-900">{userData.firstName} {userData.lastName}</h1>
              <p className="text-gray-500 font-medium capitalize flex items-center gap-2">
                <Shield size={16} className="text-blue-500"/> {userData.role} Account
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="md:hidden text-center mb-6">
               <h1 className="text-2xl font-bold text-gray-900">{userData.firstName} {userData.lastName}</h1>
               <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">{userData.role}</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Menu</h3>
              <div className="space-y-2">
                {userData.role === 'customer' && (
                    <button onClick={() => navigate('/user/orders')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all">
                    <span className="flex items-center gap-3"><Package size={20}/> My Orders</span>
                    </button>
                )}
                {userData.role === 'customer' && (
                    <button onClick={() => navigate('/user/inqueries')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all">
                    <span className="flex items-center gap-3"><MessageCircle size={20}/> Inqueries</span>
                    </button>
                )}
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 text-blue-600 font-semibold">
                  <span className="flex items-center gap-3"><User size={20}/> Personal Details</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-all font-semibold">
                  <LogOut size={20}/> Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                  <p className="text-gray-500 text-sm">Manage your personal information, including phone numbers and email address.</p>
                </div>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                     <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm flex items-center gap-1"
                      >
                        <X size={16}/> Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm flex items-center gap-1 shadow-md"
                      >
                        <Save size={16}/> {loading ? "Saving..." : "Save Changes"}
                      </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input 
                      type="text" name="firstName" value={userData.firstName} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium">{userData.firstName}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input 
                      type="text" name="lastName" value={userData.lastName} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium">{userData.lastName}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 flex items-center gap-2 cursor-not-allowed">
                     <Mail size={16}/> {userData.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input 
                      type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium flex items-center gap-2">
                        <Phone size={16} className="text-gray-400"/> {userData.phoneNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;