import { useEffect, useState } from "react"
import { supabase } from "../../shared/lib/supabase"

interface Message {
  id: string
  email: string
  message: string
  created_at: string
}

export default function AdminPanel() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setMessages(data)
      }
    }

    fetchMessages()
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 p-10">
      <h1 className="text-2xl mb-6">Admin Message Viewer</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border border-green-600 p-4">
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p className="text-sm text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}