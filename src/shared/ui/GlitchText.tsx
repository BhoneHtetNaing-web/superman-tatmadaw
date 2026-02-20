import { useEffect, useState } from "react"

interface Props {
  text: string
}

export default function GlitchText({ text }: Props) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"

    const interval = setInterval(() => {
      const glitched = text
        .split("")
        .map((char) =>
          Math.random() > 0.8
            ? chars[Math.floor(Math.random() * chars.length)]
            : char
        )
        .join("")

      setDisplayText(glitched)
    }, 100)

    const timeout = setTimeout(() => {
      setDisplayText(text)
      clearInterval(interval)
    }, 1200)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [text])

  return (
    <h1 className="text-3xl text-green-400 tracking-widest animate-pulse">
      {displayText}
    </h1>
  )
}