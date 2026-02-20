import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../shared/lib/supabase"

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const checkRole = async () => {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        setAllowed(false)
        return
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single()

      setAllowed(data?.role === "admin")
    }

    checkRole()
  }, [])

  if (allowed === null) return <div>Loading...</div>
  if (!allowed) return <Navigate to="/dashboard" />

  return <>{children}</>
}