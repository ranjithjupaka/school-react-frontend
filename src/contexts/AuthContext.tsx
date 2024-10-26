import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // const checkAuth = async () => {
  //   if (!address) {
  //     setIsAuthenticated(false)
  //     setIsLoading(false)
  //     return
  //   }

  //   try {
  //     if (userData && !isDataLoading) {
  //       const isValidUser =
  //         userData.userAddress &&
  //         userData.userAddress !== '0x0000000000000000000000000000000000000000'
  //       setIsAuthenticated(isValidUser)
  //     } else if (dataError) {
  //       setError(dataError as Error)
  //       setIsAuthenticated(false)
  //     }
  //   } catch (err) {
  //     setError(err as Error)
  //     setIsAuthenticated(false)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   checkAuth()
  // }, [address, userData, isDataLoading, dataError])

  const value = {
    isAuthenticated,
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
