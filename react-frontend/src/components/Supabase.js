import { createClient } from "@supabase/supabase-js";

const Supabase = createClient(
     "https://wvxoandsznmqwdgqkabx.supabase.co",
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eG9hbmRzem5tcXdkZ3FrYWJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTM3NjQyNCwiZXhwIjoyMDE0OTUyNDI0fQ.dVClm_SfQGIMT16T6X5tGZ3wsPfMaAtoJ_f_Kfa6wbw"
);

export default Supabase;
