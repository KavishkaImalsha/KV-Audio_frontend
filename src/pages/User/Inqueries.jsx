import { useEffect, useState } from "react";
import BackendApi from "../../api/BackendApi";
import GridLoader from "react-spinners/GridLoader";
import { 
    MessageSquare, 
    Clock, 
    ChevronDown, 
    ChevronUp, 
    User, 
    Shield, 
    Trash2, 
    Edit2, 
    Send, 
    X, 
    Save 
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Inqueries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editMessage, setEditMessage] = useState("");

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await BackendApi.get('/inquiries'); 
            setInquiries(response.data.inquiries);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await BackendApi.post('/inquiries', {message: newMessage});
            setNewMessage("");
            fetchInquiries();
            toast.success('Inquery is sent')
        } catch (error) {
            toast.error("Failed to send inquiry.")
        }
    };

    const handleDelete = (e, itemId) => {
        e.stopPropagation();

        Swal.fire({
            title: "Delete Inquiry?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444", 
            cancelButtonColor: "#6B7280", 
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await BackendApi.delete(`/inquiries/${itemId}`);
                    toast.success(response.data.message || "Deleted successfully");
                    setInquiries(prev => prev.filter(t => t.id !== itemId));
                } catch (error) {
                    toast.error(error?.response?.data?.message || "Error Occurred");
                }
            }
        });
    };

    const startEdit = (e, ticket) => {
        e.stopPropagation();
        setEditingId(ticket.id);
        setEditMessage(ticket.message);
        setExpandedId(ticket._id); 
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditMessage("");
    };

    const handleUpdate = async (id) => {
        try {
            await BackendApi.put(`/inquiries/${id}`, { message: editMessage });
            
            setInquiries(inquiries.map(ticket => 
                ticket.id === id ? { ...ticket, message: editMessage } : ticket
            ));
            setEditingId(null);

            toast.success("Update inquiry successfully")
        } catch (error) {
            toast.error("Failed to update inquiry.")
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) return <div className="h-[50vh] flex items-center justify-center"><GridLoader color="#2563eb" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-6 font-quicksand">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="text-blue-600"/> My Support Inquiries
                </h1>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-8">
                <h2 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Submit New Ticket</h2>
                <form onSubmit={handleAdd} className="flex gap-3">
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your question or issue here..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button 
                        type="submit" 
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <Send size={18} /> Send
                    </button>
                </form>
            </div>

            {inquiries.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-400 mb-4">You haven't sent any inquiries yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((ticket) => (
                        <div key={ticket._id} className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all ${expandedId === ticket._id ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-200'}`}>
                            <div 
                                onClick={() => toggleExpand(ticket._id)}
                                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${
                                            ticket.isReply 
                                            ? "bg-green-100 text-green-700 border-green-200" 
                                            : "bg-orange-100 text-orange-700 border-orange-200"
                                        }`}>
                                            {ticket.isReply ? "Replied" : "Pending"}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(ticket.date || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-lg">
                                        Inquiry #{ticket.id}
                                    </h3>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    {editingId !== ticket.id && (
                                        <div className="flex gap-2 mr-2">
                                            <button 
                                                onClick={(e) => startEdit(e, ticket)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button 
                                                onClick={(e) => handleDelete(e, ticket.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                    
                                    {expandedId === ticket._id ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
                                </div>
                            </div>

                            {expandedId === ticket._id && (
                                <div className="px-5 pb-6 bg-gray-50/50 border-t border-gray-100">
                                    
                                    <div className="mt-4 flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
                                            <User size={16}/>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-700 mb-1">You wrote:</p>
                                            {editingId === ticket.id ? (
                                                <div className="bg-white border border-blue-300 rounded-lg p-3 shadow-sm">
                                                    <textarea 
                                                        value={editMessage}
                                                        onChange={(e) => setEditMessage(e.target.value)}
                                                        className="w-full text-sm text-gray-700 focus:outline-none resize-none"
                                                        rows="3"
                                                    />
                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <button 
                                                            onClick={cancelEdit}
                                                            className="text-xs px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded flex items-center gap-1"
                                                        >
                                                            <X size={14}/> Cancel
                                                        </button>
                                                        <button 
                                                            onClick={() => handleUpdate(ticket.id)}
                                                            className="text-xs px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center gap-1"
                                                        >
                                                            <Save size={14}/> Save
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-600 text-sm leading-relaxed">{ticket.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 pl-4 border-l-2 border-gray-200 ml-4">
                                        {ticket.isReply ? (
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0 mt-1">
                                                    <Shield size={16}/>
                                                </div>
                                                <div className="bg-white p-4 rounded-r-xl rounded-bl-xl shadow-sm border border-gray-200 w-full">
                                                    <p className="text-sm font-bold text-purple-700 mb-1">Admin Response:</p>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{ticket.reply}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-orange-500 text-sm italic">
                                                <Clock size={16}/>
                                                Waiting for support team response...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inqueries;