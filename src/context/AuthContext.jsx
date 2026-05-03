import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      return JSON.parse(savedUser)
    }
    return null
  })

  const login = (token, userData) => {
    localStorage.setItem('accessToken', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}