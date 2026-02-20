import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../shared/lib/supabase"
import GlitchText from "../../shared/ui/GlitchText"

export default function Dashboard() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        navigate("/login")
        return
      }

      setEmail(data.user.email ?? "")
    }

    getUser()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) return

    const { error } = await supabase.from("messages").insert({
      user_id: userData.user.id,
      email,
      message,
    })

    setLoading(false)

    if (!error) {
      setMessage("")
      alert("Message sent successfully 🚀")
    } else {
      alert(error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-6 font-mono">
      <GlitchText text="DASHBOARD ACCESS GRANTED" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-green-600 p-6 mt-8 space-y-4"
      >
        <div>
          <label>Email</label>
          <input
            title="email"
            type="email"
            value={email}
            disabled
            className="w-full bg-black border border-green-500 p-2"
          />
        </div>

        <div>
          <label>Message</label>
          <textarea
            title="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full bg-black border border-green-500 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-green-500 py-2 hover:bg-green-500 hover:text-black transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="mt-6 text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>
  )
}