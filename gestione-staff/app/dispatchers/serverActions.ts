'use server'

import { PrismaClient } from '@prisma/client';

// Inizializza il client di Prisma
const prisma = new PrismaClient();

// Definizione del tipo Dispatcher
type Dispatcher = {
  id: string;
  badgeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lessons: string[];
};

// Funzione per ottenere tutti i dispatcher
export async function getDispatchers() {
  return await prisma.dispatcher.findMany();
}

// Funzione per aggiungere un nuovo dispatcher
export async function addDispatcher(data: Omit<Dispatcher, 'id'>) {
  return await prisma.dispatcher.create({ data });
}

// Funzione per aggiornare un dispatcher esistente
export async function updateDispatcher(id: string, data: Partial<Dispatcher>) {
  return await prisma.dispatcher.update({ where: { id }, data });
}

// Funzione per eliminare un dispatcher
export async function deleteDispatcher(id: string) {
  return await prisma.dispatcher.delete({ where: { id } });
}