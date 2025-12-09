import {createClient} from '@supabase/supabase-js' 
const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dGd0Z2l3anVnY2hpY2p4cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODY5ODMsImV4cCI6MjA4MDg2Mjk4M30.SYtCjxHKNB-reicdUzwQrB75qw5Sex0cheg7ILYyrMU"
const project_url = "https://attgtgiwjugchicjxryh.supabase.co"

const supabase = createClient(project_url, anon_key)

export default supabase