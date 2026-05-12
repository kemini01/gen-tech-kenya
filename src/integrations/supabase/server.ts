import { createClient } from "@supabase/supabase-js";

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_SERVICE_ROLE_KEY = process.env.DATABASE_SERVICE_ROLE_KEY;

// Only validate at runtime, not at build time
// This allows the app to build in environments without Supabase configured
const isSupabaseConfigured = () => {
  return !!(DATABASE_URL && DATABASE_SERVICE_ROLE_KEY);
};

// Create a mock client for build time or when not configured
const createMockClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
    signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
    updateUser: async () => ({ data: null, error: new Error('Supabase not configured') }),
    admin: {
      updateUserById: async (_userId: string, _attributes: any) => ({ data: null, error: new Error('Supabase not configured') }),
    },
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
    }),
  }),
});

// Export the appropriate client based on configuration
export const supabaseAdmin = isSupabaseConfigured()
  ? createClient(DATABASE_URL!, DATABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${DATABASE_SERVICE_ROLE_KEY}`,
        },
      },
    })
  : createMockClient() as any;

// Export configuration status
export { isSupabaseConfigured };