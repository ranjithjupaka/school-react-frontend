import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
// fonts
import '@fontsource/plus-jakarta-sans/latin.css'
import '@/lib/styles/globals.css'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <GoogleOAuthProvider clientId='1053076263565-9ob720lmsnnebiot97p1runo2ci9f3ii.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
)
