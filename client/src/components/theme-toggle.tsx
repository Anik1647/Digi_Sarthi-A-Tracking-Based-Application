"use client"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
      }}
      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-200 relative overflow-hidden"
    >
      <Sun 
        className={`absolute h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 text-cyan-500
          ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} 
      />
      <Moon 
        className={`absolute h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 text-cyan-500
          ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}