import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean, email?: string) => void
  userEmail: string | null
  isLoading: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Modify the checkAuth function to handle authentication state more robustly
  const checkAuth = async () => {
    try {
      // Retrieve the user's authentication status from localStorage
      const storedAuthStatus = localStorage.getItem('isAuthenticated')
      const storedUserEmail = localStorage.getItem('userEmail')

      if (storedAuthStatus === 'true' && storedUserEmail) {
        setIsAuthenticated(true)
        setUserEmail(storedUserEmail)
      } else {
        setIsAuthenticated(false)
        setUserEmail(null)
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Authentication check failed')
      )
      setIsAuthenticated(false)
      setUserEmail(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Add a method to update authentication status and persist it
  const updateAuthStatus = (status: boolean, email?: string) => {
    setIsAuthenticated(status)
    setUserEmail(email || null)

    if (status && email) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
    } else {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userEmail')
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value = {
    isAuthenticated,
    setIsAuthenticated: updateAuthStatus,
    userEmail,
    isLoading,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
