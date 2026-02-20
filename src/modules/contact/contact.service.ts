import { supabase } from '../../shared/lib/supabase'

export async function sendMessage(email: string, message: string) {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  return await supabase.from('messages').insert([
    {
      user_id: user.id,
      email,
      message
    }
  ])
}
