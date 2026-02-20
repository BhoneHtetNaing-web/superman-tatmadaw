import { useState } from "react";
import { login } from "./auth.service";
import { useNavigate } from "react-router-dom";
import MatrixRain from "../../shared/ui/MatrixRain";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <>
      <MatrixRain />
      <div className="min-h-screen flex items-center justify-center bg-black text-green-400">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded w-96 space-y-4"
        >
          <h2 className="text-xl font-bold">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 bg-black border border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-black border border-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="w-full bg-green-600 p-2 hover:bg-green-500">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
