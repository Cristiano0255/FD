'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Users, BookOpen, LogOut, UserPlus, Plane } from 'lucide-react'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Route {
  href: string
  label: string
  icon: React.ElementType
}

const routes: Route[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dispatchers', label: 'Dispatchers', icon: Users },
  { href: '/add-dispatcher', label: 'Aggiungi Dispatcher', icon: UserPlus },
  { href: '/flight-booking', label: 'Prenotazione Voli', icon: Plane },
  { href: '/lessons', label: 'Lezioni', icon: BookOpen },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn && pathname !== '/login') {
      router.push('/login')
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const NavLinks = () => (
    <>
      <div className="mb-4 flex flex-col items-center">
        <p className="mt-2 text-primary-foreground">Flight Dispatcher System</p>
      </div>
      <div className="flex-1 space-y-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-foreground/10 text-primary-foreground ${
              pathname === route.href ? 'bg-primary-foreground/20' : ''
            }`}
            onClick={() => setOpen(false)}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
    </>
  )

  if (pathname === '/login') {
    return (
      <html lang="it">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }

  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40 md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-primary p-0">
              <nav className="flex flex-col h-full py-4">
                <div className="flex-1">
                  <NavLinks />
                </div>
                <Button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-foreground/10 text-primary-foreground w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex flex-col w-64 bg-primary p-4 text-primary-foreground">
            <div className="flex-1">
              <NavLinks />
            </div>
            <Button
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-foreground/10 w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
          <main className="flex-1 p-8 overflow-y-auto pt-20 md:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}