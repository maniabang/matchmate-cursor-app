import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUserStore } from '@/store/userStore';

const supabase = createClientComponentClient();

export interface SignInParams {
  email: string;
  password: string;
}

export async function signIn(params: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
  if (error) throw error;
  useUserStore.getState().setUser(data.user);

  return data;
}