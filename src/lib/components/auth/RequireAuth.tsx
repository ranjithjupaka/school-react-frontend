import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

type PrivateRouteProps = {
  children: React.ReactNode
  redirectTo?: string
}

const RequireAuth = ({ children, redirectTo = '/' }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // if (isLoading) {
  //   return (
  //     <div className='flex items-center justify-center min-h-screen'>
  //       <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900'></div>
  //     </div>
  //   )
  // }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children as React.ReactElement
}

export default RequireAuth
