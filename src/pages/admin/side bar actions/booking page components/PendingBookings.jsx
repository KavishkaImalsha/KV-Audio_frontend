import toast from "react-hot-toast";
import BackendApi from "../../../../api/BackendApi";
import Swal from 'sweetalert2'
import { Check, Trash2, Box, User, CreditCard } from "lucide-react";

const PendingBookings = ({ orders, refreshTrigger }) => {
    console.log(orders);
    

    const approvalOrder = async(orderId) => {
        try {
            const response = await BackendApi.put(`orders/${orderId}`);
            toast.success(response?.data?.message);
            refreshTrigger(prevState => prevState + 1);
        } catch(error) {
            toast.error(error?.response?.data?.message || "Approval failed");
        }
    }

    const deleteOrder = async(orderId) => {
        Swal.fire({
            title: "Reject Order?",
            text: "This will permanently remove the booking.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if(result.isConfirmed){
                try{
                    const orderDelRes = await BackendApi.delete(`/orders/${orderId}`)
                    if(orderDelRes.status === 200){
                        refreshTrigger(prev => prev + 1)
                        toast.success(orderDelRes.data.message)
                    }
                } catch(error){
                    toast.error(error?.response?.data?.message || "Delete failed")
                }
            }
        })
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Box size={48} className="mb-4 opacity-20"/>
                <p>No pending orders at the moment.</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Order ID</th>
                        <th className="px-6 py-4 font-semibold">Items</th>
                        <th className="px-6 py-4 font-semibold">Customer</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {orders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4 align-top">
                                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100">
                                    #{order.orderId ? order.orderId.slice(-6).toUpperCase() : "N/A"}
                                </span>
                            </td>

                            <td className="px-6 py-4 align-top">
                                <div className="space-y-3">
                                    {order.orderList.map((item, idx) => (
                                        <div key={idx} className="flex gap-3 items-center">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.product.image}
                                                    alt="Product"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.product.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </td>

                            <td className="px-6 py-4 align-top text-sm text-gray-600">
                                <div className="flex items-center gap-2 mb-1">
                                    <User size={14} className="text-gray-400"/> 
                                    {order.email}
                                </div>

                                <div className="text-xs text-gray-400 pl-6">Ordered: {new Date(order.orderDate).toLocaleDateString()}</div>
                            </td>

                            <td className="px-6 py-4 align-top">
                                <div className="flex items-center gap-1 font-bold text-gray-800">
                                    <span className="text-gray-400 text-xs font-bold uppercase">Rs.</span>
                                    {order.totalAmount.toFixed(2)}
                                </div>
                            </td>

                            <td className="px-6 py-4 align-top text-right">
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => approvalOrder(order.orderId)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white rounded-lg transition-all text-xs font-bold shadow-sm border border-green-200 hover:border-green-600"
                                        title="Approve Order"
                                    >
                                        <Check size={16} />
                                        <span>Approve</span>
                                    </button>

                                    <button 
                                        onClick={() => deleteOrder(order.orderId)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                        title="Reject Order"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PendingBookings