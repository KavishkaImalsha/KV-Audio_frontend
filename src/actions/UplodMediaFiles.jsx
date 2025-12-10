import supabase from "../connections/supabase"

const UploadMediaFiles = async (file) => {
    if (!file) {
        throw new Error("File is not selected");
    }

    try {
        const timestamp = new Date().getTime();
        const sanitizedName = file.name.replace(/\s+/g, '_'); 
        const fileName = `${timestamp}_${sanitizedName}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: false
            });

        if (error) {
            console.error("Supabase Upload Error:", error);
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);

        if (!publicUrlData || !publicUrlData.publicUrl) {
            throw new Error("Failed to get public URL");
        }

        return publicUrlData.publicUrl;

    } catch (error) {
        console.error("Upload Helper Error:", error);
        throw error;
    }
}

export default UploadMediaFiles;