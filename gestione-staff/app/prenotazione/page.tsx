'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

type Flight = {
  id: string
  flightNumber: string
  departure: string
  arrival: string
  date: string
  status: string
  assignedDispatcher?: string
}

type Dispatcher = {
  id: string
  name: string
}

export default function FlightBookingPage() {
  const [flights, setFlights] = useState<Flight[]>([
    { id: '1', flightNumber: 'FL001', departure: 'Roma', arrival: 'Milano', date: '2023-06-01', status: 'Schedulato' },
    { id: '2', flightNumber: 'FL002', departure: 'Milano', arrival: 'Napoli', date: '2023-06-02', status: 'Schedulato' },
  ])

  const [dispatchers, setDispatchers] = useState<Dispatcher[]>([
    { id: '1', name: 'Mario Rossi' },
    { id: '2', name: 'Luigi Verdi' },
  ])

  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    departure: '',
    arrival: '',
    date: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const flight: Flight = {
      id: (flights.length + 1).toString(),
      ...newFlight,
      status: 'Schedulato'
    }
    setFlights([...flights, flight])
    setNewFlight({ flightNumber: '', departure: '', arrival: '', date: '' })
  }

  const handleAssignDispatcher = (flightId: string, dispatcherId: string) => {
    setFlights(flights.map(flight => 
      flight.id === flightId 
        ? { ...flight, assignedDispatcher: dispatchers.find(d => d.id === dispatcherId)?.name }
        : flight
    ))
  }

  const handleRemoveFlight = (flightId: string) => {
    setFlights(flights.filter(flight => flight.id !== flightId))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Prenotazione Voli</CardTitle>
          <CardDescription>Gestisci le prenotazioni dei voli per il dispatch</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="flightNumber">Numero Volo</Label>
                <Input id="flightNumber" name="flightNumber" value={newFlight.flightNumber} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" name="date" type="date" value={newFlight.date} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departure">Partenza</Label>
                <Input id="departure" name="departure" value={newFlight.departure} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrival">Arrivo</Label>
                <Input id="arrival" name="arrival" value={newFlight.arrival} onChange={handleChange} required />
              </div>
            </div>
            <Button type="submit">Aggiungi Volo</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voli Prenotati</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numero Volo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Partenza</TableHead>
                <TableHead>Arrivo</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Dispatcher Assegnato</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell>{flight.flightNumber}</TableCell>
                  <TableCell>{flight.date}</TableCell>
                  <TableCell>{flight.departure}</TableCell>
                  <TableCell>{flight.arrival}</TableCell>
                  <TableCell>{flight.status}</TableCell>
                  <TableCell>{flight.assignedDispatcher || 'Non assegnato'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Select onValueChange={(value) => handleAssignDispatcher(flight.id, value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Assegna Dispatcher" />
                        </SelectTrigger>
                        <SelectContent>
                          {dispatchers.map((dispatcher) => (
                            <SelectItem key={dispatcher.id} value={dispatcher.id}>
                              {dispatcher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Cancella</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialog>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Sei sicuro di voler cancellare questo volo?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Questa azione non può essere annullata. Cancellerà permanentemente il volo dal sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annulla</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveFlight(flight.id)}>
                                Cancella
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialog>
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
    </div>
  )
}