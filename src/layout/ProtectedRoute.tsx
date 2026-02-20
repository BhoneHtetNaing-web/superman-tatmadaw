import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../modules/auth/auth.service'
import { supabase } from "../shared/lib/supabase"
import { User, Session } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode
}



export default function ProtectedRoute({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="text-green-400">Loading...</div>
  if (!user) return <Navigate to="/login" />
  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}

// import { useEffect, useState } from "react"
// import { Navigate } from "react-router-dom"
// import { supabase } from "../shared/lib/supabase"

// export default function ProtectedRoute({ children }: any) {
//   const [session, setSession] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session)
//       setLoading(false)
//     })
//   }, [])

//   if (loading) return <div>Loading...</div>
//   if (!session) return <Navigate to="/login" replace />

//   return children
// }