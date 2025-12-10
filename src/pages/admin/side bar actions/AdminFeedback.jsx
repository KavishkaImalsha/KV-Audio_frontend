import { useEffect, useState } from "react";
import BackendApi from "../../../api/BackendApi";
import GridLoader from "react-spinners/GridLoader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { 
    Star, 
    Trash2, 
    CheckCircle, 
    XCircle, 
    MessageCircle,
    ThumbsUp
} from "lucide-react";

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await BackendApi.get('/reviews'); 
            setFeedbacks(response.data || []);
        } catch (error) {
            toast.error("Failed to load feedbacks");
        } finally {
            setLoading(false);
        }
    };

    const toggleApproval = async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus;
           
            await BackendApi.put(`/reviews/approve/${id}`, { isApproved: newStatus });
            
            setFeedbacks(prev => prev.map(item => 
                item._id === id ? { ...item, isApproved: newStatus } : item
            ));

            if(newStatus) {
                toast.success("Feedback Approved for Home Page!");
            } else {
                toast("Feedback hidden from Home Page", { icon: "🙈" });
            }

        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Review?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await BackendApi.delete(`/reviews/${id}`);
                    setFeedbacks(prev => prev.filter(f => f._id !== id));
                    toast.success("Feedback deleted successfully");
                } catch (error) {
                    toast.error("Failed to delete feedback");
                }
            }
        });
    };

    const filteredFeedbacks = feedbacks.filter(f => {
        if (filter === "approved") return f.isApproved;
        if (filter === "pending") return !f.isApproved;
        return true;
    });

    if (loading) return <div className="h-[50vh] flex items-center justify-center"><GridLoader color="#2563eb" /></div>;

    return (
        <div className="max-w-7xl mx-auto p-6 font-quicksand bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <MessageCircle className="text-purple-600 w-8 h-8"/> User Feedback
                    </h1>
                    <p className="text-gray-500 mt-1">Approve reviews to display them on the landing page.</p>
                </div>

                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                    {['all', 'approved', 'pending'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${
                                filter === status 
                                ? 'bg-purple-600 text-white shadow-md' 
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFeedbacks.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <p className="text-gray-400 text-lg">No feedbacks found.</p>
                    </div>
                ) : (
                    filteredFeedbacks.map((review) => (
                        <div key={review._id} className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md flex flex-col ${review.isApproved ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-200'}`}>
                            <div className="p-5 flex justify-between items-start border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                                        {review.name?.charAt(0) || "U"}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm">{review.name || "Anonymous"}</h3>
                                        <p className="text-xs text-gray-400">{new Date(review.date || Date.now()).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-600 border border-yellow-100">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-xs font-bold">{review.rating}/5</span>
                                </div>
                            </div>

                            <div className="p-5 flex-1">
                                <p className="text-gray-600 text-sm leading-relaxed italic">
                                    "{review.comment}"
                                </p>
                            </div>

                            <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-3">
                                <button 
                                    onClick={() => handleDelete(review._id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>

                                <button
                                    onClick={() => toggleApproval(review._id, review.isApproved)}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                        review.isApproved 
                                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                                        : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                                    }`}
                                >
                                    {review.isApproved ? (
                                        <>
                                            <XCircle size={16} /> Unpublish
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle size={16} /> Approve
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminFeedback;