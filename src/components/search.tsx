import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react'

interface SearchProps {
  onSearch: (city: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [city, setCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto mt-8 mb-4 animate-fade-in">
      <Input
        type="text"
        placeholder="Buscar ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="mr-2 bg-secondary text-secondary-foreground"
      />
      <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
        <SearchIcon className="mr-2" />
        Buscar
      </Button>
    </form>
  )
}

