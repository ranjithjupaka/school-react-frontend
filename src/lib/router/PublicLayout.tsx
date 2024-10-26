import { useAuth } from '@/contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

type PublicRouteProps = {
  children: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const LoadingSpinner = () => (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900' />
    </div>
  )

  // if (isLoading) {
  //   return <LoadingSpinner />
  // }

  // if (isAuthenticated) {
  //   if (location.pathname === '/') {
  //     return <Navigate to={from} replace />
  //   }
  // }

  return children as React.ReactElement
}

export default PublicRoute
