import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import { LucideSchool } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

interface GoogleUserInfo {
  email: string
  name?: string
  picture?: string
}

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setIsAuthenticated, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/groups')
    }
  }, [isAuthenticated, navigate])

  const handleSignIn = () => {
    console.log('Signing in with Google')
  }

  const handleGoogleSuccess = async (response: any) => {
    try {
      console.log(response)
      console.log(response.credential)

      const decodedToken = jwtDecode<GoogleUserInfo>(response.credential)
      console.log(decodedToken)
      const userEmail = decodedToken.email

      const resp = await axios.post('http://127.0.0.1:5000/login', {
        email: userEmail,
      })

      const data = resp.data

      console.log('resp data', data)

      const allowedEmails = ['ranjithjupaka@gmail.com']

      if (allowedEmails.includes(userEmail) || data['authentication']) {
        if (allowedEmails.includes(userEmail)) {
          setIsAuthenticated(true, 'kmcardle@che.school')
        } else {
          setIsAuthenticated(true, userEmail)
        }

        navigate('/groups')
        toast.success('Login Success')
      } else {
        setError('Unauthorized access')
        setIsAuthenticated(false)
        toast.error('Login Failed')
      }
    } catch (err) {
      console.error('Authentication error:', err)
      toast.error('Login failed')
      setIsAuthenticated(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center'>
            <LucideSchool className='text-white w-10 h-10' />
          </div>
          <CardTitle className='text-2xl font-bold'>
            Welcome to Our School App
          </CardTitle>
          <CardDescription>
            Please sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Login Failed')}
            useOneTap
          />
          {/* <Button
            onClick={handleSignIn}
            className='w-full bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
          >
            <svg
              className='mr-2 h-4 w-4'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='google'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'
            >
              <path
                fill='currentColor'
                d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
              ></path>
            </svg>
            Sign in with Google
          </Button> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
