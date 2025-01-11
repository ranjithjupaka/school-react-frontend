import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

type PrivateRouteProps = {
  children: React.ReactNode
  redirectTo?: string
}

const RequireAuth = ({ children, redirectTo = '/' }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, userEmail } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='flex flex-col items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4'></div>
          <p className='text-gray-600'>Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children as React.ReactElement
}

export default RequireAuth
