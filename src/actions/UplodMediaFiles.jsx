import supabase from "../connections/supabase"
const UplodMediaFiles = (file) => {
    return new Promise((resolve, reject) => {
        if(!file){
            reject("File is not selected")
        }

        const timestamp = new Date().getTime()
        const fileName = timestamp + file.name
    
        
        supabase.storage.from('images').upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        }).then(() => {
            const public_url = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl
            resolve(public_url)
        }).catch((error) => {
            console.log(error);
            
            reject("File is not uploded")
        })
    })
}

export default UplodMediaFiles