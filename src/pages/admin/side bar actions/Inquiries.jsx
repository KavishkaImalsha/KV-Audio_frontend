import { useEffect, useState } from "react";
import BackendApi from "../../../api/BackendApi";
import GridLoader from "react-spinners/GridLoader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { 
    Shield, 
    Mail, 
    Clock, 
    CheckCircle, 
    Trash2, 
    Send, 
    Save,
    Filter
} from "lucide-react";

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [replyingId, setReplyingId] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");

    useEffect(() => {
        fetchInquiries();
    }, []);

    useEffect(() => {
        filterData();
    }, [inquiries, filterStatus]);

    const fetchInquiries = async () => {
        try {
            const response = await BackendApi.get('/inquiries');
            setInquiries(response.data.inquiries);
        } catch (error) {
            toast.error("Failed to load inquiries");
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (filterStatus === "all") {
            setFilteredInquiries(inquiries);
        } else if (filterStatus === "pending") {
            setFilteredInquiries(inquiries.filter(i => !i.isReply));
        } else {
            setFilteredInquiries(inquiries.filter(i => i.isReply));
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Inquiry?",
            text: "This will permanently remove this ticket.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await BackendApi.delete(`/inquiries/${id}`);
                    toast.success("Inquiry deleted successfully");
                    setInquiries(prev => prev.filter(t => t.id !== id));
                } catch (error) {
                    toast.error(error?.response?.data?.message || "Error Occurred");
                }
            }
        });
    };

    const handleReplySubmit = async (ticket) => {
        if (!replyMessage.trim()) return toast.error("Reply cannot be empty");

        try {
            const updateData = {
                ...ticket,
                reply: replyMessage,
                isReply: true,
                status: "Resolved"
            };

            await BackendApi.put(`/inquiries/${ticket.id}`, updateData);

            setInquiries(inquiries.map(t => t.id === ticket.id ? updateData : t));

            toast.success("Reply sent successfully!");
            setReplyingId(null);
            setReplyMessage("");
        } catch (error) {
            toast.error("Failed to send reply");
        }
    };

    const stats = {
        total: inquiries.length,
        pending: inquiries.filter(i => !i.isReply).length,
        solved: inquiries.filter(i => i.isReply).length
    };

    if (loading) return <div className="h-[50vh] flex items-center justify-center"><GridLoader color="#2563eb" /></div>;

    return (
        <div className="max-w-6xl mx-auto p-6 font-quicksand bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
                    <Shield className="text-blue-700 w-8 h-8"/> Admin Support Portal
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase">Total Tickets</p>
                            <h2 className="text-3xl font-bold text-gray-800">{stats.total}</h2>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-full text-gray-600"><Mail /></div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                        <div>
                            <p className="text-orange-500 text-sm font-bold uppercase">Pending</p>
                            <h2 className="text-3xl font-bold text-orange-600">{stats.pending}</h2>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full text-orange-600"><Clock /></div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                        <div>
                            <p className="text-green-500 text-sm font-bold uppercase">Replied</p>
                            <h2 className="text-3xl font-bold text-green-600">{stats.solved}</h2>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full text-green-600"><CheckCircle /></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mb-6">
                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                    {['all', 'pending', 'replied'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${
                                filterStatus === status 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredInquiries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-400">No inquiries found matching this filter.</p>
                    </div>
                ) : (
                    filteredInquiries.map((ticket) => (
                        <div key={ticket._id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                        ticket.isReply 
                                        ? "bg-green-100 text-green-700 border-green-200" 
                                        : "bg-orange-100 text-orange-700 border-orange-200"
                                    }`}>
                                        {ticket.isReply ? "Replied" : "Pending Action"}
                                    </span>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Mail size={14} />
                                        <span className="font-semibold">{ticket.email}</span>
                                    </div>
                                    <span className="text-gray-400 text-xs">#{ticket.id}</span>
                                </div>
                                
                                <button 
                                    onClick={() => handleDelete(ticket.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Delete Ticket"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="mb-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Customer Message</p>
                                    <p className="text-gray-800 text-lg leading-relaxed">{ticket.message}</p>
                                </div>

                                {ticket.isReply ? (
                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-sm">
                                            <Shield size={16} /> Admin Response
                                        </div>
                                        <p className="text-gray-700">{ticket.reply}</p>
                                        <div className="mt-2 text-right">
                                            <button 
                                                onClick={() => {
                                                    setReplyingId(ticket.id);
                                                    setReplyMessage(ticket.reply);
                                                }}
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                Edit Response
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        {replyingId === ticket.id ? (
                                            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                                <textarea
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 min-h-[100px]"
                                                    placeholder="Type your reply to the customer..."
                                                    value={replyMessage}
                                                    onChange={(e) => setReplyMessage(e.target.value)}
                                                ></textarea>
                                                <div className="flex gap-2 justify-end">
                                                    <button 
                                                        onClick={() => setReplyingId(null)}
                                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReplySubmit(ticket)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-bold"
                                                    >
                                                        <Send size={16} /> Send Reply
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => {
                                                    setReplyingId(ticket.id);
                                                    setReplyMessage("");
                                                }}
                                                className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1"
                                            >
                                                <Send size={14} /> Reply to this inquiry
                                            </button>
                                        )}
                                    </div>
                                )}
                                
                                {ticket.isReply && replyingId === ticket.id && (
                                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <textarea
                                            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 min-h-[100px]"
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                        ></textarea>
                                        <div className="flex gap-2 justify-end">
                                            <button 
                                                onClick={() => setReplyingId(null)}
                                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={() => handleReplySubmit(ticket)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-bold"
                                            >
                                                <Save size={16} /> Update Reply
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Inquiries;