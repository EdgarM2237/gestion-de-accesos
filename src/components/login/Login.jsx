import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { Link } from 'react-router-dom'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { data } from 'autoprefixer'

export default function Component() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)
  const { theme, setTheme } = useTheme()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: username,
        password: password }),
    })
    const data = await response.json()
    if (response.ok) {
        console.log('Inicio de sesión exitoso:', data)
        window.location.href = data.redirected;
    } else {
        console.error('Error al iniciar sesión:', data)
        setError(data.message)
    }
  }

  return (
    <div className="p-4 container mx-auto">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold"></h1>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
             </Button>
        </div>
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="justify-center items-center">
        <div className="w-36 h-36 mb-4 items-end justify-center">
          {/* Aquí puedes colocar tu logo SVG */}
          <svg
            className="w-full h-full text-primary justify-self-auto"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberPassword}
                onCheckedChange={(checked) => setRememberPassword(checked)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Recordar contraseña
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              ¿Olvidaste la contraseña?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
          <div className='text-red-500 text-ls text-center'>
            {error}
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}
