import handleInputData from "../../actions/handleInputData"
import ImageUploadButton from "./ImageUploadButton";
import { X, Save, Package, DollarSign, Layers, Box, FileText, Tag, Ruler, Trash2 } from "lucide-react";

const AddItemModel = ({ showModel, setItem, submitForm, setProductImages, productImages }) => {

    const handleRemoveImage = (indexToRemove) => {
        setProductImages((prevImages) => {
            const updatedImages = Array.from(prevImages).filter((_, index) => index !== indexToRemove);
            return updatedImages;
        });
    };

    const inputStyle = "w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400";
    const labelStyle = "block mb-1.5 text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Add New Product</h3>
                        <p className="text-xs text-gray-500">Fill in the details to create a new inventory item.</p>
                    </div>
                    <button type="button" onClick={() => { showModel(false) }} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <form className="space-y-6" onSubmit={(event) => { submitForm(event) }}>
                        <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                            <div className="flex justify-between items-center mb-2">
                                <label className={labelStyle}>Product Images</label>
                                <span className="text-xs text-gray-400">{productImages?.length || 0}/5 Selected</span>
                            </div>
                            
                            <ImageUploadButton setProductImages={setProductImages} />

                            {productImages && productImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {Array.from(productImages).flatMap(item => item instanceof FileList ? Array.from(item) : item).map((file, index) => {
                                        if (!(file instanceof Blob) && !(file instanceof File)) return null;

                                        return (
                                            <div key={index} className="relative group w-full h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                                                <img 
                                                    src={URL.createObjectURL(file)} 
                                                    alt="preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                                
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-transform hover:scale-110"
                                                        title="Remove Image"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="productId" className={labelStyle}><Tag size={14}/> Product ID <span className="text-red-500">*</span></label>
                                <input autoComplete="off" onChange={(event) => { handleInputData(event, setItem) }} type="text" name="productId" className={inputStyle} placeholder="e.g. SPK-001" required/>
                            </div>
                            <div>
                                <label htmlFor="name" className={labelStyle}><Package size={14}/> Product Name <span className="text-red-500">*</span></label>
                                <input autoComplete="off" onChange={(event) => { handleInputData(event, setItem) }} type="text" name="name" className={inputStyle} placeholder="e.g. JBL PartyBox 310" required/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="category" className={labelStyle}><Layers size={14}/> Category <span className="text-red-500">*</span></label>
                                <select onChange={(event) => { handleInputData(event, setItem) }} name="category" className={`${inputStyle} appearance-none cursor-pointer`} required>
                                    <option value="">Select Category</option>
                                    <option value="Speakers">Speaker</option>
                                    <option value="Blubs">Blubs</option>
                                    <option value="Mic">Mic</option>
                                    <option value="Amplifier">Amplifier</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dimension" className={labelStyle}><Ruler size={14}/> Dimensions <span className="text-red-500">*</span></label>
                                <input autoComplete="off" onChange={(event) => { handleInputData(event, setItem) }} type="text" name="dimension" className={inputStyle} placeholder="e.g. 10x10x20 cm" required/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label htmlFor="price" className={labelStyle}><DollarSign size={14}/> Price <span className="text-red-500">*</span></label>
                                <input autoComplete="off" onChange={(event) => { handleInputData(event, setItem) }} type="number" name="price" className={inputStyle} placeholder="0.00" required/>
                            </div>
                            <div>
                                <label htmlFor="quantity" className={labelStyle}><Box size={14}/> Quantity <span className="text-red-500">*</span></label>
                                <input autoComplete="off" onChange={(event) => { handleInputData(event, setItem) }} type="number" name="quantity" className={inputStyle} placeholder="0" required/>
                            </div>
                            <div>
                                <label htmlFor="availability" className={labelStyle}>Status <span className="text-red-500">*</span></label>
                                <select onChange={(event) => { handleInputData(event, setItem) }} name="availability" className={`${inputStyle} appearance-none cursor-pointer`} required>
                                    <option value="">Select Status</option>
                                    <option value="true">Available (Yes)</option>
                                    <option value="false">Unavailable (No)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="discription" className={labelStyle}><FileText size={14}/> Description <span className="text-red-500">*</span></label>
                            <textarea onChange={(event) => { handleInputData(event, setItem) }} name="discription" rows="4" className={`${inputStyle} resize-none`} placeholder="Enter a detailed description..." required/>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => showModel(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors">Cancel</button>
                            <button type="submit" className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                                <Save size={18} /> Save Product
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddItemModel;