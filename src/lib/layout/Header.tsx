import { ThemeToggle } from '@/lib/components/theme-toggle'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MdMenu } from 'react-icons/md'
import { MdDashboard } from 'react-icons/md'
import { HiDocumentReport } from 'react-icons/hi'
import { FaArrowUpShortWide } from 'react-icons/fa6'
import { FaRegCreditCard } from 'react-icons/fa'
import { TiGroup } from 'react-icons/ti'

const Header = () => {
  const location = useLocation()
  const currentRoute = location.pathname

  return (
    <header className='flex h-16 w-full items-center justify-between p-4 md:p-6 container'>
      <Link
        className='flex title-font font-medium items-center text-black mt-4 transition-transform transform-gpu scale-150 cursor-pointer'
        to='/'
      >
        <h3>School App</h3>
      </Link>
    </header>
  )
}

export default Header
