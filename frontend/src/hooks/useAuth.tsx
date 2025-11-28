import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    window.location.href = '/login'
  }

  const getToken = () => localStorage.getItem('token')

  return { isAuthenticated, logout, getToken }
}