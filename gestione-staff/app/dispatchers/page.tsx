'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { getDispatchers, addDispatcher, updateDispatcher, deleteDispatcher } from '@/actions'

type Dispatcher = {
  id: string
  badgeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  lessons: string[]
}

export default function DispatcherManagementPage() {
  const router = useRouter()
  const [dispatchers, setDispatchers] = useState<Dispatcher[]>([])
  const [selectedDispatcher, setSelectedDispatcher] = useState<Dispatcher | null>(null)
  const [newLesson, setNewLesson] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingDispatcher, setIsAddingDispatcher] = useState(false)
  const [newDispatcher, setNewDispatcher] = useState({
    badgeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lessons: [] // Aggiungi questa riga
  })

  useEffect(() => {
    fetchDispatchers()
  }, [])

  async function fetchDispatchers() {
    const fetchedDispatchers = await getDispatchers()
    setDispatchers(fetchedDispatchers)
  }

  const handleAddLesson = async () => {
    if (selectedDispatcher && newLesson) {
      const updatedLessons = [...selectedDispatcher.lessons, newLesson]
      await updateDispatcher(selectedDispatcher.id, { lessons: updatedLessons })
      setSelectedDispatcher({ ...selectedDispatcher, lessons: updatedLessons })
      setNewLesson('')
      fetchDispatchers()
    }
  }

  const handleRemoveLesson = async (lessonToRemove: string) => {
    if (selectedDispatcher) {
      const updatedLessons = selectedDispatcher.lessons.filter(lesson => lesson !== lessonToRemove)
      await updateDispatcher(selectedDispatcher.id, { lessons: updatedLessons })
      setSelectedDispatcher({ ...selectedDispatcher, lessons: updatedLessons })
      fetchDispatchers()
    }
  }

  const handleRemoveDispatcher = async (dispatcherId: string) => {
    await deleteDispatcher(dispatcherId)
    setSelectedDispatcher(null)
    fetchDispatchers()
  }

  const handleEditDispatcher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDispatcher) {
      await updateDispatcher(selectedDispatcher.id, selectedDispatcher)
      setIsEditing(false)
      fetchDispatchers()
    }
  }

  const handleAddDispatcher = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDispatcher(newDispatcher)
      setIsAddingDispatcher(false)
      setNewDispatcher({
        badgeId: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        lessons: [] // Aggiungi questa riga
      })
      fetchDispatchers()
    } catch (error) {
      console.error('Errore durante l\'aggiunta del dispatcher:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestione Dispatchers</CardTitle>
          <CardDescription>Visualizza e gestisci i dettagli dei flight dispatchers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button onClick={() => setIsAddingDispatcher(true)}>Aggiungi Nuovo Dispatcher</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Badge</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cognome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dispatchers.map((dispatcher) => (
                <TableRow key={dispatcher.id}>
                  <TableCell>{dispatcher.badgeId}</TableCell>
                  <TableCell>{dispatcher.firstName}</TableCell>
                  <TableCell>{dispatcher.lastName}</TableCell>
                  <TableCell>{dispatcher.email}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => {
                            setSelectedDispatcher(dispatcher)
                            setIsEditing(false)
                          }}>
                            Dettagli
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Dettagli Dispatcher</DialogTitle>
                          </DialogHeader>
                          {selectedDispatcher && (
                            <div className="grid grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Informazioni Personali</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  {isEditing ? (
                                    <form onSubmit={handleEditDispatcher} className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="badgeId">ID Badge</Label>
                                        <Input
                                          id="badgeId"
                                          value={selectedDispatcher.badgeId}
                                          onChange={(e) => setSelectedDispatcher({...selectedDispatcher, badgeId: e.target.value})}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="firstName">Nome</Label>
                                        <Input
                                          id="firstName"
                                          value={selectedDispatcher.firstName}
                                          onChange={(e) => setSelectedDispatcher({...selectedDispatcher, firstName: e.target.value})}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="lastName">Cognome</Label>
                                        <Input
                                          id="lastName"
                                          value={selectedDispatcher.lastName}
                                          onChange={(e) => setSelectedDispatcher({...selectedDispatcher, lastName: e.target.value})}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                          id="email"
                                          value={selectedDispatcher.email}
                                          onChange={(e) => setSelectedDispatcher({...selectedDispatcher, email: e.target.value})}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="phone">Telefono</Label>
                                        <Input
                                          id="phone"
                                          value={selectedDispatcher.phone}
                                          onChange={(e) => setSelectedDispatcher({...selectedDispatcher, phone: e.target.value})}
                                        />
                                      </div>
                                      <Button type="submit">Salva Modifiche</Button>
                                    </form>
                                  ) : (
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell className="font-medium">ID</TableCell>
                                          <TableCell>{selectedDispatcher.id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">ID Badge</TableCell>
                                          <TableCell>{selectedDispatcher.badgeId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">Nome</TableCell>
                                          <TableCell>{selectedDispatcher.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">Cognome</TableCell>
                                          <TableCell>{selectedDispatcher.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">Email</TableCell>
                                          <TableCell>{selectedDispatcher.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">Telefono</TableCell>
                                          <TableCell>{selectedDispatcher.phone}</TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  )}
                                  {!isEditing && (
                                    <Button onClick={() => setIsEditing(true)} className="mt-4">Modifica</Button>
                                  )}
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader>
                                  <CardTitle>Lezioni Completate</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2">
                                    {selectedDispatcher.lessons.map((lesson, index) => (
                                      <div key={index} className="flex items-center justify-between">
                                        <Badge variant="secondary">{lesson}</Badge>
                                        <Button variant="destructive" size="sm" onClick={() => handleRemoveLesson(lesson)}>
                                          Rimuovi
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-2 mt-4">
                                    <Input
                                      placeholder="Nuova lezione"
                                      value={newLesson}
                                      onChange={(e) => setNewLesson(e.target.value)}
                                    />
                                    <Button onClick={handleAddLesson}>Aggiungi</Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Rimuovi</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Sei sicuro di voler rimuovere questo dispatcher?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Questa azione non può essere annullata. Rimuoverà permanentemente il dispatcher e tutti i suoi dati associati.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annulla</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemoveDispatcher(dispatcher.id)}>
                              Rimuovi
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddingDispatcher} onOpenChange={setIsAddingDispatcher}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aggiungi Nuovo Dispatcher</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddDispatcher}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="badgeId">ID Badge</Label>
                <Input
                  id="badgeId"
                  name="badgeId"
                  value={newDispatcher.badgeId}
                  onChange={(e) => setNewDispatcher({...newDispatcher, badgeId: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={newDispatcher.firstName}
                  onChange={(e) => setNewDispatcher({...newDispatcher, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Cognome</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newDispatcher.lastName}
                  onChange={(e) => setNewDispatcher({...newDispatcher, lastName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newDispatcher.email}
                  onChange={(e) => setNewDispatcher({...newDispatcher, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={newDispatcher.phone}
                  onChange={(e) => setNewDispatcher({...newDispatcher, phone: e.target.value})}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Aggiungi Dispatcher</Button>
            </CardFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}