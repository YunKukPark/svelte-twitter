import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cghjmwnoamxidtcjaucv.supabase.co';
const SUPABASE_PUBLIC_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQzMTc3NTU0LCJleHAiOjE5NTg3NTM1NTR9.XCxO_kL9njQnhCtOIXfLSsi4x9tP7goQVyGYUFiD0aY';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

export default supabase;
