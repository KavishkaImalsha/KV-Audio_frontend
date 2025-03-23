import {createClient} from '@supabase/supabase-js'

const UplodMediaFiles = (file) => {
    return new Promise((resolve, reject) => {
        if(!file){
            reject("File is not selected")
        }
        const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGhveXl2enh5b3B3eXdjeGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MTI2OTIsImV4cCI6MjA1ODI4ODY5Mn0.NGQXktGi_y7YV9sq4S-ePWeW58rvhknFACm44vQqdCI"
        const project_url = "https://aiphoyyvzxyopwywcxbh.supabase.co"
        const timestamp = new Date().getTime()
    
        const supabase = createClient(project_url, anon_key)
        const fileName = timestamp + file.name
    
        
        supabase.storage.from('images').upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        }).then(() => {
            const public_url = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl
            resolve(public_url)
        }).catch(() => {
            reject("File is not uploded")
        })
    })
}

export default UplodMediaFiles