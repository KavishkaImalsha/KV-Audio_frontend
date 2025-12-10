import {createClient} from '@supabase/supabase-js'
const anon_key = import.meta.env.SUPER_BASE_ANON_KEY
const project_url = import.meta.env.SUPER_BASE_PROJECT_URL

const supabase = createClient(project_url, anon_key)

export default supabase