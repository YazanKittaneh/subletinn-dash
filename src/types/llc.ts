import { Database } from './database';

// Assuming you're using Supabase, adjust the import if you're using a different setup
type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];

// Make sure 'business_formations' is a valid table in your Database type
export type BusinessFormation = Tables<'business_formations'>;
export type InsertBusinessFormation = InsertTables<'business_formations'>;
