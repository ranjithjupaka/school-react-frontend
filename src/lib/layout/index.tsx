import type { ReactNode } from 'react'

import { ThemeProvider } from '@/lib/components/theme-provider'

import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'
import { useLocation } from 'react-router-dom'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const currentRoute = location.pathname
  return (
    <ThemeProvider>
      <Meta />
      <div className='flex min-h-screen flex-col bg-gradient-to-b from-blue-100 to-blue-200 min-w-screen'>
        {currentRoute !== '/' && <Header />}
        <main className='wrapper'>{children}</main>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  )
}

export default Layout
