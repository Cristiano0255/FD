'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import axios from 'axios';

export default function AddDispatcherPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    badgeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Invia i dati del dispatcher al backend
      const response = await axios.post('http://localhost:3000/api/dispatchers', formData);
      console.log('Nuovo dispatcher aggiunto:', response.data);
      // Reindirizza alla pagina dei dispatchers dopo il salvataggio
      router.push('./dispatchers');
    } catch (error) {
      console.error('Errore durante l\'aggiunta del dispatcher:', error);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Aggiungi Nuovo Dispatcher</CardTitle>
        <CardDescription>Inserisci i dettagli del nuovo flight dispatcher</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="badgeId">ID Badge</Label>
            <Input id="badgeId" name="badgeId" value={formData.badgeId} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Cognome</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefono</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Aggiungi Dispatcher</Button>
        </CardFooter>
      </form>
    </Card>
  )
}