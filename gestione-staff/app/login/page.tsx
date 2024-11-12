'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      // In a real application, you would set a secure token or cookie here
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/dashboard')
    } else {
      setError('Credenziali non valide')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Accesso</CardTitle>
          <CardDescription>Inserisci le tue credenziali per accedere</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Nome utente</Label>
                <Input 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Inserisci il nome utente"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci la password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSubmit}>Accedi</Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  )
}