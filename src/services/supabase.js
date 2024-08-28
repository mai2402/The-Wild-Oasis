import { createClient } from '@supabase/supabase-js'

 export const supabaseUrl = 'https://whaldncauaotrabtjinu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoYWxkbmNhdWFvdHJhYnRqaW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzU1MzksImV4cCI6MjAzOTY1MTUzOX0.5ziRp1XHQ4Ol4KzkIUU_EfOpMoL6P9OeXZE3XJbtCg0"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;