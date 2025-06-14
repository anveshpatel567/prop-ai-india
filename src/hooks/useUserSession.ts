
import { useAuth } from "@/context/AuthContext";
import type { User } from "@supabase/supabase-js";
type UseUserSessionResult = { user: User | null };
export function useUserSession(): UseUserSessionResult {
  const { user } = useAuth();
  return { user };
}
