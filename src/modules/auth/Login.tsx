import { useState } from "react"
import { supabase } from "../../shared/lib/supabase"
import { useNavigate, Link } from "react-router-dom"
import MatrixRain from "../../shared/ui/MatrixRain"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <>
      <MatrixRain />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-black/80 backdrop-blur-md border border-green-500 rounded-xl p-8 shadow-[0_0_40px_#00ff00]">

          <h2 className="text-2xl text-center text-green-400 font-mono mb-8 tracking-widest">
            ENTER THE MATRIX
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">

            <div>
              <label className="text-green-500 text-sm font-mono">
                EMAIL
              </label>
              <input
                title="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 px-4 py-3 bg-black border border-green-600 rounded-md text-green-400 font-mono focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_#00ff00]"
              />
            </div>

            <div>
              <label className="text-green-500 text-sm font-mono">
                PASSWORD
              </label>
              <input
                title="title"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 px-4 py-3 bg-black border border-green-600 rounded-md text-green-400 font-mono focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_#00ff00]"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-mono text-center animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="py-3 border border-green-400 rounded-md text-green-400 font-mono hover:bg-green-500 hover:text-black transition shadow-[0_0_20px_#00ff00]"
            >
              LOGIN
            </button>

            <p className="text-center text-green-600 text-sm font-mono">
              No account?{" "}
              <Link
                to="/register"
                className="underline hover:text-green-400"
              >
                REGISTER
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}