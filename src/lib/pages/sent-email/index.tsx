import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import 'react-toastify/dist/ReactToastify.css'
import { Mail, Send, Users, Plus, Eye, Trash2, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import Sidebar from '@/lib/layout/Sidebar'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const sentEmails = [
  {
    id: 1,
    to: 'john@example.com',
    subject: 'Meeting tomorrow',
    preview: 'Hi John, Just a reminder about our meeting tomorrow at 10 AM...',
    date: '2023-05-15T10:30:00Z',
  },
  {
    id: 2,
    to: 'sarah@example.com',
    subject: 'Project update',
    preview:
      'Hello Sarah, I wanted to give you a quick update on the project...',
    date: '2023-05-14T15:45:00Z',
  },
  {
    id: 3,
    to: 'team@example.com',
    subject: 'Weekly report',
    preview: 'Team, Please find attached the weekly report for your review...',
    date: '2023-05-13T09:00:00Z',
  },
]

const index = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group 1', members: 10 },
    { id: 2, name: 'Group 2', members: 15 },
    { id: 3, name: 'Group 3', members: 8 },
  ])

  const [newGroupName, setNewGroupName] = React.useState('')
  const [newGroupMembers, setNewGroupMembers] = React.useState('')

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGroupName.trim() && newGroupMembers.trim()) {
      const memberCount = newGroupMembers.split(',').length
      setGroups([
        ...groups,
        { id: groups.length + 1, name: newGroupName, members: memberCount },
      ])
      setNewGroupName('')
      setNewGroupMembers('')
    }
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <header className='bg-white shadow-sm z-10'>
        <div className='max-w-full mx-auto px-8 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>School App</h1>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='User' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar active={3} />
        <main className='w-4/5 overflow-auto p-8'>
          <div className='max-w-4xl mx-auto'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>Sent Emails</h1>
              <Button>Refresh</Button>
            </div>

            <div className='space-y-4 bg-white p-4 mt-4 rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[180px]'>To</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead className='text-right'>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentEmails.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center space-x-2'>
                          <Avatar className='h-6 w-6'>
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${email.to}`}
                              alt={email.to}
                            />
                            <AvatarFallback>
                              {email.to.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{email.to}</span>
                        </div>
                      </TableCell>
                      <TableCell>{email.subject}</TableCell>
                      <TableCell className='max-w-md truncate'>
                        {email.preview}
                      </TableCell>
                      <TableCell className='text-right'>
                        {new Date(email.date).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default index
