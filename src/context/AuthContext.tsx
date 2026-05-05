import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: number
  email: string
  nickname: string
  riskType: 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE' | null
  interestSector: string | null
}

interface AuthContextType {
  user: User | null
  login: (token: string, userData: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('accessToken')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      return JSON.parse(savedUser)
    }
    return null
  })

  const login = (token: string, userData: User) => {
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

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.')
  }
  return context
}