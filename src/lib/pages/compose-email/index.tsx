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
import { toast } from 'react-toastify'

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

  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // This is where you'd typically send the email using an API
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Your email has been sent successfully.')

    // Reset form
    setTo('')
    setSubject('')
    setMessage('')
    setIsSending(false)
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <header className='bg-white shadow-sm z-10'>
        <div className='max-w-full mx-auto px-8 py-4 flex justify-between items-center'>
          <a href='/' className='text-2xl font-bold text-gray-900'>
            School App
          </a>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='User' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar active={2} />
        <main className='w-4/5 overflow-auto p-8'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-2xl font-bold mb-4'>Compose Email</h1>
            <form
              onSubmit={handleSubmit}
              className='space-y-4 bg-white p-8 rounded-md'
            >
              <div>
                <label
                  htmlFor='to'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  To
                </label>
                <Input
                  id='to'
                  type='email'
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                  placeholder='recipient@example.com'
                />
              </div>
              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Subject
                </label>
                <Input
                  id='subject'
                  type='text'
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder='Email subject'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Message
                </label>
                <Textarea
                  id='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder='Type your message here'
                  rows={10}
                />
              </div>
              <Button type='submit' disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Email'}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default index
