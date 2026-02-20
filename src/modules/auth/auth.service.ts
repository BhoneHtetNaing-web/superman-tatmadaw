import { supabase } from '../../shared/lib/supabase'

export const registerUser = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password })
}

export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const logoutUser = async () => {
  return await supabase.auth.signOut()
}

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data.user
}

// Authentication (Register + Login Working)
export async function register(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) throw error

  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      role: "user",
    })
  }

  return data
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw error
  
  return data
}

export async function logout() {
  await supabase.auth.signOut()
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) throw error
  return data.user
}
