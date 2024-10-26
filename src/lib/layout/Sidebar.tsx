import React from 'react'
import { Mail, Send, Users } from 'lucide-react'

type Props = {
  active?: number
}

const Sidebar = ({ active = 1 }: Props) => {
  return (
    <nav className='w-1/5 bg-white border-r border-gray-200 p-4'>
      <ul className='space-y-2'>
        <li>
          <a
            href='/groups'
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md ${
              active === 1 ? 'bg-gray-100' : ''
            }`}
          >
            <Users className='mr-2 h-5 w-5' />
            Groups
          </a>
        </li>
        <li>
          <a
            href='/compose-email'
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md ${
              active === 2 ? 'bg-gray-100' : ''
            }`}
          >
            <Mail className='mr-2 h-5 w-5' />
            Compose Email
          </a>
        </li>
        <li>
          <a
            href='/sent-email'
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md ${
              active === 3 ? 'bg-gray-100' : ''
            }`}
          >
            <Send className='mr-2 h-5 w-5' />
            Sent Email
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
