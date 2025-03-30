import {createClient} from '@supabase/supabase-js' 
const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGhveXl2enh5b3B3eXdjeGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MTI2OTIsImV4cCI6MjA1ODI4ODY5Mn0.NGQXktGi_y7YV9sq4S-ePWeW58rvhknFACm44vQqdCI"
const project_url = "https://aiphoyyvzxyopwywcxbh.supabase.co"

const supabase = createClient(project_url, anon_key)

export default supabase