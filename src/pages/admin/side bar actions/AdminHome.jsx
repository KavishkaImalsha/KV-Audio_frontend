import { useEffect, useState } from "react";
import BackendApi from "../../../api/BackendApi"
import { 
    CheckCircle , 
    ShoppingCart, 
    Users, 
    Package, 
    TrendingUp, 
    AlertCircle, 
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

const AdminHome = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        pendingOrders: 0,
        totalUsers: 0,
        totalProducts: 0,
        lowStockItems: [],
        recentOrders: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async() => {
        try {
            const statRes = await BackendApi.get('/admin/stat')

            const statData = statRes.data

            setStats({
                totalRevenue: statData.totalRevenue,
                pendingOrders: statData.totalPendingOrders,
                totalUsers: statData.totalCustomers,
                totalProducts: statData.totalProducts,
                lowStockItems: statData.lowstockProducts,
                recentOrders: statData.recentOrders
            });

        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <GridLoader color="#2563eb" />
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto font-quicksand bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Overview of your business performance as of {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Revenue</p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            <span className="text-sm text-gray-400 align-top">Rs.</span>
                            {stats.totalRevenue.toLocaleString()}
                        </h2>
                    </div>
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <Link to="/admin/bookings" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Pending Orders</p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingOrders}</h2>
                        <p className="text-xs text-orange-500 font-semibold mt-1">Requires Attention</p>
                    </div>
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <ShoppingCart size={24} />
                    </div>
                </Link>

                <Link to="/admin/items" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Items</p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</h2>
                    </div>
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Package size={24} />
                    </div>
                </Link>

                <Link to="/admin/users" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Customers</p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</h2>
                    </div>
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Users size={24} />
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-800">Recent Orders</h3>
                        <Link to="/admin/bookings" className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                            View All <ArrowRight size={16}/>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right rounded-r-lg">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stats.recentOrders.length > 0 ? (
                                    stats.recentOrders.map((order, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm font-mono text-gray-600">
                                                #{order.orderId ? order.orderId.slice(-6).toUpperCase() : "N/A"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                                                {order.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                    order.isApproval 
                                                    ? "bg-green-100 text-green-700" 
                                                    : "bg-orange-100 text-orange-700"
                                                }`}>
                                                    {order.isApproval ? "Confirmed" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-800 text-right">
                                                Rs. {order.totalAmount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8 text-gray-400">No recent orders</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertCircle className="text-red-500" size={20} />
                        <h3 className="font-bold text-lg text-gray-800">Low Stock Alert</h3>
                    </div>

                    <div className="space-y-4">
                        {stats.lowStockItems.length > 0 ? (
                            stats.lowStockItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
                                    <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={item.image[0]} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-red-600 font-semibold">Only {item.quantity} left!</p>
                                    </div>
                                    <Link to="/admin/items" className="p-2 bg-white rounded-full text-gray-500 hover:text-blue-600 shadow-sm">
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <CheckCircle size={40} className="mx-auto mb-2 text-green-500 opacity-50"/>
                                <p>Inventory looks good!</p>
                            </div>
                        )}
                        
                        {stats.lowStockItems.length > 0 && (
                            <Link to="/admin/items" className="block text-center text-sm text-blue-600 font-semibold mt-4 hover:underline">
                                Manage Inventory
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;