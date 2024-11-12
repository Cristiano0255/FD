// app/dispatchers/actions.ts
'use server'

import { prisma } from '@/prisma/client'

type Dispatcher = {
  id: string
  badgeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  lessons: string[]
}

export async function getDispatchers() {
  return await prisma.dispatcher.findMany()
}

export async function addDispatcher(data: Omit<Dispatcher, 'id'>) {
  return await prisma.dispatcher.create({ data })
}

export async function updateDispatcher(id: string, data: Partial<Dispatcher>) {
  return await prisma.dispatcher.update({ where: { id }, data })
}

export async function deleteDispatcher(id: string) {
  return await prisma.dispatcher.delete({ where: { id } })
}