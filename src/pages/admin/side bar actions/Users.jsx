import { useEffect, useState } from "react";
import BackendApi from "../../../api/BackendApi";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import GridLoader from "react-spinners/GridLoader";
import { Search, Mail, Phone, MapPin, Trash2, User, Shield, Users as UsersIcon } from "lucide-react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredUsers(users);
        } else {
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = users.filter(user => 
                user.firstName.toLowerCase().includes(lowerTerm) ||
                user.lastName.toLowerCase().includes(lowerTerm) ||
                user.email.toLowerCase().includes(lowerTerm)
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            const response = await BackendApi.get('/user/allUsers'); 
            if (response.status === 200) {
                setUsers(response.data);
                setFilteredUsers(response.data);
            }
        } catch (error) {
            toast.error("Failed to fetch customers");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = (userId) => {
        Swal.fire({
            title: "Delete User?",
            text: "This will remove their account and login access.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const userDelRes = await BackendApi.delete(`/user/deleteUser/${userId}`);
                    toast.success(userDelRes?.data?.message || "User deleted successfully");
                    setUsers(prev => prev.filter(u => u._id !== userId));
                } catch (error) {
                    toast.error(error?.response?.data?.message || "Delete failed");
                }
            }
        });
    };

    const getInitials = (first, last) => {
        return (first?.charAt(0) + last?.charAt(0)).toUpperCase();
    };

    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <GridLoader color="#2563eb" />
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto font-quicksand bg-gray-50 min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
                    <p className="text-gray-500 mt-1">View and manage registered users.</p>
                </div>
                
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <UsersIcon size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Total Users</p>
                        <p className="text-xl font-bold text-gray-800 leading-none">{users.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400"/>
                    </div>
                    <input 
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                <th className="px-6 py-4 font-semibold">User Details</th>
                                <th className="px-6 py-4 font-semibold">Contact Info</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Joined Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200">
                                                    {getInitials(user.firstName, user.lastName)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-sm">
                                                        {user.firstName} {user.lastName}
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Mail size={12}/> {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex flex-col gap-1">
                                                <span className="flex items-center gap-2">
                                                    <Phone size={14} className="text-gray-400"/>
                                                    {user.phoneNumber || "No Phone"}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <MapPin size={14} className="text-gray-400"/>
                                                    <span className="truncate max-w-[150px]" title={user.address}>
                                                        {user.address || "No Address"}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {user.role === 'admin' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                                    <Shield size={12}/> Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                    <User size={12}/> Customer
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
                                                year: 'numeric', month: 'short', day: 'numeric'
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => deleteUser(user._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No users found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;