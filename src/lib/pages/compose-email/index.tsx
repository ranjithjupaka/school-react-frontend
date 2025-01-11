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
import axios from 'axios'
import Select from 'react-select'

const index = () => {
  const [groups, setGroups] = useState<any>([])
  const [selectedGroups, setSelectedGroups] = useState<any>([])
  const [groupEmails, setGroupEmails] = useState<any>({})
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const getGroups = async () => {
    try {
      const email = localStorage.getItem('userEmail')
      const response = await axios.get(
        `http://127.0.0.1:5000/groups/${email}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      console.log('groups list', response.data.data)

      const groups = []
      const gEmails: any = {}

      for (const g of response.data.data) {
        const group = { value: g['id'], label: g.fields.Name }
        groups.push(group)
        gEmails[g['id']] = g.fields['Parent Email']
      }

      console.log('groups', groups)

      setGroups(groups)
      setGroupEmails(gEmails)
    } catch (error) {
      console.error('Error fetching groups:', error)
    }
  }

  useEffect(() => {
    getGroups()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSending(true)
      const from_email = localStorage.getItem('userEmail')

      let group_ids = selectedGroups.map((group: any) => group.value)
      let to_emails = []

      for (const id of group_ids) {
        to_emails.push(groupEmails[id])
      }

      to_emails = to_emails.reduce((acc, curr) => [...acc, ...curr], [])

      const data = {
        from_email,
        to_emails,
        message,
        group_ids,
      }

      console.log('data', data)

      let resp = await axios.post('http://127.0.0.1:5000/send_email', data)
      console.log('resp', resp)

      toast.success('Your email has been sent successfully.')

      setMessage('')
      setSelectedGroups([])
      setIsSending(false)
    } catch (error) {
      console.log('error', error)
      toast.error('Error sending email.')
    }
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
                <Select
                  isMulti
                  name='emails'
                  options={groups}
                  value={selectedGroups}
                  onChange={(selected) => {
                    setSelectedGroups(
                      selected as { value: string; label: string }[]
                    )
                  }}
                />
              </div>
              {/* <div>
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
              </div> */}
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
