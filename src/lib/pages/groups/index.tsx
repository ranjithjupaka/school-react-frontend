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
        <Sidebar />
        <main className='w-4/5 overflow-auto p-8'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-2xl font-bold mb-6'>Manage Groups</h1>

            <form
              onSubmit={handleCreateGroup}
              className='mb-8 space-y-4 bg-white p-6 rounded-lg shadow'
            >
              <h2 className='text-lg font-semibold'>Create a New Group</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='groupName'>Group Name</Label>
                  <Input
                    id='groupName'
                    placeholder='Enter group name'
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='groupMembers'>Member Email Addresses</Label>
                  <Textarea
                    id='groupMembers'
                    placeholder='Enter email addresses, separated by commas'
                    value={newGroupMembers}
                    onChange={(e: any) => setNewGroupMembers(e.target.value)}
                    className='h-full min-h-[38px]'
                  />
                </div>
              </div>
              <Button type='submit'>Create Group</Button>
            </form>

            <h2 className='text-lg font-semibold mb-4'>Existing Groups</h2>
            <div className='space-y-2'>
              {groups.map((group) => (
                <div
                  key={group.id}
                  className='flex items-center justify-between bg-white p-4 rounded-lg shadow'
                >
                  <span className='text-lg'>
                    {group.name} - {group.members} members
                  </span>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm' title='Add Members'>
                      <Plus className='h-4 w-4 mr-1' /> Add Members
                    </Button>
                    <Button variant='outline' size='sm' title='View Members'>
                      <Eye className='h-4 w-4 mr-1' /> View
                    </Button>
                    <Button variant='outline' size='sm' title='Delete Group'>
                      <Trash2 className='h-4 w-4 mr-1' /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default index
