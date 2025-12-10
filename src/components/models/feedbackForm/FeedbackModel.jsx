import { useState } from "react";
import { X, Star, Send } from "lucide-react";
import toast from "react-hot-toast";
import BackendApi from "../../../api/BackendApi";

const FeedbackModal = ({ isOpen, onClose, onRefresh }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            toast.error("Please select a star rating");
            return;
        }

        setLoading(true);
        try {

            const payload = {
                rating: rating,
                comment: comment
            };

            await BackendApi.post('/reviews', payload); 
            
            toast.success("Thank you for your feedback!");
            setComment("");
            setRating(0);
            onRefresh();
            onClose();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit feedback");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                <div className="bg-blue-600 p-6 text-white text-center">
                    <h2 className="text-2xl font-bold font-quicksand">Write a Review</h2>
                    <p className="text-blue-100 text-sm">Share your experience with us</p>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="transition-transform hover:scale-110 focus:outline-none"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <Star 
                                    size={32} 
                                    fill={star <= (hover || rating) ? "#FACC15" : "none"} 
                                    className={star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-gray-50"
                            placeholder="Tell us what you liked..."
                            required
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
                    >
                        {loading ? "Submitting..." : <>Submit Review <Send size={18} /></>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal