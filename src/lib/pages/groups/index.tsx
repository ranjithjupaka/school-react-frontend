import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import 'react-toastify/dist/ReactToastify.css'
import {
  Mail,
  Send,
  Users,
  Plus,
  Eye,
  Trash2,
  User,
  Edit2Icon,
} from 'lucide-react'
import Select from 'react-select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import Sidebar from '@/lib/layout/Sidebar'
import axios from 'axios'
import { GroupDialog } from '@/lib/components/GroupDialog'

const index = () => {
  const [groups, setGroups] = useState([])

  const [newGroupName, setNewGroupName] = React.useState('')
  const [newGroupMembers, setNewGroupMembers] = React.useState('')
  const [selectedEmails, setSelectedEmails] = useState<
    { value: string; label: string }[]
  >([])

  const getGroups = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/groups', {
        headers: {
          Accept: 'application/json',
        },
      })
      console.log('groups list', response.data.data)

      setGroups(response.data.data)
    } catch (error) {
      console.error('Error fetching groups:', error)
    }
  }

  const getEmails = async () => {
    try {
      const email = localStorage.getItem('userEmail')
      const response = await axios.get(
        `http://127.0.0.1:5000/parents_emails/${email}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      console.log('emails list', response.data.data)

      // setGroups(response.data.data)
    } catch (error) {
      console.error('Error fetching groups:', error)
    }
  }

  useEffect(() => {
    getGroups()
    getEmails()
  }, [])

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (newGroupName.trim() && newGroupMembers.trim()) {
        const response = await axios.post(
          'http://127.0.0.1:5000/groups',
          {
            Leaders: ['recK0GhK7Fc3PvL8D'],
            Name: 'Class 2',
            Parents: ['recSiVRraNerG6gPa'],
            Teacher: 'Class Teacher 2',
          },
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        console.log('groups creation response', response.data)
        setNewGroupName('')
        setNewGroupMembers('')

        getGroups()
      } else {
        alert('Please enter group name and members')
      }
    } catch (error) {
      console.error('Error fetching groups:', error)
    }
  }

  const viewMembers = (e: React.FormEvent, index: number) => {
    e.preventDefault()
    console.log('view members', groups[index])
  }

  const deleteGroup = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    const response = await axios.delete(`http://127.0.0.1:5000/groups/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    console.log('groups deletion response', response.data)

    const data = response.data.data

    if (data.deleted) {
      alert('Group deleted successfully')
      getGroups()
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
                  <Label htmlFor='groupMembers'>Group Members</Label>
                  <Select
                    isMulti
                    name='emails'
                    options={[
                      {
                        value: 'user1@example.com',
                        label: 'user1@example.com',
                      },
                      {
                        value: 'user2@example.com',
                        label: 'user2@example.com',
                      },
                      {
                        value: 'user3@example.com',
                        label: 'user3@example.com',
                      },
                      {
                        value: 'user4@example.com',
                        label: 'user4@example.com',
                      },
                      {
                        value: 'user5@example.com',
                        label: 'user5@example.com',
                      },
                      {
                        value: 'user6@example.com',
                        label: 'user6@example.com',
                      },
                      {
                        value: 'user7@example.com',
                        label: 'user7@example.com',
                      },
                      {
                        value: 'user8@example.com',
                        label: 'user8@example.com',
                      },
                      {
                        value: 'user9@example.com',
                        label: 'user9@example.com',
                      },
                    ]}
                    // styles={{
                    //   control: (baseStyles, state) => ({
                    //     ...baseStyles,
                    //     stat
                    //   }),
                    // }}
                    value={selectedEmails}
                    onChange={(selected) =>
                      setSelectedEmails(
                        selected as { value: string; label: string }[]
                      )
                    }
                  />
                  {/* <Textarea
                    id='groupMembers'
                    placeholder='Enter email addresses, separated by commas'
                    value={newGroupMembers}
                    onChange={(e: any) => setNewGroupMembers(e.target.value)}
                    className='h-full min-h-[38px]'
                  /> */}
                </div>
              </div>
              <Button type='submit'>Create Group</Button>
            </form>

            <h2 className='text-lg font-semibold mb-4'>Existing Groups</h2>
            <div className='space-y-2'>
              {groups.map((group: any, index: number) => {
                return (
                  group.fields.Name && (
                    <div
                      key={group.id}
                      className='flex items-center justify-between bg-white p-4 rounded-lg shadow'
                    >
                      <span className='text-lg'>{group.fields.Name}</span>
                      <div className='flex gap-2'>
                        <GroupDialog
                          data={{
                            name: group.fields.Name,
                            members: group.fields['Parent Email'],
                          }}
                        >
                          <Button
                            variant='outline'
                            size='sm'
                            title='Add Members'
                          >
                            <Edit2Icon className='h-4 w-4 mr-1' /> Edit
                          </Button>
                        </GroupDialog>
                        <GroupDialog
                          data={{
                            name: group.fields.Name,
                            members: group.fields['Parent Email'],
                          }}
                        >
                          <Button
                            variant='outline'
                            size='sm'
                            title='View Members'
                          >
                            <Eye className='h-4 w-4 mr-1' /> View
                          </Button>
                        </GroupDialog>
                        <Button
                          variant='outline'
                          size='sm'
                          title='Delete Group'
                          onClick={(e) => deleteGroup(e, group.id)}
                        >
                          <Trash2 className='h-4 w-4 mr-1' /> Delete
                        </Button>
                      </div>
                    </div>
                  )
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default index
