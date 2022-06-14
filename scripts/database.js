import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient('https://qmxyoaqrtdsmjfeugoby.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFteHlvYXFydGRzbWpmZXVnb2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUxNzgzMjIsImV4cCI6MTk3MDc1NDMyMn0.bbYeO0KPvrZzR8Xua63pvKL77OnUqXlIyQIO5Z39JCo')

async ()=>{
    const {user,error} = await supabase.auth.signIn(
        {
            email: 'dennisarg2011@gmail.com',
            passowrd: 'livec4f3'
        }
    )
}
