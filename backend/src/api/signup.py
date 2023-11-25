from dotenv import load_dotenv
load_dotenv()

import os
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

user_email: str = 'quejajosh01@gmail.com'
user_password: str = 'LiptonGreenTea202!'

new_user = supabase.auth.sign_up({ "email": user_email, "password": user_password })

user_id = new_user.user.id
print(f"User ID: {user_id}")